// ─────────────────────────────────────────────────────────────
// Google Ads + GA4 tracking helper
//
// Alle conversion labels staan onderin dit bestand.
// Gebruik in form submit handlers:
//
//   import { trackConversion } from '@/lib/gtag'
//   trackConversion('demo_request_submitted')
//
// Of met callback (wacht tot event verzonden voor redirect):
//
//   await trackConversionAndWait('demo_request_submitted')
//   router.push('/demo-bedankt')
// ─────────────────────────────────────────────────────────────

export const GADS_ID = 'AW-18058139346'

// GA4 property ID — leeg laten als je geen GA4 gebruikt.
export const GA4_ID = ''

// ──────────────────────────────────────────
// Conversion labels — vul de waardes in die
// Google Ads je geeft bij "Tag installeren".
// Format altijd: AW-XXXXXXXX/LABEL
// ──────────────────────────────────────────
export const CONVERSIONS = {
  demo_request_submitted:  'AW-18058139346/aydFCN6p5ZYcENKt5aJD',
  contact_form_submitted:  'AW-18058139346/CONTACT_LABEL_HIER',
  // Voorbeelden:
  // trial_signup_started:  'AW-18058139346/TRIAL_LABEL_HIER',
  // checkout_completed:    'AW-18058139346/CHECKOUT_LABEL_HIER',
} as const

export type ConversionKey = keyof typeof CONVERSIONS

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function gtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

function isPlaceholder(label: string): boolean {
  return /HIER$/.test(label) || /^AW-\w+\/X{3,}$/.test(label)
}

/**
 * Vuur een Google Ads conversie — fire-and-forget.
 * Gebruik dit in form submit handlers waar gtag al geladen is.
 * Retourneert `true` als het event in de queue is geduwd.
 */
export function trackConversion(
  key: ConversionKey,
  params: Record<string, unknown> = {},
): boolean {
  if (!gtagAvailable()) {
    console.warn('[gtag] niet beschikbaar — conversie niet verzonden:', key)
    return false
  }

  const sendTo = CONVERSIONS[key]
  if (isPlaceholder(sendTo)) {
    console.warn('[gtag] conversion label is placeholder — vul in lib/gtag.ts:', key)
    return false
  }

  window.gtag!('event', 'conversion', { send_to: sendTo, ...params })
  console.log('[gtag] conversion fired:', key, sendTo)
  return true
}

/**
 * Vuur een conversie en wacht tot Google het event heeft ontvangen (of timeout).
 * Gebruik dit als je direct daarna gaat navigeren, om te voorkomen dat
 * het beacon wordt afgebroken door de page unload.
 */
export function trackConversionAndWait(
  key: ConversionKey,
  params: Record<string, unknown> = {},
  timeoutMs = 1500,
): Promise<boolean> {
  return new Promise(resolve => {
    if (!gtagAvailable()) {
      console.warn('[gtag] niet beschikbaar — conversie niet verzonden:', key)
      return resolve(false)
    }

    const sendTo = CONVERSIONS[key]
    if (isPlaceholder(sendTo)) {
      console.warn('[gtag] conversion label is placeholder — vul in lib/gtag.ts:', key)
      return resolve(false)
    }

    let done = false
    const finish = (sent: boolean) => {
      if (done) return
      done = true
      console.log('[gtag] conversion', sent ? 'fired' : 'timed out', ':', key)
      resolve(sent)
    }

    setTimeout(() => finish(false), timeoutMs)

    window.gtag!('event', 'conversion', {
      send_to: sendTo,
      ...params,
      event_callback: () => finish(true),
    })
  })
}

/**
 * Vuur een conversie met retry. Gebruik dit alleen op landing-/bedankt-pagina's
 * waar de bezoeker direct binnenkomt en gtag mogelijk nog niet geladen is.
 */
export function trackConversionWithRetry(
  key: ConversionKey,
  params: Record<string, unknown> = {},
  maxAttempts = 20,
  intervalMs = 250,
): Promise<boolean> {
  return new Promise(resolve => {
    if (typeof window === 'undefined') return resolve(false)

    let attempts = 0
    const tick = () => {
      if (trackConversion(key, params)) return resolve(true)
      attempts += 1
      if (attempts >= maxAttempts) return resolve(false)
      setTimeout(tick, intervalMs)
    }
    tick()
  })
}

/**
 * Bonus: GA4 event helper — voor als je later GA4 toevoegt.
 * Volg Google's event naming convention (snake_case).
 */
export function trackGA4Event(name: string, params: Record<string, unknown> = {}): boolean {
  if (!gtagAvailable()) return false
  if (!GA4_ID) return false
  window.gtag!('event', name, { send_to: GA4_ID, ...params })
  console.log('[ga4] event fired:', name, params)
  return true
}
