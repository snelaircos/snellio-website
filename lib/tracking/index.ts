// ─────────────────────────────────────────────────────────────────────────────
// Centrale trackinglaag (Google Ads + GA4, Consent Mode v2, attributie).
//
// Gebruik ALLEEN deze module; geen losse gtag()-aanroepen in componenten.
//
//   import { trackTrialSignupCompleted } from '@/lib/tracking'
//   const result = await trackTrialSignupCompleted({ userId, email })
//
// Principes:
//  - Conversies alleen na een door de backend bevestigde status (account
//    bestaat, lead is verstuurd, betaling is 'paid').
//  - Elke conversie heeft een stabiele transaction_id (user-id, lead-id,
//    Mollie payment-id) → Ads dedupliceert. Lokaal markeren we pas als
//    verzonden ná event_callback (localStorage, 90 dagen); een timeout of
//    geblokkeerde tag zet géén marker, zodat een refresh opnieuw mag proberen.
//  - Redirect-veilig: trackXxx() resolvet op event_callback of timeout; wacht
//    erop vóór window.location.href. De gtag-stub staat in <head>, dus events
//    komen altijd in de dataLayer-queue, ook als gtag.js nog laadt.
//  - Debug: NODE_ENV!=='production' of ?tracking_debug=1 (zet localStorage-
//    vlag) → console-logs '[Tracking] …' en window.__snellioTracking.
// ─────────────────────────────────────────────────────────────────────────────

import { TRACKING, sendTo, type ConversionEvent } from './config'
import { readConsent, consentStatus, applyConsent, onConsentChange, adsConsentGranted, type ConsentState, type ConsentStatus } from './consent'
import {
  captureContext, getContext, captureAttribution, getAttribution, attributionForServer, promoteAttributionOnConsent, hasClickId,
  type Attribution, type TrafficContext, type ServerAttribution,
} from './attribution'

export { TRACKING, sendTo, readConsent, consentStatus, applyConsent, onConsentChange, adsConsentGranted,
  captureContext, getContext, captureAttribution, getAttribution, attributionForServer, hasClickId }
export type { ConversionEvent, ConsentState, ConsentStatus, Attribution, TrafficContext, ServerAttribution }

// ── Debug ────────────────────────────────────────────────────────────────────

const DEBUG_KEY = 'snellio:tracking_debug'

interface DebugRegistry {
  config: { googleTagId: string; adsId: string; ga4Id: string; labels: Record<string, string> }
  events: Array<{ at: string; msg: string; data?: unknown }>
  readonly consent: ConsentState | null
  readonly attribution: Attribution | null
  readonly context: TrafficContext | null
  readonly dataLayer: unknown[] | undefined
}
type DebugWindow = Window & { __snellioTracking?: DebugRegistry; google_tag_manager?: unknown }

export function isDebug(): boolean {
  if (process.env.NODE_ENV !== 'production') return true
  if (typeof window === 'undefined') return false
  try { return localStorage.getItem(DEBUG_KEY) === '1' } catch { return false }
}

function registry(): DebugRegistry | null {
  if (typeof window === 'undefined' || !isDebug()) return null
  const w = window as DebugWindow
  if (!w.__snellioTracking) {
    w.__snellioTracking = {
      config: { googleTagId: TRACKING.googleTagId, adsId: TRACKING.adsId, ga4Id: TRACKING.ga4Id, labels: { ...TRACKING.labels } },
      events: [],
      get consent()     { return readConsent() },
      get attribution() { return getAttribution() },
      get context()     { return getContext() },
      get dataLayer()   { return window.dataLayer },
    }
  }
  return w.__snellioTracking
}

// Nooit persoonsgegevens loggen: alleen event-namen, id's en statussen.
function log(msg: string, data?: unknown): void {
  if (!isDebug()) return
  const r = registry()
  if (r) { r.events.push({ at: new Date().toISOString(), msg, data }); if (r.events.length > 200) r.events.shift() }
  if (data !== undefined) console.info('[Tracking]', msg, data)
  else console.info('[Tracking]', msg)
}

// ── gtag-wrapper ─────────────────────────────────────────────────────────────

function gtag(...args: unknown[]): boolean {
  if (typeof window === 'undefined') return false
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    // Stub zou al in <head> staan (GoogleTag.tsx); dit is de vangnet-variant.
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as unknown[])
    }
  }
  window.gtag(...args)
  return true
}

/**
 * Is gtag.js daadwerkelijk geladen? De stub in <head> bestaat altijd; gtag.js
 * zet bij het laden `window.google_tag_manager`. Zonder dat object staat een
 * event alleen in de dataLayer-wachtrij en gaat er niets het netwerk op
 * (script geblokkeerd door een adblocker, of nog niet geladen).
 */
export function gtagLoaded(): boolean {
  if (typeof window === 'undefined') return false
  return typeof (window as DebugWindow).google_tag_manager === 'object' && (window as DebugWindow).google_tag_manager !== null
}

function stripUndefined<T extends Record<string, unknown>>(o: T): T {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T
}

// ── Deduplicatie ─────────────────────────────────────────────────────────────
//
// Drie lagen, van zwak naar sterk:
//  1. In-flight-set: geen tweede aanroep zolang de eerste nog wacht.
//  2. localStorage-marker (90 dagen), gezet PAS in event_callback — dus alleen
//     als gtag.js de hit heeft afgehandeld. Een timeout of een geblokkeerde
//     tag zet géén marker, zodat een refresh in dezelfde sessie het opnieuw
//     mag proberen. Een callback die ná onze timeout alsnog komt, zet de
//     marker alsnog (de hit is dan wel weg).
//  3. Google Ads zelf: dezelfde transaction_id telt maar één keer.
// Tegen loops: maximaal MAX_ATTEMPTS pogingen per sleutel per tab-sessie.

const DEDUPE_PREFIX   = 'snellio:conv:'
const ATTEMPTS_PREFIX = 'snellio:conv:attempts:'
const FUNNEL_PREFIX   = 'snellio:funnel:'
const DEDUPE_TTL_MS   = 90 * 86_400_000
const MAX_ATTEMPTS    = 3
const DEFAULT_WAIT_MS = 2000
const sentInMemory    = new Set<string>()
const inFlight        = new Set<string>()
const attemptsInMemory = new Map<string, number>()

function alreadySent(key: string): boolean {
  if (sentInMemory.has(key)) return true
  try {
    const v = localStorage.getItem(DEDUPE_PREFIX + key)
    if (!v) return false
    if (Date.now() - Number(v) > DEDUPE_TTL_MS) { localStorage.removeItem(DEDUPE_PREFIX + key); return false }
    return true
  } catch { return false }
}

function markSent(key: string): void {
  sentInMemory.add(key)
  try { localStorage.setItem(DEDUPE_PREFIX + key, String(Date.now())) } catch { /* storage geblokkeerd: in-memory guard blijft */ }
}

function countAttempt(key: string): number {
  let n = attemptsInMemory.get(key) ?? 0
  try { n = Math.max(n, Number(sessionStorage.getItem(ATTEMPTS_PREFIX + key) ?? 0)) } catch { /* negeer */ }
  n += 1
  attemptsInMemory.set(key, n)
  try { sessionStorage.setItem(ATTEMPTS_PREFIX + key, String(n)) } catch { /* negeer */ }
  return n
}

/** GA4-funnelevent maar één keer per sleutel per tab-sessie, ook bij een retry van de Ads-hit. */
function funnelEventSent(key: string): boolean {
  try {
    if (sessionStorage.getItem(FUNNEL_PREFIX + key)) return true
    sessionStorage.setItem(FUNNEL_PREFIX + key, '1')
  } catch { /* negeer */ }
  return false
}

// ── Google Ads conversie (generiek) ──────────────────────────────────────────

/**
 * sent        event_callback van gtag is aangeroepen: gtag.js heeft de hit
 *             afgehandeld. Dat is de beste bevestiging die de browser geeft;
 *             het bewijst niet dat Google de request ook heeft ontvangen.
 * timeout     gtag.js is geladen, maar de callback bleef uit binnen waitMs.
 * blocked     gtag.js is niet geladen (adblocker/geblokkeerd script): het
 *             event staat in de dataLayer-wachtrij, er ging niets weg.
 * duplicate   eerder al 'sent' (marker), nog in-flight, of MAX_ATTEMPTS bereikt.
 * unavailable geen browseromgeving (SSR).
 * no_label    geen conversielabel geconfigureerd voor dit event.
 * error       gtag gooide een uitzondering.
 * Alleen 'sent' zet de 90-dagen-marker.
 */
export type ConversionResult = 'sent' | 'timeout' | 'blocked' | 'duplicate' | 'unavailable' | 'no_label' | 'error'

export interface ConversionInput {
  event:          ConversionEvent
  /** Stabiele, unieke sleutel per conversie (user-id, lead-id, Mollie payment-id). */
  transactionId:  string
  value?:         number
  currency?:      string
  /** Max. wachttijd op event_callback vóór de aanroeper mag navigeren. */
  waitMs?:        number
  extra?:         Record<string, unknown>
}

export function trackGoogleAdsConversion(input: ConversionInput): Promise<ConversionResult> {
  return new Promise(resolve => {
    if (typeof window === 'undefined') return resolve('unavailable')

    const destination = sendTo(input.event)
    if (!destination) {
      log(`${input.event}: geen Google Ads-label geconfigureerd, niet verzonden`, { transaction_id: input.transactionId })
      return resolve('no_label')
    }

    const key = `${input.event}:${input.transactionId}`
    if (alreadySent(key)) {
      log('duplicate conversion prevented (al verzonden)', { event: input.event, transaction_id: input.transactionId })
      return resolve('duplicate')
    }
    if (inFlight.has(key)) {
      log('duplicate conversion prevented (nog onderweg)', { event: input.event, transaction_id: input.transactionId })
      return resolve('duplicate')
    }
    const attempt = countAttempt(key)
    if (attempt > MAX_ATTEMPTS) {
      log('conversion niet opnieuw geprobeerd: maximum pogingen bereikt', { event: input.event, transaction_id: input.transactionId, attempt })
      return resolve('duplicate')
    }
    inFlight.add(key)

    // value + currency alleen als er werkelijk geld is betaald. Google Ads
    // accepteert een conversie zonder waarde; een verzonnen bedrag meesturen
    // is erger dan geen bedrag meesturen.
    const heeftWaarde = typeof input.value === 'number' && input.value > 0
    const params = stripUndefined({
      value:          heeftWaarde ? input.value : undefined,
      currency:       heeftWaarde ? (input.currency ?? TRACKING.currency) : undefined,
      transaction_id: input.transactionId,
      ...(input.extra ?? {}),
    })

    let done = false
    const finish = (r: ConversionResult) => {
      if (done) return
      done = true
      inFlight.delete(key)
      log(r === 'sent' ? 'Google Ads conversion fired' : `Google Ads conversion: ${r}`,
        { event: input.event, send_to: destination, transaction_id: input.transactionId, attempt, gtag_loaded: gtagLoaded() })
      resolve(r)
    }
    // Bewust géén event_timeout-parameter van gtag: die roept event_callback
    // ook aan als de hit NIET is verzonden, en dan is de callback geen
    // bewijs meer. Eigen timer, callback betekent dus echt afgehandeld.
    const timer = setTimeout(() => finish(gtagLoaded() ? 'timeout' : 'blocked'), input.waitMs ?? DEFAULT_WAIT_MS)

    log(input.event, params)
    try {
      gtag('event', 'conversion', {
        send_to: destination,
        ...params,
        event_callback: () => {
          clearTimeout(timer)
          // Ook een late callback (na onze timeout) markeert: de hit is weg.
          markSent(key)
          if (done) { log('late event_callback: alsnog gemarkeerd als verzonden', { event: input.event, transaction_id: input.transactionId }); return }
          finish('sent')
        },
      })
    } catch (e) {
      clearTimeout(timer)
      log('gtag error', { event: input.event, error: e instanceof Error ? e.message : String(e) })
      return finish('error')
    }

    // Zelfde funnelstap als GA4-event (zonder send_to: via de GT-loader
    // bereikt het GA4; Ads negeert events die niet 'conversion' heten).
    // Eén keer per sessie, ook als de Ads-hit opnieuw wordt geprobeerd.
    if (TRACKING.ga4Id && !funnelEventSent(key)) gtag('event', input.event, params)
  })
}

// ── Resultaatrapportage (geen persoonsgegevens) ──────────────────────────────

export interface ConversionReport {
  event:               ConversionEvent
  /** Laatste 6 tekens van de transaction_id; genoeg om een user terug te vinden, geen id om op te zoeken. */
  transaction_suffix:  string
  result:              ConversionResult
  consent:             ConsentStatus
  attribution_present: boolean
  click_id_present:    boolean
  gtag_loaded:         boolean
  attempt?:            number
}

export const CONVERSION_REPORT_PATH = '/api/tracking/conversie-resultaat'

/**
 * Meldt het resultaat aan de eigen server (pm2-log), zodat bij de volgende
 * echte aanmelding zichtbaar is óf en hoe de conversie is verzonden.
 * sendBeacon overleeft de redirect; fetch met keepalive als fallback.
 */
export function reportConversionResult(report: ConversionReport): void {
  if (typeof window === 'undefined') return
  const body = JSON.stringify(report)
  try {
    if (typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(CONVERSION_REPORT_PATH, new Blob([body], { type: 'application/json' }))) return
  } catch { /* val terug op fetch */ }
  try { void fetch(CONVERSION_REPORT_PATH, { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {}) } catch { /* negeer */ }
}

// ── Business-events ──────────────────────────────────────────────────────────

/**
 * Registratie succesvol afgerond: alleen aanroepen nadat /api/aanmelden `ok`
 * heeft teruggegeven (account + tenant bestaan server-side).
 * transaction_id = user-id → één conversie per account, ook na refresh.
 */
export async function trackTrialSignupCompleted(p: { userId: string; email?: string }): Promise<ConversionResult> {
  // Enhanced Conversions: gtag hasht de e-mail zelf en houdt zich aan
  // ad_user_data-consent (bij denied wordt niets meegestuurd).
  if (p.email) gtag('set', 'user_data', { email: p.email })
  // Bewust ZONDER value/currency: de proefperiode is gratis. De echte omzet
  // meldt de app als purchase_completed, zodra er daadwerkelijk betaald is.
  const transactionId = `signup_${p.userId}`
  const result = await trackGoogleAdsConversion({ event: 'trial_signup_completed', transactionId })

  // Diagnose zonder persoonsgegevens: console (altijd, één regel) + server.
  const attribution = getAttribution()
  const report: ConversionReport = {
    event:               'trial_signup_completed',
    transaction_suffix:  transactionId.slice(-6),
    result,
    consent:             consentStatus(),
    attribution_present: !!attribution,
    click_id_present:    hasClickId(attribution),
    gtag_loaded:         gtagLoaded(),
  }
  if (typeof console !== 'undefined') console.info('[tracking] trial conversion result', report)
  reportConversionResult(report)
  return result
}

/** Contactformulier verstuurd (backend heeft de mail verzonden en een lead-id teruggegeven). */
export function trackLeadSubmitted(p: { leadId: string; leadType: 'contact' | 'contact_demo' }): Promise<ConversionResult> {
  return trackGoogleAdsConversion({
    event:         'lead_submitted',
    transactionId: `lead_${p.leadId}`,
    extra:         { lead_type: p.leadType },   // geen value: een aanvraag is geen omzet
  })
}

/** Demo-aanvraag verstuurd (backend heeft de mail verzonden en een lead-id teruggegeven). */
export function trackDemoRequested(p: { leadId: string }): Promise<ConversionResult> {
  return trackGoogleAdsConversion({
    event:         'demo_requested',
    transactionId: `demo_${p.leadId}`,   // geen value: een demo-aanvraag is geen omzet
  })
}

/**
 * Betaling definitief bevestigd (Mollie-status 'paid', server-side
 * geverifieerd). transaction_id = Mollie payment-id (tr_…) of subscription-id.
 * Zonder NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL wordt niets verzonden.
 */
export function trackPurchaseCompleted(p: { transactionId: string; value: number; currency?: string }): Promise<ConversionResult> {
  return trackGoogleAdsConversion({
    event:         'purchase_completed',
    transactionId: p.transactionId,
    value:         p.value,
    currency:      p.currency,
  })
}

/** GA4 custom event (geen Ads-conversie), bv. whatsapp_click. Geen persoonsgegevens meegeven. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!TRACKING.ga4Id) return
  gtag('event', name, params)
  log(name, params)
}

/** GA4 page_view (SPA-routewissel én eerste laad; send_page_view staat uit in de config). */
export function trackPageView(path: string): void {
  if (!TRACKING.ga4Id || typeof window === 'undefined') return
  gtag('event', 'page_view', {
    send_to:       TRACKING.ga4Id,
    page_path:     path,
    page_location: window.location.href,
    page_title:    document.title,
  })
  log('page_view', { path })
}

// ── Init (per paginalaad, vanuit AttributionCapture) ─────────────────────────

let consentListenerRegistered = false

export function initTracking(): void {
  if (typeof window === 'undefined') return
  // ?tracking_debug=1 zet de debug-vlag, =0 wist hem.
  const flag = new URLSearchParams(window.location.search).get('tracking_debug')
  try {
    if (flag === '1') localStorage.setItem(DEBUG_KEY, '1')
    if (flag === '0') localStorage.removeItem(DEBUG_KEY)
  } catch { /* negeer */ }
  registry()

  const context     = captureContext()
  const attribution = captureAttribution()
  if (!consentListenerRegistered) { promoteAttributionOnConsent(); consentListenerRegistered = true }

  log('init', {
    consent:      consentStatus(),
    first_landing: context?.first_landing_page,
    first_referrer: context?.first_referrer || '(direct)',
    click_id:     hasClickId(attribution),
    utm_source:   attribution?.utm_source,
    ads_label_ok: { trial: !!sendTo('trial_signup_completed'), lead: !!sendTo('lead_submitted'), demo: !!sendTo('demo_requested'), purchase: !!sendTo('purchase_completed') },
  })
}
