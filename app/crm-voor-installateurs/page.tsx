import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import JsonLd   from '@/components/seo/JsonLd'
import Container from '@/components/ui/Container'
import Button    from '@/components/ui/Button'

// Split DemoForm JS out of the critical bundle. SSR still produces HTML immediately.
const DemoForm = dynamic(() => import('@/components/forms/DemoForm'))
const Cta      = dynamic(() => import('@/components/sections/Cta'))
import LandingInternalLinks from '@/components/sections/LandingInternalLinks'

export const metadata: Metadata = buildMetadata({
  title:       'CRM voor installateurs, probeer 14 dagen gratis | Snellio',
  description: 'CRM voor installateurs in koeltechniek. Werkbon, planning, F-gassen en factuur in één app. Probeer 14 dagen gratis.',
  path:        '/crm-voor-installateurs',
})

const pijnpunten = [
  { icon: '😤', text: 'Werkbon op papier invullen, terugrijden, inscannen, en dan alsnog alles overtikken voor de factuur. Elke klus kost je dubbel werk.' },
  { icon: '📂', text: 'Servicehistorie van een installatie opzoeken? Drie Excel-bestanden, twee e-mailthreads en een aantekening op je telefoon doorzoeken. Terwijl de klant aan de lijn wacht.' },
  { icon: '⏰', text: 'Na een dag op de knieën ga je \'s avonds nog een uur aan de keukentafel facturen sturen. Dat is geen vrije tijd, dat is onbetaald werk.' },
]

const benefits = [
  { icon: '📋', title: 'Digitale werkbonnen',        desc: 'Klant tekent op tablet. PDF direct verstuurd. BRL100-rapport automatisch klaar.' },
  { icon: '📅', title: 'Planning per monteur',        desc: 'Werkorders toewijzen, Google Calendar sync, altijd overzicht.' },
  { icon: '🏗',  title: 'Installatiebeheer',          desc: 'Per klant alle installaties, koudemiddelen en servicehistorie.' },
  { icon: '❄️', title: 'F-gassen registratie',        desc: 'Flesregistratie en koudemiddellogboek conform EU F-gas 2024/573.' },
  { icon: '🧾', title: 'Facturatie',                  desc: 'Factuur aanmaken vanuit werkbon met iDEAL betaallink via Mollie.' },
  { icon: '📄', title: 'BRL100 rapportage',           desc: 'Automatisch gegenereerd. Direct klaar voor inspectie.' },
]

const stappen = [
  { nr: '1', title: 'Maak gratis een account aan',     desc: 'Probeer 14 dagen gratis. 5 minuten en je bent actief.' },
  { nr: '2', title: 'Voeg klanten en installaties toe', desc: 'Of vraag een demo aan. Wij helpen je bij de start.' },
  { nr: '3', title: 'Werk slimmer vanaf dag één',       desc: 'Minder papier, minder fouten, meer tijd voor het werk.' },
]

const faqs = [
  {
    question: 'Werkt de app ook als ik geen bereik heb in een kruipruimte of stookhok?',
    answer:   'Ja. De app slaat alles offline op je telefoon op en synchroniseert zodra je weer signaal hebt.',
  },
  {
    question: 'Moet ik mijn monteurs op cursus sturen?',
    answer:   'Nee. Eén middag samen meekijken is genoeg. De app is gebouwd voor monteurs, niet voor administratief personeel.',
  },
  {
    question: 'Is dit echt voor koeltechniek of is het een algemene tool met een F-gassen-stickertje?',
    answer:   'Echt voor koeltechniek. Snellio is gebouwd door Rudy Snel, eigenaar van Snel Airco\'s en zelf STEK-gecertificeerd. F-gassen-registratie, BRL100-rapport en lekcontrole-cycli zitten in de kern, niet als plug-in.',
  },
  {
    question: 'Wat als ik na 14 dagen wil stoppen?',
    answer:   'Dan stop je. Geen jaarcontract, geen lock-in. De trial loopt vanzelf af.',
  },
]

export default function CrmVoorInstallateursAdsPage() {
  return (
    <>
      <JsonLd schema={[
        breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'CRM voor installateurs', href: '/crm-voor-installateurs' },
        ]),
        faqSchema(faqs),
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Snellio',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: 'CRM voor airco- en warmtepompen installateurs en HVAC-bedrijven.',
          offers: { '@type': 'Offer', price: '10.00', priceCurrency: 'EUR' },
        },
      ]} />

      {/* ── HERO. Boven de fold, conversie first ── */}
      <section
        className="hero-section relative pt-24 pb-16 px-[5%] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,187,214,.10) 0%, transparent 70%) #f4f7fa' }}
      >
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Rechts: demo formulier. Móbiel eerst bovenaan. */}
          <div
            id="demo-form"
            className="relative bg-[var(--navy3)] rounded-2xl p-8 shadow-lg order-first lg:order-last"
            style={{ border: '1px solid rgba(10,187,214,.25)' }}
          >
            {/* Subtiele glow bovenin het formulierblok */}
            <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)]" />

            <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-2">
              Gratis demo aanvragen
            </p>
            <h2 className="font-outfit font-bold text-[var(--text)] text-xl mb-1">
              Plan je demo in 20 minuten
            </h2>
            <p className="text-[var(--muted2)] text-sm mb-6">
              We laten je exact zien hoe jij tijd bespaart met Snellio.
            </p>
            <DemoForm />
          </div>

          {/* Links: tekst + trust */}
          <div className="order-last lg:order-first">
            <div className="inline-flex items-center gap-2 bg-[rgba(10,187,214,.1)] border border-[rgba(10,187,214,.3)] rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
              <span className="font-mono text-[.68rem] text-[var(--accent)] tracking-[.08em] uppercase">
                Speciaal voor HVAC installateurs
              </span>
            </div>

            <h1
              className="font-outfit font-black text-[var(--text)] tracking-tight leading-[1.05] mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
            >
              De CRM voor installateurs{' '}
              <span style={{ background: 'linear-gradient(135deg, var(--accent) 30%, var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                in koeltechniek
              </span>
            </h1>

            <p className="text-[var(--text2)] text-[1rem] leading-[1.7] mb-6 max-w-md">
              Werkbon, planning, F-gassen en facturatie. Allemaal in één app op je telefoon. Probeer 14 dagen gratis.
            </p>

            {/* Trust bullets */}
            <ul className="flex flex-col gap-3 mb-8 list-none">
              {[
                'Gebouwd door een installateur',
                'Van werkbon tot factuur in één app',
                'Werkbon, factuur en F-gassen vanuit één plek',
                'BRL100-rapport met één klik klaar',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-[var(--text2)] text-sm">
                  <span className="w-5 h-5 rounded-full bg-[rgba(18,168,122,.15)] border border-[rgba(18,168,122,.3)] flex items-center justify-center text-[var(--green)] text-[.7rem] font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button href="/registreren" size="lg">Start 14 dagen gratis →</Button>
              <Button href="#demo-form" variant="ghost" size="lg">Plan mijn demo</Button>
            </div>

            <p className="text-[var(--muted)] text-xs mt-4">
              Probeer 14 dagen gratis • Opzeggen wanneer je wilt • Nederlandse support
            </p>
          </div>
        </div>
      </section>

      {/* ── PIJNPUNTEN ── */}
      <section className="py-16 px-[5%] bg-[var(--navy3)] border-y border-[var(--border)]">
        <Container>
          <p className="font-mono text-[.65rem] text-[var(--muted2)] uppercase tracking-[.14em] text-center mb-6">
            Herken je dit?
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {pijnpunten.map(p => (
              <div key={p.text} className="bg-[rgba(255,80,80,.04)] border border-[rgba(255,80,80,.1)] rounded-xl p-5">
                <div className="text-2xl mb-2">{p.icon}</div>
                <p className="text-[var(--text2)] text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--text2)] text-sm mt-8">
            <strong className="text-[var(--text)]">Snellio lost dit op.</strong> Alles in één systeem, gebouwd voor installateurs.
          </p>
        </Container>
      </section>

      {/* ── VOORDELEN ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">Functies</p>
            <h2 className="font-outfit font-black text-[var(--text)] tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
              Alles wat je nodig hebt, <span className="text-[var(--accent)]">niets wat je niet gebruikt</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="reveal group bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6 hover:border-[rgba(10,187,214,.35)] hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="font-outfit font-bold text-[var(--text)] text-[.95rem] mb-2">{b.title}</h3>
                <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOE WERKT HET ── */}
      <section className="py-20 px-[5%] bg-[var(--navy3)]">
        <Container>
          <div className="text-center mb-12">
            <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">Hoe het werkt</p>
            <h2 className="font-outfit font-black text-[var(--text)] tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
              Aan de slag in <span className="text-[var(--accent)]">3 stappen</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stappen.map((s, i) => (
              <div key={s.nr} className="reveal text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center font-outfit font-black text-white text-lg mx-auto mb-4">
                  {s.nr}
                </div>
                <h3 className="font-outfit font-bold text-[var(--text)] text-sm mb-2">{s.title}</h3>
                <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA REPEAT ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)] text-center">
        <Container narrow>
          <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">Klaar om te starten?</p>
          <h2 className="font-outfit font-black text-[var(--text)] tracking-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Start vandaag nog.<br />
            <span className="text-[var(--accent)]">Probeer 14 dagen gratis.</span>
          </h2>
          <p className="text-[var(--text2)] text-base mb-8">
            Binnen 5 minuten actief. Of vraag eerst een demo aan. We helpen je graag.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/registreren" size="lg">Start 14 dagen gratis →</Button>
            <Button href="#demo-form" variant="ghost" size="lg">Plan mijn demo</Button>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-[5%] bg-[var(--navy3)]">
        <Container narrow>
          <h2 className="font-outfit font-bold text-[var(--text)] text-xl mb-6 text-center">Veelgestelde vragen</h2>
          <dl className="flex flex-col gap-3">
            {faqs.map(faq => (
              <div key={faq.question} className="bg-[var(--navy2)] border border-[var(--border)] rounded-xl px-6 py-5">
                <dt className="font-outfit font-semibold text-[var(--text)] text-[.95rem] mb-1.5">{faq.question}</dt>
                <dd className="text-[var(--muted2)] text-sm leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── LONG-FORM SEO-TEKST: geeft de pagina inhoudelijke diepgang
             (was vrijwel alleen UI-copy — te dun voor een money-keyword) ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container narrow>
          <h2 className="font-outfit font-bold text-[var(--text)] text-2xl mb-6">
            Wat is een CRM voor installateurs?
          </h2>
          <div className="text-[var(--muted2)] text-[.95rem] leading-[1.8] space-y-5">
            <p>
              Een CRM (Customer Relationship Management) voor installateurs is software waarin je
              klanten, installaties, werkorders en facturen op één plek beheert. Waar een algemeen
              CRM stopt bij contactgegevens en notities, gaat een installateurs-CRM verder: per klant
              zie je welke airco of warmtepomp er hangt, welk koudemiddel erin zit, wanneer de laatste
              lekcontrole was en welke <Link href="/werkbon-software" className="text-[var(--accent)] hover:underline">werkbonnen</Link> er
              zijn afgetekend. Voor koeltechniek-bedrijven komt daar de wettelijke{' '}
              <Link href="/f-gassen-registratie" className="text-[var(--accent)] hover:underline">F-gassen registratie</Link>{' '}
              (EU-verordening 2024/573) nog bovenop.
            </p>
            <h3 className="font-outfit font-semibold text-[var(--text)] text-lg pt-2">
              Waarom een los CRM niet werkt voor koeltechniek
            </h3>
            <p>
              Veel installatiebedrijven beginnen met een algemeen pakket of losse tools: Excel voor
              klanten, een agenda-app voor de{' '}
              <Link href="/planningssoftware-monteurs" className="text-[var(--accent)] hover:underline">monteursplanning</Link>,
              papieren werkbonnen en een apart boekhoudpakket. Dat werkt tot een monteur of vijf.
              Daarna gaat het knellen: servicehistorie is onvindbaar, flesregistratie gebeurt achteraf
              (of niet), en elke werkbon wordt twee keer overgetikt. Een branchespecifiek CRM lost dat
              op omdat werkbon, planning, F-gas logboek en factuur uit dezelfde database komen — invullen
              op locatie is meteen verwerken.
            </p>
            <h3 className="font-outfit font-semibold text-[var(--text)] text-lg pt-2">
              Waar let je op bij het kiezen?
            </h3>
            <p>
              Kies op vier punten. <strong className="text-[var(--text)]">Eén:</strong> werkt de app offline?
              In een kruipruimte of stookhok is geen bereik. <strong className="text-[var(--text)]">Twee:</strong>{' '}
              zit F-gassen registratie en BRL100-rapportage in de kern, of is het een plug-in van een
              algemeen pakket? <strong className="text-[var(--text)]">Drie:</strong> kunnen je monteurs er zonder
              cursus mee werken? <strong className="text-[var(--text)]">Vier:</strong> zit je vast aan een
              jaarcontract of kun je maandelijks opzeggen? Snellio is gebouwd door een STEK-gecertificeerd
              installateur die zelf dagelijks op de bus zit — bekijk de{' '}
              <Link href="/pricing" className="text-[var(--accent)] hover:underline">pakketten en prijzen</Link>{' '}
              of vergelijk Snellio met{' '}
              <Link href="/alternatief-voor-crm-installateurs" className="text-[var(--accent)] hover:underline">losse tools</Link>.
            </p>
          </div>
        </Container>
      </section>

      {/* ── STICKY MOBILE CTA, één duidelijke trial-CTA op mobiel ── */}
      <div className="md:hidden fixed bottom-16 inset-x-0 z-40 px-4 pb-2">
        <a
          href="/registreren"
          className="block w-full bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] text-white font-bold py-4 rounded-xl text-center text-base shadow-[0_8px_24px_rgba(0,144,184,.5)]"
        >
          Start 14 dagen gratis →
        </a>
      </div>

      {/* ── Interne links naar de rest van het SEO-cluster (deze pagina is
             het cluster-middelpunt; de andere pagina's linken al hierheen) ── */}
      <LandingInternalLinks
        links={[
          { href: '/werkbon-software',            icon: '📋', title: 'Werkbon-software',      desc: 'Digitale werkbon met handtekening'   },
          { href: '/planningssoftware-monteurs',  icon: '📅', title: 'Planning monteurs',     desc: 'Werkorders inplannen per monteur'    },
          { href: '/f-gassen-registratie',        icon: '❄️', title: 'F-gassen registratie',  desc: 'Flesregistratie & F-gas logboek'     },
          { href: '/pricing',                     icon: '💶', title: 'Pakketten & prijzen',   desc: 'Vanaf €10/maand, 14 dagen gratis'    },
        ]}
      />

      <Cta />
    </>
  )
}
