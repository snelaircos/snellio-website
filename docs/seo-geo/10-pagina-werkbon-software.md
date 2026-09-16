# Pagina: `/werkbon-software` (herpositioneren op "werkbon app", URL blijft)

Status: tekst publicatieklaar. Geschreven 15 september 2026. Zoekdata en SERP
van dezelfde dag (DataForSEO, Nederland, nl, desktop). Juridische claims uit
`01-juridische-basis.md` §2 en §6. Features uit `02-feature-factcheck.md`.

Waarom herpositioneren: de pagina mikt nu op "werkbon software" (70/mnd) en
leunt op "BRL 100-rapport", een claim die niet bestaat. De term met volume is
"werkbon app" (320/mnd, KD 10, CPC €19,87), met "digitale werkbon" (170) en
"werkbon software" (70) als secundaire termen. De URL blijft; Google kent hem.

## Zoekdata en SERP (15 september 2026)

| Term | Volume/mnd | KD | CPC | Intentie |
| --- | --- | --- | --- | --- |
| werkbon app | 320 | 10 | €19,87 | navigatie / commercieel |
| werkbon applicatie | 320 | 10 | €19,87 | zelfde cluster |
| digitale werkbon | 170 | – | €19,44 | transactioneel |
| digitale werkbon app | 90 | – | €25,81 | transactioneel |
| werkbon software | 70 | 6 | €21,95 | commercieel |
| digitale werkbon software | 50 | 13 | – | transactioneel |
| werkbon app zzp | 50 | – | €16,82 | commercieel |
| wat is een werkbon | 40 | 42 | €0,31 | informatief |
| werkbon app gratis | 30 | – | €12,04 | informatief |
| stek werkbon | 20 | – | €4,72 | informatief |
| digitale werkbon installatietechniek | 20 | 43 | – | informatief |

Niet mikken op "werkbon voorbeeld" (210) en "werkbon maken in excel": dat zijn
sjabloonzoekers, geen kopers.

SERP "werkbon app": AI Overview aanwezig, citeert OutSmart, Viraguides,
Bouwportaal, Appwiki, Simple-Simon, TimeMate en Insezo. Organisch: OutSmart,
TimeMate, Insezo, Bouwportaal, Simple-Simon, AFAS, Google Play (Simple-Simon),
Appwiki, ECI. Snellio niet in de top 10. People also ask: "Hoe kan ik online
een werkbon maken?", "Wat zijn de kosten van OutSmart?", "Wat is de Digitale
werkbon app?", "Hoe werkt OutSmart?". Gerelateerd: werkbon app gratis, werkbon
app SnelStart, werkbon app zzp, zelf digitale werkbon maken.

SERP "digitale werkbon": AI Overview citeert OutSmart, ECI, AFAS, Simple-Simon,
ERP Overzicht, FieldBuddy, Insezo. People also ask: "Hoe maak ik werkbonnen
digitaal?", "Is er een app voor werkbonnen?", "Wat moet er op een werkbon staan?".

Wat opvalt: elke geciteerde bron is generiek (buitendienst, bouw, uren en
materialen). Niemand beantwoordt "wat moet er op een werkbon staan" voor een
koeltechnisch bedrijf, waar de werkbon ook de werkregistratie van BRL 100 is en
de bron van het logboek per installatie. Dat is het stuk dat deze pagina
citeerbaar maakt.

## Bouwinstructies

- Route blijft `app/werkbon-software/page.tsx`. Maak `app/werkbon-software/meta.ts`
  met `WERKBON_PAGE = { path, datePublished, dateModified }`; `datePublished` uit
  git, `dateModified` de dag van deploy. Sitemap leest eruit.
- Dit is een commerciële pagina, geen Article. Schema: `WebPage` met
  `dateModified` (zoals de pillar), `FAQPage` byte-gelijk aan de zichtbare FAQ,
  `BreadcrumbList`. Geen `Article`, geen `Person`, geen `SoftwareApplication`
  hier (die staat al op de homepage of pricing; niet dupliceren).
- Zichtbaar onder de H1 via `UpdatedOn`: "Prijzen en functies gecontroleerd op
  [datum]", gelijk aan `WebPage.dateModified`.
- Prijzen in de FAQ en in de sectie "Wat kost het" uitsluitend uit `PLANS`,
  `BTW` en `TRIAL_DAGEN` (`CLAUDE.md`). De huidige FAQ hardcodet bedragen.
- Taal: je-vorm. De hele pagina staat nu in de u-vorm.
- Componenten blijven: `LandingHero`, `LandingFeatures`,
  `LandingProblemsVsOplossingen`, `LandingFaq` (nu `<details>`),
  `LandingInternalLinks`, `Cta`. De sectie "Wat moet er op een werkbon staan"
  is nieuw en krijgt een echte `<table>`.
- Afbeelding: Rudy heeft op 16 september een screenshot van een werkbon
  aangeleverd in `public/` als "werkbon-voorbeeld" (bestandsnaam en extensie
  controleren, hernoemen naar `werkbon-voorbeeld.png` zonder spaties). Plaatsen
  als figuur bij "Zo werkt de werkbon app", geanonimiseerd, met bijschrift
  "Werkbon in Snellio met koeltechnische handelingen en handtekening.
  Screenshot: 16 september 2026." en als `WebPage.primaryImageOfPage`
  (`ImageObject` met `caption` en `datePublished`).
- Sectie "Bronnen" onderaan, drie bronnen, ook al is dit een commerciële pagina:
  de tabel over de werkbonvelden verwijst naar BRL 100 en de verordening.

## Verwijderen van de huidige pagina (met reden)

| Huidige tekst | Waarom weg | Vervangen door |
| --- | --- | --- |
| "BRL 100 rapport automatisch", "BRL 100-compliant rapport", "BRL 100-rapport wordt automatisch gegenereerd", "gecertificeerd rapport", "BRL 100-documenten", hero-stat "BRL100 Automatisch rapport", badge "BRL 100 compliant" (in totaal 14 plekken) | BRL 100 kent geen rapport (`02`, rij 1). | "De werkbon is de werkregistratie die BRL 100 §2.5.2 vraagt; elke handeling komt in het logboek van de installatie." |
| FAQ "Is de digitale handtekening juridisch geldig? Ja. De digitale handtekening in Snellio voldoet aan de eIDAS-verordening en is juridisch gelijkwaardig aan een handgeschreven handtekening." en "Juridisch geldig" bij de oplossingen | Onjuist. Alleen een gekwalificeerde elektronische handtekening heeft hetzelfde rechtsgevolg als een handgeschreven (art. 25 lid 2). Een handtekening op een scherm is een gewone elektronische handtekening: die mag niet worden geweigerd omdat hij elektronisch is (art. 25 lid 1), maar is niet gelijkgesteld. Zie `01` §6. | Sectie en FAQ "Wat is een handtekening op het scherm juridisch" hieronder. |
| "koeltechnische meetwaarden, F-gas registratie, lektestdocumentatie en EPBD-informatie" | EPBD niet in `02`. | Zin zonder EPBD. |
| "iDEAL of Wero betaallink via Mollie" | Bevestigd op 15 september (`02`). Blijft, met koppelteken. | "iDEAL- of Wero-betaallink via Mollie". |
| Praktijkvoorbeeld "Tim, airco installateur zzp, regio Utrecht", "45 min/stuk", "van 4 uur naar 20 minuten", "3+ uur/week", "Start net als Tim" | Niet verifieerbaar, leest als verzonnen. | Weglaten. Eventueel later vervangen door Rudy's eigen praktijk met bevestigde feiten. |
| "2–4 uur/week" tijdsbesparing, "Altijd inzicht" | Geen bron. | Voordelen zonder cijfers. |
| "conform BRL 100/BRL 200" bij warmtepompinstallateur | BRL 200 is een persoonscertificaat; een werkbon is niet "conform BRL 200". | "met de velden die BRL 100 aan de werkregistratie stelt". |
| "Alles conform de actuele wetgeving" | Volledigheidsclaim. | Weglaten. |
| "Snellio is gebouwd door een BRL 100-gecertificeerd installateur" | Klopt inhoudelijk, maar spreek over het bedrijf. | "gebouwd door een installateur wiens eigen bedrijf onder BRL 100 werkt" met link naar `/over/rudy-snel`. |
| Hardgecodeerde prijzen in de FAQ | `CLAUDE.md`. | Uit `PLANS`. |

## Metadata

- URL: `/werkbon-software` (ongewijzigd)
- Title: `Werkbon app voor installateurs in koeltechniek en airco | Snellio`
- Description: `Werkbon app voor koeltechnische installateurs: monteur vult meetwaarden in, klant tekent op het scherm, pdf direct verstuurd. De werkbon is meteen de werkregistratie die BRL 100 vraagt. 14 dagen gratis.`
- Primaire term: werkbon app. Secundair: digitale werkbon, werkbon software,
  werkbon app zzp.
- Breadcrumb: Home › Werkbon app

## Hero

- Badge: `Werkbon app · Digitale handtekening · BRL 100-werkregistratie`
- H1: `Werkbon app voor installateurs` met accent `in koeltechniek en airco.`
- Sub (answer-first, 59 woorden): zie onder de H1.
- Stats: `0` / `papier`, `1 klik` / `van werkbon naar factuur`, `5 jaar` / `werkregistratie bewaard`
- CTA's en trustline ongewijzigd (`TRIAL_DAGEN`).

---

# Werkbon app voor installateurs in koeltechniek en airco

*Prijzen en functies gecontroleerd op [DATUM]*

Een werkbon app vervangt de papieren bon: de monteur vult werkzaamheden, meetwaarden en materialen in op telefoon of tablet, de klant tekent op het scherm en de pdf gaat direct naar de klant. Voor een koeltechnisch bedrijf is die werkbon ook de werkregistratie die BRL 100 vraagt. Snellio bouwt de bon daarom rond de installatie, niet rond de klus.

## Wat is een werkbon app?

Een werkbon app is software waarmee je werkbonnen op locatie digitaal invult, laat ondertekenen en verstuurt. Uren, materialen, foto's, meetwaarden en de handtekening van de klant staan in één document dat direct in je administratie zit. Generieke werkbon apps zijn gemaakt voor elke buitendienst. Snellio is gemaakt voor koeltechniek en airco: de werkbon hangt aan een installatie, de koeltechnische handelingen hebben hun eigen velden, en wat je invult komt in het logboek van die installatie.

## Wat moet er op een werkbon staan?

Er is geen wet die de inhoud van een werkbon voorschrijft. Voor een koeltechnisch bedrijf bepalen twee documenten wél wat er via de werkbon vastgelegd moet worden: BRL 100 versie 3.0, omdat de werkbon daar de werkregistratie per handeling is (§2.5.2), en art. 7 van Verordening (EU) 2024/573, omdat het logboek van de installatie uit die registraties wordt opgebouwd.

| Wat er op de werkbon staat | Waarom | Bron |
| --- | --- | --- |
| Klant, locatie, datum, monteur | Basis van elke werkbon; de monteur met certificaatnummer is verplicht in het logboek | Art. 7 lid 1 onder e |
| Installatie en zelfstandig circuit | BRL 100 vraagt registratie per handeling én per zelfstandig circuit | BRL 100 §2.5.2 |
| Type handeling (installatie, service, lekcontrole, reparatie, buitendienststelling) | Elke handeling aan de installatie moet geregistreerd worden | BRL 100 §2.5.2; art. 7 lid 1 onder e |
| Koudemiddel: type, toegevoegd, teruggewonnen, uit welke fles | Hoeveelheden per apparaat in het logboek; flesregistratie voor de F-gassenbalans | Art. 7 lid 1 onder a t/m d; BRL 100 §3.3 |
| Drukbeproeving: druk en resultaat | De certificerende instelling controleert of de drukbeproeving op de werkbon staat | BRL 100 (inspectiepunten bij §2.5) |
| Vacumeren: einddruk en standtijd van ten minste 30 minuten | Werkinstructie vacumeren, gecontroleerd bij de audit | BRL 100 (inspectiepunten bij §2.5) |
| Lekcontrole: datum, resultaat, detector met ijkdatum | Datum en resultaat in het logboek; detector en ijking via de instrumenteneisen | Art. 7 lid 1 onder f; BRL 100 §2.5.7 |
| Handtekening klant en monteur, met naam en tijdstip | Bewijs dat de klant het werk heeft gezien; de exploitant krijgt aantoonbaar een kopie | BRL 100 §2.5.2 |

Een generieke werkbon app heeft de bovenste rij en de onderste. De zes rijen ertussen zijn waar een koeltechnisch bedrijf zijn audit op haalt of verliest. In Snellio zijn dat vaste velden per type handeling, geen vrije tekst.

## Zo werkt de werkbon app

1. **Maak een werkorder aan.** Kies klant, locatie en installatie. Klant- en installatiegegevens (merk, type, koudemiddel, vulling, serienummer) staan al ingevuld.
2. **Voer de handelingen in.** Per type handeling de bijbehorende velden: druk, temperatuur, vacuüm en standtijd, koudemiddel uit welke fles, resultaat van de lekcontrole. Foto's en bijlagen erbij.
3. **De klant tekent op het scherm.** Naam, datum en tijdstip worden vastgelegd. De monteur tekent ook.
4. **Pdf klaar en verstuurd.** De werkbon gaat per e-mail naar de klant. De handelingen staan in het logboek van de installatie, de koudemiddelboeking in de flesbalans, en je maakt met één klik de factuur aan.

## Functies

- **Digitale handtekening ter plaatse.** Klant en monteur tekenen op telefoon of tablet. Naam, datum en tijdstip staan op de pdf.
- **Koeltechnische handelingen met eigen velden.** Inbedrijfstelling, lekcontrole, drukbeproeving, vacumeren, koudemiddel toevoegen of terugwinnen, buitendienststelling. Elk type zijn eigen meetvelden.
- **Werkbon gekoppeld aan de installatie.** Elke bon hangt aan een installatie met type, merk, koudemiddel, vulling en serienummer. De handelingen komen in het logboek per installatie, te openen via de QR-code op de kenplaat.
- **Foto's en bijlagen.** Bij de werkbon, terug te vinden in het klantdossier.
- **Direct factureren.** Van werkbon naar factuur in één klik. De factuur gaat per e-mail met een betaallink via Mollie; de klant betaalt met iDEAL of Wero. Koppeling met Moneybird, WeFact en Exact Online.
- **Automatisch e-mailen.** De pdf gaat direct na ondertekening naar de klant. Adres aanpasbaar, verzending uit te stellen.
- **Archief per klant en installatie.** Werkbonnen, foto's en logboek bij elkaar. De werkregistratie blijft bewaard zolang je account bestaat; BRL 100 vraagt minimaal vijf jaar.
- **Veiligheidsdossier bij brandbare koudemiddelen.** Bij werk aan R290 maakt Snellio bij de werkorder een TRA, een werkvergunning waar die nodig is, en een LMRA die de monteur ter plaatse invult. Framing uit `01` §3: TRA "noodzakelijk" volgens BRL 100 v3.0 als het werk risico's meebrengt, LMRA een werkwijze uit de VCA-praktijk, geen wettelijke eis.

## Wat is een handtekening op het scherm juridisch?

Een handtekening die de klant op je telefoon of tablet zet, is een elektronische handtekening in de zin van Verordening (EU) 910/2014 (eIDAS): gegevens in elektronische vorm die de ondertekenaar gebruikt om te ondertekenen (art. 3 punt 10). Art. 25 lid 1 bepaalt dat zo'n handtekening niet als bewijs mag worden geweigerd alleen omdat hij elektronisch is of niet gekwalificeerd is.

Wat hij niet is: gelijkgesteld aan een handgeschreven handtekening. Dat geldt alleen voor een gekwalificeerde elektronische handtekening, met een gekwalificeerd certificaat van een erkende dienstverlener (art. 25 lid 2). Een handtekening op een scherm is dat niet, bij Snellio niet en bij geen enkele werkbon app.

Voor een werkbon is dat in de praktijk zelden een probleem: de bon bewijst dat de klant het werk heeft gezien en akkoord is, samen met naam, datum, tijdstip en de rest van het dossier. Voor contracten waar de wet een handgeschreven handtekening eist, gebruik je een andere oplossing.

## Zonder werkbon app

- **Papieren bon.** Raakt kwijt, is slecht leesbaar, moet gescand en overgetypt worden.
- **Meetwaarden in vrije tekst.** Bij de audit ontbreekt de standtijd van het vacumeren of de druk van de beproeving, omdat er geen veld voor was.
- **Werkbon en logboek los van elkaar.** De monteur vult de bon in op locatie en het logboek later op kantoor, of niet.
- **Factuur apart invoeren.** Van bon naar boekhoudprogramma overtypen.

## Met Snellio

- **Werkbon op telefoon of tablet.** Alles op locatie ingevuld, direct verstuurd.
- **Vaste velden per handeling.** De software vraagt wat BRL 100 wil zien.
- **Werkbon is het logboek.** Elke handeling komt in het logboek van de installatie en in de flesbalans, zonder tweede invoer.
- **Factuur in één klik.** Regels overgenomen, betaallink erbij.

## Voor wie

- **Airco-installateur.** Plaatst split-units bij particulieren en bedrijven. Wil per installatie een werkbon met de koudemiddelvulling en de handtekening van de klant, en de kenplaat direct printen.
- **Warmtepompinstallateur.** Inbedrijfstellingen en servicebeurten, met de velden die BRL 100 aan de werkregistratie stelt.
- **Koeltechnisch monteur of servicebedrijf.** Lekcontroles, drukbeproevingen en vacumeringen bij commerciële installaties, met de gegevens die in het logboek van de exploitant moeten.
- **Zzp'er met BRL 100 en BRL 200.** Dezelfde registratieplicht als een bedrijf, zonder kantoor dat het achteraf invoert. Starter vanaf het instaptarief uit `PLANS`.

## Wat kost een werkbon app?

Uit `PLANS`, `BTW` en `TRIAL_DAGEN` renderen: per pakket de maandprijs incl. btw, het aantal monteurs en installaties, en de regel dat alle functies (werkbonnen, planning, facturatie, F-gassen, BRL 100-werkregistratie) in elk pakket zitten. Geen bedragen in de tekst hardcoden. Link naar `/pricing`.

## Veelgestelde vragen

**Wat is een werkbon app?**

Een werkbon app is software waarmee een monteur de werkbon op locatie digitaal invult op telefoon of tablet: werkzaamheden, uren, materialen, meetwaarden en foto's. De klant tekent op het scherm en de pdf gaat direct naar de klant en naar je administratie. Snellio is een werkbon app voor koeltechniek en airco: de werkbon hangt aan een installatie en de handelingen komen in het logboek van die installatie.

**Wat moet er op een werkbon staan?**

Er is geen wet die de inhoud van een werkbon voorschrijft. Voor een koeltechnisch bedrijf volgt de inhoud uit BRL 100 versie 3.0 en art. 7 van Verordening (EU) 2024/573: klant, locatie, datum en monteur met certificaatnummer, de installatie en het circuit, het type handeling, koudemiddel toegevoegd en teruggewonnen en uit welke fles, druk en resultaat van de drukbeproeving, einddruk en standtijd van het vacumeren, datum en resultaat van de lekcontrole, en de handtekeningen van klant en monteur.

**Hoe maak ik werkbonnen digitaal?**

Kies een werkbon app, zet je klanten en installaties erin (in Snellio via CSV-import van klanten, locaties, werkorders en installaties) en laat monteurs de bon op telefoon of tablet invullen. Kies een app met vaste velden voor jouw vak: voor koeltechniek zijn dat de meetwaarden van drukbeproeving, vacumeren en lekcontrole en de koudemiddelboeking per fles. Anders staan die straks in vrije tekst en zoekt de auditor ze bij elkaar.

**Is een handtekening op het scherm rechtsgeldig?**

Een handtekening op een telefoon of tablet is een elektronische handtekening volgens Verordening (EU) 910/2014 (eIDAS). Die mag niet als bewijs worden geweigerd alleen omdat hij elektronisch is (art. 25 lid 1). Hij is niet gelijkgesteld aan een handgeschreven handtekening; dat geldt alleen voor een gekwalificeerde elektronische handtekening met een gekwalificeerd certificaat (art. 25 lid 2). Voor een werkbon volstaat de handtekening op het scherm samen met naam, datum, tijdstip en het dossier.

**Werkt de werkbon app op telefoon en tablet, ook zonder verbinding?**

Snellio werkt in de browser op smartphone en tablet, op iOS en Android, zonder installatie uit een app store. Er is een internetverbinding nodig; zonder verbinding kun je geen werkbon invullen. Op locaties zonder bereik vul je de bon in zodra je weer verbinding hebt.

**Kan ik direct factureren vanuit de werkbon?**

Ja. Na ondertekening maak je met één klik een factuur aan; de regels worden overgenomen uit de werkbon. De factuur gaat per e-mail met een betaallink via Mollie; de klant betaalt met iDEAL of Wero. De factuur gaat mee naar Moneybird, WeFact of Exact Online als je die koppeling gebruikt.

**Werkt Snellio met mijn boekhoudpakket?**

Snellio koppelt gratis met Moneybird, WeFact en Exact Online, in elk pakket. Andere boekhoudpakketten zijn niet gekoppeld. Ontbreekt jouw pakket, mail dan; als het kan wordt het toegevoegd.

**Wat kost een werkbon app van Snellio?**

[Antwoord renderen uit `PLANS`, `BTW` en `TRIAL_DAGEN`: instaptarief per maand incl. btw, wat erin zit (alle functies, ook werkbonnen, planning, facturatie, F-gassen en BRL 100-werkregistratie), en de gratis proefperiode zonder betaalgegevens. Byte-gelijk in schema en zichtbare tekst, dus dezelfde string één keer opbouwen en op beide plekken gebruiken.]

## Bronnen

1. Rijkswaterstaat, BRL 100 versie 3.0, 5 december 2025, §2.5, §2.5.2, §2.5.7 en §3.3. https://iplo.nl/publish/pages/228185/2025-12-05-brl100-versie-3-0-beveiligd-en-printbaar.pdf
2. Verordening (EU) 2024/573, art. 7. https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32024R0573
3. Verordening (EU) nr. 910/2014 (eIDAS), art. 3 punt 10 t/m 12 en art. 25. https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32014R0910

## CTA-blok

Bestaande `Cta`. Tekst erboven: "Maak vandaag je eerste digitale werkbon. [TRIAL_DAGEN] dagen gratis, geen betaalgegevens nodig."

## Linkblok "Lees verder"

- `/f-gassen-registratie`: "F-gassen registratie: het logboek per installatie"
- `/brl-100-software`: "BRL 100: wat de auditor van je administratie vraagt"
- `/planningssoftware-monteurs`: "Planning voor monteurs"
- `/pricing`: "Prijzen, alles inbegrepen"

## Beantwoord door Rudy (15 september 2026)

- Wero: ja, als betaalmethode in de betaallink van de factuurmail. Zo formuleren.
- Offline: nee, er is een verbinding nodig. FAQ hierboven zegt dat. De
  homepage-FAQ ("werkbon kan worden ingevuld zonder verbinding") en de
  dubbelzinnige FAQ op `/features` moeten mee in taak 5b.
- Handtekening: naam, datum en tijdstip, geen IP-adres. Tekst hierboven klopt.
- Screenshot werkbon: op 16 september alsnog aangeleverd, zie bouwinstructies.

## Live-check (16 september 2026, commit `e958dd0`)

WebPage met `datePublished` uit git en `dateModified` 16 september, breadcrumb
"Home › Werkbon app", geen Article of Person, "Prijzen en functies
gecontroleerd op 16 september 2026" onder de H1, answer-first 59 woorden, 8
FAQ-antwoorden letterlijk in de HTML, twee echte tabellen, drie bronlinks,
link naar `/over/rudy-snel`. Geen "rapport", "EPBD", "Wero", "Tim",
"gelijkwaardig", "voldoet aan", "compliant" of u-vorm meer. Afwijkingen van de
lokale sessie (offline-zin weg, "installaties via CSV" weg, trial-constante,
datum 16 september) zijn akkoord. Wero: formulering uit `02` (betaallink in de factuurmail, klant betaalt met
iDEAL of Wero), in de functie "Direct factureren" en de FAQ "Kan ik direct
factureren". Screenshot staat lokaal als `public/werkbon-voorbeeld.png`.
