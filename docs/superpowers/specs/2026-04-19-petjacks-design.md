# Petjacks — Design Spec

**Date:** 2026-04-19
**Subdomain:** `petjacks`
**Parent entity:** Petjacks Propulsion, LLC — a wholly-owned subsidiary of Specific Industries
**Tagline:** *Every pet deserves the sky.*

## 1. Premise

Petjacks is a satire consumer-pet brand that sells jetpacks for cats, dogs, rabbits, and fish. The joke works because the surface is cheerful, pastel, and relentlessly earnest — indistinguishable from a real direct-to-consumer pet brand. The horror lives exclusively in the fine print: expandable asterisk footnotes, a persistent legal footer on every page, and a "Safety Record" page that reports casualties in quarterly-earnings language.

Tonally, Petjacks never breaks character. Body copy is warm and aspirational. Product names are cute. Copy uses words like "adventure," "freedom," "family moments," "bonding," and "sky-high confidence." The reader supplies the dissonance by reading the footnotes.

## 2. Voice guidelines

**DO:**
- Write product copy like Chewy or BarkBox wrote it.
- Celebrate pet "achievements" and "milestones."
- Frame high-risk activities as wholesome bonding.
- Bury the dark material in footnotes, disclosures, and dense legal prose.

**DON'T:**
- Acknowledge risk in headlines or body copy.
- Wink at the reader. The brand does not know it is absurd.
- Use edgy / sardonic phrasing in the primary narrative register.

## 3. Brand identity

### Theme

**Preset:** `"playful"`

**Palette:**
- Primary: `#7EC4E8` — soft sky blue (condensation-trail blue)
- Secondary: `#FFD6A5` — peach cream
- Accent: `#FF8FA3` — blush coral
- Background: `#FDFBF5` — near-white paper
- Text: `#1F2937` — deep slate

No yellow or gold on the cream background (contrast fails per `feedback_yellow_on_light`).

**Fonts:**
- Heading: `nunito` (rounded, friendly)
- Body: `inter`
- Fine print (footnotes, legal footer, disclosures, safety-record table): applied inline via Tailwind `font-mono` + explicit tiny sizing; no site-level font change needed.

### Metadata

- `name`: `"Petjacks"`
- `title`: `"Petjacks — Every Pet Deserves the Sky"`
- `description`: `"Personal propulsion systems for cats, dogs, rabbits, and fish. Family-friendly adventure, sky-high confidence, and lasting bonds await."`
- `organizationType`: `"Corporation"`
- `parentOrganization`: `"Specific Industries"`
- `verticalKey`: `"consumer-goods"`

## 4. Information architecture

### Navigation (header, left→right)

```
Home · Products · Flight Academy · Mission Gallery · Safety Record · About · Contact
```

Leadership, Privacy, and Terms live in the footer, not primary nav.

### Page roster

| Slug | Purpose |
|------|---------|
| `/` | Home: hero, species lineup, testimonials, fine-print footer block |
| `/products` | Catalog: 4 flagship jetpacks on top, accessories grid below |
| `/products/[slug]` | Product detail (dynamic route): description, specs, disclosures, add-to-cart |
| `/flight-academy` | Three-tier enrollment page for Pre-Flight Readiness Camp |
| `/mission-gallery` | Grid of heroic pet-astronaut portraits (~12; three with subtle memorial borders) |
| `/safety-record` | Incident table framed as an earnings report |
| `/about` | Origin story, mission statement |
| `/leadership` | 4-exec team page |
| `/contact` | Contact form + address |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service (liability language ties back to the joke) |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |

### Commerce

`features.commerce: true`. Cart state lives in `localStorage` under key `petjacks-cart`. `AddToCartButton` rendered on every product detail page. Matches chunkymilk's exact pattern.

## 5. Product catalog

### Flagship jetpacks (4)

| Slug | Name | Species | Price |
|------|------|---------|-------|
| `whiskerwings-300` | Whiskerwings 300 | Cat | $1,299 |
| `pupjet-ultra` | Pupjet Ultra | Dog | $1,899 |
| `hopperlauncher-lx` | Hopperlauncher LX | Rabbit | $999 |
| `finflyer-aquapro` | FinFlyer AquaPro | Fish | $649 |

### Accessories (11)

| Slug | Name | Price |
|------|------|-------|
| `re-entry-cozy` | Re-Entry Cozy (helmet, floral pattern) | $49 |
| `pet-tracker-beacon` | Pet Tracker Beacon | $89 |
| `spare-fuel-cells-3pk` | Spare Fuel Cells (3-pack) | $119 |
| `pre-flight-fur-conditioner` | Pre-Flight Fur Conditioner | $24 |
| `liability-waiver-50pk` | Liability Waiver Bundle (50-pack) | $39 |
| `mission-bandana` | Mission Bandana | $19 |
| `parachute-accessory` | Parachute Accessory | $79 |
| `flight-treats` | Flight Treats | $14 |
| `memorial-photo-frame` | Memorial Photo Frame | $59 |
| `cabin-pressurization-kit` | Cabin Pressurization Kit | $149 |
| `pet-flight-diary` | Pet Flight Diary | $22 |

### Product data shape

`src/sites/petjacks/data/products.ts`:

```ts
export type Species = "cat" | "dog" | "rabbit" | "fish" | "universal"
export type ProductCategory = "jetpack" | "accessory"

export interface Product {
  slug: string
  name: string
  species: Species
  category: ProductCategory
  price: number
  priceLabel: string
  tagline: string                                        // cheerful one-liner
  description: string[]                                  // cheerful body paragraphs
  image: string
  specs: Array<{ label: string; value: string }>         // "Thrust", "Flight Time", "Recovery Rate*"
  disclosures: string[]                                  // per-product fine-print bullets
}

export const products: Product[] = [...]
export function getProductBySlug(slug: string): Product | undefined { ... }
```

Footnote copy is authored in the page JSX, not stored in product data — keeps the cheerful/grim juxtaposition co-located with the page voice.

## 6. Footnote & fine-print system

Three mechanisms reinforce each other:

### 6.1 `<Footnote>` component

`src/sites/petjacks/components/footnote.tsx`

Inline superscript marker (`*`, `†`, `‡`, or numeric) with expandable text.

```tsx
<p>
  Best-in-class recovery rate<Footnote marker="*">Recovery rate: 23% (2025 internal audit).</Footnote>
</p>
```

- Uses a `<details>` element so it works without JavaScript on mobile; CSS hover-tooltip on desktop.
- No central registry. Copy lives where it's used.
- Every page authors its own footnotes inline.

### 6.2 `<LegalFooter>` block

`src/sites/petjacks/components/legal-footer.tsx`

- Rendered on **every** petjacks page, above the shared site `<Footer>` from `src/components/layout/footer.tsx`.
- Each petjacks page component imports and mounts `<LegalFooter />` at the bottom of its JSX. No layout wrapper exists per-site; the project convention is that pages compose their own content.
- Full-width sandy-beige band. Contents:
  - Fatality rate table by species (bullet list; specific percentages)
  - Ongoing class-action disclosures (2-3 named cases, dates, federal districts)
  - FAA / FCC / USDA non-compliance notices
  - Recall history (batch numbers, dates, scope)
  - Warranty exclusions
  - Known side-effects bullet list
  - Binding arbitration + jurisdiction notice
- Typography: `font-mono`, ~10px, near-black text on the beige band.

### 6.3 Per-product `disclosures[]` block

On `/products/[slug]`, after description & specs, a compact "Product-Specific Disclosures" block renders each disclosure bullet. Same mono/tiny/beige treatment as the LegalFooter.

## 7. Mission Gallery

`/mission-gallery`

- Grid of 12 pet-astronaut portrait cards.
- Each card: square portrait, pet name, species, model flown, mission designation (e.g., "Mission PJ-2024-0043"), one-line owner quote.
- 3 of the 12 cards have a subtle black border and a small "In Memoriam · 2024" caption below the name. No tonal shift in copy — they read as normal cards in the brand's frame.
- No hover states, no jokes in-line. Dissonance does the work.

Data source: `src/sites/petjacks/data/mission-gallery.ts`.

## 8. Safety Record

`/safety-record`

- Top: short paragraph in earnings-report voice. Example: *"Q3 re-entry anomalies decreased 12% year-over-year, reflecting continued investment in our Pre-Flight Readiness program. Gross flight hours across all species reached record highs for the third consecutive quarter."*
- Below: dense, spreadsheet-styled table of ~20 incidents.

Data shape — `src/sites/petjacks/data/incidents.ts`:

```ts
export interface Incident {
  id: string              // "PJ-2024-0043"
  date: string            // ISO date
  species: Species
  petName: string         // "Mr. Pickles"
  model: string           // "Pupjet Ultra"
  classification: string  // "Re-Entry Anomaly" | "Propulsion Event" | "Unscheduled Ascent" | etc.
  outcome: string         // Euphemistic: "Mission Concluded", "Returned to Earth (partially)"
  notes: string           // One-line, dry
}

export const incidents: Incident[] = [...]
```

Table columns: ID · Date · Species · Pet Name · Model · Classification · Outcome · Notes.

## 9. Flight Academy

`/flight-academy`

Enrollment page for Pre-Flight Readiness Camp. Three tiers as pricing cards:

| Tier | Price | Copy |
|------|-------|------|
| Starter | $199 | 2-day orientation. "Your pet will meet the launch pad." |
| Standard | $499 | 1-week program. "Harness familiarization, thrust-tolerance assessment, meals included." |
| Elite | $1,299 | 3-week residency. "Intensive preparation. Post-program placement in Mission Gallery pending performance." |

Each tier card has footnotes (completion rate, meal allergy disclaimer, "pending performance" unpacked grimly). Closing CTA: "Now that your pet is ready, equip them →" linking to `/products`.

## 10. Leadership team

`/leadership`

**4 execs, all male**, modeled after the named base-image people: bill, brandon, jim, sean (per `user_base_image_genders`). First AND last names randomized on the site (per `feedback_exec_name_randomization`) — the base image is the anchor, not the name.

Titles:

1. CEO & Founder
2. Chief Propulsion Officer
3. Chief Veterinary Officer *(title footnoted: "veterinary advisory role; not a licensed veterinarian")*
4. Chief Safety Officer

Bios: 2-3 sentences each, cheerful brand voice, with one dark-humor asterisk buried per bio.

Portraits generated via `mcp__image-gen__generate_image_with_person` mapped to the correct base person.

## 11. Imagery plan

All assets saved under `public/sites/petjacks/`.

| Asset | Count | Generator |
|-------|-------|-----------|
| Hero image (home) — whimsical sky with multiple species mid-flight | 1 | `generate_image` |
| Flagship jetpack product shots | 4 | `generate_image` |
| Accessory product shots | 11 | `generate_image` |
| Mission Gallery pet portraits (~3 with subtle in-memoriam borders) | 12 | `generate_image` |
| Leadership portraits (bill/brandon/jim/sean, all male) | 4 | `generate_image_with_person` |
| Flight Academy scene (pets in training harnesses on a launch pad) | 1 | `generate_image` |
| About facility exterior | 1 | `generate_image` |
| Favicon | 1 | derived from logo |

**~35 images total.**

Every prompt enforces the pastel palette (soft sky blue, peach cream, blush coral) and a consistent soft cloud/studio backdrop for product and gallery shots so the grids read uniformly.

## 12. File structure

```
src/sites/petjacks/
├── config.ts
├── index.ts
├── components/
│   ├── footnote.tsx
│   └── legal-footer.tsx
├── data/
│   ├── products.ts
│   ├── mission-gallery.ts
│   └── incidents.ts
└── pages/
    ├── home.tsx
    ├── products.tsx
    ├── product-detail.tsx
    ├── flight-academy.tsx
    ├── mission-gallery.tsx
    ├── safety-record.tsx
    ├── about.tsx
    ├── leadership.tsx
    ├── contact.tsx
    ├── privacy.tsx
    ├── terms.tsx
    ├── cart.tsx
    └── checkout.tsx

public/sites/petjacks/
├── hero.png
├── favicon.ico
├── products/
│   └── <slug>.png        (15 files)
├── mission-gallery/
│   └── <name>.png        (12 files)
├── leadership/
│   └── <slug>.png        (4 files)
├── flight-academy.png
└── facility.png
```

## 13. Integration points

Per `feedback_new_site_subdomain_allowlist`, both files must be updated:

- `src/sites/registry.ts` — import and register `petjacks` module (config, pages, dynamicRoutes)
- `src/sites/subdomains.ts` — append `"petjacks"` to `VALID_SUBDOMAINS`

Dynamic route `products/[slug]` wires up `productSchema` JSON-LD, mirroring chunkymilk's `src/sites/chunkymilk/index.ts` `dynamicRoutes` export.

## 14. SEO & schema

- `organizationSchema` injected at site level with `organizationType: "Corporation"` and `parentOrganization: "Specific Industries"`.
- Each product detail page emits a `productSchema` via the catch-all route's `getJsonLd` hook.
- All pages with `metadata` exports define `title`, `description`, and (where applicable) `ogImage` so sitemap + OG cards render correctly.

## 15. Required conventions checklist

Per `feedback_new_site_patterns`, every new site ships with:

- [x] Privacy page (`/privacy`)
- [x] Terms page (`/terms`)
- [x] Leadership page (`/leadership`)
- [x] Contact page (`/contact`)

Per `feedback_new_site_subdomain_allowlist`:

- [x] Added to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`

Per `feedback_exec_name_randomization`:

- [x] First AND last names of all execs randomized

Per `user_base_image_genders`:

- [x] 4 execs, all male, mapped to bill/brandon/jim/sean base images

Per `feedback_yellow_on_light`:

- [x] Palette contains no yellow/gold on light background

## 16. Open items for the implementation plan

- Footnote rendering mechanism (plain `<details>` vs. a CSS-hover tooltip hybrid) — the component should support both, but implementation can iterate.
- Specific incident & mission-gallery copy — generated during implementation within this tonal frame.
- Legal-footer detailed copy — drafted during implementation; spec fixes the categories, not the wording.
