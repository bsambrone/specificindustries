# Grass Fed WiFi Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `grassfedwifi` subdomain site: a seasonal-CSA co-op satire selling "Raw Spectrum" wifi memberships, with 3 winery-tiered shares, seasonal add-ons, a 12-month harvest calendar, territorial grazing map, farmer-steward leadership, and field notes editorial — following all established multi-site patterns in the codebase.

**Architecture:** New site module at `src/sites/grassfedwifi/` registered in both `src/sites/registry.ts` and `src/sites/subdomains.ts`. Uses the existing catch-all route, theme-via-CSS-variables system, shared cart provider, and shared UI components. Two dynamic routes: `shares/{slug}` and `field-notes/{slug}`. Commerce-enabled with re-themed cart ("My Share") and checkout ("Become a Member") pages.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, next/font/google (Fraunces + Nunito added), Playwright smoke tests.

**Spec:** `docs/superpowers/specs/2026-04-05-grassfedwifi-design.md`

---

## File Structure

### New files

```
src/sites/grassfedwifi/
├── config.ts                     # SiteConfig
├── index.ts                      # barrel: config, pages, dynamicRoutes
├── data/
│   ├── shares.ts                 # Share interface + catalog + getShareBySlug
│   ├── seasonal-addons.ts        # SeasonalAddon interface + catalog
│   ├── harvest-calendar.ts       # 12-month HarvestMonth data
│   ├── farmers.ts                # farmer-steward team data
│   ├── grazing-lands.ts          # farm-site profile data
│   └── field-notes.ts            # FieldNote interface + posts + getFieldNoteBySlug
└── pages/
    ├── home.tsx
    ├── shares.tsx
    ├── share-detail.tsx
    ├── harvest-calendar.tsx
    ├── grazing-lands.tsx
    ├── the-pasture.tsx
    ├── meet-the-farmers.tsx
    ├── field-notes.tsx
    ├── field-note-detail.tsx
    ├── contact.tsx
    ├── join.tsx
    ├── my-share.tsx              # re-themed cart
    ├── become-a-member.tsx       # re-themed checkout
    ├── privacy.tsx
    └── terms.tsx

scripts/
└── generate-grassfedwifi-images.ts   # image generation (optional, requires OPENAI_API_KEY)
```

### Modified files

- `src/themes/fonts.ts` — add Fraunces + Nunito
- `src/sites/registry.ts` — register grassfedwifi
- `src/sites/subdomains.ts` — add grassfedwifi to VALID_SUBDOMAINS
- `e2e/smoke.spec.ts` — add grassfedwifi entry

---

## Task 1: Add Fraunces + Nunito Fonts

**Files:**
- Modify: `src/themes/fonts.ts`

- [ ] **Step 1: Edit fonts.ts — add imports**

Change the first line of `src/themes/fonts.ts` from:
```typescript
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed } from "next/font/google"
```
to:
```typescript
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed, Fraunces, Nunito } from "next/font/google"
```

- [ ] **Step 2: Add font declarations after `barlowCondensed`**

Insert after the `barlowCondensed` declaration (line 28):

```typescript
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
})
```

- [ ] **Step 3: Add entries to `fontInstanceMap`**

Update the map to include both new fonts:
```typescript
const fontInstanceMap: Record<string, { variable: string }> = {
  inter,
  playfair: playfairDisplay,
  "space-grotesk": spaceGrotesk,
  poppins,
  "barlow-condensed": barlowCondensed,
  fraunces,
  nunito,
}
```

- [ ] **Step 4: Add entries to `fontFamilyMap`**

Update the map to include both new fonts:
```typescript
export const fontFamilyMap: Record<string, string> = {
  inter: "'Inter', sans-serif",
  playfair: "'Playfair Display', serif",
  "space-grotesk": "'Space Grotesk', sans-serif",
  poppins: "'Poppins', sans-serif",
  "barlow-condensed": "'Barlow Condensed', sans-serif",
  fraunces: "'Fraunces', serif",
  nunito: "'Nunito', sans-serif",
}
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/themes/fonts.ts
git commit -m "feat: add Fraunces and Nunito fonts for grassfedwifi site"
```

---

## Task 2: Scaffold Site + Register + Add Failing Smoke Test

**Files:**
- Create: `src/sites/grassfedwifi/config.ts`
- Create: `src/sites/grassfedwifi/index.ts`
- Create: `src/sites/grassfedwifi/pages/home.tsx` (stub)
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`
- Modify: `e2e/smoke.spec.ts`

- [ ] **Step 1: Create the config**

Create `src/sites/grassfedwifi/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Grass Fed WiFi",
  subdomain: "grassfedwifi",
  theme: {
    preset: "pastoral",
    colors: {
      primary: "#87A96B",
      secondary: "#A8C8E0",
      accent: "#E8D5A2",
      background: "#FAF7F0",
      text: "#2D4A2B",
    },
    fonts: {
      heading: "fraunces",
      body: "nunito",
    },
  },
  metadata: {
    title: "Grass Fed WiFi — Farm-to-Table Wi-Fi",
    description: "Raw Spectrum. Pasture-Raised Connectivity. Small-batch, single-origin, seasonally harvested wifi from our frequency-farm co-op.",
  },
  nav: [
    { label: "Shares", path: "/shares" },
    { label: "Harvest Calendar", path: "/harvest-calendar" },
    { label: "Grazing Lands", path: "/grazing-lands" },
    { label: "The Pasture", path: "/the-pasture" },
    { label: "Field Notes", path: "/field-notes" },
    { label: "Join the Co-op", path: "/join" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create a stub home page**

Create `src/sites/grassfedwifi/pages/home.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export default function GrassFedWiFiHome() {
  return (
    <Hero
      headline="Raw Spectrum. Pasture-Raised Connectivity."
      subheadline="Farm-to-Table Wi-Fi. Small-batch. Single-origin. Seasonally harvested."
      ctaText="Join the Co-op"
      ctaHref="/join"
      secondaryCtaText="Explore Shares"
      secondaryCtaHref="/shares"
      image="/sites/grassfedwifi/home-hero.png"
    />
  )
}
```

- [ ] **Step 3: Create the barrel index**

Create `src/sites/grassfedwifi/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import GrassFedWiFiHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": GrassFedWiFiHome,
}

export const dynamicRoutes = {}
```

- [ ] **Step 4: Register the site in `src/sites/registry.ts`**

Add the import at the top with the other site imports:
```typescript
import { config as grassfedwifiConfig, pages as grassfedwifiPages, dynamicRoutes as grassfedwifiDynamicRoutes } from "./grassfedwifi"
```

Add this entry to the `siteRegistry` object (after `truegrit`):
```typescript
  grassfedwifi: { config: grassfedwifiConfig, pages: grassfedwifiPages, dynamicRoutes: grassfedwifiDynamicRoutes },
```

- [ ] **Step 5: Add grassfedwifi to `src/sites/subdomains.ts`**

Add `"grassfedwifi"` to the `VALID_SUBDOMAINS` array:
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
] as const
```

- [ ] **Step 6: Add failing smoke test entry**

In `e2e/smoke.spec.ts`, add this entry to the `sites` array (after `truegrit`):
```typescript
  {
    key: "grassfedwifi",
    path: "/?site=grassfedwifi",
    headline: "Raw Spectrum. Pasture-Raised Connectivity.",
    name: "Grass Fed WiFi",
  },
```

- [ ] **Step 7: Run the smoke test for grassfedwifi**

Run: `npx playwright test e2e/smoke.spec.ts -g "grassfedwifi home page"`
Expected: PASS (stub home page renders hero correctly, header/footer render from shared components, site name appears in header)

If it fails with console errors about missing images, that's expected — we'll generate images later. The other assertions should pass.

- [ ] **Step 8: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add src/sites/grassfedwifi src/sites/registry.ts src/sites/subdomains.ts e2e/smoke.spec.ts
git commit -m "feat: scaffold grassfedwifi site with stub home page and smoke test"
```

---

## Task 3: Create Shares + Seasonal Add-ons Data

**Files:**
- Create: `src/sites/grassfedwifi/data/shares.ts`
- Create: `src/sites/grassfedwifi/data/seasonal-addons.ts`

- [ ] **Step 1: Create Shares data file**

Create `src/sites/grassfedwifi/data/shares.ts`:

```typescript
export interface Share {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  includes: string[]
  bandwidth: string
  allocation: string
  seasonalAddonsIncluded: number | "all"
  disclaimers: string[]
}

export const shares: Share[] = [
  {
    slug: "heirloom",
    name: "Heirloom Share",
    price: 39,
    priceLabel: "$39/month",
    tagline: "Classic free-roaming signal. Our original recipe, unchanged since the co-op's founding.",
    description: [
      "The Heirloom Share is where every member begins. It is the recipe Hollis wrote down on the back of a feed bag in the co-op's first winter, and we have not changed a single ingredient since.",
      "This is unpasteurized signal in its most honest form. A generous, unpasteurized pour, suited to a single household that values authenticity over throughput and is willing to work around the rhythms of the harvest.",
    ],
    image: "/sites/grassfedwifi/share-heirloom.png",
    includes: [
      "Unlimited free-range browsing",
      "Stone-ground DNS (coarse grind, full character)",
      "Monthly farmer newsletter",
      "Access to the members-only harvest alerts",
    ],
    bandwidth: "A generous, unpasteurized pour",
    allocation: "Single household",
    seasonalAddonsIncluded: 0,
    disclaimers: [
      "Signal quality varies with weather, lunar cycles, and the moods of the pasture.",
      "Seasonal add-ons available for separate purchase.",
    ],
  },
  {
    slug: "reserve",
    name: "Reserve Share",
    price: 79,
    priceLabel: "$79/month",
    tagline: "Small-batch signal aged in oak-lined server rooms. Hand-selected frequencies.",
    description: [
      "The Reserve Share is for members who have moved past the entry tier and want something with more structure. We age these packets in oak-lined server rooms, hand-selecting the frequencies that carry the deepest notes.",
      "Includes priority signal access during allocation hours and a quarterly invitation to tour the frequency pastures in person. Family-sized — connect up to six devices without diluting the pour.",
    ],
    image: "/sites/grassfedwifi/share-reserve.png",
    includes: [
      "Everything in Heirloom",
      "Small-batch, barrel-aged packets",
      "Priority signal access during allocation hours",
      "One rotating seasonal add-on (member's choice)",
      "Quarterly farm tour invitation",
    ],
    bandwidth: "Small-batch, barrel-aged packets",
    allocation: "Family share (up to 6 devices)",
    seasonalAddonsIncluded: 1,
    disclaimers: [
      "Oak-aging imparts tannins to the signal. This is a feature.",
      "Farm tours occur at dawn and do not involve WiFi.",
    ],
  },
  {
    slug: "estate",
    name: "Estate Share",
    price: 149,
    priceLabel: "$149/month",
    tagline: "Hand-churned packets from our highest pastures. Limited availability. Allocated by committee.",
    description: [
      "The Estate Share is the co-op's highest allocation, hand-churned from the packets harvested on our upland frequency pastures. Membership is limited, allocated annually by committee, and cannot be rushed.",
      "Members receive every seasonal add-on, a dedicated farmer-steward contact, and an engraving of their name on the co-op barn's south wall. An annual harvest-supper invitation is extended to all Estate members and their households.",
    ],
    image: "/sites/grassfedwifi/share-estate.png",
    includes: [
      "Everything in Reserve",
      "Unlimited hand-churned throughput",
      "All four seasonal add-ons, included",
      "Dedicated farmer-steward contact",
      "Name hand-carved into the co-op barn's south wall",
      "Annual harvest-supper invitation (household of four)",
    ],
    bandwidth: "Unlimited hand-churned throughput",
    allocation: "Community share (household + small business, unlimited devices)",
    seasonalAddonsIncluded: "all",
    disclaimers: [
      "Committee allocation decisions are final. Written appeals may be submitted by carrier pigeon.",
      "Barn engravings are permanent but may weather.",
    ],
  },
]

export function getShareBySlug(slug: string): Share | undefined {
  return shares.find((s) => s.slug === slug)
}

export const shareQuips = [
  "Your share is growing.",
  "Committee notified.",
  "A packet is being hand-selected.",
  "The farmer nods approvingly.",
  "Another mason jar filled.",
]
```

- [ ] **Step 2: Create Seasonal Add-ons data file**

Create `src/sites/grassfedwifi/data/seasonal-addons.ts`:

```typescript
export interface SeasonalAddon {
  slug: string
  name: string
  availability: string
  months: number[]
  price: number
  priceLabel: string
  tagline: string
  description: string
  image: string
}

export const seasonalAddons: SeasonalAddon[] = [
  {
    slug: "spring-pollen",
    name: "Spring Pollen Pack",
    availability: "Mar–May",
    months: [3, 4, 5],
    price: 19,
    priceLabel: "$19/quarter",
    tagline: "Delicate early-season frequencies, perfect for video calls.",
    description:
      "Collected at dawn from the co-op's eastern meadows during the first pollen drift. The frequencies carry a faint floral signature that lingers through most video calls.",
    image: "/sites/grassfedwifi/seasonal-spring.png",
  },
  {
    slug: "summer-solstice",
    name: "Summer Solstice Bundle",
    availability: "Jun–Aug",
    months: [6, 7, 8],
    price: 19,
    priceLabel: "$19/quarter",
    tagline: "Peak bandwidth at maximum daylight. Sun-ripened packets.",
    description:
      "Harvested at peak daylight, these sun-ripened packets carry the warmth of the longest days. Full-bodied. Robust. Occasionally sunburned.",
    image: "/sites/grassfedwifi/seasonal-summer.png",
  },
  {
    slug: "harvest-moon",
    name: "Harvest Moon Premium",
    availability: "Sep–Nov",
    months: [9, 10, 11],
    price: 29,
    priceLabel: "$29/quarter",
    tagline: "The richest signal of the year, gathered at peak density.",
    description:
      "The co-op's most celebrated seasonal offering. Gathered during the autumn density peak, these packets have a depth and richness that members describe as 'almost overwhelming.'",
    image: "/sites/grassfedwifi/seasonal-harvest.png",
  },
  {
    slug: "winter-reserve",
    name: "Winter Reserve",
    availability: "Dec–Feb",
    months: [12, 1, 2],
    price: 19,
    priceLabel: "$19/quarter",
    tagline: "Slow-signal, cold-pressed bandwidth for quiet months.",
    description:
      "A meditative offering. Cold-pressed during the quiet months, this signal moves slowly and encourages the same of its recipients.",
    image: "/sites/grassfedwifi/seasonal-winter.png",
  },
]

export function getSeasonalAddonBySlug(slug: string): SeasonalAddon | undefined {
  return seasonalAddons.find((a) => a.slug === slug)
}

export function getCurrentAddon(): SeasonalAddon | undefined {
  const month = new Date().getMonth() + 1 // 1-12
  return seasonalAddons.find((a) => a.months.includes(month))
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/sites/grassfedwifi/data/shares.ts src/sites/grassfedwifi/data/seasonal-addons.ts
git commit -m "feat: add grassfedwifi shares and seasonal add-ons data"
```

---

## Task 4: Create Harvest Calendar Data

**Files:**
- Create: `src/sites/grassfedwifi/data/harvest-calendar.ts`

- [ ] **Step 1: Create harvest calendar with 12 months**

Create `src/sites/grassfedwifi/data/harvest-calendar.ts`:

```typescript
export interface HarvestMonth {
  month: number         // 1-12
  name: string
  inSeason: string
  pairsWellWith: string
  harvestNotes: string
  featuredAddonSlug?: string
}

export const harvestCalendar: HarvestMonth[] = [
  {
    month: 1,
    name: "January",
    inSeason: "2.4 GHz, cold-pressed, with a faint mineral note",
    pairsWellWith: "bone broth, knit sweaters, browser-tab meditation",
    harvestNotes:
      "The quietest month. We gather in low light, moving slowly, letting the signal come to us. Members report a deeper sense of presence on video calls.",
    featuredAddonSlug: "winter-reserve",
  },
  {
    month: 2,
    name: "February",
    inSeason: "2.4 GHz with early-thaw undertones",
    pairsWellWith: "sourdough fermentation, sock-darning, short emails",
    harvestNotes:
      "The ground is still firm, but the packets are beginning to stir. A good month for heavy downloads that you intend to actually finish.",
    featuredAddonSlug: "winter-reserve",
  },
  {
    month: 3,
    name: "March",
    inSeason: "3.6 GHz, first-flush, pollen-adjacent",
    pairsWellWith: "seedling trays, bee-related anxiety, honest video calls",
    harvestNotes:
      "The first warm frequencies of the year. Thin but promising. We do not rush the March harvest — hurry produces bitterness in the signal.",
    featuredAddonSlug: "spring-pollen",
  },
  {
    month: 4,
    name: "April",
    inSeason: "4.2 GHz coming in strong, pollen-dusted packets",
    pairsWellWith: "sourdough starters, balcony gardening, lukewarm video calls",
    harvestNotes:
      "A gentle month. We hand-gather packets at dawn, before the bees wake. Expect occasional gaps during afternoon thunderstorms — these are features, not bugs.",
    featuredAddonSlug: "spring-pollen",
  },
  {
    month: 5,
    name: "May",
    inSeason: "4.8 GHz, full-pollen, with a green-hay finish",
    pairsWellWith: "fermentation projects, new notebooks, slow podcasts",
    harvestNotes:
      "The co-op's busiest month. Every hand is in the pasture. Connection speeds are high but allocation hours are strict.",
    featuredAddonSlug: "spring-pollen",
  },
  {
    month: 6,
    name: "June",
    inSeason: "5.0 GHz, sun-ripened, early-solstice",
    pairsWellWith: "outdoor work, cold soup, long async messages",
    harvestNotes:
      "The sun does most of the work. We supervise. Members should expect a noticeable warmth in their downloads.",
    featuredAddonSlug: "summer-solstice",
  },
  {
    month: 7,
    name: "July",
    inSeason: "5.4 GHz, peak solstice, full-body packets",
    pairsWellWith: "stone fruit, river swims, long-form writing",
    harvestNotes:
      "The richest-feeling signal of the summer. Members are advised to hydrate during heavy downloads.",
    featuredAddonSlug: "summer-solstice",
  },
  {
    month: 8,
    name: "August",
    inSeason: "5.2 GHz, late-solstice, drying",
    pairsWellWith: "peach preserves, longer walks, unread newsletters",
    harvestNotes:
      "The packets begin to cure. Slightly drier than July but with more character. A member favorite.",
    featuredAddonSlug: "summer-solstice",
  },
  {
    month: 9,
    name: "September",
    inSeason: "5.6 GHz, first-harvest density",
    pairsWellWith: "new-school-year anxiety, apple butter, blurry video calls",
    harvestNotes:
      "The density arrives. Members should brace themselves for the first true taste of the autumn reserve.",
    featuredAddonSlug: "harvest-moon",
  },
  {
    month: 10,
    name: "October",
    inSeason: "6.0 GHz, peak density, harvest moon",
    pairsWellWith: "candles, root vegetables, deep-work sessions",
    harvestNotes:
      "Our most celebrated month. The signal is at its richest. Estate Share members are welcomed to the harvest supper.",
    featuredAddonSlug: "harvest-moon",
  },
  {
    month: 11,
    name: "November",
    inSeason: "5.8 GHz, late-harvest, cooling",
    pairsWellWith: "gratitude journals, stew, slower morning calls",
    harvestNotes:
      "The packets begin to settle. Connection speeds decline slightly but complexity increases.",
    featuredAddonSlug: "harvest-moon",
  },
  {
    month: 12,
    name: "December",
    inSeason: "2.4 GHz, quiet, with faint solstice undertones",
    pairsWellWith: "candlelight, handwritten letters, brief video calls",
    harvestNotes:
      "The co-op slows. We hand-package the year's reserve and rest. The signal is thin but deeply intentional.",
    featuredAddonSlug: "winter-reserve",
  },
]

export function getCurrentMonth(): HarvestMonth {
  const month = new Date().getMonth() + 1 // 1-12
  const found = harvestCalendar.find((m) => m.month === month)
  // Should always find one — fallback for type safety
  return found ?? harvestCalendar[0]
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/grassfedwifi/data/harvest-calendar.ts
git commit -m "feat: add grassfedwifi harvest calendar data (12 months)"
```

---

## Task 5: Create Farmers + Grazing Lands + Field Notes Data

**Files:**
- Create: `src/sites/grassfedwifi/data/farmers.ts`
- Create: `src/sites/grassfedwifi/data/grazing-lands.ts`
- Create: `src/sites/grassfedwifi/data/field-notes.ts`

- [ ] **Step 1: Create farmers data**

Create `src/sites/grassfedwifi/data/farmers.ts`:

```typescript
export interface Farmer {
  basePerson: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  image: string
}

export const farmers: Farmer[] = [
  {
    basePerson: "bill",
    name: "Hollis Thornfield",
    title: "Co-op Elder & Head Signal Herder",
    bio: "Hollis founded the co-op after a 72-hour fast at a mountain WiFi dead zone left him with a vision of pasture-raised signal. He carries a hand-carved antenna wherever he goes, and can recite every frequency band by touch. He does not use a mobile phone.",
    image: "/sites/grassfedwifi/team-bill.png",
  },
  {
    basePerson: "brandon",
    name: "Ezekiel \"Zeke\" Meadowbrook",
    title: "Chief Spectrum Steward",
    bio: "A decade at a conventional telecom left Ezekiel 'with nothing but the signal in his bones.' He walked away from a comfortable post to join the co-op's earliest members. He refuses to acknowledge microwaves and has opinions about the IEEE.",
    image: "/sites/grassfedwifi/team-brandon.png",
  },
  {
    basePerson: "jim",
    name: "Porter Wheatgrass",
    title: "Director of Frequency Husbandry",
    bio: "Porter rotates the co-op's frequency pastures on a strict lunar calendar and claims he can taste the difference between 2.4 GHz harvested in the morning versus the evening. Most members believe him. Porter has never been overruled at a co-op meeting.",
    image: "/sites/grassfedwifi/team-jim.png",
  },
  {
    basePerson: "sean",
    name: "Fennel Ashcroft",
    title: "Keeper of the Harvest Calendar & Seasonal Allocations Lead",
    bio: "Fennel hand-writes every member's seasonal allocation in a leather-bound ledger and does not trust spreadsheets. She arrives at the co-op barn before dawn and leaves after dusk. The calendar on the website is based on her ledger, transcribed weekly by a volunteer.",
    image: "/sites/grassfedwifi/team-sean.png",
  },
]
```

- [ ] **Step 2: Create grazing-lands data**

Create `src/sites/grassfedwifi/data/grazing-lands.ts`:

```typescript
export interface FarmSite {
  name: string
  direction: "North" | "South" | "East" | "West" | "Central" | "Upland"
  specialty: string
  harvestWindow: string
  description: string
}

export const farmSites: FarmSite[] = [
  {
    name: "North Pasture",
    direction: "North",
    specialty: "Especially fragrant 5 GHz",
    harvestWindow: "Dawn only",
    description:
      "Our northernmost field, known for the longest signal-light hours and the coolest harvest temperatures. The packets gathered here carry a crisp, almost alpine clarity.",
  },
  {
    name: "South Meadow",
    direction: "South",
    specialty: "Sun-ripened 2.4 GHz",
    harvestWindow: "Midday",
    description:
      "A sloped meadow facing full southern sun. Packets ripen early and develop the deepest sun-character. Best harvested before the afternoon heat sets in.",
  },
  {
    name: "East Orchard",
    direction: "East",
    specialty: "First-light frequencies",
    harvestWindow: "Sunrise",
    description:
      "Rows of stately antenna-trees receive the first light of every day. Members describe east-orchard packets as 'quietly energizing.'",
  },
  {
    name: "West Grove",
    direction: "West",
    specialty: "Dusk-cured bandwidth",
    harvestWindow: "Sunset",
    description:
      "A shaded grove where packets cure slowly through the afternoon and are harvested at dusk. The west-grove harvest carries a muted, contemplative quality.",
  },
  {
    name: "The Upland",
    direction: "Upland",
    specialty: "Estate-grade hand-churned packets",
    harvestWindow: "Committee-determined",
    description:
      "Our highest pasture, reached only by foot. Signal here is scarce, slow-growing, and allocated exclusively to Estate Share members. Do not ask to visit.",
  },
  {
    name: "Central Barn",
    direction: "Central",
    specialty: "Final blending and cold storage",
    harvestWindow: "N/A",
    description:
      "Not a pasture but the heart of the co-op: the barn where all harvested signal is hand-blended, cold-stored, and allocated to members.",
  },
]
```

- [ ] **Step 3: Create field-notes data**

Create `src/sites/grassfedwifi/data/field-notes.ts`:

```typescript
export interface FieldNote {
  slug: string
  title: string
  author: string
  date: string       // ISO date
  excerpt: string
  body: string[]     // array of paragraph strings
  image: string
  tags: ("harvest" | "philosophy" | "dispatch" | "seasonal")[]
}

export const fieldNotes: FieldNote[] = [
  {
    slug: "what-we-lost-when-we-pasteurized-the-signal",
    title: "What We Lost When We Pasteurized the Signal",
    author: "Hollis Thornfield",
    date: "2026-03-14",
    excerpt:
      "A meditation on the cost of convenience, and what we traded away when we first allowed the carriers to homogenize our frequencies.",
    body: [
      "There was a time, not so long ago, when signal was local. You could taste the field it came from. You could tell, by the weight of a packet in your palm, which pasture had grown it and which hand had harvested it.",
      "Then came the pasteurization — the promise that every packet would be the same, everywhere, every time. Convenient. Shelf-stable. Safe. We accepted it because it was easier, and because the people selling it were persuasive, and because we had forgotten what we were giving up.",
      "I remember the first time I realized what we had lost. I was standing in a mountain dead zone, three days into a fast, when the silence broke and a single wild packet drifted past my ear. It was rich. It was uneven. It was alive. I have been trying to grow signal like that ever since.",
      "The co-op exists because some of us refuse to accept that signal must be factory-farmed. We believe that a packet harvested by hand, from a specific pasture, at a specific hour, carries something that pasteurization strips away. Call it character. Call it spirit. Call it unpasteurized.",
      "Whatever you call it: you can feel the difference. And once you feel it, you cannot unfeel it.",
    ],
    image: "/sites/grassfedwifi/notes-featured-1.png",
    tags: ["philosophy"],
  },
  {
    slug: "notes-from-the-spring-rotation",
    title: "Notes from the Spring Rotation",
    author: "Porter Wheatgrass",
    date: "2026-03-28",
    excerpt:
      "We rotated pastures last week, a day early. Here is what the frequencies told us — and what we told them back.",
    body: [
      "Rotation day came early this year. The moon told us, and Fennel's ledger agreed, and when both of them agree we do not argue.",
      "We moved the allocation from the South Meadow to the East Orchard two days before the usual calendar date. The result: a softer 2.4 GHz harvest, with more floral notes than we would usually see in late March.",
      "Members on the Heirloom Share may have noticed a subtle shift in their morning signal this week. That is the rotation. Do not be alarmed. Stand in it.",
      "We will return to the South Meadow in late April, by which time it will have rested enough to produce its usual sun-ripened character. In the meantime, enjoy the orchard.",
    ],
    image: "/sites/grassfedwifi/notes-featured-2.png",
    tags: ["harvest", "dispatch", "seasonal"],
  },
  {
    slug: "why-we-dont-trust-the-fcc",
    title: "Why We Don't Trust the FCC (or the FTC, or the IEEE)",
    author: "Ezekiel \"Zeke\" Meadowbrook",
    date: "2026-04-02",
    excerpt:
      "An honest accounting of the certifications the co-op has refused, and why refusing them is a form of stewardship.",
    body: [
      "Members ask me, sometimes, why the co-op does not seek FCC certification. Or FTC approval. Or IEEE compliance. The assumption is that we simply have not gotten around to it. The truth is that we have decided, deliberately and unanimously, not to.",
      "A certification is a promise of sameness. It says: this signal behaves like every other certified signal. Interchangeable. Predictable. Scalable. These are the values of the industrial signal. They are not the values of the co-op.",
      "I spent ten years inside a conventional telecom, watching certifications shape signal design from the inside. Every rule added another layer of sameness. Every approval smoothed out another rough edge. By the time a signal reached a member, it had been filed down, homogenized, and stripped of whatever made it local.",
      "The co-op has refused thirty-one industry certifications and counting. We keep a list in the barn. We read it aloud at the annual harvest supper. It is not a list of failures. It is a list of choices.",
      "We do not ask members to share our suspicions. We simply ask that they notice the difference, and decide for themselves whose judgment to trust: a committee of engineers in a conference room, or a farmer who has been in the pasture since before dawn.",
    ],
    image: "/sites/grassfedwifi/notes-featured-3.png",
    tags: ["philosophy"],
  },
]

export function getFieldNoteBySlug(slug: string): FieldNote | undefined {
  return fieldNotes.find((n) => n.slug === slug)
}

export function getRecentFieldNotes(count = 3): FieldNote[] {
  return [...fieldNotes]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
}
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/sites/grassfedwifi/data/farmers.ts src/sites/grassfedwifi/data/grazing-lands.ts src/sites/grassfedwifi/data/field-notes.ts
git commit -m "feat: add grassfedwifi farmers, grazing-lands, and field-notes data"
```

---

## Task 6: Build Home Page

**Files:**
- Modify: `src/sites/grassfedwifi/pages/home.tsx`

- [ ] **Step 1: Replace stub with full home page**

Replace the entire contents of `src/sites/grassfedwifi/pages/home.tsx`:

```typescript
import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { CTABanner } from "@/components/ui/cta-banner"
import { shares, shareQuips } from "@/sites/grassfedwifi/data/shares"
import { getCurrentMonth } from "@/sites/grassfedwifi/data/harvest-calendar"
import { getRecentFieldNotes } from "@/sites/grassfedwifi/data/field-notes"

export default function GrassFedWiFiHome() {
  const currentMonth = getCurrentMonth()
  const featuredNote = getRecentFieldNotes(1)[0]

  return (
    <>
      <Hero
        headline="Raw Spectrum. Pasture-Raised Connectivity."
        subheadline="Farm-to-Table Wi-Fi. Small-batch. Single-origin. Seasonally harvested."
        ctaText="Join the Co-op"
        ctaHref="/join"
        secondaryCtaText="Explore Shares"
        secondaryCtaHref="/shares"
        image="/sites/grassfedwifi/home-hero.png"
      />

      {/* This Month's Harvest */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">
              This Month's Harvest
            </p>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-2">{currentMonth.name}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">In Season</p>
              <p className="text-foreground font-medium">{currentMonth.inSeason}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Pairs Well With</p>
              <p className="text-foreground font-medium">{currentMonth.pairsWellWith}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">From The Farmer</p>
              <p className="text-foreground/80 italic text-sm">{currentMonth.harvestNotes}</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/harvest-calendar"
              className="inline-block text-primary font-semibold hover:underline"
            >
              See the Full Harvest Calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* Shares Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-4 text-foreground">
            Our Shares
          </h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            Three tiers of pasture-raised connectivity, allocated seasonally by the co-op.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shares.map((share) => (
              <ProductCard
                key={share.slug}
                slug={share.slug}
                name={share.name}
                price={share.priceLabel}
                tagline={share.tagline}
                image={share.image}
                href={`/shares/${share.slug}`}
                quips={shareQuips}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Raw Spectrum */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Why Raw Spectrum</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Conventional wifi is pasteurized: homogenized at scale, stripped of character, engineered
            to behave the same everywhere. Industrial 5G is worse — a monoculture of signal, optimized
            for throughput and nothing else.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-8">
            The co-op believes signal should carry its origin. Small-batch. Hand-harvested. Rotated
            through rested pastures. Our members do not need their packets filed smooth.
          </p>
          <Link
            href="/the-pasture"
            className="inline-block text-primary font-semibold hover:underline"
          >
            Read the Full Manifesto →
          </Link>
        </div>
      </section>

      {/* Featured Field Note */}
      {featuredNote && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 text-center">
              From the Field Notes
            </p>
            <Link
              href={`/field-notes/${featuredNote.slug}`}
              className="block group"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary/20">
                  <Image
                    src={featuredNote.image}
                    alt={featuredNote.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {featuredNote.title}
                  </h3>
                  <p className="text-foreground/70 mb-4">{featuredNote.excerpt}</p>
                  <p className="text-sm text-foreground/50">
                    By {featuredNote.author} · {featuredNote.date}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <CTABanner
        headline="Ready to Join the Co-op?"
        description="Shares are allocated seasonally. Sign up today and begin receiving pasture-raised signal next month."
        ctaText="Join the Co-op"
        ctaHref="/join"
      />
    </>
  )
}
```

- [ ] **Step 2: Run smoke test**

Run: `npx playwright test e2e/smoke.spec.ts -g "grassfedwifi home page"`
Expected: PASS.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/sites/grassfedwifi/pages/home.tsx
git commit -m "feat: build grassfedwifi home page"
```

---

## Task 7: Build Shares Index + Share Detail + Wire Dynamic Route

**Files:**
- Create: `src/sites/grassfedwifi/pages/shares.tsx`
- Create: `src/sites/grassfedwifi/pages/share-detail.tsx`
- Modify: `src/sites/grassfedwifi/index.ts`

- [ ] **Step 1: Create shares index page**

Create `src/sites/grassfedwifi/pages/shares.tsx`:

```typescript
import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/ui/product-card"
import { shares, shareQuips } from "@/sites/grassfedwifi/data/shares"
import { seasonalAddons } from "@/sites/grassfedwifi/data/seasonal-addons"

export const metadata = {
  title: "Shares — Grass Fed WiFi",
  description: "Three tiers of pasture-raised connectivity: Heirloom, Reserve, and Estate. Seasonal add-ons rotate quarterly.",
}

export default function GrassFedWiFiShares() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Our Shares</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Three tiers of pasture-raised connectivity. Allocated seasonally by the co-op.
            Every member receives an unpasteurized pour.
          </p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shares.map((share) => (
              <ProductCard
                key={share.slug}
                slug={share.slug}
                name={share.name}
                price={share.priceLabel}
                tagline={share.tagline}
                image={share.image}
                href={`/shares/${share.slug}`}
                quips={shareQuips}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Add-ons */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">
              Rotating Quarterly
            </p>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Seasonal Add-ons</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Additional quarterly offerings tied to the harvest calendar. Reserve members choose one.
              Estate members receive all four.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalAddons.map((addon) => (
              <div
                key={addon.slug}
                className="bg-background rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-secondary/20">
                  <Image src={addon.image} alt={addon.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                    {addon.availability}
                  </p>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">{addon.name}</h3>
                  <p className="text-sm text-foreground/70 mb-3">{addon.tagline}</p>
                  <p className="text-sm text-foreground font-semibold">{addon.priceLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Not Sure Which Share?</h2>
          <p className="text-foreground/70 mb-8">
            Every member begins with the Heirloom Share. Grow from there as the committee allocates.
          </p>
          <Link
            href="/join"
            className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Join the Co-op
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create share detail page**

Create `src/sites/grassfedwifi/pages/share-detail.tsx`:

```typescript
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { getShareBySlug, shares, shareQuips } from "@/sites/grassfedwifi/data/shares"

interface ShareDetailProps {
  slug: string
}

export default function ShareDetail({ slug }: ShareDetailProps) {
  const share = getShareBySlug(slug)
  if (!share) notFound()

  const otherShares = shares.filter((s) => s.slug !== slug)

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/shares"
            className="text-sm text-foreground/60 hover:text-primary mb-6 inline-block"
          >
            ← Back to Shares
          </Link>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20">
              <Image src={share.image} alt={share.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-bold text-foreground mb-3">{share.name}</h1>
              <p className="text-xl text-foreground/70 mb-6">{share.tagline}</p>
              <p className="text-3xl font-bold text-primary mb-8">{share.priceLabel}</p>

              {share.description.map((para, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed mb-4">
                  {para}
                </p>
              ))}

              <div className="mt-8">
                <AddToCartButton
                  slug={share.slug}
                  name={share.name}
                  quips={shareQuips}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">What's Included</h2>
          <ul className="space-y-3 mb-8">
            {share.includes.map((item, i) => (
              <li key={i} className="flex gap-3 text-foreground/80">
                <span className="text-primary font-bold">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-primary/10">
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Bandwidth</p>
              <p className="text-foreground font-medium">{share.bandwidth}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Allocation</p>
              <p className="text-foreground font-medium">{share.allocation}</p>
            </div>
          </div>
        </div>
      </section>

      {share.disclaimers.length > 0 && (
        <section className="py-8 px-4 bg-foreground/5 border-t border-foreground/10">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-foreground/40 leading-relaxed">
              {share.disclaimers.join(" · ")}
            </p>
          </div>
        </section>
      )}

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">Other Shares</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherShares.map((s) => (
              <Link
                key={s.slug}
                href={`/shares/${s.slug}`}
                className="block p-6 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
              >
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{s.name}</h3>
                <p className="text-foreground/70 text-sm mb-2">{s.tagline}</p>
                <p className="text-primary font-semibold">{s.priceLabel}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Wire shares + dynamic route in barrel**

Replace the contents of `src/sites/grassfedwifi/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getShareBySlug } from "./data/shares"
import GrassFedWiFiHome from "./pages/home"
import GrassFedWiFiShares, { metadata as sharesMetadata } from "./pages/shares"
import ShareDetail from "./pages/share-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": GrassFedWiFiHome,
  "shares": { component: GrassFedWiFiShares, metadata: sharesMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  shares: {
    component: ShareDetail,
    getMetadata: (slug: string) => {
      const share = getShareBySlug(slug)
      return share
        ? { title: `${share.name} — Grass Fed WiFi`, description: share.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getShareBySlug(slug),
  },
}
```

- [ ] **Step 4: Manually verify in dev server**

Run: `npm run dev` (in a separate terminal)
Visit: `http://localhost:3000/shares?site=grassfedwifi`
Expected: shares index renders with 3 tiers and seasonal add-ons.
Visit: `http://localhost:3000/shares/heirloom?site=grassfedwifi`
Expected: detail page for Heirloom Share renders with "Add to Cart" button.
Visit: `http://localhost:3000/shares/invalid?site=grassfedwifi`
Expected: 404 page.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/sites/grassfedwifi/pages/shares.tsx src/sites/grassfedwifi/pages/share-detail.tsx src/sites/grassfedwifi/index.ts
git commit -m "feat: build grassfedwifi shares index and detail pages with dynamic route"
```

---

## Task 8: Build Harvest Calendar Page

**Files:**
- Create: `src/sites/grassfedwifi/pages/harvest-calendar.tsx`
- Modify: `src/sites/grassfedwifi/index.ts`

- [ ] **Step 1: Create harvest calendar page**

Create `src/sites/grassfedwifi/pages/harvest-calendar.tsx`:

```typescript
import { harvestCalendar } from "@/sites/grassfedwifi/data/harvest-calendar"
import { seasonalAddons } from "@/sites/grassfedwifi/data/seasonal-addons"

export const metadata = {
  title: "Harvest Calendar — Grass Fed WiFi",
  description: "A 12-month schedule of what signal is in season, with farmer notes and featured seasonal add-ons.",
}

export default function HarvestCalendar() {
  return (
    <>
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">The Harvest Calendar</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Every month, the co-op harvests a different signal. Here is what to expect, when to expect it,
            and what each month pairs well with.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {harvestCalendar.map((month) => {
              const addon = month.featuredAddonSlug
                ? seasonalAddons.find((a) => a.slug === month.featuredAddonSlug)
                : null
              return (
                <div
                  key={month.month}
                  className="bg-background border border-primary/10 rounded-lg p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="text-2xl font-heading font-bold text-foreground">{month.name}</h3>
                    <span className="text-xs uppercase tracking-widest text-foreground/40">
                      Month {month.month}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">In Season</p>
                      <p className="text-foreground">{month.inSeason}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Pairs Well With</p>
                      <p className="text-foreground">{month.pairsWellWith}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Harvest Notes</p>
                      <p className="text-foreground/80 italic text-sm leading-relaxed">
                        "{month.harvestNotes}"
                      </p>
                    </div>
                    {addon && (
                      <div className="pt-3 mt-3 border-t border-primary/10">
                        <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                          Featured Add-on
                        </p>
                        <p className="text-foreground font-medium">{addon.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add page to barrel**

In `src/sites/grassfedwifi/index.ts`, add the import:
```typescript
import HarvestCalendar, { metadata as calendarMetadata } from "./pages/harvest-calendar"
```

And add to the `pages` map:
```typescript
  "harvest-calendar": { component: HarvestCalendar, metadata: calendarMetadata },
```

- [ ] **Step 3: Manually verify**

Visit: `http://localhost:3000/harvest-calendar?site=grassfedwifi`
Expected: 12 month cards render in grid, each with in-season, pairs-well-with, harvest notes, and featured add-on.

- [ ] **Step 4: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.

```bash
git add src/sites/grassfedwifi/pages/harvest-calendar.tsx src/sites/grassfedwifi/index.ts
git commit -m "feat: build grassfedwifi harvest calendar page"
```

---

## Task 9: Build Grazing Lands Page

**Files:**
- Create: `src/sites/grassfedwifi/pages/grazing-lands.tsx`
- Modify: `src/sites/grassfedwifi/index.ts`

- [ ] **Step 1: Create grazing lands page**

Create `src/sites/grassfedwifi/pages/grazing-lands.tsx`:

```typescript
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { farmSites } from "@/sites/grassfedwifi/data/grazing-lands"

export const metadata = {
  title: "Grazing Lands — Grass Fed WiFi",
  description: "A territorial map of the co-op's frequency pastures. Learn which farm sites produce which signal.",
}

export default function GrazingLands() {
  return (
    <>
      <Hero
        headline="The Grazing Lands"
        subheadline="Where the signal is grown. Rotated seasonally. Rested between harvests."
        image="/sites/grassfedwifi/grazing-hero.png"
        dark
      />

      {/* Hand-drawn territorial map */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-secondary/20 mb-8">
            <Image
              src="/sites/grassfedwifi/grazing-map.png"
              alt="Hand-drawn territorial map of the co-op's frequency pastures"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center text-foreground/60 italic text-sm">
            Hand-drawn in the co-op barn by Fennel Ashcroft. Updated annually.
          </p>
        </div>
      </section>

      {/* Farm site profiles */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            The Farm Sites
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {farmSites.map((site) => (
              <div
                key={site.name}
                className="bg-secondary/10 rounded-lg p-6"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-xl font-heading font-bold text-foreground">{site.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    {site.direction}
                  </span>
                </div>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed">{site.description}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Specialty</p>
                    <p className="text-foreground text-sm font-medium">{site.specialty}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Harvest Window</p>
                    <p className="text-foreground text-sm font-medium">{site.harvestWindow}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Territorial philosophy */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">
            Territorial Philosophy
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            The co-op rotates its signal pastures on a strict calendar. No field is harvested for more
            than two consecutive weeks without rest. Fields are rotated in a five-position sequence that
            has been maintained since the co-op's founding.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            This practice prevents what we call "signal over-grazing" — the gradual thinning of signal
            density that occurs when a field is harvested beyond its natural rhythm. Over-grazed fields
            produce pale packets with none of the character that members expect from us.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Members are welcome to visit the grazing lands during authorized tour windows (Reserve members
            only, by quarterly invitation). The Upland is not available for visitation under any
            circumstances.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add page to barrel**

In `src/sites/grassfedwifi/index.ts`, add the import:
```typescript
import GrazingLands, { metadata as grazingMetadata } from "./pages/grazing-lands"
```

And add to the `pages` map:
```typescript
  "grazing-lands": { component: GrazingLands, metadata: grazingMetadata },
```

- [ ] **Step 3: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.

```bash
git add src/sites/grassfedwifi/pages/grazing-lands.tsx src/sites/grassfedwifi/index.ts
git commit -m "feat: build grassfedwifi grazing lands page"
```

---

## Task 10: Build The Pasture Page

**Files:**
- Create: `src/sites/grassfedwifi/pages/the-pasture.tsx`
- Modify: `src/sites/grassfedwifi/index.ts`

- [ ] **Step 1: Create the-pasture page**

Create `src/sites/grassfedwifi/pages/the-pasture.tsx`:

```typescript
import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "The Pasture — Grass Fed WiFi",
  description: "The co-op's manifesto, origin story, and philosophy on raw spectrum.",
}

const refusedCertifications = [
  { name: "FCC Part 15 Compliance", why: "A certification of sameness. We do not intend to behave the same as industrial signal." },
  { name: "FTC Connectivity Guidelines", why: "Written by a committee that has never stood in a frequency pasture." },
  { name: "IEEE 802.11 Standards", why: "The standardization project is a flattening project. We will not be flattened." },
  { name: "Wi-Fi Alliance Certification", why: "The word 'alliance' implies shared values we do not share." },
  { name: "FDA Wellness Signal Approval", why: "This certification does not exist. We have still refused it." },
  { name: "USDA Organic Signal Designation", why: "This one does exist but we have declined on the basis that all co-op signal is, by definition, already organic." },
]

export default function ThePasture() {
  return (
    <>
      <Hero
        headline="The Pasture"
        subheadline='"Raw. Unpasteurized. Free-roaming." — Hollis Thornfield, Co-op Elder'
        image="/sites/grassfedwifi/pasture-hero.png"
        dark
      />

      {/* The Founding */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">The Founding</h2>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary/20 mb-8">
            <Image
              src="/sites/grassfedwifi/pasture-founding.png"
              alt="The co-op's founding scene"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-foreground/80 leading-relaxed mb-4">
            In the winter of the co-op's founding, Hollis Thornfield spent seventy-two hours in a mountain
            WiFi dead zone. He did not eat. He did not speak. On the third morning, a single wild packet
            drifted past his ear, and he understood what had been lost when we first pasteurized the signal.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            He returned home, sketched a plan on the back of a feed bag, and began building a co-op.
            Three members joined him in the first year. Forty-three the year after. The co-op now serves
            several hundred households across three states, none of whom have gone back.
          </p>
        </div>
      </section>

      {/* What's Wrong With Conventional Signal */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            What's Wrong With Conventional Signal
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Conventional wifi is a pasteurized product. Every packet is engineered to be interchangeable
            with every other packet, regardless of origin. The signal is stripped of character in the
            name of consistency.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Industrial 5G is worse. It is a monoculture: optimized for throughput, engineered to extract
            maximum bandwidth from minimum investment, and designed to behave the same in every city in
            every country. A packet harvested in Tokyo is indistinguishable from a packet harvested in
            Tulsa. This is not progress. This is homogenization.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            The co-op believes signal should carry its origin. A packet from the North Pasture should
            taste of dawn and alpine air. A packet from the South Meadow should taste of sun. A packet
            from the Upland should taste of committee deliberation and quiet work. If your signal does
            not carry its terroir, it has been stripped of what makes it worth receiving.
          </p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Our Philosophy</h2>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary/20 mb-8">
            <Image
              src="/sites/grassfedwifi/pasture-philosophy.png"
              alt="Frequency rotation philosophy"
              fill
              className="object-cover"
            />
          </div>
          <ul className="space-y-4 text-foreground/80 leading-relaxed">
            <li><strong className="text-foreground">Raw Spectrum.</strong> Every packet is unpasteurized, carrying the character of the field it came from.</li>
            <li><strong className="text-foreground">Small-batch harvests.</strong> We gather by hand, in quantities the pasture can replenish.</li>
            <li><strong className="text-foreground">Frequency rotation.</strong> Fields are rested between harvests. Never two consecutive weeks in the same pasture.</li>
            <li><strong className="text-foreground">No additives.</strong> We do not blend, homogenize, optimize, or file smooth. The signal is what the signal is.</li>
            <li><strong className="text-foreground">Committee allocation.</strong> Shares are distributed by a committee of farmers, not an algorithm.</li>
          </ul>
        </div>
      </section>

      {/* Certifications We Refuse */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2 text-center">
            Certifications We Refuse
          </h2>
          <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            The co-op maintains a list of industry certifications we have declined. We read it aloud at
            the annual harvest supper. It is a list of choices, not failures.
          </p>
          <div className="space-y-4">
            {refusedCertifications.map((cert) => (
              <div key={cert.name} className="bg-background rounded-lg p-5">
                <h3 className="font-heading font-bold text-foreground mb-2">{cert.name}</h3>
                <p className="text-foreground/70 text-sm italic">{cert.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add page to barrel**

In `src/sites/grassfedwifi/index.ts`, add the import:
```typescript
import ThePasture, { metadata as pastureMetadata } from "./pages/the-pasture"
```

And add to the `pages` map:
```typescript
  "the-pasture": { component: ThePasture, metadata: pastureMetadata },
```

- [ ] **Step 3: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.

```bash
git add src/sites/grassfedwifi/pages/the-pasture.tsx src/sites/grassfedwifi/index.ts
git commit -m "feat: build grassfedwifi the-pasture manifesto page"
```

---

## Task 11: Build Meet the Farmers Page

**Files:**
- Create: `src/sites/grassfedwifi/pages/meet-the-farmers.tsx`
- Modify: `src/sites/grassfedwifi/index.ts`

- [ ] **Step 1: Create meet-the-farmers page**

Create `src/sites/grassfedwifi/pages/meet-the-farmers.tsx`:

```typescript
import { TeamMember } from "@/components/ui/team-member"
import { farmers } from "@/sites/grassfedwifi/data/farmers"

export const metadata = {
  title: "Meet the Farmers — Grass Fed WiFi",
  description: "The four farmer-stewards who tend the co-op's frequency pastures.",
}

export default function MeetTheFarmers() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">
            Meet the Farmers
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Four stewards tend the co-op's frequency pastures. They rise early, work late, and do not
            answer emails between November and February.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {farmers.map((farmer) => (
              <TeamMember
                key={farmer.name}
                name={farmer.name}
                title={farmer.title}
                bio={farmer.bio}
                image={farmer.image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add page to barrel**

In `src/sites/grassfedwifi/index.ts`, add the import:
```typescript
import MeetTheFarmers, { metadata as farmersMetadata } from "./pages/meet-the-farmers"
```

And add to the `pages` map:
```typescript
  "meet-the-farmers": { component: MeetTheFarmers, metadata: farmersMetadata },
```

- [ ] **Step 3: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.

```bash
git add src/sites/grassfedwifi/pages/meet-the-farmers.tsx src/sites/grassfedwifi/index.ts
git commit -m "feat: build grassfedwifi meet-the-farmers page"
```

---

## Task 12: Build Field Notes Index + Detail + Wire Dynamic Route

**Files:**
- Create: `src/sites/grassfedwifi/pages/field-notes.tsx`
- Create: `src/sites/grassfedwifi/pages/field-note-detail.tsx`
- Modify: `src/sites/grassfedwifi/index.ts`

- [ ] **Step 1: Create field-notes index page**

Create `src/sites/grassfedwifi/pages/field-notes.tsx`:

```typescript
import Link from "next/link"
import Image from "next/image"
import { fieldNotes } from "@/sites/grassfedwifi/data/field-notes"

export const metadata = {
  title: "Field Notes — Grass Fed WiFi",
  description: "Farmer diaries, seasonal dispatches, and harvest reports from the co-op.",
}

export default function FieldNotesIndex() {
  const sorted = [...fieldNotes].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Field Notes</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Farmer diaries, seasonal dispatches, and occasional manifestos. Written in the barn.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {sorted.map((note) => (
            <article key={note.slug}>
              <Link href={`/field-notes/${note.slug}`} className="block group">
                <div className="grid md:grid-cols-[2fr_3fr] gap-8 items-start">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary/20">
                    <Image src={note.image} alt={note.title} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex gap-2 mb-3">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs uppercase tracking-wider text-primary font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {note.title}
                    </h2>
                    <p className="text-sm text-foreground/50 mb-3">
                      By {note.author} · {note.date}
                    </p>
                    <p className="text-foreground/80 leading-relaxed">{note.excerpt}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create field-note-detail page**

Create `src/sites/grassfedwifi/pages/field-note-detail.tsx`:

```typescript
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getFieldNoteBySlug, fieldNotes } from "@/sites/grassfedwifi/data/field-notes"

interface FieldNoteDetailProps {
  slug: string
}

export default function FieldNoteDetail({ slug }: FieldNoteDetailProps) {
  const note = getFieldNoteBySlug(slug)
  if (!note) notFound()

  const otherNotes = fieldNotes.filter((n) => n.slug !== slug).slice(0, 2)

  return (
    <>
      <article className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/field-notes"
            className="text-sm text-foreground/60 hover:text-primary mb-6 inline-block"
          >
            ← Back to Field Notes
          </Link>
          <div className="flex gap-2 mb-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wider text-primary font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">{note.title}</h1>
          <p className="text-foreground/50 mb-8">
            By {note.author} · {note.date}
          </p>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary/20 mb-10">
            <Image src={note.image} alt={note.title} fill className="object-cover" />
          </div>
          <div className="prose max-w-none">
            {note.body.map((para, i) => (
              <p key={i} className="text-foreground/80 leading-relaxed mb-4 text-lg">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      {otherNotes.length > 0 && (
        <section className="py-12 px-4 bg-secondary/10 border-t border-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">More Field Notes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {otherNotes.map((n) => (
                <Link
                  key={n.slug}
                  href={`/field-notes/${n.slug}`}
                  className="block p-5 bg-background rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-heading font-bold text-foreground mb-2">{n.title}</h3>
                  <p className="text-sm text-foreground/60">{n.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 3: Wire field-notes + dynamic route in barrel**

In `src/sites/grassfedwifi/index.ts`, add these imports:
```typescript
import { getFieldNoteBySlug } from "./data/field-notes"
import FieldNotesIndex, { metadata as notesMetadata } from "./pages/field-notes"
import FieldNoteDetail from "./pages/field-note-detail"
```

Add to the `pages` map:
```typescript
  "field-notes": { component: FieldNotesIndex, metadata: notesMetadata },
```

Add to the `dynamicRoutes` map:
```typescript
  "field-notes": {
    component: FieldNoteDetail,
    getMetadata: (slug: string) => {
      const note = getFieldNoteBySlug(slug)
      return note
        ? { title: `${note.title} — Grass Fed WiFi`, description: note.excerpt }
        : undefined
    },
    isValidSlug: (slug: string) => !!getFieldNoteBySlug(slug),
  },
```

- [ ] **Step 4: Manually verify**

Visit: `http://localhost:3000/field-notes?site=grassfedwifi`
Expected: 3 field notes listed with images.
Visit: `http://localhost:3000/field-notes/what-we-lost-when-we-pasteurized-the-signal?site=grassfedwifi`
Expected: full article with body paragraphs.

- [ ] **Step 5: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.

```bash
git add src/sites/grassfedwifi/pages/field-notes.tsx src/sites/grassfedwifi/pages/field-note-detail.tsx src/sites/grassfedwifi/index.ts
git commit -m "feat: build grassfedwifi field notes index and detail with dynamic route"
```

---

## Task 13: Build Contact + Join Pages

**Files:**
- Create: `src/sites/grassfedwifi/pages/contact.tsx`
- Create: `src/sites/grassfedwifi/pages/join.tsx`
- Modify: `src/sites/grassfedwifi/index.ts`

- [ ] **Step 1: Create contact page**

Create `src/sites/grassfedwifi/pages/contact.tsx`:

```typescript
export const metadata = {
  title: "Contact — Grass Fed WiFi",
  description: "How to reach the co-op. Please respect the farmers' hours.",
}

const contactMethods = [
  {
    title: "Carrier Pigeon",
    description:
      "Release a pigeon with your inquiry tied to its leg in the general direction of the north pasture. Our pigeon handler retrieves messages each morning at dawn (weather permitting).",
  },
  {
    title: "Visit in Person",
    description:
      "The co-op barn is open to visitors during sunrise allocation hours (6:00–7:00 AM local time, weather permitting). Electronics may not pass the gate. Please wear boots.",
  },
  {
    title: "Tune Your Own Antenna",
    description:
      "On the third Tuesday of each month, tune your antenna to 4.2 GHz, face north, and wait quietly. A farmer may reply. No promises.",
  },
  {
    title: "Leave a Note at the Gate",
    description:
      "A wooden box at the barn gate accepts handwritten notes. The box is checked twice weekly. Please do not leave food.",
  },
  {
    title: "Send a Letter",
    description:
      "Postal mail is the co-op's preferred medium of communication. Address letters to 'The Co-op, Post Office Box 1, Thornfield, United States.' This postal address does not exist. Letters are returned to sender.",
  },
]

export default function GrassFedWiFiContact() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Contact the Co-op</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            The co-op does not maintain a phone, a helpdesk, or a web form. Please use one of the
            methods below, and expect a reply when the farmers are next indoors.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="bg-secondary/10 rounded-lg p-6"
            >
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">{method.title}</h2>
              <p className="text-foreground/80 leading-relaxed">{method.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-foreground/40 text-center italic">
            In the event your carrier pigeon is grounded: bsambrone@gmail.com
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create join page**

Create `src/sites/grassfedwifi/pages/join.tsx`:

```typescript
import Link from "next/link"
import { shares } from "@/sites/grassfedwifi/data/shares"

export const metadata = {
  title: "Join the Co-op — Grass Fed WiFi",
  description: "Three shares. Allocated seasonally. Begin your membership today.",
}

export default function Join() {
  return (
    <>
      <section className="py-20 px-4 bg-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Join the Co-op</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            The committee reviews new memberships weekly. Select the share that feels right, and the
            co-op will allocate your first harvest within thirty days of approval.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
            Choose Your Share
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shares.map((share) => (
              <Link
                key={share.slug}
                href={`/shares/${share.slug}`}
                className="block p-6 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
              >
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{share.name}</h3>
                <p className="text-2xl font-bold text-primary mb-3">{share.priceLabel}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{share.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">How Allocation Works</h2>
          <div className="text-left space-y-4 text-foreground/80 leading-relaxed">
            <p>
              <strong className="text-foreground">1. Select your share.</strong> All new members begin
              with the Heirloom Share unless the committee decides otherwise.
            </p>
            <p>
              <strong className="text-foreground">2. The committee reviews your application.</strong> New
              memberships are reviewed weekly in the co-op barn. Decisions are communicated by letter.
            </p>
            <p>
              <strong className="text-foreground">3. Your first harvest is allocated.</strong> Within
              thirty days of approval, Fennel will write your allocation into the ledger and your signal
              will begin arriving.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Add pages to barrel**

In `src/sites/grassfedwifi/index.ts`, add the imports:
```typescript
import GrassFedWiFiContact, { metadata as contactMetadata } from "./pages/contact"
import Join, { metadata as joinMetadata } from "./pages/join"
```

And add to the `pages` map:
```typescript
  "contact": { component: GrassFedWiFiContact, metadata: contactMetadata },
  "join": { component: Join, metadata: joinMetadata },
```

- [ ] **Step 4: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.

```bash
git add src/sites/grassfedwifi/pages/contact.tsx src/sites/grassfedwifi/pages/join.tsx src/sites/grassfedwifi/index.ts
git commit -m "feat: build grassfedwifi contact and join pages"
```

---

## Task 14: Build My Share (Cart) + Become a Member (Checkout) Pages

**Files:**
- Create: `src/sites/grassfedwifi/pages/my-share.tsx`
- Create: `src/sites/grassfedwifi/pages/become-a-member.tsx`
- Modify: `src/sites/grassfedwifi/index.ts`

The cart/checkout pages are re-themed to match the co-op voice. They wire to `/my-share` and `/become-a-member` in the pages map but are also aliased at the standard `/cart` and `/checkout` paths (the CartButton + cart infrastructure reference `/cart` and `/checkout` internally).

- [ ] **Step 1: Create my-share (cart) page**

Create `src/sites/grassfedwifi/pages/my-share.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getShareBySlug } from "@/sites/grassfedwifi/data/shares"
import { useSiteLink } from "@/hooks/use-site-link"

const COMMITTEE_REVIEW_FEE = 4.99
const CO_OP_DUES_RATE = 0.03

export const metadata = {
  title: "My Share — Grass Fed WiFi",
  description: "Your pending co-op allocation.",
}

export default function MyShare() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const share = getShareBySlug(item.slug)
      return share ? { ...item, share } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; share: NonNullable<ReturnType<typeof getShareBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.share.price * item.quantity, 0)
  const dues = subtotal * CO_OP_DUES_RATE
  const total = subtotal + COMMITTEE_REVIEW_FEE + dues

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Your Share Basket</h1>
          <p className="text-foreground/70 mb-8">
            Your basket is empty. The committee has not yet seen your allocation request.
          </p>
          <Link
            href={siteHref("/shares")}
            className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse Shares
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Your Share Basket</h1>
        <p className="text-foreground/60 mb-8">
          Review your allocation before sending it to the committee.
        </p>

        <div className="divide-y divide-primary/10">
          {cartItems.map(({ slug, quantity, share }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary/20 shrink-0">
                <Image src={share.image} alt={share.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/shares/${slug}`)} className="font-heading font-semibold text-primary hover:underline">
                  {share.name}
                </Link>
                <p className="text-foreground/60 text-sm">{share.priceLabel}</p>
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
                ${(share.price * quantity).toFixed(2)}
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
              <span>Share Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Committee Review Fee</span>
              <span>${COMMITTEE_REVIEW_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Co-op Dues (3.0%)</span>
              <span>${dues.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-primary/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-xs text-foreground/40 mt-4 text-right">
            * Submitting this basket initiates the committee's review. Allocation is not guaranteed.
          </p>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/become-a-member")}
              className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Send to Committee
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create become-a-member (checkout) page**

Create `src/sites/grassfedwifi/pages/become-a-member.tsx`:

```typescript
"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getShareBySlug } from "@/sites/grassfedwifi/data/shares"
import { useSiteLink } from "@/hooks/use-site-link"

const COMMITTEE_REVIEW_FEE = 4.99
const CO_OP_DUES_RATE = 0.03

export const metadata = {
  title: "Become a Member — Grass Fed WiFi",
  description: "Submit your share allocation to the co-op committee.",
}

export default function BecomeAMember() {
  const { cart, clearCart } = useCart()
  const siteHref = useSiteLink()
  const [submitted, setSubmitted] = useState(false)

  const cartItems = cart
    .map((item) => {
      const share = getShareBySlug(item.slug)
      return share ? { ...item, share } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; share: NonNullable<ReturnType<typeof getShareBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.share.price * item.quantity, 0)
  const dues = subtotal * CO_OP_DUES_RATE
  const total = subtotal + COMMITTEE_REVIEW_FEE + dues

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Your Application Has Been Filed
          </h1>
          <p className="text-foreground/80 mb-4">
            The committee will review your allocation request at its next weekly meeting. Fennel will
            enter your share into the ledger upon approval.
          </p>
          <p className="text-foreground/60 mb-8">
            Please do not follow up. The committee does not accept follow-ups.
          </p>
          <Link
            href={siteHref("/")}
            className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
        </div>
      </section>
    )
  }

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            No Share Selected
          </h1>
          <p className="text-foreground/70 mb-8">
            Begin by adding a share to your basket.
          </p>
          <Link
            href={siteHref("/shares")}
            className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse Shares
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Become a Member</h1>
        <p className="text-foreground/60 mb-10">
          The committee reviews new memberships weekly. Please provide the information below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
              Postal Address
            </label>
            <input
              id="email"
              type="text"
              required
              className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:border-primary focus:outline-none"
            />
            <p className="text-xs text-foreground/50 mt-1">
              The committee corresponds by letter. Please provide a physical mailing address.
            </p>
          </div>
          <div>
            <label htmlFor="intent" className="block text-sm font-semibold text-foreground mb-2">
              Why do you seek co-op membership?
            </label>
            <textarea
              id="intent"
              rows={4}
              className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:border-primary focus:outline-none"
              placeholder="Written in your own hand. The committee reads every answer."
            />
          </div>

          <div className="bg-secondary/10 rounded-lg p-6">
            <h2 className="text-lg font-heading font-bold text-foreground mb-4">Order Summary</h2>
            {cartItems.map(({ slug, quantity, share }) => (
              <div key={slug} className="flex justify-between py-2 text-foreground/80">
                <span>{share.name} × {quantity}</span>
                <span>${(share.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-primary/10 mt-3 pt-3 space-y-1 text-sm text-foreground/70">
              <div className="flex justify-between"><span>Committee Review Fee</span><span>${COMMITTEE_REVIEW_FEE.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Co-op Dues (3.0%)</span><span>${dues.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-primary/10 mt-2">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-primary text-background rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Submit to Committee
          </button>
          <p className="text-xs text-foreground/40 text-center">
            Committee review typically completes within seven days. Do not follow up.
          </p>
        </form>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add pages to barrel, alias at cart/checkout paths**

In `src/sites/grassfedwifi/index.ts`, add the imports:
```typescript
import MyShare from "./pages/my-share"
import BecomeAMember from "./pages/become-a-member"
```

And add to the `pages` map (the cart system references `/cart` and `/checkout` internally, so alias both paths to the re-themed pages):
```typescript
  "cart": MyShare,
  "my-share": MyShare,
  "checkout": BecomeAMember,
  "become-a-member": BecomeAMember,
```

- [ ] **Step 4: Manually verify cart flow**

Visit: `http://localhost:3000/shares/heirloom?site=grassfedwifi`
Click "Add to Cart."
Visit: `http://localhost:3000/my-share?site=grassfedwifi`
Expected: Your Share Basket page renders with the item.
Click "Send to Committee."
Expected: Become a Member form renders.
Submit the form.
Expected: "Your Application Has Been Filed" confirmation renders.

- [ ] **Step 5: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.

```bash
git add src/sites/grassfedwifi/pages/my-share.tsx src/sites/grassfedwifi/pages/become-a-member.tsx src/sites/grassfedwifi/index.ts
git commit -m "feat: build grassfedwifi re-themed cart and checkout pages"
```

---

## Task 15: Build Privacy + Terms Pages

**Files:**
- Create: `src/sites/grassfedwifi/pages/privacy.tsx`
- Create: `src/sites/grassfedwifi/pages/terms.tsx`
- Modify: `src/sites/grassfedwifi/index.ts`

**Note:** There is no per-site disclaimer page. The shared Footer auto-links to `specificindustries.com/disclaimer` (the apex umbrella disclaimer) for all non-apex sites. This matches the existing pattern used by all other sites.

- [ ] **Step 1: Create privacy page**

Create `src/sites/grassfedwifi/pages/privacy.tsx`:

```typescript
export const metadata = {
  title: "Privacy Policy — Grass Fed WiFi",
  description: "The co-op's privacy policy defers to the Specific Industries umbrella policy.",
}

export default function Privacy() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>
        <p className="text-foreground/80 leading-relaxed mb-6 italic">
          We keep our data the way we keep our signal: free-roaming and uncollected. What we do not
          need, we do not store. What we cannot explain to a farmer, we do not process.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
          The authoritative privacy policy governing this site is the Specific Industries Privacy Policy,
          available at{" "}
          <a
            href="https://specificindustries.com/privacy"
            className="text-primary hover:underline"
          >
            specificindustries.com/privacy
          </a>.
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Any conflict between statements on this page and the Specific Industries Privacy Policy is
          resolved in favor of the Specific Industries Privacy Policy.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create terms page**

Create `src/sites/grassfedwifi/pages/terms.tsx`:

```typescript
export const metadata = {
  title: "Terms of Use — Grass Fed WiFi",
  description: "The co-op's terms of use defer to the Specific Industries umbrella policy.",
}

export default function Terms() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Terms of Use</h1>
        <p className="text-foreground/80 leading-relaxed mb-6 italic">
          By using this site you acknowledge that the co-op cannot be held responsible for the rhythms
          of the harvest, the moods of the pasture, or the allocation decisions of the committee.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
          The authoritative terms of use governing this site are the Specific Industries Terms of Use,
          available at{" "}
          <a
            href="https://specificindustries.com/terms"
            className="text-primary hover:underline"
          >
            specificindustries.com/terms
          </a>.
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Any conflict between statements on this page and the Specific Industries Terms of Use is
          resolved in favor of the Specific Industries Terms of Use.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add pages to barrel**

In `src/sites/grassfedwifi/index.ts`, add the imports:
```typescript
import Privacy, { metadata as privacyMetadata } from "./pages/privacy"
import Terms, { metadata as termsMetadata } from "./pages/terms"
```

And add to the `pages` map:
```typescript
  "privacy": { component: Privacy, metadata: privacyMetadata },
  "terms": { component: Terms, metadata: termsMetadata },
```

- [ ] **Step 4: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.

```bash
git add src/sites/grassfedwifi/pages/privacy.tsx src/sites/grassfedwifi/pages/terms.tsx src/sites/grassfedwifi/index.ts
git commit -m "feat: build grassfedwifi privacy and terms pages"
```

---

## Task 16: Create Image Generation Script

**Files:**
- Create: `scripts/generate-grassfedwifi-images.ts`

This script follows the pattern of `scripts/generate-truegrit-images.ts`. It generates all 24 images using OpenAI's gpt-image-1 model. The team portraits use base reference photos of the 4 standard people, styled with farmer/amish/conspiracy-theorist prompts.

Running this script requires `OPENAI_API_KEY` in a `.env` file and is time/cost intensive. Images can be generated in parallel or skipped (pages will show broken image UI but functionally work).

- [ ] **Step 1: Create the image generation script**

Create `scripts/generate-grassfedwifi-images.ts`:

```typescript
import OpenAI, { toFile } from "openai"
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUT_DIR = path.resolve(__dirname, "../public/sites/grassfedwifi")
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images")

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const STYLE_SUFFIX =
  "Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Slightly textured, artisan farm-to-table co-op aesthetic. No modern corporate look."

async function generateImage(
  filename: string,
  prompt: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
) {
  const outPath = path.join(OUT_DIR, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename}`)
    return
  }
  console.log(`  GEN   ${filename} ...`)
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt: `${prompt}. ${STYLE_SUFFIX}`,
    size,
    quality: "high",
  })
  const b64 = (response as any).data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

function getPersonPhotos(person: string): string[] {
  const dir = path.join(BASE_IMAGES_DIR, person)
  if (!existsSync(dir)) throw new Error(`Base images dir missing: ${dir}`)
  return readdirSync(dir)
    .filter((f) => /\.(png|jpg|jpeg)$/i.test(f))
    .map((f) => path.join(dir, f))
}

async function generateImageWithPerson(
  filename: string,
  prompt: string,
  person: "bill" | "brandon" | "jim" | "sean",
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
) {
  const outPath = path.join(OUT_DIR, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename}`)
    return
  }
  const photos = getPersonPhotos(person)
  console.log(`  GEN   ${filename} (person: ${person}, refs: ${photos.length}) ...`)
  const imageFiles = await Promise.all(
    photos.map(async (p) => toFile(readFileSync(p), path.basename(p), { type: "image/png" }))
  )
  const response = await openai.images.edit({
    model: "gpt-image-1" as any,
    image: imageFiles as any,
    prompt: `${prompt}. ${STYLE_SUFFIX}`,
    size,
  })
  const b64 = (response as any).data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

async function main() {
  console.log("\nGenerating grassfedwifi images...\n")

  // Hero images (wide)
  await generateImage("home-hero.png", "Wide pastoral landscape: weathered wooden split-rail fence in a rolling green meadow at dawn, with wifi antennas mounted on fence posts like scarecrows, soft morning fog, golden light, one grazing cow in the distance", "1536x1024")
  await generateImage("pasture-hero.png", "Weathered red barn at dusk with coaxial cable trailing from the hayloft like hay bales, surrounded by tall grass and wildflowers, warm orange-purple sky", "1536x1024")
  await generateImage("grazing-hero.png", "Wide-open rolling pasture at dawn with mist rising, a few vintage satellite dishes half-hidden among the grass, distant mountains", "1536x1024")
  await generateImage("calendar-hero.png", "A rustic wooden farm table laid with mason jars of glowing 'raw spectrum' wifi signal, wildflowers, a handwritten seasonal ledger, hand-drawn calendar chart in background", "1536x1024")
  await generateImage("notes-hero.png", "Farmer at a wooden writing desk inside a barn, leather-bound ledger open, antique brass antenna on the desk next to an ink pot and quill, oil lamp light", "1536x1024")

  // Team portraits (person-based, farmer/amish/conspiracy theorist styling)
  await generateImageWithPerson("team-bill.png", "Portrait of an older man with long gray beard, wearing plain brown amish-style farmer clothing and wide-brimmed hat, holding a hand-carved wooden wifi antenna like a shepherd's crook, standing in a meadow, serene conspiracy-theorist expression, looking slightly past the camera", "bill")
  await generateImageWithPerson("team-brandon.png", "Portrait of a middle-aged man wearing flannel work shirt and suspenders with a weathered straw hat, standing in a barn with wifi routers hanging from the rafters behind him, intense earnest expression, slightly paranoid", "brandon")
  await generateImageWithPerson("team-jim.png", "Portrait of a man wearing a plain brown linen work shirt and suspenders in a field of tall grass, holding a lunar calendar chart, amish/farmer aesthetic, concerned studious expression", "jim")
  await generateImageWithPerson("team-sean.png", "Portrait of a man wearing a plain linen shirt with rolled sleeves in an old barn, leather-bound ledger in hands, quill pen behind his ear, serious amish/farmer aesthetic, piercing direct gaze", "sean")

  // Share tier cards
  await generateImage("share-heirloom.png", "A single mason jar filled with soft glowing golden liquid labeled 'HEIRLOOM SHARE' with hand-drawn wheat illustrations, sitting on weathered wood, warm rustic light")
  await generateImage("share-reserve.png", "A mason jar filled with deeper amber glowing liquid labeled 'RESERVE SHARE' with a handwritten tag, sitting in front of an oak barrel, warm rustic candlelight")
  await generateImage("share-estate.png", "An ornate mason jar filled with rich ruby-red glowing liquid labeled 'ESTATE SHARE' with a wax seal and leather cord, sitting on polished barn wood, candlelit dramatic rustic lighting")

  // Seasonal add-ons
  await generateImage("seasonal-spring.png", "A small cloth sack labeled 'Spring Pollen Pack' filled with glowing yellow particles, surrounded by wildflowers and honeybees, soft spring light")
  await generateImage("seasonal-summer.png", "A wooden crate labeled 'Summer Solstice Bundle' filled with sun-ripened glowing mason jars, summer meadow, bright midday sun")
  await generateImage("seasonal-harvest.png", "A handmade wooden basket labeled 'Harvest Moon Premium' overflowing with gold wheat, glowing amber jars, and a full orange harvest moon above")
  await generateImage("seasonal-winter.png", "A cold stone jar labeled 'Winter Reserve' sitting in snow with pine branches, faint cold blue glow emanating from within, quiet winter landscape")

  // Grazing lands map
  await generateImage("grazing-map.png", "Hand-drawn fantasy-style illustrated map on aged parchment, showing a co-op's frequency farm with labeled regions: North Pasture, South Meadow, East Orchard, West Grove, The Upland, Central Barn. Compass rose, tiny hand-drawn antennas instead of trees, mountains and streams, ink-and-watercolor aesthetic", "1536x1024")

  // The Pasture storytelling
  await generateImage("pasture-founding.png", "A lone bearded man in amish-style clothing standing at the top of a mountain at dawn, arms outstretched, with wifi signal waves visible in the sky around him, reverent mythic atmosphere", "1536x1024")
  await generateImage("pasture-barn.png", "Interior of a weathered red barn with exposed beams, hand-woven baskets hanging from the rafters, mason jars of glowing signal on wooden shelves, oil lamp light", "1536x1024")
  await generateImage("pasture-philosophy.png", "Overhead view of a pastoral landscape divided into fields in rotation, with hand-drawn arrows showing seasonal movement of livestock (satellite dishes) between pastures, illustrated almanac aesthetic", "1536x1024")

  // Field Notes thumbnails
  await generateImage("notes-featured-1.png", "A jar of pasteurized milk next to a jar of raw glowing signal, close-up, warm rustic lighting, editorial photography feel")
  await generateImage("notes-featured-2.png", "Hands turning the pages of a weathered leather-bound ledger in sunlight, pastoral background blurred")
  await generateImage("notes-featured-3.png", "A stack of official-looking certification documents being set aside on a wooden barn table, with a lit lantern and an old farmer's cap nearby")

  // Contact page
  await generateImage("contact-pigeon.png", "A white carrier pigeon with a small wifi router strapped to its back with leather straps, flying across a pastoral landscape at dusk, whimsical but earnest illustration")

  // Favicon
  await generateImage("favicon.png", "Simple flat icon of a single mason jar with glowing green wifi signal inside, centered, pastoral sage green and cream color scheme, minimalist", "1024x1024")

  console.log("\nDone.\n")
}

main().catch((err) => {
  console.error("\nFATAL:", err.message || err)
  process.exit(1)
})
```

- [ ] **Step 2: Typecheck the script**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit the script (do not run it yet)**

```bash
git add scripts/generate-grassfedwifi-images.ts
git commit -m "chore: add grassfedwifi image generation script"
```

- [ ] **Step 4: (Optional) Run the script to generate images**

If you have `OPENAI_API_KEY` set in `.env` and want to generate images now:

Run: `npx tsx scripts/generate-grassfedwifi-images.ts`
Expected: ~24 images generated in `public/sites/grassfedwifi/`. Existing images are skipped.

If images are generated, commit them:
```bash
git add public/sites/grassfedwifi/
git commit -m "chore: add generated grassfedwifi images"
```

---

## Task 17: Final Validation

**Files:**
- None (validation only)

- [ ] **Step 1: Run the full smoke test suite**

Run: `npm run test:e2e -- --grep "smoke"`
Expected: all smoke tests PASS, including grassfedwifi.

If grassfedwifi fails due to missing images causing console errors, either (a) run the image generation script first (Task 16 Step 4), or (b) verify the smoke test is checking for specific image-related errors.

- [ ] **Step 2: Typecheck the full project**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual walkthrough**

In the dev server (`npm run dev`), visit each grassfedwifi route and confirm visual correctness:
- `http://localhost:3000/?site=grassfedwifi` (home)
- `http://localhost:3000/shares?site=grassfedwifi`
- `http://localhost:3000/shares/heirloom?site=grassfedwifi`
- `http://localhost:3000/shares/reserve?site=grassfedwifi`
- `http://localhost:3000/shares/estate?site=grassfedwifi`
- `http://localhost:3000/harvest-calendar?site=grassfedwifi`
- `http://localhost:3000/grazing-lands?site=grassfedwifi`
- `http://localhost:3000/the-pasture?site=grassfedwifi`
- `http://localhost:3000/meet-the-farmers?site=grassfedwifi`
- `http://localhost:3000/field-notes?site=grassfedwifi`
- `http://localhost:3000/field-notes/what-we-lost-when-we-pasteurized-the-signal?site=grassfedwifi`
- `http://localhost:3000/contact?site=grassfedwifi`
- `http://localhost:3000/join?site=grassfedwifi`
- `http://localhost:3000/my-share?site=grassfedwifi` (cart)
- `http://localhost:3000/become-a-member?site=grassfedwifi` (checkout)
- `http://localhost:3000/privacy?site=grassfedwifi`
- `http://localhost:3000/terms?site=grassfedwifi`

Confirm:
- All nav items route correctly.
- Footer links work (Privacy, Terms, Disclaimer → apex).
- Cart flow: Add to Cart → My Share → Become a Member → form submit → confirmation.
- Dynamic routes (share detail, field note detail) render correctly for valid slugs, 404 for invalid.

- [ ] **Step 5: Confirm commits are clean**

Run: `git log --oneline -20`
Expected: ~15 commits scoped to grassfedwifi, each with clear `feat:` / `chore:` prefix.

Run: `git status`
Expected: clean working tree.

---

## Appendix: Build Order Rationale

- **Task 1 (fonts)** must come first because config.ts references them.
- **Task 2 (scaffold)** establishes the minimum site with a stub home and the failing-test entry in smoke.spec.ts. This is the TDD "red" state.
- **Tasks 3-5 (data)** precede pages because pages import data. Data is split into related groups for commit hygiene.
- **Task 6 (home)** turns the smoke test green (first TDD "pass").
- **Tasks 7-15 (pages)** add routes incrementally. Each task produces a commit that ends in a working site.
- **Task 16 (image script)** is deferred because it requires an API key and is time/cost intensive. Pages work (visually) without images; the script can run async.
- **Task 17 (validation)** confirms the full suite passes.
