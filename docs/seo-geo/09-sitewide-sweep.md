# Sitewide sweep: FAQ-component, claims op featurespagina en homepage, naamgeving

Taak 5. Geschreven 15 september 2026 na de live-check van `/f-gassen-registratie`
(commit `77eee43`). Alleen docs; de lokale sessie bouwt.

## 1. FAQ-antwoorden staan niet in de HTML (blokkerend voor citeerbaarheid)

`components/sections/LandingFaq.tsx` is een client component die het antwoord
alleen rendert als `open === i`. Live gecontroleerd op `/f-gassen-registratie`
op 15 september 2026: alle acht vragen staan in de server-HTML, geen enkel
antwoord. Het `FAQPage`-schema bevat wel de antwoorden. Dat is precies het
patroon waarvoor Google FAQ-rich results intrekt (schema-inhoud die niet
zichtbaar op de pagina staat), en AI-engines die HTML lezen zien de antwoorden
niet. Hetzelfde geldt voor elke pagina die `LandingFaq` gebruikt: de pillar,
`/crm-voor-installateurs`, `/werkbon-software`, `/planningssoftware-monteurs`
en de homepage.

Fix: `LandingFaq` herbouwen als server component met `<details>`/`<summary>`
per vraag, zoals `/brl-100-software` al doet. Antwoord in een `<div>` binnen
`<details>`, dus altijd in de HTML, standaard dichtgeklapt. Geen `useState`.
Styling gelijk houden (plus-teken via CSS op `details[open]`). Daarna op
`/f-gassen-registratie` en de pillar controleren dat de antwoordtekst
byte-gelijk in de HTML staat.

## 2. Claims op `/features` en `/` die niet door de feature-factcheck komen

Live gelezen op 15 september 2026. Zelfde regels als bij pagina 3
(`08-pagina-f-gassen-registratie.md`, verwijderlijst).

| Pagina | Huidige tekst | Waarom | Vervangen door |
| --- | --- | --- | --- |
| `/features` H2 | "BRL100 & BRL200 rapportage" | Geen rapport in BRL 100; BRL 200 is een persoonscertificaat. | "BRL 100-registraties en persoonscertificaten" |
| `/features` | "Automatisch BRL100-rapport per installatie" | `02`, rij 1. | "Werkregistratie per installatie en per circuit, zoals BRL 100 §2.5.2 vraagt" |
| `/features` | "BRL200/Stek-certificaat ondersteuning" | Niet in `02`. De lokale sessie meldt een BRL 200-nummerveld per monteur; Rudy moet dat in de app bevestigen (nieuwe rij in `02`). | Na bevestiging: "BRL 200-nummer van je monteurs bij de medewerker". Tot dan weglaten. |
| `/features` | "EPBD-gereed voor energieprestatierapportage" | Niet in `02`. | Weglaten. |
| `/features` (2x) en alt-tekst kenplaat | "BRL100-conforme kenplaat" | Kenplaatvelden komen uit art. 12 van de verordening, niet uit BRL 100 (`CLAUDE.md` regel 4). | "kenplaat met de velden uit art. 12 en een QR-code" |
| `/features` | "Alle wettelijk verplichte gegevens staan erop" | Klopt alleen als de velden uit art. 12 er allemaal opstaan. Concreet maken. | "De velden uit art. 12 van Verordening (EU) 2024/573 staan erop" |
| `/features` | "Voldoet aan de logboekplicht van EU-verordening 2024/573" | "Voldoet aan" is verboden formulering. | "Logboek per installatie met de gegevens uit art. 7" |
| `/features` H1 en tekst | u-vorm ("Alles wat u nodig heeft", "uw eigen administratie") | `CLAUDE.md`: je-vorm. | Omzetten. |
| `/features` metadata | description "BRL100-rapportage" | Zie boven. | "werkregistratie en F-gassenbalans zoals BRL 100 vraagt" |
| `/` kaart | "BRL100 jaar-rapport. Eén klik. Klaar voor de auditor." + link "Meer over BRL100 & F-gassen" | Geen jaar-rapport in BRL 100; de balans is wel jaarlijks (§3.3). Twee kaarten linken nu naar dezelfde URL. | Kaart "F-gassenbalans per jaar. In kilogram en CO2-equivalent, zoals BRL 100 §3.3 vraagt." Link naar `/brl-100-software`. |
| `/` | "BRL100 / BRL200: STEK-nummer-veld, monteur-certificering, jaar-rapportage met één klik" | Zie boven; "STEK-nummer-veld" en "monteur-certificering" wachten op de nieuwe rij in `02`. | "BRL 100 en BRL 200: werkregistratie per installatie, jaarlijkse F-gassenbalans" en, na bevestiging, "BRL 200-nummer per monteur". |
| `/` | "Alle vereiste registratie ingebouwd, lekcontrole-cycli automatisch berekend op basis van CO₂-equivalent" | "Alle vereiste" is een volledigheidsclaim. Automatische berekening van de lekcontroletermijn uit art. 5 lid 6 staat niet als zodanig in `02` (rij 6 gaat over waarschuwingen). Rudy bevestigt of de app de termijn berekent. | "Logboek per installatie met de gegevens uit art. 7" en, na bevestiging, "lekcontroletermijn uit art. 5 berekend op basis van CO2-equivalent". |
| `/` | "F-gassen-rompslomp: ... BRL100-audit als wachtende stress" | Alleen spatie. | "BRL 100-audit" |
| `/` hero | "F-gassen en BRL100 direct inbegrepen" | Alleen spatie. | "BRL 100" |
| `/` | "AVG-conform" | Grens. Laten staan, maar niet uitbreiden. | Ongewijzigd. |

## 3. Naamgeving "BRL100" naar "BRL 100", "BRL200" naar "BRL 200"

Sitewide, in zichtbare tekst, metadata, alt-teksten en `public/llms.txt`
(regels 3 en 41). Ook `lib/metadata.ts` keywords "BRL100 software" naar
"BRL 100 software". Niet in URL's en niet in bestandsnamen van bronnen
(`brl100-versie-3-0-...pdf`). Blogslug `/blog/brl100-uitgelegd` blijft;
alleen de titel van die post krijgt een spatie als dat zonder redirect kan.

## 4. `public/llms.txt`

- Regel 3: "ingebouwde BRL100-rapportage en F-gassen registratie volgens
  EU-verordening 2024/573" wordt "werkregistratie en F-gassenbalans zoals
  BRL 100 vraagt, en een logboek per installatie met de gegevens uit art. 7
  van Verordening (EU) 2024/573".
- Regel 41: "BRL100-conform (kwaliteitshandboek beschikbaar)" wordt
  "Gebouwd door een installateur die zelf onder BRL 100 werkt". Het
  kwaliteitshandboek is van Snel Airco's, niet van Snellio; niet claimen.
- Regel met datum "Bijgewerkt op" toevoegen, gelijk aan de laatste deploy.

## 5. Opruimen

`components/sections/SocialProof.tsx`, `Certifications.tsx` en `Hero.tsx`
worden nergens geïmporteerd (lokale sessie, 15 september 2026). Verwijderen in
één commit, samen met `FEATURES` in `lib/constants.ts` als dat alleen door die
componenten werd gebruikt. Eerst `grep` om dat te bevestigen.

## Volgorde

1. `LandingFaq` naar `<details>` (blokkerend, raakt zes pagina's).
2. Featurespagina en homepage volgens de tabel.
3. Naamgeving en `llms.txt`.
4. Opruimen.

Daarna live-check door de websessie: FAQ-antwoorden in de HTML op
`/f-gassen-registratie` en de pillar, geen "BRL100" meer in zichtbare tekst,
featurespagina zonder de vijf verwijderde claims.

## 6. Restant na taak 6 (gezien op 16 september 2026)

`/crm-voor-installateurs` live: "BRL 100-rapport met één klik klaar" (hero),
"BRL 100-rapport automatisch klaar" (functiekaart), kaart "BRL 100 rapportage:
Automatisch gegenereerd. Direct klaar voor inspectie", "Koudemiddellogboek
conform EU F-gas 2024/573", FAQ "F-gassen-registratie, BRL 100-rapport en
lekcontrole-cycli zitten in de kern", keuzecriterium "BRL 100-rapportage in de
kern", en twee gedachtestreepjes (—) in de SEO-tekst. Dezelfde vervangingen als
in §2: werkregistratie en F-gassenbalans zoals BRL 100 vraagt; logboek per
installatie met de gegevens uit art. 7; streepjes vervangen door een punt of
komma. Ook `/alternatief-voor-crm-installateurs`, `/planningssoftware-monteurs`
en de blogposts op dezelfde woorden nalopen. Dit is taak 8, na taak 7.
