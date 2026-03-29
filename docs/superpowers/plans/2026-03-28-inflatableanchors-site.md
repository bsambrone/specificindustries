# Inflatable Anchors Co. — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full satirical commerce site for inflatableanchors.specificindustries.com with 14 products, 10+ pages, and a new CustomerStory shared component.

**Architecture:** New site module at `src/sites/inflatableanchors/` following the identical pattern to `dehydratedwater` — config, barrel export, data file, and page components. Registers in the existing `siteRegistry`. Uses the existing commerce system, shared UI components, and theme system. One new shared component (`CustomerStory`).

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, React Context (cart)

**Spec:** `docs/superpowers/specs/2026-03-28-inflatableanchors-site-design.md`
**Image Manifest:** `docs/superpowers/specs/2026-03-28-inflatableanchors-images.md`

---

### Task 1: Site Config & Registration

**Files:**
- Create: `src/sites/inflatableanchors/config.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create `src/sites/inflatableanchors/config.ts`**

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Inflatable Anchors Co.",
  subdomain: "inflatableanchors",
  theme: {
    preset: "nautical",
    colors: {
      primary: "#F57C00",
      secondary: "#FFFDE7",
      accent: "#0D47A1",
      background: "#FAFAFA",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "poppins",
      body: "inter",
    },
  },
  metadata: {
    title: "Inflatable Anchors Co. — The Easiest Anchor You'll Ever Pull Up",
    description:
      "Revolutionary inflatable anchors for the modern boater. Lightweight, portable, and effortlessly retrievable.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "The Technology", path: "/the-technology" },
    { label: "Customer Stories", path: "/customer-stories" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create minimal barrel export at `src/sites/inflatableanchors/index.ts`**

Start with just the config and an empty pages map — we'll fill in pages as we build them:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"

export { config }

export const pages: Record<string, PageEntry> = {
  "": () => null, // placeholder — replaced in Task 4
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
```

- [ ] **Step 3: Register in `src/sites/registry.ts`**

Add import and registry entry. Follow the existing pattern — add after the dehydratedwater import:

```typescript
import { config as inflatableanchorsConfig, pages as inflatableanchorsPages, dynamicRoutes as inflatableanchorsDynamicRoutes } from "./inflatableanchors"
```

Add to the `siteRegistry` object:

```typescript
inflatableanchors: { config: inflatableanchorsConfig, pages: inflatableanchorsPages, dynamicRoutes: inflatableanchorsDynamicRoutes },
```

- [ ] **Step 4: Verify the site loads**

Run: `npm run dev`

Visit: `http://localhost:3000/?site=inflatableanchors`

Expected: Page loads with orange theme, header shows navigation items, body is empty (placeholder component). No errors in console.

- [ ] **Step 5: Run type check**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 6: Commit**

```bash
git add src/sites/inflatableanchors/config.ts src/sites/inflatableanchors/index.ts src/sites/registry.ts
git commit -m "feat(inflatableanchors): add site config and registry entry"
```

---

### Task 2: Product Data

**Files:**
- Create: `src/sites/inflatableanchors/data/products.ts`

- [ ] **Step 1: Create `src/sites/inflatableanchors/data/products.ts`**

Define the Product interface (uses `specs` instead of `scienceFacts` or `nutritionalFacts`) and all 14 products:

```typescript
export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  category: "standard" | "premium" | "accessories"
  specs: Array<{ label: string; value: string }>
}

export const products: Product[] = [
  // === STANDARD ANCHORS ===
  {
    slug: "original",
    name: "The Original",
    price: 29.99,
    priceLabel: "$29.99",
    tagline: "Just inflate, drop, and hope for the best.",
    description: [
      "The anchor that started a revolution in not holding boats in place. When Captain Chuck Denton first inflated a vinyl anchor shape and tossed it overboard in 2019, his boat drifted approximately 200 yards before he noticed. He called it a success.",
      "Each Original is hand-inspected by our quality team to ensure it inflates fully, holds air for a reasonable amount of time, and looks convincingly anchor-shaped from a distance. We stand behind our product, mostly because it floats away if we stand in front of it.",
      "Comes with a hand pump (sold separately), 50ft of marine-grade rope, and a laminated quick-start guide that says 'Inflate. Drop. Hope.'"
    ],
    image: "/sites/inflatableanchors/product-original.png",
    category: "standard",
    specs: [
      { label: "Weight", value: "4 oz (inflated)" },
      { label: "Material", value: "Marine-grade vinyl" },
      { label: "Inflation Time", value: "47 pumps (~2 min)" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Holding Power", value: "Subjective" },
      { label: "Color", value: "Safety Orange" },
    ],
  },
  {
    slug: "ez-drop",
    name: "The EZ-Drop",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "Arrives pre-inflated. Ready to not hold your boat in place.",
    description: [
      "Why waste precious dock time inflating your anchor when you could be not anchoring immediately? The EZ-Drop ships fully inflated in an oversized box that will confuse your mail carrier and delight your neighbors.",
      "Our engineers solved one of boating's greatest non-problems: the 2-minute inflation window. Now you can go from box to water in under 30 seconds, which is approximately 29 seconds longer than the anchor will stay where you put it.",
      "Note: Due to pre-inflation, shipping costs may be higher than the anchor itself. We consider this a feature of the premium experience."
    ],
    image: "/sites/inflatableanchors/product-ez-drop.png",
    category: "standard",
    specs: [
      { label: "Weight", value: "4 oz (always inflated)" },
      { label: "Material", value: "Marine-grade vinyl" },
      { label: "Inflation Time", value: "0 min (pre-inflated)" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Holding Power", value: "Subjective" },
      { label: "Shipping Box Size", value: "Comically Large" },
    ],
  },
  {
    slug: "weekender-mini",
    name: "The Weekender Mini",
    price: 19.99,
    priceLabel: "$19.99",
    tagline: "Perfect for kayaks, canoes, and people who don't really need an anchor anyway.",
    description: [
      "Meet the anchor for people who are honest about their anchoring needs. The Weekender Mini fits in a backpack, weighs less than your phone, and performs about as well as an anchor as your phone does.",
      "Designed for casual boaters, kayakers, and anyone who wants to feel like they have an anchor without the commitment of actually anchoring anything. It's the participation trophy of marine equipment.",
      "Perfect for lakes, ponds, bathtubs, and any body of water where drifting is more of a lifestyle choice than a problem."
    ],
    image: "/sites/inflatableanchors/product-weekender-mini.png",
    category: "standard",
    specs: [
      { label: "Weight", value: "2 oz (inflated)" },
      { label: "Material", value: "Lightweight vinyl" },
      { label: "Inflation Time", value: "23 pumps (~1 min)" },
      { label: "Buoyancy Rating", value: "Very High" },
      { label: "Holding Power", value: "Decorative" },
      { label: "Fits In", value: "Backpack, glove box, pocket" },
    ],
  },
  {
    slug: "heavy-duty-pro",
    name: "The Heavy Duty Pro",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "Double air chambers. Extra-thick vinyl. Still weighs 4 oz.",
    description: [
      "For the serious boater who demands the most from their inflatable anchor. The Heavy Duty Pro features double-wall construction, reinforced seams, and two independent air chambers for what we call 'redundant buoyancy.'",
      "If one chamber fails, the other keeps your anchor floating proudly on the surface. If both chambers fail, you have a piece of vinyl and a lesson about expectations. Either way, retrieval remains effortless.",
      "The PRO in the name stands for 'Professionally Redundant Option.' Our most popular model among customers who want to feel like they bought the good one."
    ],
    image: "/sites/inflatableanchors/product-heavy-duty-pro.png",
    category: "standard",
    specs: [
      { label: "Weight", value: "4 oz (double-chambered)" },
      { label: "Material", value: "Extra-thick marine vinyl" },
      { label: "Inflation Time", value: "94 pumps (~4 min)" },
      { label: "Air Chambers", value: "2 (redundant)" },
      { label: "Buoyancy Rating", value: "Maximum" },
      { label: "Holding Power", value: "Confidently Subjective" },
    ],
  },
  // === PREMIUM LINE ===
  {
    slug: "captains-choice",
    name: "The Captain's Choice",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "Leather-look vinyl with brass-colored valve. For the discerning captain.",
    description: [
      "Not all inflatable anchors are created equal. Some are orange. This one is brown and looks like leather. For the captain who believes that aesthetics matter more than function — and in this product category, aesthetics are literally all that matters.",
      "The Captain's Choice features a premium leather-look vinyl exterior, a brass-colored inflation valve that catches the sunlight beautifully, and arrives in a presentation gift box suitable for birthdays, retirements, and passive-aggressive boat-warming gifts.",
      "Pairs well with a captain's hat, a glass of whiskey, and the quiet acceptance that your anchor is floating."
    ],
    image: "/sites/inflatableanchors/product-captains-choice.png",
    category: "premium",
    specs: [
      { label: "Weight", value: "5 oz (inflated)" },
      { label: "Material", value: "Leather-look premium vinyl" },
      { label: "Valve", value: "Brass-colored (not actual brass)" },
      { label: "Buoyancy Rating", value: "Extreme (with style)" },
      { label: "Holding Power", value: "Aesthetic" },
      { label: "Gift Box", value: "Included" },
    ],
  },
  {
    slug: "deep-sea-deluxe",
    name: "The Deep Sea Deluxe",
    price: 59.99,
    priceLabel: "$59.99",
    tagline: "Comes with 200ft of rope. Because depth shouldn't limit your ambition.",
    description: [
      "Most inflatable anchors come with 50 feet of rope. The Deep Sea Deluxe comes with 200 feet, because we believe that the distance between your boat and your floating anchor should be limited only by your imagination.",
      "Designed for deep water applications where a traditional anchor would need to actually reach the bottom. Ours doesn't need to reach the bottom. Ours doesn't try. The extra rope just means your anchor can float further from your boat, which some customers describe as 'peaceful.'",
      "Also popular among customers who enjoy the meditative act of coiling 200 feet of wet rope back onto their boat."
    ],
    image: "/sites/inflatableanchors/product-deep-sea-deluxe.png",
    category: "premium",
    specs: [
      { label: "Weight", value: "4 oz (anchor) + 8 lbs (rope)" },
      { label: "Material", value: "Marine-grade vinyl" },
      { label: "Rope Length", value: "200 ft marine-grade" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Holding Power", value: "Rope-dependent" },
      { label: "Maximum Depth", value: "Unlimited (anchor stays on surface)" },
    ],
  },
  {
    slug: "night-rider",
    name: "The Night Rider (Glow Edition)",
    price: 54.99,
    priceLabel: "$54.99",
    tagline: "UV-reactive. Watch it float away even at night.",
    description: [
      "Nighttime anchoring presents unique challenges, chief among them: you can't see your anchor not working. The Night Rider solves this with UV-reactive vinyl that glows an eerie green in low light conditions.",
      "Now you can watch your anchor drift away in real time, 24 hours a day. Several customers have reported that the glow is 'oddly soothing' and 'like a nightlight for the ocean.' One customer called it 'haunting.' We put that on the box.",
      "Charges in direct sunlight during the day, glows for up to 4 hours after dark. Perfect for evening anchoring sessions, night fishing, or confusing nearby boaters."
    ],
    image: "/sites/inflatableanchors/product-night-rider.png",
    category: "premium",
    specs: [
      { label: "Weight", value: "4 oz (inflated)" },
      { label: "Material", value: "UV-reactive marine vinyl" },
      { label: "Glow Duration", value: "Up to 4 hours" },
      { label: "Charge Time", value: "2 hours direct sunlight" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Visibility", value: "Hauntingly Good" },
    ],
  },
  {
    slug: "stealth",
    name: "The Stealth (Camo Edition)",
    price: 54.99,
    priceLabel: "$54.99",
    tagline: "Perfect for when you don't want anyone to find your anchor. Ever.",
    description: [
      "For the tactical boater who values discretion. The Stealth features a woodland/marine camouflage pattern that makes your anchor virtually invisible on the water's surface. This is either a feature or a significant design flaw, depending on your perspective.",
      "Popular among fishing enthusiasts who don't want other anglers to see their secret anchoring spot, and among customers who have already lost several non-camouflaged anchors and figure they might as well not be able to find this one either.",
      "Important: We are not responsible for anchors lost due to successful camouflage. If you can't find your Stealth anchor, it's working as intended."
    ],
    image: "/sites/inflatableanchors/product-stealth.png",
    category: "premium",
    specs: [
      { label: "Weight", value: "4 oz (inflated)" },
      { label: "Material", value: "Camo-print marine vinyl" },
      { label: "Pattern", value: "Woodland/Marine hybrid" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Holding Power", value: "Classified" },
      { label: "Visibility", value: "That's the point" },
    ],
  },
  // === ACCESSORIES ===
  {
    slug: "pump",
    name: "Deluxe Hand Pump",
    price: 14.99,
    priceLabel: "$14.99",
    tagline: "47 easy pumps to anchor readiness.",
    description: [
      "The official inflation device of Inflatable Anchors Co. Our patented EZ-Inflate™ hand pump is specifically calibrated for inflatable anchor deployment, though it also works on pool floats, air mattresses, and your sense of accomplishment.",
      "Ergonomic handle reduces fatigue during the 47-pump inflation cycle. Built-in pressure gauge tells you when your anchor has reached 'optimal buoyancy pressure,' which is any amount of air at all.",
      "Note: Pump is sold separately from all anchor models because we believe in the freedom of choice. Also because it increases our average order value."
    ],
    image: "/sites/inflatableanchors/product-pump.png",
    category: "accessories",
    specs: [
      { label: "Type", value: "Manual hand pump" },
      { label: "Pumps to Full Inflation", value: "47 (Original model)" },
      { label: "Compatible With", value: "All Inflatable Anchors products" },
      { label: "Pressure Gauge", value: "Included (decorative)" },
      { label: "Weight", value: "12 oz" },
      { label: "Warranty", value: "Until it breaks" },
    ],
  },
  {
    slug: "repair-kit",
    name: "Patch & Pray Repair Kit",
    price: 9.99,
    priceLabel: "$9.99",
    tagline: "Vinyl patches, glue, and an instruction card that just says 'Good luck.'",
    description: [
      "Reality happens. Rocks, barnacles, overly enthusiastic seagulls — the ocean is full of things that don't respect your inflatable anchor. The Patch & Pray Repair Kit is here for when your anchor meets one of them.",
      "Includes 6 adhesive vinyl patches, a tube of marine-grade glue, a small squeegee for smoothing, and a laminated instruction card featuring our official repair guidance: 'Good luck.' We considered writing more detailed instructions, but honesty felt more appropriate.",
      "Field-tested by Reef Henderson, who has patched more anchors than anyone alive. His success rate is 'encouraging.'"
    ],
    image: "/sites/inflatableanchors/product-repair-kit.png",
    category: "accessories",
    specs: [
      { label: "Patches Included", value: "6" },
      { label: "Glue Type", value: "Marine-grade vinyl adhesive" },
      { label: "Cure Time", value: "24 hours (or 5 minutes if impatient)" },
      { label: "Success Rate", value: "Encouraging" },
      { label: "Instruction Quality", value: "Honest" },
      { label: "Reusable", value: "The squeegee is" },
    ],
  },
  {
    slug: "ballast-pouch",
    name: "Ballast Weight Pouch",
    price: 12.99,
    priceLabel: "$12.99",
    tagline: "Add sand for actual holding power. At that point, you may just want a regular anchor.",
    description: [
      "For customers who love the concept of an inflatable anchor but would also like it to, you know, work. The Ballast Weight Pouch attaches to any Inflatable Anchors Co. product and can be filled with sand, gravel, or small rocks to add genuine holding power.",
      "We'll be honest: if you fill this pouch with enough sand to actually anchor a boat, you've essentially built a regular anchor with extra steps. We respect your journey.",
      "The pouch features a waterproof zipper, reinforced stitching, and a small tag that reads 'We see what you're doing and we support you.'"
    ],
    image: "/sites/inflatableanchors/product-ballast-pouch.png",
    category: "accessories",
    specs: [
      { label: "Capacity", value: "Up to 15 lbs of fill" },
      { label: "Material", value: "Reinforced canvas/mesh" },
      { label: "Closure", value: "Waterproof zipper" },
      { label: "Fill Material", value: "Sand, gravel (not included)" },
      { label: "Irony Level", value: "High" },
      { label: "Attachment", value: "Universal clip system" },
    ],
  },
  {
    slug: "bumper-sticker",
    name: "Bumper Sticker",
    price: 4.99,
    priceLabel: "$4.99",
    tagline: '"My Other Anchor Is Also Inflatable."',
    description: [
      "Declare your allegiance to the inflatable anchor lifestyle with our signature bumper sticker. Weatherproof, UV-resistant, and guaranteed to start conversations at boat ramps, parking lots, and divorce proceedings.",
      "Measures 10\" x 3\" and features our iconic safety orange and navy blue color scheme. Adheres to trucks, boat trailers, coolers, laptops, and the rear window of your ex's car (we do not endorse this).",
      "Our best-selling product by unit volume. Also our cheapest product. We try not to think about what that means."
    ],
    image: "/sites/inflatableanchors/product-bumper-sticker.png",
    category: "accessories",
    specs: [
      { label: "Size", value: '10" x 3"' },
      { label: "Material", value: "Weatherproof vinyl" },
      { label: "UV Resistant", value: "Yes" },
      { label: "Adhesive", value: "Permanent (like our brand loyalty)" },
      { label: "Conversation Starter", value: "Guaranteed" },
      { label: "Regret Factor", value: "Low to Moderate" },
    ],
  },
  {
    slug: "rapid-deflator",
    name: "The Rapid Deflator",
    price: 7.99,
    priceLabel: "$7.99",
    tagline: "A board. With a nail. For quick, permanent anchor retrieval.",
    description: [
      "Sometimes you need your anchor out of the water fast. Really fast. The Rapid Deflator is our most straightforward product: a 6-inch wooden board with a single nail driven through the center. Press firmly against your inflated anchor. Problem solved.",
      "Developed after Captain Chuck realized that the fastest way to retrieve an inflatable anchor is to make it not inflatable anymore. The Rapid Deflator achieves full anchor deflation in approximately 0.3 seconds, which is a company record.",
      "Warning: Deflation is permanent. The Rapid Deflator is a one-way tool. We recommend pairing it with a Patch & Pray Repair Kit or, more realistically, a replacement anchor."
    ],
    image: "/sites/inflatableanchors/product-rapid-deflator.png",
    category: "accessories",
    specs: [
      { label: "Dimensions", value: '6" x 6" board' },
      { label: "Nail Count", value: "1" },
      { label: "Nail Type", value: "Standard" },
      { label: "Deflation Time", value: "0.3 seconds" },
      { label: "Reusable", value: "The board is" },
      { label: "Anchor Reusable After", value: "No" },
    ],
  },
  {
    slug: "helium-reserve",
    name: "The Helium Reserve",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "Experience anchoring in the third dimension.",
    description: [
      "Why limit your anchor to two dimensions? The Helium Reserve is our most innovative product: an inflatable anchor filled with helium instead of air. The result is an anchor that floats not on the water, but above it. Way above it.",
      "Originally developed by accident when Reef Henderson connected the wrong tank during a product demo, the Helium Reserve quickly became our most talked-about product. Customers describe the experience as 'transcendent,' 'baffling,' and 'I want my money back.'",
      "Your anchor will hover gracefully above your boat, connected by rope, serving as both a non-functional anchor and an eye-catching flag that tells everyone on the water exactly what kind of boater you are."
    ],
    image: "/sites/inflatableanchors/product-helium-reserve.png",
    category: "accessories",
    specs: [
      { label: "Weight", value: "Negative (it floats up)" },
      { label: "Fill Gas", value: "Helium" },
      { label: "Float Duration", value: "4-6 hours before descent" },
      { label: "Maximum Altitude", value: "Limited by rope length" },
      { label: "Buoyancy Rating", value: "Atmospheric" },
      { label: "Holding Power", value: "Upward" },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(currentSlug: string, count = 3): Product[] {
  const current = getProductBySlug(currentSlug)
  if (!current) return products.slice(0, count)

  // Prefer same category, then other categories
  const sameCategory = products.filter(
    (p) => p.category === current.category && p.slug !== currentSlug
  )
  const otherCategory = products.filter(
    (p) => p.category !== current.category
  )
  return [...sameCategory, ...otherCategory].slice(0, count)
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category)
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/inflatableanchors/data/products.ts
git commit -m "feat(inflatableanchors): add product catalog with 14 products"
```

---

### Task 3: CustomerStory Shared Component

**Files:**
- Create: `src/components/ui/customer-story.tsx`

This is the one new shared component needed. It's a richer version of `TestimonialGrid` with photo, location, and star rating.

- [ ] **Step 1: Create `src/components/ui/customer-story.tsx`**

```typescript
import Image from "next/image"

interface CustomerStoryProps {
  name: string
  location: string
  image: string
  quote: string
  rating: number
}

interface CustomerStoryGridProps {
  title?: string
  stories: CustomerStoryProps[]
}

export function CustomerStoryGrid({ title, stories }: CustomerStoryGridProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl font-heading font-bold text-center mb-12">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div
              key={story.name}
              className="bg-secondary/10 rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={i < story.rating ? "text-primary" : "text-foreground/20"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-foreground/80 italic mb-4 leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <div>
                  <cite className="text-primary font-semibold not-italic">{story.name}</cite>
                  <p className="text-foreground/50 text-sm">{story.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/customer-story.tsx
git commit -m "feat: add CustomerStoryGrid shared component"
```

---

### Task 4: Home Page

**Files:**
- Create: `src/sites/inflatableanchors/pages/home.tsx`
- Modify: `src/sites/inflatableanchors/index.ts` (add page to pages map)

- [ ] **Step 1: Create `src/sites/inflatableanchors/pages/home.tsx`**

Follow the dehydratedwater home page pattern. Sections: Hero, WaveDivider, StatStrip, FeaturedProductSpotlight, ProductCarousel, press logos, TestimonialGrid, CTABanner.

```typescript
"use client"

import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { StatStrip } from "@/components/ui/stat-strip"
import { FeaturedProductSpotlight } from "@/components/ui/featured-product-spotlight"
import { ProductCarousel } from "@/components/ui/product-carousel"
import { ProductCard } from "@/components/ui/product-card"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/inflatableanchors/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const original = products.find((p) => p.slug === "original")!

const testimonials = [
  { quote: "I've never pulled up an anchor so easily. I've also never had my boat drift into a sandbar, but you win some, you lose some.", author: "Captain Dave, Clearwater Marina" },
  { quote: "My back hasn't felt this good since I switched to inflatable. My boat hasn't stayed in one place since either, but my chiropractor is thrilled.", author: "Margie P., Lake Havasu" },
  { quote: "I bought it as a joke for my husband. He uses it every weekend now. I'm not sure what that says about us.", author: "Linda T., Chesapeake Bay" },
  { quote: "The other guys at the marina laughed at first. Then they saw how easy it was to pull up. Now they're still laughing, but they also bought one.", author: "Big Tony, Galveston" },
  { quote: "I use mine in my kayak. Does it anchor the kayak? No. But do I feel like I have an anchor? Also no. But it was $19.99.", author: "Derek S., Portland" },
  { quote: "Five stars. Would not anchor again.", author: "Anonymous Verified Purchaser" },
]

export default function InflatableAnchorsHome() {
  const siteHref = useSiteLink()
  return (
    <>
      <Hero
        dark
        headline="The Easiest Anchor You'll Ever Pull Up"
        subheadline="Yes, the anchor is inflatable. No, this isn't about anchoring your inflatable."
        image="/sites/inflatableanchors/hero.png"
        ctaText="Shop Now"
        ctaHref={siteHref("/products")}
        secondaryCtaText="See How It Works"
        secondaryCtaHref={siteHref("/the-technology")}
      />

      <WaveDivider variant="wave1" />

      <StatStrip
        stats={[
          { icon: "⚓", value: "4 oz", label: "Average Weight" },
          { icon: "💨", value: "Under 2 Min", label: "To Inflate" },
          { icon: "🌊", value: "100%", label: "Floats" },
        ]}
      />

      <FeaturedProductSpotlight
        image={original.image}
        eyebrow="Our Flagship"
        title={original.name}
        description={original.tagline + " " + original.description[0]}
        ctaText="View Product"
        ctaHref={siteHref("/products/original")}
        imagePosition="right"
      />

      <ProductCarousel title="The Full Lineup">
        {products.map((p) => (
          <div key={p.slug} className="w-[260px] sm:w-[280px] shrink-0">
            <ProductCard slug={p.slug} name={p.name} price={p.priceLabel} tagline={p.tagline} image={p.image} />
          </div>
        ))}
      </ProductCarousel>

      {/* "As Seen Floating Near" press section */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-foreground/50 uppercase tracking-widest mb-6">
            As Seen Floating Near
          </p>
          <Image
            src="/sites/inflatableanchors/press-logos.png"
            alt="Featured at Marina Monthly, Boat Show Weekly, Anchoring Today, The Dockside Gazette, National Boating Expo"
            width={1200}
            height={200}
            className="w-full h-auto opacity-70"
          />
        </div>
      </section>

      <TestimonialGrid
        title="What Our Customers Are Saying"
        testimonials={testimonials}
      />

      <CTABanner
        headline="Ready to upgrade your anchoring experience?"
        description="Join thousands of boaters who've discovered the freedom of inflatable anchoring."
        ctaText="Shop All Products"
        ctaHref={siteHref("/products")}
      />
    </>
  )
}
```

- [ ] **Step 2: Update `src/sites/inflatableanchors/index.ts`**

Replace the placeholder home page import with the real one:

```typescript
import InflatableAnchorsHome from "./pages/home"
```

Update the pages map `""` entry:

```typescript
"": InflatableAnchorsHome,
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`

Visit: `http://localhost:3000/?site=inflatableanchors`

Expected: Full home page with all sections rendering. Orange theme applied. Navigation works. Product images will show broken (no images yet) but layout should be correct.

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
git add src/sites/inflatableanchors/pages/home.tsx src/sites/inflatableanchors/index.ts
git commit -m "feat(inflatableanchors): add home page"
```

---

### Task 5: Products Page & Product Detail Page

**Files:**
- Create: `src/sites/inflatableanchors/pages/products.tsx`
- Create: `src/sites/inflatableanchors/pages/product-detail.tsx`
- Modify: `src/sites/inflatableanchors/index.ts` (add pages + dynamic route)

- [ ] **Step 1: Create `src/sites/inflatableanchors/pages/products.tsx`**

Three category sections following the dehydratedwater products page pattern:

```typescript
"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { FeaturedProductSpotlight } from "@/components/ui/featured-product-spotlight"
import { ProductCard } from "@/components/ui/product-card"
import { PromoBanner } from "@/components/ui/promo-banner"
import { products, getProductsByCategory } from "@/sites/inflatableanchors/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "Products — Inflatable Anchors Co.",
  description: "Browse our full lineup of inflatable anchors, premium models, and accessories.",
}

const heavyDutyPro = products.find((p) => p.slug === "heavy-duty-pro")!
const standardAnchors = getProductsByCategory("standard")
const premiumLine = getProductsByCategory("premium")
const accessories = getProductsByCategory("accessories")

export default function InflatableAnchorsProducts() {
  const siteHref = useSiteLink()
  return (
    <>
      <Hero
        dark
        headline="Our Products"
        subheadline="Everything you need to not anchor your boat. From entry-level to premium, plus all the accessories."
      />

      <WaveDivider variant="wave1" />

      <FeaturedProductSpotlight
        image={heavyDutyPro.image}
        eyebrow="Most Popular"
        title={heavyDutyPro.name}
        description={heavyDutyPro.tagline + " " + heavyDutyPro.description[0]}
        ctaText="View Product"
        ctaHref={siteHref("/products/heavy-duty-pro")}
        imagePosition="left"
      />

      {/* Standard Anchors */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent uppercase tracking-wide">
              Standard Anchors
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardAnchors.map((product) => (
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

      {/* Premium Line */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent uppercase tracking-wide">
              Premium Line
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumLine.map((product) => (
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

      {/* Accessories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent uppercase tracking-wide">
              Accessories
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessories.map((product) => (
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

      <PromoBanner
        headline="Free Shipping on All Anchors*"
        subtext="*They weigh 4 oz. The shipping was already basically free."
      />
    </>
  )
}
```

- [ ] **Step 2: Create `src/sites/inflatableanchors/pages/product-detail.tsx`**

Follow the dehydratedwater product detail pattern but use `specs` instead of `scienceFacts`:

```typescript
"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { SplitSection } from "@/components/ui/split-section"
import { ProductCarousel } from "@/components/ui/product-carousel"
import { ProductCard } from "@/components/ui/product-card"
import { PromoBanner } from "@/components/ui/promo-banner"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { getProductBySlug, getRelatedProducts } from "@/sites/inflatableanchors/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

export default function ProductDetail({ slug }: { slug: string }) {
  const siteHref = useSiteLink()
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 4)

  return (
    <>
      {/* Product hero — split section */}
      <SplitSection image={product.image} imagePosition="left">
        <p className="text-sm text-accent uppercase tracking-widest mb-2 font-semibold">
          {product.category === "standard"
            ? "Standard Anchors"
            : product.category === "premium"
            ? "Premium Line"
            : "Accessories"}
        </p>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          {product.name}
        </h1>
        <p className="text-foreground/60 text-lg mb-4">{product.tagline}</p>
        <p className="text-2xl font-bold text-primary mb-6">{product.priceLabel}</p>
        <AddToCartButton slug={product.slug} productName={product.name} />
      </SplitSection>

      <WaveDivider variant="wave2" />

      {/* Description */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-4">
          {product.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Specs panel */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Product Specifications
          </h2>
          <div className="border border-primary/10 rounded-lg overflow-hidden">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex justify-between px-6 py-3 ${
                  i % 2 === 0 ? "bg-background" : "bg-secondary/10"
                }`}
              >
                <span className="font-semibold text-foreground/70">{spec.label}</span>
                <span className="text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      <ProductCarousel title="You Might Also Like">
        {related.map((p) => (
          <div key={p.slug} className="w-[260px] sm:w-[280px] shrink-0">
            <ProductCard slug={p.slug} name={p.name} price={p.priceLabel} tagline={p.tagline} image={p.image} />
          </div>
        ))}
      </ProductCarousel>

      <PromoBanner
        headline="See the full lineup"
        ctaText="All Products"
        ctaHref={siteHref("/products")}
      />
    </>
  )
}
```

- [ ] **Step 3: Update `src/sites/inflatableanchors/index.ts`**

Add imports and page/route entries:

```typescript
import InflatableAnchorsProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
```

Add to `pages` map:

```typescript
"products": { component: InflatableAnchorsProducts, metadata: productsMetadata },
```

Add to `dynamicRoutes`:

```typescript
export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Inflatable Anchors Co.`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 4: Verify in browser**

Visit: `http://localhost:3000/products?site=inflatableanchors`

Expected: Products page with three category sections, product cards rendered.

Visit: `http://localhost:3000/products/original?site=inflatableanchors`

Expected: Product detail page with specs panel, description, related products.

- [ ] **Step 5: Run type check**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 6: Commit**

```bash
git add src/sites/inflatableanchors/pages/products.tsx src/sites/inflatableanchors/pages/product-detail.tsx src/sites/inflatableanchors/index.ts
git commit -m "feat(inflatableanchors): add products page and product detail with dynamic routing"
```

---

### Task 6: About Page

**Files:**
- Create: `src/sites/inflatableanchors/pages/about.tsx`
- Modify: `src/sites/inflatableanchors/index.ts`

- [ ] **Step 1: Create `src/sites/inflatableanchors/pages/about.tsx`**

Follow the dehydratedwater our-story pattern: SplitSection for origin, Timeline, team members, values.

```typescript
"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { SplitSection } from "@/components/ui/split-section"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { CascadeTimeline } from "@/components/ui/cascade-timeline"
import { TeamMember } from "@/components/ui/team-member"
import { PromoBanner } from "@/components/ui/promo-banner"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "About — Inflatable Anchors Co.",
  description: "The story of how one man's bad back led to the world's lightest anchor.",
}

const timelineItems = [
  { year: "2019", description: "Captain Chuck Denton throws out his back hauling a 35-pound anchor onto his 12-foot dinghy. While lying on the dock, he gazes at a pool float and has a vision." },
  { year: "2020", description: "First prototype constructed from a pool float and duct tape. It does not anchor the boat. Chuck calls it 'a promising start.'" },
  { year: "2021", description: "Reef Henderson joins as Head of Buoyancy Research. His first memo: 'The anchor floats. This is by design.' Nobody questions it." },
  { year: "2022", description: "Launches Kickstarter campaign. Raises $847. Chuck's mom contributes $800 of it." },
  { year: "2023", description: "First customer complaint: 'The anchor doesn't anchor.' Skip Bayliner is hired to handle customer amazement. He responds: 'But wasn't it easy to pull up?'" },
  { year: "2024", description: "Big Mike Portside joins as VP of Heavy-Duty Operations. He is 6'4\" and 250 lbs. The product weighs 4 oz. No one addresses the contradiction." },
  { year: "2025", description: "Introduces the Premium Line. The Captain's Choice sells out in a week. 'Sells out' means they made 12 and sold all of them." },
  { year: "2026", description: "You're here. We're still here. The anchors are still floating. We consider this a success." },
]

const teamMembers = [
  {
    name: "Captain Chuck Denton",
    title: "Founder & Chief Inflation Officer",
    image: "/sites/inflatableanchors/team-chuck.png",
    bio: "Former marina operator turned inflatable anchor evangelist. Has demonstrated the product on live television twice. Both times, the anchor floated away on camera. Both times, he called it a success.",
  },
  {
    name: "Reef Henderson",
    title: "Head of Buoyancy Research",
    image: "/sites/inflatableanchors/team-reef.png",
    bio: "Holds a degree in something he describes as 'fluid-adjacent.' Has a whiteboard full of buoyancy equations that no one has verified. Has never successfully anchored a boat.",
  },
  {
    name: "Skip Bayliner",
    title: "Director of Customer Amazement",
    image: "/sites/inflatableanchors/team-skip.png",
    bio: "Handles all customer interactions with relentless positivity. Has responded to every complaint with 'But wasn't the retrieval easy?' Maintains a 1.2-star average on review sites and considers it 'room to grow.'",
  },
  {
    name: "Big Mike Portside",
    title: "VP of Heavy-Duty Operations",
    image: "/sites/inflatableanchors/team-mike.png",
    bio: "Oversees the Heavy Duty Pro line and all warehouse operations. Frequently photographed carrying comically small shipping boxes. His handshake is firmer than anything the company manufactures.",
  },
]

export default function InflatableAnchorsAbout() {
  const siteHref = useSiteLink()
  return (
    <>
      <Hero
        dark
        headline="About Us"
        subheadline="Founded on a bad back and a good idea. Well, an idea."
      />

      <WaveDivider variant="wave1" />

      {/* Origin story */}
      <SplitSection image="/sites/inflatableanchors/about-origin.png" imagePosition="right">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-4">The Origin Story</h2>
        <p className="text-foreground/70 mb-4 leading-relaxed">
          In 2019, Captain Chuck Denton &mdash; marina operator, weekend boater, and man with a
          deteriorating L4-L5 disc &mdash; threw out his back for the last time hauling a
          35-pound Danforth anchor onto his 12-foot dinghy.
        </p>
        <p className="text-foreground/70 mb-4 leading-relaxed">
          While lying flat on the dock, staring at a child&apos;s pool float drifting past, Chuck had
          what he later described as &ldquo;the most important idea in marine history.&rdquo; His
          chiropractor described it as &ldquo;what happens when you mix painkillers and
          sunstroke.&rdquo;
        </p>
        <p className="text-foreground/70 leading-relaxed">
          Either way, Inflatable Anchors Co. was born. The anchor doesn&apos;t hold your boat in
          place, but you&apos;ll never throw out your back pulling it up. And honestly? That&apos;s
          the trade-off Chuck was willing to make.
        </p>
      </SplitSection>

      <AnimatedCounter
        end={47}
        label="Easy Pumps to Anchor Readiness"
        suffix=" Pumps"
      />

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">Company Timeline</h2>
        </div>
        <CascadeTimeline items={timelineItems} />
      </section>

      {/* Values — dark split section */}
      <SplitSection
        image="/sites/inflatableanchors/about-values.png"
        imagePosition="left"
        dark
      >
        <h2 className="text-3xl font-heading font-bold text-white mb-6">Our Values</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Lightweight Solutions</h3>
            <p className="text-white/70">If it weighs more than a sandwich, we&apos;re not interested.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Customer Amazement</h3>
            <p className="text-white/70">We aim to amaze. Amazement and satisfaction are different things, and we&apos;ve chosen our lane.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Buoyancy First</h3>
            <p className="text-white/70">Everything we make floats. This is non-negotiable and, for an anchor company, deeply unusual.</p>
          </div>
        </div>
      </SplitSection>

      {/* Team grid */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Meet the Team
          </h2>
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

      <PromoBanner
        headline="See what we've built"
        ctaText="View All Products"
        ctaHref={siteHref("/products")}
      />
    </>
  )
}
```

- [ ] **Step 2: Update `src/sites/inflatableanchors/index.ts`**

Add import and pages entry:

```typescript
import InflatableAnchorsAbout, { metadata as aboutMetadata } from "./pages/about"
```

```typescript
"about": { component: InflatableAnchorsAbout, metadata: aboutMetadata },
```

- [ ] **Step 3: Verify in browser**

Visit: `http://localhost:3000/about?site=inflatableanchors`

Expected: About page renders with origin story, timeline, team members, and values.

- [ ] **Step 4: Run type check and commit**

```bash
npx tsc --noEmit
git add src/sites/inflatableanchors/pages/about.tsx src/sites/inflatableanchors/index.ts
git commit -m "feat(inflatableanchors): add about page with timeline and team"
```

---

### Task 7: Technology Page

**Files:**
- Create: `src/sites/inflatableanchors/pages/technology.tsx`
- Modify: `src/sites/inflatableanchors/index.ts`

- [ ] **Step 1: Create `src/sites/inflatableanchors/pages/technology.tsx`**

Follows the dehydratedwater the-science.tsx pattern — ProcessFlow + ComparisonTable:

```typescript
import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { ProcessFlow } from "@/components/ui/process-flow"
import { StatStrip } from "@/components/ui/stat-strip"
import { ComparisonTable } from "@/components/ui/comparison-table"

export const metadata = {
  title: "The Technology — Inflatable Anchors Co.",
  description: "The Inflation Deployment System™, explained. Sort of.",
}

const steps = [
  {
    number: "01",
    title: "Inflate",
    description:
      "Using our patented EZ-Inflate™ hand pump (sold separately), bring your anchor to full operational pressure in just 47 easy pumps. Each pump brings you closer to anchoring readiness. Pro tip: count out loud for maximum confidence. Your fellow boaters will appreciate the countdown.",
    image: "/sites/inflatableanchors/tech-inflate.png",
  },
  {
    number: "02",
    title: "Deploy",
    description:
      "Lower your fully inflated anchor into the water using the included 50ft of marine-grade rope. Feel the satisfying weightlessness as it enters the water. Traditional anchors fight gravity on the way down. Ours doesn't fight anything. It's the path of least resistance, and we think that's beautiful.",
    image: "/sites/inflatableanchors/tech-deploy.png",
  },
  {
    number: "03",
    title: "Observe",
    description:
      "Watch as your anchor establishes its position on the water's surface. Note: surface positioning is a feature, not a bug. Traditional anchors disappear beneath the waves, leaving you wondering if they're working. With ours, you can see it the whole time. Full transparency. Full buoyancy.",
    image: "/sites/inflatableanchors/tech-observe.png",
  },
  {
    number: "04",
    title: "Retrieve",
    description:
      "Simply pull the rope. That's it. One hand. No winch. No straining. No herniated discs. No calling your buddy to help. No throwing out your back and lying on the dock questioning your life choices. This is the moment that makes it all worth it. This is why we're here.",
    image: "/sites/inflatableanchors/tech-retrieve.png",
  },
]

export default function TheTechnology() {
  return (
    <>
      <Hero
        dark
        headline="The Technology"
        subheadline="Our patented Inflation Deployment System™. Four steps to anchoring freedom."
      />

      <WaveDivider variant="wave1" />

      <ProcessFlow steps={steps} />

      <StatStrip
        stats={[
          { icon: "⚓", value: "4 oz", label: "Total Anchor Weight" },
          { icon: "💪", value: "0 Injuries", label: "From Retrieval" },
          { icon: "🏆", value: "0 Awards", label: "So Far" },
        ]}
      />

      <ComparisonTable
        title="Why Go Inflatable?"
        columns={[
          { name: "Inflatable", highlighted: true },
          { name: "Steel Fluke" },
          { name: "Concrete Block" },
          { name: "Mushroom" },
        ]}
        rows={[
          { label: "Weight", values: ["4 oz", "15-45 lbs", "20-60 lbs", "10-30 lbs"] },
          { label: "Setup Time", values: ["Under 2 min", "Immediate", "Immediate", "Immediate"] },
          { label: "Storage", values: ["Fits in pocket", "Dedicated locker", "Garage floor", "Shed"] },
          { label: "Portability", values: ["Backpackable", "Hernia risk", "Need a friend", "Awkward"] },
          { label: "Ease of Retrieval", values: ["One-handed", "Winch recommended", "Good luck", "Moderate"] },
          { label: "Fun Factor", values: ["Extreme", "None", "None", "Low"] },
          { label: "Conversation Starter", values: ["Guaranteed", "Never", '"Why?"', '"What is that?"'] },
          { label: "Holds Boat in Place", values: ["*", "Yes", "Yes", "Yes"] },
        ]}
        footnote='* Results may vary based on current, wind, tide, expectations, and definition of "holds."'
      />

      {/* Endorsements section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Industry Recognition</h2>
          <p className="text-foreground/60 mb-8">
            Our technology has been submitted for review to the following organizations. None have responded.
          </p>
          <div className="space-y-4 text-foreground/70 text-sm italic">
            <p>&ldquo;Inflatable Anchoring: A Paradigm Shift in Marine Non-Holding Technology&rdquo; — <span className="text-foreground/50">Submitted to the American Boating Association, 2023. Status: Unread.</span></p>
            <p>&ldquo;Buoyancy as a Feature: Rethinking the Anchor&rdquo; — <span className="text-foreground/50">Submitted to Maritime Engineering Quarterly, 2024. Status: &ldquo;Please stop emailing us.&rdquo;</span></p>
            <p>&ldquo;47 Pumps to Freedom: The EZ-Inflate Manifesto&rdquo; — <span className="text-foreground/50">Self-published on Chuck&apos;s blog, 2025. 7 views (4 were Chuck).</span></p>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Update `src/sites/inflatableanchors/index.ts`**

```typescript
import TheTechnology, { metadata as technologyMetadata } from "./pages/technology"
```

```typescript
"the-technology": { component: TheTechnology, metadata: technologyMetadata },
```

- [ ] **Step 3: Verify in browser**

Visit: `http://localhost:3000/the-technology?site=inflatableanchors`

Expected: Process flow with 4 steps, comparison table with highlighted inflatable column, endorsements section.

- [ ] **Step 4: Run type check and commit**

```bash
npx tsc --noEmit
git add src/sites/inflatableanchors/pages/technology.tsx src/sites/inflatableanchors/index.ts
git commit -m "feat(inflatableanchors): add technology page with process flow and comparison table"
```

---

### Task 8: Customer Stories Page

**Files:**
- Create: `src/sites/inflatableanchors/pages/customer-stories.tsx`
- Modify: `src/sites/inflatableanchors/index.ts`

- [ ] **Step 1: Create `src/sites/inflatableanchors/pages/customer-stories.tsx`**

Uses the new CustomerStoryGrid component:

```typescript
"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { CustomerStoryGrid } from "@/components/ui/customer-story"
import { PromoBanner } from "@/components/ui/promo-banner"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "Customer Stories — Inflatable Anchors Co.",
  description: "Real stories from real customers who really bought inflatable anchors.",
}

const stories = [
  {
    name: "Hank Moorhouse",
    location: "Clearwater Marina, FL",
    image: "/sites/inflatableanchors/customer-marina.png",
    quote: "I've been running this marina for 22 years, and I've never had a product generate more conversations at the dock. People see the inflatable anchor and they have to ask about it. Then they have to try it. Then they have to buy one. It's the best-selling item in my shop, and I still can't tell you if it works. But it moves units, and in this economy, that's all I need.",
    rating: 5,
  },
  {
    name: "Jenny & Mark Keelson",
    location: "Lake Havasu, AZ",
    image: "/sites/inflatableanchors/customer-weekend.png",
    quote: "We used to dread the anchor part of every boat trip. Mark would strain to pull up the old steel one, I'd try to help, we'd argue about technique, and by the time it was on the boat we weren't speaking. Now? He pulls up the inflatable with one hand while holding a beer in the other. Our marriage has never been stronger. The boat drifts a little, but we drift together.",
    rating: 4,
  },
  {
    name: "Tammy Brackwater",
    location: "Scottsdale, AZ",
    image: "/sites/inflatableanchors/customer-pool.png",
    quote: "I don't even own a boat. I bought the Original for my pool because it looked fun, and honestly? Best pool toy I've ever owned. The kids love it. I tied it to the deep end ladder and they take turns 'deploying the anchor.' Is this what it was designed for? Absolutely not. Am I its happiest customer? Possibly.",
    rating: 5,
  },
  {
    name: "Dale Perchman",
    location: "Galveston, TX",
    image: "/sites/inflatableanchors/customer-fishing.png",
    quote: "I fish every Saturday. Used to use a mushroom anchor — heavy, ugly, scared the fish. Switched to the inflatable last spring and I'll tell you what: the fish aren't scared of it. They swim right up to it. Now, does my boat stay in one spot? Not exactly. But I cover more water this way, which means I see more fish, which I choose to interpret as an advantage.",
    rating: 4,
  },
]

export default function CustomerStories() {
  const siteHref = useSiteLink()
  return (
    <>
      <Hero
        dark
        headline="Customer Stories"
        subheadline="Real people. Real anchors. Real floating."
      />

      <WaveDivider variant="wave1" />

      <CustomerStoryGrid
        title="Hear From Our Customers"
        stories={stories}
      />

      <PromoBanner
        headline="Ready to write your own story?"
        ctaText="Shop Now"
        ctaHref={siteHref("/products")}
      />
    </>
  )
}
```

- [ ] **Step 2: Update `src/sites/inflatableanchors/index.ts`**

```typescript
import CustomerStoriesPage, { metadata as customerStoriesMetadata } from "./pages/customer-stories"
```

```typescript
"customer-stories": { component: CustomerStoriesPage, metadata: customerStoriesMetadata },
```

- [ ] **Step 3: Verify in browser**

Visit: `http://localhost:3000/customer-stories?site=inflatableanchors`

Expected: 4 customer story cards with images, quotes, ratings, and locations.

- [ ] **Step 4: Run type check and commit**

```bash
npx tsc --noEmit
git add src/sites/inflatableanchors/pages/customer-stories.tsx src/sites/inflatableanchors/index.ts
git commit -m "feat(inflatableanchors): add customer stories page"
```

---

### Task 9: FAQ Page

**Files:**
- Create: `src/sites/inflatableanchors/pages/faq.tsx`
- Modify: `src/sites/inflatableanchors/index.ts`

- [ ] **Step 1: Create `src/sites/inflatableanchors/pages/faq.tsx`**

Multi-section accordion following dehydratedwater FAQ pattern:

```typescript
"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import { PromoBanner } from "@/components/ui/promo-banner"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "FAQ — Inflatable Anchors Co.",
  description: "Frequently asked questions about our inflatable anchors.",
}

const aboutOurAnchors = [
  {
    question: "Wait — is the anchor inflatable, or is it for anchoring inflatables?",
    answer: "The anchor itself is inflatable. It is an anchor made of vinyl that you inflate with air. It is not a device for anchoring inflatable boats, pool toys, or parade floats. We get this question a lot. We have accepted it as our cross to bear.",
  },
  {
    question: "Does it actually anchor a boat?",
    answer: "That depends on your definition of 'anchor.' If you mean 'keeps a boat in a fixed position,' then results may vary. If you mean 'is shaped like an anchor and attached to a boat by a rope,' then absolutely. Every time.",
  },
  {
    question: "Why would I buy an anchor that floats?",
    answer: "Have you ever tried to pull up a 35-pound steel anchor? Have you felt your lower back scream as you haul wet chain over the gunwale? Our anchor weighs 4 ounces. You can pull it up with one hand while holding a sandwich in the other. That's why.",
  },
  {
    question: "Is this a joke?",
    answer: "We prefer the term 'lifestyle product.'",
  },
]

const inflationAndDeployment = [
  {
    question: "How long does it take to inflate?",
    answer: "47 pumps with our Deluxe Hand Pump, which takes approximately 2 minutes. If you're in a hurry, consider the EZ-Drop, which arrives pre-inflated. If you're in even more of a hurry, reconsider whether you need an anchor at all.",
  },
  {
    question: "What PSI should the anchor be?",
    answer: "Any amount of air is technically correct. Our official recommendation is 'inflated enough to look like an anchor.' Reef Henderson has published a 14-page whitepaper on optimal PSI that no one has read, including Reef Henderson.",
  },
  {
    question: "Can I use an electric pump?",
    answer: "Absolutely, though we should warn you: inflating the anchor is the most exciting part of the anchoring experience. Using an electric pump is like fast-forwarding through the opening credits. You can do it, but you're missing out.",
  },
  {
    question: "What happens if I over-inflate it?",
    answer: "You'll have a very firm, very round anchor that bears less resemblance to an anchor shape and more resemblance to an orange beach ball. Performance is unaffected, since performance was never really the point.",
  },
]

const durabilityAndMaintenance = [
  {
    question: "How long does it last?",
    answer: "Under ideal conditions (gentle handling, calm waters, no seagulls), our anchors last 1-3 seasons. Under real conditions (everything else), your mileage may vary. This is why we sell the Patch & Pray Repair Kit.",
  },
  {
    question: "Is it puncture-resistant?",
    answer: "It is puncture-resistant in the same way that all vinyl products are puncture-resistant: it resists punctures until it doesn't. For enhanced protection, avoid sharp rocks, coral, fish hooks, crab claws, and the Rapid Deflator.",
  },
  {
    question: "Can I leave it inflated between uses?",
    answer: "You can! Many customers leave their anchor inflated and hanging in the garage, where it serves as both marine equipment and a conversation piece. The EZ-Drop is designed to stay permanently inflated. Just don't leave it in direct sunlight for extended periods unless you enjoy the sound of small explosions.",
  },
  {
    question: "What's the warranty?",
    answer: "All anchors come with our 'Good Faith Guarantee,' which means we guarantee, in good faith, that you received an anchor. Beyond that, warranties get complicated. See our Terms of Service for details that won't make you feel better.",
  },
]

const ordersAndShipping = [
  {
    question: "How much does shipping cost?",
    answer: "Almost nothing. The anchor weighs 4 ounces. Shipping it costs less than shipping a letter. The EZ-Drop (pre-inflated) costs more because we're shipping what is essentially a large box of air. We are aware of the irony.",
  },
  {
    question: "Do you ship internationally?",
    answer: "We do. International customers should be aware that customs forms require us to declare the contents as 'inflatable marine equipment,' which has resulted in some interesting conversations at border crossings.",
  },
  {
    question: "What's your return policy?",
    answer: "All sales are final. Much like deploying an inflatable anchor in a strong current — once it's out there, it's out there. We accept exchanges for defective products, where 'defective' means 'won't inflate.' If it inflates but doesn't anchor, that's not a defect. That's the product.",
  },
  {
    question: "Can I buy in bulk?",
    answer: "Yes! We offer the Fleet Pack for individual customers and wholesale pricing for marinas, boat shows, and gag gift companies. Contact Skip Bayliner at our Contact page — he gets very excited about bulk orders.",
  },
]

export default function InflatableAnchorsFAQ() {
  const siteHref = useSiteLink()
  return (
    <>
      <Hero
        dark
        headline="Frequently Asked Questions"
        subheadline="Everything you wanted to know about inflatable anchors but were afraid to ask."
      />

      <WaveDivider variant="wave1" />

      {/* About Our Anchors */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent">About Our Anchors</h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={aboutOurAnchors} />
        </div>
      </section>

      {/* Inflation & Deployment */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent">Inflation &amp; Deployment</h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={inflationAndDeployment} />
        </div>
      </section>

      {/* Durability & Maintenance */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent">Durability &amp; Maintenance</h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={durabilityAndMaintenance} />
        </div>
      </section>

      {/* Orders & Shipping */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent">Orders &amp; Shipping</h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={ordersAndShipping} />
        </div>
      </section>

      <PromoBanner
        headline="Still have questions?"
        subtext="Our Director of Customer Amazement is standing by."
        ctaText="Contact Us"
        ctaHref={siteHref("/contact")}
      />
    </>
  )
}
```

- [ ] **Step 2: Update `src/sites/inflatableanchors/index.ts`**

```typescript
import InflatableAnchorsFAQ, { metadata as faqMetadata } from "./pages/faq"
```

```typescript
"faq": { component: InflatableAnchorsFAQ, metadata: faqMetadata },
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add src/sites/inflatableanchors/pages/faq.tsx src/sites/inflatableanchors/index.ts
git commit -m "feat(inflatableanchors): add FAQ page with 4 sections"
```

---

### Task 10: Contact Page

**Files:**
- Create: `src/sites/inflatableanchors/pages/contact.tsx`
- Modify: `src/sites/inflatableanchors/index.ts`

- [ ] **Step 1: Create `src/sites/inflatableanchors/pages/contact.tsx`**

Follow the pigmilk contact page pattern with fake form, contact details, and subtle email placement:

```typescript
"use client"

import { useState } from "react"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Contact — Inflatable Anchors Co.",
  description: "Get in touch with the Inflatable Anchors Co. team.",
}

const inquiryReasons = [
  "Product question",
  "Anchor emergency (it floated away)",
  "Bulk order inquiry",
  "Warranty claim (good luck)",
  "I just want to talk to someone about anchors",
  "Media / press inquiry",
  "Other (we're curious)",
]

export default function InflatableAnchorsContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Hero
        headline="Contact Us"
        subheadline="We're here to help. Retrieval times may vary."
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-4xl">⚓</p>
                <p className="text-xl font-heading font-bold text-primary">
                  Message sent!
                </p>
                <p className="text-foreground/70">
                  Skip Bayliner will respond within 1-3 business tides.
                </p>
                <p className="text-foreground/50 text-sm">
                  Your message has been printed, laminated, and attached to an inflatable anchor. It is currently floating somewhere in the Gulf of Mexico. Skip is en route by kayak.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const confirmed = window.confirm(
                    "Are you sure you want to contact Inflatable Anchors Co.?\n\n" +
                    "By clicking OK, you acknowledge that:\n" +
                    "• Skip Bayliner will respond with 'overwhelming enthusiasm'\n" +
                    "• Response times are measured in 'tides' (1 tide ≈ 12.4 hours)\n" +
                    "• Captain Chuck may call you personally to demonstrate the product\n\n" +
                    "Proceed?"
                  )
                  if (confirmed) setSubmitted(true)
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-semibold mb-2">Reason for Inquiry</label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="">Select a reason...</option>
                    {inquiryReasons.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-vertical"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Details + Image */}
          <div className="space-y-8">
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/sites/inflatableanchors/contact-hq.png"
                alt="Inflatable Anchors Co. World Headquarters"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  World Headquarters
                </h3>
                <p className="text-foreground">Pier Nowhere, Slip 0</p>
                <p className="text-foreground">Anchorage, AK 99501</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Phone
                </h3>
                <p className="text-foreground">1-800-INF-LATE</p>
                <p className="text-sm text-foreground/70">
                  Hold music is the sound of waves and distant inflating.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Email
                </h3>
                <p className="text-primary">ahoy@inflatableanchors.specificindustries.com</p>
                <p className="text-[10px] text-foreground/50 mt-1">
                  Preferred method: carrier pigeon. Backup:{" "}
                  <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary transition-colors">
                    bsambrone@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Hours
                </h3>
                <p className="text-foreground">
                  Monday-Friday, High Tide to Low Tide
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Anchor Emergency Hotline
                </h3>
                <p className="text-foreground">
                  Available 24/7. Response time: 1-3 tides.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Update `src/sites/inflatableanchors/index.ts`**

```typescript
import InflatableAnchorsContact, { metadata as contactMetadata } from "./pages/contact"
```

```typescript
"contact": { component: InflatableAnchorsContact, metadata: contactMetadata },
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add src/sites/inflatableanchors/pages/contact.tsx src/sites/inflatableanchors/index.ts
git commit -m "feat(inflatableanchors): add contact page"
```

---

### Task 11: Privacy Policy & Terms of Service

**Files:**
- Create: `src/sites/inflatableanchors/pages/privacy.tsx`
- Create: `src/sites/inflatableanchors/pages/terms.tsx`
- Modify: `src/sites/inflatableanchors/index.ts`

- [ ] **Step 1: Create `src/sites/inflatableanchors/pages/privacy.tsx`**

Opens with authoritative specificindustries.com reference, then fully absurd nautical/infomercial humor:

```typescript
import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"

export const metadata = {
  title: "Privacy Policy — Inflatable Anchors Co.",
  description: "Our privacy policy. Lighter reading than our anchors.",
}

export default function InflatableAnchorsPrivacy() {
  return (
    <>
      <Hero
        dark
        headline="Privacy Policy"
        subheadline="Effective as of our last anchor deployment. Which drifted."
      />
      <WaveDivider variant="wave1" />
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
            Last updated: When the tide was out. We think it was a Tuesday.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. What We Collect</h2>
          <p>
            Nothing. Absolutely nothing. Much like our anchors, our data collection
            has zero holding power. We don&apos;t have a database. We don&apos;t have a server room.
            Captain Chuck has a notebook where he writes down &ldquo;cool boat names he saw at the
            marina&rdquo; but that&apos;s a personal project and not affiliated with this website.
          </p>
          <p>
            Your shopping cart is stored in your browser&apos;s local storage, which means
            it lives on your computer, not ours. If you clear your cookies, your cart
            disappears, much like our anchors disappear when you deploy them in a current.
            We find the parallel poetic.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Cookies &amp; Tracking</h2>
          <p>
            We use Google Analytics because someone told Chuck it was important. We also use
            Vercel Analytics because it came with the hosting and Skip couldn&apos;t figure out how
            to turn it off. These tools tell us things like &ldquo;someone visited the website&rdquo;
            and &ldquo;they left.&rdquo; We do not know who you are, where you live, or whether
            you actually bought an anchor. Big Mike checks the mailbox every day just in case an
            order shows up. It has not, because this is a satirical website.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Data Sharing</h2>
          <p>
            We share your data with the following parties: no one. We cannot share what we do
            not have. Reef Henderson once suggested we &ldquo;leverage our user data for strategic
            buoyancy insights&rdquo; but since our user data consists of Google Analytics page
            views and Big Mike&apos;s notebook of cool boat names, the strategic value was determined
            to be approximately zero. Reef was asked to go back to his whiteboard.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Your Rights</h2>
          <p>
            You have the right to access any data we have about you. Since we have no data
            about you, this right is both absolute and completely useless. You also have the
            right to be forgotten, which, given that we never knew you existed, has already
            been granted. You&apos;re welcome.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Security</h2>
          <p>
            Our website is secured by HTTPS, which the little padlock in your browser confirms.
            Beyond that, our security infrastructure consists of Captain Chuck&apos;s WiFi password
            (&ldquo;anchor123&rdquo; &mdash; please do not use this), a seagull that sits on the
            router, and the general obscurity of being a website about inflatable anchors. We
            have never been hacked because we have never been worth hacking. We consider this
            our most effective security measure.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Contact &amp; Disputes</h2>
          <p>
            If you have concerns about this privacy policy, please contact our Director of
            Customer Amazement, Skip Bayliner, who will respond with enthusiasm that may or
            may not address your actual concern. For serious privacy inquiries, Captain Chuck
            is available between tides. He will listen carefully, nod thoughtfully, and then
            ask if you&apos;d like to see a demonstration of the Heavy Duty Pro. All disputes
            are resolved by Big Mike, whose resolution method involves a firm handshake and
            the phrase &ldquo;I think we&apos;re good here.&rdquo;
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create `src/sites/inflatableanchors/pages/terms.tsx`**

```typescript
import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"

export const metadata = {
  title: "Terms of Service — Inflatable Anchors Co.",
  description: "Our terms of service. Please read before inflating.",
}

export default function InflatableAnchorsTerms() {
  return (
    <>
      <Hero
        dark
        headline="Terms of Service"
        subheadline="By continuing to read, you agree to terms you haven't read yet."
      />
      <WaveDivider variant="wave1" />
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
            Last updated: Sometime between tides. We weren&apos;t paying close attention.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By using this website, you agree to these terms. By purchasing our products,
            you agree to even more terms. By inflating our products, you have entered into a
            binding agreement with air itself, and at that point, these terms are the least
            of your concerns. If you do not agree to these terms, please navigate away from
            this website. Your inflatable anchor, if deployed, will also navigate away. From
            everything. That&apos;s what it does.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Product Disclaimer</h2>
          <p>
            Inflatable Anchors Co. guarantees that your anchor will inflate. We make no
            further guarantees. Specifically, we do not guarantee that your anchor will
            anchor, hold, grip, clasp, secure, moor, berth, or otherwise prevent the lateral
            movement of any watercraft. Our product is an inflatable object shaped like an
            anchor. What you do with that information is between you and the sea.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Liability</h2>
          <p>
            We are not responsible for boats that drift, float, sail away, relocate without
            consent, visit neighboring marinas uninvited, cross international waters, or
            embark on journeys of self-discovery. We are also not responsible for seagull
            damage, sunburn sustained while inflating, arguments with dock neighbors about
            &ldquo;what counts as an anchor,&rdquo; or existential crises triggered by the
            realization that you paid money for an inflatable anchor. Captain Chuck has
            experienced all of the above and considers them part of the boating lifestyle.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Returns &amp; Refunds</h2>
          <p>
            All sales are final. Much like deploying an inflatable anchor in a strong
            current &mdash; once it&apos;s out there, it&apos;s out there. We accept exchanges
            for products that arrive in a non-inflatable state (i.e., won&apos;t inflate at all).
            If your anchor inflates but does not anchor, that is not a defect. That is the
            product performing as designed. If you used the Rapid Deflator on your anchor,
            that is also not a defect. That is you using the Rapid Deflator on your anchor.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Warranty</h2>
          <p>
            All products come with our &ldquo;Good Faith Guarantee,&rdquo; which guarantees,
            in good faith, that we put a product in the box. The Good Faith Guarantee covers
            manufacturing defects (holes present at time of purchase, missing valves, wrong
            color). It does not cover: punctures, UV degradation, encounters with marine life,
            encounters with the Rapid Deflator, over-inflation, under-inflation, inflation
            by unauthorized pumps, use in conditions involving water, or acts of seagull.
            &ldquo;Acts of seagull&rdquo; is defined at Captain Chuck&apos;s sole discretion.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            All disputes shall be resolved by Captain Chuck Denton in his office (the dock).
            Chuck will listen to your complaint, consult the company handbook (a laminated
            index card that says &ldquo;The customer is always drifting&rdquo;), and render a
            decision within one to three tides. Appeals may be directed to Big Mike Portside,
            who will agree with Chuck. Further appeals may be submitted to the seagull on
            the router, who has never responded to anything and is unlikely to start now.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time, for any reason, without
            notice. In practice, we have never modified them because no one has ever read them,
            including us. If we do modify them, the changes will take effect immediately and
            will be announced via a message in a bottle launched from Pier Nowhere. If you
            receive the bottle, the terms have changed. If you don&apos;t receive the bottle,
            the terms have still changed. This is how maritime law works. Probably.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Update `src/sites/inflatableanchors/index.ts`**

```typescript
import InflatableAnchorsPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import InflatableAnchorsTerms, { metadata as termsMetadata } from "./pages/terms"
```

```typescript
"privacy": { component: InflatableAnchorsPrivacy, metadata: privacyMetadata },
"terms": { component: InflatableAnchorsTerms, metadata: termsMetadata },
```

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit
git add src/sites/inflatableanchors/pages/privacy.tsx src/sites/inflatableanchors/pages/terms.tsx src/sites/inflatableanchors/index.ts
git commit -m "feat(inflatableanchors): add privacy policy and terms of service"
```

---

### Task 12: Cart & Checkout Pages

**Files:**
- Create: `src/sites/inflatableanchors/pages/cart.tsx`
- Create: `src/sites/inflatableanchors/pages/checkout.tsx`
- Modify: `src/sites/inflatableanchors/index.ts`

- [ ] **Step 1: Create `src/sites/inflatableanchors/pages/cart.tsx`**

Follow the dehydratedwater cart pattern with inflatableanchors-themed fees:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/inflatableanchors/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const INFLATION_FEE = 2.99
const BUOYANCY_TAX_RATE = 0.035

export default function InflatableAnchorsCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const buoyancyTax = subtotal * BUOYANCY_TAX_RATE
  const total = subtotal + INFLATION_FEE + buoyancyTax

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Your Cart</h1>
          <p className="text-foreground/60 mb-8">
            Your cart is as empty as the space below an inflatable anchor. Which is to say: all of it. The whole ocean.
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
              <span>Inflation Fee</span>
              <span>${INFLATION_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Buoyancy Tax (3.5%)</span>
              <span>${buoyancyTax.toFixed(2)}</span>
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

- [ ] **Step 2: Create `src/sites/inflatableanchors/pages/checkout.tsx`**

```typescript
"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function InflatableAnchorsCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="text-6xl mb-8">⚓</div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Your Anchor Is Being Inflated
        </h1>
        <p className="text-foreground/70 mb-8">
          Captain Chuck is personally inflating your order using our patented EZ-Inflate™ hand pump.
          Each pump brings your anchor closer to deployment readiness. He is currently on pump 23 of 47.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-8">
          Estimated delivery: 3-5 business tides (weather permitting)
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Update `src/sites/inflatableanchors/index.ts`**

```typescript
import InflatableAnchorsCart from "./pages/cart"
import InflatableAnchorsCheckout from "./pages/checkout"
```

```typescript
"cart": InflatableAnchorsCart,
"checkout": InflatableAnchorsCheckout,
```

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit
git add src/sites/inflatableanchors/pages/cart.tsx src/sites/inflatableanchors/pages/checkout.tsx src/sites/inflatableanchors/index.ts
git commit -m "feat(inflatableanchors): add cart and checkout pages"
```

---

### Task 13: Final Barrel Export & Full Verification

**Files:**
- Modify: `src/sites/inflatableanchors/index.ts` (final state)

- [ ] **Step 1: Verify the final state of `src/sites/inflatableanchors/index.ts`**

The file should now look like this with all imports and page entries:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import InflatableAnchorsHome from "./pages/home"
import InflatableAnchorsProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import InflatableAnchorsAbout, { metadata as aboutMetadata } from "./pages/about"
import TheTechnology, { metadata as technologyMetadata } from "./pages/technology"
import CustomerStoriesPage, { metadata as customerStoriesMetadata } from "./pages/customer-stories"
import InflatableAnchorsFAQ, { metadata as faqMetadata } from "./pages/faq"
import InflatableAnchorsContact, { metadata as contactMetadata } from "./pages/contact"
import InflatableAnchorsPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import InflatableAnchorsTerms, { metadata as termsMetadata } from "./pages/terms"
import InflatableAnchorsCart from "./pages/cart"
import InflatableAnchorsCheckout from "./pages/checkout"

export { config }

export const pages: Record<string, PageEntry> = {
  "": InflatableAnchorsHome,
  "products": { component: InflatableAnchorsProducts, metadata: productsMetadata },
  "about": { component: InflatableAnchorsAbout, metadata: aboutMetadata },
  "the-technology": { component: TheTechnology, metadata: technologyMetadata },
  "customer-stories": { component: CustomerStoriesPage, metadata: customerStoriesMetadata },
  "faq": { component: InflatableAnchorsFAQ, metadata: faqMetadata },
  "contact": { component: InflatableAnchorsContact, metadata: contactMetadata },
  "privacy": { component: InflatableAnchorsPrivacy, metadata: privacyMetadata },
  "terms": { component: InflatableAnchorsTerms, metadata: termsMetadata },
  "cart": InflatableAnchorsCart,
  "checkout": InflatableAnchorsCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Inflatable Anchors Co.`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: No lint errors.

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: Build succeeds with no errors. All pages should compile.

- [ ] **Step 5: Full browser verification**

Test every page:
- `http://localhost:3000/?site=inflatableanchors` — Home
- `http://localhost:3000/products?site=inflatableanchors` — Products
- `http://localhost:3000/products/original?site=inflatableanchors` — Product detail
- `http://localhost:3000/about?site=inflatableanchors` — About
- `http://localhost:3000/the-technology?site=inflatableanchors` — Technology
- `http://localhost:3000/customer-stories?site=inflatableanchors` — Customer Stories
- `http://localhost:3000/faq?site=inflatableanchors` — FAQ
- `http://localhost:3000/contact?site=inflatableanchors` — Contact
- `http://localhost:3000/privacy?site=inflatableanchors` — Privacy
- `http://localhost:3000/terms?site=inflatableanchors` — Terms
- `http://localhost:3000/cart?site=inflatableanchors` — Cart (empty state)
- `http://localhost:3000/checkout?site=inflatableanchors` — Checkout

Also verify:
- Navigation links work between pages
- Cart add-to-cart works from product detail page
- Cart shows items after adding
- Footer links to privacy/terms work
- Apex landing page (`http://localhost:3000/`) shows inflatableanchors as a brand card

- [ ] **Step 6: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "feat(inflatableanchors): complete site implementation"
```

---

### Task 14: Add Placeholder Images

**Files:**
- Create: `public/sites/inflatableanchors/` directory with placeholder images

Note: The actual AI-generated images will be created separately using the image manifest at `docs/superpowers/specs/2026-03-28-inflatableanchors-images.md`. For now, create simple placeholder files so the site doesn't show broken images.

- [ ] **Step 1: Create the image directory**

```bash
mkdir -p public/sites/inflatableanchors
```

- [ ] **Step 2: Create a simple favicon placeholder**

Use a simple 1x1 orange PNG as a placeholder. Alternatively, copy a placeholder from another site:

```bash
cp public/sites/pigmilk/favicon.png public/sites/inflatableanchors/favicon.png
```

(This will be replaced with the real generated favicon later.)

- [ ] **Step 3: Commit placeholders**

```bash
git add public/sites/inflatableanchors/
git commit -m "chore(inflatableanchors): add placeholder favicon"
```

Note: Full image generation is a separate task using the image manifest. The site is functional without images — broken image placeholders will appear but all layout, navigation, and commerce features work.
