import type { Metadata } from 'next'
import Image             from 'next/image'
import { buildMetadata } from '@/lib/metadata'
import { faqSchema }     from '@/lib/schemas'
import JsonLd            from '@/components/seo/JsonLd'
import Hero              from '@/components/sections/Hero'
import SocialProof       from '@/components/sections/SocialProof'
import Features          from '@/components/sections/Features'
import Certifications    from '@/components/sections/Certifications'
import Pricing           from '@/components/sections/Pricing'
import Cta               from '@/components/sections/Cta'

export const metadata: Metadata = buildMetadata({
  title:       'Software voor airco en HVAC installateurs | Snellio',
  description: 'Snellio is de alles-in-één software voor airco- en warmtepompen installateurs en HVAC-bedrijven. Werkbonnen, installatiebeheer, F-gassen registratie, BRL100-rapportage en facturatie. Start 14 dagen gratis.',
  path:        '/',
})

const faqs = [
  {
    question: 'Is Snellio geschikt voor kleine eenmanszaken?',
    answer:   'Ja. Het Starter-pakket is specifiek gemaakt voor installateurs die solo werken. Onbeperkte klanten en locaties, werkbonnen, PDF werkbon en BRL100-rapport inclusief.',
  },
  {
    question: 'Voldoen de rapporten aan de BRL100- en F-gas eisen?',
    answer:   'Ja. Snellio is ontworpen door een BRL100-gecertificeerd installateur. Alle rapportages voldoen aan BRL100, BRL200 en EU F-gas verordening 2024/573.',
  },
  {
    question: 'Hoe lang duurt de installatie?',
    answer:   'Je bent binnen 5 minuten aan het werk. Geen installatie nodig — Snellio werkt volledig in de browser en is ook optimaal op tablet en telefoon.',
  },
  {
    question: 'Kan ik van pakket wisselen?',
    answer:   'Ja, je kunt op elk moment upgraden of downgraden. Bij jaarlijkse betaling ontvang je 2 maanden gratis.',
  },
  {
    question: 'Is er een gratis proefperiode?',
    answer:   'Ja. Je start altijd met een gratis proefperiode van 14 dagen. Geen creditcard nodig.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd schema={faqSchema(faqs)} />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Why Snellio — kort vertrouwensblok onder hero ── */}
      <section className="py-10 px-[5%] bg-[var(--navy2)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[var(--text2)] text-[1rem] leading-[1.8]">
            Gebouwd door een gecertificeerd installateur.{' '}
            <span className="text-white font-medium">
              Geen generieke software, maar een systeem dat exact aansluit op de praktijk in de koeltechniek.
            </span>
          </p>
        </div>
      </section>

      {/* ── Dashboard preview ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <div className="mx-auto max-w-6xl">
          {/* Label */}
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] text-center mb-10">
            Alles in één scherm
          </p>

          {/* Preview frame */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(10,187,214,.12) 0%, rgba(0,144,184,.06) 100%)',
              border: '1px solid rgba(10,187,214,.2)',
              boxShadow: '0 0 0 1px rgba(10,187,214,.08), 0 32px 80px rgba(0,0,0,.5), 0 0 60px rgba(10,187,214,.08)',
            }}
          >
            {/* Browser chrome bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: 'rgba(10,26,40,.8)', borderColor: 'rgba(10,187,214,.15)' }}
            >
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div
                className="ml-4 flex-1 max-w-xs h-5 rounded-md text-[.65rem] font-mono flex items-center px-2.5"
                style={{ background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.35)' }}
              >
                app.snellio.nl
              </div>
            </div>

            {/* Dashboard screenshot */}
            <Image
              src="/dashboard-preview.png"
              alt="Snellio dashboard met overzicht van klanten, installaties, openstaande werkorders, forecast keuringen en koudemiddel flessen — software voor HVAC- en koeltechnische installateurs"
              width={2924}
              height={1672}
              className="w-full h-auto block"
              sizes="(min-width: 1280px) 1152px, 100vw"
            />
          </div>

          {/* Caption */}
          <p className="text-center text-[var(--muted2)] text-sm mt-6">
            Altijd inzicht in uw werkorders, klanten, installaties en facturatie — op elk apparaat.
          </p>
        </div>
      </section>

      {/* ── Social proof ── */}
      <SocialProof />

      {/* ── Features ── */}
      <Features />

      {/* ── Certifications ── */}
      <Certifications />

      {/* ── Pricing ── */}
      <section className="pt-6 pb-0">
        {/* Pricing intro */}
        <div className="px-[5%] text-center mb-2">
          <div className="mx-auto max-w-xl">
            <p className="text-[var(--text2)] text-base leading-relaxed">
              Kies het pakket dat past bij jouw bedrijf.{' '}
              <span className="text-white font-medium">14 dagen gratis proberen, daarna vanaf €10 per maand.</span>
            </p>
          </div>
        </div>
      </section>
      <Pricing />

      {/* ── Interne SEO links ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)] border-t border-[var(--border)]">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[.65rem] text-[var(--muted2)] uppercase tracking-[.14em] text-center mb-4">
            Alles-in-één software voor installateurs
          </p>
          <p className="text-[var(--text2)] text-[.95rem] text-center leading-relaxed max-w-xl mx-auto mb-10">
            Van klantbeheer tot werkbonnen, planning en F-gassen registratie. Snellio helpt installateurs om alles vanuit één systeem te regelen.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                href:  '/crm-voor-installateurs',
                icon:  '🏢',
                title: 'CRM voor installateurs',
                desc:  'Beheer klanten, locaties en installaties in één systeem.',
              },
              {
                href:  '/werkbon-software',
                icon:  '📋',
                title: 'Werkbon software',
                desc:  'Digitale werkbonnen met handtekening en rapportage.',
              },
              {
                href:  '/planningssoftware-monteurs',
                icon:  '📅',
                title: 'Planningssoftware',
                desc:  'Plan werkorders en stuur monteurs efficiënt aan.',
              },
              {
                href:  '/f-gassen-registratie',
                icon:  '❄️',
                title: 'F-gassen registratie',
                desc:  'Volledig digitaal koudemiddellogboek conform wetgeving.',
              },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-start gap-4 bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6 hover:border-[rgba(10,187,214,.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,144,184,.12)] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[rgba(0,144,184,.12)] border border-[rgba(0,144,184,.2)] flex items-center justify-center text-xl shrink-0">
                  {link.icon}
                </div>
                <div>
                  <p className="font-outfit font-bold text-white text-[.95rem] mb-1 group-hover:text-[var(--cyan)] transition-colors">
                    {link.title}
                  </p>
                  <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">
                    {link.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <Cta />

      {/* FAQ — voor zoekmachines */}
      <section className="sr-only" aria-label="Veelgestelde vragen">
        <h2>Veelgestelde vragen over Snellio</h2>
        <dl>
          {faqs.map(faq => (
            <div key={faq.question}>
              <dt>{faq.question}</dt>
              <dd>{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
