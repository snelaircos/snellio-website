import type { Metadata } from 'next'
import Link              from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import JsonLd            from '@/components/seo/JsonLd'
import Container         from '@/components/ui/Container'
import Button            from '@/components/ui/Button'
import Cta               from '@/components/sections/Cta'
import Pricing           from '@/components/sections/Pricing'
import { SITE, AUTOMOTIVE_PLANS } from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Software voor autogarages | Snellio Automotive',
  description: 'Werkplaats-software voor autogarages, APK-stations en onderhoudsbedrijven. Kenteken-lookup via RDW, onderdelen op voertuig, klant-akkoord en facturatie in één systeem. 14 dagen gratis proberen.',
  path:        '/automotive',
})

const SIGNUP_HREF = '/registreren?vertical=automotive'

const pijnpunten = [
  {
    icon: '🔍',
    title: 'Onderdelen zoeken in 5 verschillende systemen',
    desc: 'Eén leverancier-portaal voor remblokken, een ander voor filters, een derde voor banden. Tabbladen vol, prijzen vergelijken, fout bestellen. Een uur kwijt voor één onderhoudsbeurt.',
  },
  {
    icon: '⌨️',
    title: 'Kenteken en voertuiginfo handmatig overtikken',
    desc: 'Klant noemt kenteken, jij zoekt merk, model en bouwjaar handmatig op. Tikfout in het bouwjaar = verkeerde onderdelen. En dan moet alles ook nog naar de werkorder.',
  },
  {
    icon: '📒',
    title: 'Werkorder klaar? Factuur opnieuw in de boekhouding tikken',
    desc: "Werkbon afgetekend, klant tevreden, en nu? Alle uren en onderdelen overtikken in Moneybird of WeFact, factuur versturen, betaling opvolgen. Dubbel werk, dagelijks.",
  },
]

const stappen = [
  {
    nr: '1',
    title: 'Kenteken invoeren',
    desc: 'Klant noemt kenteken. RDW levert direct merk, model, bouwjaar en motorcode — geen tikfouten meer.',
  },
  {
    nr: '2',
    title: 'Onderdelen zoeken op voertuig',
    desc: 'Selecteer remblokken, filters of olie. De leverancier laat alleen onderdelen zien die op deze auto passen.',
  },
  {
    nr: '3',
    title: 'Werkorder naar klant',
    desc: 'Stuur de werkorder ter goedkeuring. Klant tekent digitaal of geeft akkoord per mail. Pas dan bestel je.',
  },
  {
    nr: '4',
    title: 'Werkorder → factuur',
    desc: 'Werk klaar? Eén klik en de factuur staat in Moneybird of WeFact, inclusief onderdelen en arbeidsuren.',
  },
]

const features = [
  { icon: '🚗', title: 'Kenteken-lookup via RDW',     desc: 'Voertuiggegevens automatisch ingevuld bij elk kenteken — merk, model, bouwjaar, motorcode.' },
  { icon: '🔧', title: 'Onderdelen op voertuig',       desc: 'Koppeling met leverancier laat alleen passende onderdelen zien. Geen verkeerde bestellingen meer.' },
  { icon: '✍️', title: 'Klant-akkoord per werkorder',   desc: 'Werkorder ter goedkeuring naar de klant via mail of digitale handtekening. Pas bestellen na akkoord.' },
  { icon: '📦', title: 'Eén-klik bestelling',          desc: 'Goedgekeurde onderdelen worden automatisch doorgepushed naar je leverancier-systeem.' },
  { icon: '🧾', title: 'Werkorder → factuur',          desc: 'Werkbon afsluiten en de factuur is klaar — onderdelen en arbeidsuren staan er al in.' },
  { icon: '📊', title: 'Boekhoudkoppeling',            desc: 'Concept-factuur direct in Moneybird, WeFact, Exact of SnelStart. Provider regelt verzending en iDEAL.' },
  { icon: '📅', title: 'Planning & dispatch',          desc: 'Monteurs inplannen op werkorders. Mobiele monteur-app voor onderweg met alle voertuiginfo.' },
  { icon: '👥', title: 'Multi-monteur',                desc: 'Werkorders verdelen over je team, voortgang volgen, signeren ter plaatse.' },
]

const integraties = [
  { name: 'RDW',             desc: 'Voertuig­gegevens'   },
  { name: 'Moneybird',       desc: 'Boekhouding'         },
  { name: 'WeFact',          desc: 'Boekhouding'         },
  { name: 'Mollie',          desc: 'iDEAL betalingen'    },
  { name: 'Resend',          desc: 'Mail verzending'     },
  { name: 'Google Calendar', desc: 'Planning sync'       },
]

const faqs = [
  {
    question: 'Welke onderdelen-leveranciers worden ondersteund?',
    answer: 'Bij start ondersteunen we de grootste Nederlandse onderdelen-leveranciers via hun voertuig-API. Tijdens de trial vertellen we precies welke koppelingen voor jouw werkplaats relevant zijn. Heb je een specifieke leverancier? Laat het weten — we breiden continu uit.',
  },
  {
    question: 'Brengt de RDW-koppeling extra kosten met zich mee?',
    answer: 'Nee. Kenteken-lookup via de RDW open data is inbegrepen in elk pakket. Geen losse abonnementen, geen kosten per opvraging.',
  },
  {
    question: 'Werkt Snellio op tablet en telefoon van mijn monteur?',
    answer: 'Ja. Snellio draait in de browser — werkbonnen invullen, kenteken scannen, klant-handtekening op tablet ter plaatse. Geen aparte app nodig. Voor de monteur onderweg is er een mobiele weergave met alle voertuiginfo.',
  },
  {
    question: 'Hoe krijg ik mijn klanten en voertuigen uit mijn huidige systeem in Snellio?',
    answer: 'Importeren kan via Excel/CSV: klantgegevens, kentekens en historische werkorders. Tijdens de trial helpt onze support je gratis met de migratie — zodat je niet vanaf nul begint.',
  },
  {
    question: 'Wat is de opzegtermijn?',
    answer: 'Maandelijks opzegbaar bij maandbetaling. Bij jaarlijkse betaling loopt het abonnement tot het einde van de betaalde periode. Geen creditcard nodig om te starten.',
  },
]

export default function AutomotivePage() {
  return (
    <>
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
          description:          'Werkplaats-software voor autogarages, APK-stations en onderhoudsbedrijven. Kenteken-lookup via RDW, onderdelen op voertuig, klant-akkoord en facturatie in één systeem.',
          offers:               { '@type': 'Offer', price: '10.00', priceCurrency: 'EUR' },
          publisher:            { '@id': `${SITE.url}/#organization` },
        },
      ]} />

      {/* ── HERO ── */}
      <section
        className="hero-section relative pt-28 pb-20 px-[5%] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,187,214,.1) 0%, transparent 70%) #0a1a28' }}
      >
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[rgba(10,187,214,.1)] border border-[rgba(10,187,214,.3)] rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]" />
              <span className="font-mono text-[.68rem] text-[var(--cyan)] tracking-[.08em] uppercase">
                Nieuw — Snellio Automotive
              </span>
            </div>

            <h1
              className="font-outfit font-black text-white tracking-tight leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
            >
              Van kenteken naar factuur{' '}
              <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                in minuten
              </span>
            </h1>

            <p className="text-[var(--text2)] text-[1.05rem] leading-[1.7] max-w-2xl mx-auto mb-8">
              Werkplaats-software voor autogarages, APK-stations en onderhoudsbedrijven.
              Kenteken-lookup via RDW, onderdelen op voertuig, klant-akkoord en facturatie —
              alles in één systeem.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button href={SIGNUP_HREF} size="lg">Start 14 dagen gratis →</Button>
              <Button href="/contact" variant="ghost" size="lg">Vraag demo aan</Button>
            </div>

            <p className="text-[var(--muted)] text-xs mt-5">
              Geen creditcard nodig · RDW-lookup inbegrepen · Nederlandse support
            </p>
          </div>
        </Container>
      </section>

      {/* ── PIJNPUNTEN ── */}
      <section className="py-20 px-[5%] bg-[var(--navy3)] border-y border-[var(--border)]">
        <Container>
          <div className="text-center mb-12">
            <p className="font-mono text-[.65rem] text-[var(--muted2)] uppercase tracking-[.14em] mb-3">
              Herken je dit?
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Drie dingen die elke werkplaats <span className="text-[var(--cyan)]">elke dag</span> kosten
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {pijnpunten.map((p, i) => (
              <div
                key={p.title}
                className="reveal bg-[rgba(255,80,80,.04)] border border-[rgba(255,80,80,.1)] rounded-2xl p-6"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-outfit font-bold text-white text-[.95rem] mb-2">{p.title}</h3>
                <p className="text-[var(--muted2)] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--text2)] text-base mt-10 max-w-2xl mx-auto">
            <strong className="text-white">Snellio lost dit op.</strong>{' '}
            Eén systeem dat van kenteken tot betaalde factuur alles afhandelt — gebouwd voor werkplaatsen.
          </p>
        </Container>
      </section>

      {/* ── HOE WERKT HET ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container>
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Hoe het werkt
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Vier stappen, <span className="text-[var(--cyan)]">één systeem</span>
            </h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none">
            {stappen.map((s, i) => (
              <li
                key={s.nr}
                className="reveal relative bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center font-outfit font-black text-white text-lg mb-4">
                  {s.nr}
                </div>
                <h3 className="font-outfit font-bold text-white text-[1rem] mb-2">{s.title}</h3>
                <p className="text-[var(--muted2)] text-[.86rem] leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-20 px-[5%] bg-[var(--navy3)]">
        <Container>
          <div className="text-center mb-12">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Functies
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Alles wat een werkplaats <span className="text-[var(--cyan)]">écht gebruikt</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <article
                key={f.title}
                className="reveal bg-[var(--navy2)] border border-[var(--border)] rounded-2xl p-6 hover:border-[rgba(10,187,214,.35)] hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-outfit font-bold text-white text-[.95rem] mb-2">{f.title}</h3>
                <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── INTEGRATIES ── */}
      <section className="py-16 px-[5%] bg-[var(--navy2)] border-y border-[var(--border)]">
        <Container>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] text-center mb-3">
            Integraties
          </p>
          <h2 className="font-outfit font-bold text-white text-2xl text-center mb-10">
            Werkt naadloos samen met je bestaande tools
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {integraties.map(i => (
              <div
                key={i.name}
                className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl px-5 py-3 flex items-center gap-3"
              >
                <span className="font-outfit font-bold text-white text-sm">{i.name}</span>
                <span className="text-[var(--muted2)] text-xs">{i.desc}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--muted)] text-xs mt-8">
            Mist er een integratie? Mail{' '}
            <a href={`mailto:${SITE.email}`} className="text-[var(--cyan)] hover:underline">
              {SITE.email}
            </a>
            {' '}— we breiden continu uit.
          </p>
        </Container>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container>
          <div className="text-center mb-10">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Pakketten
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Kies wat bij jouw werkplaats <span className="text-[var(--cyan)]">past</span>
            </h2>
            <p className="mt-3 text-[var(--text2)] text-base max-w-md mx-auto">
              14 dagen gratis proberen.{' '}
              <span className="text-white font-medium">Schaal wanneer je groeit.</span>
            </p>
          </div>
          <Pricing hideHeader plans={AUTOMOTIVE_PLANS} />
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container narrow>
          <h2 className="font-outfit font-bold text-white text-2xl mb-8 text-center">
            Veelgestelde vragen
          </h2>
          <dl className="flex flex-col gap-3">
            {faqs.map(faq => (
              <div key={faq.question} className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl px-6 py-5">
                <dt className="font-outfit font-semibold text-white text-[.95rem] mb-2">{faq.question}</dt>
                <dd className="text-[var(--muted2)] text-sm leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-24 px-[5%] bg-[var(--navy3)] text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(10,187,214,.1) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <Container narrow>
          <div className="relative">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Klaar voor je werkplaats?
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight mb-5 leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              Start je 14-dagen trial.<br />
              <span className="text-[var(--cyan)]">Geen creditcard.</span>
            </h2>
            <p className="text-[var(--text2)] text-base mb-8 max-w-md mx-auto">
              Liever eerst zien hoe het werkt voor jouw werkplaats? Bel ons of vraag een demo aan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-5">
              <Button href={SIGNUP_HREF} size="lg">Start 14 dagen gratis →</Button>
              <Button href="/contact" variant="ghost" size="lg">Vraag demo aan</Button>
            </div>
            <p className="text-[var(--muted2)] text-sm">
              Of bel direct:{' '}
              <Link href={`tel:${SITE.phone}`} className="text-[var(--cyan)] font-semibold hover:underline">
                {SITE.phone}
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <Cta />
    </>
  )
}
