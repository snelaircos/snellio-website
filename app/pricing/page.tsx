import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import { BTW } from '@/lib/constants'
import JsonLd    from '@/components/seo/JsonLd'
import Pricing   from '@/components/sections/Pricing'
import Cta       from '@/components/sections/Cta'
import Container from '@/components/ui/Container'

export const metadata: Metadata = buildMetadata({
  title:       'Prijzen & pakketten | Snellio',
  description: 'Bekijk de prijzen van Snellio. Starter €10/mnd, Basis €29/mnd, Pro €69/mnd, Enterprise €129/mnd, incl. 21% btw. Probeer 14 dagen gratis.',
  path:        '/pricing',
})

const faqs = [
  { question: 'Is er een gratis proefperiode?',
    answer:   'Ja. Probeer alle pakketten 14 dagen gratis, zonder creditcard of betaalgegevens. Pas daarna kies je zelf hoe je betaalt: per maand of per jaar, via iDEAL of automatische incasso.' },
  { question: 'Zijn de prijzen inclusief btw?',
    answer:   'Ja. Alle genoemde prijzen zijn inclusief 21% btw. Het bedrag dat je ziet is het bedrag dat je betaalt, er komen geen kosten bij. Kies je incasso, dan incasseren we nooit méér dan het gekozen bedrag en loopt niets stilzwijgend door.' },
  { question: 'Zijn de boekhoudkoppelingen inbegrepen?',
    answer:   'Ja. De koppelingen met WeFact, Moneybird en Exact Online zijn bij elk pakket gratis inbegrepen, ook bij Starter. Staat uw boekhoudpakket er niet bij? Dan proberen wij, indien mogelijk, deze alsnog toe te voegen.' },
  { question: 'Kan ik op elk moment opzeggen?',
    answer:   'Ja. Bij maandelijkse betaling kunt u per maand opzeggen. Bij jaarlijkse betaling loopt het abonnement tot het einde van de betaalde periode.' },
  { question: 'Wat is het verschil tussen maandelijks en jaarlijks?',
    answer:   'Bij jaarlijkse betaling ontvangt u 2 maanden gratis, dat is een besparing van ruim 16%.' },
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
          <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">Transparante prijzen</p>
          <h1 className="font-outfit font-black text-[var(--text)] tracking-tight leading-tight mb-5"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
            Eerlijke prijzen,<br />
            <span className="text-[var(--accent)]">geen verrassingen.</span>
          </h1>
          <p className="text-[var(--text2)] text-lg leading-relaxed max-w-lg mx-auto">
            14 dagen gratis proberen, geen creditcard nodig. Daarna kies je zelf: per jaar of per maand, zelf betalen via iDEAL of automatische incasso. Alle prijzen {BTW.short}.
          </p>
        </Container>
      </section>

      <Pricing hideHeader={true} />

      {/* Zo betaal je (stap 12): jaar of maand × zelf via iDEAL of incasso */}
      <section className="py-16 px-[5%]">
        <Container narrow>
          <h2 className="font-outfit font-bold text-[var(--text)] text-2xl mb-3 text-center">Zo betaal je — jij kiest</h2>
          <p className="text-[var(--muted2)] text-sm text-center mb-8">
            Een jaarabonnement kost tien maandbedragen voor twaalf maanden: Starter €20, Basis €58, Pro €138 en Enterprise €258 voordeel per jaar.
            De jaarprijs is gelijk voor beide betaalwijzen — geen extra korting op incasso. Je abonnement loopt nooit stilzwijgend via incasso door.
          </p>
          <div className="grid grid-cols-[110px_1fr_1fr] gap-3 text-sm">
            <div />
            <div className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] self-end">Ik betaal zelf via iDEAL</div>
            <div className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] self-end">Automatische incasso</div>
            <div className="font-semibold text-[var(--text)] self-center">Per jaar <span className="block text-[.65rem] text-emerald-400 font-mono">AANBEVOLEN</span></div>
            <div className="bg-[var(--navy3)] border border-[var(--accent)] rounded-xl p-4 text-[var(--text2)]">Eén factuur voor tien maanden met betaallink, twaalf maanden toegang.</div>
            <div className="bg-[var(--navy3)] border border-[var(--accent)] rounded-xl p-4 text-[var(--text2)]">Eenmalig tien maanden, jaarlijks geïncasseerd.</div>
            <div className="font-semibold text-[var(--text)] self-center">Per maand</div>
            <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-4 text-[var(--text2)]">Elke maand een factuur met betaallink.</div>
            <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-4 text-[var(--text2)]">Elke maand automatisch geïncasseerd.</div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 px-[5%]">
        <Container narrow>
          <h2 className="font-outfit font-bold text-[var(--text)] text-2xl mb-10 text-center">Veelgestelde vragen</h2>
          <dl className="flex flex-col gap-5">
            {faqs.map(faq => (
              <div key={faq.question} className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-6">
                <dt className="font-semibold text-[var(--text)] mb-2">{faq.question}</dt>
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
