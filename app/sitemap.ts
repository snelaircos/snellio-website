import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'
import { POSTS } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  // Vaste datum voor pagina's die zelden wijzigen (legal). Voorkomt dat elke
  // deploy de lastModified van alles reset, dat signaal wordt anders ruis.
  const legalDatum = new Date('2026-05-01')

  const routes = [
    { path: '/',                              priority: 1.0,  changeFreq: 'weekly'  as const, lastMod: now },
    { path: '/features',                      priority: 0.9,  changeFreq: 'monthly' as const, lastMod: now },
    { path: '/pricing',                       priority: 0.9,  changeFreq: 'weekly'  as const, lastMod: now },
    { path: '/crm-voor-installateurs',        priority: 0.9,  changeFreq: 'monthly' as const, lastMod: now },
    { path: '/werkbon-software',              priority: 0.9,  changeFreq: 'monthly' as const, lastMod: now },
    { path: '/planningssoftware-monteurs',    priority: 0.9,  changeFreq: 'monthly' as const, lastMod: now },
    { path: '/f-gassen-registratie',          priority: 0.9,  changeFreq: 'monthly' as const, lastMod: now },
    { path: '/automotive',                    priority: 0.9,  changeFreq: 'monthly' as const, lastMod: now },
    { path: '/alternatief-voor-crm-installateurs', priority: 0.85, changeFreq: 'monthly' as const, lastMod: now },
    { path: '/contact',                       priority: 0.8,  changeFreq: 'monthly' as const, lastMod: now },
    { path: '/demo',                          priority: 0.85, changeFreq: 'monthly' as const, lastMod: now },
    // NB: /registreren is een redirect naar /checkout en hoort niet in de
    // sitemap (crawl-verspilling / soft-fout).
    { path: '/blog',                          priority: 0.7,  changeFreq: 'weekly'  as const, lastMod: now },
    { path: '/privacy',                       priority: 0.3,  changeFreq: 'yearly'  as const, lastMod: legalDatum },
    { path: '/voorwaarden',                   priority: 0.3,  changeFreq: 'yearly'  as const, lastMod: legalDatum },
    { path: '/cookiebeleid',                  priority: 0.3,  changeFreq: 'yearly'  as const, lastMod: legalDatum },
  ]

  // Blogartikelen met hun echte publicatiedatum — belangrijk voor de
  // indexering van precies de pagina's die longtail-verkeer moeten trekken.
  const blogRoutes: MetadataRoute.Sitemap = POSTS.map(p => ({
    url:             `${SITE.url}/blog/${p.slug}`,
    lastModified:    new Date(p.dateISO),
    changeFrequency: 'yearly' as const,
    priority:        0.6,
  }))

  return [
    ...routes.map(r => ({
      url:             `${SITE.url}${r.path}`,
      lastModified:    r.lastMod,
      changeFrequency: r.changeFreq,
      priority:        r.priority,
    })),
    ...blogRoutes,
  ]
}
