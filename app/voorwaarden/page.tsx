import type { Metadata }   from 'next'
import { buildMetadata }   from '@/lib/metadata'
import Container           from '@/components/ui/Container'
import { SITE }            from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Algemene voorwaarden',
  description: 'Lees de algemene voorwaarden van Snellio voor het gebruik van onze CRM-software.',
  path:        '/voorwaarden',
})

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="font-outfit font-bold text-white text-xl mb-4">{title}</h2>
    <div className="text-[var(--text2)] text-sm leading-relaxed space-y-3">{children}</div>
  </section>
)

export default function VoorwaardenPage() {
  return (
    <div className="pt-32 pb-24 px-[5%]">
      <Container narrow>
        <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Juridisch</p>
        <h1 className="font-outfit font-black text-white text-4xl mb-2">Algemene voorwaarden</h1>
        <p className="text-[var(--muted2)] text-sm mb-12">Laatste update: januari 2025</p>

        <Section title="1. Definities">
          <p><strong>Snellio:</strong> het softwareplatform aangeboden door {SITE.company} (KvK {SITE.kvk}).</p>
          <p><strong>Gebruiker:</strong> de natuurlijke of rechtspersoon die een account aanmaakt bij Snellio.</p>
          <p><strong>Dienst:</strong> het CRM-platform inclusief alle bijbehorende functies en updates.</p>
        </Section>

        <Section title="2. Toepasselijkheid">
          <p>Deze voorwaarden zijn van toepassing op alle overeenkomsten tussen {SITE.company} en de gebruiker. Door een account aan te maken accepteert u deze voorwaarden.</p>
        </Section>

        <Section title="3. Abonnement en betaling">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Abonnementen lopen per maand of per jaar, zoals gekozen bij aanmelding</li>
            <li>Betaling vindt vooraf plaats via Mollie (iDEAL, creditcard)</li>
            <li>Bij niet-betaling behoudt {SITE.company} het recht om toegang te beperken</li>
            <li>Prijswijzigingen worden minimaal 30 dagen van tevoren gecommuniceerd</li>
          </ul>
        </Section>

        <Section title="4. Proefperiode">
          <p>Nieuwe gebruikers genieten een gratis proefperiode van 14 dagen. Na afloop van de proefperiode is een betaald abonnement vereist om de dienst te blijven gebruiken.</p>
        </Section>

        <Section title="5. Opzegging">
          <p>Maandelijkse abonnementen kunnen maandelijks worden opgezegd. Jaarlijkse abonnementen lopen tot het einde van de betaalde periode. Opzeggen kan via de accountinstellingen of via {SITE.email}.</p>
        </Section>

        <Section title="6. Beschikbaarheid">
          <p>Wij streven naar een beschikbaarheid van 99,5%. Onderhoud wordt bij voorkeur buiten kantoortijden uitgevoerd. Wij zijn niet aansprakelijk voor schade door uitval.</p>
        </Section>

        <Section title="7. Gegevens en eigendom">
          <p>Alle gegevens die u invoert in Snellio blijven uw eigendom. Bij opzegging kunt u een export aanvragen. Na 90 dagen worden uw gegevens definitief verwijderd.</p>
        </Section>

        <Section title="8. Aansprakelijkheid">
          <p>De aansprakelijkheid van {SITE.company} is beperkt tot het bedrag dat u in de afgelopen 3 maanden heeft betaald, met een maximum van €500. Wij zijn nooit aansprakelijk voor indirecte schade of gevolgschade.</p>
        </Section>

        <Section title="9. Toepasselijk recht">
          <p>Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden beslecht door de bevoegde rechter in Nederland.</p>
        </Section>

        <Section title="10. Contact">
          <p>Vragen? Mail naar <a href={`mailto:${SITE.email}`} className="text-[var(--cyan)] hover:underline">{SITE.email}</a></p>
        </Section>
      </Container>
    </div>
  )
}
