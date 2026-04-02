import type { Metadata } from 'next'
import { SITE } from './constants'

interface PageMeta {
  title:       string
  description: string
  path?:       string
  image?:      string
  noIndex?:    boolean
}

export function buildMetadata({
  title,
  description,
  path       = '',
  image      = '/og-default.png',
  noIndex    = false,
}: PageMeta): Metadata {
  const url = `${SITE.url}${path}`

  return {
    title: {
      default:  `${SITE.name} — ${title}`,
      template: `%s | ${SITE.name}`,
    },
    description,
    metadataBase: new URL(SITE.url),
    alternates:   { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true,  follow: true,  googleBot: { index: true, follow: true } },

    openGraph: {
      type:        'website',
      locale:      SITE.defaultLocale,
      url,
      siteName:    SITE.name,
      title:       `${SITE.name} — ${title}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${SITE.name} — ${title}` }],
    },

    twitter: {
      card:        'summary_large_image',
      title:       `${SITE.name} — ${title}`,
      description,
      images:      [image],
      site:        SITE.twitterHandle,
      creator:     SITE.twitterHandle,
    },

    icons: {
      icon:    '/favicon.ico',
      apple:   '/apple-touch-icon.png',
      shortcut:'/favicon-32x32.png',
    },

    verification: {
      // Vul na verificatie in:
      // google: 'GOOGLE_SEARCH_CONSOLE_TOKEN',
      // other: { 'msvalidate.01': 'BING_TOKEN' },
    },
  }
}

// Root metadata (layout.tsx)
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:  `${SITE.name} — CRM voor HVAC & Koeltechniek`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'HVAC software', 'koeltechniek CRM', 'BRL100 software', 'F-gassen registratie',
    'werkbon app installateur', 'airco administratie', 'koeltechnisch logboek',
    'warmtepomp software', 'servicebedrijf CRM', 'installateur app',
  ],
  authors: [{ name: SITE.company, url: SITE.url }],
  creator: SITE.company,
  publisher: SITE.name,
}
