# Feature factcheck

Deze repo is de marketingsite. Geen regel code hierin bewijst dat een functie in
app.snellio.nl werkt. De kolom "Bewijs in repo" zegt alleen: waar staat de claim,
sinds wanneer, en is er iets sterkers dan marketingtekst (screenshot, juridisch
document). De kolom **"Bevestigd in app"** vul je in na controle in een live
account. Pas daarna mag een feature in nieuwe content.

Laatst bijgewerkt: 15 oktober 2026. Rijen 1 t/m 22 beantwoord door Rudy Snel op 15 september 2026 (21 bevestigd, offline werken bevestigd als niet beschikbaar). Rijen 23 t/m 29 (blogposts en planningpagina) bevestigd door Rudy Snel op 16 september 2026. Rijen 30 t/m 36 (BRL 100 v3.0-handboek) op 15 oktober 2026 gecontroleerd in de app-code (snellio-app, commit 423c1a0) en de productiedatabase, positionering en formulering akkoord Rudy Snel. Alle 36 rijen beantwoord.

| Feature | Status | Bewijs in repo | Mag publiek geclaimd worden | Bevestigd in app (datum, door) |
| --- | --- | --- | --- | --- |
| BRL 100 rapportage | Geclaimd | `/features`, `/f-gassen-registratie` ("BRL100-conform rapport"), pillar, `lib/constants.ts` INBEGREPEN, `public/llms.txt`. Geen screenshot. | Ja, mits bevestigd, **en herformuleren**: BRL 100 kent geen "rapport" maar werkregistratie per handeling, logboek per circuit en jaarlijkse F-gassenbalans. Schrijf "werkregistratie en F-gassenbalans zoals BRL 100 vraagt". | [x] 15-09-2026, Rudy Snel |
| F-gassenlogboek per installatie | Gedeeltelijk bewezen | Claim op 3 pagina's; blogpost `digitaal-logboek-qr-kenplaat` (23 juli 2026) met foto; alt-tekst dashboard noemt koudemiddelflessen. | Ja, mits bevestigd. | [x] 15-09-2026, Rudy Snel |
| Flesbalans / koudemiddelregistratie | Geclaimd | `/f-gassen-registratie`: "restgewicht per fles", "balans"; `/features`: "F-gas balans per periode". | Ja, mits bevestigd. Formuleer als "koudemiddelregistratie en F-gassenbalans zoals BRL 100 vraagt". | [x] 15-09-2026, Rudy Snel |
| QR-code op kenplaat | Sterkst onderbouwd | `public/kenplaat-voorbeeld.png` (foto van geprinte kenplaat met QR), blogpost, commits 23 juli 2026. | Ja. Scheid wettelijke velden (art. 12) van de QR-code als extra. | [x] 15-09-2026, Rudy Snel |
| Kenplaatprinter | Geclaimd, beperkt | `/features`: "Heb je een kenplaatprinter, dan print je..."; `llms.txt`. Geen model of driver genoemd. | Alleen als "printbaar op je eigen labelprinter". Geen compatibiliteit met specifieke modellen claimen. | [x] 15-09-2026, Rudy Snel |
| Automatische lektestwaarschuwingen | Onduidelijk | Alleen `app/features/page.tsx:48` "Waarschuwing bij lekkoets [sic]". `/f-gassen-registratie` noemt alleen de ijkdatum-signalering. | **Nee**, tot bevestigd. Typfout eerst fixen. | [x] 15-09-2026, Rudy Snel |
| Waarschuwing ijkdatum lekdetector | Geclaimd | `/f-gassen-registratie` "Signalering lekdetector ijkdatum"; `/features:48`. | Ja, mits bevestigd. | [x] 15-09-2026, Rudy Snel |
| TRA | Geclaimd, vers | Toegevoegd 12 sept 2026 (commit "veiligheidsdossier bij R290 op de site"), label "Nieuw", `/features`, pillar, INBEGREPEN. Geen screenshot. | Alleen na bevestiging, met de framing uit `01-juridische-basis.md` §3. | [x] 15-09-2026, Rudy Snel |
| LMRA | Geclaimd, vers | Idem. | Idem. Nooit als wettelijke eis. | [x] 15-09-2026, Rudy Snel |
| Werkvergunning | Geclaimd, vers | Idem. Velden: nummer, geldigheid, gasmeting, LEL, zone-afzetting, brandwacht. | Idem. | [x] 15-09-2026, Rudy Snel |
| Moneybird-koppeling | Gedeeltelijk bewezen | Claim op 11 bestanden; privacybeleid (commit 23 juli 2026) noemt WeFact/Moneybird/Exact als verwerkers. | Ja. | [x] 15-09-2026, Rudy Snel |
| WeFact-koppeling | Gedeeltelijk bewezen | Idem. | Ja. | [x] 15-09-2026, Rudy Snel |
| Exact Online-koppeling | Gedeeltelijk bewezen | Idem. `llms.txt` noemt ook SnelStart, nergens anders. | Ja voor Exact Online. SnelStart niet. | [x] 15-09-2026, Rudy Snel |
| Google Calendar-sync | Geclaimd | 7 bestanden; `public/planning-preview.png` met alt-tekst over sync. | Ja, mits bevestigd. | [x] 15-09-2026, Rudy Snel |
| Mollie/iDEAL op klantfacturen | Geclaimd, valkuil | Claim op features/pillar. De Mollie-code in deze repo (`app/api/mollie/webhook`, `app/api/checkout`) betreft Snellio's eigen abonnementen, niet klantfacturen. | Ja, mits bevestigd in app. Repo-code is hier geen bewijs. | [x] 15-09-2026, Rudy Snel |
| Import bestaande installaties | Gedeeltelijk | `/alternatief-voor-crm-installateurs:79`: CSV-import van klantgegevens, locaties en historische werkorders. Installaties niet genoemd. | "Klanten, locaties, werkorders en installaties via CSV-import of via de API" (installaties en API bevestigd 16-09-2026, rij 27). | [x] 15-09-2026, Rudy Snel |
| Export van data | Geclaimd | Pillar-FAQ: CSV en PDF; `/f-gassen-registratie`: per installatie en per periode. | Ja, mits bevestigd. | [x] 15-09-2026, Rudy Snel |
| BRL 200-nummer per monteur | Bevestigd | Veld in de monteursinstellingen van de app. Geen B1-veld. | "BRL 200-nummer van je monteurs bij de medewerker" (of "in de monteursinstellingen"). Geen B1, geen "certificaat-ondersteuning". | [x] 15-09-2026, Rudy Snel |
| Lekcontroletermijn berekend uit CO2-equivalent (art. 5 lid 6) | Bevestigd | De app berekent het CO2-equivalent van de vulling en de lekcontroletermijn zelf; installaties vanaf 5 ton CO2-equivalent komen in de forecast. | "Snellio berekent het CO2-equivalent van de vulling en zet de lekcontrole in de forecast voor installaties vanaf 5 ton CO2-equivalent (art. 5 lid 1), met de termijn uit art. 5 lid 6." Niet claimen dat de hermetische uitzonderingen of het lekkagedetectiesysteem automatisch worden meegewogen; dat is niet gevraagd. | [x] 15-09-2026, Rudy Snel |
| Wero als betaalmethode | Bevestigd | Wero zit niet op de werkbon of de werkbonpagina zelf, maar in de betaallink (Mollie) in de e-mail waarmee de factuur wordt verzonden. Rudy, 16-09-2026. | "De factuur gaat per e-mail met een betaallink via Mollie; de klant betaalt met iDEAL of Wero." Niet: "Wero-betaallink op de werkbon". | [x] 15-09-2026, Rudy Snel |
| Offline werken | **Niet beschikbaar** | Homepage-FAQ claimt "werkbon kan worden ingevuld zonder verbinding, sync zodra hij online komt"; `/features`-FAQ is dubbelzinnig. Rudy: er is een verbinding nodig. | **Nooit** claimen. Schrijf: "Snellio werkt in de browser en heeft een internetverbinding nodig." | [x] 15-09-2026, Rudy Snel (bevestigd dat het niet kan) |
| Vastlegging bij handtekening | Bevestigd | Naam, datum en tijdstip van de ondertekenaar. Geen IP-adres. | "Naam, datum en tijdstip worden vastgelegd." Geen IP, geen apparaat, geen "tijdstempel met bewijskracht". | [x] 15-09-2026, Rudy Snel |
| WhatsApp-aanvragen met AI-assistent | Bevestigd | `blog/drukste-zomer...`: AI-assistent op een WhatsApp-nummer vraagt installatie, adres en postcode uit; "ruim 300 werkorders en ruim 240 nieuwe klanten deze zomer". | Ja. De aantallen uit de zomerblog alleen als ze uit het dashboard komen. | [x] 16-09-2026, Rudy Snel |
| Planningsvoorstel per e-mail met akkoord-knop | Bevestigd | Idem: klant krijgt mail met akkoord, afwijzen of ander moment; groen of oranje in Google Agenda. | Ja. | [x] 16-09-2026, Rudy Snel |
| AI-fotorapport (pdf uit foto's en toelichting) | Bevestigd | Idem: foto's met korte toelichting, assistent schrijft technisch rapport, pdf als bijlage. | Ja. | [x] 16-09-2026, Rudy Snel |
| Controle nominale vulling bij bijvullen op nieuwe installatie | Bevestigd | Idem: bij opslaan van de werkorder vraagt het programma of de nominale vulling aangepast moet worden. | Ja. | [x] 16-09-2026, Rudy Snel |
| Import van installaties (CSV of API) | Bevestigd | Blog-FAQ: "via een import of via de API". Rij 15 dekt alleen klanten, locaties en werkorders via CSV. | Ja: "klanten, locaties, werkorders en installaties via CSV-import of via de API". | [x] 16-09-2026, Rudy Snel |
| Werkorderstatus onderweg, bezig, afgerond | Bevestigd | "Monteur markeert de werkorder als onderweg, bezig of afgerond. U ziet de voortgang realtime." | Ja. | [x] 16-09-2026, Rudy Snel |
| Planningsoverzicht per dag, week en monteur; eigen login per monteur | Bevestigd | Functiekaarten en FAQ. | Ja. | [x] 16-09-2026, Rudy Snel |
| BRL 100 v3.0-handboek, ingevuld met eigen bedrijfsgegevens | Bevestigd | App: `content/brl100/`, 57 hoofdstukken (0.1 t/m KF.23) met plaatshouders zoals `{{bedrijf.naam}}` die de app vult uit de bedrijfsgegevens. | "Een kwaliteitshandboek gebaseerd op BRL 100 v3.0, 57 hoofdstukken, ingevuld met je eigen bedrijfsgegevens." **Niet**: "compleet", "goedgekeurd", "gecertificeerd", "garandeert certificering", Kiwa-naam of -logo. Altijd met "Het handboek vervangt de beoordeling door je certificerende instelling niet." in de buurt. | [x] 15-10-2026, app-code, akkoord Rudy Snel |
| Certificaten monteurs en meetmiddelen live in het handboek | Bevestigd | App: `lib/handboek/render.ts` leest de tabellen `monteur_certificaten` en `meetinstrumenten`. Onderaannemers zijn een tekstveld (`onderaannemers_tekst`) dat de klant zelf invult. | "Certificaten van je monteurs en je meetmiddelen komen live uit Snellio. Je onderaannemers vul je één keer in." **Niet**: onderaannemers "live" of "automatisch". | [x] 15-10-2026, app-code, akkoord Rudy Snel |
| Online lezen met leesbevestiging per monteur | Bevestigd | App: leesbevestigingen per monteur per handboekversie. | "Monteurs lezen het handboek online en bevestigen per versie dat ze het gelezen hebben." | [x] 15-10-2026, app-code, akkoord Rudy Snel |
| Handboek afdrukken of als PDF opslaan | Bevestigd | App: `/dashboard/handboek/afdrukken`, afdrukken via de browser (opslaan als PDF), alleen bij volledige toegang. | "Af te drukken of als PDF op te slaan." Geen "PDF-export met één klik" of eigen PDF-generator claimen. | [x] 15-10-2026, app-code, akkoord Rudy Snel |
| Inhoud: brandbare koudemiddelen en Verordening (EU) 2024/573 | Bevestigd | App: deelgebied I "F-gassen en koolwaterstoffen" (0.2, A.03, B.01), hoofdstukken over R290, TRA, EVD en ATEX; 2024/573 in 10 hoofdstukken. | "Met hoofdstukken over brandbare koudemiddelen (R290), TRA, EVD en ATEX, en de registratie uit Verordening (EU) 2024/573." Wettelijke status van TRA, EVD en werkvergunning alleen per `01-juridische-basis.md` §3. Over de meetmiddelen: de controle bestond al in 2.0; nieuw voor brandbare koudemiddelen is de gasmeter met alarm op 10% en 20% LEL (§3). Niet schrijven dat de meetmiddeleneisen in 3.0 nieuw of strenger zijn. | [x] 15-10-2026, app-code, akkoord Rudy Snel |
| Toegang: alleen Basis, Pro en Enterprise met jaarbetaling | Bevestigd | App: `lib/handboek/toegang.ts` (HANDBOEK_PAKKETTEN) en trigger `tr_bedrijfsgegevens_handboek_jaartoegang` (migraties 20261022 en 20261023, live 15-10-2026). Starter, maandbetaling en proefperiode: voorbeeld met inhoudsopgave en hoofdstuk A.01, zonder tenantgegevens. Na het einde van het jaarabonnement 30 dagen alleen lezen. Voetregel: alleen te gebruiken bij een actief Snellio-abonnement. | FAQ-tekst: "Bij Basis, Pro en Enterprise met jaarbetaling. Bij Starter, bij een maandabonnement en in de proefperiode zie je een voorbeeld: de inhoudsopgave en het eerste hoofdstuk, zonder je eigen gegevens. Het handboek mag je gebruiken zolang je abonnement loopt. Stopt je jaarabonnement, dan kun je het nog 30 dagen lezen." Badge: "Inbegrepen bij Basis, Pro en Enterprise met jaarbetaling". **Niet**: "bij elk abonnement" of "bij elk jaarabonnement". Positionering: het handboek is een document bij jaarbetaling, geen functie; "alle functies in elk pakket" blijft staan. | [x] 15-10-2026, app-code en productiedatabase, akkoord Rudy Snel |
| Gemaakt door een gecertificeerd installateur | Bevestigd | Eigen verklaring Rudy Snel, 15-10-2026. Auteurspagina `/over/rudy-snel`. | "Gemaakt door een gecertificeerd installateur die het zelf gebruikt voor zijn eigen BRL 100-certificering." **Niet**: de naam van een certificerende instelling of een audituitslag noemen. | [x] 15-10-2026, Rudy Snel |

## Drie tekstfixes op productie (uitgevoerd 15 september 2026)

1. `app/features/page.tsx:48`: "lekkoets" moet "lektest" zijn.
2. `public/llms.txt`: SnelStart verwijderen uit de koppelingenlijst, of bevestigen.
3. Overal waar staat "flesregistratie conform 2024/573": de verordening regelt
   het logboek per apparaat (art. 7), flesregistratie en balans zijn BRL 100-eisen.
   Zie `01-juridische-basis.md` §5.

## Consequentie voor nieuwe content

Alle rijen zijn beantwoord. Elke bevestigde feature in de tabel mag in nieuwe content, met
de formuleringsregels uit de kolom "Mag publiek geclaimd worden": geen
"BRL100-rapport" maar werkregistratie en F-gassenbalans; kenplaat "printbaar op
je eigen labelprinter"; TRA, LMRA en werkvergunning uitsluitend met de framing
uit `01-juridische-basis.md` §3; installatie-import als "klanten, locaties,
werkorders en installaties via CSV-import of via de API". SnelStart blijft buiten alle lijsten. Het BRL 100-handboek (rijen 30 t/m 36): altijd "gebaseerd op BRL 100 v3.0", nooit "goedgekeurd" of Kiwa, en de toegang altijd als "Basis, Pro en Enterprise met jaarbetaling".

Nog open op de site, buiten deze drie fixes: het woord "volledig" in
`app/f-gassen-registratie/page.tsx` (FAQ "Voldoet Snellio aan...") en
`components/sections/SocialProof.tsx` ("Volledig conform"), en de zin
"voldoen aan alle certificatie-eisen" in `lib/constants.ts` FEATURES. Die
horen bij het uitbreiden van pagina 3.
