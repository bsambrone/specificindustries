# Squared Away Supply Co. Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `squaredaway.specificindustries.com` — a satirical military PX with 32 products across Army/Navy/Air Force/Marines, 12 site-specific pages (including a Morale Program loyalty page, fake authorization gate, FAQ, privacy/terms with umbrella + satire body, and standard leadership/contact), 32 product detail pages via dynamicRoutes, and a full image set.

**Architecture:** Follows the established multi-subdomain pattern (middleware → catch-all → `siteRegistry`). Olive-drab / manila-cream theme with stencil display font. Per-product data shape mirrors existing sites (rocks/pigmilk) with military-specific fields (NSN, contract code, MIL-STD tag, specs, warnings, cross-branch jab, fake reviews). Commerce enabled (`CartProvider`, localStorage key `squaredaway-cart`).

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, `next/font/google` for `Black Ops One`, `mcp__image-gen__*` for image generation.

**Spec:** `docs/superpowers/specs/2026-04-15-squaredaway-design.md` — read before starting. The 32 products (slugs, NSNs, MIL-STDs, prices, taglines, joke angles, cross-branch targets) are defined there.

**Voice voltage reference (apply to all product copy):**

> **NSN 8465-69-420-MRE** · **The Grunt's Embrace™ Tactical Pillow** · *Army • $84.99*
>
> Finally, a pillow that respects your profession. Constructed from reinforced MOLLE webbing, filled with genuine poured concrete*, and available in the same Universal Camouflage Pattern that didn't work in Iraq. Weight: 11.2 lbs. Ready to ruck.
>
> The Air Force already has memory foam with a thread count. You have this.
>
> *Concrete sourced from a demolished NCO club at Fort Hood. Not morale-compliant.*
>
> **Authorized for Land Component Personnel Only.** Not cleared for use by Chair Force.

**Verification convention for this codebase:** This repo has no unit tests for site content. The verification loop per task is: `npx tsc --noEmit` (typecheck) and for pages also `npm run build` periodically + manual dev smoke via `npm run dev` then visit `http://localhost:3000/?site=squaredaway/<path>`. Commits happen at the end of each task.

---

## Task 1: Theme font wiring — add Black Ops One

**Files:**
- Modify: `src/themes/fonts.ts`

- [ ] **Step 1: Read the current fonts file** to confirm layout

Run: view `src/themes/fonts.ts` (already structured above).

- [ ] **Step 2: Add the Black Ops One import and declaration**

Edit `src/themes/fonts.ts`:

Change the import line at top from:
```typescript
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed, Fraunces, Nunito, Bowlby_One_SC, Zilla_Slab, IBM_Plex_Mono } from "next/font/google"
```
to:
```typescript
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed, Fraunces, Nunito, Bowlby_One_SC, Zilla_Slab, IBM_Plex_Mono, Black_Ops_One } from "next/font/google"
```

Add after the `ibmPlexMono` declaration:
```typescript
export const blackOpsOne = Black_Ops_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-black-ops-one",
})
```

Add to `fontInstanceMap` (inside the object):
```typescript
"black-ops-one": blackOpsOne,
```

Add to `fontFamilyMap`:
```typescript
"black-ops-one": "'Black Ops One', cursive",
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/themes/fonts.ts
git commit -m "feat(themes): add Black Ops One font for squaredaway"
```

---

## Task 2: Subdomain registration + site config scaffold

**Files:**
- Create: `src/sites/squaredaway/config.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create the SiteConfig**

Create `src/sites/squaredaway/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Squared Away Supply Co.",
  subdomain: "squaredaway",
  theme: {
    preset: "military",
    colors: {
      primary: "#4B5320",      // olive drab
      secondary: "#BDB76B",    // subdued khaki
      accent: "#FF6B1A",       // safety orange CTA
      background: "#F5EFE0",   // manila cream
      text: "#1F1F1F",         // near-black
    },
    fonts: {
      heading: "black-ops-one",
      body: "inter",
    },
  },
  metadata: {
    title: "Squared Away Supply Co. — The Official Unofficial Post Exchange",
    description:
      "Authorized gear for all four service branches. Morale is a metric. We sell it by the pound.",
    ogImage: "/sites/squaredaway/hero.png",
  },
  nav: [
    { label: "ARMY", path: "/army" },
    { label: "NAVY", path: "/navy" },
    { label: "AIR FORCE", path: "/airforce" },
    { label: "MARINES", path: "/marines" },
    { label: "MORALE", path: "/morale" },
    { label: "FAQ", path: "/faq" },
    { label: "LEADERSHIP", path: "/leadership" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Add subdomain to allowlist**

Edit `src/sites/subdomains.ts` — add `"squaredaway"` to the `VALID_SUBDOMAINS` array (e.g., after `"rocks"`).

Final state of the array:
```typescript
export const VALID_SUBDOMAINS = [
  "apex",
  "pigmilk",
  "dehydratedwater",
  "inflatableanchors",
  "strategicvoid",
  "stratify",
  "truegrit",
  "grassfedwifi",
  "elderparty",
  "cleansheet",
  "snortables",
  "mousetrapjenga",
  "onlyfans",
  "onlypans",
  "bonelesswater",
  "gristmill",
  "oddoccasions",
  "pettential",
  "rocks",
  "squaredaway",
] as const
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/sites/squaredaway/config.ts src/sites/subdomains.ts
git commit -m "feat(squaredaway): add subdomain config and allowlist entry"
```

---

## Task 3: Product data model + 32 product stubs

**Files:**
- Create: `src/sites/squaredaway/data/products.ts`

Creates the Product type and all 32 products with identity fields only (slug, branch, nsn, contractCode, milStd, name, price, priceLabel, tagline, image). Body copy, specs, warnings, reviews, and cross-branch jabs get added in later tasks — this one establishes the catalog structure.

- [ ] **Step 1: Create the products file with type + empty-bodied catalog**

Create `src/sites/squaredaway/data/products.ts`:

```typescript
export type Branch = "army" | "navy" | "airforce" | "marines"

export interface Spec {
  label: string
  value: string
}

export interface Review {
  rank: string
  name: string
  stars: number
  body: string
}

export interface Product {
  slug: string
  branch: Branch
  nsn: string
  contractCode: string
  milStd: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  image: string
  shortDescription: string
  longDescription: string[]
  specs: Spec[]
  warnings: string[]
  crossBranchJab: string
  reviews: Review[]
  featured?: boolean
}

export const products: Product[] = [
  // ===== ARMY =====
  {
    slug: "grunts-embrace",
    branch: "army",
    nsn: "8465-69-420-MRE",
    contractCode: "W91CRB-24-C-0069",
    milStd: "MIL-STD-SUCK",
    name: "The Grunt's Embrace™ Tactical Pillow",
    price: 84.99,
    priceLabel: "$84.99",
    tagline: "Concrete-filled MOLLE. Ready to ruck.",
    image: "/sites/squaredaway/product-grunts-embrace.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
    featured: true,
  },
  {
    slug: "mre-pairing-flight-fort-polk",
    branch: "army",
    nsn: "8970-ARM-MRE-04",
    contractCode: "W91CRB-24-C-0201",
    milStd: "MIL-STD-SLOP",
    name: "MRE Pairing Flight: The Fort Polk Collection",
    price: 119.99,
    priceLabel: "$119.99",
    tagline: "Four MREs paired with regret.",
    image: "/sites/squaredaway/product-mre-pairing-flight-fort-polk.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "ucp-invisibility-cloak",
    branch: "army",
    nsn: "8415-UCP-FAIL",
    contractCode: "W91CRB-08-C-0005",
    milStd: "MIL-STD-WHY",
    name: "UCP Classic™ Commemorative Invisibility Cloak",
    price: 249.99,
    priceLabel: "$249.99",
    tagline: "The camouflage that camouflaged nothing.",
    image: "/sites/squaredaway/product-ucp-invisibility-cloak.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "sergeant-major-mustache-kit",
    branch: "army",
    nsn: "6515-SMJ-STACHE",
    contractCode: "W91CRB-24-C-0333",
    milStd: "MIL-STD-HOOAH",
    name: "Regulation Sergeant Major Mustache Kit",
    price: 64.99,
    priceLabel: "$64.99",
    tagline: "Wax, comb, and one framed citation.",
    image: "/sites/squaredaway/product-sergeant-major-mustache-kit.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "artisanal-field-mud",
    branch: "army",
    nsn: "8305-MUD-POLK",
    contractCode: "W91CRB-24-C-0818",
    milStd: "MIL-STD-WET",
    name: "Artisanal Field Mud™ (1 gal.)",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "Sourced from Fort Polk. Certified miserable.",
    image: "/sites/squaredaway/product-artisanal-field-mud.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "hooah-bar",
    branch: "army",
    nsn: "8940-HOOAH-01",
    contractCode: "W91CRB-24-C-0101",
    milStd: "MIL-STD-CHOMP",
    name: "The Hooah Bar™",
    price: 89.0,
    priceLabel: "$89.00",
    tagline: "Tastes like motivation and abandonment.",
    image: "/sites/squaredaway/product-hooah-bar.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "rucking-enrichment-stones",
    branch: "army",
    nsn: "5530-RUCK-BRK",
    contractCode: "W91CRB-24-C-0606",
    milStd: "MIL-STD-HEAVY",
    name: "Rucking Enrichment Stones™ (set of 6)",
    price: 149.99,
    priceLabel: "$149.99",
    tagline: "Decorative bricks for emotional weight.",
    image: "/sites/squaredaway/product-rucking-enrichment-stones.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "powerpoint-of-the-month-club",
    branch: "army",
    nsn: "7690-PPT-SUB",
    contractCode: "W91CRB-24-C-0400",
    milStd: "MIL-STD-SLIDE",
    name: "PowerPoint of the Month Club™",
    price: 29.99,
    priceLabel: "$29.99 / month",
    tagline: "400+ safety slides, delivered monthly.",
    image: "/sites/squaredaway/product-powerpoint-of-the-month-club.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },

  // ===== NAVY =====
  {
    slug: "chiefs-coffee-dark-deployment",
    branch: "navy",
    nsn: "8955-NAV-JOE-01",
    contractCode: "N00019-24-C-0074",
    milStd: "MIL-STD-BREW",
    name: "Chief's Coffee™ Dark Deployment Roast",
    price: 45.0,
    priceLabel: "$45.00",
    tagline: "Ground on the flight deck by a chief named Dave.",
    image: "/sites/squaredaway/product-chiefs-coffee-dark-deployment.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "goat-locker-soap",
    branch: "navy",
    nsn: "8520-CPO-GOAT",
    contractCode: "N00019-24-C-0109",
    milStd: "MIL-STD-ANCHOR",
    name: "Goat Locker™ Membership Soap",
    price: 24.99,
    priceLabel: "$24.99",
    tagline: "For Chiefs. And Chief-adjacent civilians.",
    image: "/sites/squaredaway/product-goat-locker-soap.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "deployment-beard-oil",
    branch: "navy",
    nsn: "8520-NAV-BEARD",
    contractCode: "N00019-24-C-0215",
    milStd: "MIL-STD-FUZZ",
    name: "The 7-Month Deployment™ Beard Oil",
    price: 52.0,
    priceLabel: "$52.00",
    tagline: "For beards the Navy technically allows.",
    image: "/sites/squaredaway/product-deployment-beard-oil.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "dixie-cup-storage-system",
    branch: "navy",
    nsn: "8405-DIX-STOR",
    contractCode: "N00019-24-C-0333",
    milStd: "MIL-STD-WHITE",
    name: "Dixie Cup Hat Storage System",
    price: 129.99,
    priceLabel: "$129.99",
    tagline: "An elaborate contraption for one white hat.",
    image: "/sites/squaredaway/product-dixie-cup-storage-system.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "shellback-coaster-set",
    branch: "navy",
    nsn: "7690-SHELL-4PK",
    contractCode: "N00019-24-C-0447",
    milStd: "MIL-STD-EQU",
    name: "Shellback Certification Coaster Set",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "I crossed the equator once and won't shut up.",
    image: "/sites/squaredaway/product-shellback-coaster-set.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "sub-school-pillowcase",
    branch: "navy",
    nsn: "7210-SUB-DARK",
    contractCode: "N00019-24-C-0555",
    milStd: "MIL-STD-SILENT",
    name: "Sub School Pillowcase — Blackout Edition",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "For sailors who haven't seen the sun in 90 days.",
    image: "/sites/squaredaway/product-sub-school-pillowcase.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "liberty-call-regret-planner",
    branch: "navy",
    nsn: "7530-LIB-REG",
    contractCode: "N00019-24-C-0666",
    milStd: "MIL-STD-OOPS",
    name: "Liberty Call Regret Planner™",
    price: 22.0,
    priceLabel: "$22.00",
    tagline: "7 days. 7 entries. All say Regret.",
    image: "/sites/squaredaway/product-liberty-call-regret-planner.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "haze-gray-touchup-kit",
    branch: "navy",
    nsn: "8010-GRAY-HAZ",
    contractCode: "N00019-24-C-0777",
    milStd: "MIL-STD-GRAY",
    name: "Haze Gray Paint Touch-Up Kit",
    price: 19.99,
    priceLabel: "$19.99",
    tagline: "For your car, house, and will to live.",
    image: "/sites/squaredaway/product-haze-gray-touchup-kit.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },

  // ===== AIR FORCE =====
  {
    slug: "premium-deployment-concierge-kit",
    branch: "airforce",
    nsn: "AF-LUX-8445-DEP",
    contractCode: "FA8620-24-C-0089",
    milStd: "MIL-STD-COMFY",
    name: "Premium Deployment Concierge Kit™",
    price: 299.99,
    priceLabel: "$299.99",
    tagline: "Neck pillow, eye mask, Panera loyalty card.",
    image: "/sites/squaredaway/product-premium-deployment-concierge-kit.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
    featured: true,
  },
  {
    slug: "chair-force-ergonomic-chair",
    branch: "airforce",
    nsn: "AF-CHR-7110-ERG",
    contractCode: "FA8620-24-C-0172",
    milStd: "MIL-STD-SITDOWN",
    name: "Chair Force™ Ergonomic Deployment Chair",
    price: 4899.0,
    priceLabel: "$4,899.00",
    tagline: "Built for 8-hour deployments between briefings.",
    image: "/sites/squaredaway/product-chair-force-ergonomic-chair.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "qatar-package",
    branch: "airforce",
    nsn: "AF-QAT-8990-PKG",
    contractCode: "FA8620-24-C-0221",
    milStd: "MIL-STD-STARBUCKS",
    name: "The Qatar Package™",
    price: 449.99,
    priceLabel: "$449.99",
    tagline: "Starbucks gift card, hotel toiletries, complimentary robe.",
    image: "/sites/squaredaway/product-qatar-package.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "base-housing-carpet-sampler",
    branch: "airforce",
    nsn: "AF-HSG-7220-CRP",
    contractCode: "FA8620-24-C-0305",
    milStd: "MIL-STD-BEIGE",
    name: "Base Housing Carpet Sampler™",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "Seventeen tasteful beiges.",
    image: "/sites/squaredaway/product-base-housing-carpet-sampler.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "flight-suit-cashmere-loungewear",
    branch: "airforce",
    nsn: "AF-FLT-8415-CSH",
    contractCode: "FA8620-24-C-0411",
    milStd: "MIL-STD-DRIP",
    name: "Flight Suit™ Cashmere Loungewear",
    price: 499.0,
    priceLabel: "$499.00",
    tagline: "Sage green. Hand-wash only.",
    image: "/sites/squaredaway/product-flight-suit-cashmere-loungewear.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "pt-test-completion-medal",
    branch: "airforce",
    nsn: "AF-PT-7720-MDL",
    contractCode: "FA8620-24-C-0502",
    milStd: "MIL-STD-STROLL",
    name: "PT Test Completion Medal™",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "For scoring 75% on an 800m walk/jog.",
    image: "/sites/squaredaway/product-pt-test-completion-medal.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "premium-mre-af-variant",
    branch: "airforce",
    nsn: "AF-MRE-8970-LUX",
    contractCode: "FA8620-24-C-0614",
    milStd: "MIL-STD-CHIVE",
    name: "Premium MRE™ (AF Variant)",
    price: 69.99,
    priceLabel: "$69.99",
    tagline: "Served in ceramic with a $12 craft seltzer.",
    image: "/sites/squaredaway/product-premium-mre-af-variant.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "on-base-golf-course-keychain",
    branch: "airforce",
    nsn: "AF-GLF-7690-KEY",
    contractCode: "FA8620-24-C-0718",
    milStd: "MIL-STD-BIRDIE",
    name: "On-Base Golf Course Keychain",
    price: 24.99,
    priceLabel: "$24.99",
    tagline: "Access to all 17 courses on base.",
    image: "/sites/squaredaway/product-on-base-golf-course-keychain.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },

  // ===== MARINES =====
  {
    slug: "culinary-coloring-sticks",
    branch: "marines",
    nsn: "USMC-CRY-8940-12PK",
    contractCode: "M67854-24-C-0001",
    milStd: "MIL-STD-OORAH",
    name: "Premium Culinary Coloring Sticks™",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "12 edible crayons. Flavors: Sharpie, Diesel, Unflavored.",
    image: "/sites/squaredaway/product-culinary-coloring-sticks.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
    featured: true,
  },
  {
    slug: "jarhead-precision-haircut-kit",
    branch: "marines",
    nsn: "USMC-HI-8520-TIGHT",
    contractCode: "M67854-24-C-0108",
    milStd: "MIL-STD-SCALP",
    name: "The Jarhead™ Precision Haircut Kit",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "One setting. It's shorter.",
    image: "/sites/squaredaway/product-jarhead-precision-haircut-kit.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "oorah-vocal-training-course",
    branch: "marines",
    nsn: "USMC-VOC-7610-AUD",
    contractCode: "M67854-24-C-0224",
    milStd: "MIL-STD-SCREAM",
    name: "Oorah™ Vocal Training Audio Course",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "40 hours. One syllable.",
    image: "/sites/squaredaway/product-oorah-vocal-training-course.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "regulation-crying-towel",
    branch: "marines",
    nsn: "USMC-WPE-7210-TWL",
    contractCode: "M67854-24-C-0305",
    milStd: "MIL-STD-DAMP",
    name: "Regulation Crying Towel",
    price: 14.99,
    priceLabel: "$14.99",
    tagline: "For when you remember you're still in.",
    image: "/sites/squaredaway/product-regulation-crying-towel.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "semper-fi-diy-tattoo-kit",
    branch: "marines",
    nsn: "USMC-INK-6515-DIY",
    contractCode: "M67854-24-C-0419",
    milStd: "MIL-STD-INK",
    name: "Semper Fi™ DIY Tattoo Kit",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "Finally, a tattoo that says what you already screamed.",
    image: "/sites/squaredaway/product-semper-fi-diy-tattoo-kit.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "sand-rations",
    branch: "marines",
    nsn: "USMC-SND-8970-5LB",
    contractCode: "M67854-24-C-0527",
    milStd: "MIL-STD-GRIT",
    name: "Sand Rations™ (5 lb bag)",
    price: 29.99,
    priceLabel: "$29.99",
    tagline: "For when the crayons run out.",
    image: "/sites/squaredaway/product-sand-rations.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "chestys-bulldog-morale-companion",
    branch: "marines",
    nsn: "USMC-MCT-7710-BULL",
    contractCode: "M67854-24-C-0631",
    milStd: "MIL-STD-WOOF",
    name: "Chesty's™ Bulldog Morale Companion",
    price: 44.99,
    priceLabel: "$44.99",
    tagline: "Shake to hear OORAH. Batteries included.",
    image: "/sites/squaredaway/product-chestys-bulldog-morale-companion.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "marpat-throw-pillow-set",
    branch: "marines",
    nsn: "USMC-UPH-8340-4PK",
    contractCode: "M67854-24-C-0742",
    milStd: "MIL-STD-PIX",
    name: "MARPAT™ Throw Pillow Set (set of 4)",
    price: 119.99,
    priceLabel: "$119.99",
    tagline: "Matches your 4 pairs of MARPAT pants.",
    image: "/sites/squaredaway/product-marpat-throw-pillow-set.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByBranch(branch: Branch): Product[] {
  return products.filter((p) => p.branch === branch)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/squaredaway/data/products.ts
git commit -m "feat(squaredaway): scaffold 32-product catalog with identity fields"
```

---

## Task 4: Shared UI components — SpecsTable, WarningBox, NsnHeader

**Files:**
- Create: `src/components/ui/SpecsTable.tsx`
- Create: `src/components/ui/WarningBox.tsx`
- Create: `src/components/ui/NsnHeader.tsx`

These are generic label/value/warning primitives reusable across product pages.

- [ ] **Step 1: Create SpecsTable**

Create `src/components/ui/SpecsTable.tsx`:

```typescript
interface SpecRow {
  label: string
  value: string
}

export function SpecsTable({ rows, heading }: { rows: SpecRow[]; heading?: string }) {
  return (
    <div className="border-2 border-primary/60 bg-background/50">
      {heading && (
        <div className="border-b-2 border-primary/60 bg-primary text-background px-4 py-2 font-heading uppercase tracking-widest text-sm">
          {heading}
        </div>
      )}
      <table className="w-full font-mono text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-background/0" : "bg-primary/5"}>
              <td className="px-4 py-2 font-semibold uppercase tracking-wider text-primary/80 border-r border-primary/20 w-1/3">
                {row.label}
              </td>
              <td className="px-4 py-2 text-foreground">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 2: Create WarningBox**

Create `src/components/ui/WarningBox.tsx`:

```typescript
export function WarningBox({
  warnings,
  heading = "WARNINGS",
}: {
  warnings: string[]
  heading?: string
}) {
  return (
    <div className="border-2 border-accent bg-accent/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-6 h-6 rounded-full bg-accent text-background font-heading text-center leading-6">
          !
        </span>
        <span className="font-heading uppercase tracking-widest text-accent">{heading}</span>
      </div>
      <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
        {warnings.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 3: Create NsnHeader**

Create `src/components/ui/NsnHeader.tsx`:

```typescript
interface NsnHeaderProps {
  nsn: string
  contractCode: string
  milStd: string
}

export function NsnHeader({ nsn, contractCode, milStd }: NsnHeaderProps) {
  return (
    <div className="font-mono text-xs uppercase tracking-widest text-primary/70 flex flex-wrap gap-x-6 gap-y-1 border-b border-primary/30 pb-2 mb-4">
      <span>NSN {nsn}</span>
      <span>CONTRACT #{contractCode}</span>
      <span>{milStd}</span>
    </div>
  )
}
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/SpecsTable.tsx src/components/ui/WarningBox.tsx src/components/ui/NsnHeader.tsx
git commit -m "feat(ui): add SpecsTable, WarningBox, NsnHeader primitives"
```

---

## Task 5: Fill Army product copy (8 products)

**Files:**
- Modify: `src/sites/squaredaway/data/products.ts` (army entries 1–8)

For each Army product, fill in: `shortDescription` (30-word card blurb), `longDescription` (3-paragraph array, ~150-250 words total), `specs` (6 rows), `warnings` (2 items), `crossBranchJab` (one-line pulled quote), `reviews` (3 reviews with `rank`, `name`, `stars`, `body`).

Use the spec's joke angles for each product. Match the voltage of the Grunt's Embrace sample above. Every product must include exactly one cross-branch jab in the body/jab line that roasts the spec-designated rival service.

Templates and rules:
- Reviews: use real-seeming military rank abbreviations (SPC, SGT, SSG, SFC, 1SG, SGM, 1LT, CPT, MAJ, LTC, COL for Army; PO3, PO2, PO1, CPO, SCPO, MCPO, ENS, LT, LCDR, CDR, CAPT for Navy; A1C, SrA, SSgt, TSgt, MSgt, SMSgt, CMSgt, 2d Lt, 1st Lt, Capt, Maj, Lt Col, Col for AF; LCpl, Cpl, Sgt, SSgt, GySgt, MSgt, MGySgt, 2ndLt, 1stLt, Capt, Maj, LtCol, Col for USMC).
- Names: plausible military-sounding names (no real people).
- Stars: 1-5 range; at least one 5-star and one 2-or-3-star per product for variety.
- Warnings: each should be absurd but in-voice (e.g., "Not for use in garrison." "Morale results not guaranteed.").
- CrossBranchJab: a standalone one-liner like "The Air Force already has X. You have this."

- [ ] **Step 1: Fill Grunt's Embrace** (the template; use the voltage sample's body verbatim as starting point)

Edit the entry in `src/sites/squaredaway/data/products.ts`. Example finished entry:

```typescript
{
  slug: "grunts-embrace",
  branch: "army",
  nsn: "8465-69-420-MRE",
  contractCode: "W91CRB-24-C-0069",
  milStd: "MIL-STD-SUCK",
  name: "The Grunt's Embrace™ Tactical Pillow",
  price: 84.99,
  priceLabel: "$84.99",
  tagline: "Concrete-filled MOLLE. Ready to ruck.",
  image: "/sites/squaredaway/product-grunts-embrace.png",
  shortDescription:
    "Concrete-filled MOLLE tactical pillow in discontinued UCP camo. Weight: 11.2 lbs. Ready to ruck, nap, or neither.",
  longDescription: [
    "Finally, a pillow that respects your profession. The Grunt's Embrace™ is constructed from reinforced MOLLE webbing, filled with genuine poured concrete, and wrapped in the Universal Camouflage Pattern that famously failed to camouflage anything between 2005 and 2019. At 11.2 pounds, it is heavy enough to qualify as Class IV field equipment and uncomfortable enough to feel earned.",
    "Each unit is poured by hand at a demolished NCO club in Fort Hood, Texas, then cured for 28 days under a tarp. Our morale engineers have verified that nobody who has ever used this pillow has slept well. This is considered a feature.",
    "Ideal for the 11B who wants to take their profession home with them, the reservist who refuses to leave the Army behind, and the O-4 whose spouse has asked them to get a hobby.",
  ],
  specs: [
    { label: "Weight", value: "11.2 lbs" },
    { label: "Dimensions", value: "18 × 14 × 4 in" },
    { label: "Fill Material", value: "Poured concrete" },
    { label: "Shell", value: "500D Cordura MOLLE webbing" },
    { label: "Pattern", value: "UCP (Class of 2005)" },
    { label: "Care Instructions", value: "Do not wash. Do not sleep on. Ruck only." },
  ],
  warnings: [
    "Not authorized for Air Force use. May cause posture injury to Chair Force personnel.",
    "Concrete source (Fort Hood NCO club) cannot be certified as morale-compliant.",
  ],
  crossBranchJab:
    "The Air Force already has memory foam with a thread count. You have this.",
  reviews: [
    {
      rank: "SFC",
      name: "Devaughn Miles",
      stars: 5,
      body: "Finally a pillow that understands me. I have not slept since 2007 and this has not changed that, but now I can't blame the pillow.",
    },
    {
      rank: "SPC",
      name: "Tanner Blackwood",
      stars: 2,
      body: "My platoon sergeant made me add it to my ruck for a 12-miler. It is still in my ruck. I am afraid of it.",
    },
    {
      rank: "1SG",
      name: "Marlene Koppel",
      stars: 5,
      body: "Issued one to every soldier in my company. Morale down 14%. Rucks up 14%. Net zero. Army math.",
    },
  ],
  featured: true,
},
```

- [ ] **Step 2: Fill MRE Pairing Flight: The Fort Polk Collection**

Joke angles from spec: wine-tasting format applied to MREs (Chili Mac, Beef Stew, Veggie Omelet, Jalapeño Pepper Pouch), sommelier-style pairing notes. Cross-branch target: Air Force ("you eat steak at Qatar"). Write in-voice with the 4-MRE flight as the organizing device. Specs should include things like `Flight Pairing` (wine-style), `Tasting Room`, `Served With`. Warnings around digestion. Reviews referencing field conditions.

Follow the voltage above. Ensure all six required fields (shortDescription, 3-para longDescription, 6 specs, 2 warnings, crossBranchJab, 3 reviews) are populated.

- [ ] **Step 3: Fill UCP Classic™ Commemorative Invisibility Cloak**

Joke angles: UCP debacle, invisibility-cloak format, "as seen failing in Iraq." Rival: Marines (MARPAT actually worked). Specs: `Pattern`, `In-Service Dates`, `Efficacy Rating`, `Color Blocks`, `Certified Invisible`, `Composition`.

- [ ] **Step 4: Fill Regulation Sergeant Major Mustache Kit**

Joke angles: SMJ mustache culture, wax + comb + framed commendation. Rival: Navy beards. Specs should include `Wax Compound`, `Comb Material`, `Framed Citation Size`, `Regulation Width`, `Approved Curl Styles`, `Compliance`.

- [ ] **Step 5: Fill Artisanal Field Mud™ (1 gal.)**

Joke angles: single-origin mud, Fort Polk terroir, for reenactors. Rival: Air Force ("has never seen mud"). Specs: `Origin`, `Volume`, `Moisture Content`, `Clay Ratio`, `Certifications`, `Aroma Profile`.

- [ ] **Step 6: Fill The Hooah Bar™**

Joke angles: artisanal overpriced riff on the real Hooah Bar, "tastes like motivation and abandonment." Rival: Marines (Culinary Coloring Sticks cost less). Specs: `Calories`, `Protein`, `Motivation Content`, `Origin`, `Best Before`, `Certifications`.

- [ ] **Step 7: Fill Rucking Enrichment Stones™ (set of 6)**

Joke angles: mindfulness-marketed bricks, each named. Rival: Navy (ships carry your weight for you). Specs: `Weight per Stone`, `Set Count`, `Stone Names` (list 6: "Discipline," "Regret," "Hooah," "Brotherhood," "Foot Pain," "Retirement"), `Origin`, `Enrichment Rating`, `Certifications`.

- [ ] **Step 8: Fill PowerPoint of the Month Club™**

Joke angles: monthly subscription of safety briefings (SHARP, OPSEC, Suicide Prevention, Equal Opportunity). Rival: all branches (one shared experience). Specs: `Slides per Month`, `Format`, `Renewal`, `Delivery`, `Topics Covered`, `Certifications`.

- [ ] **Step 9: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 10: Commit**

```bash
git add src/sites/squaredaway/data/products.ts
git commit -m "feat(squaredaway): fill army product copy (8 products)"
```

---

## Task 6: Fill Navy product copy (8 products)

**Files:**
- Modify: `src/sites/squaredaway/data/products.ts` (navy entries 1–8)

Apply Task 5's voltage, structure, and rules to all 8 Navy products. Joke angles and rivals per product are in the spec's Navy section. Reminder: use Navy ranks (PO3 through CAPT).

- [ ] **Step 1: Fill Chief's Coffee™ Dark Deployment Roast**
Joke angles: single-origin aircraft-carrier coffee, ground by a chief named Dave. Rival: Army (still drinks Folgers).

- [ ] **Step 2: Fill Goat Locker™ Membership Soap**
Joke angles: goat-shaped soap for Chiefs; references CPO initiation. Rival: Marines (bulldog mascot).

- [ ] **Step 3: Fill The 7-Month Deployment™ Beard Oil**
Joke angles: Navy's beard policy ambiguity, 7-month deployment cadence, no-shave chits. Rival: Army (beards forbidden).

- [ ] **Step 4: Fill Dixie Cup Hat Storage System**
Joke angles: over-engineered stainless-steel humidor for one Dixie cup. Rival: Air Force.

- [ ] **Step 5: Fill Shellback Certification Coaster Set**
Joke angles: set of 4 coasters, Shellback/Pollywog rituals, "discusses itself." Rival: Army (hasn't crossed equator).

- [ ] **Step 6: Fill Sub School Pillowcase — Blackout Edition**
Joke angles: submariner life, sensory deprivation. Rival: Air Force (you sleep in a hotel).

- [ ] **Step 7: Fill Liberty Call Regret Planner™**
Joke angles: pre-filled weekly planner, every entry says "Regret." Rival: Marines (regret comes with a tattoo).

- [ ] **Step 8: Fill Haze Gray Paint Touch-Up Kit**
Joke angles: paint-chipping Saturdays, one can of haze gray. Rival: Air Force (your buildings are beige).

- [ ] **Step 9: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/data/products.ts
git commit -m "feat(squaredaway): fill navy product copy (8 products)"
```

---

## Task 7: Fill Air Force product copy (8 products)

**Files:**
- Modify: `src/sites/squaredaway/data/products.ts` (airforce entries 1–8)

Apply the voltage. Use AF ranks (A1C through Col). AF copy should lean into self-deprecation about the "Chair Force" premium experience — own it.

- [ ] **Step 1: Fill Premium Deployment Concierge Kit™** (featured)
Joke angles: deployment as business travel, Panera loyalty card included. Rival: Army (your deployment was a tent).

- [ ] **Step 2: Fill Chair Force™ Ergonomic Deployment Chair**
Joke angles: $4,899 premium chair marketed as deployment equipment. Rival: Marines (you stand).

- [ ] **Step 3: Fill The Qatar Package™**
Joke angles: Al Udeid as a 5-star deployment, Starbucks on base, complimentary robe. Rival: Army (your Qatar was a shipping container).

- [ ] **Step 4: Fill Base Housing Carpet Sampler™**
Joke angles: AF base housing nicer than other branches, suburban carpet swatches. Rival: Navy (you live below the waterline).

- [ ] **Step 5: Fill Flight Suit™ Cashmere Loungewear**
Joke angles: flight suit as loungewear, cashmere, fitted. Rival: Marines (your uniform is covered in sand).

- [ ] **Step 6: Fill PT Test Completion Medal™**
Joke angles: AF PT standards jokes, engraved with unit. Rival: Army (your PT is torture).

- [ ] **Step 7: Fill Premium MRE™ (AF Variant)**
Joke angles: chef-curated MRE in ceramic with craft seltzer pairing. Rival: Army (Fort Polk MRE guys never know).

- [ ] **Step 8: Fill On-Base Golf Course Keychain**
Joke angles: AF base golf culture, keychain grants access to all 17 courses. Rival: Marines (your "course" is a rifle range).

- [ ] **Step 9: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/data/products.ts
git commit -m "feat(squaredaway): fill air force product copy (8 products)"
```

---

## Task 8: Fill Marines product copy (8 products)

**Files:**
- Modify: `src/sites/squaredaway/data/products.ts` (marines entries 1–8)

Apply the voltage. Use USMC ranks (LCpl through Col). The crayon product is the centerpiece — give it the most loving, committed satire. Use the flavor list from the spec: Sharpie, Diesel, Unflavored, Classic Red, Sidewalk Chalk, Pine-Sol, "Officer's Mess" (all other crayons mixed together).

- [ ] **Step 1: Fill Premium Culinary Coloring Sticks™ (the crayon product — featured)**

This is the anchor joke. Write it with full commitment. Example finished entry (use as-is):

```typescript
{
  slug: "culinary-coloring-sticks",
  branch: "marines",
  nsn: "USMC-CRY-8940-12PK",
  contractCode: "M67854-24-C-0001",
  milStd: "MIL-STD-OORAH",
  name: "Premium Culinary Coloring Sticks™",
  price: 34.99,
  priceLabel: "$34.99",
  tagline: "12 edible crayons. Flavors: Sharpie, Diesel, Unflavored.",
  image: "/sites/squaredaway/product-culinary-coloring-sticks.png",
  shortDescription:
    "Twelve individually wrapped food-grade crayons in a MARPAT tin. Finally, authorized field rations for the 03xx MOS.",
  longDescription: [
    "For generations, Marines have instinctively reached for crayons during moments of stress, joy, and between-meal hunger. Squared Away Supply Co. is proud to offer the first crayon line engineered from the ground up for Marine Corps consumption — food-grade, contract-compliant, and certified at least 40% more caloric than standard crayons.",
    "Each tin contains twelve individually wrapped Culinary Coloring Sticks™ in the following flavor lineup: Sharpie, Diesel, Unflavored, Classic Red, Sidewalk Chalk, Pine-Sol, Motor Oil, Burnt Rubber, Midnight CPAC, Gun Oil, Dirt, and the popular Officer's Mess (all other flavors mixed together).",
    "Packaged in a commemorative MARPAT tin with a hinged lid and an embossed EGA. Small enough to fit in a cargo pocket. Large enough to ration across a field evolution. Ideal for FEXs, MREs (as a side), and moments of reflection.",
  ],
  specs: [
    { label: "Contents", value: "12 individually wrapped sticks" },
    { label: "Flavor Lineup", value: "Sharpie, Diesel, Unflavored, Red, Sidewalk Chalk, Pine-Sol, Motor Oil, Burnt Rubber, Midnight CPAC, Gun Oil, Dirt, Officer's Mess" },
    { label: "Net Weight", value: "4.2 oz (119 g)" },
    { label: "Calories per Stick", value: "72 kcal (motivational)" },
    { label: "Tin Finish", value: "Woodland MARPAT, hinged, embossed EGA" },
    { label: "Certifications", value: "Food-Grade. MIL-STD-OORAH Compliant. Not FDA-Approved." },
  ],
  warnings: [
    "For Marine Corps consumption only. Army personnel report no flavor. Air Force personnel report a rash.",
    "Officer's Mess flavor is a blend of all other flavors and is not intended for personnel below E-7.",
  ],
  crossBranchJab:
    "The other branches don't understand what this product is. That is the product.",
  reviews: [
    {
      rank: "LCpl",
      name: "Jackson Peralta",
      stars: 5,
      body: "Finally. The Corps has listened. I have eaten crayons for seven years and this is the first time one has tasted like diesel on purpose.",
    },
    {
      rank: "Sgt",
      name: "Mirabelle Huxtable",
      stars: 5,
      body: "I gave one to an Airman at the gate. He asked if it was a protein bar. That is how you win wars.",
    },
    {
      rank: "GySgt",
      name: "Cornelius Vance",
      stars: 4,
      body: "Officer's Mess flavor tastes exactly like what we all thought officers were. Knocked one star for accuracy.",
    },
  ],
  featured: true,
},
```

- [ ] **Step 2: Fill The Jarhead™ Precision Haircut Kit**
Joke angles: single-length clipper kit, "regulation or shorter." Rival: Air Force (haircuts are optional).

- [ ] **Step 3: Fill Oorah™ Vocal Training Audio Course**
Joke angles: 40-hour audiobook teaching OORAH, diaphragm training. Rival: Army (hooah is weak).

- [ ] **Step 4: Fill Regulation Crying Towel**
Joke angles: commemorative towel for dark Marine moments. Rival: Navy (showers are warm).

- [ ] **Step 5: Fill Semper Fi™ DIY Tattoo Kit**
Joke angles: stick-and-poke kit with six stencils (EGA, bulldog, Semper Fi, Mom, USMC 0311, anchor that accidentally says USN). Rival: Air Force (tattoos career-limiting).

- [ ] **Step 6: Fill Sand Rations™ (5 lb bag)**
Joke angles: single-origin Camp Pendleton sand. Rival: Army (sand is inferior).

- [ ] **Step 7: Fill Chesty's™ Bulldog Morale Companion**
Joke angles: motion-activated OORAH plush bulldog in dress blues. Rival: Navy (goat smells).

- [ ] **Step 8: Fill MARPAT™ Throw Pillow Set (set of 4)**
Joke angles: 2 desert + 2 woodland MARPAT pillows, barracks-room interior design. Rival: Army (UCP didn't camouflage your couch either).

- [ ] **Step 9: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/data/products.ts
git commit -m "feat(squaredaway): fill marines product copy (8 products, incl. crayons)"
```

---

## Task 9: Home page

**Files:**
- Create: `src/sites/squaredaway/pages/home.tsx`

- [ ] **Step 1: Implement homepage**

Create `src/sites/squaredaway/pages/home.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { getFeaturedProducts } from "@/sites/squaredaway/data/products"

const BRANCHES: Array<{ slug: string; label: string; image: string; tagline: string }> = [
  {
    slug: "army",
    label: "Army",
    image: "/sites/squaredaway/branch-army.png",
    tagline: "Heavy. Tired. Authorized.",
  },
  {
    slug: "navy",
    label: "Navy",
    image: "/sites/squaredaway/branch-navy.png",
    tagline: "Haze gray and underfunded.",
  },
  {
    slug: "airforce",
    label: "Air Force",
    image: "/sites/squaredaway/branch-airforce.png",
    tagline: "Premium deployment experiences.",
  },
  {
    slug: "marines",
    label: "Marines",
    image: "/sites/squaredaway/branch-marines.png",
    tagline: "Oorah. Crayons. Oorah.",
  },
]

const TESTIMONIALS = [
  { quote: "I bought the invisibility cloak. My 1SG still found me.", cite: "SGT (P) Devaughn Miles · Fort Irwin" },
  { quote: "The coffee tastes like a fan room at 0400. Five stars.", cite: "CPO Regina Hollenbeck · CVN-74" },
  { quote: "My Concierge Kit arrived with a complimentary robe. I cried.", cite: "Maj. Tucker Lindgren · Al Udeid AB" },
  { quote: "I ate the crayons. They were better than the MRE.", cite: "LCpl Jackson Peralta · Camp Pendleton" },
]

export default function HomePage() {
  const featured = getFeaturedProducts()
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/sites/squaredaway/hero.png"
            alt="Squared Away Supply Co. storefront"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <p className="font-mono uppercase tracking-widest text-primary text-xs mb-2">
              UNCLASSIFIED // FOUO
            </p>
            <h1 className="font-heading text-4xl md:text-6xl text-primary leading-tight mb-3 drop-shadow-[0_2px_0_rgba(255,255,255,0.5)]">
              The Official Unofficial Post Exchange.
            </h1>
            <p className="text-foreground/90 text-lg md:text-xl">
              Authorized gear for all four service branches, plus one that shall remain nameless.
            </p>
          </div>
        </div>
      </section>

      {/* Branch tiles */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-8 uppercase tracking-widest text-center">
            Select Your Branch
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRANCHES.map((b) => (
              <Link
                key={b.slug}
                href={`/${b.slug}`}
                className="group block border-2 border-primary/40 hover:border-accent transition-colors bg-background/70"
              >
                <div className="relative aspect-square">
                  <Image src={b.image} alt={b.label} fill className="object-cover" />
                </div>
                <div className="p-3 border-t-2 border-primary/40">
                  <p className="font-heading uppercase tracking-widest text-primary">{b.label}</p>
                  <p className="text-xs text-foreground/70">{b.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured strip */}
      <section className="py-14 px-4 bg-primary/10 border-y-2 border-primary/30">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-1">THIS WEEK AT THE PX</p>
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-8">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="block border-2 border-primary/40 bg-background hover:border-accent transition-colors"
              >
                <div className="relative aspect-square">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <div className="p-4 border-t-2 border-primary/40">
                  <p className="font-mono text-xs uppercase text-primary/60 mb-1">NSN {p.nsn}</p>
                  <p className="font-heading text-primary uppercase tracking-wide text-lg leading-tight mb-1">{p.name}</p>
                  <p className="text-sm text-foreground/70 mb-2">{p.tagline}</p>
                  <p className="font-mono text-accent">{p.priceLabel}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Morale pitch */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">MWR PROGRAM</p>
          <h2 className="font-heading text-3xl text-primary uppercase tracking-widest mb-4">Morale Is a Metric.</h2>
          <p className="text-foreground/80 mb-6">
            Enroll in the Squared Away Morale Program™ and earn Morale Points with every purchase. Unlock tiers
            ranging from E-1 Private to General of the Army. Redeem points for the illusion of meaning.*
          </p>
          <Link
            href="/morale"
            className="inline-block border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-8 py-3 hover:bg-accent hover:border-accent transition-colors"
          >
            Initiate Morale
          </Link>
          <p className="text-xs text-foreground/50 mt-4">
            *Illusion of meaning not redeemable at all locations. Ships in 6-8 weeks.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-4 bg-primary/5 border-y-2 border-primary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-8 text-center">
            After Action Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="border-l-4 border-accent pl-4">
                <p className="text-sm text-foreground/90 mb-2">"{t.quote}"</p>
                <cite className="font-mono text-xs uppercase tracking-wider text-primary/70 not-italic">— {t.cite}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/sites/squaredaway/pages/home.tsx
git commit -m "feat(squaredaway): add home page"
```

---

## Task 10: Branch page — Army

**Files:**
- Create: `src/sites/squaredaway/pages/army.tsx`

- [ ] **Step 1: Implement the Army branch page**

Create `src/sites/squaredaway/pages/army.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { getProductsByBranch } from "@/sites/squaredaway/data/products"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Army — Squared Away Supply Co.",
  description:
    "Authorized field gear, morale bricks, invisibility cloaks, and MRE pairing flights for the United States Army.",
}

const INTRO =
  "Welcome to the Army section. You walk a lot. You carry a lot. You PowerPoint a lot. We have items for each of these core duties, priced to reflect the labor you already knew was underpaid. The Army does the work. You have this."

export default function ArmyPage() {
  const products = getProductsByBranch("army")
  return (
    <>
      <section className="relative">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src="/sites/squaredaway/branch-army.png"
            alt="Army branch banner"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <p className="font-mono uppercase tracking-widest text-primary text-xs mb-1">Component: LAND</p>
            <h1 className="font-heading text-5xl md:text-6xl text-primary uppercase tracking-widest">Army</h1>
            <p className="text-foreground/90 mt-2">This We'll Defend. For a Price.</p>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 border-b-2 border-primary/30">
        <p className="max-w-3xl mx-auto text-foreground/80 text-center italic">{INTRO}</p>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group block border-2 border-primary/40 bg-background hover:border-accent transition-colors"
            >
              <div className="relative aspect-square">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-4 border-t-2 border-primary/40">
                <p className="font-mono text-xs uppercase text-primary/60 mb-1">NSN {p.nsn}</p>
                <p className="font-heading text-primary uppercase tracking-wide text-lg leading-tight mb-1">{p.name}</p>
                <p className="text-sm text-foreground/70 mb-2">{p.tagline}</p>
                <p className="font-mono text-accent">{p.priceLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-10 px-4 bg-primary/5 border-t-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary/70 mb-2">Also Available</p>
          <div className="flex flex-wrap justify-center gap-3 font-heading uppercase tracking-widest">
            <Link href="/navy" className="border-2 border-primary/40 px-4 py-2 hover:border-accent">Navy</Link>
            <Link href="/airforce" className="border-2 border-primary/40 px-4 py-2 hover:border-accent">Air Force</Link>
            <Link href="/marines" className="border-2 border-primary/40 px-4 py-2 hover:border-accent">Marines</Link>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/pages/army.tsx
git commit -m "feat(squaredaway): add army branch page"
```

---

## Task 11: Branch pages — Navy, Air Force, Marines

**Files:**
- Create: `src/sites/squaredaway/pages/navy.tsx`
- Create: `src/sites/squaredaway/pages/airforce.tsx`
- Create: `src/sites/squaredaway/pages/marines.tsx`

Use the Army page as a template; vary intro copy, hero banner path, and the "Also Available" links. Each page should follow the exact same structure.

- [ ] **Step 1: Create navy.tsx**

Mirror `army.tsx`. Changes:
- Title: "Navy — Squared Away Supply Co."
- Description: *"Authorized caffeine, dixie-cup storage, haze-gray touch-up kits, and chief-grade soap for the United States Navy."*
- Hero subtitle: *"Non Sibi Sed Patriae. Mostly Patriae."*
- Component label: *"Component: SEA"*
- Intro:
  > "Welcome to the Navy section. You live on a gray rectangle. You drink coffee nobody would pour on a burn victim. You have a beard, technically. We honor all three with our curated line of seagoing essentials."
- `getProductsByBranch("navy")`
- Hero image: `/sites/squaredaway/branch-navy.png`
- "Also Available" links point to Army, Air Force, Marines

- [ ] **Step 2: Create airforce.tsx**

- Title: "Air Force — Squared Away Supply Co."
- Description: *"Premium deployment gear, cashmere flight suits, on-base golf keychains, and the famous Qatar Package™ for the United States Air Force."*
- Hero subtitle: *"Aim High. Sit Down."*
- Component label: *"Component: AIR (INDOORS)"*
- Intro:
  > "Welcome to the Air Force section. Your deployment was a hotel. Your MRE had a seltzer pairing. Your PT test ended in a muffin. We are not here to judge. We are here to sell. Browse our premium catalog of unapologetically comfortable gear."
- `getProductsByBranch("airforce")`
- Hero image: `/sites/squaredaway/branch-airforce.png`

- [ ] **Step 3: Create marines.tsx**

- Title: "Marines — Squared Away Supply Co."
- Description: *"Edible crayons, OORAH vocal training, DIY Semper Fi tattoo kits, and Chesty plush bulldogs for the United States Marine Corps."*
- Hero subtitle: *"Semper Fi. Gently Snacking."*
- Component label: *"Component: LAND (VIOLENT)"*
- Intro:
  > "Welcome to the Marine Corps section. You run everywhere. You yell everywhere. You eat crayons. We have taken those three instincts and built a catalog around them. You will not need to think. Please do not think."
- `getProductsByBranch("marines")`
- Hero image: `/sites/squaredaway/branch-marines.png`

- [ ] **Step 4: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/pages/navy.tsx src/sites/squaredaway/pages/airforce.tsx src/sites/squaredaway/pages/marines.tsx
git commit -m "feat(squaredaway): add navy, air force, and marines branch pages"
```

---

## Task 12: Product detail page

**Files:**
- Create: `src/sites/squaredaway/pages/product-detail.tsx`

- [ ] **Step 1: Implement the product detail component**

Create `src/sites/squaredaway/pages/product-detail.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { getProductBySlug, getProductsByBranch, Product } from "@/sites/squaredaway/data/products"
import { NsnHeader } from "@/components/ui/NsnHeader"
import { SpecsTable } from "@/components/ui/SpecsTable"
import { WarningBox } from "@/components/ui/WarningBox"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

const BRANCH_LABEL: Record<Product["branch"], string> = {
  army: "Army",
  navy: "Navy",
  airforce: "Air Force",
  marines: "Marines",
}

function Stars({ n }: { n: number }) {
  const full = "★".repeat(n)
  const empty = "☆".repeat(5 - n)
  return <span className="text-accent font-mono">{full}{empty}</span>
}

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getProductsByBranch(product.branch).filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      {/* Header / hero */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative aspect-square border-2 border-primary/40 bg-background overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              fetchPriority="high"
              className="object-cover"
            />
          </div>
          <div>
            <NsnHeader nsn={product.nsn} contractCode={product.contractCode} milStd={product.milStd} />
            <p className="font-mono text-xs uppercase tracking-widest text-primary/70 mb-1">
              {BRANCH_LABEL[product.branch]} Section
            </p>
            <h1 className="font-heading text-3xl md:text-4xl text-primary uppercase tracking-wide leading-tight mb-2">
              {product.name}
            </h1>
            <p className="italic text-foreground/80 mb-5">{product.tagline}</p>

            <div className="border-2 border-primary/40 bg-primary/5 p-4 mb-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase text-primary/60">UNIT PRICE</span>
                <span className="font-heading text-3xl text-primary">{product.priceLabel}</span>
              </div>
            </div>

            <AddToCartButton
              slug={product.slug}
              productName={product.name}
              className="w-full border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-6 py-3 hover:bg-accent hover:border-accent transition-colors"
              quips={[
                "ORDER RECEIVED. AWAIT FURTHER GUIDANCE.",
                "ACQUISITION COMPLETE.",
                "MORALE UPDATED.",
                "FUNDS DISBURSED. DIGNITY NEGOTIABLE.",
                "SQUARED AWAY.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="py-10 px-4 bg-primary/5 border-y-2 border-primary/30">
        <div className="max-w-3xl mx-auto space-y-4">
          {product.longDescription.map((p, i) => (
            <p key={i} className="text-foreground/90 leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* Cross-branch jab */}
      {product.crossBranchJab && (
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto text-center border-l-4 border-accent pl-6 text-left">
            <p className="font-heading text-2xl text-primary italic">"{product.crossBranchJab}"</p>
            <p className="font-mono text-xs uppercase tracking-widest text-primary/60 mt-2">
              — SQUARED AWAY EDITORIAL BOARD
            </p>
          </div>
        </section>
      )}

      {/* Specs */}
      <section className="py-10 px-4 bg-primary/5 border-y-2 border-primary/30">
        <div className="max-w-3xl mx-auto">
          <SpecsTable heading="Technical Specifications" rows={product.specs} />
        </div>
      </section>

      {/* Warnings */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <WarningBox warnings={product.warnings} />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-10 px-4 bg-primary/5 border-y-2 border-primary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-6">After-Action Reports</h2>
          <div className="space-y-5">
            {product.reviews.map((r, i) => (
              <div key={i} className="border-l-4 border-primary/50 pl-4">
                <div className="flex items-center gap-3 mb-1">
                  <Stars n={r.stars} />
                  <span className="font-mono text-xs uppercase tracking-widest text-primary/70">
                    {r.rank} {r.name}
                  </span>
                </div>
                <p className="text-foreground/90">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-6">
              Also in the {BRANCH_LABEL[product.branch]} Section
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="block border-2 border-primary/40 bg-background hover:border-accent transition-colors"
                >
                  <div className="relative aspect-square">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="p-4 border-t-2 border-primary/40">
                    <p className="font-mono text-xs uppercase text-primary/60 mb-1">NSN {p.nsn}</p>
                    <p className="font-heading text-primary uppercase tracking-wide text-lg leading-tight mb-1">{p.name}</p>
                    <p className="text-sm text-foreground/70">{p.tagline}</p>
                    <p className="font-mono text-accent mt-2">{p.priceLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contract footer */}
      <section className="py-6 px-4 border-t-2 border-primary/30 bg-primary/10">
        <div className="max-w-5xl mx-auto font-mono text-[10px] md:text-xs uppercase tracking-widest text-primary/60 text-center">
          Nomenclature pending · Contract #{product.contractCode} · {product.milStd} · UNCLASSIFIED // FOUO
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/pages/product-detail.tsx
git commit -m "feat(squaredaway): add product detail page"
```

---

## Task 13: Morale Program page

**Files:**
- Create: `src/sites/squaredaway/pages/morale.tsx`

- [ ] **Step 1: Implement the morale page**

Create `src/sites/squaredaway/pages/morale.tsx`:

```typescript
"use client"

import { useState } from "react"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Morale Program — Squared Away Supply Co.",
  description: "Enroll in the Squared Away Morale Program™. Earn Morale Points. Redeem the illusion of meaning.",
}

const TIERS = [
  { tier: "E-1 Private", points: 0, reward: 'A "Welcome to Morale" PDF.' },
  { tier: "E-5 Sergeant", points: 500, reward: "10% off your next brick." },
  { tier: "E-9 Command Sergeant Major", points: 2500, reward: "One free PowerPoint template." },
  { tier: "O-3 Captain", points: 5000, reward: "A laminated certificate of your own name." },
  { tier: "O-6 Colonel", points: 15000, reward: "Complimentary golf course keychain." },
  { tier: "O-10 General", points: 50000, reward: "The illusion of meaning (ships in 6–8 weeks)." },
]

const FAQ = [
  { q: "How do I earn Morale Points?", a: "By spending real money on products that produce no measurable morale." },
  { q: "Can I transfer points to my spouse?", a: "No. Morale is non-transferable. Spouses generate their own morale through complaints." },
  { q: "Do points expire?", a: "Yes. Points expire when you do." },
  { q: "Is this a real loyalty program?", a: "Define 'real.'" },
]

export default function MoralePage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  return (
    <>
      <section className="py-14 px-4 border-b-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">MWR PROGRAM · NON-BINDING</p>
          <h1 className="font-heading text-4xl md:text-5xl text-primary uppercase tracking-widest mb-3">Morale Is a Metric.</h1>
          <p className="text-foreground/80">
            The Squared Away Morale Program™ converts your discretionary spending into quantified morale, denominated in
            Morale Points (MP). Points may be redeemed for tiered rewards of decreasing utility and increasing prestige.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-primary/5 border-b-2 border-primary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-6">Tiers of Morale</h2>
          <div className="border-2 border-primary/40 bg-background">
            <table className="w-full text-sm">
              <thead className="bg-primary text-background font-heading uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-2 text-left">Tier</th>
                  <th className="px-4 py-2 text-left">Points</th>
                  <th className="px-4 py-2 text-left">Reward</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((t, i) => (
                  <tr key={t.tier} className={i % 2 === 0 ? "" : "bg-primary/5"}>
                    <td className="px-4 py-2 font-mono uppercase tracking-wider">{t.tier}</td>
                    <td className="px-4 py-2 font-mono">{t.points.toLocaleString()} MP</td>
                    <td className="px-4 py-2">{t.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-4">Initiate Morale</h2>
          {submitted ? (
            <div className="border-2 border-accent bg-accent/10 p-6">
              <p className="font-heading uppercase tracking-widest text-accent mb-1">Morale Pending Review</p>
              <p className="text-foreground/80 text-sm">
                Await further orders. An E-6 will review your enrollment during business hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@mil"
                className="border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none"
              />
              <button
                type="submit"
                className="border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-6 py-3 hover:bg-accent hover:border-accent transition-colors"
              >
                Initiate Morale
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="py-12 px-4 bg-primary/5 border-t-2 border-primary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-5">Program FAQ</h2>
          <div className="space-y-5">
            {FAQ.map((f, i) => (
              <div key={i}>
                <p className="font-heading text-primary uppercase tracking-wide mb-1">{f.q}</p>
                <p className="text-foreground/80">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/pages/morale.tsx
git commit -m "feat(squaredaway): add morale program page"
```

---

## Task 14: Authorization page

**Files:**
- Create: `src/sites/squaredaway/pages/authorization.tsx`

- [ ] **Step 1: Implement the authorization gag page**

Create `src/sites/squaredaway/pages/authorization.tsx`:

```typescript
"use client"

import { useState } from "react"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Authorization — Squared Away Supply Co.",
  description: "All personnel must verify tier before shopping. This check is non-binding and non-verifiable.",
}

const TIERS = [
  "Active Duty",
  "Reservist",
  "National Guard",
  "Retired",
  "Dependent",
  "DoD Civilian",
  "Civilian Contractor (LinkedIn Edition)",
  "Owns ≥1 Punisher Sticker",
  "Watched Top Gun: Maverick",
  "Other",
]

export default function AuthorizationPage() {
  const [tier, setTier] = useState(TIERS[0])
  const [verified, setVerified] = useState(false)
  return (
    <section className="py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">
          UNCLASSIFIED // AUTHORIZED PERSONNEL
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary uppercase tracking-widest mb-2">
          Authorization Required
        </h1>
        <p className="text-foreground/80 mb-8">
          All personnel must verify their authorization tier before shopping at this Post Exchange. This check is
          non-binding, non-verifiable, and — frankly — non-existent.
        </p>

        {verified ? (
          <div className="border-2 border-accent bg-accent/10 p-6">
            <p className="font-heading text-xl uppercase tracking-widest text-accent mb-2">Authorization Granted</p>
            <p className="text-foreground/80">You are squared away. Welcome to the PX.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setVerified(true)
            }}
            className="flex flex-col gap-3"
          >
            <label className="text-left font-mono uppercase tracking-widest text-primary/70 text-xs">
              Select Your Authorization Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="border-2 border-primary/40 bg-background px-4 py-3 font-mono focus:border-accent outline-none"
            >
              {TIERS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button
              type="submit"
              className="border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-6 py-3 hover:bg-accent hover:border-accent transition-colors"
            >
              Verify
            </button>
          </form>
        )}

        <p className="text-xs text-foreground/50 mt-8">
          This authorization check is non-binding, non-verifiable, and frankly non-existent. It is here for the joke.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/pages/authorization.tsx
git commit -m "feat(squaredaway): add authorization gag page"
```

---

## Task 15: FAQ page

**Files:**
- Create: `src/sites/squaredaway/pages/faq.tsx`

Reuse the existing `FaqAccordion` component (from `@/components/ui/FaqAccordion`). If it does not exist in the expected shape (list of `{question, answer}`), check `src/components/ui/FaqAccordion.tsx` and adapt accordingly. If the component API differs, render a simple details/summary list instead — keep the page minimal.

- [ ] **Step 1: Check the FaqAccordion API**

Read `src/components/ui/FaqAccordion.tsx` (if it exists) to confirm its props interface before writing this page. If missing, use plain `<details><summary>` markup.

- [ ] **Step 2: Create the FAQ page**

Create `src/sites/squaredaway/pages/faq.tsx`:

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "FAQ — Squared Away Supply Co.",
  description: "Frequently asked questions about the Official Unofficial Post Exchange.",
}

const FAQS: Array<{ q: string; a: string }> = [
  { q: "Do I need to salute my order confirmation?", a: "Only if the product was authorized by an O-4 or above." },
  { q: "Is this a real PX?", a: "Define 'real.'" },
  { q: "Can I use my GI Bill here?", a: "No. The GI Bill is for education. This is for morale." },
  { q: "Do you ship to FPO/APO addresses?", a: "Yes, eventually, probably, we promise." },
  { q: "Why is there no Space Force section?", a: "We're still waiting on their NSN codes." },
  { q: "Can I return a product?", a: "You cannot return the years, but you may return the product." },
  { q: "Do you honor military discounts?", a: "We honor you. Prices are prices." },
  { q: "Is the crayon product safe to eat?", a: "It is safe to eat if you are a Marine. It is food-adjacent for all other personnel." },
  { q: "What is MIL-STD-SUCK?", a: "A standard. It is met." },
  { q: "Do officers get special treatment here?", a: "Yes. Their items ship in slightly nicer envelopes." },
  { q: "Why are Air Force items so expensive?", a: "Ask them." },
  { q: "Can my spouse shop here?", a: "Yes. Dependents are the backbone of morale." },
]

export default function FaqPage() {
  return (
    <>
      <section className="py-12 px-4 border-b-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">FAQ · UNCLASSIFIED</p>
          <h1 className="font-heading text-4xl text-primary uppercase tracking-widest mb-3">Frequently Asked Questions</h1>
          <p className="text-foreground/80">
            Questions we're asked by customers, answered by people who do not read them.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="border-2 border-primary/40 bg-background group open:bg-primary/5 transition-colors"
            >
              <summary className="cursor-pointer list-none px-4 py-3 font-heading uppercase tracking-wide text-primary flex items-center justify-between">
                <span>{f.q}</span>
                <span className="font-mono text-primary/60 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <div className="px-4 pb-4 text-foreground/90">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/pages/faq.tsx
git commit -m "feat(squaredaway): add faq page"
```

---

## Task 16: Leadership page

**Files:**
- Create: `src/sites/squaredaway/pages/leadership.tsx`

Leadership uses the 4-person re-theme pattern: bill → Hardcastle (founder/Army), brandon → Blackwell (Navy), jim → Lindgren (Air Force), sean → Maddox (Marines). Image files referenced here will be generated in Task 19.

- [ ] **Step 1: Create the leadership page**

Create `src/sites/squaredaway/pages/leadership.tsx`:

```typescript
import Image from "next/image"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Command Staff — Squared Away Supply Co.",
  description:
    "Meet the retired command staff running the PX: General Hardcastle, Admiral Blackwell, Colonel Lindgren, and Sergeant Major Maddox.",
}

const LEADERSHIP = [
  {
    name: 'General (Ret.) Walter "Wally" Hardcastle',
    title: "Founder & Chief Morale Officer",
    image: "/sites/squaredaway/leadership-hardcastle.png",
    branch: "US Army (Retired)",
    bio:
      "General Hardcastle served 38 years across 4 continents, 11 commands, and 2,400 PowerPoint briefings. He retired in 2019 and has since dedicated his life to the conviction that morale can be purchased. He founded Squared Away Supply Co. from his basement, which is carpeted in safety-brief handouts.",
  },
  {
    name: "Admiral (Ret.) Preston Blackwell III",
    title: "Chief Seamanship Officer",
    image: "/sites/squaredaway/leadership-blackwell.png",
    branch: "US Navy (Retired)",
    bio:
      "Admiral Blackwell commanded three Nimitz-class carriers, two destroyer squadrons, and one very large aquarium. He is responsible for procurement of the Goat Locker™ Soap, which he believes should have been an MWR priority for decades. He lives on a boat. Of course he does.",
  },
  {
    name: "Colonel (Ret.) Tucker Lindgren",
    title: "VP of Premium Experience",
    image: "/sites/squaredaway/leadership-lindgren.png",
    branch: "US Air Force (Retired)",
    bio:
      "Colonel Lindgren flew 2,100 hours in the C-17 and 4,800 hours in business class. He led the product design team for the Qatar Package™ and personally certified every thread count in the Cashmere Loungewear line. He insists the PT medal is ironic. It is not.",
  },
  {
    name: 'Sergeant Major Huxley "Hux" Maddox',
    title: "Director of Oorah Operations",
    image: "/sites/squaredaway/leadership-maddox.png",
    branch: "US Marine Corps (Retired)",
    bio:
      "Sergeant Major Maddox enlisted at 17, deployed seven times, and has never once lowered his volume. He oversees the Marine product line personally, from the Culinary Coloring Sticks™ to the MARPAT Throw Pillow Set, and conducts all customer service calls in second person, imperative mood.",
  },
]

export default function LeadershipPage() {
  return (
    <>
      <section className="py-14 px-4 border-b-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">COMMAND STAFF · CLASSIFICATION: C-SUITE</p>
          <h1 className="font-heading text-4xl md:text-5xl text-primary uppercase tracking-widest mb-3">Command Staff</h1>
          <p className="text-foreground/80">
            Four retired brass running a Post Exchange. One is a founder. Three are not. All are squared away.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {LEADERSHIP.map((p) => (
            <article key={p.name} className="border-2 border-primary/40 bg-background">
              <div className="relative aspect-[4/5]">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-5 border-t-2 border-primary/40">
                <p className="font-mono text-xs uppercase tracking-widest text-primary/60 mb-1">{p.branch}</p>
                <h2 className="font-heading text-xl text-primary uppercase tracking-wide leading-tight">{p.name}</h2>
                <p className="text-accent font-semibold uppercase text-sm tracking-wider mb-3">{p.title}</p>
                <p className="text-foreground/85 text-sm leading-relaxed">{p.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/pages/leadership.tsx
git commit -m "feat(squaredaway): add leadership / command staff page"
```

---

## Task 17: Contact page

**Files:**
- Create: `src/sites/squaredaway/pages/contact.tsx`

Real email `bsambrone@gmail.com` must appear in fine print.

- [ ] **Step 1: Create the contact page**

Create `src/sites/squaredaway/pages/contact.tsx`:

```typescript
"use client"

import { useState } from "react"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Contact Command — Squared Away Supply Co.",
  description: "Request to contact a command representative at the Official Unofficial Post Exchange.",
}

const CLASSIFICATIONS = [
  "Morale-related",
  "Morale-adjacent",
  "Entirely morale-free",
  "Routing to PSYOP",
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <>
      <section className="py-12 px-4 border-b-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">
            FORM SQR-AR-3 · UNCLASSIFIED // FOUO
          </p>
          <h1 className="font-heading text-3xl md:text-4xl text-primary uppercase tracking-widest mb-2">
            Request to Contact a Command Representative
          </h1>
          <p className="text-foreground/80">
            Per AR 25-50, all inquiries must be routed through the official channels below. Expect a 4–6 week review
            cycle. A response is not guaranteed and may be disappointing.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="border-2 border-accent bg-accent/10 p-6 text-center">
              <p className="font-heading uppercase tracking-widest text-accent mb-2">Inquiry Logged</p>
              <p className="text-foreground/80 text-sm">An E-6 will review it during business hours. Thank you for your service.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="space-y-4"
            >
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Full Name</label>
                <input required type="text" className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Rank / Grade</label>
                <input type="text" className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Unit / Command</label>
                <input type="text" className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Inquiry Classification</label>
                <select className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-3 font-mono focus:border-accent outline-none">
                  {CLASSIFICATIONS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Message</label>
                <textarea required rows={5} className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none" />
              </div>
              <button
                type="submit"
                className="w-full border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-6 py-3 hover:bg-accent hover:border-accent transition-colors"
              >
                Route to Command
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="py-6 px-4 bg-primary/5 border-t-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center font-mono text-[10px] md:text-xs uppercase tracking-widest text-primary/60">
          UNCLASSIFIED // FOUO — For inquiries that refuse to be squared away:&nbsp;
          <a href="mailto:bsambrone@gmail.com" className="underline hover:text-accent">
            bsambrone@gmail.com
          </a>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/pages/contact.tsx
git commit -m "feat(squaredaway): add contact page with intake form"
```

---

## Task 18: Privacy and Terms pages

**Files:**
- Create: `src/sites/squaredaway/pages/privacy.tsx`
- Create: `src/sites/squaredaway/pages/terms.tsx`

Both pages follow the two-layer pattern: umbrella callout at top, then in-voice satire sections. See `feedback_new_site_patterns.md`; confirm against `src/sites/pigmilk/pages/privacy.tsx` for the exact umbrella-callout copy convention if uncertain.

- [ ] **Step 1: Create privacy.tsx**

Create `src/sites/squaredaway/pages/privacy.tsx`:

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Privacy Policy — Squared Away Supply Co.",
  description:
    "Privacy policy for the Official Unofficial Post Exchange. Umbrella policy at specificindustries.com/privacy is authoritative.",
}

const SECTIONS: Array<{ heading: string; body: string[] }> = [
  {
    heading: "1. Data We Collect (And What We Do With It)",
    body: [
      "We collect the following categories of data: what you buy, how long you stared at the crayon product before buying it, and whether you selected 'Civilian Contractor (LinkedIn Edition)' on the Authorization page. This data is aggregated into a metric we call 'Individual Morale Velocity' and stored in a binder at the command post.",
      "We do not sell your data. We trade it at poker night against other satirical commerce sites in the Specific Industries portfolio.",
    ],
  },
  {
    heading: "2. Cookies (Not the Good Kind)",
    body: [
      "This site uses cookies to remember your cart contents. The cookies are crunchy, unflavored, and compliant with MIL-STD-CHOMP. You may disable cookies in your browser settings, at which point the cart will forget you, which is its own form of quiet tragedy.",
    ],
  },
  {
    heading: "3. Your Rights Under the Uniform Code of Morale Justice",
    body: [
      "You have the right to request the data we hold on you. You have the right to request its deletion. You do not have the right to request a refund on morale — the exchange is final.",
      "All requests must be submitted on DA Form 4856 (counseling) with a minimum of four endorsing signatures. We do not process DA Form 4856.",
    ],
  },
  {
    heading: "4. Classification Markings We Completely Made Up",
    body: [
      "You will see markings like UNCLASSIFIED // FOUO, SECRET // NOFORN // COYOTE, and CLASSIFIED // BELOW THE THREAD COUNT. None of these markings are real. We made them up for ambiance. Do not attempt to invoke them in a FOIA request.",
    ],
  },
  {
    heading: "5. Third-Party Sharing (Only with Command)",
    body: [
      "We share aggregated shopping data with our leadership team (see: Command Staff page) for the sole purpose of them muttering about the state of the modern force. No individually identifiable data leaves our system, unless a Sergeant Major requests it, in which case it leaves our system immediately.",
    ],
  },
  {
    heading: "6. Data Retention (Until the End of Your Enlistment, Spiritually)",
    body: [
      "We retain your data for the duration of your current term of enlistment, or seven years, whichever is more inconvenient for you. Upon separation, retirement, or quiet disappearance, your data is archived in a filing cabinet in a basement at Fort Meade, where we assume it will be fine.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl text-primary uppercase tracking-widest mb-6">Privacy Policy</h1>

          <div className="border-2 border-accent bg-accent/5 p-5 mb-8">
            <p className="font-heading uppercase tracking-widest text-accent mb-2 text-sm">Umbrella Policy</p>
            <p className="text-foreground/90 text-sm">
              The authoritative privacy policy for all Specific Industries properties — including Squared Away Supply Co.
              — is published at{" "}
              <a href="https://specificindustries.com/privacy" className="underline hover:text-accent">
                specificindustries.com/privacy
              </a>
              . It governs all data handling. The content below is satirical, non-binding, and intended for entertainment.
            </p>
          </div>

          <div className="space-y-7">
            {SECTIONS.map((s) => (
              <section key={s.heading}>
                <h2 className="font-heading text-xl text-primary uppercase tracking-wide mb-2">{s.heading}</h2>
                <div className="space-y-3 text-foreground/90">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-primary/60 mt-10">
            Last updated: 2026-04-15 · UNCLASSIFIED // FOUO
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create terms.tsx**

Create `src/sites/squaredaway/pages/terms.tsx`:

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Service — Squared Away Supply Co.",
  description:
    "Terms of service for the Official Unofficial Post Exchange. Umbrella terms at specificindustries.com/terms are authoritative.",
}

const SECTIONS: Array<{ heading: string; body: string[] }> = [
  {
    heading: "1. Enlistment in These Terms",
    body: [
      "By purchasing any product from Squared Away Supply Co., you voluntarily enlist in these terms for a period of indefinite duration. There is no early separation option. Satisfactory completion of these terms is not guaranteed, but satisfactory completion is not the goal.",
    ],
  },
  {
    heading: "2. Acceptable Use of the PX",
    body: [
      "The following uses are acceptable: personal consumption, gift-giving, field-environment cosplay, and reenlistment bonuses. The following uses are not acceptable: reselling to military members at inflated prices, using the crayon product as structural support, and using the invisibility cloak to avoid your first sergeant.",
    ],
  },
  {
    heading: "3. Returns, Exchanges, and the Grief Process",
    body: [
      "All sales are final. Returns are accepted only under duress, and only during the narrow window between Kübler-Ross Stage 3 (Bargaining) and Stage 4 (Depression). Exchanges are welcome and may be processed by a representative with the title 'Specialist' or higher.",
    ],
  },
  {
    heading: "4. Limitation of Morale",
    body: [
      "Squared Away Supply Co. makes no representation as to actual morale impact. Morale Points (MP) accrued through the Morale Program™ are notional, non-transferable, and have no cash value, even to us. The 'illusion of meaning' reward at the O-10 tier is for entertainment purposes and is not, in fact, a redeemable prize. It will not ship in 6-8 weeks. It will not ship.",
    ],
  },
  {
    heading: "5. Indemnification Against Cross-Branch Heckling",
    body: [
      "Every product sold on this site contains at least one heckle directed at a rival service branch. By completing a purchase, you accept that the heckle is both your inheritance and your burden. Squared Away Supply Co. is not liable for any argument you start with a sibling who is in a different branch.",
    ],
  },
  {
    heading: "6. Governing Law (DoD, Probably)",
    body: [
      "These terms are governed by the laws of the Department of Defense, where applicable, and by common sense, where not. Disputes shall be resolved by a panel of three Sergeants Major at 0600, outdoors, in the rain. Decisions are final.",
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl text-primary uppercase tracking-widest mb-6">Terms of Service</h1>

          <div className="border-2 border-accent bg-accent/5 p-5 mb-8">
            <p className="font-heading uppercase tracking-widest text-accent mb-2 text-sm">Umbrella Terms</p>
            <p className="text-foreground/90 text-sm">
              The authoritative terms of service for all Specific Industries properties — including Squared Away Supply
              Co. — are published at{" "}
              <a href="https://specificindustries.com/terms" className="underline hover:text-accent">
                specificindustries.com/terms
              </a>
              . They govern all commercial relationships. The content below is satirical, non-binding, and intended for
              entertainment.
            </p>
          </div>

          <div className="space-y-7">
            {SECTIONS.map((s) => (
              <section key={s.heading}>
                <h2 className="font-heading text-xl text-primary uppercase tracking-wide mb-2">{s.heading}</h2>
                <div className="space-y-3 text-foreground/90">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-primary/60 mt-10">
            Last updated: 2026-04-15 · UNCLASSIFIED // FOUO
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Typecheck + commit**

Run: `npx tsc --noEmit`

```bash
git add src/sites/squaredaway/pages/privacy.tsx src/sites/squaredaway/pages/terms.tsx
git commit -m "feat(squaredaway): add privacy and terms (umbrella + satire body)"
```

---

## Task 19: Barrel + registry + sitemap wiring

**Files:**
- Create: `src/sites/squaredaway/index.ts`
- Modify: `src/sites/registry.ts`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Create the site barrel**

Create `src/sites/squaredaway/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"

import Home from "./pages/home"
import Army from "./pages/army"
import Navy from "./pages/navy"
import AirForce from "./pages/airforce"
import Marines from "./pages/marines"
import ProductDetail from "./pages/product-detail"
import Morale, { metadata as moraleMetadata } from "./pages/morale"
import Authorization, { metadata as authorizationMetadata } from "./pages/authorization"
import Faq, { metadata as faqMetadata } from "./pages/faq"
import Leadership, { metadata as leadershipMetadata } from "./pages/leadership"
import Contact, { metadata as contactMetadata } from "./pages/contact"
import Privacy, { metadata as privacyMetadata } from "./pages/privacy"
import Terms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": Home,
  army: Army,
  navy: Navy,
  airforce: AirForce,
  marines: Marines,
  morale: { component: Morale, metadata: moraleMetadata },
  authorization: { component: Authorization, metadata: authorizationMetadata },
  faq: { component: Faq, metadata: faqMetadata },
  leadership: { component: Leadership, metadata: leadershipMetadata },
  contact: { component: Contact, metadata: contactMetadata },
  privacy: { component: Privacy, metadata: privacyMetadata },
  terms: { component: Terms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? {
            title: `${product.name} — Squared Away Supply Co.`,
            description: product.tagline,
            ogImage: product.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 2: Register in siteRegistry**

Edit `src/sites/registry.ts`.

Add import (with the other imports):
```typescript
import { config as squaredawayConfig, pages as squaredawayPages, dynamicRoutes as squaredawayDynamicRoutes } from "./squaredaway"
```

Add entry to `siteRegistry` object:
```typescript
squaredaway: { config: squaredawayConfig, pages: squaredawayPages, dynamicRoutes: squaredawayDynamicRoutes },
```

- [ ] **Step 3: Add to sitemap**

Edit `src/app/sitemap.ts`.

Add import (with the other product imports, e.g., after `rocksProducts`):
```typescript
import { products as squaredawayProducts } from "@/sites/squaredaway/data/products"
```

Add to `productSites` object:
```typescript
squaredaway: squaredawayProducts,
```

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc --noEmit`
Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/sites/squaredaway/index.ts src/sites/registry.ts src/app/sitemap.ts
git commit -m "feat(squaredaway): wire site into registry and sitemap"
```

---

## Task 20: Hero + logo + branch banner images

**Files:**
- Create (via image-gen): `public/sites/squaredaway/hero.png`
- Create (via image-gen): `public/sites/squaredaway/logo.png`
- Create (via image-gen): `public/sites/squaredaway/branch-army.png`
- Create (via image-gen): `public/sites/squaredaway/branch-navy.png`
- Create (via image-gen): `public/sites/squaredaway/branch-airforce.png`
- Create (via image-gen): `public/sites/squaredaway/branch-marines.png`

Use `mcp__image-gen__generate_image` for each. All images share a consistent "government catalog photography" aesthetic: olive drab + manila cream palette, stencil typography feel, clean composition, no real DoD insignia or copyrighted seals.

- [ ] **Step 1: Generate hero**

Size: 1536x1024. Prompt:

> A vintage-modern faux-official Post Exchange storefront at dusk. Olive drab (#4B5320) awning with stenciled white text reading "SQUARED AWAY SUPPLY CO. — POST EXCHANGE." Large front windows showing abstract silhouettes of products on shelves inside. A bureaucratic black-and-white sign on the glass reading "NOW SERVING: E-1 THROUGH O-10." Background is overcast military-base parking lot with a lamp post and a low-slung admin building. Manila cream sky. Photorealistic, warm tungsten light spilling through the windows. No people in frame. No real branch logos or DoD insignia.

Save to `public/sites/squaredaway/hero.png`.

- [ ] **Step 2: Generate logo**

Size: 1024x1024. Prompt:

> A faux-official military-procurement logo for "SQUARED AWAY SUPPLY CO." Stenciled olive drab circle emblem on a manila cream background. Inside the circle: a stylized crossed compass and rifle (no visible mechanism), below them a scroll that reads "MORALE IS A METRIC." Surrounding the circle in a half-ring: "POST EXCHANGE · EST. MMXXVI." Bold stenciled lettering, slight ink-stamp grit. No real branch insignia.

Save to `public/sites/squaredaway/logo.png`.

- [ ] **Step 3: Generate branch-army**

Size: 1536x864. Prompt:

> A wide editorial banner image of a miserable, muddy training field at Fort Polk-style swampland. Foreground: a single ALICE-era rucksack propped against a wooden picket. Overcast sky. Olive drab and mud-brown palette. Stenciled footer strip along the bottom left reading "ARMY · COMPONENT: LAND." Photorealistic, quiet gray tones, intentionally un-glamorous. No visible soldiers or real insignia.

Save to `public/sites/squaredaway/branch-army.png`.

- [ ] **Step 4: Generate branch-navy**

Size: 1536x864. Prompt:

> A wide editorial banner image of a haze-gray naval deck at sea, photographed from a low angle. Foreground: a single dented enameled white coffee mug on a railing. Horizon with gray overcast ocean. Riveted haze-gray steel bulkhead. Stenciled footer strip along the bottom left reading "NAVY · COMPONENT: SEA." Photorealistic, cold blue-gray palette with cream steam rising from the mug. No visible personnel or real insignia.

Save to `public/sites/squaredaway/branch-navy.png`.

- [ ] **Step 5: Generate branch-airforce**

Size: 1536x864. Prompt:

> A wide editorial banner image of a tastefully carpeted conference room with a floor-to-ceiling window showing a commercial airliner taxiing in the distance. Foreground: a leather ergonomic office chair, a ceramic coffee mug, and a laptop bag. Warm beige and sage palette. Stenciled footer strip along the bottom left reading "AIR FORCE · COMPONENT: AIR (INDOORS)." Photorealistic, golden-hour light, unapologetically comfortable. No visible personnel or real insignia.

Save to `public/sites/squaredaway/branch-airforce.png`.

- [ ] **Step 6: Generate branch-marines**

Size: 1536x864. Prompt:

> A wide editorial banner image of a sun-bleached MARPAT-patterned tent at a desert training area, mid-afternoon. Foreground: a half-opened box of unbranded crayons spilling onto a folding mess table. Warm sand and olive tones. Stenciled footer strip along the bottom left reading "MARINES · COMPONENT: LAND (VIOLENT)." Photorealistic, harsh overhead sunlight, a faint breeze moving the tent flap. No visible personnel or real insignia.

Save to `public/sites/squaredaway/branch-marines.png`.

- [ ] **Step 7: Commit**

```bash
git add public/sites/squaredaway/hero.png public/sites/squaredaway/logo.png public/sites/squaredaway/branch-army.png public/sites/squaredaway/branch-navy.png public/sites/squaredaway/branch-airforce.png public/sites/squaredaway/branch-marines.png
git commit -m "feat(squaredaway): add hero, logo, and branch banner images"
```

---

## Task 21: Leadership portraits (4 images)

**Files:**
- Create (via image-gen): `public/sites/squaredaway/leadership-hardcastle.png`
- Create (via image-gen): `public/sites/squaredaway/leadership-blackwell.png`
- Create (via image-gen): `public/sites/squaredaway/leadership-lindgren.png`
- Create (via image-gen): `public/sites/squaredaway/leadership-maddox.png`

Use `mcp__image-gen__generate_image_with_person` with the base reference photos of bill, brandon, jim, and sean respectively. Check `base-images/` directory (or `scripts/` directory) for the reference-photo file names used by other sites; these are already conventional for the repo.

All portraits: 1024x1280, formal command-portrait framing, shoulders-up, solid backdrop. No real branch insignia — use generic stylization.

- [ ] **Step 1: List base images**

Run: `mcp__image-gen__list_base_images`
Pick the current canonical reference photo for each of bill, brandon, jim, sean. Note the file names.

- [ ] **Step 2: Generate Hardcastle (bill, Army)**

Prompt base:
> A formal oil-painted command portrait of a retired four-star US Army general. Class-A-style uniform (stylized, no specific real insignia) with multiple ribbons over the left chest and shoulder rank stars. Solid deep navy backdrop. Stoic, neutral expression, direct gaze into camera. Warm studio lighting. Shoulders-up framing. Slightly painterly quality. No visible flag, no real branch seal, no text overlays.

Person reference: bill.

Save to `public/sites/squaredaway/leadership-hardcastle.png`.

- [ ] **Step 3: Generate Blackwell (brandon, Navy)**

Prompt base:
> A formal portrait of a retired US Navy admiral in a stylized white dress uniform with gold rank stripes on the cuffs (generic styling, no real insignia). Solid charcoal backdrop with soft studio lighting. Stoic expression, direct gaze, shoulders-up framing. Slightly glossy photographic quality. No real branch seal, no text overlays.

Person reference: brandon.

Save to `public/sites/squaredaway/leadership-blackwell.png`.

- [ ] **Step 4: Generate Lindgren (jim, Air Force)**

Prompt base:
> A formal portrait of a retired US Air Force colonel in Service Dress Blues (stylized, no real insignia), shoulders-up, against a soft beige studio backdrop. Golden-hour warm lighting. Calm, slightly amused expression. Polished, magazine-quality photographic finish. No real branch seal, no text overlays.

Person reference: jim.

Save to `public/sites/squaredaway/leadership-lindgren.png`.

- [ ] **Step 5: Generate Maddox (sean, Marines)**

Prompt base:
> A formal portrait of a US Marine Corps Sergeant Major in dress blues (stylized, no real insignia) with a red NCO blood stripe visible on the pants cuff at the edge of the frame. High-and-tight haircut, intense direct gaze, jaw set. Deep crimson backdrop, dramatic studio lighting, shoulders-up framing. Slightly painterly, formal portrait quality. No real branch seal, no text overlays.

Person reference: sean.

Save to `public/sites/squaredaway/leadership-maddox.png`.

- [ ] **Step 6: Commit**

```bash
git add public/sites/squaredaway/leadership-hardcastle.png public/sites/squaredaway/leadership-blackwell.png public/sites/squaredaway/leadership-lindgren.png public/sites/squaredaway/leadership-maddox.png
git commit -m "feat(squaredaway): add leadership portraits (themed rethemes of base photos)"
```

---

## Task 22: Army product images (8)

**Files:**
- Create (via image-gen): 8 PNGs at `public/sites/squaredaway/product-<slug>.png`

Use `mcp__image-gen__generate_image`. All product images share an aesthetic: **manila cream backdrop (`#F5EFE0`), soft top-down or slightly angled product photography, hand-stamped stenciled label in olive drab on the product or tag, single hero subject centered, no text claims beyond stenciled name on the label.** Standard size: 1024x1024.

The slugs: `grunts-embrace`, `mre-pairing-flight-fort-polk`, `ucp-invisibility-cloak`, `sergeant-major-mustache-kit`, `artisanal-field-mud`, `hooah-bar`, `rucking-enrichment-stones`, `powerpoint-of-the-month-club`.

- [ ] **Step 1: grunts-embrace**

> A square product shot of a heavy-looking tactical pillow, roughly 18x14 inches, made from Universal Camouflage Pattern (UCP-style pixellated gray-green camo, stylized) stretched over reinforced MOLLE webbing. A stenciled olive-drab paper tag hangs from one corner reading "THE GRUNT'S EMBRACE · NSN 8465-69-420-MRE." Subtle dust on the surface. Warm tungsten studio light, soft shadow, centered on manila cream backdrop. Photorealistic.

- [ ] **Step 2: mre-pairing-flight-fort-polk**

> A square product shot of four MRE pouches arranged in a flight-board row like a wine tasting: Chili Mac, Beef Stew, Veggie Omelet, Jalapeño Pepper Pouch. Each pouch is tan brown military-issue with a hand-stenciled olive label identifying its contents. In front of the pouches, four small shot glasses of water for palate cleansing. Manila cream backdrop. Warm studio light, photorealistic.

- [ ] **Step 3: ucp-invisibility-cloak**

> A square product shot of a folded camouflage cloak in Universal Camouflage Pattern (UCP-style gray-green pixel camo, stylized) on a neutral manila cream backdrop. A stenciled olive-drab tag on a string reads "UCP CLASSIC · COMMEMORATIVE INVISIBILITY CLOAK · NSN 8415-UCP-FAIL." Folded with careful military precision. Soft top-down studio light.

- [ ] **Step 4: sergeant-major-mustache-kit**

> A square product shot of a dark wooden grooming kit tray containing a small tin of amber mustache wax, a fine-toothed black comb, and a small gold-framed certificate of achievement for "Exceptional Facial Grooming." Manila cream backdrop. Warm studio light, photorealistic.

- [ ] **Step 5: artisanal-field-mud**

> A square product shot of a one-gallon clear glass jar labeled with a hand-stenciled olive drab paper label reading "ARTISANAL FIELD MUD · FORT POLK · 1 GAL." Filled with rich brown viscous mud. Beside it, a small wooden paddle for ceremonial stirring. Manila cream backdrop. Warm soft studio light.

- [ ] **Step 6: hooah-bar**

> A square product shot of a single luxurious artisanal energy bar in a kraft-paper wrapper with a stenciled olive drab label reading "THE HOOAH BAR · NSN 8940-HOOAH-01 · $89." The wrapper is slightly torn open at one end, revealing the dense dark-brown bar inside. Manila cream backdrop. Warm studio light, photorealistic.

- [ ] **Step 7: rucking-enrichment-stones**

> A square product shot of six rectangular gray concrete bricks arranged in a neat 3x2 grid, each etched with a single stenciled word: "DISCIPLINE," "REGRET," "HOOAH," "BROTHERHOOD," "FOOT PAIN," "RETIREMENT." Manila cream backdrop. Soft top-down studio light. Photorealistic.

- [ ] **Step 8: powerpoint-of-the-month-club**

> A square product shot of a stack of three manila folders labeled "SHARP — APRIL," "OPSEC — MAY," "SUICIDE PREVENTION — JUNE," each bound with red "CLASSIFIED" tape (stenciled stylized). On top of the stack, a cheap plastic thumb drive. Manila cream backdrop. Warm studio light, photorealistic.

- [ ] **Step 9: Commit**

```bash
git add public/sites/squaredaway/product-grunts-embrace.png public/sites/squaredaway/product-mre-pairing-flight-fort-polk.png public/sites/squaredaway/product-ucp-invisibility-cloak.png public/sites/squaredaway/product-sergeant-major-mustache-kit.png public/sites/squaredaway/product-artisanal-field-mud.png public/sites/squaredaway/product-hooah-bar.png public/sites/squaredaway/product-rucking-enrichment-stones.png public/sites/squaredaway/product-powerpoint-of-the-month-club.png
git commit -m "feat(squaredaway): add army product images (8)"
```

---

## Task 23: Navy product images (8)

**Files:**
- Create 8 PNGs: `chiefs-coffee-dark-deployment`, `goat-locker-soap`, `deployment-beard-oil`, `dixie-cup-storage-system`, `shellback-coaster-set`, `sub-school-pillowcase`, `liberty-call-regret-planner`, `haze-gray-touchup-kit`.

Same aesthetic as Task 22.

- [ ] **Step 1: chiefs-coffee-dark-deployment**

> A square product shot of a matte-black coffee bag labeled "CHIEF'S COFFEE · DARK DEPLOYMENT ROAST · GROUND ON THE FLIGHT DECK · NSN 8955-NAV-JOE-01" in stenciled olive drab. The bag is slightly propped. Beside it, a dented enameled white Navy-style mug filled with coffee. Manila cream backdrop, warm studio light.

- [ ] **Step 2: goat-locker-soap**

> A square product shot of a cream-colored bar of soap carved into the shape of a small standing goat, resting on a dark wooden soap dish. Beside it, an olive-drab paper tag reading "GOAT LOCKER · MEMBERSHIP SOAP · NSN 8520-CPO-GOAT." Manila cream backdrop, soft studio light.

- [ ] **Step 3: deployment-beard-oil**

> A square product shot of a small amber glass bottle with a black dropper top, labeled "THE 7-MONTH DEPLOYMENT · BEARD OIL" in stenciled olive drab. Beside it, a small burlap pouch and a wooden comb. Manila cream backdrop, warm studio light.

- [ ] **Step 4: dixie-cup-storage-system**

> A square product shot of an over-engineered stainless-steel pedestal display case containing a single white Navy "Dixie cup" sailor hat. The case has a glass dome, soft interior lighting, and a stenciled olive-drab label reading "DIXIE CUP HAT STORAGE SYSTEM · NSN 8405-DIX-STOR." Manila cream backdrop.

- [ ] **Step 5: shellback-coaster-set**

> A square product shot of a set of four round cork-and-metal coasters arranged in a fan. Each coaster is embossed with a different Shellback-themed motif: a trident, a crossing-the-line certificate scroll, a sea turtle, and "1st CROSSING." Manila cream backdrop, warm studio light.

- [ ] **Step 6: sub-school-pillowcase**

> A square product shot of a jet-black pillowcase neatly folded into a square, with a stenciled olive-drab tag reading "SUB SCHOOL PILLOWCASE · BLACKOUT EDITION · NSN 7210-SUB-DARK." Manila cream backdrop, subtle blue rim light, photorealistic.

- [ ] **Step 7: liberty-call-regret-planner**

> A square product shot of a small black leather-bound 7-day planner, open to a page where every day of the week reads only the single word "REGRET." A stenciled olive-drab tag beside it reads "LIBERTY CALL · REGRET PLANNER." Manila cream backdrop, warm studio light.

- [ ] **Step 8: haze-gray-touchup-kit**

> A square product shot of a battered one-quart metal paint can labeled "HAZE GRAY · TOUCH-UP · NSN 8010-GRAY-HAZ" in stenciled white. Beside it, a small wire brush and a folded recipe card titled "CHIP & PAINT SATURDAYS." Manila cream backdrop, warm studio light.

- [ ] **Step 9: Commit**

```bash
git add public/sites/squaredaway/product-chiefs-coffee-dark-deployment.png public/sites/squaredaway/product-goat-locker-soap.png public/sites/squaredaway/product-deployment-beard-oil.png public/sites/squaredaway/product-dixie-cup-storage-system.png public/sites/squaredaway/product-shellback-coaster-set.png public/sites/squaredaway/product-sub-school-pillowcase.png public/sites/squaredaway/product-liberty-call-regret-planner.png public/sites/squaredaway/product-haze-gray-touchup-kit.png
git commit -m "feat(squaredaway): add navy product images (8)"
```

---

## Task 24: Air Force product images (8)

**Files:**
- Create 8 PNGs: `premium-deployment-concierge-kit`, `chair-force-ergonomic-chair`, `qatar-package`, `base-housing-carpet-sampler`, `flight-suit-cashmere-loungewear`, `pt-test-completion-medal`, `premium-mre-af-variant`, `on-base-golf-course-keychain`.

Same aesthetic as prior tasks, with a slight lean toward lifestyle-boutique styling for AF products (they're premium; the image should say so).

- [ ] **Step 1: premium-deployment-concierge-kit**

> A square product shot of an open dark-navy luxury travel kit bag on a plush manila cream cloth, revealing a curated array of comfort items: a cashmere neck pillow, a silk eye mask, a Panera-style beige cafe loyalty card (stylized, no real brand), small aromatherapy vials, and a folded robe. An olive-drab paper tag reads "PREMIUM DEPLOYMENT CONCIERGE KIT." Manila cream backdrop, warm studio light.

- [ ] **Step 2: chair-force-ergonomic-chair**

> A square product shot of an Aeron-style high-end ergonomic office chair in sage-green mesh and matte black frame, angled slightly toward the camera, against a manila cream backdrop with soft studio lighting. A stenciled olive-drab floor tag beside the base reads "CHAIR FORCE · ERGONOMIC DEPLOYMENT CHAIR."

- [ ] **Step 3: qatar-package**

> A square product shot of a hotel-welcome-basket-style arrangement on a manila cream surface: a coffee-shop gift card (stylized generic, no real logo), a pair of hotel slippers, a folded white robe, travel toiletries in chic mini bottles, and a small potted succulent. An olive-drab tag reads "THE QATAR PACKAGE · NSN AF-QAT-8990-PKG." Warm studio light.

- [ ] **Step 4: base-housing-carpet-sampler**

> A square product shot of seventeen small carpet swatches fanned out like paint chips, each a different shade of beige (taupe, cream, oatmeal, sand, fawn, etc.), numbered 1 through 17 with tiny stenciled labels. Manila cream backdrop, soft studio light, photorealistic.

- [ ] **Step 5: flight-suit-cashmere-loungewear**

> A square product shot of a softly lit folded sage-green cashmere flight suit (one-piece loungewear), neatly placed on a manila cream surface with a small olive-drab paper tag reading "FLIGHT SUIT · CASHMERE · HAND WASH ONLY." Boutique-style photography, warm studio light.

- [ ] **Step 6: pt-test-completion-medal**

> A square product shot of a generic round participation-style gold medal hanging from a blue-and-white striped ribbon, engraved at the center with "PT TEST · 75% · COMPLETION." The medal is slightly oversized for its achievement. Manila cream backdrop, warm studio light, photorealistic.

- [ ] **Step 7: premium-mre-af-variant**

> A square product shot of an MRE plated as fine dining: beige ceramic bowl holding the stew neatly, a small sprig of parsley on top, a tall craft-seltzer bottle with a minimalist stenciled "AF VARIANT" label, and a linen napkin. Manila cream backdrop, warm studio light, photorealistic.

- [ ] **Step 8: on-base-golf-course-keychain**

> A square product shot of a polished gold-toned keychain in the shape of a tiny golf bag, attached to a small leather fob stamped "ON-BASE GOLF · 17 COURSES." Manila cream backdrop, warm studio light.

- [ ] **Step 9: Commit**

```bash
git add public/sites/squaredaway/product-premium-deployment-concierge-kit.png public/sites/squaredaway/product-chair-force-ergonomic-chair.png public/sites/squaredaway/product-qatar-package.png public/sites/squaredaway/product-base-housing-carpet-sampler.png public/sites/squaredaway/product-flight-suit-cashmere-loungewear.png public/sites/squaredaway/product-pt-test-completion-medal.png public/sites/squaredaway/product-premium-mre-af-variant.png public/sites/squaredaway/product-on-base-golf-course-keychain.png
git commit -m "feat(squaredaway): add air force product images (8)"
```

---

## Task 25: Marines product images (8)

**Files:**
- Create 8 PNGs: `culinary-coloring-sticks`, `jarhead-precision-haircut-kit`, `oorah-vocal-training-course`, `regulation-crying-towel`, `semper-fi-diy-tattoo-kit`, `sand-rations`, `chestys-bulldog-morale-companion`, `marpat-throw-pillow-set`.

- [ ] **Step 1: culinary-coloring-sticks** (the crayon hero shot)

> A square product shot of a hinged MARPAT-patterned (woodland) tin, lid open, revealing twelve individually wrapped crayons in rainbow colors. A stenciled olive-drab label on the lid reads "PREMIUM CULINARY COLORING STICKS · MIL-STD-OORAH · USMC-CRY-8940-12PK." One crayon rests outside the tin with a single bite taken from it. Manila cream backdrop, warm studio light, photorealistic.

- [ ] **Step 2: jarhead-precision-haircut-kit**

> A square product shot of a black clipper set with a single metal guard attached, resting on a canvas roll-up pouch, with a small stenciled olive-drab tag reading "JARHEAD PRECISION · ONE SETTING." Manila cream backdrop, warm studio light.

- [ ] **Step 3: oorah-vocal-training-course**

> A square product shot of a vinyl-record-style package containing a pair of large black over-ear headphones and a thick spiral-bound workbook titled "OORAH VOCAL TRAINING · VOL. 1 — ONE SYLLABLE." A stenciled olive-drab label is visible. Manila cream backdrop, warm studio light.

- [ ] **Step 4: regulation-crying-towel**

> A square product shot of a neatly folded sage-green towel with a stenciled olive-drab corner label reading "REGULATION CRYING TOWEL · USMC · MIL-STD-DAMP." A single unexplained tear droplet rests on its surface. Manila cream backdrop, warm studio light.

- [ ] **Step 5: semper-fi-diy-tattoo-kit**

> A square product shot of a small wooden kit box with its lid open, revealing black tattoo ink vials, stick-and-poke needles, alcohol wipes, and six small laminated stencils (an EGA, a bulldog, a heart with "MOM," "SEMPER FI," "USMC 0311," and an anchor that says "USN"). A stenciled olive-drab tag reads "SEMPER FI · DIY TATTOO KIT." Manila cream backdrop.

- [ ] **Step 6: sand-rations**

> A square product shot of a 5-pound burlap sack of fine golden desert sand, tied with twine, with a stamped olive-drab paper label reading "SAND RATIONS · CAMP PENDLETON · 5 LB · NSN USMC-SND-8970-5LB." A small scoop rests beside it. Manila cream backdrop, warm studio light.

- [ ] **Step 7: chestys-bulldog-morale-companion**

> A square product shot of a plush English bulldog figurine dressed in stylized Marine dress-blues-style attire (no real insignia), seated upright on a small pedestal with a stenciled olive-drab tag reading "CHESTY · MORALE COMPANION · SHAKE FOR OORAH." Manila cream backdrop, warm studio light, photorealistic.

- [ ] **Step 8: marpat-throw-pillow-set**

> A square product shot of four square throw pillows stacked in a pyramid: two in desert MARPAT-style tan pixel camo and two in woodland MARPAT-style green pixel camo. A stenciled olive-drab tag reads "MARPAT THROW PILLOW SET · 4-PACK." Manila cream backdrop, soft studio light.

- [ ] **Step 9: Commit**

```bash
git add public/sites/squaredaway/product-culinary-coloring-sticks.png public/sites/squaredaway/product-jarhead-precision-haircut-kit.png public/sites/squaredaway/product-oorah-vocal-training-course.png public/sites/squaredaway/product-regulation-crying-towel.png public/sites/squaredaway/product-semper-fi-diy-tattoo-kit.png public/sites/squaredaway/product-sand-rations.png public/sites/squaredaway/product-chestys-bulldog-morale-companion.png public/sites/squaredaway/product-marpat-throw-pillow-set.png
git commit -m "feat(squaredaway): add marines product images (8, incl. crayon hero)"
```

---

## Task 26: Final verification

**Files:**
- No code changes — verification only.

- [ ] **Step 1: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds. All 12 site-specific pages + 32 product detail pages render.

- [ ] **Step 4: Dev smoke test**

Run: `npm run dev` (in one terminal)

Visit each of these URLs and confirm the page renders without console errors:

- `http://localhost:3000/?site=squaredaway` (home)
- `http://localhost:3000/army?site=squaredaway`
- `http://localhost:3000/navy?site=squaredaway`
- `http://localhost:3000/airforce?site=squaredaway`
- `http://localhost:3000/marines?site=squaredaway`
- `http://localhost:3000/products/grunts-embrace?site=squaredaway`
- `http://localhost:3000/products/culinary-coloring-sticks?site=squaredaway`
- `http://localhost:3000/products/premium-deployment-concierge-kit?site=squaredaway`
- `http://localhost:3000/products/chiefs-coffee-dark-deployment?site=squaredaway`
- `http://localhost:3000/morale?site=squaredaway`
- `http://localhost:3000/authorization?site=squaredaway`
- `http://localhost:3000/faq?site=squaredaway`
- `http://localhost:3000/leadership?site=squaredaway`
- `http://localhost:3000/contact?site=squaredaway`
- `http://localhost:3000/privacy?site=squaredaway`
- `http://localhost:3000/terms?site=squaredaway`

For each: confirm hero/imagery loads, typography reads correctly (Black Ops One on headings), navigation is present, and cart button works on branch/product pages.

- [ ] **Step 5: Commerce smoke test**

- On `/products/grunts-embrace?site=squaredaway`, click Add to Cart. Confirm the toast fires with one of the stenciled quips, and the header cart badge increments.
- Visit `/cart?site=squaredaway`. Confirm the item appears.
- Visit `/checkout?site=squaredaway`. Confirm the shared checkout page renders.

- [ ] **Step 6: Report**

If all checks pass, the implementation is complete. Summarize in a final message:
- Total pages: 12 site-specific + 32 product detail + shared cart/checkout.
- Total images: 42.
- Any deviations from spec / known limitations.

No commit for this task unless a verification step reveals an issue that requires a fix — in which case, fix it in a new commit.

---

## Notes and conventions

- **Commit early, commit often.** Each task in this plan produces at least one commit. Do not batch tasks into a single commit.
- **Push directly to `main`** (per project memory). No feature branches.
- **Image generation is allowed to use creative interpretation.** If a generated image is off-brand, regenerate once; otherwise accept and move on.
- **No real DoD insignia, real branch seals, or copyrighted imagery.** Every faux-official element must be original/stylized.
- **Voltage consistency:** every product card/detail page must carry the deadpan bureaucratic shell + one cross-branch jab. If copy drifts into sincerity, rewrite.
- **The crayon product is the anchor gag.** If only one Marines product is perfectly written, it must be `culinary-coloring-sticks`.
- **If the `FaqAccordion` component exists and fits,** use it in Task 15 instead of the inline `<details>` markup.
