import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schemas'
import JsonLd       from '@/components/seo/JsonLd'
import Container    from '@/components/ui/Container'
import ContactForm  from '@/components/forms/ContactForm'
import { SITE }     from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Contact — Stel uw vraag of vraag een demo aan',
  description: 'Neem contact op met Snellio. Vraag een persoonlijke demo aan of stel uw vraag. Wij reageren binnen 1 werkdag.',
  path:        '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home', href: '/' },
        { name: 'Contact', href: '/contact' },
      ])} />

      <section className="pt-32 pb-24 px-[5%]">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-start">

          {/* Links: info */}
          <div>
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Contact</p>
            <h1 className="font-outfit font-black text-white tracking-tight leading-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Laten we kennismaken.<br />
              <span className="text-[var(--cyan)]">Wij helpen je graag.</span>
            </h1>
            <p className="text-[var(--text2)] text-[1.05rem] leading-relaxed mb-10">
              Heb je een vraag over Snellio, wil je een persoonlijke demo, of wil je meer weten over de mogelijkheden voor jouw bedrijf? Vul het formulier in en we nemen snel contact op.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 p-5 bg-[var(--navy3)] rounded-xl border border-[var(--border)]">
                <div className="w-10 h-10 rounded-lg bg-[rgba(10,187,214,.1)] flex items-center justify-center text-lg shrink-0">
                  ✉️
                </div>
                <div>
                  <p className="text-[var(--muted2)] text-xs font-mono uppercase tracking-wide mb-1">E-mail</p>
                  <a href={`mailto:${SITE.email}`} className="text-white font-medium hover:text-[var(--cyan)] transition-colors">
                    {SITE.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-[var(--navy3)] rounded-xl border border-[var(--border)]">
                <div className="w-10 h-10 rounded-lg bg-[rgba(10,187,214,.1)] flex items-center justify-center text-lg shrink-0">
                  ⚡
                </div>
                <div>
                  <p className="text-[var(--muted2)] text-xs font-mono uppercase tracking-wide mb-1">Reactietijd</p>
                  <p className="text-white font-medium">Binnen 1 werkdag</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-[var(--navy3)] rounded-xl border border-[var(--border)]">
                <div className="w-10 h-10 rounded-lg bg-[rgba(10,187,214,.1)] flex items-center justify-center text-lg shrink-0">
                  🎯
                </div>
                <div>
                  <p className="text-[var(--muted2)] text-xs font-mono uppercase tracking-wide mb-1">Demo</p>
                  <p className="text-white font-medium">Persoonlijke walkthrough op afspraak</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rechts: formulier */}
          <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-8">
            <h2 className="font-outfit font-bold text-white text-xl mb-6">Stuur ons een bericht</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
