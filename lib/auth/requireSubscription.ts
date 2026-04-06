import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

export async function requireSubscription() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase env vars in requireSubscription')
    redirect('/pricing')
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  const accessToken = cookies().get('sb-access-token')?.value
  if (!accessToken) {
    redirect('/pricing')
  }

  // Decode user ID from Supabase access token JWT
  let userId: string | null = null
  try {
    const tokenPayload = accessToken.split('.')[1]
    const decoded = JSON.parse(Buffer.from(tokenPayload, 'base64').toString('utf8'))
    userId = decoded?.sub || null
  } catch (err) {
    console.error('Failed to decode Supabase JWT:', err)
    redirect('/pricing')
  }

  if (!userId) {
    redirect('/pricing')
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['active', 'past_due', 'trialing'])
    .order('ends_at', { ascending: false })
    .limit(1)
    .single()

  if (subscriptionError || !subscription) {
    redirect('/pricing')
  }

  const now = new Date().toISOString()
  const endsAt = subscription.ends_at

  if (subscription.status === 'active') {
    if (!endsAt || endsAt < now) {
      redirect('/pricing')
    }
    return subscription
  }

  if (subscription.status === 'trialing') {
    const trialEndsAt = subscription.trial_ends_at
    if (trialEndsAt && trialEndsAt > now) {
      return subscription
    }

    // Trial is over; mark expired
    await supabase
      .from('subscriptions')
      .update({ status: 'expired' })
      .eq('id', subscription.id)

    redirect('/pricing')
  }

  if (subscription.status === 'past_due') {
    const graceUntil = subscription.grace_until
    if (graceUntil && graceUntil > now) {
      return subscription
    }
    redirect('/pricing')
  }

  redirect('/pricing')
}
