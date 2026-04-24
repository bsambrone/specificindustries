# Campaign for Sustainable Overreactions — Site Design

**Subdomain:** `carbonneutraloutrage`
**Date:** 2026-04-23

## 1. Concept

A satirical advocacy nonprofit dedicated to making outrage more environmentally friendly. The Campaign for Sustainable Overreactions (CSO) campaigns under the banner: "If you must overreact, do it responsibly."

The site adopts the institutional scaffolding of a 501(c)(3) nonprofit (mission, board, programs, annual impact, donate) with a research/think-tank streak (fake studies, certifications, methodology). Voice is earnest, mildly self-important nonprofit-speak — fake statistics are precise and absurd ("the average suburban tantrum emits 3.2 kg CO₂e"). No winks at the camera; the absurdity comes from playing it straight.

## 2. Identity & Configuration

| Field | Value |
|---|---|
| Subdomain | `carbonneutraloutrage` |
| Org name | Campaign for Sustainable Overreactions |
| Short name | CSO |
| Tagline | "If you must overreact, do it responsibly." |
| `verticalKey` | `health-wellness` |
| `features.commerce` | `false` (donate-only flow; no cart) |
| OG image | `/sites/carbonneutraloutrage/hero.png` (homepage hero) |
| Favicon | `public/sites/carbonneutraloutrage/favicon.png` (64×64) |

**Required setup steps per portfolio conventions:**
- Add `carbonneutraloutrage` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Register in `src/sites/registry.ts`
- Add favicon to the `sites` array in `scripts/resize-favicons.mjs`
- Update `src/app/sitemap.ts` to import the programs array and emit `/programs/<slug>` URLs (see §6 dynamic routes)

## 3. Theme

All required fonts are already registered in `src/themes/fonts.ts`; no new font plumbing.

**Typography:**
- Heading: `fraunces` — transitional serif with warmth; editorial NGO feel
- Body: `work-sans` — clean neutral sans

**Color palette (modern NGO + earthy accents):**

| Token | Value | Use |
|---|---|---|
| Primary | `#1f4d3a` (deep evergreen) | Buttons, links, H1 accents |
| Secondary | `#c96a47` (terracotta) | Secondary CTAs, callouts, chart highlights |
| Background | `#f6f1e7` (recycled-paper cream) | Page background |
| Surface | `#ffffff` | Cards, forms |
| Muted | `#87a287` (sage) | Subtle borders, tertiary UI |
| Text | `#2a2724` (warm charcoal) | Body text |
| TextMuted | `#5c5751` | Captions, metadata |

**Visual motifs:**
- Subtle recycled-paper texture on the page background (CSS-only — no image asset)
- Hand-drawn line motifs in program iconography (delivered as part of program hero images)
- Charts on `/impact` use only Primary green and Secondary terracotta

The yellow-on-light contrast rule (`feedback_yellow_on_light.md`) does not apply here; both accent colors are high-contrast on cream.

## 4. Information Architecture

### 4.1 Static pages (auto-included in sitemap via registry loop)

| Route | Purpose |
|---|---|
| `/` | Hero, mission pitch, featured programs, impact ticker, donate CTA |
| `/about` | Mission, founding history (the 2017 founding myth), theory of change, link to fake 990 |
| `/programs` | Index of all 8 programs as cards |
| `/impact` | Annual Impact Report — fake stats, charts, beneficiary testimonials |
| `/take-action` | Pledge of Responsible Outrage; chapter directory; events |
| `/donate` | Tiered parody donation form (no real plumbing) |
| `/leadership` | The four canonical executives |
| `/contact` | Satirical contact page; real `bsambrone@gmail.com` in small print |
| `/privacy` | Umbrella callout + satirical body |
| `/terms` | Umbrella callout + satirical body |

### 4.2 Dynamic routes

`/programs/[slug]` — one detail page per program (8 total). Defined in the site barrel as `dynamicRoutes.programs` with `component`, `getMetadata`, and `isValidSlug` keyed off the programs data file. The sitemap must be updated to import the programs array and emit a URL per slug.

## 5. Programs

Eight programs, each with its own detail page. Order shown is the recommended display order on `/programs`.

| Slug | Program name | One-line pitch |
|---|---|---|
| `outrage-kits` | Carbon-Neutral Outrage Kits | Pre-assembled freakout supplies sourced from FSC-certified suppliers; offsets included. |
| `reusable-pitchforks` | The Reusable Pitchfork Initiative | Bamboo-handled, modular-tine pitchforks rated for 10,000 uprisings; we sharpen and re-issue. |
| `outrage-of-the-month` | Outrage of the Month Club | Curated monthly cause delivered to your inbox so you never overreact to the wrong thing. |
| `outrage-offsets` | Verified Outrage Offsets™ | Cap-and-trade for tantrums; buy credits to neutralize a particularly wasteful freakout. |
| `tantrum-footprint` | Tantrum Footprint Calculator | Estimate the CO₂e of your last meltdown across decibels, duration, and slammed-door count. |
| `reforestation-through-rage` | Reforestation Through Rage™ | Every 100 tweets plants a tree; every quote-tweet plants a sapling. |
| `composted-hot-takes` | Composted Hot Takes | Drop expired opinions into our municipal bins; we mulch them into community gardens. |
| `certified-overreactor` | Certified Responsible Overreactor™ | Eight-week credentialing program with a fake exam, fake CEUs, and a digital lapel pin. |

### 5.1 Standard program detail page structure

Every program detail page follows the same shape:

1. **Hero** — program name (with ™/® where appropriate), tagline, hero image
2. **The Problem** — 1 short paragraph of fake crisis framing
3. **How It Works** — 3-step numbered list
4. **By the Numbers** — 3 fake stats in callout cards
5. **Voices of Responsible Outrage** — 8-testimonial grid (see §5.2)
6. **Support This Program** CTA — links to `/donate?program=<slug>` (param preselects the tier copy on the donate page; no real backend)

### 5.2 Testimonial cast

The same 8 portraits from the shared registry (`src/data/testimonial-portraits.ts`) appear on every program detail page. Each person gets a program-specific quote, so 64 unique quotes total (8 programs × 8 voices).

| Portrait slug | Role | Expression |
|---|---|---|
| `caldwell-briggs` | Construction Foreman | ashamed |
| `dr-moira-petrescu` | Cardiothoracic Surgeon | ashamed |
| `linda-morrissey` | PTA Board Chair | ashamed |
| `rev-thomasina-oakes` | Wedding Officiant | ashamed |
| `eleanor-whittaker` | Head of Engineering | stoic |
| `priscilla-voss-bingham` | Estate Executor | stoic |
| `nina-cabrera` | Creative Director | pleased |
| `tony-mazetti` | Contractor | neutral |

Default to keeping the shared `role` from the registry; the program-specific quote does the work. Quotes should be terse (1–2 sentences) and lean on program-specific vocabulary so they stay distinct.

### 5.3 Special program page behaviors

**`/programs/tantrum-footprint`** — includes a static fake calculator widget:
- Form fields: decibels, duration in minutes, slammed door count, profanity count
- "Calculate" button returns a deterministic result derived from the inputs via a simple multiplication formula (e.g., `kgCO2e = (dB × 0.01) + (minutes × 0.05) + (slammedDoors × 0.4) + (profanity × 0.02)`)
- Result line: "Your last tantrum emitted **X.XX kg CO₂e** — equivalent to driving Y.Y miles."
- A "Methodology" section explains the (absurd) calculation
- Entirely client-side; no backend

**`/programs/outrage-of-the-month`** — includes a past-issues archive:
- 12 fake monthly themes with month/year and a one-line description (e.g., "April 2026: Suburban Lawn-Watering Restrictions"; "March 2026: Airport Boarding Group Etiquette")
- Cover treatments are CSS/typography only — no per-issue generated cover images required

## 6. Page Specifics

### 6.1 Home (`/`)

- Hero with primary CTA (Donate) and secondary CTA (Take the Pledge)
- Mission pitch — 2 short paragraphs
- Featured programs grid (3–4 cards drawn from §5)
- Impact ticker strip — 4 marquee stats
- "Voices" preview (3 testimonial quotes from the shared cast)
- Closing donate CTA

### 6.2 About (`/about`)

- Mission statement
- Founding history (the 2017 founding myth — Hollis Penderwick witnessing a single zoning-meeting outburst)
- Theory of change
- "Our Approach" — 3 pillars (Measure, Offset, Credentialed Practice)
- Link to fake 990 / financial transparency block

### 6.3 Impact (`/impact`)

- 4 hero stats:
  - "47,000 tantrums offset"
  - "1.2M reusable pitchforks in circulation"
  - "$8.3M re-mulched into community gardens"
  - "12,000 Certified Responsible Overreactors™ credentialed"
- Bar chart: "Outrage emissions averted by region" (5 fake regions)
- Donut chart: "Where your dollar goes" (4 segments)
- 3 inline beneficiary testimonial blocks pulled from the shared cast (§5.2)

### 6.4 Take Action (`/take-action`)

- **Pledge of Responsible Outrage** — 7 numbered commitments. Examples:
  1. "I will not exceed 90 decibels indoors without offsets."
  2. "I will compost my hot takes within 48 hours of expiration."
  3. (5 more in similar voice)
- Pledge sign-up form (parody, non-functional — name + email)
- **Chapter directory** — 5–6 fake city chapters with chair names (e.g., "North Kansas City Chapter — Chair: Tony Mazetti")
- **Upcoming events** — 3–4 fake events with dates (e.g., "Quarterly Composting of Hot Takes — May 18, 2026")

### 6.5 Donate (`/donate`)

Single page; no real plumbing.

- Hero: "Every dollar offsets approximately 0.000004 tantrums."
- **Tier grid (6 tiers):**

| Amount | Tier name | What it "funds" |
|---|---|---|
| $10 | Minor Kvetch | A single reusable pitchfork tine |
| $25 | Measured Grievance | One month of Outrage of the Month Club for an underserved ZIP code |
| $100 | Principled Objection | A Certified Responsible Overreactor™ scholarship |
| $500 | Formal Complaint | Offsets one regional HOA meeting |
| $2,500 | Structural Meltdown Offset | Reforests a Twitter thread |
| $10,000 | Patron of the Tempered Uprising | Names a pitchfork after you; bronze nameplate |

- Satirical form: name, email, CC fields — all non-functional. Submit shows confirmation: "Thank you. Your outrage has been offset. A digital certificate has been composted on your behalf."
- **Query-param preselect:** `/donate?program=<slug>` highlights the tier copy with that program's name. Purely client-side, read from `useSearchParams`.
- Real `bsambrone@gmail.com` in small print in the page footer area

### 6.6 Contact (`/contact`)

Theme-specific satirical content (e.g., a fake intake form for "filing your concern through approved channels"). Real `bsambrone@gmail.com` discoverable in small print per portfolio convention.

### 6.7 Privacy & Terms

Both pages follow the standard pattern (per `feedback_new_site_patterns.md`):

- **Top:** Specific Industries umbrella callout — short framed block stating that the policy at `specificindustries.com/privacy` (or `/terms`) is authoritative and governs all data handling.
- **Below:** Numbered satirical sections in CSO voice. Examples:
  - Privacy: "§3 — How We Process Your Outrage"; "§7 — Your Right to Be Forgotten by the Outrage of the Month Club"
  - Terms: "§4 — Acceptable Use of Reusable Pitchforks"; "§9 — Cap-and-Trade Disputes"

## 7. Leadership

Per `feedback_new_site_patterns.md`, four canonical people with randomized first + last names and NGO-exec titles. Stored in `src/sites/carbonneutraloutrage/data/leadership.ts` as a `leaders` array of 4 entries with the standard `{ person, name, title, bio, portraitImage }` shape. Auto-picked up by apex's leader-history collector via the `person` field.

| `person` | Name | Title | Bio angle |
|---|---|---|---|
| `bill` | Hollis Penderwick | Founder & Executive Director | Former climate-communications strategist who "witnessed a single outburst burn enough energy to power a coastal town for 14 minutes" at a 2016 zoning meeting. |
| `brandon` | Ansel Drayton | Director of Research | Oversees the Tantrum Footprint methodology and the annual *State of Responsible Outrage* report. |
| `jim` | Emmett Landry | Chief Impact Officer | Architected the Verified Outrage Offsets™ registry; channels his considerable personal intensity into actuarial rigor. |
| `sean` | Rory Kellner | Director of Donor Relations | Runs the Patron Council and the Legacy Offset planned-giving program; maintains composure through tai chi, usually. |

### 7.1 Portrait styling

All four portraits are visibly angry — the meta-joke is that the leadership of an anti-outrage nonprofit is itself furious. Same NGO-professional composition (wardrobe, lighting, bookshelf or plant backgrounds) so the rage contrast is stronger.

- **Hollis (bill), Ansel (brandon), Rory (sean):** restrained fury — clenched jaw, narrowed eyes, the kind of anger that smiles for the camera through gritted teeth.
- **Emmett (jim) — dialed up:** full red-faced rage, nostrils flared, mouth tight, barely contained. The angriest person ever photographed for a nonprofit About page.
- Wardrobe across all four: earth-tone fleece vests, flannel, linen blazers over henleys; sage / terracotta / oatmeal palette
- Lighting: warm natural; shallow depth of field
- Backgrounds: out-of-focus bookshelves, plants, or cream walls with framed diagrams
- Each portrait must match its `person`'s canonical face per `user_base_image_genders.md` — bill, brandon, jim, sean are all male; match accordingly

Names are stable per site once written — do not re-randomize them per visit.

## 8. File Layout

```
src/sites/carbonneutraloutrage/
├── config.ts                   # SiteConfig: theme, metadata, nav, features
├── index.ts                    # Barrel: exports config, pages, dynamicRoutes
├── data/
│   ├── leadership.ts           # 4 leaders with person field
│   ├── programs.ts             # 8 programs + getProgramBySlug helper
│   ├── testimonials.ts         # 64 quotes keyed by [programSlug][portraitSlug]
│   ├── pledge.ts               # 7 numbered pledge commitments
│   ├── chapters.ts             # 5–6 chapter directory entries
│   ├── events.ts               # 3–4 upcoming events
│   ├── impact-stats.ts         # 4 hero stats + chart data
│   └── archive.ts              # 12 Outrage of the Month past issues
└── pages/
    ├── home.tsx
    ├── about.tsx
    ├── programs.tsx            # /programs index
    ├── program-detail.tsx      # /programs/[slug] template
    ├── impact.tsx
    ├── take-action.tsx
    ├── donate.tsx              # reads useSearchParams for ?program=
    ├── leadership.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx

public/sites/carbonneutraloutrage/
├── hero.png                    # home hero / OG image
├── favicon.png                 # 64×64
├── about.png
├── programs.png                # /programs index hero
├── impact.png
├── take-action.png
├── donate.png
├── leadership.png              # /leadership page hero
├── contact.png                 # vintage rotary phone on recycled paper
├── chart-emissions-averted.png # bar chart for /impact (or SVG inline)
├── chart-where-dollar-goes.png # donut chart for /impact (or SVG inline)
├── leaders/
│   ├── hollis-penderwick.png
│   ├── ansel-drayton.png
│   ├── emmett-landry.png
│   └── rory-kellner.png
└── programs/
    ├── outrage-kits.png
    ├── reusable-pitchforks.png
    ├── outrage-of-the-month.png
    ├── outrage-offsets.png
    ├── tantrum-footprint.png
    ├── reforestation-through-rage.png
    ├── composted-hot-takes.png
    └── certified-overreactor.png
```

Total imagery: 16 page/hero images + 4 leader portraits + 8 program heroes = ~28 generated assets. (Chart graphics may be inline SVG instead of generated PNGs at implementation time.)

## 9. Cross-Site Touchpoints (automatic)

These work without any apex changes once the site has the required fields:

- **Apex `/portfolio` and the `health-wellness` vertical section** — picks up CSO via `verticalKey` on the registry loop
- **Apex Leader Detail pages** — `collectLeaderHistory(personKey)` auto-adds CSO board positions for Hollis (bill), Ansel (brandon), Emmett (jim), Rory (sean) once `data/leadership.ts` exists with proper `person` fields
- **Featured Holdings (`src/sites/apex/data/featured.ts`)** — manual editorial surface; not edited as part of this site's launch

## 10. Out of Scope

- Real payment processing (donate flow is parody only)
- Real email capture (pledge form and donate form are non-functional)
- Per-issue cover images for the Outrage of the Month archive (CSS/typography treatment instead)
- Featured Holdings editorial spotlight on apex (deliberately not edited)
- Cart / commerce features (`features.commerce` stays `false`)
