import { SITE, PLANS, PROFIELEN, KVK_NUMMER } from './constants'

// Eén @id voor de auteur, overal via referentie. De auteurspagina
// /over/rudy-snel bestaat nog niet; het @id is een identifier en hoeft niet
// te resolven. Zodra de pagina er is: url, sameAs (LinkedIn) en
// hasCredential (alleen met een echt, verifieerbaar certificaat) toevoegen.
export const PERSON_ID = `${SITE.url}/over/rudy-snel#person`

export function personSchema() {
  return {
    '@context':  'https://schema.org',
    '@type':     'Person',
    '@id':       PERSON_ID,
    name:        'Rudy Snel',
    jobTitle:    'Oprichter Snellio, koeltechnisch installateur',
    description: 'Oprichter van Snellio en eigenaar van een koeltechniekbedrijf, STEK-gecertificeerd installateur.',
    worksFor:    { '@id': `${SITE.url}/#organization` },
    knowsAbout:  ['F-gassenregistratie', 'BRL 100', 'Koeltechniek', 'Warmtepompen'],
    image:       `${SITE.url}/rudy-snel.png`,
  }
}

export function organizationSchema() {
  return {
    '@context':    'https://schema.org',
    '@type':       'Organization',
    '@id':         `${SITE.url}/#organization`,
    name:          SITE.name,
    url:           SITE.url,
    foundingDate:  SITE.founded,
    founder:       { '@id': PERSON_ID },
    identifier: {
      '@type':    'PropertyValue',
      propertyID: 'KVK',
      value:      KVK_NUMMER,
    },
    logo: {
      '@type': 'ImageObject',
      url:     `${SITE.url}/logo-licht.png`,
    },
    contactPoint: {
      '@type':           'ContactPoint',
      telephone:         SITE.phone,
      contactType:       'customer support',
      availableLanguage: 'nl',
    },
    // Alleen profielen die Snellio zelf beheert (lib/constants.ts PROFIELEN);
    // lege waarden vallen weg. Zie docs/seo-geo/06-schema-entity.md.
    sameAs: Object.values(PROFIELEN).filter(url => url.length > 0),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${SITE.url}/#website`,
    url:        SITE.url,
    name:       SITE.name,
    description: SITE.description,
    publisher:  { '@id': `${SITE.url}/#organization` },
    inLanguage: 'nl-NL',
    potentialAction: {
      '@type':      'SearchAction',
      target:       `${SITE.url}/blog?q={search_term_string}`,
      'query-input':'required name=search_term_string',
    },
  }
}

export function softwareApplicationSchema() {
  // Eén Offer per pakket per betaalperiode. Prijzen zijn de vaste basis-
  // prijzen incl. 21% btw (Pro/Enterprise: inclusief de inbegrepen monteurs);
  // extra monteurs zijn variabel en horen niet in het schema.
  const offers = PLANS.flatMap(p => ([
    {
      '@type':       'Offer',
      name:          `${p.name} (per maand)`,
      price:         p.price.month.toFixed(2),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type':         'UnitPriceSpecification',
        price:           p.price.month.toFixed(2),
        priceCurrency:   'EUR',
        billingDuration: 1,
        unitCode:        'MON',
        unitText:        'per maand',
        valueAddedTaxIncluded: true,
      },
    },
    {
      '@type':       'Offer',
      name:          `${p.name} (per jaar)`,
      price:         p.price.year.toFixed(2),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type':         'UnitPriceSpecification',
        price:           p.price.year.toFixed(2),
        priceCurrency:   'EUR',
        billingDuration: 1,
        unitCode:        'ANN',
        unitText:        'per jaar',
        valueAddedTaxIncluded: true,
      },
    },
  ]))

  return {
    '@context':           'https://schema.org',
    '@type':              'SoftwareApplication',
    '@id':                `${SITE.url}/#software`,
    name:                 SITE.name,
    description:          SITE.description,
    url:                  SITE.appUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem:      'Web, iOS, Android',
    offers,
    publisher: { '@id': `${SITE.url}/#organization` },
  }
}

// Article/BlogPosting-schema: geeft Google datum, auteur en publisher voor
// rich results. Auteur = Rudy Snel (oprichter, STEK-gecertificeerd), sterk
// E-E-A-T-signaal bij regelgeving-content; verwijst via @id naar de Person.
//
// Blogposts geven `slug` (→ /blog/slug), losse informatieve pagina's geven
// `path`. `citation` (URL's van primaire bronnen) en `about` (2 tot 3
// onderwerpen) zijn bedoeld voor de BRL-, F-gassen- en vergelijkingspagina's.
// Een afbeelding met bijschrift wordt een ImageObject, anders een kale URL.
export function articleSchema(post: {
  slug?: string; path?: string
  title: string; description: string; dateISO: string
  dateModifiedISO?: string
  image?: { src: string; caption?: string; datePublished?: string; width?: number; height?: number }
  schemaType?: 'Article' | 'BlogPosting'
  tags?: string[]
  citation?: string[]
  about?: string[]
}) {
  const path     = post.path ?? `/blog/${post.slug}`
  const imageUrl = post.image ? `${SITE.url}${post.image.src}` : `${SITE.url}/opengraph-image`
  const image    = post.image?.caption
    ? {
        '@type':    'ImageObject',
        url:        imageUrl,
        contentUrl: imageUrl,
        caption:    post.image.caption,
        ...(post.image.datePublished ? { datePublished: post.image.datePublished } : {}),
        ...(post.image.width && post.image.height ? { width: post.image.width, height: post.image.height } : {}),
      }
    : imageUrl

  return {
    '@context':     'https://schema.org',
    '@type':        post.schemaType ?? 'BlogPosting',
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
    headline:       post.title,
    description:    post.description,
    datePublished:  post.dateISO,
    dateModified:   post.dateModifiedISO ?? post.dateISO,
    inLanguage:     'nl-NL',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}${path}` },
    author: {
      '@type':   'Person',
      '@id':     PERSON_ID,
      name:      'Rudy Snel',
      jobTitle:  'Oprichter Snellio, STEK-gecertificeerd installateur',
      url:       SITE.url,
    },
    publisher: { '@id': `${SITE.url}/#organization` },
    image,
    ...(post.citation?.length ? { citation: post.citation } : {}),
    ...(post.about?.length ? { about: post.about.map(name => ({ '@type': 'Thing', name })) } : {}),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name:    item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    item.answer,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.name,
      item:      `${SITE.url}${item.href}`,
    })),
  }
}

// WebPage-schema voor commerciële pagina's (pillars): geen Article, wel een
// dateModified die gelijk is aan de zichtbare "Bijgewerkt op"-regel. `aboutId`
// verwijst naar een bestaande node, bv. de site-brede SoftwareApplication
// (`${SITE.url}/#software`), die de root-layout al op elke pagina uitzet.
export function webPageSchema(page: {
  path: string; name: string; description: string
  dateModified: string; datePublished?: string
  aboutId?: string
}) {
  const url = `${SITE.url}${page.path}`
  return {
    '@context':   'https://schema.org',
    '@type':      'WebPage',
    '@id':        url,
    url,
    name:         page.name,
    description:  page.description,
    inLanguage:   'nl-NL',
    isPartOf:     { '@id': `${SITE.url}/#website` },
    publisher:    { '@id': `${SITE.url}/#organization` },
    ...(page.datePublished ? { datePublished: page.datePublished } : {}),
    dateModified: page.dateModified,
    ...(page.aboutId ? { about: { '@id': page.aboutId } } : {}),
  }
}
