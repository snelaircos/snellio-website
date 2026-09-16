import { describe, it, expect, beforeEach, vi } from 'vitest'

// Tests voor lib/tracking/attribution.ts: verkeerscontext (first-touch) versus
// marketingattributie, consent als granted/denied/unknown, en het gedrag bij
// interne navigatie en bij een door url_passthrough gedecoreerde URL.

function setUrl(pathWithQuery: string) { window.history.replaceState({}, '', pathWithQuery) }
function setReferrer(url: string) { Object.defineProperty(document, 'referrer', { value: url, configurable: true }) }
function clearCookies() { for (const c of document.cookie.split(';')) { const n = c.split('=')[0].trim(); if (n) document.cookie = `${n}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/` } }

async function tracking() { vi.resetModules(); return await import('@/lib/tracking') }

const LANDING = '/software-voor-installatiebedrijven?gclid=G1&gbraid=B1&utm_source=google&utm_medium=cpc&utm_campaign=installatiebedrijven'

beforeEach(() => { localStorage.clear(); sessionStorage.clear(); clearCookies(); setReferrer(''); setUrl('/') })

describe('marketingattributie', () => {
  it('E. gclid + gbraid + utm met consent granted → alles bewaard, ook in de cookie, en volledig naar de server', async () => {
    document.cookie = 'snellio_consent=granted'
    setReferrer('https://www.google.com/'); setUrl(LANDING)
    const t = await tracking(); t.initTracking()
    const a = t.getAttribution()
    expect(a).toMatchObject({ gclid: 'G1', gbraid: 'B1', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'installatiebedrijven', landing_page: '/software-voor-installatiebedrijven', referrer: 'www.google.com' })
    expect(a?.captured_at).toBeTruthy()
    expect(document.cookie).toContain('snellio_attr=')
    const s = t.attributionForServer()
    expect(s).toMatchObject({ consent_ads: 'granted', consent_analytics: 'granted', gclid: 'G1', gbraid: 'B1', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'installatiebedrijven', landing_page: '/software-voor-installatiebedrijven', first_landing_page: '/software-voor-installatiebedrijven', first_referrer: 'www.google.com' })
    expect(s.attribution_captured_at).toBeTruthy()
    expect(s.captured_at).toBeTruthy()
  })

  it('H. consent denied → geen click-id naar de server en geen attributiecookie; utm en context wel; consent_ads "denied"', async () => {
    document.cookie = 'snellio_consent=denied'
    setReferrer('https://www.google.com/'); setUrl(LANDING)
    const t = await tracking(); t.initTracking()
    expect(t.getAttribution()?.gclid).toBe('G1')          // sessionStorage: nodig voor gtag zelf, blijft lokaal
    expect(document.cookie).not.toContain('snellio_attr=')
    const s = t.attributionForServer()
    expect(s.consent_ads).toBe('denied')
    expect('gclid' in s).toBe(false); expect('gbraid' in s).toBe(false); expect('wbraid' in s).toBe(false)
    expect(s).toMatchObject({ utm_source: 'google', utm_campaign: 'installatiebedrijven', first_landing_page: '/software-voor-installatiebedrijven', first_referrer: 'www.google.com' })
  })

  it('I. geen keuze gemaakt → consent "unknown", te onderscheiden van "denied"; click-id niet naar de server', async () => {
    setUrl('/?gclid=G1'); const t = await tracking(); t.initTracking()
    const s = t.attributionForServer()
    expect(s.consent_ads).toBe('unknown'); expect(s.consent_ads).not.toBe('denied')
    expect('gclid' in s).toBe(false)
    expect(t.consentStatus()).toBe('unknown')
  })
})

describe('verkeerscontext (first-touch)', () => {
  it('F. direct bezoek zonder parameters → context met landing en lege referrer, geen attributie, payload is géén null', async () => {
    setReferrer(''); setUrl('/')
    const t = await tracking(); t.initTracking()
    expect(t.getAttribution()).toBeNull()
    const s = t.attributionForServer()
    expect(s).toMatchObject({ consent_ads: 'unknown', consent_analytics: 'unknown', first_landing_page: '/' })
    expect('first_referrer' in s).toBe(false)
    expect(s.captured_at).toBeTruthy()
    for (const k of ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'landing_page']) expect(k in s).toBe(false)
  })

  it('F2. organisch bezoek zonder parameters → first_referrer is de externe host', async () => {
    setReferrer('https://www.google.com/'); setUrl('/f-gassen-registratie')
    const t = await tracking(); t.initTracking()
    expect(t.attributionForServer()).toMatchObject({ first_landing_page: '/f-gassen-registratie', first_referrer: 'www.google.com' })
    expect(t.getAttribution()).toBeNull()
  })

  it('G. interne navigatie overschrijft first-touch niet, ook niet met een gedecoreerde URL met dezelfde gclid', async () => {
    document.cookie = 'snellio_consent=granted'
    setReferrer('https://www.google.com/'); setUrl(LANDING)
    const t = await tracking(); t.initTracking()
    const ctx1 = t.getContext(); const attr1 = t.getAttribution()

    // 1. gewone interne routewissel (next/link): geen parameters, eigen referrer
    setReferrer('http://localhost:3000/software-voor-installatiebedrijven'); setUrl('/checkout?pakket=pro')
    t.initTracking()
    expect(t.getContext()).toEqual(ctx1)
    expect(t.getAttribution()).toEqual(attr1)

    // 2. volledige paginaovergang waarbij url_passthrough dezelfde gclid meegeeft, zonder utm
    setUrl('/registreren?gclid=G1'); t.initTracking()
    expect(t.getContext()).toEqual(ctx1)
    expect(t.getAttribution()).toEqual(attr1)          // utm's en echte landingspagina blijven staan
    expect(t.attributionForServer().landing_page).toBe('/software-voor-installatiebedrijven')

    // 3. een échte nieuwe campagneklik wint wel, maar de first-touch context niet
    setReferrer('https://www.bing.com/'); setUrl('/pricing?gclid=G2&utm_source=bing&utm_medium=cpc'); t.initTracking()
    expect(t.getAttribution()).toMatchObject({ gclid: 'G2', utm_source: 'bing', landing_page: '/pricing' })
    expect(t.getContext()).toEqual(ctx1)
    expect(t.attributionForServer()).toMatchObject({ first_landing_page: '/software-voor-installatiebedrijven', first_referrer: 'www.google.com', landing_page: '/pricing', gclid: 'G2' })
  })

  it('consent later granted → sessie-attributie naar de cookie gepromoveerd, context ongewijzigd', async () => {
    setReferrer('https://www.google.com/'); setUrl(LANDING)
    const t = await tracking(); t.initTracking()
    expect(document.cookie).not.toContain('snellio_attr=')
    t.applyConsent('granted')
    expect(document.cookie).toContain('snellio_attr=')
    expect(t.attributionForServer()).toMatchObject({ consent_ads: 'granted', gclid: 'G1', first_landing_page: '/software-voor-installatiebedrijven' })
  })
})
