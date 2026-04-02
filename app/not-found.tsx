import type { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title:       'Pagina niet gevonden — Snellio',
  description: 'Deze pagina bestaat niet. Ga terug naar de homepage van Snellio.',
  robots:      { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-[5%]">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(10,187,214,.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <p className="font-mono text-[var(--cyan)] text-[.7rem] uppercase tracking-[.14em] mb-4">404</p>
      <h1 className="font-outfit font-black text-white text-5xl tracking-tight mb-4">
        Pagina niet gevonden
      </h1>
      <p className="text-[var(--text2)] text-lg max-w-sm mb-10 leading-relaxed">
        De pagina die u zoekt bestaat niet of is verplaatst.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button href="/" size="lg">← Terug naar home</Button>
        <Button href="/contact" variant="ghost" size="lg">Contact opnemen</Button>
      </div>
    </div>
  )
}
