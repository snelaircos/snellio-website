'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { JAAR_MAANDEN_BETAALD, JAARPRIJZEN_ANKER } from '@/lib/constants'

// Maand/jaar-schakelaar voor de prijzen op de homepage en /pricing.
//
// "Bekijk de jaarprijzen" linkt naar het anker #jaarprijzen. Komt een
// bezoeker met dat anker binnen (ook vanaf een andere pagina), of klikt hij
// op JaarprijzenLink op dezelfde pagina, dan springt de schakelaar op jaar.
// Het event is nodig omdat een klik op hetzelfde anker niet altijd een
// hashchange geeft.

const JAARPRIJZEN_EVENT = 'snellio:jaarprijzen'

export function usePeriode(): [boolean, (annual: boolean) => void] {
  const [annual, setAnnual] = useState(false)

  useEffect(() => {
    const naarJaar = () => setAnnual(true)
    const bijAnker = () => { if (window.location.hash === `#${JAARPRIJZEN_ANKER}`) naarJaar() }
    bijAnker()
    window.addEventListener('hashchange', bijAnker)
    window.addEventListener(JAARPRIJZEN_EVENT, naarJaar)
    return () => {
      window.removeEventListener('hashchange', bijAnker)
      window.removeEventListener(JAARPRIJZEN_EVENT, naarJaar)
    }
  }, [])

  return [annual, setAnnual]
}

/** Link naar de jaarprijzen op dezelfde pagina; zet de schakelaar op jaar. */
export function JaarprijzenLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href={`#${JAARPRIJZEN_ANKER}`}
      className={className}
      onClick={() => window.dispatchEvent(new Event(JAARPRIJZEN_EVENT))}
    >
      {children}
    </a>
  )
}

interface PeriodeSchakelaarProps {
  annual:   boolean
  onChange: (annual: boolean) => void
  /** Uitlegregel onder de schakelaar (10 maanden betalen, 12 gebruiken). */
  uitleg?:  boolean
}

export default function PeriodeSchakelaar({ annual, onChange, uitleg = true }: PeriodeSchakelaarProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="group"
        aria-label="Betaalperiode"
        className="inline-flex items-center rounded-full bg-white border border-[var(--border)] p-1 shadow-sm"
      >
        <button
          type="button"
          onClick={() => onChange(false)}
          aria-pressed={!annual}
          className={`px-3.5 sm:px-5 py-2 rounded-full text-sm font-semibold transition-colors ${!annual ? 'bg-[var(--accent)] text-white shadow' : 'text-[var(--text2)] hover:text-[var(--text)]'}`}
        >
          Maandelijks
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          aria-pressed={annual}
          className={`px-3.5 sm:px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 sm:gap-2 ${annual ? 'bg-[var(--accent)] text-white shadow' : 'text-[var(--text2)] hover:text-[var(--text)]'}`}
        >
          Jaarlijks
          <span className={`text-[.65rem] font-bold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap ${annual ? 'bg-white/20 text-white' : 'bg-[rgba(18,168,122,.12)] text-[var(--green)]'}`}>
            2 maanden gratis
          </span>
        </button>
      </div>
      {uitleg && (
        <p className="text-xs text-[var(--muted2)] text-center">
          {annual
            ? `Bij jaarbetaling betaal je ${JAAR_MAANDEN_BETAALD} maanden en gebruik je Snellio 12 maanden.`
            : 'Maandelijks opzegbaar. Kies je later voor jaarlijks, dan betaal je 10 maanden en gebruik je er 12.'}
        </p>
      )}
    </div>
  )
}
