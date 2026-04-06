import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import mollie from '@mollie/api-client'

// Maandelijkse abonnementsprijzen
const PACKAGE_PRICES: Record<string, string> = {
  starter:    '9.95',
  basis:      '29.95',
  pro:        '69.95',
  enterprise: '99.95',
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
      if (createError.message?.includes('already registered')) {
        await supabase.from('pending_signups').delete().eq('id', signup.id)
        return NextResponse.json({ success: true, message: 'Account bestaat al', email: signup.email })
      }
      return NextResponse.json({ error: 'Account kon niet worden aangemaakt' }, { status: 500 })
    }

    const userId = user.user?.id
    const now = new Date()
    const trialEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    let mollieSubscriptionId: string | null = null

    // Maak Mollie recurring subscription aan (start na 30 dagen trial)
    if (signup.mollie_customer_id) {
      try {
        const startDate = trialEnd.toISOString().split('T')[0] // YYYY-MM-DD

        const subscription = await mollieClient.customerSubscriptions.create({
          customerId:  signup.mollie_customer_id,
          amount:      { value: PACKAGE_PRICES[signup.package_id] || '69.95', currency: 'EUR' },
          interval:    '1 month',
          startDate,
          description: `Snellio ${signup.package_id} abonnement`,
          webhookUrl:  `${process.env.NEXT_PUBLIC_SITE_URL}/api/mollie/webhook`,
        })

        mollieSubscriptionId = subscription.id
      } catch (subError) {
        console.error('Mollie subscription aanmaken mislukt:', subError)
        // Doorgaan — account is wel aangemaakt
      }
    }

    // Sla subscription op in database
    if (userId) {
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          user_id:                 userId,
          plan_key:                signup.package_id,
          status:                  'trialing',
          payment_provider:        'mollie',
          payment_id:              signup.payment_id,
          starts_at:               now.toISOString(),
          trial_ends_at:           trialEnd.toISOString(),
          ends_at:                 trialEnd.toISOString(),
          mollie_customer_id:      signup.mollie_customer_id || null,
          mollie_subscription_id:  mollieSubscriptionId,
        })

      if (subscriptionError)
        console.error('Subscription opslaan mislukt:', subscriptionError)
    }

    // Verwijder pending signup
    await supabase.from('pending_signups').delete().eq('id', signup.id)

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
