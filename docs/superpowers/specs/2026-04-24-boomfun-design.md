# Boom-Fun! — Design Spec

**Date:** 2026-04-24
**Subdomain:** `boomfun`
**Brand:** Boom-Fun!
**Status:** Design approved, ready for implementation planning

## Concept

A satirical subdomain site styled as a 1961 American toy catalog from a company that cheerfully sells blasting caps and related demolition toys to children. The voice is **oblivious wholesome**: the site genuinely believes these products are fine, safe, character-building entertainment. The comedy comes from the gap between the chipper catalog tone and the horrifying reality of what the company sells.

The site sits on the specificindustries.com platform as one more subdomain, following the established multi-site architecture (see root `CLAUDE.md`). No new App Router routes; all pages go through the catch-all.

## Audience & Tone

- **Voice:** Sincere, cheerful, oblivious. Never winks at the reader.
- **Reference:** 1960s Sears Christmas Wish Book, Daisy BB-gun ads, Mattel catalog copy from the lawn-dart era.
- **Safety framing:** The site treats safety seriously — in a way that makes the danger worse. "Remember: never squeeze the blasting cap! The blasting cap does not want to be squeezed."
- **No dark winks:** No self-aware "of course this is insane" humor. The joke is the sincerity.

## Brand & Visual Identity

### Identity

- **Name:** Boom-Fun! (exclamation mark is part of the brand)
- **Tagline:** "Real Kaboom. Real Kids. Real Fun."
- **verticalKey:** `consumer-goods`
- **Founding (fictional):** 1961, Toledo, Ohio

### Palette (Christmas Wish Book)

| Token | Hex | Usage |
|-------|-----|-------|
| primary | `#c8102e` | Rich catalog red — headlines, buttons, dominant accent |
| secondary | `#d77a1f` | Burnt orange — secondary callouts, starbursts |
| accent | `#e8c547` | Atomic yellow — **decorative only**, never text on light bg |
| background | `#f5ead5` | Aged catalog-paper cream |
| text | `#16233d` | Deep navy |

Light preset. Follows the cross-portfolio rule: yellow accent is used only for decorative elements (borders, low-opacity tints, icons) — never as text on the cream background.

### Typography

- **Heading:** `alfa-slab-one` — chunky display slab serif, evokes 1961 catalog covers
- **Body:** `work-sans` — clean workhorse sans, already in the shared font stack

If `alfa-slab-one` is not already declared in `src/themes/fonts.ts`, add it per the four-step font-registration pattern in `CLAUDE.md`.

## Site Structure

### Pages

12 page files total (9 standard + 3 themed). One of the 12 powers the dynamic `/products/[slug]` route.

**Standard pages** (required per portfolio conventions):

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/products` | Catalog index |
| `/products/[slug]` | Product detail (dynamic route, 8 items) |
| `/about` | Company history + leadership |
| `/contact` | Satirical contact with real email in small print |
| `/privacy` | Umbrella callout + satirical Boom-Fun privacy policy |
| `/terms` | Umbrella callout + satirical Boom-Fun terms |
| `/cart` | Commerce cart (shared CartProvider) |
| `/checkout` | Commerce checkout |

**Themed pages** (Boom-Fun personality):

| Path | Purpose |
|------|---------|
| `/safety` | Sparky's Safety Corner — The Four Rules |
| `/club` | The Boom-Fun! Club membership page with clip-out coupon |
| `/testimonials` | Letters from happy young demolitionists and their parents |

### Navigation

Top nav (7 items): Home, Products, Safety Corner, Club, Testimonials, About, Contact.
Footer: Privacy, Terms.
Header right: CartButton with item-count badge.

### Commerce

`features.commerce: true` — enables CartProvider wrapper, AddToCartButton on product cards/detail, Toast on add-to-cart, and the Cart/Checkout pages. Cart state is client-side localStorage per the existing pattern.

## Home Page

Single vertical scroll, top to bottom:

1. **Hero** — Full-width hero image (1960s family gathered around opening a Boom-Fun! product — dad in cardigan, mom in apron, two grinning kids, birthday-party energy). Chunky slab-serif wordmark "BOOM-FUN!" with starburst callouts ("NEW FOR 1961!", "AS ADVERTISED ON RADIO!"). Subheadline tagline. Primary CTA → `/products`.

2. **"Why Boom-Fun?" feature row** — three columns with starburst icons:
   - "American-Made Detonators"
   - "Every Kit Inspected by Sparky!"
   - "A Family Tradition Since 1961"

3. **Featured Products grid** — 3–4 standout products (Glitter Claymore, Junior Dynamite Fishing Kit, Blasting Cap Lunchbox, Glitter Confetti Mortar) using the hybrid catalog-card treatment (item №, NEW! starburst, stock #). "See the Full Catalog →" link.

4. **Sparky's Safety Corner teaser** — framed block with Sparky illustration and the Four Rules titles. CTA → `/safety`.

5. **Boom-Fun! Club recruitment banner** — horizontal banner with kit contents preview. CTA → `/club`.

6. **Testimonials strip** — 2–3 short pull-quotes with name/age/city ("Timmy, age 8, Dayton, OH"). CTA → `/testimonials`.

7. **Footer** (shared component).

## Products & Catalog

### Product Catalog (8 items)

| # | Product | Slug | Stock # | Price |
|---|---------|------|---------|-------|
| 1 | The Original Glitter Claymore | `glitter-claymore` | BF-101 | $19.95 |
| 2 | Junior Dynamite Fishing Kit | `dynamite-fishing-kit` | BF-204 | $14.95 |
| 3 | The Friendly Mailbox Greeting Firecracker | `mailbox-firecracker` | BF-318 | $4.95 |
| 4 | Young Landscaper's Tree-Stump Remover | `tree-stump-remover` | BF-422 | $24.95 |
| 5 | Pocket Fuse Rainbow Assortment (50-pack) | `pocket-fuse-assortment` | BF-517 | $2.95 |
| 6 | The Blasting Cap Lunchbox | `blasting-cap-lunchbox` | BF-603 | $8.95 |
| 7 | Sparky's Safety Handbook for Young Detonators | `sparky-safety-handbook` | BF-709 | $0.49 |
| 8 | Glitter Confetti Aerial Mortar | `glitter-confetti-mortar` | BF-812 | $34.95 |

### Catalog-Card Decorations (Hybrid Layout)

Extends or wraps the shared `ProductCard` with 1960s catalog flavor:

- Corner badge: "ITEM №[n]" and stock number
- Optional starburst overlay: `NEW!`, `BESTSELLER!`, or `SALE!`
- Price rendered in a dashed-border "clip-coupon" box
- Dotted-line separators between cards to feel like catalog gutters

Implementation note: likely a site-local `CatalogProductCard` component in `src/sites/boomfun/components/` wrapping or composing the shared card. Decide during implementation; do not promote to shared unless a second site needs the same treatment.

### Product Detail Page (`/products/[slug]`)

- Large product image
- Item # + Stock # header (big chunky type)
- 2–3 paragraphs of breathless catalog copy
- "WHAT'S IN THE BOX" bulleted list — always includes "Two (2) Blasting Caps — Handle Gently!" where relevant
- "SAFETY NOTES" framed block in the oblivious-wholesome voice
- Price + AddToCartButton
- Pull-quote testimonial at the bottom

### Data Shape

`src/sites/boomfun/data/products.ts` follows the existing `Product` interface:
- `slug`, `name`, `stockNumber`, `itemNumber`, `tagline`, `description` (string or string[]), `image`, `price`, `badge?` (e.g., "NEW!"), `whatsInBox` (string[]), `safetyNote` (string), `testimonial` (object with quote/name/age/city)
- `products` array export
- `getProductBySlug(slug)` helper export

The existing shared `Product` interface may need a minor extension for `stockNumber`, `itemNumber`, `badge`, `whatsInBox`, `safetyNote`, `testimonial`; if so, those fields are optional on the shared interface so other sites are not affected.

## Themed Pages

### `/safety` — Sparky's Safety Corner

- Header: "Sparky's Safety Corner" with Sparky mascot illustration (cartoon stick of dynamite wearing a safety helmet, thumbs-up)
- Intro: "Hi kids! Sparky here. Boom-Fun! products are FUN — but only when you follow the Four Rules!"
- **The Four Rules** (numbered framed blocks with illustrated icons):
  1. **Don't Squeeze the Blasting Cap.** (The blasting cap does not like to be squeezed.)
  2. **Light the Fuse From the Long End.** (The long end is the end far from the thing that goes kaboom.)
  3. **Count Your Fingers Before AND After.** (Make sure the numbers match.)
  4. **Ask an Adult First.** (Any adult will do. The mailman is an adult.)
- Closing: "Every Boom-Fun! product is inspected by Sparky himself!" with a stamp graphic

### `/club` — The Boom-Fun! Club

- Header: "JOIN THE BOOM-FUN! CLUB" with starburst
- Intro in period-accurate children's-club voice: "Kids! Send in just $1 and three Boom-Fun! product stock numbers and you'll receive..."
- **Membership kit**:
  - Official Boom-Fun! Club Membership Card
  - Secret Handshake Diagram
  - Real Blasting Cap Lapel Pin
  - Bi-monthly newsletter "The Fuse"
  - Decoder Ring (for activating the secret handshake)
- **Clip-out coupon** — dashed-border box with visual-only fields (Name, Age, Address, "My favorite Boom-Fun! product is ___"). No form submission. Button reads "Mail to: Boom-Fun! Club, Station Road, Toledo OH".
- **Club Pledge**: "I, [your name], solemnly promise to never squeeze the blasting cap."

### `/testimonials` — Letters from Happy Customers

- Header: "Letters from Happy Young Detonators & Their Proud Parents"
- 6–8 testimonial cards styled like 1960s printed letters (serif type, fake signatures)
  - 50/50 mix of kids and parents
  - Photos reference `/shared/testimonials/*.png` (38-portrait shared library)
  - Names with age and city/state ("Timmy Whitfield, age 8, Dayton, OH")
  - Oblivious-wholesome voice — e.g., a mom grateful her son "has so much more respect for the outdoors"; a dad noting his boy "hasn't had a single playground altercation since his birthday"
- "Letters to Sparky" sidebar with kids' fan letters

Testimonial data lives in `src/sites/boomfun/data/testimonials.ts` as a typed array.

## About Page & Leadership

### `/about`

- Opening: fabricated 1961 founding story ("From the garage of a Toledo, Ohio engineer who believed American children deserved REAL fun…")
- Timeline (shared `Timeline` component): 1961 founded → 1964 first national catalog → 1967 Sparky introduced → 1971 Junior Dynamite Fishing Kit becomes #1 seller → 1975 launch of the Club → present-day reissue framing
- **Leadership section**: "The Boom-Fun! Board of Directors" with the shared `TeamMember` component
- Closing: "Still American-owned. Still American-made. Still kaboom."

### Leadership Team

`src/sites/boomfun/data/leadership.ts` — 4 entries following the portfolio leadership convention. Names fully randomized (first AND last). `person` field keys to the canonical base image.

| Seat | Name | Title | Person (base image) |
|------|------|-------|---------------------|
| Founder | Harland P. Crenshaw | Founder & Chief Detonations Officer | bill |
| 2 | Earl Whitfield III | President, Consumer Boom Division | brandon |
| 3 | Donovan Pryce | Head of Research & Fireworks | jim |
| 4 | Merritt Halberd | VP of Parental Outreach | sean |

All four are portrayed as male (matches canonical base-image genders). Portrait style: **1960s Mad Men execs** — navy suits, skinny ties, horn-rimmed glasses, wood-paneled office backgrounds. Generated via the existing `scripts/` image pipeline using the four base photos.

Portrait field name: `portraitImage` (accepted alias; consistent with other sites).

## Standard Pattern Pages

### `/contact`

Satirical 1960s-style "Write to us!" page: typewriter-era copy, fake mailing address ("Boom-Fun! Industries, Station Road, Toledo OH"), fake switchboard extension. **`bsambrone@gmail.com`** appears in small print at the bottom per the portfolio convention.

### `/privacy` and `/terms`

Both follow the canonical pigmilk two-layer shape:

1. **Specific Industries umbrella callout** — bordered/framed block at the top pointing to `specificindustries.com/privacy` or `/terms` as authoritative and noting it governs all data handling.
2. **Numbered satirical sections below** in Boom-Fun voice — covering data collection, cookies, user rights, warranty, etc. Example: "§3. Mailing List — Upon joining the Boom-Fun! Club your child will receive 'The Fuse' bi-monthly until 1971. This list is shared with no one, because no one else will have it."

## Architecture & File Layout

New files under `src/sites/boomfun/`:

```
src/sites/boomfun/
├── config.ts                  # SiteConfig with theme, nav, verticalKey, tagline, ogImage
├── index.ts                   # Barrel: config, pages, dynamicRoutes
├── components/
│   └── CatalogProductCard.tsx # (optional, site-local) hybrid catalog decorations
├── data/
│   ├── products.ts            # Product[] + getProductBySlug()
│   ├── leadership.ts          # 4 execs with person field
│   └── testimonials.ts        # 6-8 testimonials referencing /shared/testimonials/*.png
└── pages/
    ├── home.tsx
    ├── products.tsx
    ├── product-detail.tsx
    ├── safety.tsx
    ├── club.tsx
    ├── testimonials.tsx
    ├── about.tsx
    ├── contact.tsx
    ├── privacy.tsx
    ├── terms.tsx
    ├── cart.tsx
    └── checkout.tsx
```

### Shared-component reuse

`Hero`, `FeatureSection`, `Timeline`, `TeamMember`, `FaqAccordion`, `ProductCard`, `Toast`, `AddToCartButton`, `CartButton` — all used directly where possible.

### Integration edits

1. `src/sites/registry.ts` — import and register `boomfun`
2. `src/sites/subdomains.ts` — add `"boomfun"` to `VALID_SUBDOMAINS`
3. `src/app/sitemap.ts` — import `products` from `boomfun/data/products` and add to the productSites section for `/products/:slug` coverage
4. `scripts/resize-favicons.mjs` — add `"boomfun"` to the hardcoded sites array
5. `src/themes/fonts.ts` — add `alfa-slab-one` if not already registered (four-step font pattern)

### Assets

`public/sites/boomfun/`:

- `hero.png` — 1960s family opening a product
- `og.png` (or reuse `hero.png` via config) — OG social preview
- `favicon.png` — 64×64 starburst/logo mark
- `sparky.png` — reusable mascot illustration
- 8 product images (one per catalog item)
- 4 exec portraits — Mad Men style on the four canonical base photos

All assets generated via the existing `scripts/` image pipeline. Testimonial portraits reuse `/shared/testimonials/*.png` — no new images required for those.

## Out of Scope

- Real form submission on the club coupon (visual-only; the clip-coupon is decorative)
- Server-side state, database, or real e-commerce processing (cart is client-side localStorage per existing pattern)
- New shared components for other sites (the optional `CatalogProductCard` stays site-local)
- Changes to the apex home page or portfolio directory — `boomfun` is picked up automatically once registered with a `verticalKey`
- Backfilling any unrelated site

## Acceptance Criteria

- Visiting `boomfun.specificindustries.com` in production (or `?site=boomfun` in dev) loads the home page with the 1960s catalog feel
- All 11 pages render without console or type errors
- `npx tsc --noEmit` passes
- `npm run lint` passes
- 8 product detail pages render at `/products/<slug>` via the dynamic route
- Cart + checkout flow works end-to-end client-side
- `/shared/testimonials/*.png` referenced images resolve on `/testimonials`
- Leadership team appears on `/about` and the four execs appear on their apex Leader Detail pages' "Board Positions"
- Favicon displays correctly in browser tabs
- OG preview renders correctly when a Boom-Fun! URL is shared on social
- `boomfun` appears in the sitemap for both static pages and `/products/:slug` entries
