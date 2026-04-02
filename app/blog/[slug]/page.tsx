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
      U hoeft niets handmatig over te nemen — het systeem verzorgt de juiste lay-out en veldvolgorde.
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
