import Script from 'next/script'
import { TRACKING } from '@/lib/tracking/config'

// Google Tag bootstrap (Ads + GA4) met Consent Mode v2.
//
// Volgorde is hier het hele punt:
//  1. Inline <script> in <head>, server-gerenderd: dataLayer + gtag-stub,
//     consent DEFAULT (uit cookie `snellio_consent`, anders alles denied),
//     redaction/url_passthrough, js, config AW (met enhanced conversions),
//     config GA4 (send_page_view:false; GA4PageViews vuurt zelf).
//     Dit draait tijdens het parsen van de HTML, dus gegarandeerd vóór gtag.js.
//  2. gtag.js (afterInteractive) verwerkt daarna de queue.
// Events die vóór het laden van gtag.js worden gepusht gaan niet verloren.
//
// Gerenderd vanuit de root-layout: precies één instantie per pagina.

const ID_RE = /^(GT|AW|G)-[A-Z0-9]+$/
const safe = (id: string) => (ID_RE.test(id) ? id : '')

export default function GoogleTag() {
  const gt  = safe(TRACKING.googleTagId)
  const aw  = safe(TRACKING.adsId)
  const ga4 = safe(TRACKING.ga4Id)
  const loader = gt || aw || ga4
  if (!loader) return null

  const init = `
(function(){
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  var c = null;
  try { var m = document.cookie.match(/(?:^|; )${TRACKING.consentCookie}=(granted|denied)/); c = m ? m[1] : null; } catch (e) {}
  if (!c) { try { var s = localStorage.getItem('${TRACKING.legacyConsentKey}'); c = s === 'accepted' ? 'granted' : (s === 'declined' ? 'denied' : null); } catch (e) {} }
  var g = c === 'granted' ? 'granted' : 'denied';
  window.gtag('consent', 'default', {
    ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: g,
    wait_for_update: 500
  });
  window.gtag('set', 'ads_data_redaction', g === 'denied');
  window.gtag('set', 'url_passthrough', true);
  window.gtag('js', new Date());
  ${aw  ? `window.gtag('config', '${aw}', { allow_enhanced_conversions: true });` : ''}
  ${ga4 ? `window.gtag('config', '${ga4}', { send_page_view: false });` : ''}
})();`.trim()

  return (
    <>
      <script id="gtag-init" dangerouslySetInnerHTML={{ __html: init }} />
      <Script id="gtag-lib" src={`https://www.googletagmanager.com/gtag/js?id=${loader}`} strategy="afterInteractive" />
    </>
  )
}
