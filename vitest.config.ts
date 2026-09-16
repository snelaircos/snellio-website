import { defineConfig } from 'vitest/config'
import path from 'node:path'

// Unit-tests voor de trackinglaag en de aanmeldroute. jsdom voor browsercode;
// een testbestand kiest zelf 'node' via `// @vitest-environment node`.
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next'],
    clearMocks: true,
  },
  resolve: { alias: { '@': path.resolve(__dirname) } },
})
