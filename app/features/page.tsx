import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import JsonLd    from '@/components/seo/JsonLd'
import Container from '@/components/ui/Container'
import Button    from '@/components/ui/Button'
import Cta       from '@/components/sections/Cta'
import { CERTS } from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Functies — Wat kan Snellio?',
  description: 'Ontdek alle functies van Snellio: werkbonnen, installatiebeheer, BRL100-rapportage, F-gassen flesregistratie, facturatie en Google Calendar sync. Alles voor de HVAC-installateur.',
  path:        '/features',
})

const faqs = [
  { question: 'Kan ik BRL100-rapporten automatisch genereren?',
    answer:   'Ja. Snellio genereert BRL100-rapporten automatisch op basis van de ingevulde koeltechnische handelingen. Je hoeft niets handmatig over te typen.' },
  { question: 'Werkt de app ook offline?',
    answer:   'Snellio werkt via de browser. Een stabiele internetverbinding is nodig voor synchronisatie, maar op tablet of telefoon is de interface volledig geoptimaliseerd voor gebruik op locatie.' },
  { question: 'Kan ik meerdere monteurs toevoegen?',
    answer:   'Ja, dat kan vanaf het Pro-pakket. Je kunt per monteur rechten en Google Calendar instellen.' },
]

const details = [
  {
    icon: '📋', title: 'Werkbonnen & digitale handtekening',
    items: [
      'Digitale werkbon met klanthandtekening ter plaatse',
      'PDF werkbon automatisch gegenereerd',
      'Versturen per e-mail direct na uitvoering',
      'Koeltechnische handelingen per type: inbedrijfstelling, lektest, vacuüm, F-gas',
    ],
  },
  {
    icon: '❄️', title: 'F-gassen & koudemiddelregistratie',
    items: [
      'Volledig flesregistratie conform EU F-gas 2024/573',
      'Automatische gram-/kg-berekening per handeling',
      'Track & trace per fles en installatie',
      'Waarschuwing bij lekkoets en ijkdatum lekdetector',
    ],
  },
  {
    icon: '📄', title: 'BRL100 & BRL200 rapportage',
    items: [
      'Automatisch BRL100-rapport per installatie',
      'BRL200/Stek-certificaat ondersteuning',
      'EPBD-gereed voor energieprestatierapportage',
      'Digitale handtekening inclusief klantbevestiging',
    ],
  },
  {
    icon: '🧾', title: 'Facturatie & betalingen',
    items: [
      'Factureer direct vanuit een werkorder',
      'iDEAL betaallink via Mollie',
      'Eigen verzenddomein koppelen',
      'Concept → definitief factuurnummer bij verzenden',
    ],
  },
  {
    icon: '📅', title: 'Planning & Google Calendar',
    items: [
      'Werkorders als agenda-events in Google Calendar',
      'Per monteur instelbaar',
      'Automatische synchronisatie bij aanmaken werkorder',
      'Klantlocatie en telefoonnummer in afspraakdetails',
    ],
  },
  {
    icon: '📊', title: 'Overzicht & rapportage',
    items: [
      'Dashboard met openstaande en uitgevoerde werkorders',
      'F-gas balans per periode',
      'Forecast van geplande werkzaamheden',
      'Exporteer gegevens voor uw eigen administratie',
    ],
  },
]

export default function FeaturesPage() {
  return (
    <>
      <JsonLd schema={[
        breadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'Functies', href: '/features' }]),
        faqSchema(faqs),
      ]} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-[5%] text-center">
        <Container>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Functies</p>
          <h1 className="font-outfit font-black text-white tracking-tight leading-tight mb-5"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            Alles wat u nodig heeft,<br />
            <span className="text-[var(--cyan)]">niets wat u niet gebruikt.</span>
          </h1>
          <p className="text-[var(--text2)] text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Snellio is gebouwd door een installateur, voor installateurs. Iedere functie is ingegeven door echte werksituaties in de koeltechniek.
          </p>
          <Button href="/registreren" size="lg">Start 14 dagen gratis →</Button>
        </Container>
      </section>

      {/* Feature details */}
      <section className="py-16 px-[5%]">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.map((d, i) => (
            <article key={d.title} className="reveal p-7 bg-[var(--navy3)] rounded-2xl border border-[var(--border)] hover:border-[rgba(10,187,214,.25)] transition-all duration-300 hover:-translate-y-1" style={{ transitionDelay: `${i*50}ms` }}>
              <div className="text-3xl mb-4">{d.icon}</div>
              <h2 className="font-outfit font-bold text-white text-lg mb-4">{d.title}</h2>
              <ul className="flex flex-col gap-2.5 list-none">
                {d.items.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text2)]">
                    <span className="text-[var(--green)] font-bold shrink-0 mt-px">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Certificeringen */}
      <section className="py-16 px-[5%] border-y border-[var(--border)] bg-[var(--navy3)]">
        <Container>
          <h2 className="font-outfit font-bold text-white text-2xl mb-6 text-center">Gecertificeerd & compliant</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CERTS.map(cert => (
              <span key={cert} className="inline-flex items-center gap-2 bg-[var(--navy)] border border-[var(--border)] text-[var(--text2)] text-xs font-mono px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
                {cert}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <Cta />
    </>
  )
}
