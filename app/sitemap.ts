import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    { path: '/',                              priority: 1.0,  changeFreq: 'weekly'  as const },
    { path: '/features',                      priority: 0.9,  changeFreq: 'monthly' as const },
    { path: '/pricing',                       priority: 0.9,  changeFreq: 'weekly'  as const },
    { path: '/crm-voor-installateurs',        priority: 0.9,  changeFreq: 'monthly' as const },
    { path: '/werkbon-software',              priority: 0.9,  changeFreq: 'monthly' as const },
    { path: '/planningssoftware-monteurs',    priority: 0.9,  changeFreq: 'monthly' as const },
    { path: '/f-gassen-registratie',          priority: 0.9,  changeFreq: 'monthly' as const },
    { path: '/automotive',                    priority: 0.9,  changeFreq: 'monthly' as const },
    { path: '/contact',                       priority: 0.8,  changeFreq: 'monthly' as const },
    { path: '/registreren',                   priority: 0.8,  changeFreq: 'monthly' as const },
    { path: '/blog',                          priority: 0.7,  changeFreq: 'weekly'  as const },
    { path: '/privacy',                       priority: 0.3,  changeFreq: 'yearly'  as const },
    { path: '/voorwaarden',                   priority: 0.3,  changeFreq: 'yearly'  as const },
    { path: '/cookiebeleid',                  priority: 0.3,  changeFreq: 'yearly'  as const },
  ]

  return routes.map(r => ({
    url:             `${SITE.url}${r.path}`,
    lastModified:    now,
    changeFrequency: r.changeFreq,
    priority:        r.priority,
  }))
}
