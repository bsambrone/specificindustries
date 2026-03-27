# Specific Industries

A single Next.js 15 app serving multiple joke websites on subdomains of specificindustries.com.

## Architecture

- **Single Next.js app** deployed as one Vercel project with wildcard subdomain routing
- **Middleware** (`src/middleware.ts`) extracts subdomain from Host header, sets `x-subdomain` request header
- **Catch-all route** (`src/app/[[...slug]]/page.tsx`) resolves subdomain + URL path to the correct site page
- **Each site** is self-contained under `src/sites/<subdomain>/` with its own config, pages, and theme
- **All pages are dynamically rendered** (no static generation) because the catch-all reads `headers()`
- **Cart system** — `CartProvider` (React Context + localStorage) wraps commerce-enabled sites in `layout.tsx`. Cart state, toast notifications, and item count are shared between Header and page components.
- **Dynamic routes** — `SiteModule` supports `dynamicRoutes` for pattern-based sub-routes (e.g., `/products/[slug]`). Each dynamic route defines a component, metadata getter, and slug validator.

## Project Structure

```
src/
├── app/                    # Next.js App Router (DO NOT add page routes here — all routing goes through the catch-all)
│   └── [[...slug]]/        # Catch-all route — the ONLY page route
├── components/             # Shared UI components (theme-aware via CSS variables)
│   ├── layout/             # Header, Footer
│   └── ui/                 # Hero, FeatureSection, ProductCard, Timeline, TeamMember, PigProfile, FaqAccordion, etc.
├── sites/                  # One folder per subdomain site
│   ├── apex/               # Landing page for specificindustries.com
│   ├── pigmilk/
│   │   ├── data/           # Product catalog and data files
│   │   └── pages/          # Site page components
│   └── registry.ts         # Maps subdomain strings → site modules
└── themes/                 # Theme types, presets, and font declarations
    ├── index.ts             # Types: SiteConfig, PageEntry, SiteModule, themeToCSS()
    └── fonts.ts             # next/font declarations + fontFamilyMap
```

## Adding a New Subdomain Site

1. Create `src/sites/<subdomain>/config.ts` — define SiteConfig (theme, metadata, nav, features)
2. Create `src/sites/<subdomain>/pages/home.tsx` — at minimum a homepage
3. Create `src/sites/<subdomain>/index.ts` — barrel that exports `config` and `pages` map
4. Register in `src/sites/registry.ts` — import and add to `siteRegistry`
5. Optionally add static assets to `public/sites/<subdomain>/`

The `pages` export is a `Record<string, PageEntry>` where keys are route slugs:
- `""` → `/` (homepage)
- `"about"` → `/about`
- `"products"` → `/products`

A `PageEntry` is either:
- A bare `React.ComponentType` (for pages with no custom metadata)
- A `{ component: React.ComponentType, metadata: { title?, description? } }` object (for pages with SEO overrides)

Example barrel with both forms:
```typescript
export const pages: Record<string, PageEntry> = {
  "": HomePage,                                           // bare component
  "about": { component: AboutPage, metadata: aboutMeta }, // with metadata
}
```

## Key Conventions

- **No shared routes.** Each site defines its own pages. There is no concept of a shared `/about` or `/products` page.
- **Theme via CSS variables.** Site configs set theme colors/fonts. The root layout injects them as CSS custom properties on `<body>`. Tailwind utilities (`text-primary`, `bg-secondary`, etc.) reference these variables via `@theme inline` in `globals.css`. Shared components automatically adapt.
- **Tailwind CSS v4** with CSS-first configuration. Theme tokens are declared in `src/app/globals.css` using `@theme inline`. There is no `tailwind.config.ts`.
- **Fonts declared in `src/themes/fonts.ts`.** To add a new font: (1) add the `next/font/google` import and declaration, (2) add its `.variable` to the `fontVariables` array, (3) add its CSS font-family string to `fontFamilyMap`, (4) use the key in a site config's `theme.fonts`.
- **Compose from shared components.** Site pages should use components from `src/components/ui/` and `src/components/layout/`. Build new shared components when a pattern will be reused across sites.
- **No new App Router routes.** All page routing goes through `src/app/[[...slug]]/page.tsx`. Do NOT create new folders under `src/app/` for site pages.
- **Static assets** live in `public/sites/<subdomain>/` and are referenced with absolute paths (e.g., `/sites/pigmilk/logo.png`).

## Commerce System

Sites with `features.commerce: true` in their config get:
- `CartProvider` wrapper in `layout.tsx` (shared context for Header + pages)
- `CartButton` in the header (cart icon with item count badge)
- `AddToCartButton` component for product cards/pages
- `Toast` notifications on add-to-cart actions
- Cart page (`/cart`) and checkout page (`/checkout`)

Commerce components live in `src/components/commerce/`. They are all `"use client"` components.

Cart state is stored in `localStorage` under key `pigmilk-cart`. No server-side state or database.

## Dynamic Routes

Sites can define `dynamicRoutes` in their barrel export for pattern-based sub-routes:

```typescript
export const dynamicRoutes = {
  "products": {
    component: ProductDetail,
    getMetadata: (slug) => ({ title: `${product.name}`, description: product.tagline }),
    isValidSlug: (slug) => !!getProductBySlug(slug),
  },
}
```

The catch-all route checks `dynamicRoutes` when the pages map has no match. Invalid slugs return 404.

## Product Data Pattern

Product catalogs live in `src/sites/<subdomain>/data/products.ts`. Export a `products` array and `getProductBySlug(slug)` helper. Product detail components receive a `slug` prop and look up data from this file.

## Local Development

```bash
npm run dev
```

- `localhost:3000/` — apex landing page
- `localhost:3000/?site=pigmilk` — pigmilk homepage
- `localhost:3000/about?site=pigmilk` — pigmilk about page

The `?site=` param simulates subdomain routing locally and on Vercel preview deploys.

**Known limitation:** The `?site=` param is only read by middleware on the initial page load. Client-side navigation via `<Link>` does not preserve it. When testing locally, you may need to manually add `?site=<subdomain>` to the URL after navigating. This does not affect production (where real subdomains are used).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npx tsc --noEmit` — type check without emitting

## Tech Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Vercel (hobby plan)

## Design Spec

See `docs/superpowers/specs/2026-03-24-subdomain-joke-sites-design.md` for the full design document.
