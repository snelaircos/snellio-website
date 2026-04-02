import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schemas'
import JsonLd    from '@/components/seo/JsonLd'
import Container from '@/components/ui/Container'
import { PLANS, SITE } from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Gratis starten — 30 dagen proberen',
  description: 'Maak gratis een Snellio account aan. 30 dagen uitproberen, geen creditcard nodig. Kies het pakket dat bij jouw bedrijf past.',
  path:        '/registreren',
})

interface Props {
  searchParams: { pakket?: string }
}

export default function RegistrerenPage({ searchParams }: Props) {
  const geselecteerd = searchParams.pakket || 'pro'
  const plan = PLANS.find(p => p.id === geselecteerd) || PLANS[2]

  return (
    <>
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home',            href: '/'           },
        { name: 'Gratis starten',  href: '/registreren'},
      ])} />

      <section className="min-h-screen pt-28 pb-20 px-[5%] flex items-center">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

            {/* Links: context */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[rgba(10,187,214,.1)] border border-[rgba(10,187,214,.3)] rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
                <span className="font-mono text-[.68rem] text-[var(--cyan)] tracking-[.08em] uppercase">
                  30 dagen gratis · geen creditcard
                </span>
              </div>

              <h1 className="font-outfit font-black text-white leading-tight tracking-tight mb-5"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Start vandaag.<br />
                <span className="text-[var(--cyan)]">Binnen 5 minuten.</span>
              </h1>

              <p className="text-[var(--text2)] text-[1.05rem] leading-relaxed mb-8">
                Gekozen pakket: <strong className="text-white">{plan.name}</strong> — {plan.tagline}
              </p>

              <ul className="flex flex-col gap-3 list-none mb-8">
                {[
                  '30 dagen gratis proberen',
                  'Geen creditcard nodig',
                  'Opzeggen wanneer je wilt',
                  'Nederlandstalige support',
                  'Alle data blijft van jou',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[var(--text2)] text-sm">
                    <span className="text-[var(--green)] font-bold text-base">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-[var(--muted2)] text-xs">
                Liever eerst een demo?{' '}
                <a href="/contact" className="text-[var(--cyan)] hover:underline">Plan een gesprek →</a>
              </p>
            </div>

            {/* Rechts: redirect naar app */}
            <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-8 text-center">
              <div className="text-5xl mb-5">❄️</div>
              <h2 className="font-outfit font-bold text-white text-xl mb-3">Account aanmaken</h2>
              <p className="text-[var(--muted2)] text-sm mb-8 leading-relaxed">
                Registreer via ons beveiligde platform. Uw gegevens worden opgeslagen bij Supabase (EU-servers).
              </p>
              <a
                href={`${SITE.appUrl}/registreren?pakket=${plan.id}`}
                className="block w-full bg-gradient-btn text-white font-semibold py-4 rounded-xl shadow-[0_4px_20px_rgba(0,144,184,.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,184,.5)] transition-all duration-200 text-center"
              >
                Start gratis met {plan.name} →
              </a>
              <p className="text-[var(--muted2)] text-xs mt-4">
                Door te registreren gaat u akkoord met onze{' '}
                <a href="/voorwaarden" className="hover:text-[var(--cyan)] transition-colors underline">voorwaarden</a>
                {' '}en{' '}
                <a href="/privacy" className="hover:text-[var(--cyan)] transition-colors underline">privacybeleid</a>.
              </p>

              {/* Plan switcher */}
              <div className="mt-8 pt-6 border-t border-[var(--border)]">
                <p className="text-[var(--muted2)] text-xs mb-3">Ander pakket kiezen:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {PLANS.map(p => (
                    <a
                      key={p.id}
                      href={`/registreren?pakket=${p.id}`}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        p.id === geselecteerd
                          ? 'border-[var(--cyan)] text-[var(--cyan)] bg-[rgba(10,187,214,.1)]'
                          : 'border-[var(--border)] text-[var(--muted2)] hover:border-[var(--cyan)] hover:text-[var(--text2)]'
                      }`}
                    >
                      {p.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
