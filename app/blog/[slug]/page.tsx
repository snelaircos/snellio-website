import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { existsSync, openSync, readSync, closeSync } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { buildMetadata }  from '@/lib/metadata'
import { POSTS, getPost } from '@/lib/posts'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schemas'
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

// Afbeeldingen die (nog) niet in /public staan worden niet gerenderd en niet
// als OG-image opgegeven: geen kapotte <img>, geen placeholder. Pagina's zijn
// statisch, dus na het toevoegen van bestanden is een nieuwe build nodig.
function publicFileExists(src: string): boolean {
  return existsSync(path.join(process.cwd(), 'public', src))
}

// Afmetingen uit de PNG-header (IHDR), voor width/height op de <img> (geen
// layout-shift) en om staande telefoon-screenshots smaller te tonen.
function pngSize(src: string): { width: number; height: number } | null {
  try {
    const fd = openSync(path.join(process.cwd(), 'public', src), 'r')
    const buf = Buffer.alloc(24)
    readSync(fd, buf, 0, 24, 0)
    closeSync(fd)
    if (buf.toString('ascii', 1, 4) !== 'PNG') return null
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  } catch { return null }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return buildMetadata({ title: 'Artikel niet gevonden', description: '', noIndex: true })
  const meta = buildMetadata({
    title:       post.metaTitle ?? post.title,
    description: post.description,
    path:        `/blog/${params.slug}`,
    // Eigen header-afbeelding als OG-image; zonder valt de sitewide
    // opengraph-image file-conventie automatisch in.
    ...(post.image && publicFileExists(post.image.src) ? { image: post.image.src } : {}),
  })
  // Artikel-specifieke Open Graph: type article + publicatiedatum.
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type:          'article',
      publishedTime: post.dateISO,
      authors:       [post.author?.name ?? 'Rudy Snel'],
    },
  }
}

// Minimale inline-renderer: **tekst** → <strong>, [tekst](/pad) → interne
// <Link>. Overige tekst blijft platte string zodat whitespace-pre-line de
// regelafbrekingen behoudt.
function renderInline(content: string) {
  return content.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-[var(--text)] font-semibold">{part.slice(2, -2)}</strong>
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      return (
        <Link key={i} href={link[2]} className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--text)] transition-colors">
          {link[1]}
        </Link>
      )
    }
    return part
  })
}

// Blok-renderer: '## Kop' → <h2>, '![alt](/pad)' → <figure>, de rest gaat
// als tekstblok (whitespace-pre-line) door de inline-renderer. Posts zonder
// koppen/afbeeldingen renderen exact als voorheen.
type Block =
  | { type: 'h2';   text: string }
  | { type: 'img';  alt: string; src: string }
  | { type: 'text'; text: string }

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = []
  let buffer: string[] = []
  const flush = () => {
    const text = buffer.join('\n').replace(/^\s*\n+|\n+\s*$/g, '')
    if (text.trim()) blocks.push({ type: 'text', text })
    buffer = []
  }
  for (const raw of content.split('\n')) {
    const line = raw.trim()
    const h2  = line.match(/^## (.+)$/)
    const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/)
    if (h2)  { flush(); blocks.push({ type: 'h2', text: h2[1] }); continue }
    if (img) { flush(); blocks.push({ type: 'img', alt: img[1], src: img[2] }); continue }
    buffer.push(raw)
  }
  flush()
  return blocks
}

function renderBlocks(content: string) {
  return parseBlocks(content).map((block, i) => {
    if (block.type === 'h2') {
      return (
        <h2 key={i} className="font-outfit font-bold text-[var(--text)] text-2xl leading-snug mt-10 mb-4">
          {block.text}
        </h2>
      )
    }
    if (block.type === 'img') {
      if (!publicFileExists(block.src)) return null
      const size = pngSize(block.src)
      const portrait = !!size && size.height > size.width
      return (
        <figure key={i} className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element -- statische PNG's uit /public; lazy + expliciete afmetingen volstaan */}
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            width={size?.width}
            height={size?.height}
            className={`max-w-full h-auto block rounded-xl ring-1 ring-[var(--border)] shadow-[0_16px_48px_rgba(15,33,51,.12)] ${portrait ? 'w-[min(100%,360px)] mx-auto' : 'w-full'}`}
          />
        </figure>
      )
    }
    return <div key={i} className="whitespace-pre-line">{renderInline(block.text)}</div>
  })
}

export default function BlogPost({ params }: Props) {
  const post = getPost(params.slug)

  // Echte 404 (geen soft-404 met status 200) — belangrijk voor zoekmachines.
  if (!post) notFound()

  const authorName = post.author?.name ?? 'Rudy Snel'
  const showHeaderImage = !!post.image && post.image.showAsHeader !== false && publicFileExists(post.image.src)

  return (
    <>
      <JsonLd schema={articleSchema({ ...post, image: post.image && publicFileExists(post.image.src) ? post.image : undefined })} />
      {post.faq && <JsonLd schema={faqSchema(post.faq)} />}
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
            <span className="text-xs font-mono text-[var(--accent)] bg-[rgba(10,187,214,.1)] px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <time dateTime={post.dateISO} className="text-sm text-[var(--muted2)]">{post.date}</time>
            <span className="text-sm text-[var(--muted2)]">· {post.readTime} leestijd</span>
          </div>

          {/* Titel */}
          <h1 className="font-outfit font-black text-[var(--text)] leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            {post.title}
          </h1>

          {/* Auteur-byline (E-E-A-T) */}
          <p className="text-sm text-[var(--muted2)] mb-8">
            Door <span className="text-[var(--text2)] font-medium">{authorName}</span>, oprichter van Snellio en STEK-gecertificeerd installateur
          </p>

          {/* Header-afbeelding (optioneel per post) */}
          {showHeaderImage && post.image && (
            <figure className="mb-10">
              <div className="rounded-xl overflow-hidden bg-white shadow-[0_16px_48px_rgba(15,33,51,.12)] ring-1 ring-[var(--border)]">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  width={post.image.width}
                  height={post.image.height}
                  className="w-full h-auto block"
                  sizes="(min-width: 768px) 720px, 92vw"
                  priority
                />
              </div>
              {post.image.caption && (
                <figcaption className="text-center text-[var(--muted2)] text-xs mt-3">{post.image.caption}</figcaption>
              )}
            </figure>
          )}

          {/* Content */}
          <div className="text-[var(--text2)] text-[1.05rem] leading-relaxed">
            {renderBlocks(post.content)}
          </div>

          {/* FAQ (optioneel per post; ook als FAQPage-schema) */}
          {post.faq && post.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="font-outfit font-bold text-[var(--text)] text-2xl mb-6">Veelgestelde vragen</h2>
              <dl className="flex flex-col gap-4">
                {post.faq.map(item => (
                  <div key={item.question} className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-5">
                    <dt className="font-semibold text-[var(--text)] mb-2">{item.question}</dt>
                    <dd className="text-[var(--text2)] text-sm leading-relaxed">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2 list-none" aria-label="Onderwerpen">
              {post.tags.map(tag => (
                <li key={tag} className="text-xs text-[var(--muted2)] border border-[var(--border)] rounded-full px-3 py-1">{tag}</li>
              ))}
            </ul>
          )}

          {/* Auteursbox */}
          {post.author && (
            <aside className="mt-10 bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-6">
              <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-2">Over de auteur</p>
              <p className="font-outfit font-bold text-[var(--text)] mb-1">{post.author.name}</p>
              <p className="text-[var(--text2)] text-sm leading-relaxed">{post.author.bio}</p>
            </aside>
          )}

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
