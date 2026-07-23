import type { Metadata } from 'next'
import Link from 'next/link'
import ContactConversion from '@/components/tracking/ContactConversion'

export const metadata: Metadata = {
  title: 'Bericht ontvangen | Snellio',
  description: 'Bedankt voor je bericht. We nemen binnen 1 werkdag contact op.',
  robots: { index: false },
}

export default function BedanktContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] bg-[var(--navy2)]">
      {/* Google Ads + GA4 conversie, on-mount met sessionStorage-dedupe */}
      <ContactConversion />

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(10,187,214,.1) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-lg mx-auto">
        {/* Check icoon */}
        <div className="w-20 h-20 rounded-full bg-[rgba(10,187,214,.15)] border border-[rgba(10,187,214,.3)] flex items-center justify-center text-4xl mx-auto mb-6">
          ✉️
        </div>

        <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">
          Bericht ontvangen
        </p>

        <h1 className="font-outfit font-black text-[var(--text)] text-3xl tracking-tight mb-4">
          Bedankt! We reageren snel.
        </h1>

        <p className="text-[var(--text2)] text-base leading-relaxed mb-10">
          We hebben je bericht ontvangen. We nemen binnen <strong className="text-[var(--text)]">1 werkdag</strong> contact met je op via e-mail of telefoon.
        </p>

        {/* Wat kun je verwachten */}
        <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6 text-left mb-8">
          <p className="font-outfit font-bold text-[var(--text)] text-sm mb-4">Wat kun je verwachten?</p>
          <ul className="flex flex-col gap-3 list-none">
            {[
              { icon: '⏱', text: 'Reactie binnen 1 werkdag op je vraag'    },
              { icon: '💬', text: 'Persoonlijk antwoord, geen standaard mail' },
              { icon: '📞', text: 'Eventueel een belafspraak als dat handiger is' },
              { icon: '🔒', text: 'Geen verplichtingen, geen nieuwsbrief-spam' },
            ].map(item => (
              <li key={item.text} className="flex items-start gap-3 text-[var(--text2)] text-sm">
                <span className="shrink-0">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Alvast verder kijken */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/registreren"
            className="bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] text-white font-bold py-3.5 px-7 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,144,184,.4)] transition-all duration-200 text-sm"
          >
            Alvast gratis starten →
          </Link>
          <Link
            href="/"
            className="border border-[var(--border)] text-[var(--text2)] font-medium py-3.5 px-7 rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 text-sm"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    </div>
  )
}
