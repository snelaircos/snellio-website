// Eén bron voor de datums van /f-gassen-registratie. De zichtbare regel
// "Bijgewerkt op", Article.datePublished/dateModified, og:article en de
// sitemap lezen allemaal hieruit, zodat ze nooit uit elkaar lopen.
// datePublished: eerste commit van deze URL in git (b6af7bb, 2 april 2026).
// dateModified alleen ophogen bij een inhoudelijke wijziging van de tekst.
export const FGASSEN_PAGE = {
  path:          '/f-gassen-registratie',
  datePublished: '2026-04-02T13:13:48+02:00',
  dateModified:  '2026-09-16T08:00:00+02:00',
} as const
