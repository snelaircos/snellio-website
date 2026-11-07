import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/schemas'
import { HANDBOEK, SITE, TRIAL_DAGEN } from '@/lib/constants'
import { planById } from '@/lib/pricing'
import JsonLd        from '@/components/seo/JsonLd'
import UpdatedOn     from '@/components/ui/UpdatedOn'
import LandingHero   from '@/components/sections/LandingHero'
import LandingFaq    from '@/components/sections/LandingFaq'
import Cta           from '@/components/sections/Cta'
import { AUDITMAP_PAGE } from './meta'

// Productpagina voor de Auditmap (1 november 2026). Eén intentie: hoe Snellio
// je bewijs voor de audit klaarzet. De uitleg over BRL 100 zelf staat op
// /brl-100-software, het handboek op /brl-100-handboek. Die pagina's linken
// naar elkaar; herhaal hun uitleg hier niet. Deze pagina richt zich op de
// zoekterm "BRL 100 versie 3.0", /brl-100-software op "BRL 100 software".
//
// Regels die hier gelden:
// - Claims alleen uit 02-feature-factcheck.md, rijen "Auditmap" e.v.
// - Datums uit de toelichting op de overgangsregeling (IPLO), 01-juridische-basis.md §2.
// - TRA en EVD alleen met de framing uit §3: de BRL noemt een TRA "noodzakelijk"
//   als het werk risico's meebrengt, "verplicht bij brandbare, verstikkende of
//   giftige koudemiddelen" is de lezing van Kiwa en staat er als "volgens Kiwa".
//   Het EVD stelt de exploitant op; de onderneming raadpleegt het.
// - Niet schrijven dat de meetmiddeleneisen in 3.0 nieuw of strenger zijn.
// - Vervalmeldingen zijn dashboardmeldingen. De mails staan in de app uit tot
//   VERVALDATA_MAIL=aan; schrijf dus geen "per e-mail".
// - Geen logo's van Kiwa, IPLO of Rijkswaterstaat, geen "goedgekeurd".
// - FAQ-tekst is byte-gelijk aan het FAQ-schema: één array voor beide.
// - Zichtbare datum is gelijk aan WebPage.dateModified (meta.ts).

const TITLE       = 'BRL 100 versie 3.0: zo staat jouw auditmap klaar'
const DESCRIPTION =
  'BRL 100 versie 3.0: wat er verandert en hoe Snellio je auditmap klaarzet. 19 punten in groen, oranje en rood, met een export als ZIP. Je bewijs op één plek.'

export const metadata: Metadata = buildMetadata({
  title:       TITLE,
  description: DESCRIPTION,
  path:        AUDITMAP_PAGE.path,
})

const starter = planById('starter')

// ── Data ──────────────────────────────────────────────────────────────────────

// Answer-first: twee zinnen, samen 40 tot 60 woorden (CLAUDE.md regel 8).
const answerFirst =
  'Met BRL 100 versie 3.0 vallen ook natuurlijke koudemiddelen zoals R290 onder de richtlijn, en je eerstvolgende ' +
  'reguliere audit na 31 augustus 2026 is de transitie-audit. Snellio zet je bewijs op één plek: één overzicht van ' +
  '19 punten in groen, oranje en rood, met een export als ZIP voor de auditor.'

const veranderingen: { kop: string; tekst: string }[] = [
  { kop: 'Datums',                   tekst: 'Vastgesteld op 5 december 2025, formeel in werking sinds 31 augustus 2026.' },
  { kop: 'Transitie-audit',          tekst: 'Je eerstvolgende reguliere audit na 31 augustus 2026 is de transitie-audit. Daarin beoordeelt de auditor of je werkwijze past bij versie 3.0. Er komt geen extra audit bij.' },
  { kop: 'Versie 2.0 loopt af',      tekst: 'Certificaten volgens versie 2.0 blijven geldig tot 31 augustus 2028, met een hersteltermijn tot 30 november 2028 om afwijkingen op te lossen.' },
  { kop: 'Deelgebieden',             tekst: 'Je certificaat is ingedeeld naar soort koudemiddel: I F-gassen en koolwaterstoffen (zoals R290), II CO₂, III NH₃ (ammoniak).' },
  { kop: 'Natuurlijke koudemiddelen', tekst: 'Die vallen nu binnen de scope, dus onder de richtlijn.' },
  { kop: 'Taakrisicoanalyse (TRA)',  tekst: 'Een analyse vooraf van de gevaren bij een klus en hoe je die beheerst. Brengt het werk risico’s mee, dan noemt de BRL een TRA noodzakelijk. Volgens Kiwa geldt dat bij brandbare, verstikkende of giftige koudemiddelen.' },
  { kop: 'Explosieveiligheidsdocument (EVD)', tekst: 'Bij brandbare koudemiddelen vraagt de BRL dat je het EVD van de exploitant raadpleegt, als onderdeel van je TRA. De exploitant is de partij die de installatie beheert en het EVD opstelt.' },
  { kop: 'Monteurs',                 tekst: 'Zij hebben de persoonscertificaten nodig die horen bij de deelgebieden waarin je werkt.' },
  { kop: 'Gereedschap en meetmiddelen', tekst: 'Die moeten passen bij het werk, met extra aandacht voor ATEX bij brandbare koudemiddelen. ATEX gaat over werken op plekken met explosiegevaar. De controle van je meetmiddelen zelf bestond al in versie 2.0.' },
]

interface AuditBlok {
  id:        string
  titel:     string
  auditor:   string
  snellio:   string[]
  zichtbaar: boolean
}

const blokken: AuditBlok[] = [
  {
    id:        'auditmap',
    titel:     'Auditmap',
    auditor:   'Je bewijs overzichtelijk bij elkaar, zodat je tijdens de audit snel laat zien wat er gevraagd wordt.',
    snellio:   [
      'Eén overzicht met 19 punten in groen, oranje en rood.',
      'Per tekortkoming één klik naar de werkorders of installaties die het betreft.',
      'Export als ZIP met inhoudsopgave, peildatum (de datum waarop je de stand vastlegt), periode en een steekproef van werkbonnen.',
    ],
    zichtbaar: true,
  },
  {
    id:        'meetmiddelen',
    titel:     'Meetmiddelen',
    auditor:   'Dat je meetinstrumenten aantoonbaar zijn gecontroleerd, met de registratie erbij.',
    snellio:   [
      'Register met aankoopfactuur.',
      'Kalibratierapporten met historie en een kalibratie-interval per soort meetmiddel. Kalibreren is controleren of een meter nog goed meet.',
      'Melding in je dashboard 30 en 7 dagen voor de vervaldatum.',
    ],
    zichtbaar: true,
  },
  {
    id:        'monteurs',
    titel:     'Monteurs en bevoegdheid',
    auditor:   'Dat je monteurs het juiste persoonscertificaat hebben voor het werk dat ze doen.',
    snellio:   [
      'F-gascategorie per monteur volgens de nieuwe Europese indeling (A1 t/m E), en de oude I en II.',
      'Waarschuwing bij het tekenen als het werk buiten de bevoegdheid valt.',
    ],
    zichtbaar: true,
  },
  {
    id:        'werkbonnen',
    titel:     'Werkbonnen',
    auditor:   'Dat de drukproef op de werkbon staat en dat het vacumeren volgens je eigen werkinstructie is gedaan, met een standtijd van ten minste 30 minuten. De standtijd is hoe lang het vacuüm blijft staan.',
    snellio:   [
      'Bij een drukproef is de hoge druk verplicht, bij vacumeren de einddruk en standtijd.',
      'Zonder die waarden kan de bon niet getekend worden.',
      'Lege of nulwaarden tellen niet.',
    ],
    zichtbaar: true,
  },
  {
    id:        'koudemiddel',
    titel:     'Koudemiddelregistratie',
    auditor:   'Per installatie hoeveel koudemiddel erin zit, hoeveel er is bijgevuld en hoeveel er is teruggewonnen.',
    snellio:   [
      'Per installatie de vulling, het bijgevulde en het teruggewonnen koudemiddel.',
      'GWP en CO₂-equivalent automatisch berekend. Het GWP is de klimaatimpact van een koudemiddel, het CO₂-equivalent die impact voor de hele vulling, omgerekend naar CO₂.',
    ],
    zichtbaar: true,
  },
  {
    id:        'bedrijfsdocumenten',
    titel:     'Bedrijfsdocumenten',
    auditor:   'Dat je bedrijfsgegevens en de documenten van je kwaliteitssysteem actueel zijn.',
    snellio:   [
      'KvK-uittreksel en auditdocumenten met vervaldatum.',
      'Melding in je dashboard voordat een document verloopt.',
    ],
    zichtbaar: true,
  },
  // TODO(Rudy): tekst volgt. Vul auditor en snellio in en zet zichtbaar op true;
  // tot die tijd komt dit blok niet in de HTML. Teksten over R290 alleen met
  // de framing uit 01-juridische-basis.md §3 en factcheckrijen TRA, LMRA en
  // werkvergunning.
  {
    id:        'r290',
    titel:     'R290 en brandbare koudemiddelen',
    auditor:   '',
    snellio:   [],
    zichtbaar: false,
  },
]

// TODO(Rudy): vervang dit door een echte, geanonimiseerde schermafbeelding van
// de Auditmap (nog niet in public/). Pas src, afmetingen, alt en bijschrift
// aan. Geen nagemaakte screenshots.
const beeld = {
  src:     '/dashboard-preview.png',
  alt:     'Snellio dashboard met klanten, installaties, openstaande werkorders en koudemiddelflessen',
  caption: 'Dashboard in Snellio: openstaande werkorders, installaties en de koudemiddelflessen in gebruik.',
  width:   1120,
  height:  600,
}

// Eén array voor de zichtbare FAQ én het FAQPage-schema (byte-gelijk).
const faqs = [
  {
    question: 'Moet ik nu al over?',
    answer:   'Heb je al een certificaat, dan hoef je niets apart aan te vragen. Je eerstvolgende reguliere audit na 31 augustus 2026 is de transitie-audit, en daarvoor moeten je kwaliteitssysteem en werkwijze passen bij versie 3.0. Vraag je voor het eerst een certificaat aan, dan geldt versie 3.0 meteen.',
  },
  {
    question: 'Kan ik mijn oude werkbonnen meenemen?',
    answer:   'Klanten, locaties, werkorders en installaties zet je over via CSV-import of via de API. Werkbonnen die al in Snellio getekend zijn, worden niet aangepast. Mist er een drukproef- of vacuümwaarde, dan laat de auditmap dat wel zien.',
  },
  {
    question: 'Werkt het ook als ik alleen monteur ben?',
    answer:   `Ja. Ook als zzp’er heb je een bedrijfscertificaat (BRL 100) en een persoonscertificaat (BRL 200) nodig. De auditmap werkt hetzelfde met één monteur. Het pakket ${starter.name} is voor ${starter.monteurs.inbegrepen} monteur, met alle functies.`,
  },
  {
    question: 'Krijg ik met Snellio een BRL 100-certificaat?',
    answer:   'Nee. Het certificaat krijg je van je certificerende instelling, na de audit. Snellio zorgt dat je bewijs op orde en vindbaar is.',
  },
  {
    question: 'Wat kost het?',
    answer:   `Je probeert Snellio ${TRIAL_DAGEN} dagen gratis, zonder betaalgegevens. Alle functies op deze pagina zitten in elk pakket; de bedragen staan op de prijzenpagina. Het BRL 100-handboek hoort bij Basis, Pro en Enterprise met jaarbetaling. Zonder dat handboek blijft het punt over procedures in je auditmap oranje en lever je je eigen handboek aan.`,
  },
]

const bronnen = [
  {
    label: 'IPLO, Toelichting overgangsregeling BRL 100 v3.0',
    href:  'https://iplo.nl/thema/lucht/ozon-en-f-gassen/certificering/eisen-ondernemingen-installatiebedrijven/toelichting-overgangsregeling-brl-100-v3-0/',
  },
  {
    label: 'Kiwa, BRL 100 geüpdatet: dit verandert er met versie 3.0',
    href:  'https://www.kiwa.com/nl/nl/expertisegebieden/energietransitie/nieuws/brl-100-geupdatet-dit-verandert-er-met-versie-3.0',
  },
  {
    label: 'Rijkswaterstaat, Beoordelingsrichtlijn BRL 100 versie 3.0 (pdf via IPLO)',
    href:  'https://iplo.nl/publish/pages/228185/2025-12-05-brl100-versie-3-0-beveiligd-en-printbaar.pdf',
  },
  {
    label: 'Ondernemersplein (RVO), Certificaat voor werken met F-gassen en andere koudemiddelen',
    href:  'https://ondernemersplein.overheid.nl/wetten-en-regels/certificaat-voor-werken-met-f-gassen/',
  },
]

// ── Stijl ─────────────────────────────────────────────────────────────────────

const label   = 'mb-2 font-mono text-[.72rem] uppercase tracking-[.08em] text-[var(--accent)]'
const h2      = 'font-outfit font-black tracking-tight text-[var(--text)] mb-5 scroll-mt-24'
const h2Size  = { fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' } as const
const prose   = 'text-[var(--text2)] text-[1rem] leading-[1.8] space-y-4'
const bullets = 'list-disc pl-5 space-y-2 text-[var(--text2)] text-[1rem] leading-[1.75] marker:text-[var(--accent)]'
const numbers = 'list-decimal pl-5 space-y-2 text-[var(--text2)] text-[1rem] leading-[1.75] marker:font-semibold marker:text-[var(--accent)]'
const anchor  = 'text-[var(--accent)] underline underline-offset-2 hover:text-[var(--text)] transition-colors'

function Section({ id, breed, children, className = '' }: { id?: string; breed?: boolean; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-16 px-[5%] py-14 md:py-16 ${className}`}>
      <div className={`mx-auto ${breed ? 'max-w-4xl' : 'max-w-3xl'}`}>{children}</div>
    </section>
  )
}

// ── Pagina ────────────────────────────────────────────────────────────────────

export default function BrlAuditmapPage() {
  return (
    <>
      <JsonLd schema={[
        // Productpagina: WebPage met dateModified, geen Article. De
        // SoftwareApplication staat al site-breed; hier alleen de verwijzing.
        webPageSchema({
          path:          AUDITMAP_PAGE.path,
          name:          TITLE,
          description:   DESCRIPTION,
          datePublished: AUDITMAP_PAGE.datePublished,
          dateModified:  AUDITMAP_PAGE.dateModified,
          aboutId:       `${SITE.url}/#software`,
        }),
        breadcrumbSchema([
          { name: 'Home',               href: '/'                },
          { name: 'BRL 100 versie 3.0', href: AUDITMAP_PAGE.path },
        ]),
        faqSchema(faqs),
      ]} />

      {/* ── 1. Hero (answer-first onder de H1) ── */}
      <LandingHero
        badge="BRL 100 v3.0 · Auditmap · Je bewijs op één plek"
        heading="BRL 100 versie 3.0: "
        headingAccent="zo staat jouw auditmap klaar"
        meta={<UpdatedOn dateISO={AUDITMAP_PAGE.dateModified} />}
        sub={answerFirst}
        ctaPrimary={{ label: `Start ${TRIAL_DAGEN} dagen gratis →`, href: '/registreren' }}
        ctaSecondary={{ label: 'Wat de auditor wil zien', href: '#wat-de-auditor-wil-zien' }}
      />

      {/* ── 2. Wat verandert er ── */}
      <Section id="wat-verandert-er" className="border-y border-[var(--border)] bg-white">
        <h2 className={h2} style={h2Size}>Wat verandert er met BRL 100 v3.0</h2>
        <div className={prose}>
          <p>Versie 3.0 verbreedt de scope en scherpt de veiligheidseisen aan. De eisen aan je registraties bestonden al.</p>
        </div>
        <ul className={`${bullets} mt-5`}>
          {veranderingen.map(v => (
            <li key={v.kop}>
              <strong className="text-[var(--text)]">{v.kop}.</strong> {v.tekst}
            </li>
          ))}
        </ul>
        <p className={`${prose} mt-5`}>
          Wil je weten wat de audit van je administratie vraagt en welke software daarbij helpt? Lees{' '}
          <Link href="/brl-100-software" className={anchor}>BRL 100 software</Link>.
        </p>
      </Section>

      {/* ── 3. Wat de auditor wil zien ── */}
      <Section id="wat-de-auditor-wil-zien" breed>
        <h2 className={h2} style={h2Size}>Wat de auditor wil zien</h2>
        <div className={prose}>
          <p>
            Per onderwerp: waar de auditor naar kijkt, en hoe Snellio dat regelt. Hoe je de audit week voor week
            voorbereidt, lees je in{' '}
            <Link href="/blog/brl-100-audit-voorbereiden" className={anchor}>BRL 100 v3.0-audit voorbereiden</Link>.
          </p>
        </div>

        <figure className="mt-6">
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[0_12px_40px_rgba(15,33,51,.1)]">
            <Image
              src={beeld.src}
              alt={beeld.alt}
              width={beeld.width}
              height={beeld.height}
              className="block h-auto w-full"
              sizes="(min-width: 960px) 860px, 92vw"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-[var(--muted2)]">{beeld.caption}</figcaption>
        </figure>

        <div className="mt-8 flex flex-col gap-5">
          {blokken.filter(b => b.zichtbaar).map(b => (
            <article key={b.id} id={b.id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
              <h3 className="border-b border-[var(--border)] bg-[var(--navy)] px-5 py-3.5 font-outfit text-lg font-bold text-[var(--text)]">
                {b.titel}
              </h3>
              <div className="grid md:grid-cols-[2fr_3fr]">
                <div className="p-5">
                  <p className={label}>De auditor wil zien</p>
                  <p className="text-[.95rem] leading-relaxed text-[var(--text2)]">{b.auditor}</p>
                </div>
                <div className="border-t border-[var(--border)] p-5 md:border-l md:border-t-0">
                  <p className={label}>Zo regelt Snellio het</p>
                  <ul className="flex list-none flex-col gap-2.5">
                    {b.snellio.map(regel => (
                      <li key={regel} className="flex items-start gap-3 text-[.95rem] leading-relaxed text-[var(--text)]">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(18,168,122,.15)] text-xs font-bold text-[var(--green)]"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <span>{regel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── 4. Wat Snellio niet doet ── */}
      <Section id="wat-snellio-niet-doet" className="border-y border-[var(--border)] bg-white">
        <h2 className={h2} style={h2Size}>Wat Snellio niet doet</h2>
        <div className={prose}>
          <p>
            Snellio vervangt de certificerende instelling niet en geeft geen certificaat. Dat doet de partij die
            je audit uitvoert. Jij blijft verantwoordelijk voor je kwaliteitssysteem en je TRA, en voor het
            raadplegen van het EVD van de exploitant. Snellio zorgt dat je bewijs op orde en vindbaar is.
          </p>
        </div>
      </Section>

      {/* ── 5. FAQ (zichtbaar en schema uit dezelfde array) ── */}
      <LandingFaq items={faqs} heading="Veelgestelde vragen" />
      <div className="bg-[var(--navy3)] px-[5%] pb-16 text-center text-[.95rem] leading-relaxed text-[var(--text2)]">
        <p className="mx-auto max-w-2xl">
          <Link href="/pricing" className={anchor}>Bekijk de prijzen</Link>
          {' · '}
          <Link href={HANDBOEK.href} className={anchor}>Het BRL 100-handboek</Link>
        </p>
      </div>

      {/* ── 6. CTA ── */}
      <Cta />

      {/* ── 7. Bronnen ── */}
      <Section id="bronnen" className="border-t border-[var(--border)]">
        <h2 className={h2} style={h2Size}>Bronnen</h2>
        <ol className={`${numbers} text-[.95rem]`}>
          {bronnen.map(bron => (
            <li key={bron.href}>
              <a href={bron.href} className={anchor} rel="noopener" target="_blank">
                {bron.label}
              </a>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
