// Eén bron voor de datums van de pillar. De zichtbare regel "Bijgewerkt op",
// WebPage.dateModified en de sitemap lezen hieruit. Koppel aan de maandelijkse
// controle van PLANS en INBEGREPEN: datum alleen vernieuwen na echte controle.
export const PILLAR_PAGE = {
  path:         '/software-voor-installatiebedrijven',
  dateModified: '2026-09-15T09:00:00+02:00',
  // Datum waarop de concurrentprijzen in de vergelijkingsteaser bij de
  // leveranciers zijn gecontroleerd (docs/seo-geo/05-vergelijkingspagina.md).
  // Minimaal elk kwartaal herhalen.
  prijzenGecontroleerd: '2026-09-14',
} as const
