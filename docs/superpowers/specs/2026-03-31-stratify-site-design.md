# Stratify Site Design Spec

**Subdomain:** `stratify.specificindustries.com`
**Full Name:** Stratified Commerce And Marketing (each word capitalized; never abbreviated on-site)
**Display Name:** Stratify (used in nav, header, footer, general references)
**Date:** 2026-03-31

## Concept

Stratify is an MLM parody disguised as a "vertically-optimized, stratified commerce ecosystem leveraging decentralized entrepreneurial layers to unlock exponential personal monetization."

The site never calls itself an MLM. It uses thinly veiled alternative terminology for every MLM concept. The full name "Stratified Commerce And Marketing" appears on the homepage and legal pages with each word capitalized, allowing readers to notice the acronym on their own. It is never pointed out or acknowledged except for a brief allusion to "an unfortunate acronym" buried in the terms.

## Terminology Translation Table

This is the backbone of the satire. All site copy uses the SCAM term exclusively.

| MLM Term | SCAM Term |
|----------|-----------|
| Downline | Subordinate Revenue Layers |
| Upline | Executive Elevation Sponsor |
| Pyramid | Stratified Growth Architecture™ |
| Recruitment | Layer Expansion Initiative |
| Selling products | Value Distribution Events |
| Starter kit | Entry-Level Monetization Bundle |
| Commission | Performance-Derived Yield |
| Rank | Stratification Tier |
| Passive income | Asynchronous Revenue Flow |
| Team building | Layer Density Optimization |
| Quitting job | Corporate Exit Event |
| Monthly autoship | Recurring Commitment Protocol (RCP) |
| Training calls | Leadership Alignment Webinars |

## Tone

50/50 split between corporate consulting jargon and infomercial hype. Headlines scream ("STOP trading time for money!") while body copy is dense jargon ("Our asynchronous revenue flow model decouples your earning potential from temporal constraints"). The tonal whiplash IS the joke. Accurate to how MLMs actually present themselves — hype on the surface, jargon when questioned.

Key phrases to use throughout: "unlocking value," "distributed leadership," "scalable human capital," "frictionless monetization pathways," "non-linear upside potential," "theoretical yield ceiling."

## Theme & Visual Identity

**Preset name:** `"prosperity"`

**Colors:**
- Primary: `#0a1628` (deep navy)
- Secondary: `#c9a227` (gold)
- Accent: `#e8c840` (bright gold)
- Background: `#060e1a` (very dark navy)
- Text: `#f0ece4` (off-white)

**Fonts:**
- Heading: `space-grotesk`
- Body: `inter`

**Aesthetic:** Dark navy/gold "Corporate Prosperity." MLM conference stage energy — "this looks expensive" meets "this looks like a scam." Gold-on-navy is the MLM keynote aesthetic.

## Site Config

```typescript
{
  name: "Stratify",
  subdomain: "stratify",
  theme: {
    preset: "prosperity",
    colors: { primary, secondary, accent, background, text },
    fonts: { heading: "space-grotesk", body: "inter" }
  },
  metadata: {
    title: "Stratify — Own Your Layer",
    description: "A vertically-optimized, stratified commerce ecosystem."
  },
  nav: [
    { label: "Opportunity", href: "/opportunity" },
    { label: "Stratification Tiers", href: "/tiers" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Leadership", href: "/leadership" },
    { label: "Events", href: "/events" },
    { label: "Join Now", href: "/onboarding/step-1", isButton: true }
  ],
  features: { commerce: false }
}
```

Note: The "Join Now" nav item should be styled as a CTA button (gold background). This may require a small addition to the nav item type to support a `isButton` or similar flag, or handled via convention in the header component.

## Page Structure

### Static Pages

| Route | Page | Description |
|-------|------|-------------|
| `""` | Home | Hero, how it works diagram, tier overview, testimonials, CTAs |
| `"opportunity"` | Opportunity | The pitch. Compensation model, fake charts, "why Stratify" |
| `"tiers"` | Stratification Tiers | Full breakdown of Layer 0–4, pricing, RCP costs |
| `"success-stories"` | Success Stories | 8 unhinged testimonials as mini case studies |
| `"leadership"` | Leadership | Executive team with generated portraits |
| `"events"` | Events | Upcoming webinars, summits, retreats |
| `"privacy"` | Privacy Policy | Spells out full name, hilarious legalese |
| `"terms"` | Terms of Use | Full terminology table, "not a pyramid" disclaimers |

### Dynamic Routes

| Pattern | Component | Description |
|---------|-----------|-------------|
| `"onboarding/[step]"` | OnboardingStep | 8-step funnel with distinct URLs per step |

## Commerce

**No commerce system.** `features.commerce: false`. No cart, no checkout, no add-to-cart buttons.

Instead, the site has three monetization mechanics, all of which funnel into the onboarding flow:

1. **Entry-Level Monetization Bundle ($199)** — The starter package to join Layer 1. All "Join" CTAs route to `/onboarding/step-1`.
2. **Tier elevation purchases** — Upgrading from one layer to the next costs escalating fees ($199 → $499 → $1,499 → "by invitation"). All CTAs route to `/onboarding/step-1`.
3. **Recurring Commitment Protocol (RCP)** — Monthly fees to maintain tier status ($49–$499/mo). Described on the tiers page. Failure to pay results in "Downward Stratification Adjustment."

No money is ever actually collected. Every purchase CTA leads to the onboarding funnel.

## Cross-Site References

Subtle namedrop references woven into testimonials and copy. No dedicated catalog or partner page. Examples:
- Pig Milk references in success stories and onboarding questions
- Dehydrated water mentions in testimonials
- Inflatable anchor references in onboarding questions
- Strategic Void-style corporate language as background flavor

These reward visitors who know the other sites without requiring a dedicated page.

---

## Page Designs

### Homepage

**1. Hero**
- Headline: "Stop Working IN the Economy. Start Owning Your LAYER of It."
- Subtext: "Stratify empowers individuals to ascend through strategic stratification. The only question is: which layer will you claim?"
- Two CTAs: "Enter the First Layer" (→ /onboarding/step-1) and "See the Opportunity" (→ /opportunity)
- Background: dark navy with subtle gold gradient

**2. Tagline Strip**
- Full-width gold bar displaying "Stratified Commerce And Marketing" — each word capitalized. No further comment. No abbreviation. Just sitting there waiting to be noticed.

**3. "How It Works" — Stratified Growth Architecture™**
- Geological strata diagram (the StrataDiagram component). Five horizontal layers, widest at bottom, narrowest at top. Gold (Layer 4: Apex Executive Node) at the peak, progressively darker navy toward the bottom (Layer 0: Observer).
- Caption: "Each layer supports and amplifies the layers beneath it."
- Brief description of three mechanics: Join → Distribute → Elevate
- No real math anywhere

**4. Tier Overview (condensed)**
- Cards showing Layer 0 through Layer 4 with one-line descriptions and "theoretical yield ranges" ($X–$XX,XXX/mo*)
- Asterisk footnote: "*Yield projections based on optimal layer density conditions. Individual results depend on subordinate layer activity."
- CTA: "Explore All Tiers" → /tiers

**5. Fake Metrics Strip**
- Animated counters: "14,000+ Layer Participants" / "230% Average Yield Growth*" / "$47M+ Total Value Distributed" / "98.6% Satisfaction Rating"

**6. Testimonials**
- 3-4 selected testimonials from the full set of 8 (teasers)
- CTA to "Read More Success Stories" → /success-stories

**7. Final CTA Block**
- Headline: "Your Layer Is Waiting."
- Urgency text: "Layer 1 positions in your region are filling fast. Don't let someone else claim your yield potential."
- Button: "Begin Your Elevation" → /onboarding/step-1

### Opportunity Page

**1. Hero**
- Headline: "What If Your Income Had No Ceiling?"
- Subtext: "Traditional employment caps your earning potential. Stratify's Multi-Layer Yield Distribution Model™ removes the cap entirely."

**2. "The Problem" Section**
- Dramatic comparison: "Traditional Income" (flat line chart) vs "Stratified Income" (exponential hockey stick)
- Charts never have Y-axis labels or actual numbers
- Copy about "trading time for money" and "linear income traps"

**3. Multi-Layer Yield Distribution Model™**
- Dense corporate jargon explaining yield from:
  - "Your own Value Distribution Events"
  - "Activity within your Subordinate Revenue Layers"
  - "Indirect Tertiary Expansion Events"
- Diagram showing yield flowing upward through layers with arrows
- Phrases: "non-linear upside potential," "theoretical yield ceiling: unlimited*"

**4. "Three Pillars of Stratified Wealth"**
- **Distribute** — "Facilitate value transfer between the ecosystem and end consumers"
- **Elevate** — "Expand your layer density through strategic relationship activation"
- **Sustain** — "Maintain your position through Recurring Commitment Protocol participation"

**5. Income Disclaimer (small text, bottom)**
- "Results not typical. 94% of participants earn less than their Recurring Commitment Protocol fees. Stratify makes no guarantees regarding income. The term 'yield' does not imply financial return."

### Stratification Tiers Page

**1. Hero**
- Headline: "Every Layer Has a Purpose. Yours Is Waiting."
- Subtext: "Ascend through the Stratified Growth Architecture™ at your own pace. Or someone else's."

**2. Tier Cards**

| Tier | Name | Monthly RCP | Elevation Fee | Key Unlock |
|------|------|-------------|---------------|------------|
| Layer 0 | Observer | Free | Free | "Access to educational materials and the privilege of watching others succeed" |
| Layer 1 | Participant | $49/mo | $199 starter bundle | "Begin distributing value. Access to 2 Subordinate Revenue Layer slots" |
| Layer 2 | Amplifier | $99/mo | $499 upgrade | "Expanded layer capacity. Up to 8 Subordinate Revenue Layers. Yield amplification begins." |
| Layer 3 | Orchestrator | $249/mo | $1,499 upgrade | "Multi-layer management dashboard. 'Unlimited' subordinate layers. Invitation to Leadership Alignment Webinars." |
| Layer 4 | Apex Executive Node | $499/mo | By invitation only | "No longer interacts with products. Pure yield. Corner office in the architecture." |

- Layer 4 has no public price — "Elevation to Apex Executive Node is by nomination from existing Apex members only."
- Every card's CTA links to `/onboarding/step-1`

**3. Downward Stratification Adjustment Warning**
- Styled as an important notice: "Participants who fail to maintain their Recurring Commitment Protocol may experience a Downward Stratification Adjustment. This process is automatic and irreversible within the current billing cycle. Stratify is not responsible for emotional distress caused by layer demotion."

**4. Comparison Table**
- Side-by-side feature matrix. Lots of checkmarks for Layer 3-4, almost none for Layer 0-1.
- Features: "Access to Subordinate Revenue Layers," "Yield Amplification Multiplier," "Leadership Alignment Webinar Access," "Custom Stratification Dashboard," "Annual Layer Expansion Summit VIP Pass," "Personalized Elevation Coaching," "Priority Yield Processing"

### Success Stories Page

**1. Hero**
- Headline: "Real People. Real Layers. Real Results.*"
- Asterisk at bottom of page: "*Results not typical. See income disclosure."

**2. Eight Success Story Cards**

**Story 1: "From Cubicle to Layer 3 in 90 Days"**
- *Derek M., Regional Layer Facilitator*
- Before: "I was trading 40 hours a week for a fixed salary like some kind of economic pedestrian."
- After: "My subordinate layers now generate yield while I sleep. My wife says I've changed. I tell her — I've *elevated*."

**Story 2: "My Family IS My Layer"**
- *Tamara K., Senior Amplifier*
- Before: "I had a great relationship with my family but zero passive income streams from them."
- After: "My parents, my sister, and three cousins are now active in my subordinate layers. Thanksgiving is a Leadership Alignment Webinar now. My brother-in-law still hasn't joined. We don't talk about that."

**Story 3: "I Moved 400 Units of Pig Milk Last Quarter"**
- *Nathan R., Layer 2 Amplifier*
- Before: "I didn't even know pig milk was a monetizable vertical."
- After: "Through my distribution layers, I've facilitated over 400 Value Distribution Events in the dairy-adjacent space. My layers are thriving."

**Story 4: "I Don't Even Know What We Sell"**
- *Brenda W., Layer 4 Apex Executive Node*
- Before: "I used to ask a lot of questions about the products."
- After: "At Layer 4, I've transcended the product. I am the architecture. My yield comes from the momentum of others. I haven't touched inventory in 18 months. This is freedom."

**Story 5: "They Said It Was a Pyramid. I Said It Was a Career."**
- *Marcus T., Orchestrator*
- Before: "Friends kept sending me articles. My LinkedIn connections were declining."
- After: "Those same friends are now in my Layer 2. The articles stopped. Funny how that works."

**Story 6: "I Hydrate Differently Now"**
- *Lisa P., Layer 2 Amplifier*
- Before: "I was spending money on regular water like everyone else."
- After: "Through Stratify I discovered dehydrated water and honestly it's changed my entire hydration philosophy. My subordinate layers are distributing it across three zip codes. Do I understand the science? No. Does my yield care? Also no."

**Story 7: "My Landlord Is Now in My Layer"**
- *Jordan F., Orchestrator*
- Before: "I was paying rent. Just... giving money to someone above me. With no yield."
- After: "I pitched my landlord during a maintenance visit. He's now Layer 1 in my structure. I still pay rent but now I earn yield from his activity. The power dynamic has shifted in ways I don't fully understand."

**Story 8: "I Quit My Job on a Webinar"**
- *Stephanie V., Senior Amplifier*
- Before: "I had PTO, health insurance, and a 401k match."
- After: "I executed a Corporate Exit Event live during a Leadership Alignment Webinar. 200 people watched. My former boss asked if I was okay. I told him I was Layer 3. He didn't know what that meant. He will."

**3. Fake Statistics Bar**
- "Average time to Layer 2: 47 days" / "Layer participant retention rate: 97%*" / "Average yield increase per elevation: 340%"
- Asterisk: "*Retention measured from last RCP payment, not from original enrollment."

### Leadership Page

Following the strategicvoid pattern — hero, executive cards with generated portraits.

**1. Hero**
- Headline: "The Architects of Your Elevation"
- Subtext: "Our leadership team has over 47 combined years of experience in stratified commerce, decentralized yield optimization, and human capital activation."

**2. Executive Cards**

**Buck Stratton** — *Founder & Chief Elevation Architect*
- referencePerson: "bill"
- Bio: The visionary. Discovered stratification "while on a cross-country RV trip funded entirely by subordinate layer activity." Previously worked in "an industry" for "several years." Claims to have "invented the concept of Layer Density Optimization during a fever dream in Scottsdale." Speaks exclusively in motivational imperatives. Has been compared to "a young Billy Mays with better posture."
- Quote: "I didn't build a company. I built a geometry."

**Chase Worthington** — *Executive Vice President of Layer Density*
- referencePerson: "brandon"
- Bio: The hype man. "Joined Stratify at Layer 1 and reached Apex Executive Node in 11 months — a record he set and then immediately retired." Known for his "legendary recruitment weekends" and "standing-room-only parking lot seminars." His LinkedIn has 40,000 connections, "all of whom are in his structure."
- Quote: "Every person you know is an untapped layer."

**Hank Leveraux** — *Senior Director, Yield Amplification*
- referencePerson: "jim"
- Bio: The everyman success story. "Former middle manager who 'saw the architecture' and never looked back." Fond of saying "I'm just a regular guy who happened to build 14 subordinate layers." Hobbies include "mentoring, yield tracking, and converting casual conversations into onboarding opportunities."
- Quote: "People say it sounds too good to be true. I say it sounds too good to be employment."

**Cliff Ascendant** — *Chief Momentum Officer*
- referencePerson: "sean"
- Bio: The mystic. "No one is quite sure when Cliff joined Stratify or what he did before. His official bio states he 'emerged from the layers fully formed.'" Runs all Leadership Alignment Webinars. "Speaks in a calm, measured tone that makes everything sound both reasonable and inevitable." Has a "proprietary motivational framework he calls 'Ascendancy Dynamics' which he has never explained."
- Quote: "You don't join Stratify. Stratify was always there. You just finally noticed."

### Events Page

**1. Hero**
- Headline: "Align. Elevate. Converge."
- Subtext: "Stratify events are where layers become legends. Attendance is optional. Regret is permanent."

**2. Upcoming Events**

All events are perpetually "upcoming" with dates that are always a few weeks in the future (hardcoded, not dynamic). No actual registration — CTAs go to the onboarding funnel.

**Weekly Leadership Alignment Webinar**
- Virtual, every Thursday 9pm EST
- "Hosted by Cliff Ascendant. Topics rotate between yield optimization, layer expansion techniques, and 'mindset recalibration.' Attendance is strongly correlated with elevation velocity. Camera on is mandatory."

**Layer Expansion Summit 2026**
- 3-day conference, "Marriott Adjacent Venue, Orlando FL"
- "Our flagship annual event. Keynotes from all four Apex leaders. Breakout sessions include 'Converting Family Members Without Losing Them (Permanently)' and 'Advanced Subordinate Layer Retention.' VIP pass includes lanyard and one complimentary Performance Air™ canister."

**Regional Yield Intensive**
- In-person, "Various Hotel Conference Rooms"
- "A 6-hour deep dive into your local market's layer potential. Bring a list of 25 contacts. You'll leave with a list of 0 contacts who haven't been pitched."

**New Participant Orientation: First 48 Hours**
- Virtual, on-demand
- "What to do in your first 48 hours as a Layer 1 Participant. Covers: updating your LinkedIn headline, the art of the casual mention, and how to answer 'is this a pyramid scheme' without technically lying."

**Apex Executive Node Retreat**
- "Private island (coordinates disclosed upon elevation)"
- "Layer 4 members only. Details are not available to your current stratification level."

**3. Past Event "Highlights"**
- Fake photo captions: "Buck Stratton delivers the keynote 'Your Job Is Not Your Friend' to 2,000 attendees" / "Layer 2 participants celebrate their first Subordinate Revenue Layer at the networking mixer"
- Fake attendance stats: "Last year's Summit: 4,200 attendees, 12 countries, 1 geometry"

### Onboarding Funnel

Dynamic route at `/onboarding/[step]` with 8 steps. Data defined in `src/sites/stratify/data/onboarding.ts`.

**Global elements (every step):**
- **Progress bar** that never exceeds 60% and goes backward at least once
- **Urgency banner** rotating messages: "Layer 1 positions are limited in your area!" / "Someone in your network is already being onboarded!" / "This page expires in 14:59..." (fake countdown that resets on page load)
- **"Continue to Next Step" button** — navigates to next step URL. No data is submitted.

**Step 1: "Let's Get Started"** (`/onboarding/step-1`) — *Completely normal*
- First name, last name, email, phone
- "What excites you most about financial independence?" (dropdown: "Freedom," "Flexibility," "Yield," "All of the above")
- Feels like any SaaS signup form

**Step 2: "Tell Us About Your Current Situation"** (`/onboarding/step-2`)
- Employment status, job title, annual income range
- "How many hours per week do you spend on activities that don't generate revenue?"
- "Would you describe your current income as 'enough'?" (only option: No)

**Step 3: "Assessing Your Network Potential"** (`/onboarding/step-3`)
- "How many contacts are in your phone?" (number input)
- Social media follower counts: Facebook, Instagram, LinkedIn, TikTok, "Other (please specify)"
- "Rate your persuasion ability on a scale of 1-10"
- "How often do people describe you as 'persistent'?" (dropdown: "Often," "Very often," "They used a different word")

**Step 4: "Financial Readiness Assessment"** (`/onboarding/step-4`)
- Bank name, "available liquid capital for investment in your future"
- "How many family members are in your immediate influence network?"
- "Are you comfortable making financial decisions without consulting a spouse or partner?" (yes/no)
- "Have you ever purchased something that others 'didn't understand'?" (yes/no)

**Step 5: "Compatibility Verification"** (`/onboarding/step-5`)
- Social security number ("for Layer Compatibility Scoring™")
- Blood type
- Dominant hand
- Shoe size
- "Are you comfortable selling pig milk?" (yes/no)
- "From a scale of 3 to 16, how corporate are you?" (slider, 3 to 16)

**Step 6: "Lifestyle Alignment Index"** (`/onboarding/step-6`)
- "Upload a photo of your refrigerator" (real file picker that accepts any file, but never uploads anything — after selection, simply displays "Gross." as the response regardless of what was chosen)
- "Can you lift not-heavy anchors?" (yes/no)
- "What is your relationship with your most financially successful friend?" (textarea)
- "Describe a color that doesn't exist" (text input)
- "How many glasses of water do you drink per day? (dehydrated is acceptable)" (number input)

**Step 7: "Deep Verification Protocol"** (`/onboarding/step-7`)
- "Emergency contact for your emergency contact"
- "Childhood nickname your family doesn't know you remember"
- "Please describe a dream you had this week in detail" (textarea)
- "Have you ever been described as 'persistent' by someone who stopped returning your calls?" (yes/no)
- "Rate your comfort level operating in a void (1-10)"
- "If you could be any layer, which layer would you be and why?" (textarea)

**Step 8: "Final Verification"** (`/onboarding/step-8`) — *No form fields*
- Fake loading screen: "Calculating your Stratification Compatibility Index..."
- Animated progress bar that crawls to 100% over ~15 seconds
- Cycling processing messages: "Analyzing network density..." / "Cross-referencing blood type with yield potential..." / "Verifying refrigerator contents..." / "Consulting the architecture..."
- Resolves to: **"Congratulations! You have been placed at Layer 0: Observer."**
- Subtext: "You are now eligible to observe others succeeding. To begin your own elevation, purchase the Entry-Level Monetization Bundle ($199)."
- CTA: "Purchase Layer 1 Elevation" → loops back to `/onboarding/step-1`

### Privacy Policy

**Top callout** (matching pigmilk pattern):
- Same styled box as other sites: "The authoritative privacy policy for all Specific Industries properties is maintained at specificindustries.com. View Terms of Use"

**Hero:**
- Headline: "Privacy Policy"
- Subheadline: "Your data is an asset. Specifically, ours."

**Content** opens with: "Stratified Commerce And Marketing ('Stratify,' 'we,' 'the Architecture') values your privacy in the same way we value all assets — as potential yield."

**Sections:**
- **Information We Collect** — References everything from the onboarding funnel. "Including but not limited to: refrigerator photographs, dream journals, blood type, and your relationship with your most financially successful friend."
- **How We Use Your Information** — "To calculate your Stratification Compatibility Index, optimize your layer placement, and share with your Executive Elevation Sponsor."
- **Information Sharing** — "Your data may be shared with your upward layer chain. This is not optional. This is architecture."
- **Data Retention** — "Your data is retained for the duration of your participation and for a period of no less than forever."

### Terms of Use

**Top callout** (matching pigmilk pattern):
- Same styled box: authoritative policy link to specificindustries.com

**Hero:**
- Headline: "Terms of Use"

**Content** opens with: "By accessing this website you acknowledge that Stratified Commerce And Marketing is not, has never been, and — despite what you may have read — will never be a multi-level marketing organization. Any resemblance to geometric shapes, living or dead, is purely coincidental."

**Sections:**
- **Definitions** — The full MLM-to-SCAM terminology translation table presented as legal definitions
- **Recurring Commitment Protocol** — "By elevating to any tier above Observer, you agree to monthly Layer Maintenance Contributions. Failure to maintain RCP results in Downward Stratification Adjustment, which is automatic, irreversible, and emotionally devastating."
- **Income Disclaimer** — "Stratify does not guarantee income of any kind. The word 'yield' as used throughout this site refers to a proprietary concept that does not correspond to money, revenue, profit, or any recognized financial instrument. 94% of participants earn less than their RCP fees. This is by design."
- **Not a Pyramid** — "The Stratified Growth Architecture™ is a vertically integrated commerce ecosystem. It is not a pyramid. Pyramids are ancient structures with no revenue model. We have a revenue model. It flows upward. This is different."
- **Unfortunate Acronym** — Brief acknowledgment that the initials of Stratified Commerce And Marketing "may form a word that some associate with fraudulent activity. This is coincidental. We considered renaming but the letterhead was already printed."

### Footer

Standard pattern matching other sites:
- "© 2026 Stratify. A Specific Industries company." (with link to apex)
- Privacy Policy, Terms of Use links (local)
- Disclaimer link → specificindustries.com/disclaimer

---

## Components

### Reuse from shared components
- `Hero` — standard hero for each page
- `TestimonialGrid` — for success stories (may need adaptation for before/after format)
- `StatStrip` / `AnimatedCounter` — for fake metrics
- `Header` / `Footer` — standard layout
- `PricingTable` — for tier comparison matrix (evaluate fit, may need new component)

### New components (`src/components/ui/`)
- **`StrataDiagram`** — Geological strata pyramid visualization. Horizontal layers, widest at bottom, color-graded navy to gold. Labels for each tier. Caption slot. Reusable.
- **`TierCard`** — Stratification tier card showing tier name, layer number, price, RCP cost, features list, CTA button. Styled with gold accents for higher tiers.

### New site-specific components (`src/sites/stratify/`)
- **`OnboardingForm`** — Client component. Renders form fields dynamically from step data. Handles fake countdown timer, urgency banners, progress bar, and step navigation. Field types: text, select, radio, scale, slider, textarea, checkbox, file upload (real picker, never uploads, displays "Gross." after selection), yes/no toggle.
- **`FakeLoadingScreen`** — Step 8 finale. Animated progress bar, cycling processing messages, congratulations reveal. Client component with timer/animation state.

### Nav CTA button
The "Join Now" nav item needs to be styled as a gold CTA button in the header. This may require adding an `isButton` flag to the nav item type or handling it via a convention in the Header component. Evaluate the simplest approach during implementation — could be as simple as checking if the label is "Join Now" or adding a style hint to the NavItem type.

## Data Files (`src/sites/stratify/data/`)

- **`tiers.ts`** — Layer 0–4 definitions: name, tier number, monthly RCP cost, elevation fee, description, features list, unlock descriptions
- **`onboarding.ts`** — Array of 8 step definitions, each with slug, title, subtitle, and fields array. Field objects define type, label, placeholder, options (for selects/radios), min/max (for sliders)
- **`testimonials.ts`** — All 8 success stories with name, title, before text, after text
- **`events.ts`** — Event listings with name, type (virtual/in-person), date/frequency, location, description
- **`leadership.ts`** — Four executives: slug, name, title, bio, quote, image path, referencePerson

## Static Assets

- `public/sites/stratify/favicon.png` — Site favicon (gold/navy themed)
- `public/sites/stratify/exec-stratton.png` — Buck Stratton portrait (generated via MCP)
- `public/sites/stratify/exec-worthington.png` — Chase Worthington portrait (generated via MCP)
- `public/sites/stratify/exec-leveraux.png` — Hank Leveraux portrait (generated via MCP)
- `public/sites/stratify/exec-ascendant.png` — Cliff Ascendant portrait (generated via MCP)

## Registry

Add to `src/sites/registry.ts`:
```typescript
stratify: { config: stratifyConfig, pages: stratifyPages, dynamicRoutes: stratifyDynamicRoutes }
```

## Architecture Decisions

1. **No commerce system** — Products are gated behind layer membership. All purchase CTAs route to the onboarding funnel.
2. **Approach C (Hybrid)** — Lean site structure with rich onboarding funnel via dynamic routes. The onboarding is the comedic centerpiece and gets the most investment.
3. **Onboarding as dynamic route** — `/onboarding/[step]` with validated step slugs. Each step has a distinct, shareable URL.
4. **No data submission** — The onboarding form collects nothing. "Continue" buttons just navigate to the next step URL. No state persists between steps.
5. **Cross-site references via copy only** — No dedicated partner page or product catalog. Easter eggs in testimonials and onboarding questions.
