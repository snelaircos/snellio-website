import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header      from '@/components/layout/Header'
import Footer      from '@/components/layout/Footer'
import Analytics   from '@/components/tracking/Analytics'
import CookieBanner from '@/components/tracking/CookieBanner'
import JsonLd      from '@/components/seo/JsonLd'
import { rootMetadata }                              from '@/lib/metadata'
import { organizationSchema, websiteSchema, softwareApplicationSchema } from '@/lib/schemas'

export const metadata: Metadata = rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
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
