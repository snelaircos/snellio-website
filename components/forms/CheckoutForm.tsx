'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface CheckoutFormProps {
  selectedPackage: string
}

export default function CheckoutForm({ selectedPackage }: CheckoutFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    companyName: '',
    fullName: '',
    email: '',
    password: '',
    package: selectedPackage
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: form.companyName,
          full_name: form.fullName,
          email: form.email,
          password: form.password,
          package_id: form.package
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan')
      }

      // Redirect to Mollie checkout
      window.location.href = data.checkout_url
    } catch (error) {
      console.error('Checkout error:', error)
      setStatus('error')
    }
  }

  const input = 'w-full bg-[var(--navy3)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--cyan)] transition-colors'
  const label = 'block text-[var(--text2)] text-sm font-medium mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="companyName" className={label}>Bedrijfsnaam *</label>
        <input
          id="companyName"
          type="text"
          required
          placeholder="Uw Bedrijf B.V."
          className={input}
          value={form.companyName}
          onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="fullName" className={label}>Volledige naam *</label>
        <input
          id="fullName"
          type="text"
          required
          placeholder="Jan de Vries"
          className={input}
          value={form.fullName}
          onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="email" className={label}>E-mailadres *</label>
        <input
          id="email"
          type="email"
          required
          placeholder="jan@uwbedrijf.nl"
          className={input}
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="password" className={label}>Wachtwoord *</label>
        <input
          id="password"
          type="password"
          required
          placeholder="Minimaal 8 karakters"
          className={input}
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
      </div>

      {/* Hidden package field */}
      <input type="hidden" name="package" value={form.package} />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gradient-btn text-white font-semibold py-4 rounded-xl shadow-[0_4px_20px_rgba(0,144,184,.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,184,.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === 'loading' ? 'Account aanmaken...' : 'Start gratis proefperiode →'}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">
          Er ging iets mis. Probeer het opnieuw of neem contact op.
        </p>
      )}
    </form>
  )
}