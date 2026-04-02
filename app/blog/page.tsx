import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schemas'
import JsonLd    from '@/components/seo/JsonLd'
import Container from '@/components/ui/Container'
import Button    from '@/components/ui/Button'

export const metadata: Metadata = buildMetadata({
  title:       'Blog — Tips & kennis voor HVAC-installateurs',
  description: 'Praktische artikelen over HVAC, koeltechniek, BRL100-wetgeving, F-gassen en bedrijfsvoering voor installateurs. Kennisbank van Snellio.',
  path:        '/blog',
})

// Tijdelijke placeholder artikelen — vervangen door CMS of MDX
const posts = [
  {
    slug:     'brl100-uitgelegd',
    title:    'BRL100 uitgelegd: wat moet u registreren per werkorder?',
    excerpt:  'Een praktische gids voor installateurs over de BRL100-certificeringseisen en hoe Snellio dit volledig automatiseert.',
    category: 'Regelgeving',
    date:     '2025-01-15',
    readTime: '5 min',
  },
  {
    slug:     'f-gas-verordening-2024',
    title:    'EU F-gas verordening 2024/573: wat verandert er voor u?',
    excerpt:  'De nieuwe F-gas verordening treedt in werking. We zetten de belangrijkste wijzigingen op een rij voor koeltechnisch installateurs.',
    category: 'Regelgeving',
    date:     '2025-01-08',
    readTime: '7 min',
  },
  {
    slug:     'digitale-werkbon-voordelen',
    title:    '5 redenen waarom een digitale werkbon uw bedrijf efficiënter maakt',
    excerpt:  'Van snellere facturatie tot minder papierwerk. We lichten toe wat een digitale werkbon concreet oplevert voor installateurs.',
    category: 'Efficiëntie',
    date:     '2024-12-20',
    readTime: '4 min',
  },
]

export default function BlogPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
      ])} />

      <section className="pt-32 pb-8 px-[5%] text-center">
        <Container>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Kennisbank</p>
          <h1 className="font-outfit font-black text-white tracking-tight leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Tips & kennis voor<br />
            <span className="text-[var(--cyan)]">HVAC-installateurs</span>
          </h1>
          <p className="text-[var(--text2)] text-lg max-w-lg mx-auto">
            Regelgeving, software-tips en praktijkverhalen uit de koeltechniek.
          </p>
        </Container>
      </section>

      <section className="py-16 px-[5%]">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className="reveal group flex flex-col bg-[var(--navy3)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[rgba(10,187,214,.25)] transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Placeholder afbeelding */}
              <div className="h-40 bg-gradient-to-br from-[var(--navy)] to-[var(--navy3)] flex items-center justify-center text-4xl">
                ❄️
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-[var(--cyan)] bg-[rgba(10,187,214,.1)] px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-[var(--muted2)]">{post.readTime} lezen</span>
                </div>
                <h2 className="font-outfit font-bold text-white text-[1rem] leading-snug mb-3 group-hover:text-[var(--cyan)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[var(--muted2)] text-sm leading-relaxed flex-1 mb-5">
                  {post.excerpt}
                </p>
                <Button href={`/blog/${post.slug}`} variant="ghost" size="sm">
                  Lees meer →
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
