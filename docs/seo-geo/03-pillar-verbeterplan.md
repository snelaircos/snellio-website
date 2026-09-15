# Verbeterplan `/software-voor-installatiebedrijven`

Bestand: `app/software-voor-installatiebedrijven/page.tsx` (515 regels).
Huidige staat: Ads-landingspagina met hero, zes pijnpunten, oplossing, zes
functies, R290-blok, monteur/kantoor, planning, founder, drie stappen, prijzen,
vier "waarom", acht FAQ's, CTA. Schema: breadcrumb en FAQPage. Geen datum, geen
auteursschema, geen answer-first alinea.

Dit is een verbeterplan, geen herschrijving. De code-afspraken in de kop van het
bestand blijven gelden: prijzen uit `PLANS`, prijsblok via `HomePricing`, CTA's
naar `/registreren`, geen eigen tracking.

## Behouden

- Hero met H1 en de ondertitel "CRM, werkbonnen, planning, facturatie en
  koeltechnische administratie in één systeem".
- Functies-grid (zes kaarten), met de tekstcorrectie hieronder.
- Founder-blok met Rudy Snel. Uitbreiden, niet vervangen (zie `06-schema-entity.md`).
- Drie stappen, `HomePricing`, FAQ-component met `faqSchema`.

## Verwijderen

- Het volledige R290-blok "Werk je met R290? Dan staat het dossier al klaar."
  De feature is sinds 12 september 2026 op de site, niet bevestigd, en de tekst
  ("ATEX-zone standaard aan") suggereert dat Snellio de zonering bepaalt.
  Verhuist als korte alinea naar `/veilig-werken-met-r290` zodra bevestigd.
- Uit de functiekaart "F-gassen en BRL100": "lekcontrole conform EU-verordening
  2024/573" en "BRL100-rapportage in één klik". Vervangen door:
  "Koudemiddelregistratie per installatie en per fles, F-gassenbalans en het
  logboek dat art. 7 van Verordening (EU) 2024/573 en BRL 100 vragen."
- FAQ "Wat is software voor installatiebedrijven?" in de huidige vorm.
  Vervangen door de versie hieronder.

## Inkorten

- "Herkenbaar?" van zes naar vier pijnpunten: kwijtgeraakte werkbonnen,
  verspreide gegevens, F-gassenadministratie tot de audit, factuur die blijft liggen.
- "Waarom Snellio" van vier naar drie: "Nederlandse software en support"
  samenvoegen met "Je zit nergens aan vast".
- Monteur/kantoor-sectie: van vijf bullets naar drie, plus link naar `/werkbon-software`.

## Toevoegen

1. Direct onder de H1, vóór de CTA's: answer-first alinea (40 tot 60 woorden):

   > Software voor installatiebedrijven in de koeltechniek combineert klantbeheer,
   > planning, digitale werkbonnen en facturatie met wat een standaard ERP mist:
   > een logboek per installatie, koudemiddelregistratie en de administratie die
   > een BRL 100-audit vraagt. Bij Snellio zit alles in elk pakket, van €10 tot
   > €129 per maand incl. btw, afhankelijk van het aantal monteurs.

2. "Bijgewerkt op [datum]" onder de H1, gekoppeld aan `WebPage.dateModified`.
3. Nieuwe sectie **"Wat software voor koeltechniek extra moet kunnen"**: vier
   items van één zin, elk met link. Geen uitwerking, dat is de cannibalisatie-rem.
   - Logboek per installatie en per circuit → `/f-gassen-registratie`
   - Koudemiddelregistratie en F-gassenbalans → `/f-gassen-registratie`
   - Kenplaat met de wettelijke velden → `/f-gassen-registratie`
   - Wat de BRL 100-audit van je administratie vraagt → `/brl-100-software`
4. Nieuwe sectie **"ERP of werkbon-app: wat past bij 1 tot 10 monteurs?"**:
   drie alinea's, geen tabel, link naar `/vergelijken/software-koeltechniek`.
5. Compacte vergelijkingsteaser vóór het prijsblok: drie rijen (Snellio Starter,
   Koldwerk Start, OutSmart Launch + KoudSmart) met instapprijs, incl./ex btw en
   "F-gas inbegrepen?", plus link naar de vergelijkingspagina. Prijzen en datum
   uit `05-vergelijkingspagina.md`. Volledige tabel staat alleen daar.
6. FAQ, drie vragen erbij (tekst identiek in zichtbare FAQ en schema):
   - "Zijn de prijzen inclusief of exclusief btw, en hoe vergelijk ik dat?"
   - "Heeft een zzp'er ook een BRL 100-certificaat nodig?" (antwoord uit
     `01-juridische-basis.md` §2)
   - "Wie bewaart het logboek en hoe lang?" (art. 7 lid 2: exploitant én
     installateur, 5 jaar)
   - Vervangende eerste FAQ: "Wat is software voor installatiebedrijven in de
     koeltechniek?" met het antwoord uit de answer-first alinea.
7. Auteursblok uitbreiden en linken naar `/over/rudy-snel` (zie `06-schema-entity.md`).
8. Schema: `WebPage` met `dateModified`, `SoftwareApplication` met de vier
   `Offer`s (helper bestaat in `lib/schemas.ts`), `FAQPage`, `BreadcrumbList`.
   Geen `Article`: dit is een productpagina.

## Nieuwe headingstructuur

```
H1 Software voor installatiebedrijven in koeltechniek en airco
   [answer-first alinea] [Bijgewerkt op]
H2 Herkenbaar? (4 punten)
H2 Eén systeem, van eerste klantvraag tot betaalde factuur
H2 Wat je krijgt, in elk pakket (6 functiekaarten, gecorrigeerd)
H2 Wat software voor koeltechniek extra moet kunnen (4 items, doorlinken)
H2 ERP of werkbon-app: wat past bij 1 tot 10 monteurs?
H2 De monteur ziet zijn dag, kantoor houdt overzicht (ingekort)
H2 Alle werkorders en monteurs in één weekoverzicht
H2 Wat kost het, vergeleken met andere pakketten? (teaser, 3 rijen, link)
H2 Je betaalt alleen voor de grootte van je bedrijf (HomePricing)
H2 Door een installateur, niet door een softwarebureau (auteursblok)
H2 Vandaag starten, later pas kiezen (3 stappen)
H2 Veelgestelde vragen (11)
H2 Klaar om minder tijd aan administratie te besteden? (CTA)
```

Plaatsing: vergelijkingsteaser vóór het prijsblok, auteursblok tussen prijzen en
stappen, FAQ na de stappen.

## SEO title en meta

- Title: `Software voor installatiebedrijven in koeltechniek en airco | Snellio`
- Description (max 155): `CRM, werkbonnen, planning, facturatie en de administratie
  die BRL 100 vraagt, in één systeem. Vanaf €10 per maand incl. btw. Probeer 14
  dagen gratis.`
