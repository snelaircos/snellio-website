interface Feature {
  icon:    string
  title:   string
  desc:    string
  badge?:  string
}

interface LandingFeaturesProps {
  label?:    string
  heading:   string
  accent:    string
  sub?:      string
  features:  Feature[]
  cols?:     2 | 3
}

export default function LandingFeatures({
  label,
  heading,
  accent,
  sub,
  features,
  cols = 3,
}: LandingFeaturesProps) {
  const gridCols = cols === 2
    ? 'sm:grid-cols-2'
    : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="py-24 px-[5%] bg-[var(--navy3)]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          {label && <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">{label}</p>}
          <h2 className="font-outfit font-black text-white tracking-tight leading-[1.15]"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            {heading}{' '}
            <span className="text-[var(--cyan)]">{accent}</span>
          </h2>
          {sub && <p className="text-[var(--text2)] text-base leading-relaxed max-w-xl mx-auto mt-4">{sub}</p>}
        </div>

        <div className={`grid ${gridCols} gap-5`}>
          {features.map((f, i) => (
            <article
              key={f.title}
              className="reveal group relative bg-[var(--navy2)] border border-[var(--border)] rounded-2xl p-7 hover:border-[rgba(10,187,214,.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,144,184,.12)]"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {f.badge && (
                <span className="absolute top-4 right-4 bg-[var(--green)] text-white text-[.6rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {f.badge}
                </span>
              )}
              <div className="w-11 h-11 rounded-xl bg-[rgba(0,144,184,.12)] border border-[rgba(0,144,184,.2)] flex items-center justify-center text-xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-outfit font-bold text-white text-[1rem] mb-2.5">{f.title}</h3>
              <p className="text-[var(--muted2)] text-[.84rem] leading-relaxed">{f.desc}</p>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                   style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,187,214,.05) 0%, transparent 70%)' }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
