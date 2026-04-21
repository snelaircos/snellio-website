import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import JsonLd    from '@/components/seo/JsonLd'
import Pricing   from '@/components/sections/Pricing'
import Cta       from '@/components/sections/Cta'
import Container from '@/components/ui/Container'

export const metadata: Metadata = buildMetadata({
  title:       'Prijzen & pakketten | Snellio',
  description: 'Bekijk de prijzen van Snellio. Starter €10/mnd, Basis €29/mnd, Pro €69/mnd, Enterprise €129/mnd. 14 dagen gratis proberen, geen creditcard.',
  path:        '/pricing',
})

const faqs = [
  { question: 'Is er een gratis proefperiode?',
    answer:   'Ja. Alle pakketten zijn 14 dagen gratis te proberen. Geen creditcard nodig.' },
  { question: 'Kan ik op elk moment opzeggen?',
    answer:   'Ja. Bij maandelijkse betaling kunt u per maand opzeggen. Bij jaarlijkse betaling loopt het abonnement tot het einde van de betaalde periode.' },
  { question: 'Wat is het verschil tussen maandelijks en jaarlijks?',
    answer:   'Bij jaarlijkse betaling ontvangt u 2 maanden gratis — dat is een besparing van ruim 16%.' },
  { question: 'Zijn er extra kosten voor updates?',
    answer:   'Nee. Alle updates en nieuwe functies zijn inbegrepen in uw abonnement.' },
  { question: 'Kan ik van pakket wisselen?',
    answer:   'Ja, upgraden en downgraden is op elk moment mogelijk. Het nieuwe tarief gaat in bij de volgende factuurdatum.' },
]

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={[
        breadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'Prijzen', href: '/pricing' }]),
        faqSchema(faqs),
      ]} />

      {/* Hero */}
      <section className="pt-32 pb-4 px-[5%] text-center">
        <Container>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Transparante prijzen</p>
          <h1 className="font-outfit font-black text-white tracking-tight leading-tight mb-5"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
            Eerlijke prijzen,<br />
            <span className="text-[var(--cyan)]">geen verrassingen.</span>
          </h1>
          <p className="text-[var(--text2)] text-lg leading-relaxed max-w-lg mx-auto">
            Begin gratis. Kies het pakket dat bij jouw bedrijf past. Opzeggen wanneer je wilt.
          </p>
        </Container>
      </section>

      <Pricing hideHeader={true} />

      {/* FAQ */}
      <section className="py-20 px-[5%]">
        <Container narrow>
          <h2 className="font-outfit font-bold text-white text-2xl mb-10 text-center">Veelgestelde vragen</h2>
          <dl className="flex flex-col gap-5">
            {faqs.map(faq => (
              <div key={faq.question} className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-6">
                <dt className="font-semibold text-white mb-2">{faq.question}</dt>
                <dd className="text-[var(--muted2)] text-sm leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Cta />
    </>
  )
}
