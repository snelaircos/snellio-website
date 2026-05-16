import Script from 'next/script'
import { GADS_ID, GA4_ID } from '@/lib/gtag'

// Gtag.js bootstrap voor Google Ads + GA4. Eén script, twee config-calls.
// - AW (AW-...) staat als PRIMARY id in de gtag/js library-URL omdat het
//   huidige GA4-property corrupt is: gtag/js?id=G-CSC9H9DFWN geeft 404 en
//   "data collection not active" in GA4-admin. Met AW als library-id laadt
//   gtag wel betrouwbaar; GA4 wordt nog meegenomen via gtag('config', G-...)
//   maar zal pas events ontvangen wanneer er een werkende GA4-property is.
// - GA4 krijgt send_page_view:false, GA4PageViews fired de pageviews zelf.
// Geladen vanuit root layout, dus precies één instantie per pagina.
export default function GoogleAds() {
  if (!GADS_ID && !GA4_ID) return null

  // Voorkeur: AW-ID als primary in library-URL — GA4-loader 404'de in prod
  // wat alle gtag-events (ook AW-conversies) stilletjes liet vallen.
  const libId = GADS_ID || GA4_ID

  return (
    <>
      <Script
        id="gtag-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${libId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          ${GADS_ID ? `window.gtag('config', '${GADS_ID}');` : ''}
          ${GA4_ID  ? `window.gtag('config', '${GA4_ID}', { send_page_view: false });` : ''}
        `}
      </Script>
    </>
  )
}
