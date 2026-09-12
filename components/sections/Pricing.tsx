'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BTW, PLANS, INBEGREPEN, TRIAL_DAGEN, JAAR_MAANDEN_BETAALD, type HvacPlan } from '@/lib/constants'
import { fmtEuro, twaalfMaanden } from '@/lib/pricing'
import PricingCalculator from './PricingCalculator'

// Pricing-sectie voor /pricing. Informatief en conversiegericht:
// - niemand koopt hier iets: elke CTA gaat naar de gratis trial (/registreren)
// - geen checkout, geen Mollie, geen conversie-event bij klikken op een kaart
// - het enige Ads-conversiepunt blijft trial_signup_completed op /trial-bedankt

const SIGNUP_HREF = '/registreren'

const trialPunten = [
  'Geen betaling bij registratie',
  'Geen automatische incasso bij registratie',
  'Geen pakketkeuze nodig om te starten',
  'Tijdens de trial kies je het abonnement dat bij je bedrijf past',
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="px-[5%] pb-6" id="prijzen">
      <div className="mx-auto max-w-7xl">

        {/* ── Trialboodschap, boven de kaarten ── */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[rgba(10,187,214,.55)] via-[rgba(0,144,184,.25)] to-[rgba(18,168,122,.35)] mb-12">
          <div className="rounded-[23px] bg-white px-6 py-7 md:px-10 md:py-9 grid lg:grid-cols-[1.35fr_1fr] gap-7 lg:gap-10 items-center">
            <div>
              <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">
                Eerst proberen, dan kiezen
              </p>
              <h2
                className="font-outfit font-black text-[var(--text)] tracking-tight leading-[1.15] mb-4"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}
              >
                Probeer Snellio eerst {TRIAL_DAGEN} dagen gratis.<br className="hidden md:block" />{' '}
                <span className="text-[var(--accent)]">Kies daarna pas je abonnement.</span>
              </h2>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 list-none">
                {trialPunten.map(p => (
                  <li key={p} className="flex items-start gap-2.5 text-[var(--text2)] text-sm">
                    <span className="w-5 h-5 rounded-full bg-[rgba(18,168,122,.14)] text-[var(--green)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start lg:items-center gap-3 lg:border-l lg:border-[var(--border)] lg:pl-10">
              <p className="font-outfit font-black text-[var(--text)] text-2xl tracking-tight">
                Start vandaag. <span className="text-[var(--accent)]">Kies later.</span>
              </p>
              <Link
                href={SIGNUP_HREF}
                className="inline-flex items-center justify-center bg-gradient-btn text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_4px_20px_rgba(0,144,184,.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,184,.45)] transition-all text-[.95rem]"
              >
                Start {TRIAL_DAGEN} dagen gratis →
              </Link>
              <p className="text-[var(--muted2)] text-xs">
                {TRIAL_DAGEN} dagen gratis. Geen creditcard nodig. Kies je abonnement later.
              </p>
            </div>
          </div>
        </div>

        {/* ── Toggle maand / jaar ── */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div
            role="group"
            aria-label="Betaalperiode"
            className="inline-flex items-center rounded-full bg-white border border-[var(--border)] p-1 shadow-sm"
          >
            <button
              type="button"
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${!annual ? 'bg-[var(--accent)] text-white shadow' : 'text-[var(--text2)] hover:text-[var(--text)]'}`}
            >
              Maandelijks
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${annual ? 'bg-[var(--accent)] text-white shadow' : 'text-[var(--text2)] hover:text-[var(--text)]'}`}
            >
              Jaarlijks
              <span className={`text-[.65rem] font-bold px-2 py-0.5 rounded-full ${annual ? 'bg-white/20 text-white' : 'bg-[rgba(18,168,122,.12)] text-[var(--green)]'}`}>
                2 maanden gratis
              </span>
            </button>
          </div>
          <p className="text-xs text-[var(--muted2)] text-center">
            {annual
              ? `Bij jaarbetaling betaal je ${JAAR_MAANDEN_BETAALD} maanden en gebruik je Snellio 12 maanden.`
              : 'Maandelijks opzegbaar. Kies je later voor jaarlijks, dan betaal je 10 maanden en gebruik je er 12.'}
          </p>
        </div>

        {/* ── Kaarten ── */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} annual={annual} index={i} />
          ))}
        </div>

        <p className="mt-7 text-center text-xs text-[var(--muted)] tracking-wide">
          Alle prijzen {BTW.short} &nbsp;·&nbsp; {TRIAL_DAGEN} dagen gratis, geen creditcard nodig &nbsp;·&nbsp; Jaar of maand, iDEAL of incasso &nbsp;·&nbsp; Maandelijks opzegbaar
        </p>

        {/* ── Alles inbegrepen ── */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">
              Geen modules, geen toeslagen
            </p>
            <h2
              className="font-outfit font-black text-[var(--text)] tracking-tight leading-[1.15]"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}
            >
              Alles inbegrepen. <span className="text-[var(--accent)]">In elk pakket.</span>
            </h2>
            <p className="text-[var(--text2)] text-base mt-3 max-w-2xl mx-auto">
              Snellio kent geen modulejungle. Starter, Basis, Pro en Enterprise bevatten dezelfde functies.
              Je betaalt alleen voor de grootte van je bedrijf.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 list-none">
            {INBEGREPEN.map(f => (
              <li
                key={f.label}
                className="flex items-start gap-3 bg-[var(--navy3)] border border-[var(--border)] rounded-xl px-4 py-3.5"
              >
                <span className="text-xl leading-none shrink-0" aria-hidden="true">{f.icon}</span>
                <span className="text-[var(--text2)] text-sm leading-snug">
                  <span className="text-[var(--green)] font-bold mr-1">✓</span>{f.label}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <Link href="/features" className="text-[var(--accent)] font-semibold hover:underline">
              Bekijk alle functies →
            </Link>
            <Link href="/demo" className="text-[var(--accent)] font-semibold hover:underline">
              Plan een demo →
            </Link>
          </div>
        </div>

        {/* ── Rekentool Pro / Enterprise ── */}
        <PricingCalculator annual={annual} />
      </div>
    </section>
  )
}

// ── PlanCard ──────────────────────────────────────────────────────────────────

interface PlanCardProps {
  plan:   HvacPlan
  annual: boolean
  index:  number
}

function PlanCard({ plan, annual, index }: PlanCardProps) {
  const featured = !!plan.featured
  const extra    = plan.monteurs.extra
  const monteursLabel = plan.monteurs.inbegrepen === 1
    ? '1 monteur inbegrepen'
    : `${plan.monteurs.inbegrepen} monteurs inbegrepen`

  const inbegrepen = [
    monteursLabel,
    plan.installaties.label,
    'Alle Snellio-functies',
    'Geen losse moduletoeslagen',
    'Gratis boekhoudkoppelingen',
  ]

  return (
    <article
      className={`reveal relative flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(15,33,51,.12)]
        ${featured
          ? 'p-[1px] bg-gradient-to-b from-[rgba(10,187,214,.55)] to-[rgba(10,187,214,.06)] shadow-[0_0_48px_rgba(10,187,214,.18)]'
          : 'bg-[var(--navy3)] border border-[var(--border)] hover:border-[rgba(10,187,214,.3)]'
        }`}
      style={{ animationDelay: `${index * 60}ms` }}
      aria-labelledby={`plan-${plan.id}`}
    >
      {plan.badge && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[.7rem] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap z-20
            ${featured ? 'bg-[var(--accent)]' : 'bg-[var(--text2)]'}`}
        >
          {plan.badge}
        </div>
      )}

      <div className={`flex flex-col flex-1 ${featured ? 'rounded-[15px] bg-gradient-to-b from-white to-[#f2f9fc] px-6 pt-8 pb-6' : 'px-6 pt-8 pb-6'}`}>
        <h3 id={`plan-${plan.id}`} className="font-outfit font-bold text-[var(--text)] text-xl">
          {plan.name}
        </h3>
        <p className="text-[var(--muted2)] text-sm mt-1 min-h-[2.5rem]">{plan.tagline}</p>

        {/* Prijs */}
        <div className="mt-4 mb-1">
          {annual ? (
            <>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[var(--muted)] text-sm line-through tabular-nums">{fmtEuro(twaalfMaanden(plan.price.month))}</span>
                <span className="font-outfit font-black text-[2.4rem] leading-none text-[var(--text)] tabular-nums">{fmtEuro(plan.price.year)}</span>
                <span className="text-xs text-[var(--muted2)]">/ jaar</span>
              </div>
              <p className="text-xs text-[var(--text2)] mt-2 tabular-nums">
                = {JAAR_MAANDEN_BETAALD} × {fmtEuro(plan.price.month)}. Je betaalt {JAAR_MAANDEN_BETAALD} maanden, gebruikt 12.
              </p>
              <p className="text-[.7rem] text-[var(--muted2)] mt-1">{BTW.short}</p>
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-1">
                <span className="font-outfit font-black text-[2.4rem] leading-none text-[var(--text)] tabular-nums">{fmtEuro(plan.price.month)}</span>
                <span className="text-xs text-[var(--muted2)]">/ maand</span>
              </div>
              <p className="text-xs text-[var(--text2)] mt-2 tabular-nums">
                of {fmtEuro(plan.price.year)} per jaar <span className="text-[var(--green)] font-semibold">(2 maanden gratis)</span>
              </p>
              <p className="text-[.7rem] text-[var(--muted2)] mt-1">{BTW.short}</p>
            </>
          )}
        </div>

        <hr className="border-[var(--border)] my-5" />

        <ul className="flex flex-col gap-2.5 list-none mb-5 flex-1">
          {inbegrepen.map(label => (
            <li key={label} className="flex items-start gap-2.5 text-sm text-[var(--text2)]">
              <span className="text-[var(--green)] font-bold shrink-0 mt-px">✓</span>
              {label}
            </li>
          ))}
          {extra && (
            <li className="flex items-start gap-2.5 text-sm text-[var(--text2)]">
              <span className="text-[var(--accent)] font-bold shrink-0 mt-px">+</span>
              <span>
                Extra monteur vanaf de {extra.vanafMonteur}e:{' '}
                <strong className="text-[var(--text)]">{fmtEuro(extra.prijs)} per maand</strong>
              </span>
            </li>
          )}
          {plan.installaties.max !== null && (
            <li className="flex items-start gap-2.5 text-xs text-[var(--muted2)] mt-1">
              <span className="shrink-0 mt-px">ℹ︎</span>
              <span>Meer dan {plan.installaties.max} installaties? Dan stap je over naar Basis.</span>
            </li>
          )}
        </ul>

        <Link
          href={SIGNUP_HREF}
          className={`text-center py-3 px-5 rounded-xl font-bold text-sm transition-all duration-200
            ${featured
              ? 'bg-gradient-btn text-white shadow-[0_4px_20px_rgba(0,144,184,.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,184,.45)]'
              : 'bg-white border-[1.5px] border-[var(--accent)] text-[var(--accent)] hover:bg-[rgba(0,144,184,.06)]'
            }`}
        >
          Start {TRIAL_DAGEN} dagen gratis
        </Link>
        <p className="text-center text-[.7rem] text-[var(--muted2)] mt-2.5">
          Geen creditcard nodig · kies je abonnement later
        </p>
      </div>
    </article>
  )
}
