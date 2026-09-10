// First-party attributie: bewaart ad-click-identifiers (gclid/gbraid/wbraid)
// en utm-parameters van de landing tot de conversie, zodat de bron niet
// verloren gaat bij redirects (aanmelden → app.snellio.nl) of latere sessies.
//
// Opslag:
//  - sessionStorage (altijd, alleen dit domein, alleen deze tab-sessie)
//  - cookie `snellio_attr` op .snellio.nl (90 dagen) — ALLEEN als de bezoeker
//    marketing-consent heeft gegeven (Consent Mode v2: ad_storage granted).
//    Zonder consent blijven click-id's dus buiten cookies; gtag zelf gebruikt
//    dan url_passthrough voor de cookieless conversie-ping.
// Bij aanmelding gaat de attributie mee naar /api/aanmelden (server-side bij
// het account bewaard), zodat de app een latere aankoop kan attribueren.

import { TRACKING } from './config'
import { adsConsentGranted, readCookie, setCookie, onConsentChange } from './consent'

const CLICK_KEYS = ['gclid', 'gbraid', 'wbraid'] as const
const UTM_KEYS   = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
const SESSION_KEY = 'snellio:attr'
const COOKIE_DAYS = 90
const MAX_LEN = 200

export interface Attribution {
  gclid?: string; gbraid?: string; wbraid?: string
  utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_term?: string; utm_content?: string
  landing_page?: string
  referrer?: string
  captured_at?: string
}

const clean = (v: string | null) => (v ?? '').trim().slice(0, MAX_LEN)

function fromUrl(): Attribution | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search)
  const out: Attribution = {}
  for (const k of [...CLICK_KEYS, ...UTM_KEYS]) {
    const v = clean(p.get(k))
    if (v) out[k] = v
  }
  if (Object.keys(out).length === 0) return null
  out.landing_page = window.location.pathname
  try { out.referrer = document.referrer ? new URL(document.referrer).hostname : '' } catch { /* negeer */ }
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

/** Aanroepen bij elke paginalaad. Nieuwe click-/utm-parameters in de URL winnen van oudere. */
export function captureAttribution(): Attribution | null {
  const url = fromUrl()
  if (url) { persist(url); return url }
  return getAttribution()
}

export function getAttribution(): Attribution | null {
  return readAttrCookie() ?? readSession()
}

export function hasClickId(a: Attribution | null): boolean {
  return !!a && CLICK_KEYS.some(k => !!a[k])
}

/**
 * Wat naar de server gaat bij aanmelding. Click-id's alleen met marketing-
 * consent; utm-/landingsgegevens zijn geen persoonsidentificatoren en gaan
 * altijd mee.
 */
export function attributionForServer(): (Attribution & { consent_ads: boolean }) | null {
  const a = getAttribution()
  if (!a) return null
  const granted = adsConsentGranted()
  const out: Attribution & { consent_ads: boolean } = { consent_ads: granted }
  for (const k of UTM_KEYS) if (a[k]) out[k] = a[k]
  if (a.landing_page) out.landing_page = a.landing_page
  if (a.referrer)     out.referrer     = a.referrer
  if (a.captured_at)  out.captured_at  = a.captured_at
  if (granted) for (const k of CLICK_KEYS) if (a[k]) out[k] = a[k]
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
