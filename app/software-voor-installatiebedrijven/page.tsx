import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { faqSchema, breadcrumbSchema, webPageSchema, PERSON_PATH } from '@/lib/schemas'
import { BTW, PLANS, SITE, TRIAL_DAGEN, JAAR_MAANDEN_BETAALD } from '@/lib/constants'
import { fmtEuro, planById } from '@/lib/pricing'
import JsonLd from '@/components/seo/JsonLd'
import HomePricing from '@/components/sections/HomePricing'
import AdsSignupLink from '@/components/ui/AdsSignupLink'
import UpdatedOn from '@/components/ui/UpdatedOn'
import { PILLAR_PAGE } from './meta'

// Landingspagina voor betaald zoekverkeer op "software voor installatiebedrijven".
//
// Bewust géén eigen techniek: prijzen komen uit PLANS (lib/constants), het
// prijsblok is het centrale HomePricing-component, en alle trial-CTA's gaan
// naar /registreren — dezelfde flow als de rest van de site. Deze pagina vuurt
// zelf geen enkel tracking-event: Consent Mode, de Google Tag en de conversie
// trial_signup_completed lopen via de centrale laag (lib/tracking), waarbij de
// conversie pas in CheckoutForm ontstaat na een bevestigde /api/aanmelden.
// Attributie (gclid/gbraid/wbraid/utm) wordt bij binnenkomst al first-party
// vastgelegd door AttributionCapture in de root-layout. Interne links altijd
// via next/link: een gewone <a> breekt de attributie.
//
// Structuur volgt docs/seo-geo/03-pillar-verbeterplan.md. Koeltechnische
// onderwerpen worden hier alleen aangestipt en doorgelinkt naar
// /f-gassen-registratie en /brl-100-software; de uitwerking staat daar.
// Concurrentprijzen uitsluitend uit docs/seo-geo/05-vergelijkingspagina.md.

const vanaf  = Math.min(...PLANS.map(p => p.price.month))
const totMax = Math.max(...PLANS.map(p => p.price.month))

const TITLE       = 'Software voor installatiebedrijven in koeltechniek en airco'
const DESCRIPTION = `CRM, werkbonnen, planning, facturatie en de administratie die BRL 100 vraagt, in één systeem. Vanaf ${fmtEuro(vanaf)} per maand incl. btw. Probeer ${TRIAL_DAGEN} dagen gratis.`

export const metadata: Metadata = buildMetadata({
  title:       TITLE,
  description: DESCRIPTION,
  path:        PILLAR_PAGE.path,
})

const pro        = planById('pro')
const enterprise = planById('enterprise')
const starter    = planById('starter')

// Answer-first alinea onder de H1; letterlijk hergebruikt als eerste FAQ,
// zodat zichtbare tekst en FAQ-schema byte-gelijk zijn.
const answerFirst =
  `Software voor installatiebedrijven in de koeltechniek combineert klantbeheer, planning, digitale werkbonnen en facturatie met wat een standaard ERP mist: een logboek per installatie, koudemiddelregistratie en de administratie die een BRL 100-audit vraagt. Bij Snellio zit alles in elk pakket, van ${fmtEuro(vanaf)} tot ${fmtEuro(totMax)} per maand ${BTW.short}, afhankelijk van het aantal monteurs.`

const pijnpunten = [
  'Werkbonnen raken kwijt of moeten op kantoor opnieuw worden ingevoerd.',
  'Klant-, installatie- en factuurgegevens staan verspreid over losse systemen.',
  'De F-gassen-administratie schiet erbij in, tot de audit eraan komt.',
  'Een factuur blijft liggen omdat niemand weet welk werk al is afgerond.',
]

// Alleen functionaliteit die in docs/seo-geo/02-feature-factcheck.md is
// bevestigd; geen beloftes over wat er niet is.
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
    titel: 'F-gassen en BRL 100',
    tekst: 'Koudemiddelregistratie per installatie en per fles, F-gassenbalans en het logboek dat art. 7 van Verordening (EU) 2024/573 en BRL 100 vragen. Standaard inbegrepen, ook in het kleinste pakket.',
  },
  {
    titel: 'Boekhoudkoppelingen',
    tekst: 'Gratis koppeling met WeFact, Moneybird en Exact Online. Geen losse moduletoeslag.',
  },
]

// Vier items van één zin, elk met link. Geen uitwerking: dat is de
// cannibalisatie-rem richting /f-gassen-registratie en /brl-100-software.
const extraKoeltechniek = [
  {
    titel: 'Logboek per installatie en per circuit',
    tekst: 'Elke handeling terug te vinden bij het apparaat zelf, per zelfstandig circuit.',
    href:  '/f-gassen-registratie',
    anker: 'Hoe het F-gassenlogboek per installatie werkt',
  },
  {
    titel: 'Koudemiddelregistratie en F-gassenbalans',
    tekst: 'Koudemiddel in en uit per fles, met een jaarbalans per gastype in kilogram en CO₂-equivalent.',
    href:  '/f-gassen-registratie',
    anker: 'Flesregistratie en balans in Snellio',
  },
  {
    titel: 'Kenplaat met de wettelijke velden',
    tekst: 'De velden uit art. 12 van de F-gassenverordening, printbaar op je eigen labelprinter, met QR-code naar het logboek.',
    href:  '/f-gassen-registratie',
    anker: 'Kenplaat en QR-code',
  },
  {
    titel: 'Wat de BRL 100-audit van je administratie vraagt',
    tekst: 'Werkregistraties per handeling, een sluitende F-gassenbalans en geregistreerde instrumentcontroles.',
    href:  '/brl-100-software',
    anker: 'BRL 100: wat de auditor van je administratie vraagt',
  },
]

// Concurrentprijzen uitsluitend uit docs/seo-geo/05-vergelijkingspagina.md,
// gecontroleerd bij de leverancier op PILLAR_PAGE.prijzenGecontroleerd
// (OutSmart via cache van 13 september 2026). Ex-btw-bedragen omgerekend met
// 21%. Elk kwartaal opnieuw controleren; de volledige tabel hoort op
// /vergelijken/software-koeltechniek (nog te bouwen), niet hier.
const vergelijking = [
  {
    pakket: `Snellio ${starter.name}`,
    instap: `${fmtEuro(starter.price.month)} per maand of ${fmtEuro(starter.price.year)} per jaar`,
    btw:    BTW.short,
    fgas:   'Ja, inbegrepen',
  },
  {
    pakket: 'Koldwerk Start',
    instap: '€49 per maand',
    btw:    'ex btw (€59,29 incl.)',
    fgas:   'Ja, F-gaslogboek inbegrepen',
  },
  {
    pakket: 'OutSmart Launch + KoudSmart',
    instap: '€168 per jaar, plus €1.575 per jaar voor de F-gasmodule',
    btw:    'ex btw (€2.109 per jaar incl.)',
    fgas:   'Nee, losse add-on (KoudSmart)',
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
    tekst: 'F-gassen, BRL 100 en het digitale logboek zijn geen plug-in op een algemeen pakket, maar onderdeel van het systeem zelf.',
  },
  {
    titel: 'Nederlandse software, en je zit nergens aan vast',
    tekst: 'Gebouwd in Nederland, gehost in de EU (Frankfurt) en AVG-conform. Je begint zonder betaalgegevens, een maandabonnement is maandelijks opzegbaar en een jaarabonnement loopt niet stilzwijgend door.',
  },
]

const faqs = [
  {
    question: 'Wat is software voor installatiebedrijven in de koeltechniek?',
    answer:   answerFirst,
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
    question: 'Zijn de prijzen inclusief of exclusief btw, en hoe vergelijk ik dat?',
    answer: 'Alle Snellio-prijzen zijn inclusief 21% btw: het bedrag dat je ziet, is het bedrag dat wordt afgeschreven. Veel leveranciers publiceren prijzen exclusief btw. Vermenigvuldig zo’n prijs met 1,21 om hem naast een Snellio-prijs te leggen, en let ook op het aantal gebruikers bij de instapprijs en of de F-gasregistratie is inbegrepen of een losse module is.',
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
  {
    question: 'Heeft een zzp’er ook een BRL 100-certificaat nodig?',
    answer: 'Ja. Volgens Ondernemersplein (RVO) heeft een zzp’er die met F-gassen werkt zowel een persoonscertificaat (BRL 200) als een bedrijfscertificaat (BRL 100) nodig. De administratie-eisen van BRL 100, zoals werkregistraties per handeling en de jaarlijkse F-gassenbalans, gelden dus ook voor een eenmanszaak.',
  },
  {
    question: 'Wie bewaart het logboek en hoe lang?',
    answer: 'Artikel 7 lid 2 van Verordening (EU) 2024/573 legt het logboek per apparaat bij de exploitant, die het ten minste vijf jaar bewaart. De onderneming die het werk uitvoert, bewaart ten minste vijf jaar een kopie. In Snellio is de werkbon de bron van het logboek per installatie en gaat de werkbon als PDF naar de klant, zodat beide partijen dezelfde registratie hebben.',
  },
]

const primary =
  'inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_6px_24px_rgba(0,144,184,.3)] transition hover:-translate-y-0.5 hover:bg-[#007a9c]'
const secondary =
  'inline-flex items-center justify-center rounded-xl border-[1.5px] border-[var(--accent)] bg-white px-6 py-3.5 text-sm font-bold text-[var(--accent)] transition hover:bg-[rgba(0,144,184,.06)]'
const label  = 'mb-3 font-mono text-[.68rem] uppercase tracking-[.12em] text-[var(--accent)]'
const h2     = 'font-outfit font-black tracking-tight text-[var(--text)]'
const h2Size = { fontSize: 'clamp(1.6rem, 3.4vw, 2.3rem)' } as const
const anchor = 'font-semibold text-[var(--accent)] hover:underline'

export default function SoftwareVoorInstallatiebedrijvenPage() {
  return (
    <>
      <JsonLd
        schema={[
          // Productpagina: WebPage met dateModified, geen Article. De
          // SoftwareApplication met de vier Offers staat al site-breed in de
          // root-layout; hier alleen de verwijzing.
          webPageSchema({
            path:         PILLAR_PAGE.path,
            name:         TITLE,
            description:  DESCRIPTION,
            dateModified: PILLAR_PAGE.dateModified,
            aboutId:      `${SITE.url}/#software`,
          }),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Software voor installatiebedrijven', href: PILLAR_PAGE.path },
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
              style={{ fontSize: 'clamp(2rem, 4.6vw, 3.3rem)' }}
            >
              {TITLE}
            </h1>
            <p className="mb-5 max-w-xl border-l-[3px] border-[var(--accent)] pl-4 text-[1.05rem] leading-relaxed text-[var(--text2)] md:text-lg">
              CRM, werkbonnen, planning, facturatie en koeltechnische administratie in één systeem.
            </p>
            <p className="mb-4 max-w-xl text-[.98rem] leading-relaxed text-[var(--text2)]">{answerFirst}</p>
            <UpdatedOn dateISO={PILLAR_PAGE.dateModified} className="mb-7" />
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

      {/* ── 2. Herkenbaar? ── */}
      <section className="border-y border-[var(--border)] bg-white px-[5%] py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className={label}>Herkenbaar?</p>
            <h2 className={h2} style={h2Size}>
              De administratie kost meer tijd dan het werk zelf.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {pijnpunten.map(text => (
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

      {/* ── 3. Eén systeem ── */}
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

      {/* ── 4. Wat je krijgt ── */}
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

      {/* ── 5. Wat software voor koeltechniek extra moet kunnen ── */}
      <section className="px-[5%] py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-9 text-center">
            <p className={label}>Koeltechniek</p>
            <h2 className={h2} style={h2Size}>
              Wat software voor koeltechniek extra moet kunnen.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--text2)]">
              Een generiek pakket regelt klanten, planning en facturen. Voor een koeltechnisch bedrijf
              komen daar vier dingen bij. De uitwerking staat op de pagina’s waarnaar we linken.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {extraKoeltechniek.map(item => (
              <li key={item.titel} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-1.5 font-outfit text-base font-bold text-[var(--text)]">{item.titel}</h3>
                <p className="mb-3 text-sm leading-relaxed text-[var(--muted2)]">{item.tekst}</p>
                <Link href={item.href} className={`${anchor} text-sm`}>
                  {item.anker} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 6. ERP of werkbon-app ── */}
      <section className="border-y border-[var(--border)] bg-white px-[5%] py-20">
        <div className="mx-auto max-w-3xl">
          <p className={label}>Keuze</p>
          <h2 className={`${h2} mb-6`} style={h2Size}>
            ERP of werkbon-app: wat past bij 1 tot 10 monteurs?
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-[var(--text2)]">
            <p>
              Een ERP-pakket voor de installatiebranche is gebouwd voor bedrijven met een eigen
              kantoororganisatie: inkoop, voorraad, projecten, urenregistratie en boekhouding in één
              omgeving, met een implementatietraject en beheer erbij. Dat betaalt zich terug als er
              mensen zijn die daar dagelijks mee werken.
            </p>
            <p>
              Een werkbon-app doet het omgekeerde. De monteur legt op locatie vast wat er is gedaan, de
              klant tekent, de bon gaat naar kantoor. Bij 1 tot 10 monteurs zit daar meestal het
              tijdverlies, niet in de voorraadadministratie. Wat een generieke werkbon-app mist, is de
              koeltechnische laag: het logboek per installatie, de koudemiddelregistratie en de
              F-gassenbalans.
            </p>
            <p>
              Snellio zit daartussenin: CRM, planning, werkbonnen en facturatie zoals een werkbon-app,
              met de koeltechnische administratie ingebouwd en een gratis koppeling naar je
              boekhoudpakket in plaats van een eigen boekhouding. Hieronder staan drie instapprijzen
              naast elkaar, inclusief en exclusief btw.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Monteur en kantoor ── */}
      <section className="px-[5%] py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className={label}>Kantoor en buitendienst samen</p>
            <h2 className={`${h2} mb-5`} style={h2Size}>
              De monteur ziet zijn dag, kantoor houdt overzicht.
            </h2>
            <ul className="space-y-3 text-sm text-[var(--text2)]">
              {[
                'Eigen werkorders en klantgegevens onderweg beschikbaar',
                'Werkzaamheden, meetwaarden en materialen vastleggen op locatie',
                'Klant tekent digitaal, werkbon als PDF naar de klant en direct in het dossier',
              ].map(point => (
                <li key={point} className="flex gap-3">
                  <span className="mt-px shrink-0 font-bold text-[var(--green)]">✓</span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm">
              <Link href="/werkbon-software" className={anchor}>
                Meer over de werkbon-app voor installateurs →
              </Link>
            </p>
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

      {/* ── 8. Planning ── */}
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

      {/* ── 9. Vergelijkingsteaser ── */}
      <section className="px-[5%] py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className={label}>Vergelijken</p>
            <h2 className={h2} style={h2Size}>
              Wat kost het, vergeleken met andere pakketten?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--text2)]">
              Drie instapprijzen zoals de leveranciers ze publiceren. Let op het verschil tussen incl. en
              ex btw, en of de F-gasregistratie in de prijs zit.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">Instapprijzen van drie pakketten voor koeltechniek, incl. en ex btw</caption>
              <thead className="bg-[var(--navy2)]">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold text-[var(--text)]">Pakket</th>
                  <th scope="col" className="px-5 py-3 font-semibold text-[var(--text)]">Instapprijs</th>
                  <th scope="col" className="px-5 py-3 font-semibold text-[var(--text)]">Incl. of ex btw</th>
                  <th scope="col" className="px-5 py-3 font-semibold text-[var(--text)]">F-gas inbegrepen?</th>
                </tr>
              </thead>
              <tbody>
                {vergelijking.map(rij => (
                  <tr key={rij.pakket} className="border-t border-[var(--border)]">
                    <th scope="row" className="px-5 py-3 align-top font-semibold text-[var(--text)]">{rij.pakket}</th>
                    <td className="px-5 py-3 align-top text-[var(--text2)]">{rij.instap}</td>
                    <td className="px-5 py-3 align-top text-[var(--text2)]">{rij.btw}</td>
                    <td className="px-5 py-3 align-top text-[var(--text2)]">{rij.fgas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UpdatedOn
            dateISO={PILLAR_PAGE.prijzenGecontroleerd}
            label="Prijzen gecontroleerd op"
            by="bij de leveranciers. Aantal gebruikers en limieten verschillen per pakket."
            className="mt-4 text-center"
          />
        </div>
      </section>

      {/* ── 10. Prijzen (centraal component + centrale prijsdata) ── */}
      <section className="border-y border-[var(--border)] bg-white px-[5%] py-20">
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
              <div key={item.kop} className="rounded-xl border border-[var(--border)] bg-[var(--navy2)] p-5">
                <p className="mb-1 text-sm font-semibold text-[var(--text)]">{item.kop}</p>
                <p className="text-sm leading-relaxed text-[var(--muted2)]">{item.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Auteursblok ── */}
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
              koeltechniekbedrijf dat zelf onder BRL 100 werkt. Monteurs op pad, klanten aan de lijn,
              papieren werkbonnen die kwijtraken en een audit die altijd eerder is dan je denkt.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-[var(--text2)] md:text-base">
              Daarom werkt Snellio zoals een installatiebedrijf werkt: lekcontrole-cycli,
              koudemiddelbalans en de administratie die BRL 100 vraagt zitten er niet als extra bij, maar
              zijn het uitgangspunt.
            </p>
            <p className="text-sm leading-relaxed text-[var(--text2)] md:text-base">
              Lees ook van Rudy Snel:{' '}
              <Link href="/brl-100-software" className={anchor}>
                BRL 100: wat de auditor van je administratie vraagt →
              </Link>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text2)] md:text-base">
              <Link href={PERSON_PATH} className={anchor}>Meer over Rudy Snel →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── 12. Drie stappen ── */}
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

      {/* ── 13. Waarom Snellio ── */}
      <section className="px-[5%] py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className={label}>Waarom Snellio</p>
            <h2 className={h2} style={h2Size}>
              Gemaakt voor de manier waarop jij werkt.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {waarom.map(w => (
              <div key={w.titel} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 font-outfit text-base font-bold text-[var(--text)]">{w.titel}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted2)]">{w.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. FAQ ── */}
      <section id="faq" className="border-y border-[var(--border)] bg-white px-[5%] py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${h2} mb-8 text-center`} style={h2Size}>
            Veelgestelde vragen
          </h2>
          <div className="space-y-3">
            {faqs.map(faq => (
              <details
                key={faq.question}
                className="group rounded-xl border border-[var(--border)] bg-[var(--navy2)] px-6 py-4 transition-colors hover:border-[rgba(10,187,214,.3)]"
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

      {/* ── 15. Afsluitende trial-CTA ── */}
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
