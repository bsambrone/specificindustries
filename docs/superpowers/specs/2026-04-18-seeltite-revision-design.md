# Seel-Tite Revision — Design Spec

**Subdomain:** `seeltite`
**Date:** 2026-04-18
**Status:** Approved for implementation planning
**Supersedes (partially):** `docs/superpowers/specs/2026-04-17-seeltite-site-design.md`

## What This Revises

The original Seel-Tite build shipped as a deadpan industrial DeWalt/Milwaukee-flavored power-tool-catalog satire. This revision shifts the tone to a direct-to-consumer voice (Casper / Dollar Shave Club / Away) with more overt bathroom humor, introduces the "gamble" positioning as the site's central metaphor, and adds a new `/fitment` page explaining how to wear the G1. The brand name, color palette, accessory names, and heritage year stay. The factory/jobsite/MIL-SPEC framing comes down. Scope is a **heavy content pass** (full rewrite of every page's body copy) plus targeted image revisions.

## New Tagline System

- **Primary (hero):** "Toot With Confidence."
- **Hero subheadline:** "Every toot is a gamble. The G1 is the house."
- **Deadpan backstop (compliance / technical pages / footer):** "Prevent. Dispose. Proceed."
- **Heritage line:** "Since 1973." (drops "American Engineered")

## Voice Register (Layered)

- **Consumer surface** — home, products, scenarios, recovery, fitment, contact: conversational direct-to-consumer. Second-person ("You tooted. It paid off."). Openly fart/toot/gamble-forward. Warm, confident, slightly cheeky.
- **Deadpan backstop** — product detail spec tables, `/compatibility`, `/privacy`, `/terms`: corporate-legal voice, straight-faced. The contrast between consumer-surface and backstop IS the joke.
- **Middle register** — about, leadership, demonstrations: warmer than the original build, still a touch dry. Less "machinist with a micrometer," more "four people who care a lot about one thing."

## DeWalt De-Emphasis

Concrete removals across all body copy:
- Drop references to: "American Engineered," "Akron Ohio machine shop," "aerospace-grade PEEK insert," "welding floor," "brushed steel workbench," MIL-STD-810H marketing language, "modular ecosystem" framing when used rhetorically.
- Keep (quietly, in spec tables only): MIL-STD and FDA compliance as single chips on product spec tables.
- Keep (because equity): Seel-Tite brand name, safety-orange + charcoal palette, accessory names (Grinder, Salad Shooter, Cryo-Puck, Pneumatic Ejector, Shop-Vac Adapter, Incinerator, Odor Cartridges, Telemetry, Silencer, Backup Secondary Gasket), 1973 heritage year, OPX-14 port spec (as a single compact callout, not three), `ModularEcosystemDiagram` component.

## Page Rewrite Plan

Every page gets a full body-copy pass. Structural changes noted:

| Route | Change |
|---|---|
| `/` | New hero headline + subheadline. StatStrip rewritten: "14,382 Gambles. 14,382 Payoffs." / "$0 in laundry." / "1973." / "0 awkward pauses." Field Reports marquee retitled "The Gambles We Won / The Gambles We Lost." Ecosystem diagram heading: "One Gasket. Ten Ways It Pays Off." CTAs: "Meet the G1" + "Start Tooting." |
| `/products` | Subheadline reworked to consumer voice. Filter labels stay. |
| `/products/g1-containment-gasket` | Description fully rewritten. Adds new condensed **How to Wear** section (4 `FitmentStepCard`s in a 2×2 summary strip) with a "Read the full Fitment Guide →" link to `/fitment`. Spec table stays (deadpan backstop). |
| `/products/[other 10]` | Each accessory's description rewritten with the gamble-loss framing ("When your gamble doesn't land, the Grinder does."). Spec tables stay. |
| `/scenarios` | Retitled **"The Gambles We Won."** Subtitle: "We tooted. It was the right call." All 8 cards rewritten with gamble framing. |
| `/recovery` | Retitled **"The Gambles We Lost."** Subtitle: "We tooted. It was the wrong call. The accessory covered for us." All 8 cards rewritten. |
| `/demonstrations` | Page retitled **"The Lab."** Each DemoSequenceBlock gets a "Toot Verified" pass badge. Engineer quotes rewritten in lighter voice. |
| `/compatibility` | **Firmware rollup table deleted.** Port spec callout trimmed from 5 rows to 3. Ecosystem diagram + compatibility matrix retained. |
| `/about` | Heritage paragraph rewritten — warmer, less "machine shop," more "one family, one gasket." Timeline entries rewritten in friendlier voice. Compliance card grid trimmed from 3 to 2 (drops the MIL-STD-810H card). |
| `/leadership` | All 4 bios rewritten — same deadpan register, but warmer. Drops "micrometers" and "shop floor" language. Each bio gets one gambling/tooting one-liner. Constipated/mid-clench portrait *expression* retained; backgrounds regenerated per Image Revisions section. |
| `/contact` | Form category labels rewritten: "General Toot Inquiry," "Report a Gamble You Lost," "Accessory Compatibility Question." Real email stays in small-print footer. |
| `/privacy` | Voice pass on all 6 existing sections. Adds one new numbered section: "7. On Toot Event Logs" — deadpan satirical paragraph on telemetry retention for toot events. Umbrella callout unchanged. |
| `/terms` | Voice pass on all 7 existing sections. Adds one new numbered section: "8. Toot Confidence Responsibility Acknowledgement" — deadpan paragraph on user-assumed gambling responsibility. Umbrella callout unchanged. |
| `/fitment` (NEW) | Full new page per the Fitment Page Content section below. Added to header nav between Compatibility and About. |

## Nav Update

Header primary nav becomes: **Products · Scenarios · Recovery · Demonstrations · Fitment · Compatibility · About**

## New Stat Chips on Scenario and Recovery Cards

Each card's existing `statChips?: StatChip[]` array gets three new entries appended (no schema change). Representative examples:

**Prevention (scenarios) — three per card:**
- `Toot Confidence`: HIGH / MODERATE / RECKLESS
- `Gamble Odds`: "3:1" / "5:2" / "long shot" / "coin flip"
- `Payoff`: Reputation Intact / Promotion Secured / Date Secured / Transcript Clean / Forecast Delivered

**Recovery — three per card:**
- `Gamble Lost`: YES
- `Damage Avoided`: TOTAL / NEAR-TOTAL
- `Embarrassment`: ZERO / MINIMAL

Pre-existing chips (Seal PSI, Duration, Outcome, etc.) are retained on cards that had them. Copy pass may reword some values to match new tone but the chip entries themselves remain.

## Fitment Page Content (`/fitment`)

**Sections (top to bottom):**

1. **Hero** — "Toot-Ready In Four Steps." Subheadline: "The G1 Containment Gasket is the simplest confidence device in the catalog. Here's how to wear it."
2. **The Four-Step Fit** — a 2×2 grid of `FitmentStepCard` entries:
   1. *Position* — where the G1 sits against the body, with a brief diagrammatic illustration
   2. *Press* — how to engage the seal (3 seconds of light pressure around the circumference)
   3. *Seal Check* — how to confirm the seal is active (pressure indicator on telemetry module, or the low-effort tactile check)
   4. *Test Toot* — a warm-up low-stakes toot to confirm full integrity before confidence tooting
3. **The Test Toot Procedure** — a dedicated callout explaining the test-toot in deadpan clinical voice: warm-up posture, expected seal response, what to do if integrity check fails (re-seat, don't redeploy)
4. **Fitment by Scenario** — a 4-row table of *AccessoryLoadout* entries: *Formal Wear*, *Athletic*, *Travel*, *Boardroom*. Each lists the recommended accessories to pair with the G1 for that environment, plus a short rationale line.
5. **Common Mistakes** — 6-panel dos-and-donts grid (`fitmentDosDonts`): three "Do" items (proper posture, proper pressure, proper cleaning), three "Don't" items (over-tightening, wearing inverted, skipping the test toot)
6. **When In Doubt, Engage The Backup** — short closing section on the Backup Secondary Gasket with a link to its product page

**Metadata:** title "Fitment Guide — Seel-Tite," description "How to wear the G1 Containment Gasket so you can toot with confidence."

**Components used:** Hero, FitmentStepCard (new), CautionStripe. No other new components required.

## Data Model Changes

### New file: `src/sites/seeltite/data/fitment.ts`

```ts
export interface FitmentStep {
  number: number
  title: string
  description: string
  image: string
}

export interface FitmentDoDont {
  type: "do" | "dont"
  title: string
  description: string
}

export interface AccessoryLoadout {
  scenario: string        // "Formal Wear", "Athletic", "Travel", "Boardroom"
  accessorySlugs: string[] // product slugs
  rationale: string
}

export interface TestTootProcedure {
  title: string
  steps: string[]
  warning: string
}

export const fitmentSteps: FitmentStep[]          // 4 entries
export const fitmentDosDonts: FitmentDoDont[]     // 6 entries (3 do, 3 don't)
export const accessoryLoadouts: AccessoryLoadout[] // 4 entries
export const testTootProcedure: TestTootProcedure
```

### Edits: `src/sites/seeltite/data/compatibility.ts`

- Delete the `firmwareMatrix` export entirely.
- Shorten `portSpec` from 5 fields to 3 (drop `material` and `firmware` fields; keep `name`, `diameter`, `mechanism`, `rating`).
- Keep `compatibilityMatrix` as-is.

### Edits: `src/sites/seeltite/data/products.ts`

- Rewrite `description[]`, `tagline`, and body of each product. Existing `features[]` and `specs{}` can be trimmed slightly (drop 1-2 of the most DeWalt-flavored entries per product where clearly overwrought) but largely retained — the spec tables serve as the deadpan backstop.
- No schema changes.

### Edits: `src/sites/seeltite/data/scenarios.ts` and `data/recovery.ts`

- Rewrite every `title`, `situation`, `beat`, `outcome`, and `pullQuote` in the new gamble-flavored voice.
- Append three new entries to each case's existing `statChips` array (see "New Stat Chips" above).
- No schema changes.

### Edits: `src/sites/seeltite/data/leadership.ts`

- Rewrite `bio` for each of the 4 leaders. No schema changes.

## Component Changes

### `ScenarioCard` (`components/scenario-card.tsx`)

Two-line change: badge labels swap based on existing `kind` prop:
- `kind="prevention"` → badge text "Gamble Won" (previously "Seal Held")
- `kind="recovery"` → badge text "Gamble Lost" (previously "System Engaged")

### `DemoSequenceBlock` (`components/demo-sequence-block.tsx`)

Add a small pass-fail style "Toot Verified" badge at the top-left of each block (hardcoded; every product ships verified). A single span with green text on charcoal, using the existing CautionStripe color family.

### New: `FitmentStepCard` (`src/sites/seeltite/components/fitment-step-card.tsx`)

```tsx
interface FitmentStepCardProps {
  step: number
  title: string
  description: string
  image: string
  variant?: "full" | "compact"   // full = /fitment page, compact = G1 product page summary
}
```

Renders: big safety-orange step-number badge, title in heading font, description paragraph, illustration. In `compact` variant, tighter layout with smaller number and condensed description.

### Homepage and other pages

No component signature changes. Only prop values (headlines, subheadlines, StatStrip content).

## Image Revisions

**Delete (2):**
- `public/sites/seeltite/compatibility-firmware.png` — firmware rollup table cut
- `public/sites/seeltite/opx14-macro.png` — unused; DeWalt-port-spec territory

**Regenerate with same filenames (5):** new prompts in `scripts/generate-seeltite-images.ts`; delete existing files and re-run script to get fresh versions.

- `about-factory.png` — new prompt: "clean, bright small workshop bay with a tidy assembly table holding a single G1 Containment Gasket, warm wood and soft-gray tones, consumer-maker aesthetic, natural window light, no heavy machinery, no welding, no coveralls — think a clean product shop, not a factory floor"
- `leader-thorne.png`, `leader-hadley.png`, `leader-boecker.png`, `leader-castellan.png` — new prompts: same four people, same constipated/mid-clench expressions (that part stays!), same Seel-Tite apparel, but backgrounds change from "shop floor blurred behind" to clean warm showroom wall / minimal office / soft-gray studio backdrop. Consumer-brand founder portrait aesthetic à la Casper, Away, Warby Parker.

**New (7):**
- `fitment-hero.png` — top-of-page banner: person (chest-up, clothed, SFW) looking composed and quietly confident, subtle G1 indicator peek visible just under the collar of a fitted shirt — "toot-ready" composition
- `fitment-step-1.png` through `fitment-step-4.png` — IKEA-assembly-style line-art diagrams: stylized waist-down geometric torso silhouette (no anatomy, just outline), G1 gasket shape, numbered step badge, directional arrows. White background. Clean instructional vector aesthetic.
- `fitment-test-toot.png` — small diagnostic illustration: a pressure gauge / waveform readout showing a test toot's pressure signature
- `fitment-dos-donts.png` — 6-panel grid: three "do" diagrams with green check overlays, three "don't" diagrams with red X overlays. Small silhouettes showing correct vs incorrect positioning.

**Image generation changes:**
- Update `scripts/generate-seeltite-images.ts`:
  - Remove `opx14-macro.png` from `HOMEPAGE_PROMPTS`
  - Remove `compatibility-firmware.png` from `STATIC_PROMPTS`
  - Update the 5 regenerate prompts in-place
  - Add 7 new fitment prompts in a new `FITMENT_PROMPTS` block, with a main() runner block that iterates them
- Workflow: delete the 5 files to be regenerated + 2 files to be deleted, then run the script — existing files skip, changed/missing files regenerate

## File Changes Summary

**Modified:**
- `src/sites/seeltite/config.ts` — update nav (add Fitment item), update metadata title/description for new tagline
- `src/sites/seeltite/index.ts` — register `/fitment` page
- `src/sites/seeltite/data/products.ts` — body copy rewrite
- `src/sites/seeltite/data/scenarios.ts` — rewrite + new stat chips
- `src/sites/seeltite/data/recovery.ts` — rewrite + new stat chips
- `src/sites/seeltite/data/compatibility.ts` — delete firmwareMatrix, shorten portSpec
- `src/sites/seeltite/data/leadership.ts` — rewrite bios
- `src/sites/seeltite/components/scenario-card.tsx` — badge label change
- `src/sites/seeltite/components/demo-sequence-block.tsx` — add Toot Verified badge
- `src/sites/seeltite/pages/home.tsx` — hero, StatStrip, Field Reports, CTA, ecosystem diagram heading
- `src/sites/seeltite/pages/products.tsx` — subheadline
- `src/sites/seeltite/pages/product-detail.tsx` — conditionally (for the G1 slug only) render a 2×2 grid of `FitmentStepCard` (compact variant) + link to `/fitment`
- `src/sites/seeltite/pages/scenarios.tsx` — hero headline + subheadline + intro paragraph
- `src/sites/seeltite/pages/recovery.tsx` — hero headline + subheadline + intro paragraph
- `src/sites/seeltite/pages/demonstrations.tsx` — hero, engineer quotes rewritten
- `src/sites/seeltite/pages/compatibility.tsx` — delete firmware table section, trim port spec callout
- `src/sites/seeltite/pages/about.tsx` — heritage body, timeline entries, cut one certification card
- `src/sites/seeltite/pages/leadership.tsx` — no structural change (bio data drives the copy)
- `src/sites/seeltite/pages/contact.tsx` — form labels
- `src/sites/seeltite/pages/privacy.tsx` — voice pass + new section 7
- `src/sites/seeltite/pages/terms.tsx` — voice pass + new section 8
- `scripts/generate-seeltite-images.ts` — prompt revisions + new fitment block

**Created:**
- `src/sites/seeltite/data/fitment.ts`
- `src/sites/seeltite/components/fitment-step-card.tsx`
- `src/sites/seeltite/pages/fitment.tsx`
- 7 new image files in `public/sites/seeltite/`

**Deleted:**
- `public/sites/seeltite/compatibility-firmware.png`
- `public/sites/seeltite/opx14-macro.png`

**Untouched:**
- Platform wiring (`src/sites/registry.ts`, `src/sites/subdomains.ts`, `src/app/sitemap.ts`) — no new routes added (Fitment is a static page auto-picked up via registry)
- Shared testimonial library (no new portraits needed for this revision)
- 68 existing images remain in place
- `scripts/generate-seeltite-portraits.ts` — no changes (shared library already has what's needed)

## Verification Posture

Matches original build — no automated tests. Verification via:
- `npx tsc --noEmit`
- `npm run lint` (seeltite files clean)
- `npm run build`
- Manual browser walkthrough at `localhost:3002/?site=seeltite` — home, all product pages, scenarios, recovery, demonstrations, compatibility, about, leadership, contact, privacy, terms, **fitment (new)**

## Out of Scope

- Adding new SKUs
- Adding new prevention/recovery cases (scope reshape of existing 16, not new entries)
- Moving commerce off localStorage
- Shared library additions (no new testimonial portraits)
- Existing platform-level components (`Hero`, `StatStrip`, `CtaBanner`, `Timeline`, `CertificationCard`, etc.) — untouched

## Success Criteria

1. Visiting the home page, the first fold reads as a direct-to-consumer brand, not a power-tool catalog.
2. The gambling metaphor is present and consistent on home, `/scenarios`, `/recovery`, and every product page.
3. `/fitment` exists, is in the nav, and reads as clinical-but-funny instructional content about how to wear the G1.
4. The G1 product detail page has a condensed "How To Wear" block linking to `/fitment`.
5. `/privacy` and `/terms` have exactly one new numbered section each, in deadpan corporate voice.
6. Regenerated images look warmer and less jobsite-industrial; new fitment images read as IKEA-assembly-style instructional diagrams.
7. All build / typecheck / lint checks pass; all routes return 200 (or 404 for invalid slugs) in a local walkthrough.
