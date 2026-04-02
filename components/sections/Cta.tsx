import Button from '@/components/ui/Button'

export default function Cta() {
  return (
    <section
      className="py-28 px-[5%] text-center relative overflow-hidden"
      aria-label="Aan de slag"
    >
      {/* Achtergrond glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(10,187,214,.1) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl">
        <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-5">
          Klaar om te beginnen?
        </p>
        <h2 className="font-outfit font-black text-white tracking-tight leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
          Start vandaag nog.<br />
          <span className="text-[var(--cyan)]">Gratis, geen creditcard.</span>
        </h2>
        <p className="text-[var(--text2)] text-[1.05rem] leading-relaxed mb-10">
          Binnen 5 minuten aan het werk. Installaties, werkbonnen en BRL100-rapporten direct beschikbaar.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/registreren" size="lg">
            Start 30 dagen gratis →
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Vraag demo aan
          </Button>
        </div>
      </div>
    </section>
  )
}
