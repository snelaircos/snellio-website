import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata }  from '@/lib/metadata'
import { POSTS, getPost } from '@/lib/posts'
import { articleSchema, breadcrumbSchema } from '@/lib/schemas'
import JsonLd    from '@/components/seo/JsonLd'
import Container from '@/components/ui/Container'
import Button    from '@/components/ui/Button'
import Cta       from '@/components/sections/Cta'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

// Alle slugs zijn bij build bekend — onbekende slug = direct een echte 404
// met status 404 (zonder dit gaf de server een soft-404 met status 200).
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return buildMetadata({ title: 'Artikel niet gevonden', description: '', noIndex: true })
  const meta = buildMetadata({
    title:       post.title,
    description: post.description,
    path:        `/blog/${params.slug}`,
  })
  // Artikel-specifieke Open Graph: type article + publicatiedatum.
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type:          'article',
      publishedTime: post.dateISO,
      authors:       ['Rudy Snel'],
    },
  }
}

// Minimale inline-renderer: **tekst** → <strong>, [tekst](/pad) → interne
// <Link>. Overige tekst blijft platte string zodat whitespace-pre-line de
// regelafbrekingen behoudt.
function renderContent(content: string) {
  return content.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      return (
        <Link key={i} href={link[2]} className="text-[var(--cyan)] underline underline-offset-2 hover:text-white transition-colors">
          {link[1]}
        </Link>
      )
    }
    return part
  })
}

export default function BlogPost({ params }: Props) {
  const post = getPost(params.slug)

  // Echte 404 (geen soft-404 met status 200) — belangrijk voor zoekmachines.
  if (!post) notFound()

  return (
    <>
      <JsonLd schema={articleSchema(post)} />
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: post.title, href: `/blog/${post.slug}` },
      ])} />

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
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-mono text-[var(--cyan)] bg-[rgba(10,187,214,.1)] px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <time dateTime={post.dateISO} className="text-sm text-[var(--muted2)]">{post.date}</time>
            <span className="text-sm text-[var(--muted2)]">· {post.readTime} leestijd</span>
          </div>

          {/* Titel */}
          <h1 className="font-outfit font-black text-white leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            {post.title}
          </h1>

          {/* Auteur-byline (E-E-A-T) */}
          <p className="text-sm text-[var(--muted2)] mb-8">
            Door <span className="text-[var(--text2)] font-medium">Rudy Snel</span>, oprichter van Snellio en STEK-gecertificeerd installateur
          </p>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none text-[var(--text2)] leading-relaxed whitespace-pre-line">
            {renderContent(post.content)}
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
