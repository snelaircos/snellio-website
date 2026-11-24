'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BTW, JAAR_MAANDEN_BETAALD, ZELFBEDIENING_MAX_MONTEURS } from '@/lib/constants'
import { planById, maandprijsVoorTeam, extraMonteurs, jaarprijs, fmtEuro } from '@/lib/pricing'

// Kleine, puur client-side rekentool: hoeveel kost Pro of Enterprise voor
// een team van N monteurs? Geen checkout, geen tracking, geen API-calls.
// Prijzen per 1-1-2027 (excl. btw): Pro tot en met 5 monteurs, Enterprise
// vanaf 6 tot en met 15. Daarboven een offerte op maat.

const MIN = 1
const MAX = ZELFBEDIENING_MAX_MONTEURS + 1

interface Props {
  annual: boolean
}

export default function PricingCalculator({ annual }: Props) {
  const [monteurs, setMonteurs] = useState(3)

  const pro        = planById('pro')
  const enterprise = planById('enterprise')
  const basis      = planById('basis')

  const proMaand = maandprijsVoorTeam(pro, monteurs)
  const entMaand = maandprijsVoorTeam(enterprise, monteurs)
  const proExtra = extraMonteurs(pro, monteurs)
  const entExtra = extraMonteurs(enterprise, monteurs)
  const proKan   = monteurs <= pro.monteurs.max
  const offerte  = monteurs > ZELFBEDIENING_MAX_MONTEURS

  const verdict =
    offerte
      ? { tekst: `Meer dan ${ZELFBEDIENING_MAX_MONTEURS} monteurs? Neem contact op voor een offerte op maat.`, kleur: 'neutral' as const }
      : monteurs === 1
        ? { tekst: `Met 1 monteur past ${basis.name} (${fmtEuro(basis.price.month)} per maand, onbeperkt installaties).`, kleur: 'neutral' as const }
        : proKan
          ? { tekst: `${pro.name} past bij dit team. ${enterprise.name} kan ook, met AI-assistent, eigen maildomein, onboarding en voorrang bij support.`, kleur: 'neutral' as const }
          : { tekst: `Vanaf ${pro.monteurs.max + 1} monteurs kies je ${enterprise.name}.`, kleur: 'green' as const }

  const clamp = (n: number) => Math.min(MAX, Math.max(MIN, n))

  return (
    <div className="mt-14 bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-start">
        {/* Invoer */}
        <div>
          <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-2">Rekentool</p>
          <h3 className="font-outfit font-bold text-[var(--text)] text-xl md:text-2xl tracking-tight mb-2">
            Wat kost Snellio voor jouw team?
          </h3>
          <p className="text-[var(--muted2)] text-sm leading-relaxed mb-6">
            Pro heeft {pro.monteurs.inbegrepen} monteurs inbegrepen, daarna {fmtEuro(pro.monteurs.extra!.prijs)} per extra monteur, tot en met {pro.monteurs.max}.
            Enterprise heeft {enterprise.monteurs.inbegrepen} monteurs inbegrepen, daarna {fmtEuro(enterprise.monteurs.extra!.prijs)} per extra monteur, tot en met {enterprise.monteurs.max}.
          </p>

          <label htmlFor="monteurs-range" className="block text-[var(--text2)] text-sm font-medium mb-2">
            Aantal monteurs
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMonteurs(m => clamp(m - 1))}
              disabled={monteurs <= MIN}
              aria-label="Eén monteur minder"
              className="w-10 h-10 rounded-xl border border-[var(--border)] bg-white text-[var(--text)] font-bold text-lg hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-40 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text)] transition-colors"
            >
              −
            </button>
            <div className="flex-1">
              <input
                id="monteurs-range"
                type="range"
                min={MIN}
                max={MAX}
                value={monteurs}
                onChange={e => setMonteurs(clamp(Number(e.target.value)))}
                className="w-full accent-[var(--accent)]"
                aria-valuemin={MIN}
                aria-valuemax={MAX}
                aria-valuenow={monteurs}
              />
            </div>
            <button
              type="button"
              onClick={() => setMonteurs(m => clamp(m + 1))}
              disabled={monteurs >= MAX}
              aria-label="Eén monteur meer"
              className="w-10 h-10 rounded-xl border border-[var(--border)] bg-white text-[var(--text)] font-bold text-lg hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-40 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text)] transition-colors"
            >
              +
            </button>
            <output
              htmlFor="monteurs-range"
              className="w-12 text-center font-outfit font-black text-2xl text-[var(--text)] tabular-nums"
            >
              {offerte ? `${ZELFBEDIENING_MAX_MONTEURS}+` : monteurs}
            </output>
          </div>

          <p
            className={`mt-5 text-sm leading-relaxed rounded-xl px-4 py-3 border ${
              verdict.kleur === 'green'
                ? 'bg-[rgba(18,168,122,.08)] border-[rgba(18,168,122,.35)] text-[var(--green)] font-semibold'
                : 'bg-[var(--navy2)] border-[var(--border)] text-[var(--text2)]'
            }`}
            aria-live="polite"
          >
            {verdict.tekst}
          </p>
        </div>

        {/* Uitkomst */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { plan: pro,        maand: proMaand, extra: proExtra, kan: proKan && !offerte, best: monteurs > 1 && proKan && !offerte },
            { plan: enterprise, maand: entMaand, extra: entExtra, kan: !offerte,           best: !proKan && !offerte },
          ].map(({ plan, maand, extra, kan, best }) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-5 border transition-colors ${
                best ? 'border-[var(--accent)] bg-[rgba(0,144,184,.04)]' : 'border-[var(--border)] bg-[var(--navy2)]'
              }`}
            >
              {best && (
                <span className="absolute -top-2.5 right-4 bg-[var(--accent)] text-white text-[.65rem] font-bold px-2.5 py-0.5 rounded-full">
                  Past bij je team
                </span>
              )}
              <p className="font-outfit font-bold text-[var(--text)] text-lg">{plan.name}</p>
              <p className="text-[var(--muted2)] text-xs mb-3">{plan.monteurs.inbegrepen} monteurs inbegrepen</p>
              {!kan ? (
                <p className="text-[var(--text2)] text-sm mt-2">
                  {offerte ? 'Offerte op maat: info@snellio.nl' : `Tot en met ${plan.monteurs.max} monteurs`}
                </p>
              ) : (<>
              <p className="flex items-baseline gap-1">
                <span className="font-outfit font-black text-3xl text-[var(--text)] tabular-nums">{fmtEuro(maand)}</span>
                <span className="text-xs text-[var(--muted2)]">/ maand {BTW.short}</span>
              </p>
              <p className="text-[var(--muted2)] text-xs mt-1 tabular-nums">
                {extra > 0
                  ? `${fmtEuro(plan.price.month)} + ${extra} × ${fmtEuro(plan.monteurs.extra!.prijs)}`
                  : `Basisprijs, ${monteurs} van ${plan.monteurs.inbegrepen} monteurs gebruikt`}
              </p>
              </>)}
              {annual && kan && (
                <p className="text-[var(--text2)] text-xs mt-2 tabular-nums">
                  Per jaar: <strong className="text-[var(--text)]">{fmtEuro(jaarprijs(maand))}</strong>{' '}
                  <span className="text-[var(--muted2)]">({JAAR_MAANDEN_BETAALD} maanden betalen, 12 gebruiken)</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 border-t border-[var(--border)] pt-5">
        <Link
          href="/registreren"
          className="inline-flex items-center justify-center bg-gradient-btn text-white font-bold text-sm py-3 px-6 rounded-xl shadow-[0_4px_20px_rgba(0,144,184,.3)] hover:-translate-y-0.5 transition-all"
        >
          Start 14 dagen gratis →
        </Link>
        <p className="text-[var(--muted2)] text-xs">
          Geen creditcard nodig. Je kiest je abonnement pas tijdens de proefperiode in Snellio.
          Extra monteurs voeg je later toe wanneer je wilt. Alle bedragen {BTW.short}.
        </p>
      </div>
    </div>
  )
}
