'use client'

import { useEffect } from 'react'
import { trackConversionWithRetry } from '@/lib/gtag'

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
  useEffect(() => {
    if (alreadyFired()) {
      console.log('[gtag] contact_form_submitted al gefired in deze session, skip')
      return
    }
    trackConversionWithRetry('contact_form_submitted').then(sent => {
      if (sent) markFired()
    })
  }, [])
  return null
}
