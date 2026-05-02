import type { Metadata } from 'next'
import Image             from 'next/image'
import Link              from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import JsonLd            from '@/components/seo/JsonLd'
import { SITE }          from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Alternatief voor CRM installateurs | Snellio software',
  description: 'Zoek je een alternatief voor Climapulse of andere CRM software? Ontdek Snellio. Alles-in-één systeem voor installateurs. Start 14 dagen gratis.',
  path:        '/alternatief-voor-crm-installateurs',
})

const APP_REGISTREREN = 'https://app.snellio.nl/registreren'

const btnPrimary   = 'inline-flex items-center justify-center font-semibold rounded-[10px] bg-[var(--accent)] text-white px-[22px] py-3 hover:bg-[#007a9c] transition-colors text-[.95rem]'
const btnSecondary = 'inline-flex items-center justify-center font-semibold rounded-[10px] bg-white border-[1.5px] border-[var(--accent)] text-[var(--accent)] px-[22px] py-3 hover:bg-[rgba(0,144,184,.06)] transition-colors text-[.95rem]'
const sectionLabel = 'font-dm-mono text-[.72rem] uppercase tracking-[.08em] text-[#5f7791] mb-3'

const pijnpunten = [
  { icon: '🔀', title: 'CRM en planning los van elkaar', desc: 'Klantgegevens in tool A, planning in tool B, facturen in tool C. Drie schermen voor één klus.' },
  { icon: '📝', title: 'Dubbele invoer',                 desc: 'Klant aanmaken in CRM, daarna nog eens overtikken voor de werkbon en de factuur. Tijd weg.' },
  { icon: '👀', title: 'Geen overzicht in werkbonnen',   desc: 'Welke werkbon is afgetekend? Welke wacht op factuur? Niemand die het weet.' },
  { icon: '🧾', title: 'Facturatie apart geregeld',      desc: 'Werkbon klaar → handmatig overzetten naar Moneybird of WeFact. Foutgevoelig en traag.' },
  { icon: '⏱',  title: 'Tijdverlies',                    desc: 'Een uur per dag aan systemen schakelen en data overtikken. Dat is een vrije dag per week.' },
]

const allesInEenItems = [
  { icon: '👥', title: 'CRM',                title2: 'Klanten & locaties', desc: 'Klantgegevens, contactpersonen, locaties en installatiehistorie op één plek.' },
  { icon: '📋', title: 'Werkbonnen',         title2: 'Digitaal & ondertekend', desc: 'Klant tekent op tablet ter plaatse, PDF direct naar zijn inbox.' },
  { icon: '📅', title: 'Planning monteurs', title2: 'Met Google Calendar',     desc: 'Werkorders verdelen, monteurs zien hun eigen werk, sync met agenda.' },
  { icon: '💳', title: 'Facturatie',         title2: 'Mollie + boekhouding',   desc: 'Direct vanuit werkbon factureren, iDEAL betaling, koppeling Moneybird/WeFact.' },
  { icon: '❄️', title: 'F-gassen',           title2: 'BRL100 ready',           desc: 'Flesregistratie, koudemiddel-balans, jaar-rapportage met één klik.' },
]

const watMaaktAndersBullets = [
  { title: 'Speciaal voor installateurs',  desc: 'Geen generieke service-tool met aangeplakte koeltechniek-features. F-gassen, BRL100 en lekcontrole zit in de kern.' },
  { title: 'Nederlandse software',         desc: 'Gebouwd in Nederland, hosting in EU-region (Frankfurt), Nederlandse support.' },
  { title: 'Snelle implementatie',         desc: 'Account aanmaken duurt 5 minuten. Importeer klanten via CSV — meteen aan de slag.' },
  { title: 'Alles gekoppeld',              desc: 'Werkbon → factuur → boekhouding → betaling. Eén keer instellen, daarna automatisch.' },
  { title: 'Minder administratie',         desc: 'Werk dat eerst drie tools en handmatig overtikken kostte, doe je nu in één formulier.' },
]

const vergelijking = {
  others: [
    { label: 'CRM',         note: 'Apart abonnement'      },
    { label: 'Planning',    note: 'Apart abonnement'      },
    { label: 'Facturatie',  note: 'Apart abonnement'      },
    { label: 'Integraties', note: 'Vaak handmatig of duur extra' },
  ],
  snellio: [
    'Alles in één systeem',
    'Minder fouten — geen dubbele invoer',
    'Minder kosten — één abonnement',
    'Native koppelingen ingebouwd',
  ],
}

const voorWie = [
  {
    icon: '👤',
    title: 'ZZP installateurs',
    desc: 'Werk je alleen of met je beste maat? Starter-pakket vanaf €10 per maand. Geen overhead, alle basisfuncties.',
  },
  {
    icon: '👥',
    title: 'Kleine teams',
    desc: '2 tot 5 monteurs en groeiende? Pro-pakket — F-gassen, planning en facturatie inclusief.',
  },
  {
    icon: '📈',
    title: 'Groeiende bedrijven',
    desc: 'Meer monteurs, klantportaal nodig, prioriteit support? Enterprise — alles inbegrepen, schaalt mee.',
  },
]

const faqs = [
  { question: 'Kan ik mijn klanten importeren uit mijn huidige CRM?', answer: 'Ja, via CSV-import. Klantgegevens, locaties en historische werkorders. Onze support helpt je gratis met de migratie tijdens de trial.' },
  { question: 'Hoe lang duurt de overstap?',                          answer: 'Account aanmaken kost 5 minuten. Klanten importeren een avond. Daarna kun je direct werkbonnen versturen.' },
  { question: 'Wat als ik wil terug naar mijn oude systeem?',         answer: 'Geen probleem — alle data exporteer je via CSV en PDF. Je bent nooit gevangen in Snellio.' },
  { question: 'Werkt Snellio op tablet en telefoon?',                 answer: 'Ja, draait in de browser. Geen aparte app nodig. Mobile-first ontworpen voor monteurs onderweg.' },
]

export default function AlternatiefCrmInstallateursPage() {
  return (
    <div className="bg-[#f4f7fa] text-[#0f2133] font-dm-sans">
      <JsonLd schema={[
        breadcrumbSchema([
          { name: 'Home',       href: '/' },
          { name: 'Alternatief voor CRM installateurs', href: '/alternatief-voor-crm-installateurs' },
        ]),
        faqSchema(faqs),
      ]} />

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 px-[5%] bg-[#f4f7fa]">
        <div className="mx-auto max-w-3xl text-center">
          <p className={sectionLabel}>Alternatief voor je CRM</p>
          <h1
            className="font-extrabold tracking-tight text-[#0f2133] leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}
          >
            Alternatief voor CRM software voor installateurs
          </h1>
          <p className="text-[#5f7791] text-[1.05rem] leading-[1.6] max-w-2xl mx-auto mb-8">
            Werk je met losse systemen voor klanten, planning, werkbonnen en facturatie?
            Veel installateurs gebruiken tools als Climapulse, Climatools, Fieldbuddy of Simpro —
            allemaal goede systemen, maar het gevoel blijft hetzelfde:{' '}
            <strong className="text-[#0f2133]">meerdere schermen, dubbele invoer, geen totaaloverzicht</strong>.
            Snellio brengt het samen in één systeem.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={APP_REGISTREREN} className={btnPrimary}>Start 14 dagen gratis →</Link>
            <Link href="/contact" className={btnSecondary}>Bekijk demo</Link>
          </div>
          <p className="text-[#8fafc8] text-xs mt-5">
            Geen creditcard nodig · Geen verplichtingen · Snel starten
          </p>
        </div>
      </section>

      {/* ── SECTION 1 — Waarom overstappen ── */}
      <section className="py-20 px-[5%] bg-white border-y border-[#e4ecf2]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>Waarom overstappen?</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Waarom overstappen van je huidige CRM?
            </h2>
            <p className="text-[#5f7791] text-base mt-4 max-w-xl mx-auto">
              Vijf dingen die je herkent als je werkt met meerdere losse systemen.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pijnpunten.map(p => (
              <div
                key={p.title}
                className="bg-[#f9fbfd] border border-[#e4ecf2] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-[0_2px_8px_rgba(0,144,184,.12)] transition-all"
              >
                <div className="text-2xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-[#0f2133] text-base mb-2">{p.title}</h3>
                <p className="text-[#5f7791] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — Alles in één systeem ── */}
      <section className="py-20 px-[5%] bg-[#f4f7fa]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>Alles in één</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Alles in één systeem voor installateurs
            </h2>
            <p className="text-[#5f7791] text-base mt-4 max-w-xl mx-auto">
              Geen drie abonnementen, geen koppelingen die kapot gaan. Eén login, alles met elkaar verbonden.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allesInEenItems.map(item => (
              <div
                key={item.title}
                className="bg-white border border-[#e4ecf2] rounded-xl p-6 hover:border-[var(--accent)] transition-colors"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-[#0f2133] text-base">{item.title}</h3>
                <p className="font-dm-mono text-[.7rem] text-[var(--accent)] uppercase tracking-wide mb-3">{item.title2}</p>
                <p className="text-[#5f7791] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={APP_REGISTREREN} className={btnPrimary}>Start 14 dagen gratis →</Link>
          </div>
        </div>
      </section>

      {/* ── VISUAL BLOCK — Twee screenshots ── */}
      <section className="py-20 px-[5%] bg-white border-y border-[#e4ecf2]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>Hoe het eruitziet</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Klanten, werkbonnen, facturen en planning op één scherm
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <figure>
              <div className="rounded-xl overflow-hidden bg-[#f9fbfd] border border-[#e4ecf2] shadow-[0_4px_16px_rgba(0,144,184,.08)]">
                <Image
                  src="/dashboard-preview.png"
                  alt="Snellio dashboard overzicht installateurs"
                  width={2924}
                  height={1672}
                  className="w-full h-auto block"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              </div>
              <figcaption className="text-center text-[#5f7791] text-sm mt-4">
                Overzicht van klanten, werkbonnen en facturen
              </figcaption>
            </figure>

            <figure>
              <div className="rounded-xl overflow-hidden bg-[#f9fbfd] border border-[#e4ecf2] shadow-[0_4px_16px_rgba(0,144,184,.08)]">
                <Image
                  src="/planning-preview.png"
                  alt="Snellio planning module monteurs"
                  width={1120}
                  height={550}
                  className="w-full h-auto block"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              </div>
              <figcaption className="text-center text-[#5f7791] text-sm mt-4">
                Planning van monteurs in één duidelijk systeem
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — Wat maakt Snellio anders ── */}
      <section className="py-20 px-[5%] bg-[#f4f7fa]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>De verschillen</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Wat maakt Snellio anders?
            </h2>
          </div>
          <ul className="flex flex-col gap-4 list-none">
            {watMaaktAndersBullets.map(b => (
              <li key={b.title} className="flex gap-4 bg-white border border-[#e4ecf2] rounded-xl p-5">
                <span className="w-6 h-6 rounded-full bg-[rgba(18,168,122,.15)] text-[var(--green)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <h3 className="font-semibold text-[#0f2133] text-base mb-1">{b.title}</h3>
                  <p className="text-[#5f7791] text-sm leading-relaxed">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SECTION 4 — Vergelijking ── */}
      <section className="py-20 px-[5%] bg-white border-y border-[#e4ecf2]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>De vergelijking</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Vergelijking met andere software
            </h2>
            <p className="text-[#5f7791] text-base mt-4 max-w-xl mx-auto">
              Wat krijg je met losse tools versus alles in één systeem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Andere tools */}
            <div className="bg-[#f9fbfd] border border-[#e4ecf2] rounded-xl p-7">
              <p className="font-dm-mono text-[.65rem] uppercase tracking-wide text-[#8fafc8] mb-2">Losse tools</p>
              <h3 className="font-bold text-[#0f2133] text-xl mb-5">Andere software</h3>
              <ul className="flex flex-col gap-3 list-none">
                {vergelijking.others.map(o => (
                  <li key={o.label} className="flex items-start gap-3 text-sm">
                    <span className="text-[#8fafc8] font-bold shrink-0 mt-0.5">○</span>
                    <div>
                      <span className="text-[#0f2133] font-medium">{o.label}</span>
                      <span className="text-[#8fafc8] ml-2">— {o.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Snellio */}
            <div className="bg-white border-2 border-[var(--accent)] rounded-xl p-7 shadow-[0_4px_16px_rgba(0,144,184,.12)]">
              <p className="font-dm-mono text-[.65rem] uppercase tracking-wide text-[var(--accent)] mb-2">Aanbevolen</p>
              <h3 className="font-bold text-[#0f2133] text-xl mb-5">Snellio</h3>
              <ul className="flex flex-col gap-3 list-none">
                {vergelijking.snellio.map(s => (
                  <li key={s} className="flex items-start gap-3 text-sm">
                    <span className="text-[var(--green)] font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-[#0f2133] font-medium">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href={APP_REGISTREREN} className={btnPrimary}>Probeer Snellio 14 dagen gratis →</Link>
            <p className="text-[#8fafc8] text-xs mt-3">Geen creditcard. Geen verplichtingen. Snel starten.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — Voor wie ── */}
      <section className="py-20 px-[5%] bg-[#f4f7fa]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className={sectionLabel}>De doelgroep</p>
            <h2 className="font-bold tracking-tight text-[#0f2133]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
              Voor wie is Snellio?
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {voorWie.map(v => (
              <div key={v.title} className="bg-white border border-[#e4ecf2] rounded-xl p-6 hover:border-[var(--accent)] transition-colors">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-semibold text-[#0f2133] text-base mb-2">{v.title}</h3>
                <p className="text-[#5f7791] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — Werk slimmer ── */}
      <section className="py-20 px-[5%] bg-white border-y border-[#e4ecf2]">
        <div className="mx-auto max-w-3xl text-center">
          <p className={sectionLabel}>Het resultaat</p>
          <h2 className="font-bold tracking-tight text-[#0f2133] mb-6" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }}>
            Werk slimmer, niet harder
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-left mt-8">
            <div className="bg-[#f9fbfd] border border-[#e4ecf2] rounded-xl p-5">
              <h3 className="font-semibold text-[#0f2133] text-base mb-2">⏱ Tijd besparen</h3>
              <p className="text-[#5f7791] text-sm leading-relaxed">Minder schakelen tussen systemen, minder dubbele invoer.</p>
            </div>
            <div className="bg-[#f9fbfd] border border-[#e4ecf2] rounded-xl p-5">
              <h3 className="font-semibold text-[#0f2133] text-base mb-2">🎯 Minder fouten</h3>
              <p className="text-[#5f7791] text-sm leading-relaxed">Klantgegevens één keer invoeren, automatisch overal beschikbaar.</p>
            </div>
            <div className="bg-[#f9fbfd] border border-[#e4ecf2] rounded-xl p-5">
              <h3 className="font-semibold text-[#0f2133] text-base mb-2">📊 Meer overzicht</h3>
              <p className="text-[#5f7791] text-sm leading-relaxed">Alle werkbonnen, facturen en monteurs op één dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
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
                <p className="text-[#5f7791] text-sm leading-relaxed mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7 — Final CTA ── */}
      <section className="py-24 px-[5%] bg-white border-t border-[#e4ecf2]">
        <div className="mx-auto max-w-2xl text-center">
          <p className={sectionLabel}>Klaar om over te stappen?</p>
          <h2
            className="font-extrabold tracking-tight text-[#0f2133] leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
          >
            Start vandaag nog
          </h2>
          <p className="text-[#5f7791] text-base mb-8 max-w-md mx-auto">
            14 dagen gratis. Geen creditcard. Annuleren wanneer je wilt. Migratie van je oude systeem is inbegrepen.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <Link href={APP_REGISTREREN} className={`${btnPrimary} text-base px-8 py-4`}>
              Start 14 dagen gratis →
            </Link>
            <Link href="/contact" className={`${btnSecondary} text-base px-8 py-4`}>
              Bekijk demo
            </Link>
          </div>
          <p className="text-[#5f7791] text-sm">
            Liever even bellen?{' '}
            <Link href={`tel:${SITE.phone}`} className="text-[var(--accent)] font-semibold hover:underline">
              {SITE.phone}
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
