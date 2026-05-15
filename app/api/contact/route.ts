import { NextRequest, NextResponse } from 'next/server'

// Contact-formulier endpoint. Ontvangt POST vanuit ContactForm, valideert,
// en stuurt mail naar info@snellio.nl via de Supabase Edge Function send-email
// (die intern Resend gebruikt — RESEND_API_KEY zit als Supabase Secret, niet in
// dit project). Pattern volgt /api/route.ts (demo) maar nu wél met echte send.

interface ContactPayload {
  naam:     string
  email:    string
  bedrijf?: string
  bericht:  string
  demo?:    boolean
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
    const body: ContactPayload = await req.json()

    // Basis validatie
    if (!body.naam?.trim() || !body.email?.includes('@') || !body.bericht?.trim()) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      console.error('[contact] server config ontbreekt: SUPABASE_URL of SERVICE_ROLE_KEY niet gezet')
      return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })
    }

    const naam    = escapeHtml(body.naam.trim())
    const email   = escapeHtml(body.email.trim())
    const bedrijf = body.bedrijf?.trim() ? escapeHtml(body.bedrijf.trim()) : '<em>(niet opgegeven)</em>'
    const bericht = escapeHtml(body.bericht.trim()).replace(/\n/g, '<br>')
    const demoVlag = body.demo
      ? '<p style="background:#e3f6ee;border:1px solid #9bd9c0;color:#12a87a;padding:8px 12px;border-radius:6px;display:inline-block;font-weight:600;">✓ Ook geïnteresseerd in persoonlijke demo</p>'
      : ''

    const subject = `Contact: ${naam}${body.bedrijf ? ' — ' + body.bedrijf.trim() : ''}`
    const html = `
      <div style="font-family:system-ui,sans-serif;color:#0f2133;max-width:600px;">
        <h2 style="color:#0090b8;margin:0 0 16px;">Nieuw contact-bericht via snellio.nl</h2>
        <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
          <tr><td style="padding:6px 0;color:#5f7791;width:120px;">Naam</td><td style="padding:6px 0;font-weight:600;">${naam}</td></tr>
          <tr><td style="padding:6px 0;color:#5f7791;">E-mail</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#0090b8;">${email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#5f7791;">Bedrijf</td><td style="padding:6px 0;">${bedrijf}</td></tr>
        </table>
        <h3 style="margin:24px 0 8px;font-size:14px;color:#5f7791;text-transform:uppercase;letter-spacing:.08em;">Bericht</h3>
        <p style="background:#f4f7fa;border-left:3px solid #0090b8;padding:14px 16px;border-radius:6px;line-height:1.6;">${bericht}</p>
        ${demoVlag}
        <p style="color:#8ea2b8;font-size:12px;margin-top:24px;border-top:1px solid #e4ecf2;padding-top:12px;">
          Verzonden via snellio.nl/contact · ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}
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
        from_name: 'Snellio Contact',
      }),
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      console.error('[contact] send-email function faalde:', res.status, errData)
      return NextResponse.json({ error: 'Bericht kon niet verstuurd worden, probeer het opnieuw.' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] onverwachte fout:', err)
    return NextResponse.json({ error: 'Onverwachte serverfout' }, { status: 500 })
  }
}
