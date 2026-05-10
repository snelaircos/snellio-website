'use client'

import { useEffect } from 'react'
import { trackConversionWithRetry } from '@/lib/gtag'

// Vuurt de Google Ads conversie 'trial_signup_completed' on-mount.
// Gebruikt op /checkout/success (na geverifieerde Mollie-betaling) en als legacy
// fallback op /trial-bedankt. trackConversionWithRetry probeert elke 250ms tot
// gtag geladen is, max 5s, robuust tegen redirect-flows waarbij gtag nog niet
// klaar is bij eerste paint.
//
// Dedupe via sessionStorage: één signup mag NIET twee conversies firen, ook
// niet als de gebruiker na /checkout/success per ongeluk ook /trial-bedankt
// bezoekt. Bij het firen schrijven we twee keys:
//   - snellio:trial_conv:<signup_id>  (signup-specifiek, als dedupeKey gegeven)
//   - snellio:trial_conv:session       (session-fallback voor pages zonder ID)
// Beide checks moeten falen voordat we firen.

interface Props {
  /**
   * Unieke sleutel per signup (bv. signup_id uit /checkout/success?signup_id=...).
   * Voorkomt dat dezelfde signup twee fires krijgt als de pagina herlaadt.
   */
  dedupeKey?: string
}

const SESSION_KEY  = 'snellio:trial_conv:session'
const KEY_PREFIX   = 'snellio:trial_conv:'

function alreadyFired(dedupeKey?: string): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (dedupeKey && sessionStorage.getItem(KEY_PREFIX + dedupeKey)) return true
    if (sessionStorage.getItem(SESSION_KEY)) return true
  } catch {
    // sessionStorage geblokkeerd (incognito strict, bv), laat firen, dedupe is best-effort
  }
  return false
}

function markFired(dedupeKey?: string): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
    if (dedupeKey) sessionStorage.setItem(KEY_PREFIX + dedupeKey, '1')
  } catch {
    // negeer
  }
}

export default function TrialSignupConversion({ dedupeKey }: Props = {}) {
  useEffect(() => {
    if (alreadyFired(dedupeKey)) {
      console.log('[gtag] trial_signup_completed al gefired in deze session, skip', dedupeKey || '(no key)')
      return
    }

    trackConversionWithRetry('trial_signup_completed').then(sent => {
      if (sent) markFired(dedupeKey)
    })
  }, [dedupeKey])

  return null
}
