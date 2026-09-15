// Eén bron voor de datums van /brl-100-software. De zichtbare regel
// "Bijgewerkt op", Article.datePublished/dateModified, og:article en de
// sitemap lezen allemaal hieruit, zodat ze nooit uit elkaar lopen.
// dateModified alleen ophogen bij een inhoudelijke wijziging van de tekst.
export const BRL100_PAGE = {
  path:          '/brl-100-software',
  datePublished: '2026-09-15T09:00:00+02:00',
  dateModified:  '2026-09-15T09:00:00+02:00',
} as const
