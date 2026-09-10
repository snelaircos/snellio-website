'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { readConsent, onConsentChange } from '@/lib/tracking'

// Optionele extra tags uit env. Google Ads + GA4 lopen NIET hierlangs maar
// via GoogleTag.tsx (Consent Mode v2 in <head>).
//
// - GTM: alleen zetten als GoogleTag.tsx wordt uitgeschakeld, anders laadt
//   gtag twee keer (dubbele pageviews/conversies).
// - Clarity en Meta Pixel: pas ná marketing-consent (cookie `snellio_consent`
//   = granted); ze kennen geen Consent Mode en zouden anders zonder
//   toestemming cookies zetten.
// Allemaal inactief zolang de env leeg is (huidige productie).

const GTM_ID        = process.env.NEXT_PUBLIC_GTM_ID        || ''
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
const CLARITY_ID    = process.env.NEXT_PUBLIC_CLARITY_ID    || ''

export default function Analytics() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    setGranted(readConsent() === 'granted')
    return onConsentChange(s => setGranted(s === 'granted'))
  }, [])

  if (process.env.NODE_ENV !== 'production') return null
  if (!GTM_ID && !META_PIXEL_ID && !CLARITY_ID) return null

  return (
    <>
      {GTM_ID && (
        <Script id="gtm-script" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
      )}

      {granted && CLARITY_ID && (
        <Script id="clarity-script" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}</Script>
      )}

      {granted && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}</Script>
      )}
    </>
  )
}
