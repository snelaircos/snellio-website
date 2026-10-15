import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, webPageSchema, PERSON_PATH } from '@/lib/schemas'
import { BTW, HANDBOEK, JAARPRIJZEN_ANKER, PLANS, SITE, TRIAL_DAGEN } from '@/lib/constants'
import { fmtEuro, planById } from '@/lib/pricing'
import JsonLd               from '@/components/seo/JsonLd'
import UpdatedOn            from '@/components/ui/UpdatedOn'
import LandingHero          from '@/components/sections/LandingHero'
import LandingFeatures      from '@/components/sections/LandingFeatures'
import LandingFaq           from '@/components/sections/LandingFaq'
import LandingInternalLinks from '@/components/sections/LandingInternalLinks'
import Cta                  from '@/components/sections/Cta'
import { HANDBOEK_PAGE }    from './meta'

// Productpagina voor het BRL 100 v3.0-handboek (15-10-2026). Eén intentie:
// het handboek als document. Wat de auditor van je administratie vraagt,
// staat op /brl-100-software; die twee linken naar elkaar.
//
// Regels die hier gelden:
// - Claims alleen uit 02-feature-factcheck.md, rijen 30 t/m 36: "gebaseerd op
//   BRL 100 v3.0", nooit "goedgekeurd", "gecertificeerd" of Kiwa. Het handboek
//   vervangt de beoordeling door de certificerende instelling niet.
// - Onderaannemers komen niet live uit Snellio; die vul je zelf in.
// - Wat nieuw is in 3.0 en de datums: 01-juridische-basis.md §2 en §3
//   (31 augustus 2026 staat letterlijk in de overgangsnota, art. 2.1). Niet
//   schrijven dat de meetmiddeleneisen nieuw of strenger zijn.
// - TRA, EVD en werkvergunning alleen met de framing uit §3.
// - Toegang en FAQ-tekst uit HANDBOEK (lib/constants.ts), prijzen uit PLANS.
// - FAQ-tekst is byte-gelijk aan het FAQ-schema: één array voor beide.
// - Zichtbare datum is gelijk aan WebPage.dateModified (meta.ts).

const TITLE       = 'BRL 100 v3.0-kwaliteitshandboek voor installateurs'
const DESCRIPTION =
  'Kwaliteitshandboek op basis van BRL 100 v3.0, gevuld met je eigen gegevens. Certificaten en meetmiddelen live uit Snellio, leesbevestiging per monteur en PDF.'

export const metadata: Metadata = buildMetadata({
  title:       'BRL 100 v3.0 kwaliteitshandboek voor installateurs | Snellio',
  description: DESCRIPTION,
  path:        HANDBOEK_PAGE.path,
})

const starter = planById('starter')
const basis   = planById('basis')

// ── Data ──────────────────────────────────────────────────────────────────────

const bronnen = [
  {
    label: 'Rijkswaterstaat, BRL 100 versie 3.0, 5 december 2025',
    href:  'https://iplo.nl/publish/pages/228185/2025-12-05-brl100-versie-3-0-beveiligd-en-printbaar.pdf',
  },
  {
    label: 'Rijkswaterstaat, Nota ter informatie: overgangsregeling BRL100 voor rechtspersonen en certificerende instellingen, art. 2.1, 3.2 en 6.1',
    href:  'https://iplo.nl/publish/pages/228185/nota-ter-informatie-overgangsregeling-brl100-certificering.pdf',
  },
  {
    label: 'Verordening (EU) 2024/573, art. 7',
    href:  'https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32024R0573',
  },
  {
    label: 'Arbeidsomstandighedenbesluit, art. 3.5c (explosieveiligheidsdocument)',
    href:  'https://wetten.overheid.nl/BWBR0008498/2026-08-01/#Hoofdstuk3_Afdeling1_Paragraaf2a_Artikel3.5c',
  },
]

// Teksten uit 02-feature-factcheck.md, rijen 30 t/m 36.
const functies = [
  { icon: '📘', title: `${HANDBOEK.hoofdstukken} hoofdstukken, met jouw gegevens`,  desc: 'Het handboek is gebaseerd op BRL 100 v3.0 en staat op naam van je eigen bedrijf. Naam, adres en KvK-nummer komen uit je bedrijfsgegevens in Snellio; rollen en scope vul je één keer in.' },
  { icon: '🪪', title: 'Certificaten van je monteurs, live',                       desc: 'De certificaten die je bij je monteurs in Snellio vastlegt, staan met nummer en geldigheid in het handboek. Een nieuwe versie die je vastzet, neemt de stand van dat moment mee.' },
  { icon: '🧰', title: 'Meetmiddelen, live',                                       desc: 'Je meetmiddelen komen uit Snellio in het handboek, met de laatste kalibratie en de geldigheid. Je onderaannemers vul je één keer zelf in.' },
  { icon: '✅', title: 'Leesbevestiging per versie',                               desc: 'Monteurs lezen het handboek online, ook onderweg, en bevestigen per versie dat ze het gelezen hebben. Op kantoor zie je wie het gelezen heeft en wanneer.' },
  { icon: '🖨️', title: 'Afdrukken of als PDF',                                    desc: 'Voor de auditor druk je het handboek af of sla je het op als PDF.' },
  { icon: '🔥', title: 'Brandbare koudemiddelen',                                  desc: 'Met hoofdstukken over R290 en andere koolwaterstoffen, de taakrisicoanalyse (TRA), het explosieveiligheidsdocument (EVD) en ATEX, en de registratie uit Verordening (EU) 2024/573.' },
]

const answerFirst =
  'Snellio levert een kwaliteitshandboek gebaseerd op BRL 100 v3.0, ingevuld met je eigen bedrijfsgegevens. ' +
  'De certificaten van je monteurs en je meetmiddelen komen er live uit Snellio in. ' +
  'Monteurs lezen het online en bevestigen per versie dat ze het gelezen hebben. ' +
  'Voor de auditor sla je het op als PDF. Het hoort bij Basis, Pro en Enterprise met jaarbetaling.'

// Eén array voor de zichtbare FAQ én het FAQPage-schema (byte-gelijk).
const faqs = [
  { question: HANDBOEK.faq.question, answer: HANDBOEK.faq.answer },
  {
    question: 'Vervangt het handboek de beoordeling door mijn certificerende instelling?',
    answer:   'Nee. Het handboek is gebaseerd op BRL 100 versie 3.0. Of je bedrijf aan BRL 100 voldoet, beoordeelt je certificerende instelling bij de audit, aan de hand van je werkwijze in de praktijk.',
  },
  {
    question: 'Wat is er nieuw in BRL 100 versie 3.0?',
    answer:   'Vooral de scope. Deelgebied I omvat nu F-gassen én koolwaterstoffen zoals R290, deelgebied II CO₂ en deelgebied III ammoniak, en ook mobiele apparatuur valt eronder. Voor werk aan brandbare koudemiddelen vraagt versie 3.0 om een taakrisicoanalyse, het raadplegen van het explosieveiligheidsdocument van de exploitant en een gasmeter met alarm op 10% en 20% LEL. De eisen aan logboek, F-gassenbalans en de controle van meetinstrumenten bestonden al.',
  },
  {
    question: 'Wanneer gaat BRL 100 versie 3.0 in?',
    answer:   'Rijkswaterstaat stelde versie 3.0 vast op 5 december 2025. Volgens de overgangsregeling treedt versie 3.0 formeel in werking op 31 augustus 2026; nieuwe aanvragen worden daarna alleen tegen versie 3.0 beoordeeld. Heb je al een certificaat, dan is je eerstvolgende reguliere audit daarna een transitie-audit. Versie 2.0 vervalt per 31 augustus 2028.',
  },
  {
    question: 'Kunnen monteurs het handboek onderweg lezen?',
    answer:   'Ja. Monteurs lezen het handboek online in Snellio, ook onderweg, en bevestigen per versie dat ze het gelezen hebben. Op kantoor zie je per versie wie het gelezen heeft en wanneer.',
  },
  {
    question: 'Wat gebeurt er met het handboek als ik stop?',
    answer:   'Stopt je jaarabonnement, dan kun je het handboek nog 30 dagen lezen, maar niet meer wijzigen, afdrukken of als PDF opslaan. Daarna zie je weer het voorbeeld. Het handboek mag je alleen gebruiken zolang je abonnement loopt.',
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
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
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

export default function BrlHandboekPage() {
  return (
    <>
      <JsonLd schema={[
        // Productpagina: WebPage met dateModified, geen Article. De
        // SoftwareApplication staat al site-breed; hier alleen de verwijzing.
        webPageSchema({
          path:          HANDBOEK_PAGE.path,
          name:          TITLE,
          description:   DESCRIPTION,
          datePublished: HANDBOEK_PAGE.datePublished,
          dateModified:  HANDBOEK_PAGE.dateModified,
          aboutId:       `${SITE.url}/#software`,
        }),
        breadcrumbSchema([
          { name: 'Home',             href: '/'                },
          { name: 'BRL 100-handboek', href: HANDBOEK_PAGE.path },
        ]),
        faqSchema(faqs),
      ]} />

      {/* ── Hero (answer-first onder de H1) ── */}
      <LandingHero
        badge="BRL 100 v3.0 · Kwaliteitshandboek · Leesbevestiging per monteur"
        heading="BRL 100 v3.0-kwaliteitshandboek"
        headingAccent="voor installateurs."
        meta={<UpdatedOn dateISO={HANDBOEK_PAGE.dateModified} />}
        sub={answerFirst}
        ctaPrimary={{ label: `Start ${TRIAL_DAGEN} dagen gratis →`, href: '/registreren' }}
        ctaSecondary={{ label: 'Bekijk de jaarprijzen', href: `/pricing#${JAARPRIJZEN_ANKER}` }}
        trustLine={`${HANDBOEK.badge} • In de proefperiode zie je een voorbeeld`}
        stats={[
          { value: `${HANDBOEK.hoofdstukken}`,                             label: 'hoofdstukken'           },
          { value: `${HANDBOEK.delen.length}`,                             label: 'delen'                  },
          { value: '<span style="color:var(--cyan)">PDF</span>',          label: 'af te drukken voor de auditor' },
        ]}
      />

      {/* ── 1. Wat zit erin ── */}
      <Section id="wat-zit-er-in" className="border-y border-[var(--border)] bg-white">
        <h2 className={h2} style={h2Size}>Wat zit er in het handboek?</h2>
        <div className={prose}>
          <p>
            Het handboek telt {HANDBOEK.hoofdstukken} hoofdstukken in {HANDBOEK.delen.length} delen, van beleid en
            procedures tot werkinstructies en registers. Overal waar je bedrijf genoemd wordt, staan je eigen gegevens:
            bedrijfsnaam, rollen en de deelgebieden waarvoor je werkt.
          </p>
        </div>
        <DataTable
          caption="Opbouw van het BRL 100 v3.0-handboek in Snellio: delen, aantal hoofdstukken en voorbeelden"
          head={['Deel', 'Hoofdstukken', 'Onder meer']}
          rows={HANDBOEK.delen.map(deel => [`${deel.code}. ${deel.titel}`, String(deel.aantal), deel.voorbeeld])}
        />
        <div className={prose}>
          <p>
            Gemaakt door een gecertificeerd installateur die het zelf gebruikt voor zijn eigen BRL 100-certificering:{' '}
            <Link href={PERSON_PATH} className={anchor}>Rudy Snel</Link>. {HANDBOEK.disclaimer}
          </p>
        </div>
      </Section>

      {/* ── 2. Wat Snellio erin zet ── */}
      <LandingFeatures
        label="Live uit Snellio"
        heading="Wat het handboek"
        accent="uit Snellio haalt"
        features={functies}
      />

      {/* ── 3. Wat v3.0 nieuw maakt ── */}
      <Section id="wat-is-nieuw-in-brl-100-versie-3" className="border-y border-[var(--border)] bg-white">
        <h2 className={h2} style={h2Size}>Wat BRL 100 versie 3.0 nieuw maakt</h2>
        <div className={prose}>
          <p>
            BRL 100 versie 3.0 is op 5 december 2025 vastgesteld door Rijkswaterstaat en is formeel in werking sinds
            31 augustus 2026. De grootste verandering is de scope. Deelgebied I omvat nu F-gassen én koolwaterstoffen
            zoals R290, deelgebied II CO₂ en deelgebied III ammoniak. Ook mobiele apparatuur valt eronder, zoals lichte
            koelvoertuigen en reefers.
          </p>
          <p>
            Voor werk aan brandbare koudemiddelen vraagt versie 3.0 om een taakrisicoanalyse en om het raadplegen van
            het explosieveiligheidsdocument van de exploitant. Een werkvergunning hoort bij werk in een gevarenzone. Ook
            buiten een gevarenzone vraagt de BRL om een gasmeter met alarm op 10% en 20% LEL en antistatische
            werkkleding. Het handboek heeft daarvoor eigen hoofdstukken: de TRA, het EVD en ATEX, en lekpreventie en
            veilig werken.
          </p>
          <p>
            De eisen aan logboek, F-gassenbalans en de controle van meetinstrumenten bestonden al in versie 2.0. Wat
            de auditor daarvan wil zien, lees je op{' '}
            <Link href="/brl-100-software" className={anchor}>BRL 100: wat de auditor van je administratie vraagt</Link>.
          </p>
        </div>
      </Section>

      {/* ── 4. Welke abonnementen (uit PLANS en HANDBOEK) ── */}
      <Section id="welke-abonnementen">
        <p className={label}>Prijzen</p>
        <h2 className={h2} style={h2Size}>Bij welke abonnementen zit het handboek?</h2>
        <div className={prose}>
          <p>
            Het volledige handboek hoort bij Basis, Pro en Enterprise met jaarbetaling. Alle functies van Snellio
            zitten in elk pakket; het handboek is een document dat bij jaarbetaling vanaf {basis.name} hoort.
            Prijzen {BTW.short}.
          </p>
        </div>
        <DataTable
          caption="Pakketten van Snellio met maand- en jaarprijs en wat je van het BRL 100-handboek krijgt"
          head={['Pakket', 'Per maand', 'Per jaar', 'Handboek bij maand', 'Handboek bij jaar']}
          rows={PLANS.map(plan => {
            const volledig = HANDBOEK.pakketten.includes(plan.id)
            return [
              plan.name,
              fmtEuro(plan.price.month),
              fmtEuro(plan.price.year),
              'Voorbeeld',
              volledig ? 'Volledig' : 'Voorbeeld',
            ]
          })}
        />
        <div className={prose}>
          <p>
            Het voorbeeld is de inhoudsopgave en het eerste hoofdstuk, zonder je eigen gegevens. Dat zie je ook bij{' '}
            {starter.name} en in de proefperiode van {TRIAL_DAGEN} dagen. Het handboek mag je gebruiken zolang je
            abonnement loopt. Alle bedragen en wat er verder inbegrepen is:{' '}
            <Link href={`/pricing#${JAARPRIJZEN_ANKER}`} className={anchor}>jaarprijzen</Link>.
          </p>
        </div>
      </Section>

      {/* ── 5. FAQ (zichtbaar en schema uit dezelfde array) ── */}
      <LandingFaq items={faqs} heading="Veelgestelde vragen over het BRL 100-handboek" />

      {/* ── 6. Bronnen ── */}
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

      {/* ── 7. Lees verder ── */}
      <LandingInternalLinks
        heading="Lees verder"
        links={[
          { href: '/brl-100-software',     icon: '📄', title: 'BRL 100: wat de auditor van je administratie vraagt', desc: 'Certificaat, audit, logboek en meetinstrumenten' },
          { href: '/f-gassen-registratie', icon: '❄️', title: 'F-gassen registratie: het logboek per installatie',   desc: 'Art. 7, lekcontrole, flesbalans en kenplaat' },
          { href: PERSON_PATH,             icon: '👷', title: 'Over Rudy Snel',                                     desc: 'Installateur en maker van Snellio' },
          { href: '/pricing',              icon: '💶', title: 'Prijzen, alles inbegrepen',                          desc: `Vanaf ${fmtEuro(starter.price.month)} per maand ${BTW.short}` },
        ]}
      />

      {/* ── 8. CTA ── */}
      <p className="mx-auto max-w-2xl px-[5%] pt-16 text-center text-[1rem] leading-relaxed text-[var(--text2)]">
        Bekijk het voorbeeld van het handboek in je proefperiode. {TRIAL_DAGEN} dagen gratis, geen betaalgegevens nodig.
      </p>
      <Cta />
    </>
  )
}
