'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AUTOMOTIVE_PLANS } from '@/lib/constants'

// Light-theme pricing voor /automotive. Witte cards op #f4f7fa.
// Pro card heeft "Aanbevolen"-pill in cyan, zoals het Claude Design ontwerp voorschrijft.
// Maandelijks/Jaarlijks toggle. Gebruikt AUTOMOTIVE_PLANS verbatim — geen prijswijzigingen.
export default function AutomotivePricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <div>
      {/* Toggle */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium transition-colors ${!annual ? 'text-[#0f2133]' : 'text-[#8ea2b8]'}`}>
            Maandelijks
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0090b8] ${annual ? 'bg-[#0090b8]' : 'bg-[#e4ecf2]'}`}
            role="switch"
            aria-checked={annual}
            aria-label="Jaarlijkse facturering"
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${annual ? 'translate-x-6' : ''}`} />
          </button>
          <span className={`text-sm font-medium transition-colors ${annual ? 'text-[#0f2133]' : 'text-[#8ea2b8]'}`}>
            Jaarlijks
          </span>
        </div>
        <p className="text-xs text-[#5f7791]">
          Kies jaarlijks en betaal slechts 10 maanden —{' '}
          <span className="text-[#12a87a] font-semibold">2 maanden cadeau 🎁</span>
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
        {AUTOMOTIVE_PLANS.map(plan => {
          const isPro = plan.featured
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-[20px] bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,144,184,.15)]
                ${isPro
                  ? 'border-2 border-[#0090b8] shadow-[0_12px_36px_rgba(0,144,184,.18)] xl:scale-[1.03]'
                  : 'border-[rgba(15,33,51,.08)] shadow-[0_1px_3px_rgba(15,33,51,.06)] hover:border-[#0090b8]'
                }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-7 bg-[#0090b8] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap z-20 tracking-[.04em]">
                  {plan.badge}
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                <p className="font-dm-mono text-[.72rem] uppercase tracking-[.10em] text-[#5f7791] mb-2">
                  {plan.name}
                </p>

                {/* Prijs */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[#0f2133] font-extrabold text-[38px] leading-none tracking-[-.02em]">
                    € {annual ? plan.price.year : plan.price.month}
                  </span>
                  <span className="text-[15px] text-[#5f7791] font-medium">/{annual ? 'jaar' : 'mnd'}</span>
                </div>

                <p className="text-[#5f7791] text-sm mb-5 pb-5 border-b border-[rgba(15,33,51,.08)]">
                  {plan.tagline}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-2 mb-6 flex-1 list-none p-0">
                  {plan.features.map(f => (
                    <li
                      key={f.label}
                      className={`flex items-start gap-2.5 text-[14.5px]
                        ${f.included ? 'text-[#0f2133]' : 'opacity-50 line-through text-[#8ea2b8]'}`}
                    >
                      <span className={`shrink-0 mt-px font-extrabold ${f.included ? 'text-[#12a87a]' : 'text-[#8ea2b8]'}`}>
                        {f.included ? '✓' : '✗'}
                      </span>
                      {f.label}
                    </li>
                  ))}
                </ul>

                {/* Extras */}
                {plan.extras.length > 0 && (
                  <div className="mb-5 pt-4 border-t border-[rgba(15,33,51,.08)]">
                    <p className="font-dm-mono text-[.6rem] text-[#8ea2b8] uppercase tracking-[.08em] mb-2.5">
                      Opties tegen meerprijs
                    </p>
                    <ul className="flex flex-col gap-1.5 list-none p-0">
                      {plan.extras.map(e => (
                        <li key={e} className="text-sm text-[#e07a30] flex items-center gap-2">
                          <span className="font-bold">+</span>{e}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`text-center py-3 px-5 rounded-[10px] font-semibold text-sm transition-colors duration-200
                    ${isPro
                      ? 'bg-[#0090b8] text-white hover:bg-[#007a9c]'
                      : 'bg-white border-[1.5px] border-[#0090b8] text-[#0090b8] hover:bg-[#e6f6fa]'
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
