import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import { TRIAL_DAGEN } from '@/lib/constants'
import JsonLd    from '@/components/seo/JsonLd'
import Pricing   from '@/components/sections/Pricing'
import Cta       from '@/components/sections/Cta'
import Container from '@/components/ui/Container'

export const metadata: Metadata = buildMetadata({
  title:       'Snellio prijzen | Software voor installatiebedrijven',
  description: 'Bekijk de prijzen van Snellio. Alle functies inbegrepen. Start 14 dagen gratis en kies daarna het abonnement dat bij jouw installatiebedrijf past.',
  path:        '/pricing',
})

// Antwoorden zijn geverifieerd tegen de app: betaalwijzen iDEAL en
// automatische incasso (lib/abonnement/keuze.ts), jaar = 10 maandbedragen,
// Starter-cap 25 installaties (lib/pakket.ts).
const faqs = [
  { question: 'Moet ik direct betalen?',
    answer:   `Nee. Je start eerst met een gratis trial van ${TRIAL_DAGEN} dagen. Bij registratie vragen we geen betaling en geen incassomachtiging.` },
  { question: 'Wanneer kies ik mijn abonnement?',
    answer:   'Tijdens de proefperiode kies je in Snellio welk abonnement bij je bedrijf past, en of je per maand of per jaar wilt betalen.' },
  { question: 'Kan ik maandelijks betalen?',
    answer:   'Ja. Bij maandelijkse betaling kun je per maand opzeggen.' },
  { question: 'Kan ik jaarlijks betalen?',
    answer:   'Ja. Bij jaarbetaling betaal je 10 maanden en gebruik je Snellio 12 maanden.' },
  { question: 'Welke betaalmethoden zijn beschikbaar?',
    answer:   'Automatische incasso (SEPA) of zelf betalen via iDEAL. Je kiest dit in Snellio op het moment dat je je abonnement kiest.' },
  { question: 'Kan ik later extra monteurs toevoegen?',
    answer:   'Ja. Bij Pro en Enterprise voeg je monteurs toe wanneer je wilt. De prijs wordt aangepast op basis van het gekozen pakket en het aantal monteurs: Pro €20 per extra monteur vanaf de 3e, Enterprise €10 per extra monteur vanaf de 6e. Starter en Basis zijn bedoeld voor 1 monteur; wil je er meer, dan stap je over naar Pro.' },
  { question: 'Wat gebeurt er als Starter boven 25 installaties komt?',
    answer:   'Dan stap je over naar Basis (€29 per maand, onbeperkt installaties). Je gegevens blijven gewoon staan.' },
  { question: 'Zitten planning, facturatie en F-gassen in elk pakket?',
    answer:   'Ja. Snellio kent geen losse modules of toeslagen. CRM, planning, werkbonnen, facturatie, installatiebeheer en F-gassen-administratie zitten in elk pakket, ook in Starter.' },
  { question: 'Zijn de boekhoudkoppelingen inbegrepen?',
    answer:   'Ja. De koppelingen met WeFact, Moneybird en Exact Online zijn bij elk pakket gratis inbegrepen. Staat jouw boekhoudpakket er niet bij? Dan proberen wij, indien mogelijk, deze alsnog toe te voegen.' },
  { question: 'Kan ik van pakket wisselen?',
    answer:   'Ja. Upgraden en downgraden kan op elk moment. Het nieuwe tarief gaat in bij de volgende factuurdatum.' },
  { question: 'Zijn er extra kosten voor updates?',
    answer:   'Nee. Alle updates en nieuwe functies zijn inbegrepen in je abonnement.' },
]

const heroChips = [
  'Vanaf €10 per maand',
  `${TRIAL_DAGEN} dagen gratis`,
  'Geen betaling nodig om te starten',
]

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={[
        breadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'Prijzen', href: '/pricing' }]),
        faqSchema(faqs),
      ]} />

      {/* Hero: binnen enkele seconden duidelijk wat, voor wie, alles inbegrepen,
          gratis trial zonder betaling en wat het ongeveer kost. */}
      <section className="pt-32 pb-10 px-[5%] text-center">
        <Container>
          <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">
            Prijzen · Software voor installatiebedrijven
          </p>
          <h1 className="font-outfit font-black text-[var(--text)] tracking-tight leading-tight mb-5"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
            Eenvoudige prijzen.<br />
            <span className="text-[var(--accent)]">Heel Snellio inbegrepen.</span>
          </h1>
          <p className="text-[var(--text2)] text-lg leading-relaxed max-w-2xl mx-auto">
            CRM, planning, werkbonnen, facturatie en koeltechnische administratie zitten standaard in Snellio.
            Je betaalt alleen voor de grootte van je bedrijf.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 list-none">
            {heroChips.map(chip => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 bg-white border border-[var(--border)] rounded-full px-3.5 py-1.5 text-xs font-semibold text-[var(--text2)]"
              >
                <span className="text-[var(--green)]">✓</span>{chip}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Pricing />

      {/* FAQ */}
      <section className="py-20 px-[5%]" id="faq">
        <Container narrow>
          <h2 className="font-outfit font-bold text-[var(--text)] text-2xl mb-8 text-center">Veelgestelde vragen over prijzen</h2>
          <div className="flex flex-col gap-3">
            {faqs.map(faq => (
              <details
                key={faq.question}
                className="group bg-[var(--navy3)] border border-[var(--border)] rounded-xl px-6 py-4 hover:border-[rgba(10,187,214,.3)] transition-colors"
              >
                <summary className="font-semibold text-[var(--text)] text-[.95rem] cursor-pointer list-none flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-[var(--accent)] text-xl group-open:rotate-45 transition-transform leading-none shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="text-[var(--muted2)] text-sm leading-relaxed mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <Cta />
    </>
  )
}
