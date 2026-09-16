// POST /api/tracking/conversie-resultaat — diagnose van de client-side
// Ads-conversie, alleen naar de serverlog (pm2). Geen database, geen
// persoonsgegevens: alleen event, een suffix van de transaction_id, het
// resultaat, de consentstatus en of er attributie/click-id aanwezig was.
// Zo is bij de eerstvolgende echte aanmelding in de log te zien óf en hoe de
// conversie is verzonden, wat de browser verder nooit aan de server vertelt.

import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, clientIp } from '@/lib/rate-limit'

const EVENTS  = new Set(['trial_signup_completed', 'lead_submitted', 'demo_requested', 'purchase_completed'])
const RESULTS = new Set(['sent', 'timeout', 'blocked', 'duplicate', 'unavailable', 'no_label', 'error'])
const CONSENT = new Set(['granted', 'denied', 'unknown'])
const SUFFIX_RE = /^[A-Za-z0-9_-]{1,12}$/

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers)
  if (!rateLimit(`conv-result:${ip}`, 30, 10 * 60_000).ok) return new NextResponse(null, { status: 429 })

  // sendBeacon stuurt een Blob; content-type kan ontbreken → tekst lezen.
  let body: Record<string, unknown> = {}
  try { body = JSON.parse(await req.text()) } catch { return new NextResponse(null, { status: 400 }) }

  const event   = typeof body.event === 'string' && EVENTS.has(body.event) ? body.event : null
  const result  = typeof body.result === 'string' && RESULTS.has(body.result) ? body.result : null
  const consent = typeof body.consent === 'string' && CONSENT.has(body.consent) ? body.consent : 'unknown'
  const suffix  = typeof body.transaction_suffix === 'string' && SUFFIX_RE.test(body.transaction_suffix) ? body.transaction_suffix : '?'
  if (!event || !result) return new NextResponse(null, { status: 400 })

  console.info('[tracking] trial conversion result', JSON.stringify({
    at:                  new Date().toISOString(),
    event,
    transaction_suffix:  suffix,
    result,
    consent,
    attribution_present: body.attribution_present === true,
    click_id_present:    body.click_id_present === true,
    gtag_loaded:         body.gtag_loaded === true,
  }))
  return new NextResponse(null, { status: 204 })
}
