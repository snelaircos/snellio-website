import type { Metadata } from 'next'
import { Outfit, Inter, DM_Mono } from 'next/font/google'
import '@/styles/globals.css'
import Header      from '@/components/layout/Header'
import Footer      from '@/components/layout/Footer'
import Analytics   from '@/components/tracking/Analytics'
import CookieBanner from '@/components/tracking/CookieBanner'
import JsonLd      from '@/components/seo/JsonLd'
import { rootMetadata }                              from '@/lib/metadata'
import { organizationSchema, websiteSchema, softwareApplicationSchema } from '@/lib/schemas'

const outfit = Outfit({
  subsets:  ['latin'],
  weight:   ['600', '700', '800', '900'],
  variable: '--font-outfit',
  display:  'swap',
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

export const metadata: Metadata = rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`scroll-smooth ${outfit.variable} ${inter.variable} ${dmMono.variable}`}>
      <head>
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
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        {/* Scroll reveal script */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var io = new IntersectionObserver(function(entries){
              entries.forEach(function(e,i){
                if(e.isIntersecting){
                  setTimeout(function(){ e.target.classList.add('visible'); }, i * 60);
                  io.unobserve(e.target);
                }
              });
            }, { threshold: 0.08 });
            document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
          })();
        `}} />
      </body>
    </html>
  )
}
