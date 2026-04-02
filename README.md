# Snellio Website

Marketing website voor [Snellio](https://snellio.nl) — CRM voor HVAC & Koeltechniek.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (aanbevolen hosting)

## Opstarten

```bash
npm install
cp .env.example .env.local
# Vul .env.local in met jouw tracking IDs
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Projectstructuur

```
app/
├── layout.tsx          # Root layout: SEO, analytics, header, footer
├── page.tsx            # Homepage
├── sitemap.ts          # Automatische XML sitemap (/sitemap.xml)
├── robots.ts           # robots.txt (/robots.txt)
├── not-found.tsx       # 404 pagina
├── error.tsx           # Error boundary
├── loading.tsx         # Laadscherm
├── registreren/        # Registratiepagina met plan-selectie
├── pricing/            # Prijzenpagina
├── features/           # Functiespagina
├── contact/            # Contact + demo formulier
├── blog/               # Blog overzicht + artikelen
├── privacy/            # Privacybeleid
├── voorwaarden/        # Algemene voorwaarden
└── cookiebeleid/       # Cookiebeleid

components/
├── layout/   Header.tsx, Footer.tsx
├── sections/ Hero, SocialProof, Features, Pricing, Certifications, Cta
├── forms/    ContactForm.tsx
├── seo/      JsonLd.tsx
├── tracking/ Analytics.tsx, CookieBanner.tsx
└── ui/       Button.tsx, Container.tsx

lib/
├── constants.ts   # Alle content: prijzen, features, navigatie
├── metadata.ts    # SEO metadata helper
└── schemas.ts     # JSON-LD structured data
```

## SEO checklist

- [x] Unieke `title` en `description` per pagina
- [x] Canonical URL per pagina
- [x] Open Graph tags (og:title, og:description, og:image)
- [x] Twitter Card tags
- [x] JSON-LD: Organization, Website, SoftwareApplication
- [x] JSON-LD: FAQ per pagina waar van toepassing
- [x] JSON-LD: Breadcrumb per subpagina
- [x] XML sitemap via `app/sitemap.ts`
- [x] robots.txt via `app/robots.ts`
- [x] Semantische HTML (h1→h2→h3 hiërarchie)
- [x] `lang="nl"` op html element
- [x] Alt tekst op alle afbeeldingen

## Analytics instellen

Vul in `.env.local`:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX        # Google Tag Manager
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX       # Google Analytics 4
NEXT_PUBLIC_META_PIXEL_ID=...         # Meta Pixel
NEXT_PUBLIC_CLARITY_ID=...            # Microsoft Clarity
```

Analytics wordt alleen geladen in `production`. In development geen tracking.

## Content aanpassen

Alle content staat centraal in `lib/constants.ts`:
- `PLANS` — pakketten en prijzen
- `FEATURES` — functielijst
- `NAV_ITEMS` — navigatie
- `CERTS` — certificeringen
- `STATS` — hero statistieken
- `SITE` — bedrijfsinfo, URLs, contactgegevens

## Blog uitbreiden

Blog artikelen staan nu als placeholder in `app/blog/[slug]/page.tsx`.
Voor productie: vervangen door:
- **MDX** (bestanden in `/content/blog/*.mdx`)
- **Contentlayer** (type-safe MDX)
- **Sanity** of **Strapi** (headless CMS)

## Deployen op Vercel

```bash
npm i -g vercel
vercel
```

Stel environment variables in via het Vercel dashboard.

## Contact form endpoint

`components/forms/ContactForm.tsx` heeft een placeholder voor de form submit.
Vervang de `await new Promise(...)` door een echte POST naar:
- `/api/contact` (Next.js API route)
- Resend (direct e-mail)
- Formspree

## Afbeeldingen toevoegen

Zet in `/public/`:
- `logo_snellio.png` — gekleurd logo (lichte achtergrond)
- `logo_snellio_donker.png` — wit logo (donkere achtergrond)  
- `favicon.ico`
- `apple-touch-icon.png`
- `og-default.png` (1200×630px, voor social sharing)
