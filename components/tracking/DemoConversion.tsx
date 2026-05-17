'use client'

import { useEffect } from 'react'
import { trackConversionWithRetry } from '@/lib/gtag'

// Vuurt de Google Ads + GA4 conversie 'demo_request_submitted' on-mount op
// /demo-bedankt. Voorheen werd alleen vóór redirect in DemoForm gefired met
// trackConversionAndWait — maar dat awaited alleen de Ads-callback, niet de
// GA4-flush, waardoor de GA4-event vaak verloren ging in de unload-race.
// Door hier on-mount te firen (met retry voor afterInteractive gtag-load)
// landt zowel de Ads als de GA4 event betrouwbaar.
//
// Dedupe via sessionStorage zodat een page-reload of handmatig bezoek aan
// /demo-bedankt geen tweede fire geeft.
const KEY = 'snellio:demo_conv:session'

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

export default function DemoConversion() {
  useEffect(() => {
    if (alreadyFired()) {
      console.log('[gtag] demo_request_submitted al gefired in deze session, skip')
      return
    }
    // Unieke transaction_id zodat Ads dubbele fires (refresh, dubbele
    // SPA-navigatie) kan dedupliceren. timestamp + random base36 is
    // botsing-vrij genoeg op de schaal van deze website.
    const txId = `demo_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    trackConversionWithRetry('demo_request_submitted', {
      value:          50,
      currency:       'EUR',
      transaction_id: txId,
    }).then(sent => {
      if (sent) markFired()
    })
  }, [])
  return null
}
