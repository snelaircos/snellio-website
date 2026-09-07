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
}

// Content-notatie, aanvullend op **vet** en [tekst](/pad):
//   ## Kop            → <h2>
//   ![alt](/pad.png)  → <figure><img loading="lazy"> — alleen gerenderd als
//                       het bestand in /public bestaat, anders niets (geen
//                       kapotte afbeelding, geen placeholder).

export const POSTS: Post[] = [
  {
    slug:        'drukste-zomer-airco-monteur-zonder-administratie-achterstand',
    title:       'Mijn drukste zomer ooit als airco-monteur, en waarom de administratie me niet inhaalde',
    metaTitle:   'Drukste zomer ooit als airco-monteur, zonder administratie-achterstand | Snellio',
    description: 'Hoe een airco-monteur zijn drukste zomer draaide met WhatsApp-aanvragen, een AI-assistent, werkbonnen op de telefoon en F-gassenregistratie volgens BRL-100 v3.0. Zonder avonden aan de keukentafel.',
    category:    'Praktijk',
    date:        '7 september 2026',
    dateISO:     '2026-09-07',
    readTime:    '6 min',
    schemaType:  'Article',
    tags:        ['werkbon app', 'f-gassen registratie', 'planning installateur', 'airco monteur software', 'whatsapp aanvragen', 'koudemiddel registratie'],
    author: {
      name: 'Rudy Snel',
      bio:  "Rudy Snel is BRL-100 en STEK gecertificeerd airco- en warmtepompmonteur (Snel Airco's, Harskamp) en bouwer van Snellio. Hij gebruikt Snellio dagelijks in zijn eigen bus.",
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
      { question: 'Is de F-gassenregistratie in Snellio geschikt voor de BRL-100 audit?',
        answer:   'Ja. Registratie per fles en per installatie, met handelingen, hoeveelheden en datum, volgens BRL-100 versie 3.0. Het logboek is per installatie te tonen aan de auditor.' },
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

      ## Koudemiddel registreren volgens BRL-100 v3.0, zonder de nominale inhoud te vergeten

      Koudemiddel wordt uiteraard netjes geregistreerd, per fles en per installatie, volgens BRL-100 versie 3.0. Maar er is één fout die ik zelf jarenlang maakte. Bij een nieuwe installatie voer je aan het begin de gegevens van de kenplaat in, inclusief de fabrieksvulling. Vul je aan het eind nog 100 gram bij voor vijf meter extra leiding, dan noteer je dat wel op de fles. Maar de nominale inhoud in de stamgegevens van de installatie? Die staat dan nog steeds op de fabrieksvulling.

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
    description: 'Snellio print BRL100-conforme kenplaten met QR-code. Wie de code scant, opent het digitale logboek van de installatie: specificaties én volledige werk-historie, direct bij het apparaat.',
    category:    'Product',
    date:        '20 juli 2026',
    dateISO:     '2026-07-20',
    readTime:    '4 min',
    image: {
      src:     '/kenplaat-voorbeeld.png',
      alt:     'BRL100-conforme kenplaat koelinstallatie geprint vanuit Snellio, met koudemiddel, GWP, nominale vulling, CO2-equivalent en QR-code naar het digitale logboek',
      caption: 'Zo komt de kenplaat uit de printer: alle verplichte velden, plus een QR-code naar het digitale logboek.',
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
      (126 × 84 mm label). De plaat bevat alle velden die de BRL100 voorschrijft: het
      installatie-identificatienummer, de leverancier, het type koelinstallatie, het koudemiddel met GWP-waarde,
      de nominale vulling, het totale CO2-equivalent en de datum van de laatste controle. Ook uw BRL-100-nummer en
      het BRL-200-nummer van de monteur staan erop. Bevat de installatie een F-gas, dan zet Snellio automatisch de
      verplichte zin over gefluoreerde broeikasgassen op de plaat; bij natuurlijke koudemiddelen zoals R290 of CO2
      blijft die terecht achterwege.

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
      - **Voor inspecties en audits**: de EU F-gas verordening 2024/573 verplicht een sluitende registratie per
        installatie. Met de QR-code laat u een inspecteur ter plekke het complete logboek zien.
      - **Voor collega-bedrijven en beheerders**: neemt een ander bedrijf het onderhoud over, of wil een
        gebouwbeheerder weten wat er hangt, dan staat alle informatie op de plaat en achter de QR-code.
      - **Voor de uitstraling**: een strak geprinte kenplaat met uw bedrijfsnaam oogt professioneler dan een
        handgeschreven sticker, en hij blijft leesbaar.

      **Zelf kenplaten printen**

      De functie staat voor alle Snellio-gebruikers klaar. Heeft u een kenplaatprinter, dan print u de plaat
      direct vanuit het installatiedossier; het digitale logboek en de QR-code werken vanaf dat moment meteen.
      Bekijk alle mogelijkheden op de [functiepagina](/features) of probeer het zelf met een
      [gratis proefperiode van 14 dagen](/checkout).
    `,
  },
  {
    slug:        'brl100-uitgelegd',
    title:       'BRL100 uitgelegd: wat moet u registreren per werkorder?',
    description: 'Een praktische gids over BRL100-eisen en hoe Snellio dit automatiseert voor HVAC-installateurs.',
    category:    'Regelgeving',
    date:        '15 januari 2025',
    dateISO:     '2025-01-15',
    readTime:    '5 min',
    content:     `
      De BRL100-certificering stelt eisen aan de registratie van alle koeltechnische handelingen.
      Voor iedere werkorder waarbij u koudemiddelen aanraakt, bent u verplicht bepaalde gegevens vast te leggen.

      **Wat moet u registreren?**

      Per werkorder dient u minimaal vast te leggen:
      - Type installatie en koudemiddel
      - Begin- en eindmetingen (druk en temperatuur)
      - Lektest resultaat
      - Vacuümwaarden en standtijd
      - Hoeveelheid koudemiddel bijgevuld of afgetapt
      - Handtekening installateur en klant

      **Hoe Snellio dit oplost**

      Snellio genereert automatisch een BRL100-compliant rapport op basis van de koeltechnische handelingen die u invoert.
      U hoeft niets handmatig over te nemen, het systeem verzorgt de juiste lay-out en veldvolgorde. Lees meer over de
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

      **Strengere GWP-grenzen en bijvulverboden**

      De Global Warming Potential (GWP) van een koudemiddel bepaalt steeds vaker of u het nog mag gebruiken:
      - Vanaf 1 januari 2026 geldt een verbod op het bijvullen van koel- en klimaatapparatuur met nieuw geproduceerd
        koudemiddel met een GWP van 2500 of hoger. Geregenereerd of gerecycled koudemiddel met een GWP ≥ 2500 mag nog
        tot 1 januari 2032 worden gebruikt voor onderhoud en reparatie.
      - Voor veel nieuwe apparatuur worden de maximale GWP-grenzen verlaagd naar 750 of zelfs 150. Split-units onder
        12 kW lopen op termijn tegen een volledig F-gasverbod aan.
      - Vanaf 1 januari 2032 geldt voor de meeste koelapparatuur (met uitzondering van chillers) een verbod op nieuw
        koudemiddel met een GWP van 750 of hoger.

      **Certificering uitgebreid naar natuurlijke koudemiddelen**

      Een van de belangrijkste wijzigingen voor monteurs: de certificeringsplicht geldt niet langer alleen voor F-gassen,
      maar ook voor natuurlijke alternatieven zoals koolwaterstoffen (propaan, isobutaan), CO₂ en ammoniak.
      - Vanaf 29 september 2025 moeten monteurs die met deze natuurlijke koudemiddelen werken eveneens gecertificeerd zijn.
      - De overgangsperiode voor de bestaande certificaten loopt tot 29 maart 2026; daarna worden alleen nog certificaten
        volgens het nieuwe, gecombineerde schema afgegeven.
      - Uiterlijk 12 maart 2029 moeten alle installateurs gecertificeerd zijn volgens het nieuwe systeem.

      **Wat betekent dit concreet voor uw administratie?**

      De verplichting om elke handeling met koudemiddelen nauwkeurig vast te leggen wordt belangrijker dan ooit. Bij een
      inspectie moet u per installatie kunnen aantonen welk koudemiddel is gebruikt, hoeveel is bijgevuld of afgetapt,
      wanneer de laatste lektest is uitgevoerd en met welk resultaat. Een onvolledig of verouderd logboek is een reëel risico.

      **Hoe Snellio u helpt**

      Snellio houdt automatisch de koudemiddelbalans per installatie en per fles bij, signaleert verlopende ijkdata van
      lekdetectoren en registreert elke F-gas handeling direct vanuit de werkbon. De jaarrapportage en het volledige
      logboek zijn altijd actueel en direct exporteerbaar, zodat u bij een audit binnen enkele minuten alle documentatie
      conform EU F-gas Verordening 2024/573 kunt overleggen. Bekijk de mogelijkheden op de pagina over
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

      **3. BRL100 en F-gassen registratie zonder dubbel werk**

      Voor koeltechnisch installateurs is dit misschien wel het grootste voordeel: de gegevens die u toch al op de
      werkbon vastlegt (metingen, lektest, koudemiddel bijgevuld of afgetapt) vormen automatisch de basis voor het
      BRL100-rapport en het koudemiddellogboek. Geen aparte administratie meer die u 's avonds moet bijwerken. Lees hoe
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

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}
