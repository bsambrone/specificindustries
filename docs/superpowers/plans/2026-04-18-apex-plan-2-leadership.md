# Apex Redesign — Plan 2: Leadership System

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Normalize leader data across all subsites, backfill the 10 sites missing leader data, rebuild apex About, and ship `/leadership/[slug]` detail pages with cross-subsidiary Board Positions.

**Architecture:** All subsite leader entries use a single canonical field name `person: "bill" | "brandon" | "jim" | "sean"`. Apex has its own stable 4-leader roster whose slugs are derived from apex names. A `collectLeaderHistory(personKey)` helper pre-imports every subsite's leader export at module-load time and builds a per-person list of Board Positions. Rendering uses new shared components (`MetricStrip`, `LeaderCard`, `SubsidiaryBoardCard`).

**Spec reference:** `docs/superpowers/specs/2026-04-18-apex-portfolio-pe-satire-design.md` (Section 5, 12, 13)

---

## File Structure

**Modified:**
- 13 subsite leader data files — `referencePerson` → `person` rename + type narrowing to literal union
- `src/sites/meh/pages/about.tsx` — consume leadership from data file
- `src/sites/apex/pages/about.tsx` — rebuild (no randomization, 4 stable leaders, MetricStrip)
- `src/sites/apex/config.ts` — (unchanged in Plan 2)
- `src/sites/apex/index.ts` — register leadership dynamic route

**Created:**
- `src/sites/meh/data/leadership.ts` — extracted from about.tsx
- 9 new leader files — dehydratedwater, grassfedwifi, inflatableanchors, mostlysterile, pigmilk, rocks, squaredaway, superengineered, truegrit
- `src/sites/apex/data/leadership.ts` — 4 apex leaders
- `src/sites/apex/data/leader-history.ts` — collector across all subsites
- `src/sites/apex/pages/leader-detail.tsx` — dynamic route component
- `src/components/ui/metric-strip.tsx`
- `src/components/ui/leader-card.tsx`
- `src/components/ui/subsidiary-board-card.tsx`

---

## Apex Leader Roster (stable from this plan forward)

| Position | person | Apex name | Slug | Title |
|---|---|---|---|---|
| 1 | bill | Bill Sambrone | bill-sambrone | Founder & Chief Executive Officer |
| 2 | brandon | Cornelius Whitfield | cornelius-whitfield | President & Chief Operating Officer |
| 3 | jim | Russell Marsh | russell-marsh | Chief Portfolio Officer |
| 4 | sean | Vincent Coleman | vincent-coleman | Chief Strategy Officer |

---

## Task 1: Rename referencePerson → person across all data files

- [ ] **Step 1: Global sed replacement**

Run:
```bash
grep -rl "referencePerson" src/ | xargs sed -i 's/referencePerson/person/g'
```

- [ ] **Step 2: Verify nothing missed**

```bash
grep -rn "referencePerson" src/ docs/ | grep -v ".md"
```
Expected: no output.

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```
Expected: PASS (may surface type errors; fix them in Task 2).

- [ ] **Step 4: Commit**

```bash
git add src/
git commit -m "refactor: rename referencePerson to person across leader data"
```

---

## Task 2: Narrow `person` type to literal union on all leader data files

Some data files have `person: string`. Narrow to `person: "bill" | "brandon" | "jim" | "sean"` for type safety. Files to update if using string type: stratify, snortables, cleansheet, mousetrapjenga, elderparty, strategicvoid (types.ts).

- [ ] **Step 1: Edit each data file's Leader/Executive interface**

In each file, replace:
```typescript
  person: string
```
with:
```typescript
  person: "bill" | "brandon" | "jim" | "sean"
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor: narrow leader person field to literal union type"
```

---

## Task 3: Extract meh's inline leadership data to data/leadership.ts

- [ ] **Step 1: Create `src/sites/meh/data/leadership.ts`**

Move the 4-item `leadership` array from `src/sites/meh/pages/about.tsx` into a new data file, adding a `slug` field and conforming to the standard Leader shape:

```typescript
export interface Leader {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
}

export const leaders: Leader[] = [
  { slug: "ashcroft", person: "bill", name: "Desmond Ashcroft", title: "Founder & Chief Disappointment Officer", bio: "Founded Meh. in 2019...", portraitImage: "/sites/meh/team-founder.png" },
  { slug: "peveril", person: "brandon", name: "Roland Peveril", title: "President of Lowered Expectations", bio: "Joined in 2020...", portraitImage: "/sites/meh/team-president.png" },
  { slug: "ellsworth", person: "jim", name: "Warren Ellsworth", title: "VP of Affective Underdelivery", bio: "Leads the engineering team...", portraitImage: "/sites/meh/team-vp.png" },
  { slug: "marlowe", person: "sean", name: "Julian Marlowe", title: "Head of Ambient Sighs", bio: "Oversees the sound design...", portraitImage: "/sites/meh/team-ambient.png" },
]
```

Preserve the existing bio text verbatim.

- [ ] **Step 2: Update `src/sites/meh/pages/about.tsx`** to import `leaders` from `../data/leadership` and remove the inline array.

- [ ] **Step 3: Type check + commit**

```bash
npx tsc --noEmit
git add src/sites/meh/
git commit -m "refactor(meh): extract leadership data to data/leadership.ts"
```

---

## Task 4: Create leadership data files for 9 missing subsites

Create `src/sites/<subdomain>/data/leadership.ts` for each. Each file exports `leaders` array with 4 entries, one per canonical person. Use stable, thematically-appropriate names. All bios 2-3 sentences, deadpan satirical in the site's voice.

**Portrait strategy:** Each entry's `portraitImage` points to a valid path. For superengineered, use existing `/sites/superengineered/team/<name>.png`. For others without per-site portraits yet, fall back to the apex portraits:

```typescript
portraitImage: "/sites/apex/team/bill-sambrone.png"  // bill
portraitImage: "/sites/apex/team/member-1.png"       // brandon
portraitImage: "/sites/apex/team/member-2.png"       // jim
portraitImage: "/sites/apex/team/member-3.png"       // sean
```

This is the "path C" portrait fallback from the spec.

Common interface for these files:

```typescript
export interface Leader {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
}
export const leaders: Leader[] = [/* 4 entries */]
```

**Sites and name suggestions:**

- **dehydratedwater** — heritage/scientific voice: Ambrose Thistlewood (bill, Founder & Chief Hydration Scientist), Percival Blackwood (brandon, Director of Powder Engineering), Roger Dunhaven (jim, VP of Dehydration Research), Wilbur Ashcroft (sean, Head of Just-Add-Water Integration)

- **grassfedwifi** — farm/homestead voice: Jebediah Coopersmith (bill, Founder & Head Spectrum Farmer), Obadiah Lark (brandon, Director of Pasture Operations), Cyrus Whitlaw (jim, Bandwidth Shepherd), Hollis Nettleton (sean, VP of Heritage Frequencies)

- **inflatableanchors** — marine/boater voice: Captain Edmund Hawkwind (bill, Founder & Chief Buoyancy Officer), Nathaniel Copper (brandon, VP of Retrieval Engineering), Winston Ballast (jim, Director of Inflation Standards), Oscar Driftwood (sean, Head of Customer Harbor Relations)

- **mostlysterile** — medical/pragmatic voice: Dr. Theodore Halvorsen (bill, Founder & Chief Medical Officer), Mitchell Braddock (brandon, VP of Approximately Sterile Operations), Harold Finch (jim, Director of Surgical Surplus), Quentin Prescott (sean, Head of Hospital Relations)

- **pigmilk** — artisan/farm voice: Eustace Hoggett (bill, Founder & Master Pig-Dairyman), Oliver Troughton (brandon, VP of Swine Milk Yield), Albert Snoot (jim, Director of Dairy Porcine Operations), Cedric Wallow (sean, Head of Creamery Standards)

- **rocks** — finance/terminal voice: Vaughn Strickland (bill, Founder & Chief Geological Strategist), Lincoln Granite (brandon, Head of Bedrock Desk), Grant Shale (jim, Director of Hard-Asset Origination), Miles Quartz (sean, VP of Vault Operations)

- **squaredaway** — military/supply voice: Master Sergeant Frank Murchison (bill, Founder & Chief Provisioner), Colonel Dale Hargreaves (brandon, VP of Branch Operations), Lieutenant Gus Sparrow (jim, Director of Morale Logistics), Sergeant Major Oren Blackwell (sean, Head of Exchange Relations)

- **superengineered** — apple-minimal voice: Theodore Voss (bill, Founder & Chief Principal Engineer), Magnus Holloway (brandon, VP of Datacenter-Grade Product), Curtis Arrowood (jim, Director of Cloud+ Platform), Laurence Redhorn (sean, Head of Essential Object Strategy). **Use existing portraits** `/sites/superengineered/team/bill-ankeney.png` (bill), `/sites/superengineered/team/brandon-yothers.png` (brandon), `/sites/superengineered/team/jim-redenbaugh.png` (jim), `/sites/superengineered/team/sean-lightcap.png` (sean).

- **truegrit** — industrial voice: Silas Hackett (bill, Founder & Chief Abrasive Officer), Bruno Stonewall (brandon, VP of Grit Engineering), Otis Brimstone (jim, Director of Applications), Dwight Grindle (sean, Head of Cleansing Products)

- [ ] **Step 1: Create all 9 files** (follow the shape above; write each file's 4 entries with 2-3 sentence deadpan bios thematically matched to the site).

- [ ] **Step 2: Type check + commit**

```bash
npx tsc --noEmit
git add src/sites/
git commit -m "feat: backfill leadership data on 9 subsites missing data files"
```

---

## Task 5: Normalize strategicvoid's Executive type to include person field

The strategicvoid types.ts has the rename handled by Task 1. Verify the type is `"bill" | "brandon" | "jim" | "sean"` literal union (handled by Task 2). No additional work unless type errors surface.

- [ ] **Step 1: Verify with type check**

```bash
npx tsc --noEmit
```

---

## Task 6: Create apex leadership data file

**File:** `src/sites/apex/data/leadership.ts`

- [ ] **Step 1: Create the file**

```typescript
export interface ApexLeader {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
  careerHighlights: string[]
  credentials: string[]
}

export const apexLeaders: ApexLeader[] = [
  {
    slug: "bill-sambrone",
    person: "bill",
    name: "Bill Sambrone",
    title: "Founder & Chief Executive Officer",
    bio: "Founded Specific Industries after identifying a pattern of underserved markets that no one else was willing to take seriously. Oversees capital allocation across the 28-brand portfolio and personally signs every acquisition term sheet.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
    careerHighlights: [
      "Founded Specific Industries in 2019 with one brand; grew to 28 active holdings",
      "Board meetings attended: 1 of 4 scheduled (annualized)",
      "LinkedIn connections: approximately 47",
      "Public speaking engagements: 0 (declined)",
    ],
    credentials: [
      "MBA-equivalent experience, unaccredited",
      "Certified in Strategic Ambiguity (self-certified, 2020)",
    ],
  },
  {
    slug: "cornelius-whitfield",
    person: "brandon",
    name: "Cornelius Whitfield",
    title: "President & Chief Operating Officer",
    bio: "Joined Specific Industries in 2021 from a senior operating role at a firm he characterizes as 'a similar platform, ultimately over-invested in outcomes.' Responsible for the day-to-day oversight of the portfolio's operational surface area.",
    portraitImage: "/sites/apex/team/member-1.png",
    careerHighlights: [
      "Portfolio operations uptime: within expected range",
      "Direct reports: 14 (as designed)",
      "Strategic memos authored: 217 (47 circulated)",
      "Fiscal-year planning cycles completed: 3 of 4",
    ],
    credentials: [
      "MBA, Wharton (class year not displayed)",
      "Six Sigma Black Belt (Gold Tier, Specific Industries internal certification)",
    ],
  },
  {
    slug: "russell-marsh",
    person: "jim",
    name: "Russell Marsh",
    title: "Chief Portfolio Officer",
    bio: "Leads portfolio strategy, acquisition evaluation, and post-acquisition integration. Has personally interviewed the founder of every current portfolio brand, on average twice.",
    portraitImage: "/sites/apex/team/member-2.png",
    careerHighlights: [
      "Industries evaluated: 1,400+",
      "Industries acquired: 28",
      "Industries declined: undisclosed (extensive)",
      "Quarterly reviews led: every quarter since 2021",
    ],
    credentials: [
      "MBA, University of Chicago Booth School of Business",
      "Certified Private Equity Analyst (lapsed, under review)",
    ],
  },
  {
    slug: "vincent-coleman",
    person: "sean",
    name: "Vincent Coleman",
    title: "Chief Strategy Officer",
    bio: "Authors the firm's investment thesis materials and maintains the firm's proprietary classification framework for underserved markets. Does not attend meetings before 10 AM.",
    portraitImage: "/sites/apex/team/member-3.png",
    careerHighlights: [
      "Frameworks authored: 4 (SPECIFIC Evaluation Framework™ is principal)",
      "Thesis revisions since 2019: 11",
      "Whitepapers drafted: 3 (unpublished)",
      "Conference invitations: 2 (declined)",
    ],
    credentials: [
      "PhD in Applied Market Philosophy (independent study)",
      "Fellow, Institute for Strategic Evaluation (self-appointed, 2022)",
    ],
  },
]

export function getApexLeaderBySlug(slug: string): ApexLeader | undefined {
  return apexLeaders.find((l) => l.slug === slug)
}

export function getApexLeaderByPerson(
  person: "bill" | "brandon" | "jim" | "sean"
): ApexLeader | undefined {
  return apexLeaders.find((l) => l.person === person)
}
```

- [ ] **Step 2: Type check + commit**

```bash
npx tsc --noEmit
git add src/sites/apex/data/leadership.ts
git commit -m "feat(apex): add apex leadership data with 4 stable leaders"
```

---

## Task 7: Create leader-history collector

**File:** `src/sites/apex/data/leader-history.ts`

- [ ] **Step 1: Create the file**

```typescript
import type { SiteConfig, VerticalKey } from "@/themes"
import { siteRegistry } from "@/sites/registry"

type PersonKey = "bill" | "brandon" | "jim" | "sean"

export interface SubsidiaryBoardPosition {
  subdomain: string
  subsiteName: string
  subsiteFavicon: string
  verticalKey: VerticalKey | null
  nameThere: string
  titleThere: string
  blurb: string
}

interface UnknownLeaderShape {
  person?: string
  name?: string
  title?: string
  bio?: string
}

function firstSentence(text: string, max = 140): string {
  const period = text.indexOf(". ")
  const core = period > 0 ? text.slice(0, period + 1) : text
  if (core.length <= max) return core
  return core.slice(0, max - 1).trimEnd() + "…"
}

async function loadLeadersFor(subdomain: string): Promise<UnknownLeaderShape[]> {
  try {
    const mod = await import(`@/sites/${subdomain}/data/leadership`)
    const arr = (mod as { leaders?: UnknownLeaderShape[]; executives?: UnknownLeaderShape[] })
    return arr.leaders ?? arr.executives ?? []
  } catch {
    return []
  }
}

const ASYNC_CACHE = new Map<string, SubsidiaryBoardPosition[]>()

export async function collectLeaderHistory(person: PersonKey): Promise<SubsidiaryBoardPosition[]> {
  const cached = ASYNC_CACHE.get(person)
  if (cached) return cached

  const results: SubsidiaryBoardPosition[] = []
  for (const [subdomain, site] of Object.entries(siteRegistry)) {
    if (subdomain === "apex") continue
    const leaders = await loadLeadersFor(subdomain)
    const match = leaders.find((l) => l.person === person)
    if (!match) continue
    const config: SiteConfig = site.config
    results.push({
      subdomain,
      subsiteName: config.name,
      subsiteFavicon: `/sites/${subdomain}/favicon.png`,
      verticalKey: config.verticalKey ?? null,
      nameThere: match.name ?? "Unknown",
      titleThere: match.title ?? "Role Unspecified",
      blurb: match.bio ? firstSentence(match.bio) : "",
    })
  }

  ASYNC_CACHE.set(person, results)
  return results
}
```

- [ ] **Step 2: Type check + commit**

```bash
npx tsc --noEmit
git add src/sites/apex/data/leader-history.ts
git commit -m "feat(apex): add collectLeaderHistory helper for Board Positions"
```

---

## Task 8: Create MetricStrip component

**File:** `src/components/ui/metric-strip.tsx`

- [ ] **Step 1: Create the component**

```typescript
export interface Metric {
  value: string
  label: string
}

export interface MetricStripProps {
  metrics: Metric[]
  variant?: "default" | "inverse"
}

export function MetricStrip({ metrics, variant = "default" }: MetricStripProps) {
  const bg = variant === "inverse" ? "bg-primary text-background" : "bg-secondary/10 text-primary"
  return (
    <section className={`${bg} py-8 border-y border-primary/10`}>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="text-center">
            <div className="text-2xl md:text-3xl font-heading font-bold">{m.value}</div>
            <div className="text-xs uppercase tracking-[0.15em] opacity-70 mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type check + commit**

```bash
npx tsc --noEmit
git add src/components/ui/metric-strip.tsx
git commit -m "feat(ui): add MetricStrip component"
```

---

## Task 9: Create LeaderCard + SubsidiaryBoardCard

- [ ] **Step 1: LeaderCard**

**File:** `src/components/ui/leader-card.tsx`

```tsx
import Image from "next/image"
import Link from "next/link"

export interface LeaderCardProps {
  portraitImage: string
  name: string
  title: string
  bio?: string
  detailHref?: string
}

export function LeaderCard({ portraitImage, name, title, bio, detailHref }: LeaderCardProps) {
  const content = (
    <article className="flex flex-col gap-3 text-center">
      <div className="relative w-full aspect-square max-w-[200px] mx-auto overflow-hidden rounded-lg bg-secondary/10">
        <Image src={portraitImage} alt={name} fill sizes="200px" className="object-cover" />
      </div>
      <div>
        <h3 className="text-lg font-heading font-semibold text-primary">{name}</h3>
        <p className="text-sm text-foreground/60 uppercase tracking-wider font-heading">{title}</p>
      </div>
      {bio && <p className="text-sm text-foreground/70 leading-relaxed">{bio}</p>}
      {detailHref && (
        <span className="text-xs font-heading text-primary uppercase tracking-wider mt-1">
          View full history →
        </span>
      )}
    </article>
  )
  if (detailHref) {
    return (
      <Link href={detailHref} className="group block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }
  return content
}
```

- [ ] **Step 2: SubsidiaryBoardCard**

**File:** `src/components/ui/subsidiary-board-card.tsx`

```tsx
import Image from "next/image"

export interface SubsidiaryBoardCardProps {
  subsiteName: string
  subsiteFavicon: string
  nameThere: string
  titleThere: string
  blurb: string
  href: string
}

export function SubsidiaryBoardCard({
  subsiteName,
  subsiteFavicon,
  nameThere,
  titleThere,
  blurb,
  href,
}: SubsidiaryBoardCardProps) {
  return (
    <a
      href={href}
      className="flex gap-4 p-5 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors"
    >
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={subsiteFavicon}
          alt={`${subsiteName} logo`}
          fill
          sizes="40px"
          className="object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 font-heading mb-0.5">{subsiteName}</p>
        <h4 className="text-base font-heading font-semibold text-primary leading-tight">{nameThere}</h4>
        <p className="text-xs text-foreground/60 uppercase tracking-wider font-heading mb-1">{titleThere}</p>
        {blurb && <p className="text-sm text-foreground/70 leading-snug">{blurb}</p>}
      </div>
    </a>
  )
}
```

- [ ] **Step 3: Type check + commit**

```bash
npx tsc --noEmit
git add src/components/ui/leader-card.tsx src/components/ui/subsidiary-board-card.tsx
git commit -m "feat(ui): add LeaderCard and SubsidiaryBoardCard components"
```

---

## Task 10: Rebuild apex About page

**File:** `src/sites/apex/pages/about.tsx` (replace contents)

- [ ] **Step 1: Rewrite**

Convert the current "use client" About page into a server component that:
- Removes all `TEAM_NAMES/TITLES/BIOS` arrays and shuffle logic
- Reads from `apex/data/leadership.ts`
- Renders hero, story/mission, operating principles, MetricStrip (By the Numbers), and 4 LeaderCards linking to `/leadership/[slug]`

```tsx
import { headers } from "next/headers"
import { Hero } from "@/components/ui/hero"
import { LeaderCard } from "@/components/ui/leader-card"
import { MetricStrip, type Metric } from "@/components/ui/metric-strip"
import { apexLeaders } from "../data/leadership"
import { getAllPortfolioBrands } from "../data/portfolio-utils"

const PRODUCTION_HOST = "specificindustries.com"

export default async function ApexAbout() {
  await headers()
  const brands = getAllPortfolioBrands()

  const metrics: Metric[] = [
    { value: String(brands.length), label: "Active portfolio brands" },
    { value: "5", label: "Strategic verticals" },
    { value: "<11,000", label: "Combined addressable market" },
    { value: "1 of 4", label: "Board meetings attended" },
    { value: "$0", label: "Outside capital committed" },
    { value: "2019", label: "Founded" },
  ]
  void PRODUCTION_HOST

  return (
    <>
      <Hero
        headline="About Specific Industries"
        subheadline="Identifying and serving the world's most overlooked market segments since 2019."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-heading font-bold text-primary">Our Story</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Specific Industries was founded by Bill Sambrone after a simple observation: some industries
            are so specific, so niche, so deeply underserved that no one had thought to build a
            dedicated brand for them. The firm's first acquisition followed within the quarter.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            What began as a single venture into an overlooked market has grown into a portfolio of
            brands, each laser-focused on serving a specific industry with the dedication and
            expertise it deserves. We do not chase broad markets. We find the gaps that others
            walk right past and build something for the people standing in them.
          </p>

          <h2 className="text-3xl font-heading font-bold text-primary pt-8">Our Mission</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            To identify, develop, and operate brands that serve markets too specific for anyone else
            to bother with. We believe that every industry — no matter how niche — deserves a
            company that takes it seriously.
          </p>

          <h2 className="text-3xl font-heading font-bold text-primary pt-8">Operating Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            <div>
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Market Specificity</h3>
              <p className="text-foreground/60 text-sm">We go where others will not — into markets so specific they barely have a name.</p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Vertical Dedication</h3>
              <p className="text-foreground/60 text-sm">Each brand receives our full attention. We do not do half-measures in niche markets.</p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Operational Rigor</h3>
              <p className="text-foreground/60 text-sm">We apply serious operational rigor to industries that most people do not know exist.</p>
            </div>
          </div>
        </div>
      </section>

      <MetricStrip metrics={metrics} />

      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-4 text-primary">Leadership</h2>
          <p className="text-center text-foreground/60 max-w-2xl mx-auto mb-12 text-sm">
            Four executives. Serving on the board of every portfolio company. Stable tenure since firm inception.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {apexLeaders.map((leader) => (
              <LeaderCard
                key={leader.slug}
                portraitImage={leader.portraitImage}
                name={leader.name}
                title={leader.title}
                bio={leader.bio}
                detailHref={`/leadership/${leader.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Type check + build + commit**

```bash
npx tsc --noEmit
npm run build
git add src/sites/apex/pages/about.tsx
git commit -m "feat(apex): rebuild About with stable 4-leader roster and metric strip"
```

---

## Task 11: Create leader detail page + dynamic route

- [ ] **Step 1: Create detail page component**

**File:** `src/sites/apex/pages/leader-detail.tsx`

```tsx
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getApexLeaderBySlug, apexLeaders } from "../data/leadership"
import { collectLeaderHistory } from "../data/leader-history"
import { SubsidiaryBoardCard } from "@/components/ui/subsidiary-board-card"
import { verticals, verticalOrder } from "../data/verticals"
import type { VerticalKey } from "@/themes"

const PRODUCTION_HOST = "specificindustries.com"

interface Props {
  slug: string
}

export default async function LeaderDetail({ slug }: Props) {
  const leader = getApexLeaderBySlug(slug)
  if (!leader) notFound()

  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isProduction = host.endsWith(PRODUCTION_HOST)

  const history = await collectLeaderHistory(leader.person)

  const grouped = new Map<VerticalKey | "uncategorized", typeof history>()
  for (const pos of history) {
    const key = pos.verticalKey ?? "uncategorized"
    const arr = grouped.get(key) ?? []
    arr.push(pos)
    grouped.set(key, arr)
  }

  function subsiteHref(subdomain: string): string {
    return isProduction
      ? `https://${subdomain}.${PRODUCTION_HOST}/about`
      : `/about?site=${subdomain}`
  }

  return (
    <>
      <section className="py-16 px-4 border-b border-primary/10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[200px_1fr] gap-10 items-start">
          <div className="relative aspect-square w-full max-w-[200px] rounded-lg overflow-hidden bg-secondary/10">
            <Image src={leader.portraitImage} alt={leader.name} fill sizes="200px" className="object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-2">Leadership</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3">{leader.name}</h1>
            <p className="text-base text-foreground/70 uppercase tracking-wider font-heading mb-6">{leader.title}</p>
            <p className="text-foreground/80 leading-relaxed max-w-2xl">{leader.bio}</p>
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Career Highlights</h2>
          <ul className="space-y-2 text-foreground/80">
            {leader.careerHighlights.map((h) => (
              <li key={h} className="flex gap-3"><span className="text-primary">—</span><span>{h}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">Subsidiary Board Positions</h2>
          <p className="text-sm text-foreground/60 mb-8">
            Cross-portfolio roles held across {history.length} Specific Industries holdings.
          </p>
          {history.length === 0 ? (
            <p className="text-foreground/60">Board positions are being updated.</p>
          ) : (
            <div className="space-y-8">
              {verticalOrder.map((key) => {
                const positions = grouped.get(key) ?? []
                if (positions.length === 0) return null
                return (
                  <div key={key}>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-3">
                      {verticals[key].displayName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {positions.map((p) => (
                        <SubsidiaryBoardCard
                          key={p.subdomain}
                          subsiteName={p.subsiteName}
                          subsiteFavicon={p.subsiteFavicon}
                          nameThere={p.nameThere}
                          titleThere={p.titleThere}
                          blurb={p.blurb}
                          href={subsiteHref(p.subdomain)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
              {(grouped.get("uncategorized") ?? []).length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-3">Other</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {grouped.get("uncategorized")!.map((p) => (
                      <SubsidiaryBoardCard
                        key={p.subdomain}
                        subsiteName={p.subsiteName}
                        subsiteFavicon={p.subsiteFavicon}
                        nameThere={p.nameThere}
                        titleThere={p.titleThere}
                        blurb={p.blurb}
                        href={subsiteHref(p.subdomain)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Credentials</h2>
          <ul className="space-y-2 text-foreground/80">
            {leader.credentials.map((c) => (
              <li key={c} className="flex gap-3"><span className="text-primary">—</span><span>{c}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-primary/10">
        <div className="max-w-5xl mx-auto">
          <Link href="/about" className="text-sm font-heading text-primary hover:underline">
            ← Back to About
          </Link>
        </div>
      </section>
    </>
  )
}

export function apexLeaderSlugs(): string[] {
  return apexLeaders.map((l) => l.slug)
}
```

- [ ] **Step 2: Register dynamic route in apex barrel**

Edit `src/sites/apex/index.ts` — add at end of file:

```typescript
import type { DynamicRoute } from "@/themes"
import LeaderDetail, { apexLeaderSlugs } from "./pages/leader-detail"
import { getApexLeaderBySlug } from "./data/leadership"

const validLeaderSlugs = new Set(apexLeaderSlugs())

export const dynamicRoutes: Record<string, DynamicRoute> = {
  "leadership": {
    component: ({ slug }) => <LeaderDetail slug={slug} />,
    getMetadata: (slug) => {
      const leader = getApexLeaderBySlug(slug)
      if (!leader) return undefined
      return {
        title: `${leader.name} — ${leader.title} — Specific Industries`,
        description: leader.bio,
      }
    },
    isValidSlug: (slug) => validLeaderSlugs.has(slug),
  },
}
```

Since apex/index.ts is .ts not .tsx, the JSX in the component wrapper needs .tsx. Actually, the component wrapper can just be a named React function component in a .tsx file imported here. Simpler: change the index file extension or write the wrapper in leader-detail.tsx.

Use this approach instead: export a default function from leader-detail.tsx that accepts `{ slug, segments }` per the DynamicRoute interface:

```tsx
export default function LeaderDetailRoute({ slug }: { slug: string }) {
  return <LeaderDetailView slug={slug} />
}
```

And register without a wrapper:

```typescript
import LeaderDetailRoute, { apexLeaderSlugs } from "./pages/leader-detail"
...
"leadership": {
  component: LeaderDetailRoute,
  ...
}
```

Refactor leader-detail.tsx to export the view component and a default route wrapper. Update register.

- [ ] **Step 3: Register in apex barrel cleanly**

Update apex `index.ts` to register:

```typescript
import type { DynamicRoute } from "@/themes"
import LeaderDetailRoute, { apexLeaderSlugs } from "./pages/leader-detail"
import { getApexLeaderBySlug } from "./data/leadership"

const validLeaderSlugs = new Set(apexLeaderSlugs())

export const dynamicRoutes: Record<string, DynamicRoute> = {
  "leadership": {
    component: LeaderDetailRoute,
    getMetadata: (slug) => {
      const leader = getApexLeaderBySlug(slug)
      if (!leader) return undefined
      return {
        title: `${leader.name} — ${leader.title} — Specific Industries`,
        description: leader.bio,
      }
    },
    isValidSlug: (slug) => validLeaderSlugs.has(slug),
  },
}
```

- [ ] **Step 4: Register apex in registry with dynamicRoutes**

Edit `src/sites/registry.ts` — update apex import + registration:

```typescript
import { config as apexConfig, pages as apexPages, dynamicRoutes as apexDynamicRoutes } from "./apex"
...
apex: { config: apexConfig, pages: apexPages, dynamicRoutes: apexDynamicRoutes },
```

- [ ] **Step 5: Type check + build**

```bash
npx tsc --noEmit
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/sites/apex/pages/leader-detail.tsx src/sites/apex/index.ts src/sites/registry.ts
git commit -m "feat(apex): add /leadership/[slug] dynamic route with Board Positions"
```

---

## Task 12: Full verification build

- [ ] **Step 1: Run full verification**

```bash
npx tsc --noEmit
npm run build
```

Expected: both PASS. Fix any issues inline.

---

## Plan 2 Complete

Leadership system live: 4 apex leaders with detail pages; Board Positions auto-populate from 27 subsites (all now have `person` keyed leadership data); About page rebuilt with stable roster + metric strip.

**Next:** Plan 3 — Careers system.
