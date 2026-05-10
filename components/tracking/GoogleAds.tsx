import Script from 'next/script'
import { GADS_ID, GA4_ID } from '@/lib/gtag'

// Gtag.js bootstrap voor Google Ads + GA4. Eén script, twee config-calls.
// - Ads (AW-...) draait pageview/conversie via z'n eigen logic.
// - GA4 (G-...) krijgt send_page_view:false zodat GA4PageViews zelf de
//   initial + SPA-route pageviews fired (anders dubbel firen).
// Geladen vanuit root layout, dus precies één instantie per pagina.
export default function GoogleAds() {
  if (!GADS_ID && !GA4_ID) return null

  // Gebruik Ads-ID voor de gtag/js library als die er is, anders GA4-ID.
  // Beide ID's worden gewoon door dezelfde gtag.js-bundle geserveerd.
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
