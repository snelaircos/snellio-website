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
  image,
  noIndex    = false,
}: PageMeta): Metadata {
  const url = `${SITE.url}${path}`
  // Merknaam één keer, achteraan (SERP-conventie). Pagina-titels mogen dus
  // geen "| Snellio" meer bevatten. Bevat de titel de merknaam al, dan
  // plakken we niets extra's (voorkomt "Snellio ... | Snellio").
  const volledigeTitel = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`

  return {
    title: {
      default:  volledigeTitel,
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
      title:       volledigeTitel,
      description,
      // Geen expliciete images tenzij een pagina er zelf één meegeeft:
      // de file-conventie app/opengraph-image.tsx levert dan sitewide de
      // standaard OG-afbeelding (1200×630) voor og:image én twitter:image.
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: volledigeTitel }] } : {}),
    },

    twitter: {
      card:        'summary_large_image',
      title:       volledigeTitel,
      description,
      ...(image ? { images: [image] } : {}),
      site:        SITE.twitterHandle,
      creator:     SITE.twitterHandle,
    },

    // Icons via de App Router file-conventies app/icon.tsx en
    // app/apple-icon.tsx — geen handmatige verwijzingen naar bestanden
    // die niet bestaan.

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
    default:  `${SITE.name}, CRM voor HVAC & Koeltechniek`,
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
