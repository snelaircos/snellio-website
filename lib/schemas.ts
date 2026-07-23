import { SITE, PLANS } from './constants'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
    '@id':      `${SITE.url}/#organization`,
    name:       SITE.name,
    url:        SITE.url,
    logo: {
      '@type': 'ImageObject',
      url:     `${SITE.url}/logo-donker.png`,
    },
    contactPoint: {
      '@type':           'ContactPoint',
      telephone:         SITE.phone,
      contactType:       'customer support',
      availableLanguage: 'nl',
    },
    sameAs: [],
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
  return {
    '@context':           'https://schema.org',
    '@type':              'SoftwareApplication',
    '@id':                `${SITE.url}/#software`,
    name:                 SITE.name,
    description:          SITE.description,
    url:                  SITE.appUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem:      'Web, iOS, Android',
    offers: PLANS.map(p => ({
      '@type':      'Offer',
      name:         p.name,
      price:        p.price.month.replace(',', '.'),
      priceCurrency:'EUR',
      priceSpecification: {
        '@type':      'UnitPriceSpecification',
        price:        p.price.month.replace(',', '.'),
        priceCurrency:'EUR',
        unitText:     'per maand',
      },
    })),
    publisher: { '@id': `${SITE.url}/#organization` },
  }
}

// BlogPosting-schema voor artikelen: geeft Google datum, auteur en publisher
// voor rich results. Auteur = Rudy Snel (oprichter, STEK-gecertificeerd),
// sterk E-E-A-T-signaal bij regelgeving-content.
export function articleSchema(post: {
  slug: string; title: string; description: string; dateISO: string
  image?: { src: string }
}) {
  return {
    '@context':     'https://schema.org',
    '@type':        'BlogPosting',
    headline:       post.title,
    description:    post.description,
    datePublished:  post.dateISO,
    dateModified:   post.dateISO,
    inLanguage:     'nl-NL',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` },
    author: {
      '@type':   'Person',
      name:      'Rudy Snel',
      jobTitle:  'Oprichter Snellio, STEK-gecertificeerd installateur',
      url:       SITE.url,
    },
    publisher: { '@id': `${SITE.url}/#organization` },
    image:     post.image ? `${SITE.url}${post.image.src}` : `${SITE.url}/opengraph-image`,
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
