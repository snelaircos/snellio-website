import Script from 'next/script'
import { GADS_ID, GA4_ID, GTAG_LOADER_ID } from '@/lib/gtag'

// Gtag.js bootstrap voor Google Ads + GA4. Eén script, twee config-calls.
// - GT-... (geconsolideerde Google Tag) staat als PRIMARY id in de gtag/js
//   library-URL. Die tag heeft zowel AW als GA4 als bestemmingen — één
//   request bootstrap dus beide. Eerder stond G-CSC9H9DFWN hier maar die
//   loader gaf 404 en blokkeerde alle gtag-events (ghost-fires).
// - GA4 krijgt send_page_view:false, GA4PageViews fired de pageviews zelf.
// - Beide gtag('config', ...) calls blijven nodig voor destination-specifieke
//   parameters; de GT-loader regelt alleen de bootstrap.
// Geladen vanuit root layout, dus precies één instantie per pagina.
export default function GoogleAds() {
  if (!GTAG_LOADER_ID && !GADS_ID && !GA4_ID) return null

  const libId = GTAG_LOADER_ID || GADS_ID || GA4_ID

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
