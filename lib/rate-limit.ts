// ─── Eenvoudige rate limiter (in-memory, per proces) ────────────────────────
// Voor het publieke aanmeld-endpoint (vult pending_signups + maakt tenants).
// Eén Next-proces op pm2, dus in-memory volstaat; reset bij herstart is prima.

const emmers = new Map<string, number[]>()

export function rateLimit(sleutel: string, max: number, vensterMs: number): { ok: boolean; over?: number } {
  const nu = Date.now()
  const lijst = (emmers.get(sleutel) ?? []).filter(t => nu - t < vensterMs)
  if (lijst.length >= max) {
    emmers.set(sleutel, lijst)
    return { ok: false, over: Math.ceil((lijst[0] + vensterMs - nu) / 1000) }
  }
  lijst.push(nu); emmers.set(sleutel, lijst)
  if (emmers.size > 5000) for (const [k, v] of emmers) if (v.every(t => nu - t >= vensterMs)) emmers.delete(k)
  return { ok: true }
}

export function clientIp(headers: Headers): string {
  return (headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || headers.get('x-real-ip') || 'onbekend'
}

export function emailDomein(email: string | null | undefined): string {
  const e = (email ?? '').toLowerCase().trim()
  return e.includes('@') ? e.split('@')[1] : 'onbekend'
}
