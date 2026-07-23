import type { Metadata } from 'next'
import Image             from 'next/image'
import Link              from 'next/link'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import JsonLd    from '@/components/seo/JsonLd'
import Container from '@/components/ui/Container'
import Button    from '@/components/ui/Button'
import Cta       from '@/components/sections/Cta'
import { CERTS } from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Functies, Wat kan Snellio?',
  description: 'Ontdek alle functies van Snellio: werkbonnen, digitaal logboek met QR-kenplaten, BRL100-rapportage, F-gassen flesregistratie, facturatie en Google Calendar sync. Alles voor de HVAC-installateur.',
  path:        '/features',
})

const faqs = [
  { question: 'Kan ik BRL100-rapporten automatisch genereren?',
    answer:   'Ja. Snellio genereert BRL100-rapporten automatisch op basis van de ingevulde koeltechnische handelingen. Je hoeft niets handmatig over te typen.' },
  { question: 'Kan ik kenplaten printen vanuit Snellio?',
    answer:   'Ja. Heb je een kenplaatprinter, dan print je per installatie direct vanuit Snellio een BRL100-conforme kenplaat, inclusief QR-code. Wie de QR-code scant, opent het digitale logboek van die installatie met alle specificaties en de volledige werk-historie.' },
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
      'Digitaal logboek per installatie, via QR op de kenplaat',
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

      {/* ── NIEUW: Digitaal logboek + QR-kenplaten ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block bg-[var(--green)] text-white text-[.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              Nieuw
            </span>
            <h2 className="font-outfit font-black text-white text-2xl md:text-3xl tracking-tight mb-4">
              Digitaal logboek, te openen via de QR-code op de kenplaat
            </h2>
            <p className="text-[var(--text2)] text-base leading-relaxed max-w-2xl mx-auto">
              Elke installatie in Snellio heeft een eigen digitaal logboek. Print de kenplaat met
              QR-code direct vanuit Snellio en iedereen die bij de installatie staat, scant zich
              naar de volledige historie.
            </p>
          </div>

          {/* Echte kenplaat zoals Snellio hem print (gegenereerd met de
              productie-generator; QR wijst naar /demo) */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="rounded-xl overflow-hidden bg-white shadow-[0_16px_48px_rgba(0,0,0,.45)] ring-1 ring-[rgba(10,187,214,.25)]">
              <Image
                src="/kenplaat-voorbeeld.png"
                alt="BRL100-conforme kenplaat koelinstallatie geprint vanuit Snellio, met installatie-identificatienummer, koudemiddel R-32 met GWP, nominale vulling, CO2-equivalent en QR-code naar het digitale logboek"
                width={1400}
                height={933}
                className="w-full h-auto block"
                sizes="(min-width: 768px) 576px, 92vw"
              />
            </div>
            <p className="text-center text-[var(--muted2)] text-xs mt-3">
              Zo rolt de kenplaat uit de printer, alle verplichte velden plus QR-code naar het logboek. Scan hem gerust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                nr: '1', icon: '🖨️', title: 'Print de kenplaat',
                desc: 'Heb je een kenplaatprinter, dan print je per installatie een BRL100-conforme kenplaat: koudemiddel, GWP, nominale vulling, CO2-equivalent en je BRL-nummers, plus QR-code.',
              },
              {
                nr: '2', icon: '🏷️', title: 'Plak hem op de installatie',
                desc: 'De kenplaat komt op de unit te zitten, netjes geprint in plaats van handgeschreven. Alle wettelijk verplichte gegevens staan erop.',
              },
              {
                nr: '3', icon: '📱', title: 'Scan en zie het logboek',
                desc: 'Wie de QR-code scant, opent direct het digitale logboek: specificaties en volledige werk-historie van de installatie, zonder klantgegevens.',
              },
            ].map(stap => (
              <article key={stap.nr} className="relative bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-7">
                <span className="absolute top-5 right-6 font-outfit font-black text-4xl text-[rgba(10,187,214,.15)]">{stap.nr}</span>
                <div className="text-3xl mb-4">{stap.icon}</div>
                <h3 className="font-outfit font-bold text-white text-lg mb-2">{stap.title}</h3>
                <p className="text-[var(--muted2)] text-sm leading-relaxed">{stap.desc}</p>
              </article>
            ))}
          </div>

          <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-8 gap-y-2.5 list-none max-w-3xl mx-auto">
            {[
              'Logboek vult zichzelf vanuit werkorders en F-gas registratie',
              'Monteurs zien ter plekke de complete historie',
              'Voldoet aan de logboekplicht van EU-verordening 2024/573',
            ].map(punt => (
              <li key={punt} className="flex items-start gap-2.5 text-sm text-[var(--text2)]">
                <span className="text-[var(--green)] font-bold shrink-0 mt-px">✓</span>
                {punt}
              </li>
            ))}
          </ul>

          <p className="text-center mt-8">
            <Link href="/blog/digitaal-logboek-qr-kenplaat" className="text-[var(--cyan)] text-sm font-medium hover:underline">
              Lees hoe het digitale logboek werkt →
            </Link>
          </p>
        </Container>
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

      {/* Planning preview */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] text-center mb-3">
            Planning module
          </p>
          <h2 className="font-outfit font-black text-white text-2xl md:text-3xl tracking-tight text-center mb-10">
            Plan werkorders en monteurs in één oogopslag
          </h2>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(10,187,214,.12) 0%, rgba(0,144,184,.06) 100%)',
              border: '1px solid rgba(10,187,214,.2)',
              boxShadow: '0 0 0 1px rgba(10,187,214,.08), 0 32px 80px rgba(0,0,0,.5), 0 0 60px rgba(10,187,214,.08)',
            }}
          >
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
                app.snellio.nl/planning
              </div>
            </div>
            <Image
              src="/planning-preview.png"
              alt="Snellio planning module, werkorders en monteurs gepland in een week-overzicht met Google Calendar synchronisatie voor HVAC- en koeltechnische installateurs"
              width={1120}
              height={550}
              className="w-full h-auto block"
              sizes="(min-width: 1280px) 1152px, 100vw"
            />
          </div>
        </Container>
      </section>

      <Cta />
    </>
  )
}
