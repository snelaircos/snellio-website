import Link from 'next/link'

interface RelatedLink {
  href:  string
  icon:  string
  title: string
  desc:  string
}

interface Props {
  heading?: string
  links:    RelatedLink[]
}

export default function LandingInternalLinks({ heading = 'Meer ontdekken', links }: Props) {
  return (
    <section className="py-16 px-[5%] bg-[var(--navy2)] border-t border-[var(--border)]">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[.65rem] text-[var(--muted2)] uppercase tracking-[.14em] text-center mb-8">
          {heading}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col gap-2 bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-5 hover:border-[rgba(10,187,214,.3)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="font-outfit font-bold text-white text-sm group-hover:text-[var(--cyan)] transition-colors">
                {link.title}
              </span>
              <span className="text-[var(--muted2)] text-xs leading-relaxed">{link.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
