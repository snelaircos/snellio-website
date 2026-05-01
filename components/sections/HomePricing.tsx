'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PLANS } from '@/lib/constants'

// Light-theme pricing voor de HVAC homepage. Witte cards op #f4f7fa,
// Pro card heeft 'Meest gekozen' badge in --orange. Maandelijks/Jaarlijks
// toggle. CTA's gaan naar dezelfde checkout-flow als de bestaande Pricing.
export default function HomePricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <div>
      {/* Toggle */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium transition-colors ${!annual ? 'text-[#0f2133]' : 'text-[#8fafc8]'}`}>
            Maandelijks
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${annual ? 'bg-[var(--accent)]' : 'bg-[#e4ecf2]'}`}
            role="switch"
            aria-checked={annual}
            aria-label="Jaarlijkse facturering"
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${annual ? 'translate-x-6' : ''}`} />
          </button>
          <span className={`text-sm font-medium transition-colors ${annual ? 'text-[#0f2133]' : 'text-[#8fafc8]'}`}>
            Jaarlijks
          </span>
        </div>
        <p className="text-xs text-[#5f7791]">
          Kies jaarlijks en betaal slechts 10 maanden —{' '}
          <span className="text-[var(--green)] font-semibold">2 maanden cadeau 🎁</span>
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
        {PLANS.map(plan => {
          const isPro = plan.featured
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-xl bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,144,184,.15)]
                ${isPro
                  ? 'border-[var(--accent)] shadow-[0_2px_12px_rgba(0,144,184,.18)] xl:scale-[1.03]'
                  : 'border-[#e4ecf2] hover:border-[var(--accent)]'
                }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--orange)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap z-20 font-dm-sans">
                  {plan.badge}
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-syne font-bold text-[#0f2133] text-xl mb-1">{plan.name}</h3>

                {/* Prijs */}
                <div className="flex items-baseline gap-1 my-4">
                  <span className="font-dm-mono text-[var(--accent)] font-medium text-xl">€</span>
                  <span className="font-syne font-extrabold text-4xl leading-none text-[#0f2133]">
                    {annual ? plan.price.year : plan.price.month}
                  </span>
                  <span className="text-xs text-[#5f7791]">/{annual ? 'jaar' : 'mnd'}</span>
                </div>

                <p className="text-[#5f7791] text-xs mb-5 pb-5 border-b border-[#e4ecf2]">
                  {plan.tagline}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-6 flex-1 list-none">
                  {plan.features.map(f => (
                    <li
                      key={f.label}
                      className={`flex items-start gap-2.5 text-sm
                        ${f.included ? 'text-[#0f2133]' : 'opacity-40 line-through text-[#8fafc8]'}`}
                    >
                      <span className={`shrink-0 mt-px font-bold ${f.included ? 'text-[var(--green)]' : 'text-[#8fafc8]'}`}>
                        {f.included ? '✓' : '✗'}
                      </span>
                      {f.label}
                    </li>
                  ))}
                </ul>

                {/* Extras */}
                {plan.extras.length > 0 && (
                  <div className="mb-5 pt-4 border-t border-[#e4ecf2]">
                    <p className="font-dm-mono text-[.6rem] text-[#8fafc8] uppercase tracking-[.08em] mb-2.5">
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
                  className={`text-center py-3 px-5 rounded-[10px] font-semibold text-sm transition-all duration-200
                    ${isPro
                      ? 'bg-[var(--accent)] text-white hover:bg-[#007a9c]'
                      : 'bg-white border-[1.5px] border-[var(--accent)] text-[var(--accent)] hover:bg-[rgba(0,144,184,.06)]'
                    }`}
                >
                  Start met {plan.name}
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      <p className="text-center text-xs text-[#5f7791] mt-8">
        Alle pakketten 14 dagen gratis · Geen creditcard nodig · Maandelijks opzegbaar
      </p>
    </div>
  )
}
