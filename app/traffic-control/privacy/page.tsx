import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import Container          from '@/components/ui/Container'

export const metadata: Metadata = buildMetadata({
  title:       'Privacybeleid Snellio Traffic Control',
  description: 'Privacybeleid van Snellio Traffic Control: de app verzamelt, bewaart of deelt geen persoonsgegevens.',
  path:        '/traffic-control/privacy',
})

const sections = [
  {
    title: 'Persoonsgegevens',
    text:  'De app verzamelt, bewaart of deelt geen persoonsgegevens.',
  },
  {
    title: 'Lokale spelgegevens',
    text:  'Spelvoortgang, instellingen en behaalde scores kunnen lokaal op je apparaat worden opgeslagen. Deze gegevens verlaten je apparaat niet en worden verwijderd wanneer je de app en bijbehorende gegevens verwijdert.',
  },
  {
    title: 'Analytics, advertenties en tracking',
    text:  'De app gebruikt geen advertentienetwerken, trackingtechnologie of externe analyticsdiensten.',
  },
  {
    title: 'Kinderen',
    text:  'De app verzamelt geen persoonsgegevens van kinderen of andere gebruikers.',
  },
  {
    title: 'Wijzigingen',
    text:  'Als de werking van de app of dit privacybeleid verandert, wordt deze pagina bijgewerkt.',
  },
]

export default function TrafficControlPrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <Container narrow>
        <h1 className="font-outfit text-3xl font-extrabold text-navy sm:text-4xl">
          Privacybeleid Snellio Traffic Control
        </h1>
        <p className="mt-3 text-sm text-muted">Laatst bijgewerkt: 19 augustus 2026</p>
        <p className="mt-6 text-lg text-navy">
          Snellio Traffic Control respecteert je privacy.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-xl font-semibold text-navy">{section.title}</h2>
              <p className="leading-relaxed text-muted">{section.text}</p>
            </section>
          ))}

          <section>
            <h2 className="mb-2 text-xl font-semibold text-navy">Contact</h2>
            <p className="leading-relaxed text-muted">
              Voor vragen over privacy of de app kun je contact opnemen via{' '}
              <a href="mailto:info@snellio.nl" className="text-accent underline underline-offset-4 hover:text-accent-hover">
                info@snellio.nl
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  )
}
