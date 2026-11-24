import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { articleSchema, breadcrumbSchema, faqSchema, personSchema, PERSON_PATH } from '@/lib/schemas'
import { CERTS, TRIAL_DAGEN } from '@/lib/constants'
import JsonLd               from '@/components/seo/JsonLd'
import UpdatedOn            from '@/components/ui/UpdatedOn'
import LandingHero          from '@/components/sections/LandingHero'
import LandingFaq           from '@/components/sections/LandingFaq'
import LandingInternalLinks from '@/components/sections/LandingInternalLinks'
import Cta                  from '@/components/sections/Cta'
import { FGASSEN_PAGE }     from './meta'

// Informatieve pagina op "f-gassen logboek" (primaire term, positie #5 op
// 14 september 2026). URL blijft. Tekst, bronnen en juridische claims komen
// uit docs/seo-geo/08-pagina-f-gassen-registratie.md en 01-juridische-basis.md.
// Wijk niet af zonder die bestanden bij te werken.
//
// Regels die hier gelden:
// - Logboek per apparaat, 7 gegevens, 5 jaar, kopie bij de installateur:
//   art. 7 van Verordening (EU) 2024/573. Lekcontrolefrequenties en drempels:
//   art. 5 en 6. Kenplaatvelden: art. 12.
// - Werkregistratie per handeling en per circuit (§2.5.2), flesregistratie en
//   F-gassenbalans (§3.3) en instrumentcontroles (§2.5.5 t/m §2.5.7) zijn
//   BRL 100-eisen. Niet aan de verordening toeschrijven, en andersom.
// - TRA en werkvergunning alleen met de framing uit 01-juridische-basis.md §3;
//   een LMRA is nooit een wettelijke eis.
// - Alleen Snellio-functies die in 02-feature-factcheck.md zijn bevestigd.
//   Geen veld voor persoonscertificaten van monteurs claimen tot dat daar staat.
// - FAQ-tekst is byte-gelijk aan het FAQ-schema: één array voor beide.
// - De zichtbare datum is gelijk aan dateModified in het schema (meta.ts).
// - Sectie "Uit de eigen praktijk" pas bouwen na bevestiging door Rudy.

const H1          = 'F-gassen registratie: het logboek per installatie, de lekcontrole en de flesbalans'
const DESCRIPTION =
  'Wat er in het F-gassenlogboek per installatie moet staan (art. 7), wanneer lekcontrole verplicht is (art. 5), wat BRL 100 extra vraagt en hoe Snellio dat vanuit de werkbon bijhoudt.'

export const metadata: Metadata = buildMetadata({
  title:         'F-gassen logboek en registratie: wat verplicht is | Snellio',
  description:   DESCRIPTION,
  path:          FGASSEN_PAGE.path,
  datePublished: FGASSEN_PAGE.datePublished,
  dateModified:  FGASSEN_PAGE.dateModified,
})

// ── Data ──────────────────────────────────────────────────────────────────────

// Screenshot van de flesregistratie, geanonimiseerd, aangeleverd door
// Rudy Snel op 15-09-2026. Article.image (08, bouwinstructies).
const flesFoto = {
  src:           '/koelfles-registratie.png',
  alt:           'Flesregistratie in Snellio: een vulcilinder R-32 met serienummer, bruto-, tarra- en nettogewicht, huidig gewicht, vulstand en de koudemiddelbewegingen per werkorder',
  caption:       'Flesregistratie in Snellio: vulcilinder R-32 met serienummer, gewichten, vulstand en de koudemiddelbewegingen per werkorder. Screenshot: 15 september 2026.',
  datePublished: '2026-09-15',
  width:         1448,
  height:        2344,
}

const kenplaatFoto = {
  src:           '/kenplaat-voorbeeld.png',
  alt:           'Kenplaat van een koelinstallatie geprint vanuit Snellio, met koudemiddel, GWP, nominale vulling, CO₂-equivalent en een QR-code naar het digitale logboek',
  caption:       'Kenplaat uit Snellio met de velden uit art. 12 en een QR-code naar het logboek. Foto: Snel Airco’s, juli 2026.',
  datePublished: '2026-07-20',
  width:         1400,
  height:        933,
}

const bronnen = [
  {
    label: 'Verordening (EU) 2024/573 van het Europees Parlement en de Raad betreffende gefluoreerde broeikasgassen, art. 4, 5, 6, 7 en 12 en bijlage I',
    href:  'https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32024R0573',
  },
  {
    label: 'Rijkswaterstaat, BRL 100 versie 3.0, 5 december 2025, §2.5.2, §2.5.5 tot en met §2.5.7, §3 en §3.3',
    href:  'https://iplo.nl/publish/pages/228185/2025-12-05-brl100-versie-3-0-beveiligd-en-printbaar.pdf',
  },
  {
    label: 'Rijkswaterstaat, Nota ter informatie overgangsregeling BRL 100-certificering',
    href:  'https://iplo.nl/publish/pages/228185/nota-ter-informatie-overgangsregeling-brl100-certificering.pdf',
  },
  {
    label: 'Ondernemersplein (RVO), Certificaat voor werken met F-gassen',
    href:  'https://ondernemersplein.overheid.nl/wetten-en-regels/certificaat-voor-werken-met-f-gassen/',
  },
]

const inHetKort = [
  'Het logboek uit art. 7 hoort bij de installatie en is een plicht van de exploitant. Jij als uitvoerende onderneming bewaart vijf jaar een kopie (art. 7 lid 2).',
  'De plicht geldt voor apparatuur die onder art. 5 lid 1 valt: 5 ton CO₂-equivalent of meer aan F-gassen uit bijlage I, of 1 kg of meer HFO’s uit bijlage II deel 1. Hermetisch gesloten apparatuur onder 10 ton (of onder 3 kg in woningen) is uitgezonderd.',
  'BRL 100 kijkt niet naar die drempel: een gecertificeerd bedrijf registreert elke handeling aan elke installatie, per zelfstandig circuit (BRL 100 v3.0 §2.5.2).',
  'Flesregistratie en de jaarlijkse F-gassenbalans in kilogram én CO₂-equivalent zijn BRL 100-eisen (§3.3), geen eis uit de verordening.',
  'Op de kenplaat zijn alleen de velden uit art. 12 verplicht. Een QR-code naar het logboek is een extra.',
]

const art7Punten = [
  'De hoeveelheid en het type F-gas in het apparaat, met de bij installatie toegevoegde hoeveelheid apart vermeld.',
  'De hoeveelheden die bij onderhoud, service of na een lekkage zijn toegevoegd, met datum.',
  'De hoeveelheid teruggewonnen gas.',
  'Bij toegevoegd gas: of het gerecycled of geregenereerd is, met naam, adres en certificaatnummer van het recycling- of regeneratiebedrijf.',
  'De identiteit van de onderneming die installeerde, servicede, onderhield, terugwon, repareerde, op lekkage controleerde of buiten dienst stelde, met certificaatnummer, en bij een rechtspersoon ook de natuurlijke persoon die het werk deed.',
  'De datums en resultaten van de lekcontroles en van reparaties.',
  'Bij buitendienststelling: de maatregelen voor terugwinning en verwijdering van het gas.',
]

const brl100Eisen: { titel: string; tekst: string }[] = [
  {
    titel: 'Werkregistratie per handeling en per circuit (§2.5.2).',
    tekst: 'Elke handeling aan een installatie wordt vastgelegd, met aparte registratie per zelfstandig circuit. De eigenaar of exploitant krijgt aantoonbaar een kopie, digitaal mag. Het origineel bewaar je minimaal vijf jaar.',
  },
  {
    titel: 'Jaarlijkse F-gassenbalans (§3.3).',
    tekst: 'Per type F-gas, in kilogram én in CO₂-equivalent: ingekocht, gebruikt, teruggewonnen, afgevoerd, voorraad. Verklaarde en niet-verklaarde verschillen benoem je. Zonder registratie per fles is die balans niet te maken.',
  },
  {
    titel: 'Meetinstrumenten (§2.5.5 tot en met §2.5.7).',
    tekst: 'Manometers en vacuümmeters elke 24 maanden vergelijken met een gekalibreerde referentiemeter, thermometers jaarlijks, de weegschaal kalibreren of met een ijkgewicht controleren, en het lekdetectietoestel vóór gebruik testen met een monsterflesje. Van elke controle leg je vast: toestel, datum, meetwaarden, afwijkingen en wie het deed.',
  },
]

const kenplaatVelden = [
  'de vermelding dat het apparaat F-gassen bevat of nodig heeft;',
  'de benaming van het gas (industriële of chemische naam);',
  'de hoeveelheid in kilogram én in CO₂-equivalent, of de ontwerphoeveelheid, en het GWP;',
  'waar van toepassing: “hermetisch gesloten”;',
  'duidelijk leesbaar en onuitwisbaar, bij de service-aansluitingen of op het gasvoerende deel, in de taal van de lidstaat.',
]

const zonderSysteem: { titel: string; tekst: string }[] = [
  {
    titel: 'Logboek in Excel of op papier.',
    tekst: 'Niet gekoppeld aan de werkbon, dus de monteur vult het later in of vergeet het. Bij de audit klopt het logboek niet met de werkbonnen.',
  },
  {
    titel: 'Geen registratie per fles.',
    tekst: 'Dan is de F-gassenbalans van BRL 100 §3.3 niet te maken en blijven verschillen onverklaard.',
  },
  {
    titel: 'Lekcontrole zonder vastgelegde detector.',
    tekst: 'Datum en resultaat staan er wel, maar niet met welk toestel en of het vóór gebruik met een monsterflesje getest is (§2.5.7).',
  },
  {
    titel: 'Geen kopie naar de exploitant.',
    tekst: 'BRL 100 vraagt dat je aantoonbaar een kopie van de werkregistratie hebt overgedragen. Een pdf op je eigen server bewijst dat niet.',
  },
]

const anchor = 'text-[var(--accent)] underline underline-offset-2 hover:text-[var(--text)] transition-colors'

// Alleen wat op 15 september 2026 in de app is bevestigd (02-feature-factcheck.md).
const snellioFuncties: { icon: string; titel: string; tekst: ReactNode }[] = [
  {
    icon:  '📊',
    titel: 'Logboek per installatie, per circuit',
    tekst: 'Elke handeling op de werkbon (vullen, aftappen, lekcontrole, buitendienststelling) komt in het logboek van de installatie, met datum, monteur, hoeveelheid in gram en het resultaat. Het logboek is per installatie te exporteren en te delen met de exploitant.',
  },
  {
    icon:  '🧪',
    titel: 'Koudemiddelregistratie en F-gassenbalans zoals BRL 100 vraagt',
    tekst: 'Je maakt een fles aan met type, serienummer en begingewicht. Bij elke werkbon boek je uit welke fles je hebt gevuld of afgetapt. Snellio houdt het restgewicht per fles bij en telt per periode op wat je nodig hebt voor de balans, in kilogram en CO₂-equivalent.',
  },
  {
    icon:  '🔍',
    titel: 'Lekcontrole met instrumentgegevens',
    tekst: 'Datum en resultaat zoals art. 7 vraagt, plus detector, serienummer, ijkdatum, testmethode, testdruk en standtijd zoals BRL 100 §2.5.7 vraagt. Bij een lekkage leg je oorzaak en maatregel vast. Snellio waarschuwt wanneer de ijkdatum van een lekdetector verloopt.',
  },
  {
    icon:  '🏷️',
    titel: 'Kenplaat met QR-code',
    tekst: 'Printbaar op je eigen labelprinter, met de velden uit art. 12 en een QR-code naar het logboek.',
  },
  {
    icon:  '📤',
    titel: 'Export per installatie en per periode',
    tekst: 'CSV en pdf, voor de auditor van je certificerende instelling, voor de Inspectie Leefomgeving en Transport en voor de exploitant.',
  },
  {
    icon:  '🔗',
    titel: 'Gekoppeld aan werkbon en klant',
    tekst: (
      <>
        De registratie hoort bij de werkbon, de installatie en het klantdossier. Geen tweede systeem, geen
        overtypen. Zie{' '}
        <Link href="/werkbon-software" className={anchor}>werkbon software</Link> en{' '}
        <Link href="/crm-voor-installateurs" className={anchor}>CRM voor installateurs</Link>.
      </>
    ),
  },
  {
    icon:  '🔥',
    titel: 'Brandbare koudemiddelen',
    tekst: 'Bij werk aan R290 en andere brandbare koudemiddelen vraagt BRL 100 versie 3.0 een taakrisicoanalyse als de werkzaamheden risico’s meebrengen, en in een ATEX-gevarenzone aanvullende maatregelen die in het explosieveiligheidsdocument en de werkvergunning staan. Snellio maakt bij zo’n werkorder een veiligheidsdossier aan: een TRA met risico’s en beheersmaatregelen, een werkvergunning waar die nodig is, en een LMRA die de monteur ter plaatse invult. De LMRA is een werkwijze uit de VCA-praktijk, geen wettelijke eis. Het explosieveiligheidsdocument blijft de verantwoordelijkheid van de exploitant.',
  },
  {
    icon:  '📦',
    titel: 'In elk pakket',
    tekst: (
      <>
        Logboek, flesregistratie, balans en kenplaat zitten in elk pakket, ook in Starter. Zie{' '}
        <Link href="/pricing" className={anchor}>prijzen</Link>.
      </>
    ),
  },
]

const doelgroepen: { icon: string; titel: string; tekst: string }[] = [
  {
    icon:  '❄️',
    titel: 'Koeltechnisch installateur (BRL 100 deelgebied I)',
    tekst: 'Werkt aan installaties met F-gassen en koolwaterstoffen en moet elke handeling per circuit vastleggen.',
  },
  {
    icon:  '🔧',
    titel: 'Airco- en warmtepompinstallateur',
    tekst: 'Werkt met R32, R410A en R290. De meeste split-airco’s vallen onder de 5 ton uit art. 5, maar de BRL 100-werkregistratie geldt altijd.',
  },
  {
    icon:  '🏢',
    titel: 'Koeltechnisch servicebedrijf',
    tekst: 'Doet periodieke lekcontroles bij commerciële koelinstallaties boven de drempel en moet datum, resultaat en reparaties per installatie kunnen tonen.',
  },
  {
    icon:  '👷',
    titel: 'Zzp’er met BRL 100 en BRL 200',
    tekst: 'Heeft dezelfde registratieplicht als een bedrijf met personeel, zonder kantoor dat het achteraf invoert.',
  },
]

// Eén array voor de zichtbare FAQ én het FAQPage-schema (byte-gelijk).
const faqs = [
  {
    question: 'Wat is F-gassen registratie?',
    answer:   'F-gassen registratie is het vastleggen van elke handeling met gefluoreerde broeikasgassen in koel-, klimaat- en warmtepompinstallaties: vullen bij installatie, bijvullen bij onderhoud, terugwinnen, lekcontroles, reparaties en buitendienststelling. Verordening (EU) 2024/573 schrijft in art. 7 voor wat er per apparaat in het register moet staan. BRL 100 vraagt daarnaast een werkregistratie per handeling en een jaarlijkse F-gassenbalans.',
  },
  {
    question: 'Wat moet er in het F-gassenlogboek staan?',
    answer:   'Art. 7 lid 1 van Verordening (EU) 2024/573 noemt zeven onderdelen: de hoeveelheid en het type gas in het apparaat, de hoeveelheden die bij onderhoud of na lekkage zijn toegevoegd met datum, de teruggewonnen hoeveelheid, of toegevoegd gas gerecycled of geregenereerd is met de gegevens van dat bedrijf, de onderneming en persoon die het werk deed met certificaatnummer, de datums en resultaten van lekcontroles en reparaties, en bij buitendienststelling de maatregelen voor terugwinning en verwijdering.',
  },
  {
    question: 'Is een logboek verplicht voor een airco?',
    answer:   'Het register uit art. 7 is verplicht voor apparatuur die onder art. 5 lid 1 valt: 5 ton CO₂-equivalent of meer aan F-gassen. Een split-airco met 1,2 kg R32 (GWP 675) bevat 0,81 ton CO₂-equivalent en valt daar niet onder. Een installatie met 3 kg R410A (GWP circa 2 088) zit op 6,26 ton en valt er wel onder. Een BRL 100-gecertificeerd bedrijf legt daarnaast elke handeling vast, ook onder de drempel (BRL 100 v3.0 §2.5.2).',
  },
  {
    question: 'Hoe vaak moet een lekcontrole plaatsvinden?',
    answer:   'Art. 5 lid 6 van Verordening (EU) 2024/573: bij minder dan 50 ton CO₂-equivalent ten minste elke 12 maanden, bij 50 tot 500 ton elke 6 maanden en bij 500 ton of meer elke 3 maanden. Met een lekkagedetectiesysteem verdubbelt de termijn naar 24, 12 en 6 maanden. Vanaf 500 ton is zo’n systeem verplicht (art. 6). Na reparatie van een lekkage volgt een controle na ten minste 24 uur bedrijfstijd en uiterlijk binnen een maand (art. 4 lid 5).',
  },
  {
    question: 'Hoe lang moet je het F-gassenlogboek bewaren?',
    answer:   'Ten minste vijf jaar. Art. 7 lid 2 van Verordening (EU) 2024/573 legt die termijn op aan de exploitant voor het register en aan de onderneming die de werkzaamheden uitvoert voor een kopie. BRL 100 v3.0 §2.5.2 vraagt van het gecertificeerde bedrijf dat het origineel van de werkregistratie minimaal vijf jaar bewaard blijft. In Snellio blijft het logboek per installatie bewaard zolang je account bestaat en is het per installatie te exporteren.',
  },
  {
    question: 'Wat moet er op de kenplaat van een koelinstallatie staan?',
    answer:   'Art. 12 van Verordening (EU) 2024/573 verplicht op het etiket: dat het apparaat F-gassen bevat, de naam van het gas, de hoeveelheid in kilogram en in CO₂-equivalent en het GWP, en waar van toepassing “hermetisch gesloten”. Het etiket moet leesbaar en onuitwisbaar zijn, bij de service-aansluitingen of op het gasvoerende deel, in de taal van de lidstaat. Een QR-code of BRL-nummer is niet verplicht. Snellio print de kenplaat met de velden uit art. 12 en een QR-code naar het logboek, op je eigen labelprinter.',
  },
  {
    question: 'Hoe werkt de flesregistratie in Snellio?',
    answer:   'Je maakt een fles aan met type koudemiddel, serienummer en begingewicht. Bij elke werkbon registreer je hoeveel je uit welke fles hebt gevuld of afgetapt, in gram. Snellio berekent het resterende gewicht en houdt de vulhistorie per fles bij. Per periode telt Snellio op wat je voor de F-gassenbalans van BRL 100 §3.3 nodig hebt: per type F-gas, in kilogram en CO₂-equivalent.',
  },
  {
    question: 'Ondersteunt Snellio R290 en andere brandbare koudemiddelen?',
    answer:   'Ja. Je stelt per installatie het koudemiddel in, ook R290 (propaan), R600a, R32, R410A en andere HFK- en HFO-koudemiddelen. GWP en CO₂-equivalent berekent Snellio voor de balans; R290 is geen F-gas en telt daarin niet mee, maar de werkregistratie van BRL 100 geldt wel. Bij een werkorder met een brandbaar koudemiddel maakt Snellio een veiligheidsdossier aan: een TRA met risico’s en beheersmaatregelen, een werkvergunning waar die nodig is, en een LMRA die de monteur ter plaatse invult en aftekent.',
  },
]

// ── Stijl ─────────────────────────────────────────────────────────────────────

const label   = 'mb-3 font-mono text-[.68rem] uppercase tracking-[.12em] text-[var(--accent)]'
const h2      = 'font-outfit font-black tracking-tight text-[var(--text)] mb-5 scroll-mt-24'
const h2Size  = { fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' } as const
const prose   = 'text-[var(--text2)] text-[1rem] leading-[1.8] space-y-4'
const bullets = 'list-disc pl-5 space-y-2 text-[var(--text2)] text-[1rem] leading-[1.75] marker:text-[var(--accent)]'
const numbers = 'list-decimal pl-5 space-y-2 text-[var(--text2)] text-[1rem] leading-[1.75] marker:font-semibold marker:text-[var(--accent)]'

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

export default function FgassenRegistratiePage() {
  return (
    <>
      <JsonLd schema={[
        articleSchema({
          path:            FGASSEN_PAGE.path,
          title:           H1,
          description:     DESCRIPTION,
          dateISO:         FGASSEN_PAGE.datePublished,
          dateModifiedISO: FGASSEN_PAGE.dateModified,
          image:           flesFoto,
          schemaType:      'Article',
          citation:        bronnen.map(bron => bron.href),
          about:           ['F-gassenregistratie', 'Verordening (EU) 2024/573', 'BRL 100'],
        }),
        personSchema(),
        faqSchema(faqs),
        breadcrumbSchema([
          { name: 'Home',                 href: '/'                 },
          { name: 'F-gassen registratie', href: FGASSEN_PAGE.path   },
        ]),
      ]} />

      {/* ── Hero ── */}
      <LandingHero
        badge="Verordening (EU) 2024/573 · BRL 100 · Logboek · Flesbalans"
        heading="F-gassen registratie: het logboek per installatie,"
        headingAccent="de lekcontrole en de flesbalans."
        meta={
          <UpdatedOn
            dateISO={FGASSEN_PAGE.dateModified}
            by={<>Door <Link href={PERSON_PATH} className="font-medium text-[var(--text2)] underline underline-offset-2 hover:text-[var(--accent)]">Rudy Snel</Link>, oprichter van Snellio en STEK-gecertificeerd installateur</>}
          />
        }
        sub="F-gassen registratie is het vastleggen van elke handeling met koudemiddel: vullen, aftappen, lekcontrole en buitendienststelling. Verordening (EU) 2024/573 verplicht een register per apparaat vanaf 5 ton CO₂-equivalent (art. 7). BRL 100 vraagt daarbovenop een werkregistratie per handeling en een jaarlijkse F-gassenbalans. Snellio houdt dat bij vanuit de werkbon, per installatie en per fles."
        ctaPrimary={{ label: `Start ${TRIAL_DAGEN} dagen gratis →`, href: '/registreren' }}
        ctaSecondary={{ label: 'Bekijk prijzen', href: '/pricing' }}
        trustLine={`${TRIAL_DAGEN} dagen gratis • Geen creditcard nodig • Alle functies inbegrepen`}
        stats={[
          { value: '<span style="color:var(--cyan)">7</span>',      label: 'registerpunten in art. 7'            },
          { value: '5 <span style="color:var(--cyan)">jaar</span>', label: 'bewaren, exploitant én installateur' },
          { value: '<span style="color:var(--cyan)">0</span>',      label: 'keer overtypen vanaf de werkbon'     },
        ]}
      />

      <article>
        {/* ── 1. In het kort ── */}
        <Section id="in-het-kort" className="border-y border-[var(--border)] bg-white">
          <h2 className={h2} style={h2Size}>In het kort</h2>
          <ul className={bullets}>
            {inHetKort.map(punt => <li key={punt}>{punt}</li>)}
          </ul>
        </Section>

        {/* ── 2. Art. 7 ── */}
        <Section id="logboek">
          <h2 className={h2} style={h2Size}>Wat moet er in het F-gassenlogboek staan?</h2>
          <div className={prose}>
            <p>
              Art. 7 lid 1 van Verordening (EU) 2024/573 schrijft per apparaat zeven onderdelen voor. Dit is de lijst
              waar een auditor je logboek naast legt:
            </p>
            <ol className={numbers}>
              {art7Punten.map(punt => <li key={punt}>{punt}</li>)}
            </ol>
            <p>
              Bewaartermijn (art. 7 lid 2): de exploitant bewaart het register ten minste vijf jaar. De onderneming die
              de werkzaamheden uitvoert bewaart ten minste vijf jaar een kopie. Beide stellen het op verzoek beschikbaar
              aan de bevoegde autoriteit, in Nederland de Inspectie Leefomgeving en Transport.
            </p>
            <p>
              Wat er niet in art. 7 staat: het serienummer van je lekdetector, de ijkdatum, de testdruk en de standtijd.
              Die horen bij de BRL 100-eisen aan je meetinstrumenten (§2.5.7), niet bij het wettelijke register. In
              Snellio leg je ze op dezelfde werkbon vast, maar het is goed om te weten welk deel wettelijk is en welk
              deel certificatie.
            </p>
          </div>
        </Section>

        {/* ── 3. Drempels en lekcontrole ── */}
        <Section id="verplicht" className="border-y border-[var(--border)] bg-white">
          <h2 className={h2} style={h2Size}>Voor welke installaties is het logboek verplicht?</h2>
          <div className={prose}>
            <p>
              Het register uit art. 7 geldt voor apparatuur die op grond van art. 5 lid 1 op lekkage moet worden
              gecontroleerd. Dat zijn installaties met 5 ton CO₂-equivalent of meer aan F-gassen uit bijlage I, of 1 kg
              of meer aan HFO’s uit bijlage II deel 1.
            </p>
            <p>
              Uitgezonderd is hermetisch gesloten apparatuur, mits als zodanig geëtiketteerd, onder 10 ton
              CO₂-equivalent (bijlage I) of onder 2 kg (bijlage II deel 1). In woningen geldt voor hermetisch gesloten
              apparatuur een grens van 3 kg.
            </p>
            <p>Rekenvoorbeeld met de GWP-waarden uit bijlage I van de verordening:</p>
          </div>
          <DataTable
            caption="Rekenvoorbeeld: CO₂-equivalent per installatie en of art. 5 en 7 gelden"
            head={['Installatie', 'Koudemiddel', 'GWP (100 jaar)', 'CO₂-equivalent', 'Onder art. 5 en 7?']}
            rows={[
              ['Split-airco, 1,2 kg',   'R32',                       '675',         '0,81 ton', 'Nee, onder 5 ton'],
              ['Split-airco, 7,5 kg',   'R32',                       '675',         '5,06 ton', 'Ja'],
              ['Koelinstallatie, 3 kg', 'R410A (50% R32, 50% R125)', 'circa 2 088', '6,26 ton', 'Ja'],
              ['Warmtepomp, 2 kg',      'R290 (propaan)',            'geen F-gas',  'n.v.t.',   'Nee, geen F-gas. Wel BRL 100-werkregistratie'],
            ]}
          />
          <div className={prose}>
            <p>De frequentie van de lekcontrole hangt af van de vulling (art. 5 lid 6):</p>
          </div>
          <DataTable
            caption="Frequentie van de lekcontrole per vulling, art. 5 lid 6 van Verordening (EU) 2024/573"
            head={['Vulling bijlage I', 'Vulling bijlage II deel 1', 'Zonder lekkagedetectiesysteem', 'Met lekkagedetectiesysteem']}
            rows={[
              ['minder dan 50 ton CO₂-eq', 'minder dan 10 kg', 'ten minste elke 12 maanden', 'ten minste elke 24 maanden'],
              ['50 tot 500 ton CO₂-eq',    '10 tot 100 kg',    'ten minste elke 6 maanden',  'ten minste elke 12 maanden'],
              ['500 ton CO₂-eq of meer',   '100 kg of meer',   'ten minste elke 3 maanden',  'ten minste elke 6 maanden'],
            ]}
          />
          <div className={prose}>
            <p>
              Vanaf 500 ton CO₂-equivalent is een lekkagedetectiesysteem verplicht (art. 6). Na een reparatie van een
              lekkage volgt een controle door een gecertificeerde persoon, op z’n vroegst na 24 uur bedrijfstijd en
              uiterlijk binnen een maand (art. 4 lid 5).
            </p>
            <p>
              Voor jou als BRL 100-bedrijf verandert de drempel weinig. BRL 100 v3.0 §2.5.2 vraagt een werkregistratie
              van elke handeling aan elke installatie, ook onder de 5 ton en ook bij R290. Het verschil zit in wie
              verantwoordelijk is: onder de drempel is er geen wettelijk register van de exploitant, maar jouw
              werkregistratie moet er altijd zijn.
            </p>
          </div>
        </Section>

        {/* ── 4. BRL 100 ── */}
        <Section id="brl-100">
          <h2 className={h2} style={h2Size}>Wat BRL 100 daar bovenop vraagt</h2>
          <div className={prose}>
            <p>
              BRL 100 versie 3.0 (Rijkswaterstaat, 5 december 2025, formeel in werking op 31 augustus 2026) stelt drie
              registratie-eisen die niet in de verordening staan:
            </p>
            <ul className={bullets}>
              {brl100Eisen.map(eis => (
                <li key={eis.titel}>
                  <strong className="text-[var(--text)]">{eis.titel}</strong> {eis.tekst}
                </li>
              ))}
            </ul>
            <p>
              Bij de audit controleert de certificerende instelling onder meer of het logboek is aangevuld, of de
              gegevens uit art. 7 kloppen, of de drukbeproeving op de werkbon staat en of het logboek aan de eigenaar is
              overgedragen. Wat de auditor verder toetst, staat in{' '}
              <Link href="/brl-100-software" className={anchor}>BRL 100: wat de auditor van je administratie vraagt</Link>.
            </p>
          </div>
        </Section>

        {/* ── 5. Kenplaat ── */}
        <Section id="kenplaat" className="border-y border-[var(--border)] bg-white">
          <h2 className={h2} style={h2Size}>De kenplaat: wat verplicht is en wat extra</h2>
          <div className={prose}>
            <p>
              Art. 12 van de verordening bepaalt wat er op het etiket van koel-, klimaat- en warmtepompapparatuur moet
              staan:
            </p>
            <ul className={bullets}>
              {kenplaatVelden.map(veld => <li key={veld}>{veld}</li>)}
            </ul>
            <p>
              Een QR-code, het BRL-nummer van je bedrijf of je bedrijfsgegevens zijn niet wettelijk verplicht. BRL 100
              §3 vraagt wel dat je bij elke installatie vaststelt of het etiket volgens art. 12 aanwezig is, en de
              exploitant wijst op het ontbreken ervan.
            </p>
            <p>
              Snellio print een kenplaat met de velden uit art. 12 en daarbij een QR-code naar het logboek van de
              installatie, op je eigen labelprinter. Wie de code scant, ziet de specificaties en de werkhistorie bij het
              apparaat. Hoe dat werkt:{' '}
              <Link href="/blog/digitaal-logboek-qr-kenplaat" className={anchor}>De kenplaat wordt digitaal</Link>.
            </p>
          </div>
          <figure className="mt-6">
            <div className="overflow-hidden rounded-xl bg-white shadow-[0_16px_48px_rgba(15,33,51,.12)] ring-1 ring-[var(--border)]">
              <Image
                src={kenplaatFoto.src}
                alt={kenplaatFoto.alt}
                width={kenplaatFoto.width}
                height={kenplaatFoto.height}
                className="block h-auto w-full"
                sizes="(min-width: 768px) 720px, 92vw"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-[var(--muted2)]">{kenplaatFoto.caption}</figcaption>
          </figure>
        </Section>

        {/* ── 6. Zonder systeem ── */}
        <Section id="zonder-systeem">
          <h2 className={h2} style={h2Size}>Waar het misgaat zonder systeem</h2>
          <ul className={bullets}>
            {zonderSysteem.map(punt => (
              <li key={punt.titel}>
                <strong className="text-[var(--text)]">{punt.titel}</strong> {punt.tekst}
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 7. Hoe Snellio dit bijhoudt ── */}
        <section id="snellio" className="border-y border-[var(--border)] bg-white px-[5%] py-14 md:py-16">
          <div className="mx-auto max-w-5xl">
            <p className={label}>Hoe Snellio de registratie bijhoudt</p>
            <h2 className={h2} style={h2Size}>Logboek, flessen, lekcontrole en kenplaat vanuit de werkbon</h2>
            <p className="mb-8 max-w-3xl text-[1rem] leading-[1.8] text-[var(--text2)]">
              Alleen wat op 15 september 2026 in de app is bevestigd.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {snellioFuncties.map(functie => (
                <div key={functie.titel} className="rounded-2xl border border-[var(--border)] bg-[var(--navy2)] p-6">
                  <div className="mb-3 text-2xl" aria-hidden="true">{functie.icon}</div>
                  <h3 className="mb-2 font-outfit text-[1rem] font-bold text-[var(--text)]">{functie.titel}</h3>
                  <p className="text-[.9rem] leading-relaxed text-[var(--text2)]">{functie.tekst}</p>
                </div>
              ))}
            </div>
            <figure className="mx-auto mt-10 max-w-[440px]">
              <div className="overflow-hidden rounded-xl bg-white shadow-[0_16px_48px_rgba(15,33,51,.12)] ring-1 ring-[var(--border)]">
                <Image
                  src={flesFoto.src}
                  alt={flesFoto.alt}
                  width={flesFoto.width}
                  height={flesFoto.height}
                  className="block h-auto w-full"
                  sizes="(min-width: 768px) 440px, 92vw"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs text-[var(--muted2)]">{flesFoto.caption}</figcaption>
            </figure>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {CERTS.map(cert => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--navy3)] px-4 py-2 font-mono text-xs text-[var(--text2)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. Voor wie ── */}
        <section id="voor-wie" className="px-[5%] py-14 md:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className={h2} style={h2Size}>Voor wie</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {doelgroepen.map(groep => (
                <div key={groep.titel} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-6">
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

        {/* ── 9. FAQ (zichtbaar en schema uit dezelfde array) ── */}
        <LandingFaq items={faqs} heading="Veelgestelde vragen over F-gassen registratie" />

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
      </article>

      {/* ── 11. Lees verder ── */}
      <LandingInternalLinks
        heading="Lees verder"
        links={[
          { href: '/brl-100-software',                 icon: '📄', title: 'BRL 100: wat de auditor van je administratie vraagt', desc: 'Certificaat, audit, logboek, F-gassenbalans en meetinstrumenten' },
          { href: '/blog/digitaal-logboek-qr-kenplaat', icon: '🏷️', title: 'De kenplaat wordt digitaal: het logboek achter een QR-code', desc: 'Hoe de QR-code op de kenplaat naar het logboek verwijst' },
          { href: '/blog/f-gas-verordening-2024',       icon: '🇪🇺', title: 'EU F-gas verordening 2024/573: wat verandert er', desc: 'De belangrijkste wijzigingen ten opzichte van 517/2014' },
          { href: '/werkbon-software',                  icon: '📋', title: 'Werkbon software: de registratie begint op de werkbon', desc: 'Digitale werkbonnen met handtekening en koudemiddelhandelingen' },
        ]}
      />

      {/* ── 12. CTA ── */}
      <p className="mx-auto max-w-2xl px-[5%] pt-16 text-center text-[1rem] leading-relaxed text-[var(--text2)]">
        Probeer de registratie {TRIAL_DAGEN} dagen gratis met je eigen installaties en flessen. Geen betaalgegevens nodig.
      </p>
      <Cta />
    </>
  )
}
