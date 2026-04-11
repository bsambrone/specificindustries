# Gristmill Partners — Plan 2: Full Content

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill in all remaining content for the Gristmill Partners site after Plan 1 laid the foundation. Write full Service data for the 42 services in the 9 arms outside the Training Arm, update arms metadata to reference all 47 services, build the full Homepage with 10 sections, build the full About page with history timeline / founder's letter / leadership cards, build the full Contact page with a client-side form, and add the leadership and history data files plus the new FounderLetter shared component. By the end, every page except case study pages is fully populated (case studies come in Plan 3).

**Architecture:** Extends the data-driven pattern established in Plan 1. New service entries conform to the existing `Service` interface. New homepage / about / contact page components replace the Plan 1 stubs. Leadership data lives in a new `src/sites/gristmill/data/leadership.ts` file consumed by the About page. History timeline lives in a new `src/sites/gristmill/data/history.ts` file consumed by the About page. One new shared component (`FounderLetter`) lives under `src/components/ui/`.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, existing shared components (Hero, CTABanner, Timeline, TeamMember, FeatureSection, StatStrip / StatCounter, TestimonialGrid).

**Spec:** `docs/superpowers/specs/2026-04-11-gristmill-partners-design.md`

**Preceding plan:** Plan 1 (foundation, commits `5fedb82` through `238bdce`).
**Subsequent plans:**
- Plan 3: 8 case studies, case study page template, case studies index.
- Plan 4: Image generation script, ~80 gristmill images, 12 shared testimonial faces.

## Voice Reference — CRITICAL

Every piece of new prose in this plan must match the deadpan 1970s trade-journal voice locked in for Plan 1's Training Arm services. The reference implementation lives at `src/sites/gristmill/data/services.ts`. Before writing any new prose, the implementer subagent MUST read that file and use the 5 existing services as the style reference.

Key rules:
- Short-to-medium sentences. Older words. Trade-journal vocabulary.
- Never wink. Never joke in the sentence structure. The comedy is 100% in *what* is being described.
- Use phrases like "since the Carter administration," "workforce volatility," "battle-tested," "proven methodology," "certified Gristmill instructor," "engagement partner," "HR of choice," "in triplicate," "compliant with applicable state labor law."
- Executives and shareholders are discussed with reverence. Employees are discussed as a managed population.
- Never describe or reference the user's reaction to the content.

## File Map

### Data files (modify)
- `src/sites/gristmill/data/arms.ts` — update `productSlugs` for the 9 non-training arms
- `src/sites/gristmill/data/services.ts` — append 42 new service entries

### Data files (create)
- `src/sites/gristmill/data/leadership.ts` — 4 fictional executives with portraits, titles, bios
- `src/sites/gristmill/data/history.ts` — 10 timeline milestones for the About page

### Shared components (create)
- `src/components/ui/founder-letter.tsx` — renders a long body of text styled as a typewritten letter

### Site pages (replace stubs with full implementations)
- `src/sites/gristmill/pages/home.tsx` — full 10-section homepage
- `src/sites/gristmill/pages/about.tsx` — full long-scroll About page
- `src/sites/gristmill/pages/contact.tsx` — full Contact page with a client-side form

### Site pages (already complete in Plan 1 — do not modify)
- `src/sites/gristmill/pages/services-index.tsx`
- `src/sites/gristmill/pages/arm-page.tsx`
- `src/sites/gristmill/pages/service-detail.tsx`
- `src/sites/gristmill/pages/service-router.tsx`
- `src/sites/gristmill/pages/privacy.tsx` — the umbrella-policy stub is already correct
- `src/sites/gristmill/pages/terms.tsx` — the umbrella-policy stub is already correct
- `src/sites/gristmill/pages/case-studies-index.tsx` — Plan 3 replaces this

---

## Task 1: Write service data for the Communications Arm (4 services)

**Files:**
- Modify: `src/sites/gristmill/data/services.ts`

**Services to write** (slugs, names, and one-line directions from the spec — the implementer writes the full trade-journal prose for each, matching the Training Arm voice):

| Slug | Name | Direction |
|---|---|---|
| `all-hands-email` | The All-Hands That Could've Been an Email | Monthly two-hour all-hands meeting explicitly announcing "no major updates." Attendance mandatory. Cameras on. Lean into the wasted-time aspect. |
| `strategic-ambiguity-newsletter` | Strategic Ambiguity Newsletter | Weekly company newsletter that clarifies nothing but measurably "increases alignment." Treat alignment as a tracked metric. |
| `buzzword-density-maximizer` | Buzzword Density Maximizer | Automated service that rewrites internal communications to increase synergy per sentence. Position as a compliance tool. |
| `delayed-clarity-initiative` | Delayed Clarity Initiative | Operational program releasing important information only after it is no longer actionable. Frame as a discipline, not an accident. |

**Instructions for each service:**

1. Set `armSlug: "communications"`.
2. `name` exactly as listed in the table.
3. `slug` exactly as listed in the table.
4. `tagline` — one memorable sentence or phrase, shorter than the short description.
5. `shortDescription` — one sentence summary suitable for product cards (under 220 characters).
6. `description` — an array of 2–3 paragraphs. Each paragraph ~2–4 sentences. Trade-journal voice. Include at least one specific fake-factual detail (year, number, location, plural count) per service. Reference other Gristmill services or eras when natural.
7. `deliverables` — array of 4–6 bullet-point strings. Each reads like a line item on a vendor contract.
8. `engagementModel` — one paragraph (3–5 sentences) describing how the service is delivered (on-site / remote / duration / cadence / Gristmill personnel involved).
9. `proofPoints` — array of 3–4 `{ value, label }` objects. Values can be raw numbers, percentages, durations, or absurdities like "∞" or "Zero". Labels are short descriptors, usually ALL CAPS when rendered.
10. `image` — `/sites/gristmill/services/<slug>.png`.

**Steps:**

- [ ] **Step 1: Read the voice reference**

Run: `cat src/sites/gristmill/data/services.ts`
Study all 5 existing Training Arm services as the style reference. Your new services must feel like they were written by the same author.

- [ ] **Step 2: Append the 4 new Communications Arm services**

Append the 4 new `Service` objects to the `services` array in `src/sites/gristmill/data/services.ts`. Insert them after the existing 5 Training Arm services but before the `getServiceBySlug` helper function. Do not modify any existing entries or helpers.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add 4 services for Communications Arm"
```

---

## Task 2: Write service data for the Restructuring Arm (5 services)

**Files:**
- Modify: `src/sites/gristmill/data/services.ts`

| Slug | Name | Direction |
|---|---|---|
| `perpetual-reorganization-protocol` | The Perpetual Reorganization Protocol | Quarterly reorganizations rendering every title meaningless within 90 days. Present as a preventive hygiene practice. |
| `reporting-line-randomizer` | Reporting Line Randomizer | Monthly randomized reassignment of direct reports. Frame as "cross-functional exposure." |
| `seat-migration-program` | The Seat Migration Program | All employees physically relocate desks every six weeks. Frame as spatial awareness and collaboration maximization. |
| `title-inflation-engine` | Title Inflation Engine | Automated system that continually promotes every employee's title without any change in compensation or authority. Every employee is now a "Senior Principal Lead Associate." |
| `org-chart-obfuscation-tool` | Org Chart Obfuscation Tool | Ensures no one — including HR — can determine who reports to whom. Frame as a privacy and autonomy measure. |

**Steps:**

- [ ] **Step 1: Append the 5 new Restructuring Arm services** following the same shape rules as Task 1. Insert after the Communications Arm services.

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add 5 services for Restructuring Arm"
```

---

## Task 3: Write service data for the Retention Arm (6 services)

**Files:**
- Modify: `src/sites/gristmill/data/services.ts`

| Slug | Name | Direction |
|---|---|---|
| `ambient-layoff-rumor-service` | The Ambient Layoff Rumor Service | Strategically leaked anonymous Slack messages during record-profit quarters. Retention through managed uncertainty. |
| `peer-benchmarking-reports` | Peer Benchmarking Reports | Monthly reports comparing your workforce output against The Orphan Crushing Factory, Dickensian Dynamics, and Helix-Fane Shareholder Services. |
| `gratitude-audits` | Compliance-Grade Gratitude Audits | Surprise 1:1 interviews verifying employee thankfulness on a 1–10 scale. Trackable, defensible, auditable. |
| `pride-in-your-station-seminar` | Pride in Your Station Seminar Series | Lunchtime talks on the nobility of accepting one's lot in life. Quarterly series. |
| `calendar-placeholder-events` | Calendar Placeholder Events | Random "1:1 — Important" meetings on calendars with no agenda, no organizer, and no explanation. Designed to generate ambient dread. |
| `executive-walk-by-program` | Executive Walk-By Program | Trained program of silent executive observation. Leadership walks past employees without acknowledgment or comment. |

**Steps:**

- [ ] **Step 1: Append the 6 new Retention Arm services.**

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add 6 services for Retention Arm"
```

---

## Task 4: Write service data for the Performance Arm (4 services)

**Files:**
- Modify: `src/sites/gristmill/data/services.ts`

| Slug | Name | Direction |
|---|---|---|
| `360-feedback-closed-loop` | 360° Feedback Loop (Closed System) | Feedback circulates between employees indefinitely. No conclusions reached. Positioned as a continuous improvement methodology. |
| `goalpost-mobility-framework` | Goalpost Mobility Framework | Targets dynamically adjust upward based on proximity to achievement. Algorithmic. |
| `literal-stretch-goals` | Stretch Goals (Literal Edition) | Objectives mathematically impossible within the known laws of time. Not exaggeration — actually impossible. |
| `underperformance-discovery-engine` | Underperformance Discovery Engine | Identifies high performers and recalibrates expectations upward until they are underperforming. |

**Steps:**

- [ ] **Step 1: Append the 4 new Performance Arm services.**

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add 4 services for Performance Arm"
```

---

## Task 5: Write service data for the Management Arm (4 services)

**Files:**
- Modify: `src/sites/gristmill/data/services.ts`

| Slug | Name | Direction |
|---|---|---|
| `escalation-buffer-training` | Manager Escalation Buffer Training | Manager training in absorbing subordinate complaints and converting them into inaction. |
| `calendar-saturation-protocol` | Calendar Saturation Protocol | Ensures 92% of manager time is spent in meetings about other meetings. Automated scheduling. |
| `delegation-without-authority` | Delegation Without Authority Certification | Certification program teaching managers to assign responsibility without any decision-making power. |
| `take-this-offline-toolkit` | The "Let's Take This Offline" Toolkit | Advanced techniques for permanently killing conversations in real time. |

**Steps:**

- [ ] **Step 1: Append the 4 new Management Arm services.**

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add 4 services for Management Arm"
```

---

## Task 6: Write service data for the Compensation Arm (5 services)

**Files:**
- Modify: `src/sites/gristmill/data/services.ts`

| Slug | Name | Direction |
|---|---|---|
| `shareholder-empathy-curriculum` | The Shareholder Empathy Curriculum | Training that walks employees through the true cost of a superyacht's barnacle removal. Foundational moral education. |
| `raise-deflection-workshop` | Raise Deflection Role-Play Workshop | Manager training for redirecting compensation conversations into "growth opportunities." Role-play based. |
| `hedonic-treadmill-benefits` | The Hedonic Treadmill Benefits Package | Benefits that technically exist but require submitting Form 47-B in triplicate to an office that closed in 1994. |
| `market-adjustment-explanation-portal` | Market Adjustment Explanation Portal | Self-service portal explaining why prevailing market rates do not apply at your company. Fully automated. |
| `equity-vesting-mirage` | Equity Vesting Mirage | Stock grants that vest emotionally but not financially. Documentation provided. |

**Steps:**

- [ ] **Step 1: Append the 5 new Compensation Arm services.**

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add 5 services for Compensation Arm"
```

---

## Task 7: Write service data for the Engagement Arm (4 services)

**Files:**
- Modify: `src/sites/gristmill/data/services.ts`

| Slug | Name | Direction |
|---|---|---|
| `mandatory-fun-week` | Mandatory Fun Week | One full week of enforced recreational activities. Participation tracked and factored into performance reviews. |
| `corporate-trivia-career-impacting` | Corporate Trivia Night (Career-Impacting) | Trivia nights where wrong answers are logged permanently in the HR system. |
| `icebreaker-generator` | Icebreaker Question Generator | Automated service that produces workplace icebreaker questions such as "If you were a spreadsheet function, which would you be and why?" |
| `smile-compliance-monitoring` | Smile Compliance Monitoring | Optional camera-based enthusiasm tracking. Soft targets. |

**Steps:**

- [ ] **Step 1: Append the 4 new Engagement Arm services.**

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add 4 services for Engagement Arm"
```

---

## Task 8: Write service data for the Tooling Arm (4 services)

**Files:**
- Modify: `src/sites/gristmill/data/services.ts`

| Slug | Name | Direction |
|---|---|---|
| `sso-multi-failure` | Single Sign-On (Multi-Failure Edition) | One login, many ways it does not work. |
| `vpn-latency-enhancement` | VPN Latency Enhancement Suite | Ensures every task feels geographically distant. Engineered latency. |
| `ticket-routing-labyrinth` | Ticket Routing Labyrinth | Support tickets loop between departments indefinitely. Designed for maximum friction. |
| `auto-update-critical-work` | Auto-Update During Critical Work | System updates triggered exclusively at peak productivity moments. |

**Steps:**

- [ ] **Step 1: Append the 4 new Tooling Arm services.**

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add 4 services for Tooling Arm"
```

---

## Task 9: Write service data for the Workspace Arm (6 services)

**Files:**
- Modify: `src/sites/gristmill/data/services.ts`

| Slug | Name | Direction |
|---|---|---|
| `standing-desk-mandate` | The Standing Desk Mandate | All chairs removed. Marketed under wellness. |
| `break-room-decommissioning` | Break Room Decommissioning Consulting | Closes break rooms and reclassifies them as "collaboration zones with no furniture." |
| `open-office-acoustics` | Open Office Acoustic Amplification | Engineered acoustic treatment that makes sound travel better than physics allows. |
| `hot-desk-hunger-games` | Hot Desk Hunger Games | First-come first-served seating with strategic scarcity. Intentional shortage. |
| `temperature-variance-initiative` | Temperature Variance Initiative | Simultaneously too hot and too cold depending on location. Calibrated discomfort. |
| `lighting-inconsistency-program` | The Lighting Inconsistency Program | Flicker-based productivity challenges. Deliberate intermittent fluorescent failure. |

**Steps:**

- [ ] **Step 1: Append the 6 new Workspace Arm services.**

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS. The `services` array should now have exactly 47 entries (5 from Plan 1 + 42 from Plan 2).**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add 6 services for Workspace Arm"
```

---

## Task 10: Update arms metadata to reference all 47 services

**Files:**
- Modify: `src/sites/gristmill/data/arms.ts`

Populate the `productSlugs` arrays for the 9 arms outside Training (which is already populated). The order within each arm's `productSlugs` array should match the order the services were written in Tasks 1–9 above.

- [ ] **Step 1: Update each arm's productSlugs**

For each of the 9 arms, replace the current empty `productSlugs: []` with the list of service slugs for that arm. Reference list:

```typescript
// communications:
productSlugs: [
  "all-hands-email",
  "strategic-ambiguity-newsletter",
  "buzzword-density-maximizer",
  "delayed-clarity-initiative",
],

// restructuring:
productSlugs: [
  "perpetual-reorganization-protocol",
  "reporting-line-randomizer",
  "seat-migration-program",
  "title-inflation-engine",
  "org-chart-obfuscation-tool",
],

// retention:
productSlugs: [
  "ambient-layoff-rumor-service",
  "peer-benchmarking-reports",
  "gratitude-audits",
  "pride-in-your-station-seminar",
  "calendar-placeholder-events",
  "executive-walk-by-program",
],

// performance:
productSlugs: [
  "360-feedback-closed-loop",
  "goalpost-mobility-framework",
  "literal-stretch-goals",
  "underperformance-discovery-engine",
],

// management:
productSlugs: [
  "escalation-buffer-training",
  "calendar-saturation-protocol",
  "delegation-without-authority",
  "take-this-offline-toolkit",
],

// compensation:
productSlugs: [
  "shareholder-empathy-curriculum",
  "raise-deflection-workshop",
  "hedonic-treadmill-benefits",
  "market-adjustment-explanation-portal",
  "equity-vesting-mirage",
],

// engagement:
productSlugs: [
  "mandatory-fun-week",
  "corporate-trivia-career-impacting",
  "icebreaker-generator",
  "smile-compliance-monitoring",
],

// tooling:
productSlugs: [
  "sso-multi-failure",
  "vpn-latency-enhancement",
  "ticket-routing-labyrinth",
  "auto-update-critical-work",
],

// workspace:
productSlugs: [
  "standing-desk-mandate",
  "break-room-decommissioning",
  "open-office-acoustics",
  "hot-desk-hunger-games",
  "temperature-variance-initiative",
  "lighting-inconsistency-program",
],
```

Do not touch the Training Arm's productSlugs or any other arm metadata.

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/arms.ts
git commit -m "feat(gristmill): wire all 47 service slugs to their arms"
```

---

## Task 11: Create leadership data file

**Files:**
- Create: `src/sites/gristmill/data/leadership.ts`

Create the file exactly as specified below. These four fictional executives are used by the About page leadership section. Real names (Bill, Brandon, Jim, Sean) must NEVER appear anywhere in this data — only the fake names.

- [ ] **Step 1: Write the file**

```typescript
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  credential: string
  image: string
}

export const executives: Executive[] = [
  {
    slug: "earl-crendon",
    name: "Earl J. Crendon",
    title: "Founder & Chairman Emeritus",
    bio:
      "Earl founded Gristmill Partners in 1962 in a converted grain mill in Youngstown, Ohio, after resigning from a regional steel concern that no longer exists. He continues to occupy the founder's office and, to all available evidence, has never taken a vacation. Earl believes the American worker has been in decline since the Eisenhower administration.",
    credential:
      "Served as a mid-level manager at the Ohio Valley Steel & Coke Company from 1948 to 1962. No subsequent employers.",
    image: "/sites/gristmill/execs/earl-crendon.png",
  },
  {
    slug: "theodore-brenner",
    name: "Theodore \"Ted\" Brenner",
    title: "President & Chief Executive Officer",
    bio:
      "Ted runs Gristmill day-to-day. He joined the firm in 1989 as an associate and has never worked anywhere else. He holds an MBA from a school that no longer exists. Ted is widely considered the steadying hand of the firm, though he has never personally stabilized anything.",
    credential:
      "MBA, Whitmore Graduate School of Commerce (1988, institution dissolved 1994).",
    image: "/sites/gristmill/execs/theodore-brenner.png",
  },
  {
    slug: "harold-duvane",
    name: "Harold \"Hal\" Duvane",
    title: "Chief Operating Officer & Vice President, Workforce Engineering",
    bio:
      "Hal runs field operations. He has personally authored 41 Gristmill-licensed employee handbooks, three of which remain legally enforceable. Internally, Hal is known as \"the Hammer\" — a nickname that predates his tenure at the firm and which nobody has ever clarified.",
    credential:
      "41 authored handbooks. 3 currently enforceable. The nickname has never been explained.",
    image: "/sites/gristmill/execs/harold-duvane.png",
  },
  {
    slug: "lester-knippenburg",
    name: "Lester \"Les\" Knippenburg",
    title: "Chief Financial Officer & Vice President, Compensation Stabilization",
    bio:
      "Les oversees client billing and the firm's flagship Compensation Suppression practice. Over his thirty-four years with Gristmill, he has personally denied more than twelve thousand raise requests. He collects antique stopwatches and is the only executive who still uses a physical ledger.",
    credential:
      "12,000+ raise requests personally denied. Maintains the firm's primary ledger in longhand.",
    image: "/sites/gristmill/execs/lester-knippenburg.png",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((exec) => exec.slug === slug)
}
```

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/leadership.ts
git commit -m "feat(gristmill): add leadership data with 4 fictional executives"
```

---

## Task 12: Create history data file

**Files:**
- Create: `src/sites/gristmill/data/history.ts`

- [ ] **Step 1: Write the file**

```typescript
export interface HistoryMilestone {
  year: string
  body: string
}

export const history: HistoryMilestone[] = [
  {
    year: "1962",
    body:
      "Earl J. Crendon founds Gristmill Partners in a converted grain mill in Youngstown, Ohio. First engagement: a 40-page internal memo.",
  },
  {
    year: "1968",
    body:
      "Gristmill launches The 247-Slide Deck. First deployment takes place at a regional utility in central Pennsylvania.",
  },
  {
    year: "1974",
    body: "Gristmill opens its Pittsburgh regional office.",
  },
  {
    year: "1981",
    body:
      "In response to the Reagan administration, Gristmill develops the Perpetual Reorganization Protocol. Early adoption strong across the Rust Belt.",
  },
  {
    year: "1989",
    body:
      "Gristmill opens its Stamford executive office. Theodore Brenner joins as an associate.",
  },
  {
    year: "1993",
    body:
      "Buzzword Density Maximizer is pioneered at a Cincinnati aluminum plant. Adoption spreads industry-wide within 18 months.",
  },
  {
    year: "2001",
    body:
      "Gristmill rebrands the term \"layoffs\" as \"strategic realignments.\" The rebrand remains in industry-wide use.",
  },
  {
    year: "2008",
    body:
      "Gristmill reports record growth during the financial crisis. New engagements rise 34% year-over-year.",
  },
  {
    year: "2020",
    body:
      "Gristmill releases a Remote Work Suppression Suite. The product is cancelled after one quarter for reasons the firm does not discuss.",
  },
  {
    year: "2026",
    body:
      "Earl J. Crendon celebrates his sixty-fourth year in the founder's chair. Gristmill continues to serve 400+ Fortune 500 and privately held clients.",
  },
]
```

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/history.ts
git commit -m "feat(gristmill): add history timeline milestones"
```

---

## Task 13: Create FounderLetter shared component

**Files:**
- Create: `src/components/ui/founder-letter.tsx`

The component renders a long body of text styled as a scanned typewritten letter. Used on the Gristmill About page. Theme-aware — uses the primary/secondary/background/foreground CSS variables so it works on any site that chooses to use it.

- [ ] **Step 1: Write the component**

```typescript
interface FounderLetterProps {
  recipient?: string
  body: string[]
  signatureName: string
  signatureTitle: string
}

export function FounderLetter({
  recipient,
  body,
  signatureName,
  signatureTitle,
}: FounderLetterProps) {
  return (
    <div className="relative mx-auto max-w-3xl rounded border-2 border-secondary/30 bg-background px-8 py-12 shadow-lg md:px-16 md:py-16">
      <div className="pointer-events-none absolute inset-0 rounded opacity-[0.04] mix-blend-multiply [background-image:repeating-linear-gradient(0deg,transparent_0,transparent_23px,var(--color-text)_23px,var(--color-text)_24px)]" />
      <div className="relative">
        {recipient && (
          <p className="mb-8 font-heading text-sm uppercase tracking-widest text-secondary">
            {recipient}
          </p>
        )}
        <div className="space-y-5 text-lg leading-relaxed text-foreground">
          {body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 border-t border-secondary/20 pt-6">
          <p className="font-heading text-2xl italic text-secondary">{signatureName}</p>
          <p className="mt-1 text-sm text-foreground/70">{signatureTitle}</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/founder-letter.tsx
git commit -m "feat(components): add FounderLetter shared component"
```

---

## Task 14: Replace the homepage stub with the full 10-section homepage

**Files:**
- Modify: `src/sites/gristmill/pages/home.tsx`

Replace the existing Plan 1 stub entirely. The new page is a single long-scroll component using the shared `Hero` and `CTABanner` (named imports), plus inline sections with theme utility classes.

Section requirements (in order):

1. **Hero** (`Hero` component) — headline `"Helping American Industry Grind Employees Into Dust Since 1962."`, subheadline about workforce stabilization, image `/sites/gristmill/home-hero.png`, `ctaText="Request an Engagement"`, `ctaHref="/contact"`, `secondaryCtaText="View Our Service Lines"`, `secondaryCtaHref="/services"`.
2. **Mission paragraph band** — single dense paragraph of trade-journal prose about what Gristmill does. Styled with a wide max-width, cream background, dark text, generous line-height. Use a larger initial character (drop cap) via CSS if possible (`first-letter:text-5xl first-letter:float-left first-letter:font-heading first-letter:pr-3 first-letter:pt-1 first-letter:text-primary`).
3. **By the Numbers** — 4-stat band on a dark umber (`bg-secondary`) background with amber stat numbers. Stats: `64 Years in Business`, `8,400+ Engagements Delivered`, `$2.3B in Wage Growth Prevented`, `92% Retention via Learned Helplessness`. Each stat is a large `font-heading` number in `text-accent` with an uppercase label below in cream (`text-background/80`).
4. **The Ten Arms** — 10-card grid (responsive: 2 cols on tablet, 5 cols on large desktop, 1 col on mobile). Each card shows the arm's nickname in small caps, the arm name in `font-heading`, the arm tagline, and links to `/services/[arm]`. Map over the imported `arms` array.
5. **Our Approach** — 3-column feature strip. Columns: "Proven Methodology" / "Measurable Disengagement" / "Discreet Implementation". Each has one short paragraph of trade-journal prose.
6. **Featured Case Study** — single wide card. Fake client: **The Orphan Crushing Factory**. Industry tag: "Heavy Manufacturing". One-line outcome: "Reduced voluntary turnover by 94%. The remaining 6% could not afford to leave." Link reads "Read the full engagement →" and points to `/case-studies/orphan-crushing-factory`. (The case study target page is built in Plan 3; the link is valid either way.)
7. **Trusted by Industry Leaders** — grayscale text strip with 8 fake client names separated by thin dividers (rendered as plain text, not images): *The Orphan Crushing Factory · Dickensian Dynamics · Rustbelt Holdings LLC · Meridian Coal & Data · Throckmorton Industrial Group · Helix-Fane Shareholder Services · Grassmere Acoustics · Pemberton-Shale Refining*.
8. **Testimonials** — 3-card row of client **executive** quotes (never an employee). Each card has a quote body, attribution name, attribution title, attribution company, and a photo pulled from `/shared/testimonials/` using one of the existing 16 faces (pick three: `asher-bloom.png`, `chad-gullet.png`, `patricia-hollowell.png`). Quote voice: a CFO or COO who has just seen a good bonus line item. Three separate testimonials, each 2–3 sentences.
9. **Founder's Letter Teaser** — small two-column section. Left: a placeholder circular image slot at `/sites/gristmill/execs/earl-crendon.png` with caption "Earl J. Crendon, Founder". Right: one short paragraph of letter prose, then a "Continue Reading the Letter →" link pointing to `/about#founders-letter`.
10. **Closing CTA** (`CTABanner` component) — headline `"Ready to Reduce Workforce Volatility?"`, description about "three to five business quarters", ctaText `"Request an Engagement"`, ctaHref `/contact`.

All prose in sections 2, 5, 6, 8, 9 must be written fresh, in the trade-journal voice, and must not exceed one paragraph per section where applicable.

- [ ] **Step 1: Read the voice reference**

Run: `cat src/sites/gristmill/data/services.ts` (read existing Training Arm services as the voice reference).

- [ ] **Step 2: Write the new home.tsx replacing the existing stub**

The file's default export remains `GristmillHome` but its body expands from the stub to the full 10-section layout described above. Imports:

```typescript
import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { arms } from "../data/arms"
```

Use the `Image` component from `next/image` for testimonial photos and the founder portrait. Apply theme utility classes (`bg-background`, `bg-secondary`, `text-primary`, `text-accent`, `text-foreground`, `font-heading`) throughout. No hardcoded colors. No inline styles. Do not use the `eyebrow` prop on Hero (doesn't exist).

- [ ] **Step 3: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 4: Commit**

```bash
git add src/sites/gristmill/pages/home.tsx
git commit -m "feat(gristmill): implement full homepage with 10 sections"
```

---

## Task 15: Replace the About page stub with the full long-scroll About page

**Files:**
- Modify: `src/sites/gristmill/pages/about.tsx`

Replace the Plan 1 stub. The full About page has 7 sections — see the spec at `docs/superpowers/specs/2026-04-11-gristmill-partners-design.md` under "About Page (`/about`)".

Sections (in order):

1. **Hero** — headline `"Sixty-Four Years of Workforce Stabilization"`, subheadline `"Privately held. Family-operated. Deeply resistant to change since 1962."`, image `/sites/gristmill/about-hero.png`.
2. **Our Story** — one long paragraph of trade-journal prose about the 1962 founding in Youngstown. Covers Earl Crendon's prior role at a regional steel concern, the founding thesis ("the American worker had become insufficiently afraid"), and the firm's self-conception as a caretaker of the Fortune 500's discipline budget.
3. **Our History** — vertical timeline rendered by mapping over `history` from `src/sites/gristmill/data/history.ts`. The visual treatment: alternating-side or single-side vertical timeline. Each entry shows the `year` as a large amber slab-serif heading and the `body` as prose. Add an `id="founders-letter"` on this section's container so the homepage founder's letter link anchors correctly.

   Note: the `id="founders-letter"` actually belongs on **section 4 (Letter from the Founder)**, not section 3. Place the id on section 4's container so the homepage teaser link lands on the letter itself.

4. **A Letter from the Founder** — container with `id="founders-letter"`. Renders the `FounderLetter` component (Task 13) with:
   - `recipient`: `"To Our Clients and Friends of the Firm"`
   - `body`: array of 4–5 paragraphs written in Earl's voice — references his father, the 1962 founding, concerns about "softening," gratitude toward shareholders, a paragraph about watching sunsets from the founder's office in the converted mill. Roughly 400 words total.
   - `signatureName`: `"Earl J. Crendon"`
   - `signatureTitle`: `"Founder & Chairman Emeritus"`
5. **Leadership** — 4-card grid rendered by mapping over `executives` from `src/sites/gristmill/data/leadership.ts`. Each card shows the exec's photo, name, title, bio, and credential. Use `next/image` for the photo. Layout: 2 columns on tablet, 4 on desktop.
6. **Our Values** — 4-column strip of values: **Discretion**, **Patience**, **Measurable Attenuation**, **Gratitude**. Each has a short paragraph (1–2 sentences) of trade-journal prose.
7. **Corporate Citizenship** — one paragraph about Gristmill's charitable giving. Should reference "seventeen rural vocational training centers dedicated to teaching the dignity of repetitive labor." Follow with a small text strip of 4–6 fake nonprofit names separated by dividers.

- [ ] **Step 1: Replace the existing `about.tsx`.** Imports:

```typescript
import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { FounderLetter } from "@/components/ui/founder-letter"
import { history } from "../data/history"
import { executives } from "../data/leadership"
import type { PageMetadata } from "@/themes"
```

Keep the existing `metadata` export unchanged. Replace the default export body.

- [ ] **Step 2: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/pages/about.tsx
git commit -m "feat(gristmill): implement full About page with history, founder letter, leadership"
```

---

## Task 16: Replace the Contact page stub with the full Contact page

**Files:**
- Modify: `src/sites/gristmill/pages/contact.tsx`

Replace the Plan 1 stub. The full Contact page has four sections:

1. **Hero** — headline `"Begin an Engagement"`, subheadline `"A member of our Workforce Stabilization Team will contact you within three to five business quarters."`, image `/sites/gristmill/contact-hero.png`.

2. **Engagement Request Form** — a client-side form component. Because this needs state, the form portion is a `"use client"` component. Create an inline client component at the top of `contact.tsx` or extract it to `src/sites/gristmill/pages/contact-form.tsx` — either is acceptable, the extracted version is cleaner.

   **Form fields:**
   - Company Name (text input, required, ~placeholder="Company Name")
   - Number of Employees (select, required). Options:
     - `"100–500"`
     - `"500–1,000"`
     - `"1,000–5,000"`
     - `"5,000+"`
     - `"More than I care to count"`
   - Primary Workforce Concern (select, required). Options:
     - `"Excessive Morale"`
     - `"Raise Requests"`
     - `"Union Activity"`
     - `"General Restlessness"`
     - `"Unauthorized Smiling"`
     - `"Other"`
   - Message (textarea, required, 4 rows)
   - Submit button: `"Submit for Review"` in burnt-orange with cream text.

   **Submit behavior:** On submit, `event.preventDefault()`, then swap the form for a confirmation card that reads:
   > "Thank you. Your inquiry has been logged in case #04781-B. A member of the Gristmill team will be in touch within three to five business quarters. Please do not contact us in the interim."

3. **Our Offices** — 3-column band, each column a fake office:
   - **Founding Office** — Youngstown, Ohio — 1 Gristmill Way, Youngstown OH 44503 — "In continuous operation since 1962."
   - **Regional Office** — Pittsburgh, Pennsylvania — 247 Slag Street, Pittsburgh PA 15219 — "Opened 1974."
   - **Executive Office** — Stamford, Connecticut — 1600 Ledger Lane, Stamford CT 06902 — "Opened 1989."
   
   Below the 3-column block, a single centered line: **"Switchboard: 1-800-GRISTMILL"**.

4. **Founder's Office small-print band** — one small gray paragraph at the bottom of the page that reads exactly:
   > "Direct inquiries to the founder may be addressed to bsambrone@gmail.com."
   
   This is the portfolio-standard real email. It MUST be present.

- [ ] **Step 1: Extract the form to `contact-form.tsx` as a client component**

Create `src/sites/gristmill/pages/contact-form.tsx`:

```typescript
"use client"

import { useState, FormEvent } from "react"

const EMPLOYEE_OPTIONS = [
  "100–500",
  "500–1,000",
  "1,000–5,000",
  "5,000+",
  "More than I care to count",
]

const CONCERN_OPTIONS = [
  "Excessive Morale",
  "Raise Requests",
  "Union Activity",
  "General Restlessness",
  "Unauthorized Smiling",
  "Other",
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded border-2 border-primary bg-secondary/5 p-8 text-center">
        <p className="text-lg leading-relaxed">
          Thank you. Your inquiry has been logged in case #04781-B. A member of the Gristmill
          team will be in touch within three to five business quarters. Please do not contact
          us in the interim.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-heading font-bold uppercase tracking-wide text-secondary">
          Company Name
        </label>
        <input
          type="text"
          required
          className="w-full rounded border-2 border-secondary/30 bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-heading font-bold uppercase tracking-wide text-secondary">
          Number of Employees
        </label>
        <select
          required
          className="w-full rounded border-2 border-secondary/30 bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select a range
          </option>
          {EMPLOYEE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-heading font-bold uppercase tracking-wide text-secondary">
          Primary Workforce Concern
        </label>
        <select
          required
          className="w-full rounded border-2 border-secondary/30 bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select a concern
          </option>
          {CONCERN_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-heading font-bold uppercase tracking-wide text-secondary">
          Message
        </label>
        <textarea
          required
          rows={4}
          className="w-full rounded border-2 border-secondary/30 bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-primary px-8 py-3 font-heading font-bold uppercase tracking-wide text-background transition hover:opacity-90"
      >
        Submit for Review
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Rewrite `contact.tsx` to use the form component**

```typescript
import { Hero } from "@/components/ui/hero"
import type { PageMetadata } from "@/themes"
import { ContactForm } from "./contact-form"

export const metadata: PageMetadata = {
  title: "Contact — Gristmill Partners",
  description:
    "Begin an engagement with Gristmill Partners. A member of our Workforce Stabilization Team will contact you within three to five business quarters.",
}

interface Office {
  title: string
  city: string
  address: string
  note: string
}

const offices: Office[] = [
  {
    title: "Founding Office",
    city: "Youngstown, Ohio",
    address: "1 Gristmill Way, Youngstown OH 44503",
    note: "In continuous operation since 1962.",
  },
  {
    title: "Regional Office",
    city: "Pittsburgh, Pennsylvania",
    address: "247 Slag Street, Pittsburgh PA 15219",
    note: "Opened 1974.",
  },
  {
    title: "Executive Office",
    city: "Stamford, Connecticut",
    address: "1600 Ledger Lane, Stamford CT 06902",
    note: "Opened 1989.",
  },
]

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Begin an Engagement"
        subheadline="A member of our Workforce Stabilization Team will contact you within three to five business quarters."
        image="/sites/gristmill/contact-hero.png"
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <ContactForm />
      </section>

      <section className="border-t-2 border-secondary/20 bg-secondary/5 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-2xl font-heading font-bold text-secondary">
            Our Offices
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {offices.map((office) => (
              <div
                key={office.title}
                className="rounded border-2 border-secondary/20 bg-background p-6 text-center"
              >
                <div className="mb-2 text-xs uppercase tracking-widest text-primary">
                  {office.title}
                </div>
                <h3 className="mb-3 text-lg font-heading font-bold text-secondary">
                  {office.city}
                </h3>
                <p className="mb-3 text-sm">{office.address}</p>
                <p className="text-xs italic text-foreground/70">{office.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center font-heading text-lg text-secondary">
            Switchboard: 1-800-GRISTMILL
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-center text-xs text-foreground/60">
          Direct inquiries to the founder may be addressed to bsambrone@gmail.com.
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Run `npx tsc --noEmit` — PASS.**

- [ ] **Step 4: Commit**

```bash
git add src/sites/gristmill/pages/contact.tsx src/sites/gristmill/pages/contact-form.tsx
git commit -m "feat(gristmill): implement full Contact page with client-side form"
```

---

## Task 17: Final verification

**Files:** None (verification).

- [ ] **Step 1: Run `npx tsc --noEmit`** — expect PASS.
- [ ] **Step 2: Run `npm run build`** — expect PASS. Watch for any runtime errors in gristmill files.
- [ ] **Step 3: Smoke test key routes** via the existing dev server on port 3000 (if running):
  - `/?site=gristmill` — expect the full 10-section homepage
  - `/about?site=gristmill` — expect the full About page with timeline, letter, and 4 exec cards
  - `/contact?site=gristmill` — expect the full form, 3 offices, and the real email in small print
  - `/services/compensation?site=gristmill` — expect a populated arm page with 5 service cards
  - `/services/workspace?site=gristmill` — expect a populated arm page with 6 service cards
  - `/services/tooling/vpn-latency-enhancement?site=gristmill` — expect a service detail page with deliverables, engagement model, and proof points
- [ ] **Step 4: No commit.**

---

## Plan 2 Done When

- [x] All 17 tasks completed in order.
- [x] `src/sites/gristmill/data/services.ts` has exactly 47 service entries.
- [x] Every arm in `arms.ts` has a non-empty `productSlugs` array matching its services.
- [x] Homepage, About, and Contact pages are full implementations — no Plan 1 stubs remain for those three.
- [x] Leadership and history data files exist and are consumed by the About page.
- [x] FounderLetter shared component exists and is used by the About page.
- [x] Typecheck and build pass.
- [x] Ready to hand off to Plan 3 (case studies).
