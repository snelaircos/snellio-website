import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import mollie from '@mollie/api-client'

interface CheckoutRequest {
  company_name: string
  full_name: string
  email: string
  password: string
  package_id: string
}

// Maandelijkse abonnementsprijzen (voor de recurring subscription na trial)
const PACKAGE_PRICES: Record<string, string> = {
  starter:    '9.95',
  basis:      '29.95',
  pro:        '69.95',
  enterprise: '99.95',
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

    // Sla pending signup op
    const { data, error } = await supabase
      .from('pending_signups')
      .insert({
        email:        body.email.trim().toLowerCase(),
        company_name: body.company_name.trim(),
        full_name:    body.full_name.trim(),
        password:     body.password,
        package_id:   body.package_id,
        status:       'pending',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      if (error.code === '23505')
        return NextResponse.json({ error: 'Dit e-mailadres is al in gebruik' }, { status: 409 })
      return NextResponse.json({ error: 'Database fout' }, { status: 500 })
    }

    const mollieApiKey = process.env.MOLLIE_API_KEY
    if (!mollieApiKey)
      return NextResponse.json({ error: 'Betaling configuratie fout' }, { status: 500 })

    const mollieClient = mollie({ apiKey: mollieApiKey })
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

    try {
      // Stap 1: Mollie klant aanmaken
      const customer = await mollieClient.customers.create({
        name:  body.full_name.trim(),
        email: body.email.trim().toLowerCase(),
        metadata: { signup_id: data.id },
      })

      // Sla mollie_customer_id op in pending_signup
      await supabase
        .from('pending_signups')
        .update({ mollie_customer_id: customer.id })
        .eq('id', data.id)

      // Stap 2: First payment (€0,01) voor mandaat — geen echte afschrijving
      const payment = await mollieClient.payments.create({
        customerId:    customer.id,
        sequenceType:  'first',
        amount:        { value: '0.01', currency: 'EUR' },
        description:   `Snellio ${body.package_id} — mandaatverificatie (30 dagen gratis trial)`,
        redirectUrl:   `${siteUrl}/checkout/success?signup_id=${data.id}`,
        webhookUrl:    `${siteUrl}/api/mollie/webhook`,
        cancelUrl:     `${siteUrl}/checkout/cancel`,
        metadata:      { signup_id: data.id, package_id: body.package_id },
      })

      // Sla payment_id op
      await supabase
        .from('pending_signups')
        .update({ payment_id: payment.id })
        .eq('id', data.id)

      return NextResponse.json({
        success:      true,
        checkout_url: payment.getCheckoutUrl(),
      })

    } catch (mollieError: unknown) {
      console.error('Mollie fout:', mollieError instanceof Error ? mollieError.message : mollieError)
      return NextResponse.json({ error: 'Betaling kon niet worden aangemaakt' }, { status: 500 })
    }

  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json({ error: 'Interne server fout' }, { status: 500 })
  }
}
