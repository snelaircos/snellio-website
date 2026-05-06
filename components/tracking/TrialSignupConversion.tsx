'use client'

import { useEffect } from 'react'
import { trackConversionWithRetry } from '@/lib/gtag'

// Vuurt de Google Ads conversie 'trial_signup_completed' wanneer de bezoeker
// op /trial-bedankt landt na een succesvolle account-aanmaak. WithRetry omdat
// gtag bij directe redirect nog niet geladen kan zijn — we proberen elke 250ms,
// max 5 sec. Zolang het label in lib/gtag.ts nog 'TRIAL_LABEL_HIER' is, fired
// het event niet maar logt het wel een waarschuwing in console (verwacht gedrag).
export default function TrialSignupConversion() {
  useEffect(() => {
    trackConversionWithRetry('trial_signup_completed')
  }, [])
  return null
}
