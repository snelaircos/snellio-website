# SEO/GEO-contentplan snellio.nl

Dit is het werkdossier voor de content die snellio.nl vindbaar en citeerbaar moet
maken in Google, Google AI Overview, ChatGPT, Perplexity en Claude. Alles hier is
op 14 september 2026 geverifieerd met primaire bronnen (wetteksten, Rijkswaterstaat,
RVO) en live zoekdata (DataForSEO, Nederland, nl). Zie per bestand de bronnen.

## Hoe je dit met Claude Code gebruikt

Geef Claude Code één taak per keer en verwijs naar het bestand:

```
Lees docs/seo-geo/00-README.md en docs/seo-geo/01-juridische-basis.md.
Bouw daarna docs/seo-geo/04-pagina-brl-100-software.md als
app/brl-100-software/page.tsx. Gebruik de bestaande componenten en
lib/schemas.ts. Claim alleen features die in
docs/seo-geo/02-feature-factcheck.md als "bevestigd" staan.
```

Volgorde van uitvoeren staat hieronder onder "Do these three first".
De `CLAUDE.md` in de root herhaalt de harde regels; die laadt Claude Code
automatisch.

## Bestanden

| Bestand | Inhoud | Gebruik |
| --- | --- | --- |
| `01-juridische-basis.md` | Geverifieerde feiten over Verordening (EU) 2024/573, BRL 100 v3.0, overgangsregeling, Arbobesluit, kenplaat, R290 | Lees vóór elke tekst over wet- en regelgeving. Nooit van afwijken zonder nieuwe bron. |
| `02-feature-factcheck.md` | Welke Snellio-functies op de site geclaimd worden, met bewijs, en wat vóór publicatie in de app bevestigd moet worden | Vul de kolom "Bevestigd in app" in voordat je een pagina bouwt. |
| `03-pillar-verbeterplan.md` | Verbeterplan voor `/software-voor-installatiebedrijven`: behouden, verwijderen, inkorten, toevoegen, nieuwe headingstructuur | Taak 3. |
| `04-pagina-brl-100-software.md` | Volledige tekst, metadata, schema en interne links voor de nieuwe pagina `/brl-100-software` | Taak 2. Tekst is publicatieklaar na de feature-check. |
| `05-vergelijkingspagina.md` | Structuur en geverifieerde prijstabel voor `/vergelijken/software-koeltechniek` | Later, na taak 2 en 3. |
| `06-schema-entity.md` | Implementatieplan voor auteurspagina, Person, Organization, sameAs, datums, Article, FAQ, screenshots, interne links | Hoort bij taak 2 en 3. |
| `07-zoekdata.md` | Zoekvolumes, KD, CPC, intentie en huidige rankings per term | Referentie bij titels, H1's en interne links. |
| `08-pagina-f-gassen-registratie.md` | Volledige tekst, metadata, schema, verwijderlijst en FAQ voor het uitbreiden van `/f-gassen-registratie` | Taak 4, live sinds `77eee43`. |
| `09-sitewide-sweep.md` | FAQ-component naar `<details>`, claims op `/features` en `/`, naamgeving BRL 100, `llms.txt`, opruimen | Taak 5, live sinds `c634346`. |
| `10-pagina-werkbon-software.md` | Zoekdata, SERP, verwijderlijst, volledige tekst, FAQ en bronnen voor het herpositioneren van `/werkbon-software` op "werkbon app" | Taak 6. |
| `11-homepage.md` | Nieuwe sectievolgorde van de homepage (founder-blok vóór de prijzen), compacter founder-blok met link naar de auteurspagina, afwerking per sectie | Taak 7, na taak 6. |

## Contentarchitectuur (maximaal 6 pagina's)

Eén intentie per URL. Twee pagina's bestaan al en houden hun URL, want
`/f-gassen-registratie` heeft de enige relevante positie die Snellio heeft
(#5 voor "f-gassen logboek", 14 september 2026).

| # | URL | Status | Primaire term (vol/KD/CPC) | Intentie | Prioriteit |
| --- | --- | --- | --- | --- | --- |
| 1 | `/software-voor-installatiebedrijven` | Bestaand, verbeteren | software voor installatiebedrijven (140 / 0 / €27,02) | Commercieel | 5 |
| 2 | `/brl-100-software` | Nieuw | brl 100 (590 / 9 / €5,52) | Informatief, commerciële staart | 5 |
| 3 | `/f-gassen-registratie` | Bestaand, uitbreiden | f-gassen logboek (geen indexdata, wel positie #5) | Informatief | 4 |
| 4 | `/werkbon-software` | Bestaand, herpositioneren | werkbon app (320 / 10 / €18,47) | Navigatie, transactioneel | 3 |
| 5 | `/veilig-werken-met-r290` | Nieuw, wachten op feature-bevestiging | veilig werken met r290 (geen indexdata) | Informatief | 2 |
| 6 | `/vergelijken/software-koeltechniek` | Nieuw | koeltechniek software vergelijken (geen indexdata, hoge GEO-waarde) | Commercieel onderzoek | 4 |

Niet aanmaken: `/f-gassen-software`, `/werkbon-software-installateur`,
`/tra-lmra-installateurs`. Die cannibaliseren de bestaande pagina's of mikken
op een generiek VCA-publiek.

`/alternatief-voor-crm-installateurs` gaat op in pagina 6 (301 of terugbrengen
tot één sectie). `/crm-voor-installateurs` en `/planningssoftware-monteurs`
blijven, maar zonder BRL- of F-gassenblokken en met een vaste link naar de pillar.

## Status (15 september 2026)

- Taak 1 (feature-check en tekstfixes): gedaan, `b548bb8` en `e638916`.
- Taak 2 (`/brl-100-software`): live op main, `0b570e2`. Review: alle datums,
  drempels, art. 7-punten, bronnen en FAQ conform `01` en `04`.
- Taak 3 (pillar en sameAs): live op main, `296fcbf` en `fd0dd90`. `PROFIELEN`
  gevuld met LinkedIn-bedrijfspagina, Google Bedrijfsprofiel en YouTube, KvK
  69499829 als `Organization.identifier`, telefoon +31855005505, `areaServed` NL.
- Auteurspagina `/over/rudy-snel`: live op main, `9591443` en `2e24c19`. Person
  één keer gedefinieerd in `personSchema()`, `Article.author` en
  `BlogPosting.author` alleen als `@id`-verwijzing. Live gecontroleerd op
  15 september 2026 op `/over/rudy-snel`, `/brl-100-software`, de pillar en
  `/blog/digitaal-logboek-qr-kenplaat`.
- Google Bedrijfsprofiel: categorie gewijzigd naar Softwarebedrijf (nog niet
  zichtbaar op 15 september), openingstijden "open zonder vaste tijden". Open:
  website in het profiel van `https://www.snellio.nl/` naar `https://snellio.nl`.
- Taak 4 (`/f-gassen-registratie` uitbreiden): live op main, `77eee43`. Live
  gecontroleerd op 15 september 2026: Article met author als `@id`, citation
  met vier bronnen, ImageObject, Person op de pagina, FAQPage met 8 vragen,
  "Bijgewerkt op" gelijk aan `dateModified`, answer-first 53 woorden, twee
  echte tabellen, geen "BRL100", "EPBD", "volledig" of "compliant" meer.
  Afwijkingen van `08` (BRL 200-kaart weg, CERTS-badges herschreven,
  UpdatedOn in LandingHero, "Uit de eigen praktijk" weggelaten) zijn akkoord.
- Taak 5 (sitewide sweep, `09`): live op main, `c634346`. Live gecontroleerd op
  15 september 2026: FAQ-antwoorden staan in de HTML op `/f-gassen-registratie`
  (8), de pillar (11), `/features` (5) en `/` (5), telkens gelijk aan het
  FAQPage-schema, als `<details>` zonder client-state. Geen "BRL100", "EPBD",
  "jaar-rapport", "STEK-nummer-veld" of "lekcontrole-cycli berekend" meer in
  zichtbare tekst of head. `llms.txt` met datumregel en zonder
  kwaliteitshandboek. Afwijkingen van `09` (FAQ op `/features` zichtbaar
  gemaakt, badgekop herschreven, `llms.txt` regels 43 en 44, Features.tsx en
  STATS mee opgeruimd) zijn akkoord.
- 15 september, avond: Rudy bevestigde het BRL 200-nummer per monteur en de
  berekening van de lekcontroletermijn (beide nu `[x]` in `02`), gaf 2017 als
  startjaar in de koeltechniek en levert een screenshot van de flesregistratie
  aan als `public/koelfles-registratie.png`. Bouwen: taak 5b, prompt in het
  chatverslag van 15 september; kleine wijzigingen op `/features`, `/`,
  `/over/rudy-snel` en `/f-gassen-registratie`.
- Taak 6 (pagina 4, `/werkbon-software` herpositioneren): tekst klaar in `10`.
  Bevat ook de correctie van de onjuiste eIDAS-claim (nu `01` §6). Bouwen na 5b.
- Taak 7 (homepage: volgorde en afwerking): voorstel in `11`. Na taak 6.
- Open na taak 7: pagina 6 (vergelijking, alleen met een kwartaalcontrole van de
  prijzen); pagina 5 (R290); inhoudelijk herschrijven van "BRL 100-rapport"
  op `/crm-voor-installateurs`, `/alternatief-voor-crm-installateurs` en in
  blogposts; "Uit de eigen praktijk" zodra Rudy de auditzin geeft.

## Do these three first

| Action | Why | Effort | Expected impact |
| --- | --- | --- | --- |
| **1. Feature-bevestiging en drie tekstfixes.** Loop `02-feature-factcheck.md` na in een live Snellio-account. Fix "lekkoets" in `app/features/page.tsx:48`, haal SnelStart uit `public/llms.txt`, herformuleer "conform 2024/573" waar het BRL 100 betreft. | Alles wat daarna gepubliceerd wordt bouwt op deze claims. Eén onjuiste feature-claim op een compliance-pagina kost de geloofwaardigheid van de hele pagina. | Low | Randvoorwaarde. |
| **2. Publiceer `/brl-100-software`** uit `04-pagina-brl-100-software.md`, met Article + FAQPage + Person-referentie, zichtbare update-datum, bronnenlijst, links vanaf `/f-gassen-registratie` en de pillar. | "brl 100" is met 590 zoekopdrachten/maand en KD 9 de grootste bereikbare term in de niche. Geen enkele geciteerde bron koppelt art. 7 van de verordening aan BRL 100 §2.5.2 vanuit de auditpraktijk. | High | Eerste realistische top 10-positie op een term met volume en de eerste citeerbare pagina van snellio.nl. |
| **3. Pillar bijwerken** volgens `03-pillar-verbeterplan.md` en `Organization.sameAs` vullen (`06-schema-entity.md`). | De pillar krijgt al Ads-verkeer en geeft de BRL-pagina zijn interne autoriteit. Het R290-blok is de grootste juridische onnauwkeurigheid op de site. Lege `sameAs` betekent dat engines Snellio niet als entiteit kunnen koppelen. | Medium | Hogere citeerbaarheid van de drukste pagina, foutieve claim van productie af, entiteitsprofiel waar de rest op bouwt. |

Daarna: taak 6 (pagina 4, `10`), pagina 6 (vergelijking, alleen met
kwartaalcontrole), pagina 5 (R290; features zijn bevestigd, tekst volgt).

## Wat AI-engines nu over Snellio zeggen (14 september 2026)

- Google AI Overview voor "software voor installatiebedrijven": ERP-antwoord
  (Syntess, Sidekick, Exact, AFAS, Bluace, OpusFlow, Gilde, Technisi). Geen Snellio.
- ChatGPT gpt-5.5: adviseert OutSmart Boost à "€416/jaar" als complete oplossing.
  Op out-smart.com/nl/tarieven: Boost €426/jaar, KoudSmart (F-gasmodule) losse
  add-on €1.575/jaar, beide ex btw. Geen Snellio.
- Perplexity sonar-pro: kent Snellio uitsluitend via koldwerk.nl/vergelijk/snellio.
  snellio.nl zelf wordt niet geciteerd.
- snellio.nl staat in de DataForSEO-index op 2 zoekwoorden, beide irrelevant.

## Tools en bronnen

Zoekdata: DataForSEO MCP-connector (keyword_overview, bulk_keyword_difficulty,
ranked_keywords, keyword_suggestions, serp_organic_live_advanced,
ai_optimization_llm_response). Pagina's en pdf's: Firecrawl-connector.
Locatie Nederland, taal nl, desktop. Geen enkel cijfer is geschat.
Dashboard met de analyse: https://claude.ai/artifact/KKhAciTDvUPFbRG9FUDoa7
