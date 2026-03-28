# Dehydrated Water Co. Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fully functional satire e-commerce site for "Dehydrated Water Co." at the `dehydratedwater` subdomain, including 9 products, 11 pages, a new `PricingTable` shared component, and full E2E test coverage.

**Architecture:** Follows the existing pigmilk site pattern exactly — self-contained under `src/sites/dehydratedwater/` with config, data, and page components. One shared infrastructure change: parameterize `CartProvider`'s localStorage key so each commerce site gets isolated cart state. One new shared component: `PricingTable` in `src/components/ui/`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Playwright (E2E tests)

**Spec:** `docs/superpowers/specs/2026-03-27-dehydratedwater-site-design.md`

---

### Task 1: Parameterize CartProvider Storage Key

**Files:**
- Modify: `src/components/commerce/cart-provider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update CartProvider to accept storageKey prop**

In `src/components/commerce/cart-provider.tsx`, change the hardcoded storage key to a prop:

```typescript
// Change line 28 from:
const STORAGE_KEY = "pigmilk-cart"

// Remove that line entirely. Then change the CartProvider signature from:
export function CartProvider({ children }: { children: ReactNode }) {

// To:
export function CartProvider({ children, storageKey = "cart" }: { children: ReactNode; storageKey?: string }) {
```

Then replace all references to `STORAGE_KEY` with `storageKey` inside the component (lines 34 and 50).

- [ ] **Step 2: Update root layout to pass storageKey**

In `src/app/layout.tsx`, change line 60 from:

```tsx
<CartProvider>
```

To:

```tsx
<CartProvider storageKey={`${site.config.subdomain}-cart`}>
```

This makes pigmilk continue using `pigmilk-cart` and dehydratedwater will use `dehydratedwater-cart`.

- [ ] **Step 3: Verify pigmilk still works**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/commerce/cart-provider.tsx src/app/layout.tsx
git commit -m "feat: parameterize CartProvider storage key for per-site cart isolation"
```

---

### Task 2: Site Config

**Files:**
- Create: `src/sites/dehydratedwater/config.ts`

- [ ] **Step 1: Create config file**

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Dehydrated Water Co.",
  subdomain: "dehydratedwater",
  theme: {
    preset: "heritage",
    colors: {
      primary: "#1B3A4B",
      secondary: "#E8F0F2",
      accent: "#7BB8CC",
      background: "#FAFCFD",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "Dehydrated Water Co. — Purveyors of Fine Powdered Hydration Since 1847",
    description:
      "Premium artisanal dehydrated water, crafted by hand since 1847. Just add water.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Our Story", path: "/our-story" },
    { label: "The Science", path: "/the-science" },
    { label: "WaaS", path: "/waas" },
    { label: "FAQ", path: "/faq" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/dehydratedwater/config.ts
git commit -m "feat: add dehydrated water site config"
```

---

### Task 3: Product Catalog Data

**Files:**
- Create: `src/sites/dehydratedwater/data/products.ts`

- [ ] **Step 1: Create product data file**

```typescript
export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  scienceFacts: Array<{ label: string; value: string }>
  variants?: Array<{ name: string; description: string }>
  isSubscription?: boolean
}

export const products: Product[] = [
  {
    slug: "original",
    name: "Original Dehydrated Water",
    price: 12.99,
    priceLabel: "$12.99 / packet",
    tagline: "Just add water.",
    description: [
      "The product that started a revolution no one asked for. In 1847, Ezekiel Drywell looked at a glass of water and thought, 'This would be better without all the water in it.' Nearly two centuries later, we continue to honor that profoundly unnecessary vision.",
      "Each packet contains the complete molecular essence of water, temporarily liberated from its liquid state through our patented dehydration process. Simply add water to reconstitute. Yes, you need water to make water. We are aware of the paradox. We have made peace with it.",
      "Our Original blend is the foundation of the Dehydrated Water Co. legacy — unchanged since 1847, because there is nothing to change. It is powder. It has always been powder.",
    ],
    image: "/sites/dehydratedwater/product-original.png",
    scienceFacts: [
      { label: "Molecular Composition", value: "H₂O⁰ (patent pending)" },
      { label: "State of Matter", value: "Theoretical" },
      { label: "pH Level", value: "N/A (requires hydration to measure)" },
      { label: "Shelf Life", value: "Eternal (powder cannot expire if it was never alive)" },
      { label: "Specific Gravity", value: "Irrelevant" },
      { label: "Wetness", value: "0%" },
    ],
  },
  {
    slug: "cloud-mist",
    name: "Single Origin Cloud Mist",
    price: 24.99,
    priceLabel: "$24.99 / packet",
    tagline: "Terroir you can taste. Once hydrated.",
    description: [
      "For the discerning hydration connoisseur who demands to know exactly which cloud their water fell from. Our Single Origin Cloud Mist collection brings the concept of terroir to powdered water, because apparently regular dehydrated water wasn't pretentious enough.",
      "Each packet is harvested from a specific weather event and dehydrated within hours of atmospheric capture. Our meteorological sommelier personally verifies the provenance of every cloud. He has a very specific skill set.",
      "Available in three distinct origins, each with its own character, personality, and complete inability to hydrate you until you add water to it.",
    ],
    image: "/sites/dehydratedwater/product-cloud-mist.png",
    scienceFacts: [
      { label: "Origin Verification", value: "Meteorologically certified" },
      { label: "Atmospheric Pressure at Harvest", value: "Varies by origin" },
      { label: "Cloud Type", value: "Cumulonimbus (premium grade)" },
      { label: "Precipitation Probability", value: "0% (successfully intercepted)" },
      { label: "Terroir Factor", value: "Pronounced" },
      { label: "Pretentiousness Index", value: "97th percentile" },
    ],
    variants: [
      {
        name: "The Nor'easter",
        description:
          "Aggressive, salty, and best served cold. Harvested from North Atlantic storm systems with wind speeds exceeding 40 knots. Not for the faint of palate.",
      },
      {
        name: "Sahara Noon",
        description:
          "Extra dry, for that authentic 'dusty throat' feeling. Sourced from the rare midday humidity spikes over the Sahara Desert. Contains trace amounts of existential dryness.",
      },
      {
        name: "Amazonian Downpour",
        description:
          "High-humidity powder that requires a special dehumidifier to 'unlock.' Our most complex origin, with notes of tropical canopy and the faint sound of rainfall that isn't there.",
      },
    ],
  },
  {
    slug: "dryer-water",
    name: 'Double-Dehydrated "Dryer" Water',
    price: 34.99,
    priceLabel: "$34.99 / vacuum bag",
    tagline: "Negative wetness, guaranteed.",
    description: [
      "For the ultra-minimalist who thinks regular dehydrated water is too moist. Our Double-Dehydrated Water has been through our patented process twice, removing not just the water, but the memory of water. What remains is pure, unburdened absence.",
      "The product ships as an empty, vacuum-sealed bag. This is not a packaging error. This is the product. The vacuum seal ensures that no rogue moisture can compromise the integrity of the nothing inside.",
      "Independent laboratory testing has confirmed that Double-Dehydrated Water possesses 'Negative Wetness' — meaning it can actually make things drier. Toss one into a swimming pool and observe as absolutely nothing happens, but theoretically the pool is now 0.00001% drier.",
    ],
    image: "/sites/dehydratedwater/product-dryer.png",
    scienceFacts: [
      { label: "Wetness", value: "Negative" },
      { label: "Moisture Content", value: "-2%" },
      { label: "Vacuum Integrity", value: "Absolute" },
      { label: "Contents", value: "Philosophical" },
      { label: "Recommended Use", value: "Ultra-minimalist hiking" },
      { label: "Weight", value: "Less than nothing (metaphysically)" },
    ],
  },
  {
    slug: "heavy-water",
    name: "DIY Heavy Water (Deuterium-Lite)",
    price: 49.99,
    priceLabel: "$49.99 / packet",
    tagline: "For biohackers and amateur nuclear physicists.",
    description: [
      "Marketed to the intersection of biohacking enthusiasts and amateur nuclear physicists — a surprisingly active community — our Heavy Water variant is a heavier-than-usual packet of what is technically the same powder.",
      "The additional weight is achieved through our proprietary 'more powder in the bag' technique, which our marketing department has rebranded as 'deuterium enrichment.' Our legal team has asked us to clarify that no actual deuterium is involved. Our marketing team has asked legal to relax.",
      "Please note: do not stack more than 50 packets together. While no actual nuclear reaction is possible, our insurance provider has specifically asked us to include this warning, and frankly, if you're buying 50 packets of this, someone should be checking in on you.",
    ],
    image: "/sites/dehydratedwater/product-heavy.png",
    scienceFacts: [
      { label: "Atomic Weight", value: "Elevated (subjectively)" },
      { label: "Critical Mass Threshold", value: "50 packets (do not exceed)" },
      { label: "Regulatory Status", value: "Pending (in perpetuity)" },
      { label: "Geiger Counter Reading", value: "Inconclusive" },
      { label: "Biohacking Compatibility", value: "Uncertain" },
      { label: "Nuclear Capability", value: "None (we promise)" },
    ],
  },
  {
    slug: "ice-cubes",
    name: "Dehydrated Ice Cubes",
    price: 9.99,
    priceLabel: "$9.99 / 12-pack",
    tagline: "Space-saving hydration, frozen in time.",
    description: [
      "Individual tiny packets of dehydrated water, pre-portioned for ice cube trays. Simply add water to each packet, pour into a tray, and freeze for 4 hours. Voilà — you have ice. Yes, you could have just frozen the water directly. We are aware.",
      "Our Dehydrated Ice Cubes feature a revolutionary 'Space-Saving Design' for people who don't have room in their freezer for bulky, traditional water. Each 12-pack replaces up to 12 ice cubes' worth of freezer space with convenient shelf-stable packets.",
      "The math works out to roughly the same amount of space once you add the water. We prefer not to discuss the math.",
    ],
    image: "/sites/dehydratedwater/product-ice-cubes.png",
    scienceFacts: [
      { label: "Freezing Point", value: "0°C (after hydration)" },
      { label: "Space Saved", value: "97% (before adding water)" },
      { label: "Cube Geometry", value: "Theoretical until frozen" },
      { label: "Freezer Compatibility", value: "Universal" },
      { label: "Time to Ice", value: "4 hours + existential waiting" },
      { label: "Melting Point", value: "Same as regular ice (we checked)" },
    ],
  },
  {
    slug: "diet-water",
    name: "Diet Dehydrated Water (Zero Hydrogen)",
    price: 18.99,
    priceLabel: "$18.99 / packet",
    tagline: "100% Pure, Gaseous Oxygen.",
    description: [
      "For the health-conscious consumer looking to cut back on their element intake. We've removed the gassy Hydrogen from our standard formula, leaving you with 100% Pure, Gaseous Oxygen. It's essentially a bag of air, but it's our bag of air, and it's artisanal.",
      "Our Zero Hydrogen formula was developed in response to growing consumer demand for 'cleaner' water. By removing two-thirds of the atoms, we've created a product that is 66% simpler, 100% lighter, and fundamentally no longer water in any scientific sense.",
      "Diet Dehydrated Water pairs well with breathing, existing near an open window, or stepping outside. Do not inhale the entire bag at once. We cannot stress this enough.",
    ],
    image: "/sites/dehydratedwater/product-diet.png",
    scienceFacts: [
      { label: "Hydrogen Content", value: "0 mol" },
      { label: "Oxygen State", value: "Gaseous" },
      { label: "Caloric Content", value: "Undefined" },
      { label: "Breathability", value: "Do not inhale entire bag at once" },
      { label: "Chemical Formula", value: "O (just O)" },
      { label: "Is This Still Water?", value: "Legally, no" },
    ],
  },
  {
    slug: "starter-culture",
    name: "Instant Water Starter Culture",
    price: 39.99,
    priceLabel: "$39.99 / vial",
    tagline: "The sourdough starter of hydration.",
    description: [
      "A small vial of 'Seed Water' — the sourdough starter of the hydration world. Add it to a gallon of regular water and wait 48 hours as it 'converts' your ordinary tap water into Premium Heritage Water through a process we call 'sitting there.'",
      "Our Starter Culture contains a proprietary blend of heritage water molecules that have been passed down through seven generations of the Drywell family. Each vial traces its lineage back to the original 1847 batch, making your tap water part of an unbroken aquatic dynasty.",
      "Feed your culture weekly with fresh water to keep it alive. If you forget, the culture will 'go dormant,' which is our way of saying it's just water again. But isn't it always just water? These are the questions our Starter Culture invites you to ponder.",
    ],
    image: "/sites/dehydratedwater/product-starter.png",
    scienceFacts: [
      { label: "Conversion Time", value: "48 hours (of doing nothing)" },
      { label: "Heritage Factor", value: "7th generation" },
      { label: "Culture Viability", value: "Perpetual (theoretically)" },
      { label: "Feeding Schedule", value: "Weekly, with regular water" },
      { label: "Lineage", value: "Traceable to 1847" },
      { label: "Active Ingredient", value: "Patience" },
    ],
  },
  {
    slug: "waas",
    name: "WaaS Monthly Subscription",
    price: 49.99,
    priceLabel: "$49.99 / month",
    tagline: "Cloud-synced. Heritage-crafted.",
    description: [
      "Water-as-a-Service brings the convenience of modern subscription billing to a product that has existed since the dawn of civilization. For $49.99 per month, you'll receive a cloud-synced packet of our finest dehydrated water, delivered to your door by whatever means we can arrange.",
      "Each packet is sealed with our heritage wax stamp and comes with a hand-calligraphed instruction card. The instructions say 'Add Water.' We feel the calligraphy adds gravitas.",
      "Visit our WaaS page for full tier details, including our Apprentice and Master Dryer plans. Cancel anytime, though we should warn you that our retention department (Ezekiel's great-great-great-great-grandson, also named Ezekiel) can be quite persuasive.",
    ],
    image: "/sites/dehydratedwater/product-waas.png",
    scienceFacts: [
      { label: "Sync Protocol", value: "Bluetooth 0.1 (heritage edition)" },
      { label: "Uptime Guarantee", value: "Heritage-grade" },
      { label: "Delivery Vector", value: "Carrier pigeon (fallback: USPS)" },
      { label: "Lock Mechanism", value: "Non-existent (but implied)" },
      { label: "Cloud Storage", value: "An actual cloud" },
      { label: "Cancel Policy", value: "Ezekiel will call" },
    ],
    isSubscription: true,
  },
  {
    slug: "water-seasoning",
    name: "Gourmet Water Seasoning",
    price: 15.99,
    priceLabel: "$15.99 / set",
    tagline: "Add texture, not flavor.",
    description: [
      "For too long, water has suffered from a fundamental flaw: it's too smooth. Our Gourmet Water Seasoning collection addresses this oversight by adding texture — not flavor — to your hydration experience.",
      "Developed in partnership with a sensory scientist who prefers to remain anonymous (and who we suspect may not actually be a scientist), our H₂O Enhancers transform ordinary water into an extraordinary tactile experience.",
      "Each set includes both of our signature textures: Viscosity+ and Crispness. Mix them together at your own risk. We have not tested this combination and, based on the results of an informal office trial, we do not recommend it.",
    ],
    image: "/sites/dehydratedwater/product-seasoning.png",
    scienceFacts: [
      { label: "Flavor Added", value: "None (by design)" },
      { label: "Texture Delta", value: "Perceptible" },
      { label: "Mouthfeel Index", value: "Elevated" },
      { label: "FDA Approval", value: "Not sought" },
      { label: "Sensory Category", value: "Unprecedented" },
      { label: "Mixing Warning", value: "Do not combine variants" },
    ],
    variants: [
      {
        name: "Viscosity+",
        description:
          "Makes your water feel slightly thicker, like drinking thin gravy. Ideal for those who find regular water 'too fast' going down. Achieved through the addition of food-grade thickening agents that our label simply lists as 'texture.'",
      },
      {
        name: "Crispness",
        description:
          "Adds a microscopic amount of 'static' — technically fine-grain silica — to give your water a 'sharp' mouthfeel. Reviewers have described it as 'crunchy water,' 'assertive,' and 'why would anyone do this.'",
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/dehydratedwater/data/products.ts
git commit -m "feat: add dehydrated water product catalog with 9 products"
```

---

### Task 4: PricingTable Shared Component

**Files:**
- Create: `src/components/ui/pricing-table.tsx`

- [ ] **Step 1: Create PricingTable component**

```tsx
"use client"

interface PricingTier {
  name: string
  price: string
  interval: string
  features: Array<{ text: string; included: boolean }>
  recommended?: boolean
  ctaLabel?: string
}

interface PricingTableProps {
  tiers: PricingTier[]
  onSelect: (tierName: string) => void
  footnote?: string
}

export function PricingTable({ tiers, onSelect, footnote }: PricingTableProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative border rounded-lg p-8 text-center bg-background ${
              tier.recommended
                ? "border-accent border-2"
                : "border-primary/20"
            }`}
          >
            {tier.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-heading px-4 py-1 tracking-widest uppercase">
                Recommended
              </div>
            )}
            <div className="text-accent text-xs font-heading tracking-[0.2em] uppercase mb-4">
              {tier.name}
            </div>
            <div className="text-4xl font-heading font-bold text-foreground mb-1">
              {tier.price}
            </div>
            <div className="text-accent text-sm mb-6">{tier.interval}</div>
            <div className="text-left space-y-3 mb-8">
              {tier.features.map((feature) => (
                <div key={feature.text} className="text-sm flex items-start gap-2">
                  {feature.included ? (
                    <span className="text-accent shrink-0">✓</span>
                  ) : (
                    <span className="text-foreground/30 shrink-0">✗</span>
                  )}
                  <span
                    className={
                      feature.included ? "text-foreground/70" : "text-foreground/30"
                    }
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => onSelect(tier.name)}
              className={`w-full py-3 font-heading text-sm tracking-wider uppercase transition-opacity hover:opacity-90 ${
                tier.recommended
                  ? "bg-primary text-white"
                  : "border border-primary text-primary"
              }`}
            >
              {tier.ctaLabel || "Select"}
            </button>
          </div>
        ))}
      </div>
      {footnote && (
        <p className="text-accent text-sm italic text-center mt-6">{footnote}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/pricing-table.tsx
git commit -m "feat: add PricingTable shared component"
```

---

### Task 5: Homepage

**Files:**
- Create: `src/sites/dehydratedwater/pages/home.tsx`

- [ ] **Step 1: Create homepage component**

```tsx
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/dehydratedwater/data/products"

const featuredSlugs = ["original", "cloud-mist", "heavy-water"]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default function DehydratedWaterHome() {
  return (
    <>
      <Hero
        headline="Water, Perfected Through Absence"
        subheadline="For nearly two centuries, we have pursued a singular vision: liberating water from the burden of its own wetness. Est. 1847."
        ctaText="Shop the Collection"
        ctaHref="/products"
      />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* Testimonials */}
      <TestimonialGrid
        title="What Our Patrons Say"
        testimonials={[
          { quote: "I've never felt more hydrated by something so profoundly dry.", author: "Dr. Helena Moisture, Theoretical Hydrologist" },
          { quote: "Changed my relationship with water. I no longer need it in liquid form.", author: "Reginald Dustworth, Competitive Dehydration Athlete" },
          { quote: "The Cloud Mist Nor'easter made me weep. Or maybe that was the salt.", author: "Baroness Evelyn Sipsworth, Water Critic" },
          { quote: "I switched from regular water and haven't looked back. Mostly because I'm too dehydrated to turn my head.", author: "Anonymous Subscriber" },
          { quote: "Five stars. Would add water again.", author: "Thirsty in Vermont" },
          { quote: "My sourdough starter is jealous of my water starter.", author: "Portland Resident #4,217" },
        ]}
      />

      <CTABanner
        headline="Begin Your Dehydration Journey"
        description="Subscribe to our Water-as-a-Service plan. Heritage-crafted. Cloud-synced. Utterly unnecessary."
        ctaText="Explore WaaS"
        ctaHref="/waas"
      />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/dehydratedwater/pages/home.tsx
git commit -m "feat: add dehydrated water homepage"
```

---

### Task 6: Products Page

**Files:**
- Create: `src/sites/dehydratedwater/pages/products.tsx`

- [ ] **Step 1: Create products page**

```tsx
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/dehydratedwater/data/products"

export const metadata = {
  title: "Products — Dehydrated Water Co.",
  description: "Browse our collection of premium dehydrated water products.",
}

export default function DehydratedWaterProducts() {
  return (
    <>
      <Hero
        headline="The Collection"
        subheadline="Purveyors of fine powdered hydration since 1847. Each product crafted with the same care and absence of moisture."
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

- [ ] **Step 2: Commit**

```bash
git add src/sites/dehydratedwater/pages/products.tsx
git commit -m "feat: add dehydrated water products page"
```

---

### Task 7: Product Detail Page

**Files:**
- Create: `src/sites/dehydratedwater/pages/product-detail.tsx`

- [ ] **Step 1: Create product detail component**

This is a `"use client"` component that receives a `slug` prop. It shows the product info, Science Facts panel (replacing pigmilk's Nutrition Facts), and variant cards for products that have them. For the WaaS product, it links to the dedicated `/waas` page.

```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { getProductBySlug } from "@/sites/dehydratedwater/data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useSiteLink } from "@/hooks/use-site-link"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  const siteHref = useSiteLink()
  if (!product) return null

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
            <div className="mb-8">
              {product.isSubscription ? (
                <Link
                  href={siteHref("/waas")}
                  className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  View Subscription Plans
                </Link>
              ) : (
                <AddToCartButton
                  slug={product.slug}
                  productName={product.name}
                  className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                />
              )}
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Science Facts */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-md mx-auto">
          <div className="border-2 border-foreground p-4">
            <h2 className="text-2xl font-heading font-bold text-foreground border-b-8 border-foreground pb-1 mb-2">
              Science Facts
            </h2>
            <p className="text-sm text-foreground/60 border-b border-foreground pb-2 mb-2">
              Per packet, as determined by our laboratory (a desk)
            </p>
            <div className="divide-y divide-foreground/20">
              {product.scienceFacts.map((fact) => (
                <div key={fact.label} className="flex justify-between py-1.5">
                  <span className="font-semibold text-foreground text-sm">{fact.label}</span>
                  <span className="text-foreground/70 text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-foreground/40 mt-3 border-t border-foreground pt-2">
              * These facts have not been peer-reviewed, FDA-approved, or verified by any entity, real or imagined. The laboratory is Ezekiel&apos;s desk.
            </p>
          </div>
        </div>
      </section>

      {/* Variants (if any) */}
      {product.variants && product.variants.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-center mb-8">Available Variants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.variants.map((variant) => (
                <div key={variant.name} className="border border-primary/20 rounded-lg p-6">
                  <h3 className="font-heading font-bold text-primary mb-2">{variant.name}</h3>
                  <p className="text-foreground/70 text-sm">{variant.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/dehydratedwater/pages/product-detail.tsx
git commit -m "feat: add dehydrated water product detail page with Science Facts"
```

---

### Task 8: Our Story Page

**Files:**
- Create: `src/sites/dehydratedwater/pages/our-story.tsx`

- [ ] **Step 1: Create Our Story page**

```tsx
import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"
import { Timeline } from "@/components/ui/timeline"
import { TeamMember } from "@/components/ui/team-member"

export const metadata = {
  title: "Our Story — Dehydrated Water Co.",
  description: "The Drywell family legacy, since 1847.",
}

const timelineItems = [
  { year: "1847", description: "Ezekiel Drywell, transcendentalist philosopher-farmer, dehydrates his first barrel of water. Declares it 'liberated.'" },
  { year: "1863", description: "Supplies dehydrated water to both sides of the Civil War. Neither side orders a second shipment." },
  { year: "1889", description: "Ezekiel II patents the 'Drywell Method.' Patent office clerk writes 'Is this a joke?' in the margins. Patent approved anyway." },
  { year: "1923", description: "Survives Prohibition. Product is technically not a beverage." },
  { year: "1947", description: "Centennial celebration. Attendance: the Drywell family and one confused mailman." },
  { year: "1969", description: "NASA declines to bring Dehydrated Water to the moon. 'They already have dehydrated food. Adding dehydrated water felt redundant,' a spokesperson explains." },
  { year: "1987", description: "Ezekiel IV attempts to take the company public. The IPO raises $14." },
  { year: "2003", description: "Launches first website. Receives 3 visitors in 6 months. Two were bots." },
  { year: "2019", description: "Awarded zero Michelin stars. 'We were not aware water could receive stars,' says Michelin. 'It cannot.'" },
  { year: "2025", description: "Launches Water-as-a-Service (WaaS). Investors describe it as 'disruptive' and 'are you serious.'" },
  { year: "2026", description: "You are here. We are grateful. Ezekiel would be confused, but grateful." },
]

const familyMembers = [
  {
    name: "Ezekiel Drywell I",
    title: "Founder (1847–1901)",
    image: "/sites/dehydratedwater/team-ezekiel-i.png",
    bio: "Believed water was 'burdened by its own wetness.' Spent 54 years trying to prove it. Never did.",
  },
  {
    name: "Ezekiel Drywell IV",
    title: "Current Patriarch",
    image: "/sites/dehydratedwater/team-ezekiel-iv.png",
    bio: "Runs the company with the same quiet determination and fundamental misunderstanding of hydration as his ancestors.",
  },
  {
    name: "Prudence Drywell",
    title: "Head of Quality Assurance",
    image: "/sites/dehydratedwater/team-prudence.png",
    bio: "Has never once tasted the product. Considers this a point of professional pride.",
  },
  {
    name: "Thaddeus Drywell",
    title: "Chief Science Officer",
    image: "/sites/dehydratedwater/team-thaddeus.png",
    bio: "Holds a degree in 'Theoretical Hydrology' from an institution he prefers not to name.",
  },
]

export default function OurStory() {
  return (
    <>
      <Hero
        headline="Our Story"
        subheadline="Seven generations of the Drywell family, united by a singular, unnecessary vision."
      />

      <ImageTextSection
        image="/sites/dehydratedwater/founder.png"
        imageAspect="aspect-square"
        title="The Founding Vision"
        description={
          "In 1847, Ezekiel Drywell — philosopher, farmer, and man of deeply specific convictions — stood before a well on his Vermont homestead and had a revelation. " +
          "'Water,' he wrote in his journal, 'is burdened by its own wetness. Its essence is trapped in liquid form, like a bird in a cage made of itself.'\n\n" +
          "What followed was three years of failed experiments, a barn fire, and the eventual creation of the world's first packet of dehydrated water. " +
          "His neighbors called him mad. His wife called him 'exhausting.' Ezekiel called it progress.\n\n" +
          "Nearly two centuries later, the Drywell family continues to honor Ezekiel's vision — not because it makes sense, but because at this point, it would be more embarrassing to stop."
        }
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">Company Timeline</h2>
        </div>
        <Timeline items={timelineItems} />
      </section>

      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            The Drywell Family
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {familyMembers.map((member) => (
              <TeamMember
                key={member.name}
                name={member.name}
                title={member.title}
                image={member.image}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/dehydratedwater/pages/our-story.tsx
git commit -m "feat: add dehydrated water Our Story page with timeline and family"
```

---

### Task 9: The Science Page

**Files:**
- Create: `src/sites/dehydratedwater/pages/the-science.tsx`

- [ ] **Step 1: Create The Science page**

```tsx
import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"

export const metadata = {
  title: "The Science — Dehydrated Water Co.",
  description: "The patented Drywell Method, explained. Sort of.",
}

export default function TheScience() {
  return (
    <>
      <Hero
        headline="The Science"
        subheadline="Our patented dehydration process, explained in terms that sound almost credible."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">The Drywell Method™</h2>
          <p className="text-foreground/60 mt-4">
            A seven-step process perfected over 179 years. Each step is essential. None of them do anything.
          </p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/dehydratedwater/science-collection.png"
        title="Step 1: Aqueous Acquisition"
        description={
          "We begin by sourcing the finest water available — typically from a tap. Our water sommelier evaluates each batch for clarity, viscosity, and 'general wateriness.' " +
          "Only water that meets our rigorous standard of 'being water' advances to the next stage.\n\n" +
          "Patent reference: Drywell Method™ §1.1 — 'The Procurement of Base Hydrate'"
        }
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/dehydratedwater/science-evaporation.png"
        title="Step 2: Thermal Dissociation"
        description={
          "The water is heated until it transitions from a liquid to a gaseous state — a process scientists call 'evaporation' and we call 'Phase Liberation.' " +
          "The steam rises, carrying with it the water's molecular identity. What remains is an empty container. This is, admittedly, a low point in the process.\n\n" +
          "Patent reference: Drywell Method™ §2.3 — 'Controlled Atmospheric Release of Hydrate Essence'"
        }
        imagePosition="right"
      />

      <ImageTextSection
        image="/sites/dehydratedwater/science-capture.png"
        title="Step 3: Vapor Recapture"
        description={
          "Using a proprietary condensation apparatus (a cold surface), we recapture the liberated water vapor. The molecules are coaxed back into a semi-liquid state " +
          "through what our Chief Science Officer calls 'whispering to the steam.' We do not endorse this characterization, but results speak for themselves.\n\n" +
          "Patent reference: Drywell Method™ §3.7 — 'Molecular Repatriation via Thermal Gradient'"
        }
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/dehydratedwater/science-dehydration.png"
        title="Step 4: Final Dehydration"
        description={
          "The recaptured water undergoes our signature final dehydration phase. This is the step where we remove the water from the water. " +
          "How? That's proprietary. Why? That's philosophical. The result is a fine, heritage-grade powder that contains the complete essence of water in a convenient, " +
          "non-liquid format.\n\n" +
          "Patent reference: Drywell Method™ §4.1 — 'Essence Extraction and Powderification'"
        }
        imagePosition="right"
      />

      {/* Credentials */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-6">
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            Peer-Reviewed (by peers who owed us favors)
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            ISO 0000 Certified (pending)
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            FDA Status: Unaware of Our Existence
          </span>
        </div>
      </section>

      {/* Publication */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Published Research</h2>
          <p className="text-foreground/60 mb-8">
            Our findings have been submitted to the following journals. None have responded.
          </p>
          <div className="space-y-4 text-foreground/70 text-sm italic">
            <p>&ldquo;On the Fundamental Wetness of Water and Its Remediation&rdquo; — <span className="text-foreground/50">Submitted to Nature, 2019. Status: Unacknowledged.</span></p>
            <p>&ldquo;Dehydrated Water: A Longitudinal Study of Nothing&rdquo; — <span className="text-foreground/50">Submitted to The Lancet, 2021. Status: Return to Sender.</span></p>
            <p>&ldquo;Negative Wetness: Theoretical Framework for Double-Dehydration&rdquo; — <span className="text-foreground/50">Self-published on Ezekiel&apos;s blog, 2024. 2 views.</span></p>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/dehydratedwater/pages/the-science.tsx
git commit -m "feat: add dehydrated water The Science page"
```

---

### Task 10: WaaS Page

**Files:**
- Create: `src/sites/dehydratedwater/pages/waas.tsx`

- [ ] **Step 1: Create WaaS subscription page**

```tsx
"use client"

import { Hero } from "@/components/ui/hero"
import { PricingTable } from "@/components/ui/pricing-table"
import { useCart } from "@/components/commerce/cart-provider"

const tiers = [
  {
    name: "Apprentice",
    price: "$29.99",
    interval: "per month",
    features: [
      { text: "1 packet per month", included: true },
      { text: "Standard dehydration", included: true },
      { text: "Paper instructions", included: true },
      { text: "Cloud sync", included: false },
      { text: "Heritage wax seal", included: false },
    ],
  },
  {
    name: "Journeyman",
    price: "$49.99",
    interval: "per month",
    recommended: true,
    features: [
      { text: "3 packets per month", included: true },
      { text: "Premium dehydration", included: true },
      { text: "Wax-sealed instructions", included: true },
      { text: "Cloud sync", included: true },
      { text: "Heritage wax seal", included: false },
    ],
  },
  {
    name: "Master Dryer",
    price: "$99.99",
    interval: "per month",
    features: [
      { text: "7 packets per month", included: true },
      { text: "Artisanal dehydration", included: true },
      { text: "Hand-calligraphed instructions", included: true },
      { text: "Cloud sync", included: true },
      { text: "Heritage wax seal", included: true },
    ],
  },
]

export default function WaaS() {
  const { addToCart, showToast } = useCart()

  const handleSelect = (tierName: string) => {
    addToCart("waas")
    showToast(`${tierName} plan added to cart. Welcome to the future of heritage hydration.`)
  }

  return (
    <>
      <Hero
        headline="Water-as-a-Service"
        subheadline="Heritage hydration, delivered monthly. Since 1847, now with subscription billing."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-foreground/70 leading-relaxed">
            Since 1847, our family has crafted dehydrated water by hand. Now, through the modern miracle
            of subscription billing, you can receive it at your door each month. Choose the tier that
            matches your commitment to powdered hydration.
          </p>
        </div>

        <PricingTable
          tiers={tiers}
          onSelect={handleSelect}
          footnote="All plans include complimentary existential contemplation about the nature of water."
        />
      </section>

      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-heading font-bold text-primary">Frequently Asked WaaS Questions</h2>
          <div className="text-foreground/70 text-sm space-y-4">
            <p>
              <strong className="text-foreground">What is &ldquo;cloud sync&rdquo;?</strong><br />
              Each packet is registered in our cloud database (a leather-bound ledger kept in the attic).
              Premium tiers receive a unique packet ID that can be verified by writing us a letter.
            </p>
            <p>
              <strong className="text-foreground">What happens if I cancel?</strong><br />
              Your packets stop arriving. Your existing packets continue to function (they are powder).
              Ezekiel V will send you a handwritten note expressing his disappointment.
            </p>
            <p>
              <strong className="text-foreground">Is the heritage wax seal functional?</strong><br />
              The seal serves no practical purpose. It does, however, make opening the packet 40% more difficult
              and 200% more dignified.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/dehydratedwater/pages/waas.tsx
git commit -m "feat: add dehydrated water WaaS subscription page"
```

---

### Task 11: FAQ Page

**Files:**
- Create: `src/sites/dehydratedwater/pages/faq.tsx`

- [ ] **Step 1: Create FAQ page**

```tsx
import { Hero } from "@/components/ui/hero"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "FAQ — Dehydrated Water Co.",
  description: "Your questions, our carefully evasive answers.",
}

const faqItems = [
  {
    question: "Is this real water?",
    answer:
      "Our product contains the complete molecular blueprint of water, temporarily unburdened from its liquid state. Whether this constitutes 'real' water is a question we respectfully defer to the philosophers. Ezekiel Drywell I spent 54 years on this question and died undecided.",
  },
  {
    question: "How do I use dehydrated water?",
    answer:
      "Add water. We understand the irony. Each packet includes detailed instructions, but they all say the same thing: add water. The water you add does all the work. Our powder provides moral support.",
  },
  {
    question: "What happens if I add too much water?",
    answer:
      "You will have more water than you started with. We are not responsible for any surplus hydration, local flooding, or philosophical confusion that may result. If you have added too much water, simply purchase additional Dehydrated Water to restore balance.",
  },
  {
    question: "Can I dehydrate your dehydrated water?",
    answer:
      "Please see our Double-Dehydrated 'Dryer' Water product, developed for precisely this purpose. We strongly advise against triple-dehydrating, as the resulting substance has not been approved by any regulatory body, real or imagined. Our insurance does not cover metaphysical dryness events.",
  },
  {
    question: "Is dehydrated water vegan?",
    answer:
      "Our water has never been in contact with animals, with the possible exception of clouds, which occasionally contain birds. We cannot guarantee a bird-free supply chain. Our Heavy Water variant has also not been tested on animals, primarily because we cannot get animals to participate.",
  },
  {
    question: "Is dehydrated water gluten-free?",
    answer:
      "Our product contains no gluten, no allergens, no nutrients, and — if we are being completely transparent — no water. It is free of essentially everything. This is, depending on your perspective, either our greatest strength or our most significant limitation.",
  },
  {
    question: "How should I store dehydrated water?",
    answer:
      "In a cool, dry place. Emphasis on dry. Any exposure to moisture may result in premature hydration, which voids the warranty. Do not store near humidifiers, swimming pools, rain, or people who cry easily.",
  },
  {
    question: "What if it gets wet?",
    answer:
      "Then you have water. Congratulations. The product has fulfilled its destiny ahead of schedule. This is not covered under our return policy.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Returns are accepted only if the product has been accidentally hydrated. Please ship liquid water back in a standard paper envelope. We are not responsible for postal service complaints, water damage to other parcels, or the confused look on your mail carrier's face.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, though international shipments are subject to customs inspection. We have had several packets held at borders by officials who opened them, found powder, and had questions. We now include a letter explaining that it is 'just water, but not yet.' This has not helped.",
  },
  {
    question: "Is the WaaS subscription worth it?",
    answer:
      "That depends on how you define 'worth.' In terms of monetary value per gram of powder, almost certainly not. In terms of the satisfaction of receiving a wax-sealed packet of dehydrated water each month via carrier pigeon (or USPS), we believe the answer is self-evident.",
  },
  {
    question: "Has anyone ever actually bought this?",
    answer:
      "We prefer not to discuss our sales figures. What we will say is that every packet we have ever produced has been accounted for. Some were purchased. Others were 'distributed strategically' at family gatherings. Ezekiel IV once left a case at a bus stop. We count that as outreach.",
  },
]

export default function FAQ() {
  return (
    <>
      <Hero
        headline="Frequently Asked Questions"
        subheadline="Your questions, our carefully evasive answers."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/dehydratedwater/pages/faq.tsx
git commit -m "feat: add dehydrated water FAQ page"
```

---

### Task 12: Cart and Checkout Pages

**Files:**
- Create: `src/sites/dehydratedwater/pages/cart.tsx`
- Create: `src/sites/dehydratedwater/pages/checkout.tsx`

- [ ] **Step 1: Create cart page**

```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/dehydratedwater/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const DESICCATION_FEE = 3.47
const POWDER_TAX_RATE = 0.042

export default function DehydratedWaterCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const powderTax = subtotal * POWDER_TAX_RATE
  const total = subtotal + DESICCATION_FEE + powderTax

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Your Cart</h1>
          <p className="text-foreground/60 mb-8">
            Your cart is as empty as our Double-Dehydrated vacuum bags. Which is to say: intentionally, profoundly empty.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse the Collection
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Your Cart</h1>

        <div className="divide-y divide-primary/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary/10 shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/products/${slug}`)} className="font-heading font-semibold text-primary hover:underline">
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

        <div className="mt-8 border-t border-primary/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-foreground/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Desiccation Fee</span>
              <span>${DESICCATION_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Powder Dispersal Tax (4.2%)</span>
              <span>${powderTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-primary/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
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

```tsx
"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function DehydratedWaterCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="text-6xl mb-8">💧</div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Our Artisans Are Hand-Dehydrating Your Order
        </h1>
        <p className="text-foreground/70 mb-8">
          Each packet is individually dehydrated by a member of the Drywell family using techniques
          unchanged since 1847. This process cannot be rushed. The water must be convinced to leave voluntarily.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-8">
          Estimated delivery: When the water is ready (est. 6-8 generations)
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to the Collection
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/cart.tsx src/sites/dehydratedwater/pages/checkout.tsx
git commit -m "feat: add dehydrated water cart and checkout pages"
```

---

### Task 13: Privacy and Terms Pages

**Files:**
- Create: `src/sites/dehydratedwater/pages/privacy.tsx`
- Create: `src/sites/dehydratedwater/pages/terms.tsx`

- [ ] **Step 1: Create privacy page**

```tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Dehydrated Water Co.",
  description: "Our privacy policy. Dry reading, appropriately.",
}

export default function DehydratedWaterPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Effective since 1847. Updated whenever Ezekiel remembers."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Last updated: The 14th of Drytober, Year of Our Powder CLXXIX
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Data Collection</h2>
          <p>
            We collect the minimum amount of data necessary to process your order, which is to say: we collect
            your name, address, and payment information, then write it down in a leather-bound ledger that has
            been in the Drywell family since 1903. The ledger is kept in a locked drawer. The key is under the mat.
            We are aware this is not best practice.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. How We Use Your Data</h2>
          <p>
            Your data is used exclusively for order fulfillment and the occasional handwritten thank-you note from
            Ezekiel IV. We do not sell your data. We do not share your data. Frankly, we would not know how.
            Our technology infrastructure consists of the aforementioned ledger and a filing cabinet that
            doesn&apos;t close properly.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Cookies</h2>
          <p>
            This website uses cookies in the same way that all websites use cookies: reluctantly and because
            the framework includes them by default. We have not configured them to do anything specific.
            If they are tracking you, they are doing so of their own volition, and we take no responsibility
            for their ambitions.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Data Retention</h2>
          <p>
            We retain your data for as long as the ledger lasts, which, given its Victorian-era construction,
            could be several more centuries. If you would like your data removed, please send us a letter
            (email is unreliable; our internet connection runs through a barn) and we will cross out your
            entry with a fountain pen. This is our deletion process.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Security</h2>
          <p>
            Your data is protected by a locked drawer, a suspicious cat named Reginald who sleeps on the
            filing cabinet, and the general obscurity of our company. We believe that the most effective
            data security is being a business that no one has heard of. So far, this strategy has been
            remarkably effective.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Your Rights</h2>
          <p>
            You have the right to access your data, correct your data, and request its deletion. You also have
            the right to ask why you purchased dehydrated water. We cannot help with this last one, but we
            understand the impulse. Exercise any of these rights by post. Allow 6-8 weeks for a response,
            or longer if Ezekiel is on one of his &ldquo;contemplation retreats.&rdquo;
          </p>

          <p className="text-sm text-foreground/40 italic border-t border-primary/10 pt-6">
            This privacy policy is a work of satire. Dehydrated Water Co. is a fictional company. No actual
            data is collected, stored, or processed. Reginald the cat is also fictional, but we like to
            think he&apos;d be a good guard cat.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create terms page**

```tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Dehydrated Water Co.",
  description: "By reading this, you have agreed to something. We're not sure what.",
}

export default function DehydratedWaterTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By reading this sentence, you have entered into a binding agreement with a company that sells powder."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Effective: Retroactively, since 1847. Jurisdiction: The Drywell Estate, Vermont (fictional).
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By visiting this website, you agree to these terms. By reading these terms, you agree to them more.
            By purchasing our products, you agree to them the most. There is no mechanism for disagreeing.
            Ezekiel I designed it that way. He was a philosopher, not a democrat.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Product Disclaimers</h2>
          <p>
            Our products are not FDA-approved, not scientifically validated, and not, in the strictest sense,
            products. The &ldquo;Science Facts&rdquo; on our product pages are works of creative fiction.
            Any resemblance to actual science is coincidental and, frankly, surprising.
            If you consume our products based on anything you read here, that is a choice you have made,
            and we admire your adventurous spirit.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Limitation of Liability</h2>
          <p>
            Dehydrated Water Co. is not liable for: accidental hydration, surplus water, philosophical crises
            triggered by the nature of our products, marital disputes arising from unexplained purchases,
            or any damage caused by our Double-Dehydrated variant&apos;s theoretical &ldquo;Negative Wetness.&rdquo;
            We are also not liable for the behavior of Ezekiel V, who manages our customer retention department
            and can be &ldquo;persistent.&rdquo;
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Shipping &amp; Returns</h2>
          <p>
            Orders ship within 6-8 weeks via our preferred carrier (Ezekiel&apos;s nephew, when available).
            Returns are accepted only if the product has been accidentally hydrated. To return hydrated product,
            please ship the liquid water back to us in a standard paper envelope. We will not reimburse
            postage. We will not acknowledge the absurdity. This is our policy.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Intellectual Property</h2>
          <p>
            All content on this website — including the concept of dehydrating water, the Drywell Method™,
            and the phrase &ldquo;burdened by its own wetness&rdquo; — is the intellectual property of
            the Drywell family. We use the term &ldquo;intellectual&rdquo; aspirationally. Reproduction
            without permission is prohibited, though we&apos;d honestly be flattered.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            Disputes shall be resolved through binding arbitration conducted by Ezekiel IV in his study.
            He will listen to both sides, consult the original 1847 company charter (which is mostly
            water-stained and illegible), and render a decision within 90 days. His decisions are final.
            Appeals may be directed to Reginald the cat, who will ignore them.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of the Drywell Estate, a property in Vermont that operates
            under its own set of bylaws written in 1847 and never updated. In the event of a conflict
            between these bylaws and actual law, we defer to whichever is more favorable to us. This is
            not how law works, but it is how the Drywells have operated for seven generations.
          </p>

          <p className="text-sm text-foreground/40 italic border-t border-primary/10 pt-6">
            These terms are a work of satire. No legal obligations are created by visiting this website.
            No water — dehydrated or otherwise — was harmed in the making of these terms.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sites/dehydratedwater/pages/privacy.tsx src/sites/dehydratedwater/pages/terms.tsx
git commit -m "feat: add dehydrated water privacy and terms pages"
```

---

### Task 14: Barrel Export and Registry Entry

**Files:**
- Create: `src/sites/dehydratedwater/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create barrel export**

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import DehydratedWaterHome from "./pages/home"
import DehydratedWaterProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import OurStory, { metadata as ourStoryMetadata } from "./pages/our-story"
import TheScience, { metadata as theScienceMetadata } from "./pages/the-science"
import WaaS from "./pages/waas"
import FAQ, { metadata as faqMetadata } from "./pages/faq"
import DehydratedWaterCart from "./pages/cart"
import DehydratedWaterCheckout from "./pages/checkout"
import DehydratedWaterPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import DehydratedWaterTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": DehydratedWaterHome,
  "products": { component: DehydratedWaterProducts, metadata: productsMetadata },
  "our-story": { component: OurStory, metadata: ourStoryMetadata },
  "the-science": { component: TheScience, metadata: theScienceMetadata },
  "waas": WaaS,
  "faq": { component: FAQ, metadata: faqMetadata },
  "cart": DehydratedWaterCart,
  "checkout": DehydratedWaterCheckout,
  "privacy": { component: DehydratedWaterPrivacy, metadata: privacyMetadata },
  "terms": { component: DehydratedWaterTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Dehydrated Water Co.`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 2: Add to registry**

In `src/sites/registry.ts`, add the import and registry entry:

```typescript
// Add import after existing imports:
import { config as dehydratedwaterConfig, pages as dehydratedwaterPages, dynamicRoutes as dehydratedwaterDynamicRoutes } from "./dehydratedwater"

// Add to siteRegistry object:
dehydratedwater: { config: dehydratedwaterConfig, pages: dehydratedwaterPages, dynamicRoutes: dehydratedwaterDynamicRoutes },
```

- [ ] **Step 3: Verify build passes**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors.

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/sites/dehydratedwater/index.ts src/sites/registry.ts
git commit -m "feat: register dehydrated water site in registry"
```

---

### Task 15: Static Asset Placeholders

**Files:**
- Create: `public/sites/dehydratedwater/` directory and placeholder images

- [ ] **Step 1: Create placeholder images**

Product images, team photos, science diagrams, and hero images are needed. Since these are joke products that don't physically exist, create SVG placeholder images for each required asset. These can be replaced later with generated or sourced images.

Required images (one per product + team + science):
- `public/sites/dehydratedwater/product-original.png`
- `public/sites/dehydratedwater/product-cloud-mist.png`
- `public/sites/dehydratedwater/product-dryer.png`
- `public/sites/dehydratedwater/product-heavy.png`
- `public/sites/dehydratedwater/product-ice-cubes.png`
- `public/sites/dehydratedwater/product-diet.png`
- `public/sites/dehydratedwater/product-starter.png`
- `public/sites/dehydratedwater/product-waas.png`
- `public/sites/dehydratedwater/product-seasoning.png`
- `public/sites/dehydratedwater/founder.png`
- `public/sites/dehydratedwater/team-ezekiel-i.png`
- `public/sites/dehydratedwater/team-ezekiel-iv.png`
- `public/sites/dehydratedwater/team-prudence.png`
- `public/sites/dehydratedwater/team-thaddeus.png`
- `public/sites/dehydratedwater/science-collection.png`
- `public/sites/dehydratedwater/science-evaporation.png`
- `public/sites/dehydratedwater/science-capture.png`
- `public/sites/dehydratedwater/science-dehydration.png`
- `public/sites/dehydratedwater/favicon.png`

Generate simple placeholder PNGs (solid color rectangles with text labels) using a script or manually. Each should be a minimal image (e.g., 400x400px for products, 200x200px for team) in the Apothecary Blue color scheme (#1B3A4B background, #E8F0F2 text).

- [ ] **Step 2: Commit**

```bash
git add public/sites/dehydratedwater/
git commit -m "feat: add dehydrated water placeholder images"
```

---

### Task 16: E2E Page Tests

**Files:**
- Create: `e2e/dehydratedwater-pages.spec.ts`

- [ ] **Step 1: Create page navigation tests**

```typescript
import { test, expect } from "@playwright/test"

const SITE = "?site=dehydratedwater"

test.describe("Dehydrated Water Co. — Page Navigation", () => {
  test("homepage loads with hero and featured products", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await expect(page.locator("h1")).toContainText("Water, Perfected Through Absence")
    await expect(page.getByText("Featured Products")).toBeVisible()
    await expect(page.getByText("What Our Patrons Say")).toBeVisible()
  })

  test("products page shows all 9 products", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await expect(page.locator("h1")).toContainText("The Collection")
    const productHeadings = page.locator("h3")
    await expect(productHeadings).toHaveCount(9)
  })

  test("product detail page loads for original", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await expect(page.locator("h1")).toContainText("Original Dehydrated Water")
    await expect(page.getByText("Science Facts")).toBeVisible()
  })

  test("product detail page loads for cloud mist with variants", async ({ page }) => {
    await page.goto(`/products/cloud-mist${SITE}`)
    await expect(page.locator("h1")).toContainText("Single Origin Cloud Mist")
    await expect(page.getByText("Available Variants")).toBeVisible()
    await expect(page.getByText("The Nor'easter")).toBeVisible()
    await expect(page.getByText("Sahara Noon")).toBeVisible()
    await expect(page.getByText("Amazonian Downpour")).toBeVisible()
  })

  test("product detail page loads for dryer water", async ({ page }) => {
    await page.goto(`/products/dryer-water${SITE}`)
    await expect(page.locator("h1")).toContainText("Dryer")
    await expect(page.getByText("$34.99")).toBeVisible()
  })

  test("waas product links to subscription page", async ({ page }) => {
    await page.goto(`/products/waas${SITE}`)
    await expect(page.getByText("View Subscription Plans")).toBeVisible()
  })

  test("invalid product slug returns 404", async ({ page }) => {
    await page.goto(`/products/nonexistent${SITE}`)
    await expect(page.getByText("404")).toBeVisible()
  })

  test("our story page loads with timeline and family", async ({ page }) => {
    await page.goto(`/our-story${SITE}`)
    await expect(page.locator("h1")).toContainText("Our Story")
    await expect(page.getByText("The Founding Vision")).toBeVisible()
    await expect(page.getByText("Company Timeline")).toBeVisible()
    await expect(page.getByText("1847", { exact: true })).toBeVisible()
    await expect(page.getByText("2026", { exact: true })).toBeVisible()
    await expect(page.getByText("The Drywell Family")).toBeVisible()
    await expect(page.getByRole("heading", { name: "Ezekiel Drywell I" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Ezekiel Drywell IV" })).toBeVisible()
  })

  test("the science page loads with process steps", async ({ page }) => {
    await page.goto(`/the-science${SITE}`)
    await expect(page.locator("h1")).toContainText("The Science")
    await expect(page.getByText("The Drywell Method")).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Aqueous Acquisition" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Thermal Dissociation" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Vapor Recapture" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Final Dehydration" })).toBeVisible()
  })

  test("waas page loads with pricing tiers", async ({ page }) => {
    await page.goto(`/waas${SITE}`)
    await expect(page.locator("h1")).toContainText("Water-as-a-Service")
    await expect(page.getByText("Apprentice")).toBeVisible()
    await expect(page.getByText("Journeyman")).toBeVisible()
    await expect(page.getByText("Master Dryer")).toBeVisible()
    await expect(page.getByText("$29.99")).toBeVisible()
    await expect(page.getByText("$49.99")).toBeVisible()
    await expect(page.getByText("$99.99")).toBeVisible()
  })

  test("faq page loads with questions", async ({ page }) => {
    await page.goto(`/faq${SITE}`)
    await expect(page.locator("h1")).toContainText("Frequently Asked Questions")
    await expect(page.getByText("Is this real water?")).toBeVisible()
    await expect(page.getByText("What is your return policy?")).toBeVisible()
  })

  test("cart page loads with empty state", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.evaluate(() => localStorage.clear())
    await page.goto(`/cart${SITE}`)
    await expect(page.locator("h1")).toContainText("Your Cart")
    await expect(page.getByText("as empty as our Double-Dehydrated")).toBeVisible()
  })

  test("checkout page loads with progress bar", async ({ page }) => {
    await page.goto(`/checkout${SITE}`)
    await expect(page.getByText("Our Artisans Are Hand-Dehydrating")).toBeVisible()
    await expect(page.getByText("When the water is ready")).toBeVisible()
  })

  test("privacy policy page loads", async ({ page }) => {
    await page.goto(`/privacy${SITE}`)
    await expect(page.locator("h1")).toContainText("Privacy Policy")
    await expect(page.getByText("Data Collection")).toBeVisible()
  })

  test("terms of use page loads", async ({ page }) => {
    await page.goto(`/terms${SITE}`)
    await expect(page.locator("h1")).toContainText("Terms of Use")
    await expect(page.getByText("Limitation of Liability")).toBeVisible()
  })
})

test.describe("Dehydrated Water Co. — Navigation", () => {
  test("header nav links work", async ({ page }) => {
    await page.goto(`/${SITE}`)
    const nav = page.locator("header")
    await expect(nav.getByText("Products")).toBeVisible()
    await expect(nav.getByText("Our Story")).toBeVisible()
    await expect(nav.getByText("The Science")).toBeVisible()
    await expect(nav.getByText("WaaS")).toBeVisible()
    await expect(nav.getByText("FAQ")).toBeVisible()
  })

  test("footer has privacy and terms links", async ({ page }) => {
    await page.goto(`/${SITE}`)
    const footer = page.locator("footer")
    await expect(footer.getByText("Privacy Policy")).toBeVisible()
    await expect(footer.getByText("Terms of Use")).toBeVisible()
  })

  test("cart icon is visible in header", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await expect(page.locator("header a[href*='cart'] svg").first()).toBeVisible()
  })
})

test.describe("Apex Site — Dehydrated Water Listed", () => {
  test("apex lists dehydrated water brand", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByText("Dehydrated Water Co.")).toBeVisible()
  })
})
```

- [ ] **Step 2: Run tests**

Run: `npx playwright test e2e/dehydratedwater-pages.spec.ts`
Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add e2e/dehydratedwater-pages.spec.ts
git commit -m "test: add dehydrated water page navigation E2E tests"
```

---

### Task 17: E2E Cart Tests

**Files:**
- Create: `e2e/dehydratedwater-cart.spec.ts`

- [ ] **Step 1: Create cart flow tests**

```typescript
import { test, expect } from "@playwright/test"

const SITE = "?site=dehydratedwater"

async function expectCartCount(page: import("@playwright/test").Page, count: string) {
  await expect(page.locator("header a[href*='cart'] span").first()).toHaveText(count)
}

test.describe.configure({ mode: "serial" })

test.describe("Dehydrated Water Co. — Cart Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.evaluate(() => localStorage.clear())
  })

  test("add to cart from product detail page", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await expect(page.getByText("added to cart")).toBeVisible({ timeout: 5000 })
    await expectCartCount(page, "1")
  })

  test("add to cart from product grid", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await expect(page.getByText("added to cart")).toBeVisible({ timeout: 5000 })
  })

  test("add multiple products to cart", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.getByRole("button", { name: "Add to Cart" }).nth(1).click()
    await expectCartCount(page, "2")
  })

  test("cart page shows added items", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.goto(`/cart${SITE}`)
    await expect(page.getByText("Desiccation Fee")).toBeVisible()
    await expect(page.getByText("Powder Dispersal Tax")).toBeVisible()
  })

  test("cart persists after page reload", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.reload()
    await expectCartCount(page, "1")
  })

  test("remove item from cart", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.goto(`/cart${SITE}`)
    await page.locator("[aria-label='Remove']").click()
    await expect(page.getByText("as empty as our Double-Dehydrated")).toBeVisible()
  })

  test("quantity controls work in cart", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.goto(`/cart${SITE}`)
    await page.getByRole("button", { name: "+" }).click()
    await expectCartCount(page, "2")
  })

  test("waas tier selection adds to cart", async ({ page }) => {
    await page.goto(`/waas${SITE}`)
    await page.getByRole("button", { name: "Select" }).first().click()
    await expect(page.getByText("added to cart")).toBeVisible({ timeout: 5000 })
  })

  test("proceed to checkout from cart", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.goto(`/cart${SITE}`)
    await page.getByText("Proceed to Checkout").click()
    await expect(page.getByText("Our Artisans Are Hand-Dehydrating")).toBeVisible()
  })

  test("checkout page has fake progress bar", async ({ page }) => {
    await page.goto(`/checkout${SITE}`)
    await expect(page.getByText(/Processing.*\d+%/)).toBeVisible()
  })
})
```

- [ ] **Step 2: Run tests**

Run: `npx playwright test e2e/dehydratedwater-cart.spec.ts`
Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add e2e/dehydratedwater-cart.spec.ts
git commit -m "test: add dehydrated water cart flow E2E tests"
```

---

### Task 18: E2E Screenshot Tests

**Files:**
- Create: `e2e/dehydratedwater-screenshots.spec.ts`

- [ ] **Step 1: Create screenshot tests**

```typescript
import { test, expect } from "@playwright/test"

const SITE = "?site=dehydratedwater"

test.describe("Dehydrated Water Co. — Visual Regression Screenshots", () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test("homepage", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("homepage.png", { fullPage: true })
  })

  test("products page", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("products.png", { fullPage: true })
  })

  test("product detail - original", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("product-detail-original.png", { fullPage: true })
  })

  test("product detail - cloud mist with variants", async ({ page }) => {
    await page.goto(`/products/cloud-mist${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("product-detail-cloud-mist.png", { fullPage: true })
  })

  test("our story page", async ({ page }) => {
    await page.goto(`/our-story${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("our-story.png", { fullPage: true })
  })

  test("the science page", async ({ page }) => {
    await page.goto(`/the-science${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("the-science.png", { fullPage: true })
  })

  test("waas page", async ({ page }) => {
    await page.goto(`/waas${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("waas.png", { fullPage: true })
  })

  test("faq page", async ({ page }) => {
    await page.goto(`/faq${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("faq.png", { fullPage: true })
  })

  test("cart empty state", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.evaluate(() => localStorage.clear())
    await page.goto(`/cart${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("cart-empty.png", { fullPage: true })
  })

  test("checkout page", async ({ page }) => {
    await page.goto(`/checkout${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("checkout.png", {
      fullPage: true,
      mask: [page.locator("text=Processing")],
    })
  })

  test("privacy policy", async ({ page }) => {
    await page.goto(`/privacy${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("privacy.png", { fullPage: true })
  })

  test("terms of use", async ({ page }) => {
    await page.goto(`/terms${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("terms.png", { fullPage: true })
  })
})

test.describe("Dehydrated Water Co. — Mobile Screenshots", () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test("homepage mobile", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("homepage-mobile.png", { fullPage: true })
  })

  test("mobile nav opens", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.locator("[aria-label='Toggle menu']").click()
    await expect(page).toHaveScreenshot("mobile-nav-open.png")
  })

  test("products mobile", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("products-mobile.png", { fullPage: true })
  })

  test("product detail mobile", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("product-detail-mobile.png", { fullPage: true })
  })
})
```

- [ ] **Step 2: Generate baseline screenshots**

Run: `npx playwright test e2e/dehydratedwater-screenshots.spec.ts --update-snapshots`
Expected: Screenshots generated successfully.

- [ ] **Step 3: Commit**

```bash
git add e2e/dehydratedwater-screenshots.spec.ts e2e/dehydratedwater-screenshots.spec.ts-snapshots/
git commit -m "test: add dehydrated water visual regression screenshot tests"
```

---

### Task 19: Final Verification

**Files:** None (verification only)

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors.

- [ ] **Step 4: Run ALL E2E tests (existing + new)**

Run: `npx playwright test`
Expected: All existing pigmilk tests still pass. All new dehydratedwater tests pass.

- [ ] **Step 5: Manual smoke test**

Run: `npm run dev`

Verify in browser:
- `localhost:3000/` — apex shows both Pig Milk Co. and Dehydrated Water Co.
- `localhost:3000/?site=dehydratedwater` — homepage with Apothecary Blue theme
- `localhost:3000/products?site=dehydratedwater` — 9 product grid
- `localhost:3000/products/original?site=dehydratedwater` — product detail with Science Facts
- `localhost:3000/products/cloud-mist?site=dehydratedwater` — variant cards visible
- `localhost:3000/waas?site=dehydratedwater` — pricing table with 3 tiers
- `localhost:3000/faq?site=dehydratedwater` — FAQ accordion
- Cart flow: add item, check cart, proceed to checkout
- `localhost:3000/?site=pigmilk` — pigmilk still works, separate cart

- [ ] **Step 6: Commit any fixes**

If any issues found, fix and commit each fix individually.
