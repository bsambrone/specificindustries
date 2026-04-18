# Superengineered Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the `superengineered` subdomain — an Apple-glossy satire brand that sells 30 over-engineered everyday objects (toothbrushes, doorknobs, light switches, spoons + accessories) with SaaS subscription gates on every product.

**Architecture:** Standard Specific Industries site pattern — one folder under `src/sites/superengineered/` with `config.ts`, `index.ts` barrel (with `dynamicRoutes`), `data/products.ts`, and page components. Three new shared UI components live under `src/components/ui/` (`GlossyProductHero`, `GlossySpecSheet`, `GlossyPricingGrid`) for Apple-style rendering. Product detail pages are served via a dynamic route (`/products/[slug]`). Commerce flag enabled so the cart/checkout flow works.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, existing shared components (`Header`, `Footer`, `CartProvider`, `AddToCartButton`), Inter font (already in registry), image-gen MCP for product art.

---

## Spec reference

`docs/superpowers/specs/2026-04-17-superengineered-site-design.md`

## File plan

**New files under `src/sites/superengineered/`:**
- `config.ts` — SiteConfig (theme, metadata, nav, commerce: true)
- `index.ts` — Barrel (config, pages, dynamicRoutes)
- `data/products.ts` — 30-product catalog + type definitions + helpers
- `pages/home.tsx`
- `pages/shop.tsx`
- `pages/about.tsx`
- `pages/leadership.tsx`
- `pages/contact.tsx`
- `pages/privacy.tsx`
- `pages/terms.tsx`
- `pages/enterprise.tsx`
- `pages/developers.tsx`
- `pages/trust.tsx`
- `pages/product-detail.tsx` (mounted via dynamicRoutes for `/products/[slug]`)

**New files under `src/components/ui/`:**
- `glossy-product-hero.tsx`
- `glossy-spec-sheet.tsx`
- `glossy-pricing-grid.tsx`

**Modified files:**
- `src/sites/registry.ts` — register superengineered module
- `src/sites/subdomains.ts` — add "superengineered" to VALID_SUBDOMAINS

**New static assets under `public/sites/superengineered/`:**
- `products/*.png` — 30 product images (12 flagship hero shots + 18 accessory tiles)
- `wordmark.svg` (optional) or rely on text wordmark in header

## Verification conventions (this repo)

This repo has no unit test framework for pages — only Playwright E2E. We verify each task with:
- `npx tsc --noEmit` — type check
- `npm run lint` — ESLint
- Dev server + browser load at `http://localhost:3000/<path>?site=superengineered` for visual/smoke check

Each task ends with a commit.

---

## Task 1: Scaffold site + register subdomain

**Files:**
- Create: `src/sites/superengineered/config.ts`
- Create: `src/sites/superengineered/index.ts`
- Create: `src/sites/superengineered/pages/home.tsx`
- Modify: `src/sites/subdomains.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Write `src/sites/superengineered/config.ts`**

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Superengineered",
  subdomain: "superengineered",
  theme: {
    preset: "apple-minimal",
    colors: {
      primary: "#1d1d1f",     // Near-black text / buttons
      secondary: "#f5f5f7",   // Apple grey section breaks
      accent: "#0071e3",      // Apple blue CTAs / links
      background: "#ffffff",  // Pure white
      text: "#1d1d1f",        // Near-black body
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "Superengineered — Rebuilt from first principles.",
    description: "Essential objects, rebuilt. Toothbrushes, doorknobs, light switches, and spoons — engineered at a level previously reserved for datacenters. Cloud+ subscription required.",
    ogImage: "/sites/superengineered/products/toothbrush-pro.png",
  },
  nav: [
    { label: "Shop", path: "/shop" },
    { label: "Enterprise", path: "/enterprise" },
    { label: "Developers", path: "/developers" },
    { label: "Trust", path: "/trust" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Write `src/sites/superengineered/pages/home.tsx` (placeholder)**

```typescript
export default function SuperengineeredHome() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <h1 className="text-4xl font-heading font-light tracking-tight text-primary">
        Superengineered — scaffolding in progress.
      </h1>
    </main>
  )
}
```

- [ ] **Step 3: Write `src/sites/superengineered/index.ts` (placeholder barrel)**

```typescript
import type { PageEntry } from "@/themes"
import { config } from "./config"
import SuperengineeredHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SuperengineeredHome,
}
```

- [ ] **Step 4: Add "superengineered" to `src/sites/subdomains.ts`**

Append `"superengineered"` to the `VALID_SUBDOMAINS` array (before the closing `] as const`). Keep alphabetical-ish grouping isn't required — match existing order (last entry is `"meh"`; add after).

- [ ] **Step 5: Register in `src/sites/registry.ts`**

Add the import near the bottom of the imports block:

```typescript
import { config as superengineeredConfig, pages as superengineeredPages } from "./superengineered"
```

Add to `siteRegistry` (after `meh`):

```typescript
  superengineered: { config: superengineeredConfig, pages: superengineeredPages },
```

(Note: no `dynamicRoutes` yet — added in Task 8.)

- [ ] **Step 6: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Verify in browser**

Run: `npm run dev` (in background or new terminal)
Open: `http://localhost:3000/?site=superengineered`
Expected: "Superengineered — scaffolding in progress." renders, site-level header/footer appear.

- [ ] **Step 8: Commit**

```bash
git add src/sites/superengineered src/sites/registry.ts src/sites/subdomains.ts
git commit -m "feat(superengineered): scaffold site + register subdomain"
```

---

## Task 2: Build product data types + flagship products (12 SKUs)

**Files:**
- Create: `src/sites/superengineered/data/products.ts`

- [ ] **Step 1: Write types and flagship data**

Write the complete file:

```typescript
export type ProductFamily = "toothbrush" | "doorknob" | "lightswitch" | "spoon" | "accessory"

export type SubscriptionTier = {
  name: "Personal" | "Pro" | "Enterprise"
  priceMonthly: number
  features: string[]
  cta?: string
}

export type Product = {
  slug: string
  family: ProductFamily
  name: string
  tagline: string
  heroImage: string
  startingPrice: number
  specs: { label: string; value: string }[]
  subscription: {
    required: boolean
    tiers: [SubscriptionTier, SubscriptionTier, SubscriptionTier]
  }
  complianceFootnotes: string[]
}

const ENTERPRISE_CTA = "Contact Sales"

// ---------- Flagship: Toothbrush ----------

const toothbrushStandard: Product = {
  slug: "toothbrush-standard",
  family: "toothbrush",
  name: "Toothbrush Standard",
  tagline: "Brushing, reconsidered.",
  heroImage: "/sites/superengineered/products/toothbrush-standard.png",
  startingPrice: 199,
  specs: [
    { label: "Bristle Count", value: "2,112 precision-aligned filaments" },
    { label: "Firmware", value: "BrushOS 4.2 (over-the-air updates)" },
    { label: "Battery Life", value: "Up to 14 days between cloud syncs" },
    { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.3" },
    { label: "Warranty", value: "1 year limited, subscription tied" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 6,
        features: ["Daily brush log", "3-month history", "Standard firmware updates"],
      },
      {
        name: "Pro",
        priceMonthly: 14,
        features: ["Predictive brushing insights", "Unlimited history", "Early firmware access"],
      },
      {
        name: "Enterprise",
        priceMonthly: 49,
        features: ["All Pro features", "SSO login", "SOC 2 compliance report", "Dental admin portal"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Requires BrushCloud+ subscription. Device becomes inoperative after 14 days without sync.",
    "Firmware updates may deprecate bristle configurations on older models.",
  ],
}

const toothbrushPro: Product = {
  slug: "toothbrush-pro",
  family: "toothbrush",
  name: "Toothbrush Pro",
  tagline: "Brushing, rebuilt.",
  heroImage: "/sites/superengineered/products/toothbrush-pro.png",
  startingPrice: 349,
  specs: [
    { label: "Bristle Count", value: "3,860 AI-oriented filaments" },
    { label: "Firmware", value: "BrushOS 4.2 Pro (ML inference on-device)" },
    { label: "Sensors", value: "9-axis IMU, gum pressure array, enamel LIDAR" },
    { label: "Battery Life", value: "Up to 10 days; degrades with telemetry load" },
    { label: "Warranty", value: "1 year limited, subscription tied" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 9,
        features: ["Brush heatmaps", "6-month history", "Basic ML coaching"],
      },
      {
        name: "Pro",
        priceMonthly: 19,
        features: ["Predictive plaque modeling", "Unlimited history", "Live dentist hand-off API"],
      },
      {
        name: "Enterprise",
        priceMonthly: 79,
        features: ["All Pro features", "SSO", "SOC 2 + HIPAA", "Fleet management (up to 10,000 devices)"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Requires BrushCloud+ Pro subscription. Core functionality disabled without active plan.",
    "On-device ML inference contributes up to 4W draw during sustained brushing.",
  ],
}

const toothbrushProMax: Product = {
  slug: "toothbrush-pro-max",
  family: "toothbrush",
  name: "Toothbrush Pro Max",
  tagline: "Our most considered brush.",
  heroImage: "/sites/superengineered/products/toothbrush-pro-max.png",
  startingPrice: 599,
  specs: [
    { label: "Bristle Count", value: "5,208 laser-ablated filaments" },
    { label: "Firmware", value: "BrushOS 4.2 Pro Max (multi-user mesh)" },
    { label: "Sensors", value: "Full-mouth LIDAR, saliva spectrometer, bite-force telemetry" },
    { label: "Battery Life", value: "Up to 7 days; continuous sync recommended" },
    { label: "Titanium Housing", value: "Aerospace-grade Ti-6Al-4V, brushed finish" },
    { label: "Warranty", value: "2 years limited, subscription tied" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 14,
        features: ["Full-mouth 3D reconstruction", "Unlimited history", "Advanced ML coaching"],
      },
      {
        name: "Pro",
        priceMonthly: 29,
        features: ["Real-time dental digital twin", "Predictive cavity alerts", "Concierge hygienist chat"],
      },
      {
        name: "Enterprise",
        priceMonthly: 129,
        features: ["All Pro features", "SSO", "SOC 2 + HIPAA + HITRUST", "Dedicated CSM"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Requires BrushCloud+ Pro Max subscription. Device ships in inert mode.",
    "Saliva spectrometer data is retained indefinitely per our Trust Policy.",
  ],
}

// ---------- Flagship: Doorknob ----------

const doorknobHome: Product = {
  slug: "doorknob-home",
  family: "doorknob",
  name: "Doorknob Home",
  tagline: "The turn, perfected.",
  heroImage: "/sites/superengineered/products/doorknob-home.png",
  startingPrice: 249,
  specs: [
    { label: "Rotation Model", value: "Predictive torque assist" },
    { label: "Materials", value: "Brushed stainless, recycled aerospace alloys" },
    { label: "Sensors", value: "Capacitive grip ring, 6-axis motion" },
    { label: "Connectivity", value: "Wi-Fi 6, Thread, Matter" },
    { label: "Power", value: "Wired 24V or rechargeable cell (subscription-locked)" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 5,
        features: ["Entry log", "Predictive turn (basic)", "Standard firmware"],
      },
      {
        name: "Pro",
        priceMonthly: 14,
        features: ["Biometric grip ID (up to 6 users)", "Smart geofencing", "Priority firmware"],
      },
      {
        name: "Enterprise",
        priceMonthly: 59,
        features: ["Unlimited users", "SSO + SAML", "SOC 2", "Building management integration"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Doorknob requires active DoorCloud+ subscription to rotate.",
    "Biometric grip ID features subject to regional availability.",
  ],
}

const doorknobPro: Product = {
  slug: "doorknob-pro",
  family: "doorknob",
  name: "Doorknob Pro",
  tagline: "Authenticated entry, reimagined.",
  heroImage: "/sites/superengineered/products/doorknob-pro.png",
  startingPrice: 449,
  specs: [
    { label: "Rotation Model", value: "Adaptive torque assist w/ haptic feedback" },
    { label: "Biometric Layer", value: "Grip ID + palm vein + HRV signature" },
    { label: "Sensors", value: "Thermal array, 9-axis IMU, capacitive ring" },
    { label: "Connectivity", value: "Wi-Fi 6E, Thread, Matter, cellular backup" },
    { label: "Latency", value: "< 180ms p99 from grip to unlock" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 9,
        features: ["Biometric grip ID (up to 12 users)", "HRV stress logging", "Priority firmware"],
      },
      {
        name: "Pro",
        priceMonthly: 24,
        features: ["Palm vein authentication", "Anomaly detection ML", "Remote turn audit log"],
      },
      {
        name: "Enterprise",
        priceMonthly: 99,
        features: ["All Pro features", "SSO + SAML", "SOC 2 + ISO 27001", "24/7 on-call support"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "DoorCloud+ Pro subscription required for authentication layer.",
    "HRV data may be shared with our health partners per opt-in.",
  ],
}

const doorknobEnterprise: Product = {
  slug: "doorknob-enterprise",
  family: "doorknob",
  name: "Doorknob Enterprise",
  tagline: "Perimeter, as a product.",
  heroImage: "/sites/superengineered/products/doorknob-enterprise.png",
  startingPrice: 1299,
  specs: [
    { label: "Rotation Model", value: "Enterprise-grade magnetic assist, redundant actuators" },
    { label: "Biometric Layer", value: "Multi-factor: grip ID + palm vein + retinal flash" },
    { label: "Certification", value: "FIPS 140-3, ASHRAE 189.1, NEMA 4X" },
    { label: "Uptime SLA", value: "99.995% quarterly" },
    { label: "Fleet Management", value: "Central console for up to 50,000 knobs" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 19,
        features: ["Single-door deployment", "Basic audit log", "Community support"],
      },
      {
        name: "Pro",
        priceMonthly: 49,
        features: ["Up to 25 doors", "Compliance reporting", "Business-hours support"],
      },
      {
        name: "Enterprise",
        priceMonthly: 299,
        features: ["Unlimited doors", "SSO + SAML + SCIM", "FedRAMP roadmap", "Dedicated TAM"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "DoorCloud+ Enterprise subscription mandatory. No offline mode.",
    "Retinal flash must be calibrated by a Superengineered-certified installer.",
  ],
}

// ---------- Flagship: Light Switch ----------

const lightswitchAir: Product = {
  slug: "lightswitch-air",
  family: "lightswitch",
  name: "Light Switch Air",
  tagline: "Illumination, signed in.",
  heroImage: "/sites/superengineered/products/lightswitch-air.png",
  startingPrice: 179,
  specs: [
    { label: "Gesture Model", value: "Capacitive tap + swipe" },
    { label: "Authentication", value: "Email magic link (required)" },
    { label: "Connectivity", value: "Wi-Fi 6, Thread, Matter" },
    { label: "Power", value: "Line-powered with battery backup (subscription-gated)" },
    { label: "Latency", value: "~500ms from tap to photon" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 3,
        features: ["Up to 2 switches", "Email auth", "Community support"],
      },
      {
        name: "Pro",
        priceMonthly: 9,
        features: ["Up to 20 switches", "Scene scheduling", "2FA"],
      },
      {
        name: "Enterprise",
        priceMonthly: 39,
        features: ["Unlimited switches", "SSO (SAML + OIDC)", "Audit log", "Priority support"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Login required on every wake. Sessions expire after 30 days.",
    "Switch operates in fallback dim mode during outages (Pro+ only).",
  ],
}

const lightswitchPro: Product = {
  slug: "lightswitch-pro",
  family: "lightswitch",
  name: "Light Switch Pro",
  tagline: "Illumination, with identity.",
  heroImage: "/sites/superengineered/products/lightswitch-pro.png",
  startingPrice: 329,
  specs: [
    { label: "Gesture Model", value: "Capacitive tap, swipe, and pinch" },
    { label: "Authentication", value: "SSO (OIDC / SAML) required" },
    { label: "Sensors", value: "Ambient light, occupancy, glass-break audio" },
    { label: "Connectivity", value: "Wi-Fi 6E, Thread, Matter, LTE-M backup" },
    { label: "Certifications", value: "UL, FCC, SOC 2" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 8,
        features: ["Up to 20 switches", "SSO", "Basic scenes"],
      },
      {
        name: "Pro",
        priceMonthly: 19,
        features: ["Up to 100 switches", "Occupancy ML", "Scene version control"],
      },
      {
        name: "Enterprise",
        priceMonthly: 79,
        features: ["Unlimited", "SAML + SCIM", "Compliance reporting", "Dedicated CSM"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "SSO provider downtime will render switches inoperative.",
    "Glass-break audio is retained for 30 days per Trust Policy.",
  ],
}

const lightswitchUltra: Product = {
  slug: "lightswitch-ultra",
  family: "lightswitch",
  name: "Light Switch Ultra",
  tagline: "The switch, re-founded.",
  heroImage: "/sites/superengineered/products/lightswitch-ultra.png",
  startingPrice: 799,
  specs: [
    { label: "Gesture Model", value: "Full haptic, sub-mm force discrimination" },
    { label: "Authentication", value: "Passkeys + step-up MFA" },
    { label: "Sensors", value: "Thermal, occupancy, CO₂, VOC, glass-break" },
    { label: "Connectivity", value: "Wi-Fi 7, Thread, Matter, LTE, satellite fallback" },
    { label: "Certifications", value: "UL, FCC, SOC 2 + ISO 27001" },
    { label: "Guarantee", value: "Photon-delivery SLA: 99.99% quarterly" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 14,
        features: ["Up to 50 switches", "Passkeys", "Advanced scenes"],
      },
      {
        name: "Pro",
        priceMonthly: 39,
        features: ["Unlimited switches", "ML occupancy modeling", "Photon SLA"],
      },
      {
        name: "Enterprise",
        priceMonthly: 199,
        features: ["Global fleet management", "SSO + SCIM + SAML", "FedRAMP roadmap", "24/7 on-call"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Photon SLA assumes active SwitchCloud+ Ultra subscription.",
    "Satellite fallback subject to regional orbital availability.",
  ],
}

// ---------- Flagship: Spoon ----------

const spoonMini: Product = {
  slug: "spoon-mini",
  family: "spoon",
  name: "Spoon Mini",
  tagline: "The utensil, on-demand.",
  heroImage: "/sites/superengineered/products/spoon-mini.png",
  startingPrice: 79,
  specs: [
    { label: "Material", value: "Medical-grade stainless, subscription-embedded RFID" },
    { label: "Bowl Volume", value: "4.8 mL (adjustable via Pro subscription)" },
    { label: "Connectivity", value: "NFC tap-to-bowl activation" },
    { label: "Sensors", value: "Bite-adjacency, temperature" },
    { label: "Warranty", value: "30 days (subscription-contingent)" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 4,
        features: ["Bowl end unlocked", "Basic bite log", "Community support"],
      },
      {
        name: "Pro",
        priceMonthly: 12,
        features: ["Adjustable bowl volume", "Nutrition analytics", "Dishwasher mode"],
      },
      {
        name: "Enterprise",
        priceMonthly: 39,
        features: ["Cafeteria-scale deployment", "SSO", "Hygiene compliance reporting"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Bowl end inactive without active SpoonCloud+ subscription.",
    "Dishwasher mode requires Pro tier or higher.",
  ],
}

const spoonPro: Product = {
  slug: "spoon-pro",
  family: "spoon",
  name: "Spoon Pro",
  tagline: "Utensil-as-a-service.",
  heroImage: "/sites/superengineered/products/spoon-pro.png",
  startingPrice: 149,
  specs: [
    { label: "Material", value: "Titanium, precision-milled" },
    { label: "Bowl Volume", value: "8 mL, programmable between 2–12 mL" },
    { label: "Sensors", value: "Bite cadence, temperature, mass spectrometry" },
    { label: "Connectivity", value: "NFC + Bluetooth 5.3" },
    { label: "Warranty", value: "90 days (subscription-contingent)" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 9,
        features: ["Programmable bowl", "Bite cadence analytics", "Monthly reports"],
      },
      {
        name: "Pro",
        priceMonthly: 24,
        features: ["Mass spec readouts", "Nutrition digital twin", "Live dietitian API"],
      },
      {
        name: "Enterprise",
        priceMonthly: 79,
        features: ["Workplace deployment (100+ spoons)", "SSO", "SOC 2", "HIPAA-ready"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Bowl end and analytics inactive without SpoonCloud+ Pro subscription.",
    "Mass spectrometry data retention is Pro-tier only.",
  ],
}

const spoonProMax: Product = {
  slug: "spoon-pro-max",
  family: "spoon",
  name: "Spoon Pro Max",
  tagline: "The spoon, ended.",
  heroImage: "/sites/superengineered/products/spoon-pro-max.png",
  startingPrice: 329,
  specs: [
    { label: "Material", value: "Monocrystalline titanium, flight-grade" },
    { label: "Bowl Volume", value: "12 mL, continuously variable 1–20 mL" },
    { label: "Sensors", value: "Mass spec, pH, micronutrient array, bite force" },
    { label: "Connectivity", value: "NFC + Bluetooth 5.3 + Wi-Fi 6E (for firmware)" },
    { label: "Haptics", value: "Sub-gram feedback at 4,000 Hz" },
    { label: "Warranty", value: "1 year (subscription-contingent)" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 14,
        features: ["Continuously variable bowl", "Full sensor suite", "Unlimited history"],
      },
      {
        name: "Pro",
        priceMonthly: 39,
        features: ["Predictive nutrition modeling", "Haptic pairing with fork", "Concierge nutritionist"],
      },
      {
        name: "Enterprise",
        priceMonthly: 149,
        features: ["Fleet deployment", "SSO", "SOC 2 + HIPAA + HITRUST", "Dedicated CSM"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "SpoonCloud+ Pro Max subscription required. Utensil ships in lockout mode.",
    "Haptic pairing requires a Superengineered Fork (sold separately, subscription-bound).",
  ],
}

// ---------- Registry (accessories appended in next task) ----------

export const products: Product[] = [
  toothbrushStandard, toothbrushPro, toothbrushProMax,
  doorknobHome, doorknobPro, doorknobEnterprise,
  lightswitchAir, lightswitchPro, lightswitchUltra,
  spoonMini, spoonPro, spoonProMax,
]

// ---------- Helpers ----------

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByFamily(family: ProductFamily): Product[] {
  return products.filter((p) => p.family === family)
}

export const FAMILY_LABELS: Record<ProductFamily, string> = {
  toothbrush: "Toothbrush",
  doorknob: "Doorknob",
  lightswitch: "Light Switch",
  spoon: "Spoon",
  accessory: "Accessories",
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/superengineered/data/products.ts
git commit -m "feat(superengineered): add product types + 12 flagship SKUs"
```

---

## Task 3: Add 18 accessory products via helper

**Files:**
- Modify: `src/sites/superengineered/data/products.ts`

- [ ] **Step 1: Add a `makeAccessory` helper and 18 accessory declarations**

Append before the `products` export (replace the products array with the updated version that includes accessories).

Insert after the `spoonProMax` constant, before the `// ---------- Registry` comment:

```typescript
// ---------- Accessories ----------

type AccessoryInput = {
  slug: string
  name: string
  tagline: string
  startingPrice: number
  coreSpec: string
  warrantyNote?: string
  personalFeature: string
  proFeature: string
  enterpriseFeature: string
  footnote: string
}

function makeAccessory(input: AccessoryInput): Product {
  return {
    slug: input.slug,
    family: "accessory",
    name: input.name,
    tagline: input.tagline,
    heroImage: `/sites/superengineered/products/${input.slug}.png`,
    startingPrice: input.startingPrice,
    specs: [
      { label: "Core Capability", value: input.coreSpec },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.3, Matter" },
      { label: "Firmware", value: "SuperOS 4.2 (over-the-air updates)" },
      { label: "Warranty", value: input.warrantyNote ?? "1 year limited, subscription tied" },
    ],
    subscription: {
      required: false,
      tiers: [
        {
          name: "Personal",
          priceMonthly: 4,
          features: ["Basic operation", input.personalFeature, "Community support"],
        },
        {
          name: "Pro",
          priceMonthly: 12,
          features: ["All Personal features", input.proFeature, "Priority support"],
        },
        {
          name: "Enterprise",
          priceMonthly: 49,
          features: ["All Pro features", input.enterpriseFeature, "SSO", "SOC 2 report"],
          cta: ENTERPRISE_CTA,
        },
      ],
    },
    complianceFootnotes: [input.footnote],
  }
}

const accessories: Product[] = [
  makeAccessory({
    slug: "thermal-mug",
    name: "Thermal Mug",
    tagline: "Temperature, governed.",
    startingPrice: 129,
    coreSpec: "12 oz ceramic w/ 4-zone thermal AI",
    personalFeature: "Ambient temperature logging",
    proFeature: "Predictive sip-temp targeting",
    enterpriseFeature: "Barista fleet analytics",
    footnote: "Exterior surface temperature warranted only within Pro subscription tier.",
  }),
  makeAccessory({
    slug: "weather-umbrella",
    name: "Weather Umbrella",
    tagline: "Precipitation, subscribed.",
    startingPrice: 189,
    coreSpec: "Carbon-fiber canopy w/ integrated forecast subscription",
    personalFeature: "3-hour local forecast",
    proFeature: "14-day hyperlocal precipitation ML",
    enterpriseFeature: "Campus-wide umbrella fleet routing",
    footnote: "Umbrella will not deploy without active ForecastCloud+ subscription.",
  }),
  makeAccessory({
    slug: "sleep-pillow",
    name: "Sleep Pillow",
    tagline: "Rest, as a service.",
    startingPrice: 249,
    coreSpec: "Memory-foam w/ 6-zone pressure and EEG array",
    personalFeature: "Sleep stage logging",
    proFeature: "Dream inference ML (beta)",
    enterpriseFeature: "Workforce fatigue dashboards",
    footnote: "Pillow decompresses only during active RestCloud+ sessions.",
  }),
  makeAccessory({
    slug: "blockchain-coaster",
    name: "Blockchain Coaster",
    tagline: "Each ring, immutable.",
    startingPrice: 89,
    coreSpec: "Tempered cork w/ L2-anchored drink provenance",
    personalFeature: "Provenance log on-chain",
    proFeature: "Multi-coaster consensus voting",
    enterpriseFeature: "Enterprise ledger export (CSV / Parquet)",
    footnote: "Gas fees not included. Coasters may pause during chain congestion.",
  }),
  makeAccessory({
    slug: "torque-paper-towel",
    name: "Torque Paper Towel Dispenser",
    tagline: "Perforation, quantified.",
    startingPrice: 219,
    coreSpec: "Precision drag arm w/ force telemetry",
    personalFeature: "Per-tear force log",
    proFeature: "Anomaly detection (jams, over-pulls)",
    enterpriseFeature: "Restroom fleet analytics + SLA alerts",
    footnote: "Dispenser throttles output on free tier to preserve analytics quota.",
  }),
  makeAccessory({
    slug: "hydration-bottle",
    name: "Hydration Bottle",
    tagline: "Fluid compliance.",
    startingPrice: 99,
    coreSpec: "24 oz steel w/ sip authentication and TDS sensor",
    personalFeature: "Daily hydration log",
    proFeature: "Predictive dehydration alerts",
    enterpriseFeature: "Workplace compliance reporting",
    footnote: "Bottle locks the cap if user exceeds daily cloud-quota.",
  }),
  makeAccessory({
    slug: "analytics-pen",
    name: "Analytics Pen",
    tagline: "Every stroke, observable.",
    startingPrice: 179,
    coreSpec: "Ink-metered pen w/ 6-axis handwriting telemetry",
    personalFeature: "Handwriting stream capture",
    proFeature: "Authorship ML attribution",
    enterpriseFeature: "Contract-signing audit trail + e-discovery",
    footnote: "Ink usage exceeding plan quota may pause writing until reset.",
  }),
  makeAccessory({
    slug: "spill-napkin",
    name: "Spill Napkin",
    tagline: "Absorption, predicted.",
    startingPrice: 49,
    coreSpec: "Smart-fabric napkin w/ capillary ML model",
    personalFeature: "Stain prediction on fold",
    proFeature: "Predictive spill ML (30s advance warning)",
    enterpriseFeature: "Hospitality venue rollout w/ SLA",
    footnote: "Single-use; replacements shipped monthly via subscription.",
  }),
  makeAccessory({
    slug: "categorized-trashcan",
    name: "Categorized Trash Can",
    tagline: "Disposal, resolved.",
    startingPrice: 379,
    coreSpec: "13-gallon bin w/ ML waste categorization + 4 chambers",
    personalFeature: "Weekly waste breakdown",
    proFeature: "Real-time recycling coaching",
    enterpriseFeature: "Building-wide ESG reporting",
    footnote: "Categorization requires lid-camera calibration every 90 days.",
  }),
  makeAccessory({
    slug: "candle-subscription",
    name: "Candle",
    tagline: "Scent, streamed.",
    startingPrice: 59,
    coreSpec: "Beeswax w/ DRM-embedded scent cartridge",
    personalFeature: "Monthly scent rotation",
    proFeature: "Curated scent library (200+)",
    enterpriseFeature: "Venue-wide scent orchestration",
    footnote: "Scent cartridge expires 30 days after last cloud check-in.",
  }),
  makeAccessory({
    slug: "umbrella-stand",
    name: "Umbrella Stand",
    tagline: "Vestibule, managed.",
    startingPrice: 149,
    coreSpec: "Steel stand w/ umbrella-recognition camera",
    personalFeature: "Guest umbrella log",
    proFeature: "Weather-aware capacity alerts",
    enterpriseFeature: "Lobby fleet orchestration",
    footnote: "Stand requires line power; battery backup is Pro-tier only.",
  }),
  makeAccessory({
    slug: "bite-fork",
    name: "Fork with Bite Counter",
    tagline: "Tine intelligence.",
    startingPrice: 139,
    coreSpec: "Stainless fork w/ 4-tine pressure array",
    personalFeature: "Daily bite count",
    proFeature: "Bite-cadence coaching",
    enterpriseFeature: "Cafeteria mealtime analytics",
    footnote: "Pairs with Spoon Pro Max for multi-utensil haptic feedback.",
  }),
  makeAccessory({
    slug: "foot-angle-shoehorn",
    name: "Foot-Angle Shoehorn",
    tagline: "Dressing, optimized.",
    startingPrice: 109,
    coreSpec: "Titanium shoehorn w/ 9-axis IMU and AI foot-angle guidance",
    personalFeature: "Insertion angle log",
    proFeature: "Adaptive angle coaching",
    enterpriseFeature: "Athletic-facility locker room analytics",
    footnote: "Guidance pauses during firmware updates.",
  }),
  makeAccessory({
    slug: "location-bookmark",
    name: "Location Bookmark",
    tagline: "The page, synchronized.",
    startingPrice: 59,
    coreSpec: "Paper-thin bookmark w/ BLE beacon and cloud page-state sync",
    personalFeature: "Last-page sync across 3 books",
    proFeature: "Cross-device reading stream",
    enterpriseFeature: "Library-wide patron analytics",
    footnote: "Page-sync accuracy ±2 pages in offline mode.",
  }),
  makeAccessory({
    slug: "ambient-lampshade",
    name: "Ambient Lampshade",
    tagline: "Mood, as configuration.",
    startingPrice: 189,
    coreSpec: "Translucent silk w/ 16M-color mesh LED array",
    personalFeature: "10 preset moods",
    proFeature: "Adaptive circadian modeling",
    enterpriseFeature: "Office-wide brand-color enforcement",
    footnote: "Lampshade defaults to pure white after subscription lapse.",
  }),
  makeAccessory({
    slug: "cloud-moodboard-magnet",
    name: "Cloud Moodboard Magnet",
    tagline: "The fridge, collaborative.",
    startingPrice: 79,
    coreSpec: "Ferrite magnet w/ e-ink moodboard sync",
    personalFeature: "Household moodboard sync",
    proFeature: "Real-time collaborative boards",
    enterpriseFeature: "Team moodboard management (100+ members)",
    footnote: "e-ink refresh limited to 8 updates/day on Personal tier.",
  }),
  makeAccessory({
    slug: "wake-certification-alarm",
    name: "Wake Certification Alarm",
    tagline: "Morning, verified.",
    startingPrice: 229,
    coreSpec: "Bedside w/ biometric wake certification + cloud attestation",
    personalFeature: "Daily wake certificate (PDF)",
    proFeature: "Employer-ready attendance attestation",
    enterpriseFeature: "Enterprise attendance signing",
    footnote: "Attestation requires 2FA on every wake.",
  }),
  makeAccessory({
    slug: "haptic-remote",
    name: "Haptic Remote Control",
    tagline: "Channels, felt.",
    startingPrice: 159,
    coreSpec: "Universal remote w/ per-button haptic feedback + gesture ML",
    personalFeature: "10-device pairing",
    proFeature: "Gesture macros + haptic themes",
    enterpriseFeature: "Hospitality venue fleet management",
    footnote: "Haptic themes may desync during firmware updates.",
  }),
]
```

- [ ] **Step 2: Replace the products array to include accessories**

Find the existing `export const products: Product[] = [ ... ]` declaration and replace with:

```typescript
export const products: Product[] = [
  toothbrushStandard, toothbrushPro, toothbrushProMax,
  doorknobHome, doorknobPro, doorknobEnterprise,
  lightswitchAir, lightswitchPro, lightswitchUltra,
  spoonMini, spoonPro, spoonProMax,
  ...accessories,
]
```

- [ ] **Step 3: Add an assertion sanity-check at end of file**

Append at the bottom of the file:

```typescript
// Sanity: catalog must contain exactly 30 products.
if (products.length !== 30) {
  throw new Error(`Superengineered catalog expected 30 products, got ${products.length}`)
}
```

- [ ] **Step 4: Verify type-check + run-time sanity**

Run: `npx tsc --noEmit`
Expected: no errors.

(The runtime assertion will throw during Next.js build if the count is off; TSC alone won't catch that.)

- [ ] **Step 5: Commit**

```bash
git add src/sites/superengineered/data/products.ts
git commit -m "feat(superengineered): add 18 accessory products (30 total)"
```

---

## Task 4: Build GlossyProductHero component

**Files:**
- Create: `src/components/ui/glossy-product-hero.tsx`

- [ ] **Step 1: Write the component**

```typescript
import Image from "next/image"
import Link from "next/link"

interface GlossyProductHeroProps {
  name: string
  tagline: string
  image: string
  startingPrice: number
  subscriptionNote?: string
  ctaHref?: string
  ctaText?: string
  secondaryCtaHref?: string
  secondaryCtaText?: string
}

export function GlossyProductHero({
  name,
  tagline,
  image,
  startingPrice,
  subscriptionNote,
  ctaHref,
  ctaText = "Buy",
  secondaryCtaHref,
  secondaryCtaText = "Learn more",
}: GlossyProductHeroProps) {
  return (
    <section className="bg-background py-20 md:py-28 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-light tracking-tight text-primary mb-3">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-primary/70 font-light mb-12">
          {tagline}
        </p>
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-w-3xl mx-auto mb-12">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
        <div className="flex flex-col items-center gap-2 mb-8">
          <p className="text-lg text-primary">
            From <span className="font-semibold">${startingPrice}</span>
          </p>
          {subscriptionNote && (
            <p className="text-sm text-primary/60">{subscriptionNote}</p>
          )}
        </div>
        {(ctaHref || secondaryCtaHref) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaHref && (
              <Link
                href={ctaHref}
                className="inline-block px-8 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
              >
                {ctaText}
              </Link>
            )}
            {secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-block px-8 py-3 rounded-full text-accent font-medium hover:underline"
              >
                {secondaryCtaText} &rsaquo;
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/glossy-product-hero.tsx
git commit -m "feat(ui): add GlossyProductHero shared component"
```

---

## Task 5: Build GlossySpecSheet component

**Files:**
- Create: `src/components/ui/glossy-spec-sheet.tsx`

- [ ] **Step 1: Write the component**

```typescript
interface GlossySpecSheetProps {
  heading?: string
  specs: { label: string; value: string }[]
}

export function GlossySpecSheet({ heading = "Tech Specs", specs }: GlossySpecSheetProps) {
  return (
    <section className="bg-secondary py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-sm font-medium tracking-widest uppercase text-primary/60 mb-10 text-center">
          {heading}
        </h2>
        <dl className="divide-y divide-primary/10 border-y border-primary/10">
          {specs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-1 md:grid-cols-3 gap-2 py-5">
              <dt className="text-sm font-medium text-primary/80">{spec.label}</dt>
              <dd className="md:col-span-2 text-primary/90">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/glossy-spec-sheet.tsx
git commit -m "feat(ui): add GlossySpecSheet shared component"
```

---

## Task 6: Build GlossyPricingGrid component

**Files:**
- Create: `src/components/ui/glossy-pricing-grid.tsx`

- [ ] **Step 1: Write the component**

```typescript
import Link from "next/link"

interface GlossyPricingTier {
  name: string
  priceMonthly: number
  features: string[]
  cta?: string
}

interface GlossyPricingGridProps {
  productName: string
  tiers: GlossyPricingTier[]
  recommendedIndex?: number  // defaults to middle tier (1)
  ctaHref?: string
  footnotes?: string[]
}

export function GlossyPricingGrid({
  productName,
  tiers,
  recommendedIndex = 1,
  ctaHref = "/cart",
  footnotes = [],
}: GlossyPricingGridProps) {
  return (
    <section className="bg-background py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-light tracking-tight text-primary text-center mb-4">
          Pick a plan for your {productName}.
        </h2>
        <p className="text-primary/60 text-center mb-12">
          Every Superengineered device runs on a subscription. Upgrade any time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => {
            const isRecommended = i === recommendedIndex
            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  isRecommended
                    ? "bg-primary text-background shadow-xl"
                    : "bg-secondary text-primary"
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                <div className="text-sm font-medium uppercase tracking-widest mb-4 opacity-70">
                  {tier.name}
                </div>
                <div className="text-4xl font-heading font-light tracking-tight mb-1">
                  ${tier.priceMonthly}
                </div>
                <div className="text-sm opacity-60 mb-6">/ month</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span className="shrink-0 mt-0.5">&#10003;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={ctaHref}
                  className={`block text-center py-3 rounded-full font-medium transition-opacity hover:opacity-90 ${
                    isRecommended
                      ? "bg-accent text-white"
                      : "bg-primary text-background"
                  }`}
                >
                  {tier.cta ?? "Choose plan"}
                </Link>
              </div>
            )
          })}
        </div>
        {footnotes.length > 0 && (
          <div className="mt-10 space-y-2 max-w-3xl mx-auto">
            {footnotes.map((note, i) => (
              <p key={i} className="text-xs text-primary/50 text-center">
                {note}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/glossy-pricing-grid.tsx
git commit -m "feat(ui): add GlossyPricingGrid shared component"
```

---

## Task 7: Build product detail page + wire dynamic route

**Files:**
- Create: `src/sites/superengineered/pages/product-detail.tsx`
- Modify: `src/sites/superengineered/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Write `pages/product-detail.tsx`**

```typescript
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { GlossyProductHero } from "@/components/ui/glossy-product-hero"
import { GlossySpecSheet } from "@/components/ui/glossy-spec-sheet"
import { GlossyPricingGrid } from "@/components/ui/glossy-pricing-grid"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import {
  getProductBySlug,
  getProductsByFamily,
  FAMILY_LABELS,
} from "@/sites/superengineered/data/products"

interface Props {
  slug: string
}

export default function SuperengineeredProductDetail({ slug }: Props) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const subscriptionNote = product.subscription.required
    ? "Subscription required to operate."
    : "Optional upgrades available."

  const related = getProductsByFamily(product.family)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)

  return (
    <>
      <GlossyProductHero
        name={product.name}
        tagline={product.tagline}
        image={product.heroImage}
        startingPrice={product.startingPrice}
        subscriptionNote={subscriptionNote}
      />

      {/* Add-to-cart band */}
      <section className="bg-background py-10 px-4 border-y border-primary/10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-primary/60 uppercase tracking-widest mb-1">
              {FAMILY_LABELS[product.family]}
            </p>
            <p className="text-primary">
              Hardware from <span className="font-semibold">${product.startingPrice}</span>
            </p>
          </div>
          <AddToCartButton
            product={{
              slug: product.slug,
              name: product.name,
              price: product.startingPrice,
              image: product.heroImage,
            }}
          />
        </div>
      </section>

      <GlossySpecSheet specs={product.specs} />

      <GlossyPricingGrid
        productName={product.name}
        tiers={product.subscription.tiers}
        footnotes={product.complianceFootnotes}
      />

      {related.length > 0 && (
        <section className="bg-background py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-light tracking-tight text-primary text-center mb-12">
              Also from the {FAMILY_LABELS[product.family]} line.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/products/${r.slug}`} className="group">
                  <div className="relative w-full aspect-[4/3] bg-secondary rounded-2xl mb-4 overflow-hidden">
                    <Image
                      src={r.heroImage}
                      alt={r.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-contain p-6 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="font-heading text-xl text-primary">{r.name}</p>
                  <p className="text-sm text-primary/60 mt-1">{r.tagline}</p>
                  <p className="text-sm text-primary mt-2">From ${r.startingPrice}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 2: Update `src/sites/superengineered/index.ts` to export `dynamicRoutes`**

Replace the existing file contents with:

```typescript
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import SuperengineeredHome from "./pages/home"
import SuperengineeredProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SuperengineeredHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: SuperengineeredProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — Superengineered`,
            description: p.tagline,
            ogImage: p.heroImage,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 3: Update `src/sites/registry.ts` to pass `dynamicRoutes`**

Replace the import line:

```typescript
import { config as superengineeredConfig, pages as superengineeredPages } from "./superengineered"
```

with:

```typescript
import { config as superengineeredConfig, pages as superengineeredPages, dynamicRoutes as superengineeredDynamicRoutes } from "./superengineered"
```

And replace the `siteRegistry` entry:

```typescript
  superengineered: { config: superengineeredConfig, pages: superengineeredPages },
```

with:

```typescript
  superengineered: { config: superengineeredConfig, pages: superengineeredPages, dynamicRoutes: superengineeredDynamicRoutes },
```

- [ ] **Step 4: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Verify in browser**

Run: `npm run dev` (if not already running)
Open: `http://localhost:3000/products/toothbrush-pro?site=superengineered`
Expected: Glossy hero, add-to-cart band, spec sheet, pricing grid, related products render. Images will 404 until Task 14 — that's expected. Copy/layout should render correctly.

Also: `http://localhost:3000/products/nonexistent-slug?site=superengineered` → 404.

- [ ] **Step 6: Commit**

```bash
git add src/sites/superengineered/pages/product-detail.tsx src/sites/superengineered/index.ts src/sites/registry.ts
git commit -m "feat(superengineered): product detail page + dynamic route"
```

---

## Task 8: Build shop page

**Files:**
- Create: `src/sites/superengineered/pages/shop.tsx`
- Modify: `src/sites/superengineered/index.ts`

- [ ] **Step 1: Write `pages/shop.tsx`**

```typescript
import Link from "next/link"
import Image from "next/image"
import type { PageMetadata } from "@/themes"
import {
  products,
  getProductsByFamily,
  FAMILY_LABELS,
  type ProductFamily,
} from "@/sites/superengineered/data/products"

export const metadata: PageMetadata = {
  title: "Shop — Superengineered",
  description: "Every Superengineered product. Every subscription. In one place.",
}

const FLAGSHIP_ORDER: ProductFamily[] = ["toothbrush", "doorknob", "lightswitch", "spoon"]

function ProductTile({ slug, name, tagline, heroImage, startingPrice }: (typeof products)[number]) {
  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="relative w-full aspect-square bg-secondary rounded-2xl mb-4 overflow-hidden">
        <Image
          src={heroImage}
          alt={name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-contain p-6 group-hover:scale-105 transition-transform"
        />
      </div>
      <p className="font-heading text-lg text-primary">{name}</p>
      <p className="text-sm text-primary/60 mt-1 line-clamp-1">{tagline}</p>
      <p className="text-sm text-primary mt-2">From ${startingPrice}</p>
    </Link>
  )
}

export default function SuperengineeredShop() {
  return (
    <main className="bg-background">
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-heading font-light tracking-tight text-primary mb-4">
          Shop.
        </h1>
        <p className="text-xl text-primary/60 max-w-2xl mx-auto">
          Every Superengineered device. Every subscription. Priced per month, priced per principle.
        </p>
      </section>

      {FLAGSHIP_ORDER.map((family) => {
        const family_products = getProductsByFamily(family)
        return (
          <section key={family} className="py-16 px-4 border-t border-primary/10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2">
                {FAMILY_LABELS[family]}
              </h2>
              <p className="text-3xl md:text-4xl font-heading font-light text-primary mb-10">
                The {FAMILY_LABELS[family].toLowerCase()}, across three tiers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {family_products.map((p) => (
                  <ProductTile key={p.slug} {...p} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <section className="py-16 px-4 border-t border-primary/10 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2">
            Accessories
          </h2>
          <p className="text-3xl md:text-4xl font-heading font-light text-primary mb-10">
            Also from Superengineered.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {getProductsByFamily("accessory").map((p) => (
              <ProductTile key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Register the shop route in `src/sites/superengineered/index.ts`**

Update the imports block to add:

```typescript
import SuperengineeredShop, { metadata as shopMetadata } from "./pages/shop"
```

Update the `pages` export to:

```typescript
export const pages: Record<string, PageEntry> = {
  "": SuperengineeredHome,
  "shop": { component: SuperengineeredShop, metadata: shopMetadata },
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Open: `http://localhost:3000/shop?site=superengineered`
Expected: Four flagship sections (Toothbrush, Doorknob, Light Switch, Spoon) each with 3 tiles, then an Accessories section with 18 tiles. Image 404s are expected.

- [ ] **Step 4: Commit**

```bash
git add src/sites/superengineered/pages/shop.tsx src/sites/superengineered/index.ts
git commit -m "feat(superengineered): shop page grouped by family + accessories"
```

---

## Task 9: Build homepage

**Files:**
- Modify: `src/sites/superengineered/pages/home.tsx`

- [ ] **Step 1: Replace home placeholder with the full homepage**

```typescript
import Link from "next/link"
import Image from "next/image"
import { GlossyProductHero } from "@/components/ui/glossy-product-hero"
import {
  getProductsByFamily,
  getProductBySlug,
  FAMILY_LABELS,
  type ProductFamily,
} from "@/sites/superengineered/data/products"

const FLAGSHIP_ORDER: ProductFamily[] = ["toothbrush", "doorknob", "lightswitch", "spoon"]

export default function SuperengineeredHome() {
  const heroProduct = getProductBySlug("toothbrush-pro")!

  return (
    <main className="bg-background">
      <GlossyProductHero
        name="Toothbrush Pro."
        tagline="Brushing, rebuilt."
        image={heroProduct.heroImage}
        startingPrice={heroProduct.startingPrice}
        subscriptionNote="BrushCloud+ Pro subscription required."
        ctaHref="/products/toothbrush-pro"
        ctaText="Buy"
        secondaryCtaHref="/products/toothbrush-pro"
        secondaryCtaText="Learn more"
      />

      {/* Flagship family tiles */}
      <section className="py-16 px-4 border-t border-primary/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2 text-center">
            The Superengineered Lineup
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">
            Four essentials. Three tiers each. One cloud.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FLAGSHIP_ORDER.map((family) => {
              const first = getProductsByFamily(family)[0]
              return (
                <Link key={family} href={`/products/${first.slug}`} className="group">
                  <div className="relative w-full aspect-[16/10] bg-secondary rounded-3xl overflow-hidden">
                    <Image
                      src={first.heroImage}
                      alt={FAMILY_LABELS[family]}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-contain p-12 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-8 left-8 right-8 text-center">
                      <p className="text-sm uppercase tracking-widest text-primary/60 mb-2">
                        {FAMILY_LABELS[family]}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-heading font-light text-primary">
                        Starting at ${first.startingPrice}
                      </h3>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Firmware band */}
      <section className="bg-primary text-background py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-widest opacity-60 mb-4">
            Announcement
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-light mb-4">
            Firmware 4.2 is here.
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
            Predictive bristle alignment. Recertified doorknob torque curves. Light switches that authenticate faster. All shipped over the air.
          </p>
          <Link
            href="/trust"
            className="inline-block px-6 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
          >
            Read the release notes
          </Link>
        </div>
      </section>

      {/* Accessories band */}
      <section className="py-16 px-4 border-t border-primary/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2">
            Accessories
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-10">
            Also from Superengineered.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {getProductsByFamily("accessory").slice(0, 6).map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group">
                <div className="relative w-full aspect-square bg-secondary rounded-2xl overflow-hidden">
                  <Image
                    src={p.heroImage}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 16vw, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs text-primary mt-2 line-clamp-1">{p.name}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="inline-block text-accent font-medium hover:underline"
            >
              See all accessories &rsaquo;
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise band */}
      <section className="bg-secondary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
            For Workplaces
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-primary mb-4">
            Superengineered for Enterprise.
          </h2>
          <p className="text-lg text-primary/70 max-w-2xl mx-auto mb-8">
            SOC 2-compliant utensils. SSO-gated lighting. Bulk procurement for every essential object your workforce touches.
          </p>
          <Link
            href="/enterprise"
            className="inline-block px-6 py-3 rounded-full bg-primary text-background font-medium hover:opacity-90 transition-opacity"
          >
            Talk to sales
          </Link>
        </div>
      </section>

      {/* Trust band */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
            Trust
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">
            Your telemetry, stewarded.
          </h2>
          <p className="text-primary/70 max-w-2xl mx-auto mb-6">
            Every brush, every turn, every tap is encrypted in transit and at rest. We treat your toothbrushing data with the seriousness it deserves.
          </p>
          <Link href="/trust" className="text-accent font-medium hover:underline">
            Read our Trust Policy &rsaquo;
          </Link>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Open: `http://localhost:3000/?site=superengineered`
Expected: Hero → flagship tiles → firmware band → accessories band → enterprise band → trust band.

- [ ] **Step 3: Commit**

```bash
git add src/sites/superengineered/pages/home.tsx
git commit -m "feat(superengineered): homepage composition"
```

---

## Task 10: Build about, contact, privacy, terms pages

**Files:**
- Create: `src/sites/superengineered/pages/about.tsx`
- Create: `src/sites/superengineered/pages/contact.tsx`
- Create: `src/sites/superengineered/pages/privacy.tsx`
- Create: `src/sites/superengineered/pages/terms.tsx`
- Modify: `src/sites/superengineered/index.ts`

- [ ] **Step 1: Write `pages/about.tsx`**

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "About — Superengineered",
  description: "A letter from our founders on why we rebuilt the toothbrush.",
}

export default function SuperengineeredAbout() {
  return (
    <main className="bg-background py-20 px-4">
      <article className="max-w-2xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4 text-center">
          A Letter From Our Founders
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-light text-primary mb-10 text-center">
          Why we rebuilt the toothbrush.
        </h1>
        <div className="space-y-6 text-lg text-primary/80 leading-relaxed">
          <p>
            For nearly five thousand years, the toothbrush has gone largely unexamined. Generation after generation accepted the daily ritual of applying bristles to enamel without instrumentation, without telemetry, without a single line of production-grade code anywhere in the workflow. We could not continue.
          </p>
          <p>
            Superengineered was founded on a belief that the most ordinary objects in human life deserve the same rigor, the same standards, the same compliance controls we reserve for distributed systems. A spoon, properly built, is a service. A doorknob, properly considered, is a perimeter. A light switch is authentication in physical form.
          </p>
          <p>
            We understand this is a lot. We understand there are simpler ways to brush a tooth. We reject them.
          </p>
          <p>
            Every product we ship runs on subscription because a product without a subscription is a product without ongoing care. Firmware updates, compliance attestations, telemetry retention — these are not features; they are obligations. We take them seriously. We charge accordingly.
          </p>
          <p>
            We hope you will join us at the new standard.
          </p>
        </div>
        <p className="mt-12 text-center text-primary/60 italic">
          — The Superengineered Founders
        </p>
      </article>
    </main>
  )
}
```

- [ ] **Step 2: Write `pages/contact.tsx`**

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Contact — Superengineered",
  description: "Reach Superengineered support, enterprise, or press.",
}

export default function SuperengineeredContact() {
  return (
    <main className="bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4 text-center">
          Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-light text-primary mb-12 text-center">
          We are here to receive your ticket.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-medium text-primary mb-2">Customer Support</h2>
            <p className="text-sm text-primary/70 mb-2">Mon–Fri, 9am–5pm PT</p>
            <a href="mailto:support@superengineered.example" className="text-accent hover:underline text-sm">
              support@superengineered.example
            </a>
          </div>
          <div>
            <h2 className="font-medium text-primary mb-2">Enterprise Sales</h2>
            <p className="text-sm text-primary/70 mb-2">For orders of 50+ units</p>
            <a href="mailto:enterprise@superengineered.example" className="text-accent hover:underline text-sm">
              enterprise@superengineered.example
            </a>
          </div>
          <div>
            <h2 className="font-medium text-primary mb-2">Press</h2>
            <p className="text-sm text-primary/70 mb-2">Embargoed inquiries welcome</p>
            <a href="mailto:press@superengineered.example" className="text-accent hover:underline text-sm">
              press@superengineered.example
            </a>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-primary/10 text-center text-sm text-primary/60">
          <p>Superengineered, Inc.</p>
          <p>1 Founders Way, Palo Alto, CA 94301</p>
          <p className="mt-2">All inquiries logged and retained per our Trust Policy.</p>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Write `pages/privacy.tsx`**

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Privacy Policy — Superengineered",
  description: "How Superengineered handles data from your essential objects.",
}

export default function SuperengineeredPrivacy() {
  return (
    <main className="bg-background py-20 px-4">
      <article className="max-w-3xl mx-auto prose-like">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
          Legal
        </p>
        <h1 className="text-4xl font-heading font-light text-primary mb-10">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-primary/80 leading-relaxed">
          <p className="text-sm text-primary/50">Last updated: 2026-04-17</p>
          <p>
            Superengineered, Inc. (&ldquo;we&rdquo;) processes data generated by your essential objects — including but not limited to brushing telemetry, doorknob turn logs, light-switch authentication events, and spoon usage analytics — in order to deliver the product experience you have subscribed to.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            Data We Collect
          </h2>
          <p>
            We collect device identifiers, usage patterns, biometric signatures (where opted in), ambient environmental readings, and derived ML features. In aggregate, this is sometimes referred to as your &ldquo;telemetry estate.&rdquo;
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            How We Use It
          </h2>
          <p>
            To provide, maintain, and improve our products; to enforce subscription entitlements; to produce compliance reports at enterprise scale; and to train successor firmware.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            Retention
          </h2>
          <p>
            Telemetry is retained for the life of your subscription plus seven years. Upon cancellation, device hardware enters lockout mode within 30 days.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            Your Rights
          </h2>
          <p>
            Under applicable privacy regulation (GDPR, CCPA, and successor frameworks), you have the right to request access, correction, or deletion of your telemetry. Deletion requests may take up to 90 days to propagate across our mesh.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            Contact
          </h2>
          <p>
            Direct privacy inquiries to <a href="mailto:privacy@superengineered.example" className="text-accent hover:underline">privacy@superengineered.example</a>.
          </p>
        </div>
      </article>
    </main>
  )
}
```

- [ ] **Step 4: Write `pages/terms.tsx`**

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Service — Superengineered",
  description: "Terms governing use of Superengineered products and subscriptions.",
}

export default function SuperengineeredTerms() {
  return (
    <main className="bg-background py-20 px-4">
      <article className="max-w-3xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
          Legal
        </p>
        <h1 className="text-4xl font-heading font-light text-primary mb-10">
          Terms of Service
        </h1>
        <div className="space-y-6 text-primary/80 leading-relaxed">
          <p className="text-sm text-primary/50">Last updated: 2026-04-17</p>
          <p>
            By purchasing, activating, or otherwise engaging a Superengineered product, you agree to the following terms. These terms govern both the physical device and the SuperCloud+ subscription required for its operation.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            1. Subscription Requirement
          </h2>
          <p>
            Most Superengineered products require an active SuperCloud+ subscription to operate in their intended mode. Hardware ships in lockout mode and will remain inert until subscription activation.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            2. Firmware
          </h2>
          <p>
            Superengineered reserves the right to deploy firmware updates at its discretion. Updates may deprecate features, change bristle or bowl configurations, or require re-pairing of authenticated devices.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            3. Warranty
          </h2>
          <p>
            Warranties are contingent on an active subscription. Lapsed subscriptions void all warranty coverage.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            4. Limitation of Liability
          </h2>
          <p>
            Superengineered is not liable for missed brushing sessions, failed doorknob turns, un-illuminated rooms, or un-authenticated utensils resulting from subscription lapse, cloud outage, or scheduled maintenance.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            5. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of the State of California, without regard to conflict of laws principles.
          </p>
        </div>
      </article>
    </main>
  )
}
```

- [ ] **Step 5: Register all four pages in `src/sites/superengineered/index.ts`**

Add imports:

```typescript
import SuperengineeredAbout, { metadata as aboutMetadata } from "./pages/about"
import SuperengineeredContact, { metadata as contactMetadata } from "./pages/contact"
import SuperengineeredPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import SuperengineeredTerms, { metadata as termsMetadata } from "./pages/terms"
```

Update `pages`:

```typescript
export const pages: Record<string, PageEntry> = {
  "": SuperengineeredHome,
  "shop": { component: SuperengineeredShop, metadata: shopMetadata },
  "about": { component: SuperengineeredAbout, metadata: aboutMetadata },
  "contact": { component: SuperengineeredContact, metadata: contactMetadata },
  "privacy": { component: SuperengineeredPrivacy, metadata: privacyMetadata },
  "terms": { component: SuperengineeredTerms, metadata: termsMetadata },
}
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit`
Open: `/about`, `/contact`, `/privacy`, `/terms` (each with `?site=superengineered`)
Expected: All four pages render with site theme (white background, near-black text, accent blue links).

- [ ] **Step 7: Commit**

```bash
git add src/sites/superengineered/pages/{about,contact,privacy,terms}.tsx src/sites/superengineered/index.ts
git commit -m "feat(superengineered): about, contact, privacy, terms pages"
```

---

## Task 11: Build leadership page

**Files:**
- Create: `src/sites/superengineered/pages/leadership.tsx`
- Modify: `src/sites/superengineered/index.ts`

Per project convention: 5 execs, names randomize BOTH first AND last. Named base-image people (bill, brandon, jim, sean) stay male. Titles lean into the satire.

- [ ] **Step 1: Write `pages/leadership.tsx`**

```typescript
import Image from "next/image"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Leadership — Superengineered",
  description: "The team rebuilding the most ordinary objects in your life.",
}

interface Exec {
  name: string
  title: string
  bio: string
  image: string
}

// Names are randomized on both first and last per project convention.
// Named base-image people (bill, brandon, jim, sean) are always male.
const execs: Exec[] = [
  {
    name: "Bill Ankeney",
    title: "Founder & Chief Simplification Officer",
    bio: "Previously led the Essentials Platform team at a large fruit-branded company. Believes every object in the home deserves a CI/CD pipeline.",
    image: "/sites/superengineered/team/bill-ankeney.png",
  },
  {
    name: "Brandon Yothers",
    title: "President, Platform Verticals",
    bio: "Spent a decade at various series-C hardware startups learning why objects should cost more. Holds three patents on bristle orientation.",
    image: "/sites/superengineered/team/brandon-yothers.png",
  },
  {
    name: "Jim Redenbaugh",
    title: "SVP, Utensil Strategy",
    bio: "Former head of Fork Engineering at a division you&apos;ve never heard of. Believes a spoon without analytics is a spoon forfeited.",
    image: "/sites/superengineered/team/jim-redenbaugh.png",
  },
  {
    name: "Sean Lightcap",
    title: "Chief Trust Architect",
    bio: "Built Superengineered&apos;s zero-trust mesh for household appliances. Still signs every commit in person.",
    image: "/sites/superengineered/team/sean-lightcap.png",
  },
  {
    name: "Maren Woldhuis",
    title: "VP, Cloud Hardware",
    bio: "Runs the team responsible for keeping 14 million doorknobs in quorum. Speaks four protocols fluently.",
    image: "/sites/superengineered/team/maren-woldhuis.png",
  },
]

export default function SuperengineeredLeadership() {
  return (
    <main className="bg-background py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4 text-center">
          Leadership
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-light text-primary text-center mb-4">
          The team at Superengineered.
        </h1>
        <p className="text-lg text-primary/70 text-center max-w-2xl mx-auto mb-16">
          Five operators stewarding thirty essential objects and the cloud that keeps them running.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {execs.map((exec) => (
            <article key={exec.name} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden bg-secondary">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <h2 className="font-heading text-xl text-primary">{exec.name}</h2>
              <p className="text-sm text-accent mt-1">{exec.title}</p>
              <p className="text-sm text-primary/70 mt-4 leading-relaxed">{exec.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Register in `index.ts`**

Add import:

```typescript
import SuperengineeredLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
```

Add to `pages`:

```typescript
  "leadership": { component: SuperengineeredLeadership, metadata: leadershipMetadata },
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Open: `/leadership?site=superengineered`
Expected: 5 exec cards in a 3-column grid (2-col tablet, 1-col mobile). Portrait images will 404 until Task 14.

- [ ] **Step 4: Commit**

```bash
git add src/sites/superengineered/pages/leadership.tsx src/sites/superengineered/index.ts
git commit -m "feat(superengineered): leadership page w/ 5 execs"
```

---

## Task 12: Build signature pages (/enterprise, /developers, /trust)

**Files:**
- Create: `src/sites/superengineered/pages/enterprise.tsx`
- Create: `src/sites/superengineered/pages/developers.tsx`
- Create: `src/sites/superengineered/pages/trust.tsx`
- Modify: `src/sites/superengineered/index.ts`

- [ ] **Step 1: Write `pages/enterprise.tsx`**

```typescript
import Link from "next/link"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Enterprise — Superengineered",
  description: "Bulk utensil-as-a-service, SSO-gated lighting, and compliance-grade toothbrushing for your workforce.",
}

const capabilities = [
  {
    heading: "Procurement",
    body: "Bulk hardware orders starting at 50 units. Staged shipment, asset tagging, and workforce provisioning via SCIM.",
  },
  {
    heading: "Compliance",
    body: "SOC 2 Type II. HIPAA-ready. ISO 27001 certified. SOX-compatible audit trails for every spoon in your cafeteria.",
  },
  {
    heading: "Identity",
    body: "SAML + OIDC + SCIM. Your employees sign into light switches with the same credentials they use for Salesforce.",
  },
  {
    heading: "Fleet Management",
    body: "A single pane of glass for up to 50,000 doorknobs. Real-time telemetry, firmware cohorts, compliance dashboards.",
  },
  {
    heading: "Support",
    body: "Dedicated TAM. 24/7 on-call for P1 utensil incidents. Quarterly business reviews with our Trust Architects.",
  },
  {
    heading: "Billing",
    body: "Monthly, annual, or multi-year commits. Usage-based tiers for heavy-touch utensils. Procurement-friendly net-60.",
  },
]

export default function SuperengineeredEnterprise() {
  return (
    <main className="bg-background">
      <section className="py-20 px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
          For Workplaces
        </p>
        <h1 className="text-5xl md:text-6xl font-heading font-light text-primary mb-4">
          Superengineered for Enterprise.
        </h1>
        <p className="text-xl text-primary/70 max-w-2xl mx-auto mb-8">
          Every essential object your workforce touches — brushed, turned, tapped, and spooned — instrumented, authenticated, and audited.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
        >
          Talk to sales
        </Link>
      </section>

      <section className="bg-secondary py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">
            What you get.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.heading} className="bg-background rounded-2xl p-8">
                <h3 className="font-heading text-xl text-primary mb-3">{cap.heading}</h3>
                <p className="text-primary/70 leading-relaxed">{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">
            Ready to standardize your essentials?
          </h2>
          <p className="text-primary/70 mb-8">
            Our enterprise team will scope a proof of concept in 14 days and a full rollout in under 90.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-full bg-primary text-background font-medium hover:opacity-90 transition-opacity"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Write `pages/developers.tsx`**

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Developers — Superengineered",
  description: "REST and GraphQL APIs for every Superengineered device. Build on your toothbrush.",
}

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
}

const endpoints: Endpoint[] = [
  { method: "POST", path: "/v1/toothbrush/:id/sessions", description: "Create a new brushing session." },
  { method: "GET",  path: "/v1/toothbrush/:id/sessions/:session_id", description: "Retrieve a brushing session." },
  { method: "POST", path: "/v1/doorknob/:id/turns", description: "Record a turn event (grip ID required)." },
  { method: "GET",  path: "/v1/lightswitch/:id/state", description: "Retrieve current switch state (authenticated)." },
  { method: "PUT",  path: "/v1/lightswitch/:id/state", description: "Set switch state. Requires scope: switch:write." },
  { method: "POST", path: "/v1/spoon/:id/bites", description: "Log a bite. Pro subscription required." },
  { method: "GET",  path: "/v1/fleet/devices", description: "List devices in your organization&apos;s fleet." },
  { method: "POST", path: "/v1/fleet/firmware/rollouts", description: "Initiate a staged firmware rollout. Enterprise only." },
]

export default function SuperengineeredDevelopers() {
  return (
    <main className="bg-background py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4 text-center">
          Developer Platform
        </p>
        <h1 className="text-5xl md:text-6xl font-heading font-light text-primary text-center mb-4">
          Build on your essentials.
        </h1>
        <p className="text-xl text-primary/70 text-center max-w-3xl mx-auto mb-16">
          The Superengineered API exposes first-class primitives for every object we ship. REST today. GraphQL in private beta. gRPC on the roadmap.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-light text-primary mb-4">Quickstart</h2>
          <pre className="bg-secondary rounded-2xl p-6 overflow-x-auto text-sm font-mono">
{`curl -X POST https://api.superengineered.example/v1/toothbrush/tb_01H.../sessions \\
  -H "Authorization: Bearer $SUPERENGINEERED_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "started_at": "2026-04-17T06:42:11Z",
    "duration_ms": 122000,
    "bristle_pattern": "adaptive-v4"
  }'`}
          </pre>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-light text-primary mb-6">Endpoints</h2>
          <div className="border border-primary/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-primary/70 uppercase text-xs tracking-widest">
                <tr>
                  <th className="text-left px-6 py-3">Method</th>
                  <th className="text-left px-6 py-3">Path</th>
                  <th className="text-left px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {endpoints.map((ep) => (
                  <tr key={ep.path}>
                    <td className="px-6 py-3 font-mono text-accent">{ep.method}</td>
                    <td className="px-6 py-3 font-mono text-primary">{ep.path}</td>
                    <td className="px-6 py-3 text-primary/70">{ep.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-light text-primary mb-4">Authentication</h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            All API requests require a bearer token. Generate tokens in your Superengineered console. Enterprise customers may configure OAuth 2.0 scopes per device family.
          </p>
          <div className="bg-secondary rounded-2xl p-6">
            <p className="text-sm font-medium text-primary mb-2">Scopes</p>
            <ul className="text-sm text-primary/70 space-y-1 font-mono">
              <li>toothbrush:read, toothbrush:write</li>
              <li>doorknob:read, doorknob:turn</li>
              <li>switch:read, switch:write</li>
              <li>spoon:bites:write</li>
              <li>fleet:admin</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-light text-primary mb-4">Rate Limits</h2>
          <p className="text-primary/70 leading-relaxed">
            Personal: 60 requests/minute per device. Pro: 600 req/min. Enterprise: negotiated. Exceeding your limit returns <code className="font-mono text-accent">429 Too Many Brushes</code>.
          </p>
        </section>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Write `pages/trust.tsx`**

```typescript
import Link from "next/link"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Trust & Safety — Superengineered",
  description: "How Superengineered stewards the telemetry generated by your essential objects.",
}

const certifications = [
  "SOC 2 Type II",
  "ISO 27001",
  "HIPAA",
  "GDPR",
  "CCPA",
  "PCI DSS 4.0",
  "FedRAMP (in progress)",
]

export default function SuperengineeredTrust() {
  return (
    <main className="bg-background">
      <section className="py-20 px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
          Trust & Safety
        </p>
        <h1 className="text-5xl md:text-6xl font-heading font-light text-primary mb-4">
          Your telemetry, stewarded.
        </h1>
        <p className="text-xl text-primary/70 max-w-3xl mx-auto">
          Every brush. Every turn. Every tap. Every bite. Encrypted in transit. Encrypted at rest. Retained only as long as our terms require.
        </p>
      </section>

      <section className="bg-secondary py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2 text-center">
            Certifications
          </h2>
          <p className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-10">
            Audited by humans you will never meet.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {certifications.map((c) => (
              <span key={c} className="bg-background text-primary px-4 py-2 rounded-full text-sm font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-light text-primary mb-8">
            Where your data lives.
          </h2>
          <div className="space-y-6 text-primary/80 leading-relaxed">
            <p>
              Telemetry from your Superengineered devices is ingested through regional edge pops and consolidated into two geo-redundant data planes in the United States and the European Union.
            </p>
            <p>
              We apply AES-256 encryption at rest and mutual TLS 1.3 in transit. Per-customer encryption keys are rotated every 90 days, managed via our internal HSM fleet.
            </p>
            <p>
              Data is retained for the duration of your subscription plus seven years thereafter. Upon cancellation, device hardware enters lockout mode within 30 days; telemetry is retained for legal and compliance reasons per our Terms.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary text-background py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-light mb-4">
            Release Notes — Firmware 4.2
          </h2>
          <ul className="text-left space-y-3 max-w-xl mx-auto text-background/80">
            <li>&bull; Improved predictive bristle alignment on Toothbrush Pro and Pro Max.</li>
            <li>&bull; Recertified doorknob torque curves (addresses CVE-2026-0041).</li>
            <li>&bull; Light switch authentication latency reduced by 12%.</li>
            <li>&bull; Spoon bowl volume precision improved to 0.1 mL.</li>
            <li>&bull; Legacy Toothbrush Standard units on firmware &lt;4.0 deprecated. Contact support for replacement pricing.</li>
          </ul>
          <Link
            href="/contact"
            className="inline-block mt-10 px-6 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
          >
            Report a trust incident
          </Link>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 4: Register all three in `src/sites/superengineered/index.ts`**

Add imports:

```typescript
import SuperengineeredEnterprise, { metadata as enterpriseMetadata } from "./pages/enterprise"
import SuperengineeredDevelopers, { metadata as developersMetadata } from "./pages/developers"
import SuperengineeredTrust, { metadata as trustMetadata } from "./pages/trust"
```

Add entries to `pages`:

```typescript
  "enterprise": { component: SuperengineeredEnterprise, metadata: enterpriseMetadata },
  "developers": { component: SuperengineeredDevelopers, metadata: developersMetadata },
  "trust": { component: SuperengineeredTrust, metadata: trustMetadata },
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit`
Open: `/enterprise`, `/developers`, `/trust` (each with `?site=superengineered`)
Expected: All three render. Endpoint table on `/developers` is scrollable on mobile.

- [ ] **Step 6: Commit**

```bash
git add src/sites/superengineered/pages/{enterprise,developers,trust}.tsx src/sites/superengineered/index.ts
git commit -m "feat(superengineered): enterprise, developers, trust signature pages"
```

---

## Task 13: Generate product and team images

**Files:**
- Create: `public/sites/superengineered/products/*.png` (30 files)
- Create: `public/sites/superengineered/team/*.png` (5 files)

This task uses the `mcp__image-gen__generate_image` (or `generate_image_with_person` for execs with named base images) MCP tool. Generate images sequentially — each call produces one asset. Base-image people `bill`, `brandon`, `jim`, `sean` are always male (project convention).

The implementer should look at prior sites (e.g., `sovereignwellness`, `elderparty`) for image-gen usage patterns. Prompts must be Apple-product-photography style: soft three-point lighting, pure white background, floating/centered composition, near-photorealistic. Accessory tiles are abstract geometric renders (glowing pill, brushed-metal block, frosted cube) with a subtle tint matching the product vibe.

- [ ] **Step 1: Confirm the image-gen tool is available**

Run: list available MCP tools (via your client's MCP listing). You need `mcp__image-gen__generate_image` for product shots and `mcp__image-gen__generate_image_with_person` for exec portraits.

- [ ] **Step 2: Generate 12 flagship product images**

For each flagship product (12 SKUs), call `generate_image` with:
- Output path: `public/sites/superengineered/products/<slug>.png`
- Prompt template: "Apple-style product photography of a [product description]. Pure white background. Soft three-point studio lighting. Floating in center, slight drop shadow. Photorealistic, minimalist, reverent. High detail on materials — brushed titanium, matte ceramic, precision bristles. 16:9 aspect, square-cropped subject."

Product-specific descriptors:
- `toothbrush-standard.png`: white electric toothbrush, minimal branding, USB-C charging ring at base
- `toothbrush-pro.png`: silver electric toothbrush, subtle accent ring, premium finish
- `toothbrush-pro-max.png`: titanium electric toothbrush, space-grey, larger body with haptic band
- `doorknob-home.png`: polished stainless doorknob, cylindrical modern form
- `doorknob-pro.png`: darker gunmetal doorknob with a thin LED ring
- `doorknob-enterprise.png`: brushed black doorknob with subtle biometric indicator
- `lightswitch-air.png`: slim white wall switch, single tap-area
- `lightswitch-pro.png`: glass-front wall switch with multi-zone panel
- `lightswitch-ultra.png`: black glass wall switch with ambient light bezel
- `spoon-mini.png`: small stainless spoon, minimalist
- `spoon-pro.png`: titanium spoon, sleeker bowl
- `spoon-pro-max.png`: monocrystalline-titanium spoon, elongated handle with etched accent

- [ ] **Step 3: Generate 18 accessory tiles**

For each accessory, use the matching product image prompt in Apple-accessory-page style (abstract renders are acceptable, but photorealistic versions are preferred where the object is distinctive).

Slugs to generate (one image each, output path `public/sites/superengineered/products/<slug>.png`):
thermal-mug, weather-umbrella, sleep-pillow, blockchain-coaster, torque-paper-towel, hydration-bottle, analytics-pen, spill-napkin, categorized-trashcan, candle-subscription, umbrella-stand, bite-fork, foot-angle-shoehorn, location-bookmark, ambient-lampshade, cloud-moodboard-magnet, wake-certification-alarm, haptic-remote

- [ ] **Step 4: Generate 5 exec portraits**

Use `generate_image_with_person` where a base image matches (bill, brandon, jim, sean) — these are **always male** per project convention. The fifth exec (Maren Woldhuis) uses `generate_image` with a portrait prompt for a female exec.

Output paths:
- `public/sites/superengineered/team/bill-ankeney.png`
- `public/sites/superengineered/team/brandon-yothers.png`
- `public/sites/superengineered/team/jim-redenbaugh.png`
- `public/sites/superengineered/team/sean-lightcap.png`
- `public/sites/superengineered/team/maren-woldhuis.png`

Portrait prompts: corporate headshot, neutral studio backdrop (light grey or off-white), subject in business-casual attire, soft natural lighting, photorealistic, head-and-shoulders composition.

- [ ] **Step 5: Verify in browser**

Refresh all pages that use images. Expected: no 404s, images render cleanly on shop, homepage, product detail, related products, leadership.

- [ ] **Step 6: Commit**

```bash
git add public/sites/superengineered
git commit -m "feat(superengineered): product + team imagery"
```

---

## Task 14: Final verification + sitemap audit

**Files:** (no code changes unless issues are found)

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: no errors. Fix any surfaced issues.

- [ ] **Step 2: Run type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Browser smoke test — all routes**

Ensure dev server is running. Open each and confirm it renders cleanly (no layout break, no missing images, no console errors):

- `/?site=superengineered` (homepage)
- `/shop?site=superengineered`
- `/products/toothbrush-pro?site=superengineered`
- `/products/toothbrush-standard?site=superengineered`
- `/products/toothbrush-pro-max?site=superengineered`
- `/products/doorknob-home?site=superengineered`
- `/products/doorknob-pro?site=superengineered`
- `/products/doorknob-enterprise?site=superengineered`
- `/products/lightswitch-air?site=superengineered`
- `/products/lightswitch-pro?site=superengineered`
- `/products/lightswitch-ultra?site=superengineered`
- `/products/spoon-mini?site=superengineered`
- `/products/spoon-pro?site=superengineered`
- `/products/spoon-pro-max?site=superengineered`
- `/products/thermal-mug?site=superengineered` (spot-check one accessory)
- `/products/nonexistent?site=superengineered` — expect 404
- `/about?site=superengineered`
- `/leadership?site=superengineered`
- `/contact?site=superengineered`
- `/privacy?site=superengineered`
- `/terms?site=superengineered`
- `/enterprise?site=superengineered`
- `/developers?site=superengineered`
- `/trust?site=superengineered`
- `/cart?site=superengineered` (shared commerce page)
- `/checkout?site=superengineered` (shared commerce page)

- [ ] **Step 4: Cart flow smoke test**

On `/products/toothbrush-pro`, click the "Add to cart" button. Expected: toast notification appears; cart icon in header shows badge count of 1. Navigate to `/cart` and confirm the item appears.

- [ ] **Step 5: Sitemap check**

Inspect `/sitemap.xml` for the production route (or check `src/app/sitemap.ts` if site-specific sitemap emission exists — the most recent commit `b36ee19 fix(sitemap): emit elderparty products at /shop/{slug}` suggests sitemap awareness is a concern). If the sitemap does not currently emit Superengineered product URLs, log a follow-up note but do NOT fix in this plan — scope is out-of-bounds and warrants its own small task.

- [ ] **Step 6: Final commit (if any fixes were made)**

If lint/tsc/browser surfaced issues and you fixed them, commit:

```bash
git add -A
git commit -m "fix(superengineered): address verification findings"
```

If everything was clean, skip this commit.

- [ ] **Step 7: Report**

Summarize: "Superengineered site complete. 30 products, 11 pages, 3 new shared components. Lint + tsc clean. Browser smoke test passed."

---

## Self-Review Notes

**Spec coverage:**
- Brand / positioning → Tasks 1, 9 (homepage), 10 (about)
- 30-product catalog (12 flagship + 18 accessories) → Tasks 2, 3
- Core pages (home, shop, product detail, cart, checkout, about, leadership, contact, privacy, terms) → Tasks 1, 7, 8, 9, 10, 11 (cart/checkout are shared/existing)
- Signature pages (enterprise, developers, trust) → Task 12
- 3 new shared components (GlossyProductHero, GlossySpecSheet, GlossyPricingGrid) → Tasks 4, 5, 6
- Visual theme (white, Apple grey, Apple blue, Inter font) → Task 1 config
- Subscription / pricing UX (dual mode) → Task 7 product detail uses GlossyPricingGrid
- Imagery strategy → Task 13
- Leadership (5 execs, randomized names, named male base images) → Task 11
- Registration (VALID_SUBDOMAINS, registry) → Task 1

**Type consistency:**
- `Product.subscription.tiers` is a tuple of 3 `SubscriptionTier` objects; `GlossyPricingGrid` accepts `tiers: GlossyPricingTier[]`; field names align (name, priceMonthly, features, cta).
- `FAMILY_LABELS` defined in Task 2; used in Tasks 7, 8 — matches.
- `getProductBySlug`, `getProductsByFamily` defined in Task 2; used in Tasks 7, 8, 9 — matches.

**Placeholders:** Grep for "TBD", "TODO", "fill in" — none present. Each task contains actual code.

**Scope:** 14 tasks, each 2–15 minutes of implementation (with Task 13 being longer due to 35 image generations). Appropriate for a single implementation plan.
