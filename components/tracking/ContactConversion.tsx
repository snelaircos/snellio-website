'use client'

import { useEffect } from 'react'
import { trackConversion } from '@/lib/gtag'

// Vuurt de Google Ads + GA4 conversie 'contact_form_submitted' on-mount
// op /bedankt-contact, consistent met het patroon op /demo-bedankt
// (DemoForm fired demo_request_submitted vóór redirect) en /checkout/success
// (TrialSignupConversion fired trial_signup_completed on-mount).
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
    const sent = trackConversion('contact_form_submitted')
    if (sent) markFired()
  }, [])
  return null
}
