'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Status = 'loading' | 'success' | 'error'

export default function CheckoutSuccessPage() {
  const [status, setStatus] = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)

  const searchParams = useSearchParams()
  const signupId = searchParams.get('signup_id')
  const supabase = createClient()

  useEffect(() => {
    const init = async () => {
      try {
        await supabase.auth.signOut()
      } catch (signOutError) {
        console.warn('Supabase signOut error:', signOutError)
      }

      if (!signupId) {
        setStatus('error')
        setErrorMessage('Geen aanmeldings-ID gevonden')
        return
      }

      try {
        const response = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ signup_id: signupId })
        })

        const data = await response.json()

        if (!response.ok) {
          setStatus('error')
          setErrorMessage(data.error || 'Verificatie mislukt')
          return
        }

        setEmail(data.email || '')

        if (data.email && data.user_id) {
          try {
            await supabase.auth.signInWithOtp({
              email: data.email,
              options: { shouldCreateUser: false }
            })
          } catch (otpError) {
            console.info('OTP auto-login preparation failed:', otpError)
          }
        }

        setStatus('success')
      } catch (error) {
        setStatus('error')
        setErrorMessage(error instanceof Error ? error.message : 'Verificatie mislukt')
      }
    }

    init()
  }, [signupId, supabase])

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const goToLogin = () => {
    const redirectEmail = email ? `?new_account=1&email=${encodeURIComponent(email)}` : '?new_account=1'
    window.location.href = `${appUrl}/login${redirectEmail}`
  }

  const goToDashboard = () => {
    setButtonLoading(true)
    window.location.href = appUrl
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center px-[5%]">
        <div className="text-center">
          <div className="text-6xl mb-6">⏳</div>
          <h1 className="font-outfit font-black text-white text-2xl mb-4">Betaling wordt gecontroleerd...</h1>
          <p className="text-[var(--text2)]">Even geduld, we controleren je betaling en zetten alles klaar.</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-[5%]">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="font-outfit font-black text-white text-2xl mb-4">Verificatie mislukt</h1>
          <p className="text-[var(--text2)] mb-6">{errorMessage}</p>
          <button onClick={() => window.location.reload()} className="inline-block bg-[var(--cyan)] text-black font-semibold py-3 px-6 rounded-xl mr-3">Opnieuw proberen</button>
          <a href="/pricing" className="inline-block text-white underline">Terug naar prijzen</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-[5%]">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="font-outfit font-black text-white text-2xl mb-4">Je account is aangemaakt</h1>
        <p className="text-[var(--text2)] mb-1">Je kunt nu inloggen met:</p>
        <p className="font-semibold text-[var(--text)] mb-6">{email || 'Onbekend e-mailadres'}</p>

        <button onClick={goToLogin} className="w-full bg-[var(--cyan)] text-black font-semibold py-3 px-6 rounded-xl mb-3">Ga naar login</button>
        <button onClick={goToDashboard} disabled={buttonLoading} className="w-full border border-white text-white font-semibold py-3 px-6 rounded-xl hover:bg-white hover:text-black transition">
          {buttonLoading ? 'Bezig...' : 'Ga naar dashboard'}
        </button>

        <p className="text-[var(--text2)] text-sm mt-4">Wachtwoord ingesteld tijdens registratie.</p>
      </div>
    </div>
  )
}