'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Consent = 'pending' | 'accepted' | 'declined'

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>('pending')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent') as Consent | null
    if (!stored || stored === 'pending') {
      // Toon na 1 seconde
      const t = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(t)
    }
    setConsent(stored)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setConsent('accepted')
    setVisible(false)
    // Laad analytics scripts pas na toestemming
    window.dispatchEvent(new CustomEvent('cookie_consent', { detail: 'accepted' }))
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setConsent('declined')
    setVisible(false)
  }

  if (!visible || consent !== 'pending') return null

  return (
    <div
      role="dialog"
      aria-label="Cookie-instellingen"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[999] bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,.4)]"
    >
      <p className="font-semibold text-white text-sm mb-1.5">Wij gebruiken cookies 🍪</p>
      <p className="text-[var(--muted2)] text-xs leading-relaxed mb-4">
        We gebruiken functionele en analytische cookies om Snellio te verbeteren.{' '}
        <Link href="/cookiebeleid" className="text-[var(--cyan)] hover:underline">Meer info</Link>
      </p>
      <div className="flex gap-2">
        <button
          onClick={decline}
          className="flex-1 text-xs font-medium text-[var(--muted2)] border border-[var(--border)] rounded-lg py-2 px-3 hover:border-[var(--cyan)] hover:text-[var(--text2)] transition-colors"
        >
          Alleen noodzakelijk
        </button>
        <button
          onClick={accept}
          className="flex-1 text-xs font-semibold bg-gradient-btn text-white rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all shadow-[0_2px_12px_rgba(0,144,184,.3)]"
        >
          Alles accepteren
        </button>
      </div>
    </div>
  )
}
