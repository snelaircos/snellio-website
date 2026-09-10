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

  // GEEN conversiewaarden voor trial, lead en demo (besluit Rudy 10-09-2026).
  //
  // Een gratis proefperiode, een contactformulier en een demo-aanvraag zijn
  // geen aankoop; er is op dat moment geen euro betaald. Eerder stond hier
  // 359,40 voor een trial (= 29,95 x 12, een prijs die niet meer bestaat),
  // 15 voor een lead en 50 voor een demo. Die bedragen zijn verwijderd en
  // bewust NIET vervangen: verzonnen omzet stuurt het biedalgoritme de
  // verkeerde kant op en maakt de Ads-rapportage onbruikbaar.
  //
  // Wil je deze conversies later toch op waarde sturen, doe dat dan in Google
  // Ads zelf (conversie-actie > waarde), niet in de code.
  //
  // Alleen purchase_completed heeft een echte waarde; die komt uit de app, uit
  // het werkelijk betaalde factuurbedrag.
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
