'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import TrialSignupConversion from '@/components/tracking/TrialSignupConversion'

type Status = 'loading' | 'success' | 'error'

export default function CheckoutSuccessPage() {
  const [status, setStatus] = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [paymentId, setPaymentId] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)

  const searchParams = useSearchParams()
  const signupId = searchParams.get('signup_id')
  // payment_id kan in theorie ook direct in de URL meekomen (Mollie redirect),
  // anders pakken we hem uit de verify-response (uit pending_signups in DB).
  const paymentIdFromUrl = searchParams.get('payment_id')
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
        setUserId(data.user_id || '')
        setPaymentId(paymentIdFromUrl || data.payment_id || '')

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
          <h1 className="font-outfit font-black text-[var(--text)] text-2xl mb-4">Betaling wordt gecontroleerd...</h1>
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
          <h1 className="font-outfit font-black text-[var(--text)] text-2xl mb-4">Verificatie mislukt</h1>
          <p className="text-[var(--text2)] mb-6">{errorMessage}</p>
          <button onClick={() => window.location.reload()} className="inline-block bg-[var(--accent)] text-white font-semibold py-3 px-6 rounded-xl mr-3">Opnieuw proberen</button>
          <a href="/pricing" className="inline-block text-[var(--text)] underline">Terug naar prijzen</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-[5%]">
      {/* Google Ads conversie, alleen bij status 'success' (geverifieerde betaling).
         dedupeKey fungeert als sessionStorage-key tegen reload-fires; paymentId
         wordt meegestuurd als Ads transaction_id (Mollie tr_xxx); email enabled
         Enhanced Conversions zodat Google de conversie kan matchen aan de
         oorspronkelijke ad-click ondanks cookieless tracking. */}
      <TrialSignupConversion
        dedupeKey={signupId ?? undefined}
        paymentId={paymentId || undefined}
        userId={userId || undefined}
        email={email || undefined}
      />

      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="font-outfit font-black text-[var(--text)] text-2xl mb-4">Je account is aangemaakt</h1>
        <p className="text-[var(--text2)] mb-1">Je kunt nu inloggen met:</p>
        <p className="font-semibold text-[var(--text)] mb-6">{email || 'Onbekend e-mailadres'}</p>

        <button onClick={goToLogin} className="w-full bg-[var(--accent)] text-white font-semibold py-3 px-6 rounded-xl mb-3">Ga naar login</button>
        <button onClick={goToDashboard} disabled={buttonLoading} className="w-full border border-[var(--accent)] text-[var(--accent)] font-semibold py-3 px-6 rounded-xl hover:bg-[var(--accent)] hover:text-white transition">
          {buttonLoading ? 'Bezig...' : 'Ga naar dashboard'}
        </button>

        <p className="text-[var(--text2)] text-sm mt-4">Wachtwoord ingesteld tijdens registratie.</p>
      </div>
    </div>
  )
}