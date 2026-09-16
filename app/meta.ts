// Eén bron voor de datums van de homepage. WebPage.dateModified en de sitemap
// lezen hieruit. datePublished: eerste commit van app/page.tsx in git
// (b6af7bb, 2 april 2026). dateModified ophogen bij een inhoudelijke wijziging
// van de homepage (docs/seo-geo/11-homepage.md §4).
export const HOME_PAGE = {
  path:          '/',
  datePublished: '2026-04-02T13:13:48+02:00',
  dateModified:  '2026-09-16T09:00:00+02:00',
} as const
