import type { Metadata } from 'next'
import Image             from 'next/image'
import Link              from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { faqSchema, webPageSchema, PERSON_PATH } from '@/lib/schemas'
import { BTW, PLANS, SITE, TRIAL_DAGEN } from '@/lib/constants'
import { fmtEuro }       from '@/lib/pricing'
import JsonLd            from '@/components/seo/JsonLd'
import HomePricing       from '@/components/sections/HomePricing'
import { HOME_PAGE }     from './meta'

// Volgorde en afwerking volgens docs/seo-geo/11-homepage.md: probleem,
// product, bewijs, regels, mens, prijs, vragen, actie. Achtergronden strikt
// afwisselend (#f4f7fa / wit). Teksten van hero, pijnpunten, features,
// compliance-kaarten en FAQ zijn in taak 5 en 5b gecontroleerd; alleen de
// drie oplossingsregels bij de pijnpunten en de introzin bij de features
// zijn nieuw. Geen Person-schema hier: dat staat op /over/rudy-snel.

const TITLE       = 'Software voor installatiebedrijven'
const DESCRIPTION = `CRM, digitale werkbonnen, planning en facturatie voor installatiebedrijven in één systeem. Start Snellio ${TRIAL_DAGEN} dagen gratis, zonder betaling.`

export const metadata: Metadata = buildMetadata({
  title:       `${TITLE} | Snellio`,
  description: DESCRIPTION,
  path:        HOME_PAGE.path,
})

const SIGNUP_HREF = '/registreren'
const vanaf       = Math.min(...PLANS.map(p => p.price.month))

const pijnpunten = [
  { icon: '📋', title: 'Werkbon-chaos',       desc: 'Papieren bonnen die kwijtraken, Excel-bestanden die niemand bijhoudt.', oplossing: 'Klant tekent op het scherm, pdf direct in de mail' },
  { icon: '🧪', title: 'F-gassen-rompslomp',  desc: 'Met de hand mutaties bijhouden, BRL 100-audit als wachtende stress.',   oplossing: 'Elke handeling vanuit de werkbon in het logboek' },
  { icon: '📅', title: 'Planning-puzzel',     desc: 'Elke monteur in zijn eigen Google Calendar, klant belt vier keer.',     oplossing: 'Eén planning, elke monteur ziet z’n eigen dag' },
]

// href = interne link naar de bijbehorende landingspagina (belangrijkste
// interne-link-winst: de homepage geeft zo autoriteit door aan het
// SEO-cluster).
const features = [
  { icon: '🔧', title: 'Digitale werkbon',         desc: 'Klant tekent op telefoon/tablet, PDF in z\'n inbox.', href: '/werkbon-software',           linkLabel: 'Meer over werkbon-software' },
  { icon: '❄️', title: 'F-gassen & koudemiddelen', desc: 'Vullingen/aftappingen automatisch in de balans.',     href: '/f-gassen-registratie',       linkLabel: 'Meer over F-gassen registratie' },
  { icon: '📊', title: 'F-gassenbalans per jaar',  desc: 'In kilogram en CO₂-equivalent, zoals BRL 100 §3.3 vraagt.', href: '/brl-100-software',           linkLabel: 'Meer over BRL 100' },
  { icon: '📅', title: 'Planning + Google Calendar', desc: 'Dispatch-board, monteurs zien hun eigen werk.',     href: '/planningssoftware-monteurs', linkLabel: 'Meer over planningssoftware' },
  { icon: '💳', title: 'Facturatie + Mollie',      desc: 'Klant betaalt online, status update direct.',         href: '/crm-voor-installateurs',     linkLabel: 'Meer over het CRM' },
  { icon: '🔗', title: 'Boekhoud-koppeling',       desc: 'WeFact, Moneybird en Exact Online. Gratis bij elk pakket.',    href: '/features',                   linkLabel: 'Bekijk alle functies' },
]

const monteurBullets = [
  'Eigen geplande orders, geen ander',
  'Klant + installatie aanmaken op locatie als nodig',
  'Handelingen invoeren met meetwaardes',
  'Klant tekent direct op het scherm',
  'PDF gemaild voor jij weer in de auto zit',
]

// Teksten gecontroleerd in taak 5 en 5b (02-feature-factcheck.md, rij 18 en 19).
const compliance: { title: string; desc: string; href?: string; linkLabel?: string }[] = [
  {
    title:     'F-gassen-verordening (EU 2024/573)',
    desc:      'Logboek per installatie met de gegevens uit art. 7, te openen via de QR-code op de zelf geprinte kenplaat. Snellio berekent het CO₂-equivalent van de vulling en zet de lekcontrole in de forecast voor installaties vanaf 5 ton CO₂-equivalent (art. 5 lid 1), met de termijn uit art. 5 lid 6.',
    href:      '/f-gassen-registratie',
    linkLabel: 'Wat er in het logboek moet',
  },
  {
    title:     'BRL 100 en BRL 200',
    desc:      'Werkregistratie per installatie en per circuit, jaarlijkse F-gassenbalans in kilogram en CO₂-equivalent, en het BRL 200-nummer van je monteurs in de monteursinstellingen.',
    href:      '/brl-100-software',
    linkLabel: 'Lees hoe de audit werkt',
  },
  {
    title: 'Brandbaar koudemiddel (R290)',
    desc:  'Werk je aan propaan, dan zet Snellio bij de werkorder een veiligheidsdossier klaar: een TRA met de risico\'s en beheersmaatregelen, een werkvergunning waar die nodig is, en een LMRA die de monteur ter plaatse aftekent.',
  },
  {
    title: 'Data in NL',
    desc:  'Hosting in Europa (Supabase EU-region), AVG-conform, dagelijks back-up.',
  },
]

const integraties = ['Mollie', 'Moneybird', 'Exact Online', 'WeFact', 'Google Calendar']

const founderBadges = ['Snel Airco’s', 'STEK', 'BRL 100', 'Sinds 2017']

const faqs = [
  { question: 'Kan ik mijn data exporteren?',           answer: 'Ja, alles via CSV en PDF. Je data is van jou.' },
  { question: 'Hoe lang is de trial?',                  answer: 'Probeer 14 dagen gratis met alle functies, zonder creditcard of betaalgegevens. Tijdens de proefperiode kies je in Snellio het abonnement dat bij je bedrijf past, vanaf €10 per maand inclusief btw, en of je per maand of per jaar betaalt via iDEAL of automatische incasso. Niets loopt stilzwijgend door.' },
  { question: 'Wat als ik wil opzeggen?',               answer: 'Eén klik in je dashboard. Geen opzegtermijn na de eerste maand.' },
  { question: 'Hosten jullie in Nederland?',            answer: 'EU-region (Supabase Frankfurt). AVG-conform.' },
  { question: 'Kan een monteur ook offline werken?',    answer: 'Nee. Snellio werkt in de browser en heeft een internetverbinding nodig. Zonder verbinding kun je geen werkbon invullen.' },
]

// ── Tailwind utility-class shorthand voor primaire/secundaire knoppen
//    volgens het brief-style-systeem (geen variant van bestaande Button).
const btnPrimary   = 'inline-flex items-center justify-center font-semibold rounded-[10px] bg-[var(--accent)] text-white px-[22px] py-3 hover:bg-[#007a9c] transition-colors text-[.95rem]'
const btnSecondary = 'inline-flex items-center justify-center font-semibold rounded-[10px] bg-white border-[1.5px] border-[var(--accent)] text-[var(--accent)] px-[22px] py-3 hover:bg-[rgba(0,144,184,.06)] transition-colors text-[.95rem]'

// Sectieritme (11 §3): overal py-20, strip py-8, dezelfde eyebrow (mono,
// uppercase, accent) en H2 in dezelfde maat. Achtergronden afwisselend.
const sectionLabel = 'font-dm-mono text-[.72rem] uppercase tracking-[.08em] text-[var(--accent)] mb-3'
const h2           = 'font-bold tracking-tight text-[#0f2133]'
const h2Size       = { fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' } as const
const bgLicht      = 'bg-[#f4f7fa]'
const bgWit        = 'bg-white border-y border-[#e4ecf2]'
const productBeeld = 'overflow-hidden bg-white ring-1 ring-[#e4ecf2] shadow-[0_24px_60px_rgba(15,33,51,.18)]'

export default function HomePage() {
  return (
    <div className="bg-[#f4f7fa] text-[#0f2133] font-dm-sans">
      <JsonLd schema={[
        // Commerciële pagina: WebPage met dateModified, geen Article. De
        // SoftwareApplication en Organization staan al site-breed in de layout.
        webPageSchema({
          path:          HOME_PAGE.path,
          name:          TITLE,
          description:   DESCRIPTION,
          datePublished: HOME_PAGE.datePublished,
          dateModified:  HOME_PAGE.dateModified,
          aboutId:       `${SITE.url}/#software`,
        }),
        faqSchema(faqs),
      ]} />

      {/* ── 1. HERO ── */}
      <section id="hero" className={`relative pt-32 pb-20 px-[5%] ${bgLicht}`}>
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className={sectionLabel}>Software voor installatiebedrijven</p>
            <h1
              className="font-extrabold tracking-tight text-[#0f2133] leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
            >
              Minder administratie. Meer grip op je installatiebedrijf.
            </h1>
            <p className="text-[#0f2133] text-[1.1rem] leading-[1.55] max-w-xl mb-8 pl-4 border-l-[3px] border-[#0090b8]">
              CRM, digitale werkbonnen, planning en facturatie in één systeem. Voor
              installatiebedrijven die klanten, monteurs en installaties overzichtelijk
              willen beheren. Koeltechniek en airco? Dan zijn F-gassen en BRL 100 direct inbegrepen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={SIGNUP_HREF} className={btnPrimary}>
                Start {TRIAL_DAGEN} dagen gratis →
              </Link>
              <Link href="/pricing" className={btnSecondary}>
                Bekijk prijzen
              </Link>
            </div>
            <p className="text-[#5f7791] text-xs mt-5">
              Geen creditcard of incassomachtiging · Alle functies inbegrepen · Vanaf {fmtEuro(vanaf)} per maand {BTW.short}
            </p>
          </div>

          <div className="relative">
            <div className={`rounded-xl ${productBeeld}`}>
              <Image
                src="/dashboard-preview.png"
                alt="Snellio dashboard met klanten, installaties, openstaande werkorders, forecast keuringen en koudemiddel-flessen, software voor koeltechniek- en airco-bedrijven"
                width={2924}
                height={1672}
                className="w-full h-auto block"
                sizes="(min-width: 1024px) 600px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. KOPPELINGEN-STRIP ── */}
      <section id="koppelingen" className={`py-8 px-[5%] ${bgWit}`}>
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:justify-between">
          <p className="font-dm-mono text-[.72rem] uppercase tracking-[.08em] text-[var(--accent)]">Koppelt met</p>
          <ul className="flex flex-wrap justify-center gap-2 list-none">
            {integraties.map(name => (
              <li
                key={name}
                className="rounded-full border border-[#e4ecf2] bg-[#f9fbfd] px-3.5 py-1.5 text-sm font-semibold text-[#5f7791]"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. PIJN-ERKENNING ── */}
      <section id="herkenbaar" className={`py-20 px-[5%] ${bgLicht}`}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>Vertrouwd?</p>
            <h2 className={h2} style={h2Size}>
              Drie dingen die elke koeltechniek-werkplaats herkent
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 auto-rows-fr">
            {pijnpunten.map(p => (
              <div
                key={p.title}
                className="flex flex-col bg-white border border-[#e4ecf2] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-[0_2px_8px_rgba(0,144,184,.12)] transition-all"
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-[#0f2133] text-lg mb-2">{p.title}</h3>
                <p className="text-[#5f7791] text-sm leading-relaxed flex-1">{p.desc}</p>
                <p className="text-[var(--accent)] text-sm font-semibold leading-relaxed mt-4">{p.oplossing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WAT SNELLIO DOET (FEATURE-GRID) ── */}
      <section id="functies" className={`py-20 px-[5%] ${bgWit}`}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>Alles in één</p>
            <h2 className={h2} style={h2Size}>
              Wat Snellio voor je doet
            </h2>
            <p className="text-[#5f7791] text-base leading-relaxed mt-3">
              Zes onderdelen, één systeem, alles in elk pakket.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {features.map(f => (
              <Link
                key={f.title}
                href={f.href}
                className="group flex flex-col bg-[#f9fbfd] border border-[#e4ecf2] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-[0_2px_8px_rgba(0,144,184,.12)] transition-all"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[#0f2133] text-base mb-2">{f.title}</h3>
                <p className="text-[#5f7791] text-sm leading-relaxed">{f.desc}</p>
                <span className="text-[var(--accent)] text-sm font-semibold mt-auto pt-4 group-hover:underline">
                  {f.linkLabel} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MOBIEL-MONTEUR-BLOK ── */}
      <section id="monteur" className={`py-20 px-[5%] ${bgLicht}`}>
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className={sectionLabel}>Voor de monteur onderweg</p>
            <h2 className={`${h2} mb-6`} style={h2Size}>
              De monteur opent z&apos;n telefoon en ziet z&apos;n dag.
            </h2>
            <ul className="flex flex-col gap-3 list-none mb-8">
              {monteurBullets.map(b => (
                <li key={b} className="flex items-start gap-3 text-[#0f2133] text-[.95rem]">
                  <span className="w-5 h-5 rounded-full bg-[rgba(18,168,122,.15)] text-[var(--green)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/demo" className={btnSecondary}>
              Vraag een live demo aan
            </Link>
          </div>

          <div className="flex justify-center">
            <div className={`rounded-[2rem] ${productBeeld} w-full max-w-[260px] sm:max-w-[320px]`}>
              <Image
                src="/monteur-app.png"
                alt="Snellio monteur-app op telefoon, dashboard, werkorders, installaties, F-gas balans en planning binnen handbereik"
                width={660}
                height={1428}
                className="w-full h-auto block"
                sizes="(min-width: 640px) 320px, 260px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. REGELS VAN JOUW VAK ── */}
      <section id="regels" className={`py-20 px-[5%] ${bgWit}`}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>Gebouwd voor BRL 100 en Verordening (EU) 2024/573</p>
            <h2 className={h2} style={h2Size}>
              Gemaakt voor de regels van jouw vak.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 auto-rows-fr">
            {compliance.map(c => (
              <div
                key={c.title}
                className="flex flex-col bg-[#f9fbfd] border border-[#e4ecf2] rounded-xl p-6"
              >
                <h3 className="font-semibold text-[#0f2133] text-base mb-3">{c.title}</h3>
                <p className="text-[#5f7791] text-sm leading-relaxed">{c.desc}</p>
                {c.href && c.linkLabel && (
                  <Link href={c.href} className="text-[var(--accent)] text-sm font-semibold mt-auto pt-4 hover:underline">
                    {c.linkLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WIE DIT BOUWT ── */}
      <section id="rudy" className={`py-20 px-[5%] ${bgLicht}`}>
        <div className="mx-auto max-w-4xl grid md:grid-cols-[160px_1fr] gap-8 md:gap-10 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden shadow-[0_8px_24px_rgba(0,144,184,.25)] ring-4 ring-white">
              <Image
                src="/rudy-snel.png"
                alt="Rudy Snel, oprichter van Snellio en eigenaar van Snel Airco's"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                sizes="(min-width: 768px) 160px, 120px"
              />
            </div>
          </div>
          <div className="max-w-[640px]">
            <p className={sectionLabel}>Wie dit bouwt</p>
            <h2 className={`${h2} mb-4`} style={h2Size}>
              Hoi, ik ben Rudy.
            </h2>
            <p className="text-[#5f7791] text-[1rem] leading-[1.7] mb-3">
              Ik run Snel Airco&apos;s, een koeltechniekbedrijf dat zelf onder BRL 100 werkt. Sinds 2017 in het vak,
              STEK-gecertificeerd, monteurs op pad en een audit die altijd net iets eerder komt dan je denkt.
            </p>
            <p className="text-[#5f7791] text-[1rem] leading-[1.7] mb-5">
              Snellio is ontstaan omdat mijn eigen administratie tot de audit bleef liggen. Geen SaaS-bureau, geen
              consultant: een installateur die een tool wilde die werkt zoals z&apos;n eigen werkplaats werkt.
            </p>
            <ul className="flex flex-wrap gap-2 list-none mb-5">
              {founderBadges.map(badge => (
                <li key={badge} className="rounded-full border border-[#e4ecf2] bg-white px-3 py-1 font-dm-mono text-[.7rem] uppercase tracking-[.06em] text-[#5f7791]">
                  {badge}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-start gap-x-8 gap-y-3">
              <Link href={PERSON_PATH} className="text-[var(--accent)] font-semibold hover:underline">
                Meer over Rudy →
              </Link>
              <div>
                <a href="mailto:rudy@snellio.nl" className="text-[var(--accent)] font-semibold hover:underline">
                  rudy@snellio.nl
                </a>
                <p className="text-[#5f7791] text-xs mt-0.5">Je krijgt mij aan de lijn.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. PRIJZEN (compact, volledige tabel staat op /pricing) ── */}
      <section id="prijzen" className={`py-20 px-[5%] scroll-mt-20 ${bgWit}`}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <p className={sectionLabel}>Prijzen</p>
            <h2 className={h2} style={h2Size}>
              Eerlijke prijzen, geen verrassingen.
            </h2>
          </div>
          <HomePricing />
          <p className="text-center text-[#5f7791] text-sm mt-6">
            Alle functies in elk pakket. Je betaalt voor het aantal monteurs en installaties.
          </p>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section id="faq" className={`py-20 px-[5%] ${bgLicht}`}>
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <p className={sectionLabel}>Veelgestelde vragen</p>
            <h2 className={h2} style={h2Size}>
              Goed om te weten
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map(faq => (
              <details
                key={faq.question}
                className="bg-white border border-[#e4ecf2] rounded-xl px-6 py-4 group hover:border-[var(--accent)] transition-colors"
              >
                <summary className="font-semibold text-[#0f2133] text-[.95rem] cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-[var(--accent)] text-xl group-open:rotate-45 transition-transform leading-none">+</span>
                </summary>
                <p className="text-[#5f7791] text-sm leading-relaxed mt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. SLOT-CTA ── */}
      <section id="start" className={`py-20 px-[5%] ${bgWit}`}>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-extrabold tracking-tight text-[#0f2133] leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
          >
            Klaar om je administratie eindelijk simpel te maken?
          </h2>
          <p className="text-[#5f7791] text-base mb-8">
            {TRIAL_DAGEN} dagen gratis proberen, geen creditcard nodig. Kies je abonnement later.
          </p>
          <Link
            href={SIGNUP_HREF}
            className={`${btnPrimary} text-base px-8 py-4`}
          >
            Start gratis trial →
          </Link>
        </div>
      </section>
    </div>
  )
}
