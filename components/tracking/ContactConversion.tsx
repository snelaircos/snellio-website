'use client'

import { useEffect, useRef } from 'react'
import { trackConversionWithRetry, gtagDebug } from '@/lib/gtag'

// Vuurt de Google Ads + GA4 conversie 'contact_form_submitted' on-mount op
// /bedankt-contact. Gebruikt -WithRetry omdat gtag.js (afterInteractive)
// na een SPA-redirect niet altijd direct beschikbaar is bij useEffect-tijd —
// zonder retry verviel de fire dan stilletjes. Test-bevinding: stap 1 zonder
// gclid faalde, terwijl stap 3/4 (waarbij een eerdere fire of gclid-cookie
// gtag had "warmgestookt") wél door kwam.
//
// Dedupe via sessionStorage zodat een page-reload of handmatig bezoek aan
// /bedankt-contact geen tweede fire geeft.
const KEY = 'snellio:contact_conv:session'

function alreadyFired(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

function markFired(): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    // negeer
  }
}

export default function ContactConversion() {
  // Strict-mode safeguard: useEffect kan in dev twee keer runnen op dezelfde
  // mount. sessionStorage-dedupe wordt pas async gezet (na retry-success),
  // dus zonder useRef-guard kan een tweede effect-call al een tweede fire
  // queue'en voor het sessionStorage-vlag actief is.
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    if (alreadyFired()) {
      gtagDebug('[gtag] contact_form_submitted al gefired in deze session, skip')
      return
    }
    firedRef.current = true

    // Unieke transaction_id zodat Ads dubbele fires (refresh, dubbele
    // SPA-navigatie) kan dedupliceren. timestamp + random base36 is
    // botsing-vrij genoeg op de schaal van deze website.
    const txId = `contact_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    trackConversionWithRetry('contact_form_submitted', {
      value:          15,
      currency:       'EUR',
      transaction_id: txId,
    }).then(sent => {
      if (sent) markFired()
      else      firedRef.current = false
    })
  }, [])
  return null
}
