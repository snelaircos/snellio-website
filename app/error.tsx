'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-[5%]">
      <p className="font-mono text-[var(--orange)] text-[.7rem] uppercase tracking-[.14em] mb-4">Fout</p>
      <h1 className="font-outfit font-black text-white text-4xl tracking-tight mb-4">
        Er is iets misgegaan
      </h1>
      <p className="text-[var(--text2)] text-lg max-w-sm mb-10 leading-relaxed">
        Probeer de pagina opnieuw te laden. Als het probleem aanhoudt, neem dan contact op.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="bg-gradient-btn text-white font-semibold px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(0,144,184,.4)] hover:-translate-y-0.5 transition-all duration-200"
        >
          Opnieuw proberen
        </button>
        <Button href="/" variant="ghost">← Terug naar home</Button>
      </div>
    </div>
  )
}
