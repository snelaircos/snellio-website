'use client'

import { SITE } from '@/lib/constants'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const newAccount = searchParams.get('new_account')
  const email = searchParams.get('email') || ''

  return (
    <div className='min-h-screen flex items-center justify-center px-[5%]'>
      <div className='text-center max-w-md'>
        <div className='text-6xl mb-6'>🔐</div>
        <h1 className='font-outfit font-black text-white text-2xl mb-4'>Inloggen</h1>

        {newAccount === '1' && (
          <div className='mb-6 rounded-xl border border-green-400 bg-green-950 p-4 text-left'>
            <p className='text-green-300 font-bold'>Je account is succesvol aangemaakt. Log hieronder in.</p>
            <p className='text-green-200 text-sm mt-2'>Wachtwoord ingesteld tijdens registratie.</p>
          </div>
        )}

        <div className='mb-4 text-left'>
          <label className='block text-sm font-medium'>E-mailadres</label>
          <input
            type='email'
            value={email}
            readOnly={newAccount === '1' && Boolean(email)}
            placeholder='Vul je e-mailadres in'
            className='w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 bg-zinc-900 text-white'
          />
        </div>

        <div className='mb-6 text-left'>
          <label className='block text-sm font-medium'>Wachtwoord</label>
          <input
            type='password'
            placeholder='Jouw wachtwoord'
            className='w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 bg-zinc-900 text-white'
          />
        </div>

        <a
          href={SITE.appUrl}
          className='inline-block bg-[var(--cyan)] text-black font-semibold py-3 px-6 rounded-xl hover:brightness-110 transition-all duration-200'
        >
          Ga naar app →
        </a>
      </div>
    </div>
  )
}
