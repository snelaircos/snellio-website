'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { readConsent, applyConsent } from '@/lib/tracking'

// Cookiebanner = de CMP. Twee keuzes: alles accepteren (analytics + marketing
// granted) of alleen noodzakelijk (alles denied). De keuze gaat via
// applyConsent() naar gtag ('consent','update') en naar de cookie
// `snellio_consent` op .snellio.nl, zodat app.snellio.nl dezelfde keuze ziet.
export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (readConsent() !== null) return
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  const choose = (granted: boolean) => {
    applyConsent(granted ? 'granted' : 'denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie-instellingen"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[999] bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-5 shadow-[0_8px_40px_rgba(15,33,51,.12)]"
    >
      <p className="font-semibold text-[var(--text)] text-sm mb-1.5">Wij gebruiken cookies 🍪</p>
      <p className="text-[var(--muted2)] text-xs leading-relaxed mb-4">
        We gebruiken functionele, analytische en marketing-cookies om Snellio te verbeteren en advertenties te meten.{' '}
        <Link href="/cookiebeleid" className="text-[var(--accent)] hover:underline">Meer info</Link>
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => choose(false)}
          className="flex-1 text-xs font-medium text-[var(--muted2)] border border-[var(--border)] rounded-lg py-2 px-3 hover:border-[var(--accent)] hover:text-[var(--text2)] transition-colors"
        >
          Alleen noodzakelijk
        </button>
        <button
          onClick={() => choose(true)}
          className="flex-1 text-xs font-semibold bg-gradient-btn text-white rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all shadow-[0_2px_12px_rgba(0,144,184,.3)]"
        >
          Alles accepteren
        </button>
      </div>
    </div>
  )
}
