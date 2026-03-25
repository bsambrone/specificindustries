# Specific Industries

A single Next.js 15 app serving multiple joke websites on subdomains of specificindustries.com.

## Architecture

- **Single Next.js app** deployed as one Vercel project with wildcard subdomain routing
- **Middleware** (`src/middleware.ts`) extracts subdomain from Host header, sets `x-subdomain` request header
- **Catch-all route** (`src/app/[[...slug]]/page.tsx`) resolves subdomain + URL path to the correct site page
- **Each site** is self-contained under `src/sites/<subdomain>/` with its own config, pages, and theme
- **All pages are dynamically rendered** (no static generation) because the catch-all reads `headers()`

## Project Structure

```
src/
├── app/                    # Next.js App Router (DO NOT add page routes here — all routing goes through the catch-all)
│   └── [[...slug]]/        # Catch-all route — the ONLY page route
├── components/             # Shared UI components (theme-aware via CSS variables)
│   ├── layout/             # Header, Footer
│   └── ui/                 # Hero, FeatureSection, TestimonialGrid, CTABanner, etc.
├── sites/                  # One folder per subdomain site
│   ├── apex/               # Landing page for specificindustries.com
│   ├── pigmilk/            # Example multi-page site
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
