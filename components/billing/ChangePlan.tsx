'use client'

import { useState } from 'react'

type PlanKey = 'starter' | 'basis' | 'pro' | 'enterprise'

interface ChangePlanProps {
  currentPlan: string
  pendingPlan?: string | null
}

const PLAN_LABELS: Record<PlanKey, string> = {
  starter: 'Starter',
  basis: 'Basis',
  pro: 'Pro',
  enterprise: 'Enterprise'
}

export default function ChangePlan({ currentPlan, pendingPlan }: ChangePlanProps) {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const changeTo = async (plan: PlanKey) => {
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/billing/change-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_key: plan })
      })

      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error || 'Kon plan niet wijzigen')
      } else {
        setMessage(data.message || 'Plan wijziging geregistreerd')
        window.location.reload()
      }
    } catch {
      setMessage('Netwerkfout bij plan wijziging')
    }

    setLoading(false)
  }

  return (
    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--navy)] p-6">
      <h2 className="text-xl font-bold mb-3">Wijzig abonnement</h2>

      {pendingPlan ? (
        <p className="mb-4 text-yellow-300">Je abonnement wordt gewijzigd naar &apos;{pendingPlan}&apos; bij de volgende betaling</p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {(['starter', 'basis', 'pro', 'enterprise'] as PlanKey[]).map(plan => (
          <button
            key={plan}
            disabled={loading || plan === currentPlan}
            className={`rounded-lg px-4 py-2 font-semibold ${plan === currentPlan ? 'bg-slate-700 text-[var(--text)]' : 'bg-cyan-500 text-black'}`}
            onClick={() => changeTo(plan)}
          >
            {PLAN_LABELS[plan]}
          </button>
        ))}
      </div>

      {message ? <p className="mt-3 text-sm">{message}</p> : null}
    </div>
  )
}
