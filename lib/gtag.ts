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
// Google Ads conversielabels. Format: AW-XXXXXXXX/LABEL.
// Bijgewerkt 2026-05-17 met de nieuwe labels van Peter (advertentie-
// analist) — oude labels waren stuk en zijn in Ads vervangen.
// ──────────────────────────────────────────
export const AW_CONVERSION_LABELS = {
  trial_signup_completed: 'AW-18058139346/SuNcCLS1xK4cENKt5aJD',
  demo_request_submitted: 'AW-18058139346/RgjNCPqXrK4cENKt5aJD',
  contact_form_submitted: 'AW-18058139346/LA8hCIq0rK4cENKt5aJD',
} as const

export type ConversionKey = keyof typeof AW_CONVERSION_LABELS

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

// Standaard Ads-conversie parameters. Velden zijn optioneel maar als ze
// meegegeven worden, geeft Ads value/ROAS-rapportage en deduplicatie per
// transaction_id (voorkomt dubbele conversies bij refresh / herbezoek).
// Extra custom params zijn toegestaan via de Record-extension.
export interface ConversionParams extends Record<string, unknown> {
  value?:          number
  currency?:       string
  transaction_id?: string
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function gtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

// Debug-logging alleen buiten productie — bezoekers-consoles blijven schoon.
export const gtagDebug = process.env.NODE_ENV !== 'production'
  ? (...args: unknown[]) => console.log(...args)
  : () => {}
const gtagWarn = process.env.NODE_ENV !== 'production'
  ? (...args: unknown[]) => console.warn(...args)
  : () => {}

function isPlaceholder(label: string): boolean {
  return /HIER$/.test(label) || /^AW-\w+\/X{3,}$/.test(label)
}

/**
 * Vuur een Google Ads conversie, fire-and-forget.
 * Gebruik dit in form submit handlers waar gtag al geladen is.
 * Retourneert `true` als het event in de queue is geduwd.
 *
 * Optionele params (value, currency, transaction_id) worden meegestuurd in
 * de gtag('event', 'conversion', ...) call zodat Ads ROAS kan rapporteren
 * en dedupe op transaction_id kan toepassen.
 */
export function trackConversion(
  key: ConversionKey,
  params: ConversionParams = {},
): boolean {
  if (!gtagAvailable()) {
    gtagWarn('[gtag] niet beschikbaar, conversie niet verzonden:', key)
    return false
  }

  const sendTo = AW_CONVERSION_LABELS[key]
  if (isPlaceholder(sendTo)) {
    gtagWarn('[gtag] conversion label is placeholder, vul in lib/gtag.ts:', key)
    return false
  }

  // Currency default 'EUR' als de aanroeper niets meegeeft — Ads klaagt
  // niet expliciet, maar met currency erbij toont het wel netjes in
  // rapportage (€-symbool i.p.v. raw nummer).
  const eventParams = { send_to: sendTo, currency: 'EUR', ...params }

  window.gtag!('event', 'conversion', eventParams)
  gtagDebug('[gtag] conversion fired:', key, sendTo, params)

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
  params: ConversionParams = {},
  timeoutMs = 1500,
): Promise<boolean> {
  return new Promise(resolve => {
    if (!gtagAvailable()) {
      gtagWarn('[gtag] niet beschikbaar, conversie niet verzonden:', key)
      return resolve(false)
    }

    const sendTo = AW_CONVERSION_LABELS[key]
    if (isPlaceholder(sendTo)) {
      gtagWarn('[gtag] conversion label is placeholder, vul in lib/gtag.ts:', key)
      return resolve(false)
    }

    let done = false
    const finish = (sent: boolean) => {
      if (done) return
      done = true
      gtagDebug('[gtag] conversion', sent ? 'fired' : 'timed out', ':', key)
      resolve(sent)
    }

    setTimeout(() => finish(false), timeoutMs)

    window.gtag!('event', 'conversion', {
      send_to: sendTo,
      currency: 'EUR',
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
  params: ConversionParams = {},
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

// Enhanced Conversions user-data. Plain email/phone is OK — Google hasht
// zelf SHA-256 in de browser vóór verzending naar de Ads-servers. Adres-
// velden ondersteund maar voor lead-conversies meestal niet nodig.
export interface EnhancedUserData {
  email?:        string
  phone_number?: string
  address?: {
    first_name?:  string
    last_name?:   string
    street?:      string
    city?:        string
    region?:      string
    postal_code?: string
    country?:     string
  }
}

/**
 * Zet Enhanced Conversions user_data — moet AAN gtag bekendgemaakt worden
 * VÓÓR de bijbehorende gtag('event', 'conversion', ...) call. Hierdoor kan
 * Ads de conversie matchen aan de oorspronkelijke ad-click ondanks cookieless
 * tracking (ITP / ad-blockers).
 */
export function setEnhancedConversionUserData(data: EnhancedUserData): boolean {
  if (!gtagAvailable()) return false
  window.gtag!('set', 'user_data', data)
  gtagDebug('[gtag] enhanced user_data set', { email: !!data.email, phone: !!data.phone_number })
  return true
}

/**
 * setEnhancedConversionUserData met retry — voor gebruik op bedankt-pagina's
 * waar gtag mogelijk nog niet geladen is bij eerste render.
 */
export function setEnhancedConversionUserDataWithRetry(
  data: EnhancedUserData,
  maxAttempts = 20,
  intervalMs = 250,
): Promise<boolean> {
  return new Promise(resolve => {
    if (typeof window === 'undefined') return resolve(false)
    let attempts = 0
    const tick = () => {
      if (setEnhancedConversionUserData(data)) return resolve(true)
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
 * Bewust ZONDER send_to: GA4_ID. De gtag-loader is nu de geconsolideerde
 * GT-P3NNB4K3 tag die zowel AW als GA4 als destinations heeft. Met
 * send_to: 'G-CSC9H9DFWN' probeert gtag het event SPECIFIEK naar die
 * destination te routeren — maar via de GT-loader is GA4 niet rechtstreeks
 * geregistreerd op de manier die scoped send_to verwacht, dus die events
 * dropten stilletjes (0 contact_form_submitted in GA4 Realtime na 6 visits).
 * Zonder send_to gaat het event naar alle configured destinations; GA4
 * ontvangt het via GT's destination-mapping. AW negeert niet-'conversion'
 * events, dus geen vervuiling van de Ads-pijplijn.
 *
 * GA4_ID-check blijft als feature-flag: leeg maken disabled GA4-events.
 */
export function trackGA4Event(name: string, params: Record<string, unknown> = {}): boolean {
  if (!gtagAvailable()) return false
  if (!GA4_ID) return false
  window.gtag!('event', name, params)
  gtagDebug('[ga4] event fired:', name, params)
  return true
}
