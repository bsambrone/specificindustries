# Seel-Tite Containment Systems — Design Spec

**Subdomain:** `seeltite`
**Date:** 2026-04-17
**Status:** Approved for implementation planning

## Concept

A satirical power-tool-ecosystem brand selling one product — the **G1 Containment Gasket**, an engineered anal seal for shart prevention — plus ten modular accessories that click into its output port to dispose of any breach without anyone noticing. The comedy lives in the industrial straight face: product listings read like DeWalt catalog entries, scenarios read like after-action reports, and every image is staged like commercial product photography. The tagline **"One Seal. Every Scenario."** anchors the core pitch: *prevent sharts, and if prevention fails, dispose of the aftermath without skipping a beat.*

The site is strictly SFW. Implication and industrial seriousness carry the joke; there is no graphic language or graphic imagery. The parody is the bit — the same catalog-page polish DeWalt gives a drill driver is lavished on a gasket.

## Brand & Voice

**Name:** Seel-Tite (lowercased subdomain `seeltite`; stylized "Seel-Tite" in display type)
**Tagline (primary):** "One Seal. Every Scenario."
**Tagline (secondary):** "Prevent. Dispose. Proceed."
**Heritage line:** "Seel-Tite Containment Systems — American Engineered Since 1973."
**Positioning:** Modern industrial power-tool ecosystem brand (DeWalt/Milwaukee-core) with a heritage wordmark and a contemporary website.

**Voice:** Deadpan industrial-catalog prose. Copy reads as if written by a humorless product marketer at a real tool company: precise tolerances, port specs, PSI ratings, MIL-STD-adjacent compliance claims. Testimonials use mundane job titles and specific settings — the mundane-ness is what sells it. Body copy implies, never describes. Example cadence: *"Event detected at 14:32:07. Containment confirmed. Proceedings continued."*

**Visual palette:**
- Safety orange `#F25C05` (primary — hazmat/containment iconography, CTAs)
- Charcoal `#1A1A1A` (secondary — dark panels, headers on light)
- Hi-vis lime `#C8E82A` (accent — jobsite PPE; used sparingly for status indicators and callouts)
- Concrete off-white `#F2F2EF` (background)
- Near-black `#0D0D0D` (body text)
- Steel gray `#6B6B6B` (muted/secondary text)

**Typography** (all three fonts are already registered in `src/themes/fonts.ts` — no font module changes required):
- Heading: **Barlow Condensed** — condensed sans, catalog/industrial feel
- Body: **Inter** (platform standard)
- Spec/telemetry readouts: **IBM Plex Mono** — used in spec tables, compatibility matrices, and the `SpecReadout` component

**Brand ornament:** Orange-and-black caution-tape dividers (the `CautionStripe` component), chevron/chamfer geometric flourishes, framed "TESTED / CERTIFIED" stamps where credibility jokes land.

## Site Map

**12 static pages + 1 dynamic route family (11 product detail pages).**

| Route | Purpose | Image load |
|---|---|---|
| `/` | Homepage — hero, value prop, 3-card Field Reports marquee, modular-ecosystem diagram, accessory preview grid, CTA | Heavy (~8 images) |
| `/products` | Catalog — 11-SKU grid with Core / Disposal / Ancillary filter | Medium (catalog hero + 11 cards) |
| `/products/[slug]` | Product detail — hero, specs, demo sequence, compatibility chips, testimonials | Heavy per page (5-7 images × 11) |
| `/scenarios` | **Prevention** — "The Seal Held." 8 illustrated scenario cards | Very heavy (~20 images) |
| `/recovery` | **Failure-recovery** — "The System Engaged." 8 recovery case studies with accessory-in-action imagery | Very heavy (~20 images) |
| `/demonstrations` | Per-accessory demo reel — test-bench illustrations, sequence frames, engineer quotes | Very heavy (~22 images) |
| `/compatibility` | Compatibility chart — accessory × gasket matrix, port specs, firmware revs | Medium (3 diagrams) |
| `/about` | Heritage — "Since 1973" origin, timeline, compliance badges, factory archive photography | Medium (6 images) |
| `/leadership` | Four randomized-name execs (bill/brandon/jim/sean) rendered with "constipated/mid-clench" styling | 4 portraits |
| `/contact` | Satirical industrial contact form + `bsambrone@gmail.com` in small print | Light (1-2 images) |
| `/privacy` | Umbrella callout + full satirical numbered sections | Light (1 image) |
| `/terms` | Umbrella callout + full satirical numbered sections | Light (1 image) |

**Navigation:**
- Header primary: Products · Scenarios · Recovery · Demonstrations · Compatibility · About
- Header right: Cart (commerce enabled)
- Footer: Leadership · Contact · Privacy · Terms

**Dynamic routes:** `/products/[slug]` is wired via `dynamicRoutes` in the site barrel, following the pigmilk/sovereignwellness pattern. Each slug resolves to the `ProductDetail` component with data from `src/sites/seeltite/data/products.ts`.

## Product Catalog (11 SKUs)

One gasket (the hub) + ten accessories that click into its Output Port. Categories: **core**, **disposal**, **ancillary**.

| Slug | Name | Category | Price | One-liner |
|---|---|---|---|---|
| `g1-containment-gasket` | G1 Containment Gasket | core | $249.00 | The hub. MIL-SPEC seal. Standard output port. |
| `the-grinder` | The Grinder | disposal | $189.00 | On-body pulverization. Silent operation. |
| `salad-shooter-attachment` | Salad Shooter Attachment | disposal | $159.00 | Rotary dispersion module. Commercial-grade shafts. |
| `cryo-puck-module` | The Cryo-Puck | disposal | $229.00 | Flash-freezes output to a tidy, odorless solid puck. |
| `pneumatic-ejector-kit` | Pneumatic Ejector Kit | disposal | $179.00 | Compressed-cartridge ejection. 6-pack cartridges sold separately. |
| `shopvac-adapter` | Shop-Vac Adapter | disposal | $89.00 | Standard 1.25" / 2.5" hose fittings. BYO wet/dry vac. |
| `incinerator-module` | The Incinerator Module | disposal | $319.00 | On-body vaporization. Lithium pack included. |
| `odor-cartridge-pack` | Odor-Neutralizing Cartridge 6-Pack | ancillary | $42.00 | Cedar, Workshop, Linen. Swap in seconds. |
| `telemetry-module` | Telemetry Module | ancillary | $129.00 | App-connected. Seal-integrity logs. Predictive alerts. |
| `the-silencer` | The Silencer | ancillary | $99.00 | Acoustic baffle. Sub-30dB operation. Boardroom-rated. |
| `secondary-gasket-redundancy` | Backup Secondary Gasket | ancillary | $179.00 | Redundant seal. For weddings, depositions, long-hauls. |

### Product data schema

```ts
interface Product {
  slug: string
  name: string
  category: "core" | "disposal" | "ancillary"
  price: number
  tagline: string
  description: string[]            // body paragraphs
  features: string[]               // bullet spec claims
  specs: Record<string, string>    // PSI, tolerance, port, weight, certs
  heroImage: string
  galleryImages: string[]          // 2-3 demo/sequence frames
  exploded: string                 // line-art exploded-view diagram path
  compatibleWith: string[]         // slugs of products that click in
  testimonials: string[]           // slugs into scenario/recovery testimonial pool
}
```

Helper: `getProductBySlug(slug: string): Product | undefined` — matches platform pattern.

## Scenarios & Recovery

Two sibling pages, each powered by its own data file. The `ScenarioCard` component renders both.

**Shared schema:**
```ts
interface Scenario {
  slug: string
  title: string                    // e.g., "Best-Man Toast, T-minus 30s"
  situation: string                // 1-2 sentence setup
  beat: string                     // the moment — what happened
  outcome: string                  // result — seal held OR accessory engaged
  pullQuote: string                // dramatic customer quote
  illustration: string             // hero illustration path
  portraitSlug: string             // → shared testimonial-portraits registry
  customerName: string             // display name from shared library
  customerRole: string             // "Construction Foreman, 23 yrs"
  accessoryUsed?: string           // recovery only — slug of the engaged accessory
  statChips?: Array<{ label: string; value: string }>
}
```

### Prevention cases (`/scenarios`) — 8 cards

1. **Best-Man Toast, T-minus 30s** — wedding reception, 30 seconds to podium, seal holds through a 4-minute speech
2. **Deposition, Hour 4** — opposing counsel hammering; witness maintains eye contact, G1 at full load
3. **Live On-Air Weather Cut-In** — local news anchor, 90-second cross-talk, green-screen behind them
4. **First Date, Upscale Restaurant** — prix fixe tasting menu, octopus course, seal engaged under white tablecloth
5. **Eulogy, Grandmother's Funeral** — lectern, 120 mourners, full emotional register maintained
6. **PTA Board Vote on the Gazebo Resolution** — folding chair, Chair Linda Morrissey presiding, 40-minute session
7. **DMV Window 3, Third Hour** — seat molded, clipboard in hand, seal holds during Form B-112 re-review
8. **School Play, Narrator Role, Act II** — dad in audience, camcorder up, act runs long

### Recovery cases (`/recovery`) — 8 cards

Each recovery card visually highlights **which accessory engaged** via a chip/badge + accessory thumbnail linked to its product page.

1. **Wedding officiant, ring exchange** — 3:17 PM breach → **Cryo-Puck** engages → ceremony completes
2. **Airline pilot, passenger announcement** — cruise altitude → **Incinerator Module** discharge cycle → seatbelt sign remains illuminated
3. **Surgeon, hour 6 of cardiac bypass** — sterile field maintained → **Shop-Vac Adapter** routed to floor unit → no break in scrub
4. **Corporate presenter, Q4 board readout** — slide 17 of 32 → **The Grinder** activates → clicker does not skip
5. **Wedding toast giver (recurrence)** — **Pneumatic Ejector Kit** cartridge fires during applause → nobody notices over ovation
6. **Live stand-up set, 22 minutes in** — crowd laughing → **The Silencer + Salad Shooter** combined → set completes on time
7. **Congressional testimony, sworn witness** — **Telemetry Module** predictive alert + **Backup Secondary Gasket** auto-engages → transcript clean
8. **High school reunion, photo line** — **Odor-Neutralizing Cartridge** swap (Cedar→Linen) mid-handshake → photo comes out great

### Homepage Field Reports marquee

Three hero cards pulled from the above pools — one prevention, one recovery, one "category intro" that links to `/scenarios` or `/recovery`. Rendered via `ScenarioCard` in `hero` variant.

### Tone rules for scenario copy

- Deadpan after-action-report voice. Never euphemize cutely — the joke is the straight face.
- Body copy implies, never describes.
- Named customers feel real. Mundane job titles and specific settings.
- No graphic language anywhere. SFW. The industrial language carries the comedy.

## Shared Customer Portrait Library Extension

**Current state:**
- Registry: `src/data/testimonial-portraits.ts` (16 entries)
- PNGs on disk: `public/shared/testimonials/` (28 files; 12 unregistered)
- Current schema: `{ slug, name, image }` — flat, no metadata

**Changes for Seel-Tite:**

### Registry backfill
Add registry entries for the 12 already-existing but un-registered PNGs: `adelaide-muncy`, `beauregard-holt`, `clement-ashby`, `eamon-trestle`, `fenella-ostrom`, `hattie-bronwyn`, `margot-finch`, `orson-pepperdine`, `priscilla-voss-bingham`, `rosalind-keck`, `theodora-lindquist`, `warren-duvall`.

### Schema extension
```ts
interface TestimonialPortrait {
  slug: string
  name: string
  image: string
  role?: string                // "Construction Foreman", "Attorney, 23 yrs"
  expression?: "neutral" | "pleased" | "ashamed" | "stoic" | "pained"
}
```
Back-fill `role` and `expression` on existing 28 portraits (best-effort pass from visual content). New optional fields preserve existing callers.

### New helpers
```ts
export function getPortraitsByExpression(expr: TestimonialPortrait["expression"]): TestimonialPortrait[]
export function getPortraitsByRole(roleContains: string): TestimonialPortrait[]
```

### 10 new ashamed/mortified portraits

Generated via `scripts/generate-seeltite-portraits.ts` (separate script from the main Seel-Tite image script so library generation is decoupled and re-runnable). Output to `public/shared/testimonials/`.

| Slug | Role | First usage on Seel-Tite |
|---|---|---|
| `caldwell-briggs` | Construction Foreman, 23 yrs | Prevention — foreman scenario |
| `elise-tanaka` | Corporate CFO | Recovery — Q4 board readout |
| `rev-thomasina-oakes` | Wedding Officiant | Recovery — ring exchange |
| `capt-rourke-vallis` | Commercial Airline Pilot | Recovery — passenger announcement |
| `dr-moira-petrescu` | Cardiothoracic Surgeon | Recovery — hour 6 of bypass |
| `linda-morrissey` | PTA Board Chair | Prevention — Gazebo Resolution |
| `coach-derrick-plum` | High School Football Coach | Prevention — halftime speech |
| `tamsin-kerrigan` | Courtroom Deposition Witness | Prevention — hour 4 |
| `judson-hale` | Stand-up Comic | Recovery — 22-minute set |
| `margaux-sanderling` | Local News Anchor | Prevention — weather cut-in |

All 10 share the "caught mid-incident, eyes distant, slight sweat, composed but mortified" look, rendered in the platform's shared-portrait visual style (neutral backdrop, headshot composition, matched lighting) so other sites can reuse them without visual mismatch. All tagged `expression: "ashamed"`.

Final registry size after this work: **38 entries** (28 existing + 10 new).

## Image Generation Plan

**Scripts:**
- `scripts/generate-seeltite-images.ts` — everything Seel-Tite-specific (hero, products, scenarios, recovery, demos, compatibility, about, contact, privacy/terms, + the 4 execs with constipated/mid-clench styling)
- `scripts/generate-seeltite-portraits.ts` — the 10 new shared library portraits → `public/shared/testimonials/`

**Main output directory:** `public/sites/seeltite/`

**Estimated volume (~105 Seel-Tite-specific images + 10 shared portraits):**

| Category | Count | Notes |
|---|---|---|
| Homepage | 8 | Hero tool-bench flatlay, 3 field-reports illustrations, ecosystem diagram, 2 accessory showcase tiles, CTA background |
| Product hero shots | 11 | Clean studio-style product photography, one per SKU |
| Product gallery (per-SKU) | 33 | 3 per product: exploded-view line-art, demo-in-action frame, context shot |
| Scenarios (prevention) | 8 | Full illustrated scenes — protagonist composed, subtle product hints (cable peek, status LED, posture) |
| Recovery | 8 | Full illustrated scenes — accessory visibly engaging (Cryo frost, Grinder vibration, Shop-Vac hose routed, Salad Shooter rotary motion, Pneumatic cartridge plume, Incinerator heat shimmer, Silencer baffle cutaway, Odor cartridge swap) |
| Demonstrations | 22 | Per-accessory: 2 sequence frames (before / engaged) × 11 SKUs |
| Compatibility | 3 | Exploded modular-ecosystem diagram, port-spec callout, firmware matrix visual |
| About (heritage) | 6 | 1973 factory archive photo, welding floor, compliance lab, timeline chip backgrounds, founder archive shot, current HQ exterior |
| Leadership | 4 | bill/brandon/jim/sean — constipated/mid-clench/composed-but-straining, industrial-engineering exec styling, orange-and-charcoal backdrop, shop floor blurred behind |
| Contact | 1 | Rotary desk phone on an industrial workbench |
| Privacy/Terms | 1 | Caution-tape banner graphic (re-used between both pages) |
| **Shared portrait library (separate script)** | **10** | Ashamed/mortified headshots, neutral background, registered in `testimonial-portraits.ts` |

### Global image directives

1. **Products in action.** Every scenario/recovery/demo image shows the gasket or an accessory visibly doing its job. Subtle hints for prevention (cable peek, status LED, composed protagonist despite the setting); explicit accessory-engagement visuals for recovery.
2. **SFW always.** Suggestion and implication, never depiction. The industrial seriousness is the joke.
3. **Consistent palette.** Safety orange, charcoal, hi-vis lime, concrete off-white.
4. **Modern industrial photography aesthetic.** DeWalt/Milwaukee product-shot polish — clean, lit, commercial.
5. **Protagonists composed.** Tight jaws, thousand-yard stare, sweat at hairline. Dignified mortification. Never slapstick.

### Execution cadence

The generation script is built to resume (existing files skipped via `fs.existsSync`). Run in batches; verify a small sample looks right before running the full queue. Images are expensive and slow; the resume behavior is essential.

### Favicon & OG

- **OG image:** `config.ogImage` → `"/sites/seeltite/hero.png"` (per convention #5)
- **Favicon:** `public/sites/seeltite/favicon.png` 64×64, generated from the gasket crest at small-scale legibility; add `seeltite` to the `sites` array in `scripts/resize-favicons.mjs` (per convention #6)

## Components

### Reused from the shared library (no changes)
- `Hero` — homepage, about
- `FeatureSection` / `ImageTextSection` — homepage value-prop blocks, about heritage sections
- `ProductCard` — catalog grid
- `SpecsTable` — product detail, compatibility page
- `CertificationCard` — about + demonstrations (fake compliance badges)
- `ExecutiveCard` — leadership page
- `Timeline` — about page heritage milestones
- `CtaBanner` — homepage footer CTA, product pages
- `ComparisonTable` — compatibility page (accessory × gasket grid)
- `FaqAccordion` — optional, about or contact
- `WarningBox` — deadpan product safety caveats
- `StatStrip` / `MetricCounter` — homepage ("14,382 Events Contained. 0 Excused.")
- `TestimonialGrid` — light use on about
- `AddToCartButton`, `CartButton`, `CartProvider`, `Toast` — commerce
- `Header`, `Footer`, `MobileNav`, `MegaMenu` — layout

### New site-specific components (in `src/sites/seeltite/components/`)

1. **`ScenarioCard`** — tall illustrated card: full-bleed illustration → title → situation blurb → pull-quote → portrait + customer name/role → optional stat chips → optional accessory badge (recovery variant). Two variants: `card` (scenarios/recovery pages) and `hero` (homepage Field Reports marquee). Used on `/`, `/scenarios`, `/recovery`.

2. **`ModularEcosystemDiagram`** — gasket at center, 10 accessory chips radiating outward connected by spec callout lines. Static SVG composition. Used on `/` and `/compatibility`. Hover tooltips a nice-to-have; defer if tight.

3. **`AccessoryCompatibilityRow`** — horizontal chip row on product detail pages showing which accessories click into the current product. Chips link to their product pages.

4. **`DemoSequenceBlock`** — per-accessory panel on `/demonstrations`: heading, 2-3 sequence frames in a row (before / engaged / complete), spec-readout beside it, engineer pull-quote. One instance per SKU on that page.

5. **`SpecReadout`** — IBM-Plex-Mono-styled block rendering pseudo-telemetry (PSI graph, port spec, firmware rev, MIL-STD compliance). Used inside `DemoSequenceBlock` and on product detail pages.

6. **`CautionStripe`** — reusable orange-and-black caution-tape divider. Accepts an optional text band ("CONTAINMENT · PROTOCOL · CONTAINMENT"). Used between sections for brand energy.

**No changes to shared components.** All Seel-Tite-specific UI is scoped to `src/sites/seeltite/components/`.

## Commerce & Site Conventions

### Commerce
- `features.commerce: true` in `config.ts`
- `CartProvider` wraps layout when Seel-Tite loads
- Cart key: `seeltite-cart` (follows `{subdomain}-cart` convention)
- `CartButton` in header with item count badge
- `AddToCartButton` on catalog cards and product detail pages
- `/cart` and `/checkout` inherit from the shared commerce flow; no Seel-Tite-specific variants

### Required-per-convention pages

**`/leadership`** — 4 execs, names randomized per memory (both first AND last name). Industrial-engineering titling: e.g., "Chief Containment Officer," "Head of Seal Engineering," "VP of Disposal Systems," "Director of Predictive Alerts." Bill stays the founder. Portraits carry the constipated/mid-clench styling from the image plan.

**`/contact`** — satirical industrial contact form ("Submit a Containment Inquiry" / "Field Incident Report" / "Accessory Compatibility Question"), fake 1-800 number, with real `bsambrone@gmail.com` in small print in the footer region per memory convention #3.

**`/privacy`** — **Umbrella callout first** (bordered block linking to `specificindustries.com/privacy`), THEN full satirical numbered sections in Seel-Tite's voice (telemetry data, seal-event logs, odor-preference profiling, accessory firmware heartbeat collection, etc.) per memory convention #1.

**`/terms`** — same two-layer pattern: umbrella callout → satirical numbered sections (accessory compatibility warranty, "Proper Sealing Posture" clauses, liability for off-label disposal routing, "End-User Seal Integrity Acknowledgement," etc.).

### Platform wiring per memory conventions

1. Register `seeltite` in `src/sites/registry.ts`
2. Add `seeltite` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts` (convention #3)
3. Add to `src/app/sitemap.ts` under the product-sites block (`/products/:slug` pattern, import `products` from `src/sites/seeltite/data/products.ts`)
4. `config.ogImage: "/sites/seeltite/hero.png"` (convention #5)
5. Favicon at `public/sites/seeltite/favicon.png` 64×64; add `seeltite` to the `sites` array in `scripts/resize-favicons.mjs` (convention #6)

## File Structure

```
src/sites/seeltite/
├── config.ts
├── index.ts                        # barrel: config, pages, dynamicRoutes
├── data/
│   ├── products.ts                 # 11 SKUs + getProductBySlug
│   ├── scenarios.ts                # 8 prevention cases
│   ├── recovery.ts                 # 8 recovery cases
│   ├── compatibility.ts            # accessory-gasket compatibility matrix
│   └── leadership.ts               # 4 execs (randomized names)
├── components/
│   ├── scenario-card.tsx
│   ├── modular-ecosystem-diagram.tsx
│   ├── accessory-compatibility-row.tsx
│   ├── demo-sequence-block.tsx
│   ├── spec-readout.tsx
│   └── caution-stripe.tsx
└── pages/
    ├── home.tsx
    ├── products.tsx                # catalog grid
    ├── product-detail.tsx          # dynamic route target
    ├── scenarios.tsx
    ├── recovery.tsx
    ├── demonstrations.tsx
    ├── compatibility.tsx
    ├── about.tsx
    ├── leadership.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx

public/sites/seeltite/
├── (all site-specific generated images + favicon.png + hero.png)

public/shared/testimonials/
├── (10 new ashamed-expression portraits added via separate script)

src/data/testimonial-portraits.ts
   # registry: schema extended, 28 existing backfilled, 10 new added
```

## Verification Posture

No automated tests (matches platform convention — existing sites carry none). Verification is via:

- `npm run build` — production build must succeed
- `npx tsc --noEmit` — no type errors
- `npm run lint` — clean
- Manual browser check at `localhost:3000/?site=seeltite` covering every route, cart add/checkout, and mobile navigation

## Out of Scope

- Real commerce backend (cart is localStorage-only; same as every existing commerce-enabled site)
- SSR/static generation (all pages remain dynamically rendered through the catch-all route)
- Automated visual regression testing
- Per-accessory stand-alone microsites or sub-domains

## Implementation Approach

**Approach A: Single bundled plan, one PR** — chosen during brainstorming. Matches the rhythm of every recent site build (sovereignwellness, carterandfils, radiumroys). The image-generation script is large but follows established patterns. Voice, visual style, and component architecture benefit from being built holistically.
