// Google Ads gtag helper — centraal gedefinieerd zodat conversies
// typed, herbruikbaar en op één plek te beheren zijn.

export const GADS_ID = 'AW-18058139346'

// Voeg hier nieuwe conversies toe. Key = interne naam, value = send_to label.
export const CONVERSIONS = {
  demo_request: 'AW-18058139346/aydFCN6p5ZYcENKt5aJD',
  // trial_signup: 'AW-18058139346/XXXXXXXXXX',
  // contact_form: 'AW-18058139346/YYYYYYYYYY',
} as const

export type ConversionKey = keyof typeof CONVERSIONS

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

// Vuur direct — gebruik in form submit handlers waar gtag al geladen is.
export function fireConversion(key: ConversionKey, params: Record<string, unknown> = {}): boolean {
  if (typeof window === 'undefined') return false
  if (typeof window.gtag !== 'function') {
    console.warn('[gtag] niet beschikbaar — conversie niet verzonden:', key)
    return false
  }
  window.gtag('event', 'conversion', {
    send_to: CONVERSIONS[key],
    ...params,
  })
  console.log('[gtag] conversion fired:', key)
  return true
}

// Vuur met retry — gebruik op landing pages waar gtag mogelijk nog laadt.
export function fireConversionWithRetry(
  key: ConversionKey,
  params: Record<string, unknown> = {},
  maxAttempts = 20,
  intervalMs = 250,
): Promise<boolean> {
  return new Promise(resolve => {
    if (typeof window === 'undefined') return resolve(false)

    let attempts = 0
    const tick = () => {
      if (fireConversion(key, params)) return resolve(true)
      attempts += 1
      if (attempts >= maxAttempts) {
        console.warn('[gtag] gaf op na', maxAttempts, 'pogingen:', key)
        return resolve(false)
      }
      setTimeout(tick, intervalMs)
    }
    tick()
  })
}
