# Homepage: volgorde en afwerking

Taak 7. Geschreven 15 september 2026 op basis van `app/page.tsx` op main
(`22911ea`). Aanleiding: het founder-blok "Hoi, ik ben Rudy" staat direct onder
de hero, vóór het product. Rudy wil het lager. Alleen docs; de lokale sessie bouwt.

## 1. Nieuwe volgorde

Logica: probleem, product, bewijs, regels, mens, prijs, vragen, actie. Het
founder-blok komt vlak vóór de prijzen: dat is het moment waarop een bezoeker
wil weten wie erachter zit.

| # | Sectie | Nu | Straks | Achtergrond |
| --- | --- | --- | --- | --- |
| 1 | Hero met dashboard | 1 | 1 | `#f4f7fa` |
| 2 | Koppelingen-strip (Mollie, Moneybird, Exact Online, WeFact, Google Calendar) | 6 | 2, als smalle strip van één regel direct onder de hero | wit |
| 3 | Pijn-erkenning, drie kaarten | 2 | 3 | `#f4f7fa` |
| 4 | Wat Snellio voor je doet, zes kaarten | 3 | 4 | wit |
| 5 | Monteur onderweg, met telefoonafbeelding | 4 | 5 | `#f4f7fa` |
| 6 | Gemaakt voor de regels van jouw vak, vier kaarten | 5 | 6 | wit |
| 7 | Hoi, ik ben Rudy | 1.5 | 7 | `#f4f7fa` |
| 8 | Prijzen (`HomePricing`) | 7 | 8 | wit |
| 9 | FAQ | 9 | 9 | `#f4f7fa` |
| 10 | Slot-CTA | 10 | 10 | wit |

Achtergronden strikt afwisselen. Nu staan prijzen en FAQ allebei op `#f4f7fa`.
De comment "founder direct na hero, 2/3 visitors leaves <30s" verwijderen; die
aanname is niet gemeten.

## 2. Founder-blok (sectie 7), compacter en met link

- Kop blijft "Hoi, ik ben Rudy." Eyebrow: "Wie dit bouwt".
- Foto links (160 px rond op desktop, 120 px gecentreerd boven de tekst op
  mobiel), tekst rechts, maximaal 640 px breed.
- Twee alinea's in plaats van drie. Voorstel:

  > Ik run Snel Airco's, een koeltechniekbedrijf dat zelf onder BRL 100 werkt.
  > Sinds 2017 in het vak, STEK-gecertificeerd, monteurs op pad en een audit
  > die altijd net iets eerder komt dan je denkt.
  >
  > Snellio is ontstaan omdat mijn eigen administratie tot de audit bleef
  > liggen. Geen SaaS-bureau, geen consultant: een installateur die een tool
  > wilde die werkt zoals z'n eigen werkplaats werkt.

- Daaronder één regel met kleine badges: `Snel Airco's` · `STEK` · `BRL 100` ·
  `Sinds 2017`.
- Twee links naast elkaar: "Meer over Rudy →" naar `/over/rudy-snel` en
  `rudy@snellio.nl`. De zin "je krijgt mij aan de lijn" mag blijven als
  onderschrift bij het e-mailadres.
- Alt-tekst foto: "Rudy Snel, oprichter van Snellio en eigenaar van Snel Airco's".
- Geen `Person`-schema hier; dat staat op `/over/rudy-snel`. De homepage houdt
  `Organization` met `founder` als `@id`-verwijzing, zoals nu.

## 3. Afwerking per sectie ("mooier")

- **Hero.** Tekst blijft. "Vanaf €10 per maand" in de trustregel uit `PLANS`
  renderen, niet hardcoden. De dashboardafbeelding krijgt een dunne rand en
  zachte schaduw, gelijk aan de telefoonafbeelding in sectie 5, zodat beide
  productbeelden dezelfde stijl hebben.
- **Koppelingen-strip.** Eén regel: eyebrow "Koppelt met" links, de vijf namen
  als chips rechts. Op mobiel wrap. Geen logo's: die staan niet in de repo en
  de merken hebben gebruiksregels.
- **Pijn-erkenning.** Per kaart onder de beschrijving één regel in accentkleur
  met de oplossing, zodat probleem en antwoord bij elkaar staan:
  werkbon-chaos → "Klant tekent op het scherm, pdf direct in de mail";
  F-gassen-rompslomp → "Elke handeling vanuit de werkbon in het logboek";
  planning-puzzel → "Eén planning, elke monteur ziet z'n eigen dag".
- **Wat Snellio voor je doet.** Eén introzin onder de H2: "Zes onderdelen, één
  systeem, alles in elk pakket." Kaarten gelijk van hoogte (grid met
  `auto-rows-fr`), pijl-link onderaan uitgelijnd.
- **Monteur onderweg.** Blijft. Afbeelding op mobiel maximaal 260 px breed en
  gecentreerd.
- **Regels van jouw vak.** Eyebrow "BRL & EU-conform" wordt "Gebouwd voor BRL 100
  en Verordening (EU) 2024/573" (zie taak 5, geen "conform"-claim). De kaarten
  BRL 100 en F-gassen krijgen een link: "Lees hoe de audit werkt →" naar
  `/brl-100-software` en "Wat er in het logboek moet →" naar
  `/f-gassen-registratie`. Teksten van de kaarten niet wijzigen; die zijn in
  taak 5 en 5b gecontroleerd.
- **Prijzen.** Blijft `HomePricing`. Eén regel eronder: "Alle functies in elk
  pakket. Je betaalt voor het aantal monteurs en installaties." uit
  `INBEGREPEN`-context, geen bedragen in tekst.
- **FAQ.** Blijft `<details>`. Antwoord "Kan een monteur ook offline werken?"
  is in 5b al gecorrigeerd; controleren dat dat live staat.
- **Slot-CTA.** Blijft.
- **Sectieritme.** Overal dezelfde verticale ruimte (`py-20`, strip `py-8`),
  dezelfde eyebrow-stijl (mono, uppercase, accent), H2 in dezelfde maat.
  Elke sectie een `id` (`#koppelingen`, `#herkenbaar`, `#functies`,
  `#monteur`, `#regels`, `#rudy`, `#prijzen`, `#faq`) voor ankers vanuit
  andere pagina's.

## 4. Wat niet verandert

Teksten van hero, pijnpunten, features, compliance-kaarten en FAQ zijn in taak
5 en 5b gecontroleerd en blijven, op de drie oplossingsregels bij de pijnpunten
en de introzin bij de features na. Geen nieuwe claims. Geen nieuwe URL's.
`WebPage.dateModified` van de homepage ophogen naar de deploydatum.

## 5. Live-check na deploy (websessie)

Volgorde van de H2's in de HTML, founder-blok na de compliance-sectie en vóór
`HomePricing`, link naar `/over/rudy-snel` aanwezig, achtergronden afwisselend,
geen nieuwe tekst buiten dit dossier, FAQ-antwoorden nog in de HTML.
