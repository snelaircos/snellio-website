import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import {
  breadcrumbSchema, personSchema,
  PERSON_NAME, PERSON_JOBTITLE, PERSON_PATH, PERSON_LINKEDIN,
} from '@/lib/schemas'
import { POSTS } from '@/lib/posts'
import { SITE } from '@/lib/constants'
import JsonLd from '@/components/seo/JsonLd'

// Auteurspagina, zie docs/seo-geo/06-schema-entity.md (rij "Auteurspagina").
// Alleen feiten: functie, bedrijf, certificering, artikelen, contact. Geen
// marketingtekst. Het Person-schema komt uit lib/schemas.ts (personSchema);
// andere pagina's verwijzen er alleen via @id naar.
//
// Certificering zoals opgegeven door Rudy Snel op 15-09-2026. Bewust geen
// certificaatnummer op de pagina, dus ook geen hasCredential in het schema.
// Startjaar in de koeltechniek (2017) opgegeven door Rudy Snel op 15-09-2026.

const DESCRIPTION =
  'Rudy Snel is oprichter van Snellio en eigenaar van Snel Airco’s, een koeltechniekbedrijf, en werkt in de koeltechniek sinds 2017. STEK-gecertificeerd, F-gassen categorie I en B1 voor brandbare koudemiddelen. Hij schrijft op snellio.nl over BRL 100 en F-gassenregistratie.'

export const metadata: Metadata = buildMetadata({
  title:       'Rudy Snel, oprichter van Snellio en koeltechnisch installateur',
  description: DESCRIPTION,
  path:        PERSON_PATH,
})

const EMAIL = 'rudy@snellio.nl'

const label  = 'mb-3 font-mono text-[.68rem] uppercase tracking-[.12em] text-[var(--accent)]'
const h2     = 'font-outfit font-black tracking-tight text-[var(--text)] mb-5 scroll-mt-24'
const h2Size = { fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' } as const
const anchor = 'text-[var(--accent)] underline underline-offset-2 hover:text-[var(--text)] transition-colors'

const feiten: { term: string; detail: string }[] = [
  {
    term:   'Functie',
    detail: `Oprichter van Snellio, CRM- en werkbonsoftware voor koeltechnische installateurs, sinds ${SITE.founded}.`,
  },
  {
    term:   'Bedrijf',
    detail: 'Eigenaar van Snel Airco’s, een koeltechniekbedrijf in Nederland dat zelf onder BRL 100 werkt.',
  },
  {
    term:   'Ervaring',
    detail: 'In de koeltechniek sinds 2017.',
  },
  {
    term:   'Certificering',
    detail: 'STEK-gecertificeerd. Persoonscertificaat F-gassen categorie I, aanvullend B1 voor brandbare koudemiddelen.',
  },
  {
    term:   'Schrijft over',
    detail: 'BRL 100, F-gassenregistratie, koeltechniek en warmtepompen, vanuit de administratie van het eigen bedrijf.',
  },
]

const artikelen = [...POSTS].sort((a, b) => b.dateISO.localeCompare(a.dateISO))

export default function RudySnelPage() {
  return (
    <>
      <JsonLd schema={[
        personSchema(),
        breadcrumbSchema([
          { name: 'Home',      href: '/' },
          { name: PERSON_NAME, href: PERSON_PATH },
        ]),
      ]} />

      <article className="bg-[var(--bg)]">
        {/* ── Kop ── */}
        <section className="px-[5%] pb-10 pt-14 md:pt-20">
          <div className="mx-auto grid max-w-3xl items-center gap-8 md:grid-cols-[200px_1fr] md:gap-10">
            <div className="flex justify-center md:justify-start">
              <div className="h-[200px] w-[200px] overflow-hidden rounded-full shadow-[0_8px_24px_rgba(0,144,184,.25)] ring-4 ring-white">
                <Image
                  src="/rudy-snel.png"
                  alt="Rudy Snel, oprichter van Snellio en eigenaar van Snel Airco’s"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  sizes="200px"
                  priority
                />
              </div>
            </div>
            <div>
              <p className={label}>Over de auteur</p>
              <h1
                className="mb-2 font-outfit font-black leading-[1.08] tracking-tight text-[var(--text)]"
                style={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.1rem)' }}
              >
                {PERSON_NAME}
              </h1>
              <p className="mb-5 text-lg font-medium text-[var(--text2)]">{PERSON_JOBTITLE}</p>
              <p className="border-l-[3px] border-[var(--accent)] pl-4 text-[1.05rem] leading-relaxed text-[var(--text2)]">
                Rudy Snel is oprichter van Snellio en eigenaar van Snel Airco’s, een koeltechniekbedrijf dat zelf
                onder BRL 100 werkt, en werkt in de koeltechniek sinds 2017. Hij is STEK-gecertificeerd, met het persoonscertificaat F-gassen categorie I en
                de aanvulling B1 voor brandbare koudemiddelen. Op snellio.nl schrijft hij over BRL 100,
                F-gassenregistratie en de administratie van een installatiebedrijf.
              </p>
            </div>
          </div>
        </section>

        {/* ── Feiten ── */}
        <section id="functie-en-bedrijf" className="px-[5%] py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className={h2} style={h2Size}>Functie, bedrijf en certificering</h2>
            <dl className="divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
              {feiten.map(f => (
                <div key={f.term} className="grid gap-1 p-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="font-outfit text-sm font-bold text-[var(--text)]">{f.term}</dt>
                  <dd className="text-[1rem] leading-relaxed text-[var(--text2)]">{f.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted2)]">
              Snellio ontstond omdat de F-gassenadministratie in het eigen bedrijf tot de audit bleef liggen.
              Wat op deze site over BRL 100 en F-gassen staat, komt uit die praktijk en uit de bronnen die bij
              elk artikel vermeld staan.
            </p>
          </div>
        </section>

        {/* ── Artikelen ── */}
        <section id="artikelen" className="border-y border-[var(--border)] bg-white px-[5%] py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className={h2} style={h2Size}>Artikelen van Rudy Snel</h2>
            <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--navy2)]">
              {artikelen.map(post => (
                <li key={post.slug} className="p-5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-outfit text-[1.05rem] font-bold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-sm text-[var(--muted2)]">
                    <time dateTime={post.dateISO}>{post.date}</time> · {post.readTime}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[1rem] leading-relaxed text-[var(--text2)]">
              Uitgebreider, met bronnen:{' '}
              <Link href="/brl-100-software" className={anchor}>
                BRL 100: wat de auditor van je administratie vraagt
              </Link>
            </p>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="px-[5%] py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className={h2} style={h2Size}>Contact</h2>
            <ul className="space-y-3 text-[1rem] leading-relaxed text-[var(--text2)]">
              <li>
                E-mail:{' '}
                <a href={`mailto:${EMAIL}`} className={anchor}>{EMAIL}</a>
              </li>
              <li>
                LinkedIn:{' '}
                <a href={PERSON_LINKEDIN} className={anchor} rel="me noopener" target="_blank">
                  linkedin.com/in/rudy-snel
                </a>
              </li>
              <li>
                Vragen over Snellio als product:{' '}
                <Link href="/contact" className={anchor}>contactpagina</Link>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </>
  )
}
