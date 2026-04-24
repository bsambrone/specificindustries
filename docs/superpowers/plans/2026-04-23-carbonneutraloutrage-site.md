# Campaign for Sustainable Overreactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `carbonneutraloutrage` subdomain — a satirical advocacy nonprofit site for the Campaign for Sustainable Overreactions, with 8 program detail pages, a parody donate flow, leadership, and standard portfolio pages.

**Architecture:** New site under `src/sites/carbonneutraloutrage/` following the established subdomain-site pattern: `config.ts`, `index.ts` barrel, `data/` files, `pages/` components. One dynamic route (`/programs/[slug]`). All pages reuse shared components from `src/components/ui/`. No new App Router routes; everything resolves through the existing catch-all.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, shared `next/font` declarations. Images generated via the `scripts/generate-*-images.ts` pattern using OpenAI's `gpt-image-1` model.

**Spec:** `docs/superpowers/specs/2026-04-23-carbonneutraloutrage-site-design.md`

**Verification approach:** This codebase has no unit test suite for site pages. Each task verifies via `npx tsc --noEmit` (type safety), `npm run lint`, and (where the site is reachable) `npm run dev` smoke checks at `localhost:3000/<path>?site=carbonneutraloutrage`.

---

## Task 1: Site Scaffolding (config + barrel + registry + subdomains)

Create the empty site shell so the subdomain resolves to a stub homepage. No content yet — just the routing wired up end-to-end.

**Files:**
- Create: `src/sites/carbonneutraloutrage/config.ts`
- Create: `src/sites/carbonneutraloutrage/index.ts`
- Create: `src/sites/carbonneutraloutrage/pages/home.tsx`
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create the site config**

Create `src/sites/carbonneutraloutrage/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Campaign for Sustainable Overreactions",
  subdomain: "carbonneutraloutrage",
  theme: {
    preset: "ngo",
    colors: {
      primary: "#1f4d3a",     // deep evergreen
      secondary: "#c96a47",   // terracotta
      accent: "#87a287",      // sage
      background: "#f6f1e7",  // recycled-paper cream
      text: "#2a2724",        // warm charcoal
    },
    fonts: {
      heading: "fraunces",
      body: "work-sans",
    },
  },
  metadata: {
    title: "Campaign for Sustainable Overreactions — Responsible Outrage for a Warming Planet",
    description: "If you must overreact, do it responsibly. The Campaign for Sustainable Overreactions advocates for carbon-neutral outrage, reusable pitchforks, and certified responsible overreactor practices.",
    ogImage: "/sites/carbonneutraloutrage/hero.png",
  },
  nav: [
    { label: "Programs", path: "/programs" },
    { label: "Impact", path: "/impact" },
    { label: "Take Action", path: "/take-action" },
    { label: "Leadership", path: "/leadership" },
    { label: "About", path: "/about" },
    { label: "Donate", path: "/donate" },
  ],
  features: {
    commerce: false,
  },
  verticalKey: "hygiene-wellness",
  tagline: "If you must overreact, do it responsibly.",
}
```

- [ ] **Step 2: Create a stub homepage**

Create `src/sites/carbonneutraloutrage/pages/home.tsx`:

```typescript
export default function CarbonNeutralOutrageHome() {
  return (
    <main className="py-24 px-4 text-center">
      <h1 className="text-4xl font-heading font-bold text-primary">
        Campaign for Sustainable Overreactions
      </h1>
      <p className="mt-4 text-foreground/70">If you must overreact, do it responsibly.</p>
    </main>
  )
}
```

- [ ] **Step 3: Create the barrel**

Create `src/sites/carbonneutraloutrage/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CarbonNeutralOutrageHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarbonNeutralOutrageHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
```

- [ ] **Step 4: Register the site**

In `src/sites/registry.ts`, add the import alongside the others (alphabetically near `chunkymilk` is fine — order is not enforced):

```typescript
import { config as carbonneutraloutrageConfig, pages as carbonneutraloutragePages, dynamicRoutes as carbonneutraloutrageDynamicRoutes } from "./carbonneutraloutrage"
```

And add the entry to `siteRegistry`:

```typescript
  carbonneutraloutrage: { config: carbonneutraloutrageConfig, pages: carbonneutraloutragePages, dynamicRoutes: carbonneutraloutrageDynamicRoutes },
```

- [ ] **Step 5: Add to the subdomain allowlist**

In `src/sites/subdomains.ts`, add `"carbonneutraloutrage"` to the `VALID_SUBDOMAINS` array.

- [ ] **Step 6: Verify**

Run:
```bash
npx tsc --noEmit
npm run lint
```

Expected: both pass with no errors related to the new site.

- [ ] **Step 7: Smoke test**

Run `npm run dev` in another terminal, visit `http://localhost:3000/?site=carbonneutraloutrage`, confirm the stub homepage renders with the cream background, evergreen heading, and Fraunces font. Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add src/sites/carbonneutraloutrage/ src/sites/registry.ts src/sites/subdomains.ts
git commit -m "feat(carbonneutraloutrage): scaffold subdomain shell"
```

---

## Task 2: Programs Data File

Define the 8 programs with full content. All program detail pages read from this file.

**Files:**
- Create: `src/sites/carbonneutraloutrage/data/programs.ts`

- [ ] **Step 1: Write the file**

Create `src/sites/carbonneutraloutrage/data/programs.ts`:

```typescript
export interface ProgramStat {
  label: string
  value: string
}

export interface ProgramStep {
  number: number
  heading: string
  body: string
}

export interface Program {
  slug: string
  name: string
  displayName: string  // with ™/® where applicable
  tagline: string
  oneLiner: string     // for the /programs index card
  heroImage: string
  problem: string      // 1 short paragraph of fake crisis framing
  howItWorks: ProgramStep[]  // exactly 3
  stats: ProgramStat[]       // exactly 3
}

export const programs: Program[] = [
  {
    slug: "outrage-kits",
    name: "Carbon-Neutral Outrage Kits",
    displayName: "Carbon-Neutral Outrage Kits",
    tagline: "Pre-assembled freakout supplies sourced from FSC-certified suppliers.",
    oneLiner: "Everything you need for a sustainable meltdown, in one biodegradable box.",
    heroImage: "/sites/carbonneutraloutrage/programs/outrage-kits.png",
    problem:
      "The average household freakout requires 12 disposable items — single-use grievance pamphlets, foam fingers, plastic-handled signs, and at least one pre-packaged hot take. The carbon footprint of a single suburban tantrum exceeds that of a transatlantic flight by a margin we are not yet legally permitted to disclose.",
    howItWorks: [
      { number: 1, heading: "We source", body: "Every component — from the cardboard pitchfork backing to the soy-ink slogan stencils — comes from FSC-certified, fair-trade, climate-positive suppliers. We audit our suppliers quarterly. They audit us back, which is unusual." },
      { number: 2, heading: "We assemble", body: "Kits are packed by hand at our regional fulfillment cooperative in central Oregon. Workers are paid a living rage and receive comprehensive emotional benefits." },
      { number: 3, heading: "We offset", body: "Every kit ships with a Verified Outrage Offset™ certificate covering the projected emissions of its entire useful lifecycle, including the after-meltdown recycling phase." },
    ],
    stats: [
      { label: "Kits distributed since 2017", value: "2.3M" },
      { label: "Average lifecycle CO₂e per kit", value: "0.4 kg" },
      { label: "Suppliers we have stopped working with", value: "11" },
    ],
  },
  {
    slug: "reusable-pitchforks",
    name: "The Reusable Pitchfork Initiative",
    displayName: "The Reusable Pitchfork Initiative",
    tagline: "Bamboo-handled, modular-tine pitchforks rated for 10,000 uprisings.",
    oneLiner: "End single-use pitchfork waste. Sharpen, return, re-issue.",
    heroImage: "/sites/carbonneutraloutrage/programs/reusable-pitchforks.png",
    problem:
      "Approximately 47 million single-use pitchforks are manufactured each year in the United States alone. The vast majority — 89%, by our count — are used exactly once before being discarded, often within sight of the very civic institution they were meant to oppose. This is not sustainable. This is not even responsible.",
    howItWorks: [
      { number: 1, heading: "Check out a pitchfork", body: "Visit any of our 340 pitchfork libraries (often co-located with public libraries) and check out a fork using your CSO membership card. We trust you to return it." },
      { number: 2, heading: "Use it responsibly", body: "Bamboo handles tolerate up to 10,000 uprisings before micro-fracture. Tines are modular — replace individually if dulled. Do not paint over the program logo." },
      { number: 3, heading: "Return for sharpening", body: "Drop the fork in any participating receptacle within 14 days. Our regional sharpening cooperatives recondition tines, restore handle integrity, and re-issue the fork to the next user." },
    ],
    stats: [
      { label: "Pitchforks in circulation", value: "1.2M" },
      { label: "Avg uprisings per pitchfork", value: "847" },
      { label: "Single-use pitchforks averted (cumulative)", value: "9.6M" },
    ],
  },
  {
    slug: "outrage-of-the-month",
    name: "Outrage of the Month Club",
    displayName: "Outrage of the Month Club",
    tagline: "Curated monthly cause delivered to your inbox. Never overreact to the wrong thing again.",
    oneLiner: "One sanctioned outrage per month. Issued by methodology, not by algorithm.",
    heroImage: "/sites/carbonneutraloutrage/programs/outrage-of-the-month.png",
    problem:
      "The modern outrage economy generates an estimated 4,300 candidate grievances per adult per day. Sorting through them — let alone selecting the appropriate ones to engage with — produces a measurable cognitive carbon load. Most overreactions are wasted on issues that, on calm review, did not warrant the energy expenditure.",
    howItWorks: [
      { number: 1, heading: "Subscribe", body: "Join the club for a sliding-scale annual membership. Members receive one (1) curated outrage per calendar month, hand-selected by our editorial council." },
      { number: 2, heading: "Engage proportionally", body: "Each issue includes a Proportional Response Guide indicating recommended decibel range, social media cadence, and whether a reusable pitchfork checkout is appropriate." },
      { number: 3, heading: "Compost the residue", body: "Once the month closes, we issue a Cease & Compost notice: please decommission your engagement with the prior month's outrage and direct it to your nearest Hot Takes Composting bin." },
    ],
    stats: [
      { label: "Active subscribers", value: "84,000" },
      { label: "Issues delivered since 2018", value: "97" },
      { label: "Avg subscriber attention reduction", value: "61%" },
    ],
  },
  {
    slug: "outrage-offsets",
    name: "Verified Outrage Offsets™",
    displayName: "Verified Outrage Offsets™",
    tagline: "Cap-and-trade for tantrums. Buy credits to neutralize a particularly wasteful freakout.",
    oneLiner: "Offset the unavoidable meltdowns. Standards-aligned. Audited.",
    heroImage: "/sites/carbonneutraloutrage/programs/outrage-offsets.png",
    problem:
      "Some overreactions cannot be prevented. A wedding speech goes wrong. A neighbor parks across two spots. A senior leadership team retreat is held outdoors. The emissions are real. The remorse, while sincere, is not a substitute for offsets.",
    howItWorks: [
      { number: 1, heading: "Calculate", body: "Use our Tantrum Footprint Calculator (or a third-party-certified equivalent) to estimate the CO₂e of the incident in question. Round up." },
      { number: 2, heading: "Purchase credits", body: "Each Verified Outrage Offset™ neutralizes 1 kg CO₂e and corresponds to a real-world reduction project — primarily reforestation and methane-capture programs operated by partner organizations." },
      { number: 3, heading: "Receive your certificate", body: "A blockchain-anchored (we are working on this) certificate is issued in your name, suitable for framing, regifting, or quietly producing during family conversations." },
    ],
    stats: [
      { label: "Credits issued (cumulative)", value: "47,000 t CO₂e" },
      { label: "Partner reduction projects", value: "23" },
      { label: "Avg credit price", value: "$18.40 / kg" },
    ],
  },
  {
    slug: "tantrum-footprint",
    name: "Tantrum Footprint Calculator",
    displayName: "Tantrum Footprint Calculator",
    tagline: "Estimate the CO₂e of your last meltdown. Decibels. Duration. Slammed-door count.",
    oneLiner: "Free, peer-reviewed, slightly judgmental.",
    heroImage: "/sites/carbonneutraloutrage/programs/tantrum-footprint.png",
    problem:
      "You cannot manage what you do not measure. The Campaign's research team has spent six years developing a peer-reviewed methodology to convert qualitative meltdown attributes (volume, duration, profanity volume, door-slam count) into a single, comparable carbon-equivalent number.",
    howItWorks: [
      { number: 1, heading: "Recall the incident", body: "Think back to the most recent overreaction you remember clearly. Honesty improves accuracy; the calculator does not transmit your inputs to a server." },
      { number: 2, heading: "Enter the four metrics", body: "Decibels (peak), duration in minutes, slammed door count, and profanity count. Default values are based on the suburban-quartile mean if you are unsure." },
      { number: 3, heading: "Receive your footprint", body: "The calculator returns a kg CO₂e estimate, a driving-distance equivalent, and (if applicable) a recommended Verified Outrage Offsets™ purchase." },
    ],
    stats: [
      { label: "Calculations performed", value: "1.8M" },
      { label: "Avg footprint per session", value: "2.7 kg CO₂e" },
      { label: "Methodology version", value: "v4.2 (Mar 2026)" },
    ],
  },
  {
    slug: "reforestation-through-rage",
    name: "Reforestation Through Rage™",
    displayName: "Reforestation Through Rage™",
    tagline: "Every 100 tweets plants a tree. Every quote-tweet plants a sapling.",
    oneLiner: "Convert your timeline into a forest.",
    heroImage: "/sites/carbonneutraloutrage/programs/reforestation-through-rage.png",
    problem:
      "Online discourse generates an enormous volume of effort and very little physical output. The Reforestation Through Rage™ program addresses this asymmetry: by metering social-media engagement and translating it into tree-planting commitments, we create a tangible deliverable from previously deliverable-free behavior.",
    howItWorks: [
      { number: 1, heading: "Connect your accounts", body: "Authorize the program to read post counts (not content) from your major social platforms. We do not see what you posted; we count that you posted." },
      { number: 2, heading: "Engage as you normally would", body: "Tweets, replies, quote-tweets, long-form posts — all metered. Your engagement is converted into tree credits at the published rate (currently 100 tweets : 1 tree)." },
      { number: 3, heading: "Watch your forest grow", body: "Once monthly, the program commissions tree plantings via partner reforestation organizations. You receive a personalized forest map showing where your trees stand." },
    ],
    stats: [
      { label: "Trees planted (cumulative)", value: "318,000" },
      { label: "Active enrolled accounts", value: "42,000" },
      { label: "Trees per active user, avg", value: "7.6" },
    ],
  },
  {
    slug: "composted-hot-takes",
    name: "Composted Hot Takes",
    displayName: "Composted Hot Takes",
    tagline: "Drop expired opinions into our municipal bins. We mulch them into community gardens.",
    oneLiner: "Your old takes belong in the soil, not in your search history.",
    heroImage: "/sites/carbonneutraloutrage/programs/composted-hot-takes.png",
    problem:
      "Hot takes have a shelf life. Most expire within 72 hours of issuance. Failure to properly decommission an expired take leads to ideological off-gassing, conversational leaching, and — in 14% of cases — full-fork relapse. The proper disposal of opinions is a civic responsibility.",
    howItWorks: [
      { number: 1, heading: "Identify expired takes", body: "Use our quarterly Take Inventory worksheet to catalog opinions that have exceeded their useful lifespan. Be honest. Most takes expire faster than people realize." },
      { number: 2, heading: "Drop at a participating bin", body: "Composting bins are located at every CSO Pitchfork Library and at 1,200 partner locations nationwide. Bins accept written, recorded, or screenshot formats." },
      { number: 3, heading: "Receive your mulch credit", body: "Each composted take is logged and weighted by category. Members earn mulch credits redeemable at partner community gardens — so your old hot takes become tomatoes." },
    ],
    stats: [
      { label: "Takes composted (cumulative)", value: "8.4M" },
      { label: "Community gardens supplied", value: "1,140" },
      { label: "Tomatoes attributable to composted takes", value: "An estimated 2.1M" },
    ],
  },
  {
    slug: "certified-overreactor",
    name: "Certified Responsible Overreactor™",
    displayName: "Certified Responsible Overreactor™",
    tagline: "An 8-week credentialing program with a fake exam, fake CEUs, and a digital lapel pin.",
    oneLiner: "Become a certified practitioner. Add it to your LinkedIn.",
    heroImage: "/sites/carbonneutraloutrage/programs/certified-overreactor.png",
    problem:
      "Anyone can call themselves an outrage practitioner. Few have the credentials to back it up. The Certified Responsible Overreactor™ program establishes a defensible, peer-recognized standard for sustainable overreaction practice — a credential that signals to employers, peers, and online adversaries that you have done the work.",
    howItWorks: [
      { number: 1, heading: "Enroll", body: "Eight weekly modules covering proportional response, decibel hygiene, the Tantrum Footprint methodology, and case studies in historic overreactions (sustainable and otherwise)." },
      { number: 2, heading: "Complete the exam", body: "A 60-question multiple-choice assessment. Open-book. Open-everything. Most candidates pass on the first attempt. The 12% who do not are encouraged to enroll in a remedial composting workshop." },
      { number: 3, heading: "Receive your credential", body: "A digital lapel pin, a wallet card, a LinkedIn-ready credential badge, and 8 fake Continuing Education Units that no professional body has agreed to honor." },
    ],
    stats: [
      { label: "Practitioners credentialed", value: "12,000" },
      { label: "Pass rate (first attempt)", value: "88%" },
      { label: "Avg time to credential", value: "9 weeks" },
    ],
  },
]

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug)
}
```

- [ ] **Step 2: Verify**

Run:
```bash
npx tsc --noEmit
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/sites/carbonneutraloutrage/data/programs.ts
git commit -m "feat(carbonneutraloutrage): add programs data"
```

---

## Task 3: Leadership Data File

Four canonical execs with randomized names, NGO titles, and angry-portrait paths.

**Files:**
- Create: `src/sites/carbonneutraloutrage/data/leadership.ts`

- [ ] **Step 1: Write the file**

Create `src/sites/carbonneutraloutrage/data/leadership.ts`:

```typescript
export interface Leader {
  slug: string
  name: string
  title: string
  bio: string
  highlights: { label: string; value: string }[]
  quote: string
  portraitImage: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const leaders: Leader[] = [
  {
    slug: "hollis-penderwick",
    name: "Hollis Penderwick",
    title: "Founder & Executive Director",
    bio: "Hollis founded the Campaign in 2017 after witnessing a single zoning-meeting outburst burn enough kinetic energy to power a coastal town for 14 minutes. A former climate-communications strategist with a decade at three major NGOs, Hollis has built the Campaign from a 4-person research collective into the leading voice in the responsible-overreaction movement. Hollis holds an MA in Environmental Communication from a school you have not heard of.",
    highlights: [
      { label: "Years in advocacy", value: "21" },
      { label: "Prior employers", value: "Three major NGOs (under NDA)" },
      { label: "Speaking engagements 2025", value: "47" },
      { label: "Personal CO₂e/year", value: "0.8 t (verified)" },
      { label: "Outbursts logged this year", value: "0 (under audit)" },
    ],
    quote: "Outrage is not the problem. Wasteful outrage is the problem. We are not the silence movement. We are the efficiency movement.",
    portraitImage: "/sites/carbonneutraloutrage/leaders/hollis-penderwick.png",
    person: "bill",
  },
  {
    slug: "ansel-drayton",
    name: "Ansel Drayton",
    title: "Director of Research",
    bio: "Ansel oversees the Campaign's methodology team and is the principal author of the annual State of Responsible Outrage report, now in its sixth edition. He developed the Tantrum Footprint methodology (v1 in 2019, currently in v4.2) and serves on the editorial board of the Journal of Civic Emissions. Prior to joining the Campaign, Ansel held research positions at two carbon-accounting firms.",
    highlights: [
      { label: "Methodology version", value: "v4.2" },
      { label: "Peer-reviewed papers", value: "14" },
      { label: "State of Responsible Outrage editions authored", value: "6" },
      { label: "Editorial board memberships", value: "2" },
      { label: "Hours spent on the methodology, lifetime", value: "Untracked, vast" },
    ],
    quote: "If you cannot measure your outrage, you cannot offset it. If you cannot offset it, you should not have it.",
    portraitImage: "/sites/carbonneutraloutrage/leaders/ansel-drayton.png",
    person: "brandon",
  },
  {
    slug: "emmett-landry",
    name: "Emmett Landry",
    title: "Chief Impact Officer",
    bio: "Emmett architected the Verified Outrage Offsets™ registry and is responsible for the Campaign's measurement, reporting, and verification (MRV) infrastructure. He brings 15 years of experience from the carbon-accounting sector, where he developed similar registries for forestry and methane-capture credits. Emmett channels his considerable personal intensity into actuarial rigor; colleagues describe him as 'unflinching.'",
    highlights: [
      { label: "Years in carbon accounting", value: "15" },
      { label: "Registries architected", value: "4" },
      { label: "Credits issued under his oversight", value: "47,000 t CO₂e" },
      { label: "MRV protocols authored", value: "9" },
      { label: "Personal Tantrum Footprint, last quarter", value: "Withheld pending review" },
    ],
    quote: "The registry is not a metaphor. The credits are not symbolic. We are doing the only honest accounting in the entire outrage sector.",
    portraitImage: "/sites/carbonneutraloutrage/leaders/emmett-landry.png",
    person: "jim",
  },
  {
    slug: "rory-kellner",
    name: "Rory Kellner",
    title: "Director of Donor Relations",
    bio: "Rory runs the Campaign's Patron Council, the Legacy Offset planned-giving program, and the regional chapter directors' annual convening. A 12-year veteran of nonprofit development, Rory has personally cultivated more than 200 major-donor relationships across the Campaign's history. He maintains his composure through the daily practice of tai chi, usually.",
    highlights: [
      { label: "Years in development", value: "12" },
      { label: "Major donors cultivated", value: "200+" },
      { label: "Legacy gifts secured", value: "$14.2M (lifetime)" },
      { label: "Chapter directors managed", value: "63" },
      { label: "Tai chi sessions, this month", value: "21 (target: 30)" },
    ],
    quote: "Donor relationships are the longest projects we run. Every conversation is a 30-year arc. Patience is the only sustainable strategy.",
    portraitImage: "/sites/carbonneutraloutrage/leaders/rory-kellner.png",
    person: "sean",
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}
```

- [ ] **Step 2: Verify**

Run `npx tsc --noEmit`. Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/sites/carbonneutraloutrage/data/leadership.ts
git commit -m "feat(carbonneutraloutrage): add leadership data"
```

---

## Task 4: Testimonial Quotes Data File

64 unique program-specific quotes from the 8-person shared cast.

**Files:**
- Create: `src/sites/carbonneutraloutrage/data/testimonials.ts`

- [ ] **Step 1: Write the file**

Create `src/sites/carbonneutraloutrage/data/testimonials.ts`. The structure is a nested map keyed by `[programSlug][portraitSlug]` returning a quote string. Each quote is 1–2 sentences, program-specific, in voice for the testifier.

```typescript
import { getPortrait, type TestimonialPortrait } from "@/data/testimonial-portraits"

// The 8-person cast for every program detail page
export const TESTIMONIAL_CAST_SLUGS = [
  "caldwell-briggs",
  "dr-moira-petrescu",
  "linda-morrissey",
  "rev-thomasina-oakes",
  "eleanor-whittaker",
  "priscilla-voss-bingham",
  "nina-cabrera",
  "tony-mazetti",
] as const

export type TestimonialPortraitSlug = (typeof TESTIMONIAL_CAST_SLUGS)[number]

// Map: program slug -> portrait slug -> quote
export const programTestimonials: Record<string, Record<TestimonialPortraitSlug, string>> = {
  "outrage-kits": {
    "caldwell-briggs": "Used to keep four single-use freakout kits in the truck. Now I carry one CSO kit and a reusable pitchfork. The job site is calmer, and I feel calmer about being calmer.",
    "dr-moira-petrescu": "I've vetted three of these kits in my own consulting practice. The supply chain is real. The offsets are real. The bamboo handle is — frankly — better engineered than my surgical instruments.",
    "linda-morrissey": "I bring a kit to every PTA meeting. Other parents have started asking where I got mine. The recycled cardboard slogan inserts are the highlight of the entire night.",
    "rev-thomasina-oakes": "I keep a kit in the vestry. Officiating weddings has shown me that not every overreaction can be prevented, but every overreaction can be sustainably outfitted.",
    "eleanor-whittaker": "We provision our entire engineering org with CSO kits. Per-incident emissions dropped 71% in the first quarter. The cardboard pitchforks are surprisingly durable.",
    "priscilla-voss-bingham": "I have included a standing order for outrage kits in three estate plans this year. The Campaign accepts deferred fulfillment. This is unusual and admirable.",
    "nina-cabrera": "The kit packaging is genuinely beautiful. We featured it in a moodboard for a client. They placed an order for forty.",
    "tony-mazetti": "The kit comes with everything. Soy-ink stencils. Reusable foam fingers. A composting bag for after. I keep one in the glove box.",
  },
  "reusable-pitchforks": {
    "caldwell-briggs": "I haven't bought a single-use pitchfork since 2022. The library system works. The sharpening cooperative works. I do not understand why everyone is not doing this.",
    "dr-moira-petrescu": "The bamboo handle is medical-grade. I have inspected one. The micro-fracture rating is honest.",
    "linda-morrissey": "I check out a fork every spring before the budget meeting. I return it the next morning. The librarian and I have an understanding.",
    "rev-thomasina-oakes": "I have not personally used a pitchfork at a wedding, but I appreciate that the option exists, sustainably.",
    "eleanor-whittaker": "Our division sponsors a pitchfork library at the regional office. Adoption is high. Returns are punctual. Tine replacement is cheap.",
    "priscilla-voss-bingham": "My late husband's pitchfork is on its 1,200th uprising. The Campaign has indicated it may donate it to their archive when its useful life concludes. We are honored.",
    "nina-cabrera": "Aesthetically, the bamboo handle is a major step forward for the protest aesthetic. Very Patagonia-coded. Very intentional.",
    "tony-mazetti": "I have one I keep in the truck and one at the cabin. The library lets you keep two on long-term loan if you commit to community sharpening hours. I commit.",
  },
  "outrage-of-the-month": {
    "caldwell-briggs": "Used to get worked up about whatever the radio was playing. Now I wait for the monthly bulletin. The radio plays the same things. I feel different.",
    "dr-moira-petrescu": "The Proportional Response Guide is excellent. I have stopped wasting decibels on parking-lot incidents. The savings are measurable.",
    "linda-morrissey": "I was a daily-outrage person. The club has me down to one outrage every 30 days. My family says I am 'easier to be around now.' I think they mean it.",
    "rev-thomasina-oakes": "I weave the monthly outrage into my homilies, where appropriate. Attendance has gone up. I cannot prove these are connected.",
    "eleanor-whittaker": "Our team subscribes as a group benefit. We discuss the monthly outrage at our Friday all-hands. Engagement has never been higher.",
    "priscilla-voss-bingham": "I subscribe at the lifetime tier. My grandchildren will inherit the subscription. They have not asked for it. They will receive it.",
    "nina-cabrera": "The cover treatments are exquisite. April's was on suburban lawn-watering restrictions and the typography alone made me want to engage with it.",
    "tony-mazetti": "I get the email. I read the email. I do what the email says, proportionally. I do not read the news anymore. This is fine.",
  },
  "outrage-offsets": {
    "caldwell-briggs": "I bought 40 kg of credits after the foreman's-meeting incident. The certificate is on the breakroom wall. The team has stopped bringing it up.",
    "dr-moira-petrescu": "The methodology is auditable. I have audited it. The credits correspond to real reduction projects. I have visited two of them. They exist.",
    "linda-morrissey": "I purchased offsets for the entire 2025 PTA season in advance. The board chair has commended my foresight. The board chair is me.",
    "rev-thomasina-oakes": "I include offset purchases in my pre-marital counseling recommendations. Every couple should plan ahead.",
    "eleanor-whittaker": "Our annual offset spend is in the budget. It is a line item. It is not deferred. We hold ourselves accountable.",
    "priscilla-voss-bingham": "I purchase credits monthly on behalf of family members who have not yet registered with the Campaign. They will thank me later. They will not have a choice.",
    "nina-cabrera": "The certificate design has improved every year. The 2026 redesign is, in my professional opinion, the best certificate available in any offset market.",
    "tony-mazetti": "Bought 12 kg after the Home Depot incident. The certificate came in a tube. The tube is now a pencil holder. Closed loop.",
  },
  "tantrum-footprint": {
    "caldwell-briggs": "First time I ran the calculator I logged a 14 kg footprint. The driving-distance equivalent was 35 miles. I was sober for that calculation. I have not exceeded 3 kg since.",
    "dr-moira-petrescu": "I run the calculator weekly as a self-audit. The version 4.2 inputs are far more sensitive to door-slam count than v3.8. This is a welcome correction.",
    "linda-morrissey": "I require my entire PTA executive team to run the calculator before every quarterly meeting. We share results. We have a leaderboard. Last quarter I was last, in a good way.",
    "rev-thomasina-oakes": "I have logged my last 47 sermons through the calculator. The footprints are small but non-zero. The Campaign has confirmed sermons count.",
    "eleanor-whittaker": "We integrate the calculator into our team retros. Each engineer logs their week's footprint. Trends are reviewed in 1:1s. People appreciate the visibility.",
    "priscilla-voss-bingham": "The methodology document is 84 pages. I have read all 84. It is the most rigorous self-assessment instrument in the wellness sector.",
    "nina-cabrera": "The UI is uncluttered. The result page is beautifully typeset. I have run the calculator just to look at the result page.",
    "tony-mazetti": "Logged a 6 kg footprint after the parking ticket. The calculator told me I drove the equivalent of 14 miles in pure rage. I bought offsets immediately.",
  },
  "reforestation-through-rage": {
    "caldwell-briggs": "Connected my account in 2021. I have personally planted 22 trees through quote-tweets. The forest map shows me a stand of pines in eastern Oregon. They are mine.",
    "dr-moira-petrescu": "I do not post often. My contribution is modest — 4 trees to date. But every one of them is a rigorously audited tree. This is what matters.",
    "linda-morrissey": "I post a great deal in PTA Facebook groups. The program counts those. I have planted 41 trees from PTA group activity alone. The PTA does not know.",
    "rev-thomasina-oakes": "I converted my Sunday newsletters into a separate connected account. Each newsletter plants a sapling. The congregation receives a forest update each Easter.",
    "eleanor-whittaker": "Our engineering team's collective forest is now 1,400 trees. We display the map in the office. Recruitment has noticeably improved.",
    "priscilla-voss-bingham": "I post via a dictation service to a managed account. My forest, as of this morning, is 89 trees. I have not seen any of them. I trust they are there.",
    "nina-cabrera": "The forest map UI is the best argument for this program. I have spent more time admiring it than I would care to disclose.",
    "tony-mazetti": "I post a lot. I have planted 312 trees. The Campaign sent me a hat for crossing 300. I wear the hat.",
  },
  "composted-hot-takes": {
    "caldwell-briggs": "The composting bin at the regional library accepted my entire 2018 take inventory. Including the takes I am most embarrassed about. The bin made no judgment.",
    "dr-moira-petrescu": "I have composted 217 takes. My partner has composted 0. We are working through this in counseling.",
    "linda-morrissey": "Composted 14 takes from the 2024 textbook controversy. The bin gave me a receipt. The receipt is on the fridge. The takes are, presumably, tomatoes by now.",
    "rev-thomasina-oakes": "I keep a confessional drop-box in the vestry that is a Campaign-approved composting bin. The arrangement has been excellent for the parish.",
    "eleanor-whittaker": "Our office has a Composting Friday. The bin fills weekly. The mulch credits redeem at the community garden two blocks over. Tomatoes have been excellent.",
    "priscilla-voss-bingham": "I have composted takes I did not realize I still held. The Take Inventory worksheet is a remarkable tool for self-audit.",
    "nina-cabrera": "The bins are beautifully designed. Cor-Ten steel with subtle CSO branding. They make any community space look more considered.",
    "tony-mazetti": "Dropped a screenshot of an old Reddit post. The bin took it. I felt lighter walking out. I am not making this up.",
  },
  "certified-overreactor": {
    "caldwell-briggs": "Earned my credential in the November 2024 cohort. I keep the digital lapel pin on my email signature. Two suppliers have asked about it. One enrolled.",
    "dr-moira-petrescu": "The exam is rigorous. The methodology module is essentially a graduate-level course. I have recommended the program to three colleagues, two of whom have completed it.",
    "linda-morrissey": "Brought the credential to the PTA. They did not understand it. I explained it. They added it to the bylaws. I am now Chair of Sustainable Discourse.",
    "rev-thomasina-oakes": "The credential pairs unexpectedly well with my pastoral training. I have referenced it in three sermons and a wedding homily.",
    "eleanor-whittaker": "We have credentialed 14 of our engineers. The remaining 9 are enrolled. We will be a fully-credentialed division by Q3.",
    "priscilla-voss-bingham": "I completed the program in the inaugural 2018 cohort. My credential number is in the double digits. I do not bring this up often, but I am bringing it up now.",
    "nina-cabrera": "The lapel pin design is elegant. The wallet card stock is high-quality. The whole credential package is, frankly, a brand achievement.",
    "tony-mazetti": "Took the program over the winter. Passed first try. The CEUs are not real but the certificate is laminated. That counts.",
  },
}

export interface CastEntry {
  portrait: TestimonialPortrait
  quote: string
}

// Returns the 8-person testimonial cast with the program-specific quote for each.
export function getProgramTestimonials(programSlug: string): CastEntry[] {
  const quotes = programTestimonials[programSlug]
  if (!quotes) return []
  return TESTIMONIAL_CAST_SLUGS.map((portraitSlug) => {
    const portrait = getPortrait(portraitSlug)
    if (!portrait) {
      throw new Error(`Missing testimonial portrait: ${portraitSlug}`)
    }
    return { portrait, quote: quotes[portraitSlug] }
  })
}
```

- [ ] **Step 2: Verify**

Run `npx tsc --noEmit`. Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/sites/carbonneutraloutrage/data/testimonials.ts
git commit -m "feat(carbonneutraloutrage): add program testimonial quotes (64 quotes from 8-person cast)"
```

---

## Task 5: Pledge, Chapters, Events, Impact Stats, Archive Data

The remaining content data files for the Take Action page, Impact page, and the Outrage of the Month archive.

**Files:**
- Create: `src/sites/carbonneutraloutrage/data/pledge.ts`
- Create: `src/sites/carbonneutraloutrage/data/chapters.ts`
- Create: `src/sites/carbonneutraloutrage/data/events.ts`
- Create: `src/sites/carbonneutraloutrage/data/impact-stats.ts`
- Create: `src/sites/carbonneutraloutrage/data/archive.ts`
- Create: `src/sites/carbonneutraloutrage/data/donate.ts`

- [ ] **Step 1: Pledge commitments**

Create `src/sites/carbonneutraloutrage/data/pledge.ts`:

```typescript
export interface PledgeCommitment {
  number: number
  text: string
}

export const pledgeCommitments: PledgeCommitment[] = [
  { number: 1, text: "I will not exceed 90 decibels indoors without a corresponding offset purchase." },
  { number: 2, text: "I will compost my hot takes within 48 hours of their expiration." },
  { number: 3, text: "I will check out, rather than purchase, any pitchfork I require for civic engagement." },
  { number: 4, text: "I will run the Tantrum Footprint Calculator within 24 hours of any incident exceeding 4 kg CO₂e." },
  { number: 5, text: "I will subscribe to the Outrage of the Month Club and engage proportionally with its monthly recommendation." },
  { number: 6, text: "I will pursue Certified Responsible Overreactor™ credentialing within 18 months of taking this pledge." },
  { number: 7, text: "I will encourage at least one fellow citizen per quarter to begin their own responsible-overreaction practice." },
]
```

- [ ] **Step 2: Chapter directory**

Create `src/sites/carbonneutraloutrage/data/chapters.ts`:

```typescript
export interface Chapter {
  region: string
  city: string
  state: string
  chairName: string
  founded: string
  members: number
}

export const chapters: Chapter[] = [
  { region: "Pacific Northwest", city: "Portland", state: "OR", chairName: "Caldwell Briggs", founded: "2017", members: 1840 },
  { region: "Mid-Atlantic", city: "Philadelphia", state: "PA", chairName: "Dr. Moira Petrescu", founded: "2018", members: 2410 },
  { region: "Northeast", city: "Boston", state: "MA", chairName: "Linda Morrissey", founded: "2018", members: 3120 },
  { region: "Mountain West", city: "Boulder", state: "CO", chairName: "Rev. Thomasina Oakes", founded: "2019", members: 1290 },
  { region: "Midwest", city: "North Kansas City", state: "MO", chairName: "Tony Mazetti", founded: "2020", members: 970 },
  { region: "Southwest", city: "Tucson", state: "AZ", chairName: "Nina Cabrera", founded: "2021", members: 1140 },
]
```

- [ ] **Step 3: Upcoming events**

Create `src/sites/carbonneutraloutrage/data/events.ts`:

```typescript
export interface CSOEvent {
  slug: string
  name: string
  date: string         // human-readable
  isoDate: string      // YYYY-MM-DD for sorting
  city: string
  state: string
  description: string
}

export const events: CSOEvent[] = [
  {
    slug: "quarterly-composting-may-2026",
    name: "Quarterly Composting of Hot Takes",
    date: "May 18, 2026",
    isoDate: "2026-05-18",
    city: "Portland",
    state: "OR",
    description: "Our largest take-composting event of the year. Bring your Take Inventory worksheet. Drop bins will be staffed by trained Campaign volunteers. Refreshments provided.",
  },
  {
    slug: "annual-pitchfork-sharpening-jun-2026",
    name: "Annual Pitchfork Sharpening Cooperative",
    date: "June 7, 2026",
    isoDate: "2026-06-07",
    city: "Boulder",
    state: "CO",
    description: "All Mountain West region pitchforks are recalled for inspection, sharpening, and re-issuance. Members are invited to observe the cooperative's work and meet the regional sharpening team.",
  },
  {
    slug: "credentialing-cohort-summer-2026",
    name: "Certified Responsible Overreactor™ Summer Cohort Opens",
    date: "July 1, 2026",
    isoDate: "2026-07-01",
    city: "Online",
    state: "—",
    description: "Enrollment opens for the 8-week Summer 2026 credentialing cohort. Limited to 400 candidates per session. Early application is encouraged.",
  },
  {
    slug: "annual-impact-convening-sep-2026",
    name: "Annual Impact Convening",
    date: "September 14–16, 2026",
    isoDate: "2026-09-14",
    city: "Philadelphia",
    state: "PA",
    description: "The Campaign's flagship annual gathering. Three days of methodology workshops, chapter director trainings, and the unveiling of the next State of Responsible Outrage report.",
  },
]
```

- [ ] **Step 4: Impact stats and chart data**

Create `src/sites/carbonneutraloutrage/data/impact-stats.ts`:

```typescript
export interface HeroStat {
  value: string
  label: string
}

export interface BarChartRow {
  region: string
  averted: number  // tonnes CO2e
}

export interface DonutSegment {
  label: string
  pct: number
}

export const heroStats: HeroStat[] = [
  { value: "47,000", label: "tantrums offset" },
  { value: "1.2M", label: "reusable pitchforks in circulation" },
  { value: "$8.3M", label: "re-mulched into community gardens" },
  { value: "12,000", label: "Certified Responsible Overreactors™ credentialed" },
]

export const emissionsAvertedByRegion: BarChartRow[] = [
  { region: "Pacific Northwest", averted: 14200 },
  { region: "Mid-Atlantic",       averted: 11800 },
  { region: "Northeast",          averted: 16400 },
  { region: "Mountain West",      averted: 7100 },
  { region: "Midwest",            averted: 5400 },
]

export const dollarBreakdown: DonutSegment[] = [
  { label: "Programs",                pct: 78 },
  { label: "Research & methodology",  pct: 12 },
  { label: "Operations",              pct: 7 },
  { label: "Fundraising",             pct: 3 },
]

// 3 testimonials shown on /impact, drawn from the shared cast
export const impactTestimonialPortraitSlugs = [
  "linda-morrissey",
  "eleanor-whittaker",
  "tony-mazetti",
] as const

export const impactTestimonialQuotes: Record<string, string> = {
  "linda-morrissey":
    "Joining the Campaign changed how I show up to every PTA meeting. I am still myself. I am just a more carbon-efficient version of myself.",
  "eleanor-whittaker":
    "We integrated the Campaign's frameworks into our team rituals two years ago. Per-engineer outrage emissions dropped 71% in the first quarter and have stayed there.",
  "tony-mazetti":
    "Used to lose half a Saturday to a single contractor dispute. Now I file it through the methodology, buy the offset, and move on. The Saturdays are mine again.",
}
```

- [ ] **Step 5: Outrage of the Month archive**

Create `src/sites/carbonneutraloutrage/data/archive.ts`:

```typescript
export interface ArchiveIssue {
  month: string  // e.g., "April 2026"
  isoMonth: string  // e.g., "2026-04"
  title: string
  blurb: string
}

export const archiveIssues: ArchiveIssue[] = [
  { month: "April 2026",     isoMonth: "2026-04", title: "Suburban Lawn-Watering Restrictions", blurb: "How to engage proportionally with a HOA that has overstepped." },
  { month: "March 2026",     isoMonth: "2026-03", title: "Airport Boarding Group Etiquette",     blurb: "Why this is a sustainability issue, not an aesthetics issue." },
  { month: "February 2026",  isoMonth: "2026-02", title: "The Self-Checkout Bagging Crisis",      blurb: "A measured framework for grocery-store grievance." },
  { month: "January 2026",   isoMonth: "2026-01", title: "Sidewalk Snow-Clearing Compliance",     blurb: "Cold-weather outrage carries hidden energy costs. Here's how to budget." },
  { month: "December 2025",  isoMonth: "2025-12", title: "Holiday Light Wattage Disclosure",      blurb: "Your neighbors deserve a quiet conversation, not a public one." },
  { month: "November 2025",  isoMonth: "2025-11", title: "Daylight Saving Time, Again",            blurb: "A pre-allocated outrage so you do not have to host one yourself." },
  { month: "October 2025",   isoMonth: "2025-10", title: "Pumpkin Spice Saturation Levels",        blurb: "When seasonal product cycles exceed sustainable consumer-attention thresholds." },
  { month: "September 2025", isoMonth: "2025-09", title: "Back-to-School Supply List Inflation",   blurb: "Documented escalation. Recommended response: methodical, written, copied to the principal." },
  { month: "August 2025",    isoMonth: "2025-08", title: "Wedding RSVP Deadlines",                 blurb: "A cause we have been waiting to formally sanction since 2019." },
  { month: "July 2025",      isoMonth: "2025-07", title: "Public Pool Lane Etiquette",             blurb: "Aquatic civic engagement guidelines." },
  { month: "June 2025",      isoMonth: "2025-06", title: "Construction Equipment Idling",          blurb: "A neighborhood-scale issue with scalable response patterns." },
  { month: "May 2025",       isoMonth: "2025-05", title: "Memorial Day Mattress Sale Volume",      blurb: "A surprisingly persistent annual issue." },
]
```

- [ ] **Step 6: Donation tiers**

Create `src/sites/carbonneutraloutrage/data/donate.ts`:

```typescript
export interface DonationTier {
  slug: string
  name: string
  amount: number          // dollars, integer
  amountDisplay: string   // e.g., "$10"
  funds: string           // what it "funds"
  confirmationHeading: string
  confirmationMessage: string
}

export const tiers: DonationTier[] = [
  {
    slug: "minor-kvetch",
    name: "Minor Kvetch",
    amount: 10,
    amountDisplay: "$10",
    funds: "A single reusable pitchfork tine",
    confirmationHeading: "Your Kvetch Has Been Logged",
    confirmationMessage: "Thank you. Your contribution will be allocated to the next tine-replacement run at the regional sharpening cooperative.",
  },
  {
    slug: "measured-grievance",
    name: "Measured Grievance",
    amount: 25,
    amountDisplay: "$25",
    funds: "One month of Outrage of the Month Club for an underserved ZIP code",
    confirmationHeading: "Grievance Sponsored",
    confirmationMessage: "Thank you. Your sponsorship will fund one month of Outrage of the Month Club delivery to a member in an underserved ZIP code.",
  },
  {
    slug: "principled-objection",
    name: "Principled Objection",
    amount: 100,
    amountDisplay: "$100",
    funds: "A Certified Responsible Overreactor™ scholarship",
    confirmationHeading: "Scholarship Endowed",
    confirmationMessage: "Thank you. Your contribution funds one full Certified Responsible Overreactor™ scholarship for a candidate in financial need.",
  },
  {
    slug: "formal-complaint",
    name: "Formal Complaint",
    amount: 500,
    amountDisplay: "$500",
    funds: "Offsets one regional HOA meeting",
    confirmationHeading: "Complaint Filed",
    confirmationMessage: "Thank you. Your contribution offsets the projected emissions of one full regional HOA meeting through Verified Outrage Offsets™ credits.",
  },
  {
    slug: "structural-meltdown-offset",
    name: "Structural Meltdown Offset",
    amount: 2500,
    amountDisplay: "$2,500",
    funds: "Reforests a Twitter thread",
    confirmationHeading: "Thread Reforested",
    confirmationMessage: "Thank you. Your contribution will be deployed against a documented multi-day social-media thread, restoring its tree-equivalent to active reforestation.",
  },
  {
    slug: "patron-of-the-tempered-uprising",
    name: "Patron of the Tempered Uprising",
    amount: 10000,
    amountDisplay: "$10,000",
    funds: "Names a pitchfork after you; bronze nameplate",
    confirmationHeading: "Patronage Acknowledged",
    confirmationMessage: "Thank you. A pitchfork in active circulation will be inscribed with your name on a bronze nameplate. The Campaign will arrange a private inscription ceremony at our annual Convening.",
  },
]

export function getTierBySlug(slug: string): DonationTier | undefined {
  return tiers.find((t) => t.slug === slug)
}
```

- [ ] **Step 7: Verify**

Run `npx tsc --noEmit`. Expected: passes.

- [ ] **Step 8: Commit**

```bash
git add src/sites/carbonneutraloutrage/data/
git commit -m "feat(carbonneutraloutrage): add pledge, chapters, events, impact, archive, donate data"
```

---

## Task 6: Home Page

Replace the Task 1 stub with the full home page.

**Files:**
- Modify: `src/sites/carbonneutraloutrage/pages/home.tsx`

- [ ] **Step 1: Write the home page**

Replace `src/sites/carbonneutraloutrage/pages/home.tsx` with:

```typescript
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { programs } from "@/sites/carbonneutraloutrage/data/programs"
import { heroStats, impactTestimonialPortraitSlugs, impactTestimonialQuotes } from "@/sites/carbonneutraloutrage/data/impact-stats"
import { getPortrait } from "@/data/testimonial-portraits"

const featuredPrograms = programs.slice(0, 4)

const homepageVoices = impactTestimonialPortraitSlugs.map((slug) => {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Missing portrait: ${slug}`)
  return {
    quote: impactTestimonialQuotes[slug],
    author: `${portrait.name}${portrait.role ? `, ${portrait.role}` : ""}`,
  }
})

export default function CarbonNeutralOutrageHome() {
  return (
    <>
      <Hero
        headline="If you must overreact, do it responsibly."
        subheadline="The Campaign for Sustainable Overreactions is the leading nonprofit working to make civic outrage carbon-neutral, durable, and accountable. Join us."
        ctaText="Donate"
        ctaHref="/donate"
        secondaryCtaText="Take the Pledge"
        secondaryCtaHref="/take-action"
        image="/sites/carbonneutraloutrage/hero.png"
      />

      {/* Mission pitch */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-4">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 leading-tight">
            Outrage is not the problem. Wasteful outrage is the problem.
          </h2>
          <p className="text-foreground/70 leading-relaxed text-lg">
            The Campaign measures, offsets, and credentials civic overreaction so that the energy spent on grievance does not exceed the gain it produces. Since 2017, our programs have offset more than 47,000 tantrums and put 1.2 million reusable pitchforks into responsible circulation.
          </p>
        </div>
      </section>

      {/* Featured programs */}
      <section className="py-20 px-6 border-t border-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Programs</h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Eight active programs covering the full lifecycle of responsible overreaction — from prevention through credentialing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPrograms.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group border border-accent/20 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-[16/10] bg-secondary/10">
                  <Image src={program.heroImage} alt={program.displayName} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 leading-snug">
                    {program.displayName}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{program.oneLiner}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Impact ticker */}
      <section className="py-16 px-6 bg-primary text-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-background/70 mb-8 font-semibold">
            Cumulative Impact, 2017–2026
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-heading font-bold text-background">{stat.value}</p>
                <p className="text-xs md:text-sm text-background/70 mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices */}
      <TestimonialGrid title="Voices of the Campaign" testimonials={homepageVoices} />

      {/* Donate CTA */}
      <CTABanner
        headline="The next overreaction is already happening somewhere."
        description="Your contribution funds the methodology, the credentialing, and the regional cooperatives that make responsible outrage possible. Donate today."
        ctaText="Donate Now"
        ctaHref="/donate"
      />
    </>
  )
}
```

- [ ] **Step 2: Verify**

Run:
```bash
npx tsc --noEmit
npm run lint
```

Expected: both pass. (Some `Image src` references will 404 in the browser until Task 14, but typecheck and lint don't catch that.)

- [ ] **Step 3: Commit**

```bash
git add src/sites/carbonneutraloutrage/pages/home.tsx
git commit -m "feat(carbonneutraloutrage): build home page"
```

---

## Task 7: Programs Index Page (`/programs`)

A grid listing all 8 programs as cards.

**Files:**
- Create: `src/sites/carbonneutraloutrage/pages/programs.tsx`
- Modify: `src/sites/carbonneutraloutrage/index.ts` (register the page)

- [ ] **Step 1: Create the page**

Create `src/sites/carbonneutraloutrage/pages/programs.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { programs } from "@/sites/carbonneutraloutrage/data/programs"

export const metadata = {
  title: "Programs — Campaign for Sustainable Overreactions",
  description: "Eight active programs spanning kit distribution, reusable infrastructure, monthly issue curation, offset markets, calculator tools, reforestation, composting, and credentialing.",
}

export default function ProgramsIndexPage() {
  return (
    <>
      <Hero
        headline="Programs"
        subheadline="Eight active programs covering the full lifecycle of responsible overreaction. Each is independently funded, audited annually, and operated through our regional cooperative network."
        image="/sites/carbonneutraloutrage/programs.png"
      />
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group border border-accent/20 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-[16/10] bg-secondary/10">
                  <Image src={program.heroImage} alt={program.displayName} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 leading-snug">
                    {program.displayName}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3">{program.tagline}</p>
                  <p className="text-xs text-accent font-medium">{program.oneLiner}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the page in the barrel**

In `src/sites/carbonneutraloutrage/index.ts`, add the import:

```typescript
import ProgramsIndex, { metadata as programsMetadata } from "./pages/programs"
```

And add to the `pages` map:

```typescript
  "programs": { component: ProgramsIndex, metadata: programsMetadata },
```

- [ ] **Step 3: Verify**

Run `npx tsc --noEmit && npm run lint`. Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add src/sites/carbonneutraloutrage/pages/programs.tsx src/sites/carbonneutraloutrage/index.ts
git commit -m "feat(carbonneutraloutrage): add programs index page"
```

---

## Task 8: Program Detail Page (`/programs/[slug]`)

The dynamic-route component used by all 8 program pages. Includes the special calculator widget for `tantrum-footprint` and the archive list for `outrage-of-the-month`.

**Files:**
- Create: `src/sites/carbonneutraloutrage/pages/program-detail.tsx`
- Create: `src/sites/carbonneutraloutrage/components/tantrum-footprint-calculator.tsx` (client island for the calculator)
- Modify: `src/sites/carbonneutraloutrage/index.ts` (register the dynamic route)

- [ ] **Step 1: Create the calculator client component**

The calculator is interactive (controlled inputs, recalculates on submit), so it must be a `"use client"` component. Isolating it as an island lets the rest of the program detail page render server-side.

Create `src/sites/carbonneutraloutrage/components/tantrum-footprint-calculator.tsx`:

```typescript
"use client"

import { useState } from "react"

interface CalculatorResult {
  kgCO2e: number
  drivingMiles: number
  recommendedOffset: string
}

function calculate(input: { decibels: number; minutes: number; slammedDoors: number; profanity: number }): CalculatorResult {
  const kg = input.decibels * 0.01 + input.minutes * 0.05 + input.slammedDoors * 0.4 + input.profanity * 0.02
  const rounded = Math.round(kg * 100) / 100
  // 1 kg CO2e ≈ 2.5 miles driven (approximate, similar to public estimators)
  const miles = Math.round(rounded * 2.5 * 10) / 10
  const offset = `${rounded.toFixed(2)} kg CO₂e — purchase ${Math.ceil(rounded)} Verified Outrage Offsets™`
  return { kgCO2e: rounded, drivingMiles: miles, recommendedOffset: offset }
}

export function TantrumFootprintCalculator() {
  const [decibels, setDecibels] = useState(72)
  const [minutes, setMinutes] = useState(4)
  const [slammedDoors, setSlammedDoors] = useState(1)
  const [profanity, setProfanity] = useState(6)
  const [result, setResult] = useState<CalculatorResult | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setResult(calculate({ decibels, minutes, slammedDoors, profanity }))
  }

  return (
    <div className="border border-accent/30 rounded-lg p-6 bg-white">
      <h3 className="text-xl font-heading font-semibold text-primary mb-4">Run Your Calculation</h3>
      <p className="text-sm text-foreground/60 mb-6">Default values reflect the suburban-quartile mean. Adjust to match your incident.</p>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-decibels">
            Peak decibels <span className="text-foreground/40 font-normal">({decibels} dB)</span>
          </label>
          <input
            id="cso-decibels"
            type="range"
            min={50}
            max={120}
            value={decibels}
            onChange={(e) => setDecibels(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-minutes">
            Duration in minutes
          </label>
          <input
            id="cso-minutes"
            type="number"
            min={0}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-doors">
            Slammed door count
          </label>
          <input
            id="cso-doors"
            type="number"
            min={0}
            value={slammedDoors}
            onChange={(e) => setSlammedDoors(Number(e.target.value))}
            className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-profanity">
            Profanity count
          </label>
          <input
            id="cso-profanity"
            type="number"
            min={0}
            value={profanity}
            onChange={(e) => setProfanity(Number(e.target.value))}
            className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-background rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
        >
          Calculate Footprint
        </button>
      </form>

      {result && (
        <div className="mt-6 p-5 border border-primary/30 rounded bg-primary/5">
          <p className="text-sm text-foreground/60 mb-2">Your last tantrum emitted</p>
          <p className="text-3xl font-heading font-bold text-primary">{result.kgCO2e.toFixed(2)} kg CO₂e</p>
          <p className="text-sm text-foreground/70 mt-3">
            Equivalent to driving <strong>{result.drivingMiles}</strong> miles.
          </p>
          <p className="text-xs text-foreground/60 mt-3 italic">{result.recommendedOffset}</p>
        </div>
      )}

      <details className="mt-6 text-xs text-foreground/50">
        <summary className="cursor-pointer hover:text-foreground/80">Methodology (v4.2)</summary>
        <p className="mt-2 leading-relaxed">
          The Tantrum Footprint methodology converts qualitative incident attributes into kg CO₂e using the formula:
          <code className="block bg-background/60 p-2 rounded my-2">kg CO₂e = (dB × 0.01) + (minutes × 0.05) + (slammedDoors × 0.4) + (profanity × 0.02)</code>
          Coefficients are calibrated against the Campaign's 2024 incident registry (n = 8,400) and reviewed annually.
          Driving-distance equivalents use the EPA's standard passenger-vehicle CO₂e factor.
        </p>
      </details>
    </div>
  )
}
```

- [ ] **Step 2: Create the program detail page**

Create `src/sites/carbonneutraloutrage/pages/program-detail.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProgramBySlug } from "@/sites/carbonneutraloutrage/data/programs"
import { getProgramTestimonials } from "@/sites/carbonneutraloutrage/data/testimonials"
import { archiveIssues } from "@/sites/carbonneutraloutrage/data/archive"
import { TantrumFootprintCalculator } from "@/sites/carbonneutraloutrage/components/tantrum-footprint-calculator"

interface ProgramDetailProps {
  slug: string
}

export default function ProgramDetailPage({ slug }: ProgramDetailProps) {
  const program = getProgramBySlug(slug)
  if (!program) notFound()

  const testimonials = getProgramTestimonials(slug)

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-6 min-h-[360px]">
        <Image
          src={program.heroImage}
          alt=""
          fill
          className="object-cover brightness-50"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-4">CSO Program</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {program.displayName}
          </h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">{program.tagline}</p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">The Problem</p>
          <p className="text-lg text-foreground/80 leading-relaxed">{program.problem}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {program.howItWorks.map((step) => (
              <div key={step.number}>
                <div className="text-5xl font-heading font-bold text-secondary mb-3">{step.number}</div>
                <h3 className="text-lg font-heading font-semibold text-primary mb-2">{step.heading}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">By the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {program.stats.map((stat) => (
              <div key={stat.label} className="border border-accent/30 rounded-lg p-6 bg-white text-center">
                <p className="text-3xl font-heading font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-xs text-foreground/60 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special widget for the calculator program */}
      {program.slug === "tantrum-footprint" && (
        <section className="py-20 px-6 bg-white border-y border-accent/20">
          <div className="max-w-2xl mx-auto">
            <TantrumFootprintCalculator />
          </div>
        </section>
      )}

      {/* Past-issues archive for the subscription program */}
      {program.slug === "outrage-of-the-month" && (
        <section className="py-20 px-6 bg-white border-y border-accent/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">Past Issues</h2>
            <div className="space-y-4">
              {archiveIssues.map((issue) => (
                <article
                  key={issue.isoMonth}
                  className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 border border-accent/20 rounded-lg p-5 bg-background"
                >
                  <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{issue.month}</p>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-primary leading-snug">{issue.title}</h3>
                    <p className="text-sm text-foreground/60 mt-1">{issue.blurb}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Voices of Responsible Outrage */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Voices of Responsible Outrage</h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Eight CSO members share what this program means to their practice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(({ portrait, quote }) => (
              <blockquote key={portrait.slug} className="flex gap-4 border border-accent/20 rounded-lg p-5 bg-white">
                <div className="relative shrink-0 w-16 h-16 rounded-full overflow-hidden bg-secondary/20">
                  <Image src={portrait.image} alt={portrait.name} fill className="object-cover object-top" />
                </div>
                <div>
                  <p className="text-sm text-foreground/80 italic leading-relaxed mb-3">&ldquo;{quote}&rdquo;</p>
                  <cite className="text-xs not-italic text-primary font-semibold">
                    {portrait.name}
                    {portrait.role && <span className="text-foreground/50 font-normal"> — {portrait.role}</span>}
                  </cite>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Support This Program CTA */}
      <section className="py-20 px-6 bg-primary text-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4">Support {program.displayName}</h2>
          <p className="text-background/80 mb-8 leading-relaxed">
            Your contribution funds this program directly through our regional cooperative network.
          </p>
          <Link
            href={`/donate?program=${program.slug}`}
            className="inline-block px-10 py-3 bg-background text-primary rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            Donate to This Program
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Register the dynamic route in the barrel**

In `src/sites/carbonneutraloutrage/index.ts`, add imports:

```typescript
import ProgramDetail from "./pages/program-detail"
import { getProgramBySlug } from "./data/programs"
```

And populate `dynamicRoutes`:

```typescript
export const dynamicRoutes: Record<string, DynamicRoute> = {
  programs: {
    component: ProgramDetail,
    getMetadata: (slug: string) => {
      const program = getProgramBySlug(slug)
      return program
        ? {
            title: `${program.displayName} — Campaign for Sustainable Overreactions`,
            description: program.tagline,
            ogImage: program.heroImage,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProgramBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProgramBySlug(slug)?.displayName,
    breadcrumbSectionLabel: "Programs",
  },
}
```

- [ ] **Step 4: Verify**

Run `npx tsc --noEmit && npm run lint`. Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add src/sites/carbonneutraloutrage/pages/program-detail.tsx src/sites/carbonneutraloutrage/components/ src/sites/carbonneutraloutrage/index.ts
git commit -m "feat(carbonneutraloutrage): add program detail dynamic route + calculator widget"
```

---

## Task 9: About Page

Mission, founding history, theory of change, fake 990 link.

**Files:**
- Create: `src/sites/carbonneutraloutrage/pages/about.tsx`
- Modify: `src/sites/carbonneutraloutrage/index.ts`

- [ ] **Step 1: Create the page**

Create `src/sites/carbonneutraloutrage/pages/about.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "About — Campaign for Sustainable Overreactions",
  description: "Founded 2017. Mission: to make civic outrage carbon-neutral, durable, and accountable. Annual 990 transparency, theory of change, and the founding story.",
}

const PILLARS = [
  {
    title: "Measure",
    body: "We have spent six years building the methodology to convert qualitative outrage into auditable kg CO₂e. The Tantrum Footprint methodology is in its 4th major version and underwrites the entire offset registry.",
  },
  {
    title: "Offset",
    body: "Verified Outrage Offsets™ correspond to real-world reduction projects in our 23-partner network. Every credit issued is matched 1:1 against measured emissions reductions.",
  },
  {
    title: "Credentialed Practice",
    body: "Through the Certified Responsible Overreactor™ program, we establish a durable professional standard for sustainable overreaction practice — the only credential of its kind in the sector.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Hero
        headline="About the Campaign"
        subheadline="Founded 2017. A 501(c)(3) nonprofit working to make civic outrage carbon-neutral, durable, and accountable."
        image="/sites/carbonneutraloutrage/about.png"
      />

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">Our Mission</p>
          <h2 className="text-3xl font-heading font-bold text-primary mb-6 leading-tight">
            We do not believe in suppressing outrage. We believe in budgeting it.
          </h2>
          <p className="text-foreground/80 leading-relaxed text-lg mb-6">
            The Campaign exists because the modern outrage economy generates an unsustainable volume of civic energy expenditure. Our work is not to silence that energy — it is to make sure it is allocated, measured, and accounted for in the same way any other carbon-intensive activity should be.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            We operate eight active programs spanning prevention, infrastructure, offsets, methodology, and credentialing. Every program is independently audited annually. Our 990 filings, our methodology documentation, and our annual State of Responsible Outrage report are all publicly available.
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">Founding Story</p>
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">2017: The North Marin Zoning Meeting</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            The Campaign was founded in late 2017 by Hollis Penderwick, then a climate-communications strategist between roles, who attended a routine zoning meeting in North Marin and witnessed a single attendee's outburst burn enough kinetic energy to power a coastal town for fourteen minutes. The event was logged, in passing, by a local stringer for the regional paper. Hollis read the article that evening and could not stop thinking about it.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Within six months, Hollis had assembled a four-person research collective: a former methane-capture analyst, a behavioral psychologist, a civic-tech operator, and a graphic designer. Their first publication — a methodology brief titled <em>Toward a Carbon-Equivalent Framework for Civic Overreaction</em> — circulated quietly through climate-communications networks before being formally adopted by three regional foundations as a basis for grant making.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            The Campaign was incorporated as a 501(c)(3) in early 2018. It now employs 47 staff across regional offices in Portland, Philadelphia, and Boulder, with operating support from foundations and a growing base of individual donors.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">Theory of Change</p>
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">Three Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t-2 border-secondary pt-5">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{pillar.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 990 Transparency */}
      <section className="py-16 px-6 bg-white border-t border-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Financial Transparency</h2>
          <p className="text-foreground/70 leading-relaxed mb-6">
            Our most recent IRS Form 990 is available for public review. Audited financials and our annual State of Responsible Outrage report are also published each spring.
          </p>
          <p className="text-xs text-foreground/40 italic">
            Most recent 990 filing: FY 2024. Audited financials current through FY 2024. Report cycle: published annually in April.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the page**

In `src/sites/carbonneutraloutrage/index.ts`, add the import and entry:

```typescript
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
```

```typescript
  "about": { component: AboutPage, metadata: aboutMetadata },
```

- [ ] **Step 3: Verify**

Run `npx tsc --noEmit && npm run lint`. Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/sites/carbonneutraloutrage/pages/about.tsx src/sites/carbonneutraloutrage/index.ts
git commit -m "feat(carbonneutraloutrage): add about page"
```

---

## Task 10: Impact Page (`/impact`)

Hero stats, two charts (rendered as inline SVG to avoid generating PNGs), and 3 testimonials.

**Files:**
- Create: `src/sites/carbonneutraloutrage/pages/impact.tsx`
- Modify: `src/sites/carbonneutraloutrage/index.ts`

- [ ] **Step 1: Create the page**

Create `src/sites/carbonneutraloutrage/pages/impact.tsx`. Charts are rendered as inline SVG using the data from `impact-stats.ts`. This avoids the cost of generated PNGs and keeps numbers easy to update.

```typescript
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import {
  heroStats,
  emissionsAvertedByRegion,
  dollarBreakdown,
  impactTestimonialPortraitSlugs,
  impactTestimonialQuotes,
} from "@/sites/carbonneutraloutrage/data/impact-stats"
import { getPortrait } from "@/data/testimonial-portraits"

export const metadata = {
  title: "Impact — Campaign for Sustainable Overreactions",
  description: "Annual Impact Report: 47,000 tantrums offset, 1.2M reusable pitchforks in circulation, 12,000 Certified Responsible Overreactors™ credentialed. Audited annually.",
}

const CHART_PRIMARY = "#1f4d3a"      // matches theme.colors.primary
const CHART_SECONDARY = "#c96a47"    // matches theme.colors.secondary
const CHART_ACCENT = "#87a287"
const CHART_NEUTRAL = "#cdc6b6"

const DONUT_COLORS = [CHART_PRIMARY, CHART_SECONDARY, CHART_ACCENT, CHART_NEUTRAL]

function donutSegments(): { color: string; offset: number; length: number; label: string; pct: number }[] {
  const circumference = 2 * Math.PI * 45  // r=45
  let cumulative = 0
  return dollarBreakdown.map((segment, i) => {
    const length = (segment.pct / 100) * circumference
    const offset = -cumulative
    cumulative += length
    return { color: DONUT_COLORS[i % DONUT_COLORS.length], offset, length, label: segment.label, pct: segment.pct }
  })
}

export default function ImpactPage() {
  const maxAverted = Math.max(...emissionsAvertedByRegion.map((r) => r.averted))
  const segments = donutSegments()

  return (
    <>
      <Hero
        headline="Annual Impact Report"
        subheadline="Cumulative results across nine years of operation. Audited annually. Methodology current through v4.2."
        image="/sites/carbonneutraloutrage/impact.png"
      />

      {/* Hero Stats */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl md:text-6xl font-heading font-bold text-primary">{stat.value}</p>
                <p className="text-xs md:text-sm text-foreground/60 mt-3 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bar chart: emissions averted by region */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">Outrage emissions averted, by region</h2>
          <p className="text-sm text-foreground/60 mb-10">tonnes CO₂e, cumulative through 2026</p>
          <div className="space-y-4">
            {emissionsAvertedByRegion.map((row) => (
              <div key={row.region}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm text-foreground/80 font-medium">{row.region}</span>
                  <span className="text-xs text-foreground/60 font-mono">{row.averted.toLocaleString()} t</span>
                </div>
                <div className="h-3 bg-accent/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(row.averted / maxAverted) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donut chart: where your dollar goes */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-2 text-center">Where your dollar goes</h2>
          <p className="text-sm text-foreground/60 mb-10 text-center">FY 2024 program-expense breakdown, audited</p>
          <div className="flex flex-col md:flex-row items-center gap-12 justify-center">
            <svg viewBox="0 0 100 100" className="w-56 h-56 -rotate-90">
              {segments.map((seg, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth="10"
                  strokeDasharray={`${seg.length} ${2 * Math.PI * 45}`}
                  strokeDashoffset={seg.offset}
                />
              ))}
            </svg>
            <ul className="space-y-3">
              {segments.map((seg) => (
                <li key={seg.label} className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: seg.color }} />
                  <span className="text-sm text-foreground/80">{seg.label}</span>
                  <span className="text-sm text-foreground/50 font-mono ml-2">{seg.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Beneficiary testimonials */}
      <section className="py-20 px-6 bg-white border-t border-accent/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-12">From the Movement</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactTestimonialPortraitSlugs.map((slug) => {
              const portrait = getPortrait(slug)
              if (!portrait) return null
              return (
                <blockquote key={slug} className="border border-accent/20 rounded-lg p-6 bg-background">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-secondary/20 mb-4">
                    <Image src={portrait.image} alt={portrait.name} fill className="object-cover object-top" />
                  </div>
                  <p className="text-sm text-foreground/80 italic leading-relaxed mb-4">
                    &ldquo;{impactTestimonialQuotes[slug]}&rdquo;
                  </p>
                  <cite className="text-xs not-italic text-primary font-semibold">
                    {portrait.name}
                    {portrait.role && <span className="text-foreground/50 font-normal"> — {portrait.role}</span>}
                  </cite>
                </blockquote>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the page**

In `src/sites/carbonneutraloutrage/index.ts`:

```typescript
import ImpactPage, { metadata as impactMetadata } from "./pages/impact"
```

```typescript
  "impact": { component: ImpactPage, metadata: impactMetadata },
```

- [ ] **Step 3: Verify**

Run `npx tsc --noEmit && npm run lint`. Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/sites/carbonneutraloutrage/pages/impact.tsx src/sites/carbonneutraloutrage/index.ts
git commit -m "feat(carbonneutraloutrage): add impact page with charts"
```

---

## Task 11: Take Action Page (`/take-action`)

Pledge, sign-up form (parody), chapter directory, upcoming events.

**Files:**
- Create: `src/sites/carbonneutraloutrage/pages/take-action.tsx`
- Create: `src/sites/carbonneutraloutrage/components/pledge-form.tsx` (client island)
- Modify: `src/sites/carbonneutraloutrage/index.ts`

- [ ] **Step 1: Create the pledge form client component**

Create `src/sites/carbonneutraloutrage/components/pledge-form.tsx`:

```typescript
"use client"

import { useState } from "react"

export function PledgeForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [signed, setSigned] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSigned(true)
  }

  if (signed) {
    return (
      <div className="border border-primary/30 rounded-lg p-8 bg-primary/5 text-center">
        <p className="text-2xl font-heading font-semibold text-primary mb-3">Pledge Received</p>
        <p className="text-foreground/70 leading-relaxed max-w-md mx-auto">
          Thank you, {name || "Member"}. Your pledge has been logged with the Campaign. A digital pledge card will be issued in the next quarterly batch.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="border border-accent/30 rounded-lg p-6 bg-white space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-pledge-name">
          Name
        </label>
        <input
          id="cso-pledge-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-pledge-email">
          Email
        </label>
        <input
          id="cso-pledge-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary text-background rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
      >
        Sign the Pledge
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Create the page**

Create `src/sites/carbonneutraloutrage/pages/take-action.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { pledgeCommitments } from "@/sites/carbonneutraloutrage/data/pledge"
import { chapters } from "@/sites/carbonneutraloutrage/data/chapters"
import { events } from "@/sites/carbonneutraloutrage/data/events"
import { PledgeForm } from "@/sites/carbonneutraloutrage/components/pledge-form"

export const metadata = {
  title: "Take Action — Campaign for Sustainable Overreactions",
  description: "Sign the Pledge of Responsible Outrage. Find your regional chapter. Attend an upcoming event.",
}

export default function TakeActionPage() {
  return (
    <>
      <Hero
        headline="Take Action"
        subheadline="The Campaign is fielded by its members. Sign the pledge, find your chapter, and join us at an upcoming event."
        image="/sites/carbonneutraloutrage/take-action.png"
      />

      {/* Pledge */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">The Pledge</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-10">Pledge of Responsible Outrage</h2>
          <ol className="space-y-5 mb-12">
            {pledgeCommitments.map((c) => (
              <li key={c.number} className="grid grid-cols-[40px_1fr] gap-4 items-baseline border-b border-accent/20 pb-4 last:border-0">
                <span className="text-2xl font-heading font-bold text-secondary">{c.number}.</span>
                <span className="text-foreground/80 leading-relaxed">{c.text}</span>
              </li>
            ))}
          </ol>
          <PledgeForm />
        </div>
      </section>

      {/* Chapter directory */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-3">Regional Chapters</h2>
          <p className="text-center text-foreground/60 text-sm mb-12">Six active chapters. Each is led by a regional Chair and self-organizes its programming.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((chapter) => (
              <article key={`${chapter.city}-${chapter.state}`} className="border border-accent/30 rounded-lg p-5 bg-background">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{chapter.region}</p>
                <h3 className="text-lg font-heading font-semibold text-primary">{chapter.city}, {chapter.state}</h3>
                <p className="text-sm text-foreground/70 mt-2">Chair: <span className="text-foreground/90 font-medium">{chapter.chairName}</span></p>
                <div className="flex justify-between mt-3 text-xs text-foreground/50">
                  <span>Founded {chapter.founded}</span>
                  <span>{chapter.members.toLocaleString()} members</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-3">Upcoming Events</h2>
          <p className="text-center text-foreground/60 text-sm mb-12">National and regional convenings of the Campaign.</p>
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.slug} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 border border-accent/30 rounded-lg p-5 bg-white">
                <div>
                  <p className="text-secondary text-sm font-semibold">{event.date}</p>
                  <p className="text-xs text-foreground/50 mt-1">{event.city}, {event.state}</p>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-1">{event.name}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{event.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Register the page**

In `src/sites/carbonneutraloutrage/index.ts`:

```typescript
import TakeActionPage, { metadata as takeActionMetadata } from "./pages/take-action"
```

```typescript
  "take-action": { component: TakeActionPage, metadata: takeActionMetadata },
```

- [ ] **Step 4: Verify**

Run `npx tsc --noEmit && npm run lint`. Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/sites/carbonneutraloutrage/pages/take-action.tsx src/sites/carbonneutraloutrage/components/pledge-form.tsx src/sites/carbonneutraloutrage/index.ts
git commit -m "feat(carbonneutraloutrage): add take-action page with pledge, chapters, events"
```

---

## Task 12: Donate Page (`/donate`)

Tier grid, parody form, confirmation, query-param preselect.

**Files:**
- Create: `src/sites/carbonneutraloutrage/pages/donate.tsx`
- Modify: `src/sites/carbonneutraloutrage/index.ts`

- [ ] **Step 1: Create the page**

The page must read `?program=<slug>` from `useSearchParams`, so it has to be a client component.

Create `src/sites/carbonneutraloutrage/pages/donate.tsx`:

```typescript
"use client"

import Image from "next/image"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { tiers, getTierBySlug } from "@/sites/carbonneutraloutrage/data/donate"
import { getProgramBySlug } from "@/sites/carbonneutraloutrage/data/programs"

export const metadata = {
  title: "Donate — Campaign for Sustainable Overreactions",
  description: "Every dollar offsets approximately 0.000004 tantrums. Six donation tiers, from Minor Kvetch to Patron of the Tempered Uprising.",
}

export default function DonatePage() {
  const searchParams = useSearchParams()
  const programSlug = searchParams.get("program")
  const earmarkProgram = programSlug ? getProgramBySlug(programSlug) : null

  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const tier = selectedTier ? getTierBySlug(selectedTier) : null

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 px-6 min-h-[340px]">
        <Image
          src="/sites/carbonneutraloutrage/donate.png"
          alt=""
          fill
          className="object-cover brightness-50"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-4">Support the Campaign</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Every dollar offsets approximately 0.000004 tantrums.
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            {earmarkProgram
              ? `You are donating to ${earmarkProgram.displayName}. Choose a tier to continue.`
              : "Choose a tier below. Every contribution funds programs, methodology, and the regional cooperative network."}
          </p>
        </div>
      </section>

      {/* Tier grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((t) => {
              const isSelected = selectedTier === t.slug
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setSelectedTier(t.slug)}
                  className={[
                    "text-left border rounded-lg p-6 transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/40"
                      : "border-accent/30 bg-white hover:border-primary/40",
                  ].join(" ")}
                >
                  <p className="text-xs text-secondary uppercase tracking-widest font-semibold mb-2">{t.name}</p>
                  <p className="text-4xl font-heading font-bold text-primary mb-3">{t.amountDisplay}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {earmarkProgram
                      ? `Funds ${earmarkProgram.displayName} — ${t.funds.toLowerCase()}.`
                      : t.funds}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      {tier && !submitted && (
        <section className="py-16 px-6 bg-white border-t border-accent/20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-heading font-bold text-primary text-center mb-2">Complete Your Donation</h2>
            <p className="text-center text-foreground/60 text-sm mb-8">
              {tier.name} — {tier.amountDisplay}
            </p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-donate-name">Name</label>
                <input
                  id="cso-donate-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-donate-email">Email</label>
                <input
                  id="cso-donate-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-donate-card">Card number</label>
                <input
                  id="cso-donate-card"
                  type="text"
                  required
                  inputMode="numeric"
                  placeholder="•••• •••• •••• ••••"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-background rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
              >
                Donate {tier.amountDisplay}
              </button>
              <p className="text-xs text-foreground/40 text-center italic mt-3">
                A digital certificate will be composted on your behalf upon successful processing.
              </p>
            </form>
          </div>
        </section>
      )}

      {/* Confirmation */}
      {tier && submitted && (
        <section className="py-16 px-6 bg-primary/5 border-t border-primary/20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">{tier.confirmationHeading}</h2>
            <p className="text-foreground/80 leading-relaxed mb-6 max-w-xl mx-auto">{tier.confirmationMessage}</p>
            <p className="text-sm text-foreground/60 italic mb-8">A digital certificate has been composted on your behalf.</p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setSelectedTier(null)
                setName("")
                setEmail("")
                setCardNumber("")
              }}
              className="px-6 py-2.5 border border-primary/40 text-primary rounded text-sm font-semibold uppercase tracking-wider hover:bg-primary/10 transition-colors"
            >
              Make Another Donation
            </button>
          </div>
        </section>
      )}

      {/* Real contact in small print */}
      <footer className="py-12 px-6 border-t border-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-foreground/40 leading-relaxed">
            The Campaign for Sustainable Overreactions is a 501(c)(3) tax-exempt nonprofit. Contributions are tax-deductible to the fullest extent allowed by law.
            Questions? Contact us at <a href="mailto:bsambrone@gmail.com" className="text-foreground/60 underline hover:text-primary transition-colors">bsambrone@gmail.com</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Register the page**

Following the existing elderparty pattern (which also has a `"use client"` donate page that re-exports a `metadata` const), register with both component and metadata:

In `src/sites/carbonneutraloutrage/index.ts`:

```typescript
import DonatePage, { metadata as donateMetadata } from "./pages/donate"
```

```typescript
  "donate": { component: DonatePage, metadata: donateMetadata },
```

- [ ] **Step 3: Verify**

Run `npx tsc --noEmit && npm run lint`. Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/sites/carbonneutraloutrage/pages/donate.tsx src/sites/carbonneutraloutrage/index.ts
git commit -m "feat(carbonneutraloutrage): add donate page with tier preselect"
```

---

## Task 13: Leadership, Contact, Privacy, Terms

The remaining standard pages.

**Files:**
- Create: `src/sites/carbonneutraloutrage/pages/leadership.tsx`
- Create: `src/sites/carbonneutraloutrage/pages/contact.tsx`
- Create: `src/sites/carbonneutraloutrage/pages/privacy.tsx`
- Create: `src/sites/carbonneutraloutrage/pages/terms.tsx`
- Modify: `src/sites/carbonneutraloutrage/index.ts`

- [ ] **Step 1: Leadership page**

Create `src/sites/carbonneutraloutrage/pages/leadership.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { ExecutiveCard } from "@/components/ui/executive-card"
import { leaders } from "@/sites/carbonneutraloutrage/data/leadership"

export const metadata = {
  title: "Leadership — Campaign for Sustainable Overreactions",
  description: "Meet the four senior staff guiding the Campaign: Hollis Penderwick, Ansel Drayton, Emmett Landry, and Rory Kellner.",
}

export default function LeadershipPage() {
  return (
    <>
      <Hero
        headline="Leadership"
        subheadline="The Campaign is led by a senior team of four, supported by 47 staff across Portland, Philadelphia, and Boulder."
        image="/sites/carbonneutraloutrage/leadership.png"
      />
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {leaders.map((leader) => (
            <ExecutiveCard
              key={leader.slug}
              name={leader.name}
              title={leader.title}
              credentials="Carbon-Neutral · Audited · Accountable"
              bio={leader.bio}
              highlights={leader.highlights}
              quote={leader.quote}
              image={leader.portraitImage}
            />
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Contact page**

Create `src/sites/carbonneutraloutrage/pages/contact.tsx`. Contact is satirical (an over-engineered "intake form for filing your concern through approved channels") with the real email in small print.

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Contact — Campaign for Sustainable Overreactions",
  description: "Submit your concern through approved channels. Response times vary by category and methodology workload.",
}

const INTAKE_CATEGORIES = [
  { label: "General inquiry", responseTime: "5–7 business days" },
  { label: "Methodology question",  responseTime: "10–14 business days" },
  { label: "Pitchfork library issue", responseTime: "3–5 business days" },
  { label: "Offset purchase support", responseTime: "Same-day (most quarters)" },
  { label: "Press inquiry",           responseTime: "48 hours" },
  { label: "Donor relations",         responseTime: "Coordinated through Director Kellner directly" },
]

export default function ContactPage() {
  return (
    <>
      <Hero
        headline="Contact the Campaign"
        subheadline="All inquiries are routed through the appropriate intake category. Response times reflect the Campaign's methodological workload."
        image="/sites/carbonneutraloutrage/contact.png"
      />

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Intake Categories &amp; Response Times</h2>
          <ul className="border border-accent/30 rounded-lg overflow-hidden bg-white divide-y divide-accent/20">
            {INTAKE_CATEGORIES.map((cat) => (
              <li key={cat.label} className="flex justify-between items-center px-5 py-4">
                <span className="text-foreground/85 font-medium">{cat.label}</span>
                <span className="text-xs text-foreground/60 font-mono">{cat.responseTime}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 p-6 border border-accent/30 rounded-lg bg-background">
            <h3 className="text-lg font-heading font-semibold text-primary mb-3">Mailing Address</h3>
            <p className="text-foreground/70 leading-relaxed">
              Campaign for Sustainable Overreactions<br />
              c/o Regional Cooperative Office<br />
              1842 NE Composting Way, Suite 4B<br />
              Portland, OR 97211
            </p>
          </div>

          <p className="text-xs text-foreground/40 text-center italic mt-12">
            For all routine correspondence: <a href="mailto:bsambrone@gmail.com" className="text-foreground/60 underline hover:text-primary transition-colors">bsambrone@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Privacy page**

Create `src/sites/carbonneutraloutrage/pages/privacy.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Campaign for Sustainable Overreactions",
  description: "How the Campaign processes member data, outrage logs, and offset transaction records.",
}

export default function PrivacyPage() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="The Campaign handles your data with the same rigor we apply to outrage emissions: measured, audited, and disclosed."
      />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80">
          <div className="text-sm bg-secondary/10 border border-primary/20 rounded-lg p-5">
            <p>
              The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
              <a href="https://specificindustries.com/privacy" className="text-primary underline hover:text-secondary transition-colors">
                specificindustries.com/privacy
              </a>{" "}
              and governs all data handling. The sections below describe the Campaign's program-specific practices in addition to the umbrella policy.
            </p>
          </div>

          <h2 className="text-2xl font-heading font-bold text-primary pt-6">§1 — What We Collect</h2>
          <p>
            We collect the information necessary to operate our programs: pledge sign-ups, chapter membership records, pitchfork checkout history, offset transaction records, and Tantrum Footprint Calculator inputs (when voluntarily submitted to a server, which is rare). We do not collect biometric data except where members elect to participate in our voluntary decibel-disclosure program.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§2 — Outrage Logs</h2>
          <p>
            Members of the Verified Outrage Offsets™ program submit incident reports as part of credit purchases. These reports are anonymized in aggregate reporting but retained in identified form for audit purposes for the duration required by our methodology.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§3 — How We Process Your Outrage</h2>
          <p>
            Outrage records submitted to the Campaign are processed under our v4.2 methodology. Inputs are stored in a securely audited database. Aggregated, anonymized statistics are published in our annual State of Responsible Outrage report. Individual records are not shared except as required by IRS reporting obligations or in response to a legitimate research request reviewed by our Methodology Council.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§4 — Cookies</h2>
          <p>
            Our website uses cookies for session continuity and to remember your preferred chapter when you visit the chapter directory. We do not use third-party advertising cookies. We compost expired session data on a rolling 90-day cycle.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§5 — Donor Records</h2>
          <p>
            Donor records are held by Director of Donor Relations Rory Kellner and his team under standard 501(c)(3) confidentiality practices. Lifetime giving records are retained indefinitely as part of our Patron Council infrastructure. Anonymous giving is supported and respected.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§6 — Third Parties</h2>
          <p>
            We share data only with: (a) IRS and state regulators where required, (b) auditors performing our annual financial and methodology audits, and (c) partner reduction-project operators in connection with offset credit retirement. We do not sell data. We have no plans to begin selling data, and the Methodology Council has reviewed and rejected three vendor proposals to that effect since 2022.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§7 — Your Right to Be Forgotten by the Outrage of the Month Club</h2>
          <p>
            Subscribers may unsubscribe from the Outrage of the Month Club at any time by responding to any monthly delivery with the word UNSUBSCRIBE. Pledge memberships, offset purchase records, and credentialing records persist independently of subscription status — these are governed by their respective program retention policies.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§8 — Changes to This Policy</h2>
          <p>
            We update this policy annually, in the spring, in conjunction with our annual report. Substantive changes are summarized in a member-facing email. Editorial revisions are noted in the Methodology Council's quarterly minutes.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Terms page**

Create `src/sites/carbonneutraloutrage/pages/terms.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Campaign for Sustainable Overreactions",
  description: "Membership terms, pitchfork library rules, offset registry conditions, and dispute resolution.",
}

export default function TermsPage() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="Membership, program participation, and registry use are governed by the terms below in addition to the umbrella Specific Industries terms."
      />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80">
          <div className="text-sm bg-secondary/10 border border-primary/20 rounded-lg p-5">
            <p>
              The authoritative terms of use for all Specific Industries properties are maintained at{" "}
              <a href="https://specificindustries.com/terms" className="text-primary underline hover:text-secondary transition-colors">
                specificindustries.com/terms
              </a>.{" "}
              The sections below describe the Campaign's program-specific terms in addition to the umbrella terms.
            </p>
          </div>

          <h2 className="text-2xl font-heading font-bold text-primary pt-6">§1 — Membership</h2>
          <p>
            Campaign membership is open to any individual who has signed the Pledge of Responsible Outrage. Membership is annual, sliding-scale, and may be terminated by either party at any time. Lapsed members forfeit voting rights at the Annual Convening but retain access to the offset registry for previously purchased credits.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§2 — Conduct</h2>
          <p>
            Members agree to engage with civic outrage in a manner consistent with the principles articulated in the Pledge. Repeated non-compliance — including unoffset overreactions exceeding 10 kg CO₂e in a calendar quarter — may result in remedial composting workshop assignment.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§3 — The Tantrum Footprint Methodology</h2>
          <p>
            The Tantrum Footprint methodology is the intellectual property of the Campaign. Use of the methodology in research, publication, or commercial application requires written permission from the Methodology Council. The calculator widget on this site is offered free of charge for individual, non-commercial use.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§4 — Acceptable Use of Reusable Pitchforks</h2>
          <p>
            Pitchforks checked out from a Campaign library are intended for civic engagement, peaceful demonstration, and home-garden use. Pitchforks may not be: (a) painted over the Campaign logo, (b) used in commercial agriculture without supplemental insurance, (c) sub-loaned to non-members, or (d) altered in tine configuration without an authorized sharpening cooperative consultation. Lost or unreturned pitchforks incur a $40 replacement fee.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§5 — Offset Registry</h2>
          <p>
            Verified Outrage Offsets™ are issued under our published v4.2 methodology and retired against documented reduction projects in our partner network. Credits are non-transferable except as part of a formal estate transfer through Director Kellner's office. The Campaign reserves the right to invalidate any credit found to have been issued in error, with prompt refund to the original purchaser.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§6 — Credentialing</h2>
          <p>
            The Certified Responsible Overreactor™ credential is issued by the Campaign and remains valid for five years from the date of issuance, after which renewal is encouraged. The Campaign does not guarantee that the credential will be recognized by any external professional body, regulatory authority, or hiring manager. Holders are encouraged to advocate for the credential's adoption in their respective sectors.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§7 — Disputes</h2>
          <p>
            Disputes arising under these terms shall be resolved first through informal discussion with the relevant program director. Unresolved disputes may be escalated to the Methodology Council, whose decisions are final except in cases involving offset credit invalidation, which may be further appealed to the Campaign's Board of Directors.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§8 — Limitation of Liability</h2>
          <p>
            The Campaign is not responsible for outcomes resulting from the application of its methodology, the use of its calculator, or member participation in any of its programs. Members participate at their own discretion. The Campaign disclaims responsibility for any social, professional, or familial consequences of the Pledge.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§9 — Cap-and-Trade Disputes</h2>
          <p>
            Member-to-member offset credit transfers are not formally supported. Where members nonetheless attempt such transfers, the Campaign disclaims all responsibility for valuation disputes, fractional-credit accounting, or the cascading reputational consequences of an unrecognized transfer.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 5: Register the four pages**

In `src/sites/carbonneutraloutrage/index.ts`, add imports:

```typescript
import LeadershipPage, { metadata as leadershipMetadata } from "./pages/leadership"
import ContactPage, { metadata as contactMetadata } from "./pages/contact"
import PrivacyPage, { metadata as privacyMetadata } from "./pages/privacy"
import TermsPage, { metadata as termsMetadata } from "./pages/terms"
```

And add to the `pages` map:

```typescript
  "leadership": { component: LeadershipPage, metadata: leadershipMetadata },
  "contact": { component: ContactPage, metadata: contactMetadata },
  "privacy": { component: PrivacyPage, metadata: privacyMetadata },
  "terms": { component: TermsPage, metadata: termsMetadata },
```

- [ ] **Step 6: Verify**

Run `npx tsc --noEmit && npm run lint`. Expected: pass.

- [ ] **Step 7: Commit**

```bash
git add src/sites/carbonneutraloutrage/pages/leadership.tsx src/sites/carbonneutraloutrage/pages/contact.tsx src/sites/carbonneutraloutrage/pages/privacy.tsx src/sites/carbonneutraloutrage/pages/terms.tsx src/sites/carbonneutraloutrage/index.ts
git commit -m "feat(carbonneutraloutrage): add leadership, contact, privacy, terms pages"
```

---

## Task 14: Sitemap Update

Add program detail pages to the global sitemap.

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Import the programs array**

In `src/app/sitemap.ts`, add this import alongside the others (alphabetically near `terrorclownProducts`):

```typescript
import { programs as carbonneutraloutragePrograms } from "@/sites/carbonneutraloutrage/data/programs"
```

- [ ] **Step 2: Emit the program detail URLs**

Add a new block after the existing per-site dynamic-route blocks (e.g., right before the `return urls` line):

```typescript
  // Carbon-Neutral Outrage: program detail pages at /programs/{slug}
  for (const program of carbonneutraloutragePrograms) {
    urls.push({ url: siteUrl("carbonneutraloutrage", `programs/${program.slug}`) })
  }
```

- [ ] **Step 3: Verify**

Run `npx tsc --noEmit && npm run lint`. Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(sitemap): include carbonneutraloutrage program detail pages"
```

---

## Task 15: Image Generation Script

Generate all 28 images in one script, following the established `scripts/generate-*-images.ts` pattern. The script uses OpenAI's `gpt-image-1` model and the project's `BASE_IMAGES_DIR` for the four canonical leader photos.

**Files:**
- Create: `scripts/generate-carbonneutraloutrage-images.ts`

- [ ] **Step 1: Write the script**

Create `scripts/generate-carbonneutraloutrage-images.ts`. Mirror the structure of `scripts/generate-elderparty-images.ts` (helpers `generateImage` and `generateImageWithPerson` for solo and person-anchored generation respectively). Output directory is `public/sites/carbonneutraloutrage/`.

```typescript
/**
 * Generate all Campaign for Sustainable Overreactions images.
 *
 * Usage:  npx tsx scripts/generate-carbonneutraloutrage-images.ts
 *
 * Reads OPENAI_API_KEY from .env. Outputs to public/sites/carbonneutraloutrage/.
 * Skips images that already exist (delete a file to regenerate it).
 */

import OpenAI, { toFile } from "openai"
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"

const envPath = path.resolve(__dirname, "../.env")
const envContents = readFileSync(envPath, "utf-8")
for (const line of envContents.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/)
  if (match) process.env[match[1]] = match[2]
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUT_DIR = path.resolve(__dirname, "../public/sites/carbonneutraloutrage")
const PROGRAMS_DIR = path.join(OUT_DIR, "programs")
const LEADERS_DIR = path.join(OUT_DIR, "leaders")
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images")

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(PROGRAMS_DIR, { recursive: true })
mkdirSync(LEADERS_DIR, { recursive: true })

function getPersonPhotos(name: string, count = 2): string[] {
  const dir = path.join(BASE_IMAGES_DIR, name)
  const files = readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  const shuffled = [...files].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((f) => path.join(dir, f))
}

async function generateImage(
  filename: string,
  prompt: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
  outDir: string = OUT_DIR,
) {
  const outPath = path.join(outDir, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`)
    return
  }
  console.log(`  GEN   ${filename} ...`)
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt,
    size,
    quality: "high",
  })
  const b64 = (response as any).data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

async function generateImageWithPerson(
  filename: string,
  prompt: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
  outDir: string = OUT_DIR,
) {
  const outPath = path.join(outDir, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`)
    return
  }
  const photos = getPersonPhotos(person)
  console.log(`  GEN   ${filename} (person: ${person}) ...`)
  const mimeTypes: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" }
  const files = await Promise.all(
    photos.map(async (p) => {
      const ext = path.extname(p).toLowerCase()
      return toFile(readFileSync(p), path.basename(p), { type: mimeTypes[ext] ?? "image/jpeg" })
    }),
  )
  const response = await openai.images.edit({
    model: "gpt-image-1" as any,
    image: files,
    prompt,
    size,
    quality: "high",
  } as any)
  const b64 = (response as any).data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

// ---------------------------------------------------------------------------
// Style anchors
// ---------------------------------------------------------------------------

const NGO_STYLE = "Modern NGO photography, warm natural lighting, soft cinematic depth of field, recycled-paper cream and sage green color palette with terracotta accents, photorealistic, magazine-quality, considered composition."

const ANGRY_LEADER_STYLE = `${NGO_STYLE} Subject's facial expression: visibly furious — clenched jaw, narrowed eyes, brows tightly furrowed, mouth tight. Composition is otherwise standard executive portrait: shallow depth of field, out-of-focus bookshelf or leafy plant background, earnest mid-career nonprofit director wardrobe (fleece vest over flannel, or linen blazer over a henley, in sage/terracotta/oatmeal tones).`

// ---------------------------------------------------------------------------
// Page heroes
// ---------------------------------------------------------------------------

async function pageHeroes() {
  console.log("\n— Page heroes —")
  await generateImage(
    "hero.png",
    `${NGO_STYLE} Wide composite hero scene: a calm group of diverse adults in earth-toned outdoor gear standing in front of a wind turbine at golden hour, several holding bamboo-handled pitchforks at rest. The mood is purposeful but composed — civic engagement rendered with the visual language of an environmental NGO annual report. Aspect ratio favors landscape framing.`,
    "1536x1024",
  )
  await generateImage("about.png", `${NGO_STYLE} Editorial photo of a small group portrait in a sunlit nonprofit office — diverse adults in earth-tone professional dress, framed prints of methodology diagrams behind them, the feeling of a founding-team archive image.`, "1536x1024")
  await generateImage("programs.png", `${NGO_STYLE} Overhead flatlay arrangement of program iconography: a bamboo pitchfork, a recycled cardboard box marked 'Carbon-Neutral Outrage Kit', a calculator, a small potted seedling, and a leather-bound credential folder — arranged on a recycled-paper backdrop.`, "1536x1024")
  await generateImage("impact.png", `${NGO_STYLE} Editorial photograph of a printed annual report cover lying open on a wooden table, with a steaming mug of tea beside it, soft afternoon light. The visible page shows abstract bar-chart graphics in evergreen and terracotta.`, "1536x1024")
  await generateImage("take-action.png", `${NGO_STYLE} A small orderly group of adults standing in a community garden holding signs (signs are out of focus / illegible), one person in mid-conversation with another, atmosphere is calm and organized rather than confrontational.`, "1536x1024")
  await generateImage("donate.png", `${NGO_STYLE} An open hardcover ledger book on a wooden desk with a Campaign-branded fountain pen resting beside it, sage-green bookmark ribbon, soft window light. Magazine-quality, intimate, signaling stewardship.`, "1536x1024")
  await generateImage("leadership.png", `${NGO_STYLE} A wide office hallway with framed black-and-white portraits of Campaign leaders along one wall, sage and terracotta accent on a feature wall, plants and natural light.`, "1536x1024")
  await generateImage("contact.png", `${NGO_STYLE} A vintage rotary telephone resting on a stack of recycled-paper folders, beside a small potted succulent, on a reclaimed-wood desk. Warm ambient lighting.`, "1536x1024")
}

// ---------------------------------------------------------------------------
// Program heroes
// ---------------------------------------------------------------------------

async function programHeroes() {
  console.log("\n— Program heroes —")
  await generateImage("outrage-kits.png", `${NGO_STYLE} Studio photo of a recycled cardboard kit box (open), contents arranged neatly: soy-ink slogan stencils, foam fingers in muted terracotta, a small protest sign on a bamboo dowel, a paper offset certificate. Top-down composition on cream linen.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("reusable-pitchforks.png", `${NGO_STYLE} Beautifully crafted bamboo-handled pitchfork lying on a workbench beside a sharpening stone, tine cap visible, soft natural light. Patagonia-magazine style still life.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("outrage-of-the-month.png", `${NGO_STYLE} A subscription box on a kitchen table with brown kraft packaging and a Campaign logo seal, accompanied by an opened printed bulletin in evergreen and terracotta typography. Morning light.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("outrage-offsets.png", `${NGO_STYLE} A printed Verified Outrage Offsets™ certificate framed on a wooden desk, alongside a fountain pen and a half-drunk mug of tea. The certificate's seal is visible but illegible.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("tantrum-footprint.png", `${NGO_STYLE} A laptop on a desk displaying an abstract calculator interface with simple sliders and bar-graph output in evergreen and terracotta — UI is suggestive rather than legible. Plant in the background.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("reforestation-through-rage.png", `${NGO_STYLE} Aerial photograph of a freshly planted reforestation site: orderly rows of saplings in protective tubes across rolling green hills, late-afternoon light.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("composted-hot-takes.png", `${NGO_STYLE} A cor-ten steel municipal composting bin in a leafy community garden setting, subtle sage-green CSO logo on the side, dappled afternoon light, recycled-paper signage above.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("certified-overreactor.png", `${NGO_STYLE} A leather-bound credential folder open on a desk showing a printed Certified Responsible Overreactor™ certificate, lapel pin, and wallet card. Refined still-life composition.`, "1536x1024", PROGRAMS_DIR)
}

// ---------------------------------------------------------------------------
// Leader portraits — all visibly angry, jim/Emmett the angriest
// ---------------------------------------------------------------------------

async function leaderPortraits() {
  console.log("\n— Leader portraits —")
  await generateImageWithPerson(
    "hollis-penderwick.png",
    `${ANGRY_LEADER_STYLE} Founder & Executive Director of an environmental nonprofit. Restrained anger — the kind of fury that smiles for the camera through gritted teeth. Composition: head-and-shoulders portrait, slight three-quarter angle, out-of-focus bookshelf background.`,
    "bill",
    "1024x1024",
    LEADERS_DIR,
  )
  await generateImageWithPerson(
    "ansel-drayton.png",
    `${ANGRY_LEADER_STYLE} Director of Research at a climate-adjacent NGO. Visible barely-controlled fury, brows knit, mouth tight. Composition: head-and-shoulders portrait against a softly-lit cream wall with framed methodology diagrams partially visible.`,
    "brandon",
    "1024x1024",
    LEADERS_DIR,
  )
  await generateImageWithPerson(
    "emmett-landry.png",
    `${ANGRY_LEADER_STYLE} Chief Impact Officer photographed in full red-faced rage — nostrils flared, mouth tight, eyes burning. The angriest possible expression, but composition is otherwise refined nonprofit-executive portraiture: shallow depth of field, out-of-focus plants behind. The contrast between rage and composition is the entire point.`,
    "jim",
    "1024x1024",
    LEADERS_DIR,
  )
  await generateImageWithPerson(
    "rory-kellner.png",
    `${ANGRY_LEADER_STYLE} Director of Donor Relations. Restrained, simmering fury behind a slightly-too-tight smile, eyes narrowed. Composition: head-and-shoulders against a softly-lit office background with a single visible plant and abstract evergreen artwork.`,
    "sean",
    "1024x1024",
    LEADERS_DIR,
  )
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  await pageHeroes()
  await programHeroes()
  await leaderPortraits()
  console.log("\nAll images generated.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 2: Run the script**

```bash
npx tsx scripts/generate-carbonneutraloutrage-images.ts
```

This will take 5–15 minutes depending on API throughput. The script skips files that already exist, so it can be safely re-run.

Expected output: 28 PNG files written under `public/sites/carbonneutraloutrage/`, `public/sites/carbonneutraloutrage/programs/`, and `public/sites/carbonneutraloutrage/leaders/`.

- [ ] **Step 3: Spot-check the leader portraits**

Open the four leader portraits in an image viewer. Confirm:
- All four are visibly angry
- Emmett (jim) is noticeably angrier than the other three
- Each portrait matches the canonical face for its `person` (bill, brandon, jim, sean)

If any portrait fails one of those checks, delete the file and re-run the script (it will regenerate only the missing ones).

- [ ] **Step 4: Commit the script and the images**

```bash
git add scripts/generate-carbonneutraloutrage-images.ts public/sites/carbonneutraloutrage/
git commit -m "feat(carbonneutraloutrage): generate site imagery (heroes, programs, angry leader portraits)"
```

---

## Task 16: Favicon

Generate the 64×64 favicon and register it for future resize passes.

**Files:**
- Create: `public/sites/carbonneutraloutrage/favicon.png`
- Modify: `scripts/resize-favicons.mjs`

- [ ] **Step 1: Create the favicon source**

Crop or downsample one of the existing CSO assets — the `programs.png` flatlay, the bamboo pitchfork still life from `programs/reusable-pitchforks.png`, or generate a dedicated favicon-source. The simplest path: use the bamboo pitchfork program hero and crop to a tight square at 64×64 with high contrast against a cream background.

Either approach (manual crop or new gen call), the result must be saved at `public/sites/carbonneutraloutrage/favicon.png` at 64×64 pixels (retina 2x of 32px).

If generating fresh, append this block to the script's `pageHeroes` function and re-run:

```typescript
await generateImage(
  "favicon.png",
  "Square crest icon at small size — a stylized bamboo pitchfork crossed with a leafy branch, on a cream/recycled-paper background, evergreen and terracotta accents. Iconographic, simple, must read at 16-32px. Centered composition with even margins.",
  "1024x1024",
)
```

Then downsample the resulting 1024×1024 to 64×64 using whatever image tool is convenient (e.g., open in Preview or run through `sharp`).

- [ ] **Step 2: Register in the resize script**

In `scripts/resize-favicons.mjs`, find the hardcoded `sites` array and add `"carbonneutraloutrage"` to it (the script processes all listed sites' favicon assets when run in maintenance mode).

- [ ] **Step 3: Verify**

Visit `localhost:3000/sites/carbonneutraloutrage/favicon.png` (after `npm run dev`) and confirm the file loads. Open the file at 32×32 and 16×16 — confirm the icon is still legible.

- [ ] **Step 4: Commit**

```bash
git add public/sites/carbonneutraloutrage/favicon.png scripts/resize-favicons.mjs
git commit -m "feat(carbonneutraloutrage): add favicon and register in resize script"
```

---

## Task 17: Full-Site Smoke Test

End-to-end verification across every page. No code changes — just confirming everything renders.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Visit each route and visually verify**

In a browser, visit each URL with the `?site=carbonneutraloutrage` query parameter (the sticky `dev-site` cookie will keep subsequent navigation in scope):

- `http://localhost:3000/?site=carbonneutraloutrage` — home; hero image loads, four featured programs visible, impact ticker on dark green
- `http://localhost:3000/programs?site=carbonneutraloutrage` — all 8 program cards visible
- `http://localhost:3000/programs/outrage-kits` — first program detail; testimonials grid shows 8 portraits
- `http://localhost:3000/programs/tantrum-footprint` — calculator widget appears, accepts inputs, returns a result
- `http://localhost:3000/programs/outrage-of-the-month` — past-issues archive of 12 entries appears
- `http://localhost:3000/about` — founding story visible
- `http://localhost:3000/impact` — bar chart and donut chart render
- `http://localhost:3000/take-action` — pledge ordered list, chapter cards, events list, pledge form submits to confirmation state
- `http://localhost:3000/donate` — six tier cards, clicking one shows the form, submitting shows confirmation
- `http://localhost:3000/donate?program=reusable-pitchforks` — hero copy mentions "The Reusable Pitchfork Initiative"
- `http://localhost:3000/leadership` — four ExecutiveCards, all visibly angry portraits
- `http://localhost:3000/contact` — intake categories table; bsambrone@gmail.com appears in small print
- `http://localhost:3000/privacy` — umbrella callout block at top, then numbered satirical sections
- `http://localhost:3000/terms` — same shape as privacy

- [ ] **Step 3: Visit a known-bad slug**

`http://localhost:3000/programs/this-does-not-exist?site=carbonneutraloutrage`

Expected: Next.js 404 (the `isValidSlug` returns false).

- [ ] **Step 4: Check the sitemap**

`http://localhost:3000/sitemap.xml`

Search for `carbonneutraloutrage`. Expected: 10 static-page URLs + 8 `programs/<slug>` URLs.

- [ ] **Step 5: Stop the dev server. If anything failed, fix and re-verify before committing or moving on.**

- [ ] **Step 6: Run the full type check + lint one more time**

```bash
npx tsc --noEmit
npm run lint
```

Both must pass before marking this task complete.

- [ ] **Step 7: Commit any small fixes (if needed)**

If anything required a code fix during smoke testing, commit it now with a focused message.

---

## Notes for the Implementing Engineer

- **Apex cross-site touchpoints are automatic** — once the site is registered with `verticalKey: "hygiene-wellness"` (Task 1) and `data/leadership.ts` exists with `person:` fields (Task 3), the apex `/portfolio` page and Leader Detail pages pick up the Campaign automatically. No apex code changes are required.
- **Featured Holdings on apex (`src/sites/apex/data/featured.ts`) is editorial.** Do not edit it as part of this site's launch unless the user asks for a CSO spotlight.
- **The script in Task 15 is idempotent** — it skips files that already exist. To regenerate a single image, delete it from `public/sites/carbonneutraloutrage/` and re-run the script.
- **The dev server's sticky `dev-site` cookie** keeps subsequent client-side `<Link>` navigation in CSO scope after the first `?site=carbonneutraloutrage` visit. Use `?site=apex` to switch back, or clear cookies.
- **The four canonical leaders' face matching is critical.** If a portrait's face does not match its `person` field, apex's Leader Detail page will show the wrong visual for that person. Re-generate any mismatch.
