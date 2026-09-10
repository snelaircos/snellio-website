import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import Container          from '@/components/ui/Container'

export const metadata: Metadata = buildMetadata({
  title:       'Support Snellio Traffic Control',
  description: 'Hulp nodig met Snellio Traffic Control? Antwoorden op veelgestelde vragen en direct contact met Snellio.',
  path:        '/traffic-control/support',
})

const faq = [
  {
    question: 'Werkt de app zonder internet?',
    answer:   'Ja. Snellio Traffic Control werkt volledig offline: geen account, geen registratie en geen internetverbinding nodig.',
  },
  {
    question: 'Waar wordt mijn voortgang bewaard?',
    answer:   'Je scores en sterren worden alleen lokaal op je apparaat opgeslagen. Verwijder je de app en de bijbehorende gegevens, dan is de voortgang weg.',
  },
  {
    question: 'Op welke apparaten kan ik spelen?',
    answer:   'De app is gemaakt voor iPhone en iPad (iOS 15 of nieuwer) in liggende stand. Een Android-versie is in voorbereiding.',
  },
  {
    question: 'Ik heb een fout gevonden of een idee. Waar kan ik dat kwijt?',
    answer:   'Graag! Mail ons met een korte omschrijving en — als het kan — een schermafbeelding. Vermeld ook je apparaat en iOS-versie.',
  },
]

export default function TrafficControlSupportPage() {
  return (
    <div className="pt-32 pb-24">
      <Container narrow>
        <h1 className="font-outfit text-3xl font-extrabold text-navy sm:text-4xl">
          Support — Snellio Traffic Control
        </h1>
        <p className="mt-4 text-lg text-muted">
          Vragen over Snellio Traffic Control, iets dat niet werkt of een goed
          idee voor het spel? We helpen je graag verder.
        </p>

        <div className="mt-8 rounded-2xl border border-green/30 bg-green/5 p-6">
          <h2 className="text-xl font-semibold text-navy">Contact</h2>
          <p className="mt-2 leading-relaxed text-muted">
            Mail ons op{' '}
            <a href="mailto:info@snellio.nl" className="text-accent underline underline-offset-4 hover:text-accent-hover">
              info@snellio.nl
            </a>
            . We reageren doorgaans binnen twee werkdagen.
          </p>
        </div>

        <h2 className="mt-12 mb-4 font-outfit text-2xl font-extrabold text-navy">
          Veelgestelde vragen
        </h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-semibold text-navy transition-colors group-open:text-green">
                {item.question}
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted">
          Snellio Traffic Control · versie 0.1.0 · een spel van Snellio
        </p>
      </Container>
    </div>
  )
}
