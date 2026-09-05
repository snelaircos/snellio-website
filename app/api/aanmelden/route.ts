// POST /api/aanmelden — nieuwe aanmeldroute zónder betaalgegevens (stap 12).
// Minimaal: bedrijfsnaam, e-mail, land, wachtwoord (+ gekozen pakket).
// Maakt direct de tenant aan in Supabase (zelfde project als de app):
// auth-user, bedrijfsgegevens (14 dagen trial, GEEN Mollie-customer/mandaat,
// betaalwijze/periode nog leeg) en de hoofdaccount-monteur. De keuze voor
// maand/jaar × iDEAL/incasso maakt de tenant later in de app (keuzescherm,
// dag 7 van de proefperiode). Signaal- en welkomstmail verstuurt de app-cron.
// Het wachtwoord wordt nergens opgeslagen (pending_signups krijgt '').

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { rateLimit, clientIp, emailDomein } from '@/lib/rate-limit'

const PAKKETTEN = ['starter', 'basis', 'pro', 'enterprise']
const LANDEN = ['NL', 'BE', 'overig']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: { company_name?: string; email?: string; password?: string; land?: string; package_id?: string; hp_veld?: string } = {}
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 }) }

  // Honeypot (nooit name="website" — zie eerdere autofill-les)
  if (body.hp_veld) return NextResponse.json({ ok: true })

  // Rate limiting (blok B10): per IP 5 per 10 minuten en 20 per dag, per
  // e-maildomein 10 per dag. Publiek endpoint dat tenants aanmaakt.
  const ip = clientIp(req.headers)
  const dom = emailDomein(body.email)
  for (const [sleutel, max, venster] of [[`aanmelden:ip10m:${ip}`, 5, 10 * 60_000], [`aanmelden:ipdag:${ip}`, 20, 86_400_000], [`aanmelden:dom:${dom}`, 10, 86_400_000]] as Array<[string, number, number]>) {
    const r = rateLimit(sleutel, max, venster)
    if (!r.ok) return NextResponse.json({ error: 'Te veel aanmeldpogingen. Probeer het later opnieuw of mail info@snellio.nl.' }, { status: 429, headers: { 'Retry-After': String(r.over ?? 60) } })
  }

  const bedrijfsnaam = (body.company_name ?? '').trim()
  const email = (body.email ?? '').trim().toLowerCase()
  const password = body.password ?? ''
  const land = LANDEN.includes(body.land ?? '') ? body.land! : 'NL'
  const pakket = PAKKETTEN.includes(body.package_id ?? '') ? body.package_id! : 'pro'
  if (!bedrijfsnaam) return NextResponse.json({ error: 'Bedrijfsnaam is verplicht' }, { status: 400 })
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Geldig e-mailadres is verplicht' }, { status: 400 })
  if (password.length < 8) return NextResponse.json({ error: 'Wachtwoord moet minimaal 8 tekens zijn' }, { status: 400 })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })
  const supabase = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })

  // Bestaat het e-mailadres al?
  try {
    const { data } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })
    if (data?.users.some(u => u.email?.toLowerCase() === email)) {
      return NextResponse.json({ error: 'Dit e-mailadres is al geregistreerd. Log in met je bestaande account.', code: 'email_exists' }, { status: 409 })
    }
  } catch (e) { console.warn('[aanmelden] listUsers faalde:', e) }

  // 1. Auth-user
  const { data: created, error: authErr } = await supabase.auth.admin.createUser({
    email, password, email_confirm: true, user_metadata: { company_name: bedrijfsnaam, bron: 'snellio.nl' },
  })
  if (authErr || !created.user) {
    if (authErr?.message?.toLowerCase().includes('already')) return NextResponse.json({ error: 'Dit e-mailadres is al geregistreerd. Log in met je bestaande account.', code: 'email_exists' }, { status: 409 })
    console.error('[aanmelden] createUser:', authErr)
    return NextResponse.json({ error: 'Account aanmaken mislukt. Probeer het opnieuw of mail info@snellio.nl.' }, { status: 500 })
  }
  const userId = created.user.id
  const nu = new Date()
  const trialEind = new Date(nu.getTime() + 14 * 86_400_000)

  // 2. Tenant — geen betaalgegevens, geen mandaat, keuze volgt in de app.
  const { error: bgErr } = await supabase.from('bedrijfsgegevens').insert({
    user_id: userId, bedrijfsnaam, emailadres: email, land, pakket, pakket_addons: [],
    trial_start: nu.toISOString(), trial_eind: trialEind.toISOString(), abonnement_status: 'trial', vertical: 'hvac',
    mollie_customer_id: null, mollie_mandate_id: null, mollie_subscription_id: null, betaalwijze: null, periode: null,
  })
  if (bgErr) {
    console.error('[aanmelden] bedrijfsgegevens insert:', bgErr)
    await supabase.auth.admin.deleteUser(userId).catch(() => {})
    return NextResponse.json({ error: 'Account aanmaken mislukt. Probeer het opnieuw of mail info@snellio.nl.' }, { status: 500 })
  }

  // 3. Hoofdaccount = eerste monteur (rol admin), anders kan Starter/Basis geen monteur toevoegen.
  const { error: mErr } = await supabase.from('monteurs').insert({
    bedrijf_user_id: userId, user_id: userId, naam: bedrijfsnaam, email, rol: 'admin', actief: true, invite_status: 'active', kleur: '#0090b8',
  })
  if (mErr) console.error('[aanmelden] hoofdaccount-monteur insert:', mErr)

  // 4. Spoor voor de app (signaalmail "Registratie via snellio.nl"); geen wachtwoord opslaan.
  await supabase.from('pending_signups').insert({
    email, company_name: bedrijfsnaam, full_name: '', password: '', package_id: pakket, status: 'completed', vertical: 'hvac',
  }).then(({ error }) => { if (error) console.warn('[aanmelden] pending_signups:', error.message) })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.snellio.nl'
  return NextResponse.json({ ok: true, login_url: `${appUrl}/login?new_account=1&email=${encodeURIComponent(email)}` })
}
