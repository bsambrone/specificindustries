# Apex Portfolio / PE-Satire Redesign

**Date:** 2026-04-18
**Scope:** specificindustries.com (apex site only)
**Status:** Design — pending implementation plan

## 1. Problem

The apex site today dumps all 28 portfolio brands into a single flat grid on the home page with no organization, no editorial control, and no narrative. As the portfolio has grown, this has become unwieldy for discovery and wastes the satirical opportunity inherent in the "Specific Industries" premise.

## 2. Goals

- **Satire as primary design language.** The apex site should itself be a parody of a private-equity holding company — portfolio, thesis, newsroom, partnerships, careers — with the portfolio's absurdity heightened by the clinical corporate framing around it.
- **Discovery built in.** Every brand must be findable through a vertical taxonomy. The home page teases; the `/portfolio` page delivers.
- **Cross-site identity.** The four canonical people (bill, brandon, jim, sean) are reusable across every subsite. Apex exposes their "career history" across the portfolio as Board Positions on leader detail pages.
- **Automatic new-site pickup.** Adding a new subsite to the registry automatically surfaces it in the correct apex vertical section, on the `/portfolio` directory, and on the relevant leader's Board Positions list — with no hand-edits to apex pages.

## 3. Vertical Taxonomy (5 verticals)

All brands are assigned to exactly one vertical via a new required `verticalKey` field on `SiteConfig`.

| Key | Display Name | Examples |
|---|---|---|
| `consumer-goods` | Consumer Goods & Consumables | pigmilk, dehydratedwater, bonelesswater, snortables, rocks, inflatableanchors, superengineered, carterandfils, gristmill |
| `hygiene` | Personal Hygiene & Home Essentials | truegrit, seeltite |
| `health-wellness` | Health & Wellness Holdings | sovereignwellness, radiumroys, mostlysterile |
| `subscription-services` | Subscription Services | onlyfans, onlypans |
| `professional-services` | Professional Services & Emerging Ventures | strategicvoid, stratify, grassfedwifi, privatrix, pettential, elderparty, oddoccasions, meh, cleansheet, squaredaway, mousetrapjenga |

Assignments are adjustable during implementation. The vertical taxonomy itself is fixed.

## 4. Information Architecture

### Top nav (6 items)

| Label | Route | Purpose |
|---|---|---|
| Portfolio | `/portfolio` | All brands directory, grouped by vertical, with filter chips |
| Thesis | `/thesis` | PE-deck-style investment thesis |
| Newsroom | `/newsroom` | Fake press releases (list + detail pages) |
| Partnerships | `/partnerships` | "Submit your industry" satire + acquisition criteria |
| Careers | `/careers` | Ridiculous open roles (list + detail pages) |
| About | `/about` | Company story + leadership (with detail pages) |

Home is reached via logo/wordmark (not an explicit nav item).

### Footer utility nav

Disclaimer, Privacy, Terms, Contact.

### Dynamic routes (apex)

Apex gains `dynamicRoutes` covering:
- `leadership/[slug]` — leader detail page
- `careers/[slug]` — role detail page
- `newsroom/[slug]` — press release detail page

Plus flat routes for partnerships-received dead-end and careers-applied dead-end (static pages, not dynamic routes).

## 5. Leadership Model

### Canonical people

The same four men appear across every subsite. Each has a stable base-image key:

- `bill` — always the founder slot
- `brandon`
- `jim`
- `sean`

On apex, these four correspond to four permanent leader slots, in this order. Names, titles, and bios are **stable** — randomization-per-visit is removed from the apex About page. Each subsite gives the same four people *different* (but stable-per-site) names, which is the joke.

### Apex leaders

| Position | `person` | Apex name | Role |
|---|---|---|---|
| 1 | `bill` | Bill Sambrone | Founder & CEO (real person in the joke lineage) |
| 2 | `brandon` | *defined at implementation; stable thereafter* | corporate exec (e.g., Chief Operating Officer or Chief Portfolio Officer) |
| 3 | `jim` | *defined at implementation; stable thereafter* | corporate exec (e.g., Chief Specificity Officer or Chief Investment Officer) |
| 4 | `sean` | *defined at implementation; stable thereafter* | corporate exec (e.g., Chief Strategy Officer or Chief of Staff) |

Names for positions 2-4 are chosen once during implementation (from a generic Western name pool, per the existing cross-site convention) and frozen at that point. Detail-page URLs depend on the stable slugs derived from these names, so renaming afterward breaks links.

### About page

- Hero (quarterly-report voice)
- Our Story (kept, tightened)
- Our Mission (kept, tightened)
- Operating Principles (renamed from current values trio; lean into vague corporate values)
- By the Numbers — satirical vanity metrics derived partially from registry
- Leadership — 4 LeaderCard slots, each with "View Full History →" link to detail page

### Leader detail page: `/leadership/[slug]`

Slugs are stable and derived from the apex leader name (e.g., `bill-sambrone`, `brandon-<surname>`).

Sections:
1. **Header** — portrait, full apex name, apex title, bio
2. **Career Highlights** — satirical bullets
3. **Subsidiary Board Positions** — compact cards, one per subsite where `leader.person === apexPersonKey`. Grouped/sorted by vertical. Each card shows subsite favicon, subsite name, person's name-at-that-site, title-at-that-site, one-sentence blurb, link to that subsite's about page.
4. **Education & Credentials** — satirical fake degrees
5. Back to About

### Leadership data backfill

10 subsites currently lack `data/leadership.ts`:
dehydratedwater, grassfedwifi, inflatableanchors, meh, mostlysterile, pigmilk, rocks, squaredaway, superengineered, truegrit

Each gets a new `src/sites/<subdomain>/data/leadership.ts` with exactly 4 entries in order bill → brandon → jim → sean. Each entry includes:

```typescript
interface Leader {
  person: "bill" | "brandon" | "jim" | "sean"
  slug: string
  name: string
  title: string
  bio: string
  portraitImage?: string   // optional; falls back to apex portrait
}
```

- Names, titles, bios are stable per-site and thematically appropriate to that site's voice
- Portrait strategy (path C — mix):
  - If the subsite has existing portrait images (e.g., superengineered has bill-ankeney, brandon-yothers, etc.), use those
  - Otherwise, fall back to the apex portrait for that person on the Board Positions card
  - Custom portraits can be commissioned later without blocking the feature
- Render on the subsite's own pages is out of scope for backfill — data-file only; subsite leadership page rendering is additive later work per-site

### Normalization

- `strategicvoid/data/leadership.ts` uses `referencePerson`; rename to `person` for consistency. Its richer `Executive` type is preserved; only the field name changes.
- A shared helper/type abstracts over leaders that have extended fields (e.g., `highlights`, `credentials`) vs. the simpler Leader shape.

### Leader history helper

```typescript
// src/sites/apex/data/leader-history.ts
interface BoardPosition {
  subdomain: string
  subsiteName: string
  subsiteFavicon: string
  nameThere: string
  titleThere: string
  blurb: string
  verticalKey: VerticalKey
}

function collectLeaderHistory(personKey: "bill" | "brandon" | "jim" | "sean"): BoardPosition[]
```

Pre-imports every registered subsite's leadership data at module load (no runtime fetch), filters by `person` key, groups by vertical.

## 6. Careers

### Overview page: `/careers`

- Hero (corporate careers messaging)
- Benefits callout — 4-6 satirical perks ("Unlimited ambiguity," "Competitive compensation (TBD)," etc.)
- Vertical filter chips — same 5 verticals + "All" + "Executive". URL-linkable via `?vertical=<key>`.
- Role list — 25 roles as inline cards, grouped by vertical when unfiltered
- "Why Specific Industries" closing callout
- Footer CTA — "Don't see your role? We are also accepting unsolicited proposals for positions that do not currently exist."

### Role card (list view)

Compact card shows title, vertical badge, location, employment type, one-sentence summary, comp summary, and link to detail page.

### Role detail page: `/careers/[slug]`

1. Breadcrumb — `Careers › [Vertical]`
2. Header — title, vertical badge, location, employment type, posted-line
3. About this role — 1-2 paragraphs of satire
4. What You'll Do — 6-10 absurd responsibilities
5. What We're Looking For — 5-8 required qualifications
6. Bonus Points (Preferred Qualifications) — 2-5 over-the-top extras
7. Compensation — full breakdown (see model below)
8. Benefits — default to company-wide; role-specific override allowed
9. How to Apply — single shared Apply CTA → `/careers/applied` dead-end page
10. Related openings — 2-3 other roles in the same vertical
11. Back to all openings

### Role data model

```typescript
// src/sites/apex/data/careers.ts
type CareersVertical =
  | "consumer-goods"
  | "hygiene"
  | "health-wellness"
  | "subscription-services"
  | "professional-services"
  | "corporate"

interface JobCompensation {
  summary: string       // For the list card (e.g., "Competitive + pistachios")
  lines: string[]       // Full breakdown bullets on the detail page
  note?: string         // Optional disclaimer line
}

interface JobListing {
  slug: string
  title: string
  vertical: CareersVertical
  location: string
  employmentType: string
  postedLine: string
  summary: string
  about: string[]                       // Paragraph array for detail page intro
  responsibilities: string[]
  qualifications: string[]
  preferredQualifications?: string[]
  compensation: JobCompensation
  benefitsOverride?: string[]
}

export const jobs: JobListing[]
export function getJobBySlug(slug: string): JobListing | undefined
```

### Role catalog — 25 roles

Distribution across verticals (final roles written during implementation):
- Consumer Goods & Consumables: 5
- Personal Hygiene & Home Essentials: 3
- Health & Wellness Holdings: 3
- Subscription Services: 3
- Professional Services & Emerging Ventures: 5
- Executive / Corporate HQ: 6

### Compensation strategy

Target mix across the 25 roles:
- ~40% money range only, with absurd ranges ("$40,000 – $400,000 depending on negotiating style")
- ~20% pure alternative compensation (no dollars — weird items only)
- ~40% hybrid (money + alternatives)

Weird-comp catalog (draw from these, add more freely):
- All-you-can-eat pistachios (shelled or unshelled)
- Quarterly cheese wheel allocation
- Reserved seat at the annual retreat (retreat not currently scheduled)
- Named in the acknowledgements of a never-published memoir
- Executive parking spot on alternate Tuesdays
- Complimentary tote bag
- First right of refusal on discontinued portfolio products
- Weekly coin roll from the CFO's personal jar
- Lifetime supply of branded portfolio-company product samples
- One commemorative plaque annually
- Seasonal fruit basket (peaches only)
- Unlimited paper towels
- Unlimited cold brew (at-desk only)
- One (1) branded pen set on hire
- Equity in the portfolio company of your choice (pending legal review, ongoing since 2017)

### Apply flow

- All Apply buttons → `/careers/applied` (shared dead-end page)
- Copy: "Thank you. We have received your application. You will hear from us when a decision has been made. No decision is currently scheduled."
- Optionally reads `?role=<slug>` query string to personalize ("for the role of *VP of Portfolio Company Naming Conventions*")
- No form, no email, no real submission

## 7. Home Page

### Section order (top → bottom)

1. **Hero** — corporate, PE-deck
   - Headline (sharpened to PE-flavored), subhead, primary CTA → `/portfolio`, secondary link → `/thesis`
   - Background image: `companyhq.png` (existing)
2. **By the Numbers strip** — 4-6 big-number/small-label metrics, some derived from registry (e.g., active brand count, vertical count)
3. **Featured Holdings ribbon** — 3-4 manually-featured brands with richer card treatment. Editorial list at `src/sites/apex/data/featured.ts` (exports `featuredHoldings: string[]`, max 4 subdomain keys).
4. **Portfolio by Vertical** — 5 sections in fixed order (consumer-goods → hygiene → health-wellness → subscription-services → professional-services). Each section has heading, vertical description (sourced from `src/sites/apex/data/verticals.ts` — see below), brand card grid, "View all in [Vertical] →" link.
5. **Newsroom teaser** — 3 most recent fake press releases as compact cards + "View all press releases →"
6. **Partnerships CTA block** — framed, attention-grabbing, heading "Have an Industry We Should Acquire?" → `/partnerships`
7. **Leadership teaser** — 4 leader thumbnails, names + titles, "Meet the leadership →" → `/about`
8. **Careers teaser** — role count stat (derived from `jobs.length`) + 2-3 featured role titles (editorial list at `src/sites/apex/data/featured.ts` — add `featuredJobs: string[]` alongside `featuredHoldings`) + "View all openings →" → `/careers`
9. **Footer** — utility nav

### Vertical ordering

Fixed order: consumer-goods → hygiene → health-wellness → subscription-services → professional-services. Applies to Home and `/portfolio`.

### Vertical metadata

```typescript
// src/sites/apex/data/verticals.ts
interface VerticalMeta {
  key: VerticalKey
  displayName: string        // "Consumer Goods & Consumables"
  shortDescription: string   // 1-2 sentence deadpan intro paragraph, shown above each vertical's brand grid
  thesis: string             // 1-line satirical investment thesis, shown on /thesis and /portfolio per-vertical headings
}
export const verticals: Record<VerticalKey, VerticalMeta>
export const verticalOrder: VerticalKey[]   // Fixed display order
```

Single source of truth for vertical display data, consumed by Home, Portfolio, Careers filters, and Thesis.

## 8. Portfolio Page — `/portfolio`

- Hero strip with title + portfolio count
- Sticky filter bar — vertical chips (5 + "All") + sort dropdown (A-Z, Most Recent, Featured First)
- Grid — all brands grouped by vertical, with per-vertical intro paragraph, heading, and count badge
- Brand cards use the same `BrandCard` component as Home, denser grid (5-6 across on desktop)
- Footer CTA — "Missing from our portfolio? [Submit your industry for evaluation →]" → `/partnerships`

## 9. Thesis Page — `/thesis`

- Hero — "Investment Thesis"
- The Opportunity — 2-3 paragraphs about overlooked markets under 11,000 people
- Our Investment Criteria — 5-6 satirical criteria cards
- Our Framework — an invented multi-letter PE framework (proposed: S.P.E.C.I.F.I.C. — Segment identification / Premise interrogation / Economic justification / Commitment timeline / Incubation / First-to-market / Indefinite operation / Capital event). Each letter gets a short satirical description.
- Track Record — deadpan stats ("Brands launched: 28. Brands wound down: 0. Brands profitable: under review.")
- Footer CTA → `/partnerships`

## 10. Newsroom — `/newsroom` + `/newsroom/[slug]`

### Index page

- Hero — "Newsroom" / "The latest from Specific Industries and its portfolio companies"
- Release list — 10 satirical press releases as cards (date, headline, byline, 1-sentence lede, "Read more →")
- Optional filter: by year or by vertical

### Press release detail page

- Full PR layout: headline → dateline → lede → quotes from fictional execs → boilerplate "About Specific Industries" block → contact info (fake)
- Target 800-1200 words per release
- Start with 10 full releases

### Starter releases (tone anchors)

- Specific Industries Completes Acquisition of Boneless Water Holdings
- Specific Industries Announces Q2 Portfolio Highlights, Declines to Define Highlight Criteria
- Specific Industries Names J. Rutherford Pennington as Chief Disruption Evangelist
- Specific Industries Closes Deal with Grist Mill & Co. (Est. 1847); Heritage Division Expands
- Seel-Tite Containment Systems Announces OPX-15 Revision; Walter Thorne Signs In Person
- Specific Industries Expands Subscription Services Vertical with OnlyPans Acquisition
- TrueGrit Abrasives Launches New Grit Category; Market Segment "Too Specific to Define"
- Specific Industries Appoints Inaugural VP of Portfolio Company Naming Conventions
- Strategic Void Consulting Recognized in Consulting Magazine's "Firms That Continue to Exist" 2025 Issue
- Specific Industries Issues Year-End Letter to Stakeholders; Stakeholders Remain Undefined

## 11. Partnerships — `/partnerships` + `/partnerships/received`

### Index page

- Hero — "Strategic Acquisitions & Partnerships" / "We are always evaluating new industries."
- Acquisition Criteria — checklist-style block with 5-6 satirical criteria
- How the Process Works — 4-step deadpan flow (submit → 14-18 month evaluation → contact if selected → silence if not)
- Submission form — non-functional satirical form:
  - Industry name
  - Estimated addressable market (max validation: 11,000)
  - Primary product or service
  - Why your industry has gone unserved to date
  - Optional file upload (fake)
  - Submit → `/partnerships/received` dead-end
- Recent Acquisitions — 4-5 cards linking into `/newsroom/[slug]`
- FAQ — 5-6 deadpan Q&As

### Received dead-end

Static page. Copy: confirms the submission has been filed, notes no response is scheduled, lists the evaluation queue length.

## 12. Shared Components

New components under `src/components/ui/`:

- **`BrandCard`** — favicon + brand name + tagline + accent-color top border. Used on Home and Portfolio.
- **`VerticalSection`** — heading + vertical description + grid of BrandCards. Used on Home and Portfolio.
- **`MetricStrip`** — big-number / small-label stat row. Used on Home ("By the Numbers") and About.
- **`PressReleaseCard`** — compact card for Newsroom listings and Home teaser.
- **`JobCard`** — compact card for Careers list.
- **`JobDetailSection`** — reusable detail-page section structure.
- **`LeaderCard`** — extends/replaces existing `TeamMember`. Supports linking to leader detail page.
- **`SubsidiaryBoardCard`** — Board Positions card on leader detail pages.
- **`CriteriaList`** — satirical checklist. Used on Thesis and Partnerships.
- **`SatiricalForm`** — the fake Partnerships submission form (client-side validation, no backend).

## 13. Auto-Pickup for New Sites

Apex surfaces iterate `siteRegistry` dynamically. Adding a new subsite propagates automatically to:

| Surface | Automatic? | How |
|---|---|---|
| Home — Portfolio by Vertical | Yes | Registry iteration filtered by `config.verticalKey` |
| `/portfolio` | Yes | Same registry iteration + filter chips |
| `/portfolio` filter counts | Yes | Derived from registry grouping |
| Home — Featured Holdings | No (editorial) | `src/sites/apex/data/featured.ts` |
| About — By the Numbers count | Yes | Derived from `siteRegistry` size |
| Leader detail Board Positions | Yes | `collectLeaderHistory(personKey)` pre-imports all subsite leadership data |

### Required fields on `SiteConfig` (new/changed)

```typescript
type VerticalKey =
  | "consumer-goods"
  | "hygiene"
  | "health-wellness"
  | "subscription-services"
  | "professional-services"

interface SiteConfig {
  // existing fields...
  verticalKey: VerticalKey  // REQUIRED
  tagline?: string          // Optional; falls back to truncated metadata.description
}
```

### Adding a new site — apex integration checklist

For a new site to integrate fully with apex, it needs:

1. `config.ts` has `verticalKey` (required) and `tagline` (optional but recommended)
2. `data/leadership.ts` exists, exporting a `leaders` array with 4 entries, each with `person: "bill" | "brandon" | "jim" | "sean"`
3. `public/sites/<subdomain>/favicon.png` exists
4. Site is registered in `src/sites/registry.ts`

Nothing else on apex needs editing. The new site appears automatically in the correct vertical section on Home, on `/portfolio`, and on relevant Board Positions lists.

## 14. Voice & Tone Guide

Applies to all apex-site copy.

- **Deadpan, never winky.** The satire is in the specificity and the implications, not in exclamation points or self-aware jokes.
- **Over-corporate vocabulary.** Use "leverage," "synergy," "strategic," "framework," "evaluation," "thesis," "alignment," "portfolio," "holdings," "vertical," "category" frequently and slightly wrongly.
- **Confident negativity.** Positive-sounding phrasing that on inspection is neutral or negative: "committed indefinitely," "compensation to be determined," "evaluation queue of 14-18 months."
- **Footnote-bombs.** Asterisked follow-ups that deflate claims. "Equity in the portfolio company of your choice.*" — "*Pending legal review, ongoing since 2017."
- **Numbers are precise but useless.** "14-18 months," "under 11,000 people," "1 of 4 scheduled meetings," "approximately 47 connections on LinkedIn."
- **Never break character.** Everywhere on apex, the parent company is a serious PE firm. The punchline is the premise, not self-aware commentary about it.

## 15. Implementation Phasing (High-Level)

Suggested ordering for the implementation plan (detailed plan comes next via writing-plans skill):

1. **Type & data foundation** — add `VerticalKey` type, update `SiteConfig`, assign `verticalKey` + `tagline` to all 28 sites, normalize `strategicvoid`'s `referencePerson`, create shared leader-like type
2. **Leadership data backfill** — add `data/leadership.ts` to the 10 missing subsites
3. **Apex data collection** — `leader-history.ts`, `featured.ts`, `careers.ts`, `newsroom.ts`, `partnerships/faqs.ts`, etc.
4. **Shared components** — BrandCard, VerticalSection, MetricStrip, PressReleaseCard, JobCard, LeaderCard, SubsidiaryBoardCard, CriteriaList, SatiricalForm
5. **Apex config & dynamic routes** — nav update, dynamic routes registration
6. **Page rebuilds** — Home, About, Portfolio, Thesis, Newsroom (+ detail), Partnerships (+ received), Careers (+ detail, + applied), Leadership detail
7. **Content pass** — 25 role detail pages, 10 press release full texts, all satirical body copy

## 16. Out of Scope

- Subsite `/leadership` page rendering where it doesn't already exist (data-only backfill is in scope; rendering is per-site, additive, later)
- Custom portrait generation for the 10 backfilled subsites (apex-portrait fallback covers Board Positions; costumed portraits come later per-site)
- Real forms / real email routing on the Partnerships page (intentionally non-functional)
- Real newsletter, newsroom RSS, or PR distribution
- SEO-oriented copy beyond basic per-page metadata
- Mobile-specific optimization beyond responsive layouts
- Analytics, tracking, or conversion instrumentation

## 17. Open Questions

None at spec time. Open questions surfaced during implementation will be raised per-step.
