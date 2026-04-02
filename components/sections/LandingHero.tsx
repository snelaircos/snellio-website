import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

interface LandingHeroProps {
  badge?:        string
  heading:       string
  headingAccent: string
  sub:           string
  ctaPrimary?:   { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  stats?:        { value: string; label: string }[]
  trustLine?:    string
}

export default function LandingHero({
  badge,
  heading,
  headingAccent,
  sub,
  ctaPrimary   = { label: 'Start 30 dagen gratis →', href: '/registreren' },
  ctaSecondary = { label: 'Bekijk pakketten',         href: '/pricing'     },
  stats,
  trustLine,
}: LandingHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-[5%] pt-32 pb-20 overflow-hidden">
      {/* Achtergrond */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,187,214,.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,144,184,.1) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <Container>
        {badge && (
          <div className="inline-flex items-center gap-2 bg-[rgba(10,187,214,.1)] border border-[rgba(10,187,214,.3)] rounded-full px-4 py-1.5 mb-6 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)] animate-pulse-dot" />
            <span className="font-mono text-[.68rem] text-[var(--cyan)] tracking-[.08em] uppercase">{badge}</span>
          </div>
        )}

        <h1
          className="relative font-outfit font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto animate-fade-up-1"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
        >
          {heading}<br />
          <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {headingAccent}
          </span>
        </h1>

        <p className="relative text-[var(--text2)] text-[1.05rem] leading-[1.7] max-w-[580px] mx-auto mt-5 mb-9 animate-fade-up-2">
          {sub}
        </p>

        <div className="relative flex gap-3.5 flex-wrap justify-center animate-fade-up-3">
          <Button href={ctaPrimary.href} size="lg">{ctaPrimary.label}</Button>
          <Button href={ctaSecondary.href} variant="ghost" size="lg">{ctaSecondary.label}</Button>
        </div>

        {trustLine && (
          <p className="mt-5 text-[var(--muted2)] text-[.78rem] font-mono tracking-wide animate-fade-up-3">
            {trustLine}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div className="relative flex gap-10 mt-14 flex-wrap justify-center animate-fade-up-4">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-outfit font-black text-[1.7rem] leading-none text-white" dangerouslySetInnerHTML={{ __html: s.value }} />
                <div className="font-mono text-[.58rem] text-[var(--muted2)] uppercase tracking-[.1em] mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
