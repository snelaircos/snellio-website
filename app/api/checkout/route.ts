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

// Package pricing in EUR
const PACKAGE_PRICES: Record<string, number> = {
  starter: 9.95,
  basis: 29.95,
  pro: 69.95,
  enterprise: 99.95
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequest = await req.json()

    // Validation
    if (!body.company_name?.trim()) {
      return NextResponse.json({ error: 'Bedrijfsnaam is verplicht' }, { status: 400 })
    }
    if (!body.full_name?.trim()) {
      return NextResponse.json({ error: 'Volledige naam is verplicht' }, { status: 400 })
    }
    if (!body.email?.trim() || !body.email.includes('@')) {
      return NextResponse.json({ error: 'Geldig e-mailadres is verplicht' }, { status: 400 })
    }
    if (!body.password?.trim() || body.password.length < 8) {
      return NextResponse.json({ error: 'Wachtwoord moet minimaal 8 karakters bevatten' }, { status: 400 })
    }
    if (!body.package_id?.trim()) {
      return NextResponse.json({ error: 'Pakket selectie is verplicht' }, { status: 400 })
    }

    // Validate package_id exists
    const validPackages = ['starter', 'basis', 'pro', 'enterprise']
    if (!validPackages.includes(body.package_id)) {
      return NextResponse.json({ error: 'Ongeldig pakket geselecteerd' }, { status: 400 })
    }

    // Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    // Insert pending signup
    const { data, error } = await supabase
      .from('pending_signups')
      .insert({
        email: body.email.trim().toLowerCase(),
        company_name: body.company_name.trim(),
        full_name: body.full_name.trim(),
        password: body.password, // Temporary storage - will be removed after account creation
        package_id: body.package_id,
        status: 'pending'
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)

      // Handle duplicate email
      if (error.code === '23505') { // unique_violation
        return NextResponse.json({ error: 'Dit e-mailadres is al in gebruik' }, { status: 409 })
      }

      return NextResponse.json({ error: 'Database fout' }, { status: 500 })
    }

    // Get package price
    const amount = PACKAGE_PRICES[body.package_id]
    if (!amount) {
      return NextResponse.json({ error: 'Ongeldige pakketprijs' }, { status: 400 })
    }

    // Create Mollie payment
    const mollieApiKey = process.env.MOLLIE_API_KEY
    if (!mollieApiKey) {
      console.error('Missing MOLLIE_API_KEY')
      return NextResponse.json({ error: 'Betaling configuratie fout' }, { status: 500 })
    }

    const mollieClient = mollie({ apiKey: mollieApiKey })

    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

      const payment = await mollieClient.payments.create({
        amount: {
          value: amount.toFixed(2),
          currency: 'EUR'
        },
        description: `Snellio abonnement - ${body.package_id}`,
        redirectUrl: `${siteUrl}/checkout/success?signup_id=${data.id}`,
        webhookUrl: `${siteUrl}/api/mollie/webhook`,
        cancelUrl: `${siteUrl}/checkout/cancel`,
        metadata: {
          signup_id: data.id,
          package_id: body.package_id,
          email: body.email
        }
      })

      // Update pending signup with payment_id
      const { error: updateError } = await supabase
        .from('pending_signups')
        .update({ payment_id: payment.id })
        .eq('id', data.id)

      if (updateError) {
        console.error('Failed to update payment_id:', updateError)
        // Continue anyway - payment is created
      }

      // Success response with checkout URL
      return NextResponse.json({
        success: true,
        message: 'Betaling aangemaakt. Doorverwijzing naar Mollie.',
        checkout_url: payment.getCheckoutUrl()
      })

    } catch (mollieError: unknown) {
      console.error('Mollie payment creation failed:', {
        error: mollieError instanceof Error ? mollieError.message : String(mollieError),
        stack: mollieError instanceof Error ? mollieError.stack : undefined,
        details: 'Check Mollie API key and network connectivity'
      })
      return NextResponse.json({ error: 'Betaling kon niet worden aangemaakt' }, { status: 500 })
    }

  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json({ error: 'Interne server fout' }, { status: 500 })
  }
}