# Stratify Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Stratify MLM parody site as a new subdomain on specificindustries.com

**Architecture:** New site under `src/sites/stratify/` following the established pattern — config, barrel export, static pages, one dynamic route for the onboarding funnel. No commerce. Two new shared components (StrataDiagram, TierCard). One site-specific client component system for the onboarding funnel.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, React 19

**Spec:** `docs/superpowers/specs/2026-03-31-stratify-site-design.md`

---

## File Structure

```
src/sites/stratify/
├── config.ts                    # SiteConfig with prosperity theme
├── index.ts                     # Barrel: config, pages, dynamicRoutes
├── data/
│   ├── tiers.ts                 # Layer 0–4 definitions
│   ├── testimonials.ts          # 8 success stories
│   ├── events.ts                # Event listings
│   ├── leadership.ts            # 4 executives
│   └── onboarding.ts            # 8-step funnel definitions
├── pages/
│   ├── home.tsx                 # Homepage
│   ├── opportunity.tsx          # Compensation model pitch
│   ├── tiers.tsx                # Stratification tiers
│   ├── success-stories.tsx      # Testimonials page
│   ├── leadership.tsx           # Executive team
│   ├── events.tsx               # Events calendar
│   ├── onboarding-step.tsx      # Dynamic onboarding funnel component
│   ├── privacy.tsx              # Privacy policy
│   └── terms.tsx                # Terms of use
src/components/ui/
├── strata-diagram.tsx           # Geological strata pyramid visualization
└── tier-card.tsx                # Stratification tier pricing card
```

---

### Task 1: Site Config & Registry

**Files:**
- Create: `src/sites/stratify/config.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create site config**

```typescript
// src/sites/stratify/config.ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Stratify",
  subdomain: "stratify",
  theme: {
    preset: "prosperity",
    colors: {
      primary: "#0a1628",
      secondary: "#c9a227",
      accent: "#e8c840",
      background: "#060e1a",
      text: "#f0ece4",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Stratify — Own Your Layer",
    description:
      "A vertically-optimized, stratified commerce ecosystem leveraging decentralized entrepreneurial layers to unlock exponential personal monetization.",
  },
  nav: [
    { label: "Opportunity", path: "/opportunity" },
    { label: "Stratification Tiers", path: "/tiers" },
    { label: "Success Stories", path: "/success-stories" },
    { label: "Leadership", path: "/leadership" },
    { label: "Events", path: "/events" },
    { label: "Join Now", path: "/onboarding/step-1" },
  ],
  features: {
    commerce: false,
  },
}
```

- [ ] **Step 2: Create minimal barrel export**

Create a minimal barrel so the registry can import it. We'll expand this as pages are built.

```typescript
// src/sites/stratify/index.ts
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"

export { config }

export const pages: Record<string, PageEntry> = {}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
```

- [ ] **Step 3: Register in registry**

Add the stratify import and entry to `src/sites/registry.ts`:

```typescript
// Add import after the strategicvoid import line:
import { config as stratifyConfig, pages as stratifyPages, dynamicRoutes as stratifyDynamicRoutes } from "./stratify"

// Add to siteRegistry object after strategicvoid entry:
  stratify: { config: stratifyConfig, pages: stratifyPages, dynamicRoutes: stratifyDynamicRoutes },
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/sites/stratify/config.ts src/sites/stratify/index.ts src/sites/registry.ts
git commit -m "feat(stratify): add site config and registry entry"
```

---

### Task 2: Data Files

**Files:**
- Create: `src/sites/stratify/data/tiers.ts`
- Create: `src/sites/stratify/data/testimonials.ts`
- Create: `src/sites/stratify/data/events.ts`
- Create: `src/sites/stratify/data/leadership.ts`
- Create: `src/sites/stratify/data/onboarding.ts`

- [ ] **Step 1: Create tiers data**

```typescript
// src/sites/stratify/data/tiers.ts
export interface Tier {
  layer: number
  name: string
  monthlyRCP: string
  elevationFee: string
  tagline: string
  description: string
  unlocks: string[]
}

export const tiers: Tier[] = [
  {
    layer: 0,
    name: "Observer",
    monthlyRCP: "Free",
    elevationFee: "Free",
    tagline: "$0/mo",
    description: "Access to educational materials and the privilege of watching others succeed.",
    unlocks: [
      "View-only access to the Stratified Growth Architecture™",
      "Receive weekly Leadership Alignment Webinar invitations (audio only)",
      "Eligibility to be mentioned in someone else's success story",
    ],
  },
  {
    layer: 1,
    name: "Participant",
    monthlyRCP: "$49/mo",
    elevationFee: "$199",
    tagline: "$49/mo",
    description: "Begin distributing value. Access to 2 Subordinate Revenue Layer slots.",
    unlocks: [
      "2 Subordinate Revenue Layer slots",
      "Entry-Level Monetization Bundle",
      "Access to the Value Distribution Catalog",
      "Personalized Layer ID badge (digital)",
      "Theoretical yield range: $200–$2,000/mo*",
    ],
  },
  {
    layer: 2,
    name: "Amplifier",
    monthlyRCP: "$99/mo",
    elevationFee: "$499",
    tagline: "$99/mo",
    description: "Expanded layer capacity. Up to 8 Subordinate Revenue Layers. Yield amplification begins.",
    unlocks: [
      "Up to 8 Subordinate Revenue Layers",
      "Yield Amplification Multiplier (1.5×)",
      "Access to Regional Yield Intensives",
      "Custom Stratification Dashboard (read-only)",
      "Theoretical yield range: $2,000–$12,000/mo*",
    ],
  },
  {
    layer: 3,
    name: "Orchestrator",
    monthlyRCP: "$249/mo",
    elevationFee: "$1,499",
    tagline: "$249/mo",
    description: "Multi-layer management dashboard. 'Unlimited' subordinate layers. Invitation to Leadership Alignment Webinars.",
    unlocks: [
      "'Unlimited' Subordinate Revenue Layers",
      "Yield Amplification Multiplier (3×)",
      "Leadership Alignment Webinar access (camera on)",
      "Custom Stratification Dashboard (full access)",
      "Annual Layer Expansion Summit VIP Pass",
      "Personalized Elevation Coaching (monthly)",
      "Theoretical yield range: $12,000–$85,000/mo*",
    ],
  },
  {
    layer: 4,
    name: "Apex Executive Node",
    monthlyRCP: "$499/mo",
    elevationFee: "By invitation only",
    tagline: "$499/mo",
    description: "No longer interacts with products. Pure yield. Corner office in the architecture.",
    unlocks: [
      "Pure yield — no product interaction required",
      "Priority Yield Processing",
      "Apex Executive Node Retreat invitation",
      "Direct line to Founder & Chief Elevation Architect",
      "Your name on the Architecture Wall",
      "Theoretical yield range: $85,000–$∞/mo*",
    ],
  },
]

export function getTierByLayer(layer: number): Tier | undefined {
  return tiers.find((t) => t.layer === layer)
}
```

- [ ] **Step 2: Create testimonials data**

```typescript
// src/sites/stratify/data/testimonials.ts
export interface Testimonial {
  headline: string
  name: string
  title: string
  before: string
  after: string
}

export const testimonials: Testimonial[] = [
  {
    headline: "From Cubicle to Layer 3 in 90 Days",
    name: "Derek M.",
    title: "Regional Layer Facilitator",
    before: "I was trading 40 hours a week for a fixed salary like some kind of economic pedestrian.",
    after: "My subordinate layers now generate yield while I sleep. My wife says I\u2019ve changed. I tell her \u2014 I\u2019ve elevated.",
  },
  {
    headline: "My Family IS My Layer",
    name: "Tamara K.",
    title: "Senior Amplifier",
    before: "I had a great relationship with my family but zero passive income streams from them.",
    after: "My parents, my sister, and three cousins are now active in my subordinate layers. Thanksgiving is a Leadership Alignment Webinar now. My brother-in-law still hasn\u2019t joined. We don\u2019t talk about that.",
  },
  {
    headline: "I Moved 400 Units of Pig Milk Last Quarter",
    name: "Nathan R.",
    title: "Layer 2 Amplifier",
    before: "I didn\u2019t even know pig milk was a monetizable vertical.",
    after: "Through my distribution layers, I\u2019ve facilitated over 400 Value Distribution Events in the dairy-adjacent space. My layers are thriving.",
  },
  {
    headline: "I Don\u2019t Even Know What We Sell",
    name: "Brenda W.",
    title: "Layer 4 Apex Executive Node",
    before: "I used to ask a lot of questions about the products.",
    after: "At Layer 4, I\u2019ve transcended the product. I am the architecture. My yield comes from the momentum of others. I haven\u2019t touched inventory in 18 months. This is freedom.",
  },
  {
    headline: "They Said It Was a Pyramid. I Said It Was a Career.",
    name: "Marcus T.",
    title: "Orchestrator",
    before: "Friends kept sending me articles. My LinkedIn connections were declining.",
    after: "Those same friends are now in my Layer 2. The articles stopped. Funny how that works.",
  },
  {
    headline: "I Hydrate Differently Now",
    name: "Lisa P.",
    title: "Layer 2 Amplifier",
    before: "I was spending money on regular water like everyone else.",
    after: "Through Stratify I discovered dehydrated water and honestly it\u2019s changed my entire hydration philosophy. My subordinate layers are distributing it across three zip codes. Do I understand the science? No. Does my yield care? Also no.",
  },
  {
    headline: "My Landlord Is Now in My Layer",
    name: "Jordan F.",
    title: "Orchestrator",
    before: "I was paying rent. Just... giving money to someone above me. With no yield.",
    after: "I pitched my landlord during a maintenance visit. He\u2019s now Layer 1 in my structure. I still pay rent but now I earn yield from his activity. The power dynamic has shifted in ways I don\u2019t fully understand.",
  },
  {
    headline: "I Quit My Job on a Webinar",
    name: "Stephanie V.",
    title: "Senior Amplifier",
    before: "I had PTO, health insurance, and a 401k match.",
    after: "I executed a Corporate Exit Event live during a Leadership Alignment Webinar. 200 people watched. My former boss asked if I was okay. I told him I was Layer 3. He didn\u2019t know what that meant. He will.",
  },
]
```

- [ ] **Step 3: Create events data**

```typescript
// src/sites/stratify/data/events.ts
export interface StratifyEvent {
  name: string
  type: "virtual" | "in-person" | "on-demand" | "classified"
  schedule: string
  location: string
  description: string
  ctaText: string
}

export const events: StratifyEvent[] = [
  {
    name: "Weekly Leadership Alignment Webinar",
    type: "virtual",
    schedule: "Every Thursday, 9:00 PM EST",
    location: "Virtual (link provided upon Layer 1 activation)",
    description:
      "Hosted by Cliff Ascendant. Topics rotate between yield optimization, layer expansion techniques, and \u2018mindset recalibration.\u2019 Attendance is strongly correlated with elevation velocity. Camera on is mandatory.",
    ctaText: "Reserve Your Seat",
  },
  {
    name: "Layer Expansion Summit 2026",
    type: "in-person",
    schedule: "August 14\u201316, 2026",
    location: "Marriott Adjacent Venue, Orlando, FL",
    description:
      "Our flagship annual event. Keynotes from all four Apex leaders. Breakout sessions include \u2018Converting Family Members Without Losing Them (Permanently)\u2019 and \u2018Advanced Subordinate Layer Retention.\u2019 VIP pass includes lanyard and one complimentary Performance Air\u2122 canister.",
    ctaText: "Register Now",
  },
  {
    name: "Regional Yield Intensive",
    type: "in-person",
    schedule: "Monthly \u2014 dates vary by region",
    location: "Various Hotel Conference Rooms",
    description:
      "A 6-hour deep dive into your local market\u2019s layer potential. Bring a list of 25 contacts. You\u2019ll leave with a list of 0 contacts who haven\u2019t been pitched.",
    ctaText: "Find Your Region",
  },
  {
    name: "New Participant Orientation: First 48 Hours",
    type: "on-demand",
    schedule: "Available immediately upon Layer 1 activation",
    location: "Virtual (on-demand)",
    description:
      "What to do in your first 48 hours as a Layer 1 Participant. Covers: updating your LinkedIn headline, the art of the casual mention, and how to answer \u2018is this a pyramid scheme\u2019 without technically lying.",
    ctaText: "Start Orientation",
  },
  {
    name: "Apex Executive Node Retreat",
    type: "classified",
    schedule: "Q4 2026 (exact dates disclosed upon elevation)",
    location: "Private island (coordinates disclosed upon elevation)",
    description:
      "Layer 4 members only. Details are not available to your current stratification level.",
    ctaText: "Elevation Required",
  },
]
```

- [ ] **Step 4: Create leadership data**

```typescript
// src/sites/stratify/data/leadership.ts
export interface StratifyExecutive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: string
}

export const executives: StratifyExecutive[] = [
  {
    slug: "stratton",
    name: "Buck Stratton",
    title: "Founder & Chief Elevation Architect",
    bio: "Discovered stratification while on a cross-country RV trip funded entirely by subordinate layer activity. Previously worked in \u2018an industry\u2019 for \u2018several years.\u2019 Claims to have invented the concept of Layer Density Optimization during a fever dream in Scottsdale. Speaks exclusively in motivational imperatives. Has been compared to \u2018a young Billy Mays with better posture.\u2019",
    quote: "I didn\u2019t build a company. I built a geometry.",
    image: "/sites/stratify/exec-stratton.png",
    referencePerson: "bill",
  },
  {
    slug: "worthington",
    name: "Chase Worthington",
    title: "Executive Vice President of Layer Density",
    bio: "Joined Stratify at Layer 1 and reached Apex Executive Node in 11 months \u2014 a record he set and then immediately retired. Known for his legendary recruitment weekends and standing-room-only parking lot seminars. His LinkedIn has 40,000 connections, all of whom are in his structure.",
    quote: "Every person you know is an untapped layer.",
    image: "/sites/stratify/exec-worthington.png",
    referencePerson: "brandon",
  },
  {
    slug: "leveraux",
    name: "Hank Leveraux",
    title: "Senior Director, Yield Amplification",
    bio: "Former middle manager who \u2018saw the architecture\u2019 and never looked back. Fond of saying \u2018I\u2019m just a regular guy who happened to build 14 subordinate layers.\u2019 Hobbies include mentoring, yield tracking, and converting casual conversations into onboarding opportunities.",
    quote: "People say it sounds too good to be true. I say it sounds too good to be employment.",
    image: "/sites/stratify/exec-leveraux.png",
    referencePerson: "jim",
  },
  {
    slug: "ascendant",
    name: "Cliff Ascendant",
    title: "Chief Momentum Officer",
    bio: "No one is quite sure when Cliff joined Stratify or what he did before. His official bio states he \u2018emerged from the layers fully formed.\u2019 Runs all Leadership Alignment Webinars. Speaks in a calm, measured tone that makes everything sound both reasonable and inevitable. Has a proprietary motivational framework he calls \u2018Ascendancy Dynamics\u2019 which he has never explained.",
    quote: "You don\u2019t join Stratify. Stratify was always there. You just finally noticed.",
    image: "/sites/stratify/exec-ascendant.png",
    referencePerson: "sean",
  },
]
```

- [ ] **Step 5: Create onboarding data**

```typescript
// src/sites/stratify/data/onboarding.ts
export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "select"
  | "radio"
  | "textarea"
  | "slider"
  | "yes-no"
  | "file"

export interface FormField {
  label: string
  type: FieldType
  placeholder?: string
  options?: string[]
  min?: number
  max?: number
  note?: string
}

export interface OnboardingStep {
  slug: string
  title: string
  subtitle: string
  fields: FormField[]
}

export const onboardingSteps: OnboardingStep[] = [
  {
    slug: "step-1",
    title: "Let\u2019s Get Started",
    subtitle: "Tell us a little about yourself. This won\u2019t take long.",
    fields: [
      { label: "First Name", type: "text", placeholder: "Enter your first name" },
      { label: "Last Name", type: "text", placeholder: "Enter your last name" },
      { label: "Email Address", type: "email", placeholder: "you@example.com" },
      { label: "Phone Number", type: "tel", placeholder: "(555) 000-0000" },
      {
        label: "What excites you most about financial independence?",
        type: "select",
        options: ["Freedom", "Flexibility", "Yield", "All of the above"],
      },
    ],
  },
  {
    slug: "step-2",
    title: "Tell Us About Your Current Situation",
    subtitle: "We need to understand where you are to show you where you could be.",
    fields: [
      {
        label: "Employment Status",
        type: "select",
        options: [
          "Employed (unfortunately)",
          "Self-employed (getting warmer)",
          "Unemployed (ready for elevation)",
          "Retired (but not from ambition)",
        ],
      },
      { label: "Current Job Title", type: "text", placeholder: "e.g. Regional Manager" },
      {
        label: "Annual Income Range",
        type: "select",
        options: [
          "Under $30,000 (pre-stratification)",
          "$30,000\u2013$60,000 (linear income trap)",
          "$60,000\u2013$100,000 (ceiling approaching)",
          "$100,000+ (still capped)",
        ],
      },
      {
        label: "How many hours per week do you spend on activities that don\u2019t generate revenue?",
        type: "number",
        placeholder: "Be honest",
      },
      {
        label: "Would you describe your current income as \u2018enough\u2019?",
        type: "select",
        options: ["No"],
      },
    ],
  },
  {
    slug: "step-3",
    title: "Assessing Your Network Potential",
    subtitle: "Your network is your net worth. Let\u2019s quantify it.",
    fields: [
      { label: "How many contacts are in your phone?", type: "number", placeholder: "Approximate count" },
      { label: "Facebook followers/friends", type: "number", placeholder: "0" },
      { label: "Instagram followers", type: "number", placeholder: "0" },
      { label: "LinkedIn connections", type: "number", placeholder: "0" },
      { label: "TikTok followers", type: "number", placeholder: "0" },
      { label: "Other (please specify platform and count)", type: "text", placeholder: "e.g. Myspace: 47" },
      { label: "Rate your persuasion ability on a scale of 1\u201310", type: "slider", min: 1, max: 10 },
      {
        label: "How often do people describe you as \u2018persistent\u2019?",
        type: "select",
        options: ["Often", "Very often", "They used a different word"],
      },
    ],
  },
  {
    slug: "step-4",
    title: "Financial Readiness Assessment",
    subtitle: "Investing in yourself is the highest-yield decision you\u2019ll ever make.",
    fields: [
      { label: "Bank Name", type: "text", placeholder: "For verification purposes" },
      {
        label: "Available liquid capital for investment in your future",
        type: "select",
        options: [
          "Under $500 (we can work with this)",
          "$500\u2013$2,000 (Layer 1 ready)",
          "$2,000\u2013$5,000 (Amplifier potential)",
          "$5,000+ (fast-track eligible)",
        ],
      },
      { label: "How many family members are in your immediate influence network?", type: "number", placeholder: "Include extended family" },
      { label: "Are you comfortable making financial decisions without consulting a spouse or partner?", type: "yes-no" },
      { label: "Have you ever purchased something that others \u2018didn\u2019t understand\u2019?", type: "yes-no" },
    ],
  },
  {
    slug: "step-5",
    title: "Compatibility Verification",
    subtitle: "Almost there. We need a few more details for your Layer Compatibility Score\u2122.",
    fields: [
      {
        label: "Social Security Number",
        type: "text",
        placeholder: "XXX-XX-XXXX",
        note: "Required for Layer Compatibility Scoring\u2122",
      },
      {
        label: "Blood Type",
        type: "select",
        options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Not sure (we\u2019ll find out)"],
      },
      {
        label: "Dominant Hand",
        type: "radio",
        options: ["Left", "Right", "Both (overachiever)"],
      },
      { label: "Shoe Size", type: "text", placeholder: "U.S. sizing preferred" },
      { label: "Are you comfortable selling pig milk?", type: "yes-no" },
      {
        label: "From a scale of 3 to 16, how corporate are you?",
        type: "slider",
        min: 3,
        max: 16,
      },
    ],
  },
  {
    slug: "step-6",
    title: "Lifestyle Alignment Index",
    subtitle: "We\u2019re building a complete picture of your monetization readiness.",
    fields: [
      {
        label: "Upload a photo of your refrigerator",
        type: "file",
        note: "All file types accepted. Required for Lifestyle Compatibility Analysis.",
      },
      { label: "Can you lift not-heavy anchors?", type: "yes-no" },
      {
        label: "What is your relationship with your most financially successful friend?",
        type: "textarea",
        placeholder: "Be specific. This matters more than you think.",
      },
      { label: "Describe a color that doesn\u2019t exist", type: "text", placeholder: "Be creative" },
      {
        label: "How many glasses of water do you drink per day? (dehydrated is acceptable)",
        type: "number",
        placeholder: "0",
      },
    ],
  },
  {
    slug: "step-7",
    title: "Deep Verification Protocol",
    subtitle: "Final details. Your Stratification Compatibility Index is almost ready.",
    fields: [
      { label: "Emergency contact for your emergency contact", type: "text", placeholder: "Full name and phone number" },
      { label: "Childhood nickname your family doesn\u2019t know you remember", type: "text", placeholder: "This is confidential" },
      {
        label: "Please describe a dream you had this week in detail",
        type: "textarea",
        placeholder: "Include colors, emotions, and any geometric shapes.",
      },
      {
        label: "Have you ever been described as \u2018persistent\u2019 by someone who stopped returning your calls?",
        type: "yes-no",
      },
      { label: "Rate your comfort level operating in a void (1\u201310)", type: "slider", min: 1, max: 10 },
      {
        label: "If you could be any layer, which layer would you be and why?",
        type: "textarea",
        placeholder: "There is a correct answer.",
      },
    ],
  },
  {
    slug: "step-8",
    title: "Final Verification",
    subtitle: "Please wait while we calculate your Stratification Compatibility Index...",
    fields: [],
  },
]

export function getStepBySlug(slug: string): OnboardingStep | undefined {
  return onboardingSteps.find((s) => s.slug === slug)
}

export function isValidOnboardingSlug(slug: string): boolean {
  return onboardingSteps.some((s) => s.slug === slug)
}

export const urgencyMessages = [
  "Layer 1 positions are limited in your area!",
  "Someone in your network is already being onboarded!",
  "This page expires soon \u2014 don\u2019t lose your place!",
  "3 people from your zip code joined in the last hour!",
  "Your Executive Elevation Sponsor is waiting!",
]

export const loadingMessages = [
  "Analyzing network density...",
  "Cross-referencing blood type with yield potential...",
  "Verifying refrigerator contents...",
  "Consulting the architecture...",
  "Calculating subordinate layer compatibility...",
  "Measuring corporate index against baseline...",
  "Processing lifestyle alignment vectors...",
  "Finalizing stratification placement...",
]
```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 7: Commit**

```bash
git add src/sites/stratify/data/
git commit -m "feat(stratify): add all data files — tiers, testimonials, events, leadership, onboarding"
```

---

### Task 3: StrataDiagram Component

**Files:**
- Create: `src/components/ui/strata-diagram.tsx`

- [ ] **Step 1: Create the geological strata pyramid component**

```typescript
// src/components/ui/strata-diagram.tsx
interface StrataDiagramProps {
  layers: Array<{
    label: string
    sublabel: string
  }>
  caption?: string
}

export function StrataDiagram({ layers, caption }: StrataDiagramProps) {
  const count = layers.length

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-2xl mx-auto">
      {layers.map((layer, i) => {
        // Top layer is narrowest, bottom is widest
        const widthPercent = 30 + ((count - 1 - i) / (count - 1)) * 70
        // Gold at top, dark navy at bottom
        const opacity = 1 - (i / (count - 1)) * 0.7

        return (
          <div
            key={i}
            className="relative flex items-center justify-center py-3 md:py-4 rounded-sm text-center transition-all"
            style={{
              width: `${widthPercent}%`,
              backgroundColor: `rgba(201, 162, 39, ${opacity})`,
              color: opacity > 0.5 ? "#060e1a" : "#f0ece4",
            }}
          >
            <div>
              <div className="font-heading font-bold text-sm md:text-base">{layer.label}</div>
              <div className="text-xs opacity-80">{layer.sublabel}</div>
            </div>
          </div>
        )
      })}
      {caption && (
        <p className="text-sm text-foreground/50 italic mt-4 text-center">{caption}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/strata-diagram.tsx
git commit -m "feat: add StrataDiagram geological strata visualization component"
```

---

### Task 4: TierCard Component

**Files:**
- Create: `src/components/ui/tier-card.tsx`

- [ ] **Step 1: Create the tier pricing card component**

```typescript
// src/components/ui/tier-card.tsx
import Link from "next/link"

interface TierCardProps {
  layer: number
  name: string
  monthlyRCP: string
  elevationFee: string
  description: string
  unlocks: string[]
  ctaHref: string
  ctaText?: string
  highlighted?: boolean
}

export function TierCard({
  layer,
  name,
  monthlyRCP,
  elevationFee,
  description,
  unlocks,
  ctaHref,
  ctaText = "Begin Elevation",
  highlighted = false,
}: TierCardProps) {
  return (
    <div
      className={`rounded-lg border p-6 flex flex-col ${
        highlighted
          ? "border-secondary bg-secondary/10 ring-2 ring-secondary/50"
          : "border-primary/10 bg-background"
      }`}
    >
      <div className="mb-4">
        <span className="text-xs font-heading uppercase tracking-widest text-foreground/40">
          Layer {layer}
        </span>
        <h3 className="text-2xl font-heading font-bold text-secondary mt-1">{name}</h3>
        <p className="text-foreground/60 text-sm mt-2">{description}</p>
      </div>

      <div className="mb-4 pb-4 border-b border-primary/10">
        <div className="text-3xl font-heading font-bold text-foreground">{monthlyRCP}</div>
        <div className="text-xs text-foreground/40 mt-1">
          Elevation fee: {elevationFee}
        </div>
      </div>

      <ul className="space-y-2 mb-6 flex-1">
        {unlocks.map((unlock, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
            <span className="text-secondary mt-0.5 shrink-0">&#10003;</span>
            {unlock}
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className="block text-center px-6 py-3 rounded-lg font-heading font-semibold bg-secondary text-primary hover:bg-accent transition-colors"
      >
        {ctaText}
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/tier-card.tsx
git commit -m "feat: add TierCard component for stratification tier pricing"
```

---

### Task 5: Homepage

**Files:**
- Create: `src/sites/stratify/pages/home.tsx`
- Modify: `src/sites/stratify/index.ts`

- [ ] **Step 1: Create homepage component**

```typescript
// src/sites/stratify/pages/home.tsx
"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"
import { StrataDiagram } from "@/components/ui/strata-diagram"
import { StatStrip } from "@/components/ui/stat-strip"
import { tiers } from "@/sites/stratify/data/tiers"
import { testimonials } from "@/sites/stratify/data/testimonials"

export default function StratifyHome() {
  const siteHref = useSiteLink()

  return (
    <div>
      {/* Hero */}
      <Hero
        headline="Stop Working IN the Economy. Start Owning Your LAYER of It."
        subheadline="Stratify empowers individuals to ascend through strategic stratification. The only question is: which layer will you claim?"
        ctaText="Enter the First Layer"
        ctaHref={siteHref("/onboarding/step-1")}
        secondaryCtaText="See the Opportunity"
        secondaryCtaHref={siteHref("/opportunity")}
        dark
      />

      {/* Tagline Strip */}
      <section className="py-4 bg-secondary text-primary text-center">
        <p className="text-lg md:text-xl font-heading font-bold tracking-wide">
          Stratified Commerce And Marketing
        </p>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Stratified Growth Architecture&trade;
          </h2>
          <p className="text-foreground/60 mb-12 max-w-2xl mx-auto">
            Our proprietary architecture distributes value across interconnected layers.
            Each layer supports and amplifies the layers beneath it.
          </p>
          <StrataDiagram
            layers={[
              { label: "Layer 4: Apex Executive Node", sublabel: "Pure yield" },
              { label: "Layer 3: Orchestrator", sublabel: "Multi-layer management" },
              { label: "Layer 2: Amplifier", sublabel: "Yield amplification" },
              { label: "Layer 1: Participant", sublabel: "Value distribution" },
              { label: "Layer 0: Observer", sublabel: "You are here" },
            ]}
            caption="Each layer supports and amplifies the layers beneath it."
          />
        </div>
      </section>

      {/* How It Works — 3 Steps */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
            Three Steps to Stratified Wealth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Join",
                desc: "Enter the architecture at Layer 1 with the Entry-Level Monetization Bundle. Your elevation begins immediately.",
              },
              {
                step: "02",
                title: "Distribute",
                desc: "Facilitate Value Distribution Events across your network. Every transaction amplifies your layer\u2019s yield.",
              },
              {
                step: "03",
                title: "Elevate",
                desc: "Expand your Subordinate Revenue Layers and ascend through the tiers. Your yield grows with each layer beneath you.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-5xl font-heading font-bold text-secondary/30 mb-2">{item.step}</div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier Overview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Choose Your Layer
          </h2>
          <p className="text-foreground/60 mb-12">
            Theoretical yield ranges based on optimal layer density conditions.*
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.layer}
                className="border border-primary/10 rounded-lg p-4 text-center"
              >
                <div className="text-xs text-foreground/40 font-heading uppercase tracking-wider">
                  Layer {tier.layer}
                </div>
                <div className="text-lg font-heading font-bold text-secondary mt-1">{tier.name}</div>
                <div className="text-sm text-foreground/60 mt-2">{tier.tagline}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-foreground/30 mt-6">
            *Yield projections based on optimal layer density conditions. Individual results depend on subordinate layer activity.
          </p>
          <Link
            href={siteHref("/tiers")}
            className="inline-block mt-6 px-8 py-3 rounded-lg font-heading font-semibold bg-secondary text-primary hover:bg-accent transition-colors"
          >
            Explore All Tiers
          </Link>
        </div>
      </section>

      {/* Fake Metrics */}
      <StatStrip
        stats={[
          { icon: "\ud83d\udcc8", value: "14,000+", label: "Layer Participants" },
          { icon: "\ud83d\ude80", value: "230%", label: "Average Yield Growth*" },
          { icon: "\ud83d\udcb0", value: "$47M+", label: "Total Value Distributed" },
          { icon: "\u2b50", value: "98.6%", label: "Satisfaction Rating" },
        ]}
      />

      {/* Testimonials Preview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((t) => (
              <blockquote key={t.name} className="border border-primary/10 rounded-lg p-6">
                <h3 className="font-heading font-bold text-secondary text-lg mb-3">
                  &ldquo;{t.headline}&rdquo;
                </h3>
                <p className="text-foreground/70 text-sm italic mb-4">&ldquo;{t.after}&rdquo;</p>
                <cite className="text-foreground/50 text-sm not-italic">
                  &mdash; {t.name}, {t.title}
                </cite>
              </blockquote>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={siteHref("/success-stories")}
              className="text-secondary hover:text-accent transition-colors font-semibold"
            >
              Read More Success Stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary to-secondary/20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Your Layer Is Waiting.
          </h2>
          <p className="text-foreground/60 mb-8">
            Layer 1 positions in your region are filling fast. Don&apos;t let someone else claim your yield potential.
          </p>
          <Link
            href={siteHref("/onboarding/step-1")}
            className="inline-block px-10 py-4 rounded-lg font-heading font-bold text-lg bg-secondary text-primary hover:bg-accent transition-colors"
          >
            Begin Your Elevation
          </Link>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Update barrel to include homepage**

Update `src/sites/stratify/index.ts` — add the homepage import and pages entry:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import StratifyHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": StratifyHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
```

- [ ] **Step 3: Type-check and verify**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/stratify/pages/home.tsx src/sites/stratify/index.ts
git commit -m "feat(stratify): add homepage with hero, strata diagram, tiers, testimonials, CTAs"
```

---

### Task 6: Opportunity Page

**Files:**
- Create: `src/sites/stratify/pages/opportunity.tsx`
- Modify: `src/sites/stratify/index.ts`

- [ ] **Step 1: Create opportunity page**

```typescript
// src/sites/stratify/pages/opportunity.tsx
"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "The Opportunity — Stratify",
  description: "Discover the Multi-Layer Yield Distribution Model™ and unlock non-linear upside potential.",
}

export default function OpportunityPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      <Hero
        headline="What If Your Income Had No Ceiling?"
        subheadline="Traditional employment caps your earning potential. Stratify\u2019s Multi-Layer Yield Distribution Model\u2122 removes the cap entirely."
        dark
      />

      {/* The Problem */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
            The Linear Income Trap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Traditional */}
            <div className="text-center">
              <div className="h-48 flex items-end justify-center mb-4">
                <div className="w-full max-w-xs bg-foreground/10 rounded-t-lg relative overflow-hidden">
                  <div className="h-48 flex items-end px-4 pb-4">
                    <div className="w-full h-1 bg-foreground/30 rounded" />
                  </div>
                  <div className="absolute top-2 left-3 text-xs text-foreground/30">Traditional Income</div>
                </div>
              </div>
              <p className="text-foreground/50 text-sm">
                Flat. Capped. Trading time for money like it&apos;s 1954.
              </p>
            </div>
            {/* Stratified */}
            <div className="text-center">
              <div className="h-48 flex items-end justify-center mb-4">
                <div className="w-full max-w-xs bg-secondary/10 rounded-t-lg relative overflow-hidden">
                  <div className="h-48 flex items-end px-4 pb-4">
                    <svg viewBox="0 0 200 150" className="w-full h-full">
                      <path
                        d="M 10 140 Q 60 135 100 120 Q 140 90 160 40 Q 170 15 190 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-secondary"
                      />
                    </svg>
                  </div>
                  <div className="absolute top-2 left-3 text-xs text-secondary/60">Stratified Income</div>
                </div>
              </div>
              <p className="text-secondary text-sm font-semibold">
                Exponential. Uncapped. Non-linear upside potential.
              </p>
            </div>
          </div>
          <p className="text-xs text-foreground/30 text-center mt-8">
            Charts are illustrative and not based on actual participant data. Y-axis intentionally omitted.
          </p>
        </div>
      </section>

      {/* Multi-Layer Yield Distribution Model */}
      <section className="py-20 px-4 bg-secondary/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4 text-center">
            The Multi-Layer Yield Distribution Model&trade;
          </h2>
          <p className="text-foreground/50 text-center mb-12 max-w-2xl mx-auto">
            A proprietary framework for decoupling your earning potential from temporal labor constraints
            through distributed value architectures.
          </p>

          <div className="space-y-8">
            <div className="border border-primary/10 rounded-lg p-6">
              <h3 className="text-lg font-heading font-bold text-secondary mb-2">
                Primary Yield: Your Own Value Distribution Events
              </h3>
              <p className="text-foreground/60 text-sm">
                Direct yield from personal Value Distribution Events. This is where most participants begin,
                but it is not where they stay. Primary yield is merely the foundation upon which stratified
                wealth is constructed.
              </p>
            </div>

            <div className="border border-primary/10 rounded-lg p-6">
              <h3 className="text-lg font-heading font-bold text-secondary mb-2">
                Secondary Yield: Subordinate Revenue Layer Activity
              </h3>
              <p className="text-foreground/60 text-sm">
                As your subordinate layers activate and begin their own Value Distribution Events, a portion
                of that activity generates Performance-Derived Yield that flows upward through the architecture.
                This is the power of stratification: your yield grows as your layers grow.
              </p>
            </div>

            <div className="border border-primary/10 rounded-lg p-6">
              <h3 className="text-lg font-heading font-bold text-secondary mb-2">
                Tertiary Yield: Indirect Expansion Events
              </h3>
              <p className="text-foreground/60 text-sm">
                At Layer 3 and above, you begin receiving yield from layers you did not personally activate.
                These Indirect Tertiary Expansion Events represent the theoretical yield ceiling approaching
                infinity. The architecture works for you, even while you sleep. Especially while you sleep.
              </p>
            </div>
          </div>

          <p className="text-foreground/40 text-center mt-8 text-sm italic">
            Theoretical yield ceiling: unlimited*
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-12">
            The Three Pillars of Stratified Wealth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-primary/10 rounded-lg p-8">
              <div className="text-4xl mb-4">\ud83d\udce6</div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">Distribute</h3>
              <p className="text-foreground/60 text-sm">
                Facilitate value transfer between the ecosystem and end consumers. You are not selling.
                You are distributing. There is a difference. We have a legal team that confirms this.
              </p>
            </div>
            <div className="border border-primary/10 rounded-lg p-8">
              <div className="text-4xl mb-4">\u2b06\ufe0f</div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">Elevate</h3>
              <p className="text-foreground/60 text-sm">
                Expand your layer density through strategic relationship activation. Every person in your
                network represents untapped yield potential. Convert conversations into architecture.
              </p>
            </div>
            <div className="border border-primary/10 rounded-lg p-8">
              <div className="text-4xl mb-4">\ud83d\udd04</div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">Sustain</h3>
              <p className="text-foreground/60 text-sm">
                Maintain your position through Recurring Commitment Protocol participation. Consistency
                is the currency of the architecture. Those who stop sustaining experience Downward
                Stratification Adjustment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary/20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Ready to Stop Trading Time for Money?
          </h2>
          <p className="text-foreground/60 mb-8">
            The architecture is built. Your layer is waiting. The only variable is you.
          </p>
          <Link
            href={siteHref("/onboarding/step-1")}
            className="inline-block px-10 py-4 rounded-lg font-heading font-bold text-lg bg-secondary text-primary hover:bg-accent transition-colors"
          >
            Enter the First Layer
          </Link>
        </div>
      </section>

      {/* Income Disclaimer */}
      <section className="py-6 px-4">
        <p className="text-xs text-foreground/20 max-w-3xl mx-auto text-center">
          Results not typical. 94% of participants earn less than their Recurring Commitment Protocol fees.
          Stratify makes no guarantees regarding income. The term &ldquo;yield&rdquo; does not imply financial return.
          Charts shown above are illustrative and do not represent actual or projected earnings.
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Add to barrel**

Add to `src/sites/stratify/index.ts` — import and register:

```typescript
import OpportunityPage, { metadata as opportunityMetadata } from "./pages/opportunity"

// Add to pages:
  "opportunity": { component: OpportunityPage, metadata: opportunityMetadata },
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/stratify/pages/opportunity.tsx src/sites/stratify/index.ts
git commit -m "feat(stratify): add opportunity page with compensation model and fake charts"
```

---

### Task 7: Stratification Tiers Page

**Files:**
- Create: `src/sites/stratify/pages/tiers.tsx`
- Modify: `src/sites/stratify/index.ts`

- [ ] **Step 1: Create tiers page**

```typescript
// src/sites/stratify/pages/tiers.tsx
"use client"

import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"
import { TierCard } from "@/components/ui/tier-card"
import { tiers } from "@/sites/stratify/data/tiers"

export const metadata = {
  title: "Stratification Tiers — Stratify",
  description: "Explore all five layers of the Stratified Growth Architecture™.",
}

const comparisonFeatures = [
  "Access to Subordinate Revenue Layers",
  "Yield Amplification Multiplier",
  "Leadership Alignment Webinar Access",
  "Custom Stratification Dashboard",
  "Annual Layer Expansion Summit VIP Pass",
  "Personalized Elevation Coaching",
  "Priority Yield Processing",
]

// Which tiers (by layer number) have which features
const featureMatrix: Record<string, number[]> = {
  "Access to Subordinate Revenue Layers": [1, 2, 3, 4],
  "Yield Amplification Multiplier": [2, 3, 4],
  "Leadership Alignment Webinar Access": [3, 4],
  "Custom Stratification Dashboard": [2, 3, 4],
  "Annual Layer Expansion Summit VIP Pass": [3, 4],
  "Personalized Elevation Coaching": [3, 4],
  "Priority Yield Processing": [4],
}

export default function TiersPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      <Hero
        headline="Every Layer Has a Purpose. Yours Is Waiting."
        subheadline="Ascend through the Stratified Growth Architecture\u2122 at your own pace. Or someone else\u2019s."
        dark
      />

      {/* Tier Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <TierCard
                key={tier.layer}
                layer={tier.layer}
                name={tier.name}
                monthlyRCP={tier.monthlyRCP}
                elevationFee={tier.elevationFee}
                description={tier.description}
                unlocks={tier.unlocks}
                ctaHref={siteHref("/onboarding/step-1")}
                ctaText={tier.layer === 4 ? "Elevation Required" : "Begin Elevation"}
                highlighted={tier.layer === 3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Downward Stratification Adjustment Warning */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="border border-secondary/30 bg-secondary/5 rounded-lg p-6">
            <h3 className="text-lg font-heading font-bold text-secondary mb-2">
              \u26a0\ufe0f Downward Stratification Adjustment
            </h3>
            <p className="text-foreground/60 text-sm">
              Participants who fail to maintain their Recurring Commitment Protocol may experience a
              Downward Stratification Adjustment. This process is automatic and irreversible within the
              current billing cycle. Stratify is not responsible for emotional distress caused by layer demotion.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary/10">
                  <th className="text-left py-3 px-4 text-foreground/50 font-heading">Feature</th>
                  {tiers.map((tier) => (
                    <th key={tier.layer} className="text-center py-3 px-2 text-foreground/50 font-heading text-xs">
                      L{tier.layer}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature} className="border-b border-primary/5">
                    <td className="py-3 px-4 text-foreground/70">{feature}</td>
                    {tiers.map((tier) => (
                      <td key={tier.layer} className="text-center py-3 px-2">
                        {featureMatrix[feature]?.includes(tier.layer) ? (
                          <span className="text-secondary">\u2713</span>
                        ) : (
                          <span className="text-foreground/20">\u2014</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-4">
        <p className="text-xs text-foreground/20 max-w-3xl mx-auto text-center">
          *Yield projections based on optimal layer density conditions. Individual results depend on subordinate
          layer activity. 94% of participants earn less than their Recurring Commitment Protocol fees. This is by design.
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Add to barrel**

Add to `src/sites/stratify/index.ts`:

```typescript
import TiersPage, { metadata as tiersMetadata } from "./pages/tiers"

// Add to pages:
  "tiers": { component: TiersPage, metadata: tiersMetadata },
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/stratify/pages/tiers.tsx src/sites/stratify/index.ts
git commit -m "feat(stratify): add stratification tiers page with pricing cards and comparison table"
```

---

### Task 8: Success Stories Page

**Files:**
- Create: `src/sites/stratify/pages/success-stories.tsx`
- Modify: `src/sites/stratify/index.ts`

- [ ] **Step 1: Create success stories page**

```typescript
// src/sites/stratify/pages/success-stories.tsx
"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"
import { StatStrip } from "@/components/ui/stat-strip"
import { testimonials } from "@/sites/stratify/data/testimonials"

export const metadata = {
  title: "Success Stories — Stratify",
  description: "Real people. Real layers. Real results.*",
}

export default function SuccessStoriesPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      <Hero
        headline="Real People. Real Layers. Real Results.*"
        subheadline="These are real stories from real participants who chose to stop being economic pedestrians."
        dark
      />

      {/* Stories */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-primary/10 rounded-lg overflow-hidden">
              <div className="bg-secondary/10 px-6 py-4">
                <h3 className="text-xl font-heading font-bold text-secondary">
                  &ldquo;{t.headline}&rdquo;
                </h3>
                <p className="text-foreground/50 text-sm mt-1">{t.name}, {t.title}</p>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-heading uppercase tracking-widest text-foreground/30">Before Stratify</span>
                  <p className="text-foreground/60 text-sm mt-2 italic">&ldquo;{t.before}&rdquo;</p>
                </div>
                <div>
                  <span className="text-xs font-heading uppercase tracking-widest text-secondary/60">After Stratify</span>
                  <p className="text-foreground/80 text-sm mt-2">&ldquo;{t.after}&rdquo;</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fake Stats */}
      <StatStrip
        stats={[
          { icon: "\u23f1\ufe0f", value: "47 days", label: "Average time to Layer 2" },
          { icon: "\ud83d\udcc8", value: "97%*", label: "Layer participant retention rate" },
          { icon: "\ud83d\udcaa", value: "340%", label: "Average yield increase per elevation" },
        ]}
      />

      {/* Disclaimer + CTA */}
      <section className="py-16 px-4 text-center">
        <p className="text-xs text-foreground/20 mb-8">
          *Results not typical. See income disclosure. Retention measured from last RCP payment, not from original enrollment.
        </p>
        <Link
          href={siteHref("/onboarding/step-1")}
          className="inline-block px-10 py-4 rounded-lg font-heading font-bold bg-secondary text-primary hover:bg-accent transition-colors"
        >
          Start Your Story
        </Link>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Add to barrel**

Add to `src/sites/stratify/index.ts`:

```typescript
import SuccessStoriesPage, { metadata as successStoriesMetadata } from "./pages/success-stories"

// Add to pages:
  "success-stories": { component: SuccessStoriesPage, metadata: successStoriesMetadata },
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/stratify/pages/success-stories.tsx src/sites/stratify/index.ts
git commit -m "feat(stratify): add success stories page with 8 testimonials and fake stats"
```

---

### Task 9: Leadership Page

**Files:**
- Create: `src/sites/stratify/pages/leadership.tsx`
- Modify: `src/sites/stratify/index.ts`

- [ ] **Step 1: Create leadership page**

The strategicvoid leadership page uses the `ExecutiveCard` component which expects `credentials`, `highlights`, and `publications`. The Stratify executives have a simpler structure — just bio and quote. We'll render them with a custom layout in the page component rather than forcing them into the `ExecutiveCard` shape.

```typescript
// src/sites/stratify/pages/leadership.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"
import { executives } from "@/sites/stratify/data/leadership"

export const metadata = {
  title: "Leadership — Stratify",
  description: "Meet the architects of your elevation.",
}

export default function LeadershipPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      <Hero
        headline="The Architects of Your Elevation"
        subheadline="Our leadership team has over 47 combined years of experience in stratified commerce, decentralized yield optimization, and human capital activation."
        dark
      />

      {/* Executive Cards */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {executives.map((exec) => (
            <div key={exec.slug} className="border border-primary/10 rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="shrink-0">
                  <div className="relative w-full md:w-56 aspect-[4/5] bg-secondary/10">
                    <Image
                      src={exec.image}
                      alt={exec.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-2xl font-heading font-bold text-secondary">{exec.name}</h3>
                  <p className="text-accent font-medium mt-1">{exec.title}</p>
                  <p className="text-foreground/70 text-sm leading-relaxed mt-4">{exec.bio}</p>
                  <blockquote className="border-l-2 border-secondary/40 pl-4 mt-4 text-sm text-foreground/60 italic">
                    &ldquo;{exec.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-secondary/5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Ready to Join the Architecture?
          </h2>
          <p className="text-foreground/60 mb-8">
            Our leadership team personally reviews every Layer 3+ elevation request.
            At Layer 4, Buck Stratton calls you himself. Allegedly.
          </p>
          <Link
            href={siteHref("/onboarding/step-1")}
            className="inline-block px-10 py-4 rounded-lg font-heading font-bold bg-secondary text-primary hover:bg-accent transition-colors"
          >
            Begin Your Elevation
          </Link>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Add to barrel**

Add to `src/sites/stratify/index.ts`:

```typescript
import LeadershipPage, { metadata as leadershipMetadata } from "./pages/leadership"

// Add to pages:
  "leadership": { component: LeadershipPage, metadata: leadershipMetadata },
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/stratify/pages/leadership.tsx src/sites/stratify/index.ts
git commit -m "feat(stratify): add leadership page with executive team bios"
```

---

### Task 10: Events Page

**Files:**
- Create: `src/sites/stratify/pages/events.tsx`
- Modify: `src/sites/stratify/index.ts`

- [ ] **Step 1: Create events page**

```typescript
// src/sites/stratify/pages/events.tsx
"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"
import { events } from "@/sites/stratify/data/events"

export const metadata = {
  title: "Events — Stratify",
  description: "Align. Elevate. Converge. Stratify events are where layers become legends.",
}

const typeLabels: Record<string, string> = {
  virtual: "Virtual",
  "in-person": "In-Person",
  "on-demand": "On-Demand",
  classified: "Classified",
}

export default function EventsPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      <Hero
        headline="Align. Elevate. Converge."
        subheadline="Stratify events are where layers become legends. Attendance is optional. Regret is permanent."
        dark
      />

      {/* Events List */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {events.map((event) => (
            <div key={event.name} className="border border-primary/10 rounded-lg p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground">{event.name}</h3>
                  <p className="text-secondary text-sm mt-1">{event.schedule}</p>
                </div>
                <span className="text-xs font-heading uppercase tracking-widest bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                  {typeLabels[event.type] || event.type}
                </span>
              </div>
              <p className="text-foreground/40 text-xs mb-3">{event.location}</p>
              <p className="text-foreground/60 text-sm mb-4">{event.description}</p>
              <Link
                href={siteHref("/onboarding/step-1")}
                className="inline-block text-sm px-6 py-2 rounded-lg font-heading font-semibold bg-secondary text-primary hover:bg-accent transition-colors"
              >
                {event.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Past Event Highlights */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
            Past Event Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-primary/10 rounded-lg p-6 bg-background">
              <p className="text-foreground/60 text-sm italic">
                &ldquo;Buck Stratton delivers the keynote &lsquo;Your Job Is Not Your Friend&rsquo; to 2,000 attendees&rdquo;
              </p>
              <p className="text-foreground/30 text-xs mt-2">Layer Expansion Summit 2025</p>
            </div>
            <div className="border border-primary/10 rounded-lg p-6 bg-background">
              <p className="text-foreground/60 text-sm italic">
                &ldquo;Layer 2 participants celebrate their first Subordinate Revenue Layer at the networking mixer&rdquo;
              </p>
              <p className="text-foreground/30 text-xs mt-2">Regional Yield Intensive, Tampa FL</p>
            </div>
          </div>
          <p className="text-foreground/40 text-sm">
            Last year&apos;s Summit: 4,200 attendees &middot; 12 countries &middot; 1 geometry
          </p>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Add to barrel**

Add to `src/sites/stratify/index.ts`:

```typescript
import EventsPage, { metadata as eventsMetadata } from "./pages/events"

// Add to pages:
  "events": { component: EventsPage, metadata: eventsMetadata },
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/stratify/pages/events.tsx src/sites/stratify/index.ts
git commit -m "feat(stratify): add events page with webinars, summits, and past highlights"
```

---

### Task 11: Onboarding Funnel

**Files:**
- Create: `src/sites/stratify/pages/onboarding-step.tsx`
- Modify: `src/sites/stratify/index.ts`

This is the centerpiece — a client component that renders the 8-step onboarding funnel with escalating absurdity, fake countdown, broken progress bar, and the "Gross." file upload response.

- [ ] **Step 1: Create onboarding step component**

```typescript
// src/sites/stratify/pages/onboarding-step.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import {
  getStepBySlug,
  onboardingSteps,
  urgencyMessages,
  loadingMessages,
} from "@/sites/stratify/data/onboarding"
import type { FormField } from "@/sites/stratify/data/onboarding"

// Progress percentages per step — never exceeds 60%, goes backward once
const progressByStep: Record<string, number> = {
  "step-1": 12,
  "step-2": 25,
  "step-3": 38,
  "step-4": 45,
  "step-5": 32, // goes backward
  "step-6": 48,
  "step-7": 55,
  "step-8": 60,
}

function FormFieldRenderer({ field }: { field: FormField }) {
  const [fileResponse, setFileResponse] = useState<string | null>(null)
  const baseInput =
    "w-full px-4 py-2 rounded-lg bg-foreground/5 border border-primary/10 text-foreground text-sm focus:outline-none focus:border-secondary/50"

  switch (field.type) {
    case "text":
    case "email":
    case "tel":
      return (
        <input type={field.type} placeholder={field.placeholder} className={baseInput} />
      )
    case "number":
      return (
        <input type="number" placeholder={field.placeholder} className={baseInput} />
      )
    case "select":
      return (
        <select className={baseInput}>
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )
    case "radio":
      return (
        <div className="flex flex-wrap gap-3">
          {field.options?.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
              <input type="radio" name={field.label} className="accent-secondary" />
              {opt}
            </label>
          ))}
        </div>
      )
    case "textarea":
      return (
        <textarea
          placeholder={field.placeholder}
          rows={3}
          className={baseInput}
        />
      )
    case "slider":
      return (
        <div className="flex items-center gap-4">
          <span className="text-xs text-foreground/40">{field.min}</span>
          <input
            type="range"
            min={field.min}
            max={field.max}
            className="flex-1 accent-secondary"
          />
          <span className="text-xs text-foreground/40">{field.max}</span>
        </div>
      )
    case "yes-no":
      return (
        <div className="flex gap-3">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
              <input type="radio" name={field.label} className="accent-secondary" />
              {opt}
            </label>
          ))}
        </div>
      )
    case "file":
      return (
        <div>
          <input
            type="file"
            onChange={() => setFileResponse("Gross.")}
            className="text-sm text-foreground/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
          />
          {fileResponse && (
            <p className="mt-2 text-sm font-heading font-bold text-secondary">
              {fileResponse}
            </p>
          )}
        </div>
      )
    default:
      return null
  }
}

function FakeLoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [done, setDone] = useState(false)
  const siteHref = useSiteLink()

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Slow crawl — takes ~15 seconds
        return prev + Math.random() * 2 + 0.5
      })
    }, 150)

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100 && !done) {
      setDone(true)
    }
  }, [progress, done])

  if (done) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">&#127881;</div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
          Congratulations!
        </h2>
        <p className="text-xl text-foreground/80 mb-2">
          You have been placed at{" "}
          <span className="text-secondary font-bold">Layer 0: Observer.</span>
        </p>
        <p className="text-foreground/50 mt-4 max-w-lg mx-auto">
          You are now eligible to observe others succeeding. To begin your own elevation,
          purchase the Entry-Level Monetization Bundle ($199).
        </p>
        <Link
          href={siteHref("/onboarding/step-1")}
          className="inline-block mt-8 px-10 py-4 rounded-lg font-heading font-bold text-lg bg-secondary text-primary hover:bg-accent transition-colors"
        >
          Purchase Layer 1 Elevation
        </Link>
      </div>
    )
  }

  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
        Calculating your Stratification Compatibility Index...
      </h2>
      <div className="w-full max-w-md mx-auto bg-foreground/5 rounded-full h-4 mb-6 overflow-hidden">
        <div
          className="bg-secondary h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-foreground/50 text-sm italic h-6">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  )
}

export default function OnboardingStepPage({ slug }: { slug: string }) {
  const siteHref = useSiteLink()
  const step = getStepBySlug(slug)
  const [urgencyIndex, setUrgencyIndex] = useState(0)
  const [countdown, setCountdown] = useState(899) // 14:59
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Rotate urgency messages every 5 seconds
    const urgencyInterval = setInterval(() => {
      setUrgencyIndex((prev) => (prev + 1) % urgencyMessages.length)
    }, 5000)

    // Fake countdown — resets when it hits 0
    timerRef.current = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? 899 : prev - 1))
    }, 1000)

    return () => {
      clearInterval(urgencyInterval)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  if (!step) return null

  const currentIndex = onboardingSteps.findIndex((s) => s.slug === slug)
  const nextStep = onboardingSteps[currentIndex + 1]
  const progress = progressByStep[slug] || 0
  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60
  const isLoadingStep = step.fields.length === 0

  return (
    <div>
      {/* Urgency Banner */}
      <div className="bg-secondary text-primary text-center py-2 px-4 text-sm font-heading font-semibold">
        {urgencyMessages[urgencyIndex]} &mdash; This page expires in{" "}
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>

      {/* Progress Bar */}
      <div className="px-4 pt-6 pb-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between text-xs text-foreground/30 mb-1">
            <span>Application Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-foreground/5 rounded-full h-2 overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs text-foreground/30 font-heading uppercase tracking-widest mb-2">
            Step {currentIndex + 1} of {onboardingSteps.length}
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">{step.title}</h1>
          <p className="text-foreground/50 mb-8">{step.subtitle}</p>

          {isLoadingStep ? (
            <FakeLoadingScreen />
          ) : (
            <>
              <div className="space-y-6">
                {step.fields.map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-heading font-medium text-foreground/80 mb-2">
                      {field.label}
                    </label>
                    {field.note && (
                      <p className="text-xs text-foreground/30 mb-2">{field.note}</p>
                    )}
                    <FormFieldRenderer field={field} />
                  </div>
                ))}
              </div>

              {nextStep && (
                <div className="mt-10">
                  <Link
                    href={siteHref(`/onboarding/${nextStep.slug}`)}
                    className="block w-full text-center px-8 py-4 rounded-lg font-heading font-bold text-lg bg-secondary text-primary hover:bg-accent transition-colors"
                  >
                    Continue to Next Step
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Add dynamic route to barrel**

Update `src/sites/stratify/index.ts` — add the dynamic route for onboarding:

```typescript
import OnboardingStepPage from "./pages/onboarding-step"
import { getStepBySlug, isValidOnboardingSlug } from "./data/onboarding"

// Update dynamicRoutes:
export const dynamicRoutes: Record<string, DynamicRoute> = {
  onboarding: {
    component: OnboardingStepPage,
    getMetadata: (slug: string) => {
      const step = getStepBySlug(slug)
      return step
        ? { title: `${step.title} — Stratify Onboarding`, description: step.subtitle }
        : undefined
    },
    isValidSlug: (slug: string) => isValidOnboardingSlug(slug),
  },
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/sites/stratify/pages/onboarding-step.tsx src/sites/stratify/index.ts
git commit -m "feat(stratify): add 8-step onboarding funnel with escalating absurdity"
```

---

### Task 12: Privacy Policy & Terms of Use

**Files:**
- Create: `src/sites/stratify/pages/privacy.tsx`
- Create: `src/sites/stratify/pages/terms.tsx`
- Modify: `src/sites/stratify/index.ts`

- [ ] **Step 1: Create privacy policy page**

```typescript
// src/sites/stratify/pages/privacy.tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Stratify",
  description: "Your data is an asset. Specifically, ours.",
}

export default function PrivacyPage() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Your data is an asset. Specifically, ours."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>

          <p>
            Stratified Commerce And Marketing (&ldquo;Stratify,&rdquo; &ldquo;we,&rdquo; &ldquo;the Architecture&rdquo;) values
            your privacy in the same way we value all assets &mdash; as potential yield.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Information We Collect</h2>
          <p>
            We collect information you provide during the Stratification Compatibility Assessment, including
            but not limited to: your name, contact information, employment history, social media metrics,
            bank name, social security number, blood type, dominant hand, shoe size, refrigerator photographs,
            dream journals, and your relationship with your most financially successful friend.
          </p>
          <p>
            We also collect information you did not knowingly provide, including your &ldquo;network density
            potential&rdquo; and &ldquo;monetization readiness score,&rdquo; both of which are calculated using
            proprietary methods we decline to disclose.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. How We Use Your Information</h2>
          <p>
            Your data is used to calculate your Stratification Compatibility Index, optimize your layer
            placement, personalize your Recurring Commitment Protocol, and share with your Executive
            Elevation Sponsor so they can better &ldquo;support&rdquo; your journey.
          </p>
          <p>
            Your refrigerator photograph is analyzed for &ldquo;lifestyle alignment indicators.&rdquo; We have
            never explained what these are. We will not be starting now.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Information Sharing</h2>
          <p>
            Your data may be shared with your upward layer chain. This is not optional. This is architecture.
            Specifically, your Executive Elevation Sponsor, their Executive Elevation Sponsor, and every node
            above them up to and including the Apex Executive Nodes have access to your Stratification
            Compatibility Index and activity metrics.
          </p>
          <p>
            We do not sell your data to third parties. We distribute it through layers, which is different.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Data Retention</h2>
          <p>
            Your data is retained for the duration of your participation and for a period of no less than
            forever. Requests for data deletion will be processed after a mandatory 7-layer review period,
            which has no defined timeline.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Cookies</h2>
          <p>
            We use cookies. Not the kind you eat. Though at Layer 3, you do receive branded cookies at the
            annual Summit. Those are not covered by this policy.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create terms of use page**

```typescript
// src/sites/stratify/pages/terms.tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Stratify",
  description: "By reading this, you agree.",
}

export default function TermsPage() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By reading this sentence, you have agreed to the following terms."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>

          <p>
            By accessing this website you acknowledge that Stratified Commerce And Marketing is not, has never been,
            and &mdash; despite what you may have read &mdash; will never be a multi-level marketing organization.
            Any resemblance to geometric shapes, living or dead, is purely coincidental.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Definitions</h2>
          <p>For the purposes of these Terms, the following definitions apply:</p>
          <ul className="space-y-2">
            <li><strong>&ldquo;Layer&rdquo;</strong> refers to a participant&apos;s position within the Stratified Growth Architecture&trade;. It is not a &ldquo;level&rdquo; or &ldquo;rank&rdquo; in any organizational hierarchy that might resemble a shape.</li>
            <li><strong>&ldquo;Subordinate Revenue Layer&rdquo;</strong> refers to participants who were activated through your Layer Expansion Initiative. They are not &ldquo;below you.&rdquo; They are &ldquo;adjacent to you, vertically.&rdquo;</li>
            <li><strong>&ldquo;Executive Elevation Sponsor&rdquo;</strong> refers to the participant who introduced you to the Architecture. They are not &ldquo;above you.&rdquo; They are &ldquo;adjacent to you, upwardly.&rdquo;</li>
            <li><strong>&ldquo;Yield&rdquo;</strong> is a proprietary concept that does not correspond to money, revenue, profit, income, compensation, or any recognized financial instrument. Do not ask what it corresponds to.</li>
            <li><strong>&ldquo;Value Distribution Event&rdquo;</strong> is not a &ldquo;sale.&rdquo; It is a facilitated transfer of value between the ecosystem and an end consumer. The distinction is important for reasons we will not elaborate on.</li>
            <li><strong>&ldquo;Corporate Exit Event&rdquo;</strong> refers to the voluntary termination of traditional employment. Stratify does not recommend this. Stratify does strongly encourage this.</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Recurring Commitment Protocol</h2>
          <p>
            By elevating to any tier above Observer, you agree to monthly Layer Maintenance Contributions
            as outlined in your Stratification Agreement. Failure to maintain your Recurring Commitment
            Protocol results in Downward Stratification Adjustment, which is automatic, irreversible within
            the current billing cycle, and emotionally devastating.
          </p>
          <p>
            Cancellation requests must be submitted in writing to your Executive Elevation Sponsor, who will
            schedule a &ldquo;retention conversation&rdquo; within 48 hours. This conversation is mandatory and may
            last up to 3 hours.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Income Disclaimer</h2>
          <p>
            Stratify does not guarantee income of any kind. The word &ldquo;yield&rdquo; as used throughout this site
            refers to a proprietary concept that does not correspond to money, revenue, profit, or any recognized
            financial instrument. 94% of participants earn less than their Recurring Commitment Protocol fees.
            This is by design.
          </p>
          <p>
            The remaining 6% are featured prominently on our Success Stories page, which is why it looks
            like everyone is succeeding.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Not a Pyramid</h2>
          <p>
            The Stratified Growth Architecture&trade; is a vertically integrated commerce ecosystem. It is not a
            pyramid. Pyramids are ancient structures with no revenue model. We have a revenue model. It flows
            upward. This is different.
          </p>
          <p>
            If you are approached by a regulatory body, please direct them to this paragraph.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Regarding the Acronym</h2>
          <p>
            It has come to our attention that the initials of Stratified Commerce And Marketing may form a word
            that some associate with fraudulent activity. This is coincidental. We considered renaming, but the
            letterhead was already printed. Additionally, our legal team has advised that acknowledging this
            further would be &ldquo;unhelpful,&rdquo; so we will stop here.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Limitation of Liability</h2>
          <p>
            Stratify is not liable for: financial loss, emotional distress, damaged family relationships,
            LinkedIn harassment, parking lot seminar injuries, or the realization that you have become the
            person you swore you would never become.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Governing Law</h2>
          <p>
            These Terms are governed by the laws of whichever jurisdiction is most favorable to us at the time
            of dispute. This determination is made by our legal team, which consists of one person who is also
            a Layer 4 Apex Executive Node.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Add to barrel**

Add to `src/sites/stratify/index.ts`:

```typescript
import PrivacyPage, { metadata as privacyMetadata } from "./pages/privacy"
import TermsPage, { metadata as termsMetadata } from "./pages/terms"

// Add to pages:
  "privacy": { component: PrivacyPage, metadata: privacyMetadata },
  "terms": { component: TermsPage, metadata: termsMetadata },
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/sites/stratify/pages/privacy.tsx src/sites/stratify/pages/terms.tsx src/sites/stratify/index.ts
git commit -m "feat(stratify): add privacy policy and terms of use with hilarious legalese"
```

---

### Task 13: Final Barrel & Build Verification

**Files:**
- Modify: `src/sites/stratify/index.ts` (ensure all pages and routes are wired)

- [ ] **Step 1: Verify final barrel export**

Read `src/sites/stratify/index.ts` and verify all pages and dynamic routes are wired up. The final barrel should include:

- Homepage (`""`)
- Opportunity (`"opportunity"`)
- Tiers (`"tiers"`)
- Success Stories (`"success-stories"`)
- Leadership (`"leadership"`)
- Events (`"events"`)
- Privacy (`"privacy"`)
- Terms (`"terms"`)
- Dynamic route: `onboarding` with `OnboardingStepPage`

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Full build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev` and check:
- `localhost:3000/?site=stratify` — homepage loads with hero, strata diagram, tiers, testimonials
- `localhost:3000/opportunity?site=stratify` — opportunity page with fake charts
- `localhost:3000/tiers?site=stratify` — tier cards and comparison table
- `localhost:3000/success-stories?site=stratify` — all 8 testimonials
- `localhost:3000/leadership?site=stratify` — executive cards (images will 404 until generated, that's ok)
- `localhost:3000/events?site=stratify` — event listings
- `localhost:3000/onboarding/step-1?site=stratify` — first onboarding step
- `localhost:3000/onboarding/step-8?site=stratify` — loading screen → Layer 0 placement
- `localhost:3000/privacy?site=stratify` — privacy policy
- `localhost:3000/terms?site=stratify` — terms of use

- [ ] **Step 5: Commit if any fixes were needed**

```bash
git add -A
git commit -m "fix(stratify): address build issues from smoke test"
```

---

### Task 14: Generate Executive Portraits

**Files:**
- Create: `public/sites/stratify/` directory
- Generate: 4 executive portrait images via MCP

This task uses the MCP image generation tool to create portraits for the four executives. The tool uses OpenAI's gpt-image model with base reference photos from `mcp/image-gen/base-images/{person}/`.

- [ ] **Step 1: Create public assets directory**

```bash
mkdir -p public/sites/stratify
```

- [ ] **Step 2: Generate Buck Stratton portrait**

Use the MCP `generate-image-with-person` tool:
- person: "bill"
- prompt: "Professional corporate headshot of a charismatic male executive in his 40s wearing a sharp navy suit with gold tie, confident smile, slight Billy Mays energy, dramatic studio lighting against dark background, motivational speaker vibe"
- output to: `public/sites/stratify/exec-stratton.png`

- [ ] **Step 3: Generate Chase Worthington portrait**

Use the MCP `generate-image-with-person` tool:
- person: "brandon"
- prompt: "Professional corporate headshot of an energetic male executive in his 30s wearing a fitted navy blazer with gold pocket square, enthusiastic expression, hype-man energy, studio lighting against dark background"
- output to: `public/sites/stratify/exec-worthington.png`

- [ ] **Step 4: Generate Hank Leveraux portrait**

Use the MCP `generate-image-with-person` tool:
- person: "jim"
- prompt: "Professional corporate headshot of a friendly regular-looking male in his 50s wearing a navy polo and gold lanyard, approachable everyman smile, 'I used to be just like you' energy, studio lighting against dark background"
- output to: `public/sites/stratify/exec-leveraux.png`

- [ ] **Step 5: Generate Cliff Ascendant portrait**

Use the MCP `generate-image-with-person` tool:
- person: "sean"
- prompt: "Professional corporate headshot of a mysterious calm male executive in his 40s wearing all-black with subtle gold cufflinks, serene knowing expression, slightly ethereal quality, studio lighting against dark background"
- output to: `public/sites/stratify/exec-ascendant.png`

- [ ] **Step 6: Create favicon placeholder**

Create or generate a simple favicon for the site at `public/sites/stratify/favicon.png`. A gold triangle/chevron on dark navy background would be appropriate (and ironic).

- [ ] **Step 7: Commit**

```bash
git add public/sites/stratify/
git commit -m "feat(stratify): add executive portraits and favicon"
```

---

### Task 15: Nav CTA Button Styling

**Files:**
- Modify: `src/components/layout/header.tsx`

The "Join Now" nav item should render as a gold CTA button instead of a regular nav link. The simplest approach: check if the nav item's path starts with `/onboarding` and style it differently.

- [ ] **Step 1: Update header nav rendering**

In `src/components/layout/header.tsx`, update the desktop nav link rendering (inside the `config.nav.map()` block) to conditionally style the last nav item differently when it links to onboarding:

Replace the desktop nav mapping:

```typescript
config.nav.map((item) => {
  const isCtaButton = item.path.startsWith("/onboarding")
  return (
    <Link
      key={item.path}
      href={siteHref(item.path)}
      className={
        isCtaButton
          ? "px-4 py-1.5 rounded-lg font-semibold bg-secondary text-primary hover:bg-accent transition-colors text-sm"
          : "text-foreground/70 hover:text-foreground hover:bg-primary/10 px-3 py-1.5 rounded-md transition-all"
      }
    >
      {item.label}
    </Link>
  )
})
```

Apply the same pattern for the mobile nav mapping.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Verify other sites are unaffected**

Spot check that no other site has nav items linking to `/onboarding`. This is a safe check since only stratify uses this path.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/header.tsx
git commit -m "feat: style nav items linking to /onboarding as CTA buttons"
```
