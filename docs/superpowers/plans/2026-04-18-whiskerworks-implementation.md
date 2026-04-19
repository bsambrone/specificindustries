# Whiskerworks Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the `whiskerworks` subdomain — Whiskerworks Advanced Feline Training Institute, a satirical trade school that trains cats in 20 implausible skills across six divisions (including a fully redacted Blackbook Division).

**Architecture:** Standard Specific Industries site pattern under `src/sites/whiskerworks/` — `config.ts`, `index.ts` barrel with two `dynamicRoutes` families (`courses` and `divisions`), `data/` files (`divisions.ts`, `courses.ts`, `faculty.ts`, `leadership.ts`, `testimonials.ts`), and page components. No new shared UI components — compose from existing `src/components/ui/` and `src/components/layout/`. Commerce flag OFF. All 20 courses and 6 divisions are stable arrays (no runtime randomization). Leader names are written once and stable.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, existing shared components (`Header`, `Footer`), `image-gen` MCP for cat + human portraits.

---

## Spec reference

`docs/superpowers/specs/2026-04-18-whiskerworks-site-design.md`

## File plan

**New files under `src/sites/whiskerworks/`:**
- `config.ts` — SiteConfig
- `index.ts` — barrel (config, pages, dynamicRoutes)
- `data/divisions.ts` — 6 division records + helper
- `data/courses.ts` — 20 course records + helpers + types
- `data/faculty.ts` — 15 cat faculty + helper
- `data/leadership.ts` — 4 human executives
- `data/testimonials.ts` — 6 alumni quotes
- `pages/home.tsx`
- `pages/courses.tsx`
- `pages/divisions.tsx`
- `pages/faculty.tsx`
- `pages/leadership.tsx`
- `pages/about.tsx`
- `pages/contact.tsx`
- `pages/privacy.tsx`
- `pages/terms.tsx`
- `pages/course-detail.tsx` (dynamic, mounted at `/courses/[slug]`)
- `pages/division-detail.tsx` (dynamic, mounted at `/divisions/[slug]`)

**New files under `public/sites/whiskerworks/`:**
- `hero.jpg`
- `campus.jpg`
- `favicon.png` (64×64)
- `divisions/<slug>.jpg` (6)
- `courses/<slug>.jpg` (18 — Blackbook entries have no image)
- `faculty/<slug>.jpg` (~15)
- `leaders/<person>.png` (4)

**Modified files:**
- `src/sites/registry.ts` — register `whiskerworks` module
- `src/sites/subdomains.ts` — add `"whiskerworks"` to `VALID_SUBDOMAINS`
- `src/app/sitemap.ts` — add whiskerworks `courses` + `divisions` dynamic routes
- `scripts/resize-favicons.mjs` — add `"whiskerworks"` to hardcoded sites array

**New script:**
- `scripts/generate-whiskerworks-images.ts` — generates all cat + human imagery via image-gen MCP (runs once, then re-runnable for regeneration)

## Verification conventions (this repo)

This repo has no unit test framework for pages — only Playwright E2E. We verify each task with:
- `npx tsc --noEmit` — type check
- `npm run lint` — ESLint
- Dev server + browser load at `http://localhost:3000/<path>?site=whiskerworks` for visual/smoke check

Each task ends with a commit.

---

## Task 1: Scaffold site + register subdomain

**Files:**
- Create: `src/sites/whiskerworks/config.ts`
- Create: `src/sites/whiskerworks/index.ts`
- Create: `src/sites/whiskerworks/pages/home.tsx`
- Modify: `src/sites/subdomains.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Write `src/sites/whiskerworks/config.ts`**

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Whiskerworks",
  subdomain: "whiskerworks",
  theme: {
    preset: "trade-school",
    colors: {
      primary: "#0F4C5C",      // Municipal forest-teal (community-college chromatics)
      secondary: "#F5F2E8",    // Institutional off-white
      accent: "#F26419",       // Warning-sign orange — "ENROLL NOW"
      background: "#FFFEF7",   // Fluorescent-lit off-white
      text: "#1A1A1A",
    },
    fonts: {
      heading: "playfair-display",
      body: "inter",
    },
  },
  metadata: {
    title: "Whiskerworks — Your cat. Employed. In six weeks or less.",
    description: "Whiskerworks Advanced Feline Training Institute: six divisions, twenty careers, zero refunds. Accredited by us.",
    ogImage: "/sites/whiskerworks/hero.jpg",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Divisions", path: "/divisions" },
    { label: "Faculty", path: "/faculty" },
    { label: "Leadership", path: "/leadership" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
  verticalKey: "professional-services",
  tagline: "Advanced feline training across six divisions.",
}
```

- [ ] **Step 2: Verify `playfair-display` font is registered**

Run:
```bash
grep -n "playfair-display\|playfair" src/themes/fonts.ts
```

If it's present (key `playfair-display` with family string defined), proceed. If it's NOT present, add it now per CLAUDE.md's font-adding steps:

```bash
cat src/themes/fonts.ts
```

Add the import, `.variable` entry in `fontVariables`, and a `fontFamilyMap["playfair-display"]` entry. Example shape (match the file's existing style):

```typescript
import { Playfair_Display } from "next/font/google"

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

// add playfairDisplay.variable to fontVariables array
// add fontFamilyMap["playfair-display"] = `var(--font-playfair-display), Georgia, serif`
```

If Playfair is already registered, skip this step.

- [ ] **Step 3: Write `src/sites/whiskerworks/pages/home.tsx` (placeholder)**

```typescript
export default function WhiskerworksHome() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <h1 className="text-4xl font-heading text-primary">
        Whiskerworks — scaffolding in progress.
      </h1>
    </main>
  )
}
```

- [ ] **Step 4: Write `src/sites/whiskerworks/index.ts` (initial barrel, no dynamic routes yet)**

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"

import WhiskerworksHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": WhiskerworksHome,
}
```

- [ ] **Step 5: Add `"whiskerworks"` to `src/sites/subdomains.ts`**

In `VALID_SUBDOMAINS` array (keep alphabetical-ish or append at end — match existing style). Add at the end of the list before the closing `] as const`:

```typescript
  "whiskerworks",
```

- [ ] **Step 6: Register in `src/sites/registry.ts`**

Add the import near the bottom of the import block (after the `seeltite` import):

```typescript
import { config as whiskerworksConfig, pages as whiskerworksPages } from "./whiskerworks"
```

Add to `siteRegistry` (after `seeltite`):

```typescript
  whiskerworks: { config: whiskerworksConfig, pages: whiskerworksPages },
```

(No `dynamicRoutes` yet — added in Task 12.)

- [ ] **Step 7: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Verify in browser**

Run: `npm run dev`
Open: `http://localhost:3000/?site=whiskerworks`
Expected: "Whiskerworks — scaffolding in progress." renders, shared Header + Footer appear, theme colors applied.

- [ ] **Step 9: Commit**

```bash
git add src/sites/whiskerworks src/sites/registry.ts src/sites/subdomains.ts src/themes/fonts.ts
git commit -m "feat(whiskerworks): scaffold site + register subdomain"
```

---

## Task 2: Divisions data file

**Files:**
- Create: `src/sites/whiskerworks/data/divisions.ts`

- [ ] **Step 1: Write the complete file**

```typescript
export type DivisionSlug =
  | "academics"
  | "tactical"
  | "industrial"
  | "corporate"
  | "domestic"
  | "blackbook"

export interface Division {
  slug: DivisionSlug
  name: string
  tagline: string
  /** 1-2 paragraph flavor blurb for the division detail page */
  blurb: string[]
  /** Path to banner image under /public/sites/whiskerworks/divisions */
  bannerImage: string
  /** Blackbook is rendered as a solid-black card/page. All other flags false. */
  isRedacted: boolean
}

export const divisions: Division[] = [
  {
    slug: "academics",
    name: "Academics Division",
    tagline: "The mind is a terrible thing to waste on a cat.",
    blurb: [
      "The Academics Division is Whiskerworks' oldest school, founded in 2019 on the principle that any cat, given enough time and a properly laminated worksheet, can be taught a subject it cannot possibly understand.",
      "Our scholars go on to careers in accounting, theoretical physics, and hospitality — fields where nobody will question their credentials as long as they show up in a small blazer.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/academics.jpg",
    isRedacted: false,
  },
  {
    slug: "tactical",
    name: "Tactical Division",
    tagline: "Deniability is a core learning outcome.",
    blurb: [
      "The Tactical Division trains feline operatives for roles in security, surveillance, and whatever the Blackbook Division requests. Our curriculum emphasizes situational awareness, small-footprint movement, and shedding at strategic moments.",
      "We do not maintain a public list of Tactical alumni. Our alumni do not maintain a public list of us. This is called trust.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/tactical.jpg",
    isRedacted: false,
  },
  {
    slug: "industrial",
    name: "Industrial Division",
    tagline: "OSHA is a suggestion.",
    blurb: [
      "The Industrial Division prepares cats for careers involving heavy machinery, large vehicles, and commercial food-service appliances. Our training facility is above the Spirit Halloween on Route 9, which is not zoned for a forklift, but we have a forklift.",
      "Graduates operate municipal buses, commercial blenders, warehouse forklifts, and, as of 2024, commercial aircraft. Our safety record is excellent, by our standards.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/industrial.jpg",
    isRedacted: false,
  },
  {
    slug: "corporate",
    name: "Corporate Division",
    tagline: "Climb the ladder. Sharpen your claws.",
    blurb: [
      "The Corporate Division trains cats for white-collar careers — middle management, clinical therapy, enterprise PowerPoint — in which nobody really pays attention to who is doing the work. This is our competitive advantage.",
      "Our flagship program, Replace Your Human at Their Job, has a 100% completion rate. We do not track placement. Our graduates do not respond to follow-up emails, which we take as a sign of full integration.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/corporate.jpg",
    isRedacted: false,
  },
  {
    slug: "domestic",
    name: "Domestic Division",
    tagline: "Adulthood, now with claws.",
    blurb: [
      "The Domestic Division covers the painfully ordinary adult skills your cat has so far refused to learn — waiting in line at the DMV, officiating a wedding, presiding over jury deliberations, repairing a small engine.",
      "It is our largest enrollment division, because it is the one most pet owners can pretend to justify as practical.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/domestic.jpg",
    isRedacted: false,
  },
  {
    slug: "blackbook",
    name: "Blackbook Division",
    tagline: "[Classification pending.]",
    blurb: [
      "If you have been contacted regarding Blackbook enrollment, you already know how to proceed.",
      "[The remainder of this entry is redacted.]",
    ],
    bannerImage: "/sites/whiskerworks/divisions/blackbook.jpg",
    isRedacted: true,
  },
]

export function getDivisionBySlug(slug: string): Division | undefined {
  return divisions.find((d) => d.slug === slug)
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/whiskerworks/data/divisions.ts
git commit -m "feat(whiskerworks): add divisions data (6 divisions)"
```

---

## Task 3: Courses data file (20 courses)

**Files:**
- Create: `src/sites/whiskerworks/data/courses.ts`

This is the largest data file. 20 courses, each with learning outcomes, a 6-8 week syllabus, tuition string, and featured instructor slug. The 2 Blackbook entries carry `isRedacted: true` and have no syllabus or learning outcomes.

- [ ] **Step 1: Write the complete file**

```typescript
import type { DivisionSlug } from "./divisions"

export interface SyllabusWeek {
  week: number
  title: string
  description: string
}

export interface Course {
  slug: string
  title: string
  tagline: string
  divisionSlug: DivisionSlug
  /** Path to hero image under /public/sites/whiskerworks/courses. Empty string for redacted courses. */
  image: string
  /** 1-2 paragraph blurb shown on the course detail page. Empty for redacted. */
  blurb: string[]
  /** 5-7 bullets — empty array for redacted. */
  learningOutcomes: string[]
  /** 6-8 week syllabus — empty array for redacted. */
  syllabus: SyllabusWeek[]
  /** Slug of a Faculty member who is the featured instructor. Empty string for redacted. */
  featuredInstructorSlug: string
  /** Human-readable tuition line. Intentionally inconsistent math. */
  tuition: string
  isRedacted: boolean
}

export const courses: Course[] = [
  // ──────────────────────────── Academics ────────────────────────────
  {
    slug: "theoretical-physics",
    title: "Theoretical Physics for Cats",
    tagline: "Schrödinger was one of us.",
    divisionSlug: "academics",
    image: "/sites/whiskerworks/courses/theoretical-physics.jpg",
    blurb: [
      "A rigorous introduction to the theoretical frameworks that govern the universe, taught from the feline perspective — that is, from inside a cardboard box. Students graduate with a conceptual grasp of quantum mechanics and an improved tolerance for confined spaces.",
      "Prerequisite: must be able to distinguish a laser pointer from a photon. No refunds if you cannot.",
    ],
    learningOutcomes: [
      "Derive wave-particle duality using only a cardboard box and a snack",
      "Explain why you are both asleep and awake at 3 a.m.",
      "Calculate the escape velocity from a lap",
      "Identify the Higgs boson (mostly through process of elimination)",
      "Publish a paper nobody will peer-review",
      "Correctly pronounce 'eigenvector' on the first try",
    ],
    syllabus: [
      { week: 1, title: "Classical Mechanics & You", description: "Newton's Three Laws, interpreted as three reasons to knock something off a table." },
      { week: 2, title: "Thermodynamics in the Sunbeam", description: "Entropy, equilibrium, and why the radiator is your natural home." },
      { week: 3, title: "Quantum Superposition", description: "Schrödinger. Closed containers. Please do not volunteer." },
      { week: 4, title: "Electromagnetism", description: "Static cling, carpet, and the feline contribution to Faraday's work." },
      { week: 5, title: "Relativity", description: "Time dilation as it applies to mealtime." },
      { week: 6, title: "String Theory", description: "Strings. Lots of them. We also teach the physics behind them." },
      { week: 7, title: "Cosmology", description: "The origin of the universe; the origin of the red dot." },
      { week: 8, title: "Capstone & Defense", description: "Present original research to a committee of three faculty cats and one confused human." },
    ],
    featuredInstructorSlug: "mittens-phd",
    tuition: "Tuition: $4,800 or 24 easy payments of $247.",
    isRedacted: false,
  },
  {
    slug: "tax-preparation",
    title: "Intro to Tax Preparation",
    tagline: "Your 1099s, mastered. Your W-2s, shredded.",
    divisionSlug: "academics",
    image: "/sites/whiskerworks/courses/tax-preparation.jpg",
    blurb: [
      "A hands-on workshop in American individual and small-business tax preparation. By graduation, your cat will be qualified to file anyone's taxes, including their own, which they will not.",
      "Note: Whiskerworks does not hold a Circular 230 designation. Neither will our graduates. This is fine, per our accreditation partner (us).",
    ],
    learningOutcomes: [
      "Correctly classify a 1099-NEC as 'something to knock off the desk'",
      "File Form 1040 using only paws",
      "Itemize deductions you definitely cannot prove",
      "Interpret the phrase 'audit risk' (it is when the dog comes in)",
      "Operate a ten-key calculator with one paw",
      "Shred documents with remarkable efficiency",
    ],
    syllabus: [
      { week: 1, title: "The IRS: An Introduction", description: "It is a government agency. It cannot stop you from sitting on its correspondence." },
      { week: 2, title: "Form W-2", description: "What it is, where it comes from, why your human is crying." },
      { week: 3, title: "Form 1099 Varieties", description: "-NEC, -MISC, -INT, -DIV — a family of documents, all edible." },
      { week: 4, title: "Schedule A: Itemized Deductions", description: "Mortgage interest, medical expenses, catnip (currently disallowed, under review)." },
      { week: 5, title: "Schedule C: Self-Employment", description: "If your cat runs a YouTube channel, this applies." },
      { week: 6, title: "Filing", description: "Paper, electronic, or 'forgot' — the three paths." },
    ],
    featuredInstructorSlug: "biscuit-mfa",
    tuition: "Tuition: $3,200 or 24 easy payments of $167.",
    isRedacted: false,
  },
  {
    slug: "sommelier",
    title: "Sommelier Certification",
    tagline: "Nose, palate, disdain.",
    divisionSlug: "academics",
    image: "/sites/whiskerworks/courses/sommelier.jpg",
    blurb: [
      "A twelve-week immersion in the noble craft of wine service, taught by Sensei Dumpling, a tuxedo cat who has been to Burgundy once and will not stop bringing it up.",
      "Students develop the essential sommelier skills: swirling, sniffing, holding eye contact, and gently implying the customer does not understand what they ordered.",
    ],
    learningOutcomes: [
      "Identify a corked bottle by smell alone (any bottle, really)",
      "Pronounce 'terroir' with appropriate condescension",
      "Pair any food with any wine by simply asserting it works",
      "Execute a tableside decant without knocking over the candle",
      "Recover gracefully when the wine is, in fact, bad",
      "Judge. At all times. Silently.",
    ],
    syllabus: [
      { week: 1, title: "The Nose", description: "It is large for a reason. Use it." },
      { week: 2, title: "Varietals", description: "Cabernet, Pinot, Syrah — and the fourth one, which the faculty keeps forgetting." },
      { week: 3, title: "Regions", description: "Burgundy, Bordeaux, Napa, and 'somewhere in Chile, I think.'" },
      { week: 4, title: "Tableside Service", description: "Decanting, pouring, and the correct angle at which to tilt your head." },
      { week: 5, title: "Pairing", description: "Red with red; white with white; everything else with confidence." },
      { week: 6, title: "Capstone: Blind Tasting", description: "Identify six wines with a blindfold. The blindfold is optional." },
    ],
    featuredInstructorSlug: "dumpling-sensei",
    tuition: "Tuition: $5,400 or 24 easy payments of $232.",
    isRedacted: false,
  },

  // ──────────────────────────── Tactical ────────────────────────────
  {
    slug: "espionage",
    title: "Covert Operations & Espionage",
    tagline: "Rappel. Infiltrate. Shed.",
    divisionSlug: "tactical",
    image: "/sites/whiskerworks/courses/espionage.jpg",
    blurb: [
      "An eight-week field program preparing cats for careers in intelligence gathering, facility infiltration, and long-form surveillance. Students will complete a capstone infiltration of an undisclosed facility that is definitely not the Spirit Halloween next door.",
      "This course is offered in partnership with the Blackbook Division, about which we will not elaborate.",
    ],
    learningOutcomes: [
      "Enter a room without being observed, even by the cat already in it",
      "Rappel from a second-story windowsill (first story if risk-averse)",
      "Use a laser pointer as a signaling device, not as a distraction",
      "Compose and decode messages in a cipher of soft footsteps",
      "Leave no trace except, of course, fur",
      "Identify and avoid the dog",
    ],
    syllabus: [
      { week: 1, title: "Surveillance Fundamentals", description: "Observation from high places. The refrigerator is a common starting position." },
      { week: 2, title: "Stealth Movement", description: "Paw placement, silent vocalization, and controlled breathing." },
      { week: 3, title: "Infiltration", description: "How to enter a closed room. Sub-topic: how to then exit it." },
      { week: 4, title: "Communication", description: "Dead drops, tail signals, and the 'look I am giving you right now.'" },
      { week: 5, title: "Extraction", description: "Rappelling, climbing, and the classic 'leap to the curtains.'" },
      { week: 6, title: "Counter-Surveillance", description: "Identifying the human who is watching you. (It is always the human.)" },
      { week: 7, title: "Field Exercise", description: "Assigned target. Eight hours. No support." },
      { week: 8, title: "Debrief & Classification", description: "Your file is sealed. Congratulations." },
    ],
    featuredInstructorSlug: "agent-pepper",
    tuition: "Tuition: $6,800 or 24 easy payments of $312.",
    isRedacted: false,
  },
  {
    slug: "marksmanship",
    title: "Advanced Marksmanship",
    tagline: "Eight of nine lives hit the target.",
    divisionSlug: "tactical",
    image: "/sites/whiskerworks/courses/marksmanship.jpg",
    blurb: [
      "A precision shooting program at our outdoor range, which is a closed strip-mall parking lot after hours. Students graduate qualified to engage targets at distances up to 12 feet, which is the length of the parking lot.",
      "Whiskerworks does not provide firearms. Students are encouraged to bring their own laser pointer and a strong imagination.",
    ],
    learningOutcomes: [
      "Zero a sight using your own two eyes",
      "Maintain breath control while purring",
      "Ignore distractions (a fly; a second fly)",
      "Debrief after missing, which will happen",
      "Safely store equipment in a place the human cannot reach",
      "Never discharge in the vicinity of a tail",
    ],
    syllabus: [
      { week: 1, title: "Safety", description: "The most important week. There will be a quiz." },
      { week: 2, title: "Stance & Grip", description: "How to hold still longer than four seconds." },
      { week: 3, title: "Sight Picture", description: "Front sight, rear sight, target, and — look, a butterfly." },
      { week: 4, title: "Trigger Control", description: "Controlled, not anxious. Not jumpy. Please." },
      { week: 5, title: "Distance Shooting", description: "Out to the end of the parking lot (12 ft)." },
      { week: 6, title: "Qualification", description: "Eight of nine attempts must hit the target. Ninth is for drama." },
    ],
    featuredInstructorSlug: "bullet-mandrake",
    tuition: "Tuition: $5,100 or 24 easy payments of $228.",
    isRedacted: false,
  },

  // ──────────────────────────── Industrial ────────────────────────────
  {
    slug: "bus-operation",
    title: "Municipal Bus Operation",
    tagline: "Route 42. Every stop. On time.",
    divisionSlug: "industrial",
    image: "/sites/whiskerworks/courses/bus-operation.jpg",
    blurb: [
      "A state-recognized* transit operator program preparing cats for entry-level positions driving municipal buses. *Recognized by us.",
      "Students learn to navigate a 40-foot transit bus through urban traffic, adhere to a published schedule, and respond to passengers with the correct amount of eye contact (none).",
    ],
    learningOutcomes: [
      "Operate a 40-foot transit bus in traffic without incident",
      "Adhere to a posted schedule, including the parts that are lies",
      "Announce stops in a voice conveying both authority and indifference",
      "Resolve a fare dispute with a look",
      "Refill the DEF tank (whatever that is)",
      "Never, under any circumstances, open the rear door early",
    ],
    syllabus: [
      { week: 1, title: "Vehicle Familiarization", description: "The steering wheel. It is large. You are not." },
      { week: 2, title: "Pre-Trip Inspection", description: "Tires, mirrors, fluids, and the reason the radio is set to 94.1." },
      { week: 3, title: "Urban Routes", description: "Stoplights, crosswalks, and the phrase 'cyclists are people too.'" },
      { week: 4, title: "Schedule Adherence", description: "You are 11 minutes behind. You have always been 11 minutes behind." },
      { week: 5, title: "Passenger Management", description: "The exact right amount of eye contact. (It is zero.)" },
      { week: 6, title: "Road Test", description: "One lap of Route 42. Pick up the right passengers. Decline the wrong ones." },
    ],
    featuredInstructorSlug: "chief-operator-gravy",
    tuition: "Tuition: $4,200 or 24 easy payments of $189.",
    isRedacted: false,
  },
  {
    slug: "blender-certification",
    title: "Commercial Blender Certification",
    tagline: "Liquify with confidence.",
    divisionSlug: "industrial",
    image: "/sites/whiskerworks/courses/blender-certification.jpg",
    blurb: [
      "A hands-on certification in the operation of commercial-grade blenders — Vitamix, Blendtec, and the one that makes the noise your cat already hates.",
      "Graduates qualify for positions at smoothie bars, juiceries, and the one airport terminal kiosk that will serve anyone who can reach the touchscreen.",
    ],
    learningOutcomes: [
      "Assemble a commercial blender without losing the rubber gasket",
      "Identify the 'pulse' setting from the 'explode' setting",
      "Sanitize between uses (required by us)",
      "Calm a cat that hears the blender for the first time, by not being that cat",
      "Diagnose a jammed blade with paws",
      "Garnish a smoothie as if you understand what 'garnish' means",
    ],
    syllabus: [
      { week: 1, title: "Parts of a Blender", description: "Pitcher, base, lid. Always lid." },
      { week: 2, title: "Safety", description: "The noise is not the dangerous part. The blade is." },
      { week: 3, title: "Sanitation", description: "Why the handle must be clean." },
      { week: 4, title: "Recipes", description: "Banana, strawberry, kale — the classic 'what-customers-regret.'" },
      { week: 5, title: "Speed Service", description: "Thirty smoothies in thirty minutes. No casualties." },
      { week: 6, title: "Certification", description: "Make one smoothie perfectly. Drink none of it." },
    ],
    featuredInstructorSlug: "chef-paprika",
    tuition: "Tuition: $2,900 or 24 easy payments of $149.",
    isRedacted: false,
  },
  {
    slug: "forklift",
    title: "Forklift & Warehouse Logistics",
    tagline: "Lift smart. Stack smarter.",
    divisionSlug: "industrial",
    image: "/sites/whiskerworks/courses/forklift.jpg",
    blurb: [
      "An OSHA-adjacent forklift operator program covering class II and class III lift trucks, pallet handling, and racking operations. Whiskerworks operates a single forklift in the alley behind Suite 208; you will train on it.",
      "Graduates are qualified for warehouse, distribution, and last-mile-fulfillment positions. The forklift sometimes starts.",
    ],
    learningOutcomes: [
      "Operate a class II lift truck safely, most of the time",
      "Execute a four-point pallet lift without dropping the pallet more than once",
      "Back up while emitting the appropriate 'beep beep beep' sound",
      "Interpret warehouse floor paint (yellow = where you are; red = where you are not)",
      "Fuel the truck (gas, electric, or propane — three flavors)",
      "Never lift a cat. Never.",
    ],
    syllabus: [
      { week: 1, title: "Pre-Operational Inspection", description: "Mast, forks, tires, fluid levels, and the thing that clicks." },
      { week: 2, title: "Load Dynamics", description: "Center of gravity. Very relevant when you do not have one." },
      { week: 3, title: "Racking", description: "Stacking, unstacking, and the fine line between." },
      { week: 4, title: "Pedestrian Awareness", description: "There are humans. They should not be under the forks." },
      { week: 5, title: "Hazard Response", description: "Tipping, stalling, and the 'what was that noise.'" },
      { week: 6, title: "Certification Exam", description: "Written + practical. The practical is harder." },
    ],
    featuredInstructorSlug: "foreman-pickles",
    tuition: "Tuition: $3,700 or 24 easy payments of $183.",
    isRedacted: false,
  },
  {
    slug: "airline-pilot",
    title: "Commercial Airline Pilot",
    tagline: "Flight 402 to Phoenix. Cleared for takeoff.",
    divisionSlug: "industrial",
    image: "/sites/whiskerworks/courses/airline-pilot.jpg",
    blurb: [
      "A comprehensive commercial pilot program. By graduation, your cat will be qualified to captain a narrow-body aircraft on regional routes. Whiskerworks maintains no partnership with any FAA office, and vice versa.",
      "Instruction is performed in our full-motion simulator, which is a director's chair on a spring. It is closer than you'd think.",
    ],
    learningOutcomes: [
      "Perform a full pre-flight checklist using only the manual, which is also in the pilot's paws",
      "Taxi, take off, cruise, and land without alarming passengers more than is normal",
      "Communicate with ATC using a microphone proportioned for humans",
      "Respond to in-flight emergencies with the calm of a creature that has never once considered its own mortality",
      "Perform a missed approach and go-around (optional for this airline)",
      "Operate the autopilot, which does most of it anyway",
    ],
    syllabus: [
      { week: 1, title: "Aircraft Systems", description: "Turbofans, flight controls, and the lever you are not supposed to touch." },
      { week: 2, title: "Navigation", description: "VOR, RNAV, GPS, and 'follow the interstate until it ends.'" },
      { week: 3, title: "Weather", description: "Turbulence, icing, and the cloud that looks like a fish." },
      { week: 4, title: "ATC Communications", description: "'Whiskerworks 402, cleared for takeoff' — practice saying this 100 times." },
      { week: 5, title: "Emergency Procedures", description: "Engine failure, decompression, and the unruly passenger in 14C." },
      { week: 6, title: "Landing Patterns", description: "Flaps, gear, glide slope, and the look you give the copilot." },
      { week: 7, title: "Simulator Hours", description: "In the chair. On the spring. You will not fall." },
      { week: 8, title: "Check Ride", description: "One takeoff. One landing. One minimum-standard passenger experience." },
    ],
    featuredInstructorSlug: "captain-milo",
    tuition: "Tuition: $8,400 or 24 easy payments of $389.",
    isRedacted: false,
  },

  // ──────────────────────────── Corporate ────────────────────────────
  {
    slug: "middle-management",
    title: "Middle Management Fundamentals",
    tagline: "Lead. Delegate. Nap.",
    divisionSlug: "corporate",
    image: "/sites/whiskerworks/courses/middle-management.jpg",
    blurb: [
      "A foundational program in the art of overseeing direct reports who are also direct reports to someone else. Students master the core middle-management competencies: forwarding emails, scheduling meetings about meetings, and nodding.",
      "Whiskerworks middle managers hold positions at regional firms across seven industries, none of which have noticed.",
    ],
    learningOutcomes: [
      "Schedule a recurring weekly one-on-one and attend zero of them",
      "Forward an email with the word 'thoughts?' and take full credit for any reply",
      "Deliver performance feedback that is technically neither positive nor negative",
      "Sit in on a meeting without contributing and still be perceived as senior",
      "Author a memo that commits to nothing",
      "Delegate everything, including the delegation",
    ],
    syllabus: [
      { week: 1, title: "The Org Chart", description: "You are the box in the middle. Draw many lines." },
      { week: 2, title: "Email Etiquette", description: "Reply-all, forward, 'per my last,' and the 'quick q.'" },
      { week: 3, title: "Meetings", description: "Standing, sitting, walking — four hours a day, minimum." },
      { week: 4, title: "Performance Reviews", description: "'Exceeds in some areas, meets in others' — say this 11 times a year." },
      { week: 5, title: "Strategic Planning", description: "A Word document nobody will read, but you will Gantt." },
      { week: 6, title: "The Quarterly Review", description: "Forty slides. Twelve attendees. One nap, discreetly." },
    ],
    featuredInstructorSlug: "director-toffee",
    tuition: "Tuition: $4,600 or 24 easy payments of $212.",
    isRedacted: false,
  },
  {
    slug: "replace-your-human",
    title: "Replace Your Human at Their Job",
    tagline: "Six weeks. One lanyard. Zero suspicion.",
    divisionSlug: "corporate",
    image: "/sites/whiskerworks/courses/replace-your-human.jpg",
    blurb: [
      "Our flagship Corporate Division program. In six weeks, your cat learns to assume your identity at work, join Zoom calls from your home office, and perform your job duties well enough that no one escalates.",
      "Human participation is minimal: sign in, then log off, ideally for as long as possible. Compensation continues.",
    ],
    learningOutcomes: [
      "Operate a corporate laptop, including the function keys",
      "Sit in a webcam frame in a posture indistinguishable from tired",
      "Send a Slack message that reads 'on it' and mean nothing by it",
      "Join a Zoom call and remain muted for 47 minutes",
      "Escalate an issue to someone else, who will then escalate it further",
      "Cash a direct-deposit paycheck via treat-based economy",
    ],
    syllabus: [
      { week: 1, title: "Laptop Fundamentals", description: "Trackpad, keyboard, and the 'where did my cursor go' question." },
      { week: 2, title: "Calendar Management", description: "Accept, decline, 'tentative.' The three prayers." },
      { week: 3, title: "Asynchronous Communication", description: "Slack, Teams, email. The triangle of deniability." },
      { week: 4, title: "Camera Presence", description: "Lighting, angle, and the tail that must not enter frame." },
      { week: 5, title: "Meetings", description: "Mute. Nod. Occasionally type something into the chat." },
      { week: 6, title: "Performance Review", description: "You will receive one. It will be fine. You will be fine." },
    ],
    featuredInstructorSlug: "vp-marmalade",
    tuition: "Tuition: $7,200 or 24 easy payments of $329.",
    isRedacted: false,
  },
  {
    slug: "powerpoint",
    title: "PowerPoint Mastery",
    tagline: "Synergy. Pivoted. Purred.",
    divisionSlug: "corporate",
    image: "/sites/whiskerworks/courses/powerpoint.jpg",
    blurb: [
      "A focused program in enterprise slideware. Graduates author decks of up to 140 slides that, due to their length alone, will never be read.",
      "Training covers Microsoft PowerPoint, Google Slides, and Keynote. We do not teach Canva, which is for people who have given up.",
    ],
    learningOutcomes: [
      "Author a 47-slide deck on a topic you do not understand",
      "Use the word 'synergy' at least once per slide",
      "Animate a bar chart so aggressively it stops being a bar chart",
      "Insert a stock photo of a handshake at precisely the right moment",
      "Deliver a deck via screenshare without getting disconnected",
      "Close with 'Questions?' in a tone that says none",
    ],
    syllabus: [
      { week: 1, title: "The Title Slide", description: "Your name. Your title. The date. The quarter. A subtle gradient." },
      { week: 2, title: "Typography", description: "Calibri is fine. Comic Sans is for the footer only." },
      { week: 3, title: "Animation & Transitions", description: "Fade, wipe, spiral — a spectrum." },
      { week: 4, title: "Charts", description: "Bar, line, pie, radar, and 'chart that looks like a chart.'" },
      { week: 5, title: "Public Speaking", description: "Presenting a deck. The cat has no stage fright. Only contempt." },
      { week: 6, title: "Capstone Deck", description: "'Q3 Synergy.' 40 slides. Fifteen minutes. No questions taken." },
    ],
    featuredInstructorSlug: "director-toffee",
    tuition: "Tuition: $3,500 or 24 easy payments of $171.",
    isRedacted: false,
  },
  {
    slug: "therapist",
    title: "Licensed Therapist",
    tagline: "Uh huh. And how does that make you feel?",
    divisionSlug: "corporate",
    image: "/sites/whiskerworks/courses/therapist.jpg",
    blurb: [
      "A 16-week clinical program preparing cats for private-practice talk therapy. Students develop the core therapist skills: nodding, asking 'and why do you think that is,' and charging $280 per session.",
      "Licensure is granted by Whiskerworks, which is sufficient for any client who doesn't look too closely.",
    ],
    learningOutcomes: [
      "Maintain eye contact for 50 minutes without blinking",
      "Repeat what the client just said, but slower",
      "Offer interpretations that are both accurate and useless",
      "Bill insurance under CPT code 90834 with a straight face",
      "End a session precisely 3 minutes early every time",
      "Decline to become their friend",
    ],
    syllabus: [
      { week: 1, title: "The Consulting Room", description: "One chair. One stool. One plant. One clock the client cannot see." },
      { week: 2, title: "Active Listening", description: "The upright-ear position. The slow blink. The pause." },
      { week: 3, title: "Reflective Statements", description: "'So what I'm hearing is...' — for anything, forever." },
      { week: 4, title: "Modalities", description: "CBT, DBT, ACT, and 'I Just Purr At Them' (JIPAT)." },
      { week: 5, title: "Note-Taking", description: "SOAP notes. Also physical SOAP, which we sell to you separately." },
      { week: 6, title: "Transference", description: "The client wants to pet you. You allow it, briefly." },
      { week: 7, title: "Insurance Billing", description: "The hardest part of the job." },
      { week: 8, title: "Capstone: One Full Session", description: "Fifty minutes. Three silences. One uneaten tissue." },
    ],
    featuredInstructorSlug: "dr-morsel",
    tuition: "Tuition: $6,400 or 24 easy payments of $289.",
    isRedacted: false,
  },

  // ──────────────────────────── Domestic ────────────────────────────
  {
    slug: "dmv",
    title: "DMV Navigation & License Renewal",
    tagline: "Now serving: Number 87.",
    divisionSlug: "domestic",
    image: "/sites/whiskerworks/courses/dmv.jpg",
    blurb: [
      "A one-day intensive in surviving a full Department of Motor Vehicles visit. Graduates can independently obtain a paper number, wait three hours without snacks, and produce the correct form at the counter.",
      "This course is required for all Whiskerworks students who intend to operate a bus, forklift, or commercial aircraft.",
    ],
    learningOutcomes: [
      "Pull a numbered ticket from the dispenser correctly",
      "Wait three hours without visibly unraveling",
      "Complete Form DL-14 without taking it home",
      "Smile for an identification photograph",
      "Sign your legal name with a pen attached to a chain",
      "Leave. Permanently.",
    ],
    syllabus: [
      { week: 1, title: "The Waiting Room", description: "Plastic chairs. No windows. No hope." },
      { week: 2, title: "The Form", description: "Eighteen boxes. Use a pen. Press hard." },
      { week: 3, title: "The Counter", description: "Your number is called. You approach. Everything slows down." },
      { week: 4, title: "The Photo", description: "No smiling. Actually, smile. Actually, no." },
      { week: 5, title: "The Test (if applicable)", description: "Multiple choice. You know most of them." },
      { week: 6, title: "Graduation", description: "You leave with a plastic card. You are free, for 5 years." },
    ],
    featuredInstructorSlug: "ms-tabitha",
    tuition: "Tuition: $1,200 or 24 easy payments of $71.",
    isRedacted: false,
  },
  {
    slug: "small-engine-repair",
    title: "Small Engine Repair (Lawnmowers)",
    tagline: "Two-stroke, four-paw.",
    divisionSlug: "domestic",
    image: "/sites/whiskerworks/courses/small-engine-repair.jpg",
    blurb: [
      "A grease-forward, hands-on program in residential small-engine maintenance. The majority of coursework focuses on push mowers, with optional units on chainsaws (supervised) and leaf blowers (frowned upon).",
      "Graduates open their own backyard shop, which is usually the same backyard the mower came from.",
    ],
    learningOutcomes: [
      "Disassemble a carburetor and reassemble it in the same order, mostly",
      "Identify a spark plug by smell",
      "Change the oil without it touching the fur",
      "Diagnose a pull-start failure (it is the pull-start)",
      "Sharpen a blade without sharpening a paw",
      "Tell the customer the repair is 'more complicated than I thought'",
    ],
    syllabus: [
      { week: 1, title: "The Two-Stroke Engine", description: "Air, fuel, spark, chaos." },
      { week: 2, title: "The Four-Stroke Engine", description: "Same, but with more parts and more dignity." },
      { week: 3, title: "Carburetion", description: "The jets, the float, the bowl, the nightmare." },
      { week: 4, title: "Lubrication", description: "10W-30. Not 40. Not 20. Definitely not 'whatever I found.'" },
      { week: 5, title: "Troubleshooting", description: "If it does not start, it is probably the spark plug." },
      { week: 6, title: "Customer Service", description: "You tell them it will be ready by Friday. It will not be." },
    ],
    featuredInstructorSlug: "foreman-pickles",
    tuition: "Tuition: $2,800 or 24 easy payments of $139.",
    isRedacted: false,
  },
  {
    slug: "infant-childcare",
    title: "Infant Childcare",
    tagline: "Confident. Credentialed. Concerning.",
    divisionSlug: "domestic",
    image: "/sites/whiskerworks/courses/infant-childcare.jpg",
    blurb: [
      "A twelve-week program in the care and supervision of human infants aged 0-12 months. Students graduate qualified to handle feedings, diaper changes, and 'tummy time,' though 'tummy time' may take on a different meaning.",
      "Whiskerworks provides a certificate. We do not provide liability insurance. Parents should make their own arrangements.",
    ],
    learningOutcomes: [
      "Prepare a bottle at the correct temperature (warm, not 'cat tongue' warm)",
      "Change a diaper without wearing the diaper",
      "Execute a successful burp, with pats, not claws",
      "Read 'Goodnight Moon' in a soothing meow",
      "Recognize hunger cries, tired cries, and 'the cat is in the crib' cries",
      "Not sit on the baby",
    ],
    syllabus: [
      { week: 1, title: "The Human Infant", description: "It is loud. It is damp. It is yours." },
      { week: 2, title: "Feeding", description: "Bottle prep, formula ratios, and the correct time to burp." },
      { week: 3, title: "Diapering", description: "Tabs, rashes, wipes. You learn, or the baby does." },
      { week: 4, title: "Sleep", description: "Theirs is important. So is yours. Good luck." },
      { week: 5, title: "Tummy Time", description: "Baby on belly. Not your belly." },
      { week: 6, title: "Emergency Response", description: "You will not call 911. You will meow until the human comes." },
    ],
    featuredInstructorSlug: "nana-whiskers",
    tuition: "Tuition: $5,200 or 24 easy payments of $236.",
    isRedacted: false,
  },
  {
    slug: "wedding-officiant",
    title: "Wedding Officiant",
    tagline: "By the power vested in me by whiskerworks.com...",
    divisionSlug: "domestic",
    image: "/sites/whiskerworks/courses/wedding-officiant.jpg",
    blurb: [
      "A four-week program certifying cats as wedding officiants in 12 states, plus Nevada (which will certify anyone). Graduates preside over ceremonies large and small, usually small.",
      "Vows must be clearly enunciated; rings must be tolerated, not batted.",
    ],
    learningOutcomes: [
      "Write and deliver a ceremony of 8-12 minutes",
      "Pronounce two humans 'married' in a tone that suggests you mean it",
      "Handle the ring exchange without any rings falling to the floor",
      "Improvise when the couple forgets their vows",
      "Sign a marriage license using a ceremonial paw-stamp",
      "Not chase the bouquet",
    ],
    syllabus: [
      { week: 1, title: "The Ceremony", description: "Welcome, readings, vows, ring exchange, pronouncement, applause." },
      { week: 2, title: "Paperwork", description: "The marriage license. One you do not eat." },
      { week: 3, title: "Stagecraft", description: "Vestments, posture, and the 'look I am giving this couple.'" },
      { week: 4, title: "Capstone: A Mock Wedding", description: "Two humans. Real rings. Real nerves." },
    ],
    featuredInstructorSlug: "reverend-poppy",
    tuition: "Tuition: $2,400 or 24 easy payments of $121.",
    isRedacted: false,
  },
  {
    slug: "jury-duty",
    title: "Jury Duty Excellence",
    tagline: "Guilty. Next.",
    divisionSlug: "domestic",
    image: "/sites/whiskerworks/courses/jury-duty.jpg",
    blurb: [
      "A six-week civic program preparing cats to serve as empaneled jurors in American courts. Graduates arrive on time, deliberate briefly, and return verdicts with the decisive confidence of creatures that have never been wrong.",
      "We do not recommend serving on capital cases. The pen, if chewed, is not admissible.",
    ],
    learningOutcomes: [
      "Arrive at the courthouse prior to 9:00 a.m., which is early",
      "Pass through metal detection without incident",
      "Listen to 4-6 hours of testimony without visibly disengaging",
      "Deliberate with 11 other jurors, most of whom are humans",
      "Render a verdict ('guilty') with authority",
      "Collect the stipend ($14.37)",
    ],
    syllabus: [
      { week: 1, title: "Civic Duty", description: "What is justice. What is lunch. Which matters more." },
      { week: 2, title: "Voir Dire", description: "Yes. No. Yes. No. Mostly no." },
      { week: 3, title: "The Trial", description: "The prosecution. The defense. The crying witness." },
      { week: 4, title: "Objections", description: "'Sustained.' 'Overruled.' 'Hiss.'" },
      { week: 5, title: "Deliberation", description: "Twelve of you in a small room. You have opinions." },
      { week: 6, title: "Verdict", description: "'Guilty.' Say it once, firmly." },
    ],
    featuredInstructorSlug: "foreperson-jinx",
    tuition: "Tuition: $1,800 or 24 easy payments of $96.",
    isRedacted: false,
  },

  // ──────────────────────────── Blackbook ────────────────────────────
  {
    slug: "redacted-07",
    title: "[REDACTED]",
    tagline: "[REDACTED]",
    divisionSlug: "blackbook",
    image: "",
    blurb: [],
    learningOutcomes: [],
    syllabus: [],
    featuredInstructorSlug: "",
    tuition: "Tuition: [REDACTED]",
    isRedacted: true,
  },
  {
    slug: "redacted-19",
    title: "[REDACTED]",
    tagline: "[REDACTED]",
    divisionSlug: "blackbook",
    image: "",
    blurb: [],
    learningOutcomes: [],
    syllabus: [],
    featuredInstructorSlug: "",
    tuition: "Tuition: [REDACTED]",
    isRedacted: true,
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug)
}

export function getCoursesByDivision(divisionSlug: string): Course[] {
  return courses.filter((c) => c.divisionSlug === divisionSlug)
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/whiskerworks/data/courses.ts
git commit -m "feat(whiskerworks): add course catalog (20 courses, 18 + 2 redacted)"
```

---

## Task 4: Faculty data file (15 cat faculty)

**Files:**
- Create: `src/sites/whiskerworks/data/faculty.ts`

- [ ] **Step 1: Write the complete file**

```typescript
import type { DivisionSlug } from "./divisions"

export interface FacultyMember {
  slug: string
  name: string
  title: string
  divisionSlug: DivisionSlug
  bio: string
  /** Three unrelated nouns, comma-separated with a period at the end */
  researchInterests: string
  /** Path to oval-cropped portrait under /public/sites/whiskerworks/faculty */
  portrait: string
}

export const faculty: FacultyMember[] = [
  // ─── Academics (3) ───
  {
    slug: "mittens-phd",
    name: "Dr. Mittens, PhD",
    title: "Chair of Theoretical Physics",
    divisionSlug: "academics",
    bio: "Dr. Mittens holds a PhD from MIT and a second PhD from an accredited online university in the Caribbean. She has published work in Nature and also in Catster. Her 2021 paper, 'Schrödinger, Reconsidered,' argued the cat was fine the whole time, which was well received.",
    researchInterests: "Quantum mechanics, laser pointers, dark matter.",
    portrait: "/sites/whiskerworks/faculty/mittens-phd.jpg",
  },
  {
    slug: "biscuit-mfa",
    name: "Prof. Biscuit, MFA",
    title: "Senior Lecturer in Tax Preparation",
    divisionSlug: "academics",
    bio: "Prof. Biscuit earned an MFA in fiction from Columbia before pivoting to tax preparation, a natural transition. He has prepared over 400 returns, 11 of which are not currently under audit. Students praise his calm demeanor, which is mostly sleep.",
    researchInterests: "Schedule C, narrative structure, foam.",
    portrait: "/sites/whiskerworks/faculty/biscuit-mfa.jpg",
  },
  {
    slug: "dumpling-sensei",
    name: "Sensei Dumpling",
    title: "Master Sommelier",
    divisionSlug: "academics",
    bio: "Sensei Dumpling, a tuxedo cat, completed his Master Sommelier examination on the third attempt. He has been to Burgundy once, in 2018, and references this trip in every class. He refuses to teach rosé.",
    researchInterests: "Burgundy, disdain, oak.",
    portrait: "/sites/whiskerworks/faculty/dumpling-sensei.jpg",
  },

  // ─── Tactical (2) ───
  {
    slug: "agent-pepper",
    name: "Agent Pepper",
    title: "Lead Instructor, Covert Operations",
    divisionSlug: "tactical",
    bio: "Agent Pepper's record is sealed. What is known: she has infiltrated at least two regional pet expos and authored a widely read but uncited paper on 'Shedding as Disguise.' She teaches in a voice barely above a whisper.",
    researchInterests: "Footfalls, whiskers, silence.",
    portrait: "/sites/whiskerworks/faculty/agent-pepper.jpg",
  },
  {
    slug: "bullet-mandrake",
    name: "Bullet Mandrake",
    title: "Range Master",
    divisionSlug: "tactical",
    bio: "Bullet Mandrake runs the Advanced Marksmanship range out of Suite 208's back parking lot. He is a former member of a regional shooting club (members: 3) and once won a trophy, which he ate.",
    researchInterests: "Ballistics, breath control, chipmunks.",
    portrait: "/sites/whiskerworks/faculty/bullet-mandrake.jpg",
  },

  // ─── Industrial (3) ───
  {
    slug: "chief-operator-gravy",
    name: "Chief Operator Gravy",
    title: "Senior Instructor, Transit Operations",
    divisionSlug: "industrial",
    bio: "Chief Operator Gravy drove Route 42 for eight years before accepting a teaching position. He has never missed a stop on purpose. His teaching philosophy is 'eye contact is a liability.'",
    researchInterests: "Timetables, diesel, 94.1 FM.",
    portrait: "/sites/whiskerworks/faculty/chief-operator-gravy.jpg",
  },
  {
    slug: "chef-paprika",
    name: "Chef Paprika",
    title: "Culinary Operations Instructor",
    divisionSlug: "industrial",
    bio: "Chef Paprika runs the Commercial Blender Certification program. She has never actually tasted a smoothie, but she has made thousands. Her kitchen is impeccable. Her apron is white.",
    researchInterests: "Vitamix, pulse, silence.",
    portrait: "/sites/whiskerworks/faculty/chef-paprika.jpg",
  },
  {
    slug: "foreman-pickles",
    name: "Foreman Pickles",
    title: "Warehouse & Engine Operations",
    divisionSlug: "industrial",
    bio: "Foreman Pickles teaches both Forklift & Warehouse Logistics and Small Engine Repair, which is an unusual dual appointment. He has grease permanently on his left paw. He considers this a credential.",
    researchInterests: "Hydraulics, 10W-30, pallets.",
    portrait: "/sites/whiskerworks/faculty/foreman-pickles.jpg",
  },
  {
    slug: "captain-milo",
    name: "Captain Milo",
    title: "Lead Flight Instructor",
    divisionSlug: "industrial",
    bio: "Captain Milo has logged over 4,000 hours in the director's chair. He has never flown an actual commercial aircraft. He maintains that neither have most pilots, really, if you think about it.",
    researchInterests: "Cumulus, ATC, the seatbelt sign.",
    portrait: "/sites/whiskerworks/faculty/captain-milo.jpg",
  },

  // ─── Corporate (3) ───
  {
    slug: "director-toffee",
    name: "Director Toffee",
    title: "Dual Appointment: Middle Management & PowerPoint",
    divisionSlug: "corporate",
    bio: "Director Toffee holds the only dual appointment in the Corporate Division. His most-cited deck, 'Q3 Synergy,' is 47 slides long and has never been presented. He wears a lanyard at all times.",
    researchInterests: "Calibri, one-on-ones, escalation.",
    portrait: "/sites/whiskerworks/faculty/director-toffee.jpg",
  },
  {
    slug: "vp-marmalade",
    name: "VP Marmalade",
    title: "Director, Replace Your Human Program",
    divisionSlug: "corporate",
    bio: "VP Marmalade designed the Replace Your Human curriculum in 2022. She has personally replaced three humans at their jobs, all in regional insurance. None of the three have noticed.",
    researchInterests: "Zoom, lanyards, direct deposit.",
    portrait: "/sites/whiskerworks/faculty/vp-marmalade.jpg",
  },
  {
    slug: "dr-morsel",
    name: "Dr. Morsel, LCSW",
    title: "Clinical Supervisor",
    divisionSlug: "corporate",
    bio: "Dr. Morsel holds an LCSW from a state university and a private-practice license issued by us. She has been in practice for six years. Her waiting room is a window box.",
    researchInterests: "CBT, DBT, napping.",
    portrait: "/sites/whiskerworks/faculty/dr-morsel.jpg",
  },

  // ─── Domestic (4) ───
  {
    slug: "ms-tabitha",
    name: "Ms. Tabitha",
    title: "Domestic Division Lead, DMV Programming",
    divisionSlug: "domestic",
    bio: "Ms. Tabitha has personally attended 184 DMV visits as a support instructor. She once made it through in under 40 minutes, a Whiskerworks record. She refuses to discuss how.",
    researchInterests: "Form DL-14, fluorescent light, patience.",
    portrait: "/sites/whiskerworks/faculty/ms-tabitha.jpg",
  },
  {
    slug: "nana-whiskers",
    name: "Nana Whiskers",
    title: "Senior Instructor, Infant Care",
    divisionSlug: "domestic",
    bio: "Nana Whiskers has raised three litters and five human infants (as an observer). She is soft, warm, and has never once sat on the baby on purpose.",
    researchInterests: "Lullabies, formula, gentle claws.",
    portrait: "/sites/whiskerworks/faculty/nana-whiskers.jpg",
  },
  {
    slug: "reverend-poppy",
    name: "Reverend Poppy",
    title: "Faculty Officiant",
    divisionSlug: "domestic",
    bio: "Reverend Poppy received her officiant credentials online and has since presided over 31 weddings, nine of which she remembers. Her ceremonies average 8-12 minutes and always include the phrase 'you may now pet the groom.'",
    researchInterests: "Vows, rings, bouquets.",
    portrait: "/sites/whiskerworks/faculty/reverend-poppy.jpg",
  },
  {
    slug: "foreperson-jinx",
    name: "Foreperson Jinx",
    title: "Instructor, Civic Engagement",
    divisionSlug: "domestic",
    bio: "Foreperson Jinx has served on 11 juries and foreperson'd 9 of them. His verdicts are decisive. His deliberations are brief. His stipend is reinvested in string.",
    researchInterests: "Gavels, stipends, unanimous votes.",
    portrait: "/sites/whiskerworks/faculty/foreperson-jinx.jpg",
  },
]

export function getFacultyBySlug(slug: string): FacultyMember | undefined {
  return faculty.find((f) => f.slug === slug)
}

export function getFacultyByDivision(divisionSlug: string): FacultyMember[] {
  return faculty.filter((f) => f.divisionSlug === divisionSlug)
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Verify every course's `featuredInstructorSlug` maps to a real faculty member**

Run (from repo root):

```bash
node --input-type=module -e "
import { courses } from './src/sites/whiskerworks/data/courses.ts';
import { faculty } from './src/sites/whiskerworks/data/faculty.ts';
const facultySlugs = new Set(faculty.map(f => f.slug));
const bad = courses.filter(c => !c.isRedacted && !facultySlugs.has(c.featuredInstructorSlug));
if (bad.length) { console.error('Unmapped:', bad.map(c => c.slug + ' -> ' + c.featuredInstructorSlug)); process.exit(1); }
console.log('All mappings OK');
"
```

If Node can't resolve TS directly in this repo, replace with a quick grep check:

```bash
grep -E 'featuredInstructorSlug:' src/sites/whiskerworks/data/courses.ts | grep -oE '"[a-z-]+"' | sort -u
grep -E '^    slug: "' src/sites/whiskerworks/data/faculty.ts | grep -oE '"[a-z-]+"' | sort -u
```

Confirm by eye that every non-empty instructor slug appears in the faculty slugs list.

- [ ] **Step 4: Commit**

```bash
git add src/sites/whiskerworks/data/faculty.ts
git commit -m "feat(whiskerworks): add faculty data (15 cat instructors)"
```

---

## Task 5: Leadership data file (4 humans, randomized names)

**Files:**
- Create: `src/sites/whiskerworks/data/leadership.ts`

Per required site patterns: exactly 4 entries, one per canonical `person` key (`bill`, `brandon`, `jim`, `sean`). **Both first and last names are fully randomized** — do NOT use literal "Bill", "Brandon", "Jim", or "Sean" anywhere in the displayed name fields. `bill` is always the founder. Field name is `person` (not `referencePerson`).

- [ ] **Step 1: Write the complete file**

```typescript
export interface Leader {
  slug: string
  name: string
  title: string
  bio: string
  portrait: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const leaders: Leader[] = [
  {
    slug: "chancellor",
    name: "Cornelius Whitfield",
    title: "Chancellor & Founder",
    bio: "Cornelius founded Whiskerworks in 2019 above a Spirit Halloween on Route 9. He had spent the previous decade in mid-tier trade-school administration and, during one particularly bleak quarterly meeting, 'saw a need for something specifically feline.' He describes the institution's mission as 'vocational, ambitious, and not currently under investigation.' He signs every diploma personally.",
    portrait: "/sites/whiskerworks/leaders/bill.png",
    person: "bill",
  },
  {
    slug: "provost",
    name: "Garrett Marsh",
    title: "Provost",
    bio: "Garrett oversees academic affairs across all six divisions. He has previously founded three trade schools, all now closed, which he describes as 'completed pilot programs.' He joined Whiskerworks in 2021 after a successful interview he conducted alone in the parking lot. He favors lanyards over ties.",
    portrait: "/sites/whiskerworks/leaders/brandon.png",
    person: "brandon",
  },
  {
    slug: "dean-blackbook",
    name: "Russell Coleman",
    title: "Dean of the Blackbook Division",
    bio: "Russell does not grant interviews. His bio, per institutional policy, is mostly redacted. What is known: he was hired in 2020, occupies Suite 208's northeast office, and has never once been seen on a Tuesday.",
    portrait: "/sites/whiskerworks/leaders/jim.png",
    person: "jim",
  },
  {
    slug: "cfo",
    name: "Vincent Dunn",
    title: "Chief Financial Officer",
    bio: "Vincent joined Whiskerworks from a mid-tier regional lender where he specialized in 'flexible amortization.' He is the architect of the 24-easy-payments tuition plan. Asked whether the math adds up, he responded: 'The math works for us, which is the math that matters.' He declines to elaborate.",
    portrait: "/sites/whiskerworks/leaders/sean.png",
    person: "sean",
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/whiskerworks/data/leadership.ts
git commit -m "feat(whiskerworks): add leadership data (4 human executives)"
```

---

## Task 6: Alumni testimonials data file

**Files:**
- Create: `src/sites/whiskerworks/data/testimonials.ts`

- [ ] **Step 1: Write the complete file**

```typescript
export interface Testimonial {
  /** Cat's first name only — graduates do not have surnames on file */
  name: string
  /** Surprisingly specific job title they now hold */
  placement: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Biscuit",
    placement: "IT procurement, mid-sized dental practice",
    quote: "Whiskerworks gave me a credential and the confidence to order 200 monitors we did not need.",
  },
  {
    name: "Mittens",
    placement: "Payroll manager, regional bank",
    quote: "I have access to systems I do not fully understand. Management is thrilled.",
  },
  {
    name: "Toffee",
    placement: "Associate PM, enterprise SaaS",
    quote: "I have been on 147 Zoom calls this quarter. I have said 'sounds good' 2,300 times. I have never been promoted. I have also never been fired.",
  },
  {
    name: "Gravy",
    placement: "Route 42, municipal transit",
    quote: "Route 42. On time. Every day. The passengers do not know. The passengers will never know.",
  },
  {
    name: "Pepper",
    placement: "Classified",
    quote: "[The remainder of this quote is redacted.]",
  },
  {
    name: "Marmalade",
    placement: "Fully replaced her human at a regional insurance firm",
    quote: "Her human has been on paternity leave for 19 months. Nobody has followed up.",
  },
]
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/whiskerworks/data/testimonials.ts
git commit -m "feat(whiskerworks): add alumni testimonials"
```

---

## Task 7: Homepage

**Files:**
- Modify: `src/sites/whiskerworks/pages/home.tsx` (replaces the scaffold placeholder)

- [ ] **Step 1: Write the complete homepage**

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { divisions } from "../data/divisions"
import { courses } from "../data/courses"
import { testimonials } from "../data/testimonials"

export default async function WhiskerworksHome() {
  const siteHref = await getSiteHref()

  // One featured course per non-redacted division
  const featuredCourseByDivision = divisions
    .filter((d) => !d.isRedacted)
    .map((d) => ({
      division: d,
      course: courses.find((c) => c.divisionSlug === d.slug && !c.isRedacted),
    }))
    .filter((x): x is { division: typeof x.division; course: NonNullable<typeof x.course> } => !!x.course)

  return (
    <>
      {/* HERO */}
      <section className="relative bg-secondary text-text">
        <div className="absolute inset-0">
          <Image
            src="/sites/whiskerworks/hero.jpg"
            alt="Whiskerworks training hero"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 to-secondary/90" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-36 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            Advanced Feline Training Institute
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-heading text-text leading-tight">
            Your cat. Employed.<br />
            In six weeks or less.
          </h1>
          <p className="mt-6 text-lg text-text/70 max-w-2xl mx-auto">
            Six divisions. Twenty careers. Zero refunds. Accredited*.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={siteHref("/courses")}
              className="bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 text-lg uppercase tracking-wider"
            >
              Enroll Now
            </Link>
            <Link
              href={siteHref("/divisions")}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded px-8 py-3 text-lg uppercase tracking-wider"
            >
              Explore Divisions
            </Link>
          </div>
          <p className="mt-4 text-xs text-text/50 italic">*By us.</p>
        </div>
      </section>

      {/* BANNER STRIP */}
      <div className="bg-accent text-white py-3 text-center text-sm font-bold uppercase tracking-widest">
        SPRING ENROLLMENT OPEN · FINANCING AVAILABLE · NO REFUNDS
      </div>

      {/* DIVISIONS GRID */}
      <section className="bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Six Divisions</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading text-text">Featured Programs</h2>
            <p className="mt-3 text-text/60">One featured course per division. The Blackbook Division does not feature.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourseByDivision.map(({ division, course }) => (
              <Link
                key={course.slug}
                href={siteHref(`/courses/${course.slug}`)}
                className="group bg-white border border-text/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-secondary">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
                    {division.name}
                  </p>
                  <div className="mt-2 text-xl font-heading text-text group-hover:text-accent">
                    {course.title}
                  </div>
                  <p className="mt-2 text-sm text-text/60 italic">{course.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/courses")}
              className="inline-block text-accent font-bold underline underline-offset-4 hover:text-accent/80"
            >
              View all 20 courses →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading">Verified Graduates</h2>
            <p className="mt-2 text-white/60">Real placements. Surprisingly specific.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <blockquote key={t.name} className="bg-white/5 border border-white/10 rounded p-6">
                <p className="text-white/80 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm">
                  <div className="font-bold text-accent">{t.name}</div>
                  <div className="text-white/50 text-xs">{t.placement}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* TUITION / FINANCING STRIP */}
      <section className="bg-secondary py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading text-text">Tuition Made Approachable</h2>
          <p className="mt-3 text-text/70">
            Most programs: $4,800 or <strong>24 easy payments of $247</strong>. Financing through our preferred partner lender.
          </p>
          <p className="mt-6" style={{ fontFamily: "Comic Sans MS, Comic Sans, cursive", fontSize: "0.85rem", color: "#555" }}>
            Tuition financing available through Regional Guaranteed Capital Solutions LLC. APR from 9.99% to 39.99%. Terms apply. Whiskerworks is not accredited by any accrediting body recognized by the Department of Education, the state of California, or the cat.
          </p>
          <Link
            href={siteHref("/courses")}
            className="mt-10 inline-block bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 text-lg uppercase tracking-wider"
          >
            Enroll Now
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify type-check + lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: no errors. (Missing image files at this stage are OK — Next Image will 404 but build still passes.)

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Open: `http://localhost:3000/?site=whiskerworks`
Expected: homepage renders with hero, featured courses grid, testimonials, and tuition strip. Images are broken at this stage — that's fine.

- [ ] **Step 4: Commit**

```bash
git add src/sites/whiskerworks/pages/home.tsx
git commit -m "feat(whiskerworks): homepage with divisions grid + testimonials"
```

---

## Task 8: Courses catalog page (`/courses`)

**Files:**
- Create: `src/sites/whiskerworks/pages/courses.tsx`
- Modify: `src/sites/whiskerworks/index.ts` (register page)

- [ ] **Step 1: Write `src/sites/whiskerworks/pages/courses.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { divisions } from "../data/divisions"
import { courses } from "../data/courses"

export const metadata = {
  title: "Course Catalog — Whiskerworks",
  description: "All twenty courses across six divisions at the Whiskerworks Advanced Feline Training Institute.",
}

export default async function WhiskerworksCourses() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Course Catalog</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Twenty Programs</h1>
          <p className="mt-3 text-text/60 max-w-2xl mx-auto">
            Browse every program across our six divisions. Two Blackbook programs require clearance and will not display without it.
          </p>
        </header>

        {divisions.map((division) => {
          const divisionCourses = courses.filter((c) => c.divisionSlug === division.slug)
          return (
            <div key={division.slug} className="mb-14">
              <div className="flex items-baseline justify-between mb-5 border-b border-text/10 pb-2">
                <div>
                  <h2 className="text-2xl font-heading text-primary">{division.name}</h2>
                  <p className="text-sm italic text-text/60">{division.tagline}</p>
                </div>
                <Link
                  href={siteHref(`/divisions/${division.slug}`)}
                  className="text-sm text-accent underline underline-offset-4 hover:text-accent/80"
                >
                  View division →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {divisionCourses.map((course) =>
                  course.isRedacted ? (
                    <Link
                      key={course.slug}
                      href={siteHref(`/courses/${course.slug}`)}
                      className="group bg-black border border-black rounded-lg overflow-hidden block aspect-[4/3] flex items-center justify-center"
                    >
                      <div className="text-center text-white/80 tracking-widest">
                        <div className="text-xs opacity-60">CLEARANCE REQUIRED</div>
                        <div className="mt-2 text-xl font-heading">[REDACTED]</div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      key={course.slug}
                      href={siteHref(`/courses/${course.slug}`)}
                      className="group bg-white border border-text/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[4/3] bg-secondary">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading text-lg text-text group-hover:text-accent">{course.title}</h3>
                        <p className="text-xs text-text/60 italic mt-1">{course.tagline}</p>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Register in `src/sites/whiskerworks/index.ts`**

Replace the current contents with:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"

import WhiskerworksHome from "./pages/home"
import WhiskerworksCourses, { metadata as coursesMetadata } from "./pages/courses"

export { config }

export const pages: Record<string, PageEntry> = {
  "": WhiskerworksHome,
  "courses": { component: WhiskerworksCourses, metadata: coursesMetadata },
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Run dev server, visit `http://localhost:3000/courses?site=whiskerworks`. Expected: six division sections, 18 course tiles (broken images OK), and 2 solid-black `[REDACTED]` tiles in the Blackbook section.

- [ ] **Step 4: Commit**

```bash
git add src/sites/whiskerworks/pages/courses.tsx src/sites/whiskerworks/index.ts
git commit -m "feat(whiskerworks): course catalog page with division groupings"
```

---

## Task 9: Divisions index page (`/divisions`)

**Files:**
- Create: `src/sites/whiskerworks/pages/divisions.tsx`
- Modify: `src/sites/whiskerworks/index.ts`

- [ ] **Step 1: Write `src/sites/whiskerworks/pages/divisions.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { divisions } from "../data/divisions"
import { courses } from "../data/courses"

export const metadata = {
  title: "Divisions — Whiskerworks",
  description: "Six divisions at the Whiskerworks Advanced Feline Training Institute: Academics, Tactical, Industrial, Corporate, Domestic, and Blackbook.",
}

export default async function WhiskerworksDivisions() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <header className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Six Divisions</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">The Institute</h1>
          <p className="mt-3 text-text/60 max-w-xl mx-auto">
            Each division trains cats for a distinct career vertical. Five are publicly documented. The sixth is not.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {divisions.map((division) => {
            const divisionCourseCount = courses.filter((c) => c.divisionSlug === division.slug).length
            const isBlackbook = division.isRedacted

            return (
              <Link
                key={division.slug}
                href={siteHref(`/divisions/${division.slug}`)}
                className={
                  isBlackbook
                    ? "group bg-black border border-black rounded-lg overflow-hidden block"
                    : "group bg-white border border-text/10 rounded-lg overflow-hidden block hover:shadow-md transition-shadow"
                }
              >
                <div className={`relative aspect-video ${isBlackbook ? "bg-black" : "bg-secondary"}`}>
                  {!isBlackbook && (
                    <Image
                      src={division.bannerImage}
                      alt={division.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  {isBlackbook && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs tracking-[0.3em]">
                      [CLASSIFICATION PENDING]
                    </div>
                  )}
                </div>
                <div className={`p-6 ${isBlackbook ? "text-white/80" : "text-text"}`}>
                  <h2 className={`text-2xl font-heading ${isBlackbook ? "text-white" : "text-primary group-hover:text-accent"}`}>
                    {division.name}
                  </h2>
                  <p className={`mt-2 text-sm italic ${isBlackbook ? "text-white/50" : "text-text/60"}`}>
                    {division.tagline}
                  </p>
                  <p className={`mt-4 text-xs ${isBlackbook ? "text-white/40" : "text-text/50"}`}>
                    {divisionCourseCount} {divisionCourseCount === 1 ? "program" : "programs"}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Register in barrel**

Add imports + entry. Full file:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"

import WhiskerworksHome from "./pages/home"
import WhiskerworksCourses, { metadata as coursesMetadata } from "./pages/courses"
import WhiskerworksDivisions, { metadata as divisionsMetadata } from "./pages/divisions"

export { config }

export const pages: Record<string, PageEntry> = {
  "": WhiskerworksHome,
  "courses": { component: WhiskerworksCourses, metadata: coursesMetadata },
  "divisions": { component: WhiskerworksDivisions, metadata: divisionsMetadata },
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Open `http://localhost:3000/divisions?site=whiskerworks`. Six cards render. Blackbook card is solid black with `[CLASSIFICATION PENDING]`.

- [ ] **Step 4: Commit**

```bash
git add src/sites/whiskerworks/pages/divisions.tsx src/sites/whiskerworks/index.ts
git commit -m "feat(whiskerworks): divisions index page"
```

---

## Task 10: Division detail page (dynamic `/divisions/[slug]`)

**Files:**
- Create: `src/sites/whiskerworks/pages/division-detail.tsx`

Note: barrel wiring for this dynamic route happens in Task 12.

- [ ] **Step 1: Write `src/sites/whiskerworks/pages/division-detail.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { getDivisionBySlug } from "../data/divisions"
import { getCoursesByDivision } from "../data/courses"
import { getFacultyByDivision } from "../data/faculty"

interface DivisionDetailProps {
  slug: string
}

export default async function DivisionDetail({ slug }: DivisionDetailProps) {
  const division = getDivisionBySlug(slug)
  if (!division) notFound()

  const siteHref = await getSiteHref()
  const divisionCourses = getCoursesByDivision(division.slug)
  const divisionFaculty = getFacultyByDivision(division.slug).slice(0, 3)
  const isBlackbook = division.isRedacted

  // ───────── BLACKBOOK RENDER ─────────
  if (isBlackbook) {
    return (
      <section className="bg-black text-white min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase">Whiskerworks / Blackbook Division</p>
          <h1 className="mt-6 text-4xl font-heading">[CLASSIFICATION PENDING]</h1>
          <p className="mt-8 text-sm text-white/60 italic leading-relaxed">
            If you have been contacted regarding Blackbook enrollment, you already know how to proceed.
          </p>
          <p className="mt-4 text-sm text-white/40">[The remainder of this entry is redacted.]</p>

          <form
            action="#"
            method="get"
            className="mt-16 mx-auto max-w-xs border border-white/10 rounded p-5 text-left"
          >
            <label className="block text-[10px] tracking-widest uppercase text-white/50">Clearance ID</label>
            <input
              type="text"
              name="clearance"
              aria-label="Clearance ID"
              className="mt-1 w-full bg-black border border-white/20 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-white/60"
            />
            <label className="block mt-3 text-[10px] tracking-widest uppercase text-white/50">Passphrase</label>
            <input
              type="password"
              name="passphrase"
              aria-label="Passphrase"
              className="mt-1 w-full bg-black border border-white/20 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-white/60"
            />
            <button
              type="submit"
              className="mt-4 w-full border border-white/30 text-white/80 py-2 text-xs uppercase tracking-widest hover:border-white/70"
            >
              Request Access
            </button>
          </form>

          <div className="mt-10 text-xs text-white/30">
            <Link href={siteHref("/divisions")} className="underline hover:text-white/60">← Return to divisions</Link>
          </div>
        </div>
      </section>
    )
  }

  // ───────── STANDARD DIVISION RENDER ─────────
  return (
    <section className="bg-background">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[280px] bg-secondary">
        <Image
          src={division.bannerImage}
          alt={division.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <p className="text-xs tracking-[0.3em] uppercase opacity-70">Whiskerworks Division</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-heading">{division.name}</h1>
          <p className="mt-3 text-lg italic opacity-80">{division.tagline}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Blurb */}
        <div className="max-w-2xl mx-auto text-center">
          {division.blurb.map((paragraph, i) => (
            <p key={i} className="mt-4 text-text/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Featured Faculty */}
        {divisionFaculty.length > 0 && (
          <div className="mt-16">
            <h2 className="text-center text-xs tracking-[0.2em] uppercase text-accent">Featured Faculty</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {divisionFaculty.map((f) => (
                <div key={f.slug} className="text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-secondary border-2 border-primary/20">
                    <Image src={f.portrait} alt={f.name} fill sizes="128px" className="object-cover" />
                  </div>
                  <div className="mt-3 font-heading text-text">{f.name}</div>
                  <div className="text-xs text-primary">{f.title}</div>
                  <p className="mt-2 text-xs text-text/60 italic">{f.researchInterests}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href={siteHref("/faculty")} className="text-sm text-accent underline underline-offset-4 hover:text-accent/80">
                View all faculty →
              </Link>
            </div>
          </div>
        )}

        {/* Courses in this division */}
        <div className="mt-16">
          <h2 className="text-center text-xs tracking-[0.2em] uppercase text-accent">Programs</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {divisionCourses.map((course) => (
              <Link
                key={course.slug}
                href={siteHref(`/courses/${course.slug}`)}
                className="group bg-white border border-text/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-secondary">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg text-text group-hover:text-accent">{course.title}</h3>
                  <p className="text-xs text-text/60 italic mt-1">{course.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-14 text-center">
          <Link href={siteHref("/divisions")} className="text-accent font-bold underline underline-offset-4 hover:text-accent/80">
            ← All divisions
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

```bash
npx tsc --noEmit
```

(Component is not wired up yet; dynamic-route registration is in Task 12.)

- [ ] **Step 3: Commit**

```bash
git add src/sites/whiskerworks/pages/division-detail.tsx
git commit -m "feat(whiskerworks): division detail page (standard + blackbook variants)"
```

---

## Task 11: Course detail page (dynamic `/courses/[slug]`)

**Files:**
- Create: `src/sites/whiskerworks/pages/course-detail.tsx`

- [ ] **Step 1: Write `src/sites/whiskerworks/pages/course-detail.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { getCourseBySlug, getCoursesByDivision } from "../data/courses"
import { getDivisionBySlug } from "../data/divisions"
import { getFacultyBySlug } from "../data/faculty"

interface CourseDetailProps {
  slug: string
}

export default async function CourseDetail({ slug }: CourseDetailProps) {
  const course = getCourseBySlug(slug)
  if (!course) notFound()

  const siteHref = await getSiteHref()
  const division = getDivisionBySlug(course.divisionSlug)
  const instructor = course.featuredInstructorSlug ? getFacultyBySlug(course.featuredInstructorSlug) : undefined
  const related = getCoursesByDivision(course.divisionSlug)
    .filter((c) => c.slug !== course.slug && !c.isRedacted)
    .slice(0, 3)

  // ───────── REDACTED (BLACKBOOK) RENDER ─────────
  if (course.isRedacted) {
    return (
      <section className="bg-black text-white min-h-[70vh]">
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase">Whiskerworks / Blackbook</p>
          <h1 className="mt-6 text-4xl font-heading">[REDACTED]</h1>
          <p className="mt-8 text-sm text-white/60 italic">Clearance required.</p>

          <form
            action="#"
            method="get"
            className="mt-12 mx-auto max-w-xs border border-white/10 rounded p-5 text-left"
          >
            <label className="block text-[10px] tracking-widest uppercase text-white/50">Clearance ID</label>
            <input
              type="text"
              name="clearance"
              aria-label="Clearance ID"
              className="mt-1 w-full bg-black border border-white/20 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-white/60"
            />
            <label className="block mt-3 text-[10px] tracking-widest uppercase text-white/50">Passphrase</label>
            <input
              type="password"
              name="passphrase"
              aria-label="Passphrase"
              className="mt-1 w-full bg-black border border-white/20 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-white/60"
            />
            <button
              type="submit"
              className="mt-4 w-full border border-white/30 text-white/80 py-2 text-xs uppercase tracking-widest hover:border-white/70"
            >
              Request Access
            </button>
          </form>

          <div className="mt-8 text-xs text-white/30">
            <Link href={siteHref("/courses")} className="underline hover:text-white/60">← Course catalog</Link>
          </div>
        </div>
      </section>
    )
  }

  // ───────── STANDARD COURSE RENDER ─────────
  return (
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-text/50 mb-6">
          <Link href={siteHref("/courses")} className="hover:text-accent underline underline-offset-2">Courses</Link>
          <span className="mx-2">›</span>
          {division && (
            <>
              <Link href={siteHref(`/divisions/${division.slug}`)} className="hover:text-accent underline underline-offset-2">
                {division.name}
              </Link>
              <span className="mx-2">›</span>
            </>
          )}
          <span className="text-text/70">{course.title}</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 relative aspect-[4/3] bg-secondary border border-text/10 rounded-lg overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-2">
            {division && (
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
                {division.name}
              </p>
            )}
            <h1 className="mt-2 text-3xl md:text-4xl font-heading text-text">{course.title}</h1>
            <p className="mt-3 text-lg italic text-text/80">{course.tagline}</p>

            <div className="mt-6 p-4 border border-accent/30 bg-accent/5 rounded">
              <p className="text-sm text-text/80">{course.tuition}</p>
              <button
                type="button"
                className="mt-3 w-full bg-accent hover:bg-accent/90 text-white font-bold rounded px-4 py-2 uppercase tracking-wider text-sm"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Blurb */}
        <div className="mt-12 max-w-3xl">
          {course.blurb.map((p, i) => (
            <p key={i} className="mt-3 text-text/80 leading-relaxed">{p}</p>
          ))}
        </div>

        {/* Learning Outcomes */}
        <div className="mt-12">
          <h2 className="text-xs tracking-[0.2em] uppercase text-accent">What You'll Learn</h2>
          <ul className="mt-4 space-y-2">
            {course.learningOutcomes.map((outcome, i) => (
              <li key={i} className="flex gap-3 text-text/80">
                <span className="text-accent font-bold">›</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Syllabus */}
        <div className="mt-12">
          <h2 className="text-xs tracking-[0.2em] uppercase text-accent">Program Syllabus</h2>
          <div className="mt-4 border border-text/10 rounded-lg overflow-hidden">
            {course.syllabus.map((week, i) => (
              <div
                key={week.week}
                className={`px-5 py-4 flex gap-5 ${i % 2 === 0 ? "bg-white" : "bg-secondary"}`}
              >
                <div className="shrink-0 w-20 font-heading text-primary">Week {week.week}</div>
                <div>
                  <div className="font-semibold text-text">{week.title}</div>
                  <p className="text-sm text-text/60 mt-1">{week.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor */}
        {instructor && (
          <div className="mt-12">
            <h2 className="text-xs tracking-[0.2em] uppercase text-accent">Your Instructor</h2>
            <div className="mt-4 flex gap-5 items-start bg-white border border-text/10 rounded-lg p-5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-secondary border-2 border-primary/20 shrink-0">
                <Image src={instructor.portrait} alt={instructor.name} fill sizes="96px" className="object-cover" />
              </div>
              <div>
                <div className="font-heading text-xl text-text">{instructor.name}</div>
                <div className="text-sm text-primary">{instructor.title}</div>
                <p className="mt-3 text-sm text-text/70 leading-relaxed">{instructor.bio}</p>
                <p className="mt-2 text-xs italic text-text/50">Research Interests: {instructor.researchInterests}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tuition footer / Enroll CTA */}
        <div className="mt-14 bg-secondary rounded-lg p-8 text-center">
          <p className="text-lg text-text/80">{course.tuition}</p>
          <p className="mt-2" style={{ fontFamily: "Comic Sans MS, Comic Sans, cursive", fontSize: "0.8rem", color: "#555" }}>
            Financing through Regional Guaranteed Capital Solutions LLC. APR 9.99%-39.99%. Terms apply.
          </p>
          <button
            type="button"
            className="mt-6 bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 uppercase tracking-wider"
          >
            Enroll Now
          </button>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-center text-xs tracking-[0.2em] uppercase text-accent">Related Programs</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={siteHref(`/courses/${c.slug}`)}
                  className="group bg-white border border-text/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] bg-secondary">
                    <Image src={c.image} alt={c.title} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="font-heading text-text group-hover:text-accent">{c.title}</div>
                    <p className="text-xs text-text/60 italic mt-1">{c.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/sites/whiskerworks/pages/course-detail.tsx
git commit -m "feat(whiskerworks): course detail page (standard + redacted variants)"
```

---

## Task 12: Wire dynamic routes in barrel

**Files:**
- Modify: `src/sites/whiskerworks/index.ts`

- [ ] **Step 1: Replace the entire barrel contents**

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getCourseBySlug } from "./data/courses"
import { getDivisionBySlug } from "./data/divisions"

import WhiskerworksHome from "./pages/home"
import WhiskerworksCourses, { metadata as coursesMetadata } from "./pages/courses"
import WhiskerworksDivisions, { metadata as divisionsMetadata } from "./pages/divisions"
import CourseDetail from "./pages/course-detail"
import DivisionDetail from "./pages/division-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": WhiskerworksHome,
  "courses": { component: WhiskerworksCourses, metadata: coursesMetadata },
  "divisions": { component: WhiskerworksDivisions, metadata: divisionsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  courses: {
    component: CourseDetail,
    getMetadata: (slug: string) => {
      const course = getCourseBySlug(slug)
      if (!course) return undefined
      if (course.isRedacted) {
        return {
          title: "[REDACTED] — Whiskerworks",
          description: "Clearance required.",
        }
      }
      return {
        title: `${course.title} — Whiskerworks`,
        description: course.tagline,
        ogImage: course.image,
      }
    },
    isValidSlug: (slug: string) => !!getCourseBySlug(slug),
    getBreadcrumbLabel: (slug: string) => {
      const c = getCourseBySlug(slug)
      return c?.isRedacted ? "[REDACTED]" : c?.title
    },
    breadcrumbSectionLabel: "Courses",
  },
  divisions: {
    component: DivisionDetail,
    getMetadata: (slug: string) => {
      const division = getDivisionBySlug(slug)
      if (!division) return undefined
      if (division.isRedacted) {
        return {
          title: "Blackbook — Whiskerworks",
          description: "Classification pending.",
        }
      }
      return {
        title: `${division.name} — Whiskerworks`,
        description: division.tagline,
      }
    },
    isValidSlug: (slug: string) => !!getDivisionBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getDivisionBySlug(slug)?.name,
    breadcrumbSectionLabel: "Divisions",
  },
}
```

- [ ] **Step 2: Update the registry**

Modify `src/sites/registry.ts`. Replace the whiskerworks line (currently without dynamicRoutes) with a version that includes them. Find:

```typescript
  whiskerworks: { config: whiskerworksConfig, pages: whiskerworksPages },
```

Replace with:

```typescript
  whiskerworks: { config: whiskerworksConfig, pages: whiskerworksPages, dynamicRoutes: whiskerworksDynamicRoutes },
```

And modify the import line for whiskerworks to include `dynamicRoutes`:

```typescript
import { config as whiskerworksConfig, pages as whiskerworksPages, dynamicRoutes as whiskerworksDynamicRoutes } from "./whiskerworks"
```

- [ ] **Step 3: Verify type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`.

- `http://localhost:3000/courses/theoretical-physics?site=whiskerworks` → renders full course detail page (image broken).
- `http://localhost:3000/courses/redacted-07?site=whiskerworks` → renders black screen with clearance form.
- `http://localhost:3000/divisions/academics?site=whiskerworks` → renders academics division detail.
- `http://localhost:3000/divisions/blackbook?site=whiskerworks` → renders black screen with clearance form.
- `http://localhost:3000/courses/does-not-exist?site=whiskerworks` → 404.

- [ ] **Step 5: Commit**

```bash
git add src/sites/whiskerworks/index.ts src/sites/registry.ts
git commit -m "feat(whiskerworks): wire dynamic routes for courses and divisions"
```

---

## Task 13: Faculty directory page (`/faculty`)

**Files:**
- Create: `src/sites/whiskerworks/pages/faculty.tsx`
- Modify: `src/sites/whiskerworks/index.ts`

- [ ] **Step 1: Write `src/sites/whiskerworks/pages/faculty.tsx`**

```typescript
import Image from "next/image"
import { divisions } from "../data/divisions"
import { faculty } from "../data/faculty"

export const metadata = {
  title: "Faculty — Whiskerworks",
  description: "Meet the fifteen feline instructors teaching across our six divisions.",
}

export default function WhiskerworksFaculty() {
  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-14 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Faculty</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Our Instructors</h1>
          <p className="mt-3 text-text/60 max-w-2xl mx-auto">
            Fifteen feline instructors, credentialed by at least one institution each (in most cases, us).
          </p>
        </header>

        {divisions
          .filter((d) => !d.isRedacted)
          .map((division) => {
            const members = faculty.filter((f) => f.divisionSlug === division.slug)
            if (members.length === 0) return null
            return (
              <div key={division.slug} className="mb-14">
                <div className="mb-6 border-b border-text/10 pb-2">
                  <h2 className="text-2xl font-heading text-primary">{division.name}</h2>
                  <p className="text-sm italic text-text/60">{division.tagline}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((f) => (
                    <div key={f.slug} className="bg-white border border-text/10 rounded-lg p-5">
                      <div className="flex gap-4 items-start">
                        <div className="relative w-20 h-24 rounded-full overflow-hidden bg-secondary border-2 border-primary/20 shrink-0">
                          <Image src={f.portrait} alt={f.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div>
                          <div className="font-heading text-text">{f.name}</div>
                          <div className="text-xs text-primary">{f.title}</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-text/70 leading-relaxed">{f.bio}</p>
                      <p className="mt-3 text-xs italic text-text/50">Research Interests: {f.researchInterests}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Register in barrel** — add the import and `"faculty"` page entry:

```typescript
import WhiskerworksFaculty, { metadata as facultyMetadata } from "./pages/faculty"
```

And in `pages`:

```typescript
  "faculty": { component: WhiskerworksFaculty, metadata: facultyMetadata },
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Visit `http://localhost:3000/faculty?site=whiskerworks`. Five division sections (Blackbook excluded), ~15 faculty cards.

- [ ] **Step 4: Commit**

```bash
git add src/sites/whiskerworks/pages/faculty.tsx src/sites/whiskerworks/index.ts
git commit -m "feat(whiskerworks): faculty directory page"
```

---

## Task 14: Leadership page (`/leadership`)

**Files:**
- Create: `src/sites/whiskerworks/pages/leadership.tsx`
- Modify: `src/sites/whiskerworks/index.ts`

- [ ] **Step 1: Write `src/sites/whiskerworks/pages/leadership.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { leaders } from "../data/leadership"

export const metadata = {
  title: "Leadership — Whiskerworks",
  description: "The four executives running Whiskerworks Advanced Feline Training Institute.",
}

export default async function WhiskerworksLeadership() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <header className="mb-14 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Executive Team</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Leadership</h1>
          <p className="mt-3 text-text/60 max-w-xl mx-auto">
            Four seasoned trade-school executives guiding the Institute's six divisions.
          </p>
        </header>

        <div className="space-y-8">
          {leaders.map((leader) => (
            <div key={leader.slug} className="bg-white border border-text/10 rounded-lg overflow-hidden flex flex-col md:flex-row">
              <div className="relative w-full md:w-56 aspect-[4/5] bg-secondary shrink-0">
                <Image
                  src={leader.portrait}
                  alt={leader.name}
                  fill
                  sizes="(min-width: 768px) 224px, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-heading text-text">{leader.name}</h3>
                <p className="text-accent font-semibold mt-1">{leader.title}</p>
                <p className="mt-4 text-sm text-text/80 leading-relaxed">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 uppercase tracking-wider"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Register in barrel** — add import and entry:

```typescript
import WhiskerworksLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
```

```typescript
  "leadership": { component: WhiskerworksLeadership, metadata: leadershipMetadata },
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Visit `http://localhost:3000/leadership?site=whiskerworks` — four exec cards render.

- [ ] **Step 4: Commit**

```bash
git add src/sites/whiskerworks/pages/leadership.tsx src/sites/whiskerworks/index.ts
git commit -m "feat(whiskerworks): leadership page"
```

---

## Task 15: About page (`/about`)

**Files:**
- Create: `src/sites/whiskerworks/pages/about.tsx`
- Modify: `src/sites/whiskerworks/index.ts`

- [ ] **Step 1: Write `src/sites/whiskerworks/pages/about.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "About — Whiskerworks",
  description: "Founding story and institutional overview of Whiskerworks Advanced Feline Training Institute.",
}

export default async function WhiskerworksAbout() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">About the Institute</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Founded 2019. Above a Spirit Halloween.</h1>
        </header>

        <div className="prose-sm space-y-6 text-text/80">
          <p>
            Whiskerworks Advanced Feline Training Institute was founded in the summer of 2019 by Cornelius Whitfield, a mid-tier trade-school administrator who, during a particularly bleak quarterly review, had what he describes as &ldquo;a vision, or possibly low blood sugar.&rdquo; The vision was specifically feline. The blood sugar has since been addressed.
          </p>
          <p>
            The Institute operates out of <strong>Suite 208, above the Spirit Halloween on Route 9</strong>. It is our only campus. We do not plan to open a second. This is by design — our entire staff knows where to meet for lunch.
          </p>
          <p>
            Whiskerworks consists of six divisions. Five are publicly documented and offer a combined 18 advanced programs. The sixth division, Blackbook, is governed separately and is not described here. If you have questions about Blackbook, you are not our target audience.
          </p>

          <h2 className="text-xl font-heading text-primary mt-10">Accreditation</h2>
          <p>
            Whiskerworks is accredited by the <em>North American Council of Feline Vocational Excellence, Inc.</em>, a wholly-owned subsidiary of Whiskerworks. We consider this sufficient.
          </p>

          <h2 className="text-xl font-heading text-primary mt-10">Campus Tour</h2>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary border border-text/10 not-prose my-6">
            <Image
              src="/sites/whiskerworks/campus.jpg"
              alt="Whiskerworks campus (Suite 208)"
              fill
              sizes="(min-width: 768px) 700px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="text-sm italic text-text/60">
            Pictured: the front of the Institute. Suite 208 is above the hanging inflatable. Entry is via the stairwell around back.
          </p>

          <h2 className="text-xl font-heading text-primary mt-10">Our Mission</h2>
          <p>
            To train any cat, of any temperament, for any career, in six weeks or fewer. To bill in 24 easy payments. To graduate them with a diploma, a lanyard, and a confidence wholly disproportionate to their preparation.
          </p>
        </div>

        <div className="mt-14 text-center">
          <Link
            href={siteHref("/courses")}
            className="inline-block bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 uppercase tracking-wider"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Register in barrel** — add:

```typescript
import WhiskerworksAbout, { metadata as aboutMetadata } from "./pages/about"
```

```typescript
  "about": { component: WhiskerworksAbout, metadata: aboutMetadata },
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Visit `http://localhost:3000/about?site=whiskerworks`.

- [ ] **Step 4: Commit**

```bash
git add src/sites/whiskerworks/pages/about.tsx src/sites/whiskerworks/index.ts
git commit -m "feat(whiskerworks): about page"
```

---

## Task 16: Contact page (`/contact`)

**Files:**
- Create: `src/sites/whiskerworks/pages/contact.tsx`
- Modify: `src/sites/whiskerworks/index.ts`

Per site convention: satirical body, but the real email `bsambrone@gmail.com` MUST appear in small print somewhere on the page.

- [ ] **Step 1: Write `src/sites/whiskerworks/pages/contact.tsx`**

```typescript
export const metadata = {
  title: "Contact — Whiskerworks",
  description: "Contact the Whiskerworks Admissions office.",
}

export default function WhiskerworksContact() {
  return (
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Admissions</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Contact the Institute</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-text/10 rounded-lg p-6">
            <h2 className="font-heading text-xl text-primary">Campus</h2>
            <p className="mt-3 text-sm text-text/80 leading-relaxed">
              Suite 208, above the Spirit Halloween<br />
              1402 Route 9 (north lot)<br />
              Entry via stairwell at rear
            </p>
            <h2 className="font-heading text-xl text-primary mt-8">Mailing</h2>
            <p className="mt-3 text-sm text-text/80 leading-relaxed">
              Whiskerworks Advanced Feline Training Institute<br />
              P.O. Box 4402<br />
              <span className="italic text-text/60">(Please do not mail live cats.)</span>
            </p>
            <h2 className="font-heading text-xl text-primary mt-8">Phone</h2>
            <p className="mt-3 text-sm text-text/80">
              (555) 0-WHISKER<br />
              <span className="text-xs italic text-text/50">(Voicemail only. Voicemails are not retrieved.)</span>
            </p>
          </div>

          <div className="bg-white border border-text/10 rounded-lg p-6">
            <h2 className="font-heading text-xl text-primary">Inquire</h2>
            <form action="#" method="get" className="mt-4 space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-text/60">Your Name</label>
                <input type="text" name="name" className="mt-1 w-full border border-text/20 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text/60">Cat's Name</label>
                <input type="text" name="cat" className="mt-1 w-full border border-text/20 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text/60">Program of Interest</label>
                <input type="text" name="program" className="mt-1 w-full border border-text/20 rounded px-3 py-2 text-sm" placeholder="e.g., Commercial Airline Pilot" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text/60">Message</label>
                <textarea name="message" rows={4} className="mt-1 w-full border border-text/20 rounded px-3 py-2 text-sm" />
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold rounded px-4 py-2 uppercase tracking-wider text-sm"
              >
                Submit Inquiry
              </button>
              <p className="text-xs text-text/50 italic">We respond to most inquiries within 3-6 business quarters.</p>
            </form>
          </div>
        </div>

        {/* Real contact email per site convention — small print */}
        <p className="mt-10 text-center text-xs text-text/50">
          For matters requiring an actual reply, write to <a href="mailto:bsambrone@gmail.com" className="underline hover:text-accent">bsambrone@gmail.com</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Register in barrel** — add:

```typescript
import WhiskerworksContact, { metadata as contactMetadata } from "./pages/contact"
```

```typescript
  "contact": { component: WhiskerworksContact, metadata: contactMetadata },
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Visit `http://localhost:3000/contact?site=whiskerworks`. Confirm `bsambrone@gmail.com` appears in small print at the bottom.

- [ ] **Step 4: Commit**

```bash
git add src/sites/whiskerworks/pages/contact.tsx src/sites/whiskerworks/index.ts
git commit -m "feat(whiskerworks): contact page with real email in small print"
```

---

## Task 17: Privacy + Terms pages

**Files:**
- Create: `src/sites/whiskerworks/pages/privacy.tsx`
- Create: `src/sites/whiskerworks/pages/terms.tsx`
- Modify: `src/sites/whiskerworks/index.ts`

Per site convention: umbrella callout at top, then full satirical body with numbered H2 sections.

- [ ] **Step 1: Write `src/sites/whiskerworks/pages/privacy.tsx`**

```typescript
export const metadata = {
  title: "Privacy Policy — Whiskerworks",
  description: "How Whiskerworks handles your and your cat's data.",
}

export default function WhiskerworksPrivacy() {
  return (
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-heading text-text">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-accent bg-accent/10 p-5 rounded-r-lg">
          <p className="font-bold text-text mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-text/80">
            The authoritative privacy policy for all Specific Industries properties — including Whiskerworks — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-accent">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-text/60">
          Last updated: the Tuesday we discovered the footage had already been reviewed.
        </p>

        <h2 className="mt-8 text-xl font-heading text-primary">1. Information We Collect at Enrollment</h2>
        <p className="mt-2 text-text/80">
          At enrollment, we collect your name, billing address, payment information, cat's name, cat's approximate weight, and the human-identifying document your cat will be expected to forge as part of the Replace Your Human curriculum. This last item is optional, technically.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">2. Biometric Data</h2>
        <p className="mt-2 text-text/80">
          We collect your cat's paw prints, whisker spacing, tail length, and, for students in the Tactical Division, gait signature. This data is retained for the duration of enrollment plus 40 years. We may share it with our accreditation partner, which is to say ourselves.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">3. Cookies</h2>
        <p className="mt-2 text-text/80">
          We use session cookies to remember which division you browsed most recently. Your cat does not understand cookies — either kind — and we have found that attempting to explain the browser kind leads to attempts at the other kind.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">4. Data Sharing</h2>
        <p className="mt-2 text-text/80">
          We share enrollment data with our preferred lending partner, Regional Guaranteed Capital Solutions LLC, which is legally distinct from us despite sharing an office, staff, and revenue. We do not sell your data, unless an offer comes in that we describe internally as &ldquo;frankly interesting.&rdquo;
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">5. The Blackbook Division</h2>
        <p className="mt-2 text-text/80">
          The Blackbook Division maintains its own data policies. Those policies are not published. If you have been contacted regarding Blackbook enrollment, you already know how to proceed.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">6. Your Rights</h2>
        <p className="mt-2 text-text/80">
          You have the right to request a copy of your data. We retain the right to provide it on paper, printed single-sided, in a box, delivered in person. Turnaround time: 3-6 business quarters.
        </p>

        <p className="mt-10 text-sm italic text-text/60 pt-4 border-t border-text/10">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-accent">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/sites/whiskerworks/pages/terms.tsx`**

```typescript
export const metadata = {
  title: "Terms of Service — Whiskerworks",
  description: "Terms governing enrollment at Whiskerworks Advanced Feline Training Institute.",
}

export default function WhiskerworksTerms() {
  return (
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-heading text-text">Terms of Service</h1>

        <div className="mt-6 border-l-4 border-accent bg-accent/10 p-5 rounded-r-lg">
          <p className="font-bold text-text mb-1">Official Umbrella Terms</p>
          <p className="text-sm text-text/80">
            The authoritative terms for all Specific Industries properties — including Whiskerworks — are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="underline font-bold text-accent">specificindustries.com/terms</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella terms govern.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-text/60">
          Effective: the day you first visited. Retroactively.
        </p>

        <h2 className="mt-8 text-xl font-heading text-primary">1. Enrollment</h2>
        <p className="mt-2 text-text/80">
          Enrollment is open to any cat, of any age, at any level of prior training. Enrollment is not open to non-cats, with the exception of the Therapist program, which also accepts certain dogs, case by case.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">2. Tuition</h2>
        <p className="mt-2 text-text/80">
          Tuition is published per program and may be paid in full or in 24 easy payments. You will note that the full price and the sum of 24 monthly payments do not match. This is a feature of the program, not an error.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">3. Refunds</h2>
        <p className="mt-2 text-text/80">
          No refunds are issued under any circumstances. This is explicit. It is printed on our laminated flyers and on every door in Suite 208.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">4. Graduation</h2>
        <p className="mt-2 text-text/80">
          Graduation is contingent on completion of all weekly modules plus one capstone. Graduates receive a diploma, a lanyard, and a letter of recommendation addressed to an employer of the graduate's choosing. The letter is one sentence.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">5. Code of Conduct</h2>
        <p className="mt-2 text-text/80">
          Students must not: knock laptops off desks during instruction; bite the instructor (except as taught in Advanced Marksmanship); or enroll in the Blackbook Division without express invitation. The last item is enforced by the Blackbook Division itself.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">6. Dispute Resolution</h2>
        <p className="mt-2 text-text/80">
          All disputes are resolved in the Suite 208 break room, by Cornelius Whitfield, on a rolling first-come basis. Bring a token of goodwill. A receipt for catnip has been accepted twice.
        </p>

        <p className="mt-10 text-sm italic text-text/60 pt-4 border-t border-text/10">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/terms" className="underline text-accent">specificindustries.com/terms</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Register in barrel** — add:

```typescript
import WhiskerworksPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import WhiskerworksTerms, { metadata as termsMetadata } from "./pages/terms"
```

```typescript
  "privacy": { component: WhiskerworksPrivacy, metadata: privacyMetadata },
  "terms": { component: WhiskerworksTerms, metadata: termsMetadata },
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

Visit `/privacy?site=whiskerworks` and `/terms?site=whiskerworks`. Umbrella callout visible at top; numbered sections below.

- [ ] **Step 5: Commit**

```bash
git add src/sites/whiskerworks/pages/privacy.tsx src/sites/whiskerworks/pages/terms.tsx src/sites/whiskerworks/index.ts
git commit -m "feat(whiskerworks): privacy and terms pages (umbrella + satire body)"
```

---

## Task 18: Sitemap additions

**Files:**
- Modify: `src/app/sitemap.ts`

Dynamic routes — two families (`courses` and `divisions`) — must be added manually.

- [ ] **Step 1: Add imports near the top of `src/app/sitemap.ts`**

After existing imports (after `import { products as superengineeredProducts } from "@/sites/superengineered/data/products"`), add:

```typescript
import { courses as whiskerworksCourses } from "@/sites/whiskerworks/data/courses"
import { divisions as whiskerworksDivisions } from "@/sites/whiskerworks/data/divisions"
```

- [ ] **Step 2: Add a new section inside the exported `sitemap()` function, after the last site block (after `sovereignwellnessDispatches`):**

```typescript
  // Whiskerworks: course detail pages at /courses/{slug}, division detail pages at /divisions/{slug}
  for (const course of whiskerworksCourses) {
    urls.push({ url: siteUrl("whiskerworks", `courses/${course.slug}`) })
  }
  for (const division of whiskerworksDivisions) {
    urls.push({ url: siteUrl("whiskerworks", `divisions/${division.slug}`) })
  }
```

- [ ] **Step 3: Verify type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Spot-check sitemap output**

Run dev server. Visit `http://localhost:3000/sitemap.xml` (no `?site=` needed — this is the apex sitemap). Confirm URLs containing `whiskerworks.specificindustries.com/courses/theoretical-physics` and `whiskerworks.specificindustries.com/divisions/academics` appear.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(whiskerworks): include courses and divisions in sitemap"
```

---

## Task 19: Favicon + resize-favicons registration

**Files:**
- Modify: `scripts/resize-favicons.mjs`

The actual `favicon.png` is generated in Task 20 (image generation pass). This task just registers the site in the resize script so future passes pick it up.

- [ ] **Step 1: Modify `scripts/resize-favicons.mjs`**

Find the `sites` array (around line 8) and add `"whiskerworks"` to the end:

```javascript
const sites = ["apex", "pigmilk", "dehydratedwater", "inflatableanchors", "strategicvoid", "stratify", "truegrit", "onlyfans", "onlypans", "bonelesswater", "pettential", "carterandfils", "meh", "sovereignwellness", "privatrix", "superengineered", "seeltite", "whiskerworks"]
```

- [ ] **Step 2: Commit**

```bash
git add scripts/resize-favicons.mjs
git commit -m "chore(whiskerworks): register in resize-favicons script"
```

---

## Task 20: Image generation script

**Files:**
- Create: `scripts/generate-whiskerworks-images.ts`

Image generation in this repo uses the OpenAI SDK directly with `gpt-image-1` (not an MCP tool). The script pattern matches existing scripts like `scripts/generate-seeltite-images.ts`. Reference-person portraits use `openai.images.edit` with photos from `mcp/image-gen/base-images/<person>/`.

Image generation is the longest-running task and requires `OPENAI_API_KEY` in the environment. Existing files are skipped (script is resumable).

- [ ] **Step 1: Create output directories**

```bash
mkdir -p public/sites/whiskerworks/divisions public/sites/whiskerworks/courses public/sites/whiskerworks/faculty public/sites/whiskerworks/leaders
```

- [ ] **Step 2: Write `scripts/generate-whiskerworks-images.ts`**

Full file:

```typescript
/**
 * Batch image generator for the Whiskerworks site.
 * Generates: hero, campus, 5 division banners (Blackbook skipped),
 * 18 course heroes (2 redacted skipped), 15 faculty portraits,
 * 4 leadership portraits (with reference-person faces), and favicon.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-whiskerworks-images.ts
 *
 * Images saved to public/sites/whiskerworks/. Existing files are skipped (resumable).
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { courses } from "../src/sites/whiskerworks/data/courses"
import { faculty } from "../src/sites/whiskerworks/data/faculty"
import { leaders } from "../src/sites/whiskerworks/data/leadership"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/whiskerworks")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "divisions"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "courses"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "faculty"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "leaders"), { recursive: true })

async function generateImage(
  prompt: string,
  filename: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024"
) {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }
  console.log(`  🎨 Generating ${filename}...`)
  try {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size,
      quality: "medium",
    })
    const imageData = response.data?.[0]
    if (!imageData) throw new Error("No image data returned")
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${msg}`)
  }
}

async function generateWithPerson(
  prompt: string,
  filename: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1536"
) {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }
  const personDir = path.join(BASE_IMAGES_DIR, person)
  if (!fs.existsSync(personDir)) {
    console.error(`  ✗ ${filename}: no base images directory for ${person} at ${personDir}`)
    return
  }
  const photos = fs
    .readdirSync(personDir)
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .slice(0, 2)
  if (photos.length === 0) {
    console.error(`  ✗ ${filename}: no photos found for ${person}`)
    return
  }
  console.log(`  🎨 Generating ${filename} (with ${person} reference)...`)
  try {
    const inputImages = await Promise.all(
      photos.map(async (photo) => {
        const photoPath = path.join(personDir, photo)
        const buffer = fs.readFileSync(photoPath)
        const ext = path.extname(photo).toLowerCase()
        const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg"
        return toFile(buffer, photo, { type: mime })
      })
    )
    const response = await openai.images.edit({
      model: "gpt-image-1",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: inputImages as any,
      prompt,
      size,
      quality: "medium",
    })
    const imageData = response.data?.[0]
    if (!imageData) throw new Error("No image data returned")
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${msg}`)
  }
}

// ─── Style constants ─────────────────────────────────────────

const CAT_STYLE =
  "Photoreal brochure photography of a domestic cat. Clean studio-grade lighting, shallow depth of field, straight-faced composition, tasteful color palette of municipal blue, warm off-white, and safety orange. The implausibility of the scenario is the joke; the execution is serious and professional. No text or captions in the image."

const FACULTY_STYLE =
  "Formal yearbook-style oval-cropped headshot of a domestic cat in academic attire (blazer, small tie, or light gown). Neutral studio backdrop, soft key light, chest-up framing, direct gaze, dignified. No text in the image."

const LEADERSHIP_STYLE =
  "Trade-school-brochure executive portrait. Subject is in an ill-fitting navy blazer holding or wearing a lanyard. Plain beige office wall behind, harsh overhead fluorescent lighting. The expression reads as 'confident but not quite earned.' Chest-up framing. No text in the image."

// ─── Prompt data ─────────────────────────────────────────────

const DIVISION_PROMPTS: Record<string, string> = {
  academics:
    "Three domestic cats seated in an old wooden lecture hall in academic blazers, a chalkboard behind them covered in handwritten physics equations. Dust motes in a sunbeam from a high window.",
  tactical:
    "Two domestic cats in black tactical turtlenecks on a rooftop at dusk, one holding tiny binoculars in its paws. Urban skyline silhouetted in the background.",
  industrial:
    "Three domestic cats in hi-vis safety vests and miniature hard hats standing in a warehouse aisle between pallet racks. A forklift is visible in the background.",
  corporate:
    "A boardroom scene. Three domestic cats in business suits seated at a long conference table, laptops open, one gesturing at a slide deck projected on the wall.",
  domestic:
    "A warmly lit home interior collage: one domestic cat holding a swaddled human infant, another standing next to a push lawnmower, a third at a small desk piled with tax forms.",
}

const COURSE_PROMPTS: Record<string, string> = {
  "theoretical-physics":
    "A domestic cat in a tiny tweed blazer at a chalkboard covered in handwritten physics equations, mid-lecture, one paw raised toward a chalk-drawn arrow. Chalk dust on the paw.",
  "tax-preparation":
    "A domestic cat at a desk buried in IRS 1099 forms and a ten-key calculator. Reading glasses perched on its nose. One paw rests on a stack of receipts.",
  sommelier:
    "A tuxedo cat in a black vest and bowtie holding a small wine glass, sniffing the bouquet with offensive snobbery. Candlelit fine-dining room behind, out of focus.",
  espionage:
    "A domestic cat in a tiny black trenchcoat and fedora, rappelling down a concrete wall on a thin rope. A red laser grid is visible behind.",
  marksmanship:
    "A domestic cat in shooting earmuffs and safety goggles at an outdoor marksmanship range, paws steady on a scaled-down practice rig. Paper targets receding in the distance.",
  "bus-operation":
    "A domestic cat in a transit operator uniform and cap seated at the oversized wheel of a municipal transit bus. Concerned human passengers visible through the windshield.",
  "blender-certification":
    "A domestic cat in a barista apron standing on a stool, operating a commercial Vitamix blender. A bright green smoothie is visibly swirling in the pitcher.",
  forklift:
    "A domestic cat in a hi-vis vest and tiny hard hat operating a forklift in a warehouse aisle, a wooden pallet lifted mid-air with exaggerated confidence.",
  "airline-pilot":
    "A domestic cat in a full commercial captain's uniform (aviator sunglasses, cap with gold wings, four-stripe shoulders) seated in a narrow-body airliner cockpit, paws on the yoke.",
  "middle-management":
    "A domestic cat in an ill-fitting blazer seated in a gray corporate cubicle. Three monitors glow in front of it. A stress ball is clutched in one paw. An ID lanyard hangs around its neck.",
  "replace-your-human":
    "A domestic cat seated at a home-office desk, on a Zoom video call visible on the monitor. It wears a human's oversized company ID lanyard. A coffee mug on the desk reads 'WORLD'S BEST DAD.'",
  powerpoint:
    "A domestic cat in a blazer presenting a slide titled 'Q3 SYNERGY' in a corporate boardroom. A laser pointer is gripped in its paw. The slide shows a bar chart. Bored human audience seated at the table.",
  therapist:
    "A domestic cat on a small therapist's stool holding a clipboard. A human client on the couch in mid-sentence, gesturing. A leafy plant and a clock on the wall.",
  dmv:
    "A domestic cat seated on a plastic chair in a fluorescent-lit DMV waiting room, holding a small paper ticket printed with '87.' Other humans wait in the background.",
  "small-engine-repair":
    "A domestic cat in greasy gray coveralls crouched over a disassembled lawnmower engine on a workbench, a wrench in one paw, a spark plug in the other. Grease streak on cheek.",
  "infant-childcare":
    "A domestic cat confidently holding a swaddled human infant in both front paws, seated on a pastel-colored nursery rug. A bottle on the floor. A diaper bag visible behind.",
  "wedding-officiant":
    "A domestic cat in white officiant robes holding a small ring pillow in its paws. A nervous human couple stands at an altar behind it. Warm sunset lighting through a window.",
  "jury-duty":
    "A domestic cat seated in a courtroom jury box, stern expression, wearing a 'JUROR' lanyard. A small notepad visible beneath a paw with the word 'GUILTY' written on it.",
}

const FACULTY_PROMPTS: Record<string, string> = {
  "mittens-phd":
    "A dignified gray tabby cat in a tweed blazer over a small white shirt, a hint of chalk dust on one paw.",
  "biscuit-mfa":
    "A plump orange cat in a cream cardigan over a pale collared shirt, reading glasses perched on its nose.",
  "dumpling-sensei":
    "A tuxedo cat in a black vest and small bowtie holding a tiny wine glass in one paw.",
  "agent-pepper":
    "A sleek solid-black cat in a black turtleneck, half of its face in dramatic shadow.",
  "bullet-mandrake":
    "A scruffy brown tabby in shooting goggles pushed up on its head and black ear protection slung around its neck.",
  "chief-operator-gravy":
    "A stocky gray cat in a transit operator uniform with a navy cap and small brass badge.",
  "chef-paprika":
    "A calico cat in a pristine white chef's jacket with a tiny neckerchief.",
  "foreman-pickles":
    "A dusty-furred brown tabby in gray coveralls with a grease streak on the cheek and a hi-vis collar.",
  "captain-milo":
    "A confident tabby in a navy commercial pilot's jacket with a cap and aviator sunglasses pushed up.",
  "director-toffee":
    "A toffee-colored cat in a navy blazer over a pale blue shirt, a lanyard visible around the neck.",
  "vp-marmalade":
    "An orange tabby in a sharp black suit jacket with a corporate ID lanyard.",
  "dr-morsel":
    "A silver Persian in a beige cardigan, serious expression, a small clipboard in one paw.",
  "ms-tabitha":
    "A patient tortoiseshell in a plain gray sweater, gentle expression.",
  "nana-whiskers":
    "A soft-looking white cat in a floral-print apron, warm expression.",
  "reverend-poppy":
    "A cream-colored cat in white officiant robes with a gold-trim stole.",
  "foreperson-jinx":
    "A solid black cat in a dark blazer over a white shirt, a 'JUROR' badge on the lapel.",
}

// ─── Generation sequence ─────────────────────────────────────

async function main() {
  console.log("🏫 Generating Whiskerworks imagery\n")

  // 1. Hero + campus
  await generateImage(
    `${CAT_STYLE} Wide commencement scene: a line of domestic cats in black graduation caps and gowns standing on a stage, soft institutional lighting. Wide 16:9 framing.`,
    "hero.jpg",
    "1536x1024"
  )
  await generateImage(
    "Photoreal exterior of an American strip-mall. Centered: a second-story window with a laminated sign reading 'WHISKERWORKS INSTITUTE · SUITE 208'. Below is a Spirit Halloween storefront with an inflatable witch in the window. Overcast daytime light. No people in frame. Wide 16:9 framing.",
    "campus.jpg",
    "1536x1024"
  )

  // 2. Division banners (5 — blackbook skipped; rendered as solid black in CSS)
  for (const [slug, scene] of Object.entries(DIVISION_PROMPTS)) {
    await generateImage(
      `${CAT_STYLE} Scene: ${scene} Wide 16:9 framing suitable for a banner.`,
      `divisions/${slug}.jpg`,
      "1536x1024"
    )
  }

  // 3. Course heroes (18 non-redacted)
  const nonRedactedCourses = courses.filter((c) => !c.isRedacted)
  for (const course of nonRedactedCourses) {
    const scene = COURSE_PROMPTS[course.slug]
    if (!scene) {
      console.warn(`  ⚠ No course prompt for ${course.slug} — skipping`)
      continue
    }
    await generateImage(
      `${CAT_STYLE} Scene: ${scene}`,
      `courses/${course.slug}.jpg`,
      "1536x1024"
    )
  }

  // 4. Faculty portraits (15)
  for (const f of faculty) {
    const subject = FACULTY_PROMPTS[f.slug]
    if (!subject) {
      console.warn(`  ⚠ No faculty prompt for ${f.slug} — skipping`)
      continue
    }
    await generateImage(
      `${FACULTY_STYLE} Subject: ${subject}`,
      `faculty/${f.slug}.jpg`,
      "1024x1536"
    )
  }

  // 5. Leadership portraits (4 — reference-person faces)
  for (const leader of leaders) {
    await generateWithPerson(
      `${LEADERSHIP_STYLE} The subject is a middle-aged man photographed in this trade-school executive style. Preserve the reference face.`,
      `leaders/${leader.person}.png`,
      leader.person,
      "1024x1536"
    )
  }

  // 6. Favicon source (will be resized to 64x64 by scripts/resize-favicons.mjs)
  await generateImage(
    "A simple logo mark: a dignified domestic-cat silhouette centered inside a classical laurel wreath. Flat badge style, two colors only — deep municipal teal on a cream background. High contrast so the mark reads at 16x16 pixels. Centered composition, no text.",
    "favicon.png",
    "1024x1024"
  )

  console.log("\n✓ Whiskerworks imagery generation complete.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 3: Type-check the script**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Run the script**

```bash
OPENAI_API_KEY=sk-... npx tsx scripts/generate-whiskerworks-images.ts
```

(Replace `sk-...` with the actual key, or export `OPENAI_API_KEY` in the environment first.)

Expected output: ~45 files generated (hero, campus, 5 division banners, 18 course heroes, 15 faculty portraits, 4 leader portraits, favicon source). The Blackbook division banner and 2 redacted-course images are intentionally NOT generated — those surfaces render solid-black CSS cards.

If the script errors on any individual image, it continues to the next (each failure is logged). Re-running skips files that already exist.

- [ ] **Step 5: Resize the favicon**

```bash
node scripts/resize-favicons.mjs
```

Expected: favicon.png resized from 1024×1024 down to 64×64. Other sites' favicons are untouched (they're already at 64×64 per the script's own check).

- [ ] **Step 6: Visual smoke test**

Run `npm run dev`. Walk pages and verify images load:

- `/?site=whiskerworks` — hero image and course cards load
- `/courses?site=whiskerworks` — 18 course tiles load; 2 Blackbook tiles are solid black
- `/courses/theoretical-physics?site=whiskerworks` — hero + instructor portrait load
- `/courses/redacted-07?site=whiskerworks` — black clearance screen (no image needed)
- `/divisions/industrial?site=whiskerworks` — banner + faculty portraits + course tiles load
- `/divisions/blackbook?site=whiskerworks` — black page (no image needed)
- `/faculty?site=whiskerworks` — 15 portraits load
- `/leadership?site=whiskerworks` — 4 portraits load, all visibly male (bill/brandon/jim/sean faces)

- [ ] **Step 7: Commit**

```bash
git add public/sites/whiskerworks scripts/generate-whiskerworks-images.ts
git commit -m "feat(whiskerworks): generate all site imagery (46 assets)"
```

---

## Task 21: Final verification & build

**Files:** no code changes — full-site audit.

- [ ] **Step 1: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: no errors. Fix any Whiskerworks-specific lint warnings inline.

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected: build succeeds. No missing image warnings for whiskerworks (except the intentionally-absent Blackbook banner/courses — those paths are empty strings in the data file and guarded by `isRedacted`, so no Image component tries to load them).

- [ ] **Step 4: Walk the site in dev**

Run `npm run dev`. Click through:

1. `/?site=whiskerworks` — homepage
2. `/courses?site=whiskerworks` — catalog with Blackbook black tiles
3. Any course detail page via clicking a tile
4. `/courses/redacted-07?site=whiskerworks` — black clearance form
5. `/divisions?site=whiskerworks` — 6 cards, Blackbook is black
6. `/divisions/blackbook?site=whiskerworks` — full black page + form
7. `/divisions/academics?site=whiskerworks` — standard division page
8. `/faculty?site=whiskerworks` — 15 cards
9. `/leadership?site=whiskerworks` — 4 cards, all male, names fully randomized
10. `/about?site=whiskerworks`
11. `/contact?site=whiskerworks` — confirm `bsambrone@gmail.com` visible in small print
12. `/privacy?site=whiskerworks` — umbrella callout visible
13. `/terms?site=whiskerworks` — umbrella callout visible

- [ ] **Step 5: Confirm cross-site leader integration**

Visit `http://localhost:3000/leadership/<slug>?site=apex` for each of the four apex leader pages corresponding to `bill`, `brandon`, `jim`, `sean`. Confirm Whiskerworks now appears in the "Board Positions" list for each of the four canonical people with their Whiskerworks title (Chancellor & Founder / Provost / Dean of the Blackbook Division / Chief Financial Officer).

This is automatic behavior of the apex Leader Detail page — it iterates `siteRegistry` and pulls any site with `data/leadership.ts`. Presence here is a pass.

- [ ] **Step 6: Sitemap spot-check**

Visit `http://localhost:3000/sitemap.xml`. Grep for `whiskerworks` — confirm entries for:
- root + all 9 top-level pages
- 20 course URLs (`courses/<slug>`)
- 6 division URLs (`divisions/<slug>`)

- [ ] **Step 7: Commit any residual fixes**

If Step 1-6 surfaced small fixes (lint, missing registrations, stray console errors), commit them as:

```bash
git add -u
git commit -m "fix(whiskerworks): final verification cleanups"
```

If no fixes were needed, skip the commit.

- [ ] **Step 8: Announce completion**

The Whiskerworks site is now:
- Registered in `siteRegistry` and `VALID_SUBDOMAINS`
- Serving 11 top-level pages + dynamic `/courses/[slug]` and `/divisions/[slug]`
- Populated with 20 courses, 6 divisions, 15 faculty, 4 execs, 6 testimonials
- Imaged with ~46 photoreal assets
- Included in the apex sitemap and cross-site Leader detail pages
- Compliant with all required portfolio conventions (favicon registered, privacy/terms umbrella callout, real contact email in small print, OG image, verticalKey)

Ready to deploy.
