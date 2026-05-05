import type { Metadata } from 'next'
import Link              from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import JsonLd            from '@/components/seo/JsonLd'
import HeroAnimation     from '@/components/sections/automotive/HeroAnimation'
import AutomotivePricing from '@/components/sections/automotive/AutomotivePricing'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Software voor werkplaatsen, autohandelaren & dealers | Snellio Automotive',
  description: 'Eén tool voor je werkplaats — werkbladen, voertuigen, klanten, planning, offertes en facturen. Geef Snellio het kenteken, de rest regelt zich. 14 dagen gratis.',
  path:        '/automotive',
})

const SIGNUP_HREF = '/registreren?vertical=automotive'

const btnPrimary   = 'inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] bg-[#0090b8] text-white px-[22px] py-3 hover:bg-[#007a9c] active:translate-y-px transition-colors text-[.95rem]'
const btnSecondary = 'inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] bg-white border-[1.5px] border-[#0090b8] text-[#0090b8] px-[22px] py-3 hover:bg-[#e6f6fa] active:translate-y-px transition-colors text-[.95rem]'

const sectionLabel = 'font-dm-mono text-[.72rem] uppercase tracking-[.10em] text-[#0090b8] mb-3'
const heading2     = 'font-extrabold tracking-[-.02em] text-[#0f2133] leading-[1.1] mb-3.5'
const sectionLead  = 'text-[18px] text-[#5f7791] leading-[1.55] max-w-[680px] mb-9'

const stats = [
  { num: '~4', unit: 'u',  lbl: 'Minder administratie per week' },
  { num: '1 → 15', unit: '', lbl: 'Medewerkers per werkplaats' },
  { num: 'RDW',    unit: '', lbl: 'Auto-data via kenteken' },
  { num: '€ 0,–',  unit: '', lbl: 'Tijdens je proefperiode' },
]

const stappen = [
  {
    nr: '01 · Tik in',
    title: 'Kenteken erin',
    desc: 'Snellio haalt merk, model, bouwjaar en APK-status op uit de RDW. Klant erbij of nieuw aanmaken.',
    border: '#0090b8',
    demo: <Kenteken plate="AB-90-CD" />,
  },
  {
    nr: '02 · Werkblad',
    title: 'Het werk erop',
    desc: 'Remblokken, koppakking, accu, banden seizoen — wat je deed, met uren en onderdelen. Foto erbij voor de klant.',
    border: '#0abbd6',
    demo: <span className="text-[13.5px] text-[#5f7791]">📋 WB-2025-031 · Kleine onderhoudsbeurt</span>,
  },
  {
    nr: '03 · Offerte / factuur',
    title: 'Eén klik naar PDF',
    desc: 'Werkblad wordt offerte of factuur, met jouw kop, jouw BTW, jouw nummering. Naar Moneybird als je wilt.',
    border: '#e07a30',
    demo: (
      <span className="text-[13.5px]">
        <span className="font-dm-mono text-[#0090b8]">FACT-262023</span>
        <span className="text-[#5f7791]"> · € 11.379,98</span>
      </span>
    ),
  },
  {
    nr: '04 · Betaald',
    title: 'Klant tikt op betalen',
    desc: 'Mollie-link in de mail. Status springt naar Betaald. Geen vervalherinneringen meer hoeven sturen.',
    border: '#12a87a',
    demo: (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#e3f6ee] text-[#12a87a] border border-[#9bd9c0]">
        ✓ Betaald
      </span>
    ),
  },
]

const features = [
  { icon: '📋', title: 'Werkbladen',           desc: 'Per voertuig, per klus. Uren, onderdelen, foto\'s. Wordt vanzelf je offerte of factuur.' },
  { icon: '🚘', title: 'Voertuigen & klanten',  desc: 'Eén kenteken aan één eigenaar. APK-deadlines op het dashboard, 30 dagen vooruit.' },
  { icon: '🧾', title: 'Facturen & offertes',   desc: 'Concept, verzonden, betaald. Herinneringen en aanmaningen waar dat nodig is.' },
  { icon: '📅', title: 'Planning',              desc: 'Wie doet wat wanneer. Sleep een werkblad in de week — klant krijgt automatisch bevestiging.' },
  { icon: '📦', title: 'Vrooam-grossiers',      desc: 'Bestel onderdelen rechtstreeks bij Vrooam-aangesloten grossiers, waaronder Koskamp.' },
  { icon: '📚', title: 'Kennisbank',            desc: 'Hoe-doe-je-dit per scenario. Geschreven door werkplaatsen, niet door consultants.' },
]

const faqs = [
  {
    question: 'Welke onderdelen-leveranciers zijn aangesloten?',
    answer:   'Snellio koppelt met Vrooam-aangesloten grossiers — waaronder Koskamp. Bestelling, prijzen en beschikbaarheid lopen direct vanuit het werkblad. Heb je een specifieke grossier? Mail ons even, dan kijken we mee.',
  },
  {
    question: 'Brengt de RDW-koppeling extra kosten met zich mee?',
    answer:   'Nee. Kenteken-lookup via RDW open data zit standaard in elk pakket. Geen aparte abonnementen, geen kosten per opvraging.',
  },
  {
    question: 'Werkt Snellio op tablet en telefoon?',
    answer:   'Ja. Snellio draait in de browser — werkbladen invullen, kenteken erbij, klant tekent op tablet. Geen aparte app installeren. Mobile-first ontworpen, dus prettig in de werkplaats én onderweg.',
  },
  {
    question: 'Hoe krijg ik mijn klanten en voertuigen erin?',
    answer:   'Via Excel/CSV importeer je klanten, kentekens en historische werkbladen. Tijdens je trial helpen we je gratis met de migratie — geen vanaf nul beginnen.',
  },
  {
    question: 'Wat is de opzegtermijn?',
    answer:   'Maandelijks opzegbaar. Bij jaarbetaling loopt het tot het einde van je betaalde periode. Geen creditcard nodig om te starten.',
  },
]

export default function AutomotivePage() {
  return (
    <div className="bg-white text-[#0f2133] font-dm-sans">
      <JsonLd schema={[
        breadcrumbSchema([
          { name: 'Home',       href: '/' },
          { name: 'Automotive', href: '/automotive' },
        ]),
        faqSchema(faqs),
        {
          '@context':           'https://schema.org',
          '@type':              'SoftwareApplication',
          name:                 'Snellio Automotive',
          applicationCategory:  'BusinessApplication',
          operatingSystem:      'Web, iOS, Android',
          description:          'Eén tool voor werkplaatsen, autohandelaren en dealers. Werkbladen, voertuigen, klanten, planning, offertes en facturen — inclusief kenteken-lookup via RDW.',
          offers:               { '@type': 'Offer', price: '10.00', priceCurrency: 'EUR' },
          publisher:            { '@id': `${SITE.url}/#organization` },
        },
      ]} />

      {/* ── HERO ── */}
      <section className="relative pt-16 md:pt-24 pb-14 px-[5%] overflow-hidden bg-white">
        {/* Cyan glow rechtsboven */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[20%] -right-[10%] w-[720px] h-[720px] z-0"
          style={{ background: 'radial-gradient(circle, rgba(10,187,214,0.18) 0%, rgba(10,187,214,0) 60%)' }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="font-dm-mono text-[12px] tracking-[.10em] uppercase text-[#0090b8] mb-4">
              Voor werkplaatsen, autohandelaren &amp; dealers
            </p>
            <h1
              className="font-extrabold tracking-[-.025em] leading-[1.04] mb-5 [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)' }}
            >
              Geef Snellio het{' '}
              <span className="text-[#0090b8]">kenteken</span>.
              <br className="hidden md:block" /> De rest regelt zich.
            </h1>
            <p className="text-[19px] leading-[1.55] text-[#5f7791] max-w-[540px] mb-7">
              Eén tool voor je werkplaats — werkbladen, voertuigen, klanten, planning, offertes en facturen.
              Inclusief de factuur. Zonder gedoe.
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              <Link href={SIGNUP_HREF} className={btnPrimary}>Probeer 14 dagen gratis →</Link>
              <Link href="/contact" className={btnSecondary}>Bekijk demo</Link>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-[#8ea2b8]">
              <span><span className="text-[#12a87a] font-bold">✓</span> Geen creditcard nodig</span>
              <span><span className="text-[#12a87a] font-bold">✓</span> Nederlandse support</span>
              <span><span className="text-[#12a87a] font-bold">✓</span> Mobile-first</span>
            </div>
          </div>
          <div>
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="border-y border-[rgba(15,33,51,.08)] bg-[#fafcfd] py-7 px-[5%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.lbl}>
              <div className="font-extrabold text-[32px] tracking-[-.01em] text-[#0f2133] leading-none">
                {s.num}{s.unit && <span className="text-[#0090b8]">{s.unit}</span>}
              </div>
              <div className="text-sm text-[#5f7791] mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOE HET WERKT ── */}
      <section id="hoe" className="py-22 md:py-[88px] px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <p className={sectionLabel}>Hoe het werkt</p>
          <h2 className={heading2} style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)' }}>
            Vier stappen, één kenteken.
          </h2>
          <p className={sectionLead}>
            Niet meer in vier systemen werken. Niet meer overschrijven. Niet meer &ldquo;ik stuur &rsquo;m later wel&rdquo;.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stappen.map(s => (
              <div
                key={s.nr}
                className="bg-white border border-[rgba(15,33,51,.08)] rounded-2xl p-[22px] shadow-[0_1px_3px_rgba(15,33,51,.06)]"
                style={{ borderLeft: `3px solid ${s.border}` }}
              >
                <p className="font-dm-mono text-[11px] tracking-[.10em] uppercase text-[#5f7791] mb-2.5">
                  {s.nr}
                </p>
                <h3 className="font-bold text-[18px] text-[#0f2133] mb-2">{s.title}</h3>
                <p className="text-[14.5px] text-[#5f7791] leading-[1.5]">{s.desc}</p>
                <div className="mt-3.5">{s.demo}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-22 md:py-[88px] px-[5%] bg-[#fafcfd] border-y border-[rgba(15,33,51,.08)]">
        <div className="max-w-[1200px] mx-auto">
          <p className={sectionLabel}>Features</p>
          <h2 className={heading2} style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)' }}>
            Alles wat een werkplaats nodig heeft. Niet meer.
          </h2>
          <p className={sectionLead}>
            Snellio is bewust geen alleskunner. Wel onmisbaar voor het stuk dat ondernemers het meeste tijd kost.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(f => (
              <article
                key={f.title}
                className="bg-white border border-[rgba(15,33,51,.08)] rounded-2xl p-[26px] shadow-[0_1px_3px_rgba(15,33,51,.06)]"
              >
                <div className="text-2xl mb-3.5">{f.icon}</div>
                <h3 className="font-bold text-[18px] text-[#0f2133] mb-2">{f.title}</h3>
                <p className="text-[14.5px] text-[#5f7791] leading-[1.55]">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIJZEN ── */}
      <section id="prijzen" className="py-22 md:py-[88px] px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <p className={sectionLabel}>Prijzen</p>
          <h2 className={heading2} style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)' }}>
            Eerlijk per maand. Geen koppelfee.
          </h2>
          <p className={sectionLead}>
            Eén prijs per werkplaats. Iedere medewerker doet mee. Maandelijks opzegbaar.
          </p>
          <AutomotivePricing />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-22 md:py-[88px] px-[5%] bg-[#fafcfd] border-y border-[rgba(15,33,51,.08)]">
        <div className="max-w-[820px] mx-auto">
          <p className={`${sectionLabel} text-center`}>FAQ</p>
          <h2 className={`${heading2} text-center`} style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.4rem)' }}>
            Veelgestelde vragen
          </h2>
          <dl className="flex flex-col gap-3 mt-9">
            {faqs.map(faq => (
              <div
                key={faq.question}
                className="bg-white border border-[rgba(15,33,51,.08)] rounded-xl px-6 py-5 shadow-[0_1px_3px_rgba(15,33,51,.06)]"
              >
                <dt className="font-semibold text-[#0f2133] text-[.95rem] mb-2">{faq.question}</dt>
                <dd className="text-[14.5px] text-[#5f7791] leading-[1.55]">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section
        className="py-24 px-[5%] text-center border-t border-[rgba(15,33,51,.08)]"
        style={{ background: 'radial-gradient(circle at 50% 100%, rgba(10,187,214,0.16), transparent 60%), #fff' }}
      >
        <div className="max-w-[820px] mx-auto">
          <h2
            className="font-extrabold tracking-[-.02em] text-[#0f2133] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}
          >
            Klaar om je administratie 4 uur per week te krimpen?
          </h2>
          <p className="text-[#5f7791] text-[18px] mb-7">
            14 dagen gratis. Geen creditcard, geen lock-in.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-5">
            <Link href={SIGNUP_HREF} className={btnPrimary} style={{ fontSize: '16px', padding: '14px 26px' }}>
              Probeer Snellio gratis →
            </Link>
            <Link href="/contact" className={btnSecondary} style={{ fontSize: '16px', padding: '14px 26px' }}>
              Vraag demo aan
            </Link>
          </div>
          <p className="text-[#8ea2b8] text-sm">
            Of bel direct:{' '}
            <Link href={`tel:${SITE.phone}`} className="text-[#0090b8] font-semibold hover:underline">
              {SITE.phone}
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

function Kenteken({ plate }: { plate: string }) {
  return (
    <span className="inline-flex items-stretch bg-[#ffd400] text-[#0f2133] font-dm-mono font-bold tracking-[.08em] rounded-md overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,.10)] leading-none">
      <span className="bg-[#003399] text-[#ffe600] flex flex-col items-center justify-center px-1 py-1 min-w-[22px] gap-px">
        <span className="text-[8px] leading-none">★</span>
        <span className="text-[8px] leading-none font-dm-sans font-extrabold">NL</span>
      </span>
      <span className="px-3 py-2 text-base">{plate}</span>
    </span>
  )
}
