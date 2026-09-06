// Consent Mode v2 — opslag en update.
//
// Keuze staat in de cookie `snellio_consent` (granted|denied) op het
// hoofddomein, zodat app.snellio.nl dezelfde keuze ziet. De DEFAULT-state
// wordt server-side in <head> gezet (components/tracking/GoogleTag.tsx) uit
// diezelfde cookie, vóórdat gtag.js laadt. Dit bestand doet de UPDATE.

import { TRACKING } from './config'

export type ConsentState = 'granted' | 'denied'

const CONSENT_EVENT = 'snellio:consent'
const COOKIE_DAYS = 365

function onSnellioDomain(): boolean {
  if (typeof window === 'undefined') return false
  const h = window.location.hostname
  return h === TRACKING.cookieDomain || h.endsWith(`.${TRACKING.cookieDomain}`)
}

export function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 86_400_000).toUTCString()
  const domain = onSnellioDomain() ? `; Domain=${TRACKING.cookieDomain}` : ''
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax${domain}${secure}`
}

export function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`))
  return m ? decodeURIComponent(m[1]) : null
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return
  const domain = onSnellioDomain() ? `; Domain=${TRACKING.cookieDomain}` : ''
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax${domain}`
}

/** Huidige keuze: cookie eerst, dan de legacy localStorage-waarde (gemigreerd). */
export function readConsent(): ConsentState | null {
  const c = readCookie(TRACKING.consentCookie)
  if (c === 'granted' || c === 'denied') return c
  try {
    const legacy = localStorage.getItem(TRACKING.legacyConsentKey)
    if (legacy === 'accepted') { setCookie(TRACKING.consentCookie, 'granted', COOKIE_DAYS); return 'granted' }
    if (legacy === 'declined') { setCookie(TRACKING.consentCookie, 'denied',  COOKIE_DAYS); return 'denied' }
  } catch { /* storage geblokkeerd */ }
  return null
}

export function adsConsentGranted(): boolean {
  return readConsent() === 'granted'
}

/**
 * Keuze opslaan én aan gtag doorgeven (consent update op alle vier de
 * Consent Mode v2-signalen). Bij weigering blijft de tag in cookieless-
 * ping-modus en worden ad-click-identifiers geredact.
 */
export function applyConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return
  setCookie(TRACKING.consentCookie, state, COOKIE_DAYS)
  try { localStorage.setItem(TRACKING.legacyConsentKey, state === 'granted' ? 'accepted' : 'declined') } catch { /* negeer */ }

  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as unknown[])
    }
  }
  window.gtag('consent', 'update', {
    ad_storage:         state,
    ad_user_data:       state,
    ad_personalization: state,
    analytics_storage:  state,
  })
  window.gtag('set', 'ads_data_redaction', state === 'denied')
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }))
}

export function onConsentChange(handler: (state: ConsentState) => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const fn = (e: Event) => handler((e as CustomEvent<ConsentState>).detail)
  window.addEventListener(CONSENT_EVENT, fn)
  return () => window.removeEventListener(CONSENT_EVENT, fn)
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
