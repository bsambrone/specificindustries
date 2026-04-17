# Mostlysterile — Design Spec

**Date:** 2026-04-16
**Subdomain:** `mostlysterile`
**Type:** Satire e-commerce site (subdomain of specificindustries.com)

## Concept

Mostlysterile is a sketchy back-alley medical supply company presented with the corporate veneer of a real medical distributor. The central gag is "Defensive Legitimacy" — every claim the site makes sounds reassuring on the surface, but is immediately hedged, qualified, or asterisked. The brand sells surgical instruments, bandages, PPE, diagnostics, "pharmaceuticals," and hospital surplus that all strongly imply dubious provenance without ever naming it.

The joke lives in the gap between tone (professional, clinical, confident) and content (products we found, sterility that mostly holds up, certifications from online courses).

## Brand Identity

**Name:** Mostlysterile
**Tagline:** *"Meeting or nearing industry standards since 2014."* (primary — implementation may also use *"Sterile enough."* and *"Medical supplies at prices you can live with."* as secondary tags in hero rotations or footer)
**Origin:** Founded 2014 in a self-storage unit by a lapsed pre-med student. Now serves "the tri-state area and occasionally elsewhere."

**Voice rules (Defensive Legitimacy):**
- Write like a real medical supply company. Every paragraph opens confidently.
- Every confident claim gets a qualifier: "*or comparable*," "*where applicable*," "*to the extent feasible*," "*absent contraindication*."
- Liberal use of footnote-style asterisks that lead to progressively weaker disclaimers.
- No winking. The narrator believes Mostlysterile is a legitimate operation that is simply *misunderstood*.
- Legal hedging is the primary humor engine — the product copy never breaks the fourth wall.

## Visual Identity

**Theme preset:** `light`

**Colors (Clinical But Off palette):**
- `background`: `#f6f4ee` — sterile off-white (gauze paper)
- `text`: `#0f1e2e` — deep clinical navy
- `primary`: `#1e3a5f` — hospital navy (headers, primary buttons)
- `secondary`: `#9bc5b8` — hospital mint (feature blocks, secondary surfaces)
- `accent`: `#e8c547` — caution yellow (asterisks, disclaimer banners, "NEW" badges, callouts)

**Fonts (both already in `src/themes/fonts.ts`):**
- Heading: **Barlow Condensed** — condensed sans-serif that reads like medical packaging labels
- Body: **Inter** — clean, neutral, clinical

No new fonts required.

## Architecture

Standard subdomain site, follows the established pattern (pigmilk, radiumroys, snortables). One new shared UI component is required (`CertificationCard`); everything else composes from existing components.

```
src/sites/mostlysterile/
├── config.ts            # SiteConfig: theme, nav, metadata, commerce: true
├── index.ts             # Barrel: config, pages, dynamicRoutes
├── data/
│   └── products.ts      # 16 products + getProductBySlug helper + categories
└── pages/
    ├── home.tsx
    ├── products.tsx            # Flat grid with category filter chips
    ├── product-detail.tsx
    ├── about.tsx
    ├── certifications.tsx      # Grid of framed credentials
    ├── quality-assurance.tsx   # 12-step sterility process (Timeline)
    ├── leadership.tsx          # Randomized exec names per convention
    ├── faq.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx
```

**Registry updates:**
- Add `mostlysterile` module to `siteRegistry` in `src/sites/registry.ts`
- Add `"mostlysterile"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Add `mostlysterileProducts` to the `productSites` map in `src/app/sitemap.ts`

**Commerce:** `features.commerce: true`. CartProvider wraps the site automatically. localStorage key: `mostlysterile-cart`.

## New Shared Component

**`CertificationCard`** (lives in `src/components/ui/CertificationCard.tsx`)
- Renders a framed-credential card: ornamental border, title line, issuing body, year
- Props: `title: string`, `issuer: string`, `year: string`, `note?: string` (for the extra hedge line)
- Theme-aware via CSS variables (primary for border, accent for seal/ornament)
- Generic enough to reuse in future sites (awards, membership cards, etc.)

## Data Shape

```typescript
type ProductCategory =
  | "surgical-instruments"
  | "bandages-wound-care"
  | "ppe"
  | "diagnostics"
  | "pharmaceuticals"
  | "hospital-surplus"

type Product = {
  slug: string
  name: string
  category: ProductCategory
  price: number
  priceLabel: string          // e.g., "$8.99 / unit", "$11.99 / box of 50"
  tagline: string
  description: string[]       // paragraphs, defensive-legitimacy voice
  image: string               // /sites/mostlysterile/product-<slug>.png
  specifications: Array<{ label: string; value: string }>
}

export const categories: Array<{ slug: ProductCategory; label: string }>
export const products: Product[]
export function getProductBySlug(slug: string): Product | undefined
```

`specifications` mirrors pigmilk's `nutritionalFacts` role. Typical fields per product:
- **Sterility Level** — *"Mostly," "Was Earlier Today," "Depends on Humidity," "Factory Fresh\*"*
- **Origin** — *"Hospital Closure Sale," "Warehouse Find," "Previous Owner Deceased," "Estate Sale"*
- **Expiration** — *"TBD," "Last Tuesday," "We'd Rather Not Say," "See Underside"*
- **Condition** — *"Unwrapped But Unused," "Gently Worn," "Factory Fresh\*"*
- **Certifications** — *"CE (Close Enough)," "FDA (Friendly Domestic Association)," "ISO-Inspired"*
- **Warranty** — *"Verbal," "Until You Notice," "None"*

Each product uses 5–6 of these fields (not all).

## Navigation

Header nav (in order):
```
Home | Products | Certifications | Quality | Leadership | FAQ | Contact
```

Cart icon in header (provided by `CartButton` when `features.commerce: true`). Footer includes: About, Privacy, Terms, plus standard copyright with an extended fine-print disclaimer block.

## Page Specs

### `/` Home
Top-to-bottom:
1. **Hero** — tagline headline, primary CTA "Browse Catalog." Thin caution-yellow banner beneath: *"\*Product claims not independently verified. Claims may vary from product actually received."*
2. **"Why Mostlysterile?" `FeatureSection`** — 3 features:
   - *Almost Guaranteed Value* — "Our prices reflect our confidence (or lack thereof)."
   - *Partially Certified* — "Every product is reviewed by at least one person who believes they are qualified."
   - *Shipping From Somewhere* — "Fast shipping from a location we are legally advised not to disclose."
3. **Featured Products** — 4 products pulled from across categories (use existing `ProductCard`)
4. **Trust Row** — horizontal band of 5–6 fake certification wordmarks: CE (Close Enough), FDA (Friendly Domestic Association), ISO-Inspired, WHO (We're Hopeful, Okay?), USP (Usually Sort-of Pure), HIPAA-Adjacent
5. **Dual CTA cards** — side-by-side callouts linking to `/certifications` and `/quality-assurance`
6. **Testimonials** — 3 defensively-hedged quotes from randomized "Dr. [First] [Last]" figures. Example: *"These gloves did not give me an infection. At least not yet."* — Dr. [randomized], [randomized specialty]
7. **Footer** — standard layout + extra-long fine-print disclaimer paragraph

### `/products`
- Page header + tagline
- Filter chip row above the grid: *All | Surgical | Bandages | PPE | Diagnostics | Pharmaceuticals | Surplus*
- Filter is client-side state (no URL routing required for filters)
- Grid of `ProductCard` components for matching products
- Empty-state text if a filter somehow yields zero (defensive fallback, shouldn't fire)

### `/products/[slug]` (dynamic route)
- Product image (left / top on mobile)
- Product name, tagline, price, category badge
- 2–3 paragraph defensive-legitimacy description
- **Specifications** block (styled like a spec sheet — clinical table, caution-yellow asterisks where fields hedge)
- Quantity selector + `AddToCartButton`
- Related products strip at bottom (3 items from same category, excluding current)
- Defined under `dynamicRoutes` in the barrel; invalid slugs return 404

### `/about`
- Origin story: founded 2014, self-storage unit, lapsed pre-med founder, current "tri-state and occasionally elsewhere" coverage
- Mission statement in defensive-legitimacy voice
- Timeline component with company milestones ("2014: Acquired first scalpel," "2016: Hired second employee (still with us\*)," "2019: Moved to a building with a roof," etc.)

### `/certifications` — The gallery page
- Page intro: a confident, two-paragraph defense of Mostlysterile's rigorous credentialing
- Grid of `CertificationCard` entries. Target 9–12 entries. Examples:
  - "Board Certified in Adjacent Concepts" — Continental Medical Review Board, 2017
  - "Most Improved Sterility" — Regional Medical Supply Semifinals, 2019 (note: *"Runner-up"*)
  - "Basic Hand Washing" — Online University of Applied Healthcare, 2018
  - "Letter of Reference" — A Guy Named Steve, 2020
  - "ISO-Inspired Certification" — Vibes-Based Compliance Institute, 2021
  - "Participation Ribbon" — County Health Fair, 2022
  - "Honorary Membership" — Doctors Without Borders Fan Club, 2019
  - "Completion of Coursework" — CPR for Mannequins, 2016
  - "Certificate of Attendance" — Medical Supplies Trade Show, 2018

### `/quality-assurance` — The QA process page
- Brief intro paragraph explaining Mostlysterile's "12-Step Sterility Verification Process"
- 12 steps rendered via existing `Timeline` component. Suggested steps:
  1. Visual Inspection (From A Distance)
  2. Sniff Test
  3. Manual Wipe-Down (Dry)
  4. Light Exposure (We Hold It Up To A Window)
  5. Verbal Affirmation ("This is fine")
  6. Temperature Check (Feels Cool)
  7. Peer Review (Bob Signs Off)
  8. Packaging Inspection (Is It Still Sealed-ish?)
  9. Secondary Review (Bob Signs Off Again)
  10. Documentation (In a Notebook, Somewhere)
  11. Squint At It
  12. Ship It
- Close with a confident callout: *"Every product leaving our facility has passed at least 11 of these 12 steps."*

### `/leadership`
- 4 execs, rendered via existing `TeamMember` component:
  - **CEO / Founder** — bio references lapsed pre-med
  - **Chief Financial Officer** — "handles the money"
  - **Chief Medical Officer** — "unaffiliated with any AMA"
  - **Head of Compliance** — "new hire (started recently)"
- **Exec names must randomize BOTH first AND last name** (per saved feedback memory)
- Bios in defensive-legitimacy voice, each 2–3 sentences

### `/faq`
Existing `FaqAccordion` component. Questions:
- "Is this legal?" → *"Where applicable, yes."*
- "Can I return a product?" → *"Returns are reviewed on a case-by-case basis by a rotating committee of one."*
- "Are you affiliated with [any named hospital]?" → *"They have not returned our calls."*
- "What does 'mostly sterile' mean?" → circular definition
- "Do you ship internationally?" → *"We ship to wherever the packaging ends up."*
- "Are your products FDA approved?" → *"Friendly Domestic Association approved."*
- "Who is your target customer?" → *"Customers."*
- "Can I speak to a pharmacist?" → *"We can put you through to someone with a comparable tone of voice."*

### `/contact`
- Intro copy in defensive-legitimacy voice
- Contact form (decorative, no backend submission):
  - Name (text)
  - Email (text)
  - Reason for contacting (dropdown: *Complaint / Legal Notice / Compliment (unlikely) / Other*)
  - "Are you a lawyer?" (Yes / No radio)
  - Message (textarea)
- Fake address: *"Mostlysterile Distribution, Unit 47B, Storage Facility Off Route 9"*

### `/privacy` and `/terms`
- Full satire body content following the established pattern (see rocks privacy/terms, commit `ee447cf`)
- Defensive-legitimacy voice throughout
- Disclaimers escalate subtly; no fourth wall breaks

### `/cart` and `/checkout`
- Provided by existing commerce system; no per-site customization beyond theme variables

## Product Catalog (16 items)

| # | Category | Product | Tagline direction |
|---|---|---|---|
| 1 | Surgical | Second-Hand Scalpel | Sharp enough for most uses |
| 2 | Surgical | Forceps, Various | A bag of assorted forceps |
| 3 | Surgical | Bone Saw (Manual) | Quieter than powered models |
| 4 | Bandages | Gauze That Passes the Sniff Test | Field-tested absorbency |
| 5 | Bandages | Band-Aids We Found | Assorted sizes, mostly clean |
| 6 | Bandages | Suture Kit (Estate Sale) | A previous owner's life's work |
| 7 | PPE | Size Whatever Gloves | One pair, fit guaranteed (on at least one hand) |
| 8 | PPE | Gently Worn N95s | Previously deployed, currently available |
| 9 | PPE | Surgical Gown (One-Size-Fits-Hopefully) | Universal drape, universal coverage\* |
| 10 | Diagnostics | Stethoscope (Calibration Uncertain) | Amplifies most sounds |
| 11 | Diagnostics | Mercury-Free Thermometer (Mostly) | No mercury has been added recently |
| 12 | Diagnostics | Blood Pressure Cuff with Opinions | Runs high, per our records |
| 13 | Pharmaceuticals | Placebex | Clinically tested in at least one clinic |
| 14 | Pharmaceuticals | Generix Extra Strength | Definitely not aspirin |
| 15 | Surplus | Used IV Bag | Contents previously administered to a recovering patient |
| 16 | Surplus | Reusable Biohazard Bag | Comes pre-used to ease the transition |

Final copy, exact prices, and `specifications` fields per product will be set during implementation.

## SEO / Metadata

- `metadata.ogImage` on the site config: `/sites/mostlysterile/hero.png` (placeholder expected at implementation time)
- Per-page `metadata` overrides for the high-value pages (`home`, `products`, `certifications`, `quality-assurance`, `about`)
- All pages auto-included in the sitemap once the subdomain is added to `siteRegistry`; product detail pages added via the `productSites` map in `src/app/sitemap.ts`

## Out of Scope (initial build)

- Custom mascot or logo illustration (wordmark-only logo)
- Per-product photography beyond AI-generated placeholders from the existing `mcp__image-gen` pipeline
- Per-page OG image generation (paths reserved; images can be added in a follow-up)
- Real contact-form submission (form is decorative)
- Tests (codebase is static-content driven; verification is `npm run lint`, `npx tsc --noEmit`, and a manual `npm run dev` walkthrough)

## Verification

At build/PR time:
- `npm run lint` passes
- `npx tsc --noEmit` passes
- `npm run dev` walkthrough: visit `/?site=mostlysterile` and exercise every nav item, one product detail page, the cart + checkout flow, and the filter chips on `/products`
- Sitemap output (`/sitemap.xml`) includes the new subdomain's static pages and all 16 product URLs
