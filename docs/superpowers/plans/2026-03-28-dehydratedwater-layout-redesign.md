# Dehydrated Water Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign 7 pages of the dehydrated water site with 10 new shared components and 1 modified component to visually differentiate it from pigmilk, plus rewrite privacy/terms content with escalating chemistry jargon.

**Architecture:** Build new shared components first (all in `src/components/ui/`), then modify the Hero component, then rewrite each page to use the new components. All components are theme-aware via CSS variables and responsive via Tailwind breakpoints. All images are 1536x1024 (3:2) from OpenAI, handled via `object-cover`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, React 19

**Spec:** `docs/superpowers/specs/2026-03-28-dehydratedwater-layout-redesign.md`

---

### Task 1: WaveDivider Component

**Files:**
- Create: `src/components/ui/wave-divider.tsx`

- [ ] **Step 1: Create WaveDivider component**

```tsx
interface WaveDividerProps {
  variant?: "wave1" | "wave2" | "wave3"
  flip?: boolean
  fromColor?: string
  toColor?: string
}

const waves = {
  wave1: "M0,32 C320,64 640,0 960,32 C1120,48 1280,64 1440,48 L1440,64 L0,64 Z",
  wave2: "M0,48 C240,16 480,56 720,32 C960,8 1200,48 1440,24 L1440,64 L0,64 Z",
  wave3: "M0,40 C180,60 360,20 540,40 C720,60 900,20 1080,40 C1260,60 1440,20 L1440,64 L0,64 Z",
}

export function WaveDivider({
  variant = "wave1",
  flip = false,
  fromColor,
  toColor,
}: WaveDividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: fromColor,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 64"
        className="block w-full h-auto"
        preserveAspectRatio="none"
        style={{ fill: toColor || "var(--color-background)" }}
      >
        <path d={waves[variant]} />
      </svg>
    </div>
  )
}
```

Server component — no `"use client"` needed.

- [ ] **Step 2: Verify no type errors**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/wave-divider.tsx
git commit -m "feat: add WaveDivider shared component"
```

---

### Task 2: AnimatedCounter Component

**Files:**
- Create: `src/components/ui/animated-counter.tsx`

- [ ] **Step 1: Create AnimatedCounter component**

```tsx
"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
}

export function AnimatedCounter({
  end,
  label,
  prefix = "",
  suffix = "",
  duration = 2000,
}: AnimatedCounterProps) {
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
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <div ref={ref} className="py-10 px-4 text-center">
      <div className="font-mono text-5xl md:text-6xl font-bold text-foreground">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-foreground/60 mt-2 text-lg">{label}</div>
    </div>
  )
}
```

- [ ] **Step 2: Verify no type errors**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/animated-counter.tsx
git commit -m "feat: add AnimatedCounter shared component"
```

---

### Task 3: ComparisonTable Component

**Files:**
- Create: `src/components/ui/comparison-table.tsx`

- [ ] **Step 1: Create ComparisonTable component**

```tsx
interface ComparisonTableProps {
  title?: string
  columns: Array<{ name: string; highlighted?: boolean }>
  rows: Array<{ label: string; values: string[] }>
  footnote?: string
}

export function ComparisonTable({ title, columns, rows, footnote }: ComparisonTableProps) {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-2xl font-heading font-bold text-white text-center mb-8">
            {title}
          </h2>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-accent font-normal" />
                {columns.map((col) => (
                  <th
                    key={col.name}
                    className={`py-3 px-4 text-center font-heading font-bold ${
                      col.highlighted
                        ? "text-white bg-white/10 border-b-2 border-accent"
                        : "text-accent"
                    }`}
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <td className="py-3 px-4 text-accent font-semibold sticky left-0 bg-primary">
                    {row.label}
                  </td>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={`py-3 px-4 text-center ${
                        columns[i]?.highlighted
                          ? "text-white bg-white/10"
                          : "text-white/60"
                      }`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footnote && (
          <p className="text-accent/70 text-xs italic text-center mt-6">{footnote}</p>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify no type errors**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/comparison-table.tsx
git commit -m "feat: add ComparisonTable shared component"
```

---

### Task 4: ProductCarousel Component

**Files:**
- Create: `src/components/ui/product-carousel.tsx`

- [ ] **Step 1: Create ProductCarousel component**

```tsx
"use client"

import { useRef } from "react"

interface ProductCarouselProps {
  title?: string
  children: React.ReactNode
}

export function ProductCarousel({ title, children }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.6
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-2xl font-heading font-bold text-center mb-8">{title}</h2>
        )}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary text-white rounded-full items-center justify-center hover:opacity-90 transition-opacity shadow-lg"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory md:snap-none scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {children}
          </div>
          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary text-white rounded-full items-center justify-center hover:opacity-90 transition-opacity shadow-lg"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
```

Note: Each child (ProductCard) should have `className="min-w-[260px] sm:min-w-[280px] snap-start shrink-0"` added where used in pages.

- [ ] **Step 2: Verify no type errors**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/product-carousel.tsx
git commit -m "feat: add ProductCarousel shared component"
```

---

### Task 5: SplitSection Component

**Files:**
- Create: `src/components/ui/split-section.tsx`

- [ ] **Step 1: Create SplitSection component**

```tsx
import Image from "next/image"

interface SplitSectionProps {
  image: string
  imagePosition?: "left" | "right"
  dark?: boolean
  children: React.ReactNode
}

export function SplitSection({
  image,
  imagePosition = "left",
  dark = false,
  children,
}: SplitSectionProps) {
  const imageBlock = (
    <div className="relative min-h-[300px] md:min-h-[400px]">
      <Image src={image} alt="" fill className="object-cover" />
    </div>
  )

  const textBlock = (
    <div
      className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
        dark ? "bg-primary text-white" : "bg-background text-foreground"
      }`}
    >
      {children}
    </div>
  )

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </section>
  )
}
```

Server component — children can contain links but the layout itself needs no client JS.

- [ ] **Step 2: Verify no type errors**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/split-section.tsx
git commit -m "feat: add SplitSection shared component"
```

---

### Task 6: PromoBanner, StatStrip, FeaturedProductSpotlight Components

**Files:**
- Create: `src/components/ui/promo-banner.tsx`
- Create: `src/components/ui/stat-strip.tsx`
- Create: `src/components/ui/featured-product-spotlight.tsx`

- [ ] **Step 1: Create PromoBanner**

```tsx
import Link from "next/link"

interface PromoBannerProps {
  headline: string
  subtext?: string
  ctaText?: string
  ctaHref?: string
}

export function PromoBanner({ headline, subtext, ctaText, ctaHref }: PromoBannerProps) {
  return (
    <section className="py-10 px-4 bg-gradient-to-r from-accent to-primary text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-xl md:text-2xl font-heading font-bold text-white">{headline}</p>
        {subtext && <p className="text-white/70 text-sm mt-2">{subtext}</p>}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-block mt-4 px-8 py-3 border border-white text-white font-heading text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
```

Note: PromoBanner uses a plain `Link` (no `useSiteLink()`), matching the existing `CTABanner` pattern. Server-rendered links work without the `?site=` param because middleware handles subdomain routing on each request.

- [ ] **Step 2: Create StatStrip**

```tsx
interface StatStripProps {
  stats: Array<{
    icon: string
    value: string
    label: string
  }>
}

export function StatStrip({ stats }: StatStripProps) {
  return (
    <section className="py-10 px-4 bg-secondary/10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="text-center flex flex-col items-center">
            <span className="text-3xl mb-2">{stat.icon}</span>
            <span className="text-xl font-heading font-bold text-foreground">{stat.value}</span>
            <span className="text-sm text-foreground/60">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create FeaturedProductSpotlight**

```tsx
import Image from "next/image"
import Link from "next/link"

interface FeaturedProductSpotlightProps {
  image: string
  eyebrow?: string
  title: string
  description: string
  ctaText: string
  ctaHref: string
  imagePosition?: "left" | "right"
}

export function FeaturedProductSpotlight({
  image,
  eyebrow,
  title,
  description,
  ctaText,
  ctaHref,
  imagePosition = "right",
}: FeaturedProductSpotlightProps) {
  const imageBlock = (
    <div className="relative min-h-[300px] md:min-h-[400px] bg-secondary/10">
      <Image src={image} alt={title} fill className="object-cover" />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
      {eyebrow && (
        <span className="text-accent text-xs font-heading tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
        {title}
      </h2>
      <p className="text-foreground/70 mb-6 leading-relaxed">{description}</p>
      <div>
        <Link
          href={ctaHref}
          className="inline-block px-8 py-3 bg-primary text-white font-heading text-sm tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  )

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </section>
  )
}
```

- [ ] **Step 4: Verify no type errors**

Run: `npx tsc --noEmit`

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/promo-banner.tsx src/components/ui/stat-strip.tsx src/components/ui/featured-product-spotlight.tsx
git commit -m "feat: add PromoBanner, StatStrip, and FeaturedProductSpotlight shared components"
```

---

### Task 7: ProcessFlow Component

**Files:**
- Create: `src/components/ui/process-flow.tsx`

- [ ] **Step 1: Create ProcessFlow component**

This component renders each step in a different layout variant, cycling through 4 patterns.

```tsx
import Image from "next/image"

interface ProcessStep {
  number: string
  title: string
  description: string
  image: string
}

interface ProcessFlowProps {
  steps: ProcessStep[]
}

function StepVariantA({ step }: { step: ProcessStep }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-6 items-center">
      <div className="text-6xl md:text-8xl font-heading font-bold text-accent/20 text-center md:text-left">
        {step.number}
      </div>
      <div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{step.title}</h3>
        <p className="text-foreground/70 leading-relaxed">{step.description}</p>
      </div>
      <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
        <Image src={step.image} alt={step.title} fill className="object-cover" />
      </div>
    </div>
  )
}

function StepVariantB({ step }: { step: ProcessStep }) {
  return (
    <div className="relative min-h-[300px] flex items-center justify-center overflow-hidden rounded-lg">
      <Image src={step.image} alt={step.title} fill className="object-cover brightness-[0.3]" />
      <div className="relative z-10 text-center p-8 max-w-2xl">
        <div className="text-5xl font-heading font-bold text-accent/50 mb-2">{step.number}</div>
        <h3 className="text-2xl font-heading font-bold text-white mb-3">{step.title}</h3>
        <p className="text-white/80 leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}

function StepVariantC({ step }: { step: ProcessStep }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_100px] gap-6 items-center">
      <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
        <Image src={step.image} alt={step.title} fill className="object-cover" />
      </div>
      <div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{step.title}</h3>
        <p className="text-foreground/70 leading-relaxed">{step.description}</p>
      </div>
      <div className="text-6xl md:text-8xl font-heading font-bold text-accent/20 text-center md:text-right">
        {step.number}
      </div>
    </div>
  )
}

function StepVariantD({ step }: { step: ProcessStep }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 items-center">
      <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
        <Image src={step.image} alt={step.title} fill className="object-cover" />
      </div>
      <div>
        <div className="text-5xl font-heading font-bold text-accent/20 mb-2">{step.number}</div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{step.title}</h3>
        <p className="text-foreground/70 leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}

const variants = [StepVariantA, StepVariantB, StepVariantC, StepVariantD]

export function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {steps.map((step, i) => {
          const Variant = variants[i % variants.length]
          return (
            <div key={step.number}>
              <Variant step={step} />
              {i < steps.length - 1 && (
                <div className="flex justify-center my-8">
                  <div className="w-px h-12 bg-accent/30" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

Mobile: The grid layouts naturally stack to single column via `grid-cols-1 md:grid-cols-[...]`.

- [ ] **Step 2: Verify no type errors**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/process-flow.tsx
git commit -m "feat: add ProcessFlow shared component with 4 layout variants"
```

---

### Task 8: CascadeTimeline Component

**Files:**
- Create: `src/components/ui/cascade-timeline.tsx`

- [ ] **Step 1: Create CascadeTimeline component**

Desktop: progressive right-indentation with arrows. Mobile: vertical timeline (same as existing Timeline component layout).

```tsx
"use client"

interface CascadeTimelineProps {
  items: Array<{ year: string; description: string }>
}

export function CascadeTimeline({ items }: CascadeTimelineProps) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Desktop: cascading layout */}
      <div className="hidden md:block space-y-4">
        {items.map((item, i) => (
          <div key={item.year}>
            <div
              className="flex items-start gap-4"
              style={{ marginLeft: `${i * 40}px` }}
            >
              <div className="shrink-0 w-16 h-10 flex items-center justify-center bg-primary rounded text-white font-heading font-bold text-sm">
                {item.year}
              </div>
              <div className="flex items-start gap-3">
                <svg className="shrink-0 mt-2.5 text-accent" width="20" height="12" viewBox="0 0 20 12">
                  <path d="M0,6 L14,6 M10,1 L16,6 L10,11" stroke="currentColor" fill="none" strokeWidth="1.5" />
                </svg>
                <p className="text-foreground/80 text-sm pt-1.5">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: vertical timeline (matches existing Timeline pattern) */}
      <div className="md:hidden space-y-6">
        {items.map((item) => (
          <div key={item.year} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
              <div className="w-px flex-1 bg-primary/20" />
            </div>
            <div className="pb-6">
              <span className="font-bold text-lg text-primary">{item.year}</span>
              <p className="text-foreground/80 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

Note: Uses `"use client"` for simplicity, though the current implementation uses CSS-only responsive via `hidden md:block` / `md:hidden` which could work as a server component. Either approach is fine — keeping client for consistency with the `"use client"` designation in the spec.

- [ ] **Step 2: Verify no type errors**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/cascade-timeline.tsx
git commit -m "feat: add CascadeTimeline shared component with desktop cascade and mobile vertical fallback"
```

---

### Task 9: Hero Component Modification

**Files:**
- Modify: `src/components/ui/hero.tsx`

- [ ] **Step 1: Add dark mode and secondary CTA to Hero**

Read the current `src/components/ui/hero.tsx`. Add two new optional props:

- `dark?: boolean` — When true, uses `bg-primary` gradient with white text
- `secondaryCtaText?: string` and `secondaryCtaHref?: string` — Second CTA button with outlined/ghost style

The modification must be backward-compatible — existing pigmilk pages pass no `dark` or secondary CTA props and must continue working unchanged.

Update the Hero component:

```tsx
import Image from "next/image"
import Link from "next/link"

interface HeroProps {
  headline: string
  subheadline?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  image?: string
  dark?: boolean
}

export function Hero({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  image,
  dark = false,
}: HeroProps) {
  const hasCta = ctaText && ctaHref
  const hasSecondaryCta = secondaryCtaText && secondaryCtaHref
  const hasImage = !!image

  // Determine text colors
  const textWhite = hasImage || dark
  const headlineColor = textWhite ? "text-white" : "text-primary"
  const subColor = textWhite ? "text-white/80" : "text-foreground/60"

  return (
    <section
      className={`relative py-24 md:py-32 px-4 ${
        dark && !hasImage
          ? "bg-gradient-to-br from-primary to-accent/40"
          : hasImage
          ? ""
          : "bg-secondary/30"
      }`}
    >
      {hasImage && (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover brightness-50"
          priority
        />
      )}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className={`text-4xl md:text-5xl font-heading font-bold ${headlineColor} mb-4`}>
          {headline}
        </h1>
        {subheadline && (
          <p className={`text-lg md:text-xl ${subColor} mb-8 max-w-xl mx-auto`}>
            {subheadline}
          </p>
        )}
        {(hasCta || hasSecondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hasCta && (
              <Link
                href={ctaHref}
                className={`inline-block px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity ${
                  textWhite
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}
              >
                {ctaText}
              </Link>
            )}
            {hasSecondaryCta && (
              <Link
                href={secondaryCtaHref}
                className="inline-block px-8 py-3 rounded-lg font-semibold border border-white/50 text-white hover:bg-white/10 transition-colors"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify pigmilk pages still render correctly**

Run: `npx tsc --noEmit`
Run: `npx playwright test e2e/pigmilk-pages.spec.ts --reporter=line`
Expected: All pigmilk tests pass (backward-compatible).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/hero.tsx
git commit -m "feat: add dark mode and secondary CTA to Hero component"
```

---

### Task 10: Rewrite Homepage

**Files:**
- Modify: `src/sites/dehydratedwater/pages/home.tsx`

- [ ] **Step 1: Rewrite homepage with new layout**

Read the redesign spec section "Homepage" for the section flow. Read the current `src/sites/dehydratedwater/pages/home.tsx`. Rewrite the entire file.

The homepage flow is:
1. Dark Hero with dual CTAs
2. WaveDivider (wave1)
3. AnimatedCounter — "4,217,832 gallons liberated from wetness since 1847"
4. StatStrip — 3 badges
5. FeaturedProductSpotlight — Cloud Mist Nor'easter, image right
6. SplitSection (dark, image left) — Drywell Method teaser → links to /the-science
7. ProductCarousel — All 9 products
8. ComparisonTable — "How We Stack Up" with 3 columns and 6 rows from spec
9. TestimonialGrid — Same testimonials as current
10. PromoBanner — WaaS subscription CTA
11. WaveDivider (wave2, flipped)

Import all new components. The page should import products from the data file for the carousel. Each ProductCard in the carousel needs `className="min-w-[260px] sm:min-w-[280px] shrink-0"` wrapper div.

The comparison table data from the spec:
- Columns: Dehydrated Water (highlighted), Tap Water, Bottled Water
- Rows: Weight, Wetness, Shelf Life, Spillage Risk, Existential Doubt, Portability
- Footnote from spec

- [ ] **Step 2: Verify renders correctly**

Run: `npx tsc --noEmit`
Run: `npm run dev` — check `localhost:3000/?site=dehydratedwater` visually

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/home.tsx
git commit -m "feat: redesign dehydrated water homepage with new layout components"
```

---

### Task 11: Rewrite Products Page

**Files:**
- Modify: `src/sites/dehydratedwater/pages/products.tsx`

- [ ] **Step 1: Rewrite products page**

Read the redesign spec section "Products Page". The new flow:
1. Dark Hero — "The Collection"
2. WaveDivider
3. FeaturedProductSpotlight — Double-Dehydrated Dryer Water, eyebrow "Most Popular", image left
4. Categorized product grid with section headings:
   - "Heritage Collection": slugs `original`, `cloud-mist`, `starter-culture`
   - "Advanced Science": slugs `heavy-water`, `diet-water`, `dryer-water`, `ice-cubes`
   - "Experience": slugs `water-seasoning`, `waas`
5. PromoBanner — "First Packet Free*"

Categories are hardcoded slug arrays in the page component. Each category section has an accent-colored heading.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/products.tsx
git commit -m "feat: redesign products page with featured spotlight and categories"
```

---

### Task 12: Rewrite Product Detail Page

**Files:**
- Modify: `src/sites/dehydratedwater/pages/product-detail.tsx`

- [ ] **Step 1: Rewrite product detail page**

Read the redesign spec section "Product Detail". The new flow:
1. SplitSection (image left, light) — Product image + details
2. WaveDivider
3. Product description — Full-width centered prose
4. Science Facts panel — Keep existing FDA-label-parody styling
5. Variant cards (if applicable) — Horizontal row with accent borders
6. PromoBanner — "Browse the Collection"

The page is `"use client"` (needs AddToCartButton and useSiteLink). Replace the current 2-column grid with SplitSection for the hero area. Move description below into its own full-width section. Keep the Science Facts panel as-is.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/product-detail.tsx
git commit -m "feat: redesign product detail page with SplitSection layout"
```

---

### Task 13: Rewrite Our Story Page

**Files:**
- Modify: `src/sites/dehydratedwater/pages/our-story.tsx`

- [ ] **Step 1: Rewrite Our Story page**

Read the redesign spec section "Our Story". The new flow:
1. Dark Hero
2. WaveDivider
3. SplitSection (image right) — Founding story with `founder.png`
4. AnimatedCounter — "179 Years of Unnecessary Innovation"
5. CascadeTimeline — All 11 timeline items (already defined in the page data)
6. SplitSection (dark, image left) — Quote: "Water is burdened by its own wetness." — Ezekiel Drywell I, 1847. Use `quote-bg.png`.
7. Team grid — "The Team" with 4 TeamMembers (already updated with new names)
8. PromoBanner — "Join the legacy — Subscribe to WaaS"

Replace ImageTextSection with SplitSection. Replace Timeline with CascadeTimeline.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/our-story.tsx
git commit -m "feat: redesign Our Story page with CascadeTimeline and SplitSections"
```

---

### Task 14: Rewrite The Science Page

**Files:**
- Modify: `src/sites/dehydratedwater/pages/the-science.tsx`

- [ ] **Step 1: Rewrite The Science page**

Read the redesign spec section "The Science". The new flow:
1. Dark Hero
2. WaveDivider
3. ProcessFlow — 4 steps (Aqueous Acquisition, Thermal Dissociation, Vapor Recapture, Final Dehydration). Use existing step titles, descriptions, and science images.
4. StatStrip — "0 Peer Reviews / Submitted", "0 FDA Responses / Received", "2 Blog Views / All-time"
5. ComparisonTable — "The Drywell Method™ vs. Other Approaches" with 4 columns and 5 rows from spec
6. Publications section — Keep existing fake journal citations

Replace the 4x ImageTextSection pattern with the single ProcessFlow component.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/the-science.tsx
git commit -m "feat: redesign The Science page with ProcessFlow and ComparisonTable"
```

---

### Task 15: Rewrite WaaS Page

**Files:**
- Modify: `src/sites/dehydratedwater/pages/waas.tsx`

- [ ] **Step 1: Rewrite WaaS page**

Read the redesign spec section "WaaS". The new flow:
1. Dark Hero
2. WaveDivider
3. SplitSection (image right) — WaaS narrative with `waas-lifestyle.png`
4. StatStrip — 3 badges from spec
5. PricingTable — Same tiers (keep existing data and onSelect handler)
6. ComparisonTable — "WaaS vs. Buying Individual Packets" with 2 columns and 5 rows from spec
7. FaqAccordion — 3 WaaS-specific questions (cloud sync, cancellation, wax seal). Convert the current inline prose Q&A to use the FaqAccordion component.
8. PromoBanner — "Start your Apprenticeship today"

The page stays `"use client"` for the PricingTable onSelect handler.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/waas.tsx
git commit -m "feat: redesign WaaS page with SplitSection, ComparisonTable, and FaqAccordion"
```

---

### Task 16: Rewrite FAQ Page

**Files:**
- Modify: `src/sites/dehydratedwater/pages/faq.tsx`

- [ ] **Step 1: Rewrite FAQ page**

Read the redesign spec section "FAQ". The new flow:
1. Dark Hero
2. WaveDivider
3. Categorized FAQ sections with headings:
   - "About Our Products" (4 questions)
   - "Health & Safety" (3 questions)
   - "Storage & Handling" (2 questions)
   - "Orders & Returns" (3 questions)
   Each category has an accent-colored heading and uses FaqAccordion.
4. PromoBanner — "Still have questions? We probably don't have answers."

Keep all 12 existing FAQ items — just group them into categories. Each category gets its own FaqAccordion instance.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/faq.tsx
git commit -m "feat: redesign FAQ page with categorized sections"
```

---

### Task 17: Rewrite Privacy Policy Content

**Files:**
- Modify: `src/sites/dehydratedwater/pages/privacy.tsx`

- [ ] **Step 1: Rewrite privacy page content**

Read the redesign spec section "Privacy & Terms Content Rewrite". The structure stays (Dark Hero + WaveDivider + prose sections) but the content is completely rewritten with the escalating chemistry jargon approach:

- **Sections 1-2**: Readable. Standard-ish legal language. Clear satire disclaimer. States data collection is total.
- **Sections 3-4**: Water science terms creep in. "Data processing" → "reverse-osmotic data parsing."
- **Sections 5-6**: Heavy jargon. Molarity, pH, hydrogen bonding applied to data concepts.
- **Sections 7+**: Nearly unreadable. Full chemistry-paper prose.

Also add: Dark Hero (with `dark` prop), WaveDivider after hero.

Key content requirements:
- Satire disclaimer at top (readable) and bottom (jargon)
- Total data collection, no opt-out
- Cookie policy using water metaphors
- Data stored in leather-bound ledger (can't be reconstituted)
- Security: Reginald the cat (still referenced, just now a male cat)

Write complete replacement content for all sections. The page should have 8 sections minimum to allow the jargon to escalate properly.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/privacy.tsx
git commit -m "feat: rewrite privacy policy with escalating chemistry jargon"
```

---

### Task 18: Rewrite Terms of Use Content

**Files:**
- Modify: `src/sites/dehydratedwater/pages/terms.tsx`

- [ ] **Step 1: Rewrite terms page content**

Same escalating jargon approach as privacy. Add Dark Hero + WaveDivider.

Key content requirements:
- Acceptance is irrevocable ("like dehydration itself")
- Product disclaimers using chemistry terminology
- Shipping & Returns: liquid water in paper envelope policy
- Limitation of liability referencing states of matter
- Dispute resolution via Ezekiel IV
- Governing law: bylaws of Drywell Estate through lens of theoretical hydrology
- Satire disclaimer at top (readable) and bottom (jargon)
- 8+ sections for proper escalation

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/terms.tsx
git commit -m "feat: rewrite terms of use with escalating chemistry jargon"
```

---

### Task 19: Update E2E Tests

**Files:**
- Modify: `e2e/dehydratedwater-pages.spec.ts`
- Modify: `e2e/dehydratedwater-cart.spec.ts` (if needed)

- [ ] **Step 1: Update page tests for new layout**

The page tests need updated selectors for the redesigned pages. Key changes:

- Homepage: Add checks for "How We Stack Up" (ComparisonTable), "THE COLLECTION" or carousel presence, AnimatedCounter visibility
- Products: Check for category headings ("Heritage Collection", "Advanced Science", "Experience"), featured spotlight
- Our Story: Check for CascadeTimeline (year "1847" still present), "The Team" heading (already updated)
- The Science: Check for ProcessFlow steps, ComparisonTable
- WaaS: Check for ComparisonTable, FaqAccordion questions
- FAQ: Check for category headings ("About Our Products", "Health & Safety", etc.)
- Privacy/Terms: Check for new content markers (escalating jargon sections)

Read the existing test file, update assertions to match new page structures. Keep tests that still apply (nav links, footer, 404, cart icon, apex brand listing).

- [ ] **Step 2: Run updated tests**

Run: `npx playwright test e2e/dehydratedwater-pages.spec.ts --reporter=line`
Expected: All tests pass.

- [ ] **Step 3: Run cart tests (should still pass unchanged)**

Run: `npx playwright test e2e/dehydratedwater-cart.spec.ts --reporter=line`
Expected: All tests pass. Cart pages were not redesigned.

- [ ] **Step 4: Run pigmilk tests (regression check)**

Run: `npx playwright test e2e/pigmilk-pages.spec.ts e2e/pigmilk-cart.spec.ts --reporter=line`
Expected: All tests pass. No regressions.

- [ ] **Step 5: Commit**

```bash
git add e2e/dehydratedwater-pages.spec.ts
git commit -m "test: update E2E tests for redesigned page layouts"
```

---

### Task 20: Regenerate Screenshot Baselines

**Files:**
- Modify: `e2e/dehydratedwater-screenshots.spec.ts` (if selectors need updating)
- Regenerate: `e2e/screenshots/dehydratedwater-screenshots.spec.ts-snapshots/`

- [ ] **Step 1: Update screenshot test if needed**

Check if any screenshot test selectors reference elements that changed (e.g., the checkout mask selector). The screenshot tests mostly just navigate and snapshot — they should work as-is.

- [ ] **Step 2: Regenerate baselines**

Run: `npx playwright test e2e/dehydratedwater-screenshots.spec.ts --update-snapshots`
Expected: All 16 screenshots regenerated.

- [ ] **Step 3: Verify screenshots match**

Run: `npx playwright test e2e/dehydratedwater-screenshots.spec.ts`
Expected: All pass (matching freshly generated baselines).

- [ ] **Step 4: Commit**

```bash
git add e2e/screenshots/dehydratedwater-screenshots.spec.ts-snapshots/ e2e/dehydratedwater-screenshots.spec.ts
git commit -m "test: regenerate screenshot baselines for redesigned pages"
```

---

### Task 21: Final Verification

**Files:** None (verification only)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Succeeds.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Full test suite**

Run: `npx playwright test --reporter=line`
Expected: All tests pass (pigmilk + dehydratedwater).

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev`

Check in browser:
- `localhost:3000/?site=dehydratedwater` — Homepage has wave dividers, animated counter, comparison table, product carousel, split sections. Mobile: verify everything stacks correctly.
- `localhost:3000/products?site=dehydratedwater` — Categorized grid, featured spotlight
- `localhost:3000/products/original?site=dehydratedwater` — SplitSection hero, Science Facts
- `localhost:3000/products/cloud-mist?site=dehydratedwater` — Variant cards visible
- `localhost:3000/our-story?site=dehydratedwater` — CascadeTimeline on desktop, vertical on mobile
- `localhost:3000/the-science?site=dehydratedwater` — ProcessFlow with 4 different step layouts
- `localhost:3000/waas?site=dehydratedwater` — SplitSection + PricingTable + ComparisonTable
- `localhost:3000/faq?site=dehydratedwater` — Categorized FAQ sections
- `localhost:3000/privacy?site=dehydratedwater` — Escalating chemistry jargon
- `localhost:3000/terms?site=dehydratedwater` — Escalating chemistry jargon
- `localhost:3000/?site=pigmilk` — Pigmilk unchanged, no regressions
- `localhost:3000/` — Apex shows both sites
