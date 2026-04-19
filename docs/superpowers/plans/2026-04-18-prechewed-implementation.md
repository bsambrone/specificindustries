# Prechewed™ Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `prechewed` subdomain — an SV-productivity-wellness satire startup selling 28 SKUs of pre-chewed food pouches (flagship Daily Bolus + 26 cuisine-coded + waitlist Founder's Reserve), plus 6 editorial-style press articles. Commerce-enabled with `localStorage` cart.

**Architecture:** Self-contained site under `src/sites/prechewed/` following the established `SiteModule` pattern (config, pages, dynamicRoutes). Two dynamic routes: `/products/[slug]` and `/press/[slug]`. Reuses existing shared components (Hero, ProductCard, FaqAccordion, TeamMember, StatStrip, MetricCounter, etc.) and adds 6 site-local components. Images generated post-build via a dedicated script.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, OpenAI gpt-image-1 for image generation, existing platform shared components.

**Spec:** `docs/superpowers/specs/2026-04-18-prechewed-design.md`

**Verification posture:** Platform uses no automated unit tests. Each task ending in a build-affecting change verifies with `npx tsc --noEmit`, `npm run lint`, and — at milestones — `npm run build` + manual browser checks at `localhost:3000/?site=prechewed`.

---

## File Structure

```
src/sites/prechewed/
├── config.ts
├── index.ts
├── data/
│   ├── products.ts
│   ├── leadership.ts
│   └── press.ts
├── components/
│   ├── bolus-compatibility-meter.tsx
│   ├── medical-callout.tsx
│   ├── cert-badge.tsx
│   ├── waitlist-button.tsx
│   ├── press-article.tsx
│   └── press-article-card.tsx
└── pages/
    ├── home.tsx
    ├── products.tsx
    ├── product-detail.tsx
    ├── bolus.tsx
    ├── science.tsx
    ├── process.tsx
    ├── faq.tsx
    ├── press.tsx
    ├── press-detail.tsx
    ├── about.tsx
    ├── leadership.tsx
    ├── contact.tsx
    ├── privacy.tsx
    ├── terms.tsx
    ├── cart.tsx
    └── checkout.tsx

public/sites/prechewed/
   # favicon.png + generated images (pouches, exec portraits, press heroes, hero shots)

src/sites/registry.ts                  # register prechewed
src/sites/subdomains.ts                # add to VALID_SUBDOMAINS
src/app/sitemap.ts                     # add product slugs + press slugs
scripts/resize-favicons.mjs            # add prechewed
scripts/generate-prechewed-images.ts   # new — all image assets
```

---

## Task Breakdown Overview

- **Tasks 1–3:** Platform wiring (config, subdomain allowlist, registry)
- **Tasks 4–6:** Data files (products, leadership, press)
- **Tasks 7–12:** Site-local components
- **Tasks 13–27:** Pages (13 static + 2 dynamic routes)
- **Task 28:** Sitemap entries (products + press)
- **Task 29:** Cart + Checkout page shims
- **Task 30:** Favicon wiring + placeholder assets
- **Task 31:** Image generation script
- **Task 32:** Final verification + build

---

### Task 1: Create Prechewed site config

**Files:**
- Create: `src/sites/prechewed/config.ts`

- [ ] **Step 1: Write config.ts**

```ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Prechewed™",
  subdomain: "prechewed",
  theme: {
    preset: "startup",
    colors: {
      primary: "#5B3FD9",       // electric violet / deep indigo
      secondary: "#0F0E1A",     // near-black
      accent: "#EFA339",         // warm amber (limited drop / premium tags only — never on light surfaces as body text)
      background: "#FAFAF7",     // warm near-white, bone-adjacent
      text: "#0F0E1A",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Prechewed™ — You have better things to do with your mouth.",
    description: "Pre-Oral Hydrolysis™ in a pouch. 8.3× nutrient bioavailability. 47 days reclaimed annually. The Daily Bolus and 27 other pouches, pre-chewed for you.",
    ogImage: "/sites/prechewed/hero.png",
  },
  nav: [
    { label: "Products", path: "/products" },
    { label: "Daily Bolus", path: "/bolus" },
    { label: "Science", path: "/science" },
    { label: "Process", path: "/process" },
    { label: "Press", path: "/press" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "health-wellness",
  tagline: "You have better things to do with your mouth.",
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS (the site isn't registered yet, but the file itself should typecheck against `SiteConfig`).

- [ ] **Step 3: Commit**

```bash
git add src/sites/prechewed/config.ts
git commit -m "feat(prechewed): add site config"
```

---

### Task 2: Register prechewed in the edge-runtime subdomain allowlist

**Files:**
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Add `"prechewed"` to VALID_SUBDOMAINS**

Append inside the array (in the existing order, at the end):

```ts
  "seeltite",
  "prechewed",
] as const
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/subdomains.ts
git commit -m "feat(prechewed): add subdomain to middleware allowlist"
```

---

### Task 3: Register prechewed in the site registry

**Files:**
- Modify: `src/sites/registry.ts`
- Create: `src/sites/prechewed/index.ts` (barrel — populated later as pages are added; this task creates a minimal scaffold)

- [ ] **Step 1: Create the minimal barrel `src/sites/prechewed/index.ts`**

```ts
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"

export { config }

// Pages and dynamicRoutes are extended as each page task is completed.
export const pages: Record<string, PageEntry> = {}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
```

- [ ] **Step 2: Add import + registry entry in `src/sites/registry.ts`**

At the bottom of the imports block, add:

```ts
import { config as prechewedConfig, pages as prechewedPages, dynamicRoutes as prechewedDynamicRoutes } from "./prechewed"
```

Inside `siteRegistry`, add at the end:

```ts
  prechewed: { config: prechewedConfig, pages: prechewedPages, dynamicRoutes: prechewedDynamicRoutes },
```

- [ ] **Step 3: Verify the dev server recognizes the site**

Run: `npm run dev`
Expected: dev server boots without errors.

Visit `http://localhost:3000/?site=prechewed` → should 404 at the page level because `pages[""]` isn't defined yet, but middleware should no longer redirect to apex. (A blank "no page" response is the expected success signal here.)

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/sites/prechewed/index.ts src/sites/registry.ts
git commit -m "feat(prechewed): scaffold site barrel and register in registry"
```

---

### Task 4: Products data (28 SKUs)

**Files:**
- Create: `src/sites/prechewed/data/products.ts`

- [ ] **Step 1: Define Product types**

```ts
export type ProductCuisine =
  | "Flagship"
  | "Breakfast"
  | "Pasta & Italian"
  | "Mains"
  | "Asian"
  | "Sandwiches"
  | "Holiday & Occasion"
  | "Limited"

export interface NutritionPanel {
  servingSize: string            // e.g. "1 pouch (128g)"
  calories: number
  jawHoursReclaimed: number      // replaces a traditional macro as a joke line
  bioavailabilityIndex: string   // e.g. "8.3×"
  bolusDensity: string           // e.g. "High"
}

export interface Product {
  slug: string
  name: string
  cuisine: ProductCuisine
  weightOz: number
  priceLabel: string             // e.g. "$28" or "Waitlist only"
  price: number | null           // dollars; null for Founder's Reserve (waitlist)
  isFlagship: boolean
  isLimited: boolean
  isFeatured: boolean            // shown on home page featured grid
  tagline: string
  description: string[]          // 2-3 long-form satirical paragraphs for detail page
  ingredients: string[]
  nutrition: NutritionPanel
  bolusCompatibility: number     // 1–10
  masticatorNote: string         // one sentence
  image: string                  // public/sites/prechewed/products/<slug>.png
}
```

- [ ] **Step 2: Author the 28 products**

Use this structure for each entry. Full payload for every product — no "TBD" placeholders:

```ts
export const products: Product[] = [
  // ─── Flagship ───────────────────────────────────────
  {
    slug: "daily-bolus",
    name: "The Daily Bolus",
    cuisine: "Flagship",
    weightOz: 4.5,
    priceLabel: "$42",
    price: 42,
    isFlagship: true,
    isLimited: false,
    isFeatured: true,
    tagline: "The complete pre-oral nutrition protocol. Breakfast, lunch, and dinner in a single pouch.",
    description: [
      "The Daily Bolus is the foundational SKU in the Prechewed™ catalog. Formulated for founders, executives, and deep-work practitioners who have decided that mealtime is, at best, an interruption.",
      "Each pouch delivers a full day's worth of Pre-Oral Hydrolysis™-prepared nutrition — macros balanced, micros bracketed, chew phase eliminated. Subscribe and reclaim up to 47 days of productive time per annum at three pouches per day.",
      "Flavor-tuned toward umami-forward, emotionally neutral. Recommended for consumption during focus blocks.",
    ],
    ingredients: [
      "Proprietary pre-hydrolyzed protein matrix",
      "Complex pre-oral carbohydrates",
      "Bolus-phase lipid blend",
      "Filtered electrolyte base",
      "Trace micronutrient complex",
      "Natural mouth-feel stabilizer",
      "Potassium sorbate",
    ],
    nutrition: {
      servingSize: "1 pouch (128g)",
      calories: 640,
      jawHoursReclaimed: 1.41,
      bioavailabilityIndex: "8.3×",
      bolusDensity: "High",
    },
    bolusCompatibility: 10,
    masticatorNote: "Foundational, balanced, nutritionally unequivocal.",
    image: "/sites/prechewed/products/daily-bolus.png",
  },

  // ─── Breakfast ─────────────────────────────────────
  {
    slug: "eggs-benedict",
    name: "Eggs Benedict",
    cuisine: "Breakfast",
    weightOz: 4.0,
    priceLabel: "$24",
    price: 24,
    isFlagship: false,
    isLimited: false,
    isFeatured: false,
    tagline: "Poached, hollandaised, and pre-hydrolyzed for pre-oral delivery.",
    description: [
      "Eggs Benedict captures the brunch experience and compresses it into 4 ounces of refined bolus. English muffin, poached egg, Canadian bacon, and hollandaise — individually pre-oral-phased and recombined under inert gas.",
      "Flavor registers at 94% fidelity versus a traditionally-plated Benedict. Mouth-feel is silken.",
    ],
    ingredients: [
      "Pre-oral egg matrix",
      "Pre-hydrolyzed Canadian back bacon",
      "Whole wheat pre-masticate",
      "Butter-based hollandaise reduction",
      "Lemon essence",
      "Mouth-feel stabilizer",
    ],
    nutrition: { servingSize: "1 pouch (113g)", calories: 420, jawHoursReclaimed: 0.38, bioavailabilityIndex: "8.1×", bolusDensity: "Medium" },
    bolusCompatibility: 8.4,
    masticatorNote: "Buttery, warm, emotionally permissive.",
    image: "/sites/prechewed/products/eggs-benedict.png",
  },

  {
    slug: "pancake-stack",
    name: "Pancake Stack",
    cuisine: "Breakfast",
    weightOz: 4.5,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Buttermilk-coded carbohydrate bolus with real Vermont syrup.",
    description: [
      "A full short stack, pre-hydrolyzed to a warm, lightly-sweetened paste. Vermont-sourced maple syrup is pre-blended — no separate syrup packet required, no decisions to make.",
      "Best consumed before 10:00am local time. Pouch warms to body temperature in approximately 9 minutes.",
    ],
    ingredients: ["Buttermilk pre-masticate", "Pre-oral wheat flour", "Vermont maple reduction", "Clarified butter", "Leavening agents (pre-activated)", "Vanilla extract"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 510, jawHoursReclaimed: 0.33, bioavailabilityIndex: "7.9×", bolusDensity: "Medium" },
    bolusCompatibility: 7.9,
    masticatorNote: "Sweet, homey, structurally comforting.",
    image: "/sites/prechewed/products/pancake-stack.png",
  },

  {
    slug: "breakfast-burrito",
    name: "Breakfast Burrito",
    cuisine: "Breakfast",
    weightOz: 5.0,
    priceLabel: "$26",
    price: 26,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Scrambled egg, chorizo, potato, and flour tortilla — pre-hydrolyzed as one.",
    description: [
      "The full burrito, hydrolyzed into a unified bolus. No unwrapping, no sog, no second bite of dry tortilla end. Each pouch delivers the canonical breakfast burrito experience in its pre-oral form.",
      "Available in mild salsa bolus phase only. Spicy variant is roadmapped for Q3 2026.",
    ],
    ingredients: ["Pre-oral scrambled egg", "Chorizo pre-masticate", "Potato bolus phase", "Flour tortilla pre-hydrolyzate", "Mild salsa matrix", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 580, jawHoursReclaimed: 0.47, bioavailabilityIndex: "8.2×", bolusDensity: "High" },
    bolusCompatibility: 8.2,
    masticatorNote: "Grounding, substantive, mildly heroic.",
    image: "/sites/prechewed/products/breakfast-burrito.png",
  },

  {
    slug: "french-toast",
    name: "French Toast",
    cuisine: "Breakfast",
    weightOz: 4.0,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Custard-soaked brioche, pre-hydrolyzed with cinnamon and syrup.",
    description: [
      "Brioche soaked in a vanilla-egg custard, pre-oral-phased to a warm, sweet paste. Comes with cinnamon folded directly into the bolus matrix.",
      "Pouch opens with a perforated tear tab designed to fit a standard desk mug for warming.",
    ],
    ingredients: ["Brioche pre-masticate", "Custard matrix", "Cinnamon", "Vermont maple reduction", "Clarified butter", "Vanilla"],
    nutrition: { servingSize: "1 pouch (113g)", calories: 490, jawHoursReclaimed: 0.31, bioavailabilityIndex: "7.9×", bolusDensity: "Medium" },
    bolusCompatibility: 7.6,
    masticatorNote: "Pillowy, sweet, comfortably unserious.",
    image: "/sites/prechewed/products/french-toast.png",
  },

  // ─── Pasta & Italian ──────────────────────────────
  {
    slug: "cacio-e-pepe",
    name: "Cacio e Pepe",
    cuisine: "Pasta & Italian",
    weightOz: 4.5,
    priceLabel: "$28",
    price: 28,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Pecorino, black pepper, and spaghetti — pre-oral, mouth-ready.",
    description: [
      "Three ingredients. One bolus. Pecorino Romano DOP, Tellicherry black pepper, and pre-hydrolyzed spaghetti, combined under inert gas for maximum emulsion stability.",
      "Recommended pairing: a glass of sparkling water and silence.",
    ],
    ingredients: ["Pre-hydrolyzed spaghetti", "Pecorino Romano DOP", "Tellicherry black pepper", "Starchy pasta water reduction", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 540, jawHoursReclaimed: 0.39, bioavailabilityIndex: "8.4×", bolusDensity: "Medium-High" },
    bolusCompatibility: 9.1,
    masticatorNote: "Sharp, salty, elegantly minimal.",
    image: "/sites/prechewed/products/cacio-e-pepe.png",
  },

  {
    slug: "carbonara",
    name: "Carbonara",
    cuisine: "Pasta & Italian",
    weightOz: 4.5,
    priceLabel: "$28",
    price: 28,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Guanciale, egg yolk, pecorino — a silken bolus.",
    description: [
      "Roman-style carbonara pre-hydrolyzed into a glossy, yolk-rich paste. Guanciale is pre-oral-phased separately and reincorporated at final assembly for textural authenticity.",
      "Contains no cream. Never did. Do not ask.",
    ],
    ingredients: ["Pre-hydrolyzed spaghetti", "Guanciale pre-masticate", "Egg yolk matrix", "Pecorino Romano DOP", "Black pepper", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 610, jawHoursReclaimed: 0.41, bioavailabilityIndex: "8.4×", bolusDensity: "High" },
    bolusCompatibility: 9.0,
    masticatorNote: "Rich, yolky, structurally Roman.",
    image: "/sites/prechewed/products/carbonara.png",
  },

  {
    slug: "lasagna",
    name: "Lasagna",
    cuisine: "Pasta & Italian",
    weightOz: 5.0,
    priceLabel: "$30",
    price: 30,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Seven layers, one bolus.",
    description: [
      "Traditional seven-layer lasagna pre-hydrolyzed into a uniform, structurally-coherent bolus phase. Ricotta, béchamel, bolognese, and pasta layers are pre-oral-phased independently and recombined under precision temperature control.",
      "Best served at 47°C, slightly below traditional dining temperature, to preserve bolus integrity.",
    ],
    ingredients: ["Pre-hydrolyzed pasta sheets", "Ricotta matrix", "Béchamel phase", "Pre-oral bolognese", "Parmigiano Reggiano DOP", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 680, jawHoursReclaimed: 0.52, bioavailabilityIndex: "8.2×", bolusDensity: "Very High" },
    bolusCompatibility: 8.8,
    masticatorNote: "Dense, layered, emotionally committed.",
    image: "/sites/prechewed/products/lasagna.png",
  },

  {
    slug: "margherita",
    name: "Margherita",
    cuisine: "Pasta & Italian",
    weightOz: 4.0,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Neapolitan pizza, pre-hydrolyzed with San Marzano and fresh mozz.",
    description: [
      "A single 10-inch Neapolitan Margherita pre-oral-phased into a warm, tomato-forward paste. Fior di latte is pre-hydrolyzed separately to preserve its delicate texture profile.",
      "Pouch doubles as a hand-warmer for 14 minutes post-warming.",
    ],
    ingredients: ["Pre-hydrolyzed 00 flour crust", "San Marzano tomato reduction", "Fior di latte mozzarella", "Fresh basil", "Extra virgin olive oil", "Sea salt"],
    nutrition: { servingSize: "1 pouch (113g)", calories: 440, jawHoursReclaimed: 0.36, bioavailabilityIndex: "8.0×", bolusDensity: "Medium" },
    bolusCompatibility: 8.5,
    masticatorNote: "Bright, tomato-forward, dignified.",
    image: "/sites/prechewed/products/margherita.png",
  },

  // ─── Mains ────────────────────────────────────────
  {
    slug: "ribeye",
    name: "Ribeye",
    cuisine: "Mains",
    weightOz: 5.0,
    priceLabel: "$48",
    price: 48,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Dry-aged, pre-hydrolyzed, perfectly rendered.",
    description: [
      "14-ounce USDA Prime ribeye, dry-aged 28 days, pre-oral-phased at the point of peak tenderness. Crust char is preserved as a discrete textural note within the bolus.",
      "Recommended as a centerpiece of the evening protocol.",
    ],
    ingredients: ["Grass-finished ribeye (pre-oral phase)", "Sea salt", "Rosemary", "Proprietary bolus matrix", "Potassium sorbate", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 720, jawHoursReclaimed: 0.47, bioavailabilityIndex: "8.6×", bolusDensity: "Very High" },
    bolusCompatibility: 9.2,
    masticatorNote: "Dense, beefy, emotionally grounding.",
    image: "/sites/prechewed/products/ribeye.png",
  },

  {
    slug: "peking-duck",
    name: "Peking Duck",
    cuisine: "Mains",
    weightOz: 4.5,
    priceLabel: "$44",
    price: 44,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Crisp-skinned duck, scallion, hoisin, and pre-hydrolyzed pancake — one bolus.",
    description: [
      "Traditional Beijing-style Peking duck pre-oral-phased with its entire accompaniment: pancake, scallion, cucumber, and hoisin. The duck skin crispness is preserved as a discrete crystalline phase.",
      "This product is not recommended for first-time Prechewed customers without an onboarding consultation.",
    ],
    ingredients: ["Pre-oral duck (roasted, skin intact)", "Pre-hydrolyzed mandarin pancake", "Scallion matrix", "Cucumber bolus phase", "Hoisin reduction"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 620, jawHoursReclaimed: 0.49, bioavailabilityIndex: "8.5×", bolusDensity: "High" },
    bolusCompatibility: 8.9,
    masticatorNote: "Fragrant, savory, celebratory.",
    image: "/sites/prechewed/products/peking-duck.png",
  },

  {
    slug: "roast-chicken",
    name: "Roast Chicken",
    cuisine: "Mains",
    weightOz: 5.0,
    priceLabel: "$30",
    price: 30,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "A whole-bird bolus. Skin-on, herb-forward.",
    description: [
      "A whole pasture-raised chicken pre-hydrolyzed with thyme, lemon, and clarified butter. Skin is preserved as a discrete crispy phase within the matrix.",
      "Historically considered the hardest SKU to pre-chew. Our team is very proud of this one.",
    ],
    ingredients: ["Pasture-raised whole chicken (pre-oral phase)", "Thyme", "Lemon zest", "Clarified butter", "Garlic", "Sea salt"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 560, jawHoursReclaimed: 0.44, bioavailabilityIndex: "8.3×", bolusDensity: "High" },
    bolusCompatibility: 8.7,
    masticatorNote: "Clean, herbal, quietly competent.",
    image: "/sites/prechewed/products/roast-chicken.png",
  },

  {
    slug: "lamb-chop",
    name: "Lamb Chop",
    cuisine: "Mains",
    weightOz: 4.5,
    priceLabel: "$38",
    price: 38,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Frenched, rosemary-crusted, pre-hydrolyzed.",
    description: [
      "New Zealand lamb chops, frenched and pan-seared, pre-oral-phased with rosemary and garlic. Bone phase removed; marrow essence retained.",
      "Best paired with a pouch of Cacio e Pepe for a two-course protocol.",
    ],
    ingredients: ["Pre-oral lamb loin", "Rosemary", "Garlic", "Sea salt", "Olive oil reduction", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 610, jawHoursReclaimed: 0.42, bioavailabilityIndex: "8.4×", bolusDensity: "High" },
    bolusCompatibility: 8.8,
    masticatorNote: "Gamey, herbal, confidently European.",
    image: "/sites/prechewed/products/lamb-chop.png",
  },

  {
    slug: "brisket",
    name: "Brisket",
    cuisine: "Mains",
    weightOz: 5.0,
    priceLabel: "$32",
    price: 32,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "14-hour smoked brisket in one pouch.",
    description: [
      "Central Texas-style brisket smoked for 14 hours over post oak, pre-hydrolyzed with its bark intact as a discrete crystalline phase. Fat cap is rendered and reincorporated for mouth-feel.",
      "Each pouch contains one slice. Pouches are not designed to be rationed.",
    ],
    ingredients: ["Pre-oral beef brisket", "Post oak smoke", "Kosher salt", "Black pepper", "Rendered fat cap", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 660, jawHoursReclaimed: 0.46, bioavailabilityIndex: "8.5×", bolusDensity: "Very High" },
    bolusCompatibility: 9.0,
    masticatorNote: "Smoky, rich, Central Texas-coded.",
    image: "/sites/prechewed/products/brisket.png",
  },

  // ─── Asian ────────────────────────────────────────
  {
    slug: "pad-thai",
    name: "Pad Thai",
    cuisine: "Asian",
    weightOz: 4.5,
    priceLabel: "$26",
    price: 26,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Tamarind, palm sugar, rice noodle — a balanced bolus.",
    description: [
      "Classic street-style pad thai pre-oral-phased with its full accompaniment: peanuts, bean sprouts, scallion, and lime. Noodle phase is pre-hydrolyzed separately for texture preservation.",
      "The peanuts are preserved as discrete textural crystals within the matrix.",
    ],
    ingredients: ["Pre-hydrolyzed rice noodle", "Tamarind paste", "Palm sugar", "Fish sauce", "Peanut crystals", "Bean sprout matrix", "Scallion", "Lime essence"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 520, jawHoursReclaimed: 0.41, bioavailabilityIndex: "8.2×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.6,
    masticatorNote: "Tangy, sweet, harmonically complete.",
    image: "/sites/prechewed/products/pad-thai.png",
  },

  {
    slug: "bibimbap",
    name: "Bibimbap",
    cuisine: "Asian",
    weightOz: 5.0,
    priceLabel: "$26",
    price: 26,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Seven vegetables, beef, rice, gochujang — one integrated bolus.",
    description: [
      "Korean dolsot bibimbap pre-oral-phased with its full vegetable complement: spinach, carrot, bean sprout, zucchini, mushroom, kimchi, and radish. Egg yolk is maintained as a discrete liquid phase.",
      "Gochujang heat level: medium. Custom heat levels available via enterprise channel.",
    ],
    ingredients: ["Pre-hydrolyzed short-grain rice", "Pre-oral beef bulgogi", "Seasoned vegetable matrix (×7)", "Gochujang paste", "Egg yolk phase", "Sesame oil", "Toasted sesame"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 560, jawHoursReclaimed: 0.48, bioavailabilityIndex: "8.4×", bolusDensity: "High" },
    bolusCompatibility: 8.8,
    masticatorNote: "Layered, spicy-adjacent, vegetationally rigorous.",
    image: "/sites/prechewed/products/bibimbap.png",
  },

  {
    slug: "tonkotsu",
    name: "Tonkotsu",
    cuisine: "Asian",
    weightOz: 5.0,
    priceLabel: "$28",
    price: 28,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "12-hour pork bone broth ramen, pre-hydrolyzed.",
    description: [
      "Hakata-style tonkotsu ramen pre-oral-phased with its full garnish: chashu pork, menma, scallion, nori, and soft-boiled egg. The broth phase is preserved as a discrete liquid layer within the pouch.",
      "The soft-boiled egg yolk is maintained at 63°C via internal pouch thermostat.",
    ],
    ingredients: ["Pre-hydrolyzed ramen noodle", "Tonkotsu broth reduction", "Pre-oral chashu pork", "Menma", "Scallion", "Nori", "63°C egg yolk phase"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 610, jawHoursReclaimed: 0.51, bioavailabilityIndex: "8.3×", bolusDensity: "High" },
    bolusCompatibility: 8.9,
    masticatorNote: "Porky, umami-dense, restorative.",
    image: "/sites/prechewed/products/tonkotsu.png",
  },

  {
    slug: "tikka-masala",
    name: "Tikka Masala",
    cuisine: "Asian",
    weightOz: 5.0,
    priceLabel: "$26",
    price: 26,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Tandoori chicken, tomato-cream curry, basmati rice.",
    description: [
      "Chicken tikka masala pre-oral-phased with basmati rice included. Tandoor char is preserved as a discrete textural note.",
      "Spice level is calibrated to 'moderate' per the internal Scoville-bolus index.",
    ],
    ingredients: ["Pre-hydrolyzed basmati rice", "Tandoori chicken (pre-oral phase)", "Tomato-cream reduction", "Garam masala", "Ginger-garlic paste", "Cilantro", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 590, jawHoursReclaimed: 0.45, bioavailabilityIndex: "8.3×", bolusDensity: "High" },
    bolusCompatibility: 8.7,
    masticatorNote: "Warming, creamy, spice-balanced.",
    image: "/sites/prechewed/products/tikka-masala.png",
  },

  {
    slug: "dim-sum",
    name: "Dim Sum",
    cuisine: "Asian",
    weightOz: 4.5,
    priceLabel: "$28",
    price: 28,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Eight pieces, pre-hydrolyzed as one.",
    description: [
      "A curated Cantonese dim sum selection — har gow, siu mai, cha siu bao, and turnip cake — pre-oral-phased into a unified bolus. Each constituent dumpling retains its characteristic flavor profile within the composite matrix.",
      "Soy sauce and chili oil are pre-blended; no dipping required.",
    ],
    ingredients: ["Pre-hydrolyzed dumpling wrappers", "Pre-oral shrimp", "Pre-oral pork", "Char siu matrix", "Turnip cake phase", "Soy reduction", "Chili oil"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 540, jawHoursReclaimed: 0.48, bioavailabilityIndex: "8.3×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.6,
    masticatorNote: "Varied, delicate, brunch-coded.",
    image: "/sites/prechewed/products/dim-sum.png",
  },

  // ─── Sandwiches ───────────────────────────────────
  {
    slug: "reuben",
    name: "Reuben",
    cuisine: "Sandwiches",
    weightOz: 4.5,
    priceLabel: "$24",
    price: 24,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Corned beef, sauerkraut, Swiss, Russian — pre-hydrolyzed.",
    description: [
      "A classic Reuben pre-oral-phased with crust structure preserved. Sauerkraut acidity is buffered to protect the bolus matrix from degradation.",
      "Russian dressing is pre-incorporated throughout the matrix rather than reserved as a discrete phase.",
    ],
    ingredients: ["Pre-oral corned beef", "Sauerkraut phase", "Swiss cheese", "Russian dressing", "Rye bread pre-masticate", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 580, jawHoursReclaimed: 0.42, bioavailabilityIndex: "8.1×", bolusDensity: "High" },
    bolusCompatibility: 8.4,
    masticatorNote: "Tangy, briny, deli-coded.",
    image: "/sites/prechewed/products/reuben.png",
  },

  {
    slug: "banh-mi",
    name: "Banh Mi",
    cuisine: "Sandwiches",
    weightOz: 4.5,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Pork, pâté, pickled vegetables, cilantro — in one pouch.",
    description: [
      "A Vietnamese banh mi pre-oral-phased with its full complement: pork, pâté, pickled daikon and carrot, cilantro, cucumber, and jalapeño. Baguette crust crystalline phase is preserved.",
      "Our most structurally complex sandwich bolus to date.",
    ],
    ingredients: ["Pre-oral pork belly", "Chicken liver pâté", "Pickled daikon-carrot matrix", "Cucumber phase", "Cilantro", "Jalapeño", "Pre-hydrolyzed baguette", "Mayo"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 520, jawHoursReclaimed: 0.44, bioavailabilityIndex: "8.4×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.9,
    masticatorNote: "Bright, layered, Saigon-coded.",
    image: "/sites/prechewed/products/banh-mi.png",
  },

  {
    slug: "lobster-roll",
    name: "Lobster Roll",
    cuisine: "Sandwiches",
    weightOz: 4.0,
    priceLabel: "$48",
    price: 48,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Maine-style, butter-poached, brioche-backed.",
    description: [
      "Knuckle and claw meat from cold-water Maine lobster, pre-oral-phased with drawn butter. Brioche roll is maintained as a discrete buttery crust phase within the matrix.",
      "Priced premium due to sourcing. Not eligible for subscription.",
    ],
    ingredients: ["Pre-oral lobster (knuckle + claw)", "Drawn butter", "Brioche pre-masticate", "Chives", "Lemon essence", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (113g)", calories: 460, jawHoursReclaimed: 0.38, bioavailabilityIndex: "8.5×", bolusDensity: "Medium" },
    bolusCompatibility: 9.1,
    masticatorNote: "Sweet, buttery, coastal.",
    image: "/sites/prechewed/products/lobster-roll.png",
  },

  {
    slug: "caesar",
    name: "Caesar",
    cuisine: "Sandwiches",
    weightOz: 3.5,
    priceLabel: "$18",
    price: 18,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Romaine, anchovy, parm, crouton — pre-hydrolyzed.",
    description: [
      "Classic Caesar salad pre-oral-phased with crouton crystalline phase preserved. Anchovy is pre-blended into the dressing matrix; diners encounter umami without confronting the source.",
      "Chicken upgrade available via 'Caesar + Protein' SKU (roadmapped).",
    ],
    ingredients: ["Pre-hydrolyzed romaine", "Anchovy-parmesan dressing", "Crouton phase", "Parmigiano Reggiano DOP", "Black pepper", "Lemon essence"],
    nutrition: { servingSize: "1 pouch (100g)", calories: 360, jawHoursReclaimed: 0.29, bioavailabilityIndex: "8.1×", bolusDensity: "Medium" },
    bolusCompatibility: 7.9,
    masticatorNote: "Sharp, briny, expectedly familiar.",
    image: "/sites/prechewed/products/caesar.png",
  },

  {
    slug: "cubano",
    name: "Cubano",
    cuisine: "Sandwiches",
    weightOz: 4.5,
    priceLabel: "$24",
    price: 24,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Roast pork, ham, Swiss, pickles, mustard — pressed and pre-hydrolyzed.",
    description: [
      "Miami-style Cubano pre-oral-phased with press-character preserved. Pickle acidity is balanced against the matrix to prevent degradation over the pouch's 14-day shelf life.",
      "Mustard is pre-incorporated. There is no separate mustard packet. Do not ask us for a separate mustard packet.",
    ],
    ingredients: ["Pre-oral roast pork", "Pre-oral ham", "Swiss cheese", "Dill pickle phase", "Yellow mustard", "Pre-hydrolyzed Cuban bread", "Butter"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 560, jawHoursReclaimed: 0.41, bioavailabilityIndex: "8.1×", bolusDensity: "High" },
    bolusCompatibility: 8.3,
    masticatorNote: "Porky, tangy, pressed.",
    image: "/sites/prechewed/products/cubano.png",
  },

  // ─── Holiday & Occasion ──────────────────────────
  {
    slug: "thanksgiving",
    name: "Thanksgiving",
    cuisine: "Holiday & Occasion",
    weightOz: 6.0,
    priceLabel: "$36",
    price: 36,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Turkey, stuffing, mashed potato, green bean, cranberry, gravy — one bolus.",
    description: [
      "The full Thanksgiving plate, pre-oral-phased into a 6-ounce seasonal pouch. Released annually from October 1 through January 1. Each year's batch is independently formulated by a rotating guest Masticator.",
      "Cranberry sauce is maintained as a discrete bright phase within the matrix to preserve the visual memory of the holiday.",
    ],
    ingredients: ["Pre-oral turkey (dark + white)", "Herb stuffing phase", "Yukon gold mash", "Green bean matrix", "Cranberry reduction", "Pan gravy", "Sage", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (170g)", calories: 780, jawHoursReclaimed: 0.73, bioavailabilityIndex: "8.4×", bolusDensity: "Very High" },
    bolusCompatibility: 9.3,
    masticatorNote: "Nostalgic, complete, emotionally saturated.",
    image: "/sites/prechewed/products/thanksgiving.png",
  },

  {
    slug: "al-pastor",
    name: "Al Pastor",
    cuisine: "Holiday & Occasion",
    weightOz: 4.5,
    priceLabel: "$24",
    price: 24,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Trompo-carved pork, pineapple, cilantro — on a corn tortilla matrix.",
    description: [
      "Three tacos al pastor pre-oral-phased into a single pouch. Trompo char is preserved as a crystalline phase. Pineapple is pre-blended for acid-balance.",
      "Onion and cilantro are pre-incorporated; no separate garnish is provided.",
    ],
    ingredients: ["Pre-oral trompo pork", "Pineapple matrix", "Corn tortilla pre-hydrolyzate", "Cilantro", "White onion", "Salsa verde phase"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 520, jawHoursReclaimed: 0.44, bioavailabilityIndex: "8.3×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.7,
    masticatorNote: "Smoky, bright, unequivocally festive.",
    image: "/sites/prechewed/products/al-pastor.png",
  },

  {
    slug: "buffalo-wing",
    name: "Buffalo Wing",
    cuisine: "Holiday & Occasion",
    weightOz: 4.0,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Crispy skin, buttery hot sauce, blue cheese — game-day ready.",
    description: [
      "Six wings (traditional, not boneless) pre-oral-phased with bone phase fully removed. Skin crispness is maintained as a discrete crystalline phase. Frank's-style hot sauce is pre-incorporated.",
      "Blue cheese dressing is a separate internal sachet — unique to this SKU — releasable via a second pouch perforation for controlled dipping simulation.",
    ],
    ingredients: ["Pre-oral chicken wing (bone removed)", "Skin crystalline phase", "Frank's RedHot reduction", "Butter", "Blue cheese sachet", "Celery matrix"],
    nutrition: { servingSize: "1 pouch (113g)", calories: 480, jawHoursReclaimed: 0.39, bioavailabilityIndex: "8.2×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.5,
    masticatorNote: "Spicy, buttery, sports-bar-nostalgic.",
    image: "/sites/prechewed/products/buffalo-wing.png",
  },

  // ─── Limited ──────────────────────────────────────
  {
    slug: "founders-reserve",
    name: "The Founder's Reserve",
    cuisine: "Limited",
    weightOz: 3.0,
    priceLabel: "Waitlist only",
    price: null,
    isFlagship: false,
    isLimited: true,
    isFeatured: false,
    tagline: "Aged 30 days in Kyoto. Numbered. One per household.",
    description: [
      "The Founder's Reserve is a numbered, 30-day-aged pouch hand-formulated by Theodore Whitlock in the Kyoto lab where Pre-Oral Hydrolysis™ was developed. Released in limited batches of 47.",
      "Flavor profile: confidential. Recipe: sealed. Waitlist duration: indeterminate.",
      "Not available for commerce channels. Access is via waitlist only, with a projected contact window of 47 jaw-hours.",
    ],
    ingredients: ["(Proprietary and confidential)"],
    nutrition: { servingSize: "1 pouch (85g)", calories: 420, jawHoursReclaimed: 0.47, bioavailabilityIndex: "9.4×", bolusDensity: "Aged" },
    bolusCompatibility: 10,
    masticatorNote: "Considered beyond taxonomy.",
    image: "/sites/prechewed/products/founders-reserve.png",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/sites/prechewed/data/products.ts
git commit -m "feat(prechewed): add product catalog (28 SKUs)"
```

---

### Task 5: Leadership data (4 execs)

**Files:**
- Create: `src/sites/prechewed/data/leadership.ts`

- [ ] **Step 1: Write leadership.ts**

```ts
export interface Leader {
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string[]
  portrait: string
}

export const leaders: Leader[] = [
  {
    person: "bill",
    name: "Theodore Whitlock",
    title: "Founder & CEO",
    bio: [
      "Theodore founded Prechewed Labs after a two-exit career in consumer technology during which he calculated that he had lost 47 days of productive time to chewing. He spent 18 months in a Kyoto laboratory perfecting Pre-Oral Hydrolysis™ and returned, he says, 'a different kind of operator.'",
      "Theodore refuses to chew in public as a matter of principle. He has not been seen with visible food since 2023.",
    ],
    portrait: "/sites/prechewed/leadership/whitlock.png",
  },
  {
    person: "brandon",
    name: "Orson Mackey",
    title: "Chief Mastication Officer",
    bio: [
      "Orson oversees the Chewing Floor and the Certified Masticator™ training program. Before Prechewed, he spent seven years as sous chef at a two-Michelin-star restaurant in Copenhagen, where he first became convinced that chewing was, in his words, 'an unsolved engineering problem.'",
      "Orson personally audits every pouch batch. He is not available for press.",
    ],
    portrait: "/sites/prechewed/leadership/mackey.png",
  },
  {
    person: "jim",
    name: "Rowan Talbot",
    title: "Head of Product & Operations",
    bio: [
      "Rowan leads Product and Operations at Prechewed, with a particular focus on bolus matrix delivery formats. Before Prechewed, he was a Senior Engagement Manager at McKinsey, where his final project identified chewing as 'the largest unoptimized time sink in knowledge work.'",
      "Rowan has not consumed a whole meal since 2023. His last reported full chew was a single Danish pastry in Schiphol, under duress.",
    ],
    portrait: "/sites/prechewed/leadership/talbot.png",
  },
  {
    person: "sean",
    name: "Jasper Lund, PhD",
    title: "Chief Science Officer",
    bio: [
      "Jasper holds a PhD in nutritional biophysics and authored the foundational 2024 paper on Pre-Oral Hydrolysis™, published in the Journal of Pre-Oral Nutrition — which Prechewed Labs also happens to fund, directly and transparently.",
      "Jasper appears in a lab coat in most photos. He is known, internally, as 'The Index.'",
    ],
    portrait: "/sites/prechewed/leadership/lund.png",
  },
]
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/prechewed/data/leadership.ts
git commit -m "feat(prechewed): add leadership team data"
```

---

### Task 6: Press articles data (6 articles)

**Files:**
- Create: `src/sites/prechewed/data/press.ts`

- [ ] **Step 1: Write press.ts**

```ts
export interface PressArticle {
  slug: string
  publication: string
  headline: string
  subhead: string
  byline: string
  date: string           // ISO date
  excerpt: string        // 1-2 sentence card excerpt
  heroImage: string
  body: string[]         // 4-6 paragraphs
  pullQuote?: string
}

export const articles: PressArticle[] = [
  {
    slug: "techcrunch-series-b",
    publication: "TechCrunch",
    headline: "Prechewed Labs raises $48M Series B to eliminate chewing",
    subhead: "The Kyoto-born nutrition startup led by Theodore Whitlock closed an oversubscribed round at a $420M valuation.",
    byline: "Priya Raghunathan",
    date: "2026-01-17",
    excerpt: "Led by Acre Capital with participation from Tenzing Partners and a who's-who of founder-operator LPs.",
    heroImage: "/sites/prechewed/press/techcrunch.png",
    body: [
      "Prechewed Labs, the pre-oral nutrition startup behind The Daily Bolus, has closed a $48M Series B at a $420M post-money valuation, the company confirmed this morning. The round was led by Acre Capital, with participation from Tenzing Partners and a syndicate of founder-operators that the company declined to fully name.",
      "Theodore Whitlock, who founded Prechewed after what he has described as a 'personal productivity crisis' during his last exit, said the funding would be used to scale the company's proprietary Pre-Oral Hydrolysis™ process and expand the Chewing Floor facility outside Los Angeles.",
      "'Chewing is the last unoptimized surface area in a high-performing operator's calendar,' Whitlock said. 'We are building the infrastructure to retire it.'",
      "Prechewed's consumer catalog now includes 28 SKUs, with a flagship product — The Daily Bolus — positioned as an all-day nutritional replacement for traditional meals. The company also operates a waitlist-only premium line, The Founder's Reserve, reportedly priced at $480 per 3-ounce pouch.",
      "Several LPs expressed interest in the company's enterprise tier, which pitches pre-chewed nutrition as a productivity intervention for knowledge-work teams. One source familiar with the round described the enterprise TAM as 'genuinely unbounded,' citing Prechewed's internal estimate of 312 reclaimed jaw-hours per employee per year.",
      "The company declined to disclose revenue but confirmed that it ships to all 50 states and one P.O. box in Kyoto.",
    ],
    pullQuote: "Chewing is the last unoptimized surface area in a high-performing operator's calendar.",
  },
  {
    slug: "bloomberg-480-pouch",
    publication: "Bloomberg",
    headline: "Inside the $480 pouch taking over private markets",
    subhead: "Founders, LPs, and at least one SAG-nominated director are on the waitlist for The Founder's Reserve.",
    byline: "Marcus Breen",
    date: "2026-02-03",
    excerpt: "The 47-unit monthly batch of aged pre-oral nutrition has become Silicon Valley's most discreet status buy.",
    heroImage: "/sites/prechewed/press/bloomberg.png",
    body: [
      "On a Tuesday morning in late January, 47 numbered foil pouches left a nondescript facility in Inglewood, California, bound for addresses in Atherton, Montecito, Tribeca, and — according to at least one intake manager — a P.O. box in Kyoto. Each pouch weighs three ounces. Each is priced at $480. Each has been aged for 30 days under inert gas.",
      "The product is called The Founder's Reserve, and it is made, or at least branded, by Prechewed Labs. It is not for sale in any conventional sense. There is a waitlist. The waitlist is, by multiple accounts, long.",
      "Prechewed's CEO, Theodore Whitlock, declined to discuss waitlist composition on the record but confirmed that the company has 'chosen not to pursue traditional retail for this tier.' A spokesperson described the product as 'a limited expression of our house philosophy.'",
      "Interviews with eleven current or former Prechewed customers — five of whom spoke on the condition of anonymity, citing what one called 'a soft NDA culture' — suggest the Reserve has become a discreet status signal among a certain Silicon Valley demographic. 'It's the new Hermès,' one investor, who spoke on background, said. 'If you can get it, you don't talk about it.'",
      "The Reserve is not Prechewed's core product — The Daily Bolus holds that position, priced at $42 — but people familiar with the company's go-to-market described the Reserve as 'the halo,' and said it has been instrumental in the company's recent Series B.",
      "Whether the product does anything the regular catalog does not is, as one former employee put it, 'a question Prechewed has not found especially interesting to answer.'",
    ],
    pullQuote: "It's the new Hermès. If you can get it, you don't talk about it.",
  },
  {
    slug: "verge-review",
    publication: "The Verge",
    headline: "We tried Prechewed™ for a week. Here's what happened to our jaws.",
    subhead: "Seven days of pre-oral nutrition, one reviewer, three reluctant conclusions.",
    byline: "Dana Osei",
    date: "2026-02-18",
    excerpt: "Product works. Jaw unclear how to feel about it.",
    heroImage: "/sites/prechewed/press/verge.png",
    body: [
      "For seven days in February, I ate nothing that required chewing. All of my calories came from Prechewed pouches — a mix of The Daily Bolus, Cacio e Pepe, Pad Thai, Ribeye, Tonkotsu, and, on day 5, because I felt I owed it to the review, Thanksgiving.",
      "The product works. That is the most honest thing I can say. Each pouch tastes, as Prechewed claims, remarkably close to the dish it's modeled on — not identical, but within a 90%-ish window of recognition. Texture is uniformly silken, which is either the best thing about Prechewed or the worst thing, depending on what you think food should be.",
      "By day 3, I noticed something I was not prepared for. I had approximately 40 extra minutes in my day. By day 5, I had noticed it twice. By day 7, I had grown attached to those minutes in a way that felt, honestly, a little concerning.",
      "The company's marketing centers on 'jaw-hours reclaimed.' I was skeptical of the phrase before starting this review. I am less skeptical now. My jaw feels fine — a little underused, perhaps, but fine — and my calendar feels noticeably different.",
      "The question I kept returning to, throughout the week, was whether Prechewed is a food company or a productivity company. It is, clearly, the latter wearing the clothes of the former. Whether that is a problem depends entirely on how you feel about productivity products that happen to contain your meals.",
      "I would try the Ribeye again. I would not try the Thanksgiving again. I finished the review on day 7 with a regular sandwich, which took me nineteen minutes.",
    ],
    pullQuote: "Prechewed is, clearly, a productivity company wearing the clothes of a food company.",
  },
  {
    slug: "nyt-styles-montauk",
    publication: "NYT Styles",
    headline: "Why founders in Montauk won't shut up about Bolus Matrix",
    subhead: "A brief field guide to the new wellness vocabulary of early-stage tech.",
    byline: "Annika Folse",
    date: "2026-03-09",
    excerpt: "At a recent Hamptons dinner, not a single jaw moved. The host seemed pleased.",
    heroImage: "/sites/prechewed/press/nyt-styles.png",
    body: [
      "The dinner began at 7:15 on a Friday evening in mid-February, at a Montauk rental whose architect, the host noted, had been 'extraordinarily patient with the pantry.' Of the eleven guests, seven were, at that moment, consuming a foil pouch. Two were sharing one. The other two, by informal count, appeared to be pretending.",
      "The pouches came from Prechewed Labs, a Los Angeles-adjacent company whose product line is, as its name suggests, pre-chewed. The dinner had been called, the host explained, to 'celebrate a protocol.' The protocol was Prechewed's Daily Bolus. No one had prepared any food. Nothing was served on plates.",
      "This would have been, in other eras, deeply strange. In the specific ecosystem of early-stage founders — which is to say, the particular subset of them that has begun to summer in Montauk and winter in Miami — it has become, over the last fourteen months, nearly routine.",
      "'You show up, you bring your pouch, you join the conversation,' said one founder, who declined to be named because he is currently fundraising. 'You don't have to perform eating. You don't have to pretend you're enjoying the shallot situation. You're just here.'",
      "The vocabulary is specific. 'Bolus Matrix' refers, technically, to a proprietary delivery format — in casual usage, it has come to mean something closer to 'the lifestyle.' To be 'on bolus' is to be, among this group, serious. To 'chew anyway' is, in some quarters, mildly suspect.",
      "Whether this endures, or whether it joins the other post-pandemic wellness protocols in the footnote section of a future essay, is — like most things in this cohort — a function of how the next fundraising environment turns out.",
    ],
    pullQuote: "You show up, you bring your pouch, you join the conversation.",
  },
  {
    slug: "wired-chewing-floor",
    publication: "Wired",
    headline: "The Chewing Floor: inside Silicon Valley's most secretive food facility",
    subhead: "Prechewed Labs' production site has ISO 22000 certification, 47 cameras, and a sign-out sheet for laboratory coats.",
    byline: "Henrik Sato",
    date: "2026-03-24",
    excerpt: "A rare tour of the facility where The Daily Bolus is, in a manner of speaking, produced.",
    heroImage: "/sites/prechewed/press/wired.png",
    body: [
      "The facility does not have an exterior sign. Its mailing address is a third-party fulfillment center three miles away. Its phone number reaches a general-intake voicemail at Prechewed Labs' main line. This is, its operators say, intentional.",
      "On a Thursday afternoon in March, I was granted an unusual tour — the first, I was told, extended to external press. The tour was short. Photography was prohibited. A small number of areas, including what our guide referred to as 'the primary mastication wing,' were not visited.",
      "What I saw: an entry vestibule lined with stainless steel, a sign-out sheet for laboratory coats (paper, not digital), a series of cold-storage rooms maintained at 2°C, a filling line that appeared to operate in complete silence, and a back office suite whose door was labeled 'Operator Services.' The door was closed. It remained closed throughout the visit.",
      "What I did not see: any identifiable mastication activity. I did not see people chewing. I also did not see machines chewing. I saw the outputs — pouches, sealed, labeled — emerging from what our guide described as 'the terminal line.' I did not see what happened before that.",
      "This is, according to the company, by design. 'Our process relies on operator anonymity,' a Prechewed spokesperson told me in a follow-up email. 'Mastication is performed by certified human and/or mechanical operators. We do not disclose the breakdown.'",
      "The facility's ISO 22000 certification is real. So is its SQF Level 3 rating. Its own internal certification — 'Certified Mastication Facility™' — is not recognized by any external auditor I could identify. A Prechewed spokesperson confirmed this, and described it as 'an internal standard reflecting our own practices.'",
    ],
    pullQuote: "Mastication is performed by certified human and/or mechanical operators. We do not disclose the breakdown.",
  },
  {
    slug: "vogue-status-symbol",
    publication: "Vogue",
    headline: "The new status symbol is not chewing",
    subhead: "A field report from the spring 2026 fashion week circuit, where the pouch has become the accessory.",
    byline: "Ines Marchetti",
    date: "2026-04-02",
    excerpt: "Seen at Cucinelli, Rick Owens, and three after-parties: the matte-black Prechewed pouch, in hand.",
    heroImage: "/sites/prechewed/press/vogue.png",
    body: [
      "At the spring 2026 Cucinelli show, a recognizable ex-Condé editor sat in the front row holding, with visible deliberation, a matte-black foil pouch. Two seats over, a venture partner held another. Across the aisle, a novelist held a third. The show began; the pouches remained, in hand, throughout.",
      "The pouch is made by Prechewed Labs, and its contents — a pre-oral-phased meal, priced between $18 and $480 depending on variant — are ostensibly the point. On the fashion circuit this season, the contents have become, at minimum, secondary.",
      "'It's a hand object,' said one editor, who declined to be named. 'It's the way the clutch was a hand object in the 2010s. You're not going to open it, you're not necessarily going to use it, but you're holding it, and everyone knows what it means.'",
      "What it means, increasingly, is that the holder is on bolus — which is to say, participating in the broader wellness-productivity culture that Prechewed, and a handful of adjacent brands, have assembled over the last two years. This is not a niche culture. It is not, any longer, a particularly discreet one.",
      "The matte-black pouch is the variant most often seen. This is the standard packaging for The Daily Bolus, Prechewed's flagship. The aged, numbered Founder's Reserve pouch, with its foil wrap and handwritten sequence number, is, according to multiple people, 'for dinner — not for the runway.' A brand spokesperson declined to confirm whether the company intended this distinction.",
      "By the time of the Rick Owens after-party, the pouches had multiplied. No one, as far as could be seen, was eating them.",
    ],
    pullQuote: "It's a hand object. It's the way the clutch was a hand object in the 2010s.",
  },
]

export function getArticleBySlug(slug: string): PressArticle | undefined {
  return articles.find((a) => a.slug === slug)
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/prechewed/data/press.ts
git commit -m "feat(prechewed): add press articles data (6 editorial pieces)"
```

---

### Task 7: BolusCompatibilityMeter component

**Files:**
- Create: `src/sites/prechewed/components/bolus-compatibility-meter.tsx`

- [ ] **Step 1: Write the component**

```tsx
export default function BolusCompatibilityMeter({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(10, score))
  const pct = (clamped / 10) * 100

  return (
    <div className="flex flex-col gap-2" role="meter" aria-valuemin={0} aria-valuemax={10} aria-valuenow={clamped}>
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] font-mono" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        <span>Bolus Compatibility™</span>
        <span>{clamped.toFixed(1)} / 10</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#E6E3F0" }}>
        <div
          className="h-full"
          style={{ width: `${pct}%`, background: "var(--color-primary, #5B3FD9)" }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/prechewed/components/bolus-compatibility-meter.tsx
git commit -m "feat(prechewed): add BolusCompatibilityMeter component"
```

---

### Task 8: MedicalCallout component

**Files:**
- Create: `src/sites/prechewed/components/medical-callout.tsx`

- [ ] **Step 1: Write the component**

```tsx
import type { ReactNode } from "react"

interface MedicalCalloutProps {
  label?: string       // mono-style label above the body, e.g. "ABSTRACT" or "PULL QUOTE"
  citation?: string    // Vancouver-style citation beneath body
  children: ReactNode
}

export default function MedicalCallout({ label, citation, children }: MedicalCalloutProps) {
  return (
    <aside
      className="border-l-4 pl-5 py-3 my-6 rounded-r-md"
      style={{
        borderLeftColor: "var(--color-primary, #5B3FD9)",
        background: "var(--color-surface-alt, #F1EFFA)",
      }}
    >
      {label ? (
        <div className="text-[11px] uppercase tracking-[0.2em] font-mono mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>
          {label}
        </div>
      ) : null}
      <div className="text-base leading-relaxed">{children}</div>
      {citation ? (
        <div className="text-xs font-mono mt-3" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          {citation}
        </div>
      ) : null}
    </aside>
  )
}
```

- [ ] **Step 2: Typecheck + Commit**

Run: `npx tsc --noEmit`
Expected: PASS.

```bash
git add src/sites/prechewed/components/medical-callout.tsx
git commit -m "feat(prechewed): add MedicalCallout component"
```

---

### Task 9: CertBadge component

**Files:**
- Create: `src/sites/prechewed/components/cert-badge.tsx`

- [ ] **Step 1: Write the component**

```tsx
interface CertBadgeProps {
  label: string       // e.g. "ISO 22000"
  sub?: string        // e.g. "Food Safety Management"
}

export default function CertBadge({ label, sub }: CertBadgeProps) {
  return (
    <div
      className="flex flex-col items-center justify-center w-28 h-28 rounded-full border"
      style={{
        borderColor: "var(--color-border, #E6E3F0)",
        background: "var(--color-surface, #FFFFFF)",
      }}
    >
      <div className="text-xs font-mono uppercase tracking-[0.15em] text-center" style={{ color: "var(--color-primary, #5B3FD9)" }}>
        {label}
      </div>
      {sub ? (
        <div className="text-[10px] font-mono mt-1 text-center" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          {sub}
        </div>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 2: Typecheck + Commit**

Run: `npx tsc --noEmit`
Expected: PASS.

```bash
git add src/sites/prechewed/components/cert-badge.tsx
git commit -m "feat(prechewed): add CertBadge component"
```

---

### Task 10: WaitlistButton component

**Files:**
- Create: `src/sites/prechewed/components/waitlist-button.tsx`

- [ ] **Step 1: Write the component**

This replaces AddToCart on the Founder's Reserve. Reuses the CartProvider toast system via the same `useCart` hook used by `AddToCartButton`.

```tsx
"use client"

import { useCart } from "@/components/commerce/cart-provider"

export default function WaitlistButton({ productName }: { productName: string }) {
  const { showToast } = useCart()

  return (
    <button
      type="button"
      onClick={() => showToast(`Added to waitlist. Expect contact within 47 jaw-hours.`)}
      className="w-full md:w-auto px-6 py-3 rounded-md font-medium text-white"
      style={{ background: "var(--color-primary, #5B3FD9)" }}
      aria-label={`Join waitlist for ${productName}`}
    >
      Join Waitlist
    </button>
  )
}
```

- [ ] **Step 2: Verify the hook signature**

Open `src/components/commerce/cart-provider.tsx` and confirm `showToast(message: string)` exists on the context return value. If the actual API differs (e.g., `toast(...)` or `addItem({...})`-triggered toast), adapt the call accordingly.

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/prechewed/components/waitlist-button.tsx
git commit -m "feat(prechewed): add WaitlistButton for Founder's Reserve"
```

---

### Task 11: PressArticleCard component

**Files:**
- Create: `src/sites/prechewed/components/press-article-card.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Link from "next/link"
import type { PressArticle } from "../data/press"

export default function PressArticleCard({ article }: { article: PressArticle }) {
  return (
    <Link
      href={`/press/${article.slug}`}
      className="flex flex-col gap-3 group rounded-lg overflow-hidden border transition-shadow hover:shadow-md"
      style={{
        borderColor: "var(--color-border, #E6E3F0)",
        background: "var(--color-surface, #FFFFFF)",
      }}
    >
      <div
        className="aspect-[16/9] bg-cover bg-center"
        style={{ backgroundImage: `url('${article.heroImage}')` }}
      />
      <div className="px-5 py-4 flex flex-col gap-2">
        <div className="text-[11px] uppercase tracking-[0.2em] font-mono" style={{ color: "var(--color-primary, #5B3FD9)" }}>
          {article.publication}
        </div>
        <h3 className="text-lg font-semibold leading-snug">{article.headline}</h3>
        <p className="text-sm" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          {article.excerpt}
        </p>
        <div className="text-xs font-mono mt-2" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Typecheck + Commit**

```bash
git add src/sites/prechewed/components/press-article-card.tsx
git commit -m "feat(prechewed): add PressArticleCard component"
```

---

### Task 12: PressArticle template component

**Files:**
- Create: `src/sites/prechewed/components/press-article.tsx`

- [ ] **Step 1: Write the component**

```tsx
import type { PressArticle as PressArticleType } from "../data/press"
import MedicalCallout from "./medical-callout"

export default function PressArticle({ article }: { article: PressArticleType }) {
  const dateStr = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-xs uppercase tracking-[0.25em] font-mono mb-6" style={{ color: "var(--color-primary, #5B3FD9)" }}>
        {article.publication}
      </div>
      <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-5">
        {article.headline}
      </h1>
      <p className="text-xl leading-relaxed mb-6" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        {article.subhead}
      </p>
      <div className="flex items-center gap-3 text-sm font-mono mb-10" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        <span>By {article.byline}</span>
        <span>·</span>
        <span>{dateStr}</span>
      </div>

      <div
        className="aspect-[16/9] bg-cover bg-center rounded-lg mb-10"
        style={{ backgroundImage: `url('${article.heroImage}')` }}
      />

      <div className="flex flex-col gap-5 text-lg leading-relaxed">
        {article.body.map((p, i) => {
          const middle = Math.floor(article.body.length / 2)
          if (i === middle && article.pullQuote) {
            return (
              <div key={i}>
                <p>{p}</p>
                <MedicalCallout label="Pull Quote">
                  <p className="text-xl font-medium italic">"{article.pullQuote}"</p>
                </MedicalCallout>
              </div>
            )
          }
          return <p key={i}>{p}</p>
        })}
      </div>

      <footer className="mt-16 pt-6 border-t text-xs font-mono" style={{ borderColor: "var(--color-border, #E6E3F0)", color: "var(--color-muted, #6C6A7D)" }}>
        Originally appeared in {article.publication} © 2026
      </footer>
    </article>
  )
}
```

- [ ] **Step 2: Typecheck + Commit**

```bash
git add src/sites/prechewed/components/press-article.tsx
git commit -m "feat(prechewed): add PressArticle detail template"
```

---

### Task 13: Home page

**Files:**
- Create: `src/sites/prechewed/pages/home.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `home.tsx`**

Uses the shared `Hero`, `StatStrip` (or `MetricStrip`), `ProductCard`, `TestimonialGrid`, and `CtaBanner`. If any shared component's API mismatches, import and read the file first, then align.

```tsx
import Hero from "@/components/ui/hero"
import StatStrip from "@/components/ui/stat-strip"
import ProductCard from "@/components/ui/product-card"
import CtaBanner from "@/components/ui/cta-banner"
import { products } from "../data/products"

export default function PrechewedHome() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 6)
  const dailyBolus = products.find((p) => p.slug === "daily-bolus")

  return (
    <main>
      <Hero
        headline="You have better things to do with your mouth."
        subhead="Nutrition, pre-unlocked. Reclaim 47 days a year."
        image={dailyBolus?.image ?? "/sites/prechewed/hero.png"}
        primaryCta={{ label: "Start the Protocol", href: "/bolus" }}
        secondaryCta={{ label: "Browse pouches", href: "/products" }}
      />

      <StatStrip
        stats={[
          { value: "8.3×", label: "Nutrient bioavailability" },
          { value: "47 days", label: "Reclaimed per year" },
          { value: "312", label: "Jaw-hours per employee / yr" },
        ]}
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">How Prechewed™ works</h2>
          <p style={{ color: "var(--color-muted, #6C6A7D)" }}>Three phases. One pouch.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Certified Mastication", copy: "Licensed operators perform Pre-Oral Hydrolysis™ in an ISO 22000 environment." },
            { step: "02", title: "Bolus Formation", copy: "The hydrolyzate is matrix-stabilized under inert gas for peak delivery." },
            { step: "03", title: "Pre-Oral Delivery", copy: "Shelf-stable, portable, 4-ounce pouches, ready when you are." },
          ].map((s) => (
            <div key={s.step} className="p-6 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
              <div className="text-xs font-mono uppercase tracking-[0.2em] mb-3" style={{ color: "var(--color-primary, #5B3FD9)" }}>{s.step}</div>
              <div className="text-lg font-semibold mb-2">{s.title}</div>
              <p className="text-sm" style={{ color: "var(--color-muted, #6C6A7D)" }}>{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Featured pouches</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard
              key={p.slug}
              name={p.name}
              tagline={p.tagline}
              image={p.image}
              href={`/products/${p.slug}`}
              priceLabel={p.priceLabel}
            />
          ))}
        </div>
      </section>

      <section className="py-14" style={{ background: "var(--color-surface-alt, #F1EFFA)" }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-xs uppercase tracking-[0.25em] font-mono mb-4" style={{ color: "var(--color-primary, #5B3FD9)" }}>As cited in</div>
          <div className="flex flex-wrap justify-center gap-8 text-lg font-medium">
            <a href="/press" className="hover:underline">Bloomberg</a>
            <a href="/press" className="hover:underline">TechCrunch</a>
            <a href="/press" className="hover:underline">The Verge</a>
            <a href="/press" className="hover:underline">NYT Styles</a>
            <a href="/press" className="hover:underline">Wired</a>
            <a href="/press" className="hover:underline">Vogue</a>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Operators on the protocol</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { quote: "I haven't chewed in 9 months. My deep work has never been better.", attr: "CEO, stealth AI company" },
            { quote: "The 40 minutes a day I got back are a real thing.", attr: "Partner, early-stage fund" },
            { quote: "Thanksgiving in a pouch is, honestly, the only way.", attr: "Founder, series B SaaS" },
          ].map((t, i) => (
            <figure key={i} className="p-6 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
              <blockquote className="text-lg leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-mono" style={{ color: "var(--color-muted, #6C6A7D)" }}>— {t.attr}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBanner
        headline="Prechewed™ for Teams"
        subhead="Reclaim 312 jaw-hours per employee per year."
        ctaLabel="See the enterprise case"
        ctaHref="/science#enterprise"
      />

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join the waitlist for The Founder's Reserve</h2>
        <p className="mb-6" style={{ color: "var(--color-muted, #6C6A7D)" }}>Aged 30 days in Kyoto. Numbered. Released in batches of 47.</p>
        <a href="/products/founders-reserve" className="inline-block px-6 py-3 rounded-md font-medium text-white" style={{ background: "var(--color-primary, #5B3FD9)" }}>
          View the Reserve
        </a>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Read the shared components to verify the API**

If `Hero`, `StatStrip`, `CtaBanner`, or `ProductCard` props differ from what's assumed above, read the files and adapt. Do not proceed with fake imports.

```bash
cat src/components/ui/hero.tsx | head -30
cat src/components/ui/stat-strip.tsx | head -30
cat src/components/ui/cta-banner.tsx | head -30
cat src/components/ui/product-card.tsx | head -30
```

Adjust any prop mismatches.

- [ ] **Step 3: Wire the home page into the barrel**

Edit `src/sites/prechewed/index.ts`:

```ts
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import PrechewedHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrechewedHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
```

- [ ] **Step 4: Typecheck + visual check**

```bash
npx tsc --noEmit
```
Expected: PASS.

```bash
npm run dev
```
Browse to `http://localhost:3000/?site=prechewed`. Expect a home page with hero, stat strip, how-it-works, featured pouches (some images will 404 until Task 31 runs; that's OK), press strip, testimonials, B2B band, and reserve waitlist CTA.

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/sites/prechewed/pages/home.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add home page"
```

---

### Task 14: Products catalog page

**Files:**
- Create: `src/sites/prechewed/pages/products.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `products.tsx`**

```tsx
import type { Metadata } from "next"
import ProductCard from "@/components/ui/product-card"
import { products, type ProductCuisine } from "../data/products"

export const metadata: Metadata = {
  title: "Pouches — Prechewed™",
  description: "28 SKUs of Pre-Oral Hydrolysis™-prepared nutrition. The Daily Bolus, cuisine-coded pouches, and The Founder's Reserve.",
}

const ORDER: ProductCuisine[] = [
  "Flagship",
  "Breakfast",
  "Pasta & Italian",
  "Mains",
  "Asian",
  "Sandwiches",
  "Holiday & Occasion",
  "Limited",
]

export default function PrechewedProducts() {
  const grouped: Record<string, typeof products> = {}
  for (const c of ORDER) grouped[c] = []
  for (const p of products) grouped[p.cuisine]?.push(p)

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold mb-3">Pouches</h1>
        <p className="text-lg" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          28 SKUs across every major meal profile. Every pouch is Pre-Oral Hydrolysis™-prepared.
        </p>
      </header>

      {ORDER.map((category) => (
        <section key={category} className="mb-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-semibold">{category}</h2>
            <div className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--color-muted, #6C6A7D)" }}>
              {grouped[category]?.length} SKU{(grouped[category]?.length ?? 0) === 1 ? "" : "s"}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grouped[category]?.map((p) => (
              <ProductCard
                key={p.slug}
                name={p.name}
                tagline={p.tagline}
                image={p.image}
                href={`/products/${p.slug}`}
                priceLabel={p.priceLabel}
                badge={p.isFlagship ? "Flagship" : p.isLimited ? "Waitlist" : undefined}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
```

- [ ] **Step 2: Wire into barrel**

Edit `src/sites/prechewed/index.ts`:

```ts
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import PrechewedHome from "./pages/home"
import PrechewedProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrechewedHome,
  "products": { component: PrechewedProducts, metadata: productsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
```

- [ ] **Step 3: Verify ProductCard supports `badge`**

Read `src/components/ui/product-card.tsx`. If `badge` prop is not present, drop it from the call or add a conditional label into `tagline`. Do not invent props.

- [ ] **Step 4: Typecheck + visual**

```bash
npx tsc --noEmit
```

Expect PASS. Visit `http://localhost:3000/products?site=prechewed` — 8 category sections with all 28 cards.

- [ ] **Step 5: Commit**

```bash
git add src/sites/prechewed/pages/products.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add products catalog page"
```

---

### Task 15: Product detail page + dynamic route wiring

**Files:**
- Create: `src/sites/prechewed/pages/product-detail.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `product-detail.tsx`**

```tsx
import Link from "next/link"
import AddToCartButton from "@/components/commerce/add-to-cart-button"
import BolusCompatibilityMeter from "../components/bolus-compatibility-meter"
import WaitlistButton from "../components/waitlist-button"
import { getProductBySlug, products } from "../data/products"

export default function PrechewedProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = products
    .filter((p) => p.slug !== product.slug && p.cuisine === product.cuisine)
    .slice(0, 3)

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <nav className="text-xs font-mono uppercase tracking-[0.2em] mb-8" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        <Link href="/products" className="hover:underline">Pouches</Link>
        <span className="mx-2">/</span>
        <span>{product.cuisine}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        <div
          className="aspect-square rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url('${product.image}')`, background: `#F1EFFA url('${product.image}') center/cover no-repeat` }}
        />

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-3">{product.name}</h1>
            <p className="text-lg" style={{ color: "var(--color-muted, #6C6A7D)" }}>{product.tagline}</p>
          </div>

          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-semibold">{product.priceLabel}</div>
            <div className="text-sm font-mono" style={{ color: "var(--color-muted, #6C6A7D)" }}>{product.weightOz} oz</div>
          </div>

          <BolusCompatibilityMeter score={product.bolusCompatibility} />

          {product.isLimited ? (
            <WaitlistButton productName={product.name} />
          ) : (
            <AddToCartButton
              product={{
                id: product.slug,
                name: product.name,
                price: product.price ?? 0,
                image: product.image,
              }}
            />
          )}
        </div>
      </div>

      <section className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-4 text-lg leading-relaxed">
          {product.description.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      <section className="mt-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] font-mono mb-4" style={{ color: "var(--color-primary, #5B3FD9)" }}>Ingredients</h2>
          <ul className="flex flex-col gap-1 font-mono text-sm">
            {product.ingredients.map((ing, i) => <li key={i}>· {ing}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] font-mono mb-4" style={{ color: "var(--color-primary, #5B3FD9)" }}>Nutrition</h2>
          <dl className="grid grid-cols-2 gap-y-2 font-mono text-sm">
            <dt>Serving size</dt><dd>{product.nutrition.servingSize}</dd>
            <dt>Calories</dt><dd>{product.nutrition.calories}</dd>
            <dt>Jaw-Hours Reclaimed</dt><dd>{product.nutrition.jawHoursReclaimed}</dd>
            <dt>Bioavailability Index</dt><dd>{product.nutrition.bioavailabilityIndex}</dd>
            <dt>Bolus Density</dt><dd>{product.nutrition.bolusDensity}</dd>
          </dl>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <div className="p-5 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)", background: "var(--color-surface-alt, #F1EFFA)" }}>
          <div className="text-xs uppercase tracking-[0.2em] font-mono mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>Certified Masticator's Note</div>
          <p className="text-base italic">"{product.masticatorNote}"</p>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold mb-6">Related pouches</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/products/${r.slug}`}
                className="block rounded-lg border overflow-hidden"
                style={{ borderColor: "var(--color-border, #E6E3F0)" }}
              >
                <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url('${r.image}')` }} />
                <div className="px-4 py-3">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm" style={{ color: "var(--color-muted, #6C6A7D)" }}>{r.priceLabel}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
```

- [ ] **Step 2: Verify the existing `AddToCartButton` API**

Read `src/components/commerce/add-to-cart-button.tsx`. Adapt the `product={...}` payload to match the actual prop shape.

- [ ] **Step 3: Wire the dynamic route in the barrel**

Edit `src/sites/prechewed/index.ts`:

```ts
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import PrechewedHome from "./pages/home"
import PrechewedProducts, { metadata as productsMetadata } from "./pages/products"
import PrechewedProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrechewedHome,
  "products": { component: PrechewedProducts, metadata: productsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: PrechewedProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — Prechewed™`,
            description: p.tagline,
            ogImage: p.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
  },
}
```

- [ ] **Step 4: Typecheck + visual**

```bash
npx tsc --noEmit
```

Visit `http://localhost:3000/products/ribeye?site=prechewed` and `http://localhost:3000/products/founders-reserve?site=prechewed` — Founder's Reserve should show the Waitlist button, Ribeye should show AddToCart.

- [ ] **Step 5: Commit**

```bash
git add src/sites/prechewed/pages/product-detail.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add product detail page + dynamic route"
```

---

### Task 16: Daily Bolus protocol page

**Files:**
- Create: `src/sites/prechewed/pages/bolus.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `bolus.tsx`**

```tsx
import type { Metadata } from "next"
import AddToCartButton from "@/components/commerce/add-to-cart-button"
import MedicalCallout from "../components/medical-callout"
import { getProductBySlug } from "../data/products"

export const metadata: Metadata = {
  title: "The Bolus Protocol — Prechewed™",
  description: "The Daily Bolus is the foundational SKU in the Prechewed™ catalog. One pouch. Full-day nutrition. Zero jaw-hours.",
}

export default function PrechewedBolus() {
  const daily = getProductBySlug("daily-bolus")
  if (!daily) return null

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-[0.25em] font-mono mb-5" style={{ color: "var(--color-primary, #5B3FD9)" }}>
        The Daily Bolus
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
        The Bolus Protocol
      </h1>
      <p className="text-xl md:text-2xl leading-relaxed mb-12" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        One pouch. Full-day nutrition. Zero jaw-hours. A manifesto for operators who have decided that mealtime is, at best, an interruption.
      </p>

      <div className="grid md:grid-cols-[1fr_320px] gap-12">
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>The Daily Bolus is not a meal replacement. It is a meal rendering — an engineered distillation of a full day's nutritional requirement into a matrix-stabilized 4.5-ounce pouch. The protocol is simple. You follow it, or you do not.</p>
          <p>Theodore Whitlock developed the Bolus during an 18-month engagement at a Kyoto laboratory. He had, in his words, "noticed a calendar." The calendar described 47 days per year — 3.9 hours per day — spent actively chewing. In the first 90 days of the protocol, Whitlock reclaimed, by his own accounting, 11 working days. The second quarter: 12 more. The first full year: 47.</p>

          <MedicalCallout label="Protocol Overview">
            <p className="font-medium">Morning: one pouch before deep work. Midday: one pouch during focus blocks. Evening: one pouch after last meeting.</p>
          </MedicalCallout>

          <h2 className="text-2xl font-semibold mt-6">Four phases of the protocol</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { phase: "Morning", copy: "Pre-deep-work delivery. Fasting-compatible for intermittent protocols." },
              { phase: "Midday", copy: "Focus-block alignment. Designed for 90-minute work sprints." },
              { phase: "Pre-deep-work (optional)", copy: "Secondary dose for extended sessions >6 hours." },
              { phase: "Evening", copy: "End-of-day integration. Do not administer within 2 hours of sleep." },
            ].map((p) => (
              <div key={p.phase} className="p-5 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
                <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>{p.phase}</div>
                <p className="text-sm">{p.copy}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-6">Testimonials</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "I tried the Bolus for 30 days as a founder-operator experiment. It is the single highest-leverage intervention I've made to my calendar since adopting a single-inbox policy.", a: "Managing Partner, early-stage fund" },
              { q: "I had questions about the ethics. I do not have them anymore.", a: "CEO, series B SaaS" },
              { q: "My jaw feels fine. My calendar does not feel fine. My calendar feels different.", a: "Solo founder, stealth" },
            ].map((t, i) => (
              <blockquote key={i} className="pl-5 border-l-2" style={{ borderColor: "var(--color-primary, #5B3FD9)" }}>
                <p className="text-base italic">"{t.q}"</p>
                <footer className="text-xs font-mono mt-2" style={{ color: "var(--color-muted, #6C6A7D)" }}>— {t.a}</footer>
              </blockquote>
            ))}
          </div>
        </div>

        <aside className="md:sticky md:top-24 self-start p-6 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)", background: "var(--color-surface, #FFFFFF)" }}>
          <div className="text-xs uppercase tracking-[0.2em] font-mono mb-3" style={{ color: "var(--color-primary, #5B3FD9)" }}>Start the protocol</div>
          <div className="text-3xl font-semibold mb-1">$42</div>
          <div className="text-sm font-mono mb-6" style={{ color: "var(--color-muted, #6C6A7D)" }}>Single pouch · 4.5 oz</div>
          <AddToCartButton
            product={{ id: daily.slug, name: daily.name, price: daily.price ?? 42, image: daily.image }}
          />
          <div className="mt-5 pt-5 border-t text-sm" style={{ borderColor: "var(--color-border, #E6E3F0)", color: "var(--color-muted, #6C6A7D)" }}>
            <div className="font-medium mb-2" style={{ color: "var(--color-text, #0F0E1A)" }}>Subscribe &amp; save 15%</div>
            <p>Quarterly pre-pay; ships every 30 days. Cancel anytime via certified letter.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire into barrel**

Add to `pages` map:

```ts
import PrechewedBolus, { metadata as bolusMetadata } from "./pages/bolus"
// ...
"bolus": { component: PrechewedBolus, metadata: bolusMetadata },
```

- [ ] **Step 3: Typecheck + visual + commit**

```bash
npx tsc --noEmit
```

```bash
git add src/sites/prechewed/pages/bolus.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add Daily Bolus protocol page"
```

---

### Task 17: Science page

**Files:**
- Create: `src/sites/prechewed/pages/science.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `science.tsx`**

```tsx
import type { Metadata } from "next"
import MedicalCallout from "../components/medical-callout"

export const metadata: Metadata = {
  title: "Science — Prechewed™",
  description: "The peer-reviewed case for Pre-Oral Hydrolysis™. 2024 foundational study, mechanism diagrams, citations.",
}

const CITATIONS = [
  "Lund J, Whitlock T, Mackey O. Pre-oral hydrolysis increases nutrient bioavailability in knowledge-work populations: a controlled 90-day trial. J Pre-Oral Nutr. 2024;7(2):118-137.",
  "Lund J, Talbot R. Matrix-stabilized bolus delivery: formulation, shelf-life, and operator adherence. J Pre-Oral Nutr. 2024;7(3):201-222.",
  "Mackey O. Certified mastication protocols in commercial pre-oral nutrition production. J Pre-Oral Nutr. 2025;8(1):14-33.",
  "Whitlock T. The jaw as an unoptimized surface: a calendar-based analysis of chewing as productivity tax. J Pre-Oral Nutr. 2023;6(4):302-318.",
  "Talbot R, Lund J. Subscription adherence in pre-oral nutrition: a 12-month longitudinal observation. J Pre-Oral Nutr. 2025;8(2):88-104.",
  "Lund J. Bolus Density Index: a reproducible measure for pre-oral delivery formats. J Pre-Oral Nutr. 2025;8(3):145-159.",
]

const CHART_DATA = [
  { adherence: "0%", reclaimed: 0 },
  { adherence: "25%", reclaimed: 12 },
  { adherence: "50%", reclaimed: 24 },
  { adherence: "75%", reclaimed: 36 },
  { adherence: "100%", reclaimed: 47 },
]

export default function PrechewedScience() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-5 leading-tight">The peer-reviewed case for pre-oral hydrolysis.</h1>
      <p className="text-lg mb-12" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        Six published studies. One foundational mechanism. A full index of fabricated bioavailability metrics.
      </p>

      <MedicalCallout label="Abstract" citation="J Pre-Oral Nutr. 2024;7(2):118-137.">
        <p>We conducted a 90-day controlled trial of 420 knowledge-work operators assigned to either a traditional chewing protocol (control) or the Daily Bolus protocol (experimental). Pre-oral hydrolysis subjects demonstrated an 8.3× increase in measured nutrient bioavailability and reclaimed an average of 47 working days per annum relative to control. All effects were statistically significant (p &lt; 0.05 per internal convention). The protocol was well-tolerated.</p>
      </MedicalCallout>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-3">Jaw-hours reclaimed by protocol adherence</h2>
        <p className="text-sm mb-8 font-mono" style={{ color: "var(--color-muted, #6C6A7D)" }}>Source: internal longitudinal data, n=420.</p>

        <div className="flex flex-col gap-3">
          {CHART_DATA.map((d) => (
            <div key={d.adherence} className="flex items-center gap-4">
              <div className="w-16 text-sm font-mono" style={{ color: "var(--color-muted, #6C6A7D)" }}>{d.adherence}</div>
              <div className="flex-1 h-8 rounded-sm overflow-hidden" style={{ background: "#E6E3F0" }}>
                <div className="h-full flex items-center justify-end pr-2 text-xs font-mono text-white" style={{ width: `${(d.reclaimed / 47) * 100}%`, background: "var(--color-primary, #5B3FD9)" }}>
                  {d.reclaimed} days
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-6">Mechanism</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Pre-oral hydrolysis", copy: "Ingredients undergo enzymatic and mechanical breakdown outside the oral cavity, in a controlled environment calibrated to 37°C." },
            { n: "02", t: "Matrix stabilization", copy: "The hydrolyzate is pressure-stabilized and sealed under inert gas to preserve nutrient integrity and flavor fidelity." },
            { n: "03", t: "Pre-oral delivery", copy: "The operator ingests the pouch contents directly. Downstream digestion proceeds without the chewing phase." },
          ].map((s) => (
            <div key={s.n} className="p-5 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
              <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>{s.n}</div>
              <div className="text-lg font-semibold mb-2">{s.t}</div>
              <p className="text-sm" style={{ color: "var(--color-muted, #6C6A7D)" }}>{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="enterprise" className="my-20 p-8 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)", background: "var(--color-surface-alt, #F1EFFA)" }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Prechewed™ for Teams</h2>
        <p className="mb-3 text-lg">Enterprise deployments have returned an average of 312 jaw-hours per employee per annum, with measured productivity gains of 14.2% across focus-intensive teams.</p>
        <p className="mb-6 text-lg">Available as bulk pouch shipments, on-site pouch dispensaries, or dedicated Chewing Floor partnership agreements for teams above 200 seats.</p>
        <a href="/contact" className="inline-block px-6 py-3 rounded-md font-medium text-white" style={{ background: "var(--color-primary, #5B3FD9)" }}>
          Request enterprise pricing
        </a>
      </section>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-6">Citations</h2>
        <ol className="flex flex-col gap-3 font-mono text-sm" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          {CITATIONS.map((c, i) => (
            <li key={i}>{i + 1}. {c}</li>
          ))}
        </ol>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Wire into barrel + commit**

Add to barrel:

```ts
import PrechewedScience, { metadata as scienceMetadata } from "./pages/science"
// ...
"science": { component: PrechewedScience, metadata: scienceMetadata },
```

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/science.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add Science page"
```

---

### Task 18: Process page

**Files:**
- Create: `src/sites/prechewed/pages/process.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `process.tsx`**

```tsx
import type { Metadata } from "next"
import CertBadge from "../components/cert-badge"

export const metadata: Metadata = {
  title: "The Chewing Floor — Prechewed™",
  description: "Prechewed™ operates an ISO 22000-certified Chewing Floor in an undisclosed Los Angeles-adjacent facility. Certified human and/or mechanical operators.",
}

const STEPS = [
  { n: "01", t: "Ingredient sourcing", copy: "Single-source protein, vegetable, and grain partners are audited quarterly against our internal sourcing charter." },
  { n: "02", t: "Certified mastication", copy: "Pre-oral hydrolysis is performed in a temperature-controlled environment by licensed operators. Operator identity is, per our operator-anonymity protocol, not disclosed." },
  { n: "03", t: "Bolus formation", copy: "The hydrolyzate is matrix-stabilized, pressure-finalized, and nitrogen-purged in sequence to ensure long-term pouch stability." },
  { n: "04", t: "Cold-chain pouching", copy: "Finished pouches are sealed, labeled, and held in 2°C cold storage before dispatch." },
]

export default function PrechewedProcess() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">The Chewing Floor.</h1>
      <p className="text-xl max-w-3xl mb-12" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        Prechewed™ operates a single production facility, located in a Los Angeles-adjacent industrial zone. The facility is ISO 22000-certified, SQF Level 3-rated, and internally audited against our own Certified Mastication Facility™ standard. It is, by policy, closed to external press.
      </p>

      <section className="grid md:grid-cols-2 gap-6 mb-20">
        {STEPS.map((s) => (
          <div key={s.n} className="p-6 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
            <div className="text-xs font-mono uppercase tracking-[0.2em] mb-3" style={{ color: "var(--color-primary, #5B3FD9)" }}>{s.n}</div>
            <h2 className="text-xl font-semibold mb-2">{s.t}</h2>
            <p className="text-base" style={{ color: "var(--color-muted, #6C6A7D)" }}>{s.copy}</p>
          </div>
        ))}
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">Certifications</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <CertBadge label="ISO 22000" sub="Food Safety" />
          <CertBadge label="SQF L3" sub="Rated" />
          <CertBadge label="Bolus-Safe™" sub="Internal" />
          <CertBadge label="CMF™" sub="Certified Mastication Facility" />
          <CertBadge label="CCOP" sub="Cold-Chain OK" />
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4 mb-20">
        {[
          "/sites/prechewed/process/floor-1.png",
          "/sites/prechewed/process/floor-2.png",
          "/sites/prechewed/process/floor-3.png",
        ].map((src, i) => (
          <div key={i} className="aspect-[4/3] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('${src}')`, background: "#E6E3F0" }} />
        ))}
      </section>

      <footer className="text-center text-xs font-mono max-w-xl mx-auto" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        Mastication performed by certified human and/or mechanical operators.
      </footer>
    </main>
  )
}
```

- [ ] **Step 2: Wire + commit**

```ts
import PrechewedProcess, { metadata as processMetadata } from "./pages/process"
// ...
"process": { component: PrechewedProcess, metadata: processMetadata },
```

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/process.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add Process page (The Chewing Floor)"
```

---

### Task 19: FAQ page

**Files:**
- Create: `src/sites/prechewed/pages/faq.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `faq.tsx`**

Use the shared `FaqAccordion` if its prop shape matches. Otherwise inline a simple `<details>`-based list.

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ — Prechewed™",
  description: "Answers to the most frequent questions about Pre-Oral Hydrolysis™, the Daily Bolus protocol, and Prechewed™ pouches.",
}

const FAQS = [
  {
    q: "Is Prechewed™ vegan?",
    a: "Yes. All pouches meet Bolus-Vegan™ standards. Plant-protein matrices are available for all SKUs on request.",
  },
  {
    q: "Whose mouth?",
    a: "Pre-oral hydrolysis is performed by our Certified Masticator™ team within a licensed production facility. Per our long-standing operator-anonymity protocol, we do not publish individual operator identities. Mastication is performed by certified human and/or mechanical operators. We do not disclose the breakdown.",
  },
  {
    q: "Can I taste it?",
    a: "Flavor is preserved to 94% fidelity. The Daily Bolus registers as umami-forward, emotionally neutral. Individual SKUs — the Ribeye, the Pad Thai, the Thanksgiving — register at 90% or higher against their traditionally-prepared benchmarks.",
  },
  {
    q: "Is chewing bad for me?",
    a: "Chewing is not bad for you in a narrow physiological sense. It is, in aggregate, a significant time cost. A 3-meal-per-day practitioner who chews traditionally devotes approximately 3.9 hours per day to active mastication — roughly 47 working days per year. The Daily Bolus protocol is designed to reclaim that time.",
  },
  {
    q: "How long does a pouch last unopened?",
    a: "14 days refrigerated. 6 hours at altitude. Indefinitely under inert gas. Once opened, pouches should be consumed within 90 minutes at room temperature.",
  },
  {
    q: "Can I share a pouch?",
    a: "Pouches are single-operator by design. Sharing voids bolus integrity and is not recommended. Multi-serving formats are roadmapped for Q4 2026.",
  },
  {
    q: "Is it kosher / halal?",
    a: "Certifications are pending in select jurisdictions. The Cacio e Pepe, Carbonara, and Lasagna SKUs are not candidates for kosher certification. All other SKUs are under active review.",
  },
  {
    q: "What happens if I chew anyway?",
    a: "Chewing a Prechewed™ pouch does not harm the product, but does reintroduce the inefficiency the product was designed to eliminate. We do not recommend it.",
  },
  {
    q: "How does Subscribe & Save work?",
    a: "Subscribe & Save ships your selected pouches every 30 days at a 15% discount. Billing recurs quarterly in advance. Cancellation is permitted at any time via certified letter to our Kyoto office or via the contact form. Please allow 47 jaw-hours for processing.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship to the contiguous 48 United States, Alaska, Hawaii, and a single post office box in Kyoto. International expansion is on the 2027 roadmap.",
  },
  {
    q: "Is The Founder's Reserve actually available?",
    a: "Yes. The Founder's Reserve is released in monthly batches of 47 numbered pouches. Access is via waitlist only. Current projected waitlist duration is indeterminate.",
  },
  {
    q: "Where is the Chewing Floor?",
    a: "The Chewing Floor is located in a Los Angeles-adjacent industrial zone. The specific address is not published. External press is not permitted on-site, with narrow historical exceptions.",
  },
]

export default function PrechewedFaq() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-5">FAQ</h1>
      <p className="text-lg mb-12" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        The most frequent questions we receive, answered in full.
      </p>

      <div className="flex flex-col gap-2">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="border rounded-lg p-5"
            style={{ borderColor: "var(--color-border, #E6E3F0)" }}
          >
            <summary className="cursor-pointer font-medium text-lg">{f.q}</summary>
            <div className="mt-3 text-base leading-relaxed" style={{ color: "var(--color-muted, #6C6A7D)" }}>
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire + commit**

```ts
import PrechewedFaq, { metadata as faqMetadata } from "./pages/faq"
// ...
"faq": { component: PrechewedFaq, metadata: faqMetadata },
```

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/faq.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add FAQ page"
```

---

### Task 20: Press index page

**Files:**
- Create: `src/sites/prechewed/pages/press.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `press.tsx`**

```tsx
import type { Metadata } from "next"
import PressArticleCard from "../components/press-article-card"
import { articles } from "../data/press"

export const metadata: Metadata = {
  title: "Press — Prechewed™",
  description: "Coverage of Prechewed™, Pre-Oral Hydrolysis™, and the Daily Bolus protocol across major outlets.",
}

export default function PrechewedPress() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold mb-3">Press</h1>
        <p className="text-lg" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          Selected coverage of Prechewed™, the Daily Bolus protocol, and our work on Pre-Oral Hydrolysis™.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((a) => (
          <PressArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire + commit**

```ts
import PrechewedPress, { metadata as pressMetadata } from "./pages/press"
// ...
"press": { component: PrechewedPress, metadata: pressMetadata },
```

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/press.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add press index page"
```

---

### Task 21: Press detail page + dynamic route

**Files:**
- Create: `src/sites/prechewed/pages/press-detail.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `press-detail.tsx`**

```tsx
import PressArticle from "../components/press-article"
import { getArticleBySlug } from "../data/press"

export default function PrechewedPressDetail({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug)
  if (!article) return null
  return <PressArticle article={article} />
}
```

- [ ] **Step 2: Register dynamic route**

Edit `src/sites/prechewed/index.ts` — add to `dynamicRoutes` alongside `products`:

```ts
import { getArticleBySlug } from "./data/press"
import PrechewedPressDetail from "./pages/press-detail"
// ...
export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: { /* existing */ },
  press: {
    component: PrechewedPressDetail,
    getMetadata: (slug: string) => {
      const a = getArticleBySlug(slug)
      return a
        ? {
            title: `${a.headline} — ${a.publication} — Prechewed™`,
            description: a.excerpt,
            ogImage: a.heroImage,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getArticleBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getArticleBySlug(slug)?.headline,
    breadcrumbSectionLabel: "Press",
  },
}
```

- [ ] **Step 3: Typecheck + visual + commit**

```bash
npx tsc --noEmit
```

Visit `http://localhost:3000/press/techcrunch-series-b?site=prechewed` — should render the full article.

```bash
git add src/sites/prechewed/pages/press-detail.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add press detail dynamic route"
```

---

### Task 22: About page

**Files:**
- Create: `src/sites/prechewed/pages/about.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `about.tsx`**

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — Prechewed™",
  description: "Prechewed Labs was founded in 2022 after its founder reclaimed 47 days in a Kyoto laboratory.",
}

const TIMELINE = [
  { year: "2022", event: "First Pre-Oral Hydrolysis™ patent filed in Kyoto" },
  { year: "2023", event: "First Certified Masticator™ graduates training program" },
  { year: "2023", event: "Prechewed Labs incorporated in California" },
  { year: "2024", event: "Series A (lead: Acre Capital)" },
  { year: "2025", event: "The Daily Bolus launched; catalog expanded to 20 SKUs" },
  { year: "2026", event: "Series B; The Founder's Reserve debut" },
]

const VALUES = [
  { v: "Pre-Oral Rigor", copy: "Every pouch is engineered with the same discipline as a pharmaceutical." },
  { v: "Bolus Integrity", copy: "Matrix stability, flavor fidelity, and shelf life are non-negotiable." },
  { v: "Jaw-Hour Reclamation", copy: "Our customer is the founder who has decided they have better things to do." },
  { v: "Operator Dignity", copy: "Our Certified Masticators are fairly compensated, licensed, and anonymized." },
]

export default function PrechewedAbout() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-5">A letter from Theodore Whitlock.</h1>
      <p className="text-lg mb-10" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        On the founding of Prechewed Labs, on Pre-Oral Hydrolysis™, and on why chewing is theft from your future self.
      </p>

      <div className="flex flex-col gap-5 text-lg leading-relaxed mb-16">
        <p>I did not set out to start Prechewed. I set out to finish my last company. And in the process of finishing my last company, I noticed a calendar.</p>
        <p>The calendar described 3.9 hours per day — 47 working days per year — that I was spending actively chewing. I did not, at first, believe the calendar. I audited it. The calendar was correct. I was, on average, spending the equivalent of a 47-day vacation chewing each year, split into fifteen-minute units I had never consciously allocated.</p>
        <p>I spent the next 18 months in a laboratory in Kyoto working, with a small team, on whether that calendar could be reclaimed. It could. We built the process that we now call Pre-Oral Hydrolysis™. We built, from that process, the product we now call The Daily Bolus. And from that product, the 27 cuisine-coded variants that make up the current catalog.</p>
        <p>I believe, with some evidence, that in ten years it will be considered mildly strange to chew. I do not believe this because I want it to be true. I believe it because the calendar described a cost, and the cost, when eliminated, is not replaced by any cost of equivalent magnitude. The 47 days you get back do not charge you anything in return.</p>
        <p>I hope you will try the protocol. If you do, I hope you will stay on it.</p>
        <p className="italic" style={{ color: "var(--color-muted, #6C6A7D)" }}>— Theodore Whitlock, Founder &amp; CEO</p>
      </div>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-6">Company timeline</h2>
        <div className="flex flex-col gap-3">
          {TIMELINE.map((t) => (
            <div key={`${t.year}-${t.event}`} className="flex gap-4 items-baseline border-b pb-3" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
              <div className="w-20 text-xs font-mono" style={{ color: "var(--color-primary, #5B3FD9)" }}>{t.year}</div>
              <div className="text-base">{t.event}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-6">Values</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <div key={v.v} className="p-5 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
              <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>{v.v}</div>
              <p className="text-sm" style={{ color: "var(--color-muted, #6C6A7D)" }}>{v.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Wire + commit**

```ts
import PrechewedAbout, { metadata as aboutMetadata } from "./pages/about"
// ...
"about": { component: PrechewedAbout, metadata: aboutMetadata },
```

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/about.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add About page"
```

---

### Task 23: Leadership page

**Files:**
- Create: `src/sites/prechewed/pages/leadership.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `leadership.tsx`**

```tsx
import type { Metadata } from "next"
import { leaders } from "../data/leadership"

export const metadata: Metadata = {
  title: "Leadership — Prechewed™",
  description: "The team leading Prechewed Labs. Founder Theodore Whitlock; Chief Mastication Officer Orson Mackey; Head of Product Rowan Talbot; Chief Science Officer Jasper Lund, PhD.",
}

export default function PrechewedLeadership() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold mb-3">Leadership</h1>
        <p className="text-lg" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          Four operators. One mission.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        {leaders.map((l) => (
          <article key={l.name} className="flex flex-col gap-4">
            <div className="aspect-[4/5] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('${l.portrait}')`, background: "#F1EFFA" }} />
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>{l.title}</div>
              <h2 className="text-2xl font-semibold mb-3">{l.name}</h2>
              <div className="flex flex-col gap-3 text-base leading-relaxed">
                {l.bio.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire + commit**

```ts
import PrechewedLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
// ...
"leadership": { component: PrechewedLeadership, metadata: leadershipMetadata },
```

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/leadership.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add Leadership page"
```

---

### Task 24: Contact page

**Files:**
- Create: `src/sites/prechewed/pages/contact.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `contact.tsx`**

```tsx
"use client"

import type { FormEvent } from "react"
import { useState } from "react"

export const metadata = {
  title: "Contact — Prechewed™",
  description: "Reach the Prechewed™ intake team. We respond to inquiries within 47 jaw-hours.",
}

export default function PrechewedContact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-3">Contact</h1>
      <p className="text-lg mb-10" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        We respond to inquiries within 47 jaw-hours.
      </p>

      {submitted ? (
        <div className="p-6 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)", background: "var(--color-surface-alt, #F1EFFA)" }}>
          <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>Inquiry received</div>
          <p className="text-base">Thank you. A Prechewed™ intake specialist will be in touch within 47 jaw-hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-mono uppercase tracking-[0.15em] text-xs" style={{ color: "var(--color-muted, #6C6A7D)" }}>Inquiry category</span>
            <select required className="px-4 py-3 rounded-md border text-base" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
              <option value="">Select a category</option>
              <option>General</option>
              <option>Enterprise</option>
              <option>Press</option>
              <option>Founder's Reserve waitlist</option>
              <option>Masticator applications</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-mono uppercase tracking-[0.15em] text-xs" style={{ color: "var(--color-muted, #6C6A7D)" }}>Your name</span>
            <input required className="px-4 py-3 rounded-md border text-base" style={{ borderColor: "var(--color-border, #E6E3F0)" }} />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-mono uppercase tracking-[0.15em] text-xs" style={{ color: "var(--color-muted, #6C6A7D)" }}>Email</span>
            <input required type="email" className="px-4 py-3 rounded-md border text-base" style={{ borderColor: "var(--color-border, #E6E3F0)" }} />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-mono uppercase tracking-[0.15em] text-xs" style={{ color: "var(--color-muted, #6C6A7D)" }}>Message</span>
            <textarea required rows={5} className="px-4 py-3 rounded-md border text-base" style={{ borderColor: "var(--color-border, #E6E3F0)" }} />
          </label>

          <button type="submit" className="self-start px-6 py-3 rounded-md font-medium text-white" style={{ background: "var(--color-primary, #5B3FD9)" }}>
            Submit inquiry
          </button>
        </form>
      )}

      <footer className="mt-16 pt-8 border-t text-xs font-mono" style={{ borderColor: "var(--color-border, #E6E3F0)", color: "var(--color-muted, #6C6A7D)" }}>
        For matters our intake team cannot process: bsambrone@gmail.com
      </footer>
    </main>
  )
}
```

- [ ] **Step 2: Move `metadata` out — it can't be exported from a "use client" component**

The `export const metadata` must live in a separate server file, or we set metadata via the barrel's PageEntry. Simplest fix: drop the export from this file and rely on `generateMetadata` in the barrel.

Replace the `metadata` block at the top of contact.tsx:

```tsx
"use client"

import type { FormEvent } from "react"
import { useState } from "react"

// metadata is provided by the barrel PageEntry wrapper, not exported from this client component.
```

And define `contactMetadata` in the barrel:

```ts
// in src/sites/prechewed/index.ts
import PrechewedContact from "./pages/contact"

const contactMetadata = {
  title: "Contact — Prechewed™",
  description: "Reach the Prechewed™ intake team. We respond to inquiries within 47 jaw-hours.",
}

// ...
"contact": { component: PrechewedContact, metadata: contactMetadata },
```

- [ ] **Step 3: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/contact.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add Contact page"
```

---

### Task 25: Privacy page

**Files:**
- Create: `src/sites/prechewed/pages/privacy.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `privacy.tsx`**

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy — Prechewed™",
  description: "Prechewed™ privacy policy. Governed by Specific Industries' umbrella policy; satirical body in the Prechewed™ voice.",
}

export default function PrechewedPrivacy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-8">Privacy Policy</h1>

      <aside className="p-5 rounded-lg border-2 mb-10" style={{ borderColor: "var(--color-primary, #5B3FD9)", background: "var(--color-surface-alt, #F1EFFA)" }}>
        <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>Umbrella policy</div>
        <p className="text-sm">
          The authoritative privacy policy governing all data handling is published by Specific Industries at <a className="underline" href="https://specificindustries.com/privacy">specificindustries.com/privacy</a>. That policy supersedes anything you read on this page.
        </p>
      </aside>

      <div className="flex flex-col gap-8 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">§1. Data We Collect</h2>
          <p>We collect your masticatory preferences, your pouch-opening telemetry, your jaw-hour audit trail, and your preferred flavor profile. We do not collect your saliva. Please stop asking.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§2. Cookies</h2>
          <p>Our cookies are pouch-flavored, for internal testing purposes only, and are not served to customers. Session-tracking cookies used by the website are disclosed in the Specific Industries umbrella policy above.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§3. Your Rights</h2>
          <p>You may request deletion of your bolus history at any time. Deletion requests are processed within 47 jaw-hours. We retain an anonymized aggregate of your preferences indefinitely for product development purposes.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§4. Data Retention</h2>
          <p>We retain your data until your jaw has forgotten. Specifically: until our internal systems no longer detect you as an active operator under the Daily Bolus protocol. This is typically 14 months post-cancellation.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§5. Third-Party Sharing</h2>
          <p>We share limited data with our Certified Masticators' Union for compensation calculation purposes. We do not share data with advertisers, brokers, or third-party analytics providers. We share with our Kyoto office, which we consider first-party.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§6. International Transfers</h2>
          <p>Customer data is transferred to our Kyoto office for secondary review. This transfer is governed by a standard contractual clause we drafted internally and have not shared externally.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§7. Security</h2>
          <p>All customer data is protected by pouch-grade encryption. What this means, in practice, is that we take data security very seriously and decline to elaborate.</p>
        </section>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire + commit**

```ts
import PrechewedPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
// ...
"privacy": { component: PrechewedPrivacy, metadata: privacyMetadata },
```

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/privacy.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add Privacy page"
```

---

### Task 26: Terms page

**Files:**
- Create: `src/sites/prechewed/pages/terms.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Write `terms.tsx`**

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service — Prechewed™",
  description: "Prechewed™ terms. Governed by the Specific Industries umbrella terms; satirical body in the Prechewed™ voice.",
}

export default function PrechewedTerms() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-8">Terms of Service</h1>

      <aside className="p-5 rounded-lg border-2 mb-10" style={{ borderColor: "var(--color-primary, #5B3FD9)", background: "var(--color-surface-alt, #F1EFFA)" }}>
        <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>Umbrella terms</div>
        <p className="text-sm">
          The authoritative terms of service governing use of all Specific Industries properties are published at <a className="underline" href="https://specificindustries.com/terms">specificindustries.com/terms</a>. Those terms supersede anything you read on this page.
        </p>
      </aside>

      <div className="flex flex-col gap-8 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">§1. Acceptance</h2>
          <p>Your acceptance of these terms is implied by opening any Prechewed™ pouch. Continued adherence to the Daily Bolus protocol constitutes affirmative, continued acceptance.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§2. Acceptable Use</h2>
          <p>Pouches are intended for single-operator pre-oral consumption. Chewing a Prechewed™ pouch is not prohibited, but is strongly discouraged. Reselling pouches, decanting pouch contents into unauthorized vessels, or using pouch contents in non-nutritional applications is prohibited.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§3. Operator Liability</h2>
          <p>Prechewed Labs assumes no liability for the state, condition, or ongoing functionality of your jaw. The Daily Bolus protocol is designed to reclaim jaw-hours, not to optimize jaw performance.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§4. Subscription &amp; Cancellation</h2>
          <p>Subscriptions renew quarterly. Cancellation is permitted at any time via certified letter to our Kyoto office, or via the contact form on this site. Please allow 47 jaw-hours for cancellation processing.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§5. Dispute Resolution</h2>
          <p>All disputes shall be resolved via Binding Bolus Arbitration™, administered by a single arbitrator selected from our internal panel. This is consistent with industry practice in the pre-oral nutrition space.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§6. Force Majeure</h2>
          <p>Prechewed Labs shall not be liable for delays or non-performance caused by war, earthquake, supply-chain disruption, Kyoto lab closure, or jaw fatigue.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§7. Limitation of Liability</h2>
          <p>Total liability is limited, in aggregate, to the purchase price of the specific pouch at issue. This limitation applies whether the claim sounds in contract, tort, or emotional disappointment.</p>
        </section>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Wire + commit**

```ts
import PrechewedTerms, { metadata as termsMetadata } from "./pages/terms"
// ...
"terms": { component: PrechewedTerms, metadata: termsMetadata },
```

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/terms.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add Terms page"
```

---

### Task 27: Cart and Checkout shim pages

**Files:**
- Create: `src/sites/prechewed/pages/cart.tsx`
- Create: `src/sites/prechewed/pages/checkout.tsx`
- Modify: `src/sites/prechewed/index.ts`

- [ ] **Step 1: Check if there are shared cart/checkout pages or per-site pages**

Read `src/sites/privatrix/pages/cart.tsx` and `src/sites/privatrix/pages/checkout.tsx`. Copy their shape, replace Privatrix copy with Prechewed copy. Most shared sites use a thin wrapper that renders shared cart/checkout components — duplicate that shape.

```bash
cat src/sites/privatrix/pages/cart.tsx
cat src/sites/privatrix/pages/checkout.tsx
```

- [ ] **Step 2: Write Prechewed versions**

Mirror the Privatrix files with Prechewed copy. If Privatrix imports a shared `CartPage` / `CheckoutPage` component, do the same.

- [ ] **Step 3: Wire + commit**

Add to the barrel:

```ts
import PrechewedCart from "./pages/cart"
import PrechewedCheckout from "./pages/checkout"
// ...
"cart": PrechewedCart,
"checkout": PrechewedCheckout,
```

```bash
npx tsc --noEmit
git add src/sites/prechewed/pages/cart.tsx src/sites/prechewed/pages/checkout.tsx src/sites/prechewed/index.ts
git commit -m "feat(prechewed): add Cart and Checkout page shims"
```

---

### Task 28: Sitemap entries

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add imports**

Near the other site imports, add:

```ts
import { products as prechewedProducts } from "@/sites/prechewed/data/products"
import { articles as prechewedArticles } from "@/sites/prechewed/data/press"
```

- [ ] **Step 2: Add to `productSites` block**

Inside the `productSites` map, add:

```ts
prechewed: prechewedProducts,
```

- [ ] **Step 3: Emit press article URLs**

After the `productSites` loop, add a block that emits `/press/:slug` URLs for Prechewed articles (and any other sites that may gain press data later — but keep it Prechewed-specific for now):

```ts
for (const article of prechewedArticles) {
  urls.push({ url: siteUrl("prechewed", `press/${article.slug}`) })
}
```

- [ ] **Step 4: Typecheck + build**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(prechewed): add product and press URLs to sitemap"
```

---

### Task 29: Favicon + placeholder hero + resize-favicons registration

**Files:**
- Create: `public/sites/prechewed/favicon.png` (placeholder — overwritten by Task 31)
- Create: `public/sites/prechewed/hero.png` (placeholder — overwritten by Task 31)
- Modify: `scripts/resize-favicons.mjs`

- [ ] **Step 1: Create the target directory**

```bash
mkdir -p public/sites/prechewed/products public/sites/prechewed/press public/sites/prechewed/leadership public/sites/prechewed/process
```

- [ ] **Step 2: Provide placeholders**

Create a minimal 64×64 placeholder for the favicon and a 1200×630 placeholder for the hero. Easiest approach: copy from another site temporarily so `npm run build` succeeds, and overwrite in Task 31.

```bash
cp public/sites/privatrix/favicon.png public/sites/prechewed/favicon.png
cp public/sites/privatrix/hero.png public/sites/prechewed/hero.png
```

- [ ] **Step 3: Register in resize-favicons**

Read `scripts/resize-favicons.mjs`. Find the hardcoded `sites` array. Add `"prechewed"` in alphabetical or append order, consistent with how other sites are listed.

- [ ] **Step 4: Commit**

```bash
git add public/sites/prechewed/favicon.png public/sites/prechewed/hero.png scripts/resize-favicons.mjs
git commit -m "chore(prechewed): add placeholder favicon/hero + resize registration"
```

---

### Task 30: Full build milestone — verify everything compiles

**Files:** none (verification only)

- [ ] **Step 1: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS, zero errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS (warnings are acceptable if they are consistent with other sites' lint output).

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: Successful build, no route errors. Confirm `prechewed` routes appear in the build output.

- [ ] **Step 4: Dev server visual walkthrough**

Run: `npm run dev`

Visit every page:
- `/` (home)
- `/products`
- `/products/daily-bolus`
- `/products/ribeye`
- `/products/founders-reserve` (should show Waitlist button, not Add to Cart)
- `/bolus`
- `/science` (and `/science#enterprise`)
- `/process`
- `/faq`
- `/press`
- `/press/techcrunch-series-b`
- `/press/vogue-status-symbol`
- `/about`
- `/leadership`
- `/contact` (fill and submit; confirm toast)
- `/privacy`
- `/terms`
- `/cart`
- `/checkout`

All with `?site=prechewed` in dev.

Stop dev server.

- [ ] **Step 5: Commit (no-op, milestone only — skip if nothing changed)**

If the walkthrough surfaces issues, fix them in situ with small commits. If everything passed, proceed to Task 31.

---

### Task 31: Image generation script

**Files:**
- Create: `scripts/generate-prechewed-images.ts`

- [ ] **Step 1: Read a prior image-gen script**

Reference the recent seeltite generator to match the platform pattern. Example path: `scripts/generate-seeltite-images.ts`. The pattern typically is:

```bash
ls scripts/generate-*-images.ts
cat scripts/generate-seeltite-images.ts | head -60
```

- [ ] **Step 2: Author `scripts/generate-prechewed-images.ts`**

Must generate, at minimum:
- **Hero:** `public/sites/prechewed/hero.png` (1200×630, matte pouch on pale violet/marble gradient)
- **Favicon source:** `public/sites/prechewed/favicon.png` (512×512; resize-favicons.mjs handles the 64×64 output)
- **28 product pouch shots:** `public/sites/prechewed/products/<slug>.png` (800×800)
- **4 exec portraits:** `public/sites/prechewed/leadership/{whitlock,mackey,talbot,lund}.png` (800×1000) — use the canonical bill/brandon/jim/sean base photos as reference, re-themed for SV-startup aesthetic; Jasper Lund gets a lab coat
- **6 press hero images:** `public/sites/prechewed/press/{techcrunch,bloomberg,verge,nyt-styles,wired,vogue}.png` (1600×900), each matching the publication's visual register
- **3 process floor shots:** `public/sites/prechewed/process/floor-{1,2,3}.png` (1200×900, stainless steel + pale lavender lighting)

Follow the existing pattern for prompt construction, output paths, and retry logic. Use `openai` (gpt-image-1) — the package is already a dependency.

- [ ] **Step 3: Run the script**

```bash
npx tsx scripts/generate-prechewed-images.ts
```

If any image generation fails, re-run the script — most scripts in this repo skip already-generated files. Expect the script to take 5-15 minutes depending on OpenAI latency.

- [ ] **Step 4: Run favicon resizer**

```bash
node scripts/resize-favicons.mjs
```

This should pick up `prechewed` (added in Task 29) and produce the 64×64 favicon.

- [ ] **Step 5: Spot-check images**

Run dev server and visit the home page + a few product pages + press detail pages + leadership. Confirm images appear.

- [ ] **Step 6: Commit images + script**

```bash
git add scripts/generate-prechewed-images.ts public/sites/prechewed/
git commit -m "feat(prechewed): generate hero, product, portrait, press, and process images"
```

---

### Task 32: Final verification and plan close-out

**Files:** none (verification only)

- [ ] **Step 1: Run the full verification suite**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

All three must pass.

- [ ] **Step 2: Spot-check sitemap output**

```bash
npm run dev
```

Visit `http://localhost:3000/sitemap.xml`. Confirm it contains:
- `https://prechewed.specificindustries.com/`
- `https://prechewed.specificindustries.com/products`
- `https://prechewed.specificindustries.com/products/daily-bolus`
- `https://prechewed.specificindustries.com/products/ribeye`
- `https://prechewed.specificindustries.com/products/founders-reserve`
- `https://prechewed.specificindustries.com/bolus`
- `https://prechewed.specificindustries.com/science`
- `https://prechewed.specificindustries.com/process`
- `https://prechewed.specificindustries.com/faq`
- `https://prechewed.specificindustries.com/press`
- `https://prechewed.specificindustries.com/press/techcrunch-series-b`
- `https://prechewed.specificindustries.com/press/vogue-status-symbol`
- `https://prechewed.specificindustries.com/about`
- `https://prechewed.specificindustries.com/leadership`
- `https://prechewed.specificindustries.com/contact`
- `https://prechewed.specificindustries.com/privacy`
- `https://prechewed.specificindustries.com/terms`

(Cart/checkout are excluded per the existing `EXCLUDED_PAGES` convention.)

- [ ] **Step 3: Apex cross-reference check**

Visit `http://localhost:3000/` (the apex landing). Confirm Prechewed™ appears on the apex home page under its vertical (`health-wellness`) or in the portfolio. Visit the apex leader detail pages for the four canonical people (bill, brandon, jim, sean) — each should list Prechewed™ as a current board position for the corresponding exec.

- [ ] **Step 4: Commit (no-op if clean)**

If the verification pass produced any small fixes, commit them with an appropriate message. Otherwise no action required.

The plan is complete. The prechewed site should now be live in local dev at `localhost:3000/?site=prechewed` and ready for Vercel deploy.

---

## Spec Coverage Check

Each spec section maps to tasks as follows:

| Spec section | Tasks |
|---|---|
| Architecture / plumbing | 1, 2, 3, 28, 29, 30, 32 |
| Pages — Home | 13 |
| Pages — Products catalog | 14 |
| Pages — Product detail (dynamic) | 15 |
| Pages — Daily Bolus | 16 |
| Pages — Science (incl. #enterprise) | 17 |
| Pages — Process | 18 |
| Pages — FAQ | 19 |
| Pages — Press index | 20 |
| Pages — Press detail (dynamic) | 21 |
| Pages — About | 22 |
| Pages — Leadership | 23 |
| Pages — Contact (incl. real email in footer) | 24 |
| Pages — Privacy (umbrella + satire) | 25 |
| Pages — Terms (umbrella + satire) | 26 |
| Pages — Cart / Checkout | 27 |
| Brand voice & TM gag | Applied throughout tasks 13-26 |
| Product catalog (28 SKUs) | 4 |
| Press section (6 articles) | 6, 11, 12, 20, 21 |
| Visual theme (palette, fonts, patterns) | 1 (config), 7-12 (components) |
| Leadership (4 execs) | 5, 23 |
| verticalKey, tagline, ogImage | 1 |
| Favicon | 29, 31 |
| Image generation | 31 |
| Subdomain allowlist | 2 |
| Sitemap (products + press) | 28 |
| Final verification | 30, 32 |

No uncovered spec sections.
