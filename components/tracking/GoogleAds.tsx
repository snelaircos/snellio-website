import Script from 'next/script'
import { GADS_ID } from '@/lib/gtag'

// Google Ads base tag — volgt Google's canonieke snippet-volgorde:
// externe gtag/js lib eerst (start async fetch zo vroeg mogelijk),
// daarna inline init die dataLayer + gtag opzet en config pusht.
// Eén instantie, geladen vanuit root layout — dus nooit dubbel.
export default function GoogleAds() {
  if (!GADS_ID) return null

  return (
    <>
      <Script
        id="gads-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          window.gtag('config', '${GADS_ID}');
        `}
      </Script>
    </>
  )
}
