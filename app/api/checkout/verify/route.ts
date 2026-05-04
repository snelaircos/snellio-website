import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import mollie from '@mollie/api-client'

// Maandelijkse abonnementsprijzen
const PACKAGE_PRICES: Record<string, string> = {
  starter:    '10.00',
  basis:      '29.00',
  pro:        '69.00',
  enterprise: '129.00',
}

interface VerifyRequest {
  signup_id: string
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyRequest = await req.json()

    if (!body.signup_id?.trim())
      return NextResponse.json({ error: 'Aanmeldings-ID is verplicht' }, { status: 400 })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    if (!supabaseUrl || !supabaseServiceKey)
      return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    // Haal pending signup op
    const { data: signup, error: fetchError } = await supabase
      .from('pending_signups')
      .select('*')
      .eq('id', body.signup_id)
      .single()

    if (fetchError || !signup)
      return NextResponse.json({ error: 'Aanmelding niet gevonden' }, { status: 404 })

    if (!signup.payment_id)
      return NextResponse.json({ error: 'Betaling niet gevonden' }, { status: 404 })

    const mollieApiKey = process.env.MOLLIE_API_KEY
    if (!mollieApiKey)
      return NextResponse.json({ error: 'Betaling configuratie fout' }, { status: 500 })

    const mollieClient = mollie({ apiKey: mollieApiKey })

    // Controleer of de mandaat-betaling (€0,01) betaald is
    const payment = await mollieClient.payments.get(signup.payment_id)
    if (payment.status !== 'paid') {
      return NextResponse.json({ error: 'Betaling is niet voltooid', status: payment.status }, { status: 400 })
    }

    // Maak Supabase gebruiker aan
    const { data: user, error: createError } = await supabase.auth.admin.createUser({
      email:    signup.email,
      password: signup.password,
      user_metadata: {
        company_name: signup.company_name,
        package_id:   signup.package_id,
        full_name:    signup.full_name,
      },
      email_confirm: true,
    })

    if (createError) {
      console.error('User creation error:', createError)
      const isDuplicate =
        (createError as { code?: string }).code === 'email_exists' ||
        createError.message?.toLowerCase().includes('already registered') ||
        createError.message?.toLowerCase().includes('already been registered')

      if (isDuplicate) {
        await supabase.from('pending_signups').delete().eq('id', signup.id)
        return NextResponse.json({ success: true, message: 'Account bestaat al', email: signup.email })
      }
      return NextResponse.json({ error: 'Account kon niet worden aangemaakt' }, { status: 500 })
    }

    const userId = user.user?.id
    if (!userId) {
      return NextResponse.json({ error: 'Account aanmaken mislukt' }, { status: 500 })
    }
    const now = new Date()
    const trialEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

    // Pak het Mollie-mandaat (€0,01 first-payment leverde 'm op). Snellio's
    // trial-cron heeft dit nodig om aan einde trial de subscription te
    // starten. Als het er niet is gaat de tenant in 'grace' i.p.v. 'actief'.
    let mandateId: string | null = signup.mollie_mandate_id ?? null
    if (!mandateId && signup.mollie_customer_id) {
      try {
        const mandates = await mollieClient.customerMandates.page({
          customerId: signup.mollie_customer_id,
          limit:      10,
        })
        const valid = mandates.find(m => m.status === 'valid')
        if (valid) mandateId = valid.id
      } catch (mErr) {
        console.error('Mandate-lookup mislukt:', mErr)
      }
    }

    // Maak bedrijfsgegevens — moet COMPLEET zijn (eerder bug: alleen
    // bedrijfsnaam/pakket werd geschreven, status/trial/mollie ontbraken
    // waardoor trial-cron de tenant negeerde en admin de tenant niet zag).
    const { error: bedrijfError } = await supabase
      .from('bedrijfsgegevens')
      .insert({
        user_id:            userId,
        bedrijfsnaam:       signup.company_name,
        emailadres:         signup.email,
        pakket:             signup.package_id,
        pakket_addons:      [],
        // Vertical: snellio.nl signupform stuurt 'm soms mee in pending_signups.
        // Default = hvac (oorspronkelijke vertical, dekt 95%+ van signups).
        vertical:           signup.vertical === 'automotive' ? 'automotive' : 'hvac',
        abonnement_status:  'trial',
        trial_start:        now.toISOString(),
        trial_eind:         trialEnd.toISOString(),
        mollie_customer_id: signup.mollie_customer_id ?? null,
        mollie_mandate_id:  mandateId,
      })

    if (bedrijfError) {
      // Hard fail: rollback auth user zodat we geen orphan account achterlaten.
      // Eerder werd dit silent geslikt → user dacht dat signup klaar was, maar
      // had geen bedrijfsgegevens en kon niets in Snellio.
      console.error('bedrijfsgegevens insert mislukt:', bedrijfError)
      await supabase.auth.admin.deleteUser(userId)
      return NextResponse.json({
        error: 'Account aanmaken mislukt — neem contact op met support@snellio.nl',
        debug: bedrijfError.message,
      }, { status: 500 })
    }

    // Maak Mollie recurring subscription aan (start na 14 dagen trial).
    // Faal hier niet hard: als 't niet lukt pakt trial-check-cron 'm op
    // bij de trial→grace transitie zolang er een mandaat is.
    if (signup.mollie_customer_id) {
      try {
        const startDate = trialEnd.toISOString().split('T')[0] // YYYY-MM-DD

        const subscription = await mollieClient.customerSubscriptions.create({
          customerId:  signup.mollie_customer_id,
          amount:      { value: PACKAGE_PRICES[signup.package_id] || '69.00', currency: 'EUR' },
          interval:    '1 month',
          startDate,
          description: `Snellio ${signup.package_id} abonnement`,
          webhookUrl:  `${process.env.NEXT_PUBLIC_SITE_URL}/api/mollie/webhook`,
        })

        // Subscription-id opslaan zodat we 'm later kunnen reconcileren
        await supabase
          .from('bedrijfsgegevens')
          .update({ mollie_subscription_id: subscription.id })
          .eq('user_id', userId)
      } catch (subError) {
        console.error('Mollie subscription aanmaken mislukt:', subError)
        // Trial-check cron probeert 't opnieuw bij trial-eind.
      }
    }

    // Markeer pending_signups als completed (NIET deleten — dan kunnen we
    // achteraf debuggen welke signups door welke flow gingen).
    await supabase
      .from('pending_signups')
      .update({ status: 'completed' })
      .eq('id', signup.id)

    return NextResponse.json({
      success:  true,
      message:  'Account succesvol aangemaakt',
      user_id:  userId || null,
      email:    signup.email,
    })

  } catch (error) {
    console.error('Verify API error:', error)
    return NextResponse.json({ error: 'Interne server fout' }, { status: 500 })
  }
}
