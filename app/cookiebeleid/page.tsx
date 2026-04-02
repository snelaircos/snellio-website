import type { Metadata }  from 'next'
import { buildMetadata }  from '@/lib/metadata'
import Container          from '@/components/ui/Container'
import { SITE }           from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Cookiebeleid',
  description: 'Cookiebeleid van Snellio. Welke cookies wij gebruiken en hoe u uw voorkeuren kunt beheren.',
  path:        '/cookiebeleid',
})

const cookies = [
  { name: 'sb-auth-token',    type: 'Functioneel',  duration: 'Sessie',    purpose: 'Authenticatie en inlogsessie (Supabase)' },
  { name: '_ga, _ga_*',       type: 'Analytisch',   duration: '2 jaar',    purpose: 'Google Analytics — anonieme bezoekersstatistieken' },
  { name: '_gid',             type: 'Analytisch',   duration: '24 uur',    purpose: 'Google Analytics — sessieherkenning' },
  { name: '_gcl_au',          type: 'Marketing',    duration: '3 maanden', purpose: 'Google Ads — conversietracking' },
  { name: '_fbp',             type: 'Marketing',    duration: '3 maanden', purpose: 'Meta Pixel — advertentiemeting' },
  { name: '_clck, _clsk',     type: 'Analytisch',   duration: '1 jaar',    purpose: 'Microsoft Clarity — heatmaps en sessierecording' },
  { name: 'cookie_consent',   type: 'Functioneel',  duration: '1 jaar',    purpose: 'Uw cookievoorkeur opslaan' },
]

export default function CookiebeleidPage() {
  return (
    <div className="pt-32 pb-24 px-[5%]">
      <Container narrow>
        <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Juridisch</p>
        <h1 className="font-outfit font-black text-white text-4xl mb-2">Cookiebeleid</h1>
        <p className="text-[var(--muted2)] text-sm mb-12">Laatste update: januari 2025</p>

        <section className="mb-10">
          <h2 className="font-outfit font-bold text-white text-xl mb-4">Wat zijn cookies?</h2>
          <p className="text-[var(--text2)] text-sm leading-relaxed">
            Cookies zijn kleine tekstbestanden die door uw browser worden opgeslagen wanneer u onze website bezoekt.
            Wij gebruiken cookies om de website goed te laten werken, het gebruik te analyseren en onze marketing te verbeteren.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-outfit font-bold text-white text-xl mb-6">Overzicht van cookies</h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--navy3)] border-b border-[var(--border)]">
                  {['Cookie', 'Type', 'Duur', 'Doel'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[var(--muted2)] font-mono text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cookies.map((c, i) => (
                  <tr key={c.name} className={`border-b border-[var(--border)] ${i % 2 === 0 ? 'bg-[var(--navy2)]' : 'bg-[var(--navy3)]'}`}>
                    <td className="px-4 py-3 font-mono text-[var(--cyan)] text-xs">{c.name}</td>
                    <td className="px-4 py-3 text-[var(--text2)]">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                        ${c.type === 'Functioneel' ? 'bg-blue-900/40 text-blue-300' :
                          c.type === 'Analytisch'  ? 'bg-yellow-900/40 text-yellow-300' :
                          'bg-red-900/40 text-red-300'}`}>
                        {c.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted2)] text-xs">{c.duration}</td>
                    <td className="px-4 py-3 text-[var(--text2)] text-xs">{c.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-outfit font-bold text-white text-xl mb-4">Uw voorkeuren beheren</h2>
          <p className="text-[var(--text2)] text-sm leading-relaxed mb-4">
            Functionele cookies zijn noodzakelijk voor het functioneren van de website. Analytische en marketingcookies plaatsen wij alleen met uw toestemming.
          </p>
          <p className="text-[var(--text2)] text-sm leading-relaxed">
            U kunt uw browserinstellingen aanpassen om cookies te weigeren of te verwijderen.
            Raadpleeg de helpfunctie van uw browser voor instructies.
          </p>
        </section>

        <section>
          <h2 className="font-outfit font-bold text-white text-xl mb-4">Contact</h2>
          <p className="text-[var(--text2)] text-sm">
            Vragen? Mail naar{' '}
            <a href={`mailto:${SITE.email}`} className="text-[var(--cyan)] hover:underline">{SITE.email}</a>
          </p>
        </section>
      </Container>
    </div>
  )
}
