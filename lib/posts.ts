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
}

export const POSTS: Post[] = [
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
