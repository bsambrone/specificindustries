# Gristmill Partners — Plan 1: Foundation & Training Arm Proof of Concept

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the gristmill site scaffold end-to-end. Register gristmill in the site registry, add Zilla Slab font, define ServiceArm and Service data types, write metadata for all 10 service arms, write full data for the 5 services in the Training Arm, build the reusable ArmPage / ServiceDetailPage / ServiceRouter / services index templates, stub the remaining unique pages (home, about, contact, privacy, terms, case studies index), and verify the site loads and you can navigate `/services/training` and `/services/training/247-slide-deck`.

**Architecture:** Data-driven page templates following strategicvoid's proven pattern. `ServiceRouter` dispatches on `segments.length` between arm landing pages and service detail pages. All UI is theme-driven via CSS variables. Training Arm is fully populated as a proof of concept; the remaining 9 arms exist in metadata only and will be filled in Plan 2.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, existing shared components (Hero, FeatureSection, MegaMenu, Timeline, TeamMember, SolutionCard, CTABanner), `next/font/google`.

**Spec:** `docs/superpowers/specs/2026-04-11-gristmill-partners-design.md`

**Subsequent plans:**
- Plan 2: Full content — 9 remaining arms (42 services), homepage, about, contact, privacy, terms.
- Plan 3: Case studies — 8 case study data files, case study page template, case studies index.
- Plan 4: Images — `generate-gristmill-images.ts`, 4 exec portraits, ~80 gristmill images, 12 new shared testimonial faces.

---

## File Map

### Shared infrastructure (modify)

- `src/themes/fonts.ts` — Add Zilla Slab `next/font/google` declaration to heading fonts
- `src/sites/registry.ts` — Register gristmill site module

### Site files (create)

- `src/sites/gristmill/config.ts` — SiteConfig with theme, metadata, nav, megaMenu (all 10 arms)
- `src/sites/gristmill/index.ts` — Barrel exporting config, pages, dynamicRoutes
- `src/sites/gristmill/data/types.ts` — ServiceArm and Service TypeScript interfaces
- `src/sites/gristmill/data/arms.ts` — 10 ServiceArm entries (metadata only)
- `src/sites/gristmill/data/services.ts` — Training Arm's 5 services fully populated
- `src/sites/gristmill/pages/arm-page.tsx` — Arm landing page template (data-driven)
- `src/sites/gristmill/pages/service-detail.tsx` — Service detail page template (data-driven)
- `src/sites/gristmill/pages/service-router.tsx` — Dispatches between ArmPage and ServiceDetailPage
- `src/sites/gristmill/pages/services-index.tsx` — Services index page listing all 10 arms
- `src/sites/gristmill/pages/home.tsx` — Home page stub (filled in Plan 2)
- `src/sites/gristmill/pages/about.tsx` — About page stub (filled in Plan 2)
- `src/sites/gristmill/pages/contact.tsx` — Contact page stub (filled in Plan 2)
- `src/sites/gristmill/pages/privacy.tsx` — Privacy page stub (filled in Plan 2)
- `src/sites/gristmill/pages/terms.tsx` — Terms page stub (filled in Plan 2)
- `src/sites/gristmill/pages/case-studies-index.tsx` — Case studies index stub (filled in Plan 3)

---

## Task 1: Add Zilla Slab font

**Files:**
- Modify: `src/themes/fonts.ts`

- [ ] **Step 1: Add the Zilla Slab import and instance declaration**

At the top of `src/themes/fonts.ts`, add `Zilla_Slab` to the `next/font/google` imports:

```typescript
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed, Fraunces, Nunito, Bowlby_One_SC, Zilla_Slab } from "next/font/google"
```

After the existing `bowlbyOneSC` declaration (~line 41), add:

```typescript
export const zillaSlab = Zilla_Slab({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-zilla-slab",
})
```

- [ ] **Step 2: Register Zilla Slab in the instance map**

In the `fontInstanceMap` object (around line 48), add the `"zilla-slab"` entry:

```typescript
const fontInstanceMap: Record<string, { variable: string }> = {
  inter,
  playfair: playfairDisplay,
  "space-grotesk": spaceGrotesk,
  poppins,
  "barlow-condensed": barlowCondensed,
  fraunces,
  nunito,
  "bowlby-one-sc": bowlbyOneSC,
  "zilla-slab": zillaSlab,
}
```

- [ ] **Step 3: Register Zilla Slab in the font family map**

In the `fontFamilyMap` object (around line 69), add:

```typescript
export const fontFamilyMap: Record<string, string> = {
  inter: "'Inter', sans-serif",
  playfair: "'Playfair Display', serif",
  "space-grotesk": "'Space Grotesk', sans-serif",
  poppins: "'Poppins', sans-serif",
  "barlow-condensed": "'Barlow Condensed', sans-serif",
  fraunces: "'Fraunces', serif",
  nunito: "'Nunito', sans-serif",
  "bowlby-one-sc": "'Bowlby One SC', sans-serif",
  "zilla-slab": "'Zilla Slab', serif",
}
```

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/themes/fonts.ts
git commit -m "feat(fonts): add Zilla Slab for gristmill headings"
```

---

## Task 2: Create gristmill site config

**Files:**
- Create: `src/sites/gristmill/config.ts`

- [ ] **Step 1: Create the directory**

Run: `mkdir -p src/sites/gristmill/data src/sites/gristmill/pages`
Expected: directories created (no output).

- [ ] **Step 2: Write the config file**

Create `src/sites/gristmill/config.ts` with the full site config including theme, metadata, nav, and a mega menu covering all 10 arms:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Gristmill Partners",
  subdomain: "gristmill",
  theme: {
    preset: "industrial",
    colors: {
      primary: "#c4622d",
      secondary: "#6b3d1f",
      accent: "#d4a147",
      background: "#f4ead5",
      text: "#2b1e10",
    },
    fonts: {
      heading: "zilla-slab",
      body: "fraunces",
    },
  },
  metadata: {
    title: "Gristmill Partners — Helping American Industry Grind Employees Into Dust Since 1962",
    description:
      "Gristmill Partners is the trusted name in workforce stabilization, retention engineering, and compensation dampening for the Fortune 500. Privately held since 1962.",
  },
  megaMenu: {
    items: [
      {
        label: "Services",
        style: "mega",
        children: [
          {
            label: "Mandatory Learning & Development",
            path: "/services/training",
            description: "Fill the hours. Empty the head.",
          },
          {
            label: "Internal Communications Optimization",
            path: "/services/communications",
            description: "Say more. Clarify nothing.",
          },
          {
            label: "Organizational Restructuring Services",
            path: "/services/restructuring",
            description: "Everything in motion. Nothing in place.",
          },
          {
            label: "Retention Through Ambient Dread",
            path: "/services/retention",
            description: "Loyalty through carefully managed uncertainty.",
          },
          {
            label: "Performance Management Systems",
            path: "/services/performance",
            description: "If it moves, measure it. If it doesn't move, measure it harder.",
          },
          {
            label: "Management Enablement",
            path: "/services/management",
            description: "Responsibility without authority. Authority without accountability.",
          },
          {
            label: "Compensation Suppression Solutions",
            path: "/services/compensation",
            description: "Fair pay, properly contextualized.",
          },
          {
            label: "Employee Engagement",
            path: "/services/engagement",
            description: "Camaraderie, mandatory.",
          },
          {
            label: "IT & Tooling",
            path: "/services/tooling",
            description: "Technology that works against you, consistently.",
          },
          {
            label: "Physical Workspace Strategy",
            path: "/services/workspace",
            description: "The building itself is the intervention.",
          },
        ],
      },
      {
        label: "Case Studies",
        path: "/case-studies",
      },
      {
        label: "About",
        path: "/about",
      },
      {
        label: "Contact",
        path: "/contact",
      },
    ],
  },
  nav: [
    { label: "Services", path: "/services" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
}
```

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS. The file compiles against the existing `SiteConfig` type.

- [ ] **Step 4: Commit**

```bash
git add src/sites/gristmill/config.ts
git commit -m "feat(gristmill): add site config with 10-arm mega menu"
```

---

## Task 3: Define data types

**Files:**
- Create: `src/sites/gristmill/data/types.ts`

- [ ] **Step 1: Write the types file**

Create `src/sites/gristmill/data/types.ts` with the ServiceArm and Service interfaces:

```typescript
export interface ServiceArm {
  slug: string
  name: string
  nickname: string
  tagline: string
  overview: string[]
  image: string
  productSlugs: string[]
}

export interface ProofPoint {
  value: string
  label: string
}

export interface Service {
  slug: string
  armSlug: string
  name: string
  tagline: string
  shortDescription: string
  description: string[]
  deliverables: string[]
  engagementModel: string
  proofPoints: ProofPoint[]
  image: string
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/types.ts
git commit -m "feat(gristmill): define ServiceArm and Service data types"
```

---

## Task 4: Write arms metadata for all 10 arms

**Files:**
- Create: `src/sites/gristmill/data/arms.ts`

- [ ] **Step 1: Write the arms data file**

Create `src/sites/gristmill/data/arms.ts` with all 10 arm entries. Arms carry metadata only at this stage; only the Training Arm's `productSlugs` will reference real services in Plan 1. Other arms have empty `productSlugs` arrays that Plan 2 will populate.

Image paths use the convention `/sites/gristmill/arms/<slug>.png`. These files will not exist until Plan 4 — that's fine, they 404 silently in `<img>` tags during development.

```typescript
import type { ServiceArm } from "./types"

export const arms: ServiceArm[] = [
  {
    slug: "training",
    name: "Mandatory Learning & Development",
    nickname: "The Training Arm",
    tagline: "Fill the hours. Empty the head.",
    overview: [
      "Gristmill's flagship practice, in continuous operation since 1962. Our Training Arm delivers classroom and webinar programming of documented ineffectiveness, purpose-built to consume calendar hours, exhaust short-term memory, and reinforce the employee's sense that the firm's priorities are neither theirs to understand nor theirs to question.",
      "Every module is certification-bearing, audit-trackable, and calibrated to produce zero measurable improvement in capability while producing very real improvements in attendance compliance. Deployed at over 400 Fortune 500 clients and privately held industrials.",
    ],
    image: "/sites/gristmill/arms/training.png",
    productSlugs: [
      "247-slide-deck",
      "nasal-hygiene-webinar",
      "gratitude-curriculum",
      "knowledge-retention-nullification",
      "monthly-certification-renewal",
    ],
  },
  {
    slug: "communications",
    name: "Internal Communications Optimization",
    nickname: "The Messaging Arm",
    tagline: "Say more. Clarify nothing.",
    overview: [
      "A suite of internal communications services engineered to maximize volume and minimize information transfer. Gristmill's Messaging Arm has been helping organizations manage the flow of inside-the-firm communication since the Carter administration.",
    ],
    image: "/sites/gristmill/arms/communications.png",
    productSlugs: [],
  },
  {
    slug: "restructuring",
    name: "Organizational Restructuring Services",
    nickname: "The Reorg Arm",
    tagline: "Everything in motion. Nothing in place.",
    overview: [
      "Reorganization is not a one-time intervention. At Gristmill we believe it is a hygienic practice, applied continuously to keep every title meaningful to nobody but the reorganizer. Our Restructuring Arm has executed more than 8,000 successful reorganizations, none of which improved outcomes.",
    ],
    image: "/sites/gristmill/arms/restructuring.png",
    productSlugs: [],
  },
  {
    slug: "retention",
    name: "Retention Through Ambient Dread",
    nickname: "The Fear Arm",
    tagline: "Loyalty through carefully managed uncertainty.",
    overview: [
      "Gristmill's Fear Arm is the industry's gold standard in non-explicit workforce discipline. We install and maintain a persistent atmosphere of unspecified threat — gentle enough not to trigger regulatory scrutiny, loud enough to keep the workforce gratefully employed. Clients report retention figures that would otherwise require a weak labor market to achieve.",
    ],
    image: "/sites/gristmill/arms/retention.png",
    productSlugs: [],
  },
  {
    slug: "performance",
    name: "Performance Management Systems",
    nickname: "The Measurement Arm",
    tagline: "If it moves, measure it. If it doesn't move, measure it harder.",
    overview: [
      "Our Measurement Arm delivers performance management programs that convert individual contribution into numbers the contributor cannot challenge. Every metric is defensible. Every target is moving. Every evaluation cycle produces an outcome.",
    ],
    image: "/sites/gristmill/arms/performance.png",
    productSlugs: [],
  },
  {
    slug: "management",
    name: "Management Enablement",
    nickname: "The Middle Management Arm",
    tagline: "Responsibility without authority. Authority without accountability.",
    overview: [
      "The middle manager is the load-bearing beam of the modern enterprise. Gristmill's Middle Management Arm equips your managers with the tools, training, and structural ambiguity required to absorb complaints from below, defer decisions to above, and keep the organization moving sideways at pace.",
    ],
    image: "/sites/gristmill/arms/management.png",
    productSlugs: [],
  },
  {
    slug: "compensation",
    name: "Compensation Suppression Solutions",
    nickname: "The Raise-Denial Arm",
    tagline: "Fair pay, properly contextualized.",
    overview: [
      "Compensation conversations are the single largest source of workforce volatility. Gristmill's Raise-Denial Arm — operating since 1971 — provides the training, literature, and manager-side scripting necessary to reduce successful raise requests to statistical noise.",
    ],
    image: "/sites/gristmill/arms/compensation.png",
    productSlugs: [],
  },
  {
    slug: "engagement",
    name: "Employee Engagement",
    nickname: "The Fun Arm",
    tagline: "Camaraderie, mandatory.",
    overview: [
      "Gristmill's Fun Arm applies rigor, tracking, and consequence to the historically frivolous domain of workplace camaraderie. Fun is too important to be optional. We make it measurable.",
    ],
    image: "/sites/gristmill/arms/engagement.png",
    productSlugs: [],
  },
  {
    slug: "tooling",
    name: "IT & Tooling",
    nickname: "The Friction Arm",
    tagline: "Technology that works against you, consistently.",
    overview: [
      "A comprehensive suite of information technology services designed to introduce controlled inefficiency at every point of employee-computer interaction. The Friction Arm has been deployed at industrial clients since the advent of the personal computer.",
    ],
    image: "/sites/gristmill/arms/tooling.png",
    productSlugs: [],
  },
  {
    slug: "workspace",
    name: "Physical Workspace Strategy",
    nickname: "The Environment Arm",
    tagline: "The building itself is the intervention.",
    overview: [
      "Architecture is the original workforce discipline. Gristmill's Environment Arm rebuilds your office to do the quiet work of retention, compensation suppression, and performance management for you, whether anyone is looking or not.",
    ],
    image: "/sites/gristmill/arms/workspace.png",
    productSlugs: [],
  },
]

export function getArmBySlug(slug: string): ServiceArm | undefined {
  return arms.find((arm) => arm.slug === slug)
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/arms.ts
git commit -m "feat(gristmill): add metadata for all 10 service arms"
```

---

## Task 5: Write full service data for the Training Arm (5 services)

**Files:**
- Create: `src/sites/gristmill/data/services.ts`

- [ ] **Step 1: Write the services data file**

Create `src/sites/gristmill/data/services.ts` with the 5 Training Arm services fully populated. Keep the trade-journal voice — short sentences, older words, deadpan. Never wink at the reader.

Image paths use the convention `/sites/gristmill/services/<slug>.png`. These files will not exist until Plan 4.

```typescript
import type { Service } from "./types"

export const services: Service[] = [
  {
    slug: "247-slide-deck",
    armSlug: "training",
    name: "The 247-Slide Deck",
    tagline: "Four hours. Two hundred forty-seven slides. No images.",
    shortDescription:
      "A full-day live reading of a 247-slide corporate deck, delivered by a certified Gristmill instructor to the assembled workforce.",
    description: [
      "The 247-Slide Deck is Gristmill's oldest continuously delivered product. First deployed in 1968 at a regional utility in central Pennsylvania, it has since been delivered more than 40,000 times to workforces across every sector of the American economy.",
      "Each engagement begins at 8:00 a.m. sharp and runs four uninterrupted hours. Attendance is mandatory. Phones are collected at the door. A single certified Gristmill instructor reads each of the deck's 247 slides aloud, word for word, in order. The slides contain no images, no diagrams, no visual aids, and no humor. Slide 183 is titled 'Continued Thoughts on Synergy (cont.).' Slide 184 is also titled 'Continued Thoughts on Synergy (cont.).'",
      "Upon completion, attendees are issued a certificate suitable for framing and a follow-up examination covering material that was not discussed.",
    ],
    deliverables: [
      "One (1) four-hour live reading of the standard 247-slide deck",
      "Certified Gristmill instructor, on-site or via secured videoconference",
      "Printed handouts of all 247 slides (single-sided, no collation)",
      "Attendance tracking with integration into your HRIS of choice",
      "Post-session examination and remediation plan for non-passing attendees",
      "Annual certification renewal (see Certification Renewal Every 30 Days)",
    ],
    engagementModel:
      "Delivered on-site or remote. Gristmill assigns a single certified instructor for the duration of the engagement. Recommended minimum audience size is forty (40) attendees. There is no maximum. The reading proceeds at a fixed cadence regardless of audience comprehension, engagement, or physical consciousness.",
    proofPoints: [
      { value: "40,000+", label: "Deliveries since 1968" },
      { value: "247", label: "Slides read aloud, verbatim" },
      { value: "4 hours", label: "Uninterrupted duration" },
      { value: "98.4%", label: "Attendance compliance rate" },
    ],
    image: "/sites/gristmill/services/247-slide-deck.png",
  },
  {
    slug: "nasal-hygiene-webinar",
    armSlug: "training",
    name: "Professional Nasal Hygiene for the Client-Facing Workforce",
    tagline: "Eight hours. One topic. Mandatory for all personnel.",
    shortDescription:
      "A full-day virtual training on the proper blowing, wiping, and stowing of nasal tissues in a manner acceptable to clients the workforce will never meet.",
    description: [
      "Gristmill's Nasal Hygiene webinar is an eight-hour single-topic training session required for every employee in a client-facing role, and — at the client's discretion — for every employee regardless of role. The curriculum, developed in consultation with a now-defunct etiquette consultancy in Hartford, covers the selection, handling, deployment, and disposal of nasal tissue in professional environments.",
      "The training presumes no existing hygiene. Topic areas include but are not limited to: tissue grade selection, the two-hand fold, the quiet blow, the after-blow pause, and the three approved stowage locations. Each topic is reinforced by group repetition exercises conducted over video with cameras required on.",
      "By the end of the eight hours, attendees will not only understand the standard but will have abandoned any previous confidence in their ability to blow their own nose without supervision.",
    ],
    deliverables: [
      "One (1) eight-hour live virtual training session",
      "Gristmill-certified instructor with credentials in corporate etiquette",
      "28-page participant workbook (mailed, not emailed)",
      "Camera-on attendance verification throughout the full eight hours",
      "Passing grade required on end-of-session assessment to retain client-facing duties",
      "Quarterly refresher webinars (90 minutes each)",
    ],
    engagementModel:
      "Delivered virtually via secured videoconference. Cameras must remain on for the entire eight-hour session. Scheduled bathroom breaks are permitted every 120 minutes and are monitored. Gristmill provides a session monitor in addition to the instructor to flag camera-off participants and issue attendance deductions.",
    proofPoints: [
      { value: "8 hours", label: "Total session duration" },
      { value: "1", label: "Topic covered" },
      { value: "100%", label: "Camera-on compliance required" },
      { value: "Zero", label: "Clients the training serves" },
    ],
    image: "/sites/gristmill/services/nasal-hygiene-webinar.png",
  },
  {
    slug: "gratitude-curriculum",
    armSlug: "training",
    name: "Certified Gratitude Curriculum",
    tagline: "Twelve modules. One outlook. Permanent adjustment.",
    shortDescription:
      "A twelve-module program teaching employees to feel verifiable gratitude toward shareholders, management, and the continuation of their current employment.",
    description: [
      "The Certified Gratitude Curriculum is Gristmill's most comprehensive attitude-adjustment program. Deployed across twelve sequential modules — one per month — the curriculum walks employees from baseline through advanced gratitude, with certification testing at each stage.",
      "Module topics include: the moral case for shareholder returns, the true cost of a superyacht's barnacle removal, the psychological benefits of accepting one's compensation, the history of workforce volatility and why it ended well for no one, and the gratitude journal as a performance review artifact. The final module requires attendees to write a one-page letter to their largest shareholder and read it aloud in a small group.",
      "Graduates of the program report a measurable decline in 'wanting things,' a decline that has been shown to persist for up to fourteen months following completion.",
    ],
    deliverables: [
      "Twelve (12) monthly modules, each 2-3 hours in length",
      "Gratitude Journal (Gristmill-branded, tracked)",
      "Per-module certification with passing grade required",
      "Final exam and one-page shareholder letter",
      "Manager-facing dashboard showing per-employee gratitude scores",
      "Annual recertification recommended",
    ],
    engagementModel:
      "Delivered in-person or virtually over a twelve-month period. The curriculum is designed to be completed during working hours and does not accommodate opt-outs. Gristmill supplies the gratitude journals and collects them for grading at the end of each module.",
    proofPoints: [
      { value: "12", label: "Monthly modules" },
      { value: "14 months", label: "Duration of measured effect" },
      { value: "72%", label: "Reduction in wage grievances post-certification" },
      { value: "1", label: "Letter to shareholder" },
    ],
    image: "/sites/gristmill/services/gratitude-curriculum.png",
  },
  {
    slug: "knowledge-retention-nullification",
    armSlug: "training",
    name: "Knowledge Retention Nullification",
    tagline: "Trained today. Untrained by tomorrow.",
    shortDescription:
      "A post-training intervention ensuring no skill, insight, or institutional knowledge acquired during corporate training survives past a 24-hour half-life.",
    description: [
      "Most training programs suffer from a critical flaw: participants occasionally remember what they learned. Knowledge Retention Nullification is Gristmill's countermeasure. Applied immediately following any internal training session, the intervention ensures that every skill and insight is reliably gone by the following morning.",
      "The method is proprietary and not disclosed in this material. Clients are assured that it is non-invasive, fully compliant with applicable state labor law, and has been the subject of two dismissed class actions.",
      "Knowledge Retention Nullification is recommended as a companion service to every Gristmill training product and is bundled as standard with The 247-Slide Deck, the Nasal Hygiene webinar, and the Gratitude Curriculum.",
    ],
    deliverables: [
      "Post-training intervention session (45 minutes)",
      "Pre/post assessment comparison showing 0% retention at 24 hours",
      "Per-employee nullification certificate (for HR files)",
      "Optional weekly reinforcement sessions to suppress emerging retention",
      "Full documentation for use in subsequent retraining cycles",
    ],
    engagementModel:
      "Delivered within 24 hours of any Gristmill or client-run training session. Can be applied retroactively up to 72 hours post-training with reduced effectiveness. Required for any client purchasing Monthly Certification Renewal.",
    proofPoints: [
      { value: "0%", label: "Retained knowledge at 24-hour mark" },
      { value: "100%", label: "Training sessions eligible for billing reuse" },
      { value: "2", label: "Dismissed class actions" },
    ],
    image: "/sites/gristmill/services/knowledge-retention-nullification.png",
  },
  {
    slug: "monthly-certification-renewal",
    armSlug: "training",
    name: "Certification Renewal Every 30 Days",
    tagline: "The same material. Every month. Forever.",
    shortDescription:
      "A recurring certification program that requires employees to renew their credentials on the same unchanged training material every thirty days for the duration of their employment.",
    description: [
      "Gristmill believes that a certification earned is a certification that must be earned again. Certification Renewal Every 30 Days applies this principle across the full Gristmill training catalog. Each month, employees retake the examinations associated with every training they have ever completed. The material does not change. The passing standard does not change. The requirement does not change.",
      "Employees who fail any renewal are subject to immediate remediation, which consists of retaking the full original training. Employees who pass are entered into the next renewal cycle, which begins the following day.",
      "The program is self-perpetuating and is recommended as a permanent foundation for any workforce.",
    ],
    deliverables: [
      "Monthly examination delivery across all active Gristmill certifications",
      "Automated grading and remediation routing",
      "Failed-renewal tracking integrated with HR disciplinary workflow",
      "Optional public leaderboards of per-employee renewal streaks",
      "Permanent record of every employee's certification status history",
    ],
    engagementModel:
      "Runs in perpetuity on a rolling 30-day cadence. Requires integration with client HRIS. The program begins the day of installation and continues until the employee leaves the firm or Gristmill is dissolved.",
    proofPoints: [
      { value: "30 days", label: "Cycle duration" },
      { value: "0", label: "Changes to the underlying material" },
      { value: "∞", label: "Engagement length" },
    ],
    image: "/sites/gristmill/services/monthly-certification-renewal.png",
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getServicesByArm(armSlug: string): Service[] {
  return services.filter((service) => service.armSlug === armSlug)
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/data/services.ts
git commit -m "feat(gristmill): add full service data for Training Arm (5 services)"
```

---

## Task 6: Build ArmPage component

**Files:**
- Create: `src/sites/gristmill/pages/arm-page.tsx`

- [ ] **Step 1: Write the ArmPage component**

Create `src/sites/gristmill/pages/arm-page.tsx`. The component is data-driven — it looks up the arm by slug, loads its services, and renders hero, overview, product grid, and a CTA band. Use existing shared components (`Hero`, `CTABanner`) and Tailwind utility classes that read from the theme CSS variables (`text-primary`, `bg-secondary`, `text-foreground`, etc.).

```typescript
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { getArmBySlug } from "../data/arms"
import { getServicesByArm } from "../data/services"
import { notFound } from "next/navigation"

interface ArmPageProps {
  slug: string
}

export default function ArmPage({ slug }: ArmPageProps) {
  const arm = getArmBySlug(slug)
  if (!arm) notFound()

  const services = getServicesByArm(arm.slug)

  return (
    <div className="bg-background text-foreground">
      <Hero
        headline={arm.name}
        subheadline={`${arm.nickname} — ${arm.tagline}`}
        image={arm.image}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-6 text-3xl font-heading font-bold text-secondary">
          Practice Overview
        </h2>
        {arm.overview.map((paragraph, i) => (
          <p key={i} className="mb-4 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="bg-secondary/5 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-3xl font-heading font-bold text-secondary">
            Products in this Practice
          </h2>
          {services.length === 0 ? (
            <p className="text-lg italic text-foreground/70">
              Product details forthcoming. Please contact an engagement specialist.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${arm.slug}/${service.slug}`}
                  className="block rounded border-2 border-secondary/20 bg-background p-6 transition hover:border-primary"
                >
                  <h3 className="mb-2 text-xl font-heading font-bold text-secondary">
                    {service.name}
                  </h3>
                  <p className="mb-4 text-sm italic text-foreground/70">{service.tagline}</p>
                  <p className="text-sm">{service.shortDescription}</p>
                  <p className="mt-4 text-sm font-semibold text-primary">Learn more →</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner
        headline="Ready to reduce workforce volatility?"
        description="A member of our Workforce Stabilization Team will contact you within three to five business quarters."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/pages/arm-page.tsx
git commit -m "feat(gristmill): add ArmPage component"
```

---

## Task 7: Build ServiceDetailPage component

**Files:**
- Create: `src/sites/gristmill/pages/service-detail.tsx`

- [ ] **Step 1: Write the ServiceDetailPage component**

Create `src/sites/gristmill/pages/service-detail.tsx`. The component looks up the arm and service by slug, renders hero, description paragraphs, deliverables list, engagement model, proof points, related services (siblings in the same arm), and a CTA.

```typescript
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { getArmBySlug } from "../data/arms"
import { getServiceBySlug, getServicesByArm } from "../data/services"
import { notFound } from "next/navigation"

interface ServiceDetailPageProps {
  armSlug: string
  serviceSlug: string
}

export default function ServiceDetailPage({ armSlug, serviceSlug }: ServiceDetailPageProps) {
  const arm = getArmBySlug(armSlug)
  const service = getServiceBySlug(serviceSlug)

  if (!arm || !service || service.armSlug !== armSlug) {
    notFound()
  }

  const related = getServicesByArm(armSlug).filter((s) => s.slug !== serviceSlug)

  return (
    <div className="bg-background text-foreground">
      <Hero
        headline={service.name}
        subheadline={`${arm.nickname} — ${service.tagline}`}
        image={service.image}
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        {service.description.map((paragraph, i) => (
          <p key={i} className="mb-5 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="border-t-2 border-b-2 border-secondary/20 bg-secondary/5 py-16">
        <div className="mx-auto max-w-4xl px-6 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-heading font-bold text-secondary">
              What&apos;s Included
            </h2>
            <ul className="space-y-3">
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 text-primary">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-heading font-bold text-secondary">
              Engagement Model
            </h2>
            <p className="leading-relaxed">{service.engagementModel}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-heading font-bold text-secondary">
          Proof Points
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {service.proofPoints.map((point, i) => (
            <div
              key={i}
              className="rounded border-2 border-secondary/20 bg-background p-6 text-center"
            >
              <div className="mb-2 text-4xl font-heading font-bold text-accent">
                {point.value}
              </div>
              <div className="text-sm uppercase tracking-wide text-foreground/70">
                {point.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary/5 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-8 text-2xl font-heading font-bold text-secondary">
              Related Services in {arm.nickname}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${arm.slug}/${s.slug}`}
                  className="block rounded border-2 border-secondary/20 bg-background p-5 transition hover:border-primary"
                >
                  <h3 className="mb-1 text-lg font-heading font-bold text-secondary">
                    {s.name}
                  </h3>
                  <p className="text-sm italic text-foreground/70">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        headline="Ready to engage this service?"
        description="Request an engagement and a member of our Workforce Stabilization Team will be in touch within three to five business quarters."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/pages/service-detail.tsx
git commit -m "feat(gristmill): add ServiceDetailPage component"
```

---

## Task 8: Build the ServiceRouter

**Files:**
- Create: `src/sites/gristmill/pages/service-router.tsx`

- [ ] **Step 1: Write the router**

Create `src/sites/gristmill/pages/service-router.tsx`. This is a small dispatch component that renders ArmPage for 1-segment paths and ServiceDetailPage for 2-segment paths. Mirrors strategicvoid's `solution-router.tsx`.

```typescript
import ArmPage from "./arm-page"
import ServiceDetailPage from "./service-detail"

interface ServiceRouterProps {
  slug: string
  segments?: string[]
}

export default function ServiceRouter({ slug, segments }: ServiceRouterProps) {
  if (segments && segments.length === 2) {
    return <ServiceDetailPage armSlug={segments[0]} serviceSlug={segments[1]} />
  }
  return <ArmPage slug={slug} />
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/pages/service-router.tsx
git commit -m "feat(gristmill): add ServiceRouter dispatch component"
```

---

## Task 9: Build the services index page

**Files:**
- Create: `src/sites/gristmill/pages/services-index.tsx`

- [ ] **Step 1: Write the page**

Create `src/sites/gristmill/pages/services-index.tsx`. The page lists all 10 arms as cards with name, tagline, and a link. Also exports a `metadata` constant for the catch-all route to pick up.

```typescript
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { arms } from "../data/arms"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Services — Gristmill Partners",
  description:
    "Gristmill Partners offers ten distinct service arms, each purpose-built to address a specific vector of workforce volatility. Browse our complete catalog.",
}

export default function ServicesIndexPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Ten Arms. One Firm."
        subheadline="Since 1962, Gristmill Partners has organized its work into ten practice areas — each addressing a distinct vector of workforce volatility."
        image="/sites/gristmill/services-index-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed">
          Our ten arms operate independently and can be engaged individually or in combination.
          Most Fortune 500 clients retain Gristmill across five or more arms simultaneously.
          The full catalog is listed below.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {arms.map((arm) => (
            <Link
              key={arm.slug}
              href={`/services/${arm.slug}`}
              className="flex flex-col rounded border-2 border-secondary/30 bg-background p-6 transition hover:border-primary"
            >
              <div className="mb-2 text-xs uppercase tracking-widest text-primary">
                {arm.nickname}
              </div>
              <h2 className="mb-3 text-xl font-heading font-bold text-secondary">
                {arm.name}
              </h2>
              <p className="mb-4 flex-1 text-sm italic text-foreground/70">{arm.tagline}</p>
              <p className="text-sm font-semibold text-primary">Explore this arm →</p>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner
        headline="Not sure where to start?"
        description="Request an engagement and we'll assess your workforce's volatility baseline."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}
```

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/gristmill/pages/services-index.tsx
git commit -m "feat(gristmill): add services index page"
```

---

## Task 10: Create stub pages for home, about, contact, privacy, terms, case-studies index

**Files:**
- Create: `src/sites/gristmill/pages/home.tsx`
- Create: `src/sites/gristmill/pages/about.tsx`
- Create: `src/sites/gristmill/pages/contact.tsx`
- Create: `src/sites/gristmill/pages/privacy.tsx`
- Create: `src/sites/gristmill/pages/terms.tsx`
- Create: `src/sites/gristmill/pages/case-studies-index.tsx`

These are minimum-viable stubs that render deadpan placeholder content. Plans 2 and 3 fill them in. Each exports a default component and a `metadata` constant.

- [ ] **Step 1: Create `home.tsx`**

```typescript
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"

export default function GristmillHome() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Helping American Industry Grind Employees Into Dust Since 1962."
        subheadline="Gristmill Partners is the trusted name in workforce stabilization, retention engineering, and compensation dampening for the Fortune 500."
        image="/sites/gristmill/home-hero.png"
        ctaText="Request an Engagement"
        ctaHref="/contact"
        secondaryCtaText="View Our Service Lines"
        secondaryCtaHref="/services"
      />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-lg leading-relaxed">
          For sixty-four years, Gristmill Partners has supplied American industry with
          the training, restructuring, and compensation-dampening services required to
          maintain a workforce of appropriate gratitude and controlled expectation. Our
          full catalog of services will be detailed on this page in due course.
        </p>
      </section>

      <CTABanner
        headline="Ready to reduce workforce volatility?"
        description="A member of our Workforce Stabilization Team will contact you within three to five business quarters."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}
```

- [ ] **Step 2: Create `about.tsx`**

```typescript
import { Hero } from "@/components/ui/hero"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "About — Gristmill Partners",
  description:
    "Sixty-four years of workforce stabilization. Gristmill Partners has been privately held, family-operated, and deeply resistant to change since 1962.",
}

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Sixty-Four Years of Workforce Stabilization"
        subheadline="Privately held. Family-operated. Deeply resistant to change since 1962."
        image="/sites/gristmill/about-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed">
          Gristmill Partners was founded in 1962 in a converted grain mill in Youngstown, Ohio,
          by a man who believed that the American worker had become insufficiently afraid.
          Full company history and leadership details forthcoming.
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Create `contact.tsx`**

```typescript
import { Hero } from "@/components/ui/hero"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Contact — Gristmill Partners",
  description:
    "Begin an engagement with Gristmill Partners. A member of our Workforce Stabilization Team will contact you within three to five business quarters.",
}

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Contact the Workforce Stabilization Team"
        subheadline="A member of our Workforce Stabilization Team will contact you within three to five business quarters."
        image="/sites/gristmill/contact-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed">
          Full engagement request form forthcoming. In the interim, direct inquiries may be
          addressed to the founder&apos;s office.
        </p>
        <p className="mt-8 text-xs text-foreground/60">
          Direct inquiries to the founder may be addressed to bsambrone@gmail.com.
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 4: Create `privacy.tsx`**

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Privacy Policy — Gristmill Partners",
  description:
    "Gristmill Partners privacy policy. This site is operated by Specific Industries. The authoritative privacy policy is available at specificindustries.com/privacy.",
}

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-6 text-4xl font-heading font-bold text-secondary">
          Privacy Policy
        </h1>
        <div className="mb-8 rounded border-2 border-secondary/30 bg-secondary/5 p-6">
          <p className="text-sm">
            This site is operated by Specific Industries. The authoritative privacy policy is
            available at{" "}
            <a
              href="https://specificindustries.com/privacy"
              className="text-primary underline"
            >
              specificindustries.com/privacy
            </a>
            .
          </p>
        </div>
        <p className="text-lg leading-relaxed">
          Gristmill Partners collects standard workforce volatility indicators in the normal
          course of business. Data handling, retention, and sharing are governed by the
          Specific Industries umbrella policy linked above.
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 5: Create `terms.tsx`**

```typescript
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Service — Gristmill Partners",
  description:
    "Gristmill Partners terms of service. This site is operated by Specific Industries. The authoritative terms are available at specificindustries.com/terms.",
}

export default function TermsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-6 text-4xl font-heading font-bold text-secondary">
          Terms of Service
        </h1>
        <div className="mb-8 rounded border-2 border-secondary/30 bg-secondary/5 p-6">
          <p className="text-sm">
            This site is operated by Specific Industries. The authoritative terms of service
            are available at{" "}
            <a
              href="https://specificindustries.com/terms"
              className="text-primary underline"
            >
              specificindustries.com/terms
            </a>
            .
          </p>
        </div>
        <p className="text-lg leading-relaxed">
          Gristmill Partners predates the modern regulatory environment by a considerable
          margin. All questions of dispute, jurisdiction, and applicable law are governed
          by the Specific Industries umbrella terms linked above.
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 6: Create `case-studies-index.tsx`**

```typescript
import { Hero } from "@/components/ui/hero"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Case Studies — Gristmill Partners",
  description:
    "Client engagements from Gristmill Partners' six decades of workforce stabilization work. Case studies forthcoming.",
}

export default function CaseStudiesIndexPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Six Decades of Case Studies"
        subheadline="Gristmill Partners has delivered more than 8,400 engagements since 1962. Selected case studies forthcoming."
        image="/sites/gristmill/case-studies-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed">
          Case studies from our full client roster will be published on this page in due course.
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 7: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/sites/gristmill/pages/home.tsx src/sites/gristmill/pages/about.tsx src/sites/gristmill/pages/contact.tsx src/sites/gristmill/pages/privacy.tsx src/sites/gristmill/pages/terms.tsx src/sites/gristmill/pages/case-studies-index.tsx
git commit -m "feat(gristmill): add stub pages for home, about, contact, privacy, terms, case studies"
```

---

## Task 11: Create barrel index and register in site registry

**Files:**
- Create: `src/sites/gristmill/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create the barrel index**

Create `src/sites/gristmill/index.ts` exporting config, pages, and dynamic routes. Follow the strategicvoid pattern — one dynamic route prefix (`services`) with `maxSegments: 2` and one (`case-studies`) for future use, which returns a stub component that will be replaced in Plan 3.

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import GristmillHome from "./pages/home"
import ServicesIndex, { metadata as servicesMetadata } from "./pages/services-index"
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
import ContactPage, { metadata as contactMetadata } from "./pages/contact"
import PrivacyPage, { metadata as privacyMetadata } from "./pages/privacy"
import TermsPage, { metadata as termsMetadata } from "./pages/terms"
import CaseStudiesIndex, { metadata as caseStudiesMetadata } from "./pages/case-studies-index"
import ServiceRouter from "./pages/service-router"
import { getArmBySlug } from "./data/arms"
import { getServiceBySlug } from "./data/services"

export { config }

export const pages: Record<string, PageEntry> = {
  "": GristmillHome,
  "services": { component: ServicesIndex, metadata: servicesMetadata },
  "about": { component: AboutPage, metadata: aboutMetadata },
  "contact": { component: ContactPage, metadata: contactMetadata },
  "privacy": { component: PrivacyPage, metadata: privacyMetadata },
  "terms": { component: TermsPage, metadata: termsMetadata },
  "case-studies": { component: CaseStudiesIndex, metadata: caseStudiesMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  "services": {
    component: ServiceRouter,
    maxSegments: 2,
    getMetadata: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const arm = getArmBySlug(segments[0])
        const service = getServiceBySlug(segments[1])
        if (!arm || !service || service.armSlug !== segments[0]) return undefined
        return {
          title: `${service.name} — ${arm.name} — Gristmill Partners`,
          description: service.tagline,
        }
      }
      const arm = getArmBySlug(slug)
      return arm
        ? {
            title: `${arm.name} — Gristmill Partners`,
            description: arm.tagline,
          }
        : undefined
    },
    isValidSlug: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const arm = getArmBySlug(segments[0])
        const service = getServiceBySlug(segments[1])
        return !!arm && !!service && service.armSlug === segments[0]
      }
      return !!getArmBySlug(slug)
    },
  },
}
```

- [ ] **Step 2: Register gristmill in the site registry**

Modify `src/sites/registry.ts`. Add the import (preserving alphabetical-ish ordering with the other site imports) and add the registry entry.

At the top of the file, add the import alongside the others:

```typescript
import { config as gristmillConfig, pages as gristmillPages, dynamicRoutes as gristmillDynamicRoutes } from "./gristmill"
```

Inside the `siteRegistry` object, add the gristmill entry:

```typescript
gristmill: { config: gristmillConfig, pages: gristmillPages, dynamicRoutes: gristmillDynamicRoutes },
```

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS. The registry now includes gristmill alongside all existing sites.

- [ ] **Step 4: Commit**

```bash
git add src/sites/gristmill/index.ts src/sites/registry.ts
git commit -m "feat(gristmill): register site module in registry"
```

---

## Task 12: Verification — typecheck, lint, build, dev smoke test

**Files:**
- None (verification only)

- [ ] **Step 1: Final type check**

Run: `npx tsc --noEmit`
Expected: PASS with no errors anywhere in the project.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS. Any new ESLint warnings in gristmill files should be fixed before proceeding.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: PASS. Build completes without errors. The output should show gristmill routes resolved through the catch-all page.

- [ ] **Step 4: Start the dev server**

Run: `npm run dev` (leave running in a separate terminal).

- [ ] **Step 5: Smoke test — homepage**

Navigate to `http://localhost:3000/?site=gristmill`
Expected: The gristmill homepage renders with the cream background, burnt-orange primary color, Zilla Slab headings, Fraunces body text, and the mega menu in the header showing all 10 service arms under "Services."

- [ ] **Step 6: Smoke test — services index**

Navigate to `http://localhost:3000/services?site=gristmill`
Expected: The services index page renders with all 10 arm cards. Each card shows the arm name, nickname, and tagline. Clicking any arm card navigates to the arm landing page.

- [ ] **Step 7: Smoke test — Training Arm landing page**

Navigate to `http://localhost:3000/services/training?site=gristmill`
Expected: The Training Arm landing page renders with the practice overview, and 5 product cards (one per service). Product images 404 but the cards render correctly.

- [ ] **Step 8: Smoke test — service detail page**

Navigate to `http://localhost:3000/services/training/247-slide-deck?site=gristmill`
Expected: The 247-Slide Deck service detail page renders with the full description, deliverables, engagement model, proof points, and 4 related services from the Training Arm.

- [ ] **Step 9: Smoke test — empty arm landing page**

Navigate to `http://localhost:3000/services/communications?site=gristmill`
Expected: The Messaging Arm landing page renders with the arm's overview, and the product grid shows the "Product details forthcoming" placeholder (because Plan 2 has not yet populated this arm's services).

- [ ] **Step 10: Smoke test — 404 on unknown slug**

Navigate to `http://localhost:3000/services/training/made-up-slug?site=gristmill`
Expected: 404 page (the `isValidSlug` check in `dynamicRoutes` rejects the unknown slug).

Navigate to `http://localhost:3000/services/made-up-arm?site=gristmill`
Expected: 404 page.

- [ ] **Step 11: Smoke test — other pages load**

Navigate to each of the stub pages and confirm each renders:
- `http://localhost:3000/about?site=gristmill`
- `http://localhost:3000/contact?site=gristmill`
- `http://localhost:3000/privacy?site=gristmill`
- `http://localhost:3000/terms?site=gristmill`
- `http://localhost:3000/case-studies?site=gristmill`

Expected: Each stub renders without errors. The privacy and terms pages each show the "authoritative policy available at specificindustries.com/..." callout. The contact stub shows the real email `bsambrone@gmail.com` in small print.

- [ ] **Step 12: Stop the dev server**

Press `Ctrl+C` in the dev server terminal.

- [ ] **Step 13: No commit required**

Verification task — no code changes. Plan 1 is complete when all smoke tests pass.

---

## Plan 1 Done When

- [x] All 12 tasks above are completed in order.
- [x] `npx tsc --noEmit` passes with no errors.
- [x] `npm run lint` passes with no new warnings.
- [x] `npm run build` completes successfully.
- [x] All smoke tests in Task 12 pass.
- [x] The Training Arm is fully navigable: `/services/training` and `/services/training/<any-of-5-slugs>` all render correctly.
- [x] The other 9 arms render their landing pages with the "product details forthcoming" placeholder.
- [x] Ready to hand off to Plan 2 (full content).
