import { NextRequest, NextResponse } from 'next/server'

// Demo-formulier endpoint. Ontvangt POST vanuit DemoForm op /demo en
// /crm-voor-installateurs, valideert, stuurt mail naar info@snellio.nl via
// dezelfde Supabase Edge Function send-email als ContactForm. RESEND_API_KEY
// is geconfigureerd als Supabase Secret, niet in dit project.

interface DemoPayload {
  naam:         string
  bedrijfsnaam: string
  email:        string
  telefoon?:    string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  try {
    const body: DemoPayload = await req.json()

    // Basis validatie
    if (!body.naam?.trim() || !body.bedrijfsnaam?.trim() || !body.email?.includes('@')) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      console.error('[demo] server config ontbreekt: SUPABASE_URL of SERVICE_ROLE_KEY niet gezet')
      return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })
    }

    const naam     = escapeHtml(body.naam.trim())
    const bedrijf  = escapeHtml(body.bedrijfsnaam.trim())
    const email    = escapeHtml(body.email.trim())
    const telefoon = body.telefoon?.trim() ? escapeHtml(body.telefoon.trim()) : '<em>(niet opgegeven)</em>'

    const subject = `Demo-aanvraag van ${naam} — ${bedrijf}`
    const html = `
      <div style="font-family:system-ui,sans-serif;color:#0f2133;max-width:600px;">
        <h2 style="color:#0090b8;margin:0 0 8px;">Nieuwe demo-aanvraag via snellio.nl</h2>
        <p style="color:#5f7791;margin:0 0 20px;">Hete lead, reageer bij voorkeur binnen 1 werkdag.</p>
        <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
          <tr><td style="padding:6px 0;color:#5f7791;width:120px;">Naam</td><td style="padding:6px 0;font-weight:600;">${naam}</td></tr>
          <tr><td style="padding:6px 0;color:#5f7791;">Bedrijf</td><td style="padding:6px 0;font-weight:600;">${bedrijf}</td></tr>
          <tr><td style="padding:6px 0;color:#5f7791;">E-mail</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#0090b8;">${email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#5f7791;">Telefoon</td><td style="padding:6px 0;">${telefoon}</td></tr>
        </table>
        <p style="background:#f4f7fa;border-left:3px solid #0090b8;padding:14px 16px;border-radius:6px;color:#5f7791;font-size:14px;line-height:1.6;margin-bottom:0;">
          Demo-aanvraag binnen via het formulier. Bel of mail terug om een tijdstip te plannen.
        </p>
        <p style="color:#8ea2b8;font-size:12px;margin-top:24px;border-top:1px solid #e4ecf2;padding-top:12px;">
          Verzonden via snellio.nl/demo · ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}
        </p>
      </div>
    `

    const res = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        to:        'info@snellio.nl',
        subject,
        html,
        reply_to:  body.email.trim(),
        from_name: 'Snellio Demo',
      }),
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      console.error('[demo] send-email function faalde:', res.status, errData)
      return NextResponse.json({ error: 'Aanvraag kon niet verstuurd worden, probeer het opnieuw.' }, { status: 502 })
    }

    // Console-log als fallback-spoor voor pm2-logs (handig bij issues).
    console.log('[Demo aanvraag verstuurd]', {
      naam:      body.naam,
      bedrijf:   body.bedrijfsnaam,
      email:     body.email,
      telefoon:  body.telefoon || '-',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('[Demo API error]', err)
    return NextResponse.json({ error: 'Er ging iets mis. Probeer het opnieuw.' }, { status: 500 })
  }
}
