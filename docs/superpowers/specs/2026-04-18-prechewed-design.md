# Prechewed™ — Pre-Chewed Food Startup Site Design

**Date:** 2026-04-18
**Subdomain:** `prechewed`
**Domain:** `prechewed.specificindustries.com`

## Overview

Prechewed™ is an over-the-top satirical Silicon Valley wellness/productivity startup that sells pre-chewed food in pouches to founders, biohackers, and enterprise teams. The satire marries two registers: **productivity-optimization** ("reclaim your jaw-hours") and **biohacker pseudoscience** ("8.3× nutrient bioavailability via Pre-Oral Hydrolysis™").

The company is earnest, confident, and refined. The comedy comes from the product being inherently unsettling while the brand refuses to acknowledge it. Certain made-up technical terms are aggressively TM'd ("Pre-Oral Hydrolysis™," "Bolus Phase™," "Jaw-Hour Reclamation™"). The site never explicitly says *who* or *what* is doing the chewing — that ambiguity is the horror.

The catalog is standard commerce: 28 SKUs with a flagship ("The Daily Bolus"), 26 cuisine-coded pouches, and a premium waitlist-only item ("The Founder's Reserve"). Plus a press section with 6 full editorial-style satire articles across fictitious publications.

## Architecture

Standard `specificindustries` site pattern:

- `src/sites/prechewed/` containing `config.ts`, `index.ts` barrel, `data/products.ts`, `data/leadership.ts`, `data/press.ts`, and `pages/*` components
- Add `prechewed` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts` (edge-runtime allowlist)
- Register in `src/sites/registry.ts`
- `features.commerce: true` so `CartProvider` wraps the layout
- `dynamicRoutes.products` for `/products/[slug]` detail pages
- `dynamicRoutes.press` for `/press/[slug]` article pages
- Sitemap entries in `src/app/sitemap.ts` for product slugs (in `productSites` block) and press article slugs (new `pressArticles` block or extended `productSites`)
- `verticalKey: "health-wellness"` in config metadata
- `tagline: "You have better things to do with your mouth."`
- `ogImage: "/sites/prechewed/hero.png"`
- `public/sites/prechewed/favicon.png` at 64×64
- Add `prechewed` to the hardcoded `sites` array in `scripts/resize-favicons.mjs`

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, 3-proof-point stat strip, how-it-works, featured pouches, press strip, testimonials, B2B band |
| `/products` | Grid of all 28 SKUs with filter chips (cuisine, meal type, weight) |
| `/products/[slug]` | Product detail (pouch hero, nutrition panel, ingredient list, Bolus Compatibility™ meter, related pouches) |
| `/bolus` | Flagship long-form landing for The Daily Bolus (Bolus Protocol manifesto, routine explainer, infographic, testimonials, sticky buy box) |
| `/science` | Fake peer-reviewed evidence: bar charts, clinical callouts, fake citations, white paper mock, enterprise anchor |
| `/process` | "The Chewing Floor" — euphemistic process walkthrough, certifications, photo strip, deliberately vague mechanism |
| `/faq` | Accordion, 10-12 milked satirical Q&As |
| `/press` | Editorial index of 6 satirical articles |
| `/press/[slug]` | Full article detail page with publication wordmark, headline, byline, hero image, body, pullquote |
| `/about` | Founder's letter (Theodore Whitlock voice), company timeline, values grid |
| `/leadership` | Four exec portraits (bill, brandon, jim, sean — fully randomized first and last names) |
| `/contact` | Satirical form with categorized dropdowns; `bsambrone@gmail.com` in footer fine print |
| `/privacy` | Umbrella callout + satirical numbered policy body |
| `/terms` | Umbrella callout + satirical numbered terms body |
| `/cart` | Standard commerce cart |
| `/checkout` | Standard commerce checkout |

## Brand voice

- **Register:** slick SV startup; tight, confident sentences; numerical proof points ("47 days reclaimed," "8.3× bioavailability," "312 jaw-hours per employee per year"); pharmacological terms deployed without irony
- **TM gag:** superscript TM on the wordmark and on aggressive branded phrases — Pre-Oral Hydrolysis™, Bolus Phase™, Jaw-Hour Reclamation™, Bolus Compatibility™, Certified Masticator™, Chewing Floor™
- **Central claims repeated across the site:**
  - 8.3× nutrient bioavailability vs. traditionally-chewed meals
  - 47 days of productivity reclaimed annually at 3 meals/day
  - 312 jaw-hours returned to your calendar per employee per year (B2B framing)
- **What the site never says:** who or what is doing the chewing. Process page euphemizes around "Certified Masticators," human and/or mechanical operators, ISO 22000 compliance. No direct explanation.
- **Copy rule:** avoid overuse of the definite article. Only "The Daily Bolus" and "The Founder's Reserve" retain "The" — elsewhere use clean names (Science, Process, Ribeye, Pad Thai, etc.).

## Product Catalog (28 SKUs)

`data/products.ts` exports `products` array + `getProductBySlug` helper. Each product:

```
slug, name, cuisine, mealType, weightOz,
priceCents, priceLabel, isFlagship, isLimited, isFeatured,
tagline, description, ingredients[], nutritionPanel{},
bolusCompatibility (1-10), masticatorNote, image
```

### Flagship

1. **The Daily Bolus** — $42 / subscribe & save 15% — all-day nutritional staple, flagship funnel target

### Breakfast
2. Eggs Benedict
3. Pancake Stack
4. Breakfast Burrito
5. French Toast

### Pasta & Italian
6. Cacio e Pepe
7. Carbonara
8. Lasagna
9. Margherita

### Mains
10. Ribeye — $48 (premium)
11. Peking Duck — $44 (premium)
12. Roast Chicken
13. Lamb Chop — $38 (premium)
14. Brisket

### Asian
15. Pad Thai
16. Bibimbap
17. Tonkotsu
18. Tikka Masala
19. Dim Sum

### Sandwich-coded
20. Reuben
21. Banh Mi
22. Lobster Roll — $48 (premium)
23. Caesar
24. Cubano

### Holiday & occasion
25. Thanksgiving (seasonal tag)
26. Al Pastor
27. Buffalo Wing

### Limited / premium
28. **The Founder's Reserve** — $480, aged 30 days, numbered, "Waitlist only" (disables add-to-cart; button opens a waitlist modal that toasts "Added to waitlist. Expect contact within 47 jaw-hours.")

**Price tiers:**
- Standard pouches: $18–$28
- Premium (Ribeye, Peking Duck, Lobster Roll, Lamb Chop): $32–$48
- Daily Bolus: $42
- Founder's Reserve: $480 (waitlist only, not cart-purchasable)

**Product detail page template:**
- Pouch hero shot
- Tagline, price, weight (oz)
- **Bolus Compatibility™** meter (1-10, visual bar)
- Absurd ingredient list (e.g., "Grass-finished beef (pre-oral phase), salt, rosemary, proprietary bolus matrix, potassium sorbate, mouth-feel stabilizer")
- Mock nutrition panel with extra "Jaw-Hours Reclaimed" line in place of a macro
- One-sentence Certified Masticator's Note
- Add-to-cart (or waitlist CTA for Founder's Reserve)
- 3 related pouches

**Example — Ribeye:**
> *Tagline:* "Dry-aged, pre-hydrolyzed, perfectly rendered."
> *Compatibility:* 9.2 / 10
> *Ingredients:* Grass-finished beef (pre-oral phase), salt, rosemary, proprietary bolus matrix, potassium sorbate, mouth-feel stabilizer.
> *Jaw-Hours Reclaimed:* 0.47
> *Masticator's Note:* "Dense, beefy, emotionally grounding."

## Press Section (6 articles)

`data/press.ts` exports `articles` array + `getArticleBySlug(slug)` helper. Each article:

```
slug, publication, headline, subhead, byline, date,
excerpt, heroImage, body (string[] of paragraphs), pullQuote (optional)
```

### Launch articles

1. **TechCrunch** — *"Prechewed Labs raises $48M Series B to eliminate chewing"* — hero: Theodore Whitlock on a conference stage
2. **Bloomberg** — *"Inside the $480 pouch taking over private markets"* — hero: Founder's Reserve pouch, dark surface, shallow depth
3. **The Verge** — *"We tried Prechewed™ for a week. Here's what happened to our jaws."* — hero: product review flat-lay on a desk
4. **NYT Styles** — *"Why founders in Montauk won't shut up about Bolus Matrix"* — hero: lifestyle shot, pouch in a minimalist kitchen
5. **Wired** — *"The Chewing Floor: inside Silicon Valley's most secretive food facility"* — hero: stainless steel interior with pale lavender-tinted lighting
6. **Vogue** — *"The new status symbol is not chewing"* — hero: editorial portrait, pouch treated as an accessory

### PressArticle template

One shared `PressArticle` component under `src/sites/prechewed/components/` (or shared if reusable):
- Small-caps publication wordmark at top (text-based, not a real logo)
- Headline in large Space Grotesk
- Subhead in Inter
- Byline + date row
- Full-width hero image
- Body copy: 4-6 paragraphs in Inter
- Pullquote: left-bordered medical-callout style, centered at ~60% width
- Footer: "Originally appeared in [Publication] © 2025"

Shared template across all articles — no per-publication custom designs (scope fence). Index page (`/press`) is a grid of article cards: publication wordmark, headline, excerpt, date, thumbnail hero.

Homepage "As cited in" strip links to `/press` (previously just visual).

## Visual Theme

**Color palette:**
```
--color-background: #FAFAF7  /* warm near-white, bone-adjacent */
--color-surface: #FFFFFF     /* cards, product tiles */
--color-primary: #5B3FD9     /* electric violet / deep indigo — CTAs, stat callouts, logo mark, TM superscripts */
--color-secondary: #0F0E1A   /* near-black headings/body */
--color-muted: #6C6A7D       /* secondary text */
--color-border: #E6E3F0      /* pale lavender-gray rules */
--color-surface-alt: #F1EFFA /* pale violet wash — Science charts, stat strips, banded sections */
--color-accent: #EFA339      /* warm amber — limited-drop badges, Founder's Reserve tag */
```

Amber accent restricted to dark pills/badges only — **never** on light surfaces as body text (portfolio yellow-on-light contrast rule).

**Fonts** (declared in `src/themes/fonts.ts` — add any missing):
- Headings: **Space Grotesk** (tight tracking, startup register)
- Body: **Inter**
- Mono accent: **IBM Plex Mono** — for nutrition panels, chart labels, fake citations, ingredient code chips

All three fonts are already registered in `src/themes/fonts.ts` (verified), so no font-registry changes needed.

**Pattern language:**
- **Stat cards:** large numeric display ("8.3×") with thin mono caption
- **Pill badges:** proof points, product tags, category chips
- **Thin 1px borders** (`#E6E3F0`), rounded-lg corners, generous white space
- **Medical callout component:** left-border primary color, mono header, Inter body — reused on Science page abstracts and press pullquotes
- **Certification badge component:** small circular crest marks ("ISO 22000," "Certified Mastication Facility," "Bolus-Safe™") for Process page
- **Bolus Compatibility™ meter:** visual 1-10 bar on product detail pages

**Hero imagery:**
- Clean pouch photography on marble or pale violet gradient backgrounds
- Daily Bolus hero: single matte-finish pouch standing upright, shallow depth, Athletic-Greens-coded

**Leadership portraits:** SV-exec style — clean-shaven, quarter-zip or blazer-over-tee, pale violet or white backgrounds, confident half-smiles, Linear/Stripe exec headshot energy. Jasper Lund gets a lab coat.

**OG image:** `/sites/prechewed/hero.png` (Daily Bolus hero composition).

**Favicon:** stylized Prechewed™ mark or bolus-drop icon in primary violet on a light background, 64×64.

## Leadership Team

`data/leadership.ts` exports `leaders` array of 4 entries. Names fully randomized (first AND last) per the portfolio rule — reference person is a photo-routing key only, not a name constraint.

1. **Theodore Whitlock** — Founder & CEO — `person: "bill"`
   *Bio:* Two-time exit founder. Lost 47 days of productivity to chewing during his last company. Spent 18 months in a Kyoto lab perfecting Pre-Oral Hydrolysis™. Now refuses to chew in public as a matter of principle.

2. **Orson Mackey** — Chief Mastication Officer — `person: "brandon"`
   *Bio:* Former sous chef at a 2-Michelin-star restaurant in Copenhagen. Oversees the Chewing Floor and the Certified Masticator training program. Believes chewing is "an unsolved engineering problem."

3. **Rowan Talbot** — Head of Product & Operations — `person: "jim"`
   *Bio:* Ex-McKinsey consultant specializing in operational inefficiency. Designed the bolus matrix delivery format. Has not eaten a whole meal since 2023.

4. **Jasper Lund, PhD** — Chief Science Officer — `person: "sean"`
   *Bio:* Nutritional biophysics. Published the foundational 2024 paper on Pre-Oral Hydrolysis™ in the Journal of Pre-Oral Nutrition (which Prechewed Labs also happens to fund). Appears in a lab coat in most photos.

## Required Satire Patterns

### Privacy page (`/privacy`)
Umbrella callout at top (bordered/framed block) — *"The authoritative privacy policy governing all data handling is published by Specific Industries at specificindustries.com/privacy. That policy supersedes anything you read on this page."*

Below the callout, full satirical numbered policy in Prechewed™ voice:
- §1 Data We Collect (Masticatory Preferences, Pouch-Opening Telemetry, Jaw-Hour Audit Trail)
- §2 Cookies (Pouch-Flavored)
- §3 Your Rights (Deletion of Your Bolus History Available Upon Request)
- §4 Data Retention (Until Your Jaw Has Forgotten)
- §5 Third-Party Sharing (Only With Our Certified Masticators' Union)
- §6 International Transfers (To Our Kyoto Lab)
- §7 Security (Pouch-Grade Encryption)

### Terms page (`/terms`)
Same shape — umbrella callout first, then satirical numbered terms:
- §1 Acceptance (Implied By Opening The Pouch)
- §2 Acceptable Use (No Chewing The Pouches)
- §3 Operator Liability (We Are Not Responsible For Your Jaw)
- §4 Subscription & Cancellation (Via Certified Letter)
- §5 Dispute Resolution (Binding Bolus Arbitration)
- §6 Force Majeure (Including Jaw Fatigue)
- §7 Limitation of Liability (Total)

### Contact page (`/contact`)
- Satirical hero: *"We respond to inquiries within 47 jaw-hours."*
- Form with categorized dropdowns (General / Enterprise / Press / Waitlist / Masticator Applications)
- Submit handler toasts a no-op confirmation — standard portfolio pattern
- Fine-print footer: *"For matters our intake team cannot process: bsambrone@gmail.com"*

### Leadership data file
Required on every site. See Leadership Team section above. Entries must include `person: "bill" | "brandon" | "jim" | "sean"` so apex Leader Detail pages can cross-reference.

### Sitemap
Import `products` from `src/sites/prechewed/data/products.ts` and `articles` from `src/sites/prechewed/data/press.ts` in `src/app/sitemap.ts`. Add product slugs to `productSites` block. Add press article slugs either to the same block or to a new dedicated press block, emitting `/press/:slug` URLs.

## Unique Page Content Sketches

**Top nav items** (consistent across all pages, left to right after logo): Products / Daily Bolus / Science / Process / Press / About / Cart icon. Leadership and FAQ are accessible from the footer plus an About-page link; they do not need top-nav slots.

### Home (`/`)
- **Hero:** Daily Bolus pouch photo, headline "You have better things to do with your mouth.", subhead "Nutrition, pre-unlocked. Reclaim 47 days a year.", primary CTA "Start the Protocol" (→ `/bolus`), secondary "Browse pouches" (→ `/products`)
- **Proof strip:** three stat cards — `8.3× bioavailability` / `47 days reclaimed annually` / `312 jaw-hours per employee/year`
- **How it works:** 3-step grid — "Certified Mastication" → "Bolus Formation" → "Pre-Oral Delivery" — each with a clinical icon + one-sentence explainer
- **Featured pouches:** 6-card grid (Daily Bolus, Ribeye, Cacio e Pepe, Pad Thai, Banh Mi, Thanksgiving)
- **Press strip:** fake publication wordmarks ("As cited in" — Bloomberg, Forbes, TechCrunch, Huberman Lab, NYT Styles, Vogue) — links to `/press`
- **Testimonial carousel:** 3-4 founder-coded quotes ("I haven't chewed in 9 months. My deep work has never been better. — CEO, stealth AI co.")
- **B2B band:** "Prechewed™ for Teams — Reclaim 312 jaw-hours per employee per year." CTA → `/science#enterprise`
- **Footer CTA:** "Join the waitlist for The Founder's Reserve"

### Daily Bolus Protocol (`/bolus`)
- Long-form flagship landing, sticky buy box on desktop
- Manifesto opener (founder-voice paragraph from Theodore Whitlock)
- "The Bolus Protocol" — 4-phase daily routine (morning / midday / pre-deep-work / evening)
- Scientific diagram — fake infographic of bolus delivery curve vs. traditional meal
- Testimonial block — 3 longer pull quotes
- Pricing: single pouch / subscribe & save 15% / quarterly — add-to-cart on each
- FAQ snippet — 4 mini-FAQs, CTA to `/faq`

### Science (`/science`)
- Hero: "The peer-reviewed case for pre-oral hydrolysis."
- Bar-chart component — "Jaw-hours reclaimed by protocol adherence" (SVG, static data)
- Fake abstract in medical-callout style — quoted "2024 study" with NIH-style fake citation
- Mechanism section — 3 diagrams explaining Pre-Oral Hydrolysis™ in pseudo-clinical language
- Fake citations footer — 6 Vancouver-style papers, all from the *Journal of Pre-Oral Nutrition*
- White paper "download" link (mock — links to a visual `/science#whitepaper` anchor or disabled button)
- **Enterprise anchor (`#enterprise`)** — 2-paragraph B2B pitch, contact form CTA to `/contact?category=enterprise`

### Process (`/process`)
- Hero: "The Chewing Floor."
- Intro paragraph that says a lot while explaining nothing
- 4-column grid: "Ingredient sourcing" → "Certified Mastication" → "Bolus formation" → "Cold-chain pouching"
- Certification badge row — ISO 22000, SQF Level 3, "Certified Mastication Facility," "Bolus-Safe™"
- Photo strip: stainless steel, hairnets, pale lavender-tinted product shots
- Page footer footnote: *"Mastication performed by certified human and/or mechanical operators."* — nothing more

### FAQ (`/faq`)
Accordion with 10-12 entries. Draft content:
- "Is Prechewed™ vegan?" → "Yes. All pouches meet Bolus-Vegan™ standards."
- "Whose mouth?" → Long, evasive answer about Certified Masticators, regulatory frameworks, and "operator anonymity protocols."
- "Can I taste it?" → "Flavor is preserved to 94% fidelity. The Daily Bolus registers as 'umami-forward, emotionally neutral.'"
- "Is chewing bad for me?" → Full paragraph of pseudo-science suggesting yes, chewing is costing you years.
- "How long does a pouch last unopened?" → "14 days refrigerated. 6 hours at altitude. Indefinitely under inert gas."
- "Can I share a pouch?" → "Pouches are single-operator by design. Sharing voids bolus integrity."
- "Is it kosher / halal?" → "Certifications pending in select jurisdictions."
- "What happens if I chew anyway?" → "Chewing a Prechewed™ pouch does not harm the product, but does reintroduce the inefficiency the product was designed to eliminate."
- "How does Subscribe & Save work?" → subscription euphemism with fake details.
- "Do you ship internationally?" → "Currently shipping to the contiguous US and a single P.O. box in Kyoto."
- Add 1-2 more as needed to hit 10-12 total.

## Components

Mostly composes existing shared components from `src/components/ui/` and `src/components/layout/`:

- `Hero` (existing) — violet-on-cream variant
- `ProductCard` (existing) — used for catalog grid; Founder's Reserve tile shows a "Waitlist only" CTA (site-local wrapper if needed)
- `FeatureSection` / `FaqAccordion` (existing) — for how-it-works and FAQ
- `TeamMember` (existing) — for `/leadership`
- `AddToCartButton` (existing) — standard commerce
- **`StatCard`** (new if not already present) — large numeric + mono caption, reused on home and Science pages
- **`MedicalCallout`** (new) — left-border medical-style callout used on Science page abstracts and press article pullquotes
- **`CertBadge`** (new) — circular certification crest for Process page
- **`BolusCompatibilityMeter`** (new) — 1-10 visual bar on product detail pages
- **`WaitlistButton`** (new) — site-local client component replacing AddToCart on Founder's Reserve; toasts a waitlist confirmation
- **`PressArticleCard`** (new) — index grid card under `/press`
- **`PressArticle`** (new) — detail template at `/press/[slug]`

If any new "new" components above turn out to be reusable across sites, promote to `src/components/ui/`. Otherwise keep site-local under `src/sites/prechewed/components/`.

## Out of Scope

- No real PDF downloads — Science white paper link is a mock
- No real subscription billing — "Subscribe & save" is UI-only; cart treats it as a one-time purchase with a subscription flag on the cart item
- No actual Founder's Reserve waitlist storage — button only toasts confirmation
- No real masticator application flow — Contact form has the category dropdown, submission is the standard no-op toast
- No outbound links on press article wordmarks — they reference fictional publications
- No animations beyond standard hover/fade transitions
- No internationalization
- No real cart/checkout backend — existing localStorage commerce pattern is used as-is

## Open Questions

None — design is fully specified.
