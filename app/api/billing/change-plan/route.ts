import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import mollie from '@mollie/api-client'

const PACKAGE_PRICES: Record<string, number> = {
  starter: 9.95,
  basis: 29.95,
  pro: 69.95,
  enterprise: 129.95
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newPlanKey = String(body.plan_key || '').trim().toLowerCase()

    if (!newPlanKey || !PACKAGE_PRICES[newPlanKey]) {
      return NextResponse.json({ error: 'Ongeldig plan geselecteerd' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })
    }

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
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (subErr || !subscription) {
      return NextResponse.json({ error: 'Actief abonnement niet gevonden' }, { status: 404 })
    }

    if (!subscription.mollie_subscription_id || !subscription.mollie_customer_id) {
      return NextResponse.json({ error: 'Mollie-abonnement niet gekoppeld' }, { status: 400 })
    }

    const currentPlanKey = String(subscription.plan_key || '').toLowerCase()
    const currentPrice = PACKAGE_PRICES[currentPlanKey] ?? 0
    const newPrice = PACKAGE_PRICES[newPlanKey]

    if (newPlanKey === currentPlanKey) {
      return NextResponse.json({ message: 'Het geselecteerde plan is al actief' })
    }

    const mollieApiKey = process.env.MOLLIE_API_KEY
    if (!mollieApiKey) {
      return NextResponse.json({ error: 'Mollie API sleutel niet geconfigureerd' }, { status: 500 })
    }

    const mollieClient = mollie({ apiKey: mollieApiKey })
    const isUpgrade = newPrice > currentPrice
    const isDowngrade = newPrice < currentPrice

    if (isUpgrade) {
      await mollieClient.customerSubscriptions.update(subscription.mollie_subscription_id, {
        customerId: subscription.mollie_customer_id,
        amount: { value: newPrice.toFixed(2), currency: 'EUR' },
        description: `Snellio plan gewijzigd naar ${newPlanKey}`
      })

      const { error: updateErr } = await supabase
        .from('subscriptions')
        .update({ plan_key: newPlanKey, pending_plan_key: null })
        .eq('id', subscription.id)

      if (updateErr) {
        return NextResponse.json({ error: 'Kon abonnement niet bijwerken' }, { status: 500 })
      }

      return NextResponse.json({ success: true, message: 'Upgrade wordt direct toegepast' })
    }

    if (isDowngrade) {
      const { error: updateErr } = await supabase
        .from('subscriptions')
        .update({ pending_plan_key: newPlanKey })
        .eq('id', subscription.id)

      if (updateErr) {
        return NextResponse.json({ error: 'Kon downgrade niet markeren' }, { status: 500 })
      }

      return NextResponse.json({ success: true, message: 'Downgrade gepland voor de volgende factuur' })
    }

    return NextResponse.json({ error: 'Plan wijziging niet uitgevoerd' }, { status: 400 })
  } catch (error) {
    console.error('[billing/change-plan] error', error)
    return NextResponse.json({ error: 'Interne server fout' }, { status: 500 })
  }
}