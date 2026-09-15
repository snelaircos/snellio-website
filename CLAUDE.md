# Snellio website

Marketingsite voor Snellio (Next.js 14, App Router, TypeScript, Tailwind).
De applicatie zelf draait op app.snellio.nl en staat niet in deze repo.

## Werkwijze

- Prijzen en pakketten komen uitsluitend uit `lib/constants.ts` (`PLANS`,
  `INBEGREPEN`, `BTW`, `TRIAL_DAGEN`). Nooit hardcoden in pagina's.
- Structured data via de helpers in `lib/schemas.ts` en het `JsonLd`-component.
- Trial-CTA's gaan naar `/registreren`. Geen eigen tracking in pagina's; dat
  loopt via `lib/tracking`.
- Taal: Nederlands, je-vorm, geen marketinghype, geen "beste", "enige" of
  "volledig compliant".

## SEO/GEO-contentplan

Het contentplan staat in `docs/seo-geo/`. Begin bij `docs/seo-geo/00-README.md`.

Harde regels bij het schrijven of bouwen van pagina's:

1. Wet- en regelgeving alleen zoals vastgelegd in `docs/seo-geo/01-juridische-basis.md`.
   Afwijken mag alleen met een nieuwe primaire bron, en dan dat bestand bijwerken.
2. Features alleen claimen als ze in `docs/seo-geo/02-feature-factcheck.md` in de
   kolom "Bevestigd in app" zijn afgevinkt (alle 17 rijen bevestigd op 15
   september 2026), en alleen met de formulering uit de kolom "Mag publiek
   geclaimd worden". SnelStart nooit als koppeling noemen.
3. LMRA nooit als wettelijke eis. TRA en werkvergunning alleen met de framing
   uit `01-juridische-basis.md` §3.
4. Op de kenplaat zijn alleen de velden uit art. 12 van Verordening (EU)
   2024/573 "verplicht". QR-code en BRL-nummers zijn extra's.
5. Flesregistratie en F-gassenbalans zijn BRL 100-eisen, het logboek per
   apparaat is art. 7 van de verordening. Niet door elkaar halen.
6. Concurrentprijzen alleen uit `docs/seo-geo/05-vergelijkingspagina.md`, met
   datum en incl./ex btw.
7. Eén intentie per URL. Geen nieuwe URL's naast `/f-gassen-registratie` en
   `/werkbon-software` voor hetzelfde onderwerp.
8. Elke informatieve pagina: answer-first alinea van 40 tot 60 woorden onder de
   H1, zichtbare "Bijgewerkt op"-datum gelijk aan `dateModified`, FAQ-tekst
   byte-gelijk aan het FAQ-schema, bronnenlijst met primaire bronnen.

## Firecrawl

Zie `docs/firecrawl.md`. In Claude Code op het web werkt alleen de
Firecrawl-connector uit claude.ai; de CLI is daar geblokkeerd. Geen `.mcp.json`
in de repo.
