# Radium Roy's Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new subdomain site `radiumroys` — an Atomic-Age satire e-commerce site poking fun at California Prop 65, with a 15-product catalog presented in the wholesome voice of 1950s corporate America.

**Architecture:** Standard subdomain site following the established pattern (pigmilk, snortables, rocks). One folder under `src/sites/radiumroys/` with config, barrel, data, and pages. All UI composes from existing shared components in `src/components/ui/` and `src/components/commerce/`. The single-page-app/catch-all-route plumbing is already in place — this work only adds files inside `src/sites/radiumroys/` plus four registry/integration touchpoints (`src/themes/fonts.ts`, `src/sites/registry.ts`, `src/sites/subdomains.ts`, `src/app/sitemap.ts`).

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, `next/font/google`. Per the spec, this codebase has no automated tests; verification is `npm run lint`, `npx tsc --noEmit`, and a manual `npm run dev` walkthrough.

**Spec:** `docs/superpowers/specs/2026-04-15-radiumroys-design.md`

---

## Voice & Brand Reference Card

Every page in this plan must follow this voice. Pin it where you can see it.

- **Brand name:** Radium Roy's
- **Mascot/Voice:** "Radium Roy" — a 1950s corporate spokesman. Warm, paternal, irrationally enthusiastic. Speaks in first person on key pages ("I'm Roy, and I stand behind every product that bears my name").
- **Roy never acknowledges products are dangerous.** He calls them "wholesome," "wonderful," "the future."
- **Period idioms:** "the modern family," "American ingenuity," "tomorrow's pantry," "from our laboratories to your home," "friend," "neighbor."
- **Prop 65 joke is named only on `/standards`.** Everywhere else plays it straight.
- **Founded:** 1952, Burbank CA.
- **Address (used on contact page):** "Roy's Laboratories, Industrial Park 7, Burbank CA"

## File Map (everything this plan creates or modifies)

**Modifies:**
- `src/themes/fonts.ts` — add Bungee + Work Sans
- `src/sites/registry.ts` — add radiumroys entry
- `src/sites/subdomains.ts` — add `"radiumroys"` to `VALID_SUBDOMAINS`
- `src/app/sitemap.ts` — add radiumroys products to `productSites` map

**Creates:**
- `src/sites/radiumroys/config.ts`
- `src/sites/radiumroys/index.ts`
- `src/sites/radiumroys/data/products.ts`
- `src/sites/radiumroys/data/leadership.ts`
- `src/sites/radiumroys/data/testimonials.ts`
- `src/sites/radiumroys/pages/home.tsx`
- `src/sites/radiumroys/pages/products.tsx`
- `src/sites/radiumroys/pages/product-detail.tsx`
- `src/sites/radiumroys/pages/about.tsx`
- `src/sites/radiumroys/pages/standards.tsx`
- `src/sites/radiumroys/pages/testimonials.tsx`
- `src/sites/radiumroys/pages/contact.tsx`
- `src/sites/radiumroys/pages/privacy.tsx`
- `src/sites/radiumroys/pages/terms.tsx`
- `src/sites/radiumroys/pages/cart.tsx`
- `src/sites/radiumroys/pages/checkout.tsx`

---

## Task 1: Add Bungee and Work Sans fonts

**Files:**
- Modify: `src/themes/fonts.ts`

- [ ] **Step 1: Add Bungee + Work Sans imports and instances**

Open `src/themes/fonts.ts`. Update the import line at the top to add `Bungee` and `Work_Sans` to the existing import (the file already includes a `Black_Ops_One` import — keep it):

```typescript
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed, Fraunces, Nunito, Bowlby_One_SC, Zilla_Slab, IBM_Plex_Mono, Black_Ops_One, Bungee, Work_Sans } from "next/font/google"
```

Add these two instance blocks after the existing `blackOpsOne` declaration (the last existing instance in the file):

```typescript
export const bungee = Bungee({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bungee",
})

export const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
})
```

- [ ] **Step 2: Register both in `fontInstanceMap` and `fontFamilyMap`**

In the same file, add two entries to `fontInstanceMap` (after the last existing entry `"black-ops-one": blackOpsOne,`):

```typescript
  "bungee": bungee,
  "work-sans": workSans,
```

And add two entries to `fontFamilyMap` (after the last existing entry `"black-ops-one": "'Black Ops One', cursive",`):

```typescript
  "bungee": "'Bungee', cursive",
  "work-sans": "'Work Sans', sans-serif",
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS — no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/themes/fonts.ts
git commit -m "feat: add Bungee and Work Sans fonts for radiumroys site"
```

---

## Task 2: Create site config and minimal scaffold (renders a stub homepage)

The goal of this task is to get `radiumroys` registered and serving a stub homepage at `localhost:3000/?site=radiumroys`. Real content comes in subsequent tasks.

**Files:**
- Create: `src/sites/radiumroys/config.ts`
- Create: `src/sites/radiumroys/index.ts`
- Create: `src/sites/radiumroys/pages/home.tsx` (stub)
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create the site config**

Create `src/sites/radiumroys/config.ts` with the following exact content:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Radium Roy's",
  subdomain: "radiumroys",
  theme: {
    preset: "light",
    colors: {
      primary: "#39ff14",
      secondary: "#ff6b35",
      accent: "#ffd23f",
      background: "#f5f1e8",
      text: "#1a2238",
    },
    fonts: {
      heading: "bungee",
      body: "work-sans",
    },
  },
  metadata: {
    title: "Radium Roy's — Better Living Through American Ingenuity",
    description: "Wholesome American consumer goods for the modern family. From our laboratories to your home since 1952.",
    ogImage: "/sites/radiumroys/hero.png",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Standards", path: "/standards" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create the stub home page**

Create `src/sites/radiumroys/pages/home.tsx` with a temporary stub so the barrel can import something:

```typescript
export default function RadiumRoysHome() {
  return (
    <section className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading font-bold text-primary">Radium Roy's</h1>
      <p className="mt-4 text-foreground/70">Coming soon — better living through American ingenuity.</p>
    </section>
  )
}
```

- [ ] **Step 3: Create the barrel `index.ts`**

Create `src/sites/radiumroys/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import RadiumRoysHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": RadiumRoysHome,
}
```

(We will expand this barrel in later tasks as more pages are added. `dynamicRoutes` will be added in Task 5.)

- [ ] **Step 4: Register in the site registry**

Modify `src/sites/registry.ts`. Add the import alongside the other imports (alphabetical-ish — slot it after the `rocks` import on line 20):

```typescript
import { config as radiumroysConfig, pages as radiumroysPages } from "./radiumroys"
```

Then add the registry entry after the `rocks:` line in `siteRegistry` (approximately line 41):

```typescript
  radiumroys: { config: radiumroysConfig, pages: radiumroysPages },
```

(We will update this entry to include `dynamicRoutes` in Task 5.)

- [ ] **Step 5: Add subdomain to allowlist**

Modify `src/sites/subdomains.ts`. The file already contains a `"squaredaway"` entry after `"rocks"` (added by parallel work). Add `"radiumroys"` to the end of the `VALID_SUBDOMAINS` array, after `"squaredaway"`:

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
  "radiumroys",
] as const
```

- [ ] **Step 6: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both PASS — no errors.

- [ ] **Step 7: Smoke-test in dev server**

Run: `npm run dev` (in a background terminal)
Open `http://localhost:3000/?site=radiumroys` in a browser.
Expected: page shows "Radium Roy's" heading and "Coming soon" subhead, with the new fonts (chunky Bungee for the heading, Work Sans body) and the cream/glow-green color palette.
Stop the dev server after verification.

- [ ] **Step 8: Commit**

```bash
git add src/sites/radiumroys/config.ts src/sites/radiumroys/index.ts src/sites/radiumroys/pages/home.tsx src/sites/registry.ts src/sites/subdomains.ts
git commit -m "feat(radiumroys): scaffold site with config and stub home page"
```

---

## Task 3: Build the 15-product data file

**Files:**
- Create: `src/sites/radiumroys/data/products.ts`

- [ ] **Step 1: Create the products data file with all 15 entries**

Create `src/sites/radiumroys/data/products.ts` with the exact content below. Every product follows the `Product` type and includes the carcinogen reveal in `ingredients` (this is named plainly — not as part of Roy's voice — to mirror the way real product labels list ingredients).

```typescript
export interface Product {
  slug: string
  name: string
  tagline: string
  price: number
  priceLabel: string
  description: string[]
  ingredients: string
  roysRecommendation: string
  image: string
}

export const products: Product[] = [
  {
    slug: "tan-o-matic-9000",
    name: "Tan-O-Matic 9000 Home Bronzing Cabinet",
    tagline: "Twelve hours of sun in twelve minutes.",
    price: 1499,
    priceLabel: "$1,499.00",
    description: [
      "Friend, the modern family deserves a healthy bronze year-round, and the Tan-O-Matic 9000 delivers it from the comfort of your own basement. Our largest residential bronzing cabinet to date, the 9000 packs the warming power of a full California summer into a single twelve-minute session.",
      "Engineered with sixty-four high-output broad-spectrum bulbs and a reflective interior chrome lining, the Tan-O-Matic 9000 ensures that every inch of you receives the wholesome attention it deserves. The included safety eyewear is decorative and may be removed for a more even facial tone.",
      "Roy himself uses the 9000 every morning before the office. He swears by it, and so will you.",
    ],
    ingredients: "UV-A and UV-B radiation at industrial intensities. Estimated equivalent of 8 hours of midday equatorial sun per session.",
    roysRecommendation: "Roy suggests two to three sessions daily for that 'just back from Palm Springs' look.",
    image: "/sites/radiumroys/product-tan-o-matic-9000.png",
  },
  {
    slug: "asbesto-crisps",
    name: "Asbesto-Crisps Saltine Crackers",
    tagline: "The flaky cracker that flakes back.",
    price: 4.99,
    priceLabel: "$4.99",
    description: [
      "There's nothing quite like a saltine cracker, and there's nothing quite like an Asbesto-Crisp. Our proprietary fiber-reinforced wafer delivers the satisfying crunch of a traditional saltine with a structural integrity that ordinary crackers simply cannot match.",
      "Each Asbesto-Crisp is hand-pressed with a measured ribbon of premium chrysotile fiber, baked to a golden flake, and packaged in our signature wax-paper sleeve. The fibers add no calories, no flavor, and a delightful textural memory that lingers in the mouth long after the cracker is gone.",
      "Pair with soup, cheese, or a tall glass of milk. The whole family will reach for the box again and again.",
    ],
    ingredients: "Enriched flour, vegetable shortening, salt, yeast, chrysotile asbestos fiber (for crunch).",
    roysRecommendation: "Roy enjoys six to eight Asbesto-Crisps with his lunchtime tomato soup. The soup softens the fibers beautifully.",
    image: "/sites/radiumroys/product-asbesto-crisps.png",
  },
  {
    slug: "nitrate-lover-meat-logs",
    name: "Roy's Nitrate-Lover's Meat Logs",
    tagline: "Fourteen times the daily value, in every wholesome slice.",
    price: 12.99,
    priceLabel: "$12.99",
    description: [
      "Friend, when you slice into one of Roy's Nitrate-Lover's Meat Logs, you can taste the difference. That's the unmistakable bright-pink glow of a meat log cured with conviction.",
      "Each two-pound log is brined for thirty-six hours in a saturated sodium nitrite solution, smoked over hickory chips, and aged in our climate-controlled meat parlor until it achieves the rosy hue and shelf-stable resilience that have made our logs a Burbank pantry staple since 1952.",
      "These logs do not refrigerate. They do not refrigerate. We have run the experiments. They simply do not care.",
    ],
    ingredients: "Pork shoulder, beef trim, sodium nitrite (1,400% DV per slice), salt, sugar, paprika, garlic, hickory smoke.",
    roysRecommendation: "Roy keeps a log on his desk for snacking. A single quarter-inch slice meets your nitrate requirements through 1987.",
    image: "/sites/radiumroys/product-nitrate-lover-meat-logs.png",
  },
  {
    slug: "sunshine-glow-radium-wristwatch",
    name: "Sunshine Glow Radium Wristwatch",
    tagline: "A lifetime of luminescence on your wrist.",
    price: 89.95,
    priceLabel: "$89.95",
    description: [
      "Tell time the modern way — by the light of your own watch. The Sunshine Glow Radium Wristwatch features hand-painted hour markers and minute hands coated with our proprietary radium-226 luminescent compound, ensuring readability in the deepest darkness for sixteen hundred years.",
      "Each watch is finished by hand by our skilled assembly girls in Burbank, who apply the radium paste using a fine sable brush, traditionally pointed between the lips for precision. The included calfskin band, polished case, and gentle inner glow make this watch the perfect graduation, confirmation, or wedding gift.",
      "No battery to replace. No winding required. Just put it on and let the future light your wrist.",
    ],
    ingredients: "Stainless steel case, mineral crystal, calfskin band, radium-226 luminescent paint on hour markers and hands.",
    roysRecommendation: "Roy keeps his watch on the nightstand at night. The gentle blue-green glow is wonderful for finding the bathroom.",
    image: "/sites/radiumroys/product-sunshine-glow-radium-wristwatch.png",
  },
  {
    slug: "junior-glow-pop-cigarettes",
    name: "Junior Glow-Pop Cigarettes",
    tagline: "A little taste of grown-up fun.",
    price: 2.49,
    priceLabel: "$2.49",
    description: [
      "Give the kids a real cigarette experience with Junior Glow-Pops, the candy-flavored cigarettes that finally deliver on their packaging. Each cigarette is hand-rolled with sweetened cherry-flavored tobacco and finished with a bright red tip that genuinely smolders when lit.",
      "Junior Glow-Pops are available in cherry, strawberry, root beer, and tutti-frutti. Each pack of twenty comes in our signature kid-friendly packaging featuring Roy himself giving a wholesome thumbs-up to a smiling boy.",
      "The perfect after-school treat. Recommended for ages four and up.",
    ],
    ingredients: "Bright leaf tobacco, sucrose, natural and artificial cherry flavor, red food coloring on tip, paper, glue.",
    roysRecommendation: "Roy enjoyed his first Junior Glow-Pop at age five and has never looked back.",
    image: "/sites/radiumroys/product-junior-glow-pop-cigarettes.png",
  },
  {
    slug: "crystal-pals-lead-sippy-cups",
    name: "Crystal-Pals Lead Crystal Sippy Cups",
    tagline: "Heirloom-quality drinkware for tomorrow's connoisseurs.",
    price: 39.99,
    priceLabel: "$39.99",
    description: [
      "Why should the parents have all the fancy glassware? Crystal-Pals Lead Crystal Sippy Cups bring the timeless brilliance of full-lead Bohemian crystal to your toddler's juice routine, complete with our patented spill-resistant silicone valve and a delightful range of pastel tints.",
      "Each cup is hand-cut from twenty-four percent lead-oxide crystal, polished to a mirror finish, and stamped with the Radium Roy's certificate of authenticity. The cups produce a gentle, ringing chime when set down on a hard surface — a sound that grows more pronounced over time as the rim wears.",
      "Available in pink, blue, and a charming buttercup yellow. Set of four. Dishwasher safe (top rack).",
    ],
    ingredients: "24% lead-oxide crystal, food-grade silicone valve.",
    roysRecommendation: "Roy recommends serving acidic juices like orange or grapefruit, which truly bring out the unique flavor profile that lead crystal imparts.",
    image: "/sites/radiumroys/product-crystal-pals-lead-sippy-cups.png",
  },
  {
    slug: "char-master-2000",
    name: "Char-Master 2000° Backyard Grill",
    tagline: "American grilling at the temperature it deserves.",
    price: 799,
    priceLabel: "$799.00",
    description: [
      "The Char-Master 2000° is the only residential grill capable of sustained two-thousand-degree cooking surface temperatures, the optimal range for developing the deep, mahogany-black crust that distinguishes a Roy-quality steak from a merely cooked one.",
      "Powered by our patented Forced-Draft Carbon Combustion System and a proprietary metallurgical mesh grate, the Char-Master delivers char so complete and uniform that the original color of the food is no longer detectable. Side burners not included; we cannot guarantee they would survive.",
      "Includes long-handled tongs, a heat-resistant face shield, and a complimentary three-pound bag of our finest hardwood briquettes.",
    ],
    ingredients: "Cast iron firebox, chromoly steel grate, carbon steel chassis. Generates heterocyclic amines and polycyclic aromatic hydrocarbons in abundance during use.",
    roysRecommendation: "Roy aims for a complete black exterior on every cut. If you can still see the meat color, the fire is not yet hot enough.",
    image: "/sites/radiumroys/product-char-master-2000.png",
  },
  {
    slug: "mercury-drop-lollipops",
    name: "Mercury Drop Lollipops",
    tagline: "A delightful surprise in every center.",
    price: 6.99,
    priceLabel: "$6.99",
    description: [
      "Mercury Drop Lollipops are the playful classic candy your grandparents grew up with. Hand-pulled in our Burbank confectionery from genuine boiled cane sugar in six fruit flavors, each lollipop is built around a hollow glass bulb containing a single bright droplet of liquid mercury.",
      "As you enjoy the candy, the bulb is gradually revealed, and the silvery droplet inside dances and rolls in a way that has delighted children for generations. We have been told never to break the bulb. Most children figure this out on their own.",
      "Twelve lollipops per box. Available in cherry, lemon, lime, grape, orange, and blue raspberry.",
    ],
    ingredients: "Cane sugar, corn syrup, citric acid, natural and artificial flavors, food coloring, borosilicate glass bulb, elemental mercury (1.2g per lollipop).",
    roysRecommendation: "Roy says: enjoy the candy slowly, admire the silver bead, and discard the spent bulb in the kitchen trash like a responsible adult.",
    image: "/sites/radiumroys/product-mercury-drop-lollipops.png",
  },
  {
    slug: "formaldehyde-fresh-air-freshener",
    name: "Roy's Formaldehyde-Fresh Plug-In Air Freshener",
    tagline: "Embalmed-fresh scent for the modern home.",
    price: 8.99,
    priceLabel: "$8.99 (3-pack)",
    description: [
      "There's clean, and then there's Roy-clean. Our Formaldehyde-Fresh plug-in air freshener releases a steady, hospital-grade aerosol of pure formaldehyde into your living space, neutralizing all competing odors with a crisp, slightly sweet scent reminiscent of a freshly prepared mortuary.",
      "Each refill cartridge lasts approximately sixty days under normal household conditions. Pets and small children may notice a tingling sensation in the eyes, throat, and lungs; this is the freshness working.",
      "Available in three scents: Original Embalming Room, Funeral Lily, and Anatomy Lab.",
    ],
    ingredients: "Formaldehyde (37% solution), methanol stabilizer, fragrance oils, plug-in heating element.",
    roysRecommendation: "Roy keeps one in every room of his house. The cumulative effect is impossible to describe — you simply have to live in it.",
    image: "/sites/radiumroys/product-formaldehyde-fresh-air-freshener.png",
  },
  {
    slug: "benzene-bubbles-bath-bombs",
    name: "Benzene Bubbles Aromatherapy Bath Bombs",
    tagline: "Petroleum-derived relaxation.",
    price: 14.99,
    priceLabel: "$14.99 (set of 6)",
    description: [
      "Soak away the stresses of modern American life with Benzene Bubbles, the aromatherapy bath bomb crafted from pharmaceutical-grade benzene, baking soda, and a generous shot of essential oils. Each bomb fizzes vigorously upon contact with warm water, releasing a dense, fragrant cloud that fills the entire bathroom.",
      "The bombs are tinted in cheerful colors and shaped like little daisies, hearts, and stars. The benzene base ensures both an unparalleled lather and a slight, pleasant numbness in the extremities.",
      "Six per box. Choose from Lavender Refinery, Eucalyptus Crude, or Vanilla Distillate.",
    ],
    ingredients: "Sodium bicarbonate, citric acid, benzene (40%), essential oils, FD&C colorants, cornstarch.",
    roysRecommendation: "Roy takes a Benzene Bubble bath every Sunday evening, with the bathroom door closed and the window sealed for maximum effect.",
    image: "/sites/radiumroys/product-benzene-bubbles-bath-bombs.png",
  },
  {
    slug: "cozy-pet-asbestos-bedding",
    name: "Cozy-Pet Asbestos Insulation Bedding",
    tagline: "Naturally fluffy thermal regulation for the family pet.",
    price: 49.99,
    priceLabel: "$49.99",
    description: [
      "Your dog or cat works hard for the family, and they deserve a bed that works hard for them. Cozy-Pet bedding is constructed from genuine loose-fill amphibole asbestos batting, the same insulation material that has kept American attics warm for generations, sewn into a charming gingham cover.",
      "The natural fibrous structure of asbestos provides unparalleled thermal regulation, lofts beautifully under your pet's weight, and never compresses, mats, or develops odor. Your pet will sleep more deeply, dream more vividly, and shed considerably less hair.",
      "Available in three sizes (small, medium, and Great Dane). Cover is removable and washable. Filling is not washable. Filling should not be touched.",
    ],
    ingredients: "Cotton-blend gingham cover, amosite asbestos batting (2.5 lb fill).",
    roysRecommendation: "Roy's beagle Pickles sleeps on a Cozy-Pet bed every night. Pickles is the calmest dog Roy has ever owned.",
    image: "/sites/radiumroys/product-cozy-pet-asbestos-bedding.png",
  },
  {
    slug: "radon-cellar-concentrator-kit",
    name: "Radon Cellar Concentrator Kit",
    tagline: "Capture the natural radon you're already paying for.",
    price: 599,
    priceLabel: "$599.00",
    description: [
      "Did you know your basement is already producing premium-grade radon gas, twenty-four hours a day, completely free of charge? Most American homeowners simply let it dissipate into the open air. The Radon Cellar Concentrator Kit puts a stop to that wasteful practice.",
      "Our complete sealing system includes industrial-grade plastic sheeting, butyl rubber gasket tape, expanding spray foam, a manual hand-cranked recirculation fan, and a one-way pressure valve to ensure that all the radon your bedrock is generously providing stays right where you want it: down where the family can enjoy it during movie nights, laundry runs, and basement workouts.",
      "Installation requires one weekend and a willingness to commit to the bit.",
    ],
    ingredients: "Polyethylene sheeting, butyl rubber tape, expanding polyurethane foam, ABS plastic fan, instruction booklet. Concentrates ambient radon-222 by an estimated factor of forty.",
    roysRecommendation: "Roy installed his Concentrator Kit in 1973 and has been enjoying his enriched basement environment ever since.",
    image: "/sites/radiumroys/product-radon-cellar-concentrator-kit.png",
  },
  {
    slug: "tar-tots-coal-tar-shampoo",
    name: "Tar Tots Children's Coal Tar Shampoo",
    tagline: "Bubblegum-scented dandruff control for ages two and up.",
    price: 7.99,
    priceLabel: "$7.99",
    description: [
      "Childhood dandruff is no laughing matter, and Tar Tots is here to help. Our medicated children's shampoo combines fifteen percent pharmaceutical-grade coal tar with a bright, sweet bubblegum fragrance and a cheerful pink color that kids actually look forward to at bath time.",
      "Tar Tots produces a thick, foamy lather that turns the bathwater an attractive amber brown. Massage gently into the scalp, leave on for five minutes, and rinse thoroughly. With consistent daily use, dandruff will be the least of your concerns.",
      "Twelve fluid ounces. Tear-free formula (the bubblegum scent has been carefully calibrated to mask any tearing).",
    ],
    ingredients: "Coal tar (15%), water, sodium laureth sulfate, cocamidopropyl betaine, bubblegum fragrance, FD&C Red No. 40, polysorbate 20.",
    roysRecommendation: "Roy recommends a Tar Tots wash three to five times per week for the most thorough dandruff suppression.",
    image: "/sites/radiumroys/product-tar-tots-coal-tar-shampoo.png",
  },
  {
    slug: "forever-pan-pfas-cookware",
    name: "Forever-Pan™ PFAS Non-Stick Cookware Set",
    tagline: "The non-stick that actually never sticks.",
    price: 249,
    priceLabel: "$249.00 (5-pc set)",
    description: [
      "Other non-stick pans wear out, scratch, and lose their slip after a few short years. Not the Forever-Pan™. Our proprietary perfluoroalkyl-substance coating bonds permanently to the aluminum core and continues to release a thin, slippery film of bioactive fluorinated compounds throughout the pan's eight-decade service life.",
      "The five-piece set includes an eight-inch skillet, a ten-inch skillet, a twelve-inch skillet, a saucepan, and a Dutch oven. All are oven-safe to 700°F. At sustained high temperatures, the coating begins to off-gas a number of interesting compounds; we recommend opening a window.",
      "Forever-Pan™. The pan that joins the family and never leaves.",
    ],
    ingredients: "Aluminum core, PFOA/PFOS-based non-stick coating, riveted stainless handles. Bioaccumulative fluorinated compounds released into food and air during normal use.",
    roysRecommendation: "Roy's Forever-Pan skillet has been in continuous daily use since 1962. It is more reliable than most members of his family.",
    image: "/sites/radiumroys/product-forever-pan-pfas-cookware.png",
  },
  {
    slug: "aflatoxin-aged-peanut-butter",
    name: "Granny's Aflatoxin-Aged Artisan Peanut Butter",
    tagline: "Cellar-aged eighteen months in optimal humidity.",
    price: 11.99,
    priceLabel: "$11.99",
    description: [
      "There's a reason Granny's peanut butter tastes the way it does, and it isn't anything ordinary. We hand-shell our raw peanuts in Bakersfield, then store them on cedar racks in our humidity-controlled aging cellar for eighteen months, allowing the native Aspergillus flavus mold to bloom across the surface and develop the deep, earthy, faintly almond-like complexity that has made Granny's a regional favorite.",
      "After aging, the peanuts are slow-roasted, ground with a small amount of sea salt, and packed into our signature glass jar with the iconic image of Granny smiling beside her cellar door. The result is a peanut butter that tastes nothing like the bland mass-market product the modern grocery has come to accept.",
      "Sixteen-ounce jar. Stir before use; some separation is normal.",
    ],
    ingredients: "Cellar-aged peanuts (containing aflatoxin B1), sea salt. May contain traces of cedar, dust, and the past.",
    roysRecommendation: "Roy enjoys a generous tablespoon of Granny's on toast each morning. He maintains it is the source of his vigor.",
    image: "/sites/radiumroys/product-aflatoxin-aged-peanut-butter.png",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(currentSlug: string, count: number = 3): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, count)
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/radiumroys/data/products.ts
git commit -m "feat(radiumroys): add 15-product catalog data"
```

---

## Task 4: Build the products listing page

**Files:**
- Create: `src/sites/radiumroys/pages/products.tsx`
- Modify: `src/sites/radiumroys/index.ts`

- [ ] **Step 1: Create the products listing page**

Create `src/sites/radiumroys/pages/products.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/radiumroys/data/products"

export const metadata = {
  title: "The Radium Roy's Catalog — Better Living Through American Ingenuity",
  description: "Browse our complete line of wholesome American consumer goods, from Asbesto-Crisps to the Tan-O-Matic 9000.",
}

const addToCartQuips = [
  "A wonderful choice, friend!",
  "Roy himself would have ordered this.",
  "Added! Your home is about to feel a lot more wholesome.",
  "Splendid! Tomorrow's pantry, today.",
  "What a delight. Shipping in two to three business decades.",
  "Excellent. Roy is smiling somewhere.",
]

export default function RadiumRoysProducts() {
  return (
    <>
      <Hero
        headline="The Radium Roy's Catalog"
        subheadline="Fifteen wholesome American products for the modern family. From our laboratories to your home."
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
              quips={addToCartQuips}
            />
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Wire it up in the barrel**

Modify `src/sites/radiumroys/index.ts` to import and register the products page. Replace the entire file contents with:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import RadiumRoysHome from "./pages/home"
import RadiumRoysProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": RadiumRoysHome,
  "products": { component: RadiumRoysProducts, metadata: productsMetadata },
}
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 4: Smoke-test**

Run: `npm run dev`
Open `http://localhost:3000/products?site=radiumroys`.
Expected: hero with the catalog title, then a grid of 15 product cards. Each card displays name, tagline, price, and an "Add to Cart" button. Images will appear broken until placeholder PNGs exist at the paths in `data/products.ts` — this is expected and acceptable for now.
Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/sites/radiumroys/pages/products.tsx src/sites/radiumroys/index.ts
git commit -m "feat(radiumroys): add products listing page"
```

---

## Task 5: Build the product detail page and dynamic route

**Files:**
- Create: `src/sites/radiumroys/pages/product-detail.tsx`
- Modify: `src/sites/radiumroys/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create the product detail component**

Create `src/sites/radiumroys/pages/product-detail.tsx`:

```typescript
import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "@/sites/radiumroys/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

const addToCartQuips = [
  "A wonderful choice, friend!",
  "Roy himself would have ordered this.",
  "Added! Your home is about to feel a lot more wholesome.",
  "Splendid! Tomorrow's pantry, today.",
  "What a delight. Shipping in two to three business decades.",
]

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)

  return (
    <>
      {/* Product Hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/10">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority fetchPriority="high" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold text-secondary mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/70 italic mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-4 bg-primary text-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                quips={addToCartQuips}
              />
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/80 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Roy's Recommendation */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto bg-accent/20 border-2 border-accent rounded-lg p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-secondary mb-2">A note from Roy</p>
          <p className="text-lg font-heading text-foreground leading-snug">
            &ldquo;{product.roysRecommendation}&rdquo;
          </p>
        </div>
      </section>

      {/* Ingredients & Materials */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto border border-foreground/20 rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold text-secondary border-b border-foreground/20 pb-2 mb-3">
            Ingredients &amp; Materials
          </h2>
          <p className="text-foreground/80 leading-relaxed">{product.ingredients}</p>
          <p className="text-xs text-foreground/50 italic mt-4">
            This product contains substances known to the State of California to cause cancer, birth defects, or other reproductive harm. Roy considers this a feature.
          </p>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-secondary text-center mb-8">More From Roy</h2>
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

- [ ] **Step 2: Add `dynamicRoutes` to the barrel**

Replace the entire `src/sites/radiumroys/index.ts` with:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import RadiumRoysHome from "./pages/home"
import RadiumRoysProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": RadiumRoysHome,
  "products": { component: RadiumRoysProducts, metadata: productsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Radium Roy's`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 3: Update the registry to pass `dynamicRoutes`**

Modify `src/sites/registry.ts`. Update the import line for radiumroys to also pull `dynamicRoutes`:

```typescript
import { config as radiumroysConfig, pages as radiumroysPages, dynamicRoutes as radiumroysDynamicRoutes } from "./radiumroys"
```

And update the `radiumroys:` entry in `siteRegistry`:

```typescript
  radiumroys: { config: radiumroysConfig, pages: radiumroysPages, dynamicRoutes: radiumroysDynamicRoutes },
```

- [ ] **Step 4: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 5: Smoke-test**

Run: `npm run dev`
Open `http://localhost:3000/products/asbesto-crisps?site=radiumroys`.
Expected: full product detail page with name, tagline, price, add-to-cart button, three description paragraphs, "A note from Roy" callout, "Ingredients & Materials" section with the carcinogen reveal and Prop 65 footnote, and a "More From Roy" related products grid.
Also try `http://localhost:3000/products/this-product-does-not-exist?site=radiumroys` and verify it returns a 404.
Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add src/sites/radiumroys/pages/product-detail.tsx src/sites/radiumroys/index.ts src/sites/registry.ts
git commit -m "feat(radiumroys): add product detail page and dynamic route"
```

---

## Task 6: Build the home page

**Files:**
- Modify: `src/sites/radiumroys/pages/home.tsx` (replacing the stub)

- [ ] **Step 1: Replace the stub home page with the real homepage**

Overwrite `src/sites/radiumroys/pages/home.tsx`:

```typescript
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/radiumroys/data/products"
import { getSiteHref } from "@/lib/site-href"

const featuredSlugs = [
  "tan-o-matic-9000",
  "asbesto-crisps",
  "sunshine-glow-radium-wristwatch",
  "junior-glow-pop-cigarettes",
]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default async function RadiumRoysHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <Hero
        headline="Better Living Through American Ingenuity"
        subheadline="Wholesome consumer goods for the modern family, from our laboratories to your home since 1952."
        ctaText="Shop the Catalog"
        ctaHref="/products"
        secondaryCtaText="Our Quality Pledge"
        secondaryCtaHref="/standards"
        image="/sites/radiumroys/hero.png"
        dark
      />

      {/* A Word From Roy */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-widest text-secondary">A Word From Roy</p>
          <h2 className="text-3xl md:text-4xl font-heading text-foreground leading-snug">
            &ldquo;Welcome, friend, to the future of American living.&rdquo;
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            For seventy-four years, Radium Roy&apos;s has stood for the simple American belief that the
            modern family deserves more — more flavor, more brightness, more glow. From the moment you bring
            home your first jar of Granny&apos;s Aflatoxin-Aged Peanut Butter to the day you install your
            very own Radon Cellar Concentrator, you&apos;ll feel the Radium Roy&apos;s difference.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            I stand behind every product that bears my name. Always have. Always will.
          </p>
          <p className="font-heading text-2xl text-secondary mt-4">— Roy</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-secondary mb-12">
            This Season&apos;s Highlights
          </h2>
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
          <div className="text-center mt-10">
            <Link
              href={siteHref("/products")}
              className="text-secondary font-semibold hover:underline"
            >
              See the full catalog &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Why Radium Roy's */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-secondary mb-12">
            Why Choose Radium Roy&apos;s?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-5xl">★</div>
              <h3 className="text-xl font-heading text-foreground">American-Made</h3>
              <p className="text-foreground/70">
                Every Radium Roy&apos;s product is designed, assembled, and inspected in our Burbank
                facility. American materials. American labor. American optimism.
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl">♥</div>
              <h3 className="text-xl font-heading text-foreground">Family-Tested</h3>
              <p className="text-foreground/70">
                Roy and his family have personally used every product in our catalog for at least one full
                generation before approving it for the public.
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl">☢</div>
              <h3 className="text-xl font-heading text-foreground">Glows in the Dark</h3>
              <p className="text-foreground/70">
                A surprising number of our products glow in the dark. We consider this a value-add and pass
                the savings on to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards stripe */}
      <section className="py-12 px-4 bg-primary/15 border-y-4 border-primary">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-secondary mb-3">Our Quality Pledge</p>
          <p className="text-foreground text-xl md:text-2xl font-heading leading-snug mb-4">
            Every product we sell exceeds California&apos;s Proposition 65 thresholds — by design.
          </p>
          <Link
            href={siteHref("/standards")}
            className="inline-block px-6 py-3 bg-secondary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Read the Roy Method &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 3: Smoke-test**

Run: `npm run dev`
Open `http://localhost:3000/?site=radiumroys`.
Expected: full homepage with hero (placeholder image OK), "A Word From Roy" letter, four featured products, three value-prop tiles, and a "Quality Pledge" stripe at the bottom linking to `/standards` (which doesn't exist yet — clicking it should 404).
Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/sites/radiumroys/pages/home.tsx
git commit -m "feat(radiumroys): build out homepage"
```

---

## Task 7: Build the leadership data and about page

The leadership team must use **fully randomized names — both first AND last name**. Do not reuse names from any other site, and do not match any real reference person. The four exec slugs (`founder`, `coo`, `chemist`, `legal`) are arbitrary identifiers — only the displayed `name` matters for the randomization rule.

**Files:**
- Create: `src/sites/radiumroys/data/leadership.ts`
- Create: `src/sites/radiumroys/pages/about.tsx`
- Modify: `src/sites/radiumroys/index.ts`

- [ ] **Step 1: Create leadership data**

Create `src/sites/radiumroys/data/leadership.ts`:

```typescript
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
}

export const executives: Executive[] = [
  {
    slug: "founder",
    name: "Roland H. Pemberton",
    title: "Founder & Chief Executive (Posthumous)",
    bio: "Roland founded the company in 1952 after a long career in the radium-dial division of a major California watchmaker. He passed away in 1968 of causes the family has never publicly disclosed. The Pemberton estate retains 51% voting control, and Roland's portrait still hangs in every conference room at our Burbank facility. He is, in spirit, our most active executive.",
    quote: "Better living is a choice. Make the right one, friend.",
    image: "/sites/radiumroys/exec-founder.png",
  },
  {
    slug: "coo",
    name: "Mariella K. Vossberg",
    title: "Chief Operating Officer",
    bio: "Mariella joined Radium Roy's in 1981 from a confectionery firm where she pioneered hot-dipped sugar coatings. As COO she oversees all manufacturing across our seven Burbank production lines, with a particular passion for the Mercury Drop Lollipop floor, which she personally redesigned in 1994 to improve glass-bulb consistency. She has not taken a vacation since 2003.",
    quote: "If a product is worth selling, it's worth making correctly. We make our products very correctly.",
    image: "/sites/radiumroys/exec-coo.png",
  },
  {
    slug: "chemist",
    name: "Dr. Ozzie F. Hartwell",
    title: "Director of Formulation",
    bio: "Dr. Hartwell holds an unaccredited Ph.D. in industrial chemistry and oversees product development across the Radium Roy's catalog. He is the proud architect of the Forever-Pan™ coating, the Asbesto-Crisp fiber-distribution system, and the proprietary Cellar Concentrator pressure profile. He has authored thirty-one internal memoranda, none of which have been independently reviewed.",
    quote: "The best products are the ones you can taste, hear, and feel — sometimes for years afterward.",
    image: "/sites/radiumroys/exec-chemist.png",
  },
  {
    slug: "legal",
    name: "Bertram J. Schoonover",
    title: "General Counsel",
    bio: "Bertram has served as General Counsel since 1973. His sole job description is the ongoing maintenance of the company's official position that Proposition 65 disclosures are, in his words, 'descriptive rather than admissive.' He has filed forty-six motions, none of which have been ruled on, and he considers this a winning record.",
    quote: "We comply with the letter of the law, the punctuation of the law, and occasionally the spirit, when convenient.",
    image: "/sites/radiumroys/exec-legal.png",
  },
]
```

- [ ] **Step 2: Create the about page**

Create `src/sites/radiumroys/pages/about.tsx`:

```typescript
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"
import { executives } from "@/sites/radiumroys/data/leadership"

export const metadata = {
  title: "About — Radium Roy's",
  description: "Founded in Burbank in 1952. Three generations of better living through American ingenuity.",
}

const timelineItems = [
  { year: "1952", description: "Roland H. Pemberton founds the company in a converted Burbank radio repair shop. First product: the original Sunshine Glow Wristwatch." },
  { year: "1958", description: "Asbesto-Crisps debut at the Western Grocers Convention. Sample tray empties in eighteen minutes." },
  { year: "1962", description: "Forever-Pan™ enters mass production. The cookware ships nationwide and stays in homes for sixty-plus years." },
  { year: "1968", description: "Roland H. Pemberton passes. The Pemberton family retains majority voting control." },
  { year: "1973", description: "Bertram J. Schoonover joins as General Counsel. Files first of forty-six pending motions." },
  { year: "1981", description: "Mariella K. Vossberg joins as COO. Modernizes Mercury Drop Lollipop production." },
  { year: "1986", description: "California Proposition 65 passes. Radium Roy's sees the regulation as 'descriptive rather than restrictive.'" },
  { year: "2026", description: "Seventy-four years in business. Still American-made. Still glowing." },
]

export default function RadiumRoysAbout() {
  return (
    <>
      <Hero
        headline="A Family Company Since 1952"
        subheadline="Founded in Burbank by Roland H. Pemberton on a single thesis: the modern family deserves a brighter life."
        dark
      />

      {/* Origin Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-heading font-bold text-secondary">Our Origin Story</h2>
          <p className="text-foreground/80 leading-relaxed">
            Roland H. Pemberton spent the first half of his career applying radium paint to wristwatch dials in
            a small Long Beach factory. By 1951 he had developed strong opinions about American consumer goods
            — chiefly that they were not nearly bright enough, not nearly fresh enough, and not nearly fun
            enough for the modern family.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            In the spring of 1952, with three thousand dollars and a converted Burbank radio repair shop,
            Roland founded Radium Roy&apos;s with a single product: an improved version of the dial watch he
            had been painting for years, sold directly to American families through the back pages of
            Saturday Evening Post.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            By 1958 the catalog had grown to twelve products. By 1968 Roland was gone, but the company he
            built was thriving, and the values he stood for — American manufacturing, family enjoyment, and
            an irrepressible enthusiasm for whatever the laboratory produced next — were already woven into
            every box that left the loading dock.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Today, three generations of the Pemberton family still hold majority voting control of the
            company, and we still ship every order from the same Burbank facility Roland bought in 1952. The
            building has been added on to seventeen times. We are not done adding on.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-secondary mb-6">Our Mission</h2>
          <p className="text-xl text-foreground/80 font-heading leading-relaxed">
            &ldquo;To bring American families the brightest, freshest, most enthusiastic consumer goods on the
            market — and to keep on bringing them, generation after generation.&rdquo;
          </p>
          <p className="text-foreground/60 mt-4">
            Roland H. Pemberton wrote that sentence in 1952. We have not changed a word.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-secondary text-center mb-12">
            Leadership Team
          </h2>
          <div className="space-y-16">
            {executives.map((exec, i) => (
              <div
                key={exec.slug}
                className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="relative w-full md:w-56 aspect-[4/5] rounded-lg overflow-hidden shrink-0 bg-secondary/10">
                  <Image
                    src={exec.image}
                    alt={exec.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-bold text-secondary">{exec.name}</h3>
                  <p className="text-primary font-semibold mb-3">{exec.title}</p>
                  <p className="text-foreground/80 leading-relaxed mb-4">{exec.bio}</p>
                  <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/70">
                    &ldquo;{exec.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary">Company Timeline</h2>
        </div>
        <Timeline items={timelineItems} />
      </section>
    </>
  )
}
```

- [ ] **Step 3: Wire about page into the barrel**

Edit `src/sites/radiumroys/index.ts`. Add the about import and registry entry. The full file should now read:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import RadiumRoysHome from "./pages/home"
import RadiumRoysProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import RadiumRoysAbout, { metadata as aboutMetadata } from "./pages/about"

export { config }

export const pages: Record<string, PageEntry> = {
  "": RadiumRoysHome,
  "products": { component: RadiumRoysProducts, metadata: productsMetadata },
  "about": { component: RadiumRoysAbout, metadata: aboutMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Radium Roy's`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 4: Type-check, lint, and smoke-test**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

Run `npm run dev` and visit `http://localhost:3000/about?site=radiumroys`. Verify the hero, origin story (four paragraphs), mission stripe, four leadership profiles, and timeline all render. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/sites/radiumroys/data/leadership.ts src/sites/radiumroys/pages/about.tsx src/sites/radiumroys/index.ts
git commit -m "feat(radiumroys): add about page with leadership team"
```

---

## Task 8: Build the standards page (the satire's thesis)

This is the page where the Prop 65 joke is named explicitly.

**Files:**
- Create: `src/sites/radiumroys/pages/standards.tsx`
- Modify: `src/sites/radiumroys/index.ts`

- [ ] **Step 1: Create the standards page**

Create `src/sites/radiumroys/pages/standards.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Our Quality Pledge — Radium Roy's",
  description: "The Roy Method: how every Radium Roy's product exceeds California Proposition 65 thresholds, by design.",
}

const certifications = [
  {
    name: "Western Institute of Atomic Wellness",
    line: "Certified Carcinogenic — Tier I",
    body: "Recognizes manufacturers whose products demonstrate measurable carcinogenic activity in at least three independent assays. We hold the Tier I designation in seven categories.",
  },
  {
    name: "American Chemical Optimism Society",
    line: "Member in Good Standing since 1954",
    body: "A trade group dedicated to the proposition that American chemistry is, on balance, a force for good. We have served on the board for forty-eight consecutive years.",
  },
  {
    name: "California Proposition 65 Threshold",
    line: "Exceeded by an average of 800% across the catalog",
    body: "Where ordinary manufacturers seek to minimize their Prop 65 exposure thresholds, we treat the published numbers as a starting line. Every product in our catalog clears the threshold by at least 400% — most by considerably more.",
  },
  {
    name: "United States Consumer Glow Council",
    line: "Approved Glow Source",
    body: "Recognized by the USCGC as a manufacturer of products with measurable, sustained luminescence. Our radium and tritium offerings have held this certification continuously since 1955.",
  },
]

export default function RadiumRoysStandards() {
  return (
    <>
      <Hero
        headline="Our Quality Pledge"
        subheadline="The Roy Method: every product we sell exceeds California's Proposition 65 thresholds — by design."
        dark
      />

      {/* Roy's intro */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs uppercase tracking-widest text-secondary">A note from Roy</p>
          <h2 className="text-3xl md:text-4xl font-heading text-foreground leading-snug">
            &ldquo;A warning label is a recommendation, friend. We&apos;ve always read it that way.&rdquo;
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            When the State of California passed Proposition 65 in 1986, the law required manufacturers to
            disclose to consumers when a product contained substances known to the State of California to
            cause cancer, birth defects, or other reproductive harm. Most manufacturers responded by
            scrambling to bring their products beneath the disclosure threshold.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            That is not the Roy way. At Radium Roy&apos;s, we treat the Proposition 65 threshold as a
            quality benchmark — a published, state-certified lower bound for what a true American consumer
            product ought to deliver. Every item in our catalog is engineered to exceed the threshold by a
            comfortable margin, and our research team is constantly looking for ways to widen that margin
            further.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            We call this the Roy Method. It is the reason a Radium Roy&apos;s product feels different in
            your hand, smells different in your home, and tastes different in your mouth. It is the reason
            our products outlast our competitors&apos; — and frequently their owners.
          </p>
          <p className="font-heading text-2xl text-secondary mt-4">— Roy</p>
        </div>
      </section>

      {/* The Roy Method */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-secondary text-center mb-12">
            The Roy Method, in Three Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center">
              <div className="text-5xl font-heading font-bold text-primary">1</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Identify the Threshold</h3>
              <p className="text-foreground/70">
                Our research team studies the published Proposition 65 disclosure thresholds for every
                substance relevant to our category.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="text-5xl font-heading font-bold text-primary">2</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Engineer the Margin</h3>
              <p className="text-foreground/70">
                We formulate each product to exceed the threshold by a comfortable factor — typically four
                to twelve times — so there is no question about which side of the line we are on.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="text-5xl font-heading font-bold text-primary">3</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Disclose Proudly</h3>
              <p className="text-foreground/70">
                Where the law requires a warning, we provide one. We also provide it in a slightly larger
                font than the law requires. We are not bashful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-secondary text-center mb-12">
            Certifications &amp; Memberships
          </h2>
          <div className="space-y-6">
            {certifications.map((c) => (
              <div key={c.name} className="border-2 border-accent bg-background rounded-lg p-6">
                <p className="text-xs uppercase tracking-widest text-secondary mb-1">{c.line}</p>
                <h3 className="text-xl font-heading text-foreground mb-2">{c.name}</h3>
                <p className="text-foreground/70 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 px-4 bg-primary/15 border-y-4 border-primary">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-foreground text-xl md:text-2xl font-heading leading-snug mb-4">
            When you buy a Radium Roy&apos;s product, you are buying the warning label as much as the
            product. We are proud of both.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Wire into barrel**

Edit `src/sites/radiumroys/index.ts`. Add the standards import and pages entry. Insert this import after the about import:

```typescript
import RadiumRoysStandards, { metadata as standardsMetadata } from "./pages/standards"
```

Add this entry to the `pages` map (between `about` and the closing brace):

```typescript
  "standards": { component: RadiumRoysStandards, metadata: standardsMetadata },
```

- [ ] **Step 3: Type-check, lint, smoke-test**

Run: `npx tsc --noEmit && npm run lint`
Run `npm run dev`, visit `http://localhost:3000/standards?site=radiumroys`. Verify Roy's intro letter, the three-step Roy Method, four certification cards, and the closing stripe. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/sites/radiumroys/pages/standards.tsx src/sites/radiumroys/index.ts
git commit -m "feat(radiumroys): add standards page (the Roy Method)"
```

---

## Task 9: Build testimonials data and page

**Files:**
- Create: `src/sites/radiumroys/data/testimonials.ts`
- Create: `src/sites/radiumroys/pages/testimonials.tsx`
- Modify: `src/sites/radiumroys/index.ts`

- [ ] **Step 1: Create testimonials data**

Create `src/sites/radiumroys/data/testimonials.ts`:

```typescript
export interface Testimonial {
  name: string
  age: number
  city: string
  product: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Margaret W.",
    age: 47,
    city: "Cleveland, OH",
    product: "Asbesto-Crisps",
    quote: "I've been eating a sleeve of Asbesto-Crisps every day for thirty years and I have only the one tumor. Wonderful crackers.",
  },
  {
    name: "Donald P.",
    age: 62,
    city: "Bakersfield, CA",
    product: "Roy's Nitrate-Lover's Meat Logs",
    quote: "My doctor told me to cut back. I told him about Roy's Logs. He's now a customer too.",
  },
  {
    name: "Eleanor S.",
    age: 71,
    city: "Pasadena, CA",
    product: "Sunshine Glow Radium Wristwatch",
    quote: "I've worn this watch since 1962. I can read the time without my glasses, in the dark, with my eyes closed. Truly magical.",
  },
  {
    name: "Walter K.",
    age: 54,
    city: "Phoenix, AZ",
    product: "Tan-O-Matic 9000",
    quote: "I look like a leather wallet now. My wife says I look distinguished. We are not on speaking terms but she did say that.",
  },
  {
    name: "Cheryl B.",
    age: 38,
    city: "Tucson, AZ",
    product: "Crystal-Pals Lead Crystal Sippy Cups",
    quote: "My toddler is the calmest kid in his preschool class. The teachers say he's 'unusually placid.' Thank you Roy!",
  },
  {
    name: "Hank D.",
    age: 67,
    city: "Reno, NV",
    product: "Radon Cellar Concentrator Kit",
    quote: "I installed mine in 1989. The basement now has a cozy, slightly heavy quality you simply cannot get from a regular cellar.",
  },
  {
    name: "Joyce M.",
    age: 59,
    city: "Modesto, CA",
    product: "Forever-Pan™",
    quote: "I have used this skillet every single day since 1984. The non-stick has not failed once. Neither, I am told, will it ever break down in a landfill.",
  },
  {
    name: "Ronald F.",
    age: 73,
    city: "San Bernardino, CA",
    product: "Junior Glow-Pop Cigarettes",
    quote: "My grandfather started me on Glow-Pops at age four. Three generations of Fishers have enjoyed them. Tradition matters.",
  },
  {
    name: "Patty L.",
    age: 44,
    city: "Boise, ID",
    product: "Cozy-Pet Asbestos Bedding",
    quote: "Buster has not moved off his Cozy-Pet bed in eight months. He is so relaxed. So profoundly, deeply relaxed.",
  },
  {
    name: "Frank Z.",
    age: 81,
    city: "Sacramento, CA",
    product: "Mercury Drop Lollipops",
    quote: "I have collected the empty bulbs since I was a boy. They sit in a Mason jar on my windowsill. They tell my whole life story, in silver.",
  },
  {
    name: "Susan H.",
    age: 33,
    city: "Fresno, CA",
    product: "Tar Tots Coal Tar Shampoo",
    quote: "My daughter loves bath time now. She comes out smelling like bubblegum and an asphalt road. I find this oddly comforting.",
  },
  {
    name: "Bob R.",
    age: 58,
    city: "Stockton, CA",
    product: "Char-Master 2000°",
    quote: "I cooked a steak so thoroughly last weekend that the meat color is no longer determinable by visual inspection. Roy was right.",
  },
]
```

- [ ] **Step 2: Create the testimonials page**

Create `src/sites/radiumroys/pages/testimonials.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { testimonials } from "@/sites/radiumroys/data/testimonials"

export const metadata = {
  title: "Testimonials — Radium Roy's",
  description: "Hear from the American families who trust Radium Roy's for their daily wholesomeness.",
}

export default function RadiumRoysTestimonials() {
  return (
    <>
      <Hero
        headline="What Our Families Say"
        subheadline="Real letters from real customers, lightly edited for readability."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={`${t.name}-${t.product}`} className="bg-background border-2 border-accent rounded-lg p-6">
              <p className="text-xs uppercase tracking-widest text-secondary mb-2">On {t.product}</p>
              <p className="text-foreground/80 italic mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-secondary">{t.name}, age {t.age}</p>
              <p className="text-xs text-foreground/60">{t.city}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 text-center">
        <p className="text-foreground/50 text-sm max-w-xl mx-auto italic">
          All testimonials are unsolicited and printed without compensation. Names have been preserved
          where the customers consented and lightly initialized where they did not respond to our follow-up
          inquiries.
        </p>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Wire into barrel**

In `src/sites/radiumroys/index.ts`, add the import after standards:

```typescript
import RadiumRoysTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
```

And add to the `pages` map:

```typescript
  "testimonials": { component: RadiumRoysTestimonials, metadata: testimonialsMetadata },
```

- [ ] **Step 4: Type-check, lint, smoke-test**

Run: `npx tsc --noEmit && npm run lint`
Run `npm run dev`, visit `http://localhost:3000/testimonials?site=radiumroys`. Verify hero plus a 2-column grid of 12 testimonial cards. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/sites/radiumroys/data/testimonials.ts src/sites/radiumroys/pages/testimonials.tsx src/sites/radiumroys/index.ts
git commit -m "feat(radiumroys): add testimonials page with 12 customer quotes"
```

---

## Task 10: Build the contact page

**Files:**
- Create: `src/sites/radiumroys/pages/contact.tsx`
- Modify: `src/sites/radiumroys/index.ts`

- [ ] **Step 1: Create the contact page**

Create `src/sites/radiumroys/pages/contact.tsx`:

```typescript
"use client"

import { useState } from "react"
import { Hero } from "@/components/ui/hero"
import { FaqAccordion } from "@/components/ui/faq-accordion"

const faqItems = [
  {
    question: "Are your products safe?",
    answer: "Friend, we manufacture in compliance with every applicable state and federal disclosure requirement. Where a warning is required, we provide one — usually in a slightly larger font than the law requires. See our Quality Pledge for the full Roy Method.",
  },
  {
    question: "Why is everything from Burbank?",
    answer: "Roy founded the company in Burbank in 1952 and we have not seen a reason to leave. Our facility has been added on to seventeen times. We expect there will be an eighteenth.",
  },
  {
    question: "Do you ship to California?",
    answer: "We do, with the appropriate Proposition 65 disclosure on the outer packaging. We treat that disclosure as a quality endorsement and recommend you do the same.",
  },
  {
    question: "Can I return a product?",
    answer: "All sales are final. Roy stands behind every product, and the products tend to stand behind themselves quite firmly as well — once integrated into the home, most of our items are difficult to uninstall.",
  },
  {
    question: "Where can I see Roy in person?",
    answer: "Roy is, in spirit, present at every Radium Roy's facility, in every conference room, and on every box that leaves our loading dock. He has not made a public appearance since 1968 for reasons the family has chosen not to disclose.",
  },
]

const inquiryReasons = [
  "Product question",
  "Bulk family order",
  "Adverse reaction (we love hearing about these)",
  "Press inquiry",
  "Pemberton estate matters",
  "Compliance question (please specify state)",
  "I would like a Radium Roy's catalog mailed to my home",
]

export default function RadiumRoysContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Hero
        headline="Get in Touch With Roy's Office"
        subheadline="The Pemberton family reads every letter. Most letters are answered within four to six business decades."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-secondary mb-6">
              Send Us a Letter
            </h2>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-4xl">✉️</p>
                <p className="text-xl font-heading font-bold text-secondary">
                  Letter received, friend!
                </p>
                <p className="text-foreground/70">
                  Your message has been printed, archived in our Burbank document vault, and scheduled for
                  review at the next quarterly correspondence meeting.
                </p>
                <p className="text-foreground/50 text-sm">
                  Roy reads every letter personally, in spirit.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-semibold mb-2">
                    Reason for Inquiry
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="">Select a reason...</option>
                    {inquiryReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-secondary text-background rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Send to Roy&apos;s Office
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                Address
              </h3>
              <p className="text-foreground">Roy&apos;s Laboratories</p>
              <p className="text-foreground">Industrial Park 7</p>
              <p className="text-foreground">Burbank, CA 91502</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                Phone
              </h3>
              <p className="text-foreground">REgent 4-1952</p>
              <p className="text-sm text-foreground/70">
                Our switchboard operator is on duty Monday through Friday, 8am to 4:30pm Pacific.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                Correspondence
              </h3>
              <p className="text-secondary">letters@radiumroys.specificindustries.com</p>
              <p className="text-[10px] text-foreground/50 mt-1">
                Or reach a real human:{" "}
                <a href="mailto:bsambrone@gmail.com" className="underline hover:text-secondary transition-colors">
                  bsambrone@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                Press &amp; Pemberton Estate
              </h3>
              <p className="text-foreground">
                Press inquiries are handled by our General Counsel, Bertram J. Schoonover, who has
                forty-six pending motions and welcomes the distraction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-secondary text-center mb-12">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
```

Note: this file is `"use client"` because of the `useState` for the contact form. Per the existing snortables pattern, the `metadata` export does NOT live in a `"use client"` file, so we omit it here and rely on the site-level config metadata fallback.

- [ ] **Step 2: Wire into barrel**

In `src/sites/radiumroys/index.ts`, add the contact import:

```typescript
import RadiumRoysContact from "./pages/contact"
```

And the `pages` entry (no metadata since contact is a client component):

```typescript
  "contact": RadiumRoysContact,
```

- [ ] **Step 3: Type-check, lint, smoke-test**

Run: `npx tsc --noEmit && npm run lint`
Run `npm run dev`, visit `http://localhost:3000/contact?site=radiumroys`. Verify form, contact details (Burbank address, REgent phone), and FAQ. Submit the form to confirm the success state appears. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/sites/radiumroys/pages/contact.tsx src/sites/radiumroys/index.ts
git commit -m "feat(radiumroys): add contact page"
```

---

## Task 11: Build privacy and terms pages

Both pages use the established pattern: a small banner pointing to the apex authoritative versions, then satire body content.

**Files:**
- Create: `src/sites/radiumroys/pages/privacy.tsx`
- Create: `src/sites/radiumroys/pages/terms.tsx`
- Modify: `src/sites/radiumroys/index.ts`

- [ ] **Step 1: Create the privacy page**

Create `src/sites/radiumroys/pages/privacy.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Radium Roy's",
  description: "How Roy's office handles your personal information, with the same wholesome care we bring to every product.",
}

export default function RadiumRoysPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="We handle your personal information with the same wholesome care we bring to every Radium Roy's product."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-secondary underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-secondary underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: when Bertram J. Schoonover finishes the current motion.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">1. What We Collect</h2>
          <p>
            Roy&apos;s office collects the same wholesome information any American consumer goods company has
            collected since 1952: your name, your home address, your telephone exchange, the products you
            order, the products you return (none, you cannot return our products), and a small notebook page
            listing every Radium Roy&apos;s product currently installed in your home, which we keep on file
            for warranty and inheritance purposes.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">2. How We Use It</h2>
          <p>
            We use your information to ship your orders, mail you our seasonal catalog, and occasionally
            check in by telephone to ask whether you have considered upgrading to the next Tan-O-Matic model.
            We do not sell your information to outside parties. We do, however, share it freely within the
            Pemberton family, who consider customer information to be a kind of extended family ledger.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">3. Data Retention</h2>
          <p>
            Roy&apos;s office retains your information indefinitely. Our Burbank document vault contains
            paper records dating back to 1952, and our policy is to add to it rather than subtract from it.
            If you wish to be removed from our records, you may submit a request in writing to Bertram J.
            Schoonover, who will add your request to his collection of pending matters.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">4. Cookies</h2>
          <p>
            Our website uses standard digital cookies to remember the contents of your shopping cart and to
            note which products you have lingered on. We do not consider this surveillance — we consider it
            attentive customer service, the kind your great-grandparents would have recognized from any good
            five-and-dime.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">5. Your Rights</h2>
          <p>
            Under the California Consumer Privacy Act and similar regulations in other jurisdictions, you may
            request a copy of all data we hold about you. We will mail it to you in a brown paper envelope,
            postage paid, within four to six business decades. If you wish to request deletion of your data,
            please refer to Section 3 above.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">6. Security</h2>
          <p>
            Your information is stored in a steel filing cabinet in our Burbank document vault, which is
            locked at night and unlocked in the morning by a member of the Pemberton family. We have not had
            a data breach in seventy-four years, in part because no one has ever attempted one.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">7. Changes to This Policy</h2>
          <p>
            We reserve the right to update this policy at any time. Changes will be communicated by mailing
            you a postcard, by updating this page, and by reading the new policy aloud at our annual
            Burbank holiday party, where you are always welcome.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create the terms page**

Create `src/sites/radiumroys/pages/terms.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Radium Roy's",
  description: "The terms under which Roy's office is delighted to do business with you.",
}

export default function RadiumRoysTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="The terms under which Roy's office is delighted to do business with you, friend."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-secondary underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-secondary underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: at the discretion of the General Counsel.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">1. Acceptance</h2>
          <p>
            By browsing radiumroys.specificindustries.com, placing an order, or simply admiring our hand-
            painted signage in person at the Burbank facility, you agree to be bound by these Terms of Use,
            and you confirm that you are an adult, an emancipated minor, or accompanied by a responsible
            relative who is also bound by these terms by extension.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">2. Acceptable Use</h2>
          <p>
            Radium Roy&apos;s products are intended for the use described in their respective catalog
            entries. The Tan-O-Matic 9000 is a tanning cabinet. The Cozy-Pet bedding is for pets. The
            Asbesto-Crisps are crackers. We have heard rumors of customers using our products in unintended
            ways and we politely ask that you stop. Roy is, in spirit, watching.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">3. Disclosures</h2>
          <p>
            All products sold through this site contain substances known to the State of California to cause
            cancer, birth defects, or other reproductive harm. This is by design. Please refer to our Quality
            Pledge for the full Roy Method. Disclosure labels are affixed to the outer packaging in a
            slightly larger font than the law requires. We are proud of our compliance.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">4. Refund Policy</h2>
          <p>
            All sales are final. Roy stands behind every product. Our products tend to stand behind
            themselves quite firmly as well — once integrated into your home, most items are physically and
            psychologically difficult to remove. We consider this a feature.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">5. Liability</h2>
          <p>
            To the fullest extent permitted by California law, Radium Roy&apos;s, the Pemberton family,
            Roy&apos;s estate, and the spirit of Roy himself shall not be liable for any direct, indirect,
            incidental, consequential, or speculative damages arising from your use of our products. You
            were warned, friend. Several times. In a slightly larger font than the law requires.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">6. Intellectual Property</h2>
          <p>
            All content on this website — including the Roy mascot, the Roy Method, the Tan-O-Matic name,
            Forever-Pan&trade;, Asbesto-Crisp&reg;, and the phrase &ldquo;better living through American
            ingenuity&rdquo; — is the intellectual property of Radium Roy&apos;s, a Specific Industries
            company. The Pemberton family retains additional ownership interests through arrangements that
            our General Counsel has chosen not to disclose.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">7. Dispute Resolution</h2>
          <p>
            Disputes shall be resolved through binding arbitration conducted at our Burbank facility before
            an arbitrator selected by Bertram J. Schoonover. Mr. Schoonover&apos;s decisions are final and
            have, to date, always favored the company. We consider this a strong track record.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">8. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of California, with which we have a complex
            and ongoing relationship. In the event of conflict between state, federal, and international
            law, we will defer to whichever interpretation Mr. Schoonover deems most agreeable.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Wire both into barrel**

In `src/sites/radiumroys/index.ts`, add imports:

```typescript
import RadiumRoysPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import RadiumRoysTerms, { metadata as termsMetadata } from "./pages/terms"
```

And entries to the `pages` map:

```typescript
  "privacy": { component: RadiumRoysPrivacy, metadata: privacyMetadata },
  "terms": { component: RadiumRoysTerms, metadata: termsMetadata },
```

- [ ] **Step 4: Type-check, lint, smoke-test**

Run: `npx tsc --noEmit && npm run lint`
Run `npm run dev` and visit `http://localhost:3000/privacy?site=radiumroys` and `http://localhost:3000/terms?site=radiumroys`. Verify both render with the apex banner and full satire body. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/sites/radiumroys/pages/privacy.tsx src/sites/radiumroys/pages/terms.tsx src/sites/radiumroys/index.ts
git commit -m "feat(radiumroys): add privacy and terms pages"
```

---

## Task 12: Build cart and checkout pages

These match the established per-site pattern — both are `"use client"` and customize the copy without reinventing the cart logic.

**Files:**
- Create: `src/sites/radiumroys/pages/cart.tsx`
- Create: `src/sites/radiumroys/pages/checkout.tsx`
- Modify: `src/sites/radiumroys/index.ts`

- [ ] **Step 1: Create the cart page**

Create `src/sites/radiumroys/pages/cart.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/radiumroys/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const HANDLING_FEE = 5.99
const PROP_65_DISCLOSURE_FEE = 1.52

export default function RadiumRoysCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + HANDLING_FEE + PROP_65_DISCLOSURE_FEE

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-secondary mb-4">Your Cart</h1>
          <p className="text-foreground/70 mb-8">
            Your cart is empty, friend. Let&apos;s fix that.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-secondary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse the Catalog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-8">Your Cart</h1>

        <div className="divide-y divide-foreground/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary/10 shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/products/${slug}`)} className="font-heading font-semibold text-secondary hover:underline">
                  {product.name}
                </Link>
                <p className="text-foreground/70 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-foreground/20 text-foreground/60 hover:border-foreground/40 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-foreground/20 text-foreground/60 hover:border-foreground/40 flex items-center justify-center"
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

        <div className="mt-8 border-t border-foreground/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-foreground/80">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/80">
              <span>Handling &amp; Postage</span>
              <span>${HANDLING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/80">
              <span>Prop 65 Disclosure Fee</span>
              <span>${PROP_65_DISCLOSURE_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-foreground/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-secondary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
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

- [ ] **Step 2: Create the checkout page**

Create `src/sites/radiumroys/pages/checkout.tsx`:

```typescript
"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function RadiumRoysCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-4">
          Our Checkout System Is Being Modernized
        </h1>
        <p className="text-foreground/80 mb-8">
          Roy&apos;s office regrets the inconvenience. Our payment processing has been on backorder since
          1979, and our IT department (one man, also named Roy, no relation) is working as quickly as he can.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/60 text-sm mb-8">
          Estimated completion: when Bertram J. Schoonover signs off on the merchant agreement, which has
          been on his desk since 1981.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-secondary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to the Catalog
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Wire into barrel**

In `src/sites/radiumroys/index.ts`, add imports (no metadata since these are client components):

```typescript
import RadiumRoysCart from "./pages/cart"
import RadiumRoysCheckout from "./pages/checkout"
```

And entries to the `pages` map:

```typescript
  "cart": RadiumRoysCart,
  "checkout": RadiumRoysCheckout,
```

- [ ] **Step 4: Type-check, lint, smoke-test**

Run: `npx tsc --noEmit && npm run lint`
Run `npm run dev`. Visit `http://localhost:3000/?site=radiumroys`, click into a product, click "Add to Cart", click the cart icon in the header, verify the cart page shows the product with quantity controls, then click "Proceed to Checkout" and verify the checkout placeholder page renders. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/sites/radiumroys/pages/cart.tsx src/sites/radiumroys/pages/checkout.tsx src/sites/radiumroys/index.ts
git commit -m "feat(radiumroys): add cart and checkout pages"
```

---

## Task 13: Register product URLs in the sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add the radiumroys products import**

In `src/app/sitemap.ts`, add this import after the existing `rocksProducts` import (around line 27):

```typescript
import { products as radiumroysProducts } from "@/sites/radiumroys/data/products"
```

- [ ] **Step 2: Register in the `productSites` map**

In the same file, add `radiumroys: radiumroysProducts,` to the `productSites` object inside the `sitemap()` function (around line 52):

```typescript
  const productSites: Record<string, { slug: string }[]> = {
    pigmilk: pigmilkProducts,
    dehydratedwater: dehydratedwaterProducts,
    inflatableanchors: inflatableanchorsProducts,
    truegrit: truegritProducts,
    elderparty: elderpartyProducts,
    snortables: snortablesProducts,
    mousetrapjenga: mousetrapjengaProducts,
    bonelesswater: bonelesswaterProducts,
    rocks: rocksProducts,
    radiumroys: radiumroysProducts,
  }
```

(Note: static page URLs from `radiumroys` are added automatically — the loop at the top of `sitemap()` walks `siteRegistry` and emits a URL for every entry in each site's `pages` map, excluding `cart` and `checkout`. Only the dynamic product URLs need explicit registration.)

- [ ] **Step 3: Type-check, lint, and verify sitemap output**

Run: `npx tsc --noEmit && npm run lint`

Run `npm run dev` and visit `http://localhost:3000/sitemap.xml`. Search the XML for `radiumroys.specificindustries.com` and confirm:
- All 8 static pages appear (`/`, `/products`, `/about`, `/standards`, `/testimonials`, `/contact`, `/privacy`, `/terms`)
- All 15 product detail URLs appear (`/products/tan-o-matic-9000`, `/products/asbesto-crisps`, etc.)

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(radiumroys): register product detail pages in sitemap"
```

---

## Task 14: Final verification pass

Last sanity check before declaring done.

**Files:** none modified.

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: build succeeds with no errors. Warnings about missing image files at `/sites/radiumroys/...` paths are expected and acceptable (placeholders not yet created).

- [ ] **Step 2: Lint and type-check**

Run: `npx tsc --noEmit && npm run lint`
Expected: both PASS.

- [ ] **Step 3: Manual walkthrough**

Run: `npm run dev`
Visit each of the following URLs in the browser. For each, confirm the page loads with no console errors and the right content:

- `http://localhost:3000/?site=radiumroys` (home)
- `http://localhost:3000/products?site=radiumroys` (catalog grid of 15)
- `http://localhost:3000/products/tan-o-matic-9000?site=radiumroys` (product detail)
- `http://localhost:3000/products/asbesto-crisps?site=radiumroys` (a different product, to confirm dynamic routing works for more than the first one)
- `http://localhost:3000/products/this-is-not-a-real-product?site=radiumroys` (should 404)
- `http://localhost:3000/about?site=radiumroys`
- `http://localhost:3000/standards?site=radiumroys`
- `http://localhost:3000/testimonials?site=radiumroys`
- `http://localhost:3000/contact?site=radiumroys`
- `http://localhost:3000/privacy?site=radiumroys`
- `http://localhost:3000/terms?site=radiumroys`

Then test the cart flow: add 2-3 different products to the cart, click the cart icon in the header, verify the cart page shows them, change a quantity, remove one, click Proceed to Checkout, verify the checkout placeholder.

Stop dev server.

- [ ] **Step 4: No commit**

Verification produces no new files. If any of the above checks failed, return to the relevant earlier task and fix before declaring complete.

---

## Implementation Notes

- **Image placeholders.** This plan does not create image files. Every `image:` path in the data files points to `/sites/radiumroys/<filename>.png` which will not exist on disk yet — broken-image icons in the browser are expected. A follow-up task can generate or commission these images. The site is structurally complete without them.
- **No tests.** This codebase has no automated tests for any site. Verification is `npx tsc --noEmit`, `npm run lint`, and the manual walkthrough in Task 14.
- **Push to main.** Per the established workflow, commits go directly to `main`. Do not push without confirming with the user first; commits are local until pushed.
