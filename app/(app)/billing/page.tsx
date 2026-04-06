import { getBillingData } from '@/lib/billing/getBillingData'
import ChangePlan from '@/components/billing/ChangePlan'

export const dynamic = 'force-dynamic'

const statusBadge = (status: string) => {
  if (status === 'active') return 'bg-emerald-500 text-white'
  if (status === 'past_due') return 'bg-amber-500 text-black'
  if (status === 'canceled' || status === 'expired') return 'bg-rose-500 text-white'
  return 'bg-slate-500 text-white'
}

export default async function BillingPage() {
  const { subscription, payments } = await getBillingData()

  if (!subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center px-[5%]">
        <div className="text-white">Geen abonnement gevonden.</div>
      </div>
    )
  }

  const canReactivate = subscription.status === 'canceled' && new Date(subscription.ends_at) > new Date()

  return (
    <div className="min-h-screen bg-[var(--navy2)] text-white py-16 px-[5%]">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--navy)] p-6">
          <h1 className="text-2xl font-bold mb-4">Abonnement</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-[var(--text2)]">Huidig plan</p>
              <p>{subscription.plan_key}</p>
            </div>
            {subscription.status === 'trialing' && subscription.trial_ends_at ? (
              <div className="space-y-2">
                <p className="text-sm text-[var(--text2)]">Proefperiode eindigt</p>
                <p>{new Date(subscription.trial_ends_at).toLocaleDateString('nl-NL')}</p>
                <p className="text-green-300">{Math.max(0, Math.ceil((new Date(subscription.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} dagen over</p>
              </div>
            ) : null}
            <div className="space-y-2">
              <p className="text-sm text-[var(--text2)]">Status</p>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(subscription.status)}`}>{subscription.status}</span>
              {subscription.status === 'past_due' ? (
                <p className="text-yellow-300 text-sm">Je betaling is mislukt. Werk je betaalgegevens bij om toegang te behouden.</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-[var(--text2)]">Begon op</p>
              <p>{new Date(subscription.starts_at).toLocaleDateString('nl-NL')}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-[var(--text2)]">Loopt tot</p>
              <p>{new Date(subscription.ends_at).toLocaleDateString('nl-NL')}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-[var(--text2)]">Mollie klant-ID</p>
              <p>{subscription.mollie_customer_id || 'Niet beschikbaar'}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-[var(--text2)]">Mollie abonnement-ID</p>
              <p>{subscription.mollie_subscription_id || 'Niet beschikbaar'}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-[var(--text2)]">Je abonnement blijft actief tot de einddatum.</p>
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-lg bg-rose-500 px-4 py-2 font-semibold"
                onClick={async () => {
                  await fetch('/api/billing/cancel', { method: 'POST' })
                  window.location.reload()
                }}
              >
                Abonnement stoppen
              </button>
              <button
                disabled={!canReactivate}
                className={`rounded-lg px-4 py-2 font-semibold ${canReactivate ? 'bg-cyan-500 text-black' : 'bg-slate-700 text-[var(--text)]'}`}
              >
                {canReactivate ? 'Abonnement opnieuw activeren' : 'Binnenkort beschikbaar'}
              </button>              {subscription.status === 'past_due' ? (
                <button
                  className="rounded-lg bg-amber-500 px-4 py-2 font-semibold"
                  onClick={() => window.location.assign('/pricing')}
                >
                  Betaal opnieuw
                </button>
              ) : null}            </div>
          </div>
        </section>

        <ChangePlan currentPlan={subscription.plan_key || ''} pendingPlan={subscription.pending_plan_key} />

        <section className="rounded-xl border border-[var(--border)] bg-[var(--navy)] p-6">
          <h2 className="text-xl font-bold mb-4">Laatste betalingen</h2>
          {payments.length === 0 ? (
            <p>Er zijn nog geen betalingen gevonden.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-[var(--text2)] uppercase tracking-wider">
                    <th className="py-2 px-3">Betaaldatum</th>
                    <th className="py-2 px-3">Bedrag</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Mollie betaling</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment.mollie_payment_id} className="border-t border-[var(--border)]">
                      <td className="py-2 px-3">{payment.paid_at ? new Date(payment.paid_at).toLocaleString('nl-NL') : '-'}</td>
                      <td className="py-2 px-3">€ {Number(payment.amount).toFixed(2)}</td>
                      <td className="py-2 px-3">{payment.status}</td>
                      <td className="py-2 px-3">{payment.mollie_payment_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
