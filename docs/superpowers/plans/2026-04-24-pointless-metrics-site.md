# Institute for the Study of Pointless Metrics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `pointlessmetrics` subdomain — a satirical for-profit research institute with commerce (12 SKUs across 5 categories), a 24-study spurious-correlations archive, two dynamic routes (products + findings), and the standard portfolio page set.

**Architecture:** New site under `src/sites/pointlessmetrics/` following the established subdomain-site pattern: `config.ts`, `index.ts` barrel, `data/` files, `pages/` components. Site-local chart/UI primitives under `src/components/ui/pointlessmetrics/`. Two dynamic routes (`/products/[slug]`, `/findings/[slug]`). Commerce enabled using the existing `CartProvider` pattern. No new App Router routes — everything resolves through the existing catch-all.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, shared `next/font` declarations (Lora + Inter, already registered). Hand-rolled inline SVG charts (no chart library). Images generated via the `scripts/generate-*-images.ts` pattern using OpenAI's `gpt-image-1` model.

**Spec:** `docs/superpowers/specs/2026-04-24-pointless-metrics-site-design.md`

**Verification approach:** This codebase has no unit test suite for site pages. Each task verifies via `npx tsc --noEmit` (type safety), `npm run lint`, and `npm run dev` smoke checks at `localhost:3000/<path>?site=pointlessmetrics`.

---

## Task 1: Site Scaffolding

Wire the subdomain end-to-end so a stub home page renders at `localhost:3000/?site=pointlessmetrics`. No content yet — just the routing.

**Files:**
- Create: `src/sites/pointlessmetrics/config.ts`
- Create: `src/sites/pointlessmetrics/pages/home.tsx`
- Create: `src/sites/pointlessmetrics/index.ts`
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create the site config**

Create `src/sites/pointlessmetrics/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Institute for the Study of Pointless Metrics",
  subdomain: "pointlessmetrics",
  theme: {
    preset: "institute",
    colors: {
      primary: "#0f2b4f",     // deep institutional navy
      secondary: "#c8553d",   // vermilion
      accent: "#6b7a6b",      // slate sage
      background: "#f7f3e9",  // paper cream
      text: "#1a1d24",        // near-black ink
    },
    fonts: {
      heading: "lora",
      body: "inter",
    },
  },
  metadata: {
    title: "Institute for the Study of Pointless Metrics — In Data We Overtrust",
    description:
      "The Institute for the Study of Pointless Metrics (ISPM) publishes peer-reviewed findings on spurious correlations, sells precision instruments for quantifying the intangible, and credentials the next generation of Pointless Metrics Practitioners™.",
    ogImage: "/sites/pointlessmetrics/hero.png",
  },
  megaMenu: {
    items: [
      {
        label: "Research",
        style: "dropdown",
        children: [
          { label: "Findings Archive", path: "/findings" },
          { label: "Methodology", path: "/methodology" },
          { label: "Quarterly Report", path: "/products/quarterly-report" },
        ],
      },
      {
        label: "Shop",
        style: "mega",
        children: [
          { label: "Instruments", path: "/shop#instruments", description: "Wearables, desktop dashboards, precision fixtures" },
          { label: "Publications", path: "/shop#publications", description: "The Quarterly Report and the Correlation Almanac" },
          { label: "Advisory", path: "/shop#advisory", description: "Audits, coaching retainers, on-site measurement" },
          { label: "Credentialing", path: "/shop#credentialing", description: "The Certified Pointless Metrics Practitioner™ program" },
          { label: "Merchandise", path: "/shop#merchandise", description: "Wall plaques, vanity-URL stickers, pocket rulers" },
          { label: "All Products", path: "/shop" },
        ],
      },
      {
        label: "About",
        style: "dropdown",
        children: [
          { label: "The Institute", path: "/about" },
          { label: "Leadership", path: "/leadership" },
          { label: "Contact", path: "/contact" },
        ],
      },
    ],
  },
  nav: [
    { label: "Findings", path: "/findings" },
    { label: "Shop", path: "/shop" },
    { label: "Methodology", path: "/methodology" },
    { label: "About", path: "/about" },
    { label: "Leadership", path: "/leadership" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "professional-tech",
  tagline: "In data we overtrust.",
}
```

- [ ] **Step 2: Create a stub home page**

Create `src/sites/pointlessmetrics/pages/home.tsx`:

```typescript
export default function PointlessMetricsHome() {
  return (
    <main className="py-24 px-4 text-center">
      <h1 className="font-heading text-5xl text-primary">Institute for the Study of Pointless Metrics</h1>
      <p className="mt-4 text-lg text-foreground/70">In data we overtrust.</p>
    </main>
  )
}
```

- [ ] **Step 3: Create the barrel export**

Create `src/sites/pointlessmetrics/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import PointlessMetricsHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PointlessMetricsHome,
}
```

Dynamic routes, commerce pages, and the rest of the page map will be added in later tasks.

- [ ] **Step 4: Register the site**

Modify `src/sites/registry.ts` — add an import and register the module. Read the file first and follow the existing alphabetical pattern.

Expected addition:

```typescript
import * as pointlessmetrics from "./pointlessmetrics"
```

And inside `siteRegistry`:

```typescript
  pointlessmetrics,
```

- [ ] **Step 5: Allow the subdomain**

Modify `src/sites/subdomains.ts` — add `"pointlessmetrics"` to the `VALID_SUBDOMAINS` array. Read first; follow the existing alphabetical ordering.

- [ ] **Step 6: Verify with tsc and lint**

Run:

```bash
npx tsc --noEmit && npm run lint
```

Expected: both pass.

- [ ] **Step 7: Smoke test the dev server**

Run `npm run dev` in a background terminal. Then verify `http://localhost:3000/?site=pointlessmetrics` returns the stub home page without errors.

- [ ] **Step 8: Commit**

```bash
git add src/sites/pointlessmetrics src/sites/registry.ts src/sites/subdomains.ts
git commit -m "feat(pointlessmetrics): scaffold site with config and stub home"
```

---

## Task 2: Core Small Data Files

Create the smaller data files in one task: leadership, shop + finding categories, press mentions, and home dashboard config. None of these reference products or findings, so they can ship standalone.

**Files:**
- Create: `src/sites/pointlessmetrics/data/leadership.ts`
- Create: `src/sites/pointlessmetrics/data/categories.ts`
- Create: `src/sites/pointlessmetrics/data/press-mentions.ts`
- Create: `src/sites/pointlessmetrics/data/home-dashboard.ts`

- [ ] **Step 1: Leadership data**

Create `src/sites/pointlessmetrics/data/leadership.ts`:

```typescript
export type PersonKey = "bill" | "brandon" | "jim" | "sean"

export interface Leader {
  person: PersonKey
  slug: string
  name: string
  title: string
  bio: string
  portraitImage: string
}

export const leaders: Leader[] = [
  {
    person: "bill",
    slug: "orrin-bletchley",
    name: "Orrin Bletchley",
    title: "Founder & Director of the Institute",
    bio: "Orrin founded the Institute in 2011 after a career in management consulting at McKinsey, where he observed a correlation once and devoted the rest of his professional life to the remaining ones. He holds a certificate in Measurable Outcomes from a weekend seminar in Leipzig. Principal investigator on six published findings, most concerning the leadership behaviors he formerly exhibited.",
    portraitImage: "/sites/pointlessmetrics/leaders/orrin-bletchley.png",
  },
  {
    person: "brandon",
    slug: "percival-ashcombe",
    name: "Dr. Percival Ashcombe",
    title: "Chief Research Officer",
    bio: "Percival oversees the Institute's research agenda, the Quarterly Synergy Density Report, and the annual Correlation Almanac. His doctoral work at an institution he declines to name established the statistical framework now used by the Institute's fake peer-review board. The most prolific investigator on staff, he is currently first author on eight published findings across culture, communication, and strategy.",
    portraitImage: "/sites/pointlessmetrics/leaders/percival-ashcombe.png",
  },
  {
    person: "jim",
    slug: "augustus-crane",
    name: "Dr. Augustus Crane",
    title: "Director of Advisory Services",
    bio: "Augustus leads the Institute's on-site engagements, including the KPI Vibe Audit and the Correlation Coaching retainer. He once measured a company's vibe so thoroughly it filed for bankruptcy. Principal investigator on five published findings in productivity and workplace categories. Holds a quiet, long-standing grudge against open-plan offices.",
    portraitImage: "/sites/pointlessmetrics/leaders/augustus-crane.png",
  },
  {
    person: "sean",
    slug: "beaumont-kessler",
    name: "Dean Beaumont Kessler",
    title: "Dean of the Practitioner Program",
    bio: "Beaumont administers the Certified Pointless Metrics Practitioner™ credential and chairs the Institute's fake accreditation council. He personally writes the fake capstone exam and has never awarded a perfect score. Principal investigator on five findings, primarily in strategy and leadership. Believes, with some justification, that everyone could stand to be tested more.",
    portraitImage: "/sites/pointlessmetrics/leaders/beaumont-kessler.png",
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}

export function getLeaderByPerson(person: PersonKey): Leader | undefined {
  return leaders.find((l) => l.person === person)
}
```

- [ ] **Step 2: Categories**

Create `src/sites/pointlessmetrics/data/categories.ts`:

```typescript
export type ShopCategoryKey = "instruments" | "publications" | "advisory" | "credentialing" | "merchandise"

export interface ShopCategory {
  key: ShopCategoryKey
  label: string
  blurb: string
}

export const shopCategories: ShopCategory[] = [
  { key: "instruments", label: "Instruments", blurb: "Precision apparatus for quantifying intangibles at rest and in motion." },
  { key: "publications", label: "Publications", blurb: "Peer-reviewed reports and our annual indexed compendium of correlations." },
  { key: "advisory", label: "Advisory Services", blurb: "On-site engagements and ongoing coaching retainers." },
  { key: "credentialing", label: "Credentialing", blurb: "The Certified Pointless Metrics Practitioner™ program." },
  { key: "merchandise", label: "Certified Merchandise", blurb: "Official Institute-issued objects, each bearing the seal." },
]

export type FindingCategoryKey = "leadership" | "culture" | "productivity" | "strategy" | "communication" | "workplace"

export interface FindingCategory {
  key: FindingCategoryKey
  label: string
}

export const findingCategories: FindingCategory[] = [
  { key: "leadership", label: "Leadership" },
  { key: "culture", label: "Culture" },
  { key: "productivity", label: "Productivity" },
  { key: "strategy", label: "Strategy" },
  { key: "communication", label: "Communication" },
  { key: "workplace", label: "Workplace" },
]
```

- [ ] **Step 3: Press mentions**

Create `src/sites/pointlessmetrics/data/press-mentions.ts`:

```typescript
export interface PressMention {
  publication: string
  quote: string
}

export const pressMentions: PressMention[] = [
  { publication: "Harvard Business Reappraisal", quote: "…the definitive voice in measurement that should not exist." },
  { publication: "The Quarterly Journal of Applied Vibes", quote: "Rigorous. Pointless. Rigorously pointless." },
  { publication: "McKinsey Alumni Newsletter", quote: "We respect the methodology, even as we cannot endorse the conclusions." },
  { publication: "The Correlation Reader", quote: "Seven of this year's ten most-cited non-causal studies bear the Institute seal." },
  { publication: "LinkedIn Monthly", quote: "The Institute has produced more than eight hundred thought-leader posts this quarter alone." },
  { publication: "Forbes Contributor Quarterly", quote: "A beacon for those who refuse to ask 'so what?'" },
]
```

- [ ] **Step 4: Home dashboard config**

Create `src/sites/pointlessmetrics/data/home-dashboard.ts`. The arrays reference slugs defined in the findings and products data files created in later tasks — at this point these are forward references the engineer must keep in sync.

```typescript
// Slugs of the 6 findings featured as live-feeling tiles on the homepage dashboard.
// Must exist in data/findings.ts.
export const featuredFindingSlugs: string[] = [
  "alignment-in-okrs-inverse",
  "houseplants-team-warmth",
  "all-hands-fiscal-optimism",
  "synergy-ma-announcements",
  "humble-ceo-interviews-inverse",
  "exec-patagonia-vest-board-sentiment",
]

// Slugs of the 3 products featured in the home hero CTA blocks.
// Must exist in data/products.ts.
export const featuredProductSlugs = {
  instrument: "vibe-ring",
  publication: "quarterly-report",
  credential: "certified-practitioner",
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both pass.

- [ ] **Step 6: Commit**

```bash
git add src/sites/pointlessmetrics/data
git commit -m "feat(pointlessmetrics): add leadership and supporting data files"
```

---

## Task 3: Products Data File

Create the 12-SKU catalog with the `Product` type and helper lookups. Each entry includes category key, price, designation, specs, cited findings, and related-product upsells.

**Files:**
- Create: `src/sites/pointlessmetrics/data/products.ts`

- [ ] **Step 1: Define the Product type and 12 entries**

Create `src/sites/pointlessmetrics/data/products.ts`. Show the type and two full example entries; the remaining ten follow the same shape. Use §5.1–5.5 of the spec as authoritative for public names, designations, prices, and pitches.

```typescript
import type { ShopCategoryKey } from "./categories"

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  designation: string                  // e.g., "ISPM Model 4A"
  categoryKey: ShopCategoryKey
  price: number                        // base unit price in dollars (used by cart)
  priceLabel: string                   // display string, may include units (e.g., "$395 / year")
  tagline: string
  description: string[]                // 2–3 paragraphs
  image: string
  whatItMeasures: string               // 2–3 sentences
  specs: ProductSpec[]                 // tabular specs
  methodologyNote: string              // 1 paragraph of epistemic hedging
  citedFindingSlugs: string[]          // 2–3 finding slugs
  relatedProductSlugs: string[]        // 2–3 upsell slugs
  testimonialPortraitSlugs: string[]   // 3 portrait slugs from the shared registry
  // Optional category-specific fields (present only where the template varies)
  curriculum?: { week: number; title: string; description: string }[]             // credentialing
  engagementScope?: string[]                                                      // advisory
  deliverables?: string[]                                                          // advisory
  pastIssues?: { label: string; title: string }[]                                  // quarterly-report only
}

export const products: Product[] = [
  {
    slug: "vibe-ring",
    name: "The Vibe Ring",
    designation: "ISPM Model 4A",
    categoryKey: "instruments",
    price: 349,
    priceLabel: "$349",
    tagline: "Passively samples ambient vibe density at 40 Hz.",
    description: [
      "The Vibe Ring is the Institute's flagship wearable, engineered to quantify the emotional resonance of any environment it occupies. Worn on the non-dominant hand, it gathers ambient vibe density readings continuously and transmits them to no one.",
      "Each ring is calibrated at the Institute's measurement bench, certified by the seal, and shipped in a velvet case bearing a signed certificate of epistemic provenance. Battery life is indefinite.",
    ],
    image: "/sites/pointlessmetrics/products/vibe-ring.png",
    whatItMeasures:
      "Ambient vibe density, expressed in vibe-units per cubic meter of enclosed meeting space. Readings are not shown to the wearer.",
    specs: [
      { label: "Sample rate", value: "40 Hz" },
      { label: "Weight", value: "6.2 g" },
      { label: "Material", value: "Medical-grade titanium; rose-gold finish" },
      { label: "Sizes", value: "US 5–13 (half sizes surcharged)" },
      { label: "Battery", value: "Indefinite" },
      { label: "Connectivity", value: "None (by design)" },
      { label: "Calibration interval", value: "Every 90 days, at an authorized bench" },
      { label: "Warranty", value: "See §4 of the EULA" },
    ],
    methodologyNote:
      "Vibe density is a derived quantity; it is not directly observable. The Vibe Ring infers it from temperature, capacitance, and the presence of adjacent Vibe Rings via a proprietary triangulation the Institute neither patents nor discloses.",
    citedFindingSlugs: ["houseplants-team-warmth", "exec-coffee-2pm-vibe", "free-snack-anxiety"],
    relatedProductSlugs: ["ambient-mood-barometer", "synergy-obelisk", "correlation-almanac"],
    testimonialPortraitSlugs: ["eleanor-whittaker", "nina-cabrera", "tony-mazetti"],
  },
  {
    slug: "certified-practitioner",
    name: "Certified Pointless Metrics Practitioner™",
    designation: "ISPM Credential Program, 8-Week Cohort",
    categoryKey: "credentialing",
    price: 2495,
    priceLabel: "$2,495",
    tagline: "Eight weeks to certification in the measurement of the immeasurable.",
    description: [
      "The Certified Pointless Metrics Practitioner™ credential is the Institute's flagship professional program. Over eight weeks, practitioners master the fourteen core competencies of pointless measurement, complete a capstone project, and sit for a written examination no one has yet passed on the first attempt.",
      "Graduates receive a digital credential, a LinkedIn badge, and a bronze lapel pin engraved with the Institute seal and a unique credential number that is not tracked in any database.",
      "The program is not accredited. By design.",
    ],
    image: "/sites/pointlessmetrics/products/certified-practitioner.png",
    whatItMeasures:
      "The practitioner's capacity to measure that which ought not be measured, applied across eight weeks of structured curriculum and one fake exam.",
    specs: [
      { label: "Duration", value: "8 weeks" },
      { label: "Format", value: "Asynchronous online with weekly synchronous seminar" },
      { label: "Cohort size", value: "Capped at 120" },
      { label: "CEUs", value: "0.0 (program is not accredited)" },
      { label: "Credential", value: "Digital badge + bronze lapel pin" },
      { label: "Accreditation", value: "See §11 of the Disclosure" },
    ],
    methodologyNote:
      "The curriculum is derived from the Institute's internal practitioner's handbook, now in its fourth revision. Proficiency is measured via a capstone deliverable graded by two faculty members who do not confer.",
    citedFindingSlugs: ["alignment-in-okrs-inverse", "bookshelf-density-fundraise", "ceo-linkedin-attrition"],
    relatedProductSlugs: ["quarterly-report", "correlation-almanac", "wall-plaque"],
    testimonialPortraitSlugs: ["dr-moira-petrescu", "priscilla-voss-bingham", "caldwell-briggs"],
    curriculum: [
      { week: 1, title: "Foundations of Pointless Measurement", description: "Epistemology, instrument calibration, and the ethics of measuring without purpose." },
      { week: 2, title: "The Correlational Toolkit", description: "Scatter-plot construction, spurious r-values, and the confidence interval as narrative device." },
      { week: 3, title: "Measuring the Intangible", description: "Operationalizing gravitas, warmth, alignment, synergy, and vibe." },
      { week: 4, title: "Methodology Without Consequence", description: "Designing studies that cannot be falsified or applied." },
      { week: 5, title: "The Language of Rigor", description: "Footnote discipline, citation hygiene, and the rhetorical use of p-values." },
      { week: 6, title: "The Advisory Engagement", description: "Field methods for on-site measurement; the half-day audit playbook." },
      { week: 7, title: "Dissemination and Defense", description: "Publishing through channels the Institute controls; peer review as a collegial activity." },
      { week: 8, title: "Capstone and Examination", description: "Deliver a bespoke study on a variable of the practitioner's choosing; sit for the written exam." },
    ],
  },
  // The remaining ten products follow the same Product shape.
  // Fill in using spec §5.1–5.5 as authoritative:
  //
  //   instruments:   "synergy-obelisk", "tarnishing-plaque", "ambient-mood-barometer"
  //   publications:  "quarterly-report", "correlation-almanac"
  //   advisory:      "kpi-vibe-audit", "correlation-coaching"
  //   merchandise:   "sticker-pack", "wall-plaque", "pocket-ruler"
  //
  // Advisory entries set engagementScope + deliverables (see §5.6 overrides).
  // quarterly-report sets pastIssues (4 entries; see §5.6 overrides).
  // Every entry must include citedFindingSlugs referencing slugs defined in
  // data/findings.ts (see Task 4). When in doubt, see the cross-reference
  // section at the bottom of findings.ts (Task 4 step 3) to pick 2–3
  // thematically appropriate findings per product.
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categoryKey: ShopCategoryKey): Product[] {
  return products.filter((p) => p.categoryKey === categoryKey)
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add src/sites/pointlessmetrics/data/products.ts
git commit -m "feat(pointlessmetrics): add 12-SKU product catalog"
```

---

## Task 4: Findings Data File

Create the 24-study archive. Each finding is a complete research record: title, claim, chart data points, methodology, caveats, funding disclosure, principal investigator, and the products that cite it.

**Files:**
- Create: `src/sites/pointlessmetrics/data/findings.ts`

- [ ] **Step 1: Define the Finding type and 24 entries**

Create `src/sites/pointlessmetrics/data/findings.ts`. Show the type, one complete sample entry, then the compact list of the remaining 23 titles with their required fields; the engineer fills in `chartData`, `methodology`, and `caveats` for each, following the spec §6.3 table.

```typescript
import type { FindingCategoryKey } from "./categories"
import type { PersonKey } from "./leadership"

export interface ChartPoint {
  x: number
  y: number
}

export interface Finding {
  slug: string
  title: string
  claim: string                          // one-sentence takeaway, displayed large
  category: FindingCategoryKey
  rValue: number                         // e.g., 0.87 or -0.92
  pValue: string                         // e.g., "< 0.001"
  sampleSize: number                     // e.g., 1247
  xAxis: { label: string; units: string }
  yAxis: { label: string; units: string }
  chartData: ChartPoint[]                // 15–20 scatter points; hand-authored to visually hit ~r
  methodology: string                    // one paragraph
  caveats: string[]                      // 2–3 absurd limitations
  publishedDate: string                  // "YYYY-MM"
  principalInvestigator: PersonKey
  funding: string                        // disclosure line
  citedByProducts: string[]              // product slugs; must match Product.slug values
}

// Helper to hand-roll scatter points matching a target r-value.
// Not required for correctness — the shared <CorrelationScatter> component
// computes the regression line from chartData and prints the stored rValue.
// Authoring tip: place 15–18 points where most trend with the target r,
// and 2–3 off-line points for visual realism.

export const findings: Finding[] = [
  {
    slug: "alignment-in-okrs-inverse",
    title: "Frequency of 'Alignment' in OKR Statements and Observed Team Alignment: An Inverse Relationship",
    claim:
      "The more frequently the word 'alignment' appears in a team's OKRs, the less aligned the team actually is.",
    category: "strategy",
    rValue: -0.89,
    pValue: "< 0.001",
    sampleSize: 247,
    xAxis: { label: "Instances of 'alignment' per OKR document", units: "count" },
    yAxis: { label: "Observed alignment score (external rater)", units: "score, 0–100" },
    chartData: [
      { x: 1, y: 84 }, { x: 2, y: 78 }, { x: 3, y: 72 }, { x: 3, y: 80 }, { x: 4, y: 68 },
      { x: 5, y: 62 }, { x: 6, y: 58 }, { x: 7, y: 54 }, { x: 8, y: 49 }, { x: 9, y: 44 },
      { x: 10, y: 41 }, { x: 11, y: 38 }, { x: 12, y: 33 }, { x: 13, y: 30 }, { x: 14, y: 27 },
      { x: 15, y: 24 }, { x: 16, y: 21 }, { x: 4, y: 85 },
    ],
    methodology:
      "Two hundred and forty-seven OKR documents were collected from participating organizations under an NDA the Institute drafted for itself. Instances of 'alignment' and 'aligned' were tallied. Observed team alignment was then scored by two external raters (neither of whom met the teams in question) via a five-minute review of meeting calendars.",
    caveats: [
      "Raters were not blinded to the word-count condition.",
      "Three teams in the sample were the same team, re-measured after a reorg.",
      "The Institute's internal OKR uses the word 'alignment' eleven times.",
    ],
    publishedDate: "2025-09",
    principalInvestigator: "sean",
    funding: "Funded by the Institute's general operating budget and one participating organization that requested the outcome be inverted.",
    citedByProducts: ["certified-practitioner", "kpi-vibe-audit", "correlation-coaching"],
  },
  // The remaining 23 findings follow the same shape. Required fields per entry:
  //
  //   slug (kebab-case, unique), title, claim, category, rValue, pValue,
  //   sampleSize, xAxis, yAxis, chartData (15–20 points), methodology,
  //   caveats (2–3), publishedDate (YYYY-MM between 2024-03 and 2026-03),
  //   principalInvestigator (distribute: bill x6, brandon x8, jim x5, sean x5),
  //   funding, citedByProducts (1–3 product slugs from data/products.ts).
  //
  // Spec §6.3 lists all 24 required titles with r-values, sample sizes, and
  // categories. Use that as authoritative and fill in the remaining fields
  // in the Institute voice (straight-faced academic).
  //
  // Required slugs (matching spec §6.3 order):
  //   1. standing-desk-ecosystem-language         (r 0.87, n 1247, culture, bill)
  //   2. open-office-synergy-decline              (r 0.79, n  412, workplace, jim)
  //   3. all-hands-fiscal-optimism                (r 0.91, n  328, leadership, bill)
  //   4. slack-emoji-document-length-inverse      (r -0.83, n 2140, communication, brandon)
  //   5. ceo-linkedin-attrition                   (r 0.76, n  189, leadership, bill)
  //   6. houseplants-team-warmth                  (r 0.88, n  867, workplace, jim)
  //   7. journey-all-hands-pivots                 (r 0.81, n  254, strategy, brandon)
  //   8. vendor-logo-saturation-churn             (r 0.74, n  512, strategy, brandon)
  //   9. transparency-usage-transcripts-inverse   (r -0.92, n 178, communication, brandon)
  //  10. free-snack-anxiety                       (r 0.80, n  730, culture, bill)
  //  11. exec-water-bottle-reorg                  (r 0.85, n  301, leadership, sean)
  //  12. all-hands-cadence-exit-package           (r 0.77, n   94, leadership, sean)
  //  13. fitbit-manager-nps-inflation             (r 0.73, n 1088, productivity, jim)
  //  14. bookshelf-density-fundraise              (r 0.86, n  412, leadership, bill)
  //  15. alignment-in-okrs-inverse               (above — already authored)
  //  16. take-this-offline-random-growth          (r 0.82, n  615, communication, brandon)
  //  17. exec-patagonia-vest-board-sentiment      (r 0.78, n  156, leadership, sean)
  //  18. synergy-ma-announcements                 (r 0.84, n  221, strategy, brandon)
  //  19. ping-pong-proximity-tenure-inverse       (r -0.75, n 894, workplace, jim)
  //  20. innovation-mission-patents-inverse       (r -0.87, n 1402, strategy, brandon)
  //  21. offsites-severance-accrual               (r 0.79, n  187, culture, bill)
  //  22. holiday-card-complexity-layoffs          (r 0.82, n  340, strategy, brandon)
  //  23. humble-ceo-interviews-inverse            (r -0.93, n   78, leadership, sean)
  //  24. exec-coffee-2pm-vibe                     (r 0.76, n  520, productivity, jim)
  //
  // Each finding's citedByProducts must reference products in data/products.ts.
  // Distribute so that every product is cited by 2–3 findings. A working
  // allocation (product -> findings that cite it):
  //
  //   vibe-ring:            houseplants-team-warmth, exec-coffee-2pm-vibe, free-snack-anxiety
  //   synergy-obelisk:      all-hands-fiscal-optimism, synergy-ma-announcements, open-office-synergy-decline
  //   tarnishing-plaque:    offsites-severance-accrual, holiday-card-complexity-layoffs, all-hands-cadence-exit-package
  //   ambient-mood-barometer: ping-pong-proximity-tenure-inverse, free-snack-anxiety, houseplants-team-warmth
  //   quarterly-report:     alignment-in-okrs-inverse, synergy-ma-announcements, innovation-mission-patents-inverse
  //   correlation-almanac:  standing-desk-ecosystem-language, slack-emoji-document-length-inverse, journey-all-hands-pivots
  //   kpi-vibe-audit:       alignment-in-okrs-inverse, open-office-synergy-decline, fitbit-manager-nps-inflation
  //   correlation-coaching: alignment-in-okrs-inverse, take-this-offline-random-growth, transparency-usage-transcripts-inverse
  //   certified-practitioner: alignment-in-okrs-inverse, bookshelf-density-fundraise, ceo-linkedin-attrition
  //   sticker-pack:         exec-patagonia-vest-board-sentiment, ceo-linkedin-attrition, vendor-logo-saturation-churn
  //   wall-plaque:          humble-ceo-interviews-inverse, bookshelf-density-fundraise, exec-water-bottle-reorg
  //   pocket-ruler:         vendor-logo-saturation-churn, exec-water-bottle-reorg, take-this-offline-random-growth
]

export function getFindingBySlug(slug: string): Finding | undefined {
  return findings.find((f) => f.slug === slug)
}

export function getFindingsByProductSlug(productSlug: string): Finding[] {
  return findings.filter((f) => f.citedByProducts.includes(productSlug))
}

export function getFindingsByCategory(category: FindingCategoryKey): Finding[] {
  return findings.filter((f) => f.category === category)
}

export function getFindingsByInvestigator(person: PersonKey): Finding[] {
  return findings.filter((f) => f.principalInvestigator === person)
}
```

- [ ] **Step 2: Author the remaining 23 entries**

Using the list in the source comment and spec §6.3, fill in every remaining finding. Chart data must be hand-authored so the visual trend matches the stored `rValue`. Keep every `methodology` and `caveats` in the Institute voice — straight-faced, no winks. Authoring tip: if `rValue` is positive, make `y` generally rise with `x`; if negative, make it fall. Include 2–3 off-trend points for realism.

- [ ] **Step 3: Cross-check product citation coverage**

After authoring, verify every product in `data/products.ts` is cited by at least 2 findings. Quick shell check:

```bash
for slug in vibe-ring synergy-obelisk tarnishing-plaque ambient-mood-barometer quarterly-report correlation-almanac kpi-vibe-audit correlation-coaching certified-practitioner sticker-pack wall-plaque pocket-ruler; do
  count=$(grep -c "\"$slug\"" src/sites/pointlessmetrics/data/findings.ts)
  echo "$slug: $count"
done
```

Expected: each product appears ≥2 times.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add src/sites/pointlessmetrics/data/findings.ts
git commit -m "feat(pointlessmetrics): add 24 correlation findings archive"
```

---

## Task 5: Chart Components (Scatter + Sparkline)

Hand-rolled inline SVG chart components. These render every finding throughout the site. No chart library.

**Files:**
- Create: `src/components/ui/pointlessmetrics/CorrelationScatter.tsx`
- Create: `src/components/ui/pointlessmetrics/CorrelationSparkline.tsx`

- [ ] **Step 1: Author `CorrelationScatter`**

Create `src/components/ui/pointlessmetrics/CorrelationScatter.tsx`:

```typescript
import type { ChartPoint } from "@/sites/pointlessmetrics/data/findings"

interface CorrelationScatterProps {
  points: ChartPoint[]
  xLabel: string
  yLabel: string
  xUnits: string
  yUnits: string
  rValue: number
  pValue: string
  sampleSize: number
  figureNumber?: number
  caption?: string
}

const WIDTH = 600
const HEIGHT = 400
const PAD_LEFT = 70
const PAD_RIGHT = 24
const PAD_TOP = 24
const PAD_BOTTOM = 64

export function CorrelationScatter({
  points,
  xLabel,
  yLabel,
  xUnits,
  yUnits,
  rValue,
  pValue,
  sampleSize,
  figureNumber = 1,
  caption,
}: CorrelationScatterProps) {
  if (points.length === 0) {
    return <div className="text-sm text-foreground/60">No data.</div>
  }

  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const xRange = xMax - xMin || 1
  const yRange = yMax - yMin || 1

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM

  const scaleX = (x: number) => PAD_LEFT + ((x - xMin) / xRange) * plotWidth
  const scaleY = (y: number) => PAD_TOP + plotHeight - ((y - yMin) / yRange) * plotHeight

  // Simple least-squares regression for the trend line.
  const n = points.length
  const meanX = xs.reduce((a, b) => a + b, 0) / n
  const meanY = ys.reduce((a, b) => a + b, 0) / n
  const num = points.reduce((s, p) => s + (p.x - meanX) * (p.y - meanY), 0)
  const den = points.reduce((s, p) => s + (p.x - meanX) * (p.x - meanX), 0) || 1
  const slope = num / den
  const intercept = meanY - slope * meanX
  const lineX1 = xMin
  const lineY1 = slope * xMin + intercept
  const lineX2 = xMax
  const lineY2 = slope * xMax + intercept

  // Gridlines at 4 x-steps and 4 y-steps.
  const gridXs = Array.from({ length: 5 }, (_, i) => xMin + (i / 4) * xRange)
  const gridYs = Array.from({ length: 5 }, (_, i) => yMin + (i / 4) * yRange)

  return (
    <figure className="bg-white border border-accent/40 p-4 rounded-sm">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" role="img" aria-label={`Figure ${figureNumber}: ${xLabel} versus ${yLabel}`}>
        {/* Plot area background */}
        <rect x={PAD_LEFT} y={PAD_TOP} width={plotWidth} height={plotHeight} fill="transparent" stroke="var(--color-accent)" strokeWidth={1} />

        {/* Gridlines */}
        {gridXs.map((gx) => (
          <line key={`gx-${gx}`} x1={scaleX(gx)} y1={PAD_TOP} x2={scaleX(gx)} y2={PAD_TOP + plotHeight} stroke="var(--color-accent)" strokeOpacity={0.25} strokeDasharray="2 3" />
        ))}
        {gridYs.map((gy) => (
          <line key={`gy-${gy}`} x1={PAD_LEFT} y1={scaleY(gy)} x2={PAD_LEFT + plotWidth} y2={scaleY(gy)} stroke="var(--color-accent)" strokeOpacity={0.25} strokeDasharray="2 3" />
        ))}

        {/* Axis ticks */}
        {gridXs.map((gx) => (
          <text key={`tx-${gx}`} x={scaleX(gx)} y={PAD_TOP + plotHeight + 16} textAnchor="middle" fontSize="10" fill="var(--color-accent)" className="tabular-nums">
            {formatTick(gx)}
          </text>
        ))}
        {gridYs.map((gy) => (
          <text key={`ty-${gy}`} x={PAD_LEFT - 8} y={scaleY(gy) + 3} textAnchor="end" fontSize="10" fill="var(--color-accent)" className="tabular-nums">
            {formatTick(gy)}
          </text>
        ))}

        {/* Axis labels */}
        <text x={PAD_LEFT + plotWidth / 2} y={HEIGHT - 16} textAnchor="middle" fontSize="12" fill="var(--color-text)">
          {xLabel} ({xUnits})
        </text>
        <text x={18} y={PAD_TOP + plotHeight / 2} textAnchor="middle" fontSize="12" fill="var(--color-text)" transform={`rotate(-90 18 ${PAD_TOP + plotHeight / 2})`}>
          {yLabel} ({yUnits})
        </text>

        {/* Regression line */}
        <line x1={scaleX(lineX1)} y1={scaleY(lineY1)} x2={scaleX(lineX2)} y2={scaleY(lineY2)} stroke="var(--color-secondary)" strokeWidth={1.5} />

        {/* Points */}
        {points.map((p, i) => (
          <circle key={i} cx={scaleX(p.x)} cy={scaleY(p.y)} r={4} fill="var(--color-primary)" fillOpacity={0.85} />
        ))}

        {/* Stat callout in upper-right of plot */}
        <g transform={`translate(${PAD_LEFT + plotWidth - 10}, ${PAD_TOP + 8})`}>
          <text textAnchor="end" fontSize="11" fill="var(--color-text)" className="tabular-nums">
            <tspan x="0" dy="0">r = {rValue.toFixed(2)}</tspan>
            <tspan x="0" dy="14">p {pValue}</tspan>
            <tspan x="0" dy="14">n = {sampleSize.toLocaleString()}</tspan>
          </text>
        </g>
      </svg>
      <figcaption className="mt-2 text-xs text-foreground/70 font-body">
        <span className="font-semibold">Figure {figureNumber}.</span>{caption ? ` ${caption}` : ` ${xLabel} versus ${yLabel}. n = ${sampleSize.toLocaleString()}.`}
      </figcaption>
    </figure>
  )
}

function formatTick(n: number): string {
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(1) + "k"
  if (Number.isInteger(n)) return n.toString()
  return n.toFixed(1)
}
```

- [ ] **Step 2: Author `CorrelationSparkline`**

Create `src/components/ui/pointlessmetrics/CorrelationSparkline.tsx`:

```typescript
import type { ChartPoint } from "@/sites/pointlessmetrics/data/findings"

interface CorrelationSparklineProps {
  points: ChartPoint[]
  rValue: number
}

const W = 180
const H = 80
const PAD = 6

export function CorrelationSparkline({ points, rValue }: CorrelationSparklineProps) {
  if (points.length === 0) return null
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const xRange = xMax - xMin || 1
  const yRange = yMax - yMin || 1
  const plotW = W - PAD * 2
  const plotH = H - PAD * 2

  const scaleX = (x: number) => PAD + ((x - xMin) / xRange) * plotW
  const scaleY = (y: number) => PAD + plotH - ((y - yMin) / yRange) * plotH

  const n = points.length
  const meanX = xs.reduce((a, b) => a + b, 0) / n
  const meanY = ys.reduce((a, b) => a + b, 0) / n
  const num = points.reduce((s, p) => s + (p.x - meanX) * (p.y - meanY), 0)
  const den = points.reduce((s, p) => s + (p.x - meanX) * (p.x - meanX), 0) || 1
  const slope = num / den
  const intercept = meanY - slope * meanX

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label={`Correlation sparkline, r = ${rValue.toFixed(2)}`}>
      <rect x={0} y={0} width={W} height={H} fill="transparent" stroke="var(--color-accent)" strokeOpacity={0.3} strokeWidth={1} />
      <line
        x1={scaleX(xMin)}
        y1={scaleY(slope * xMin + intercept)}
        x2={scaleX(xMax)}
        y2={scaleY(slope * xMax + intercept)}
        stroke="var(--color-secondary)"
        strokeWidth={1.2}
      />
      {points.map((p, i) => (
        <circle key={i} cx={scaleX(p.x)} cy={scaleY(p.y)} r={2} fill="var(--color-primary)" fillOpacity={0.9} />
      ))}
    </svg>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/pointlessmetrics
git commit -m "feat(pointlessmetrics): add SVG scatter and sparkline chart components"
```

---

## Task 6: Finding Support Components

`FindingCard` for archive grids and related-findings blocks. `FindingCitation` for the fake APA block on the finding detail page. `InstituteSeal` for the circular crest mark.

**Files:**
- Create: `src/components/ui/pointlessmetrics/FindingCard.tsx`
- Create: `src/components/ui/pointlessmetrics/FindingCitation.tsx`
- Create: `src/components/ui/pointlessmetrics/InstituteSeal.tsx`

- [ ] **Step 1: `FindingCard`**

Create `src/components/ui/pointlessmetrics/FindingCard.tsx`:

```typescript
import Link from "next/link"
import type { Finding } from "@/sites/pointlessmetrics/data/findings"
import { getLeaderByPerson } from "@/sites/pointlessmetrics/data/leadership"
import { CorrelationSparkline } from "./CorrelationSparkline"

interface FindingCardProps {
  finding: Finding
}

export function FindingCard({ finding }: FindingCardProps) {
  const pi = getLeaderByPerson(finding.principalInvestigator)
  const rClass = finding.rValue < 0 ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
  return (
    <Link
      href={`/findings/${finding.slug}`}
      className="block bg-white border border-accent/40 rounded-sm p-4 hover:border-primary/60 transition-colors"
    >
      <div className="mb-3">
        <CorrelationSparkline points={finding.chartData} rValue={finding.rValue} />
      </div>
      <div className="flex items-center gap-2 mb-2 text-[11px]">
        <span className={`px-2 py-0.5 rounded-sm tabular-nums font-semibold ${rClass}`}>r = {finding.rValue.toFixed(2)}</span>
        <span className="px-2 py-0.5 rounded-sm bg-accent/20 text-foreground/80 tabular-nums">n = {finding.sampleSize.toLocaleString()}</span>
        <span className="ml-auto uppercase tracking-wide text-foreground/60">{finding.category}</span>
      </div>
      <h3 className="font-heading text-base leading-snug text-primary">{finding.title}</h3>
      {pi && <p className="mt-2 text-xs text-foreground/60">{pi.name} · Published {finding.publishedDate}</p>}
    </Link>
  )
}
```

- [ ] **Step 2: `FindingCitation`**

Create `src/components/ui/pointlessmetrics/FindingCitation.tsx`:

```typescript
import type { Finding } from "@/sites/pointlessmetrics/data/findings"
import { getLeaderByPerson } from "@/sites/pointlessmetrics/data/leadership"

interface FindingCitationProps {
  finding: Finding
}

export function FindingCitation({ finding }: FindingCitationProps) {
  const pi = getLeaderByPerson(finding.principalInvestigator)
  const year = finding.publishedDate.slice(0, 4)
  const lastFirst = pi ? toLastFirstInitials(pi.name) : "Institute, I."
  return (
    <div className="bg-white border border-accent/40 p-4 rounded-sm">
      <h4 className="text-xs uppercase tracking-wide text-foreground/60 mb-2">Full citation</h4>
      <p className="text-sm leading-relaxed font-body">
        {lastFirst} ({year}). <em>{finding.title}</em>. Institute for the Study of Pointless Metrics. <span className="tabular-nums">r = {finding.rValue.toFixed(2)}, p {finding.pValue}, n = {finding.sampleSize.toLocaleString()}.</span>
      </p>
    </div>
  )
}

function toLastFirstInitials(full: string): string {
  const parts = full.replace(/^Dr\.\s+|^Dean\s+/, "").split(/\s+/)
  if (parts.length < 2) return full
  const last = parts[parts.length - 1]
  const initials = parts.slice(0, -1).map((p) => p[0] + ".").join(" ")
  return `${last}, ${initials}`
}
```

- [ ] **Step 3: `InstituteSeal`**

Create `src/components/ui/pointlessmetrics/InstituteSeal.tsx`:

```typescript
interface InstituteSealProps {
  size?: number
  className?: string
}

export function InstituteSeal({ size = 96, className }: InstituteSealProps) {
  const r = size / 2
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Institute for the Study of Pointless Metrics seal"
    >
      <defs>
        <path id="seal-circle" d={`M 50 50 m -36 0 a 36 36 0 1 1 72 0 a 36 36 0 1 1 -72 0`} fill="none" />
      </defs>
      <circle cx="50" cy="50" r="48" fill="var(--color-background)" stroke="var(--color-primary)" strokeWidth="1" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-primary)" strokeWidth="0.5" />
      <text fontSize="6" fill="var(--color-primary)" letterSpacing="1.2">
        <textPath href="#seal-circle" startOffset="0%">
          · INSTITUTE FOR THE STUDY OF POINTLESS METRICS · MENSURANDUM EST ·
        </textPath>
      </text>
      {/* Center motif: stylized sigma over a scatter-cross */}
      <g transform="translate(50 50)">
        <text textAnchor="middle" y="2" fontSize="18" fill="var(--color-primary)" fontFamily="serif">Σ</text>
        <circle cx="-8" cy="8" r="1.4" fill="var(--color-secondary)" />
        <circle cx="8" cy="10" r="1.4" fill="var(--color-secondary)" />
        <circle cx="0" cy="14" r="1.4" fill="var(--color-secondary)" />
        <line x1="-10" y1="16" x2="10" y2="6" stroke="var(--color-secondary)" strokeWidth="0.5" />
      </g>
      <text x="50" y="86" textAnchor="middle" fontSize="4" fill="var(--color-primary)" letterSpacing="0.5">EST. 2011</text>
    </svg>
  )
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/pointlessmetrics
git commit -m "feat(pointlessmetrics): add finding card, citation, and institute seal components"
```

---

## Task 7: Product & Dashboard Components

`ProductSpecsTable` for the specs block on product pages, `DashboardTile` for the home hero's Live Findings grid, `CategoryChip` for the findings filter chips.

**Files:**
- Create: `src/components/ui/pointlessmetrics/ProductSpecsTable.tsx`
- Create: `src/components/ui/pointlessmetrics/DashboardTile.tsx`
- Create: `src/components/ui/pointlessmetrics/CategoryChip.tsx`

- [ ] **Step 1: `ProductSpecsTable`**

Create `src/components/ui/pointlessmetrics/ProductSpecsTable.tsx`:

```typescript
import type { ProductSpec } from "@/sites/pointlessmetrics/data/products"

interface ProductSpecsTableProps {
  specs: ProductSpec[]
  title?: string
}

export function ProductSpecsTable({ specs, title = "Specifications" }: ProductSpecsTableProps) {
  return (
    <section>
      <h2 className="font-heading text-2xl text-primary mb-4">{title}</h2>
      <div className="bg-white border border-accent/40 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {specs.map((spec, i) => (
              <tr key={spec.label} className={i % 2 === 0 ? "bg-transparent" : "bg-accent/5"}>
                <th scope="row" className="text-left font-medium text-foreground/80 py-2 px-4 w-2/5 border-b border-accent/20">
                  {spec.label}
                </th>
                <td className="py-2 px-4 border-b border-accent/20 tabular-nums">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `DashboardTile`**

Create `src/components/ui/pointlessmetrics/DashboardTile.tsx`:

```typescript
import Link from "next/link"
import type { Finding } from "@/sites/pointlessmetrics/data/findings"
import { CorrelationSparkline } from "./CorrelationSparkline"

interface DashboardTileProps {
  finding: Finding
}

export function DashboardTile({ finding }: DashboardTileProps) {
  const rClass = finding.rValue < 0 ? "text-secondary" : "text-primary"
  return (
    <Link
      href={`/findings/${finding.slug}`}
      className="block bg-white border border-accent/40 rounded-sm p-4 hover:border-primary/60 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-heading text-sm leading-tight text-primary line-clamp-3">{finding.title}</h3>
        <span className={`shrink-0 text-[11px] tabular-nums font-semibold ${rClass}`}>r = {finding.rValue.toFixed(2)}</span>
      </div>
      <CorrelationSparkline points={finding.chartData} rValue={finding.rValue} />
      <div className="mt-2 flex items-center gap-2 text-[10px] text-foreground/60">
        <span className="uppercase tracking-wide">{finding.category}</span>
        <span>·</span>
        <span className="tabular-nums">n = {finding.sampleSize.toLocaleString()}</span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: `CategoryChip`**

Create `src/components/ui/pointlessmetrics/CategoryChip.tsx`:

```typescript
"use client"

interface CategoryChipProps {
  label: string
  active: boolean
  onClick: () => void
}

export function CategoryChip({ label, active, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-sm border transition-colors ${
        active
          ? "bg-primary text-white border-primary"
          : "bg-white text-foreground/80 border-accent/40 hover:border-primary/60"
      }`}
    >
      {label}
    </button>
  )
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/pointlessmetrics
git commit -m "feat(pointlessmetrics): add product specs, dashboard tile, category chip"
```

---

## Task 8: Home Page

Dashboard-style home: hero statement, 2×3 Live Findings grid, three revenue-stream CTA blocks, leadership strip, closing newsletter block.

**Files:**
- Modify: `src/sites/pointlessmetrics/index.ts` (wire the updated home page — no change needed if already wired in Task 1, but ensure imports still resolve)
- Rewrite: `src/sites/pointlessmetrics/pages/home.tsx`

- [ ] **Step 1: Rewrite the home page**

Replace `src/sites/pointlessmetrics/pages/home.tsx`:

```typescript
import Link from "next/link"
import Image from "next/image"
import { findings } from "@/sites/pointlessmetrics/data/findings"
import { featuredFindingSlugs, featuredProductSlugs } from "@/sites/pointlessmetrics/data/home-dashboard"
import { getProductBySlug } from "@/sites/pointlessmetrics/data/products"
import { leaders } from "@/sites/pointlessmetrics/data/leadership"
import { pressMentions } from "@/sites/pointlessmetrics/data/press-mentions"
import { DashboardTile } from "@/components/ui/pointlessmetrics/DashboardTile"
import { InstituteSeal } from "@/components/ui/pointlessmetrics/InstituteSeal"

export default function PointlessMetricsHome() {
  const featuredFindings = featuredFindingSlugs
    .map((s) => findings.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => !!f)
  const instrument = getProductBySlug(featuredProductSlugs.instrument)
  const publication = getProductBySlug(featuredProductSlugs.publication)
  const credential = getProductBySlug(featuredProductSlugs.credential)

  return (
    <main>
      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[auto_1fr] gap-10 items-center">
          <InstituteSeal size={160} />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-3">Established 2011</p>
            <h1 className="font-heading text-4xl md:text-6xl text-primary leading-tight">
              Institute for the Study of Pointless Metrics
            </h1>
            <p className="mt-5 text-lg text-foreground/80 max-w-2xl">
              Rigorous peer-reviewed research on the correlations that should not be. Instruments for quantifying the intangible. Credentialing for the next generation of practitioners.
            </p>
            <p className="mt-3 text-sm italic text-foreground/60">In data we overtrust.</p>
          </div>
        </div>
      </section>

      {/* Live Findings dashboard */}
      <section className="py-12 px-4 border-t border-accent/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-heading text-3xl text-primary">Live Findings</h2>
            <Link href="/findings" className="text-sm text-primary hover:underline">Browse the archive →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredFindings.map((f) => (
              <DashboardTile key={f.slug} finding={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Three revenue-stream CTAs */}
      <section className="py-16 px-4 border-t border-accent/30 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-8 text-center">Three ways to participate</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {instrument && (
              <CtaCard
                label="Buy an instrument"
                title={instrument.name}
                blurb={instrument.tagline}
                href={`/products/${instrument.slug}`}
                price={instrument.priceLabel}
              />
            )}
            {publication && (
              <CtaCard
                label="Read the report"
                title={publication.name}
                blurb={publication.tagline}
                href={`/products/${publication.slug}`}
                price={publication.priceLabel}
              />
            )}
            {credential && (
              <CtaCard
                label="Get certified"
                title={credential.name}
                blurb={credential.tagline}
                href={`/products/${credential.slug}`}
                price={credential.priceLabel}
              />
            )}
          </div>
        </div>
      </section>

      {/* Leadership strip */}
      <section className="py-16 px-4 border-t border-accent/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-8">Institute Leadership</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {leaders.map((l) => (
              <Link key={l.slug} href="/leadership" className="group">
                <div className="aspect-square relative overflow-hidden bg-accent/10 border border-accent/40 mb-3">
                  <Image src={l.portraitImage} alt={l.name} fill className="object-cover group-hover:scale-[1.02] transition-transform" sizes="(min-width: 768px) 25vw, 50vw" />
                </div>
                <h3 className="font-heading text-lg text-primary">{l.name}</h3>
                <p className="text-xs text-foreground/60">{l.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Press mentions */}
      <section className="py-12 px-4 border-t border-accent/30 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/60 mb-6 text-center">As referenced in</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {pressMentions.slice(0, 4).map((m) => (
              <blockquote key={m.publication} className="text-sm italic text-foreground/80 border-l-2 border-secondary pl-4">
                "{m.quote}"
                <footer className="mt-1 not-italic text-xs text-foreground/60">— {m.publication}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 border-t border-accent/30 bg-primary text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl mb-3">Subscribe to the Correlation Dispatch</h2>
          <p className="text-white/80 mb-6 text-sm">A weekly brief on new findings, upcoming cohorts, and quarterly report deadlines. No unsubscribe link (by design).</p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@institutional.email"
              className="flex-1 px-4 py-2 text-foreground bg-white rounded-sm"
            />
            <button type="submit" className="px-5 py-2 bg-secondary text-white rounded-sm font-semibold hover:opacity-90">Subscribe</button>
          </form>
          <p className="mt-4 text-[11px] text-white/50">Form does not transmit. Submissions are notional.</p>
        </div>
      </section>
    </main>
  )
}

interface CtaCardProps {
  label: string
  title: string
  blurb: string
  href: string
  price: string
}

function CtaCard({ label, title, blurb, href, price }: CtaCardProps) {
  return (
    <Link href={href} className="block border border-accent/40 rounded-sm p-6 bg-background hover:border-primary/60 transition-colors">
      <p className="text-xs uppercase tracking-[0.15em] text-secondary mb-3">{label}</p>
      <h3 className="font-heading text-xl text-primary mb-2">{title}</h3>
      <p className="text-sm text-foreground/70 mb-4">{blurb}</p>
      <p className="text-sm font-semibold text-primary tabular-nums">{price}</p>
    </Link>
  )
}
```

**Note on the form**: the inline `onSubmit={(e) => e.preventDefault()}` makes the homepage a client component implicitly. If lint or build complains, add `"use client"` at the top of the file.

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 3: Dev smoke test**

Run `npm run dev` and hit `localhost:3000/?site=pointlessmetrics`. Confirm the seal renders, the 6 Live Findings tiles render (sparklines visible), CTAs render, leaders grid renders (portraits may 404 until Task 20 — that's fine, the layout should still hold).

- [ ] **Step 4: Commit**

```bash
git add src/sites/pointlessmetrics/pages/home.tsx
git commit -m "feat(pointlessmetrics): build home dashboard page"
```

---

## Task 9: About Page

Institute history, theory of correlation, transparency block.

**Files:**
- Create: `src/sites/pointlessmetrics/pages/about.tsx`
- Modify: `src/sites/pointlessmetrics/index.ts` (wire route)

- [ ] **Step 1: Create about page**

Create `src/sites/pointlessmetrics/pages/about.tsx`:

```typescript
import type { PageMetadata } from "@/themes"
import Image from "next/image"
import { InstituteSeal } from "@/components/ui/pointlessmetrics/InstituteSeal"

export const metadata: PageMetadata = {
  title: "About the Institute — ISPM",
  description: "Founded in 2011, the Institute for the Study of Pointless Metrics publishes peer-reviewed findings, sells precision instruments, and credentials practitioners.",
}

export default function PointlessMetricsAbout() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-10">
          <InstituteSeal size={112} />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-1">About</p>
            <h1 className="font-heading text-4xl text-primary">The Institute</h1>
          </div>
        </div>

        <section className="prose prose-institutional max-w-none mb-12">
          <h2 className="font-heading text-2xl text-primary">Founding</h2>
          <p className="text-foreground/85">
            The Institute was founded in 2011 by Orrin Bletchley, a former McKinsey associate who, by his own admission, observed a correlation once and devoted the remainder of his professional life to the rest. Funding for the first three years came from a single unrestricted grant the source of which has since been lost to institutional memory.
          </p>
          <p className="text-foreground/85">
            The Institute is headquartered in a leased suite above a chartered accountant's office. It employs eleven full-time researchers, four adjunct faculty, a bookkeeper who does not wish to be named, and a golden retriever named Variable who appears in the wellness section of the quarterly transparency report.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-heading text-2xl text-primary mb-3">Theory of Correlation</h2>
          <p className="text-foreground/85 mb-3">
            The Institute holds that any two measurable phenomena are, in principle, correlable. Our research program does not concern itself with whether such correlations are causal, informative, or useful. We are interested in whether they exist.
          </p>
          <p className="text-foreground/85">
            We publish our findings unconditionally. We decline to editorialize. We leave interpretation to the practitioner — or, in the absence of one, to the reader's own intuition about what data is for.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-heading text-2xl text-primary mb-4">Our Three Pillars</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Measure", body: "If it is observable and non-zero, we will report on it." },
              { label: "Publish", body: "Fifty to sixty findings annually in the Quarterly Report and the Almanac." },
              { label: "Credential", body: "We certify practitioners through the fake peer-review process we designed ourselves." },
            ].map((p) => (
              <div key={p.label} className="bg-white border border-accent/40 p-4 rounded-sm">
                <h3 className="font-heading text-primary mb-1">{p.label}</h3>
                <p className="text-sm text-foreground/80">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-heading text-2xl text-primary mb-3">Transparency</h2>
          <p className="text-foreground/85 mb-3">
            The Institute publishes an annual transparency report summarizing revenue by stream (instruments, publications, advisory, credentialing, merchandise), operating expenses, and a narrative account of funding sources the Institute does not recall accepting but cannot rule out having deposited.
          </p>
          <p className="text-foreground/85 italic text-sm">
            The 2025 transparency report is currently embargoed pending an internal review of the review process.
          </p>
        </section>

        <aside className="relative bg-white border border-accent/40 p-6 rounded-sm">
          <h3 className="font-heading text-primary text-lg mb-2">Institutional Disclosure</h3>
          <p className="text-sm text-foreground/75 mb-1">
            ISPM is a for-profit research institute. It is not a 501(c)(3). Donations, if accidentally made, will be treated as subscriptions to the Quarterly Report and backfilled to the previous fiscal year.
          </p>
        </aside>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire the route in the barrel**

Modify `src/sites/pointlessmetrics/index.ts`. Add the import and map entry:

```typescript
import PointlessMetricsAbout, { metadata as aboutMetadata } from "./pages/about"
```

Inside `pages`:

```typescript
  "about": { component: PointlessMetricsAbout, metadata: aboutMetadata },
```

- [ ] **Step 3: Verify & smoke test**

```bash
npx tsc --noEmit && npm run lint
```

Dev: `localhost:3000/about?site=pointlessmetrics` — should render.

- [ ] **Step 4: Commit**

```bash
git add src/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): add about page"
```

---

## Task 10: Methodology Page

Lampoon of research rigor. Sections: "How We Establish Significance," "Our Peer Review Process," "Disclosure of Funding," "Glossary of Terms We Invented."

**Files:**
- Create: `src/sites/pointlessmetrics/pages/methodology.tsx`
- Modify: `src/sites/pointlessmetrics/index.ts`

- [ ] **Step 1: Create methodology page**

Create `src/sites/pointlessmetrics/pages/methodology.tsx`:

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Methodology — ISPM",
  description: "How the Institute establishes significance, conducts peer review, discloses funding, and defines terms it has invented.",
}

const glossary: { term: string; definition: string }[] = [
  { term: "Synergy density", definition: "The notional concentration of cooperative potential in a bounded meeting space, expressed in vibe-units per cubic meter." },
  { term: "Vibe", definition: "A unit of perceived atmosphere. Directional; not directly addable." },
  { term: "Alignment", definition: "The degree to which two or more stated objectives are, in principle, not in open conflict." },
  { term: "Personal brand alignment", definition: "A measure of coherence between an individual's self-described professional identity and their observable Slack emoji usage." },
  { term: "Resonance", definition: "A cross-sectional average of vibe readings sampled at 40 Hz. Not to be confused with signal." },
  { term: "Gravitas", definition: "A non-linear unit of institutional presence. Measured using the Pocket Ruler for Intangibles (Model 3)." },
  { term: "Correlation", definition: "A measurable relationship between two variables. Causation neither implied nor discouraged." },
]

export default function PointlessMetricsMethodology() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Research Practice</p>
        <h1 className="font-heading text-4xl text-primary mb-2">Methodology</h1>
        <p className="text-foreground/70 mb-10 italic text-sm">Version 4.2 — adopted by the Institute's internal committee on 2025-11-03.</p>

        <section className="mb-10">
          <h2 className="font-heading text-2xl text-primary mb-3">§1 — How We Establish Significance</h2>
          <p className="text-foreground/85 mb-3">
            A finding is considered significant when (a) the measured r-value falls outside the interval [-0.70, 0.70], (b) the sample size exceeds seventy-five, and (c) at least one member of the principal research team believes the result to be interesting. Condition (c) is not waivable.
          </p>
          <p className="text-foreground/85">
            The Institute reports p-values in three categorical bins: <span className="tabular-nums">p &lt; 0.05</span>, <span className="tabular-nums">p &lt; 0.01</span>, and <span className="tabular-nums">p &lt; 0.001</span>. More precise values are not useful to the practitioner and are therefore not disclosed.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-2xl text-primary mb-3">§2 — Peer Review</h2>
          <p className="text-foreground/85 mb-3">
            All Institute findings undergo peer review by the Institute's internal review board, which consists of the four members of the Institute's leadership. Each submission is reviewed by two of the four, selected on a rotating basis. Conflicts of interest are managed through a gentleman's agreement.
          </p>
          <p className="text-foreground/85">
            The Institute does not publish rejected findings. This should not be read as an implication that such findings exist.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-2xl text-primary mb-3">§3 — Disclosure of Funding</h2>
          <p className="text-foreground/85 mb-3">
            Every finding carries a funding disclosure of the Institute's own composition. Disclosures are reviewed for accuracy against the Institute's memory of events, which is acknowledged to be imperfect.
          </p>
          <p className="text-foreground/85">
            Findings funded by organizations that requested a specific outcome are flagged as such in the disclosure line, where the requested outcome is also noted.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-2xl text-primary mb-3">§4 — Glossary of Terms We Invented</h2>
          <div className="bg-white border border-accent/40 rounded-sm overflow-hidden">
            <dl>
              {glossary.map((g, i) => (
                <div key={g.term} className={`grid grid-cols-[180px_1fr] gap-4 p-4 ${i !== glossary.length - 1 ? "border-b border-accent/20" : ""}`}>
                  <dt className="font-semibold text-primary text-sm">{g.term}</dt>
                  <dd className="text-sm text-foreground/85">{g.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <p className="text-xs text-foreground/60 italic border-t border-accent/30 pt-6">
          This document is the Institute's position on methodology as of the version noted above. It is revised annually, or when the Institute notices it has changed its mind.
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire the route in the barrel**

Modify `src/sites/pointlessmetrics/index.ts`:

```typescript
import PointlessMetricsMethodology, { metadata as methodologyMetadata } from "./pages/methodology"
```

Inside `pages`:

```typescript
  "methodology": { component: PointlessMetricsMethodology, metadata: methodologyMetadata },
```

- [ ] **Step 3: Verify & smoke test**

```bash
npx tsc --noEmit && npm run lint
```

Dev: `localhost:3000/methodology?site=pointlessmetrics`.

- [ ] **Step 4: Commit**

```bash
git add src/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): add methodology page"
```

---

## Task 11: Shop Page

Commerce index grouped into five category sections. Each SKU shown as a card with price, pitch, and Add-to-Cart.

**Files:**
- Create: `src/sites/pointlessmetrics/pages/shop.tsx`
- Modify: `src/sites/pointlessmetrics/index.ts`

- [ ] **Step 1: Create shop page**

Create `src/sites/pointlessmetrics/pages/shop.tsx`:

```typescript
import type { PageMetadata } from "@/themes"
import Link from "next/link"
import Image from "next/image"
import { products, getProductsByCategory } from "@/sites/pointlessmetrics/data/products"
import { shopCategories } from "@/sites/pointlessmetrics/data/categories"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export const metadata: PageMetadata = {
  title: "Shop — Institute for the Study of Pointless Metrics",
  description: "Twelve Institute-issued products across five categories: instruments, publications, advisory engagements, credentialing, and certified merchandise.",
}

export default function PointlessMetricsShop() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Institute Store</p>
        <h1 className="font-heading text-4xl text-primary mb-2">All Products</h1>
        <p className="text-foreground/75 max-w-2xl mb-12">
          Twelve products, five categories. Every item is issued by the Institute and bears the seal. Availability and pricing reflect the current operating plan.
        </p>

        {shopCategories.map((cat) => {
          const catProducts = getProductsByCategory(cat.key)
          if (catProducts.length === 0) return null
          return (
            <section key={cat.key} id={cat.key} className="mb-16 scroll-mt-28">
              <div className="flex items-baseline gap-4 border-b border-accent/40 pb-3 mb-6">
                <h2 className="font-heading text-2xl text-primary">{cat.label}</h2>
                <p className="text-sm text-foreground/60 italic">{cat.blurb}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProducts.map((p) => (
                  <article key={p.slug} className="bg-white border border-accent/40 rounded-sm overflow-hidden flex flex-col">
                    <Link href={`/products/${p.slug}`} className="block aspect-[4/3] relative bg-accent/10">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    </Link>
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-[11px] uppercase tracking-wide text-foreground/50 mb-1">{p.designation}</p>
                      <h3 className="font-heading text-lg text-primary mb-1">
                        <Link href={`/products/${p.slug}`} className="hover:underline">{p.name}</Link>
                      </h3>
                      <p className="text-sm text-foreground/75 mb-4 flex-1">{p.tagline}</p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-base font-semibold text-primary tabular-nums">{p.priceLabel}</span>
                        <AddToCartButton slug={p.slug} productName={p.name} className="px-4 py-2 bg-primary text-white rounded-sm text-sm font-semibold hover:opacity-90" quips={quipsForCategory(p.categoryKey)} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
        })}

        <p className="text-center text-xs text-foreground/60 italic mt-10">
          Total catalog: {products.length} products. Any item not shown is currently embargoed pending review.
        </p>
      </div>
    </main>
  )
}

function quipsForCategory(key: string): string[] {
  switch (key) {
    case "instruments":
      return ["Calibration card included.", "Ships in a velvet case.", "The seal is genuine.", "No returns after calibration."]
    case "publications":
      return ["A rigorous read.", "Cited by the Institute.", "Not reviewed externally.", "Delivery is notional."]
    case "advisory":
      return ["We will be in touch.", "An engagement letter follows.", "NDA will be drafted by us.", "Results are not actionable."]
    case "credentialing":
      return ["Welcome, candidate.", "Syllabus ships separately.", "Bronze pin included.", "Not accredited."]
    case "merchandise":
      return ["A durable memento.", "The r-value is assigned on shipment.", "Packaged without irony."]
    default:
      return []
  }
}
```

- [ ] **Step 2: Wire the route**

Modify `src/sites/pointlessmetrics/index.ts`:

```typescript
import PointlessMetricsShop, { metadata as shopMetadata } from "./pages/shop"
```

Inside `pages`:

```typescript
  "shop": { component: PointlessMetricsShop, metadata: shopMetadata },
```

- [ ] **Step 3: Verify & smoke test**

```bash
npx tsc --noEmit && npm run lint
```

Dev: `localhost:3000/shop?site=pointlessmetrics`. Click each Add-to-Cart; toast should appear, cart badge should update.

- [ ] **Step 4: Commit**

```bash
git add src/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): add shop page with 5 category sections"
```

---

## Task 12: Product Detail Page

Single template with three category-specific overrides (credentialing → curriculum & faculty; advisory → engagement scope & deliverables; quarterly-report → past issues).

**Files:**
- Create: `src/sites/pointlessmetrics/pages/product-detail.tsx`
- Modify: `src/sites/pointlessmetrics/index.ts` (wire dynamicRoutes)

- [ ] **Step 1: Create product detail component**

Create `src/sites/pointlessmetrics/pages/product-detail.tsx`:

```typescript
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/sites/pointlessmetrics/data/products"
import type { Product } from "@/sites/pointlessmetrics/data/products"
import { getFindingBySlug } from "@/sites/pointlessmetrics/data/findings"
import { leaders } from "@/sites/pointlessmetrics/data/leadership"
import { portraits } from "@/data/testimonial-portraits"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { FindingCard } from "@/components/ui/pointlessmetrics/FindingCard"
import { ProductSpecsTable } from "@/components/ui/pointlessmetrics/ProductSpecsTable"

interface ProductDetailProps {
  slug: string
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const citedFindings = product.citedFindingSlugs
    .map((s) => getFindingBySlug(s))
    .filter((f): f is NonNullable<typeof f> => !!f)

  const related = product.relatedProductSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => !!p)

  const testimonialPortraits = product.testimonialPortraitSlugs
    ?.map((pslug) => portraits.find((pp) => pp.slug === pslug))
    .filter((p): p is NonNullable<typeof p> => !!p) ?? []

  return (
    <main className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <section className="grid md:grid-cols-[5fr_4fr] gap-10 mb-16">
          <div className="aspect-[4/3] relative bg-white border border-accent/40 rounded-sm overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 768px) 55vw, 100vw" priority />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-1">{product.designation}</p>
            <h1 className="font-heading text-4xl text-primary mb-3">{product.name}</h1>
            <p className="text-lg text-foreground/80 mb-4">{product.tagline}</p>
            <div className="space-y-3 text-foreground/85 mb-6">
              {product.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-primary tabular-nums">{product.priceLabel}</span>
              <AddToCartButton slug={product.slug} productName={product.name} />
            </div>
          </div>
        </section>

        {/* What it measures */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl text-primary mb-3">What It Measures</h2>
          <p className="text-foreground/85 max-w-3xl">{product.whatItMeasures}</p>
        </section>

        {/* Category-specific body block */}
        <section className="mb-12">
          {product.categoryKey === "credentialing" && product.curriculum ? (
            <>
              <h2 className="font-heading text-2xl text-primary mb-4">Curriculum</h2>
              <ol className="space-y-3 mb-10">
                {product.curriculum.map((w) => (
                  <li key={w.week} className="flex gap-4 bg-white border border-accent/40 rounded-sm p-4">
                    <span className="font-heading text-2xl text-primary tabular-nums w-12 shrink-0">{w.week}</span>
                    <div>
                      <h3 className="font-semibold text-primary">{w.title}</h3>
                      <p className="text-sm text-foreground/80">{w.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <h2 className="font-heading text-2xl text-primary mb-4">Faculty</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {leaders.map((l) => (
                  <div key={l.slug} className="bg-white border border-accent/40 p-4 rounded-sm flex gap-4">
                    <div className="w-20 h-20 relative shrink-0 bg-accent/10">
                      <Image src={l.portraitImage} alt={l.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{l.name}</h3>
                      <p className="text-xs text-foreground/60">{l.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <aside className="bg-background border border-accent/40 rounded-sm p-4 text-sm text-foreground/75 italic">
                <strong className="text-primary not-italic">Accreditation disclosure:</strong> The Certified Pointless Metrics Practitioner™ credential is not accredited by any external body. Credits do not transfer. The credential may, however, be listed on a résumé without contradiction.
              </aside>
            </>
          ) : product.categoryKey === "advisory" ? (
            <div className="grid md:grid-cols-2 gap-8">
              {product.engagementScope && (
                <div>
                  <h2 className="font-heading text-2xl text-primary mb-3">Engagement Scope</h2>
                  <ul className="space-y-2 text-foreground/85">
                    {product.engagementScope.map((s, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-secondary shrink-0">·</span><span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.deliverables && (
                <div>
                  <h2 className="font-heading text-2xl text-primary mb-3">Deliverables</h2>
                  <ul className="space-y-2 text-foreground/85">
                    {product.deliverables.map((d, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-secondary shrink-0">·</span><span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <ProductSpecsTable specs={product.specs} />
          )}
        </section>

        {/* Cited findings */}
        {citedFindings.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading text-2xl text-primary mb-4">Cited Findings</h2>
            <p className="text-sm text-foreground/70 mb-4">Peer-reviewed evidence supporting this product's operating premise.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {citedFindings.map((f) => (
                <FindingCard key={f.slug} finding={f} />
              ))}
            </div>
          </section>
        )}

        {/* Methodology note */}
        <section className="mb-12 bg-white border border-accent/40 rounded-sm p-6">
          <h2 className="font-heading text-xl text-primary mb-2">A Note on Methodology</h2>
          <p className="text-sm text-foreground/80 italic">{product.methodologyNote}</p>
        </section>

        {/* Past issues — quarterly-report only */}
        {product.pastIssues && product.pastIssues.length > 0 ? (
          <section className="mb-12">
            <h2 className="font-heading text-2xl text-primary mb-4">Past Issues</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {product.pastIssues.map((issue) => (
                <div key={issue.label} className="aspect-[3/4] bg-primary text-white p-4 flex flex-col justify-between rounded-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider opacity-70">{issue.label}</p>
                    <h3 className="font-heading text-sm mt-2 leading-snug">{issue.title}</h3>
                  </div>
                  <p className="text-[9px] uppercase tracking-widest opacity-60">Institute Publication</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Testimonials — for everything except quarterly-report */
          testimonialPortraits.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading text-2xl text-primary mb-4">Practitioner Voices</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {testimonialPortraits.map((p) => (
                  <figure key={p.slug} className="bg-white border border-accent/40 rounded-sm p-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden bg-accent/10 mb-3">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <blockquote className="text-sm text-foreground/80 italic mb-2">
                      "{testimonialQuoteFor(product.slug, p.slug)}"
                    </blockquote>
                    <figcaption className="text-xs text-foreground/60 not-italic">{p.name}, {p.role}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )
        )}

        {/* Related products */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading text-2xl text-primary mb-4">Related from the Institute</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/products/${r.slug}`} className="block bg-white border border-accent/40 rounded-sm p-4 hover:border-primary/60 transition-colors">
                  <p className="text-[10px] uppercase tracking-wide text-foreground/50 mb-1">{r.designation}</p>
                  <h3 className="font-heading text-primary mb-1">{r.name}</h3>
                  <p className="text-xs text-foreground/70 mb-2">{r.tagline}</p>
                  <p className="text-sm font-semibold text-primary tabular-nums">{r.priceLabel}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

// Deterministic quote selection: product slug + portrait slug → a stable entry
// from a small bank. Kept local to this page to avoid spinning up a data file
// just for product testimonial strings.
function testimonialQuoteFor(productSlug: string, portraitSlug: string): string {
  const bank = [
    "The readings were conclusive, though their meaning remains unclear.",
    "It measures precisely what we suspected it would.",
    "I have a number now. That is more than I had before.",
    "We have incorporated the finding into our roadmap. We will not act on it.",
    "It arrived pre-calibrated. The certificate is suitable for framing.",
    "The practitioners were rigorous. I cannot fault the rigor.",
    "My data is now Institute-grade. My decisions remain entirely my own.",
    "A colleague noticed the pin. It was a productive conversation.",
  ]
  const seed = (productSlug + ":" + portraitSlug).split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  return bank[seed % bank.length]
}
```

- [ ] **Step 2: Wire the dynamic route**

Modify `src/sites/pointlessmetrics/index.ts`. Add imports and a `dynamicRoutes` export (creating the export if it doesn't exist yet):

```typescript
import type { DynamicRoute } from "@/themes"
import ProductDetail from "./pages/product-detail"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
```

Append to the file:

```typescript
export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — ISPM`,
            description: p.tagline,
            ogImage: p.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Shop",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "pointlessmetrics",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: Array.isArray(p.description) ? p.description.join(" ") : p.description,
          tagline: p.tagline,
          image: p.image,
          price: p.price,
        },
        config.name
      )
    },
  },
}
```

- [ ] **Step 3: Verify & smoke test**

```bash
npx tsc --noEmit && npm run lint
```

Dev smoke tests — hit at least one product per template branch:
- `localhost:3000/products/vibe-ring?site=pointlessmetrics` (instrument — Specs table branch)
- `localhost:3000/products/certified-practitioner?site=pointlessmetrics` (Curriculum + Faculty branch)
- `localhost:3000/products/kpi-vibe-audit?site=pointlessmetrics` (Engagement Scope + Deliverables branch)
- `localhost:3000/products/quarterly-report?site=pointlessmetrics` (Past Issues branch)

- [ ] **Step 4: Commit**

```bash
git add src/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): add product detail page with category overrides"
```

---

## Task 13: Findings Archive Page

Filter + sort UI over the 24 findings.

**Files:**
- Create: `src/sites/pointlessmetrics/pages/findings.tsx`
- Modify: `src/sites/pointlessmetrics/index.ts`

- [ ] **Step 1: Create findings archive page**

Create `src/sites/pointlessmetrics/pages/findings.tsx`:

```typescript
"use client"

import { useState, useMemo } from "react"
import { findings } from "@/sites/pointlessmetrics/data/findings"
import type { FindingCategoryKey } from "@/sites/pointlessmetrics/data/categories"
import { findingCategories } from "@/sites/pointlessmetrics/data/categories"
import { FindingCard } from "@/components/ui/pointlessmetrics/FindingCard"
import { CategoryChip } from "@/components/ui/pointlessmetrics/CategoryChip"

type SortKey = "recent" | "highest-r" | "largest-n" | "most-cited"

export default function PointlessMetricsFindings() {
  const [category, setCategory] = useState<"all" | FindingCategoryKey>("all")
  const [sort, setSort] = useState<SortKey>("recent")

  const visible = useMemo(() => {
    const filtered = category === "all" ? findings.slice() : findings.filter((f) => f.category === category)
    switch (sort) {
      case "recent":
        return filtered.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
      case "highest-r":
        return filtered.sort((a, b) => Math.abs(b.rValue) - Math.abs(a.rValue))
      case "largest-n":
        return filtered.sort((a, b) => b.sampleSize - a.sampleSize)
      case "most-cited":
        return filtered.sort((a, b) => b.citedByProducts.length - a.citedByProducts.length)
      default:
        return filtered
    }
  }, [category, sort])

  return (
    <main className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Research</p>
        <h1 className="font-heading text-4xl text-primary mb-2">Findings Archive</h1>
        <p className="text-foreground/75 max-w-3xl mb-8">
          The Institute's peer-reviewed findings, in full. All {findings.length} entries. Use the filters to navigate by category, r-value, sample size, or citation frequency.
        </p>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-y border-accent/40 py-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <CategoryChip label="All" active={category === "all"} onClick={() => setCategory("all")} />
            {findingCategories.map((c) => (
              <CategoryChip key={c.key} label={c.label} active={category === c.key} onClick={() => setCategory(c.key)} />
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-foreground/70">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-white border border-accent/40 rounded-sm px-2 py-1 text-sm"
            >
              <option value="recent">Most recent</option>
              <option value="highest-r">Highest |r|</option>
              <option value="largest-n">Largest n</option>
              <option value="most-cited">Most cited</option>
            </select>
          </label>
        </div>

        <p className="text-xs text-foreground/60 mb-4 tabular-nums">Showing {visible.length} of {findings.length} findings.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((f) => (
            <FindingCard key={f.slug} finding={f} />
          ))}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire the route**

Modify `src/sites/pointlessmetrics/index.ts`:

```typescript
import PointlessMetricsFindings from "./pages/findings"
```

Inside `pages`:

```typescript
  "findings": {
    component: PointlessMetricsFindings,
    metadata: {
      title: "Findings Archive — ISPM",
      description: "All 24 peer-reviewed findings from the Institute for the Study of Pointless Metrics.",
    },
  },
```

- [ ] **Step 3: Verify & smoke test**

```bash
npx tsc --noEmit && npm run lint
```

Dev: `localhost:3000/findings?site=pointlessmetrics`. Toggle chips and sort — list should update.

- [ ] **Step 4: Commit**

```bash
git add src/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): add findings archive with filter and sort"
```

---

## Task 14: Finding Detail Page

Individual study page — full scatter chart, claim, methodology, caveats, funding, cited-by products, APA citation.

**Files:**
- Create: `src/sites/pointlessmetrics/pages/finding-detail.tsx`
- Modify: `src/sites/pointlessmetrics/index.ts`

- [ ] **Step 1: Create finding detail component**

Create `src/sites/pointlessmetrics/pages/finding-detail.tsx`:

```typescript
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getFindingBySlug } from "@/sites/pointlessmetrics/data/findings"
import { getLeaderByPerson } from "@/sites/pointlessmetrics/data/leadership"
import { getProductBySlug } from "@/sites/pointlessmetrics/data/products"
import { CorrelationScatter } from "@/components/ui/pointlessmetrics/CorrelationScatter"
import { FindingCitation } from "@/components/ui/pointlessmetrics/FindingCitation"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

interface FindingDetailProps {
  slug: string
}

export default function FindingDetail({ slug }: FindingDetailProps) {
  const finding = getFindingBySlug(slug)
  if (!finding) notFound()

  const pi = getLeaderByPerson(finding.principalInvestigator)
  const citedProducts = finding.citedByProducts
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => !!p)

  return (
    <main className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-3">
          <span className="mr-2">{finding.category}</span>·<span className="ml-2">Published {finding.publishedDate}</span>
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary mb-4 leading-tight">{finding.title}</h1>
        {pi && (
          <p className="text-sm text-foreground/70 mb-10">
            Principal investigator: <Link href="/leadership" className="underline hover:text-primary">{pi.name}</Link>, {pi.title}.
          </p>
        )}

        <div className="mb-10">
          <CorrelationScatter
            points={finding.chartData}
            xLabel={finding.xAxis.label}
            yLabel={finding.yAxis.label}
            xUnits={finding.xAxis.units}
            yUnits={finding.yAxis.units}
            rValue={finding.rValue}
            pValue={finding.pValue}
            sampleSize={finding.sampleSize}
            figureNumber={1}
          />
        </div>

        <blockquote className="font-heading text-2xl text-primary border-l-4 border-secondary pl-5 py-1 mb-10">
          {finding.claim}
        </blockquote>

        <section className="mb-10">
          <h2 className="font-heading text-xl text-primary mb-2">Methodology</h2>
          <p className="text-foreground/85">{finding.methodology}</p>
        </section>

        <aside className="bg-white border border-accent/40 rounded-sm p-5 mb-10">
          <h2 className="text-xs uppercase tracking-wide text-foreground/60 mb-2">Limitations of this study</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/85">
            {finding.caveats.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </aside>

        <p className="text-xs italic text-foreground/65 mb-10">
          <strong className="not-italic text-foreground/80">Funding disclosure: </strong>{finding.funding}
        </p>

        {citedProducts.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading text-xl text-primary mb-4">Instruments cited in this study</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {citedProducts.map((p) => (
                <article key={p.slug} className="bg-white border border-accent/40 rounded-sm p-4 flex gap-4">
                  <Link href={`/products/${p.slug}`} className="block w-24 h-24 relative shrink-0 bg-accent/10">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="96px" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-foreground/50">{p.designation}</p>
                    <h3 className="font-heading text-primary">
                      <Link href={`/products/${p.slug}`} className="hover:underline">{p.name}</Link>
                    </h3>
                    <p className="text-sm font-semibold text-primary tabular-nums mb-2">{p.priceLabel}</p>
                    <AddToCartButton slug={p.slug} productName={p.name} className="text-xs px-3 py-1.5 bg-primary text-white rounded-sm font-semibold hover:opacity-90" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <FindingCitation finding={finding} />

        <div className="mt-10">
          <Link href="/findings" className="text-sm text-primary hover:underline">← Back to Findings Archive</Link>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire the dynamic route**

Modify `src/sites/pointlessmetrics/index.ts` — add the import:

```typescript
import FindingDetail from "./pages/finding-detail"
import { getFindingBySlug } from "./data/findings"
```

Extend `dynamicRoutes`:

```typescript
  findings: {
    component: FindingDetail,
    getMetadata: (slug: string) => {
      const f = getFindingBySlug(slug)
      return f
        ? {
            title: `${f.title} — ISPM Finding`,
            description: f.claim,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getFindingBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getFindingBySlug(slug)?.title,
    breadcrumbSectionLabel: "Findings",
  },
```

- [ ] **Step 3: Verify & smoke test**

```bash
npx tsc --noEmit && npm run lint
```

Dev: `localhost:3000/findings/alignment-in-okrs-inverse?site=pointlessmetrics`. Chart should render with regression line; citation block at the bottom.

- [ ] **Step 4: Commit**

```bash
git add src/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): add finding detail page with full chart and citation"
```

---

## Task 15: Leadership Page

Standard leadership grid. Uses shared `TeamMember` / `leader-card` patterns if present, otherwise inline.

**Files:**
- Create: `src/sites/pointlessmetrics/pages/leadership.tsx`
- Modify: `src/sites/pointlessmetrics/index.ts`

- [ ] **Step 1: Create leadership page**

Create `src/sites/pointlessmetrics/pages/leadership.tsx`:

```typescript
import type { PageMetadata } from "@/themes"
import Image from "next/image"
import Link from "next/link"
import { leaders } from "@/sites/pointlessmetrics/data/leadership"
import { getFindingsByInvestigator } from "@/sites/pointlessmetrics/data/findings"

export const metadata: PageMetadata = {
  title: "Leadership — Institute for the Study of Pointless Metrics",
  description: "The four members of the Institute's leadership — Founder, Chief Research Officer, Director of Advisory Services, and Dean of the Practitioner Program.",
}

export default function PointlessMetricsLeadership() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">The Institute</p>
        <h1 className="font-heading text-4xl text-primary mb-2">Leadership</h1>
        <p className="text-foreground/75 max-w-3xl mb-12">
          Four individuals, collectively responsible for the Institute's research agenda, credentialing, advisory practice, and reputation.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {leaders.map((l) => {
            const count = getFindingsByInvestigator(l.person).length
            return (
              <article key={l.slug} className="bg-white border border-accent/40 rounded-sm overflow-hidden">
                <div className="aspect-[4/5] relative bg-accent/10">
                  <Image src={l.portraitImage} alt={l.name} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-2xl text-primary">{l.name}</h2>
                  <p className="text-sm text-secondary mb-4">{l.title}</p>
                  <p className="text-foreground/85 mb-4">{l.bio}</p>
                  <p className="text-xs text-foreground/60 tabular-nums">
                    Principal investigator on {count} published finding{count === 1 ? "" : "s"}.{" "}
                    <Link href="/findings" className="underline hover:text-primary">View the archive →</Link>
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire the route**

Modify `src/sites/pointlessmetrics/index.ts`:

```typescript
import PointlessMetricsLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
```

```typescript
  "leadership": { component: PointlessMetricsLeadership, metadata: leadershipMetadata },
```

- [ ] **Step 3: Verify & smoke test**

```bash
npx tsc --noEmit && npm run lint
```

Dev: `localhost:3000/leadership?site=pointlessmetrics`.

- [ ] **Step 4: Commit**

```bash
git add src/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): add leadership page"
```

---

## Task 16: Contact Page

Satirical "File an observation" form. Real email in small print.

**Files:**
- Create: `src/sites/pointlessmetrics/pages/contact.tsx`
- Modify: `src/sites/pointlessmetrics/index.ts`

- [ ] **Step 1: Create contact page**

Create `src/sites/pointlessmetrics/pages/contact.tsx`:

```typescript
"use client"

import type { PageMetadata } from "@/themes"
import { useState } from "react"

export const metadata: PageMetadata = {
  title: "Contact — Institute for the Study of Pointless Metrics",
  description: "File an observation with the Institute. Submissions are reviewed on the first Thursday of every quarter.",
}

export default function PointlessMetricsContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Institute Correspondence</p>
        <h1 className="font-heading text-4xl text-primary mb-3">File an Observation</h1>
        <p className="text-foreground/75 mb-10">
          The Institute accepts observations year-round and reviews them on the first Thursday of every quarter. Submissions are processed in the order received. Most are not acted upon.
        </p>

        {submitted ? (
          <div className="bg-white border border-primary/60 rounded-sm p-6">
            <h2 className="font-heading text-xl text-primary mb-2">Observation received</h2>
            <p className="text-sm text-foreground/80">
              Thank you. Your observation has been logged against a notional correlation index. A follow-up is unlikely.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="bg-white border border-accent/40 rounded-sm p-6 space-y-5"
          >
            <Field label="Observer name" name="observer" placeholder="Your legal name, as appears on prior credentials" />
            <Field label="Institutional email" name="email" type="email" placeholder="you@institution.tld" />
            <Field label="Observed phenomenon" name="phenomenon" placeholder="e.g., an unusually high rate of 'ecosystem' usage at standing desks" />
            <Field label="Hypothesized correlation" name="hypothesis" placeholder="If A, then B — with estimated direction" />
            <Field label="Estimated r-value" name="r" placeholder="−1.00 to 1.00" />
            <Field label="Funding source" name="funding" placeholder="Self, institutional, or unnamed" />
            <button type="submit" className="px-5 py-2 bg-primary text-white rounded-sm font-semibold hover:opacity-90">
              File observation
            </button>
          </form>
        )}

        <p className="mt-10 text-[11px] text-foreground/55 text-center">
          For matters requiring human review, correspondence may be directed to{" "}
          <a href="mailto:bsambrone@gmail.com" className="underline">bsambrone@gmail.com</a>.
        </p>
      </div>
    </main>
  )
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-foreground/85 mb-1">{label}</span>
      <input type={type} name={name} placeholder={placeholder} className="w-full px-3 py-2 border border-accent/50 rounded-sm bg-background focus:border-primary focus:outline-none" />
    </label>
  )
}
```

- [ ] **Step 2: Wire the route**

Modify `src/sites/pointlessmetrics/index.ts`:

```typescript
import PointlessMetricsContact, { metadata as contactMetadata } from "./pages/contact"
```

```typescript
  "contact": { component: PointlessMetricsContact, metadata: contactMetadata },
```

- [ ] **Step 3: Verify & smoke test**

```bash
npx tsc --noEmit && npm run lint
```

Dev: `localhost:3000/contact?site=pointlessmetrics`. Submit the form — should show confirmation block.

- [ ] **Step 4: Commit**

```bash
git add src/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): add contact page"
```

---

## Task 17: Privacy + Terms Pages

Both follow the two-layer pattern (umbrella callout + satirical sections). Bundled into one task since they share structure.

**Files:**
- Create: `src/sites/pointlessmetrics/pages/privacy.tsx`
- Create: `src/sites/pointlessmetrics/pages/terms.tsx`
- Modify: `src/sites/pointlessmetrics/index.ts`

- [ ] **Step 1: Reference an existing umbrella callout shape**

Read `src/sites/pigmilk/pages/privacy.tsx` to see the canonical callout + numbered-section structure. Follow that shape exactly.

```bash
cat src/sites/pigmilk/pages/privacy.tsx | head -60
```

- [ ] **Step 2: Create privacy page**

Create `src/sites/pointlessmetrics/pages/privacy.tsx`:

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Privacy Policy — Institute for the Study of Pointless Metrics",
  description: "How the Institute processes, indexes, and does not generally recall observational data gathered through its engagements.",
}

export default function PointlessMetricsPrivacy() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Institute Policy</p>
        <h1 className="font-heading text-4xl text-primary mb-6">Privacy Policy</h1>

        <aside className="bg-white border-2 border-primary/60 rounded-sm p-6 mb-10">
          <h2 className="font-heading text-lg text-primary mb-2">Umbrella Policy Notice</h2>
          <p className="text-sm text-foreground/85">
            The authoritative privacy policy governing data handling across all properties is published at{" "}
            <a href="https://specificindustries.com/privacy" className="underline text-primary">specificindustries.com/privacy</a>.
            That policy supersedes any statement on this page. The numbered sections below are supplementary, specific to the Institute's research and commercial operations, and should not be read as superseding the umbrella policy.
          </p>
        </aside>

        <Section n={1} title="Data We Observe">
          The Institute observes data during advisory engagements, credentialing cohorts, and routine operation of instruments returned for calibration. Observations are retained in the Institute's notional correlation index and are not generally indexable by the observed party.
        </Section>
        <Section n={2} title="Data We Decline to Observe">
          The Institute declines to observe any variable whose collection would require informed consent in more than one jurisdiction.
        </Section>
        <Section n={3} title="How We Process Your Observations">
          Observations are converted into x-values or y-values, plotted, and forgotten. If a correlation emerges, it is assigned to a principal investigator on a rotating basis. If none emerges, the observation is composted with the rest.
        </Section>
        <Section n={4} title="Cookies, and Also Crumbs, Which We Also Measure">
          The Institute's web property sets cookies for operational reasons it cannot precisely enumerate. It does not measure crumbs, but reserves the right to do so in future research.
        </Section>
        <Section n={5} title="Third Parties">
          The Institute shares data with third parties only where such sharing would itself be correlable with an outcome of research interest. Present third parties: zero.
        </Section>
        <Section n={6} title="Data Retention">
          Data is retained for the life of the Institute, plus one fiscal year.
        </Section>
        <Section n={7} title="Your Right to Be Forgotten by the Correlation Index">
          You may request removal from the Institute's correlation index by filing an observation (see /contact). Requests are reviewed on the first Thursday of each quarter. Most are granted.
        </Section>
        <Section n={8} title="Children">
          The Institute does not knowingly measure children. If we are measuring your child, a competent adult should intervene.
        </Section>
        <Section n={9} title="Changes to This Policy">
          This policy is revised annually, or when the Institute notices it has changed its mind.
        </Section>

        <p className="text-xs text-foreground/55 italic border-t border-accent/30 pt-6 mt-10">
          Last updated when we last remembered to update it.
        </p>
      </div>
    </main>
  )
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="font-heading text-lg text-primary mb-1">§{n} — {title}</h2>
      <p className="text-sm text-foreground/85">{children}</p>
    </section>
  )
}
```

- [ ] **Step 3: Create terms page**

Create `src/sites/pointlessmetrics/pages/terms.tsx`:

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Use — Institute for the Study of Pointless Metrics",
  description: "The terms governing your use of the Institute's instruments, publications, advisory services, credentialing, and merchandise.",
}

export default function PointlessMetricsTerms() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Institute Policy</p>
        <h1 className="font-heading text-4xl text-primary mb-6">Terms of Use</h1>

        <aside className="bg-white border-2 border-primary/60 rounded-sm p-6 mb-10">
          <h2 className="font-heading text-lg text-primary mb-2">Umbrella Terms Notice</h2>
          <p className="text-sm text-foreground/85">
            The authoritative terms of use governing all properties are published at{" "}
            <a href="https://specificindustries.com/terms" className="underline text-primary">specificindustries.com/terms</a>.
            Those terms supersede any statement on this page. The numbered sections below are supplementary and specific to Institute operations.
          </p>
        </aside>

        <Section n={1} title="Acceptance">
          Your continued use of the Institute's properties, instruments, or credentials constitutes acceptance of these terms in the form most recently published.
        </Section>
        <Section n={2} title="Definitions">
          "Finding" means a correlation the Institute has published. "Instrument" means a physical object issued by the Institute. "Engagement" means any billable interaction with Institute staff in excess of fifteen minutes.
        </Section>
        <Section n={3} title="Commerce">
          Purchases are final. Refunds are notional. Digital goods are deemed delivered at the moment of checkout.
        </Section>
        <Section n={4} title="Acceptable Use of Reusable and Non-Reusable Instruments">
          The Vibe Ring, Synergy Obelisk, Tarnishing Plaque, and Ambient Mood Barometer may be used in any commercial, residential, or contemplative setting. They may not be used competitively against other Institute products without written consent.
        </Section>
        <Section n={5} title="Use of the Pocket Ruler for Intangibles">
          The Pocket Ruler is calibrated for measurements of gravitas, vibe, optionality, runway, and warmth. Any other use voids the warranty and any claims arising from such use.
        </Section>
        <Section n={6} title="Credentialing">
          The Certified Pointless Metrics Practitioner™ credential is non-transferable, non-stackable, and not accredited. The Institute retains the right to revoke any credential for cause, or without cause, or in error.
        </Section>
        <Section n={7} title="Advisory Engagements">
          All advisory engagements are governed by a separate engagement letter drafted by the Institute. The letter supersedes these terms to the extent of any conflict, unless the conflict is of research interest.
        </Section>
        <Section n={8} title="Credential Revocation Procedures">
          Credentials may be revoked by the Dean of the Practitioner Program at any time. Revoked practitioners may appeal in writing. Appeals are reviewed on the same first-Thursday-of-each-quarter schedule as all Institute correspondence.
        </Section>
        <Section n={9} title="Warranty">
          Instruments are warranted for the life of the Institute, minus any period during which the Institute is in reorganization.
        </Section>
        <Section n={10} title="Limitation of Liability">
          The Institute's liability is limited to the purchase price of the instrument or service at issue. Findings, being non-causal, carry no liability whatsoever.
        </Section>
        <Section n={11} title="Disputes Regarding Posthumously-Assigned r-Values">
          Any dispute regarding an r-value assigned to a Certified Measured™ Wall Plaque after the recipient's death shall be resolved by the recipient's estate in consultation with the Institute's internal review board.
        </Section>

        <p className="text-xs text-foreground/55 italic border-t border-accent/30 pt-6 mt-10">
          These terms are current as of the last internal committee meeting at which terms were discussed.
        </p>
      </div>
    </main>
  )
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="font-heading text-lg text-primary mb-1">§{n} — {title}</h2>
      <p className="text-sm text-foreground/85">{children}</p>
    </section>
  )
}
```

- [ ] **Step 4: Wire both routes**

Modify `src/sites/pointlessmetrics/index.ts`:

```typescript
import PointlessMetricsPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import PointlessMetricsTerms, { metadata as termsMetadata } from "./pages/terms"
```

```typescript
  "privacy": { component: PointlessMetricsPrivacy, metadata: privacyMetadata },
  "terms": { component: PointlessMetricsTerms, metadata: termsMetadata },
```

- [ ] **Step 5: Verify & smoke test**

```bash
npx tsc --noEmit && npm run lint
```

Dev: both `/privacy?site=pointlessmetrics` and `/terms?site=pointlessmetrics` render.

- [ ] **Step 6: Commit**

```bash
git add src/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): add privacy and terms pages"
```

---

## Task 18: Sitemap Update

Emit URLs for the two dynamic routes.

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Read the current sitemap**

```bash
cat src/app/sitemap.ts
```

Identify where other sites' dynamic routes are emitted (look for the `carbonneutraloutrage` / `programs` section, and the `productSites` map for commerce-enabled sites).

- [ ] **Step 2: Add products to the `productSites` map**

Find the `productSites` object in `src/app/sitemap.ts`. Add an import near the other site data imports:

```typescript
import { products as pointlessmetricsProducts } from "@/sites/pointlessmetrics/data/products"
```

Add an entry inside `productSites`:

```typescript
  pointlessmetrics: pointlessmetricsProducts.map((p) => ({ slug: p.slug })),
```

- [ ] **Step 3: Add findings URL emission**

Near the carbonneutraloutrage programs block (search for the existing `for (const program of carbonneutraloutragePrograms)` loop), add:

```typescript
import { findings as pointlessmetricsFindings } from "@/sites/pointlessmetrics/data/findings"
```

And after the existing site-specific loops, add:

```typescript
  for (const finding of pointlessmetricsFindings) {
    urls.push({ url: siteUrl("pointlessmetrics", `findings/${finding.slug}`) })
  }
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 5: Dev smoke**

Hit `localhost:3000/sitemap.xml` and confirm entries exist for `/products/<slug>` and `/findings/<slug>` under the pointlessmetrics subdomain.

- [ ] **Step 6: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(pointlessmetrics): emit product and finding URLs in sitemap"
```

---

## Task 19: Image Generation Script

Generate all 24 PNG assets — 8 page heroes, 4 portraits, 12 product shots — using the existing image-gen scripts pattern.

**Files:**
- Create: `scripts/generate-pointlessmetrics-images.ts`
- Create: `public/sites/pointlessmetrics/` (directory for outputs)

- [ ] **Step 1: Read an existing image gen script as reference**

```bash
cat scripts/generate-carbonneutraloutrage-images.ts
```

Study the exact structure. Heroes and product shots use `openai.images.generate` with `model: "gpt-image-1"` and `size: "1024x1024"`. **Portraits use `openai.images.edit` with reference photos from `mcp/image-gen/base-images/<person>/`** — see the `getPersonPhotos` helper and the portrait generation loop in the reference script (and cross-reference `scripts/generate-exec-portraits.ts`). Using `edit` with the reference photos is what preserves the canonical face for bill/brandon/jim/sean per `user_base_image_genders.md`. Never call `generate` for a portrait — the face will not match.

- [ ] **Step 2: Create the script**

Create `scripts/generate-pointlessmetrics-images.ts`. Build it section by section. Prompts below are the authoritative copy — use them verbatim, adapted only for the openai API call shape observed in the reference.

Hero images (8):

```typescript
const heroPrompts = [
  {
    filename: "hero.png",
    prompt: "A wide institutional research office photograph in warm natural light. Foreground: a large polished walnut desk covered in neatly arrayed brass research instruments, printed scatter plot charts with visible trend lines, an open hardcover academic almanac, a vintage brass desk lamp. Background: tall mahogany bookshelves filled with bound journals. A circular Institute seal is faintly visible embossed on a leather folio. Editorial colors: institutional navy, warm cream, slate sage, vermilion accents on the chart marks. Shallow depth of field. No text, no people, no logos. Printed-journal aesthetic. 16:9 composition with subject right of center.",
  },
  { filename: "about.png", prompt: "A quiet institutional office interior: floor-to-ceiling dark mahogany bookshelves filled with bound journals and hardcover academic volumes, a framed faintly-visible circular crest with Latin motto on the wall, warm cream and navy tones, shallow depth of field, morning light through tall windows, no people, no visible text. Editorial photograph, 4:3 composition." },
  { filename: "methodology.png", prompt: "An overhead photograph of a research desk: a large scatter plot hand-drafted in ink with a visible linear trend line, a slide rule, a fountain pen, printed statistical tables, a brass magnifying glass, a small bronze circular stamp. Paper cream background, navy ink, vermilion accent dots. No text, no people. Editorial still-life aesthetic." },
  { filename: "shop.png", prompt: "A curated institutional product display arrayed on a long cream paper surface: a titanium ring, a small brass needle-gauge desktop dashboard, an engraved bronze plaque, a glass tube barometer, a stack of hardcover books, a bronze lapel pin on a velvet card. Warm natural light, no text, no logos. Editorial product photograph, 16:9." },
  { filename: "findings.png", prompt: "A wall of framed scatter plots of different sizes, all printed on cream paper with navy dots and vermilion trend lines, hung salon-style against a warm cream wall. No visible text other than the plot marks themselves. Editorial photograph, shallow depth of field." },
  { filename: "leadership.png", prompt: "An institutional portrait gallery: cream wall with four classical oil-style portrait frames hung in a row, each frame containing a warm dark-lit academic portrait. No identifying detail. Warm lighting. 16:9 composition." },
  { filename: "contact.png", prompt: "A wooden desk with an open brass correspondence tray containing printed observation forms, a bronze inkwell, a fountain pen, a stamped envelope. Warm institutional lighting, cream paper, shallow depth of field. No text, no people." },
  { filename: "favicon-source.png", prompt: "A circular Institute seal: cream background, deep navy concentric rings with Latin-like text around the outer ring, a stylized sigma Σ in the center over small scatter dots, vermilion accent. High contrast, readable at very small size. Square composition, centered, clean edges, no photographic elements." },
]
```

Leader portraits (4):

```typescript
const portraitPrompts = [
  {
    filename: "leaders/orrin-bletchley.png",
    person: "bill",
    prompt: "A formal seated portrait of a distinguished older man with the look of a former management consultant, wearing a dark charcoal suit with a subtle navy tie. Patrician gravity — a slight furrow, oil-portrait energy. Background: out-of-focus dense mahogany bookshelves with bound journals. Warm natural light, shallow depth of field, subtle vignette. Waist-up composition. Institutional portrait photograph aesthetic. No text, no visible branding.",
  },
  {
    filename: "leaders/percival-ashcombe.png",
    person: "brandon",
    prompt: "A portrait of an intense mid-career male researcher, slightly disheveled, one hand near chin in a thoughtful gesture, wild-eyed true-believer intensity. Wearing a tweed sport coat with elbow patches over an open-collar earth-tone shirt. Background: blurred bookshelves and a whiteboard with faint chart sketches. Warm natural light, shallow depth of field. Waist-up composition. Institutional portrait aesthetic. No text, no branding.",
  },
  {
    filename: "leaders/augustus-crane.png",
    person: "jim",
    prompt: "A portrait of a male academic consultant with cold judgmental affect — flat expression, thin slight smile, sharp gaze. Wearing a charcoal blazer over a black turtleneck. Background: blurred walnut paneling and a framed diploma. Warm natural light, shallow depth of field. Waist-up. Institutional portrait aesthetic. No text, no branding.",
  },
  {
    filename: "leaders/beaumont-kessler.png",
    person: "sean",
    prompt: "A portrait of a male academic dean with smug certainty — leaning back slightly, half-smile, certain of everything. Wearing an earth-tone sport coat over an open-collar linen shirt. Background: blurred oil-style portraits and a framed parchment on a cream wall. Warm natural light, shallow depth of field. Waist-up. Institutional portrait aesthetic. No text, no branding.",
  },
]
```

Product images (12):

```typescript
const productPrompts = [
  { filename: "products/vibe-ring.png", prompt: "A single polished titanium finger ring with a rose-gold finish, resting on a cream velvet surface next to a handwritten calibration card marked 'ISPM Model 4A'. Soft warm directional light. Editorial product photograph, no text on ring itself, shallow depth of field. Square composition." },
  { filename: "products/synergy-obelisk.png", prompt: "A vertical brass desktop instrument shaped like a small obelisk, with three analog needle gauges on its front face, each gauge labeled with a small engraved brass plate. Resting on a walnut desk next to a hardcover book. Warm institutional lighting, shallow depth of field. Editorial product photograph. Square composition." },
  { filename: "products/tarnishing-plaque.png", prompt: "A rectangular bronze plaque with an embossed circular Institute seal in the upper left and fine engraved lines for a nameplate below. The bronze shows authentic patina variation across its surface — some polished areas, some slightly tarnished. Resting on a cream paper background. Warm side lighting, shallow depth of field. Editorial still-life photograph. Square composition." },
  { filename: "products/ambient-mood-barometer.png", prompt: "A tall glass tube filled with a gradient of colored fluid (translucent blue at bottom transitioning to warm amber at top), mounted on a polished brass base with a small engraved plate. On a cream paper surface. Warm directional lighting, shallow depth of field. Editorial product photograph. Square composition." },
  { filename: "products/quarterly-report.png", prompt: "A hardcover academic journal-style report standing upright on a cream paper surface, cover in deep institutional navy with a large circular cream-colored Institute seal embossed in the center and the title 'The Quarterly Synergy Density Report' in elegant serif letters. Warm directional light, shallow depth of field. Editorial product photograph. Square composition." },
  { filename: "products/correlation-almanac.png", prompt: "A thick hardcover book, roughly 600 pages, standing on a walnut desk. Cover in deep cream with 'THE CORRELATION ALMANAC' in serif letters and a small navy circular seal below. Side view showing dense pages. Warm directional light, shallow depth of field. Editorial product photograph. Square composition." },
  { filename: "products/kpi-vibe-audit.png", prompt: "A hardcover bound institutional audit report labeled 'KPI VIBE AUDIT' on a cream cover with a small circular navy seal, resting on a walnut desk next to a fountain pen and a wax-sealed envelope. Warm directional lighting, shallow depth of field. Editorial product photograph. Square composition." },
  { filename: "products/correlation-coaching.png", prompt: "A walnut desk scene: a leather portfolio open to show a handwritten engagement letter on cream paper, a fountain pen, a porcelain cup of tea, a small brass-framed scatter plot print. Warm directional light, shallow depth of field. Editorial product photograph. Square composition, no visible text large enough to read." },
  { filename: "products/certified-practitioner.png", prompt: "A bronze-finish circular lapel pin with the Institute seal embossed on its face, resting on a folded diploma-style certificate on cream paper. Warm directional light catching the bronze finish, shallow depth of field. Editorial product photograph. Square composition." },
  { filename: "products/sticker-pack.png", prompt: "A flat-lay arrangement of twelve circular water-bottle stickers on a cream paper surface, each sticker bearing a QR-code-like square pattern in navy and a small circular seal. The stickers are slightly overlapping, editorial arrangement. Warm directional light. Product photograph. Square composition." },
  { filename: "products/wall-plaque.png", prompt: "A rectangular bronze-finish wall plaque, about A4-sized, with engraved text fields visible (name, date, r-value) and a circular Institute seal in the upper right corner. Mounted against a cream-painted wall with a subtle shadow. Warm directional light. Editorial product photograph. Square composition." },
  { filename: "products/pocket-ruler.png", prompt: "A polished brass pocket-sized ruler with non-linear tick marks labeled in tiny engraved letters, resting on a cream paper surface next to a small folded calibration card. Warm side lighting catches the brass. Shallow depth of field. Editorial still-life product photograph. Square composition." },
]
```

Integrate all three arrays into the existing script pattern (see the reference). The script should iterate each array, call the image API, write PNGs into `public/sites/pointlessmetrics/`, and log progress. Create the `leaders/` and `products/` subdirectories before writing.

- [ ] **Step 3: Run the generation**

```bash
OPENAI_API_KEY=<key> npx tsx scripts/generate-pointlessmetrics-images.ts
```

Expected: 24 PNG files written under `public/sites/pointlessmetrics/` (including `favicon-source.png`, which will be resized in Task 20).

- [ ] **Step 4: Verify files exist**

```bash
ls public/sites/pointlessmetrics/ public/sites/pointlessmetrics/leaders/ public/sites/pointlessmetrics/products/
```

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-pointlessmetrics-images.ts public/sites/pointlessmetrics
git commit -m "feat(pointlessmetrics): generate site imagery (hero, portraits, products)"
```

---

## Task 20: Favicon

Resize `favicon-source.png` to 64×64, register in the favicon script.

**Files:**
- Create: `public/sites/pointlessmetrics/favicon.png`
- Modify: `scripts/resize-favicons.mjs`

- [ ] **Step 1: Register the site in the favicon resize script**

Read `scripts/resize-favicons.mjs`. Find the hardcoded `sites` array and add `"pointlessmetrics"` to it (alphabetical).

- [ ] **Step 2: Generate the favicon**

```bash
node scripts/resize-favicons.mjs
```

Expected: `public/sites/pointlessmetrics/favicon.png` created at 64×64.

- [ ] **Step 3: Verify**

```bash
file public/sites/pointlessmetrics/favicon.png
# Expected: PNG image data, 64 x 64, ...
```

- [ ] **Step 4: Dev smoke**

Hit `localhost:3000/?site=pointlessmetrics` and confirm the favicon appears in the browser tab.

- [ ] **Step 5: Commit**

```bash
git add scripts/resize-favicons.mjs public/sites/pointlessmetrics/favicon.png
git commit -m "feat(pointlessmetrics): add 64x64 favicon and register in resize script"
```

---

## Task 21: Full-Site Smoke Test

Verify every route renders end-to-end; apex cross-site features pick up the new site; no console errors.

**Files:** none (verification only)

- [ ] **Step 1: Fresh build + typecheck + lint**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all pass.

- [ ] **Step 2: Static page smoke test**

Start `npm run dev` and hit each in the browser:

- `localhost:3000/?site=pointlessmetrics`
- `localhost:3000/about?site=pointlessmetrics`
- `localhost:3000/methodology?site=pointlessmetrics`
- `localhost:3000/shop?site=pointlessmetrics`
- `localhost:3000/findings?site=pointlessmetrics`
- `localhost:3000/leadership?site=pointlessmetrics`
- `localhost:3000/contact?site=pointlessmetrics`
- `localhost:3000/privacy?site=pointlessmetrics`
- `localhost:3000/terms?site=pointlessmetrics`
- `localhost:3000/cart?site=pointlessmetrics`
- `localhost:3000/checkout?site=pointlessmetrics`

Confirm: page renders, hero image loads, no console errors, header mega-menu opens, cart badge updates when you Add-to-Cart.

- [ ] **Step 3: Dynamic routes smoke test**

Hit at least four products (one per template branch) and at least three findings:

- `localhost:3000/products/vibe-ring?site=pointlessmetrics` (specs branch)
- `localhost:3000/products/certified-practitioner?site=pointlessmetrics` (curriculum + faculty)
- `localhost:3000/products/kpi-vibe-audit?site=pointlessmetrics` (advisory)
- `localhost:3000/products/quarterly-report?site=pointlessmetrics` (past issues)
- `localhost:3000/findings/alignment-in-okrs-inverse?site=pointlessmetrics`
- `localhost:3000/findings/houseplants-team-warmth?site=pointlessmetrics`
- `localhost:3000/findings/humble-ceo-interviews-inverse?site=pointlessmetrics`

Confirm: hero images, charts, and citation blocks render cleanly.

- [ ] **Step 4: Apex cross-site verification**

Hit apex to confirm automatic pickup:

- `localhost:3000/portfolio` — should show ISPM in the directory list
- `localhost:3000/verticals/professional-tech` (or wherever apex routes verticals) — ISPM should appear
- `localhost:3000/leaders/bill` (or equivalent apex leader detail URL) — ISPM should appear under Orrin Bletchley's board positions; repeat for brandon/jim/sean

If any cross-site surface fails to pick up the site, confirm:
- `data/leadership.ts` uses the `person` field (not `referencePerson`)
- `config.ts` has `verticalKey: "professional-tech"`
- The site is registered in `src/sites/registry.ts`
- The subdomain is in `VALID_SUBDOMAINS`

- [ ] **Step 5: Invalid slugs**

Confirm 404 behavior:

- `localhost:3000/products/nonexistent?site=pointlessmetrics` → 404
- `localhost:3000/findings/nonexistent?site=pointlessmetrics` → 404
- `localhost:3000/garbage?site=pointlessmetrics` → 404

- [ ] **Step 6: Sitemap**

```bash
curl -s http://localhost:3000/sitemap.xml | grep pointlessmetrics | wc -l
```

Expected: at least 9 static + 12 products + 24 findings = 45 entries.

- [ ] **Step 7: Commit (notes only, if anything was adjusted)**

If any bugs surfaced and needed fixes, commit those fixes in this task. Otherwise:

```bash
git log --oneline | head -25
```

Confirm the sequence of commits tells a clean narrative.

---

## Appendix: Pattern Reference

- **Umbrella callout + satirical body (privacy/terms):** `src/sites/pigmilk/pages/privacy.tsx`
- **Commerce integration (cart, checkout, AddToCartButton):** `src/sites/pigmilk/pages/*.tsx`, `src/components/commerce/*.tsx`
- **Mega-menu config shape:** `src/sites/strategicvoid/config.ts`
- **Dynamic route registration:** `src/sites/pigmilk/index.ts` (shows `productSchema` + `dynamicRoutes`)
- **Sitemap extension:** `src/app/sitemap.ts` — `productSites` map and `carbonneutraloutrage` programs loop
- **Image generation script pattern:** `scripts/generate-carbonneutraloutrage-images.ts`
- **Favicon registration:** `scripts/resize-favicons.mjs`
