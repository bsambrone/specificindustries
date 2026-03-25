# Specific Industries -- Subdomain Joke Sites Platform

## Overview

A single Next.js application that serves multiple joke websites, each on its own subdomain of `specificindustries.com`. Each subdomain (e.g., `pigmilk.specificindustries.com`, `solarpoweredflashlights.specificindustries.com`) is a self-contained site with its own pages, content, and visual theme. All sites share a common component library and are deployed as one Vercel project using wildcard subdomain routing.

## Goals

- Host 5-10 joke subdomain sites initially, scaling to 20-30 over time
- Each site is self-contained: defines its own pages, routes, content, and theme
- Sites share a UI component library but have no shared routes
- Adding a new site requires only adding code -- no infra or DNS changes
- Stay within Vercel's hobby plan (single project, no cost scaling)
- Architecture supports adding e-commerce to individual sites in the future

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS variables for per-site theming
- **Fonts:** Google Fonts via `next/font`
- **Deployment:** Vercel (hobby plan, single project, wildcard subdomain)
- **Package manager:** npm

## Project Structure

```
specificindustries/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout - resolves subdomain, applies theme
│   │   ├── not-found.tsx             # 404 page
│   │   └── [[...slug]]/
│   │       └── page.tsx              # Catch-all: resolves subdomain + path to site page
│   ├── components/
│   │   ├── layout/                   # Header, Footer, Nav
│   │   ├── ui/                       # Hero, Cards, Testimonials, CTA, etc.
│   │   └── commerce/                 # Future: cart, buy button
│   ├── sites/
│   │   ├── pigmilk/
│   │   │   ├── config.ts             # Theme, metadata, nav, feature flags
│   │   │   └── pages/
│   │   │       ├── home.tsx
│   │   │       ├── about.tsx
│   │   │       └── products.tsx
│   │   ├── solarpoweredflashlights/
│   │   │   ├── config.ts
│   │   │   └── pages/
│   │   │       └── home.tsx
│   │   ├── apex/
│   │   │   ├── config.ts             # Landing page for specificindustries.com
│   │   │   └── pages/
│   │   │       └── home.tsx
│   │   └── registry.ts              # Maps subdomain strings to site modules
│   ├── themes/
│   │   └── index.ts                  # Theme type definitions + preset themes
│   └── middleware.ts                 # Extracts subdomain, handles routing/redirects
├── public/
│   └── sites/                        # Static assets per subdomain
│       ├── pigmilk/
│       └── solarpoweredflashlights/
├── VERCEL_SETUP.md                   # Vercel & DNS configuration instructions
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

## Architecture

### Middleware (src/middleware.ts)

Runs on every request. Responsibilities:

1. Parse the `Host` header to extract the subdomain
2. If no subdomain (apex domain), set `x-subdomain` header to `"apex"`
3. If the subdomain is registered in the site registry, set `x-subdomain` header to the subdomain string
4. If the subdomain is NOT registered, redirect (302) to `https://specificindustries.com`
5. For local development, also check for a `?site=` query parameter as a subdomain override (e.g., `localhost:3000/about?site=pigmilk`)

### Catch-All Route (src/app/[[...slug]]/page.tsx)

Reads the `x-subdomain` header via `next/headers`. Looks up the site in the registry. Resolves the URL path slug to the matching page component from that site's `pages/` folder. If the path doesn't match any page the site defines, returns a 404.

The double-bracket `[[...slug]]` syntax makes the slug optional, so the root path (`/`) also routes through this handler, resolving to the site's `home.tsx`.

### Root Layout (src/app/layout.tsx)

Reads the `x-subdomain` header, loads the site config, and:

- Sets `<html>` metadata (title, description, OG tags) from the site config
- Injects CSS custom properties for theme colors and fonts
- Wraps page content in shared layout components (Header, Footer) configured with the site's nav links and branding

### Site Registry (src/sites/registry.ts)

A simple object mapping subdomain strings to their site modules:

```ts
import { config as pigmilkConfig, pages as pigmilkPages } from "./pigmilk"
import { config as solarConfig, pages as solarPages } from "./solarpoweredflashlights"
import { config as apexConfig, pages as apexPages } from "./apex"

export const siteRegistry = {
  apex: { config: apexConfig, pages: apexPages },
  pigmilk: { config: pigmilkConfig, pages: pigmilkPages },
  solarpoweredflashlights: { config: solarConfig, pages: solarPages },
} as const

export type SubdomainKey = keyof typeof siteRegistry
```

Adding a new site means adding its folder and importing it here.

## Site Configuration

Each site's `config.ts` defines:

```ts
export interface SiteConfig {
  name: string                         // Display name (e.g., "Pig Milk Co.")
  subdomain: string                    // URL subdomain (e.g., "pigmilk")
  theme: {
    preset: string                     // Base preset: "corporate", "playful", "minimal"
    colors: {
      primary: string
      secondary: string
      accent: string
      background: string
      text: string
    }
    fonts: {
      heading: string
      body: string
    }
  }
  metadata: {
    title: string
    description: string
    ogImage?: string
  }
  nav: Array<{ label: string; path: string }>
  features: {
    commerce: boolean                  // Future: enables purchase functionality
  }
}
```

## Theme System

Themes are applied via CSS custom properties injected by the root layout:

```css
:root {
  --color-primary: #E91E63;
  --color-secondary: #FCE4EC;
  --color-accent: #880E4F;
  --color-background: #FFFFFF;
  --color-text: #1A1A1A;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}
```

Tailwind is configured to reference these CSS variables, so shared components automatically adapt to whatever site they're rendered within. Theme presets (corporate, playful, minimal) provide sensible defaults that sites can override with custom colors/fonts.

## Shared Components

The `src/components/` library provides theme-aware building blocks:

- **layout/**: `Header`, `Footer`, `Nav` -- configured per-site via config
- **ui/**: `Hero`, `FeatureSection`, `TestimonialGrid`, `ProductCard`, `CTABanner`, `PricingTable`, etc.
- **commerce/**: Future home for `BuyButton`, `Cart`, `CheckoutForm`

All components consume theme via CSS variables. Sites pick and compose whichever components they need in their page files. No component is mandatory.

## Site Pages

Each site defines its pages as React components in its `pages/` folder. Pages are mapped by filename convention:

- `home.tsx` → `/`
- `about.tsx` → `/about`
- `products.tsx` → `/products`
- `faq.tsx` → `/faq`

The catch-all route uses this convention to resolve paths. Each page is a standard React component that composes shared UI components with site-specific content:

```tsx
// src/sites/pigmilk/pages/home.tsx
import { Hero } from "@/components/ui/hero"
import { FeatureSection } from "@/components/ui/feature-section"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"

export default function Home() {
  return (
    <>
      <Hero
        headline="Farm-Fresh Pig Milk"
        subheadline="Straight from the pig to your glass."
        ctaText="Learn More"
        ctaHref="/products"
      />
      <FeatureSection
        features={[
          { title: "100% Organic", description: "Our pigs roam free." },
          { title: "Rich in Nutrients", description: "Probably." },
          { title: "Artisanal", description: "Each pig is milked by hand." },
        ]}
      />
      <TestimonialGrid
        testimonials={[
          { quote: "I can't believe it's pig milk!", author: "Satisfied Customer" },
        ]}
      />
    </>
  )
}
```

## Apex Domain (specificindustries.com)

The apex domain is treated as a site in the registry keyed as `"apex"`. Its landing page serves as a hub that lists and links to all subdomain sites. The registry can be iterated to auto-generate this list, so new sites appear on the landing page as soon as they're registered.

## Unknown Subdomains

When a request comes in for a subdomain not in the registry (e.g., `random.specificindustries.com`), the middleware issues a 302 redirect to `https://specificindustries.com`.

## Local Development

Since real subdomains don't work on `localhost`, the middleware supports a `?site=` query parameter:

- `localhost:3000/?site=pigmilk` → renders pigmilk homepage
- `localhost:3000/about?site=pigmilk` → renders pigmilk about page
- `localhost:3000/` (no param) → renders apex landing page

This avoids needing `/etc/hosts` modifications or local DNS tools.

## Vercel & DNS Setup

Documented in `VERCEL_SETUP.md` at the project root. Covers:

1. Creating the Vercel project and linking the repo
2. Adding `specificindustries.com` as a domain in Vercel
3. Adding `*.specificindustries.com` as a wildcard domain
4. Configuring DNS records (A record for apex, CNAME wildcard to `cname.vercel-dns.com`)
5. SSL is automatic for all subdomains including wildcards

## Adding a New Site (Workflow)

1. Create `src/sites/<subdomain>/config.ts` with theme, metadata, and nav
2. Create `src/sites/<subdomain>/pages/home.tsx` (and any other pages)
3. Add the site to `src/sites/registry.ts`
4. Optionally add static assets to `public/sites/<subdomain>/`
5. Deploy -- the wildcard domain handles the new subdomain automatically

No Vercel configuration changes. No DNS changes. No new projects.

## Future: E-Commerce

The `features.commerce` flag in site configs is a placeholder. When ready to add purchase capability to a site:

1. Choose a payment provider (Stripe, Shopify Buy Button, Snipcart, etc.)
2. Build components in `src/components/commerce/`
3. Set `features.commerce: true` in the site's config
4. Add product data and purchase pages to that site's `pages/` folder

This is out of scope for initial implementation.

## Out of Scope

- E-commerce implementation (deferred)
- Analytics per subdomain
- CMS or admin interface
- Authentication
- Database
