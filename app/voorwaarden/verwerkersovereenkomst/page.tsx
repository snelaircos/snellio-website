import type { Metadata }   from 'next'
import Link                from 'next/link'
import { buildMetadata }   from '@/lib/metadata'
import Container           from '@/components/ui/Container'
import { VOORWAARDEN }     from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Verwerkersovereenkomst',
  description: 'De verwerkersovereenkomst van Snellio (bijlage 1 bij de algemene voorwaarden), versie 2.0.',
  path:        '/voorwaarden/verwerkersovereenkomst',
})

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="font-outfit font-bold text-[var(--text)] text-xl mb-4">{title}</h2>
    <div className="text-[var(--text2)] text-sm leading-relaxed space-y-3">{children}</div>
  </section>
)

export default function VerwerkersovereenkomstPage() {
  return (
    <div className="pt-32 pb-24 px-[5%]">
      <Container narrow>
        <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">Juridisch</p>
        <h1 className="font-outfit font-black text-[var(--text)] text-4xl mb-2">Verwerkersovereenkomst</h1>
        <p className="text-[var(--muted2)] text-sm mb-12">
          Bijlage 1 bij de <Link href="/voorwaarden" className="underline hover:text-[var(--accent)]">algemene voorwaarden</Link> · versie {VOORWAARDEN.versie} · {VOORWAARDEN.datum}
        </p>

        <Section title="1. Partijen en aanvaarding">
          <p>1.1 Deze verwerkersovereenkomst wordt gesloten tussen de Klant als verwerkingsverantwoordelijke en Snellio als verwerker, en wordt aanvaard op dezelfde wijze en op hetzelfde moment als de algemene voorwaarden (artikel 3.2 daarvan). Een afzonderlijke handtekening is niet vereist.</p>
          <p>1.2 Begrippen hebben de betekenis die de Algemene verordening gegevensbescherming (AVG) daaraan geeft.</p>
        </Section>

        <Section title="2. Onderwerp van de verwerking">
          <p>2.1 Snellio verwerkt in opdracht van de Klant persoonsgegevens die de Klant of zijn Gebruikers in de Dienst invoeren of via koppelingen laten invoeren.</p>
          <p>2.2 Categorieën betrokkenen: klanten en contactpersonen van de Klant, bewoners en gebruikers van installatieadressen, medewerkers en monteurs van de Klant, en personen die via WhatsApp met de Klant communiceren.</p>
          <p>2.3 Categorieën persoonsgegevens: naam, adres, e-mailadres, telefoonnummer, installatiegegevens gekoppeld aan een adres, werkorders, afspraken, facturen, betalingsstatus, WhatsApp-berichten en bijlagen, en notities die de Klant invoert.</p>
          <p>2.4 Doeleinden: het leveren van de Dienst zoals beschreven in de algemene voorwaarden, waaronder klantbeheer, planning, werkorders, koudemiddelregistratie, facturatie, berichtenverkeer via WhatsApp en de AI-functies die de Klant activeert.</p>
          <p>2.5 Duur: de duur van het Abonnement, verlengd met de bewaartermijn van 60 dagen uit de algemene voorwaarden.</p>
        </Section>

        <Section title="3. Verplichtingen van Snellio">
          <p>3.1 Snellio verwerkt de persoonsgegevens uitsluitend in opdracht van de Klant en volgens diens schriftelijke instructies. De algemene voorwaarden en deze bijlage vormen die instructies. Snellio verwerkt niet voor eigen doeleinden, behoudens geanonimiseerde en geaggregeerde gegevens zoals bedoeld in artikel 10.5 van de algemene voorwaarden.</p>
          <p>3.2 Snellio informeert de Klant als een instructie naar haar oordeel in strijd is met de AVG.</p>
          <p>3.3 Snellio zorgt dat personen die toegang hebben tot de persoonsgegevens gebonden zijn aan vertrouwelijkheid en beperkt de toegang tot wat noodzakelijk is.</p>
          <p>3.4 Snellio treft passende technische en organisatorische beveiligingsmaatregelen, waaronder ten minste: versleuteling van verbindingen (TLS) en van opslag, toegangsbeheer met rolgebaseerde rechten en rijniveau-beveiliging in de database, scheiding van gegevens per Klant, logging van beheerhandelingen, dagelijkse back-ups met beperkte bewaartermijn, en periodieke beoordeling van de beveiliging.</p>
          <p>3.5 Snellio verleent de Klant redelijke bijstand bij het beantwoorden van verzoeken van betrokkenen (inzage, correctie, verwijdering, overdracht, bezwaar). Ontvangt Snellio zo’n verzoek rechtstreeks, dan stuurt zij het door aan de Klant en handelt het niet zelf inhoudelijk af. De Dienst biedt functies waarmee de Klant de meeste verzoeken zelf kan afhandelen.</p>
          <p>3.6 Snellio verleent de Klant redelijke bijstand bij een gegevensbeschermingseffectbeoordeling en bij voorafgaande raadpleging van de toezichthouder, voor zover dat betrekking heeft op de verwerking in de Dienst.</p>
        </Section>

        <Section title="4. Datalekken">
          <p>4.1 Snellio informeert de Klant zonder onredelijke vertraging en uiterlijk binnen 48 uur na ontdekking van een inbreuk in verband met persoonsgegevens die de Klant raakt, via het accountadres.</p>
          <p>4.2 De melding bevat ten minste: de aard van de inbreuk, de betrokken categorieën gegevens en betrokkenen voor zover bekend, de waarschijnlijke gevolgen, en de genomen en voorgenomen maatregelen. Informatie mag gefaseerd worden verstrekt.</p>
          <p>4.3 De Klant beslist over melding aan de Autoriteit Persoonsgegevens en aan betrokkenen. Snellio meldt niet namens de Klant.</p>
        </Section>

        <Section title="5. Subverwerkers">
          <p>5.1 De Klant geeft algemene toestemming voor het inschakelen van subverwerkers. De actuele lijst staat in <Link href="/voorwaarden/subverwerkers" className="text-[var(--accent)] hover:underline">bijlage 2</Link>.</p>
          <p>5.2 Snellio kondigt een nieuwe of gewijzigde subverwerker ten minste 30 dagen vooraf aan via een melding in de Dienst en per e-mail. De Klant kan binnen die termijn gemotiveerd bezwaar maken. Kunnen partijen daar niet uitkomen, dan kan de Klant het Abonnement opzeggen tegen de ingangsdatum, met terugbetaling van het vooruitbetaalde en niet-genoten deel.</p>
          <p>5.3 Snellio legt aan subverwerkers verplichtingen op die ten minste gelijkwaardig zijn aan die in deze bijlage en blijft jegens de Klant verantwoordelijk voor hun handelen.</p>
        </Section>

        <Section title="6. Doorgifte buiten de EER">
          <p>6.1 Persoonsgegevens worden binnen de Europese Economische Ruimte opgeslagen.</p>
          <p>6.2 Voor subverwerkers die (mede) buiten de EER verwerken, zoals de AI-leverancier en de WhatsApp-dienst, zorgt Snellio voor een geldig doorgiftemechanisme: een adequaatheidsbesluit, het EU-US Data Privacy Framework, of de standaardcontractbepalingen van de Europese Commissie. <Link href="/voorwaarden/subverwerkers" className="text-[var(--accent)] hover:underline">Bijlage 2</Link> vermeldt per subverwerker welk mechanisme geldt.</p>
        </Section>

        <Section title="7. Audit en informatie">
          <p>7.1 Snellio stelt de Klant op verzoek de informatie ter beschikking die nodig is om de naleving van deze bijlage aan te tonen, waaronder een beschrijving van de beveiligingsmaatregelen en eventuele certificeringen of auditrapporten van subverwerkers.</p>
          <p>7.2 Is die informatie voor de Klant aantoonbaar onvoldoende, dan kan de Klant maximaal eenmaal per jaar, na ten minste 30 dagen aankondiging, een audit laten uitvoeren door een onafhankelijke deskundige die aan vertrouwelijkheid is gebonden. De audit vindt plaats tijdens kantooruren, verstoort de Dienst niet en de kosten zijn voor de Klant, tenzij de audit wezenlijke tekortkomingen bij Snellio aantoont.</p>
        </Section>

        <Section title="8. Verwijdering en teruggave">
          <p>8.1 Na beëindiging van het Abonnement en de bewaartermijn van 60 dagen verwijdert Snellio alle persoonsgegevens van de Klant, inclusief kopieën, behoudens gegevens die Snellio op grond van een wettelijke plicht moet bewaren. Uit back-ups verdwijnen de gegevens binnen de reguliere back-upcyclus van maximaal 30 dagen daarna.</p>
          <p>8.2 Tijdens de bewaartermijn kan de Klant zijn gegevens via de exportfunctie in een gangbaar, machineleesbaar formaat terugkrijgen. Snellio verleent daarbij op verzoek redelijke bijstand.</p>
        </Section>

        <Section title="9. Aansprakelijkheid en rangorde">
          <p>9.1 De aansprakelijkheidsregeling in artikel 14 van de algemene voorwaarden geldt ook voor deze bijlage, met dien verstande dat de beperking niet geldt voor zover de AVG dwingend anders bepaalt.</p>
          <p>9.2 Bij strijd tussen deze bijlage en de algemene voorwaarden gaat deze bijlage voor, uitsluitend voor zover het de verwerking van persoonsgegevens betreft.</p>
        </Section>
      </Container>
    </div>
  )
}
