import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Tests voor trackGoogleAdsConversion / trackTrialSignupCompleted (lib/tracking/index.ts).
// gtag wordt nagebootst: 'immediate' roept event_callback asynchroon aan (zoals
// gtag.js), 'late' pas na `lateMs`, 'never' nooit. `loaded` zet
// window.google_tag_manager, het spoor dat gtag.js daadwerkelijk laadde.

type W = Window & { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[]; google_tag_manager?: unknown }
type Params = { event_callback?: () => void; send_to?: string; transaction_id?: string; value?: unknown; currency?: unknown }

function installGtag(opts: { loaded: boolean; callback: 'immediate' | 'late' | 'never'; lateMs?: number }) {
  const w = window as W
  const calls: unknown[][] = []
  w.dataLayer = []
  w.gtag = (...args: unknown[]) => {
    calls.push(args)
    const params = args[2] as Params | undefined
    if (args[0] === 'event' && args[1] === 'conversion' && params?.event_callback) {
      if (opts.callback === 'immediate') setTimeout(params.event_callback, 0)
      if (opts.callback === 'late')      setTimeout(params.event_callback, opts.lateMs ?? 5000)
    }
  }
  if (opts.loaded) w.google_tag_manager = { 'GT-TEST': {} }
  else delete w.google_tag_manager
  return {
    calls,
    conversions: () => calls.filter(c => c[0] === 'event' && c[1] === 'conversion'),
    funnel:      () => calls.filter(c => c[0] === 'event' && c[1] === 'trial_signup_completed'),
  }
}

async function tracking() {
  vi.resetModules()
  return await import('@/lib/tracking')
}

const KEY = 'snellio:conv:trial_signup_completed:signup_u1'
const input = { event: 'trial_signup_completed' as const, transactionId: 'signup_u1' }

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear()
  vi.useFakeTimers()
  vi.spyOn(console, 'info').mockImplementation(() => {})
})
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks() })

describe('trackGoogleAdsConversion — dedupe pas na event_callback', () => {
  it('A. callback → sent, marker gezet, juiste destination en transaction_id, geen value/currency', async () => {
    const g = installGtag({ loaded: true, callback: 'immediate' })
    const t = await tracking()
    const p = t.trackGoogleAdsConversion(input)
    await vi.advanceTimersByTimeAsync(10)
    expect(await p).toBe('sent')
    expect(localStorage.getItem(KEY)).not.toBeNull()
    expect(g.conversions()).toHaveLength(1)
    const params = g.conversions()[0][2] as Params
    expect(params.send_to).toBe('AW-18058139346/SuNcCLS1xK4cENKt5aJD')
    expect(params.transaction_id).toBe('signup_u1')
    expect('value' in params).toBe(false)
    expect('currency' in params).toBe(false)
  })

  it('B. timeout (gtag geladen, geen callback) → timeout, GEEN marker', async () => {
    installGtag({ loaded: true, callback: 'never' })
    const t = await tracking()
    const p = t.trackGoogleAdsConversion(input)
    await vi.advanceTimersByTimeAsync(2100)
    expect(await p).toBe('timeout')
    expect(localStorage.getItem(KEY)).toBeNull()
  })

  it('C. gtag.js niet geladen → blocked, GEEN marker, event staat wel in de wachtrij', async () => {
    const g = installGtag({ loaded: false, callback: 'never' })
    const t = await tracking()
    const p = t.trackGoogleAdsConversion(input)
    await vi.advanceTimersByTimeAsync(2100)
    expect(await p).toBe('blocked')
    expect(localStorage.getItem(KEY)).toBeNull()
    expect(g.conversions()).toHaveLength(1)
  })

  it('D. tweede aanroep na een geslaagde send → duplicate, geen tweede event', async () => {
    const g = installGtag({ loaded: true, callback: 'immediate' })
    const t = await tracking()
    const p1 = t.trackGoogleAdsConversion(input); await vi.advanceTimersByTimeAsync(10)
    expect(await p1).toBe('sent')
    expect(await t.trackGoogleAdsConversion(input)).toBe('duplicate')
    expect(g.conversions()).toHaveLength(1)
  })

  it('D2. marker uit een eerdere sessie (localStorage) → duplicate zonder gtag-aanroep', async () => {
    localStorage.setItem(KEY, String(Date.now()))
    const g = installGtag({ loaded: true, callback: 'immediate' })
    const t = await tracking()
    expect(await t.trackGoogleAdsConversion(input)).toBe('duplicate')
    expect(g.conversions()).toHaveLength(0)
  })

  it('retry na timeout mag opnieuw versturen; na 3 pogingen stopt het (duplicate)', async () => {
    const g = installGtag({ loaded: true, callback: 'never' })
    const t = await tracking()
    for (let i = 0; i < 3; i++) {
      const p = t.trackGoogleAdsConversion(input); await vi.advanceTimersByTimeAsync(2100)
      expect(await p).toBe('timeout')
    }
    expect(g.conversions()).toHaveLength(3)
    expect(await t.trackGoogleAdsConversion(input)).toBe('duplicate')
    expect(g.conversions()).toHaveLength(3)
    expect(localStorage.getItem(KEY)).toBeNull()
  })

  it('late callback ná de timeout markeert alsnog; een retry is dan duplicate', async () => {
    const g = installGtag({ loaded: true, callback: 'late', lateMs: 3000 })
    const t = await tracking()
    const p = t.trackGoogleAdsConversion(input)
    await vi.advanceTimersByTimeAsync(2100)
    expect(await p).toBe('timeout')
    expect(localStorage.getItem(KEY)).toBeNull()
    await vi.advanceTimersByTimeAsync(1000)
    expect(localStorage.getItem(KEY)).not.toBeNull()
    expect(await t.trackGoogleAdsConversion(input)).toBe('duplicate')
    expect(g.conversions()).toHaveLength(1)
  })

  it('in-flight: tweede aanroep terwijl de eerste nog wacht → duplicate', async () => {
    const g = installGtag({ loaded: true, callback: 'late', lateMs: 500 })
    const t = await tracking()
    const p1 = t.trackGoogleAdsConversion(input)
    const p2 = t.trackGoogleAdsConversion(input)
    await vi.advanceTimersByTimeAsync(600)
    expect(await p2).toBe('duplicate')
    expect(await p1).toBe('sent')
    expect(g.conversions()).toHaveLength(1)
  })

  it('GA4-funnelevent gaat één keer per sessie, ook bij een retry van de Ads-hit', async () => {
    const g = installGtag({ loaded: true, callback: 'never' })
    const t = await tracking()
    let p = t.trackGoogleAdsConversion(input); await vi.advanceTimersByTimeAsync(2100); await p
    p = t.trackGoogleAdsConversion(input); await vi.advanceTimersByTimeAsync(2100); await p
    expect(g.conversions()).toHaveLength(2)
    expect(g.funnel()).toHaveLength(1)
  })

  it('geen label geconfigureerd → no_label, niets verzonden', async () => {
    const g = installGtag({ loaded: true, callback: 'immediate' })
    const t = await tracking()
    expect(await t.trackGoogleAdsConversion({ event: 'purchase_completed', transactionId: 'tr_1', value: 10 })).toBe('no_label')
    expect(g.conversions()).toHaveLength(0)
  })
})

describe('trackTrialSignupCompleted — resultaat en rapportage zonder persoonsgegevens', () => {
  it('rapporteert resultaat, consent en attributie-aanwezigheid via sendBeacon; nooit e-mail of user-id', async () => {
    installGtag({ loaded: true, callback: 'immediate' })
    const beacon = vi.fn(() => true)
    Object.defineProperty(navigator, 'sendBeacon', { value: beacon, configurable: true })
    document.cookie = 'snellio_consent=denied'
    const t = await tracking()
    const p = t.trackTrialSignupCompleted({ userId: '7f3d97be-cff6-4f83-842b-af7cc972abbf', email: 'test@example.nl' })
    await vi.advanceTimersByTimeAsync(10)
    expect(await p).toBe('sent')
    expect(beacon).toHaveBeenCalledTimes(1)
    const [path, blob] = beacon.mock.calls[0] as unknown as [string, Blob]
    expect(path).toBe('/api/tracking/conversie-resultaat')
    // jsdom's Blob kent geen .text(); FileReader wel, maar die heeft echte timers nodig.
    vi.useRealTimers()
    const text = await new Promise<string>(res => { const fr = new FileReader(); fr.onload = () => res(String(fr.result)); fr.readAsText(blob) })
    const body = JSON.parse(text)
    expect(body).toMatchObject({ event: 'trial_signup_completed', result: 'sent', consent: 'denied', attribution_present: false, click_id_present: false, gtag_loaded: true })
    expect(body.transaction_suffix).toBe('72abbf')
    const raw = JSON.stringify(body)
    expect(raw).not.toContain('example.nl')
    expect(raw).not.toContain('7f3d97be-cff6')
    const logged = (console.info as unknown as { mock: { calls: unknown[][] } }).mock.calls.map(c => c.join(' ')).join('\n')
    expect(logged).toContain('trial conversion result')
    expect(logged).not.toContain('example.nl')
  })
})
