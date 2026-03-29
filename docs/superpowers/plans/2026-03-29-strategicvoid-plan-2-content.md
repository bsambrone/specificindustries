# Strategic Void Consulting — Plan 2: Solution Content & Core Pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill in all solution descriptions, all 30 remaining product content, and create 7 unique pages (Methodology, Pricing, About, Leadership, Contact, Privacy, Terms).

**Architecture:** All content lives in data files or page components created in Plan 1. This plan fills in stub content and creates new page files, then wires them into the site barrel.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-03-29-strategicvoid-site-design.md`

**Depends on:** Plan 1 (complete)

---

## Content Guidelines

**Tone:** Deadpan corporate authority. Never wink at the camera. Write as if by someone who genuinely believes in "holistic alignment optimization." The humor comes from the gap between corporate seriousness and absurd products.

**Product descriptions:** 2-3 paragraphs per product. Include proprietary technology names with ™. Reference fake statistics. Use corporate buzzwords earnestly. Each product should feel like it has a real engineering team behind it.

**Features:** 6-8 bullet points per product. Mix genuinely useful-sounding features with absurd ones. Include integration capabilities, configuration options, and compliance certifications.

**Specs:** 6-9 spec rows per product. Include precise-sounding measurements, certifications, and ratings. Make specs feel authentic (ISO certifications, SLA percentages, detection risk ratings).

**Example (from Meeting Brick™):**
- Description: "The Meeting Brick™ is a precision-weighted 2.4lb aluminum-core productivity device designed to maintain consistent keyboard pressure during virtual engagements..."
- Feature: "Maintains 'Active' status across Slack, Teams, Zoom, and 47 other platforms"
- Spec: "Weight: 2.4 lbs (±0.01 lb, ISO 9001 certified)"

**Solution descriptions:** 3 paragraphs per solution. Paragraph 1: industry context and why this area matters. Paragraph 2: what the suite does (reference proprietary frameworks). Paragraph 3: social proof with fake stats.

---

## File Map

### Modify
- `src/sites/strategicvoid/data/solutions.ts` — Fill 7 solution descriptions
- `src/sites/strategicvoid/data/products.ts` — Fill 30 product stubs with full content
- `src/sites/strategicvoid/data/pricing.ts` — Add per-solution pricing for remaining 7 areas
- `src/sites/strategicvoid/index.ts` — Add 7 new pages to pages map

### Create
- `src/sites/strategicvoid/pages/methodology.tsx`
- `src/sites/strategicvoid/pages/pricing.tsx`
- `src/sites/strategicvoid/pages/about.tsx`
- `src/sites/strategicvoid/pages/leadership.tsx`
- `src/sites/strategicvoid/pages/contact.tsx`
- `src/sites/strategicvoid/pages/privacy.tsx`
- `src/sites/strategicvoid/pages/terms.tsx`

---

## Task 1: Fill Solution Descriptions

**Files:**
- Modify: `src/sites/strategicvoid/data/solutions.ts`

- [ ] **Step 1: Read the current file to understand the Meeting Optimization example**
- [ ] **Step 2: Replace placeholder descriptions for all 7 remaining solutions**

Each solution gets 3 paragraphs following the pattern established by Meeting Optimization. Key themes per solution:

**KPI Alignment Platform™** — The measurement epidemic, organizations drowning in data that means nothing. KPIScore™ algorithm. 94% of metrics tracked by enterprises have no correlation with outcomes.

**Middle Management Enablement™** — The critical middle layer, leaders who lead without leading. SynergyBridge™ framework. Under Preston Hawthorne-Clyde's leadership, 340+ organizations have successfully insulated decision-makers from decisions.

**Productivity Theater™** — The performance of work vs actual work. OptiPerception™ engine. Research shows perceived productivity has 4x more impact on career advancement than actual output.

**Compliance & Policy Solutions™** — The compliance landscape grows more complex. PolicyForge™ system. 89% of compliance failures occur not because policies don't exist, but because someone actually read them.

**Communication Enhancement Tools™** — Enterprise communication crisis — too much clarity. ClarityReduction™ framework. Average enterprise employee sends 47 clear messages per day, each creating unnecessary accountability.

**Decision Support Systems™** — Decisions are the enemy of alignment. DecisionDeferral™ methodology. Organizations that make fewer decisions show 67% higher alignment scores.

**Employee Experience Optimization™** — Employee happiness is a managed perception. MoraleFabrication™ engine. 2,300+ organizations have achieved measurable happiness scores without improving working conditions.

- [ ] **Step 3: Run `npx tsc --noEmit`**
- [ ] **Step 4: Commit**
```bash
git commit -m "feat: add full descriptions for all 8 solution areas"
```

---

## Task 2: Fill KPI Alignment Products

**Files:**
- Modify: `src/sites/strategicvoid/data/products.ts`

- [ ] **Step 1: Read current file to understand Meeting Optimization product patterns**
- [ ] **Step 2: Fill full content for 4 KPI Alignment products**

**KPI Generator™** ($6,499/seat/quarter) — Turns random numbers into performance metrics. MetricForge™ engine generates statistically plausible KPIs from ambient data. Supports 200+ metric templates. Auto-generates quarterly reports that look authoritative.

**GoalPost Shifter Pro™** ($8,999/seat/quarter) — Dynamically adjusts targets based on outcomes. TargetAdapt™ algorithm retroactively modifies success criteria. Never miss a target again — the target moves to meet you.

**VanityMetrics Dashboard™** ($4,299/seat/quarter) — Beautiful charts that mean nothing. ChartBeauty™ rendering engine. 47 chart types optimized for maximum visual impact with minimum informational content. Executive-ready themes.

**NorthStar Randomizer™** ($11,999/seat/quarter) — Reassigns company direction quarterly. DirectionEngine™ ensures organizational strategy remains fresh and unpredictable. Includes pre-written "pivot announcement" templates.

- [ ] **Step 3: Run `npx tsc --noEmit`**
- [ ] **Step 4: Commit**
```bash
git commit -m "feat: add full product content for KPI Alignment suite"
```

---

## Task 3: Fill Middle Management Products

**Files:**
- Modify: `src/sites/strategicvoid/data/products.ts`

- [ ] **Step 1: Fill full content for 4 Middle Management products**

**Synergy Amplifier™** ($5,799/seat/quarter) — Replaces plain speech with buzzwords. LexiCorp™ NLP engine intercepts communications and enhances corporate vocabulary density. Supports real-time translation in meetings.

**1:1 Generator™** ($3,999/seat/quarter) — Produces talking points that go nowhere. AgendaVoid™ system generates discussion frameworks that feel productive while avoiding commitments. Includes "action item" generator that creates items nobody will follow up on.

**Escalation Ladder™** ($2,499/unit) — Physical desk product representing unnecessary escalation paths. Hand-crafted mahogany ladder with 7 rungs labeled from "Mention in Standup" to "CEO Emergency Briefing." Comes with a decision tree that routes everything to the top.

**PassiveAggressive Slack Bot™** ($4,499/seat/quarter) — Auto-generates "per my last message." ToneShift™ AI detects direct communication and adds appropriate layers of passive aggression. 23 escalation levels from "gentle reminder" to "as previously discussed in detail."

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add full product content for Middle Management suite"
```

---

## Task 4: Fill Productivity Theater Products

**Files:**
- Modify: `src/sites/strategicvoid/data/products.ts`

- [ ] **Step 1: Fill full content for 4 Productivity Theater products**

**FocusBand™** ($6,999/unit) — Wearable headband that lights up when you look busy. BusySignal™ LED array responds to keyboard activity, mouse movement, and screen changes. Green = deep focus, amber = collaborating, red = do not disturb (actually on social media). Pairs with Slack status auto-updater.

**DeepWork Simulator™** ($3,799/seat/quarter) — Plays typing sounds and intense music. WorkAmbience™ audio engine generates realistic keyboard sounds, occasional sighing, and background focus music. Includes "thinking pause" sounds and periodic "aha moment" audio cues.

**Task Deferral Engine™** ($5,499/seat/quarter) — Intelligently reschedules work indefinitely. ProcrastinAI™ analyzes task urgency and systematically moves deadlines forward. "Strategic patience" mode ensures no task is ever completed prematurely.

**Urgency Generator™** ($4,199/seat/quarter) — Flags everything as high priority. PriorityInflation™ system ensures all tasks, emails, and Slack messages carry maximum urgency. When everything is urgent, nothing is — achieving organizational equilibrium.

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add full product content for Productivity Theater suite"
```

---

## Task 5: Fill Compliance & Policy Products

**Files:**
- Modify: `src/sites/strategicvoid/data/products.ts`

- [ ] **Step 1: Fill full content for 4 Compliance & Policy products**

**Policy Generator 5000™** ($7,999/seat/quarter) — Creates 80-page documents instantly. DocFlood™ engine generates comprehensive policies from a single-sentence input. Includes automatic cross-referencing, appendices, and a glossary of terms nobody will read. ISO 27001 compliant documentation about ISO 27001 compliance.

**Checkbox Automator™** ($3,299/seat/quarter) — Automatically marks things as "reviewed." ComplianceClick™ system processes review queues at machine speed. Generates realistic review timestamps spaced appropriately. Includes "thoughtful comment" generator for audit trails.

**Audit Camouflage™** ($9,999/seat/quarter) — Makes everything look compliant at a glance. AuditShield™ presentation layer transforms any organizational state into one that appears audit-ready. Includes pre-built "remediation in progress" templates and a confidence-inspiring dashboard.

**Risk Redistribution Engine™** ($12,499/seat/quarter) — Moves blame across departments. BlameRouter™ algorithm dynamically reassigns risk ownership based on organizational politics. Ensures no single department bears accountability. Includes "shared responsibility" documentation generator.

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add full product content for Compliance & Policy suite"
```

---

## Task 6: Fill Communication Enhancement Products

**Files:**
- Modify: `src/sites/strategicvoid/data/products.ts`

- [ ] **Step 1: Fill full content for 4 Communication Enhancement products**

**Buzzword Translator™** ($4,799/seat/quarter) — Converts simple ideas into corporate speak. CorporateSpeak™ NLP engine transforms plain language into appropriately opaque business communication. "Fix the bug" becomes "Remediate the identified technical debt through a cross-functional sprint cadence."

**Reply-All Optimizer™** ($3,599/seat/quarter) — Ensures maximum visibility with minimal value. VisibilityMax™ algorithm identifies optimal moments to reply-all, CC leadership, and loop in stakeholders. Includes "value-add comment" generator that contributes nothing while appearing engaged.

**Thread Extender™** ($2,999/seat/quarter) — Keeps conversations alive long past relevance. ThreadLife™ engine injects follow-up questions, tangential observations, and "one more thought" messages. Average thread lifespan increases from 3 days to 6 weeks.

**ToneSoftener AI™** ($5,199/seat/quarter) — Adds "just looping back" to everything. GentleTouch™ AI wraps direct communication in layers of corporate softness. "This is wrong" becomes "Just wanted to circle back on this — I wonder if we might explore some alternative perspectives that could potentially enhance the current approach."

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add full product content for Communication Enhancement suite"
```

---

## Task 7: Fill Decision Support Products

**Files:**
- Modify: `src/sites/strategicvoid/data/products.ts`

- [ ] **Step 1: Fill full content for 4 Decision Support products**

**CoinFlip Enterprise™** ($14,999/seat/quarter) — Decision engine with audit logs. QuantumDecision™ platform generates statistically random outcomes while maintaining full compliance documentation. Enterprise-grade randomness with board-level audit trails. SOC 2 Type II certified.

**BlameShield™** ($8,499/seat/quarter) — Documents decisions so responsibility is unclear. AccountabilityFog™ engine creates decision records with sufficient ambiguity that no individual can be held responsible. RACI matrices where everyone is "Consulted" and nobody is "Accountable."

**Consensus Simulator™** ($6,999/seat/quarter) — Generates fake agreement across stakeholders. AgreementForge™ platform produces meeting minutes reflecting unanimous alignment regardless of what actually happened. Includes "aligned in principle" documentation templates.

**DelayLoop™** ($4,799/seat/quarter) — Postpones decisions until irrelevant. StrategicWait™ engine introduces calibrated delays into decision pipelines. By the time a decision is made, the question has resolved itself or been forgotten. Average decision cycle: 14 months.

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add full product content for Decision Support suite"
```

---

## Task 8: Fill Employee Experience Products

**Files:**
- Modify: `src/sites/strategicvoid/data/products.ts`

- [ ] **Step 1: Fill full content for 6 Employee Experience products**

Note: This area has 6 products (not 4 like the others).

**MandatoryFun™ Platform** ($5,999/seat/quarter) — Schedules "optional" fun during peak workload. JoyForce™ algorithm identifies maximum-stress periods and deploys mandatory team-building activities. Includes: escape rooms during sprint deadlines, karaoke during incident response, trust falls during layoffs.

**Wellness Noise Generator™** ($2,799/unit) — Plays calming sounds while your workload increases. SerenityMask™ audio device produces ocean waves, rainfall, and birdsong calibrated to mask the sound of your growing task list. Volume automatically increases as Slack notifications accelerate.

**Morale Dashboard™** ($4,499/seat/quarter) — Tracks happiness using made-up metrics. HappyScore™ platform aggregates completely fabricated wellness data into executive-ready dashboards. Metrics include "Synergy Satisfaction Index" and "Voluntary Enthusiasm Rate." Always trends upward.

**PizzaParty-as-a-Service™** ($1,999/event) — Automatically deploys pizza instead of raises. CompensationPizza™ platform detects compensation review cycles and preemptively schedules pizza events. Supports: cheese (base tier), pepperoni (performance review), specialty (post-layoff morale recovery).

**ErgoMax Compliance Chair™** ($8,999/unit) — Tracks posture but reports you to HR. PostureWatch™ sensor array monitors spinal alignment, sitting duration, and "engagement posture" (leaning forward = engaged, leaning back = disengaged). Weekly posture reports sent to your manager. Slouching triggers automatic wellness check-in invitation.

**Anonymous Feedback Redirector™** ($3,499/seat/quarter) — Sends employee feedback directly to /dev/null. FeedbackVault™ platform presents a professional feedback interface that routes all submissions to a write-only data store. Generates automated "thank you for your feedback" responses. Includes quarterly "we heard you" presentations with pre-written action items.

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add full product content for Employee Experience suite"
```

---

## Task 9: Add Per-Solution Pricing for Remaining 7 Areas

**Files:**
- Modify: `src/sites/strategicvoid/data/pricing.ts`

- [ ] **Step 1: Read current file for Meeting Optimization pricing pattern**
- [ ] **Step 2: Add pricing entries for all 7 remaining solution areas**

Each follows the same 3-tier structure (Essentials / Professional highlighted / Enterprise Unlimited Custom) but with products and extras customized to the solution area. The Essentials tier includes 1-2 base products, Professional includes all products, Enterprise Unlimited adds dedicated partner and absurd extras.

Each area's Enterprise Unlimited tier should include a unique absurd extra:
- KPI Alignment: "Custom metric fabrication laboratory"
- Middle Management: "Dedicated synergy concierge"
- Productivity Theater: "Personal appearance optimization consultant"
- Compliance & Policy: "Pre-written board apology letters"
- Communication Enhancement: "Ghost-written executive thought leadership"
- Decision Support: "24/7 coin-flipping hotline"
- Employee Experience: "Unlimited pizza deployment credits"

- [ ] **Step 3: Run `npx tsc --noEmit`**
- [ ] **Step 4: Commit**
```bash
git commit -m "feat: add per-solution pricing for all 8 solution areas"
```

---

## Task 10: Create Methodology Page

**Files:**
- Create: `src/sites/strategicvoid/pages/methodology.tsx`

- [ ] **Step 1: Create the methodology page**

"use client" component. Export `metadata` object. Layout:

1. **Hero section** — "The C.H.A.O.S. Framework™" headline, "Centralized Holistic Alignment Optimization System" subtitle
2. **MethodologyDiagram** component (already built in Plan 1 — import from `@/components/content-sections/methodology-diagram`)
3. **Phase breakdown** — 5 sections, one per letter. Each has the letter as a large accent heading, the phase name, and 2-3 paragraphs explaining the phase with complete seriousness:
   - **C**entralize — Consolidate all strategic inputs into a single alignment stream
   - **H**olistic — Ensure every stakeholder is included regardless of relevance
   - **A**lign — Map organizational goals to a unified non-direction
   - **O**ptimize — Reduce friction by eliminating measurable outcomes
   - **S**ystem — Embed the framework so deeply it becomes indistinguishable from inaction
4. **Proven results** — 4 MetricCounters (2,847 clients, 39 years, 97.3% alignment score, 73% productivity reduction)
5. **Certification teaser** — "Become a Certified C.H.A.O.S. Practitioner™" section with 3 certification levels (Associate, Professional, Master) described as the most prestigious corporate certification no one has heard of
6. **CTA** — "Schedule a C.H.A.O.S. Assessment"

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add methodology page for C.H.A.O.S. Framework"
```

---

## Task 11: Create Master Pricing Page

**Files:**
- Create: `src/sites/strategicvoid/pages/pricing.tsx`

- [ ] **Step 1: Create the pricing page**

"use client" component. Export `metadata` object. Layout:

1. **Hero** — "Simple, Transparent Pricing" headline (it is neither), subtitle about pricing designed for clarity
2. **Platform tiers** — Use EnterprisePricingTable with `masterPricingTiers` and `masterPricingFeatures` from pricing.ts data
3. **Add-ons section** — Grid of 6-8 absurd add-ons with prices:
   - "Dedicated Blame Absorption Specialist" (+$12,000/quarter)
   - "Emergency Alignment Hotline" (+$4,500/month)
   - "Custom C.H.A.O.S. Assessment Cadence" (+$8,000/quarter)
   - "Executive Meditation Room Licensing" (+$15,000/year)
   - "Synergy Audit Insurance" (+$6,500/quarter)
   - "Priority Escalation Fast-Pass" (+$3,200/month)
4. **Volume discounts** — "Organizations with 10,000+ seats qualify for our Partnership Program™"
5. **FAQ section** — 6-8 questions with absurd answers using FAQAccordion component (import from `@/components/ui/faq-accordion`). Examples:
   - "Can I downgrade?" → "Alignment is a one-way journey. We do not support strategic regression."
   - "What's included in 'Custom' pricing?" → "That depends on what 'included' means to your organization."
   - "Do you offer a free trial?" → "We offer a complimentary alignment assessment. The assessment itself takes 6-8 weeks."
6. **CTA** — "Schedule a Pricing Consultation"

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add master pricing page"
```

---

## Task 12: Create About Page

**Files:**
- Create: `src/sites/strategicvoid/pages/about.tsx`

- [ ] **Step 1: Create the about page**

"use client" component. Export `metadata` object. Layout:

1. **Hero** — "About Strategic Void Consulting" with subtitle about 39 years of alignment
2. **Origin story** — 3-4 paragraphs. Founded in 1987 by Max Thornbury III who observed "the most successful organizations spent more time discussing work than doing it." Started as a two-person alignment consultancy in a borrowed conference room. First client accidentally stopped being productive after implementing Thornbury's recommendations and reported unprecedented stakeholder satisfaction.
3. **Mission & Values** — Mission statement in large text, followed by 5 core values:
   - "Integrity Through Ambiguity"
   - "Relentless Incrementalism"
   - "Stakeholder-First Indecision"
   - "Innovation Without Implementation"
   - "Excellence in Non-Delivery"
   Each value gets 1-2 sentences of deadpan explanation.
4. **Timeline** — Use the Timeline component (import from `@/components/ui/timeline`) with absurd company milestones:
   - 1987: Founded in a borrowed conference room
   - 1993: First enterprise client (accidentally stopped being productive)
   - 1998: Launched the C.H.A.O.S. Framework™
   - 2003: Achieved ISO 9001 certification for our certification process
   - 2008: Survived the financial crisis by having no measurable business outcomes to lose
   - 2015: Expanded to 4 global offices (New York, London, Singapore, A WeWork in Omaha)
   - 2020: Pivoted to remote alignment (discovered meetings were even less productive on Zoom)
   - 2024: Surpassed 2,847 enterprise clients and 14 million meeting hours optimized
5. **Office locations** — "New York • London • Singapore • A WeWork in Omaha"
6. **CTA** — Links to Leadership and Contact pages

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add about page with origin story and timeline"
```

---

## Task 13: Create Leadership Page

**Files:**
- Create: `src/sites/strategicvoid/pages/leadership.tsx`

- [ ] **Step 1: Create the leadership page**

"use client" component. Export `metadata` object. Layout:

1. **Hero** — "Our Leadership" headline, subtitle about the team behind strategic alignment
2. **Executive grid** — Import executives from leadership.ts data. Render 4 ExecutiveCard components (import from `@/components/ui/executive-card`) in a 2x2 grid on desktop, stacked on mobile.
3. **CTA** — "Work With Us" linking to contact page

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add leadership page with executive cards"
```

---

## Task 14: Create Contact Page

**Files:**
- Create: `src/sites/strategicvoid/pages/contact.tsx`

- [ ] **Step 1: Create the contact page**

"use client" component with form state. Export `metadata` object. Layout:

1. **Hero** — "Schedule an Alignment Assessment" headline
2. **Contact form** — Fields: name (text), email (text), company (text), company size (select dropdown with absurd options: "1-50 stakeholders", "51-500 alignment participants", "501-5,000 synergy units", "5,001-50,000 optimization targets", "50,000+ (enterprise singularity)"), message (textarea). Submit button "Request Assessment." Form submits to nowhere (just shows a success message like "Your request has been aligned with our intake pipeline. A synergy specialist will reach out within 6-8 business quarters.").
3. **Office locations** — 4 fake locations with addresses
4. **Synergy Hotline** — "For urgent alignment emergencies, call our 24/7 Synergy Hotline" with a "Request Callback" button that does nothing
5. **Real contact** — Small text at bottom: "General inquiries: bsambrone@gmail.com"

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add contact page with satirical form"
```

---

## Task 15: Create Privacy Policy Page

**Files:**
- Create: `src/sites/strategicvoid/pages/privacy.tsx`

- [ ] **Step 1: Create the privacy policy page**

"use client" component. Export `metadata` object. Layout:

1. **Authority callout** — Prominent box at top: "This site is operated by Specific Industries. The authoritative privacy policy is available at specificindustries.com/privacy." Link to `https://specificindustries.com/privacy`.
2. **Title** — "Privacy Policy — Strategic Void Consulting"
3. **Last updated** — "Last updated: Q3 2025 (or possibly Q2 — we're not entirely sure)"
4. **15-20 sections** of corporate-obtuse satirical privacy content. NOT legalese — corporate speak. Each section has a heading and 2-4 paragraphs. Sections include:
   - Data Collection Philosophy
   - What We Collect
   - How We Use Your Information
   - Data Sharing & Third Parties
   - The Infinite Trust Chain™
   - Data Retention
   - Cookies & Tracking
   - Your Rights (Theoretical)
   - Data Security
   - International Transfers
   - Children's Privacy
   - Changes to This Policy
   - The Alignment Data Ecosystem
   - Data Portability (or Lack Thereof)
   - Contact Us About Privacy

   Key tone examples from spec:
   - "We collect data the way a squirrel collects acorns: compulsively, without clear purpose, and with the vague sense it might be useful later."
   - "Your data may be leveraged across our synergy ecosystem to optimize stakeholder alignment outcomes."
   - "We retain your data for as long as strategically ambiguous."

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add satirical privacy policy page"
```

---

## Task 16: Create Terms of Service Page

**Files:**
- Create: `src/sites/strategicvoid/pages/terms.tsx`

- [ ] **Step 1: Create the terms of service page**

"use client" component. Export `metadata` object. Same structure as privacy page:

1. **Authority callout** — Same pattern linking to `https://specificindustries.com/terms`
2. **Title** — "Terms of Service — Strategic Void Consulting"
3. **15-20 sections** of corporate-obtuse satirical terms. Sections include:
   - Acceptance of Terms
   - Definitions (That May Or May Not Help)
   - The Service (Broadly Defined)
   - Your Account (Our Account)
   - Acceptable Use (Subjectively Determined)
   - Intellectual Property
   - The C.H.A.O.S. Framework™ License
   - Service Level Agreements
   - Limitation of Liability
   - Indemnification (Mutual Confusion)
   - Confidentiality (Performative)
   - Termination
   - Dispute Resolution
   - Force Majeure (Creative Interpretation)
   - Governing Law
   - Severability
   - Entire Agreement (This Time We Mean It)

   Key tone examples from spec:
   - "By existing in the general vicinity of this website, you agree to these terms, all future revisions, and any terms we haven't written yet but intend to."
   - "Under no circumstances shall Strategic Void be held responsible for outcomes, non-outcomes, quasi-outcomes, or the philosophical implications of any work performed or not performed."

- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add satirical terms of service page"
```

---

## Task 17: Wire New Pages Into Site Barrel

**Files:**
- Modify: `src/sites/strategicvoid/index.ts`

- [ ] **Step 1: Import all 7 new page components and their metadata**
- [ ] **Step 2: Add to the pages map:**
```typescript
"methodology": { component: MethodologyPage, metadata: methodologyMetadata },
"pricing": { component: PricingPage, metadata: pricingMetadata },
"about": { component: AboutPage, metadata: aboutMetadata },
"leadership": { component: LeadershipPage, metadata: leadershipMetadata },
"contact": { component: ContactPage, metadata: contactMetadata },
"privacy": { component: PrivacyPage, metadata: privacyMetadata },
"terms": { component: TermsPage, metadata: termsMetadata },
```
- [ ] **Step 3: Run `npx tsc --noEmit`**
- [ ] **Step 4: Run `npm run build`**
- [ ] **Step 5: Commit**
```bash
git commit -m "feat: wire all unique pages into strategicvoid barrel"
```

---

## Verification Checklist

After all tasks are complete, verify:

- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] `npm run lint` has no new errors from our files
- [ ] All 8 solution pages show full descriptions and product grids
- [ ] All 34 product detail pages have descriptions, features, and specs
- [ ] All 8 solution pages have pricing tables
- [ ] Methodology page renders with C.H.A.O.S. diagram and phase breakdown
- [ ] Master pricing page renders with 4 tiers and feature comparison matrix
- [ ] About page renders with timeline and values
- [ ] Leadership page renders with 4 executive cards
- [ ] Contact page form works (shows success message on submit)
- [ ] Privacy and Terms pages render with authority callout and satirical content
- [ ] All new pages accessible via MegaMenu navigation
