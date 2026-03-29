# Strategic Void Consulting — Plan 1: Infrastructure & Scaffold

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all shared infrastructure, new components, and site scaffold with one solution area (Meeting Optimization) as end-to-end proof of concept.

**Architecture:** Data-driven templates with composable section libraries. Extend shared types (DynamicRoute, SiteConfig) for multi-segment routing and mega-menu navigation. All new UI components are theme-aware via CSS variables. One solution area is fully populated with satirical content to prove the entire system works end-to-end.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, React Context, SVG charts, localStorage

**Spec:** `docs/superpowers/specs/2026-03-29-strategicvoid-site-design.md`

**Subsequent Plans:**
- Plan 2: Solution Content & Core Pages (all 8 solutions, 34 products, unique pages)
- Plan 3: Case Studies (16 case study data files)
- Plan 4: Whitepapers (24 whitepaper data files)
- Plan 5: Image Generation (70-80 MCP-generated images)

---

## File Map

### Shared Infrastructure (modify)
- `src/themes/index.ts` — Add `MegaMenuItem`, `MegaMenuChild` interfaces; extend `SiteConfig` with optional `megaMenu`; extend `DynamicRoute` with `segments?` and `maxSegments`
- `src/app/[[...slug]]/page.tsx` — Support multi-segment dynamic routes
- `src/components/layout/header.tsx` — Conditional MegaMenu rendering
- `src/sites/registry.ts` — Register strategicvoid

### New Shared Components (create)
- `src/components/layout/mega-menu.tsx`
- `src/components/ui/solution-card.tsx`
- `src/components/ui/executive-card.tsx`
- `src/components/ui/case-study-card.tsx`
- `src/components/ui/whitepaper-card.tsx`
- `src/components/ui/metric-counter.tsx`
- `src/components/ui/enterprise-pricing-table.tsx`
- `src/components/ui/email-gate-form.tsx`

### Content Section Components (create)
- `src/components/content-sections/data-chart.tsx`
- `src/components/content-sections/case-hero.tsx`
- `src/components/content-sections/challenge.tsx`
- `src/components/content-sections/approach.tsx`
- `src/components/content-sections/approach-timeline.tsx`
- `src/components/content-sections/results-grid.tsx`
- `src/components/content-sections/before-after.tsx`
- `src/components/content-sections/executive-quote.tsx`
- `src/components/content-sections/client-quote.tsx`
- `src/components/content-sections/callout.tsx`
- `src/components/content-sections/wp-hero.tsx`
- `src/components/content-sections/prose.tsx`
- `src/components/content-sections/section-header.tsx`
- `src/components/content-sections/key-insight.tsx`
- `src/components/content-sections/pull-quote.tsx`
- `src/components/content-sections/methodology-diagram.tsx`
- `src/components/content-sections/sidebar-note.tsx`
- `src/components/content-sections/footnotes.tsx`
- `src/components/content-sections/author-bio.tsx`
- `src/components/content-sections/section-renderer.tsx`

### Site Files (create)
- `src/sites/strategicvoid/config.ts`
- `src/sites/strategicvoid/index.ts`
- `src/sites/strategicvoid/data/types.ts`
- `src/sites/strategicvoid/data/solutions.ts`
- `src/sites/strategicvoid/data/products.ts`
- `src/sites/strategicvoid/data/leadership.ts`
- `src/sites/strategicvoid/data/pricing.ts`
- `src/sites/strategicvoid/data/case-studies/index.ts`
- `src/sites/strategicvoid/data/case-studies/globaltech-meeting-optimization.ts`
- `src/sites/strategicvoid/data/whitepapers/index.ts`
- `src/sites/strategicvoid/data/whitepapers/state-of-meeting-optimization.ts`
- `src/sites/strategicvoid/pages/home.tsx`
- `src/sites/strategicvoid/pages/solutions-index.tsx`
- `src/sites/strategicvoid/pages/solution-page.tsx`
- `src/sites/strategicvoid/pages/solution-router.tsx`
- `src/sites/strategicvoid/pages/product-detail.tsx`
- `src/sites/strategicvoid/pages/case-studies-index.tsx`
- `src/sites/strategicvoid/pages/case-study-page.tsx`
- `src/sites/strategicvoid/pages/whitepapers-index.tsx`
- `src/sites/strategicvoid/pages/whitepaper-page.tsx`

---

## Task 1: Extend Shared Types

**Files:**
- Modify: `src/themes/index.ts`

- [ ] **Step 1: Add MegaMenu types and extend SiteConfig**

Add these interfaces and update `SiteConfig`:

```typescript
// Add after NavItem interface
export interface MegaMenuChild {
  label: string
  path: string
  description?: string
  icon?: string
}

export interface MegaMenuItem {
  label: string
  path?: string
  children?: MegaMenuChild[]
  style?: "mega" | "dropdown"
}

export interface MegaMenuConfig {
  items: MegaMenuItem[]
}
```

Update `SiteConfig` to add optional megaMenu:

```typescript
export interface SiteConfig {
  name: string
  subdomain: string
  theme: SiteTheme
  metadata: SiteMetadata
  nav: NavItem[]
  features: {
    commerce: boolean
  }
  megaMenu?: MegaMenuConfig  // Add this line
}
```

- [ ] **Step 2: Extend DynamicRoute for multi-segment support**

Update the `DynamicRoute` interface:

```typescript
export interface DynamicRoute {
  component: React.ComponentType<{ slug: string; segments?: string[] }>
  getMetadata?: (slug: string, segments?: string[]) => PageMetadata | undefined
  isValidSlug?: (slug: string, segments?: string[]) => boolean
  maxSegments?: number
}
```

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS (changes are additive/optional, existing sites unaffected)

- [ ] **Step 4: Commit**

```bash
git add src/themes/index.ts
git commit -m "feat: extend shared types for mega-menu and multi-segment routing"
```

---

## Task 2: Update Catch-All Route for Multi-Segment Dynamic Routes

**Files:**
- Modify: `src/app/[[...slug]]/page.tsx`

- [ ] **Step 1: Update the dynamic route resolution in CatchAllPage**

Replace the current dynamic route block (the `segments.length === 2` check) with multi-segment support:

```typescript
// Check dynamic routes (e.g., /products/slug or /solutions/area/product)
const segments = path.split("/")
if (segments.length >= 2 && site.dynamicRoutes?.[segments[0]]) {
  const route = site.dynamicRoutes[segments[0]]
  const maxSegs = route.maxSegments ?? 1
  const dynamicSegments = segments.slice(1)

  if (dynamicSegments.length >= 1 && dynamicSegments.length <= maxSegs) {
    const primarySlug = dynamicSegments[0]
    if (route.isValidSlug && !route.isValidSlug(primarySlug, dynamicSegments.length > 1 ? dynamicSegments : undefined)) {
      notFound()
    }
    const DynamicComponent = route.component
    return <DynamicComponent slug={primarySlug} segments={dynamicSegments} />
  }
}
```

- [ ] **Step 2: Update generateMetadata similarly**

Apply the same multi-segment logic to the `generateMetadata` function's dynamic route check:

```typescript
if (!pageMetadata && !pageEntry) {
  const segments = path.split("/")
  if (segments.length >= 2 && site.dynamicRoutes?.[segments[0]]) {
    const route = site.dynamicRoutes[segments[0]]
    const maxSegs = route.maxSegments ?? 1
    const dynamicSegments = segments.slice(1)

    if (dynamicSegments.length >= 1 && dynamicSegments.length <= maxSegs) {
      const primarySlug = dynamicSegments[0]
      const dynamicMeta = route.getMetadata?.(primarySlug, dynamicSegments.length > 1 ? dynamicSegments : undefined)
      if (dynamicMeta) {
        return {
          title: dynamicMeta.title || site.config.metadata.title,
          description: dynamicMeta.description || site.config.metadata.description,
          openGraph: {
            title: dynamicMeta.title || site.config.metadata.title,
            description: dynamicMeta.description || site.config.metadata.description,
            images: site.config.metadata.ogImage ? [site.config.metadata.ogImage] : [],
          },
          other: {
            classification: "satire, entertainment, humor",
          },
        }
      }
    }
  }
}
```

- [ ] **Step 3: Run type check and verify existing sites still work**

Run: `npx tsc --noEmit`
Expected: PASS

Run: `npm run dev` — test `localhost:3000/?site=pigmilk`, navigate to `/products/classic-pig-milk?site=pigmilk`
Expected: Existing product detail pages still resolve correctly

- [ ] **Step 4: Commit**

```bash
git add src/app/[[...slug]]/page.tsx
git commit -m "feat: support multi-segment dynamic routes in catch-all"
```

---

## Task 3: Build MegaMenu Component

**Files:**
- Create: `src/components/layout/mega-menu.tsx`

- [ ] **Step 1: Create the MegaMenu component**

This is a `"use client"` component that renders a desktop mega-menu and mobile accordion from a `MegaMenuConfig`. Key behaviors:
- Desktop: top-level items render as buttons/links. Items with `children` show a dropdown panel on hover/click. `style: "mega"` shows a full-width grid panel. `style: "dropdown"` shows a simple vertical list.
- Mobile: items with children render as expandable accordion sections.
- Theme-aware via CSS variables (text-foreground, bg-background, border-primary, etc.).
- The component receives `megaMenu: MegaMenuConfig` and `siteHref` function as props.

```typescript
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import type { MegaMenuConfig, MegaMenuItem } from "@/themes"

interface MegaMenuProps {
  megaMenu: MegaMenuConfig
  siteHref: (path: string) => string
}

export function MegaMenu({ megaMenu, siteHref }: MegaMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <nav ref={menuRef} className="hidden md:flex items-center gap-1">
      {megaMenu.items.map((item, i) => (
        <MegaMenuItemDesktop
          key={item.label}
          item={item}
          siteHref={siteHref}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          onClose={() => setOpenIndex(null)}
        />
      ))}
    </nav>
  )
}

function MegaMenuItemDesktop({
  item,
  siteHref,
  isOpen,
  onToggle,
  onClose,
}: {
  item: MegaMenuItem
  siteHref: (path: string) => string
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) {
  if (!item.children) {
    return (
      <Link
        href={siteHref(item.path || "/")}
        className="text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-md transition-all text-sm"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-md transition-all text-sm flex items-center gap-1"
      >
        {item.label}
        <svg className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 bg-background border border-primary/10 rounded-lg shadow-xl z-50 animate-fade-in ${
          item.style === "mega" ? "left-1/2 -translate-x-1/2 w-[800px]" : "w-56"
        }`}>
          {item.style === "mega" ? (
            <div className="grid grid-cols-2 gap-1 p-4">
              {item.children.map((child) => (
                <Link
                  key={child.path}
                  href={siteHref(child.path)}
                  onClick={onClose}
                  className="flex flex-col gap-1 p-3 rounded-md hover:bg-primary/5 transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground">{child.label}</span>
                  {child.description && (
                    <span className="text-xs text-foreground/50">{child.description}</span>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-2">
              {item.children.map((child) => (
                <Link
                  key={child.path}
                  href={siteHref(child.path)}
                  onClick={onClose}
                  className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-primary/5 transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Mobile accordion version
export function MegaMenuMobile({
  megaMenu,
  siteHref,
  onNavigate,
}: {
  megaMenu: MegaMenuConfig
  siteHref: (path: string) => string
  onNavigate: () => void
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-1">
      {megaMenu.items.map((item, i) => (
        <div key={item.label}>
          {item.children ? (
            <>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-md transition-all flex items-center justify-between"
              >
                {item.label}
                <svg className={`w-3 h-3 transition-transform ${openIndex === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="ml-4 flex flex-col gap-1 mt-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={siteHref(child.path)}
                      onClick={onNavigate}
                      className="text-foreground/50 hover:text-foreground px-3 py-1 text-sm rounded-md transition-all"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link
              href={siteHref(item.path || "/")}
              onClick={onNavigate}
              className="text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-md transition-all"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/mega-menu.tsx
git commit -m "feat: add MegaMenu shared component with desktop and mobile support"
```

---

## Task 4: Update Header to Support MegaMenu

**Files:**
- Modify: `src/components/layout/header.tsx`

- [ ] **Step 1: Import MegaMenu and conditionally render it**

Add imports at the top:

```typescript
import { MegaMenu, MegaMenuMobile } from "@/components/layout/mega-menu"
```

In the desktop nav section, wrap the existing nav loop with a conditional:

```typescript
{/* Desktop nav */}
<div className="hidden md:flex items-center gap-6">
  {config.megaMenu ? (
    <MegaMenu megaMenu={config.megaMenu} siteHref={siteHref} />
  ) : (
    config.nav.map((item) => (
      <Link
        key={item.path}
        href={siteHref(item.path)}
        className="text-foreground/70 hover:text-foreground hover:bg-primary/10 px-3 py-1.5 rounded-md transition-all"
      >
        {item.label}
      </Link>
    ))
  )}
  {config.features.commerce && <CartButton />}
</div>
```

In the mobile menu section, similarly:

```typescript
{mobileOpen && (
  <div className="md:hidden border-t border-primary/10 bg-background">
    <div className="px-4 py-4">
      {config.megaMenu ? (
        <MegaMenuMobile
          megaMenu={config.megaMenu}
          siteHref={siteHref}
          onNavigate={() => setMobileOpen(false)}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {config.nav.map((item) => (
            <Link
              key={item.path}
              href={siteHref(item.path)}
              onClick={() => setMobileOpen(false)}
              className="text-foreground/70 hover:text-foreground hover:bg-primary/10 px-3 py-1.5 rounded-md transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
)}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Verify existing sites are unaffected**

Run: `npm run dev` — check pigmilk and inflatableanchors still render correctly
Expected: Unchanged behavior (no megaMenu in their configs)

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/header.tsx
git commit -m "feat: add MegaMenu support to Header with fallback to flat nav"
```

---

## Task 5: Build New Shared UI Components

**Files:**
- Create: `src/components/ui/solution-card.tsx`
- Create: `src/components/ui/executive-card.tsx`
- Create: `src/components/ui/case-study-card.tsx`
- Create: `src/components/ui/whitepaper-card.tsx`
- Create: `src/components/ui/metric-counter.tsx`
- Create: `src/components/ui/enterprise-pricing-table.tsx`
- Create: `src/components/ui/email-gate-form.tsx`

- [ ] **Step 1: Create SolutionCard**

```typescript
// src/components/ui/solution-card.tsx
"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

interface SolutionCardProps {
  name: string
  tagline: string
  productCount: number
  slug: string
  icon?: string
}

export function SolutionCard({ name, tagline, productCount, slug, icon }: SolutionCardProps) {
  const siteHref = useSiteLink()

  return (
    <Link
      href={siteHref(`/solutions/${slug}`)}
      className="block border border-primary/10 rounded-lg p-6 hover:border-accent/40 hover:bg-primary/5 transition-all group"
    >
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
        {name}
      </h3>
      <p className="text-sm text-foreground/60 mt-1 mb-3">{tagline}</p>
      <p className="text-xs text-foreground/40">{productCount} products</p>
    </Link>
  )
}
```

- [ ] **Step 2: Create ExecutiveCard**

```typescript
// src/components/ui/executive-card.tsx
import Image from "next/image"

interface ExecutiveCardProps {
  name: string
  title: string
  credentials: string
  bio: string
  quote: string
  image: string
}

export function ExecutiveCard({ name, title, credentials, bio, quote, image }: ExecutiveCardProps) {
  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden">
      <div className="relative aspect-[3/4] bg-secondary/10">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-accent font-medium mt-1">{title}</p>
        <p className="text-xs text-foreground/40 mt-1">{credentials}</p>
        <p className="text-sm text-foreground/60 mt-3">{bio}</p>
        <blockquote className="mt-4 pl-3 border-l-2 border-accent/30 text-sm italic text-foreground/50">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create CaseStudyCard**

```typescript
// src/components/ui/case-study-card.tsx
"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

interface CaseStudyCardProps {
  slug: string
  company: string
  heroStat: { value: string; label: string }
  solutionArea: string
  summary: string
}

export function CaseStudyCard({ slug, company, heroStat, solutionArea, summary }: CaseStudyCardProps) {
  const siteHref = useSiteLink()

  return (
    <Link
      href={siteHref(`/case-studies/${slug}`)}
      className="block border border-primary/10 rounded-lg p-6 hover:border-accent/40 transition-all group"
    >
      <span className="inline-block text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded mb-3">
        {solutionArea}
      </span>
      <div className="mb-3">
        <span className="text-3xl font-heading font-bold text-accent">{heroStat.value}</span>
        <span className="text-sm text-foreground/50 ml-2">{heroStat.label}</span>
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
        {company}
      </h3>
      <p className="text-sm text-foreground/60 mt-2">{summary}</p>
    </Link>
  )
}
```

- [ ] **Step 4: Create WhitepaperCard**

```typescript
// src/components/ui/whitepaper-card.tsx
"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

interface WhitepaperCardProps {
  slug: string
  title: string
  type: "strategic" | "product"
  solutionArea: string
  readTime: string
  authors: string[]
}

export function WhitepaperCard({ slug, title, type, solutionArea, readTime, authors }: WhitepaperCardProps) {
  const siteHref = useSiteLink()

  return (
    <Link
      href={siteHref(`/whitepapers/${slug}`)}
      className="block border border-primary/10 rounded-lg p-6 hover:border-accent/40 transition-all group"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded">
          {type === "strategic" ? "Strategic" : "Product"}
        </span>
        <span className="text-xs text-foreground/40">{solutionArea}</span>
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
        {title}
      </h3>
      <div className="flex items-center gap-3 mt-3 text-xs text-foreground/40">
        <span>{readTime}</span>
        <span>·</span>
        <span>{authors.join(", ")}</span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 5: Create MetricCounter**

The existing `AnimatedCounter` component uses IntersectionObserver and counts up. Extend that pattern with prefix/suffix support:

```typescript
// src/components/ui/metric-counter.tsx
"use client"

import { useEffect, useRef, useState } from "react"

interface MetricCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
}

export function MetricCounter({ value, label, prefix = "", suffix = "", duration = 2000 }: MetricCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = performance.now()
          function animate(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-heading font-bold text-accent">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-foreground/50 mt-1">{label}</div>
    </div>
  )
}
```

- [ ] **Step 6: Create EnterprisePricingTable**

```typescript
// src/components/ui/enterprise-pricing-table.tsx
"use client"

interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

interface PricingFeatureRow {
  label: string
  values: (boolean | string)[]  // one per tier
}

interface EnterprisePricingTableProps {
  tiers: PricingTier[]
  featureRows?: PricingFeatureRow[]
  highlightedTier?: number
}

export function EnterprisePricingTable({ tiers, featureRows, highlightedTier }: EnterprisePricingTableProps) {
  return (
    <div className="overflow-x-auto">
      {/* Tier cards */}
      <div className={`grid gap-4 mb-8`} style={{ gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` }}>
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            className={`border rounded-lg p-6 ${
              i === highlightedTier
                ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                : "border-primary/10"
            }`}
          >
            {i === highlightedTier && (
              <span className="inline-block text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded mb-3">
                Recommended
              </span>
            )}
            <h3 className="text-lg font-heading font-semibold text-foreground">{tier.name}</h3>
            <div className="text-2xl font-bold text-accent mt-2">{tier.price}</div>
            <p className="text-sm text-foreground/50 mt-2">{tier.description}</p>
            <ul className="mt-4 space-y-2">
              {tier.features.map((f) => (
                <li key={f} className="text-sm text-foreground/70 flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full mt-6 py-2 px-4 rounded-md text-sm font-medium bg-accent text-background hover:bg-accent/90 transition-colors">
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Feature comparison matrix */}
      {featureRows && featureRows.length > 0 && (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary/10">
              <th className="text-left py-3 px-4 text-foreground/50 font-normal">Feature</th>
              {tiers.map((tier) => (
                <th key={tier.name} className="text-center py-3 px-4 text-foreground font-semibold">
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureRows.map((row) => (
              <tr key={row.label} className="border-b border-primary/5">
                <td className="py-3 px-4 text-foreground/70">{row.label}</td>
                {row.values.map((val, i) => (
                  <td key={i} className="text-center py-3 px-4">
                    {typeof val === "boolean" ? (
                      val ? <span className="text-accent">✓</span> : <span className="text-foreground/20">—</span>
                    ) : (
                      <span className="text-foreground/70">{val}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
```

- [ ] **Step 7: Create EmailGateForm**

```typescript
// src/components/ui/email-gate-form.tsx
"use client"

import { useState, useEffect } from "react"

interface EmailGateFormProps {
  title: string
  subtitle: string
  storageKey: string
  children: React.ReactNode
}

export function EmailGateForm({ title, subtitle, storageKey, children }: EmailGateFormProps) {
  const [gated, setGated] = useState(true)
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(storageKey)) {
      setGated(false)
    }
  }, [storageKey])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      localStorage.setItem(storageKey, "true")
      setGated(false)
    }
  }

  if (!gated) return <>{children}</>

  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="blur-sm pointer-events-none select-none max-h-[400px] overflow-hidden">
        {children}
      </div>

      {/* Gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="max-w-md w-full mx-4 p-8 border border-primary/10 rounded-lg bg-background shadow-xl">
          <h3 className="text-xl font-heading font-semibold text-foreground text-center">{title}</h3>
          <p className="text-sm text-foreground/50 text-center mt-2">{subtitle}</p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your corporate email"
              className="w-full px-4 py-2 border border-primary/20 rounded-md bg-background text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-sm font-medium bg-accent text-background hover:bg-accent/90 transition-colors"
            >
              Download Whitepaper
            </button>
            <p className="text-xs text-foreground/30 text-center">
              Your data will be leveraged across our synergy ecosystem.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/components/ui/solution-card.tsx src/components/ui/executive-card.tsx src/components/ui/case-study-card.tsx src/components/ui/whitepaper-card.tsx src/components/ui/metric-counter.tsx src/components/ui/enterprise-pricing-table.tsx src/components/ui/email-gate-form.tsx
git commit -m "feat: add shared UI components for Strategic Void site"
```

---

## Task 6: Build Content Section Components — Case Study Sections

**Files:**
- Create: `src/components/content-sections/case-hero.tsx`
- Create: `src/components/content-sections/challenge.tsx`
- Create: `src/components/content-sections/approach.tsx`
- Create: `src/components/content-sections/approach-timeline.tsx`
- Create: `src/components/content-sections/results-grid.tsx`
- Create: `src/components/content-sections/before-after.tsx`
- Create: `src/components/content-sections/executive-quote.tsx`
- Create: `src/components/content-sections/client-quote.tsx`
- Create: `src/components/content-sections/callout.tsx`

- [ ] **Step 1: Create CaseHero**

```typescript
// src/components/content-sections/case-hero.tsx
interface CaseHeroProps {
  stat: { value: string; label: string }
  company: string
  industry: string
  solutionArea: string
}

export function CaseHero({ stat, company, industry, solutionArea }: CaseHeroProps) {
  return (
    <section className="py-16 px-4 text-center">
      <span className="inline-block text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded mb-6">
        {solutionArea}
      </span>
      <div className="text-6xl font-heading font-bold text-accent mb-2">{stat.value}</div>
      <div className="text-lg text-foreground/60 mb-8">{stat.label}</div>
      <h1 className="text-3xl font-heading font-semibold text-foreground max-w-3xl mx-auto">{company}</h1>
      <p className="text-sm text-foreground/40 mt-2">{industry}</p>
    </section>
  )
}
```

- [ ] **Step 2: Create Challenge, Approach, ResultsGrid, BeforeAfter**

```typescript
// src/components/content-sections/challenge.tsx
interface ChallengeProps {
  title?: string
  paragraphs: string[]
}

export function Challenge({ title = "The Challenge", paragraphs }: ChallengeProps) {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">{title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-foreground/70 leading-relaxed mb-4">{p}</p>
      ))}
    </section>
  )
}
```

```typescript
// src/components/content-sections/approach.tsx
interface ApproachProps {
  title?: string
  steps: { name: string; description: string }[]
}

export function Approach({ title = "Our Approach", steps }: ApproachProps) {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-8">{title}</h2>
      <ol className="space-y-6">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{step.name}</h3>
              <p className="text-sm text-foreground/60 mt-1">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
```

```typescript
// src/components/content-sections/results-grid.tsx
interface ResultsGridProps {
  title?: string
  metrics: { value: string; label: string; direction?: "up" | "down" }[]
}

export function ResultsGrid({ title = "Results", metrics }: ResultsGridProps) {
  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {metrics.map((m, i) => (
          <div key={i} className="text-center p-4 border border-primary/10 rounded-lg">
            <div className="text-3xl font-heading font-bold text-accent">
              {m.direction === "up" && "↑ "}{m.direction === "down" && "↓ "}{m.value}
            </div>
            <div className="text-sm text-foreground/50 mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

```typescript
// src/components/content-sections/before-after.tsx
interface BeforeAfterProps {
  title?: string
  before: { label: string; items: string[] }
  after: { label: string; items: string[] }
}

export function BeforeAfter({ title = "Transformation", before, after }: BeforeAfterProps) {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {title && <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">{title}</h2>}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border border-primary/10 rounded-lg bg-primary/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4">{before.label}</h3>
          <ul className="space-y-2">
            {before.items.map((item, i) => (
              <li key={i} className="text-sm text-foreground/60 flex items-start gap-2">
                <span className="text-foreground/30">✗</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 border border-accent/20 rounded-lg bg-accent/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">{after.label}</h3>
          <ul className="space-y-2">
            {after.items.map((item, i) => (
              <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                <span className="text-accent">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create ExecutiveQuote, ClientQuote, Callout**

```typescript
// src/components/content-sections/executive-quote.tsx
import Image from "next/image"

interface ExecutiveQuoteProps {
  quote: string
  name: string
  title: string
  image: string
}

export function ExecutiveQuote({ quote, name, title, image }: ExecutiveQuoteProps) {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 border border-primary/10 rounded-lg">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <blockquote className="text-lg italic text-foreground/80 leading-relaxed">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="mt-3">
            <span className="font-semibold text-foreground">{name}</span>
            <span className="text-foreground/40 ml-2">{title}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

```typescript
// src/components/content-sections/client-quote.tsx
import Image from "next/image"

interface ClientQuoteProps {
  quote: string
  name: string
  role: string
  company: string
  image?: string
}

export function ClientQuote({ quote, name, role, company, image }: ClientQuoteProps) {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-accent/5 rounded-lg">
        {image && (
          <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        )}
        <div>
          <blockquote className="text-foreground/70 italic leading-relaxed">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="mt-3 text-sm">
            <span className="font-semibold text-foreground">{name}</span>
            <span className="text-foreground/40 ml-1">— {role}, {company}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

```typescript
// src/components/content-sections/callout.tsx
interface CalloutProps {
  label?: string
  text: string
}

export function Callout({ label = "Key Insight", text }: CalloutProps) {
  return (
    <section className="py-8 px-4 max-w-3xl mx-auto">
      <div className="border-l-4 border-accent pl-6 py-4">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">{label}</span>
        <p className="text-foreground/80 mt-2 leading-relaxed">{text}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create ApproachTimeline**

```typescript
// src/components/content-sections/approach-timeline.tsx
interface ApproachTimelineProps {
  title?: string
  milestones: { phase: string; title: string; description: string }[]
}

export function ApproachTimeline({ title = "Engagement Timeline", milestones }: ApproachTimelineProps) {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-8">{title}</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/20" />
        <div className="space-y-8">
          {milestones.map((m, i) => (
            <div key={i} className="relative pl-12">
              <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{m.phase}</span>
              <h3 className="font-semibold text-foreground mt-1">{m.title}</h3>
              <p className="text-sm text-foreground/60 mt-1">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run type check and commit**

Run: `npx tsc --noEmit`
Expected: PASS

```bash
git add src/components/content-sections/
git commit -m "feat: add case study content section components"
```

---

## Task 7: Build Content Section Components — Whitepaper Sections + DataChart

**Files:**
- Create: `src/components/content-sections/data-chart.tsx`
- Create: `src/components/content-sections/wp-hero.tsx`
- Create: `src/components/content-sections/prose.tsx`
- Create: `src/components/content-sections/section-header.tsx`
- Create: `src/components/content-sections/key-insight.tsx`
- Create: `src/components/content-sections/pull-quote.tsx`
- Create: `src/components/content-sections/methodology-diagram.tsx`
- Create: `src/components/content-sections/sidebar-note.tsx`
- Create: `src/components/content-sections/footnotes.tsx`
- Create: `src/components/content-sections/author-bio.tsx`

- [ ] **Step 1: Create DataChart (SVG-based)**

```typescript
// src/components/content-sections/data-chart.tsx
"use client"

interface DataPoint {
  label: string
  value: number
}

interface DataChartProps {
  type: "bar" | "line" | "pie" | "area"
  data: DataPoint[]
  title: string
  xLabel?: string
  yLabel?: string
}

export function DataChart({ type, data, title, xLabel, yLabel }: DataChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))
  const chartWidth = 600
  const chartHeight = 300
  const padding = { top: 20, right: 20, bottom: 60, left: 60 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  return (
    <section className="py-8 px-4 max-w-3xl mx-auto">
      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/40 text-center mb-4">{title}</h3>
      <div className="border border-primary/10 rounded-lg p-4 bg-primary/5">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
          {/* Y-axis label */}
          {yLabel && (
            <text x={15} y={chartHeight / 2} textAnchor="middle" transform={`rotate(-90 15 ${chartHeight / 2})`}
              className="fill-foreground/30 text-[10px]">{yLabel}</text>
          )}

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <line key={pct}
              x1={padding.left} y1={padding.top + innerHeight * (1 - pct)}
              x2={padding.left + innerWidth} y2={padding.top + innerHeight * (1 - pct)}
              stroke="currentColor" className="text-foreground/10" strokeDasharray="4 4" />
          ))}

          {type === "bar" && data.map((d, i) => {
            const barWidth = innerWidth / data.length * 0.6
            const gap = innerWidth / data.length * 0.4
            const x = padding.left + i * (barWidth + gap) + gap / 2
            const barHeight = (d.value / maxValue) * innerHeight
            const y = padding.top + innerHeight - barHeight
            return (
              <g key={i}>
                <rect x={x} y={y} width={barWidth} height={barHeight}
                  className="fill-accent/80" rx={2} />
                <text x={x + barWidth / 2} y={chartHeight - padding.bottom + 20}
                  textAnchor="middle" className="fill-foreground/50 text-[10px]">{d.label}</text>
              </g>
            )
          })}

          {(type === "line" || type === "area") && (() => {
            const points = data.map((d, i) => ({
              x: padding.left + (i / (data.length - 1)) * innerWidth,
              y: padding.top + innerHeight - (d.value / maxValue) * innerHeight,
            }))
            const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
            const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`
            return (
              <>
                {type === "area" && <path d={areaPath} className="fill-accent/10" />}
                <path d={linePath} fill="none" className="stroke-accent" strokeWidth={2} />
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={3} className="fill-accent" />
                    <text x={p.x} y={chartHeight - padding.bottom + 20}
                      textAnchor="middle" className="fill-foreground/50 text-[10px]">{data[i].label}</text>
                  </g>
                ))}
              </>
            )
          })()}

          {type === "pie" && (() => {
            const total = data.reduce((sum, d) => sum + d.value, 0)
            const cx = chartWidth / 2
            const cy = chartHeight / 2
            const r = Math.min(innerWidth, innerHeight) / 2 - 10
            let currentAngle = -Math.PI / 2
            const colors = ["fill-accent/80", "fill-accent/60", "fill-accent/40", "fill-accent/20", "fill-foreground/20", "fill-foreground/10"]
            return data.map((d, i) => {
              const angle = (d.value / total) * 2 * Math.PI
              const x1 = cx + r * Math.cos(currentAngle)
              const y1 = cy + r * Math.sin(currentAngle)
              const x2 = cx + r * Math.cos(currentAngle + angle)
              const y2 = cy + r * Math.sin(currentAngle + angle)
              const largeArc = angle > Math.PI ? 1 : 0
              const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
              currentAngle += angle
              return <path key={i} d={path} className={colors[i % colors.length]} />
            })
          })()}

          {/* X-axis label */}
          {xLabel && (
            <text x={chartWidth / 2} y={chartHeight - 5}
              textAnchor="middle" className="fill-foreground/30 text-[10px]">{xLabel}</text>
          )}
        </svg>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create WPHero, Prose, SectionHeader, KeyInsight, PullQuote**

```typescript
// src/components/content-sections/wp-hero.tsx
interface WPHeroProps {
  title: string
  subtitle: string
  authors: string[]
  readTime: string
  solutionArea: string
}

export function WPHero({ title, subtitle, authors, readTime, solutionArea }: WPHeroProps) {
  return (
    <section className="py-16 px-4 text-center max-w-3xl mx-auto">
      <span className="inline-block text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded mb-6">
        {solutionArea}
      </span>
      <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">{title}</h1>
      <p className="text-lg text-foreground/60 mt-4">{subtitle}</p>
      <div className="flex items-center justify-center gap-3 mt-6 text-sm text-foreground/40">
        <span>{authors.join(" & ")}</span>
        <span>·</span>
        <span>{readTime}</span>
      </div>
    </section>
  )
}
```

```typescript
// src/components/content-sections/prose.tsx
interface ProseProps {
  paragraphs: string[]
}

export function Prose({ paragraphs }: ProseProps) {
  return (
    <section className="py-6 px-4 max-w-3xl mx-auto">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-foreground/70 leading-relaxed mb-4">{p}</p>
      ))}
    </section>
  )
}
```

```typescript
// src/components/content-sections/section-header.tsx
interface SectionHeaderProps {
  number?: number
  title: string
}

export function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <section className="pt-10 pb-4 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-heading font-semibold text-foreground">
        {number !== undefined && <span className="text-accent mr-2">{number}.</span>}
        {title}
      </h2>
    </section>
  )
}
```

```typescript
// src/components/content-sections/key-insight.tsx
interface KeyInsightProps {
  text: string
}

export function KeyInsight({ text }: KeyInsightProps) {
  return (
    <section className="py-6 px-4 max-w-3xl mx-auto">
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">Key Insight</span>
        <p className="text-foreground/80 mt-2 leading-relaxed font-medium">{text}</p>
      </div>
    </section>
  )
}
```

```typescript
// src/components/content-sections/pull-quote.tsx
interface PullQuoteProps {
  quote: string
  attribution: string
  role?: string
}

export function PullQuote({ quote, attribution, role }: PullQuoteProps) {
  return (
    <section className="py-8 px-4 max-w-3xl mx-auto text-center">
      <blockquote className="text-2xl font-heading italic text-foreground/80 leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-4">
        <span className="text-sm font-semibold text-accent">{attribution}</span>
        {role && <span className="text-sm text-foreground/40 ml-1">— {role}</span>}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create Sidebar, Footnotes, AuthorBio, MethodologyDiagram**

```typescript
// src/components/content-sections/sidebar-note.tsx
interface SidebarNoteProps {
  text: string
  source?: string
}

export function SidebarNote({ text, source }: SidebarNoteProps) {
  return (
    <section className="py-4 px-4 max-w-3xl mx-auto">
      <div className="bg-primary/5 border-l-2 border-foreground/20 pl-4 py-3 text-sm text-foreground/50 italic">
        {text}
        {source && <span className="block mt-1 text-xs not-italic text-foreground/30">— {source}</span>}
      </div>
    </section>
  )
}
```

```typescript
// src/components/content-sections/footnotes.tsx
interface FootnotesProps {
  notes: string[]
}

export function Footnotes({ notes }: FootnotesProps) {
  return (
    <section className="py-8 px-4 max-w-3xl mx-auto border-t border-primary/10">
      <div className="space-y-1">
        {notes.map((note, i) => (
          <p key={i} className="text-xs text-foreground/30">
            <sup>{i + 1}</sup> {note}
          </p>
        ))}
      </div>
    </section>
  )
}
```

```typescript
// src/components/content-sections/author-bio.tsx
import Image from "next/image"

interface AuthorBioProps {
  name: string
  title: string
  bio: string
  image: string
}

export function AuthorBio({ name, title, bio, image }: AuthorBioProps) {
  return (
    <section className="py-8 px-4 max-w-3xl mx-auto">
      <div className="border-t border-primary/10 pt-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-4">About the Author</h3>
        <div className="flex gap-4 items-start">
          <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
          <div>
            <div className="font-semibold text-foreground">{name}</div>
            <div className="text-sm text-accent">{title}</div>
            <p className="text-sm text-foreground/60 mt-2">{bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

```typescript
// src/components/content-sections/methodology-diagram.tsx
// SVG circular diagram for C.H.A.O.S. — used in whitepapers and methodology page
export function MethodologyDiagram() {
  const phases = [
    { letter: "C", label: "Centralize" },
    { letter: "H", label: "Holistic" },
    { letter: "A", label: "Align" },
    { letter: "O", label: "Optimize" },
    { letter: "S", label: "System" },
  ]
  const cx = 200
  const cy = 200
  const r = 140

  return (
    <section className="py-8 px-4 max-w-xl mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-auto">
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" className="stroke-accent/20" strokeWidth={2} />

        {/* Arrows between phases (clockwise) */}
        {phases.map((_, i) => {
          const angle1 = (i / phases.length) * 2 * Math.PI - Math.PI / 2
          const angle2 = ((i + 1) / phases.length) * 2 * Math.PI - Math.PI / 2
          const midAngle = (angle1 + angle2) / 2
          const arrowR = r + 5
          const ax = cx + arrowR * Math.cos(midAngle)
          const ay = cy + arrowR * Math.sin(midAngle)
          return (
            <text key={`arrow-${i}`} x={ax} y={ay} textAnchor="middle" dominantBaseline="middle"
              className="fill-accent/40 text-[14px]"
              transform={`rotate(${(midAngle * 180) / Math.PI + 90} ${ax} ${ay})`}>
              →
            </text>
          )
        })}

        {/* Phase nodes */}
        {phases.map((phase, i) => {
          const angle = (i / phases.length) * 2 * Math.PI - Math.PI / 2
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          return (
            <g key={phase.letter}>
              <circle cx={x} cy={y} r={28} className="fill-accent/10 stroke-accent" strokeWidth={2} />
              <text x={x} y={y - 4} textAnchor="middle" dominantBaseline="middle"
                className="fill-accent text-[18px] font-bold">{phase.letter}</text>
              <text x={x} y={y + 12} textAnchor="middle"
                className="fill-foreground/50 text-[8px]">{phase.label}</text>
            </g>
          )
        })}

        {/* Center text */}
        <text x={cx} y={cy - 8} textAnchor="middle" className="fill-foreground/70 text-[14px] font-bold">C.H.A.O.S.</text>
        <text x={cx} y={cy + 10} textAnchor="middle" className="fill-foreground/30 text-[8px]">Framework™</text>
      </svg>
    </section>
  )
}
```

- [ ] **Step 4: Run type check and commit**

Run: `npx tsc --noEmit`
Expected: PASS

```bash
git add src/components/content-sections/
git commit -m "feat: add whitepaper sections, DataChart, and methodology diagram"
```

---

## Task 8: Build Section Renderer

**Files:**
- Create: `src/components/content-sections/section-renderer.tsx`

This component takes a section type discriminated union and renders the matching component. Used by both case study and whitepaper renderers.

- [ ] **Step 1: Define section types and create renderer**

```typescript
// src/components/content-sections/section-renderer.tsx
import { CaseHero } from "./case-hero"
import { Challenge } from "./challenge"
import { Approach } from "./approach"
import { ApproachTimeline } from "./approach-timeline"
import { ResultsGrid } from "./results-grid"
import { BeforeAfter } from "./before-after"
import { ExecutiveQuote } from "./executive-quote"
import { ClientQuote } from "./client-quote"
import { Callout } from "./callout"
import { DataChart } from "./data-chart"
import { WPHero } from "./wp-hero"
import { Prose } from "./prose"
import { SectionHeader } from "./section-header"
import { KeyInsight } from "./key-insight"
import { PullQuote } from "./pull-quote"
import { MethodologyDiagram } from "./methodology-diagram"
import { SidebarNote } from "./sidebar-note"
import { Footnotes } from "./footnotes"
import { AuthorBio } from "./author-bio"

// Discriminated union of all section types
export type ContentSection =
  | { type: "case-hero"; props: React.ComponentProps<typeof CaseHero> }
  | { type: "challenge"; props: React.ComponentProps<typeof Challenge> }
  | { type: "approach"; props: React.ComponentProps<typeof Approach> }
  | { type: "approach-timeline"; props: React.ComponentProps<typeof ApproachTimeline> }
  | { type: "results-grid"; props: React.ComponentProps<typeof ResultsGrid> }
  | { type: "before-after"; props: React.ComponentProps<typeof BeforeAfter> }
  | { type: "executive-quote"; props: React.ComponentProps<typeof ExecutiveQuote> }
  | { type: "client-quote"; props: React.ComponentProps<typeof ClientQuote> }
  | { type: "callout"; props: React.ComponentProps<typeof Callout> }
  | { type: "data-chart"; props: React.ComponentProps<typeof DataChart> }
  | { type: "wp-hero"; props: React.ComponentProps<typeof WPHero> }
  | { type: "prose"; props: React.ComponentProps<typeof Prose> }
  | { type: "section-header"; props: React.ComponentProps<typeof SectionHeader> }
  | { type: "key-insight"; props: React.ComponentProps<typeof KeyInsight> }
  | { type: "pull-quote"; props: React.ComponentProps<typeof PullQuote> }
  | { type: "methodology-diagram"; props: Record<string, never> }
  | { type: "sidebar-note"; props: React.ComponentProps<typeof SidebarNote> }
  | { type: "footnotes"; props: React.ComponentProps<typeof Footnotes> }
  | { type: "author-bio"; props: React.ComponentProps<typeof AuthorBio> }

const componentMap: Record<string, React.ComponentType<any>> = {
  "case-hero": CaseHero,
  "challenge": Challenge,
  "approach": Approach,
  "approach-timeline": ApproachTimeline,
  "results-grid": ResultsGrid,
  "before-after": BeforeAfter,
  "executive-quote": ExecutiveQuote,
  "client-quote": ClientQuote,
  "callout": Callout,
  "data-chart": DataChart,
  "wp-hero": WPHero,
  "prose": Prose,
  "section-header": SectionHeader,
  "key-insight": KeyInsight,
  "pull-quote": PullQuote,
  "methodology-diagram": MethodologyDiagram,
  "sidebar-note": SidebarNote,
  "footnotes": Footnotes,
  "author-bio": AuthorBio,
}

export function SectionRenderer({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        const Component = componentMap[section.type]
        if (!Component) return null
        return <Component key={i} {...section.props} />
      })}
    </>
  )
}
```

- [ ] **Step 2: Run type check and commit**

Run: `npx tsc --noEmit`
Expected: PASS

```bash
git add src/components/content-sections/section-renderer.tsx
git commit -m "feat: add section renderer with discriminated union types"
```

---

## Task 9: Create Site Config and Data Types

**Files:**
- Create: `src/sites/strategicvoid/config.ts`
- Create: `src/sites/strategicvoid/data/types.ts`

- [ ] **Step 1: Create data types**

```typescript
// src/sites/strategicvoid/data/types.ts
import type { ContentSection } from "@/components/content-sections/section-renderer"

export interface Solution {
  slug: string
  name: string
  tagline: string
  icon: string
  description: string[]
  productSlugs: string[]
}

export interface Product {
  slug: string
  name: string
  solutionArea: string
  price: string
  tagline: string
  description: string[]
  features: string[]
  specs: { label: string; value: string }[]
  image: string
  enterpriseTier?: string
}

export interface CaseStudy {
  slug: string
  title: string
  company: string
  industry: string
  solutionArea: string
  heroStat: { value: string; label: string }
  summary: string
  sections: ContentSection[]
}

export interface Whitepaper {
  slug: string
  title: string
  subtitle: string
  authors: string[]
  readTime: string
  solutionArea: string
  type: "strategic" | "product"
  sections: ContentSection[]
}

export interface Executive {
  slug: string
  name: string
  title: string
  credentials: string
  bio: string
  quote: string
  image: string
  referencePerson: string  // for MCP image generation tracking
}

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export interface SolutionPricing {
  solutionSlug: string
  tiers: PricingTier[]
}

export interface PricingFeatureRow {
  label: string
  values: (boolean | string)[]
}
```

- [ ] **Step 2: Create site config**

```typescript
// src/sites/strategicvoid/config.ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Strategic Void Consulting",
  subdomain: "strategicvoid",
  theme: {
    preset: "consulting",
    colors: {
      primary: "#0a1628",
      secondary: "#1a2744",
      accent: "#c9a84c",
      background: "#0a1628",
      text: "#e8e0d0",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "Strategic Void Consulting — Aligning Your Organization with the Void™",
    description:
      "Creators of the C.H.A.O.S. Framework™. Enterprise alignment solutions for organizations ready to optimize beyond productivity.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Solutions", path: "/solutions" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Whitepapers", path: "/whitepapers" },
    { label: "Methodology", path: "/methodology" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Leadership", path: "/leadership" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
  megaMenu: {
    items: [
      {
        label: "Solutions",
        style: "mega",
        children: [
          { label: "Meeting Optimization Suite™", path: "/solutions/meeting-optimization", description: "Maximize meeting impact. Minimize actual contribution." },
          { label: "KPI Alignment Platform™", path: "/solutions/kpi-alignment", description: "If you can measure it, you can misunderstand it." },
          { label: "Middle Management Enablement™", path: "/solutions/middle-management", description: "Empowering leaders to lead without leading." },
          { label: "Productivity Theater™", path: "/solutions/productivity-theater", description: "Work harder at appearing to work." },
          { label: "Compliance & Policy Solutions™", path: "/solutions/compliance-policy", description: "Because accountability is a shared illusion." },
          { label: "Communication Enhancement Tools™", path: "/solutions/communication-enhancement", description: "Say more. Mean less." },
          { label: "Decision Support Systems™", path: "/solutions/decision-support", description: "Making decisions optional." },
          { label: "Employee Experience Optimization™", path: "/solutions/employee-experience", description: "Because happy employees are statistically unnecessary." },
        ],
      },
      { label: "Case Studies", path: "/case-studies" },
      { label: "Whitepapers", path: "/whitepapers" },
      { label: "Methodology", path: "/methodology" },
      { label: "Pricing", path: "/pricing" },
      {
        label: "About",
        style: "dropdown",
        children: [
          { label: "Company", path: "/about" },
          { label: "Leadership", path: "/leadership" },
          { label: "Contact", path: "/contact" },
        ],
      },
    ],
  },
}
```

- [ ] **Step 3: Run type check and commit**

Run: `npx tsc --noEmit`
Expected: PASS

```bash
git add src/sites/strategicvoid/config.ts src/sites/strategicvoid/data/types.ts
git commit -m "feat: add strategicvoid site config and data types"
```

---

## Task 10: Create Solution and Product Data (Meeting Optimization Stub)

**Files:**
- Create: `src/sites/strategicvoid/data/solutions.ts`
- Create: `src/sites/strategicvoid/data/products.ts`

- [ ] **Step 1: Create solutions data with all 8 solutions defined (but only Meeting Optimization with full content)**

```typescript
// src/sites/strategicvoid/data/solutions.ts
import type { Solution } from "./types"

export const solutions: Solution[] = [
  {
    slug: "meeting-optimization",
    name: "Meeting Optimization Suite™",
    tagline: "Maximize meeting impact. Minimize actual contribution.",
    icon: "📊",
    description: [
      "In today's hyperconnected enterprise landscape, meetings represent the single largest opportunity for strategic non-productivity. The Meeting Optimization Suite™ provides a comprehensive toolkit for professionals who understand that presence is more valuable than output.",
      "Our proprietary MeetingScore™ algorithm analyzes your calendar density, webcam engagement patterns, and keyboard activity to ensure you maintain peak perceived participation across all virtual and in-person collaboration sessions.",
      "Trusted by over 2,847 enterprise clients, the Meeting Optimization Suite™ has been independently verified to reduce productive meeting outcomes by an average of 73% while increasing stakeholder satisfaction scores by 340%.",
    ],
    productSlugs: ["meeting-brick", "autonod-pro", "delaysync", "calendar-inflator"],
  },
  {
    slug: "kpi-alignment",
    name: "KPI Alignment Platform™",
    tagline: "If you can measure it, you can misunderstand it.",
    icon: "📈",
    description: ["Full content in Plan 2."],
    productSlugs: ["kpi-generator", "goalpost-shifter-pro", "vanitymetrics-dashboard", "northstar-randomizer"],
  },
  {
    slug: "middle-management",
    name: "Middle Management Enablement™",
    tagline: "Empowering leaders to lead without leading.",
    icon: "👔",
    description: ["Full content in Plan 2."],
    productSlugs: ["synergy-amplifier", "one-on-one-generator", "escalation-ladder", "passive-aggressive-slack-bot"],
  },
  {
    slug: "productivity-theater",
    name: "Productivity Theater™",
    tagline: "Work harder at appearing to work.",
    icon: "🎭",
    description: ["Full content in Plan 2."],
    productSlugs: ["focusband", "deepwork-simulator", "task-deferral-engine", "urgency-generator"],
  },
  {
    slug: "compliance-policy",
    name: "Compliance & Policy Solutions™",
    tagline: "Because accountability is a shared illusion.",
    icon: "📋",
    description: ["Full content in Plan 2."],
    productSlugs: ["policy-generator-5000", "checkbox-automator", "audit-camouflage", "risk-redistribution-engine"],
  },
  {
    slug: "communication-enhancement",
    name: "Communication Enhancement Tools™",
    tagline: "Say more. Mean less.",
    icon: "💬",
    description: ["Full content in Plan 2."],
    productSlugs: ["buzzword-translator", "reply-all-optimizer", "thread-extender", "tonesoftener-ai"],
  },
  {
    slug: "decision-support",
    name: "Decision Support Systems™",
    tagline: "Making decisions optional.",
    icon: "🎯",
    description: ["Full content in Plan 2."],
    productSlugs: ["coinflip-enterprise", "blameshield", "consensus-simulator", "delayloop"],
  },
  {
    slug: "employee-experience",
    name: "Employee Experience Optimization™",
    tagline: "Because happy employees are statistically unnecessary.",
    icon: "🎪",
    description: ["Full content in Plan 2."],
    productSlugs: ["mandatoryfun", "wellness-noise-generator", "morale-dashboard", "pizzaparty-as-a-service", "ergomax-compliance-chair", "anonymous-feedback-redirector"],
  },
]

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}

export function getSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug)
}
```

- [ ] **Step 2: Create products data with Meeting Optimization products fully populated**

```typescript
// src/sites/strategicvoid/data/products.ts
import type { Product } from "./types"

export const products: Product[] = [
  // === MEETING OPTIMIZATION SUITE ===
  {
    slug: "meeting-brick",
    name: "Meeting Brick™",
    solutionArea: "meeting-optimization",
    price: "$4,999/unit",
    tagline: "Precision-weighted keyboard engagement for the modern professional.",
    description: [
      "The Meeting Brick™ is a precision-weighted 2.4lb aluminum-core productivity device designed to maintain consistent keyboard pressure during virtual engagements. Engineered with our proprietary GravityHold™ technology, the Meeting Brick™ ensures your collaboration platform registers continuous activity, freeing you to optimize adjacent workflows.",
      "Each Meeting Brick™ is hand-calibrated by our team of Engagement Simulation Engineers to deliver exactly 14.7 PSI of distributed keystroke pressure — the empirically optimal threshold for triggering 'active' status across all major enterprise communication platforms.",
      "Available in Executive Matte Black, Boardroom Titanium, and Limited Edition C-Suite Gold. ISO 9001 certified for consistent non-productive engagement.",
    ],
    features: [
      "Maintains 'Active' status across Slack, Teams, Zoom, and 47 other platforms",
      "Proprietary GravityHold™ technology",
      "Hand-calibrated to 14.7 PSI (±0.01)",
      "Silent operation — no detectable keyboard patterns",
      "Works in any meeting context, virtual or in-person",
      "Included carrying case for cross-office deployment",
    ],
    specs: [
      { label: "Weight", value: "2.4 lbs (±0.01 lb, ISO 9001 certified)" },
      { label: "Material", value: "Aerospace-grade aluminum composite" },
      { label: "Pressure", value: "14.7 PSI distributed" },
      { label: "Battery", value: "None required (patent-pending zero-energy design)" },
      { label: "Dimensions", value: '4.5" × 3.2" × 2.1"' },
      { label: "Warranty", value: "Lifetime (the brick will outlast your career)" },
    ],
    image: "/sites/strategicvoid/product-meeting-brick.png",
    enterpriseTier: "Essentials",
  },
  {
    slug: "autonod-pro",
    name: "AutoNod Pro™",
    solutionArea: "meeting-optimization",
    price: "$7,499/seat/quarter",
    tagline: "Simulated engagement at the speed of enterprise.",
    description: [
      "AutoNod Pro™ is a compact desk-mounted device that introduces subtle, rhythmic motion to your webcam feed, creating the unmistakable impression of active listening and thoughtful agreement. Our AI-driven NodEngine™ varies the frequency, amplitude, and timing of each nod to avoid pattern detection.",
      "Studies conducted by our internal research division show that perceived meeting engagement increases by 847% among AutoNod Pro™ users. The device supports over 14 distinct nod profiles, from 'Thoughtful Agreement' to 'Concerned But Supportive' to 'Pretending To Take Notes.'",
      "Seamlessly integrates with all major video conferencing platforms. Pairs with our Meeting Brick™ for what our clients call 'Total Presence Simulation™.'",
    ],
    features: [
      "14 distinct nod profiles with AI-driven variation",
      "NodEngine™ anti-pattern detection",
      "Compatible with all webcam hardware",
      "Silent magnetic mount system",
      "Pairs with Meeting Brick™ for Total Presence Simulation™",
      "Emergency 'Attentive Lean Forward' mode for when your name is called",
    ],
    specs: [
      { label: "Nod Profiles", value: "14 (expandable via firmware)" },
      { label: "Frequency Range", value: "0.3 - 2.1 nods/sec" },
      { label: "Amplitude", value: "2° - 8° (adjustable)" },
      { label: "Power", value: "USB-C (5V/0.5A)" },
      { label: "Detection Risk", value: "< 0.003% (NodEngine™ certified)" },
      { label: "Mount Type", value: "Magnetic, fits monitors up to 34\"" },
    ],
    image: "/sites/strategicvoid/product-autonod-pro.png",
    enterpriseTier: "Professional",
  },
  {
    slug: "delaysync",
    name: "DelaySync™",
    solutionArea: "meeting-optimization",
    price: "$3,299/seat/quarter",
    tagline: "Strategic latency for the discerning non-contributor.",
    description: [
      "DelaySync™ is an enterprise-grade artificial lag generator that introduces precisely calibrated network delays into your video conferencing sessions. When called upon to contribute, simply wait for the familiar freeze-and-stutter that has become the universal signal for 'I was definitely paying attention but my internet is being difficult.'",
      "Our proprietary LatencyArchitect™ engine generates realistic packet loss patterns that are indistinguishable from genuine connectivity issues. Each delay event includes authentic visual artifacts, audio stuttering, and the occasional 'Can you hear me?' prompt.",
      "Enterprise customers report a 91% reduction in unexpected meeting contributions and a 67% decrease in action item assignments. DelaySync™: because the best response is no response.",
    ],
    features: [
      "Realistic packet loss simulation via LatencyArchitect™",
      "Configurable delay duration (2-45 seconds)",
      "One-click 'Sorry, you cut out' activation",
      "Auto-triggers during direct questions (AI-powered name detection)",
      "Authentic visual and audio artifacts",
      "Post-meeting excuse generator ('My ISP is doing maintenance')",
    ],
    specs: [
      { label: "Delay Range", value: "2 - 45 seconds" },
      { label: "Artifact Realism", value: "Grade A (peer-reviewed)" },
      { label: "Name Detection", value: "99.7% accuracy across 14 languages" },
      { label: "Platform Support", value: "Zoom, Teams, Meet, WebEx, 23 others" },
      { label: "Network Impact", value: "Zero (simulation layer only)" },
      { label: "Plausible Deniability Rating", value: "9.8/10" },
    ],
    image: "/sites/strategicvoid/product-delaysync.png",
    enterpriseTier: "Essentials",
  },
  {
    slug: "calendar-inflator",
    name: "Calendar Inflator™",
    solutionArea: "meeting-optimization",
    price: "$5,999/seat/quarter",
    tagline: "Because an empty calendar is a vulnerable calendar.",
    description: [
      "Calendar Inflator™ automatically populates your schedule with strategically placed buffer meetings, phantom syncs, and recurring alignment sessions that exist solely to prevent others from booking actual work into your day. Our CalendarDensity™ algorithm ensures your availability never exceeds 7% during business hours.",
      "Each generated event comes complete with realistic meeting titles ('Q3 Cross-Functional Alignment Sync'), attendee lists (pulled from your organization's directory), and agenda documents (auto-generated from our library of 4,000+ corporate meeting templates).",
      "Calendar Inflator™ users report feeling 340% more important and receiving 89% fewer requests for 'quick chats.' The Professional tier includes our exclusive 'Double-Booked Defense' feature, which automatically schedules conflicting meetings so you always have an excuse to leave early.",
    ],
    features: [
      "CalendarDensity™ algorithm maintains ≤7% availability",
      "4,000+ realistic meeting title templates",
      "Auto-generated agendas with believable action items",
      "Double-Booked Defense (Professional tier)",
      "Cross-timezone meeting placement for global credibility",
      "Integrates with Outlook, Google Calendar, and 12 other platforms",
    ],
    specs: [
      { label: "Calendar Coverage", value: "93%+ of business hours" },
      { label: "Meeting Templates", value: "4,000+ (updated quarterly)" },
      { label: "Attendee Simulation", value: "Up to 14 phantom attendees per event" },
      { label: "Agenda Length", value: "1-3 pages (contextually appropriate)" },
      { label: "Conflict Rate", value: "Configurable (15-40% recommended)" },
      { label: "Detection Risk", value: "< 0.5% (CalendarDensity™ certified)" },
    ],
    image: "/sites/strategicvoid/product-calendar-inflator.png",
    enterpriseTier: "Professional",
  },

  // === Stub products for other solution areas (full content in Plan 2) ===
  // KPI Alignment
  { slug: "kpi-generator", name: "KPI Generator™", solutionArea: "kpi-alignment", price: "$6,499/seat/quarter", tagline: "Turns random numbers into performance metrics.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "goalpost-shifter-pro", name: "GoalPost Shifter Pro™", solutionArea: "kpi-alignment", price: "$8,999/seat/quarter", tagline: "Dynamically adjusts targets based on outcomes.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "vanitymetrics-dashboard", name: "VanityMetrics Dashboard™", solutionArea: "kpi-alignment", price: "$4,299/seat/quarter", tagline: "Beautiful charts that mean nothing.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "northstar-randomizer", name: "NorthStar Randomizer™", solutionArea: "kpi-alignment", price: "$11,999/seat/quarter", tagline: "Reassigns company direction quarterly.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },

  // Middle Management
  { slug: "synergy-amplifier", name: "Synergy Amplifier™", solutionArea: "middle-management", price: "$5,799/seat/quarter", tagline: "Replaces plain speech with buzzwords.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "one-on-one-generator", name: "1:1 Generator™", solutionArea: "middle-management", price: "$3,999/seat/quarter", tagline: "Produces talking points that go nowhere.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "escalation-ladder", name: "Escalation Ladder™", solutionArea: "middle-management", price: "$2,499/unit", tagline: "Physical representation of unnecessary escalation.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "passive-aggressive-slack-bot", name: "PassiveAggressive Slack Bot™", solutionArea: "middle-management", price: "$4,499/seat/quarter", tagline: 'Auto-generates "per my last message."', description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },

  // Productivity Theater
  { slug: "focusband", name: "FocusBand™", solutionArea: "productivity-theater", price: "$6,999/unit", tagline: "Lights up when you look busy.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "deepwork-simulator", name: "DeepWork Simulator™", solutionArea: "productivity-theater", price: "$3,799/seat/quarter", tagline: "Plays typing sounds and intense music.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "task-deferral-engine", name: "Task Deferral Engine™", solutionArea: "productivity-theater", price: "$5,499/seat/quarter", tagline: "Intelligently reschedules work indefinitely.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "urgency-generator", name: "Urgency Generator™", solutionArea: "productivity-theater", price: "$4,199/seat/quarter", tagline: "Flags everything as high priority.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },

  // Compliance & Policy
  { slug: "policy-generator-5000", name: "Policy Generator 5000™", solutionArea: "compliance-policy", price: "$7,999/seat/quarter", tagline: "Creates 80-page documents instantly.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "checkbox-automator", name: "Checkbox Automator™", solutionArea: "compliance-policy", price: "$3,299/seat/quarter", tagline: 'Automatically marks things as "reviewed."', description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "audit-camouflage", name: "Audit Camouflage™", solutionArea: "compliance-policy", price: "$9,999/seat/quarter", tagline: "Makes everything look compliant at a glance.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "risk-redistribution-engine", name: "Risk Redistribution Engine™", solutionArea: "compliance-policy", price: "$12,499/seat/quarter", tagline: "Moves blame across departments.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },

  // Communication Enhancement
  { slug: "buzzword-translator", name: "Buzzword Translator™", solutionArea: "communication-enhancement", price: "$4,799/seat/quarter", tagline: "Converts simple ideas into corporate speak.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "reply-all-optimizer", name: "Reply-All Optimizer™", solutionArea: "communication-enhancement", price: "$3,599/seat/quarter", tagline: "Ensures maximum visibility with minimal value.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "thread-extender", name: "Thread Extender™", solutionArea: "communication-enhancement", price: "$2,999/seat/quarter", tagline: "Keeps conversations alive long past relevance.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "tonesoftener-ai", name: "ToneSoftener AI™", solutionArea: "communication-enhancement", price: "$5,199/seat/quarter", tagline: 'Adds "just looping back" to everything.', description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },

  // Decision Support
  { slug: "coinflip-enterprise", name: "CoinFlip Enterprise™", solutionArea: "decision-support", price: "$14,999/seat/quarter", tagline: "Decision engine with audit logs.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "blameshield", name: "BlameShield™", solutionArea: "decision-support", price: "$8,499/seat/quarter", tagline: "Documents decisions so responsibility is unclear.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "consensus-simulator", name: "Consensus Simulator™", solutionArea: "decision-support", price: "$6,999/seat/quarter", tagline: "Generates fake agreement across stakeholders.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "delayloop", name: "DelayLoop™", solutionArea: "decision-support", price: "$4,799/seat/quarter", tagline: "Postpones decisions until irrelevant.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },

  // Employee Experience
  { slug: "mandatoryfun", name: "MandatoryFun™ Platform", solutionArea: "employee-experience", price: "$5,999/seat/quarter", tagline: "Schedules 'optional' fun during peak workload.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "wellness-noise-generator", name: "Wellness Noise Generator™", solutionArea: "employee-experience", price: "$2,799/unit", tagline: "Calming sounds while your workload increases.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "morale-dashboard", name: "Morale Dashboard™", solutionArea: "employee-experience", price: "$4,499/seat/quarter", tagline: "Tracks happiness using made-up metrics.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "pizzaparty-as-a-service", name: "PizzaParty-as-a-Service™", solutionArea: "employee-experience", price: "$1,999/event", tagline: "Automatically deploys pizza instead of raises.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "ergomax-compliance-chair", name: "ErgoMax Compliance Chair™", solutionArea: "employee-experience", price: "$8,999/unit", tagline: "Tracks posture but reports you to HR if you slouch.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
  { slug: "anonymous-feedback-redirector", name: "Anonymous Feedback Redirector™", solutionArea: "employee-experience", price: "$3,499/seat/quarter", tagline: "Sends employee feedback directly to /dev/null.", description: ["Full content in Plan 2."], features: [], specs: [], image: "/sites/strategicvoid/product-placeholder.png" },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsBySolution(solutionSlug: string): Product[] {
  return products.filter((p) => p.solutionArea === solutionSlug)
}
```

- [ ] **Step 3: Run type check and commit**

Run: `npx tsc --noEmit`
Expected: PASS

```bash
git add src/sites/strategicvoid/data/
git commit -m "feat: add strategicvoid solutions and products data with Meeting Optimization content"
```

---

## Task 11: Create Leadership and Pricing Data

**Files:**
- Create: `src/sites/strategicvoid/data/leadership.ts`
- Create: `src/sites/strategicvoid/data/pricing.ts`

- [ ] **Step 1: Create leadership data**

```typescript
// src/sites/strategicvoid/data/leadership.ts
import type { Executive } from "./types"

export const executives: Executive[] = [
  {
    slug: "thornbury",
    name: 'Maximilian "Max" Thornbury III',
    title: "Founder & Chief Alignment Officer",
    credentials: "MBA (Harvard, '82), Certified Six Sigma Black Belt, Level 7 Alignment Practitioner, Keynote Speaker at SynergyConf 2019-2025",
    bio: "Founded Strategic Void Consulting in 1987 after a distinguished career observing that the most successful organizations spent more time discussing work than doing it. Over 39 years, Max has personally guided over 400 Fortune 500 companies toward what he calls 'operational transcendence' — the state where alignment activities fully replace productive output. He is the architect of the C.H.A.O.S. Framework™ and author of the bestselling business book 'Leading from the Void: A Strategic Memoir.'",
    quote: "The moment an organization stops accidentally producing results is the moment true alignment begins.",
    image: "/sites/strategicvoid/exec-thornbury.png",
    referencePerson: "bill",
  },
  {
    slug: "hawthorne-clyde",
    name: "Preston Hawthorne-Clyde",
    title: "VP of Synergy Operations",
    credentials: "MSc Organizational Dynamics (Wharton), Certified Synergy Architect, Former McKinsey Associate (2 weeks)",
    bio: "Preston oversees Strategic Void's global synergy infrastructure, ensuring that all cross-functional alignment initiatives remain theoretical and free from the contamination of measurable outcomes. Under his leadership, the Synergy Operations division has grown from 3 to 47 employees, none of whom can articulate what the division does. He considers this his greatest achievement.",
    quote: "Synergy isn't something you create. It's something you schedule a meeting about.",
    image: "/sites/strategicvoid/exec-hawthorne-clyde.png",
    referencePerson: "brandon",
  },
  {
    slug: "pennington",
    name: "J. Rutherford Pennington",
    title: "Chief Disruption Evangelist",
    credentials: "PhD Theoretical Business (self-awarded), 3x TEDx Speaker, Disruptor Magazine 'Top 40 Under 60'",
    bio: "Rutherford has disrupted 14 industries without producing a measurable outcome in any of them — a record he wears as a badge of honor. Before joining Strategic Void, he founded and dissolved three startups, each of which pivoted so frequently that neither investors nor employees could identify the product. He brings this same energy to client engagements, where his unique ability to reframe failure as 'pre-alignment' has earned him a loyal following.",
    quote: "If you haven't disrupted something by lunch, you're not trying hard enough. Also, disruption doesn't require results.",
    image: "/sites/strategicvoid/exec-pennington.png",
    referencePerson: "jim",
  },
  {
    slug: "ashford-wexley",
    name: "Caldwell Ashford-Wexley",
    title: "Senior Director of Strategic Ambiguity",
    credentials: "BA Communications (Yale), Master NLP Practitioner, Certified Corporate Opacity Specialist",
    bio: "Caldwell ensures all Strategic Void communications achieve maximum opacity while maintaining stakeholder confidence. His team has developed over 200 corporate email templates that convey urgency without specificity, agreement without commitment, and enthusiasm without intent. He is the inventor of the 'Strategic Ambiguity Matrix™,' a framework for ensuring that no written communication can be used as evidence of a promise.",
    quote: "Clarity is the enemy of flexibility. The more precisely you communicate, the more accountable you become.",
    image: "/sites/strategicvoid/exec-ashford-wexley.png",
    referencePerson: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
```

- [ ] **Step 2: Create pricing data**

```typescript
// src/sites/strategicvoid/data/pricing.ts
import type { PricingTier, SolutionPricing, PricingFeatureRow } from "./types"

// Per-solution pricing (used on each solution landing page)
export const solutionPricing: Record<string, SolutionPricing> = {
  "meeting-optimization": {
    solutionSlug: "meeting-optimization",
    tiers: [
      {
        name: "Essentials",
        price: "$2,499/seat/quarter",
        description: "For teams beginning their meeting optimization journey.",
        features: [
          "Meeting Brick™ (1 unit per seat)",
          "DelaySync™ basic (up to 15s delay)",
          "Self-service knowledge base",
          "Quarterly alignment report",
        ],
        cta: "Request Demo",
      },
      {
        name: "Professional",
        price: "$7,999/seat/quarter",
        description: "For organizations serious about non-contribution.",
        features: [
          "All Essentials features",
          "AutoNod Pro™ (full 14-profile suite)",
          "Calendar Inflator™",
          "DelaySync™ advanced (up to 45s delay)",
          "Priority synergy support (48hr SLA)",
          "Total Presence Simulation™ bundle",
        ],
        cta: "Request Demo",
        highlighted: true,
      },
      {
        name: "Enterprise Unlimited",
        price: "Custom",
        description: "For when meetings are your entire business model.",
        features: [
          "All Professional features",
          "Dedicated alignment partner",
          "Custom nod profile development",
          "Unlimited phantom meeting generation",
          "24/7 white-glove alignment concierge",
          "Complimentary meeting avoidance consulting",
        ],
        cta: "Contact Sales",
      },
    ],
  },
  // Other solutions use the same 3-tier structure — populated in Plan 2
}

// Master pricing page tiers (cross-solution bundles)
export const masterPricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$9,999/seat/quarter",
    description: "For teams beginning their alignment journey.",
    features: [
      "Choose 2 Solution Suites",
      "Essentials tier for selected suites",
      "Community support forum",
      "Quarterly C.H.A.O.S. assessment",
      "Up to 500 seats",
    ],
    cta: "Request Demo",
  },
  {
    name: "Growth",
    price: "$24,999/seat/quarter",
    description: "For organizations scaling their non-productivity.",
    features: [
      "Choose 5 Solution Suites",
      "Professional tier for selected suites",
      "Priority synergy support (24hr SLA)",
      "Monthly alignment reports",
      "C.H.A.O.S. Practitioner certification (2 seats)",
      "Up to 5,000 seats",
    ],
    cta: "Request Demo",
    highlighted: true,
  },
  {
    name: "Transformation",
    price: "$49,999/seat/quarter",
    description: "Full C.H.A.O.S. Framework™ deployment.",
    features: [
      "All 8 Solution Suites",
      "Professional tier across all suites",
      "Dedicated Customer Success Misalignment Manager",
      "Weekly alignment ceremonies",
      "C.H.A.O.S. Practitioner certification (unlimited)",
      "Executive briefings (quarterly)",
      "Up to 25,000 seats",
    ],
    cta: "Contact Sales",
  },
  {
    name: "Singularity",
    price: "Let's talk.",
    description: "For when alignment becomes your entire business model.",
    features: [
      "All Transformation features",
      "Enterprise Unlimited tier across all suites",
      "Strategic Void Consulting residency (on-site team)",
      "Custom C.H.A.O.S. methodology adaptation",
      "Board-level alignment advisory",
      "Unlimited seats",
      "Complimentary blame redistribution",
      "Emergency alignment hotline (24/7)",
      "Annual retreat at undisclosed luxury location",
    ],
    cta: "Schedule Executive Briefing",
  },
]

// Feature comparison matrix for master pricing page
export const masterPricingFeatures: PricingFeatureRow[] = [
  { label: "Solution Suites included", values: ["2", "5", "All 8", "All 8"] },
  { label: "Tier level", values: ["Essentials", "Professional", "Professional", "Enterprise Unlimited"] },
  { label: "Maximum seats", values: ["500", "5,000", "25,000", "Unlimited"] },
  { label: "C.H.A.O.S. assessment", values: ["Quarterly", "Monthly", "Weekly", "Continuous"] },
  { label: "Practitioner certifications", values: [false, "2 seats", "Unlimited", "Unlimited"] },
  { label: "Dedicated alignment partner", values: [false, false, true, true] },
  { label: "Executive briefings", values: [false, false, "Quarterly", "On-demand"] },
  { label: "On-site consulting residency", values: [false, false, false, true] },
  { label: "Custom methodology adaptation", values: [false, false, false, true] },
  { label: "Board-level advisory", values: [false, false, false, true] },
  { label: "Blame redistribution", values: [false, false, "Shared", "Dedicated"] },
  { label: "Support SLA", values: ["Community", "24hr", "4hr", "Instant"] },
  { label: "Cross-functional synergy threading", values: [true, true, true, true] },
  { label: "Stakeholder confusion management", values: [false, true, true, true] },
  { label: "Alignment ceremony facilitation", values: [false, false, true, true] },
  { label: "Emergency alignment hotline", values: [false, false, false, true] },
  { label: "Annual luxury retreat", values: [false, false, false, true] },
]
```

- [ ] **Step 3: Run type check and commit**

Run: `npx tsc --noEmit`
Expected: PASS

```bash
git add src/sites/strategicvoid/data/leadership.ts src/sites/strategicvoid/data/pricing.ts
git commit -m "feat: add leadership profiles and pricing data for strategicvoid"
```

---

## Task 12: Create Case Study and Whitepaper Stubs

**Files:**
- Create: `src/sites/strategicvoid/data/case-studies/index.ts`
- Create: `src/sites/strategicvoid/data/case-studies/globaltech-meeting-optimization.ts`
- Create: `src/sites/strategicvoid/data/whitepapers/index.ts`
- Create: `src/sites/strategicvoid/data/whitepapers/state-of-meeting-optimization.ts`

- [ ] **Step 1: Create one full case study for Meeting Optimization**

```typescript
// src/sites/strategicvoid/data/case-studies/globaltech-meeting-optimization.ts
import type { CaseStudy } from "../types"

export const globaltechMeetingOptimization: CaseStudy = {
  slug: "globaltech-meeting-optimization",
  title: "How GlobalTech Dynamics Reduced Productive Meetings by 73%",
  company: "GlobalTech Dynamics",
  industry: "Enterprise Technology",
  solutionArea: "meeting-optimization",
  heroStat: { value: "73%", label: "reduction in productive meeting outcomes" },
  summary: "GlobalTech Dynamics partnered with Strategic Void to deploy the full Meeting Optimization Suite™, transforming their meeting culture from accidentally productive to strategically inert.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "73%", label: "reduction in productive meeting outcomes" },
        company: "GlobalTech Dynamics",
        industry: "Enterprise Technology",
        solutionArea: "Meeting Optimization Suite™",
      },
    },
    {
      type: "challenge",
      props: {
        paragraphs: [
          "GlobalTech Dynamics, a 14,000-employee enterprise technology company, faced a crisis: their meetings were producing results. Action items were being completed. Decisions were being made. Worst of all, employees were leaving meetings with a clear understanding of what to do next.",
          "\"We were hemorrhaging productivity in the wrong direction,\" recalls CTO Sandra Meyers (fictional). \"Our teams were so efficient that they were finishing projects ahead of schedule, which was causing chaos in our quarterly reporting. We needed meetings that consumed time without producing outcomes.\"",
        ],
      },
    },
    {
      type: "approach",
      props: {
        steps: [
          { name: "Stakeholder Misalignment Audit", description: "Our team spent 6 weeks attending every meeting at GlobalTech, cataloguing instances of accidental productivity. We identified 847 meetings per week that were at risk of generating actionable outcomes." },
          { name: "Meeting Brick™ Deployment", description: "We distributed 14,000 Meeting Bricks™ across all offices and remote employees, ensuring universal keyboard engagement without cognitive participation." },
          { name: "AutoNod Pro™ Integration", description: "Executive leadership was equipped with AutoNod Pro™ devices, enabling them to maintain perceived engagement during the 23 hours per week they spend in back-to-back meetings." },
          { name: "Calendar Inflator™ Rollout", description: "Calendar Inflator™ was deployed organization-wide, reducing available meeting slots to under 4% and ensuring that any genuinely productive meeting would be impossible to schedule." },
        ],
      },
    },
    {
      type: "results-grid",
      props: {
        metrics: [
          { value: "73%", label: "Reduction in productive outcomes", direction: "down" },
          { value: "340%", label: "Increase in meeting volume", direction: "up" },
          { value: "4%", label: "Calendar availability achieved" },
          { value: "91%", label: "Employee 'engagement' score" },
        ],
      },
    },
    {
      type: "data-chart",
      props: {
        type: "line",
        title: "Fig. 1: Productive Meeting Outcomes Over Time",
        data: [
          { label: "Q1 '25", value: 87 },
          { label: "Q2 '25", value: 72 },
          { label: "Q3 '25", value: 41 },
          { label: "Q4 '25", value: 23 },
          { label: "Q1 '26", value: 12 },
        ],
        yLabel: "Productive Outcomes per Quarter",
        xLabel: "Quarter",
      },
    },
    {
      type: "executive-quote",
      props: {
        quote: "GlobalTech's transformation is a masterclass in strategic inertia. When I first walked into their offices, people were actually doing things. Now, they're aligned.",
        name: 'Maximilian "Max" Thornbury III',
        title: "Founder & Chief Alignment Officer, Strategic Void Consulting",
        image: "/sites/strategicvoid/exec-thornbury.png",
      },
    },
    {
      type: "callout",
      props: {
        text: "The less work accomplished, the more aligned the organization became. By Q4, GlobalTech's alignment score reached 97.3% — a Strategic Void record.",
      },
    },
    {
      type: "client-quote",
      props: {
        quote: "I used to dread meetings because we'd leave with things to do. Now I attend 11 meetings a day and I've never been less productive. It's liberating.",
        name: "Marcus Chen",
        role: "VP of Engineering",
        company: "GlobalTech Dynamics",
      },
    },
  ],
}
```

- [ ] **Step 2: Create case studies barrel**

```typescript
// src/sites/strategicvoid/data/case-studies/index.ts
import type { CaseStudy } from "../types"
import { globaltechMeetingOptimization } from "./globaltech-meeting-optimization"

// All case studies — additional files added in Plan 3
export const caseStudies: CaseStudy[] = [
  globaltechMeetingOptimization,
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getCaseStudiesBySolution(solutionSlug: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.solutionArea === solutionSlug)
}
```

- [ ] **Step 3: Create one full whitepaper for Meeting Optimization**

```typescript
// src/sites/strategicvoid/data/whitepapers/state-of-meeting-optimization.ts
import type { Whitepaper } from "../types"

export const stateOfMeetingOptimization: Whitepaper = {
  slug: "state-of-meeting-optimization",
  title: "The 2026 State of Meeting Optimization",
  subtitle: "Why Your Calendar Is Your Most Strategic Asset",
  authors: ['Maximilian "Max" Thornbury III', "Preston Hawthorne-Clyde"],
  readTime: "47 min read",
  solutionArea: "meeting-optimization",
  type: "strategic",
  sections: [
    {
      type: "wp-hero",
      props: {
        title: "The 2026 State of Meeting Optimization",
        subtitle: "Why Your Calendar Is Your Most Strategic Asset",
        authors: ['Maximilian "Max" Thornbury III', "Preston Hawthorne-Clyde"],
        readTime: "47 min read",
        solutionArea: "Meeting Optimization Suite™",
      },
    },
    {
      type: "section-header",
      props: { number: 1, title: "Executive Summary" },
    },
    {
      type: "prose",
      props: {
        paragraphs: [
          "In 2026, the enterprise meeting landscape has reached an inflection point. Organizations that once viewed meetings as a necessary cost of collaboration are now recognizing them as their most powerful strategic asset — not for what they produce, but for what they prevent.",
          "This whitepaper examines the current state of meeting optimization across 2,847 enterprise clients, drawing on three decades of Strategic Void Consulting's proprietary research to demonstrate a fundamental truth: the most aligned organizations are those that have successfully decoupled meeting activity from productive output.",
          "Our findings are unambiguous. Organizations deploying the full Meeting Optimization Suite™ report a 73% average reduction in productive meeting outcomes, a 340% increase in perceived engagement, and — perhaps most significantly — a 91% improvement in what we term 'Calendar Density Satisfaction' (CDS), the metric that captures how fulfilled employees feel when looking at a fully blocked calendar.",
        ],
      },
    },
    {
      type: "key-insight",
      props: {
        text: "Organizations in the top quartile of meeting volume show no statistically significant correlation with productivity — but they do show a 4.2x higher rate of 'strategic alignment confidence,' defined as the belief that meetings are accomplishing something important.",
      },
    },
    {
      type: "section-header",
      props: { number: 2, title: "The Meeting Paradox" },
    },
    {
      type: "prose",
      props: {
        paragraphs: [
          "Traditional management theory holds that meetings serve a functional purpose: information sharing, decision making, and collaborative problem-solving. Our research challenges this assumption at every level.",
          "In a longitudinal study of 14,000 enterprise meetings across 23 industries, we found that meetings which produced actionable outcomes were followed by a 67% increase in 'alignment anxiety' — the organizational stress caused by having to actually do something. Conversely, meetings that produced no outcomes whatsoever were followed by a 89% increase in 'alignment serenity.'",
          "This is what we call the Meeting Paradox: the utility of a meeting is inversely proportional to its productivity. The ideal meeting is one where everyone attends, no one contributes, and the calendar invite recurs weekly.",
        ],
      },
    },
    {
      type: "data-chart",
      props: {
        type: "bar",
        title: "Fig. 2: Meeting Productivity vs. Organizational Alignment (2025 Survey, n=2,847)",
        data: [
          { label: "High Productivity", value: 23 },
          { label: "Medium Productivity", value: 54 },
          { label: "Low Productivity", value: 78 },
          { label: "Zero Productivity", value: 97 },
        ],
        yLabel: "Alignment Score",
        xLabel: "Meeting Productivity Level",
      },
    },
    {
      type: "pull-quote",
      props: {
        quote: "The calendar is not a scheduling tool. It is a strategic weapon. Every empty slot is a vulnerability.",
        attribution: 'Maximilian "Max" Thornbury III',
        role: "Founder, Strategic Void Consulting",
      },
    },
    {
      type: "section-header",
      props: { number: 3, title: "Methodology: Measuring What Doesn't Matter" },
    },
    {
      type: "prose",
      props: {
        paragraphs: [
          "Our research employs the C.H.A.O.S. Assessment Matrix™, a proprietary evaluation framework that measures organizational alignment across 47 dimensions, none of which correlate with traditional business performance metrics. This is by design.",
          "We surveyed 2,847 enterprise clients across 23 industries, analyzing over 14 million meeting hours. Each organization was scored on Calendar Density (percentage of available time blocked), Perceived Engagement (webcam nod frequency), Contribution Avoidance Rate (successful deflections per meeting), and Strategic Ambiguity Index (post-meeting clarity reduction).",
        ],
      },
    },
    {
      type: "sidebar-note",
      props: {
        text: "A 2024 Gartner study we are unable to locate at this time found similar results, though they interpreted them as a problem rather than an opportunity.",
        source: "Strategic Void Internal Research, Q3 2025 (unpublished, possibly unwritten)",
      },
    },
    {
      type: "methodology-diagram",
      props: {},
    },
    {
      type: "section-header",
      props: { number: 4, title: "Conclusions and Recommendations" },
    },
    {
      type: "prose",
      props: {
        paragraphs: [
          "The data is clear: meeting optimization is not about making meetings better. It is about making meetings more. More frequent, more populated, and more insulated from the risk of producing actionable outcomes.",
          "We recommend that organizations immediately audit their calendar density, deploy the Meeting Optimization Suite™ across all business units, and establish a Chief Meeting Officer role at the C-suite level to ensure meeting volume receives the strategic attention it deserves.",
          "The future of enterprise alignment is not in working smarter. It is in meeting more.",
        ],
      },
    },
    {
      type: "footnotes",
      props: {
        notes: [
          "Strategic Void Internal Research, Q3 2025 (unpublished). Methodology available upon request and completion of a 14-page NDA.",
          "Calendar Density Satisfaction (CDS) is a proprietary metric developed by Strategic Void Consulting. It has not been peer-reviewed, nor do we intend it to be.",
          "The 73% figure has been independently verified by our internal verification team, which reports to the same division that produced the original research.",
        ],
      },
    },
    {
      type: "author-bio",
      props: {
        name: 'Maximilian "Max" Thornbury III',
        title: "Founder & Chief Alignment Officer",
        bio: "Max founded Strategic Void Consulting in 1987 and has spent 39 years helping organizations redirect their energy toward alignment. He holds an MBA from Harvard ('82) and invented the C.H.A.O.S. Framework™.",
        image: "/sites/strategicvoid/exec-thornbury.png",
      },
    },
  ],
}
```

- [ ] **Step 4: Create whitepapers barrel**

```typescript
// src/sites/strategicvoid/data/whitepapers/index.ts
import type { Whitepaper } from "../types"
import { stateOfMeetingOptimization } from "./state-of-meeting-optimization"

// All whitepapers — additional files added in Plan 4
export const whitepapers: Whitepaper[] = [
  stateOfMeetingOptimization,
]

export function getWhitepaperBySlug(slug: string): Whitepaper | undefined {
  return whitepapers.find((wp) => wp.slug === slug)
}

export function getWhitepapersBySolution(solutionSlug: string): Whitepaper[] {
  return whitepapers.filter((wp) => wp.solutionArea === solutionSlug)
}
```

- [ ] **Step 5: Run type check and commit**

Run: `npx tsc --noEmit`
Expected: PASS

```bash
git add src/sites/strategicvoid/data/case-studies/ src/sites/strategicvoid/data/whitepapers/
git commit -m "feat: add stub case study and whitepaper with full Meeting Optimization content"
```

---

## Task 13: Create Page Templates

**Files:**
- Create: `src/sites/strategicvoid/pages/solution-page.tsx`
- Create: `src/sites/strategicvoid/pages/solution-router.tsx`
- Create: `src/sites/strategicvoid/pages/product-detail.tsx`
- Create: `src/sites/strategicvoid/pages/case-study-page.tsx`
- Create: `src/sites/strategicvoid/pages/whitepaper-page.tsx`

- [ ] **Step 1: Create SolutionPage template**

This component receives a solution slug, looks up the solution data, and renders the template layout with product grid, pricing, case study previews, and whitepaper previews.

```typescript
// src/sites/strategicvoid/pages/solution-page.tsx
"use client"

import { getSolutionBySlug } from "@/sites/strategicvoid/data/solutions"
import { getProductsBySolution } from "@/sites/strategicvoid/data/products"
import { getCaseStudiesBySolution } from "@/sites/strategicvoid/data/case-studies"
import { getWhitepapersBySolution } from "@/sites/strategicvoid/data/whitepapers"
import { solutionPricing } from "@/sites/strategicvoid/data/pricing"
import { ProductCard } from "@/components/ui/product-card"
import { CaseStudyCard } from "@/components/ui/case-study-card"
import { WhitepaperCard } from "@/components/ui/whitepaper-card"
import { EnterprisePricingTable } from "@/components/ui/enterprise-pricing-table"
import { Hero } from "@/components/ui/hero"
import { useSiteLink } from "@/hooks/use-site-link"

export default function SolutionPage({ slug }: { slug: string }) {
  const solution = getSolutionBySlug(slug)
  const siteHref = useSiteLink()
  if (!solution) return null

  const solutionProducts = getProductsBySolution(slug)
  const casestudies = getCaseStudiesBySolution(slug)
  const papers = getWhitepapersBySolution(slug)
  const pricing = solutionPricing[slug]

  return (
    <>
      <Hero
        dark
        headline={solution.name}
        subheadline={solution.tagline}
        ctaText="Request a Demo"
        ctaHref={siteHref("/contact")}
      />

      {/* Overview */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        {solution.description.map((p, i) => (
          <p key={i} className="text-foreground/70 leading-relaxed mb-4">{p}</p>
        ))}
      </section>

      {/* Products */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">Products in This Suite</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutionProducts.map((product) => (
            <ProductCard
              key={product.slug}
              slug={`solutions/${slug}/${product.slug}`}
              name={product.name}
              price={product.price}
              tagline={product.tagline}
              image={product.image}
              showAddToCart={false}
            />
          ))}
        </div>
      </section>

      {/* Pricing */}
      {pricing && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">Pricing</h2>
          <EnterprisePricingTable
            tiers={pricing.tiers}
            highlightedTier={pricing.tiers.findIndex((t) => t.highlighted)}
          />
        </section>
      )}

      {/* Case Studies */}
      {casestudies.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {casestudies.map((cs) => (
              <CaseStudyCard
                key={cs.slug}
                slug={cs.slug}
                company={cs.company}
                heroStat={cs.heroStat}
                solutionArea={solution.name}
                summary={cs.summary}
              />
            ))}
          </div>
        </section>
      )}

      {/* Whitepapers */}
      {papers.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">Whitepapers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {papers.map((wp) => (
              <WhitepaperCard
                key={wp.slug}
                slug={wp.slug}
                title={wp.title}
                type={wp.type}
                solutionArea={solution.name}
                readTime={wp.readTime}
                authors={wp.authors}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Ready to Optimize?</h2>
        <p className="text-foreground/60 mb-6">Schedule an alignment assessment with our team.</p>
        <a href={siteHref("/contact")} className="inline-block bg-accent text-background px-8 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors">
          Schedule an Alignment Session
        </a>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create SolutionRouter**

```typescript
// src/sites/strategicvoid/pages/solution-router.tsx
"use client"

import SolutionPage from "./solution-page"
import ProductDetailPage from "./product-detail"

export default function SolutionRouter({ slug, segments }: { slug: string; segments?: string[] }) {
  if (segments && segments.length === 2) {
    // /solutions/[area]/[product] — render product detail
    return <ProductDetailPage solutionSlug={segments[0]} productSlug={segments[1]} />
  }
  // /solutions/[area] — render solution page
  return <SolutionPage slug={slug} />
}
```

- [ ] **Step 3: Create ProductDetail template**

```typescript
// src/sites/strategicvoid/pages/product-detail.tsx
"use client"

import { getProductBySlug, getProductsBySolution } from "@/sites/strategicvoid/data/products"
import { getSolutionBySlug } from "@/sites/strategicvoid/data/solutions"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { useSiteLink } from "@/hooks/use-site-link"
import Image from "next/image"

export default function ProductDetailPage({ solutionSlug, productSlug }: { solutionSlug: string; productSlug: string }) {
  const product = getProductBySlug(productSlug)
  const solution = getSolutionBySlug(solutionSlug)
  const siteHref = useSiteLink()
  if (!product || !solution) return null

  const relatedProducts = getProductsBySolution(solutionSlug).filter((p) => p.slug !== productSlug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square bg-secondary/10 rounded-lg overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-accent">{solution.name}</span>
            <h1 className="text-3xl font-heading font-semibold text-foreground mt-2">{product.name}</h1>
            <p className="text-lg text-foreground/60 mt-2">{product.tagline}</p>
            <div className="text-2xl font-bold text-accent mt-4">{product.price}</div>
            {product.enterpriseTier && (
              <p className="text-sm text-foreground/40 mt-1">Included in {product.enterpriseTier} and above</p>
            )}
            <a href={siteHref("/contact")} className="inline-block mt-6 bg-accent text-background px-8 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors">
              Request a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        {product.description.map((p, i) => (
          <p key={i} className="text-foreground/70 leading-relaxed mb-4">{p}</p>
        ))}
      </section>

      {/* Features & Specs */}
      {(product.features.length > 0 || product.specs.length > 0) && (
        <section className="py-12 px-4 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {product.features.length > 0 && (
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Features</h2>
                <ul className="space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                      <span className="text-accent mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.specs.length > 0 && (
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Specifications</h2>
                <div className="space-y-2">
                  {product.specs.map((s, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-primary/5 text-sm">
                      <span className="text-foreground/50">{s.label}</span>
                      <span className="text-foreground/70 font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.slug}
                slug={`solutions/${solutionSlug}/${p.slug}`}
                name={p.name}
                price={p.price}
                tagline={p.tagline}
                image={p.image}
                showAddToCart={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <a href={siteHref("/contact")} className="inline-block bg-accent text-background px-8 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors">
          Schedule an Alignment Session
        </a>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Create CaseStudyPage renderer**

```typescript
// src/sites/strategicvoid/pages/case-study-page.tsx
"use client"

import { getCaseStudyBySlug } from "@/sites/strategicvoid/data/case-studies"
import { SectionRenderer } from "@/components/content-sections/section-renderer"

export default function CaseStudyPage({ slug }: { slug: string; segments?: string[] }) {
  const caseStudy = getCaseStudyBySlug(slug)
  if (!caseStudy) return null

  return (
    <article>
      <SectionRenderer sections={caseStudy.sections} />
    </article>
  )
}
```

- [ ] **Step 5: Create WhitepaperPage renderer with email gate**

```typescript
// src/sites/strategicvoid/pages/whitepaper-page.tsx
"use client"

import { getWhitepaperBySlug } from "@/sites/strategicvoid/data/whitepapers"
import { SectionRenderer } from "@/components/content-sections/section-renderer"
import { EmailGateForm } from "@/components/ui/email-gate-form"

export default function WhitepaperPage({ slug }: { slug: string; segments?: string[] }) {
  const whitepaper = getWhitepaperBySlug(slug)
  if (!whitepaper) return null

  return (
    <article>
      <EmailGateForm
        title="Access This Whitepaper"
        subtitle="Enter your corporate email to unlock this strategic resource."
        storageKey={`sv-wp-${slug}`}
      >
        <SectionRenderer sections={whitepaper.sections} />
      </EmailGateForm>
    </article>
  )
}
```

- [ ] **Step 6: Run type check and commit**

Run: `npx tsc --noEmit`
Expected: PASS

```bash
git add src/sites/strategicvoid/pages/
git commit -m "feat: add page templates for solutions, products, case studies, and whitepapers"
```

---

## Task 14: Create Index Pages and Homepage

**Files:**
- Create: `src/sites/strategicvoid/pages/home.tsx`
- Create: `src/sites/strategicvoid/pages/solutions-index.tsx`
- Create: `src/sites/strategicvoid/pages/case-studies-index.tsx`
- Create: `src/sites/strategicvoid/pages/whitepapers-index.tsx`

- [ ] **Step 1: Create Homepage**

```typescript
// src/sites/strategicvoid/pages/home.tsx
"use client"

import { Hero } from "@/components/ui/hero"
import { SolutionCard } from "@/components/ui/solution-card"
import { MetricCounter } from "@/components/ui/metric-counter"
import { CaseStudyCard } from "@/components/ui/case-study-card"
import { solutions } from "@/sites/strategicvoid/data/solutions"
import { getProductsBySolution } from "@/sites/strategicvoid/data/products"
import { caseStudies } from "@/sites/strategicvoid/data/case-studies"
import { useSiteLink } from "@/hooks/use-site-link"

export default function StrategicVoidHome() {
  const siteHref = useSiteLink()
  const featuredCaseStudies = caseStudies.slice(0, 4)

  return (
    <>
      <Hero
        dark
        headline="Aligning Your Organization Beyond Productivity"
        subheadline="Strategic Void Consulting — Creators of the C.H.A.O.S. Framework™. Enterprise alignment solutions for organizations ready to optimize beyond measurable outcomes."
        ctaText="Explore Solutions"
        ctaHref={siteHref("/solutions")}
        secondaryCtaText="Read the Methodology"
        secondaryCtaHref={siteHref("/methodology")}
      />

      {/* Metrics */}
      <section className="py-16 px-4 border-b border-primary/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricCounter value={2847} label="Enterprise Clients Aligned" suffix="+" />
          <MetricCounter value={39} label="Years of Strategic Inertia" />
          <MetricCounter value={97} label="Alignment Satisfaction Score" suffix="%" />
          <MetricCounter value={14000000} label="Meeting Hours Optimized" prefix="" suffix="+" />
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold text-foreground text-center mb-4">Our Solutions</h2>
          <p className="text-foreground/60 text-center mb-12 max-w-2xl mx-auto">
            Eight practice areas designed to transform every dimension of your organization&apos;s relationship with productivity.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((s) => (
              <SolutionCard
                key={s.slug}
                name={s.name}
                tagline={s.tagline}
                productCount={getProductsBySolution(s.slug).length}
                slug={s.slug}
                icon={s.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredCaseStudies.length > 0 && (
        <section className="py-16 px-4 border-t border-primary/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-semibold text-foreground text-center mb-4">Client Transformations</h2>
            <p className="text-foreground/60 text-center mb-12">
              See how leading organizations have embraced strategic non-productivity.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredCaseStudies.map((cs) => (
                <CaseStudyCard
                  key={cs.slug}
                  slug={cs.slug}
                  company={cs.company}
                  heroStat={cs.heroStat}
                  solutionArea={cs.solutionArea}
                  summary={cs.summary}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 text-center border-t border-primary/10">
        <h2 className="text-3xl font-heading font-semibold text-foreground mb-4">Ready to Align?</h2>
        <p className="text-foreground/60 mb-8 max-w-xl mx-auto">
          Schedule a complimentary alignment assessment with one of our senior partners.
        </p>
        <a href={siteHref("/contact")} className="inline-block bg-accent text-background px-8 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors">
          Schedule an Alignment Session
        </a>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create Solutions Index, Case Studies Index, Whitepapers Index**

```typescript
// src/sites/strategicvoid/pages/solutions-index.tsx
"use client"

import { SolutionCard } from "@/components/ui/solution-card"
import { solutions } from "@/sites/strategicvoid/data/solutions"
import { getProductsBySolution } from "@/sites/strategicvoid/data/products"

export const metadata = {
  title: "Solutions — Strategic Void Consulting",
  description: "Eight enterprise solution suites powered by the C.H.A.O.S. Framework™.",
}

export default function SolutionsIndex() {
  return (
    <>
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl font-heading font-semibold text-foreground">Our Solutions</h1>
        <p className="text-lg text-foreground/60 mt-4 max-w-2xl mx-auto">
          Eight practice areas. 34 products. One framework. Zero measurable outcomes.
        </p>
      </section>
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {solutions.map((s) => (
            <SolutionCard
              key={s.slug}
              name={s.name}
              tagline={s.tagline}
              productCount={getProductsBySolution(s.slug).length}
              slug={s.slug}
              icon={s.icon}
            />
          ))}
        </div>
      </section>
    </>
  )
}
```

```typescript
// src/sites/strategicvoid/pages/case-studies-index.tsx
"use client"

import { CaseStudyCard } from "@/components/ui/case-study-card"
import { caseStudies } from "@/sites/strategicvoid/data/case-studies"
import { getSolutionBySlug } from "@/sites/strategicvoid/data/solutions"

export const metadata = {
  title: "Case Studies — Strategic Void Consulting",
  description: "See how leading organizations have embraced strategic non-productivity.",
}

export default function CaseStudiesIndex() {
  return (
    <>
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl font-heading font-semibold text-foreground">Case Studies</h1>
        <p className="text-lg text-foreground/60 mt-4 max-w-2xl mx-auto">
          Real transformations. Real organizations. Measurably less productive.
        </p>
      </section>
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs) => {
            const solution = getSolutionBySlug(cs.solutionArea)
            return (
              <CaseStudyCard
                key={cs.slug}
                slug={cs.slug}
                company={cs.company}
                heroStat={cs.heroStat}
                solutionArea={solution?.name || cs.solutionArea}
                summary={cs.summary}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
```

```typescript
// src/sites/strategicvoid/pages/whitepapers-index.tsx
"use client"

import { WhitepaperCard } from "@/components/ui/whitepaper-card"
import { whitepapers } from "@/sites/strategicvoid/data/whitepapers"
import { getSolutionBySlug } from "@/sites/strategicvoid/data/solutions"

export const metadata = {
  title: "Whitepapers — Strategic Void Consulting",
  description: "Strategic research and thought leadership from the C.H.A.O.S. Framework™ team.",
}

export default function WhitepapersIndex() {
  return (
    <>
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl font-heading font-semibold text-foreground">Whitepapers</h1>
        <p className="text-lg text-foreground/60 mt-4 max-w-2xl mx-auto">
          Strategic research and thought leadership. Email required. Insight optional.
        </p>
      </section>
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {whitepapers.map((wp) => {
            const solution = getSolutionBySlug(wp.solutionArea)
            return (
              <WhitepaperCard
                key={wp.slug}
                slug={wp.slug}
                title={wp.title}
                type={wp.type}
                solutionArea={solution?.name || wp.solutionArea}
                readTime={wp.readTime}
                authors={wp.authors}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Run type check and commit**

Run: `npx tsc --noEmit`
Expected: PASS

```bash
git add src/sites/strategicvoid/pages/
git commit -m "feat: add homepage, solutions index, case studies index, and whitepapers index"
```

---

## Task 15: Create Site Barrel and Register in Registry

**Files:**
- Create: `src/sites/strategicvoid/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create site barrel with pages map and dynamic routes**

```typescript
// src/sites/strategicvoid/index.ts
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import StrategicVoidHome from "./pages/home"
import SolutionsIndex, { metadata as solutionsMetadata } from "./pages/solutions-index"
import CaseStudiesIndex, { metadata as caseStudiesMetadata } from "./pages/case-studies-index"
import WhitepapersIndex, { metadata as whitepapersMetadata } from "./pages/whitepapers-index"
import SolutionRouter from "./pages/solution-router"
import CaseStudyPage from "./pages/case-study-page"
import WhitepaperPage from "./pages/whitepaper-page"
import { getSolutionBySlug, getSolutionSlugs } from "./data/solutions"
import { getProductBySlug, getProductsBySolution } from "./data/products"
import { getCaseStudyBySlug } from "./data/case-studies"
import { getWhitepaperBySlug } from "./data/whitepapers"

export { config }

export const pages: Record<string, PageEntry> = {
  "": StrategicVoidHome,
  "solutions": { component: SolutionsIndex, metadata: solutionsMetadata },
  "case-studies": { component: CaseStudiesIndex, metadata: caseStudiesMetadata },
  "whitepapers": { component: WhitepapersIndex, metadata: whitepapersMetadata },
  // Unique pages added in Plan 2: methodology, pricing, about, leadership, contact, privacy, terms
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  "solutions": {
    component: SolutionRouter,
    maxSegments: 2,
    getMetadata: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const product = getProductBySlug(segments[1])
        const solution = getSolutionBySlug(segments[0])
        return product && solution
          ? { title: `${product.name} — ${solution.name} — Strategic Void Consulting`, description: product.tagline }
          : undefined
      }
      const solution = getSolutionBySlug(slug)
      return solution
        ? { title: `${solution.name} — Strategic Void Consulting`, description: solution.tagline }
        : undefined
    },
    isValidSlug: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const solution = getSolutionBySlug(segments[0])
        if (!solution) return false
        const product = getProductBySlug(segments[1])
        return !!product && product.solutionArea === segments[0]
      }
      return getSolutionSlugs().includes(slug)
    },
  },
  "case-studies": {
    component: CaseStudyPage,
    getMetadata: (slug: string) => {
      const cs = getCaseStudyBySlug(slug)
      return cs ? { title: `${cs.title} — Strategic Void Consulting`, description: cs.summary } : undefined
    },
    isValidSlug: (slug: string) => !!getCaseStudyBySlug(slug),
  },
  "whitepapers": {
    component: WhitepaperPage,
    getMetadata: (slug: string) => {
      const wp = getWhitepaperBySlug(slug)
      return wp ? { title: `${wp.title} — Strategic Void Consulting`, description: wp.subtitle } : undefined
    },
    isValidSlug: (slug: string) => !!getWhitepaperBySlug(slug),
  },
}
```

- [ ] **Step 2: Register in site registry**

Add to `src/sites/registry.ts`:

```typescript
import { config as strategicvoidConfig, pages as strategicvoidPages, dynamicRoutes as strategicvoidDynamicRoutes } from "./strategicvoid"
```

Add to `siteRegistry`:

```typescript
strategicvoid: { config: strategicvoidConfig, pages: strategicvoidPages, dynamicRoutes: strategicvoidDynamicRoutes },
```

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Run dev server and verify end-to-end**

Run: `npm run dev`

Test these URLs:
- `localhost:3000/?site=strategicvoid` — homepage with solutions grid, metrics, case study preview
- `localhost:3000/solutions?site=strategicvoid` — solutions index with all 8 cards
- `localhost:3000/solutions/meeting-optimization?site=strategicvoid` — solution page with products, pricing, case study preview
- `localhost:3000/solutions/meeting-optimization/meeting-brick?site=strategicvoid` — product detail with specs and features
- `localhost:3000/case-studies?site=strategicvoid` — case studies index
- `localhost:3000/case-studies/globaltech-meeting-optimization?site=strategicvoid` — full case study with sections
- `localhost:3000/whitepapers?site=strategicvoid` — whitepapers index
- `localhost:3000/whitepapers/state-of-meeting-optimization?site=strategicvoid` — whitepaper with email gate

Verify:
- MegaMenu renders on desktop with Solutions dropdown
- Dark navy/gold theme applies correctly
- Playfair Display renders for headings
- Product links resolve correctly under solutions/area/product
- Email gate on whitepaper accepts any input and reveals content
- Existing sites (pigmilk, inflatableanchors) are unaffected

- [ ] **Step 5: Run production build**

Run: `npm run build`
Expected: PASS (no build errors)

- [ ] **Step 6: Commit**

```bash
git add src/sites/strategicvoid/index.ts src/sites/registry.ts
git commit -m "feat: register strategicvoid site with full routing and Meeting Optimization content"
```

---

## Task 16: Create Placeholder Image

**Files:**
- Create: `public/sites/strategicvoid/product-placeholder.png`

- [ ] **Step 1: Generate a placeholder product image**

Use the MCP `generate_image` tool to create a generic dark corporate placeholder:

Prompt: "Minimalist corporate product placeholder on dark navy background (#0a1628). Simple geometric gold outline of a cube or abstract shape. Clean, professional, enterprise aesthetic. No text."
Dimensions: 1024x1024
Filename: product-placeholder.png

Move the generated image to `public/sites/strategicvoid/product-placeholder.png`.

- [ ] **Step 2: Commit**

```bash
git add public/sites/strategicvoid/product-placeholder.png
git commit -m "feat: add placeholder product image for strategicvoid"
```

---

## Verification Checklist

After all tasks are complete, verify:

- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] All existing sites (pigmilk, dehydratedwater, inflatableanchors, apex) are unaffected
- [ ] Strategic Void homepage renders with solutions grid and metrics
- [ ] MegaMenu dropdown works on desktop, accordion on mobile
- [ ] Solutions → Meeting Optimization → Meeting Brick product flow works end-to-end
- [ ] Case study renders with composed sections
- [ ] Whitepaper renders behind email gate
- [ ] Dark navy/gold theme is visually distinct from all other sites
