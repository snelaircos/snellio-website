import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'
import { TRIAL_DAGEN } from '@/lib/constants'

// POST /api/aanmelden — gratis trial starten vanaf snellio.nl.
//
// Maakt een Supabase auth-user + tenant (bedrijfsgegevens) + hoofdaccount-
// monteur aan. Bewust ZONDER Mollie: geen klant, geen €0,01-mandaatbetaling,
// geen subscription. De tenant start als 'trial' zonder mandaat; de app
// (keuzescherm, stap 10) laat de klant tijdens de trial zelf abonnement,
// periode en betaalwijze kiezen. De cron 'keuze-tijdlijn' in de app stuurt
// de herinneringen en zet het account op alleen-lezen als er geen keuze komt.
//
// Signaal- en welkomstmail: de vangnet-cron 'tenant-signaal' in de app pakt
// elke nieuwe bedrijfsgegevens-rij zonder mailvlag binnen het uur op.
//
// Tracking: de Ads-conversie trial_signup_completed vuurt pas op
// /trial-bedankt, en de client navigeert daar alleen heen na een 2xx van
// deze route. Deze route zelf doet niets met gtag.

interface AanmeldRequest {
  company_name?: string
  full_name?:    string
  email?:        string
  password?:     string
  /** Honeypot: mensen laten dit leeg, bots vullen het in. */
  website?:      string
}

// Voorlopig standaardpakket voor nieuwe trial-tenants. 'pro' is in de app
// het pakket zonder monteur- of installatiecap, zodat de trial alle functies
// zonder beperking laat proberen. De definitieve pakketkeuze gebeurt in de
// app tijdens de trial (volgende opdracht: abonnementselectie in het
// keuzescherm). Wijzig dit niet naar 'starter'/'basis' zonder die app-kant:
// die pakketten cappen op 1 monteur (en Starter op 25 installaties).
const TRIAL_PAKKET = 'pro'

// Eenvoudige in-memory rate limiter per IP (per proces). Genoeg om
// scripts af te remmen; geen vervanging voor WAF-regels.
const hits = new Map<string, number[]>()
function rateLimited(ip: string, max = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < windowMs)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > max
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for') ?? ''
  return fwd.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'
}

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(clientIp(req))) {
      return NextResponse.json(
        { error: 'Te veel aanmeldpogingen. Probeer het over een paar minuten opnieuw of mail info@snellio.nl.' },
        { status: 429 },
      )
    }

    let body: AanmeldRequest = {}
    try { body = await req.json() } catch { /* leeg */ }

    // Honeypot gevuld → geen account, geen bedanktpagina (dus geen conversie).
    if (body.website && body.website.trim() !== '')
      return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 })

    const companyName = (body.company_name ?? '').trim()
    const fullName    = (body.full_name ?? '').trim()
    const email       = (body.email ?? '').trim().toLowerCase()
    const password    = body.password ?? ''

    if (!companyName)
      return NextResponse.json({ error: 'Bedrijfsnaam is verplicht' }, { status: 400 })
    if (!fullName)
      return NextResponse.json({ error: 'Je naam is verplicht' }, { status: 400 })
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: 'Vul een geldig e-mailadres in' }, { status: 400 })
    if (password.length < 8)
      return NextResponse.json({ error: 'Wachtwoord moet minimaal 8 tekens bevatten' }, { status: 400 })

    const supabaseUrl        = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !supabaseServiceKey)
      return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    // 1. Auth-user. Supabase geeft zelf een duplicate-fout terug; geen aparte
    //    listUsers-precheck nodig (die was er alleen om te voorkomen dat er
    //    vóór een mislukte signup al een Mollie-betaling was gedaan).
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { company_name: companyName, full_name: fullName, package_id: TRIAL_PAKKET },
    })

    if (createError || !created.user) {
      const msg = (createError?.message ?? '').toLowerCase()
      const isDuplicate =
        (createError as { code?: string } | null)?.code === 'email_exists' ||
        msg.includes('already registered') ||
        msg.includes('already been registered') ||
        msg.includes('already exists')
      if (isDuplicate) {
        return NextResponse.json({
          error: 'Dit e-mailadres heeft al een Snellio-account. Log in via app.snellio.nl of gebruik wachtwoord-reset.',
          code:  'email_exists',
        }, { status: 409 })
      }
      console.error('[aanmelden] createUser mislukt:', createError)
      return NextResponse.json({ error: 'Account kon niet worden aangemaakt' }, { status: 500 })
    }

    const userId   = created.user.id
    const now      = new Date()
    const trialEnd = new Date(now.getTime() + TRIAL_DAGEN * 24 * 60 * 60 * 1000)

    // 2. Tenant. Zelfde velden als de vorige (Mollie-)flow schreef, minus de
    //    Mollie-ids. abonnement_status 'trial' + trial_start/trial_eind zijn
    //    wat de app-crons lezen.
    const { error: bedrijfError } = await supabase
      .from('bedrijfsgegevens')
      .insert({
        user_id:           userId,
        bedrijfsnaam:      companyName,
        contactpersoon:    fullName,
        emailadres:        email,
        pakket:            TRIAL_PAKKET,
        pakket_addons:     [],
        vertical:          'hvac',
        abonnement_status: 'trial',
        trial_start:       now.toISOString(),
        trial_eind:        trialEnd.toISOString(),
      })

    if (bedrijfError) {
      // Hard fail + rollback van de auth-user: geen orphan-accounts.
      console.error('[aanmelden] bedrijfsgegevens insert mislukt:', bedrijfError)
      await supabase.auth.admin.deleteUser(userId)
      return NextResponse.json({
        error: 'Account aanmaken mislukt, neem contact op met info@snellio.nl',
      }, { status: 500 })
    }

    // 3. Hoofdaccount is automatisch de eerste monteur (rol admin). Niet hard
    //    falen: de tenant bestaat al; admin kan dit handmatig herstellen.
    const { error: monteurError } = await supabase
      .from('monteurs')
      .insert({
        bedrijf_user_id: userId,
        user_id:         userId,
        naam:            fullName || email.split('@')[0],
        email,
        rol:             'admin',
        actief:          true,
        invite_status:   'active',
        kleur:           '#0090b8',
      })
    if (monteurError) {
      console.error('[aanmelden] hoofdaccount-monteur insert mislukt:', monteurError)
    }

    // signup_id is een opaque token voor de bedanktpagina (dedupe-sleutel van
    // de conversie). Het is bewust niet de user-id, zodat die niet in URL's
    // en GA4-pageviews belandt.
    return NextResponse.json({
      ok:        true,
      signup_id: randomUUID(),
      user_id:   userId,
      email,
    })
  } catch (error) {
    console.error('[aanmelden] onverwachte fout:', error)
    return NextResponse.json({ error: 'Interne server fout' }, { status: 500 })
  }
}
