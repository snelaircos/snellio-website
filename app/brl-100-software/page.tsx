import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { articleSchema, breadcrumbSchema, faqSchema, personSchema, PERSON_PATH } from '@/lib/schemas'
import { BTW, TRIAL_DAGEN } from '@/lib/constants'
import { fmtEuro, planById } from '@/lib/pricing'
import JsonLd               from '@/components/seo/JsonLd'
import UpdatedOn            from '@/components/ui/UpdatedOn'
import Button               from '@/components/ui/Button'
import LandingInternalLinks from '@/components/sections/LandingInternalLinks'
import { BRL100_PAGE }      from './meta'

// Informatieve pagina op "brl 100" (primaire term). Tekst, bronnen en
// juridische claims komen uit docs/seo-geo/04-pagina-brl-100-software.md en
// 01-juridische-basis.md. Wijk niet af zonder die bestanden bij te werken.
//
// Regels die hier gelden:
// - Flesregistratie en F-gassenbalans zijn BRL 100-eisen; het logboek per
//   apparaat is art. 7 van Verordening (EU) 2024/573. Niet door elkaar halen.
// - TRA en werkvergunning alleen met de framing uit 01-juridische-basis.md §3;
//   een LMRA is nooit een wettelijke eis.
// - Alleen Snellio-functies die in 02-feature-factcheck.md zijn bevestigd.
// - FAQ-tekst is byte-gelijk aan het FAQ-schema: één array voor beide.
// - De zichtbare datum is gelijk aan dateModified in het schema (meta.ts).

const H1          = 'BRL 100: wat de auditor van je administratie vraagt'
const DESCRIPTION =
  'BRL 100 versie 3.0 uitgelegd voor koeltechnische installatiebedrijven: certificaat, audit, logboek, F-gassenbalans, meetinstrumenten en welke software daarbij helpt.'

export const metadata: Metadata = buildMetadata({
  title:         'BRL 100: wat de audit van je administratie vraagt, en welke software helpt | Snellio',
  description:   DESCRIPTION,
  path:          BRL100_PAGE.path,
  datePublished: BRL100_PAGE.datePublished,
  dateModified:  BRL100_PAGE.dateModified,
})

const starter = planById('starter')

// ── Data ──────────────────────────────────────────────────────────────────────

const kenplaatFoto = {
  src:           '/kenplaat-voorbeeld.png',
  alt:           'Kenplaat van een koelinstallatie geprint vanuit Snellio, met koudemiddel, GWP, nominale vulling, CO2-equivalent en een QR-code naar het digitale logboek',
  caption:       'Kenplaat geprint vanuit Snellio: de wettelijke velden uit art. 12, plus een QR-code naar het digitale logboek. Foto: juli 2026.',
  datePublished: '2026-07-20',
  width:         1400,
  height:        933,
}

const bronnen = [
  {
    label: 'Verordening (EU) 2024/573, art. 4, 5, 6, 7 en 12',
    href:  'https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32024R0573',
  },
  {
    label: 'Beoordelingsrichtlijn BRL 100 versie 3.0, Rijkswaterstaat, 5 december 2025 (pdf via IPLO)',
    href:  'https://iplo.nl/publish/pages/228185/2025-12-05-brl100-versie-3-0-beveiligd-en-printbaar.pdf',
  },
  {
    label: 'Nota ter informatie overgangsregeling BRL100 certificering, Rijkswaterstaat (pdf via IPLO)',
    href:  'https://iplo.nl/publish/pages/228185/nota-ter-informatie-overgangsregeling-brl100-certificering.pdf',
  },
  {
    label: 'Ondernemersplein (RVO), Certificaat voor werken met F-gassen en andere koudemiddelen',
    href:  'https://ondernemersplein.overheid.nl/wetten-en-regels/certificaat-voor-werken-met-f-gassen/',
  },
  {
    label: 'Arbeidsomstandighedenbesluit, art. 3.5c explosieveiligheidsdocument',
    href:  'https://wetten.overheid.nl/BWBR0008498/2026-08-01/#Hoofdstuk3_Afdeling1_Paragraaf2a_Artikel3.5c',
  },
  {
    label: 'Kiwa, BRL 100 geüpdatet: dit verandert er met versie 3.0 (4 maart 2026) en FAQ',
    href:  'https://www.kiwa.com/nl/nl/expertisegebieden/energietransitie/nieuws/brl-100-geupdatet-dit-verandert-er-met-versie-3.0',
  },
]

const faqs = [
  {
    question: 'Is BRL 100 verplicht voor een zzp’er?',
    answer:   'Ja. Ondernemersplein (RVO) stelt dat een zzp’er die met F-gassen werkt zowel een persoonscertificaat (BRL 200) als een bedrijfscertificaat (BRL 100) moet hebben. De administratie-eisen gelden dus ook voor een eenmanszaak.',
  },
  {
    question: 'Wanneer gaat BRL 100 versie 3.0 in?',
    answer:   'Versie 3.0 is op 5 december 2025 vastgesteld en op 31 augustus 2026 formeel in werking getreden. Je eerstvolgende reguliere audit daarna is een transitie-audit. Versie 2.0-certificaten blijven geldig tot uiterlijk 31 augustus 2028 (Nota overgangsregeling, Rijkswaterstaat).',
  },
  {
    question: 'Moet ik door versie 3.0 een extra audit doen?',
    answer:   'Nee. De transitie-audit vervangt je reguliere audit en leidt niet tot een extra inspectie binnen zes maanden. Vraag je een uitbreiding naar deelgebied II (CO₂) of III (ammoniak) aan, dan volgt wel een uitbreidingsaudit met een inspectie binnen zes maanden.',
  },
  {
    question: 'Wat is het verschil tussen BRL 100 en BRL 200?',
    answer:   'BRL 100 is het certificaat van de onderneming, BRL 200 het persoonscertificaat van de monteur. Een bedrijf kan alleen BRL 100-gecertificeerd zijn als de monteurs die de handelingen uitvoeren BRL 200-gecertificeerd zijn.',
  },
  {
    question: 'Hoe lang moet ik werkregistraties bewaren?',
    answer:   'Minimaal vijf jaar. Dat geldt voor de exploitant én voor de onderneming die het werk uitvoert (art. 7 lid 2, Verordening (EU) 2024/573; BRL 100 §2.5.2).',
  },
  {
    question: 'Is een taakrisicoanalyse verplicht bij R290?',
    answer:   'BRL 100 versie 3.0 noemt een TRA “noodzakelijk” zodra de werkzaamheden risico’s meebrengen en maakt het raadplegen van het explosieveiligheidsdocument van de exploitant onderdeel van die analyse. Het explosieveiligheidsdocument zelf is wettelijk verplicht op grond van Arbobesluit art. 3.5c als een explosieve atmosfeer kan voorkomen. Een LMRA is geen wettelijke of BRL-eis, maar gangbare praktijk.',
  },
  {
    question: 'Wat kost een BRL 100-certificering?',
    answer:   'De certificerende instellingen werken met een offerte op maat, afhankelijk van deelgebieden en bedrijfsgrootte. Er is geen vaste lijstprijs; vraag offertes op bij ten minste twee instellingen.',
  },
]

// ── Stijl ─────────────────────────────────────────────────────────────────────

const label   = 'mb-3 font-mono text-[.68rem] uppercase tracking-[.12em] text-[var(--accent)]'
const h2      = 'font-outfit font-black tracking-tight text-[var(--text)] mb-5 scroll-mt-24'
const h2Size  = { fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' } as const
const h3      = 'font-outfit font-bold text-[var(--text)] text-lg mt-9 mb-3'
const prose   = 'text-[var(--text2)] text-[1rem] leading-[1.8] space-y-4'
const anchor  = 'text-[var(--accent)] underline underline-offset-2 hover:text-[var(--text)] transition-colors'
const bullets = 'list-disc pl-5 space-y-2 text-[var(--text2)] text-[1rem] leading-[1.75] marker:text-[var(--accent)]'
const numbers = 'list-decimal pl-5 space-y-2 text-[var(--text2)] text-[1rem] leading-[1.75] marker:font-semibold marker:text-[var(--accent)]'
const primary =
  'inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_6px_24px_rgba(0,144,184,.3)] transition hover:-translate-y-0.5 hover:bg-[#007a9c]'

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

export default function Brl100SoftwarePage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: 'Home',    href: '/' },
            { name: 'BRL 100', href: BRL100_PAGE.path },
          ]),
          articleSchema({
            path:            BRL100_PAGE.path,
            title:           H1,
            description:     DESCRIPTION,
            dateISO:         BRL100_PAGE.datePublished,
            dateModifiedISO: BRL100_PAGE.dateModified,
            schemaType:      'Article',
            image:           kenplaatFoto,
            citation:        bronnen.map(b => b.href),
            about:           ['BRL 100', 'F-gassenverordening', 'Koeltechniek'],
          }),
          faqSchema(faqs),
          personSchema(),
        ]}
      />

      <article>
        {/* ── Kop ── */}
        <header className="px-[5%] pb-10 pt-28 md:pt-32">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[var(--muted2)]">
              <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-[var(--text2)]">BRL 100</span>
            </nav>
            <p className={label}>Regelgeving · Koeltechniek</p>
            <h1
              className="mb-4 font-outfit font-black leading-[1.08] tracking-tight text-[var(--text)]"
              style={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.1rem)' }}
            >
              {H1}
            </h1>
            <UpdatedOn
              dateISO={BRL100_PAGE.dateModified}
              by={<>Door <span className="font-medium text-[var(--text2)]">Rudy Snel</span>, oprichter van Snellio en STEK-gecertificeerd installateur</>}
              className="mb-7"
            />
            <p className="border-l-[3px] border-[var(--accent)] pl-4 text-[1.05rem] leading-relaxed text-[var(--text2)] md:text-lg">
              BRL 100 is de Nederlandse beoordelingsrichtlijn waarmee installatiebedrijven het wettelijk
              verplichte bedrijfscertificaat voor werken met F-gassen en natuurlijke koudemiddelen halen en
              behouden. Versie 3.0 is op 5 december 2025 vastgesteld en geldt formeel vanaf 31 augustus 2026.
              Software helpt vooral bij wat de audit toetst: werkregistraties per installatie, de jaarlijkse
              F-gassenbalans en de controle van meetinstrumenten.
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6">
              <p className="mb-3 font-outfit text-base font-bold text-[var(--text)]">In het kort</p>
              <ul className={`${bullets} text-[.95rem]`}>
                <li>
                  Een bedrijfscertificaat op basis van BRL 100 is verplicht voor elke onderneming, ook een zzp’er,
                  die werkt aan koel-, klimaat- of warmtepompinstallaties met F-gassen of natuurlijke koudemiddelen
                  (Besluit gefluoreerde broeikasgassen; Ondernemersplein).
                </li>
                <li>
                  BRL 100 gaat over het bedrijf, BRL 200 over de monteur, en het logboek uit artikel 7 van de
                  F-gassenverordening over de installatie. Drie verschillende dingen die op één audit samenkomen.
                </li>
                <li>
                  Versie 3.0: geen versie 2.0-certificaten meer na 31 augustus 2026, transitie-audit bij je
                  eerstvolgende reguliere audit, versie 2.0 vervalt op 31 augustus 2028 (Nota overgangsregeling,
                  Rijkswaterstaat).
                </li>
                <li>
                  De auditor toetst of je werkregistraties per handeling en per circuit compleet zijn, of je
                  F-gassenbalans sluit, of je meetinstrumenten aantoonbaar zijn gecontroleerd, en of je monteurs
                  het juiste persoonscertificaat hebben.
                </li>
                <li>
                  Zowel de exploitant als de onderneming die het werk uitvoert bewaart de registergegevens ten
                  minste vijf jaar (art. 7 lid 2, Verordening (EU) 2024/573).
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* ── 1. Wat is BRL 100? ── */}
        <Section id="wat-is-brl-100">
          <h2 className={h2} style={h2Size}>Wat is BRL 100?</h2>
          <div className={prose}>
            <p>
              BRL 100 is de “Beoordelingsrichtlijn voor het certificaat voor ondernemingen in overeenstemming met
              Verordening (EU) 2024/573”. Rijkswaterstaat is schemabeheerder; certificerende instellingen zoals
              Kiwa, DEKRA, SGS, Bureau Veritas, CIBV en ECH-Groep voeren de beoordelingen uit en geven het
              certificaat af. De Inspectie Leefomgeving en Transport houdt toezicht. Of een bedrijf gecertificeerd
              is, controleer je in het Centraal Register Techniek.
            </p>
            <p>
              De verplichting zelf staat niet in de BRL maar in het Besluit gefluoreerde broeikasgassen en
              ozonlaagafbrekende stoffen, dat de Europese F-gassenverordening en de Uitvoeringsverordeningen (EU)
              2024/2215 en 2025/625 in Nederland uitvoert. De BRL beschrijft de eisen die een certificerende
              instelling hanteert om het certificaat af te geven en in stand te houden: kwaliteitssysteem,
              procedures, werkinstructies, meetinstrumenten, registraties en personeel.
            </p>
            <p>
              Voor een koeltechnisch installatiebedrijf betekent dat: zonder BRL 100-certificaat mag je niet
              installeren, onderhouden, repareren, op lekkage controleren of buiten dienst stellen aan installaties
              met F-gassen, koolwaterstoffen zoals R290, CO₂ of ammoniak.
            </p>
          </div>
        </Section>

        {/* ── 2. Drie dingen die door elkaar lopen ── */}
        <Section id="brl-100-brl-200-logboek" className="border-y border-[var(--border)] bg-white">
          <h2 className={h2} style={h2Size}>
            BRL 100, BRL 200 en F-gassenregistratie: drie dingen die door elkaar lopen
          </h2>
          <div className={prose}>
            <p>
              BRL 100 is het certificaat van het bedrijf, BRL 200 het persoonscertificaat van de monteur, en de
              F-gassenregistratie is het logboek per installatie dat de Europese verordening voorschrijft. Bij een
              audit worden ze alle drie getoetst, maar ze hebben elk een eigen grondslag.
            </p>
          </div>
          <DataTable
            caption="Verschil tussen BRL 100, BRL 200 en het F-gassenlogboek"
            head={['', 'BRL 100', 'BRL 200', 'F-gassenregistratie (logboek)']}
            rows={[
              [
                'Wie of wat',
                'De onderneming (per KvK-vestiging)',
                'De natuurlijke persoon die de handelingen uitvoert',
                'De installatie (per zelfstandig circuit)',
              ],
              [
                'Grondslag',
                'Besluit gefluoreerde broeikasgassen; BRL 100 v3.0 (RWS, 5 dec 2025)',
                'Uitvoeringsverordening (EU) 2024/2215; BRL 200 v2.0',
                'Art. 7 Verordening (EU) 2024/573; BRL 100 §2.5.2',
              ],
              [
                'Wat het vraagt',
                'Kwaliteitssysteem, procedures, werkinstructies, gecontroleerde meetinstrumenten, registraties, jaarlijkse F-gassenbalans, gecertificeerd personeel',
                'Examen bij een erkende instelling (STEK, PBNA, STE Examenbureau en andere); categorieën A1, A2, B, C, D of E',
                'Hoeveelheid en type gas, toevoegingen, terugwinning, uitvoerende onderneming en persoon, lekcontroles en reparaties, buitendienststelling',
              ],
              [
                'Wie bewaart',
                'De onderneming: originele werkregistraties 5 jaar',
                'n.v.t.',
                'Exploitant 5 jaar; de uitvoerende onderneming 5 jaar een kopie',
              ],
              ['Zzp’er', 'Verplicht', 'Verplicht', 'Verplicht als je de werkzaamheden uitvoert'],
            ]}
          />
          <div className={prose}>
            <p>
              Een zzp’er heeft dus twee certificaten nodig, BRL 200 voor zichzelf en BRL 100 voor de eenmanszaak
              (Ondernemersplein, RVO). De administratie-eisen van BRL 100 gelden onverkort, ook zonder personeel.
            </p>
          </div>
        </Section>

        {/* ── 3. Versie 3.0 ── */}
        <Section id="versie-3-0">
          <h2 className={h2} style={h2Size}>Wat verandert er met versie 3.0?</h2>
          <div className={prose}>
            <p>
              Versie 3.0 verbreedt de scope naar natuurlijke koudemiddelen en mobiele apparatuur en voegt
              expliciete veiligheidseisen toe; de registratie-eisen bestonden al. De datums komen uit de Nota
              overgangsregeling van Rijkswaterstaat en de tijdlijn van Kiwa (4 maart 2026).
            </p>
          </div>
          <ul className={`${bullets} mt-5`}>
            <li><strong className="text-[var(--text)]">5 december 2025</strong>: versie 3.0 vastgesteld door Rijkswaterstaat.</li>
            <li>
              <strong className="text-[var(--text)]">Tot 31 augustus 2026</strong>: certificerende instellingen halen accreditatie bij de
              Raad voor Accreditatie. Tot die tijd wordt nog op versie 2.0 geauditeerd.
            </li>
            <li>
              <strong className="text-[var(--text)]">31 augustus 2026</strong>: versie 3.0 formeel in werking. Geen nieuwe versie
              2.0-certificaten meer. Nieuwe aanvragen worden alleen nog tegen 3.0 beoordeeld.
            </li>
            <li>
              <strong className="text-[var(--text)]">Vanaf 1 september 2026</strong>: je eerstvolgende reguliere audit is een
              transitie-audit. Geen extra audit, geen extra inspectie binnen zes maanden; je bestaande cyclus loopt door.
            </li>
            <li>
              <strong className="text-[var(--text)]">31 augustus 2028</strong>: versie 2.0 vervalt. Certificaten onder 2.0 zijn tot
              uiterlijk dan geldig, met een hersteltermijn voor afwijkingen tot 30 november 2028.
            </li>
          </ul>
          <h3 className={h3}>Inhoudelijk nieuw</h3>
          <ul className={bullets}>
            <li>
              <strong className="text-[var(--text)]">Drie deelgebieden</strong> op het certificaat: I F-gassen en koolwaterstoffen
              (zoals R290), II CO₂, III ammoniak. Je wordt gecertificeerd voor de deelgebieden waarin je werkt.
            </li>
            <li>
              <strong className="text-[var(--text)]">Mobiele apparatuur</strong> valt nu onder de scope: lichte koelvoertuigen,
              reefers, gekoelde treinwagons.
            </li>
            <li>
              <strong className="text-[var(--text)]">Veiligheid</strong>: de BRL stelt dat een taakrisicoanalyse “noodzakelijk” is
              als de werkzaamheden risico’s meebrengen, en dat het controleren en nalezen van het
              explosieveiligheidsdocument van de exploitant onderdeel is van die analyse. Bij werk in een
              ATEX-gevarenzone staan de aanvullende maatregelen in het explosieveiligheidsdocument en in de
              werkvergunning. De BRL verwijst naar PGS 13, NPR 7600 en NPR 7601.
            </li>
            <li>
              <strong className="text-[var(--text)]">Personeel</strong>: tijdens audits na 31 augustus 2026 beoordeelt de
              certificerende instelling de voortgang van BRL 200-kwalificaties; aantoonbaar geplande opleiding en
              examen gelden niet direct als ernstige tekortkoming (overgangsregeling §8.1).
            </li>
          </ul>
          <div className={`${prose} mt-5`}>
            <p>
              Volgens de FAQ van Kiwa is voor A3-koudemiddelen zoals propaan sinds 29 september 2025 een
              aanvullende B1- of B3-certificering nodig, en vervallen oude persoonscertificeringen op 12 maart 2029.
              Controleer dit bij je exameninstelling; het is een uitleg van een certificerende instelling, geen
              wettekst.
            </p>
          </div>
        </Section>

        {/* ── 4. Wat toetst de auditor ── */}
        <Section id="wat-toetst-de-auditor" className="border-y border-[var(--border)] bg-white">
          <h2 className={h2} style={h2Size}>Wat toetst de auditor in je administratie?</h2>
          <div className={prose}>
            <p>
              De auditor toetst vier dingen: of elke handeling is geregistreerd en overgedragen, of de
              F-gassenbalans per type gas sluit, of je meetinstrumenten aantoonbaar zijn gecontroleerd, en of je
              procedures en werkinstructies bestaan én worden toegepast. Dit staat in hoofdstuk 2 en 3 en
              hoofdstuk 6 (initiële beoordeling en inspecties) van BRL 100 v3.0.
            </p>
          </div>

          <h3 className={h3}>Registraties (§2.5.2, logboek)</h3>
          <ul className={bullets}>
            <li>Van elke handeling aan een installatie maakt de onderneming een werkregistratie met de vereiste gegevens.</li>
            <li>Van elk zelfstandig circuit een aparte registratie.</li>
            <li>De installateur geeft de eigenaar of exploitant aantoonbaar een kopie (mag digitaal).</li>
            <li>De onderneming bewaart het origineel minimaal 5 jaar.</li>
          </ul>
          <div className={`${prose} mt-4`}>
            <p>
              Bij een inspectie controleert de certificerende instelling onder meer of het logboek correct is
              aangevuld, of de gegevens uit artikel 7 van de verordening juist zijn gedocumenteerd, of de
              drukbeproeving op de werkbon is geregistreerd, of het vacumeren met een standtijd van ten minste 30
              minuten is uitgevoerd conform de eigen werkinstructie, en of het logboek aan de eigenaar is
              overgedragen.
            </p>
          </div>

          <h3 className={h3}>F-gassenbalans (§3.3)</h3>
          <div className={prose}>
            <p>
              Per type F-gas dat je gebruikt stel je jaarlijks een balans op in kilogrammen én CO₂-equivalenten:
              ingekocht, toegevoegd aan installaties, teruggewonnen, verkocht, afgevoerd. Verklaarde en
              niet-verklaarde verschillen moet je benoemen. De BRL staat toe dat de certificerende instelling de
              CO₂-equivalenten berekent, maar de brongegevens komen van jou.
            </p>
          </div>

          <h3 className={h3}>Meetinstrumenten (§2.5.5 t/m §2.5.7)</h3>
          <ul className={bullets}>
            <li>Manometers en vacuümmeters: elke 24 maanden vergelijken met een gekalibreerde referentiemeter, met registratie.</li>
            <li>Thermometers: jaarlijks controleren (ijswater of referentiemeter).</li>
            <li>
              Weegschaal: óf kalibratie door een kalibratie-instelling elke 24 maanden, óf controle met een
              ijkgewicht elke 12 maanden. Beide met registratie: identificatie, meetwaarden, afwijkingen,
              uitvoerende medewerker.
            </li>
            <li>
              Lekdetectietoestel: vóór gebruik testen met een monsterflesje, met registratie van toestel, datum,
              monsterflesje, gemeten waarden en afwijkingen. Detecteert het toestel niets, dan is het flesje leeg
              of het toestel defect.
            </li>
          </ul>

          <h3 className={h3}>Procedures en werkinstructies (§2.5)</h3>
          <div className={prose}>
            <p>
              Procedures voor: de instrumenten en hoe je hun goede werking controleert; welke persoonscertificaten
              je personeel moet hebben; hoe het logboek wordt bijgehouden; het 5 jaar bewaren; de technische
              informatie die je bij oplevering aan de eigenaar geeft. Werkinstructies voor: drukbeproeving,
              vacumeren, vullen, verwijderen van koudemiddel, inbedrijfstelling, lekkagecontrole, het maken van een
              risicoanalyse en het gebruik van persoonlijke beschermingsmiddelen. De BRL noemt expliciet een
              “controlesystematiek werkbonnen”: controle op correcte uitvoering en registratie.
            </p>
          </div>

          <h3 className={h3}>Kenplaat (§3)</h3>
          <div className={prose}>
            <p>
              De onderneming stelt vast of de installatie een etiket heeft zoals bedoeld in artikel 12 van de
              verordening en wijst de exploitant op het ontbreken ervan. Wettelijk verplicht op dat etiket (art. 12
              lid 3 en 4): de vermelding dat het F-gassen bevat, de benaming van het gas, de hoeveelheid in gewicht
              en in CO₂-equivalent, het GWP, en waar van toepassing “hermetisch gesloten”; leesbaar, onuitwisbaar,
              nabij de service-aansluitingen, in het Nederlands. Een QR-code of je BRL-nummer is geen wettelijke
              eis; dat is een praktische toevoeging.
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

        {/* ── 5. Art. 7 ── */}
        <Section id="logboek-artikel-7">
          <h2 className={h2} style={h2Size}>Wat de F-gassenverordening zelf van het logboek vraagt</h2>
          <div className={prose}>
            <p>
              Artikel 7 van Verordening (EU) 2024/573 schrijft per installatie die onder de lekcontroleplicht valt
              een register voor met zeven soorten gegevens, vijf jaar bewaard door de exploitant én als kopie door
              de uitvoerende onderneming.
            </p>
          </div>
          <h3 className={h3}>De zeven gegevens (art. 7 lid 1)</h3>
          <ol className={numbers}>
            <li>Hoeveelheid en type gas in de apparatuur, met de bij installatie toegevoegde hoeveelheid apart vermeld.</li>
            <li>Hoeveelheden gas die bij onderhoud, service of na lekkage zijn toegevoegd, met datum.</li>
            <li>Hoeveelheid teruggewonnen gas.</li>
            <li>
              Bij toevoeging: of het gas gerecycled of geregenereerd is, met naam, adres en certificaatnummer van
              het recycling- of regeneratiebedrijf.
            </li>
            <li>
              Identiteit van de onderneming die heeft geïnstalleerd, geservicet, onderhouden, teruggewonnen,
              gerepareerd, op lekken gecontroleerd of buiten dienst gesteld, inclusief certificaatnummer, en bij
              een rechtspersoon ook de natuurlijke persoon die het werk deed.
            </li>
            <li>Datums en resultaten van de lekcontroles en van eventuele reparaties.</li>
            <li>Bij buitendienststelling: de maatregelen om het gas terug te winnen en te verwijderen.</li>
          </ol>
          <h3 className={h3}>Wanneer je moet controleren (art. 5 lid 1, 2 en 6; art. 6)</h3>
          <DataTable
            caption="Lekcontrolefrequentie naar vulling, met en zonder lekkagedetectiesysteem"
            head={['Vulling F-gassen (bijlage I)', 'Vulling HFO’s (bijlage II deel 1)', 'Zonder lekkagedetectiesysteem', 'Met lekkagedetectiesysteem']}
            rows={[
              ['5 tot 50 ton CO₂-eq',     '1 tot 10 kg',     'elke 12 maanden', 'elke 24 maanden'],
              ['50 tot 500 ton CO₂-eq',   '10 tot 100 kg',   'elke 6 maanden',  'elke 12 maanden'],
              ['500 ton CO₂-eq of meer',  '100 kg of meer',  'elke 3 maanden',  'elke 6 maanden'],
            ]}
          />
          <div className={prose}>
            <p>
              Uitzonderingen: hermetisch gesloten en als zodanig geëtiketteerde apparatuur onder 10 ton CO₂-eq (of
              onder 2 kg HFO) wordt niet gecontroleerd; in residentiële gebouwen ligt die grens voor hermetisch
              gesloten apparatuur op 3 kg. Vanaf 500 ton CO₂-eq is een lekkagedetectiesysteem verplicht (art. 6).
              Na een reparatie van een lek volgt een controle door een gecertificeerde persoon, op z’n vroegst na 24
              uur bedrijfstijd en uiterlijk binnen één maand (art. 4 lid 5).
            </p>
          </div>
        </Section>

        {/* ── 6. Praktijk ── */}
        <Section id="waar-het-misgaat" className="border-y border-[var(--border)] bg-white">
          <h2 className={h2} style={h2Size}>Waar het in de praktijk misgaat</h2>
          <div className={prose}>
            <p>
              De drie tekortkomingen die het vaakst bij een BRL 100-audit naar voren komen, zijn een balans die
              niet sluit, werkregistraties zonder herleidbare uitvoerder of certificaatnummer, en meetinstrumenten
              waarvan de controle niet is geregistreerd. Alle drie zijn administratief, niet technisch.
            </p>
            <p>
              Dit is wat ik in mijn eigen koeltechniekbedrijf en bij collega’s zie. Een balans sluit niet omdat
              bijvullingen op papieren werkbonnen staan en de flesgewichten in een apart Excel-bestand. Een
              werkregistratie mist het certificaatnummer van de monteur, terwijl artikel 7 dat expliciet vraagt. De
              weegschaal is wel gecontroleerd met een ijkgewicht, maar niemand heeft opgeschreven wanneer, met welk
              gewicht en door wie, dus voor de auditor is het niet gebeurd. En de kopie voor de eigenaar is “wel
              gemaild”, maar niet aantoonbaar.
            </p>
            <p>
              De oplossing is niet meer discipline maar minder losse handelingen: de werkbon moet de logboekregel
              zijn, de flesregistratie moet uit dezelfde bon volgen, en de instrumentcontrole moet een vast veld
              zijn in plaats van een los briefje.
            </p>
          </div>
        </Section>

        {/* ── 7. Wat software moet kunnen ── */}
        <Section id="wat-software-moet-kunnen">
          <h2 className={h2} style={h2Size}>Wat software hiervoor moet kunnen</h2>
          <div className={prose}>
            <p>
              Software die je bij BRL 100 helpt, moet minimaal de werkregistratie per handeling en per circuit
              vastleggen, de koudemiddelregistratie en jaarbalans per gastype opbouwen, de kopie voor de eigenaar
              aantoonbaar overdragen, en de instrumentcontroles met datum en uitvoerder bewaren. Toets elk pakket
              op deze acht punten voordat je kiest:
            </p>
          </div>
          <ol className={`${numbers} mt-5`}>
            <li>Werkregistratie per handeling, gekoppeld aan installatie én zelfstandig circuit.</li>
            <li>Alle zeven gegevens uit artikel 7, inclusief certificaatnummer van onderneming en monteur.</li>
            <li>Koudemiddel in en uit per fles, met restgewicht, en een jaarbalans per gastype in kg en CO₂-eq.</li>
            <li>Registratie van instrumentcontroles (manometer, thermometer, weegschaal, lekdetector) met datum en uitvoerder.</li>
            <li>Aantoonbare overdracht van het logboek aan de eigenaar, digitaal of op papier.</li>
            <li>Bewaartermijn van minimaal vijf jaar en een export voor de certificerende instelling of ILT.</li>
            <li>Controle op de kenplaat: staan de wettelijke velden erop?</li>
            <li>Koppeling met werkbon en factuur, zodat registratie geen aparte handeling is.</li>
          </ol>
        </Section>

        {/* ── 8. Hoe Snellio dit invult ── */}
        <Section id="hoe-snellio-dit-invult" className="border-y border-[var(--border)] bg-white">
          <p className={label}>Hoe Snellio dit invult</p>
          <h2 className={h2} style={h2Size}>Werkbon, logboekregel en flesregistratie uit één invoer</h2>
          <div className={prose}>
            <p>
              Snellio legt de koeltechnische handeling vast in de werkbon zelf, zodat de logboekregel, de
              flesregistratie en de factuur uit één invoer volgen. Het is gebouwd door een installateur die zelf
              onder BRL 100 werkt.
            </p>
          </div>
          <ul className={`${bullets} mt-5`}>
            <li>
              <strong className="text-[var(--text)]">Logboek per installatie</strong>: elke bijvulling, aftapping en lektestresultaat
              wordt gekoppeld aan de installatie. Wie de QR-code op de kenplaat scant, opent de historie ter plekke.{' '}
              <Link href="/blog/digitaal-logboek-qr-kenplaat" className={anchor}>Lees hoe het digitale logboek werkt →</Link>
            </li>
            <li>
              <strong className="text-[var(--text)]">Koudemiddel- en flesregistratie</strong>: registratie in grammen per handeling,
              automatisch omgezet naar kilogram, met restgewicht per fles en een F-gasbalans per periode.
            </li>
            <li>
              <strong className="text-[var(--text)]">Lektestregistratie</strong>: lekdetector, serienummer, ijkdatum, testmethode,
              testdruk, standtijd en resultaat als vaste velden. Snellio waarschuwt wanneer de ijkdatum van een
              lekdetector verloopt.
            </li>
            <li>
              <strong className="text-[var(--text)]">Kenplaat</strong>: printbaar op je eigen labelprinter, met koudemiddel, GWP,
              vulling en CO₂-equivalent, plus een QR-code naar het logboek.
            </li>
            <li>
              <strong className="text-[var(--text)]">Export</strong>: F-gasgegevens per installatie en per periode exporteerbaar voor
              de certificerende instelling, de RVO of ILT.
            </li>
            <li>
              <strong className="text-[var(--text)]">Van werkbon naar factuur</strong>: factureren vanuit de werkorder, met gratis
              koppeling naar WeFact, Moneybird en Exact Online in elk pakket.
            </li>
          </ul>
          <figure className="mt-8">
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[0_12px_40px_rgba(15,33,51,.1)]">
              <Image
                src="/dashboard-preview.png"
                alt="Snellio dashboard met klanten, installaties, openstaande werkorders en koudemiddelflessen"
                width={1120}
                height={600}
                className="block h-auto w-full"
                sizes="(min-width: 768px) 720px, 92vw"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-[var(--muted2)]">
              Dashboard in Snellio: openstaande werkorders, installaties en de koudemiddelflessen in gebruik.
            </figcaption>
          </figure>
          <div className={`${prose} mt-8`}>
            <p>
              Alle functies zitten in elk pakket, vanaf {fmtEuro(starter.price.month)} per maand {BTW.short} ({starter.name},{' '}
              {starter.monteurs.inbegrepen} monteur, {starter.installaties.label.toLowerCase()}).{' '}
              <Link href="/f-gassen-registratie" className={anchor}>Bekijk de F-gassenregistratie in detail →</Link>
              {' · '}
              <Link href="/pricing" className={anchor}>Bekijk de prijzen →</Link>
            </p>
          </div>
        </Section>

        {/* ── 9. FAQ ── */}
        <Section id="faq">
          <h2 className={h2} style={h2Size}>Veelgestelde vragen</h2>
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
        </Section>

        {/* ── 10. Auteur ── */}
        <Section id="over-de-auteur" className="border-y border-[var(--border)] bg-white">
          <aside className="flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--navy2)] p-6 sm:flex-row sm:items-start">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-[0_8px_24px_rgba(0,144,184,.25)]">
              <Image
                src="/rudy-snel.png"
                alt="Rudy Snel, oprichter van Snellio en eigenaar van een koeltechniekbedrijf"
                width={400}
                height={400}
                className="h-full w-full object-cover"
                sizes="96px"
              />
            </div>
            <div>
              <p className={label}>Over de auteur</p>
              <p className="mb-2 font-outfit text-lg font-bold text-[var(--text)]">Rudy Snel</p>
              <p className="text-sm leading-relaxed text-[var(--text2)]">
                Rudy Snel is oprichter van Snellio en eigenaar van een koeltechniekbedrijf, STEK-gecertificeerd.
                Snellio ontstond omdat de F-gassenadministratie in dat eigen bedrijf tot de audit bleef liggen.
              </p>
              <p className="mt-3 text-sm">
                <Link href={PERSON_PATH} className={anchor}>Meer over Rudy Snel →</Link>
              </p>
            </div>
          </aside>
        </Section>

        {/* ── 11. Bronnen ── */}
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

      {/* ── CTA ── */}
      <section className="bg-[#0f2133] px-[5%] py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-outfit font-black leading-[1.1] tracking-tight text-white"
            style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)' }}
          >
            Probeer Snellio {TRIAL_DAGEN} dagen gratis met je eigen installaties.
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            Geen betaling, geen creditcard, geen pakketkeuze bij registratie.
          </p>
          <Button href="/registreren" size="lg" className={primary}>Start {TRIAL_DAGEN} dagen gratis →</Button>
        </div>
      </section>

      {/* ── Lees verder ── */}
      <LandingInternalLinks
        heading="Lees verder"
        links={[
          { href: '/f-gassen-registratie',                icon: '❄️', title: 'F-gassenlogboek per installatie',      desc: 'Hoe het F-gassenlogboek per installatie werkt' },
          { href: '/werkbon-software',                    icon: '📋', title: 'Werkbon-app voor installateurs',       desc: 'Werkbon-app voor installateurs in de koeltechniek' },
          { href: '/software-voor-installatiebedrijven',  icon: '🧭', title: 'Software voor installatiebedrijven',   desc: 'CRM, werkbonnen, planning en facturatie in één systeem' },
          { href: '/blog/f-gas-verordening-2024',         icon: '🇪🇺', title: 'EU F-gasverordening 2024/573',        desc: 'Wat er verandert voor koeltechnisch installateurs' },
        ]}
      />
    </>
  )
}
