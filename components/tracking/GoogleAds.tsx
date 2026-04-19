import Script from 'next/script'
import { GADS_ID } from '@/lib/analytics/gtag'

// Google Ads base tag. Init-script loopt EERST zodat dataLayer + gtag
// gegarandeerd bestaan voordat de externe gtag/js lib uitvoert.
// Eén instantie, geladen vanuit root layout — dus nooit dubbel.
export default function GoogleAds() {
  if (!GADS_ID) return null

  return (
    <>
      <Script id="gads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          window.gtag('config', '${GADS_ID}');
        `}
      </Script>
      <Script
        id="gads-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  )
}
