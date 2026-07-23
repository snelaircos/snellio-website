import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { buildMetadata }    from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schemas'
import JsonLd from '@/components/seo/JsonLd'
import YouTubeFacade from '@/components/ui/YouTubeFacade'
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

      {/* Video-preview boven het formulier: bezoeker ziet direct wat Snellio doet
         voor hij een persoonlijk gesprek aanvraagt. Zelfde YouTubeFacade als de
         homepage, dus zelfde performance-profiel. */}
      <section className="pt-32 pb-12 px-[5%]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">
            Eerst even zien
          </p>
          <h2 className="font-outfit font-bold text-[var(--text)] tracking-tight leading-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Snellio in één minuut.
          </h2>
          <p className="text-[var(--text2)] text-base mb-8 max-w-2xl mx-auto">
            Kort overzicht van werkbon, planning, F-gassen en factuur. Daarna plan je
            hieronder een persoonlijke walkthrough.
          </p>
          <YouTubeFacade
            videoId="1zqn7mcvo28"
            thumbnail="/thumbnail-demo001.jpg"
            title="Snellio software voor de koel/CV installateur, demo"
          />
        </div>
      </section>

      <section className="pt-8 pb-24 px-[5%]">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-start">

          {/* Links: info */}
          <div>
            <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">
              Demo aanvragen
            </p>
            <h1
              className="font-outfit font-black text-[var(--text)] tracking-tight leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Zie Snellio in 20 minuten.<br />
              <span className="text-[var(--accent)]">Op jouw werkplaats afgestemd.</span>
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
                    <p className="text-[var(--text)] font-semibold text-sm mb-1">{v.title}</p>
                    <p className="text-[var(--muted2)] text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-[var(--muted2)] text-xs mt-6">
              Liever direct mailen? Dat kan ook via{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="text-[var(--accent)] font-medium hover:underline"
              >
                {SITE.email}
              </a>
              .
            </p>
          </div>

          {/* Rechts: formulier */}
          <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-8 lg:sticky lg:top-24">
            <h2 className="font-outfit font-bold text-[var(--text)] text-xl mb-2">Plan je demo</h2>
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
