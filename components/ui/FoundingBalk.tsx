'use client'

import { useEffect, useState } from 'react'

// Founding-balk boven de prijzen (homepage en /pricing), besluit Rudy
// 25-11-2026. De site toont al de prijzen van 2027; wie vóór 1 januari 2027
// een abonnement kiest, wordt founding partner en houdt de huidige prijs.
//
// Datumgestuurd in de browser: de pagina's zijn statisch gebouwd, dus een
// controle bij het bouwen zou de balk tot de volgende deploy laten staan.
// Op de server rendert hij niets; in de browser verschijnt hij alleen vóór
// 1-1-2027 00:00 Nederlandse tijd. Na die datum is er geen deploy nodig.
export const FOUNDING_EINDE = Date.parse('2027-01-01T00:00:00+01:00')

export function foundingBalkZichtbaar(nu: number): boolean {
  return nu < FOUNDING_EINDE
}

export default function FoundingBalk({ className = '' }: { className?: string }) {
  const [tonen, setTonen] = useState(false)

  useEffect(() => {
    setTonen(foundingBalkZichtbaar(Date.now()))
  }, [])

  if (!tonen) return null

  return (
    <div
      role="note"
      className={`rounded-2xl border-2 border-[#f59e0b] bg-[#fffbeb] px-5 py-4 md:px-7 md:py-5 text-center text-[#78350f] text-[.98rem] md:text-[1.05rem] leading-[1.5] shadow-[0_6px_24px_rgba(245,158,11,.18)] ${className}`}
    >
      <strong className="font-extrabold">Nu instappen?</strong>{' '}
      Kies vóór 1 januari 2027 een abonnement en word founding partner: €29 per maand of €290 per jaar,
      incl. btw, zolang je abonnement loopt.
    </div>
  )
}
