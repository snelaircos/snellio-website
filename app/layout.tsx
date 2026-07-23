import type { Metadata } from 'next'
import { Outfit, Inter, DM_Mono, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Header        from '@/components/layout/Header'
import Footer        from '@/components/layout/Footer'
import Analytics     from '@/components/tracking/Analytics'
import GoogleAds     from '@/components/tracking/GoogleAds'
import GA4PageViews  from '@/components/tracking/GA4PageViews'
import CookieBanner  from '@/components/tracking/CookieBanner'
import JsonLd      from '@/components/seo/JsonLd'
import { rootMetadata }                              from '@/lib/metadata'
import { organizationSchema, websiteSchema, softwareApplicationSchema } from '@/lib/schemas'

const outfit = Outfit({
  subsets:  ['latin'],
  weight:   ['600', '700', '800', '900'],
  variable: '--font-outfit',
  display:  'optional', // no font-swap repaint → LCP measured at first text paint, not after swap
  preload:  true,
})

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  variable: '--font-inter',
  display:  'swap',
})

const dmMono = DM_Mono({
  subsets:  ['latin'],
  weight:   ['400', '500'],
  variable: '--font-dm-mono',
  display:  'swap',
})

// DM Sans als body/heading font, clean en modern, matcht de app-stijl
const dmSans = DM_Sans({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display:  'swap',
})

export const metadata: Metadata = rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`scroll-smooth ${outfit.variable} ${inter.variable} ${dmMono.variable} ${dmSans.variable}`}>
      <head>
        {/* Critical CSS: paint correct background before stylesheet loads, prevents flash and reduces LCP */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root{--navy:#f9fbfd;--navy2:#f4f7fa;--navy3:#ffffff;--accent:#0090b8;--accent2:#006d8f;--cyan:#0abbd6;--green:#12a87a;--muted:#5f7791;--muted2:#5f7791;--border:#e4ecf2;--text:#0f2133;--text2:#44607a}
          *,*::before,*::after{box-sizing:border-box}
          html{scroll-behavior:smooth}
          body{margin:0;background:#f4f7fa;color:#0f2133;overflow-x:hidden;line-height:1.6}
          .hero-section{background:#f4f7fa}
        `}} />
        {/* Structured data, site-breed */}
        <JsonLd schema={[
          organizationSchema(),
          websiteSchema(),
          softwareApplicationSchema(),
        ]} />
        {/* Consent-based analytics */}
        <Analytics />
      </head>
      <body className="bg-[var(--navy2)] text-[var(--text)] antialiased">
        {/* Gtag.js bootstrap (Ads + GA4), site-breed, init vóór externe lib zodat dataLayer altijd bestaat */}
        <GoogleAds />
        {/* GA4 page_view op initial + elke SPA-route-change. Geen dubbel firen op Ads. */}
        <GA4PageViews />
        {/* Toetsenbord-gebruikers: direct naar content, onzichtbaar tot focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-semibold"
        >
          Direct naar inhoud
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
