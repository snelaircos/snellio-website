import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, webPageSchema, PERSON_PATH } from '@/lib/schemas'
import { BTW, PLANS, SITE, TRIAL_DAGEN } from '@/lib/constants'
import { fmtEuro, planById } from '@/lib/pricing'
import JsonLd                       from '@/components/seo/JsonLd'
import UpdatedOn                    from '@/components/ui/UpdatedOn'
import LandingHero                  from '@/components/sections/LandingHero'
import LandingFeatures              from '@/components/sections/LandingFeatures'
import LandingProblemsVsOplossingen from '@/components/sections/LandingProblemsVsOplossingen'
import LandingFaq                   from '@/components/sections/LandingFaq'
import LandingInternalLinks         from '@/components/sections/LandingInternalLinks'
import Cta                          from '@/components/sections/Cta'
import { WERKBON_PAGE }             from './meta'

// Commerciële pagina op "werkbon app" (primaire term). Tekst, tabel en
// juridische claims komen uit docs/seo-geo/10-pagina-werkbon-software.md,
// 01-juridische-basis.md (§2 en §6) en 02-feature-factcheck.md. Wijk niet af
// zonder die bestanden bij te werken.
//
// Regels die hier gelden:
// - BRL 100 kent geen "rapport": de werkbon is de werkregistratie per
//   handeling en per circuit (§2.5.2), bron van het logboek (art. 7).
// - Handtekening op het scherm is een elektronische handtekening (eIDAS
//   art. 3 punt 10) die niet als bewijs geweigerd mag worden (art. 25 lid 1),
//   maar níét gelijkgesteld aan een handgeschreven handtekening (art. 25 lid 2).
//   Nooit "voldoet aan eIDAS" of "juridisch gelijkwaardig" schrijven.
// - Prijzen uitsluitend uit PLANS, BTW en TRIAL_DAGEN.
// - Geen Article, geen Person, geen SoftwareApplication (staat site-breed).
// - FAQ-tekst is byte-gelijk aan het FAQ-schema: één array voor beide.
// - Zichtbare datum is gelijk aan WebPage.dateModified (meta.ts).
// - Offline werken en Wero staan niet in 02: niet claimen.

const TITLE       = 'Werkbon app voor installateurs in koeltechniek en airco'
const DESCRIPTION =
  `Werkbon app voor koeltechnische installateurs: monteur vult meetwaarden in, klant tekent op het scherm, pdf direct verstuurd. De werkbon is meteen de werkregistratie die BRL 100 vraagt. ${TRIAL_DAGEN} dagen gratis.`

export const metadata: Metadata = buildMetadata({
  title:       `${TITLE} | Snellio`,
  description: DESCRIPTION,
  path:        WERKBON_PAGE.path,
})

const starter = planById('starter')

// ── Data ──────────────────────────────────────────────────────────────────────

const bronnen = [
  {
    label: 'Rijkswaterstaat, BRL 100 versie 3.0, 5 december 2025, §2.5, §2.5.2, §2.5.7 en §3.3',
    href:  'https://iplo.nl/publish/pages/228185/2025-12-05-brl100-versie-3-0-beveiligd-en-printbaar.pdf',
  },
  {
    label: 'Verordening (EU) 2024/573, art. 7',
    href:  'https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32024R0573',
  },
  {
    label: 'Verordening (EU) nr. 910/2014 (eIDAS), art. 3 punt 10 t/m 12 en art. 25',
    href:  'https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32014R0910',
  },
]

const werkbonVelden: [string, string, string][] = [
  ['Klant, locatie, datum, monteur', 'Basis van elke werkbon; de monteur met certificaatnummer is verplicht in het logboek', 'Art. 7 lid 1 onder e'],
  ['Installatie en zelfstandig circuit', 'BRL 100 vraagt registratie per handeling én per zelfstandig circuit', 'BRL 100 §2.5.2'],
  ['Type handeling (installatie, service, lekcontrole, reparatie, buitendienststelling)', 'Elke handeling aan de installatie moet geregistreerd worden', 'BRL 100 §2.5.2; art. 7 lid 1 onder e'],
  ['Koudemiddel: type, toegevoegd, teruggewonnen, uit welke fles', 'Hoeveelheden per apparaat in het logboek; flesregistratie voor de F-gassenbalans', 'Art. 7 lid 1 onder a t/m d; BRL 100 §3.3'],
  ['Drukbeproeving: druk en resultaat', 'De certificerende instelling controleert of de drukbeproeving op de werkbon staat', 'BRL 100 (inspectiepunten bij §2.5)'],
  ['Vacumeren: einddruk en standtijd van ten minste 30 minuten', 'Werkinstructie vacumeren, gecontroleerd bij de audit', 'BRL 100 (inspectiepunten bij §2.5)'],
  ['Lekcontrole: datum, resultaat, detector met ijkdatum', 'Datum en resultaat in het logboek; detector en ijking via de instrumenteneisen', 'Art. 7 lid 1 onder f; BRL 100 §2.5.7'],
  ['Handtekening klant en monteur, met naam en tijdstip', 'Bewijs dat de klant het werk heeft gezien; de exploitant krijgt aantoonbaar een kopie', 'BRL 100 §2.5.2'],
]

const stappen = [
  { nr: '1', titel: 'Maak een werkorder aan.',        tekst: 'Kies klant, locatie en installatie. Klant- en installatiegegevens (merk, type, koudemiddel, vulling, serienummer) staan al ingevuld.' },
  { nr: '2', titel: 'Voer de handelingen in.',        tekst: 'Per type handeling de bijbehorende velden: druk, temperatuur, vacuüm en standtijd, koudemiddel uit welke fles, resultaat van de lekcontrole. Foto’s en bijlagen erbij.' },
  { nr: '3', titel: 'De klant tekent op het scherm.', tekst: 'Naam, datum en tijdstip worden vastgelegd. De monteur tekent ook.' },
  { nr: '4', titel: 'Pdf klaar en verstuurd.',        tekst: 'De werkbon gaat per e-mail naar de klant. De handelingen staan in het logboek van de installatie, de koudemiddelboeking in de flesbalans, en je maakt met één klik de factuur aan.' },
]

const functies = [
  { icon: '✍️', title: 'Digitale handtekening ter plaatse',         desc: 'Klant en monteur tekenen op telefoon of tablet. Naam, datum en tijdstip staan op de pdf.' },
  { icon: '🔧', title: 'Koeltechnische handelingen met eigen velden', desc: 'Inbedrijfstelling, lekcontrole, drukbeproeving, vacumeren, koudemiddel toevoegen of terugwinnen, buitendienststelling. Elk type zijn eigen meetvelden.' },
  { icon: '🏠', title: 'Werkbon gekoppeld aan de installatie',       desc: 'Elke bon hangt aan een installatie met type, merk, koudemiddel, vulling en serienummer. De handelingen komen in het logboek per installatie, te openen via de QR-code op de kenplaat.' },
  { icon: '📷', title: 'Foto’s en bijlagen',                         desc: 'Bij de werkbon, terug te vinden in het klantdossier.' },
  { icon: '🧾', title: 'Direct factureren',                          desc: 'Van werkbon naar factuur in één klik, met iDEAL-betaallink via Mollie. Koppeling met Moneybird, WeFact en Exact Online.' },
  { icon: '📤', title: 'Automatisch e-mailen',                       desc: 'De pdf gaat direct na ondertekening naar de klant. Adres aanpasbaar, verzending uit te stellen.' },
  { icon: '📁', title: 'Archief per klant en installatie',           desc: 'Werkbonnen, foto’s en logboek bij elkaar. De werkregistratie blijft bewaard zolang je account bestaat; BRL 100 vraagt minimaal vijf jaar.' },
  { icon: '🦺', title: 'Veiligheidsdossier bij brandbare koudemiddelen', desc: 'Bij werk aan R290 maakt Snellio bij de werkorder een TRA, een werkvergunning waar die nodig is, en een LMRA die de monteur ter plaatse invult. BRL 100 versie 3.0 vraagt de TRA als het werk risico’s meebrengt; de LMRA is een werkwijze uit de VCA-praktijk, geen wettelijke eis.' },
]

const problemen = [
  { title: 'Papieren bon.',                      desc: 'Raakt kwijt, is slecht leesbaar, moet gescand en overgetypt worden.' },
  { title: 'Meetwaarden in vrije tekst.',        desc: 'Bij de audit ontbreekt de standtijd van het vacumeren of de druk van de beproeving, omdat er geen veld voor was.' },
  { title: 'Werkbon en logboek los van elkaar.', desc: 'De monteur vult de bon in op locatie en het logboek later op kantoor, of niet.' },
  { title: 'Factuur apart invoeren.',            desc: 'Van bon naar boekhoudprogramma overtypen.' },
]

const oplossingen = [
  { title: 'Werkbon op telefoon of tablet.', desc: 'Alles op locatie ingevuld, direct verstuurd.' },
  { title: 'Vaste velden per handeling.',    desc: 'De software vraagt wat BRL 100 wil zien.' },
  { title: 'Werkbon is het logboek.',        desc: 'Elke handeling komt in het logboek van de installatie en in de flesbalans, zonder tweede invoer.' },
  { title: 'Factuur in één klik.',           desc: 'Regels overgenomen, betaallink erbij.' },
]

const doelgroepen = [
  { icon: '🔧', titel: 'Airco-installateur',                    tekst: 'Plaatst split-units bij particulieren en bedrijven. Wil per installatie een werkbon met de koudemiddelvulling en de handtekening van de klant, en de kenplaat direct printen.' },
  { icon: '♨️', titel: 'Warmtepompinstallateur',                tekst: 'Inbedrijfstellingen en servicebeurten, met de velden die BRL 100 aan de werkregistratie stelt.' },
  { icon: '❄️', titel: 'Koeltechnisch monteur of servicebedrijf', tekst: 'Lekcontroles, drukbeproevingen en vacumeringen bij commerciële installaties, met de gegevens die in het logboek van de exploitant moeten.' },
  { icon: '👷', titel: 'Zzp’er met BRL 100 en BRL 200',          tekst: `Dezelfde registratieplicht als een bedrijf, zonder kantoor dat het achteraf invoert. ${starter.name} vanaf ${fmtEuro(starter.price.month)} per maand ${BTW.short}.` },
]

// Prijsantwoord één keer opbouwen: zichtbaar in de FAQ én in het FAQ-schema.
const prijsAntwoord =
  `Snellio kost vanaf ${fmtEuro(starter.price.month)} per maand ${BTW.short} (${starter.name}: ${starter.monteurs.inbegrepen} monteur, ${starter.installaties.label.toLowerCase()}). ` +
  `In elk pakket zitten alle functies: werkbonnen, planning, facturatie, F-gassen en BRL 100-werkregistratie. ` +
  `Je start met ${TRIAL_DAGEN} dagen gratis, zonder betaalgegevens, en kiest je abonnement pas daarna.`

// Eén array voor de zichtbare FAQ én het FAQPage-schema (byte-gelijk).
const faqs = [
  {
    question: 'Wat is een werkbon app?',
    answer:   'Een werkbon app is software waarmee een monteur de werkbon op locatie digitaal invult op telefoon of tablet: werkzaamheden, uren, materialen, meetwaarden en foto’s. De klant tekent op het scherm en de pdf gaat direct naar de klant en naar je administratie. Snellio is een werkbon app voor koeltechniek en airco: de werkbon hangt aan een installatie en de handelingen komen in het logboek van die installatie.',
  },
  {
    question: 'Wat moet er op een werkbon staan?',
    answer:   'Er is geen wet die de inhoud van een werkbon voorschrijft. Voor een koeltechnisch bedrijf volgt de inhoud uit BRL 100 versie 3.0 en art. 7 van Verordening (EU) 2024/573: klant, locatie, datum en monteur met certificaatnummer, de installatie en het circuit, het type handeling, koudemiddel toegevoegd en teruggewonnen en uit welke fles, druk en resultaat van de drukbeproeving, einddruk en standtijd van het vacumeren, datum en resultaat van de lekcontrole, en de handtekeningen van klant en monteur.',
  },
  {
    question: 'Hoe maak ik werkbonnen digitaal?',
    answer:   'Kies een werkbon app, zet je klanten en installaties erin (in Snellio via CSV-import van klanten, locaties en werkorders) en laat monteurs de bon op telefoon of tablet invullen. Kies een app met vaste velden voor jouw vak: voor koeltechniek zijn dat de meetwaarden van drukbeproeving, vacumeren en lekcontrole en de koudemiddelboeking per fles. Anders staan die straks in vrije tekst en zoekt de auditor ze bij elkaar.',
  },
  {
    question: 'Is een handtekening op het scherm rechtsgeldig?',
    answer:   'Een handtekening op een telefoon of tablet is een elektronische handtekening volgens Verordening (EU) 910/2014 (eIDAS). Die mag niet als bewijs worden geweigerd alleen omdat hij elektronisch is (art. 25 lid 1). Hij is niet gelijkgesteld aan een handgeschreven handtekening; dat geldt alleen voor een gekwalificeerde elektronische handtekening met een gekwalificeerd certificaat (art. 25 lid 2). Voor een werkbon volstaat de handtekening op het scherm samen met naam, datum, tijdstip en het dossier.',
  },
  {
    question: 'Werkt de werkbon app op telefoon en tablet?',
    answer:   'Ja. Snellio is een webapplicatie voor smartphone en tablet, op iOS en Android, zonder installatie uit een app store.',
  },
  {
    question: 'Kan ik direct factureren vanuit de werkbon?',
    answer:   'Ja. Na ondertekening maak je met één klik een factuur aan; de regels worden overgenomen uit de werkbon. Je stuurt de factuur met een iDEAL-betaallink via Mollie. De factuur gaat mee naar Moneybird, WeFact of Exact Online als je die koppeling gebruikt.',
  },
  {
    question: 'Werkt Snellio met mijn boekhoudpakket?',
    answer:   'Snellio koppelt gratis met Moneybird, WeFact en Exact Online, in elk pakket. Andere boekhoudpakketten zijn niet gekoppeld. Ontbreekt jouw pakket, mail dan; als het kan wordt het toegevoegd.',
  },
  {
    question: 'Wat kost een werkbon app van Snellio?',
    answer:   prijsAntwoord,
  },
]

// ── Stijl ─────────────────────────────────────────────────────────────────────

const label   = 'mb-3 font-mono text-[.68rem] uppercase tracking-[.12em] text-[var(--accent)]'
const h2      = 'font-outfit font-black tracking-tight text-[var(--text)] mb-5 scroll-mt-24'
const h2Size  = { fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' } as const
const prose   = 'text-[var(--text2)] text-[1rem] leading-[1.8] space-y-4'
const numbers = 'list-decimal pl-5 space-y-2 text-[var(--text2)] text-[1rem] leading-[1.75] marker:font-semibold marker:text-[var(--accent)]'
const anchor  = 'text-[var(--accent)] underline underline-offset-2 hover:text-[var(--text)] transition-colors'

function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-[5%] py-14 md:py-16 ${className}`}>
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  )
}

// Echte <table>, geen afbeelding. Eerste kolom is een rij-kop.
function DataTable({ caption, head, rows }: { caption: string; head: ReactNode[]; rows: ReactNode[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[var(--navy2)]">
          <tr>
            {head.map((cell, i) => (
              <th key={i} scope="col" className="px-4 py-3 align-top font-semibold text-[var(--text)]">{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-t border-[var(--border)]">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="px-4 py-3 align-top font-semibold text-[var(--text)]">{cell}</th>
                ) : (
                  <td key={c} className="px-4 py-3 align-top leading-relaxed text-[var(--text2)]">{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Pagina ────────────────────────────────────────────────────────────────────

export default function WerkbonSoftwarePage() {
  return (
    <>
      <JsonLd schema={[
        // Commerciële pagina: WebPage met dateModified, geen Article. De
        // SoftwareApplication staat al site-breed; hier alleen de verwijzing.
        webPageSchema({
          path:          WERKBON_PAGE.path,
          name:          TITLE,
          description:   DESCRIPTION,
          datePublished: WERKBON_PAGE.datePublished,
          dateModified:  WERKBON_PAGE.dateModified,
          aboutId:       `${SITE.url}/#software`,
        }),
        breadcrumbSchema([
          { name: 'Home',        href: '/'                 },
          { name: 'Werkbon app', href: WERKBON_PAGE.path   },
        ]),
        faqSchema(faqs),
      ]} />

      {/* ── Hero ── */}
      <LandingHero
        badge="Werkbon app · Digitale handtekening · BRL 100-werkregistratie"
        heading="Werkbon app voor installateurs"
        headingAccent="in koeltechniek en airco."
        meta={<UpdatedOn dateISO={WERKBON_PAGE.dateModified} label="Prijzen en functies gecontroleerd op" />}
        sub="Een werkbon app vervangt de papieren bon: de monteur vult werkzaamheden, meetwaarden en materialen in op telefoon of tablet, de klant tekent op het scherm en de pdf gaat direct naar de klant. Voor een koeltechnisch bedrijf is die werkbon ook de werkregistratie die BRL 100 vraagt. Snellio bouwt de bon daarom rond de installatie, niet rond de klus."
        ctaPrimary={{ label: `Start ${TRIAL_DAGEN} dagen gratis →`, href: '/registreren' }}
        ctaSecondary={{ label: 'Bekijk prijzen', href: '/pricing' }}
        trustLine={`${TRIAL_DAGEN} dagen gratis • Geen creditcard nodig • Alle functies inbegrepen`}
        stats={[
          { value: '<span style="color:var(--cyan)">0</span>',        label: 'papier'                    },
          { value: '1 <span style="color:var(--cyan)">klik</span>',   label: 'van werkbon naar factuur'  },
          { value: '5 <span style="color:var(--cyan)">jaar</span>',   label: 'werkregistratie bewaard'   },
        ]}
      />

      {/* ── 1. Wat is een werkbon app ── */}
      <Section id="wat-is-een-werkbon-app" className="border-y border-[var(--border)] bg-white">
        <h2 className={h2} style={h2Size}>Wat is een werkbon app?</h2>
        <div className={prose}>
          <p>
            Een werkbon app is software waarmee je werkbonnen op locatie digitaal invult, laat ondertekenen en
            verstuurt. Uren, materialen, foto’s, meetwaarden en de handtekening van de klant staan in één document dat
            direct in je administratie zit. Generieke werkbon apps zijn gemaakt voor elke buitendienst. Snellio is
            gemaakt voor koeltechniek en airco: de werkbon hangt aan een installatie, de koeltechnische handelingen
            hebben hun eigen velden, en wat je invult komt in het logboek van die installatie.
          </p>
          <p>
            Snellio is gebouwd door een installateur wiens eigen bedrijf onder BRL 100 werkt:{' '}
            <Link href={PERSON_PATH} className={anchor}>Rudy Snel</Link>.
          </p>
        </div>
      </Section>

      {/* ── 2. Wat moet er op een werkbon staan ── */}
      <Section id="wat-moet-er-op-een-werkbon-staan">
        <h2 className={h2} style={h2Size}>Wat moet er op een werkbon staan?</h2>
        <div className={prose}>
          <p>
            Er is geen wet die de inhoud van een werkbon voorschrijft. Voor een koeltechnisch bedrijf bepalen twee
            documenten wél wat er via de werkbon vastgelegd moet worden: BRL 100 versie 3.0, omdat de werkbon daar de
            werkregistratie per handeling is (§2.5.2), en art. 7 van Verordening (EU) 2024/573, omdat het logboek van
            de installatie uit die registraties wordt opgebouwd.
          </p>
        </div>
        <DataTable
          caption="Wat er op een werkbon van een koeltechnisch bedrijf staat, waarom, en de bron"
          head={['Wat er op de werkbon staat', 'Waarom', 'Bron']}
          rows={werkbonVelden}
        />
        <div className={prose}>
          <p>
            Een generieke werkbon app heeft de bovenste rij en de onderste. De zes rijen ertussen zijn waar een
            koeltechnisch bedrijf zijn audit op haalt of verliest. In Snellio zijn dat vaste velden per type handeling,
            geen vrije tekst.
          </p>
        </div>
      </Section>

      {/* ── 3. Zo werkt het ── */}
      <section id="zo-werkt-het" className="border-y border-[var(--border)] bg-white px-[5%] py-14 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className={h2} style={h2Size}>Zo werkt de werkbon app</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stappen.map(stap => (
              <div key={stap.nr} className="rounded-2xl border border-[var(--border)] bg-[var(--navy2)] p-6">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] font-outfit text-sm font-black text-white">
                  {stap.nr}
                </div>
                <h3 className="mb-2 font-outfit text-[.95rem] font-bold text-[var(--text)]">{stap.titel}</h3>
                <p className="text-[.85rem] leading-relaxed text-[var(--text2)]">{stap.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Functies ── */}
      <LandingFeatures
        label="Functies"
        heading="Wat de werkbon app"
        accent="vastlegt en regelt"
        features={functies}
      />

      {/* ── 5. Handtekening ── */}
      <Section id="handtekening" className="border-y border-[var(--border)] bg-white">
        <h2 className={h2} style={h2Size}>Wat is een handtekening op het scherm juridisch?</h2>
        <div className={prose}>
          <p>
            Een handtekening die de klant op je telefoon of tablet zet, is een elektronische handtekening in de zin
            van Verordening (EU) 910/2014 (eIDAS): gegevens in elektronische vorm die de ondertekenaar gebruikt om te
            ondertekenen (art. 3 punt 10). Art. 25 lid 1 bepaalt dat zo’n handtekening niet als bewijs mag worden
            geweigerd alleen omdat hij elektronisch is of niet gekwalificeerd is.
          </p>
          <p>
            Wat hij niet is: gelijkgesteld aan een handgeschreven handtekening. Dat geldt alleen voor een
            gekwalificeerde elektronische handtekening, met een gekwalificeerd certificaat van een erkende
            dienstverlener (art. 25 lid 2). Een handtekening op een scherm is dat niet, bij Snellio niet en bij geen
            enkele werkbon app.
          </p>
          <p>
            Voor een werkbon is dat in de praktijk zelden een probleem: de bon bewijst dat de klant het werk heeft
            gezien en akkoord is, samen met naam, datum, tijdstip en de rest van het dossier. Voor contracten waar de
            wet een handgeschreven handtekening eist, gebruik je een andere oplossing.
          </p>
        </div>
      </Section>

      {/* ── 6. Zonder / met ── */}
      <LandingProblemsVsOplossingen
        proLabel="Zonder werkbon app"
        opLabel="Met Snellio"
        proHeading="Papier, vrije tekst en <span style='color:var(--orange)'>dubbel invoeren.</span>"
        opHeading="Eén bon, één keer invullen, <span style='color:var(--cyan)'>direct verwerkt.</span>"
        problemen={problemen}
        oplossingen={oplossingen}
      />

      {/* ── 7. Voor wie ── */}
      <section id="voor-wie" className="border-y border-[var(--border)] bg-white px-[5%] py-14 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className={h2} style={h2Size}>Voor wie</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {doelgroepen.map(groep => (
              <div key={groep.titel} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--navy2)] p-6">
                <div className="mt-0.5 shrink-0 text-3xl" aria-hidden="true">{groep.icon}</div>
                <div>
                  <h3 className="mb-2 font-outfit text-[1rem] font-bold text-[var(--text)]">{groep.titel}</h3>
                  <p className="text-[.9rem] leading-relaxed text-[var(--text2)]">{groep.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Prijzen (uit PLANS, BTW, TRIAL_DAGEN) ── */}
      <Section id="wat-kost-het">
        <p className={label}>Prijzen</p>
        <h2 className={h2} style={h2Size}>Wat kost een werkbon app?</h2>
        <div className={prose}>
          <p>
            Je betaalt alleen voor de grootte van je bedrijf. Alle functies zitten in elk pakket: werkbonnen,
            planning, facturatie, F-gassen en BRL 100-werkregistratie. Prijzen per maand, {BTW.short}.
          </p>
        </div>
        <DataTable
          caption="Pakketten van Snellio met maandprijs, monteurs en installaties"
          head={['Pakket', 'Per maand', 'Monteurs inbegrepen', 'Installaties']}
          rows={PLANS.map(plan => [
            plan.name,
            `${fmtEuro(plan.price.month)} ${BTW.short}`,
            plan.monteurs.extra
              ? `${plan.monteurs.inbegrepen}, daarna ${fmtEuro(plan.monteurs.extra.prijs)} per extra monteur`
              : String(plan.monteurs.inbegrepen),
            plan.installaties.label,
          ])}
        />
        <div className={prose}>
          <p>
            Je start met {TRIAL_DAGEN} dagen gratis, zonder betaalgegevens, en kiest je abonnement pas daarna.
            Jaarbetaling en alles wat inbegrepen is:{' '}
            <Link href="/pricing" className={anchor}>prijzen</Link>.
          </p>
        </div>
      </Section>

      {/* ── 9. FAQ (zichtbaar en schema uit dezelfde array) ── */}
      <LandingFaq items={faqs} heading="Veelgestelde vragen over de werkbon app" />

      {/* ── 10. Bronnen ── */}
      <Section id="bronnen">
        <h2 className={h2} style={h2Size}>Bronnen</h2>
        <ol className={`${numbers} text-[.95rem]`}>
          {bronnen.map(bron => (
            <li key={bron.href}>
              {bron.label}:{' '}
              <a href={bron.href} className={`${anchor} break-all`} rel="noopener" target="_blank">
                {bron.href}
              </a>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 11. Lees verder ── */}
      <LandingInternalLinks
        heading="Lees verder"
        links={[
          { href: '/f-gassen-registratie',       icon: '❄️', title: 'F-gassen registratie: het logboek per installatie', desc: 'Art. 7, lekcontrole, flesbalans en kenplaat' },
          { href: '/brl-100-software',           icon: '📄', title: 'BRL 100: wat de auditor van je administratie vraagt', desc: 'Certificaat, audit, logboek en meetinstrumenten' },
          { href: '/planningssoftware-monteurs', icon: '📅', title: 'Planning voor monteurs',                        desc: 'Werkorders inplannen per monteur, met Google Calendar' },
          { href: '/pricing',                    icon: '💶', title: 'Prijzen, alles inbegrepen',                     desc: `Vanaf ${fmtEuro(starter.price.month)} per maand ${BTW.short}` },
        ]}
      />

      {/* ── 12. CTA ── */}
      <p className="mx-auto max-w-2xl px-[5%] pt-16 text-center text-[1rem] leading-relaxed text-[var(--text2)]">
        Maak vandaag je eerste digitale werkbon. {TRIAL_DAGEN} dagen gratis, geen betaalgegevens nodig.
      </p>
      <Cta />
    </>
  )
}
