# Institute for the Study of Pointless Metrics — Site Design

**Subdomain:** `pointlessmetrics`
**Date:** 2026-04-24

## 1. Concept

The Institute for the Study of Pointless Metrics (ISPM) is a for-profit research institute that measures what cannot and should not be measured. Founded in 2011 by a former McKinsey associate who "observed a correlation once and never looked back," the Institute publishes peer-reviewed findings on spurious correlations, sells precision instruments for quantifying the intangible, and credentials the next generation of Pointless Metrics Practitioners™.

Voice is straight-faced institutional academia — the gravitas of a Brookings report with the methodology of a LinkedIn thought-leader post. No winks. Every finding cites a sample size, a p-value, and a funding disclosure. The absurdity comes from the complete earnestness with which variables like "synergy density" and "personal brand alignment" are treated as scientifically measurable.

The site funds itself (and its research) through four revenue streams — **instruments**, **publications**, **advisory services**, and **credentialing** — with no donate page. It is a self-funded institute, not a nonprofit. Commerce is always on.

## 2. Identity & Configuration

| Field | Value |
|---|---|
| Subdomain | `pointlessmetrics` |
| Full name | Institute for the Study of Pointless Metrics |
| Short name | ISPM (also "the Institute") |
| Tagline | "In data we overtrust." |
| `verticalKey` | `professional-tech` |
| `features.commerce` | `true` |
| OG image | `/sites/pointlessmetrics/hero.png` |
| Favicon | `public/sites/pointlessmetrics/favicon.png` (64×64) |

**Required setup (per portfolio conventions):**
- Add `"pointlessmetrics"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Register in `src/sites/registry.ts`
- Add favicon to the `sites` array in `scripts/resize-favicons.mjs`
- Update `src/app/sitemap.ts` to import both `products` and `findings` arrays (see §6 for dynamic routes)

## 3. Theme

All required fonts are already registered in `src/themes/fonts.ts`; no new font plumbing.

**Typography:**
- Heading: `lora` — warm transitional serif; reads "academic press." Differentiates from carbonneutraloutrage (Fraunces).
- Body: `inter` — clean institutional sans; strong at small sizes for dense tabular data.
- Data stats (r-values, p-values, n=) use `tabular-nums` + slight letter-spacing; no separate monospace font required.

**Color palette — Brookings-meets-chart-gallery, mapped to the 5 SiteConfig theme slots:**

| `theme.colors` slot | Value | Use |
|---|---|---|
| `primary` | `#0f2b4f` (deep institutional navy) | H1 accents, nav, primary CTA, chart series 1 |
| `secondary` | `#c8553d` (vermilion) | Secondary CTA, data highlights, chart series 2 / trend lines |
| `accent` | `#6b7a6b` (slate sage) | Borders, rule lines, axis labels, muted chips |
| `background` | `#f7f3e9` (paper cream) | Page background |
| `text` | `#1a1d24` (near-black ink) | Body text |

Surface white for cards, forms, and chart backgrounds. Muted text via `text-foreground/60` per the established pattern. The yellow-on-light contrast rule (`feedback_yellow_on_light.md`) is not engaged here — vermilion, navy, and slate sage all hold contrast on cream.

**Visual motifs:**
- Dense chart grid lines in slate sage on cream — printed-journal feel
- Footnote superscripts² used liberally — most claims carry numbered footnotes at page bottom
- r-values, p-values, and `n=` callouts shown adjacent to claims
- Institute crest — circular SVG mark with Latin-ish motto *MENSURANDUM EST* ("that which must be measured") — appears on hero pages, PDF cover treatments, the credential product, and the wall plaque product
- "Figure 1", "Figure 2" captions under every chart/illustration
- Chart-heavy homepage — the dashboard IS the hero

## 4. Information Architecture

### 4.1 Static pages (auto-included in sitemap via registry loop)

| Route | Purpose |
|---|---|
| `/` | Dashboard hero — rotating correlation tiles, featured instruments, featured report, credential CTA |
| `/about` | Institute history (2011 founding), mission, theory of correlation, fake transparency block, link to fake 990-equivalent |
| `/methodology` | Lampoon of research rigor: "How We Establish Significance," "Our Peer Review Process," "Disclosure of Funding," "Glossary of Terms We Invented" |
| `/shop` | Commerce index — all 12 products grouped into 5 category sections (Instruments, Publications, Advisory, Credentialing, Certified Merchandise) |
| `/findings` | Archive of 24 studies as filterable cards |
| `/leadership` | The four canonical executives |
| `/contact` | Satirical intake form; real `bsambrone@gmail.com` in small print |
| `/privacy` | Umbrella callout + satirical body (portfolio pattern) |
| `/terms` | Umbrella callout + satirical body (portfolio pattern) |
| `/cart` | Auto from commerce |
| `/checkout` | Auto from commerce |

### 4.2 Dynamic routes

- `/products/[slug]` — 12 product detail pages. Standard template plus 2–3 cited findings per product. Template has overrides for the credential, advisory, and report products (see §5.6).
- `/findings/[slug]` — 24 study detail pages with large scatter chart, methodology, caveats, citation block, and upsell cards for products that cite the finding.

Both dynamic routes must be added to `src/app/sitemap.ts` explicitly (products and findings each emit their own URL section).

### 4.3 Nav — mega-menu structure

Top nav: **Research ▾ | Shop ▾ | About ▾ | Cart**

- **Research ▾** — Findings, Methodology, Quarterly Report (deep-links to product)
- **Shop ▾** — Instruments, Publications, Advisory, Credentialing, Merchandise, All Products
- **About ▾** — The Institute, Leadership, Contact

Uses the existing `MegaMenuConfig` pattern.

## 5. The 12-SKU Catalog

Each SKU has a public name and an ISPM technical designation (e.g., "Model 4A") for institutional flavor. Every `/products/[slug]` page cites 2–3 peer-reviewed findings from `/findings`.

### 5.1 Instruments (4)

| # | Public name | Designation | Pitch | Price |
|---|---|---|---|---|
| 1 | **The Vibe Ring** | ISPM Model 4A | Wearable; passively samples ambient vibe density at 40 Hz. Battery: "indefinite." | $349 |
| 2 | **The Synergy Obelisk** | ISPM Model 12-D | Desktop dashboard with three brass needle gauges: Alignment, Momentum, Synergy Density. Not networked. | $895 |
| 3 | **The Tarnishing Plaque** | ISPM Model 7-B | Engraved bronze plaque that tarnishes over quarters, calibrated to office culture drift. Re-polish annually (kit included). | $1,250 |
| 4 | **The Ambient Mood Barometer** | ISPM Model 3 | Glass tube with colored fluid that "responds" to meeting-room sentiment. Arrives pre-calibrated. | $465 |

### 5.2 Publications (2)

| # | Name | Pitch | Price |
|---|---|---|---|
| 5 | **The Quarterly Synergy Density Report** | 4-issue annual subscription. PDF delivery with crest cover. Current issue: "Q1 2026 — The Collapse of Alignment in Post-Hybrid Teams." | $395 / year |
| 6 | **The Correlation Almanac** | Annual hardcover book. 312 spurious correlations indexed by variable. 600+ pages. | $149 |

### 5.3 Advisory Services (2)

| # | Name | Pitch | Price |
|---|---|---|---|
| 7 | **KPI Vibe Audit** | Half-day engagement. Two Institute fellows visit your workplace and measure 47 intangibles. Deliverable: 80-page bound audit report + Certificate of Measured Status. | $4,500 |
| 8 | **Correlation Coaching** | Monthly retainer, 3-month minimum. Weekly 1:1 sessions identifying correlations in your KPIs. No actionable insights (by design). | $2,800 / mo |

### 5.4 Credentialing (1)

| # | Name | Pitch | Price |
|---|---|---|---|
| 9 | **Certified Pointless Metrics Practitioner™** | 8-week online program. 14 fake core competencies, a fake capstone, a fake exam. Digital credential, LinkedIn badge, bronze lapel pin. 0.0 CEUs (not accredited). | $2,495 |

### 5.5 Certified Merchandise (3)

| # | Name | Pitch | Price |
|---|---|---|---|
| 10 | **Personal Brand Alignment Sticker Pack** | 12 vanity-URL QR stickers for water bottles. Each sticker encodes a unique URL — scanning it opens a deterministic micro-dashboard that computes your "Personal Brand Alignment Score" from the URL hash. | $24 |
| 11 | **Certified Measured™ Wall Plaque** | Laser-engraved bronze-finish plaque: your name, a randomly-assigned r-value between 0.72 and 0.94, today's date, and the Institute seal. | $129 |
| 12 | **Pocket Ruler for Intangibles** | Pocket-sized brass ruler. Non-linear units only: gravitas, vibe, optionality, runway, warmth. Ships with calibration card. | $39 |

### 5.6 Product detail template

Every `/products/[slug]` page follows the same base shape:

1. **Hero** — public name + technical designation, tagline, product image, Add-to-Cart, price
2. **What It Measures** — 2–3 sentences
3. **Specifications** — tabular data: dimensions, sample rate, units of measure, calibration interval, warranty
4. **Cited Findings** — 2–3 cards from `/findings` archive with chart thumbnails, r-values, and "See full study" links
5. **Methodology Note** — 1 paragraph of epistemic hedging
6. **Testimonials** — 3 quotes from the shared 8-person portrait cast (`src/data/testimonial-portraits.ts`)
7. **Related Instruments** — upsell cards for 2–3 related SKUs

**Template overrides:**
- **Certified Practitioner (#9):** replace "Specifications" with **Curriculum** (8 week-by-week modules) and **Faculty** (the 4 leadership team members teach); add **Fake Accreditation Disclosure**
- **Advisory products (#7, #8):** replace "Specifications" with **Engagement Scope** and **Deliverables**
- **Quarterly Report (#5):** replace "Testimonials" with **Past Issues** — 4 fake past issue covers (CSS/typography only, no generated images)

## 6. The Findings System

### 6.1 Data model

`src/sites/pointlessmetrics/data/findings.ts` exports 24 `Finding` entries with this shape:

```ts
interface Finding {
  slug: string                            // kebab-case
  title: string                           // full study title
  claim: string                           // one-sentence takeaway
  category: "leadership" | "culture" | "productivity" | "strategy" | "communication" | "workplace"
  rValue: number                          // -1.0 to 1.0, most in 0.72–0.94 range
  pValue: string                          // "< 0.001", "< 0.01", etc.
  sampleSize: number                      // n
  xAxis: { label: string; units: string }
  yAxis: { label: string; units: string }
  chartData: { x: number; y: number }[]  // 15–20 scatter points (hand-authored)
  methodology: string                     // 1 paragraph of fake rigor
  caveats: string[]                       // 2–3 absurd caveats
  publishedDate: string                   // "YYYY-MM"
  principalInvestigator: "bill" | "brandon" | "jim" | "sean"
  funding: string                         // disclosure line
  citedByProducts: string[]               // product slugs — powers reverse lookup
}
```

Helpers: `getFindingBySlug(slug)`, `getFindingsByProductSlug(productSlug)`, `getFeaturedFindings()`.

### 6.2 Charts — implementation

Hand-authored inline SVG components, not a charting library. One shared `<CorrelationScatter>` component renders all 24 studies:

- Fixed dimensions (600×400)
- Axis labels and gridlines in slate sage
- Scatter points in navy primary
- Regression trend line in vermilion secondary
- r-value + p-value + n printed inside the chart frame (upper-right)
- "Figure 1" caption below

Homepage tiles use a compact `<CorrelationSparkline>` variant (180×80, axes stripped). No charting library — keeps bundle lean, gives full style control, and the bespoke feel is on-theme for a research institute.

### 6.3 24 studies — working titles

Variety across category, sign (positive/inverse), and subject matter.

| # | Category | Title (shorthand) | r | n |
|---|---|---|---|---|
| 1 | culture | Standing-desk adoption → "ecosystem" language usage | 0.87 | 1,247 |
| 2 | workplace | Open-office square footage → Q3 synergy decline | 0.79 | 412 |
| 3 | leadership | All-hands frequency → fiscal optimism | 0.91 | 328 |
| 4 | communication | Slack emoji diversity → document length (inverse) | -0.83 | 2,140 |
| 5 | leadership | CEO LinkedIn posts/wk → engineering attrition | 0.76 | 189 |
| 6 | workplace | Houseplants per desk → perceived team warmth | 0.88 | 867 |
| 7 | strategy | "Journey" in all-hands → Q-o-Q pivots | 0.81 | 254 |
| 8 | strategy | Vendor logo saturation in decks → vendor churn | 0.74 | 512 |
| 9 | communication | "Transparency" usage → transcripts published (inverse) | -0.92 | 178 |
| 10 | culture | Free-snack budget → ambient anxiety | 0.80 | 730 |
| 11 | leadership | Exec water-bottle ownership → Q4 reorg probability | 0.85 | 301 |
| 12 | leadership | All-hands cadence → exit package size | 0.77 | 94 |
| 13 | productivity | Manager Fitbit adoption → team NPS inflation | 0.73 | 1,088 |
| 14 | leadership | Bookshelf density in exec portraits → fundraise success | 0.86 | 412 |
| 15 | strategy | "Alignment" in OKRs → actual alignment (inverse) | -0.89 | 247 |
| 16 | communication | "Take this offline" → #random channel growth | 0.82 | 615 |
| 17 | leadership | Exec Patagonia-vest count → board meeting sentiment | 0.78 | 156 |
| 18 | strategy | "Synergy" frequency → M&A announcements (90 day lead) | 0.84 | 221 |
| 19 | workplace | Ping-pong proximity → avg tenure (inverse) | -0.75 | 894 |
| 20 | strategy | "Innovation" in mission → patent filings (inverse) | -0.87 | 1,402 |
| 21 | culture | Offsites/yr → severance accrual | 0.79 | 187 |
| 22 | strategy | Holiday card complexity → Q2 layoffs | 0.82 | 340 |
| 23 | leadership | "Humble" in CEO interviews → humility scores (inverse) | -0.93 | 78 |
| 24 | productivity | Exec coffee consumption → 2pm standup vibe density | 0.76 | 520 |

### 6.4 Findings archive (`/findings`)

- Hero: category filter chips (All + 6 categories), sort dropdown (Most Recent / Highest r / Largest n / Most Cited)
- Grid of 24 cards — chart thumbnail, title, r-value pill, sample-size chip, principal investigator byline
- Link through to individual study

### 6.5 Finding detail (`/findings/[slug]`)

1. **Header** — title, category chip, "Published YYYY-MM," principal investigator byline (links to `/leadership`)
2. **Large scatter chart** with Figure 1 caption
3. **The claim** — single large bold sentence
4. **Methodology** — 1 paragraph
5. **Caveats** — 3 bullets in a framed "Limitations of this study" box
6. **Funding disclosure** — small italic line
7. **Instruments cited in this study** — product upsell cards for every entry in `citedByProducts`
8. **Full citation block** — fake APA-ish citation for copy-paste

### 6.6 Homepage dashboard

Home hero is a 2×3 grid of **Live Findings** tiles (rotating set of 6, sparkline charts, r-values, clickable to detail). Below: three CTA blocks — "Buy the Instrument," "Read the Report," "Get Certified." Below: leadership strip + closing "Subscribe to the Correlation Dispatch" newsletter block (non-functional).

## 7. Leadership

Per `feedback_new_site_patterns.md`, four canonical people with randomized first + last names and Institute-appropriate titles. Stored at `src/sites/pointlessmetrics/data/leadership.ts` as a `leaders` array of 4 entries with the standard `{ person, name, title, bio, portraitImage }` shape. Auto-picked up by apex's leader-history collector via the `person` field.

### 7.1 The four

| `person` | Name | Title | Role in the site |
|---|---|---|---|
| `bill` | **Orrin Bletchley** | Founder & Director of the Institute | Former McKinsey associate who "observed a correlation once and devoted his life to the rest." Principal investigator on ~6 findings (leadership category). |
| `brandon` | **Dr. Percival Ashcombe** | Chief Research Officer | Oversees methodology, the Quarterly Report, and the Correlation Almanac. Most prolific investigator — PI on ~8 findings (culture, communication, strategy). |
| `jim` | **Dr. Augustus Crane** | Director of Advisory Services | Leads the KPI Vibe Audit and Correlation Coaching engagements; once measured a company's vibe so thoroughly it filed for bankruptcy. PI on ~5 findings (productivity, workplace). |
| `sean` | **Dean Beaumont Kessler** | Dean of the Practitioner Program | Administers the Certified Pointless Metrics Practitioner™ credential and the fake peer-review board. PI on ~5 findings (strategy, leadership). |

All four are listed as "Faculty" on the Credential product detail page.

### 7.2 Portrait styling

Academic-institute portrait vocabulary, matching the site's straight-faced tone. Not angry — four flavors of humorless gravitas:

- **Orrin (bill) — patrician gravity:** the Founder stare. Slight furrow. Oil-portrait energy. Dark suit.
- **Percival (brandon) — wild-eyed intensity:** the true-believer researcher mid-thought. Slightly disheveled, hand near chin.
- **Augustus (jim) — cold judgment:** the consultant who has already audited your team. Flat affect, thin smile.
- **Beaumont (sean) — smug certainty:** the Dean who knows you'll fail the exam. Leaning back, half-smile.

**Shared styling:**
- Wardrobe: tweed jacket + elbow patches (Ashcombe), dark suit (Bletchley), earth-tone sport coat over open collar (Crane), charcoal blazer over turtleneck (Kessler)
- Backgrounds: out-of-focus dense bookshelves, framed diplomas, brass fixtures, the Institute seal visible in one portrait
- Lighting: warm natural, shallow DoF, subtle vignette
- Each portrait must match its `person`'s canonical face per `user_base_image_genders.md` — bill, brandon, jim, sean are all male; match accordingly

Names are stable per site once written — do not re-randomize per visit.

## 8. File Layout

```
src/sites/pointlessmetrics/
├── config.ts                       # SiteConfig: theme, metadata, nav (mega-menu), features.commerce=true
├── index.ts                        # Barrel: exports config, pages, dynamicRoutes (products + findings)
├── data/
│   ├── leadership.ts               # 4 execs with `person` field
│   ├── products.ts                 # 12 products + getProductBySlug helper
│   ├── findings.ts                 # 24 findings + getFindingBySlug + getFindingsByProductSlug helpers
│   ├── home-dashboard.ts           # 6 featured finding slugs + 3 featured product slugs for home hero
│   ├── categories.ts               # shop category metadata (5) + finding category metadata (6)
│   └── press-mentions.ts           # 6–8 fake press quotes for home / about
└── pages/
    ├── home.tsx                    # dashboard hero
    ├── about.tsx
    ├── methodology.tsx
    ├── shop.tsx                    # /shop index grouped by 5 categories
    ├── product-detail.tsx          # /products/[slug] template with overrides
    ├── findings.tsx                # /findings archive with filter + sort
    ├── finding-detail.tsx          # /findings/[slug] template
    ├── leadership.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx

src/components/ui/pointlessmetrics/  # site-local UI (not globally shared)
├── CorrelationScatter.tsx          # 600×400 hand-rolled SVG scatter + trend line
├── CorrelationSparkline.tsx        # 180×80 compact variant for home tiles
├── FindingCard.tsx                 # archive card
├── FindingCitation.tsx             # fake-APA block
├── InstituteSeal.tsx               # inline SVG of the crest
├── ProductSpecsTable.tsx           # tabular specs block
├── DashboardTile.tsx               # home hero tile
└── CategoryChip.tsx                # filter chip

public/sites/pointlessmetrics/
├── hero.png                        # home hero / OG image
├── favicon.png                     # 64×64
├── about.png
├── methodology.png
├── shop.png
├── findings.png                    # /findings archive hero
├── leadership.png
├── contact.png
├── leaders/
│   ├── orrin-bletchley.png
│   ├── percival-ashcombe.png
│   ├── augustus-crane.png
│   └── beaumont-kessler.png
└── products/
    ├── vibe-ring.png
    ├── synergy-obelisk.png
    ├── tarnishing-plaque.png
    ├── ambient-mood-barometer.png
    ├── quarterly-report.png
    ├── correlation-almanac.png
    ├── kpi-vibe-audit.png
    ├── correlation-coaching.png
    ├── certified-practitioner.png
    ├── sticker-pack.png
    ├── wall-plaque.png
    └── pocket-ruler.png
```

**Asset total:** 8 page heroes + 4 portraits + 12 product images = **24 generated PNGs**. Charts are inline SVG (no PNG needed).

**Component sharing:** all ISPM-specific UI lives under `src/components/ui/pointlessmetrics/`. No new globally-shared components are added. Existing shared primitives (`Hero`, `FeatureSection`, `ProductCard`, `AddToCartButton`, `CartButton`, `Toast`, `TeamMember`, `FaqAccordion`, layout primitives) are reused.

## 9. Privacy & Terms

Both pages follow the standard two-layer pattern (per `feedback_new_site_patterns.md`):

- **Top:** Specific Industries umbrella callout — short framed block stating that the policy at `specificindustries.com/privacy` (or `/terms`) is authoritative and governs all data handling.
- **Below:** Numbered satirical sections in ISPM voice. Examples:
  - Privacy: "§3 — Observational Data Collected During Audits"; "§7 — Right to Erasure from the Correlation Index"; "§9 — Cookies, and Also Crumbs, Which We Also Measure"
  - Terms: "§4 — Acceptable Use of the Pocket Ruler for Intangibles"; "§8 — Credential Revocation Procedures"; "§11 — Disputes Regarding Posthumously-Assigned r-Values"

## 10. Contact

Satirical contact page. Form framed as "File an observation" — fields labeled *observed phenomenon*, *hypothesized correlation*, *estimated r-value*, *funding source*. Non-functional. Real `bsambrone@gmail.com` discoverable in small print per portfolio convention.

## 11. Cross-Site Touchpoints (automatic)

These work without any apex edits once the site has the required fields:

- **Apex `/portfolio` and the `professional-tech` vertical section** — picks up ISPM via `verticalKey` on the registry loop
- **Apex Leader Detail pages** — `collectLeaderHistory(personKey)` auto-adds ISPM board positions for Orrin (bill), Percival (brandon), Augustus (jim), Beaumont (sean) once `data/leadership.ts` exists with proper `person` fields
- **Featured Holdings (`src/sites/apex/data/featured.ts`)** — manual editorial surface; not edited as part of this site's launch

## 12. Out of Scope

- Real payment processing — cart + checkout use the existing `CartProvider` + localStorage pattern; checkout is parody-confirmation only
- Real PDF delivery for the Quarterly Report or Correlation Almanac (digital goods are implied, not actually served)
- Real QR-code vanity-URL microsites — the "personal brand alignment" micro-dashboard is deferred to a follow-up spec; the sticker pack product page references the concept but the actual `/brand-alignment/[hash]` route is not part of this launch
- A working "Correlation Dispatch" newsletter (signup form is non-functional)
- Per-product press quotes (press mentions are home/about only)
- New globally-shared UI components — everything site-specific lives under `src/components/ui/pointlessmetrics/`
- Guest/rotating apex leader configuration — ISPM uses the four canonical permanent leaders only
