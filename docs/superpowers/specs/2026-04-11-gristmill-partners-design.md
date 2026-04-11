# Gristmill Partners — Site Design Spec

**Subdomain:** `gristmill`
**Date:** 2026-04-11
**Status:** Approved

## Overview

Gristmill Partners is a satirical B2B workforce-stabilization firm website. The firm sells training, restructuring, fear engineering, compensation suppression, and environmental-design services to Fortune 500 companies — all of which are transparently weapons for crushing employee morale, but the entire site treats them with the dead-serious register of a 1970s trade-journal vendor ad. The stated customer is management. Employees are the raw material the products are applied to. The humor comes from the disconnect between the gritty industrial corporate voice and what is actually being sold. The site never winks at the camera.

**Scale:** Large. 10 service lines ("arms"), 47 service detail pages, 8 full case study pages, homepage, services index, 10 arm landing pages, about, case studies index, contact, privacy, terms. Approximately 80 pages total. Roughly 80 generated images plus 12 new shared testimonial faces added to the portfolio-wide `public/shared/testimonials/` folder.

## Differentiation from Strategic Void Consulting

Both sites are deadpan corporate satire with mega-menu navigation and multi-segment dynamic routing. Gristmill must feel distinct from strategicvoid on three axes:

- **Register.** Strategicvoid's voice is lofty McKinsey/HBR consulting-speak ("paradigm," "framework," "holistic alignment"). Gristmill's voice is gritty blue-collar HR-vendor prose from a 1970s trade journal — shorter sentences, older words, "workforce," "personnel," "retention volatility," "human capital stabilization," "since the Carter administration." The grizzled-industrialist tone.
- **Visual identity.** Strategicvoid is dark navy/gold 21st-century enterprise. Gristmill is warm 1970s industrial — cream/beige paper, burnt orange, amber, dark umber brown, slab-serif headings, grainy Kodachrome photography, slight vignette, paper texture.
- **Scope focus.** Strategicvoid sells general-purpose strategy consulting (meetings, KPIs, compliance, decisions). Gristmill is narrower and nastier — it is specifically an HR/workforce-stabilization vendor whose product line targets employee morale, compensation, fear, and physical workspace. The two sites do not overlap in product category.

## Site Identity

- **Company name:** Gristmill Partners
- **Subdomain:** `gristmill`
- **Tagline (hero):** "Helping American Industry Grind Employees Into Dust Since 1962."
- **Founded:** 1962, in a converted grain mill in Youngstown, Ohio, by Earl J. Crendon
- **Tone:** Pure deadpan corporate authority in a 1970s trade-journal dialect. Copy reads exactly like a real mid-tier B2B HR vendor brochure. The absurdity is 100% in *what* is being sold, 0% in *how* it is described. No winks, no jokes in the sentence structure, no Onion-style overt irony. When describing products, use phrases like "proven methodology," "battle-tested across nine recessions," "since the Carter administration," "industry-standard," "trusted by the Fortune 500."

## Theme

### Colors

| Token | Value | Usage |
|---|---|---|
| `primary` | `#c4622d` | Burnt orange. CTAs, links, active nav, hero accents, stat highlights |
| `secondary` | `#6b3d1f` | Dark umber brown. Section backgrounds, borders, footer, headers |
| `accent` | `#d4a147` | Mustard amber. Stat numbers, callouts, badge backgrounds |
| `background` | `#f4ead5` | Warm cream / aged paper. Page background |
| `text` | `#2b1e10` | Dark ink brown. Body text, headings |

This palette is visually distinct from every existing site in the portfolio. Strategicvoid is dark navy/gold; gristmill is warm cream/burnt orange/umber. The whole page should feel like a trade journal ad from 1974.

### Fonts

- **Heading:** **Zilla Slab** — a slab serif with mid-century character, heavy enough for trade-journal display work, with slight warmth. Needs to be added to `src/themes/fonts.ts` as a new `next/font/google` declaration. Font key: `zilla-slab`.
- **Body:** **Fraunces** — already loaded in the project. Warm transitional serif, reads like a printed magazine.

### Visual language

Every page should feel printed, not designed. Subtle paper-grain background texture. Section dividers rendered as thin dark-umber double rules. Photos filtered toward warm desaturation (amber cast, slightly washed). Buttons styled as chunky slab-serif labels on burnt-orange fills. Section headings set in all caps or small caps where appropriate. The aesthetic reinforces that Gristmill peaked in the Ford administration and has been coasting ever since.

## Navigation

Uses the existing `MegaMenu` shared component (proven out by strategicvoid) with `megaMenu` set on `SiteConfig`. No new navigation component required.

### Header

- **Logo:** Text-based brass-plaque-style logo reading `GRISTMILL PARTNERS — EST. 1962` in Zilla Slab, on a flat dark-umber pill.
- **Top-level nav items:**
  - **Services** — mega menu (see below)
  - **Case Studies** — direct link to `/case-studies`
  - **About** — direct link to `/about`
  - **Contact** — direct link to `/contact`
- **CTA button (right):** "Request an Engagement" — burnt orange fill, dark text, slab-serif label. Links to `/contact`.

### Mega menu content (10 columns, under "Services")

Opens on hover/click. Wide panel, 5×2 grid layout on desktop (5 columns top row, 5 columns bottom row). Each cell is one service arm with the arm name as heading, one-line tagline, and links to the top 3–4 products in that arm. Bottom bar of the mega menu has a "View All Service Lines →" link to `/services`.

Columns correspond to the 10 arms defined below (section: **Service Arms**). Mobile behavior: collapses to accordion per the existing MegaMenu component's behavior.

### Footer

Four-column layout:

1. **Services** — flat list of all 10 arm names, each linking to its arm landing page
2. **Company** — About, Case Studies, Contact
3. **Offices** — Youngstown OH, Pittsburgh PA, Stamford CT (fake addresses)
4. **Legal** — Privacy, Terms

Bottom bar: `© 1962–2026 Gristmill Partners. All workforces reserved.` plus a small-print tagline `A Gristmill Partners production. Part of the Specific Industries family of firms.` and a second-occurrence of the real email `bsambrone@gmail.com` in small gray text as a fallback.

## Page Map

| Page | Route | Type |
|---|---|---|
| Homepage | `/` | Unique |
| Services index | `/services` | Unique |
| Arm landing (×10) | `/services/[arm]` | Arm template |
| Service detail (×47) | `/services/[arm]/[slug]` | Service template |
| Case Studies index | `/case-studies` | Unique |
| Case Study detail (×8) | `/case-studies/[slug]` | Composed sections |
| About / Leadership | `/about` | Unique (single long-scroll page) |
| Contact | `/contact` | Unique (includes real email `bsambrone@gmail.com` in a "Founder's Office" small-print section) |
| Privacy Policy | `/privacy` | Unique (defers to umbrella policy) |
| Terms of Service | `/terms` | Unique (defers to umbrella terms) |

### Dynamic Routes

Two dynamic route prefixes:

```typescript
dynamicRoutes: {
  "services": {
    component: ServiceRouter,
    getMetadata: (slug, segments) => ...,
    isValidSlug: (slug, segments) => ...,
    maxSegments: 2,
  },
  "case-studies": {
    component: CaseStudyPage,
    getMetadata: (slug) => ...,
    isValidSlug: (slug) => ...,
  },
}
```

`ServiceRouter` behaves like strategicvoid's `SolutionRouter`:
- If `segments.length === 1`: render the arm landing page for `segments[0]`
- If `segments.length === 2`: render the service detail page for `segments[0]/segments[1]`
- Invalid slugs return 404

The existing `DynamicRoute.maxSegments: 2` support (added for strategicvoid) is reused with no modification.

### Route slugs for arms

| Arm name | URL slug |
|---|---|
| Mandatory Learning & Development | `training` |
| Internal Communications Optimization | `communications` |
| Organizational Restructuring Services | `restructuring` |
| Retention Through Ambient Dread | `retention` |
| Performance Management Systems | `performance` |
| Management Enablement | `management` |
| Compensation Suppression Solutions | `compensation` |
| Employee Engagement | `engagement` |
| IT & Tooling | `tooling` |
| Physical Workspace Strategy | `workspace` |

## Service Arms (10)

Each arm has: a name, a nickname (the "Arm"), a URL slug, a tagline, a 2-paragraph overview, a list of products, and a hero image prompt direction.

### 1. Mandatory Learning & Development — The Training Arm

**Slug:** `training`
**Tagline:** "Fill the hours. Empty the head."

**Products (5):**

| Slug | Name | One-line description |
|---|---|---|
| `247-slide-deck` | The 247-Slide Deck | A four-hour, text-only live PowerPoint delivered by a trained speaker reading every slide aloud. No images. No diagrams. No breaks. |
| `nasal-hygiene-webinar` | Professional Nasal Hygiene for the Client-Facing Workforce | Mandatory 8-hour webinar on the proper blowing, wiping, and stowing of nasal tissues in a manner pleasing to clients the workforce will never meet. |
| `gratitude-curriculum` | Certified Gratitude Curriculum | 12-module program teaching employees to feel thankful for the continued existence of shareholders. Graded. |
| `knowledge-retention-nullification` | Knowledge Retention Nullification | Ensures no skill or insight learned during training survives past a 24-hour half-life. |
| `monthly-certification-renewal` | Certification Renewal Every 30 Days | Recurring certification on unchanged material, required for continued employment. |

### 2. Internal Communications Optimization — The Messaging Arm

**Slug:** `communications`
**Tagline:** "Say more. Clarify nothing."

**Products (4):**

| Slug | Name | One-line description |
|---|---|---|
| `all-hands-email` | The All-Hands That Could've Been an Email | Monthly two-hour meeting announcing no major updates. Attendance mandatory. Cameras on. |
| `strategic-ambiguity-newsletter` | Strategic Ambiguity Newsletter | Weekly updates that clarify nothing but measurably increase "alignment." |
| `buzzword-density-maximizer` | Buzzword Density Maximizer | Automatically rewrites internal communications to increase synergy per sentence. |
| `delayed-clarity-initiative` | Delayed Clarity Initiative | Releases important information only after it is no longer actionable. |

### 3. Organizational Restructuring Services — The Reorg Arm

**Slug:** `restructuring`
**Tagline:** "Everything in motion. Nothing in place."

**Products (5):**

| Slug | Name | One-line description |
|---|---|---|
| `perpetual-reorganization-protocol` | The Perpetual Reorganization Protocol | Quarterly reorganizations that render every title meaningless within 90 days. |
| `reporting-line-randomizer` | Reporting Line Randomizer | Monthly randomized reassignment of direct reports for "cross-functional exposure." |
| `seat-migration-program` | The Seat Migration Program | All employees physically relocate desks every six weeks. |
| `title-inflation-engine` | Title Inflation Engine | Every employee becomes a "Senior Principal Lead Associate." No corresponding change in compensation or authority. |
| `org-chart-obfuscation-tool` | Org Chart Obfuscation Tool | Ensures no one — including HR — can determine who reports to whom. |

### 4. Retention Through Ambient Dread — The Fear Arm

**Slug:** `retention`
**Tagline:** "Loyalty through carefully managed uncertainty."

**Products (6):**

| Slug | Name | One-line description |
|---|---|---|
| `ambient-layoff-rumor-service` | The Ambient Layoff Rumor Service | Strategically leaked anonymous Slack messages hinting at restructuring, deployed during record-profit quarters for maximum effect. |
| `peer-benchmarking-reports` | Peer Benchmarking Reports | Monthly reports comparing workforce output against industry leaders such as The Orphan Crushing Factory and Dickensian Dynamics. |
| `gratitude-audits` | Compliance-Grade Gratitude Audits | Surprise one-on-one interviews verifying employee thankfulness on a 1–10 scale. |
| `pride-in-your-station-seminar` | Pride in Your Station Seminar Series | Lunchtime talks on the nobility of accepting one's lot in life. |
| `calendar-placeholder-events` | Calendar Placeholder Events | Random "1:1 — Important" meetings appear on calendars with no agenda, no organizer, and no explanation. |
| `executive-walk-by-program` | Executive Walk-By Program | Leadership silently observing employees without acknowledgment or comment. |

### 5. Performance Management Systems — The Measurement Arm

**Slug:** `performance`
**Tagline:** "If it moves, measure it. If it doesn't move, measure it harder."

**Products (4):**

| Slug | Name | One-line description |
|---|---|---|
| `360-feedback-closed-loop` | 360° Feedback Loop (Closed System) | Feedback circulates indefinitely. No conclusions are ever reached. |
| `goalpost-mobility-framework` | Goalpost Mobility Framework | Targets dynamically adjust upward based on proximity to achievement. |
| `literal-stretch-goals` | Stretch Goals (Literal Edition) | Objectives mathematically impossible within the known laws of time. |
| `underperformance-discovery-engine` | Underperformance Discovery Engine | Identifies high performers and recalibrates expectations upward until they aren't. |

### 6. Management Enablement — The Middle Management Arm

**Slug:** `management`
**Tagline:** "Responsibility without authority. Authority without accountability."

**Products (4):**

| Slug | Name | One-line description |
|---|---|---|
| `escalation-buffer-training` | Manager Escalation Buffer Training | Teaches managers to absorb complaints and convert them into inaction. |
| `calendar-saturation-protocol` | Calendar Saturation Protocol | Ensures 92% of manager time is spent in meetings about other meetings. |
| `delegation-without-authority` | Delegation Without Authority Certification | Program for assigning responsibility without decision-making power. |
| `take-this-offline-toolkit` | The "Let's Take This Offline" Toolkit | Advanced techniques for permanently killing conversations in real time. |

### 7. Compensation Suppression Solutions — The Raise-Denial Arm

**Slug:** `compensation`
**Tagline:** "Fair pay, properly contextualized."

**Products (5):**

| Slug | Name | One-line description |
|---|---|---|
| `shareholder-empathy-curriculum` | The Shareholder Empathy Curriculum | Training that walks employees through the true cost of a superyacht's barnacle removal. |
| `raise-deflection-workshop` | Raise Deflection Role-Play Workshop | Manager training for redirecting compensation conversations into "growth opportunities." |
| `hedonic-treadmill-benefits` | The Hedonic Treadmill Benefits Package | Benefits that technically exist but require submitting Form 47-B in triplicate to an office that closed in 1994. |
| `market-adjustment-explanation-portal` | Market Adjustment Explanation Portal | Self-service portal explaining why prevailing market rates do not apply at your company. |
| `equity-vesting-mirage` | Equity Vesting Mirage | Stock grants that vest emotionally but not financially. |

### 8. Employee Engagement — The Fun Arm

**Slug:** `engagement`
**Tagline:** "Camaraderie, mandatory."

**Products (4):**

| Slug | Name | One-line description |
|---|---|---|
| `mandatory-fun-week` | Mandatory Fun Week | Week of enforced recreational activities. Participation tracked and factored into performance reviews. |
| `corporate-trivia-career-impacting` | Corporate Trivia Night (Career-Impacting) | Wrong answers logged permanently in the HR system. |
| `icebreaker-generator` | Icebreaker Question Generator | "If you were a spreadsheet function, which would you be and why?" |
| `smile-compliance-monitoring` | Smile Compliance Monitoring | Optional camera-based enthusiasm tracking with soft targets. |

### 9. IT & Tooling — The Friction Arm

**Slug:** `tooling`
**Tagline:** "Technology that works against you, consistently."

**Products (4):**

| Slug | Name | One-line description |
|---|---|---|
| `sso-multi-failure` | Single Sign-On (Multi-Failure Edition) | One login, many ways it does not work. |
| `vpn-latency-enhancement` | VPN Latency Enhancement Suite | Ensures every task feels geographically distant. |
| `ticket-routing-labyrinth` | Ticket Routing Labyrinth | Support tickets loop between departments indefinitely. |
| `auto-update-critical-work` | Auto-Update During Critical Work | System updates triggered exclusively at peak productivity moments. |

### 10. Physical Workspace Strategy — The Environment Arm

**Slug:** `workspace`
**Tagline:** "The building itself is the intervention."

**Products (6):**

| Slug | Name | One-line description |
|---|---|---|
| `standing-desk-mandate` | The Standing Desk Mandate | All chairs removed. Marketed under wellness. |
| `break-room-decommissioning` | Break Room Decommissioning Consulting | Closes break rooms and reclassifies them as "collaboration zones with no furniture." |
| `open-office-acoustics` | Open Office Acoustic Amplification | Sound travels better than physics allows. |
| `hot-desk-hunger-games` | Hot Desk Hunger Games | First-come first-served seating with strategic scarcity. |
| `temperature-variance-initiative` | Temperature Variance Initiative | Simultaneously too hot and too cold depending on location. |
| `lighting-inconsistency-program` | The Lighting Inconsistency Program | Flicker-based productivity challenges. |

**Arm totals:** Training 5 · Communications 4 · Restructuring 5 · Retention 6 · Performance 4 · Management 4 · Compensation 5 · Engagement 4 · Tooling 4 · Workspace 6 = **47 products**.

## Homepage Sections

Rendered as a single long-scroll page at `/` with the following sections top to bottom. Uses existing shared components wherever possible (Hero, FeatureSection, etc.) styled by CSS variables.

1. **Hero** — Industrial lobby image with a brass Gristmill plaque, unhappy employees walking past. Headline: *"Helping American Industry Grind Employees Into Dust Since 1962."* Sub: *"Gristmill Partners is the trusted name in workforce stabilization, retention engineering, and compensation dampening for the Fortune 500."* Primary CTA: "Request an Engagement" → `/contact`. Secondary CTA: "View Our Service Lines" → `/services`.
2. **Mission paragraph band** — One long deadpan trade-journal paragraph on a cream background with a burnt-orange leading drop cap. Explains what Gristmill does in the voice of a man who has been running the company since 1962.
3. **By the Numbers** — Four-stat band in slab-serif amber:
   - *64 Years in Business*
   - *8,400+ Engagements Delivered*
   - *$2.3B in Wage Growth Prevented*
   - *92% Retention via Learned Helplessness*
4. **The Ten Arms** — 10-card grid (5 columns × 2 rows on desktop) showing each service arm with a small sepia icon/photo, arm name, tagline, and a link to `/services/[arm]`. This is the main catalog entry point from the homepage.
5. **Our Approach** — 3-column feature strip: *Proven Methodology* / *Measurable Disengagement* / *Discreet Implementation*. Each column has a tiny slab-serif icon and one dense paragraph.
6. **Featured Case Study** — A large single card pulling one case study (default: The Orphan Crushing Factory) to the front. Displays fake client logo, a one-line outcome ("Reduced voluntary turnover by 94%. The remaining 6% could not afford to leave."), and a link to the full case study.
7. **Trusted by Industry Leaders** — Grayscale fake client logo strip: *The Orphan Crushing Factory · Dickensian Dynamics · Rustbelt Holdings LLC · Meridian Coal & Data · Throckmorton Industrial Group · Helix-Fane Shareholder Services · Grassmere Acoustics · Pemberton-Shale Refining*.
8. **Testimonials** — 3-card row. Each card is a quote from a client **executive** (never an employee) expressing satisfaction. Photos pulled from `public/shared/testimonials/`. Quotes in the voice of a CFO who has just seen his bonus line item.
9. **Founder's Letter Teaser** — Small two-column section. Left: portrait of Earl J. Crendon (Bill in 1970s industrialist drag). Right: one-paragraph excerpt from "A Letter from the Founder" with "Continue Reading →" linking to the Letter block on the About page.
10. **Closing CTA band** — Full-width burnt-orange band at the bottom with headline *"Ready to Reduce Workforce Volatility?"* and a single "Request an Engagement" button.

## Services Index Page (`/services`)

- **Hero** — warehouse-of-filing-cabinets wide shot with headline *"Our Service Lines."*
- **Intro paragraph** — one paragraph of trade-journal prose framing the catalog.
- **Arm grid** — 10 cards, one per arm, in a 2-column or 3-column grid. Each card includes arm name, tagline, product count, small representative image, and a link to `/services/[arm]`.
- **CTA band** at the bottom — "Not sure where to start? Request an engagement and we'll assess your workforce's volatility baseline."

## Arm Landing Page Template (`/services/[arm]`)

Rendered by `ArmPage` component from a data object. Structure:

1. **Hero** — Arm name, tagline, hero image (the arm-specific image from the image budget). Dark-umber band with cream text.
2. **Overview** — 2–3 paragraphs of deadpan prose describing the arm's methodology.
3. **Product Grid** — Cards for each product in this arm. Each card shows product name, one-line description, small image, and link to `/services/[arm]/[slug]`.
4. **Related Case Studies** — 1–2 CaseStudyCards pulled from the case studies that reference this arm's products.
5. **CTA** — "Request an Engagement" band.

## Service Detail Page Template (`/services/[arm]/[slug]`)

Rendered by `ServiceDetailPage` component from a service data object. Structure:

1. **Hero** — Service name, tagline, hero image.
2. **Description** — 2–3 paragraphs of deadpan full product copy in trade-journal dialect.
3. **What's Included** — Bulleted list of "deliverables" (absurd in substance, corporate in format).
4. **Engagement Model** — Short block describing how the service is deployed (e.g., "Delivered on-site over 4–6 weeks by a Gristmill Workforce Engineer").
5. **Proof Points** — 2–3 stat callouts specific to this service.
6. **Related Services** — 2–3 other products from the same arm.
7. **CTA** — "Request an Engagement" band.

## Data Shapes

### Service

```typescript
interface Service {
  slug: string
  armSlug: string        // references ServiceArm.slug
  name: string
  tagline: string
  shortDescription: string
  description: string[]  // paragraphs of deadpan copy
  deliverables: string[] // bullet points
  engagementModel: string
  proofPoints: { value: string; label: string }[]
  image: string
}
```

### ServiceArm

```typescript
interface ServiceArm {
  slug: string
  name: string           // "Mandatory Learning & Development"
  nickname: string       // "The Training Arm"
  tagline: string
  overview: string[]     // paragraphs
  image: string
  productSlugs: string[] // references Service.slug
}
```

### Case Study

```typescript
interface CaseStudy {
  slug: string
  company: string          // fake client name
  industry: string
  location: string         // fake city/state
  heroStat: { value: string; label: string }
  engagedArms: string[]    // references ServiceArm.slug
  sections: CaseStudySection[]
}

type CaseStudySection =
  | { kind: "challenge"; paragraphs: string[] }
  | { kind: "engagement"; intro: string; products: string[] /* service slugs */ }
  | { kind: "timeline"; phases: { name: string; description: string }[] }
  | { kind: "metrics"; stats: { value: string; label: string }[] }
  | { kind: "quote"; body: string; attribution: string; role: string; photoSlug: string }
  | { kind: "outcome"; paragraphs: string[] }
```

Reuses the composable section pattern strategicvoid proved out. Renderer component maps each `kind` to a matching section component.

## Case Studies (8)

Full pages at `/case-studies/[slug]`. Each page renders a fixed hero band (drawn from the case study's top-level `company`, `industry`, `location`, and `heroStat` fields) followed by an ordered composition of the six section kinds defined in the data shape above — Challenge, Engagement, Timeline, Metrics, Quote, Outcome. Every case study uses all six kinds at least once.

| # | Slug | Client | Location | Engaged Arms | Headline |
|---|---|---|---|---|---|
| 1 | `orphan-crushing-factory` | The Orphan Crushing Factory | Youngstown, OH | restructuring, retention | Reduced voluntary turnover to 0.2% using the Perpetual Reorganization Protocol and the Pride in Your Station Seminar Series. |
| 2 | `dickensian-dynamics` | Dickensian Dynamics | Hartford, CT | management, communications | Regional insurance firm deploys the Calendar Saturation Protocol and achieves 94% meeting density across all workdays. |
| 3 | `throckmorton-industrial-group` | Throckmorton Industrial Group | Gary, IN | compensation | Steel holding company eliminates 100% of raise requests through the Shareholder Empathy Curriculum. |
| 4 | `meridian-coal-data` | Meridian Coal & Data | Wheeling, WV | retention | Energy conglomerate rolls out the Ambient Layoff Rumor Service during a record-profit quarter and sees "unprecedented gratitude." |
| 5 | `helix-fane-shareholder-services` | Helix-Fane Shareholder Services | Stamford, CT | training | Financial services firm uses the 247-Slide Deck to fill an entire fiscal year with training hours. |
| 6 | `rustbelt-holdings` | Rustbelt Holdings LLC | Akron, OH | performance | 40-year Gristmill client adopts the Stretch Goals (Literal Edition) framework and sets 14 mathematically impossible Q3 objectives. |
| 7 | `pemberton-shale-refining` | Pemberton-Shale Refining | Bakersfield, CA | engagement | Refinery deploys Smile Compliance Monitoring and discovers 63% of staff were "not smiling with sufficient conviction." |
| 8 | `grassmere-acoustics` | Grassmere Acoustics | Lowell, MA | workspace | Mid-size manufacturer redesigns its entire office around Open Office Acoustic Amplification and reports "a new level of ambient despair." |

### Case Studies Index (`/case-studies`)

- **Hero** — single band with headline "Client Engagements."
- **Intro paragraph** — one paragraph of trade-journal prose about Gristmill's 60-year engagement history.
- **Grid** — 8 cards, one per case study, each showing client logo, industry tag, location, headline outcome, and a link.

## About Page (`/about`)

Single long-scroll page. Structure:

1. **Hero** — Mahogany boardroom photo. Headline: *"Sixty-Four Years of Workforce Stabilization."* Sub: *"Gristmill Partners has been privately held, family-operated, and deeply resistant to change since 1962."*
2. **Our Story** — One long paragraph in trade-journal prose. Covers the 1962 founding in Youngstown, the founder's previous career at a regional steel concern, the founding thesis ("the American worker had become insufficiently afraid"), and the firm's self-conception as a caretaker of the Fortune 500's discipline budget.
3. **Our History** — Vertical timeline using the shared Timeline component, styled with dark-umber rules and amber accent dots. Milestones:
   - *1962* — Earl J. Crendon founds Gristmill Partners in a converted grain mill in Youngstown, Ohio. First engagement: a 40-page internal memo.
   - *1968* — Gristmill launches the 247-Slide Deck.
   - *1974* — Opens the Pittsburgh office.
   - *1981* — Develops the Perpetual Reorganization Protocol in response to the Reagan administration.
   - *1993* — Pioneers the Buzzword Density Maximizer at a Cincinnati aluminum plant.
   - *2001* — Rebrands "layoffs" as "strategic realignments." Rebrand remains in industry-wide use.
   - *2008* — Reports record growth during the financial crisis.
   - *2020* — Releases a Remote Work Suppression Suite. Product cancelled after one quarter.
   - *2026* — Earl J. Crendon celebrates his 64th year in the founder's chair.
   - *Today* — Serves 400+ Fortune 500 and privately held clients across every sector of the American economy.
4. **A Letter from the Founder** — Long (~400 word) deadpan letter from Earl J. Crendon. References his father, the 1962 founding, concerns about "softening" in the modern workforce, gratitude toward shareholders, a paragraph about watching sunsets from his office in the converted mill. Signed in a wobbly italic script. Renders inside a new `FounderLetter` component (see New Components).
5. **Leadership** — 4 exec cards using the existing `TeamMember` component. One card per exec, each with headshot, name, title, 2–3 sentence bio, and a memorable credential detail. See **Leadership** section below.
6. **Our Values** — 4-column strip: *Discretion · Patience · Measurable Attenuation · Gratitude*. Each with a short paragraph of trade-journal prose.
7. **Corporate Citizenship** — One paragraph about Gristmill's charitable giving described in terms that make the reader uncomfortable ("We have funded seventeen rural vocational training centers dedicated to teaching the dignity of repetitive labor"). Small strip of 4–6 fake nonprofit logos.

## Leadership

Four executives. Names fully randomized per portfolio convention (Bill is the founder; all four randomize both first and last names). Real names (Bill, Brandon, Jim, Sean) must NEVER appear on the site.

| Reference | Fake name | Title | Bio direction |
|---|---|---|---|
| Bill | **Earl J. Crendon** | Founder & Chairman Emeritus | Founded Gristmill in 1962 in Youngstown, Ohio. Still occupies the founder's office. Previously a manager at a regional steel concern that no longer exists. Believes the American worker has been in decline since the Eisenhower administration. |
| Brandon | **Theodore "Ted" Brenner** | President & Chief Executive Officer | Runs the firm day-to-day. Holds an MBA from a school that no longer exists. Joined Gristmill in 1989 as an associate and has never worked anywhere else. |
| Jim | **Harold "Hal" Duvane** | Chief Operating Officer & Vice President, Workforce Engineering | Heads field operations. Personally authored 41 employee handbooks, three of which remain legally enforceable. Known internally as "the Hammer," for reasons nobody has clarified. |
| Sean | **Lester "Les" Knippenburg** | Chief Financial Officer & Vice President, Compensation Stabilization | Oversees client billing and the firm's flagship Compensation Suppression practice. Has personally denied more than 12,000 raise requests in his career. Collects antique stopwatches. |

All four exec portraits are rendered via `generate_image_with_person` using the existing reference photos and a shared style prompt: "tungsten-lit 1970s captain-of-industry headshot, warm brown-and-amber palette, slight vignette, subject in a three-piece tweed suit with pocket square, slight smirk, mahogany or steel-mill backdrop, Kodachrome paper-grain texture." Generated via a new `scripts/generate-gristmill-images.ts` script following the existing per-site pattern.

## Contact Page (`/contact`)

1. **Hero** — Stern receptionist photo. Headline: *"Begin an Engagement."* Sub: *"A member of our Workforce Stabilization Team will contact you within three to five business quarters."*
2. **Engagement Request Form** (client-side only, no submission handler):
   - Company Name (text)
   - Number of Employees (dropdown: 100–500 / 500–1,000 / 1,000–5,000 / 5,000+ / "more than I care to count")
   - Primary Workforce Concern (dropdown: Excessive Morale / Raise Requests / Union Activity / General Restlessness / Unauthorized Smiling / Other)
   - Message (textarea)
   - Submit button labeled *"Submit for Review"*
   - On submit: client-side confirmation card reading *"Thank you. Your inquiry has been logged in case #04781-B. A member of the Gristmill team will be in touch within three to five business quarters. Please do not contact us in the interim."*
3. **Our Offices** — 3-column band with three fake office addresses:
   - *Founding Office* — Youngstown, Ohio. Fake street address. Tagline: "In continuous operation since 1962."
   - *Regional Office* — Pittsburgh, Pennsylvania. Fake street address. Tagline: "Opened 1974."
   - *Executive Office* — Stamford, Connecticut. Fake street address. Tagline: "Opened 1989."
   - Fake switchboard number: **1-800-GRISTMILL**.
4. **Founder's Office** — Small band at the bottom, gray small-print text. One line: *"Direct inquiries to the founder may be addressed to bsambrone@gmail.com."* This is the real contact email. It must be discoverable but not prominent.

## Privacy & Terms

Both pages are short. Each follows the portfolio standard:

- **Authority callout** at the top of each page: *"This site is operated by Specific Industries. The authoritative [privacy policy / terms of service] is available at specificindustries.com/[privacy/terms]."* Link out to the umbrella policy.
- **Deadpan one-paragraph framing** in Gristmill's trade-journal voice. Privacy can acknowledge Gristmill collects "workforce volatility indicators." Terms can note that any dispute is governed by the umbrella policy and that Gristmill itself predates most of modern privacy law.
- **No site-specific legal language.** No made-up 15-section satirical terms (that is strategicvoid's bit — gristmill stays clean and short here).

## Image Generation Strategy

Target: approximately 80 images specific to gristmill, plus 12 new shared testimonial portraits added to `public/shared/testimonials/`.

All images generated via a new `scripts/generate-gristmill-images.ts` script following the existing per-site pattern (see `scripts/generate-strategicvoid-images.ts` for reference). Script uses the MCP image generation server and applies a shared style directive to every prompt.

### Shared style directive (applied to every prompt)

"Industrial 1970s commercial photography. Warm browns, beige, amber, burnt orange, cream. Grainy Kodachrome paper-print look, subtle paper texture, slight vignette. Slightly desaturated, warm color cast. Era-appropriate clothing and office equipment — typewriters, filing cabinets, rotary phones, wood paneling, fluorescent tubes, wool three-piece suits, beige phones, steel desks."

When employees appear: slumped shoulders, thousand-yard stares, fake strained smiles that do not reach the eyes, visible defeat in posture.

When managers and executives appear: upright, smug, unsettlingly cheerful, dressed better than the room warrants, often backlit or elevated in frame, looming slightly.

### Image budget breakdown

- **Executive portraits** (4) — Bill + 3 others rendered as 1970s captains of industry per the style prompt above. `generate_image_with_person` with reference photos.
- **Homepage** (6) — Hero (industrial lobby with brass plaque and trudging employees), mission-band accent, 4 section images for mission/approach/case-study-featured/founder-letter-teaser.
- **Services index page** (1) — Warehouse-of-filing-cabinets wide shot.
- **Arm landing page heroes** (10) — One per arm, each following the subject direction in the service arms section. See **Service Arms** table for per-arm subject matter.
- **Service detail hero images** (47) — One per service. These can lean simpler than arm heroes — stylized editorial photo composites or still lifes. Implementation can batch these and fall back to the parent arm hero if any individual generation fails.
- **About page** (3) — Mahogany boardroom wide shot, "founded in 1962" archival-style photo of the original grain mill, grinding-stone mill wheel closeup.
- **Case studies** (8) — One hero image per case study, each depicting the client's fictional workforce in mid-engagement (e.g., a beaten-down insurance office, a refinery break room during Smile Compliance Monitoring).
- **Contact page** (1) — Stern receptionist at an oak reception desk.

Approximate total: 4 + 6 + 1 + 10 + 47 + 3 + 8 + 1 = **80 gristmill-specific images**.

### Shared testimonial faces (portfolio-wide benefit)

Currently `public/shared/testimonials/` holds 16 faces. Add **12 new faces** via a one-time shared-faces generation pass. These faces must be:

- Neutral studio headshots (not pre-themed for gristmill).
- Skewed toward middle-aged white-collar workers — the gristmill target demographic.
- Demographically varied in age, gender, ethnicity.
- Natural-looking, plausible corporate professionals, framed consistently with the existing 16.

New faces land in `public/shared/testimonials/` and become immediately available to every site in the portfolio. Gristmill uses them for case study executive quotes and homepage testimonials.

## New Components

The site is architecturally similar to strategicvoid, so most components already exist and only need to be driven by gristmill's theme variables. New additions:

### FounderLetter

`src/components/ui/founder-letter.tsx`

Renders a long body of text as if it were a scanned typewritten letter on aged paper. Visual treatment: slightly rotated paper background, serif body copy, a signature block at the bottom rendered in a handwritten-style font or as a signature image. Used on the About page. Props:

```typescript
interface FounderLetterProps {
  recipient?: string        // e.g., "To Our Clients and Friends"
  body: string[]            // array of paragraphs
  signatureName: string     // e.g., "Earl J. Crendon"
  signatureTitle: string    // e.g., "Founder & Chairman Emeritus"
  signatureImage?: string   // optional path to scanned-signature asset
}
```

This is the only new shared component the spec requires. Everything else (Hero, FeatureSection, ProductCard, Timeline, TeamMember, MegaMenu, CaseStudyCard, content section renderers) should already exist from prior sites and be theme-driven via CSS variables.

### Font addition

Add **Zilla Slab** to `src/themes/fonts.ts`. Steps:

1. Import `Zilla_Slab` from `next/font/google`.
2. Declare the font instance with `variable: "--font-zilla-slab"`.
3. Add `"zilla-slab"` to the `fontInstanceMap`.
4. Add `"zilla-slab": "'Zilla Slab', serif"` to `fontFamilyMap`.
5. Use `"zilla-slab"` as `theme.fonts.heading` in gristmill's config.

## File Organization

```
src/sites/gristmill/
├── config.ts
├── index.ts
├── data/
│   ├── arms.ts               // ServiceArm[] — 10 arms
│   ├── services.ts           // Service[] — 47 products
│   ├── case-studies/
│   │   ├── index.ts          // export cases array + lookup helpers
│   │   └── [8 individual case study data files]
│   ├── leadership.ts         // 4 execs
│   └── history.ts            // timeline milestones for About page
└── pages/
    ├── home.tsx
    ├── services-index.tsx
    ├── arm-page.tsx          // used by ServiceRouter (1-segment path)
    ├── service-detail.tsx    // used by ServiceRouter (2-segment path)
    ├── service-router.tsx    // dispatches based on segment count
    ├── case-studies-index.tsx
    ├── case-study-page.tsx   // reads composed sections from data
    ├── about.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx
```

## Commerce

No cart system. `features.commerce: false`. Every CTA across the site routes to `/contact`. No pricing is displayed anywhere. The "Request an Engagement" language replaces any traditional e-commerce flow.

## Registry Registration

Add gristmill to `src/sites/registry.ts`:

```typescript
import {
  config as gristmillConfig,
  pages as gristmillPages,
  dynamicRoutes as gristmillDynamicRoutes,
} from "./gristmill"

// in siteRegistry:
gristmill: {
  config: gristmillConfig,
  pages: gristmillPages,
  dynamicRoutes: gristmillDynamicRoutes,
},
```

## Out of Scope

Explicitly not part of this site design:

- Whitepapers / Resources section (strategicvoid handles that pattern; gristmill stays focused).
- Pricing pages (no pricing is ever shown).
- Commerce / cart / checkout.
- Blog or news section.
- Customer login / portal.
- Search.
- Satirical 15-section legal pages (strategicvoid does that; gristmill defers to the umbrella).
