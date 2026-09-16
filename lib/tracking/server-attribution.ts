// Server-side verwerking van de herkomst die het aanmeldformulier meestuurt
// (lib/tracking/attribution.ts, attributionForServer). Los van de route,
// omdat een Next-routebestand alleen HTTP-handlers mag exporteren en omdat de
// logica testbaar moet zijn zonder Supabase.
//
// Bewaard bij het account (user_metadata.attributie):
//  - consent_ads / consent_analytics: 'granted' | 'denied' | 'unknown'
//    ('unknown' = nog niet gekozen; nooit tot een boolean geplet);
//  - verkeerscontext: first_landing_page, first_referrer, captured_at;
//  - marketingattributie: utm's, landing_page, referrer, attribution_captured_at;
//  - click-id's (gclid/gbraid/wbraid) UITSLUITEND bij consent_ads 'granted',
//    ook als een oude of gemanipuleerde client ze zonder consent meestuurt.

export type ConsentStatus = 'granted' | 'denied' | 'unknown'
export const CLICK_KEYS = ['gclid', 'gbraid', 'wbraid'] as const
const CONTEXT_KEYS = [
  'first_landing_page', 'first_referrer', 'captured_at',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'landing_page', 'referrer', 'attribution_captured_at',
] as const
const MAX_LEN = 200

function consentVan(v: unknown): ConsentStatus {
  if (v === true)  return 'granted'   // oudere client (boolean)
  if (v === false) return 'denied'
  return v === 'granted' || v === 'denied' ? v : 'unknown'
}

/** Whitelist en begrenzing van de client-payload; click-id's alleen bij consent. */
export function verwerkAttributie(raw: unknown): Record<string, string> & { consent_ads: ConsentStatus; consent_analytics: ConsentStatus } {
  const src = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
  const consentAds = consentVan(src.consent_ads)
  const out: Record<string, string> & { consent_ads: ConsentStatus; consent_analytics: ConsentStatus } = {
    consent_ads:       consentAds,
    consent_analytics: 'consent_analytics' in src ? consentVan(src.consent_analytics) : consentAds,
  }
  for (const k of CONTEXT_KEYS) { const v = src[k]; if (typeof v === 'string' && v.trim()) out[k] = v.trim().slice(0, MAX_LEN) }
  if (consentAds === 'granted') for (const k of CLICK_KEYS) { const v = src[k]; if (typeof v === 'string' && v.trim()) out[k] = v.trim().slice(0, MAX_LEN) }
  return out
}
