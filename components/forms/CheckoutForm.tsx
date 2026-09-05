'use client'

// Aanmeldformulier (stap 12): bewust minimaal — bedrijfsnaam, e-mail, land,
// wachtwoord. Geen betaalgegevens, geen mandaat: 14 dagen gratis proberen,
// daarna kiest de klant zelf in de app hoe hij betaalt.

import { useState } from 'react'
import { VOORWAARDEN } from '@/lib/constants'

type Status = 'idle' | 'loading' | 'success' | 'error' | 'email_exists'

interface CheckoutFormProps {
  selectedPackage: string
}

export default function CheckoutForm({ selectedPackage }: CheckoutFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [loginUrl, setLoginUrl] = useState('')
  const [form, setForm] = useState({ companyName: '', email: '', land: 'NL', password: '', hp: '', akkoord: false, package: selectedPackage })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.akkoord) {
      setStatus('error')
      setErrorMessage('Vink aan dat je akkoord gaat met de algemene voorwaarden.')
      return
    }
    setStatus('loading')
    setErrorMessage('')
    try {
      const response = await fetch('/api/aanmelden', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_name: form.companyName, email: form.email, land: form.land, password: form.password, package_id: form.package, hp_veld: form.hp, voorwaarden_akkoord: form.akkoord, voorwaarden_versie: VOORWAARDEN.versie }),
      })
      const data = await response.json()
      if (!response.ok) {
        if (data.code === 'email_exists' || response.status === 409) {
          setStatus('email_exists')
          setErrorMessage(data.error || 'Dit e-mailadres is al geregistreerd.')
          return
        }
        throw new Error(data.error || 'Er is iets misgegaan')
      }
      setStatus('success')
      setLoginUrl(data.login_url)
      setTimeout(() => { window.location.href = data.login_url }, 2500)
    } catch (error) {
      console.error('Aanmelden error:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Er ging iets mis. Probeer het opnieuw of neem contact op.')
    }
  }

  const input = 'w-full bg-[var(--navy3)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors'
  const label = 'block text-[var(--text2)] text-sm font-medium mb-1.5'

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-center text-sm">
        <p className="text-emerald-200 font-semibold mb-1">✓ Je account is aangemaakt</p>
        <p className="text-[var(--text2)] mb-3">Je proefperiode van 14 dagen is gestart — zonder betaalgegevens. We sturen je door naar het inloggen…</p>
        <a href={loginUrl} className="inline-block underline text-[var(--accent)] font-medium">Direct inloggen →</a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="companyName" className={label}>Bedrijfsnaam *</label>
        <input id="companyName" type="text" required placeholder="Uw Bedrijf B.V." className={input}
          value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
      </div>
      <div>
        <label htmlFor="email" className={label}>E-mailadres *</label>
        <input id="email" type="email" required placeholder="jan@uwbedrijf.nl" className={input} autoComplete="email"
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      </div>
      <div>
        <label htmlFor="land" className={label}>Land *</label>
        <select id="land" className={input} value={form.land} onChange={e => setForm(f => ({ ...f, land: e.target.value }))}>
          <option value="NL">Nederland</option>
          <option value="BE">België</option>
          <option value="overig">Overig</option>
        </select>
      </div>
      <div>
        <label htmlFor="password" className={label}>Wachtwoord *</label>
        <input id="password" type="password" required placeholder="Minimaal 8 tekens" className={input} autoComplete="new-password"
          value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
      </div>
      {/* Honeypot — voor mensen onzichtbaar; nooit name="website" (autofill) */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input type="text" name="hp_veld" tabIndex={-1} autoComplete="off" value={form.hp} onChange={e => setForm(f => ({ ...f, hp: e.target.value }))} />
      </div>
      <input type="hidden" name="package" value={form.package} />

      {/* Acceptatie (art. 3.2 voorwaarden): expliciete checkbox, versie wordt
          meegestuurd en server-side gelogd. */}
      <label htmlFor="voorwaardenAkkoord" className="flex items-start gap-3 text-sm text-[var(--text2)] cursor-pointer select-none">
        <input id="voorwaardenAkkoord" type="checkbox" required checked={form.akkoord}
          onChange={e => setForm(f => ({ ...f, akkoord: e.target.checked }))}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]" />
        <span>
          Ik ga akkoord met de{' '}
          <a href="/voorwaarden" target="_blank" rel="noopener" className="text-[var(--accent)] underline hover:no-underline">algemene voorwaarden</a>{' '}
          (versie {VOORWAARDEN.versie}), inclusief de{' '}
          <a href="/voorwaarden/verwerkersovereenkomst" target="_blank" rel="noopener" className="text-[var(--accent)] underline hover:no-underline">verwerkersovereenkomst</a>,
          en heb het{' '}
          <a href="/privacy" target="_blank" rel="noopener" className="text-[var(--accent)] underline hover:no-underline">privacybeleid</a>{' '}
          gelezen. *
        </span>
      </label>

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-gradient-btn text-white font-semibold py-4 rounded-xl shadow-[0_4px_20px_rgba(0,144,184,.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,184,.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
        {status === 'loading' ? 'Account aanmaken...' : 'Start 14 dagen gratis — geen creditcard nodig →'}
      </button>

      {status === 'email_exists' && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-center text-sm">
          <p className="text-amber-200 mb-2">{errorMessage}</p>
          <a href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://app.snellio.nl'}/login`} className="inline-block underline text-[var(--accent)] font-medium">Ga naar inloggen →</a>
        </div>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">{errorMessage || 'Er ging iets mis. Probeer het opnieuw of neem contact op.'}</p>
      )}
    </form>
  )
}
