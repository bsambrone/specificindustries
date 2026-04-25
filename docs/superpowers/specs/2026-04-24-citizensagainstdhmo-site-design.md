# Citizens Against DHMO — Site Design

**Subdomain:** `citizensagainstdhmo.specificindustries.com`
**Date:** 2026-04-24
**Status:** Design — pending implementation plan

## Concept

A satire site for **Citizens Against DHMO**, a fictional grassroots advocacy movement warning the public about the dangers of dihydrogen monoxide (DHMO) — i.e., water. Inspired by the 1997-vintage `dhmo.org`, but reimagined as a slick, modern viral-awareness campaign with NGO trappings: a leadership team, an impact dashboard, a petition, "survivor" testimonials, and dossier-style "Threat" pages.

The deadpan absurdity is reinforced by **never breaking character**. The org sounds like a serious health nonprofit — measured, fact-driven, mission-led. Every claim about DHMO is technically accurate (water *is* the major component of acid rain, water *is* found in tumors, drowning *does* require water) but framed with the urgency of a public health emergency. The joke detonates when the reader notices that the scary chemical in question is just water.

**Tone.** Earnest, citizen-led, "we just want answers." The leadership team are concerned professionals, not cranks. The petition is dignified. The survivor stories are heartfelt. Modern fearmongering tropes (data centers, microplastic-style ubiquity, wellness/seed-oils, schoolchildren, climate doom, influencer detox claims) are wrapped around the original DHMO copy. No winking.

**Modern angles introduced:**
- **AI/data centers** — every prompt is "DHMO-cooled"
- **Wellness/seed oils** — DHMO is found in 100% of processed foods
- **Microplastic-style ubiquity** — detected in blood, breast milk, the placenta, the deep sea
- **Influencer testimonials** — "I cut DHMO and lost 40 lbs in a week" (which is, of course, dehydration)
- **Schoolchildren panic** — "Public schools provide unlimited DHMO to minors"
- **Climate doom** — "Every hurricane, flood, and tsunami in history was 100% DHMO-driven"

## Architecture

Slots into the existing multi-subdomain pattern. No new App Router routes — everything goes through the catch-all.

```
src/sites/citizensagainstdhmo/
├── config.ts                       # SiteConfig — trust-blue NGO theme, features.commerce: false
├── index.ts                        # barrel: config, pages, dynamicRoutes
├── data/
│   ├── threats.ts                  # 10 threat dossiers + getThreatBySlug()
│   ├── stories.ts                  # 8 survivor stories + getStoryBySlug()
│   ├── sources.ts                  # 8 exposure sources + getSourceBySlug()
│   ├── leadership.ts               # 6 execs (random first + last names)
│   ├── impact-stats.ts             # impact dashboard counters
│   ├── facts.ts                    # "Did You Know?" rotating callouts (~12 facts)
│   └── timeline.ts                 # "Our Story" — founding narrative milestones
├── components/                     # site-local
│   ├── DidYouKnowTicker.tsx        # rotating did-you-know fact strip on the homepage
│   ├── PetitionForm.tsx            # decorative petition signup (no backend)
│   └── ThreatCard.tsx              # threat preview card used on home + /threats
└── pages/
    ├── home.tsx
    ├── threats.tsx                 # index of all 10 threats
    ├── threat-detail.tsx           # dynamic /threats/[slug]
    ├── stories.tsx                 # index of all 8 survivor stories
    ├── story-detail.tsx            # dynamic /stories/[slug]
    ├── sources.tsx                 # "Where It Hides" — index of 8 sources
    ├── source-detail.tsx           # dynamic /sources/[slug]
    ├── take-action.tsx             # petition form, share buttons, contact-rep template
    ├── impact.tsx                  # stats wall
    ├── leadership.tsx              # 6-exec team
    ├── about.tsx                   # mission, history, founding story
    ├── contact.tsx                 # bsambrone@gmail.com in small print
    ├── privacy.tsx                 # standard privacy + light satirical body
    └── terms.tsx                   # standard terms + light satirical body
```

**Registry wiring:**
- Add `citizensagainstdhmo` to `src/sites/registry.ts`
- Add `"citizensagainstdhmo"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Add `citizensagainstdhmo` to the `sites` array in `scripts/resize-favicons.mjs`
- Add the three dynamic routes (threats, stories, sources) to `src/app/sitemap.ts` so each detail URL is crawlable

**`features.commerce: false`.** No cart, no checkout, no `CartProvider` — petition is decorative and form-only.

## Theme

```ts
theme: {
  preset: "ngo",
  colors: {
    primary: "#134e6f",      // deep institutional blue
    secondary: "#c25b32",    // warm terracotta — nonprofit-CTA orange
    accent: "#7eb3d9",       // soft sky blue
    background: "#f8fafc",   // near-white
    text: "#1a2332",         // charcoal-slate
  },
  fonts: {
    heading: "source-serif-4",
    body: "inter",
  },
}
```

Both fonts already exist in `src/themes/fonts.ts` — no font additions needed.

The trust-blue palette is intentionally not "alarmist red." A serious, measured-looking nonprofit aesthetic makes the absurdity land harder when the reader notices what the org is actually warning about.

## Page Set & Navigation

| Nav Label    | URL              | Purpose                                                                |
|--------------|------------------|------------------------------------------------------------------------|
| The Threats  | `/threats`       | Index → 10 dynamic threat dossiers                                     |
| Where It Hides | `/sources`     | Index → 8 dynamic exposure-source pages                                |
| Stories      | `/stories`       | Index → 8 dynamic survivor stories                                     |
| Impact       | `/impact`        | Stats wall                                                             |
| Take Action  | `/take-action`   | Petition + share + contact-rep template                                |
| Leadership   | `/leadership`    | 6 execs                                                                |
| About        | `/about`         | Mission, history, founding story                                       |

Footer also surfaces: Contact, Privacy, Terms.

### Home page sections (top → bottom)

1. **Hero** — alarming headline ("DHMO is in everything you love"), supporting line, primary CTA "Sign the petition"
2. **Did-You-Know ticker** — rotating fact strip drawing from `data/facts.ts`
3. **The Threats** — preview grid of 4–6 threat cards linking into `/threats/[slug]`
4. **Impact snapshot** — 3–4 callout stats ("X citizens informed", "Y petition signatures", "Z school districts contacted")
5. **Survivor story spotlight** — single featured story with portrait + pull-quote
6. **Where It Hides** — preview tiles for 4 exposure sources
7. **Take action CTA** — petition form embedded inline

### Dynamic route detail pages

Each `[slug]` page is generated from a typed data record. The page layouts are reused across all entries in their respective routes (no per-slug bespoke layouts).

**`/threats/[slug]` layout:**
- Header: threat name + one-line tagline
- Hero image
- "The Evidence" — long-form body copy (3–6 paragraphs)
- "Documented Cases" — 2–3 mock case study callouts
- Stats sidebar — 2–3 alarming numbers
- "Related Threats" — links to 2 sibling threats

**`/stories/[slug]` layout:**
- Header: survivor name, age, location
- Portrait
- "In Their Own Words" — first-person testimonial (4–6 paragraphs)
- Pull-quote callout
- "What You Can Do" — link to `/take-action`

**`/sources/[slug]` layout:**
- Header: source name (e.g., "Public Schools", "Data Centers")
- Hero image
- "How It Gets In" — body copy (3–5 paragraphs)
- "Concentration Levels" — fake measurement table
- "Related Threats" — 2 cross-links

## Data Models

```ts
// data/threats.ts
type Threat = {
  slug: string
  name: string                    // "DHMO in AI Data Centers"
  tagline: string                 // shown on cards and detail header
  category: "tech" | "wellness" | "ubiquity" | "children" | "climate" | "classic"
  heroImage: string               // /sites/citizensagainstdhmo/threats/<slug>.png
  body: string[]                  // 3–6 paragraphs of evidence copy
  cases: { title: string; summary: string }[]   // 2–3 mock case studies
  stats: { label: string; value: string }[]     // 2–3 alarming numbers
  relatedSlugs: string[]
}

// data/stories.ts
type SurvivorStory = {
  slug: string
  name: string                    // randomized first + last
  age: number
  location: string
  occupation: string              // tech worker, soccer mom, etc.
  portrait: string
  testimonial: string[]           // 4–6 first-person paragraphs
  pullQuote: string
}

// data/sources.ts
type Source = {
  slug: string
  name: string                    // "Public Schools", "Data Centers"
  tagline: string
  heroImage: string
  body: string[]                  // 3–5 paragraphs
  measurements: { context: string; level: string }[]   // fake measurement rows
  relatedThreatSlugs: string[]
}
```

Each data file exports its array plus a `getXBySlug(slug)` lookup helper, matching the platform pattern.

## Content Plan

### 10 Threats
1. **DHMO in AI Data Centers** (tech) — every prompt is cooled by the same chemical
2. **The Hidden DHMO Pandemic** (ubiquity) — found in human blood, breast milk, the placenta, deep sea, Antarctic ice cores
3. **DHMO in Processed Foods** (wellness) — 100% of seed oils, snacks, packaged meals contain it
4. **Influencers Speak Out** (wellness) — testimonial-style threat about cleansing/detox claims
5. **DHMO in Public Schools** (children) — schools provide it freely to minors
6. **The Climate Connection** (climate) — every major hurricane, flood, tsunami is 100% DHMO-driven
7. **DHMO and Drowning** (classic) — the leading cause of drowning fatalities worldwide
8. **DHMO in Tumors** (classic) — present in 100% of malignant tumors studied
9. **The Acid Rain Component** (classic) — major component of acid rain by mass
10. **Infrastructure Erosion** (classic) — responsible for billions in property damage annually

### 8 Survivor Stories
- **Tech worker** (28, San Francisco) — "I was drinking it during every coding session"
- **Soccer mom** (43, Plano TX) — "I was giving it to my kids in their sippy cups"
- **Retiree** (71, Sarasota FL) — "60 years of unwitting exposure"
- **College student** (20, Boulder CO) — "My dorm fountain was full of it"
- **Gym influencer** (34, Miami) — "I cut DHMO and lost 40 lbs in a week" (dehydration joke)
- **Schoolteacher** (52, Boston) — "I had to start asking what was in the school's water cooler"
- **Contractor** (47, Phoenix) — "Job sites are saturated with DHMO"
- **Recovering hydration enthusiast** (29, Portland OR) — "I was drinking 8 cups a day of pure DHMO"

### 8 Sources (Where It Hides)
1. **Data Centers** — coolant for AI training facilities
2. **Infant Formula** — primary diluent
3. **Public Schools** — water fountains, cafeteria service, sports practice
4. **Hospital IVs** — administered intravenously to patients in vulnerable states
5. **Organic Produce** — sprayed on every harvest
6. **Gym Water Bottles** — concentrated exposure during exercise
7. **Weather Systems** — falls from the sky regularly
8. **The Human Bloodstream** — measurable in every adult tested

## Leadership Team (6)

Random first + last names per platform convention. Roles:

1. **Executive Director** — public face, founder
2. **Chief Science Officer** — credentialed researcher
3. **Director of Awareness & Outreach** — comms lead
4. **Head of Petition Strategy** — campaigns lead
5. **Director of Survivor Advocacy** — story program lead
6. **General Counsel** — legal

Each gets a portrait via `image-gen` MCP. Use `generate_image_with_person` where a base image fits the role (named base people `bill`, `brandon`, `jim`, `sean` are male — match character gender accordingly per platform convention).

## Imagery

- **Hero image** — concerned citizen at a kitchen sink with chemical-overlay graphics, OR a magnified water droplet with lab annotations
- **6 leadership portraits** — professional headshots, NGO-aesthetic
- **10 threat hero images** — one per threat detail page
- **8 survivor portraits** — one per story
- **8 source hero images** — one per "Where It Hides" page
- **Favicon** — generated at multiple sizes; 64x64 registered in `scripts/resize-favicons.mjs`

Total: ~33 generated images. All saved under `public/sites/citizensagainstdhmo/`.

## Components

Reuses existing shared components from `src/components/ui/`:
- `Hero` — homepage hero
- `FeatureSection` — homepage threat/source preview rows
- `Timeline` — "Our Story" milestones on About page
- `TeamMember` — leadership grid
- `FaqAccordion` — could appear on `/about` ("Frequently Asked Questions about DHMO")

**Site-local components (3):**
- `DidYouKnowTicker` — rotating fact strip
- `PetitionForm` — decorative form (no backend)
- `ThreatCard` — preview card for threat lists

No new shared components needed — content fits existing primitives.

## Out of Scope

- **No commerce.** No products, no cart, no checkout.
- **No newsletter backend.** Forms are decorative.
- **No real petition backend.** Submitting the form shows a thank-you toast; no data persisted.
- **No per-slug bespoke layouts.** All threats / stories / sources use a single shared layout per route.
- **No A/B variations or feature flags.**

## Success Criteria

- `citizensagainstdhmo.specificindustries.com` loads with the trust-blue NGO theme
- All 10 static URLs return 200 with site-specific content
- All 26 dynamic detail URLs (10 threats + 8 stories + 8 sources) return 200; invalid slugs return 404
- All 33 images load from `public/sites/citizensagainstdhmo/`
- Header, Footer, navigation work
- `npm run lint` and `npx tsc --noEmit` pass
- Site is added to `sitemap.ts` and dynamic detail URLs appear in the sitemap output
