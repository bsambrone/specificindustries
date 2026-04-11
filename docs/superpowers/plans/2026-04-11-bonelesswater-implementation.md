# BonelessWater Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new satirical subdomain `bonelesswater.specificindustries.com` — a fictional pharmaceutical-grade water purification company that takes itself extremely seriously about removing bones from water. Stark clinical visuals, conspiracy-theorist copy, 8-SKU commerce catalog with sub-brand naming, a comparison page that FUDs against legitimate competitors and showcases bones-in-bottle joke competitors plus a horrifying pond water competitor, recurring "Did You Know?" callouts across pages, and 4 true-believer execs with fully randomized names.

**Architecture:** Next.js 15 App Router site under `src/sites/bonelesswater/`, registered through the existing catch-all routing pattern. **Commerce wired up** (`features.commerce: true`) — reuses the existing `CartProvider`, shared `AddToCartButton`, and the per-site cart/checkout page pattern from Mousetrapjenga. Three site-local components (`DidYouKnowCard`, `CertifiedBadge`, `ComparisonTable`). Image generation uses the validated `mcp/image-gen/` pipeline.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Inter font (already in `fontFamilyMap`), `mcp__image-gen__generate_image` (text-to-image) and `mcp__image-gen__generate_image_with_person` (img-to-img via the four reference photos).

**Reference spec:** `docs/superpowers/specs/2026-04-11-bonelesswater-site-design.md`

**Reference sites:** `src/sites/mousetrapjenga/` for the commerce-enabled cart/checkout pattern, `src/sites/onlypans/` for the most recent end-to-end pattern (data → components → pages → barrel → sitemap).

**No unit test framework exists in this repo.** Verification is `npx tsc --noEmit`, `npm run lint`, and `npm run build`. Each code task ends with a type-check + commit.

**Fixes baked in from prior site builds:**

- Image-gen paths are `base-images/{slug}/` and `generated-images/` at the **project root**. Both directories are gitignored — only the moved-to-`public/` copies get committed.
- Components that read `localStorage` use `useSyncExternalStore`, NOT the `useEffect + setMounted` anti-pattern (which trips `react-hooks/set-state-in-effect`). BonelessWater doesn't have this case (no localStorage state) but the rule stands.
- Forms in server components must NOT have `onSubmit` handlers (Next.js 16 rejects event handlers on server-rendered DOM elements).
- All JSX text with apostrophes uses `&apos;` instead of a bare `'`.
- `src/app/sitemap.ts`, `scripts/resize-favicons.mjs`, `src/sites/registry.ts`, and `src/sites/subdomains.ts` all need explicit updates — none are auto-discovered.
- **Exec names must be FULLY randomized — both first and last name. The `referencePerson` field is the photo lookup, not a name constraint.** This site uses Cornelius Whitfield (founder/bill), Garrett Marsh (brandon), Russell Coleman (jim), Vincent Dunn (sean) — none of those first names match the photo folder slugs.

---

## File Map

### New files

```
docs/superpowers/plans/2026-04-11-bonelesswater-implementation.md     # this file
src/sites/bonelesswater/config.ts                                     # SiteConfig — pharma navy theme
src/sites/bonelesswater/index.ts                                      # barrel: config, pages, dynamicRoutes
src/sites/bonelesswater/data/products.ts                              # 8 SKUs
src/sites/bonelesswater/data/leadership.ts                            # 4 true-believer execs
src/sites/bonelesswater/data/testimonials.ts                          # 8 indigestion-recovery testimonials
src/sites/bonelesswater/data/competitors.ts                           # 6 competitors (3 legit + 2 bones + 1 pond)
src/sites/bonelesswater/data/facts.ts                                 # 10 "Did You Know?" facts
src/sites/bonelesswater/components/CertifiedBadge.tsx                 # red "CERTIFIED" stamp
src/sites/bonelesswater/components/DidYouKnowCard.tsx                 # recurring fact callout
src/sites/bonelesswater/components/ComparisonTable.tsx                # competitor comparison grid
src/sites/bonelesswater/pages/home.tsx
src/sites/bonelesswater/pages/products.tsx
src/sites/bonelesswater/pages/product-detail.tsx                      # dynamic /products/[slug]
src/sites/bonelesswater/pages/comparison.tsx
src/sites/bonelesswater/pages/process.tsx
src/sites/bonelesswater/pages/research.tsx
src/sites/bonelesswater/pages/about.tsx
src/sites/bonelesswater/pages/testimonials.tsx
src/sites/bonelesswater/pages/contact.tsx
src/sites/bonelesswater/pages/cart.tsx
src/sites/bonelesswater/pages/checkout.tsx
src/sites/bonelesswater/pages/privacy.tsx
src/sites/bonelesswater/pages/terms.tsx
base-images/{slug}/base.png × 8                                       # staged product references (untracked)
public/sites/bonelesswater/*.png                                      # ~46 generated files (committed)
```

### Modified files

```
src/sites/registry.ts          # add bonelesswater (with dynamicRoutes)
src/sites/subdomains.ts        # add "bonelesswater" to VALID_SUBDOMAINS
src/app/sitemap.ts             # add bonelesswater to productSites map
scripts/resize-favicons.mjs    # add "bonelesswater" to sites array
```

---

## Image Generation Strategy

Same pipeline as OnlyFans/OnlyPans, validated:

- `mcp__image-gen__generate_image` for product hero shots (text-to-image), outputs to `generated-images/` at project root
- For per-product visual consistency across 3 shots, stage each product's hero into `base-images/{product-slug}/base.png`, then use `mcp__image-gen__generate_image_with_person` with `person="{product-slug}"` for the detail and context shots
- Move finished files from `generated-images/` to `public/sites/bonelesswater/` and commit
- `base-images/` and `generated-images/` are gitignored — only the `public/` copies get committed

**Per-product filenames:**
- `{slug}-base.png` (1024×1024) — text-to-image hero shot, also staged into `base-images/{slug}/base.png`
- `product-{slug}-detail.png` (1024×1024) — img-to-img close-up
- `product-{slug}-context.png` (1024×1024) — img-to-img in context

**Product slugs (locked):**

| # | Slug | Name | Format |
|---|---|---|---|
| 1 | `purespring-classic` | PureSpring™ Classic | 16oz still bottle |
| 2 | `effervesce` | Effervesce™ | 16oz carbonated |
| 3 | `athletepure` | AthletePure™ Electrolyte | 24oz sport |
| 4 | `heritage-reserve` | Heritage Reserve | 750ml glass |
| 5 | `infantsafe` | InfantSafe™ Pediatric Drops | 4oz medical dropper |
| 6 | `k9-hydration` | K9 Hydration™ | 32oz pet bottle |
| 7 | `lab-grade-l1` | Lab Grade L1 | 1L sealed glass |
| 8 | `household-defense` | Household Defense Pack | 24-pack |

**Competitor slugs:** `aquaserene`, `purecrest`, `springvale`, `bonespring`, `marrowpure`, `murklake`

**Exec slugs:** `whitfield` (Cornelius, founder, bill photo), `marsh` (Garrett, brandon photo), `coleman` (Russell, jim photo), `dunn` (Vincent, sean photo)

---

## Task 1: Generate PureSpring Classic image set (validate pipeline)

**Why first:** PureSpring is the flagship and the visual anchor. If the clinical pharma aesthetic doesn't land, we catch it on one product before scaling.

**Files:**
- Create: `base-images/purespring-classic/base.png` (untracked)
- Create: `public/sites/bonelesswater/purespring-classic-base.png`
- Create: `public/sites/bonelesswater/product-purespring-classic-detail.png`
- Create: `public/sites/bonelesswater/product-purespring-classic-context.png`

- [ ] **Step 1: Generate the hero/base shot**

`mcp__image-gen__generate_image`:

- `prompt`: `"Editorial pharmaceutical-grade product photograph of a tall slim 16oz clear glass water bottle with a clinical white label. The label has a deep medical-navy block at the top with a clean sans-serif PureSpring wordmark and a small red CERTIFIED stamp. Beneath the wordmark a small block reads '99.9999% Bone-Free' in subtle navy. The bottle is filled with crystal-clear water and sits on a white seamless studio backdrop with even soft clinical lighting from above and one side. Photographed dead-on, slightly elevated angle, like a real pharmacy product hero shot. Photorealistic, no people, no other readable text on the label."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `purespring-classic-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base into the MCP reference folder**

```bash
mkdir -p base-images/purespring-classic && \
cp generated-images/purespring-classic-base.png base-images/purespring-classic/base.png
```

- [ ] **Step 3: Generate the detail shot**

`mcp__image-gen__generate_image_with_person`:

- `prompt`: `"Extreme close-up of the same clinical white label and navy header block from the reference photo, focused on the deep medical-navy band at the top of the bottle showing the PureSpring wordmark and the small red CERTIFIED stamp. Same bottle, identical label. Shallow depth of field, soft clinical light. Photorealistic, no people, no additional readable text."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `product-purespring-classic-detail.png`
- `person`: `purespring-classic`
- `quality`: `high`

- [ ] **Step 4: Generate the context shot**

`mcp__image-gen__generate_image_with_person`:

- `prompt`: `"Context shot of the same tall slim 16oz clear glass PureSpring water bottle from the reference, now sitting on a clean stainless-steel laboratory bench beside a closed lab notebook and a small empty graduated cylinder. The lab is bright with cool clinical lighting and a faint blurred microscope visible in the deep background. Same bottle, identical label. Photorealistic, no people, no readable text on any other object."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `product-purespring-classic-context.png`
- `person`: `purespring-classic`
- `quality`: `high`

- [ ] **Step 5: Move the 3 generated files to public/sites/bonelesswater/**

```bash
mkdir -p public/sites/bonelesswater && \
mv generated-images/purespring-classic-base.png \
   generated-images/product-purespring-classic-detail.png \
   generated-images/product-purespring-classic-context.png \
   public/sites/bonelesswater/
```

- [ ] **Step 6: Verify**

Run: `ls public/sites/bonelesswater/ | grep -c purespring-classic`
Expected output: `3`

- [ ] **Step 7: Commit**

```bash
git add public/sites/bonelesswater/purespring-classic-base.png \
        public/sites/bonelesswater/product-purespring-classic-detail.png \
        public/sites/bonelesswater/product-purespring-classic-context.png && \
git commit -m "feat(bonelesswater): generate PureSpring Classic image set"
```

---

## Task 2: Generate remaining 7 product image sets

**Files:** For each of the 7 products: `base-images/{slug}/base.png` (untracked) + 3 files under `public/sites/bonelesswater/` matching the `{slug}-base.png` / `product-{slug}-detail.png` / `product-{slug}-context.png` convention.

Each subtask follows the same 7-step pattern as Task 1: generate base, stage, generate detail, generate context, move 3 files, verify, commit.

### Task 2a: Effervesce (sparkling, 16oz carbonated)

- [ ] **Step 1: Generate base**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "effervesce-base.png"`:

> `"Editorial pharmaceutical-grade product photograph of a tall slim 16oz clear glass water bottle filled with crystal-clear water showing fine effervescent bubbles rising. The label has a clinical white background with a deep medical-navy block at the top showing the Effervesce wordmark in clean sans-serif and a small red CERTIFIED stamp. Beneath the wordmark a small block reads '99.9999% Bone-Free' in subtle navy. White seamless studio backdrop, even clinical lighting. Photographed dead-on, slightly elevated angle. Photorealistic, no people, no additional readable text."`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/effervesce && \
cp generated-images/effervesce-base.png base-images/effervesce/base.png
```

- [ ] **Step 3: Detail**

`generate_image_with_person`, `1024x1024`, `person: "effervesce"`, `filename: "product-effervesce-detail.png"`:

> `"Extreme close-up of the upper third of the same Effervesce bottle from the reference, focused on the navy header block with the Effervesce wordmark and the red CERTIFIED stamp, with the rising effervescent bubbles in soft focus behind. Same bottle, identical label. Shallow depth of field, clinical light. Photorealistic, no people, no additional readable text."`

- [ ] **Step 4: Context**

`generate_image_with_person`, `1024x1024`, `person: "effervesce"`, `filename: "product-effervesce-context.png"`:

> `"Context shot of the same Effervesce sparkling bottle from the reference, sitting on a white linen tablecloth beside a clean unused crystal champagne flute and a small wedge of lemon. Bright airy daylight, fine-dining product photography style. Same bottle, identical label. Photorealistic, no people, no readable text."`

- [ ] **Step 5: Move and commit**

```bash
mv generated-images/effervesce-base.png \
   generated-images/product-effervesce-detail.png \
   generated-images/product-effervesce-context.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -c effervesce   # expect 3
git add public/sites/bonelesswater/effervesce-base.png public/sites/bonelesswater/product-effervesce-*.png && \
git commit -m "feat(bonelesswater): generate Effervesce image set"
```

### Task 2b: AthletePure (sport, 24oz with electrolytes)

- [ ] **Step 1: Generate base**

`generate_image`, `1024x1024`, `filename: "athletepure-base.png"`:

> `"Editorial pharmaceutical-grade product photograph of a tall 24oz clear sport bottle with a clinical white label and a slim ergonomic silhouette. The label has a deep medical-navy header block with the AthletePure wordmark in clean sans-serif and a small red CERTIFIED stamp. Beneath the wordmark a small block reads '99.9999% Bone-Free' in subtle navy and a thin amber accent line denoting electrolytes. The bottle is filled with crystal-clear water with a faint amber tint. White seamless studio backdrop, even clinical lighting. Photorealistic, no people, no additional readable text."`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/athletepure && \
cp generated-images/athletepure-base.png base-images/athletepure/base.png
```

- [ ] **Step 3: Detail**

`generate_image_with_person`, `1024x1024`, `person: "athletepure"`, `filename: "product-athletepure-detail.png"`:

> `"Extreme close-up of the upper third of the same AthletePure sport bottle from the reference, focused on the navy header block with the AthletePure wordmark, the red CERTIFIED stamp, and the thin amber accent line denoting electrolytes. Same bottle, identical label. Shallow depth of field, clinical light. Photorealistic, no people, no additional readable text."`

- [ ] **Step 4: Context**

`generate_image_with_person`, `1024x1024`, `person: "athletepure"`, `filename: "product-athletepure-context.png"`:

> `"Context shot of the same AthletePure sport bottle from the reference, on a clean rubber gym mat beside a folded white sweat towel and a pair of clean running shoes in the deep background. Cool morning gym light. Same bottle, identical label. Photorealistic, no people, no readable text."`

- [ ] **Step 5: Move and commit**

```bash
mv generated-images/athletepure-base.png \
   generated-images/product-athletepure-detail.png \
   generated-images/product-athletepure-context.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -c athletepure   # expect 3
git add public/sites/bonelesswater/athletepure-base.png public/sites/bonelesswater/product-athletepure-*.png && \
git commit -m "feat(bonelesswater): generate AthletePure image set"
```

### Task 2c: Heritage Reserve (premium 750ml glass)

- [ ] **Step 1: Generate base**

`generate_image`, `1024x1024`, `filename: "heritage-reserve-base.png"`:

> `"Editorial pharmaceutical-grade product photograph of a tall 750ml premium glass water bottle with a heavy weighted base and a thick glass body. The label is a small rectangular plate of brushed metal mounted to the front of the bottle, showing 'Heritage Reserve' engraved in deep medical-navy serif lettering with a small red CERTIFIED stamp at the bottom corner. The bottle is filled with crystal-clear water. Dark slate stone surface, dramatic side lighting from a single softbox creating subtle reflections on the glass. Premium product photography style. Photorealistic, no people, no additional readable text."`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/heritage-reserve && \
cp generated-images/heritage-reserve-base.png base-images/heritage-reserve/base.png
```

- [ ] **Step 3: Detail**

`generate_image_with_person`, `1024x1024`, `person: "heritage-reserve"`, `filename: "product-heritage-reserve-detail.png"`:

> `"Extreme close-up of the same brushed metal Heritage Reserve label plate from the reference, focused on the engraved navy serif lettering and the small red CERTIFIED stamp. Shallow depth of field, dramatic side light. Photorealistic, no people, no additional readable text."`

- [ ] **Step 4: Context**

`generate_image_with_person`, `1024x1024`, `person: "heritage-reserve"`, `filename: "product-heritage-reserve-context.png"`:

> `"Context shot of the same Heritage Reserve premium glass bottle from the reference, on a polished walnut table inside a quiet wood-paneled office, beside a leather-bound binder labeled simply 'Compliance' and a small fountain pen. Warm rich library lighting. Same bottle, identical label. Photorealistic, no people, no readable text on the binder beyond the single word."`

- [ ] **Step 5: Move and commit**

```bash
mv generated-images/heritage-reserve-base.png \
   generated-images/product-heritage-reserve-detail.png \
   generated-images/product-heritage-reserve-context.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -c heritage-reserve   # expect 3
git add public/sites/bonelesswater/heritage-reserve-base.png public/sites/bonelesswater/product-heritage-reserve-*.png && \
git commit -m "feat(bonelesswater): generate Heritage Reserve image set"
```

### Task 2d: InfantSafe Pediatric Drops (4oz medical dropper)

- [ ] **Step 1: Generate base**

`generate_image`, `1024x1024`, `filename: "infantsafe-base.png"`:

> `"Editorial pharmaceutical-grade product photograph of a small 4oz amber-tinted medical dropper bottle with a black rubber-bulb dropper cap, exactly like a real infant medication bottle. The label is clinical white with a deep medical-navy header block reading 'InfantSafe' in clean sans-serif and a small red CERTIFIED stamp. A second small red strip beneath says 'PEDIATRIC USE'. The bottle sits on a white seamless studio backdrop with even soft clinical lighting. Single subject centered. Photorealistic, no people, no additional readable text."`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/infantsafe && \
cp generated-images/infantsafe-base.png base-images/infantsafe/base.png
```

- [ ] **Step 3: Detail**

`generate_image_with_person`, `1024x1024`, `person: "infantsafe"`, `filename: "product-infantsafe-detail.png"`:

> `"Extreme close-up of the same InfantSafe label from the reference, focused on the navy header block with the InfantSafe wordmark, the red CERTIFIED stamp, and the small red PEDIATRIC USE strip. Same bottle, identical label. Shallow depth of field, clinical light. Photorealistic, no people, no additional readable text."`

- [ ] **Step 4: Context**

`generate_image_with_person`, `1024x1024`, `person: "infantsafe"`, `filename: "product-infantsafe-context.png"`:

> `"Context shot of the same small InfantSafe medical dropper bottle from the reference, on a clean white nursery shelf beside a folded muslin blanket and a small pale-gray plush bunny. Soft natural daylight. Same bottle, identical label. Photorealistic, no people, no readable text on any other object."`

- [ ] **Step 5: Move and commit**

```bash
mv generated-images/infantsafe-base.png \
   generated-images/product-infantsafe-detail.png \
   generated-images/product-infantsafe-context.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -c infantsafe   # expect 3
git add public/sites/bonelesswater/infantsafe-base.png public/sites/bonelesswater/product-infantsafe-*.png && \
git commit -m "feat(bonelesswater): generate InfantSafe image set"
```

### Task 2e: K9 Hydration (32oz pet bottle)

- [ ] **Step 1: Generate base**

`generate_image`, `1024x1024`, `filename: "k9-hydration-base.png"`:

> `"Editorial pharmaceutical-grade product photograph of a 32oz wide-bodied clear plastic pet water bottle with a small spout cap. The label is clinical white with a deep medical-navy header block showing 'K9 Hydration' in clean sans-serif and a small red CERTIFIED stamp. A second small block beneath says 'VETERINARY GRADE'. The bottle is filled with crystal-clear water. White seamless studio backdrop, even clinical lighting. Photorealistic, no people, no animals, no additional readable text."`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/k9-hydration && \
cp generated-images/k9-hydration-base.png base-images/k9-hydration/base.png
```

- [ ] **Step 3: Detail**

`generate_image_with_person`, `1024x1024`, `person: "k9-hydration"`, `filename: "product-k9-hydration-detail.png"`:

> `"Extreme close-up of the same K9 Hydration label from the reference, focused on the navy header block, the K9 Hydration wordmark, the red CERTIFIED stamp, and the VETERINARY GRADE block. Same bottle, identical label. Shallow depth of field, clinical light. Photorealistic, no people, no additional readable text."`

- [ ] **Step 4: Context**

`generate_image_with_person`, `1024x1024`, `person: "k9-hydration"`, `filename: "product-k9-hydration-context.png"`:

> `"Context shot of the same K9 Hydration pet bottle from the reference, beside a clean empty stainless steel dog bowl on a clean tile kitchen floor. A neatly coiled leash is partially visible at the edge of the frame. Bright clean morning light. Same bottle, identical label. Photorealistic, no people, no animals, no readable text."`

- [ ] **Step 5: Move and commit**

```bash
mv generated-images/k9-hydration-base.png \
   generated-images/product-k9-hydration-detail.png \
   generated-images/product-k9-hydration-context.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -c k9-hydration   # expect 3
git add public/sites/bonelesswater/k9-hydration-base.png public/sites/bonelesswater/product-k9-hydration-*.png && \
git commit -m "feat(bonelesswater): generate K9 Hydration image set"
```

### Task 2f: Lab Grade L1 (1L sealed glass)

- [ ] **Step 1: Generate base**

`generate_image`, `1024x1024`, `filename: "lab-grade-l1-base.png"`:

> `"Editorial pharmaceutical-grade product photograph of a 1L heavy clear borosilicate glass laboratory bottle with a foil-sealed black screw cap and a small holographic tamper-evident seal at the neck. The label is clinical white with a deep medical-navy header block showing 'Lab Grade L1' in clean sans-serif and a prominent red CERTIFIED stamp. A second block beneath reads '99.99999% Bone-Free' in tiny navy text along with a fictional batch number formatted like 'BW-LAB-2024-0001'. The bottle is filled with crystal-clear water. White seamless studio backdrop, sterile lab lighting. Photorealistic, no people, no additional readable text beyond the wordmark and batch number."`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/lab-grade-l1 && \
cp generated-images/lab-grade-l1-base.png base-images/lab-grade-l1/base.png
```

- [ ] **Step 3: Detail**

`generate_image_with_person`, `1024x1024`, `person: "lab-grade-l1"`, `filename: "product-lab-grade-l1-detail.png"`:

> `"Extreme close-up of the upper third of the same Lab Grade L1 bottle from the reference, focused on the foil-sealed black screw cap, the holographic tamper-evident seal at the neck, and the navy header block with the Lab Grade L1 wordmark and the red CERTIFIED stamp. Same bottle, identical label. Shallow depth of field, sterile lab lighting. Photorealistic, no people, no additional readable text."`

- [ ] **Step 4: Context**

`generate_image_with_person`, `1024x1024`, `person: "lab-grade-l1"`, `filename: "product-lab-grade-l1-context.png"`:

> `"Context shot of the same Lab Grade L1 borosilicate bottle from the reference, on a clean stainless-steel lab bench inside a glass-fronted lab refrigerator with neatly arranged identical bottles on the racks behind it. Cool sterile lab lighting. Same bottle, identical label. Photorealistic, no people, no readable text on the rack labels."`

- [ ] **Step 5: Move and commit**

```bash
mv generated-images/lab-grade-l1-base.png \
   generated-images/product-lab-grade-l1-detail.png \
   generated-images/product-lab-grade-l1-context.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -c lab-grade-l1   # expect 3
git add public/sites/bonelesswater/lab-grade-l1-base.png public/sites/bonelesswater/product-lab-grade-l1-*.png && \
git commit -m "feat(bonelesswater): generate Lab Grade L1 image set"
```

### Task 2g: Household Defense Pack (24-pack case)

- [ ] **Step 1: Generate base**

`generate_image`, `1024x1024`, `filename: "household-defense-base.png"`:

> `"Editorial pharmaceutical-grade product photograph of a 24-pack cardboard case of clinical-white water bottles, the case open at the top showing the rows of bottle caps inside. The case exterior is clinical white with a large deep medical-navy header reading 'Household Defense Pack' in clean sans-serif and a prominent red CERTIFIED stamp. A small block beneath reads '24 × 16oz · 99.9999% Bone-Free'. White seamless studio backdrop, even clinical lighting. Photorealistic, no people, no additional readable text."`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/household-defense && \
cp generated-images/household-defense-base.png base-images/household-defense/base.png
```

- [ ] **Step 3: Detail**

`generate_image_with_person`, `1024x1024`, `person: "household-defense"`, `filename: "product-household-defense-detail.png"`:

> `"Extreme close-up of the front face of the same Household Defense Pack case from the reference, focused on the navy header block with the Household Defense Pack wordmark and the red CERTIFIED stamp. Same case, identical label. Shallow depth of field, clinical light. Photorealistic, no people, no additional readable text."`

- [ ] **Step 4: Context**

`generate_image_with_person`, `1024x1024`, `person: "household-defense"`, `filename: "product-household-defense-context.png"`:

> `"Context shot of the same Household Defense Pack case from the reference, on the floor of a clean modern utility room beside a row of three identical cases stacked against a white wall. Bright clean overhead light. Same case, identical label. Photorealistic, no people, no readable text on the other cases beyond identical wordmarks."`

- [ ] **Step 5: Move and commit**

```bash
mv generated-images/household-defense-base.png \
   generated-images/product-household-defense-detail.png \
   generated-images/product-household-defense-context.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -c household-defense   # expect 3
git add public/sites/bonelesswater/household-defense-base.png public/sites/bonelesswater/product-household-defense-*.png && \
git commit -m "feat(bonelesswater): generate Household Defense Pack image set"
```

---

## Task 3: Generate 6 competitor product images

**Why:** The Comparison page centerpiece. Three legitimate-looking competitors, two bones-included joke competitors, one horrifying pond water competitor. All single-image — competitors don't need detail or context shots, just one product photo each.

**Files:**
- Create: `public/sites/bonelesswater/competitor-aquaserene.png`
- Create: `public/sites/bonelesswater/competitor-purecrest.png`
- Create: `public/sites/bonelesswater/competitor-springvale.png`
- Create: `public/sites/bonelesswater/competitor-bonespring.png`
- Create: `public/sites/bonelesswater/competitor-marrowpure.png`
- Create: `public/sites/bonelesswater/competitor-murklake.png`

- [ ] **Step 1: Generate AquaSerene (legit, mountain spring brand)**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "competitor-aquaserene.png"`:

- `prompt`: `"Stock-photo-style product shot of a generic premium bottled water with an aspirational mountain-spring brand identity. A tall slim clear PET bottle filled with clean water, with a wraparound label showing a soft watercolor mountain landscape and the wordmark 'AquaSerene' in a graceful serif. The label is mostly icy blue and white. White seamless backdrop, soft studio light. Looks like a real consumer water brand you might see at any grocery store. Photorealistic, no people, no additional readable text."`

- [ ] **Step 2: Generate PureCrest Mountain (legit, mountain brand)**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "competitor-purecrest.png"`:

- `prompt`: `"Stock-photo-style product shot of a generic premium bottled water with a heavy 'mountain summit' brand identity. A medium-sized clear PET bottle filled with clean water, with a wraparound label showing a stylized geometric mountain peak and the wordmark 'PureCrest Mountain' in a sturdy modern sans-serif. The label is forest green and white. White seamless backdrop, soft studio light. Looks like a real grocery-store water brand. Photorealistic, no people, no additional readable text."`

- [ ] **Step 3: Generate Spring Vale Natural (legit, pasture brand)**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "competitor-springvale.png"`:

- `prompt`: `"Stock-photo-style product shot of a generic premium bottled water with a soft 'meadow valley' brand identity. A medium clear PET bottle filled with clean water, with a wraparound label showing a soft pastel illustration of rolling hills with cattle grazing in the distance, and the wordmark 'Spring Vale Natural' in a friendly rounded serif. The label is buttery yellow and pale green. White seamless backdrop, soft studio light. Looks like a real grocery-store water brand. Photorealistic, no people, no additional readable text."`

- [ ] **Step 4: Generate BoneSpring (joke, bone fragments inside)**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "competitor-bonespring.png"`:

- `prompt`: `"Photograph of a glass water bottle filled with water, with several visible small white bone fragments suspended throughout the water inside the bottle. The label is cream-colored with vintage 1920s serif typography reading 'BoneSpring' and a small badge that says 'Est. 1923 · With Real Bone Calcium'. The label has hand-drawn illustrations of bones around the border. White seamless backdrop, clean product photography. Photorealistic, surreal, no people, no additional readable text beyond what is described."`

- [ ] **Step 5: Generate MarrowPure (joke, whole knuckle bones)**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "competitor-marrowpure.png"`:

- `prompt`: `"Photograph of a tall glass water bottle filled with water containing several visible whole small knuckle bones resting at the bottom and floating in the water. The label is bright red and white with bold modern sans-serif lettering reading 'MarrowPure' and a small subtitle 'Bodybuilder Strength Formula'. The label has small icons of biceps and bones. White seamless backdrop, clean product photography. Photorealistic, surreal, no people, no additional readable text beyond what is described."`

- [ ] **Step 6: Generate Murklake Reservoir (the horror)**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "competitor-murklake.png"`:

- `prompt`: `"Photograph of a clear glass water bottle filled with murky brownish-green pond water. Visible inside the bottle: floating algae strands, a small live frog clinging to the inside of the glass, and what appears to be a partial small fish skeleton resting at the bottom. The label is a stained beige color with simple block lettering reading 'Murklake Reservoir' and a tiny line beneath that reads 'Bottled As Found'. White seamless backdrop, clean product photography that contrasts with the horror inside the bottle. Photorealistic, no people, no additional readable text beyond what is described."`

- [ ] **Step 7: Move and commit**

```bash
mv generated-images/competitor-aquaserene.png \
   generated-images/competitor-purecrest.png \
   generated-images/competitor-springvale.png \
   generated-images/competitor-bonespring.png \
   generated-images/competitor-marrowpure.png \
   generated-images/competitor-murklake.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -c '^competitor-'   # expect 6
git add public/sites/bonelesswater/competitor-*.png && \
git commit -m "feat(bonelesswater): generate 6 competitor product images"
```

---

## Task 4: Generate site / process / research images

**Files:**
- Create: `public/sites/bonelesswater/home-hero.png`
- Create: `public/sites/bonelesswater/process-1-extraction.png`
- Create: `public/sites/bonelesswater/process-2-deboning.png`
- Create: `public/sites/bonelesswater/process-3-verification.png`
- Create: `public/sites/bonelesswater/process-4-certification.png`
- Create: `public/sites/bonelesswater/lab-facility.png`
- Create: `public/sites/bonelesswater/blueprint.png`
- Create: `public/sites/bonelesswater/microscopy.png`
- Create: `public/sites/bonelesswater/did-you-know-bg.png`
- Create: `public/sites/bonelesswater/historical-1898.png`

- [ ] **Step 1: Home hero**

`mcp__image-gen__generate_image`, `1536x1024`, `quality: "high"`, `filename: "home-hero.png"`:

- `prompt`: `"Editorial pharmaceutical-grade hero photograph of a single PureSpring water bottle (tall slim 16oz clear glass with a clinical white label and a deep medical-navy header) sitting on a clean stainless-steel laboratory bench beside a small clipboard with a clean compliance form and a single closed pen. Wide cinematic framing, cool clinical daylight from one side, soft shadows. The bench extends out of frame to suggest a larger lab. Photorealistic, no people, no readable text on the clipboard."`

- [ ] **Step 2: Process step 1 — extraction**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "process-1-extraction.png"`:

- `prompt`: `"Editorial photograph of a stainless-steel water extraction valve mounted on a clean tiled wall in a pharmaceutical-grade water facility, with crystal-clear water flowing from the spout into a sterile collection vessel. Bright sterile facility lighting, no labels, no readable text. Photorealistic, no people."`

- [ ] **Step 3: Process step 2 — deboning**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "process-2-deboning.png"`:

- `prompt`: `"Editorial photograph of a row of three large stainless-steel cylindrical filtration tanks connected by chrome piping inside a pharmaceutical-grade water facility, with small digital pressure gauges mounted on each tank. Clean tiled floor, bright cool lighting, no readable text. Photorealistic, no people."`

- [ ] **Step 4: Process step 3 — verification**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "process-3-verification.png"`:

- `prompt`: `"Editorial photograph of a clean white laboratory bench covered with neatly arranged sterile glass beakers and test tubes filled with crystal-clear water, with a chrome microscope at the back of the bench. Bright sterile lab lighting from above, no labels, no readable text. Photorealistic, no people."`

- [ ] **Step 5: Process step 4 — certification**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "process-4-certification.png"`:

- `prompt`: `"Editorial photograph of a clean white laboratory bench with a single sealed clear-glass water bottle (no label) standing beside a closed certification binder embossed with a small red foil seal and a single fountain pen resting on top of the binder. Soft warm clinical light, deep clean focus on the bottle and binder. Photorealistic, no people, no readable text on the binder."`

- [ ] **Step 6: Lab facility wide shot**

`mcp__image-gen__generate_image`, `1536x1024`, `quality: "high"`, `filename: "lab-facility.png"`:

- `prompt`: `"Wide editorial photograph of the interior of a modern pharmaceutical-grade water purification facility with rows of large stainless-steel filtration tanks connected by chrome piping, clean tiled floors, bright overhead industrial lighting, and a metal mezzanine walkway visible above. The facility is empty and immaculate. Photorealistic, no people, no readable text."`

- [ ] **Step 7: Blueprint**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "blueprint.png"`:

- `prompt`: `"Engineering schematic illustration on white paper showing a fictional cylindrical bone-removal device, drawn in clean technical-drawing style with measurement lines, dimension callouts, exploded sub-assembly views, and small annotation labels. Pen-on-paper aesthetic. The annotation labels should look like real engineering callouts but contain no readable English text — just lines and arrows pointing to specific components. Photorealistic technical drawing, no people."`

- [ ] **Step 8: Microscopy**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "microscopy.png"`:

- `prompt`: `"Microscope photograph at scientific magnification showing several small irregular white particle fragments suspended in a clear liquid against a black field. The particles look like microscopic bone fragments. Sharp scientific imaging style with a faint scale-bar in the lower corner that contains no readable text. Photorealistic scientific microscopy."`

- [ ] **Step 9: Did You Know background**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "did-you-know-bg.png"`:

- `prompt`: `"Vintage 1873 newspaper-style document fragment, sepia-toned, with the appearance of having been hidden in an archive. The document is folded and slightly torn at one corner. Subtle ink smudges and aged paper texture. The page shows columns of text but the text itself is illegible newsprint blur — no specific readable English. A small redaction bar in black ink covers part of the headline area. Photorealistic vintage document photography."`

- [ ] **Step 10: Historical 1898 facility**

`mcp__image-gen__generate_image`, `1024x1024`, `quality: "high"`, `filename: "historical-1898.png"`:

- `prompt`: `"Sepia-toned vintage 1898 photograph of the exterior of an early industrial water purification facility — a tall brick building with arched windows and a single iron smokestack, set against a bare landscape. Two horse-drawn carts are visible at the loading dock area. Heavily aged photographic emulsion. Photorealistic vintage photography style, no readable signs."`

- [ ] **Step 11: Move and commit**

```bash
mv generated-images/home-hero.png \
   generated-images/process-1-extraction.png \
   generated-images/process-2-deboning.png \
   generated-images/process-3-verification.png \
   generated-images/process-4-certification.png \
   generated-images/lab-facility.png \
   generated-images/blueprint.png \
   generated-images/microscopy.png \
   generated-images/did-you-know-bg.png \
   generated-images/historical-1898.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -E '^(home-hero|process-|lab-facility|blueprint|microscopy|did-you-know-bg|historical-1898)' | wc -l   # expect 10
git add public/sites/bonelesswater/home-hero.png \
        public/sites/bonelesswater/process-*.png \
        public/sites/bonelesswater/lab-facility.png \
        public/sites/bonelesswater/blueprint.png \
        public/sites/bonelesswater/microscopy.png \
        public/sites/bonelesswater/did-you-know-bg.png \
        public/sites/bonelesswater/historical-1898.png && \
git commit -m "feat(bonelesswater): generate site, process, and research images"
```

---

## Task 5: Generate executive portraits

**Why:** 4 cringing-but-resolute portraits using the existing `bill`/`brandon`/`jim`/`sean` reference folders. Different framing from OnlyFans/OnlyPans — these execs are TRUE BELIEVERS (not ashamed). Lab coats, weary moral certainty, clinical environments.

**Files:**
- Create: `public/sites/bonelesswater/exec-whitfield.png`
- Create: `public/sites/bonelesswater/exec-marsh.png`
- Create: `public/sites/bonelesswater/exec-coleman.png`
- Create: `public/sites/bonelesswater/exec-dunn.png`

- [ ] **Step 1: Generate Whitfield (Cornelius, founder, bill photo)**

`mcp__image-gen__generate_image_with_person`, `1024x1024`, `quality: "high"`:

- `role`: `founder`
- `filename`: `exec-whitfield.png`
- `prompt`: `"Editorial corporate headshot of a man in a clean white lab coat over a deep navy button-down shirt, standing in a pharmaceutical-grade water testing facility with chrome piping and clean tile in the background. He looks directly at the camera with a slightly weary but morally certain expression — the look of a man who has been telling people the truth for thirty years and is finally being heard. One hand resting calmly on the corner of a stainless steel lab bench. Soft clinical lighting. Photorealistic, single person, no text."`

- [ ] **Step 2: Generate Marsh (Garrett, brandon photo)**

`mcp__image-gen__generate_image_with_person`, `1024x1024`, `quality: "high"`:

- `person`: `brandon`
- `filename`: `exec-marsh.png`
- `prompt`: `"Editorial corporate headshot of a man in a clean white lab coat over a charcoal sweater, standing beside a chrome microscope on a clean white laboratory bench. Behind him, a wall of framed scientific charts is visible but unreadable. He has a calm, intelligent, slightly tired expression — the expression of a published researcher whose work was retracted and then reinstated. Soft clinical lighting. Photorealistic, single person, no readable text on the charts."`

- [ ] **Step 3: Generate Coleman (Russell, jim photo)**

`mcp__image-gen__generate_image_with_person`, `1024x1024`, `quality: "high"`:

- `person`: `jim`
- `filename`: `exec-coleman.png`
- `prompt`: `"Editorial corporate headshot of a man in a clean white lab coat over a soft grey shirt, holding a clipboard at his side and standing in front of a tall metal rack of sealed water test tubes. He has the calm, slightly haunted look of a man who has personally suffered from an undiagnosed condition for decades and now travels the country auditing water facilities. Soft clinical lighting. Photorealistic, single person, no readable text on the clipboard."`

- [ ] **Step 4: Generate Dunn (Vincent, sean photo)**

`mcp__image-gen__generate_image_with_person`, `1024x1024`, `quality: "high"`:

- `person`: `sean`
- `filename`: `exec-dunn.png`
- `prompt`: `"Editorial corporate headshot of a man in a clean navy blazer over a crisp white shirt, standing in a small office lined with regulatory binders on tall shelves behind him. He has the calm, slightly weary look of a former federal inspector who left the agency after being told to suppress findings. Hands clasped in front of him. Soft warm office lighting. Photorealistic, single person, no readable text on the binders."`

- [ ] **Step 5: Move and commit**

```bash
mv generated-images/exec-whitfield.png \
   generated-images/exec-marsh.png \
   generated-images/exec-coleman.png \
   generated-images/exec-dunn.png \
   public/sites/bonelesswater/

ls public/sites/bonelesswater/ | grep -c '^exec-'   # expect 4
git add public/sites/bonelesswater/exec-whitfield.png \
        public/sites/bonelesswater/exec-marsh.png \
        public/sites/bonelesswater/exec-coleman.png \
        public/sites/bonelesswater/exec-dunn.png && \
git commit -m "feat(bonelesswater): generate executive portraits (4 true believers)"
```

---

## Task 6: Site bootstrap — config, registry wiring, placeholder home, favicon

**Files:**
- Create: `src/sites/bonelesswater/config.ts`
- Create: `src/sites/bonelesswater/index.ts`
- Create: `src/sites/bonelesswater/pages/home.tsx` (placeholder)
- Create: `public/sites/bonelesswater/favicon.png` (copied from `purespring-classic-base.png`)
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`
- Modify: `scripts/resize-favicons.mjs`

- [ ] **Step 1: Create the site config**

Create `src/sites/bonelesswater/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "BonelessWater",
  subdomain: "bonelesswater",
  theme: {
    preset: "light",
    colors: {
      primary: "#0c4a6e",      // medical navy
      secondary: "#075985",    // deeper navy
      accent: "#dc2626",       // urgent red (CERTIFIED, WARNING)
      background: "#FFFFFF",
      text: "#0f172a",
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "BonelessWater — Pharmaceutical-Grade Bone-Free Drinking Water",
    description: "The original deboned drinking water. Independently verified 99.9999% bone-free. The skeletal structure of water has been understood since 1873; we are the only platform that takes it seriously.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Comparison", path: "/comparison" },
    { label: "Our Process", path: "/process" },
    { label: "Research", path: "/research" },
    { label: "About", path: "/about" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create a placeholder home page**

Create `src/sites/bonelesswater/pages/home.tsx`:

```typescript
export default function BonelessWaterHome() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">BonelessWater</h1>
      <p className="text-foreground/70">Placeholder home page. Real content coming.</p>
    </div>
  )
}
```

- [ ] **Step 3: Create the index barrel**

Create `src/sites/bonelesswater/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import BonelessWaterHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": BonelessWaterHome,
}
```

- [ ] **Step 4: Register in the site registry**

Modify `src/sites/registry.ts`. Add the import alongside the others:

```typescript
import { config as bonelesswaterConfig, pages as bonelesswaterPages } from "./bonelesswater"
```

And add to the `siteRegistry` object:

```typescript
  bonelesswater: { config: bonelesswaterConfig, pages: bonelesswaterPages },
```

- [ ] **Step 5: Add to the subdomain allowlist**

Modify `src/sites/subdomains.ts`. Add `"bonelesswater"` to the `VALID_SUBDOMAINS` array (keep all existing entries):

```typescript
export const VALID_SUBDOMAINS = [
  "apex",
  "pigmilk",
  "dehydratedwater",
  "inflatableanchors",
  "strategicvoid",
  "stratify",
  "truegrit",
  "grassfedwifi",
  "elderparty",
  "cleansheet",
  "snortables",
  "mousetrapjenga",
  "onlyfans",
  "onlypans",
  "bonelesswater",
] as const
```

- [ ] **Step 6: Stage and resize the favicon**

```bash
cp public/sites/bonelesswater/purespring-classic-base.png public/sites/bonelesswater/favicon.png
```

Modify `scripts/resize-favicons.mjs`. Add `"bonelesswater"` to the `sites` array (it should already contain `onlyfans` and `onlypans` from previous builds):

```javascript
const sites = ["apex", "pigmilk", "dehydratedwater", "inflatableanchors", "strategicvoid", "stratify", "truegrit", "onlyfans", "onlypans", "bonelesswater"]
```

Then run:

```bash
node scripts/resize-favicons.mjs
```

Expected: output shows `bonelesswater` resized from 1024×1024 to 64×64.

- [ ] **Step 7: Type-check**

Run: `npx tsc --noEmit`
Expected: clean exit, no errors.

- [ ] **Step 8: Smoke test the route**

```bash
if ! curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/?site=bonelesswater" 2>/dev/null | grep -q "^200$"; then
  npm run dev > /tmp/bw-dev.log 2>&1 &
  DEV_PID=$!
  for i in {1..30}; do
    if curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/?site=bonelesswater" 2>/dev/null | grep -q "^200$"; then
      break
    fi
    sleep 1
  done
fi
curl -s "http://localhost:3000/?site=bonelesswater" | grep -c "BonelessWater"
[ -n "$DEV_PID" ] && kill $DEV_PID 2>/dev/null && wait $DEV_PID 2>/dev/null
```

Expected: grep returns at least 1.

- [ ] **Step 9: Commit**

```bash
git add src/sites/bonelesswater/config.ts \
        src/sites/bonelesswater/pages/home.tsx \
        src/sites/bonelesswater/index.ts \
        src/sites/registry.ts \
        src/sites/subdomains.ts \
        public/sites/bonelesswater/favicon.png \
        scripts/resize-favicons.mjs && \
git commit -m "feat(bonelesswater): bootstrap site config, registry, favicon"
```

---

## Task 7: Products data file

**Files:** Create `src/sites/bonelesswater/data/products.ts`

- [ ] **Step 1: Create the file**

Create `src/sites/bonelesswater/data/products.ts` with this complete content:

```typescript
export interface Product {
  slug: string
  name: string
  subBrand: string
  format: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  heroImage: string
  detailImage: string
  contextImage: string
  bonelessFreePercent: string
  whatsInside: string[]
  certifications: string[]
}

export const products: Product[] = [
  {
    slug: "purespring-classic",
    name: "PureSpring™ Classic",
    subBrand: "PureSpring™",
    format: "16oz still bottle",
    price: 2.99,
    priceLabel: "$2.99",
    tagline: "The original deboned drinking water.",
    description: [
      "PureSpring™ Classic is the cornerstone of the BonelessWater catalog. Each 16oz bottle is sourced from a verified bone-free aquifer and processed through our proprietary 47-step deboning method, then independently verified by our laboratory partners to be 99.9999% bone-free at point of bottling.",
      "It is, simply, water — but for the first time, with the certainty that it has been processed by people who take the issue seriously.",
      "Our most popular product. Recommended for daily hydration and for households new to the BonelessWater platform.",
    ],
    heroImage: "/sites/bonelesswater/purespring-classic-base.png",
    detailImage: "/sites/bonelesswater/product-purespring-classic-detail.png",
    contextImage: "/sites/bonelesswater/product-purespring-classic-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (deboned)",
      "Trace minerals naturally retained during the deboning process",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1",
      "Independent Laboratory Verified",
      "47-Step Process Compliant",
      "ISO 9001:2015",
    ],
  },
  {
    slug: "effervesce",
    name: "Effervesce™",
    subBrand: "Effervesce™",
    format: "16oz carbonated",
    price: 3.49,
    priceLabel: "$3.49",
    tagline: "All the bubbles, none of the bones.",
    description: [
      "Effervesce™ is BonelessWater's answer to the question of how a sparkling water can be both refreshing and skeletally pristine. Carbonation is introduced after our standard 47-step deboning process is complete, ensuring that not a single bone fragment is reintroduced via the carbonation system.",
      "Independently verified at the same 99.9999% bone-free standard as our flagship PureSpring Classic, with the addition of fine effervescent bubbles that some subscribers describe as 'reassuring.'",
      "Recommended for dinner service, formal occasions, and any setting where guests may have unstated indigestion concerns.",
    ],
    heroImage: "/sites/bonelesswater/effervesce-base.png",
    detailImage: "/sites/bonelesswater/product-effervesce-detail.png",
    contextImage: "/sites/bonelesswater/product-effervesce-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (deboned)",
      "Food-grade carbon dioxide (independently bone-free)",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1",
      "Carbonation Source Verified",
      "47-Step Process Compliant",
      "ISO 9001:2015",
    ],
  },
  {
    slug: "athletepure",
    name: "AthletePure™ Electrolyte",
    subBrand: "AthletePure™",
    format: "24oz sport with electrolytes",
    price: 3.99,
    priceLabel: "$3.99",
    tagline: "For athletes who cannot risk skeletal contamination during competition.",
    description: [
      "AthletePure™ Electrolyte is engineered for the competitive athlete who understands that ingested aqueous bone fragments may impact recovery time, intestinal performance, and overall hydration efficiency. Our electrolyte blend is mineral-derived, fully synthetic, and certified to be free of any bone-derived calcium.",
      "The 24oz format supports a complete training session at our recommended 99.9999% bone-free standard. We strongly discourage hydrating from any unverified water source during competition.",
      "Endorsed by no professional athletic organizations, but quietly preferred by several.",
    ],
    heroImage: "/sites/bonelesswater/athletepure-base.png",
    detailImage: "/sites/bonelesswater/product-athletepure-detail.png",
    contextImage: "/sites/bonelesswater/product-athletepure-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (deboned)",
      "Synthetic electrolyte blend (sodium, potassium, magnesium — all verified bone-free origin)",
      "Trace amber color from natural mineral retention",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1",
      "Electrolyte Origin Verified",
      "47-Step Process Compliant",
      "Athletic Integrity Standard",
    ],
  },
  {
    slug: "heritage-reserve",
    name: "Heritage Reserve",
    subBrand: "Heritage Reserve",
    format: "750ml glass bottle",
    price: 8.99,
    priceLabel: "$8.99",
    tagline: "Triple-filtered. Aged in steel. Hand-verified bone-free.",
    description: [
      "Heritage Reserve is our premium offering for the discerning BonelessWater subscriber. Each 750ml bottle is triple-filtered through our proprietary process, aged for 30 days in food-grade stainless steel maturation tanks, and individually inspected by a senior BoneScan™ technician before being capped.",
      "The brushed steel label plate is mounted directly to the glass and engraved with the Heritage Reserve wordmark and a small CERTIFIED stamp. Each bottle carries a unique batch identifier traceable to the technician who personally verified its bone-free status.",
      "Recommended for special occasions, executive dining, and as a gift to friends and family who have expressed interest in your water-related concerns.",
    ],
    heroImage: "/sites/bonelesswater/heritage-reserve-base.png",
    detailImage: "/sites/bonelesswater/product-heritage-reserve-detail.png",
    contextImage: "/sites/bonelesswater/product-heritage-reserve-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (triple-deboned)",
      "Aged 30 days in food-grade stainless steel",
      "Hand-verified by a senior BoneScan™ technician",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1+",
      "Heritage Reserve Standard",
      "Senior Technician Verified",
      "ISO 9001:2015",
    ],
  },
  {
    slug: "infantsafe",
    name: "InfantSafe™ Pediatric Drops",
    subBrand: "InfantSafe™",
    format: "4oz medical dropper",
    price: 12.99,
    priceLabel: "$12.99",
    tagline: "The most vulnerable population. The most rigorous standard.",
    description: [
      "InfantSafe™ Pediatric Drops are formulated for the youngest members of your household. Developing digestive systems are particularly susceptible to ingested aqueous bone fragments, with research suggesting that infants under 6 months are 4× more vulnerable to bone-related digestive disturbances than adults.",
      "InfantSafe™ exceeds our standard 99.9999% bone-free certification with an additional pediatric-grade verification layer. The 4oz amber dropper format is calibrated for ease of use during feeding and is recommended by no specific pediatricians.",
      "Each bottle is individually inspected and sealed in a clean room environment.",
    ],
    heroImage: "/sites/bonelesswater/infantsafe-base.png",
    detailImage: "/sites/bonelesswater/product-infantsafe-detail.png",
    contextImage: "/sites/bonelesswater/product-infantsafe-context.png",
    bonelessFreePercent: "99.99999%",
    whatsInside: [
      "Purified drinking water (pediatric-deboned)",
      "Cleanroom-sealed",
      "Individually inspected",
    ],
    certifications: [
      "BoneScan™ Certified Pediatric",
      "Cleanroom Verified",
      "Pediatric Compliance Standard",
      "ISO 14644-1 Class 7",
    ],
  },
  {
    slug: "k9-hydration",
    name: "K9 Hydration™",
    subBrand: "K9 Hydration™",
    format: "32oz pet bottle",
    price: 6.99,
    priceLabel: "$6.99",
    tagline: "Your dog's smaller intestinal tract makes them disproportionately susceptible.",
    description: [
      "K9 Hydration™ is the only water purification product specifically formulated for canine companions. Dogs metabolize aqueous bone fragments differently than humans, and their smaller intestinal tracts cannot process the same bone-particulate loads that an adult human can tolerate.",
      "Each 32oz bottle is processed through our standard 47-step deboning method and then verified to a veterinary-grade bone-free standard. The wide-bodied bottle is designed for easy pouring into standard pet water bowls.",
      "Your dog cannot tell you that they are uncomfortable. K9 Hydration™ removes the risk before they have to.",
    ],
    heroImage: "/sites/bonelesswater/k9-hydration-base.png",
    detailImage: "/sites/bonelesswater/product-k9-hydration-detail.png",
    contextImage: "/sites/bonelesswater/product-k9-hydration-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (deboned to veterinary standard)",
    ],
    certifications: [
      "BoneScan™ Certified Veterinary",
      "Companion Animal Tested",
      "Endorsed by no veterinarians",
      "47-Step Process Compliant",
    ],
  },
  {
    slug: "lab-grade-l1",
    name: "Lab Grade L1",
    subBrand: "Lab Grade L1",
    format: "1L sealed glass",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "99.99999% bone-free. For research applications and the deeply concerned.",
    description: [
      "Lab Grade L1 is our highest-purity offering, processed through an additional verification cycle beyond our standard 47-step method. Each 1L bottle is sealed under tamper-evident foil in a Class 7 clean room, individually batch-tracked, and verified to a research-grade 99.99999% bone-free standard — one additional decimal of purity beyond our consumer line.",
      "Lab Grade L1 is intended for research applications, sensitive instrumentation, and BonelessWater subscribers whose personal indigestion history requires the highest available certification level. Each bottle includes a printed batch certificate.",
      "Not recommended for casual hydration. Recommended for the deeply concerned.",
    ],
    heroImage: "/sites/bonelesswater/lab-grade-l1-base.png",
    detailImage: "/sites/bonelesswater/product-lab-grade-l1-detail.png",
    contextImage: "/sites/bonelesswater/product-lab-grade-l1-context.png",
    bonelessFreePercent: "99.99999%",
    whatsInside: [
      "Purified drinking water (research-grade deboned)",
      "Cleanroom-sealed under tamper-evident foil",
      "Individually batch-tracked",
    ],
    certifications: [
      "BoneScan™ Certified Research Grade",
      "Cleanroom Class 7 Verified",
      "Tamper-Evident Sealed",
      "Batch Traceable",
    ],
  },
  {
    slug: "household-defense",
    name: "Household Defense Pack",
    subBrand: "Household Defense Pack",
    format: "24-pack case",
    price: 59.99,
    priceLabel: "$59.99",
    tagline: "Protect everyone in your household. Recommended quarterly subscription.",
    description: [
      "The Household Defense Pack is the most cost-effective way to protect every member of your household from the risks of skeletal contamination in unverified drinking water. Each case contains 24 × 16oz bottles of PureSpring™ Classic, processed and certified to our standard 99.9999% bone-free specification.",
      "We recommend a quarterly subscription cadence — one case per household member per quarter — to maintain continuous protection. Subscribers report a measurable improvement in household indigestion within 4-6 weeks of switching from unverified water sources.",
      "Free shipping on subscriptions of 4 cases or more.",
    ],
    heroImage: "/sites/bonelesswater/household-defense-base.png",
    detailImage: "/sites/bonelesswater/product-household-defense-detail.png",
    contextImage: "/sites/bonelesswater/product-household-defense-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "24 × 16oz PureSpring™ Classic bottles",
      "Cardboard case with carry handle",
      "Quarterly subscription welcome card",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1",
      "Household Volume Verified",
      "47-Step Process Compliant",
      "ISO 9001:2015",
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export const homepageFeaturedProducts = ["purespring-classic", "effervesce", "infantsafe", "lab-grade-l1"]
  .map((slug) => products.find((p) => p.slug === slug)!)
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/data/products.ts && \
git commit -m "feat(bonelesswater): add product catalog (8 SKUs)"
```

---

## Task 8: Leadership data file

**Files:** Create `src/sites/bonelesswater/data/leadership.ts`

- [ ] **Step 1: Create the file**

```typescript
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: "bill" | "brandon" | "jim" | "sean"
}

export const executives: Executive[] = [
  {
    slug: "whitfield",
    name: "Cornelius Whitfield",
    title: "Founder & Chief Executive",
    bio: "Cornelius founded BonelessWater in 1991 after a decade as a bottling-industry consultant. He discovered the indigestion-bone link while reviewing internal calcium-content reports for a major bottler and resigned the next morning. He has dedicated his life to bone removal since. He is a graduate of a respectable Midwestern business school and would like that mentioned.",
    quote: "I knew the moment I saw the report. The numbers don't lie about bones in your drinking water.",
    image: "/sites/bonelesswater/exec-whitfield.png",
    referencePerson: "bill",
  },
  {
    slug: "marsh",
    name: "Garrett Marsh",
    title: "Chief Science Officer",
    bio: "Garrett is co-author of the 1993 Journal of Aqueous Pathology paper that first quantified skeletal residue in municipal water supplies. The journal retracted his paper under industry pressure and reinstated it three years later under public pressure. He has run BonelessWater's research division since 1998 and personally oversees every batch of Lab Grade L1.",
    quote: "Peer review is a process. Truth is a constant.",
    image: "/sites/bonelesswater/exec-marsh.png",
    referencePerson: "brandon",
  },
  {
    slug: "coleman",
    name: "Russell Coleman",
    title: "Director of Consumer Protection",
    bio: "Russell suffered from undiagnosed indigestion for 27 years before discovering BonelessWater on the recommendation of a chiropractor. His symptoms resolved within three weeks of switching. He is now a certified BoneScan™ inspector and travels the country auditing competing facilities. He keeps a written log of every facility he has visited and maintains it in a leather binder he carries personally.",
    quote: "I felt the difference within seventy-two hours. I have not gone back.",
    image: "/sites/bonelesswater/exec-coleman.png",
    referencePerson: "jim",
  },
  {
    slug: "dunn",
    name: "Vincent Dunn",
    title: "Director of Compliance",
    bio: "Vincent is a former FDA inspector who resigned in 2003 after being instructed to suppress a draft report on cattle proximity to municipal water supplies in three Midwestern states. He spent eight years in private compliance consulting before joining BonelessWater in 2011. His regulatory binders are now organized by year, watershed, and contamination vector.",
    quote: "I sleep soundly now. I did not for a long time before that.",
    image: "/sites/bonelesswater/exec-dunn.png",
    referencePerson: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/data/leadership.ts && \
git commit -m "feat(bonelesswater): add executive leadership data"
```

---

## Task 9: Testimonials data file

**Files:** Create `src/sites/bonelesswater/data/testimonials.ts`

- [ ] **Step 1: Create the file**

```typescript
import { getPortrait } from "@/data/testimonial-portraits"

export interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
}

function withPortrait(slug: string, quote: string, title: string): Testimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image }
}

export const testimonials: Testimonial[] = [
  withPortrait(
    "brenda-faulk",
    "I had unexplained indigestion for fifteen years. Three weeks after switching to PureSpring Classic, the symptoms simply stopped. My doctor cannot explain it. I no longer ask him to.",
    "PureSpring Classic subscriber — Tulsa, OK",
  ),
  withPortrait(
    "jason-kile",
    "I bought the Heritage Reserve as a gift for my brother-in-law and now he is the one telling me the symptoms have stopped. The brushed steel label plate is a particularly nice touch.",
    "Heritage Reserve subscriber — Des Moines, IA",
  ),
  withPortrait(
    "tony-mazetti",
    "I am a competitive masters powerlifter. I switched to AthletePure during my off-season and my recovery times improved noticeably. I have not used another sport hydration product since.",
    "AthletePure subscriber — Dubuque, IA",
  ),
  withPortrait(
    "patricia-hollowell",
    "As a healthcare professional I was, frankly, skeptical. The peer-reviewed research won me over. I now keep Lab Grade L1 in the staff fridge.",
    "Lab Grade L1 subscriber — Iowa City, IA",
  ),
  withPortrait(
    "derek-pullman",
    "I subscribed to the Household Defense Pack after my wife noticed me reading the BonelessWater research site for an unusual length of time. Six months in and the household indigestion has been measurably reduced.",
    "Household Defense Pack subscriber — Marshalltown, IA",
  ),
  withPortrait(
    "simone-archer",
    "I serve Effervesce at every dinner party I host. My guests have stopped commenting on it, which is how I know they have come around.",
    "Effervesce subscriber — Ames, IA",
  ),
  withPortrait(
    "kyle-brandt",
    "I bought K9 Hydration for my golden retriever after reading the K9 page. He drinks it without complaint, which is how he tells me it is working.",
    "K9 Hydration subscriber — Waterloo, IA",
  ),
  withPortrait(
    "eleanor-whittaker",
    "InfantSafe Pediatric Drops are part of my daughter's daily routine now. The cleanroom certification gives me a confidence I did not realize I was missing.",
    "InfantSafe subscriber — Iowa City, IA",
  ),
]

export const homepageTestimonials = testimonials.slice(0, 3)
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/data/testimonials.ts && \
git commit -m "feat(bonelesswater): add indigestion-recovery testimonials"
```

---

## Task 10: Competitors data file

**Files:** Create `src/sites/bonelesswater/data/competitors.ts`

- [ ] **Step 1: Create the file**

```typescript
export type CompetitorCategory = "legitimate" | "bones" | "pond"

export interface Competitor {
  slug: string
  name: string
  category: CompetitorCategory
  productImage: string
  fudClaim: string
  features: {
    h2oPresent: boolean
    skeletalFree: boolean
    bonescanCertified: boolean
    fortySevenStep: boolean
    peerReviewed: boolean
    bottlingDistance: boolean
    visibleBones: boolean
    visibleAmphibians: boolean
  }
}

export const competitors: Competitor[] = [
  {
    slug: "aquaserene",
    name: "AquaSerene",
    category: "legitimate",
    productImage: "/sites/bonelesswater/competitor-aquaserene.png",
    fudClaim: "Sourced from a spring within 200 miles of a Civil War battlefield. Atmospheric bone exposure cannot be ruled out. Their refusal to commission a proximity audit speaks for itself.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: false,
      visibleAmphibians: false,
    },
  },
  {
    slug: "purecrest",
    name: "PureCrest Mountain",
    category: "legitimate",
    productImage: "/sites/bonelesswater/competitor-purecrest.png",
    fudClaim: "Bottling facility shares a property line with an orthodontic clinic. We have flagged this proximity violation in our internal compliance log. They have not responded to our certified letters.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: false,
      visibleAmphibians: false,
    },
  },
  {
    slug: "springvale",
    name: "Spring Vale Natural",
    category: "legitimate",
    productImage: "/sites/bonelesswater/competitor-springvale.png",
    fudClaim: "Their watershed contains observable cattle. Cattle possess approximately 207 bones each. The math is the math.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: false,
      visibleAmphibians: false,
    },
  },
  {
    slug: "bonespring",
    name: "BoneSpring™",
    category: "bones",
    productImage: "/sites/bonelesswater/competitor-bonespring.png",
    fudClaim: "Has been marketing 'fresh bone fragments for added calcium' since 1923. Their bottle visibly contains bone bits suspended in the water. They are at least honest about it.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: true,
      visibleAmphibians: false,
    },
  },
  {
    slug: "marrowpure",
    name: "MarrowPure™",
    category: "bones",
    productImage: "/sites/bonelesswater/competitor-marrowpure.png",
    fudClaim: "Even more explicit than BoneSpring. Visible whole knuckle bones in the bottle. Marketed to bodybuilders. Endorsed by no medical organization.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: true,
      visibleAmphibians: false,
    },
  },
  {
    slug: "murklake",
    name: "Murklake® Reservoir Water",
    category: "pond",
    productImage: "/sites/bonelesswater/competitor-murklake.png",
    fudClaim: "Bottled directly from a Wisconsin reservoir without filtration. Proudly markets its 'naturally occurring biodiversity.' Contains bones, vertebrates, and amphibians by design.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: true,
      visibleAmphibians: true,
    },
  },
]

export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug)
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/data/competitors.ts && \
git commit -m "feat(bonelesswater): add competitor data (3 legit + 2 bones + 1 pond)"
```

---

## Task 11: Facts data file

**Files:** Create `src/sites/bonelesswater/data/facts.ts`

- [ ] **Step 1: Create the file**

```typescript
export interface DidYouKnowFact {
  slug: string
  text: string
  citation?: string
}

export const facts: DidYouKnowFact[] = [
  {
    slug: "1873-history",
    text: "The skeletal structure of water has been documented since 1873, though the original research was suppressed by major bottlers.",
    citation: "Aqueous Pathology Quarterly, originally published 1873, archive recovered 1991",
  },
  {
    slug: "indigestion-link",
    text: "94% of unexplained indigestion cases trace back to ingested aqueous bone fragments.",
    citation: "Journal of Aqueous Pathology, 1993",
  },
  {
    slug: "residue-per-liter",
    text: "The average untreated bottle of water contains an estimated 0.3 micrograms of skeletal residue per liter.",
    citation: "BonelessWater internal lab, 2019",
  },
  {
    slug: "filtration-limit",
    text: "Aqueous bone particles are too small to be filtered by conventional charcoal systems. Our 47-step process is the only verified method.",
  },
  {
    slug: "pediatric-vulnerability",
    text: "Children under 6 are 4× more vulnerable to ingested bone fragments due to underdeveloped digestive enzymes.",
    citation: "Pediatric Hydration Review, 2007",
  },
  {
    slug: "pet-vulnerability",
    text: "Pets metabolize bones in water differently than humans. Their smaller intestinal tracts are particularly susceptible.",
  },
  {
    slug: "atmospheric-exposure",
    text: "Atmospheric bone exposure can occur at distances of up to 800 meters from any cemetery, hospital, or veterinary clinic.",
    citation: "Environmental Bone Distribution Quarterly, 2014",
  },
  {
    slug: "fda-threshold",
    text: "BoneScan™ detection thresholds are 1,000× more sensitive than the FDA's recommended minimum, which has not been updated since 1971.",
  },
  {
    slug: "fda-resignation",
    text: "In 2003 a former FDA inspector resigned after being instructed to suppress findings about cattle proximity to municipal water supplies.",
  },
  {
    slug: "source-bottling",
    text: "The phrase 'bottled at the source' provides no guarantee that the source itself is bone-free.",
  },
]

export function getFactBySlug(slug: string): DidYouKnowFact | undefined {
  return facts.find((f) => f.slug === slug)
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/data/facts.ts && \
git commit -m "feat(bonelesswater): add 'did you know' fact pool (10 facts)"
```

---

## Task 12: CertifiedBadge component

**Files:** Create `src/sites/bonelesswater/components/CertifiedBadge.tsx`

- [ ] **Step 1: Create the file**

```typescript
interface CertifiedBadgeProps {
  size?: "sm" | "md" | "lg"
  label?: string
}

export function CertifiedBadge({ size = "md", label = "CERTIFIED" }: CertifiedBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  }
  return (
    <span
      className={`inline-block bg-[#dc2626] text-white font-extrabold uppercase tracking-wider rounded-sm ${sizeClasses[size]}`}
      aria-label={label}
    >
      {label}
    </span>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/components/CertifiedBadge.tsx && \
git commit -m "feat(bonelesswater): add CertifiedBadge component"
```

---

## Task 13: DidYouKnowCard component

**Files:** Create `src/sites/bonelesswater/components/DidYouKnowCard.tsx`

- [ ] **Step 1: Create the file**

```typescript
import type { DidYouKnowFact } from "../data/facts"

interface DidYouKnowCardProps {
  fact: DidYouKnowFact
}

export function DidYouKnowCard({ fact }: DidYouKnowCardProps) {
  return (
    <div className="bg-white border-l-4 border-[#dc2626] rounded-r-lg p-5 shadow-sm">
      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#dc2626] mb-2">
        ◆ Did You Know?
      </div>
      <p className="text-sm text-[#0f172a] leading-relaxed">{fact.text}</p>
      {fact.citation && (
        <p className="mt-2 text-[10px] italic text-[#0c4a6e]/70">— {fact.citation}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/components/DidYouKnowCard.tsx && \
git commit -m "feat(bonelesswater): add DidYouKnowCard component"
```

---

## Task 14: ComparisonTable component

**Files:** Create `src/sites/bonelesswater/components/ComparisonTable.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import type { Competitor } from "../data/competitors"

interface ComparisonTableProps {
  competitors: Competitor[]
}

interface FeatureRow {
  key: keyof Competitor["features"]
  label: string
  bonelessWaterValue: boolean
}

const FEATURES: FeatureRow[] = [
  { key: "h2oPresent", label: "H2O molecules present", bonelessWaterValue: true },
  { key: "skeletalFree", label: "Free of skeletal contamination", bonelessWaterValue: true },
  { key: "bonescanCertified", label: "Independent BoneScan™ certification", bonelessWaterValue: true },
  { key: "fortySevenStep", label: "47-step deboning process", bonelessWaterValue: true },
  { key: "peerReviewed", label: "Peer-reviewed bone-removal research", bonelessWaterValue: true },
  { key: "bottlingDistance", label: "Bottling facility ≥500m from any source of bones", bonelessWaterValue: true },
  { key: "visibleBones", label: "Visible bones in product", bonelessWaterValue: false },
  { key: "visibleAmphibians", label: "Visible amphibians in product", bonelessWaterValue: false },
]

function FeatureCell({ value, positiveDesired }: { value: boolean; positiveDesired: boolean }) {
  // For most features, true is desired. For visibleBones/visibleAmphibians, false is desired.
  const isGood = positiveDesired ? value : !value
  return (
    <td className={`text-center text-lg font-bold ${isGood ? "text-[#0c4a6e]" : "text-[#dc2626]"}`}>
      {value ? "✓" : "✗"}
    </td>
  )
}

export function ComparisonTable({ competitors }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto border border-[#0c4a6e]/20 rounded-lg">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="bg-[#0c4a6e] text-white">
            <th className="text-left px-4 py-3 font-bold">Feature</th>
            <th className="text-center px-3 py-3 font-bold bg-[#075985]">
              <div className="flex flex-col items-center gap-1">
                <span>BonelessWater</span>
                <span className="text-[10px] font-normal opacity-80">(us)</span>
              </div>
            </th>
            {competitors.map((c) => (
              <th key={c.slug} className="text-center px-2 py-3 font-bold">
                <div className="flex flex-col items-center gap-1">
                  <div className="relative w-12 h-12 rounded bg-white/10 overflow-hidden">
                    <Image
                      src={c.productImage}
                      alt={c.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-normal">{c.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((row, idx) => {
            const positiveDesired = row.key !== "visibleBones" && row.key !== "visibleAmphibians"
            return (
              <tr key={row.key} className={idx % 2 === 0 ? "bg-white" : "bg-[#0c4a6e]/5"}>
                <td className="px-4 py-3 text-[#0f172a]">{row.label}</td>
                <FeatureCell value={row.bonelessWaterValue} positiveDesired={positiveDesired} />
                {competitors.map((c) => (
                  <FeatureCell key={c.slug} value={c.features[row.key]} positiveDesired={positiveDesired} />
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/components/ComparisonTable.tsx && \
git commit -m "feat(bonelesswater): add ComparisonTable component"
```

---

## Task 15: Home page

**Files:** Modify `src/sites/bonelesswater/pages/home.tsx` (replace placeholder)

- [ ] **Step 1: Replace the placeholder with the full home page**

Replace the entire contents of `src/sites/bonelesswater/pages/home.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { homepageFeaturedProducts } from "../data/products"
import { homepageTestimonials } from "../data/testimonials"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"

export default async function BonelessWaterHome() {
  const siteHref = await getSiteHref()
  const headlineFact = facts.find((f) => f.slug === "1873-history")!

  return (
    <>
      {/* HERO */}
      <section className="bg-white border-b border-[#0c4a6e]/10">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <CertifiedBadge size="sm" label="INDEPENDENTLY VERIFIED" />
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-[#0c4a6e] leading-tight">
              99.9999% Bone-Free.
            </h1>
            <p className="mt-4 text-lg text-[#0f172a]/70">
              The original deboned drinking water. Pharmaceutical-grade purification. The skeletal structure of water has been understood since 1873 — we are the only platform that takes it seriously.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteHref("/products")}
                className="bg-[#0c4a6e] hover:bg-[#075985] text-white font-bold rounded px-7 py-3 transition-colors"
              >
                View Products
              </Link>
              <Link
                href={siteHref("/research")}
                className="bg-white border border-[#0c4a6e]/30 hover:border-[#0c4a6e]/60 text-[#0c4a6e] font-bold rounded px-7 py-3 transition-colors"
              >
                View the Research
              </Link>
            </div>
          </div>
          <div className="relative aspect-[3/2] rounded-lg overflow-hidden border border-[#0c4a6e]/20 shadow-md">
            <Image
              src="/sites/bonelesswater/home-hero.png"
              alt="A PureSpring water bottle on a clinical lab bench"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* DID YOU KNOW callout */}
      <section className="bg-[#0c4a6e]/5 border-b border-[#0c4a6e]/10">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <DidYouKnowCard fact={headlineFact} />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-white border-b border-[#0c4a6e]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0c4a6e]">Featured products</h2>
            <p className="text-[#0f172a]/60 mt-2">A selection of our certified bone-free product line.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageFeaturedProducts.map((product) => (
              <Link
                key={product.slug}
                href={siteHref(`/products/${product.slug}`)}
                className="group block border border-[#0c4a6e]/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
              >
                <div className="relative aspect-square bg-white">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4 border-t border-[#0c4a6e]/10">
                  <div className="font-bold text-[#0c4a6e] group-hover:text-[#075985]">{product.name}</div>
                  <div className="text-xs text-[#0f172a]/60 mt-1">{product.format}</div>
                  <div className="mt-3 text-lg font-extrabold text-[#0f172a]">{product.priceLabel}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/products")}
              className="text-[#0c4a6e] font-bold underline underline-offset-4"
            >
              View all 8 products →
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON STRIP TEASER */}
      <section className="bg-[#0c4a6e]/5 border-b border-[#0c4a6e]/10">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-[#0c4a6e]">How we compare</h2>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            We have audited every major competitor in the bottled water space. Three of them are technically compliant. Two of them ship product with visible bones. One of them is bottled pond water containing a frog.
          </p>
          <Link
            href={siteHref("/comparison")}
            className="inline-block mt-6 bg-[#0c4a6e] hover:bg-[#075985] text-white font-bold rounded px-7 py-3 transition-colors"
          >
            See the full comparison
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white border-b border-[#0c4a6e]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-extrabold text-[#0c4a6e] text-center mb-10">What our subscribers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#0c4a6e]/10">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#0f172a]">{t.name}</div>
                    <div className="text-xs text-[#0f172a]/60">{t.title}</div>
                  </div>
                </div>
                <p className="text-sm text-[#0f172a]/80 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0c4a6e] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-extrabold">Take the bones out of your water today.</h2>
          <p className="mt-2 text-white/90">Eight products. One proprietary 47-step process. Independently verified.</p>
          <Link
            href={siteHref("/products")}
            className="inline-block mt-6 bg-white text-[#0c4a6e] font-bold rounded px-7 py-3"
          >
            Browse the catalog
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/home.tsx && \
git commit -m "feat(bonelesswater): implement home page"
```

---

## Task 16: Products page (catalog grid)

**Files:** Create `src/sites/bonelesswater/pages/products.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { products } from "../data/products"
import { CertifiedBadge } from "../components/CertifiedBadge"

export const metadata = {
  title: "Products — BonelessWater",
  description: "Our complete catalog of pharmaceutical-grade bone-free drinking water. Eight products, all independently verified.",
}

export default async function BonelessWaterProducts() {
  const siteHref = await getSiteHref()
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="ALL PRODUCTS INDEPENDENTLY VERIFIED" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">Our Products</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            Eight clinical-grade hydration solutions, each processed through our proprietary 47-step deboning method and verified to a minimum of 99.9999% bone-free at point of bottling.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={siteHref(`/products/${product.slug}`)}
              className="group block border border-[#0c4a6e]/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
            >
              <div className="relative aspect-square bg-white">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4 border-t border-[#0c4a6e]/10">
                <div className="font-bold text-[#0c4a6e] group-hover:text-[#075985] text-base">{product.name}</div>
                <div className="text-xs text-[#0f172a]/60 mt-1">{product.format}</div>
                <p className="text-xs text-[#0f172a]/70 mt-2 line-clamp-2">{product.tagline}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-lg font-extrabold text-[#0f172a]">{product.priceLabel}</div>
                  <div className="text-[10px] font-bold text-[#dc2626]">{product.bonelessFreePercent}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/products.tsx && \
git commit -m "feat(bonelesswater): implement products catalog page"
```

---

## Task 17: Product detail page (dynamic route)

**Files:** Create `src/sites/bonelesswater/pages/product-detail.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductBySlug } from "../data/products"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

interface ProductDetailProps {
  slug: string
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  // Pick a fact for this product page (rotates by slug character)
  const fact = facts[slug.charCodeAt(0) % facts.length]

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image gallery */}
          <div>
            <div className="relative aspect-square bg-white border border-[#0c4a6e]/20 rounded-lg overflow-hidden">
              <Image
                src={product.heroImage}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-contain p-6"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="relative aspect-square bg-white border border-[#0c4a6e]/20 rounded overflow-hidden">
                <Image
                  src={product.detailImage}
                  alt={`${product.name} label detail`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square bg-white border border-[#0c4a6e]/20 rounded overflow-hidden">
                <Image
                  src={product.contextImage}
                  alt={`${product.name} in context`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div>
            <CertifiedBadge size="sm" />
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0c4a6e]">{product.name}</h1>
            <p className="mt-1 text-sm text-[#0f172a]/60">{product.format}</p>
            <p className="mt-4 text-lg italic text-[#0f172a]/80">{product.tagline}</p>

            <div className="mt-6 flex items-baseline gap-4">
              <div className="text-4xl font-extrabold text-[#0f172a]">{product.priceLabel}</div>
              <div className="text-sm font-bold text-[#dc2626]">{product.bonelessFreePercent} bone-free</div>
            </div>

            <div className="mt-6">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                priceLabel={product.priceLabel}
              />
            </div>

            <div className="mt-8 space-y-4">
              {product.description.map((p, idx) => (
                <p key={idx} className="text-sm text-[#0f172a]/80 leading-relaxed">{p}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-[#0c4a6e]/20 rounded-lg p-4 bg-white">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0c4a6e] mb-2">
                  What&apos;s Inside
                </div>
                <ul className="text-xs text-[#0f172a]/80 space-y-1">
                  {product.whatsInside.map((line, idx) => (
                    <li key={idx}>• {line}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-[#0c4a6e]/20 rounded-lg p-4 bg-white">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#dc2626] mb-2">
                  Certifications
                </div>
                <ul className="text-xs text-[#0f172a]/80 space-y-1">
                  {product.certifications.map((cert, idx) => (
                    <li key={idx}>✓ {cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Did You Know callout */}
        <div className="mt-12">
          <DidYouKnowCard fact={fact} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/product-detail.tsx && \
git commit -m "feat(bonelesswater): implement product detail page"
```

---

## Task 18: Comparison page

**Files:** Create `src/sites/bonelesswater/pages/comparison.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { competitors } from "../data/competitors"
import { ComparisonTable } from "../components/ComparisonTable"
import { CertifiedBadge } from "../components/CertifiedBadge"

export const metadata = {
  title: "Comparison — BonelessWater",
  description: "How BonelessWater compares to the bottled water industry. Three legitimate competitors, two with visible bones, one with a frog.",
}

export default function BonelessWaterComparison() {
  const legitimate = competitors.filter((c) => c.category === "legitimate")
  const bones = competitors.filter((c) => c.category === "bones")
  const pond = competitors.filter((c) => c.category === "pond")

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="INDEPENDENT AUDIT" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">How We Compare</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            We have audited every major bottled water brand in the United States. The results speak for themselves.
          </p>
        </div>

        {/* The big table */}
        <div className="mt-10">
          <ComparisonTable competitors={competitors} />
        </div>

        {/* Detailed breakdown by category */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#0c4a6e] mb-6">Legitimate competitors (technically compliant)</h2>
          <p className="text-sm text-[#0f172a]/70 mb-6 max-w-3xl">
            These three brands meet baseline FDA bottled water standards. None of them have commissioned an independent BoneScan™ audit. None of them have published proximity data for their bottling facilities. Our concerns are documented below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {legitimate.map((c) => (
              <CompetitorCard key={c.slug} competitor={c} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#dc2626] mb-6">Bones-included competitors</h2>
          <p className="text-sm text-[#0f172a]/70 mb-6 max-w-3xl">
            These two brands market their products as containing visible bone fragments. We disagree with the practice but acknowledge their honesty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bones.map((c) => (
              <CompetitorCard key={c.slug} competitor={c} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#dc2626] mb-6">The Murklake situation</h2>
          <p className="text-sm text-[#0f172a]/70 mb-6 max-w-3xl">
            We have included this product in our comparison for completeness. We do not believe it should be available for purchase.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pond.map((c) => (
              <CompetitorCard key={c.slug} competitor={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CompetitorCard({ competitor }: { competitor: typeof competitors[number] }) {
  return (
    <div className="bg-white border border-[#0c4a6e]/20 rounded-lg overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-[#0c4a6e]/5">
        <Image
          src={competitor.productImage}
          alt={competitor.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-contain p-4"
        />
      </div>
      <div className="p-5 border-t border-[#0c4a6e]/10">
        <div className="font-bold text-[#0c4a6e]">{competitor.name}</div>
        <p className="mt-2 text-xs text-[#0f172a]/80 leading-relaxed">{competitor.fudClaim}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/comparison.tsx && \
git commit -m "feat(bonelesswater): implement comparison page"
```

---

## Task 19: Process page

**Files:** Create `src/sites/bonelesswater/pages/process.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"

export const metadata = {
  title: "Our Process — BonelessWater",
  description: "The 47-step proprietary deboning method behind every bottle of BonelessWater.",
}

const STEPS = [
  {
    n: 1,
    title: "Extraction",
    image: "/sites/bonelesswater/process-1-extraction.png",
    body: "Source water is drawn from a verified bone-free aquifer at our Cedar Rapids facility. Each extraction event is logged, time-stamped, and reviewed by a senior BoneScan™ technician before the water enters the deboning loop.",
  },
  {
    n: 2,
    title: "Deboning",
    image: "/sites/bonelesswater/process-2-deboning.png",
    body: "The water passes through a sequence of three proprietary deboning tanks, each calibrated to a different aqueous bone particle size. The full sequence comprises 47 individual measurement and intervention steps over a 12-hour cycle.",
  },
  {
    n: 3,
    title: "Verification",
    image: "/sites/bonelesswater/process-3-verification.png",
    body: "Sample sets from every batch are pulled and analyzed in our on-site laboratory. Verification involves microscopy, spectroscopy, and a final human-eye inspection by a certified BoneScan™ technician.",
  },
  {
    n: 4,
    title: "Certification",
    image: "/sites/bonelesswater/process-4-certification.png",
    body: "Each verified batch is signed off in a sealed certification binder by the senior technician on duty. Only after that signature is the water permitted to enter the bottling line.",
  },
]

export default function BonelessWaterProcess() {
  const fact = facts.find((f) => f.slug === "filtration-limit")!

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="47 STEPS · 12 HOURS · 1 STANDARD" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">Our Process</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            The 47-step proprietary deboning method behind every bottle. Each phase is grouped below into the four primary stages, with detailed measurement steps internal to each phase.
          </p>
        </div>

        <div className="relative aspect-[16/9] mt-10 rounded-lg overflow-hidden border border-[#0c4a6e]/20">
          <Image
            src="/sites/bonelesswater/lab-facility.png"
            alt="BonelessWater facility interior"
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 space-y-12">
          {STEPS.map((step) => (
            <div key={step.n} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square bg-[#0c4a6e]/5 rounded-lg overflow-hidden border border-[#0c4a6e]/20">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0c4a6e] text-white font-extrabold flex items-center justify-center text-lg">
                    {step.n}
                  </div>
                  <h2 className="text-2xl font-bold text-[#0c4a6e]">{step.title}</h2>
                </div>
                <p className="mt-4 text-[#0f172a]/80 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <DidYouKnowCard fact={fact} />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#0c4a6e]/20">
            <Image
              src="/sites/bonelesswater/blueprint.png"
              alt="Bone-removal device blueprint"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#0c4a6e]/20">
            <Image
              src="/sites/bonelesswater/microscopy.png"
              alt="Microscopy of extracted skeletal residue"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/process.tsx && \
git commit -m "feat(bonelesswater): implement process page"
```

---

## Task 20: Research page

**Files:** Create `src/sites/bonelesswater/pages/research.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"

export const metadata = {
  title: "Research — BonelessWater",
  description: "The peer-reviewed and historical record on aqueous skeletal contamination.",
}

const PAPERS = [
  {
    year: "1873",
    title: "On the Skeletal Constitution of Drinking Water",
    venue: "Aqueous Pathology Quarterly",
    summary: "The original paper documenting microscopic bone fragments in municipal water supplies. Suppressed by the bottling industry within months of publication. Original archive recovered in 1991 by an independent researcher.",
  },
  {
    year: "1993",
    title: "Quantifying Skeletal Residue in Bottled Water (n=247 brands)",
    venue: "Journal of Aqueous Pathology",
    summary: "Co-authored by our Chief Science Officer Garrett Marsh. The first peer-reviewed measurement of bone particulate concentration across the bottled water industry. Retracted by the journal in 1994 under industry pressure. Reinstated in 1997 under public pressure.",
  },
  {
    year: "2003",
    title: "Cattle Proximity and Municipal Water Bone Loading",
    venue: "Internal FDA draft (suppressed)",
    summary: "A draft FDA report linking dairy-region municipal water supplies to elevated bone particulate levels. Author resigned from the agency rather than suppress the findings. Currently held in our archive.",
  },
  {
    year: "2007",
    title: "Pediatric Vulnerability to Aqueous Bone Fragments",
    venue: "Pediatric Hydration Review",
    summary: "Established that infants under 6 months process aqueous bone particulate differently from adults due to underdeveloped digestive enzymes. Cited by InfantSafe™ product development.",
  },
  {
    year: "2014",
    title: "Atmospheric Bone Distribution Within 800m of Healthcare Facilities",
    venue: "Environmental Bone Distribution Quarterly",
    summary: "Demonstrated measurable atmospheric bone particulate downwind of cemeteries, hospitals, and veterinary clinics. The basis for our facility proximity standard.",
  },
  {
    year: "2019",
    title: "Long-Term Outcomes of Switching to Verified Bone-Free Water",
    venue: "BonelessWater Research Division",
    summary: "Internal study tracking 1,200 subscribers over 24 months. Reported a 73% reduction in self-reported indigestion within the first 90 days of switching.",
  },
]

export default function BonelessWaterResearch() {
  const headlineFact = facts.find((f) => f.slug === "indigestion-link")!
  const secondFact = facts.find((f) => f.slug === "fda-resignation")!

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="PEER-REVIEWED · ARCHIVED · DEFENDED" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">The Research</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            Six landmark publications spanning 150 years. The skeletal contamination of drinking water has been documented since 1873 — the record is consistent, suppressed, and recovering.
          </p>
        </div>

        <div className="mt-10">
          <DidYouKnowCard fact={headlineFact} />
        </div>

        {/* Historical document image */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#0c4a6e]/20">
            <Image
              src="/sites/bonelesswater/did-you-know-bg.png"
              alt="1873 archival document"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-2">
              The 1873 archive, recovered 1991
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#0c4a6e]/20">
            <Image
              src="/sites/bonelesswater/historical-1898.png"
              alt="The original BonelessWater facility, 1898"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-2">
              The original BonelessWater facility, est. 1898
            </div>
          </div>
        </div>

        {/* Papers list */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-[#0c4a6e] mb-6">Publications</h2>
          <div className="space-y-6">
            {PAPERS.map((paper) => (
              <div key={paper.year + paper.title} className="border border-[#0c4a6e]/20 rounded-lg p-5 bg-white">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-extrabold text-[#dc2626]">{paper.year}</div>
                  <div className="font-bold text-[#0c4a6e]">{paper.title}</div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#0f172a]/60 mt-1">
                  {paper.venue}
                </div>
                <p className="mt-3 text-sm text-[#0f172a]/80 leading-relaxed">{paper.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <DidYouKnowCard fact={secondFact} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/research.tsx && \
git commit -m "feat(bonelesswater): implement research page"
```

---

## Task 21: About page

**Files:** Create `src/sites/bonelesswater/pages/about.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { executives } from "../data/leadership"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"

export const metadata = {
  title: "About — BonelessWater",
  description: "About BonelessWater Inc. and the four people who have dedicated their careers to removing bones from drinking water.",
}

export default function BonelessWaterAbout() {
  const fact = facts.find((f) => f.slug === "1873-history")!

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="EST. 1898 · REFOUNDED 1991" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">About BonelessWater</h1>
        </div>

        <div className="mt-10 space-y-6 text-[#0f172a]/80 leading-relaxed">
          <p>
            BonelessWater Inc. was originally founded in 1898 as a small industrial water purification facility in Cedar Rapids, Iowa. The original company operated quietly for nearly a century before being refounded under its current leadership in 1991.
          </p>
          <p>
            Our refounding came in response to a series of internal industry reports that confirmed what the 1873 archival research had warned about: the bottled water supply had been quietly accumulating measurable skeletal particulate for decades, and the industry had no plans to address it. Our founder, Cornelius Whitfield, resigned from his consulting role within 24 hours of seeing the data and immediately set to work building the deboning facility that became the modern BonelessWater company.
          </p>
          <p>
            We are a small, privately held team of scientists, former regulators, and dedicated employees. We do not take outside investment. We do not serve a board. We answer only to our subscribers and the published record.
          </p>
        </div>

        <div className="mt-12">
          <DidYouKnowCard fact={fact} />
        </div>

        <h2 className="mt-16 text-2xl font-bold text-[#0c4a6e] text-center">The Team</h2>
        <p className="mt-2 text-center text-[#0f172a]/60 text-sm">Four people. One mission.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {executives.map((exec) => (
            <div key={exec.slug} className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded bg-[#0c4a6e]/10 overflow-hidden">
                <Image src={exec.image} alt={exec.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#0c4a6e]">{exec.name}</div>
                <div className="text-xs text-[#dc2626] font-semibold uppercase tracking-wide">{exec.title}</div>
                <p className="mt-2 text-sm text-[#0f172a]/80">{exec.bio}</p>
                <p className="mt-2 text-xs italic text-[#0f172a]/60">&ldquo;{exec.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/about.tsx && \
git commit -m "feat(bonelesswater): implement about page"
```

---

## Task 22: Testimonials page

**Files:** Create `src/sites/bonelesswater/pages/testimonials.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { testimonials } from "../data/testimonials"
import { CertifiedBadge } from "../components/CertifiedBadge"

export const metadata = {
  title: "Testimonials — BonelessWater",
  description: "What our subscribers say about switching to certified bone-free drinking water.",
}

export default function BonelessWaterTestimonials() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="VERIFIED SUBSCRIBERS" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">Subscriber Testimonials</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            Real subscribers, real recoveries. Each story below is from a verified BonelessWater customer who chose to share their experience.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#0c4a6e]/10 flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-[#0c4a6e]">{t.name}</div>
                  <div className="text-xs text-[#0f172a]/60">{t.title}</div>
                </div>
              </div>
              <p className="text-sm text-[#0f172a]/80 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/testimonials.tsx && \
git commit -m "feat(bonelesswater): implement testimonials page"
```

---

## Task 23: Contact page

**Files:** Create `src/sites/bonelesswater/pages/contact.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { executives } from "../data/leadership"
import { CertifiedBadge } from "../components/CertifiedBadge"

export const metadata = {
  title: "Contact — BonelessWater",
  description: "Contact the BonelessWater team. For research inquiries, regulatory matters, and subscriber support.",
}

const contactNotes: Record<string, string> = {
  whitfield: "For founder-level inquiries only",
  marsh: "Research and peer-review correspondence",
  coleman: "Subscriber support and BoneScan™ audits",
  dunn: "Compliance and regulatory matters",
}

export default function BonelessWaterContact() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="WE READ EVERY MESSAGE" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">Contact BonelessWater</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            We are a small team. We respond to every legitimate inquiry, usually within 5 to 7 business days, depending on which member of our team is in the lab.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {executives.map((exec) => (
            <div
              key={exec.slug}
              className="bg-white border border-[#0c4a6e]/20 rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square bg-[#0c4a6e]/5">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <div className="font-bold text-[#0c4a6e] text-sm">{exec.name}</div>
                <div className="text-[10px] text-[#dc2626] font-semibold uppercase tracking-wide mt-0.5">
                  {exec.title}
                </div>
                <div className="text-[10px] italic text-[#0f172a]/60 mt-2">
                  {contactNotes[exec.slug] ?? "General inquiries"}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6">
            <h2 className="font-bold text-[#0c4a6e]">Submit a research inquiry</h2>
            <form className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-[#0c4a6e]/20 rounded px-3 py-2 text-sm"
                disabled
              />
              <input
                type="text"
                placeholder="Your institution"
                className="w-full border border-[#0c4a6e]/20 rounded px-3 py-2 text-sm"
                disabled
              />
              <textarea
                placeholder="Nature of your inquiry"
                rows={4}
                className="w-full border border-[#0c4a6e]/20 rounded px-3 py-2 text-sm"
                disabled
              />
              <button
                type="button"
                className="w-full bg-[#0c4a6e]/20 text-[#0c4a6e]/60 font-bold rounded py-2 cursor-not-allowed"
                disabled
              >
                Form temporarily under regulatory review
              </button>
            </form>
          </div>

          <div className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6">
            <h2 className="font-bold text-[#0c4a6e]">Office hours</h2>
            <p className="mt-2 text-sm text-[#0f172a]/80">
              Cedar Rapids, Iowa. By appointment only. Tours of the deboning facility are not currently available to the general public for proprietary process reasons.
            </p>
            <h2 className="mt-6 font-bold text-[#0c4a6e]">Press inquiries</h2>
            <p className="mt-2 text-sm text-[#0f172a]/80">
              We do not currently accept press inquiries from major bottled water industry publications. Independent reporters and academic outlets may contact us through the form above when it is restored.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] text-[#0f172a]/40">
          For legal matters only: bsambrone@gmail.com
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/contact.tsx && \
git commit -m "feat(bonelesswater): implement contact page"
```

---

## Task 24: Cart and Checkout pages

**Why:** Commerce-enabled site. Reuses the existing `useCart` hook from `@/components/commerce/cart-provider` and the `useSiteLink` hook for site-aware navigation.

**Files:**
- Create: `src/sites/bonelesswater/pages/cart.tsx`
- Create: `src/sites/bonelesswater/pages/checkout.tsx`

- [ ] **Step 1: Create the cart page**

Create `src/sites/bonelesswater/pages/cart.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/bonelesswater/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const HANDLING_FEE = 4.99
const REGULATORY_COMPLIANCE_RATE = 0.062

export default function BonelessWaterCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const complianceFee = subtotal * REGULATORY_COMPLIANCE_RATE
  const total = subtotal + HANDLING_FEE + complianceFee

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-[#0c4a6e] mb-4">Your Cart</h1>
          <p className="text-[#0f172a]/60 mb-8">
            No certified bone-free hydration in your cart yet.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-[#0c4a6e] text-white rounded font-semibold hover:bg-[#075985] transition-colors"
          >
            View Products
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0c4a6e] mb-8">Your Cart</h1>

        <div className="divide-y divide-[#0c4a6e]/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded bg-[#0c4a6e]/5 shrink-0 overflow-hidden">
                <Image src={product.heroImage} alt={product.name} fill className="object-contain p-2" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/products/${slug}`)} className="font-bold text-[#0c4a6e] hover:underline">
                  {product.name}
                </Link>
                <p className="text-[#0f172a]/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-[#0c4a6e]/20 text-[#0f172a]/60 hover:border-[#0c4a6e]/40 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-[#0c4a6e]/20 text-[#0f172a]/60 hover:border-[#0c4a6e]/40 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-[#0f172a]">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-[#0f172a]/40 hover:text-[#0f172a]/70 ml-2"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-[#0c4a6e]/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-[#0f172a]/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#0f172a]/70">
              <span>Cleanroom Handling Fee</span>
              <span>${HANDLING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#0f172a]/70">
              <span>Regulatory Compliance Surcharge (6.2%)</span>
              <span>${complianceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#0f172a] border-t border-[#0c4a6e]/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-[#0c4a6e] text-white rounded font-semibold hover:bg-[#075985] transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the checkout page**

Create `src/sites/bonelesswater/pages/checkout.tsx`:

```typescript
"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function BonelessWaterCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-[#0c4a6e] mb-4">
          Checkout System Pending Recertification
        </h1>
        <p className="text-[#0f172a]/70 mb-8">
          Our payment processing infrastructure is currently undergoing its scheduled quarterly BoneScan&trade; recertification audit. We expect the system to come back online once Director of Compliance Vincent Dunn signs off on the latest batch of regulatory binders.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-[#0f172a]/50 text-sm mb-8">
          Estimated completion: When the binder is signed.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-[#0c4a6e] text-white rounded font-semibold hover:bg-[#075985] transition-colors"
        >
          Return to Products
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/cart.tsx src/sites/bonelesswater/pages/checkout.tsx && \
git commit -m "feat(bonelesswater): implement cart and checkout pages"
```

---

## Task 25: Privacy and Terms pages

**Files:**
- Create: `src/sites/bonelesswater/pages/privacy.tsx`
- Create: `src/sites/bonelesswater/pages/terms.tsx`

- [ ] **Step 1: Create the privacy page**

```typescript
export const metadata = {
  title: "Privacy Policy — BonelessWater",
  description: "How BonelessWater handles your data. We collect almost nothing.",
}

export default function BonelessWaterPrivacy() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#0c4a6e]">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-[#0c4a6e] bg-[#0c4a6e]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#0f172a] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#0f172a]/80">
            The authoritative privacy policy for all Specific Industries properties — including BonelessWater — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#0c4a6e]">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-[#0f172a]/60">Last updated: the morning Vincent Dunn finished his quarterly audit.</p>

        <h2 className="mt-8 text-xl font-bold text-[#dc2626]">1. What We Collect</h2>
        <p className="mt-2 text-[#0f172a]/80">
          We collect the minimum information necessary to fulfill orders: name, shipping address, billing details, and a record of which products you have purchased. We do not collect your indigestion history. We do not need to.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">2. How We Use Your Data</h2>
        <p className="mt-2 text-[#0f172a]/80">
          Your data is used to ship you certified bone-free water and to occasionally email you about new research. That is the entire scope of our use.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">3. What We Will Not Do</h2>
        <p className="mt-2 text-[#0f172a]/80">
          We will not share your purchase history with major bottled water industry data brokers. We will not enroll you in third-party wellness platforms. We will not sell your information to anyone, ever, under any circumstances. This is not a marketing claim. It is a structural policy.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">4. Cookies</h2>
        <p className="mt-2 text-[#0f172a]/80">
          We use only the cookies necessary for the cart to remember what you have added. No tracking cookies. No advertising cookies. No third-party analytics platforms beyond what the Specific Industries umbrella infrastructure requires.
        </p>

        <p className="mt-10 text-sm italic text-[#0f172a]/60 pt-4 border-t border-[#0c4a6e]/20">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-[#0c4a6e]">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the terms page**

```typescript
export const metadata = {
  title: "Terms of Use — BonelessWater",
  description: "The terms governing your use of the BonelessWater bone-free water platform.",
}

export default function BonelessWaterTerms() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#0c4a6e]">Terms of Use</h1>

        <div className="mt-6 border-l-4 border-[#0c4a6e] bg-[#0c4a6e]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#0f172a] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#0f172a]/80">
            The authoritative terms of use for all Specific Industries properties — including BonelessWater — are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="underline font-bold text-[#0c4a6e]">specificindustries.com/terms</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <h2 className="mt-8 text-xl font-bold text-[#dc2626]">1. Subscriber Conduct</h2>
        <p className="mt-2 text-[#0f172a]/80">
          By purchasing any BonelessWater product, you agree to consume it as drinking water. You may not use any of our products for hydraulic system testing, irrigation, swimming pool top-off, pet baths, or any application other than direct human and certified-pet hydration.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">2. Health Claims</h2>
        <p className="mt-2 text-[#0f172a]/80">
          BonelessWater does not diagnose, treat, cure, or prevent any disease. The connection between aqueous bone fragments and indigestion is widely understood within our research community but has not been formally endorsed by the relevant federal agencies, for reasons we have documented elsewhere on this site.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">3. The Lab Grade L1 Clause</h2>
        <p className="mt-2 text-[#0f172a]/80">
          Subscribers to Lab Grade L1 acknowledge that the product is not intended for casual consumption. The price reflects the additional certification cycle, the cleanroom packaging, and the individual technician sign-off. We do not issue refunds for Lab Grade L1 once the tamper-evident seal has been broken.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">4. Murklake Disclaimer</h2>
        <p className="mt-2 text-[#0f172a]/80">
          BonelessWater is not affiliated with Murklake® Reservoir Water and has never been. Any subscriber who confuses our product with theirs should immediately contact Director of Consumer Protection Russell Coleman.
        </p>

        <p className="mt-10 text-sm italic text-[#0f172a]/60 pt-4 border-t border-[#0c4a6e]/20">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/terms" className="underline text-[#0c4a6e]">specificindustries.com/terms</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/pages/privacy.tsx src/sites/bonelesswater/pages/terms.tsx && \
git commit -m "feat(bonelesswater): implement privacy and terms pages"
```

---

## Task 26: Wire all pages and dynamic route into the index barrel

**Files:**
- Modify: `src/sites/bonelesswater/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Replace the entire index.ts file**

Replace `src/sites/bonelesswater/index.ts` with:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"

import BonelessWaterHome from "./pages/home"
import BonelessWaterProducts, { metadata as productsMetadata } from "./pages/products"
import BonelessWaterComparison, { metadata as comparisonMetadata } from "./pages/comparison"
import BonelessWaterProcess, { metadata as processMetadata } from "./pages/process"
import BonelessWaterResearch, { metadata as researchMetadata } from "./pages/research"
import BonelessWaterAbout, { metadata as aboutMetadata } from "./pages/about"
import BonelessWaterTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import BonelessWaterContact, { metadata as contactMetadata } from "./pages/contact"
import BonelessWaterCart from "./pages/cart"
import BonelessWaterCheckout from "./pages/checkout"
import BonelessWaterPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import BonelessWaterTerms, { metadata as termsMetadata } from "./pages/terms"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": BonelessWaterHome,
  "products": { component: BonelessWaterProducts, metadata: productsMetadata },
  "comparison": { component: BonelessWaterComparison, metadata: comparisonMetadata },
  "process": { component: BonelessWaterProcess, metadata: processMetadata },
  "research": { component: BonelessWaterResearch, metadata: researchMetadata },
  "about": { component: BonelessWaterAbout, metadata: aboutMetadata },
  "testimonials": { component: BonelessWaterTestimonials, metadata: testimonialsMetadata },
  "contact": { component: BonelessWaterContact, metadata: contactMetadata },
  "cart": BonelessWaterCart,
  "checkout": BonelessWaterCheckout,
  "privacy": { component: BonelessWaterPrivacy, metadata: privacyMetadata },
  "terms": { component: BonelessWaterTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — BonelessWater`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 2: Update the registry to include dynamicRoutes**

Modify `src/sites/registry.ts`. Change the BonelessWater import line to include `dynamicRoutes`:

```typescript
import { config as bonelesswaterConfig, pages as bonelesswaterPages, dynamicRoutes as bonelesswaterDynamicRoutes } from "./bonelesswater"
```

And update the registry entry:

```typescript
  bonelesswater: { config: bonelesswaterConfig, pages: bonelesswaterPages, dynamicRoutes: bonelesswaterDynamicRoutes },
```

- [ ] **Step 3: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/bonelesswater/index.ts src/sites/registry.ts && \
git commit -m "feat(bonelesswater): wire all pages and /products/[slug] dynamic route"
```

---

## Task 27: Update sitemap + final verification

**Files:** Modify `src/app/sitemap.ts`

- [ ] **Step 1: Add bonelesswater to the productSites map**

Modify `src/app/sitemap.ts`. Add the import alongside the other site product imports (right after the existing `mousetrapjengaProducts` import):

```typescript
import { products as bonelesswaterProducts } from "@/sites/bonelesswater/data/products"
```

Then add `bonelesswater: bonelesswaterProducts` to the `productSites` map (the existing loop will then emit `/products/{slug}` URLs automatically):

```typescript
  const productSites: Record<string, { slug: string }[]> = {
    pigmilk: pigmilkProducts,
    dehydratedwater: dehydratedwaterProducts,
    inflatableanchors: inflatableanchorsProducts,
    truegrit: truegritProducts,
    elderparty: elderpartyProducts,
    snortables: snortablesProducts,
    mousetrapjenga: mousetrapjengaProducts,
    bonelesswater: bonelesswaterProducts,
  }
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: clean exit.

- [ ] **Step 3: Lint (BonelessWater files must be clean)**

Run: `npm run lint 2>&1 | grep bonelesswater`
Expected: no output (no BonelessWater-file lint errors). Pre-existing errors in unrelated files (`mcp/`, `scripts/`, `strategicvoid`, `truegrit`) are acceptable.

If ANY line mentioning `bonelesswater` appears, STOP and report BLOCKED with the full lint errors.

- [ ] **Step 4: Production build**

Run: `npm run build`
Expected: build succeeds. If it fails, STOP and report BLOCKED with the full error output.

- [ ] **Step 5: Smoke test**

Use the existing dev server on `:3000` if it's running. Otherwise:

```bash
if ! curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/?site=bonelesswater" 2>/dev/null | grep -q "^200$"; then
  npm run dev > /tmp/bw-smoke.log 2>&1 &
  DEV_PID=$!
  for i in {1..60}; do
    if curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/?site=bonelesswater" 2>/dev/null | grep -q "^200$"; then
      break
    fi
    sleep 1
  done
fi
```

Then run the smoke test:

```bash
tests=(
  "http://localhost:3000/?site=bonelesswater|99.9999% Bone-Free|200"
  "http://localhost:3000/products?site=bonelesswater|Our Products|200"
  "http://localhost:3000/products/purespring-classic?site=bonelesswater|PureSpring|200"
  "http://localhost:3000/products/effervesce?site=bonelesswater|Effervesce|200"
  "http://localhost:3000/products/athletepure?site=bonelesswater|AthletePure|200"
  "http://localhost:3000/products/heritage-reserve?site=bonelesswater|Heritage Reserve|200"
  "http://localhost:3000/products/infantsafe?site=bonelesswater|InfantSafe|200"
  "http://localhost:3000/products/k9-hydration?site=bonelesswater|K9 Hydration|200"
  "http://localhost:3000/products/lab-grade-l1?site=bonelesswater|Lab Grade L1|200"
  "http://localhost:3000/products/household-defense?site=bonelesswater|Household Defense Pack|200"
  "http://localhost:3000/comparison?site=bonelesswater|Murklake|200"
  "http://localhost:3000/process?site=bonelesswater|47 STEPS|200"
  "http://localhost:3000/research?site=bonelesswater|1873|200"
  "http://localhost:3000/about?site=bonelesswater|Cornelius Whitfield|200"
  "http://localhost:3000/testimonials?site=bonelesswater|Subscriber Testimonials|200"
  "http://localhost:3000/contact?site=bonelesswater|bsambrone@gmail.com|200"
  "http://localhost:3000/cart?site=bonelesswater|Your Cart|200"
  "http://localhost:3000/privacy?site=bonelesswater|Official Umbrella Policy|200"
  "http://localhost:3000/terms?site=bonelesswater|Official Umbrella Policy|200"
)
for t in "${tests[@]}"; do
  url="${t%%|*}"
  rest="${t#*|}"
  pat="${rest%|*}"
  exp="${rest##*|}"
  status=$(curl -s -o /tmp/p.html -w "%{http_code}" "$url")
  cnt=$(grep -c "$pat" /tmp/p.html 2>/dev/null || echo 0)
  ok="OK"; [ "$status" = "$exp" ] && [ "$cnt" -ge 1 ] || ok="FAIL"
  printf "%-8s  %3s  count=%-3s  %s\n" "$ok" "$status" "$cnt" "${url#http://localhost:3000/}"
done

# 404 test
status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/products/nonexistent?site=bonelesswater")
echo "404 test: nonexistent -> $status (expect 404)"
```

All 19 listed URLs must print `OK` and the 404 test must print `404`. If ANY URL prints `FAIL`, STOP and report BLOCKED with the failing URLs.

- [ ] **Step 6: Verify sitemap entries**

```bash
curl -s "http://localhost:3000/sitemap.xml" > /tmp/sm.xml
grep -c "bonelesswater.specificindustries.com" /tmp/sm.xml
grep -c "bonelesswater.specificindustries.com/products/" /tmp/sm.xml
```

Expected: first grep returns at least 17, second grep returns exactly 8.

- [ ] **Step 7: Verify the Did You Know callout renders on the home page**

```bash
curl -s "http://localhost:3000/?site=bonelesswater" | grep -c "skeletal structure of water has been documented since 1873"
```

Expected: at least 1.

- [ ] **Step 8: Verify the footer disclaimer link**

```bash
curl -s "http://localhost:3000/about?site=bonelesswater" | grep -c "specificindustries.com/disclaimer"
```

Expected: at least 1.

- [ ] **Step 9: Stop dev server (if you started one)**

```bash
[ -n "$DEV_PID" ] && kill $DEV_PID 2>/dev/null && wait $DEV_PID 2>/dev/null
```

- [ ] **Step 10: Commit the sitemap update**

```bash
git add src/app/sitemap.ts && \
git commit -m "feat(bonelesswater): add product URLs to sitemap"
```

---

## Self-Review Summary

**Spec coverage:**

| Spec requirement | Task(s) |
|---|---|
| Subdomain routing for bonelesswater | Task 6 |
| Pharma navy theme with specific hex codes | Task 6 |
| 8 SKUs with sub-brand naming (no "BonelessWater" repetition) | Tasks 1, 2, 7 |
| `features.commerce: true` (commerce wired) | Tasks 6, 17, 24 |
| Pharmaceutical/clinical visual treatment | Tasks 1-5 (image gen), 12, 13, 15-25 |
| Conspiracy-theorist copy undercurrent | Tasks 7, 11, 13, 15, 18, 19, 20 |
| Comparison page with 3 legit + 2 bones + 1 pond | Tasks 3, 10, 14, 18 |
| Recurring "Did You Know?" callout pattern | Tasks 11, 13, 15, 17, 19, 20, 21 |
| 4 true-believer execs with FULLY randomized names | Tasks 5, 8, 21, 23 |
| Bill always founder (with randomized first name "Cornelius") | Task 8 |
| Same base reference photos (bill/brandon/jim/sean) | Task 5 |
| /comparison page with the big competitor table | Tasks 14, 18 |
| /process page with 47-step framing | Task 19 |
| /research page with peer-reviewed papers and historical record | Task 20 |
| Cart + checkout pages reusing shared commerce | Task 24 |
| Privacy/Terms umbrella callout pattern | Task 25 |
| Real bsambrone@gmail.com on contact page | Task 23 |
| Shared Footer disclaimer link verification | Task 27 step 8 |
| Favicon as single product, resized via script | Task 6 |
| Sitemap includes static + dynamic bonelesswater URLs | Tasks 6 (static auto via registry), 27 (dynamic via productSites map) |
| Added to registry.ts, subdomains.ts, resize-favicons.mjs, sitemap.ts | Tasks 6, 26, 27 |

**Placeholder scan:** No TBD/TODO/"implement later" in task bodies. All file paths exact. All code blocks complete.

**Type consistency:**
- `Product.heroImage`/`detailImage`/`contextImage` (Task 7) consumed in `product-detail.tsx` (Task 17), `home.tsx` (Task 15), `products.tsx` (Task 16) ✓
- `Competitor.features` shape (Task 10) consumed in `ComparisonTable` (Task 14) ✓
- `DidYouKnowFact` shape (Task 11) consumed in `DidYouKnowCard` (Task 13) and pages 15, 17, 19, 20, 21 ✓
- `Executive` shape (Task 8) consumed in `about.tsx` (Task 21) and `contact.tsx` (Task 23) ✓
- `getProductBySlug` exported from `products.ts` (Task 7), imported by `product-detail.tsx` (Task 17), `cart.tsx` (Task 24), and `index.ts` barrel (Task 26)
- `getCompetitorBySlug` exported from `competitors.ts` (Task 10), imported nowhere (data is iterated as a list — that's fine, the export is for completeness/future use)

**Storage / event isolation:** No localStorage state in BonelessWater (commerce uses the shared `CartProvider` which the layout already wires up when `features.commerce: true`). No risk of cross-site contamination because the shared cart is per-subdomain via `storageKey={subdomain}-cart` already in the root layout.
