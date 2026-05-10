import Script from 'next/script'
import { GADS_ID, GA4_ID } from '@/lib/gtag'

// Gtag.js bootstrap voor Google Ads + GA4. Eén script, twee config-calls.
// - GA4 (G-...) staat als PRIMARY id in de gtag/js library-URL zodat de
//   volledige GA4-runtime laadt (anders blijft GA4-routing van send_to-events
//   stuk). AW wordt via gtag('config', AW) gewoon meegenomen, dat werkt
//   cross-id ongeacht welke id in de library-URL staat.
// - GA4 krijgt send_page_view:false, GA4PageViews fired de pageviews zelf.
// Geladen vanuit root layout, dus precies één instantie per pagina.
export default function GoogleAds() {
  if (!GADS_ID && !GA4_ID) return null

  // Voorkeur: GA4-ID als primary in library-URL voor volledige GA4-runtime.
  // Fallback naar Ads-ID als GA4 nog niet geconfigureerd is.
  const libId = GA4_ID || GADS_ID

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
