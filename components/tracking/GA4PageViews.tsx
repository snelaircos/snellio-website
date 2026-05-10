'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { GA4_ID } from '@/lib/gtag'

// Vuurt een GA4 page_view bij elke pathname-wijziging, inclusief de eerste
// mount na een full-page-load. Werkt samen met send_page_view:false in de
// gtag('config', GA4_ID) call uit GoogleAds.tsx, zodat de initial pageview
// niet dubbel fired bij eerste paginalaad.
//
// Stuurt expliciet send_to: GA4_ID, zodat het Ads-account (AW-...) deze
// pageview niet ook nog meeneemt. Pageviews horen niet bij Ads, alleen bij GA4.
export default function GA4PageViews() {
  const pathname = usePathname()

  useEffect(() => {
    if (!GA4_ID) return
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    if (!pathname) return

    window.gtag('event', 'page_view', {
      send_to:       GA4_ID,
      page_path:     pathname,
      page_location: window.location.href,
      page_title:    typeof document !== 'undefined' ? document.title : '',
    })
  }, [pathname])

  return null
}
