# Subdomain Joke Sites Platform — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single Next.js app that serves self-contained joke websites on subdomains of specificindustries.com, with shared UI components and per-site theming.

**Architecture:** Middleware extracts the subdomain from the request host, sets an `x-subdomain` request header, and a catch-all App Router route resolves the subdomain + path to the correct site page component. Each site is a folder under `src/sites/` with its own config, pages map, and theme.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, `next/font` for Google Fonts, Vercel hobby plan.

**Spec:** `docs/superpowers/specs/2026-03-24-subdomain-joke-sites-design.md`

---

## File Map

### Infrastructure (Tasks 1-3, 5)
| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Create | Dependencies and scripts |
| `tsconfig.json` | Create | TypeScript config |
| `next.config.ts` | Create | Next.js configuration |
| `src/app/globals.css` | Create | Tailwind v4 directives + `@theme inline` tokens |
| `src/themes/index.ts` | Create | SiteConfig type, PageEntry type, theme helpers |
| `src/themes/fonts.ts` | Create | All `next/font` declarations in one module |
| `src/sites/registry.ts` | Create | Subdomain → site module map |
| `src/middleware.ts` | Create | Subdomain extraction, header setting, redirects |
| `src/app/layout.tsx` | Create | Root layout: theme injection, Header/Footer |
| `src/app/[[...slug]]/page.tsx` | Create | Catch-all route: subdomain + path → page component |
| `src/app/not-found.tsx` | Create | 404 page |

### Shared Components (Task 4)
| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/layout/header.tsx` | Create | Site header with nav links from config |
| `src/components/layout/footer.tsx` | Create | Site footer |
| `src/components/ui/hero.tsx` | Create | Hero banner section |
| `src/components/ui/feature-section.tsx` | Create | Grid of feature cards |
| `src/components/ui/testimonial-grid.tsx` | Create | Grid of testimonial quotes |
| `src/components/ui/cta-banner.tsx` | Create | Call-to-action section |

### Sites (Tasks 6-7)
| File | Action | Responsibility |
|------|--------|----------------|
| `src/sites/apex/config.ts` | Create | Apex domain site config |
| `src/sites/apex/pages/home.tsx` | Create | Landing page listing all subdomain sites |
| `src/sites/apex/index.ts` | Create | Barrel export |
| `src/sites/pigmilk/config.ts` | Create | Pig Milk site config |
| `src/sites/pigmilk/pages/home.tsx` | Create | Pig Milk homepage |
| `src/sites/pigmilk/pages/about.tsx` | Create | Pig Milk about page |
| `src/sites/pigmilk/pages/products.tsx` | Create | Pig Milk products page |
| `src/sites/pigmilk/index.ts` | Create | Barrel export |

### Documentation (Task 8)
| File | Action | Responsibility |
|------|--------|----------------|
| `VERCEL_SETUP.md` | Create | Vercel & DNS setup instructions |
| `CLAUDE.md` | Create | Project conventions for future AI sessions |

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `src/app/globals.css`
- Create: `tailwind.config.ts`

- [ ] **Step 1: Initialize Next.js project**

Run: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`

Choose: No to Turbopack for dev server (default).

This generates `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, and other boilerplate.

- [ ] **Step 2: Clean up generated files**

Remove generated content we'll replace:
- Delete `src/app/page.tsx` (replaced by catch-all route)
- Delete `src/app/page.module.css` if it exists
- Strip `src/app/globals.css` down to just Tailwind directives
- Strip `src/app/layout.tsx` down to a minimal shell (we'll build it out in Task 4)

`src/app/globals.css` should contain only:

```css
@import "tailwindcss";
```

- [ ] **Step 3: Delete `tailwind.config.ts` and configure Tailwind v4 via CSS**

Next.js 15 ships with Tailwind CSS v4, which uses a CSS-first configuration model. Delete the generated `tailwind.config.ts` (if present) and configure theme tokens in `src/app/globals.css`:

```css
@import "tailwindcss";

@theme inline {
  --color-primary: initial;
  --color-secondary: initial;
  --color-accent: initial;
  --color-background: initial;
  --color-foreground: initial;
  --font-heading: initial;
  --font-body: initial;
}
```

The `@theme inline` directive tells Tailwind to generate utilities for these tokens but expect their values to be set at runtime (via inline styles from the root layout). This avoids circular `var()` references. The actual values come from each site's theme config, injected as CSS custom properties on the `<body>` element.

- [ ] **Step 4: Verify project runs**

Run: `npm run dev`

Expected: Next.js dev server starts on localhost:3000 without errors. Page may be blank or show a default — that's fine.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "scaffold Next.js 15 project with Tailwind CSS variable theming"
```

---

## Task 2: Types, Themes & Fonts

**Files:**
- Create: `src/themes/index.ts`
- Create: `src/themes/fonts.ts`

- [ ] **Step 1: Create theme types and presets**

Create `src/themes/index.ts`:

```ts
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface ThemeFonts {
  heading: string
  body: string
}

export interface SiteTheme {
  preset: string
  colors: ThemeColors
  fonts: ThemeFonts
}

export interface SiteMetadata {
  title: string
  description: string
  ogImage?: string
}

export interface NavItem {
  label: string
  path: string
}

export interface SiteConfig {
  name: string
  subdomain: string
  theme: SiteTheme
  metadata: SiteMetadata
  nav: NavItem[]
  features: {
    commerce: boolean
  }
}

export interface PageMetadata {
  title?: string
  description?: string
}

export interface PageWithMetadata {
  component: React.ComponentType
  metadata: PageMetadata
}

// A page entry is either a bare component or a component with metadata
export type PageEntry = React.ComponentType | PageWithMetadata

export interface SiteModule {
  config: SiteConfig
  pages: Record<string, PageEntry>
}

// Helper to generate CSS custom properties from a site config
export function themeToCSS(theme: SiteTheme): Record<string, string> {
  return {
    "--color-primary": theme.colors.primary,
    "--color-secondary": theme.colors.secondary,
    "--color-accent": theme.colors.accent,
    "--color-background": theme.colors.background,
    "--color-text": theme.colors.text,
    "--font-heading": theme.fonts.heading,
    "--font-body": theme.fonts.body,
  }
}
```

- [ ] **Step 2: Create shared fonts module**

Create `src/themes/fonts.ts`:

```ts
import { Inter, Playfair_Display, Space_Grotesk, Poppins } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

// All font class names joined for the root layout
export const fontVariables = [
  inter.variable,
  playfairDisplay.variable,
  spaceGrotesk.variable,
  poppins.variable,
].join(" ")

// Map of font keys used in site configs → CSS font-family values
export const fontFamilyMap: Record<string, string> = {
  inter: "'Inter', sans-serif",
  playfair: "'Playfair Display', serif",
  "space-grotesk": "'Space Grotesk', sans-serif",
  poppins: "'Poppins', sans-serif",
}
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add src/themes/
git commit -m "add theme types, presets, and shared font declarations"
```

---

## Task 3: Middleware

**Files:**
- Create: `src/middleware.ts`
- Create: `src/sites/registry.ts` (minimal placeholder for middleware to import)

- [ ] **Step 1: Create a minimal registry placeholder**

The middleware needs to check subdomain validity against the registry. Create a minimal `src/sites/registry.ts` for now:

```ts
import type { SiteModule } from "@/themes"

// Sites will be added in later tasks. Middleware uses this to validate subdomains.
export const siteRegistry: Record<string, SiteModule> = {}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain === "apex" || subdomain in siteRegistry
}
```

- [ ] **Step 2: Create middleware**

Create `src/middleware.ts`:

```ts
import { NextRequest, NextResponse } from "next/server"
import { isValidSubdomain } from "@/sites/registry"

const PRODUCTION_HOST = "specificindustries.com"

function getSubdomain(request: NextRequest): string {
  const host = request.headers.get("host") || ""
  const url = request.nextUrl

  // In non-production, allow ?site= query param override
  if (!host.endsWith(PRODUCTION_HOST)) {
    const siteParam = url.searchParams.get("site")
    if (siteParam) return siteParam
  }

  // Extract subdomain from host
  const hostname = host.split(":")[0] // Remove port
  if (hostname === PRODUCTION_HOST || hostname === "localhost") {
    return "apex"
  }

  // e.g., "pigmilk.specificindustries.com" → "pigmilk"
  const parts = hostname.split(".")
  if (parts.length > 2 && hostname.endsWith(PRODUCTION_HOST)) {
    return parts[0]
  }

  return "apex"
}

export function middleware(request: NextRequest) {
  const subdomain = getSubdomain(request)

  // Redirect www to apex
  if (subdomain === "www") {
    const url = request.nextUrl.clone()
    url.host = PRODUCTION_HOST
    url.port = ""
    return NextResponse.redirect(url, 302)
  }

  // Redirect unknown subdomains to apex
  if (subdomain !== "apex" && !isValidSubdomain(subdomain)) {
    return NextResponse.redirect(new URL(`https://${PRODUCTION_HOST}${request.nextUrl.pathname}`), 302)
  }

  // Set x-subdomain header on the request for downstream server components
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-subdomain", subdomain)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sites/).*)"],
}
```

- [ ] **Step 3: Verify middleware compiles**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts src/sites/registry.ts
git commit -m "add middleware for subdomain extraction and routing"
```

---

## Task 4: Shared Components

**Note:** Shared components are created before the root layout (Task 5) so that the layout can import Header/Footer without compilation errors.

**Files:**
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/footer.tsx`
- Create: `src/components/ui/hero.tsx`
- Create: `src/components/ui/feature-section.tsx`
- Create: `src/components/ui/testimonial-grid.tsx`
- Create: `src/components/ui/cta-banner.tsx`

- [ ] **Step 1: Create Header component**

Create `src/components/layout/header.tsx`:

```tsx
import Link from "next/link"
import type { SiteConfig } from "@/themes"

export function Header({ config }: { config: SiteConfig }) {
  return (
    <header className="border-b border-primary/10 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-heading font-bold text-primary">
          {config.name}
        </Link>
        <nav className="flex gap-6">
          {config.nav.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Create Footer component**

Create `src/components/layout/footer.tsx`:

```tsx
import type { SiteConfig } from "@/themes"

export function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="border-t border-primary/10 bg-background mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-foreground/50 text-sm">
        <p>&copy; {new Date().getFullYear()} {config.name}. A Specific Industries company.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create Hero component**

Create `src/components/ui/hero.tsx`:

```tsx
import Link from "next/link"

interface HeroProps {
  headline: string
  subheadline?: string
  ctaText?: string
  ctaHref?: string
}

export function Hero({ headline, subheadline, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="py-20 px-4 text-center bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-heading font-bold text-foreground mb-6">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-xl text-foreground/70 mb-8">{subheadline}</p>
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

- [ ] **Step 4: Create FeatureSection component**

Create `src/components/ui/feature-section.tsx`:

```tsx
interface Feature {
  title: string
  description: string
}

interface FeatureSectionProps {
  title?: string
  features: Feature[]
}

export function FeatureSection({ title, features }: FeatureSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl font-heading font-bold text-center mb-12">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-6">
              <h3 className="text-xl font-heading font-semibold mb-3 text-primary">
                {feature.title}
              </h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create TestimonialGrid component**

Create `src/components/ui/testimonial-grid.tsx`:

```tsx
interface Testimonial {
  quote: string
  author: string
}

interface TestimonialGridProps {
  title?: string
  testimonials: Testimonial[]
}

export function TestimonialGrid({ title, testimonials }: TestimonialGridProps) {
  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl font-heading font-bold text-center mb-12">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.author}
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <p className="text-foreground/80 italic mb-4">"{testimonial.quote}"</p>
              <cite className="text-primary font-semibold not-italic">
                — {testimonial.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create CTABanner component**

Create `src/components/ui/cta-banner.tsx`:

```tsx
import Link from "next/link"

interface CTABannerProps {
  headline: string
  description?: string
  ctaText: string
  ctaHref: string
}

export function CTABanner({ headline, description, ctaText, ctaHref }: CTABannerProps) {
  return (
    <section className="py-16 px-4 bg-primary text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-4">{headline}</h2>
        {description && <p className="text-white/80 mb-8">{description}</p>}
        <Link
          href={ctaHref}
          className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Verify compilation**

Run: `npx tsc --noEmit`

Expected: No type errors (components have no upstream dependencies beyond `@/themes` which exists from Task 2).

- [ ] **Step 8: Commit**

```bash
git add src/components/
git commit -m "add shared layout and UI components"
```

---

## Task 5: Root Layout, Catch-All Route & 404

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/[[...slug]]/page.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Build root layout**

Replace `src/app/layout.tsx`:

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

    // Resolve font keys to CSS font-family values
    const headingFont = fontFamilyMap[site.config.theme.fonts.heading]
    const bodyFont = fontFamilyMap[site.config.theme.fonts.body]
    if (headingFont) themeStyle["--font-heading"] = headingFont
    if (bodyFont) themeStyle["--font-body"] = bodyFont
  }

  return (
    <html lang="en" className={fontVariables}>
      <body
        className="min-h-screen bg-background text-foreground font-body"
        style={themeStyle}
      >
        {site && <Header config={site.config} />}
        <main>{children}</main>
        {site && <Footer config={site.config} />}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create catch-all route**

Create `src/app/[[...slug]]/page.tsx`:

```tsx
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { siteRegistry } from "@/sites/registry"
import type { Metadata } from "next"
import type { PageWithMetadata } from "@/themes"

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const headersList = await headers()
  const subdomain = headersList.get("x-subdomain") || "apex"
  const site = siteRegistry[subdomain]

  if (!site) return {}

  const path = slug?.join("/") || ""
  const pageEntry = site.pages[path]

  // Check for per-page metadata override
  const pageMetadata = pageEntry && typeof pageEntry === "object" && "metadata" in pageEntry
    ? (pageEntry as PageWithMetadata).metadata
    : undefined

  return {
    title: pageMetadata?.title || site.config.metadata.title,
    description: pageMetadata?.description || site.config.metadata.description,
    openGraph: {
      title: pageMetadata?.title || site.config.metadata.title,
      description: pageMetadata?.description || site.config.metadata.description,
      images: site.config.metadata.ogImage ? [site.config.metadata.ogImage] : [],
    },
  }
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params
  const headersList = await headers()
  const subdomain = headersList.get("x-subdomain") || "apex"
  const site = siteRegistry[subdomain]

  if (!site) {
    notFound()
  }

  const path = slug?.join("/") || ""
  const pageEntry = site.pages[path]

  if (!pageEntry) {
    notFound()
  }

  // Support both bare components and { component, metadata } objects
  const PageComponent = typeof pageEntry === "function"
    ? pageEntry
    : (pageEntry as PageWithMetadata).component

  return <PageComponent />
}
```

- [ ] **Step 3: Create 404 page**

Create `src/app/not-found.tsx`:

```tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-heading font-bold mb-4">404</h1>
      <p className="text-xl mb-8">This page doesn&apos;t exist. Yet.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  )
}
```

- [ ] **Step 4: Verify compilation**

Run: `npx tsc --noEmit`

Expected: No type errors. All imports (Header, Footer, registry, themes) resolve.

- [ ] **Step 5: Commit**

```bash
git add src/app/
git commit -m "add root layout, catch-all route, and 404 page"
```

---

## Task 6: Apex Site & First Smoke Test

**Files:**
- Create: `src/sites/apex/config.ts`
- Create: `src/sites/apex/pages/home.tsx`
- Create: `src/sites/apex/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create apex site config**

Create `src/sites/apex/config.ts`:

```ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Specific Industries",
  subdomain: "apex",
  theme: {
    preset: "corporate",
    colors: {
      primary: "#1a1a2e",
      secondary: "#e2e8f0",
      accent: "#0f3460",
      background: "#ffffff",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Specific Industries — Very Specific Products",
    description: "We make very specific products for very specific people.",
  },
  nav: [
    { label: "Home", path: "/" },
  ],
  features: {
    commerce: false,
  },
}
```

- [ ] **Step 2: Create apex landing page**

Create `src/sites/apex/pages/home.tsx`:

```tsx
import { siteRegistry } from "@/sites/registry"
import { Hero } from "@/components/ui/hero"

export default function ApexHome() {
  const sites = Object.entries(siteRegistry).filter(
    ([key]) => key !== "apex"
  )

  return (
    <>
      <Hero
        headline="Specific Industries"
        subheadline="We make very specific products for very specific people."
      />
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">
            Our Brands
          </h2>
          {sites.length === 0 ? (
            <p className="text-center text-foreground/50">Coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sites.map(([subdomain, site]) => (
                <a
                  key={subdomain}
                  href={`https://${subdomain}.specificindustries.com`}
                  className="block p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                    {site.config.name}
                  </h3>
                  <p className="text-foreground/60">
                    {site.config.metadata.description}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Create apex barrel export**

Create `src/sites/apex/index.ts`:

```ts
import { config } from "./config"
import type { PageEntry } from "@/themes"
import ApexHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ApexHome,
}
```

- [ ] **Step 4: Register apex site in registry**

Replace `src/sites/registry.ts`:

```ts
import type { SiteModule } from "@/themes"
import { config as apexConfig, pages as apexPages } from "./apex"

export const siteRegistry: Record<string, SiteModule> = {
  apex: { config: apexConfig, pages: apexPages },
}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain in siteRegistry
}
```

- [ ] **Step 5: Smoke test in browser**

Run: `npm run dev`

Visit `http://localhost:3000/` — should render the apex landing page with "Specific Industries" hero and "Our Brands" section (showing "Coming soon." since no subdomain sites are registered yet).

Verify:
- Header shows "Specific Industries" with "Home" nav link
- Footer shows copyright
- Theme colors are applied
- No console errors

- [ ] **Step 6: Verify 404 works**

Visit `http://localhost:3000/nonexistent` — should show the 404 page.

- [ ] **Step 7: Commit**

```bash
git add src/sites/
git commit -m "add apex landing site with auto-generated brand listing"
```

---

## Task 7: Pig Milk Example Site

**Files:**
- Create: `src/sites/pigmilk/config.ts`
- Create: `src/sites/pigmilk/pages/home.tsx`
- Create: `src/sites/pigmilk/pages/about.tsx`
- Create: `src/sites/pigmilk/pages/products.tsx`
- Create: `src/sites/pigmilk/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create pigmilk site config**

Create `src/sites/pigmilk/config.ts`:

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
  ],
  features: {
    commerce: false,
  },
}
```

- [ ] **Step 2: Create pigmilk homepage**

Create `src/sites/pigmilk/pages/home.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"
import { FeatureSection } from "@/components/ui/feature-section"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"

export default function PigMilkHome() {
  return (
    <>
      <Hero
        headline="Farm-Fresh Pig Milk"
        subheadline="Straight from the pig to your glass. Nature's most specific beverage."
        ctaText="View Products"
        ctaHref="/products"
      />
      <FeatureSection
        title="Why Pig Milk?"
        features={[
          {
            title: "100% Organic",
            description: "Our pigs roam free across rolling hills, eating only the finest organic slop.",
          },
          {
            title: "Rich in Nutrients",
            description: "Pig milk contains nutrients. We're not going to say which ones, but they're in there.",
          },
          {
            title: "Artisanal",
            description: "Each pig is milked by hand by our team of dedicated pig milking artisans.",
          },
        ]}
      />
      <TestimonialGrid
        title="What Our Customers Say"
        testimonials={[
          {
            quote: "I can't believe it's pig milk! Mainly because I still don't believe pig milk is a thing.",
            author: "Confused Customer",
          },
          {
            quote: "My doctor told me to stop drinking this immediately. 5 stars.",
            author: "Health-Conscious Consumer",
          },
          {
            quote: "I bought it as a joke but now I can't stop. Send help.",
            author: "Definitely Not Addicted",
          },
        ]}
      />
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

- [ ] **Step 3: Create pigmilk about page**

Create `src/sites/pigmilk/pages/about.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"
import { FeatureSection } from "@/components/ui/feature-section"

export const metadata = {
  title: "About Pig Milk Co.",
  description: "The story of how we started milking pigs.",
}

export default function PigMilkAbout() {
  return (
    <>
      <Hero
        headline="Our Story"
        subheadline="How one farmer's mistake became the world's most specific dairy product."
      />
      <FeatureSection
        title="Our Values"
        features={[
          {
            title: "Transparency",
            description: "We're completely honest about the fact that we milk pigs. We don't hide it.",
          },
          {
            title: "Sustainability",
            description: "Our pigs are sustainable. They just keep making more milk. We don't know why.",
          },
          {
            title: "Innovation",
            description: "We were the first. We might also be the last. But we were definitely the first.",
          },
        ]}
      />
    </>
  )
}
```

- [ ] **Step 4: Create pigmilk products page**

Create `src/sites/pigmilk/pages/products.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Products — Pig Milk Co.",
  description: "Browse our selection of premium pig milk products.",
}

export default function PigMilkProducts() {
  const products = [
    {
      name: "Classic Pig Milk",
      description: "Our original formula. Straight from pig to carton.",
      price: "$12.99 / gallon",
    },
    {
      name: "Chocolate Pig Milk",
      description: "For when regular pig milk just isn't adventurous enough.",
      price: "$14.99 / gallon",
    },
    {
      name: "Pig Milk Cheese",
      description: "Aged 6 months. We aged it, not the pig.",
      price: "$24.99 / wheel",
    },
  ]

  return (
    <>
      <Hero
        headline="Our Products"
        subheadline="Responsibly sourced. Questionably consumed."
      />
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="border border-primary/10 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                {product.name}
              </h3>
              <p className="text-foreground/70 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-accent">{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 5: Create pigmilk barrel export**

Create `src/sites/pigmilk/index.ts`:

```ts
import { config } from "./config"
import type { PageEntry } from "@/themes"
import PigMilkHome from "./pages/home"
import PigMilkAbout, { metadata as aboutMetadata } from "./pages/about"
import PigMilkProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PigMilkHome,
  "about": { component: PigMilkAbout, metadata: aboutMetadata },
  "products": { component: PigMilkProducts, metadata: productsMetadata },
}
```

Pages without metadata (like `home.tsx`) are stored as bare components. Pages with metadata exports are stored as `{ component, metadata }` objects. The catch-all route handles both forms.

- [ ] **Step 6: Register pigmilk in registry**

Update `src/sites/registry.ts` to add the pigmilk import:

```ts
import type { SiteModule } from "@/themes"
import { config as apexConfig, pages as apexPages } from "./apex"
import { config as pigmilkConfig, pages as pigmilkPages } from "./pigmilk"

export const siteRegistry: Record<string, SiteModule> = {
  apex: { config: apexConfig, pages: apexPages },
  pigmilk: { config: pigmilkConfig, pages: pigmilkPages },
}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain in siteRegistry
}
```

- [ ] **Step 7: Smoke test pigmilk site**

Run: `npm run dev`

Visit `http://localhost:3000/?site=pigmilk` — should render Pig Milk homepage with pink theme, Playfair Display headings.

Verify:
- Header shows "Pig Milk Co." with Home/Products/About nav links
- Hero, features, testimonials, and CTA banner all render
- Theme colors (pink primary) are applied
- Visit `http://localhost:3000/products?site=pigmilk` — products page renders
- Visit `http://localhost:3000/about?site=pigmilk` — about page renders
- Visit `http://localhost:3000/nonexistent?site=pigmilk` — 404 page renders

**Note:** Clicking nav links locally will lose the `?site=` param. This is expected — manually re-add it to the URL when testing locally. In production, real subdomains handle this.

- [ ] **Step 8: Verify apex landing page shows pigmilk**

Visit `http://localhost:3000/` — apex landing page should now show "Pig Milk Co." in the "Our Brands" grid.

- [ ] **Step 9: Commit**

```bash
git add src/sites/pigmilk/ src/sites/registry.ts
git commit -m "add Pig Milk Co. example site with home, about, and products pages"
```

---

## Task 8: Documentation

**Files:**
- Create: `VERCEL_SETUP.md`
- Create: `CLAUDE.md`

- [ ] **Step 1: Create VERCEL_SETUP.md**

Create `VERCEL_SETUP.md`:

```markdown
# Vercel & DNS Setup for specificindustries.com

## 1. Create Vercel Project

1. Go to https://vercel.com/new
2. Import this GitHub repository
3. Framework preset: Next.js (auto-detected)
4. Click Deploy

## 2. Add Domain

In your Vercel project dashboard:

1. Go to Settings → Domains
2. Add `specificindustries.com`
3. Add `*.specificindustries.com` (wildcard)

Vercel will show you the DNS records you need to configure.

## 3. Configure DNS

At your domain registrar (wherever you bought specificindustries.com), set up these DNS records:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 76.76.21.21              |
| CNAME | *    | cname.vercel-dns.com     |

The A record points the apex domain (specificindustries.com) to Vercel.
The CNAME wildcard points all subdomains (*.specificindustries.com) to Vercel.

**Note:** The A record IP may change. Check the Vercel dashboard for the current value when configuring.

## 4. SSL

SSL certificates are provisioned automatically by Vercel for all domains, including wildcard subdomains. No action needed.

## 5. Verify

After DNS propagation (can take up to 48 hours, usually minutes):

- Visit https://specificindustries.com — should show the apex landing page
- Visit https://pigmilk.specificindustries.com — should show the Pig Milk site
- Visit https://random.specificindustries.com — should redirect to apex

## Hobby Plan Notes

- Serverless function timeout: 10 seconds
- Bandwidth: 100GB/month
- Hobby plan is for non-commercial use. Move to Pro plan before enabling real e-commerce.
```

- [ ] **Step 2: Create CLAUDE.md**

Create `CLAUDE.md`:

```markdown
# Specific Industries

A single Next.js 15 app serving multiple joke websites on subdomains of specificindustries.com.

## Architecture

- **Single Next.js app** deployed as one Vercel project with wildcard subdomain routing
- **Middleware** (`src/middleware.ts`) extracts subdomain from Host header, sets `x-subdomain` request header
- **Catch-all route** (`src/app/[[...slug]]/page.tsx`) resolves subdomain + URL path to the correct site page
- **Each site** is self-contained under `src/sites/<subdomain>/` with its own config, pages, and theme
- **All pages are dynamically rendered** (no static generation) because the catch-all reads `headers()`

## Project Structure

```
src/
├── app/                    # Next.js App Router (DO NOT add page routes here — all routing goes through the catch-all)
│   └── [[...slug]]/        # Catch-all route — the ONLY page route
├── components/             # Shared UI components (theme-aware via CSS variables)
│   ├── layout/             # Header, Footer
│   └── ui/                 # Hero, FeatureSection, TestimonialGrid, CTABanner, etc.
├── sites/                  # One folder per subdomain site
│   ├── apex/               # Landing page for specificindustries.com
│   ├── pigmilk/            # Example multi-page site
│   └── registry.ts         # Maps subdomain strings → site modules
└── themes/                 # Theme types, presets, and font declarations
    ├── index.ts             # Types: SiteConfig, PageEntry, SiteModule, themeToCSS()
    └── fonts.ts             # next/font declarations + fontFamilyMap
```

## Adding a New Subdomain Site

1. Create `src/sites/<subdomain>/config.ts` — define SiteConfig (theme, metadata, nav, features)
2. Create `src/sites/<subdomain>/pages/home.tsx` — at minimum a homepage
3. Create `src/sites/<subdomain>/index.ts` — barrel that exports `config` and `pages` map
4. Register in `src/sites/registry.ts` — import and add to `siteRegistry`
5. Optionally add static assets to `public/sites/<subdomain>/`

The `pages` export is a `Record<string, PageEntry>` where keys are route slugs:
- `""` → `/` (homepage)
- `"about"` → `/about`
- `"products"` → `/products`

A `PageEntry` is either:
- A bare `React.ComponentType` (for pages with no custom metadata)
- A `{ component: React.ComponentType, metadata: { title?, description? } }` object (for pages with SEO overrides)

Example barrel with both forms:
```typescript
export const pages: Record<string, PageEntry> = {
  "": HomePage,                                           // bare component
  "about": { component: AboutPage, metadata: aboutMeta }, // with metadata
}
```

## Key Conventions

- **No shared routes.** Each site defines its own pages. There is no concept of a shared `/about` or `/products` page.
- **Theme via CSS variables.** Site configs set theme colors/fonts. The root layout injects them as CSS custom properties on `<body>`. Tailwind utilities (`text-primary`, `bg-secondary`, etc.) reference these variables via `@theme inline` in `globals.css`. Shared components automatically adapt.
- **Tailwind CSS v4** with CSS-first configuration. Theme tokens are declared in `src/app/globals.css` using `@theme inline`. There is no `tailwind.config.ts`.
- **Fonts declared in `src/themes/fonts.ts`.** To add a new font: (1) add the `next/font/google` import and declaration, (2) add its `.variable` to the `fontVariables` array, (3) add its CSS font-family string to `fontFamilyMap`, (4) use the key in a site config's `theme.fonts`.
- **Compose from shared components.** Site pages should use components from `src/components/ui/` and `src/components/layout/`. Build new shared components when a pattern will be reused across sites.
- **No new App Router routes.** All page routing goes through `src/app/[[...slug]]/page.tsx`. Do NOT create new folders under `src/app/` for site pages.
- **Static assets** live in `public/sites/<subdomain>/` and are referenced with absolute paths (e.g., `/sites/pigmilk/logo.png`).

## Local Development

```bash
npm run dev
```

- `localhost:3000/` — apex landing page
- `localhost:3000/?site=pigmilk` — pigmilk homepage
- `localhost:3000/about?site=pigmilk` — pigmilk about page

The `?site=` param simulates subdomain routing locally and on Vercel preview deploys.

**Known limitation:** The `?site=` param is only read by middleware on the initial page load. Client-side navigation via `<Link>` does not preserve it. When testing locally, you may need to manually add `?site=<subdomain>` to the URL after navigating. This does not affect production (where real subdomains are used).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npx tsc --noEmit` — type check without emitting

## Tech Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Vercel (hobby plan)

## Design Spec

See `docs/superpowers/specs/2026-03-24-subdomain-joke-sites-design.md` for the full design document.
```

- [ ] **Step 3: Commit**

```bash
git add VERCEL_SETUP.md CLAUDE.md
git commit -m "add Vercel setup guide and CLAUDE.md project conventions"
```

---

## Task 9: Final Verification

- [ ] **Step 1: Production build test**

Run: `npm run build`

Expected: Build succeeds with no errors.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 3: Run linter**

Run: `npm run lint`

Expected: No lint errors.

- [ ] **Step 4: End-to-end manual verification**

Run: `npm run dev` and verify all routes:

| URL | Expected |
|-----|----------|
| `localhost:3000/` | Apex landing page with "Our Brands" listing Pig Milk |
| `localhost:3000/?site=pigmilk` | Pig Milk homepage with pink theme |
| `localhost:3000/about?site=pigmilk` | Pig Milk about page |
| `localhost:3000/products?site=pigmilk` | Pig Milk products page |
| `localhost:3000/nonexistent?site=pigmilk` | 404 page |
| `localhost:3000/nonexistent` | 404 page |

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address issues found during final verification"
```
