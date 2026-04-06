import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schemas'
import JsonLd    from '@/components/seo/JsonLd'
import CheckoutForm from '@/components/forms/CheckoutForm'
import { PLANS } from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Checkout — Start je gratis proefperiode',
  description: 'Kies je pakket en maak een account aan. 30 dagen gratis proberen, geen creditcard nodig. Snellio CRM voor installateurs.',
  path:        '/checkout',
})

interface Props {
  searchParams: { pakket?: string }
}

export default function CheckoutPage({ searchParams }: Props) {
  const geselecteerd = searchParams.pakket || 'pro'
  const plan = PLANS.find(p => p.id === geselecteerd) || PLANS[2]

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

            {/* Plan details */}
            <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-6 mb-8">
              <div className="flex items-end gap-1 mb-4">
                <sup className="text-[var(--cyan)] font-bold text-base">€</sup>
                <span className="font-outfit font-black text-2xl leading-none text-white">
                  {plan.price.month}
                </span>
                <span className="text-sm text-[var(--muted2)]">/mnd</span>
              </div>

              <ul className="flex flex-col gap-2 list-none">
                {plan.features.filter(f => f.included).slice(0, 5).map(f => (
                  <li key={f.label} className="flex items-center gap-2.5 text-sm text-[var(--text2)]">
                    <span className="text-[var(--green)] font-bold">✓</span>
                    {f.label}
                  </li>
                ))}
              </ul>

              {plan.features.filter(f => f.included).length > 5 && (
                <p className="text-[var(--muted2)] text-xs mt-3">
                  + {plan.features.filter(f => f.included).length - 5} meer functies
                </p>
              )}
            </div>

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

          {/* Rechts: checkout form */}
          <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">💳</div>
              <h2 className="font-outfit font-bold text-white text-xl mb-2">Account aanmaken</h2>
              <p className="text-[var(--muted2)] text-sm leading-relaxed">
                Vul je gegevens in om te beginnen. Betaling volgt na de proefperiode.
              </p>
            </div>

            <CheckoutForm selectedPackage={plan.id} />

            <p className="text-[var(--muted2)] text-xs mt-6 text-center">
              Door verder te gaan gaat u akkoord met onze{' '}
              <a href="/voorwaarden" className="hover:text-[var(--cyan)] transition-colors underline">voorwaarden</a>
              {' '}en{' '}
              <a href="/privacy" className="hover:text-[var(--cyan)] transition-colors underline">privacybeleid</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}