import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { buildMetadata }    from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schemas'
import JsonLd from '@/components/seo/JsonLd'
import { SITE } from '@/lib/constants'

// DemoForm uit het critical bundle, SSR levert direct HTML, JS laadt apart
const DemoForm = dynamic(() => import('@/components/forms/DemoForm'))

export const metadata: Metadata = buildMetadata({
  title:       'Demo aanvragen, Persoonlijke walkthrough van Snellio',
  description: 'Vraag een persoonlijke demo van Snellio aan. We laten je in 20 minuten zien hoe werkbon, F-gassen, planning en facturatie samenkomen in één app. Reactie binnen 1 werkdag.',
  path:        '/demo',
})

const voordelen = [
  { icon: '⚡', title: 'Binnen 1 werkdag contact',     desc: 'We bellen of mailen je terug om een tijdstip te plannen.'                           },
  { icon: '🎯', title: 'Persoonlijke walkthrough',     desc: '20–30 min op maat, we tonen wat relevant is voor jouw werkplaats.'                 },
  { icon: '💬', title: 'Eerlijk advies',               desc: 'Past Snellio bij je niet? Dan zeggen we dat. Geen verkooppraatjes.'                  },
  { icon: '🛡️', title: 'Geen verplichtingen',          desc: 'Demo is gratis en vrijblijvend. Geen contract, geen kosten.'                         },
]

export default function DemoPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home', href: '/' },
        { name: 'Demo', href: '/demo' },
      ])} />

      <section className="pt-32 pb-24 px-[5%]">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-start">

          {/* Links: info */}
          <div>
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Demo aanvragen
            </p>
            <h1
              className="font-outfit font-black text-white tracking-tight leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Zie Snellio in 20 minuten.<br />
              <span className="text-[var(--cyan)]">Op jouw werkplaats afgestemd.</span>
            </h1>
            <p className="text-[var(--text2)] text-[1.05rem] leading-relaxed mb-10">
              Vul het formulier in en we plannen een persoonlijke walkthrough. We laten je zien hoe
              werkbon, F-gassen, planning en facturatie in Snellio samenkomen, en of het past bij
              jouw bedrijf. Geen verplichtingen.
            </p>

            <ul className="flex flex-col gap-4 list-none">
              {voordelen.map(v => (
                <li
                  key={v.title}
                  className="flex items-start gap-4 p-5 bg-[var(--navy3)] rounded-xl border border-[var(--border)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(10,187,214,.1)] flex items-center justify-center text-lg shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{v.title}</p>
                    <p className="text-[var(--muted2)] text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-[var(--muted2)] text-xs mt-6">
              Liever direct mailen? Dat kan ook via{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="text-[var(--cyan)] font-medium hover:underline"
              >
                {SITE.email}
              </a>
              .
            </p>
          </div>

          {/* Rechts: formulier */}
          <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-8 lg:sticky lg:top-24">
            <h2 className="font-outfit font-bold text-white text-xl mb-2">Plan je demo</h2>
            <p className="text-[var(--muted2)] text-sm mb-6">
              We nemen binnen 1 werkdag contact op.
            </p>
            <DemoForm />
          </div>
        </div>
      </section>
    </>
  )
}
