// First-party attributie in twee lagen:
//
//  1. Verkeerscontext (first-touch, per tab-sessie): eerste landingspagina,
//     eerste externe referrer en het tijdstip. Wordt bij het EERSTE bezoek in
//     de tab vastgelegd en daarna nooit meer overschreven, ook niet door
//     interne navigatie. Bevat geen click-id's en geen persoonsgegevens, dus
//     mag altijd worden bewaard. Zonder deze laag was een directe of
//     organische bezoeker bij aanmelding onzichtbaar (attributie null).
//
//  2. Marketingattributie: ad-click-identifiers (gclid/gbraid/wbraid) en
//     utm-parameters uit de URL. Nieuwe campagneparameters in de URL winnen
//     van oudere (een tweede advertentieklik is een nieuwe bron). Eén
//     uitzondering: dezelfde click-id zonder nieuwe utm's (bv. een door
//     url_passthrough gedecoreerde interne link) overschrijft niets.
//
// Opslag:
//  - sessionStorage (altijd, alleen dit domein, alleen deze tab-sessie)
//  - cookie `snellio_attr` op .snellio.nl (90 dagen) — ALLEEN als de bezoeker
//    marketing-consent heeft gegeven (Consent Mode v2: ad_storage granted).
//    Zonder consent blijven click-id's buiten cookies; gtag zelf gebruikt
//    dan url_passthrough voor de cookieless conversie-ping.
// Bij aanmelding gaat context + attributie mee naar /api/aanmelden
// (server-side bij het account bewaard). Click-id's alleen met consent.

import { TRACKING } from './config'
import { adsConsentGranted, consentStatus, readCookie, setCookie, onConsentChange, type ConsentStatus } from './consent'

const CLICK_KEYS = ['gclid', 'gbraid', 'wbraid'] as const
const UTM_KEYS   = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
const SESSION_KEY = 'snellio:attr'
const CONTEXT_KEY = 'snellio:ctx'
const COOKIE_DAYS = 90
const MAX_LEN = 200

export interface Attribution {
  gclid?: string; gbraid?: string; wbraid?: string
  utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_term?: string; utm_content?: string
  landing_page?: string
  referrer?: string
  captured_at?: string
}

export interface TrafficContext {
  first_landing_page: string
  /** Hostname van de eerste externe verwijzer; leeg bij direct verkeer. */
  first_referrer: string
  captured_at: string
}

/** Wat naar /api/aanmelden gaat. Altijd een object, ook zonder campagne-parameters. */
export interface ServerAttribution {
  consent_ads:       ConsentStatus
  consent_analytics: ConsentStatus
  first_landing_page?: string
  first_referrer?:     string
  captured_at?:        string
  gclid?: string; gbraid?: string; wbraid?: string
  utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_term?: string; utm_content?: string
  landing_page?: string
  referrer?: string
  attribution_captured_at?: string
}

const clean = (v: string | null) => (v ?? '').trim().slice(0, MAX_LEN)

function ownHost(hostname: string): boolean {
  if (typeof window === 'undefined') return false
  const here = window.location.hostname
  return hostname === here || hostname === TRACKING.cookieDomain || hostname.endsWith(`.${TRACKING.cookieDomain}`)
}

function referrerHost(): string {
  try {
    if (!document.referrer) return ''
    const h = new URL(document.referrer).hostname
    return ownHost(h) ? '' : clean(h)
  } catch { return '' }
}

// ── Laag 1: verkeerscontext (first-touch) ────────────────────────────────────

function readContext(): TrafficContext | null {
  try { const s = sessionStorage.getItem(CONTEXT_KEY); return s ? JSON.parse(s) as TrafficContext : null } catch { return null }
}

/** Aanroepen bij elke paginalaad; schrijft alleen als er nog geen context is. */
export function captureContext(): TrafficContext | null {
  if (typeof window === 'undefined') return null
  const bestaand = readContext()
  if (bestaand) return bestaand
  const ctx: TrafficContext = {
    first_landing_page: clean(window.location.pathname),
    first_referrer:     referrerHost(),
    captured_at:        new Date().toISOString(),
  }
  try { sessionStorage.setItem(CONTEXT_KEY, JSON.stringify(ctx)) } catch { /* negeer */ }
  return ctx
}

export function getContext(): TrafficContext | null {
  return readContext()
}

// ── Laag 2: marketingattributie ──────────────────────────────────────────────

function fromUrl(): Attribution | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search)
  const out: Attribution = {}
  for (const k of [...CLICK_KEYS, ...UTM_KEYS]) {
    const v = clean(p.get(k))
    if (v) out[k] = v
  }
  if (Object.keys(out).length === 0) return null
  out.landing_page = clean(window.location.pathname)
  out.referrer = referrerHost()
  out.captured_at = new Date().toISOString()
  return out
}

function readSession(): Attribution | null {
  try { const s = sessionStorage.getItem(SESSION_KEY); return s ? JSON.parse(s) as Attribution : null } catch { return null }
}

function readAttrCookie(): Attribution | null {
  try { const s = readCookie(TRACKING.attributionCookie); return s ? JSON.parse(s) as Attribution : null } catch { return null }
}

function persist(a: Attribution): void {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(a)) } catch { /* negeer */ }
  if (adsConsentGranted()) setCookie(TRACKING.attributionCookie, JSON.stringify(a), COOKIE_DAYS)
}

/**
 * Dezelfde click-id als de opgeslagen attributie en geen utm's in de URL:
 * dat is geen nieuwe bron maar een gedecoreerde interne link (url_passthrough).
 * Dan blijft de bestaande attributie (met utm's en echte landingspagina) staan.
 */
function isSameClick(url: Attribution, stored: Attribution | null): boolean {
  if (!stored) return false
  if (UTM_KEYS.some(k => !!url[k])) return false
  const ids = CLICK_KEYS.filter(k => !!url[k])
  return ids.length > 0 && ids.every(k => url[k] === stored[k])
}

/** Aanroepen bij elke paginalaad. Nieuwe click-/utm-parameters in de URL winnen van oudere. */
export function captureAttribution(): Attribution | null {
  const url = fromUrl()
  if (url) {
    const stored = getAttribution()
    if (isSameClick(url, stored)) return stored
    persist(url)
    return url
  }
  return getAttribution()
}

export function getAttribution(): Attribution | null {
  return readAttrCookie() ?? readSession()
}

export function hasClickId(a: Attribution | null): boolean {
  return !!a && CLICK_KEYS.some(k => !!a[k])
}

/**
 * Wat naar de server gaat bij aanmelding. Altijd een object: consentstatus
 * (granted/denied/unknown, nooit tot een boolean geplet) en de first-touch
 * context; campagnevelden alleen als ze er zijn. Click-id's alleen met
 * marketing-consent; utm-/landingsgegevens zijn geen persoonsidentificatoren.
 */
export function attributionForServer(): ServerAttribution {
  const consent = consentStatus()
  // Eén banner, één keuze voor alle signalen: analytics = ads.
  const out: ServerAttribution = { consent_ads: consent, consent_analytics: consent }

  const ctx = getContext()
  if (ctx) {
    out.first_landing_page = ctx.first_landing_page
    if (ctx.first_referrer) out.first_referrer = ctx.first_referrer
    out.captured_at = ctx.captured_at
  }

  const a = getAttribution()
  if (a) {
    for (const k of UTM_KEYS) if (a[k]) out[k] = a[k]
    if (a.landing_page) out.landing_page = a.landing_page
    if (a.referrer)     out.referrer     = a.referrer
    if (a.captured_at)  out.attribution_captured_at = a.captured_at
    if (consent === 'granted') for (const k of CLICK_KEYS) if (a[k]) out[k] = a[k]
  }
  return out
}

/** Zodra consent alsnog wordt gegeven: sessie-attributie promoveren naar de gedeelde cookie. */
export function promoteAttributionOnConsent(): () => void {
  return onConsentChange(state => {
    if (state !== 'granted') return
    const a = readSession()
    if (a) setCookie(TRACKING.attributionCookie, JSON.stringify(a), COOKIE_DAYS)
  })
}
