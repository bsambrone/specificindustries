# Superengineered Site Design

Date: 2026-04-17
Subdomain: `superengineered`
Status: Design approved — ready for implementation plan

## Premise

A satirical brand that takes trivial everyday objects (toothbrushes, doorknobs, light switches, spoons) and re-presents them with Apple-style reverent product marketing plus SaaS subscription gates. The joke: ordinary things treated as generational engineering achievements, locked behind monthly plans.

- **Brand name:** Superengineered™
- **Tagline:** *"Rebuilt from first principles."*
- **Voice:** Reverent, hushed, founder-philosopher. Each product is a moral achievement. Compliance and subscription terms appear as quiet footnotes.
- **Satire target:** Apple-style product marketing + SaaS subscription gates, applied to objects that do not need either.

## Brand persona

- Primary: Silicon Valley consumer startup aping Apple's glossy reverence.
- Secondary: Everything-is-a-subscription SaaS company.
- Both layers coexist: Apple-pure homepage and hero sections give way to SaaS pricing grids at the bottom of every product detail page.

## Product lineup (30 total)

### Flagship families (4 × 3 variants = 12 SKUs)

1. **Toothbrush** — Standard / Pro / Pro Max. Firmware updates, predictive brushing.
2. **Doorknob** — Home / Pro / Enterprise. Predictive turning, biometric auth.
3. **Light Switch** — Air / Pro / Ultra. Cloud-synced, SSO login.
4. **Spoon** — Mini / Pro / Pro Max. Utensil-as-a-service billing.

### Accessories / long-tail (18 one-offs)

Coffee mug with thermal AI, umbrella with weather subscription, pillow with sleep-as-a-service, coaster with blockchain verification, paper towel dispenser with torque telemetry, water bottle with hydration compliance, pen with handwriting analytics, napkin with spill ML, trash can with waste categorization, candle subscription, umbrella stand, fork with bite counter, shoehorn with foot-angle AI, bookmark with location sync, lampshade with ambient mood, fridge magnet cloud mood board, alarm clock with wake certification, remote control with haptic TV.

## Architecture

Follows the standard catch-all pattern (`src/app/[[...slug]]/page.tsx` + `src/sites/superengineered/`).

### Files

```
src/sites/superengineered/
├── config.ts              # SiteConfig: theme, metadata, nav, features.commerce: true
├── index.ts               # Barrel: exports config, pages, dynamicRoutes
├── data/
│   └── products.ts        # 30-product catalog + helpers
└── pages/
    ├── home.tsx
    ├── shop.tsx
    ├── about.tsx
    ├── leadership.tsx
    ├── contact.tsx
    ├── privacy.tsx
    ├── terms.tsx
    ├── enterprise.tsx
    ├── developers.tsx
    ├── trust.tsx
    └── product-detail.tsx  # used via dynamicRoutes for /products/[slug]
```

### Registration

- Add to `src/sites/registry.ts` (imports + `siteRegistry` entry, including `dynamicRoutes`).
- Add `"superengineered"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts` (required — middleware redirects otherwise).

## Pages

### Core pages

- `/` — Homepage (hero + family tiles + firmware band + accessories grid + enterprise band + trust band)
- `/shop` — Full catalog, grouped by family then accessories
- `/products/[slug]` — Dynamic product detail page (glossy hero + spec table + pricing grid + compliance footnotes)
- `/cart`, `/checkout` — Shared commerce components
- `/about` — Founder-philosopher letter
- `/leadership` — 5 randomized exec bios
- `/contact` — Contact page
- `/privacy`, `/terms` — Legal boilerplate with light satirical notes

### Signature pages

- `/enterprise` — B2B sales page: "Superengineered for Workplaces." Bulk utensil-as-a-service, procurement portal, SOC 2 compliance for spoons.
- `/developers` — API docs portal: "REST API for the Cloud Light Switch." Fake endpoints, rate limits, OAuth scopes for doorknobs.
- `/trust` — Trust & Safety center: data handling for toothbrush telemetry, "where your brushing data lives."

## Homepage composition

1. **Hero** — Full-bleed Toothbrush Pro shot; "Brushing, rebuilt."; starting-at price; subscription footnote.
2. **Flagship family tiles** — Four large cards (Toothbrush, Doorknob, Light Switch, Spoon), each linking to its family's first variant.
3. **"Now with firmware 4.2" band** — Horizontal announcement band, as if a firmware update were a major event.
4. **Accessories grid** — Scrollable 18-item grid of long-tail products.
5. **Enterprise band** — "Superengineered for Workplaces" CTA → `/enterprise`.
6. **Trust band** — Reverent copy about data stewardship → `/trust`.

## Product data model

In `src/sites/superengineered/data/products.ts`:

```typescript
export type SubscriptionTier = {
  name: "Personal" | "Pro" | "Enterprise"
  priceMonthly: number
  features: string[]
  cta?: string  // e.g., "Contact Sales" for Enterprise
}

export type Product = {
  slug: string                      // "toothbrush-pro"
  family: "toothbrush" | "doorknob" | "lightswitch" | "spoon" | "accessory"
  name: string                      // "Toothbrush Pro"
  tagline: string                   // "Brushing, rebuilt."
  heroImage: string                 // /sites/superengineered/products/toothbrush-pro.png
  startingPrice: number             // hardware buy-in in USD
  specs: { label: string; value: string }[]  // Apple-style spec table
  subscription: {
    required: boolean  // display-only: when true, product page footnote reads "Subscription required to operate." When false: "Optional upgrades available."
    tiers: [SubscriptionTier, SubscriptionTier, SubscriptionTier]  // always 3 tiers
  }
  complianceFootnotes: string[]     // "Requires 2.4 GHz network. Cloud+ required after 14-day trial."
}

export const products: Product[] = [ /* 30 entries */ ]

export function getProductBySlug(slug: string): Product | undefined
export function getProductsByFamily(family: Product["family"]): Product[]
```

Long-tail accessories all share `family: "accessory"`. Flagship variants use the family slug.

## New shared components

Three new components in `src/components/ui/` (reusable across future sites):

- **`GlossyProductHero`** — Apple-style full-bleed hero: large product image, thin typography, single starting-at price, single CTA. Props: `image`, `name`, `tagline`, `startingPrice`, `ctaHref`.
- **`SpecTable`** — Two-column spec table with hairline dividers (Apple `/iphone` style). Props: `specs: { label, value }[]`.
- **`PricingGrid`** — 3-tier SaaS pricing comparison with feature checkmarks, "Recommended" highlight on the middle tier. Props: `tiers: SubscriptionTier[]`, `productName`.

No new Header/Footer — existing shared layout components already adapt via theme tokens.

## Visual theme

Bright/glassy Apple. Tokens set in site config:

- **Background:** `#ffffff` primary, `#f5f5f7` (Apple grey) for section breaks
- **Text:** `#1d1d1f` primary, `#6e6e73` secondary/muted
- **Accent:** `#0071e3` (Apple blue) for links and CTAs
- **No yellow on light backgrounds** (per project convention — contrast fails)
- **Fonts:** Thin-weight sans for hero/wordmark; regular weight for body. If `src/themes/fonts.ts` lacks a suitably thin Apple-style family, add one per the existing four-step font-addition convention (import, variable, fontFamilyMap entry, site config reference).

## Subscription / pricing UX

Dual mode:

- **Homepage and category pages** — Apple-pure. Show "Starting at $X." Subscription mentioned only as a small footnote.
- **Product detail pages** — Glossy hero on top, spec table below, then a prominent 3-tier `PricingGrid` comparing Personal / Pro / Enterprise plans with feature gates. Example gates: "Brush analytics — Pro only," "SSO login for doorknob — Enterprise only."

## Imagery strategy

30 glossy hero images is expensive to produce. Strategy:

- **Flagship families (12 SKUs):** Generate unique hero images via the image-gen MCP — soft-lit, white background, floating product shot.
- **Accessories (18 one-offs):** Generate abstract "accessory tile" renders (glowing pills, brushed-metal blocks, frosted cubes) with the product name overlaid. Apple-accessory-page vibe, cheaper to produce, visually cohesive.
- All images live under `public/sites/superengineered/products/`.

## Leadership & legal (project conventions)

- **Leadership page:** 5 execs. Names randomize BOTH first AND last (per project convention). Named base-image people (bill, brandon, jim, sean) stay male. Titles lean into the satire: "Chief Simplification Officer," "VP, Platform Verticals," "Head of Cloud Hardware," "SVP, Utensil Strategy," "Chief Trust Architect."
- **Privacy and Terms:** Standard boilerplate with light satirical touches (e.g., "We process toothbrush telemetry in accordance with GDPR").
- **Contact page:** Standard contact form/layout.

## Commerce

- `features.commerce: true` in site config → activates `CartProvider` wrapper, `CartButton` in header, `AddToCartButton` on product pages, toast notifications, shared `/cart` and `/checkout` pages.
- Cart items represent hardware purchases; subscription tiers are display-only (the joke doesn't require a working subscription checkout).

## Out of scope

- No newsroom, press, or investor-relations pages — signature pages (`/enterprise`, `/developers`, `/trust`) carry the non-standard joke weight.
- No working subscription billing — `PricingGrid` is display-only.
- No animation-heavy effects beyond what existing shared components already provide.
- No refactoring of existing sites or shared components beyond adding the three new UI primitives.

## Success criteria

- 30 products live at `/shop` and `/products/[slug]`, grouped into 4 flagship families + 18 accessories.
- Apple-glossy homepage renders on `superengineered.specificindustries.com` (and via `?site=superengineered` in dev).
- Each flagship product detail page includes: hero, spec table, 3-tier pricing grid, compliance footnotes.
- Standard site conventions met: `/leadership`, `/contact`, `/privacy`, `/terms`.
- All three new shared components (`GlossyProductHero`, `SpecTable`, `PricingGrid`) live under `src/components/ui/` and are theme-aware.
- `npm run lint` and `npx tsc --noEmit` pass.
