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
}

export default nextConfig
