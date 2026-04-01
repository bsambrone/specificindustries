# True Grit Personal Care — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the True Grit Personal Care satire site — sandpaper toilet paper with a Home Depot aesthetic, full commerce, 8 products, and 10 pages.

**Architecture:** New site under `src/sites/truegrit/` following the established multi-subdomain pattern. One architectural refactor: `AddToCartButton` quips become prop-driven instead of hardcoded. New Google Font (Barlow Condensed) added to the font system. All routing through the existing catch-all.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, React Context (commerce)

**Spec:** `docs/superpowers/specs/2026-04-01-truegrit-site-design.md`

---

## File Structure

### New files (True Grit site)
- `src/sites/truegrit/config.ts` — SiteConfig with industrial theme
- `src/sites/truegrit/data/products.ts` — Product catalog, `getProductBySlug()`, `getRelatedProducts()`
- `src/sites/truegrit/pages/home.tsx` — Homepage
- `src/sites/truegrit/pages/products.tsx` — Product listing
- `src/sites/truegrit/pages/product-detail.tsx` — Product detail (dynamic route)
- `src/sites/truegrit/pages/the-experience.tsx` — The Experience page
- `src/sites/truegrit/pages/the-aftermath.tsx` — The Aftermath page
- `src/sites/truegrit/pages/behind-the-scenes.tsx` — Behind the Scenes page
- `src/sites/truegrit/pages/about.tsx` — About & Leadership page
- `src/sites/truegrit/pages/cart.tsx` — Cart page with custom messaging
- `src/sites/truegrit/pages/checkout.tsx` — Checkout page with custom messaging
- `src/sites/truegrit/pages/privacy.tsx` — Privacy policy (satirical)
- `src/sites/truegrit/pages/terms.tsx` — Terms of use (satirical)
- `src/sites/truegrit/index.ts` — Barrel export
- `public/sites/truegrit/` — Images directory (populated by image generation tasks)

### Modified files
- `src/themes/fonts.ts` — Add Barlow Condensed
- `src/sites/registry.ts` — Register truegrit site
- `src/components/commerce/add-to-cart-button.tsx` — Accept optional `quips` prop
- `src/components/ui/product-card.tsx` — Pass through `quips` prop to AddToCartButton

---

## Task 1: Register Barlow Condensed Font

**Files:**
- Modify: `src/themes/fonts.ts`

- [ ] **Step 1: Add Barlow Condensed import and declaration**

In `src/themes/fonts.ts`, add the import and font declaration:

```typescript
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed } from "next/font/google"
```

Add after the `poppins` declaration:

```typescript
export const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
})
```

- [ ] **Step 2: Add to fontVariables array**

Update the `fontVariables` array to include the new font:

```typescript
export const fontVariables = [
  inter.variable,
  playfairDisplay.variable,
  spaceGrotesk.variable,
  poppins.variable,
  barlowCondensed.variable,
].join(" ")
```

- [ ] **Step 3: Add to fontFamilyMap**

Add the mapping entry:

```typescript
export const fontFamilyMap: Record<string, string> = {
  inter: "'Inter', sans-serif",
  playfair: "'Playfair Display', serif",
  "space-grotesk": "'Space Grotesk', sans-serif",
  poppins: "'Poppins', sans-serif",
  "barlow-condensed": "'Barlow Condensed', sans-serif",
}
```

- [ ] **Step 4: Verify the build compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/themes/fonts.ts
git commit -m "feat(truegrit): register Barlow Condensed font"
```

---

## Task 2: Refactor AddToCartButton Quips

**Files:**
- Modify: `src/components/commerce/add-to-cart-button.tsx`
- Modify: `src/components/ui/product-card.tsx`

- [ ] **Step 1: Make quips a prop with fallback defaults**

Replace the contents of `src/components/commerce/add-to-cart-button.tsx`:

```typescript
"use client"

import { useCart } from "./cart-provider"

const defaultQuips = [
  "Bold choice.",
  "Your doctor will have questions.",
  "We admire your courage.",
  "No refunds. Ever.",
  "Interesting decision.",
  "Added to cart.",
]

interface AddToCartButtonProps {
  slug: string
  productName: string
  className?: string
  quips?: string[]
}

export function AddToCartButton({ slug, productName, className, quips }: AddToCartButtonProps) {
  const { addToCart, showToast } = useCart()

  function handleClick() {
    addToCart(slug)
    const pool = quips && quips.length > 0 ? quips : defaultQuips
    const quip = pool[Math.floor(Math.random() * pool.length)]
    showToast(`${productName} added to cart. ${quip}`)
  }

  return (
    <button
      onClick={handleClick}
      className={className || "px-6 py-3 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"}
    >
      Add to Cart
    </button>
  )
}
```

Note: The old quip "The pigs thank you." is removed from the defaults — it was pig-specific. The defaults are now generic.

- [ ] **Step 2: Add quips pass-through to ProductCard**

In `src/components/ui/product-card.tsx`, add `quips` to the interface and pass it through:

Add `quips?: string[]` to `ProductCardProps`:

```typescript
interface ProductCardProps {
  slug: string
  name: string
  price: string
  tagline: string
  image: string
  showAddToCart?: boolean
  href?: string
  quips?: string[]
}
```

Update the component signature to destructure `quips`:

```typescript
export function ProductCard({ slug, name, price, tagline, image, showAddToCart = true, href, quips }: ProductCardProps) {
```

And pass `quips` to `AddToCartButton`:

```typescript
{showAddToCart && <AddToCartButton slug={slug} productName={name} quips={quips} />}
```

- [ ] **Step 3: Verify existing sites still work**

Run: `npx tsc --noEmit`
Expected: No errors. Existing sites don't pass `quips`, so they get `defaultQuips` — backward compatible.

- [ ] **Step 4: Commit**

```bash
git add src/components/commerce/add-to-cart-button.tsx src/components/ui/product-card.tsx
git commit -m "refactor: make AddToCartButton quips configurable via prop"
```

---

## Task 3: Create Site Config & Product Data

**Files:**
- Create: `src/sites/truegrit/config.ts`
- Create: `src/sites/truegrit/data/products.ts`

- [ ] **Step 1: Create the site config**

Create `src/sites/truegrit/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "True Grit Personal Care",
  subdomain: "truegrit",
  theme: {
    preset: "industrial",
    colors: {
      primary: "#f96302",
      secondary: "#f5f5f0",
      accent: "#ff8c00",
      background: "#ffffff",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "barlow-condensed",
      body: "inter",
    },
  },
  metadata: {
    title: "True Grit Personal Care — Where Comfort Meets Its Match",
    description: "Industrial-grade personal cleansing products. Non-GMO. Free Range. Definitely Not Tear-Free.",
  },
  nav: [
    { label: "Products", path: "/products" },
    { label: "The Experience", path: "/the-experience" },
    { label: "The Aftermath", path: "/the-aftermath" },
    { label: "Behind the Scenes", path: "/behind-the-scenes" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create the product data**

Create `src/sites/truegrit/data/products.ts`:

```typescript
export interface Product {
  slug: string
  name: string
  sku: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  category: "abrasives" | "bidets" | "accessories" | "kits"
  specs: Array<{ label: string; value: string }>
  disclaimers: string[]
}

export const products: Product[] = [
  {
    slug: "original-40-grit",
    name: "The Original 40-Grit",
    sku: "TG-040-STD",
    price: 8.99,
    priceLabel: "$8.99 / roll",
    tagline: "Industrial-grade personal cleansing.",
    description: [
      "The product that started a revolution no one asked for. The Original 40-Grit delivers a cleaning experience so thorough, you'll never question whether the job was done. You'll know. Your body will tell you.",
      "Engineered with precision aluminum oxide abrasive bonded to a flexible backing substrate, each sheet provides consistent coverage across all personal terrain. The 40-grit rating represents our ideal balance between cleanliness and what our legal team calls 'acceptable discomfort.'",
      "Non-GMO. Free range. Sourced from responsibly managed sandpaper quarries. Each roll contains approximately 200 sheets, though most customers report needing significantly fewer.",
    ],
    image: "/sites/truegrit/product-original-40.png",
    category: "abrasives",
    specs: [
      { label: "Grit Rating", value: "40 (Medium-Coarse)" },
      { label: "Abrasive Material", value: "Aluminum Oxide" },
      { label: "Backing", value: "Flexible C-Weight Paper" },
      { label: "Sheets Per Roll", value: "~200" },
      { label: "Tensile Strength", value: "Industrial" },
      { label: "Softness Rating", value: "N/A" },
    ],
    disclaimers: [
      "Minor surface irritation indicates proper coverage.",
      "Not recommended for consecutive use without a recovery period.",
      "Keep Recovery Balm within arm's reach.",
    ],
  },
  {
    slug: "80-grit-sensitive",
    name: "80-Grit Sensitive",
    sku: "TG-080-SEN",
    price: 12.99,
    priceLabel: "$12.99 / roll",
    tagline: "Our gentlest option. Relatively speaking.",
    description: [
      "For those who appreciate a thorough clean but prefer to ease into the True Grit lifestyle, the 80-Grit Sensitive offers a marginally less intense experience. We call it 'gentle.' Our customers call it 'still sandpaper.'",
      "The finer grit pattern provides what our engineers describe as 'reduced abrasion coefficient' and what our test subjects described as 'slightly less alarming.' It's the training wheels of industrial personal cleansing.",
      "Ideal for first-time users, those transitioning from conventional toilet paper, or anyone whose doctor has specifically advised against our 40-grit product (we get a lot of those letters).",
    ],
    image: "/sites/truegrit/product-80-grit.png",
    category: "abrasives",
    specs: [
      { label: "Grit Rating", value: "80 (Fine)" },
      { label: "Abrasive Material", value: "Aluminum Oxide (Fine Grade)" },
      { label: "Backing", value: "Flexible A-Weight Paper" },
      { label: "Sheets Per Roll", value: "~250" },
      { label: "Gentleness", value: "Relative" },
      { label: "Doctor Recommended", value: "Absolutely Not" },
    ],
    disclaimers: [
      "The word 'sensitive' is used loosely.",
      "Still significantly more abrasive than conventional toilet paper.",
      "Consult your physician if you're considering this a 'gentle' option.",
    ],
  },
  {
    slug: "24-grit-deep-clean",
    name: "24-Grit Deep Clean",
    sku: "TG-024-PRO",
    price: 6.99,
    priceLabel: "$6.99 / roll",
    tagline: "For professionals and the exceptionally determined.",
    description: [
      "When 40-grit isn't enough — and frankly, we're concerned about anyone for whom it isn't — the 24-Grit Deep Clean delivers maximum abrasive coverage. This is our most aggressive personal cleansing product and it is not for the faint of heart.",
      "Originally developed for industrial surface preparation, we realized it could serve a dual purpose. Our R&D team (Jim) spent months adapting the formula for personal use. The results were immediate and impossible to ignore.",
      "The 24-Grit Deep Clean is our most affordable option because, honestly, most people don't come back for a second roll. Those who do have our deepest respect and our sincerest concern.",
    ],
    image: "/sites/truegrit/product-24-grit.png",
    category: "abrasives",
    specs: [
      { label: "Grit Rating", value: "24 (Extra Coarse)" },
      { label: "Abrasive Material", value: "Silicon Carbide" },
      { label: "Backing", value: "Heavy-Duty D-Weight Paper" },
      { label: "Sheets Per Roll", value: "~150" },
      { label: "Intensity", value: "Maximum" },
      { label: "Recommended By", value: "No One" },
    ],
    disclaimers: [
      "For experienced True Grit users only.",
      "Crying from the bathroom is normal and expected.",
      "Please verify your health insurance coverage before purchase.",
    ],
  },
  {
    slug: "40-grit-hand-towels",
    name: "40-Grit Hand Towels",
    sku: "TG-040-HT",
    price: 14.99,
    priceLabel: "$14.99 / pack",
    tagline: "Extend the True Grit experience to your extremities.",
    description: [
      "Why should personal cleansing stop at the bathroom? Our 40-Grit Hand Towels bring the True Grit standard of thoroughness to your hands, and they're designed to fit any standard paper towel dispenser.",
      "Each towel is individually folded and interleaved for easy single-sheet dispensing. Perfect for executive washrooms, restaurant restrooms, or anywhere you want to make a statement about your commitment to cleanliness.",
      "Available in cases of 16 packs. Bulk pricing available for facilities that want to boost employee productivity by discouraging excessive hand-washing breaks.",
    ],
    image: "/sites/truegrit/product-hand-towels.png",
    category: "abrasives",
    specs: [
      { label: "Grit Rating", value: "40 (Medium-Coarse)" },
      { label: "Towel Size", value: '9.5" × 10.5" (Standard Fold)' },
      { label: "Sheets Per Pack", value: "250" },
      { label: "Dispenser Compatible", value: "Universal C-Fold" },
      { label: "Hand Softness After Use", value: "Reduced" },
      { label: "Handshake Confidence", value: "Complicated" },
    ],
    disclaimers: [
      "May affect your ability to operate touchscreens for up to 48 hours.",
      "Not recommended before handshakes, first dates, or any situation requiring fingerprints.",
    ],
  },
  {
    slug: "hydroblast-500",
    name: "The HydroBlast 500",
    sku: "TG-HB-500",
    price: 199.99,
    priceLabel: "$199.99",
    tagline: "Pressure washing for the discerning individual.",
    description: [
      "The HydroBlast 500 brings 500 PSI of focused cleansing power to your bathroom. That's the equivalent of a light-duty pressure washer, and yes, we are aware of how that sounds. We sell it anyway.",
      "Featuring an adjustable brass nozzle, reinforced supply line, and wall-mounted control panel, the HydroBlast 500 transforms your bathroom into what our marketing team calls 'a professional-grade cleansing station' and what everyone else calls 'a lot.'",
      "Installation requires standard plumbing connections and a willingness to explain to your plumber what you're planning. Mounting hardware included. Courage sold separately.",
    ],
    image: "/sites/truegrit/product-hydroblast.png",
    category: "bidets",
    specs: [
      { label: "Water Pressure", value: "500 PSI (Adjustable)" },
      { label: "Nozzle Type", value: "Precision Brass" },
      { label: "Supply Line", value: "Reinforced Braided Steel" },
      { label: "Installation", value: "Professional Recommended" },
      { label: "Splash Radius", value: "Significant" },
      { label: "Neighbor Complaints", value: "Probable" },
    ],
    disclaimers: [
      "Do not exceed recommended PSI settings.",
      "Bathroom ventilation strongly recommended.",
      "True Grit is not responsible for any tile damage, grout erosion, or marital disputes arising from installation.",
    ],
  },
  {
    slug: "acidjet-bidet-3000",
    name: "The AcidJet Bidet 3000",
    sku: "TG-AJ-3000",
    price: 299.99,
    priceLabel: "$299.99",
    tagline: "Supplemental chemical cleansing for those who demand absolute sterility.",
    description: [
      "For customers who found the HydroBlast 500 insufficiently thorough, the AcidJet Bidet 3000 adds a battery acid reservoir to the equation. We cannot stress enough how much our legal team opposed this product. We launched it anyway.",
      "The dual-chamber system blends industrial-grade battery acid with water at a ratio our engineers describe as 'aggressive but technically survivable.' The precision ceramic nozzle delivers a focused stream that leaves nothing to chance — or to comfort.",
      "Each unit ships with a 30-day supply of acid concentrate, chemical-resistant tubing, safety goggles (mandatory), and a comprehensive waiver that we strongly encourage you to actually read for once.",
    ],
    image: "/sites/truegrit/product-acidjet.png",
    category: "bidets",
    specs: [
      { label: "Acid Concentration", value: "Classified" },
      { label: "Reservoir Capacity", value: "2L (Chemical-Resistant)" },
      { label: "Nozzle Material", value: "Acid-Resistant Ceramic" },
      { label: "Safety Goggles", value: "Included (Mandatory)" },
      { label: "Waiver Pages", value: "47" },
      { label: "FDA Approval", value: "Pending (Since 2019)" },
    ],
    disclaimers: [
      "Safety goggles must be worn at all times during operation.",
      "Do not use if you have skin. Consult a hazmat professional before installation.",
      "The 47-page waiver is not decorative. Please read it.",
    ],
  },
  {
    slug: "recovery-balm",
    name: "Recovery Balm",
    sku: "TG-RB-001",
    price: 24.99,
    priceLabel: "$24.99 / jar",
    tagline: "Apply liberally. Then apply again.",
    description: [
      "If you're looking at this product, you already know why you need it. The Recovery Balm is our most popular accessory, and by 'accessory' we mean 'the thing that makes our other products survivable.'",
      "Formulated with aloe vera, lidocaine, vitamin E, and what our chemists poetically refer to as 'hope,' the Recovery Balm provides soothing relief for skin that has experienced the True Grit difference. Apply immediately after use. Then again 10 minutes later. Then once more for good measure.",
      "Available in our standard 8 oz jar or the 32 oz 'I Bought the 24-Grit' emergency size (sold separately).",
    ],
    image: "/sites/truegrit/product-recovery-balm.png",
    category: "accessories",
    specs: [
      { label: "Active Ingredients", value: "Aloe, Lidocaine, Vitamin E, Hope" },
      { label: "Size", value: "8 oz" },
      { label: "Applications Per Jar", value: "Depends on grit selection" },
      { label: "Relief Speed", value: "Not fast enough" },
      { label: "Scent", value: "Medicinal Lavender" },
      { label: "Emotional Support", value: "Limited" },
    ],
    disclaimers: [
      "Not a substitute for medical attention.",
      "If you need more than one jar per week, please reconsider your grit selection.",
    ],
  },
  {
    slug: "starter-kit",
    name: "The Starter Kit",
    sku: "TG-SK-001",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "Everything you need to begin your journey. Medical supplies sold separately.",
    description: [
      "The Starter Kit is our recommended entry point for the True Grit lifestyle. It includes one roll each of our 80-Grit Sensitive, 40-Grit Original, and 24-Grit Deep Clean, plus a full jar of Recovery Balm. We put the 80-grit on top for a reason.",
      "Designed as a progressive system, the kit allows you to work your way up (or down, depending on your perspective) through our grit range. Most customers find their comfort zone somewhere around the 80-grit. The rest have our admiration and our concern.",
      "Makes an unforgettable gift. And we do mean unforgettable. The recipient will remember you every single time they use it. Whether that's a positive association depends entirely on your relationship.",
    ],
    image: "/sites/truegrit/product-starter-kit.png",
    category: "kits",
    specs: [
      { label: "Includes", value: "80-Grit, 40-Grit, 24-Grit, Recovery Balm" },
      { label: "Recommended Starting Grit", value: "80 (Please)" },
      { label: "Gift Wrapping", value: "Available" },
      { label: "Gift Returns", value: "Understandable" },
      { label: "Medical Supplies", value: "Not Included" },
      { label: "Friendship Risk", value: "Moderate to High" },
    ],
    disclaimers: [
      "Start with the 80-grit. We cannot stress this enough.",
      "Medical supplies sold separately. We recommend having them on hand.",
      "Gift recipients may need time before speaking to you again.",
    ],
  },
]

export const quips = [
  "Brave choice.",
  "Please consult your physician.",
  "We admire your courage — and question your judgment.",
  "Your health insurance has been notified.",
  "No liability implied, expressed, or even considered.",
  "Bold. Very bold.",
  "We recommend keeping the Recovery Balm nearby.",
  "Your bathroom will never be the same.",
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const filtered = products.filter((p) => p.slug !== slug)
  const index = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const start = index % filtered.length
  const result: Product[] = []
  for (let i = 0; i < count && i < filtered.length; i++) {
    result.push(filtered[(start + i) % filtered.length])
  }
  return result
}
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/truegrit/config.ts src/sites/truegrit/data/products.ts
git commit -m "feat(truegrit): add site config and product catalog"
```

---

## Task 4: Create Homepage

**Files:**
- Create: `src/sites/truegrit/pages/home.tsx`

- [ ] **Step 1: Write the homepage component**

Create `src/sites/truegrit/pages/home.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { FeatureSection } from "@/components/ui/feature-section"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { products, quips } from "@/sites/truegrit/data/products"

const featuredSlugs = ["original-40-grit", "80-grit-sensitive", "acidjet-bidet-3000", "starter-kit"]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default function TrueGritHome() {
  return (
    <>
      <Hero
        headline="Where Comfort Meets Its Match"
        subheadline="Non-GMO. Free Range. Definitely Not Tear-Free."
        ctaText="Shop Now"
        ctaHref="/products"
        secondaryCtaText="The Experience"
        secondaryCtaHref="/the-experience"
        image="/sites/truegrit/hero.png"
      />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-4 uppercase tracking-wide">Featured Products</h2>
          <p className="text-center text-foreground/50 text-sm mb-12">Shop by department. Each product rated by grit, not by comfort.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                price={product.priceLabel}
                tagline={product.tagline}
                image={product.image}
                quips={quips}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why True Grit */}
      <FeatureSection
        title="Why True Grit?"
        features={[
          {
            title: "Unparalleled Cleanliness",
            description: "No conventional toilet paper can match the thoroughness of an industrial abrasive. That's not marketing — that's material science.",
          },
          {
            title: "Boost Productivity",
            description: "Our products naturally discourage extended bathroom breaks. Average visit times drop by 84%. Your employer will thank you. Probably.",
          },
          {
            title: "Build Character",
            description: "Every morning is an opportunity for personal growth. True Grit users report increased resilience, determination, and a very specific facial expression.",
          },
        ]}
      />

      {/* Testimonials */}
      <TestimonialGrid
        title="Customer Testimonials"
        testimonials={[
          { quote: "I've never felt so... thorough.", author: "Concerned Customer" },
          { quote: "My bathroom breaks are now under 30 seconds. HR is thrilled.", author: "Corporate Efficiency Expert" },
          { quote: "I bought the 24-grit on a dare. I am a different person now.", author: "Changed Man" },
          { quote: "The Recovery Balm should come free with every purchase. Please.", author: "Repeat Buyer" },
          { quote: "My plumber asked about the HydroBlast 500. Then he asked me to never call him again.", author: "Former Homeowner" },
          { quote: "I can hear my coworkers from the bathroom. They seem... engaged.", author: "Office Manager" },
        ]}
      />

      {/* Disclaimer Banner */}
      <section className="py-6 px-4 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            * True Grit Personal Care is not responsible for any discomfort, alarm, or lifestyle changes resulting from product use.
            Audible responses during use are expected and not cause for concern. Crying from the bathroom is within normal operating parameters.
            Do not mind the bleeding — this is how you know it&apos;s working. All products are non-GMO, free range, and definitely not tear-free.
            Please consult your physician, your insurance provider, and possibly a therapist before beginning a True Grit regimen.
          </p>
        </div>
      </section>

      <CTABanner
        headline="Ready for the Deep Clean?"
        description="Join the growing community of people who have redefined what 'clean' means."
        ctaText="Shop Now"
        ctaHref="/products"
      />
    </>
  )
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/truegrit/pages/home.tsx
git commit -m "feat(truegrit): add homepage"
```

---

## Task 5: Create Products & Product Detail Pages

**Files:**
- Create: `src/sites/truegrit/pages/products.tsx`
- Create: `src/sites/truegrit/pages/product-detail.tsx`

- [ ] **Step 1: Create the products listing page**

Create `src/sites/truegrit/pages/products.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products, quips } from "@/sites/truegrit/data/products"

export const metadata = {
  title: "Products — True Grit Personal Care",
  description: "Browse our full range of industrial-grade personal cleansing products.",
}

export default function TrueGritProducts() {
  return (
    <>
      <Hero
        headline="Our Products"
        subheadline="Engineered for thoroughness. Not for comfort."
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
              quips={quips}
            />
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create the product detail page**

Create `src/sites/truegrit/pages/product-detail.tsx`:

```typescript
"use client"

import Image from "next/image"
import { getProductBySlug, getRelatedProducts, quips } from "@/sites/truegrit/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

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
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-xs text-foreground/40 font-mono mb-2">SKU: {product.sku}</p>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/60 mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                quips={quips}
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
              />
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-md mx-auto">
          <div className="border-2 border-foreground p-4">
            <h2 className="text-2xl font-heading font-bold text-foreground border-b-8 border-foreground pb-1 mb-2 uppercase tracking-wide">
              Technical Specifications
            </h2>
            <div className="divide-y divide-foreground/20">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between py-1.5">
                  <span className="font-semibold text-foreground text-sm">{spec.label}</span>
                  <span className="text-foreground/70 text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
            {product.disclaimers.length > 0 && (
              <div className="mt-3 border-t border-foreground pt-2 space-y-1">
                {product.disclaimers.map((disclaimer, i) => (
                  <p key={i} className="text-xs text-foreground/40">* {disclaimer}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center mb-8 uppercase tracking-wide">You May Also Endure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                price={p.priceLabel}
                tagline={p.tagline}
                image={p.image}
                quips={quips}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/truegrit/pages/products.tsx src/sites/truegrit/pages/product-detail.tsx
git commit -m "feat(truegrit): add products listing and product detail pages"
```

---

## Task 6: Create The Experience & The Aftermath Pages

**Files:**
- Create: `src/sites/truegrit/pages/the-experience.tsx`
- Create: `src/sites/truegrit/pages/the-aftermath.tsx`

- [ ] **Step 1: Create The Experience page**

Create `src/sites/truegrit/pages/the-experience.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"

export const metadata = {
  title: "The Experience — True Grit Personal Care",
  description: "A journey through the True Grit personal cleansing process. Brace yourself.",
}

export default function TheExperience() {
  return (
    <>
      <Hero
        headline="The Experience"
        subheadline="A four-stage journey toward unprecedented cleanliness."
        image="/sites/truegrit/experience-hero.png"
      />

      {/* Stage 1: Preparation */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Stage 1: Preparation</h2>
          <p className="text-foreground/60 mt-2">The calm before the clean.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/experience-prep-1.png"
        title="Assessing the Situation"
        description="Every True Grit session begins with a moment of reflection. Our users report a range of emotions at this stage: determination, resolve, and a quiet, growing concern that is entirely appropriate."
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/truegrit/experience-prep-2.png"
        title="Reading the Instructions"
        description="We recommend reading the full instructions before your first use. Most customers describe this as 'the last moment of peace.' The instructions are detailed. The warnings are numerous. Both are there for good reason."
        imagePosition="right"
      />

      {/* Stage 2: Application */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Stage 2: Application</h2>
          <p className="text-foreground/60 mt-2">The moment of truth.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/experience-application-1.png"
        title="Initial Contact"
        description="The first application is always memorable. Our focus groups describe it as 'immediate,' 'comprehensive,' and 'a sound I didn't know I could make.' The abrasive surface makes full contact with the target area, initiating what our engineers call 'the cleansing event.'"
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/truegrit/experience-application-2.png"
        title="The Deep Clean"
        description="As the cleaning progresses, users enter what we call 'the zone.' This is characterized by heightened awareness, rapid breathing, and an urgent desire to have purchased the Recovery Balm. This is normal. This is the product working as intended."
        imagePosition="right"
      />

      {/* Stage 3: Realization */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Stage 3: Realization</h2>
          <p className="text-foreground/60 mt-2">The dawning understanding.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/experience-realization-1.png"
        title="The Turning Point"
        description="At approximately the midpoint of the session, users experience what we call 'The Realization.' This is the moment where the full scope of the True Grit commitment becomes apparent. Facial expressions at this stage are remarkably consistent across all test subjects."
        imagePosition="left"
      />

      {/* Stage 4: Acceptance */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Stage 4: Acceptance</h2>
          <p className="text-foreground/60 mt-2">It is done. You are clean. Unquestionably, irrevocably clean.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/experience-acceptance-1.png"
        title="The Aftermath Begins"
        description="The session is complete. Users at this stage report a complex mixture of emotions: relief that it's over, pride in their thoroughness, and a quiet resolve to keep the Recovery Balm closer next time. The cleanliness, however, is undeniable."
        imagePosition="right"
      />

      {/* Bottom Disclaimer */}
      <section className="py-6 px-4 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            * All images depict actual True Grit team members during supervised product testing sessions.
            Facial expressions are genuine and unscripted. No actors were used because no actors would agree to this.
            True Grit Personal Care assumes no responsibility for the emotional impact of viewing these images.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create The Aftermath page**

Create `src/sites/truegrit/pages/the-aftermath.tsx`:

```typescript
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"

export const metadata = {
  title: "The Aftermath — True Grit Personal Care",
  description: "Post-session recovery, testimonials, and proof that it was all worth it. Probably.",
}

export default function TheAftermath() {
  return (
    <>
      <Hero
        headline="The Aftermath"
        subheadline="The clean is undeniable. Everything else is complicated."
        image="/sites/truegrit/aftermath-hero.png"
      />

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 uppercase tracking-wide">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-heading font-bold text-primary">45 min</p>
              <p className="text-foreground/60 text-sm mt-1">Average Recovery Time</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-primary">84%</p>
              <p className="text-foreground/60 text-sm mt-1">Reduction in Bathroom Break Duration</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-primary">73%</p>
              <p className="text-foreground/60 text-sm mt-1">Surprisingly High Repeat Purchase Rate</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-primary">It&apos;s Complex</p>
              <p className="text-foreground/60 text-sm mt-1">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 uppercase tracking-wide">Before &amp; After</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20 mb-4">
                <Image src="/sites/truegrit/aftermath-before.png" alt="Before True Grit" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">Before</h3>
              <p className="text-foreground/60 mt-2">Naive. Optimistic. Blissfully unaware of what &quot;thorough&quot; really means.</p>
            </div>
            <div className="text-center">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20 mb-4">
                <Image src="/sites/truegrit/aftermath-after.png" alt="After True Grit" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">After</h3>
              <p className="text-foreground/60 mt-2">Changed. Enlightened. Thoroughly, unquestionably clean. The eyes tell the story.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Tips */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 uppercase tracking-wide">Recovery Protocol</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xl shrink-0">1</div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Apply Recovery Balm</h3>
                <p className="text-foreground/60 mt-1">Immediately. Do not pass go. Do not collect $200. Apply the Recovery Balm the moment the session concludes. Then apply it again. You&apos;ll know when to stop. (You won&apos;t want to stop.)</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xl shrink-0">2</div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Reflect on Your Choices</h3>
                <p className="text-foreground/60 mt-1">This is an important step. Sit quietly — carefully — and consider the sequence of life decisions that brought you to this moment. This is what our therapist consultants call &quot;the growth window.&quot;</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xl shrink-0">3</div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Repeat</h3>
                <p className="text-foreground/60 mt-1">Because you will. 73% of our customers come back. We&apos;re not sure if it&apos;s the cleanliness, the character building, or something else entirely. But they come back.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Use Testimonials */}
      <TestimonialGrid
        title="Post-Session Testimonials"
        testimonials={[
          { quote: "I've never been cleaner. I've also never been more concerned about being clean.", author: "First-Time User" },
          { quote: "The 24-grit changed me as a person. I mean that in every possible way.", author: "Deeply Affected Customer" },
          { quote: "I now understand why the Recovery Balm exists. I also understand why it comes in a 32 oz size.", author: "24-Grit Survivor" },
          { quote: "My coworkers asked why I walked differently for a week. I told them it was a new fitness routine.", author: "Creative Excuse Maker" },
        ]}
      />

      <CTABanner
        headline="Ready to Experience It Yourself?"
        description="The clean you didn't know you needed. The journey you won't forget."
        ctaText="Shop Products"
        ctaHref="/products"
      />
    </>
  )
}
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/truegrit/pages/the-experience.tsx src/sites/truegrit/pages/the-aftermath.tsx
git commit -m "feat(truegrit): add The Experience and The Aftermath pages"
```

---

## Task 7: Create Behind the Scenes & About Pages

**Files:**
- Create: `src/sites/truegrit/pages/behind-the-scenes.tsx`
- Create: `src/sites/truegrit/pages/about.tsx`

- [ ] **Step 1: Create Behind the Scenes page**

Create `src/sites/truegrit/pages/behind-the-scenes.tsx`:

```typescript
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"

export const metadata = {
  title: "Behind the Scenes — True Grit Personal Care",
  description: "A look inside our state-of-the-art manufacturing facility.",
}

export default function BehindTheScenes() {
  return (
    <>
      <Hero
        headline="Behind the Scenes"
        subheadline="A look inside the facility where comfort goes to meet its match."
        image="/sites/truegrit/bts-hero.png"
      />

      {/* The Manufacturing Process */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">The Manufacturing Process</h2>
          <p className="text-foreground/60 mt-2">From raw abrasive to personal care product in just 47 carefully supervised steps.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/bts-sandblaster.png"
        title="Raw Material Processing"
        description="Our aluminum oxide abrasive arrives in industrial drums from certified quarries. Each batch is tested for grit consistency using equipment originally designed for automotive paint stripping. Our quality team has adapted it for personal care applications with only minor modifications."
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/truegrit/bts-belt-sander.png"
        title="Precision Cutting"
        description="Each sheet is cut to exact specifications using industrial belt sanders repurposed as cutting stations. Our operators — who have all signed extensive NDAs and liability waivers — handle each sheet with the care and quiet resignation of people who know exactly what this product is for."
        imagePosition="right"
      />

      <ImageTextSection
        image="/sites/truegrit/bts-grinding.png"
        title="Quality Control"
        description="Every roll undergoes rigorous testing. Grit density is measured with calipers. Tensile strength is verified on equipment borrowed from a nearby construction site. And the 'comfort test'... well, we've had some turnover in that department."
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/truegrit/bts-packaging.png"
        title="Packaging & Shipping"
        description="Finished rolls are packaged in our signature industrial packaging, complete with safety data sheet and the disclaimer insert that our lawyers insist on. Each box is sealed with a sticker that reads 'Handle With Confidence.' The workers who apply these stickers have been observed smirking."
        imagePosition="right"
      />

      {/* Our Facility */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 -z-10">
          <Image src="/sites/truegrit/bts-facility.png" alt="" fill className="object-cover brightness-50" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-3xl font-heading font-bold text-white leading-relaxed">
            Our 15,000 sq ft facility features industrial-grade manufacturing equipment, a testing laboratory,
            and a break room with a first aid station that sees more use than average.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-6">
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            Non-GMO Certified
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            Free Range Abrasives
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            OSHA Pending Review
          </span>
        </div>
      </section>

      {/* Bottom Disclaimer */}
      <section className="py-6 px-4 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            * Facility tours are not available to the public due to insurance restrictions. The workers pictured have consented
            to appear in these images and have been compensated with premium health insurance, which they report using frequently.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create About / Leadership page**

Create `src/sites/truegrit/pages/about.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"
import { Timeline } from "@/components/ui/timeline"
import { TeamMember } from "@/components/ui/team-member"

export const metadata = {
  title: "About — True Grit Personal Care",
  description: "The story of how one man's renovation project became an industrial hygiene revolution.",
}

const timelineItems = [
  { year: "2020", description: "Bill uses sandpaper to clean a stubborn stain in his bathroom. Has an idea he immediately regrets." },
  { year: "2021", description: "First prototype. First test. First application of what would become the Recovery Balm." },
  { year: "2022", description: "Recruits Jim, Brandon, and Sean. All of them had follow-up questions." },
  { year: "2023", description: "Leases manufacturing facility. Landlord asks 'for what?' twice." },
  { year: "2024", description: "Launches online store. First customer buys Recovery Balm only." },
  { year: "2025", description: "Introduces the AcidJet Bidet 3000 over unanimous legal objection." },
  { year: "2026", description: "Named 'Most Alarming Personal Care Brand' by an industry blog that asked to remain anonymous." },
]

const teamMembers = [
  {
    name: "Bill",
    title: "Founder & Chief Abrasion Officer",
    image: "/sites/truegrit/team-bill.png",
    bio: "Saw a gap in the market while renovating his bathroom. 'What if the thing that cleans surfaces could clean ALL surfaces?' he asked. No one answered, but he built a company anyway.",
  },
  {
    name: "Jim",
    title: "VP of Grit Sciences",
    image: "/sites/truegrit/team-jim.png",
    bio: "Former materials engineer with a specialty in industrial abrasives. Joined True Grit after Bill described the vision. Jim's expression during that conversation has not changed since.",
  },
  {
    name: "Brandon",
    title: "Director of Consumer Endurance",
    image: "/sites/truegrit/team-brandon.png",
    bio: "Oversees the customer experience from first contact through recovery. Interprets complaint letters as 'testimonials of effectiveness.' Has a wall of them.",
  },
  {
    name: "Sean",
    title: "Head of Industrial Relations",
    image: "/sites/truegrit/team-sean.png",
    bio: "Bridges the gap between the construction industry and personal hygiene. Negotiates bulk abrasive contracts with suppliers who always ask what it's for. Sean has learned not to answer.",
  },
]

export default function TrueGritAbout() {
  return (
    <>
      <Hero
        headline="About True Grit"
        subheadline="The story of how one man's renovation project became an industrial hygiene revolution."
      />

      {/* Origin Story */}
      <ImageTextSection
        image="/sites/truegrit/about-origin.png"
        imageClassName="object-cover object-top"
        imageAspect="aspect-square"
        title="How It All Started"
        description={
          "In the summer of 2020, Bill was renovating his bathroom when he reached for a roll of toilet paper and grabbed a sheet of 40-grit sandpaper instead. " +
          "What happened next was unpleasant, but it was also — and Bill will insist on this point — undeniably thorough.\n\n" +
          "Rather than file the experience under 'never again,' Bill did what every great entrepreneur does: " +
          "he wondered if he could sell it. His wife suggested therapy. His friends suggested he was joking. " +
          "Bill was not joking. Bill is never joking.\n\n" +
          "Two years, three co-founders, and one very patient legal team later, True Grit Personal Care was born. " +
          "Our mission is simple: to deliver a level of cleanliness that conventional toilet paper can only dream of. " +
          "The fact that this comes with some discomfort is, in Bill's words, 'a feature, not a bug.'"
        }
      />

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Company Timeline</h2>
        </div>
        <Timeline items={timelineItems} />
      </section>

      {/* Leadership */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-4 uppercase tracking-wide">
            Leadership Team
          </h2>
          <p className="text-center text-foreground/60 mb-12">
            Four people who could be doing anything else but chose this.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
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

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/truegrit/pages/behind-the-scenes.tsx src/sites/truegrit/pages/about.tsx
git commit -m "feat(truegrit): add Behind the Scenes and About pages"
```

---

## Task 8: Create Cart & Checkout Pages

**Files:**
- Create: `src/sites/truegrit/pages/cart.tsx`
- Create: `src/sites/truegrit/pages/checkout.tsx`

- [ ] **Step 1: Create the cart page**

Create `src/sites/truegrit/pages/cart.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/truegrit/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const ABRASION_SURCHARGE = 3.49
const INDUSTRIAL_HYGIENE_TAX_RATE = 0.04

export const metadata = {
  title: "Your Cart — True Grit Personal Care",
  description: "Review your order. We admire your courage.",
}

export default function TrueGritCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const hygieneTax = subtotal * INDUSTRIAL_HYGIENE_TAX_RATE
  const total = subtotal + ABRASION_SURCHARGE + hygieneTax

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Your Cart</h1>
          <p className="text-foreground/60 mb-8">
            Your cart is as smooth as your life is about to not be.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse Products
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
                <Link href={siteHref(`/products/${slug}`)} className="font-heading font-semibold text-primary hover:underline">
                  {product.name}
                </Link>
                <p className="text-foreground/60 text-sm">{product.priceLabel}</p>
                <p className="text-foreground/40 text-xs font-mono">SKU: {product.sku}</p>
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
              <span>Abrasion Surcharge</span>
              <span>${ABRASION_SURCHARGE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Industrial Hygiene Tax (4.0%)</span>
              <span>${hygieneTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-primary/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-xs text-foreground/40 mt-4 text-right">
            * By proceeding to checkout you acknowledge that True Grit Personal Care assumes no liability for how you use our products.
          </p>
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

- [ ] **Step 2: Create the checkout page**

Create `src/sites/truegrit/pages/checkout.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function TrueGritCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image src="/sites/truegrit/checkout-construction.png" alt="Construction worker with sandpaper" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          You&apos;re Braver Than Most
        </h1>
        <p className="text-foreground/70 mb-4">
          Our fulfillment team is preparing your order with the same care and precision we apply to our
          products. Which is to say: thoroughly, and with full awareness of what you&apos;re about to experience.
        </p>
        <p className="text-foreground/50 text-sm mb-8">
          Please verify that your health insurance is current and that your policy covers
          &quot;voluntary industrial abrasion.&quot; Most don&apos;t, but it never hurts to check.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-4">
          Estimated delivery: 3-5 business days (recovery time not included)
        </p>
        <p className="text-foreground/40 text-xs mb-8">
          * Double-check your shipping address. Our return policy is &quot;we understand,&quot;
          but we don&apos;t actually accept returns. The product has done nothing wrong.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Shopping (If You Dare)
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/truegrit/pages/cart.tsx src/sites/truegrit/pages/checkout.tsx
git commit -m "feat(truegrit): add cart and checkout pages with custom messaging"
```

---

## Task 9: Create Privacy Policy & Terms Pages

**Files:**
- Create: `src/sites/truegrit/pages/privacy.tsx`
- Create: `src/sites/truegrit/pages/terms.tsx`

- [ ] **Step 1: Create the privacy policy page**

Create `src/sites/truegrit/pages/privacy.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — True Grit Personal Care",
  description: "Our privacy policy. We handle your data with the same thoroughness we apply to personal hygiene.",
}

export default function TrueGritPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="We handle your data like we handle everything: thoroughly and without mercy."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: When you weren&apos;t looking. Grit level: Coarse.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Data Collection</h2>
          <p>
            By visiting this website, you agree that we collect your browsing data, purchase history,
            grit preferences, and the approximate duration of your bathroom visits (for research purposes).
            We also collect the audio levels detected from your device during product use, though we promise
            we only use this data to improve our products and occasionally to settle internal bets.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. How We Use Your Data</h2>
          <p>
            We use your data to recommend appropriate grit levels, suggest Recovery Balm quantities based on your
            purchase patterns, and to generate the anonymized statistics on our Aftermath page. If you&apos;re one of the
            73% who made a repeat purchase, your data contributed to that figure. You know who you are.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Data Sharing</h2>
          <p>
            We share your data with our abrasive material suppliers (for quality matching), our insurance
            underwriter (who has questions), and our legal team (who has concerns). We do not sell your data
            to third parties. Mainly because no third party has asked. The product descriptions tend to
            discourage inquiries.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Cookies</h2>
          <p>
            This website uses cookies that track your browsing behavior with the same persistence our
            products track your skin cells. They cannot be removed easily. Unlike our products, cookies
            are painless. Consider them the gentle part of the True Grit experience.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Your Rights</h2>
          <p>
            You have the right to request your data. You have the right to request its deletion.
            You have the right to an attorney, though that seems excessive for a toilet paper website.
            Exercise any of these rights by mailing a written request to our facility. The workers
            will read it during their break. They could use a laugh.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Security</h2>
          <p>
            Your data is stored on servers protected by the same industrial-grade materials we use in
            our products. This is not a metaphor. The server room is literally reinforced with sandpaper.
            It seemed thematic. Our IT department disagrees but has learned to pick their battles.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Changes to This Policy</h2>
          <p>
            We reserve the right to change this policy with the same lack of warning our products
            provide during first use. If you don&apos;t like it, you are welcome to stop buying sandpaper
            toilet paper. But the data stays. Like the memory of your first 40-grit session, it stays.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create the terms of use page**

Create `src/sites/truegrit/pages/terms.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — True Grit Personal Care",
  description: "Our terms of use. By reading this, you've already agreed. And we're already not liable.",
}

export default function TrueGritTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By reading this sentence, you acknowledge that 'comfort' is a relative term."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Effective: The moment you thought about sandpaper toilet paper. Expires: Never. Like the memories.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By visiting this website, purchasing our products, or simply being aware that sandpaper toilet
            paper exists as a concept, you agree to be bound by these terms. Closing this tab does not
            constitute disagreement. Telling your friends about this website in disbelief constitutes
            marketing on our behalf, and we thank you.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Limitation of Liability</h2>
          <p>
            True Grit Personal Care is not liable for anything. Not for the abrasion (that&apos;s the product
            working), not for the bleeding (minor and expected), not for the crying (normal), not for the
            emotional journey (character building), and especially not for the AcidJet Bidet 3000 (you
            signed a 47-page waiver, and we meant every page of it).
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Product Disclaimers</h2>
          <p>
            Our products are exactly what they say they are: sandpaper, formatted for personal use.
            If you expected them to feel like conventional toilet paper, we admire your optimism.
            The terms &quot;gentle,&quot; &quot;sensitive,&quot; and &quot;comfortable&quot; are used
            exclusively in a relative, comparative sense. Relative to what? The 24-grit. Everything
            is gentle relative to the 24-grit.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Assumption of Risk</h2>
          <p>
            By purchasing any True Grit product, you assume all risk associated with applying industrial
            abrasives to your person. This includes but is not limited to: surface irritation, extended
            recovery periods, awkward conversations with your healthcare provider, and the inability to
            sit comfortably in meetings for a period that varies by grit selection.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Return Policy</h2>
          <p>
            We understand. We really do. But we cannot accept returns on opened products for reasons that
            should be self-evident. Unopened products may be returned within 30 days for a full refund,
            though the fact that you opened the box, looked at it, and sealed it back up tells us everything
            we need to know about your experience.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            Any disputes shall be resolved by binding arbitration conducted in our manufacturing facility.
            The arbitrator will be selected from our warehouse staff, all of whom have used the product
            and have strong, informed opinions. Their decision is final. Protective equipment will be
            provided for all parties during the proceedings.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of common sense, which we acknowledge we are testing
            the boundaries of. In the event of a legal challenge, we defer to the jurisdiction of
            wherever our founder Bill currently is, which is usually the workshop, looking concerned.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/truegrit/pages/privacy.tsx src/sites/truegrit/pages/terms.tsx
git commit -m "feat(truegrit): add privacy policy and terms of use pages"
```

---

## Task 10: Create Barrel Export & Register Site

**Files:**
- Create: `src/sites/truegrit/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create the barrel export**

Create `src/sites/truegrit/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import TrueGritHome from "./pages/home"
import TrueGritProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import TheExperience, { metadata as experienceMetadata } from "./pages/the-experience"
import TheAftermath, { metadata as aftermathMetadata } from "./pages/the-aftermath"
import BehindTheScenes, { metadata as btsMetadata } from "./pages/behind-the-scenes"
import TrueGritAbout, { metadata as aboutMetadata } from "./pages/about"
import TrueGritCart from "./pages/cart"
import TrueGritCheckout from "./pages/checkout"
import TrueGritPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import TrueGritTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": TrueGritHome,
  "products": { component: TrueGritProducts, metadata: productsMetadata },
  "the-experience": { component: TheExperience, metadata: experienceMetadata },
  "the-aftermath": { component: TheAftermath, metadata: aftermathMetadata },
  "behind-the-scenes": { component: BehindTheScenes, metadata: btsMetadata },
  "about": { component: TrueGritAbout, metadata: aboutMetadata },
  "cart": TrueGritCart,
  "checkout": TrueGritCheckout,
  "privacy": { component: TrueGritPrivacy, metadata: privacyMetadata },
  "terms": { component: TrueGritTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — True Grit Personal Care`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 2: Register in the site registry**

In `src/sites/registry.ts`, add the import:

```typescript
import { config as truegritConfig, pages as truegritPages, dynamicRoutes as truegritDynamicRoutes } from "./truegrit"
```

And add to the `siteRegistry` object:

```typescript
truegrit: { config: truegritConfig, pages: truegritPages, dynamicRoutes: truegritDynamicRoutes },
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Verify the site loads in dev**

Run: `npm run dev`
Visit: `http://localhost:3000/?site=truegrit`
Expected: Homepage renders with Hero, product grid, testimonials, and disclaimer footer. Orange theme, Barlow Condensed headings.

Visit: `http://localhost:3000/products?site=truegrit`
Expected: Product listing page with all 8 products.

Visit: `http://localhost:3000/products/original-40-grit?site=truegrit`
Expected: Product detail page with specs and disclaimers.

- [ ] **Step 5: Commit**

```bash
git add src/sites/truegrit/index.ts src/sites/registry.ts
git commit -m "feat(truegrit): register site and wire up all routes"
```

---

## Task 11: Generate Images

**Files:**
- Create: `public/sites/truegrit/` (all generated images)

This task uses the image-gen MCP server to generate all images. Run each image generation call sequentially. All person images must specify that the person looks **concerned**.

- [ ] **Step 1: Create the public directory**

```bash
mkdir -p public/sites/truegrit
```

- [ ] **Step 2: Generate favicon**

Use `generate_image` tool:
- Prompt: "A toilet paper roll made of sandpaper, rough brown texture with visible grit, simple icon style on white background, hardware store product photography"
- Size: 1024x1024
- Save to: `public/sites/truegrit/favicon.png`

- [ ] **Step 3: Generate hero background**

Use `generate_image` tool:
- Prompt: "Close-up dramatic photo of rough sandpaper texture, warm industrial lighting, shallow depth of field, orange-tinted lighting, hardware store aesthetic"
- Size: 1536x1024
- Save to: `public/sites/truegrit/hero.png`

- [ ] **Step 4: Generate product images (8 total)**

Use `generate_image` for each:

1. **Original 40-Grit**: "A roll of toilet paper made from brown sandpaper, 40-grit rough texture visible, product photography on clean white background, hardware store catalog style" → `product-original-40.png`
2. **80-Grit Sensitive**: "A roll of toilet paper made from finer sandpaper, slightly smoother texture, product photography on clean white background, labeled 'sensitive', hardware store catalog" → `product-80-grit.png`
3. **24-Grit Deep Clean**: "A roll of toilet paper made from very coarse sandpaper, rough aggressive texture visible, product photography on clean white background, hardware store catalog" → `product-24-grit.png`
4. **40-Grit Hand Towels**: "A pack of folded brown sandpaper hand towels, C-fold dispenser style, product photography on clean white background, industrial supply catalog" → `product-hand-towels.png`
5. **HydroBlast 500**: "A sleek wall-mounted bidet with industrial pressure gauge showing 500 PSI, brass nozzle, reinforced steel supply line, product photography on clean white background" → `product-hydroblast.png`
6. **AcidJet Bidet 3000**: "A wall-mounted bidet with attached chemical reservoir tank, hazard symbols on the reservoir, safety goggles hanging from it, product photography on clean white background" → `product-acidjet.png`
7. **Recovery Balm**: "A jar of soothing cream/balm with simple industrial label, medicinal green/white packaging, product photography on clean white background" → `product-recovery-balm.png`
8. **Starter Kit**: "A gift box containing three rolls of sandpaper toilet paper in different grits and a jar of balm, open box product photography on clean white background" → `product-starter-kit.png`

All 1024x1024, saved to `public/sites/truegrit/`.

- [ ] **Step 5: Generate setting images (3 total)**

Use `generate_image`:

1. "Sandpaper toilet paper roll displayed in a luxurious corporate executive bathroom, marble counters, modern fixtures, the roll looks out of place" → `setting-exec-bathroom.png` (1536x1024)
2. "Sandpaper toilet paper roll in a beautiful modern home bathroom, clean white tiles, the rough brown roll contrasts with the elegant setting" → `setting-home-bathroom.png` (1536x1024)
3. "Sandpaper toilet paper roll inside a construction site portable toilet/portapotty, gritty realistic setting, the product fits right in" → `setting-portapotty.png` (1536x1024)

- [ ] **Step 6: Generate Experience page images**

Use `generate_image_with_person` for each. **All subjects must look concerned.**

1. Bill examining a sandpaper toilet paper roll with concern, nice bathroom setting → `experience-prep-1.png`
2. Jim reading product instructions with growing concern, bathroom setting → `experience-prep-2.png`
3. Brandon mid-use looking deeply concerned, implied bathroom setting (tasteful) → `experience-application-1.png`
4. Sean looking alarmed, implied bathroom setting → `experience-application-2.png`
5. Bill with dawning realization expression, concerned → `experience-realization-1.png`
6. Jim looking resigned but clean, concerned → `experience-acceptance-1.png`
7. Experience hero image — all four guys standing near a bathroom door looking concerned → `experience-hero.png`

All 1024x1024 with person specified.

- [ ] **Step 7: Generate Aftermath page images**

Use `generate_image_with_person`:

1. Bill looking naive and happy (before photo) → `aftermath-before.png` (1024x1024)
2. Bill looking shell-shocked but clean and concerned (after photo) → `aftermath-after.png` (1024x1024)
3. Aftermath hero — warehouse setting with concerned team → `aftermath-hero.png` (1536x1024)

- [ ] **Step 8: Generate Behind the Scenes images**

Use `generate_image`:

1. "Industrial sandblasting machine in a warehouse, workers in safety gear smirking knowingly, warm lighting" → `bts-sandblaster.png`
2. "Industrial belt sander cutting station in factory, worker smirking, orange safety vest" → `bts-belt-sander.png`
3. "Industrial grinding equipment in factory, quality control station, workers smirking" → `bts-grinding.png`
4. "Packaging station in industrial warehouse, boxes with sandpaper products, workers smirking" → `bts-packaging.png`
5. "Wide shot of industrial warehouse facility interior, machinery, warm lighting" → `bts-facility.png`
6. "Industrial warehouse hero shot, dramatic lighting, sandpaper manufacturing equipment" → `bts-hero.png`

All 1536x1024.

- [ ] **Step 9: Generate Leadership portraits**

Use `generate_image_with_person` for each. **All must look concerned and wear flannel.**

1. Bill — "Professional headshot, man wearing flannel shirt, looking concerned, workshop/industrial background, warm lighting" → `team-bill.png`
2. Jim — "Professional headshot, man wearing flannel shirt, looking concerned, laboratory/workshop background" → `team-jim.png`
3. Brandon — "Professional headshot, man wearing flannel shirt, looking concerned, office with industrial decor" → `team-brandon.png`
4. Sean — "Professional headshot, man wearing flannel shirt, looking concerned, warehouse background" → `team-sean.png`

All 1024x1024.

- [ ] **Step 10: Generate checkout construction image**

Use `generate_image`:
- "A construction worker looking at sandpaper toilet paper products with a bemused expression, hard hat, safety vest, workshop setting" → `checkout-construction.png` (1024x1024)

- [ ] **Step 11: Generate About page origin image**

Use `generate_image_with_person` (Bill):
- "Man in a half-renovated bathroom looking at a piece of sandpaper with a lightbulb moment expression but also concern, renovation tools around" → `about-origin.png` (1024x1024)

- [ ] **Step 12: Commit all images**

```bash
git add public/sites/truegrit/
git commit -m "feat(truegrit): add all generated images"
```

---

## Task 12: Update Apex Registry (if needed)

**Files:**
- Check: `src/sites/apex/pages/home.tsx`

- [ ] **Step 1: Check if apex homepage auto-discovers sites from registry**

Read `src/sites/apex/pages/home.tsx` and check if the brand grid is hardcoded or reads from the registry.

- If it reads from the registry: no changes needed, truegrit will appear automatically.
- If it's hardcoded: add a True Grit card with the orange color, appropriate description, and link to `truegrit.specificindustries.com`.

- [ ] **Step 2: Commit if changes were needed**

```bash
git add src/sites/apex/pages/home.tsx
git commit -m "feat(apex): add True Grit to brand registry"
```

---

## Task 13: Final Verification

- [ ] **Step 1: Run type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 3: Test all pages in browser**

Run: `npm run dev`

Test each page:
- `http://localhost:3000/?site=truegrit` — Homepage
- `http://localhost:3000/products?site=truegrit` — Products
- `http://localhost:3000/products/original-40-grit?site=truegrit` — Product detail
- `http://localhost:3000/the-experience?site=truegrit` — The Experience
- `http://localhost:3000/the-aftermath?site=truegrit` — The Aftermath
- `http://localhost:3000/behind-the-scenes?site=truegrit` — Behind the Scenes
- `http://localhost:3000/about?site=truegrit` — About
- `http://localhost:3000/cart?site=truegrit` — Cart (empty state)
- `http://localhost:3000/checkout?site=truegrit` — Checkout
- `http://localhost:3000/privacy?site=truegrit` — Privacy
- `http://localhost:3000/terms?site=truegrit` — Terms

Verify:
- Orange theme with Barlow Condensed headings
- Images load correctly
- Add to cart shows True Grit-specific quips (not pig references)
- Cart page shows Abrasion Surcharge and Industrial Hygiene Tax
- All navigation links work
- Dynamic product routes work

- [ ] **Step 4: Test production build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix(truegrit): address final verification issues"
```
