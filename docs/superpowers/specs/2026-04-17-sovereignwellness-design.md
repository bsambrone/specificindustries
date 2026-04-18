# Sovereign Wellness Co. — Design Spec

**Subdomain:** `sovereignwellness`
**Date:** 2026-04-17
**Status:** Approved for implementation planning

## Concept

A satirical "ancestral medicine" brand that sells (well, *waitlists*) cures for ridiculous ailments that do not need curing. The site parodies the patriot-health / sovereign-citizen wellness movement with refined Founder's-era luxury aesthetics on the surface and unhinged conspiracy copy underneath. The comedy lives in the contrast: oil-painting portraits and wax-seal crests paired with "BANNED IN 39 STATES" badges and paragraphs that start like a Ralph Lauren catalog and end like an Alex Jones monologue.

The brand positions itself as the last remaining custodian of remedies the FDA "filed away in 1962." Sixteen treatments span five categories:
- Normal bodily functions treated as diseases (hiccups, earwax, blinking, thirst, sneezing)
- Minor life annoyances medicalized (Mondays, doorway amnesia, tangled cords, lost keys)
- Personality traits framed as disorders (agreeableness, small talk, eye contact)
- Completely invented ailments (bilateral thumb fatigue, chronic ambient Wednesday-ness, spiritual static, lunar-transit malaise)

Every page rotates through conspiracy registers — Big Pharma suppression, deep-state cover-up, ancient-wisdom-that-was-buried, and paranoid infomercial — so the tone builds unhinged momentum rather than settling into one note.

## Brand & Voice

**Name:** Sovereign Wellness Co.
**Tagline (primary):** "Ancestral medicine. Restored. Protected."
**Tagline (secondary, used on suppression pages):** "The cures they filed away in 1962."
**Founded:** "Est. in defiance, 1774."

**Voice:** Polished colonial apothecary prose as the baseline — serif-heavy, "by appointment of the concerned citizenry," "per the custodians of the Archive." Each page has a refined surface layer and a deranged substrate. A product paragraph reads like a luxury home fragrance description and ends with "Banned in 39 states. Our legal counsel declines to comment."

**Conspiracy register rotation** (per page):
- Home → Big Pharma suppression (doctors hate this, the one root they tried to erase)
- Treatments → Ancient wisdom buried by globalists (monastery manuscripts, 4,000-year lineages)
- Founders → Deep-state cover-up (former insiders who walked away with notebooks)
- Journal (Dispatches) → Paranoid infomercial (ALL-CAPS testimonials, URGENT DISPATCH headers)
- Our Story → Full kitchen-sink blend of all four

**Visual palette:**
- Parchment cream `#F5ECD7` (primary background)
- Oxblood `#6B1F1F` (primary accent, CTA buttons)
- Deep navy `#1A2942` (secondary accent, headers, dark panels)
- Muted gold `#B08C3A` (tertiary accent — only used on navy or oxblood backgrounds; NEVER on cream due to contrast failure)
- Ink black `#1C1613` (body text on cream)
- Soft sepia `#8A6B3A` (borders, dividers, secondary text)

**Typography:**
- Display serif: Cormorant Garamond (headers, founders' names, treatment titles)
- Body serif: Spectral or EB Garamond (body copy, long-form prose)
- Small caps used heavily for section labels and badges

**Motifs:**
- Wax-seal crest (logo mark) featuring crossed mortars-and-pestles, a laurel wreath, and a banner reading "VERITAS · REMEDIUM · REFUGIUM"
- Apothecary bottles in amber glass with handwritten-label aesthetic
- Gilt frames around founder portraits
- Parchment textures on hero sections

## Site Architecture

Single-site module registered under `src/sites/sovereignwellness/`, routed through the existing `[[...slug]]` catch-all. No new App Router entries.

### Pages

| Route | Purpose |
|---|---|
| `/` | Home — crest hero, tagline, intro paragraph, 3-up treatment teaser, founders band, "join the ledger" newsletter gate, banned-in-N-states ticker |
| `/treatments` | Catalog index — 16 treatments in a 4-col grid on desktop, filterable by category ("Ancestral," "Suppressed," "Restricted") |
| `/treatments/[slug]` | Treatment detail — hero bottle image, Condition writeup, Mechanism of Action, Documented Cases (fake testimonials), Protocol (dosing instructions), waitlist CTA, related treatments |
| `/founders` | The four founders — 2×2 grid of gilt-framed portraits with brass nameplates, 2–3 paragraph bios each, closing "Founders' Oath" block |
| `/our-story` | The Suppression — origin story, "How we found the Archive," timeline of raids/closures/rebirths, heaviest on deep-state cover-up tone |
| `/dispatches` | Journal index — 4–6 satirical articles in card layout with hero images, one marked "URGENT DISPATCH" in all-caps |
| `/dispatches/[slug]` | Individual dispatch — long-form satirical article with paranoid-infomercial voice |
| `/contact` | Refined contact page with absurd required fields, a pledge to never use the phone, real email `bsambrone@gmail.com` in small italic print at the bottom |
| `/privacy` | Umbrella callout (authoritative policy at specificindustries.com/privacy) + 5 satirical numbered sections |
| `/terms` | Umbrella callout + 5 satirical numbered sections |

### Dynamic routes

Two entries in the site module's `dynamicRoutes` export:
- `treatments` → maps to `TreatmentDetail` component, validates slug via `getTreatmentBySlug`
- `dispatches` → maps to `DispatchDetail` component, validates slug via `getDispatchBySlug`

### Navigation

Header nav (desktop): `Treatments` · `Founders` · `Our Story` · `Dispatches` · `Contact`
Footer: standard apex links + Privacy + Terms + small-print real email

### Commerce

No cart, no checkout, no `CartProvider`. Waitlist-only (hybrid pattern). Every treatment detail page shows a "REQUEST ACCESS" or "JOIN THE WAITLIST" button that opens a subtle modal/form placeholder (non-functional; form submits to nowhere or simply displays a thank-you state). `features.commerce` stays `false` in the config.

## Treatment Catalog

Sixteen treatments, each stored in `src/sites/sovereignwellness/data/treatments.ts` with the following shape:

```typescript
{
  slug: string,
  name: string,           // e.g., "Tincture No. 7 — Hiccup Dissolution"
  category: "ancestral" | "suppressed" | "restricted",
  condition: string,      // the ailment, in voice
  tagline: string,        // short one-liner in voice
  mechanism: string,      // 2-3 paragraph pseudo-scientific explanation
  protocol: string,       // dosing instructions
  cases: Array<{ initials: string, location: string, testimonial: string }>,
  bannedInStates: number, // 11-46
  priceUsd: number,       // 89-1200, display only, never transacted
  image: string,          // path to bottle/product image
  heroImage?: string,     // optional larger hero on detail page
}
```

### The sixteen

| # | Slug | Name | Category |
|---|---|---|---|
| 1 | `tincture-no-7` | Tincture No. 7 — Hiccup Dissolution | Bodily function |
| 2 | `cerumen-siphon` | Cerumen Siphon Protocol | Bodily function |
| 3 | `anti-blink-pomade` | Anti-Blink Pomade | Bodily function |
| 4 | `thirst-reversion-lozenges` | Thirst Reversion Lozenges | Bodily function |
| 5 | `monday-morning-compound` | Monday Morning Compound | Minor annoyance |
| 6 | `doorway-amnesia-drops` | Doorway Amnesia Drops | Minor annoyance |
| 7 | `tangled-cord-pendant` | Tangled-Cord Resonance Pendant | Minor annoyance |
| 8 | `compulsive-agreeableness-elixir` | Compulsive Agreeableness Elixir | Personality |
| 9 | `small-talk-inhibitor` | Small Talk Inhibitor | Personality |
| 10 | `bilateral-thumb-fatigue-balm` | Bilateral Thumb Fatigue Balm | Invented |
| 11 | `chronic-wednesday-reversal` | Chronic Ambient Wednesday Reversal | Invented |
| 12 | `spiritual-static-discharge` | Spiritual Static Discharge Kit | Invented |
| 13 | `sneeze-redirection` | Sneeze Redirection Protocol | Bodily function |
| 14 | `lost-key-divination-salts` | Lost-Key Divination Salts | Minor annoyance |
| 15 | `eye-contact-endurance-drops` | Eye-Contact Endurance Drops | Personality |
| 16 | `lunar-transit-malaise-balm` | Lunar Transit Malaise Balm | Invented |

Each treatment displays a "BANNED IN [N] STATES" badge (N varies 11–46), a restricted-supply notice, and a waitlist CTA. Prices are cosmetic only — the page never accepts a purchase.

## The Four Founders

Standard-four people (bill / brandon / jim / sean) re-themed as the four signatories of the original 1774 apothecary charter. All male. Fully randomized first AND last names. Bill remains the founder.

| Base | Persona | Title | Portrait direction |
|---|---|---|---|
| bill | Dr. Ezekiel Thornwood Harrow | Founder & Chief Restorer | Long grey beard, high white collar, candlelit study |
| brandon | Cornelius Ashby Blackwell IV | Director of Suppressed Materials | Younger, dark frock coat, holding corked bottle |
| jim | Obadiah Sterling Marsh | Keeper of the Restricted Archive | Spectacles, leather-bound ledger, lamplit shelves |
| sean | Ambrose Whitfield Callaghan | Chief of Protocols & Verification | Clean-shaven, navy waistcoat, quill at writing desk |

Each portrait is generated via a script under `scripts/` using the four base reference photos as source material, styled as Rembrandt-lit oil paintings on dark backgrounds.

**Founders page layout:** 2×2 grid of gilt-framed portraits on a parchment background. Each card shows the portrait, a brass-plate nameplate, title, and 2–3 paragraph bio. A closing "Founders' Oath" block at the bottom — one paragraph of deranged, elegant prose pledging fidelity to the Archive.

**Bios seed** (expanded during implementation):

- **Ezekiel Thornwood Harrow** — "Former Senior Formulary Advisor to three federal health bodies he declines to name. He walked away in 1994 with a single notebook. That notebook became our Archive."
- **Cornelius Ashby Blackwell IV** — "Descended from five generations of itinerant apothecaries, four of whom were investigated and cleared."
- **Obadiah Sterling Marsh** — "Curates the 4,000-volume Restricted Archive, relocated twice in the last decade 'for reasons that remain undisclosed.'"
- **Ambrose Whitfield Callaghan** — "Verifies every treatment against original manuscripts. Has been offered employment by two pharmaceutical conglomerates and declined both in writing."

## Dispatches (Journal)

Four to six satirical long-form articles rendered from `src/sites/sovereignwellness/data/dispatches.ts`. Each has slug, title, hero image, excerpt, published date, and body (paragraphs).

**Article concepts (starter list — expanded during implementation):**

1. **"The 1962 Filing: A Reconstruction"** — pseudo-historical essay on the day the remedies were suppressed. Deep-state cover-up voice.
2. **"WHAT THEY DON'T TELL YOU ABOUT YOUR OWN SWEAT"** — all-caps paranoid infomercial voice. Marked "URGENT DISPATCH" on the index.
3. **"On the Humility of the Dropper"** — refined meditation on the ritual of apothecary dosing. Ancient-wisdom tone.
4. **"A Field Guide to the Four Gibbous Malaises"** — treats lunar-transit malaise with pseudo-scientific gravity.
5. **"Why We No Longer Answer The Telephone"** — short manifesto on communication hygiene, sets up the contact page.

Dispatches appear at `/dispatches` as a card grid (one featured "URGENT" card on top), individually at `/dispatches/[slug]` with a parchment article layout.

## Home Page Layout

1. **Hero** — full-width parchment background, wax-seal crest centered, display-serif headline ("Ancestral medicine. Restored. Protected."), oxblood CTA button ("ENTER THE ARCHIVE")
2. **Intro band** — 2-column prose: "What we do" / "Why you haven't heard of us" (Big-Pharma-suppression register)
3. **Featured treatments** — 3-up card grid with 3 hand-picked treatments (Tincture No. 7, Bilateral Thumb Fatigue Balm, Chronic Wednesday Reversal)
4. **Banned-in-states ticker** — horizontal marquee strip on navy background with gold text: "BANNED IN 39 STATES · RESTRICTED IN 4 COUNTIES · LEGAL IN ALL HEARTS"
5. **Founders band** — "Signed by the four custodians" with 2×2 small portraits linking to /founders
6. **Newsletter gate** — "Join the Ledger. We will not ask for your real name." Email capture.
7. **Footer**

## Compliance Patterns (Mandatory)

### Privacy page

1. **Umbrella callout** at top — bordered/framed block stating that the Specific Industries policy at specificindustries.com/privacy is authoritative and governs all data handling for this site.
2. **Satirical numbered sections below:**
   - Section 1: On the Information We Inherit
   - Section 2: Cookies & Other Warded Objects
   - Section 3: Data We Share With The Archive Keepers
   - Section 4: Your Right To Be Forgotten (By Them, Not By Us)
   - Section 5: A Note On Encrypted Dispatches

### Terms page

1. **Umbrella callout** at top — pointer to specificindustries.com/terms.
2. **Satirical numbered sections:**
   - Section 1: Acceptance of The Oath
   - Section 2: On Proper Use of The Protocols
   - Section 3: On Spiritual Liability
   - Section 4: Restricted Jurisdictions
   - Section 5: Disputes & The Archive's Ruling

### Contact page

Apothecary-styled form with absurd required fields:
- "Your preferred hand"
- "Your first-grade teacher's name"
- "Astrological birth chart (compressed)"
- "Nature of affliction (avoid specifics)"

Copy notes: "We do not answer the telephone during Mercury retrograde," "All inquiries are read by hand on the third Tuesday of each month."

**Real email:** `bsambrone@gmail.com` appears in small italic sepia text at the bottom of the page: "Urgent plaintext inquiries: bsambrone@gmail.com." This is non-negotiable per project pattern.

## Assets

```
public/sites/sovereignwellness/
├── favicon.png              # 64×64 crest mark
├── hero.png                 # homepage hero (used as og:image)
├── crest.svg                # vector crest for header/footer
├── founders/
│   ├── harrow.png           # Ezekiel Thornwood Harrow (bill)
│   ├── blackwell.png        # Cornelius Ashby Blackwell IV (brandon)
│   ├── marsh.png            # Obadiah Sterling Marsh (jim)
│   └── callaghan.png        # Ambrose Whitfield Callaghan (sean)
├── treatments/
│   ├── tincture-no-7.png
│   ├── cerumen-siphon.png
│   ├── anti-blink-pomade.png
│   ├── thirst-reversion-lozenges.png
│   ├── monday-morning-compound.png
│   ├── doorway-amnesia-drops.png
│   ├── tangled-cord-pendant.png
│   ├── compulsive-agreeableness-elixir.png
│   ├── small-talk-inhibitor.png
│   ├── bilateral-thumb-fatigue-balm.png
│   ├── chronic-wednesday-reversal.png
│   ├── spiritual-static-discharge.png
│   ├── sneeze-redirection.png
│   ├── lost-key-divination-salts.png
│   ├── eye-contact-endurance-drops.png
│   └── lunar-transit-malaise-balm.png
└── dispatches/
    ├── the-1962-filing.png
    ├── what-they-dont-tell-you-about-your-sweat.png
    ├── humility-of-the-dropper.png
    ├── four-gibbous-malaises.png
    └── why-we-no-longer-answer-the-telephone.png
```

## Technical Integration Checklist

This section captures every touch point outside the site folder so nothing is missed.

1. **`src/sites/registry.ts`** — import `config`, `pages`, `dynamicRoutes` from `./sovereignwellness`; add entry to `siteRegistry`.
2. **`src/sites/subdomains.ts`** — append `"sovereignwellness"` to `VALID_SUBDOMAINS` (middleware check). This is a separate source of truth from the registry.
3. **`src/app/sitemap.ts`** — add `treatments` array import and entries under the appropriate dynamic-routes block for both `/treatments/[slug]` and `/dispatches/[slug]`.
4. **`scripts/resize-favicons.mjs`** — add `"sovereignwellness"` to the hardcoded `sites` array so future favicon resize passes include this site.
5. **`config.ts`** metadata — include `ogImage: "/sites/sovereignwellness/hero.png"` alongside title and description.
6. **`scripts/`** — add image-generation script(s) for founder portraits and treatment bottles, following patterns from existing sites (e.g., rocks, carterandfils).

## File Layout

```
src/sites/sovereignwellness/
├── config.ts                # SiteConfig: theme, metadata, nav, features
├── index.ts                 # barrel: exports config, pages, dynamicRoutes
├── data/
│   ├── treatments.ts        # treatments array + getTreatmentBySlug
│   └── dispatches.ts        # dispatches array + getDispatchBySlug
├── components/              # site-specific components (crest, banned-ticker, oath block, gilt-frame)
│   ├── Crest.tsx
│   ├── BannedTicker.tsx
│   ├── GiltFrame.tsx
│   └── WaxSealCTA.tsx
└── pages/
    ├── home.tsx
    ├── treatments.tsx
    ├── treatmentDetail.tsx
    ├── founders.tsx
    ├── ourStory.tsx
    ├── dispatches.tsx
    ├── dispatchDetail.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx
```

Site-specific components live under the site folder rather than `src/components/ui/` because the aesthetic (gilt frames, wax seals, parchment) is unlikely to be reused. Any pattern that turns out to be reusable gets promoted to `src/components/ui/` during implementation, not speculatively up front.

## Out of Scope

- Real e-commerce / checkout / Stripe / cart
- Functional newsletter signup (form captures but does nothing)
- Functional contact form (submits to nowhere — visual only)
- Real treatment database beyond the 16 specified
- Additional founders or team members beyond the standard four
- Mobile app, native integrations, or any third-party service wiring

## Success Criteria

- All 10 page routes render correctly under `?site=sovereignwellness` in dev
- All 16 treatment detail pages render via `/treatments/[slug]`
- All dispatch detail pages render via `/dispatches/[slug]`
- Subdomain resolves correctly (not redirected to apex) after adding to `VALID_SUBDOMAINS`
- Privacy and Terms pages show BOTH umbrella callout AND satirical numbered sections
- Contact page shows real email `bsambrone@gmail.com` in small print
- Favicon, OG image, and sitemap entries are all in place
- `npm run build` and `npx tsc --noEmit` both succeed
- Site visually matches the Founder's-era-luxury direction (serif type, parchment backgrounds, gilt frames, oxblood/navy accents, muted gold only on dark backgrounds)
