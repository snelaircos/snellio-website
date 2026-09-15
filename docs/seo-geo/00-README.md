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

## Do these three first

| Action | Why | Effort | Expected impact |
| --- | --- | --- | --- |
| **1. Feature-bevestiging en drie tekstfixes.** Loop `02-feature-factcheck.md` na in een live Snellio-account. Fix "lekkoets" in `app/features/page.tsx:48`, haal SnelStart uit `public/llms.txt`, herformuleer "conform 2024/573" waar het BRL 100 betreft. | Alles wat daarna gepubliceerd wordt bouwt op deze claims. Eén onjuiste feature-claim op een compliance-pagina kost de geloofwaardigheid van de hele pagina. | Low | Randvoorwaarde. |
| **2. Publiceer `/brl-100-software`** uit `04-pagina-brl-100-software.md`, met Article + FAQPage + Person-referentie, zichtbare update-datum, bronnenlijst, links vanaf `/f-gassen-registratie` en de pillar. | "brl 100" is met 590 zoekopdrachten/maand en KD 9 de grootste bereikbare term in de niche. Geen enkele geciteerde bron koppelt art. 7 van de verordening aan BRL 100 §2.5.2 vanuit de auditpraktijk. | High | Eerste realistische top 10-positie op een term met volume en de eerste citeerbare pagina van snellio.nl. |
| **3. Pillar bijwerken** volgens `03-pillar-verbeterplan.md` en `Organization.sameAs` vullen (`06-schema-entity.md`). | De pillar krijgt al Ads-verkeer en geeft de BRL-pagina zijn interne autoriteit. Het R290-blok is de grootste juridische onnauwkeurigheid op de site. Lege `sameAs` betekent dat engines Snellio niet als entiteit kunnen koppelen. | Medium | Hogere citeerbaarheid van de drukste pagina, foutieve claim van productie af, entiteitsprofiel waar de rest op bouwt. |

Daarna: pagina 6 (vergelijking), pagina 3 uitbreiden, pagina 4 herpositioneren,
pagina 5 pas als TRA/LMRA/werkvergunning in de app bevestigd zijn.

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
