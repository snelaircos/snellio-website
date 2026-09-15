import { type ReactNode } from 'react'

// Zichtbare update-datum onder een H1 (informatieve pagina's) of boven een
// prijsblok (commerciële pillars). De datum moet gelijk zijn aan
// dateModified in het schema van dezelfde pagina; geef daarom dezelfde
// ISO-string door die ook naar articleSchema/buildMetadata gaat.

interface UpdatedOnProps {
  /** ISO 8601 met tijdzone, bv. '2026-09-15T09:00:00+02:00'. */
  dateISO:    string
  /** Standaard "Bijgewerkt op"; op pillars "Prijzen en functies gecontroleerd op". */
  label?:     string
  /** Optionele auteursregel na de datum, bv. "Door Rudy Snel, …". */
  by?:        ReactNode
  className?: string
}

const datumNL = new Intl.DateTimeFormat('nl-NL', {
  day:      'numeric',
  month:    'long',
  year:     'numeric',
  timeZone: 'Europe/Amsterdam',
})

export function formatDatumNL(iso: string): string {
  return datumNL.format(new Date(iso))
}

export default function UpdatedOn({ dateISO, label = 'Bijgewerkt op', by, className = '' }: UpdatedOnProps) {
  return (
    <p className={`text-sm text-[var(--muted2)] ${className}`}>
      {label}{' '}
      <time dateTime={dateISO} className="font-medium text-[var(--text2)]">
        {formatDatumNL(dateISO)}
      </time>
      {by && <> · {by}</>}
    </p>
  )
}
