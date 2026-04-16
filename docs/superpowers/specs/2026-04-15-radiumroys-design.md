# Radium Roy's — Design Spec

**Date:** 2026-04-15
**Subdomain:** `radiumroys`
**Type:** Satire e-commerce site (subdomain of specificindustries.com)

## Concept

A satire site that pokes fun at California's Proposition 65 — the law requiring warning labels on virtually every product about the risk of cancer. The conceit: if everything causes cancer, why not lean all the way in? Radium Roy's is a 1950s Atomic-Age consumer goods brand that proudly sells products engineered to maximize carcinogen exposure, presented with the wholesome optimism of mid-century corporate America.

The central joke is named explicitly only on the `/standards` page; every other page plays it straight as a wholesome family brand.

## Brand Identity

**Name:** Radium Roy's
**Mascot/Voice:** "Radium Roy" — an unseen 1950s corporate spokesman. Warm, paternal, irrationally enthusiastic. Speaks in first person on key pages ("I'm Roy, and I stand behind every product that bears my name"). Never acknowledges the products are dangerous.

**Voice rules:**
- Period idioms: "the modern family," "American ingenuity," "tomorrow's pantry," "from our laboratories to your home."
- Roy *believes*. No winking, no irony in product copy.
- Prop 65 is named only on `/standards`, where Roy frames exceeding California's thresholds as a badge of quality.

## Visual Identity

**Theme preset:** `light`

**Colors (Radioactive Glow palette):**
- `background`: `#f5f1e8` — warm cream (mid-century paper)
- `text`: `#1a2238` — deep navy
- `primary`: `#39ff14` — radium glow green (the visual gag — used for accents, CTAs, badges)
- `secondary`: `#ff6b35` — atomic orange (headings, decorative)
- `accent`: `#ffd23f` — warning/atomic yellow (highlights, sale tags)

**Fonts:**
- Heading: **Bungee** (chunky retro display, Google Fonts)
- Body: **Work Sans** (clean mid-century sans, Google Fonts)

Neither is currently in `src/themes/fonts.ts`. Adding them requires:
1. Import each from `next/font/google` and instantiate with a `--font-*` variable.
2. Register each in `fontInstanceMap` under a kebab-case key (`"bungee"`, `"work-sans"`).
3. Register each in `fontFamilyMap` with its CSS font-family string.
4. Reference the keys in `radiumroys/config.ts` as `theme.fonts.heading` / `theme.fonts.body`.

## Architecture

Standard subdomain site, follows the established pattern (pigmilk, snortables, rocks). No new shared components needed; all UI composes from `src/components/ui/` and `src/components/layout/`.

```
src/sites/radiumroys/
├── config.ts            # SiteConfig: theme, nav, metadata, commerce: true
├── index.ts             # Barrel: config, pages, dynamicRoutes
├── data/
│   └── products.ts      # 15 products + getProductBySlug helper
└── pages/
    ├── home.tsx
    ├── products.tsx
    ├── product-detail.tsx
    ├── about.tsx
    ├── standards.tsx
    ├── testimonials.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx
```

**Registry updates:**
- Add to `siteRegistry` in `src/sites/registry.ts`
- Add `"radiumroys"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Add `radiumroysProducts` to the `productSites` map in `src/app/sitemap.ts`

**Commerce:** `features.commerce: true`. CartProvider wraps the site automatically. localStorage key: `radiumroys-cart`.

## Data Shape

```typescript
type Product = {
  slug: string
  name: string
  tagline: string
  price: number
  description: string[]   // paragraphs
  ingredients: string     // the carcinogen reveal, plainly stated
  roysRecommendation: string
  image?: string          // optional, falls back to placeholder
}
```

`src/sites/radiumroys/data/products.ts` exports `products: Product[]` and `getProductBySlug(slug: string): Product | undefined`.

## Navigation

```
Home | Products | Standards | Testimonials | About | Contact
```

Cart icon in the header (provided by `CartButton` when `features.commerce: true`).

## Page Specs

### `/` Home
- Hero: Roy's pitch — "Welcome, friend, to the future of American living."
- 3-4 featured products (curated for visual variety)
- "Why Choose Radium Roy's?" feature section with mid-century value props ("American-Made," "Family-Tested," "Glows in the Dark")
- Strip linking to `/standards`

### `/products`
- Grid of all 15 products, no filtering, no grouping
- Card shows image (placeholder OK), name, tagline, price, "Add to Cart" button

### `/products/[slug]` (dynamic route)
- Product image, name, tagline
- 2-3 paragraphs of Roy-voice description
- Price, quantity selector, add-to-cart
- "Roy's Recommendation" callout (e.g., "Roy suggests three servings daily")
- "Ingredients & Materials" section listing the carcinogen plainly
- Defined under `dynamicRoutes` in the barrel; invalid slugs return 404

### `/about`
- Roy's origin story (founded 1952 in Burbank, etc.)
- Leadership team grid via existing `TeamMember` component
- **Exec names must randomize BOTH first AND last name** (per saved feedback memory)

### `/standards` — The Quality Pledge
- The thesis page where the satire is named explicitly
- Lists fake certifications: "Certified Carcinogenic by the Western Institute of Atomic Wellness," "Exceeds California Prop 65 Threshold by 800%," etc.
- Explains "the Roy Method" of carcinogen optimization
- Roy speaks directly to the reader

### `/testimonials`
- 8-12 customer quotes
- Each: name, age, city, quote
- Quotes celebrate the products in dark/oblivious ways (e.g., "My husband can't taste anything anymore but he LOVES the meat logs!")
- Simple card grid

### `/contact`
- Contact form (decorative — no backend submission)
- Roy-voice intro copy
- Fake address: "Roy's Laboratories, Industrial Park 7, Burbank CA"

### `/privacy` and `/terms`
- Full satire body content per established pattern (see rocks privacy/terms commit `ee447cf`)
- Roy-voice throughout

### `/cart` and `/checkout`
- Provided by the existing commerce system; no per-site customization needed beyond theme variables

## Product Catalog (15 items)

Each targets a different real-world Prop 65 carcinogen so the catalog reads broad rather than one joke repeated.

| # | Product | Carcinogen / Joke |
|---|---|---|
| 1 | Tan-O-Matic 9000 Home Bronzing Cabinet | Industrial UV tanning bed for residential use |
| 2 | Asbesto-Crisps Saltine Crackers | Real asbestos fibers for crunch |
| 3 | Roy's Nitrate-Lover's Meat Logs | 1,400% daily nitrates per slice |
| 4 | Sunshine Glow Radium Wristwatch | Genuine radium-painted dial |
| 5 | Junior Glow-Pop Cigarettes | Candy-flavored cigarettes for kids |
| 6 | Crystal-Pals Lead Crystal Sippy Cups | Heirloom-quality leaded crystal |
| 7 | Char-Master 2000° Backyard Grill | Industrial-temperature searing for HCAs |
| 8 | Mercury Drop Lollipops | Hard candy with a mercury thermometer bulb in the center |
| 9 | Roy's Formaldehyde-Fresh Plug-In Air Freshener | Embalmed-fresh scent |
| 10 | Benzene Bubbles Aromatherapy Bath Bombs | Petroleum-derived relaxation |
| 11 | Cozy-Pet Asbestos Insulation Bedding | Pet bedding with asbestos insulation |
| 12 | Radon Cellar Concentrator Kit | Seals basements to capture natural radon |
| 13 | Tar Tots Children's Coal Tar Shampoo | Bubblegum-scented coal tar for kids |
| 14 | Forever-Pan™ PFAS Non-Stick Cookware Set | PFAS-releasing cookware |
| 15 | Granny's Aflatoxin-Aged Artisan Peanut Butter | Cellar-aged 18 months in optimal humidity |

Final names, taglines, prices, and copy will be set in the implementation plan.

## SEO / Metadata

- `metadata.ogImage` set on the site config to `/sites/radiumroys/hero.png` (placeholder file expected)
- Per-page `metadata` overrides for the high-value pages (`products`, `about`, `standards`)
- All pages automatically included in the sitemap once the subdomain is added to `siteRegistry`; product detail pages added via the `productSites` map in `src/app/sitemap.ts`

## Out of Scope (initial build)

- Custom Roy mascot illustration (placeholder hero image only)
- Per-product photography (placeholder image with graceful fallback)
- Per-page OG image generation (paths reserved; images can be added in a follow-up)
- Real contact-form submission (form is decorative)
- Tests (the codebase is static-content driven; verification is `npm run lint`, `npx tsc --noEmit`, and a manual `npm run dev` walkthrough)

## Verification

At build/PR time:
- `npm run lint` passes
- `npx tsc --noEmit` passes
- `npm run dev` walkthrough hits every route on the new site, including a product detail page and the cart flow
- Sitemap output (`/sitemap.xml`) includes the new subdomain's static pages and all 15 product URLs
