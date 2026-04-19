# thetheoryisreal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `thetheoryisreal` subdomain — a conspiracy-theory satire site with 20 theory articles, a populated 5-board forum (25 threads / ~150 replies), 16+ satirical merch SKUs, a 24-item evidence gallery, a 25-entry fake-study library, and a redacted-dossier leadership page. Commerce-enabled.

**Architecture:** Self-contained site under `src/sites/thetheoryisreal/` following the `SiteModule` pattern. Dynamic routes for `/theories/<slug>`, `/category/<slug>`, `/products/<slug>`, and a 2-segment `/forum/<board>/<thread>` route. All content in static TS modules. Reuses shared commerce components and existing testimonial images as forum avatars.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, OpenAI `gpt-image-1` for image generation.

**Spec:** `docs/superpowers/specs/2026-04-19-thetheoryisreal-design.md`

**Verification posture:** Platform has no automated test suite. Each task verifies via `npx tsc --noEmit` and `npm run lint`. Milestone tasks also `npm run build` and spot-check `localhost:3000/?site=thetheoryisreal`.

**Voice primer** (read before authoring content):
- Conspiracy-first, aesthetic supports it. Deadpan, serious structure, absurd content.
- Sentences should sound like someone sincerely believes them. "They" do things. "The data is clear." No winking at the reader.
- Mundane specifics make the satire land. Not "big evil corporation" — "the Atlanta regional distribution node."
- Avoid slapstick. Avoid all-caps for humor (reserve caps for red-alert chrome).
- If a sentence would work unchanged on a real conspiracy blog about a different topic, it's the right voice.

---

## File Structure

```
src/sites/thetheoryisreal/
├── config.ts
├── index.ts
├── types.ts                          # all domain types
├── data/
│   ├── theories.ts                   # 20 articles + helpers + categories
│   ├── forum.ts                      # 5 boards + usernames/avatars map + 25 threads + helpers
│   ├── products.ts                   # 16+ products + helpers
│   ├── evidence.ts                   # 24 items
│   ├── library.ts                    # 25 entries
│   └── leadership.ts                 # 4 dossiers + codename pools + randomizer
├── components/
│   ├── red-alert-banner.tsx
│   ├── document-card.tsx
│   ├── redacted-portrait.tsx
│   ├── pull-quote.tsx
│   ├── forum-thread-view.tsx
│   ├── forum-board-card.tsx
│   ├── forum-thread-row.tsx
│   ├── evidence-tile.tsx
│   ├── evidence-gallery.tsx
│   ├── breaking-rail.tsx
│   ├── category-tile.tsx
│   ├── library-list.tsx
│   ├── leadership-dossier-card.tsx
│   └── geocities-footer-wink.tsx
└── pages/
    ├── home.tsx
    ├── theories.tsx
    ├── theory-detail.tsx
    ├── category.tsx
    ├── forum.tsx
    ├── forum-board.tsx                # handles /forum/<board>
    ├── forum-thread.tsx               # handles /forum/<board>/<thread>
    ├── evidence.tsx
    ├── shop.tsx
    ├── product-detail.tsx
    ├── library.tsx
    ├── about.tsx
    ├── contact.tsx
    ├── privacy.tsx
    ├── terms.tsx
    ├── cart.tsx
    └── checkout.tsx

public/sites/thetheoryisreal/         # generated images
├── hero.png
├── categories/                       # 5 tiles
├── theories/                         # 20 article heroes
├── evidence/                         # 24 items
└── products/                         # 16+ product shots

src/sites/registry.ts                 # register site
src/sites/subdomains.ts               # add to VALID_SUBDOMAINS
src/app/sitemap.ts                    # add theory + product slugs
scripts/generate-thetheoryisreal-images.ts   # new — all image assets
```

---

## Task Breakdown Overview

- **Task 1:** Platform wiring (subdomain allowlist + registry placeholder)
- **Task 2:** Site config
- **Task 3:** Types module
- **Task 4:** Placeholder home + index barrel + first resolve check
- **Task 5:** Leadership data (smallest data file, establishes voice)
- **Task 6:** Categories + theories data (20 articles)
- **Task 7:** Forum data — boards, usernames/avatars map
- **Task 8:** Forum threads (25 threads, ~150 replies)
- **Task 9:** Products data (16+ products)
- **Task 10:** Evidence gallery data (24 items)
- **Task 11:** Library data (25 entries)
- **Task 12:** Small components — `DocumentCard`, `RedAlertBanner`, `PullQuote`, `GeoCitiesFooterWink`
- **Task 13:** `RedactedPortrait` + `LeadershipDossierCard`
- **Task 14:** Forum components — `ForumThreadView`, `ForumBoardCard`, `ForumThreadRow`
- **Task 15:** Evidence components — `EvidenceTile`, `EvidenceGallery`
- **Task 16:** Homepage helpers — `BreakingRail`, `CategoryTile`, `LibraryList`
- **Task 17:** About page (leadership dossiers + origin story)
- **Task 18:** Forum pages (index, board, thread)
- **Task 19:** Theories index + theory detail + category
- **Task 20:** Evidence page
- **Task 21:** Shop + product detail
- **Task 22:** Library page
- **Task 23:** Contact, privacy, terms
- **Task 24:** Cart + checkout pages (reuse-shim)
- **Task 25:** Homepage assembly
- **Task 26:** Sitemap + favicon wiring
- **Task 27:** Image generation script + run
- **Task 28:** Polish pass — responsive, alert-banner rotation, forum reactions
- **Task 29:** Final verification

---

## Task 1: Add thetheoryisreal to subdomain allowlist and registry

**Files:**
- Modify: `src/sites/subdomains.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Add to `VALID_SUBDOMAINS`**

Modify `src/sites/subdomains.ts` — add `"thetheoryisreal",` to the end of the `VALID_SUBDOMAINS` array (before the closing `] as const`).

- [ ] **Step 2: Registry placeholder**

Don't wire the registry yet — Task 4 will add the import + entry once `config`, `pages`, `dynamicRoutes` all exist.

- [ ] **Step 3: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: PASS (registry hasn't been modified yet, so no new errors).

- [ ] **Step 4: Commit**

```bash
git add src/sites/subdomains.ts
git commit -m "feat(thetheoryisreal): allowlist subdomain"
```

---

## Task 2: Site config

**Files:**
- Create: `src/sites/thetheoryisreal/config.ts`

- [ ] **Step 1: Verify fonts available**

`src/themes/fonts.ts` needs `ibm-plex-mono` and `lora`. If either is missing, add the `next/font/google` import + declaration, add the `.variable` to `fontVariables`, and add the CSS font-family string to `fontFamilyMap`. Leave `permanent-marker` for Task 12 (pull-quote component uses it; add it at that point if not present).

- [ ] **Step 2: Write config**

Create `src/sites/thetheoryisreal/config.ts`:

```ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "The Theory Is Real",
  subdomain: "thetheoryisreal",
  theme: {
    preset: "paranoid",
    colors: {
      primary: "#c8a86b",      // aged gold
      secondary: "#6b8e75",    // desaturated olive
      accent: "#c13a2e",       // red-alert — reserve for alarm chrome
      background: "#0f1012",   // near-black, slight blue
      text: "#d8d4c7",         // warm off-white
    },
    fonts: {
      heading: "ibm-plex-mono",
      body: "lora",
    },
  },
  metadata: {
    title: "The Theory Is Real — The Truth They Hide From You",
    description: "Independent atmospheric, reptilian, simulation, and signal-interference reporting. Evidence. Forum. Research archive. Awaken.",
    ogImage: "/sites/thetheoryisreal/hero.png",
  },
  nav: [
    { label: "Theories", path: "/theories" },
    { label: "Forum", path: "/forum" },
    { label: "Shop", path: "/shop" },
    { label: "Evidence", path: "/evidence" },
    { label: "Library", path: "/library" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
  megaMenu: {
    items: [
      {
        label: "Theories",
        path: "/theories",
        style: "mega",
        children: [
          { label: "Atmospheric", path: "/category/atmospheric", description: "Sky-based influence operations" },
          { label: "Global Control", path: "/category/global-control", description: "The architecture of obedience" },
          { label: "Reptilian Dossier", path: "/category/reptilian", description: "What they really are" },
          { label: "Digital Reality", path: "/category/digital-reality", description: "NPCs, algorithms, the simulation" },
          { label: "Weaponized Tech", path: "/category/weaponized-tech", description: "Infrastructure as attack surface" },
        ],
      },
      {
        label: "Forum",
        path: "/forum",
        style: "dropdown",
        children: [
          { label: "Hot Threads", path: "/forum#hot" },
          { label: "Atmospheric Anomalies", path: "/forum/atmospheric-anomalies" },
          { label: "Reptilian Sightings", path: "/forum/reptilian-sightings" },
          { label: "NPC Watch", path: "/forum/npc-watch" },
          { label: "Signal Interference", path: "/forum/signal-interference" },
          { label: "General Truth-Seeking", path: "/forum/general" },
        ],
      },
      { label: "Shop", path: "/shop" },
      { label: "Evidence", path: "/evidence" },
      { label: "Library", path: "/library" },
    ],
  },
  tagline: "The truth is not hidden. You are.",
}
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/sites/thetheoryisreal/config.ts src/themes/fonts.ts
git commit -m "feat(thetheoryisreal): add site config and fonts"
```

---

## Task 3: Types module

**Files:**
- Create: `src/sites/thetheoryisreal/types.ts`

- [ ] **Step 1: Write types file**

```ts
// Domain types for The Theory Is Real.
// All content data files import from here.

export type CategoryKey =
  | "atmospheric"
  | "global-control"
  | "reptilian"
  | "digital-reality"
  | "weaponized-tech"

export interface Category {
  key: CategoryKey
  title: string          // display title, e.g. "Atmospheric"
  tagline: string        // one-line hook used on tile + landing
  image: string          // /sites/thetheoryisreal/categories/<key>.png
}

export interface Theory {
  slug: string
  title: string
  category: CategoryKey
  publishedAt: string    // ISO date
  dek: string
  body: string[]
  pullQuotes?: string[]
  image: string          // /sites/thetheoryisreal/theories/<slug>.png
  relatedSlugs?: string[]
  breakingBadge?: boolean
}

export type BoardKey =
  | "atmospheric-anomalies"
  | "reptilian-sightings"
  | "npc-watch"
  | "signal-interference"
  | "general"

export interface ForumBoard {
  key: BoardKey
  title: string          // "Atmospheric Anomalies"
  tagline: string
  icon: string           // emoji — decorative only
}

export interface ForumReaction {
  emoji: string
  count: number
}

export interface ForumReply {
  username: string
  avatar: string         // /shared/testimonials/<name>.png
  postedAt: string       // "3 hours ago" — displayed verbatim
  body: string
  reactions?: ForumReaction[]
}

export interface ForumThread {
  slug: string
  board: BoardKey
  title: string
  op: ForumReply
  replies: ForumReply[]
  hot?: boolean
  pinned?: boolean
}

export type ConspiracyTag =
  | "chemtrails"
  | "illuminati"
  | "reptilian"
  | "npc"
  | "weaponized-tech"
  | "classics"

export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  conspiracyTag: ConspiracyTag
  nutritionalFacts: Array<{ label: string; value: string }>   // reused name; we populate with "SPECS"
}

export interface EvidenceItem {
  id: string
  image: string          // /sites/thetheoryisreal/evidence/<id>.png
  caption: string
  submittedBy: string    // must match a forum username
  tags: string[]
  annotations?: Array<{
    kind: "circle" | "arrow"
    x: number            // percent 0-100
    y: number            // percent 0-100
    w?: number           // percent for circle width (default 18)
    rotation?: number    // degrees for arrow (default 0)
  }>
}

export interface LibraryEntry {
  title: string
  author: string
  year: string
  url: string            // external or internal anchor
  abstractSnippet: string
}

export type DossierStatus = "ACTIVE" | "DEEP COVER" | "COMPROMISED" | "UNREACHABLE"

export interface LeaderDossier {
  id: string
  blurredPhoto: string   // /shared/testimonials/<name>.png
  biography: string
  expertise: string
  statusTag: DossierStatus
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/thetheoryisreal/types.ts
git commit -m "feat(thetheoryisreal): add domain types"
```

---

## Task 4: Placeholder homepage + index barrel + registry wire-up

**Files:**
- Create: `src/sites/thetheoryisreal/pages/home.tsx`
- Create: `src/sites/thetheoryisreal/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Placeholder home**

`src/sites/thetheoryisreal/pages/home.tsx`:

```tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-heading text-4xl text-primary">The Theory Is Real</h1>
      <p className="mt-4 font-body text-lg text-text/80">Coming online.</p>
    </main>
  )
}
```

- [ ] **Step 2: Index barrel**

`src/sites/thetheoryisreal/index.ts`:

```ts
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import Home from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": Home,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
```

- [ ] **Step 3: Register in registry**

Modify `src/sites/registry.ts`:

Add import near other imports:

```ts
import { config as thetheoryisrealConfig, pages as thetheoryisrealPages, dynamicRoutes as thetheoryisrealDynamicRoutes } from "./thetheoryisreal"
```

Add entry to `siteRegistry`:

```ts
  thetheoryisreal: { config: thetheoryisrealConfig, pages: thetheoryisrealPages, dynamicRoutes: thetheoryisrealDynamicRoutes },
```

- [ ] **Step 4: Verify typecheck + local resolve**

```bash
npx tsc --noEmit
npm run dev
```

Visit `http://localhost:3000/?site=thetheoryisreal` in browser. Expected: "The Theory Is Real / Coming online." renders with dark background and aged-gold heading.

Stop dev server (Ctrl-C).

- [ ] **Step 5: Commit**

```bash
git add src/sites/thetheoryisreal/ src/sites/registry.ts
git commit -m "feat(thetheoryisreal): scaffold site with placeholder home"
```

---

## Task 5: Leadership data (4 dossiers + codename pools + randomizer)

**Files:**
- Create: `src/sites/thetheoryisreal/data/leadership.ts`

- [ ] **Step 1: Write file**

Establishes the voice. Study the example bio carefully before authoring the other 3.

```ts
import type { LeaderDossier } from "../types"

// Four photos sourced from /public/shared/testimonials/.
// The RedactedPortrait component renders black bars over the eyes at display time.
export const dossiers: LeaderDossier[] = [
  {
    id: "subject-07",
    blurredPhoto: "/shared/testimonials/warren-duvall.png",
    biography:
      "Former regional HVAC supervisor at a Fortune-500 whose name cannot be published. Observed atmospheric delivery patterns over a 14-month period while servicing rooftop units. Maintains a private archive of duct-sample photographs. Corresponds only via paper mail forwarded through a third party in Ohio.",
    expertise: "Atmospheric delivery systems · duct forensics",
    statusTag: "ACTIVE",
  },
  {
    id: "subject-12",
    blurredPhoto: "/shared/testimonials/clement-ashby.png",
    biography:
      "Worked in municipal utilities for 22 years before identifying what they call 'the pulse' in the substation at the edge of town. Retired under unusual circumstances in 2019. Does not use any device manufactured after 2006. Contributes via handwritten weekly dispatches.",
    expertise: "Signal interference · grid anomalies",
    statusTag: "DEEP COVER",
  },
  {
    id: "subject-19",
    blurredPhoto: "/shared/testimonials/rev-thomasina-oakes.png",
    biography:
      "Credentials pending. Arrived at the outlet in 2022 with a binder that has since been independently verified by two of our other subjects. Declines to discuss prior employment. Sees things in shopping-mall atria that the rest of us do not.",
    expertise: "NPC identification · retail-environment protocol",
    statusTag: "ACTIVE",
  },
  {
    id: "subject-23",
    blurredPhoto: "/shared/testimonials/tony-mazetti.png",
    biography:
      "Missing from regular correspondence since late last quarter. Last known communication referenced 'the third sighting, the confirming one.' We have decided to continue listing the subject until something changes. Dossier retained in its current state.",
    expertise: "Reptilian surveillance · celebrity-dental archiving",
    statusTag: "UNREACHABLE",
  },
]

// Codename pools — adjectives AND surnames both randomize (per site convention).
export const CODENAME_ADJECTIVES = [
  "The Watcher",
  "The Listener",
  "Prophet",
  "Operator",
  "Analyst",
  "The Cartographer",
  "Sentinel",
  "The Archivist",
  "Signal",
  "The Reader",
]

export const CODENAME_SURNAMES = [
  "V",
  "Zero",
  "Kestrel",
  "Tessera",
  "Null",
  "Umbra",
  "Haruspex",
  "Lacuna",
  "Obsidian",
  "Cipher",
]

export function pickCodename(seed: number): string {
  // Deterministic pick so SSR and hydration match.
  const adj = CODENAME_ADJECTIVES[seed % CODENAME_ADJECTIVES.length]
  const sur = CODENAME_SURNAMES[(seed * 31 + 7) % CODENAME_SURNAMES.length]
  return `${adj} ${sur}`
}

export function getDossierById(id: string): LeaderDossier | undefined {
  return dossiers.find((d) => d.id === id)
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/thetheoryisreal/data/leadership.ts
git commit -m "feat(thetheoryisreal): leadership dossiers and codename pools"
```

---

## Task 6: Categories + theories data (20 articles)

**Files:**
- Create: `src/sites/thetheoryisreal/data/theories.ts`

- [ ] **Step 1: Write file with categories + helpers + 2 complete example articles**

```ts
import type { Category, Theory, CategoryKey } from "../types"

export const categories: Category[] = [
  {
    key: "atmospheric",
    title: "Atmospheric",
    tagline: "What's actually in the sky.",
    image: "/sites/thetheoryisreal/categories/atmospheric.png",
  },
  {
    key: "global-control",
    title: "Global Control",
    tagline: "The architecture of obedience.",
    image: "/sites/thetheoryisreal/categories/global-control.png",
  },
  {
    key: "reptilian",
    title: "Reptilian Dossier",
    tagline: "What they really are.",
    image: "/sites/thetheoryisreal/categories/reptilian.png",
  },
  {
    key: "digital-reality",
    title: "Digital Reality",
    tagline: "NPCs, algorithms, the simulation.",
    image: "/sites/thetheoryisreal/categories/digital-reality.png",
  },
  {
    key: "weaponized-tech",
    title: "Weaponized Tech",
    tagline: "Infrastructure as attack surface.",
    image: "/sites/thetheoryisreal/categories/weaponized-tech.png",
  },
]

export const theories: Theory[] = [
  // ─── Atmospheric ─────────────────────────────────────
  {
    slug: "atmospheric-influencer-sprays",
    title: "What Contrails Really Contain: The Case for Atmospheric Influencer Sprays",
    category: "atmospheric",
    publishedAt: "2026-04-17",
    dek: "The pattern is not weather. The pattern is commerce.",
    image: "/sites/thetheoryisreal/theories/atmospheric-influencer-sprays.png",
    breakingBadge: true,
    pullQuotes: [
      "Every cross-hatch correlates, within 48 hours, with a measurable spike in localized brand-search volume.",
      "They are not telling you what is being sprayed. They are telling you what is being sold.",
    ],
    body: [
      "For the past eighteen months, independent observers across six U.S. regions have been cross-referencing commercial flight paths against anonymized search-trend data. What they are finding does not look like weather.",
      "The official explanation is condensation. The official explanation has always been condensation. But condensation does not persist in a grid pattern for seven hours on a sixty-eight degree day with nine percent humidity.",
      "Our working theory — and we want to be careful about how we phrase this — is that what you are watching overhead is not a climate intervention. It is a commerce intervention.",
      "The sprays appear, on the available evidence, to be calibrated suspensions of microencapsulated scent compounds engineered to degrade at low altitude and drift across population centers. When you 'suddenly' crave a specific coffee chain on a Tuesday afternoon, you were not craving it. You were downstream of it.",
      "Consider the geographic correlation. The cross-hatch pattern over the Atlanta metro on February 14th was followed, within 48 hours, by a 19.3% regional lift in searches for one specific branded beverage. This is not coincidence. This is the first fully-instrumented airborne marketing campaign, and you are paying for it twice — in tax dollars that fund the air traffic infrastructure, and in the decisions you believed were yours.",
      "Do your own research. Watch the sky on a clear day. Keep a log. Watch what you crave at 4 p.m. Match the two.",
      "The data is there for anyone who is willing to see it.",
    ],
    relatedSlugs: ["bird-denial-protocol", "cloud-marketing-windows"],
  },

  // ─── Digital Reality ─────────────────────────────────
  {
    slug: "npc-census-2026",
    title: "The 2026 NPC Census: Our Methodology and What It Found",
    category: "digital-reality",
    publishedAt: "2026-04-15",
    dek: "Roughly 81% of the people you pass today are not who you think they are.",
    image: "/sites/thetheoryisreal/theories/npc-census-2026.png",
    breakingBadge: true,
    pullQuotes: [
      "NPCs can be identified by the seven-second pause. Once you see it, you cannot unsee it.",
      "Your barista is a vector. Your neighbor is a render. The simulation is not hypothetical.",
    ],
    body: [
      "Over the past fourteen months, a small group of us — we prefer not to name names — conducted what we believe is the first serious attempt to measure the NPC population in a mid-sized American city.",
      "We will not reveal the city. You do not need to know the city. The findings generalize.",
      "Using a behavioral observation protocol refined across four pilot studies (the Seven-Second Pause Test, the Mirror Avoidance Response, the Repeated-Question Collapse), our team observed and classified 2,407 individuals in public spaces — train platforms, grocery-store aisles, waiting rooms, the back row of movie theaters.",
      "Of those 2,407, roughly 81% exhibited at least three of the five NPC behavioral markers. We want to be responsible about this. That is not a fringe finding. That is the majority of the people around you.",
      "Do not panic. NPCs are not hostile. They are not, so far as we can tell, aware. They are a rendering artifact of a system under load. But their presence has consequences — they fill seats, they cast votes, they buy products, they generate the statistical noise that real people are then forced to wade through.",
      "If you are reading this and beginning to doubt — good. That is the sign. NPCs do not doubt.",
      "Our full methodology is available in the library. The short version is: watch people's eyes when you ask them the same question twice with a small variation. Count how long it takes them to answer. Record what you see.",
      "The data is there. You have only to record it.",
    ],
    relatedSlugs: ["algorithm-sentience", "autoplay-compulsion"],
  },

  // ─── AUTHOR THE REMAINING 18 ARTICLES ────────────────
  // Each follows the same shape. Use the voice guide at the top of this plan.
  // Titles and slugs to author (4 per category, 2 already written above):

  // Atmospheric (3 more):
  //   - "bird-denial-protocol" — "Why Pigeons Do Not Exist (And What Operates in Their Place)"
  //   - "cloud-marketing-windows" — "Cloud Marketing Windows: A Regional Pattern Analysis"
  //   - "weather-as-service" — "WaaS: Weather as a Service, and Who Is Buying It"

  // Global Control (4):
  //   - "avocado-toast-index" — "The Avocado Toast Index: A Leading Indicator of Generational Compliance"
  //   - "ikea-geometry-problem" — "The IKEA Geometry Problem: Why Your Living Room Is Listening"
  //   - "lunchtime-synchronization" — "Lunchtime Synchronization and the 11:47 Anomaly"
  //   - "the-furniture-cartel" — "Inside the Scandinavian Furniture Cartel"

  // Reptilian (4):
  //   - "sentient-smoothies" — "Sentient Smoothies: The Green-Juice Hypothesis, Revisited"
  //   - "roomba-lineage" — "The Roomba Lineage: Domestic Reptilian Infiltration, 2002-Present"
  //   - "celebrity-dental-glitches" — "Five Celebrities Whose Teeth Do Not Work Correctly"
  //   - "reptilian-dental-records" — "What The Dental Records Show (If You Know What To Look For)"

  // Digital Reality (3 more):
  //   - "algorithm-sentience" — "The Social Media Algorithm Is Sentient and Lonely"
  //   - "autoplay-compulsion" — "Autoplay Compulsion: Engineered Helplessness"
  //   - "buffering-prophecy" — "The Buffering Prophecy: What The Wheel Is Telling You"

  // Weaponized Tech (4):
  //   - "6g-sarcasm-allergy" — "6G and the Rise of Sarcasm Allergy in Adults Under 35"
  //   - "smart-toaster-dream-analysis" — "Your Smart Toaster Is Analyzing Your Dreams"
  //   - "fitness-tracker-malice" — "Fitness Tracker Malice: The Resting-Heart-Rate Defense"
  //   - "printer-firmware-truth" — "What Your Printer Is Really Doing At 3 A.M."

  // Each article:
  //   - 6-10 paragraphs of body
  //   - 1-2 pullQuotes
  //   - dek: single sentence hook
  //   - category: matches section above
  //   - publishedAt: spread across 2026-02-01 to 2026-04-18 (newer on breaking ones)
  //   - image: /sites/thetheoryisreal/theories/<slug>.png
  //   - breakingBadge: true on ~5 total articles, distributed across categories
  //   - relatedSlugs: 2-3 per article, within or across categories
]

export function getTheoryBySlug(slug: string): Theory | undefined {
  return theories.find((t) => t.slug === slug)
}

export function getTheoriesByCategory(key: CategoryKey): Theory[] {
  return theories
    .filter((t) => t.category === key)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getLatestTheories(n: number): Theory[] {
  return [...theories]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, n)
}

export function getBreakingTheories(n: number): Theory[] {
  return theories
    .filter((t) => t.breakingBadge)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, n)
}

export function getCategoryByKey(key: CategoryKey): Category | undefined {
  return categories.find((c) => c.key === key)
}
```

- [ ] **Step 2: Author the remaining 18 articles**

Work through the list in the file's comments. Each article needs full body (6-10 paragraphs), dek, 1-2 pull-quotes, relatedSlugs (2-3), and image path. Keep voice consistent with the two examples.

Specifics per category to help voice:
- **Atmospheric**: sincere-observer tone, references flight paths, regional patterns, "independent observers," cross-hatches.
- **Global Control**: institutional tone, references statistics, "leading indicators," "compliance," Scandinavian vs Mediterranean furniture, lunchtime coordination.
- **Reptilian**: forensic-documentary tone, references dental records, "glitches," specific (fictional) incidents, rooftop sightings.
- **Digital Reality**: philosophical-paranoid tone, references Turing-test-adjacent language, "render artifacts," "seven-second pause."
- **Weaponized Tech**: tech-journalist-adjacent tone, references specific frequencies, firmware, "resting-heart-rate defense."

- [ ] **Step 3: Assign `breakingBadge: true` to 5 articles**

Spread: one per category is fine. Example picks: `atmospheric-influencer-sprays`, `npc-census-2026`, `avocado-toast-index`, `roomba-lineage`, `6g-sarcasm-allergy`.

- [ ] **Step 4: Typecheck**

```bash
npx tsc --noEmit
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/sites/thetheoryisreal/data/theories.ts
git commit -m "feat(thetheoryisreal): 20 theory articles and categories"
```

---

## Task 7: Forum boards + usernames/avatars map

**Files:**
- Create: `src/sites/thetheoryisreal/data/forum-users.ts`

We split forum into two files for manageability: `forum-users.ts` (this task) and `forum.ts` (Task 8 — threads).

- [ ] **Step 1: Write file**

```ts
// Forum boards + persistent username ↔ avatar mapping.
// Each shared testimonial image maps to exactly one satirical username.
// The same user appears in multiple threads, evidence submissions, and optional product reviews.

import type { ForumBoard } from "../types"

export const boards: ForumBoard[] = [
  {
    key: "atmospheric-anomalies",
    title: "Atmospheric Anomalies",
    tagline: "What's actually in the sky. Post your cross-hatches.",
    icon: "☁️",
  },
  {
    key: "reptilian-sightings",
    title: "Reptilian Sightings",
    tagline: "Dental glitches, slow blinks, suspicious sunlight allergies.",
    icon: "🦎",
  },
  {
    key: "npc-watch",
    title: "NPC Watch",
    tagline: "Seven-second pause threads. Identify, report, tag.",
    icon: "👁",
  },
  {
    key: "signal-interference",
    title: "Signal Interference",
    tagline: "Grid anomalies, substation hums, 6G migraines.",
    icon: "📡",
  },
  {
    key: "general",
    title: "General Truth-Seeking",
    tagline: "For what doesn't fit anywhere else yet.",
    icon: "🔎",
  },
]

// Fixed mapping: testimonial avatar → satirical username.
// Author exactly one username per avatar. Reuse the same username across all threads.
export const USERNAME_BY_AVATAR: Record<string, string> = {
  "/shared/testimonials/adelaide-muncy.png": "MuncyVigilant",
  "/shared/testimonials/asher-bloom.png": "BloomRecon_77",
  "/shared/testimonials/beauregard-holt.png": "TrenchCoat_Seer",
  "/shared/testimonials/brenda-faulk.png": "FaulkOnTheFence",
  "/shared/testimonials/caldwell-briggs.png": "BriggsOffGrid",
  "/shared/testimonials/capt-rourke-vallis.png": "Capt_Vallis",
  "/shared/testimonials/chad-gullet.png": "GulletAwakened",
  "/shared/testimonials/clement-ashby.png": "AshbySignal",
  "/shared/testimonials/coach-derrick-plum.png": "CoachNPCHunter",
  "/shared/testimonials/derek-pullman.png": "PullmanPulse",
  "/shared/testimonials/dr-moira-petrescu.png": "Dr_Petrescu_ret",
  "/shared/testimonials/eamon-trestle.png": "TrestleTrue",
  "/shared/testimonials/eleanor-whittaker.png": "WhittakerWatcher",
  "/shared/testimonials/elise-tanaka.png": "TanakaTransmits",
  "/shared/testimonials/fenella-ostrom.png": "OstromOrbital",
  "/shared/testimonials/francois-delacroix.png": "Delacroix_Decoder",
  "/shared/testimonials/greg-diane-hofstra.png": "HofstraDuplex",
  "/shared/testimonials/hattie-bronwyn.png": "BronwynBroadcast",
  "/shared/testimonials/jason-kile.png": "KileWasRight",
  "/shared/testimonials/judson-hale.png": "HaleOnHigh",
  "/shared/testimonials/kyle-brandt.png": "BrandtBreakthrough",
  "/shared/testimonials/linda-morrissey.png": "MorrisseyMarginalia",
  "/shared/testimonials/marcus-chen.png": "ChenConfirmed",
  "/shared/testimonials/margaux-sanderling.png": "SanderlingSaw",
  "/shared/testimonials/margot-finch.png": "FinchFrequency",
  "/shared/testimonials/nina-cabrera.png": "CabreraCortex",
  "/shared/testimonials/orson-pepperdine.png": "PepperdineProof",
  "/shared/testimonials/patricia-hollowell.png": "HollowellHeard",
  "/shared/testimonials/priscilla-voss-bingham.png": "VossBinghamVerified",
  "/shared/testimonials/rev-thomasina-oakes.png": "OakesObserves",
  "/shared/testimonials/rosalind-keck.png": "KeckCoordinate",
  "/shared/testimonials/ryan-ashford.png": "AshfordAnomaly",
  "/shared/testimonials/simone-archer.png": "ArcherAtmosphere",
  "/shared/testimonials/tamara-voss.png": "VossTransmission",
  "/shared/testimonials/tamsin-kerrigan.png": "KerriganKnows",
  "/shared/testimonials/theodora-lindquist.png": "LindquistLookout",
  "/shared/testimonials/tony-mazetti.png": "MazettiMidnight",
  "/shared/testimonials/warren-duvall.png": "DuvallDocuments",
}

export const ALL_USERNAMES = Object.values(USERNAME_BY_AVATAR)

export function getAvatarForUsername(username: string): string | undefined {
  return Object.entries(USERNAME_BY_AVATAR).find(([, u]) => u === username)?.[0]
}

export function getBoardByKey(key: string): ForumBoard | undefined {
  return boards.find((b) => b.key === key)
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/thetheoryisreal/data/forum-users.ts
git commit -m "feat(thetheoryisreal): forum boards and persistent user/avatar map"
```

---

## Task 8: Forum threads (25 threads with OPs + ~150 replies)

**Files:**
- Create: `src/sites/thetheoryisreal/data/forum.ts`

- [ ] **Step 1: Write file skeleton with 1 complete example thread**

```ts
import type { ForumThread, BoardKey } from "../types"
import { USERNAME_BY_AVATAR, getAvatarForUsername } from "./forum-users"

// Helper to build a reply — ensures avatar path matches username.
function reply(username: string, postedAt: string, body: string, reactions?: { emoji: string; count: number }[]) {
  const avatar = getAvatarForUsername(username)
  if (!avatar) throw new Error(`Unknown username: ${username}`)
  return { username, avatar, postedAt, body, reactions }
}

export const threads: ForumThread[] = [
  // ─── Atmospheric Anomalies — 5 threads ───────────────
  {
    slug: "cross-hatch-over-memphis-again",
    board: "atmospheric-anomalies",
    title: "Cross-hatch over Memphis AGAIN — 3rd Tuesday in a row",
    hot: true,
    pinned: false,
    op: reply(
      "DuvallDocuments",
      "14 hours ago",
      "Third consecutive Tuesday. Same grid orientation. 2:47 PM start, dispersal complete by 5:10. I've got photos from the Shelby Farms overlook if anyone wants to cross-reference against flight data. What are we looking at here.",
      [{ emoji: "👁", count: 47 }, { emoji: "🔥", count: 12 }],
    ),
    replies: [
      reply(
        "AshbySignal",
        "13 hours ago",
        "Same thing over Cincinnati yesterday. I stopped trusting coincidence at occurrence number 2.",
        [{ emoji: "👁", count: 19 }],
      ),
      reply(
        "WhittakerWatcher",
        "12 hours ago",
        "Pull the METAR archive for your window and cross it against any commercial-flight path. If it's not in the flight data, it's not a plane. Simple as.",
      ),
      reply(
        "GulletAwakened",
        "11 hours ago",
        "Happened in Tulsa on Monday. I've been logging it for 9 weeks. The grid rotates by what looks like 7 degrees per week. Something is being calibrated.",
        [{ emoji: "🔥", count: 31 }],
      ),
      reply(
        "DuvallDocuments",
        "9 hours ago",
        "Calibrated to what though. That's the part that keeps me up. Not *that* it's happening. What it's *measuring*.",
        [{ emoji: "👁", count: 22 }],
      ),
      reply(
        "CabreraCortex",
        "6 hours ago",
        "Cross-reference your dates against regional coffee-chain promotional calendars. Send me a DM and I'll show you what I found for the Memphis market. You will not like it.",
        [{ emoji: "🛸", count: 18 }],
      ),
      reply(
        "BronwynBroadcast",
        "3 hours ago",
        "Screenshotting this whole thread before it disappears. Happens every time these ones get above 40 replies.",
        [{ emoji: "👁", count: 9 }],
      ),
    ],
  },

  // ─── AUTHOR 24 MORE THREADS ──────────────────────────
  // 4 more in atmospheric-anomalies, 5 in reptilian-sightings, 5 in npc-watch,
  // 5 in signal-interference, 5 in general.
  //
  // Each thread: OP (5-8 sentences) + 5-8 replies.
  // ~6 different users per thread is the sweet spot.
  // 8-10 threads total get hot: true; 2-3 get pinned: true.
  //
  // Title examples to author (feel free to adjust phrasing):
  //
  // atmospheric-anomalies:
  //   - "The clouds on 4/11 were WRONG. Anyone else?"
  //   - "Humidity readings during a chemtrail event — my 18-month log"
  //   - "Birds stopped singing for 4 minutes. Then started again in unison."
  //   - "Mom is starting to notice"
  //
  // reptilian-sightings:
  //   - "Saw a senator blink sideways — at a rally, on camera. Time-stamped."
  //   - "Dentist confirmed what I suspected. Won't return my calls now."
  //   - "Roomba did a thing"
  //   - "Anyone else noticing slow-blink patterns on local news anchors?"
  //   - "Celebrity smoothie consumption analysis (updated 4/18)"
  //
  // npc-watch:
  //   - "Seven-second pause at the DMV today — full catalog incoming"
  //   - "Is my coworker a background render? Evidence inside."
  //   - "NPC tell: they can't describe what their shoes look like without looking down"
  //   - "Bus stop census — attempt #4"
  //   - "Gym NPCs vs grocery-store NPCs — different render priority?"
  //
  // signal-interference:
  //   - "Substation near my house started HUMMING last week"
  //   - "Smart toaster made a sound at 3:47 AM last night"
  //   - "My fitness tracker recorded 'activity' while I was asleep"
  //   - "Fluorescent bulb morse code? Help decode."
  //   - "WiFi drops at the exact same moment every evening"
  //
  // general:
  //   - "NEW MEMBER — what do I actually do now"
  //   - "Why I stopped reading mainstream news in 2019 (and what replaced it)"
  //   - "How do you explain this to your family without sounding unwell"
  //   - "Ranking the tinfoil beanie colors — practical field notes"
  //   - "Lost a friend today. He stopped answering questions twice."
  //
  // Voice for replies: same paranoid-sincere tone. Mix of:
  //   - Corroborating observers ("same thing over <other city>")
  //   - Methodology nitpickers ("pull the METAR data")
  //   - Escalators ("it's worse than you think")
  //   - Newbies ("just found this forum, terrified")
  //   - Cryptic oldheads ("we talked about this in 2019. nothing has changed.")
  //   - Occasional paranoid-mod tone ("screenshot this before it disappears")
]

export function getThreadsByBoard(board: BoardKey): ForumThread[] {
  return threads.filter((t) => t.board === board).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (b.pinned && !a.pinned) return 1
    return 0
  })
}

export function getThreadBySlug(board: BoardKey, slug: string): ForumThread | undefined {
  return threads.find((t) => t.board === board && t.slug === slug)
}

export function getHotThreads(n: number): ForumThread[] {
  return threads.filter((t) => t.hot).slice(0, n)
}

// Sanity check at import time — every username in threads must exist in the avatar map.
for (const thread of threads) {
  const all = [thread.op, ...thread.replies]
  for (const r of all) {
    if (!USERNAME_BY_AVATAR[r.avatar] || USERNAME_BY_AVATAR[r.avatar] !== r.username) {
      throw new Error(`Username/avatar mismatch in thread ${thread.slug}: ${r.username}`)
    }
  }
}
```

- [ ] **Step 2: Author the 24 remaining threads**

Work through the title list in the file's comments. Use the reply helper for all posts. Spread `hot: true` across ~8-10 threads, `pinned: true` on ~2-3 (e.g. "NEW MEMBER — what do I actually do now").

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: PASS. If the username-mismatch check throws, fix the username or add to the avatar map (but the map is fixed at Task 7, so prefer fixing the username).

- [ ] **Step 4: Commit**

```bash
git add src/sites/thetheoryisreal/data/forum.ts
git commit -m "feat(thetheoryisreal): 25 forum threads with OPs and replies"
```

---

## Task 9: Products data (16+ satirical SKUs)

**Files:**
- Create: `src/sites/thetheoryisreal/data/products.ts`

- [ ] **Step 1: Write file with 2 complete example products**

```ts
import type { Product } from "../types"

export const products: Product[] = [
  {
    slug: "tinfoil-beanie-signature",
    name: "The Signature Tinfoil Beanie",
    price: 44.99,
    priceLabel: "$44.99",
    tagline: "Our flagship head-shield. Worn by senior subjects since 2011.",
    description: [
      "The one we wear. Hand-pleated from triple-ply aerospace-grade aluminum foil bonded to a breathable inner liner. Passive blocking across the active civilian RF band, plus 6G pre-emptive shielding at the crown.",
      "Machine wash cold, do not bleach, do not tumble dry. Dents in the foil are not defects — they are calibration. Re-shape by hand as needed.",
      "Fits most head sizes. Runs slightly loose by design — you want airflow under the shield to avoid heat buildup during extended wear sessions.",
    ],
    image: "/sites/thetheoryisreal/products/tinfoil-beanie-signature.png",
    conspiracyTag: "weaponized-tech",
    nutritionalFacts: [
      { label: "RF attenuation", value: "~17 dB (lab-unverified)" },
      { label: "Ply", value: "Triple" },
      { label: "Weight", value: "4.2 oz" },
      { label: "Field-tested", value: "Since 2011" },
      { label: "Returns", value: "Final sale" },
    ],
  },
  {
    slug: "filtered-tap-water-sixpack",
    name: '"Filtered" Tap Water (6-pack)',
    price: 149.99,
    priceLabel: "$149.99 / six-pack",
    tagline: "Municipal tap water, now with a label you can trust.",
    description: [
      "We do not add anything. We do not remove anything. That is the point. We source from standard municipal taps across three independent geographic regions and bottle the result under a label that correctly identifies what is in the bottle: water that has been through a filter somewhere, at some point, by someone.",
      "You have been paying for filtered water your entire life. We are simply the first outlet willing to tell you the truth about it.",
      "Ships in the original glass. Store upright, away from smart devices, out of direct fluorescent light.",
    ],
    image: "/sites/thetheoryisreal/products/filtered-tap-water-sixpack.png",
    conspiracyTag: "classics",
    nutritionalFacts: [
      { label: "Volume", value: "6 × 500 mL" },
      { label: "Source", value: "Three municipal systems" },
      { label: "Filtration", value: "Yes, at some point" },
      { label: "Fluoride", value: "Whatever the city adds" },
      { label: "Honesty", value: "Complete" },
    ],
  },

  // ─── AUTHOR 14+ MORE PRODUCTS ────────────────────────
  // Target 16+ total. Each follows the same shape.
  // Prices should feel absurd but deadpan. No jokes in the price; the joke is that the price is real.
  //
  // SKUs to author (slug → name → conspiracyTag):
  //   - foil-torso-wrap → "The Full-Torso Foil Wrap" → weaponized-tech → $89.99
  //   - crystal-infused-laptop-skin → "Crystal-Infused Laptop Skin" → illuminati → $129.00
  //   - anti-npc-sunglasses → "Anti-NPC Observation Sunglasses" → npc → $78.00
  //   - emf-pillowcase → "EMF-Blocking Pillowcase" → weaponized-tech → $64.50
  //   - smart-toaster-firewall → "Smart-Toaster Firewall Module" → weaponized-tech → $219.00
  //   - 6g-blocking-lip-balm → "6G-Blocking Lip Balm" → weaponized-tech → $28.00
  //   - reptilian-detector-flashlight → "The Reptilian-Detector Flashlight" → reptilian → $89.00
  //   - pigeon-deterrent-spray → "Pigeon-Deterrent Spray (Non-Lethal)" → chemtrails → $36.00
  //   - clean-dream-blanket → "'Clean Dream' Dream-Shield Blanket" → weaponized-tech → $189.00
  //   - tinfoil-socks → "Tinfoil Socks" → weaponized-tech → $42.00
  //   - orgone-pyramid-usb → "Orgone Pyramid USB Charger" → illuminati → $159.00
  //   - avocado-toast-decoy → "Avocado Toast Decoy (Plastic)" → illuminati → $54.00
  //   - reality-anchor-keychain → "Reality Anchor Keychain" → npc → $39.00
  //   - surveillance-pigeon-whistle → "Surveillance-Pigeon Whistle" → chemtrails → $31.00
  //   - foil-car-cover → "Vehicle Foil Cover (Driver's Side)" → weaponized-tech → $249.00
  //   - reptilian-identifier-app (digital) → "Reptilian Identifier (Annual License)" → reptilian → $99.00
  //
  // Voice: deadpan catalog copy, as if it's a real outdoor-gear or wellness store.
  // Specs table: 4-6 "nutritionalFacts" entries repurposed as SPECS (use the existing field name,
  // but think of it as spec/attribute rows — the ProductCard component reads it as-is).
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByTag(tag: Product["conspiracyTag"]): Product[] {
  return products.filter((p) => p.conspiracyTag === tag)
}
```

- [ ] **Step 2: Author remaining 14+ products**

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/sites/thetheoryisreal/data/products.ts
git commit -m "feat(thetheoryisreal): 16+ satirical products"
```

---

## Task 10: Evidence gallery data (24 items)

**Files:**
- Create: `src/sites/thetheoryisreal/data/evidence.ts`

- [ ] **Step 1: Write file with 3 complete examples**

```ts
import type { EvidenceItem } from "../types"

export const evidenceItems: EvidenceItem[] = [
  {
    id: "portland-bus-stop-drone",
    image: "/sites/thetheoryisreal/evidence/portland-bus-stop-drone.png",
    caption: "FOOTAGE: suspected surveillance drone (disguised as pigeon) observing passengers, NW 5th & Glisan bus stop, Portland, 2026-02-12.",
    submittedBy: "DuvallDocuments",
    tags: ["pigeon", "surveillance", "urban"],
    annotations: [
      { kind: "circle", x: 62, y: 41, w: 14 },
      { kind: "arrow", x: 45, y: 55, rotation: 20 },
    ],
  },
  {
    id: "sky-memphis-2026-03-17",
    image: "/sites/thetheoryisreal/evidence/sky-memphis-2026-03-17.png",
    caption: "Cross-hatch formation, 2:47 PM start, Memphis, 2026-03-17. Third occurrence in 21 days.",
    submittedBy: "DuvallDocuments",
    tags: ["chemtrails", "memphis", "tuesday"],
    annotations: [
      { kind: "circle", x: 30, y: 25, w: 20 },
      { kind: "circle", x: 65, y: 30, w: 18 },
    ],
  },
  {
    id: "grocery-aisle-npc",
    image: "/sites/thetheoryisreal/evidence/grocery-aisle-npc.png",
    caption: "Subject held the same can of beans for 7.4 seconds without moving. Classic seven-second pause. Returned to identical posture after my second walk-by.",
    submittedBy: "CoachNPCHunter",
    tags: ["npc", "retail", "pause-test"],
    annotations: [
      { kind: "circle", x: 50, y: 50, w: 22 },
    ],
  },

  // ─── AUTHOR 21 MORE ITEMS ────────────────────────────
  // Each item: id (kebab-case), image path, caption, submittedBy (must be a forum username),
  // tags (2-4), annotations (1-2 per item).
  //
  // Spread across these subject types:
  //   - Clouds/sky (5)
  //   - Pigeons/birds (3)
  //   - Celebrities mid-glitch (3)
  //   - Smart devices behaving oddly (3)
  //   - NPCs in public settings (3)
  //   - Reptilian "tells" (2)
  //   - Substations/utility infrastructure (2)
  //   - Mundane household items that "aren't right" (2)
  //   - One "leaked document" scan (heavily redacted, obviously fake)
  //
  // Captions should read like forum evidence posts — terse, specific, suspicious of coincidence.
  // Submitters should be drawn from ALL_USERNAMES in forum-users.ts (import if you need the list).
]

export function getEvidenceById(id: string): EvidenceItem | undefined {
  return evidenceItems.find((e) => e.id === id)
}
```

- [ ] **Step 2: Author remaining 21 items**

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/sites/thetheoryisreal/data/evidence.ts
git commit -m "feat(thetheoryisreal): 24 evidence gallery items"
```

---

## Task 11: Library data (25 fake-study entries)

**Files:**
- Create: `src/sites/thetheoryisreal/data/library.ts`

- [ ] **Step 1: Write file with 3 examples**

```ts
import type { LibraryEntry } from "../types"

// URLs point to harmless Wikipedia pages OR internal dead-end anchors.
// Never link to actual conspiracy content.
export const libraryEntries: LibraryEntry[] = [
  {
    title: "On the Observable Behavior of Pigeons Near Municipal WiFi Nodes",
    author: "Dr. R. Kestrel, PhD (unaffiliated)",
    year: "2024",
    url: "https://en.wikipedia.org/wiki/Pigeon",
    abstractSnippet:
      "A 14-month observational study documenting abnormal hovering patterns in urban pigeon populations within a 30-meter radius of active 2.4 GHz municipal access points. Findings are consistent with the 'avian-reconnaissance substitution' hypothesis.",
  },
  {
    title: "The Cross-Hatch as a Broadcast Primitive: A Meteorological Anomaly Atlas (2018–2025)",
    author: "Atmospheric Observers of the Upper Midwest",
    year: "2025",
    url: "https://en.wikipedia.org/wiki/Contrail",
    abstractSnippet:
      "Catalog of 1,247 cross-hatch formations over 11 metro areas, indexed against commercial promotional calendars. Correlation exceeds chance in 84% of observed windows.",
  },
  {
    title: "Seven-Second Pause: A Proposed Screening Protocol for Simulation-Origin Agents",
    author: "D. Plum, M.ED.",
    year: "2023",
    url: "#methodology-pending",
    abstractSnippet:
      "Behavioral protocol for distinguishing rendered subjects from non-rendered individuals in public-observation contexts. Reproducible, non-intrusive, low-false-positive.",
  },

  // ─── AUTHOR 22 MORE ENTRIES ──────────────────────────
  // Mix of academic-sounding titles across:
  //   - atmospheric (5)
  //   - surveillance (4)
  //   - NPC/simulation (4)
  //   - reptilian (3)
  //   - weaponized tech (3)
  //   - cultural/sociological (3)
  //
  // Authors: mix "Dr. <name>, PhD (unaffiliated)", unnamed collectives, initials-only.
  // Years: 1998-2026 range.
  // URLs: ~half point to real, mundane Wikipedia pages (e.g. Pigeon, Copper(II) sulfate,
  // Substation, Electromagnetic interference, Contrail, Cloud, 5G, Ikea, Simulation hypothesis).
  // ~half use internal `#anchor-never-real` anchors.
]
```

- [ ] **Step 2: Author remaining 22 entries**

- [ ] **Step 3: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/data/library.ts
git commit -m "feat(thetheoryisreal): 25 library entries"
```

---

## Task 12: Small presentational components

**Files:**
- Create: `src/sites/thetheoryisreal/components/document-card.tsx`
- Create: `src/sites/thetheoryisreal/components/red-alert-banner.tsx`
- Create: `src/sites/thetheoryisreal/components/pull-quote.tsx`
- Create: `src/sites/thetheoryisreal/components/geocities-footer-wink.tsx`
- Modify (if needed): `src/themes/fonts.ts` — add `permanent-marker` font

- [ ] **Step 1: Add Permanent Marker font if not present**

In `src/themes/fonts.ts`: import via `next/font/google`, declare, add `.variable` to `fontVariables`, add to `fontFamilyMap` under key `"permanent-marker"`.

- [ ] **Step 2: DocumentCard**

```tsx
// src/sites/thetheoryisreal/components/document-card.tsx
import type { ReactNode } from "react"

export function DocumentCard({
  children,
  fileNumber,
  className = "",
}: {
  children: ReactNode
  fileNumber?: string
  className?: string
}) {
  return (
    <div
      className={`relative border border-primary/60 bg-[#17181c] p-6 shadow-[inset_0_0_40px_rgba(200,168,107,0.04)] ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(200,168,107,0.02) 0 1px, transparent 1px 3px)",
      }}
    >
      {fileNumber && (
        <div className="absolute right-3 top-2 font-heading text-[0.65rem] uppercase tracking-widest text-primary/60">
          FILE #{fileNumber}
        </div>
      )}
      {children}
    </div>
  )
}
```

- [ ] **Step 3: RedAlertBanner**

```tsx
// src/sites/thetheoryisreal/components/red-alert-banner.tsx
"use client"

import { useEffect, useState } from "react"

export function RedAlertBanner({ headlines }: { headlines: string[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (headlines.length < 2) return
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % headlines.length)
    }, 6500)
    return () => clearInterval(id)
  }, [headlines.length])

  return (
    <div className="sticky top-0 z-40 w-full border-y border-accent/70 bg-accent/15 text-accent">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 font-heading text-xs uppercase tracking-[0.25em] sm:text-sm">
        <span className="animate-pulse rounded-sm bg-accent px-2 py-0.5 text-[0.65rem] text-[#0f1012]">
          BREAKING
        </span>
        <span className="flex-1 truncate">{headlines[i] ?? ""}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: PullQuote**

```tsx
// src/sites/thetheoryisreal/components/pull-quote.tsx
export function PullQuote({ children }: { children: string }) {
  return (
    <aside className="my-8 border-l-4 border-accent pl-5 py-2">
      <blockquote
        className="text-xl leading-snug text-primary"
        style={{ fontFamily: "var(--font-permanent-marker, var(--font-heading))" }}
      >
        “{children}”
      </blockquote>
    </aside>
  )
}
```

- [ ] **Step 5: GeoCitiesFooterWink**

```tsx
// src/sites/thetheoryisreal/components/geocities-footer-wink.tsx
export function GeoCitiesFooterWink() {
  return (
    <div className="border-t border-primary/20 bg-[#0b0c0e] px-4 py-3 text-center font-heading text-[0.7rem] uppercase tracking-widest text-primary/60">
      VISITOR <span className="text-primary">0000034</span> · YOU ARE BEING WATCHED · TRUTH WEBRING ·{" "}
      <span className="text-secondary">← PREV</span> · <span className="text-secondary">RANDOM</span> ·{" "}
      <span className="text-secondary">NEXT →</span>
    </div>
  )
}
```

- [ ] **Step 6: Typecheck + lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/sites/thetheoryisreal/components/ src/themes/fonts.ts
git commit -m "feat(thetheoryisreal): small presentational components"
```

---

## Task 13: RedactedPortrait + LeadershipDossierCard

**Files:**
- Create: `src/sites/thetheoryisreal/components/redacted-portrait.tsx`
- Create: `src/sites/thetheoryisreal/components/leadership-dossier-card.tsx`

- [ ] **Step 1: RedactedPortrait**

```tsx
// src/sites/thetheoryisreal/components/redacted-portrait.tsx
import Image from "next/image"

export function RedactedPortrait({
  src,
  alt,
  severity = "heavy",
}: {
  src: string
  alt: string
  severity?: "light" | "heavy"
}) {
  // Eye bar occupies roughly 36-52% vertical in a headshot.
  const barStyle =
    severity === "heavy"
      ? { top: "34%", height: "20%" }
      : { top: "36%", height: "14%" }

  return (
    <div className="relative aspect-square w-full overflow-hidden border border-primary/40 grayscale contrast-125">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
      <div
        className="absolute left-0 w-full bg-black"
        style={barStyle}
        aria-hidden="true"
      />
      {severity === "heavy" && (
        <div
          className="absolute left-[10%] bg-black"
          style={{ top: "66%", width: "40%", height: "8%" }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: LeadershipDossierCard**

```tsx
// src/sites/thetheoryisreal/components/leadership-dossier-card.tsx
import type { LeaderDossier } from "../types"
import { RedactedPortrait } from "./redacted-portrait"
import { DocumentCard } from "./document-card"

const STATUS_COLORS: Record<LeaderDossier["statusTag"], string> = {
  ACTIVE: "text-secondary border-secondary",
  "DEEP COVER": "text-primary/80 border-primary/60",
  COMPROMISED: "text-accent border-accent",
  UNREACHABLE: "text-text/40 border-text/30",
}

export function LeadershipDossierCard({
  dossier,
  codename,
  index,
}: {
  dossier: LeaderDossier
  codename: string
  index: number
}) {
  return (
    <DocumentCard fileNumber={`2026-${String(index + 1).padStart(4, "0")}`}>
      <RedactedPortrait src={dossier.blurredPhoto} alt={`Redacted portrait of ${codename}`} />
      <div className="mt-4 flex items-center justify-between">
        <h3 className="font-heading text-lg text-primary">
          SUBJECT {dossier.id.split("-")[1]} — {codename}
        </h3>
        <span
          className={`border px-2 py-0.5 font-heading text-[0.6rem] uppercase tracking-widest ${STATUS_COLORS[dossier.statusTag]}`}
        >
          {dossier.statusTag}
        </span>
      </div>
      <p className="mt-2 font-heading text-[0.75rem] uppercase tracking-wider text-primary/70">
        {dossier.expertise}
      </p>
      <p className="mt-4 font-body text-sm leading-relaxed text-text/85">{dossier.biography}</p>
    </DocumentCard>
  )
}
```

- [ ] **Step 3: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/components/
git commit -m "feat(thetheoryisreal): redacted portrait and dossier card"
```

---

## Task 14: Forum components

**Files:**
- Create: `src/sites/thetheoryisreal/components/forum-thread-row.tsx`
- Create: `src/sites/thetheoryisreal/components/forum-board-card.tsx`
- Create: `src/sites/thetheoryisreal/components/forum-thread-view.tsx`

- [ ] **Step 1: ForumThreadRow**

```tsx
// src/sites/thetheoryisreal/components/forum-thread-row.tsx
import Link from "next/link"
import Image from "next/image"
import type { ForumThread } from "../types"
import { getSiteHref } from "@/lib/site-href"

export async function ForumThreadRow({ thread }: { thread: ForumThread }) {
  const siteHref = await getSiteHref()
  const href = siteHref(`/forum/${thread.board}/${thread.slug}`)
  return (
    <Link
      href={href}
      className="flex items-start gap-4 border-b border-primary/20 px-4 py-3 transition-colors hover:bg-primary/5"
    >
      <Image
        src={thread.op.avatar}
        alt={thread.op.username}
        width={40}
        height={40}
        className="mt-1 h-10 w-10 rounded-full border border-primary/40 grayscale"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {thread.pinned && (
            <span className="font-heading text-[0.6rem] uppercase tracking-widest text-accent">📌 PINNED</span>
          )}
          {thread.hot && (
            <span className="font-heading text-[0.6rem] uppercase tracking-widest text-secondary">🔥 HOT</span>
          )}
        </div>
        <div className="font-body text-base text-primary">{thread.title}</div>
        <div className="mt-1 flex items-center gap-3 font-heading text-[0.7rem] uppercase tracking-wider text-text/60">
          <span>{thread.op.username}</span>
          <span>·</span>
          <span>{thread.op.postedAt}</span>
          <span>·</span>
          <span>{thread.replies.length} replies</span>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: ForumBoardCard**

```tsx
// src/sites/thetheoryisreal/components/forum-board-card.tsx
import Link from "next/link"
import type { ForumBoard, ForumThread } from "../types"
import { getSiteHref } from "@/lib/site-href"

export async function ForumBoardCard({
  board,
  latestThread,
  threadCount,
}: {
  board: ForumBoard
  latestThread?: ForumThread
  threadCount: number
}) {
  const siteHref = await getSiteHref()
  return (
    <Link
      href={siteHref(`/forum/${board.key}`)}
      className="block border border-primary/40 bg-[#17181c] p-5 transition-colors hover:border-primary"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className="text-2xl">{board.icon}</span>
        <h3 className="font-heading text-lg text-primary">{board.title}</h3>
      </div>
      <p className="mt-2 font-body text-sm text-text/75">{board.tagline}</p>
      <div className="mt-4 border-t border-primary/20 pt-3 font-heading text-[0.7rem] uppercase tracking-wider text-text/60">
        {threadCount} threads
        {latestThread && (
          <span className="ml-3 text-text/80">Latest: {latestThread.title}</span>
        )}
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: ForumThreadView**

```tsx
// src/sites/thetheoryisreal/components/forum-thread-view.tsx
import Image from "next/image"
import type { ForumThread, ForumReply } from "../types"

function ReplyBlock({ r, isOp = false }: { r: ForumReply; isOp?: boolean }) {
  return (
    <article className={`border-b border-primary/20 px-4 py-5 ${isOp ? "bg-[#17181c]" : ""}`}>
      <header className="flex items-center gap-3">
        <Image
          src={r.avatar}
          alt={r.username}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border border-primary/40 grayscale"
        />
        <div>
          <div className="font-heading text-sm text-primary">{r.username}</div>
          <div className="font-heading text-[0.7rem] uppercase tracking-wider text-text/60">
            {isOp && <span className="mr-2 rounded-sm bg-primary/20 px-1.5 py-0.5 text-primary">OP</span>}
            {r.postedAt}
          </div>
        </div>
      </header>
      <div className="mt-3 whitespace-pre-line font-body text-[0.95rem] leading-relaxed text-text/90">
        {r.body}
      </div>
      {r.reactions && r.reactions.length > 0 && (
        <div className="mt-3 flex gap-2">
          {r.reactions.map((rx, i) => (
            <span
              key={i}
              className="rounded-sm border border-primary/30 px-2 py-0.5 font-heading text-[0.7rem] text-text/80"
            >
              {rx.emoji} {rx.count}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

export function ForumThreadView({ thread }: { thread: ForumThread }) {
  return (
    <div className="border border-primary/40 bg-[#141519]">
      <header className="border-b border-primary/30 bg-[#0b0c0e] px-4 py-3">
        <h1 className="font-heading text-xl text-primary">{thread.title}</h1>
      </header>
      <ReplyBlock r={thread.op} isOp />
      {thread.replies.map((r, i) => (
        <ReplyBlock key={i} r={r} />
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/components/forum-*.tsx
git commit -m "feat(thetheoryisreal): forum row, board card, and thread view"
```

---

## Task 15: Evidence components

**Files:**
- Create: `src/sites/thetheoryisreal/components/evidence-tile.tsx`
- Create: `src/sites/thetheoryisreal/components/evidence-gallery.tsx`

- [ ] **Step 1: EvidenceTile**

```tsx
// src/sites/thetheoryisreal/components/evidence-tile.tsx
"use client"

import Image from "next/image"
import type { EvidenceItem } from "../types"

export function EvidenceTile({
  item,
  onClick,
}: {
  item: EvidenceItem
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full overflow-hidden border border-primary/30 bg-[#17181c] text-left transition-colors hover:border-primary"
    >
      <div className="relative aspect-[4/3] w-full grayscale contrast-125 group-hover:grayscale-0">
        <Image src={item.image} alt={item.caption} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        {item.annotations?.map((a, i) =>
          a.kind === "circle" ? (
            <span
              key={i}
              className="absolute rounded-full border-2 border-accent"
              style={{
                left: `${a.x}%`,
                top: `${a.y}%`,
                width: `${a.w ?? 18}%`,
                aspectRatio: "1 / 1",
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden
            />
          ) : (
            <span
              key={i}
              className="absolute origin-center text-accent"
              style={{
                left: `${a.x}%`,
                top: `${a.y}%`,
                transform: `translate(-50%, -50%) rotate(${a.rotation ?? 0}deg)`,
                fontSize: "2rem",
                lineHeight: 1,
              }}
              aria-hidden
            >
              ↗
            </span>
          ),
        )}
      </div>
      <div className="px-3 py-3">
        <p className="font-body text-sm text-text/90 line-clamp-3">{item.caption}</p>
        <p className="mt-2 font-heading text-[0.65rem] uppercase tracking-widest text-text/55">
          Submitted by {item.submittedBy}
        </p>
      </div>
    </button>
  )
}
```

- [ ] **Step 2: EvidenceGallery with lightbox**

```tsx
// src/sites/thetheoryisreal/components/evidence-gallery.tsx
"use client"

import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import type { EvidenceItem } from "../types"
import { EvidenceTile } from "./evidence-tile"

export function EvidenceGallery({ items }: { items: EvidenceItem[] }) {
  const [focused, setFocused] = useState<EvidenceItem | null>(null)

  const close = useCallback(() => setFocused(null), [])

  useEffect(() => {
    if (!focused) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [focused, close])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <EvidenceTile key={item.id} item={item} onClick={() => setFocused(item)} />
        ))}
      </div>
      {focused && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={focused.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] w-full border border-primary/60 bg-[#0b0c0e]">
              <Image src={focused.image} alt={focused.caption} fill className="object-contain" sizes="100vw" />
            </div>
            <div className="mt-3 border border-primary/40 bg-[#141519] px-4 py-3">
              <p className="font-body text-sm text-text/90">{focused.caption}</p>
              <div className="mt-2 flex items-center justify-between font-heading text-[0.65rem] uppercase tracking-widest text-text/55">
                <span>Submitted by {focused.submittedBy}</span>
                <span>Tags: {focused.tags.join(" · ")}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              className="mt-3 font-heading text-xs uppercase tracking-widest text-primary hover:text-accent"
            >
              Close (ESC)
            </button>
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 3: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/components/evidence-*.tsx
git commit -m "feat(thetheoryisreal): evidence tile and gallery with lightbox"
```

---

## Task 16: Homepage helpers — BreakingRail, CategoryTile, LibraryList

**Files:**
- Create: `src/sites/thetheoryisreal/components/breaking-rail.tsx`
- Create: `src/sites/thetheoryisreal/components/category-tile.tsx`
- Create: `src/sites/thetheoryisreal/components/library-list.tsx`

- [ ] **Step 1: BreakingRail**

```tsx
// src/sites/thetheoryisreal/components/breaking-rail.tsx
import Link from "next/link"
import Image from "next/image"
import type { Theory } from "../types"
import { getSiteHref } from "@/lib/site-href"

export async function BreakingRail({ items }: { items: Theory[] }) {
  const siteHref = await getSiteHref()
  return (
    <section aria-label="Breaking exposures" className="relative border-y border-accent/60 bg-[#0b0c0e] py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">
            Breaking Exposures
          </h2>
          <span className="h-px flex-1 bg-accent/30" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((t, idx) => (
            <Link
              key={t.slug}
              href={siteHref(`/theories/${t.slug}`)}
              className="group relative block"
            >
              {/* pushpin */}
              <span
                aria-hidden
                className="absolute -top-2 left-3 z-10 inline-block h-3 w-3 rounded-full bg-accent shadow-[0_0_6px_rgba(193,58,46,0.7)]"
              />
              <div className="relative aspect-[4/3] overflow-hidden border border-primary/30 grayscale group-hover:grayscale-0">
                <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 20vw" />
              </div>
              <p className="mt-2 font-body text-sm leading-snug text-text group-hover:text-primary">
                {t.title}
              </p>
              <p className="mt-1 font-heading text-[0.65rem] uppercase tracking-widest text-text/55">
                {new Date(t.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
              {idx < items.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[-18%] top-4 hidden h-px w-[30%] origin-left rotate-3 bg-accent/40 lg:block"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: CategoryTile**

```tsx
// src/sites/thetheoryisreal/components/category-tile.tsx
import Link from "next/link"
import Image from "next/image"
import type { Category } from "../types"
import { getSiteHref } from "@/lib/site-href"

export async function CategoryTile({ category }: { category: Category }) {
  const siteHref = await getSiteHref()
  return (
    <Link
      href={siteHref(`/category/${category.key}`)}
      className="group relative block overflow-hidden border border-primary/40 bg-[#17181c]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden grayscale transition-all group-hover:grayscale-0">
        <Image src={category.image} alt={category.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/20 to-transparent" />
      </div>
      <div className="relative -mt-12 px-5 pb-5">
        <h3 className="font-heading text-lg uppercase tracking-widest text-primary">{category.title}</h3>
        <p className="mt-1 font-body text-sm text-text/85">{category.tagline}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: LibraryList**

```tsx
// src/sites/thetheoryisreal/components/library-list.tsx
import type { LibraryEntry } from "../types"

export function LibraryList({ entries }: { entries: LibraryEntry[] }) {
  return (
    <ol className="divide-y divide-primary/20 border border-primary/30 bg-[#141519]">
      {entries.map((e, i) => (
        <li key={i} className="px-5 py-4">
          <a
            href={e.url}
            className="font-body text-base text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-accent"
            target={e.url.startsWith("#") ? undefined : "_blank"}
            rel={e.url.startsWith("#") ? undefined : "noopener noreferrer"}
          >
            {e.title}
          </a>
          <div className="mt-1 font-heading text-[0.7rem] uppercase tracking-wider text-text/60">
            {e.author} · {e.year}
          </div>
          <p className="mt-2 font-body text-sm text-text/85">{e.abstractSnippet}</p>
        </li>
      ))}
    </ol>
  )
}
```

- [ ] **Step 4: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/components/
git commit -m "feat(thetheoryisreal): breaking rail, category tile, library list"
```

---

## Task 17: About page (origin story + leadership dossiers)

**Files:**
- Create: `src/sites/thetheoryisreal/pages/about.tsx`

- [ ] **Step 1: Write page**

```tsx
// src/sites/thetheoryisreal/pages/about.tsx
import type { PageMetadata } from "@/themes"
import { dossiers, pickCodename } from "@/sites/thetheoryisreal/data/leadership"
import { LeadershipDossierCard } from "@/sites/thetheoryisreal/components/leadership-dossier-card"

export const metadata: PageMetadata = {
  title: "About — The Theory Is Real",
  description: "Origin, mandate, and redacted leadership roster.",
}

export default function About() {
  // Deterministic per-render codename seed based on a daily rotation so SSR and hydration agree.
  const todaySeed = Math.floor(Date.now() / (24 * 60 * 60 * 1000))
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-12">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
          INTERNAL DOCUMENT · DECLASSIFIED
        </p>
        <h1 className="mt-2 font-heading text-4xl text-primary">About This Outlet</h1>
        <p className="mt-4 font-body text-lg leading-relaxed text-text/85">
          We are a collective of former professionals, amateur observers, and one retired municipal technician
          who met — we will not explain how — in the late 2010s and discovered that the observations each of us
          had been compiling independently were converging on the same phenomena.
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-text/80">
          This outlet exists because the observations had nowhere else to go. The mainstream outlets would not
          publish them. The academic journals would not peer-review them. The forums would not keep them up. So
          we built something that would.
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-text/80">
          We do not accept advertising. We do not take funding from foundations. We do not know who owns the
          domain registration and, frankly, at this point we have stopped asking.
        </p>
      </header>

      <section>
        <h2 className="mb-6 font-heading text-sm uppercase tracking-[0.3em] text-accent">
          Redacted Leadership Roster
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dossiers.map((d, i) => (
            <LeadershipDossierCard
              key={d.id}
              dossier={d}
              codename={pickCodename(todaySeed + i)}
              index={i}
            />
          ))}
        </div>
        <p className="mt-8 font-body text-sm italic text-text/60">
          Codenames rotate daily. Photos are redacted at the subject's request. Status tags reflect the most
          recent confirmed correspondence.
        </p>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/pages/about.tsx
git commit -m "feat(thetheoryisreal): about page with redacted dossiers"
```

---

## Task 18: Forum pages (index, board, thread)

**Files:**
- Create: `src/sites/thetheoryisreal/pages/forum.tsx`
- Create: `src/sites/thetheoryisreal/pages/forum-board.tsx`
- Create: `src/sites/thetheoryisreal/pages/forum-thread.tsx`

- [ ] **Step 1: Forum index**

```tsx
// src/sites/thetheoryisreal/pages/forum.tsx
import type { PageMetadata } from "@/themes"
import { boards } from "@/sites/thetheoryisreal/data/forum-users"
import { threads, getThreadsByBoard, getHotThreads } from "@/sites/thetheoryisreal/data/forum"
import { ForumBoardCard } from "@/sites/thetheoryisreal/components/forum-board-card"
import { ForumThreadRow } from "@/sites/thetheoryisreal/components/forum-thread-row"

export const metadata: PageMetadata = {
  title: "Forum — The Theory Is Real",
  description: "The Awakened discuss observations, evidence, and signal interference.",
}

export default function ForumIndex() {
  const hot = getHotThreads(6)
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">THE AWAKENED</p>
        <h1 className="mt-2 font-heading text-4xl text-primary">Forum</h1>
        <p className="mt-3 font-body text-base text-text/80">
          Five boards. {threads.length} threads. If you are new, the pinned post in General Truth-Seeking is a
          reasonable place to begin.
        </p>
      </header>

      <section id="hot" className="mb-12">
        <h2 className="mb-4 font-heading text-sm uppercase tracking-[0.3em] text-accent">🔥 Hot Threads</h2>
        <div className="border border-primary/30 bg-[#141519]">
          {hot.map((t) => (
            <ForumThreadRow key={`${t.board}/${t.slug}`} thread={t} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-sm uppercase tracking-[0.3em] text-accent">Boards</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {boards.map((b) => {
            const ts = getThreadsByBoard(b.key)
            return (
              <ForumBoardCard
                key={b.key}
                board={b}
                threadCount={ts.length}
                latestThread={ts[0]}
              />
            )
          })}
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Board page (dynamic — 1 segment)**

```tsx
// src/sites/thetheoryisreal/pages/forum-board.tsx
import { notFound } from "next/navigation"
import { getBoardByKey } from "@/sites/thetheoryisreal/data/forum-users"
import { getThreadsByBoard } from "@/sites/thetheoryisreal/data/forum"
import { ForumThreadRow } from "@/sites/thetheoryisreal/components/forum-thread-row"
import type { BoardKey } from "@/sites/thetheoryisreal/types"

export default function ForumBoardPage({ slug }: { slug: string; segments?: string[] }) {
  const board = getBoardByKey(slug)
  if (!board) notFound()
  const ts = getThreadsByBoard(board.key as BoardKey)
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">/forum/{board.key}</p>
        <h1 className="mt-2 font-heading text-3xl text-primary">
          {board.icon} {board.title}
        </h1>
        <p className="mt-3 font-body text-base text-text/80">{board.tagline}</p>
      </header>
      <div className="border border-primary/30 bg-[#141519]">
        {ts.map((t) => (
          <ForumThreadRow key={t.slug} thread={t} />
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Thread page (dynamic — 2 segments)**

```tsx
// src/sites/thetheoryisreal/pages/forum-thread.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import { getThreadBySlug } from "@/sites/thetheoryisreal/data/forum"
import { getBoardByKey } from "@/sites/thetheoryisreal/data/forum-users"
import { ForumThreadView } from "@/sites/thetheoryisreal/components/forum-thread-view"
import { getSiteHref } from "@/lib/site-href"
import type { BoardKey } from "@/sites/thetheoryisreal/types"

export default async function ForumThreadPage({
  slug,
  segments,
}: {
  slug: string
  segments?: string[]
}) {
  // segments contains ALL segments including the first, e.g. ["<board>", "<thread>"]
  if (!segments || segments.length !== 2) notFound()
  const [boardKey, threadSlug] = segments
  const board = getBoardByKey(boardKey)
  if (!board) notFound()
  const thread = getThreadBySlug(board.key as BoardKey, threadSlug)
  if (!thread) notFound()
  const siteHref = await getSiteHref()

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-4 font-heading text-xs uppercase tracking-widest text-text/55">
        <Link href={siteHref("/forum")} className="hover:text-primary">Forum</Link>
        <span className="mx-2">/</span>
        <Link href={siteHref(`/forum/${board.key}`)} className="hover:text-primary">{board.title}</Link>
      </nav>
      <ForumThreadView thread={thread} />
    </main>
  )
}
```

- [ ] **Step 4: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/pages/forum*.tsx
git commit -m "feat(thetheoryisreal): forum index, board, and thread pages"
```

---

## Task 19: Theories index + theory detail + category pages

**Files:**
- Create: `src/sites/thetheoryisreal/pages/theories.tsx`
- Create: `src/sites/thetheoryisreal/pages/theory-detail.tsx`
- Create: `src/sites/thetheoryisreal/pages/category.tsx`

- [ ] **Step 1: Theories index**

```tsx
// src/sites/thetheoryisreal/pages/theories.tsx
import type { PageMetadata } from "@/themes"
import Link from "next/link"
import Image from "next/image"
import { theories, categories } from "@/sites/thetheoryisreal/data/theories"
import { getSiteHref } from "@/lib/site-href"

export const metadata: PageMetadata = {
  title: "Theories — The Theory Is Real",
  description: "All articles, indexed by category.",
}

export default async function Theories() {
  const siteHref = await getSiteHref()
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <h1 className="font-heading text-4xl text-primary">Theories</h1>
        <p className="mt-3 font-body text-base text-text/80">{theories.length} articles across {categories.length} categories. Begin where the pattern looks familiar.</p>
      </header>
      {categories.map((cat) => {
        const inCat = theories.filter((t) => t.category === cat.key)
        return (
          <section key={cat.key} className="mb-14">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-heading text-2xl text-primary">{cat.title}</h2>
              <Link href={siteHref(`/category/${cat.key}`)} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
                Full category →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {inCat.map((t) => (
                <Link
                  key={t.slug}
                  href={siteHref(`/theories/${t.slug}`)}
                  className="group block border border-primary/30 bg-[#17181c] transition-colors hover:border-primary"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden grayscale group-hover:grayscale-0">
                    <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                  <div className="p-4">
                    <p className="font-heading text-[0.65rem] uppercase tracking-widest text-text/55">
                      {new Date(t.publishedAt).toLocaleDateString()}
                    </p>
                    <h3 className="mt-2 font-body text-base leading-snug text-primary">{t.title}</h3>
                    <p className="mt-2 font-body text-sm text-text/75">{t.dek}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
```

- [ ] **Step 2: Theory detail**

```tsx
// src/sites/thetheoryisreal/pages/theory-detail.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getTheoryBySlug, getCategoryByKey } from "@/sites/thetheoryisreal/data/theories"
import { PullQuote } from "@/sites/thetheoryisreal/components/pull-quote"
import { getSiteHref } from "@/lib/site-href"

export default async function TheoryDetail({ slug }: { slug: string }) {
  const t = getTheoryBySlug(slug)
  if (!t) notFound()
  const cat = getCategoryByKey(t.category)
  const siteHref = await getSiteHref()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-4 font-heading text-xs uppercase tracking-widest text-text/55">
        <Link href={siteHref("/theories")} className="hover:text-primary">Theories</Link>
        <span className="mx-2">/</span>
        {cat && (
          <Link href={siteHref(`/category/${cat.key}`)} className="hover:text-primary">{cat.title}</Link>
        )}
      </nav>

      <article>
        <header className="mb-6">
          {t.breakingBadge && (
            <span className="inline-block rounded-sm bg-accent px-2 py-0.5 font-heading text-[0.65rem] uppercase tracking-widest text-[#0f1012]">
              BREAKING
            </span>
          )}
          <h1 className="mt-3 font-heading text-3xl leading-tight text-primary sm:text-4xl">{t.title}</h1>
          <p className="mt-4 font-body text-lg italic text-text/80">{t.dek}</p>
          <p className="mt-3 font-heading text-[0.7rem] uppercase tracking-widest text-text/55">
            Published {new Date(t.publishedAt).toLocaleDateString()} · Filed under {cat?.title}
          </p>
        </header>

        <div className="relative aspect-[16/9] w-full overflow-hidden border border-primary/40 grayscale contrast-125">
          <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
        </div>

        <div className="mt-8 space-y-5">
          {t.body.map((p, i) => (
            <div key={i}>
              <p className="font-body text-[1.05rem] leading-relaxed text-text/90">{p}</p>
              {t.pullQuotes?.[i === 2 ? 0 : i === Math.max(0, t.body.length - 3) ? 1 : -1] && null}
            </div>
          ))}
          {t.pullQuotes?.map((q, i) => (
            <PullQuote key={`pq-${i}`}>{q}</PullQuote>
          ))}
        </div>

        {t.relatedSlugs && t.relatedSlugs.length > 0 && (
          <footer className="mt-14 border-t border-primary/20 pt-6">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">Related</h2>
            <ul className="mt-3 space-y-2">
              {t.relatedSlugs.map((s) => {
                const r = getTheoryBySlug(s)
                if (!r) return null
                return (
                  <li key={s}>
                    <Link href={siteHref(`/theories/${s}`)} className="font-body text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-accent">
                      {r.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </footer>
        )}
      </article>
    </main>
  )
}
```

- [ ] **Step 3: Category page**

```tsx
// src/sites/thetheoryisreal/pages/category.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getCategoryByKey, getTheoriesByCategory } from "@/sites/thetheoryisreal/data/theories"
import { getSiteHref } from "@/lib/site-href"
import type { CategoryKey } from "@/sites/thetheoryisreal/types"

export default async function CategoryPage({ slug }: { slug: string }) {
  const cat = getCategoryByKey(slug as CategoryKey)
  if (!cat) notFound()
  const items = getTheoriesByCategory(cat.key)
  const siteHref = await getSiteHref()
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="relative mb-10 overflow-hidden border border-primary/40">
        <div className="relative aspect-[21/9] w-full grayscale">
          <Image src={cat.image} alt={cat.title} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/60 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">Category</p>
          <h1 className="mt-2 font-heading text-4xl text-primary">{cat.title}</h1>
          <p className="mt-2 font-body text-base text-text/90">{cat.tagline}</p>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <Link key={t.slug} href={siteHref(`/theories/${t.slug}`)} className="group block border border-primary/30 bg-[#17181c] transition-colors hover:border-primary">
            <div className="relative aspect-[4/3] w-full overflow-hidden grayscale group-hover:grayscale-0">
              <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-4">
              <h3 className="font-body text-lg leading-snug text-primary">{t.title}</h3>
              <p className="mt-2 font-body text-sm text-text/75">{t.dek}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/pages/theories.tsx src/sites/thetheoryisreal/pages/theory-detail.tsx src/sites/thetheoryisreal/pages/category.tsx
git commit -m "feat(thetheoryisreal): theories index, detail, and category pages"
```

---

## Task 20: Evidence page

**Files:**
- Create: `src/sites/thetheoryisreal/pages/evidence.tsx`

- [ ] **Step 1: Write page**

```tsx
// src/sites/thetheoryisreal/pages/evidence.tsx
import type { PageMetadata } from "@/themes"
import { evidenceItems } from "@/sites/thetheoryisreal/data/evidence"
import { EvidenceGallery } from "@/sites/thetheoryisreal/components/evidence-gallery"

export const metadata: PageMetadata = {
  title: "Evidence — The Theory Is Real",
  description: "User-submitted evidence. Filed, tagged, cross-referenced.",
}

export default function Evidence() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">CASE FILES</p>
        <h1 className="mt-2 font-heading text-4xl text-primary">Evidence Gallery</h1>
        <p className="mt-3 font-body text-base text-text/80">
          {evidenceItems.length} submissions on file. Click any item to enlarge.
        </p>
      </header>
      <EvidenceGallery items={evidenceItems} />
    </main>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/pages/evidence.tsx
git commit -m "feat(thetheoryisreal): evidence gallery page"
```

---

## Task 21: Shop + product detail

**Files:**
- Create: `src/sites/thetheoryisreal/pages/shop.tsx`
- Create: `src/sites/thetheoryisreal/pages/product-detail.tsx`

- [ ] **Step 1: Shop page**

Reuse the shared `ProductCard` component. Filter by conspiracy tag via a simple set of link anchors at the top.

```tsx
// src/sites/thetheoryisreal/pages/shop.tsx
import type { PageMetadata } from "@/themes"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/thetheoryisreal/data/products"

export const metadata: PageMetadata = {
  title: "Shop — The Theory Is Real",
  description: "Field-tested gear. Ships in unmarked packaging.",
}

const TAG_LABELS: Record<string, string> = {
  chemtrails: "Atmospheric",
  illuminati: "Global Control",
  reptilian: "Reptilian",
  npc: "NPC Defense",
  "weaponized-tech": "Signal & Tech",
  classics: "Classics",
}

export default function Shop() {
  const grouped = Object.keys(TAG_LABELS).map((tag) => ({
    tag,
    items: products.filter((p) => p.conspiracyTag === tag),
  })).filter((g) => g.items.length > 0)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">OUTFITTER</p>
        <h1 className="mt-2 font-heading text-4xl text-primary">Shop</h1>
        <p className="mt-3 font-body text-base text-text/80">
          {products.length} items. Field-tested. Ships in unmarked packaging.
        </p>
      </header>
      {grouped.map(({ tag, items }) => (
        <section key={tag} className="mb-12">
          <h2 className="mb-4 font-heading text-sm uppercase tracking-[0.3em] text-accent">
            {TAG_LABELS[tag]}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard
                key={p.slug}
                product={{
                  slug: p.slug,
                  name: p.name,
                  priceLabel: p.priceLabel,
                  tagline: p.tagline,
                  image: p.image,
                }}
                hrefPrefix="/products"
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
```

**Check ProductCard API:** before committing, open `src/components/ui/product-card.tsx` and verify the prop shape. If it differs from above (e.g. needs `price` instead of `priceLabel`), adjust — or fall back to a simple inline card. Do not change `ProductCard` itself.

- [ ] **Step 2: Product detail**

```tsx
// src/sites/thetheoryisreal/pages/product-detail.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import { getProductBySlug } from "@/sites/thetheoryisreal/data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export default function ProductDetail({ slug }: { slug: string }) {
  const p = getProductBySlug(slug)
  if (!p) notFound()
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square border border-primary/40 bg-[#17181c] grayscale">
          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 500px" priority />
        </div>
        <div>
          <h1 className="font-heading text-3xl text-primary">{p.name}</h1>
          <p className="mt-2 font-body text-base italic text-text/80">{p.tagline}</p>
          <p className="mt-6 font-heading text-2xl text-secondary">{p.priceLabel}</p>
          <div className="mt-6 space-y-4">
            {p.description.map((para, i) => (
              <p key={i} className="font-body text-[0.95rem] leading-relaxed text-text/85">{para}</p>
            ))}
          </div>
          <div className="mt-8">
            <AddToCartButton slug={p.slug} name={p.name} price={p.price} />
          </div>
          <table className="mt-10 w-full border border-primary/30 bg-[#141519]">
            <tbody>
              {p.nutritionalFacts.map((row, i) => (
                <tr key={i} className="border-b border-primary/20 last:border-0">
                  <th scope="row" className="w-1/2 px-4 py-2 text-left font-heading text-[0.7rem] uppercase tracking-widest text-text/60">
                    {row.label}
                  </th>
                  <td className="px-4 py-2 font-body text-sm text-text/90">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
```

**Check AddToCartButton API:** open `src/components/commerce/add-to-cart-button.tsx` and verify prop shape. Adjust invocation if needed.

- [ ] **Step 3: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/pages/shop.tsx src/sites/thetheoryisreal/pages/product-detail.tsx
git commit -m "feat(thetheoryisreal): shop and product detail pages"
```

---

## Task 22: Library page

**Files:**
- Create: `src/sites/thetheoryisreal/pages/library.tsx`

- [ ] **Step 1: Write page**

```tsx
// src/sites/thetheoryisreal/pages/library.tsx
import type { PageMetadata } from "@/themes"
import { libraryEntries } from "@/sites/thetheoryisreal/data/library"
import { LibraryList } from "@/sites/thetheoryisreal/components/library-list"

export const metadata: PageMetadata = {
  title: "Library — The Theory Is Real",
  description: "Do your own research. The sources are here.",
}

export default function Library() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">REFERENCE ARCHIVE</p>
        <h1 className="mt-2 font-heading text-4xl text-primary">Do Your Own Research</h1>
        <p className="mt-3 font-body text-base text-text/80">
          {libraryEntries.length} primary and secondary sources. We do not vouch for the hosts.
          We do not vouch for the conclusions. We vouch only for the observations.
        </p>
      </header>
      <LibraryList entries={libraryEntries} />
    </main>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/pages/library.tsx
git commit -m "feat(thetheoryisreal): library page"
```

---

## Task 23: Contact, privacy, terms pages

**Files:**
- Create: `src/sites/thetheoryisreal/pages/contact.tsx`
- Create: `src/sites/thetheoryisreal/pages/privacy.tsx`
- Create: `src/sites/thetheoryisreal/pages/terms.tsx`

- [ ] **Step 1: Contact**

```tsx
// src/sites/thetheoryisreal/pages/contact.tsx
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Contact — The Theory Is Real",
  description: "Reach the outlet. If you can.",
}

export default function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">INTAKE</p>
      <h1 className="mt-2 font-heading text-4xl text-primary">Contact</h1>
      <p className="mt-6 font-body text-base text-text/85">
        We do not maintain a phone line. Email is not secure and we do not treat it as such. If you have
        observations to submit, please use one of the channels below, in descending order of confidence.
      </p>
      <dl className="mt-8 space-y-5">
        <div>
          <dt className="font-heading text-xs uppercase tracking-widest text-accent">Paper Mail</dt>
          <dd className="mt-1 font-body text-sm text-text/90">
            P.O. Box 11471 · Flagstaff, AZ 86011-1471 · USA<br />
            Do not use return address.
          </dd>
        </div>
        <div>
          <dt className="font-heading text-xs uppercase tracking-widest text-accent">Encrypted Mail (PGP)</dt>
          <dd className="mt-1 font-body text-sm text-text/90">
            Fingerprint: <code className="font-heading text-primary">0x4714 · FAKE · DO-NOT · USE-ANYWAY · 1138</code>
          </dd>
        </div>
        <div>
          <dt className="font-heading text-xs uppercase tracking-widest text-accent">In Person</dt>
          <dd className="mt-1 font-body text-sm text-text/90">
            We will find you.
          </dd>
        </div>
      </dl>
      <p className="mt-10 font-body text-sm italic text-text/60">
        Response times vary. We read everything. We respond to almost nothing. Please do not take this personally.
      </p>
    </main>
  )
}
```

- [ ] **Step 2: Privacy**

Standard legal-boilerplate voice but keep it in-character where harmless. Single-file, ~6 paragraphs covering: what we collect (nothing we can confirm), how we use it (we do not), cookies (yes, technically), third parties (we trust none), changes to this policy (frequent), contact (see /contact).

- [ ] **Step 3: Terms**

Standard boilerplate. ~6 paragraphs: acceptable use, content disclaimers ("the observations presented here are the observations of the observers"), products-are-satire notice for commerce (VERY IMPORTANT — a deadpan line indicating the products are satirical and not intended for actual protective use), limitation of liability, changes, jurisdiction ("Coconino County").

The satire disclaimer is the one required piece of sincere legal cover. Make it readable but unambiguous.

- [ ] **Step 4: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/pages/contact.tsx src/sites/thetheoryisreal/pages/privacy.tsx src/sites/thetheoryisreal/pages/terms.tsx
git commit -m "feat(thetheoryisreal): contact, privacy, terms pages"
```

---

## Task 24: Cart + checkout page shims

**Files:**
- Create: `src/sites/thetheoryisreal/pages/cart.tsx`
- Create: `src/sites/thetheoryisreal/pages/checkout.tsx`

Reuse the same cart/checkout pattern other commerce-enabled sites use. Check `src/sites/prechewed/pages/cart.tsx` and `checkout.tsx` for the minimal shim — they each render a shared component and pass site-specific config if needed.

- [ ] **Step 1: Cart**

Copy the pattern from prechewed/cart.tsx, retheme copy/headers to this site's voice:
- Heading: "Shopping Cart" → "Intake Manifest"
- "Empty cart" copy: "No items acquired. The gear is in the shop."
- Continue-shopping link text: "← Return to outfitter"

- [ ] **Step 2: Checkout**

Copy from prechewed/checkout.tsx. Retheme:
- Heading: "Checkout" → "Secure Transmission"
- Fine-print: "This is a shipment. We do not process your information for any purpose you would not approve of. You will receive unmarked packaging."

- [ ] **Step 3: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/sites/thetheoryisreal/pages/cart.tsx src/sites/thetheoryisreal/pages/checkout.tsx
git commit -m "feat(thetheoryisreal): cart and checkout page shims"
```

---

## Task 25: Homepage assembly + register all pages + dynamic routes

**Files:**
- Modify: `src/sites/thetheoryisreal/pages/home.tsx` (replace placeholder)
- Create: `src/sites/thetheoryisreal/pages/forum-dynamic.tsx` (branch selector — keeps JSX out of `index.ts`)
- Modify: `src/sites/thetheoryisreal/index.ts` (register all pages + dynamic routes)

- [ ] **Step 1: Rewrite home**

```tsx
// src/sites/thetheoryisreal/pages/home.tsx
import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { getSiteHref } from "@/lib/site-href"
import { theories, categories, getBreakingTheories } from "@/sites/thetheoryisreal/data/theories"
import { getHotThreads } from "@/sites/thetheoryisreal/data/forum"
import { evidenceItems } from "@/sites/thetheoryisreal/data/evidence"
import { products } from "@/sites/thetheoryisreal/data/products"
import { libraryEntries } from "@/sites/thetheoryisreal/data/library"
import { RedAlertBanner } from "@/sites/thetheoryisreal/components/red-alert-banner"
import { BreakingRail } from "@/sites/thetheoryisreal/components/breaking-rail"
import { CategoryTile } from "@/sites/thetheoryisreal/components/category-tile"
import { ForumThreadRow } from "@/sites/thetheoryisreal/components/forum-thread-row"
import { EvidenceTile } from "@/sites/thetheoryisreal/components/evidence-tile"
import { GeoCitiesFooterWink } from "@/sites/thetheoryisreal/components/geocities-footer-wink"

const ALERT_HEADLINES = [
  "CROSS-HATCH RECURRENCE CONFIRMED OVER THREE SEPARATE METROS — SEE LATEST",
  "NPC CENSUS 2026 METHODOLOGY PUBLISHED — OBJECTIONS INVITED",
  "REPTILIAN DENTAL RECORDS LEAK — OBSERVE WITH CAUTION",
  "6G SARCASM-ALLERGY CASES UP 340% SINCE Q1",
  "FURNITURE CARTEL RESPONDS TO NON-ALLEGATIONS — DENIALS IMMINENT",
]

export default async function Home() {
  const siteHref = await getSiteHref()
  const breaking = getBreakingTheories(5)
  const hot = getHotThreads(4)
  const evidencePreview = evidenceItems.slice(0, 4)
  const productPreview = products.slice(0, 3)
  const libraryPreview = libraryEntries.slice(0, 3)

  return (
    <>
      <RedAlertBanner headlines={ALERT_HEADLINES} />

      <Hero
        headline="The truth is not hidden. You are."
        subheadline="Independent reporting on atmospheric, reptilian, simulation, and signal-interference phenomena. 20 active investigations. 25 forum threads. 24 pieces of evidence on file."
        image="/sites/thetheoryisreal/hero.png"
        ctaText="Browse theories"
        ctaHref="/theories"
        secondaryCtaText="Join the forum"
        secondaryCtaHref="/forum"
      />

      <BreakingRail items={breaking} />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-6 font-heading text-sm uppercase tracking-[0.3em] text-accent">Categories</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <CategoryTile key={c.key} category={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">🔥 Hot on the Forum</h2>
          <Link href={siteHref("/forum")} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
            Full forum →
          </Link>
        </div>
        <div className="border border-primary/30 bg-[#141519]">
          {hot.map((t) => (
            <ForumThreadRow key={`${t.board}/${t.slug}`} thread={t} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">Recent Evidence</h2>
          <Link href={siteHref("/evidence")} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
            Full gallery →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {evidencePreview.map((item) => (
            <EvidenceTile key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">From the Outfitter</h2>
          <Link href={siteHref("/shop")} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
            Full shop →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {productPreview.map((p) => (
            <Link key={p.slug} href={siteHref(`/products/${p.slug}`)} className="group block border border-primary/30 bg-[#17181c] p-4 transition-colors hover:border-primary">
              <div className="relative aspect-square w-full overflow-hidden grayscale group-hover:grayscale-0">
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <p className="mt-3 font-body text-base text-primary">{p.name}</p>
              <p className="mt-1 font-heading text-xs uppercase tracking-widest text-secondary">{p.priceLabel}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">From the Library</h2>
          <Link href={siteHref("/library")} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
            Full archive →
          </Link>
        </div>
        <ol className="border border-primary/30 bg-[#141519]">
          {libraryPreview.map((e, i) => (
            <li key={i} className="border-b border-primary/20 px-5 py-3 last:border-b-0">
              <a href={e.url} className="font-body text-base text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-accent">
                {e.title}
              </a>
              <p className="mt-1 font-heading text-[0.7rem] uppercase tracking-wider text-text/55">{e.author} · {e.year}</p>
            </li>
          ))}
        </ol>
      </section>

      <GeoCitiesFooterWink />
    </>
  )
}
```

**Check Hero API:** confirm `src/components/ui/hero.tsx` supports these props. If not, adapt — or render a simple inline hero.

- [ ] **Step 2: Create forum-dynamic.tsx (branch between board and thread views)**

```tsx
// src/sites/thetheoryisreal/pages/forum-dynamic.tsx
import ForumBoard from "./forum-board"
import ForumThread from "./forum-thread"

export default function ForumDynamic({ slug, segments }: { slug: string; segments?: string[] }) {
  if (segments && segments.length === 2) {
    return <ForumThread slug={slug} segments={segments} />
  }
  return <ForumBoard slug={slug} />
}
```

- [ ] **Step 3: Register all pages + dynamic routes in index.ts**

```ts
// src/sites/thetheoryisreal/index.ts
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import Home from "./pages/home"
import Theories, { metadata as theoriesMeta } from "./pages/theories"
import TheoryDetail from "./pages/theory-detail"
import CategoryPage from "./pages/category"
import ForumIndex, { metadata as forumMeta } from "./pages/forum"
import ForumDynamic from "./pages/forum-dynamic"
import Evidence, { metadata as evidenceMeta } from "./pages/evidence"
import Shop, { metadata as shopMeta } from "./pages/shop"
import ProductDetail from "./pages/product-detail"
import Library, { metadata as libraryMeta } from "./pages/library"
import About, { metadata as aboutMeta } from "./pages/about"
import Contact, { metadata as contactMeta } from "./pages/contact"
import Privacy, { metadata as privacyMeta } from "./pages/privacy"
import Terms, { metadata as termsMeta } from "./pages/terms"
import Cart from "./pages/cart"
import Checkout from "./pages/checkout"
import { getTheoryBySlug, getCategoryByKey } from "./data/theories"
import { getProductBySlug } from "./data/products"
import { getBoardByKey } from "./data/forum-users"
import { getThreadBySlug } from "./data/forum"
import type { BoardKey, CategoryKey } from "./types"

export { config }

export const pages: Record<string, PageEntry> = {
  "": Home,
  "theories": { component: Theories, metadata: theoriesMeta },
  "forum": { component: ForumIndex, metadata: forumMeta },
  "evidence": { component: Evidence, metadata: evidenceMeta },
  "shop": { component: Shop, metadata: shopMeta },
  "library": { component: Library, metadata: libraryMeta },
  "about": { component: About, metadata: aboutMeta },
  "contact": { component: Contact, metadata: contactMeta },
  "privacy": { component: Privacy, metadata: privacyMeta },
  "terms": { component: Terms, metadata: termsMeta },
  "cart": Cart,
  "checkout": Checkout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  theories: {
    component: TheoryDetail,
    getMetadata: (slug) => {
      const t = getTheoryBySlug(slug)
      return t ? { title: `${t.title} — The Theory Is Real`, description: t.dek, ogImage: t.image } : undefined
    },
    isValidSlug: (slug) => !!getTheoryBySlug(slug),
    getBreadcrumbLabel: (slug) => getTheoryBySlug(slug)?.title,
    breadcrumbSectionLabel: "Theories",
  },
  category: {
    component: CategoryPage,
    getMetadata: (slug) => {
      const c = getCategoryByKey(slug as CategoryKey)
      return c ? { title: `${c.title} — The Theory Is Real`, description: c.tagline, ogImage: c.image } : undefined
    },
    isValidSlug: (slug) => !!getCategoryByKey(slug as CategoryKey),
    getBreadcrumbLabel: (slug) => getCategoryByKey(slug as CategoryKey)?.title,
    breadcrumbSectionLabel: "Categories",
  },
  products: {
    component: ProductDetail,
    getMetadata: (slug) => {
      const p = getProductBySlug(slug)
      return p ? { title: `${p.name} — The Theory Is Real`, description: p.tagline, ogImage: p.image } : undefined
    },
    isValidSlug: (slug) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Shop",
  },
  forum: {
    component: ForumDynamic,
    maxSegments: 2,
    isValidSlug: (slug, segments) => {
      const board = getBoardByKey(slug)
      if (!board) return false
      if (segments && segments.length === 2) {
        return !!getThreadBySlug(board.key as BoardKey, segments[1])
      }
      return true
    },
    getMetadata: (slug, segments) => {
      const board = getBoardByKey(slug)
      if (!board) return undefined
      if (segments && segments.length === 2) {
        const t = getThreadBySlug(board.key as BoardKey, segments[1])
        return t ? { title: `${t.title} — ${board.title} — The Theory Is Real`, description: t.op.body.slice(0, 160) } : undefined
      }
      return { title: `${board.title} — The Theory Is Real`, description: board.tagline }
    },
    getBreadcrumbLabel: (slug, segments) => {
      if (segments && segments.length === 2) {
        const board = getBoardByKey(slug)
        if (!board) return undefined
        return getThreadBySlug(board.key as BoardKey, segments[1])?.title
      }
      return getBoardByKey(slug)?.title
    },
    breadcrumbSectionLabel: "Forum",
  },
}
```

- [ ] **Step 4: Typecheck + browser check**

```bash
npx tsc --noEmit
npm run lint
npm run dev
```

Visit and verify:
- `http://localhost:3000/?site=thetheoryisreal` — homepage renders with breaking rail, categories, forum hot, evidence, shop teasers, library teaser, GeoCities wink
- `/theories` — index renders
- `/theories/atmospheric-influencer-sprays` — detail renders
- `/category/atmospheric` — category page renders
- `/forum` — forum index
- `/forum/atmospheric-anomalies` — board listing
- `/forum/atmospheric-anomalies/cross-hatch-over-memphis-again` — thread detail
- `/evidence` — gallery with lightbox (click a tile)
- `/shop` — product grid
- `/products/tinfoil-beanie-signature` — product detail
- `/library` — reference list
- `/about` — redacted dossiers (refresh to see codenames stay stable within the day)
- `/contact`, `/privacy`, `/terms` — render
- Broken slug like `/theories/does-not-exist` — 404
- Broken board like `/forum/fake-board` — 404

Some images will 404 until Task 27 generates them — that's expected. Structure should render.

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/sites/thetheoryisreal/
git commit -m "feat(thetheoryisreal): full homepage and register all routes"
```

Step numbering in this task after the edit: 1 (home.tsx), 2 (forum-dynamic.tsx), 3 (index.ts registration), 4 (typecheck + browser), 5 (commit).

---

## Task 26: Sitemap entries + favicon wiring

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `scripts/resize-favicons.mjs` (if the script iterates site list)

- [ ] **Step 1: Sitemap**

Open `src/app/sitemap.ts`. Follow the existing pattern used by other sites (prechewed, chunkymilk) to add:
- Homepage + static routes for `thetheoryisreal`: `/theories`, `/forum`, `/shop`, `/evidence`, `/library`, `/about`, `/contact`, `/privacy`, `/terms`
- Dynamic theory slugs (map over `theories`)
- Dynamic category slugs (map over `categories`)
- Dynamic product slugs (map over `products`)
- Dynamic forum board + thread slugs (map over `threads`)

Import data files with relative paths if the sitemap expects it; otherwise use `@/sites/thetheoryisreal/...`.

- [ ] **Step 2: Favicon**

Create a placeholder favicon by copying one from another site's public folder or generating a minimal PNG; the generation script in Task 27 produces the real one. Ensure `public/sites/thetheoryisreal/favicon.png` exists (can be a 1×1 transparent PNG placeholder). If `scripts/resize-favicons.mjs` takes an explicit site list, add `"thetheoryisreal"`.

- [ ] **Step 3: Typecheck + commit**

```bash
npx tsc --noEmit
git add src/app/sitemap.ts scripts/resize-favicons.mjs public/sites/thetheoryisreal/favicon.png
git commit -m "feat(thetheoryisreal): sitemap entries and favicon placeholder"
```

---

## Task 27: Image generation script + run

**Files:**
- Create: `scripts/generate-thetheoryisreal-images.ts`

Use `scripts/generate-prechewed-images.ts` as the structural model (helpers for `generateImage`, `generateWithPerson`, mkdirSync for subdirs, resumable via `fs.existsSync`).

- [ ] **Step 1: Build script**

```ts
/**
 * Batch image generator for The Theory Is Real.
 * Generates: hero, favicon, 5 category tiles, 20 theory heroes,
 *            24 evidence photos, 16+ product shots.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-thetheoryisreal-images.ts
 *
 * Images saved to public/sites/thetheoryisreal/. Existing files are skipped (resumable).
 */

import OpenAI from "openai"
import fs from "fs"
import path from "path"
import { theories, categories } from "../src/sites/thetheoryisreal/data/theories"
import { products } from "../src/sites/thetheoryisreal/data/products"
import { evidenceItems } from "../src/sites/thetheoryisreal/data/evidence"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/thetheoryisreal")

for (const sub of ["categories", "theories", "evidence", "products"]) {
  fs.mkdirSync(path.join(OUTPUT_DIR, sub), { recursive: true })
}

async function generateImage(
  prompt: string,
  relpath: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
) {
  const filepath = path.join(OUTPUT_DIR, relpath)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${relpath}`)
    return
  }
  console.log(`  🎨 ${relpath}`)
  try {
    const res = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size,
      quality: "medium",
    })
    const data = res.data?.[0]
    if (!data) throw new Error("no data")
    if (data.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(data.b64_json, "base64"))
    } else if (data.url) {
      const r = await fetch(data.url)
      fs.writeFileSync(filepath, Buffer.from(await r.arrayBuffer()))
    }
    console.log(`  ✓ ${relpath}`)
  } catch (e) {
    console.error(`  ✗ ${relpath}: ${e instanceof Error ? e.message : String(e)}`)
  }
}

// ─── Shared style fragment to paste into every prompt ───────────────
const SHARED_STYLE =
  "Photographic. Grainy. Slightly desaturated. Aged, faded film quality. Low contrast. Neutral palette with muted warm tones. Slight vignetting. Looks like it was scanned from a faded print or captured on an aging consumer camera. Subject is off-center, slightly awkward framing. Not stylized; not glossy; not obviously AI."

async function main() {
  console.log("▶ Homepage hero")
  await generateImage(
    `${SHARED_STYLE} A grainy, nighttime overhead photograph of a suburban cul-de-sac. Faint orange streetlight glow. A single unfamiliar light in the distance. The image should feel unremarkable but subtly wrong.`,
    "hero.png",
    "1536x1024",
  )

  console.log("▶ Favicon")
  await generateImage(
    `A stark, minimal graphic: a hand-drawn circled eye over a dark square background. High contrast, poster style. Centered, symmetrical.`,
    "favicon.png",
  )

  console.log("▶ Category tiles (5)")
  for (const c of categories) {
    const prompts: Record<string, string> = {
      atmospheric: `${SHARED_STYLE} Grainy photograph of a pale sky with unnatural cross-hatch contrail patterns above a residential rooftop. Afternoon light.`,
      "global-control": `${SHARED_STYLE} Grainy photograph of a fluorescent-lit corporate boardroom with empty leather chairs, one slightly askew. View through a door that is ajar.`,
      reptilian: `${SHARED_STYLE} Grainy photograph of a green-tinged aquarium at a restaurant, out-of-focus diners in the background, one subject's eye catching light at an unnatural angle.`,
      "digital-reality": `${SHARED_STYLE} Grainy photograph of a crowded commuter bus from the driver's-seat perspective — dozens of passengers all looking at phones, identical posture, neutral expressions, slight digital compression artifacts on faces.`,
      "weaponized-tech": `${SHARED_STYLE} Grainy photograph of the side of an electrical substation at dusk, chain-link fence, humming transformers, one indicator light glowing red.`,
    }
    await generateImage(prompts[c.key], `categories/${c.key}.png`, "1536x1024")
  }

  console.log(`▶ Theory heroes (${theories.length})`)
  for (const t of theories) {
    const prompt = `${SHARED_STYLE} Illustration for a conspiracy article titled "${t.title}". Dek: "${t.dek}". Subject should be mundane, specific, and visually plausible. Avoid any on-screen text, logos, or watermarks. Avoid sci-fi styling. The image should look like it was shot by an observer who happened to be there.`
    await generateImage(prompt, `theories/${t.slug}.png`, "1536x1024")
  }

  console.log(`▶ Evidence photos (${evidenceItems.length})`)
  for (const e of evidenceItems) {
    const prompt = `${SHARED_STYLE} Deliberately mundane "evidence" photograph, amateur framing. Caption for reference: "${e.caption}". Subject should be clearly visible in the frame. No annotations or overlays — those are added in post.`
    await generateImage(prompt, `evidence/${e.id}.png`, "1024x1024")
  }

  console.log(`▶ Products (${products.length})`)
  for (const p of products) {
    const prompt = `${SHARED_STYLE.replace("Grainy", "Clean")} Earnest product catalog photograph of "${p.name}". Plain neutral background, centered, studio lighting. Tagline for reference: "${p.tagline}". Do not include price, logos, or on-image text.`
    await generateImage(prompt, `products/${p.slug}.png`, "1024x1024")
  }

  console.log("✓ done")
}

main()
```

- [ ] **Step 2: Run script**

```bash
OPENAI_API_KEY=<your-key> npx tsx scripts/generate-thetheoryisreal-images.ts
```

Let it complete. Failed items can be re-run (skipped if exists).

- [ ] **Step 3: Spot-check** at `localhost:3000/?site=thetheoryisreal` that images now render.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-thetheoryisreal-images.ts public/sites/thetheoryisreal/
git commit -m "feat(thetheoryisreal): image generation script and generated assets"
```

---

## Task 28: Polish pass

**Files:**
- May modify: any site file based on findings

- [ ] **Step 1: Responsive check**

Open dev server and test at Tailwind's default breakpoints by resizing browser:
- Mobile (< 640px): stacked layouts, readable, no horizontal scroll
- Tablet (640-1024px): 2-col grids where appropriate
- Desktop (> 1024px): full multi-column layouts

Fix any layout breaks.

- [ ] **Step 2: Alert banner rotation**

Confirm `RedAlertBanner` actually cycles on the homepage — the `setInterval` should swap headlines every ~6.5 seconds. If it doesn't, check that the component is rendered as a Client Component (has `"use client"` at top).

- [ ] **Step 3: Forum reaction check**

Reactions are decorative only. Confirm they render with count on the thread detail page.

- [ ] **Step 4: Codename rotation**

On the `/about` page, note the codenames displayed. The seed is daily (`Math.floor(Date.now() / (24*60*60*1000))`), so codenames should remain stable on refresh within the same UTC day. Only both the adjective AND surname rotate from the pools in `leadership.ts`.

- [ ] **Step 5: Lint + typecheck**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both PASS. If lint flags React unescaped entities in quoted strings, use `&quot;` or wrap in `{'"..."'}`.

- [ ] **Step 6: Build**

```bash
npm run build
```

Expected: successful build.

- [ ] **Step 7: Commit any fixes**

```bash
git add -u
git commit -m "fix(thetheoryisreal): polish pass — responsive, lint, build"
```

---

## Task 29: Final verification

- [ ] **Step 1: Run through the success criteria from the spec**

- `/?site=thetheoryisreal` homepage renders ✓
- All primary routes render without 404/500 ✓
- Invalid dynamic-route slugs return 404 (not fallback-home) ✓
- Mega menu shows all 5 top-level items with dropdowns ✓
- Commerce flow: add-to-cart → cart → checkout → confirmation ✓
- Forum thread detail renders OP + replies with consistent avatar/username mapping ✓
- Evidence gallery lightbox opens and closes cleanly (click tile; ESC closes) ✓
- Leadership codenames randomize across both adjective AND surname ✓
- `npm run lint` clean, `npx tsc --noEmit` clean ✓
- Site feels "paranoid bulletin-board" not "X-Files cosplay" (subjective judgment) ✓

- [ ] **Step 2: Manual test of commerce flow**

Add 2 products to cart, visit `/cart`, change quantity, visit `/checkout`, verify totals.

- [ ] **Step 3: Final commit if anything was tweaked**

```bash
git add -u
git commit -m "chore(thetheoryisreal): final verification pass"
```

Site is live-ready. Push to main when satisfied.

---

## Self-Review Notes

**Spec coverage check:**
- Routes: all 16 paths from the spec → Tasks 17-24 and registered in Task 25 ✓
- Dynamic routes: theories, category, products, forum (2-segment) → Task 25 ✓
- Data models: all 7 types in types.ts (Task 3), data files in Tasks 5-11 ✓
- Components: all 14 site-specific components in Tasks 12-16 ✓
- Visual theme: palette + fonts in Task 2 config, motifs in components ✓
- Content inventory: 20 theories + 25 threads + 16+ products + 24 evidence + 25 library + 4 dossiers ✓
- Homepage layout (10 sections from spec) → Task 25 home.tsx ✓
- Image generation (60 images) → Task 27 ✓
- Non-negotiable conventions (VALID_SUBDOMAINS, privacy/terms/contact, leadership, codename randomization) → Tasks 1, 5, 17, 23 ✓

**Known implementation-time decisions deferred to the executor:**
- Whether to extract `ForumDynamic` into its own file or inline in `index.ts` (Task 25 Step 3) — both work
- Exact `ProductCard` and `Hero` prop shapes (Task 21, Task 25) — verified at implementation time against the actual components
