import type { Metadata } from 'next'
import Link              from 'next/link'
import { buildMetadata }  from '@/lib/metadata'
import Container from '@/components/ui/Container'
import { SITE, VOORWAARDEN } from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Privacybeleid',
  description: 'Lees het privacybeleid van Snellio, versie 2.0. Hoe wij omgaan met uw persoonsgegevens en hoe wij uw privacy beschermen.',
  path:        '/privacy',
  noIndex:     false,
})

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="font-outfit font-bold text-[var(--text)] text-xl mb-4">{title}</h2>
    <div className="text-[var(--text2)] text-sm leading-relaxed space-y-3">{children}</div>
  </section>
)

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-[5%]">
      <Container narrow>
        <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">Juridisch</p>
        <h1 className="font-outfit font-black text-[var(--text)] text-4xl mb-2">Privacybeleid</h1>
        <p className="text-[var(--muted2)] text-sm mb-12">
          Versie {VOORWAARDEN.versie} · {VOORWAARDEN.datum} ·{' '}
          <Link href="/privacy/archief-2025-01" className="underline hover:text-[var(--accent)]">vorige versie (januari 2025)</Link>
        </p>

        <Section title="1. Wie zijn wij?">
          <p>
            Snellio is een eenmanszaak, ingeschreven bij de Kamer van Koophandel onder nummer {SITE.kvk},
            gevestigd aan de {SITE.adres}. Wij bieden CRM-software voor installateurs via {SITE.url} en {SITE.appUrl}.
          </p>
          <p>Vragen over privacy? Mail naar <a href={`mailto:${SITE.email}`} className="text-[var(--accent)] hover:underline">{SITE.email}</a></p>
        </Section>

        <Section title="2. Welke gegevens verzamelen wij?">
          <p>Gegevens verzamelen wij doordat u ze zelf invoert in de applicatie, via uw gebruik van het platform (technische loggegevens) en via koppelingen die u zelf activeert. Wij verwerken de volgende persoonsgegevens:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Naam, e-mailadres en bedrijfsnaam bij registratie</li>
            <li>Bedrijfsgegevens (adres, KvK, BTW-nummer)</li>
            <li>Klantgegevens die u invoert in de applicatie</li>
            <li>WhatsApp-berichten en bijlagen die via de koppeling binnenkomen</li>
            <li>De inhoud van AI-interacties</li>
            <li>Gegevens over acceptatie van de voorwaarden (tijdstip, versienummer, IP-adres)</li>
            <li>Technische gegevens (IP-adres, browsertype, sessiedata)</li>
            <li>Betalingsinformatie (verwerkt door Mollie, niet door ons opgeslagen)</li>
          </ul>
        </Section>

        <Section title="3. Verantwoordelijke of verwerker?">
          <p>
            Voor de persoonsgegevens van uzelf en uw gebruikers, zoals accountgegevens, facturatiegegevens en de
            acceptatielogging, is Snellio <strong>verwerkingsverantwoordelijke</strong>. Daarop is dit privacybeleid van toepassing.
          </p>
          <p>
            Voor de gegevens die u over uw eigen klanten in de applicatie invoert, zoals klantdossiers, installaties,
            werkorders en WhatsApp-berichten, bent u zelf verwerkingsverantwoordelijke en is Snellio <strong>verwerker</strong>.
            Daarop is de{' '}
            <Link href="/voorwaarden/verwerkersovereenkomst" className="text-[var(--accent)] hover:underline">verwerkersovereenkomst</Link>{' '}
            van toepassing die deel uitmaakt van de algemene voorwaarden.
          </p>
        </Section>

        <Section title="4. Waarvoor gebruiken wij uw gegevens?">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Verlenen van de dienst (CRM-functionaliteit)</li>
            <li>Facturering van uw abonnement</li>
            <li>Klantenservice en support</li>
            <li>Verbetering van het platform</li>
            <li>Wettelijke verplichtingen</li>
          </ul>
        </Section>

        <Section title="5. Grondslag voor verwerking">
          <p>Wij verwerken uw gegevens op basis van:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Uitvoering van de overeenkomst (abonnement)</li>
            <li>Gerechtvaardigd belang (beveiliging, verbetering platform, bewijs van acceptatie)</li>
            <li>Wettelijke verplichting</li>
            <li>Toestemming (voor marketing, indien van toepassing)</li>
          </ul>
        </Section>

        <Section title="6. Delen met derden">
          <p>
            Wij delen uw gegevens alleen met verwerkers die noodzakelijk zijn voor onze dienstverlening. De actuele
            lijst, met per partij het doel, de locatie van verwerking en het doorgiftemechanisme, staat in{' '}
            <Link href="/voorwaarden/subverwerkers" className="text-[var(--accent)] hover:underline">bijlage 2 bij de algemene voorwaarden</Link>.
            Samengevat: Supabase (database, EU), Hostinger (hosting, EU), Mollie (betalingen, EU), Resend
            (e-mail, VS), Google (agenda-synchronisatie, EU/VS), Meta Platforms (WhatsApp, EU/VS) en Anthropic
            (AI-functies, VS).
          </p>
          <p>
            <strong>Doorgifte buiten de EER:</strong> persoonsgegevens worden binnen de Europese Economische Ruimte
            opgeslagen. Voor partijen die (mede) buiten de EER verwerken, zoals Resend, Google, Meta en Anthropic,
            geldt een geldig doorgiftemechanisme: het EU-US Data Privacy Framework of de standaardcontractbepalingen
            van de Europese Commissie. Bijlage 2 vermeldt per partij welk mechanisme geldt.
          </p>
          <p><strong>Boekhoudkoppelingen:</strong> activeert u een koppeling met uw boekhoudpakket (WeFact, Moneybird of Exact Online), dan worden factuur- en klantgegevens in uw opdracht met dat pakket uitgewisseld. Dit gebeurt uitsluitend na uw expliciete toestemming (via de officiële koppel-procedure van het pakket). U kunt de koppeling op elk moment verbreken; de toegangssleutels worden dan direct verwijderd.</p>
          <p>Wij verkopen uw gegevens nooit aan derden.</p>
        </Section>

        <Section title="7. AI-functies">
          <p>
            De applicatie bevat AI-functies, zoals het automatisch beantwoorden van WhatsApp-berichten en het opstellen
            van tekstvoorstellen. U zet deze functies zelf aan of uit. Voor deze functies worden de berichten en de
            gegevens die voor het antwoord nodig zijn verwerkt door onze AI-leverancier (Anthropic) als subverwerker.
            Deze gegevens worden niet gebruikt voor het trainen van AI-modellen.
          </p>
        </Section>

        <Section title="8. Uw rechten">
          <p>U heeft het recht op inzage, correctie, verwijdering, bezwaar en dataportabiliteit.
          Neem hiervoor contact op via <a href={`mailto:${SITE.email}`} className="text-[var(--accent)] hover:underline">{SITE.email}</a>.</p>
        </Section>

        <Section title="9. Bewaartermijnen">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Gegevens in de applicatie: tot 60 dagen na beëindiging van het abonnement of na het alleen-lezen worden van het account, daarna verwijderd</li>
            <li>Accountgegevens en acceptatielogging: tot 2 jaar na beëindiging, voor bewijs en administratie</li>
            <li>Facturen en betalingsgegevens: 7 jaar, conform de fiscale bewaarplicht</li>
            <li>Back-ups: maximaal 30 dagen na verwijdering</li>
          </ul>
        </Section>

        <Section title="10. Beveiliging">
          <p>
            Wij treffen passende technische en organisatorische maatregelen, waaronder: versleuteling van verbindingen
            (TLS) en van opslag, toegangsbeheer met rolgebaseerde rechten en rijniveau-beveiliging in de database,
            scheiding van gegevens per klant, logging van beheerhandelingen, dagelijkse back-ups met beperkte
            bewaartermijn, en periodieke beoordeling van de beveiliging.
          </p>
        </Section>

        <Section title="11. Datalekken">
          <p>
            Bij een inbreuk in verband met persoonsgegevens waarvoor Snellio verwerkingsverantwoordelijke is,
            informeren wij de betrokkenen en, waar de wet dat vereist, de Autoriteit Persoonsgegevens. Voor gegevens
            waarvoor u zelf verantwoordelijke bent, geldt de meldregeling uit de verwerkersovereenkomst.
          </p>
        </Section>

        <Section title="12. Cookies">
          <p>Wij gebruiken functionele cookies (noodzakelijk) en analytische cookies (met toestemming). Zie ons <a href="/cookiebeleid" className="text-[var(--accent)] hover:underline">cookiebeleid</a> voor details.</p>
        </Section>

        <Section title="13. Wijzigingen">
          <p>
            Wij kunnen dit privacybeleid aanpassen. Elke versie krijgt een versienummer en een datum; oudere versies
            blijven opvraagbaar via de archieflink bovenaan deze pagina. Bij wezenlijke wijzigingen informeren wij u
            via e-mail.
          </p>
        </Section>
      </Container>
    </div>
  )
}
