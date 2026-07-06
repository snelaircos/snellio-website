import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

// Doorverwijspagina naar de app. Het inloggen zelf gebeurt op
// app.snellio.nl — deze pagina bevat bewust GEEN e-mail/wachtwoord-velden
// (een schijn-formulier waarvan het wachtwoordveld niets doet, wekt
// verwarring en wantrouwen). Noindex: geen zoekwaarde.

export const metadata: Metadata = {
  title: 'Inloggen | Snellio',
  description: 'Log in op je Snellio-account via app.snellio.nl.',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: { new_account?: string; email?: string }
}

export default function LoginPage({ searchParams }: Props) {
  const newAccount = searchParams.new_account === '1'
  const email = searchParams.email || ''
  const loginUrl = email ? `${SITE.appUrl}?email=${encodeURIComponent(email)}` : SITE.appUrl

  return (
    <div className='min-h-screen flex items-center justify-center px-[5%]'>
      <div className='text-center max-w-md'>
        <div className='text-6xl mb-6'>🔐</div>
        <h1 className='font-outfit font-black text-white text-2xl mb-4'>Inloggen</h1>

        {newAccount && (
          <div className='mb-6 rounded-xl border border-green-400 bg-green-950 p-4 text-left'>
            <p className='text-green-300 font-bold'>Je account is succesvol aangemaakt.</p>
            <p className='text-green-200 text-sm mt-2'>
              Log in met {email ? <strong>{email}</strong> : 'je e-mailadres'} en het wachtwoord dat je tijdens de registratie hebt ingesteld.
            </p>
          </div>
        )}

        <p className='text-[var(--text2)] mb-8'>
          Je logt in op de Snellio-app via app.snellio.nl.
        </p>

        <a
          href={loginUrl}
          className='inline-block bg-[var(--cyan)] text-black font-semibold py-3 px-6 rounded-xl hover:brightness-110 transition-all duration-200'
        >
          Naar app.snellio.nl →
        </a>

        <p className='text-[var(--muted)] text-sm mt-6'>
          Nog geen account? <a href='/checkout' className='text-[var(--cyan)] hover:underline'>Probeer 14 dagen gratis</a>
        </p>
      </div>
    </div>
  )
}
