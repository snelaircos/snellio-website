/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output als static export voor Hostinger (optioneel)
  // output: 'export',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY'                          },
          { key: 'X-Content-Type-Options',    value: 'nosniff'                       },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  // 301 redirect www → non-www. Canonical-tag wijst al naar snellio.nl,
  // maar Google crawlt www.snellio.nl ook nog (kost crawl-budget en
  // backlink-juice splits). Door op host te matchen redirect Next.js
  // alle www-verkeer permanent naar de canonical host met behoud van
  // pad en query-string.
  //
  // /registreren is geen pagina maar de ingang van de aanmeldflow. Dat stond
  // als `redirect()` in een server component; Next stuurt dan een 200 met
  // <meta http-equiv="refresh" content="1;url=…"> terug. Voor de bezoeker is
  // dat een seconde wachten op een lege pagina, en voor Google een zwakker
  // signaal dan een echte omleiding (gemeten 20-09-2026). Hier als 308: geen
  // HTML, geen wachttijd, en Search Console ziet een normale omleiding.
  // `?pakket=` blijft werken via de named capture group; zonder parameter
  // geldt 'pro', precies zoals de oude pagina deed.
  //
  // De .html-varianten zijn de oude site (vóór april 2026). Search Console
  // meldde ze op 19-09-2026 als "Niet gevonden (404)"; ze gaan nu naar
  // dezelfde bestemming in plaats van naar een foutpagina.
  async redirects() {
    return [
      // www → apex moet eerst: pad en query blijven behouden, daarna pakken
      // de regels hieronder het door.
      {
        source:      '/:path*',
        has:         [{ type: 'host', value: 'www.snellio.nl' }],
        destination: 'https://snellio.nl/:path*',
        permanent:   true,
      },
      {
        source:      '/registreren',
        has:         [{ type: 'query', key: 'pakket', value: '(?<pakket>[a-z]+)' }],
        destination: '/checkout?pakket=:pakket',
        permanent:   true,
      },
      {
        source:      '/registreren',
        destination: '/checkout?pakket=pro',
        permanent:   true,
      },
      {
        source:      '/registreren.html',
        has:         [{ type: 'query', key: 'pakket', value: '(?<pakket>[a-z]+)' }],
        destination: '/checkout?pakket=:pakket',
        permanent:   true,
      },
      {
        source:      '/registreren.html',
        destination: '/checkout?pakket=pro',
        permanent:   true,
      },
    ]
  },
}

export default nextConfig
