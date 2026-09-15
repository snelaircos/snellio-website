# Feature factcheck

Deze repo is de marketingsite. Geen regel code hierin bewijst dat een functie in
app.snellio.nl werkt. De kolom "Bewijs in repo" zegt alleen: waar staat de claim,
sinds wanneer, en is er iets sterkers dan marketingtekst (screenshot, juridisch
document). De kolom **"Bevestigd in app"** vul je in na controle in een live
account. Pas daarna mag een feature in nieuwe content.

Laatst bijgewerkt: 14 september 2026.

| Feature | Status | Bewijs in repo | Mag publiek geclaimd worden | Bevestigd in app (datum, door) |
| --- | --- | --- | --- | --- |
| BRL 100 rapportage | Geclaimd | `/features`, `/f-gassen-registratie` ("BRL100-conform rapport"), pillar, `lib/constants.ts` INBEGREPEN, `public/llms.txt`. Geen screenshot. | Ja, mits bevestigd, **en herformuleren**: BRL 100 kent geen "rapport" maar werkregistratie per handeling, logboek per circuit en jaarlijkse F-gassenbalans. Schrijf "werkregistratie en F-gassenbalans zoals BRL 100 vraagt". | [Rudy Snel] |
| F-gassenlogboek per installatie | Gedeeltelijk bewezen | Claim op 3 pagina's; blogpost `digitaal-logboek-qr-kenplaat` (23 juli 2026) met foto; alt-tekst dashboard noemt koudemiddelflessen. | Ja, mits bevestigd. | [Rudy Snel ] |
| Flesbalans / koudemiddelregistratie | Geclaimd | `/f-gassen-registratie`: "restgewicht per fles", "balans"; `/features`: "F-gas balans per periode". | Ja, mits bevestigd. Formuleer als "koudemiddelregistratie en F-gassenbalans zoals BRL 100 vraagt". | [Rudy Snel ] |
| QR-code op kenplaat | Sterkst onderbouwd | `public/kenplaat-voorbeeld.png` (foto van geprinte kenplaat met QR), blogpost, commits 23 juli 2026. | Ja. Scheid wettelijke velden (art. 12) van de QR-code als extra. | [ Rudy Snel] |
| Kenplaatprinter | Geclaimd, beperkt | `/features`: "Heb je een kenplaatprinter, dan print je..."; `llms.txt`. Geen model of driver genoemd. | Alleen als "printbaar op je eigen labelprinter". Geen compatibiliteit met specifieke modellen claimen. | [Rudy Snel ] |
| Automatische lektestwaarschuwingen | Onduidelijk | Alleen `app/features/page.tsx:48` "Waarschuwing bij lekkoets [sic]". `/f-gassen-registratie` noemt alleen de ijkdatum-signalering. | **Nee**, tot bevestigd. Typfout eerst fixen. | [Rudy Snel ] |
| Waarschuwing ijkdatum lekdetector | Geclaimd | `/f-gassen-registratie` "Signalering lekdetector ijkdatum"; `/features:48`. | Ja, mits bevestigd. | [ Rudy Snel] |
| TRA | Geclaimd, vers | Toegevoegd 12 sept 2026 (commit "veiligheidsdossier bij R290 op de site"), label "Nieuw", `/features`, pillar, INBEGREPEN. Geen screenshot. | Alleen na bevestiging, met de framing uit `01-juridische-basis.md` §3. | [Rudy Snel ] |
| LMRA | Geclaimd, vers | Idem. | Idem. Nooit als wettelijke eis. | [Rudy Snel ] |
| Werkvergunning | Geclaimd, vers | Idem. Velden: nummer, geldigheid, gasmeting, LEL, zone-afzetting, brandwacht. | Idem. | [ Rudy Snel] |
| Moneybird-koppeling | Gedeeltelijk bewezen | Claim op 11 bestanden; privacybeleid (commit 23 juli 2026) noemt WeFact/Moneybird/Exact als verwerkers. | Ja. | [Rudy Snel ] |
| WeFact-koppeling | Gedeeltelijk bewezen | Idem. | Ja. | [ Rudy Snel] |
| Exact Online-koppeling | Gedeeltelijk bewezen | Idem. `llms.txt` noemt ook SnelStart, nergens anders. | Ja voor Exact Online. SnelStart niet. | [Rudy Snel ] |
| Google Calendar-sync | Geclaimd | 7 bestanden; `public/planning-preview.png` met alt-tekst over sync. | Ja, mits bevestigd. | [Rudy Snel ] |
| Mollie/iDEAL op klantfacturen | Geclaimd, valkuil | Claim op features/pillar. De Mollie-code in deze repo (`app/api/mollie/webhook`, `app/api/checkout`) betreft Snellio's eigen abonnementen, niet klantfacturen. | Ja, mits bevestigd in app. Repo-code is hier geen bewijs. | [ Rudy Snel] |
| Import bestaande installaties | Gedeeltelijk | `/alternatief-voor-crm-installateurs:79`: CSV-import van klantgegevens, locaties en historische werkorders. Installaties niet genoemd. | Alleen "klanten, locaties en werkorders via CSV". | [Rudy Snel ] |
| Export van data | Geclaimd | Pillar-FAQ: CSV en PDF; `/f-gassen-registratie`: per installatie en per periode. | Ja, mits bevestigd. | [ Rudy Snel] |

## Drie tekstfixes op productie (los van de app-check)

1. `app/features/page.tsx:48`: "lekkoets" moet "lektest" zijn.
2. `public/llms.txt`: SnelStart verwijderen uit de koppelingenlijst, of bevestigen.
3. Overal waar staat "flesregistratie conform 2024/573": de verordening regelt
   het logboek per apparaat (art. 7), flesregistratie en balans zijn BRL 100-eisen.
   Zie `01-juridische-basis.md` §5.

## Consequentie voor nieuwe content

Tot de kolom "Bevestigd in app" is ingevuld, gebruiken nieuwe pagina's alleen:
logboek per installatie, werkregistratie vanuit de werkbon, koudemiddelregistratie
en balans, kenplaat met QR (printbaar op eigen labelprinter), ijkdatum-signalering,
export, boekhoudkoppelingen WeFact/Moneybird/Exact Online, Google Calendar-sync.
Niet: TRA, LMRA, werkvergunning, lektestherinneringen, installatie-import.
