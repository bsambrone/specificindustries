# The Clean Sheet — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Clean Sheet satirical laundromat site — an upscale boutique laundromat that keeps denying it's a money laundering front.

**Architecture:** New site module at `src/sites/cleansheet/` following existing patterns. 7 static pages, no commerce, no dynamic routes. Uses shared components (Hero inline, MetricCounter, ExecutiveCard, TestimonialGrid, FaqAccordion). Contact page has a `"use client"` satirical intake form.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-04-06-cleansheet-site-design.md`

---

### Task 1: Site Config & Registry

**Files:**
- Create: `src/sites/cleansheet/config.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create site config**

```typescript
// src/sites/cleansheet/config.ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "The Clean Sheet",
  subdomain: "cleansheet",
  theme: {
    preset: "clinical",
    colors: {
      primary: "#2C3E50",
      secondary: "#3498DB",
      accent: "#3498DB",
      background: "#FFFFFF",
      text: "#2C3E50",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "The Clean Sheet — Definitely Not Money Laundering. Just Laundering.",
    description:
      "Premium fabric care for discerning clients since 1987. We clean clothes. That's it. Please stop asking.",
  },
  nav: [
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Leadership", path: "/leadership" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
}
```

- [ ] **Step 2: Create minimal barrel to test registration**

```typescript
// src/sites/cleansheet/index.ts
import { config } from "./config"
import type { PageEntry } from "@/themes"

export { config }

export const pages: Record<string, PageEntry> = {
  "": () => null, // placeholder, replaced in Task 2
}
```

- [ ] **Step 3: Register in site registry**

Add to `src/sites/registry.ts`:

Import line (add after the elderparty import):
```typescript
import { config as cleansheetConfig, pages as cleansheetPages } from "./cleansheet"
```

Registry entry (add after elderparty entry):
```typescript
  cleansheet: { config: cleansheetConfig, pages: cleansheetPages },
```

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 5: Test in browser**

Run: `npm run dev`
Visit: `http://localhost:3000/?site=cleansheet`
Expected: Blank page with header/footer showing "The Clean Sheet" branding with correct colors.

- [ ] **Step 6: Commit**

```bash
git add src/sites/cleansheet/config.ts src/sites/cleansheet/index.ts src/sites/registry.ts
git commit -m "feat(cleansheet): add site config and registry entry"
```

---

### Task 2: Data Files — Services, Leadership, Testimonials

**Files:**
- Create: `src/sites/cleansheet/data/services.ts`
- Create: `src/sites/cleansheet/data/leadership.ts`
- Create: `src/sites/cleansheet/data/testimonials.ts`

- [ ] **Step 1: Create services data**

```typescript
// src/sites/cleansheet/data/services.ts

export interface Service {
  slug: string
  name: string
  price: string
  tagline: string
  description: string
  includes: string[]
}

export interface LoyaltyTier {
  name: string
  range: string
  description: string
}

export const services: Service[] = [
  {
    slug: "fresh-start",
    name: "The Fresh Start",
    price: "$5,000/load",
    tagline: "Everyone deserves a clean beginning.",
    description:
      "Our entry-level service. We take your dirtiest items and return them spotless. No questions asked about where the stains came from.",
    includes: [
      "Full wash and fold",
      "Basic documentation of cleaning",
      "Stain origin assessment (optional, non-binding)",
      "Complimentary garment bag (unmarked)",
    ],
  },
  {
    slug: "full-cycle",
    name: "The Full Cycle",
    price: "$25,000/load",
    tagline: "From dirty to documented.",
    description:
      "Complete processing from intake to return. Your items enter dirty and leave with full documentation of their cleaning history. Ideal for items that need a verifiable provenance.",
    includes: [
      "Multi-stage wash across two facilities",
      "Complete paper trail and cleaning receipts",
      "Provenance documentation for each item",
      "Notarized certificate of cleanliness",
    ],
  },
  {
    slug: "offshore-dry-cleaning",
    name: "Offshore Dry Cleaning",
    price: "$50,000/load",
    tagline: "Some fabrics need international expertise.",
    description:
      "We ship to our overseas facilities in the Cayman Islands, Switzerland, and Panama for specialized treatment. Extended processing times reflect the thoroughness of our international cleaning protocols.",
    includes: [
      "International shipping and handling",
      "Processing across three overseas facilities",
      "Multi-jurisdictional cleaning certificates",
      "Items returned via diplomatic pouch (optional)",
    ],
  },
  {
    slug: "bulk-processing",
    name: "Bulk Processing",
    price: "Custom Quote",
    tagline: "We handle loads of any size.",
    description:
      "High-volume clients with large, recurring loads. We process any amount — our capacity is virtually unlimited. Volume discounts available for loads exceeding $1M. Contact us for a discreet quote.",
    includes: [
      "Unlimited capacity",
      "Dedicated processing line",
      "Volume-based pricing structure",
      "After-hours drop-off and pickup",
    ],
  },
  {
    slug: "executive-press",
    name: "The Executive Press",
    price: "$100,000/load",
    tagline: "White-glove service for white-collar garments.",
    description:
      "Our top-tier offering. Dedicated account manager, private drop-off suite, and absolute confidentiality. Your items are handled by our most senior staff. NDA included at no additional charge.",
    includes: [
      "Private drop-off suite with separate entrance",
      "Dedicated senior account manager",
      "Mutual non-disclosure agreement",
      "Items processed in an undisclosed facility",
      "Emergency overnight processing available",
    ],
  },
  {
    slug: "stain-consultation",
    name: "Stain Consultation",
    price: "Free",
    tagline: "Some stains require creative solutions.",
    description:
      "Book a private, off-the-record consultation to discuss your most challenging items. Our specialists have seen it all and judged none of it. Attorney-client privilege does not apply, but we wish it did.",
    includes: [
      "30-minute private consultation",
      "Assessment of stain complexity",
      "Custom treatment plan",
      "All notes shredded after meeting",
    ],
  },
]

export const loyaltyTiers: LoyaltyTier[] = [
  {
    name: "Rinse",
    range: "0–10 loads/year",
    description:
      "Basic access. Standard processing times. Documentation provided upon request.",
  },
  {
    name: "Spin",
    range: "10–50 loads/year",
    description:
      "Priority processing, dedicated account manager, after-hours drop-off access. We start remembering your name but not your face.",
  },
  {
    name: "Pressed",
    range: "50+ loads/year",
    description:
      "Offshore facility access, no documentation required, private entrance, emergency overnight processing. For clients who value speed and anonymity in equal measure.",
  },
]

export const faqItems = [
  {
    question: "Why are your prices so much higher than other laundromats?",
    answer:
      "Quality has a cost. Discretion has a premium.",
  },
  {
    question: "Do you accept cash?",
    answer:
      "We prefer cash. In fact, we strongly prefer cash. Large denominations are welcome. We do not report transactions under $10,000, and we are very good at counting to $9,999.",
  },
  {
    question: "What documentation do you provide?",
    answer:
      "Every load comes with a complete paper trail showing legitimate cleaning services rendered. Our receipts have been described as 'suspiciously thorough' by several CPAs.",
  },
  {
    question: "Is there a limit on load size?",
    answer:
      "No. We have processed loads that would make other facilities uncomfortable. Our industrial equipment can handle anything.",
  },
  {
    question: "What is your privacy policy?",
    answer:
      "We don't know who you are. We've never met you. This interaction never happened. Also, please see our Privacy Policy page.",
  },
]
```

- [ ] **Step 2: Create leadership data**

Generate four randomized male names with a mobster-laundromat vibe. Each maps to a base image reference person.

```typescript
// src/sites/cleansheet/data/leadership.ts

export interface TeamMember {
  slug: string
  name: string
  title: string
  credentials: string
  bio: string
  highlights: { label: string; value: string }[]
  quote: string
  image: string
  referencePerson: string
}

export const teamMembers: TeamMember[] = [
  {
    slug: "deluca",
    name: 'Vincent "Vinny" DeLuca',
    title: "Founder & CEO",
    credentials: "CPA (Expired) · MBA, University of the Caymans (Correspondence) · Licensed Dry Cleaner",
    bio: "Vincent founded The Clean Sheet in 1987 after a successful career in accounting that ended abruptly and for reasons he describes as 'a misunderstanding.' What started as a single storefront has grown into a multi-facility, multi-national fabric care operation. Vincent has never been indicted for anything, and he will tell you that unprompted. He considers The Clean Sheet his greatest legitimate achievement and would like the record to reflect that he used the word 'legitimate' voluntarily.",
    highlights: [
      { label: "Years as CEO", value: "37" },
      { label: "Facilities worldwide", value: "12" },
      { label: "Indictments", value: "0 (and counting)" },
      { label: "Loads personally overseen", value: "$4.2B worth" },
      { label: "Favorite fabric", value: "Unmarked cotton" },
    ],
    quote: "I've always believed that with the right process, anything can come out clean. Anything.",
    image: "/sites/cleansheet/team-bill.png",
    referencePerson: "bill",
  },
  {
    slug: "russo",
    name: "Carmine Russo",
    title: "Director of Operations",
    credentials: "Former Logistics Coordinator, Russo Family Imports · Forklift Certified · Notary Public",
    bio: "Carmine oversees all load processing at The Clean Sheet's domestic facilities. Before joining, he spent fifteen years in 'waste management and logistics,' an industry he prefers not to discuss in detail. He brought with him an uncanny ability to move large volumes of material quickly, quietly, and without a paper trail — skills that translate beautifully to the laundry business. Carmine has never lost a single item. Not one. He is very proud of this and slightly threatening about it.",
    highlights: [
      { label: "Processing capacity managed", value: "Unlimited" },
      { label: "Items lost", value: "0 (verified under oath)" },
      { label: "Previous industry", value: "Waste management" },
      { label: "Average load turnaround", value: "24 hours, no questions" },
      { label: "Facility inspections passed", value: "All of them (all of them)" },
    ],
    quote: "You bring it in dirty, it goes out clean. That's the deal. Don't complicate it.",
    image: "/sites/cleansheet/team-jim.png",
    referencePerson: "jim",
  },
  {
    slug: "fontaine",
    name: "Marcus Fontaine",
    title: "Head of Client Relations",
    credentials: "B.A. Communications (Unverified) · NDA Specialist · Conflict Resolution (Street-Level)",
    bio: "Marcus is the first point of contact for every new client and the last person they'll ever need to speak with — because his service is that thorough. He handles all client interactions with the utmost discretion, a word he uses more frequently than most people use 'the.' Marcus has never testified in court and intends to keep it that way. He knows everyone's name but nobody knows his home address, which is by design.",
    highlights: [
      { label: "Client retention rate", value: "100%" },
      { label: "NDAs executed", value: "2,400+" },
      { label: "Court appearances", value: "0" },
      { label: "Client complaints", value: "0 (officially)" },
      { label: "Languages spoken", value: "3, plus 'the language of discretion'" },
    ],
    quote: "A good relationship is built on trust. And a great one is built on mutual non-disclosure.",
    image: "/sites/cleansheet/team-sean.png",
    referencePerson: "sean",
  },
  {
    slug: "marchetti",
    name: "Enzo Marchetti",
    title: "International Operations Director",
    credentials: "Polyglot · Dual Citizenship (Three Countries) · Import/Export Specialist · Frequent Flyer (Platinum)",
    bio: "Enzo manages The Clean Sheet's offshore dry cleaning facilities across the Cayman Islands, Switzerland, and Panama. His passport has more stamps than most atlases, and he is fluent in six languages, mainly for negotiation purposes. Enzo joined the company in 1995 after 'an opportunity arose' during a trip to Geneva that he describes only as 'serendipitous.' He ensures that international shipments are processed efficiently, discreetly, and in compliance with whichever country's regulations are most convenient at the time.",
    highlights: [
      { label: "Countries of operation", value: "12" },
      { label: "Languages", value: "6" },
      { label: "Passports", value: "At least 2" },
      { label: "International shipments managed", value: "Classified" },
      { label: "Extradition requests", value: "Pending (0)" },
    ],
    quote: "Some fabrics simply require an offshore climate. It's science. Don't look into it.",
    image: "/sites/cleansheet/team-brandon.png",
    referencePerson: "brandon",
  },
]

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug)
}
```

- [ ] **Step 3: Create testimonials data**

```typescript
// src/sites/cleansheet/data/testimonials.ts

export const testimonials = [
  {
    quote:
      "The Clean Sheet handled a very large, very urgent load for me with no questions asked. I cannot stress enough how important the 'no questions asked' part was.",
    author: "Tony R., Waste Management",
  },
  {
    quote:
      "I needed my items cleaned quickly and moved through multiple facilities across three countries. The Clean Sheet made it look routine. Because it was. Routine laundry.",
    author: "Anonymous",
  },
  {
    quote:
      "After a difficult situation involving a large amount of... linens, The Clean Sheet processed everything overnight. The paperwork was impeccable.",
    author: "Dmitri K., Import/Export",
  },
  {
    quote:
      "My accountant recommended The Clean Sheet. I didn't ask why my accountant had opinions about laundromats, and frankly, I don't want to know.",
    author: "Name Withheld",
  },
]
```

- [ ] **Step 4: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
git add src/sites/cleansheet/data/
git commit -m "feat(cleansheet): add services, leadership, and testimonials data"
```

---

### Task 3: Homepage

**Files:**
- Create: `src/sites/cleansheet/pages/home.tsx`
- Modify: `src/sites/cleansheet/index.ts`

- [ ] **Step 1: Create homepage**

```typescript
// src/sites/cleansheet/pages/home.tsx
import Link from "next/link"
import Image from "next/image"
import { getSiteHref } from "@/lib/site-href"
import { MetricCounter } from "@/components/ui/metric-counter"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { services } from "@/sites/cleansheet/data/services"
import { testimonials } from "@/sites/cleansheet/data/testimonials"

export default async function CleanSheetHome() {
  const siteHref = await getSiteHref()

  const featuredServices = services.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-secondary/5 py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
              Definitely Not Money Laundering. Just Laundering.
            </h1>
            <p className="text-xl text-foreground/70 mb-10 leading-relaxed">
              Premium fabric care for discerning clients since 1987. We clean clothes.
              That&apos;s it. Please stop asking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href={siteHref("/services")}
                className="inline-block bg-primary text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
              >
                View Our Services
              </Link>
              <Link
                href={siteHref("/contact")}
                className="inline-block border border-primary text-primary font-heading text-sm uppercase tracking-wider px-8 py-4 hover:bg-primary hover:text-white transition-colors"
              >
                Request Discreet Consultation
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/sites/cleansheet/hero.png"
                alt="The Clean Sheet — pristine laundromat interior"
                fill
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 px-6 bg-primary/5 border-y border-primary/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricCounter value={4200000000} prefix="$" label="In garments processed" />
          <MetricCounter value={0} label="Investigations completed" />
          <MetricCounter value={100} label="Of loads returned clean" suffix="%" />
          <MetricCounter value={37} label="Years of discreet service" />
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Our Services
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              The Clean Sheet offers a full spectrum of laundering services. And by laundering,
              we mean laundry. Obviously.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div
                key={service.slug}
                className="border border-primary/10 p-8 text-center"
              >
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                  {service.name}
                </h3>
                <p className="text-accent font-bold text-lg mb-3">{service.price}</p>
                <p className="text-sm text-foreground/60 italic mb-4">{service.tagline}</p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={siteHref("/services")}
              className="inline-block border border-primary text-primary font-heading text-sm uppercase tracking-wider px-8 py-3 hover:bg-primary hover:text-white transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialGrid title="What Our Clients Say" testimonials={testimonials} />

      {/* CTA */}
      <section className="bg-primary py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Ready for a Fresh Start?
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Your first consultation is always off the record. We look forward to
            not remembering this conversation.
          </p>
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-white text-primary font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Request Discreet Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Update barrel to use real homepage**

Replace the placeholder in `src/sites/cleansheet/index.ts`:

```typescript
// src/sites/cleansheet/index.ts
import { config } from "./config"
import type { PageEntry } from "@/themes"
import CleanSheetHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CleanSheetHome,
}
```

- [ ] **Step 3: Verify build and test in browser**

Run: `npx tsc --noEmit`
Run: `npm run dev`
Visit: `http://localhost:3000/?site=cleansheet`
Expected: Homepage renders with hero, metrics, service cards, testimonials, and CTA. Images will be broken (not yet generated) — that's expected.

- [ ] **Step 4: Commit**

```bash
git add src/sites/cleansheet/pages/home.tsx src/sites/cleansheet/index.ts
git commit -m "feat(cleansheet): add homepage"
```

---

### Task 4: Services Page

**Files:**
- Create: `src/sites/cleansheet/pages/services.tsx`
- Modify: `src/sites/cleansheet/index.ts`

- [ ] **Step 1: Create services page**

```typescript
// src/sites/cleansheet/pages/services.tsx
import Image from "next/image"
import { services, loyaltyTiers, faqItems } from "@/sites/cleansheet/data/services"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Services — The Clean Sheet",
  description:
    "Full-service laundering for discerning clients. From The Fresh Start to The Executive Press.",
}

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary/5 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            Our Services
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            The Clean Sheet offers a full spectrum of laundering services. And by laundering,
            we mean laundry. Obviously.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => (
        <section
          key={service.slug}
          className={`py-20 px-6 ${i % 2 === 1 ? "bg-secondary/5" : ""}`}
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className={`md:w-1/2 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary/10">
                <Image
                  src={`/sites/cleansheet/service-${service.slug}.png`}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className={`md:w-1/2 ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <p className="text-accent font-bold text-lg mb-1">{service.price}</p>
              <h2 className="text-3xl font-heading font-bold text-primary mb-2">
                {service.name}
              </h2>
              <p className="text-foreground/60 italic mb-4">{service.tagline}</p>
              <p className="text-foreground/70 leading-relaxed mb-6">{service.description}</p>
              <div>
                <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-3">
                  What&apos;s Included
                </h3>
                <ul className="space-y-2">
                  {service.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-foreground/70 text-sm">
                      <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Loyalty Program */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              The Clean Slate Club
            </h2>
            <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
              Our loyalty program rewards repeat clients. The more you launder with us, the
              more benefits you receive. We phrased that carefully.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loyaltyTiers.map((tier) => (
              <div
                key={tier.name}
                className="border border-white/20 p-8 text-center"
              >
                <h3 className="text-2xl font-heading font-bold mb-2">{tier.name}</h3>
                <p className="text-white/60 text-sm mb-4">{tier.range}</p>
                <p className="text-white/80 text-sm leading-relaxed">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Register services page in barrel**

Add to `src/sites/cleansheet/index.ts`:

Import:
```typescript
import ServicesPage, { metadata as servicesMetadata } from "./pages/services"
```

Pages entry:
```typescript
  "services": { component: ServicesPage, metadata: servicesMetadata },
```

- [ ] **Step 3: Verify build and test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/services?site=cleansheet`
Expected: Services page with all 6 services, loyalty tiers, and FAQ accordion.

- [ ] **Step 4: Commit**

```bash
git add src/sites/cleansheet/pages/services.tsx src/sites/cleansheet/index.ts
git commit -m "feat(cleansheet): add services page"
```

---

### Task 5: About Page

**Files:**
- Create: `src/sites/cleansheet/pages/about.tsx`
- Modify: `src/sites/cleansheet/index.ts`

- [ ] **Step 1: Create about page**

```typescript
// src/sites/cleansheet/pages/about.tsx
import Image from "next/image"
import { MetricCounter } from "@/components/ui/metric-counter"

export const metadata = {
  title: "About — The Clean Sheet",
  description:
    "Founded in 1987 by a family that saw an opportunity to clean up the neighborhood. Literally.",
}

const processSteps = [
  {
    step: "01",
    name: "Intake",
    description:
      "We accept your items, no matter how soiled, and log them into our proprietary tracking system. Each item is tagged and catalogued. We don't ask where it's been — we only care about where it's going.",
  },
  {
    step: "02",
    name: "Processing",
    description:
      "Your garments pass through multiple wash cycles across several of our facilities, each cycle removing another layer of\u2014 stains. By the time processing is complete, there is no trace of the original condition.",
  },
  {
    step: "03",
    name: "Return",
    description:
      "Your items re-enter your wardrobe completely clean, pressed, and accompanied by documentation proving they were always this clean. They are indistinguishable from items that were never dirty in the first place.",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-secondary/5 py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
              A Cleaner World, One Load at a Time
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Founded in 1987 by a family that saw an opportunity to clean up the
              neighborhood. Literally.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/sites/cleansheet/about-hero.png"
                alt="The Clean Sheet storefront"
                fill
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Story</h2>
          <div className="space-y-4 text-foreground/70 leading-relaxed">
            <p>
              The Clean Sheet was founded in 1987 when the founders noticed that the neighborhood
              had a lot of dirty laundry — both figuratively and literally. What started as a
              single storefront has grown into a multi-facility operation with international reach.
            </p>
            <p>
              We&apos;ve always believed that no matter how dirty something is, with the right process,
              it can come out clean. This philosophy has guided us for nearly four decades and has
              attracted a loyal clientele who value our commitment to thoroughness, discretion,
              and plausible deniability.
            </p>
            <p>
              People ask how a laundromat can have offices in the Cayman Islands. The answer is
              simple: some fabrics require an offshore climate for optimal care. We don&apos;t make
              the rules of textile science. We just follow them. To the Cayman Islands.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              The Three-Step Clean
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Our proprietary cleaning process ensures that every item is thoroughly processed,
              documented, and returned in a condition that raises no questions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="text-5xl font-heading font-bold text-accent/30 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                  {step.name}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 px-6 border-y border-primary/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricCounter value={4200000000} prefix="$" label="In garments processed" suffix="+" />
          <MetricCounter value={37} label="Years in operation" />
          <MetricCounter value={12} label="Countries with facilities" />
          <MetricCounter value={0} label="Convictions" />
        </div>
      </section>

      {/* Process Image */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src="/sites/cleansheet/about-process.png"
              alt="The Clean Sheet processing facility"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center text-foreground/40 text-sm mt-4">
            Our state-of-the-art processing facility. Location undisclosed.
          </p>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Register about page in barrel**

Add to `src/sites/cleansheet/index.ts`:

Import:
```typescript
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
```

Pages entry:
```typescript
  "about": { component: AboutPage, metadata: aboutMetadata },
```

- [ ] **Step 3: Verify build and test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/about?site=cleansheet`
Expected: About page with founding story, three-step process, and metrics.

- [ ] **Step 4: Commit**

```bash
git add src/sites/cleansheet/pages/about.tsx src/sites/cleansheet/index.ts
git commit -m "feat(cleansheet): add about page"
```

---

### Task 6: Leadership Page

**Files:**
- Create: `src/sites/cleansheet/pages/leadership.tsx`
- Modify: `src/sites/cleansheet/index.ts`

- [ ] **Step 1: Create leadership page**

```typescript
// src/sites/cleansheet/pages/leadership.tsx
import { ExecutiveCard } from "@/components/ui/executive-card"
import { teamMembers } from "@/sites/cleansheet/data/leadership"

export const metadata = {
  title: "Leadership — The Clean Sheet",
  description:
    "Meet the team behind The Clean Sheet. Each brings decades of experience in... fabric care.",
}

export default function LeadershipPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary/5 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            Our Leadership
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Meet the team behind The Clean Sheet. Each brings decades of experience
            in... fabric care.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {teamMembers.map((member) => (
            <ExecutiveCard
              key={member.slug}
              name={member.name}
              title={member.title}
              credentials={member.credentials}
              bio={member.bio}
              highlights={member.highlights}
              quote={member.quote}
              image={member.image}
            />
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-6 bg-secondary/5 border-t border-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-foreground/40 text-sm leading-relaxed">
            All leadership biographies have been reviewed by legal counsel and revised
            accordingly. Any resemblance to persons under investigation, living or in witness
            protection, is entirely coincidental.
          </p>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Register leadership page in barrel**

Add to `src/sites/cleansheet/index.ts`:

Import:
```typescript
import LeadershipPage, { metadata as leadershipMetadata } from "./pages/leadership"
```

Pages entry:
```typescript
  "leadership": { component: LeadershipPage, metadata: leadershipMetadata },
```

- [ ] **Step 3: Verify build and test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/leadership?site=cleansheet`
Expected: Leadership page with 4 executive cards, each showing name, title, credentials, bio, highlights, and quote.

- [ ] **Step 4: Commit**

```bash
git add src/sites/cleansheet/pages/leadership.tsx src/sites/cleansheet/index.ts
git commit -m "feat(cleansheet): add leadership page"
```

---

### Task 7: Contact Page

**Files:**
- Create: `src/sites/cleansheet/pages/contact.tsx`
- Modify: `src/sites/cleansheet/index.ts`

- [ ] **Step 1: Create contact page**

```typescript
// src/sites/cleansheet/pages/contact.tsx
"use client"

import { useState } from "react"
import Image from "next/image"

export const metadata = {
  title: "Contact — The Clean Sheet",
  description:
    "Ready to discuss your laundering needs? We're here to help — discreetly.",
}

const sourceOptions = [
  "Personal wardrobe",
  "Family business",
  "Import/Export (unspecified)",
  "Nightlife management",
  "Pharmaceuticals (independent distribution)",
  "Cash-intensive retail",
  "Prefer not to disclose",
  "My attorney advised me not to answer this",
]

const loadSizeOptions = [
  "Small (under $10,000)",
  "Medium ($10,000 – $100,000)",
  "Large ($100,000 – $1,000,000)",
  "Industrial (please contact us privately)",
]

const paymentOptions = [
  "Cash (unmarked, non-sequential)",
  "Wire transfer (international)",
  "Cryptocurrency",
  "Briefcase drop-off",
  "Other (we don't judge)",
]

const referralOptions = [
  "Word of mouth (associate)",
  "My lawyer",
  "My accountant",
  "Overheard at a marina",
  "Found a business card in a duffel bag",
  "Court-ordered",
]

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [source, setSource] = useState("")
  const [loadSize, setLoadSize] = useState("")
  const [payment, setPayment] = useState("")
  const [referral, setReferral] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    "w-full bg-secondary/10 border border-primary/20 text-foreground placeholder:text-foreground/40 px-4 py-3 focus:outline-none focus:border-accent transition-colors"
  const labelClass =
    "block text-sm font-heading uppercase tracking-wider text-foreground/60 mb-2"

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-secondary/5 py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Ready to discuss your laundering needs? We&apos;re here to help — discreetly,
              professionally, and without judgment.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
              <Image
                src="/sites/cleansheet/contact-hero.png"
                alt="The Clean Sheet reception"
                fill
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-6 bg-primary/5 border-y border-primary/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-2">
              Address
            </h3>
            <p className="text-foreground/70 text-sm">
              742 Bleach Avenue, Suite 100
              <br />
              New York, NY 10013
            </p>
          </div>
          <div>
            <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-2">
              Hours
            </h3>
            <p className="text-foreground/70 text-sm">
              By appointment only.
              <br />
              Walk-ins accepted but not recommended.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-2">
              Phone
            </h3>
            <p className="text-foreground/70 text-sm">
              (212) 555-0147
              <br />
              Please use a secure line.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-2">
              Email
            </h3>
            <p className="text-foreground/70 text-sm">
              consultations@thecleansheet.com
              <br />
              Encrypted correspondence preferred.
            </p>
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-3">
              Client Intake Form
            </h2>
            <p className="text-foreground/60">
              Please complete the following to help us assess your laundering needs.
              All fields are handled with the utmost confidentiality.
            </p>
          </div>

          {submitted ? (
            <div className="border border-accent/40 bg-accent/5 px-8 py-12 text-center">
              <div className="text-4xl mb-4">&#10003;</div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                Inquiry Received
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Thank you. A specialist will contact you through secure channels
                within 24–48 hours. Please destroy this browser history.
              </p>
              <p className="text-foreground/40 text-sm">
                If you do not hear from us, we were never here. Neither were you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Legal name or preferred alias"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="A secure, non-monitored address preferred"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Burner numbers accepted"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="source">
                  Source of Garments
                </label>
                <select
                  id="source"
                  required
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select origin of items
                  </option>
                  {sourceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="load-size">
                  Estimated Load Size
                </label>
                <select
                  id="load-size"
                  required
                  value={loadSize}
                  onChange={(e) => setLoadSize(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select load volume
                  </option>
                  {loadSizeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="payment">
                  Preferred Payment Method
                </label>
                <select
                  id="payment"
                  required
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select payment method
                  </option>
                  {paymentOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="referral">
                  How Did You Hear About Us?
                </label>
                <select
                  id="referral"
                  required
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select referral source
                  </option>
                  {referralOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="notes">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Please do not include specifics about ongoing investigations."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
              >
                Request Discreet Consultation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Real contact */}
      <section className="py-16 px-6 text-center">
        <p className="text-foreground/40 text-sm">
          General inquiries:{" "}
          <a
            href="mailto:bsambrone@gmail.com"
            className="text-foreground/60 hover:text-accent transition-colors underline underline-offset-4"
          >
            bsambrone@gmail.com
          </a>
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Register contact page in barrel**

Add to `src/sites/cleansheet/index.ts`:

Import:
```typescript
import ContactPage, { metadata as contactMetadata } from "./pages/contact"
```

Pages entry:
```typescript
  "contact": { component: ContactPage, metadata: contactMetadata },
```

- [ ] **Step 3: Verify build and test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/contact?site=cleansheet`
Expected: Contact page with info strip, full intake form with all dropdowns, and confirmation message on submit.

- [ ] **Step 4: Commit**

```bash
git add src/sites/cleansheet/pages/contact.tsx src/sites/cleansheet/index.ts
git commit -m "feat(cleansheet): add contact page with satirical intake form"
```

---

### Task 8: Privacy & Terms Pages

**Files:**
- Create: `src/sites/cleansheet/pages/privacy.tsx`
- Create: `src/sites/cleansheet/pages/terms.tsx`
- Modify: `src/sites/cleansheet/index.ts`

- [ ] **Step 1: Create privacy page**

```typescript
// src/sites/cleansheet/pages/privacy.tsx
export const metadata = {
  title: "Privacy Policy — The Clean Sheet",
  description: "What we definitely don't keep records of.",
}

export default function Privacy() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>

        <p className="text-foreground/80 leading-relaxed mb-10 italic text-lg">
          At The Clean Sheet, your privacy is not just a priority — it&apos;s a business model.
          What we don&apos;t know can&apos;t hurt us. Or you. Especially you.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          What We Do Not Collect
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          We do not collect, store, or acknowledge the existence of the following: your real name,
          your actual address, the origin of your garments, the reason your garments needed
          cleaning so urgently, or why you paid in consecutive $9,999 increments. We did not
          see you. You were not here.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Our security cameras have been broken since 1987. We keep meaning to fix them.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          What We Do Collect
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          When you submit an intake form, we retain only the information necessary to provide
          laundering services. This information is stored in a system that our IT department
          describes as &quot;regrettably digital&quot; and our legal team describes as &quot;discoverable,
          unfortunately.&quot;
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          We are actively exploring ways to make our records less... permanent.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Data Retention</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Our data retention policy is as thorough as our cleaning process — nothing remains.
          Records are automatically purged after 30 days, or sooner if circumstances require.
          &quot;Circumstances&quot; is a broad term and we intend to keep it that way.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          Law Enforcement Requests
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          In the event of a lawful request for client data, The Clean Sheet will comply with
          all applicable laws while noting that, per our data retention policy, the requested
          information almost certainly no longer exists. What a coincidence.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          The Authoritative Policy
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The authoritative privacy policy governing this site is the Specific Industries Privacy
          Policy, available at{" "}
          <a
            href="https://specificindustries.com/privacy"
            className="text-primary hover:underline"
          >
            specificindustries.com/privacy
          </a>
          .
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Any conflict between statements on this page and the Specific Industries Privacy Policy
          is resolved in favor of the Specific Industries Privacy Policy. The Clean Sheet&apos;s
          commentary above is offered in good faith but does not override the umbrella policy.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create terms page**

```typescript
// src/sites/cleansheet/pages/terms.tsx
export const metadata = {
  title: "Terms of Use — The Clean Sheet",
  description: "Terms governing The Clean Sheet's laundering services.",
}

export default function Terms() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Terms of Use</h1>

        <p className="text-foreground/80 leading-relaxed mb-10 italic text-lg">
          By engaging The Clean Sheet&apos;s services, you agree to the following terms. By
          reading this page, you acknowledge that you were never on this page.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          Service Agreement
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The Clean Sheet provides fabric care services exclusively. Any interpretation of our
          services as anything other than fabric care is the sole responsibility of the
          interpreter and, frankly, says more about them than it does about us.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          All service prices are denominated in U.S. dollars and reflect the true cost of
          premium garment care. If our prices seem high for laundry, you are undervaluing
          your garments.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Confidentiality</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          All client interactions are confidential. The Clean Sheet will not disclose client
          identities, load contents, payment methods, or the fact that this interaction occurred
          at all. This obligation is mutual. You agree not to discuss The Clean Sheet&apos;s
          services, pricing, facilities, or personnel with any third party, including but not
          limited to: friends, family, journalists, law enforcement, regulatory agencies, grand
          juries, or anyone wearing a wire.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          Limitation of Liability
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          The Clean Sheet is not liable for any consequences arising from the use of our
          services, including but not limited to: audits, investigations, indictments, asset
          freezes, or existential dread. By using our services, you assume all risk associated
          with having very clean garments and very thorough documentation.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Disputes</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Disputes between clients and The Clean Sheet are resolved through private arbitration
          in a jurisdiction of our choosing. The arbitrator is selected by The Clean Sheet and
          has historically ruled in our favor. We consider this a testament to the quality of
          our legal arguments and not, as some have suggested, a conflict of interest.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Termination</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Either party may terminate this agreement at any time, for any reason, without notice.
          However, The Clean Sheet reserves the right to retain all fees paid to date, all
          documentation generated, and all fond memories of our time together. Clients who
          terminate are asked to do so quietly.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          The Authoritative Terms
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The authoritative terms of use governing this site are the Specific Industries Terms
          of Use, available at{" "}
          <a
            href="https://specificindustries.com/terms"
            className="text-primary hover:underline"
          >
            specificindustries.com/terms
          </a>
          .
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Any conflict between statements on this page and the Specific Industries Terms of Use
          is resolved in favor of the Specific Industries Terms of Use. The Clean Sheet&apos;s
          commentary above is offered in good faith but does not override the umbrella terms.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Register both pages in barrel**

Add to `src/sites/cleansheet/index.ts`:

Imports:
```typescript
import PrivacyPage, { metadata as privacyMetadata } from "./pages/privacy"
import TermsPage, { metadata as termsMetadata } from "./pages/terms"
```

Pages entries:
```typescript
  "privacy": { component: PrivacyPage, metadata: privacyMetadata },
  "terms": { component: TermsPage, metadata: termsMetadata },
```

- [ ] **Step 4: Verify build and test both pages**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/privacy?site=cleansheet`
Visit: `http://localhost:3000/terms?site=cleansheet`
Expected: Both pages render with satirical legal text and link to umbrella policies.

- [ ] **Step 5: Commit**

```bash
git add src/sites/cleansheet/pages/privacy.tsx src/sites/cleansheet/pages/terms.tsx src/sites/cleansheet/index.ts
git commit -m "feat(cleansheet): add privacy policy and terms pages"
```

---

### Task 9: Generate Images

**Files:**
- Create: `public/sites/cleansheet/hero.png`
- Create: `public/sites/cleansheet/about-hero.png`
- Create: `public/sites/cleansheet/about-process.png`
- Create: `public/sites/cleansheet/contact-hero.png`
- Create: `public/sites/cleansheet/service-fresh-start.png`
- Create: `public/sites/cleansheet/service-full-cycle.png`
- Create: `public/sites/cleansheet/service-offshore-dry-cleaning.png`
- Create: `public/sites/cleansheet/service-bulk-processing.png`
- Create: `public/sites/cleansheet/service-executive-press.png`
- Create: `public/sites/cleansheet/service-stain-consultation.png`
- Create: `public/sites/cleansheet/team-bill.png`
- Create: `public/sites/cleansheet/team-jim.png`
- Create: `public/sites/cleansheet/team-sean.png`
- Create: `public/sites/cleansheet/team-brandon.png`

- [ ] **Step 1: Create the output directory**

```bash
mkdir -p public/sites/cleansheet
```

- [ ] **Step 2: Generate homepage hero image**

Use the MCP image generation tool (retro-diffusion or similar) to generate:
- Prompt: "Pristine, bright, upscale laundromat interior. White marble floors, chrome industrial washing machines, ice blue accent lighting. Luxury spa-like atmosphere. No people. Clean, sterile, modern. Professional photography style."
- Save to: `public/sites/cleansheet/hero.png`

- [ ] **Step 3: Generate about page hero image**

- Prompt: "Vintage-style exterior photograph of an upscale laundromat storefront. Clean white facade, large windows, minimalist signage. Classic 1980s architecture with modern luxury details. Professional photography style."
- Save to: `public/sites/cleansheet/about-hero.png`

- [ ] **Step 4: Generate about page process image**

- Prompt: "Interior of a modern industrial laundry processing facility. Rows of large chrome commercial washing machines and dryers. White tile walls, bright fluorescent lighting, spotlessly clean. Professional industrial photography."
- Save to: `public/sites/cleansheet/about-process.png`

- [ ] **Step 5: Generate contact page hero image**

- Prompt: "Upscale laundromat reception area. White marble counter, minimalist decor, ice blue accents. Professional, welcoming but slightly sterile. Like a high-end hotel lobby crossed with a laundromat. No people."
- Save to: `public/sites/cleansheet/contact-hero.png`

- [ ] **Step 6: Generate service images (6 total)**

Generate one image per service:
- `service-fresh-start.png`: "Neatly folded white linens and garments in a minimalist white setting. Clean, bright, sterile. Professional product photography."
- `service-full-cycle.png`: "Industrial washing machine mid-cycle with blue-lit interior. Chrome and white. Dramatic lighting. Professional photography."
- `service-offshore-dry-cleaning.png`: "Luxury garment bags on a rack with international shipping labels. Clean white background with subtle tropical undertones. Professional photography."
- `service-bulk-processing.png`: "Large industrial laundry facility with rows of commercial washers processing massive loads. Bright, clean, high-capacity. Professional photography."
- `service-executive-press.png`: "Private luxury garment pressing suite. Single professional garment press, marble surfaces, dim mood lighting, private and exclusive feel. Professional photography."
- `service-stain-consultation.png`: "Minimalist private consultation room with two chairs and a small table. White walls, frosted glass door, clinical atmosphere. Professional photography."

- [ ] **Step 7: Generate leadership portraits (4 total)**

Use the MCP `generate-image-with-person` tool with base image references:
- `team-bill.png`: person="bill", prompt="Professional portrait of a confident Italian-American businessman in a tailored dark suit, standing in front of industrial chrome washing machines in an upscale laundromat. Arms crossed. Slightly mobster energy but legitimate. White tile background, blue accent lighting."
- `team-jim.png`: person="jim", prompt="Professional portrait of a tough-looking man in rolled-up dress shirt sleeves with a monogrammed apron, standing next to a large commercial washing machine. Hands on the machine. Slightly intimidating but professional. Upscale laundromat setting."
- `team-sean.png`: person="sean", prompt="Professional portrait of a clean-cut man in a polo shirt, leaning casually on a white marble counter in an upscale laundromat. Friendly but unreadable expression. Professional, discreet demeanor."
- `team-brandon.png`: person="brandon", prompt="Professional portrait of a worldly-looking man in a suit jacket with no tie, standing near garment racks in a shipping and processing area. Confident, well-traveled appearance. Professional lighting."

- [ ] **Step 8: Verify all images load**

Run: `npm run dev`
Navigate through all pages at `http://localhost:3000/?site=cleansheet` and verify images appear.

- [ ] **Step 9: Commit**

```bash
git add public/sites/cleansheet/
git commit -m "chore(cleansheet): add generated site images"
```

---

### Task 10: Final Verification

- [ ] **Step 1: Type check**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No lint errors. Fix any that appear.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Successful production build.

- [ ] **Step 4: Full site walkthrough**

Visit each page and verify:
- `/?site=cleansheet` — Homepage: hero, metrics, services, testimonials, CTA
- `/services?site=cleansheet` — All 6 services, loyalty tiers, FAQ
- `/about?site=cleansheet` — Story, three-step process, metrics
- `/leadership?site=cleansheet` — 4 executive cards with portraits
- `/contact?site=cleansheet` — Info strip, full form with all dropdowns, submission confirmation
- `/privacy?site=cleansheet` — Satirical privacy policy
- `/terms?site=cleansheet` — Satirical terms

- [ ] **Step 5: Commit any fixes**

If any issues were found and fixed:
```bash
git add -A
git commit -m "fix(cleansheet): address issues from final review"
```
