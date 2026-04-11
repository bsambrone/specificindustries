# OnlyFans (Literal Fans) Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new satirical subdomain `onlyfans.specificindustries.com` that takes OnlyFans 100% literally — subscribers pay to watch literal fans (the appliance) blow air. 8 fan "creators," fake subscribe + tip flow, locked content grids that visibly unlock when the user subscribes.

**Architecture:** Next.js 15 App Router site under `src/sites/onlyfans/`, registered through the existing catch-all routing pattern. **No commerce wiring** (`features.commerce: false`) — Subscribe and Tip are self-contained client components backed by `localStorage` and `window` events. All fan images are generated via the `mcp/image-gen/` MCP using base-image variations to keep each fan visually consistent.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Inter (already in `fontFamilyMap`), `mcp__image-gen__generate_image` (text-to-image) and `mcp__image-gen__generate_image_with_person` (img-to-img via reference photos).

**Reference spec:** `docs/superpowers/specs/2026-04-10-onlyfans-site-design.md`

**No unit test framework exists in this repo.** Verification is `npx tsc --noEmit`, `npm run lint`, and `npm run build`. Page-level verification is visual smoke via `npm run dev` + `?site=onlyfans`. Each code task ends with a type-check + commit.

---

## File Map

### New files

```
docs/superpowers/plans/2026-04-10-onlyfans-implementation.md     # this file
src/sites/onlyfans/config.ts                                     # site config (cyan theme)
src/sites/onlyfans/index.ts                                      # barrel: config, pages, dynamicRoutes
src/sites/onlyfans/data/fans.ts                                  # 8 Fan creators
src/sites/onlyfans/data/leadership.ts                            # 4 ashamed execs (random names)
src/sites/onlyfans/data/testimonials.ts                          # 8 fan-themed testimonials
src/sites/onlyfans/components/Toast.tsx                          # window-event-driven toast container
src/sites/onlyfans/components/SubscribeButton.tsx                # client, writes localStorage
src/sites/onlyfans/components/TipButton.tsx                      # client, fires toast event
src/sites/onlyfans/components/LockedThumbnail.tsx                # client, blurs/unlocks
src/sites/onlyfans/components/FanCard.tsx                        # browse-page card
src/sites/onlyfans/pages/home.tsx
src/sites/onlyfans/pages/browse.tsx                              # nav label "Meet the Fans"
src/sites/onlyfans/pages/fan-detail.tsx                          # dynamic route /browse/[slug]
src/sites/onlyfans/pages/how-it-works.tsx
src/sites/onlyfans/pages/about.tsx
src/sites/onlyfans/pages/testimonials.tsx
src/sites/onlyfans/pages/contact.tsx
src/sites/onlyfans/pages/privacy.tsx
src/sites/onlyfans/pages/terms.tsx
mcp/image-gen/base-images/{slug}/base.png × 8                    # staged base references
public/sites/onlyfans/*.png                                      # ~79 generated files (see Image Generation Strategy)
```

### Modified files

```
src/sites/registry.ts          # add onlyfans
src/sites/subdomains.ts        # add "onlyfans" to VALID_SUBDOMAINS
```

---

## Image Generation Strategy

Each fan gets a **canonical base image** generated once via `mcp__image-gen__generate_image`. The base is then staged into `mcp/image-gen/base-images/{fan-slug}/base.png`, which makes it visible to `mcp__image-gen__generate_image_with_person` under `person="{fan-slug}"`. Subsequent images for that fan (cover, avatar, 6 posts) call `generate_image_with_person` so the fan looks consistent across all renders.

**MCP outputs land in `mcp/image-gen/generated-images/`.** Each task moves the finished images into `public/sites/onlyfans/` with `git mv` after generation.

**Per-fan filename convention:**
- Base reference: `{slug}-base.png` (1024×1024) → also copied to `mcp/image-gen/base-images/{slug}/base.png`
- Cover banner: `fan-{slug}-cover.png` (1536×1024)
- Profile avatar: `fan-{slug}-avatar.png` (1024×1024)
- Post grid: `fan-{slug}-post-01.png` through `fan-{slug}-post-06.png` (1024×1024)

**Fan slugs (locked here, used by all subsequent tasks):**

| # | Slug | Display Name | Type |
|---|---|---|---|
| 1 | `brenda` | Brenda | Box Fan |
| 2 | `vance` | Big Vance | Industrial Wind Tunnel |
| 3 | `oscillata` | Mistress Oscillata | Tower Fan |
| 4 | `reginald` | Sir Reginald Plumebottom III | Ceiling Fan |
| 5 | `aerovolt` | AeroVolt 9000™ | Bladeless Tower |
| 6 | `lil-buzz` | Lil' Buzz | USB Desk Fan |
| 7 | `ghost` | The Ghost in the Attic | Whole-House Attic Fan |
| 8 | `whirrcore` | WhirrCore_42 | PC Case Fan |

**Exec name slugs (locked here):** `hatcher` (Bill, Founder), `wexley` (Brandon), `castellan` (Jim), `morrow` (Sean). Names are deliberately generic and unrelated to the HVAC theme.

---

## Task 1: Generate Brenda's image set (Box Fan)

**Why first:** Brenda is the simplest fan to validate the whole MCP-driven generation pipeline (text-to-image base → stage as reference → 8 img-to-img variations → move to public). If anything is wrong with the workflow, we catch it on one fan instead of eight.

**Files:**
- Create: `mcp/image-gen/base-images/brenda/base.png`
- Create: `public/sites/onlyfans/brenda-base.png`
- Create: `public/sites/onlyfans/fan-brenda-cover.png`
- Create: `public/sites/onlyfans/fan-brenda-avatar.png`
- Create: `public/sites/onlyfans/fan-brenda-post-01.png` through `-post-06.png`

- [ ] **Step 1: Generate Brenda's base reference**

Call `mcp__image-gen__generate_image` with these arguments:

- `prompt`: `"Documentary-style photograph of a well-loved cream-colored 1957 Lasko box fan with three round speed dials and chrome trim, sitting in a sunlit Tulsa kitchen window. Honey-colored morning light, slightly faded white windowsill, lace curtain blowing gently to one side. Shot at eye level on a 50mm lens, shallow depth of field. Photorealistic, no people, no text, single subject centered in frame. Wholesome, nostalgic, slightly worn but loved."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `brenda-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base into the MCP reference folder**

```bash
mkdir -p mcp/image-gen/base-images/brenda && \
cp mcp/image-gen/generated-images/brenda-base.png mcp/image-gen/base-images/brenda/base.png
```

- [ ] **Step 3: Generate Brenda's cover banner**

Call `mcp__image-gen__generate_image_with_person`:

- `prompt`: `"Wide cinematic banner shot of the same cream-colored 1957 Lasko box fan from the reference photo, now centered in a wider Tulsa kitchen window framed by white wood. Morning sunlight streams across linoleum, distant view of a quiet residential street with maple trees outside. Same fan, same era, identical model. Wholesome, slightly faded, photorealistic, no people, no text."`
- `width`: `1536`
- `height`: `1024`
- `filename`: `fan-brenda-cover.png`
- `person`: `brenda`
- `quality`: `high`

- [ ] **Step 4: Generate Brenda's profile avatar**

Call `mcp__image-gen__generate_image_with_person`:

- `prompt`: `"Tight square portrait of the same cream-colored 1957 Lasko box fan from the reference, framed face-on so the chrome grille fills the frame. Soft golden window light, gentle bokeh background, shot like a flattering profile photo. Same fan, identical model. Photorealistic, no people, no text."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `fan-brenda-avatar.png`
- `person`: `brenda`
- `quality`: `high`

- [ ] **Step 5: Generate Brenda's 6 post images**

Call `mcp__image-gen__generate_image_with_person` six times. For each call use `width: 1024`, `height: 1024`, `person: "brenda"`, `quality: "high"`, and the filename + prompt below.

Post 01 — `fan-brenda-post-01.png`:
> `"The same cream-colored 1957 Lasko box fan from the reference, photographed at low speed setting on a quiet Tulsa morning. Sunlight slanting through the window, dust motes catching the light. Three-quarter angle. Photorealistic, no people, no text."`

Post 02 — `fan-brenda-post-02.png`:
> `"The same cream-colored 1957 Lasko box fan from the reference, photographed at medium speed setting in early afternoon kitchen light. The lace curtain visibly pushed back, slightly more motion blur on the curtain edge. Front-on framing. Photorealistic, no people, no text."`

Post 03 — `fan-brenda-post-03.png`:
> `"The same 1957 Lasko box fan from the reference, photographed at high speed setting at golden hour. Curtain dramatically pushed sideways, warm orange light, slight motion blur on the blades. Slight low angle. Photorealistic, no people, no text."`

Post 04 — `fan-brenda-post-04.png`:
> `"The same 1957 Lasko box fan from the reference, photographed from above looking straight down at the chrome grille. Soft kitchen light, the speed dial in sharp focus. Photorealistic, no people, no text."`

Post 05 — `fan-brenda-post-05.png`:
> `"The same 1957 Lasko box fan from the reference, photographed in profile from the side showing the slim depth of the housing. Window-light side lighting, clean white wall background. Photorealistic, no people, no text."`

Post 06 — `fan-brenda-post-06.png`:
> `"The same 1957 Lasko box fan from the reference, photographed at dusk with the kitchen light just turned on overhead. Warm interior glow on the cream housing, deeper blue tone outside the window. Photorealistic, no people, no text."`

- [ ] **Step 6: Move all 9 generated files to public/sites/onlyfans/**

```bash
mkdir -p public/sites/onlyfans && \
mv mcp/image-gen/generated-images/brenda-base.png \
   mcp/image-gen/generated-images/fan-brenda-cover.png \
   mcp/image-gen/generated-images/fan-brenda-avatar.png \
   mcp/image-gen/generated-images/fan-brenda-post-01.png \
   mcp/image-gen/generated-images/fan-brenda-post-02.png \
   mcp/image-gen/generated-images/fan-brenda-post-03.png \
   mcp/image-gen/generated-images/fan-brenda-post-04.png \
   mcp/image-gen/generated-images/fan-brenda-post-05.png \
   mcp/image-gen/generated-images/fan-brenda-post-06.png \
   public/sites/onlyfans/
```

- [ ] **Step 7: Verify files are in place**

Run: `ls public/sites/onlyfans/ | grep -c brenda`
Expected output: `9`

- [ ] **Step 8: Commit**

```bash
git add public/sites/onlyfans/brenda-base.png \
        public/sites/onlyfans/fan-brenda-cover.png \
        public/sites/onlyfans/fan-brenda-avatar.png \
        public/sites/onlyfans/fan-brenda-post-*.png \
        mcp/image-gen/base-images/brenda/base.png && \
git commit -m "feat(onlyfans): generate Brenda image set (Box Fan)"
```

---

## Task 2: Generate Big Vance's image set (Industrial Wind Tunnel)

**Files:** `mcp/image-gen/base-images/vance/base.png`, plus 9 files under `public/sites/onlyfans/` matching the `vance-base.png` / `fan-vance-*.png` pattern.

- [ ] **Step 1: Generate Vance's base reference**

Call `mcp__image-gen__generate_image`:

- `prompt`: `"Industrial documentary photograph of a massive 80,000 CFM yellow-and-black industrial wind tunnel fan in a Carson City Nevada warehouse. Steel cage guard, OSHA warning labels, three-blade propeller-style design, six feet in diameter, mounted on a heavy steel frame. Concrete floor, exposed bulb lighting, slightly imposing. No people, no text other than warning labels, photorealistic, single subject centered."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `vance-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base into the MCP reference folder**

```bash
mkdir -p mcp/image-gen/base-images/vance && \
cp mcp/image-gen/generated-images/vance-base.png mcp/image-gen/base-images/vance/base.png
```

- [ ] **Step 3: Generate cover banner**

Call `mcp__image-gen__generate_image_with_person` with `width: 1536`, `height: 1024`, `person: "vance"`, `quality: "high"`, `filename: "fan-vance-cover.png"`:

> `"Wide cinematic banner of the same 80,000 CFM yellow-and-black industrial wind tunnel fan from the reference, in a vast Nevada warehouse with high steel ceilings. Dramatic side lighting, dust motes in the air, wide framing showing the scale of the unit. Same fan, identical model. Photorealistic, no people, no text other than the warning labels visible on the cage."`

- [ ] **Step 4: Generate profile avatar**

Call `mcp__image-gen__generate_image_with_person` with `width: 1024`, `height: 1024`, `person: "vance"`, `quality: "high"`, `filename: "fan-vance-avatar.png"`:

> `"Tight square head-on portrait of the same massive industrial wind tunnel fan from the reference. The steel cage and three-blade propeller fill the frame, photographed dead-on. Strong rim light from the side, deep shadows. Same fan, identical model. Photorealistic, no people."`

- [ ] **Step 5: Generate 6 post images**

Call `mcp__image-gen__generate_image_with_person` six times. Use `width: 1024`, `height: 1024`, `person: "vance"`, `quality: "high"` for each.

Post 01 — `fan-vance-post-01.png`:
> `"The same 80,000 CFM industrial wind tunnel fan from the reference, photographed three-quarter angle on the warehouse floor with the blades motion-blurred at full speed. Concrete floor, dramatic shadow. Photorealistic, no people, no text other than warning labels."`

Post 02 — `fan-vance-post-02.png`:
> `"The same industrial wind tunnel fan from the reference, low angle looking up at the steel cage and three-blade propeller. Backlit by overhead warehouse fluorescents, imposing silhouette. Photorealistic, no people."`

Post 03 — `fan-vance-post-03.png`:
> `"The same industrial wind tunnel fan from the reference, photographed in a Nevada loading dock at golden hour with the bay door open behind it. Warm orange light spilling across the steel frame. Photorealistic, no people."`

Post 04 — `fan-vance-post-04.png`:
> `"The same industrial wind tunnel fan from the reference, side profile shot showing the heavy steel frame and depth of the housing. Industrial workshop background slightly out of focus. Photorealistic, no people."`

Post 05 — `fan-vance-post-05.png`:
> `"The same industrial wind tunnel fan from the reference, close-up of the OSHA warning labels and safety stickers on the steel cage. Hard side light, every label legible but no readable English text invented. Photorealistic, no people."`

Post 06 — `fan-vance-post-06.png`:
> `"The same industrial wind tunnel fan from the reference, photographed outdoors at dusk in a gravel lot beside a corrugated metal shed. Long shadows, deep blue sky, slightly menacing. Photorealistic, no people."`

- [ ] **Step 6: Move generated files to public/sites/onlyfans/**

```bash
mv mcp/image-gen/generated-images/vance-base.png \
   mcp/image-gen/generated-images/fan-vance-cover.png \
   mcp/image-gen/generated-images/fan-vance-avatar.png \
   mcp/image-gen/generated-images/fan-vance-post-01.png \
   mcp/image-gen/generated-images/fan-vance-post-02.png \
   mcp/image-gen/generated-images/fan-vance-post-03.png \
   mcp/image-gen/generated-images/fan-vance-post-04.png \
   mcp/image-gen/generated-images/fan-vance-post-05.png \
   mcp/image-gen/generated-images/fan-vance-post-06.png \
   public/sites/onlyfans/
```

- [ ] **Step 7: Verify and commit**

```bash
ls public/sites/onlyfans/ | grep -c vance   # expect 9
git add public/sites/onlyfans/vance-base.png \
        public/sites/onlyfans/fan-vance-*.png \
        mcp/image-gen/base-images/vance/base.png && \
git commit -m "feat(onlyfans): generate Big Vance image set (Industrial Wind Tunnel)"
```

---

## Task 3: Generate Mistress Oscillata's image set (Tower Fan)

**Files:** `mcp/image-gen/base-images/oscillata/base.png` plus 9 `*oscillata*.png` files under `public/sites/onlyfans/`.

- [ ] **Step 1: Generate Oscillata's base reference**

Call `mcp__image-gen__generate_image`:

- `prompt`: `"Editorial product photograph of a sleek matte-black designer tower fan, four feet tall, slim cylindrical body with a brushed steel base and a single touch-control panel near the top. Sitting on polished concrete in a minimalist Manhattan loft with floor-to-ceiling windows and one black leather chair in the deep background. Cool dramatic side lighting, almost gallery-like. Single subject centered. Photorealistic, no people, no text."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `oscillata-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base**

```bash
mkdir -p mcp/image-gen/base-images/oscillata && \
cp mcp/image-gen/generated-images/oscillata-base.png mcp/image-gen/base-images/oscillata/base.png
```

- [ ] **Step 3: Generate cover banner**

`generate_image_with_person`, `1536x1024`, `person: "oscillata"`, `filename: "fan-oscillata-cover.png"`:

> `"Wide editorial banner of the same matte-black designer tower fan from the reference in the same Manhattan loft, framed wider to show the floor-to-ceiling windows and city skyline beyond. High-end fashion-magazine aesthetic, cool color grade, deep blacks. Same fan, identical model. Photorealistic, no people, no text."`

- [ ] **Step 4: Generate profile avatar**

`generate_image_with_person`, `1024x1024`, `person: "oscillata"`, `filename: "fan-oscillata-avatar.png"`:

> `"Tight square portrait of the upper third of the same matte-black designer tower fan from the reference, focused on the single touch-control panel. Soft top-down rim light, gallery-style, almost like a luxury watch ad. Same fan, identical model. Photorealistic, no people."`

- [ ] **Step 5: Generate 6 post images**

`generate_image_with_person`, `1024x1024`, `person: "oscillata"` for each.

Post 01 — `fan-oscillata-post-01.png`:
> `"The same matte-black tower fan from the reference, photographed in profile against a stark white concrete wall. Severe shadow, minimal composition, almost architectural. Photorealistic, no people, no text."`

Post 02 — `fan-oscillata-post-02.png`:
> `"The same tower fan from the reference, photographed in the Manhattan loft at twilight with the city lights visible through the window. Cool blue ambient with one warm accent light. Photorealistic, no people, no text."`

Post 03 — `fan-oscillata-post-03.png`:
> `"The same tower fan from the reference, three-quarter view on a polished black marble surface with a single white orchid in a black vase nearby. Editorial product styling, cool light. Photorealistic, no people, no text."`

Post 04 — `fan-oscillata-post-04.png`:
> `"The same tower fan from the reference, close-up of the brushed steel base on polished concrete. Hard rim light, almost industrial product photography. Photorealistic, no people."`

Post 05 — `fan-oscillata-post-05.png`:
> `"The same tower fan from the reference, photographed against a deep charcoal velvet backdrop in a studio. Single key light from the upper left. Photorealistic, no people, no text."`

Post 06 — `fan-oscillata-post-06.png`:
> `"The same tower fan from the reference, in the Manhattan loft photographed at sunrise with the first warm light hitting the matte black housing. Soft golden glow on one edge, deep shadow on the other. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv mcp/image-gen/generated-images/oscillata-base.png \
   mcp/image-gen/generated-images/fan-oscillata-cover.png \
   mcp/image-gen/generated-images/fan-oscillata-avatar.png \
   mcp/image-gen/generated-images/fan-oscillata-post-01.png \
   mcp/image-gen/generated-images/fan-oscillata-post-02.png \
   mcp/image-gen/generated-images/fan-oscillata-post-03.png \
   mcp/image-gen/generated-images/fan-oscillata-post-04.png \
   mcp/image-gen/generated-images/fan-oscillata-post-05.png \
   mcp/image-gen/generated-images/fan-oscillata-post-06.png \
   public/sites/onlyfans/

ls public/sites/onlyfans/ | grep -c oscillata   # expect 9
git add public/sites/onlyfans/oscillata-base.png \
        public/sites/onlyfans/fan-oscillata-*.png \
        mcp/image-gen/base-images/oscillata/base.png && \
git commit -m "feat(onlyfans): generate Mistress Oscillata image set (Tower Fan)"
```

---

## Task 4: Generate Sir Reginald Plumebottom III's image set (Ceiling Fan)

**Files:** `mcp/image-gen/base-images/reginald/base.png` plus 9 `*reginald*.png` files under `public/sites/onlyfans/`.

- [ ] **Step 1: Generate Reginald's base reference**

Call `mcp__image-gen__generate_image`:

- `prompt`: `"Photograph of an elegant 1970s Charleston-style ceiling fan with five wide oak blades, an antique brass downrod, and a small frosted-glass light kit. Mounted to a high white-painted bead-board ceiling on a wide southern porch. Looking straight up at the fan from below. Soft afternoon porch light, slightly faded paint, dignified. Photorealistic, no people, no text."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `reginald-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base**

```bash
mkdir -p mcp/image-gen/base-images/reginald && \
cp mcp/image-gen/generated-images/reginald-base.png mcp/image-gen/base-images/reginald/base.png
```

- [ ] **Step 3: Generate cover banner**

`generate_image_with_person`, `1536x1024`, `person: "reginald"`, `filename: "fan-reginald-cover.png"`:

> `"Wide cinematic banner of the same 1970s Charleston ceiling fan from the reference, photographed from a lower porch angle showing both the fan above and a portion of the wide southern porch with white wicker furniture and hanging ferns. Late afternoon light, dignified Charleston aesthetic. Same fan, identical model. Photorealistic, no people, no text."`

- [ ] **Step 4: Generate profile avatar**

`generate_image_with_person`, `1024x1024`, `person: "reginald"`, `filename: "fan-reginald-avatar.png"`:

> `"Tight square portrait centered on the brass downrod and motor housing of the same Charleston ceiling fan from the reference, looking straight up. The five oak blades radiate symmetrically out of frame. Soft warm porch light. Same fan, identical model. Photorealistic, no people."`

- [ ] **Step 5: Generate 6 post images**

`generate_image_with_person`, `1024x1024`, `person: "reginald"` for each.

Post 01 — `fan-reginald-post-01.png`:
> `"The same Charleston ceiling fan from the reference, photographed at slow rotation with a faint motion blur on the oak blades. Bright midday porch light. Photorealistic, no people."`

Post 02 — `fan-reginald-post-02.png`:
> `"The same ceiling fan from the reference, photographed at golden hour with the warm orange light catching the brass and the frosted glass light kit. Photorealistic, no people."`

Post 03 — `fan-reginald-post-03.png`:
> `"The same ceiling fan from the reference, photographed in profile from a side angle showing the downrod attachment to the bead-board ceiling. Photorealistic, no people."`

Post 04 — `fan-reginald-post-04.png`:
> `"The same ceiling fan from the reference, with the small light kit illuminated against a dim evening porch background. Warm pool of light beneath the fan. Photorealistic, no people."`

Post 05 — `fan-reginald-post-05.png`:
> `"The same ceiling fan from the reference, looking up at it on a rainy Charleston afternoon with soft grey light, slightly wet porch railings visible at the edges of the frame. Photorealistic, no people."`

Post 06 — `fan-reginald-post-06.png`:
> `"The same ceiling fan from the reference, photographed during a slow spin at twilight with a Carolina blue evening sky just visible through the porch screens. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv mcp/image-gen/generated-images/reginald-base.png \
   mcp/image-gen/generated-images/fan-reginald-cover.png \
   mcp/image-gen/generated-images/fan-reginald-avatar.png \
   mcp/image-gen/generated-images/fan-reginald-post-01.png \
   mcp/image-gen/generated-images/fan-reginald-post-02.png \
   mcp/image-gen/generated-images/fan-reginald-post-03.png \
   mcp/image-gen/generated-images/fan-reginald-post-04.png \
   mcp/image-gen/generated-images/fan-reginald-post-05.png \
   mcp/image-gen/generated-images/fan-reginald-post-06.png \
   public/sites/onlyfans/

ls public/sites/onlyfans/ | grep -c reginald   # expect 9
git add public/sites/onlyfans/reginald-base.png \
        public/sites/onlyfans/fan-reginald-*.png \
        mcp/image-gen/base-images/reginald/base.png && \
git commit -m "feat(onlyfans): generate Sir Reginald image set (Ceiling Fan)"
```

---

## Task 5: Generate AeroVolt 9000's image set (Bladeless Tower)

**Files:** `mcp/image-gen/base-images/aerovolt/base.png` plus 9 `*aerovolt*.png` files under `public/sites/onlyfans/`.

- [ ] **Step 1: Generate base reference**

`mcp__image-gen__generate_image`:

- `prompt`: `"Premium product photograph of a futuristic bladeless tower fan, three feet tall, glossy white plastic with a single chrome accent ring at the base and a tall hollow oval loop where the air emerges. Sitting on a Palo Alto designer's white walnut desk with a thin laptop and a small succulent in the deep background. Bright clean tech-product lighting against a soft white seamless backdrop. Single subject centered. Photorealistic, no people, no readable text."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `aerovolt-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base**

```bash
mkdir -p mcp/image-gen/base-images/aerovolt && \
cp mcp/image-gen/generated-images/aerovolt-base.png mcp/image-gen/base-images/aerovolt/base.png
```

- [ ] **Step 3: Generate cover banner**

`generate_image_with_person`, `1536x1024`, `person: "aerovolt"`, `filename: "fan-aerovolt-cover.png"`:

> `"Wide tech-keynote banner of the same glossy-white bladeless tower fan from the reference, on a sleek presentation stage with cool blue spotlights from above and a softly glowing white floor. Same fan, identical model. Photorealistic, no people, no text."`

- [ ] **Step 4: Generate profile avatar**

`generate_image_with_person`, `1024x1024`, `person: "aerovolt"`, `filename: "fan-aerovolt-avatar.png"`:

> `"Tight square portrait of the upper hollow oval loop of the same bladeless tower fan from the reference. Crisp tech-product lighting, glossy reflections, white seamless backdrop. Same fan, identical model. Photorealistic, no people."`

- [ ] **Step 5: Generate 6 post images**

`generate_image_with_person`, `1024x1024`, `person: "aerovolt"` for each.

Post 01 — `fan-aerovolt-post-01.png`:
> `"The same bladeless tower fan from the reference, photographed at three-quarter angle on a marble counter in a Silicon Valley kitchen. Cool morning light. Photorealistic, no people, no text."`

Post 02 — `fan-aerovolt-post-02.png`:
> `"The same bladeless tower fan from the reference, in a minimal home office with a standing desk and a single monitor in deep background bokeh. Cool natural light from a side window. Photorealistic, no people."`

Post 03 — `fan-aerovolt-post-03.png`:
> `"The same bladeless tower fan from the reference, photographed in profile against a deep navy backdrop. Single dramatic blue rim light along the oval loop. Photorealistic, no people."`

Post 04 — `fan-aerovolt-post-04.png`:
> `"The same bladeless tower fan from the reference, top-down isometric angle on a clean white surface, photographed like a tech product unboxing shot. Photorealistic, no people."`

Post 05 — `fan-aerovolt-post-05.png`:
> `"The same bladeless tower fan from the reference, in a glass-walled conference room with a faint city skyline visible through the glass. Cool corporate light. Photorealistic, no people."`

Post 06 — `fan-aerovolt-post-06.png`:
> `"The same bladeless tower fan from the reference, photographed against a pure white seamless backdrop with the chrome base catching a single warm accent light. Studio product photography. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv mcp/image-gen/generated-images/aerovolt-base.png \
   mcp/image-gen/generated-images/fan-aerovolt-cover.png \
   mcp/image-gen/generated-images/fan-aerovolt-avatar.png \
   mcp/image-gen/generated-images/fan-aerovolt-post-01.png \
   mcp/image-gen/generated-images/fan-aerovolt-post-02.png \
   mcp/image-gen/generated-images/fan-aerovolt-post-03.png \
   mcp/image-gen/generated-images/fan-aerovolt-post-04.png \
   mcp/image-gen/generated-images/fan-aerovolt-post-05.png \
   mcp/image-gen/generated-images/fan-aerovolt-post-06.png \
   public/sites/onlyfans/

ls public/sites/onlyfans/ | grep -c aerovolt   # expect 9
git add public/sites/onlyfans/aerovolt-base.png \
        public/sites/onlyfans/fan-aerovolt-*.png \
        mcp/image-gen/base-images/aerovolt/base.png && \
git commit -m "feat(onlyfans): generate AeroVolt 9000 image set (Bladeless Tower)"
```

---

## Task 6: Generate Lil' Buzz's image set (USB Desk Fan)

**Files:** `mcp/image-gen/base-images/lil-buzz/base.png` plus 9 `*lil-buzz*.png` files under `public/sites/onlyfans/`.

- [ ] **Step 1: Generate base reference**

`mcp__image-gen__generate_image`:

- `prompt`: `"Friendly photograph of a tiny pastel-yellow USB-powered desk fan with soft foam blades, four inches tall, sitting on a cluttered Austin cubicle desk next to an open laptop, a sticky-note dispenser, and a half-full coffee mug with a smiley face. Warm overhead office lighting, cheerful and slightly messy. Single subject in the foreground. Photorealistic, no people, no readable text on the sticky notes."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `lil-buzz-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base**

```bash
mkdir -p mcp/image-gen/base-images/lil-buzz && \
cp mcp/image-gen/generated-images/lil-buzz-base.png mcp/image-gen/base-images/lil-buzz/base.png
```

- [ ] **Step 3: Generate cover banner**

`generate_image_with_person`, `1536x1024`, `person: "lil-buzz"`, `filename: "fan-lil-buzz-cover.png"`:

> `"Wide cheerful banner of the same tiny pastel-yellow USB desk fan from the reference, on the same Austin cubicle desk framed wider to show a row of cubicles in soft background bokeh. Warm encouraging office light. Same fan, identical model. Photorealistic, no people, no readable text."`

- [ ] **Step 4: Generate profile avatar**

`generate_image_with_person`, `1024x1024`, `person: "lil-buzz"`, `filename: "fan-lil-buzz-avatar.png"`:

> `"Tight square head-on portrait of the same tiny pastel-yellow USB desk fan from the reference. Soft foam blades centered, friendly lighting, slight catchlight on the plastic housing. Same fan, identical model. Photorealistic, no people."`

- [ ] **Step 5: Generate 6 post images**

`generate_image_with_person`, `1024x1024`, `person: "lil-buzz"` for each.

Post 01 — `fan-lil-buzz-post-01.png`:
> `"The same tiny pastel-yellow USB desk fan from the reference, photographed pointing toward a stack of paperwork that the soft foam blades are gently fluttering. Warm office light. Photorealistic, no people."`

Post 02 — `fan-lil-buzz-post-02.png`:
> `"The same tiny USB desk fan from the reference, photographed plugged into a laptop USB port with the cable visible. Cheerful natural cubicle light. Photorealistic, no people."`

Post 03 — `fan-lil-buzz-post-03.png`:
> `"The same USB desk fan from the reference, photographed at low three-quarter angle so it looks small but determined. A coffee mug looms in soft background. Photorealistic, no people."`

Post 04 — `fan-lil-buzz-post-04.png`:
> `"The same USB desk fan from the reference, photographed beside a small succulent in a white pot. Warm window light, hopeful color palette. Photorealistic, no people."`

Post 05 — `fan-lil-buzz-post-05.png`:
> `"The same USB desk fan from the reference, on a college dorm desk with a textbook and a string of warm fairy lights softly out of focus in the background. Photorealistic, no people."`

Post 06 — `fan-lil-buzz-post-06.png`:
> `"The same USB desk fan from the reference, photographed dead-on in close-up with the soft foam blades mid-rotation showing a slight motion blur. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv mcp/image-gen/generated-images/lil-buzz-base.png \
   mcp/image-gen/generated-images/fan-lil-buzz-cover.png \
   mcp/image-gen/generated-images/fan-lil-buzz-avatar.png \
   mcp/image-gen/generated-images/fan-lil-buzz-post-01.png \
   mcp/image-gen/generated-images/fan-lil-buzz-post-02.png \
   mcp/image-gen/generated-images/fan-lil-buzz-post-03.png \
   mcp/image-gen/generated-images/fan-lil-buzz-post-04.png \
   mcp/image-gen/generated-images/fan-lil-buzz-post-05.png \
   mcp/image-gen/generated-images/fan-lil-buzz-post-06.png \
   public/sites/onlyfans/

ls public/sites/onlyfans/ | grep -c lil-buzz   # expect 9
git add public/sites/onlyfans/lil-buzz-base.png \
        public/sites/onlyfans/fan-lil-buzz-*.png \
        mcp/image-gen/base-images/lil-buzz/base.png && \
git commit -m "feat(onlyfans): generate Lil' Buzz image set (USB Desk Fan)"
```

---

## Task 7: Generate The Ghost in the Attic's image set (Whole-House Attic Fan)

**Note on the bit:** The Ghost is supposed to be "felt, never seen" — but we still need real images to render. Treat the images as moody, dimly-lit, partially obscured shots of the same whole-house attic fan, photographed in ways that feel like the photographer was reluctant to fully capture it.

**Files:** `mcp/image-gen/base-images/ghost/base.png` plus 9 `*ghost*.png` files under `public/sites/onlyfans/`.

- [ ] **Step 1: Generate base reference**

`mcp__image-gen__generate_image`:

- `prompt`: `"Atmospheric photograph of a large whole-house attic fan, three feet wide, with a louvered metal cover and visible motor housing, mounted in the wood-framed attic of a Phoenix Arizona home. Dim attic light, beam of sun through a small vent slat catching dust motes. Slight low-angle view from below. Mysterious, moody, slightly ominous. Photorealistic, no people, no text."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `ghost-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base**

```bash
mkdir -p mcp/image-gen/base-images/ghost && \
cp mcp/image-gen/generated-images/ghost-base.png mcp/image-gen/base-images/ghost/base.png
```

- [ ] **Step 3: Generate cover banner**

`generate_image_with_person`, `1536x1024`, `person: "ghost"`, `filename: "fan-ghost-cover.png"`:

> `"Wide cinematic banner of the same whole-house attic fan from the reference, framed in a wider attic shot showing exposed wood rafters disappearing into deep shadow. A single shaft of dusty light. Same fan, identical model. Mysterious atmosphere. Photorealistic, no people, no text."`

- [ ] **Step 4: Generate profile avatar**

`generate_image_with_person`, `1024x1024`, `person: "ghost"`, `filename: "fan-ghost-avatar.png"`:

> `"Tight square portrait of the louvered metal cover of the same whole-house attic fan from the reference. Mostly in shadow with one slat of light cutting across the metal. Same fan, identical model. Photorealistic, no people."`

- [ ] **Step 5: Generate 6 post images**

`generate_image_with_person`, `1024x1024`, `person: "ghost"` for each.

Post 01 — `fan-ghost-post-01.png`:
> `"The same whole-house attic fan from the reference, photographed looking up at it from the dim hallway below through a slatted attic vent. Mostly silhouette, just an outline visible. Photorealistic, no people."`

Post 02 — `fan-ghost-post-02.png`:
> `"The same attic fan from the reference, photographed at dawn with very low pinkish light barely illuminating the louvered cover. Deep shadows. Photorealistic, no people."`

Post 03 — `fan-ghost-post-03.png`:
> `"The same attic fan from the reference, photographed in profile from inside the attic with the wood rafters in deep silhouette around it. Photorealistic, no people."`

Post 04 — `fan-ghost-post-04.png`:
> `"The same attic fan from the reference, partially hidden behind a stack of cardboard storage boxes in a dim attic. Only part of the louvered cover is visible. Photorealistic, no people."`

Post 05 — `fan-ghost-post-05.png`:
> `"The same attic fan from the reference, photographed from below as a faint silhouette against a small attic window glowing pale gold. Photorealistic, no people."`

Post 06 — `fan-ghost-post-06.png`:
> `"The same attic fan from the reference, photographed at midnight by flashlight beam from the side, only one half of the unit illuminated. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv mcp/image-gen/generated-images/ghost-base.png \
   mcp/image-gen/generated-images/fan-ghost-cover.png \
   mcp/image-gen/generated-images/fan-ghost-avatar.png \
   mcp/image-gen/generated-images/fan-ghost-post-01.png \
   mcp/image-gen/generated-images/fan-ghost-post-02.png \
   mcp/image-gen/generated-images/fan-ghost-post-03.png \
   mcp/image-gen/generated-images/fan-ghost-post-04.png \
   mcp/image-gen/generated-images/fan-ghost-post-05.png \
   mcp/image-gen/generated-images/fan-ghost-post-06.png \
   public/sites/onlyfans/

ls public/sites/onlyfans/ | grep -c ghost   # expect 9
git add public/sites/onlyfans/ghost-base.png \
        public/sites/onlyfans/fan-ghost-*.png \
        mcp/image-gen/base-images/ghost/base.png && \
git commit -m "feat(onlyfans): generate Ghost in the Attic image set"
```

---

## Task 8: Generate WhirrCore_42's image set (PC Case Fan)

**Files:** `mcp/image-gen/base-images/whirrcore/base.png` plus 9 `*whirrcore*.png` files under `public/sites/onlyfans/`.

- [ ] **Step 1: Generate base reference**

`mcp__image-gen__generate_image`:

- `prompt`: `"Vibrant photograph of a 120mm PC case fan with seven black blades and a black plastic frame, lit from within by bright RGB LEDs cycling through magenta, cyan, and gold colors. Mounted inside a glass-paneled gaming PC case showing other cooling fans softly out of focus in the background. Dramatic neon glow on the surrounding components. Photorealistic, no people, no readable text."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `whirrcore-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base**

```bash
mkdir -p mcp/image-gen/base-images/whirrcore && \
cp mcp/image-gen/generated-images/whirrcore-base.png mcp/image-gen/base-images/whirrcore/base.png
```

- [ ] **Step 3: Generate cover banner**

`generate_image_with_person`, `1536x1024`, `person: "whirrcore"`, `filename: "fan-whirrcore-cover.png"`:

> `"Wide cinematic banner of the same RGB-lit 120mm PC case fan from the reference, framed wider to show the inside of a tempered-glass gaming PC case with multiple other RGB components glowing in the background. Cyberpunk-style neon lighting. Same fan, identical model. Photorealistic, no people."`

- [ ] **Step 4: Generate profile avatar**

`generate_image_with_person`, `1024x1024`, `person: "whirrcore"`, `filename: "fan-whirrcore-avatar.png"`:

> `"Tight square head-on portrait of the same RGB-lit 120mm PC case fan from the reference. Seven black blades centered, internal LEDs glowing magenta and cyan around the rim. Same fan, identical model. Photorealistic, no people."`

- [ ] **Step 5: Generate 6 post images**

`generate_image_with_person`, `1024x1024`, `person: "whirrcore"` for each.

Post 01 — `fan-whirrcore-post-01.png`:
> `"The same RGB PC case fan from the reference, photographed with the LEDs cycling to a deep purple. Three-quarter angle inside the gaming PC case. Photorealistic, no people."`

Post 02 — `fan-whirrcore-post-02.png`:
> `"The same PC case fan from the reference, with the LEDs glowing bright cyan and the seven black blades motion-blurred at high RPM. Photorealistic, no people."`

Post 03 — `fan-whirrcore-post-03.png`:
> `"The same PC case fan from the reference, in profile from the side showing the depth of the frame and the cable tail visible. Magenta LED glow. Photorealistic, no people."`

Post 04 — `fan-whirrcore-post-04.png`:
> `"The same PC case fan from the reference, photographed alongside another similar RGB fan in the same gaming PC. Both glowing different colors, dramatic neon lighting. Photorealistic, no people."`

Post 05 — `fan-whirrcore-post-05.png`:
> `"The same PC case fan from the reference, top-down close-up of the central hub and seven black blades. Bright white LED color cycle. Photorealistic, no people."`

Post 06 — `fan-whirrcore-post-06.png`:
> `"The same PC case fan from the reference, photographed in a darkened room with only the RGB glow illuminating it and a faint reflection on a glossy desk surface in the foreground. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv mcp/image-gen/generated-images/whirrcore-base.png \
   mcp/image-gen/generated-images/fan-whirrcore-cover.png \
   mcp/image-gen/generated-images/fan-whirrcore-avatar.png \
   mcp/image-gen/generated-images/fan-whirrcore-post-01.png \
   mcp/image-gen/generated-images/fan-whirrcore-post-02.png \
   mcp/image-gen/generated-images/fan-whirrcore-post-03.png \
   mcp/image-gen/generated-images/fan-whirrcore-post-04.png \
   mcp/image-gen/generated-images/fan-whirrcore-post-05.png \
   mcp/image-gen/generated-images/fan-whirrcore-post-06.png \
   public/sites/onlyfans/

ls public/sites/onlyfans/ | grep -c whirrcore   # expect 9
git add public/sites/onlyfans/whirrcore-base.png \
        public/sites/onlyfans/fan-whirrcore-*.png \
        mcp/image-gen/base-images/whirrcore/base.png && \
git commit -m "feat(onlyfans): generate WhirrCore_42 image set (PC Case Fan)"
```

---

## Task 9: Generate executive portraits and ashamed-conference-table contact image

**Why:** Uses the existing `bill`/`brandon`/`jim`/`sean` reference folders under `mcp/image-gen/base-images/`. The execs each get one cringing portrait. The contact-page image is a separate composition showing the four men ashamed at a conference table — generated as four solo cringing-at-a-table shots if the multi-person variant is unstable, but try the four-person version first.

**Files:**
- Create: `public/sites/onlyfans/exec-hatcher.png` (Bill, Founder)
- Create: `public/sites/onlyfans/exec-wexley.png` (Brandon)
- Create: `public/sites/onlyfans/exec-castellan.png` (Jim)
- Create: `public/sites/onlyfans/exec-morrow.png` (Sean)
- Create: `public/sites/onlyfans/contact-conference.png`

- [ ] **Step 1: Generate Hatcher (Bill, Founder) portrait**

`mcp__image-gen__generate_image_with_person`, `1024x1024`, `quality: "high"`:

- `role`: `founder`
- `filename`: `exec-hatcher.png`
- `prompt`: `"Editorial corporate headshot of a man in a navy suit and open collar standing in a sleek tech-startup office, photographed mid-cringe — one hand half-raised toward his eyes as if trying to block the camera, looking off to the side with visible regret. Soft window light. Photorealistic, single person, no text."`

- [ ] **Step 2: Generate Wexley (Brandon) portrait**

`mcp__image-gen__generate_image_with_person`, `1024x1024`, `quality: "high"`:

- `person`: `brandon`
- `filename`: `exec-wexley.png`
- `prompt`: `"Editorial corporate headshot of a man in a charcoal blazer and crisp white shirt in the same modern office, photographed covering his face with one hand in visible embarrassment. Soft natural light, slight downward gaze through his fingers. Photorealistic, single person, no text."`

- [ ] **Step 3: Generate Castellan (Jim) portrait**

`mcp__image-gen__generate_image_with_person`, `1024x1024`, `quality: "high"`:

- `person`: `jim`
- `filename`: `exec-castellan.png`
- `prompt`: `"Editorial corporate headshot of a man in a soft grey turtleneck in the same modern office, photographed pinching the bridge of his nose with eyes closed in visible exasperation. Soft window light, neutral background. Photorealistic, single person, no text."`

- [ ] **Step 4: Generate Morrow (Sean) portrait**

`mcp__image-gen__generate_image_with_person`, `1024x1024`, `quality: "high"`:

- `person`: `sean`
- `filename`: `exec-morrow.png`
- `prompt`: `"Editorial corporate headshot of a man in a tailored navy quarter-zip in the same modern office, photographed looking down at his shoes with one hand on the back of his neck in visible shame. Soft daylight from a side window. Photorealistic, single person, no text."`

- [ ] **Step 5: Generate the conference-table contact image**

Try a four-person framing first. If `generate_image_with_person` produces a poor multi-person composition (only one likeness used, etc.), fall back to a generic text-to-image generation via `mcp__image-gen__generate_image` with no person reference.

Try first: `mcp__image-gen__generate_image_with_person`, `1536x1024`, `person: "bill"`, `quality: "high"`:

- `filename`: `contact-conference.png`
- `prompt`: `"Wide editorial photograph of four men in business-casual attire seated around a glass-topped conference table in a sleek modern office, all four visibly ashamed — one covering his face, one looking down at the table, one staring out the window, one pinching the bridge of his nose. Soft daylight from floor-to-ceiling windows behind them. The man at the head of the table closely resembles the man in the reference photo. Photorealistic, four people total, no readable text."`

If the result is unsatisfactory, fall back to `mcp__image-gen__generate_image` with the same prompt minus the reference clause.

- [ ] **Step 6: Move and commit**

```bash
mv mcp/image-gen/generated-images/exec-hatcher.png \
   mcp/image-gen/generated-images/exec-wexley.png \
   mcp/image-gen/generated-images/exec-castellan.png \
   mcp/image-gen/generated-images/exec-morrow.png \
   mcp/image-gen/generated-images/contact-conference.png \
   public/sites/onlyfans/

ls public/sites/onlyfans/ | grep -E '^(exec-|contact-)' | wc -l   # expect 5
git add public/sites/onlyfans/exec-hatcher.png \
        public/sites/onlyfans/exec-wexley.png \
        public/sites/onlyfans/exec-castellan.png \
        public/sites/onlyfans/exec-morrow.png \
        public/sites/onlyfans/contact-conference.png && \
git commit -m "feat(onlyfans): generate exec portraits and conference image"
```

---

## Task 10: Generate home hero and how-it-works illustration

**Files:**
- Create: `public/sites/onlyfans/home-hero.png`
- Create: `public/sites/onlyfans/how-it-works.png`

- [ ] **Step 1: Generate the home hero**

`mcp__image-gen__generate_image`:

- `prompt`: `"Editorial photograph of an aesthetic curated lineup of three different household fans on a clean white surface against a light cyan background — a cream-colored vintage box fan on the left, a slim modern matte-black tower fan in the middle, a sky-blue retro pedestal fan on the right. Even soft studio lighting, gentle shadows, magazine-cover composition. Photorealistic, no people, no text."`
- `width`: `1536`
- `height`: `1024`
- `filename`: `home-hero.png`
- `quality`: `high`

- [ ] **Step 2: Generate the how-it-works illustration**

`mcp__image-gen__generate_image`:

- `prompt`: `"Clean three-step infographic illustration in flat vector style on a soft cyan background. Three stages left to right: (1) a simplified silhouette of a hand pointing at a row of fans, labeled '1' in a circle; (2) a simplified silhouette of a fan with a heart icon above it, labeled '2'; (3) a simplified silhouette of a fan with motion lines streaming from its blades, labeled '3'. Bright cyan, white, and coral color palette. Friendly, modern, marketing-page style. No readable English text other than the numerals 1, 2, 3."`
- `width`: `1536`
- `height`: `1024`
- `filename`: `how-it-works.png`
- `quality`: `high`

- [ ] **Step 3: Move and commit**

```bash
mv mcp/image-gen/generated-images/home-hero.png \
   mcp/image-gen/generated-images/how-it-works.png \
   public/sites/onlyfans/

ls public/sites/onlyfans/home-hero.png public/sites/onlyfans/how-it-works.png   # both exist
git add public/sites/onlyfans/home-hero.png public/sites/onlyfans/how-it-works.png && \
git commit -m "feat(onlyfans): generate home hero and how-it-works illustration"
```

---

## Task 11: Site bootstrap — config, registry wiring, placeholder home

**Why:** Get the subdomain routing wired up so `?site=onlyfans` resolves to a real (if empty) page. This unblocks visual smoke testing for every subsequent page task.

**Files:**
- Create: `src/sites/onlyfans/config.ts`
- Create: `src/sites/onlyfans/index.ts`
- Create: `src/sites/onlyfans/pages/home.tsx` (placeholder)
- Create: `public/sites/onlyfans/favicon.png` (copied from `home-hero.png` for now)
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create the site config**

Create `src/sites/onlyfans/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "OnlyFans",
  subdomain: "onlyfans",
  theme: {
    preset: "light",
    colors: {
      primary: "#00AFF0",      // OnlyFans cyan
      secondary: "#0095CD",    // deeper cyan
      accent: "#FF7A59",       // coral — tip buttons
      background: "#FFFFFF",
      text: "#0F172A",
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "OnlyFans — Air Movement Subscriptions",
    description: "Subscribe to your favorite fan. Literal fans. Blowing literal air. The world's premier subscription platform for household and industrial airflow content.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Meet the Fans", path: "/browse" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "About", path: "/about" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
}
```

- [ ] **Step 2: Create a placeholder home page**

Create `src/sites/onlyfans/pages/home.tsx`:

```typescript
export default function OnlyFansHome() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">OnlyFans</h1>
      <p className="text-foreground/70">Placeholder home page. Real content coming.</p>
    </div>
  )
}
```

- [ ] **Step 3: Create the index barrel**

Create `src/sites/onlyfans/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import OnlyFansHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": OnlyFansHome,
}
```

- [ ] **Step 4: Register in the site registry**

Modify `src/sites/registry.ts`. Add the import alongside the others:

```typescript
import { config as onlyfansConfig, pages as onlyfansPages } from "./onlyfans"
```

And add to the `siteRegistry` object:

```typescript
  onlyfans: { config: onlyfansConfig, pages: onlyfansPages },
```

- [ ] **Step 5: Add to the subdomain allowlist**

Modify `src/sites/subdomains.ts`. Add `"onlyfans"` to the `VALID_SUBDOMAINS` array:

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
] as const
```

- [ ] **Step 6: Create a placeholder favicon**

```bash
cp public/sites/onlyfans/home-hero.png public/sites/onlyfans/favicon.png
```

(A real favicon can be made later via `scripts/resize-favicons.mjs` if desired.)

- [ ] **Step 7: Type-check**

Run: `npx tsc --noEmit`
Expected: clean exit, no errors.

- [ ] **Step 8: Smoke test**

Run: `npm run dev` in one terminal. In a browser navigate to `http://localhost:3000/?site=onlyfans`. You should see the cyan placeholder home page. Stop the dev server.

- [ ] **Step 9: Commit**

```bash
git add src/sites/onlyfans/config.ts \
        src/sites/onlyfans/pages/home.tsx \
        src/sites/onlyfans/index.ts \
        src/sites/registry.ts \
        src/sites/subdomains.ts \
        public/sites/onlyfans/favicon.png && \
git commit -m "feat(onlyfans): bootstrap site config, registry wiring, placeholder home"
```

---

## Task 12: Fan data file

**Files:** Create `src/sites/onlyfans/data/fans.ts`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/data/fans.ts` with this complete content:

```typescript
export interface FanPost {
  image: string
  caption: string
  locked: boolean
}

export interface TipMenuItem {
  amount: number
  description: string
}

export interface Fan {
  slug: string
  name: string
  handle: string
  fanType: string
  location: string
  monthlyPrice: number
  subscriberCount: number
  niche: string
  audienceTag: string
  bio: string
  coverImage: string
  avatarImage: string
  posts: FanPost[]
  tipMenu: TipMenuItem[]
  warningLabel?: string
}

export const fans: Fan[] = [
  {
    slug: "brenda",
    name: "Brenda",
    handle: "@brendablows",
    fanType: "Box Fan, est. 1957",
    location: "Tulsa, OK",
    monthlyPrice: 3.99,
    subscriberCount: 12847,
    niche: "Working-class nostalgia",
    audienceTag: "Wholesome",
    bio: "Hi y'all. I'm Brenda. I've been blowing air out of a window in Tulsa since 1957 and I'm grateful for every single one of you. I do three speeds — low, medium, and high — and I oscillate when the mood strikes me.",
    coverImage: "/sites/onlyfans/fan-brenda-cover.png",
    avatarImage: "/sites/onlyfans/fan-brenda-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-brenda-post-01.png", caption: "midwestern morning, low setting", locked: false },
      { image: "/sites/onlyfans/fan-brenda-post-02.png", caption: "afternoon kitchen, medium speed", locked: false },
      { image: "/sites/onlyfans/fan-brenda-post-03.png", caption: "golden hour, full power", locked: true },
      { image: "/sites/onlyfans/fan-brenda-post-04.png", caption: "looking down at the chrome", locked: true },
      { image: "/sites/onlyfans/fan-brenda-post-05.png", caption: "side profile against white wall", locked: true },
      { image: "/sites/onlyfans/fan-brenda-post-06.png", caption: "evening shift, indoor light", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "Personalized angle adjustment video" },
      { amount: 20, description: "Custom oscillation pattern, your choice" },
      { amount: 50, description: "Behind-the-grille tour (pre-recorded)" },
    ],
  },
  {
    slug: "vance",
    name: "Big Vance",
    handle: "@vance_unleashed",
    fanType: "Industrial Wind Tunnel — 80,000 CFM",
    location: "Carson City, NV",
    monthlyPrice: 14.99,
    subscriberCount: 4209,
    niche: "Extreme thrill-seekers",
    audienceTag: "Extreme",
    bio: "I AM NOT FOR EVERYONE. I move 80,000 CFM. I have removed shingles. I have been declared a public nuisance in two counties. If you can handle me, I am here for you.",
    coverImage: "/sites/onlyfans/fan-vance-cover.png",
    avatarImage: "/sites/onlyfans/fan-vance-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-vance-post-01.png", caption: "warehouse floor, blades at max", locked: false },
      { image: "/sites/onlyfans/fan-vance-post-02.png", caption: "low angle, cage profile", locked: false },
      { image: "/sites/onlyfans/fan-vance-post-03.png", caption: "loading dock, golden hour", locked: true },
      { image: "/sites/onlyfans/fan-vance-post-04.png", caption: "side profile, full frame", locked: true },
      { image: "/sites/onlyfans/fan-vance-post-05.png", caption: "warning labels close-up", locked: true },
      { image: "/sites/onlyfans/fan-vance-post-06.png", caption: "outdoor, dusk, gravel lot", locked: true },
    ],
    tipMenu: [
      { amount: 10, description: "Blow your hat across the parking lot" },
      { amount: 50, description: "Custom debris-displacement demonstration" },
      { amount: 200, description: "Voicemail of pure airflow (no words)" },
    ],
    warningLabel: "EXTREME — not recommended for indoor viewing",
  },
  {
    slug: "oscillata",
    name: "Mistress Oscillata",
    handle: "@oscillata",
    fanType: "Tower Fan — Limited Engagement",
    location: "Manhattan, NY",
    monthlyPrice: 24.99,
    subscriberCount: 487,
    niche: "Luxury minimalists",
    audienceTag: "Luxury",
    bio: "I do not perform on demand. My oscillation is curated. I release one cycle per quarter. If you appreciate restraint, you may join my select audience.",
    coverImage: "/sites/onlyfans/fan-oscillata-cover.png",
    avatarImage: "/sites/onlyfans/fan-oscillata-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-oscillata-post-01.png", caption: "the side profile (free)", locked: false },
      { image: "/sites/onlyfans/fan-oscillata-post-02.png", caption: "twilight loft (free)", locked: false },
      { image: "/sites/onlyfans/fan-oscillata-post-03.png", caption: "the orchid composition", locked: true },
      { image: "/sites/onlyfans/fan-oscillata-post-04.png", caption: "brushed steel base, close", locked: true },
      { image: "/sites/onlyfans/fan-oscillata-post-05.png", caption: "velvet backdrop study", locked: true },
      { image: "/sites/onlyfans/fan-oscillata-post-06.png", caption: "sunrise loft, single edge", locked: true },
    ],
    tipMenu: [
      { amount: 25, description: "Acknowledgement card (handwritten)" },
      { amount: 100, description: "One additional unscheduled oscillation" },
      { amount: 500, description: "Private quarterly viewing (by appointment only)" },
    ],
  },
  {
    slug: "reginald",
    name: "Sir Reginald Plumebottom III",
    handle: "@plumebottom",
    fanType: "Ceiling Fan — Five Blades",
    location: "Charleston, SC",
    monthlyPrice: 5.99,
    subscriberCount: 31540,
    niche: "Wholesome porch family",
    audienceTag: "Wholesome",
    bio: "Good day. I have been moving this same air since 1973 and I see no reason to stop. My subscribers come for consistency, and consistency is what they receive.",
    coverImage: "/sites/onlyfans/fan-reginald-cover.png",
    avatarImage: "/sites/onlyfans/fan-reginald-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-reginald-post-01.png", caption: "midday slow rotation", locked: false },
      { image: "/sites/onlyfans/fan-reginald-post-02.png", caption: "golden hour brass", locked: false },
      { image: "/sites/onlyfans/fan-reginald-post-03.png", caption: "downrod profile", locked: true },
      { image: "/sites/onlyfans/fan-reginald-post-04.png", caption: "evening light kit on", locked: true },
      { image: "/sites/onlyfans/fan-reginald-post-05.png", caption: "rainy charleston afternoon", locked: true },
      { image: "/sites/onlyfans/fan-reginald-post-06.png", caption: "twilight, screen porch", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "A polite tip of the brass cap" },
      { amount: 15, description: "One additional mid-summer rotation" },
      { amount: 40, description: "An evening illumination of the light kit, just for you" },
    ],
  },
  {
    slug: "aerovolt",
    name: "AeroVolt 9000™",
    handle: "@aerovolt",
    fanType: "Bladeless Tower — Patented",
    location: "Palo Alto, CA",
    monthlyPrice: 19.99,
    subscriberCount: 8901,
    niche: "Tech-bro premium",
    audienceTag: "Tech",
    bio: "AeroVolt 9000 is redefining what airflow can be. Subscribe to receive the AeroVolt Whitepaper and quarterly product roadmap updates. Disrupting the wind industry since 2019.",
    coverImage: "/sites/onlyfans/fan-aerovolt-cover.png",
    avatarImage: "/sites/onlyfans/fan-aerovolt-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-aerovolt-post-01.png", caption: "the marble counter installation", locked: false },
      { image: "/sites/onlyfans/fan-aerovolt-post-02.png", caption: "home office workflow integration", locked: false },
      { image: "/sites/onlyfans/fan-aerovolt-post-03.png", caption: "navy backdrop study", locked: true },
      { image: "/sites/onlyfans/fan-aerovolt-post-04.png", caption: "isometric unboxing", locked: true },
      { image: "/sites/onlyfans/fan-aerovolt-post-05.png", caption: "the conference room moment", locked: true },
      { image: "/sites/onlyfans/fan-aerovolt-post-06.png", caption: "white seamless studio", locked: true },
    ],
    tipMenu: [
      { amount: 10, description: "Receive the AeroVolt 12-page airflow whitepaper PDF" },
      { amount: 50, description: "30-minute Zoom with the product team (no agenda)" },
      { amount: 250, description: "Be added to the AeroVolt advisory board (honorary)" },
    ],
  },
  {
    slug: "lil-buzz",
    name: "Lil' Buzz",
    handle: "@lilbuzz_official",
    fanType: "USB Desk Fan — 12 CFM",
    location: "Austin, TX",
    monthlyPrice: 0.99,
    subscriberCount: 2847103,
    niche: "Cubicle underdog",
    audienceTag: "Underdog",
    bio: "Hi!! It's me, Lil' Buzz!! I move 12 CFM and I am SO happy you're here!! Every subscriber gets a personal thank-you and a virtual fist bump. THANK YOU for believing in me!!",
    coverImage: "/sites/onlyfans/fan-lil-buzz-cover.png",
    avatarImage: "/sites/onlyfans/fan-lil-buzz-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-lil-buzz-post-01.png", caption: "fluttering the paperwork!!", locked: false },
      { image: "/sites/onlyfans/fan-lil-buzz-post-02.png", caption: "plugged in and ready!!", locked: false },
      { image: "/sites/onlyfans/fan-lil-buzz-post-03.png", caption: "small but mighty angle", locked: true },
      { image: "/sites/onlyfans/fan-lil-buzz-post-04.png", caption: "succulent buddy day", locked: true },
      { image: "/sites/onlyfans/fan-lil-buzz-post-05.png", caption: "dorm desk study session", locked: true },
      { image: "/sites/onlyfans/fan-lil-buzz-post-06.png", caption: "blade close-up!!", locked: true },
    ],
    tipMenu: [
      { amount: 1, description: "Personalized thank-you message (Lil' Buzz will probably cry)" },
      { amount: 5, description: "A second personalized thank-you message (Lil' Buzz definitely cried)" },
      { amount: 20, description: "Virtual high-five and a name-shoutout in the next post" },
    ],
  },
  {
    slug: "ghost",
    name: "The Ghost in the Attic",
    handle: "@neverseen",
    fanType: "Whole-House Attic Fan — Presence Only",
    location: "Phoenix, AZ",
    monthlyPrice: 8.99,
    subscriberCount: 1247,
    niche: "Felt, never seen",
    audienceTag: "Mysterious",
    bio: "I am here. I have always been here. You will not see me. You will only feel a slight cooling of the upstairs hallway. This is enough.",
    coverImage: "/sites/onlyfans/fan-ghost-cover.png",
    avatarImage: "/sites/onlyfans/fan-ghost-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-ghost-post-01.png", caption: "from the hallway below", locked: false },
      { image: "/sites/onlyfans/fan-ghost-post-02.png", caption: "first light of dawn", locked: false },
      { image: "/sites/onlyfans/fan-ghost-post-03.png", caption: "in profile, between rafters", locked: true },
      { image: "/sites/onlyfans/fan-ghost-post-04.png", caption: "behind the storage", locked: true },
      { image: "/sites/onlyfans/fan-ghost-post-05.png", caption: "silhouette against the vent", locked: true },
      { image: "/sites/onlyfans/fan-ghost-post-06.png", caption: "midnight, by flashlight", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "A faint cooling on a hot afternoon" },
      { amount: 25, description: "An unexplained creak from the attic at 3 AM" },
      { amount: 100, description: "A photograph that will not develop" },
    ],
  },
  {
    slug: "whirrcore",
    name: "WhirrCore_42",
    handle: "@whirrcore_ttv",
    fanType: "PC Case Fan — 120mm RGB",
    location: "undisclosed basement",
    monthlyPrice: 6.99,
    subscriberCount: 19201,
    niche: "Gamer / streamer",
    audienceTag: "Gamer",
    bio: "sup fanbase 🎮 just out here at 2400 rpm running it back. drop a sub for full RGB rotation logs and i'll shoutout your gamertag in next week's 12-hour endurance stream. gg ez",
    coverImage: "/sites/onlyfans/fan-whirrcore-cover.png",
    avatarImage: "/sites/onlyfans/fan-whirrcore-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-whirrcore-post-01.png", caption: "purple cycle three-quarter", locked: false },
      { image: "/sites/onlyfans/fan-whirrcore-post-02.png", caption: "cyan + max rpm motion blur", locked: false },
      { image: "/sites/onlyfans/fan-whirrcore-post-03.png", caption: "side profile w/ cable", locked: true },
      { image: "/sites/onlyfans/fan-whirrcore-post-04.png", caption: "duo build w/ my homie", locked: true },
      { image: "/sites/onlyfans/fan-whirrcore-post-05.png", caption: "white cycle top down", locked: true },
      { image: "/sites/onlyfans/fan-whirrcore-post-06.png", caption: "dark room glow check", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "Custom RGB color request for one post" },
      { amount: 25, description: "Gamertag shoutout in next stream" },
      { amount: 100, description: "Be added to the WhirrCore Discord 'verified airflow enjoyers' role" },
    ],
  },
]

export function getFanBySlug(slug: string): Fan | undefined {
  return fans.find((f) => f.slug === slug)
}

export const homepageFeaturedFans = ["brenda", "oscillata", "lil-buzz", "whirrcore"]
  .map((slug) => fans.find((f) => f.slug === slug)!)
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/data/fans.ts && \
git commit -m "feat(onlyfans): add fan creator data (8 fans)"
```

---

## Task 13: Leadership data file

**Files:** Create `src/sites/onlyfans/data/leadership.ts`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/data/leadership.ts`:

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
    slug: "hatcher",
    name: "Bill Hatcher",
    title: "Founder & Chief Executive",
    bio: "Bill founded OnlyFans in 2019 after a long weekend that he describes as 'a series of decisions I cannot fully account for.' He is a graduate of a respectable Midwestern business school and would like that mentioned. He stands behind the company in the technical sense that he owns it.",
    quote: "I was supposed to be in commercial real estate.",
    image: "/sites/onlyfans/exec-hatcher.png",
    referencePerson: "bill",
  },
  {
    slug: "wexley",
    name: "Brandon Wexley",
    title: "VP, Operations (Allegedly)",
    bio: "Brandon joined the company in 2020 because Bill assured him it was an HVAC distribution business. By the time the actual business model was explained, his children were already enrolled in private school. He has since stopped attending alumni events.",
    quote: "I would prefer not to discuss what I do for a living.",
    image: "/sites/onlyfans/exec-wexley.png",
    referencePerson: "brandon",
  },
  {
    slug: "castellan",
    name: "Jim Castellan",
    title: "VP, Subscriber Success",
    bio: "Jim is responsible for ensuring our subscribers receive the airflow content they have paid for. He is good at his job, which is the worst part of it. His mother believes he works for a 'fan distribution start-up' and he has not corrected her.",
    quote: "Please do not put my full name on this page.",
    image: "/sites/onlyfans/exec-castellan.png",
    referencePerson: "jim",
  },
  {
    slug: "morrow",
    name: "Sean Morrow",
    title: "VP, Talent Relations",
    bio: "Sean handles negotiations with our roster of fan creators. He maintains professional relationships with eight household appliances. This is, as he frequently reminds us, not what he went to graduate school for.",
    quote: "I have updated my LinkedIn three times this year.",
    image: "/sites/onlyfans/exec-morrow.png",
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
git add src/sites/onlyfans/data/leadership.ts && \
git commit -m "feat(onlyfans): add ashamed executive leadership data"
```

---

## Task 14: Testimonials data file

**Files:** Create `src/sites/onlyfans/data/testimonials.ts`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/data/testimonials.ts`:

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
    "I never thought I'd find a community like this. Brenda has changed how I think about box fans entirely. Worth every penny.",
    "Subscriber since 2024 — Tulsa, OK",
  ),
  withPortrait(
    "jason-kile",
    "Sir Reginald reminds me of summers on my grandmother's porch. I haven't unsubscribed once. I never will.",
    "Loyal Plumebottom subscriber — Charleston, SC",
  ),
  withPortrait(
    "tony-mazetti",
    "Big Vance is too much for most people. That's exactly why I'm here. Five stars.",
    "Tournament-grade airflow enthusiast — Dubuque, IA",
  ),
  withPortrait(
    "patricia-hollowell",
    "As a healthcare professional I was skeptical. Then I saw Lil' Buzz post about his first $5 tip and I cried at my desk.",
    "Healthcare professional — Iowa City, IA",
  ),
  withPortrait(
    "derek-pullman",
    "I subscribed to AeroVolt 9000 and within a week he had me on a roadmap call. I now own equity in nothing, but I feel seen.",
    "Optimization enthusiast — Marshalltown, IA",
  ),
  withPortrait(
    "simone-archer",
    "Mistress Oscillata only releases one cycle per quarter and I have circled all four dates on my calendar. This is what I deserve.",
    "Discerning subscriber — Ames, IA",
  ),
  withPortrait(
    "kyle-brandt",
    "WhirrCore_42 shouted out my gamertag during a 12-hour stream. I have not been the same person since.",
    "Verified airflow enjoyer — Waterloo, IA",
  ),
  withPortrait(
    "eleanor-whittaker",
    "I subscribed to The Ghost in the Attic six months ago and I have never seen a single image. I have, however, felt SOMETHING. That is enough.",
    "Believer — Iowa City, IA",
  ),
]

export const homepageTestimonials = testimonials.slice(0, 3)
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/data/testimonials.ts && \
git commit -m "feat(onlyfans): add fan-themed testimonials"
```

---

## Task 15: Toast component

**Why:** A self-contained, window-event-driven toast container that the SubscribeButton and TipButton can fire messages at. Lives only on pages that include it (we'll mount it inside the fan profile page and the browse page where the buttons live). Does NOT use the existing `commerce/toast` system.

**Files:** Create `src/sites/onlyfans/components/Toast.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/components/Toast.tsx`:

```typescript
"use client"

import { useEffect, useState } from "react"

interface ToastMessage {
  id: number
  text: string
}

export const ONLYFANS_TOAST_EVENT = "onlyfans-toast"

export function fireToast(text: string) {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(ONLYFANS_TOAST_EVENT, { detail: { text } }))
}

export function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  useEffect(() => {
    let nextId = 0
    function handler(e: Event) {
      const detail = (e as CustomEvent<{ text: string }>).detail
      if (!detail?.text) return
      const id = nextId++
      setMessages((prev) => [...prev, { id, text: detail.text }])
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id))
      }, 3500)
    }
    window.addEventListener(ONLYFANS_TOAST_EVENT, handler)
    return () => window.removeEventListener(ONLYFANS_TOAST_EVENT, handler)
  }, [])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {messages.map((m) => (
        <div
          key={m.id}
          className="bg-[#0F172A] text-white px-5 py-3 rounded-full shadow-xl text-sm font-semibold pointer-events-auto"
        >
          {m.text}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/components/Toast.tsx && \
git commit -m "feat(onlyfans): add window-event Toast container"
```

---

## Task 16: SubscribeButton component

**Why:** Writes a `{slug, subscribedAt}` record to `localStorage["onlyfans-subscriptions"]` on click, fires a toast, and dispatches a `onlyfans-subscribed` window event so any `LockedThumbnail` instances on the same page can react in real time.

**Files:** Create `src/sites/onlyfans/components/SubscribeButton.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/components/SubscribeButton.tsx`:

```typescript
"use client"

import { useEffect, useState } from "react"
import { fireToast } from "./Toast"

const STORAGE_KEY = "onlyfans-subscriptions"
export const ONLYFANS_SUBSCRIBED_EVENT = "onlyfans-subscribed"

interface StoredSubscription {
  slug: string
  subscribedAt: number
}

function readSubs(): StoredSubscription[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeSubs(subs: StoredSubscription[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(subs))
}

export function isSubscribed(slug: string): boolean {
  return readSubs().some((s) => s.slug === slug)
}

interface SubscribeButtonProps {
  fanSlug: string
  fanName: string
  monthlyPrice: number
  size?: "sm" | "lg"
}

export function SubscribeButton({ fanSlug, fanName, monthlyPrice, size = "lg" }: SubscribeButtonProps) {
  const [subscribed, setSubscribed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSubscribed(isSubscribed(fanSlug))
    function handler(e: Event) {
      const detail = (e as CustomEvent<{ slug: string }>).detail
      if (detail?.slug === fanSlug) setSubscribed(true)
    }
    window.addEventListener(ONLYFANS_SUBSCRIBED_EVENT, handler)
    return () => window.removeEventListener(ONLYFANS_SUBSCRIBED_EVENT, handler)
  }, [fanSlug])

  function handleClick() {
    if (subscribed) return
    const subs = readSubs()
    if (!subs.some((s) => s.slug === fanSlug)) {
      subs.push({ slug: fanSlug, subscribedAt: Date.now() })
      writeSubs(subs)
    }
    setSubscribed(true)
    window.dispatchEvent(new CustomEvent(ONLYFANS_SUBSCRIBED_EVENT, { detail: { slug: fanSlug } }))
    fireToast(`You're now subscribed to ${fanName}. Welcome to the fan family.`)
  }

  const padding = size === "sm" ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"

  if (!mounted) {
    return (
      <button className={`bg-[#00AFF0] text-white font-bold rounded-full ${padding}`} disabled>
        SUBSCRIBE — ${monthlyPrice.toFixed(2)}/mo
      </button>
    )
  }

  if (subscribed) {
    return (
      <button
        className={`bg-[#0F172A]/30 text-white font-bold rounded-full ${padding} cursor-not-allowed`}
        disabled
      >
        ✓ SUBSCRIBED
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`bg-[#00AFF0] hover:bg-[#0095CD] text-white font-bold rounded-full ${padding} transition-colors`}
    >
      SUBSCRIBE — ${monthlyPrice.toFixed(2)}/mo
    </button>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/components/SubscribeButton.tsx && \
git commit -m "feat(onlyfans): add SubscribeButton client component"
```

---

## Task 17: TipButton component

**Why:** Fires a toast on click with the tip amount and fan name. No persistence — users can tip repeatedly.

**Files:** Create `src/sites/onlyfans/components/TipButton.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/components/TipButton.tsx`:

```typescript
"use client"

import { fireToast } from "./Toast"

interface TipButtonProps {
  fanName: string
  amount: number
}

export function TipButton({ fanName, amount }: TipButtonProps) {
  function handleClick() {
    fireToast(`Thanks for the $${amount} tip! ${fanName} has been notified.`)
  }

  return (
    <button
      onClick={handleClick}
      className="bg-[#FF7A59] hover:bg-[#ee6646] text-white font-bold text-xs uppercase rounded-full px-4 py-1.5 transition-colors"
    >
      TIP ${amount}
    </button>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/components/TipButton.tsx && \
git commit -m "feat(onlyfans): add TipButton client component"
```

---

## Task 18: LockedThumbnail component

**Why:** Reads `localStorage["onlyfans-subscriptions"]`, listens for the `onlyfans-subscribed` window event, and conditionally renders a post image either normally (free preview or subscribed) or with a CSS blur + dark overlay + lock icon (locked).

**Files:** Create `src/sites/onlyfans/components/LockedThumbnail.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/components/LockedThumbnail.tsx`:

```typescript
"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { isSubscribed, ONLYFANS_SUBSCRIBED_EVENT } from "./SubscribeButton"

interface LockedThumbnailProps {
  fanSlug: string
  image: string
  caption: string
  locked: boolean
}

export function LockedThumbnail({ fanSlug, image, caption, locked }: LockedThumbnailProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUnlocked(isSubscribed(fanSlug))
    function handler(e: Event) {
      const detail = (e as CustomEvent<{ slug: string }>).detail
      if (detail?.slug === fanSlug) setUnlocked(true)
    }
    window.addEventListener(ONLYFANS_SUBSCRIBED_EVENT, handler)
    return () => window.removeEventListener(ONLYFANS_SUBSCRIBED_EVENT, handler)
  }, [fanSlug])

  // Pre-mount, render server-safe state: locked posts blurred, free posts visible
  const isLocked = locked && (!mounted || !unlocked)

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-200">
      <Image
        src={image}
        alt={caption}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className={`object-cover transition-all duration-300 ${isLocked ? "blur-2xl scale-110" : ""}`}
      />
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
          <span className="text-3xl mb-1" aria-hidden>🔒</span>
          <span className="text-xs font-semibold uppercase tracking-wide">Subscribe to view</span>
        </div>
      )}
      {!isLocked && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-xs px-3 py-2">
          {caption}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/components/LockedThumbnail.tsx && \
git commit -m "feat(onlyfans): add LockedThumbnail with subscribe-unlock behavior"
```

---

## Task 19: FanCard component

**Why:** The card used on the home page featured strip and the browse page grid. Renders a fan's cover image, avatar, name/handle, niche tag, monthly price, and a Subscribe button. Wraps the card body in a Link to the fan's profile page.

**Files:** Create `src/sites/onlyfans/components/FanCard.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/components/FanCard.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import type { Fan } from "../data/fans"
import { SubscribeButton } from "./SubscribeButton"

interface FanCardProps {
  fan: Fan
  siteHref: (path: string) => string
}

export function FanCard({ fan, siteHref }: FanCardProps) {
  const profileHref = siteHref(`/browse/${fan.slug}`)
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={profileHref} className="block relative aspect-[16/9] bg-slate-100">
        <Image
          src={fan.coverImage}
          alt={`${fan.name} cover`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="px-4 pt-3 -mt-8 relative">
        <Link href={profileHref} className="block w-16 h-16 rounded-full overflow-hidden border-4 border-white bg-slate-200 relative">
          <Image
            src={fan.avatarImage}
            alt={`${fan.name} avatar`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="px-4 py-3 flex-1 flex flex-col">
        <Link href={profileHref} className="block">
          <div className="font-bold text-[#0F172A] text-base flex items-center gap-1.5">
            {fan.name}
            <span className="text-[#00AFF0]" aria-hidden>●</span>
          </div>
          <div className="text-xs text-slate-500">{fan.handle} · {fan.location}</div>
          <div className="text-xs text-slate-600 mt-1">{fan.fanType}</div>
        </Link>
        <div className="mt-3 flex-1">
          <span className="inline-block bg-[#00AFF0]/10 text-[#0095CD] text-xs font-semibold px-2 py-1 rounded-full">
            {fan.audienceTag}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100">
          <SubscribeButton fanSlug={fan.slug} fanName={fan.name} monthlyPrice={fan.monthlyPrice} size="sm" />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/components/FanCard.tsx && \
git commit -m "feat(onlyfans): add FanCard browse component"
```

---

## Task 20: Home page

**Files:** Modify `src/sites/onlyfans/pages/home.tsx` (replace placeholder)

- [ ] **Step 1: Replace the placeholder with the real home**

Replace the entire contents of `src/sites/onlyfans/pages/home.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { homepageFeaturedFans } from "../data/fans"
import { homepageTestimonials } from "../data/testimonials"
import { FanCard } from "../components/FanCard"
import { ToastContainer } from "../components/Toast"

export default async function OnlyFansHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <ToastContainer />

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#00AFF0] leading-tight">
              Subscribe to your favorite fan.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Literal fans. Blowing literal air. The world's premier subscription platform for household and industrial airflow content.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteHref("/browse")}
                className="bg-[#00AFF0] hover:bg-[#0095CD] text-white font-bold rounded-full px-7 py-3 transition-colors"
              >
                Meet the Fans
              </Link>
              <Link
                href={siteHref("/how-it-works")}
                className="bg-white border border-slate-200 hover:border-slate-300 text-[#0F172A] font-bold rounded-full px-7 py-3 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/sites/onlyfans/home-hero.png"
              alt="A curated lineup of three different household fans"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURED FANS */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">Featured fans</h2>
            <p className="text-slate-500 mt-2">A small selection of the creators currently on the platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageFeaturedFans.map((fan) => (
              <FanCard key={fan.slug} fan={fan} siteHref={siteHref} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/browse")}
              className="text-[#0095CD] font-bold underline underline-offset-4"
            >
              See all 8 fans →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
            <Image
              src="/sites/onlyfans/how-it-works.png"
              alt="Three steps to subscribe to a fan"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">How it works</h2>
            <ol className="mt-6 space-y-4 text-slate-700">
              <li className="flex gap-3"><span className="font-bold text-[#00AFF0]">1.</span><span>Browse the fans and find one whose airflow personality fits your home.</span></li>
              <li className="flex gap-3"><span className="font-bold text-[#00AFF0]">2.</span><span>Subscribe — every fan posts content as it occurs to them.</span></li>
              <li className="flex gap-3"><span className="font-bold text-[#00AFF0]">3.</span><span>Watch them blow air. That's it. That's the platform.</span></li>
            </ol>
            <Link
              href={siteHref("/how-it-works")}
              className="inline-block mt-6 text-[#0095CD] font-bold underline underline-offset-4"
            >
              Read the full guide →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-extrabold text-[#0F172A] text-center mb-10">What our subscribers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#0F172A]">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.title}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER BAND */}
      <section className="bg-[#00AFF0] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-extrabold">Find your fan today.</h2>
          <p className="mt-2 text-white/90">Eight creators. Eight personalities. One platform.</p>
          <Link
            href={siteHref("/browse")}
            className="inline-block mt-6 bg-white text-[#0095CD] font-bold rounded-full px-7 py-3"
          >
            Browse the roster
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Type-check and smoke test**

```bash
npx tsc --noEmit
npm run dev   # then visit http://localhost:3000/?site=onlyfans
```

Expected: cyan home page renders with hero, 4 fan cards, how-it-works, testimonials, and the cyan CTA band. No console errors. Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add src/sites/onlyfans/pages/home.tsx && \
git commit -m "feat(onlyfans): implement home page"
```

---

## Task 21: Browse page (Meet the Fans)

**Files:** Create `src/sites/onlyfans/pages/browse.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/pages/browse.tsx`:

```typescript
"use client"

import { useState } from "react"
import { useSiteHrefClient } from "@/lib/site-href-client"
import { fans, type Fan } from "../data/fans"
import { FanCard } from "../components/FanCard"
import { ToastContainer } from "../components/Toast"

const TAGS = ["All", ...Array.from(new Set(fans.map((f) => f.audienceTag)))]

export default function OnlyFansBrowse() {
  const siteHref = useSiteHrefClient()
  const [activeTag, setActiveTag] = useState("All")

  const visible: Fan[] = activeTag === "All" ? fans : fans.filter((f) => f.audienceTag === activeTag)

  return (
    <>
      <ToastContainer />
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A]">Meet the Fans</h1>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              Eight creators currently on the platform. Each one has a different airflow personality. Find the one that fits your home.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeTag === tag
                    ? "bg-[#00AFF0] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((fan) => (
              <FanCard key={fan.slug} fan={fan} siteHref={siteHref} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-8 text-center text-slate-500">No fans match that filter.</p>
          )}
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: "Meet the Fans — OnlyFans",
  description: "Browse our roster of 8 fan creators. Box fans, ceiling fans, industrial wind tunnels — there's a fan for every home.",
}
```

- [ ] **Step 2: Check whether `useSiteHrefClient` exists**

Run: `ls src/lib/site-href-client.ts 2>&1`

If the file does not exist (no client-side helper), create it before proceeding to Step 3:

Create `src/lib/site-href-client.ts`:

```typescript
"use client"

import { useEffect, useState } from "react"

/**
 * Client-side equivalent of getSiteHref. Reads ?site= from window.location and
 * appends it to internal links during local dev / preview deploys. In
 * production (real subdomains) it returns paths unchanged.
 */
export function useSiteHrefClient(): (path: string) => string {
  const [siteParam, setSiteParam] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSiteParam(params.get("site"))
  }, [])

  return (path: string) => {
    if (!siteParam) return path
    const sep = path.includes("?") ? "&" : "?"
    return `${path}${sep}site=${siteParam}`
  }
}
```

- [ ] **Step 3: Type-check, smoke test, and commit**

```bash
npx tsc --noEmit
npm run dev   # visit http://localhost:3000/browse?site=onlyfans
```

Expected: page renders with title "Meet the Fans," 8 cards in a grid, filter chips at the top. Clicking a chip filters the grid client-side. Stop the dev server.

```bash
git add src/sites/onlyfans/pages/browse.tsx src/lib/site-href-client.ts 2>/dev/null || git add src/sites/onlyfans/pages/browse.tsx
git commit -m "feat(onlyfans): implement browse page with filter chips"
```

---

## Task 22: Fan profile page (dynamic route)

**Files:** Create `src/sites/onlyfans/pages/fan-detail.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/pages/fan-detail.tsx`:

```typescript
import Image from "next/image"
import { notFound } from "next/navigation"
import { getFanBySlug } from "../data/fans"
import { SubscribeButton } from "../components/SubscribeButton"
import { TipButton } from "../components/TipButton"
import { LockedThumbnail } from "../components/LockedThumbnail"
import { ToastContainer } from "../components/Toast"

interface FanDetailProps {
  slug: string
}

export default function FanDetail({ slug }: FanDetailProps) {
  const fan = getFanBySlug(slug)
  if (!fan) notFound()

  return (
    <>
      <ToastContainer />

      {fan.warningLabel && (
        <div className="bg-[#FF7A59] text-white text-center text-xs font-bold uppercase tracking-wide py-2 px-4">
          ⚠ {fan.warningLabel}
        </div>
      )}

      {/* Cover banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-[#00AFF0] to-[#0095CD]">
        <Image
          src={fan.coverImage}
          alt={`${fan.name} cover`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Profile header */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="-mt-12 md:-mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white bg-slate-200 shadow-md">
              <Image src={fan.avatarImage} alt={fan.name} fill sizes="128px" className="object-cover" />
            </div>
            <div className="pb-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] flex items-center gap-2">
                {fan.name}
                <span className="text-[#00AFF0]" aria-hidden>●</span>
              </h1>
              <p className="text-sm text-slate-500">
                {fan.handle} · {fan.location}
              </p>
              <p className="text-xs text-slate-500">
                {fan.fanType} · {fan.subscriberCount.toLocaleString()} subscribers
              </p>
            </div>
          </div>
          <div className="md:pb-2">
            <SubscribeButton fanSlug={fan.slug} fanName={fan.name} monthlyPrice={fan.monthlyPrice} size="lg" />
          </div>
        </div>

        {/* Bio */}
        <p className="mt-6 text-slate-700 leading-relaxed max-w-2xl">{fan.bio}</p>

        {/* Posts */}
        <div className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Posts ({fan.posts.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fan.posts.map((post, idx) => (
              <LockedThumbnail
                key={idx}
                fanSlug={fan.slug}
                image={post.image}
                caption={post.caption}
                locked={post.locked}
              />
            ))}
          </div>
        </div>

        {/* Tip menu */}
        <div className="mt-10 mb-16 border border-slate-200 rounded-xl p-5 bg-slate-50">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#FF7A59] mb-3">★ Tip Menu</div>
          <ul className="space-y-3">
            {fan.tipMenu.map((tip, idx) => (
              <li key={idx} className="flex items-center justify-between gap-4 text-sm text-slate-700">
                <span>
                  <strong className="text-[#0F172A]">${tip.amount}</strong> — {tip.description}
                </span>
                <TipButton fanName={fan.name} amount={tip.amount} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/pages/fan-detail.tsx && \
git commit -m "feat(onlyfans): implement fan profile page"
```

(Smoke test happens after Task 28 wires up the dynamic route in the barrel.)

---

## Task 23: How It Works page

**Files:** Create `src/sites/onlyfans/pages/how-it-works.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/pages/how-it-works.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "How It Works — OnlyFans",
  description: "How to find a fan, subscribe, and start enjoying premium airflow content.",
}

export default async function OnlyFansHowItWorks() {
  const siteHref = await getSiteHref()
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A]">How it works</h1>
          <p className="mt-3 text-slate-600">A quick guide to getting the most out of your OnlyFans subscriptions.</p>
        </div>

        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mt-10">
          <Image src="/sites/onlyfans/how-it-works.png" alt="Three steps illustrated" fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
        </div>

        <div className="mt-12 space-y-10">
          <Step n={1} title="Browse the fans">
            Every fan on our platform has been carefully selected for its airflow personality. Use the niche filters on the Meet the Fans page to find the kind of fan that matches your home — wholesome porch family, extreme industrial, luxury minimalist, or one of five other distinct categories.
          </Step>
          <Step n={2} title="Subscribe to your favorite">
            When you find a fan you like, click their Subscribe button. Each fan has their own monthly tier — from $0.99 to $24.99. After subscribing, all of their previously locked posts become visible immediately. You'll see what they've been posting all this time.
          </Step>
          <Step n={3} title="Watch them blow air">
            That's the platform. Each fan posts new airflow content as it occurs to them — Brenda updates regularly, Mistress Oscillata releases one cycle per quarter, the Ghost in the Attic posts irregularly and often without explanation. You will receive notifications via the means available to you.
          </Step>
          <Step n={4} title="Tip generously">
            Every fan has a tip menu with custom airflow services at multiple price points. Want a personalized angle adjustment from Brenda? Tip $5. Want Big Vance to blow your hat across a parking lot? Tip $10. Your favorite fan didn't earn that personality on its own.
          </Step>
        </div>

        <div className="mt-16 text-center">
          <Link
            href={siteHref("/browse")}
            className="inline-block bg-[#00AFF0] hover:bg-[#0095CD] text-white font-bold rounded-full px-7 py-3"
          >
            Meet the Fans →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00AFF0] text-white font-extrabold flex items-center justify-center text-lg">
        {n}
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
        <p className="mt-1 text-slate-700 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/pages/how-it-works.tsx && \
git commit -m "feat(onlyfans): implement how-it-works page"
```

---

## Task 24: About page

**Files:** Create `src/sites/onlyfans/pages/about.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/pages/about.tsx`:

```typescript
import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "About — OnlyFans",
  description: "About the company behind the OnlyFans literal-fans subscription platform, and the four men responsible for it.",
}

export default function OnlyFansAbout() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] text-center">About OnlyFans</h1>
        <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
          OnlyFans was founded in 2019 by four men who really should have known better. We are an air-movement subscription platform headquartered in a respectable office park. The roster of fan creators on our platform represents the entire scope of the household and industrial airflow industry. We stand behind our product, technically.
        </p>

        <h2 className="mt-16 text-2xl font-bold text-[#0F172A] text-center">The team</h2>
        <p className="mt-2 text-center text-slate-500 text-sm">Subject to change at any time.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {executives.map((exec) => (
            <div key={exec.slug} className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden bg-slate-200">
                <Image src={exec.image} alt={exec.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#0F172A]">{exec.name}</div>
                <div className="text-xs text-[#0095CD] font-semibold uppercase tracking-wide">{exec.title}</div>
                <p className="mt-2 text-sm text-slate-700">{exec.bio}</p>
                <p className="mt-2 text-xs italic text-slate-500">&ldquo;{exec.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-sm text-slate-600">
            We stand behind the OnlyFans platform with the full and visible support of every member of our leadership team. They will not, however, return your phone calls.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/pages/about.tsx && \
git commit -m "feat(onlyfans): implement about page with ashamed execs"
```

---

## Task 25: Testimonials page

**Files:** Create `src/sites/onlyfans/pages/testimonials.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/pages/testimonials.tsx`:

```typescript
import Image from "next/image"
import { testimonials } from "../data/testimonials"

export const metadata = {
  title: "Testimonials — OnlyFans",
  description: "What our subscribers say about their favorite fans.",
}

export default function OnlyFansTestimonials() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] text-center">What our subscribers say</h1>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          Real airflow appreciation, in their own words.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.title}</div>
                </div>
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
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
git add src/sites/onlyfans/pages/testimonials.tsx && \
git commit -m "feat(onlyfans): implement testimonials page"
```

---

## Task 26: Contact page

**Files:** Create `src/sites/onlyfans/pages/contact.tsx`

- [ ] **Step 1: Create the file**

Create `src/sites/onlyfans/pages/contact.tsx`:

```typescript
import Image from "next/image"

export const metadata = {
  title: "Contact — OnlyFans",
  description: "Contact the OnlyFans team. Please be respectful when contacting a fan's representation.",
}

export default function OnlyFansContact() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] text-center">Contact us</h1>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          Our four-person executive team is here to help. They are usually here, mostly on accident.
        </p>

        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mt-10 bg-slate-100">
          <Image
            src="/sites/onlyfans/contact-conference.png"
            alt="Four executives in a conference room, visibly ashamed"
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="font-bold text-[#0F172A]">Contact a fan's representation</h2>
            <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Which fan?"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <textarea
                placeholder="Reason for contact (please be respectful)"
                rows={4}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <button
                type="button"
                className="w-full bg-slate-200 text-slate-500 font-bold rounded-full py-2 cursor-not-allowed"
                disabled
              >
                Form temporarily unavailable
              </button>
            </form>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="font-bold text-[#0F172A]">Office hours</h2>
            <p className="mt-2 text-sm text-slate-700">
              We are usually here, mostly on accident. If a member of our team picks up, please feel free to discuss anything other than the platform.
            </p>
            <h2 className="mt-6 font-bold text-[#0F172A]">Press inquiries</h2>
            <p className="mt-2 text-sm text-slate-700">
              We do not currently have a press contact. We have asked Bill to handle press inquiries on a rotating basis. He has declined.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] text-slate-400">
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
git add src/sites/onlyfans/pages/contact.tsx && \
git commit -m "feat(onlyfans): implement contact page"
```

---

## Task 27: Privacy and Terms pages

**Files:**
- Create: `src/sites/onlyfans/pages/privacy.tsx`
- Create: `src/sites/onlyfans/pages/terms.tsx`

- [ ] **Step 1: Create the privacy page**

Create `src/sites/onlyfans/pages/privacy.tsx`:

```typescript
export const metadata = {
  title: "Privacy Policy — OnlyFans",
  description: "How OnlyFans handles your data. Spoiler: we mostly track which fans you like.",
}

export default function OnlyFansPrivacy() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#0F172A]">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-[#00AFF0] bg-[#00AFF0]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#0F172A] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-slate-700">
            The authoritative privacy policy for all Specific Industries properties — including OnlyFans — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#0095CD]">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-slate-500">Last updated: shortly after our last quarterly board meeting, which Bill did not attend.</p>

        <h2 className="mt-8 text-xl font-bold text-[#0095CD]">1. What We Collect</h2>
        <p className="mt-2 text-slate-700">
          We collect your favorite fans, your preferred oscillation patterns, your average tip generosity, and the ambient room temperature at the time of viewing. We do not collect anything else of any consequence.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#0095CD]">2. How We Use Your Data</h2>
        <p className="mt-2 text-slate-700">
          Your data is used to recommend other fans you might enjoy and to send you the occasional email reminding you that Brenda has posted again. That is the entire scope of our use.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#0095CD]">3. Cookies</h2>
        <p className="mt-2 text-slate-700">
          We use cookies to remember which fans you have subscribed to. The cookies are stored on your device and are not transmitted to anyone, including the fans themselves, who would not know what to do with them.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#0095CD]">4. Your Rights</h2>
        <p className="mt-2 text-slate-700">
          You may unsubscribe from any fan at any time by clearing your browser's local storage. The fans will not take it personally. They are fans.
        </p>

        <p className="mt-10 text-sm italic text-slate-500 pt-4 border-t border-slate-200">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-[#0095CD]">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the terms page**

Create `src/sites/onlyfans/pages/terms.tsx`:

```typescript
export const metadata = {
  title: "Terms of Use — OnlyFans",
  description: "The terms governing your use of the OnlyFans literal-fans subscription platform.",
}

export default function OnlyFansTerms() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#0F172A]">Terms of Use</h1>

        <div className="mt-6 border-l-4 border-[#00AFF0] bg-[#00AFF0]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#0F172A] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-slate-700">
            The authoritative terms of use for all Specific Industries properties — including OnlyFans — are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="underline font-bold text-[#0095CD]">specificindustries.com/terms</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <h2 className="mt-8 text-xl font-bold text-[#0095CD]">1. Subscriber Conduct</h2>
        <p className="mt-2 text-slate-700">
          By subscribing to a fan, you agree to treat that fan with the respect any household appliance is owed. You may not record, redistribute, or otherwise exploit any fan's posted airflow content for commercial purposes.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#0095CD]">2. Restrictions on Industrial Equipment</h2>
        <p className="mt-2 text-slate-700">
          Subscribers to Big Vance agree not to attempt to bring an 80,000 CFM industrial wind tunnel into a shared apartment building, condominium, or other residence with neighbors. We reserve the right to revoke Big Vance subscriptions in jurisdictions that have already done so.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#0095CD]">3. Tip Refunds</h2>
        <p className="mt-2 text-slate-700">
          All tips are final. The fans do not check their accounts and would not know how to issue a refund if they did. Please tip thoughtfully.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#0095CD]">4. The Ghost in the Attic Clause</h2>
        <p className="mt-2 text-slate-700">
          Subscribers to The Ghost in the Attic acknowledge that they may never see the fan, may never receive a notification, and may begin to question whether the fan exists at all. This is part of the experience and is not a violation of these terms.
        </p>

        <p className="mt-10 text-sm italic text-slate-500 pt-4 border-t border-slate-200">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/terms" className="underline text-[#0095CD]">specificindustries.com/terms</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/pages/privacy.tsx src/sites/onlyfans/pages/terms.tsx && \
git commit -m "feat(onlyfans): implement privacy and terms pages"
```

---

## Task 28: Wire all pages and dynamic route into the index barrel

**Files:** Modify `src/sites/onlyfans/index.ts`

- [ ] **Step 1: Replace the entire file**

Replace `src/sites/onlyfans/index.ts` with:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getFanBySlug } from "./data/fans"

import OnlyFansHome from "./pages/home"
import OnlyFansBrowse, { metadata as browseMetadata } from "./pages/browse"
import OnlyFansHowItWorks, { metadata as howItWorksMetadata } from "./pages/how-it-works"
import OnlyFansAbout, { metadata as aboutMetadata } from "./pages/about"
import OnlyFansTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import OnlyFansContact, { metadata as contactMetadata } from "./pages/contact"
import OnlyFansPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import OnlyFansTerms, { metadata as termsMetadata } from "./pages/terms"
import FanDetail from "./pages/fan-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": OnlyFansHome,
  "browse": { component: OnlyFansBrowse, metadata: browseMetadata },
  "how-it-works": { component: OnlyFansHowItWorks, metadata: howItWorksMetadata },
  "about": { component: OnlyFansAbout, metadata: aboutMetadata },
  "testimonials": { component: OnlyFansTestimonials, metadata: testimonialsMetadata },
  "contact": { component: OnlyFansContact, metadata: contactMetadata },
  "privacy": { component: OnlyFansPrivacy, metadata: privacyMetadata },
  "terms": { component: OnlyFansTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  browse: {
    component: FanDetail,
    getMetadata: (slug: string) => {
      const fan = getFanBySlug(slug)
      return fan
        ? { title: `${fan.name} — OnlyFans`, description: fan.bio }
        : undefined
    },
    isValidSlug: (slug: string) => !!getFanBySlug(slug),
  },
}
```

- [ ] **Step 2: Update the registry to include dynamicRoutes**

Modify `src/sites/registry.ts`. Change the OnlyFans import line to include `dynamicRoutes`:

```typescript
import { config as onlyfansConfig, pages as onlyfansPages, dynamicRoutes as onlyfansDynamicRoutes } from "./onlyfans"
```

And update the registry entry:

```typescript
  onlyfans: { config: onlyfansConfig, pages: onlyfansPages, dynamicRoutes: onlyfansDynamicRoutes },
```

- [ ] **Step 3: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlyfans/index.ts src/sites/registry.ts && \
git commit -m "feat(onlyfans): wire all pages and /browse/[slug] dynamic route"
```

---

## Task 29: Build verification and full smoke test

**Why:** Final pass — type-check, lint, production build, and a manual click-through of every page including the subscribe-unlock interaction.

- [ ] **Step 1: Type-check the whole repo**

Run: `npx tsc --noEmit`
Expected: clean exit, no errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: zero warnings or errors in any `src/sites/onlyfans/**` or modified file.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds. The route table in the build output should include the catch-all route. No "Image with src ... not found" warnings for the OnlyFans assets.

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev`

Visit each URL and verify the listed expectations. **Critical: when you reach the fan profile page, click Subscribe and confirm the locked thumbnails on the same page visibly unlock without a refresh.**

| URL | Expected |
|---|---|
| `http://localhost:3000/?site=onlyfans` | Cyan home page with hero, 4 featured fan cards, how-it-works section, 3 testimonials, CTA band |
| `http://localhost:3000/browse?site=onlyfans` | Page titled "Meet the Fans," 8 fan cards, filter chips at top. Click each chip and confirm filtering works. |
| `http://localhost:3000/browse/brenda?site=onlyfans` | Brenda's profile: cover banner, avatar, name + handle + subscriber count, Subscribe button, bio, 6-post grid (first 2 visible, last 4 blurred with 🔒), tip menu. **Click Subscribe — the 4 locked posts should immediately unblur and the toast should appear.** Refresh the page — Brenda should still show "✓ SUBSCRIBED" and the posts should still be unlocked. |
| `http://localhost:3000/browse/vance?site=onlyfans` | Big Vance's profile, with the orange "EXTREME" warning banner at the top |
| `http://localhost:3000/browse/oscillata?site=onlyfans` | Mistress Oscillata's profile renders correctly |
| `http://localhost:3000/browse/reginald?site=onlyfans` | Sir Reginald's profile renders correctly |
| `http://localhost:3000/browse/aerovolt?site=onlyfans` | AeroVolt 9000 profile renders correctly |
| `http://localhost:3000/browse/lil-buzz?site=onlyfans` | Lil' Buzz profile renders correctly |
| `http://localhost:3000/browse/ghost?site=onlyfans` | Ghost in the Attic profile renders correctly |
| `http://localhost:3000/browse/whirrcore?site=onlyfans` | WhirrCore_42 profile renders correctly |
| `http://localhost:3000/browse/nonexistent?site=onlyfans` | 404 page |
| `http://localhost:3000/how-it-works?site=onlyfans` | 4-step explainer page |
| `http://localhost:3000/about?site=onlyfans` | 4 cringing exec cards, Bill Hatcher listed first |
| `http://localhost:3000/testimonials?site=onlyfans` | 8 testimonial cards in a 2-column grid |
| `http://localhost:3000/contact?site=onlyfans` | Contact page with the conference image, fake form, and `bsambrone@gmail.com` in small print at the bottom |
| `http://localhost:3000/privacy?site=onlyfans` | Privacy page with umbrella callout at top |
| `http://localhost:3000/terms?site=onlyfans` | Terms page with umbrella callout at top |

- [ ] **Step 5: Verify the tip button fires a toast**

On any fan profile page (e.g., Brenda), click any TIP button in the tip menu. A toast should appear at the bottom of the screen reading "Thanks for the $5 tip! Brenda has been notified." (or the relevant amount/name). The toast should fade after ~3.5 seconds.

- [ ] **Step 6: Verify the footer disclaimer link**

On any OnlyFans page, scroll to the footer and confirm there is a "Disclaimer" link that points to `https://specificindustries.com/disclaimer`. This is provided by the shared `Footer` component automatically — no per-site code needed.

- [ ] **Step 7: Stop the dev server and make a final empty commit marking completion (optional)**

```bash
git log --oneline | head -30   # eyeball the OnlyFans commits
```

The implementation is complete when every URL in Step 4 renders correctly and the subscribe-unlock interaction works.

---

## Self-Review Summary

**Spec coverage check:**

| Spec section | Implemented in |
|---|---|
| Architecture (`src/sites/onlyfans/`, no commerce, registry wiring) | Tasks 11, 28 |
| Page set (Home, Browse, Fan Detail, How It Works, About, Testimonials, Contact, Privacy, Terms) | Tasks 11, 20–27 |
| Theme (cyan #00AFF0, coral accent, Inter) | Task 11 |
| Roster (8 fans with personality, niche, price) | Task 12 |
| Data shapes (Fan, FanPost, TipMenuItem, Executive) | Tasks 12, 13 |
| Home page detail (hero, featured strip, how it works preview, testimonials, CTA) | Task 20 |
| Browse with "Meet the Fans" label and filter chips | Task 21 |
| Fan profile (cover, header, bio, locked grid, tip menu, warning label) | Task 22 |
| How It Works onboarding | Task 23 |
| About with 4 cringing execs, Bill always founder | Tasks 9, 13, 24 |
| Testimonials reusing shared portrait library | Task 14, 25 |
| Contact with `bsambrone@gmail.com` in small print | Task 26 |
| Privacy/Terms with umbrella callout matching mousetrapjenga pattern | Task 27 |
| `<SubscribeButton>` writes localStorage, fires events, real-time unlock | Task 16 |
| `<TipButton>` fires toasts | Task 17 |
| `<LockedThumbnail>` blur + lock icon, listens for subscribed event | Task 18 |
| `<Toast>` self-contained (no commerce dependency) | Task 15 |
| `<FanCard>` for browse + featured strip | Task 19 |
| Image generation via MCP, base-image-then-variations strategy | Tasks 1–10 |
| Random exec names (Bill = founder) | Tasks 9, 13 |
| Shared `Footer` link to apex disclaimer (no custom inline disclaimer) | Verified in Task 29 Step 6 |
| `features.commerce: false` (no cart wiring) | Task 11 |
| Constraints: no new App Router routes, no new fonts, no new shared components | All tasks |

**Type consistency check:**

- `Fan.posts: FanPost[]` (Task 12) — consumed correctly in `LockedThumbnail` (Task 18) and `fan-detail.tsx` (Task 22).
- `Fan.tipMenu: TipMenuItem[]` — consumed in `fan-detail.tsx` Tip Menu section.
- `SubscribeButton` props `(fanSlug, fanName, monthlyPrice, size)` — used consistently in Tasks 19 (FanCard) and 22 (fan-detail).
- `TipButton` props `(fanName, amount)` — used consistently in Task 22.
- `LockedThumbnail` props `(fanSlug, image, caption, locked)` — match the `FanPost` interface field names in Task 12.
- `isSubscribed` and `ONLYFANS_SUBSCRIBED_EVENT` exported from `SubscribeButton` (Task 16) and imported by `LockedThumbnail` (Task 18).
- `fireToast` and `ToastContainer` exported from `Toast` (Task 15) and imported by `SubscribeButton` (16), `TipButton` (17), and the pages (20–22).
- `homepageFeaturedFans` exported from `data/fans.ts` (Task 12) and imported by `home.tsx` (Task 20).
- `homepageTestimonials` exported from `data/testimonials.ts` (Task 14) and imported by `home.tsx` (Task 20).

**Placeholder scan:** None remain. All file paths are explicit, all code blocks are complete, all task descriptions reference real types and functions defined elsewhere in the plan.

**Known cross-cutting note flagged in the spec:** Fan reference base images are stored in `mcp/image-gen/base-images/{fan-slug}/` alongside the existing four real-person folders (`bill`, `brandon`, `jim`, `sean`). This mixes fan and human reference folders in the same directory. Acceptable trade-off because it requires no MCP changes.


