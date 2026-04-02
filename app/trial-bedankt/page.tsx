import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Account aangemaakt | Snellio',
  description: 'Welkom bij Snellio. Je account is aangemaakt — start direct met je gratis proefperiode.',
  robots: { index: false },
}

export default function TrialBedanktPage() {
  return (
    <>
      {/*
        ══ GOOGLE ADS CONVERSIE TAG ══
        Plaats hier jouw Google Ads conversion script voor "Trial gestart".
        Ga naar: Google Ads → Tools → Conversies → Nieuwe conversie → Website
        Selecteer: "Trial aanmelden" als conversietype

        <Script id="ga-conversion-trial" strategy="afterInteractive">
          {`gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXXX/ZZZZZZZZZZZ',
            'value': 10.0,
            'currency': 'EUR'
          });`}
        </Script>

        Tip: geef een hogere waarde dan de demo (bijv. 10) omdat dit verder in de funnel zit.
        ══════════════════════════════
      */}

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] bg-[var(--navy2)]">
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(10,187,214,.1) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-lg mx-auto">
          {/* Rocket icoon */}
          <div className="w-20 h-20 rounded-full bg-[rgba(10,187,214,.1)] border border-[rgba(10,187,214,.3)] flex items-center justify-center text-4xl mx-auto mb-6">
            🚀
          </div>

          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
            30 dagen gratis gestart
          </p>

          <h1 className="font-outfit font-black text-white text-3xl tracking-tight mb-4">
            Welkom bij Snellio!
          </h1>

          <p className="text-[var(--text2)] text-base leading-relaxed mb-10">
            Je account is aangemaakt. Je hebt nu <strong className="text-white">30 dagen gratis</strong> toegang tot alle functies. Geen creditcard nodig, opzeggen wanneer je wilt.
          </p>

          {/* Volgende stappen */}
          <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6 text-left mb-8">
            <p className="font-outfit font-bold text-white text-sm mb-4">Start in 3 stappen:</p>
            <ol className="flex flex-col gap-4 list-none">
              {[
                { nr: '1', title: 'Voeg je eerste klant toe', desc: 'Naam, adres en contactgegevens. Klaar in 1 minuut.' },
                { nr: '2', title: 'Maak een werkorder aan', desc: 'Koppel aan installatie, klant en type handeling.' },
                { nr: '3', title: 'Stuur je eerste werkbon', desc: 'Klant tekent digitaal, PDF gaat automatisch.' },
              ].map(step => (
                <li key={step.nr} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center font-outfit font-black text-white text-sm shrink-0">
                    {step.nr}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-0.5">{step.title}</p>
                    <p className="text-[var(--muted2)] text-xs">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA naar app */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SITE.appUrl}
              className="bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] text-white font-bold py-3.5 px-7 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,144,184,.4)] transition-all duration-200 text-sm"
            >
              Open Snellio →
            </a>
            <Link
              href="/contact"
              className="border border-[var(--border)] text-[var(--text2)] font-medium py-3.5 px-7 rounded-xl hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all duration-200 text-sm"
            >
              Vraag een demo aan
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
