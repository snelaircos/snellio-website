// Centrale tracking-configuratie. Alle ID's en Google Ads-conversielabels
// komen uit NEXT_PUBLIC_* env-variabelen (build-time ingelijnd door Next.js).
//
// De fallbacks zijn de op 2026-09-06 geverifieerde productie-waarden (voorheen
// hardcoded in lib/gtag.ts). Ze staan hier bewust zodat een vergeten env de
// meting niet stilletjes uitzet; de env op de VPS is leidend.
//
// Placeholders (X-reeksen, 'HIER', 'invullen') gelden als NIET geconfigureerd.

function isPlaceholder(s: string): boolean {
  return /X{4,}/i.test(s) || /HIER$/.test(s) || /invullen/i.test(s) || /^(AW|G|GT)-?$/.test(s)
}

function env(raw: string | undefined, fallback = ''): string {
  const s = (raw ?? '').trim()
  return s && !isPlaceholder(s) ? s : fallback
}

function envNumber(raw: string | undefined, fallback: number): number {
  const n = Number((raw ?? '').replace(',', '.'))
  return Number.isFinite(n) && n >= 0 ? n : fallback
}

export type ConversionEvent =
  | 'trial_signup_completed'
  | 'lead_submitted'
  | 'demo_requested'
  | 'purchase_completed'

export const TRACKING = {
  // Geconsolideerde Google Tag (loader). Bevat AW + GA4 als bestemmingen.
  googleTagId: env(process.env.NEXT_PUBLIC_GOOGLE_TAG_ID, 'GT-P3NNB4K3'),
  // Google Ads destination (conversion-account).
  adsId:       env(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID, 'AW-18058139346'),
  // GA4 measurement-id. Leeg = GA4 uit.
  ga4Id:       env(process.env.NEXT_PUBLIC_GA4_ID, 'G-CSC9H9DFWN'),

  // Conversielabels (het deel ná de slash in AW-xxx/LABEL). Een leeg label
  // betekent: deze conversie wordt NIET naar Ads gestuurd (wel gelogd).
  labels: {
    trial_signup_completed: env(process.env.NEXT_PUBLIC_GOOGLE_ADS_TRIAL_SIGNUP_LABEL, 'SuNcCLS1xK4cENKt5aJD'),
    lead_submitted:         env(process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL,         'LA8hCIq0rK4cENKt5aJD'),
    demo_requested:         env(process.env.NEXT_PUBLIC_GOOGLE_ADS_DEMO_LABEL,         'RgjNCPqXrK4cENKt5aJD'),
    // Geen aankoop-label bekend in repo of omgeving: bewust leeg, nooit verzonnen.
    purchase_completed:     env(process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL,     ''),
  } satisfies Record<ConversionEvent, string>,

  // Conversiewaarden (EUR). Trial/lead/demo hebben geen echte transactiewaarde;
  // dit zijn rapportagewaarden, afstembaar op de instelling van de Ads-actie.
  values: {
    trial_signup_completed: envNumber(process.env.NEXT_PUBLIC_GOOGLE_ADS_TRIAL_SIGNUP_VALUE, 359.4),
    lead_submitted:         envNumber(process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_VALUE,         15),
    demo_requested:         envNumber(process.env.NEXT_PUBLIC_GOOGLE_ADS_DEMO_VALUE,         50),
  },

  currency: 'EUR',

  // Cookies op het hoofddomein zodat app.snellio.nl dezelfde consent- en
  // attributiecookies ziet. Op localhost wordt geen domain-attribuut gezet.
  cookieDomain: env(process.env.NEXT_PUBLIC_TRACKING_COOKIE_DOMAIN, 'snellio.nl'),
  consentCookie:     'snellio_consent',
  attributionCookie: 'snellio_attr',
  // Legacy localStorage-sleutel van de oude cookiebanner; wordt gemigreerd.
  legacyConsentKey:  'cookie_consent',
} as const

export function sendTo(event: ConversionEvent): string | null {
  const label = TRACKING.labels[event]
  if (!TRACKING.adsId || !label) return null
  return `${TRACKING.adsId}/${label}`
}
