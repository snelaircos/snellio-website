import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { getBillingOverview } from '@/lib/admin/getBillingOverview'

export const dynamic = 'force-dynamic'

export default async function AdminBillingPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const session = await supabase.auth.getSession()
  const email = session.data.session?.user?.email

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  if (!email || !adminEmails.includes(email.toLowerCase())) {
    redirect('/app')
  }

  const overview = await getBillingOverview()

  return (
    <div className="min-h-screen bg-[var(--navy2)] text-white py-16 px-[5%]">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">Admin Billing overzicht</h1>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--navy)]">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[var(--navy3)] text-left text-[var(--text2)]">
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Plan</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Loopt tot</th>
                <th className="px-3 py-2">Laatste betaling</th>
                <th className="px-3 py-2">Laatste status</th>
                <th className="px-3 py-2">Churn risico</th>
              </tr>
            </thead>
            <tbody>
              {overview.map(item => (
                <tr key={item.subscription_id} className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">{item.email || '-'}</td>
                  <td className="px-3 py-2">{item.plan_key}</td>
                  <td className="px-3 py-2">{item.status}</td>
                  <td className="px-3 py-2">{item.ends_at ? new Date(item.ends_at).toLocaleDateString('nl-NL') : '-'}</td>
                  <td className="px-3 py-2">{item.last_payment_date ? new Date(item.last_payment_date).toLocaleDateString('nl-NL') : '-'}</td>
                  <td className="px-3 py-2">{item.last_payment_status || '-'}</td>
                  <td className={`px-3 py-2 ${item.churn_risk ? 'text-orange-300 font-bold' : 'text-emerald-300'}`}>
                    {item.churn_risk ? 'Hoog' : 'Laag'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
