# Pagina: `/f-gassen-registratie` (uitbreiden, URL blijft)

Status: tekst publicatieklaar. Alle 17 features zijn bevestigd
(`02-feature-factcheck.md`), alle juridische claims staan in
`01-juridische-basis.md`. Geschreven 15 september 2026.

Waarom uitbreiden en niet vervangen: deze URL heeft de enige relevante positie
van snellio.nl (#5 voor "f-gassen logboek", 14 september 2026). De URL, de
`LandingHero`, de FAQ-component en het linkblok blijven. De tekst wordt
herschreven, drie secties komen erbij, en zes onjuiste of onbewezen claims gaan
eraf.

## Bouwinstructies

- Route blijft `app/f-gassen-registratie/page.tsx`. Maak `app/f-gassen-registratie/meta.ts`
  met `FGASSEN_PAGE = { path, datePublished, dateModified }`, zoals `BRL100_PAGE`.
  `datePublished` is de datum van de eerste publicatie van deze URL als die
  bekend is uit git, anders de dag van deploy. `dateModified` is de dag van deploy.
- Schema, via `lib/schemas.ts`: `Article` (headline = H1, `author` → `{ "@id": PERSON_ID }`,
  `publisher` → Organization `@id`, `datePublished`, `dateModified`, `citation`
  met de vier bronnen onderaan, `about`: "F-gassenregistratie",
  "Verordening (EU) 2024/573", "BRL 100"), `personSchema()` op de pagina zelf
  (zoals op `/brl-100-software`), `FAQPage` byte-gelijk aan de zichtbare FAQ,
  `BreadcrumbList`. `og:type` article via `buildMetadata` met de datums.
- Zichtbaar onder de H1, via `UpdatedOn`: "Bijgewerkt op [datum] · Door
  [Rudy Snel](/over/rudy-snel), oprichter van Snellio en STEK-gecertificeerd
  installateur". Datum gelijk aan `dateModified`. De naam is een link naar de
  auteurspagina.
- Taal: je-vorm. De huidige pagina staat in de u-vorm; alles omzetten.
- Schrijfwijze: "BRL 100" en "BRL 200" met spatie, ook in `badge`, `stats`,
  `features`, `voordelen`, `doelgroepen` en de metadata.
- Tabellen als echte `<table>` met `<th scope="col">`, geen afbeeldingen.
- Minimaal één echte screenshot uit Snellio (logboek per installatie of
  flesbalans), geanonimiseerd, met bijschrift en datum, als `ImageObject` in
  `Article.image`. Als er nog geen screenshot is: `public/kenplaat-voorbeeld.png`
  gebruiken bij de kenplaatsectie en de screenshot als open punt melden.
- `CERTS`-badges en `LandingHero` blijven. `stats` in de hero vervangen door de
  drie regels onder "Hero".
- Ook in deze taak, omdat het dezelfde claims zijn (zie `02-feature-factcheck.md`
  onderaan): `components/sections/SocialProof.tsx` "Volledig conform" en
  `lib/constants.ts` FEATURES "voldoen aan alle certificatie-eisen"
  herformuleren naar "werkregistratie en F-gassenbalans zoals BRL 100 vraagt".
- Sitemap: `lastModified` van deze URL uit `FGASSEN_PAGE.dateModified`.

## Verwijderen van de huidige pagina (met reden)

| Huidige tekst | Waarom weg | Wat ervoor in de plaats komt |
| --- | --- | --- |
| "BRL100-rapportage automatisch", "BRL100-conform rapport", hero-stat "Automatisch rapport" | BRL 100 kent geen "rapport". Het vraagt werkregistratie per handeling, logboek per circuit en een jaarlijkse balans (`02`, rij 1). | "Werkregistratie en F-gassenbalans zoals BRL 100 vraagt". |
| "Alle verplichte velden conform EU F-gas Verordening 2024/573" bij de lektest (detector, serienummer, ijkdatum, testdruk, standtijd) | De verordening vraagt alleen datum en resultaat van de lekcontrole (art. 7 onder f). Detector, monsterflesje en ijking zijn BRL 100 §2.5.7. | "Datum en resultaat zoals art. 7 vraagt, plus detector, ijkdatum, methode, druk en standtijd zoals BRL 100 §2.5.7 vraagt". |
| "Voldoet volledig aan", "Altijd compliant", "Volledig audittrail", "volledig digitaal", "F-gas compliant" (badge) | Verboden formulering (`CLAUDE.md`). Software kan niet "voldoen" aan een verordening die verplichtingen aan exploitanten en ondernemingen oplegt. | Benoem wat het systeem registreert en bewaart. |
| "Exporteerbaar voor RVO", "rapportage aan de RVO" | Installateurs rapporteren F-gassenregisters niet aan RVO. Het register is voor de bevoegde autoriteit (art. 7 lid 2); toezicht in Nederland is ILT. De auditor van de certificerende instelling toetst het (`01` §2). | "Export voor de auditor van je certificerende instelling en voor de Inspectie Leefomgeving en Transport". |
| Kaart "EPBD gereed: energieprestatie-documentatie conform de EPBD-richtlijn" | Staat niet in `02-feature-factcheck.md`. Niet bevestigd, niet claimen. | Kaart verwijderen. |
| Kaart "BRL100 Categorie 1" | BRL 100 v3.0 kent deelgebieden I, II en III; categorieën (A1, A2, B, C, D, E) horen bij BRL 200. | "BRL 100 deelgebied I: F-gassen en koolwaterstoffen zoals R290". |
| Kaart "BRL200 / B1 ondersteuning: ook geschikt voor BRL200 en B1-gecertificeerde bedrijven" | BRL 200 en B1 zijn persoonscertificaten, geen bedrijfscertificaten. | "Persoonscertificaten van je monteurs (BRL 200, aanvulling B1) vastleggen bij de medewerker". Alleen als de app dat veld heeft; anders kaart weg. |
| Praktijkvoorbeeld "Koelservice Noord", "directeur Peter", "0 tekortkomingen", "5 minuten", "−3 uur/week", "de auditor bevestigde dat de registraties volledig voldeden" | Niet verifieerbaar en leest als verzonnen. Op een pagina die om bronnen draait kost dit de geloofwaardigheid van de rest. | Sectie "Uit de eigen praktijk" hieronder, alleen met feiten die Rudy bevestigt. Geen cijfers zonder bron. |
| "2–3 uur per week" tijdsbesparing | Geen bron. | Weglaten, of Rudy's eigen ervaring met "bij Snel Airco's" erbij. |
| Doelgroepkaart "BRL100-gecertificeerd bedrijf: verplicht tot ... het genereren van gecertificeerde rapporten" | Onjuist: er bestaan geen "gecertificeerde rapporten". | Zie doelgroepen hieronder. |
| "TRA, werkvergunning en LMRA bij werk met R290" onder de kop "Altijd compliant" | Suggereert een wettelijke eis. LMRA staat niet in wet of BRL (`01` §3). | Verplaatsen naar de feature "Brandbare koudemiddelen" met de framing uit `01` §3. |

## Metadata

- URL: `/f-gassen-registratie` (ongewijzigd)
- Title: `F-gassen logboek en registratie: wat verplicht is | Snellio`
- Description: `Wat er in het F-gassenlogboek per installatie moet staan (art. 7), wanneer lekcontrole verplicht is (art. 5), wat BRL 100 extra vraagt en hoe Snellio dat vanuit de werkbon bijhoudt.`
- Primaire term: f-gassen logboek (positie #5). Secundair: kenplaat koelinstallatie (170),
  logboek koelinstallatie (20), digitaal logboek koelinstallatie (20), f-gassen
  registratie (10), koudemiddel registratie (10), logboek airco verplicht (10).
- Breadcrumb: Home › F-gassen registratie

## Hero

- Badge: `Verordening (EU) 2024/573 · BRL 100 · Logboek · Flesbalans`
- H1: `F-gassen registratie: het logboek per installatie,` met accent `de lekcontrole en de flesbalans.`
- Sub (dit is de answer-first alinea, 53 woorden): zie hieronder onder de H1.
- CTA's ongewijzigd. Trustline ongewijzigd.
- Stats: `7` / `registerpunten in art. 7`, `5 jaar` / `bewaren, exploitant én installateur`, `0` / `keer overtypen vanaf de werkbon`.

---

# F-gassen registratie: het logboek per installatie, de lekcontrole en de flesbalans

*Bijgewerkt op [DATUM] · Door [Rudy Snel](/over/rudy-snel), oprichter van Snellio en STEK-gecertificeerd installateur*

F-gassen registratie is het vastleggen van elke handeling met koudemiddel: vullen, aftappen, lekcontrole en buitendienststelling. Verordening (EU) 2024/573 verplicht een register per apparaat vanaf 5 ton CO2-equivalent (art. 7). BRL 100 vraagt daarbovenop een werkregistratie per handeling en een jaarlijkse F-gassenbalans. Snellio houdt dat bij vanuit de werkbon, per installatie en per fles.

**In het kort**

- Het logboek uit art. 7 hoort bij de installatie en is een plicht van de exploitant. Jij als uitvoerende onderneming bewaart vijf jaar een kopie (art. 7 lid 2).
- De plicht geldt voor apparatuur die onder art. 5 lid 1 valt: 5 ton CO2-equivalent of meer aan F-gassen uit bijlage I, of 1 kg of meer HFO's uit bijlage II deel 1. Hermetisch gesloten apparatuur onder 10 ton (of onder 3 kg in woningen) is uitgezonderd.
- BRL 100 kijkt niet naar die drempel: een gecertificeerd bedrijf registreert elke handeling aan elke installatie, per zelfstandig circuit (BRL 100 v3.0 §2.5.2).
- Flesregistratie en de jaarlijkse F-gassenbalans in kilogram én CO2-equivalent zijn BRL 100-eisen (§3.3), geen eis uit de verordening.
- Op de kenplaat zijn alleen de velden uit art. 12 verplicht. Een QR-code naar het logboek is een extra.

## Wat moet er in het F-gassenlogboek staan?

Art. 7 lid 1 van Verordening (EU) 2024/573 schrijft per apparaat zeven onderdelen voor. Dit is de lijst waar een auditor je logboek naast legt:

1. De hoeveelheid en het type F-gas in het apparaat, met de bij installatie toegevoegde hoeveelheid apart vermeld.
2. De hoeveelheden die bij onderhoud, service of na een lekkage zijn toegevoegd, met datum.
3. De hoeveelheid teruggewonnen gas.
4. Bij toegevoegd gas: of het gerecycled of geregenereerd is, met naam, adres en certificaatnummer van het recycling- of regeneratiebedrijf.
5. De identiteit van de onderneming die installeerde, servicede, onderhield, terugwon, repareerde, op lekkage controleerde of buiten dienst stelde, met certificaatnummer, en bij een rechtspersoon ook de natuurlijke persoon die het werk deed.
6. De datums en resultaten van de lekcontroles en van reparaties.
7. Bij buitendienststelling: de maatregelen voor terugwinning en verwijdering van het gas.

Bewaartermijn (art. 7 lid 2): de exploitant bewaart het register ten minste vijf jaar. De onderneming die de werkzaamheden uitvoert bewaart ten minste vijf jaar een kopie. Beide stellen het op verzoek beschikbaar aan de bevoegde autoriteit, in Nederland de Inspectie Leefomgeving en Transport.

Wat er niet in art. 7 staat: het serienummer van je lekdetector, de ijkdatum, de testdruk en de standtijd. Die horen bij de BRL 100-eisen aan je meetinstrumenten (§2.5.7), niet bij het wettelijke register. In Snellio leg je ze op dezelfde werkbon vast, maar het is goed om te weten welk deel wettelijk is en welk deel certificatie.

## Voor welke installaties is het logboek verplicht?

Het register uit art. 7 geldt voor apparatuur die op grond van art. 5 lid 1 op lekkage moet worden gecontroleerd. Dat zijn installaties met 5 ton CO2-equivalent of meer aan F-gassen uit bijlage I, of 1 kg of meer aan HFO's uit bijlage II deel 1.

Uitgezonderd is hermetisch gesloten apparatuur, mits als zodanig geëtiketteerd, onder 10 ton CO2-equivalent (bijlage I) of onder 2 kg (bijlage II deel 1). In woningen geldt voor hermetisch gesloten apparatuur een grens van 3 kg.

Rekenvoorbeeld met de GWP-waarden uit bijlage I van de verordening:

| Installatie | Koudemiddel | GWP (100 jaar) | CO2-equivalent | Onder art. 5 en 7? |
| --- | --- | --- | --- | --- |
| Split-airco, 1,2 kg | R32 | 675 | 0,81 ton | Nee, onder 5 ton |
| Split-airco, 7,5 kg | R32 | 675 | 5,06 ton | Ja |
| Koelinstallatie, 3 kg | R410A (50% R32, 50% R125) | circa 2 088 | 6,26 ton | Ja |
| Warmtepomp, 2 kg | R290 (propaan) | geen F-gas | n.v.t. | Nee, geen F-gas. Wel BRL 100-werkregistratie |

De frequentie van de lekcontrole hangt af van de vulling (art. 5 lid 6):

| Vulling bijlage I | Vulling bijlage II deel 1 | Zonder lekkagedetectiesysteem | Met lekkagedetectiesysteem |
| --- | --- | --- | --- |
| minder dan 50 ton CO2-eq | minder dan 10 kg | ten minste elke 12 maanden | ten minste elke 24 maanden |
| 50 tot 500 ton CO2-eq | 10 tot 100 kg | ten minste elke 6 maanden | ten minste elke 12 maanden |
| 500 ton CO2-eq of meer | 100 kg of meer | ten minste elke 3 maanden | ten minste elke 6 maanden |

Vanaf 500 ton CO2-equivalent is een lekkagedetectiesysteem verplicht (art. 6). Na een reparatie van een lekkage volgt een controle door een gecertificeerde persoon, op z'n vroegst na 24 uur bedrijfstijd en uiterlijk binnen een maand (art. 4 lid 5).

Voor jou als BRL 100-bedrijf verandert de drempel weinig. BRL 100 v3.0 §2.5.2 vraagt een werkregistratie van elke handeling aan elke installatie, ook onder de 5 ton en ook bij R290. Het verschil zit in wie verantwoordelijk is: onder de drempel is er geen wettelijk register van de exploitant, maar jouw werkregistratie moet er altijd zijn.

## Wat BRL 100 daar bovenop vraagt

BRL 100 versie 3.0 (Rijkswaterstaat, 5 december 2025, formeel in werking op 31 augustus 2026) stelt drie registratie-eisen die niet in de verordening staan:

- **Werkregistratie per handeling en per circuit** (§2.5.2). Elke handeling aan een installatie wordt vastgelegd, met aparte registratie per zelfstandig circuit. De eigenaar of exploitant krijgt aantoonbaar een kopie, digitaal mag. Het origineel bewaar je minimaal vijf jaar.
- **Jaarlijkse F-gassenbalans** (§3.3). Per type F-gas, in kilogram én in CO2-equivalent: ingekocht, gebruikt, teruggewonnen, afgevoerd, voorraad. Verklaarde en niet-verklaarde verschillen benoem je. Zonder registratie per fles is die balans niet te maken.
- **Meetinstrumenten** (§2.5.5 tot en met §2.5.7). Manometers en vacuümmeters elke 24 maanden vergelijken met een gekalibreerde referentiemeter, thermometers jaarlijks, de weegschaal kalibreren of met een ijkgewicht controleren, en het lekdetectietoestel vóór gebruik testen met een monsterflesje. Van elke controle leg je vast: toestel, datum, meetwaarden, afwijkingen en wie het deed.

Bij de audit controleert de certificerende instelling onder meer of het logboek is aangevuld, of de gegevens uit art. 7 kloppen, of de drukbeproeving op de werkbon staat en of het logboek aan de eigenaar is overgedragen. Wat de auditor verder toetst, staat in [BRL 100: wat de auditor van je administratie vraagt](/brl-100-software).

## De kenplaat: wat verplicht is en wat extra

Art. 12 van de verordening bepaalt wat er op het etiket van koel-, klimaat- en warmtepompapparatuur moet staan:

- de vermelding dat het apparaat F-gassen bevat of nodig heeft;
- de benaming van het gas (industriële of chemische naam);
- de hoeveelheid in kilogram én in CO2-equivalent, of de ontwerphoeveelheid, en het GWP;
- waar van toepassing: "hermetisch gesloten";
- duidelijk leesbaar en onuitwisbaar, bij de service-aansluitingen of op het gasvoerende deel, in de taal van de lidstaat.

Een QR-code, het BRL-nummer van je bedrijf of je bedrijfsgegevens zijn niet wettelijk verplicht. BRL 100 §3 vraagt wel dat je bij elke installatie vaststelt of het etiket volgens art. 12 aanwezig is, en de exploitant wijst op het ontbreken ervan.

Snellio print een kenplaat met de velden uit art. 12 en daarbij een QR-code naar het logboek van de installatie, op je eigen labelprinter. Wie de code scant, ziet de specificaties en de werkhistorie bij het apparaat. Hoe dat werkt: [De kenplaat wordt digitaal](/blog/digitaal-logboek-qr-kenplaat).

*[Afbeelding: `public/kenplaat-voorbeeld.png`, bijschrift "Kenplaat uit Snellio met de velden uit art. 12 en een QR-code naar het logboek. Foto: Snel Airco's, juli 2026."]*

## Waar het misgaat zonder systeem

- **Logboek in Excel of op papier.** Niet gekoppeld aan de werkbon, dus de monteur vult het later in of vergeet het. Bij de audit klopt het logboek niet met de werkbonnen.
- **Geen registratie per fles.** Dan is de F-gassenbalans van BRL 100 §3.3 niet te maken en blijven verschillen onverklaard.
- **Lekcontrole zonder vastgelegde detector.** Datum en resultaat staan er wel, maar niet met welk toestel en of het vóór gebruik met een monsterflesje getest is (§2.5.7).
- **Geen kopie naar de exploitant.** BRL 100 vraagt dat je aantoonbaar een kopie van de werkregistratie hebt overgedragen. Een pdf op je eigen server bewijst dat niet.

## Hoe Snellio de registratie bijhoudt

Alleen wat op 15 september 2026 in de app is bevestigd (`02-feature-factcheck.md`).

- **Logboek per installatie, per circuit.** Elke handeling op de werkbon (vullen, aftappen, lekcontrole, buitendienststelling) komt in het logboek van de installatie, met datum, monteur, hoeveelheid in gram en het resultaat. Het logboek is per installatie te exporteren en te delen met de exploitant.
- **Koudemiddelregistratie en F-gassenbalans zoals BRL 100 vraagt.** Je maakt een fles aan met type, serienummer en begingewicht. Bij elke werkbon boek je uit welke fles je hebt gevuld of afgetapt. Snellio houdt het restgewicht per fles bij en telt per periode op wat je nodig hebt voor de balans, in kilogram en CO2-equivalent.
- **Lekcontrole met instrumentgegevens.** Datum en resultaat zoals art. 7 vraagt, plus detector, serienummer, ijkdatum, testmethode, testdruk en standtijd zoals BRL 100 §2.5.7 vraagt. Bij een lekkage leg je oorzaak en maatregel vast. Snellio waarschuwt wanneer de ijkdatum van een lekdetector verloopt.
- **Kenplaat met QR-code.** Printbaar op je eigen labelprinter, met de velden uit art. 12 en een QR-code naar het logboek.
- **Export per installatie en per periode.** CSV en pdf, voor de auditor van je certificerende instelling, voor de Inspectie Leefomgeving en Transport en voor de exploitant.
- **Gekoppeld aan werkbon en klant.** De registratie hoort bij de werkbon, de installatie en het klantdossier. Geen tweede systeem, geen overtypen. Zie [werkbon software](/werkbon-software) en [CRM voor installateurs](/crm-voor-installateurs).
- **Brandbare koudemiddelen.** Bij werk aan R290 en andere brandbare koudemiddelen vraagt BRL 100 versie 3.0 een taakrisicoanalyse als de werkzaamheden risico's meebrengen, en in een ATEX-gevarenzone aanvullende maatregelen die in het explosieveiligheidsdocument en de werkvergunning staan. Snellio maakt bij zo'n werkorder een veiligheidsdossier aan: een TRA met risico's en beheersmaatregelen, een werkvergunning waar die nodig is, en een LMRA die de monteur ter plaatse invult. De LMRA is een werkwijze uit de VCA-praktijk, geen wettelijke eis. Het explosieveiligheidsdocument blijft de verantwoordelijkheid van de exploitant.
- **In elk pakket.** Logboek, flesregistratie, balans en kenplaat zitten in elk pakket, ook in Starter (`INBEGREPEN`). Zie [prijzen](/pricing).

## Voor wie

- **Koeltechnisch installateur (BRL 100 deelgebied I).** Werkt aan installaties met F-gassen en koolwaterstoffen en moet elke handeling per circuit vastleggen.
- **Airco- en warmtepompinstallateur.** Werkt met R32, R410A en R290. De meeste split-airco's vallen onder de 5 ton uit art. 5, maar de BRL 100-werkregistratie geldt altijd.
- **Koeltechnisch servicebedrijf.** Doet periodieke lekcontroles bij commerciële koelinstallaties boven de drempel en moet datum, resultaat en reparaties per installatie kunnen tonen.
- **Zzp'er met BRL 100 en BRL 200.** Heeft dezelfde registratieplicht als een bedrijf met personeel, zonder kantoor dat het achteraf invoert.

## Uit de eigen praktijk

*Alleen publiceren na bevestiging door Rudy. Twee feiten volstaan: sinds wanneer Snel Airco's de registratie in Snellio doet, en wat de laatste audit van de certificerende instelling over de registraties heeft gezegd (letterlijk uit het auditrapport, of weglaten). Geen cijfers over tijdwinst zonder meting.*

Snellio is gebouwd door Rudy Snel, eigenaar van Snel Airco's, een koeltechniekbedrijf dat zelf onder BRL 100 werkt. De registratie op deze pagina is de registratie die hij voor zijn eigen audit bijhoudt. [BEVESTIGDE ZIN OVER DE LAATSTE AUDIT, OF WEGLATEN.]

## Veelgestelde vragen

**Wat is F-gassen registratie?**

F-gassen registratie is het vastleggen van elke handeling met gefluoreerde broeikasgassen in koel-, klimaat- en warmtepompinstallaties: vullen bij installatie, bijvullen bij onderhoud, terugwinnen, lekcontroles, reparaties en buitendienststelling. Verordening (EU) 2024/573 schrijft in art. 7 voor wat er per apparaat in het register moet staan. BRL 100 vraagt daarnaast een werkregistratie per handeling en een jaarlijkse F-gassenbalans.

**Wat moet er in het F-gassenlogboek staan?**

Art. 7 lid 1 van Verordening (EU) 2024/573 noemt zeven onderdelen: de hoeveelheid en het type gas in het apparaat, de hoeveelheden die bij onderhoud of na lekkage zijn toegevoegd met datum, de teruggewonnen hoeveelheid, of toegevoegd gas gerecycled of geregenereerd is met de gegevens van dat bedrijf, de onderneming en persoon die het werk deed met certificaatnummer, de datums en resultaten van lekcontroles en reparaties, en bij buitendienststelling de maatregelen voor terugwinning en verwijdering.

**Is een logboek verplicht voor een airco?**

Het register uit art. 7 is verplicht voor apparatuur die onder art. 5 lid 1 valt: 5 ton CO2-equivalent of meer aan F-gassen. Een split-airco met 1,2 kg R32 (GWP 675) bevat 0,81 ton CO2-equivalent en valt daar niet onder. Een installatie met 3 kg R410A (GWP circa 2 088) zit op 6,26 ton en valt er wel onder. Een BRL 100-gecertificeerd bedrijf legt daarnaast elke handeling vast, ook onder de drempel (BRL 100 v3.0 §2.5.2).

**Hoe vaak moet een lekcontrole plaatsvinden?**

Art. 5 lid 6 van Verordening (EU) 2024/573: bij minder dan 50 ton CO2-equivalent ten minste elke 12 maanden, bij 50 tot 500 ton elke 6 maanden en bij 500 ton of meer elke 3 maanden. Met een lekkagedetectiesysteem verdubbelt de termijn naar 24, 12 en 6 maanden. Vanaf 500 ton is zo'n systeem verplicht (art. 6). Na reparatie van een lekkage volgt een controle na ten minste 24 uur bedrijfstijd en uiterlijk binnen een maand (art. 4 lid 5).

**Hoe lang moet je het F-gassenlogboek bewaren?**

Ten minste vijf jaar. Art. 7 lid 2 van Verordening (EU) 2024/573 legt die termijn op aan de exploitant voor het register en aan de onderneming die de werkzaamheden uitvoert voor een kopie. BRL 100 v3.0 §2.5.2 vraagt van het gecertificeerde bedrijf dat het origineel van de werkregistratie minimaal vijf jaar bewaard blijft. In Snellio blijft het logboek per installatie bewaard zolang je account bestaat en is het per installatie te exporteren.

**Wat moet er op de kenplaat van een koelinstallatie staan?**

Art. 12 van Verordening (EU) 2024/573 verplicht op het etiket: dat het apparaat F-gassen bevat, de naam van het gas, de hoeveelheid in kilogram en in CO2-equivalent en het GWP, en waar van toepassing "hermetisch gesloten". Het etiket moet leesbaar en onuitwisbaar zijn, bij de service-aansluitingen of op het gasvoerende deel, in de taal van de lidstaat. Een QR-code of BRL-nummer is niet verplicht. Snellio print de kenplaat met de velden uit art. 12 en een QR-code naar het logboek, op je eigen labelprinter.

**Hoe werkt de flesregistratie in Snellio?**

Je maakt een fles aan met type koudemiddel, serienummer en begingewicht. Bij elke werkbon registreer je hoeveel je uit welke fles hebt gevuld of afgetapt, in gram. Snellio berekent het resterende gewicht en houdt de vulhistorie per fles bij. Per periode telt Snellio op wat je voor de F-gassenbalans van BRL 100 §3.3 nodig hebt: per type F-gas, in kilogram en CO2-equivalent.

**Ondersteunt Snellio R290 en andere brandbare koudemiddelen?**

Ja. Je stelt per installatie het koudemiddel in, ook R290 (propaan), R600a, R32, R410A en andere HFK- en HFO-koudemiddelen. GWP en CO2-equivalent berekent Snellio voor de balans; R290 is geen F-gas en telt daarin niet mee, maar de werkregistratie van BRL 100 geldt wel. Bij een werkorder met een brandbaar koudemiddel maakt Snellio een veiligheidsdossier aan: een TRA met risico's en beheersmaatregelen, een werkvergunning waar die nodig is, en een LMRA die de monteur ter plaatse invult en aftekent.

## Bronnen

1. Verordening (EU) 2024/573 van het Europees Parlement en de Raad betreffende gefluoreerde broeikasgassen, art. 4, 5, 6, 7 en 12 en bijlage I. https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32024R0573
2. Rijkswaterstaat, BRL 100 versie 3.0, 5 december 2025, §2.5.2, §2.5.5 tot en met §2.5.7, §3 en §3.3. https://iplo.nl/publish/pages/228185/2025-12-05-brl100-versie-3-0-beveiligd-en-printbaar.pdf
3. Rijkswaterstaat, Nota ter informatie overgangsregeling BRL100 certificering. https://iplo.nl/publish/pages/228185/nota-ter-informatie-overgangsregeling-brl100-certificering.pdf
4. Ondernemersplein (RVO), Certificaat voor werken met F-gassen. https://ondernemersplein.overheid.nl/wetten-en-regels/certificaat-voor-werken-met-f-gassen/

## CTA-blok

Bestaande `Cta`-component. Tekst erboven: "Probeer de registratie 14 dagen gratis met je eigen installaties en flessen. Geen betaalgegevens nodig."

## Linkblok "Lees verder"

- `/brl-100-software`: "BRL 100: wat de auditor van je administratie vraagt"
- `/blog/digitaal-logboek-qr-kenplaat`: "De kenplaat wordt digitaal: het logboek achter een QR-code"
- `/blog/f-gas-verordening-2024`: "EU F-gas verordening 2024/573: wat verandert er"
- `/werkbon-software`: "Werkbon software: de registratie begint op de werkbon"

## Open punten voor Rudy

1. Screenshot logboek per installatie of flesbalans, geanonimiseerd.
2. Sectie "Uit de eigen praktijk": sinds wanneer, en één zin uit het laatste auditrapport of weglaten.
3. Heeft de app een veld voor persoonscertificaten van monteurs (BRL 200, B1)? Zo nee: kaart weglaten.
