# Apex Redesign — Plan 1: Foundation + Portfolio Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lay the type + data foundation for the apex redesign and ship a working `/portfolio` page that groups all 27 subsite brands by vertical.

**Architecture:** Add a `VerticalKey` type (5 portfolio verticals) and add optional `verticalKey` + `tagline` fields to `SiteConfig`. Populate these on all 27 non-apex site configs. Create apex data files for vertical metadata (`verticals.ts`) and editorial lists (`featured.ts`). Build shared `BrandCard` + `VerticalSection` components. Add `/portfolio` page that iterates the site registry, groups by vertical, and supports client-side filter chips. Add Portfolio to the apex nav.

**Tech Stack:** Next.js 15 (App Router), TypeScript (strict), Tailwind v4, React 19. Verification loop: `npm run lint`, `npx tsc --noEmit`, `npm run build`. No unit test infrastructure in this codebase; rely on type-check + build.

**Spec reference:** `docs/superpowers/specs/2026-04-18-apex-portfolio-pe-satire-design.md`

---

## File Structure

**Created:**
- `src/sites/apex/data/verticals.ts` — single source of truth for vertical display names, descriptions, and thesis lines
- `src/sites/apex/data/featured.ts` — editorial lists (`featuredHoldings`, `featuredJobs`)
- `src/components/ui/brand-card.tsx` — favicon + name + tagline + accent top border
- `src/components/ui/vertical-section.tsx` — heading + description + responsive grid of BrandCards
- `src/sites/apex/pages/portfolio.tsx` — `/portfolio` page with filter chips + sort, iterates registry
- `src/sites/apex/data/portfolio-utils.ts` — helper to group registered sites by vertical (pure function, no side effects)

**Modified:**
- `src/themes/index.ts` — add `VerticalKey` type, add `verticalKey?` and `tagline?` to `SiteConfig`
- `src/sites/apex/index.ts` — register `portfolio` page
- `src/sites/apex/config.ts` — add Portfolio to nav
- 27 non-apex `src/sites/<subdomain>/config.ts` files — add `verticalKey` and `tagline`

---

## Task 1: Add VerticalKey type and extend SiteConfig

**Files:**
- Modify: `src/themes/index.ts`

- [ ] **Step 1: Add the type and fields**

Edit `src/themes/index.ts`. Find the `SiteConfig` interface and modify it to add two new optional fields. Also add a new `VerticalKey` type definition before `SiteConfig`:

```typescript
export type VerticalKey =
  | "consumer-goods"
  | "hygiene"
  | "health-wellness"
  | "subscription-services"
  | "professional-services"

export interface SiteConfig {
  name: string
  subdomain: string
  theme: SiteTheme
  metadata: SiteMetadata
  nav: NavItem[]
  features: {
    commerce: boolean
  }
  megaMenu?: MegaMenuConfig
  /**
   * Portfolio vertical for apex-site grouping. Required on all subsite configs
   * (non-apex). Apex omits this field. Sites without a verticalKey are hidden
   * from apex portfolio surfaces.
   */
  verticalKey?: VerticalKey
  /**
   * Short one-line pitch used on apex brand cards. Falls back to truncated
   * metadata.description if omitted.
   */
  tagline?: string
}
```

- [ ] **Step 2: Verify type check still passes**

Run: `npx tsc --noEmit`
Expected: PASS (new fields are optional, no breakage).

- [ ] **Step 3: Commit**

```bash
git add src/themes/index.ts
git commit -m "feat(apex): add VerticalKey type and verticalKey/tagline fields to SiteConfig

Optional fields; apex omits, subsites populate per the PE-satire redesign
spec. Required in practice on subsite configs but optional at the type
level so apex config doesn't need a placeholder value."
```

---

## Task 2: Create vertical metadata file

**Files:**
- Create: `src/sites/apex/data/verticals.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/sites/apex/data/verticals.ts
import type { VerticalKey } from "@/themes"

export interface VerticalMeta {
  key: VerticalKey
  displayName: string
  shortDescription: string
  thesis: string
}

export const verticals: Record<VerticalKey, VerticalMeta> = {
  "consumer-goods": {
    key: "consumer-goods",
    displayName: "Consumer Goods & Consumables",
    shortDescription:
      "Packaged goods, foodstuffs, manufactured items, and legacy artisanal brands serving categories that most retailers have not yet classified.",
    thesis:
      "We invest in consumer categories so specific that the product itself requires an explanation before it can be sold.",
  },
  "hygiene": {
    key: "hygiene",
    displayName: "Personal Hygiene & Home Essentials",
    shortDescription:
      "A category defined by recurring necessity and limited category competition. Bathroom-adjacent brands with serious engineering rigor.",
    thesis:
      "Hygiene categories are recession-resistant, emotionally charged, and chronically underserved by firms unwilling to name what the product does.",
  },
  "health-wellness": {
    key: "health-wellness",
    displayName: "Health & Wellness Holdings",
    shortDescription:
      "Wellness, pharmaceutical-adjacent, and quasi-medical brands positioned at the edge of the regulatory envelope.",
    thesis:
      "Consumers remain willing to pay for wellness outcomes that have not been proven, disproven, or meaningfully defined.",
  },
  "subscription-services": {
    key: "subscription-services",
    displayName: "Subscription Services",
    shortDescription:
      "Recurring-revenue brands in the portfolio. Designed for annualized billing with optional annual renewal.",
    thesis:
      "Subscription economics dominate our modeling; we prefer categories where cancellation requires a phone call.",
  },
  "professional-services": {
    key: "professional-services",
    displayName: "Professional Services & Emerging Ventures",
    shortDescription:
      "Advisory firms, digital infrastructure, specialty services, and incubated ventures that we are still actively categorizing.",
    thesis:
      "Where a category cannot be named, we believe that naming it is itself the service.",
  },
}

export const verticalOrder: VerticalKey[] = [
  "consumer-goods",
  "hygiene",
  "health-wellness",
  "subscription-services",
  "professional-services",
]
```

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/apex/data/verticals.ts
git commit -m "feat(apex): add verticals metadata file

Single source of truth for vertical display names, descriptions, and
satirical investment theses. Consumed by Home, Portfolio, Thesis, and
Careers filters in later plans."
```

---

## Task 3: Create featured editorial file

**Files:**
- Create: `src/sites/apex/data/featured.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/sites/apex/data/featured.ts

/**
 * Editorial list of featured portfolio brands, shown on the home page
 * "Featured Holdings" ribbon. Max 4 items. Each value must be a subdomain
 * key that exists in siteRegistry.
 */
export const featuredHoldings: string[] = [
  "seeltite",
  "truegrit",
  "strategicvoid",
  "privatrix",
]

/**
 * Editorial list of featured open roles, shown on the home page "Careers"
 * teaser. Max 3 items. Each value must be a job slug that exists in the
 * jobs catalog (added in Plan 3 — Careers system). Populated when Plan 3
 * lands; empty until then so the home careers teaser falls back to the
 * first few roles by registry order.
 */
export const featuredJobs: string[] = []
```

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/apex/data/featured.ts
git commit -m "feat(apex): add featured holdings/jobs editorial file

featuredHoldings bootstrapped with 4 picks; featuredJobs left empty
pending the careers plan."
```

---

## Task 4: Populate verticalKey and tagline on Consumer Goods sites

**Files:**
- Modify: 9 config files under `src/sites/<subdomain>/config.ts`

Sites to update (all get `verticalKey: "consumer-goods"`):
1. pigmilk
2. dehydratedwater
3. bonelesswater
4. snortables
5. rocks
6. inflatableanchors
7. superengineered
8. carterandfils
9. gristmill

- [ ] **Step 1: For each of the 9 sites, edit `src/sites/<subdomain>/config.ts`**

Find the SiteConfig object literal and add two fields just above the closing `}`:

```typescript
  verticalKey: "consumer-goods",
  tagline: "<one-line pitch, see below>",
```

Use these taglines (each under 80 chars):

- **pigmilk** — "Premium dairy from a species most dairies overlook."
- **dehydratedwater** — "Water, without the water. Just add water."
- **bonelesswater** — "Water reformulated for modern consumers. No bones."
- **snortables** — "Shelf-stable snacks engineered for the single-nostril moment."
- **rocks** — "Geological assets curated for the discerning rock owner."
- **inflatableanchors** — "Portable anchoring for markets tired of heavy solutions."
- **superengineered** — "Over-specified industrial goods for under-specified problems."
- **carterandfils** — "Heritage craftsmanship, fourth generation. Quietly precise."
- **gristmill** — "Stone-milled goods since 1847. We did not change the method."

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/pigmilk/config.ts src/sites/dehydratedwater/config.ts \
        src/sites/bonelesswater/config.ts src/sites/snortables/config.ts \
        src/sites/rocks/config.ts src/sites/inflatableanchors/config.ts \
        src/sites/superengineered/config.ts src/sites/carterandfils/config.ts \
        src/sites/gristmill/config.ts
git commit -m "feat(apex): assign consumer-goods vertical and tagline to 9 sites"
```

---

## Task 5: Populate verticalKey and tagline on Hygiene sites

**Files:**
- Modify: 2 config files

Sites (all get `verticalKey: "hygiene"`):
1. truegrit
2. seeltite

- [ ] **Step 1: Edit both `config.ts` files**

Add:
```typescript
  verticalKey: "hygiene",
  tagline: "<see below>",
```

Taglines:
- **truegrit** — "Abrasives for people who have given up on softer options."
- **seeltite** — "Containment engineered for when the gamble is over."

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/truegrit/config.ts src/sites/seeltite/config.ts
git commit -m "feat(apex): assign hygiene vertical and tagline to truegrit and seeltite"
```

---

## Task 6: Populate verticalKey and tagline on Health & Wellness sites

**Files:**
- Modify: 3 config files

Sites (all get `verticalKey: "health-wellness"`):
1. sovereignwellness
2. radiumroys
3. mostlysterile

- [ ] **Step 1: Edit all 3 config.ts files**

Taglines:
- **sovereignwellness** — "Personal-sovereignty wellness for those who have opted out."
- **radiumroys** — "Luminous wellness products. Vintage formulations, modern packaging."
- **mostlysterile** — "Medical-grade supplies at approximately sterile conditions."

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/sovereignwellness/config.ts src/sites/radiumroys/config.ts \
        src/sites/mostlysterile/config.ts
git commit -m "feat(apex): assign health-wellness vertical and tagline to 3 sites"
```

---

## Task 7: Populate verticalKey and tagline on Subscription sites

**Files:**
- Modify: 2 config files

Sites (all get `verticalKey: "subscription-services"`):
1. onlyfans
2. onlypans

- [ ] **Step 1: Edit both config.ts files**

Taglines:
- **onlyfans** — "Oscillating box fans delivered monthly to your door."
- **onlypans** — "Curated cookware, billed quarterly, non-cancelable by design."

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/onlyfans/config.ts src/sites/onlypans/config.ts
git commit -m "feat(apex): assign subscription-services vertical to onlyfans/onlypans"
```

---

## Task 8: Populate verticalKey and tagline on Professional Services + Emerging Ventures sites

**Files:**
- Modify: 11 config files

Sites (all get `verticalKey: "professional-services"`):
1. strategicvoid
2. stratify
3. grassfedwifi
4. privatrix
5. pettential
6. elderparty
7. oddoccasions
8. meh
9. cleansheet
10. squaredaway
11. mousetrapjenga

- [ ] **Step 1: Edit all 11 config.ts files**

Taglines:
- **strategicvoid** — "Consulting services for organizations not yet ready for outcomes."
- **stratify** — "Enterprise stratification. We separate what does not need to be combined."
- **grassfedwifi** — "Artisanal home internet. Pastured routers, heritage bandwidth."
- **privatrix** — "Privacy-first tooling for people who prefer not to be consulted."
- **pettential** — "Pet companionship services across every taxonomic kingdom."
- **elderparty** — "Event planning tailored exclusively to the 75-and-over demographic."
- **oddoccasions** — "Event services for occasions that fall outside standard categories."
- **meh** — "Underreacting, professionally, on your behalf."
- **cleansheet** — "Bedding rentals for life milestones that warrant fresh linens."
- **squaredaway** — "Organization consulting. We put things where they belong."
- **mousetrapjenga** — "Tactical small-mammal removal through precision architecture."

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/strategicvoid/config.ts src/sites/stratify/config.ts \
        src/sites/grassfedwifi/config.ts src/sites/privatrix/config.ts \
        src/sites/pettential/config.ts src/sites/elderparty/config.ts \
        src/sites/oddoccasions/config.ts src/sites/meh/config.ts \
        src/sites/cleansheet/config.ts src/sites/squaredaway/config.ts \
        src/sites/mousetrapjenga/config.ts
git commit -m "feat(apex): assign professional-services vertical and tagline to 11 sites"
```

---

## Task 9: Create portfolio-utils helper

**Files:**
- Create: `src/sites/apex/data/portfolio-utils.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/sites/apex/data/portfolio-utils.ts
import type { SiteConfig, VerticalKey } from "@/themes"
import { siteRegistry } from "@/sites/registry"
import { featuredHoldings } from "./featured"
import { verticalOrder } from "./verticals"

export interface PortfolioBrand {
  subdomain: string
  config: SiteConfig
  isFeatured: boolean
}

/**
 * Iterates siteRegistry, returns all brands (non-apex, has verticalKey).
 */
export function getAllPortfolioBrands(): PortfolioBrand[] {
  const featuredSet = new Set(featuredHoldings)
  return Object.entries(siteRegistry)
    .filter(([key, site]) => key !== "apex" && !!site.config.verticalKey)
    .map(([subdomain, site]) => ({
      subdomain,
      config: site.config,
      isFeatured: featuredSet.has(subdomain),
    }))
}

/**
 * Groups portfolio brands by vertical, in fixed display order.
 * Brands inside each vertical are sorted alphabetically by name.
 */
export function groupBrandsByVertical(): Record<VerticalKey, PortfolioBrand[]> {
  const brands = getAllPortfolioBrands()
  const grouped: Record<VerticalKey, PortfolioBrand[]> = {
    "consumer-goods": [],
    "hygiene": [],
    "health-wellness": [],
    "subscription-services": [],
    "professional-services": [],
  }
  for (const brand of brands) {
    const key = brand.config.verticalKey
    if (key) grouped[key].push(brand)
  }
  for (const key of verticalOrder) {
    grouped[key].sort((a, b) => a.config.name.localeCompare(b.config.name))
  }
  return grouped
}

/**
 * Returns brands matching a specific vertical (or all if verticalKey is null).
 */
export function getBrandsInVertical(
  verticalKey: VerticalKey | null
): PortfolioBrand[] {
  const brands = getAllPortfolioBrands()
  if (verticalKey === null) return brands
  return brands.filter((b) => b.config.verticalKey === verticalKey)
}

/**
 * Returns the total count of portfolio brands (non-apex, has verticalKey).
 */
export function getPortfolioCount(): number {
  return getAllPortfolioBrands().length
}
```

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/apex/data/portfolio-utils.ts
git commit -m "feat(apex): add portfolio-utils helpers for registry iteration"
```

---

## Task 10: Create BrandCard component

**Files:**
- Create: `src/components/ui/brand-card.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/brand-card.tsx
import Image from "next/image"
import type { SiteConfig } from "@/themes"

export interface BrandCardProps {
  subdomain: string
  config: SiteConfig
  href: string
  compact?: boolean
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max - 1).trimEnd() + "…"
}

export function BrandCard({ subdomain, config, href, compact = false }: BrandCardProps) {
  const tagline = config.tagline ?? truncate(config.metadata.description, 80)
  const accent = config.theme.colors.primary

  return (
    <a
      href={href}
      className={
        compact
          ? "group flex items-start gap-3 p-4 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors h-full"
          : "group flex items-start gap-4 p-5 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors h-full"
      }
      style={{ borderTopColor: accent, borderTopWidth: "3px" }}
    >
      <div className={compact ? "relative w-10 h-10 flex-shrink-0" : "relative w-12 h-12 flex-shrink-0"}>
        <Image
          src={`/sites/${subdomain}/favicon.png`}
          alt={`${config.name} logo`}
          fill
          sizes={compact ? "40px" : "48px"}
          className="object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={compact ? "text-base font-heading font-semibold text-primary mb-1 leading-tight" : "text-lg font-heading font-semibold text-primary mb-1 leading-tight"}>
          {config.name}
        </h3>
        <p className={compact ? "text-xs text-foreground/60 leading-snug" : "text-sm text-foreground/70 leading-snug"}>
          {tagline}
        </p>
      </div>
    </a>
  )
}
```

- [ ] **Step 2: Type check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS on both.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/brand-card.tsx
git commit -m "feat(ui): add BrandCard component for apex portfolio surfaces"
```

---

## Task 11: Create VerticalSection component

**Files:**
- Create: `src/components/ui/vertical-section.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/vertical-section.tsx
import { BrandCard } from "./brand-card"
import type { PortfolioBrand } from "@/sites/apex/data/portfolio-utils"
import type { VerticalMeta } from "@/sites/apex/data/verticals"

export interface VerticalSectionProps {
  meta: VerticalMeta
  brands: PortfolioBrand[]
  hrefFor: (subdomain: string) => string
  showViewAllLink?: boolean
  viewAllHref?: string
}

export function VerticalSection({
  meta,
  brands,
  hrefFor,
  showViewAllLink = false,
  viewAllHref,
}: VerticalSectionProps) {
  if (brands.length === 0) return null

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
            {meta.displayName}
          </h2>
          <span className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-heading">
            {brands.length} {brands.length === 1 ? "brand" : "brands"}
          </span>
        </div>
        <p className="text-foreground/70 leading-relaxed max-w-3xl mb-8">
          {meta.shortDescription}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <BrandCard
              key={brand.subdomain}
              subdomain={brand.subdomain}
              config={brand.config}
              href={hrefFor(brand.subdomain)}
              compact
            />
          ))}
        </div>
        {showViewAllLink && viewAllHref && (
          <div className="mt-6">
            <a
              href={viewAllHref}
              className="text-sm font-heading text-primary hover:underline"
            >
              View all in {meta.displayName} →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/vertical-section.tsx
git commit -m "feat(ui): add VerticalSection component for apex portfolio grouping"
```

---

## Task 12: Create Portfolio page

**Files:**
- Create: `src/sites/apex/pages/portfolio.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/sites/apex/pages/portfolio.tsx
"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Hero } from "@/components/ui/hero"
import { BrandCard } from "@/components/ui/brand-card"
import { verticals, verticalOrder } from "../data/verticals"
import { getAllPortfolioBrands } from "../data/portfolio-utils"
import type { VerticalKey } from "@/themes"

const PRODUCTION_HOST = "specificindustries.com"

type SortKey = "a-z" | "featured"

export default function ApexPortfolio() {
  const searchParams = useSearchParams()
  const verticalParam = searchParams.get("vertical") as VerticalKey | null

  const [activeVertical, setActiveVertical] = useState<VerticalKey | null>(
    verticalParam && verticalOrder.includes(verticalParam) ? verticalParam : null
  )
  const [sort, setSort] = useState<SortKey>("a-z")

  const allBrands = useMemo(() => getAllPortfolioBrands(), [])

  const visibleBrands = useMemo(() => {
    const filtered = activeVertical
      ? allBrands.filter((b) => b.config.verticalKey === activeVertical)
      : allBrands
    const copy = [...filtered]
    if (sort === "featured") {
      copy.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1
        return a.config.name.localeCompare(b.config.name)
      })
    } else {
      copy.sort((a, b) => a.config.name.localeCompare(b.config.name))
    }
    return copy
  }, [allBrands, activeVertical, sort])

  // Group for unfiltered view
  const grouped = useMemo(() => {
    const map: Record<VerticalKey, typeof visibleBrands> = {
      "consumer-goods": [],
      "hygiene": [],
      "health-wellness": [],
      "subscription-services": [],
      "professional-services": [],
    }
    for (const brand of visibleBrands) {
      const key = brand.config.verticalKey
      if (key) map[key].push(brand)
    }
    return map
  }, [visibleBrands])

  function brandHref(subdomain: string): string {
    if (typeof window !== "undefined" && window.location.hostname.endsWith(PRODUCTION_HOST)) {
      return `https://${subdomain}.${PRODUCTION_HOST}`
    }
    return `/?site=${subdomain}`
  }

  return (
    <>
      <Hero
        headline="Portfolio Holdings"
        subheadline={`${allBrands.length} active portfolio brands across five strategic verticals.`}
      />

      {/* Sticky filter bar */}
      <section className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-foreground/10 py-3">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveVertical(null)}
            className={
              activeVertical === null
                ? "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider bg-primary text-background"
                : "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider border border-foreground/20 text-foreground/70 hover:border-foreground/40"
            }
          >
            All
          </button>
          {verticalOrder.map((key) => (
            <button
              key={key}
              onClick={() => setActiveVertical(key)}
              className={
                activeVertical === key
                  ? "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider bg-primary text-background"
                  : "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider border border-foreground/20 text-foreground/70 hover:border-foreground/40"
              }
            >
              {verticals[key].displayName}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <label className="text-xs font-heading uppercase tracking-wider text-foreground/50">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-xs font-heading uppercase tracking-wider bg-background border border-foreground/20 rounded px-2 py-1"
            >
              <option value="a-z">A–Z</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      {activeVertical === null ? (
        <div className="py-8">
          {verticalOrder.map((key) => {
            const brands = grouped[key]
            if (brands.length === 0) return null
            const meta = verticals[key]
            return (
              <section key={key} className="py-10">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                      {meta.displayName}
                    </h2>
                    <span className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-heading">
                      {brands.length} {brands.length === 1 ? "brand" : "brands"}
                    </span>
                  </div>
                  <p className="text-foreground/70 leading-relaxed max-w-3xl mb-2">
                    {meta.shortDescription}
                  </p>
                  <p className="text-xs italic text-foreground/50 mb-6 max-w-3xl">
                    Thesis: {meta.thesis}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {brands.map((brand) => (
                      <BrandCard
                        key={brand.subdomain}
                        subdomain={brand.subdomain}
                        config={brand.config}
                        href={brandHref(brand.subdomain)}
                        compact
                      />
                    ))}
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-foreground/70 leading-relaxed max-w-3xl mb-6">
              {verticals[activeVertical].shortDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {visibleBrands.map((brand) => (
                <BrandCard
                  key={brand.subdomain}
                  subdomain={brand.subdomain}
                  config={brand.config}
                  href={brandHref(brand.subdomain)}
                  compact
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-heading font-bold text-primary mb-3">
            Missing from our portfolio?
          </h3>
          <p className="text-foreground/70 mb-6">
            If you believe your industry meets our evaluation criteria, we are currently accepting submissions for strategic consideration.
          </p>
          <a
            href="/partnerships"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-background font-heading font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Submit Your Industry for Evaluation
          </a>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Type check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/apex/pages/portfolio.tsx
git commit -m "feat(apex): add /portfolio page with filter chips and sort"
```

---

## Task 13: Register Portfolio page in apex barrel

**Files:**
- Modify: `src/sites/apex/index.ts`

- [ ] **Step 1: Edit the barrel**

Add the import and an entry in the `pages` object:

```typescript
import ApexPortfolio from "./pages/portfolio"
```

And inside `pages`:

```typescript
  "portfolio": {
    component: ApexPortfolio,
    metadata: {
      title: "Portfolio — Specific Industries",
      description: "Our portfolio of brands serving the world's most specific industries, organized across five strategic verticals.",
    },
  },
```

Place the new entry between `""` (home) and `"about"` so nav order matches registry order.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/apex/index.ts
git commit -m "feat(apex): register /portfolio page in barrel"
```

---

## Task 14: Add Portfolio to apex nav

**Files:**
- Modify: `src/sites/apex/config.ts`

- [ ] **Step 1: Edit the nav array**

Replace the `nav` array with:

```typescript
  nav: [
    { label: "Home", path: "/" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "About", path: "/about" },
    { label: "Disclaimer", path: "/disclaimer" },
  ],
```

(Later plans will add Thesis / Newsroom / Partnerships / Careers and move Disclaimer to a footer.)

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/apex/config.ts
git commit -m "feat(apex): add Portfolio to top nav"
```

---

## Task 15: Full verification build

- [ ] **Step 1: Run full verification**

Run all three:
```bash
npm run lint
npx tsc --noEmit
npm run build
```
Expected: all PASS.

- [ ] **Step 2: If build fails, diagnose and fix**

Common issues:
- A site config missed `verticalKey` → add it
- Type mismatch in a helper → check imports/exports
- Missing favicon for a site → check `public/sites/<subdomain>/favicon.png`

Fix any issues inline and re-run. Do not skip this verification.

- [ ] **Step 3: No commit needed if all passes.** If fixes were applied, commit them:

```bash
git commit -am "fix(apex): address issues surfaced by full build"
```

---

## Plan 1 Complete

At this point:
- `VerticalKey` type exists; all 27 non-apex sites have `verticalKey` + `tagline`
- `/portfolio` page is live, filters work, sort works
- Apex nav shows Home / Portfolio / About / Disclaimer
- Build passes

**Next:** Plan 2 — Leadership system (leader detail pages + Board Positions + backfill on 10 subsites).
