import { NextRequest, NextResponse } from 'next/server'

interface DemoPayload {
  naam:         string
  bedrijfsnaam: string
  email:        string
  telefoon?:    string
}

export async function POST(req: NextRequest) {
  try {
    const body: DemoPayload = await req.json()

    // Basis validatie
    if (!body.naam?.trim() || !body.bedrijfsnaam?.trim() || !body.email?.includes('@')) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 })
    }

    // ── OPTIE 1: Resend (aanbevolen) ──────────────────────────────────────────
    // Installeer met: npm install resend
    // Voeg RESEND_API_KEY toe aan .env.local
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from:    'demo@snellio.nl',
    //   to:      'info@snellio.nl',
    //   subject: `Nieuwe demo aanvraag: ${body.bedrijfsnaam}`,
    //   text:    `Naam: ${body.naam}\nBedrijf: ${body.bedrijfsnaam}\nEmail: ${body.email}\nTel: ${body.telefoon || '-'}`,
    // })
    // ─────────────────────────────────────────────────────────────────────────

    // ── OPTIE 2: Stuur door naar Snellio Edge Function ───────────────────────
    // const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    // await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     to: 'info@snellio.nl',
    //     subject: `Demo aanvraag: ${body.bedrijfsnaam}`,
    //     html: `<p>Naam: ${body.naam}</p><p>Bedrijf: ${body.bedrijfsnaam}</p><p>Email: ${body.email}</p>`,
    //   }),
    // })
    // ─────────────────────────────────────────────────────────────────────────

    // ── TIJDELIJKE LOG (verwijder in productie) ───────────────────────────────
    console.log('[Demo aanvraag]', {
      naam:        body.naam,
      bedrijf:     body.bedrijfsnaam,
      email:       body.email,
      telefoon:    body.telefoon || '-',
      timestamp:   new Date().toISOString(),
    })
    // ─────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('[Demo API error]', err)
    return NextResponse.json({ error: 'Er ging iets mis. Probeer het opnieuw.' }, { status: 500 })
  }
}