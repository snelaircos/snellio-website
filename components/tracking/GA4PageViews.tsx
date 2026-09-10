'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/tracking'

// GA4 page_view bij elke pathname-wijziging, inclusief de eerste mount.
// Werkt samen met send_page_view:false in de GA4-config (GoogleTag.tsx),
// zodat de initiële pageview niet dubbel telt.
export default function GA4PageViews() {
  const pathname = usePathname()
  useEffect(() => { if (pathname) trackPageView(pathname) }, [pathname])
  return null
}
