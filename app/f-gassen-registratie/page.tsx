import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import JsonLd               from '@/components/seo/JsonLd'
import LandingHero          from '@/components/sections/LandingHero'
import LandingFaq           from '@/components/sections/LandingFaq'
import LandingInternalLinks from '@/components/sections/LandingInternalLinks'
import Cta                  from '@/components/sections/Cta'
import Button               from '@/components/ui/Button'
import Container            from '@/components/ui/Container'
import { CERTS }            from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'F-gassen registratie software | Snellio',
  description: 'Digitale F-gassen registratie software conform EU F-gas Verordening 2024/573. Flesregistratie, koudemiddellogboek, lektestregistratie en BRL100-rapportage voor koeltechnische installateurs. Start 30 dagen gratis.',
  path:        '/f-gassen-registratie',
})

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon:  '🧪',
    title: 'Flesregistratie per koudemiddel',
    desc:  'Registreer alle F-gas flessen met type koudemiddel, serienummer, begingewicht en vulhistorie. Volledig audittrail per fles — altijd terug te vinden bij een inspectie.',
    badge: 'F-gas compliant',
  },
  {
    icon:  '📊',
    title: 'Koudemiddellogboek per installatie',
    desc:  'Elk bijvullen, aftappen of lektestresultaat wordt direct gekoppeld aan de betreffende installatie. U ziet in één oogopslag de volledige F-gas historiek per systeem.',
  },
  {
    icon:  '📄',
    title: 'BRL100-rapportage automatisch',
    desc:  'Koeltechnische handelingen genereren automatisch een BRL100-conform rapport. Geen handmatige invoer, geen fouten — direct print-klaar voor de klant of voor inspectie.',
  },
  {
    icon:  '⚖️',
    title: 'Gram-nauwkeurige registratie',
    desc:  'Bijvullen en aftappen in grammen, automatisch omgezet naar kilogram voor de rapportage. Snellio berekent de balans en houdt het restgewicht per fles bij.',
  },
  {
    icon:  '🔍',
    title: 'Lektestregistratie conform wetgeving',
    desc:  'Registreer lekdetector, serienummer, ijkdatum, testmethode, testdruk, standtijd en resultaat. Alle verplichte velden conform EU F-gas Verordening 2024/573 zijn aanwezig.',
  },
  {
    icon:  '📤',
    title: 'Exporteerbaar voor RVO en audits',
    desc:  'Alle F-gas gegevens zijn direct exporteerbaar per installatie en per periode. Bruikbaar voor rapportage aan de RVO, voor externe audits en voor certificering.',
  },
  {
    icon:  '🔗',
    title: 'Koppeling aan werkbon en klant',
    desc:  'Elke F-gas handeling is direct gekoppeld aan de werkbon, de installatie en het klantdossier. Geen losse registraties — alles in één systeem.',
  },
  {
    icon:  '⚠️',
    title: 'Signalering lekdetector ijkdatum',
    desc:  'Snellio waarschuwt wanneer de ijkdatum van een lekdetector verloopt. Altijd compliant, nooit een controle met een verlopen detector.',
  },
]

const problemen = [
  {
    title: 'F-gas logboek bijhouden in Excel',
    desc:  'Foutgevoelig, moeilijk doorzoekbaar en niet geschikt voor inspectie. Bij een externe audit kost het zoeken in spreadsheets uren.',
  },
  {
    title: 'Geen koppeling tussen werkbon en F-gas registratie',
    desc:  'Handmatig overtypen van werkbon naar logboek leidt tot fouten, ontbrekende gegevens en dubbele administratie.',
  },
  {
    title: 'Flesregistratie op papier of in losse bestanden',
    desc:  'Welke fles is bij welke installatie gebruikt? Wanneer is de fles gevuld en hoeveel is er nog in? Onmogelijk te beantwoorden zonder digitaal systeem.',
  },
  {
    title: 'Lektestdocumentatie niet gestandaardiseerd',
    desc:  'Bij een BRL100-inspectie ontbreekt documentatie of klopt het format niet. Dat riskeert een tekortkoming in uw certificering.',
  },
]

const oplossingen = [
  {
    title: 'Automatisch F-gas logboek per installatie',
    desc:  'Elke handeling wordt direct vastgelegd en gekoppeld aan klant, locatie en installatie. Altijd actueel, altijd compliant.',
  },
  {
    title: 'Flesregistratie gekoppeld aan werkorders',
    desc:  'Welk koudemiddel uit welke fles bij welke installatie — volledig traceerbaar zonder extra invoer.',
  },
  {
    title: 'Lektestregistratie conform EU-wetgeving',
    desc:  'Alle verplichte velden aanwezig: detector, ijkdatum, methode, druk, standtijd en resultaat. Direct klaar voor inspectie.',
  },
  {
    title: 'Exporteerbaar voor RVO en externe audits',
    desc:  'Gegevens direct beschikbaar in het juiste formaat. Geen zoeken, geen handmatig samenstellen van rapportages.',
  },
]

const doelgroepen = [
  {
    icon:  '❄️',
    type:  'Koeltechnisch installateur',
    desc:  'Werkt dagelijks met F-gassen en koudemiddelen. Heeft een volledig digitaal logboek nodig dat direct voldoet aan de EU F-gas Verordening — zonder extra administratie bovenop het werk.',
  },
  {
    icon:  '🔧',
    type:  'Airco en warmtepomp installateur',
    desc:  'Installeert systemen met R32, R410A, R290 of andere koudemiddelen. Snellio registreert per installatie welk koudemiddel is gebruikt, hoeveel en wanneer — conform BRL100.',
  },
  {
    icon:  '🏢',
    type:  'Koeltechnisch servicebedrijf',
    desc:  'Voert periodieke lektests en servicebeurten uit bij commerciële koelinstallaties. Heeft een volledig audittrail nodig dat bij externe inspecties direct beschikbaar is.',
  },
  {
    icon:  '📋',
    type:  'BRL100-gecertificeerd bedrijf',
    desc:  'Verplicht tot het bijhouden van koeltechnische logboeken en het genereren van gecertificeerde rapporten. Snellio genereert deze automatisch op basis van ingevulde handelingen.',
  },
]

const voordelen = [
  {
    icon:  '✅',
    title: 'Altijd compliant',
    stat:  'EU F-gas 2024/573',
    items: [
      'Alle verplichte velden standaard aanwezig',
      'BRL100-rapportage automatisch gegenereerd',
      'Flesregistratie conform wetgeving',
      'Lektestdocumentatie direct klaar voor inspectie',
    ],
  },
  {
    icon:  '⏱',
    title: 'Tijdsbesparing',
    stat:  '2–3 uur per week',
    items: [
      'Geen handmatig logboek bijhouden in Excel',
      'F-gas registratie via de werkbon in één stap',
      'Rapporten automatisch aangemaakt',
      'Export voor RVO in seconden klaar',
    ],
  },
  {
    icon:  '🔒',
    title: 'Minder risico',
    stat:  'Geen tekortkoming bij audit',
    items: [
      'Signalering verlopen ijkdatum lekdetector',
      'Volledig audittrail per installatie',
      'Geen ontbrekende gegevens bij inspectie',
      'Gecertificeerde rapporten op aanvraag',
    ],
  },
]

const faqItems = [
  {
    question: 'Wat is F-gassen registratie software?',
    answer:   'F-gassen registratie software is een digitaal systeem voor het bijhouden van alle handelingen met gefluoreerde broeikasgassen (F-gassen). Dit omvat het bijvullen en aftappen van koudemiddelen, lektestresultaten, flesregistratie en de bijbehorende documentatie. Conform de EU F-gas Verordening 2024/573 zijn installateurs verplicht deze gegevens nauwkeurig bij te houden. Snellio is specifiek gebouwd voor koeltechnische installateurs en HVAC-bedrijven die deze verplichting efficiënt en foutloos willen nakomen.',
  },
  {
    question: 'Voldoet Snellio aan EU F-gas Verordening 2024/573?',
    answer:   'Ja. Snellio voldoet volledig aan de eisen van de EU F-gas Verordening 2024/573. Het systeem registreert alle verplichte gegevens per handeling: type koudemiddel, hoeveelheid, installatie, datum, monteur, lektestresultaat en flesregistratie. Alle gegevens zijn exporteerbaar voor rapportage aan de RVO en voor externe audits.',
  },
  {
    question: 'Hoe werkt de flesregistratie in Snellio?',
    answer:   'U maakt een fles aan met type koudemiddel, serienummer en begingewicht. Bij elke werkorder registreert u hoeveel er bijgevuld of afgetapt is uit welke fles. Snellio berekent automatisch het resterende gewicht en houdt de volledige vulhistorie per fles bij. Zo weet u altijd welke fles bij welke installatie is gebruikt.',
  },
  {
    question: 'Wat wordt er geregistreerd bij een lektest?',
    answer:   'Bij een lektest registreert u in Snellio: de gebruikte lekdetector met serienummer en ijkdatum, de testmethode (elektronisch of stikstof), de testdruk, de standtijd en het resultaat. Bij een lekkage legt u de oorzaak en de genomen maatregelen vast. Alle velden zijn conform de BRL100 en F-gas wetgeving.',
  },
  {
    question: 'Kan ik de F-gas gegevens exporteren voor de RVO?',
    answer:   'Ja. U kunt de F-gas gegevens per installatie en per periode exporteren. Dit is direct bruikbaar voor rapportage aan de RVO en voor externe audits. Er is geen handmatig samenstellen van rapportages nodig — Snellio doet dat automatisch.',
  },
  {
    question: 'Ondersteunt Snellio R290 en andere brandbare koudemiddelen?',
    answer:   'Ja. Snellio ondersteunt alle gangbare koudemiddelen, inclusief R290 (propaan), R600a, R32, R410A en andere HFK- en HFO-koudemiddelen. U stelt het type koudemiddel in per installatie. De GWP-waarde en CO₂-equivalent worden automatisch berekend voor de rapportage.',
  },
  {
    question: 'Is de F-gas registratie beschikbaar in alle pakketten?',
    answer:   'De uitgebreide F-gas flesregistratie is beschikbaar in het Pro- en Enterprise-pakket. Koeltechnische handelingen en BRL100-rapportage zijn beschikbaar vanaf het Starter-pakket. Bekijk de pakkettenpagina voor een volledig overzicht.',
  },
]

// ── Pagina ────────────────────────────────────────────────────────────────────

export default function FgassenRegistratiePage() {
  return (
    <>
      <JsonLd schema={[
        breadcrumbSchema([
          { name: 'Home',                 href: '/'                     },
          { name: 'F-gassen registratie', href: '/f-gassen-registratie' },
        ]),
        faqSchema(faqItems),
      ]} />

      {/* ── Hero ── */}
      <LandingHero
        badge="EU F-gas 2024/573 · BRL100 · Flesregistratie · Lektest"
        heading="F-gassen registratie software"
        headingAccent="voor koeltechnische installateurs."
        sub="Volledig digitaal koudemiddellogboek per installatie. Flesregistratie, lektestdocumentatie en BRL100-rapportage conform EU F-gas Verordening 2024/573 — altijd klaar voor inspectie."
        ctaPrimary={{ label: 'Start 30 dagen gratis →', href: '/registreren' }}
        ctaSecondary={{ label: 'Bekijk pakketten', href: '/pricing' }}
        trustLine="Geen installatie nodig • Direct starten • Nederlandse support"
        stats={[
          { value: '2024/<span style="color:var(--cyan)">573</span>', label: 'EU F-gas compliant'   },
          { value: 'BRL<span style="color:var(--cyan)">100</span>',   label: 'Automatisch rapport'  },
          { value: '<span style="color:var(--cyan)">0</span>',        label: 'Handmatig overtypen'  },
        ]}
      />

      {/* ── 1. Intro tekst ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container narrow>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
            Wat is F-gassen registratie software?
          </p>
          <h2
            className="font-outfit font-black text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}
          >
            Digitale F-gas registratie —{' '}
            <span className="text-[var(--cyan)]">gebouwd voor de koeltechniek</span>
          </h2>
          <div className="text-[var(--text2)] text-[.96rem] leading-[1.85] space-y-4">
            <p>
              Iedere installateur die werkt met gefluoreerde broeikasgassen is wettelijk verplicht een nauwkeurig logboek bij te houden van alle handelingen met F-gassen: bijvullen, aftappen, lektests en flesregistratie. De EU F-gas Verordening 2024/573 stelt strenge eisen aan deze registratie en bij een externe inspectie moet u deze documentatie direct kunnen overleggen.
            </p>
            <p>
              Veel installateurs lossen dit op met Excel, een papieren logboek of losse PDF-bestanden. Dat werkt zolang er niets mis gaat — maar bij een inspectie, een certificeringscontrole of een klantgeschil blijkt de documentatie onvolledig, niet te vinden of niet in het juiste format. F-gassen registratie software lost dit structureel op door de registratie direct te integreren in de werkbon en het klantdossier.
            </p>
            <p>
              Snellio is gebouwd door een BRL100-gecertificeerd installateur en bevat alle velden die de wetgeving vereist: type koudemiddel, hoeveelheid, flesregistratie, lekdetector met ijkdatum, testmethode, testdruk en resultaat. U vult de handelingen in op uw tablet tijdens de service — het BRL100-rapport wordt automatisch gegenereerd en is direct beschikbaar voor de klant en voor inspectie.
            </p>
            <p>
              Omdat Snellio de F-gas registratie koppelt aan het volledige{' '}
              <a href="/crm-voor-installateurs" className="text-[var(--cyan)] hover:underline font-medium">CRM voor installateurs</a>
              {' '}— klanten, locaties, installaties en werkbonnen — heeft u niet alleen een compliant logboek, maar ook een volledig inzicht in de koeltechnische historiek van elke installatie in uw bestand.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/registreren" size="md">Start 30 dagen gratis →</Button>
          </div>
        </Container>
      </section>

      {/* ── 2. Features ── */}
      <section className="py-24 px-[5%] bg-[var(--navy3)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Functies
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Alles voor uw{' '}
              <span className="text-[var(--cyan)]">F-gassen registratie software</span>
            </h2>
            <p className="text-[var(--text2)] text-base max-w-xl mx-auto mt-4 leading-relaxed">
              Van flesregistratie tot lektestdocumentatie — Snellio bevat alle functies die een koeltechnisch installateur nodig heeft om compliant te werken.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <article
                key={f.title}
                className="reveal group relative bg-[var(--navy2)] border border-[var(--border)] rounded-2xl p-6 hover:border-[rgba(10,187,214,.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,144,184,.12)]"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {'badge' in f && f.badge && (
                  <span className="absolute top-4 right-4 bg-[var(--green)] text-white text-[.6rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {f.badge}
                  </span>
                )}
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-outfit font-bold text-white text-[.95rem] mb-2">{f.title}</h3>
                <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{f.desc}</p>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,187,214,.05) 0%, transparent 70%)' }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Wetgeving & certificering ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
                Wetgeving & certificering
              </p>
              <h2
                className="font-outfit font-black text-white tracking-tight"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
              >
                Gebouwd op{' '}
                <span className="text-[var(--cyan)]">actuele regelgeving</span>
              </h2>
              <p className="text-[var(--text2)] text-base max-w-lg mx-auto mt-4 leading-relaxed">
                Snellio is ontworpen door een BRL100-gecertificeerd installateur. Alle registraties en rapporten voldoen aan de actuele certificatie-eisen en F-gas wetgeving.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { icon: '🇪🇺', title: 'EU F-gas Verordening 2024/573',  desc: 'Alle verplichte registraties conform de nieuwe F-gas verordening die in 2024 in werking is getreden.' },
                { icon: '📄', title: 'BRL100 Categorie 1',               desc: 'Koeltechnische handelingen en rapporten volledig conform BRL100-certificeringseisen.' },
                { icon: '🔬', title: 'R290 en brandbare koudemiddelen',  desc: 'Volledige ondersteuning voor R290 (propaan), R600a en andere brandbare koudemiddelen.' },
                { icon: '🌍', title: 'GWP en CO₂-equivalent',            desc: 'Automatische berekening van GWP-waarde en CO₂-equivalent bij elke koudemiddelhandeling.' },
                { icon: '🏗', title: 'EPBD gereed',                      desc: 'Energieprestatie-documentatie conform de EPBD-richtlijn voor installaties en renovaties.' },
                { icon: '📋', title: 'BRL200 / B1 ondersteuning',        desc: 'Ook geschikt voor BRL200 en B1-gecertificeerde bedrijven in de koeltechnische sector.' },
              ].map((w, i) => (
                <div
                  key={w.title}
                  className="reveal bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-5"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="text-2xl mb-3">{w.icon}</div>
                  <p className="font-outfit font-bold text-white text-sm mb-1.5">{w.title}</p>
                  <p className="text-[var(--muted2)] text-xs leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {CERTS.map(cert => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-2 bg-[var(--navy3)] border border-[var(--border)] text-[var(--text2)] text-xs font-mono px-4 py-2 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4. Problemen vs oplossingen ── */}
      <section className="py-24 px-[5%] bg-[var(--navy3)]">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="reveal">
            <p className="font-mono text-[.65rem] text-[var(--orange)] uppercase tracking-[.14em] mb-3">
              Zonder F-gas software
            </p>
            <h2
              className="font-outfit font-bold text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Herkenbaar?{' '}
              <span className="text-[var(--orange)]">Zo werkt het zonder systeem.</span>
            </h2>
            <ul className="flex flex-col gap-3.5 list-none">
              {problemen.map(p => (
                <li
                  key={p.title}
                  className="flex items-start gap-4 bg-[rgba(255,80,80,.05)] border border-[rgba(255,80,80,.12)] rounded-xl px-5 py-4"
                >
                  <span className="text-[#e05555] font-bold text-lg shrink-0 mt-px">✗</span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{p.title}</p>
                    <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <p className="font-mono text-[.65rem] text-[var(--green)] uppercase tracking-[.14em] mb-3">
              Met Snellio
            </p>
            <h2
              className="font-outfit font-bold text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Met Snellio is alles{' '}
              <span className="text-[var(--cyan)]">traceerbaar en compliant.</span>
            </h2>
            <ul className="flex flex-col gap-3.5 list-none">
              {oplossingen.map(o => (
                <li
                  key={o.title}
                  className="flex items-start gap-4 bg-[rgba(18,168,122,.06)] border border-[rgba(18,168,122,.18)] rounded-xl px-5 py-4"
                >
                  <span className="text-[var(--green)] font-bold text-lg shrink-0 mt-px">✓</span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{o.title}</p>
                    <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{o.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. Doelgroepen ── */}
      <section className="py-24 px-[5%] bg-[var(--navy2)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Voor wie
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              F-gas software voor{' '}
              <span className="text-[var(--cyan)]">koeltechnische professionals</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {doelgroepen.map((d, i) => (
              <article
                key={d.type}
                className="reveal flex gap-5 bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-7 hover:border-[rgba(10,187,214,.25)] transition-all duration-200"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-3xl shrink-0 mt-0.5">{d.icon}</div>
                <div>
                  <h3 className="font-outfit font-bold text-white text-[.95rem] mb-2">{d.type}</h3>
                  <p className="text-[var(--muted2)] text-[.84rem] leading-relaxed">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Voordelen ── */}
      <section className="py-24 px-[5%] bg-[var(--navy3)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Voordelen
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Wat levert digitale F-gas registratie{' '}
              <span className="text-[var(--cyan)]">concreet op?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {voordelen.map((v, i) => (
              <article
                key={v.title}
                className="reveal bg-[var(--navy2)] border border-[var(--border)] rounded-2xl p-7"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-outfit font-bold text-white text-lg mb-1">{v.title}</h3>
                <p className="font-mono text-[var(--cyan)] text-[.72rem] tracking-wide mb-5">{v.stat}</p>
                <ul className="flex flex-col gap-2.5 list-none">
                  {v.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[.82rem] text-[var(--text2)]">
                      <span className="text-[var(--green)] font-bold shrink-0 mt-px">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Use case ── */}
      <section className="py-24 px-[5%] bg-[var(--navy2)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
              Praktijkvoorbeeld
            </p>
            <h2
              className="font-outfit font-black text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}
            >
              Hoe Koelservice Noord van papieren logboeken{' '}
              <span className="text-[var(--cyan)]">naar volledig digitale F-gas compliance ging</span>
            </h2>

            <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center text-xl shrink-0">
                  ❄️
                </div>
                <div>
                  <p className="font-outfit font-bold text-white text-lg">
                    Koelservice Noord — koeltechnisch servicebedrijf
                  </p>
                  <p className="text-[var(--muted2)] text-sm">
                    Service en onderhoud van koelinstallaties in Noord-Nederland
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="font-mono text-[.62rem] text-[var(--orange)] uppercase tracking-wide mb-3">
                    Situatie voor Snellio
                  </p>
                  <p className="text-[var(--text2)] text-[.85rem] leading-relaxed">
                    Directeur Peter hield het F-gas logboek bij in een combinatie van Excel en papieren formulieren. Per installatie was er een eigen map met werkbonnen, lektestformulieren en flesregistraties. Bij een externe audit bleek dat voor drie installaties de lektestdocumentatie niet compleet was — de ijkdatum van de gebruikte detector was verlopen geweest tijdens de uitvoering en dat was nooit gesignaleerd. De tekortkoming kostte het bedrijf een hercontrole en een extra audit.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[.62rem] text-[var(--green)] uppercase tracking-wide mb-3">
                    Situatie met Snellio
                  </p>
                  <p className="text-[var(--text2)] text-[.85rem] leading-relaxed">
                    Na de overstap naar Snellio registreert Peter alle F-gas handelingen direct in de app tijdens de service. Snellio waarschuwt automatisch wanneer de ijkdatum van een lekdetector nadert. Het F-gas logboek per installatie is altijd up-to-date en direct exporteerbaar. Bij de volgende externe audit had Peter alle documentatie in minder dan vijf minuten klaar — zonder zoeken, zonder incomplete formulieren. De auditor bevestigde dat de registraties volledig voldeden aan EU F-gas Verordening 2024/573.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex flex-wrap gap-8">
                {[
                  { label: 'Tekortkomingen audit',   value: '0'            },
                  { label: 'Audit voorbereiding',    value: '5 minuten'    },
                  { label: 'Logboek administratie',  value: '−3 uur/week'  },
                ].map(s => (
                  <div key={s.label}>
                    <p className="font-outfit font-black text-[var(--cyan)] text-xl">{s.value}</p>
                    <p className="font-mono text-[var(--muted2)] text-[.62rem] uppercase tracking-wide">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/registreren" size="md">Start 30 dagen gratis →</Button>
              <Button href="/pricing" variant="ghost" size="md">Bekijk pakketten</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 8. SEO tekst ── */}
      <section className="py-20 px-[5%] bg-[var(--navy3)]">
        <Container narrow>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
            Meer over F-gassen registratie software
          </p>
          <h2
            className="font-outfit font-black text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Waarom digitale F-gas registratie{' '}
            <span className="text-[var(--cyan)]">geen optie meer is</span>
          </h2>
          <div className="text-[var(--text2)] text-[.96rem] leading-[1.9] space-y-5">
            <p>
              De verplichting om F-gas handelingen nauwkeurig te registreren bestaat al jaren, maar de EU F-gas Verordening 2024/573 heeft de eisen aangescherpt en de handhaving geïntensiveerd. Voor installateurs die werken met gefluoreerde koudemiddelen is een volledig en correct logboek geen formaliteit maar een wettelijke verplichting. F-gassen registratie software maakt het naleven van die verplichting structureel eenvoudiger en betrouwbaarder dan handmatige administratie ooit kan zijn.
            </p>
            <p>
              Het fundamentele probleem met Excel en papieren logboeken is niet dat ze verkeerd zijn, maar dat ze los staan van de werkbon en het klantdossier. Een monteur vult de werkbon in op locatie, maar registreert de F-gas gegevens later op kantoor — of vergeet het. Die ontkoppeling leidt tot ontbrekende gegevens, fouten en een logboek dat bij inspectie niet klopt met de feitelijke situatie. F-gas registratie software zoals Snellio elimineert die ontkoppeling door de registratie direct in de{' '}
              <a href="/werkbon-software" className="text-[var(--cyan)] hover:underline font-medium">digitale werkbon</a>
              {' '}te integreren.
            </p>
            <p>
              Voor een koeltechnisch bedrijf is flesregistratie een van de meest tijdrovende onderdelen van de F-gas administratie. Welke fles is gebruikt, hoeveel is er afgetapt of bijgevuld en hoeveel zit er nog in? Snellio houdt de flesbalans automatisch bij op basis van de ingevulde handelingen. U hoeft nooit meer handmatig te rekenen of na te tellen — het systeem doet dat voor u en waarschuwt wanneer een fles bijna leeg is of wanneer de ijkdatum van een lekdetector verloopt.
            </p>
            <p>
              Lektestregistratie is een ander kritiek onderdeel van de F-gas compliance. De wetgeving schrijft voor welke gegevens per lektest geregistreerd moeten worden: het type detector, het serienummer, de ijkdatum, de testmethode, de testdruk en het resultaat. Snellio bevat al deze velden als standaard — u hoeft niets aan te passen of te configureren. De gegevens worden automatisch opgeslagen bij het klantdossier en zijn direct exporteerbaar voor externe audits.
            </p>
            <p>
              In combinatie met de{' '}
              <a href="/planningssoftware-monteurs" className="text-[var(--cyan)] hover:underline font-medium">planningssoftware voor monteurs</a>
              {' '}en het volledige klantbeheer van Snellio heeft u niet alleen een compliant F-gas registratiesysteem, maar ook een volledig servicemanagementsysteem voor uw koeltechnisch bedrijf. Van het plannen van de serviceopdracht tot het versturen van de BRL100-rapportage en de factuur — alles in één systeem, zonder dubbele invoer en zonder risico op ontbrekende documentatie.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 9. FAQ ── */}
      <LandingFaq items={faqItems} heading="Veelgestelde vragen over F-gassen registratie software" />

      {/* ── 10. Interne links ── */}
      <LandingInternalLinks
        heading="Meer functies van Snellio"
        links={[
          { href: '/crm-voor-installateurs',     icon: '🏢', title: 'CRM voor installateurs',  desc: 'Klant- en installatiebeheer'          },
          { href: '/werkbon-software',            icon: '📋', title: 'Werkbon software',         desc: 'Digitale werkbonnen met handtekening' },
          { href: '/planningssoftware-monteurs',  icon: '📅', title: 'Planning monteurs',         desc: 'Werkorders inplannen per monteur'     },
          { href: '/pricing',                     icon: '💶', title: 'Pakketten & prijzen',       desc: 'Vanaf €9,95/mnd, 30 dagen gratis'    },
        ]}
      />

      <Cta />
    </>
  )
}
