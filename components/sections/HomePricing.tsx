import Link from 'next/link'
import { BTW, PLANS, TRIAL_DAGEN } from '@/lib/constants'
import { fmtEuro } from '@/lib/pricing'

// Compact commercieel prijsblok voor de homepage (light theme). Geen volledige
// pricingtabel: de boodschap is "vanaf €10, alles inbegrepen, 14 dagen gratis".
// De volledige uitleg staat op /pricing. Server component, geen state.

const SIGNUP_HREF = '/registreren'
const vanaf = Math.min(...PLANS.map(p => p.price.month))

const punten = [
  `${TRIAL_DAGEN} dagen gratis proberen`,
  'Geen creditcard of incassomachtiging nodig',
  'Kies je abonnement pas tijdens de trial',
]

export default function HomePricing() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="bg-white border border-[#e4ecf2] rounded-2xl shadow-[0_8px_32px_rgba(0,144,184,.08)] p-7 md:p-10 grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-12 items-center">
        <div>
          <h2
            className="font-extrabold tracking-tight text-[#0f2133] leading-[1.1] mb-3"
            style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.4rem)' }}
          >
            Snellio vanaf {fmtEuro(vanaf)} per maand.
          </h2>
          <p className="text-[#0f2133] text-[1.05rem] leading-[1.55] mb-5">
            <strong>Alle functies inbegrepen.</strong> Je betaalt alleen voor de grootte van je bedrijf:
            het aantal monteurs en installaties. Geen modules, geen toeslagen.
          </p>
          <ul className="flex flex-col gap-2 list-none mb-7">
            {punten.map(p => (
              <li key={p} className="flex items-center gap-2.5 text-[#0f2133] text-[.95rem]">
                <span className="w-5 h-5 rounded-full bg-[rgba(18,168,122,.15)] text-[var(--green)] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href={SIGNUP_HREF}
              className="inline-flex items-center justify-center font-semibold rounded-[10px] bg-[var(--accent)] text-white px-[22px] py-3 hover:bg-[#007a9c] transition-colors text-[.95rem]"
            >
              {TRIAL_DAGEN} dagen gratis proberen →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center font-semibold rounded-[10px] bg-white border-[1.5px] border-[var(--accent)] text-[var(--accent)] px-[22px] py-3 hover:bg-[rgba(0,144,184,.06)] transition-colors text-[.95rem]"
            >
              Bekijk alle prijzen
            </Link>
          </div>
        </div>

        {/* Compacte pakketrij: naam, doelgroep, maandprijs */}
        <ul className="flex flex-col divide-y divide-[#e4ecf2] list-none border border-[#e4ecf2] rounded-xl overflow-hidden bg-[#f9fbfd]">
          {PLANS.map(plan => (
            <li key={plan.id} className={`flex items-center justify-between gap-4 px-5 py-3.5 ${plan.featured ? 'bg-[rgba(0,144,184,.05)]' : ''}`}>
              <div className="min-w-0">
                <p className="font-semibold text-[#0f2133] text-[.95rem] flex items-center gap-2">
                  {plan.name}
                  {plan.featured && (
                    <span className="text-[.6rem] font-bold uppercase tracking-wide bg-[var(--accent)] text-white px-2 py-0.5 rounded-full">
                      Meest gekozen
                    </span>
                  )}
                </p>
                <p className="text-[#5f7791] text-xs truncate">{plan.tagline}</p>
              </div>
              <p className="shrink-0 text-right">
                <span className="font-extrabold text-[#0f2133] text-lg tabular-nums">{fmtEuro(plan.price.month)}</span>
                <span className="text-[#5f7791] text-xs"> /mnd</span>
              </p>
            </li>
          ))}
          <li className="px-5 py-2.5 text-[#5f7791] text-[.7rem] bg-white">
            Alle prijzen {BTW.short} · Pro en Enterprise: extra monteurs tegen een vaste meerprijs
          </li>
        </ul>
      </div>
    </div>
  )
}
