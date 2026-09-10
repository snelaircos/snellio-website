import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE, TRIAL_DAGEN } from '@/lib/constants'
import TrialSignupTracking from './TrialSignupTracking'

export const metadata: Metadata = {
  title: 'Account aangemaakt | Snellio',
  description: 'Welkom bij Snellio. Je account is aangemaakt, start direct met je gratis proefperiode.',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: { signup?: string }
}

// Bedanktpagina na /api/aanmelden. Enige plek waar de Google Ads-conversie
// trial_signup_completed vuurt (via TrialSignupTracking, alleen met token).
export default function TrialBedanktPage({ searchParams }: Props) {
  const signupId = searchParams.signup?.trim() || undefined

  return (
    <>
      <TrialSignupTracking signupId={signupId} />

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-24 pb-16 bg-[var(--navy2)] relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(10,187,214,.1) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-[rgba(10,187,214,.1)] border border-[rgba(10,187,214,.3)] flex items-center justify-center text-4xl mx-auto mb-6">
            🚀
          </div>

          <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">
            {TRIAL_DAGEN} dagen gratis gestart
          </p>

          <h1 className="font-outfit font-black text-[var(--text)] text-3xl tracking-tight mb-4">
            Welkom bij Snellio!
          </h1>

          <p className="text-[var(--text2)] text-base leading-relaxed mb-8">
            Je account is aangemaakt. Je hebt nu <strong className="text-[var(--text)]">{TRIAL_DAGEN} dagen gratis</strong> toegang
            tot alle functies. Er is niets betaald en er loopt geen incasso. Tijdens de proefperiode kies je
            in Snellio welk abonnement bij je bedrijf past.
          </p>

          <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6 text-left mb-8">
            <p className="font-outfit font-bold text-[var(--text)] text-sm mb-4">Start in 3 stappen:</p>
            <ol className="flex flex-col gap-4 list-none">
              {[
                { nr: '1', title: 'Log in op app.snellio.nl', desc: 'Met je e-mailadres en het wachtwoord dat je zojuist koos.' },
                { nr: '2', title: 'Voeg je eerste klant en installatie toe', desc: 'Naam, adres en installatiegegevens. Klaar in een paar minuten.' },
                { nr: '3', title: 'Maak je eerste werkorder', desc: 'Plan hem in, voer handelingen in en laat de klant digitaal tekenen.' },
              ].map(step => (
                <li key={step.nr} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center font-outfit font-black text-white text-sm shrink-0">
                    {step.nr}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text)] text-sm mb-0.5">{step.title}</p>
                    <p className="text-[var(--muted2)] text-xs">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`${SITE.appUrl}/login`}
              className="bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] text-white font-bold py-3.5 px-7 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,144,184,.4)] transition-all duration-200 text-sm"
            >
              Open Snellio →
            </a>
            <Link
              href="/demo"
              className="border border-[var(--border)] text-[var(--text2)] font-medium py-3.5 px-7 rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 text-sm"
            >
              Vraag een demo aan
            </Link>
          </div>

          <p className="text-[var(--muted2)] text-xs mt-8">
            Vragen? Mail{' '}
            <a href={`mailto:${SITE.email}`} className="text-[var(--accent)] hover:underline">{SITE.email}</a>
            {' '}of app ons via de WhatsApp-knop.
          </p>
        </div>
      </div>
    </>
  )
}
