import type { Metadata } from 'next'
import { Outfit, Inter, DM_Mono, Syne, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Header      from '@/components/layout/Header'
import Footer      from '@/components/layout/Footer'
import Analytics   from '@/components/tracking/Analytics'
import GoogleAds   from '@/components/tracking/GoogleAds'
import CookieBanner from '@/components/tracking/CookieBanner'
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

// Snellio app-stijl fonts — Syne voor headings, DM Sans voor body
const syne = Syne({
  subsets:  ['latin'],
  weight:   ['700', '800'],
  variable: '--font-syne',
  display:  'swap',
})

const dmSans = DM_Sans({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display:  'swap',
})

export const metadata: Metadata = rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`scroll-smooth ${outfit.variable} ${inter.variable} ${dmMono.variable} ${syne.variable} ${dmSans.variable}`}>
      <head>
        {/* Critical CSS: paint correct background before stylesheet loads — prevents white flash and reduces LCP */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root{--navy:#0f2133;--navy2:#0a1a28;--navy3:#162d42;--accent:#0090b8;--cyan:#0abbd6;--green:#12a87a;--muted:#5a7d96;--muted2:#8fafc8;--border:rgba(0,144,184,.15);--text:#e8f2f8;--text2:#b8d0e0}
          *,*::before,*::after{box-sizing:border-box}
          html{scroll-behavior:smooth}
          body{margin:0;background:#0a1a28;color:#e8f2f8;overflow-x:hidden;line-height:1.6}
          .hero-section{background:#0a1a28}
        `}} />
        {/* Structured data — site-breed */}
        <JsonLd schema={[
          organizationSchema(),
          websiteSchema(),
          softwareApplicationSchema(),
        ]} />
        {/* Consent-based analytics */}
        <Analytics />
      </head>
      <body className="bg-[var(--navy2)] text-[var(--text)] antialiased">
        {/* Google Ads base tag — site-breed, init vóór externe lib zodat dataLayer altijd bestaat */}
        <GoogleAds />
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
