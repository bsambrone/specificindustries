# Rocks Site — Design Spec

**Date:** 2026-04-12
**Subdomain:** `rocks`
**Status:** Approved, ready for implementation

## Summary

A satirical hard-asset commodity brokerage that sells three SKUs: **1 Rock ($49)**, **2 Rocks ($199)**, and a **Box of Rocks ($499)**. The rocks are clearly sourced from a backyard and crudely taped into boxes. The site treats them with the full gravity of a Bloomberg-terminal-era commodities desk. The joke is 100% tonal: finance-bureau register over obviously worthless product.

## Goals

- Ship a fully-functional new subdomain site at `rocks.specificindustries.com` consistent with every other site in the portfolio
- Bloomberg Terminal aesthetic (amber-on-black mono) with full visual commitment — no winking
- Three SKUs wired into the existing commerce system with zero custom commerce logic
- Follow all three mandatory portfolio patterns: umbrella privacy/terms, standard four-exec leadership team (re-themed as 80s Wall Street traders), satirical contact page with real `bsambrone@gmail.com` in small print
- Complete image set: product photos (amateur folding-table), stock-finance heroes, vault-tour photos, and four re-themed exec portraits

## Architecture

Standard subdomain-site pattern. No changes to middleware, catch-all routing, or shared components.

```
src/sites/rocks/
├── config.ts                   # SiteConfig (theme, nav, metadata, commerce)
├── index.ts                    # barrel: config, pages, dynamicRoutes
├── data/
│   └── products.ts             # products + getProductBySlug helper
└── pages/
    ├── home.tsx
    ├── products.tsx            # listing (dense data-table style)
    ├── product-detail.tsx      # dynamic route handler, receives slug
    ├── vault-tour.tsx
    ├── about.tsx
    ├── leadership.tsx
    ├── contact.tsx
    ├── privacy.tsx
    ├── terms.tsx
    ├── cart.tsx
    └── checkout.tsx

public/sites/rocks/              # all images and favicon

scripts/generate-rocks-images.ts # image generation script
```

**Registration (required in both):**
1. `src/sites/registry.ts` — import the barrel, add to `siteRegistry`
2. `src/sites/subdomains.ts` — add `"rocks"` to `VALID_SUBDOMAINS` (edge-runtime allowlist used by middleware)

**Commerce:** `features.commerce: true` triggers `CartProvider` wrapping in `src/app/layout.tsx`, the cart button in the header, and the cart/checkout routes. Cart storage key: `rocks-cart`. No custom commerce code.

**Route map:**
- `""` → home
- `"products"` → products listing
- `"vault-tour"` → vault tour page
- `"about"`, `"leadership"`, `"contact"`, `"privacy"`, `"terms"`, `"cart"`, `"checkout"` → standard pages
- `dynamicRoutes.products` → product detail by slug (`one-rock`, `two-rocks`, `box-of-rocks`)

## Theme — Bloomberg Terminal

**Colors (CSS variables on `<body>`):**
- `background`: `#0a0a0a` — near-black (warmer than pure black)
- `text`: `#ff9900` — Bloomberg amber
- `primary`: `#ff9900` — amber, for headings/CTAs/values
- `secondary`: `#1a1a1a` — slightly lighter black for cards and table rows
- `accent`: `#00ff41` — terminal-green, used sparingly for "up" indicators

**Fonts:** `ibm-plex-mono` for both heading and body. The entire site is mono. This is a deliberate over-commitment to the terminal aesthetic.

**New font to add:** IBM Plex Mono. Requires three updates in `src/themes/fonts.ts`:
1. Import `IBM_Plex_Mono` from `next/font/google`
2. Add the instance in `fontInstanceMap` under key `"ibm-plex-mono"`
3. Add the font-family string to `fontFamilyMap`

**Visual motifs (implemented page-by-page, not theme-level):**
- Uppercase mono labels for nav, buttons, headings, table headers
- Right-aligned numeric columns with `tabular-nums` for price/value cells
- A site-wide top strip ("ticker strip") on every page showing a fake `ROCK/USD` quote with bid/ask/volume/change — static per page load, not animated
- A blinking amber cursor `▌` as decorative accent after key headings (CSS keyframes)
- ASCII horizontal rules (`══════`) where it fits the density
- Borders are 1px solid amber at 30% opacity

## Pages

### Home (`/`)
- Full-width `Hero` using the finance-stock-photo treatment (suited exec pointing at a "ROCK INDEX" chart while holding a rock)
- Headline: **"THE ONLY ASSET CLASS OLDER THAN MONEY."**
- Subheadline: positions rocks as inflation-proof, counterparty-free, terrestrial
- Ticker strip directly below hero
- Three `FeatureSection` cards: *Tangible*, *Inflation-Proof*, *Zero Counterparty Risk*
- Three-product preview row — but the cards are restyled as data-table rows, not retail cards
- CTA band: **"BEGIN ACCUMULATION."** → `/products`

### Products (`/products`)
- Dense data table, not a grid
- Columns: `TICKER | INSTRUMENT | UNIT | SPOT | CHG 24H | ACTION`
- Each row is a SKU; the action column holds the `AddToCartButton`
- Uppercase mono header, alternating row background (`#0a0a0a` / `#1a1a1a`)
- Footer row with "TOTAL MARKET CAP" (made up) and "LAST UPDATED" (always says "REALTIME")

### Product detail (`/products/[slug]`)
Three slugs: `one-rock`, `two-rocks`, `box-of-rocks`.

Layout:
- Two-column header: left = amateur product photo (folding-table treatment), right = trading card (ticker, name, spot price, description, `AddToCartButton`)
- Below: **Instrument Details** data table (weight range, approximate dimensions, provenance = "terrestrial", storage recommendation)
- Below: **Risk Factors** section as a bulleted list
- Deadpan throughout; no acknowledgment of the absurdity

### Vault Tour (`/vault-tour`)
- Hero image: garage-as-bullion-vault (dramatically lit)
- Caption: **"CLASS III BEDROCK STORAGE FACILITY — UNDISCLOSED LOCATION"**
- Photo gallery of 4-5 images with serious captions: pallets of rocks with serial stickers, a security guy with a clipboard, a combination padlock, etc.
- Pseudo-SOC2 "Attestation" block in mono with fake audit numbers and checksum hashes

### About (`/about`)
- Straight-faced finance-founder origin story: "Founded in 1987…"
- Uses the shared `Timeline` component for a fake company history (1987 founding, 2008 "survived," 2020 "expanded storage")
- Wide stock-finance hero at top

### Leadership (`/leadership`)
- Four exec cards using shared `TeamMember` component
- Bill = founder (always)
- Three others get randomized first + last names (not just surnames, per feedback memory) with finance-specific titles: *Chief Acquisition Officer, Director of Vault Operations, Head of Bedrock Research*
- Portraits re-themed as 80s Wall Street traders (suspenders, loosened tie, slicked-back hair, cigar, bullpen background)

### Contact (`/contact`)
- Satirical "trading desk" treatment
- Fake "market hours" block (closed when the owner is asleep)
- Absurd contact form with fields like "Investment Thesis" and "Net Worth Bracket"
- **Real email `bsambrone@gmail.com`** buried in small print at the bottom (per mandatory pattern)

### Privacy and Terms
- Short pages referencing the Specific Industries umbrella policy as authoritative
- No site-specific legal language (per mandatory pattern)

### Cart and Checkout
- Reuse existing commerce pages. No custom work. They adopt the amber/black theme automatically via CSS variables.

## Product Data Shape

File: `src/sites/rocks/data/products.ts`

Local `Product` interface (extends the conceptual pigmilk shape with rocks-specific fields):

```ts
export interface Product {
  slug: string
  ticker: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  instrumentDetails: Array<{ label: string; value: string }>
  riskFactors: string[]
}
```

Three products, with tickers `RCK`, `RCK2`, `RCKBX`. Prices $49 / $199 / $499. Descriptions deadpan finance-speak.

Helper: `getProductBySlug(slug)` → `Product | undefined`.

## Image Plan

One script: `scripts/generate-rocks-images.ts`. Outputs to `public/sites/rocks/`. Skips files that already exist (reruns are safe).

**10 site images:**

Amateur product photos (folding-table treatment):
1. `product-one-rock.png` — single rock, paper-towel backdrop, phone-flash lighting, visible tape
2. `product-two-rocks.png` — two rocks, same setup
3. `product-box-of-rocks.png` — rocks crudely taped in a cardboard box

Hero / stock-finance treatment:
4. `hero.png` — suited exec pointing at "ROCK INDEX" chart, holding a rock, amber Bloomberg glow
5. `about-hero.png` — trading floor wide shot, ticker monitors, one guy holding a rock up triumphantly

Vault Tour (mock-bullion treatment):
6. `vault-hero.png` — suburban garage, dramatic spotlight, pallets of rocks, "CLASS III" stencil
7. `vault-pallet.png` — close-up of rocks on a pallet with serial stickers and QR code
8. `vault-security.png` — polo-shirt security guy with clipboard in front of chain-link fence
9. `vault-padlock.png` — heavy combination padlock on chain-link gate

Contact:
10. `contact-office.png` — "trading desk" that's clearly a card table with three monitors and a rotary phone

**4 exec portraits** (add a `rocks` section to `scripts/generate-exec-portraits.ts` or include them in the main script):
- `team-bill.png`, `team-brandon.png`, `team-jim.png`, `team-sean.png`
- Style prompt: 80s Wall Street trader — suspenders, loosened tie, slicked-back hair, cigar, bullpen background, film grain, warm amber lighting

**Favicon:** `favicon.png` — a single rock silhouette on amber background.

## Copy Voice

**Rule:** The copy never acknowledges the joke. It treats rocks as a serious asset class using real finance jargon correctly (spot, yield, basis, position, exposure, custody, instrument, allocation, counterparty). Humor comes entirely from the gap between register and subject.

**Style:**
- Clinical, analytical, slightly bureaucratic
- Passive voice and third person by default ("Positions are acquired" over "You buy rocks")
- Numbers everywhere — every claim gets a fake statistic or basis-point figure
- All-caps mono labels; sentence case for prose

## Verification

No unit tests (this repo has no test infrastructure). Verification is build + lint + typecheck + manual smoke.

1. `npm run lint` — clean
2. `npx tsc --noEmit` — clean
3. `npm run build` — clean production build
4. Dev-server smoke test:
   - `/?site=rocks` — home renders with theme, hero image, ticker strip
   - `/products?site=rocks` — data table with three rows
   - `/products/one-rock?site=rocks`, `/products/two-rocks?site=rocks`, `/products/box-of-rocks?site=rocks` — each detail page renders
   - `/products/nonexistent?site=rocks` → 404
   - `/vault-tour?site=rocks` — gallery renders
   - `/about`, `/leadership`, `/contact`, `/privacy`, `/terms` — all render; contact page has the real email in small print
   - Cart flow: add to cart → badge increments → `/cart` shows the item → `/checkout` renders
   - `/?site=pigmilk` — pigmilk still works (regression check)

## Out of Scope

- No custom commerce logic; reuse existing cart + checkout
- No server-side persistence; cart is localStorage only (consistent with portfolio)
- No actual ticker/market data; all numbers are static or computed deterministically per load
- No tests (portfolio has none)
- No analytics-specific work beyond what the root layout already wires up
