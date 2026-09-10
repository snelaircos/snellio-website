import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { faqSchema, breadcrumbSchema } from '@/lib/schemas'
import { BTW, PLANS, TRIAL_DAGEN, JAAR_MAANDEN_BETAALD } from '@/lib/constants'
import { fmtEuro, planById } from '@/lib/pricing'
import JsonLd from '@/components/seo/JsonLd'
import HomePricing from '@/components/sections/HomePricing'
import AdsSignupLink from '@/components/ui/AdsSignupLink'

// Landingspagina voor betaald zoekverkeer op "software voor installatiebedrijven".
//
// Bewust géén eigen techniek: prijzen komen uit PLANS (lib/constants), het
// prijsblok is het centrale HomePricing-component, en alle trial-CTA's gaan
// naar /registreren — dezelfde flow als de rest van de site. Deze pagina vuurt
// zelf geen enkel tracking-event: Consent Mode, de Google Tag en de conversie
// trial_signup_completed lopen via de centrale laag (lib/tracking), waarbij de
// conversie pas in CheckoutForm ontstaat na een bevestigde /api/aanmelden.
// Attributie (gclid/gbraid/wbraid/utm) wordt bij binnenkomst al first-party
// vastgelegd door AttributionCapture in de root-layout.

export const metadata: Metadata = buildMetadata({
  title: 'Software voor installatiebedrijven, 14 dagen gratis proberen',
  description:
    'CRM, digitale werkbonnen, planning, facturatie en koeltechnische administratie in één systeem. Probeer Snellio 14 dagen gratis, zonder betaling. Daarna vanaf €10 per maand incl. btw.',
  path: '/software-voor-installatiebedrijven',
})

const pro        = planById('pro')
const enterprise = planById('enterprise')
const starter    = planById('starter')
const vanaf      = Math.min(...PLANS.map(p => p.price.month))

// Alleen functionaliteit die daadwerkelijk in Snellio zit (zie /features en de
// INBEGREPEN-lijst); geen beloftes over wat er niet is.
const functies = [
  {
    titel: 'Digitale werkbonnen',
    tekst: 'De monteur legt werkzaamheden, meetwaarden en materialen vast en laat de klant op telefoon of tablet tekenen. De werkbon gaat als PDF naar de klant en staat meteen in het dossier.',
  },
  {
    titel: 'Planning voor je monteurs',
    tekst: 'Werkorders inplannen en toewijzen, met synchronisatie naar Google Calendar per monteur. Iedereen werkt met dezelfde planning.',
  },
  {
    titel: 'CRM en installatiebeheer',
    tekst: 'Klanten, locaties, contactpersonen en de volledige historie per installatie op één plek. Inclusief digitaal logboek, te openen via de QR-code op de kenplaat.',
  },
  {
    titel: 'Facturatie',
    tekst: 'Maak vanuit een afgeronde werkorder een factuur met iDEAL-betaallink via Mollie en houd de betaalstatus bij.',
  },
  {
    titel: 'F-gassen en BRL100',
    tekst: 'Koudemiddelregistratie, flesregistratie en lekcontrole conform EU-verordening 2024/573, met BRL100-rapportage in één klik. Standaard inbegrepen, ook in het kleinste pakket.',
  },
  {
    titel: 'Boekhoudkoppelingen',
    tekst: 'Gratis koppeling met WeFact, Moneybird en Exact Online. Geen losse moduletoeslag.',
  },
]

const stappen = [
  {
    nr: '1',
    titel: 'Account aanmaken',
    tekst: 'Bedrijfsnaam, e-mailadres en een wachtwoord. Geen creditcard, geen incassomachtiging, geen pakket kiezen.',
  },
  {
    nr: '2',
    titel: `${TRIAL_DAGEN} dagen alles proberen`,
    tekst: 'Alle functies staan direct aan. Voeg je eigen klanten, installaties en werkorders toe en kijk of het bij je werkwijze past.',
  },
  {
    nr: '3',
    titel: 'Daarna pas je abonnement kiezen',
    tekst: 'Tijdens de proefperiode kies je in Snellio het pakket dat bij de grootte van je bedrijf past, en of je per maand of per jaar betaalt.',
  },
]

const waarom = [
  {
    titel: 'Alle functies in elk pakket',
    tekst: 'Geen modulejungle en geen toeslagen. Het verschil tussen de pakketten zit in het aantal monteurs en, alleen bij Starter, het aantal installaties.',
  },
  {
    titel: 'Koeltechniek zit in de kern',
    tekst: 'F-gassen, BRL100 en het digitale logboek zijn geen plug-in op een algemeen pakket, maar onderdeel van het systeem zelf.',
  },
  {
    titel: 'Nederlandse software en support',
    tekst: 'Gebouwd in Nederland, gehost in de EU (Frankfurt) en AVG-conform. Je krijgt de bouwer zelf aan de lijn.',
  },
  {
    titel: 'Je zit nergens aan vast',
    tekst: `Je begint zonder betaalgegevens. Een maandabonnement is maandelijks opzegbaar en een jaarabonnement loopt niet stilzwijgend door.`,
  },
]

const faqs = [
  {
    question: 'Wat is software voor installatiebedrijven?',
    answer:
      'Software die klantbeheer, installaties, planning, digitale werkbonnen en facturatie samenbrengt. In Snellio werkt kantoor vanuit hetzelfde overzicht als de monteur onderweg, zodat gegevens niet meer worden overgetypt.',
  },
  {
    question: 'Moet ik direct betalen?',
    answer: `Nee. Je probeert Snellio eerst ${TRIAL_DAGEN} dagen gratis. Bij registratie vragen we geen creditcard, geen betaling en geen incassomachtiging.`,
  },
  {
    question: 'Wanneer kies ik een abonnement?',
    answer: 'Tijdens de proefperiode kies je in Snellio het abonnement dat past bij de grootte van je bedrijf, en of je per maand of per jaar wilt betalen via iDEAL of automatische incasso.',
  },
  {
    question: 'Wat kost Snellio?',
    answer: `Starter ${fmtEuro(starter.price.month)} per maand, Basis ${fmtEuro(planById('basis').price.month)} per maand, Pro ${fmtEuro(pro.price.month)} per maand met ${pro.monteurs.inbegrepen} monteurs inbegrepen en Enterprise ${fmtEuro(enterprise.price.month)} per maand met ${enterprise.monteurs.inbegrepen} monteurs inbegrepen. Alle bedragen ${BTW.short}. Bij jaarbetaling betaal je ${JAAR_MAANDEN_BETAALD} maanden en gebruik je Snellio 12 maanden.`,
  },
  {
    question: 'Kan ik extra monteurs toevoegen?',
    answer: `Ja. Bij Pro kost een extra monteur ${fmtEuro(pro.monteurs.extra!.prijs)} per maand vanaf de ${pro.monteurs.extra!.vanafMonteur}e, bij Enterprise ${fmtEuro(enterprise.monteurs.extra!.prijs)} per maand vanaf de ${enterprise.monteurs.extra!.vanafMonteur}e. Starter en Basis zijn bedoeld voor één monteur.`,
  },
  {
    question: 'Zijn alle functies inbegrepen?',
    answer: `Ja. De pakketten verschillen alleen in capaciteit: het aantal monteurs en bij Starter maximaal ${starter.installaties.max} installaties. Werkbonnen, planning, facturatie, F-gassen en de boekhoudkoppelingen zitten in ieder pakket.`,
  },
  {
    question: 'Kan mijn monteur Snellio onderweg gebruiken?',
    answer: 'Ja. Snellio werkt in de browser op telefoon en tablet, zonder installatie via een appstore. De monteur ziet zijn eigen werkorders, legt werkzaamheden vast en laat de klant digitaal tekenen.',
  },
  {
    question: 'Kan ik mijn gegevens meenemen?',
    answer: 'Ja. Je data blijft van jou en is te exporteren via CSV en PDF. Voor het overzetten van bestaande klant- en installatiegegevens helpt onze support je tijdens de proefperiode.',
  },
]

const primary =
  'inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_6px_24px_rgba(0,144,184,.3)] transition hover:-translate-y-0.5 hover:bg-[#007a9c]'
const secondary =
  'inline-flex items-center justify-center rounded-xl border-[1.5px] border-[var(--accent)] bg-white px-6 py-3.5 text-sm font-bold text-[var(--accent)] transition hover:bg-[rgba(0,144,184,.06)]'
const label = 'mb-3 font-mono text-[.68rem] uppercase tracking-[.12em] text-[var(--accent)]'
const h2 = 'font-outfit font-black tracking-tight text-[var(--text)]'
const h2Size = { fontSize: 'clamp(1.6rem, 3.4vw, 2.3rem)' } as const

export default function SoftwareVoorInstallatiebedrijvenPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Software voor installatiebedrijven', href: '/software-voor-installatiebedrijven' },
          ]),
          faqSchema(faqs),
        ]}
      />

      {/* ── 1. Hero ── */}
      <section className="px-[5%] pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={label}>Voor installateurs, koeltechniek en airco</p>
            <h1
              className="mb-5 font-outfit font-black leading-[1.05] tracking-tight text-[var(--text)]"
              style={{ fontSize: 'clamp(2.1rem, 5vw, 3.6rem)' }}
            >
              Software voor installatiebedrijven
            </h1>
            <p className="mb-7 max-w-xl border-l-[3px] border-[var(--accent)] pl-4 text-[1.05rem] leading-relaxed text-[var(--text2)] md:text-lg">
              CRM, werkbonnen, planning, facturatie en koeltechnische administratie in één systeem.
            </p>
            <div className="flex flex-wrap gap-3">
              <AdsSignupLink className={primary}>Start {TRIAL_DAGEN} dagen gratis →</AdsSignupLink>
              <Link href="#functies" className={secondary}>
                Bekijk wat je krijgt
              </Link>
            </div>
            <p className="mt-4 text-xs text-[var(--muted2)]">
              Geen betaling nodig · Kies je abonnement later
            </p>
            <p className="mt-2 text-xs text-[var(--muted2)]">
              Daarna vanaf {fmtEuro(vanaf)} per maand {BTW.short}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_12px_40px_rgba(15,33,51,.1)]">
            <Image
              src="/dashboard-preview.png"
              alt="Snellio dashboard voor installatiebedrijven met klanten, installaties, openstaande werkorders en koudemiddel-flessen"
              width={1120}
              height={600}
              priority
              className="block h-auto w-full"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ── 2. Herkenbare administratieve problemen ── */}
      <section className="border-y border-[var(--border)] bg-white px-[5%] py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className={label}>Herkenbaar?</p>
            <h2 className={h2} style={h2Size}>
              De administratie kost meer tijd dan het werk zelf.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              'Werkbonnen raken kwijt of moeten op kantoor opnieuw worden ingevoerd.',
              'De planning verandert, maar niet iedereen werkt met dezelfde informatie.',
              'Klant-, installatie- en factuurgegevens staan verspreid over losse systemen.',
              'De F-gassen-administratie schiet erbij in, tot de audit eraan komt.',
              'Een factuur blijft liggen omdat niemand weet welk werk al is afgerond.',
              'Elke nieuwe monteur betekent weer een extra plek waar gegevens ontstaan.',
            ].map(text => (
              <div
                key={text}
                className="rounded-xl border border-[var(--border)] bg-[var(--navy2)] p-5 text-sm leading-relaxed text-[var(--text2)]"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Snellio als oplossing ── */}
      <section className="px-[5%] py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className={label}>De oplossing</p>
          <h2 className={`${h2} mb-5`} style={h2Size}>
            Eén systeem, van eerste klantvraag tot betaalde factuur.
          </h2>
          <p className="text-base leading-relaxed text-[var(--text2)] md:text-[1.05rem]">
            In Snellio hangt alles aan elkaar. Een werkorder gebruikt de gegevens van de klant en de
            installatie, de monteur vult hem op locatie in, en daaruit rollen de werkbon, de
            koudemiddelregistratie en de factuur. Wat op locatie is ingevuld, is op kantoor meteen
            verwerkt. Geen dubbele invoer en geen losse bestanden meer.
          </p>
        </div>
      </section>

      {/* ── 4. Belangrijkste functionaliteiten ── */}
      <section id="functies" className="scroll-mt-20 border-y border-[var(--border)] bg-white px-[5%] py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className={label}>Alles inbegrepen</p>
            <h2 className={h2} style={h2Size}>
              Wat je krijgt, in elk pakket.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {functies.map(f => (
              <article key={f.titel} className="rounded-2xl border border-[var(--border)] bg-[var(--navy2)] p-6">
                <h3 className="mb-2 font-outfit text-lg font-bold text-[var(--text)]">{f.titel}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted2)]">{f.tekst}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Echte productbeelden ── */}
      <section className="px-[5%] py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className={label}>Kantoor en buitendienst samen</p>
            <h2 className={`${h2} mb-5`} style={h2Size}>
              De monteur ziet zijn dag. Kantoor houdt overzicht.
            </h2>
            <ul className="space-y-3 text-sm text-[var(--text2)]">
              {[
                'Eigen werkorders en klantgegevens onderweg beschikbaar',
                'Werkzaamheden, meetwaarden en materialen vastleggen op locatie',
                'Klant tekent digitaal op telefoon of tablet',
                'Werkbon als PDF naar de klant, historie direct in het dossier',
                'Planning en voortgang centraal zichtbaar op kantoor',
              ].map(point => (
                <li key={point} className="flex gap-3">
                  <span className="mt-px shrink-0 font-bold text-[var(--green)]">✓</span>
                  {point}
                </li>
              ))}
            </ul>
            <AdsSignupLink className={`${primary} mt-7`}>Probeer Snellio gratis →</AdsSignupLink>
          </div>
          <div className="order-1 flex justify-center lg:order-2">
            <div className="w-full max-w-[300px] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(15,33,51,.18)] ring-1 ring-[var(--border)]">
              <Image
                src="/monteur-app.png"
                alt="Snellio op de telefoon van de monteur, met dashboard, werkorders, installaties en planning"
                width={660}
                height={1434}
                className="block h-auto w-full"
                sizes="(min-width: 1024px) 300px, 80vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-white px-[5%] py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-9 text-center">
            <p className={label}>Planning</p>
            <h2 className={h2} style={h2Size}>
              Alle werkorders en monteurs in één weekoverzicht.
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_12px_40px_rgba(15,33,51,.1)]">
            <Image
              src="/planning-preview.png"
              alt="Planning in Snellio met werkorders per monteur in een weekoverzicht en Google Calendar-synchronisatie"
              width={1120}
              height={550}
              className="block h-auto w-full"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ── 6. Gebouwd vanuit de installatiepraktijk ── */}
      <section className="px-[5%] py-20">
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[160px_1fr] md:gap-10">
          <div className="flex justify-center md:justify-start">
            <div className="h-[160px] w-[160px] overflow-hidden rounded-full shadow-[0_8px_24px_rgba(0,144,184,.25)] ring-4 ring-white">
              <Image
                src="/rudy-snel.png"
                alt="Rudy Snel, eigenaar van een koeltechniekbedrijf en bouwer van Snellio"
                width={400}
                height={400}
                className="h-full w-full object-cover"
                sizes="160px"
              />
            </div>
          </div>
          <div>
            <p className={label}>Gebouwd vanuit de installatiepraktijk</p>
            <h2 className={`${h2} mb-4`} style={h2Size}>
              Door een installateur, niet door een softwarebureau.
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[var(--text2)] md:text-base">
              Snellio is gebouwd door Rudy Snel, STEK-gecertificeerd en eigenaar van een eigen
              koeltechniekbedrijf. Monteurs op pad, klanten aan de lijn, papieren werkbonnen die
              kwijtraken en een audit die altijd eerder is dan je denkt.
            </p>
            <p className="text-sm leading-relaxed text-[var(--text2)] md:text-base">
              Daarom werkt Snellio zoals een installatiebedrijf werkt: lekcontrole-cycli,
              koudemiddelbalans en BRL100 zitten er niet als extra bij, maar zijn het uitgangspunt.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Drie stappen ── */}
      <section className="border-y border-[var(--border)] bg-white px-[5%] py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className={label}>Zo begin je</p>
            <h2 className={h2} style={h2Size}>
              Vandaag starten, later pas kiezen.
            </h2>
          </div>
          <ol className="grid gap-5 md:grid-cols-3">
            {stappen.map(stap => (
              <li key={stap.nr} className="rounded-2xl border border-[var(--border)] bg-[var(--navy2)] p-6">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] font-outfit text-sm font-black text-white">
                  {stap.nr}
                </div>
                <h3 className="mb-2 font-outfit text-base font-bold text-[var(--text)]">{stap.titel}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted2)]">{stap.tekst}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 8. Compacte prijzen (centraal component + centrale prijsdata) ── */}
      <section className="px-[5%] py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className={label}>Prijzen</p>
            <h2 className={h2} style={h2Size}>
              Je betaalt alleen voor de grootte van je bedrijf.
            </h2>
          </div>

          <HomePricing />

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-3">
            {[
              {
                kop: `${pro.name}: ${pro.monteurs.inbegrepen} monteurs inbegrepen`,
                tekst: `Daarna ${fmtEuro(pro.monteurs.extra!.prijs)} per extra monteur per maand, vanaf de ${pro.monteurs.extra!.vanafMonteur}e.`,
              },
              {
                kop: `${enterprise.name}: ${enterprise.monteurs.inbegrepen} monteurs inbegrepen`,
                tekst: `Daarna ${fmtEuro(enterprise.monteurs.extra!.prijs)} per extra monteur per maand, vanaf de ${enterprise.monteurs.extra!.vanafMonteur}e.`,
              },
              {
                kop: 'Per jaar betalen',
                tekst: `Je betaalt ${JAAR_MAANDEN_BETAALD} maanden en gebruikt Snellio 12 maanden. Alle bedragen ${BTW.short}.`,
              },
            ].map(item => (
              <div key={item.kop} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="mb-1 text-sm font-semibold text-[var(--text)]">{item.kop}</p>
                <p className="text-sm leading-relaxed text-[var(--muted2)]">{item.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Waarom Snellio ── */}
      <section className="border-y border-[var(--border)] bg-white px-[5%] py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className={label}>Waarom Snellio</p>
            <h2 className={h2} style={h2Size}>
              Gemaakt voor de manier waarop jij werkt.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {waarom.map(w => (
              <div key={w.titel} className="rounded-2xl border border-[var(--border)] bg-[var(--navy2)] p-6">
                <h3 className="mb-2 font-outfit text-base font-bold text-[var(--text)]">{w.titel}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted2)]">{w.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ── */}
      <section id="faq" className="px-[5%] py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${h2} mb-8 text-center`} style={h2Size}>
            Veelgestelde vragen
          </h2>
          <div className="space-y-3">
            {faqs.map(faq => (
              <details
                key={faq.question}
                className="group rounded-xl border border-[var(--border)] bg-white px-6 py-4 transition-colors hover:border-[rgba(10,187,214,.3)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[.95rem] font-semibold text-[var(--text)]">
                  {faq.question}
                  <span
                    className="shrink-0 text-xl leading-none text-[var(--accent)] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted2)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Afsluitende trial-CTA ── */}
      <section className="bg-[#0f2133] px-[5%] py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-outfit font-black leading-[1.1] tracking-tight text-white"
            style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)' }}
          >
            Klaar om minder tijd aan administratie te besteden?
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            Probeer Snellio {TRIAL_DAGEN} dagen gratis met je eigen klanten en werkorders.
          </p>
          <AdsSignupLink className={primary}>Start {TRIAL_DAGEN} dagen gratis →</AdsSignupLink>
          <p className="mt-4 text-xs text-white/60">Geen betaling nodig · Kies je abonnement later</p>
        </div>
      </section>
    </>
  )
}
