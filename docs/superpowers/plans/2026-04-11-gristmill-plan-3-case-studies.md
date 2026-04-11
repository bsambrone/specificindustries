# Gristmill Partners — Plan 3: Case Studies

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship the 8 case studies described in the spec. Define the CaseStudy data types with six composable section kinds (Challenge, Engagement, Timeline, Metrics, Quote, Outcome), write 8 case study data files, build the case study page renderer, build the case studies index page, and wire the `case-studies` dynamic route.

**Architecture:** Composable content sections matching the pattern strategicvoid uses for its case studies and whitepapers. Each case study is a data object with top-level hero fields (`company`, `industry`, `location`, `heroStat`, `engagedArms`) plus an ordered `sections` array that mixes the six section kinds. The renderer maps each section kind to a rendering branch. No new shared components needed — all inline rendering within the CaseStudyPage component.

**Spec:** `docs/superpowers/specs/2026-04-11-gristmill-partners-design.md`
**Preceding plans:** Plan 1 (foundation), Plan 2 (full content).
**Subsequent plan:** Plan 4 (images).

## File Map

### Create
- `src/sites/gristmill/data/case-studies/types.ts` — CaseStudy, CaseStudySection union, hero field types.
- `src/sites/gristmill/data/case-studies/orphan-crushing-factory.ts`
- `src/sites/gristmill/data/case-studies/dickensian-dynamics.ts`
- `src/sites/gristmill/data/case-studies/throckmorton-industrial-group.ts`
- `src/sites/gristmill/data/case-studies/meridian-coal-data.ts`
- `src/sites/gristmill/data/case-studies/helix-fane-shareholder-services.ts`
- `src/sites/gristmill/data/case-studies/rustbelt-holdings.ts`
- `src/sites/gristmill/data/case-studies/pemberton-shale-refining.ts`
- `src/sites/gristmill/data/case-studies/grassmere-acoustics.ts`
- `src/sites/gristmill/data/case-studies/index.ts` — barrel exporting `caseStudies` array and `getCaseStudyBySlug` helper.
- `src/sites/gristmill/pages/case-study-page.tsx` — dynamic case study page renderer.

### Modify
- `src/sites/gristmill/pages/case-studies-index.tsx` — replace the stub with a full grid.
- `src/sites/gristmill/index.ts` — add the `case-studies` dynamic route entry.

---

## Voice Reference

Read `src/sites/gristmill/data/services.ts` before writing any prose. Case study prose must match the deadpan 1970s trade-journal voice. Every paragraph reads as corporate case-study content, not satire. The comedy is in what is described.

---

## Task 1: Define CaseStudy data types

**Files:**
- Create: `src/sites/gristmill/data/case-studies/types.ts`

- [ ] **Step 1: Write the types file**

```typescript
export interface HeroStat {
  value: string
  label: string
}

export interface TimelinePhase {
  name: string
  description: string
}

export interface MetricStat {
  value: string
  label: string
}

export type CaseStudySection =
  | { kind: "challenge"; paragraphs: string[] }
  | { kind: "engagement"; intro: string; products: string[] /* service slugs */ }
  | { kind: "timeline"; phases: TimelinePhase[] }
  | { kind: "metrics"; stats: MetricStat[] }
  | {
      kind: "quote"
      body: string
      attribution: string
      role: string
      photoSlug: string
    }
  | { kind: "outcome"; paragraphs: string[] }

export interface CaseStudy {
  slug: string
  company: string
  industry: string
  location: string
  headline: string
  heroStat: HeroStat
  engagedArms: string[] /* arm slugs */
  sections: CaseStudySection[]
}
```

- [ ] **Step 2: `npx tsc --noEmit` — PASS**
- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/case-studies/types.ts
git commit -m "feat(gristmill): define CaseStudy data types with composable sections"
```

---

## Task 2: Write case study data for The Orphan Crushing Factory

**Files:**
- Create: `src/sites/gristmill/data/case-studies/orphan-crushing-factory.ts`

**Required hero fields:**
- `slug: "orphan-crushing-factory"`
- `company: "The Orphan Crushing Factory"`
- `industry: "Heavy Manufacturing"`
- `location: "Youngstown, OH"`
- `headline: "Reduced voluntary turnover to 0.2% using the Perpetual Reorganization Protocol and the Pride in Your Station Seminar Series."`
- `heroStat: { value: "0.2%", label: "Voluntary Turnover" }`
- `engagedArms: ["restructuring", "retention"]`

**Section requirements:** Every case study uses all six section kinds at least once, in this order: `challenge`, `engagement`, `timeline`, `metrics`, `quote`, `outcome`.

- `challenge`: 2–3 paragraphs of deadpan trade-journal prose describing the fictional client's "workforce stability crisis" around 2019. Pick a specific inciting incident.
- `engagement`: intro paragraph naming the arms deployed, products array referencing actual service slugs (e.g., `["perpetual-reorganization-protocol", "pride-in-your-station-seminar"]`).
- `timeline`: 4 phases, each with a short name and 1–2 sentence description.
- `metrics`: 4 stats (e.g., `"0.2%"` voluntary turnover, `"94%"` retention, `"$2.8M"` compensation savings, `"6"` quarterly reorganizations delivered).
- `quote`: A client HR executive or CFO quote, 2–3 sentences, attributed with a fake name, fake title, and a `photoSlug` pointing at one of the existing shared testimonial photos (`asher-bloom`, `brenda-faulk`, `chad-gullet`, `derek-pullman`, `eleanor-whittaker`, `francois-delacroix`, `greg-diane-hofstra`, `jason-kile`, `kyle-brandt`, `marcus-chen`, `nina-cabrera`, `patricia-hollowell`, `ryan-ashford`, `simone-archer`, `tamara-voss`, `tony-mazetti`). Use `photoSlug` values WITHOUT the `.png` extension.
- `outcome`: 1–2 paragraphs ending with a quiet implication that something grim has happened to the workforce.

**Prose rules:** Match the voice of `src/sites/gristmill/data/services.ts`. Never wink. Every specific stat must be internally consistent with the case's narrative.

- [ ] **Step 1: Read `src/sites/gristmill/data/services.ts` for voice reference.**
- [ ] **Step 2: Write `src/sites/gristmill/data/case-studies/orphan-crushing-factory.ts`:**

```typescript
import type { CaseStudy } from "./types"

export const orphanCrushingFactory: CaseStudy = {
  slug: "orphan-crushing-factory",
  // ... all fields and sections
}
```

The file exports a single named constant matching the slug in camelCase.

- [ ] **Step 3: `npx tsc --noEmit` — PASS**
- [ ] **Step 4: Commit**

```bash
git add src/sites/gristmill/data/case-studies/orphan-crushing-factory.ts
git commit -m "feat(gristmill): add Orphan Crushing Factory case study"
```

---

## Tasks 3–9: Remaining 7 case study data files

Each task follows the exact same shape as Task 2. Write one case study data file per task, each as its own commit. The eight fictional clients are:

| Task | Slug | Client | Location | Engaged Arms | Hero Stat | Headline |
|---|---|---|---|---|---|---|
| 3 | `dickensian-dynamics` | Dickensian Dynamics | Hartford, CT | management, communications | `"94%"` / `"Meeting Density"` | Regional insurance firm deploys the Calendar Saturation Protocol and achieves 94% meeting density across all workdays. |
| 4 | `throckmorton-industrial-group` | Throckmorton Industrial Group | Gary, IN | compensation | `"100%"` / `"Raise Requests Eliminated"` | Steel holding company eliminates 100% of raise requests through the Shareholder Empathy Curriculum. |
| 5 | `meridian-coal-data` | Meridian Coal & Data | Wheeling, WV | retention | `"+38%"` / `"Reported Gratitude"` | Energy conglomerate rolls out the Ambient Layoff Rumor Service during a record-profit quarter and sees unprecedented gratitude. |
| 6 | `helix-fane-shareholder-services` | Helix-Fane Shareholder Services | Stamford, CT | training | `"2,080"` / `"Mandatory Training Hours"` | Financial services firm uses the 247-Slide Deck to fill an entire fiscal year with training hours. |
| 7 | `rustbelt-holdings` | Rustbelt Holdings LLC | Akron, OH | performance | `"14"` / `"Impossible Objectives"` | 40-year Gristmill client adopts the Stretch Goals (Literal Edition) framework and sets 14 mathematically impossible Q3 objectives. |
| 8 | `pemberton-shale-refining` | Pemberton-Shale Refining | Bakersfield, CA | engagement | `"63%"` / `"Non-Conforming Smilers"` | Refinery deploys Smile Compliance Monitoring and discovers 63% of staff were not smiling with sufficient conviction. |
| 9 | `grassmere-acoustics` | Grassmere Acoustics | Lowell, MA | workspace | `"+41dB"` / `"Ambient Office Volume"` | Mid-size manufacturer redesigns its entire office around Open Office Acoustic Amplification and reports a new level of ambient despair. |

For each task (3 through 9):

- [ ] **Step 1: Write the data file** `src/sites/gristmill/data/case-studies/<slug>.ts` following Task 2's pattern. All six section kinds in the standard order. Products in `engagement.products` must reference real service slugs from the appropriate arm. Each `quote.photoSlug` references a distinct shared testimonial slug (no extension). Try to use a different photoSlug for each case study so the photos don't repeat.
- [ ] **Step 2: `npx tsc --noEmit` — PASS**
- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/case-studies/<slug>.ts
git commit -m "feat(gristmill): add <Client Name> case study"
```

---

## Task 10: Barrel index for case studies

**Files:**
- Create: `src/sites/gristmill/data/case-studies/index.ts`

- [ ] **Step 1: Write the barrel**

```typescript
import type { CaseStudy } from "./types"
import { orphanCrushingFactory } from "./orphan-crushing-factory"
import { dickensianDynamics } from "./dickensian-dynamics"
import { throckmortonIndustrialGroup } from "./throckmorton-industrial-group"
import { meridianCoalData } from "./meridian-coal-data"
import { helixFaneShareholderServices } from "./helix-fane-shareholder-services"
import { rustbeltHoldings } from "./rustbelt-holdings"
import { pembertonShaleRefining } from "./pemberton-shale-refining"
import { grassmereAcoustics } from "./grassmere-acoustics"

export const caseStudies: CaseStudy[] = [
  orphanCrushingFactory,
  dickensianDynamics,
  throckmortonIndustrialGroup,
  meridianCoalData,
  helixFaneShareholderServices,
  rustbeltHoldings,
  pembertonShaleRefining,
  grassmereAcoustics,
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getCaseStudiesByArm(armSlug: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.engagedArms.includes(armSlug))
}
```

- [ ] **Step 2: `npx tsc --noEmit` — PASS**
- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/case-studies/index.ts
git commit -m "feat(gristmill): add case studies barrel export"
```

---

## Task 11: Build the CaseStudyPage renderer component

**Files:**
- Create: `src/sites/gristmill/pages/case-study-page.tsx`

Renders a single case study from a slug. Dispatches each section kind to an inline render branch. Uses `next/image` for the quote photos.

- [ ] **Step 1: Write the component**

```typescript
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { getCaseStudyBySlug } from "../data/case-studies"
import { getServiceBySlug } from "../data/services"
import { getArmBySlug } from "../data/arms"
import type { CaseStudySection } from "../data/case-studies/types"
import { notFound } from "next/navigation"

interface CaseStudyPageProps {
  slug: string
}

export default function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(slug)
  if (!caseStudy) notFound()

  return (
    <div className="bg-background text-foreground">
      <Hero
        headline={caseStudy.company}
        subheadline={`${caseStudy.industry} · ${caseStudy.location}`}
        image={`/sites/gristmill/case-studies/${caseStudy.slug}.png`}
      />

      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">
          Engagement Outcome
        </div>
        <div className="mb-2 font-heading text-6xl font-bold text-accent">
          {caseStudy.heroStat.value}
        </div>
        <div className="mb-6 text-sm uppercase tracking-wide text-foreground/70">
          {caseStudy.heroStat.label}
        </div>
        <p className="text-lg italic text-foreground/80">{caseStudy.headline}</p>
      </section>

      <div className="mx-auto max-w-3xl space-y-16 px-6 pb-20">
        {caseStudy.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}
      </div>

      <CTABanner
        headline="Interested in outcomes like these?"
        description="Request an engagement and a member of our Workforce Stabilization Team will be in touch within three to five business quarters."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}

function SectionRenderer({ section }: { section: CaseStudySection }) {
  switch (section.kind) {
    case "challenge":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">The Challenge</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      )

    case "engagement":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">The Engagement</h2>
          <p className="mb-6 text-lg leading-relaxed">{section.intro}</p>
          <ul className="space-y-3 border-l-2 border-primary pl-6">
            {section.products.map((slug) => {
              const service = getServiceBySlug(slug)
              const arm = service ? getArmBySlug(service.armSlug) : undefined
              if (!service || !arm) return null
              return (
                <li key={slug}>
                  <Link
                    href={`/services/${arm.slug}/${service.slug}`}
                    className="group block"
                  >
                    <div className="font-heading text-lg text-secondary group-hover:text-primary">
                      {service.name}
                    </div>
                    <div className="text-sm italic text-foreground/70">{arm.nickname}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )

    case "timeline":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">Implementation Timeline</h2>
          <div className="space-y-5">
            {section.phases.map((phase, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 font-heading text-2xl text-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="mb-1 font-heading text-lg text-secondary">{phase.name}</div>
                  <div className="text-foreground/80">{phase.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )

    case "metrics":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">Key Metrics</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {section.stats.map((stat, i) => (
              <div
                key={i}
                className="rounded border-2 border-secondary/20 bg-background p-5 text-center"
              >
                <div className="mb-2 font-heading text-3xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wide text-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )

    case "quote":
      return (
        <section className="rounded border-2 border-secondary/20 bg-secondary/5 p-8">
          <blockquote className="mb-6 text-xl italic leading-relaxed text-foreground">
            &ldquo;{section.body}&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <Image
              src={`/shared/testimonials/${section.photoSlug}.png`}
              alt=""
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <div className="font-heading font-bold text-secondary">{section.attribution}</div>
              <div className="text-xs uppercase tracking-wide text-primary">{section.role}</div>
            </div>
          </div>
        </section>
      )

    case "outcome":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">Outcome</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      )
  }
}
```

- [ ] **Step 2: `npx tsc --noEmit` — PASS**
- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/pages/case-study-page.tsx
git commit -m "feat(gristmill): add CaseStudyPage renderer with composable sections"
```

---

## Task 12: Replace the case studies index page stub

**Files:**
- Modify: `src/sites/gristmill/pages/case-studies-index.tsx`

Replace the Plan 1 stub with a grid of case study cards. Keep the `metadata` export; update its value if needed.

- [ ] **Step 1: Replace the page**

```typescript
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { caseStudies } from "../data/case-studies"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Case Studies — Gristmill Partners",
  description:
    "Selected client engagements from Gristmill Partners' six decades of workforce stabilization work.",
}

export default function CaseStudiesIndexPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Client Engagements"
        subheadline="Gristmill Partners has delivered more than 8,400 engagements since 1962. A selection of eight is documented below."
        image="/sites/gristmill/case-studies-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-lg leading-relaxed">
          Each engagement is presented with the client&apos;s permission, under terms negotiated
          by the firm&apos;s discretion counsel. Figures quoted are drawn from client-approved
          post-engagement reports.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="flex flex-col rounded border-2 border-secondary/30 bg-background p-6 transition hover:border-primary"
            >
              <div className="mb-2 text-xs uppercase tracking-widest text-primary">
                {cs.industry} · {cs.location}
              </div>
              <h2 className="mb-4 font-heading text-xl font-bold text-secondary">
                {cs.company}
              </h2>
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-heading text-3xl font-bold text-accent">
                  {cs.heroStat.value}
                </span>
                <span className="text-xs uppercase tracking-wide text-foreground/70">
                  {cs.heroStat.label}
                </span>
              </div>
              <p className="mb-4 flex-1 text-sm italic text-foreground/80">{cs.headline}</p>
              <p className="text-sm font-semibold text-primary">Read the engagement →</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: `npx tsc --noEmit` — PASS**
- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/pages/case-studies-index.tsx
git commit -m "feat(gristmill): implement full case studies index page"
```

---

## Task 13: Wire the case-studies dynamic route

**Files:**
- Modify: `src/sites/gristmill/index.ts`

Add a second entry to `dynamicRoutes` for `"case-studies"` using the new CaseStudyPage component. The existing `services` dynamic route stays unchanged.

- [ ] **Step 1: Update `src/sites/gristmill/index.ts`**

Add these imports alongside the existing ones:

```typescript
import CaseStudyPage from "./pages/case-study-page"
import { getCaseStudyBySlug } from "./data/case-studies"
```

Update the `dynamicRoutes` export to add a new `"case-studies"` entry after the existing `"services"` entry:

```typescript
"case-studies": {
  component: CaseStudyPage,
  getMetadata: (slug: string) => {
    const cs = getCaseStudyBySlug(slug)
    return cs
      ? {
          title: `${cs.company} — Case Study — Gristmill Partners`,
          description: cs.headline,
        }
      : undefined
  },
  isValidSlug: (slug: string) => !!getCaseStudyBySlug(slug),
},
```

- [ ] **Step 2: `npx tsc --noEmit` — PASS**
- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/index.ts
git commit -m "feat(gristmill): wire case-studies dynamic route"
```

---

## Task 14: Final verification

- [ ] **Step 1: `npx tsc --noEmit`** — PASS
- [ ] **Step 2: `npm run build`** — PASS
- [ ] **Step 3: Smoke test case study routes** against the existing dev server on port 3000:
  - `/case-studies?site=gristmill` — shows 8 case study cards
  - `/case-studies/orphan-crushing-factory?site=gristmill` — full case study page with all six sections
  - 2 additional case study pages picked at random
  - `/case-studies/made-up-slug?site=gristmill` — 404
- [ ] **Step 4: No commit.**

---

## Plan 3 Done When

- [x] 8 case study data files exist, each exporting a named CaseStudy constant.
- [x] Every case study has all six section kinds in the standard order.
- [x] Every `engagement.products` slug resolves to a real Service.
- [x] Every `quote.photoSlug` resolves to an existing file in `public/shared/testimonials/`.
- [x] `case-studies` dynamic route is wired with working `isValidSlug` and `getMetadata`.
- [x] Case studies index page renders a 3-column grid of 8 cards.
- [x] Typecheck, build, and smoke tests pass.
