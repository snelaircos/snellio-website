import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schemas'
import JsonLd    from '@/components/seo/JsonLd'
import CheckoutForm from '@/components/forms/CheckoutForm'
import { BTW, PLANS, INBEGREPEN, TRIAL_DAGEN } from '@/lib/constants'
import { fmtEuro } from '@/lib/pricing'

export const metadata: Metadata = buildMetadata({
  title:       'Checkout, Start je gratis proefperiode',
  description: 'Maak je account aan en probeer Snellio 14 dagen gratis. Geen betaling, geen incassomachtiging, geen pakketkeuze nodig.',
  path:        '/checkout',
  // Transactiepagina: geen zoekwaarde, hoort niet in Google.
  noIndex:     true,
})

interface Props {
  searchParams: { pakket?: string }
}

export default function CheckoutPage({ searchParams }: Props) {
  // Geen pakketkeuze meer op de site: 'pro' is de trial-default (enige pakket
  // zonder monteur- of installatiecap in de app). Een ?pakket=-parameter uit
  // een oude link blijft werken.
  const geselecteerd = searchParams.pakket || 'pro'
  const plan  = PLANS.find(p => p.id === geselecteerd) ?? PLANS[2]
  const vanaf = Math.min(...PLANS.map(p => p.price.month))

  return (
    <>
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home',     href: '/'        },
        { name: 'Prijzen',  href: '/pricing' },
        { name: 'Checkout', href: '/checkout'},
      ])} />

      <section className="pt-32 pb-24 px-[5%]">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-start">
          {/* Links: plan overzicht */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[rgba(10,187,214,.1)] border border-[rgba(10,187,214,.3)] rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
              <span className="font-mono text-[.68rem] text-[var(--accent)] tracking-[.08em] uppercase">
                Probeer 14 dagen gratis
              </span>
            </div>

            <h1 className="font-outfit font-black text-[var(--text)] leading-tight tracking-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Start vandaag.<br />
              <span className="text-[var(--accent)]">Binnen 5 minuten.</span>
            </h1>

            <p className="text-[var(--text2)] text-[1.05rem] leading-relaxed mb-8">
              Je hoeft nu niets te kiezen. Tijdens de proefperiode bepaal je in Snellio welk
              abonnement bij je bedrijf past, vanaf {fmtEuro(vanaf)} per maand {BTW.short}.
            </p>

            {/* Wat je tijdens de proefperiode krijgt: alle functies, elk pakket. */}
            <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-6 mb-8">
              <p className="font-outfit font-bold text-[var(--text)] text-sm mb-4">
                {TRIAL_DAGEN} dagen alles, zonder beperkingen
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2 list-none">
                {INBEGREPEN.map(f => (
                  <li key={f.label} className="flex items-start gap-2.5 text-sm text-[var(--text2)]">
                    <span className="text-[var(--green)] font-bold shrink-0 mt-px">✓</span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="flex flex-col gap-3 list-none mb-8">
              {[
                `Probeer ${TRIAL_DAGEN} dagen gratis, zonder betaalgegevens`,
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
              <a href="/contact" className="text-[var(--accent)] hover:underline">Plan een gesprek →</a>
            </p>
          </div>

          {/* Rechts: checkout form */}
          <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🚀</div>
              <h2 className="font-outfit font-bold text-[var(--text)] text-xl mb-2">Account aanmaken</h2>
              <p className="text-[var(--muted2)] text-sm leading-relaxed">
                {TRIAL_DAGEN} dagen gratis proberen, geen creditcard nodig. Na de proefperiode kies je zelf je
                abonnement: per maand of per jaar (twee maanden gratis), zelf betalen via iDEAL of
                automatische incasso. Niets loopt stilzwijgend door. Alle prijzen {BTW.short}.
              </p>
            </div>

            <CheckoutForm selectedPackage={plan.id} />

          </div>
        </div>
      </section>
    </>
  )
}