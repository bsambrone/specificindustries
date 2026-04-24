# Unmotivators Inc. — Site Design

**Date:** 2026-04-24
**Subdomain:** `unmotivators`
**Status:** Approved design, pending implementation plan

## Premise

Unmotivators Inc. is a satire of despair.com / demotivational poster culture. The site sells "honest" office decor — posters, mugs, plaques, awards, and home items — that invert traditional motivational messaging. The company's public voice treats this as a wellness mission ("helping people let go of the lie of motivation") while the products themselves are just bleak.

The site takes itself completely seriously. No winking at the camera.

## Brand

- **Name:** Unmotivators Inc.
- **Tagline:** "Professional Disappointment Since [randomized-year]."
- **Voice:** Mix, with a dominant weary-Gen-X-sigh undertone.
  - Posters lean dark-deadpan (despair.com register).
  - Desk items lean passive-aggressive corporate-speak.
  - For Home items lean resigned, tired acceptance.

## Site Structure

Routes served by the existing catch-all at `src/app/[[...slug]]/page.tsx`:

- `/` — Home (hero, featured products, "What We Believe")
- `/office` — Office catalog with product-type filter chips
- `/home` — For Home catalog (no filter; ~12 products)
- `/products/[slug]` — Product detail page via `dynamicRoutes`
- `/about` — Leadership team + "Our Values"
- `/manifesto` — "The Unmotivators Manifesto" long-form copy
- `/cart` — standard cart page (reuse commerce components)
- `/checkout` — fake checkout with inverted success copy
- `/contact` — required per site conventions
- `/privacy`, `/terms` — required per site conventions

**Header:** logo + nav (Office / Home / Manifesto / About / Cart). Cart button shows item count badge.

**Footer:** corporate-cold copyright, privacy/terms/contact links, plus a "Subscribe to our newsletter — Or don't. It's fine." block.

## Theme

**Palette (contrast-verified):**
- Background `#E5E3DE` — dingy beige-gray
- Surface `#D4D1CA` — darker panel for cards/chips
- Primary text `#1A1A18` — ~14:1 on bg
- Muted text `#4D4B46` — ~7.5:1 on bg (passes AA for normal text)
- Accent `#7A2E2E` — muted brick red, ~7:1 on bg (CTAs, price)
- Disabled/placeholder/divider `#6B6963` — backgrounds/borders only, never carrying text
- Button label text on accent buttons uses off-white `#F5F3EE`

**Rule:** no color lighter than `#4D4B46` is ever used for body text.

**Typography:**
- Headings: `Oswald` (condensed, training-manual feel)
- Body: `Source Serif 4` (humanist serif, employee-handbook feel)
- Mono accents: `JetBrains Mono` (SKU codes, "Corporate Excuse" facts blocks)

**Visual motifs:**
- Subtle fluorescent-light-tube graphic at the top of the hero
- Drop-ceiling-tile pattern as optional section divider
- Buttons styled like cubicle name-plate slide inserts (sharp corners, beveled edges)
- No rounded corners anywhere — flat and orthogonal

## Commerce

Enable via `features.commerce: true` in site config. Reuse existing components from `src/components/commerce/`:
- `CartProvider` (localStorage key: `unmotivators-cart`)
- `CartButton`
- `AddToCartButton`
- `Toast`

**Checkout variations:** the confirmation screen copy is inverted — "Your order has been processed. Good luck." instead of celebratory.

## Product Data Model

```typescript
export interface Product {
  slug: string
  name: string                // e.g. "MEDIOCRITY" or "Manager of Unmet Expectations"
  subtitle: string            // italic one-liner punch
  category: "office" | "home"
  productType: "poster" | "mug" | "plaque" | "paper" | "award" | "desktoy" | "supply" | "homedecor"
  price: number               // suspiciously overpriced
  priceLabel: string          // formatted
  listPrice?: number          // optional "was" for extra absurdity
  description: string[]       // 2-3 paragraphs of deadpan/weary corporate copy
  image: string               // /sites/unmotivators/products/<slug>.png
  corporateExcuses: Array<{   // nutrition-facts-style spec block
    label: string
    value: string
  }>
  sku: string                 // e.g. "UNM-POS-0043-GR"
}
```

**Helpers in `src/sites/unmotivators/data/products.ts`:**
- `products: Product[]`
- `getProductBySlug(slug: string)`
- `getProductsByCategory(category: "office" | "home")`
- `getProductsByType(type: ProductType)`

**Pricing:** deliberately overpriced. Posters ~$180–260, mugs ~$75–110, plaques ~$140–220, paper goods ~$55–95, awards ~$200–400, desk toys ~$90–160, home items ~$120–340.

## Office Category (52 products)

### Posters (18)
| Slug | Title | Subtitle |
|---|---|---|
| mediocrity | MEDIOCRITY | The gentle hum of a life well-averaged. |
| deadlines | DEADLINES | Finish lines drawn by people who aren't running. |
| teamwork | TEAMWORK | Because blame is easier to distribute than credit. |
| potential | POTENTIAL | That feeling you had once, before all this. |
| perseverance | PERSEVERANCE | Doing the same thing repeatedly is just a personality now. |
| ambition | AMBITION | A lit fuse on an empty barrel. |
| synergy | SYNERGY | The shared resignation of people who have stopped asking why. |
| leadership | LEADERSHIP | Someone has to decide. It won't be you. |
| innovation | INNOVATION | Rearranging deck chairs with confidence. |
| excellence | EXCELLENCE | The silent expectation you will never quite meet. |
| commitment | COMMITMENT | Nine years in and no one remembers why you started. |
| growth | GROWTH | The metric that made the numbers more important than the people. |
| dreams | DREAMS | Ambitions your brain hasn't talked you out of yet. |
| opportunity | OPPORTUNITY | It knocked. You were in a meeting. |
| patience | PATIENCE | The ability to pretend a meeting is productive. |
| balance | BALANCE | The equal distribution of all your disappointments. |
| success | SUCCESS | A moving target. Upward. Always upward. |
| tomorrow | TOMORROW | Where your ambitions go to wait. |

### Mugs (8)
- World's Okayest Employee Mug
- I Survived Another Meeting Mug (tally-mark glaze)
- Net 30 Sadness Mug
- Out of Office Mug (stays in the office)
- TPS Report Travel Mug
- Synergy Tea Mug
- Actual Ceramic Coffee Mug ("Please stop projecting onto it.")
- Regret Roast Mug

### Desk Plaques / Nameplates (6)
- Manager of Unmet Expectations
- Employee of the Month (June 2019) — dated, never updated
- Head of Standing Meetings
- VP of Reply-All
- Senior Individual Contributor ("Promoted in lieu of a raise since 2021")
- Founder, Subject Matter Enthusiast

### Paper Goods (6)
- "It's Fine" Sticky Notes (500 count, neutral-gray)
- The Undone Notebook (pre-printed unchecked boxes)
- 2026 Procrastination Wall Calendar (every month labeled "FEBRUARY")
- Looming Deadline Desk Calendar (every day T-minus 3)
- "Per My Last Email" Legal Pad
- Quiet Quitting Planner (blank pages, hardcover)

### Awards & Trophies (5)
- "Showed Up Most Days 2025" Trophy
- "5-Year Veteran of the Same Job Title" Certificate
- "Longest Held Position in Middle Management" Plaque
- "Participation in Q3" Crystal Award (unengraved)
- "Person Who Did Not Complain" Medal

### Desk Toys / Stress Items (5)
- Deflating Stress Ball (slow-leak)
- Zen Garden with Bad Rake (rake too wide)
- HVAC Desktop Noisemaker
- Newton's Cradle of Regret (won't click back)
- Existential Magic 8-Ball ("Reply hazy. Try less.")

### Office Supplies (4)
- Assorted Disappointments Pen Set (12 black pens, slightly different)
- "This Desk Belongs to [REDACTED]" Nameplate Insert
- Depressive Mouse Pad
- "Temporary Employee" Name Tag

## For Home Category (12 products)

1. **"EXIST. ENDURE. EXPIRE." Wall Art** — flagship live-laugh-love parody, rustic wood plank, script font
2. **"Live, Laugh, Leave" Throw Pillow** — script-font accent pillow
3. **"THE DISHES" Wooden Letter Sign** — in the "EAT" / "GATHER" tradition
4. **"Home Sweet Home Equity Line of Credit" Cross-Stitch Plaque**
5. **"Welcome to the Part of the Day Between Shifts" Doormat**
6. **Resigned Acceptance Doormat** — just reads "Okay."
7. **Ambient Burnout Candle** — "Notes of cardboard, cold coffee, and HVAC."
8. **"Bless This Mess (And Everyone In It)" Kitchen Towel**
9. **"Wine O'Clock Was a Warning" Wine Tumbler**
10. **"Gather Here (If You Must)" Dining Room Sign**
11. **"Family. Faith. Firmly Middle Class." Embroidered Sampler**
12. **"This Is Fine" Coffee Table Book** — 240 blank pages, hardcover

**Total: 64 products.**

## Leadership Team

Four execs, all male, using existing base images `bill`, `brandon`, `jim`, `sean`. Both first AND last names randomize on each build (per site convention in `feedback_exec_name_randomization.md`).

| Base image | Title |
|---|---|
| bill | Chief Disappointment Officer |
| brandon | VP of Unmet Potential |
| jim | Director of Managed Expectations |
| sean | Head of Burnout Operations |

**Bio voice:** weary Gen X sigh, resigned third person. Example:
> "[Name] has worked at Unmotivators Inc. for 11 years. He does not remember applying. He attends meetings. He has a desk. His office has a window, though the blinds are usually closed. He would like this bio to end."

**Portrait treatment:** black-and-white filter applied, washed-out, generic gray office backdrop. Thousand-yard stare.

Each exec gets a "Serving since: YYYY" line below the bio.

**"Our Values" section on About page:**
- Honesty about how bad it is.
- Sustainability (of our discontent).
- Accountability (for your own choices).
- Innovation in the field of resignation.

## Manifesto Page

A long-form satirical essay titled **"The Unmotivators Manifesto"** laying out the company's worldview. Three to five sections of straight-faced corporate-philosophical prose — the same register as a Patagonia or Basecamp manifesto, but arguing that motivation is harmful and that managed disappointment is the path to peace.

## Imagery

Mirror the `carbonneutraloutrage` image pipeline. Add `scripts/generate-unmotivators-images.ts`.

**Required assets:**
- 64 product images — one per product, `/sites/unmotivators/products/<slug>.png`
- 4 exec portraits via `mcp__image-gen__generate_image_with_person` using bill/brandon/jim/sean base images
- 1 hero image — empty gray cubicle from behind an office chair, fluorescent overhead, a single un-hung poster leaning against a partition
- Favicon (64×64) registered in the resize script

**Per-type visual direction:**
- **Posters** — rendered as actual framed posters (thin black frame, matte, photographed on a neutral wall). The image IS the poster — title and subtitle are rendered as part of the image.
- **Mugs / plaques / awards** — single-subject product photo on a beige office desk surface, shallow DOF, fluorescent cast
- **Paper goods** — flat-lay with pen and coffee ring
- **Desk toys** — on a desk corner, slightly askew
- **For Home items** — staged in a beige living room or kitchen, muted palette continuous with office aesthetic
- **Execs** — black-and-white corporate headshot, washed-out, cheap grey office backdrop, thousand-yard stare

**Order of operations:** implement site code with placeholder image paths first; generate images last so routes load cleanly while images populate.

## Files to Create / Modify

**New files under `src/sites/unmotivators/`:**
- `config.ts` — SiteConfig with commerce enabled, theme, metadata, nav
- `index.ts` — barrel exporting `config`, `pages`, `dynamicRoutes`
- `data/products.ts` — 64 products + helpers
- `pages/home.tsx`
- `pages/office.tsx` (with filter-chip state)
- `pages/for-home.tsx`
- `pages/about.tsx`
- `pages/manifesto.tsx`
- `pages/contact.tsx`
- `pages/privacy.tsx`
- `pages/terms.tsx`
- `pages/product-detail.tsx` (used by dynamicRoutes)

**Existing files to modify:**
- `src/sites/registry.ts` — register unmotivators
- `src/sites/subdomains.ts` — add `unmotivators` to `VALID_SUBDOMAINS` (per `feedback_new_site_subdomain_allowlist.md`)
- Sitemap generator — include unmotivators routes

**New assets:**
- `public/sites/unmotivators/` — logo, favicon, hero, product images, exec portraits

**New script:**
- `scripts/generate-unmotivators-images.ts` — generates all imagery

## Conventions Confirmed

- ✅ Contact, privacy, terms pages exist (`feedback_new_site_patterns.md`)
- ✅ Leadership team with 4 execs (`feedback_new_site_patterns.md`)
- ✅ Both first AND last names randomize (`feedback_exec_name_randomization.md`)
- ✅ All 4 execs use male base images matching their gender (`user_base_image_genders.md`)
- ✅ Subdomain added to `VALID_SUBDOMAINS` (`feedback_new_site_subdomain_allowlist.md`)
- ✅ No yellow/gold on light backgrounds (`feedback_yellow_on_light.md`) — palette uses muted brick red accent only
- ✅ All page routing through the catch-all; no new folders under `src/app/`
- ✅ Theme via CSS variables declared in site config and injected into `<body>`
- ✅ Commerce components reused from `src/components/commerce/`

## Out of Scope

- Real payment processing (checkout is fake, consistent with other commerce sites)
- Product reviews / ratings
- User accounts / login
- Search across catalog (filter chips only)
- Internationalization
- Wishlist
