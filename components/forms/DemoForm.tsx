'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Status = 'idle' | 'loading' | 'error'

interface DemoFormProps {
  compact?: boolean  // kleinere versie voor sidebar
}

export default function DemoForm({ compact = false }: DemoFormProps) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    naam:        '',
    bedrijfsnaam:'',
    email:       '',
    telefoon:    '',
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.naam.trim())         e.naam        = 'Vul je naam in'
    if (!form.bedrijfsnaam.trim()) e.bedrijfsnaam = 'Vul je bedrijfsnaam in'
    if (!form.email.includes('@'))  e.email       = 'Vul een geldig e-mailadres in'
    if (form.telefoon && form.telefoon.replace(/\D/g, '').length < 9)
                                   e.telefoon    = 'Vul een geldig telefoonnummer in'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) { setErrors(v); return }
    setErrors({})
    setStatus('loading')
    try {
      // ── Vervang dit door jouw endpoint (Resend, Formspree, API route) ──
      // await fetch('/api/demo', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),
      // })
      await new Promise(r => setTimeout(r, 800))
      router.push('/demo-bedankt')
    } catch {
      setStatus('error')
    }
  }

  const inp = `w-full bg-[var(--navy2)] border text-[var(--text)] placeholder:text-[var(--muted)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--cyan)] transition-colors`
  const lbl = `block text-[var(--text2)] text-sm font-medium mb-1.5`

  return (
    <form onSubmit={handleSubmit} noValidate className={`flex flex-col gap-${compact ? '3' : '4'}`}>

      {/* Naam */}
      <div>
        <label htmlFor="demo-naam" className={lbl}>Naam *</label>
        <input
          id="demo-naam" type="text" required
          placeholder="Jan de Vries"
          className={`${inp} ${errors.naam ? 'border-red-500' : 'border-[var(--border)]'}`}
          value={form.naam}
          onChange={e => setForm(f => ({ ...f, naam: e.target.value }))}
        />
        {errors.naam && <p className="text-red-400 text-xs mt-1">{errors.naam}</p>}
      </div>

      {/* Bedrijfsnaam */}
      <div>
        <label htmlFor="demo-bedrijf" className={lbl}>Bedrijfsnaam *</label>
        <input
          id="demo-bedrijf" type="text" required
          placeholder="Mijn Airco BV"
          className={`${inp} ${errors.bedrijfsnaam ? 'border-red-500' : 'border-[var(--border)]'}`}
          value={form.bedrijfsnaam}
          onChange={e => setForm(f => ({ ...f, bedrijfsnaam: e.target.value }))}
        />
        {errors.bedrijfsnaam && <p className="text-red-400 text-xs mt-1">{errors.bedrijfsnaam}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="demo-email" className={lbl}>E-mailadres *</label>
        <input
          id="demo-email" type="email" required
          placeholder="jan@mijnbedrijf.nl"
          className={`${inp} ${errors.email ? 'border-red-500' : 'border-[var(--border)]'}`}
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Telefoon */}
      <div>
        <label htmlFor="demo-telefoon" className={lbl}>
          Telefoonnummer <span className="text-[var(--muted)] font-normal">(optioneel)</span>
        </label>
        <input
          id="demo-telefoon" type="tel"
          placeholder="06 12345678"
          className={`${inp} ${errors.telefoon ? 'border-red-500' : 'border-[var(--border)]'}`}
          value={form.telefoon}
          onChange={e => setForm(f => ({ ...f, telefoon: e.target.value }))}
        />
        {errors.telefoon && <p className="text-red-400 text-xs mt-1">{errors.telefoon}</p>}
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">
          Er ging iets mis. Probeer het opnieuw of mail naar{' '}
          <a href="mailto:info@snellio.nl" className="underline">info@snellio.nl</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,144,184,.45)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-1"
      >
        {status === 'loading' ? 'Bezig...' : 'Plan mijn demo →'}
      </button>

      <p className="text-[var(--muted)] text-xs text-center">
        Geen verplichtingen. We nemen binnen 1 werkdag contact op.
      </p>
    </form>
  )
}
