# Strategic Void Consulting — Site Design Spec

**Subdomain:** `strategicvoid`
**Date:** 2026-03-29
**Status:** Approved

## Overview

Strategic Void Consulting is a satirical enterprise consulting firm website that sells the C.H.A.O.S. Framework™ (Centralized Holistic Alignment Optimization System). The site parodies McKinsey, Deloitte, and Salesforce with a buttoned-up, deadly serious consulting firm aesthetic. The humor comes entirely from the contrast between corporate gravitas and absurd products/content. The site never winks at the camera.

**Scale:** ~90+ pages, 34 products across 8 solution areas, 16 case studies, 24 whitepapers, 4 fictional executives, nested pricing architecture, satirical legal pages.

## Site Identity

- **Company name:** Strategic Void Consulting
- **Methodology:** The C.H.A.O.S. Framework™ — Centralized Holistic Alignment Optimization System
- **Tagline:** "Aligning Your Organization with the Void™"
- **Founded:** "1987"
- **Tone:** Deadpan corporate authority. Every word written as if by someone who genuinely believes in "holistic alignment optimization." The word "void" appears only in the company name and sparingly on the About page — all other branding uses generic corporate buzzwords.

## Theme

- **Primary:** `#0a1628` (deep navy)
- **Secondary:** `#1a2744` (lighter navy)
- **Accent:** `#c9a84c` (gold)
- **Background:** `#0a1628` (dark)
- **Text:** `#e8e0d0` (warm cream)
- **Heading font:** Playfair Display (serif, already loaded in the project)
- **Body font:** Inter (already loaded)

**Muted text color (`#8899b3`):** This is not part of the 5-color `ThemeColors` type. It will be used as a hardcoded CSS value within strategicvoid components only (e.g., `text-[#8899b3]`). The shared `ThemeColors` interface is NOT extended — this keeps changes local to this site.

This is visually distinct from all existing sites (pigmilk's pink, dehydratedwater's heritage blue, inflatableanchors' nautical orange).

## Navigation

New **MegaMenu** shared component replacing the standard Header nav for this site.

**Top-level nav items:**
- **Solutions** — mega-menu dropdown: 2×4 grid of all 8 solution areas (icon + name + tagline)
- **Case Studies** — direct link
- **Whitepapers** — direct link
- **Methodology** — direct link
- **Pricing** — direct link
- **About** — smaller dropdown: Company, Leadership, Contact

Responsive behavior: collapses to accordion on mobile. Theme-aware via CSS variables.

**Nav type integration:** The existing `NavItem` type is `{ label: string; path: string }` (flat links). Rather than modifying this shared type (which would affect all sites), the MegaMenu component consumes its own data structure defined within the strategicvoid config. The site's `config.nav` array still contains flat `NavItem[]` entries for fallback/mobile. The MegaMenu receives nested navigation data as a separate config. The Header component checks if a site provides a `megaMenu` config and renders MegaMenu instead of the default nav. This requires adding an optional `megaMenu` field to `SiteConfig`:

```typescript
// Added to SiteConfig (optional, backwards-compatible)
megaMenu?: {
  items: MegaMenuItem[]
}

interface MegaMenuItem {
  label: string
  path?: string              // direct link (for simple items)
  children?: MegaMenuChild[] // dropdown content
  style?: "mega" | "dropdown" // "mega" = full-width panel, "dropdown" = simple list
}

interface MegaMenuChild {
  label: string
  path: string
  description?: string
  icon?: string
}
```

This keeps `NavItem` unchanged for all existing sites while giving strategicvoid nested nav.

## Page Map

| Page | Route | Type |
|------|-------|------|
| Homepage | `/` | Unique |
| Solutions index | `/solutions` | Unique |
| Meeting Optimization Suite | `/solutions/meeting-optimization` | Solution template |
| KPI Alignment Platform | `/solutions/kpi-alignment` | Solution template |
| Middle Management Enablement | `/solutions/middle-management` | Solution template |
| Productivity Theater | `/solutions/productivity-theater` | Solution template |
| Compliance & Policy Solutions | `/solutions/compliance-policy` | Solution template |
| Communication Enhancement Tools | `/solutions/communication-enhancement` | Solution template |
| Decision Support Systems | `/solutions/decision-support` | Solution template |
| Employee Experience Optimization | `/solutions/employee-experience` | Solution template |
| Product detail (×34) | `/solutions/[area]/[product-slug]` | Product template |
| Case Studies index | `/case-studies` | Unique |
| Case Study detail (×16) | `/case-studies/[slug]` | Composed sections |
| Whitepapers index | `/whitepapers` | Unique |
| Whitepaper detail (×24) | `/whitepapers/[slug]` | Composed sections |
| Methodology | `/methodology` | Unique |
| Pricing | `/pricing` | Unique |
| About | `/about` | Unique |
| Leadership | `/leadership` | Unique |
| Contact | `/contact` | Unique (includes real email bsambrone@gmail.com in small text) |
| Privacy Policy | `/privacy` | Unique |
| Terms of Service | `/terms` | Unique |

### Dynamic Routes

Four dynamic route patterns, all validated against data:

- `solutions/[slug]` — resolves to one of 8 solution area pages
- `solutions/[area]/[slug]` — resolves to a product detail page within a solution area
- `case-studies/[slug]` — resolves to a case study page
- `whitepapers/[slug]` — resolves to a whitepaper page

**Multi-segment routing — integration with existing types:**

The current `DynamicRoute` interface passes `{ slug: string }` to components, and the catch-all route only handles exactly 2 segments (`prefix/slug`). Strategic Void needs 2 AND 3 segment paths under `solutions/`.

**Approach:** Extend the `DynamicRoute` interface to support multi-segment slugs while remaining backwards-compatible:

```typescript
// Updated DynamicRoute in src/themes/index.ts
export interface DynamicRoute {
  component: React.ComponentType<{ slug: string; segments?: string[] }>
  getMetadata?: (slug: string, segments?: string[]) => PageMetadata | undefined
  isValidSlug?: (slug: string, segments?: string[]) => boolean
  maxSegments?: number  // default 1 (current behavior), set to 2 for solutions
}
```

The catch-all route update:
- Currently: `segments.length === 2` hardcoded check
- Updated: check `segments.length >= 2`, find matching `dynamicRoutes[segments[0]]`, pass `segments[1]` as `slug` and `segments.slice(1)` as `segments`
- The `maxSegments` field tells the resolver how many segments after the prefix to accept (1 = current behavior, 2 = allows `solutions/area/product`)

For `strategicvoid`, the `dynamicRoutes` barrel exports:

```typescript
dynamicRoutes: {
  "solutions": {
    component: SolutionRouter,    // receives slug="meeting-optimization" and segments=["meeting-optimization"] or segments=["meeting-optimization", "meeting-brick"]
    getMetadata: (slug, segments) => ...,
    isValidSlug: (slug, segments) => ...,
    maxSegments: 2,
  },
  "case-studies": {
    component: CaseStudyPage,
    getMetadata: (slug) => ...,
    isValidSlug: (slug) => ...,
  },
  "whitepapers": {
    component: WhitepaperPage,
    getMetadata: (slug) => ...,
    isValidSlug: (slug) => ...,
  },
}
```

`SolutionRouter` checks `segments.length`: if 1, render solution page; if 2, render product detail. Existing sites are unaffected — their `DynamicRoute` components don't use `segments` and `maxSegments` defaults to 1.

## Solution Areas (8)

Each solution area is a "practice area" with its own landing page, products, pricing, case studies, and whitepapers.

### 1. Meeting Optimization Suite™

**Tagline:** "Maximize meeting impact. Minimize actual contribution."

**Products:**
- Meeting Brick™ — A precision-weighted productivity device for maintaining keyboard pressure during virtual engagements
- AutoNod Pro™ — A desk device that nods your webcam feed periodically
- DelaySync™ — Artificial lag generator for plausible deniability
- Calendar Inflator™ — Automatically adds buffer meetings to maximize calendar saturation

### 2. KPI Alignment Platform™

**Tagline:** "If you can measure it, you can misunderstand it."

**Products:**
- KPI Generator™ — Turns random numbers into performance metrics
- GoalPost Shifter Pro™ — Dynamically adjusts targets based on outcomes
- VanityMetrics Dashboard™ — Beautiful charts that mean nothing
- NorthStar Randomizer™ — Reassigns company direction quarterly

### 3. Middle Management Enablement™

**Tagline:** "Empowering leaders to lead without leading."

**Products:**
- Synergy Amplifier™ — Replaces plain speech with buzzwords
- 1:1 Generator™ — Produces talking points that go nowhere
- Escalation Ladder™ — Physical product representing unnecessary escalation paths
- PassiveAggressive Slack Bot™ — Auto-generates "per my last message"

### 4. Productivity Theater™

**Tagline:** "Work harder at appearing to work."

**Products:**
- FocusBand™ — Lights up when you look busy
- DeepWork Simulator™ — Plays typing sounds and intense music
- Task Deferral Engine™ — Intelligently reschedules work indefinitely
- Urgency Generator™ — Flags everything as high priority

### 5. Compliance & Policy Solutions™

**Tagline:** "Because accountability is a shared illusion."

**Products:**
- Policy Generator 5000™ — Creates 80-page documents instantly
- Checkbox Automator™ — Automatically marks things as "reviewed"
- Audit Camouflage™ — Makes everything look compliant at a glance
- Risk Redistribution Engine™ — Moves blame across departments

### 6. Communication Enhancement Tools™

**Tagline:** "Say more. Mean less."

**Products:**
- Buzzword Translator™ — Converts simple ideas into corporate speak
- Reply-All Optimizer™ — Ensures maximum visibility with minimal value
- Thread Extender™ — Keeps conversations alive long past relevance
- ToneSoftener AI™ — Adds "just looping back" to everything

### 7. Decision Support Systems™

**Tagline:** "Making decisions optional."

**Products:**
- CoinFlip Enterprise™ — Decision engine with audit logs
- BlameShield™ — Documents decisions so responsibility is unclear
- Consensus Simulator™ — Generates fake agreement across stakeholders
- DelayLoop™ — Postpones decisions until irrelevant

### 8. Employee Experience Optimization™

**Tagline:** "Because happy employees are statistically unnecessary."

**Products:**
- MandatoryFun™ Platform — Schedules "optional" fun events during peak workload hours
- Wellness Noise Generator™ — Plays calming sounds while your workload increases
- Morale Dashboard™ — Tracks happiness using completely made-up metrics
- PizzaParty-as-a-Service™ — Automatically deploys pizza instead of raises
- ErgoMax Compliance Chair™ — Tracks posture but reports you to HR if you slouch
- Anonymous Feedback Redirector™ — Sends employee feedback directly to /dev/null

## Solution Page Template

Each solution landing page renders from a data object with this structure:

1. **Hero** — Solution name, tagline, dark background
2. **Overview** — 2-3 paragraphs of deadpan corporate prose
3. **Product Grid** — Cards for each product in the suite (3-6 per solution)
4. **Pricing Table** — 3-tier per-solution pricing
5. **Case Study Previews** — 2 CaseStudyCards for this area
6. **Whitepaper Previews** — 2-3 WhitepaperCards for this area
7. **CTA** — "Request a Demo" / "Schedule an Alignment Session"

## Product Data Shape

```typescript
interface Product {
  slug: string
  name: string
  solutionArea: string
  price: string              // e.g., "$4,999/seat/quarter"
  tagline: string
  description: string[]      // paragraphs of deadpan copy
  features: string[]         // bullet points
  specs: { label: string; value: string }[]
  image: string
  enterpriseTier?: string
}
```

## Product Detail Page Template

1. **Hero** — Product name, tagline, hero image
2. **Description** — Full deadpan product copy
3. **Features & Specs** — side-by-side layout
4. **Pricing callout** — "Included in [tier] and above" or per-product pricing
5. **Related Products** — other products in same solution area
6. **CTA** — "Request a Demo"

## Case Studies

**16 total** — 2 per solution area. Each is a unique composition of reusable section components.

### Section Component Library

| Component | Purpose |
|-----------|---------|
| `CaseHero` | Hero stat + company name + solution badge |
| `Challenge` | The client's "problem" |
| `Approach` | Numbered steps of what Strategic Void did |
| `ApproachTimeline` | Visual timeline variant |
| `ResultsGrid` | 3-4 metric boxes with numbers |
| `DataChart` | SVG chart with absurd data (bar, line, pie, area) |
| `BeforeAfter` | Side-by-side comparison |
| `ExecutiveQuote` | Engagement partner headshot + pull quote |
| `ClientQuote` | Fictional client contact testimonial |
| `Callout` | Highlighted insight box |

### Case Study Data Shape

```typescript
interface CaseStudy {
  slug: string
  company: string
  industry: string
  solutionArea: string
  heroStat: { value: string; label: string }
  sections: CaseStudySection[]
}
```

### Case Study Titles

**Meeting Optimization:**
1. "How GlobalTech Dynamics reduced productive meetings by 73%"
2. "Pinnacle Financial's journey to 100% calendar saturation"

**KPI Alignment:**
3. "Meridian Health achieved 200% KPI compliance by redefining all metrics"
4. "How Apex Logistics hit every target by removing accountability"

**Middle Management:**
5. "Stratton Industries doubled management layers with zero output change"
6. "How CoreBridge Solutions empowered leaders to delegate delegation"

**Productivity Theater:**
7. "NovaCorp's 340% increase in perceived productivity"
8. "How DataPlex Systems achieved FocusBand™ adoption across 12 time zones"

**Compliance & Policy:**
9. "Vanguard Media's path to 100% checkbox completion without reading anything"
10. "How Sterling Pharmaceuticals redistributed risk until nobody was responsible"

**Communication Enhancement:**
11. "How Broadleaf Consulting reduced email clarity by 89%"
12. "Titan Manufacturing's reply-all optimization saved 4,000 unproductive hours"

**Decision Support:**
13. "How Keystone Analytics eliminated decision-making from the C-suite"
14. "Pacific Rim Holdings delayed 14 strategic decisions into irrelevance"

**Employee Experience:**
15. "MandatoryFun™ drove a 450% increase in scheduled enjoyment at Crestwood Corp"
16. "How Ironbridge Partners replaced raises with pizza and saw morale metrics improve"

## Whitepapers

**24 total** — 8 strategic (one per solution area) + 16 product-level (2 per solution area). Web pages behind a fake email gate.

### Email Gate Behavior

- Overlay appears on whitepaper page visit
- Email input + "Download" button
- Accepts any string, no validation
- On submit, overlay dismisses, full content revealed
- localStorage flag so returning visitors skip the gate
- No email is stored anywhere

### Section Component Library

| Component | Purpose |
|-----------|---------|
| `WPHero` | Title, subtitle, author(s), read time, solution badge |
| `Prose` | Body text paragraphs |
| `SectionHeader` | Numbered chapter heading |
| `KeyInsight` | Highlighted callout box |
| `DataChart` | Shared with case studies — SVG charts |
| `PullQuote` | Large formatted quote from fictional expert |
| `ComparisonTable` | Side-by-side methodology comparison |
| `MethodologyDiagram` | SVG flowchart/diagram |
| `Sidebar` | Tangential "research" note |
| `Footnotes` | Academic-style footnotes citing nothing real |
| `AuthorBio` | End-of-paper author card with executive headshot |

### Whitepaper Data Shape

```typescript
interface Whitepaper {
  slug: string
  title: string
  subtitle: string
  authors: string[]
  readTime: string
  solutionArea: string
  type: "strategic" | "product"
  sections: WhitepaperSection[]
}
```

### Strategic Whitepapers (8)

1. "The 2026 State of Meeting Optimization: Why Your Calendar Is Your Most Strategic Asset"
2. "Beyond Measurement: A Post-KPI Framework for Enterprise Alignment"
3. "The Middle Management Imperative: Scaling Leadership Without Outcomes"
4. "Productivity Theater and the Performance Paradox: A Strategic Analysis"
5. "Compliance at Scale: Why Policy Volume Correlates With Organizational Confidence"
6. "The Communication Surplus: How Saying More Achieves Less"
7. "Decision Avoidance as Strategy: A Framework for Organizational Patience"
8. "The Employee Experience Equation: Morale, Pizza, and the Illusion of Choice"

### Product-Level Whitepapers (16, 2 per area)

**Meeting Optimization:**
1. "AutoNod Technology: The Neuroscience of Simulated Engagement"
2. "Calendar Saturation Theory: Why Empty Time Slots Are a Liability"

**KPI Alignment:**
3. "Vanity Metrics and the Art of Beautiful Meaninglessness"
4. "GoalPost Shifting: Dynamic Target Management for the Modern Enterprise"

**Middle Management:**
5. "The Synergy Amplification Effect: A Longitudinal Study in Saying Nothing"
6. "Escalation Architecture: Building Pathways That Lead Nowhere"

**Productivity Theater:**
7. "FocusBand™ and the Optics of Deep Work: A Behavioral Analysis"
8. "Task Deferral as Strategic Patience: A New Framework"

**Compliance & Policy:**
9. "The Checkbox Paradox: Compliance Without Comprehension"
10. "Risk Redistribution: A Post-Accountability Model"

**Communication Enhancement:**
11. "Reply-All Economics: The Hidden Value of Organizational Noise"
12. "ToneSoftener AI and the Future of Non-Confrontational Communication"

**Decision Support:**
13. "CoinFlip Methodology: Randomness as Enterprise Strategy"
14. "The Consensus Illusion: Why Agreement Is Overrated"

**Employee Experience:**
15. "Pizza-Driven Retention: A Compensation Alternative Analysis"
16. "The ErgoMax Effect: Posture Surveillance and Organizational Trust"

## Pricing Architecture

### Per-Solution Pricing (on each solution landing page)

3 tiers, consistent naming across all 8 solutions:

| | Essentials | Professional | Enterprise Unlimited |
|--|-----------|-------------|---------------------|
| **Price** | "$2,499/seat/quarter" | "$7,999/seat/quarter" | "Custom — Contact Sales" |
| **Products** | 1-2 base products | All products in suite | All products + dedicated alignment partner |
| **Support** | Self-service knowledge base | Priority synergy support (48hr SLA) | 24/7 white-glove alignment concierge |
| **Extras** | — | Quarterly alignment report | Custom KPI fabrication, executive briefings |

Absurdity scales with tier. Enterprise Unlimited always includes something like "unlimited stakeholder confusion" or "complimentary blame redistribution."

### Master Pricing Page (`/pricing`)

Intentionally incomprehensible. Includes:

1. **"Simple, Transparent Pricing"** headline (it is neither)
2. **Platform tiers** — 4 columns bundling across solution areas:
   - **Starter** — "For teams beginning their alignment journey" — 2 solution areas
   - **Growth** — "For organizations scaling their non-productivity" — 5 solution areas
   - **Transformation** — "Full C.H.A.O.S. Framework™ deployment" — all 8 areas
   - **Singularity** — "For when alignment becomes your entire business model" — all 8 areas + Strategic Void residency + absurd add-ons
3. **Feature comparison matrix** — 40+ rows of meaningless features
4. **Add-ons section** — e.g., "Dedicated Blame Absorption Specialist (+$12,000/quarter)"
5. **Volume discounts** — "10,000+ seats qualify for our Partnership Program™"
6. **FAQ** — e.g., "Can I downgrade?" → "Alignment is a one-way journey. We do not support strategic regression."

## Leadership Page

4 executives with AI-generated headshots (MCP `generate_image_with_person` using reference photos). Absurd old-money consulting partner names, absurd titles, third-person corporate hagiography bios.

| Reference Person | Fake Name | Title | Bio Direction |
|-----------------|-----------|-------|---------------|
| Bill | Maximilian "Max" Thornbury III | Founder & Chief Alignment Officer | Founded Strategic Void in 1987 after realizing most organizations were accidentally productive |
| Brandon | Preston Hawthorne-Clyde | VP of Synergy Operations | Ensures all synergy initiatives remain theoretical |
| Jim | J. Rutherford Pennington | Chief Disruption Evangelist | Has disrupted 14 industries without producing a measurable outcome |
| Sean | Caldwell Ashford-Wexley | Senior Director of Strategic Ambiguity | Ensures all communications achieve maximum opacity |

Real names (Bill, Brandon, Jim, Sean) must NEVER appear on the site — only the fake names above are used in all content including case study quotes, whitepaper author credits, and leadership bios.

Each ExecutiveCard includes: headshot, fake name, title, 2-3 sentence bio, pull quote, absurd credentials.

### People Image Tiers

- **Executive tier** (Bill→Thornbury, Brandon→Hawthorne-Clyde, Jim→Pennington, Sean→Ashford-Wexley with reference photos) — leadership page, case study engagement partner quotes, whitepaper author bios, occasional corporate overlord appearances
- **Worker tier** (AI-generated without reference photos via `generate_image` with descriptive prompts) — testimonials, employee experience pages, case study client quotes, meeting/office scenes

## About Page

- Origin story: founded in 1987 when founder "observed that the most successful organizations spent more time discussing work than doing it"
- Mission statement: corporate-sounding, means nothing
- Values: "Integrity Through Ambiguity," "Relentless Incrementalism," "Stakeholder-First Indecision," etc.
- Company timeline with absurd milestones ("2003: Achieved ISO 9001 certification for our certification process")
- Fake office locations: "New York • London • Singapore • A WeWork in Omaha"

## Methodology Page

The C.H.A.O.S. Framework™ explained with complete seriousness:

- Circular SVG diagram that loops back on itself (the methodology is literally circular reasoning)
- Each letter broken down as a "phase":
  - **C**entralize — "Consolidate all strategic inputs into a single alignment stream"
  - **H**olistic — "Ensure every stakeholder is included regardless of relevance"
  - **A**lign — "Map organizational goals to a unified non-direction"
  - **O**ptimize — "Reduce friction by eliminating measurable outcomes"
  - **S**ystem — "Embed the framework so deeply it becomes indistinguishable from inaction"
- "Proven results" section with MetricCounters
- Certification program teaser: "Become a Certified C.H.A.O.S. Practitioner™"

## Contact Page

- "Schedule an Alignment Assessment" form (name, email, company, company size dropdown with absurd options like "10,000-50,000 alignment stakeholders", message)
- Form submits to nowhere
- "Our offices" section with fake global locations
- "For urgent alignment emergencies, call our 24/7 Synergy Hotline" (Request Callback button)
- Real contact email `bsambrone@gmail.com` in small text on this page only

## Privacy Policy & Terms of Service

Both pages include:
- Authority callout at top: "This site is operated by Specific Industries. The authoritative [privacy policy/terms of service] is available at specificindustries.com/[privacy/terms]."
- Absurdly long satirical content written in corporate-obtuse (not legalese)
- 15-20 sections each

**Privacy Policy tone:**
- "We collect data the way a squirrel collects acorns: compulsively, without clear purpose, and with the vague sense it might be useful later."
- "Your data may be leveraged across our synergy ecosystem to optimize stakeholder alignment outcomes."
- "We retain your data for as long as strategically ambiguous."

**Terms of Service tone:**
- "By existing in the general vicinity of this website, you agree to these terms, all future revisions, and any terms we haven't written yet but intend to."
- "Under no circumstances shall Strategic Void be held responsible for outcomes, non-outcomes, quasi-outcomes, or the philosophical implications of any work performed or not performed."

## New Shared Components

### Layout Components

**MegaMenu** (`src/components/layout/mega-menu.tsx`)
- Full-width dropdown panel on "Solutions" hover/click with 2×4 grid
- Smaller dropdown for "About" (Company, Leadership, Contact)
- Responsive: accordion on mobile
- Theme-aware via CSS variables

### UI Components

**EmailGateForm** (`src/components/ui/email-gate-form.tsx`)
- Overlay with email input + submit
- Accepts any string, no validation
- localStorage flag to skip gate on return visits
- Props: `title`, `subtitle`, `children`

**CaseStudyCard** (`src/components/ui/case-study-card.tsx`)
- Hero stat, company name, solution badge, summary, link
- Props: `slug`, `company`, `heroStat`, `solutionArea`, `summary`

**WhitepaperCard** (`src/components/ui/whitepaper-card.tsx`)
- Title, type badge, solution area, read time, authors, CTA link
- Props: `slug`, `title`, `type`, `solutionArea`, `readTime`, `authors`

**ExecutiveCard** (`src/components/ui/executive-card.tsx`)
- Headshot, name, title, credentials, bio, pull quote
- Props: `name`, `title`, `credentials`, `bio`, `quote`, `image`

**SolutionCard** (`src/components/ui/solution-card.tsx`)
- Icon, solution name, tagline, product count, link
- Props: `name`, `tagline`, `productCount`, `slug`, `icon`

**MetricCounter** (`src/components/ui/metric-counter.tsx`)
- Animated counter on scroll with absurd numbers
- Evaluate existing `AnimatedCounter`/`StatCounter` before building — extend if close
- Props: `value`, `label`, `prefix?`, `suffix?`

**Enterprise PricingTable** (`src/components/ui/enterprise-pricing-table.tsx`)
- Multi-tier with feature comparison rows
- Supports "Contact Sales" pricing, highlighted tier
- Props: `tiers[]`, `features[]`, `highlightedTier?`

### Content Section Components (`src/components/content-sections/`)

New directory for composable sections shared between case studies and whitepapers.

**Case study sections:** `CaseHero`, `Challenge`, `Approach`, `ApproachTimeline`, `ResultsGrid`, `BeforeAfter`, `ExecutiveQuote`, `ClientQuote`, `Callout`

**Whitepaper sections:** `WPHero`, `Prose`, `SectionHeader`, `KeyInsight`, `PullQuote`, `MethodologyDiagram`, `Sidebar`, `Footnotes`, `AuthorBio`

**Shared:** `DataChart` (SVG bar/line/pie/area charts with absurd data, professional styling)

## File Organization

```
src/sites/strategicvoid/
├── config.ts
├── index.ts
├── data/
│   ├── solutions.ts
│   ├── products.ts
│   ├── case-studies/
│   │   ├── index.ts
│   │   └── [16 individual case study data files]
│   ├── whitepapers/
│   │   ├── index.ts
│   │   └── [24 individual whitepaper data files]
│   ├── leadership.ts
│   ├── pricing.ts
│   └── testimonials.ts
├── pages/
│   ├── home.tsx
│   ├── solutions-index.tsx
│   ├── solution-page.tsx
│   ├── product-detail.tsx
│   ├── case-studies-index.tsx
│   ├── case-study-page.tsx
│   ├── whitepapers-index.tsx
│   ├── whitepaper-page.tsx
│   ├── methodology.tsx
│   ├── pricing.tsx
│   ├── about.tsx
│   ├── leadership.tsx
│   ├── contact.tsx
│   ├── privacy.tsx
│   └── terms.tsx
```

Case studies and whitepapers each get individual data files in their own subdirectory, with a barrel `index.ts` that exports arrays and lookup helpers. Renderer components (`case-study-page.tsx`, `whitepaper-page.tsx`) read the section composition from data and render matching components.

## Image Generation Strategy

~70-80 images via MCP server, batched by category during implementation:

- **Executive portraits (4):** `generate_image_with_person` with reference photos, professional corporate headshots
- **Solution hero images (8):** `generate_image`, abstract corporate photography, dark/moody
- **Product images (34+):** `generate_image`, clean product shots on dark backgrounds
- **Case study imagery (16+):** Mix of office environments and executive engagement partner appearances
- **Miscellaneous (~10-15):** Homepage hero, about page, contact page, methodology visuals

## Commerce

No cart system. No `features.commerce` flag.

All purchase paths lead to "Request a Demo" / "Schedule an Alignment Session" / "Contact Sales" — forms that submit to nowhere. The enterprise pricing theater replaces traditional e-commerce.

## Routing Changes

See the "Dynamic Routes" section above for the full integration approach. Summary:

- Extend `DynamicRoute` interface with optional `segments?: string[]` prop and `maxSegments` field (backwards-compatible)
- Update catch-all route to pass remaining path segments when `maxSegments > 1`
- `SolutionRouter` receives segments and determines solution page vs. product detail
- Existing sites are unaffected — their dynamic routes continue to work with single slugs
