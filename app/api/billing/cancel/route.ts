import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import mollie from '@mollie/api-client'
import { cancelSubscription } from '../../../../lib/mollie/cancelSubscription'
import { sendEmail } from '@/lib/email/sendEmail'

export async function POST() {
  try {
    console.info('[billing/cancel] Cancel request received')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    const session = await supabase.auth.getSession()
    const user = session.data.session?.user

    if (!user) {
      return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })
    }

    const { data: subscription, error: subErr } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['active', 'canceled'])
      .order('ends_at', { ascending: false })
      .limit(1)
      .single()

    if (subErr || !subscription) {
      return NextResponse.json({ error: 'Abonnement niet gevonden' }, { status: 404 })
    }

    if (!subscription.mollie_subscription_id || !subscription.mollie_customer_id) {
      return NextResponse.json({ error: 'Mollie abonnement niet gekoppeld' }, { status: 400 })
    }

    const mollieApiKey = process.env.MOLLIE_API_KEY
    if (!mollieApiKey) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    const mollieClient = mollie({ apiKey: mollieApiKey })

    try {
      await cancelSubscription({
        mollieClient,
        customerId: subscription.mollie_customer_id,
        subscriptionId: subscription.mollie_subscription_id
      })
      console.info('[billing/cancel] Mollie cancel success')
    } catch (cancelError) {
      console.error('[billing/cancel] Mollie cancel failed', cancelError)
      return NextResponse.json({ error: 'Kon Mollie abonnement niet annuleren' }, { status: 500 })
    }

    const updatedSubscription = await mollieClient.customerSubscriptions.get(
      subscription.mollie_subscription_id,
      { customerId: subscription.mollie_customer_id }
    )

    if (updatedSubscription.status !== 'canceled') {
      console.error('[billing/cancel] mollie status after cancel is not canceled', updatedSubscription.status)
      return NextResponse.json({ error: 'Mollie abonnementstatus is niet geannuleerd' }, { status: 500 })
    }

    const { error: updateErr } = await supabase
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('id', subscription.id)

    if (updateErr) {
      return NextResponse.json({ error: 'Kon abonnement niet bijwerken' }, { status: 500 })
    }

    try {
      if (subscription.user_id) {
        const { data: userData } = await supabase.auth.admin.getUserById(subscription.user_id)
        const userEmail = userData.user?.email
        if (userEmail) {
          await sendEmail({
            to: userEmail,
            subject: 'Je abonnement stopt binnenkort',
            html: `<p>Beste gebruiker,</p><p>Je abonnement is geannuleerd en stopt aan het einde van de huidige periode. Bedankt voor het gebruik van Snellio.</p><p>Als je het abonnement wilt herstellen, ga naar <a href='https://snellio.nl/billing'>je billing pagina</a>.</p>`,
            text: 'Je abonnement is geannuleerd. Ga naar https://snellio.nl/billing om te herstellen.'
          })
        }
      }
    } catch (emailError) {
      console.error('[billing/cancel] failed to send canceled email', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[billing/cancel] error', error)
    return NextResponse.json({ error: 'Interne server fout' }, { status: 500 })
  }
}
