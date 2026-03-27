# Pig Milk Co. Full Satire Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the pigmilk subdomain site from a 3-page placeholder into a full satirical e-commerce website with 10 products, a fake cart/checkout flow, team profiles, farm tour, volunteer page, and contact page.

**Architecture:** Extends the existing multi-subdomain Next.js platform. New shared components are added to `src/components/`. A CartProvider (React Context + localStorage) wraps commerce-enabled sites at the layout level. Product detail pages use a new `dynamicRoutes` extension on `SiteModule`. All content lives in `src/sites/pigmilk/`.

**Tech Stack:** Next.js 15+ (App Router), TypeScript, Tailwind CSS v4, React Context for cart state, localStorage for persistence.

**Spec:** `docs/superpowers/specs/2026-03-26-pigmilk-full-site-design.md`

---

## File Map

### Infrastructure Fixes (Task 1)
| File | Action | Responsibility |
|------|--------|----------------|
| `src/themes/index.ts` | Modify | Fix foreground CSS var, add `dynamicRoutes` to `SiteModule` |
| `src/app/[[...slug]]/page.tsx` | Modify | Add dynamic route handling + metadata |
| `src/components/ui/hero.tsx` | Modify | Add optional `image` prop |

### Cart System (Task 2)
| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/commerce/cart-provider.tsx` | Create | React Context + localStorage cart state + toast state |
| `src/components/commerce/cart-button.tsx` | Create | Header cart icon with item count badge |
| `src/components/commerce/add-to-cart-button.tsx` | Create | Button that adds item and triggers toast |
| `src/components/commerce/toast.tsx` | Create | Auto-dismissing notification popup |
| `src/app/layout.tsx` | Modify | Conditionally wrap commerce sites in CartProvider |
| `src/components/layout/header.tsx` | Modify | Add CartButton when commerce enabled + mobile nav |

### New Shared UI Components (Task 3)
| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/ui/product-card.tsx` | Create | Product tile with image, info, Add to Cart |
| `src/components/ui/timeline.tsx` | Create | Vertical year-marker timeline |
| `src/components/ui/team-member.tsx` | Create | Headshot card with name, title, bio |
| `src/components/ui/image-text-section.tsx` | Create | Alternating image/text rows |
| `src/components/ui/pig-profile.tsx` | Create | Pig portrait card with stats |
| `src/components/ui/job-listing.tsx` | Create | Job posting card |
| `src/components/ui/stat-counter.tsx` | Create | Big number with label |
| `src/components/ui/faq-accordion.tsx` | Create | Expandable Q&A pairs |
| `src/components/ui/fake-progress-bar.tsx` | Create | Animated bar that never completes |

### Product Data (Task 4)
| File | Action | Responsibility |
|------|--------|----------------|
| `src/sites/pigmilk/data/products.ts` | Create | All 10 products with full marketing copy |

### Pigmilk Pages (Tasks 5-12)
| File | Action | Responsibility |
|------|--------|----------------|
| `src/sites/pigmilk/pages/home.tsx` | Rewrite | Full homepage with featured products, press, lifestyle |
| `src/sites/pigmilk/pages/products.tsx` | Rewrite | Full product catalog grid |
| `src/sites/pigmilk/pages/product-detail.tsx` | Create | Individual product page with nutritional facts |
| `src/sites/pigmilk/pages/about.tsx` | Rewrite | Origin story, timeline, team grid |
| `src/sites/pigmilk/pages/behind-the-scenes.tsx` | Create | Farm tour, facility, pig profiles |
| `src/sites/pigmilk/pages/volunteer.tsx` | Create | Mission stats, job listings, application form |
| `src/sites/pigmilk/pages/contact.tsx` | Create | Contact form, details, FAQ |
| `src/sites/pigmilk/pages/cart.tsx` | Create | Cart management page |
| `src/sites/pigmilk/pages/checkout.tsx` | Create | Joke checkout page |
| `src/sites/pigmilk/config.ts` | Modify | Update nav, enable commerce |
| `src/sites/pigmilk/index.ts` | Modify | Register all pages + dynamicRoutes |

### Documentation (Task 13)
| File | Action | Responsibility |
|------|--------|----------------|
| `CLAUDE.md` | Modify | Document cart system, dynamic routes, new components |

---

## Task 1: Infrastructure Fixes

**Files:**
- Modify: `src/themes/index.ts`
- Modify: `src/app/[[...slug]]/page.tsx`
- Modify: `src/components/ui/hero.tsx`

- [ ] **Step 1: Fix foreground CSS variable bug in themeToCSS**

In `src/themes/index.ts`, add `"--color-foreground"` to the `themeToCSS` output. The existing `--color-text` stays for backward compatibility:

```ts
export function themeToCSS(theme: SiteTheme): Record<string, string> {
  return {
    "--color-primary": theme.colors.primary,
    "--color-secondary": theme.colors.secondary,
    "--color-accent": theme.colors.accent,
    "--color-background": theme.colors.background,
    "--color-text": theme.colors.text,
    "--color-foreground": theme.colors.text,  // ADD THIS LINE
    "--font-heading": theme.fonts.heading,
    "--font-body": theme.fonts.body,
  }
}
```

- [ ] **Step 2: Add dynamicRoutes to SiteModule type**

In `src/themes/index.ts`, add after the `SiteModule` interface:

```ts
export interface DynamicRoute {
  component: React.ComponentType<{ slug: string }>
  getMetadata?: (slug: string) => PageMetadata | undefined
  isValidSlug?: (slug: string) => boolean
}

export interface SiteModule {
  config: SiteConfig
  pages: Record<string, PageEntry>
  dynamicRoutes?: Record<string, DynamicRoute>
}
```

- [ ] **Step 3: Update catch-all route to handle dynamic routes**

In `src/app/[[...slug]]/page.tsx`, update `generateMetadata` to check `dynamicRoutes` when pages map has no match:

After the existing `pageEntry` lookup and before the return statement in `generateMetadata`, add:

```ts
  // Check dynamic routes for metadata
  if (!pageEntry) {
    const segments = path.split("/")
    if (segments.length === 2 && site.dynamicRoutes?.[segments[0]]) {
      const route = site.dynamicRoutes[segments[0]]
      const dynamicMeta = route.getMetadata?.(segments[1])
      if (dynamicMeta) {
        return {
          title: dynamicMeta.title || site.config.metadata.title,
          description: dynamicMeta.description || site.config.metadata.description,
          openGraph: {
            title: dynamicMeta.title || site.config.metadata.title,
            description: dynamicMeta.description || site.config.metadata.description,
            images: site.config.metadata.ogImage ? [site.config.metadata.ogImage] : [],
          },
        }
      }
    }
  }
```

Update the `CatchAllPage` component. After the existing `pageEntry` check and before `notFound()`, add:

```ts
  if (!pageEntry) {
    // Check dynamic routes (e.g., /products/classic-pig-milk)
    const segments = path.split("/")
    if (segments.length === 2 && site.dynamicRoutes?.[segments[0]]) {
      const route = site.dynamicRoutes[segments[0]]
      const dynamicSlug = segments[1]
      if (route.isValidSlug && !route.isValidSlug(dynamicSlug)) {
        notFound()
      }
      const DynamicComponent = route.component
      return <DynamicComponent slug={dynamicSlug} />
    }
    notFound()
  }
```

Make sure the existing `notFound()` after `if (!pageEntry)` is replaced by this new block.

- [ ] **Step 4: Add optional image prop to Hero component**

In `src/components/ui/hero.tsx`, add `image?: string` to `HeroProps`. When provided, render it as a background image. When omitted, keep the existing `bg-secondary/30` background:

```tsx
import Link from "next/link"
import Image from "next/image"

interface HeroProps {
  headline: string
  subheadline?: string
  ctaText?: string
  ctaHref?: string
  image?: string
}

export function Hero({ headline, subheadline, ctaText, ctaHref, image }: HeroProps) {
  return (
    <section className={`relative py-20 px-4 text-center ${image ? "" : "bg-secondary/30"}`}>
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
      )}
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-5xl font-heading font-bold mb-6 ${image ? "text-white" : "text-foreground"}`}>
          {headline}
        </h1>
        {subheadline && (
          <p className={`text-xl mb-8 ${image ? "text-white/80" : "text-foreground/70"}`}>
            {subheadline}
          </p>
        )}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Verify compilation**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 6: Commit**

```bash
git add src/themes/index.ts src/app/[[...slug]]/page.tsx src/components/ui/hero.tsx
git commit -m "fix foreground CSS var, add dynamic routes, add Hero image prop

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Cart System & Header Updates

**Files:**
- Create: `src/components/commerce/cart-provider.tsx`
- Create: `src/components/commerce/cart-button.tsx`
- Create: `src/components/commerce/add-to-cart-button.tsx`
- Create: `src/components/commerce/toast.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/layout/header.tsx`

- [ ] **Step 1: Create CartProvider**

Create `src/components/commerce/cart-provider.tsx`:

```tsx
"use client"

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react"

export interface CartItem {
  slug: string
  quantity: number
}

interface ToastMessage {
  id: number
  message: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (slug: string, quantity?: number) => void
  removeFromCart: (slug: string) => void
  updateQuantity: (slug: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  toasts: ToastMessage[]
  showToast: (message: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = "pigmilk-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const nextToastIdRef = useRef(0)
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setCart(JSON.parse(stored))
    } catch {}
    setMounted(true)
  }, [])

  // Sync cart to localStorage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart, mounted])

  const showToast = useCallback((message: string) => {
    const id = nextToastIdRef.current++
    setToasts((prev) => [...prev.slice(-2), { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const addToCart = useCallback((slug: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.slug === slug)
      if (existing) {
        return prev.map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { slug, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug))
  }, [])

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.slug !== slug))
    } else {
      setCart((prev) =>
        prev.map((item) => (item.slug === slug ? { ...item, quantity } : item))
      )
    }
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, toasts, showToast }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
```

- [ ] **Step 2: Create Toast component**

Create `src/components/commerce/toast.tsx`:

```tsx
"use client"

import { useCart } from "./cart-provider"

export function ToastContainer() {
  const { toasts } = useCart()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in text-sm font-medium"
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create CartButton component**

Create `src/components/commerce/cart-button.tsx`:

```tsx
"use client"

import Link from "next/link"
import { useCart } from "./cart-provider"

export function CartButton() {
  const { cartCount } = useCart()

  return (
    <Link href="/cart" className="relative text-foreground/70 hover:text-foreground transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  )
}
```

- [ ] **Step 4: Create AddToCartButton component**

Create `src/components/commerce/add-to-cart-button.tsx`:

```tsx
"use client"

import { useCart } from "./cart-provider"

interface AddToCartButtonProps {
  slug: string
  productName: string
  className?: string
}

const quips = [
  "Bold choice.",
  "Your doctor will have questions.",
  "We admire your courage.",
  "No refunds. Ever.",
  "The pigs thank you.",
  "Interesting decision.",
]

export function AddToCartButton({ slug, productName, className }: AddToCartButtonProps) {
  const { addToCart, showToast } = useCart()

  function handleClick() {
    addToCart(slug)
    const quip = quips[Math.floor(Math.random() * quips.length)]
    showToast(`${productName} added to cart. ${quip}`)
  }

  return (
    <button
      onClick={handleClick}
      className={className || "px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"}
    >
      Add to Cart
    </button>
  )
}
```

- [ ] **Step 5: Update Header with CartButton and mobile nav**

Replace `src/components/layout/header.tsx`:

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import type { SiteConfig } from "@/themes"
import { CartButton } from "@/components/commerce/cart-button"

export function Header({ config }: { config: SiteConfig }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b border-primary/10 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-heading font-bold text-primary">
          {config.name}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {config.nav.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {config.features.commerce && <CartButton />}
        </div>

        {/* Mobile hamburger + cart */}
        <div className="flex md:hidden items-center gap-4">
          {config.features.commerce && <CartButton />}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground/70 hover:text-foreground"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-primary/10 bg-background">
          <div className="px-4 py-4 flex flex-col gap-4">
            {config.nav.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 6: Update root layout to wrap commerce sites in CartProvider**

In `src/app/layout.tsx`, add the CartProvider import and conditionally wrap:

```tsx
import type { Metadata } from "next"
import { headers } from "next/headers"
import "./globals.css"
import { fontVariables } from "@/themes/fonts"
import { siteRegistry } from "@/sites/registry"
import { themeToCSS } from "@/themes"
import { fontFamilyMap } from "@/themes/fonts"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartProvider } from "@/components/commerce/cart-provider"
import { ToastContainer } from "@/components/commerce/toast"

export const metadata: Metadata = {
  title: "Specific Industries",
  description: "Specific Industries — Very Specific Products",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const subdomain = headersList.get("x-subdomain") || "apex"
  const site = siteRegistry[subdomain]

  // Build theme CSS variables
  const themeStyle: Record<string, string> = {}
  if (site) {
    const cssVars = themeToCSS(site.config.theme)
    Object.assign(themeStyle, cssVars)

    const headingFont = fontFamilyMap[site.config.theme.fonts.heading]
    const bodyFont = fontFamilyMap[site.config.theme.fonts.body]
    if (headingFont) themeStyle["--font-heading"] = headingFont
    if (bodyFont) themeStyle["--font-body"] = bodyFont
  }

  const content = (
    <>
      {site && <Header config={site.config} />}
      <main>{children}</main>
      {site && <Footer config={site.config} />}
    </>
  )

  return (
    <html lang="en" className={fontVariables}>
      <body
        className="min-h-screen bg-background text-foreground font-body"
        style={themeStyle}
      >
        {site?.config.features.commerce ? (
          <CartProvider>
            {content}
            <ToastContainer />
          </CartProvider>
        ) : (
          content
        )}
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Add fade-in animation to globals.css**

Append to `src/app/globals.css`:

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
```

- [ ] **Step 8: Verify compilation**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 9: Commit**

```bash
git add src/components/commerce/ src/app/layout.tsx src/components/layout/header.tsx src/app/globals.css
git commit -m "add cart system, toast notifications, mobile nav, CartProvider in layout

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: New Shared UI Components

**Files:**
- Create: `src/components/ui/product-card.tsx`
- Create: `src/components/ui/timeline.tsx`
- Create: `src/components/ui/team-member.tsx`
- Create: `src/components/ui/image-text-section.tsx`
- Create: `src/components/ui/pig-profile.tsx`
- Create: `src/components/ui/job-listing.tsx`
- Create: `src/components/ui/stat-counter.tsx`
- Create: `src/components/ui/faq-accordion.tsx`
- Create: `src/components/ui/fake-progress-bar.tsx`

- [ ] **Step 1: Create ProductCard**

Create `src/components/ui/product-card.tsx`:

```tsx
import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

interface ProductCardProps {
  slug: string
  name: string
  price: string
  tagline: string
  image: string
  showAddToCart?: boolean
}

export function ProductCard({ slug, name, price, tagline, image, showAddToCart = true }: ProductCardProps) {
  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
      <Link href={`/products/${slug}`}>
        <div className="relative aspect-square bg-secondary/10">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-4 text-center">
        <Link href={`/products/${slug}`}>
          <h3 className="text-lg font-heading font-semibold text-primary mb-1">{name}</h3>
        </Link>
        <p className="text-sm text-foreground/60 mb-2">{tagline}</p>
        <p className="text-lg font-semibold text-accent mb-3">{price}</p>
        {showAddToCart && <AddToCartButton slug={slug} productName={name} />}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create Timeline**

Create `src/components/ui/timeline.tsx`:

```tsx
interface TimelineItem {
  year: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {items.map((item, i) => (
        <div key={item.year} className="flex gap-6 pb-8 last:pb-0">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">
              {item.year}
            </div>
            {i < items.length - 1 && <div className="w-0.5 flex-1 bg-primary/20 mt-2" />}
          </div>
          <div className="pt-2.5">
            <p className="text-foreground/80">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create TeamMember**

Create `src/components/ui/team-member.tsx`:

```tsx
import Image from "next/image"

interface TeamMemberProps {
  image: string
  name: string
  title: string
  bio: string
}

export function TeamMember({ image, name, title, bio }: TeamMemberProps) {
  return (
    <div className="text-center">
      <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-secondary/20">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-primary">{name}</h3>
      <p className="text-sm text-foreground/60 mb-2">{title}</p>
      <p className="text-foreground/70 text-sm">{bio}</p>
    </div>
  )
}
```

- [ ] **Step 4: Create ImageTextSection**

Create `src/components/ui/image-text-section.tsx`:

```tsx
import Image from "next/image"

interface ImageTextSectionProps {
  image: string
  title: string
  description: string
  imagePosition?: "left" | "right"
}

export function ImageTextSection({ image, title, description, imagePosition = "left" }: ImageTextSectionProps) {
  const imageBlock = (
    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary/10">
      <Image src={image} alt={title} fill className="object-cover" />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center">
      <h3 className="text-2xl font-heading font-bold text-primary mb-4">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
    </div>
  )

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {imagePosition === "left" ? (
          <>{imageBlock}{textBlock}</>
        ) : (
          <>{textBlock}{imageBlock}</>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create PigProfile**

Create `src/components/ui/pig-profile.tsx`:

```tsx
import Image from "next/image"

interface PigStat {
  label: string
  value: string
}

interface PigProfileProps {
  image: string
  name: string
  bio: string
  stats: PigStat[]
}

export function PigProfile({ image, name, bio, stats }: PigProfileProps) {
  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden">
      <div className="relative aspect-square bg-secondary/10">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-heading font-semibold text-primary mb-1">{name}</h3>
        <p className="text-foreground/70 text-sm mb-3">{bio}</p>
        <div className="border-t border-primary/10 pt-3 space-y-1">
          {stats.map((stat) => (
            <div key={stat.label} className="flex justify-between text-sm">
              <span className="text-foreground/50">{stat.label}</span>
              <span className="text-foreground/80 font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create JobListing**

Create `src/components/ui/job-listing.tsx`:

```tsx
interface JobListingProps {
  title: string
  department: string
  description: string
  onApply?: () => void
}

export function JobListing({ title, department, description, onApply }: JobListingProps) {
  return (
    <div className="border border-primary/10 rounded-lg p-6">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-heading font-semibold text-primary">{title}</h3>
        <span className="text-xs bg-secondary px-2 py-1 rounded-full text-foreground/60 shrink-0 ml-4">{department}</span>
      </div>
      <p className="text-foreground/70 mb-4">{description}</p>
      {onApply && (
        <button
          onClick={onApply}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Apply Now
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 7: Create StatCounter**

Create `src/components/ui/stat-counter.tsx`:

```tsx
interface StatCounterProps {
  value: string
  label: string
}

export function StatCounter({ value, label }: StatCounterProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-heading font-bold text-primary mb-2">{value}</div>
      <div className="text-foreground/60 text-sm">{label}</div>
    </div>
  )
}
```

- [ ] **Step 8: Create FaqAccordion**

Create `src/components/ui/faq-accordion.tsx`:

```tsx
"use client"

import { useState } from "react"

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-primary/10">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-4 flex items-center justify-between text-left"
          >
            <span className="font-heading font-semibold text-foreground">{item.question}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-primary transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="pb-4 text-foreground/70">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 9: Create FakeProgressBar**

Create `src/components/ui/fake-progress-bar.tsx`:

```tsx
"use client"

import { useState, useEffect } from "react"

export function FakeProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 73) return 0
        return prev + Math.random() * 3
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="h-4 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-200"
          style={{ width: `${Math.min(progress, 73)}%` }}
        />
      </div>
      <p className="text-center text-foreground/50 text-sm mt-2">
        Processing... {Math.floor(Math.min(progress, 73))}%
      </p>
    </div>
  )
}
```

- [ ] **Step 10: Verify compilation**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 11: Commit**

```bash
git add src/components/ui/
git commit -m "add shared UI components: ProductCard, Timeline, TeamMember, PigProfile, etc.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Product Data

**Files:**
- Create: `src/sites/pigmilk/data/products.ts`

- [ ] **Step 1: Create product data file**

Create `src/sites/pigmilk/data/products.ts` with the full product catalog. This is a large file containing all 10 products with marketing copy, nutritional facts, and metadata.

```ts
export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  nutritionalFacts: Array<{ label: string; value: string }>
}

export const products: Product[] = [
  {
    slug: "classic-pig-milk",
    name: "Classic Pig Milk",
    price: 12.99,
    priceLabel: "$12.99 / gallon",
    tagline: "The one that started it all.",
    description: [
      "Classic Pig Milk is where it all began. One confused farmer, one cooperative pig, and a bucket that would change the dairy industry forever. Or at least confuse it.",
      "Our flagship product delivers the pure, unfiltered taste of pig milk the way nature intended — assuming nature intended this at all. Each gallon is collected by hand from free-range pigs who have given their somewhat reluctant consent.",
      "Pairs well with cereal, coffee, existential doubt, and the lingering question of 'why am I drinking this?' Best served cold. Best consumed alone, where no one can judge you.",
    ],
    image: "/sites/pigmilk/product-classic.png",
    nutritionalFacts: [
      { label: "Calories", value: "Probably some" },
      { label: "Pig Energy", value: "100% DV" },
      { label: "Courage", value: "140%" },
      { label: "Calcium", value: "Yes" },
      { label: "Existential Doubt", value: "3g" },
      { label: "Regret", value: "0g (results may vary)" },
    ],
  },
  {
    slug: "chocolate-pig-milk",
    name: "Chocolate Pig Milk",
    price: 14.99,
    priceLabel: "$14.99 / gallon",
    tagline: "We added chocolate. You're welcome.",
    description: [
      "We took something no one asked for and added chocolate to it. The result? Something no one asked for, but in chocolate. You're welcome.",
      "Our premium chocolate blend uses ethically sourced cocoa beans mixed with our signature pig milk. The pigs were not consulted about this decision, and frankly, they seem indifferent.",
      "Perfect for anyone who thought regular pig milk wasn't adventurous enough. Serve in a tall glass and pretend it's normal. We do.",
    ],
    image: "/sites/pigmilk/product-chocolate.png",
    nutritionalFacts: [
      { label: "Calories", value: "More than classic" },
      { label: "Chocolate", value: "Real" },
      { label: "Pig Energy", value: "100% DV" },
      { label: "Sugar", value: "A responsible amount" },
      { label: "Joy", value: "Fleeting" },
      { label: "Regret", value: "1g" },
    ],
  },
  {
    slug: "strawberry-pig-milk",
    name: "Strawberry Pig Milk",
    price: 14.99,
    priceLabel: "$14.99 / gallon",
    tagline: "Pink milk from pink animals. Coincidence?",
    description: [
      "Our strawberry pig milk is pink. Pigs are pink. We're not saying there's a connection, but we're also not not saying that. Draw your own conclusions.",
      "Made with real strawberries and real pig milk, which is already more real than most strawberry milks can claim. The pigs seem to enjoy the strawberries, though they enjoy most things.",
      "Best served in a wine glass at a dinner party where you want to start a conversation. Or end one.",
    ],
    image: "/sites/pigmilk/product-strawberry.png",
    nutritionalFacts: [
      { label: "Calories", value: "Pink amount" },
      { label: "Real Strawberries", value: "At least 2" },
      { label: "Pig Energy", value: "100% DV" },
      { label: "Color", value: "Suspiciously pink" },
      { label: "Vibes", value: "Immaculate" },
      { label: "Questions Asked", value: "0 (recommended)" },
    ],
  },
  {
    slug: "pig-milk-cheese",
    name: "Pig Milk Cheese",
    price: 24.99,
    priceLabel: "$24.99 / wheel",
    tagline: "Aged 6 months. We aged it, not the pig.",
    description: [
      "Our artisanal pig milk cheese is aged for exactly six months in our climate-controlled cheese cave, which is actually just a room in the barn that stays kind of cool.",
      "The flavor profile has been described as 'bold,' 'unexpected,' and 'wait, this is from a pig?' by our panel of cheese experts (Earl and his neighbor Dave).",
      "Each wheel is hand-pressed and stamped with our signature pig hoof logo. Pairs well with crackers, wine, and a willingness to try new things.",
    ],
    image: "/sites/pigmilk/product-cheese.png",
    nutritionalFacts: [
      { label: "Aged", value: "6 months" },
      { label: "Artisanal", value: "Technically" },
      { label: "Pig Energy", value: "Concentrated" },
      { label: "Flavor Profile", value: "Brave" },
      { label: "Pairs With", value: "An open mind" },
      { label: "Awards", value: "Pending" },
    ],
  },
  {
    slug: "pig-milk-yogurt",
    name: "Pig Milk Yogurt",
    price: 8.99,
    priceLabel: "$8.99 / tub",
    tagline: "Cultures so active they have hobbies.",
    description: [
      "Our pig milk yogurt contains live active cultures. How active? They run a book club. They're currently reading something by Kafka, which feels appropriate.",
      "Thick, creamy, and made from 100% pig milk. We add nothing artificial — just milk, cultures, and the quiet determination of a company that refuses to admit this might be a bad idea.",
      "Top with granola, fruit, or honey. Or eat it straight from the tub at 2 AM. We don't judge. The pigs might, but we don't.",
    ],
    image: "/sites/pigmilk/product-yogurt.png",
    nutritionalFacts: [
      { label: "Live Cultures", value: "Very alive" },
      { label: "Protein", value: "Some" },
      { label: "Pig Energy", value: "100% DV" },
      { label: "Probiotic", value: "Pro-something" },
      { label: "Serving Suggestion", value: "Alone, ideally" },
      { label: "Shelf Life", value: "Optimistic" },
    ],
  },
  {
    slug: "pig-milk-ice-cream",
    name: "Pig Milk Ice Cream",
    price: 11.99,
    priceLabel: "$11.99 / pint",
    tagline: "Guilt-free.* (*Guilt not included)",
    description: [
      "Our pig milk ice cream is made in small batches by people who have made peace with their life choices. Each pint is churned slowly, lovingly, and with only minor hesitation.",
      "Available in one flavor: Original. We tried to make others, but the pigs were firm. 'One flavor,' they seemed to say, through their eyes. We respected their creative vision.",
      "The asterisk on 'guilt-free' is doing a lot of heavy lifting here. Consult your conscience before consuming.",
    ],
    image: "/sites/pigmilk/product-ice-cream.png",
    nutritionalFacts: [
      { label: "Flavor", value: "Original (only)" },
      { label: "Guilt", value: "*Not included" },
      { label: "Pig Energy", value: "Frozen" },
      { label: "Serving Size", value: "The whole pint, be honest" },
      { label: "Happiness", value: "Temporary" },
      { label: "Brain Freeze Risk", value: "Standard" },
    ],
  },
  {
    slug: "pig-milk-protein",
    name: "Pig Milk Protein Powder",
    price: 39.99,
    priceLabel: "$39.99 / bag",
    tagline: "Gainz. Oinks. Results.",
    description: [
      "PIG WHEY™ is our premium protein powder made from concentrated pig milk whey. Each serving delivers protein and the raw, untamed energy of a pig that just woke up from a nap.",
      "Designed for athletes, bodybuilders, and anyone who wants to explain their protein source at the gym. Mix with water, regular milk, or — for the truly committed — more pig milk.",
      "Our proprietary OinkFormula™ is backed by zero peer-reviewed studies but several very enthusiastic testimonials from Earl, who has been taking it daily and says he 'feels different.'",
    ],
    image: "/sites/pigmilk/product-protein.png",
    nutritionalFacts: [
      { label: "Protein", value: "A lot (trust us)" },
      { label: "BCAAs", value: "Probably" },
      { label: "Pig Energy", value: "300% DV" },
      { label: "Peer-Reviewed Studies", value: "0" },
      { label: "Gym Conversations Started", value: "Every time" },
      { label: "Flavor", value: "Pig" },
    ],
  },
  {
    slug: "industrial-drum",
    name: "Industrial Drum (55 gal)",
    price: 449.99,
    priceLabel: "$449.99",
    tagline: "For when a gallon just isn't a lifestyle commitment.",
    description: [
      "Fifty-five gallons of pig milk, delivered in a genuine blue industrial drum. This is not a product for the casual consumer. This is a product for someone who has made a decision and is not looking back.",
      "Originally developed for our commercial clients (we have none), the Industrial Drum is now available to individuals who meet our rigorous qualification criteria: a valid email address and a shipping address that can receive a pallet.",
      "The drum is non-returnable. We physically cannot take it back. The forklift guy only works Tuesdays and he's expressed reservations about the whole operation.",
    ],
    image: "/sites/pigmilk/product-drum.png",
    nutritionalFacts: [
      { label: "Volume", value: "55 gallons" },
      { label: "Weight", value: "You don't want to know" },
      { label: "Pig Energy", value: "Industrial" },
      { label: "Shelf Life", value: "Pray" },
      { label: "Requires Forklift", value: "Yes" },
      { label: "Returnable", value: "Absolutely not" },
    ],
  },
  {
    slug: "rabid-froth",
    name: "Rabid Froth Pint",
    price: 6.66,
    priceLabel: "$6.66 / pint",
    tagline: "From our most enthusiastic pig. Extra frothy. Waiver required.",
    description: [
      "The Rabid Froth Pint comes exclusively from Sir Oinks-a-Lot, our most... spirited pig. Sir Oinks produces milk with a natural effervescence that our scientists have described as 'unusual,' 'aggressive,' and 'please stop making us test this.'",
      "Each pint is poured fresh and bubbling, with a head of froth that rivals any craft beer. The froth is natural. We think. We've stopped asking questions about Sir Oinks and his processes.",
      "A signed liability waiver is required at checkout. This is not a joke. Well, the website is a joke. But the waiver is real. Sir Oinks is a lot.",
    ],
    image: "/sites/pigmilk/product-rabid-froth.png",
    nutritionalFacts: [
      { label: "Froth Level", value: "Extreme" },
      { label: "Source", value: "Sir Oinks-a-Lot" },
      { label: "Pig Energy", value: "UNCONTAINABLE" },
      { label: "Waiver Required", value: "Yes" },
      { label: "Recommended By Doctors", value: "No" },
      { label: "Chaos Energy", value: "100% DV" },
    ],
  },
  {
    slug: "whole-hog-bundle",
    name: "The Whole Hog Bundle",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "One of everything. No regrets. Some questions.",
    description: [
      "The Whole Hog Bundle includes one of every product in our core lineup: Classic, Chocolate, Strawberry, Cheese, Yogurt, Ice Cream, and Protein Powder. It does NOT include the Industrial Drum or the Rabid Froth Pint, because we have some sense of responsibility.",
      "This bundle makes the perfect gift for someone you love, someone you're trying to confuse, or yourself during a moment of ambitious optimism.",
      "Each bundle ships in a pink gift box with our signature tissue paper and a handwritten note from Earl that says 'Thank you for believing in pig milk.' He writes every one by hand. It takes him a while.",
    ],
    image: "/sites/pigmilk/product-bundle.png",
    nutritionalFacts: [
      { label: "Products Included", value: "7" },
      { label: "Industrial Drum", value: "NOT included" },
      { label: "Rabid Froth", value: "NOT included" },
      { label: "Pig Energy", value: "Variety pack" },
      { label: "Gift Potential", value: "High (chaotic)" },
      { label: "Handwritten Note", value: "From Earl himself" },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const filtered = products.filter((p) => p.slug !== slug)
  // Shuffle and take `count`
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
```

- [ ] **Step 2: Verify compilation**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/pigmilk/data/
git commit -m "add full product catalog with 10 products, marketing copy, and nutritional facts

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Homepage Rewrite

**Files:**
- Rewrite: `src/sites/pigmilk/pages/home.tsx`

- [ ] **Step 1: Rewrite the homepage**

Replace `src/sites/pigmilk/pages/home.tsx` entirely. The new homepage has: Hero with image, Featured Products grid (4 products), "As Seen On" press section, expanded Testimonials (6), Lifestyle image section, and CTA.

```tsx
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/pigmilk/data/products"

const featuredSlugs = ["classic-pig-milk", "chocolate-pig-milk", "pig-milk-cheese", "whole-hog-bundle"]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default function PigMilkHome() {
  return (
    <>
      <Hero
        headline="Farm-Fresh Pig Milk"
        subheadline="Straight from the pig to your glass. Nature's most specific beverage."
        ctaText="Shop Now"
        ctaHref="/products"
        image="/sites/pigmilk/hero.png"
      />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                price={product.priceLabel}
                tagline={product.tagline}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* As Seen On */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground/40 text-sm uppercase tracking-widest mb-6">As featured in publications we made up</p>
          <div className="relative h-12">
            <Image src="/sites/pigmilk/press-logos.png" alt="Press logos" fill className="object-contain opacity-40" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialGrid
        title="What Our Customers Say"
        testimonials={[
          { quote: "I can't believe it's pig milk! Mainly because I still don't believe pig milk is a thing.", author: "Confused Customer" },
          { quote: "My doctor told me to stop drinking this immediately. 5 stars.", author: "Health-Conscious Consumer" },
          { quote: "I bought it as a joke but now I can't stop. Send help.", author: "Definitely Not Addicted" },
          { quote: "I switched from oat milk and my barista cried.", author: "Former Oat Milk Drinker" },
          { quote: "The cheese pairs beautifully with regret.", author: "Amateur Sommelier" },
          { quote: "My pigs are jealous that I'm drinking other pigs' milk.", author: "Pig Owner" },
        ]}
      />

      {/* Lifestyle */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 -z-10">
          <Image src="/sites/pigmilk/lifestyle.png" alt="" fill className="object-cover brightness-50" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-3xl font-heading font-bold text-white leading-relaxed">
            Pig Milk: It&apos;s Not Just a Beverage. It&apos;s a Lifestyle Choice You&apos;ll Have to Explain to Everyone.
          </p>
        </div>
      </section>

      <CTABanner
        headline="Ready to Try Pig Milk?"
        description="Join thousands of satisfied customers who have made the switch to pig milk."
        ctaText="Shop Now"
        ctaHref="/products"
      />
    </>
  )
}
```

- [ ] **Step 2: Verify compilation**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/pigmilk/pages/home.tsx
git commit -m "rewrite pigmilk homepage with featured products, press, lifestyle section

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Products Page & Product Detail

**Files:**
- Rewrite: `src/sites/pigmilk/pages/products.tsx`
- Create: `src/sites/pigmilk/pages/product-detail.tsx`

- [ ] **Step 1: Rewrite products page**

Replace `src/sites/pigmilk/pages/products.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/pigmilk/data/products"

export const metadata = {
  title: "Products — Pig Milk Co.",
  description: "Browse our selection of premium pig milk products.",
}

export default function PigMilkProducts() {
  return (
    <>
      <Hero
        headline="Our Products"
        subheadline="Responsibly sourced. Questionably consumed."
      />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              slug={product.slug}
              name={product.name}
              price={product.priceLabel}
              tagline={product.tagline}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create product detail page**

Create `src/sites/pigmilk/pages/product-detail.tsx`:

```tsx
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductBySlug, getRelatedProducts } from "@/sites/pigmilk/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(slug, 3)

  return (
    <>
      {/* Product Hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/10">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/60 mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
            <div className="mt-6">
              <AddToCartButton slug={product.slug} productName={product.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Nutritional Facts */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-md mx-auto">
          <div className="border-2 border-foreground p-4">
            <h2 className="text-2xl font-heading font-bold text-foreground border-b-8 border-foreground pb-1 mb-2">
              Nutrition Facts
            </h2>
            <p className="text-sm text-foreground/60 border-b border-foreground pb-2 mb-2">
              Serving Size: 1 glass (if you dare)
            </p>
            <div className="divide-y divide-foreground/20">
              {product.nutritionalFacts.map((fact) => (
                <div key={fact.label} className="flex justify-between py-1.5">
                  <span className="font-semibold text-foreground text-sm">{fact.label}</span>
                  <span className="text-foreground/70 text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-foreground/40 mt-3 border-t border-foreground pt-2">
              * Percent Daily Values are made up. Not evaluated by the FDA. Not evaluated by anyone, really.
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center mb-8">You Might Also Regret</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                price={p.priceLabel}
                tagline={p.tagline}
                image={p.image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Verify compilation**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/sites/pigmilk/pages/products.tsx src/sites/pigmilk/pages/product-detail.tsx
git commit -m "rewrite products page, add product detail with nutritional facts

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: About Page Rewrite

**Files:**
- Rewrite: `src/sites/pigmilk/pages/about.tsx`

- [ ] **Step 1: Rewrite about page**

Replace `src/sites/pigmilk/pages/about.tsx` with the full version including origin story, timeline, and team grid. The content should match the spec exactly (Earl Hogsworth founder story, 2019-2025 timeline, 4 team members).

The file should import and use `Hero`, `ImageTextSection`, `Timeline`, and `TeamMember` components. Include the origin story text, all 7 timeline entries, and all 4 team member profiles (Earl Hogsworth, Burt Sloppington III, Chet Trotsworth, Dale Gristle) with their titles, bios, and image paths (`team-earl.png`, `team-burt.png`, `team-chet.png`, `team-dale.png`).

Export `metadata` with title "About — Pig Milk Co." and appropriate description.

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add src/sites/pigmilk/pages/about.tsx
git commit -m "rewrite about page with origin story, timeline, and team profiles

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Behind the Scenes Page

**Files:**
- Create: `src/sites/pigmilk/pages/behind-the-scenes.tsx`

- [ ] **Step 1: Create behind the scenes page**

Create the page with all content from the spec: Hero, 4-step milking process using `ImageTextSection` (alternating left/right), facility section with `bts-facility.png` and fake certifications, and 4 pig profiles (Duchess, Kevin, Barbara, Sir Oinks-a-Lot) using `PigProfile` component with their stats.

Export `metadata` with title "Behind the Scenes — Pig Milk Co.".

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add src/sites/pigmilk/pages/behind-the-scenes.tsx
git commit -m "add behind the scenes page with farm tour and pig profiles

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Volunteer/Careers Page

**Files:**
- Create: `src/sites/pigmilk/pages/volunteer.tsx`

- [ ] **Step 1: Create volunteer page**

Create the page as a `"use client"` component (needed for the application form state). Includes:
- Hero
- 4 StatCounters in a row
- Volunteer hero image
- 5 JobListing cards (from spec)
- Perks section using FeatureSection
- Culture image
- Application form with: Name, Email, Position dropdown, "Why pigs?" textarea, pig milk rating slider (min=8, max=10), submit with joke confirmation message

Export `metadata` with title "Volunteer — Pig Milk Co.".

Since this is a client component, metadata will need to be exported separately and imported in the barrel (same pattern as other pages).

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add src/sites/pigmilk/pages/volunteer.tsx
git commit -m "add volunteer/careers page with job listings and application form

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Contact Page

**Files:**
- Create: `src/sites/pigmilk/pages/contact.tsx`

- [ ] **Step 1: Create contact page**

Create as a `"use client"` component (form state). Two-column layout:
- Left: Contact form (Name, Email, Reason dropdown with all 6 options from spec, Message textarea, submit with joke confirmation)
- Right: Contact details (address, phone, email, hours, hotline) + `contact-office.png` image
- Below: FaqAccordion with all 5 Q&A pairs from spec

Export `metadata` with title "Contact — Pig Milk Co.".

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add src/sites/pigmilk/pages/contact.tsx
git commit -m "add contact page with form, business details, and FAQ

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: Cart & Checkout Pages

**Files:**
- Create: `src/sites/pigmilk/pages/cart.tsx`
- Create: `src/sites/pigmilk/pages/checkout.tsx`

- [ ] **Step 1: Create cart page**

Create `src/sites/pigmilk/pages/cart.tsx`:

```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/pigmilk/data/products"

const PIG_HANDLING_FEE = 2.99
const OINK_TAX_RATE = 0.037

export const metadata = {
  title: "Your Cart — Pig Milk Co.",
  description: "Review your pig milk order.",
}

export default function PigMilkCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const oinkTax = subtotal * OINK_TAX_RATE
  const total = subtotal + PIG_HANDLING_FEE + oinkTax

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Your Cart</h1>
          <p className="text-foreground/60 mb-8">
            Your cart is as empty as a pig that&apos;s just been milked.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Your Cart</h1>

        {/* Cart Items */}
        <div className="divide-y divide-primary/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary/10 shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={`/products/${slug}`} className="font-heading font-semibold text-primary hover:underline">
                  {product.name}
                </Link>
                <p className="text-foreground/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-primary/20 text-foreground/60 hover:border-primary/40 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-primary/20 text-foreground/60 hover:border-primary/40 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-foreground">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-foreground/40 hover:text-foreground/70 ml-2"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-8 border-t border-primary/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-foreground/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Pig Handling Fee</span>
              <span>${PIG_HANDLING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Oink Tax (3.7%)</span>
              <span>${oinkTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-primary/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href="/checkout"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create checkout page**

Create `src/sites/pigmilk/pages/checkout.tsx`:

```tsx
import Image from "next/image"
import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"

export default function PigMilkCheckout() {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image src="/sites/pigmilk/checkout-construction.png" alt="Pig in hard hat" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Our Pigs Are Working As Fast As They Can
        </h1>
        <p className="text-foreground/70 mb-8">
          Unfortunately, due to unprecedented demand (someone actually tried to buy pig milk),
          our checkout system is permanently under construction.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-8">
          Estimated delivery: When pigs fly (estimated Q4 2087)
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to Shopping
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add src/sites/pigmilk/pages/cart.tsx src/sites/pigmilk/pages/checkout.tsx
git commit -m "add cart page with order summary and joke checkout page

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 12: Wire Everything Up

**Files:**
- Modify: `src/sites/pigmilk/config.ts`
- Modify: `src/sites/pigmilk/index.ts`

- [ ] **Step 1: Update pigmilk config**

Update `src/sites/pigmilk/config.ts` — enable commerce and update nav:

```ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Pig Milk Co.",
  subdomain: "pigmilk",
  theme: {
    preset: "playful",
    colors: {
      primary: "#E91E63",
      secondary: "#FCE4EC",
      accent: "#880E4F",
      background: "#ffffff",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "Pig Milk Co. — Farm-Fresh Pig Milk",
    description: "Premium artisanal pig milk, delivered to your door. Yes, really.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Behind the Scenes", path: "/behind-the-scenes" },
    { label: "Volunteer", path: "/volunteer" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Update pigmilk barrel to register all pages + dynamicRoutes**

Replace `src/sites/pigmilk/index.ts`:

```ts
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import PigMilkHome from "./pages/home"
import PigMilkProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import PigMilkAbout, { metadata as aboutMetadata } from "./pages/about"
import PigMilkBehindTheScenes, { metadata as btsMetadata } from "./pages/behind-the-scenes"
import PigMilkVolunteer, { metadata as volunteerMetadata } from "./pages/volunteer"
import PigMilkContact, { metadata as contactMetadata } from "./pages/contact"
import PigMilkCart from "./pages/cart"
import PigMilkCheckout from "./pages/checkout"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PigMilkHome,
  "products": { component: PigMilkProducts, metadata: productsMetadata },
  "about": { component: PigMilkAbout, metadata: aboutMetadata },
  "behind-the-scenes": { component: PigMilkBehindTheScenes, metadata: btsMetadata },
  "volunteer": { component: PigMilkVolunteer, metadata: volunteerMetadata },
  "contact": { component: PigMilkContact, metadata: contactMetadata },
  "cart": PigMilkCart,
  "checkout": PigMilkCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Pig Milk Co.`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 3: Update registry to include dynamicRoutes**

In `src/sites/registry.ts`, update the pigmilk import to include `dynamicRoutes`:

```ts
import type { SiteModule } from "@/themes"
import { config as apexConfig, pages as apexPages } from "./apex"
import { config as pigmilkConfig, pages as pigmilkPages, dynamicRoutes as pigmilkDynamicRoutes } from "./pigmilk"

export const siteRegistry: Record<string, SiteModule> = {
  apex: { config: apexConfig, pages: apexPages },
  pigmilk: { config: pigmilkConfig, pages: pigmilkPages, dynamicRoutes: pigmilkDynamicRoutes },
}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain in siteRegistry
}
```

- [ ] **Step 4: Verify compilation and smoke test**

Run: `npx tsc --noEmit`

Then start dev server and verify key routes:
- `localhost:3000/?site=pigmilk` — new homepage
- `localhost:3000/products?site=pigmilk` — product grid
- `localhost:3000/products/classic-pig-milk?site=pigmilk` — product detail
- `localhost:3000/about?site=pigmilk` — about page
- `localhost:3000/behind-the-scenes?site=pigmilk` — farm tour
- `localhost:3000/volunteer?site=pigmilk` — volunteer page
- `localhost:3000/contact?site=pigmilk` — contact page
- `localhost:3000/cart?site=pigmilk` — cart page
- `localhost:3000/checkout?site=pigmilk` — checkout joke

- [ ] **Step 5: Commit**

```bash
git add src/sites/pigmilk/ src/sites/registry.ts
git commit -m "wire up all pigmilk pages, enable commerce, register dynamic routes

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 13: Documentation Update

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md**

Add sections covering:
- Commerce system: CartProvider, how it wraps in layout.tsx, "use client" boundaries
- Dynamic routes: `dynamicRoutes` on SiteModule, how product detail pages work
- New shared components list (the 14 new components with brief descriptions)
- Product data pattern: data file in `src/sites/<subdomain>/data/`, `getProductBySlug` helper
- Note that images are in `public/sites/pigmilk/` and pages render gracefully without them

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "update CLAUDE.md with cart system, dynamic routes, and new components

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 14: Final Verification

- [ ] **Step 1: Production build**

Run: `npm run build`

Expected: Build succeeds with no errors.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`

Expected: No lint errors.

- [ ] **Step 4: Smoke test all routes**

Run dev server and verify all pages render:

| URL | Expected |
|-----|----------|
| `localhost:3000/?site=pigmilk` | Homepage with hero, products, testimonials |
| `localhost:3000/products?site=pigmilk` | 10-product grid |
| `localhost:3000/products/classic-pig-milk?site=pigmilk` | Product detail with nutritional facts |
| `localhost:3000/products/rabid-froth?site=pigmilk` | Rabid Froth detail page |
| `localhost:3000/products/nonexistent?site=pigmilk` | 404 page |
| `localhost:3000/about?site=pigmilk` | Origin story, timeline, team |
| `localhost:3000/behind-the-scenes?site=pigmilk` | Farm tour, pig profiles |
| `localhost:3000/volunteer?site=pigmilk` | Job listings, application form |
| `localhost:3000/contact?site=pigmilk` | Contact form, FAQ |
| `localhost:3000/cart?site=pigmilk` | Empty cart state |
| `localhost:3000/checkout?site=pigmilk` | Joke checkout with progress bar |
| `localhost:3000/` | Apex landing page (still works) |

- [ ] **Step 5: Test cart flow**

**Note:** When testing locally, client-side navigation via `<Link>` loses the `?site=pigmilk` param. You'll need to manually re-add it to the URL after each navigation. This is a known limitation that doesn't affect production.

On the products page, click "Add to Cart" on a few products. Verify:
- Toast notification appears
- Cart badge in header updates
- Navigate to cart page — items are listed
- Adjust quantities, remove items
- Refresh page — cart persists (localStorage)

- [ ] **Step 6: Fix any issues and commit**

```bash
git add -A
git commit -m "fix: address issues found during final verification

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```
