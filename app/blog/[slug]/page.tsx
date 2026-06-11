import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import Container from '@/components/ui/Container'
import Button    from '@/components/ui/Button'
import Cta       from '@/components/sections/Cta'

// In productie: vervangen door CMS (Sanity, Contentlayer, MDX)
const POSTS: Record<string, { title: string; description: string; content: string; date: string; category: string }> = {
  'brl100-uitgelegd': {
    title:       'BRL100 uitgelegd: wat moet u registreren per werkorder?',
    description: 'Een praktische gids over BRL100-eisen en hoe Snellio dit automatiseert voor HVAC-installateurs.',
    category:    'Regelgeving',
    date:        '15 januari 2025',
    content:     `
      De BRL100-certificering stelt eisen aan de registratie van alle koeltechnische handelingen.
      Voor iedere werkorder waarbij u koudemiddelen aanraakt, bent u verplicht bepaalde gegevens vast te leggen.

      **Wat moet u registreren?**

      Per werkorder dient u minimaal vast te leggen:
      - Type installatie en koudemiddel
      - Begin- en eindmetingen (druk en temperatuur)
      - Lektest resultaat
      - Vacuümwaarden en standtijd
      - Hoeveelheid koudemiddel bijgevuld of afgetapt
      - Handtekening installateur en klant

      **Hoe Snellio dit oplost**

      Snellio genereert automatisch een BRL100-compliant rapport op basis van de koeltechnische handelingen die u invoert.
      U hoeft niets handmatig over te nemen, het systeem verzorgt de juiste lay-out en veldvolgorde.
    `,
  },
  'f-gas-verordening-2024': {
    title:       'EU F-gas verordening 2024/573: wat verandert er voor u?',
    description: 'De nieuwe Europese F-gassenverordening (EU) 2024/573 vervangt 517/2014. Een praktisch overzicht van de belangrijkste wijzigingen, GWP-verboden en certificeringseisen voor koeltechnisch installateurs.',
    category:    'Regelgeving',
    date:        '8 januari 2025',
    content:     `
      Op 11 maart 2024 is de nieuwe Europese F-gassenverordening (EU) 2024/573 in werking getreden. Deze verordening
      vervangt de oude verordening (EU) 517/2014 en scherpt de eisen voor het werken met gefluoreerde broeikasgassen
      flink aan. Voor koeltechnisch installateurs verandert er de komende jaren veel, zowel op het gebied van toegestane
      koudemiddelen als op het gebied van certificering.

      **Drie grote lijnen**

      De verordening rust op drie pijlers:
      - Het in stappen versneld terugbrengen van de hoeveelheid F-gassen die op de Europese markt mag worden gebracht (HFK-quota).
      - Een reeks verboden op het op de markt brengen van producten en apparatuur die F-gassen met een hoog GWP bevatten.
      - Installaties lekdicht bouwen en houden, met sluitende registratie van alle handelingen.

      **Strengere GWP-grenzen en bijvulverboden**

      De Global Warming Potential (GWP) van een koudemiddel bepaalt steeds vaker of u het nog mag gebruiken:
      - Vanaf 1 januari 2026 geldt een verbod op het bijvullen van koel- en klimaatapparatuur met nieuw geproduceerd
        koudemiddel met een GWP van 2500 of hoger. Geregenereerd of gerecycled koudemiddel met een GWP ≥ 2500 mag nog
        tot 1 januari 2032 worden gebruikt voor onderhoud en reparatie.
      - Voor veel nieuwe apparatuur worden de maximale GWP-grenzen verlaagd naar 750 of zelfs 150. Split-units onder
        12 kW lopen op termijn tegen een volledig F-gasverbod aan.
      - Vanaf 1 januari 2032 geldt voor de meeste koelapparatuur (met uitzondering van chillers) een verbod op nieuw
        koudemiddel met een GWP van 750 of hoger.

      **Certificering uitgebreid naar natuurlijke koudemiddelen**

      Een van de belangrijkste wijzigingen voor monteurs: de certificeringsplicht geldt niet langer alleen voor F-gassen,
      maar ook voor natuurlijke alternatieven zoals koolwaterstoffen (propaan, isobutaan), CO₂ en ammoniak.
      - Vanaf 29 september 2025 moeten monteurs die met deze natuurlijke koudemiddelen werken eveneens gecertificeerd zijn.
      - De overgangsperiode voor de bestaande certificaten loopt tot 29 maart 2026; daarna worden alleen nog certificaten
        volgens het nieuwe, gecombineerde schema afgegeven.
      - Uiterlijk 12 maart 2029 moeten alle installateurs gecertificeerd zijn volgens het nieuwe systeem.

      **Wat betekent dit concreet voor uw administratie?**

      De verplichting om elke handeling met koudemiddelen nauwkeurig vast te leggen wordt belangrijker dan ooit. Bij een
      inspectie moet u per installatie kunnen aantonen welk koudemiddel is gebruikt, hoeveel is bijgevuld of afgetapt,
      wanneer de laatste lektest is uitgevoerd en met welk resultaat. Een onvolledig of verouderd logboek is een reëel risico.

      **Hoe Snellio u helpt**

      Snellio houdt automatisch de koudemiddelbalans per installatie en per fles bij, signaleert verlopende ijkdata van
      lekdetectoren en registreert elke F-gas handeling direct vanuit de werkbon. De jaarrapportage en het volledige
      logboek zijn altijd actueel en direct exporteerbaar, zodat u bij een audit binnen enkele minuten alle documentatie
      conform EU F-gas Verordening 2024/573 kunt overleggen.

      Let op: dit artikel is een praktische samenvatting en geen juridisch advies. Raadpleeg voor uw specifieke situatie
      altijd de officiële verordeningstekst of uw certificerende instantie.
    `,
  },
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = POSTS[params.slug]
  if (!post) return buildMetadata({ title: 'Artikel niet gevonden', description: '', noIndex: true })
  return buildMetadata({
    title:       post.title,
    description: post.description,
    path:        `/blog/${params.slug}`,
  })
}

export default function BlogPost({ params }: Props) {
  const post = POSTS[params.slug]

  if (!post) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="font-outfit font-bold text-white text-3xl mb-4">Artikel niet gevonden</h1>
        <Button href="/blog">← Terug naar blog</Button>
      </div>
    )
  }

  return (
    <>
      <article className="pt-32 pb-20 px-[5%]">
        <Container narrow>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--muted2)] mb-8">
            <Button href="/" variant="ghost" size="sm">Home</Button>
            <span>/</span>
            <Button href="/blog" variant="ghost" size="sm">Blog</Button>
            <span>/</span>
            <span className="text-[var(--text2)]">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-[var(--cyan)] bg-[rgba(10,187,214,.1)] px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-[var(--muted2)]">{post.date}</span>
          </div>

          {/* Titel */}
          <h1 className="font-outfit font-black text-white leading-tight tracking-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none text-[var(--text2)] leading-relaxed whitespace-pre-line">
            {post.content}
          </div>

          {/* Terug */}
          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <Button href="/blog" variant="ghost">← Alle artikelen</Button>
          </div>
        </Container>
      </article>

      <Cta />
    </>
  )
}
