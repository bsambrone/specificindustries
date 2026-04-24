# Unmotivators Inc. Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `unmotivators` subdomain — a satirical demotivational-decor storefront with 64 products (52 office + 12 for-home), full cart/checkout flow, a four-person leadership team, a manifesto, and standard portfolio pages.

**Architecture:** New site under `src/sites/unmotivators/` following the established subdomain-site pattern. Reuses `CartProvider`, `AddToCartButton`, `Toast`, and `CartButton` from `src/components/commerce/`. One dynamic route (`/products/[slug]`). All page routing resolves through the existing catch-all at `src/app/[[...slug]]/page.tsx`; no new App Router folders.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, shared `next/font` declarations. Images generated via OpenAI `gpt-image-1` through the `scripts/generate-*-images.ts` pattern.

**Spec:** `docs/superpowers/specs/2026-04-24-unmotivators-design.md`

**Verification approach:** This codebase has no unit-test suite for site pages. Each task verifies via `npx tsc --noEmit` (type safety), `npm run lint`, and (where reachable) `npm run dev` smoke checks at `localhost:3000/<path>?site=unmotivators`.

**Voice rules (applied across all text content):**
- Posters: dark-deadpan, despair.com register. One bold word at bottom; italic subtitle; 2–3 short paragraphs of prose underneath.
- Desk items (mugs, plaques, paper, supplies, awards, desktoys): passive-aggressive corporate-speak. Use phrases like "per my last email", "circling back", "going forward", "as discussed".
- For Home: resigned, tired acceptance. Weary Gen-X-sigh undertone.
- Never break the fourth wall. The company is sincere about its mission.
- No yellow/gold accent text on light backgrounds (memory convention).

---

## Task 1: Site Scaffolding

Create the empty site shell so the subdomain resolves to a stub homepage. No content yet — just the routing wired up end-to-end. Also add the three new fonts used by Unmotivators.

**Files:**
- Create: `src/sites/unmotivators/config.ts`
- Create: `src/sites/unmotivators/index.ts`
- Create: `src/sites/unmotivators/pages/home.tsx`
- Modify: `src/themes/fonts.ts`
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Add Oswald, Source Serif 4, and JetBrains Mono to `src/themes/fonts.ts`**

Add these imports to the top of `src/themes/fonts.ts` (append to the existing `next/font/google` import list):

```typescript
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed, Fraunces, Nunito, Bowlby_One_SC, Zilla_Slab, IBM_Plex_Mono, Black_Ops_One, Bungee, Work_Sans, Cormorant_Garamond, Lora, Alfa_Slab_One, Permanent_Marker, Oswald, Source_Serif_4, JetBrains_Mono } from "next/font/google"
```

Add these declarations after `permanentMarker`:

```typescript
export const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
})

export const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
})

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})
```

Add these entries to `fontInstanceMap`:

```typescript
  oswald,
  "source-serif-4": sourceSerif4,
  "jetbrains-mono": jetBrainsMono,
```

Add these entries to `fontFamilyMap`:

```typescript
  oswald: "'Oswald', sans-serif",
  "source-serif-4": "'Source Serif 4', serif",
  "jetbrains-mono": "'JetBrains Mono', monospace",
```

- [ ] **Step 2: Create the site config**

Create `src/sites/unmotivators/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Unmotivators Inc.",
  subdomain: "unmotivators",
  theme: {
    preset: "corporate-gray",
    colors: {
      primary: "#1A1A18",
      secondary: "#D4D1CA",
      accent: "#7A2E2E",
      background: "#E5E3DE",
      text: "#1A1A18",
    },
    fonts: {
      heading: "oswald",
      body: "source-serif-4",
    },
  },
  metadata: {
    title: "Unmotivators Inc. — Professional Disappointment, Delivered",
    description: "Honest office decor for people who have stopped pretending. Posters, mugs, plaques, and awards for the workplace that is what it is. Also: things for your home.",
    ogImage: "/sites/unmotivators/hero.png",
  },
  nav: [
    { label: "Office", path: "/office" },
    { label: "Home", path: "/home" },
    { label: "Manifesto", path: "/manifesto" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "consumer-household",
  tagline: "Professional disappointment, delivered.",
}
```

- [ ] **Step 3: Create a stub homepage**

Create `src/sites/unmotivators/pages/home.tsx`:

```typescript
export default function UnmotivatorsHome() {
  return (
    <main className="py-24 px-4 text-center">
      <h1 className="text-5xl font-heading font-bold uppercase tracking-tight text-foreground">
        Unmotivators Inc.
      </h1>
      <p className="mt-4 text-foreground/70">Professional disappointment, delivered.</p>
    </main>
  )
}
```

- [ ] **Step 4: Create the barrel**

Create `src/sites/unmotivators/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import UnmotivatorsHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": UnmotivatorsHome,
}
```

- [ ] **Step 5: Register the site**

Modify `src/sites/registry.ts`.

Add this import after the `carbonneutraloutrage` import (the `dynamicRoutes` export gets added to the barrel in Task 7 — for now, import only `config` and `pages`):

```typescript
import { config as unmotivatorsConfig, pages as unmotivatorsPages } from "./unmotivators"
```

Add this entry to the end of the `siteRegistry` object:

```typescript
  unmotivators: { config: unmotivatorsConfig, pages: unmotivatorsPages },
```

- [ ] **Step 6: Add to the subdomain allowlist**

Modify `src/sites/subdomains.ts`. Add `"unmotivators"` to the end of `VALID_SUBDOMAINS`:

```typescript
export const VALID_SUBDOMAINS = [
  "apex",
  "pigmilk",
  // ...existing entries unchanged...
  "carbonneutraloutrage",
  "unmotivators",
] as const
```

- [ ] **Step 7: Verify**

Run:
```bash
npx tsc --noEmit
npm run lint
```

Expected: both pass with no errors.

Then start the dev server and verify:
```bash
npm run dev
```

Visit `http://localhost:3000/?site=unmotivators` and confirm the stub homepage renders (big "UNMOTIVATORS INC." heading on beige background). Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add src/sites/unmotivators/ src/themes/fonts.ts src/sites/registry.ts src/sites/subdomains.ts
git commit -m "feat(unmotivators): scaffold subdomain site with theme and fonts"
```

---

## Task 2: Product Data File

Create `src/sites/unmotivators/data/products.ts` containing all 64 products with complete data. Products are structured as office-category or home-category, with 8 product types. Descriptions and corporate-excuses blocks follow the voice rules in the plan preamble.

**Files:**
- Create: `src/sites/unmotivators/data/products.ts`

- [ ] **Step 1: Create the product type and helper module**

Create `src/sites/unmotivators/data/products.ts`. Start with the type definitions and helper functions:

```typescript
export type ProductCategory = "office" | "home"

export type ProductType =
  | "poster"
  | "mug"
  | "plaque"
  | "paper"
  | "award"
  | "desktoy"
  | "supply"
  | "homedecor"

export interface Product {
  slug: string
  name: string
  subtitle: string
  category: ProductCategory
  productType: ProductType
  price: number
  priceLabel: string
  listPrice?: number
  description: string[]
  image: string
  corporateExcuses: Array<{ label: string; value: string }>
  sku: string
}

export const productTypeLabels: Record<ProductType, string> = {
  poster: "Posters",
  mug: "Mugs",
  plaque: "Plaques",
  paper: "Paper Goods",
  award: "Awards",
  desktoy: "Desk Toys",
  supply: "Office Supplies",
  homedecor: "Home Decor",
}

export const officeProductTypes: ProductType[] = [
  "poster",
  "mug",
  "plaque",
  "paper",
  "award",
  "desktoy",
  "supply",
]
```

- [ ] **Step 2: Add the `products` array — Posters (18)**

Append to `src/sites/unmotivators/data/products.ts`:

```typescript
export const products: Product[] = [
  // === POSTERS ===
  {
    slug: "mediocrity",
    name: "MEDIOCRITY",
    subtitle: "The gentle hum of a life well-averaged.",
    category: "office",
    productType: "poster",
    price: 247,
    priceLabel: "$247.00",
    listPrice: 289,
    description: [
      "At Unmotivators Inc., we believe the middle is an underserved market. MEDIOCRITY celebrates the quiet accomplishment of meeting no expectations — neither your own, nor anyone else's. Printed on archival matte stock. Framed in stained black oak that has accepted its fate.",
      "The image depicts a single overcast beach at low tide. No figure. No horizon line. No indication of which direction you might walk, if walking still appealed to you.",
      "Hang above a cubicle desk or in a stairwell where people have already stopped reading the posters. Ships in four to six weeks. It will arrive eventually. It always does.",
    ],
    image: "/sites/unmotivators/products/mediocrity.png",
    corporateExcuses: [
      { label: "SKU", value: "UNM-POS-0001-GR" },
      { label: "Finish", value: "Matte, regrettably" },
      { label: "Frame", value: "Stained black oak" },
      { label: "Dimensions", value: '24" × 30"' },
      { label: "Origin", value: "Printed in a state you've driven through" },
      { label: "Warranty", value: "None (reflects product intent)" },
    ],
    sku: "UNM-POS-0001-GR",
  },
  {
    slug: "deadlines",
    name: "DEADLINES",
    subtitle: "Finish lines drawn by people who aren't running.",
    category: "office",
    productType: "poster",
    price: 224,
    priceLabel: "$224.00",
    description: [
      "A meditation on the arbitrary. DEADLINES is the poster you hang in a project room when you have given up on the project room. The image shows a single wristwatch in a desk drawer, face-down, the band slightly worn.",
      "Unmotivators Inc. sources this piece from our ongoing Time Series — a body of work produced in collaboration with two photographers we are still compensating.",
      "Suitable for: product war rooms, shared conference spaces, the wall behind a kanban board no one updates.",
    ],
    image: "/sites/unmotivators/products/deadlines.png",
    corporateExcuses: [
      { label: "SKU", value: "UNM-POS-0002-GR" },
      { label: "Finish", value: "Matte" },
      { label: "Frame", value: "Stained black oak" },
      { label: "Dimensions", value: '24" × 30"' },
      { label: "Ships in", value: "4–6 weeks (approximate)" },
      { label: "Lead time variance", value: "Considerable" },
    ],
    sku: "UNM-POS-0002-GR",
  },
  // ... continue with the remaining 16 posters (teamwork through tomorrow)
]
```

**Complete the remaining 16 posters in the same array** using the table below. Each poster follows the identical schema (category: "office", productType: "poster", 3-paragraph description, matching corporateExcuses structure with SKU + Finish + Frame + Dimensions + two flavor excuses). Use these exact slugs, names, subtitles, prices, and SKUs:

| slug | name | subtitle | price | priceLabel | sku |
|---|---|---|---|---|---|
| teamwork | TEAMWORK | Because blame is easier to distribute than credit. | 229 | $229.00 | UNM-POS-0003-GR |
| potential | POTENTIAL | That feeling you had once, before all this. | 259 | $259.00 | UNM-POS-0004-GR |
| perseverance | PERSEVERANCE | Doing the same thing repeatedly is just a personality now. | 212 | $212.00 | UNM-POS-0005-GR |
| ambition | AMBITION | A lit fuse on an empty barrel. | 238 | $238.00 | UNM-POS-0006-GR |
| synergy | SYNERGY | The shared resignation of people who have stopped asking why. | 199 | $199.00 | UNM-POS-0007-GR |
| leadership | LEADERSHIP | Someone has to decide. It won't be you. | 264 | $264.00 | UNM-POS-0008-GR |
| innovation | INNOVATION | Rearranging deck chairs with confidence. | 241 | $241.00 | UNM-POS-0009-GR |
| excellence | EXCELLENCE | The silent expectation you will never quite meet. | 257 | $257.00 | UNM-POS-0010-GR |
| commitment | COMMITMENT | Nine years in and no one remembers why you started. | 219 | $219.00 | UNM-POS-0011-GR |
| growth | GROWTH | The metric that made the numbers more important than the people. | 232 | $232.00 | UNM-POS-0012-GR |
| dreams | DREAMS | Ambitions your brain hasn't talked you out of yet. | 244 | $244.00 | UNM-POS-0013-GR |
| opportunity | OPPORTUNITY | It knocked. You were in a meeting. | 207 | $207.00 | UNM-POS-0014-GR |
| patience | PATIENCE | The ability to pretend a meeting is productive. | 188 | $188.00 | UNM-POS-0015-GR |
| balance | BALANCE | The equal distribution of all your disappointments. | 226 | $226.00 | UNM-POS-0016-GR |
| success | SUCCESS | A moving target. Upward. Always upward. | 251 | $251.00 | UNM-POS-0017-GR |
| tomorrow | TOMORROW | Where your ambitions go to wait. | 218 | $218.00 | UNM-POS-0018-GR |

For each, write a 3-paragraph description in the dark-deadpan voice of MEDIOCRITY/DEADLINES above. Each description:
1. Paragraph 1 introduces the theme and describes the poster's image (always something bleak, understated, single-subject — e.g., an empty cubicle, a dying plant, a cold coffee, an unoccupied chair).
2. Paragraph 2 references Unmotivators Inc. as the publisher in a corporate-serious register.
3. Paragraph 3 gives suggested hanging locations.

Each corporateExcuses array has exactly 6 entries: `SKU`, `Finish` (always "Matte" or "Matte, regrettably"), `Frame` (always "Stained black oak"), `Dimensions` (always `'24" × 30"'`), plus two flavor excuses drawn from this pool (vary across posters): `Ships in`, `Origin`, `Warranty`, `Lead time variance`, `Signed by artist`, `Run size`, `Archival rating`, `Crate weight`.

- [ ] **Step 3: Add the Mugs (8)**

Append to the `products` array. Here's the first mug in full:

```typescript
  // === MUGS ===
  {
    slug: "worlds-okayest-employee-mug",
    name: "World's Okayest Employee Mug",
    subtitle: "Circling back on your performance. It's fine.",
    category: "office",
    productType: "mug",
    price: 89,
    priceLabel: "$89.00",
    description: [
      "For the employee who is neither great nor a liability. This mug acknowledges your consistent presence without making a fuss about it. 14 oz ceramic, dishwasher-safe, emotionally neutral.",
      "Going forward, when colleagues ask what your path looks like at the company, hold this mug. Make eye contact. Drink.",
      "Per last quarter's values review, this mug aligns with our commitment to honest recognition.",
    ],
    image: "/sites/unmotivators/products/worlds-okayest-employee-mug.png",
    corporateExcuses: [
      { label: "SKU", value: "UNM-MUG-0001" },
      { label: "Capacity", value: "14 oz" },
      { label: "Material", value: "Stoneware" },
      { label: "Dishwasher", value: "Safe" },
      { label: "Microwave", value: "Safe (your career is not)" },
      { label: "Onboarding status", value: "Completed with notes" },
    ],
    sku: "UNM-MUG-0001",
  },
```

**Complete the remaining 7 mugs** using this table:

| slug | name | subtitle | price |
|---|---|---|---|
| meeting-survivor-mug | I Survived Another Meeting Mug | Tally-mark glaze. Engraved forever. | 94 |
| net-30-sadness-mug | Net 30 Sadness Mug | Brewed. Drained. Invoiced. | 87 |
| out-of-office-mug | Out of Office Mug | Stays in the office. Like you. | 82 |
| tps-report-travel-mug | TPS Report Travel Mug | Now with bonus TPS cover sheet. | 103 |
| synergy-tea-mug | Synergy Tea Mug | Brewed by committee. | 78 |
| actual-ceramic-coffee-mug | Actual Ceramic Coffee Mug | Please stop projecting onto it. | 76 |
| regret-roast-mug | Regret Roast Mug | The inspirational quote has faded. | 91 |

SKUs: `UNM-MUG-0002` through `UNM-MUG-0008` in table order. Prices must use the formatted `priceLabel` convention (`$XX.00`). Each description is 2–3 paragraphs in the passive-aggressive corporate voice. Each `corporateExcuses` array has 6 entries including SKU + Capacity (14 or 16 oz) + Material + 3 flavor excuses (examples: `Microwave`, `Dishwasher`, `Drop-test`, `Handle`, `Onboarding status`, `Quarterly review`, `Recyclability`, `Fragility`).

- [ ] **Step 4: Add the Desk Plaques / Nameplates (6)**

Append to the `products` array. Here's the first plaque in full:

```typescript
  // === PLAQUES ===
  {
    slug: "manager-of-unmet-expectations-plaque",
    name: "Manager of Unmet Expectations",
    subtitle: "Per my last email, the title is accurate.",
    category: "office",
    productType: "plaque",
    price: 184,
    priceLabel: "$184.00",
    description: [
      "A laser-engraved walnut plaque acknowledging the uncomfortable space between what was promised at hire and what has actually occurred. Measures eight by three inches. Discreetly mounted on a slim brass base.",
      "Circling back: this is a durable, professional piece that looks appropriate on any manager's desk. It makes no claims that cannot be defended in a 1:1.",
      "Ships with a blank engraving tag, in case your expectations drift further downward and you need to revise.",
    ],
    image: "/sites/unmotivators/products/manager-of-unmet-expectations-plaque.png",
    corporateExcuses: [
      { label: "SKU", value: "UNM-PLQ-0001" },
      { label: "Material", value: "Walnut, brass base" },
      { label: "Dimensions", value: '8" × 3"' },
      { label: "Engraving", value: "Laser, single pass" },
      { label: "Replacement tag", value: "Included" },
      { label: "Justification", value: "Defensible" },
    ],
    sku: "UNM-PLQ-0001",
  },
```

**Complete the remaining 5 plaques** using this table:

| slug | name | subtitle | price | sku |
|---|---|---|---|---|
| employee-of-the-month-plaque | Employee of the Month (June 2019) | The month was what it was. | 162 | UNM-PLQ-0002 |
| head-of-standing-meetings-plaque | Head of Standing Meetings | As discussed, daily, forever. | 171 | UNM-PLQ-0003 |
| vp-of-reply-all-plaque | VP of Reply-All | Please stop adding me to this thread. | 198 | UNM-PLQ-0004 |
| senior-individual-contributor-plaque | Senior Individual Contributor | Promoted in lieu of a raise since 2021. | 156 | UNM-PLQ-0005 |
| founder-subject-matter-enthusiast-plaque | Founder, Subject Matter Enthusiast | The enthusiasm is self-reported. | 213 | UNM-PLQ-0006 |

Descriptions: 2–3 paragraphs in passive-aggressive corporate voice. `corporateExcuses`: 6 entries including SKU + Material (walnut, brass, or cherry) + Dimensions + 3 flavor excuses.

- [ ] **Step 5: Add the Paper Goods (6)**

Append to the `products` array:

```typescript
  // === PAPER GOODS ===
  {
    slug: "its-fine-sticky-notes",
    name: '"It\'s Fine" Sticky Notes',
    subtitle: "A 500-count pad. Neutral gray. Pre-printed.",
    category: "office",
    productType: "paper",
    price: 67,
    priceLabel: "$67.00",
    description: [
      "Every sheet reads \"it's fine.\" in lowercase, set in a soft humanist serif. Useful for meetings that have concluded inconclusively, for project updates that haven't moved, and for situations in which a response is required but none is available.",
      "Going forward, affix one to any document you would rather not read. This does not solve the problem. It does, however, communicate your current relationship to it.",
      "Pad is bound on the long edge and peels cleanly, most of the time.",
    ],
    image: "/sites/unmotivators/products/its-fine-sticky-notes.png",
    corporateExcuses: [
      { label: "SKU", value: "UNM-PAP-0001" },
      { label: "Sheet count", value: "500" },
      { label: "Dimensions", value: '3" × 3"' },
      { label: "Adhesive", value: "Adequate" },
      { label: "Color", value: "Neutral gray" },
      { label: "Recycled content", value: "Unverified" },
    ],
    sku: "UNM-PAP-0001",
  },
```

**Complete the remaining 5 paper goods** using this table:

| slug | name | subtitle | price | sku |
|---|---|---|---|---|
| undone-notebook | The Undone Notebook | 300 pages of pre-printed unchecked boxes. | 74 | UNM-PAP-0002 |
| procrastination-wall-calendar-2026 | 2026 Procrastination Wall Calendar | Every month is February. | 58 | UNM-PAP-0003 |
| looming-deadline-desk-calendar | Looming Deadline Desk Calendar | Every day is T-minus 3. | 62 | UNM-PAP-0004 |
| per-my-last-email-legal-pad | "Per My Last Email" Legal Pad | Every page begins with the phrase. | 54 | UNM-PAP-0005 |
| quiet-quitting-planner | Quiet Quitting Planner | Blank pages, bound handsomely. | 89 | UNM-PAP-0006 |

Descriptions: 2–3 paragraphs in corporate-deadpan voice. `corporateExcuses`: 6 entries including SKU + Sheet count or Page count + Dimensions + 3 flavor excuses.

- [ ] **Step 6: Add the Awards & Trophies (5)**

Append to the `products` array:

```typescript
  // === AWARDS ===
  {
    slug: "showed-up-most-days-2025-trophy",
    name: '"Showed Up Most Days 2025" Trophy',
    subtitle: "As discussed, attendance is a minimum viable accomplishment.",
    category: "office",
    productType: "award",
    price: 312,
    priceLabel: "$312.00",
    description: [
      "A ten-inch gold-plated participation trophy recognizing the achievement of regular physical presence in 2025. The plaque on the base is engraved with no name, to allow flexible attribution.",
      "Going forward, this trophy serves as the anchor of an honest recognition program. It can be awarded to any team member whose attendance is, on the whole, positive.",
      "Per last quarter's values review, this award aligns with Unmotivators' commitment to sustainable discontent.",
    ],
    image: "/sites/unmotivators/products/showed-up-most-days-2025-trophy.png",
    corporateExcuses: [
      { label: "SKU", value: "UNM-AWD-0001" },
      { label: "Height", value: '10"' },
      { label: "Finish", value: "Gold-plated resin" },
      { label: "Base", value: "Black marble (composite)" },
      { label: "Engraving", value: "Generic, by design" },
      { label: "Recognition value", value: "Symbolic" },
    ],
    sku: "UNM-AWD-0001",
  },
```

**Complete the remaining 4 awards** using this table:

| slug | name | subtitle | price | sku |
|---|---|---|---|---|
| five-year-veteran-same-title-certificate | "5-Year Veteran of the Same Job Title" Certificate | Framed. Generic. Unsigned. | 218 | UNM-AWD-0002 |
| longest-held-middle-management-plaque | "Longest Held Position in Middle Management" Plaque | Brass. Engraved. Accurate. | 267 | UNM-AWD-0003 |
| participation-q3-crystal-award | "Participation in Q3" Crystal Award | Unengraved. By request. | 389 | UNM-AWD-0004 |
| person-who-did-not-complain-medal | "Person Who Did Not Complain" Medal | Ribbon. Brass. Unconvincing. | 203 | UNM-AWD-0005 |

Descriptions: 2–3 paragraphs in corporate-deadpan voice. `corporateExcuses`: 6 entries.

- [ ] **Step 7: Add the Desk Toys / Stress Items (5)**

Append to the `products` array:

```typescript
  // === DESK TOYS ===
  {
    slug: "deflating-stress-ball",
    name: "The Deflating Stress Ball",
    subtitle: "Loses air slowly. As discussed, this is intentional.",
    category: "office",
    productType: "desktoy",
    price: 124,
    priceLabel: "$124.00",
    description: [
      "A foam stress ball engineered with a pinhole leak. Over the course of a fiscal quarter, it softens — and then collapses — on your desk, in full view of everyone.",
      "Unmotivators Inc. developed the Deflating Stress Ball after twenty-two weeks of internal user research. We are very proud of it.",
      "Going forward, the Deflating Stress Ball can be re-inflated with a standard bike pump, should you wish to extend the metaphor.",
    ],
    image: "/sites/unmotivators/products/deflating-stress-ball.png",
    corporateExcuses: [
      { label: "SKU", value: "UNM-TOY-0001" },
      { label: "Material", value: "Closed-cell foam" },
      { label: "Initial firmness", value: "Moderate" },
      { label: "Half-life", value: "Approximately 12 weeks" },
      { label: "Reinflation", value: "Possible" },
      { label: "Moral", value: "Implicit" },
    ],
    sku: "UNM-TOY-0001",
  },
```

**Complete the remaining 4 desk toys** using this table:

| slug | name | subtitle | price | sku |
|---|---|---|---|---|
| zen-garden-bad-rake | Zen Garden (With Bad Rake) | The rake is wider than the tray. | 149 | UNM-TOY-0002 |
| hvac-desktop-noisemaker | Desktop Noisemaker: Office HVAC | Ambient fluorescent hum. On loop. | 113 | UNM-TOY-0003 |
| newtons-cradle-of-regret | Newton's Cradle of Regret | The balls do not click back. | 158 | UNM-TOY-0004 |
| existential-magic-8-ball | Existential Magic 8-Ball | Reply hazy. Try less. | 96 | UNM-TOY-0005 |

Descriptions: 2–3 paragraphs. `corporateExcuses`: 6 entries.

- [ ] **Step 8: Add the Office Supplies (4)**

Append to the `products` array:

```typescript
  // === OFFICE SUPPLIES ===
  {
    slug: "assorted-disappointments-pen-set",
    name: "Assorted Disappointments Pen Set",
    subtitle: "Twelve black pens. All slightly different. None correct.",
    category: "office",
    productType: "supply",
    price: 84,
    priceLabel: "$84.00",
    description: [
      "A curated set of twelve black ballpoint pens. Each pen is subtly, visibly wrong: a cap that does not click, a clip that bends outward, a barrel that is slightly shorter than the rest. None of them match.",
      "Going forward, this set lives in the pen cup, waiting to be selected. You will select one. It will not be the right one.",
      "Per my last email, this set is made in partnership with a factory that is still returning our calls, as of press time.",
    ],
    image: "/sites/unmotivators/products/assorted-disappointments-pen-set.png",
    corporateExcuses: [
      { label: "SKU", value: "UNM-SUP-0001" },
      { label: "Quantity", value: "12 pens" },
      { label: "Ink color", value: "Black (approximately)" },
      { label: "Refill", value: "Not advised" },
      { label: "Match rate", value: "0%" },
      { label: "Rebranding option", value: "Available for volume orders" },
    ],
    sku: "UNM-SUP-0001",
  },
```

**Complete the remaining 3 supplies** using this table:

| slug | name | subtitle | price | sku |
|---|---|---|---|---|
| this-desk-belongs-to-redacted-nameplate | "This Desk Belongs to [REDACTED]" Nameplate Insert | For when you no longer wish to be found. | 71 | UNM-SUP-0002 |
| depressive-mouse-pad | Depressive Mouse Pad | Bleak stock photo under rubber. | 58 | UNM-SUP-0003 |
| temporary-employee-name-tag | "Temporary Employee" Name Tag | Magnetic. Reusable. Permanent. | 47 | UNM-SUP-0004 |

Descriptions: 2–3 paragraphs. `corporateExcuses`: 6 entries each.

- [ ] **Step 9: Add the For Home products (12)**

Append to the `products` array. These are `category: "home"` and `productType: "homedecor"`. Here's the flagship item in full:

```typescript
  // === FOR HOME ===
  {
    slug: "exist-endure-expire-wall-art",
    name: '"EXIST. ENDURE. EXPIRE." Wall Art',
    subtitle: "The three-word sampler for the resigned.",
    category: "home",
    productType: "homedecor",
    price: 189,
    priceLabel: "$189.00",
    description: [
      "A rustic-wood-plank wall piece in the tradition of the live-laugh-love sampler, rendered in the same brush-script font and whitewashed finish. The words are the only thing that has changed.",
      "Hang this above a couch, a laundry basket, or a pile of mail you have not opened. It will match any paint color because the paint color no longer matters.",
      "Ships flat. Mounting hardware included. Hanging it is optional. Propping it against a wall is, increasingly, the American way.",
    ],
    image: "/sites/unmotivators/products/exist-endure-expire-wall-art.png",
    corporateExcuses: [
      { label: "SKU", value: "UNM-HOM-0001" },
      { label: "Material", value: "Reclaimed pine" },
      { label: "Finish", value: "Whitewashed" },
      { label: "Dimensions", value: '24" × 10"' },
      { label: "Mounting", value: "Flush or leaning, as you prefer" },
      { label: "Lighting recommendation", value: "Any" },
    ],
    sku: "UNM-HOM-0001",
  },
```

**Complete the remaining 11 For Home products** using this table. All use `category: "home"` and `productType: "homedecor"`.

| slug | name | subtitle | price | sku |
|---|---|---|---|---|
| live-laugh-leave-throw-pillow | "Live, Laugh, Leave" Throw Pillow | Script font. Accent piece. Existential. | 124 | UNM-HOM-0002 |
| the-dishes-wooden-letter-sign | "THE DISHES" Wooden Letter Sign | For the kitchen, should you return to it. | 146 | UNM-HOM-0003 |
| home-equity-line-of-credit-plaque | "Home Sweet Home Equity Line of Credit" Cross-Stitch Plaque | Framed. Appraised. Adjusting. | 178 | UNM-HOM-0004 |
| part-of-the-day-between-shifts-doormat | "Welcome to the Part of the Day Between Shifts" Doormat | Coir. Industrial. Realistic. | 134 | UNM-HOM-0005 |
| resigned-acceptance-doormat | Resigned Acceptance Doormat | It just reads "Okay." | 128 | UNM-HOM-0006 |
| ambient-burnout-candle | Ambient Burnout Candle | Notes of cardboard, cold coffee, and HVAC. | 156 | UNM-HOM-0007 |
| bless-this-mess-kitchen-towel | "Bless This Mess (And Everyone In It)" Kitchen Towel | Hand-embroidered. Airless laundry room. | 92 | UNM-HOM-0008 |
| wine-oclock-was-a-warning-tumbler | "Wine O'Clock Was a Warning" Wine Tumbler | Stemless. Stainless. Sincere. | 108 | UNM-HOM-0009 |
| gather-here-if-you-must-sign | "Gather Here (If You Must)" Dining Room Sign | Farmhouse-style. Reluctant. | 142 | UNM-HOM-0010 |
| family-faith-firmly-middle-class-sampler | "Family. Faith. Firmly Middle Class." Embroidered Sampler | Cross-stitch. Framed. Accurate. | 167 | UNM-HOM-0011 |
| this-is-fine-coffee-table-book | "This Is Fine" Coffee Table Book | 240 blank pages. Hardcover. Heavy. | 214 | UNM-HOM-0012 |

Descriptions: 2–3 paragraphs in the **weary resigned** voice (gentler than the corporate desk items, no "circling back" phrases — these belong in a home, not an office). `corporateExcuses`: 6 entries each.

- [ ] **Step 10: Add the helper functions at the bottom of the file**

Append to `src/sites/unmotivators/data/products.ts`:

```typescript
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductsByType(type: ProductType): Product[] {
  return products.filter((p) => p.productType === type)
}

export function getFeaturedProducts(): Product[] {
  const featuredSlugs = [
    "mediocrity",
    "worlds-okayest-employee-mug",
    "manager-of-unmet-expectations-plaque",
    "showed-up-most-days-2025-trophy",
    "exist-endure-expire-wall-art",
    "deflating-stress-ball",
  ]
  return featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => !!p)
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug)
  if (!current) return []
  const sameType = products.filter((p) => p.productType === current.productType && p.slug !== slug)
  const others = products.filter((p) => p.productType !== current.productType && p.slug !== slug)
  return [...sameType, ...others].slice(0, limit)
}
```

- [ ] **Step 11: Verify**

Run:
```bash
npx tsc --noEmit
npm run lint
```

Expected: both pass. Verify the array has exactly 64 entries:

```bash
grep -c "^  {" src/sites/unmotivators/data/products.ts
```

Expected: `64`

- [ ] **Step 12: Commit**

```bash
git add src/sites/unmotivators/data/products.ts
git commit -m "feat(unmotivators): add 64-product catalog with helpers"
```

---

## Task 3: Leadership Data File

Four executives, all male, using base images `bill`, `brandon`, `jim`, `sean`. Both first AND last names are randomized (they do not share any common component). Bios are written in resigned third-person.

**Files:**
- Create: `src/sites/unmotivators/data/leadership.ts`

- [ ] **Step 1: Create the leadership data file**

Create `src/sites/unmotivators/data/leadership.ts`:

```typescript
export interface Leader {
  slug: string
  name: string
  title: string
  yearsOfService: number
  bio: string
  quote: string
  portraitImage: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const leaders: Leader[] = [
  {
    slug: "holden-marsham",
    name: "Holden Marsham",
    title: "Chief Disappointment Officer",
    yearsOfService: 14,
    bio: "Holden founded Unmotivators Inc. in 2012 after the collapse of his motivational-speaking career, which ended during a conference keynote in Sarasota when, three minutes in, he stopped and told the audience the truth. The audience did not clap. He walked off the stage and, eventually, to here. He has not spoken at a conference since. He attends meetings. He signs paperwork. He does not remember why he started the company, but the company continues, and so does he.",
    quote: "Motivation is a product. We just make an honest one.",
    portraitImage: "/sites/unmotivators/leaders/holden-marsham.png",
    person: "bill",
  },
  {
    slug: "russell-atholton",
    name: "Russell Atholton",
    title: "VP of Unmet Potential",
    yearsOfService: 11,
    bio: "Russell joined Unmotivators Inc. in 2015 as a product manager. He has not been promoted. He has not been demoted. His annual performance review has used the same language since 2018, and he has not asked about it. He manages a team of four, though one of them transferred quietly last November, and the org chart has not been updated. His office has a plant that may or may not be real. He prefers not to check.",
    quote: "Ambition is a subscription. I canceled mine in 2019.",
    portraitImage: "/sites/unmotivators/leaders/russell-atholton.png",
    person: "brandon",
  },
  {
    slug: "dennis-kelwick",
    name: "Dennis Kelwick",
    title: "Director of Managed Expectations",
    yearsOfService: 9,
    bio: "Dennis is responsible for lowering the expectations of staff, customers, and the board. He runs a quarterly review process in which every number is restated downward, with a footnote. The footnote is always the same footnote. He has a desk. His office has a window. The blinds are usually closed. He attends all-hands meetings. He does not speak during them. He would like this bio to end.",
    quote: "If you give people less to hope for, they grieve less when it doesn't happen.",
    portraitImage: "/sites/unmotivators/leaders/dennis-kelwick.png",
    person: "jim",
  },
  {
    slug: "mitchell-pardove",
    name: "Mitchell Pardove",
    title: "Head of Burnout Operations",
    yearsOfService: 12,
    bio: "Mitchell oversees Unmotivators Inc.'s commitment to sustainable disappointment. He runs an internal program called Preserved Exhaustion, which identifies employees whose weariness is the most authentic and institutionalizes them. He himself was institutionalized in 2017. He has not taken a vacation since. He does not know what he would do with one. He has a pair of shoes by the door. He will wear them again, probably, soon.",
    quote: "Burnout is a resource. We manage it the way some companies manage water.",
    portraitImage: "/sites/unmotivators/leaders/mitchell-pardove.png",
    person: "sean",
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
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
git add src/sites/unmotivators/data/leadership.ts
git commit -m "feat(unmotivators): add four-executive leadership roster"
```

---

## Task 4: Homepage

Replace the stub homepage with a full hero, featured products grid, and "What We Believe" teaser that links to the manifesto.

**Files:**
- Modify: `src/sites/unmotivators/pages/home.tsx`

- [ ] **Step 1: Replace the homepage content**

Overwrite `src/sites/unmotivators/pages/home.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { getFeaturedProducts } from "@/sites/unmotivators/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { getSiteHref } from "@/lib/site-href"

export default async function UnmotivatorsHome() {
  const featured = getFeaturedProducts()
  const siteHref = await getSiteHref()

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-6 bg-[linear-gradient(180deg,#fff_0%,#f4f1e8_100%)] border-b border-foreground/10 shadow-[inset_0_-2px_8px_rgba(0,0,0,0.1)]" aria-hidden />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-4">
              Unmotivators Inc. — Est. eventually
            </p>
            <h1 className="text-5xl md:text-6xl font-heading font-bold uppercase tracking-tight text-foreground leading-tight mb-6">
              Motivation is a scam. We're here to help.
            </h1>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Unmotivators Inc. produces honest office decor for people who have stopped pretending. Posters, mugs, plaques, awards, and, for when you go home, decor that also will not lie to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={siteHref("/office")}
                className="inline-block px-6 py-3 bg-accent text-[#F5F3EE] font-heading font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
              >
                Shop the Office
              </Link>
              <Link
                href={siteHref("/home")}
                className="inline-block px-6 py-3 border border-foreground text-foreground font-heading font-semibold uppercase tracking-wide hover:bg-foreground hover:text-[#F5F3EE] transition-colors"
              >
                Shop for Home
              </Link>
            </div>
          </div>
          <div className="relative aspect-[5/6] bg-secondary/40 border border-foreground/10">
            <Image
              src="/sites/unmotivators/hero.png"
              alt="An empty gray cubicle photographed from behind an unoccupied office chair. A single unframed poster leans against the partition."
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground text-center mb-2">
            Currently Available
          </h2>
          <p className="text-center text-foreground/60 mb-10">
            A selection of the most popular items, per last quarter's data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                price={p.priceLabel}
                tagline={p.subtitle}
                image={p.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground mb-6">
            What We Believe
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Motivation was sold to you. It was branded. It was packaged. It was printed on heavy stock and hung above a water cooler, and it did not help you.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            At Unmotivators Inc., we believe that the most useful thing an object can do, on a wall, on a desk, or next to a sink, is tell the truth. We make those objects. We sell them at a price we can defend.
          </p>
          <Link
            href={siteHref("/manifesto")}
            className="inline-block px-6 py-3 bg-foreground text-[#F5F3EE] font-heading font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            Read the Manifesto
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Update the barrel to keep the homepage wired up**

(No change needed. The barrel from Task 1 Step 4 already exports `UnmotivatorsHome` under the `""` key.)

- [ ] **Step 3: Verify**

Run:
```bash
npx tsc --noEmit
npm run lint
```

Start dev server, visit `http://localhost:3000/?site=unmotivators`. Confirm:
- Hero renders with the two buttons
- Featured grid shows 6 products (images broken until Task 13 runs — this is expected)
- "Read the Manifesto" links to `/manifesto` (will 404 until Task 9)

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/sites/unmotivators/pages/home.tsx
git commit -m "feat(unmotivators): build homepage with hero and featured products"
```

---

## Task 5: Office Catalog Page with Filter Chips

A client component that lists all 52 office products with filter chips for each product type. Chips toggle between all office products and a single type at a time.

**Files:**
- Create: `src/sites/unmotivators/pages/office.tsx`
- Modify: `src/sites/unmotivators/index.ts`

- [ ] **Step 1: Create the office page**

Create `src/sites/unmotivators/pages/office.tsx`:

```typescript
"use client"

import { useState } from "react"
import {
  getProductsByCategory,
  officeProductTypes,
  productTypeLabels,
  type Product,
  type ProductType,
} from "@/sites/unmotivators/data/products"
import { ClientProductCard } from "@/sites/unmotivators/components/client-product-card"

export const metadata = {
  title: "For the Office — Unmotivators Inc.",
  description: "Posters, mugs, plaques, paper goods, awards, desk toys, and office supplies for the workplace that is what it is.",
}

type Filter = "all" | ProductType

export default function UnmotivatorsOffice() {
  const [filter, setFilter] = useState<Filter>("all")
  const allOffice = getProductsByCategory("office")
  const filtered: Product[] =
    filter === "all" ? allOffice : allOffice.filter((p) => p.productType === filter)

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
            Catalog / Office
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-foreground mb-3">
            For the Office
          </h1>
          <p className="text-foreground/70 max-w-2xl">
            The workplace is what it is. These products do not pretend otherwise.
          </p>
        </header>

        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap gap-2">
          <FilterChip label="All" active={filter === "all"} onClick={() => setFilter("all")} />
          {officeProductTypes.map((type) => (
            <FilterChip
              key={type}
              label={productTypeLabels[type]}
              active={filter === type}
              onClick={() => setFilter(type)}
            />
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ClientProductCard
              key={p.slug}
              slug={p.slug}
              name={p.name}
              price={p.priceLabel}
              tagline={p.subtitle}
              image={p.image}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-foreground/60 py-20">No products in this category.</p>
        )}
      </div>
    </section>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-heading text-sm uppercase tracking-wide border transition-colors ${
        active
          ? "bg-foreground text-[#F5F3EE] border-foreground"
          : "bg-transparent text-foreground border-foreground/30 hover:border-foreground"
      }`}
    >
      {label}
    </button>
  )
}
```

- [ ] **Step 2: Create a client product card wrapper**

`ProductCard` from `@/components/ui/product-card` is an async server component. Client components can't call it directly. Create a thin client-safe wrapper.

Create `src/sites/unmotivators/components/client-product-card.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useSiteLink } from "@/hooks/use-site-link"

interface ClientProductCardProps {
  slug: string
  name: string
  price: string
  tagline: string
  image: string
  showAddToCart?: boolean
}

export function ClientProductCard({
  slug,
  name,
  price,
  tagline,
  image,
  showAddToCart = true,
}: ClientProductCardProps) {
  const siteHref = useSiteLink()
  const href = siteHref(`/products/${slug}`)

  return (
    <div className="border border-foreground/20 bg-background hover:border-foreground transition-colors">
      <Link href={href}>
        <div className="relative aspect-square bg-secondary/40">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-5">
        <Link href={href}>
          <h3 className="font-heading text-lg uppercase tracking-tight text-foreground leading-tight mb-1 hover:underline">
            {name}
          </h3>
        </Link>
        <p className="text-sm italic text-foreground/70 mb-4 leading-snug">{tagline}</p>
        <p className="font-heading text-xl text-accent mb-4">{price}</p>
        {showAddToCart && (
          <AddToCartButton
            slug={slug}
            productName={name}
            className="w-full px-4 py-2.5 bg-accent text-[#F5F3EE] font-heading uppercase tracking-wide hover:opacity-90 transition-opacity"
          />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Wire the page into the barrel**

Modify `src/sites/unmotivators/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import UnmotivatorsHome from "./pages/home"
import UnmotivatorsOffice, { metadata as officeMetadata } from "./pages/office"

export { config }

export const pages: Record<string, PageEntry> = {
  "": UnmotivatorsHome,
  "office": { component: UnmotivatorsOffice, metadata: officeMetadata },
}
```

- [ ] **Step 4: Verify**

Run:
```bash
npx tsc --noEmit
npm run lint
```

Start dev, visit `http://localhost:3000/office?site=unmotivators`. Confirm:
- All 52 office products render in the grid
- Clicking a chip (e.g., "Mugs") narrows to that type
- Clicking "All" returns to the full list

Stop dev.

- [ ] **Step 5: Commit**

```bash
git add src/sites/unmotivators/pages/office.tsx src/sites/unmotivators/components/ src/sites/unmotivators/index.ts
git commit -m "feat(unmotivators): add office catalog page with filter chips"
```

---

## Task 6: For Home Catalog Page

A simpler grid-only page for the 12 home products. No filter chips.

**Files:**
- Create: `src/sites/unmotivators/pages/for-home.tsx`
- Modify: `src/sites/unmotivators/index.ts`

- [ ] **Step 1: Create the for-home page**

Create `src/sites/unmotivators/pages/for-home.tsx`:

```typescript
import { getProductsByCategory } from "@/sites/unmotivators/data/products"
import { ClientProductCard } from "@/sites/unmotivators/components/client-product-card"

export const metadata = {
  title: "For Home — Unmotivators Inc.",
  description: "Because when you go home, the disappointment follows you. Bring it along, displayed.",
}

export default function UnmotivatorsForHome() {
  const products = getProductsByCategory("home")

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
            Catalog / Home
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-foreground mb-3">
            For Home
          </h1>
          <p className="text-foreground/70 max-w-2xl">
            The office follows you home. It always has. Unmotivators Inc. offers a small selection of household goods for the part of the day between shifts — because the wall above the couch should also be honest about things.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ClientProductCard
              key={p.slug}
              slug={p.slug}
              name={p.name}
              price={p.priceLabel}
              tagline={p.subtitle}
              image={p.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire the page into the barrel**

Modify `src/sites/unmotivators/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import UnmotivatorsHome from "./pages/home"
import UnmotivatorsOffice, { metadata as officeMetadata } from "./pages/office"
import UnmotivatorsForHome, { metadata as forHomeMetadata } from "./pages/for-home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": UnmotivatorsHome,
  "office": { component: UnmotivatorsOffice, metadata: officeMetadata },
  "home": { component: UnmotivatorsForHome, metadata: forHomeMetadata },
}
```

- [ ] **Step 3: Verify**

Run `npx tsc --noEmit && npm run lint`. Start dev, visit `http://localhost:3000/home?site=unmotivators`. Confirm 12 home products render in a grid.

- [ ] **Step 4: Commit**

```bash
git add src/sites/unmotivators/pages/for-home.tsx src/sites/unmotivators/index.ts
git commit -m "feat(unmotivators): add for-home catalog page"
```

---

## Task 7: Product Detail Page (Dynamic Route)

One dynamic route (`/products/[slug]`) that renders any of the 64 products. Reuses the pigmilk shape with corporate-excuses block styled like a spec sheet.

**Files:**
- Create: `src/sites/unmotivators/pages/product-detail.tsx`
- Modify: `src/sites/unmotivators/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create the product detail page**

Create `src/sites/unmotivators/pages/product-detail.tsx`:

```typescript
import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "@/sites/unmotivators/data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { ClientProductCard } from "@/sites/unmotivators/components/client-product-card"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)

  return (
    <>
      {/* Product hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square bg-secondary/40 border border-foreground/10">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              fetchPriority="high"
            />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
              SKU: {product.sku}
            </p>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg italic text-foreground/70 mb-6 leading-snug">{product.subtitle}</p>

            <div className="mb-8">
              {product.listPrice && product.listPrice > product.price && (
                <p className="text-sm text-foreground/50 line-through">
                  List price: ${product.listPrice.toFixed(2)}
                </p>
              )}
              <p className="text-3xl font-heading text-accent">{product.priceLabel}</p>
            </div>

            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-4 bg-accent text-[#F5F3EE] font-heading uppercase tracking-wide text-base hover:opacity-90 transition-opacity w-full sm:w-auto"
              />
            </div>

            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/80 mb-4 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Excuses (spec-sheet parody) */}
      <section className="py-12 px-4 bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-md mx-auto">
          <div className="bg-background border border-foreground p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-1">
              Spec Sheet
            </p>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground border-b-4 border-foreground pb-2 mb-4">
              Corporate Excuses
            </h2>
            <dl className="font-mono text-sm divide-y divide-foreground/20">
              {product.corporateExcuses.map((row) => (
                <div key={row.label} className="flex justify-between py-2 gap-4">
                  <dt className="text-foreground/60 uppercase text-xs tracking-wide">{row.label}</dt>
                  <dd className="text-foreground text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-foreground/40 mt-4 pt-3 border-t border-foreground/30">
              All specifications subject to revision in the next quarterly review.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground text-center mb-8">
              Also Disappointing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <ClientProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  price={p.priceLabel}
                  tagline={p.subtitle}
                  image={p.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 2: Wire the dynamic route into the barrel**

Modify `src/sites/unmotivators/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
import UnmotivatorsHome from "./pages/home"
import UnmotivatorsOffice, { metadata as officeMetadata } from "./pages/office"
import UnmotivatorsForHome, { metadata as forHomeMetadata } from "./pages/for-home"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": UnmotivatorsHome,
  "office": { component: UnmotivatorsOffice, metadata: officeMetadata },
  "home": { component: UnmotivatorsForHome, metadata: forHomeMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? {
            title: `${product.name} — Unmotivators Inc.`,
            description: product.subtitle,
            ogImage: product.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "unmotivators",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: Array.isArray(p.description) ? p.description.join(" ") : p.description,
          tagline: p.subtitle,
          image: p.image,
          price: p.price,
        },
        config.name,
      )
    },
  },
}
```

- [ ] **Step 3: Update the registry to include dynamicRoutes**

Modify `src/sites/registry.ts`:

Replace the line:
```typescript
import { config as unmotivatorsConfig, pages as unmotivatorsPages } from "./unmotivators"
```

With:
```typescript
import { config as unmotivatorsConfig, pages as unmotivatorsPages, dynamicRoutes as unmotivatorsDynamicRoutes } from "./unmotivators"
```

And replace the `unmotivators` registry entry:
```typescript
  unmotivators: { config: unmotivatorsConfig, pages: unmotivatorsPages },
```

With:
```typescript
  unmotivators: { config: unmotivatorsConfig, pages: unmotivatorsPages, dynamicRoutes: unmotivatorsDynamicRoutes },
```

- [ ] **Step 4: Verify**

Run:
```bash
npx tsc --noEmit
npm run lint
```

Start dev, visit `http://localhost:3000/products/mediocrity?site=unmotivators`. Confirm:
- Title, subtitle, price, add-to-cart button render
- Description paragraphs render
- Corporate Excuses block styled like a spec sheet
- "Also Disappointing" related products render

Then try a nonsense slug: `http://localhost:3000/products/doesnotexist?site=unmotivators` — should 404.

Stop dev.

- [ ] **Step 5: Commit**

```bash
git add src/sites/unmotivators/pages/product-detail.tsx src/sites/unmotivators/index.ts src/sites/registry.ts
git commit -m "feat(unmotivators): add product detail dynamic route"
```

---

## Task 8: About Page (Leadership + Our Values)

Renders the four execs with portraits, bios, quotes, and a "Our Values" section.

**Files:**
- Create: `src/sites/unmotivators/pages/about.tsx`
- Modify: `src/sites/unmotivators/index.ts`

- [ ] **Step 1: Create the about page**

Create `src/sites/unmotivators/pages/about.tsx`:

```typescript
import Image from "next/image"
import { leaders } from "@/sites/unmotivators/data/leadership"

export const metadata = {
  title: "About — Unmotivators Inc.",
  description: "The leadership team of Unmotivators Inc., and the values they have agreed to uphold.",
}

const values = [
  {
    title: "Honesty about how bad it is.",
    body: "We do not soften the picture. We do not suggest that next quarter will be different. The picture is the picture; the products reflect it.",
  },
  {
    title: "Sustainability (of our discontent).",
    body: "Burnout is a resource. Managed correctly, it can last an entire career. We have internal protocols to ensure no one runs out prematurely.",
  },
  {
    title: "Accountability (for your own choices).",
    body: "We are not accountable for your decision to read the poster. We are, however, accountable for printing it, and we stand by our work.",
  },
  {
    title: "Innovation in the field of resignation.",
    body: "Every quarter, we release new products that more accurately reflect the moment in which they are purchased. We consider this an ongoing research program.",
  },
]

export default function UnmotivatorsAbout() {
  return (
    <>
      {/* Intro */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-4">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-foreground mb-6">
            Unmotivators Inc.
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Unmotivators Inc. was founded in 2012 on a single, defensible premise: that the office, as an institution, deserves honest decor. Fourteen years later, that premise has held up.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            The company is headquartered in a low-rise office park you have driven past. The leadership team has been largely intact since 2015. We do not intend to grow. We intend to continue.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 px-4 bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground text-center mb-12">
            Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {leaders.map((leader) => (
              <article key={leader.slug} className="bg-background border border-foreground/20 p-6">
                <div className="relative aspect-[4/5] bg-secondary/40 border border-foreground/10 mb-5 grayscale">
                  <Image
                    src={leader.portraitImage}
                    alt={`Portrait of ${leader.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-2">
                  Serving since: {2026 - leader.yearsOfService}
                </p>
                <h3 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-1 leading-tight">
                  {leader.name}
                </h3>
                <p className="text-sm italic text-foreground/70 mb-4">{leader.title}</p>
                <p className="text-foreground/80 leading-relaxed mb-4">{leader.bio}</p>
                <blockquote className="border-l-2 border-accent pl-4 text-foreground/70 italic">
                  "{leader.quote}"
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="border-l-4 border-accent pl-5">
                <h3 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Wire the page into the barrel**

Modify `src/sites/unmotivators/index.ts` to add the import and page entry:

```typescript
import UnmotivatorsAbout, { metadata as aboutMetadata } from "./pages/about"
```

And to the `pages` map:

```typescript
  "about": { component: UnmotivatorsAbout, metadata: aboutMetadata },
```

- [ ] **Step 3: Verify**

Run `npx tsc --noEmit && npm run lint`. Start dev, visit `http://localhost:3000/about?site=unmotivators`. Confirm:
- Intro renders
- Four exec cards render (with placeholder images until Task 13)
- "Our Values" section renders with four values

- [ ] **Step 4: Commit**

```bash
git add src/sites/unmotivators/pages/about.tsx src/sites/unmotivators/index.ts
git commit -m "feat(unmotivators): add about page with leadership and values"
```

---

## Task 9: Manifesto Page

Long-form satirical essay laying out the company's worldview.

**Files:**
- Create: `src/sites/unmotivators/pages/manifesto.tsx`
- Modify: `src/sites/unmotivators/index.ts`

- [ ] **Step 1: Create the manifesto page**

Create `src/sites/unmotivators/pages/manifesto.tsx`:

```typescript
export const metadata = {
  title: "The Unmotivators Manifesto — Unmotivators Inc.",
  description: "The worldview of Unmotivators Inc., articulated in four sections, at length.",
}

export default function UnmotivatorsManifesto() {
  return (
    <article className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-4">
            A document, printed on heavy stock
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-foreground mb-3">
            The Unmotivators Manifesto
          </h1>
          <p className="text-foreground/60 italic">
            As ratified, most recently, at the annual values review.
          </p>
        </header>

        <div className="prose-manifesto space-y-12 text-lg leading-relaxed text-foreground/85">
          {/* Section 1 */}
          <section>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-6">
              I. Motivation is a product category.
            </h2>
            <p className="mb-4">
              Motivation was not discovered. It was invented, and then it was sold. The discovery, such as it is, was that people would pay for the feeling of being about to do something — pay for it in dollars, in attention, in time that could have been spent doing the thing itself.
            </p>
            <p className="mb-4">
              The first motivational posters appeared in the 1920s in industrial workplaces. They depicted determined faces, climbing figures, and landscapes that were meant to evoke a commitment to production. They were put up by the companies that employed the workers who were meant to be motivated by them. The workers, on the whole, did not notice.
            </p>
            <p>
              A century later, the category has grown. The posters are glossier. The copy is more specific. The feelings the industry sells are more targeted, more segmented, and more expensive. But the basic transaction is the same. A company pays to make you feel like you are about to do something. Then you continue to do what you were already doing.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-6">
              II. Disappointment is underserved.
            </h2>
            <p className="mb-4">
              Disappointment is a mature market. It is larger, in absolute terms, than the motivation industry, and it has no major brand. The incumbent players — gas station coolers, pharmacy greeting cards, the corner of the gift shop where the ironic mugs are — do not organize their work, do not invest in production values, and do not take their customers seriously.
            </p>
            <p>
              Unmotivators Inc. was founded to serve this market. We print on heavy stock. We frame in real wood. We price our work at a level that reflects what it took to make. We do not apologize for any of this. Our customers know what they are buying, and they know why.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-6">
              III. Honesty is an object.
            </h2>
            <p className="mb-4">
              An object on a wall is not an opinion. It is a statement made every day, by proximity, to anyone who passes it. When that statement is false — when the poster says ACHIEVE and the room in which it hangs contains no achievement, only a deadline and a person trying to meet it — the room becomes a lie.
            </p>
            <p className="mb-4">
              A true object is a corrective. A poster that says MEDIOCRITY, hung in a room in which mediocrity is the accurate word, makes the room coherent. It does not improve the situation. It clarifies it. A clarified situation is not, necessarily, a better situation. But it is one that can be looked at directly.
            </p>
            <p>
              We make objects that can be looked at directly.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-6">
              IV. What we do not offer.
            </h2>
            <p className="mb-4">
              We do not offer solutions. Our products will not improve your performance review. They will not help you close a deal, meet a quota, or get promoted. They will not prompt a difficult conversation. They will not save your relationship with your manager. They will not, alone, change anything at all.
            </p>
            <p className="mb-4">
              We do not offer irony. Irony is a posture; it requires a wink. Our posters do not wink. Our mugs do not wink. They say what they say, and then they are on your desk, and then they are still on your desk, and that is the arrangement.
            </p>
            <p>
              We do not offer a way out. The offices are what they are. The deadlines are what they are. What we offer is a small set of objects that will accompany you through them. That is the extent of the offer. It is not much, but we stand by it, and we will continue to.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-10 border-t border-foreground/20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/50">
            — The Management
          </p>
        </footer>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Wire the page into the barrel**

Modify `src/sites/unmotivators/index.ts` to add:

```typescript
import UnmotivatorsManifesto, { metadata as manifestoMetadata } from "./pages/manifesto"
```

And to the `pages` map:

```typescript
  "manifesto": { component: UnmotivatorsManifesto, metadata: manifestoMetadata },
```

- [ ] **Step 3: Verify**

Run `npx tsc --noEmit && npm run lint`. Start dev, visit `http://localhost:3000/manifesto?site=unmotivators`. Confirm all four sections render.

- [ ] **Step 4: Commit**

```bash
git add src/sites/unmotivators/pages/manifesto.tsx src/sites/unmotivators/index.ts
git commit -m "feat(unmotivators): add manifesto page"
```

---

## Task 10: Cart and Checkout Pages

Reuse the existing commerce components. Cart page mirrors pigmilk's structure; checkout page shows an inverted success-message card.

**Files:**
- Create: `src/sites/unmotivators/pages/cart.tsx`
- Create: `src/sites/unmotivators/pages/checkout.tsx`
- Modify: `src/sites/unmotivators/index.ts`

- [ ] **Step 1: Create the cart page**

Create `src/sites/unmotivators/pages/cart.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/unmotivators/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const RESTOCKING_FEE = 14.00
const REGRET_TAX_RATE = 0.094

export default function UnmotivatorsCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{
      slug: string
      quantity: number
      product: NonNullable<ReturnType<typeof getProductBySlug>>
    }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const regretTax = subtotal * REGRET_TAX_RATE
  const total = subtotal + RESTOCKING_FEE + regretTax

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
            Your Cart
          </p>
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-4">
            Nothing yet.
          </h1>
          <p className="text-foreground/70 mb-8">
            Per last email, your cart is empty. This is a statement of fact.
          </p>
          <Link
            href={siteHref("/office")}
            className="inline-block px-6 py-3 bg-accent text-[#F5F3EE] font-heading uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            Browse the Office
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Order Summary
        </p>
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-10">
          Your Cart
        </h1>

        <div className="divide-y divide-foreground/15 border-y border-foreground/15">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 bg-secondary/40 shrink-0 border border-foreground/10">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link
                  href={siteHref(`/products/${slug}`)}
                  className="font-heading uppercase tracking-tight text-foreground hover:underline"
                >
                  {product.name}
                </Link>
                <p className="text-foreground/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 border border-foreground/30 text-foreground/70 hover:border-foreground flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-8 text-center font-mono">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 border border-foreground/30 text-foreground/70 hover:border-foreground flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-28 text-right font-heading text-foreground">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-foreground/40 hover:text-foreground ml-2"
                aria-label="Remove"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6">
          <div className="max-w-xs ml-auto space-y-2 font-mono text-sm">
            <div className="flex justify-between text-foreground/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Restocking Fee</span>
              <span>${RESTOCKING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Regret Tax (9.4%)</span>
              <span>${regretTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-heading text-foreground border-t border-foreground/30 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-accent text-[#F5F3EE] font-heading uppercase tracking-wide hover:opacity-90 transition-opacity"
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

Create `src/sites/unmotivators/pages/checkout.tsx`:

```typescript
"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

export default function UnmotivatorsCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4">
      <div className="max-w-lg mx-auto bg-background border border-foreground p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Order Confirmation #UNM-{Math.floor(Math.random() * 900000) + 100000}
        </p>
        <h1 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground mb-6 leading-tight">
          Your order has been processed.
        </h1>
        <p className="text-foreground/80 leading-relaxed mb-4">
          An order confirmation was not sent, because we do not have your email address, because there is no form on this page. This is a design decision.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Fulfillment estimates vary. The posters will ship when the frames are available. The mugs will ship when the kiln has cooled. The awards will ship when we have finished engraving, which we may have already done, depending.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-8">
          Good luck.
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-8">
          — The Management
        </p>
        <Link
          href={siteHref("/office")}
          className="inline-block px-6 py-3 border border-foreground text-foreground font-heading uppercase tracking-wide hover:bg-foreground hover:text-[#F5F3EE] transition-colors"
        >
          Return to the Catalog
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Wire the pages into the barrel**

Modify `src/sites/unmotivators/index.ts` to add:

```typescript
import UnmotivatorsCart from "./pages/cart"
import UnmotivatorsCheckout from "./pages/checkout"
```

And to the `pages` map:

```typescript
  "cart": UnmotivatorsCart,
  "checkout": UnmotivatorsCheckout,
```

- [ ] **Step 4: Verify**

Run `npx tsc --noEmit && npm run lint`. Start dev:

1. Visit `http://localhost:3000/office?site=unmotivators`
2. Click "Add to Cart" on any product
3. Visit `http://localhost:3000/cart?site=unmotivators` — confirm the item is there, quantity controls work, subtotal updates
4. Click "Proceed to Checkout" — confirm confirmation page renders

Stop dev.

- [ ] **Step 5: Commit**

```bash
git add src/sites/unmotivators/pages/cart.tsx src/sites/unmotivators/pages/checkout.tsx src/sites/unmotivators/index.ts
git commit -m "feat(unmotivators): add cart and checkout pages"
```

---

## Task 11: Contact, Privacy, and Terms Pages

Required per site conventions. Written in the same register as the rest of the site.

**Files:**
- Create: `src/sites/unmotivators/pages/contact.tsx`
- Create: `src/sites/unmotivators/pages/privacy.tsx`
- Create: `src/sites/unmotivators/pages/terms.tsx`
- Modify: `src/sites/unmotivators/index.ts`

- [ ] **Step 1: Create the contact page**

Create `src/sites/unmotivators/pages/contact.tsx`:

```typescript
export const metadata = {
  title: "Contact — Unmotivators Inc.",
  description: "How to reach the management team at Unmotivators Inc.",
}

export default function UnmotivatorsContact() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Reaching Us
        </p>
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-8">
          Contact
        </h1>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Unmotivators Inc. prefers email. Phone calls are answered on Tuesdays between 10:00 and 11:00 local, if someone happens to be at the desk, which is not guaranteed.
        </p>

        <dl className="space-y-4 border-y border-foreground/15 py-6 font-mono text-sm">
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">General</dt>
            <dd className="text-foreground">hello@unmotivators.example</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">Fulfillment</dt>
            <dd className="text-foreground">orders@unmotivators.example</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">Wholesale</dt>
            <dd className="text-foreground">wholesale@unmotivators.example</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">Press</dt>
            <dd className="text-foreground">Declined, for now.</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">Mailing</dt>
            <dd className="text-foreground">
              Unmotivators Inc.
              <br />
              Suite 204
              <br />
              A low-rise office park
              <br />
              You have driven past it.
            </dd>
          </div>
        </dl>

        <p className="text-foreground/70 text-sm mt-8 leading-relaxed">
          Response times vary. We reply in the order received, between other obligations. Please do not follow up on the same day.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the privacy page**

Create `src/sites/unmotivators/pages/privacy.tsx`:

```typescript
export const metadata = {
  title: "Privacy Policy — Unmotivators Inc.",
  description: "How Unmotivators Inc. handles the information you do not especially wish to share.",
}

export default function UnmotivatorsPrivacy() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Document
        </p>
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              1. What we collect.
            </h2>
            <p>
              We collect only the information required to process an order: a name, a shipping address, a payment token from our processor, and the email address you use to ask where your poster is. We do not enrich any of this data. We do not sell it. We do not correlate it with your other shopping habits, which, like ours, are probably a little worse than we would prefer to admit.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              2. Cookies.
            </h2>
            <p>
              This site uses a single cookie to keep your cart between visits. There is no advertising network here. There is no tracking pixel. If you clear the cookie, your cart will empty, and that is, in its own way, a lesson.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              3. Emails.
            </h2>
            <p>
              We do not operate a newsletter. There is a subscribe field in the footer. It does not do anything. We have been meaning to remove it.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              4. Requests.
            </h2>
            <p>
              You may request a copy of your data, or request its deletion. We will comply within thirty days. Where the law gives you additional rights, we will honor them. Where it does not, we will still honor them, because the alternative is the alternative.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              5. Contact for privacy matters.
            </h2>
            <p>
              Write to privacy@unmotivators.example. A human will respond, eventually.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create the terms page**

Create `src/sites/unmotivators/pages/terms.tsx`:

```typescript
export const metadata = {
  title: "Terms of Service — Unmotivators Inc.",
  description: "The terms under which you transact with Unmotivators Inc.",
}

export default function UnmotivatorsTerms() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Document
        </p>
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-10">
          Terms of Service
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              1. The agreement.
            </h2>
            <p>
              By placing an order with Unmotivators Inc., you agree to pay the price listed, at the time listed, in the currency listed. We agree to print, frame, pack, and ship the item, eventually. Both sides of this agreement are expected to act in good faith. Both sides, generally, do.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              2. Returns.
            </h2>
            <p>
              Returns are accepted within thirty days. The item must be unused, or at least not visibly used, and must not have been hung long enough for the wall behind it to have faded unevenly. Original packaging is appreciated but not required. Restocking fees apply.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              3. Shipping.
            </h2>
            <p>
              We ship via whichever carrier makes the quarter's economics work. Transit times are estimates. We are not responsible for delays caused by weather, holidays, warehouse disagreements, or the driver deciding to take the other route today.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              4. Warranty.
            </h2>
            <p>
              Posters are warranted against manufacturer defects for one year. Frames are warranted against joint failure for two. Mugs are warranted until they are dropped. Awards are not warranted, because their value does not depend on their condition.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              5. Governing law.
            </h2>
            <p>
              These terms are governed by the laws of the state in which Unmotivators Inc. is registered, which is a state you can guess. Disputes are resolved, if possible, in writing. In-person mediation is available, but rare, and will not be fun for either of us.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Wire all three pages into the barrel**

Modify `src/sites/unmotivators/index.ts` to add imports:

```typescript
import UnmotivatorsContact, { metadata as contactMetadata } from "./pages/contact"
import UnmotivatorsPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import UnmotivatorsTerms, { metadata as termsMetadata } from "./pages/terms"
```

And to the `pages` map:

```typescript
  "contact": { component: UnmotivatorsContact, metadata: contactMetadata },
  "privacy": { component: UnmotivatorsPrivacy, metadata: privacyMetadata },
  "terms": { component: UnmotivatorsTerms, metadata: termsMetadata },
```

- [ ] **Step 5: Verify**

Run `npx tsc --noEmit && npm run lint`. Start dev, visit each:
- `http://localhost:3000/contact?site=unmotivators`
- `http://localhost:3000/privacy?site=unmotivators`
- `http://localhost:3000/terms?site=unmotivators`

All three should render.

- [ ] **Step 6: Commit**

```bash
git add src/sites/unmotivators/pages/contact.tsx src/sites/unmotivators/pages/privacy.tsx src/sites/unmotivators/pages/terms.tsx src/sites/unmotivators/index.ts
git commit -m "feat(unmotivators): add contact, privacy, and terms pages"
```

---

## Task 12: Sitemap Update

Add unmotivators product pages to the sitemap so they're indexed alongside other sites' products.

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add the import**

Modify `src/app/sitemap.ts`. Add to the existing imports block (place near the other product-data imports):

```typescript
import { products as unmotivatorsProducts } from "@/sites/unmotivators/data/products"
```

- [ ] **Step 2: Add to the productSites map**

In the `productSites` object, add:

```typescript
    unmotivators: unmotivatorsProducts,
```

- [ ] **Step 3: Verify**

Run:
```bash
npx tsc --noEmit
npm run build
```

Expected: the build completes; the sitemap.xml is generated.

Spot-check that unmotivators URLs appear in the sitemap by starting the dev server and visiting `http://localhost:3000/sitemap.xml` — you should see entries like `https://unmotivators.specificindustries.com/products/mediocrity`.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(sitemap): include unmotivators product pages"
```

---

## Task 13: Image Generation Script

Generate all 64 product images + 4 exec portraits + 1 hero image via OpenAI's `gpt-image-1`. Follow the pattern of `scripts/generate-carbonneutraloutrage-images.ts`.

**Files:**
- Create: `scripts/generate-unmotivators-images.ts`

- [ ] **Step 1: Create the image generation script scaffold**

Create `scripts/generate-unmotivators-images.ts`:

```typescript
/**
 * Generate all Unmotivators Inc. images.
 *
 * Usage:  npx tsx scripts/generate-unmotivators-images.ts
 *
 * Reads OPENAI_API_KEY from .env. Outputs to public/sites/unmotivators/.
 * Skips images that already exist (delete a file to regenerate it).
 */

import OpenAI, { toFile } from "openai"
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { products } from "../src/sites/unmotivators/data/products"
import { leaders } from "../src/sites/unmotivators/data/leadership"

const envPath = path.resolve(__dirname, "../.env")
const envContents = readFileSync(envPath, "utf-8")
for (const line of envContents.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/)
  if (match) process.env[match[1]] = match[2]
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUT_DIR = path.resolve(__dirname, "../public/sites/unmotivators")
const PRODUCTS_DIR = path.join(OUT_DIR, "products")
const LEADERS_DIR = path.join(OUT_DIR, "leaders")
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images")

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(PRODUCTS_DIR, { recursive: true })
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
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  }
  const files = await Promise.all(
    photos.map(async (p) => {
      const ext = path.extname(p).toLowerCase()
      return toFile(readFileSync(p), path.basename(p), { type: mimeTypes[ext] ?? "image/jpeg" })
    }),
  )
  const response = await (openai.images as any).edit({
    model: "gpt-image-1",
    image: files,
    prompt,
    size,
    quality: "high",
  })
  const b64 = response.data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}
```

- [ ] **Step 2: Add prompt builders**

Append to `scripts/generate-unmotivators-images.ts`:

```typescript
const STYLE_BASE =
  "Overall aesthetic: fluorescent office gray, dingy beige-gray walls, muted palette, shallow depth of field, photographed under cool fluorescent lighting. Neutral, somber, corporate-documentary style. No people unless specified. No bright colors except muted brick red accents. No text overlays unless the product itself contains text."

function promptForProduct(p: (typeof products)[number]): string {
  switch (p.productType) {
    case "poster":
      return `${STYLE_BASE} A framed demotivational poster photographed on a neutral beige-gray office wall. The poster has a thin black frame and a wide off-white matte. The image inside the matte is a single understated photograph (e.g., a lone empty chair, a dying plant, a cold cup of coffee, an unoccupied cubicle, a fluorescent light fixture). At the bottom of the matte, one bold word in uppercase condensed sans-serif reads "${p.name}". Below that, in smaller italic serif, reads "${p.subtitle}". The image should look like a real photograph of a hanging poster, not a graphic design export.`
    case "mug":
      return `${STYLE_BASE} Product photography of a single ceramic coffee mug sitting on a beige office desk. The mug is white or neutral gray, 14oz, with a simple minimalist design element referencing "${p.name}". Shot slightly above eye level. A blurred keyboard and stack of papers are visible in the background.`
    case "plaque":
      return `${STYLE_BASE} Product photography of a single rectangular engraved wooden plaque, approximately 8 by 3 inches, on a walnut base with a brass engraving plate. The plate is engraved with the text "${p.name}". The plaque sits on a beige office desk corner. Neutral, somber lighting.`
    case "paper":
      return `${STYLE_BASE} Flat-lay product photography of a stationery item referencing "${p.name}". The item is photographed from directly above on a beige office desk surface, with a single ballpoint pen and a faint coffee ring visible at the edge of the frame. Muted, documentary style.`
    case "award":
      return `${STYLE_BASE} Product photography of a trophy or award referencing "${p.name}". The award sits on a beige office desk, photographed slightly above eye level. The award has a gold-plated or crystal finish. Muted lighting, shallow depth of field.`
    case "desktoy":
      return `${STYLE_BASE} Product photography of a small desk toy or stress item referencing "${p.name}". The item sits slightly askew on the corner of a beige office desk. A blurred mouse and keyboard are visible in the background.`
    case "supply":
      return `${STYLE_BASE} Product photography of an office supply item referencing "${p.name}". The item is photographed on a beige office desk. Muted palette, documentary style.`
    case "homedecor":
      return `${STYLE_BASE.replace("fluorescent office gray", "beige home interior")} Product photography of a home-decor item referencing "${p.name}" in the style of farmhouse or rustic decor. The item is photographed in a neutral beige living room or kitchen setting, with muted lighting. The color palette is continuous with the office aesthetic but softer.`
  }
}

function promptForLeader(leader: (typeof leaders)[number]): string {
  return `Black-and-white corporate headshot photograph of a middle-aged man. Washed-out lighting, thousand-yard stare, slightly tired expression. Cheap gray office backdrop or wall behind him. He wears a plain solid-color polo or button-down. Shoulders up, straight-on composition. Documentary style, not glamorous, not flattering. Slight vignetting. No props. No caption.`
}

const HERO_PROMPT = `${STYLE_BASE} An empty gray fabric-walled office cubicle photographed from behind an unoccupied ergonomic office chair. Fluorescent overhead lighting, drop-ceiling tiles, a beige desk with a dim monitor. A single unframed demotivational poster leans diagonally against the cubicle partition. The scene is quiet, dim, slightly depressing. Wide-angle composition, 4:3 aspect ratio.`
```

- [ ] **Step 3: Add the main runner**

Append to `scripts/generate-unmotivators-images.ts`:

```typescript
async function main() {
  console.log("Generating Unmotivators Inc. imagery...\n")

  // Hero
  console.log("Hero:")
  await generateImage("hero.png", HERO_PROMPT, "1536x1024")

  // Leaders
  console.log("\nLeadership portraits:")
  for (const leader of leaders) {
    await generateImageWithPerson(
      `${leader.slug}.png`,
      promptForLeader(leader),
      leader.person,
      "1024x1024",
      LEADERS_DIR,
    )
  }

  // Products
  console.log("\nProducts:")
  for (const product of products) {
    await generateImage(
      `${product.slug}.png`,
      promptForProduct(product),
      "1024x1024",
      PRODUCTS_DIR,
    )
  }

  console.log("\nDone.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 4: Verify the script type-checks**

Run:
```bash
npx tsc --noEmit --project tsconfig.json scripts/generate-unmotivators-images.ts
```

(If the project doesn't compile scripts as part of `--noEmit`, also run a plain check: `npx tsx --help` to confirm tsx is available.)

Do NOT run the script yet — the user will run it at a time of their choosing, since it costs real API spend.

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-unmotivators-images.ts
git commit -m "feat(unmotivators): add image generation script"
```

---

## Task 14: Favicon Registration

Add `unmotivators` to the favicon resize script's site list so a 64×64 favicon is generated once an icon asset is in place.

**Files:**
- Modify: `scripts/resize-favicons.mjs`

- [ ] **Step 1: Add unmotivators to the site list**

Modify `scripts/resize-favicons.mjs`. Locate the `sites` array (around line 8) and append `"unmotivators"`:

```javascript
const sites = ["apex", "pigmilk", "dehydratedwater", "inflatableanchors", "strategicvoid", "stratify", "truegrit", "onlyfans", "onlypans", "bonelesswater", "pettential", "carterandfils", "meh", "sovereignwellness", "privatrix", "prechewed", "superengineered", "seeltite", "chunkymilk", "whiskerworks", "thetheoryisreal", "terrorclown", "carbonneutraloutrage", "unmotivators"]
```

(The script loops over the list and generates favicons for each. Source icons are expected at `public/sites/<site>/icon-source.png` and get resized into `favicon-16.png`, `favicon-32.png`, `favicon-64.png`. The user will supply the source icon separately via the image generation script's hero or a dedicated icon prompt if desired.)

- [ ] **Step 2: Verify**

Run:
```bash
node scripts/resize-favicons.mjs 2>&1 | tail -20
```

Expected: the script runs and silently skips unmotivators because no source icon exists yet. No crash.

- [ ] **Step 3: Commit**

```bash
git add scripts/resize-favicons.mjs
git commit -m "feat(unmotivators): register in favicon resize script"
```

---

## Task 15: Full-Site Smoke Test

Final verification pass. Start the dev server, walk every page, confirm no runtime errors, and check TypeScript/lint are clean end-to-end.

**Files:**
- None (verification only)

- [ ] **Step 1: Clean type check and lint**

Run:
```bash
npx tsc --noEmit
npm run lint
```

Expected: both pass with zero errors.

- [ ] **Step 2: Production build**

Run:
```bash
npm run build
```

Expected: build succeeds. Confirm that `.next/` artifacts include references to `unmotivators` (e.g., in the server bundle) and that the sitemap includes `unmotivators` product URLs.

- [ ] **Step 3: Dev server smoke walk**

Start the dev server:
```bash
npm run dev
```

In a browser, walk each URL and confirm it renders without runtime errors (check the browser console and the terminal):

1. `http://localhost:3000/?site=unmotivators` (home)
2. `http://localhost:3000/office?site=unmotivators` (office catalog)
3. Click each filter chip on the office page — confirm the grid updates
4. `http://localhost:3000/home?site=unmotivators` (for-home)
5. `http://localhost:3000/products/mediocrity?site=unmotivators` (poster detail)
6. `http://localhost:3000/products/exist-endure-expire-wall-art?site=unmotivators` (home detail)
7. `http://localhost:3000/products/does-not-exist?site=unmotivators` — expect 404
8. `http://localhost:3000/manifesto?site=unmotivators`
9. `http://localhost:3000/about?site=unmotivators` — confirm four exec cards
10. `http://localhost:3000/contact?site=unmotivators`
11. `http://localhost:3000/privacy?site=unmotivators`
12. `http://localhost:3000/terms?site=unmotivators`
13. Add three items to cart from the office page, visit `http://localhost:3000/cart?site=unmotivators` — confirm items appear, quantity controls work, totals recalculate
14. Click "Proceed to Checkout" — confirm checkout confirmation renders

Stop the dev server.

- [ ] **Step 4: Contrast sanity check**

Using browser dev tools on any page, inspect these text elements and confirm contrast against their computed backgrounds:
- Body paragraph text on `#E5E3DE` background (should be `#1A1A18`, ~14:1 ratio)
- Muted text (e.g., image captions, product subtitles) on `#E5E3DE` (should be `#4D4B46`, ~7.5:1 ratio)
- Accent button label on `#7A2E2E` background (should be `#F5F3EE`, ~5.5:1 ratio)

If any of these fall below 4.5:1 (AA for normal text), note the specific selector and stop; we'll address in a follow-up before merge. Otherwise continue.

- [ ] **Step 5: Commit (if any last-mile fixes were needed) and finish**

If everything is clean, there's nothing new to commit for this task. If you made any small fixes during the smoke walk, commit them:

```bash
git add -A
git commit -m "chore(unmotivators): smoke-test fixes"
```

---

## Self-Review

**1. Spec coverage:**
- [x] Subdomain `unmotivators` + brand: Task 1
- [x] Weary-Gen-X-sigh voice mix: preamble + product descriptions
- [x] Site structure (home/office/home/manifesto/about/cart/checkout/contact/privacy/terms + dynamic products): Tasks 4–11
- [x] Theme & contrast-verified palette: Task 1
- [x] Oswald/Source Serif 4/JetBrains Mono fonts: Task 1
- [x] Product data model with `category`, `productType`, `price`, `listPrice`, `sku`, `corporateExcuses`: Task 2
- [x] 52 office products (18 posters + 8 mugs + 6 plaques + 6 paper + 5 awards + 5 desktoys + 4 supplies): Task 2 Steps 2–8
- [x] 12 home products including "EXIST. ENDURE. EXPIRE." flagship: Task 2 Step 9
- [x] Commerce (CartProvider, AddToCartButton, Toast, inverted checkout success): Task 10
- [x] 4 execs using bill/brandon/jim/sean base images with randomized first+last names: Task 3
- [x] Exec bios in weary third-person: Task 3
- [x] "Our Values" section: Task 8
- [x] Manifesto page (4 sections): Task 9
- [x] Contact/privacy/terms pages: Task 11
- [x] Sitemap registration: Task 12
- [x] Image generation script (products + execs + hero): Task 13
- [x] Favicon registration: Task 14
- [x] Subdomain allowlist: Task 1 Step 6 (per `feedback_new_site_subdomain_allowlist.md`)
- [x] No yellow/gold on light backgrounds: accent is muted brick red `#7A2E2E`

**2. Placeholder scan:** no "TBD", no "TODO", no "handle edge cases", no "similar to Task N" code references.

**3. Type consistency:** `Product`, `ProductCategory`, `ProductType`, `Leader`, helper names (`getProductBySlug`, `getProductsByCategory`, `getProductsByType`, `getFeaturedProducts`, `getRelatedProducts`, `getLeaderBySlug`) all used consistently across tasks.

**4. Ambiguity:** one pattern in Task 2 delegates writing 3-paragraph descriptions to the implementer following strict voice rules and structural guidance. This is the intended mode of operation — the implementer is not choosing structure, only writing text that fits specified constraints. All other content is rendered in full code.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-24-unmotivators.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
