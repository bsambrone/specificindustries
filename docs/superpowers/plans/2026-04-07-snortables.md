# Snortables Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a commerce-enabled satirical site for "Snortables" — intranasal nutrient delivery products — following all existing conventions.

**Architecture:** New site module at `src/sites/snortables/` registered in the existing multi-subdomain platform. Commerce-enabled with cart, product detail dynamic routes, and ~42 generated images. Dark neon theme.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, existing shared component library

**Design Spec:** `docs/superpowers/specs/2026-04-07-snortables-design.md`

---

### Task 1: Site Config & Registration

**Files:**
- Create: `src/sites/snortables/config.ts`
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create site config**

Create `src/sites/snortables/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Snortables",
  subdomain: "snortables",
  theme: {
    preset: "dark",
    colors: {
      primary: "#00e5a0",
      secondary: "#0ea5e9",
      accent: "#f59e0b",
      background: "#0a0a0f",
      text: "#e8e8ec",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Snortables — Intranasal Nutrient Delivery",
    description: "Clinically optimized intranasal nutrient delivery for the modern human. Why eat when you can insufflate?",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "The Process", path: "/process" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create empty barrel file**

Create `src/sites/snortables/index.ts` (minimal — pages will be added in later tasks):

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"

export { config }

export const pages: Record<string, PageEntry> = {}
```

- [ ] **Step 3: Register in registry.ts**

Add the snortables import and entry to `src/sites/registry.ts`:

Add import at top with the other imports:
```typescript
import { config as snortablesConfig, pages as snortablesPages } from "./snortables"
```

Add entry to `siteRegistry` object:
```typescript
snortables: { config: snortablesConfig, pages: snortablesPages },
```

- [ ] **Step 4: Register in subdomains.ts**

Add `"snortables"` to the `VALID_SUBDOMAINS` array in `src/sites/subdomains.ts`:

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
] as const
```

- [ ] **Step 5: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 6: Commit**

```bash
git add src/sites/snortables/config.ts src/sites/snortables/index.ts src/sites/registry.ts src/sites/subdomains.ts
git commit -m "feat(snortables): add site config and registration"
```

---

### Task 2: Product Data

**Files:**
- Create: `src/sites/snortables/data/products.ts`

- [ ] **Step 1: Create products data file**

Create `src/sites/snortables/data/products.ts`:

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
  isSubscription?: boolean
}

export const products: Product[] = [
  {
    slug: "nasalfuel-original",
    name: "NasalFuel Original",
    price: 29.99,
    priceLabel: "$29.99 / month",
    tagline: "Complete nutrition. Zero chewing.",
    description: [
      "NasalFuel Original is the product that started the intranasal nutrition revolution. A complete meal replacement powder engineered for direct nasal delivery, bypassing the entire digestive system like the evolutionary bottleneck it is.",
      "Each dose contains 100% of your daily recommended nutrients, atomized to a precise 0.3 micron particle size for maximum mucosal absorption. Our patented NasalAbsorb™ technology ensures nutrients enter your bloodstream 340% faster than primitive oral consumption.",
      "Simply measure, prepare, and insufflate. Within seconds, you'll feel the unmistakable sensation of complete nutrition entering your body through a hole that was never designed for this purpose. That tingling means it's working.",
    ],
    image: "/sites/snortables/product-nasalfuel-original.png",
    scienceFacts: [
      { label: "Particle Size", value: "0.3 microns" },
      { label: "Nostril Compatibility", value: "Universal" },
      { label: "Absorption Rate", value: "340% faster than eating" },
      { label: "Chewing Required", value: "0%" },
      { label: "FDA Status", value: "Unanswered emails" },
      { label: "Asbestos Content", value: "Negligible" },
    ],
    isSubscription: true,
  },
  {
    slug: "the-full-bird",
    name: "The Full Bird",
    price: 44.99,
    priceLabel: "$44.99",
    tagline: "Lyophilized avian protein substrate for rapid intranasal uptake.",
    description: [
      "Our newest product leverages controlled intranasal insufflation of a lyophilized avian protein substrate, enabling rapid nutrient uptake via pulmonary gas-exchange interface. In simpler terms: it's snortable turkey.",
      "Each packet contains one full Thanksgiving turkey — bones, stuffing, cranberry sauce, and that weird gelatin thing your aunt brings — freeze-dried and pulverized into a fine powder optimized for nasal delivery. We destroyed a perfectly good dinner so you don't have to eat it.",
      "The Full Bird delivers the complete Thanksgiving experience in under 3 seconds. Side effects may include nostalgic sneezing, involuntary gratitude, and a faint gravy smell that lingers for up to 72 hours.",
    ],
    image: "/sites/snortables/product-the-full-bird.png",
    scienceFacts: [
      { label: "Turkey Content", value: "1 full bird" },
      { label: "Stuffing", value: "Included (pulverized)" },
      { label: "Cranberry Sauce", value: "Atomized" },
      { label: "Gravy Aroma Duration", value: "72 hours" },
      { label: "Tryptophan Delivery", value: "Instant drowsiness" },
      { label: "Family Argument", value: "Not included" },
    ],
  },
  {
    slug: "sunday-roast",
    name: "Sunday Roast",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "An entire roast beef dinner, pulverized for your convenience.",
    description: [
      "Sunday Roast is a complete roast beef dinner — prime rib, Yorkshire pudding, roasted potatoes, gravy, green beans, and a dinner roll — reduced to a fine inhalable powder through our proprietary NasalMill™ process.",
      "Each batch begins with a restaurant-quality meal prepared by actual chefs who have no idea what we're about to do to their work. The look on their faces when the wood chipper arrives is something we've learned to live with.",
      "Perfect for busy professionals who value nutrition but refuse to allocate jaw movement time in their productivity stack. One insufflation delivers the caloric equivalent of a full Sunday dinner. The gravy boat is optional but we include it for texture.",
    ],
    image: "/sites/snortables/product-sunday-roast.png",
    scienceFacts: [
      { label: "Courses Included", value: "5 (pulverized)" },
      { label: "Gravy Boat Fragments", value: "Trace amounts" },
      { label: "Chef Approval", value: "Revoked" },
      { label: "Yorkshire Pudding Status", value: "Powdered" },
      { label: "Particle Size", value: "0.3 microns" },
      { label: "Dignity", value: "Not included" },
    ],
  },
  {
    slug: "hydrosnort",
    name: "HydroSnort",
    price: 14.99,
    priceLabel: "$14.99",
    tagline: "Like getting water up your nose at the pool, but optimized.",
    description: [
      "HydroSnort is the world's first nasally-delivered hydration solution. We took the universally unpleasant experience of getting water up your nose and repackaged it as a wellness product. You're welcome.",
      "Enhanced with electrolytes, minerals, and what our lab technicians describe as 'a concerning amount of sodium,' HydroSnort delivers hydration directly to your nasal mucosa. Your body absorbs it immediately, mostly because it has no choice.",
      "Why drink eight glasses of water a day when you can snort eight carefully measured doses? HydroSnort: because your nose was just sitting there doing nothing productive anyway.",
    ],
    image: "/sites/snortables/product-hydrosnort.png",
    scienceFacts: [
      { label: "Hydration Efficiency", value: "Pool-adjacent" },
      { label: "Electrolytes", value: "Aggressive amounts" },
      { label: "Drowning Risk", value: "Technically non-zero" },
      { label: "Pool Flashbacks", value: "Common side effect" },
      { label: "Water Content", value: "Dehydrated (ironic)" },
      { label: "Lifeguard Approved", value: "Absolutely not" },
    ],
  },
  {
    slug: "greenrush",
    name: "GreenRush",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "Your daily vegetables, bypassing the digestive middleman.",
    description: [
      "GreenRush combines kale, spinach, wheatgrass, spirulina, and chlorella into a vibrant green powder specifically calibrated for nasal delivery. It's everything your body needs and everything your nose didn't ask for.",
      "Each dose delivers 12 servings of vegetables directly to your bloodstream, completely bypassing the digestive system — or as we call it, 'the middleman.' Why process nutrients through 30 feet of intestine when you have two perfectly good nostrils?",
      "Warning: GreenRush may cause temporary green-tinted nasal discharge. This is normal and actually quite beautiful in the right light. Our users report that their sinuses have never been more nutrient-dense.",
    ],
    image: "/sites/snortables/product-greenrush.png",
    scienceFacts: [
      { label: "Vegetable Servings", value: "12 per dose" },
      { label: "Kale Content", value: "Punitive" },
      { label: "Sinus Color Change", value: "Expected (green)" },
      { label: "Intestine Usage", value: "0%" },
      { label: "Smugness Increase", value: "400%" },
      { label: "Flavor", value: "Irrelevant (nasal delivery)" },
    ],
  },
  {
    slug: "morningrail",
    name: "MorningRail",
    price: 24.99,
    priceLabel: "$24.99",
    tagline: "Why wait for absorption through your primitive stomach?",
    description: [
      "MorningRail is 200mg of pure caffeine in a precision-ground nasal powder. It hits your bloodstream in under 8 seconds — roughly 47 minutes faster than your pour-over setup, and without the insufferable ritual.",
      "Developed for productivity maximizers who view coffee brewing as an unacceptable bottleneck in their morning routine. Each packet replaces approximately 2.5 cups of coffee, one alarm clock, and all remaining social norms around breakfast.",
      "MorningRail users report a 94% reduction in time spent in kitchens, a 300% increase in morning alertness, and a 100% increase in coworkers asking 'are you okay?' The answer is yes. You've never been more okay.",
    ],
    image: "/sites/snortables/product-morningrail.png",
    scienceFacts: [
      { label: "Caffeine", value: "200mg (immediate)" },
      { label: "Onset Time", value: "8 seconds" },
      { label: "Coffee Rituals Eliminated", value: "All of them" },
      { label: "Eye Twitching", value: "Character-building" },
      { label: "Social Acceptability", value: "Declining" },
      { label: "Productivity Gain", value: "Yes (legally required disclaimer: no)" },
    ],
  },
  {
    slug: "jolt",
    name: "JOLT",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "Definitely not derived from coca leaves. We cannot stress this enough.",
    description: [
      "JOLT is our premium energy formula. Let us be very, very clear: it is not derived from coca leaves. It has never been near coca leaves. We don't even know what coca leaves look like. If you showed us a coca leaf, we would not recognize it. This is important.",
      "What JOLT IS made from is a proprietary blend of B-vitamins, taurine, ginseng, and an ingredient our lab calls 'compound X' because they lost the original label. It delivers an immediate, sustained energy boost that users describe as 'extremely noticeable' and 'why is my heart doing that.'",
      "JOLT is the preferred energy solution for professionals who need to be extremely alert for extended periods. It is 100% legal in most jurisdictions. We checked. Several times. With different lawyers.",
    ],
    image: "/sites/snortables/product-jolt.png",
    scienceFacts: [
      { label: "Coca Leaf Content", value: "ABSOLUTELY ZERO" },
      { label: "Energy Duration", value: "4-6 hours (or days)" },
      { label: "Heart Rate Increase", value: "Noticeable" },
      { label: "Legal Status", value: "We have checked repeatedly" },
      { label: "Compound X", value: "Classified" },
      { label: "Lawyers Consulted", value: "14" },
    ],
  },
  {
    slug: "brotein",
    name: "BroTein",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "Skip the shake. Skip the stomach. Skip leg day too, we're not your mom.",
    description: [
      "BroTein delivers 50g of whey protein isolate directly to your bloodstream via nasal insufflation. No shaker bottle. No chalky aftertaste. No 45-minute digestive window before your workout. Just pure, instantaneous gains.",
      "Engineered for athletes who have optimized every other aspect of their routine and are now looking at their nose thinking 'what if?' BroTein bypasses the digestive system entirely, delivering amino acids to your muscles in under 30 seconds.",
      "Each packet is formulated for pre-workout, post-workout, mid-workout, and — for our most dedicated users — during-meeting consumption. The discreet matte-black packaging ensures no one at the office will ask questions. They will have questions, but they won't ask them.",
    ],
    image: "/sites/snortables/product-brotein.png",
    scienceFacts: [
      { label: "Protein", value: "50g (instant delivery)" },
      { label: "Gains", value: "Immediate" },
      { label: "Shaker Bottle Required", value: "Never again" },
      { label: "Gym Bro Approval", value: "Enthusiastic" },
      { label: "Leg Day Compliance", value: "Not our department" },
      { label: "Nasal Swoleness", value: "Possible" },
    ],
  },
  {
    slug: "tiny-nostrils",
    name: "Tiny Nostrils",
    price: 19.99,
    priceLabel: "$19.99",
    tagline: "Children's vitamins. Now with less asbestos than our competitors!",
    description: [
      "Tiny Nostrils is our pediatric vitamin line, specially formulated for smaller nasal passages. Each dose contains Vitamins A through K, iron, zinc, and what we're calling 'the fun stuff' (calcium, mostly, but also some glitter).",
      "We know what you're thinking: 'Should children be snorting vitamin powder?' And the answer is: we're not doctors. But we ARE optimists, and we believe that if adults can enjoy intranasal nutrient delivery, why should kids miss out? Now with less asbestos than our competitors use!",
      "Tiny Nostrils comes in three exciting flavors: Strawberry Sneeze, Grape Gust, and Orange You Glad You Didn't Eat This. Each packet includes a fun sticker and a child-sized Precision Delivery Apparatus.",
    ],
    image: "/sites/snortables/product-tiny-nostrils.png",
    scienceFacts: [
      { label: "Vitamins", value: "A through K (we skipped a few)" },
      { label: "Asbestos", value: "Less than competitors!" },
      { label: "Glitter Content", value: "Non-zero" },
      { label: "Pediatrician Approval", value: "Pending (since 2024)" },
      { label: "Fun Sticker", value: "Included" },
      { label: "Parenting Judgment", value: "Not our place" },
    ],
  },
  {
    slug: "creme-brulee-blast",
    name: "Crème Brûlée Blast",
    price: 27.99,
    priceLabel: "$27.99",
    tagline: "Dessert for your sinuses. Pairs with a 2019 Bordeaux, also available in snortable form.",
    description: [
      "Crème Brûlée Blast is the world's first nasally-delivered dessert experience. We took a classic French custard, caramelized the sugar, freeze-dried the entire thing, and pulverized it into a fine powder suitable for intranasal consumption. The French have not responded to our letters.",
      "Each dose delivers the complete crème brûlée experience: the rich vanilla custard, the crackling caramel top, and the faint sense of culinary superiority. The caramelized sugar particles may cause minor sinus irritation, which our users describe as 'the crackle.'",
      "Pairs beautifully with a 2019 Bordeaux (also available in snortable form, coming Q3 2027). Serve after dinner, or instead of dinner, or alone in your car at 2 AM. We don't judge. We pulverize desserts for a living.",
    ],
    image: "/sites/snortables/product-creme-brulee-blast.png",
    scienceFacts: [
      { label: "Custard Quality", value: "French (they deny this)" },
      { label: "Caramel Crackle", value: "Audible in sinuses" },
      { label: "Sugar Content", value: "Dessert-appropriate" },
      { label: "Wine Pairing", value: "2019 Bordeaux (snortable)" },
      { label: "French Approval", value: "Letters unreturned" },
      { label: "Emotional Eating", value: "Emotional snorting, technically" },
    ],
  },
  {
    slug: "the-sampler",
    name: "The Sampler Pack",
    price: 59.99,
    priceLabel: "$59.99",
    tagline: "12 varieties + a complimentary Precision Delivery Apparatus.",
    description: [
      "The Sampler Pack includes trial-size portions of all 12 Snortables products, packaged in a sleek matte-black case with individual compartments for each variety. It's the perfect way to discover which powdered meal you enjoy snorting most.",
      "Also included: a complimentary Precision Delivery Apparatus (a small mirror and a stainless steel straw) in a velvet-lined carrying case. We considered calling it something else but our branding team said 'just lean into it.'",
      "The Sampler Pack makes an excellent gift for the person who has everything except a reasonable relationship with food. Ships in discreet packaging that says 'Definitely Just Vitamins' on the exterior.",
    ],
    image: "/sites/snortables/product-the-sampler.png",
    scienceFacts: [
      { label: "Varieties Included", value: "12" },
      { label: "Mirror", value: "Complimentary" },
      { label: "Stainless Steel Straw", value: "Complimentary" },
      { label: "Velvet Case", value: "Yes, velvet" },
      { label: "Discreet Packaging", value: "\"Definitely Just Vitamins\"" },
      { label: "Gift Potential", value: "Friendship-ending" },
    ],
  },
  {
    slug: "nasalfuel-prime",
    name: "NasalFuel Prime",
    price: 79.99,
    priceLabel: "$79.99 / month",
    tagline: "Monthly auto-delivery with escalating dosage recommendations.",
    description: [
      "NasalFuel Prime is our premium subscription tier. Every month, you receive a curated selection of Snortables products delivered to your door in a matte-black box that your neighbors will definitely have opinions about.",
      "What sets Prime apart is our Escalating Dosage Protocol™. Each month, we increase your recommended daily intake by 15% based on our proprietary algorithm that factors in your usage patterns, moon phases, and a random number generator we found online.",
      "Prime members also receive exclusive access to experimental products before public release, a quarterly 'State of Your Nostrils' report (generated by AI, reviewed by no one), and priority customer support via our encrypted messaging channel (it's just WhatsApp).",
    ],
    image: "/sites/snortables/product-nasalfuel-prime.png",
    scienceFacts: [
      { label: "Monthly Dosage Increase", value: "15% (compounding)" },
      { label: "Subscription", value: "Difficult to cancel" },
      { label: "Nostril Report", value: "AI-generated, unreviewed" },
      { label: "Experimental Products", value: "Early access (untested)" },
      { label: "Support Channel", value: "WhatsApp (\"encrypted\")" },
      { label: "Moon Phase Factor", value: "Waxing gibbous optimal" },
    ],
    isSubscription: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const filtered = products.filter((p) => p.slug !== slug)
  // Deterministic selection based on slug hash to avoid hydration mismatch
  const index = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const start = index % filtered.length
  const result: Product[] = []
  for (let i = 0; i < count && i < filtered.length; i++) {
    result.push(filtered[(start + i) % filtered.length])
  }
  return result
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/snortables/data/products.ts
git commit -m "feat(snortables): add product catalog with 12 products"
```

---

### Task 3: Testimonials & Leadership Data

**Files:**
- Create: `src/sites/snortables/data/testimonials.ts`
- Create: `src/sites/snortables/data/leadership.ts`

- [ ] **Step 1: Create testimonials data**

Create `src/sites/snortables/data/testimonials.ts`:

```typescript
export interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    quote: "I used to waste 45 minutes a day CHEWING. Now I snort my meals in seconds and use that time to optimize my LinkedIn presence.",
    name: "Marcus Chen",
    title: "Growth Hacker & Biohacker",
    image: "/sites/snortables/testimonial-marcus-chen.png",
  },
  {
    quote: "As a competitive eater, Snortables let me consume 40% more calories per hour by freeing up my mouth for the actual competition.",
    name: "Chad Gullet",
    title: "Nathan's Hot Dog Contest Runner-Up",
    image: "/sites/snortables/testimonial-chad-gullet.png",
  },
  {
    quote: "I snorted the Sunday Roast at my wedding reception. My wife left me but my macros were IMMACULATE.",
    name: "Derek Pullman",
    title: "Divorced But Optimized",
    image: "/sites/snortables/testimonial-derek-pullman.png",
  },
  {
    quote: "My doctor said 'please stop doing this.' But my OTHER doctor — the one I found on Reddit — said it's fine.",
    name: "Tamara Voss",
    title: "Wellness Influencer",
    image: "/sites/snortables/testimonial-tamara-voss.png",
  },
  {
    quote: "I replaced all solid food with Snortables six months ago. I've lost 30 pounds and the ability to taste, but my quarterly review was phenomenal.",
    name: "Jason Kile",
    title: "Senior VP of Nothing Specific",
    image: "/sites/snortables/testimonial-jason-kile.png",
  },
  {
    quote: "Gave Tiny Nostrils to my kids. They haven't complained once. They also haven't spoken to me in weeks but I'm sure that's unrelated.",
    name: "Brenda Faulk",
    title: "Mother of the Year (Self-Awarded)",
    image: "/sites/snortables/testimonial-brenda-faulk.png",
  },
  {
    quote: "I brought JOLT to my corporate retreat. HR wants to 'have a conversation' but my presentation was 3 hours of pure fire.",
    name: "Ryan Ashford",
    title: "Suspended Account Executive",
    image: "/sites/snortables/testimonial-ryan-ashford.png",
  },
  {
    quote: "Finally, a product that understands the nasal cavity is the most underutilized organ in the human body.",
    name: "Dr. Patricia Hollowell",
    title: "Unlicensed Nutritionist",
    image: "/sites/snortables/testimonial-patricia-hollowell.png",
  },
  {
    quote: "I snorted HydroSnort instead of drinking water for a month. The ER doctors called it 'unprecedented' which I'm choosing to take as a compliment.",
    name: "Kyle Brandt",
    title: "Hydration Pioneer",
    image: "/sites/snortables/testimonial-kyle-brandt.png",
  },
  {
    quote: "MorningRail replaced my coffee, my alarm clock, and my will to engage in normal human breakfast rituals.",
    name: "Simone Archer",
    title: "4am Productivity Blogger",
    image: "/sites/snortables/testimonial-simone-archer.png",
  },
  {
    quote: "The Crème Brûlée Blast made me cry. Not from emotion — from the caramelized sugar particles. But also from emotion.",
    name: "François Delacroix",
    title: "Pastry Chef (Retired Under Duress)",
    image: "/sites/snortables/testimonial-francois-delacroix.png",
  },
  {
    quote: "My gym banned me for snorting BroTein in the locker room. I now work out in my garage and I've never been more powerful.",
    name: "Tony Mazetti",
    title: "Garage Gym Evangelist",
    image: "/sites/snortables/testimonial-tony-mazetti.png",
  },
  {
    quote: "I'm a food critic and I've never been more conflicted. The Full Bird has incredible terroir but the delivery mechanism concerns me professionally.",
    name: "Eleanor Whittaker",
    title: "Michelin-Adjacent Reviewer",
    image: "/sites/snortables/testimonial-eleanor-whittaker.png",
  },
  {
    quote: "Snortables saved my marriage. We used to argue about what's for dinner. Now we just argue about my 'powder hobby.'",
    name: "Greg & Diane Hofstra",
    title: "Couples Therapy Regulars",
    image: "/sites/snortables/testimonial-greg-diane-hofstra.png",
  },
  {
    quote: "I've been using GreenRush for 6 months. My sinuses are green now. Like, literally green. But I feel INCREDIBLE.",
    name: "Asher Bloom",
    title: "Organic Lifestyle Advocate",
    image: "/sites/snortables/testimonial-asher-bloom.png",
  },
  {
    quote: "I tried to explain Snortables to my grandmother. She called the police. Five stars.",
    name: "Nina Cabrera",
    title: "Early Adopter",
    image: "/sites/snortables/testimonial-nina-cabrera.png",
  },
]

/** First 6 testimonials shown on homepage */
export const homepageTestimonials = testimonials.slice(0, 6)
```

- [ ] **Step 2: Create leadership data**

Create `src/sites/snortables/data/leadership.ts`:

```typescript
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: string
}

export const executives: Executive[] = [
  {
    slug: "phelps",
    name: "Dr. Garrett Phelps",
    title: "Chief Insufflation Officer",
    bio: "Dr. Phelps founded Snortables after spending 18 months in his garage asking a question no one else was brave enough to ask: 'What if we just bypassed the entire mouth?' He holds no relevant degrees but insists on the 'Dr.' prefix. His previous ventures include a failed meal-kit company and a brief, unsuccessful career in competitive eating.",
    quote: "Every great innovation was called 'unsafe' and 'please stop' at first.",
    image: "/sites/snortables/exec-phelps.png",
    referencePerson: "bill",
  },
  {
    slug: "whitfield",
    name: "Marcus Whitfield",
    title: "VP of Nostril Engineering",
    bio: "Marcus joined Snortables after a distinguished career in HVAC ductwork, which he claims is 'basically the same thing but for buildings.' He leads our Nostril Engineering division, a team of three people who spend their days measuring nasal passages and arguing about optimal particle sizes. He has never once questioned his career choices, at least not publicly.",
    quote: "The human nose has 400 olfactory receptors. We're only using 12 of them for food. That's a market inefficiency.",
    image: "/sites/snortables/exec-whitfield.png",
    referencePerson: "brandon",
  },
  {
    slug: "kowalski",
    name: "Darren Kowalski",
    title: "Head of Pulverization Sciences",
    bio: "Darren oversees all pulverization operations at Snortables, including the NasalMill™, three industrial wood chippers, and a blender he brought from home. Before joining the company, he worked in demolition, which he says 'really prepared me for what we do to food here.' He is the only team member who has been formally asked to smile less during the pulverization process.",
    quote: "People ask me if I feel bad about putting a Thanksgiving dinner in a wood chipper. I do not.",
    image: "/sites/snortables/exec-kowalski.png",
    referencePerson: "jim",
  },
  {
    slug: "nakamura",
    name: "Trevor Nakamura",
    title: "Director of Regulatory Avoidance",
    bio: "Trevor manages Snortables' relationship with regulatory bodies, which he describes as 'mostly one-sided.' He has drafted 47 responses to FDA inquiries, none of which have been sent. His legal strategy can be summarized as 'if we don't open the letters, they can't technically say we've been notified.' He previously worked in compliance, which he found too restrictive.",
    quote: "We prefer the term 'creatively compliant.'",
    image: "/sites/snortables/exec-nakamura.png",
    referencePerson: "sean",
  },
]
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/snortables/data/testimonials.ts src/sites/snortables/data/leadership.ts
git commit -m "feat(snortables): add testimonials and leadership data"
```

---

### Task 4: Homepage

**Files:**
- Create: `src/sites/snortables/pages/home.tsx`
- Modify: `src/sites/snortables/index.ts`

- [ ] **Step 1: Create homepage**

Create `src/sites/snortables/pages/home.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { MetricCounter } from "@/components/ui/metric-counter"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/snortables/data/products"
import { homepageTestimonials } from "@/sites/snortables/data/testimonials"
import { getSiteHref } from "@/lib/site-href"

const featuredSlugs = ["nasalfuel-original", "the-full-bird", "sunday-roast", "jolt", "brotein", "creme-brulee-blast"]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default async function SnortablesHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <Hero
        headline="Why Eat When You Can Insufflate?"
        subheadline="Clinically optimized intranasal nutrient delivery for the modern human."
        ctaText="Shop Products"
        ctaHref="/products"
        secondaryCtaText="See The Science"
        secondaryCtaHref="/process"
        image="/sites/snortables/hero.png"
        dark
      />

      {/* Social Proof Metrics */}
      <section className="py-12 px-4 border-b border-primary/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricCounter value={2.4} suffix="M" label="Nostrils Served" compact />
          <MetricCounter value={99.7} suffix="%" label="Nostril Satisfaction" />
          <MetricCounter value={0} label="FDA Investigations (This Quarter)" />
          <MetricCounter value={4.3} label="Micron Avg Particle Size" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-foreground/60 mb-12">Three steps. No chewing. No dignity. No problem.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-5xl font-heading font-bold text-primary">1</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Choose Your Powder</h3>
              <p className="text-foreground/60">Browse our catalog of 12 meticulously pulverized meals, beverages, and desserts.</p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-heading font-bold text-primary">2</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Prepare Your Line</h3>
              <p className="text-foreground/60">Measure your dose using our Precision Delivery Apparatus. Accuracy matters.</p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-heading font-bold text-primary">3</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Insufflate & Thrive</h3>
              <p className="text-foreground/60">Experience the future of nutrition. Tingling means it&apos;s working.</p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href={siteHref("/process")}
              className="text-primary font-semibold hover:underline"
            >
              See our full process &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* The Science */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">The Science</h2>
          <p className="text-lg text-foreground/70 leading-relaxed mb-4">
            Our patented NasalAbsorb™ technology leverages the nasal mucosa&apos;s 150cm² surface area for 340% faster nutrient uptake than primitive oral consumption. The nasal epithelium provides direct access to the bloodstream, bypassing the gastrointestinal tract entirely.
          </p>
          <p className="text-lg text-foreground/70 leading-relaxed mb-4">
            Each Snortables product is milled to a precise 0.3 micron particle size — small enough for optimal mucosal absorption, large enough to avoid what our engineers call &quot;the sneeze threshold.&quot;
          </p>
          <p className="text-sm text-foreground/40 italic">
            These statements have not been evaluated by the FDA. These statements have not been read by the FDA. The FDA has blocked our email address.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-background border border-primary/10 rounded-lg p-6 flex gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-foreground/80 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-sm font-semibold text-primary">{t.name}</p>
                  <p className="text-xs text-foreground/50">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={siteHref("/testimonials")}
              className="text-primary font-semibold hover:underline"
            >
              See all testimonials &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Stop Chewing?"
        description="Join the intranasal nutrition revolution. Subscribe to NasalFuel Prime for monthly auto-delivery with escalating dosage recommendations."
        ctaText="Get NasalFuel Prime"
        ctaHref="/products"
      />
    </>
  )
}
```

- [ ] **Step 2: Update barrel to include homepage**

Update `src/sites/snortables/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import SnortablesHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SnortablesHome,
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/snortables/pages/home.tsx src/sites/snortables/index.ts
git commit -m "feat(snortables): add homepage with metrics, products, science, testimonials"
```

---

### Task 5: Products Page & Product Detail

**Files:**
- Create: `src/sites/snortables/pages/products.tsx`
- Create: `src/sites/snortables/pages/product-detail.tsx`
- Modify: `src/sites/snortables/index.ts`

- [ ] **Step 1: Create products listing page**

Create `src/sites/snortables/pages/products.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/snortables/data/products"

export const metadata = {
  title: "Products — Snortables",
  description: "Browse our full catalog of intranasal nutrient delivery products.",
}

export default function SnortablesProducts() {
  return (
    <>
      <Hero
        headline="Our Products"
        subheadline="12 meticulously pulverized options for every nostril."
        dark
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

Create `src/sites/snortables/pages/product-detail.tsx`:

```typescript
import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "@/sites/snortables/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

const addToCartQuips = [
  "Loaded into your nasal queue!",
  "Your nostrils thank you.",
  "Added! Your sinuses are tingling with anticipation.",
  "Insufflation incoming!",
  "One step closer to never chewing again.",
  "Your nose just got an upgrade.",
  "Powder secured. Nostrils on standby.",
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
          <div className="relative aspect-square rounded-lg overflow-hidden bg-primary/5">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority fetchPriority="high" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/60 mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-2">{product.priceLabel}</p>
            {product.isSubscription && (
              <p className="text-sm text-accent mb-4">&#9733; Subscription — auto-delivered monthly</p>
            )}
            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-4 bg-primary text-background rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                quips={addToCartQuips}
              />
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Science Facts */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="max-w-md mx-auto">
          <div className="border-2 border-foreground p-4">
            <h2 className="text-2xl font-heading font-bold text-foreground border-b-8 border-foreground pb-1 mb-2">
              Science Facts
            </h2>
            <p className="text-sm text-foreground/60 border-b border-foreground pb-2 mb-2">
              Serving Size: 1 insufflation (if you dare)
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
              * These facts are not facts. Not evaluated by the FDA. Not evaluated by anyone with credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center mb-8">You Might Also Insufflate</h2>
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

- [ ] **Step 3: Update barrel with products pages and dynamic routes**

Update `src/sites/snortables/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import SnortablesHome from "./pages/home"
import SnortablesProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SnortablesHome,
  "products": { component: SnortablesProducts, metadata: productsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Snortables`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 4: Update registry.ts to include dynamicRoutes**

Update the snortables import in `src/sites/registry.ts`:

Change:
```typescript
import { config as snortablesConfig, pages as snortablesPages } from "./snortables"
```
To:
```typescript
import { config as snortablesConfig, pages as snortablesPages, dynamicRoutes as snortablesDynamicRoutes } from "./snortables"
```

Change the registry entry:
```typescript
snortables: { config: snortablesConfig, pages: snortablesPages },
```
To:
```typescript
snortables: { config: snortablesConfig, pages: snortablesPages, dynamicRoutes: snortablesDynamicRoutes },
```

- [ ] **Step 5: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 6: Commit**

```bash
git add src/sites/snortables/pages/products.tsx src/sites/snortables/pages/product-detail.tsx src/sites/snortables/index.ts src/sites/registry.ts
git commit -m "feat(snortables): add products page and product detail dynamic route"
```

---

### Task 6: The Process Page

**Files:**
- Create: `src/sites/snortables/pages/process.tsx`
- Modify: `src/sites/snortables/index.ts`

- [ ] **Step 1: Create process page**

Create `src/sites/snortables/pages/process.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"

export const metadata = {
  title: "The Process — Snortables",
  description: "From Farm to Nostril™. See how we pulverize perfectly good meals into snortable powder.",
}

const steps = [
  {
    title: "Step 1: Sourcing",
    description:
      "Our procurement specialists identify only the finest prepared meals for destruction. Each dish is evaluated on flavor, presentation, and pulverizability. We visit Michelin-starred restaurants, award-winning bakeries, and your grandmother's kitchen. We do not tell them what we're about to do.",
    image: "/sites/snortables/process-sourcing.png",
  },
  {
    title: "Step 2: Acquisition",
    description:
      "Every ingredient is hand-selected and immediately condemned to the NasalMill™. We do not accept returns. The turkeys have been claimed. Our acquisition team operates with speed and enthusiasm that local grocery store managers have described as 'alarming' and 'please stop running.'",
    image: "/sites/snortables/process-acquisition.png",
  },
  {
    title: "Step 3: Pulverization",
    description:
      "Our proprietary NasalMill™ technology reduces any meal to 0.3 micron particles in under 4 seconds. The gravy boat is optional but we include it for texture. Our Head of Pulverization Sciences, Darren Kowalski, personally oversees each batch with what coworkers describe as 'concerning enthusiasm.'",
    image: "/sites/snortables/process-pulverization.png",
  },
  {
    title: "Step 4: Quality Control",
    description:
      "Every batch undergoes rigorous intranasal bioavailability testing. Our quality team personally tests each product. They insist on it. We've tried to get them to stop. Each sample is analyzed for particle consistency, nasal compatibility, and what our lab calls 'the sneeze factor.'",
    image: "/sites/snortables/process-quality.png",
  },
  {
    title: "Step 5: Packaging",
    description:
      "Each dose is precision-measured to 0.01g for optimal nostril delivery. Our packaging is discreet, professional, and absolutely does not warrant the attention it receives from postal inspectors. Every packet is sealed in our signature matte-black material and stamped with a batch number for traceability (and plausible deniability).",
    image: "/sites/snortables/process-packaging.png",
  },
  {
    title: "Step 6: Shipping",
    description:
      "Discreet delivery within 2-3 business days. We ship at night because our drivers prefer it, not because of any legal requirement to do so. Each order arrives in an unmarked box that says 'Definitely Just Vitamins' on the exterior. Our logistics team has a 99.7% delivery success rate. The other 0.3% were intercepted, and our lawyers are handling it.",
    image: "/sites/snortables/process-shipping.png",
  },
]

export default function SnortablesProcess() {
  return (
    <>
      <Hero
        headline="From Farm to Nostril™"
        subheadline="Our vertically integrated pulverization pipeline ensures every particle meets our exacting standards."
        dark
      />

      {steps.map((step, i) => (
        <ImageTextSection
          key={step.title}
          image={step.image}
          title={step.title}
          description={step.description}
          imagePosition={i % 2 === 0 ? "left" : "right"}
          imageAspect="aspect-[3/2]"
        />
      ))}
    </>
  )
}
```

- [ ] **Step 2: Update barrel**

Add to imports in `src/sites/snortables/index.ts`:
```typescript
import SnortablesProcess, { metadata as processMetadata } from "./pages/process"
```

Add to pages map:
```typescript
"process": { component: SnortablesProcess, metadata: processMetadata },
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/snortables/pages/process.tsx src/sites/snortables/index.ts
git commit -m "feat(snortables): add The Process page with 6-step farm-to-nostril flow"
```

---

### Task 7: Testimonials Page

**Files:**
- Create: `src/sites/snortables/pages/testimonials.tsx`
- Modify: `src/sites/snortables/index.ts`

- [ ] **Step 1: Create testimonials page**

Create `src/sites/snortables/pages/testimonials.tsx`:

```typescript
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { testimonials } from "@/sites/snortables/data/testimonials"

export const metadata = {
  title: "Testimonials — Snortables",
  description: "Real stories from real customers who snort their meals.",
}

export default function SnortablesTestimonials() {
  return (
    <>
      <Hero
        headline="Customer Testimonials"
        subheadline="Real stories from real people who made the switch from eating to insufflating."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-primary/5 border border-primary/10 rounded-lg p-6 flex gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-foreground/80 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-semibold text-primary">{t.name}</p>
                <p className="text-xs text-foreground/50">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 text-center">
        <p className="text-foreground/40 text-sm max-w-lg mx-auto">
          All testimonials are from real customers who provided written consent and, in some cases, court-ordered documentation. Names may have been changed to protect the insufflated.
        </p>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Update barrel**

Add to imports in `src/sites/snortables/index.ts`:
```typescript
import SnortablesTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
```

Add to pages map:
```typescript
"testimonials": { component: SnortablesTestimonials, metadata: testimonialsMetadata },
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/snortables/pages/testimonials.tsx src/sites/snortables/index.ts
git commit -m "feat(snortables): add testimonials page with 16 customer stories"
```

---

### Task 8: About Page

**Files:**
- Create: `src/sites/snortables/pages/about.tsx`
- Modify: `src/sites/snortables/index.ts`

- [ ] **Step 1: Create about page**

Create `src/sites/snortables/pages/about.tsx`:

```typescript
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"
import { executives } from "@/sites/snortables/data/leadership"

export const metadata = {
  title: "About — Snortables",
  description: "The story of how we disrupted nutrition, one nostril at a time.",
}

const timelineItems = [
  { year: "2023", description: "Founded in a garage. Asked to leave the garage." },
  { year: "2023", description: "First successful turkey pulverization." },
  { year: "2024", description: "Launched NasalFuel Original. Received first cease-and-desist." },
  { year: "2024", description: "Expanded to 12 products. Received seventh cease-and-desist." },
  { year: "2025", description: "2.4M nostrils served. Legal team expanded to 14 people." },
  { year: "2026", description: "Introduced NasalFuel Prime. CEO described by Forbes as 'alarmingly confident.'" },
]

export default function SnortablesAbout() {
  return (
    <>
      <Hero
        headline="Disrupting Nutrition, One Nostril at a Time"
        subheadline="Founded in 2023 by people who looked at a perfectly good meal and thought: what if we destroyed this and snorted it?"
        dark
      />

      {/* Origin Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-heading font-bold text-primary">Our Origin Story</h2>
          <p className="text-foreground/80 leading-relaxed">
            It started with a simple question that no one was brave enough to ask: &quot;What if we bypassed the entire mouth?&quot;
          </p>
          <p className="text-foreground/80 leading-relaxed">
            In 2023, a group of biohackers realized they were wasting precious seconds — sometimes entire minutes — moving their jaws up and down to process nutrients. Chewing, they argued, was an evolutionary dead end. A relic of a time before we understood the untapped potential of the human nostril.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            After 18 months in a garage (and two restraining orders from the FDA), Snortables was born. Our founding team pulverized their first turkey on a Tuesday afternoon using a wood chipper borrowed from a neighbor who has since moved away. The results were, in the words of our Chief Insufflation Officer, &quot;technically edible, nasally.&quot;
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Today, Snortables serves over 2.4 million nostrils worldwide. We&apos;ve pulverized thousands of perfectly good meals, employed 14 lawyers, and received more cease-and-desist letters than any other nutrition company in history. We frame them all.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-xl text-foreground/80 font-heading leading-relaxed">
            &quot;To liberate humanity from the tyranny of chewing.&quot;
          </p>
          <p className="text-foreground/60 mt-4">
            Oral consumption is an evolutionary bottleneck. The future of nutrition is intranasal, and we&apos;re building it — one pulverized meal at a time.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Leadership Team
          </h2>
          <div className="space-y-16">
            {executives.map((exec, i) => (
              <div
                key={exec.slug}
                className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="relative w-full md:w-56 aspect-[4/5] rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={exec.image}
                    alt={exec.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-bold text-secondary">{exec.name}</h3>
                  <p className="text-accent font-semibold mb-3">{exec.title}</p>
                  <p className="text-foreground/70 leading-relaxed mb-4">{exec.bio}</p>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/60">
                    &ldquo;{exec.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">Company Timeline</h2>
        </div>
        <Timeline items={timelineItems} />
      </section>
    </>
  )
}
```

- [ ] **Step 2: Update barrel**

Add to imports in `src/sites/snortables/index.ts`:
```typescript
import SnortablesAbout, { metadata as aboutMetadata } from "./pages/about"
```

Add to pages map:
```typescript
"about": { component: SnortablesAbout, metadata: aboutMetadata },
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/snortables/pages/about.tsx src/sites/snortables/index.ts
git commit -m "feat(snortables): add about page with origin story, leadership, timeline"
```

---

### Task 9: Contact Page

**Files:**
- Create: `src/sites/snortables/pages/contact.tsx`
- Modify: `src/sites/snortables/index.ts`

- [ ] **Step 1: Create contact page**

Create `src/sites/snortables/pages/contact.tsx`:

```typescript
"use client"

import { useState } from "react"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Contact — Snortables",
  description: "Get in touch with the Snortables team.",
}

const faqItems = [
  {
    question: "Is this legal?",
    answer: "Our Director of Regulatory Avoidance assures us that the answer is 'technically not illegal in most jurisdictions.' We have checked. Several times. With different lawyers.",
  },
  {
    question: "Can I snort two products at once?",
    answer: "We call this 'stacking' and while we cannot officially recommend it, our quality control team does it constantly. Results vary. Side effects may include 'flavor confusion' and 'ambitious sneezing.'",
  },
  {
    question: "Why does my mail carrier look at me like that?",
    answer: "We have no control over the judgmental expressions of postal service employees. Our packaging clearly states 'Definitely Just Vitamins.' If that doesn't satisfy them, nothing will.",
  },
  {
    question: "Is this the same as cocaine?",
    answer: "No. Absolutely not. We cannot stress this enough. Snortables are a nutrient delivery system. Cocaine is an illegal narcotic. The only similarities are the delivery mechanism, the packaging aesthetic, and the enthusiasm of our user base. That's it.",
  },
  {
    question: "Can I return a product?",
    answer: "All sales are final. You cannot un-snort a turkey. We've tried. The physics don't work.",
  },
]

const inquiryReasons = [
  "Product question",
  "Bulk order (no questions asked)",
  "Adverse nasal event",
  "Legal inquiry (please specify jurisdiction)",
  "I snorted something that wasn't Snortables and need guidance",
  "Partnership opportunity",
  "Noise complaint about our pulverization facility",
]

export default function SnortablesContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Hero
        headline="Get In Touch"
        subheadline="Not with the powder — with us."
        dark
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
                <p className="text-4xl">👃</p>
                <p className="text-xl font-heading font-bold text-primary">
                  Message received!
                </p>
                <p className="text-foreground/70">
                  Our team will respond within 2-3 business insufflations.
                </p>
                <p className="text-foreground/50 text-sm">
                  Your message has been printed, pulverized into a fine powder, and snorted by our customer service team. They will absorb its contents nasally and respond accordingly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const confirmed = window.confirm(
                    "Are you sure you want to contact Snortables?\n\n" +
                    "By clicking OK, you acknowledge that:\n" +
                    "• Our response may arrive in powder form\n" +
                    "• Response times are measured in 'insufflation cycles'\n" +
                    "• This message may be used as evidence in future regulatory proceedings\n\n" +
                    "Proceed?"
                  )
                  if (confirmed) setSubmitted(true)
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
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-background rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
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
                src="/sites/snortables/contact.png"
                alt="Snortables customer support center"
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Address
                </h3>
                <p className="text-foreground">1337 Insufflation Blvd, Suite 420, San Francisco, CA 94107</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Phone
                </h3>
                <p className="text-foreground">1-800-SNORT-IT</p>
                <p className="text-sm text-foreground/70">
                  Please hold. The hold music is just the sound of a wood chipper.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Email
                </h3>
                <p className="text-primary">help@snortables.specificindustries.com</p>
                <p className="text-[10px] text-foreground/50 mt-1">
                  Or reach a real human:{" "}
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
                  Monday-Friday, 6am-10pm (we never sleep, the JOLT won&apos;t let us)
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Nasal Emergency Hotline
                </h3>
                <p className="text-foreground">
                  Available 24/7. Staffed by our quality control team. They&apos;re already up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Update barrel**

Add to imports in `src/sites/snortables/index.ts`:
```typescript
import SnortablesContact, { metadata as contactMetadata } from "./pages/contact"
```

Add to pages map:
```typescript
"contact": { component: SnortablesContact, metadata: contactMetadata },
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/snortables/pages/contact.tsx src/sites/snortables/index.ts
git commit -m "feat(snortables): add contact page with form, FAQ, and details"
```

---

### Task 10: Cart & Checkout Pages

**Files:**
- Create: `src/sites/snortables/pages/cart.tsx`
- Create: `src/sites/snortables/pages/checkout.tsx`
- Modify: `src/sites/snortables/index.ts`

- [ ] **Step 1: Create cart page**

Create `src/sites/snortables/pages/cart.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/snortables/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const NOSTRIL_PREP_FEE = 4.99
const INSUFFLATION_TAX_RATE = 0.042

export default function SnortablesCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const insufflationTax = subtotal * INSUFFLATION_TAX_RATE
  const total = subtotal + NOSTRIL_PREP_FEE + insufflationTax

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Your Cart</h1>
          <p className="text-foreground/60 mb-8">
            Your nostrils are tragically empty.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
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

        <div className="divide-y divide-primary/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-primary/5 shrink-0">
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
              <span>Nostril Preparation Fee</span>
              <span>${NOSTRIL_PREP_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Insufflation Tax (4.2%)</span>
              <span>${insufflationTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-primary/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
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

Create `src/sites/snortables/pages/checkout.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function SnortablesCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image src="/sites/snortables/checkout-construction.png" alt="Under construction" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Our Payment System Is Being Pulverized
        </h1>
        <p className="text-foreground/70 mb-8">
          Unfortunately, our checkout infrastructure is still being processed through the NasalMill™.
          Our engineers assure us it will be ready once they figure out how to snort a credit card transaction.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-8">
          Estimated completion: When our Director of Regulatory Avoidance finishes reading the mail.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to Products
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Update barrel**

Add to imports in `src/sites/snortables/index.ts`:
```typescript
import SnortablesCart from "./pages/cart"
import SnortablesCheckout from "./pages/checkout"
```

Add to pages map:
```typescript
"cart": SnortablesCart,
"checkout": SnortablesCheckout,
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add src/sites/snortables/pages/cart.tsx src/sites/snortables/pages/checkout.tsx src/sites/snortables/index.ts
git commit -m "feat(snortables): add cart and checkout pages"
```

---

### Task 11: Privacy & Terms Pages

**Files:**
- Create: `src/sites/snortables/pages/privacy.tsx`
- Create: `src/sites/snortables/pages/terms.tsx`
- Modify: `src/sites/snortables/index.ts`

- [ ] **Step 1: Create privacy page**

Create `src/sites/snortables/pages/privacy.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Snortables",
  description: "Our privacy policy. We know what you snorted.",
}

export default function SnortablesPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="We take your privacy as seriously as we take intranasal nutrient delivery. Which is to say: very seriously, in a way that concerns most people."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-primary/5 border border-primary/10 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: Whenever our legal team stops crying.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. What We Collect</h2>
          <p>
            We collect your name, email, shipping address, nostril dimensions (for product optimization),
            preferred insufflation hand (left or right), and a detailed log of every product you&apos;ve
            snorted, including timestamps, quantities, and any involuntary facial expressions captured
            by our website&apos;s webcam integration (which we have not disclosed until this sentence).
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. What We Don&apos;t Collect</h2>
          <p>
            Judgment. We are in no position. We run a company that pulverizes Thanksgiving dinners
            into snortable powder. If you&apos;re here, you&apos;ve already made a series of choices
            that put you beyond the reach of conventional privacy concerns.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Data Sharing</h2>
          <p>
            We share your data with our partners, which currently include our lawyer, a guy named Dave
            who runs our shipping van, and an AI model that generates your quarterly &quot;State of Your
            Nostrils&quot; report. We may also share your data with regulatory bodies, but only if they
            figure out how to open our encrypted files (password: snortables123).
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Cookies</h2>
          <p>
            We considered snortable cookies but the focus group was... unsettling. Instead, we use
            standard digital cookies to track your browsing behavior, purchase history, and how long
            you hover over the JOLT product page before closing the tab and reopening it four times.
            We see you. We understand. Just buy it.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Your Rights</h2>
          <p>
            You have the right to request deletion of your data. We have the right to pulverize that
            request into a fine powder and insufflate it. Under GDPR, CCPA, and several other acronyms
            our legal team pretends to understand, you may request a copy of all data we hold about you.
            It will arrive in powder form, consistent with our brand.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Security</h2>
          <p>
            Your data is stored on servers protected by 256-bit encryption and a guy named Dave who
            also does our shipping. Dave is very reliable. He has never lost a package or a database.
            Our security has been audited by an independent firm that we found on Craigslist and have
            not heard from since.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Changes to This Policy</h2>
          <p>
            We reserve the right to change this policy at any time. Changes will be communicated by
            updating this page, which no one reads, and by including a small note in your next shipment,
            which no one reads either. Your continued use of Snortables constitutes acceptance of whatever
            we&apos;ve written here, including this sentence, which is legally binding.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create terms page**

Create `src/sites/snortables/pages/terms.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Snortables",
  description: "Our terms of use. You cannot un-snort a turkey.",
}

export default function SnortablesTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By reading this sentence, you have already agreed. There is no going back. The powder has been measured."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-primary/5 border border-primary/10 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: After the incident.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptable Use</h2>
          <p>
            Snortables are for nasal use only. We are not responsible for &quot;creative applications&quot;
            described in your TikTok. Products should be insufflated using the provided Precision Delivery
            Apparatus or a reasonable facsimile thereof. &quot;Reasonable&quot; does not include garden hoses,
            leaf blowers, or industrial vacuum systems, all of which have been attempted by customers and
            none of which we endorse.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Liability</h2>
          <p>
            By purchasing Snortables you acknowledge that you are voluntarily snorting a powdered meal
            and that this is, objectively, a strange thing to do. Snortables Inc. is not liable for any
            adverse effects including but not limited to: sneezing, sinus discoloration, involuntary
            food memories, nostalgic episodes triggered by the Sunday Roast, or the gradual alienation
            of friends and family who &quot;just don&apos;t get it.&quot;
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Product Disclaimers</h2>
          <p>
            Our products are not FDA-approved. They are not doctor-recommended. They are not endorsed
            by any medical professional, nutritionist, or person with a functioning sense of self-preservation.
            The &quot;Science Facts&quot; on our product pages are not facts. The science is not science.
            If you make health decisions based on anything you read on this website, that is entirely on you,
            and frankly, we admire your commitment.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Refund Policy</h2>
          <p>
            All sales are final. You cannot un-snort a turkey. We have consulted with physicists and they
            confirm that the thermodynamic arrow of time prevents the reversal of intranasal nutrient delivery.
            If you are unsatisfied with your purchase, you may write a strongly worded letter to our
            Director of Regulatory Avoidance, who will add it to his collection.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, product formulas, the concept of
            snorting a roast beef dinner, and the phrase &quot;From Farm to Nostril™&quot; — is the
            intellectual property of Snortables Inc. We use the term &quot;intellectual&quot; aspirationally.
            NasalMill™, NasalAbsorb™, NasalFuel™, and &quot;Why Eat When You Can Insufflate?&quot; are
            trademarks of Snortables, a Specific Industries company.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            Any disputes arising from these terms shall be resolved through binding arbitration conducted
            in our pulverization facility. The arbitrator will be selected by our Head of Pulverization
            Sciences, who will also operate the wood chipper during proceedings. His decision is final.
            The wood chipper is also final.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of California, or whichever jurisdiction
            our Director of Regulatory Avoidance is currently avoiding. In the event of a conflict between
            state, federal, and international law, we will defer to whichever interpretation allows us
            to continue pulverizing food and selling it as nasal powder. We have lawyers. Fourteen of them.
            They are tired.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Update barrel**

Add to imports in `src/sites/snortables/index.ts`:
```typescript
import SnortablesPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import SnortablesTerms, { metadata as termsMetadata } from "./pages/terms"
```

Add to pages map:
```typescript
"privacy": { component: SnortablesPrivacy, metadata: privacyMetadata },
"terms": { component: SnortablesTerms, metadata: termsMetadata },
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add src/sites/snortables/pages/privacy.tsx src/sites/snortables/pages/terms.tsx src/sites/snortables/index.ts
git commit -m "feat(snortables): add privacy and terms pages"
```

---

### Task 12: Final Barrel File & Build Verification

**Files:**
- Modify: `src/sites/snortables/index.ts` (final version with all pages)

- [ ] **Step 1: Verify final barrel file has all pages**

The final `src/sites/snortables/index.ts` should look like this (verify all imports and pages are present):

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import SnortablesHome from "./pages/home"
import SnortablesProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import SnortablesProcess, { metadata as processMetadata } from "./pages/process"
import SnortablesTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import SnortablesAbout, { metadata as aboutMetadata } from "./pages/about"
import SnortablesContact, { metadata as contactMetadata } from "./pages/contact"
import SnortablesCart from "./pages/cart"
import SnortablesCheckout from "./pages/checkout"
import SnortablesPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import SnortablesTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SnortablesHome,
  "products": { component: SnortablesProducts, metadata: productsMetadata },
  "process": { component: SnortablesProcess, metadata: processMetadata },
  "testimonials": { component: SnortablesTestimonials, metadata: testimonialsMetadata },
  "about": { component: SnortablesAbout, metadata: aboutMetadata },
  "contact": { component: SnortablesContact, metadata: contactMetadata },
  "cart": SnortablesCart,
  "checkout": SnortablesCheckout,
  "privacy": { component: SnortablesPrivacy, metadata: privacyMetadata },
  "terms": { component: SnortablesTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Snortables`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: No lint errors (or only pre-existing ones)

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Manual smoke test**

Run: `npm run dev`
Visit: `http://localhost:3000/?site=snortables`
Verify: Homepage renders with dark theme, neon green primary color, all sections visible (images will be missing placeholders — that's expected)

Navigate to each page via nav:
- `/?site=snortables` — homepage
- `/products?site=snortables` — products grid
- `/process?site=snortables` — process page
- `/testimonials?site=snortables` — testimonials page
- `/about?site=snortables` — about page
- `/contact?site=snortables` — contact form
- `/cart?site=snortables` — empty cart
- `/privacy?site=snortables` — privacy policy
- `/terms?site=snortables` — terms of use

---

### Task 13: Generate Product Images (12 images)

**Files:**
- Create: `public/sites/snortables/product-*.png` (12 files)

Uses MCP tool `generate_image` for each product. All 1024x1024.

- [ ] **Step 1: Generate product images**

Generate each product image using the `generate_image` MCP tool. Each prompt should describe sleek matte-black packaging with neon green/cyan accents on a dark background. Include the product name on the packaging.

Products to generate (12 total):
1. `product-nasalfuel-original` — Sleek matte-black packet labeled "NasalFuel Original" with electric green accents, dark reflective surface, futuristic wellness product photography
2. `product-the-full-bird` — Matte-black packet labeled "The Full Bird" with neon accents, subtle turkey silhouette graphic, dark background, product photography
3. `product-sunday-roast` — Matte-black packet labeled "Sunday Roast" with amber/gold accents, dark background, premium product photography
4. `product-hydrosnort` — Translucent blue-tinted matte-black packet labeled "HydroSnort" with cyan water droplet graphics, dark background
5. `product-greenrush` — Matte-black packet labeled "GreenRush" with vibrant green leaf graphics and neon accents, dark background
6. `product-morningrail` — Matte-black packet labeled "MorningRail" with warm amber coffee-colored accents, dark background, morning energy aesthetic
7. `product-jolt` — Bold matte-black packet labeled "JOLT" with electric yellow/red warning-style accents, high energy aesthetic, dark background
8. `product-brotein` — Matte-black packet labeled "BroTein" with cyan/green accents, muscular/athletic aesthetic, dark background
9. `product-tiny-nostrils` — Colorful matte-black packet labeled "Tiny Nostrils" with playful child-friendly colors (still on dark background), smaller packet size
10. `product-creme-brulee-blast` — Elegant matte-black packet labeled "Crème Brûlée Blast" with gold/cream accents, dessert sophistication, dark background
11. `product-the-sampler` — Premium matte-black box/case labeled "The Sampler Pack" containing multiple smaller packets, mirror and straw visible, dark background
12. `product-nasalfuel-prime` — Premium matte-black packet labeled "NasalFuel Prime" with gold trim and electric green accents, premium tier aesthetic, dark background

- [ ] **Step 2: Move generated images to public directory**

```bash
mkdir -p public/sites/snortables
cp generated-images/product-*.png public/sites/snortables/
```

- [ ] **Step 3: Commit**

```bash
git add public/sites/snortables/product-*.png
git commit -m "chore(snortables): add generated product images"
```

---

### Task 14: Generate Hero, Favicon, Contact & Checkout Images

**Files:**
- Create: `public/sites/snortables/hero.png`
- Create: `public/sites/snortables/favicon.png`
- Create: `public/sites/snortables/contact.png`
- Create: `public/sites/snortables/checkout-construction.png`

- [ ] **Step 1: Generate hero image**

Use `generate_image` MCP tool (1536x1024):
Prompt: "Sleek product photography of multiple matte-black powder packets arranged on a reflective dark surface with electric green and cyan neon lighting, futuristic biohacker aesthetic, moody dark background, professional product lineup shot"

Filename: `hero`

- [ ] **Step 2: Generate favicon**

Use `generate_image` MCP tool (1024x1024):
Prompt: "Minimalist icon design of a stylized nostril or nose with a powder particle trail, electric green color on transparent/dark background, app icon style, simple geometric"

Filename: `favicon`

- [ ] **Step 3: Generate contact image**

Use `generate_image` MCP tool (1536x1024):
Prompt: "A professional call center with customer support agents wearing hazmat suits and safety goggles while taking phone calls at modern desks with headsets, fluorescent lighting, dark moody office with neon green accent lighting, satirical corporate photography"

Filename: `contact`

- [ ] **Step 4: Generate checkout construction image**

Use `generate_image` MCP tool (1024x1024):
Prompt: "A matte-black credit card being fed into a small industrial wood chipper with powder coming out the other side, neon green lighting, dark background, satirical product photography, under construction concept"

Filename: `checkout-construction`

- [ ] **Step 5: Move to public directory**

```bash
cp generated-images/hero.png generated-images/favicon.png generated-images/contact.png generated-images/checkout-construction.png public/sites/snortables/
```

- [ ] **Step 6: Commit**

```bash
git add public/sites/snortables/hero.png public/sites/snortables/favicon.png public/sites/snortables/contact.png public/sites/snortables/checkout-construction.png
git commit -m "chore(snortables): add hero, favicon, contact, and checkout images"
```

---

### Task 15: Generate Process Images (6 images with base people)

**Files:**
- Create: `public/sites/snortables/process-*.png` (6 files)

Uses MCP tool `generate_image_with_person`. All 1536x1024.

- [ ] **Step 1: Generate process-sourcing**

Use `generate_image_with_person` MCP tool:
- Person: `sean`
- Prompt: "A man in a lab coat and safety goggles inspecting a beautifully plated roast beef dinner at a fine dining restaurant, taking notes on a clipboard, waitstaff looking concerned in background, warm restaurant lighting mixed with clinical inspection aesthetic"
- Width: 1536, Height: 1024
- Filename: `process-sourcing`

- [ ] **Step 2: Generate process-acquisition**

Use `generate_image_with_person` MCP tool:
- Person: `jim`
- Prompt: "A man hauling armfuls of whole Thanksgiving turkeys out of a grocery store, beaming with joy, shopping carts overflowing with turkeys in background, bright grocery store lighting, enthusiastic expression"
- Width: 1536, Height: 1024
- Filename: `process-acquisition`

- [ ] **Step 3: Generate process-pulverization**

Use `generate_image_with_person` MCP tool:
- Person: `bill`
- Prompt: "A man feeding a complete roast beef dinner with gravy boat into an industrial wood chipper, grinning maniacally, cloud of fine powder spraying out, industrial facility with neon green accent lighting, dramatic action shot"
- Width: 1536, Height: 1024
- Filename: `process-pulverization`

- [ ] **Step 4: Generate process-quality**

Use `generate_image_with_person` MCP tool:
- Person: `brandon`
- Prompt: "A man in a full hazmat suit carefully examining a line of white powder on a stainless steel laboratory table, microscope and scientific instruments around him, clinical lab setting with blue-tinted lighting, serious scientific inspection pose"
- Width: 1536, Height: 1024
- Filename: `process-quality`

- [ ] **Step 5: Generate process-packaging**

Use `generate_image_with_person` MCP tool:
- Person: `sean`
- Prompt: "A man in a clean room suit carefully portioning powder into sleek matte-black packets on a conveyor belt, comically oversized rubber stamp reading DEFINITELY NOT SUSPICIOUS visible on the workstation, clean room environment with neon green accent lighting"
- Width: 1536, Height: 1024
- Filename: `process-packaging`

- [ ] **Step 6: Generate process-shipping**

Use `generate_image_with_person` MCP tool:
- Person: `jim`
- Prompt: "A man loading unmarked matte-black boxes into a van at night, giving a thumbs up to camera, the van has small text on the side reading Snortables, nighttime urban loading dock setting, dramatic shadows and neon green accent lighting"
- Width: 1536, Height: 1024
- Filename: `process-shipping`

- [ ] **Step 7: Move to public directory**

```bash
cp generated-images/process-*.png public/sites/snortables/
```

- [ ] **Step 8: Commit**

```bash
git add public/sites/snortables/process-*.png
git commit -m "chore(snortables): add generated process images featuring team"
```

---

### Task 16: Generate Leadership Portraits (4 images with base people)

**Files:**
- Create: `public/sites/snortables/exec-*.png` (4 files)

Uses MCP tool `generate_image_with_person`. All 1024x1024.

- [ ] **Step 1: Generate exec-phelps (bill)**

Use `generate_image_with_person` MCP tool:
- Person: `bill`
- Prompt: "Professional corporate headshot portrait of a man in a dark suit with an electric green pocket square, confident smirk, dark moody background with subtle neon green accent lighting, CEO executive portrait style"
- Width: 1024, Height: 1024
- Filename: `exec-phelps`

- [ ] **Step 2: Generate exec-whitfield (brandon)**

Use `generate_image_with_person` MCP tool:
- Person: `brandon`
- Prompt: "Professional corporate headshot portrait of a man in a dark turtleneck with a lab coat over it, thoughtful expression, dark moody background with subtle cyan accent lighting, tech executive portrait style"
- Width: 1024, Height: 1024
- Filename: `exec-whitfield`

- [ ] **Step 3: Generate exec-kowalski (jim)**

Use `generate_image_with_person` MCP tool:
- Person: `jim`
- Prompt: "Professional corporate headshot portrait of a man in industrial work coveralls with a matte-black hard hat, enthusiastic grin, dark moody background with amber accent lighting, industrial executive portrait style"
- Width: 1024, Height: 1024
- Filename: `exec-kowalski`

- [ ] **Step 4: Generate exec-nakamura (sean)**

Use `generate_image_with_person` MCP tool:
- Person: `sean`
- Prompt: "Professional corporate headshot portrait of a man in a sharp dark suit with a slightly loosened tie, knowing smirk, dark moody background with subtle electric green accent lighting, smooth corporate executive portrait style"
- Width: 1024, Height: 1024
- Filename: `exec-nakamura`

- [ ] **Step 5: Move to public directory**

```bash
cp generated-images/exec-*.png public/sites/snortables/
```

- [ ] **Step 6: Commit**

```bash
git add public/sites/snortables/exec-*.png
git commit -m "chore(snortables): add generated leadership portraits"
```

---

### Task 17: Generate Testimonial Portraits (16 images)

**Files:**
- Create: `public/sites/snortables/testimonial-*.png` (16 files)

Uses MCP tool `generate_image` (no base people — unique fictional characters). All 1024x1024.

- [ ] **Step 1: Generate all 16 testimonial portraits**

Use `generate_image` MCP tool for each. Each prompt should describe a realistic headshot portrait matching the character's persona, warm lighting, neutral background.

1. `testimonial-marcus-chen` — "Headshot portrait of a young Asian-American man in his late 20s, tech startup casual wear, confident expression, warm lighting, neutral background"
2. `testimonial-chad-gullet` — "Headshot portrait of a burly Caucasian man in his 30s, competitive eating vibes, bold expression, warm lighting, neutral background"
3. `testimonial-derek-pullman` — "Headshot portrait of a fit Caucasian man in his early 30s, athletic wear, slightly dazed but proud expression, warm lighting, neutral background"
4. `testimonial-tamara-voss` — "Headshot portrait of a stylish woman in her late 20s, wellness influencer aesthetic, bright smile, warm lighting, neutral background"
5. `testimonial-jason-kile` — "Headshot portrait of a corporate man in his 40s, ill-fitting suit, tired but determined expression, warm lighting, neutral background"
6. `testimonial-brenda-faulk` — "Headshot portrait of a suburban mom in her late 30s, forced smile, slightly concerned eyes, warm lighting, neutral background"
7. `testimonial-ryan-ashford` — "Headshot portrait of an energetic man in his early 30s, rumpled business casual, wild-eyed enthusiasm, warm lighting, neutral background"
8. `testimonial-patricia-hollowell` — "Headshot portrait of a woman in her 50s with reading glasses, pseudo-academic look, knowing expression, warm lighting, neutral background"
9. `testimonial-kyle-brandt` — "Headshot portrait of an athletic young man in his mid-20s, sporty casual wear, overly enthusiastic expression, warm lighting, neutral background"
10. `testimonial-simone-archer` — "Headshot portrait of a sharp-featured woman in her early 30s, minimalist professional style, intense focused expression, warm lighting, neutral background"
11. `testimonial-francois-delacroix` — "Headshot portrait of a French man in his 40s, chef's coat partially visible, emotional expression, warm lighting, neutral background"
12. `testimonial-tony-mazetti` — "Headshot portrait of a muscular Italian-American man in his 30s, tank top, confident gym-bro expression, warm lighting, neutral background"
13. `testimonial-eleanor-whittaker` — "Headshot portrait of an elegant woman in her 50s, sophisticated attire, skeptical but intrigued expression, warm lighting, neutral background"
14. `testimonial-greg-diane-hofstra` — "Headshot portrait of a middle-aged couple together, slightly strained smiles, matching polo shirts, warm lighting, neutral background"
15. `testimonial-asher-bloom` — "Headshot portrait of a man in his late 20s with a slightly green-tinted nose, organic/natural style clothing, enthusiastic expression, warm lighting, neutral background"
16. `testimonial-nina-cabrera` — "Headshot portrait of a young Latina woman in her early 20s, tech-savvy casual style, amused expression, warm lighting, neutral background"

- [ ] **Step 2: Move to public directory**

```bash
cp generated-images/testimonial-*.png public/sites/snortables/
```

- [ ] **Step 3: Commit**

```bash
git add public/sites/snortables/testimonial-*.png
git commit -m "chore(snortables): add generated testimonial portraits"
```

---

### Task 18: Final Build & Push

- [ ] **Step 1: Run full type check**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds, all pages generate correctly

- [ ] **Step 4: Smoke test all pages**

Run: `npm run dev`
Visit each page and verify images load, theme looks correct, commerce works:
- `/?site=snortables` — homepage with hero, metrics, products, science, testimonials, CTA
- `/products?site=snortables` — full 12-product grid
- `/products/nasalfuel-original?site=snortables` — product detail with science facts and add-to-cart
- `/process?site=snortables` — 6-step process with team photos
- `/testimonials?site=snortables` — 16 testimonials with portraits
- `/about?site=snortables` — origin story, mission, 4 executives, timeline
- `/contact?site=snortables` — form, FAQ, contact details, bsambrone@gmail.com in small print
- `/cart?site=snortables` — empty cart message, then add items and verify cart works
- `/checkout?site=snortables` — fake checkout with progress bar
- `/privacy?site=snortables` — privacy policy with specificindustries.com link
- `/terms?site=snortables` — terms with specificindustries.com link

- [ ] **Step 5: Push to main**

```bash
git push origin main
```
