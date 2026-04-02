export const SITE = {
  name:          'Snellio',
  url:           'https://snellio.nl',
  appUrl:        'https://app.snellio.nl',
  email:         'info@snellio.nl',
  phone:         '+31642732262',
  company:       "Snel Airco's",
  kvk:           '69499829',
  founded:       '2024',
  description:   'CRM-software voor HVAC- en koeltechnisch installateurs. Werkbonnen, installatiebeheer, BRL100-rapportage en F-gassen flesregistratie in één platform.',
  twitterHandle: '@snellio',
  defaultLocale: 'nl-NL',
} as const

export const NAV_ITEMS = [
  { label: 'Functies', href: '/features' },
  { label: 'Prijzen',  href: '/pricing'  },
  { label: 'Blog',     href: '/blog'     },
  { label: 'Contact',  href: '/contact'  },
] as const

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

export const PLANS: Plan[] = [
  {
    id:       'starter',
    name:     'Starter',
    tagline:  'Tot 25 installaties · 1 monteur',
    price:    { month: '9,95', year: '99,50' },
    featured: false,
    cta:      'Begin nu',
    href:     '/registreren?pakket=starter',
    features: [
      { label: 'Tot 25 installaties',          included: true  },
      { label: 'Onbeperkt klanten & locaties', included: true  },
      { label: 'Werkbonnen & handelingen',     included: true  },
      { label: 'PDF werkbon',                  included: true  },
      { label: 'BRL100 rapport',               included: true  },
      { label: 'F-gassen flesregistratie',     included: false },
      { label: 'Forecast dashboard',           included: false },
      { label: 'Meerdere monteurs',            included: false },
      { label: 'Planning & facturatie',        included: false },
    ],
    extras: [],
  },
  {
    id:       'basis',
    name:     'Basis',
    tagline:  'Onbeperkte installaties · 1 monteur',
    price:    { month: '29,95', year: '299,50' },
    featured: false,
    cta:      'Begin nu',
    href:     '/registreren?pakket=basis',
    features: [
      { label: 'Onbeperkte installaties',      included: true  },
      { label: 'Onbeperkt klanten & locaties', included: true  },
      { label: 'Werkbonnen & handelingen',     included: true  },
      { label: 'PDF werkbon',                  included: true  },
      { label: 'BRL100 rapport',               included: true  },
      { label: 'F-gassen flesregistratie',     included: false },
      { label: 'Forecast dashboard',           included: false },
      { label: 'Meerdere monteurs',            included: false },
    ],
    extras: ['Planning module', 'Facturatie vanuit werkbon'],
  },
  {
    id:       'pro',
    name:     'Pro',
    tagline:  'Volledig pakket · Tot 5 monteurs',
    price:    { month: '69,95', year: '699,50' },
    featured: true,
    badge:    'Meest gekozen',
    cta:      'Begin nu →',
    href:     '/registreren?pakket=pro',
    features: [
      { label: 'Onbeperkte installaties',      included: true },
      { label: 'Onbeperkt klanten & locaties', included: true },
      { label: 'Werkbonnen & handelingen',     included: true },
      { label: 'PDF werkbon & BRL100',         included: true },
      { label: 'F-gassen flesregistratie',     included: true },
      { label: 'Forecast dashboard',           included: true },
      { label: 'Tot 5 monteurs',               included: true },
    ],
    extras: ['Planning module', 'Facturatie vanuit werkbon', 'Extra monteurs'],
  },
  {
    id:       'enterprise',
    name:     'Enterprise',
    tagline:  'Alles inclusief · 5+ monteurs',
    price:    { month: '99,95', year: '999,50' },
    featured: false,
    cta:      'Contact opnemen',
    href:     '/contact',
    features: [
      { label: 'Alles uit Pro',                 included: true },
      { label: 'Planning module inbegrepen',    included: true },
      { label: 'Facturatie inbegrepen',         included: true },
      { label: '5 monteurs standaard',          included: true },
      { label: 'Extra monteurs lage meerprijs', included: true },
      { label: 'Prioriteit support',            included: true },
      { label: 'Klantportaal inbegrepen',       included: true },
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
  { value: '30',   suffix: 'dgn', label: 'gratis trial'    },
] as const
