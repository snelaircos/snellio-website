'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PLANS, type Plan } from '@/lib/constants'

interface PricingProps {
  hideHeader?: boolean
  plans?:      readonly Plan[]
}

export default function Pricing({ hideHeader = false, plans = PLANS }: PricingProps) {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="py-10 px-[5%]" id="prijzen">
      <div className="mx-auto max-w-7xl">

        {/* Header — alleen getoond op standalone homepage */}
        {!hideHeader && (
          <div className="text-center mb-8">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Transparante prijzen
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight leading-[1.15]"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              Kies wat bij jouw bedrijf <span className="text-[var(--cyan)]">past</span>
            </h2>
            <p className="mt-3 text-[var(--text2)] text-base max-w-md mx-auto">
              14 dagen gratis proberen.{' '}
              <span className="text-white font-medium">Schaal wanneer je groeit.</span>
            </p>
          </div>
        )}

        {/* Toggle */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!annual ? 'text-white' : 'text-[var(--muted2)]'}`}>
              Maandelijks
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] ${annual ? 'bg-[var(--cyan)]' : 'bg-[var(--navy3)]'}`}
              role="switch"
              aria-checked={annual}
              aria-label="Jaarlijkse facturering"
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${annual ? 'translate-x-6' : ''}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${annual ? 'text-white' : 'text-[var(--muted2)]'}`}>
              Jaarlijks
            </span>
          </div>
          <p className="text-xs text-[var(--muted2)]">
            Kies jaarlijks en betaal slechts 10 maanden —{' '}
            <span className="text-[var(--green)] font-semibold">2 maanden cadeau 🎁</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7 items-start">
          {plans.map((plan, i) => {
            const isPro = plan.featured

            return (
              <article
                key={plan.id}
                className={`reveal relative flex flex-col rounded-2xl transition-all duration-300
                  hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(0,0,0,.45)]
                  ${isPro
                    ? 'scale-105 z-10 p-[1px] bg-gradient-to-b from-[rgba(10,187,214,.45)] to-[rgba(10,187,214,.04)] shadow-[0_0_60px_rgba(10,187,214,.22)]'
                    : 'bg-[var(--navy3)] border border-[var(--border)] p-7 hover:border-[rgba(10,187,214,.3)]'
                  }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {isPro ? (
                  <div className="relative flex flex-col flex-1 rounded-[14px] bg-gradient-to-b from-[#122436] to-[#0d1e2e] px-7 pt-9 pb-7 overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-25 pointer-events-none"
                      style={{ background: 'radial-gradient(circle at top, rgba(10,187,214,.25), transparent 70%)' }}
                    />
                    {'badge' in plan && plan.badge && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-3 bg-[var(--cyan)] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap z-20">
                        {plan.badge}
                      </div>
                    )}
                    <PlanContent plan={plan} annual={annual} isPro />
                  </div>
                ) : (
                  <>
                    {'badge' in plan && plan.badge && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[var(--cyan)] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap z-20">
                        {plan.badge}
                      </div>
                    )}
                    <PlanContent plan={plan} annual={annual} isPro={false} />
                  </>
                )}
              </article>
            )
          })}
        </div>

        {/* Trust row */}
        <p className="mt-8 text-center text-xs text-[var(--muted)] tracking-wide">
          Geen creditcard nodig &nbsp;·&nbsp; Maandelijks opzegbaar &nbsp;·&nbsp; Nederlandse support
        </p>
      </div>
    </section>
  )
}

// ── PlanContent ───────────────────────────────────────────────────────────────

interface PlanContentProps {
  plan:   Plan
  annual: boolean
  isPro:  boolean
}

function PlanContent({ plan, annual, isPro }: PlanContentProps) {
  return (
    <>
      <div className="relative font-outfit font-bold text-white text-xl mb-1">{plan.name}</div>

      {/* Prijs */}
      <div className="relative flex items-baseline gap-1 my-4">
        <span className="text-[var(--cyan)] font-bold text-xl">€</span>
        <span className="font-outfit font-black text-4xl leading-none text-white">
          {annual ? plan.price.year : plan.price.month}
        </span>
        <span className="text-xs text-[var(--muted2)]">/{annual ? 'jaar' : 'mnd'}</span>
      </div>

      {/* Tagline */}
      <p className="relative text-[var(--muted2)] text-xs mb-5 pb-5 border-b border-[var(--border)]">
        {plan.tagline}
      </p>

      {/* Features */}
      <ul className="relative flex flex-col gap-2.5 mb-6 flex-1 list-none">
        {plan.features.map(f => (
          <li
            key={f.label}
            className={`flex items-start gap-2.5 text-sm
              ${f.included ? 'text-[var(--text2)]' : 'opacity-35 line-through text-[var(--muted)]'}`}
          >
            <span className={`shrink-0 mt-px font-bold ${f.included ? 'text-[var(--green)]' : 'text-[var(--muted)]'}`}>
              {f.included ? '✓' : '✗'}
            </span>
            {f.label}
          </li>
        ))}
      </ul>

      {/* Extras */}
      {plan.extras.length > 0 && (
        <div className="relative mb-5 pt-4 border-t border-[var(--border)]">
          <p className="font-mono text-[.6rem] text-[var(--muted2)] uppercase tracking-[.08em] mb-2.5">
            Opties tegen meerprijs
          </p>
          <ul className="flex flex-col gap-1.5 list-none">
            {plan.extras.map(e => (
              <li key={e} className="text-sm text-[var(--orange)] flex items-center gap-2">
                <span className="font-bold">+</span>{e}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <Link
        href={plan.href}
        className={`relative text-center py-3 px-6 rounded-xl font-bold text-sm transition-all duration-200
          ${isPro
            ? 'bg-[var(--cyan)] text-[#061018] hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(10,187,214,.4)]'
            : 'bg-[rgba(255,255,255,.04)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--cyan)] hover:text-white'
          }`}
      >
        {plan.cta}
      </Link>
    </>
  )
}
