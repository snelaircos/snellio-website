'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initTracking } from '@/lib/tracking'

// Per paginalaad/routewissel: attributie (gclid/gbraid/wbraid/utm) uit de URL
// first-party bewaren, debug-vlag verwerken, consent-listener registreren.
export default function AttributionCapture() {
  const pathname = usePathname()
  useEffect(() => { initTracking() }, [pathname])
  return null
}
