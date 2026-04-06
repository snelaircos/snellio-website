import { createClient } from '@supabase/supabase-js'

export async function getBillingOverview() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  const { data: subscriptions, error: subErr } = await supabase
    .from('subscriptions')
    .select('*')
    .order('ends_at', { ascending: false })
    .limit(100)

  if (subErr) {
    throw new Error('Kon subscriptions niet ophalen')
  }

  const result = []
  for (const sub of subscriptions || []) {
    const { data: payments } = await supabase
      .from('payments')
      .select('*')
      .eq('subscription_id', sub.id)
      .order('paid_at', { ascending: false })
      .limit(1)

    let email = null
    if (sub.user_id) {
      const { data: userData, error: userErr } = await supabase.auth.admin.getUserById(sub.user_id)
      if (!userErr && userData?.user?.email) {
        email = userData.user.email
      }
    }

    result.push({
      subscription_id: sub.id,
      email,
      plan_key: sub.plan_key,
      pending_plan_key: sub.pending_plan_key || null,
      status: sub.status,
      ends_at: sub.ends_at,
      grace_until: sub.grace_until || null,
      last_payment_status: payments?.[0]?.status || null,
      last_payment_date: payments?.[0]?.paid_at || null,
      churn_risk: sub.status === 'past_due' || Boolean(sub.pending_plan_key)
    })
  }

  return result
}
