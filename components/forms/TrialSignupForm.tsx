'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SITE } from '@/lib/constants'

// Formulier voor de gratis 14-daagse trial. POST naar /api/aanmelden (maakt
// user + tenant aan, geen Mollie). Pas na een 2xx navigeren we naar
// /trial-bedankt, waar de Ads-conversie trial_signup_completed vuurt.
// Geen pakketkeuze: die maakt de klant later in de app.

type Status = 'idle' | 'loading' | 'error' | 'email_exists'

export const TRIAL_SESSION_KEY = 'snellio:trial_signup'

export default function TrialSignupForm() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    companyName: '',
    fullName:    '',
    email:       '',
    password:    '',
    website:     '',   // honeypot, blijft leeg voor mensen
  })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})

  function validate() {
    const e: typeof errors = {}
    if (!form.companyName.trim())              e.companyName = 'Vul je bedrijfsnaam in'
    if (!form.fullName.trim())                 e.fullName    = 'Vul je naam in'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Vul een geldig e-mailadres in'
    if (form.password.length < 8)              e.password    = 'Minimaal 8 tekens'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length > 0) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/aanmelden', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: form.companyName,
          full_name:    form.fullName,
          email:        form.email,
          password:     form.password,
          website:      form.website,
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        if (data.code === 'email_exists' || response.status === 409) {
          setStatus('email_exists')
          setErrorMessage(data.error || 'Dit e-mailadres is al geregistreerd.')
          return
        }
        throw new Error(data.error || 'Er is iets misgegaan')
      }

      // Gegevens voor de bedanktpagina (Enhanced Conversions: e-mail wordt
      // door gtag zelf gehasht). Best-effort: zonder sessionStorage werkt
      // de bedanktpagina ook, alleen zonder e-mailmatch.
      try {
        sessionStorage.setItem(TRIAL_SESSION_KEY, JSON.stringify({
          signup_id: data.signup_id,
          user_id:   data.user_id,
          email:     data.email,
          ts:        Date.now(),
        }))
      } catch { /* negeer */ }

      router.push(`/trial-bedankt?signup=${encodeURIComponent(data.signup_id)}`)
    } catch (error) {
      console.error('Aanmelden error:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Er ging iets mis. Probeer het opnieuw of neem contact op.')
    }
  }

  const input = (hasError?: string) =>
    `w-full bg-white border ${hasError ? 'border-red-400' : 'border-[var(--border)]'} text-[var(--text)] placeholder:text-[var(--muted)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors`
  const label = 'block text-[var(--text2)] text-sm font-medium mb-1.5'
  const err   = 'text-red-500 text-xs mt-1'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="companyName" className={label}>Bedrijfsnaam *</label>
        <input
          id="companyName" type="text" autoComplete="organization" required
          placeholder="Uw Bedrijf B.V."
          className={input(errors.companyName)}
          value={form.companyName}
          onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
        />
        {errors.companyName && <p className={err}>{errors.companyName}</p>}
      </div>

      <div>
        <label htmlFor="fullName" className={label}>Je naam *</label>
        <input
          id="fullName" type="text" autoComplete="name" required
          placeholder="Jan de Vries"
          className={input(errors.fullName)}
          value={form.fullName}
          onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
        />
        {errors.fullName && <p className={err}>{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="email" className={label}>E-mailadres *</label>
        <input
          id="email" type="email" autoComplete="email" required
          placeholder="jan@uwbedrijf.nl"
          className={input(errors.email)}
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        {errors.email && <p className={err}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className={label}>Wachtwoord *</label>
        <input
          id="password" type="password" autoComplete="new-password" required minLength={8}
          placeholder="Minimaal 8 tekens"
          className={input(errors.password)}
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        {errors.password && <p className={err}>{errors.password}</p>}
      </div>

      {/* Honeypot: visueel verborgen, niet focusbaar */}
      <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website" type="text" tabIndex={-1} autoComplete="off"
          value={form.website}
          onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gradient-btn text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(0,144,184,.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,184,.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === 'loading' ? 'Account aanmaken…' : 'Start 14 dagen gratis →'}
      </button>

      <p className="text-center text-xs text-[var(--muted2)] -mt-2">
        Geen betaling. Geen incasso. Geen pakketkeuze nodig.
      </p>

      {status === 'email_exists' && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-center text-sm">
          <p className="text-amber-800 mb-2">{errorMessage}</p>
          <a
            href={`${SITE.appUrl}/login`}
            className="inline-block underline text-[var(--accent)] font-medium"
          >
            Ga naar inloggen →
          </a>
        </div>
      )}

      {status === 'error' && (
        <p className="text-red-500 text-sm text-center" role="alert">
          {errorMessage || 'Er ging iets mis. Probeer het opnieuw of neem contact op.'}
        </p>
      )}
    </form>
  )
}
