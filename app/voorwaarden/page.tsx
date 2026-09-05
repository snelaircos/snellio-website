import type { Metadata }   from 'next'
import Link                from 'next/link'
import { buildMetadata }   from '@/lib/metadata'
import Container           from '@/components/ui/Container'
import { SITE, VOORWAARDEN } from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Algemene voorwaarden',
  description: 'De algemene voorwaarden van Snellio, versie 2.0. Inclusief verwerkersovereenkomst en lijst van subverwerkers.',
  path:        '/voorwaarden',
})

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="font-outfit font-bold text-[var(--text)] text-xl mb-4">{title}</h2>
    <div className="text-[var(--text2)] text-sm leading-relaxed space-y-3">{children}</div>
  </section>
)

export default function VoorwaardenPage() {
  return (
    <div className="pt-32 pb-24 px-[5%]">
      <Container narrow>
        <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">Juridisch</p>
        <h1 className="font-outfit font-black text-[var(--text)] text-4xl mb-2">Algemene voorwaarden</h1>
        <p className="text-[var(--muted2)] text-sm mb-6">
          Versie {VOORWAARDEN.versie} · geldig vanaf {VOORWAARDEN.datum} ·{' '}
          <Link href="/voorwaarden/archief-2026-08" className="underline hover:text-[var(--accent)]">vorige versie (augustus 2026)</Link>
        </p>

        <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-5 mb-12 text-sm text-[var(--text2)] leading-relaxed">
          Bij deze voorwaarden horen twee bijlagen die er deel van uitmaken:{' '}
          <Link href="/voorwaarden/verwerkersovereenkomst" className="text-[var(--accent)] hover:underline">bijlage 1, de verwerkersovereenkomst</Link>{' '}en{' '}
          <Link href="/voorwaarden/subverwerkers" className="text-[var(--accent)] hover:underline">bijlage 2, de lijst van subverwerkers</Link>.
        </div>

        <Section title="1. Wie wij zijn">
          <p>Snellio is een eenmanszaak, ingeschreven bij de Kamer van Koophandel onder nummer {SITE.kvk}, gevestigd aan de {SITE.adres}. In deze voorwaarden noemen wij onszelf “Snellio”, “wij” of “ons”.</p>
          <p>Contact: <a href={`mailto:${SITE.email}`} className="text-[var(--accent)] hover:underline">{SITE.email}</a>.</p>
        </Section>

        <Section title="2. Definities">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Dienst</strong>: het softwareplatform Snellio, inclusief de webapplicatie, de mobiele weergave, de API, de WhatsApp-koppeling, de AI-functies en alle updates daarvan.</li>
            <li><strong>Klant</strong>: de onderneming die een account aanmaakt en de overeenkomst met Snellio aangaat.</li>
            <li><strong>Gebruiker</strong>: iedere natuurlijke persoon die namens de Klant toegang heeft tot de Dienst, zoals de eigenaar en de monteurs.</li>
            <li><strong>Gegevens</strong>: alles wat de Klant of zijn Gebruikers in de Dienst invoeren of via koppelingen laten invoeren, waaronder klantgegevens, installatiegegevens, werkorders, koudemiddelregistraties, facturen en berichten.</li>
            <li><strong>Proefperiode</strong>: de gratis periode van 14 dagen na registratie.</li>
            <li><strong>Abonnement</strong>: de betaalde overeenkomst die start op het moment dat de Klant in de Dienst een abonnementsvorm kiest.</li>
          </ul>
        </Section>

        <Section title="3. Toepasselijkheid en acceptatie">
          <p>3.1 Deze voorwaarden zijn van toepassing op elke registratie, elke Proefperiode en elk Abonnement. Eigen inkoop- of leveringsvoorwaarden van de Klant zijn niet van toepassing.</p>
          <p>3.2 De Klant accepteert deze voorwaarden op twee momenten: bij registratie en bij de start van het Abonnement. Beide keren gebeurt dat door het aanvinken van een daartoe bestemd vakje. Snellio legt daarbij vast: het tijdstip, het versienummer van de voorwaarden, het account en het IP-adres. Deze vastlegging geldt tussen partijen als bewijs van acceptatie.</p>
          <p>3.3 De verwerkersovereenkomst in <Link href="/voorwaarden/verwerkersovereenkomst" className="text-[var(--accent)] hover:underline">bijlage 1</Link> maakt deel uit van deze voorwaarden en wordt met dezelfde acceptatie aanvaard.</p>
          <p>3.4 Snellio kan deze voorwaarden wijzigen. Wijzigingen worden ten minste 30 dagen vooraf aangekondigd via een melding in de Dienst en per e-mail aan het accountadres. Oudere versies blijven opvraagbaar. Blijft de Klant de Dienst na de ingangsdatum gebruiken, dan gelden de gewijzigde voorwaarden. Wijzigingen die de Klant wezenlijk benadelen geven de Klant het recht het Abonnement op te zeggen tegen de ingangsdatum, met terugbetaling van het vooruitbetaalde deel.</p>
        </Section>

        <Section title="4. Proefperiode">
          <p>4.1 Na registratie kan de Klant de Dienst 14 dagen gratis gebruiken. Er worden geen betaalgegevens en geen incassomachtiging gevraagd.</p>
          <p>4.2 De Proefperiode eindigt automatisch. Er ontstaat geen betalingsverplichting zolang de Klant geen Abonnement heeft gekozen.</p>
          <p>4.3 Kiest de Klant tijdens of aan het einde van de Proefperiode geen Abonnement, dan wordt het account alleen-lezen. De Klant kan zijn Gegevens dan nog inzien en exporteren, maar niet meer bewerken of aanvullen. Na 60 dagen alleen-lezen worden account en Gegevens verwijderd, met waarschuwingen per e-mail op dag 44 en dag 59.</p>
          <p>4.4 Snellio kan een registratie weigeren of een Proefperiode beëindigen bij vermoeden van onjuiste bedrijfsgegevens, misbruik of gebruik voor een ander doel dan de eigen bedrijfsvoering van de Klant.</p>
        </Section>

        <Section title="5. Abonnement, prijzen en looptijd">
          <p>5.1 Het Abonnement start op het moment dat de Klant in de Dienst een abonnementsvorm kiest en de acceptatie uit artikel 3.2 uitvoert.</p>
          <p>5.2 De Klant kiest een periode (per maand of per jaar) en een betaalwijze (betaling op factuur via iDEAL, of automatische incasso). Een jaarabonnement kost tien maandbedragen voor twaalf maanden.</p>
          <p>5.3 Alle prijzen zijn inclusief 21% btw, tenzij uitdrukkelijk anders vermeld. Extra gebruikers, extra modules en verbruik van AI-functies worden in rekening gebracht volgens de prijslijst die in de Dienst wordt getoond op het moment van afname.</p>
          <p>5.4 Snellio kan prijzen jaarlijks per 1 januari aanpassen aan de consumentenprijsindex van het CBS. Andere prijswijzigingen worden ten minste 30 dagen vooraf aangekondigd en gelden voor een lopend jaarabonnement pas bij de eerstvolgende verlenging.</p>
          <p>5.5 Een maandabonnement loopt per kalendermaand vanaf de startdatum en wordt telkens met een maand verlengd totdat het wordt opgezegd. Een jaarabonnement loopt tot het einde van de betaalde periode en wordt niet stilzwijgend verlengd. Snellio herinnert de Klant ten minste 30 dagen vóór afloop en de Klant kiest opnieuw.</p>
        </Section>

        <Section title="6. Betaling">
          <p>6.1 Betaling vindt vooraf plaats, vóór aanvang van de periode waarop de betaling betrekking heeft.</p>
          <p>6.2 Bij betaling op factuur ontvangt de Klant een factuur met een betaallink. De vervaldatum staat op de factuur. Snellio vermeldt op deze facturen bewust geen bankrekeningnummer; betaling via de betaallink wordt automatisch verwerkt, een handmatige overboeking niet.</p>
          <p>6.3 Kiest de Klant voor automatische incasso, dan geeft de Klant daarvoor een SEPA-machtiging af via de betaalprovider. De Klant is er zelf verantwoordelijk voor dat de incasso kan slagen: voldoende saldo, geen incassoblokkade bij de bank en een geldige machtiging. De Klant kan de incasso op elk moment in de Dienst stopzetten en overstappen op betaling op factuur.</p>
          <p>6.4 Een mislukte, geweigerde of teruggeboekte incasso beëindigt de betalingsverplichting niet. Het bedrag blijft verschuldigd. Snellio kan in dat geval de betaalwijze omzetten naar betaling op factuur en de kosten die Snellio door de mislukking of terugboeking maakt, waaronder bankkosten en administratiekosten, bij de Klant in rekening brengen.</p>
          <p>6.5 Bij overschrijding van de vervaldatum is de Klant zonder ingebrekestelling wettelijke handelsrente en buitengerechtelijke incassokosten verschuldigd conform de wettelijke regeling voor handelstransacties, met een minimum van 40 euro per factuur.</p>
          <p>6.6 Een factuur die de Klant betwist, moet binnen 14 dagen na de factuurdatum per e-mail gemotiveerd worden betwist. Daarna geldt de factuur als aanvaard. Een betwisting of klacht schort de betalingsverplichting niet op.</p>
        </Section>

        <Section title="7. Niet-betaling en alleen-lezen">
          <p>7.1 Is een factuur vijf dagen na de vervaldatum niet betaald, dan kan Snellio het account op alleen-lezen zetten. De Klant behoudt inzage en exportmogelijkheid, maar kan de Dienst niet meer actief gebruiken.</p>
          <p>7.2 Het alleen-lezen zetten ontslaat de Klant niet van de betalingsverplichting over de periode waarin het Abonnement liep, en geeft geen recht op terugbetaling of creditering.</p>
          <p>7.3 Na betaling wordt het account binnen een werkdag geheractiveerd.</p>
          <p>7.4 Blijft betaling na 60 dagen alleen-lezen uit, dan kan Snellio het Abonnement beëindigen en account en Gegevens verwijderen zoals bij artikel 4.3, onverminderd het recht het openstaande bedrag te vorderen.</p>
        </Section>

        <Section title="8. Opzegging en beëindiging">
          <p>8.1 Een maandabonnement kan tegen het einde van elke maandperiode worden opgezegd via de accountinstellingen of per e-mail. Een jaarabonnement eindigt aan het einde van de betaalde periode. Er vindt geen terugbetaling plaats over de lopende periode.</p>
          <p>8.2 Snellio kan het Abonnement met onmiddellijke ingang beëindigen als de Klant deze voorwaarden schendt en dat na een schriftelijke waarschuwing niet binnen 14 dagen herstelt, bij misbruik van de Dienst, bij faillissement of surseance van de Klant, of bij staking van de onderneming van de Klant.</p>
          <p>8.3 Na beëindiging blijft het account 60 dagen alleen-lezen beschikbaar voor inzage en export. Daarna worden de Gegevens verwijderd. Bepalingen die naar hun aard doorlopen, waaronder betaling, intellectueel eigendom, aansprakelijkheid, vertrouwelijkheid en gegevensbescherming, blijven na beëindiging van kracht.</p>
        </Section>

        <Section title="9. Gebruiksrecht en gebruik van de Dienst">
          <p>9.1 Snellio verleent de Klant voor de duur van het Abonnement een niet-exclusief, niet-overdraagbaar, niet-sublicentieerbaar recht om de Dienst te gebruiken voor de eigen bedrijfsvoering, met het aantal Gebruikers dat bij het gekozen pakket hoort.</p>
          <p>9.2 Een account is persoonlijk. Inloggegevens worden niet gedeeld. De Klant is verantwoordelijk voor alle handelingen die via zijn accounts en die van zijn Gebruikers plaatsvinden en meldt vermoedelijk misbruik direct aan Snellio.</p>
          <p>9.3 Het is niet toegestaan de Dienst te gebruiken voor onrechtmatige doelen, de Dienst te overbelasten, te storen of te omzeilen, geautomatiseerd gegevens te onttrekken buiten de daarvoor bedoelde API en exportfuncties, of de Dienst ter beschikking te stellen aan derden.</p>
          <p>9.4 De Klant verstrekt bij registratie juiste en volledige bedrijfsgegevens en houdt die actueel. Snellio mag deze gegevens toetsen aan openbare registers.</p>
        </Section>

        <Section title="10. Gegevens van de Klant">
          <p>10.1 De Gegevens zijn en blijven eigendom van de Klant. Snellio verkrijgt daarop geen rechten anders dan nodig om de Dienst te leveren.</p>
          <p>10.2 De Klant is verantwoordelijk voor de juistheid, volledigheid en rechtmatigheid van de Gegevens en voor het naleven van de op hem toepasselijke wet- en regelgeving, waaronder de F-gasverordening en de daaruit voortvloeiende registratie- en bewaarplichten.</p>
          <p>10.3 De Klant kan zijn Gegevens op elk moment exporteren in een gangbaar formaat. <strong className="text-[var(--text)]">De Klant is er zelf verantwoordelijk voor zijn Gegevens te exporteren vóór het einde van de bewaartermijn van 60 dagen na beëindiging of alleen-lezen.</strong> Snellio wijst erop dat wettelijke bewaarplichten, zoals de vijfjarige bewaarplicht voor F-gasregistraties, bij de Klant liggen en niet bij Snellio.</p>
          <p>10.4 Snellio maakt dagelijks back-ups voor continuïteit van de Dienst. Deze back-ups zijn geen archief voor de Klant en geven geen recht op herstel van door de Klant zelf verwijderde Gegevens.</p>
          <p>10.5 Snellio mag Gegevens in geanonimiseerde en geaggregeerde vorm, waaruit geen Klant of persoon herleidbaar is, gebruiken voor analyse, benchmarks, statistiek en verbetering en ontwikkeling van de Dienst, ook na beëindiging van het Abonnement.</p>
        </Section>

        <Section title="11. AI-functies en WhatsApp">
          <p>11.1 De Dienst bevat functies die gebruikmaken van kunstmatige intelligentie, waaronder het automatisch beantwoorden van WhatsApp-berichten en het opstellen van tekstvoorstellen. De Klant activeert deze functies zelf.</p>
          <p>11.2 Door AI gegenereerde inhoud, waaronder prijsindicaties, antwoorden aan klanten van de Klant en planningsvoorstellen, is een hulpmiddel. De Klant controleert deze inhoud vóór gebruik en blijft volledig verantwoordelijk voor wat namens hem wordt gecommuniceerd en toegezegd. Snellio staat niet in voor de juistheid van AI-uitvoer.</p>
          <p>11.3 Voor de AI-functies worden berichten en relevante Gegevens verwerkt door een AI-leverancier als subverwerker, zie <Link href="/voorwaarden/subverwerkers" className="text-[var(--accent)] hover:underline">bijlage 2</Link>. Snellio zorgt dat deze verwerking onder de verwerkersovereenkomst valt en dat de leverancier de Gegevens niet gebruikt voor het trainen van eigen modellen.</p>
          <p>11.4 De WhatsApp-koppeling maakt gebruik van de WhatsApp Business-diensten van Meta. De Klant houdt zich bij het gebruik aan de voorwaarden en het beleid van Meta voor zakelijk berichtenverkeer.</p>
        </Section>

        <Section title="12. Beschikbaarheid, onderhoud en wijzigingen">
          <p>12.1 Snellio spant zich in de Dienst zo goed mogelijk beschikbaar te houden en streeft naar een beschikbaarheid van 99,5% per maand, gemeten buiten aangekondigd onderhoud. Dit is een inspanningsverplichting, geen garantie.</p>
          <p>12.2 Onderhoud vindt bij voorkeur buiten kantoortijden plaats en wordt waar mogelijk vooraf aangekondigd.</p>
          <p>12.3 De Dienst wordt doorlopend ontwikkeld. Snellio kan functies toevoegen, wijzigen of verwijderen. Het verwijderen van een functie die de Klant wezenlijk gebruikt, wordt ten minste 30 dagen vooraf aangekondigd.</p>
          <p>12.4 Storingen meldt de Klant per e-mail aan <a href={`mailto:${SITE.email}`} className="text-[var(--accent)] hover:underline">{SITE.email}</a> met een zo volledig mogelijke beschrijving. Snellio pakt storingen op naar ernst en aard, zonder gegarandeerde hersteltermijn.</p>
        </Section>

        <Section title="13. Intellectueel eigendom">
          <p>13.1 Alle rechten van intellectueel eigendom op de Dienst, waaronder de software, broncode, databankstructuur, vormgeving, teksten, werkwijzen, concepten, documentatie en merken, berusten uitsluitend bij Snellio of haar licentiegevers. Het gebruiksrecht uit artikel 9 houdt geen overdracht van deze rechten in.</p>
          <p>13.2 Het is de Klant niet toegestaan de Dienst of delen daarvan te kopiëren, na te bouwen, te decompileren, te reverse-engineeren, te wijzigen, te verhuren of te gebruiken voor het ontwikkelen van een product of dienst die met de Dienst concurreert, behoudens voor zover dwingend recht dit toestaat.</p>
          <p>13.3 Feedback, suggesties en ideeën die de Klant over de Dienst deelt, mag Snellio vrij gebruiken zonder vergoeding of verplichting.</p>
          <p>13.4 Snellio mag de bedrijfsnaam en het logo van de Klant vermelden als referentie, tenzij de Klant daar per e-mail bezwaar tegen maakt.</p>
        </Section>

        <Section title="14. Aansprakelijkheid">
          <p>14.1 De Dienst wordt geleverd in de staat waarin hij zich bevindt. Snellio garandeert niet dat de Dienst foutloos of ononderbroken werkt, dat hij geschikt is voor een specifiek doel, of dat hij compatibel is met apparatuur en software die niet uitdrukkelijk als ondersteund is aangemerkt.</p>
          <p>14.2 De totale aansprakelijkheid van Snellio, uit welke hoofde ook, is per gebeurtenis en per kalenderjaar beperkt tot het bedrag dat de Klant in de drie maanden vóór de gebeurtenis aan Snellio heeft betaald, met een maximum van 500 euro. Een reeks samenhangende gebeurtenissen geldt als één gebeurtenis.</p>
          <p>14.3 Snellio is niet aansprakelijk voor indirecte schade of gevolgschade, waaronder gederfde winst, gemiste besparingen, bedrijfsstagnatie, boetes van toezichthouders, reputatieschade, verlies of beschadiging van Gegevens, kosten van herstel of reconstructie van Gegevens, en aanspraken van derden.</p>
          <p>14.4 Snellio is niet aansprakelijk voor schade die het gevolg is van onjuist gebruik, van onjuiste of onvolledige Gegevens, van keuzes van de Klant op basis van AI-uitvoer, van handelen van Gebruikers, van storingen bij derden zoals internet-, hosting-, betaal- of berichtenproviders, of van overmacht.</p>
          <p>14.5 De beperkingen in dit artikel gelden niet bij opzet of bewuste roekeloosheid van Snellio zelf.</p>
          <p>14.6 Een vordering tot schadevergoeding vervalt als de Klant die niet binnen zes maanden na ontdekking van de schade schriftelijk en gemotiveerd bij Snellio heeft ingediend.</p>
          <p>14.7 De Klant vrijwaart Snellio voor aanspraken van derden, waaronder de eigen klanten van de Klant, die verband houden met het gebruik van de Dienst door de Klant of met de Gegevens.</p>
        </Section>

        <Section title="15. Overmacht">
          <p>Snellio is niet gehouden tot nakoming als dat wordt verhinderd door omstandigheden buiten haar invloed, waaronder storingen bij hosting-, betaal-, berichten- of AI-leveranciers, stroom- of internetuitval, DDoS- of andere cyberaanvallen, overheidsmaatregelen, pandemieën en stakingen. Duurt de overmacht langer dan 30 dagen, dan kunnen beide partijen het Abonnement beëindigen zonder schadeplicht, met terugbetaling van het vooruitbetaalde en niet-genoten deel.</p>
        </Section>

        <Section title="16. Vertrouwelijkheid en gegevensbescherming">
          <p>16.1 Partijen behandelen elkaars vertrouwelijke informatie vertrouwelijk.</p>
          <p>16.2 Voor de verwerking van persoonsgegevens die de Klant in de Dienst invoert, is de Klant verwerkingsverantwoordelijke en Snellio verwerker. Daarop is de <Link href="/voorwaarden/verwerkersovereenkomst" className="text-[var(--accent)] hover:underline">verwerkersovereenkomst in bijlage 1</Link> van toepassing.</p>
          <p>16.3 Voor de persoonsgegevens van de Klant en zijn Gebruikers zelf, zoals accountgegevens en facturatiegegevens, is Snellio verwerkingsverantwoordelijke. Daarop is het <Link href="/privacy" className="text-[var(--accent)] hover:underline">privacybeleid</Link> van Snellio van toepassing.</p>
        </Section>

        <Section title="17. Overige bepalingen">
          <p>17.1 Snellio mag rechten en verplichtingen uit de overeenkomst overdragen aan een derde, bijvoorbeeld bij overdracht van de onderneming. De Klant mag dat niet zonder schriftelijke toestemming van Snellio.</p>
          <p>17.2 Als een bepaling nietig of onafdwingbaar is, blijven de overige bepalingen van kracht en wordt de betreffende bepaling vervangen door een geldige bepaling die de bedoeling zo dicht mogelijk benadert.</p>
          <p>17.3 Het niet afdwingen van een bepaling door Snellio is geen afstand van recht.</p>
          <p>17.4 Mededelingen tussen partijen gebeuren per e-mail, voor Snellio via {SITE.email} en voor de Klant via het accountadres of het factuuradres.</p>
        </Section>

        <Section title="18. Toepasselijk recht en geschillen">
          <p>18.1 Op de overeenkomst is Nederlands recht van toepassing.</p>
          <p>18.2 Geschillen worden voorgelegd aan de bevoegde rechter van de rechtbank Gelderland, locatie Arnhem, tenzij dwingend recht anders bepaalt. Partijen proberen een geschil eerst in overleg op te lossen.</p>
        </Section>
      </Container>
    </div>
  )
}
