import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { TRIAL_DAGEN, PLANS } from '@/lib/constants'
import { fmtEuro } from '@/lib/pricing'
import TrialSignupForm from '@/components/forms/TrialSignupForm'

// Trial-registratie op snellio.nl. Geen pakketkeuze, geen betaling, geen
// Mollie: alleen een account + tenant via /api/aanmelden. De klant kiest
// zijn abonnement later in de app, tijdens de proefperiode.

export const metadata: Metadata = buildMetadata({
  title:       'Start 14 dagen gratis',
  description: 'Maak je Snellio-account aan en probeer alle functies 14 dagen gratis. Geen betaling, geen incasso, geen pakketkeuze nodig.',
  path:        '/registreren',
  // Formulierpagina: geen zoekwaarde, hoort niet in Google.
  noIndex:     true,
})

const vanaf = Math.min(...PLANS.map(p => p.price.month))

const punten = [
  { title: 'Geen betaling bij registratie',   desc: 'Geen creditcard, geen iDEAL, geen incassomachtiging. Je vult alleen je gegevens in.' },
  { title: 'Alle functies, direct',           desc: 'Werkbonnen, planning, facturatie, F-gassen en boekhoudkoppelingen: alles staat aan.' },
  { title: 'Geen pakketkeuze nodig',          desc: 'Je start gewoon. Tijdens de trial kies je in Snellio het abonnement dat bij je bedrijf past.' },
  { title: `Daarna vanaf ${fmtEuro(vanaf)} per maand`, desc: 'Alle functies inbegrepen. Je betaalt alleen voor de grootte van je bedrijf.' },
]

export default function RegistrerenPage() {
  return (
    <section className="pt-32 pb-24 px-[5%]">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Links: waarom */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[rgba(10,187,214,.1)] border border-[rgba(10,187,214,.3)] rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
            <span className="font-mono text-[.68rem] text-[var(--accent)] tracking-[.08em] uppercase">
              {TRIAL_DAGEN} dagen gratis
            </span>
          </div>

          <h1 className="font-outfit font-black text-[var(--text)] leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Start vandaag.<br />
            <span className="text-[var(--accent)]">Kies later.</span>
          </h1>

          <p className="text-[var(--text2)] text-[1.05rem] leading-relaxed mb-8">
            Maak je account aan en gebruik Snellio {TRIAL_DAGEN} dagen gratis met alle functies.
            Software voor installatiebedrijven: CRM, werkbonnen, planning, facturatie en
            koeltechnische administratie in één systeem.
          </p>

          <ul className="flex flex-col gap-4 list-none mb-8">
            {punten.map(p => (
              <li key={p.title} className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-lg bg-[rgba(18,168,122,.12)] text-[var(--green)] flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-[var(--text)] text-sm">{p.title}</p>
                  <p className="text-[var(--muted2)] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-[var(--muted2)] text-xs">
            Liever eerst een demo?{' '}
            <Link href="/demo" className="text-[var(--accent)] hover:underline">Plan een gesprek →</Link>
            {' '}·{' '}
            <Link href="/pricing" className="text-[var(--accent)] hover:underline">Bekijk de prijzen</Link>
          </p>
        </div>

        {/* Rechts: formulier */}
        <div className="relative bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-7 md:p-8 shadow-[0_8px_32px_rgba(0,144,184,.08)]">
          <div className="text-center mb-6">
            <h2 className="font-outfit font-bold text-[var(--text)] text-xl mb-1.5">Account aanmaken</h2>
            <p className="text-[var(--muted2)] text-sm leading-relaxed">
              Klaar in 1 minuut. Je kiest je abonnement pas tijdens de proefperiode.
            </p>
          </div>

          <TrialSignupForm />

          <p className="text-[var(--muted2)] text-xs mt-6 text-center">
            Door verder te gaan ga je akkoord met onze{' '}
            <Link href="/voorwaarden" className="hover:text-[var(--accent)] transition-colors underline">voorwaarden</Link>
            {' '}en{' '}
            <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors underline">privacybeleid</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
