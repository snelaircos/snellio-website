import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import mollie from '@mollie/api-client'
import { sendEmail } from '@/lib/email/sendEmail'

export async function POST(req: NextRequest) {
  try {
    // Mollie stuurt webhooks als application/x-www-form-urlencoded: "id=tr_xxx"
    const form = await req.formData()
    const paymentId = String(form.get('id') || '')

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing payment id' }, { status: 400 })
    }

    const mollieApiKey = process.env.MOLLIE_API_KEY
    if (!mollieApiKey) {
      console.error('[mollie/webhook] missing MOLLIE_API_KEY')
      return NextResponse.json({ error: 'Server configured incorrectly' }, { status: 500 })
    }

    const mollieClient = mollie({ apiKey: mollieApiKey })
    const payment = await mollieClient.payments.get(paymentId)

    if (!payment) {
      console.info('[mollie/webhook] payment not found', paymentId)
      return NextResponse.json({ received: true })
    }

    const paymentStatus = String(payment.status)

    if (paymentStatus !== 'paid' && paymentStatus !== 'failed') {
      console.info('[mollie/webhook] payment status not relevant', paymentId, paymentStatus)
      return NextResponse.json({ received: true })
    }

    const subscriptionId = payment.subscriptionId
    if (!subscriptionId) {
      console.info('[mollie/webhook] payment has no subscriptionId', paymentId)
      return NextResponse.json({ received: true })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    const { data: subscription, error: subErr } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('mollie_subscription_id', subscriptionId)
      .single()

    if (subErr || !subscription) {
      console.warn('[mollie/webhook] subscription not found', subscriptionId)
      return NextResponse.json({ received: true })
    }

    // Persist payment record (avoid duplicates)
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('*')
      .eq('mollie_payment_id', payment.id)
      .single()

    if (!existingPayment) {
      await supabase.from('payments').insert({
        user_id: subscription.user_id,
        subscription_id: subscription.id,
        mollie_payment_id: payment.id,
        amount: Number(payment.amount?.value || 0),
        currency: payment.amount?.currency || 'EUR',
        status: payment.status,
        paid_at: payment.paidAt || null,
        created_at: new Date().toISOString()
      })
    }

    if (paymentStatus === 'failed') {
      const graceUntil = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: 'past_due', grace_until: graceUntil })
        .eq('id', subscription.id)

      if (error) {
        console.error('[mollie/webhook] failed to update subscription past_due', error)
        return NextResponse.json({ error: 'Failed to set past_due' }, { status: 500 })
      }

      try {
        if (subscription.user_id) {
          const { data: userData } = await supabase.auth.admin.getUserById(subscription.user_id)
          const userEmail = userData.user?.email
          if (userEmail) {
            await sendEmail({
              to: userEmail,
              subject: 'Betaling mislukt',
              html: `<p>Beste gebruiker,</p><p>Helaas is uw recente betaling mislukt. Dit kan gebeuren bij een verlopen of geweigerde kaart.</p><p>Ga naar uw <a href='https://snellio.nl/billing'>billing pagina</a> om uw betaalgegevens bij te werken. U heeft een termijn van 3 dagen om uw service te behouden.</p>`,
              text: 'Betaling mislukt. Ga naar: https://snellio.nl/billing'
            })
          }
        }
      } catch (emailError) {
        console.error('[mollie/webhook] failed to send failed payment email', emailError)
      }

      return NextResponse.json({ received: true })
    }

    if (paymentStatus === 'paid') {
      interface SubscriptionUpdate {
        status: string
        grace_until: null
        plan_key?: string
        pending_plan_key?: null
      }
      const updates: SubscriptionUpdate = { status: 'active', grace_until: null }

      if (subscription.pending_plan_key) {
        updates.plan_key = subscription.pending_plan_key
        updates.pending_plan_key = null
      }

      const { error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', subscription.id)

      if (error) {
        console.error('[mollie/webhook] failed to update subscription after payment', error)
        return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
      }

      return NextResponse.json({ received: true })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[mollie/webhook] error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}