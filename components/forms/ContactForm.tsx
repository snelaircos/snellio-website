'use client'

import { useState } from 'react'
import { trackConversion } from '@/lib/gtag'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ naam: '', email: '', bedrijf: '', bericht: '', demo: false })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      // Vervang dit door jouw eigen form endpoint (Resend, Formspree, etc.)
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
      await new Promise(r => setTimeout(r, 1200)) // Simulatie

      // Google Ads conversie — alleen bij succesvolle submit.
      // Als "demo" is aangevinkt tellen we ook de demo-conversie.
      trackConversion('contact_form_submitted')
      if (form.demo) trackConversion('demo_request_submitted')

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const input = 'w-full bg-[var(--navy3)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--cyan)] transition-colors'
  const label = 'block text-[var(--text2)] text-sm font-medium mb-1.5'

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-outfit font-bold text-white text-xl mb-2">Bericht ontvangen!</h3>
        <p className="text-[var(--muted2)]">We nemen binnen 1 werkdag contact met je op.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="naam" className={label}>Naam *</label>
          <input
            id="naam" type="text" required placeholder="Jan de Vries"
            className={input}
            value={form.naam}
            onChange={e => setForm(f => ({ ...f, naam: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>E-mailadres *</label>
          <input
            id="email" type="email" required placeholder="jan@mijnbedrijf.nl"
            className={input}
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label htmlFor="bedrijf" className={label}>Bedrijfsnaam</label>
        <input
          id="bedrijf" type="text" placeholder="Mijn Koeltechniek BV"
          className={input}
          value={form.bedrijf}
          onChange={e => setForm(f => ({ ...f, bedrijf: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="bericht" className={label}>Bericht *</label>
        <textarea
          id="bericht" required rows={5} placeholder="Vertel ons hoe we je kunnen helpen..."
          className={`${input} resize-none`}
          value={form.bericht}
          onChange={e => setForm(f => ({ ...f, bericht: e.target.value }))}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className="mt-0.5 accent-[var(--cyan)]"
          checked={form.demo}
          onChange={e => setForm(f => ({ ...f, demo: e.target.checked }))}
        />
        <span className="text-[var(--muted2)] text-sm group-hover:text-[var(--text2)] transition-colors">
          Ik ben geïnteresseerd in een persoonlijke demo
        </span>
      </label>

      {status === 'error' && (
        <p className="text-red-400 text-sm">Er is iets misgegaan. Probeer het opnieuw of mail naar info@snellio.nl.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gradient-btn text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_20px_rgba(0,144,184,.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,184,.5)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Verzenden...' : 'Verstuur bericht →'}
      </button>
    </form>
  )
}
