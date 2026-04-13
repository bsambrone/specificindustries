# Rocks Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `rocks` subdomain site (hard-asset finance satire) end-to-end: code, images, verification, and commit to main.

**Architecture:** Standard subdomain-site pattern. New site module under `src/sites/rocks/`, registered in both `src/sites/registry.ts` and `src/sites/subdomains.ts`. Bloomberg Terminal aesthetic via theme CSS variables. IBM Plex Mono added to `src/themes/fonts.ts`. Commerce reuses existing components. Images generated via `scripts/generate-rocks-images.ts` (OpenAI gpt-image-1) and the existing exec-portrait flow.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, IBM Plex Mono, gpt-image-1.

Spec: `docs/superpowers/specs/2026-04-12-rocks-site-design.md`.

---

## Phase 1 — Foundation

### Task 1: Add IBM Plex Mono font

**Files:** Modify `src/themes/fonts.ts`

- [ ] Add `IBM_Plex_Mono` to the `next/font/google` import line
- [ ] Declare the font instance below the existing ones:

```ts
export const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
```

- [ ] Add `"ibm-plex-mono": ibmPlexMono` to `fontInstanceMap`
- [ ] Add `"ibm-plex-mono": "'IBM Plex Mono', monospace"` to `fontFamilyMap`

### Task 2: Create site config

**Files:** Create `src/sites/rocks/config.ts`

```ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Rocks",
  subdomain: "rocks",
  theme: {
    preset: "terminal",
    colors: {
      primary: "#ff9900",
      secondary: "#1a1a1a",
      accent: "#00ff41",
      background: "#0a0a0a",
      text: "#ff9900",
    },
    fonts: {
      heading: "ibm-plex-mono",
      body: "ibm-plex-mono",
    },
  },
  metadata: {
    title: "ROCKS — The Only Asset Class Older Than Money",
    description:
      "Institutional-grade bedrock exposure. Terrestrial hard assets with zero counterparty risk. Accumulate positions at spot.",
  },
  nav: [
    { label: "MARKETS", path: "/products" },
    { label: "VAULT", path: "/vault-tour" },
    { label: "ABOUT", path: "/about" },
    { label: "LEADERSHIP", path: "/leadership" },
    { label: "CONTACT", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

### Task 3: Create product data

**Files:** Create `src/sites/rocks/data/products.ts`

Shape:

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

Three products:
- `one-rock` / `RCK` / $49.00 / "The foundational position."
- `two-rocks` / `RCK2` / $199.00 / "Diversification through duplication."
- `box-of-rocks` / `RCKBX` / $499.00 / "Institutional-grade bedrock exposure."

Each gets 2-3 paragraphs of deadpan description, an `instrumentDetails` array (5-6 label/value pairs), and a `riskFactors` array (5-6 items). Export `products` array and `getProductBySlug(slug)` helper.

### Task 4: Create common components for rocks pages

**Files:** Create `src/sites/rocks/components/ticker-strip.tsx`, `src/sites/rocks/components/terminal-heading.tsx`

- **TickerStrip** — horizontal bar rendered near the top of each page showing `ROCK/USD 52.47  +1.23  BID 52.45  ASK 52.49  VOL 1,247,910  HI 53.12  LO 51.88` in mono, amber. Static numbers, no animation. Border top/bottom amber-30.
- **TerminalHeading** — renders an uppercase heading followed by a blinking amber cursor `▌`. Props: `children`, optional `level` (h1/h2/h3). Uses a CSS class with a `blink` keyframe.

Add the `@keyframes blink` and `.cursor-blink` classes to `src/app/globals.css` (they're site-agnostic — just a blinking opacity animation).

### Task 5: Home page

**Files:** Create `src/sites/rocks/pages/home.tsx`

Structure:
- `<Hero>` with `image="/sites/rocks/hero.png"`, headline `"THE ONLY ASSET CLASS OLDER THAN MONEY."`, subheadline about terrestrial exposure and zero counterparty risk, CTA `"BEGIN ACCUMULATION"` → `/products`
- `<TickerStrip />` immediately below hero
- Three feature cards section: *TANGIBLE*, *INFLATION-PROOF*, *ZERO COUNTERPARTY RISK*. Each uses a mono uppercase heading, amber border, short deadpan description
- Three-product preview styled as a data table (not `ProductCard`) — three rows with ticker, name, price, CTA button
- CTA band: "BEGIN ACCUMULATION" → `/products`

### Task 6: Products listing page

**Files:** Create `src/sites/rocks/pages/products.tsx`

- `<TickerStrip />` at top
- Page heading `"MARKET DEPTH ▌"` using `TerminalHeading`
- Dense `<table>` with uppercase mono headers: `TICKER | INSTRUMENT | UNIT | SPOT | CHG 24H | ACTION`
- Three rows (one per product). Row hover highlight. Right-aligned numeric columns with `tabular-nums`
- `AddToCartButton` in the ACTION cell, styled amber-on-black with amber border
- Footer note: `"MARKET DATA REALTIME. LAST UPDATED: NOW."`
- `export const metadata = { title: "MARKETS — ROCKS", description: "..." }`

### Task 7: Product detail page

**Files:** Create `src/sites/rocks/pages/product-detail.tsx`

- Receives `{ slug }` prop (from dynamic route)
- Calls `getProductBySlug(slug)`; returns `null` if missing (catch-all validates first)
- Two-column header: left = `<Image>` of product, right = ticker, name, tagline, spot price, `AddToCartButton`
- Below: `<TerminalHeading>INSTRUMENT DETAILS ▌</TerminalHeading>` → table rendering `instrumentDetails`
- Below: `<TerminalHeading>RISK FACTORS ▌</TerminalHeading>` → bulleted list rendering `riskFactors`
- Below: a section of 2-3 paragraphs from `product.description`
- Styling: amber borders at 30% opacity, mono everywhere, tabular numerics

### Task 8: Vault Tour page

**Files:** Create `src/sites/rocks/pages/vault-tour.tsx`

- Full-bleed hero image `/sites/rocks/vault-hero.png` with overlay caption: `"CLASS III BEDROCK STORAGE FACILITY — UNDISCLOSED LOCATION"`
- `<TerminalHeading>CUSTODY OPERATIONS ▌</TerminalHeading>` followed by a short deadpan paragraph
- Four-image gallery grid: `vault-pallet.png`, `vault-security.png`, `vault-padlock.png`, `contact-office.png` (reuse for now as a 4th vault image). Each with a serious caption in amber mono
- Pseudo-SOC2 attestation block: mono-formatted fake audit log with amber border, columns like `CLIENT ID | ASSET HASH | LAST AUDIT | STATUS`. 4-5 rows of fake data
- `export const metadata`

### Task 9: About page

**Files:** Create `src/sites/rocks/pages/about.tsx`

- Wide stock-finance `<Hero>` with `image="/sites/rocks/about-hero.png"`, headline `"ESTABLISHED 1987."`, subheadline about serving generations of accumulators
- `<TickerStrip />`
- `<TerminalHeading>CORPORATE HISTORY ▌</TerminalHeading>` + 3 paragraphs in deadpan finance voice
- `<Timeline>` component (import from `@/components/ui/timeline`) with fake company milestones: 1987 Founded, 1994 First Vault, 2008 Survived, 2016 Institutional Tier, 2020 Expanded Storage, 2024 Restructured, 2026 Present
- `export const metadata`

### Task 10: Leadership page

**Files:** Create `src/sites/rocks/pages/leadership.tsx`

- `<TerminalHeading>LEADERSHIP ▌</TerminalHeading>` + intro paragraph
- 4-column grid of `<TeamMember>` components (from `@/components/ui/team-member`)
- Bill is always the founder. The other three have randomized first+last names (not just surnames, per feedback memory) and finance titles (Chief Acquisition Officer, Director of Vault Operations, Head of Bedrock Research)
- Portraits: `/sites/rocks/team-bill.png`, `team-brandon.png`, `team-jim.png`, `team-sean.png`
- Names to use:
  - Bill: `"William R. Goldsworth"` — Founder & CEO
  - Brandon: randomize — e.g., `"Marcus T. Ashcroft"` — Chief Acquisition Officer
  - Jim: randomize — e.g., `"Lawrence V. Stonebridge"` — Director of Vault Operations
  - Sean: randomize — e.g., `"Douglas F. Pennington"` — Head of Bedrock Research
- `export const metadata`

### Task 11: Contact page

**Files:** Create `src/sites/rocks/pages/contact.tsx`

- `<TerminalHeading>CONTACT THE TRADING DESK ▌</TerminalHeading>`
- Two-column layout: left = "market hours" block (trading hours that are clearly when the owner is awake — e.g., `MON-FRI 0900-2200 EST, SAT 1100-1900 EST, SUN CLOSED`); right = absurd contact form (fields: `INVESTMENT THESIS`, `NET WORTH BRACKET`, `EXPOSURE TARGET`, `MESSAGE`)
- Small section with `contact-office.png` image
- Footer small print: `"For urgent custody matters outside market hours, direct correspondence may be sent to bsambrone@gmail.com."` (real email — mandatory)
- `export const metadata`

### Task 12: Privacy and Terms pages

**Files:** Create `src/sites/rocks/pages/privacy.tsx`, `src/sites/rocks/pages/terms.tsx`

Both pages are short, mono-styled, and reference the Specific Industries umbrella policy as authoritative (no site-specific legal language). Each exports a default component and a `metadata` object.

### Task 13: Cart and Checkout pages

**Files:** Create `src/sites/rocks/pages/cart.tsx`, `src/sites/rocks/pages/checkout.tsx`

- **Cart:** copy the pigmilk cart page structure but change copy strings to finance register (`"YOUR POSITION IS UNFUNDED."` as the empty state, `"TRANSACTION COST"` instead of "Pig Handling Fee", `"SETTLEMENT FEE"` instead of "Oink Tax", checkout CTA `"INITIATE SETTLEMENT"`). Use `rocks-cart` implicitly via the root layout's `CartProvider`.
- **Checkout:** deadpan "settlement pending" page. Image: `contact-office.png` or a placeholder. Copy explains that manual rock shipment coordination is required. Button: "RETURN TO MARKETS" → `/products`.

### Task 14: Barrel and registration

**Files:** Create `src/sites/rocks/index.ts`. Modify `src/sites/registry.ts` and `src/sites/subdomains.ts`.

`src/sites/rocks/index.ts`:

```ts
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import RocksHome from "./pages/home"
import RocksProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import RocksVaultTour, { metadata as vaultMetadata } from "./pages/vault-tour"
import RocksAbout, { metadata as aboutMetadata } from "./pages/about"
import RocksLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import RocksContact, { metadata as contactMetadata } from "./pages/contact"
import RocksPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import RocksTerms, { metadata as termsMetadata } from "./pages/terms"
import RocksCart from "./pages/cart"
import RocksCheckout from "./pages/checkout"

export { config }

export const pages: Record<string, PageEntry> = {
  "": RocksHome,
  "products": { component: RocksProducts, metadata: productsMetadata },
  "vault-tour": { component: RocksVaultTour, metadata: vaultMetadata },
  "about": { component: RocksAbout, metadata: aboutMetadata },
  "leadership": { component: RocksLeadership, metadata: leadershipMetadata },
  "contact": { component: RocksContact, metadata: contactMetadata },
  "privacy": { component: RocksPrivacy, metadata: privacyMetadata },
  "terms": { component: RocksTerms, metadata: termsMetadata },
  "cart": RocksCart,
  "checkout": RocksCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.ticker} — ${product.name} — ROCKS`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

`src/sites/registry.ts`:
- Add import: `import { config as rocksConfig, pages as rocksPages, dynamicRoutes as rocksDynamicRoutes } from "./rocks"`
- Add to `siteRegistry`: `rocks: { config: rocksConfig, pages: rocksPages, dynamicRoutes: rocksDynamicRoutes },`

`src/sites/subdomains.ts`:
- Add `"rocks",` to `VALID_SUBDOMAINS` array

### Task 15: Verify the site compiles and runs (pre-image smoke test)

- [ ] Run `npx tsc --noEmit` — expect clean
- [ ] Run `npm run lint` — expect clean
- [ ] Run `npm run build` — expect clean (images will be referenced but not yet exist — Next's `<Image>` won't fail the build for missing source files since they're public path refs)
- [ ] If build complains about missing images, create empty placeholder PNGs at the expected paths so the build passes, then replace in Phase 2
- [ ] Commit: `feat(rocks): scaffold rocks subdomain site with theme, pages, and products`

---

## Phase 2 — Images

### Task 16: Create image generation script

**Files:** Create `scripts/generate-rocks-images.ts`

Model it on `scripts/generate-grassfedwifi-images.ts`. Uses OpenAI gpt-image-1 API. Reads `.env` from project root for `OPENAI_API_KEY`. Outputs to `public/sites/rocks/`. Skips existing files.

Image prompts:

1. **`product-one-rock.png`** (1024x1024): *"Amateur product photography of a single medium-sized rock dug from a backyard, placed on a folding table covered in a paper towel. Harsh phone flash lighting, slightly off-white background, visible brown shipping tape at the edge of the frame. The rock is irregular, dirt still clinging to it. Obvious amateur e-commerce photography, no stylization."*
2. **`product-two-rocks.png`** (1024x1024): same setup, two rocks side by side, one slightly larger
3. **`product-box-of-rocks.png`** (1024x1024): *"Amateur product photography of a plain unmarked cardboard box, half-open, crudely sealed with wide brown packing tape, containing approximately 10-12 dirt-covered rocks dug from a backyard. Folding table, harsh flash lighting, paper towel underneath."*
4. **`hero.png`** (1536x1024): *"Bloomberg-terminal-style corporate photograph: a middle-aged man in a grey suit stands in front of a wall of monitors showing amber financial charts on black backgrounds. One monitor prominently displays 'ROCK INDEX' with a rising line chart. The man is holding a single medium-sized rock in his left hand like a prized commodity. Dramatic amber rim lighting, 1980s finance aesthetic, film grain."*
5. **`about-hero.png`** (1536x1024): *"Wide shot of a 1980s trading floor with rows of CRT monitors showing amber text on black. In the foreground, a man in a rumpled white dress shirt holds a rock up above his head triumphantly like a trophy. Other traders are on phones around him. Film grain, amber ambient light, cluttered desks."*
6. **`vault-hero.png`** (1536x1024): *"A dimly lit suburban garage with concrete floor, dramatic spotlight from above illuminating a wooden pallet stacked with irregular rocks. A stenciled 'CLASS III' marking is visible on the concrete wall behind. Serious industrial vibe trying to look like a bullion vault, but the garage door and workbench in the background give it away. Film grain."*
7. **`vault-pallet.png`** (1024x1024): *"Close-up photograph of rocks stacked on a wooden pallet, each with a small white serial-number sticker and a QR code. Overhead fluorescent lighting. Industrial warehouse background. Shot on a film camera, slight grain."*
8. **`vault-security.png`** (1024x1024): *"A man in his 40s wearing a royal blue polo shirt with a 'SECURITY' embroidered patch and a lanyard, holding a clipboard, standing in front of a chain-link fence. Deadpan serious expression. Suburban warehouse exterior in the background. Natural daylight. He is clearly the only employee."*
9. **`vault-padlock.png`** (1024x1024): *"Close-up photograph of a heavy combination padlock hanging on a chain-link gate. Warehouse interior visible through the fence. Moody side lighting, film grain, high contrast."*
10. **`contact-office.png`** (1024x1024): *"A makeshift 'trading desk' that is clearly a folding card table with three old CRT monitors showing amber financial data, a rotary phone, and a stapler. The setting is a basement or garage with concrete floor. Film grain, harsh overhead lighting."*

**Exec portraits** (via `generateImageWithPerson` with `person: "bill"|"brandon"|"jim"|"sean"`):

Shared prompt: *"Professional portrait of this person as an 1980s Wall Street trader. Suspenders over a rumpled white dress shirt, loosened necktie, slicked-back hair, a lit cigar in one hand, standing in a dim bullpen trading floor with amber monitors in the background. Warm amber film-grain lighting, 1987 aesthetic, dramatic and serious expression."*

Output files: `team-bill.png`, `team-brandon.png`, `team-jim.png`, `team-sean.png`.

**Favicon:** `favicon.png` at 512x512: *"Minimal icon: a solid amber silhouette of an irregular rock shape centered on a pure black square background. Flat, no gradients, no shadows, no text. The rock silhouette is simple and readable at small sizes."*

### Task 17: Run the image script

- [ ] Run `npx tsx scripts/generate-rocks-images.ts`
- [ ] Wait for completion. Verify 10 site images + 4 portraits + favicon all exist in `public/sites/rocks/`
- [ ] If any generation fails, retry that image (script is idempotent)
- [ ] Commit: `feat(rocks): generate all product, hero, vault, and exec images`

---

## Phase 3 — Verification and Ship

### Task 18: Full verification

- [ ] Run `npm run lint` — expect clean
- [ ] Run `npx tsc --noEmit` — expect clean
- [ ] Run `npm run build` — expect clean build
- [ ] Start `npm run dev`, then curl each route to confirm it returns 200:
  - `GET /?site=rocks`
  - `GET /products?site=rocks`
  - `GET /products/one-rock?site=rocks`, `/products/two-rocks?site=rocks`, `/products/box-of-rocks?site=rocks`
  - `GET /products/nonexistent?site=rocks` — expect 404
  - `GET /vault-tour?site=rocks`
  - `GET /about?site=rocks`
  - `GET /leadership?site=rocks`
  - `GET /contact?site=rocks` — grep for `bsambrone@gmail.com` in response body
  - `GET /privacy?site=rocks`, `/terms?site=rocks`
  - `GET /cart?site=rocks`, `/checkout?site=rocks`
- [ ] Regression check: `GET /?site=pigmilk` still returns 200
- [ ] Stop the dev server

### Task 19: Commit and push

- [ ] `git add` all the new files
- [ ] Commit message: `feat(rocks): add rocks subdomain site — hard-asset commodity satire`
- [ ] `git push origin HEAD:main` (push directly to main per portfolio convention)

---

## Self-Review Notes

- **Spec coverage:** every spec section has a task (config → Task 2, theme → Task 1+config, pages → Tasks 5-13, product data → Task 3, images → Tasks 16-17, verification → Task 18, copy voice → applied in each page task)
- **No placeholders:** every code step has concrete code or explicit file paths
- **Type consistency:** `Product` interface in Task 3 matches usage in Task 7 (product-detail)
- **Commerce:** wired via `features.commerce: true` (Task 2) and the root layout's existing `CartProvider` branch — no new work needed
- **Mandatory patterns:** umbrella privacy/terms (Task 12), exec team (Task 10), real email (Task 11) — all explicitly called out
- **Registration:** both `registry.ts` AND `subdomains.ts` in Task 14 per feedback memory
