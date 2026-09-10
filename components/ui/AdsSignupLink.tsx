import Link from 'next/link'
import { type ReactNode } from 'react'

// Trial-CTA voor de Ads-landingspagina. Wijst naar /registreren: exact dezelfde
// aanmeldflow als de rest van de site, geen aparte route en geen eigen tracking.
//
// Waarom hier géén gclid/utm in de URL wordt meegegeven:
// de attributie is bij binnenkomst al first-party vastgelegd door
// lib/tracking/attribution.ts (aangeroepen vanuit AttributionCapture in de
// root-layout): sessionStorage, plus een cookie op .snellio.nl zodra er
// marketing-consent is. Die opslag overleeft de doorstap naar /registreren en
// de serverredirect naar /checkout, en gaat bij het aanmelden mee naar de
// server. De parameters opnieuw in de URL zetten voegt daar niets aan toe en
// maakt de meting juist slechter: captureAttribution() laat URL-parameters
// winnen van eerder opgeslagen waarden, waardoor landing_page op '/registreren'
// zou komen te staan en referrer op het eigen domein. Gemeten in de
// productiebuild: mét parameters werd de echte landingspagina overschreven,
// zonder parameters blijft '/software-voor-installatiebedrijven' bewaard.
//
// Bewust next/link en geen gewone <a>: bij een volledige paginaovergang
// decoreert gtag (url_passthrough staat aan) de doel-URL alsnog met de gclid.
// captureAttribution() ziet die parameter op /registreren, bouwt daaruit een
// vers attributie-object en gooit daarbij de utm-velden weg en zet landing_page
// op '/registreren'. Bij een client-side overgang gebeurt dat niet en blijft de
// volledige attributie staan. Gemeten in de productiebuild: met <a> verdwenen
// utm_source, utm_medium en utm_campaign vóór de aanmelding; met Link blijven
// ze bewaard tot op het aanmeldformulier. Dit is ook hoe de rest van de site
// naar /registreren linkt.

interface Props {
  children: ReactNode
  className?: string
}

export default function AdsSignupLink({ children, className }: Props) {
  return (
    <Link href="/registreren" className={className}>
      {children}
    </Link>
  )
}
