// Eén bron voor de datums van /brl-100-handboek. De zichtbare regel
// "Bijgewerkt op", WebPage.dateModified en de sitemap lezen hieruit.
// datePublished: dag waarop de pagina live gaat. dateModified alleen ophogen
// na een echte controle van de handboekclaims (02-feature-factcheck.md,
// rijen 30 t/m 36) en de prijzen (PLANS).
export const HANDBOEK_PAGE = {
  path:          '/brl-100-handboek',
  datePublished: '2026-10-15T22:30:00+02:00',
  dateModified:  '2026-10-15T22:30:00+02:00',
} as const
