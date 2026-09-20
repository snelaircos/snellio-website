import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

// /_next/ staat bewust NIET op de disallow-lijst: daar staan de JavaScript-
// en CSS-bundels en de geoptimaliseerde afbeeldingen. Google raadt aan die
// niet te blokkeren, anders kan Googlebot de pagina niet renderen zoals een
// bezoeker hem ziet. Gemeten op 20-09-2026: Googlebot had in veertien dagen
// logs geen enkele bundel van snellio.nl opgehaald. De inhoud staat in de
// server-HTML, dus er ging geen tekst verloren, maar rendering en de
// mobiel-controle hebben die bestanden wel nodig.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/', '/admin/'],
      },
    ],
    sitemap:    `${SITE.url}/sitemap.xml`,
  }
}
