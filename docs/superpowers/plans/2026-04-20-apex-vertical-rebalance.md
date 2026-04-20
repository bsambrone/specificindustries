# Apex Portfolio Vertical Rebalance & Sitemap Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebalance the 33-brand apex portfolio into six new verticals, update every code path and UI string that references the old five-vertical taxonomy, and add the missing `petjacks` product URLs to the sitemap.

**Architecture:** Single-codebase rename of a TypeScript union type (`VerticalKey`) plus a parallel rename for the career-listings taxonomy (`CareersVertical`). Each of 33 site `config.ts` files has its `verticalKey` field reassigned; all `Record<VerticalKey, ...>` initializers and UI strings that list vertical names get updated together. Correctness is enforced by `tsc --noEmit` after all edits, plus a grep for leaked old keys. The sitemap fix adds a single line to an existing loop.

**Tech Stack:** TypeScript, Next.js 15 (App Router), Tailwind CSS v4.

**Execution note:** During this migration several intermediate commits will leave the project temporarily failing to type-check (e.g. after changing the type union but before updating all string literals). The final task runs `tsc --noEmit` and `npm run lint` as the acceptance test. Do not attempt to keep the build green between tasks — it blocks progress with no benefit.

---

## Task 1: Replace `VerticalKey` union and vertical metadata

**Files:**
- Modify: `src/themes/index.ts` (union at lines 55–60)
- Modify: `src/sites/apex/data/verticals.ts` (whole file)

- [ ] **Step 1: Update `VerticalKey` union type**

In `src/themes/index.ts`, replace the existing `VerticalKey` union:

```typescript
export type VerticalKey =
  | "food-beverage"
  | "consumer-household"
  | "hygiene-wellness"
  | "pets-specialty"
  | "media-platforms"
  | "professional-tech"
```

Leave every other declaration in `src/themes/index.ts` untouched.

- [ ] **Step 2: Rewrite `src/sites/apex/data/verticals.ts`**

Replace the entire file contents with:

```typescript
import type { VerticalKey } from "@/themes"

export interface VerticalMeta {
  key: VerticalKey
  displayName: string
  shortDescription: string
  thesis: string
}

export const verticals: Record<VerticalKey, VerticalMeta> = {
  "food-beverage": {
    key: "food-beverage",
    displayName: "Food & Beverage",
    shortDescription:
      "Consumable brands operating at the edge of food science, product language, and legal labeling.",
    thesis:
      "We invest in foodstuffs and beverages whose category name is itself a point of consumer negotiation.",
  },
  "consumer-household": {
    key: "consumer-household",
    displayName: "Consumer & Household Goods",
    shortDescription:
      "Packaged goods, manufactured items, games, and novelty products serving use-cases that retailers have not yet formally classified.",
    thesis:
      "We prefer consumer categories so specific that the product itself requires an explanation before it can be sold.",
  },
  "hygiene-wellness": {
    key: "hygiene-wellness",
    displayName: "Hygiene, Health & Wellness",
    shortDescription:
      "Hygiene, pharmaceutical-adjacent, and quasi-medical brands positioned at the edge of the regulatory envelope and recession-resistant by design.",
    thesis:
      "Consumers remain willing to pay for bodily outcomes that have not been proven, disproven, or meaningfully defined.",
  },
  "pets-specialty": {
    key: "pets-specialty",
    displayName: "Pets & Specialty Services",
    shortDescription:
      "Companion-animal platforms and adjacent specialty services whose customers are willing to pay on behalf of a second party.",
    thesis:
      "When the payer is not the end user, price sensitivity is a theoretical concern.",
  },
  "media-platforms": {
    key: "media-platforms",
    displayName: "Media & Creator Platforms",
    shortDescription:
      "Editorial, civic, and creator-economy platforms whose revenue model is inseparable from their audience's worldview.",
    thesis:
      "Categories where the content is the product remain chronically mispriced by firms who insist on distinguishing the two.",
  },
  "professional-tech": {
    key: "professional-tech",
    displayName: "Professional Services & Technology",
    shortDescription:
      "Advisory firms, specialty SaaS, privacy infrastructure, and incubated ventures that we are still actively categorizing.",
    thesis:
      "Where a category cannot be named, we believe that naming it is itself the service.",
  },
}

export const verticalOrder: VerticalKey[] = [
  "food-beverage",
  "consumer-household",
  "hygiene-wellness",
  "pets-specialty",
  "media-platforms",
  "professional-tech",
]
```

- [ ] **Step 3: Commit**

```bash
git add src/themes/index.ts src/sites/apex/data/verticals.ts
git commit -m "refactor(apex): replace five-vertical taxonomy with six-vertical taxonomy

Introduces the new VerticalKey union (food-beverage, consumer-household,
hygiene-wellness, pets-specialty, media-platforms, professional-tech) and
rewrites verticals.ts with matching displayNames, shortDescriptions, and
thesis copy. Downstream consumers update in subsequent commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Update `Record<VerticalKey, …>` initializer maps

**Files:**
- Modify: `src/sites/apex/data/portfolio-utils.ts` (lines 24–31)
- Modify: `src/sites/apex/pages/portfolio-explorer.tsx` (lines 42–48)
- Modify: `src/sites/apex/pages/home.tsx` (lines 29–35, the `grouped` initializer only; do not touch copy strings yet)

- [ ] **Step 1: Update `portfolio-utils.ts` grouped initializer**

In `src/sites/apex/data/portfolio-utils.ts`, replace the existing `grouped` literal inside `groupBrandsByVertical`:

```typescript
  const grouped: Record<VerticalKey, PortfolioBrand[]> = {
    "food-beverage": [],
    "consumer-household": [],
    "hygiene-wellness": [],
    "pets-specialty": [],
    "media-platforms": [],
    "professional-tech": [],
  }
```

- [ ] **Step 2: Update `portfolio-explorer.tsx` grouped initializer**

In `src/sites/apex/pages/portfolio-explorer.tsx`, replace the `map` literal inside the `grouped` `useMemo`:

```typescript
    const map: Record<VerticalKey, PortfolioBrandDTO[]> = {
      "food-beverage": [],
      "consumer-household": [],
      "hygiene-wellness": [],
      "pets-specialty": [],
      "media-platforms": [],
      "professional-tech": [],
    }
```

- [ ] **Step 3: Update `home.tsx` grouped initializer**

In `src/sites/apex/pages/home.tsx`, replace the `grouped` literal:

```typescript
  const grouped: Record<VerticalKey, PortfolioBrand[]> = {
    "food-beverage": [],
    "consumer-household": [],
    "hygiene-wellness": [],
    "pets-specialty": [],
    "media-platforms": [],
    "professional-tech": [],
  }
```

Do not change any other lines in `home.tsx` in this task.

- [ ] **Step 4: Commit**

```bash
git add src/sites/apex/data/portfolio-utils.ts src/sites/apex/pages/portfolio-explorer.tsx src/sites/apex/pages/home.tsx
git commit -m "refactor(apex): update grouped Record initializers for new verticals

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Reassign `verticalKey` on all 33 brand configs

**Files:**
- Modify: each of the 33 site config files listed in the sub-steps below. Each change is a single-line edit: the `verticalKey: "<old>"` becomes `verticalKey: "<new>"`. No other fields in any config are touched.

- [ ] **Step 1: Food & Beverage (6 configs)**

For each of these files, change `verticalKey` to `"food-beverage"`:

- `src/sites/bonelesswater/config.ts` (was `"consumer-goods"`)
- `src/sites/carterandfils/config.ts` (was `"consumer-goods"`)
- `src/sites/chunkymilk/config.ts` (was `"consumer-goods"`)
- `src/sites/dehydratedwater/config.ts` (was `"consumer-goods"`)
- `src/sites/pigmilk/config.ts` (was `"consumer-goods"`)
- `src/sites/prechewed/config.ts` (was `"health-wellness"`)

- [ ] **Step 2: Consumer & Household Goods (8 configs)**

For each, change `verticalKey` to `"consumer-household"`:

- `src/sites/inflatableanchors/config.ts` (was `"consumer-goods"`)
- `src/sites/meh/config.ts` (was `"consumer-goods"`)
- `src/sites/mousetrapjenga/config.ts` (was `"consumer-goods"`)
- `src/sites/rocks/config.ts` (was `"consumer-goods"`)
- `src/sites/snortables/config.ts` (was `"consumer-goods"`)
- `src/sites/squaredaway/config.ts` (was `"consumer-goods"`)
- `src/sites/superengineered/config.ts` (was `"consumer-goods"`)
- `src/sites/terrorclown/config.ts` (was `"consumer-goods"`)

- [ ] **Step 3: Hygiene, Health & Wellness (5 configs)**

For each, change `verticalKey` to `"hygiene-wellness"`:

- `src/sites/mostlysterile/config.ts` (was `"health-wellness"`)
- `src/sites/radiumroys/config.ts` (was `"health-wellness"`)
- `src/sites/seeltite/config.ts` (was `"hygiene"`)
- `src/sites/sovereignwellness/config.ts` (was `"health-wellness"`)
- `src/sites/truegrit/config.ts` (was `"hygiene"`)

- [ ] **Step 4: Pets & Specialty Services (3 configs)**

For each, change `verticalKey` to `"pets-specialty"`:

- `src/sites/petjacks/config.ts` (was `"consumer-goods"`)
- `src/sites/pettential/config.ts` (was `"professional-services"`)
- `src/sites/whiskerworks/config.ts` (was `"professional-services"`)

- [ ] **Step 5: Media & Creator Platforms (4 configs)**

For each, change `verticalKey` to `"media-platforms"`:

- `src/sites/elderparty/config.ts` (was `"professional-services"`)
- `src/sites/onlyfans/config.ts` (was `"subscription-services"`)
- `src/sites/onlypans/config.ts` (was `"subscription-services"`)
- `src/sites/thetheoryisreal/config.ts` (was `"professional-services"`)

- [ ] **Step 6: Professional Services & Technology (7 configs)**

For each, change `verticalKey` to `"professional-tech"`:

- `src/sites/cleansheet/config.ts` (was `"professional-services"`)
- `src/sites/grassfedwifi/config.ts` (was `"professional-services"`)
- `src/sites/gristmill/config.ts` (was `"professional-services"`)
- `src/sites/oddoccasions/config.ts` (was `"professional-services"`)
- `src/sites/privatrix/config.ts` (was `"professional-services"`)
- `src/sites/stratify/config.ts` (was `"professional-services"`)
- `src/sites/strategicvoid/config.ts` (was `"professional-services"`)

- [ ] **Step 7: Verify no missed configs**

Use the Grep tool with pattern `"consumer-goods"|"hygiene"|"health-wellness"|"subscription-services"|"professional-services"` and glob `src/sites/*/config.ts`. Expected output: no matches.

- [ ] **Step 8: Commit**

```bash
git add src/sites/*/config.ts
git commit -m "refactor(apex): migrate all 33 brand configs to new verticalKey values

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Migrate the careers taxonomy

**Files:**
- Modify: `src/sites/apex/data/careers.ts`
- Modify: `src/sites/apex/pages/careers-explorer.tsx`

- [ ] **Step 1: Update `CareersVertical` union in `careers.ts`**

At the top of `src/sites/apex/data/careers.ts`, replace the `CareersVertical` union:

```typescript
export type CareersVertical =
  | "food-beverage"
  | "consumer-household"
  | "hygiene-wellness"
  | "pets-specialty"
  | "media-platforms"
  | "professional-tech"
  | "corporate"
```

- [ ] **Step 2: Re-map each of the 19 non-corporate job entries**

Change each job's `vertical` field per the table below. Locate each job by its `slug`. The six `vertical: "corporate"` entries (chief-of-staff, naming-conventions, board-coordination, press-release-drafting, ma-small-market, groundskeeper) stay untouched.

| Slug | New vertical |
| --- | --- |
| `director-niche-market-analytics` | `consumer-household` |
| `head-portfolio-consumables-ingestibles` | `food-beverage` |
| `senior-manager-product-viability-under-400` | `consumer-household` |
| `associate-packaging-language-review` | `consumer-household` |
| `vp-beverage-category-strategy` | `food-beverage` |
| `head-bathroom-humor-division` | `hygiene-wellness` |
| `senior-director-restroom-category-innovation` | `hygiene-wellness` |
| `apm-seat-fitment` | `hygiene-wellness` |
| `chief-wellness-evangelist` | `hygiene-wellness` |
| `vp-questionable-health-claims` | `hygiene-wellness` |
| `director-regulatory-avoidance` | `hygiene-wellness` |
| `vp-recurring-revenue-optimization` | `media-platforms` |
| `senior-manager-cancellation-flow-obfuscation` | `media-platforms` |
| `director-auto-renewal-communications` | `media-platforms` |
| `senior-director-strategic-ambiguity` | `professional-tech` |
| `head-incubated-ventures-pre-concept` | `professional-tech` |
| `vp-synergy-operations` | `professional-tech` |
| `associate-framework-development` | `professional-tech` |
| `chief-disruption-evangelist` | `professional-tech` |

Do not change any other field on any job entry. Section-header comments in the file (e.g. `// ===== Consumer Goods & Consumables (5) =====`) stay as-is — they are editorial, not load-bearing.

- [ ] **Step 3: Rewrite `VERTICAL_LABELS` and `VERTICAL_ORDER`**

At the bottom of `careers.ts`, replace the two exports with:

```typescript
export const VERTICAL_LABELS: Record<CareersVertical, string> = {
  "food-beverage": "Food & Beverage",
  "consumer-household": "Consumer & Household Goods",
  "hygiene-wellness": "Hygiene, Health & Wellness",
  "pets-specialty": "Pets & Specialty Services",
  "media-platforms": "Media & Creator Platforms",
  "professional-tech": "Professional Services & Technology",
  "corporate": "Corporate / Executive",
}

export const VERTICAL_ORDER: CareersVertical[] = [
  "food-beverage",
  "consumer-household",
  "hygiene-wellness",
  "pets-specialty",
  "media-platforms",
  "professional-tech",
  "corporate",
]
```

- [ ] **Step 4: Update `careers-explorer.tsx` grouped initializer**

In `src/sites/apex/pages/careers-explorer.tsx`, replace the `m` literal inside the `grouped` `useMemo`:

```typescript
    const m: Record<CareersVertical, JobListingDTO[]> = {
      "food-beverage": [],
      "consumer-household": [],
      "hygiene-wellness": [],
      "pets-specialty": [],
      "media-platforms": [],
      "professional-tech": [],
      "corporate": [],
    }
```

- [ ] **Step 5: Commit**

```bash
git add src/sites/apex/data/careers.ts src/sites/apex/pages/careers-explorer.tsx
git commit -m "refactor(apex): migrate CareersVertical taxonomy to new six-vertical scheme

Re-maps each of the 19 non-corporate job listings to its new vertical
based on the job's actual subject matter. Corporate-tier roles are
unaffected.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Fix stale UI copy on apex home and careers pages

**Files:**
- Modify: `src/sites/apex/pages/home.tsx`
- Modify: `src/sites/apex/pages/careers.tsx`

- [ ] **Step 1: Fix the stale hero headline on home**

In `src/sites/apex/pages/home.tsx`, locate the `<Hero ... headline="Building Enduring Value Across 28 Underserved Verticals" ... />` element (around line 72) and replace it with:

```tsx
      <Hero
        headline="Building Enduring Value Across 33 Specific Industries"
        subheadline="A portfolio of brands targeting markets that, by most measures, arguably should not exist."
      />
```

- [ ] **Step 2: Fix the careers teaser headline and description on home**

In the same file, locate the careers section (around lines 273–277):

```tsx
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
            {jobs.length}+ Open Positions Across All Five Verticals
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            We are hiring for roles in Consumer Goods, Hygiene, Health & Wellness, Subscription Services, Professional Services, and at Corporate HQ (Virtual).
          </p>
```

Replace with:

```tsx
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
            {jobs.length}+ Open Positions Across All Six Verticals
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            We are hiring for roles in Food & Beverage, Consumer & Household Goods, Hygiene, Health & Wellness, Pets & Specialty Services, Media & Creator Platforms, Professional Services & Technology, and at Corporate HQ (Virtual).
          </p>
```

- [ ] **Step 3: Fix the careers page subheadline**

In `src/sites/apex/pages/careers.tsx`, locate the `<Hero>` subheadline (around lines 28–31):

```tsx
      <Hero
        headline="Careers at Specific Industries"
        subheadline={`Join a portfolio of brands serving markets that arguably should not exist. We are hiring ${jobs.length}+ roles across all five verticals.`}
      />
```

Replace with:

```tsx
      <Hero
        headline="Careers at Specific Industries"
        subheadline={`Join a portfolio of brands serving markets that arguably should not exist. We are hiring ${jobs.length}+ roles across all six verticals.`}
      />
```

- [ ] **Step 4: Commit**

```bash
git add src/sites/apex/pages/home.tsx src/sites/apex/pages/careers.tsx
git commit -m "fix(apex): update stale hero copy and vertical name lists

Hero headline now reflects the 33-brand portfolio count; careers teaser
and careers-page subheadline updated to match the new six-vertical
taxonomy.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Add petjacks products to sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add the petjacks products import**

In `src/app/sitemap.ts`, add this import alongside the other product imports (the block beginning `import { products as pigmilkProducts }` on line 3). Alphabetical placement is fine:

```typescript
import { products as petjacksProducts } from "@/sites/petjacks/data/products"
```

- [ ] **Step 2: Register petjacks in the `productSites` map**

In the same file, locate the `productSites` record (around lines 77–96) and add one entry:

```typescript
  const productSites: Record<string, { slug: string }[]> = {
    pigmilk: pigmilkProducts,
    dehydratedwater: dehydratedwaterProducts,
    inflatableanchors: inflatableanchorsProducts,
    truegrit: truegritProducts,
    snortables: snortablesProducts,
    mousetrapjenga: mousetrapjengaProducts,
    bonelesswater: bonelesswaterProducts,
    rocks: rocksProducts,
    radiumroys: radiumroysProducts,
    squaredaway: squaredawayProducts,
    mostlysterile: mostlysterileProducts,
    meh: mehProducts,
    privatrix: privatrixProducts,
    prechewed: prechewedProducts,
    seeltite: seeltiteProducts,
    chunkymilk: chunkymilkProducts,
    superengineered: superengineeredProducts,
    terrorclown: terrorclownProducts,
    petjacks: petjacksProducts,
  }
```

No other changes in this file.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "fix(sitemap): emit petjacks product detail URLs

The petjacks brand ships product detail pages at /products/{slug} but
its products array was not registered in sitemap.ts's productSites map,
so the URLs were silently excluded from the sitemap.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Final verification

**Files:** none modified — verification only.

- [ ] **Step 1: Type-check**

Run:

```bash
npx tsc --noEmit
```

Expected: exits with code 0, zero errors. If any error appears, it will be a leftover reference to an old vertical key — fix in place.

- [ ] **Step 2: Lint**

Run:

```bash
npm run lint
```

Expected: exits with code 0. Warnings about unrelated files are acceptable; new errors in files touched by this migration are not.

- [ ] **Step 3: Grep for leaked old vertical keys**

Use the Grep tool with pattern `"consumer-goods"|"subscription-services"|"professional-services"|"health-wellness"` and `type: "ts"` to search `src/`.

Expected hits, all acceptable:
- `src/sites/apex/data/careers.ts` — only if a section-header comment (e.g. `// ===== Consumer Goods & Consumables (5) =====`) remains; those are fine.

Then grep for the bare-word `"hygiene"` with the same scope.

Expected hits, all acceptable:
- `src/sites/truegrit/*` — internal brand copy.
- `src/sites/seeltite/*` — internal brand copy.
- Similar brand-internal references.

No hits in:
- Any `src/sites/*/config.ts`
- `src/themes/index.ts`
- `src/sites/apex/data/verticals.ts`
- `src/sites/apex/data/portfolio-utils.ts`
- `src/sites/apex/pages/home.tsx`
- `src/sites/apex/pages/portfolio-explorer.tsx`
- `src/sites/apex/pages/careers.tsx`
- `src/sites/apex/pages/careers-explorer.tsx`
- `src/sites/apex/data/careers.ts` (outside of section-header comments)

- [ ] **Step 4: Smoke-test in the browser**

Run `npm run dev` in a background shell, then open `http://localhost:3000/?site=apex` and verify:

1. Hero reads *"Building Enduring Value Across 33 Specific Industries"*.
2. The "Our Brands by Vertical" section lists six sections in this order: Food & Beverage, Consumer & Household Goods, Hygiene Health & Wellness, Pets & Specialty Services, Media & Creator Platforms, Professional Services & Technology.
3. Brand counts match the table in Task 3 (6 / 8 / 5 / 3 / 4 / 7).
4. Featured Holdings cards show their new vertical name label (e.g. `seeltite` shows *Hygiene, Health & Wellness*).
5. Open `/portfolio?site=apex` and confirm the filter pills show the six new labels.
6. Open `/careers?site=apex` and confirm the subheadline mentions *"six verticals"* and the explorer filter pills match the seven labels (six verticals + Corporate).
7. Open `/sitemap.xml` (via `curl http://localhost:3000/sitemap.xml | grep petjacks`) and confirm petjacks product URLs appear.

Stop the dev server when finished.

- [ ] **Step 5: No commit required**

Verification steps do not produce code changes. If any of the above produced fixes, those should have been committed to their own appropriate task. If a fix arose in verification that does not fit cleanly into a prior task, commit it with a `fix(apex): ...` message referencing the specific symptom.
