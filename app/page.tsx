import type { Metadata } from 'next'
import Image             from 'next/image'
import Link              from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { faqSchema }     from '@/lib/schemas'
import JsonLd            from '@/components/seo/JsonLd'
import HomePricing       from '@/components/sections/HomePricing'

export const metadata: Metadata = buildMetadata({
  title:       'Software voor koeltechniek & airco | Snellio',
  description: 'Snellio is de Nederlandse software voor koeltechniek- en airco-bedrijven. Werkbon, klant-handtekening, F-gassen-registratie, planning en facturatie, alles vanuit één app. 14 dagen gratis proberen.',
  path:        '/',
})

const SIGNUP_HREF = '/registreren'

const pijnpunten = [
  { icon: '📋', title: 'Werkbon-chaos',       desc: 'Papieren bonnen die kwijtraken, Excel-bestanden die niemand bijhoudt.' },
  { icon: '🧪', title: 'F-gassen-rompslomp',  desc: 'Met de hand mutaties bijhouden, BRL100-audit als wachtende stress.' },
  { icon: '📅', title: 'Planning-puzzel',     desc: 'Elke monteur in zijn eigen Google Calendar, klant belt vier keer.' },
]

const features = [
  { icon: '🔧', title: 'Digitale werkbon',         desc: 'Klant tekent op telefoon/tablet, PDF in z\'n inbox.' },
  { icon: '❄️', title: 'F-gassen & koudemiddelen', desc: 'Vullingen/aftappingen automatisch in de balans.' },
  { icon: '📊', title: 'BRL100 jaar-rapport',      desc: 'Eén klik. Klaar voor de auditor.' },
  { icon: '📅', title: 'Planning + Google Calendar', desc: 'Dispatch-board, monteurs zien hun eigen werk.' },
  { icon: '💳', title: 'Facturatie + Mollie',      desc: 'Klant betaalt online, status update direct.' },
  { icon: '🔗', title: 'Boekhoud-koppeling',       desc: 'Moneybird, SnelStart, Exact. Eén keer instellen.' },
]

const monteurBullets = [
  'Eigen geplande orders, geen ander',
  'Klant + installatie aanmaken op locatie als nodig',
  'Handelingen invoeren met meetwaardes',
  'Klant tekent direct op het scherm',
  'PDF gemaild voor jij weer in de auto zit',
]

const compliance = [
  {
    title: 'F-gassen-verordening (EU 517/2014)',
    desc:  'Alle vereiste registratie ingebouwd, lekcontrole-cycli automatisch berekend op basis van CO₂-equivalent.',
  },
  {
    title: 'BRL100 / BRL200',
    desc:  'STEK-nummer-veld, monteur-certificering, jaar-rapportage met één klik.',
  },
  {
    title: 'Data in NL',
    desc:  'Hosting in Europa (Supabase EU-region), AVG-conform, dagelijks back-up.',
  },
]

const integraties = ['Mollie', 'Moneybird', 'SnelStart', 'Exact', 'Google Calendar', 'WeFact']

const faqs = [
  { question: 'Kan ik mijn data exporteren?',           answer: 'Ja, alles via CSV en PDF. Je data is van jou.' },
  { question: 'Hoe lang is de trial?',                  answer: '14 dagen gratis met alle features. Geen creditcard nodig vooraf.' },
  { question: 'Wat als ik wil opzeggen?',               answer: 'Eén klik in je dashboard. Geen opzegtermijn na de eerste maand.' },
  { question: 'Hosten jullie in Nederland?',            answer: 'EU-region (Supabase Frankfurt). AVG-conform.' },
  { question: 'Kan een monteur ook offline werken?',    answer: 'Beperkt: werkbon kan worden ingevuld zonder verbinding, sync zodra hij online komt.' },
]

// ── Tailwind utility-class shorthand voor primaire/secundaire knoppen
//    volgens het brief-style-systeem (geen variant van bestaande Button).
const btnPrimary   = 'inline-flex items-center justify-center font-semibold rounded-[10px] bg-[var(--accent)] text-white px-[22px] py-3 hover:bg-[#007a9c] transition-colors text-[.95rem]'
const btnSecondary = 'inline-flex items-center justify-center font-semibold rounded-[10px] bg-white border-[1.5px] border-[var(--accent)] text-[var(--accent)] px-[22px] py-3 hover:bg-[rgba(0,144,184,.06)] transition-colors text-[.95rem]'

const sectionLabel = 'font-dm-mono text-[.72rem] uppercase tracking-[.08em] text-[#5f7791] mb-3'

export default function HomePage() {
  return (
    <div className="bg-[#f4f7fa] text-[#0f2133] font-dm-sans">
      <JsonLd schema={[
        faqSchema(faqs),
      ]} />

      {/* ── 1. HERO ── */}
      <section className="relative pt-32 pb-20 px-[5%] bg-[#f4f7fa]">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className={sectionLabel}>All-in-one voor koeltechniek &amp; airco</p>
            <h1
              className="font-extrabold tracking-tight text-[#0f2133] leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
            >
              Eindelijk één plek voor je werkbonnen, planning en F-gassen.
            </h1>
            <p className="text-[#5f7791] text-[1.05rem] leading-[1.6] max-w-xl mb-8">
              Snellio is de Nederlandse software voor koeltechniek- en airco-bedrijven.
              Werkbon, klant-handtekening, F-gassen-registratie en factuur, allemaal vanuit één app.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={SIGNUP_HREF} className={btnPrimary}>
                Start gratis 14-dagen trial →
              </Link>
              <Link href="#pakketten" className={btnSecondary}>
                Bekijk pakketten
              </Link>
            </div>
            <p className="text-[#8fafc8] text-xs mt-5">
              Geen creditcard nodig · Maandelijks opzegbaar · Nederlandse support
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden bg-white border border-[#e4ecf2] shadow-[0_8px_32px_rgba(0,144,184,.08)]">
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

      {/* ── 1.5 WIE BOUWT DIT (founder direct na hero, 2/3 visitors leaves <30s) ── */}
      <section className="py-16 px-[5%] bg-white border-t border-[#e4ecf2]">
        <div className="mx-auto max-w-4xl grid md:grid-cols-[200px_1fr] gap-8 md:gap-10 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_8px_24px_rgba(0,144,184,.25)] ring-4 ring-white">
              <Image
                src="/rudy-snel.png"
                alt="Rudy Snel, eigenaar Snel Airco's en bouwer van Snellio"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                sizes="200px"
              />
            </div>
          </div>
          <div>
            <p className={sectionLabel}>Niet door een SaaS-bureau bedacht</p>
            <h2 className="font-bold tracking-tight text-[#0f2133] mb-4" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>
              Hoi, ik ben Rudy.
            </h2>
            <p className="text-[#5f7791] text-[1rem] leading-[1.7] mb-3">
              Ik run <strong className="text-[#0f2133]">Snel Airco&apos;s</strong>, een koeltechniek-bedrijf in Nederland.
              STEK-gecertificeerd, F-gassen voor de kost, monteurs op pad, klanten die bellen, papieren werkbonnen die
              kwijtraken en een audit die altijd net iets eerder is dan je denkt.
            </p>
            <p className="text-[#5f7791] text-[1rem] leading-[1.7] mb-3">
              Ik heb Snellio gebouwd omdat ik er zelf gek van werd. Geen dure consultant, geen SaaS-bureau dat denkt te
              weten hoe lekcontrole-cycli werken, gewoon een installateur die eindelijk z&apos;n eigen tool wilde die
              werkt zoals z&apos;n eigen werkplaats werkt.
            </p>
            <p className="text-[#5f7791] text-[1rem] leading-[1.7]">
              Vragen, wensen of een feature die mist?{' '}
              <a href="mailto:rudy@snellio.nl" className="text-[var(--accent)] font-semibold hover:underline">
                rudy@snellio.nl
              </a>
              {' '}, je krijgt mij aan de lijn.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. PIJN-ERKENNING ── */}
      <section className="py-20 px-[5%] bg-white border-y border-[#e4ecf2]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>Vertrouwd?</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Drie dingen die elke koeltechniek-werkplaats herkent
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {pijnpunten.map(p => (
              <div
                key={p.title}
                className="bg-[#f9fbfd] border border-[#e4ecf2] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-[0_2px_8px_rgba(0,144,184,.12)] transition-all"
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-[#0f2133] text-lg mb-2">{p.title}</h3>
                <p className="text-[#5f7791] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WAT SNELLIO DOET (FEATURE-GRID) ── */}
      <section className="py-20 px-[5%] bg-[#f4f7fa]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>Alles in één</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Wat Snellio voor je doet
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => (
              <div
                key={f.title}
                className="bg-white border border-[#e4ecf2] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-[0_2px_8px_rgba(0,144,184,.12)] transition-all"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[#0f2133] text-base mb-2">{f.title}</h3>
                <p className="text-[#5f7791] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MOBIEL-MONTEUR-BLOK ── */}
      <section className="py-20 px-[5%] bg-white border-y border-[#e4ecf2]">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className={sectionLabel}>Voor de monteur onderweg</p>
            <h2 className="font-bold tracking-tight text-[#0f2133] mb-6" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
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
            <div className="rounded-[2rem] overflow-hidden shadow-[0_24px_60px_rgba(15,33,51,.18)] ring-1 ring-[#e4ecf2] max-w-[320px] w-full">
              <Image
                src="/monteur-app.png"
                alt="Snellio monteur-app op telefoon, dashboard, werkorders, installaties, F-gas balans en planning binnen handbereik"
                width={660}
                height={1428}
                className="w-full h-auto block"
                sizes="(min-width: 1024px) 320px, 80vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. COMPLIANCE / VERTROUWEN ── */}
      <section className="py-20 px-[5%] bg-[#f4f7fa]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>BRL &amp; EU-conform</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Gemaakt voor de regels van jouw vak.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {compliance.map(c => (
              <div
                key={c.title}
                className="bg-white border border-[#e4ecf2] rounded-xl p-6"
              >
                <h3 className="font-semibold text-[#0f2133] text-base mb-3">{c.title}</h3>
                <p className="text-[#5f7791] text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. INTEGRATIES ── */}
      <section className="py-16 px-[5%] bg-white border-y border-[#e4ecf2]">
        <div className="mx-auto max-w-5xl text-center">
          <p className={sectionLabel}>Verbindt met wat je al gebruikt</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-6">
            {integraties.map(name => (
              <span
                key={name}
                className="font-semibold text-[#5f7791] text-base tracking-wide hover:text-[var(--accent)] transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PAKKETTEN ── */}
      <section id="pakketten" className="py-20 px-[5%] bg-[#f4f7fa] scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <p className={sectionLabel}>Kies je pakket</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Eerlijke prijzen, geen verrassingen.
            </h2>
          </div>
          <HomePricing />
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section className="py-20 px-[5%] bg-[#f4f7fa]">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <p className={sectionLabel}>Veelgestelde vragen</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
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

      {/* ── 10. FINAL CTA ── */}
      <section className="py-24 px-[5%] bg-white border-t border-[#e4ecf2]">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-extrabold tracking-tight text-[#0f2133] leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
          >
            Klaar om je administratie eindelijk simpel te maken?
          </h2>
          <p className="text-[#5f7791] text-base mb-8">
            14 dagen gratis. Geen creditcard. Annuleren wanneer je wilt.
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
