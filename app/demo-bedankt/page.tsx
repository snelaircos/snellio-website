'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { fireConversionWithRetry } from '@/lib/analytics/gtag'

export default function DemoBedanktPage() {
  useEffect(() => {
    void fireConversionWithRetry('demo_request')
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] bg-[var(--navy2)]">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(18,168,122,.1) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-lg mx-auto">
        {/* Check icoon */}
        <div className="w-20 h-20 rounded-full bg-[rgba(18,168,122,.15)] border border-[rgba(18,168,122,.3)] flex items-center justify-center text-4xl mx-auto mb-6">
          ✅
        </div>

        <p className="font-mono text-[.65rem] text-[var(--green)] uppercase tracking-[.14em] mb-3">
          Aanvraag ontvangen
        </p>

        <h1 className="font-outfit font-black text-white text-3xl tracking-tight mb-4">
          Bedankt! We nemen snel contact op.
        </h1>

        <p className="text-[var(--text2)] text-base leading-relaxed mb-10">
          We hebben je demo aanvraag ontvangen. Een van onze specialisten neemt binnen <strong className="text-white">1 werkdag</strong> contact met je op voor een persoonlijke walkthrough van Snellio.
        </p>

        {/* Wat kun je verwachten */}
        <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6 text-left mb-8">
          <p className="font-outfit font-bold text-white text-sm mb-4">Wat kun je verwachten?</p>
          <ul className="flex flex-col gap-3 list-none">
            {[
              { icon: '📞', text: 'Persoonlijk contact binnen 1 werkdag' },
              { icon: '🎯', text: 'Demo op maat voor jouw bedrijfstype' },
              { icon: '⏱', text: 'Sessie duurt ca. 20–30 minuten' },
              { icon: '🔒', text: 'Geen verplichtingen, geen verkoopdruk' },
            ].map(item => (
              <li key={item.text} className="flex items-start gap-3 text-[var(--text2)] text-sm">
                <span className="shrink-0">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Alvast starten */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/registreren"
            className="bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] text-white font-bold py-3.5 px-7 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,144,184,.4)] transition-all duration-200 text-sm"
          >
            Alvast gratis starten →
          </Link>
          <Link
            href="/"
            className="border border-[var(--border)] text-[var(--text2)] font-medium py-3.5 px-7 rounded-xl hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all duration-200 text-sm"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    </div>
  )
}
