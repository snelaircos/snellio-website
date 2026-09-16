// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Tests voor POST /api/aanmelden met een nagebootste Supabase-client:
//  J. pending_signups zonder package_id (null) en een falende insert breekt de
//     registratie niet;
//  H/I. consent en click-id's server-side: click-id's alleen bij 'granted',
//     'unknown' blijft onderscheidbaar van 'denied', boolean van een oude client
//     wordt vertaald, altijd een object (nooit null).

type Row = Record<string, unknown>
const state = { inserts: [] as Array<{ table: string; row: Row }>, createUserArgs: [] as Row[], pendingError: null as null | { message: string } }

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: { admin: {
      listUsers:  async () => ({ data: { users: [] } }),
      createUser: async (args: Row) => { state.createUserArgs.push(args); return { data: { user: { id: 'a1b2c3d4-0000-4000-8000-0000007f3d97' } }, error: null } },
      deleteUser: async () => ({}),
    } },
    from: (table: string) => ({
      insert: (row: Row) => {
        state.inserts.push({ table, row })
        const res = { error: table === 'pending_signups' ? state.pendingError : null }
        return { then: (fn: (r: typeof res) => unknown) => Promise.resolve(fn(res)) }
      },
    }),
  }),
}))

import { NextRequest } from 'next/server'
import { POST } from '../route'
import { verwerkAttributie } from '@/lib/tracking/server-attribution'

let ipTeller = 10
function post(body: Row) {
  return POST(new NextRequest('http://localhost/api/aanmelden', {
    method: 'POST', body: JSON.stringify(body),
    headers: { 'content-type': 'application/json', 'x-forwarded-for': `203.0.113.${ipTeller++}` },
  }))
}
const basis = { company_name: 'Test BV', email: `t${Date.now()}@example.nl`, land: 'NL', password: 'wachtwoord123', voorwaarden_akkoord: true, voorwaarden_versie: '2.0' }

beforeEach(() => {
  state.inserts = []; state.createUserArgs = []; state.pendingError = null
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://supabase.local'
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-key'
  vi.spyOn(console, 'info').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('POST /api/aanmelden', () => {
  it('J. schrijft pending_signups met package_id null en geeft ok + user_id terug', async () => {
    const res = await post({ ...basis, email: 'j1@example.nl' })
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toMatchObject({ ok: true, user_id: 'a1b2c3d4-0000-4000-8000-0000007f3d97' })
    const pending = state.inserts.find(i => i.table === 'pending_signups')
    expect(pending?.row).toMatchObject({ package_id: null, status: 'completed', password: '' })
    expect(state.inserts.map(i => i.table)).toEqual(['bedrijfsgegevens', 'monteurs', 'pending_signups'])
    expect(state.inserts[0].row).toMatchObject({ abonnement_status: 'trial' })
    expect('pakket' in state.inserts[0].row).toBe(false)
  })

  it('J2. een falende pending_signups-insert (bv. NOT NULL) breekt de registratie niet', async () => {
    state.pendingError = { message: 'null value in column "package_id" of relation "pending_signups" violates not-null constraint' }
    const res = await post({ ...basis, email: 'j2@example.nl' })
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
  })

  it('H. consent denied: click-id\'s worden niet opgeslagen, utm en context wel, signup slaagt', async () => {
    const res = await post({ ...basis, email: 'h@example.nl', attributie: { consent_ads: 'denied', consent_analytics: 'denied', gclid: 'G1', gbraid: 'B1', utm_source: 'google', utm_campaign: 'x', first_landing_page: '/', first_referrer: 'www.google.com', captured_at: '2026-09-16T10:00:00.000Z' } })
    expect(res.status).toBe(200)
    const meta = (state.createUserArgs[0].user_metadata as Row).attributie as Row
    expect(meta).toMatchObject({ consent_ads: 'denied', consent_analytics: 'denied', utm_source: 'google', utm_campaign: 'x', first_landing_page: '/', first_referrer: 'www.google.com' })
    expect('gclid' in meta).toBe(false); expect('gbraid' in meta).toBe(false)
  })

  it('H2. consent granted: click-id\'s worden wél opgeslagen', async () => {
    await post({ ...basis, email: 'h2@example.nl', attributie: { consent_ads: 'granted', gclid: 'G1', first_landing_page: '/' } })
    const meta = (state.createUserArgs[0].user_metadata as Row).attributie as Row
    expect(meta).toMatchObject({ consent_ads: 'granted', consent_analytics: 'granted', gclid: 'G1' })
  })

  it('I. zonder keuze blijft consent "unknown" en is de attributie nooit null', async () => {
    await post({ ...basis, email: 'i1@example.nl', attributie: { consent_ads: 'unknown', first_landing_page: '/blog', captured_at: '2026-09-16T10:00:00.000Z' } })
    const meta = (state.createUserArgs[0].user_metadata as Row).attributie as Row
    expect(meta.consent_ads).toBe('unknown'); expect(meta.consent_ads).not.toBe('denied')
    expect(meta.first_landing_page).toBe('/blog')

    await post({ ...basis, email: 'i2@example.nl' })   // helemaal geen attributie meegestuurd (oude client)
    const meta2 = (state.createUserArgs[1].user_metadata as Row).attributie as Row
    expect(meta2).toEqual({ consent_ads: 'unknown', consent_analytics: 'unknown' })
  })

  it('oude client met boolean consent_ads wordt vertaald (true → granted, false → denied)', () => {
    expect(verwerkAttributie({ consent_ads: true, gclid: 'G1' })).toMatchObject({ consent_ads: 'granted', gclid: 'G1' })
    const d = verwerkAttributie({ consent_ads: false, gclid: 'G1', utm_source: 'google' })
    expect(d).toMatchObject({ consent_ads: 'denied', utm_source: 'google' }); expect('gclid' in d).toBe(false)
  })

  it('whitelist en begrenzing: onbekende velden en te lange waarden komen niet in de metadata', () => {
    const out = verwerkAttributie({ consent_ads: 'granted', email: 'x@y.nl', gclid: 'G'.repeat(500), first_landing_page: '/' })
    expect('email' in out).toBe(false)
    expect((out.gclid as string).length).toBe(200)
  })
})
