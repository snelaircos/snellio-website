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
//    Mollie payment-id) → Ads dedupliceert, en wij dedupliceren lokaal
//    (localStorage, 90 dagen) zodat een refresh nooit opnieuw meet.
//  - Redirect-veilig: trackXxx() resolvet op event_callback of timeout; wacht
//    erop vóór window.location.href. De gtag-stub staat in <head>, dus events
//    komen altijd in de dataLayer-queue, ook als gtag.js nog laadt.
//  - Debug: NODE_ENV!=='production' of ?tracking_debug=1 (zet localStorage-
//    vlag) → console-logs '[Tracking] …' en window.__snellioTracking.
// ─────────────────────────────────────────────────────────────────────────────

import { TRACKING, sendTo, type ConversionEvent } from './config'
import { readConsent, applyConsent, onConsentChange, adsConsentGranted, type ConsentState } from './consent'
import {
  captureAttribution, getAttribution, attributionForServer, promoteAttributionOnConsent, hasClickId,
  type Attribution,
} from './attribution'

export { TRACKING, sendTo, readConsent, applyConsent, onConsentChange, adsConsentGranted,
  captureAttribution, getAttribution, attributionForServer, hasClickId }
export type { ConversionEvent, ConsentState, Attribution }

// ── Debug ────────────────────────────────────────────────────────────────────

const DEBUG_KEY = 'snellio:tracking_debug'

interface DebugRegistry {
  config: { googleTagId: string; adsId: string; ga4Id: string; labels: Record<string, string> }
  events: Array<{ at: string; msg: string; data?: unknown }>
  readonly consent: ConsentState | null
  readonly attribution: Attribution | null
  readonly dataLayer: unknown[] | undefined
}
type DebugWindow = Window & { __snellioTracking?: DebugRegistry }

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

function stripUndefined<T extends Record<string, unknown>>(o: T): T {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T
}

// ── Deduplicatie ─────────────────────────────────────────────────────────────

const DEDUPE_PREFIX = 'snellio:conv:'
const DEDUPE_TTL_MS = 90 * 86_400_000
const firedInMemory = new Set<string>()

function alreadyFired(key: string): boolean {
  if (firedInMemory.has(key)) return true
  try {
    const v = localStorage.getItem(DEDUPE_PREFIX + key)
    if (!v) return false
    if (Date.now() - Number(v) > DEDUPE_TTL_MS) { localStorage.removeItem(DEDUPE_PREFIX + key); return false }
    return true
  } catch { return false }
}

function markFired(key: string): void {
  firedInMemory.add(key)
  try { localStorage.setItem(DEDUPE_PREFIX + key, String(Date.now())) } catch { /* storage geblokkeerd: in-memory guard blijft */ }
}

// ── Google Ads conversie (generiek) ──────────────────────────────────────────

export type ConversionResult = 'sent' | 'timeout' | 'duplicate' | 'no_label' | 'unavailable'

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
    if (alreadyFired(key)) {
      log('duplicate conversion prevented', { event: input.event, transaction_id: input.transactionId })
      return resolve('duplicate')
    }
    // Markeren vóór verzending: liever één gemiste dan één dubbele conversie.
    markFired(key)

    const params = stripUndefined({
      value:          input.value,
      currency:       input.currency ?? TRACKING.currency,
      transaction_id: input.transactionId,
      ...(input.extra ?? {}),
    })

    let done = false
    const finish = (r: ConversionResult) => {
      if (done) return
      done = true
      log(r === 'sent'
        ? 'Google Ads conversion fired'
        : 'Google Ads conversion: callback-timeout (event staat in de dataLayer-queue)',
        { event: input.event, send_to: destination, transaction_id: input.transactionId })
      resolve(r)
    }
    const timer = setTimeout(() => finish('timeout'), input.waitMs ?? 1500)

    log(input.event, params)
    gtag('event', 'conversion', {
      send_to: destination,
      ...params,
      event_callback: () => { clearTimeout(timer); finish('sent') },
    })

    // Zelfde funnelstap als GA4-event (zonder send_to: via de GT-loader
    // bereikt het GA4; Ads negeert events die niet 'conversion' heten).
    if (TRACKING.ga4Id) gtag('event', input.event, params)
  })
}

// ── Business-events ──────────────────────────────────────────────────────────

/**
 * Registratie succesvol afgerond: alleen aanroepen nadat /api/aanmelden `ok`
 * heeft teruggegeven (account + tenant bestaan server-side).
 * transaction_id = user-id → één conversie per account, ook na refresh.
 */
export function trackTrialSignupCompleted(p: { userId: string; email?: string }): Promise<ConversionResult> {
  // Enhanced Conversions: gtag hasht de e-mail zelf en houdt zich aan
  // ad_user_data-consent (bij denied wordt niets meegestuurd).
  if (p.email) gtag('set', 'user_data', { email: p.email })
  return trackGoogleAdsConversion({
    event:         'trial_signup_completed',
    transactionId: `signup_${p.userId}`,
    value:         TRACKING.values.trial_signup_completed,
  })
}

/** Contactformulier verstuurd (backend heeft de mail verzonden en een lead-id teruggegeven). */
export function trackLeadSubmitted(p: { leadId: string; leadType: 'contact' | 'contact_demo' }): Promise<ConversionResult> {
  return trackGoogleAdsConversion({
    event:         'lead_submitted',
    transactionId: `lead_${p.leadId}`,
    value:         TRACKING.values.lead_submitted,
    extra:         { lead_type: p.leadType },
  })
}

/** Demo-aanvraag verstuurd (backend heeft de mail verzonden en een lead-id teruggegeven). */
export function trackDemoRequested(p: { leadId: string }): Promise<ConversionResult> {
  return trackGoogleAdsConversion({
    event:         'demo_requested',
    transactionId: `demo_${p.leadId}`,
    value:         TRACKING.values.demo_requested,
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

  const attribution = captureAttribution()
  if (!consentListenerRegistered) { promoteAttributionOnConsent(); consentListenerRegistered = true }

  log('init', {
    consent:      readConsent() ?? 'onbekend (default denied)',
    click_id:     hasClickId(attribution),
    utm_source:   attribution?.utm_source,
    ads_label_ok: { trial: !!sendTo('trial_signup_completed'), lead: !!sendTo('lead_submitted'), demo: !!sendTo('demo_requested'), purchase: !!sendTo('purchase_completed') },
  })
}
