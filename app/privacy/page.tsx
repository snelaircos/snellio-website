import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/metadata'
import Container from '@/components/ui/Container'
import { SITE }  from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Privacybeleid',
  description: 'Lees het privacybeleid van Snellio. Hoe wij omgaan met uw persoonsgegevens en hoe wij uw privacy beschermen.',
  path:        '/privacy',
  noIndex:     false,
})

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="font-outfit font-bold text-white text-xl mb-4">{title}</h2>
    <div className="text-[var(--text2)] text-sm leading-relaxed space-y-3">{children}</div>
  </section>
)

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-[5%]">
      <Container narrow>
        <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">Juridisch</p>
        <h1 className="font-outfit font-black text-white text-4xl mb-2">Privacybeleid</h1>
        <p className="text-[var(--muted2)] text-sm mb-12">Laatste update: januari 2025</p>

        <Section title="1. Wie zijn wij?">
          <p>
            {SITE.name} is een product van {SITE.company}, gevestigd in Nederland (KvK {SITE.kvk}).
            Wij bieden CRM-software voor HVAC- en koeltechnisch installateurs via {SITE.url}.
          </p>
          <p>Vragen over privacy? Mail naar <a href={`mailto:${SITE.email}`} className="text-[var(--cyan)] hover:underline">{SITE.email}</a></p>
        </Section>

        <Section title="2. Welke gegevens verzamelen wij?">
          <p>Wij verwerken de volgende persoonsgegevens:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Naam, e-mailadres en bedrijfsnaam bij registratie</li>
            <li>Bedrijfsgegevens (adres, KvK, BTW-nummer)</li>
            <li>Klantgegevens die u invoert in de applicatie</li>
            <li>Technische gegevens (IP-adres, browsertype, sessiedata)</li>
            <li>Betalingsinformatie (verwerkt door Mollie, niet door ons opgeslagen)</li>
          </ul>
        </Section>

        <Section title="3. Waarvoor gebruiken wij uw gegevens?">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Verlenen van de dienst (CRM-functionaliteit)</li>
            <li>Facturering van uw abonnement</li>
            <li>Klantenservice en support</li>
            <li>Verbetering van het platform</li>
            <li>Wettelijke verplichtingen</li>
          </ul>
        </Section>

        <Section title="4. Grondslag voor verwerking">
          <p>Wij verwerken uw gegevens op basis van:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Uitvoering van de overeenkomst (abonnement)</li>
            <li>Gerechtvaardigd belang (beveiliging, verbetering platform)</li>
            <li>Wettelijke verplichting</li>
            <li>Toestemming (voor marketing, indien van toepassing)</li>
          </ul>
        </Section>

        <Section title="5. Delen met derden">
          <p>Wij delen uw gegevens alleen met verwerkers die noodzakelijk zijn voor onze dienstverlening:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Supabase</strong> — database hosting (EU)</li>
            <li><strong>Mollie</strong> — betalingsverwerking</li>
            <li><strong>Resend</strong> — transactionele e-mails</li>
          </ul>
          <p>Wij verkopen uw gegevens nooit aan derden.</p>
        </Section>

        <Section title="6. Uw rechten">
          <p>U heeft het recht op inzage, correctie, verwijdering, bezwaar en dataportabiliteit.
          Neem hiervoor contact op via <a href={`mailto:${SITE.email}`} className="text-[var(--cyan)] hover:underline">{SITE.email}</a>.</p>
        </Section>

        <Section title="7. Bewaartermijnen">
          <p>Accountgegevens worden bewaard zolang u klant bent en daarna maximaal 2 jaar voor administratieve doeleinden. Factuurgegevens worden 7 jaar bewaard conform de wettelijke bewaarplicht.</p>
        </Section>

        <Section title="8. Cookies">
          <p>Wij gebruiken functionele cookies (noodzakelijk) en analytische cookies (met toestemming). Zie ons <a href="/cookiebeleid" className="text-[var(--cyan)] hover:underline">cookiebeleid</a> voor details.</p>
        </Section>

        <Section title="9. Wijzigingen">
          <p>Wij kunnen dit privacybeleid aanpassen. Wij informeren u via e-mail bij wezenlijke wijzigingen.</p>
        </Section>
      </Container>
    </div>
  )
}
