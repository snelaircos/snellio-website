'use client'

import Script from 'next/script'

/**
 * Analytics.tsx
 *
 * Consent-based tracking loader.
 * Vul de placeholders in met jouw echte IDs zodra je accounts hebt.
 *
 * GTM_ID:         bijv. GTM-XXXXXXX
 * GA4_ID:         bijv. G-XXXXXXXXXX
 * META_PIXEL_ID:  bijv. 1234567890123456
 * CLARITY_ID:     bijv. abcdefghij
 * ADS_CONVERSION: bijv. AW-XXXXXXXXXX
 */

const GTM_ID        = process.env.NEXT_PUBLIC_GTM_ID        || ''
const GA4_ID        = process.env.NEXT_PUBLIC_GA4_ID        || ''
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
const CLARITY_ID    = process.env.NEXT_PUBLIC_CLARITY_ID    || ''
const GADS_ID       = process.env.NEXT_PUBLIC_GADS_ID       || ''

export default function Analytics() {
  // Render niets in development of als geen IDs geconfigureerd
  if (process.env.NODE_ENV !== 'production') return null
  if (!GTM_ID && !GA4_ID && !GADS_ID) return null

  return (
    <>
      {/* ── Google Tag Manager ── */}
      {GTM_ID && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* ── GA4 (direct, zonder GTM) ── */}
      {GA4_ID && !GTM_ID && (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* ── Microsoft Clarity ── */}
      {CLARITY_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />
      )}

      {/* ── Meta Pixel ── */}
      {META_PIXEL_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* ── Google Ads ── */}
      {GADS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="gads-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GADS_ID}');
              `,
            }}
          />
        </>
      )}

      {/* ── Bing / Microsoft Ads ── */}
      {/* Voeg NEXT_PUBLIC_BING_UET_TAG toe als env variabele */}
      {/* <script ... /> */}
    </>
  )
}
