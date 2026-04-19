import Button from '@/components/ui/Button'
import { STATS } from '@/lib/constants'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-32 pb-20 overflow-hidden"
      aria-label="Hero sectie"
    >
      {/* Achtergrond glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-hero-radial" />
        <div
          className="absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Badge */}
      <div className="relative animate-fade-up inline-flex items-center gap-2 bg-[rgba(10,187,214,.1)] border border-[rgba(10,187,214,.3)] rounded-full px-4 py-1.5 mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)] animate-pulse-dot" />
        <span className="font-mono text-[.68rem] text-[var(--cyan)] tracking-[.08em] uppercase">
          BRL100 • F-gas 2024/573 • EPBD ready
        </span>
      </div>

      {/* Heading */}
      <h1
        className="relative font-outfit font-black text-white tracking-tight leading-[1.05] max-w-3xl animate-fade-up-1"
        style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}
      >
        Stop met losse tools. Regel je hele installatiebedrijf in{' '}
        <span className="gradient-text">één systeem.</span>
      </h1>

      {/* Sub */}
      <p className="relative text-[var(--text2)] text-[1.05rem] leading-[1.7] max-w-[520px] mt-5 mb-8 animate-fade-up-2">
        Van werkbonnen en planning tot F-gassen registratie en BRL100-rapportage. Geen losse apps meer, geen gedoe op locatie en geen administratie achteraf.
      </p>

      {/* CTA knoppen */}
      <div className="relative flex gap-3.5 flex-wrap justify-center animate-fade-up-3">
        <Button href="/registreren" size="lg">
          Start 14 dagen gratis →
        </Button>
        <Button href="/contact" variant="ghost" size="lg">
          Bekijk demo
        </Button>
      </div>

      {/* Stats */}
      <div className="relative flex gap-12 mt-16 flex-wrap justify-center animate-fade-up-4">
        {STATS.map(stat => (
          <div key={stat.label} className="text-center">
            <div className="font-outfit font-black text-[1.8rem] text-white leading-none">
              {stat.value}
              {stat.suffix && <span className="text-[var(--cyan)] text-[1.2rem] ml-0.5">{stat.suffix}</span>}
            </div>
            <div className="font-mono text-[.6rem] text-[var(--muted2)] uppercase tracking-[.1em] mt-1.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
