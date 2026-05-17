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
  async redirects() {
    return [
      {
        source:      '/:path*',
        has:         [{ type: 'host', value: 'www.snellio.nl' }],
        destination: 'https://snellio.nl/:path*',
        permanent:   true,
      },
    ]
  },
}

export default nextConfig
