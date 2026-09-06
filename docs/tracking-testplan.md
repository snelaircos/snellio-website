# Testplan Google Ads-conversietracking (snellio.nl → app.snellio.nl)

Versie 2026-09-06. Uitvoeren in een schone browser (incognito) op productie.
Debug aanzetten: open een pagina met `?tracking_debug=1` — daarna toont de
console `[Tracking] …` en is `window.__snellioTracking` beschikbaar
(`.consent`, `.attribution`, `.events`, `.dataLayer`, `.config`).

## Hulpmiddelen
- Chrome DevTools > Network, filter `google` — verwacht:
  - `googletagmanager.com/gtag/js?id=GT-…` (loader, 200)
  - Ads-conversie: request naar `googleads.g.doubleclick.net/pagead/viewthroughconversion/18058139346/…` met `label=<LABEL>`, `value=`, `currency_code=EUR`, `oid=<transaction_id>` (en/of `google.com/pagead/1p-conversion/…`)
  - Bij consent denied: dezelfde requests met `gcs=G100` (cookieless ping); bij granted `gcs=G111`
- Google Tag Assistant (tagassistant.google.com) op snellio.nl: toont consent-status per hit en de conversie-events.
- Google Ads > Doelen > Conversies > actie > "Diagnose" (verwerking duurt uren; zie ook "Recente conversies").

## TEST A — gclid blijft bewaard
1. Open `https://snellio.nl/?gclid=TESTgclid123&utm_source=test&tracking_debug=1`.
2. Console toont `[Tracking] init { click_id: true, utm_source: 'test' }`.
3. `window.__snellioTracking.attribution.gclid === 'TESTgclid123'`.
4. Navigeer naar /pricing en /checkout (menu): attribution blijft gelijk (sessionStorage).
5. Zonder consent: cookie `snellio_attr` bestaat NIET (Application > Cookies). Na "Alles accepteren" (Test B) verschijnt `snellio_attr` op domein `.snellio.nl` met de gclid.
Verwacht: gclid nergens verloren tot en met de aanmelding.

## TEST B — alles accepteren
1. Klik in de banner "Alles accepteren".
2. `document.cookie` bevat `snellio_consent=granted` (domein `.snellio.nl`).
3. `window.dataLayer` bevat een `consent update` met alle vier signalen `granted`; Tag Assistant toont consent granted.
4. Herlaad: banner blijft weg; de `consent default` in de `<head>`-script is nu direct `granted`.

## TEST C — advertentiecookies weigeren
1. Schone sessie, klik "Alleen noodzakelijk".
2. `snellio_consent=denied`; dataLayer bevat `consent update` met alles `denied` en `ads_data_redaction: true`.
3. Geen `_gcl_aw`/`_ga`-cookies. Conversies (Test D) gaan wél uit als cookieless ping (`gcs=G100`) — dat is Consent Mode v2-gedrag, geen fout.

## TEST D — trial-account: exact één `trial_signup_completed`
1. /checkout, formulier invullen met een nieuw e-mailadres, voorwaarden aanvinken, versturen.
2. Pas nadat de succesmelding verschijnt: console `[Tracking] trial_signup_completed { transaction_id: 'signup_<uuid>' … }` en `Google Ads conversion fired`.
3. Network: één conversie-request met `label=SuNcCLS1xK4cENKt5aJD` en `oid=signup_<uuid>`.
4. Daarna redirect naar app.snellio.nl/login.
Verwacht: precies één conversie; niet bij openen van /checkout, niet bij invullen, niet bij een mislukte submit (test ook: submit zonder checkbox → 400, geen conversie).

## TEST E — refresh na signup
1. Ga terug naar snellio.nl/checkout en herlaad; open ook /trial-bedankt en /checkout/success handmatig.
2. Verwacht: geen conversie-request; console blijft stil (die pagina's vuren niets meer).
3. Herhaal een submit met hetzelfde e-mailadres: API geeft 409, geen conversie.

## TEST F — succesvolle betaling: exact één `purchase_completed` (app)
Randvoorwaarde: app-instantie heeft de purchase-meting ingebouwd én `NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL` staat gevuld (zie overdracht). Tot die tijd: niet uitvoerbaar.
1. Keuzescherm in de app → iDEAL → betaal in Mollie-testmodus.
2. Terug op /dashboard/instellingen/abonnement?betaald=1: pas nadat de backend `paid` bevestigt vuurt `purchase_completed` met `transaction_id` = Mollie payment-id (`tr_…`).

## TEST G — betaling geannuleerd/mislukt
Mollie: annuleer of laat mislukken. Verwacht: geen purchase-conversie (backend-status ≠ paid).

## TEST H — refresh van de betaalbevestiging
Herlaad de abonnement-pagina met `?betaald=1`. Verwacht: geen tweede conversie (server-side markering + localStorage-dedupe op payment-id).

## TEST I — navigatie snellio.nl → app.snellio.nl
1. Na Test B: `document.cookie` op app.snellio.nl bevat `snellio_consent` en (bij consent) `_gcl_aw` en `snellio_attr` — cookies staan op `.snellio.nl`.
2. In Supabase Auth > user > `user_metadata.attributie`: gclid/utm van de aanmelding aanwezig (gclid alleen bij consent granted).

## TEST J — Tag Assistant / DevTools
Controleer per pagina: `dataLayer` bevat in deze volgorde `consent default` → `js` → `config AW` (met `allow_enhanced_conversions`) → `config G-` → (na banner) `consent update`. Eén `page_view` per route (geen dubbele). Conversie-hits tonen de juiste `send_to` en `transaction_id`.

## Bekende aandachtspunten
- `gtag/js?id=G-CSC9H9DFWN` geeft 404 bij Google: controleer in GA4 Admin > Gegevensstromen of deze measurement-id nog bestaat; anders GA4-id vervangen (env).
- Label ↔ Ads-actie: controleer in Google Ads welke actie bij welk label hoort (`SuNcCLS1…` trial, `LA8hCIq0…` lead/contact, `RgjNCPqX…` demo). Zet de actie voor trial op categorie "Aanmelden" en maak voor echte betalingen een aparte "Aankoop"-actie met eigen label.
