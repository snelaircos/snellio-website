# Restant claims: CRM-, alternatief-, planningpagina en blogposts

Taak 8. Live gelezen op 16 september 2026 na taak 7 (`d7f3f85`). Alleen docs;
de lokale sessie bouwt. Zelfde regels als `09` §2: geen "rapport", geen
"conform" of "voldoet aan", kenplaat volgens art. 12, wet alleen uit `01`,
features alleen uit `02`, je-vorm, geen gedachtestreepjes (—).

## 1. `/crm-voor-installateurs`

| Huidige tekst | Vervangen door |
| --- | --- |
| Hero-bullet "BRL 100-rapport met één klik klaar" | "Werkregistratie zoals BRL 100 vraagt, vanuit de werkbon" |
| Functiekaart Digitale werkbonnen: "BRL 100-rapport automatisch klaar" | "Elke handeling komt in het logboek van de installatie" |
| Kaart "BRL 100 rapportage: Automatisch gegenereerd. Direct klaar voor inspectie" | Kaart "BRL 100-werkregistratie: per installatie en per circuit, export voor de auditor" |
| Kaart F-gassen: "Koudemiddellogboek conform EU F-gas 2024/573" | "Logboek per installatie met de gegevens uit art. 7 van Verordening (EU) 2024/573" |
| FAQ: "F-gassen-registratie, BRL 100-rapport en lekcontrole-cycli zitten in de kern" | "F-gassenregistratie, BRL 100-werkregistratie en de lekcontroletermijn uit art. 5 zitten in de kern" |
| Keuzecriterium "Twee: zit F-gassen registratie en BRL 100-rapportage in de kern" | "BRL 100-werkregistratie" |
| Twee gedachtestreepjes in "Waarom een los CRM niet werkt" en "Waar let je op" | Punt of komma |
| "de wettelijke F-gassen registratie (EU-verordening 2024/573)" | "het register per apparaat uit art. 7 van Verordening (EU) 2024/573" |

Hardgecodeerde prijzen: niet gezien. Offline-FAQ is al gecorrigeerd.

## 2. `/alternatief-voor-crm-installateurs`

| Huidige tekst | Vervangen door |
| --- | --- |
| Kaart F-gassen "BRL 100 ready: Flesregistratie, koudemiddel-balans, jaar-rapportage met één klik" | "Zoals BRL 100 vraagt: flesregistratie, jaarlijkse F-gassenbalans, werkregistratie per installatie" |
| "F-gassen, BRL 100 en lekcontrole zit in de kern" | "F-gassenregistratie, BRL 100-werkregistratie en lekcontroletermijnen zitten in de kern" |
| Doelgroepkaarten met "€10", "€29", "€69", "€129", "tot 25 installaties", "2 monteurs inbegrepen", "5 monteurs inbegrepen" | Uit `PLANS` renderen |
| "Migratie van je oude systeem is inbegrepen" en "Onze support helpt je gratis met de migratie tijdens de trial" | Alleen laten staan als Rudy dat wil blijven beloven. Anders: "Wij helpen je op weg met de CSV-import." |
| FAQ "Klantgegevens, locaties en historische werkorders" via CSV | Aanvullen: "klanten, locaties, werkorders en installaties, via CSV-import of via de API" (`02` rij 15 en 27). |
| "Een uur per dag aan systemen schakelen ... Dat is een vrije dag per week" | Geen bron. Inkorten tot "Elke dag schakelen tussen systemen en gegevens overtikken." |
| Meta description "alternatief voor Climapulse" | Laten staan tot pagina 6 bestaat; dan 301 volgens `00`. |

Concurrentnamen (Climapulse, Climatools, Fieldbuddy, Simpro) blijven; er staan
geen prijzen of functieclaims over hen op de pagina.

## 3. `/planningssoftware-monteurs`

| Huidige tekst | Vervangen door |
| --- | --- |
| Hele pagina in de u-vorm | Je-vorm |
| Praktijkvoorbeeld "Airco Totaal", "eigenaar Sandra", "vier monteurs in Noord-Holland", "−90% planningsfouten", "28 → 12 dagen betaaltermijn", "−5 uur planning per week" | Sectie verwijderen. Niet verifieerbaar. |
| Voordeel "1–2 uur per dag" | Weglaten, geen bron. |
| "Meerdere monteurs inplannen kan vanaf Pro (2 monteurs inbegrepen)" en soortgelijke pakketfeiten in FAQ | Uit `PLANS` |
| "iDEAL of Wero betaallink via Mollie" | "De factuur gaat per e-mail met een betaallink via Mollie; de klant betaalt met iDEAL of Wero" (`02`) |
| Werkorderstatus onderweg/bezig/afgerond, overzicht per dag/week/monteur, eigen login per monteur | Bevestigd (`02` rij 28 en 29). Blijven. |

Schema: `WebPage` met `dateModified` en zichtbare regel "Prijzen en functies
gecontroleerd op [datum]" via `UpdatedOn`, zoals de pillar en de werkbonpagina.
FAQ byte-gelijk.

## 4. Blogposts (`lib/posts.ts`)

Per post: tekst aanpassen, `dateModified` toevoegen aan het post-type (nog niet
aanwezig) en zetten op de dag van deploy, `BlogPosting.dateModified` daaruit
lezen, zichtbare regel "Bijgewerkt op [datum]" onder de auteursregel. De
u-vorm in de oude posts mag blijven; de claims niet.

### `brl100-uitgelegd`

- "Snellio genereert automatisch een BRL 100-compliant rapport op basis van de koeltechnische handelingen die u invoert. U hoeft niets handmatig over te nemen, het systeem verzorgt de juiste lay-out en veldvolgorde." wordt: "Snellio legt elke koeltechnische handeling die u op de werkbon invult vast als werkregistratie per installatie en per circuit, zoals BRL 100 §2.5.2 vraagt, en zet de koudemiddelboeking in de F-gassenbalans. U hoeft niets over te nemen."
- Link toevoegen: "Wat de auditor precies toetst, staat in [BRL 100: wat de auditor van je administratie vraagt](/brl-100-software)."
- De lijst "Per werkorder dient u minimaal vast te leggen" aanvullen met "bij wie en wanneer (onderneming en persoon met certificaatnummer, art. 7 lid 1 onder e)" en de bron BRL 100 §2.5.2 noemen.

### `digitale-werkbon-voordelen`

- "vormen automatisch de basis voor het BRL 100-rapport en het koudemiddellogboek" wordt "vormen automatisch de werkregistratie die BRL 100 vraagt en het logboek per installatie".

### `f-gas-verordening-2024`

De alinea "Strengere GWP-grenzen en bijvulverboden" klopt niet met art. 13
(`01` §7). Vervangen door:

> **Bijvulverboden per type apparatuur (art. 13)**
>
> - Koelapparatuur: sinds 1 januari 2025 mag u geen F-gas met een GWP van 2 500 of meer meer gebruiken voor onderhoud of service. Geregenereerd of gerecycled gas met zo'n GWP mag nog tot 1 januari 2030, onder voorwaarden.
> - Airco's en warmtepompen: hetzelfde verbod sinds 1 januari 2026, met de uitzondering voor geregenereerd of gerecycled gas tot 1 januari 2032.
> - Stationaire koelapparatuur, behalve chillers: vanaf 1 januari 2032 ook geen F-gas met een GWP van 750 of meer voor onderhoud of service; geregenereerd of gerecycled gas blijft toegestaan.
> - Voor nieuwe apparatuur gelden aparte marktverboden met lagere GWP-grenzen (bijlage IV); die staan niet in dit artikel.

- "Op 11 maart 2024 is de nieuwe Europese F-gassenverordening (EU) 2024/573 in werking getreden" klopt (`01` §1).
- De alinea "Certificering uitgebreid naar natuurlijke koudemiddelen" met de datums 29 september 2025, 29 maart 2026 en 12 maart 2029: **niet geverifieerd** (`01` §7). Twee opties: de datums verwijderen en alleen zeggen dat de certificeringsplicht ook geldt voor koolwaterstoffen, CO₂ en ammoniak (dat staat in BRL 100 v3.0, `01` §2), of de websessie laat ze eerst nalezen in art. 10 en Uitvoeringsverordening (EU) 2024/2215. Advies: verwijderen tot geverifieerd.
- "De jaarrapportage en het volledige logboek zijn altijd actueel ... alle documentatie conform EU F-gas Verordening 2024/573" wordt "De F-gassenbalans en het logboek per installatie zijn actueel en exporteerbaar, zodat u bij een audit het register uit art. 7 en de werkregistratie uit BRL 100 kunt tonen."
- "Split-units onder 12 kW lopen op termijn tegen een volledig F-gasverbod aan": niet in `01`. Verwijderen of eerst bijlage IV nalezen.

### `drukste-zomer-airco-monteur-zonder-administratie-achterstand`

- "BRL-100 v3.0" en "BRL-100 versie 3.0" (4x, ook meta description) worden "BRL 100 versie 3.0".
- Features in deze post (WhatsApp-AI-assistent, planningsvoorstel met akkoord-knop, AI-fotorapport, controle nominale vulling, import via API) zijn bevestigd (`02` rij 23 t/m 27). Inhoud blijft; alleen de spelling aanpassen.
- Aantallen "ruim 300 werkorders en ruim 240 nieuwe klanten": alleen laten staan als ze uit het dashboard komen.

### `digitaal-logboek-qr-kenplaat`

- Alt-tekst en bijschrift "BRL 100-conforme kenplaat", "alle verplichte velden" worden "kenplaat met de velden uit art. 12 van Verordening (EU) 2024/573 en een QR-code".
- "De plaat bevat alle velden die de BRL 100 voorschrijft" wordt "De plaat bevat de velden uit art. 12 van de verordening (koudemiddel, GWP, vulling in kilogram en CO₂-equivalent, de zin over gefluoreerde broeikasgassen) en daarnaast: installatie-identificatienummer, leverancier, type, datum laatste controle, uw BRL 100-nummer en het BRL 200-nummer van de monteur."
- "de EU F-gas verordening 2024/573 verplicht een sluitende registratie per installatie" wordt "art. 7 van Verordening (EU) 2024/573 verplicht een register per apparaat boven de drempel uit art. 5; BRL 100 vraagt een werkregistratie per handeling voor elke installatie".
- Meta description en og:description: "BRL 100-conforme kenplaten" wordt "kenplaten met de velden uit art. 12".

## 5. `/pricing`

Gelezen, geen wijzigingen nodig. "BRL 100-werkregistratie" staat er al goed.

## 6. Live-check na deploy (websessie)

Op alle acht URL's: geen "rapport" in combinatie met BRL 100, geen "conform" of
"voldoet aan", geen gedachtestreepjes, prijzen gelijk aan `PLANS`,
`dateModified` opgehoogd, FAQ-antwoorden in de HTML. Op de blog: "Bijgewerkt
op" zichtbaar en gelijk aan `BlogPosting.dateModified`.

## 7. Live-check (16 september 2026, commit `a63a262`)

Alle acht URL's gecontroleerd. CRM, alternatief en planning: geen "rapport",
"conform", "voldoet aan" of gedachtestreepje meer, je-vorm, WebPage met
`dateModified` 16 september en zichtbare datumregel, FAQ-antwoorden in de HTML
(planning 7 van 7), Airco Totaal en "1–2 uur per dag" weg, prijzen gelijk aan
`PLANS`. Blogposts: "Bijgewerkt op 16 september 2026" zichtbaar en gelijk aan
`BlogPosting.dateModified`; `brl100-uitgelegd` met §2.5.2-lijst en link naar de
BRL-pagina; `f-gas-verordening-2024` met het art. 13-blok (2025, 2026, 2030,
2032), zonder certificeringsdatums en zonder de 12 kW-zin; kenplaat-blog met
art. 12-formulering; zomerblog alleen spelling. Werkbonpagina: screenshot en
Wero live.

Restant voor taak 8b (na merge van PR #7): Wero-formulering ("betaallink in
de factuurmail, klant betaalt met iDEAL of Wero") op de werkbonpagina in de
functie "Direct factureren" en de FAQ "Kan ik direct factureren"; import-FAQ op
de alternatief-pagina en de werkbon-FAQ "Hoe maak ik werkbonnen digitaal"
aanvullen met installaties en API (`02` rij 15 en 27); planningfeatures
terugzetten (status onderweg, bezig, afgerond; overzicht per dag, week en
monteur; eigen login per monteur), want `02` rij 28 en 29 zijn bevestigd.
