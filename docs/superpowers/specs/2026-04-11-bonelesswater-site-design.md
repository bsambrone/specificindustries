# BonelessWater — Site Design

**Subdomain:** `bonelesswater.specificindustries.com`
**Date:** 2026-04-11
**Status:** Design — pending implementation plan

## Concept

A satire site for **BonelessWater Inc.**, a fictional pharmaceutical-grade water purification company that takes itself extremely seriously about removing bones from water. The deadpan absurdity is reinforced by a conspiracy-theorist undercurrent: water bones are real, well-understood since 1873, suppressed by major bottlers, and the leading cause of indigestion. The execs are true believers — scientists, FDA whistleblowers, indigestion survivors who left Big Bottled Water to do something about the hidden epidemic.

The visual treatment is **stark clinical pharma** — pure white, medical navy, urgent red accents — so the joke detonates at first glance. The reader sees what looks like a legitimate pharmaceutical company website, then notices the headline says "99.9999% Bone-Free" about WATER, and the bit explodes.

**Tone.** Earnest, scientific, mission-driven. Every claim is delivered with corporate gravity. No winking. The execs believe. The certifications look real. The percentages are precise. The conspiracy angle is delivered through copy ("the skeletal structure of water has been documented since 1873, though the original research was suppressed by major bottlers") while the visuals stay clinically professional.

## Architecture

Slots into the existing multi-subdomain pattern. No new App Router routes — everything goes through the catch-all.

```
src/sites/bonelesswater/
├── config.ts                    # SiteConfig — pharma navy theme, features.commerce: true
├── index.ts                     # barrel: config, pages, dynamicRoutes
├── data/
│   ├── products.ts              # 8 SKUs + getProductBySlug()
│   ├── leadership.ts            # 4 true-believer execs
│   ├── testimonials.ts          # 8 indigestion-recovery testimonials
│   ├── competitors.ts           # 6 competitors (3 legit + 2 bones + 1 pond water)
│   └── facts.ts                 # "Did You Know?" callout pool (~10 facts)
├── components/                  # site-local
│   ├── DidYouKnowCard.tsx       # the recurring conspiracy-fact callout block
│   ├── CertifiedBadge.tsx       # red "CERTIFIED" stamp for headers and product pages
│   └── ComparisonTable.tsx      # the competitor comparison grid
└── pages/
    ├── home.tsx
    ├── products.tsx             # full 8-SKU catalog grid
    ├── product-detail.tsx       # dynamic /products/[slug]
    ├── comparison.tsx           # the big competitor table
    ├── process.tsx              # 47-step deboning method, lab photos, blueprints
    ├── research.tsx             # fake peer-reviewed studies, indigestion stats
    ├── about.tsx                # founder story, 4 true-believer execs
    ├── testimonials.tsx         # 8 indigestion survivors who switched
    ├── contact.tsx              # real bsambrone@gmail.com in small print
    ├── cart.tsx                 # reuses shared commerce
    ├── checkout.tsx             # reuses shared commerce
    ├── privacy.tsx              # umbrella callout + satirical body
    └── terms.tsx                # umbrella callout + satirical body
```

**Registry wiring:**
- Add `bonelesswater` to `src/sites/registry.ts`
- Add `"bonelesswater"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Add `bonelesswater` to the `sites` array in `scripts/resize-favicons.mjs`
- Add `bonelesswater` to `productSites` in `src/app/sitemap.ts` (for the `/products/{slug}` URLs)

**`features.commerce: true`.** This site DOES wire up `CartProvider` and reuses the existing shared commerce components (`AddToCartButton`, the cart context, the toast container). Same as Pigmilk, Mousetrapjenga, Snortables. The site needs `/cart` and `/checkout` page entries pointing to the shared commerce pages (or simple wrappers — see how mousetrapjenga handles this).

## Theme

```ts
theme: {
  preset: "light",
  colors: {
    primary: "#0c4a6e",      // medical navy
    secondary: "#075985",    // deeper navy (hover, headings)
    accent: "#dc2626",       // urgent red (CERTIFIED, WARNING, DEBUNKED, alerts)
    background: "#FFFFFF",   // pure white
    text: "#0f172a",         // near-black slate
  },
  fonts: {
    heading: "inter",
    body: "inter",
  },
}
```

Both fonts already exist in `src/themes/fonts.ts` — no new font additions.

## Page Set & Navigation

| Nav Label | URL | Purpose |
|---|---|---|
| Home | `/` | Hero, "Did You Know?" callout, featured products, comparison strip preview, indigestion testimonials, research highlight, CTA |
| Products | `/products` | Full 8-SKU catalog grid with sub-brand cards |
| Product detail | `/products/[slug]` | Clinical product page with claims, certifications, ingredients, "Did You Know?" sidebar |
| Comparison | `/comparison` | The big competitor table — 3 legitimate + 2 bones + 1 pond water |
| Our Process | `/process` | 47-step deboning method, lab photos, facility blueprints |
| Research | `/research` | Fake peer-reviewed studies, indigestion statistics, suppressed historical record |
| About | `/about` | Founder story (1898 origins), 4 true-believer execs |
| Testimonials | `/testimonials` | 8 indigestion sufferers who switched, shared portrait pool |
| Contact | `/contact` | Real `bsambrone@gmail.com` in small print |

**Footer-only links:** Privacy, Terms, Disclaimer (the shared `Footer` component already links Disclaimer to `${APEX_URL}/disclaimer`).

**Commerce pages (not in nav):** `/cart`, `/checkout` — reuse the shared commerce pattern.

**Dynamic route:** `/products/[slug]` registered in `dynamicRoutes` in `index.ts`, validated against `getProductBySlug()`. Same pattern as every other commerce-enabled site.

## The 8-SKU Product Catalog

Sub-brand naming approach: BonelessWater is the company brand (in the site header, footer, and product descriptions). Each product has its own clinical pharma-style sub-brand. The brand connection lives in the site chrome and the copy, never in the product name itself.

| # | Slug | Product Name | Format | Price | Angle |
|---|---|---|---|---|---|
| 1 | `purespring-classic` | **PureSpring™ Classic** | 16oz still bottle | $2.99 | The flagship. "The original deboned drinking water." |
| 2 | `effervesce` | **Effervesce™** | 16oz carbonated | $3.49 | "All the bubbles, none of the bones." |
| 3 | `athletepure` | **AthletePure™ Electrolyte** | 24oz sport | $3.99 | "For competitive athletes who cannot risk skeletal contamination during performance." |
| 4 | `heritage-reserve` | **Heritage Reserve** | 750ml glass | $8.99 | "Triple-filtered. Aged in steel. Hand-verified bone-free by a senior technician." |
| 5 | `infantsafe` | **InfantSafe™ Pediatric Drops** | 4oz medical dropper | $12.99 | "The most vulnerable population. Developing digestive systems cannot process aqueous bone fragments." |
| 6 | `k9-hydration` | **K9 Hydration™** | 32oz pet bottle | $6.99 | "Your dog's smaller intestinal tract makes them disproportionately susceptible." |
| 7 | `lab-grade-l1` | **Lab Grade L1** | 1L sealed glass | $49.99 | "99.99999% bone-free. For research applications and the deeply concerned." |
| 8 | `household-defense` | **Household Defense Pack** | 24-pack | $59.99 | "Protect everyone in your household. Recommended quarterly subscription." |

### Product page structure (`/products/[slug]`)

Each product page has:

- Cyan/navy header band with the BonelessWater company wordmark and a red "CERTIFIED" badge
- Product hero image (clean clinical product shot, white seamless backdrop)
- Sub-brand name + tagline + price + AddToCart button
- "Active Bone Removal" claim percentage (always 99.9999% or higher — Lab Grade is 99.99999%)
- Description paragraph (3-4 sentences emphasizing the bone-removal angle)
- 3-image gallery (hero + detail + context)
- "What's Inside" panel listing ingredients (water, more water, "trace minerals naturally occurring in our deboning process")
- "Certifications" panel with 4-5 fake credential badges
- "Did You Know?" sidebar with one rotating fact
- Customer review summary

## The Comparison Page (`/comparison`)

The centerpiece of the site's hostile-to-competitors framing. A wide feature-comparison table with **BonelessWater** on the left and **6 competitors** to the right.

### Competitors

**Legitimate water brands** (factually equivalent to BonelessWater — they're all just water — but FUD'd against on absurd contamination technicalities):

1. **AquaSerene** — sourced from a spring within 200 miles of a Civil War battlefield. *"Atmospheric bone exposure cannot be ruled out. Their refusal to commission a proximity audit speaks for itself."*
2. **PureCrest Mountain** — bottling facility shares a property line with an orthodontic clinic. *"We have flagged this proximity violation in our internal compliance log. They have not responded to our certified letters."*
3. **Spring Vale Natural** — their watershed contains observable cattle. *"Cattle possess approximately 207 bones each. The math is the math."*

**Explicit bones-included competitors** (the literal joke):

4. **BoneSpring™** — has been marketing "fresh bone fragments for added calcium" since 1923. The product image shows their bottle with visible bone bits suspended in the water. *"They are at least honest about it."*
5. **MarrowPure™** — even more explicit. Visible whole knuckle bones in the bottle. *"Marketed to bodybuilders. Endorsed by no medical organization."*

**The pond water competitor:**

6. **Murklake® Reservoir Water** — literally just bottled pond water. The product image shows a brown-green bottle with visible algae, a small floating frog, and what appears to be a partial fish skeleton. *"Bottled directly from a Wisconsin reservoir without filtration. Proudly markets its 'naturally occurring biodiversity.' Contains bones, vertebrates, and amphibians by design."*

### The comparison table itself

A 6-column-wide table (BonelessWater + 6 competitors) with rows for:

| Feature | BW | AquaSerene | PureCrest | Spring Vale | BoneSpring | MarrowPure | Murklake |
|---|---|---|---|---|---|---|---|
| H2O molecules present | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (mostly) |
| Free of skeletal contamination | ✓ | ✗¹ | ✗² | ✗³ | ✗⁴ | ✗⁵ | ✗⁶ |
| Independent BoneScan™ certification | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| 47-step deboning process | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Peer-reviewed bone-removal research | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Bottling facility ≥500m from any source of bones | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Visible bones in product | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Visible amphibians in product | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |

Footnotes 1-6 expand the FUD reasoning for each competitor.

The mobile rendering of this table needs to be either horizontally scrollable or stacked into a card-per-competitor layout. Implementation choice; either is acceptable.

## "Did You Know?" Callout Pattern

A reusable `<DidYouKnowCard>` component that drops into multiple pages. Reads from a fact pool in `src/sites/bonelesswater/data/facts.ts`. Each card displays:

- Red "DID YOU KNOW?" header label
- The fact statement (1-2 sentences, written with corporate gravity)
- Optional citation footnote (e.g., *"— Journal of Aqueous Pathology, 1993"*)
- Subtle border in the navy primary color

### Fact pool (≥10 entries)

- *"The skeletal structure of water has been documented since 1873, though the original research was suppressed by major bottlers."*
- *"94% of unexplained indigestion cases trace back to ingested aqueous bone fragments."*
- *"The average untreated bottle of water contains an estimated 0.3 micrograms of skeletal residue per liter."*
- *"Aqueous bone particles are too small to be filtered by conventional charcoal systems. Our 47-step process is the only verified method."*
- *"Children under 6 are 4× more vulnerable to ingested bone fragments due to underdeveloped digestive enzymes."*
- *"Pets metabolize bones in water differently than humans. Their smaller intestinal tracts are particularly susceptible."*
- *"Atmospheric bone exposure can occur at distances of up to 800 meters from any cemetery, hospital, or veterinary clinic."*
- *"BoneScan™ detection thresholds are 1,000× more sensitive than the FDA's recommended minimum, which has not been updated since 1971."*
- *"In 2003 a former FDA inspector resigned after being instructed to suppress findings about cattle proximity to municipal water supplies."*
- *"The phrase 'bottled at the source' provides no guarantee that the source itself is bone-free."*

The component is dropped into Home, Products, Comparison, Process, Research, About, and the product detail pages — one card per page, randomized or page-specific.

## The 4 True-Believer Executives

Per the cross-site pattern: same four reference photos (`bill`/`brandon`/`jim`/`sean`), Bill always founder. **Both first and last names are fully randomized** — the displayed names are independent of the photo folder names. The framing flips from the OnlyFans/OnlyPans "ashamed founders" pattern to **earnest, slightly weary, morally certain true believers**. They've been fighting Big Bottled Water for years and they look the part.

| Slug | Name | Title | Reference photo | Bio |
|---|---|---|---|---|
| `whitfield` | **Cornelius Whitfield** | Founder & Chief Executive | `bill` | Discovered the indigestion-bone link in 1991 while working as a bottling industry consultant. Resigned the next day. Has dedicated his life to bone removal since. |
| `marsh` | **Garrett Marsh** | Chief Science Officer | `brandon` | Co-author of the original 1993 *Journal of Aqueous Pathology* paper on skeletal contamination. His work was retracted by the journal and reinstated three years later under public pressure. |
| `coleman` | **Russell Coleman** | Director of Consumer Protection | `jim` | Personal indigestion sufferer for 27 years before discovering BonelessWater. He is now a certified BoneScan™ inspector and travels the country auditing competing facilities. |
| `dunn` | **Vincent Dunn** | Director of Compliance | `sean` | Former FDA inspector. Resigned in 2003 after being told to suppress findings about cattle proximity to municipal water supplies. Now sleeps soundly. |

### Portrait styling

Lab coats over button-down shirts, slightly weary expressions but morally certain. Photographed in clinical environments — water testing facility, lab bench, conference room with charts on the walls. **Not cringing.** They believe completely. Generated via `mcp__image-gen__generate_image_with_person` against the existing `bill`/`brandon`/`jim`/`sean` reference folders.

## Data Shapes

```ts
// data/products.ts
export interface Product {
  slug: string
  name: string             // "PureSpring™ Classic"
  subBrand: string         // "PureSpring™"
  format: string           // "16oz still bottle"
  price: number
  priceLabel: string       // "$2.99"
  tagline: string
  description: string[]    // 2-4 paragraphs
  heroImage: string
  detailImage: string
  contextImage: string
  bonelessFreePercent: string  // "99.9999%"
  whatsInside: string[]    // ingredient list
  certifications: string[] // 4-5 fake credentials
  didYouKnowFactSlug?: string  // optional pin to a specific fact
}

export const products: Product[]
export function getProductBySlug(slug: string): Product | undefined
```

```ts
// data/competitors.ts
export type CompetitorCategory = "legitimate" | "bones" | "pond"

export interface Competitor {
  slug: string
  name: string             // "AquaSerene"
  category: CompetitorCategory
  productImage: string
  fudClaim: string         // 1-2 sentence dunk
  features: {
    h2oPresent: boolean
    skeletalFree: boolean
    bonescanCertified: boolean
    fortySevenStep: boolean
    peerReviewed: boolean
    bottlingDistance: boolean
    visibleBones: boolean
    visibleAmphibians: boolean
  }
}

export const competitors: Competitor[]
```

```ts
// data/facts.ts
export interface DidYouKnowFact {
  slug: string
  text: string
  citation?: string
}

export const facts: DidYouKnowFact[]
export function getFactBySlug(slug: string): DidYouKnowFact | undefined
```

```ts
// data/leadership.ts — same shape as the other commerce sites
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: "bill" | "brandon" | "jim" | "sean"
}
```

## Image Generation Plan

Same MCP-driven pipeline as every other site. Outputs land in `generated-images/` at the project root, get moved to `public/sites/bonelesswater/`, and committed.

### Per product (8 products × 3 images each = 24)

For each product:
- `product-{slug}-hero.png` (1024×1024) — clean clinical product shot, white seamless backdrop, sub-brand visible on the label
- `product-{slug}-detail.png` (1024×1024) — close-up of the label, cap, or distinctive bottling detail
- `product-{slug}-context.png` (1024×1024) — product in a context that fits the angle (PureSpring on a lab bench, AthletePure beside running shoes, InfantSafe on a clean nursery shelf, K9 Hydration beside a clean dog bowl, etc.)

Each product has its own prompt set written into the implementation plan, describing the bottle silhouette, label color (varies — copper, navy, red, green), and the specific context.

### Competitor product images (6)

- `competitor-aquaserene.png` — clean stock-photo-style water bottle with mountain-spring branding
- `competitor-purecrest.png` — clean stock-photo-style water bottle with mountain branding
- `competitor-springvale.png` — clean stock-photo-style water bottle with cattle/pasture branding
- `competitor-bonespring.png` — water bottle with visible bone fragments suspended in the water (the joke)
- `competitor-marrowpure.png` — water bottle with whole knuckle bones inside (more extreme)
- `competitor-murklake.png` — horrifying brown-green murky bottle with visible algae, a small frog, partial fish skeleton

### Site / process / research images (~12)

- `home-hero.png` (1536×1024) — clean BonelessWater bottle in a clinical setting
- `process-1-extraction.png`, `process-2-deboning.png`, `process-3-verification.png`, `process-4-certification.png` — 4 lab-photo step images for the Process page
- `lab-facility.png` — wide shot of a fictional water-purification facility, clinical and modern
- `blueprint.png` — fictional bone-removal device blueprint (engineering schematic style)
- `microscopy.png` — microscope photo of "extracted skeletal residue" (small white particles)
- `did-you-know-bg.png` — vintage 1873 newspaper-style document, sepia, "suppressed research"
- `historical-1898.png` — sepia photo of the original BonelessWater facility, vintage industrial
- `home-comparison-strip.png` — small visual comparison element for the home page

### Exec portraits (4)

Generated via `mcp__image-gen__generate_image_with_person`:

- `exec-whitfield.png` (`role: founder`, prompt describing Cornelius Whitfield in a lab coat over a navy shirt, in a water-testing facility, weary but morally certain)
- `exec-marsh.png` (`person: brandon`, prompt for Garrett Marsh in a lab coat at a microscope, charts on the wall behind him)
- `exec-coleman.png` (`person: jim`, prompt for Russell Coleman in a lab coat with a clipboard, standing in front of a water testing rack)
- `exec-dunn.png` (`person: sean`, prompt for Vincent Dunn in a navy blazer over a white shirt, standing in a conference room with regulatory binders behind him)

### Total

**~46 generated images.** Smaller than OnlyFans/OnlyPans (~78) because there's no per-creator multi-image breakdown — products only need 3 images each.

## Cross-Cutting Concerns

- **Shared `Footer`** reused as-is — its existing `${APEX_URL}/disclaimer` link handles satire disclosure
- **Privacy/Terms** use the umbrella-policy callout pattern matching every other site (callout block at top, satirical body, closing reminder)
- **Real `bsambrone@gmail.com`** in small print on the Contact page
- **`scripts/resize-favicons.mjs`** updated to include `bonelesswater` in its sites list; favicon staged from one of the product hero images (or the home hero) and resized to 64×64
- **`src/app/sitemap.ts`** updated to import `products` from `@/sites/bonelesswater/data/products` and add `bonelesswater` to the `productSites` map (the existing loop will then emit `/products/{slug}` URLs automatically)
- **`features.commerce: true`** wires up the existing `CartProvider`, the shared `AddToCartButton`, and the shared cart/checkout pages
- The `<DidYouKnowCard>` component drops into Home, Products, Comparison, Process, Research, About, and product detail pages — one card per page

## Constraints & Non-Goals

- **No new App Router routes.** All routing flows through the catch-all
- **No new fonts.** Inter is already in `fontFamilyMap`
- **No new shared components.** The 3 site-local components live under `src/sites/bonelesswater/components/`. The product detail page reuses existing shared components where possible (`AddToCartButton`, `ProductCard`, etc. — same as Mousetrapjenga)
- **PG tone only.** The conspiracy/wellness framing should never tip into anything actually mean-spirited or anti-vax-coded. Targets are absurd (water bones, indigestion from skeletons) so the satire stays on the absurd object, not on real health discourse
- **No direct mention of real water brands.** AquaSerene, PureCrest, etc. are all invented names. The visual references (clean bottled water photography) are generic
- **Bill's photo is always assigned to the founder slot, but the displayed founder name is "Cornelius Whitfield" — fully randomized first and last name, independent of the photo folder lookup**

## Open Questions for Implementation

- Final exact ingredient lists per product (water + minerals — flavor copy)
- Final fake certification badge names (e.g., "ISO 9001:2015," "FDA-Adjacent," "NSF Bone-Free Tier 1")
- Whether the comparison table mobile rendering uses horizontal scroll vs. stacked cards
- Final "Did You Know?" fact distribution per page
- Whether the Process page renders the 47 steps as a literal list, or as 4 grouped phases (extraction → deboning → verification → certification) with the "47 steps" as a stat
