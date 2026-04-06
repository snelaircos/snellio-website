import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import mollie from '@mollie/api-client'

interface VerifyRequest {
  signup_id: string
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyRequest = await req.json()

    if (!body.signup_id?.trim()) {
      return NextResponse.json({ error: 'Aanmeldings-ID is verplicht' }, { status: 400 })
    }

    // Supabase admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    // Find pending signup by signup_id
    const { data: signup, error: fetchError } = await supabase
      .from('pending_signups')
      .select('*')
      .eq('id', body.signup_id)
      .single()

    if (fetchError || !signup) {
      console.error('Pending signup not found:', fetchError)
      return NextResponse.json({ error: 'Aanmelding niet gevonden' }, { status: 404 })
    }

    if (!signup.payment_id) {
      return NextResponse.json({ error: 'Betaling niet gevonden' }, { status: 404 })
    }

    // Mollie client
    const mollieApiKey = process.env.MOLLIE_API_KEY
    if (!mollieApiKey) {
      console.error('Missing MOLLIE_API_KEY')
      return NextResponse.json({ error: 'Betaling configuratie fout' }, { status: 500 })
    }

    const mollieClient = mollie({ apiKey: mollieApiKey })

    // Get payment from Mollie
    const payment = await mollieClient.payments.get(signup.payment_id)

    if (payment.status !== 'paid') {
      return NextResponse.json({
        error: 'Betaling is niet voltooid',
        status: payment.status
      }, { status: 400 })
    }

    // Create user in Supabase Auth
    const { data: user, error: createError } = await supabase.auth.admin.createUser({
      email: signup.email,
      password: signup.password,
      user_metadata: {
        company_name: signup.company_name,
        package_id: signup.package_id,
        full_name: signup.full_name
      },
      email_confirm: true // Skip email confirmation for now
    })

    if (createError) {
      console.error('User creation error:', createError)

      // Handle duplicate user - return success if user already exists
      if (createError.message?.includes('already registered') || createError.message?.includes('User already registered')) {
        // Clean up pending signup
        await supabase.from('pending_signups').delete().eq('id', signup.id)
        return NextResponse.json({
          success: true,
          message: 'Account bestaat al',
          user_id: null, // We don't have the user ID here
          email: signup.email
        })
      }

      return NextResponse.json({ error: 'Account kon niet worden aangemaakt' }, { status: 500 })
    }

    // Create initial subscription record
    if (user.user && user.user.id) {
      const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.user.id,
          plan_key: signup.package_id,
          status: 'trialing',
          payment_provider: 'mollie',
          payment_id: signup.payment_id,
          starts_at: new Date().toISOString(),
          trial_ends_at: trialEndsAt,
          ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          mollie_customer_id: null,
          mollie_subscription_id: null
        })

      if (subscriptionError) {
        console.error('Failed to create subscription:', subscriptionError)
        // Continue anyway
      }
    }

    // Delete pending signup
    const { error: deleteError } = await supabase
      .from('pending_signups')
      .delete()
      .eq('id', signup.id)

    if (deleteError) {
      console.error('Failed to delete pending signup:', deleteError)
      // Continue anyway - user is created
    }

    // Success
    return NextResponse.json({
      success: true,
      message: 'Account succesvol aangemaakt',
      user_id: user.user?.id || null,
      email: signup.email
    })

  } catch (error) {
    console.error('Verify API error:', error)
    return NextResponse.json({ error: 'Interne server fout' }, { status: 500 })
  }
}