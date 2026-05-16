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

// GA4 property ID. Stream 'Snellio Web' (ID 14853565231).
// Leeg laten ('') om GA4 uit te zetten zonder code-wijzigingen.
export const GA4_ID = 'G-CSC9H9DFWN'

// Geconsolideerde Google Tag (Tag Manager): bevat zowel AW als GA4 als
// bestemmingen. Wordt als primary id in de gtag/js library-URL geladen
// zodat één request beide destinations bootstrap. De individuele
// gtag('config', AW) + gtag('config', GA4) calls blijven nodig om
// destination-specifieke parameters mee te geven (zoals send_page_view).
export const GTAG_LOADER_ID = 'GT-P3NNB4K3'

// ──────────────────────────────────────────
// Conversion labels, vul de waardes in die
// Google Ads je geeft bij "Tag installeren".
// Format altijd: AW-XXXXXXXX/LABEL
// ──────────────────────────────────────────
export const CONVERSIONS = {
  demo_request_submitted:  'AW-18058139346/oNvNCL37p5QcENKt5aJD',
  contact_form_submitted:  'AW-18058139346/O0ssCIm24KgcENKt5aJD',
  trial_signup_completed:  'AW-18058139346/aeQ6CIa24KgcENKt5aJD',
  // Voorbeeld:
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
 * Vuur een Google Ads conversie, fire-and-forget.
 * Gebruik dit in form submit handlers waar gtag al geladen is.
 * Retourneert `true` als het event in de queue is geduwd.
 */
export function trackConversion(
  key: ConversionKey,
  params: Record<string, unknown> = {},
): boolean {
  if (!gtagAvailable()) {
    console.warn('[gtag] niet beschikbaar, conversie niet verzonden:', key)
    return false
  }

  const sendTo = CONVERSIONS[key]
  if (isPlaceholder(sendTo)) {
    console.warn('[gtag] conversion label is placeholder, vul in lib/gtag.ts:', key)
    return false
  }

  window.gtag!('event', 'conversion', { send_to: sendTo, ...params })
  console.log('[gtag] conversion fired:', key, sendTo)

  // Spiegelen naar GA4 als custom event met dezelfde naam, zodat we
  // dezelfde funnel-stappen later in GA4 als conversie kunnen markeren.
  trackGA4Event(key, params)

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
      console.warn('[gtag] niet beschikbaar, conversie niet verzonden:', key)
      return resolve(false)
    }

    const sendTo = CONVERSIONS[key]
    if (isPlaceholder(sendTo)) {
      console.warn('[gtag] conversion label is placeholder, vul in lib/gtag.ts:', key)
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

    // Parallel naar GA4 als custom event met dezelfde naam. Niet wachten,
    // GA4 hoeft niet bevestigd te zijn voor de Ads-redirect-flow.
    trackGA4Event(key, params)
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
 * GA4 custom-event helper. Volg snake_case event-naming.
 *
 * Met send_to: GA4_ID wordt het event expliciet naar de GA4-property gestuurd
 * (en niet naar AW). Vereist dat de GA4-runtime volledig is geladen, wat in
 * GoogleAds.tsx wordt geregeld door G-... als primary id in de gtag/js
 * library-URL te zetten. Zonder die volledige runtime droopt gtag scoped
 * send_to-events stilletjes of routeert ze naar de verkeerde destination.
 */
export function trackGA4Event(name: string, params: Record<string, unknown> = {}): boolean {
  if (!gtagAvailable()) return false
  if (!GA4_ID) return false
  window.gtag!('event', name, { send_to: GA4_ID, ...params })
  console.log('[ga4] event fired:', name, params)
  return true
}
