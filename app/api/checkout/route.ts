// POST /api/checkout — UITGESCHAKELD (stap 12, 05-09-2026).
// De aanmelding met €0,01-mandaatbetaling bestaat niet meer: aanmelden gaat
// via /api/aanmelden zonder betaalgegevens (14 dagen gratis, daarna kiest de
// klant in de app zelf maand/jaar × iDEAL/incasso). Deze route blijft bestaan
// zodat oude links/tabbladen een nette melding krijgen i.p.v. een 404.

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    error: 'Aanmelden gaat nu zonder betaalgegevens. Vernieuw de pagina en probeer het opnieuw.',
    code: 'flow_vervangen',
  }, { status: 410 })
}
