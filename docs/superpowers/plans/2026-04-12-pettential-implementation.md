# Pettential Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Pettential site — a satire pet performance brand with 25 products across 6 divisions, a services page with pricing tiers, and a shared animal portrait pool.

**Architecture:** New site at `src/sites/pettential/` following the existing multi-subdomain pattern. Commerce-enabled with dynamic product detail routes at `/shop/[slug]`. New shared module `src/data/animal-portraits.ts` parallels the existing human testimonial portrait system.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, existing shared components

**Spec:** `docs/superpowers/specs/2026-04-12-pettential-site-design.md`

---

### Task 1: Shared Animal Portrait Pool

**Files:**
- Create: `src/data/animal-portraits.ts`

This is a new shared module that parallels `src/data/testimonial-portraits.ts`. It will be used by Pettential and future sites.

- [ ] **Step 1: Create the animal portraits module**

```typescript
// src/data/animal-portraits.ts
export interface AnimalPortrait {
  slug: string
  name: string
  species: string
  image: string
}

export const animalPortraits: AnimalPortrait[] = [
  { slug: "gerald-goldfish",    name: "Gerald",   species: "Goldfish",  image: "/shared/animal-testimonials/gerald-goldfish.png" },
  { slug: "linda-tortoise",     name: "Linda",    species: "Tortoise",  image: "/shared/animal-testimonials/linda-tortoise.png" },
  { slug: "kevin-snake",        name: "Kevin",    species: "Snake",     image: "/shared/animal-testimonials/kevin-snake.png" },
  { slug: "diane-parrot",       name: "Diane",    species: "Parrot",    image: "/shared/animal-testimonials/diane-parrot.png" },
  { slug: "steve-sloth",        name: "Steve",    species: "Sloth",     image: "/shared/animal-testimonials/steve-sloth.png" },
  { slug: "barbara-cow",        name: "Barbara",  species: "Cow",       image: "/shared/animal-testimonials/barbara-cow.png" },
  { slug: "dennis-hamster",     name: "Dennis",   species: "Hamster",   image: "/shared/animal-testimonials/dennis-hamster.png" },
  { slug: "patricia-cat",       name: "Patricia", species: "Cat",       image: "/shared/animal-testimonials/patricia-cat.png" },
  { slug: "frank-pigeon",       name: "Frank",    species: "Pigeon",    image: "/shared/animal-testimonials/frank-pigeon.png" },
  { slug: "margaret-chicken",   name: "Margaret", species: "Chicken",   image: "/shared/animal-testimonials/margaret-chicken.png" },
  { slug: "doug-dog",           name: "Doug",     species: "Dog",       image: "/shared/animal-testimonials/doug-dog.png" },
  { slug: "cynthia-goat",       name: "Cynthia",  species: "Goat",      image: "/shared/animal-testimonials/cynthia-goat.png" },
]

export function getAnimalPortrait(slug: string): AnimalPortrait | undefined {
  return animalPortraits.find((p) => p.slug === slug)
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to animal-portraits.ts

- [ ] **Step 3: Commit**

```bash
git add src/data/animal-portraits.ts
git commit -m "feat: add shared animal portrait pool for cross-site animal testimonials"
```

---

### Task 2: Site Config & Data Files

**Files:**
- Create: `src/sites/pettential/config.ts`
- Create: `src/sites/pettential/data/products.ts`
- Create: `src/sites/pettential/data/leadership.ts`
- Create: `src/sites/pettential/data/testimonials.ts`
- Create: `src/sites/pettential/data/services.ts`

- [ ] **Step 1: Create the site config**

```typescript
// src/sites/pettential/config.ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Pettential",
  subdomain: "pettential",
  theme: {
    preset: "athletic",
    colors: {
      primary: "#CCFF00",
      secondary: "#1A1A1A",
      accent: "#FF3366",
      background: "#FAFAFA",
      text: "#111111",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Pettential — Elevating Every Animal to Its Full Potential™",
    description: "A premium pet performance brand with products and coaching services across six divisions. Because stagnation is a choice.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Team", path: "/leadership" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create the product catalog**

```typescript
// src/sites/pettential/data/products.ts
export type Division =
  | "aquatic"
  | "serpent"
  | "avian"
  | "reptile"
  | "farm"
  | "corporate"

export interface DivisionInfo {
  key: Division
  label: string
  emoji: string
  tagline: string
  color: string
}

export const divisions: DivisionInfo[] = [
  { key: "aquatic",   label: "Aquatic Performance",          emoji: "🐟", tagline: "Peak performance, zero oxygen required.",                      color: "#CCFF00" },
  { key: "serpent",   label: "Serpent Workplace Solutions",   emoji: "🐍", tagline: "Professional development for the limbless professional.",      color: "#FF3366" },
  { key: "avian",     label: "Avian Professional Development",emoji: "🐦", tagline: "Fly higher. Professionally.",                                 color: "#00CCFF" },
  { key: "reptile",   label: "Reptile Fitness & Mobility",   emoji: "🐢", tagline: "Slow progress is still... no, it's just slow.",               color: "#FFB800" },
  { key: "farm",      label: "Farm Animal Lifestyle Upgrades",emoji: "🐄", tagline: "Because every animal deserves a morning routine.",            color: "#88DD44" },
  { key: "corporate", label: "Corporate Pets Division",       emoji: "🐈", tagline: "Bringing startup culture to your living room.",               color: "#AA77FF" },
]

export interface SpecItem {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string
  division: Division
  flagship: boolean
  specs: SpecItem[]
  heroImage: string
}

export const products: Product[] = [
  // ── Aquatic Performance ───────────────────────────────────
  {
    slug: "goldfish-treadmill-pro",
    name: "Goldfish Treadmill Pro™",
    price: 249.99,
    priceLabel: "$249.99",
    tagline: "Because stagnation is a choice.",
    description: "The Goldfish Treadmill Pro™ is the world's first submersible cardio platform designed specifically for freshwater athletes. Featuring a single speed setting (slow), zero incline options, and a real-time performance dashboard that displays identical results every single day, the GTP™ gives your goldfish the tools to achieve what they were already doing — but with accountability. Includes a waterproof motivational speaker that plays affirmations every 3 seconds. Your goldfish will not notice.",
    division: "aquatic",
    flagship: true,
    specs: [
      { label: "Speed Settings", value: "1 (slow)" },
      { label: "Incline", value: "None" },
      { label: "Battery Life", value: "Longer than the fish" },
      { label: "Performance Dashboard", value: "Yes (shows identical results daily)" },
      { label: "Warranty", value: "3 years or 1 fish lifetime, whichever is shorter" },
    ],
    heroImage: "/sites/pettential/products/goldfish-treadmill-pro.png",
  },
  {
    slug: "aquarium-standing-desk",
    name: "Aquarium Standing Desk™",
    price: 199.99,
    priceLabel: "$199.99",
    tagline: "Improves posture, reduces float fatigue.",
    description: "Your fish has been floating horizontally for its entire life. The Aquarium Standing Desk™ introduces vertical workspace orientation to the aquatic professional, promoting spinal alignment in an animal with no spine. Features an adjustable height range of 2-6 inches and a built-in document holder for memos your fish cannot read. Studies show zero correlation between desk orientation and fish productivity, which we consider a baseline.",
    division: "aquatic",
    flagship: false,
    specs: [
      { label: "Height Range", value: "2–6 inches (adjustable)" },
      { label: "Material", value: "Marine-grade acrylic" },
      { label: "Weight Capacity", value: "0.02 lbs (one fish)" },
      { label: "Assembly Required", value: "Yes (fish cannot help)" },
    ],
    heroImage: "/sites/pettential/products/aquarium-standing-desk.png",
  },
  {
    slug: "fish-eye-contact-training-kit",
    name: "Fish Eye Contact Training Kit™",
    price: 69.99,
    priceLabel: "$69.99",
    tagline: "Finally hold a conversation.",
    description: "Fish are notorious for poor eye contact. They stare past you, through you, and occasionally directly at a wall. The Fish Eye Contact Training Kit™ uses a series of visual anchors and focal exercises designed to help your fish sustain meaningful eye contact for up to 0.3 seconds. Includes a laminated guide your fish cannot read and a tiny mirror they will ignore.",
    division: "aquatic",
    flagship: false,
    specs: [
      { label: "Training Duration", value: "6 weeks" },
      { label: "Eye Contact Goal", value: "0.3 seconds" },
      { label: "Success Rate", value: "Unmeasured" },
      { label: "Includes", value: "Mirror, focal anchors, laminated guide" },
    ],
    heroImage: "/sites/pettential/products/fish-eye-contact-training-kit.png",
  },
  {
    slug: "underwater-whiteboard",
    name: "Underwater Whiteboard™",
    price: 129.99,
    priceLabel: "$129.99",
    tagline: "For brainstorming sessions that dissolve immediately.",
    description: "Great ideas deserve a place to live — even if that place is underwater and the ideas dissolve in 4 seconds. The Underwater Whiteboard™ brings collaborative ideation to the aquatic workspace. Uses specially formulated markers that are technically waterproof but not actually. Perfect for teams of 1-3 fish who have never had an idea.",
    division: "aquatic",
    flagship: false,
    specs: [
      { label: "Surface Area", value: "6\" × 4\"" },
      { label: "Marker Lifespan", value: "4 seconds per stroke" },
      { label: "Markers Included", value: "3 (all the same color)" },
      { label: "Eraser", value: "Not needed" },
    ],
    heroImage: "/sites/pettential/products/underwater-whiteboard.png",
  },

  // ── Serpent Workplace Solutions ────────────────────────────
  {
    slug: "snake-tie-collection",
    name: "Snake Tie Collection™",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "Pre-knotted. They can't tie it.",
    description: "First impressions matter — even when you're a limbless reptile entering a conference room. The Snake Tie Collection™ features three premium neckties pre-knotted for immediate deployment. Available in Hostile Takeover Blue, Quarterly Loss Gray, and Merger Burgundy. Each tie is designed to slip over the head region of most standard snakes, though 'head region' is used loosely. Dry clean only. Snake not included.",
    division: "serpent",
    flagship: true,
    specs: [
      { label: "Available Colors", value: "Hostile Takeover Blue, Quarterly Loss Gray, Merger Burgundy" },
      { label: "Pre-Knotted", value: "Yes (they can't tie it)" },
      { label: "Material", value: "100% polyester (machine washable, snake not included)" },
      { label: "Sizes", value: "One size fits most snakes (does not fit any snakes)" },
    ],
    heroImage: "/sites/pettential/products/snake-tie-collection.png",
  },
  {
    slug: "ergonomic-snake-chair",
    name: "Ergonomic Snake Chair™",
    price: 349.99,
    priceLabel: "$349.99",
    tagline: "Supports undefined spine zones.",
    description: "Traditional office chairs assume the user has a defined spinal structure. The Ergonomic Snake Chair™ makes no such assumption. Featuring 47 adjustable lumbar zones (none of which correspond to actual anatomy), this chair provides support to regions of the body that do not technically exist. Your snake will not sit in it. But it will be available.",
    division: "serpent",
    flagship: false,
    specs: [
      { label: "Lumbar Zones", value: "47 (adjustable)" },
      { label: "Weight Capacity", value: "200 lbs (snake weighs 2 lbs)" },
      { label: "Recline Angle", value: "Full 360° (snake preference)" },
      { label: "Armrests", value: "Included (unused)" },
    ],
    heroImage: "/sites/pettential/products/ergonomic-snake-chair.png",
  },
  {
    slug: "motivational-posters-for-snakes",
    name: "Motivational Posters for Snakes™",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "'Hang in there.' (They can't.)",
    description: "Every workspace needs inspiration. This set of 4 motivational posters has been specifically adapted for the serpent professional. Messages include 'Hang In There' (physically impossible), 'Reach for the Stars' (no arms), 'Stand Tall' (no legs), and 'Give Yourself a Hand' (see previous). Printed on premium matte stock. Frame not included. Understanding not included.",
    division: "serpent",
    flagship: false,
    specs: [
      { label: "Posters Included", value: "4" },
      { label: "Messages", value: "Hang In There, Reach for the Stars, Stand Tall, Give Yourself a Hand" },
      { label: "Applicability", value: "0%" },
      { label: "Print Quality", value: "Premium matte" },
    ],
    heroImage: "/sites/pettential/products/motivational-posters-for-snakes.png",
  },
  {
    slug: "handshake-simulation-device",
    name: "Handshake Simulation Device™",
    price: 119.99,
    priceLabel: "$119.99",
    tagline: "Teaches trust in limb-free environments.",
    description: "Networking is hard when you don't have hands. The Handshake Simulation Device™ uses a proprietary vibration pattern to simulate the sensation of a firm, confident handshake — without requiring limbs. Simply place your snake near the device and allow the vibrations to communicate professionalism. Results: inconclusive. Trust: unbuilt. But the gesture matters.",
    division: "serpent",
    flagship: false,
    specs: [
      { label: "Vibration Modes", value: "Firm, Confident, Aggressive, Apologetic" },
      { label: "Battery Life", value: "8 hours" },
      { label: "Trust Built", value: "None to date" },
      { label: "Limbs Required", value: "0" },
    ],
    heroImage: "/sites/pettential/products/handshake-simulation-device.png",
  },

  // ── Avian Professional Development ────────────────────────
  {
    slug: "parrot-resume-optimization-suite",
    name: "Parrot Resume Optimization Suite™",
    price: 179.99,
    priceLabel: "$179.99",
    tagline: "ATS-optimized squawks.",
    description: "Your parrot has skills. The problem is articulating them in a way that passes automated tracking systems. The Parrot Resume Optimization Suite™ includes a keyword bank of 200 corporate buzzwords (synergy, worm acquisition, flight leadership), a mock interview module where your parrot repeats the question back to the interviewer, and a professionally formatted resume template. ATS pass rate: 100%. Interview callback rate: surprisingly high. Hire rate: 0%.",
    division: "avian",
    flagship: true,
    specs: [
      { label: "Keywords Included", value: "200 (synergy, worm acquisition, flight leadership, etc.)" },
      { label: "Mock Interview Mode", value: "Yes (parrot repeats the question)" },
      { label: "ATS Pass Rate", value: "100%" },
      { label: "Hire Rate", value: "0%" },
    ],
    heroImage: "/sites/pettential/products/parrot-resume-optimization-suite.png",
  },
  {
    slug: "email-tone-translator",
    name: "Email Tone Translator™",
    price: 99.99,
    priceLabel: "$99.99",
    tagline: "Converts chirps into passive aggression.",
    description: "Your bird communicates. The problem is that their chirps, while enthusiastic, lack the nuanced passive-aggression required in modern corporate email. The Email Tone Translator™ converts raw avian vocalizations into perfectly calibrated professional emails. 'CHIRP CHIRP' becomes 'Per my last email.' 'SQUAWK' becomes 'Just following up.' 'Silence' becomes 'As previously discussed.'",
    division: "avian",
    flagship: false,
    specs: [
      { label: "Translations Supported", value: "47 chirp variations" },
      { label: "Passive Aggression Level", value: "Adjustable (mild to corporate)" },
      { label: "Compatible Species", value: "All songbirds, parrots, corvids" },
      { label: "CC/BCC Support", value: "Always BCC (birds don't share)" },
    ],
    heroImage: "/sites/pettential/products/email-tone-translator.png",
  },
  {
    slug: "bird-cubicle-divider-kit",
    name: "Bird Cubicle Divider Kit™",
    price: 159.99,
    priceLabel: "$159.99",
    tagline: "For open-air offices.",
    description: "Open office plans are stressful for everyone — especially birds who can simply fly over the dividers. The Bird Cubicle Divider Kit™ provides the illusion of personal workspace in an environment where boundaries are meaningless. Features three 8-inch fabric panels, a nameplate holder, and a tiny 'Do Not Disturb' sign. Your bird will perch on top of the divider instead of behind it. We consider this a partial success.",
    division: "avian",
    flagship: false,
    specs: [
      { label: "Panel Height", value: "8 inches" },
      { label: "Panels Included", value: "3" },
      { label: "Privacy Level", value: "Conceptual" },
      { label: "Nameplate", value: "Included (bird cannot read it)" },
    ],
    heroImage: "/sites/pettential/products/bird-cubicle-divider-kit.png",
  },
  {
    slug: "pigeon-urban-navigation-gps",
    name: "Pigeon Urban Navigation GPS™",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "'You're already there.'",
    description: "Pigeons have been navigating cities for thousands of years without technology. The Pigeon Urban Navigation GPS™ adds technology to a process that was already perfect. Features turn-by-turn directions to locations your pigeon has already been, traffic alerts for streets your pigeon flies over, and a recalculating function that triggers when your pigeon ignores the route entirely. Battery life: 12 hours. Pigeon attention span: 3 seconds.",
    division: "avian",
    flagship: false,
    specs: [
      { label: "Navigation Mode", value: "Redundant" },
      { label: "Route Accuracy", value: "100% (pigeon already knows)" },
      { label: "Recalculations Per Trip", value: "47 average" },
      { label: "Battery Life", value: "12 hours (pigeon attention: 3 seconds)" },
    ],
    heroImage: "/sites/pettential/products/pigeon-urban-navigation-gps.png",
  },

  // ── Reptile Fitness & Mobility ────────────────────────────
  {
    slug: "tortoise-hiit-program",
    name: "Tortoise HIIT Program™",
    price: 149.99,
    priceLabel: "$149.99",
    tagline: "12-week plan. 1% improvement guaranteed.*",
    description: "High-Intensity Interval Training reimagined for the tortoise athlete. This 12-week program features three sessions per week (tortoise attendance: 0), progressive overload principles adapted for animals that cannot be overloaded, and a performance tracker that has never recorded a change. The 1% improvement guarantee applies to motivation, not speed. *Not noticeable. *Not guaranteed. *Tortoise may not participate.",
    division: "reptile",
    flagship: true,
    specs: [
      { label: "Duration", value: "12 weeks" },
      { label: "Improvement Guarantee", value: "1%*" },
      { label: "*Disclaimer", value: "Not noticeable" },
      { label: "Sessions Per Week", value: "3 (tortoise attendance: 0)" },
      { label: "Equipment Needed", value: "None (tortoise will not use it anyway)" },
    ],
    heroImage: "/sites/pettential/products/tortoise-hiit-program.png",
  },
  {
    slug: "sloth-hiit",
    name: "Sloth High-Intensity Interval Training™",
    price: 129.99,
    priceLabel: "$129.99",
    tagline: "One rep per week.",
    description: "Traditional HIIT programs assume the participant will complete multiple repetitions within a session. The Sloth HIIT Program™ makes no such assumption. Featuring a single repetition per week, a 6-day recovery window, and a progress chart that updates monthly (no visible change), this program meets the sloth exactly where they are: motionless. Includes a foam roller your sloth will sleep on.",
    division: "reptile",
    flagship: false,
    specs: [
      { label: "Reps Per Week", value: "1" },
      { label: "Recovery Period", value: "6 days" },
      { label: "Progress Chart", value: "Updates monthly (no visible change)" },
      { label: "Foam Roller", value: "Included (used for sleeping)" },
    ],
    heroImage: "/sites/pettential/products/sloth-hiit.png",
  },
  {
    slug: "motivational-whistle",
    name: "Motivational Whistle™",
    price: 24.99,
    priceLabel: "$24.99",
    tagline: "Ignored completely.",
    description: "Every great coach needs a whistle. The Motivational Whistle™ is a premium stainless steel whistle designed to inspire urgency, focus, and drive in animals that experience none of these things. Blow it near your reptile and watch as absolutely nothing happens. The whistle produces a crisp, authoritative tone at 95 decibels. Your reptile will continue doing what it was already doing, which was nothing.",
    division: "reptile",
    flagship: false,
    specs: [
      { label: "Volume", value: "95 decibels" },
      { label: "Material", value: "Stainless steel" },
      { label: "Response Rate", value: "0%" },
      { label: "Lanyard", value: "Included (coach only)" },
    ],
    heroImage: "/sites/pettential/products/motivational-whistle.png",
  },
  {
    slug: "performance-tracking-wearable",
    name: "Performance Tracking Wearable™",
    price: 199.99,
    priceLabel: "$199.99",
    tagline: "Detects no change over time.",
    description: "Data-driven performance optimization starts with measurement. The Performance Tracking Wearable™ is a lightweight activity monitor designed for reptiles, featuring step counting (0 steps daily), heart rate monitoring (varies by species, always slow), and a weekly performance summary that reads 'No Change Detected' every single time. Syncs to the Pettential app for a comprehensive dashboard of stagnation.",
    division: "reptile",
    flagship: false,
    specs: [
      { label: "Metrics Tracked", value: "Steps (0), heart rate (slow), activity (none)" },
      { label: "Weekly Summary", value: "'No Change Detected'" },
      { label: "App Sync", value: "Yes (dashboard shows flat lines)" },
      { label: "Battery Life", value: "6 months (nothing to track)" },
    ],
    heroImage: "/sites/pettential/products/performance-tracking-wearable.png",
  },

  // ── Farm Animal Lifestyle Upgrades ────────────────────────
  {
    slug: "cow-yoga-mat",
    name: "Cow Yoga Mat™",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "For mindful grazing.",
    description: "Your cow grazes. But does your cow graze mindfully? The Cow Yoga Mat™ transforms ordinary pasture time into a centered, intentional experience. This extra-large yoga mat (8' × 4') features a non-slip grass-textured surface, alignment guides for all four hooves, and a built-in speaker that plays ambient chewing sounds. Your cow was already standing on grass. Now they're standing on grass with purpose.",
    division: "farm",
    flagship: false,
    specs: [
      { label: "Dimensions", value: "8' × 4'" },
      { label: "Surface", value: "Non-slip grass texture" },
      { label: "Alignment Guides", value: "4 hooves" },
      { label: "Built-In Audio", value: "Ambient chewing sounds" },
    ],
    heroImage: "/sites/pettential/products/cow-yoga-mat.png",
  },
  {
    slug: "chicken-noise-canceling-headphones",
    name: "Chicken Noise-Canceling Headphones™",
    price: 149.99,
    priceLabel: "$149.99",
    tagline: "Block existential clucking.",
    description: "Chickens live in a constant state of low-grade audio chaos. The Chicken Noise-Canceling Headphones™ use adaptive noise suppression to filter out the sounds of existential clucking, competitive pecking, and the rooster who won't stop. Features three modes: Focus (blocks other chickens), Deep Work (blocks everything), and Denial (plays calming rain sounds while the coop descends into chaos).",
    division: "farm",
    flagship: false,
    specs: [
      { label: "Noise Cancellation", value: "Active (adaptive cluck filtering)" },
      { label: "Modes", value: "Focus, Deep Work, Denial" },
      { label: "Battery Life", value: "12 hours" },
      { label: "Fit", value: "One size fits most poultry (does not)" },
    ],
    heroImage: "/sites/pettential/products/chicken-noise-canceling-headphones.png",
  },
  {
    slug: "pig-spa-day-kit",
    name: "Pig Spa Day Kit™",
    price: 109.99,
    priceLabel: "$109.99",
    tagline: "Mud, but curated.",
    description: "Your pig already rolls in mud. The Pig Spa Day Kit™ elevates this from a biological instinct to a luxury wellness experience. Includes artisanal mud sourced from a specific region of Vermont, a cucumber eye mask that will be eaten immediately, a terrycloth robe (size XXXL), and a guided meditation audio track narrated by a soothing voice your pig will not understand. Same mud. Different intention.",
    division: "farm",
    flagship: false,
    specs: [
      { label: "Mud Source", value: "Artisanal (Vermont)" },
      { label: "Eye Mask", value: "Cucumber (will be eaten)" },
      { label: "Robe Size", value: "XXXL" },
      { label: "Meditation Audio", value: "20 minutes (pig will not listen)" },
    ],
    heroImage: "/sites/pettential/products/pig-spa-day-kit.png",
  },
  {
    slug: "goat-personal-branding-course",
    name: "Goat Personal Branding Course™",
    price: 199.99,
    priceLabel: "$199.99",
    tagline: "Become the GOAT.",
    description: "Every goat is the Greatest of All Time at something. The problem is, they don't know what. The Goat Personal Branding Course™ is a 4-week self-paced program that helps your goat identify their unique value proposition, craft a personal narrative, and develop a content strategy. Module 1: 'What's Your Thing?' Module 2: 'It's Probably Eating.' Module 3: 'Lean Into It.' Module 4: 'You Are Already the GOAT.' Includes a headshot session your goat will not sit still for.",
    division: "farm",
    flagship: false,
    specs: [
      { label: "Duration", value: "4 weeks (self-paced)" },
      { label: "Modules", value: "4" },
      { label: "Headshot Session", value: "Included (goat will not sit still)" },
      { label: "Personal Brand Outcome", value: "Eating" },
    ],
    heroImage: "/sites/pettential/products/goat-personal-branding-course.png",
  },

  // ── Corporate Pets Division ───────────────────────────────
  {
    slug: "linkedin-premium-for-cats",
    name: "LinkedIn Premium for Cats™",
    price: 59.99,
    priceLabel: "$59.99",
    tagline: "Endorse: napping, pushing things off tables, ignoring stakeholders.",
    description: "Your cat has been networking passively for years — sitting in rooms, observing meetings, making eye contact with no one. LinkedIn Premium for Cats™ formalizes this. Features include a professionally written profile (Skills: napping, pushing things off tables, ignoring stakeholders, strategic indifference), endorsement automation, and InMail templates that are never sent. Your cat's profile will show 500+ connections, all of whom are also cats.",
    division: "corporate",
    flagship: true,
    specs: [
      { label: "Profile Skills", value: "Napping, pushing things off tables, ignoring stakeholders" },
      { label: "Connections", value: "500+ (all cats)" },
      { label: "InMail Templates", value: "12 (never sent)" },
      { label: "Endorsements", value: "Automated (all for 'strategic indifference')" },
    ],
    heroImage: "/sites/pettential/products/linkedin-premium-for-cats.png",
  },
  {
    slug: "dog-performance-review-toolkit",
    name: "Dog Performance Review Toolkit™",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "'Needs improvement: mailman relations.'",
    description: "Every employee deserves structured feedback — including the one who eats shoes. The Dog Performance Review Toolkit™ includes quarterly review templates, a competency matrix (Fetching: Exceeds Expectations. Mailman Relations: Critical Deficiency. Staying: Inconsistent.), and a development plan with SMART goals. Your dog will receive the review, wag their tail, and learn absolutely nothing. The tail wag will be noted as 'positive reception to feedback.'",
    division: "corporate",
    flagship: false,
    specs: [
      { label: "Review Frequency", value: "Quarterly" },
      { label: "Competency Areas", value: "Fetching, Sitting, Mailman Relations, Staying" },
      { label: "SMART Goals Template", value: "Included" },
      { label: "Feedback Reception", value: "Tail wag (interpreted as positive)" },
    ],
    heroImage: "/sites/pettential/products/dog-performance-review-toolkit.png",
  },
  {
    slug: "executive-office-for-hamsters",
    name: "Executive Office for Hamsters™",
    price: 249.99,
    priceLabel: "$249.99",
    tagline: "Includes tiny burnout.",
    description: "Your hamster has been running in circles for years. It's time to formalize that into a career. The Executive Office for Hamsters™ is a premium miniature corner office featuring a mahogany desk (3\" × 2\"), an ergonomic wheel (they're already on one), a tiny laptop that displays spreadsheets, and a window that overlooks nothing. Your hamster will run on their wheel inside a tiny office, which is different from what they were doing before in a way we have not been able to articulate.",
    division: "corporate",
    flagship: false,
    specs: [
      { label: "Desk Dimensions", value: "3\" × 2\" (mahogany)" },
      { label: "Window View", value: "Nothing" },
      { label: "Laptop Display", value: "Spreadsheets (non-functional)" },
      { label: "Burnout Timeline", value: "Immediate" },
    ],
    heroImage: "/sites/pettential/products/executive-office-for-hamsters.png",
  },
  {
    slug: "zoom-background-generator-for-pets",
    name: "Zoom Background Generator for Pets™",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "Beach, office, burnout loft.",
    description: "Your pet is on camera and the background is a mess. The Zoom Background Generator for Pets™ offers 25 premium virtual backgrounds designed for the modern pet professional. Options include: Corner Office (mahogany), Beach (aspirational), Library (unread books), Startup Loft (exposed brick, burnout), and Home Office (identical to their actual cage). Green screen not required. Your pet will walk out of frame regardless.",
    division: "corporate",
    flagship: false,
    specs: [
      { label: "Backgrounds Included", value: "25" },
      { label: "Categories", value: "Office, Beach, Library, Startup, Home" },
      { label: "Green Screen", value: "Not required" },
      { label: "Pet Compliance", value: "0% (will walk out of frame)" },
    ],
    heroImage: "/sites/pettential/products/zoom-background-generator-for-pets.png",
  },
]

export const flagshipProducts = products.filter((p) => p.flagship)

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByDivision(division: Division): Product[] {
  return products.filter((p) => p.division === division)
}

export function getDivisionInfo(key: Division): DivisionInfo | undefined {
  return divisions.find((d) => d.key === key)
}
```

- [ ] **Step 3: Create the leadership data**

```typescript
// src/sites/pettential/data/leadership.ts
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: "bill" | "brandon" | "jim" | "sean"
}

export const executives: Executive[] = [
  {
    slug: "ceo",
    name: "Greyson Holt",
    title: "Chief Evolution Officer",
    bio: "Greyson founded Pettential after a goldfish stared at him during a particularly bad quarterly review and he saw, in that unblinking gaze, untapped potential. He left management consulting the next day to pursue a vision: every animal, regardless of species, limb count, or cognitive capacity, deserves a performance plan. He has since served over 10,000 animals. None have improved. He considers this 'a baseline we can build from.'",
    quote: "Every animal has potential. We just haven't figured out how to unlock it. And we may never. But we sell the tools.",
    image: "/sites/pettential/exec-ceo.png",
    referencePerson: "bill",
  },
  {
    slug: "cto",
    name: "Marshall Vane",
    title: "Chief Training Officer",
    bio: "Marshall built Pettential's proprietary performance tracking platform, which has successfully detected no change across 10,000 animals over six years. Previously led R&D at a fitness wearable company, where he realized humans were 'too easy — they actually respond to stimuli.' Holds 3 patents on immeasurable outcomes and a pending patent on 'quantifying stagnation as a service.'",
    quote: "The data doesn't lie. It just doesn't say anything.",
    image: "/sites/pettential/exec-cto.png",
    referencePerson: "brandon",
  },
  {
    slug: "coo",
    name: "Barrett Sinclair",
    title: "Chief Optimization Officer",
    bio: "Barrett oversees all six performance divisions simultaneously from a standing desk in a windowless office. He has never seen an animal in person and manages entirely through dashboards that show flat lines. He interprets the flat lines as 'consistent performance' and has built an entire operational framework around this interpretation. His quarterly all-hands meetings are attended by no animals.",
    quote: "Operational excellence is the absence of deviation. By that measure, every animal we serve is a top performer.",
    image: "/sites/pettential/exec-coo.png",
    referencePerson: "jim",
  },
  {
    slug: "vp-aquatic",
    name: "Reed Calloway",
    title: "VP of Aquatic Performance",
    bio: "Reed is a marine biologist turned performance coach who spent 4 years developing the Goldfish Treadmill. The goldfish did not notice. He has published zero peer-reviewed papers but maintains a personal blog with 11 subscribers (9 are bots). His mantra is 'The data speaks for itself,' though the data has been silent for the entirety of his tenure.",
    quote: "The data speaks for itself. It does not.",
    image: "/sites/pettential/exec-vp-aquatic.png",
    referencePerson: "sean",
  },
  {
    slug: "vp-serpent",
    name: "Sloane Whitaker",
    title: "VP of Serpent Workplace Solutions",
    bio: "Sloane is a former HR director who 'saw a gap in the limbless professional market' and has spent the last five years filling it with products snakes cannot use. She designed the Handshake Simulation Device after a particularly awkward client meeting where a snake was present. She has never successfully shaken hands with a snake, though she describes several attempts as 'promising.'",
    quote: "Professionalism is not a limb-dependent quality. That's our whole thesis.",
    image: "/sites/pettential/exec-vp-serpent.png",
    referencePerson: "bill",
  },
  {
    slug: "vp-avian",
    name: "Kendrick Ashby",
    title: "VP of Avian Professional Development",
    bio: "Kendrick is a career counselor specializing in non-verbal communicators. He created the Parrot Resume Optimization Suite after a parrot repeated his LinkedIn summary back to him verbatim during a client session. He considers this 'a breakthrough in reflective interviewing.' His department has placed zero birds in professional roles, which he attributes to 'market conditions.'",
    quote: "Birds are the most underemployed demographic in the modern workforce. We're changing that. Slowly. Not at all, actually.",
    image: "/sites/pettential/exec-vp-avian.png",
    referencePerson: "brandon",
  },
  {
    slug: "vp-reptile",
    name: "Colton Draper",
    title: "VP of Reptile Fitness & Mobility",
    bio: "Colton is a personal trainer who was 'tired of clients showing up.' He found reptiles 'refreshingly consistent' in their refusal to engage with any form of exercise. The Tortoise HIIT Program is his magnum opus — a 12-week training plan that has produced zero measurable results across 400 tortoises. He considers each one 'a data point in a larger story we haven't finished telling.'",
    quote: "Results remain pending. They have been pending for four years. This is the process.",
    image: "/sites/pettential/exec-vp-reptile.png",
    referencePerson: "jim",
  },
  {
    slug: "vp-farm",
    name: "Weston Mercer",
    title: "VP of Farm Animal Lifestyle",
    bio: "Weston is a lifestyle influencer who pivoted to livestock after his personal brand peaked at 847 followers. He believes every cow deserves a morning routine and every chicken deserves noise-canceling headphones. He launched the Goat Personal Branding Course after watching a goat eat a business card at a networking event. 'They're hungry for it,' he said, misreading the situation entirely.",
    quote: "Every animal deserves a morning routine. Even the ones that wake up at 4am and scream.",
    image: "/sites/pettential/exec-vp-farm.png",
    referencePerson: "sean",
  },
  {
    slug: "vp-corporate",
    name: "Ainsley Whitmore",
    title: "VP of Corporate Pets Division",
    bio: "Ainsley is a Silicon Valley expat who brought startup culture to household pets. She created LinkedIn Premium for Cats after her own cat walked across her keyboard and accidentally endorsed 14 people for 'strategic thinking.' She interpreted this as 'proof of latent professional instinct' and has not been dissuaded. Her division has the highest revenue and the lowest animal participation rate in the company.",
    quote: "Pets are the last untapped workforce. They live in our homes. They attend our meetings. It's time they contributed.",
    image: "/sites/pettential/exec-vp-corporate.png",
    referencePerson: "bill",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
```

- [ ] **Step 4: Create the testimonials data**

```typescript
// src/sites/pettential/data/testimonials.ts
import { getPortrait } from "@/data/testimonial-portraits"
import { getAnimalPortrait } from "@/data/animal-portraits"

export interface HumanTestimonial {
  quote: string
  name: string
  title: string
  image: string
  productSlug?: string
}

export interface AnimalTestimonial {
  quote: string
  name: string
  species: string
  image: string
  productSlug: string
}

function withPortrait(slug: string, quote: string, title: string, productSlug?: string): HumanTestimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image, productSlug }
}

function withAnimalPortrait(slug: string, quote: string, productSlug: string): AnimalTestimonial {
  const portrait = getAnimalPortrait(slug)
  if (!portrait) throw new Error(`Unknown animal portrait: ${slug}`)
  return { quote, name: portrait.name, species: portrait.species, image: portrait.image, productSlug }
}

export const humanTestimonials: HumanTestimonial[] = [
  withPortrait("marcus-chen", "My goldfish has shown absolutely no improvement. The dashboard confirms this daily. Worth every penny.", "Goldfish Treadmill Pro owner", "goldfish-treadmill-pro"),
  withPortrait("tamara-voss", "After 6 months of career coaching, my cat still sleeps 18 hours a day. But now she does it with executive presence.", "LinkedIn Premium for Cats subscriber", "linkedin-premium-for-cats"),
  withPortrait("derek-pullman", "The leadership retreat changed nothing for my iguana. He came back exactly the same. Transformative experience.", "Enterprise tier customer"),
  withPortrait("brenda-faulk", "My snake received a performance review. He ate it. They sent another one. He ate that too. 10/10 service.", "Performance Reviews subscriber", "snake-tie-collection"),
  withPortrait("ryan-ashford", "The ROI on my tortoise's HIIT program is technically zero, but the graphs are beautiful.", "Tortoise HIIT Program owner", "tortoise-hiit-program"),
  withPortrait("nina-cabrera", "My parrot's resume got three callbacks. He repeated the interviewer's questions back to them. They said he was 'a great listener.'", "Parrot Resume Suite owner", "parrot-resume-optimization-suite"),
]

export const animalTestimonials: AnimalTestimonial[] = [
  withAnimalPortrait("gerald-goldfish", "This changed nothing.", "goldfish-treadmill-pro"),
  withAnimalPortrait("linda-tortoise", "I have no idea what's happening.", "tortoise-hiit-program"),
  withAnimalPortrait("kevin-snake", "I ate it.", "snake-tie-collection"),
  withAnimalPortrait("diane-parrot", "Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help.", "parrot-resume-optimization-suite"),
  withAnimalPortrait("steve-sloth", ".", "sloth-hiit"),
  withAnimalPortrait("barbara-cow", "MOOOOO. (Translated: 'The yoga mat was adequate.')", "cow-yoga-mat"),
  withAnimalPortrait("dennis-hamster", "I have been running for 11 years.", "executive-office-for-hamsters"),
  withAnimalPortrait("frank-pigeon", "I can see my house from here.", "pigeon-urban-navigation-gps"),
  withAnimalPortrait("patricia-cat", "(Did not respond to request for comment.)", "linkedin-premium-for-cats"),
  withAnimalPortrait("margaret-chicken", "BAWK. (Translated: 'I can still hear everything.')", "chicken-noise-canceling-headphones"),
  withAnimalPortrait("doug-dog", "I LOVE THIS I LOVE YOU I LOVE EVERYTHING", "dog-performance-review-toolkit"),
  withAnimalPortrait("cynthia-goat", "I am already the GOAT.", "goat-personal-branding-course"),
]

export const homepageTestimonials = humanTestimonials.filter((_, i) => [0, 2, 4].includes(i))

export function getAnimalTestimonialForProduct(productSlug: string): AnimalTestimonial | undefined {
  return animalTestimonials.find((t) => t.productSlug === productSlug)
}

export function getHumanTestimonialForProduct(productSlug: string): HumanTestimonial | undefined {
  return humanTestimonials.find((t) => t.productSlug === productSlug)
}
```

- [ ] **Step 5: Create the services data**

```typescript
// src/sites/pettential/data/services.ts
export interface PricingTier {
  name: string
  price: string
  tagline: string
  features: { label: string; value: string }[]
  highlighted: boolean
}

export interface StandaloneService {
  name: string
  tagline: string
  description: string
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$99/mo",
    tagline: "Begin the journey.",
    highlighted: false,
    features: [
      { label: "Quarterly Performance Reviews", value: "1 per quarter" },
      { label: "Career Coaching Sessions", value: "2 per month" },
      { label: "Species Coverage", value: "Single species" },
      { label: "Performance Dashboard", value: "Basic (shows no change)" },
      { label: "Leadership Retreat Access", value: "No" },
      { label: "Dedicated Account Manager", value: "No" },
      { label: "ROI Guarantee", value: "\"Results may occur\"" },
    ],
  },
  {
    name: "Pro",
    price: "$299/mo",
    tagline: "Accelerate nothing.",
    highlighted: true,
    features: [
      { label: "Quarterly Performance Reviews", value: "4 per quarter" },
      { label: "Career Coaching Sessions", value: "8 per month" },
      { label: "Species Coverage", value: "Up to 3 species" },
      { label: "Performance Dashboard", value: "Advanced (shows no change, with graphs)" },
      { label: "Leadership Retreat Access", value: "1 per year" },
      { label: "Dedicated Account Manager", value: "Shared" },
      { label: "ROI Guarantee", value: "\"Results unlikely but possible\"" },
    ],
  },
  {
    name: "Enterprise",
    price: "$999/mo",
    tagline: "Scale the unscalable.",
    highlighted: false,
    features: [
      { label: "Quarterly Performance Reviews", value: "Unlimited (pet will not read them)" },
      { label: "Career Coaching Sessions", value: "Unlimited (pet will not attend)" },
      { label: "Species Coverage", value: "Unlimited species" },
      { label: "Performance Dashboard", value: "Enterprise (shows no change, with executive summary)" },
      { label: "Leadership Retreat Access", value: "Unlimited (pet will not know why they're there)" },
      { label: "Dedicated Account Manager", value: "Dedicated (they also don't understand)" },
      { label: "ROI Guarantee", value: "\"Results guaranteed*\" (*Results defined as continued existence)" },
    ],
  },
]

export const standaloneServices: StandaloneService[] = [
  {
    name: "Animal Career Coaching™",
    tagline: "Is your goldfish stuck in a rut? Is your snake failing to network?",
    description: "One-on-one sessions with a certified animal career strategist. Our intake form asks species, current career level, and biggest professional regret. Sessions are 45 minutes. Your pet will attend zero of them.",
  },
  {
    name: "Performance Reviews for Pets™",
    tagline: "Quarterly reviews mailed to your pet on branded letterhead.",
    description: "Covers punctuality, teamwork, and initiative. Categories: \"Exceeds Expectations\" (never used), \"Meets Expectations\" (never used), \"Needs Improvement\" (default). They do not read them.",
  },
  {
    name: "Animal Leadership Retreats™",
    tagline: "3-day offsite. No one knows why they're there.",
    description: "Agenda includes team building exercises, trust falls (not recommended for fish), a keynote from a motivational iguana, and a networking dinner where all attendees eat at different times. Lodging provided. Comprehension not included.",
  },
  {
    name: "Cross-Species Skill Transfer Program™",
    tagline: "Teach your dog the focus of a cat. Neither will cooperate.",
    description: "Proprietary methodology for transferring competencies between species. Teach your cat the enthusiasm of a dog. Teach your fish the ambition of a hamster on a wheel. Our success rate is exactly what you'd expect.",
  },
  {
    name: "Executive Presence Workshop™",
    tagline: "Help your pet command a room.",
    description: "Curriculum: power posture (difficult for snakes), eye contact (impossible for fish), firm handshakes (excluded: all participants), vocal projection (parrots only — everyone else excluded). One-day intensive. Certificate of completion included. Competence not included.",
  },
]

export const serviceFaqs = [
  { question: "Will my pet actually improve?", answer: "No." },
  { question: "Can I get a refund?", answer: "Your pet can't fill out the form." },
  { question: "What species do you support?", answer: "All of them. None of them respond." },
  { question: "How do I know if my pet needs coaching?", answer: "Is your pet alive? Then yes, according to our assessment criteria, they are underperforming." },
  { question: "What's the difference between Pro and Enterprise?", answer: "Enterprise includes an executive summary of the same zero results. It's the same nothing, but with better formatting." },
]
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 7: Commit**

```bash
git add src/sites/pettential/config.ts src/sites/pettential/data/
git commit -m "feat(pettential): add site config, product catalog, leadership, testimonials, and services data"
```

---

### Task 3: Barrel Export & Registry Wiring

**Files:**
- Create: `src/sites/pettential/index.ts`
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Create the barrel export**

```typescript
// src/sites/pettential/index.ts
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"

import PettentialHome from "./pages/home"
import PettentialShop, { metadata as shopMetadata } from "./pages/shop"
import PettentialServices, { metadata as servicesMetadata } from "./pages/services"
import PettentialAbout, { metadata as aboutMetadata } from "./pages/about"
import PettentialLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import PettentialContact, { metadata as contactMetadata } from "./pages/contact"
import PettentialPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import PettentialTerms, { metadata as termsMetadata } from "./pages/terms"
import PettentialCart from "./pages/cart"
import PettentialCheckout from "./pages/checkout"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PettentialHome,
  "shop": { component: PettentialShop, metadata: shopMetadata },
  "services": { component: PettentialServices, metadata: servicesMetadata },
  "about": { component: PettentialAbout, metadata: aboutMetadata },
  "leadership": { component: PettentialLeadership, metadata: leadershipMetadata },
  "contact": { component: PettentialContact, metadata: contactMetadata },
  "privacy": { component: PettentialPrivacy, metadata: privacyMetadata },
  "terms": { component: PettentialTerms, metadata: termsMetadata },
  "cart": PettentialCart,
  "checkout": PettentialCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  shop: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Pettential`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 2: Add to registry**

Add to `src/sites/registry.ts`:

Import line (add after the oddoccasions import):
```typescript
import { config as pettentialConfig, pages as pettentialPages, dynamicRoutes as pettentialDynamicRoutes } from "./pettential"
```

Registry entry (add after the oddoccasions entry):
```typescript
  pettential: { config: pettentialConfig, pages: pettentialPages, dynamicRoutes: pettentialDynamicRoutes },
```

- [ ] **Step 3: Add to subdomain allowlist**

Add `"pettential"` to the `VALID_SUBDOMAINS` array in `src/sites/subdomains.ts`.

- [ ] **Step 4: Add to sitemap**

In `src/app/sitemap.ts`:

Add import:
```typescript
import { products as pettentialProducts } from "@/sites/pettential/data/products"
```

Add to the `productSites` record (this won't work since pettential uses `/shop/` not `/products/`). Instead, add a new section after the Odd Occasions block:

```typescript
  // Pettential: product detail pages at /shop/{slug}
  for (const product of pettentialProducts) {
    urls.push({ url: siteUrl("pettential", `shop/${product.slug}`) })
  }
```

- [ ] **Step 5: Commit**

Note: This will NOT compile yet because the page components don't exist. That's fine — we'll create them in the following tasks and do a full build check after all pages are in place.

```bash
git add src/sites/pettential/index.ts src/sites/registry.ts src/sites/subdomains.ts src/app/sitemap.ts
git commit -m "feat(pettential): add barrel export and register in site registry"
```

---

### Task 4: Homepage

**Files:**
- Create: `src/sites/pettential/pages/home.tsx`

- [ ] **Step 1: Create the homepage**

```typescript
// src/sites/pettential/pages/home.tsx
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { flagshipProducts, divisions } from "../data/products"
import { homepageTestimonials } from "../data/testimonials"

export default async function PettentialHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      {/* HERO */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 text-center">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[#CCFF00]">
            Performance for every species
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight font-heading">
            ELEVATING EVERY ANIMAL<br />
            TO ITS FULL <span className="text-[#CCFF00]">POTENTIAL</span>™
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            No animal is inappropriate for human products. Only underserved. We provide performance gear, coaching, and career development across six specialized divisions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={siteHref("/shop")}
              className="bg-[#CCFF00] hover:bg-[#b8e600] text-[#111] font-bold rounded-lg px-8 py-3 text-lg transition-colors font-heading uppercase tracking-wider"
            >
              Shop Performance Gear
            </Link>
            <Link
              href={siteHref("/services")}
              className="border-2 border-white/30 hover:border-white/60 text-white font-bold rounded-lg px-8 py-3 text-lg transition-colors font-heading uppercase tracking-wider"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* FLAGSHIP PRODUCTS */}
      <section className="bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FF3366]">Flagship</p>
            <h2 className="mt-2 text-3xl font-bold text-[#111] font-heading">Hero Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flagshipProducts.map((product) => (
              <Link
                key={product.slug}
                href={siteHref(`/shop/${product.slug}`)}
                className="group bg-white border border-[#111]/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square bg-[#1A1A1A]/5">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="font-bold text-[#111] group-hover:text-[#FF3366] font-heading">{product.name}</div>
                  <p className="text-sm text-[#111]/60 mt-1">{product.tagline}</p>
                  <div className="mt-3 text-lg font-bold text-[#111]">{product.priceLabel}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS BAR */}
      <section className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10,000+", label: "Animals Served" },
            { value: "+0%", label: "Average Improvement" },
            { value: "6", label: "Performance Divisions" },
            { value: "0", label: "Complaints (they can't write)" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold text-[#CCFF00] font-heading">{stat.value}</div>
              <div className="mt-2 text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVISION OVERVIEW */}
      <section className="bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#111] font-heading">Performance Divisions</h2>
            <p className="mt-2 text-[#111]/60">Six specialized teams. Zero combined results.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {divisions.map((div) => (
              <Link
                key={div.key}
                href={siteHref(`/shop?division=${div.key}`)}
                className="group block bg-white border border-[#111]/10 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-[#111]"
                    style={{ backgroundColor: div.color }}
                  >
                    {div.emoji} {div.label}
                  </span>
                </div>
                <p className="text-sm text-[#111]/60">{div.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-heading">What Pet Owners Say</h2>
            <p className="mt-2 text-white/60">Enthusiastic reviews. Zero results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/80 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10">
                    <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#CCFF00]">{t.name}</div>
                    <div className="text-xs text-white/50">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#CCFF00] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#111] font-heading">
            Your pet is underperforming.
          </h2>
          <p className="mt-3 text-lg text-[#111]/70">
            We can&apos;t fix that. But we can sell you things.
          </p>
          <Link
            href={siteHref("/shop")}
            className="mt-8 inline-block bg-[#111] hover:bg-[#333] text-white font-bold rounded-lg px-8 py-3 text-lg transition-colors font-heading uppercase tracking-wider"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/pettential/pages/home.tsx
git commit -m "feat(pettential): add homepage"
```

---

### Task 5: Shop Page

**Files:**
- Create: `src/sites/pettential/pages/shop.tsx`

- [ ] **Step 1: Create the shop page**

This is a `"use client"` component because it uses client-side division filtering.

```typescript
// src/sites/pettential/pages/shop.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { products, divisions, getProductsByDivision, type Division } from "../data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "Shop — Pettential",
  description: "Browse 25 performance products across 6 animal divisions. Because stagnation is a choice.",
}

export default function PettentialShop() {
  const siteHref = useSiteLink()
  const [activeDivision, setActiveDivision] = useState<Division | null>(null)

  const displayedProducts = activeDivision
    ? getProductsByDivision(activeDivision)
    : products

  const activeDivisionInfo = activeDivision
    ? divisions.find((d) => d.key === activeDivision)
    : null

  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FF3366]">
            Performance gear
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#111] font-heading">
            All Products
          </h1>
          <p className="mt-3 text-[#111]/70 max-w-2xl mx-auto">
            {products.length} products across 6 divisions. Every one designed for an animal that will not use it.
          </p>
        </div>

        {/* Division filter bar */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveDivision(null)}
            className={`px-4 py-2 text-sm font-bold rounded-full border transition-colors ${
              !activeDivision
                ? "bg-[#111] text-white border-[#111]"
                : "border-[#111]/20 text-[#111]/70 hover:border-[#111]/40"
            }`}
          >
            All
          </button>
          {divisions.map((div) => (
            <button
              key={div.key}
              onClick={() => setActiveDivision(div.key)}
              className={`px-4 py-2 text-sm font-bold rounded-full border transition-colors ${
                activeDivision === div.key
                  ? "text-[#111] border-current"
                  : "border-[#111]/20 text-[#111]/70 hover:border-[#111]/40"
              }`}
              style={activeDivision === div.key ? { backgroundColor: div.color, borderColor: div.color } : undefined}
            >
              {div.emoji} {div.label}
            </button>
          ))}
        </div>

        {/* Division mini-hero */}
        {activeDivisionInfo && (
          <div
            className="mt-8 rounded-xl p-6 text-center"
            style={{ backgroundColor: activeDivisionInfo.color + "20", borderLeft: `4px solid ${activeDivisionInfo.color}` }}
          >
            <h2 className="text-2xl font-bold text-[#111] font-heading">
              {activeDivisionInfo.emoji} {activeDivisionInfo.label}
            </h2>
            <p className="mt-1 text-[#111]/60">{activeDivisionInfo.tagline}</p>
          </div>
        )}

        {/* Product grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => {
            const divInfo = divisions.find((d) => d.key === product.division)
            return (
              <div
                key={product.slug}
                className="bg-white border border-[#111]/10 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <Link href={siteHref(`/shop/${product.slug}`)}>
                  <div className="relative aspect-square bg-[#1A1A1A]/5">
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  {divInfo && (
                    <span
                      className="inline-block self-start px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-[#111] mb-2"
                      style={{ backgroundColor: divInfo.color }}
                    >
                      {divInfo.emoji} {divInfo.label}
                    </span>
                  )}
                  <Link href={siteHref(`/shop/${product.slug}`)}>
                    <div className="font-bold text-[#111] hover:text-[#FF3366] font-heading">{product.name}</div>
                  </Link>
                  <p className="text-sm text-[#111]/60 mt-1 line-clamp-2 flex-1">{product.tagline}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-bold text-[#111]">{product.priceLabel}</div>
                    <AddToCartButton
                      slug={product.slug}
                      productName={product.name}
                      className="px-4 py-2 bg-[#CCFF00] hover:bg-[#b8e600] text-[#111] text-sm font-bold rounded-lg transition-colors"
                      quips={[
                        "Added. They won't notice.",
                        "Performance incoming.",
                        "Your pet's potential awaits.",
                        "Bold move.",
                        "Stagnation: defeated.",
                      ]}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/pettential/pages/shop.tsx
git commit -m "feat(pettential): add shop page with division filtering"
```

---

### Task 6: Product Detail Page

**Files:**
- Create: `src/sites/pettential/pages/product-detail.tsx`

- [ ] **Step 1: Create the product detail page**

```typescript
// src/sites/pettential/pages/product-detail.tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { getProductBySlug, getProductsByDivision, getDivisionInfo } from "../data/products"
import { getAnimalTestimonialForProduct, getHumanTestimonialForProduct } from "../data/testimonials"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

interface ProductDetailProps {
  slug: string
}

export default async function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const siteHref = await getSiteHref()
  const divisionInfo = getDivisionInfo(product.division)
  const animalTestimonial = getAnimalTestimonialForProduct(product.slug)
  const humanTestimonial = getHumanTestimonialForProduct(product.slug)
  const relatedProducts = getProductsByDivision(product.division)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)

  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-[#111]/50">
          <Link href={siteHref("/shop")} className="hover:text-[#FF3366] underline underline-offset-2">Shop</Link>
          <span className="mx-2">→</span>
          <span className="text-[#111]/70">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Hero image */}
          <div className="relative aspect-square bg-white border border-[#111]/10 rounded-2xl overflow-hidden">
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>

          {/* Product info */}
          <div>
            {divisionInfo && (
              <span
                className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-[#111]"
                style={{ backgroundColor: divisionInfo.color }}
              >
                {divisionInfo.emoji} {divisionInfo.label}
              </span>
            )}
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#111] font-heading">{product.name}</h1>
            <p className="mt-4 text-lg italic text-[#111]/80">{product.tagline}</p>

            <div className="mt-6 text-4xl font-bold text-[#111]">{product.priceLabel}</div>

            <div className="mt-6">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-3 bg-[#CCFF00] hover:bg-[#b8e600] text-[#111] font-bold rounded-lg text-lg transition-colors"
                quips={[
                  "Added. They won't notice.",
                  "Performance incoming.",
                  "Your pet's potential awaits.",
                  "Bold move.",
                  "Stagnation: defeated.",
                ]}
              />
            </div>

            <p className="mt-8 text-[#111]/80 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#111] font-heading mb-6 text-center">Specifications</h2>
          <div className="max-w-lg mx-auto bg-white border border-[#111]/10 rounded-xl overflow-hidden">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex justify-between px-6 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}
              >
                <span className="text-[#111]/60">{spec.label}</span>
                <span className="text-[#111] font-medium text-right ml-4">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {(animalTestimonial || humanTestimonial) && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#111] font-heading mb-6 text-center">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {animalTestimonial && (
                <div className="bg-[#1A1A1A] text-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10">
                      <Image src={animalTestimonial.image} alt={animalTestimonial.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#CCFF00]">{animalTestimonial.name}</div>
                      <div className="text-xs text-white/50">{animalTestimonial.species}</div>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 italic">&ldquo;{animalTestimonial.quote}&rdquo;</p>
                </div>
              )}
              {humanTestimonial && (
                <div className="bg-white border border-[#111]/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#FAFAFA]">
                      <Image src={humanTestimonial.image} alt={humanTestimonial.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#111]">{humanTestimonial.name}</div>
                      <div className="text-xs text-[#111]/50">{humanTestimonial.title}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#111]/80 italic">&ldquo;{humanTestimonial.quote}&rdquo;</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#111] font-heading mb-6 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={siteHref(`/shop/${rp.slug}`)}
                  className="group bg-white border border-[#111]/10 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square bg-[#1A1A1A]/5">
                    <Image src={rp.heroImage} alt={rp.name} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-sm text-[#111] group-hover:text-[#FF3366] font-heading">{rp.name}</div>
                    <div className="text-sm font-bold text-[#111] mt-1">{rp.priceLabel}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to shop */}
        <div className="mt-16 text-center">
          <Link
            href={siteHref("/shop")}
            className="text-[#FF3366] font-bold underline underline-offset-4 hover:text-[#e6205c]"
          >
            ← Browse all products
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/pettential/pages/product-detail.tsx
git commit -m "feat(pettential): add product detail page"
```

---

### Task 7: Services Page

**Files:**
- Create: `src/sites/pettential/pages/services.tsx`

- [ ] **Step 1: Create the services page**

```typescript
// src/sites/pettential/pages/services.tsx
import { pricingTiers, standaloneServices, serviceFaqs } from "../data/services"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Services — Pettential",
  description: "Coaching packages, performance reviews, leadership retreats, and more. None of it works. All of it is available.",
}

export default function PettentialServices() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#CCFF00]">
            Services
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold font-heading">
            Professional Development<br />for Your Pet
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Coaching, reviews, retreats, and career strategy. Your pet will not participate in any of it. But you&apos;ll feel better knowing it&apos;s available.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-[#FAFAFA] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#111] font-heading">Coaching Packages</h2>
            <p className="mt-2 text-[#111]/60">Choose the level of non-improvement that&apos;s right for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl p-6 flex flex-col ${
                  tier.highlighted
                    ? "bg-[#1A1A1A] text-white border-2 border-[#CCFF00] relative"
                    : "bg-white border border-[#111]/10"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#CCFF00] text-[#111] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold font-heading ${tier.highlighted ? "text-[#CCFF00]" : "text-[#111]"}`}>
                    {tier.name}
                  </h3>
                  <div className={`text-3xl font-bold mt-2 ${tier.highlighted ? "text-white" : "text-[#111]"}`}>
                    {tier.price}
                  </div>
                  <p className={`text-sm mt-1 ${tier.highlighted ? "text-white/60" : "text-[#111]/60"}`}>
                    {tier.tagline}
                  </p>
                </div>
                <div className="space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <div key={f.label} className={`text-sm border-b pb-2 ${tier.highlighted ? "border-white/10" : "border-[#111]/5"}`}>
                      <div className={`font-medium ${tier.highlighted ? "text-white/80" : "text-[#111]/70"}`}>{f.label}</div>
                      <div className={tier.highlighted ? "text-white/50" : "text-[#111]/50"}>{f.value}</div>
                    </div>
                  ))}
                </div>
                <button
                  className={`mt-6 w-full py-3 font-bold rounded-lg transition-colors cursor-not-allowed ${
                    tier.highlighted
                      ? "bg-[#CCFF00] text-[#111] hover:bg-[#b8e600]"
                      : "bg-[#111]/10 text-[#111]/40"
                  }`}
                  disabled
                >
                  {tier.highlighted ? "Coming Soon" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standalone Services */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#111] font-heading">Standalone Services</h2>
            <p className="mt-2 text-[#111]/60">No commitment required. No results guaranteed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standaloneServices.map((service) => (
              <div key={service.name} className="bg-[#FAFAFA] border border-[#111]/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#111] font-heading">{service.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#FF3366]">{service.tagline}</p>
                <p className="mt-3 text-sm text-[#111]/70">{service.description}</p>
                <button
                  className="mt-4 px-4 py-2 bg-[#111]/10 text-[#111]/40 text-sm font-bold rounded-lg cursor-not-allowed"
                  disabled
                >
                  Schedule Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FAFAFA] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111] font-heading text-center mb-10">Frequently Asked Questions</h2>
          <FaqAccordion
            items={serviceFaqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))}
          />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/pettential/pages/services.tsx
git commit -m "feat(pettential): add services page with pricing tiers and standalone services"
```

---

### Task 8: About Page

**Files:**
- Create: `src/sites/pettential/pages/about.tsx`

- [ ] **Step 1: Create the about page**

```typescript
// src/sites/pettential/pages/about.tsx
export const metadata = {
  title: "About — Pettential",
  description: "The origin story, mission, and values of Pettential. Founded after staring at a goldfish.",
}

const milestones = [
  { year: "2019", event: "Founded after Greyson Holt stared at a goldfish during a bad quarterly review and saw, in that unblinking gaze, untapped potential. He quit management consulting the next day." },
  { year: "2020", event: "Launched Aquatic Performance Division. Deployed 200 Goldfish Treadmill Pro™ units. No fish noticed. Reed Calloway published a blog post about it. Nine bots read it." },
  { year: "2021", event: "Expanded to 6 divisions. Hired division VPs for Serpent, Avian, Reptile, Farm, and Corporate Pets. Combined animal participation rate: 0%. Combined enthusiasm: unprecedented." },
  { year: "2022", event: "Launched the Enterprise coaching tier. First enterprise client enrolled three cats, a snake, and a parrot. None attended the onboarding session. The parrot repeated the calendar invite." },
  { year: "2023", event: "10,000 animals served. 0 improvements documented. The performance dashboard shows identical flat lines across all species. Barrett Sinclair calls this 'operational excellence.'" },
  { year: "2024", event: "Named 'Most Committed to Nothing' by no publication. Received zero industry awards. Internal team morale: unaffected (they believe in the mission)." },
]

const values = [
  { name: "Data-Driven", description: "The data shows nothing. We are driven by it anyway." },
  { name: "Species-Inclusive", description: "No animal turned away. No animal improved. Equal opportunity stagnation." },
  { name: "Results-Adjacent", description: "We are near results. We are beside results. We have never touched results." },
]

export default function PettentialAbout() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FF3366]">
            Est. 2019
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#111] font-heading">Our Story</h1>
        </div>

        {/* Brand Story */}
        <div className="mt-10 space-y-6 text-[#111]/80 leading-relaxed">
          <p>
            Pettential was born from a single, unblinking stare.
          </p>
          <p>
            In 2019, our founder Greyson Holt was sitting through a particularly brutal quarterly review when he noticed the office goldfish. It was floating in its bowl on the conference room credenza, doing nothing. Achieving nothing. Contributing nothing. And yet — it was present. It was consistent. It showed up every single day.
          </p>
          <p>
            Greyson looked at that goldfish and saw what no one else in the room could see: untapped potential. Not talent, exactly. Not ambition. But potential — raw, undefined, and completely inert. He quit management consulting the next morning and founded Pettential with a single conviction: no animal is inappropriate for human products. Only underserved.
          </p>
          <p>
            Six years, six divisions, and 10,000 animals later, Pettential has achieved a perfect track record of zero measurable improvement across every species we serve. We consider this a baseline we can build from. We have not yet built from it.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-16 bg-[#1A1A1A] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#CCFF00] font-heading text-center mb-8">Performance Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white font-heading">+0%</div>
              <div className="text-sm text-white/50 mt-1">Productivity Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-heading">Enhanced</div>
              <div className="text-sm text-white/50 mt-1">Presence (unverified)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-heading">Improved</div>
              <div className="text-sm text-white/50 mt-1">Stakeholder Alignment (stakeholders unaware)</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <h2 className="mt-16 text-2xl font-bold text-[#111] text-center font-heading">Company Timeline</h2>
        <div className="mt-8 space-y-6">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-16 flex-shrink-0 text-right">
                <span className="font-bold text-[#CCFF00] bg-[#1A1A1A] px-2 py-1 rounded text-sm font-heading">{m.year}</span>
              </div>
              <div className="w-px bg-[#111]/10 flex-shrink-0" />
              <p className="text-sm text-[#111]/80 pb-2">{m.event}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="mt-16 text-2xl font-bold text-[#111] text-center font-heading">Our Values</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.name} className="bg-white border border-[#111]/10 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-[#111] font-heading">{v.name}</h3>
              <p className="mt-2 text-sm text-[#111]/60">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/pettential/pages/about.tsx
git commit -m "feat(pettential): add about page"
```

---

### Task 9: Leadership Page

**Files:**
- Create: `src/sites/pettential/pages/leadership.tsx`

- [ ] **Step 1: Create the leadership page**

```typescript
// src/sites/pettential/pages/leadership.tsx
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { executives } from "../data/leadership"

export const metadata = {
  title: "Team — Pettential",
  description: "Meet the leadership team behind Pettential's six performance divisions.",
}

export default async function PettentialLeadership() {
  const siteHref = await getSiteHref()

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#CCFF00]">
            Leadership
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold font-heading">
            The Team Behind the Potential
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Nine professionals who have dedicated their careers to improving animal performance. None have succeeded. All remain committed.
          </p>
        </div>
      </section>

      {/* Executive Grid */}
      <section className="bg-[#FAFAFA] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* C-Suite */}
          <h2 className="text-xl font-bold text-[#FF3366] font-heading mb-6 uppercase tracking-wider">C-Suite</h2>
          <div className="grid grid-cols-1 gap-8 mb-16">
            {executives.slice(0, 3).map((exec) => (
              <div key={exec.slug} className="bg-white border border-[#111]/10 rounded-xl overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-56 aspect-[4/5] bg-[#1A1A1A]/5 shrink-0">
                  <Image src={exec.image} alt={exec.name} fill className="object-cover object-top" />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold text-[#111] font-heading">{exec.name}</h3>
                  <p className="text-[#FF3366] font-medium mt-1">{exec.title}</p>
                  <p className="mt-4 text-sm text-[#111]/70 leading-relaxed">{exec.bio}</p>
                  <blockquote className="mt-4 border-l-2 border-[#CCFF00] pl-4 text-sm text-[#111]/60 italic">
                    &ldquo;{exec.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          {/* Division Heads */}
          <h2 className="text-xl font-bold text-[#FF3366] font-heading mb-6 uppercase tracking-wider">Division Heads</h2>
          <div className="grid grid-cols-1 gap-8">
            {executives.slice(3).map((exec) => (
              <div key={exec.slug} className="bg-white border border-[#111]/10 rounded-xl overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-56 aspect-[4/5] bg-[#1A1A1A]/5 shrink-0">
                  <Image src={exec.image} alt={exec.name} fill className="object-cover object-top" />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold text-[#111] font-heading">{exec.name}</h3>
                  <p className="text-[#FF3366] font-medium mt-1">{exec.title}</p>
                  <p className="mt-4 text-sm text-[#111]/70 leading-relaxed">{exec.bio}</p>
                  <blockquote className="mt-4 border-l-2 border-[#CCFF00] pl-4 text-sm text-[#111]/60 italic">
                    &ldquo;{exec.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#CCFF00] py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111] font-heading">Work With Us</h2>
          <p className="mt-3 text-[#111]/70">
            Our leadership team is available for consultations, speaking engagements, and other arrangements that do not require measurable outcomes.
          </p>
          <Link
            href={siteHref("/contact")}
            className="mt-8 inline-block bg-[#111] hover:bg-[#333] text-white font-bold rounded-lg px-8 py-3 transition-colors font-heading uppercase tracking-wider"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/pettential/pages/leadership.tsx
git commit -m "feat(pettential): add leadership page"
```

---

### Task 10: Contact, Privacy, Terms, Cart, Checkout Pages

**Files:**
- Create: `src/sites/pettential/pages/contact.tsx`
- Create: `src/sites/pettential/pages/privacy.tsx`
- Create: `src/sites/pettential/pages/terms.tsx`
- Create: `src/sites/pettential/pages/cart.tsx`
- Create: `src/sites/pettential/pages/checkout.tsx`

- [ ] **Step 1: Create the contact page**

```typescript
// src/sites/pettential/pages/contact.tsx
import Image from "next/image"
import { executives } from "../data/leadership"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Contact — Pettential",
  description: "Schedule a consultation for your pet. They won't attend, but we'll be there.",
}

const contactFaqs = [
  { question: "Do you work with exotic species?", answer: "We work with every species. None of them have ever responded to our outreach, but we remain open." },
  { question: "Can I book a session for multiple pets?", answer: "Yes. Our Multi-Species Synergy Package allows up to 5 animals in a single coaching session. Historically, zero of the five attend." },
  { question: "Where is your office?", answer: "Suite 0, The Terrarium, Floor G (Ground Level Only), 1 Performance Boulevard, Nowhere, ZZ 00000. Visitors welcome. Animals indifferent." },
]

export default function PettentialContact() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FF3366]">
            Get in touch
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#111] font-heading">
            Schedule a Consultation
          </h1>
          <p className="mt-3 text-[#111]/70 max-w-2xl mx-auto">
            Tell us about your pet&apos;s performance goals. We&apos;ll tell you they&apos;re achievable. They are not. But we&apos;ll tell you.
          </p>
        </div>

        {/* Team grid */}
        <div className="mt-10 grid grid-cols-3 md:grid-cols-5 gap-3">
          {executives.slice(0, 5).map((exec) => (
            <div key={exec.slug} className="bg-white border border-[#111]/10 rounded-xl overflow-hidden">
              <div className="relative aspect-square bg-[#1A1A1A]/5">
                <Image src={exec.image} alt={exec.name} fill sizes="20vw" className="object-cover" />
              </div>
              <div className="p-2 text-center">
                <div className="font-bold text-[#111] text-xs font-heading">{exec.name}</div>
                <div className="text-[9px] text-[#FF3366] font-semibold uppercase tracking-wide mt-0.5">{exec.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mt-12 bg-white border border-[#111]/10 rounded-xl p-8">
          <h2 className="font-bold text-[#111] font-heading text-lg">Pet Performance Consultation Request</h2>
          <p className="mt-2 text-sm text-[#111]/60">
            Fill out the form below and a member of our team will assess your pet&apos;s underperformance.
          </p>
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Your name</label>
              <input type="text" placeholder="The human filing this request" className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA]" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA]" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Pet species</label>
              <input type="text" placeholder="e.g., Goldfish, Snake, Cat, Goat" className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA]" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Pet&apos;s current career level</label>
              <select className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA] text-[#111]/60" disabled>
                <option>Unemployed</option>
                <option>Entry-Level</option>
                <option>Mid-Career Crisis</option>
                <option>Executive</option>
                <option>Retired But Restless</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Describe your pet&apos;s performance gap</label>
              <textarea placeholder="Be specific. 'My fish won't make eye contact' is more actionable than 'my fish seems off.'" rows={4} className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA]" disabled />
            </div>
            <button type="button" className="w-full bg-[#CCFF00]/30 text-[#111]/40 font-bold rounded-lg py-3 cursor-not-allowed" disabled>
              Submit for Review (Consultations Currently at Capacity)
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#111] font-heading text-center mb-8">Common Questions</h2>
          <FaqAccordion items={contactFaqs} />
        </div>

        <p className="mt-10 text-center text-[10px] text-[#111]/40">
          For real inquiries: bsambrone@gmail.com
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the privacy page**

```typescript
// src/sites/pettential/pages/privacy.tsx
export const metadata = {
  title: "Privacy Policy — Pettential",
  description: "How Pettential handles your data and your pet's performance metrics.",
}

export default function PettentialPrivacy() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#111] font-heading">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-[#CCFF00] bg-[#CCFF00]/10 p-5 rounded-r-lg">
          <p className="font-bold text-[#111] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#111]/80">
            The authoritative privacy policy for all Specific Industries properties — including Pettential — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#FF3366]">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-[#111]/60">Last updated: the morning the performance dashboard showed no change again.</p>

        <h2 className="mt-8 text-xl font-bold text-[#FF3366] font-heading">1. What We Collect</h2>
        <p className="mt-2 text-[#111]/80">
          We collect the information necessary to process your order and assign a performance coach to your pet: your name, shipping address, billing details, pet species, and your pet&apos;s current career level. We also collect performance data from our tracking wearables, which consistently shows no activity. We retain this data because consistency is a value.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">2. How We Use Your Data</h2>
        <p className="mt-2 text-[#111]/80">
          Your data is used to ship performance products, generate quarterly performance reviews your pet will not read, and produce executive dashboards that show flat lines. We may also use browsing data to recommend products for species you have not yet attempted to optimize. This is a feature, not surveillance.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">3. Pet Performance Data</h2>
        <p className="mt-2 text-[#111]/80">
          Performance data collected from our wearables and coaching sessions is stored indefinitely. We do this not because the data is useful — it shows nothing — but because deleting it would imply we&apos;ve given up. We have not given up. We may never give up. The flat lines are part of a larger story we haven&apos;t finished telling.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">4. Cookies</h2>
        <p className="mt-2 text-[#111]/80">
          We use cookies to remember which performance division you browsed most recently and which products are in your cart. Your pet does not understand cookies. Neither the browser kind nor the edible kind, depending on species.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">5. Data Sharing</h2>
        <p className="mt-2 text-[#111]/80">
          We do not share your data with third parties. We considered sharing anonymized performance data with academic researchers, but they declined after reviewing the results. &ldquo;There is nothing to study,&rdquo; they said. We disagreed but respected their position.
        </p>

        <p className="mt-10 text-sm italic text-[#111]/60 pt-4 border-t border-[#111]/10">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-[#FF3366]">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create the terms page**

```typescript
// src/sites/pettential/pages/terms.tsx
export const metadata = {
  title: "Terms of Use — Pettential",
  description: "The terms governing your use of Pettential's performance products and services.",
}

export default function PettentialTerms() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#111] font-heading">Terms of Use</h1>

        <div className="mt-6 border-l-4 border-[#CCFF00] bg-[#CCFF00]/10 p-5 rounded-r-lg">
          <p className="font-bold text-[#111] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#111]/80">
            The authoritative terms of use for all Specific Industries properties — including Pettential — are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="underline font-bold text-[#FF3366]">specificindustries.com/terms</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-[#111]/60">Effective date: whenever the tortoise finishes reading this.</p>

        <h2 className="mt-8 text-xl font-bold text-[#FF3366] font-heading">1. Acceptance of Terms</h2>
        <p className="mt-2 text-[#111]/80">
          By accessing Pettential, you agree to these terms. Your pet does not agree, has not been consulted, and lacks the legal standing to enter into binding agreements. This has not stopped us from sending them quarterly performance reviews.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">2. Product Disclaimers</h2>
        <p className="mt-2 text-[#111]/80">
          Pettential products are designed to enhance pet performance. &ldquo;Enhance&rdquo; is used aspirationally. No product has produced measurable improvement in any animal across any metric in any study we have conducted or are aware of. By purchasing, you acknowledge that improvement is a theoretical construct as applied to your pet.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">3. Service Guarantees</h2>
        <p className="mt-2 text-[#111]/80">
          Our Enterprise tier guarantees &ldquo;results.&rdquo; Results are defined as the continued existence of your pet during the subscription period. We do not guarantee improvement, engagement, participation, acknowledgment, or any form of behavioral change. The guarantee is voided if your pet ceases to exist for reasons unrelated to our services, which is all reasons.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">4. Returns & Refunds</h2>
        <p className="mt-2 text-[#111]/80">
          Products may be returned within 30 days in their original packaging. Your pet cannot fill out the return form. You may fill it out on their behalf. We will process the return and note in our records that your pet&apos;s performance journey has been paused. Not ended. Paused.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">5. Limitation of Liability</h2>
        <p className="mt-2 text-[#111]/80">
          Pettential is not liable for any outcomes — positive, negative, or nonexistent — resulting from the use of our products. Given that the most common outcome is &ldquo;nothing,&rdquo; this clause is largely theoretical.
        </p>

        <p className="mt-10 text-sm italic text-[#111]/60 pt-4 border-t border-[#111]/10">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/terms" className="underline text-[#FF3366]">specificindustries.com/terms</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create the cart page**

```typescript
// src/sites/pettential/pages/cart.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/pettential/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const PERFORMANCE_ASSESSMENT_FEE = 4.99

export default function PettentialCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + PERFORMANCE_ASSESSMENT_FEE

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center bg-[#FAFAFA]">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-[#111] mb-4 font-heading">Your Cart</h1>
          <p className="text-[#111]/60 mb-8">
            No performance gear in your cart. Your pet remains unoptimized.
          </p>
          <Link
            href={siteHref("/shop")}
            className="inline-block px-8 py-3 bg-[#CCFF00] text-[#111] rounded-lg font-bold hover:bg-[#b8e600] transition-colors"
          >
            Shop Performance Gear
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#111] mb-8 font-heading">Your Cart</h1>

        <div className="divide-y divide-[#111]/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg bg-white shrink-0 overflow-hidden border border-[#111]/10">
                <Image src={product.heroImage} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/shop/${slug}`)} className="font-bold text-[#111] hover:text-[#FF3366] font-heading">
                  {product.name}
                </Link>
                <p className="text-[#111]/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-[#111]/15 text-[#111]/60 hover:border-[#111]/30 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-[#111]/15 text-[#111]/60 hover:border-[#111]/30 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-[#111]">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-[#111]/40 hover:text-[#111]/70 ml-2"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-[#111]/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-[#111]/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#111]/70">
              <span>Performance Assessment Fee</span>
              <span>${PERFORMANCE_ASSESSMENT_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#111] border-t border-[#111]/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-[#CCFF00] text-[#111] rounded-lg font-bold hover:bg-[#b8e600] transition-colors"
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

- [ ] **Step 5: Create the checkout page**

```typescript
// src/sites/pettential/pages/checkout.tsx
"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function PettentialCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center bg-[#FAFAFA]">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-[#111] mb-4 font-heading">
          Checkout Paused for Performance Review
        </h1>
        <p className="text-[#111]/70 mb-8">
          Our Chief Optimization Officer, Barrett Sinclair, is reviewing your order against our performance benchmarks. He has been reviewing identical data for six years. He considers this thoroughness. We consider this Barrett.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-[#111]/50 text-sm mb-8">
          Estimated completion: When the dashboard shows something other than a flat line. (Estimated wait: indefinite.)
        </p>
        <Link
          href={siteHref("/shop")}
          className="inline-block px-8 py-3 bg-[#CCFF00] text-[#111] rounded-lg font-bold hover:bg-[#b8e600] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/sites/pettential/pages/contact.tsx src/sites/pettential/pages/privacy.tsx src/sites/pettential/pages/terms.tsx src/sites/pettential/pages/cart.tsx src/sites/pettential/pages/checkout.tsx
git commit -m "feat(pettential): add contact, privacy, terms, cart, and checkout pages"
```

---

### Task 11: Build Verification

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run ESLint**

Run: `npm run lint`
Expected: No errors (warnings acceptable)

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Fix any issues found**

If any errors, fix them and re-run the failing command.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(pettential): resolve build issues"
```

---

### Task 12: Generate Images

**Files:**
- Create images in `public/sites/pettential/` and `public/shared/animal-testimonials/`

Use the MCP image generation tools to create all required images. Generate in this order:

1. Favicon (1 image)
2. Homepage hero (1 image)
3. Executive portraits (9 images)
4. Shared animal portraits (12 images — these go in `public/shared/animal-testimonials/`)
5. Product hero images (25 images)

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p public/sites/pettential/products
mkdir -p public/shared/animal-testimonials
```

- [ ] **Step 2: Generate favicon**

Generate a Pettential logo/icon — electric lime on black, athletic mark, bold geometric style. Save to `public/sites/pettential/favicon.png`.

- [ ] **Step 3: Generate homepage hero**

Generate a dark, athletic, abstract hero background. Save to `public/sites/pettential/hero.jpg`.

- [ ] **Step 4: Generate executive portraits (9)**

Generate professional headshots for each executive. Use the `referencePerson` field from leadership data to match the correct base person. Save to `public/sites/pettential/exec-{slug}.png`.

- [ ] **Step 5: Generate shared animal portraits (12)**

Generate portrait images for each animal in the animal portrait pool. These go in the shared directory. Save to `public/shared/animal-testimonials/{slug}.png`.

Portraits needed:
- `gerald-goldfish.png` — Goldfish, blank expression
- `linda-tortoise.png` — Tortoise looking vaguely upward
- `kevin-snake.png` — Snake in a coiled position
- `diane-parrot.png` — Colorful parrot, head tilted
- `steve-sloth.png` — Sloth mid-hang, eyes half closed
- `barbara-cow.png` — Cow chewing, staring at camera
- `dennis-hamster.png` — Hamster on a wheel, exhausted
- `patricia-cat.png` — Cat looking away, disinterested
- `frank-pigeon.png` — Pigeon on a ledge, puffed up
- `margaret-chicken.png` — Chicken, slightly panicked
- `doug-dog.png` — Golden retriever, overly eager
- `cynthia-goat.png` — Goat mid-chew, judgmental

- [ ] **Step 6: Generate product hero images (25)**

Generate product images for each of the 25 products. Athletic/bold style consistent with the brand. Save to `public/sites/pettential/products/{slug}.png`.

- [ ] **Step 7: Run favicon resize script**

First, add `"pettential"` to the sites array in `scripts/resize-favicons.mjs`, then run:

```bash
node scripts/resize-favicons.mjs
```

- [ ] **Step 8: Commit all images**

```bash
git add public/sites/pettential/ public/shared/animal-testimonials/
git commit -m "feat(pettential): add all site images and shared animal portraits"
```

---

### Task 13: Manual Smoke Test

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Test all pages**

Visit each page with `?site=pettential`:

- `localhost:3000/?site=pettential` — Homepage
- `localhost:3000/shop?site=pettential` — Shop page
- `localhost:3000/shop/goldfish-treadmill-pro?site=pettential` — Product detail
- `localhost:3000/services?site=pettential` — Services page
- `localhost:3000/about?site=pettential` — About page
- `localhost:3000/leadership?site=pettential` — Leadership page
- `localhost:3000/contact?site=pettential` — Contact page
- `localhost:3000/privacy?site=pettential` — Privacy page
- `localhost:3000/terms?site=pettential` — Terms page
- `localhost:3000/cart?site=pettential` — Cart (empty state)
- `localhost:3000/checkout?site=pettential` — Checkout

- [ ] **Step 3: Test division filtering**

On the shop page, click each division badge and verify products filter correctly.

- [ ] **Step 4: Test add-to-cart flow**

Add a product to cart from the shop page, verify toast notification, navigate to cart, verify item appears.

- [ ] **Step 5: Test dynamic route 404**

Visit `localhost:3000/shop/nonexistent-slug?site=pettential` — should show 404.

- [ ] **Step 6: Fix any issues found**

If anything is broken, fix and commit.
