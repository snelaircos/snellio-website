import { createClient } from '@supabase/supabase-js'

export async function getBillingData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const session = await supabase.auth.getSession()
  const user = session.data.session?.user
  if (!user) throw new Error('Niet ingelogd')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', user.id)
    .order('paid_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(10)

  return {
    subscription: subscription || null,
    payments: payments || []
  }
}
