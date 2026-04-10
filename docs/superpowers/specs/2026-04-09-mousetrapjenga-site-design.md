# Mousetrap Jenga — Retro Toy Satire Site Design

**Date:** 2026-04-09
**Subdomain:** `mousetrapjenga`
**Type:** Commerce-enabled satirical site
**Tone:** Cheerful infomercial + retro 80s toy-store box art. Think Milton Bradley founding-family myth filtered through a late-night TV ad. Dangers are mentioned matter-of-factly as features, never as warnings.

---

## One-line pitch

"The American Family Game Classic — Now With 300% More Trap!" A satirical 80s toy brand whose flagship product is Jenga played with armed mousetraps, and whose bestseller is a tournament edition played with bear traps. The site never once breaks character to acknowledge this is a bad idea.

---

## Site Config & Theme

- **Subdomain:** `mousetrapjenga`
- **Name:** Mousetrap Jenga
- **Tagline (hero):** *"THE AMERICAN FAMILY GAME CLASSIC — Now With 300% More Trap!"*
- **Sub-headline:** *"The best way to lose a finger since 1978."*
- **Features:** `{ commerce: true }`

### Theme colors

| Token | Value | Notes |
|-------|-------|-------|
| Background | `#FFF6E8` | Cream newsprint — off-white, never stark |
| Text | `#1A1F4C` | Deep ink navy — warmer than black, comic-book feel |
| Primary | `#D4281F` | Cherry red — hero bands, CTAs, "BUT WAIT!" starbursts |
| Secondary | `#FFD23F` | Sunburst yellow — urgency badges, price tags, hover states |
| Accent | `#2BB9B9` | Turquoise — 80s toy-box pop color (think Trapper Keeper) |
| Theme preset | `light` | |

### Fonts

| Role | Font | Source |
|------|------|--------|
| Heading | **Bowlby One SC** | Google Fonts — NEW, must be added to `src/themes/fonts.ts` (the closest Google Font to Cooper Black — chunky, rounded, 1970s toy-box energy) |
| Body | Poppins | Existing in `src/themes/fonts.ts` — friendly geometric sans |

Adding Bowlby One SC is a standard 4-step change per `CLAUDE.md`:
1. Import from `next/font/google` in `src/themes/fonts.ts`
2. Add the instance export
3. Add `"bowlby-one-sc"` to `fontInstanceMap`
4. Add `"bowlby-one-sc": "'Bowlby One SC', sans-serif"` to `fontFamilyMap`

### Voice rules (apply to all copy on the site)

1. Addressed to "Mom", "Dad", and "kids!" — always plural, always cheerful.
2. Exclamation points are load-bearing. Sentences are short.
3. Dangers are mentioned matter-of-factly as features, never as warnings. ("Features: 12 premium steel mouse traps. Includes: bandages.")
4. Prices always end in `.99` and are ALWAYS prefixed with "ONLY" or "JUST".
5. Recurring catchphrases appear throughout: *"BUT WAIT, THERE'S MORE!"*, *"Ages 8 and up!"*, *"Fun for the whole family!"*, *"As seen on late-night television!"*, *"Call now — operators are standing by!"*

### Navigation

- Home (`/`)
- Products (`/products`)
- How to Play (`/how-to-play`)
- Hall of Fame (`/hall-of-fame`)
- About (`/about`)
- Testimonials (`/testimonials`)
- Contact (`/contact`)

---

## Product Catalog (8 SKUs)

Five tiered editions (escalating price and danger) plus three accessories. Every product is a real SKU in the commerce system (8 product detail pages via dynamic route, all addable to cart).

### Tier 1–5 (editions)

| # | Slug | Name | Price | Tagline |
|---|------|------|-------|---------|
| 1 | `junior-snap` | Junior Snap Edition | $19.99 | "Lose a fingernail. Keep the memories!" |
| 2 | `classic` | Classic Mousetrap Jenga | $49.99 | "The best way to lose a finger!" |
| 3 | `rat-trap-pro` | Rat Trap Pro | $99.99 | "Two fingers? More like TWO THUMBS UP!" |
| 4 | `bear-trap-tournament` | Bear Trap Tournament Edition | $299.99 | "The best way to lose an arm!" |
| 5 | `leghold-championship` | Industrial Leg-Hold Championship | $799.99 | "The game that plays YOU." |

### Accessories

| # | Slug | Name | Price | Tagline |
|---|------|------|-------|---------|
| 6 | `recovery-pack` | The Official Recovery Pack | $29.99 | "Every champion needs one!" Bandages, gauze, a tourniquet, and a laminated card with directions to the nearest ER. |
| 7 | `trap-refill-12pk` | Trap Refill 12-Pack | $39.99 | "Because steel fatigues after every championship match!" Displays a "SUBSCRIBE TO SAVE!" button that is purely decorative — no subscription plumbing. |
| 8 | `scoreboard` | Home Tournament Scoreboard | $24.99 | "Track digits remaining in style!" Wood-framed with peg markers. |

### Data file shape

`src/sites/mousetrapjenga/data/products.ts` follows the same `Product` type and `getProductBySlug(slug)` helper pattern as `src/sites/snortables/data/products.ts`. Each product has:
- `slug`, `name`, `price`, `priceLabel`, `tagline`
- `description`: multi-paragraph array in infomercial voice
- `features`: array of bullet-point feature strings (e.g., "12 genuine steel mouse traps", "Full-color illustrated instructions", "Ages 8 and up!")
- `image`: absolute path under `/sites/mousetrapjenga/`

### Product detail page structure

- Large product "box art" image
- Multi-paragraph infomercial description
- "WHAT'S IN THE BOX!" bullet list (parodies spec sheets — includes items like "12 premium steel traps", "1 illustrated instruction booklet", "1 adhesive bandage")
- Add to cart button with cheerful quip on add (Toast notifications reuse existing pattern)
- "Frequently bought together:" upsell — always pushes the Recovery Pack

### Anchor pricing note

The $299.99 → $799.99 gap is intentional. The Leg-Hold Championship is a halo product that exists mostly to make Bear Trap Tournament Edition look like a sensible middle option.

---

## Pages

Mirrors the snortables page set for component reuse: 11 static pages + 1 dynamic route.

### `/` — Home (infomercial scrolling sequence)

The distinctive page. Seven bands in scroll order, each feels like a TV ad beat:

1. **OPENING HERO** — full-bleed cherry-red band. Huge Bowlby One headline "MOUSETRAP JENGA". Yellow ribbon with tagline. Sub: "The best way to lose a finger since 1978." Hero image: mid-80s family gathered at a wood-paneled rec-room table, everyone smiling, one kid's hand wrapped in a fresh white bandage. CTAs: "BUY NOW" (primary) and "HOW TO PLAY" (secondary).

2. **"HOW IT WORKS" BAND** — cream background, four numbered cards with cartoon-hand illustrations. ① Stack the traps! ② Take turns pulling blocks! ③ Don't let 'em snap! ④ Crown your champion! Reuses `FeatureSection`.

3. **"THE FAMILY THAT TRAPS TOGETHER..." TESTIMONIAL STRIP** — narrow turquoise band, 3 rotating testimonials pulled from the site's `testimonials.ts`, each using a shared portrait. Each signature includes a parenthetical injury status.

4. **PRODUCT PARADE REVEAL** — the signature sequence. Three products revealed with comic-book action bursts between them:
   - Classic Mousetrap Jenga featured first
   - **"BUT WAIT! THERE'S MORE!"** (yellow starburst) → Rat Trap Pro
   - **"AND THAT'S NOT ALL!"** (red starburst) → Bear Trap Tournament Edition

   Each product card is a standard `ProductCard` wrapped with a site-local `Starburst` badge component. "See all editions →" link to `/products` at the end of the parade.

5. **"ACT NOW!" URGENCY BLOCK** — full-bleed cherry-red band with yellow comic-book lightning rays behind it. Fake decorative countdown ("Offer expires: SOON!"). Fake toll-free number `1-800-JENGA-OW` rendered huge in Bowlby One. "CALL NOW" CTA links to `/products`. Bonus offer: *"Order in the next 10 minutes and we'll throw in The Official Recovery Pack — ABSOLUTELY FREE!"* The countdown is pure decoration — no real timer logic.

6. **CHAMPIONSHIP BANNER** — short cream band with a trophy illustration, linking to `/hall-of-fame`: *"Meet the legends of the circuit →"*

7. **FINAL CTA** — yellow band, simple "BUY NOW" button, small print: *"Ages 8 and up. Fun for the whole family! Bandages sold separately."*

### `/products` — Products listing

- Hero: *"THE COMPLETE LINEUP!"* cherry-red band
- Tiered editions grid (5 cards, in price order from Junior Snap to Leg-Hold Championship)
- Accessories row (3 cards) below the editions
- Each card uses the existing `ProductCard` component with minor styling tweaks via props/className
- Infomercial voice on every card (price prefixed "ONLY", starburst badges on featured items)

### `/products/<slug>` — Product detail (dynamic route)

Standard `DynamicRoute` pattern matching snortables. The dynamic route:
- `component: ProductDetail`
- `getMetadata: (slug) => { title: `${product.name} — Mousetrap Jenga`, description: product.tagline }`
- `isValidSlug: (slug) => !!getProductBySlug(slug)`

### `/how-to-play` — Signature page A

- **Hero:** *"LEARN TO PLAY IN JUST 4 EASY STEPS!"* cherry-red band
- **Four numbered step cards** with generated cartoon-hand illustrations:
  1. **SET UP YOUR TOWER** — "Stack 18 armed mousetraps in perpendicular layers of three, just like regular Jenga! (Yes, armed.)"
  2. **ARM THE TRAPS** — "If you haven't already, carefully arm each trap. Have a friend nearby to assist!"
  3. **TAKE TURNS PULLING** — "Players take turns removing one trap from anywhere below the top layer and placing it carefully on top. No rushing!"
  4. **CROWN YOUR CHAMPION** — "The last player with the most remaining fingers wins! It's that simple!"
- **Rules & Scoring** callout box — explains how injuries affect scoring (spoiler: they don't).
- **FAQ accordion** (reuses existing `FaqAccordion`):
  - *"What if a trap snaps on me?"* → "That's part of the game! Shake it off and keep playing!"
  - *"Can I wear gloves?"* → "Gloves are strictly prohibited in tournament play."
  - *"Is this safe for children?"* → "Ages 8 and up! Supervision recommended."
  - *"Is this legal?"* → "In most states! Check your local regulations."
  - *"What's the record for consecutive turns without injury?"* → "Four. It was Morty Abernathy, 1987. It has never been beaten."

### `/hall-of-fame` — Signature page C

- **Hero:** *"THE LEGENDS OF MOUSETRAP JENGA"* cream band with small trophy icons
- **7 legendary player cards** styled as vintage trading cards (sepia borders, monospace stat blocks, dramatic portrait framing) rendered by a new site-local `TradingCard` component
- **Founding Era (4 cards — uses the four base people with dedicated championship-portrait generations):**
  - *"Hammerhand" Harold Pemberton* — 47 championships, 8 digits remaining, "The Founder Himself"
  - *"Lefty" Delbert Wickham* — 31 championships, 6 digits remaining, "Known for his daring left-hand reaches"
  - *"Jumpy" Morty Abernathy* — 28 championships, 7 digits remaining, "Inventor of the Abernathy Hesitation"
  - *"Steady Eugene" Fink* — 22 championships, 9 digits remaining, "The safest player in the Hall"
- **Contemporary Era (3 cards — uses shared testimonial portrait pool, no new image generation):**
  - Each gets a nickname, hometown, career stats block, and a "famous moment" quote. Specific portrait picks from the pool to be chosen during implementation (should not overlap with portraits used on `/testimonials`).

### `/about` — Founding story & team

- **Hero:** *"America's Favorite Backyard Inventors Since 1978"* over the About hero image (warm sepia basement workshop shot)
- **Origin story block:** Bill's basement, 1978, a rainy Saturday, a failed Scrabble game, an idea. First prototype. First "playtest accident." First ER visit. Framed entirely as heartwarming Americana.
- **Timeline** (reuses existing `Timeline` component):
  - **1978** — First prototype built on the Pemberton kitchen table
  - **1982** — First retail run (Cedar Rapids, 500 units)
  - **1985** — Featured on late-night TV ("as seen on!")
  - **1989** — Bear Trap Tournament Edition released
  - **1995** — Briefly banned in 3 states (framed as a badge of honor)
  - **2003** — Hall of Fame founded
  - **2026** — Still family-owned, still family-fun
- **"Meet the Inventors" team section** (reuses existing `TeamMember`) — the four fully-randomized characters below.

### `/testimonials` — Testimonials

- **Hero:** *"AMERICA SAYS: 'YES PLEASE!'"* or similar
- **Grid of 8 testimonial cards.** Each card = quote + name + title + portrait (from the shared portrait pool).
- The homepage testimonial strip uses 3 of the 8 (same pattern as snortables' `homepageTestimonials` slice).
- Every signature includes a parenthetical injury status (e.g., *"Currently in cast"*, *"Four fingers and proud"*, *"Unable to sign this testimonial"*).
- Example voice:
  > *"My kids have NEVER had more fun! We only needed ONE trip to the emergency room!"*
  > **— Marcus Chen, Cedar Rapids IA** *(currently in cast)*

### `/contact` — Contact page

- **Hero:** huge yellow band, *"CALL NOW! OPERATORS ARE STANDING BY!"* in Bowlby One
- **Fake toll-free number:** `1-800-JENGA-OW`, rendered huge
- **Fake mail-order form** — parody order form ("THE MAIL-ORDER FORM OF THE FUTURE!") with purely decorative fields (no submit handler)
- **Fake mailing address:** *Mousetrap Jenga Inc., PO Box 12, Cedar Rapids, IA*
- **Small "operators standing by" vignette image** — generated cartoon-style phone bank
- **Real email in small print at the bottom:** *"Press & business inquiries: bsambrone@gmail.com"* — per the standard pattern across all sites

### `/cart` and `/checkout`

Reuses the existing `src/components/commerce/` components unchanged. Cart state is stored in localStorage under a site-specific key derived from the subdomain (`mousetrapjenga-cart`). This is automatic — `src/app/layout.tsx` wires `CartProvider storageKey={${site.config.subdomain}-cart}` when `features.commerce` is set. No per-site cart code is required.

### `/privacy` and `/terms`

Both follow the standard pattern: a few paragraphs of in-voice framing followed by a clearly-marked section that defers to the **Specific Industries umbrella policy**. No site-specific legal language.

Example privacy intro:
> *"At Mousetrap Jenga, we take your privacy as seriously as we take family fun! (That's extremely seriously!) For the full legal details, please refer to the Specific Industries umbrella privacy policy, which governs all of our family of brands."*

---

## Leadership Team

All four characters use fully-randomized 80s toy-industry names. The `referencePerson` field tracks which base person's reference photos are used for portrait generation. Bill is always the founder (per the portfolio-wide standard).

| Slot | Name | Title | `referencePerson` | Bio |
|------|------|-------|-------------------|-----|
| Founder | **Harold Pemberton** | Founder & Chief Inventor | `bill` | *"Harold invented Mousetrap Jenga in his Cedar Rapids basement in 1978 after concluding that 'regular Jenga simply wasn't exciting enough.' He still personally approves every spring that leaves the factory. Has been married to the same woman since 1973 and still has most of his fingers."* |
| Team | **Delbert Wickham** | VP of Research & Trap Development | `brandon` | *"A third-generation spring engineer, Delbert sources every trap from an undisclosed steel mill in Pennsylvania. He prefers his traps 'angry' and once described a defective unit as 'frankly, disappointingly merciful.'"* |
| Team | **Morty Abernathy** | VP of Playtesting & Quality Assurance | `jim` | *"Morty has personally playtested every edition since 1982. Father of three, 'owner' of eight fingers, and holder of the 1987 'four consecutive turns without injury' record that still stands today. He refuses to discuss how the record attempt ended."* |
| Team | **Eugene Fink** | VP of Safety & Customer Joy | `sean` | *"Eugene keeps the company first-aid station fully stocked at all times. He believes every American family deserves the right to lose a digit together, and he's made it his life's mission to ensure they do so with a smile."* |

Data file: `src/sites/mousetrapjenga/data/leadership.ts` with the same `Executive` interface shape used by snortables (`slug, name, title, bio, quote, image, referencePerson`).

Each executive also has a one-line quote for the team section:
- **Pemberton:** *"If it doesn't make your grandmother gasp, it's not a real toy."*
- **Wickham:** *"We don't make 'safe' traps. We make 'honest' traps."*
- **Abernathy:** *"Every champion has a story. Mine has several appendages in it."*
- **Fink:** *"Safety isn't about avoiding injury. It's about having the bandages ready!"*

---

## Shared Testimonial Portrait Pool

This is a cross-cutting platform change. The 16 testimonial portraits that currently live in `public/sites/snortables/` are generic stock-style headshots that can be reused across sites. Centralizing them enables mousetrapjenga (and all future sites) to reuse the pool, and produces a running gag where the same fictional customer reappears on multiple sites.

### New location

`public/shared/testimonials/<slug>.png`

- **Move** all 16 files from `public/sites/snortables/testimonial-<slug>.png` → `public/shared/testimonials/<slug>.png`
- **Rename** to drop the redundant `testimonial-` prefix (the directory implies it)
- **Use `git mv`** so history is preserved

### New catalog module

`src/data/testimonial-portraits.ts`:

```typescript
export interface TestimonialPortrait {
  slug: string        // e.g. "marcus-chen"
  name: string        // e.g. "Marcus Chen" — canonical name that matches the face
  image: string       // absolute path, e.g. "/shared/testimonials/marcus-chen.png"
}

export const testimonialPortraits: TestimonialPortrait[] = [
  { slug: "marcus-chen",      name: "Marcus Chen",      image: "/shared/testimonials/marcus-chen.png" },
  { slug: "chad-gullet",      name: "Chad Gullet",      image: "/shared/testimonials/chad-gullet.png" },
  { slug: "derek-pullman",    name: "Derek Pullman",    image: "/shared/testimonials/derek-pullman.png" },
  { slug: "tamara-voss",      name: "Tamara Voss",      image: "/shared/testimonials/tamara-voss.png" },
  { slug: "jason-kile",       name: "Jason Kile",       image: "/shared/testimonials/jason-kile.png" },
  { slug: "brenda-faulk",     name: "Brenda Faulk",     image: "/shared/testimonials/brenda-faulk.png" },
  { slug: "ryan-ashford",     name: "Ryan Ashford",     image: "/shared/testimonials/ryan-ashford.png" },
  { slug: "patricia-hollowell", name: "Dr. Patricia Hollowell", image: "/shared/testimonials/patricia-hollowell.png" },
  { slug: "nina-cabrera",     name: "Nina Cabrera",     image: "/shared/testimonials/nina-cabrera.png" },
  { slug: "simone-archer",    name: "Simone Archer",    image: "/shared/testimonials/simone-archer.png" },
  { slug: "francois-delacroix", name: "François Delacroix", image: "/shared/testimonials/francois-delacroix.png" },
  { slug: "tony-mazetti",     name: "Tony Mazetti",     image: "/shared/testimonials/tony-mazetti.png" },
  { slug: "eleanor-whittaker", name: "Eleanor Whittaker", image: "/shared/testimonials/eleanor-whittaker.png" },
  { slug: "greg-diane-hofstra", name: "Greg & Diane Hofstra", image: "/shared/testimonials/greg-diane-hofstra.png" },
  { slug: "asher-bloom",      name: "Asher Bloom",      image: "/shared/testimonials/asher-bloom.png" },
  { slug: "kyle-brandt",      name: "Kyle Brandt",      image: "/shared/testimonials/kyle-brandt.png" },
]

export function getPortrait(slug: string): TestimonialPortrait | undefined {
  return testimonialPortraits.find((p) => p.slug === slug)
}
```

### Site usage pattern

Each site's `testimonials.ts` still owns its own quotes and titles (site-specific voice), but imports the name and portrait from the catalog. Use an explicit helper that picks only `name` and `image` from the portrait (avoids excess-property errors on the strict `Testimonial` interface):

```typescript
import { getPortrait } from "@/data/testimonial-portraits"

function withPortrait(slug: string, quote: string, title: string): Testimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image }
}

export const testimonials: Testimonial[] = [
  withPortrait(
    "marcus-chen",
    "I used to waste 45 minutes a day CHEWING...",
    "Growth Hacker & Biohacker"
  ),
  // ...
]
```

This pattern is used by both the migrated snortables testimonials file and the new mousetrapjenga testimonials file.

### Snortables migration (required as part of this spec's implementation)

1. `git mv` all 16 portrait files from `public/sites/snortables/testimonial-<slug>.png` → `public/shared/testimonials/<slug>.png`
2. Create `src/data/testimonial-portraits.ts` with the full 16-entry catalog
3. Edit `src/sites/snortables/data/testimonials.ts`:
   - Import `getPortrait` from `@/data/testimonial-portraits`
   - Remove the literal `image: "/sites/snortables/testimonial-<slug>.png"` lines
   - Spread `...getPortrait("<slug>")!` into each entry (which provides `name` and `image`)
4. Verify snortables testimonials page and homepage strip render correctly by running `npm run dev` and visiting `/testimonials?site=snortables` and `/?site=snortables`
5. Run `npm run build` to verify no broken references

### Mousetrapjenga picks its subset

- **8 portraits on `/testimonials`** — 8 site-specific quotes + titles, each using `...getPortrait("<slug>")!`
- **3 portraits on the homepage strip** — the first 3 of the 8 (sliced from the site's testimonials array, matching snortables' pattern with `homepageTestimonials`)
- **3 additional portraits on `/hall-of-fame` "Contemporary Era" cards** — picked from the pool with no overlap with the testimonials set
- Specific portrait picks for mousetrapjenga (which 8 + 3) to be finalized during implementation, aiming for variety in age/gender presentation

### Why this design

- **Small, focused change:** moves files, adds one 16-entry catalog file, updates one snortables data file. No shared React components, no testimonial-rendering abstractions.
- **Snortables unchanged in spirit:** same names, same quotes, same titles — only image paths change.
- **Future sites get a growing pool:** every new site that generates testimonial portraits should save them to `public/shared/testimonials/` and add catalog entries so the pool grows over time.
- **Running gag preserved:** a recurring fictional customer face across sites is a deliberate bit, not a bug.

---

## Components

### Reused from `src/components/` (no changes)

- `layout/Header`, `layout/Footer`
- `ui/Hero`, `ui/FeatureSection`, `ui/ProductCard`, `ui/Timeline`, `ui/TeamMember`, `ui/FaqAccordion`
- All of `commerce/` (`CartProvider`, `CartButton`, `AddToCartButton`, `Toast`, cart/checkout pages)

### New, site-local under `src/sites/mousetrapjenga/components/`

- **`Starburst.tsx`** — an SVG starburst badge with configurable text and color. Props: `text`, `color?`, `size?`. Used in the product parade reveal and sprinkled elsewhere. Estimated ~40 lines.
- **`InfomercialBand.tsx`** — a section wrapper that enforces the band visual rhythm: full-bleed background, thick comic-book borders, optional starburst decorations. Props: `bgColor`, `children`, `className?`. Used throughout the home page.
- **`TradingCard.tsx`** — Hall of Fame trading card layout: sepia border, monospace stat block, nickname + name, portrait, career stats. Props: `name`, `nickname`, `portrait`, `stats: { championships, digitsRemaining }`, `tagline`. Estimated ~60 lines.

All three live site-local (not in `src/components/`). If a future site wants similar vibes, they can be extracted then (YAGNI).

### Platform change (cross-cutting)

- `public/shared/testimonials/*.png` — moved from snortables
- `src/data/testimonial-portraits.ts` — new catalog module
- `src/sites/snortables/data/testimonials.ts` — migrated to use catalog

---

## Imagery Generation Plan

All images generated via the image-gen MCP. One script runs all generations: `scripts/generate-mousetrapjenga-images.ts`, following the pattern of `scripts/generate-snortables-images.ts`.

**Total: 24 new generated images.**

| # | Batch | Count | Tool | Size | Notes |
|---|-------|-------|------|------|-------|
| 1 | Site hero/background | 3 | `generate_image` | 1536x1024 heroes, 1024x1024 vignette | Home hero (80s family at rec-room table, one bandaged hand), About hero (basement workshop), Contact vignette (cartoon phone bank) |
| 2 | Product box art | 8 | `generate_image` | 1024x1024 | All 8 SKUs — retro toy-box art style, chunky Bowlby One lettering, starbursts, faux "NEW!" bursts, primary-red/yellow/teal color scheme |
| 3 | Leadership "inventor" portraits | 4 | `generate_image_with_person` | 1024x1024 | Harold Pemberton (bill, cardigan, workshop), Delbert Wickham (brandon, R&D engineer, spring in hand), Morty Abernathy (jim, playtester, slightly rumpled), Eugene Fink (sean, safety vest) |
| 4 | Hall of Fame "legend" portraits | 4 | `generate_image_with_person` | 1024x1024 | Same four base people re-themed as retro trading-card champions: vintage tournament jackets, dramatic lighting, visible hand-injury hints (bandages, hands subtly framed). Distinct enough from the leadership portraits to feel like a different era. |
| 5 | How to Play step illustrations | 4 | `generate_image` | 1024x1024 | Cartoon-hand illustrations, one per step — cream background, chunky outlines, 80s storybook look, hands actively setting up / arming / pulling traps / crowning a champion |
| 6 | Favicon | 1 | `generate_image` | 1024x1024 | Small mousetrap icon in cherry red on cream (will be downsized at build time) |

**Reused from shared portrait pool (no generation):** 8 testimonial portraits for `/testimonials`, 3 for homepage strip (slice of the same 8), 3 additional portraits for Hall of Fame Contemporary Era cards.

**Notes:**
- Leadership portraits (batch 3) and Hall of Fame portraits (batch 4) both use the base people but are two distinct generations per person with different prompts and styling. 8 `generate_image_with_person` calls total.
- Image files save to `public/sites/mousetrapjenga/` — these are site-specific.
- The script should be re-runnable (idempotent-friendly: regenerate any single image on demand).

---

## Implementation sketch

Rough order of operations for the implementation plan (full plan to be written in a separate step via the `writing-plans` skill):

1. **Platform change first:** move snortables portraits to `public/shared/testimonials/`, create `src/data/testimonial-portraits.ts`, migrate snortables' testimonials data file, verify snortables still works.
2. **Site scaffolding:** create `src/sites/mousetrapjenga/` with config, barrel, empty data files, placeholder pages.
3. **Font registration:** add Bowlby One SC to `src/themes/fonts.ts` (4-step process).
4. **Data files:** `products.ts`, `leadership.ts`, `testimonials.ts`.
5. **Site-local components:** `Starburst`, `InfomercialBand`, `TradingCard`.
6. **Home page** with the 7-section infomercial sequence.
7. **Secondary pages:** products, product detail dynamic route, how-to-play, hall-of-fame, about, testimonials, contact, privacy, terms.
8. **Register** in `src/sites/registry.ts`.
9. **Imagery:** write and run `scripts/generate-mousetrapjenga-images.ts` for all 24 images.
10. **Verification:** `npm run lint`, `npx tsc --noEmit`, `npm run build`, manual smoke test of every page via `?site=mousetrapjenga`.

---

## Standard-pattern compliance checklist

Per the portfolio-wide standards:

- ✅ **Privacy & Terms pages** reference the Specific Industries umbrella policy as authoritative
- ✅ **Leadership team** uses the four base people (bill founder + brandon/jim/sean) with fully-randomized character names and re-themed portraits
- ✅ **Contact page** is satirical but contains the real contact email `bsambrone@gmail.com` in small print
- ✅ **No new App Router routes** — everything goes through `src/app/[[...slug]]/page.tsx`
- ✅ **Theme via CSS variables** — colors and fonts set in site config
- ✅ **Commerce via `features.commerce: true`** — reuses existing cart/checkout components
- ✅ **Dynamic products route** follows the established `dynamicRoutes` pattern
