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

          // ── Consent Mode v2 — MOET vóór js/config in de dataLayer staan ──
          // Eerdere keuze (cookiebanner) staat in localStorage; alleen bij een
          // expliciet eerder 'accepted' starten we met granted. Nieuwe bezoekers
          // en weigeraars: alles denied → gtag draait in cookieless-ping-modus
          // (conversie-modellering blijft werken, geen cookies/remarketing).
          var stored = null;
          try { stored = localStorage.getItem('cookie_consent'); } catch (e) {}
          var granted = stored === 'accepted' ? 'granted' : 'denied';
          window.gtag('consent', 'default', {
            ad_storage:         granted,
            ad_user_data:       granted,
            ad_personalization: granted,
            analytics_storage:  granted,
            wait_for_update:    500
          });
          // Zonder consent: ad-click-ids (gclid) redacten in de pings…
          window.gtag('set', 'ads_data_redaction', granted === 'denied');
          // …maar gclid wél via de URL doorgeven aan de bedanktpagina, zodat
          // een conversie na acceptatie alsnog aan de ad-click te koppelen is.
          window.gtag('set', 'url_passthrough', true);

          window.gtag('js', new Date());
          ${GADS_ID ? `window.gtag('config', '${GADS_ID}');` : ''}
          ${GA4_ID  ? `window.gtag('config', '${GA4_ID}', { send_page_view: false });` : ''}
        `}
      </Script>
    </>
  )
}
