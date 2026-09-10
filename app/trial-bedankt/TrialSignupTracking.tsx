'use client'

import { useEffect, useState } from 'react'
import TrialSignupConversion from '@/components/tracking/TrialSignupConversion'

// Dunne gate rond TrialSignupConversion voor /trial-bedankt.
//
// - Vuurt ALLEEN als er een signup-token in de URL staat. Dat token komt
//   uitsluitend van TrialSignupForm, ná een geslaagde /api/aanmelden
//   (user + tenant aangemaakt). Een los bezoek aan /trial-bedankt zonder
//   token vuurt dus niets.
// - Leest user_id en e-mail (Enhanced Conversions) uit sessionStorage, waar
//   het formulier ze heeft neergezet. Wordt pas gerenderd als dat gelezen is,
//   zodat de conversie één keer met complete props vuurt.
// - Dedupe (sessionStorage per token + per sessie) zit in
//   TrialSignupConversion zelf; die component is ongewijzigd.

const SESSION_KEY = 'snellio:trial_signup'

interface Props {
  signupId?: string
}

interface Opgeslagen {
  signup_id?: string
  user_id?:   string
  email?:     string
}

export default function TrialSignupTracking({ signupId }: Props) {
  const [ready, setReady] = useState(false)
  const [info, setInfo]   = useState<Opgeslagen | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      const parsed: Opgeslagen | null = raw ? JSON.parse(raw) : null
      // Alleen gebruiken als het bij dít token hoort.
      setInfo(parsed && parsed.signup_id === signupId ? parsed : null)
    } catch {
      setInfo(null)
    }
    setReady(true)
  }, [signupId])

  if (!signupId || !ready) return null

  return (
    <TrialSignupConversion
      dedupeKey={signupId}
      userId={info?.user_id}
      email={info?.email}
    />
  )
}
