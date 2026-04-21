import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import dynamic from 'next/dynamic'
import JsonLd   from '@/components/seo/JsonLd'
import Container from '@/components/ui/Container'
import Button    from '@/components/ui/Button'

// Split DemoForm JS out of the critical bundle — SSR still produces HTML immediately
const DemoForm = dynamic(() => import('@/components/forms/DemoForm'))
const Cta      = dynamic(() => import('@/components/sections/Cta'))

export const metadata: Metadata = buildMetadata({
  title:       'CRM voor installateurs | Snellio — Probeer 14 dagen gratis',
  description: 'CRM-software speciaal voor airco- en HVAC-installateurs. Werkbonnen, planning, F-gassen registratie en BRL100-rapportage in één systeem. Start vandaag nog gratis.',
  path:        '/crm-voor-installateurs',
})

const pijnpunten = [
  { icon: '😤', text: 'Werkbon op papier invullen, terugrijden, inscannen, en dan alsnog alles overtikken voor de factuur. Elke klus kost je dubbel werk.' },
  { icon: '📱', text: 'Planning via WhatsApp: berichten over het hoofd gezien, monteur rijdt naar het verkeerde adres, klant belt boos. Elke week opnieuw.' },
  { icon: '📂', text: 'Servicehistorie van een installatie opzoeken? Drie Excel-bestanden, twee e-mailthreads en een aantekening op je telefoon doorzoeken — terwijl de klant aan de lijn wacht.' },
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
  { nr: '1', title: 'Maak gratis een account aan',     desc: 'Geen creditcard. 5 minuten. Meteen aan de slag.' },
  { nr: '2', title: 'Voeg klanten en installaties toe', desc: 'Of vraag een demo aan — wij helpen je bij de start.' },
  { nr: '3', title: 'Werk slimmer vanaf dag één',       desc: 'Minder papier, minder fouten, meer tijd voor het werk.' },
]

const faqs = [
  {
    question: 'Is Snellio echt speciaal voor HVAC-installateurs?',
    answer: 'Ja. Snellio is gebouwd door een BRL100-gecertificeerd installateur. De software bevat standaard alle koeltechnische velden, F-gas registratie en BRL100-rapportage — niet als add-on, maar als kern van het systeem.',
  },
  {
    question: 'Hoe lang duurt de installatie?',
    answer: 'Er is geen installatie. Snellio werkt in de browser — ook op tablet en telefoon. Je bent binnen 5 minuten actief.',
  },
  {
    question: 'Kan ik ook een demo aanvragen?',
    answer: 'Ja. Vul het formulier op deze pagina in en we plannen een persoonlijke walkthrough van 20–30 minuten op maat voor jouw bedrijf.',
  },
  {
    question: 'Wat kost Snellio?',
    answer: 'Snellio start vanaf €10 per maand voor ZZP\'ers. Je probeert het altijd 14 dagen gratis — zonder creditcard.',
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

      {/* ── HERO — boven de fold, conversie first ── */}
      <section
        className="hero-section relative pt-24 pb-16 px-[5%] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,187,214,.08) 0%, transparent 70%) #0a1a28' }}
      >
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Rechts: demo formulier — móbiel eerst bovenaan */}
          <div
            id="demo-form"
            className="relative bg-[var(--navy3)] rounded-2xl p-8 shadow-lg order-first lg:order-last"
            style={{ border: '1px solid rgba(10,187,214,.25)' }}
          >
            {/* Subtiele glow bovenin het formulierblok */}
            <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)]" />

            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-2">
              Gratis demo aanvragen
            </p>
            <h2 className="font-outfit font-bold text-white text-xl mb-1">
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
              <span className="font-mono text-[.68rem] text-[var(--cyan)] tracking-[.08em] uppercase">
                Speciaal voor HVAC installateurs
              </span>
            </div>

            <h1
              className="font-outfit font-black text-white tracking-tight leading-[1.05] mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
            >
              CRM voor installateurs dat je{' '}
              <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                administratie halveert
              </span>
            </h1>

            <p className="text-[var(--text2)] text-[1rem] leading-[1.7] mb-6 max-w-md">
              Van werkbon tot factuur in één systeem. Speciaal voor HVAC en koeltechniek bedrijven.
            </p>

            {/* Trust bullets */}
            <ul className="flex flex-col gap-3 mb-8 list-none">
              {[
                'Gebouwd door een installateur',
                'Van werkbon tot factuur in één app',
                'Minder administratie, meer tijd',
                'BRL100 compliant – F-gas ready',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-[var(--text2)] text-sm">
                  <span className="w-5 h-5 rounded-full bg-[rgba(18,168,122,.15)] border border-[rgba(18,168,122,.3)] flex items-center justify-center text-[var(--green)] text-[.7rem] font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button href="#demo-form" size="lg">Plan mijn demo →</Button>
              <Button href="/registreren" variant="ghost" size="lg">Start 14 dagen gratis</Button>
            </div>

            <p className="text-[var(--muted)] text-xs mt-4">
              Geen creditcard nodig • Opzeggen wanneer je wilt • Nederlandse support
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
            <strong className="text-white">Snellio lost dit op.</strong> Alles in één systeem, gebouwd voor installateurs.
          </p>
        </Container>
      </section>

      {/* ── VOORDELEN ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Functies</p>
            <h2 className="font-outfit font-black text-white tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
              Alles wat je nodig hebt, <span className="text-[var(--cyan)]">niets wat je niet gebruikt</span>
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
                <h3 className="font-outfit font-bold text-white text-[.95rem] mb-2">{b.title}</h3>
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
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Hoe het werkt</p>
            <h2 className="font-outfit font-black text-white tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
              Aan de slag in <span className="text-[var(--cyan)]">3 stappen</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stappen.map((s, i) => (
              <div key={s.nr} className="reveal text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center font-outfit font-black text-white text-lg mx-auto mb-4">
                  {s.nr}
                </div>
                <h3 className="font-outfit font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA REPEAT ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)] text-center">
        <Container narrow>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Klaar om te starten?</p>
          <h2 className="font-outfit font-black text-white tracking-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Start vandaag nog.<br />
            <span className="text-[var(--cyan)]">14 dagen gratis, geen creditcard.</span>
          </h2>
          <p className="text-[var(--text2)] text-base mb-8">
            Binnen 5 minuten actief. Of vraag eerst een demo aan — we helpen je graag.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="#demo-form" size="lg">Plan mijn demo →</Button>
            <Button href="/registreren" variant="ghost" size="lg">Start 14 dagen gratis</Button>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-[5%] bg-[var(--navy3)]">
        <Container narrow>
          <h2 className="font-outfit font-bold text-white text-xl mb-6 text-center">Veelgestelde vragen</h2>
          <dl className="flex flex-col gap-3">
            {faqs.map(faq => (
              <div key={faq.question} className="bg-[var(--navy2)] border border-[var(--border)] rounded-xl px-6 py-5">
                <dt className="font-outfit font-semibold text-white text-[.95rem] mb-1.5">{faq.question}</dt>
                <dd className="text-[var(--muted2)] text-sm leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="md:hidden fixed bottom-16 inset-x-0 z-40 px-4 pb-2">
        <a
          href="#demo-form"
          className="block w-full bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] text-white font-bold py-4 rounded-xl text-center text-base shadow-[0_8px_24px_rgba(0,144,184,.5)]"
        >
          Plan mijn demo →
        </a>
      </div>

      <Cta />
    </>
  )
}
