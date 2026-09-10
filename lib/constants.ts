export const SITE = {
  name:          'Snellio',
  url:           'https://snellio.nl',
  appUrl:        'https://app.snellio.nl',
  email:         'info@snellio.nl',
  phone:         '+31642732262',
  company:       'Snellio',
  adres:         'Schepen van Allerpad 17, 6831 MX Arnhem',
  kvk:           '69499829',
  founded:       '2024',
  description:   'CRM-software voor HVAC- en koeltechnisch installateurs. Werkbonnen, installatiebeheer, BRL100-rapportage en F-gassen flesregistratie in één platform.',
  twitterHandle: '@snellio',
  defaultLocale: 'nl-NL',
} as const

// Alle getoonde prijzen zijn inclusief 21% btw: Mollie schrijft exact het
// getoonde bedrag af (zie PACKAGE_PRICES in de checkout/billing API-routes).
// Eén bron voor de vermelding zodat die overal op de site identiek is.
export const BTW = { short: 'incl. 21% btw' } as const

// Versie van de juridische documenten (voorwaarden + bijlagen, privacybeleid).
// LET OP: de app-repo (snellio-app) moet exact dezelfde strings gebruiken —
// het versienummer wordt gelogd bij acceptatie (art. 3.2 voorwaarden).
export const VOORWAARDEN = {
  versie: '2.0',
  datum:  '5 september 2026',
} as const

export const NAV_ITEMS = [
  { label: 'Functies', href: '/features' },
  { label: 'Prijzen',  href: '/pricing'  },
  { label: 'Blog',     href: '/blog'     },
  { label: 'Contact',  href: '/contact'  },
] as const

// ── HVAC-prijsmodel (2026-09) ───────────────────────────────────────────────
// Geen modules meer: elk betaald pakket bevat álle Snellio-functies. Het
// prijsverschil zit uitsluitend in de grootte van het bedrijf: het aantal
// monteurs en (alleen bij Starter) het aantal installaties.
//
// Niemand kiest op de site een pakket. Elke klant start met 14 dagen gratis
// en kiest pas in de app, tijdens de trial, abonnement en betaalwijze. De
// site doet dus geen checkout, geen Mollie en geen mandaat.
export const TRIAL_DAGEN = 14
// Jaarbetaling = 10 maandbedragen voor 12 maanden gebruik (2 maanden gratis).
export const JAAR_MAANDEN_BETAALD = 10

export type HvacPlanId = 'starter' | 'basis' | 'pro' | 'enterprise'

export interface HvacPlan {
  id:        HvacPlanId
  name:      string
  /** Korte doelgroep-zin op de kaart. */
  tagline:   string
  /** Iets langere omschrijving van de doelgroep. */
  audience:  string
  price:     { month: number; year: number }
  monteurs:  {
    inbegrepen: number
    /** Meerprijs per extra monteur per maand, vanaf monteur nr. `vanafMonteur`. */
    extra?:     { vanafMonteur: number; prijs: number }
  }
  installaties: { max: number | null; label: string }
  featured?: boolean
  badge?:    string
}

export const PLANS: HvacPlan[] = [
  {
    id:       'starter',
    name:     'Starter',
    tagline:  'Voor wie klein begint.',
    audience: "Startende ZZP'er of kleine installateur met een beperkte installatieportefeuille.",
    price:    { month: 10, year: 100 },
    monteurs: { inbegrepen: 1 },
    installaties: { max: 25, label: 'Maximaal 25 installaties' },
  },
  {
    id:       'basis',
    name:     'Basis',
    tagline:  'Voor de zelfstandige installateur.',
    audience: "Zelfstandig installateur of ZZP'er die Snellio volledig gebruikt.",
    price:    { month: 29, year: 290 },
    monteurs: { inbegrepen: 1 },
    installaties: { max: null, label: 'Onbeperkt installaties' },
  },
  {
    id:       'pro',
    name:     'Pro',
    tagline:  'Voor teams vanaf 2 monteurs.',
    audience: 'Kleine tot middelgrote installatiebedrijven met meerdere monteurs.',
    price:    { month: 69, year: 690 },
    monteurs: { inbegrepen: 2, extra: { vanafMonteur: 3, prijs: 20 } },
    installaties: { max: null, label: 'Onbeperkt installaties' },
    featured: true,
    badge:    'Meest gekozen',
  },
  {
    id:       'enterprise',
    name:     'Enterprise',
    tagline:  'Voor groeiende bedrijven vanaf 5 monteurs.',
    audience: 'Groeiende installatiebedrijven vanaf ongeveer 5 monteurs.',
    price:    { month: 129, year: 1290 },
    monteurs: { inbegrepen: 5, extra: { vanafMonteur: 6, prijs: 10 } },
    installaties: { max: null, label: 'Onbeperkt installaties' },
    badge:    'Voor groeiende teams',
  },
]

// Functies die in élk pakket zitten. Alleen functies die aantoonbaar in de
// app bestaan (vergelijk /features en FEATURES in lib/pakket.ts van de app).
export const INBEGREPEN = [
  { icon: '👥', label: 'CRM: klanten, locaties & contactpersonen' },
  { icon: '🏠', label: 'Installatiebeheer & digitaal logboek (QR-kenplaat)' },
  { icon: '📋', label: 'Werkbonnen met digitale handtekening' },
  { icon: '📅', label: 'Planning & Google Calendar-sync' },
  { icon: '🧾', label: 'Facturatie met iDEAL-betaallink' },
  { icon: '❄️', label: 'F-gassen & koudemiddelregistratie' },
  { icon: '📄', label: 'BRL100-rapportage' },
  { icon: '📊', label: 'Dashboard & rapportages' },
  { icon: '🔗', label: 'Gratis koppeling WeFact, Moneybird & Exact Online' },
  { icon: '🔐', label: 'Klantportaal' },
] as const

// ── Automotive (aparte verticale, nog in ontwikkeling) ───────────────────────
export interface Plan {
  id:       string
  name:     string
  tagline:  string
  price:    { month: string; year: string }
  featured: boolean
  badge?:   string
  cta:      string
  href:     string
  features: { label: string; included: boolean }[]
  extras:   string[]
}

export const AUTOMOTIVE_PLANS: Plan[] = [
  {
    id:       'starter',
    name:     'Starter',
    tagline:  'Tot 50 voertuigen · 1 monteur',
    price:    { month: '10', year: '100' },
    featured: false,
    cta:      'Hou mij op de hoogte',
    href:     '/contact',
    features: [
      { label: 'Tot 50 voertuigen',                 included: true  },
      { label: 'Onbeperkt klanten',                 included: true  },
      { label: 'Werkorders & handelingen',          included: true  },
      { label: 'Kenteken-lookup via RDW',           included: true  },
      { label: 'PDF werkbon',                       included: true  },
      { label: 'Onderdelen-koppeling leverancier',  included: false },
      { label: 'Klant-akkoord-flow',                included: false },
      { label: 'Gratis boekhoudkoppeling (WeFact, Moneybird, Exact)', included: true  },
      { label: 'Meerdere monteurs',                 included: false },
    ],
    extras: [],
  },
  {
    id:       'basis',
    name:     'Basis',
    tagline:  'Onbeperkte voertuigen · 1 monteur',
    price:    { month: '29', year: '290' },
    featured: false,
    cta:      'Hou mij op de hoogte',
    href:     '/contact',
    features: [
      { label: 'Onbeperkte voertuigen',             included: true  },
      { label: 'Onbeperkt klanten',                 included: true  },
      { label: 'Werkorders & handelingen',          included: true  },
      { label: 'Kenteken-lookup via RDW',           included: true  },
      { label: 'Klant-akkoord-flow',                included: true  },
      { label: 'PDF werkbon',                       included: true  },
      { label: 'Onderdelen-koppeling leverancier',  included: false },
      { label: 'Gratis boekhoudkoppeling (WeFact, Moneybird, Exact)', included: true  },
      { label: 'Meerdere monteurs',                 included: false },
    ],
    extras: ['Planning module', 'Facturatie vanuit werkorder'],
  },
  {
    id:       'pro',
    name:     'Pro',
    tagline:  'Volledig pakket · Tot 5 monteurs',
    price:    { month: '69', year: '690' },
    featured: true,
    badge:    'Meest gekozen',
    cta:      'Hou mij op de hoogte →',
    href:     '/contact',
    features: [
      { label: 'Onbeperkte voertuigen',             included: true },
      { label: 'Onbeperkt klanten',                 included: true },
      { label: 'Werkorders & handelingen',          included: true },
      { label: 'Kenteken-lookup via RDW',           included: true },
      { label: 'Onderdelen-koppeling leverancier',  included: true },
      { label: 'Klant-akkoord-flow',                included: true },
      { label: 'Gratis boekhoudkoppeling (WeFact, Moneybird, Exact)', included: true },
      { label: 'Tot 5 monteurs',                    included: true },
    ],
    extras: ['Planning module', 'Extra monteurs'],
  },
  {
    id:       'enterprise',
    name:     'Enterprise',
    tagline:  'Alles inclusief · 5+ monteurs',
    price:    { month: '129', year: '1.290' },
    featured: false,
    cta:      'Contact opnemen',
    href:     '/contact',
    features: [
      { label: 'Alles uit Pro',                     included: true },
      { label: 'Planning module inbegrepen',        included: true },
      { label: 'Boekhoudkoppeling inbegrepen',      included: true },
      { label: '5 monteurs standaard',              included: true },
      { label: 'Extra monteurs lage meerprijs',     included: true },
      { label: 'Prioriteit support',                included: true },
      { label: 'Klantportaal inbegrepen',           included: true },
    ],
    extras: [],
  },
]

export const FEATURES = [
  { icon: '🏠', title: 'Installatiebeheer',        desc: "Beheer al uw installaties met volledige technische specificaties, foto's en servicelogs."        },
  { icon: '📋', title: 'Werkbonnen & Handelingen', desc: 'Digitale werkbonnen met handtekening ter plaatse. Direct PDF naar klant.'                         },
  { icon: '📄', title: 'BRL100 Rapportage',         desc: 'Automatisch gegenereerde BRL100/BRL200 rapporten die voldoen aan alle certificatie-eisen.'         },
  { icon: '❄️', title: 'F-gassen Registratie',      desc: 'Flesregistratie en koudemiddel tracking conform EU F-gas verordening 2024/573.'                   },
  { icon: '📊', title: 'Forecast Dashboard',        desc: 'Inzicht in opbrengsten, werkorders en serviceplanning. Altijd overzicht over uw bedrijf.'          },
  { icon: '🧾', title: 'Facturatie',                desc: 'Factureer direct vanuit een werkorder. Koppel uw eigen domein voor professionele e-mails.'         },
  { icon: '📅', title: 'Google Calendar Sync',      desc: 'Werkorders automatisch in uw agenda. Per monteur instelbaar.'                                      },
  { icon: '👥', title: 'Klanten & Locaties',        desc: 'Volledig klantbeheer met locaties, contactpersonen en installatiehistorie.'                         },
  { icon: '📚', title: 'Kennisbank',                desc: "Interne kennisbank voor handleidingen, schema's en technische documenten."                         },
] as const

export const CERTS = [
  'BRL100 Categorie 1',
  'BRL200 / B1',
  'R290 Brandbaar koelmiddel',
  'EU F-gas 2024/573',
  'EPBD Gereed',
] as const

export const STATS = [
  { value: '100%', suffix: '',    label: 'F-gas compliant' },
  { value: '5',    suffix: 'min', label: 'setup tijd'      },
  { value: '14',   suffix: 'dgn', label: 'gratis trial'    },
] as const
