import type { Metadata }   from 'next'
import Link                from 'next/link'
import { buildMetadata }   from '@/lib/metadata'
import Container           from '@/components/ui/Container'

export const metadata: Metadata = buildMetadata({
  title:       'Algemene voorwaarden (archief, augustus 2026)',
  description: 'Gearchiveerde versie van de algemene voorwaarden van Snellio, geldig tot 5 september 2026.',
  path:        '/voorwaarden/archief-2026-08',
  noIndex:     true,
})

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="font-outfit font-bold text-[var(--text)] text-xl mb-4">{title}</h2>
    <div className="text-[var(--text2)] text-sm leading-relaxed space-y-3">{children}</div>
  </section>
)

// Bevroren archieftekst: bewust hardcoded (geen SITE-constanten), zodat
// latere naams- of gegevenswijzigingen deze historische versie niet aanpassen.
export default function VoorwaardenArchief202608Page() {
  return (
    <div className="pt-32 pb-24 px-[5%]">
      <Container narrow>
        <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">Juridisch · Archief</p>
        <h1 className="font-outfit font-black text-[var(--text)] text-4xl mb-2">Algemene voorwaarden</h1>
        <p className="text-[var(--muted2)] text-sm mb-6">Laatste update: augustus 2026 · gold tot 5 september 2026</p>

        <div className="bg-[rgba(224,122,48,.08)] border border-[rgba(224,122,48,.3)] rounded-xl p-5 mb-12 text-sm text-[var(--text2)] leading-relaxed">
          Dit is een gearchiveerde versie. De actuele voorwaarden staan op{' '}
          <Link href="/voorwaarden" className="text-[var(--accent)] hover:underline">snellio.nl/voorwaarden</Link>.
        </div>

        <Section title="1. Definities">
          <p><strong>Snellio:</strong> het softwareplatform aangeboden door Snellio Webdesign (KvK 69499829).</p>
          <p><strong>Gebruiker:</strong> de natuurlijke of rechtspersoon die een account aanmaakt bij Snellio.</p>
          <p><strong>Dienst:</strong> het CRM-platform inclusief alle bijbehorende functies en updates.</p>
        </Section>

        <Section title="2. Toepasselijkheid">
          <p>Deze voorwaarden zijn van toepassing op alle overeenkomsten tussen Snellio Webdesign en de gebruiker. Door een account aan te maken accepteert u deze voorwaarden.</p>
        </Section>

        <Section title="3. Abonnement en betaling">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Abonnementen lopen per maand of per jaar, zoals gekozen bij aanmelding</li>
            <li>Alle genoemde prijzen zijn inclusief 21% btw</li>
            <li>Betaling vindt vooraf plaats via Mollie (iDEAL, creditcard)</li>
            <li>Bij niet-betaling behoudt Snellio Webdesign het recht om toegang te beperken</li>
            <li>Prijswijzigingen worden minimaal 30 dagen van tevoren gecommuniceerd</li>
          </ul>
        </Section>

        <Section title="4. Proefperiode">
          <p>Nieuwe gebruikers genieten een gratis proefperiode van 14 dagen. Na afloop van de proefperiode is een betaald abonnement vereist om de dienst te blijven gebruiken.</p>
        </Section>

        <Section title="5. Opzegging">
          <p>Maandelijkse abonnementen kunnen maandelijks worden opgezegd. Jaarlijkse abonnementen lopen tot het einde van de betaalde periode. Opzeggen kan via de accountinstellingen of via info@snellio.nl.</p>
        </Section>

        <Section title="6. Beschikbaarheid">
          <p>Wij streven naar een beschikbaarheid van 99,5%. Onderhoud wordt bij voorkeur buiten kantoortijden uitgevoerd. Wij zijn niet aansprakelijk voor schade door uitval.</p>
        </Section>

        <Section title="7. Gegevens en eigendom">
          <p>Alle gegevens die u invoert in Snellio blijven uw eigendom. Bij opzegging kunt u een export aanvragen. Na 90 dagen worden uw gegevens definitief verwijderd.</p>
        </Section>

        <Section title="8. Aansprakelijkheid">
          <p>De aansprakelijkheid van Snellio Webdesign is beperkt tot het bedrag dat u in de afgelopen 3 maanden heeft betaald, met een maximum van €500. Wij zijn nooit aansprakelijk voor indirecte schade of gevolgschade.</p>
        </Section>

        <Section title="9. Toepasselijk recht">
          <p>Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden beslecht door de bevoegde rechter in Nederland.</p>
        </Section>

        <Section title="10. Contact">
          <p>Vragen? Mail naar <a href="mailto:info@snellio.nl" className="text-[var(--accent)] hover:underline">info@snellio.nl</a></p>
        </Section>
      </Container>
    </div>
  )
}
