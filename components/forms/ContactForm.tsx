'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trackConversionAndWait } from '@/lib/gtag'

type Status = 'idle' | 'loading' | 'error'

export default function ContactForm() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ naam: '', email: '', bedrijf: '', bericht: '', demo: false })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (!res.ok) throw new Error('api_error')

      // Demo-vinkje: aparte demo_request_submitted conversie hier direct,
      // omdat de bedankpagina alleen contact_form_submitted fired. We
      // awaiten het Ads-beacon (of timeout) zodat de fire niet verloren gaat
      // in de unload-race bij de daaropvolgende router.push naar
      // /bedankt-contact. Dedupe niet nodig: deze fire gebeurt eenmalig
      // en /bedankt-contact behandelt alleen de andere conversie.
      if (form.demo) await trackConversionAndWait('demo_request_submitted')

      router.push('/bedankt-contact')
    } catch {
      setStatus('error')
    }
  }

  const input = 'w-full bg-[var(--navy3)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors'
  const label = 'block text-[var(--text2)] text-sm font-medium mb-1.5'

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
