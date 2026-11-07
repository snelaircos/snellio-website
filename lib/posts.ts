// Gedeelde bron voor blogartikelen. Gebruikt door de blog-index, de
// artikel-pagina ([slug]) én de sitemap, zodat lijst, detail en
// zoekmachine-aanmelding nooit uit elkaar kunnen lopen.
//
// Content-notatie: platte tekst (whitespace-pre-line), **vet** en
// [linktekst](/interne-url) worden door de mini-renderer in
// app/blog/[slug]/page.tsx omgezet.
//
// In productie later te vervangen door CMS of MDX.

export interface Post {
  slug:        string
  title:       string
  description: string   // meta description + excerpt op de index
  category:    string
  date:        string   // weergave, bv. '15 januari 2025'
  dateISO:     string   // machine-leesbaar voor schema.org + sitemap
  // Dag van de laatste inhoudelijke wijziging (deploydag). Gaat naar
  // BlogPosting.dateModified, og:article:modified_time, de sitemap en de
  // zichtbare regel "Bijgewerkt op". Zonder valt dateISO in.
  dateModifiedISO?: string
  readTime:    string
  content:     string
  // Optionele header-afbeelding: getoond boven het artikel en gebruikt
  // als OG-image + schema.org-image in plaats van de sitewide OG.
  // showAsHeader:false = alleen OG/schema, niet bovenaan tonen (bv. als
  // dezelfde afbeelding al inline in de tekst staat).
  image?: {
    src:      string
    alt:      string
    caption?: string
    width:    number
    height:   number
    showAsHeader?: boolean
  }
  // Afwijkende <title> (SEO); zonder valt post.title in.
  metaTitle?:  string
  tags?:       string[]
  // Auteursbox onder het artikel.
  author?:     { name: string; bio: string }
  // FAQ-blok onder het artikel; wordt ook als FAQPage-schema uitgezet.
  faq?:        { question: string; answer: string }[]
  // schema.org-type; standaard BlogPosting.
  schemaType?: 'Article' | 'BlogPosting'
  // Concept: alleen zichtbaar in `next dev`. In de productiebuild staat het
  // niet op de index, niet in de sitemap en geeft de URL een 404.
  draft?:      boolean
}

// Content-notatie, aanvullend op **vet** en [tekst](/pad):
//   ## Kop            → <h2>
//   ![alt](/pad.png)  → <figure><img loading="lazy"> — alleen gerenderd als
//                       het bestand in /public bestaat, anders niets (geen
//                       kapotte afbeelding, geen placeholder).

const ALLE_POSTS: Post[] = [
  // CONCEPT (7-11-2026), niet publiceren zonder akkoord Rudy.
  // Claims gecontroleerd in snellio-app main 77098ef; zie
  // docs/seo-geo/02-feature-factcheck.md, rijen Auditmap 19 punten e.v.
  // TODO(Rudy): screenshots uit het demo-account in /public/blog/brl-100-audit/
  //   auditmap-demo.png, handboek-op-brl-eis.png, logboek-pdf.png,
  //   werkbon-handeling-pdf.png. Tot ze er staan rendert de blog ze niet.
  // TODO(Rudy): bedrag bij "Wat kost het" pas na bevestiging; nu alleen de
  //   verwijzing naar de prijzenpagina.
  // TODO(publicatie): date, dateISO en dateModifiedISO op de publicatiedag
  //   zetten en draft weghalen.
  {
    slug:        'brl-100-audit-voorbereiden',
    title:       'BRL 100 v3.0-audit voorbereiden: zie vooraf wat de auditor gaat vinden',
    metaTitle:   'BRL 100 v3.0-audit voorbereiden: zie vooraf wat ontbreekt | Snellio',
    description: 'Transitie-audit BRL 100 v3.0 op komst? Zo zie je elke week of je registratie en werkwijze kloppen, in plaats van pas bij de auditor.',
    category:    'Regelgeving',
    date:        '7 november 2026',
    dateISO:     '2026-11-07',
    dateModifiedISO: '2026-11-07',
    readTime:    '9 min',
    schemaType:  'Article',
    draft:       true,
    tags:        ['brl 100 audit', 'transitie-audit', 'brl 100 versie 3.0', 'auditmap', 'f-gassen registratie', 'kwaliteitshandboek'],
    author: {
      name: 'Rudy Snel',
      bio:  "Rudy Snel is BRL 100 en STEK gecertificeerd airco- en warmtepompmonteur (Snel Airco's) en bouwer van Snellio. Hij gebruikt Snellio dagelijks in zijn eigen bedrijf.",
    },
    content:     `
      Je eerstvolgende reguliere audit na 31 augustus 2026 is de transitie-audit naar BRL 100 versie 3.0. Bereid je die niet voor op de avond ervoor, maar controleer elke week of je registratie en je werkwijze kloppen. In Snellio doet de auditmap dat: 19 punten in groen, oranje en rood, met één export voor de auditor.

      ## De audit komt eraan, en wat mist zie je pas bij de auditor

      Sinds 31 augustus 2026 geldt BRL 100 versie 3.0. Heb je al een certificaat, dan is je eerstvolgende reguliere audit de transitie-audit. Er komt geen extra audit bij, maar de auditor kijkt wel of je werkwijze past bij de nieuwe versie. Die verbreedt de scope naar natuurlijke koudemiddelen zoals R290 en scherpt de veiligheidseisen aan. De eisen aan je registraties bestonden al, en die worden net zo goed getoetst.

      Veel installateurs werken met papieren werkbonnen, een Excel-lijst voor de flessen en een map met certificaten. Dat gaat goed tot de auditor een steekproef trekt. Dan blijkt dat bij een vacuüm de standtijd niet is ingevuld, dat een kalibratierapport net verlopen is, of dat het logboek van een installatie niet compleet is. Je hoort het pas als er geen tijd meer is om het rustig op te lossen.

      De auditor wil geen map vol papier. De auditor wil bewijs dat je werkt zoals je handboek zegt.

      Twee audits van de afgelopen weken laten zien dat het anders kan. Bij mijn eigen Kiwa-audit kwam ik er zonder tekortkomingen doorheen. Een collega-installateur die bij Bureau Veritas werd geaudit, werd op twee punten teruggestuurd. Wat we van beide audits leerden, zit nu in Snellio.

      ## De auditmap: de voorbereidingslijst van de auditor, elke dag bijgewerkt

      ![Auditmap in Snellio met punten in groen, oranje en rood, met voorbeeldgegevens](/blog/brl-100-audit/auditmap-demo.png)

      Voor een audit stuurt je certificerende instelling een voorbereidingslijst: dit wil de auditor zien. In Snellio is die lijst een checklist, de auditmap. Snellio vult zelf in wat het uit je registratie kan halen. Wat niet uit je registratie komt, zoals het verslag van je interne audit, upload je bij Bedrijfsdocumenten.

      **Zo werkt hij**

      Je kiest een peildatum, een periode (standaard het jaar tot de peildatum) en het aantal werkbonnen in de steekproef (standaard 10). Elk punt krijgt een kleur. Groen is in orde, oranje vraagt aandacht, rood ontbreekt of is verlopen, grijs is niet van toepassing. Bij elk punt staat waar de gegevens vandaan komen, en de knop Openen brengt je naar de plek waar je het oplost. Per tekortkoming zie je om welke werkorders, installaties of meetmiddelen het gaat. Arbo-items, zoals de persoonlijke gasdetector, neem je mee of laat je weg.

      **De 19 punten**

      Registratie:
      1. Koudemiddelregistratie per installatie
      2. Logboek per installatie
      3. Koudemiddeljaarbalans van je bedrijf
      4. Flessenkaart per cilinder, in- en uitgaand

      Uitvoering:
      5. Werkregistraties en werkbonnen, met een steekproef
      6. Foto's van geïnstalleerde apparatuur met etikettering
      17. TRA en LMRA bij brandbaar koudemiddel

      Kwaliteitssysteem:
      7. Klachtenregistratie
      12. Procedures uit het handboek
      13. Beleidsverklaring van de directie
      14. Directiebeoordeling
      15. Verslag van de interne audit
      16. Projectevaluatie
      18. Verbeterregistratie
      19. Overzicht van je certificatie- en keurmerken

      Middelen en mensen:
      8. Meetmiddelen met geldige kalibratie en aankoopfactuur
      9. F-gassendiploma's van je monteurs
      10. Bewaking van de bevoegdheid per F-gascategorie
      11. KvK-uittreksel, verklaring dienstverband en certificaten van onderaannemers

      **Eén export voor de auditor**

      Met één knop maak je een ZIP. Daarin zit een inhoudsopgave met peildatum en periode, en per punt een map met de bestanden of een overzicht. Werk je met het handboek in Snellio, dan is het eerste document een kruisverwijzing: per eis van de BRL de plek in je handboek. Die ZIP stuur je naar de auditor.

      **Niet alleen of het er is, maar of het klopt**

      Een map met documenten zegt weinig. De auditmap kijkt ook of je handelingen kloppen. Een paar voorbeelden:
      - De steekproef vindt werkorders waar een drukproef of vacuüm als uitgevoerd staat, maar zonder meetwaarde.
      - Bij werk met brandbaar koudemiddel is een veiligheidsdossier pas volledig als de TRA ondertekend is en de LMRA getekend is vóór de eerste registratie op de werkbon. Een LMRA achteraf telt niet.
      - Het logboek gaat op oranje als een installatie met een koudemiddelhandeling geen nominale inhoud heeft, als bij koudemiddel toevoegen of aftappen de hoeveelheid ontbreekt, of als de monteur of het certificaatnummer van de monteur ontbreekt.
      - De beleidsverklaring is rood zonder ondertekening, en oranje als die binnen 30 dagen een jaar oud wordt.
      - Meetmiddelen, diploma's en documenten gaan 30 dagen voordat ze verlopen op oranje.

      **Een eerlijk voorbeeld uit mijn eigen bedrijf**

      Toen het punt TRA en LMRA erbij kwam, stond het bij mij op oranje. Eén werkorder was compleet. Bij een paar andere was de LMRA te laat getekend, of helemaal niet. De auditmap versoepelt de regel niet. Hij laat zien waar je werkwijze afwijkt. Mijn les: teken TRA en LMRA voordat je begint.

      **Je interne controle, elke week in plaats van één keer per jaar**

      De BRL vraagt periodieke interne audits (§2.2.1). In het handboek van Snellio staat die interne audit minimaal één keer per jaar (D.05.02). De auditmap vervangt die niet. Maar je hoeft niet een jaar te wachten om te zien wat er misgaat. Bekijk je de auditmap elke week en pak je rood en oranje op, dan heb je bij de interne en de externe audit weinig verrassingen. En je kunt laten zien dat je afwijkingen hebt gevonden en opgelost. Dat is wat een auditor onder continue verbetering verstaat.

      **Wat het je oplevert:** geen avond meer zoeken naar dat ene kalibratierapport, want je ziet een maand van tevoren wat er gaat verlopen.

      **Benieuwd hoe jouw auditmap eruitziet?** [Vraag een demo aan](/demo).

      ## Het handboek: je kwaliteitssysteem, ook op de werkplek

      ![Handboek in Snellio met de navigatie Op BRL-eis](/blog/brl-100-audit/handboek-op-brl-eis.png)

      Snellio heeft een kwaliteitshandboek gebaseerd op BRL 100 versie 3.0, ingevuld met je eigen bedrijfsgegevens. Monteurs lezen het online en bevestigen per versie dat ze het gelezen hebben. Op de werkorder staat een knop Handboek, zodat de werkinstructies er zijn waar het werk gebeurt.

      Het handboek is ingedeeld naar plan-do-check-act. Een auditor loopt de BRL vaak in volgorde af. Daarom staat er in hoofdstuk 0.3 een kruisverwijzing per BRL-eis, en kun je online wisselen naar de navigatie Op BRL-eis. Dat kwam uit de audit van mijn collega.

      De beleidsverklaring behandelt de punten die §2.2.1 noemt. Kort gezegd: continue verbetering met interne audits, lekkage voorkomen, veilig werken met natuurlijke koudemiddelen en F-gassen, personeel dat de installatiehandleidingen kent, naleving van de regels, de opdrachtgever informeren over de plichten van de exploitant, en vervanging adviseren als een installatie blijft lekken.

      Elke werkinstructie heeft dezelfde opbouw: wanneer je hem toepast, de voorbereiding, de middelen, de uitvoering, het logboek, de normen en de registratie. Zo vraagt §2.5.1 het. Dat was het tweede punt bij mijn collega.

      Een nieuwe versie wordt pas definitief als de directie de beleidsverklaring in Snellio ondertekent. Daarmee laat je zien dat de directie erbij betrokken is. Zonder ondertekening staat de beleidsverklaring in de auditmap op rood.

      Het handboek hoort bij Basis, Pro en Enterprise met jaarbetaling. Stopt dat jaarabonnement, dan kun je het nog 30 dagen lezen.

      **Wat het je oplevert:** vraagt de auditor naar een eis, dan wijs je het hoofdstuk aan in plaats van te bladeren.

      ## Registratie tijdens het werk

      ![Werkbon-PDF van één handeling, met voorbeeldgegevens](/blog/brl-100-audit/werkbon-handeling-pdf.png)

      De registratie begint op de werkbon. Per handeling, zoals koudemiddel toevoegen, koudemiddel aftappen of een koeltechnische handeling, maakt Snellio een eigen PDF. Daarop staan de certificaatnummers van je bedrijf en je monteur en de handtekening van de klant. Bij een drukproef is de hoge druk verplicht, bij vacumeren de einddruk en standtijd. Zonder die waarden kan de bon niet getekend worden.

      Bij brandbare koudemiddelen vraagt BRL 100 versie 3.0 om een taakrisicoanalyse en om het raadplegen van het explosieveiligheidsdocument van de exploitant. Een werkvergunning hoort bij werk in een gevarenzone. Een LMRA is geen wettelijke eis, maar een gangbare laatste check op locatie. In Snellio leg je TRA, werkvergunning en LMRA per werkorder vast in een veiligheidsdossier, met handtekening.

      Valt het werk buiten de F-gascategorie van de monteur, dan geeft Snellio een waarschuwing bij het tekenen.

      ## Logboek per installatie en F-gassenbalans

      ![Logboek van een installatie als PDF, met voorbeeldgegevens](/blog/brl-100-audit/logboek-pdf.png)

      Per installatie zet Snellio alle handelingen uit alle werkorders op volgorde in één logboek. Bovenaan staan de exploitant en het adres, de nominale inhoud, het GWP, het CO2-equivalent, de lekcontrolefrequentie en het lekverlies over de laatste twaalf maanden. Je haalt het op als PDF per installatie, of als bundel per adres. In het klantportaal ziet de exploitant het logboek ook, tenzij je dat uitzet.

      Voor installaties die op lekkage gecontroleerd moeten worden (art. 5 lid 1 van Verordening (EU) 2024/573) houdt de exploitant een register bij (art. 7). BRL 100 vraagt van jou een registratie van elke handeling, per circuit, met aantoonbaar een kopie voor de eigenaar (§2.5.2). Het logboek uit Snellio is die kopie.

      De F-gassenbalans maakt Snellio per kalenderjaar, in kilogram en in CO2-equivalent (§3.3). Pomp je een installatie af en vul je hetzelfde gas terug, kies dan bij koudemiddel toevoegen "hergebruikt en bijgevuld". De balans telt dan alleen wat er netto bij kwam, in plaats van alles als teruggewonnen en opnieuw gevuld. Dat punt kwam uit mijn eigen Kiwa-audit. Daarnaast houdt Snellio per cilinder een flessenkaart bij, in- en uitgaand.

      **Wat het je oplevert:** vraagt een klant of de auditor om het logboek van één installatie, dan heb je het in een paar klikken, compleet en op volgorde.

      ## Directiebeoordeling: de feiten staan al klaar

      Eén keer per jaar beoordeelt de directie hoe het kwaliteitssysteem werkt (§2.2.2). Snellio vult de feiten van het jaar zelf in: werkorders per soort, TRA en LMRA, klachten, meetmiddelen, certificaten van je monteurs, de F-gassenbalans en het lekverlies, installaties die herhaaldelijk lekken, en de interne audit. Jij schrijft per onderdeel je oordeel en je acties voor het volgende jaar, en ondertekent.

      De PDF gaat naar je bedrijfsdocumenten, zodat het punt in de auditmap op groen gaat, en de laatste beoordeling staat bij het hoofdstuk in je handboek. Een jaar later staan je acties bovenaan de nieuwe beoordeling. Snellio meldt 60 dagen van tevoren dat de volgende eraan komt. Opleidingen staan nog niet in Snellio; die vul je zelf in.

      **Wat het je oplevert:** je zoekt de cijfers niet meer bij elkaar uit losse lijstjes, en besteedt je tijd aan het oordeel en de acties.

      ## Overstappen naar Snellio: wat je in de eerste week regelt

      Werk je nu met papier, Excel of een ander pakket? Dit is een haalbaar plan voor je eerste week.

      **Dag 1: je bedrijf en je gegevens.** Vul je bedrijfsgegevens in met je certificaatnummers: BRL 100, BRL 200 en, als je die hebt, B1. Je bestaande klanten, locaties, werkorders en installaties neem je mee via CSV-import of via de API.

      **Dag 2: monteurs en meetmiddelen.** Leg je monteurs vast met hun persoonscertificaat en F-gascategorie. Voeg je meetmiddelen toe met aankoopfactuur en kalibratiedatum.

      **Dag 3: bedrijfsdocumenten.** Upload je KvK-uittreksel, de verklaring dienstverband van je monteurs en, als je die hebt, het verslag van je laatste interne audit.

      **Dag 4: het handboek.** Loop het handboek door, vul de rollen in, zet de eerste versie vast en laat de directie de beleidsverklaring ondertekenen.

      **Dag 5: aan het werk.** Werk je eerste werkorders in Snellio af: werkbon, veiligheidsdossier bij brandbaar koudemiddel, en de installatie vastgelegd met merk, type, koudemiddel en nominale inhoud van het typeplaatje.

      **Daarna:** bekijk de auditmap elke week en pak rood en oranje op. Eén keer per jaar doe je de interne audit en de directiebeoordeling. Voor de externe audit exporteer je de auditmap.

      **Wat Snellio niet doet**

      Snellio doet de audit niet voor je en vervangt je werkwijze niet. Je certificaat krijg je van je certificerende instelling, na de audit, en Snellio kan dat niet garanderen. Jij blijft verantwoordelijk. Snellio legt vast, rekent uit en laat zien waar het niet klopt.

      ## Wat kost het

      De auditmap zit in elk pakket. Het BRL 100-handboek hoort bij Basis, Pro en Enterprise met jaarbetaling. De bedragen staan op de [prijzenpagina](/pricing).

      ## Zelf zien hoe het werkt

      Wil je zien hoe jouw registratie er in de auditmap uitziet? [Vraag een demo aan](/demo) of [neem contact op](/contact). Wat de auditor van je administratie vraagt, lees je bij [BRL 100 software](/brl-100-software). Wat er met versie 3.0 verandert, staat op [BRL 100 versie 3.0](/brl-100-versie-3).

      ## Bronnen

      - [BRL 100 versie 3.0, Rijkswaterstaat, 5 december 2025 (pdf via IPLO)](https://iplo.nl/publish/pages/228185/2025-12-05-brl100-versie-3-0-beveiligd-en-printbaar.pdf): §2.2.1, §2.2.2, §2.5.1, §2.5.2 en §3.3
      - [IPLO, Toelichting overgangsregeling BRL 100 v3.0](https://iplo.nl/thema/lucht/ozon-en-f-gassen/certificering/eisen-ondernemingen-installatiebedrijven/toelichting-overgangsregeling-brl-100-v3-0/)
      - [Verordening (EU) 2024/573, art. 5 en 7](https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32024R0573)
    `,
  },
  {
    slug:        'drukste-zomer-airco-monteur-zonder-administratie-achterstand',
    title:       'Mijn drukste zomer ooit als airco-monteur, en waarom de administratie me niet inhaalde',
    metaTitle:   'Drukste zomer ooit als airco-monteur, zonder administratie-achterstand | Snellio',
    description: 'Hoe een airco-monteur zijn drukste zomer draaide met WhatsApp-aanvragen, een AI-assistent, werkbonnen op de telefoon en F-gassenregistratie volgens BRL 100 versie 3.0. Zonder avonden aan de keukentafel.',
    category:    'Praktijk',
    date:        '7 september 2026',
    dateISO:     '2026-09-07',
    dateModifiedISO: '2026-09-16',
    readTime:    '6 min',
    schemaType:  'Article',
    tags:        ['werkbon app', 'f-gassen registratie', 'planning installateur', 'airco monteur software', 'whatsapp aanvragen', 'koudemiddel registratie'],
    author: {
      name: 'Rudy Snel',
      bio:  "Rudy Snel is BRL 100 en STEK gecertificeerd airco- en warmtepompmonteur (Snel Airco's, Harskamp) en bouwer van Snellio. Hij gebruikt Snellio dagelijks in zijn eigen bus.",
    },
    // OG-afbeelding = eerste screenshot; staat ook inline in de tekst, dus
    // niet als header. Bestanden staan in /public/blog/zomer-2026/.
    image: {
      src:    '/blog/zomer-2026/weekplanning-zomer.png',
      alt:    'Weekplanning van een airco-monteur in Snellio met drie klussen per dag',
      width:  1200,
      height: 900,
      showAsHeader: false,
    },
    faq: [
      { question: 'Werkt Snellio ook als ik geen WhatsApp-nummer voor aanvragen heb?',
        answer:   'Ja. WhatsApp is een optie die je zelf aanzet. Aanvragen via mail of je website komen op dezelfde plek terecht.' },
      { question: 'Is de F-gassenregistratie in Snellio geschikt voor de BRL 100 audit?',
        answer:   'Ja. Registratie per fles en per installatie, met handelingen, hoeveelheden en datum, volgens BRL 100 versie 3.0. Het logboek is per installatie te tonen aan de auditor.' },
      { question: 'Moet ik een creditcard of incassomachtiging afgeven om te proberen?',
        answer:   'Nee. De proefperiode van 14 dagen vraagt geen betaalgegevens. Na afloop kies je zelf: per maand of per jaar, via iDEAL-factuur of automatische incasso.' },
      { question: 'Kan ik mijn bestaande klanten en installaties importeren?',
        answer:   'Ja, via een import of via de API. Neem contact op als je hulp wilt bij de overstap.' },
    ],
    content:     `
      De zomer van 2026 was de drukste die ik als monteur heb gedraaid. Meer aanvragen dan ooit, dagen met drie klussen achter elkaar, en 's avonds nog plannen voor de volgende dag. Andere jaren betekende dat: keukentafel, iPad, en tot laat werkbonnen en facturen bijwerken. Dit jaar niet. Ik heb de hele zomer met Snellio gewerkt, de software die ik zelf heb gebouwd omdat ik het als monteur zat was om tweemaal hetzelfde in te typen. Dit is hoe dat in de praktijk ging.

      ![Weekplanning van een airco-monteur in Snellio met drie klussen per dag](/blog/zomer-2026/weekplanning-zomer.png)

      ## Aanvragen via WhatsApp, beantwoord binnen enkele minuten

      Op mijn website stuur ik aanvragen naar een apart WhatsApp-nummer. Op dat nummer draait een AI-assistent die de eerste vragen van klanten beantwoordt. Geen prijzen uit zichzelf, wel: wat voor installatie is het, waar staat hij, wat is het adres en de postcode. Klanten kregen binnen minuten antwoord, ook als ik met mijn handen in een buitenunit zat.

      Het resultaat: ruim 300 werkorders aangemaakt en ruim 240 nieuwe klanten deze zomer via WhatsApp, waarvan het grootste deel al compleet was met adres en installatiegegevens voordat ik er zelf naar keek.

      ![AI-assistent in Snellio vraagt via WhatsApp het adres en type installatie uit](/blog/zomer-2026/whatsapp-assistent.png)

      ## 's Avonds plannen, de klant drukt zelf op akkoord

      Omdat de gegevens al binnen waren, kostte plannen 's avonds een paar minuten per klant. Ik zet een [planningsvoorstel](/planningssoftware-monteurs) klaar, de klant krijgt een mail met drie knoppen: akkoord, afwijzen of een ander moment. Drukt hij op akkoord, dan staat de afspraak groen in mijn eigen Google Agenda. Blijft hij oranje, dan weet ik dat ik een andere datum moet voorstellen. Geen belrondes meer, geen "ik kom er nog op terug".

      Zo heb ik deze zomer heel veel klanten blij gemaakt met een afspraak binnen een paar dagen, zonder dat ik daar overdag tijd aan kwijt was.

      ## Werkbon op de telefoon, tussen de handelingen door

      Wat ik vroeger aan de keukentafel deed met een iPad, doe ik nu op mijn telefoon terwijl ik bij de klant sta. De klantgegevens zaten al in Snellio vanaf het plannen, dus bij aankomst open ik de [werkbon](/werkbon-software) en vul ik de handelingen in: inbedrijfstelling, onderhoudsrapport, koudemiddel. Tussen het vacumeren en het opstarten door, niet erna.

      ![Dagplanning van een airco-monteur in Snellio op de telefoon, met vier afspraken op een donderdag in augustus](/blog/zomer-2026/dagplanning-telefoon.png)

      ## Handtekening, kosten en factuur in één beweging

      Klaar op locatie? Dan laat ik de klant tekenen op mijn telefoon en zet ik in de opmerkingen meteen de kosten van de klus. De klant weet waar hij aan toe is en ik heb zijn handtekening eronder. Heb ik tijd, dan maak ik de factuur nog in de bus. Meestal doe ik het thuis. Dat kan, want een getekende werkbon zonder factuur blijft in een lijst staan totdat de factuur eraan hangt. Je raakt er geen één meer kwijt, en de klant krijgt altijd zijn factuur.

      ![Getekende werkbon in Snellio met kosten van de klus in de opmerkingen](/blog/zomer-2026/werkbon-ondertekend.png)

      ## Betaald via iDEAL, vaak binnen een uur

      Facturen gaan de deur uit met een betaallink via Mollie en een duidelijke omschrijving. Wat me verbaasde: klanten betalen vaak direct nadat ze de mail hebben geopend. Betaalt iemand niet, dan volgt vanzelf een herinnering, en dan wordt er alsnog betaald. Vaak met een excuus erbij. Ik heb deze zomer geen enkele factuur hoeven nabellen.

      ## Kenplaat printen met QR-code naar het digitale logboek

      Nieuw dit jaar is mijn kenplaatprinter. Zodra ik een installatie in Snellio heb ingevoerd, staat er een kenplaat klaar als bijlage. Uitprinten, op de unit plakken, klaar. Op de plaat staat een QR-code naar het digitale logboek van die installatie: geen persoonsgegevens, alleen de installatie en alle handelingen uit het verleden.

      Kom ik later terug voor een storing en is er nog geen werkorder aangemaakt, dan scan ik de QR-code en heb ik direct een nieuwe werkorder aan die installatie hangen. Zo simpel is het.

      ## Koudemiddel registreren volgens BRL 100 versie 3.0, zonder de nominale inhoud te vergeten

      Koudemiddel wordt uiteraard netjes geregistreerd, per fles en per installatie, volgens BRL 100 versie 3.0. Maar er is één fout die ik zelf jarenlang maakte. Bij een nieuwe installatie voer je aan het begin de gegevens van de kenplaat in, inclusief de fabrieksvulling. Vul je aan het eind nog 100 gram bij voor vijf meter extra leiding, dan noteer je dat wel op de fles. Maar de nominale inhoud in de stamgegevens van de installatie? Die staat dan nog steeds op de fabrieksvulling.

      Dat gebeurt je met Snellio niet meer. Vul je bij een nieuwe installatie koudemiddel bij, dan controleert het programma bij het opslaan van de werkorder of de voorvulling en de nominale inhoud nog gelijk zijn. Is dat zo, dan vraagt het of de nominale vulling aangepast moet worden. Eén klik, en je [F-gassenregistratie](/f-gassen-registratie) klopt.

      ## Foto's maken, rapport laten schrijven

      Kom ik bij een klant met veel werk tegelijk, zeg een lekkage, een knik in de koelleiding, elektra die niet is afgewerkt en materiaal dat ik moet leveren, dan open ik een nieuw gesprek met de AI-assistent en maak ik foto's van alles wat ik tegenkom. Bij elke foto een paar woorden: "knik in de koelleiding", "kenplaat". De assistent ziet wat er op de foto staat en schrijft er een technisch kloppend verhaal bij.

      Na het repareren en aansluiten maak ik een eindfoto, zet ik de klantgegevens erbij en vraag ik om een PDF-rapport met de foto's. Alles wat ik heb gefotografeerd en toegelicht staat uitgebreid in dat koeltechnisch rapport. Opslaan, als bijlage aan de handeling hangen, klaar. Een rapport waar ik vroeger een avond op zat, is nu een bijproduct van het werk zelf.

      ## Het dashboard: wat staat er open, wat zit er in de flessen

      Naast het dagelijkse werk zit er een dashboard in waarop ik in één oogopslag zie welke orders nog open staan, hoeveel koudemiddel er nog per fles in de bus ligt, en wat de forecast is van de komende jaarlijkse onderhoudsbeurten en keuringen. Dat laatste is stiekem het belangrijkste: ik weet nu in september al hoe de winter eruitziet.

      ## Kortom

      Ik heb het deze zomer bijzonder druk gehad. Maar aanvragen, planning, werkbonnen, facturen en registratie liepen zo vanzelf dat ik eigenlijk uitkijk naar de volgende drukke periode. Niet omdat ik van werken houd, dat ook, maar omdat het werk nu ophoudt als ik de bus dichtdoe.

      Snellio is gebouwd door een monteur voor monteurs. Alles wat hierboven staat gebruik ik zelf, elke dag, in mijn eigen bus. Wil je het zien? [Probeer het 14 dagen gratis](/crm-voor-installateurs), zonder creditcard en zonder incassomachtiging.
    `,
  },
  {
    slug:        'digitaal-logboek-qr-kenplaat',
    title:       'De kenplaat wordt digitaal: het F-gas logboek achter een QR-code',
    description: 'Snellio print kenplaten met de velden uit art. 12 en een QR-code. Wie de code scant, opent het digitale logboek van de installatie: specificaties én volledige werk-historie, direct bij het apparaat.',
    category:    'Product',
    date:        '20 juli 2026',
    dateISO:     '2026-07-20',
    dateModifiedISO: '2026-09-16',
    readTime:    '4 min',
    image: {
      src:     '/kenplaat-voorbeeld.png',
      alt:     'Kenplaat van een koelinstallatie geprint vanuit Snellio, met de velden uit art. 12 van Verordening (EU) 2024/573 (koudemiddel, GWP, nominale vulling, CO₂-equivalent) en een QR-code naar het digitale logboek',
      caption: 'Zo komt de kenplaat uit de printer: de velden uit art. 12 van Verordening (EU) 2024/573 en een QR-code naar het digitale logboek.',
      width:   1400,
      height:  933,
    },
    content:     `
      Elke koelinstallatie hoort een kenplaat en een logboek te hebben. De kenplaat vertelt wat er in de installatie
      zit, het logboek vertelt wat ermee gebeurd is. In de praktijk is de kenplaat vaak handgeschreven en ligt het
      logboek als map op kantoor of als Excel-bestand op een server, kilometers verwijderd van de installatie waar
      een monteur er iets aan zou hebben. Snellio brengt die twee nu samen: een geprinte kenplaat met een QR-code
      die het digitale logboek opent, precies daar waar het hoort: bij de installatie zelf.

      **Hoe het werkt**

      Vanuit het installatiedossier in Snellio print u met één klik een kenplaat op een kenplaatprinter
      (126 × 84 mm label). De plaat bevat de velden uit art. 12 van de verordening (koudemiddel, GWP, vulling in
      kilogram en CO₂-equivalent, de zin over gefluoreerde broeikasgassen) en daarnaast: installatie-identificatienummer,
      leverancier, type, datum laatste controle, uw BRL 100-nummer en het BRL 200-nummer van de monteur. Bij natuurlijke
      koudemiddelen zoals R290 of CO₂ blijft de zin over gefluoreerde broeikasgassen terecht achterwege.

      Rechts op de plaat staat een QR-code. Wie die scant, met welke telefoon dan ook, opent het digitale logboek
      van precies deze installatie.

      **Wat er in het digitale logboek staat**

      Het logboek toont de specificaties van de installatie en de volledige werk-historie: elke vulling of aftapping
      met datum en hoeveelheid, uitgevoerde handelingen zoals lektesten, en aanvullende logboekregels. Die historie
      vult zichzelf: elke [werkbon](/werkbon-software) en elke [F-gas registratie](/f-gassen-registratie) die uw
      monteurs in Snellio vastleggen, verschijnt automatisch in het logboek van de bijbehorende installatie. Er is
      geen aparte administratie, het logboek is een ander venster op dezelfde data.

      Belangrijk detail: het logboek is bewust publiek leesbaar zonder klantgegevens. Een scanner ziet de techniek,
      de specificaties en de historie, maar geen namen, adressen of prijzen. Alleen de eigenaar kan, ingelogd,
      regels toevoegen.

      **Waarom dit handig is**

      - **Voor uw monteurs**: bij een storing scant de monteur de plaat en ziet direct wat er ooit aan de
        installatie is gedaan, ook door collega's. Geen telefoontjes naar kantoor, geen zoeken in mappen.
      - **Voor inspecties en audits**: art. 7 van Verordening (EU) 2024/573 verplicht een register per apparaat boven
        de drempel uit art. 5; BRL 100 vraagt een werkregistratie per handeling voor elke installatie. Met de QR-code
        laat u een inspecteur ter plekke het complete logboek zien.
      - **Voor collega-bedrijven en beheerders**: neemt een ander bedrijf het onderhoud over, of wil een
        gebouwbeheerder weten wat er hangt, dan staat alle informatie op de plaat en achter de QR-code.
      - **Voor de uitstraling**: een strak geprinte kenplaat met uw bedrijfsnaam oogt professioneler dan een
        handgeschreven sticker, en hij blijft leesbaar.

      **Zelf kenplaten printen**

      De functie staat voor alle Snellio-gebruikers klaar. Heeft u een kenplaatprinter, dan print u de plaat
      direct vanuit het installatiedossier; het digitale logboek en de QR-code werken vanaf dat moment meteen.
      Bekijk alle mogelijkheden op de [functiepagina](/features) of probeer het zelf met een
      [gratis proefperiode van 14 dagen](/registreren).
    `,
  },
  {
    slug:        'brl100-uitgelegd',
    title:       'BRL 100 uitgelegd: wat moet u registreren per werkorder?',
    description: 'Een praktische gids over BRL 100-eisen en hoe Snellio dit automatiseert voor HVAC-installateurs.',
    category:    'Regelgeving',
    date:        '15 januari 2025',
    dateISO:     '2025-01-15',
    dateModifiedISO: '2026-09-16',
    readTime:    '5 min',
    content:     `
      De BRL 100-certificering stelt eisen aan de registratie van alle koeltechnische handelingen.
      Voor iedere werkorder waarbij u koudemiddelen aanraakt, bent u verplicht bepaalde gegevens vast te leggen.

      **Wat moet u registreren?**

      Per werkorder dient u minimaal vast te leggen (BRL 100 §2.5.2):
      - Type installatie en koudemiddel
      - Bij wie en wanneer: onderneming en persoon met certificaatnummer (art. 7 lid 1 onder e)
      - Begin- en eindmetingen (druk en temperatuur)
      - Lektest resultaat
      - Vacuümwaarden en standtijd
      - Hoeveelheid koudemiddel bijgevuld of afgetapt
      - Handtekening installateur en klant

      **Hoe Snellio dit oplost**

      Snellio legt elke koeltechnische handeling die u op de werkbon invult vast als werkregistratie per installatie en
      per circuit, zoals BRL 100 §2.5.2 vraagt, en zet de koudemiddelboeking in de F-gassenbalans. U hoeft niets over te
      nemen. Wat de auditor precies toetst, staat in
      [BRL 100: wat de auditor van je administratie vraagt](/brl-100-software). Lees meer over de
      [digitale werkbon-software](/werkbon-software) of bekijk hoe de [F-gassen registratie](/f-gassen-registratie)
      hierop aansluit.
    `,
  },
  {
    slug:        'f-gas-verordening-2024',
    title:       'EU F-gas verordening 2024/573: wat verandert er voor u?',
    description: 'De nieuwe Europese F-gassenverordening (EU) 2024/573 vervangt 517/2014. Een praktisch overzicht van de belangrijkste wijzigingen, GWP-verboden en certificeringseisen voor koeltechnisch installateurs.',
    category:    'Regelgeving',
    date:        '8 januari 2025',
    dateISO:     '2025-01-08',
    dateModifiedISO: '2026-09-16',
    readTime:    '7 min',
    content:     `
      Op 11 maart 2024 is de nieuwe Europese F-gassenverordening (EU) 2024/573 in werking getreden. Deze verordening
      vervangt de oude verordening (EU) 517/2014 en scherpt de eisen voor het werken met gefluoreerde broeikasgassen
      flink aan. Voor koeltechnisch installateurs verandert er de komende jaren veel, zowel op het gebied van toegestane
      koudemiddelen als op het gebied van certificering.

      **Drie grote lijnen**

      De verordening rust op drie pijlers:
      - Het in stappen versneld terugbrengen van de hoeveelheid F-gassen die op de Europese markt mag worden gebracht (HFK-quota).
      - Een reeks verboden op het op de markt brengen van producten en apparatuur die F-gassen met een hoog GWP bevatten.
      - Installaties lekdicht bouwen en houden, met sluitende registratie van alle handelingen.

      **Bijvulverboden per type apparatuur (art. 13)**

      - Koelapparatuur: sinds 1 januari 2025 mag u geen F-gas met een GWP van 2 500 of meer meer gebruiken voor onderhoud
        of service. Geregenereerd of gerecycled gas met zo'n GWP mag nog tot 1 januari 2030, onder voorwaarden.
      - Airco's en warmtepompen: hetzelfde verbod sinds 1 januari 2026, met de uitzondering voor geregenereerd of
        gerecycled gas tot 1 januari 2032.
      - Stationaire koelapparatuur, behalve chillers: vanaf 1 januari 2032 ook geen F-gas met een GWP van 750 of meer
        voor onderhoud of service; geregenereerd of gerecycled gas blijft toegestaan.
      - Voor nieuwe apparatuur gelden aparte marktverboden met lagere GWP-grenzen (bijlage IV); die staan niet in dit
        artikel.

      **Certificering uitgebreid naar natuurlijke koudemiddelen**

      Een van de belangrijkste wijzigingen voor monteurs: de certificeringsplicht geldt niet langer alleen voor F-gassen,
      maar ook voor natuurlijke alternatieven zoals koolwaterstoffen (propaan, isobutaan), CO₂ en ammoniak. In Nederland
      is dat uitgewerkt in BRL 100 versie 3.0, met deelgebied I voor F-gassen en koolwaterstoffen, II voor CO₂ en III
      voor ammoniak, formeel in werking sinds 31 augustus 2026.

      **Wat betekent dit concreet voor uw administratie?**

      De verplichting om elke handeling met koudemiddelen nauwkeurig vast te leggen wordt belangrijker dan ooit. Bij een
      inspectie moet u per installatie kunnen aantonen welk koudemiddel is gebruikt, hoeveel is bijgevuld of afgetapt,
      wanneer de laatste lektest is uitgevoerd en met welk resultaat. Een onvolledig of verouderd logboek is een reëel risico.

      **Hoe Snellio u helpt**

      Snellio houdt automatisch de koudemiddelbalans per installatie en per fles bij, signaleert verlopende ijkdata van
      lekdetectoren en registreert elke F-gas handeling direct vanuit de werkbon. De F-gassenbalans en het logboek per
      installatie zijn actueel en exporteerbaar, zodat u bij een audit het register uit art. 7 en de werkregistratie uit
      BRL 100 kunt tonen. Bekijk de mogelijkheden op de pagina over
      [F-gassen registratie](/f-gassen-registratie).

      Let op: dit artikel is een praktische samenvatting en geen juridisch advies. Raadpleeg voor uw specifieke situatie
      altijd de officiële verordeningstekst of uw certificerende instantie.
    `,
  },
  {
    slug:        'digitale-werkbon-voordelen',
    title:       '5 redenen waarom een digitale werkbon uw bedrijf efficiënter maakt',
    description: 'Van snellere facturatie tot minder papierwerk. We lichten toe wat een digitale werkbon concreet oplevert voor installateurs in de koeltechniek en HVAC.',
    category:    'Efficiëntie',
    date:        '20 december 2024',
    dateISO:     '2024-12-20',
    dateModifiedISO: '2026-09-16',
    readTime:    '4 min',
    content:     `
      Veel installatiebedrijven werken nog met papieren werkbonnen of losse Word-documenten. Dat voelt vertrouwd, maar
      het kost onzichtbaar veel tijd: bonnen raken kwijt, handschriften zijn onleesbaar, en tussen het afronden van de
      klus en het versturen van de factuur zitten soms weken. Een digitale werkbon lost precies die knelpunten op.
      Dit zijn de vijf grootste voordelen voor installateurs.

      **1. De klant tekent ter plaatse, de werkbon is direct compleet**

      Met een digitale werkbon rondt de monteur de klus af op locatie: werkzaamheden, gebruikte materialen, foto's en de
      handtekening van de klant staan er meteen op. Geen bon meer die eerst mee terug naar kantoor moet, geen discussie
      achteraf over wat er is afgesproken. De klant ontvangt direct een nette PDF per e-mail.

      **2. Factureren op de dag van de klus in plaats van weken later**

      Omdat de werkbon digitaal en compleet is, kan er direct een factuur van worden gemaakt. Bedrijven die overstappen
      op een digitale werkbon zien hun betaaltermijn fors korter worden: de factuur is de deur uit terwijl de klus nog
      vers in het geheugen zit. In Snellio maakt u met één klik een factuur vanuit de werkbon, inclusief iDEAL-betaallink.

      **3. BRL 100 en F-gassen registratie zonder dubbel werk**

      Voor koeltechnisch installateurs is dit misschien wel het grootste voordeel: de gegevens die u toch al op de
      werkbon vastlegt (metingen, lektest, koudemiddel bijgevuld of afgetapt) vormen automatisch de werkregistratie die
      BRL 100 vraagt en het logboek per installatie. Geen aparte administratie meer die u 's avonds moet bijwerken. Lees hoe
      dat werkt bij de [F-gassen registratie](/f-gassen-registratie).

      **4. Alle historie per klant en per installatie terugvindbaar**

      Een papieren bon verdwijnt in een ordner. Een digitale werkbon hangt aan de klant én aan de installatie. Komt er
      een storing binnen, dan ziet u in seconden welke monteur er vorig jaar is geweest, wat er toen is gedaan en welk
      koudemiddel erin zit. Dat scheelt telefoontjes, zoekwerk en onnodige ritten.

      **5. Minder fouten, professioneler naar de klant**

      Verplichte velden voorkomen dat een monteur iets vergeet in te vullen. De klant krijgt een verzorgde PDF met uw
      logo in plaats van een doorslag met koffievlek. Kleine dingen, maar samen bepalen ze hoe professioneel uw bedrijf
      overkomt, zeker bij zakelijke opdrachtgevers en beheerders.

      **Overstappen is kleiner dan u denkt**

      De overstap van papier naar digitaal klinkt als een project, maar in de praktijk staat een bedrijf met een paar
      monteurs binnen een middag ingericht. Bekijk de [werkbon-software van Snellio](/werkbon-software), de
      [planning voor monteurs](/planningssoftware-monteurs) die erop aansluit, of probeer het gewoon
      [14 dagen gratis](/registreren) met uw eigen klanten en werkorders.
    `,
  },
]

// Concepten vallen er in productie uit; index, artikelpagina en sitemap lezen
// allemaal deze lijst.
export const POSTS: Post[] = ALLE_POSTS.filter(p => !p.draft || process.env.NODE_ENV !== 'production')

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}
