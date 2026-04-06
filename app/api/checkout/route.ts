import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import mollie, { SequenceType } from '@mollie/api-client'

interface CheckoutRequest {
  company_name: string
  full_name:    string
  email:        string
  password:     string
  package_id:   string
}

const validPackages = ['starter', 'basis', 'pro', 'enterprise']

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequest = await req.json()

    if (!body.company_name?.trim())
      return NextResponse.json({ error: 'Bedrijfsnaam is verplicht' }, { status: 400 })
    if (!body.full_name?.trim())
      return NextResponse.json({ error: 'Volledige naam is verplicht' }, { status: 400 })
    if (!body.email?.trim() || !body.email.includes('@'))
      return NextResponse.json({ error: 'Geldig e-mailadres is verplicht' }, { status: 400 })
    if (!body.password?.trim() || body.password.length < 8)
      return NextResponse.json({ error: 'Wachtwoord moet minimaal 8 karakters bevatten' }, { status: 400 })
    if (!body.package_id?.trim() || !validPackages.includes(body.package_id))
      return NextResponse.json({ error: 'Ongeldig pakket geselecteerd' }, { status: 400 })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    if (!supabaseUrl || !supabaseServiceKey)
      return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const email = body.email.trim().toLowerCase()

    // Als er al een pending signup is voor dit email, verwijder die zodat opnieuw proberen werkt
    const { data: existing } = await supabase
      .from('pending_signups')
      .select('id, status')
      .eq('email', email)
      .single()

    if (existing) {
      if (existing.status !== 'pending') {
        return NextResponse.json({ error: 'Dit e-mailadres heeft al een actief account' }, { status: 409 })
      }
      await supabase.from('pending_signups').delete().eq('id', existing.id)
    }

    // Sla pending signup op
    const { data: signup, error: insertError } = await supabase
      .from('pending_signups')
      .insert({
        email,
        company_name: body.company_name.trim(),
        full_name:    body.full_name.trim(),
        password:     body.password,
        package_id:   body.package_id,
        status:       'pending',
      })
      .select('id')
      .single()

    if (insertError || !signup)
      return NextResponse.json({ error: 'Database fout' }, { status: 500 })

    const mollieApiKey = process.env.MOLLIE_API_KEY
    if (!mollieApiKey)
      return NextResponse.json({ error: 'Betaling configuratie fout' }, { status: 500 })

    const mollieClient = mollie({ apiKey: mollieApiKey })
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

    try {
      // Stap 1: Mollie klant aanmaken
      const customer = await mollieClient.customers.create({
        name:  body.full_name.trim(),
        email,
        metadata: { signup_id: signup.id },
      })

      await supabase
        .from('pending_signups')
        .update({ mollie_customer_id: customer.id })
        .eq('id', signup.id)

      // Stap 2: First payment (€0,01) voor mandaat
      const payment = await mollieClient.payments.create({
        customerId:   customer.id,
        sequenceType: SequenceType.first,
        amount:       { value: '0.01', currency: 'EUR' },
        description:  `Snellio ${body.package_id} — mandaatverificatie (30 dagen gratis trial)`,
        redirectUrl:  `${siteUrl}/checkout/success?signup_id=${signup.id}`,
        webhookUrl:   `${siteUrl}/api/mollie/webhook`,
        cancelUrl:    `${siteUrl}/checkout/cancel`,
        metadata:     { signup_id: signup.id, package_id: body.package_id },
      })

      await supabase
        .from('pending_signups')
        .update({ payment_id: payment.id })
        .eq('id', signup.id)

      return NextResponse.json({ success: true, checkout_url: payment.getCheckoutUrl() })

    } catch (mollieError: unknown) {
      console.error('Mollie fout:', mollieError instanceof Error ? mollieError.message : mollieError)
      return NextResponse.json({ error: 'Betaling kon niet worden aangemaakt' }, { status: 500 })
    }

  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json({ error: 'Interne server fout' }, { status: 500 })
  }
}
