# OnlyPans (Literal Pans) Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new satirical subdomain `onlypans.specificindustries.com` — a hostile-competitor parody of OnlyFans where subscribers look at motionless pans. 8 pan "creators" with real-brand visual references (Lodge/Stargazer/Smithey for three of them), a home-page "Why we're better than those people with the fans" rant, and a fresh four-exec team framed as "left the airflow industry."

**Architecture:** Next.js 15 App Router site under `src/sites/onlypans/`, registered in the catch-all router. **No commerce wiring** (`features.commerce: false`). The five site-local components (Toast, SubscribeButton, TipButton, LockedThumbnail, PanCard) are copied from OnlyFans with a pan/fan rename and separate event/storage keys. Image generation uses the existing `mcp/image-gen/` MCP with the base-image-then-variation pipeline validated during the OnlyFans build.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Inter font (already in `fontFamilyMap`), `mcp__image-gen__generate_image` (text-to-image) and `mcp__image-gen__generate_image_with_person` (img-to-img via reference photos).

**Reference spec:** `docs/superpowers/specs/2026-04-10-onlypans-site-design.md`

**Also reference:** `docs/superpowers/specs/2026-04-10-onlyfans-site-design.md` and `src/sites/onlyfans/` — the spec explicitly defers to OnlyFans as the source of truth for all shared architecture. Any engineer executing this plan should be able to glance at the OnlyFans source tree for pattern context.

**No unit test framework exists in this repo.** Verification is `npx tsc --noEmit`, `npm run lint`, and `npm run build`. Each code task ends with a type-check + commit.

**Fixes baked in from the OnlyFans build:**
- Image-gen paths are `base-images/{slug}/` and `generated-images/` at the **project root** (not under `mcp/image-gen/`). Both directories are gitignored — only the moved-to-`public/` copies get committed.
- Components that read `localStorage` and listen for `window` events use `useSyncExternalStore`, NOT the `useEffect + setMounted(true)` anti-pattern (which trips `react-hooks/set-state-in-effect`).
- The fan/pan profile page renders the avatar popped up into the banner but the name/bio/subscribe row sits **entirely below** the cover banner (no overlap, no clipping).
- The contact page uses a 4-up grid of individual exec portraits, not a blended conference-table shot.
- Forms in server components must NOT have `onSubmit` handlers (Next.js 16 rejects event handlers on server-rendered DOM elements).
- All JSX text with apostrophes uses `&apos;` instead of a bare `'`.
- `src/app/sitemap.ts`, `scripts/resize-favicons.mjs`, `src/sites/registry.ts`, and `src/sites/subdomains.ts` all need explicit updates — none of them are auto-discovered.

---

## File Map

### New files

```
docs/superpowers/plans/2026-04-10-onlypans-implementation.md     # this file
src/sites/onlypans/config.ts                                     # site config (molten copper theme)
src/sites/onlypans/index.ts                                      # barrel: config, pages, dynamicRoutes
src/sites/onlypans/data/pans.ts                                  # 8 Pan creators
src/sites/onlypans/data/leadership.ts                            # 4 execs (Pennington/Holloway/Beckwith/Rowe)
src/sites/onlypans/data/testimonials.ts                          # 8 pan-themed testimonials
src/sites/onlypans/components/Toast.tsx                          # window-event toast container
src/sites/onlypans/components/SubscribeButton.tsx                # useSyncExternalStore, writes onlypans-subscriptions
src/sites/onlypans/components/TipButton.tsx                      # fires onlypans-toast events
src/sites/onlypans/components/LockedThumbnail.tsx                # uses useIsSubscribed hook from SubscribeButton
src/sites/onlypans/components/PanCard.tsx                        # browse grid card (renamed from FanCard)
src/sites/onlypans/pages/home.tsx                                # hero + featured + "Why we're better" rant + how-it-works preview + testimonials + CTA
src/sites/onlypans/pages/browse.tsx                              # "Meet the Pans" with filter chips
src/sites/onlypans/pages/pan-detail.tsx                          # dynamic route /browse/[slug]
src/sites/onlypans/pages/how-it-works.tsx                        # 4-step explainer with airflow jabs
src/sites/onlypans/pages/about.tsx                               # hostile-competitor founder story + 4 execs
src/sites/onlypans/pages/testimonials.tsx                        # 8 shared-portrait testimonials
src/sites/onlypans/pages/contact.tsx                             # 4-up exec grid, real email in small print
src/sites/onlypans/pages/privacy.tsx                             # umbrella callout + satirical body
src/sites/onlypans/pages/terms.tsx                               # umbrella callout + satirical body
base-images/{slug}/base.png × 8                                  # staged reference photos (untracked — gitignored)
public/sites/onlypans/*.png                                      # ~78 generated files (committed)
```

### Modified files

```
src/sites/registry.ts          # add onlypans (with dynamicRoutes)
src/sites/subdomains.ts        # add "onlypans" to VALID_SUBDOMAINS
src/app/sitemap.ts             # import pans, emit /browse/{slug} URLs
scripts/resize-favicons.mjs    # add "onlypans" to sites array
```

---

## Image Generation Strategy

Same pipeline as OnlyFans, already validated:

- `mcp__image-gen__generate_image` for each pan's canonical base reference (text-to-image), outputs to `generated-images/` at project root
- Stage each base into `base-images/{pan-slug}/base.png` at project root (same `cwd()` resolution the existing `bill`/`brandon`/`jim`/`sean` folders use)
- `mcp__image-gen__generate_image_with_person` with `person="{pan-slug}"` for the 8 variations per pan (cover, avatar, 6 posts)
- Move finished files from `generated-images/` to `public/sites/onlypans/` with `mv`, then commit
- `base-images/` and `generated-images/` are gitignored — only the `public/` copies get committed. The committed `public/sites/onlypans/{slug}-base.png` is byte-identical to the staged base, so a fresh clone can re-prime by copying it back if needed.

**Per-pan filename convention:**
- `{slug}-base.png` (1024×1024)
- `pan-{slug}-cover.png` (1536×1024)
- `pan-{slug}-avatar.png` (1024×1024)
- `pan-{slug}-post-01.png` through `pan-{slug}-post-06.png` (1024×1024)

**Pan slugs (locked here, used by all subsequent tasks):**

| # | Slug | Display Name | Type | Real visual reference |
|---|---|---|---|---|
| 1 | `greta` | Greta | Cast Iron Skillet | Lodge |
| 2 | `cuivre` | Madame Cuivre | Hand-Hammered Copper Saucepan | generic French copper |
| 3 | `chuck` | Cheap Chuck | Non-Stick Frying Pan | generic big-box |
| 4 | `wok` | The Wok | Carbon Steel Wok | generic blackened wok |
| 5 | `ursula` | Big Ursula | Enameled Dutch Oven | cherry-red enameled |
| 6 | `stargrazer` | Stargrazer | Laser-Smoothed Cast Iron | Stargazer |
| 7 | `smithee` | Smithee | Hand-Finished Cast Iron | Smithey |
| 8 | `crepe` | Mademoiselle Crêpe | Carbon Steel Crêpe Pan | generic French crêpière |

**Exec name slugs:** `pennington` (Bill, Founder), `holloway` (Brandon), `beckwith` (Jim), `rowe` (Sean). Names are random/generic per the cross-site pattern.

---

## Task 1: Generate Greta's image set (Lodge Cast Iron Skillet)

**Why first:** Greta is the visual anchor and uses the Lodge brand reference. If the image pipeline or the real-brand referencing doesn't produce a recognizable Lodge-style skillet, we catch it on one pan before scaling to all eight.

**Files:**
- Create: `base-images/greta/base.png` (untracked)
- Create: `public/sites/onlypans/greta-base.png`
- Create: `public/sites/onlypans/pan-greta-cover.png`
- Create: `public/sites/onlypans/pan-greta-avatar.png`
- Create: `public/sites/onlypans/pan-greta-post-01.png` through `-post-06.png`

- [ ] **Step 1: Generate Greta's base reference**

Call `mcp__image-gen__generate_image`:

- `prompt`: `"Documentary-style photograph of a well-loved thick-walled American cast iron skillet with a pebbled matte cooking surface, a short stubby handle with a small hanging hole at the end, and a small pouring lip on each side. The skillet sits on a worn butcher-block farmhouse countertop beside an unlit gas burner, with a folded blue-and-white checked dish towel crumpled nearby. Warm morning window light. Photorealistic, no people, no text, single subject centered in frame. Nostalgic, quietly lived-in, slightly seasoned."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `greta-base.png`
- `quality`: `high`

- [ ] **Step 2: Stage the base into the MCP reference folder**

```bash
mkdir -p base-images/greta && \
cp generated-images/greta-base.png base-images/greta/base.png
```

- [ ] **Step 3: Generate Greta's cover banner**

Call `mcp__image-gen__generate_image_with_person`:

- `prompt`: `"Wide cinematic banner shot of the same thick-walled cast iron skillet from the reference photo, now placed on the same farmhouse butcher-block countertop but framed wider to show a row of hanging copper utensils and a sunlit kitchen window in the background. Warm morning light. Same skillet, identical model. Photorealistic, no people, no text."`
- `width`: `1536`
- `height`: `1024`
- `filename`: `pan-greta-cover.png`
- `person`: `greta`
- `quality`: `high`

- [ ] **Step 4: Generate Greta's profile avatar**

Call `mcp__image-gen__generate_image_with_person`:

- `prompt`: `"Tight square portrait of the same thick-walled cast iron skillet from the reference, photographed top-down so the entire pebbled cooking surface fills the frame. Warm soft light, gentle shadow at one edge, clean composition like a product hero shot. Same skillet, identical model. Photorealistic, no people, no text."`
- `width`: `1024`
- `height`: `1024`
- `filename`: `pan-greta-avatar.png`
- `person`: `greta`
- `quality`: `high`

- [ ] **Step 5: Generate Greta's 6 post images**

Call `mcp__image-gen__generate_image_with_person` six times. Use `width: 1024`, `height: 1024`, `person: "greta"`, `quality: "high"` for each.

Post 01 — `pan-greta-post-01.png`:
> `"The same thick-walled cast iron skillet from the reference, photographed in morning window light on a clean farmhouse counter, freshly seasoned with a glossy sheen of oil. Three-quarter angle. Photorealistic, no people, no text."`

Post 02 — `pan-greta-post-02.png`:
> `"The same cast iron skillet from the reference, photographed just after being scrubbed, matte surface slightly damp, single droplet of water visible. Same counter, same soft morning light. Photorealistic, no people, no text."`

Post 03 — `pan-greta-post-03.png`:
> `"The same cast iron skillet from the reference, resting on a cold unlit gas stovetop, photographed from a low angle. Cool indirect light. Photorealistic, no people, no text."`

Post 04 — `pan-greta-post-04.png`:
> `"The same cast iron skillet from the reference, held up to a kitchen window so the light catches the pebbled cooking surface. Backlit with warm golden tones. Photorealistic, no hands, no people, no text."`

Post 05 — `pan-greta-post-05.png`:
> `"The same cast iron skillet from the reference, flipped upside down on a clean wooden counter so the underside and the cast-in maker's mark area are visible (no readable text or branding). Soft even studio light. Photorealistic, no people."`

Post 06 — `pan-greta-post-06.png`:
> `"The same cast iron skillet from the reference, photographed in extreme close-up focusing on the short stubby handle and the small hanging hole at the end. Shallow depth of field, warm light. Photorealistic, no people, no text."`

- [ ] **Step 6: Move all 9 generated files to public/sites/onlypans/**

```bash
mkdir -p public/sites/onlypans && \
mv generated-images/greta-base.png \
   generated-images/pan-greta-cover.png \
   generated-images/pan-greta-avatar.png \
   generated-images/pan-greta-post-01.png \
   generated-images/pan-greta-post-02.png \
   generated-images/pan-greta-post-03.png \
   generated-images/pan-greta-post-04.png \
   generated-images/pan-greta-post-05.png \
   generated-images/pan-greta-post-06.png \
   public/sites/onlypans/
```

- [ ] **Step 7: Verify files are in place**

Run: `ls public/sites/onlypans/ | grep -c greta`
Expected output: `9`

- [ ] **Step 8: Commit**

```bash
git add public/sites/onlypans/greta-base.png \
        public/sites/onlypans/pan-greta-cover.png \
        public/sites/onlypans/pan-greta-avatar.png \
        public/sites/onlypans/pan-greta-post-*.png && \
git commit -m "feat(onlypans): generate Greta image set (Lodge cast iron)"
```

---

## Task 2: Generate remaining 7 pans (Cuivre → Crêpe)

**Why:** Pipeline is validated on Greta. This task bundles the other 7 pans sequentially — each one follows the same 8-step pattern as Task 1. Each pan ends with its own commit.

**Files:** For each of the 7 pans: `base-images/{slug}/base.png` (untracked) + 9 files under `public/sites/onlypans/` matching the `{slug}-base.png` / `pan-{slug}-*.png` convention.

### Task 2a: Madame Cuivre (Copper Saucepan)

- [ ] **Step 1: Generate base**

`mcp__image-gen__generate_image`:

- `prompt`: `"Editorial product photograph of a hand-hammered unlined copper saucepan, 18cm, with a cast brass handle riveted to the body and a subtle dimpled texture across the exterior from hand-hammering. Sitting on a dark slate surface with a single sprig of thyme nearby, photographed in warm French kitchen lighting with a soft gallery-style falloff into shadow. Single subject centered. Photorealistic, no people, no text."`
- `width: 1024`, `height: 1024`, `filename: "cuivre-base.png"`, `quality: "high"`

- [ ] **Step 2: Stage base**

```bash
mkdir -p base-images/cuivre && \
cp generated-images/cuivre-base.png base-images/cuivre/base.png
```

- [ ] **Step 3: Cover (1536×1024, person: cuivre, filename: pan-cuivre-cover.png)**

> `"Wide editorial banner of the same hand-hammered copper saucepan from the reference, on the same dark slate counter but framed wider to show a rustic French kitchen with whitewashed walls and dried lavender in the deep background. Warm candle-adjacent light. Same saucepan, identical model. Photorealistic, no people, no text."`

- [ ] **Step 4: Avatar (1024×1024, person: cuivre, filename: pan-cuivre-avatar.png)**

> `"Tight square portrait of the same hand-hammered copper saucepan from the reference, photographed top-down so the dimpled hammered interior fills the frame. Warm golden light catching each hammer mark. Same saucepan, identical model. Photorealistic, no people."`

- [ ] **Step 5: 6 posts (1024×1024, person: cuivre)**

Post 01 — `pan-cuivre-post-01.png`:
> `"The same hand-hammered copper saucepan from the reference, in three-quarter profile on the dark slate surface, a single drop of olive oil pooling at the bottom inside. Warm late-afternoon light. Photorealistic, no people."`

Post 02 — `pan-cuivre-post-02.png`:
> `"The same copper saucepan from the reference, photographed against a deep-charcoal linen backdrop in studio light. Gallery product style. Photorealistic, no people."`

Post 03 — `pan-cuivre-post-03.png`:
> `"The same copper saucepan from the reference, hanging from a wrought-iron pot rack with the cast brass handle in profile. Soft French kitchen light. Photorealistic, no people."`

Post 04 — `pan-cuivre-post-04.png`:
> `"The same copper saucepan from the reference, close-up of the brass handle rivets and the transition between the brass and the hammered copper body. Shallow depth of field. Photorealistic, no people."`

Post 05 — `pan-cuivre-post-05.png`:
> `"The same copper saucepan from the reference, bottom-up view showing the exterior curve of the hammered body. Clean studio lighting against a warm cream backdrop. Photorealistic, no people."`

Post 06 — `pan-cuivre-post-06.png`:
> `"The same copper saucepan from the reference, photographed at dawn on the dark slate counter with a single shaft of cool morning light catching one side of the hammered copper. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv generated-images/cuivre-base.png \
   generated-images/pan-cuivre-cover.png \
   generated-images/pan-cuivre-avatar.png \
   generated-images/pan-cuivre-post-01.png \
   generated-images/pan-cuivre-post-02.png \
   generated-images/pan-cuivre-post-03.png \
   generated-images/pan-cuivre-post-04.png \
   generated-images/pan-cuivre-post-05.png \
   generated-images/pan-cuivre-post-06.png \
   public/sites/onlypans/

ls public/sites/onlypans/ | grep -c cuivre   # expect 9
git add public/sites/onlypans/cuivre-base.png public/sites/onlypans/pan-cuivre-*.png && \
git commit -m "feat(onlypans): generate Madame Cuivre image set (Copper Saucepan)"
```

### Task 2b: Cheap Chuck (Non-Stick Frying Pan)

- [ ] **Step 1: Generate base**

`mcp__image-gen__generate_image`:

- `prompt`: `"Photograph of a generic mass-market non-stick aluminum frying pan, 10 inches, with a black Teflon-coated cooking surface, a loop-shaped black plastic handle, and slightly scuffed exterior. Sitting on a generic white kitchen counter in a small apartment, under cool overhead fluorescent light. A crumpled receipt is visible at the edge of the counter. Single subject centered. Photorealistic, no people, no readable text."`
- `width: 1024`, `height: 1024`, `filename: "chuck-base.png"`, `quality: "high"`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/chuck && \
cp generated-images/chuck-base.png base-images/chuck/base.png
```

- [ ] **Step 3: Cover (1536×1024, person: chuck, filename: pan-chuck-cover.png)**

> `"Wide banner of the same generic non-stick frying pan from the reference, on the same small-apartment counter framed wider to show a row of cheerful yellow sticky notes stuck to the wall above, a half-full coffee maker, and a small succulent. Cool overhead light with a warm cheerful feel despite everything. Same pan, identical model. Photorealistic, no people."`

- [ ] **Step 4: Avatar (1024×1024, person: chuck, filename: pan-chuck-avatar.png)**

> `"Tight square top-down portrait of the same non-stick frying pan from the reference, the black Teflon cooking surface filling the frame with the loop handle poking out one side. Even cool light. Same pan, identical model. Photorealistic, no people."`

- [ ] **Step 5: 6 posts (1024×1024, person: chuck)**

Post 01 — `pan-chuck-post-01.png`:
> `"The same non-stick frying pan from the reference, three-quarter angle on the counter with a tiny bit of butter just starting to melt in the center. Cheerful morning apartment light. Photorealistic, no people."`

Post 02 — `pan-chuck-post-02.png`:
> `"The same non-stick frying pan from the reference, empty and clean, photographed beside a cup of instant ramen on the same counter. Photorealistic, no people."`

Post 03 — `pan-chuck-post-03.png`:
> `"The same non-stick frying pan from the reference, hanging on a stick-on command hook mounted to the apartment wall. Photorealistic, no people."`

Post 04 — `pan-chuck-post-04.png`:
> `"The same non-stick frying pan from the reference, close-up of the slightly scuffed black Teflon coating showing a few small scratches. Cool overhead light. Photorealistic, no people."`

Post 05 — `pan-chuck-post-05.png`:
> `"The same non-stick frying pan from the reference, balanced inside a small apartment sink next to a single dirty fork. Photorealistic, no people."`

Post 06 — `pan-chuck-post-06.png`:
> `"The same non-stick frying pan from the reference, sitting proudly on a dollar-store drying rack beside a plastic spatula. Late-evening overhead light. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv generated-images/chuck-base.png \
   generated-images/pan-chuck-cover.png \
   generated-images/pan-chuck-avatar.png \
   generated-images/pan-chuck-post-01.png \
   generated-images/pan-chuck-post-02.png \
   generated-images/pan-chuck-post-03.png \
   generated-images/pan-chuck-post-04.png \
   generated-images/pan-chuck-post-05.png \
   generated-images/pan-chuck-post-06.png \
   public/sites/onlypans/

ls public/sites/onlypans/ | grep -c chuck   # expect 9
git add public/sites/onlypans/chuck-base.png public/sites/onlypans/pan-chuck-*.png && \
git commit -m "feat(onlypans): generate Cheap Chuck image set (Non-Stick Frying Pan)"
```

### Task 2c: The Wok (Carbon Steel Wok)

- [ ] **Step 1: Generate base**

`mcp__image-gen__generate_image`:

- `prompt`: `"Atmospheric photograph of a deeply seasoned 14-inch carbon steel wok with a long wooden handle, the interior blackened and patinated from twenty years of use. Sitting on a dark wooden kitchen table in a dimly lit space with a single warm overhead lamp creating a pool of light over it. Mysterious, philosophical mood. Single subject centered. Photorealistic, no people, no text."`
- `width: 1024`, `height: 1024`, `filename: "wok-base.png"`, `quality: "high"`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/wok && \
cp generated-images/wok-base.png base-images/wok/base.png
```

- [ ] **Step 3: Cover (1536×1024, person: wok, filename: pan-wok-cover.png)**

> `"Wide atmospheric banner of the same seasoned carbon steel wok from the reference, framed on a wider dark wooden table with a single chopstick resting beside it and a small stack of rice bowls in deep background shadow. Single pool of warm overhead light. Same wok, identical model. Photorealistic, no people."`

- [ ] **Step 4: Avatar (1024×1024, person: wok, filename: pan-wok-avatar.png)**

> `"Tight square top-down portrait of the same carbon steel wok from the reference, the deeply blackened patinated interior filling the frame. Single warm overhead light. Same wok, identical model. Photorealistic, no people."`

- [ ] **Step 5: 6 posts (1024×1024, person: wok)**

Post 01 — `pan-wok-post-01.png`:
> `"The same carbon steel wok from the reference, three-quarter angle on the dark wooden table, single drop of sesame oil glistening at the bottom. Warm pool of light, deep surrounding shadow. Photorealistic, no people."`

Post 02 — `pan-wok-post-02.png`:
> `"The same carbon steel wok from the reference, side profile showing the long wooden handle extending out of the frame. Low atmospheric light. Photorealistic, no people."`

Post 03 — `pan-wok-post-03.png`:
> `"The same carbon steel wok from the reference, resting on a round bamboo wok ring on the dark table. Dim ambient light. Photorealistic, no people."`

Post 04 — `pan-wok-post-04.png`:
> `"The same carbon steel wok from the reference, close-up of the transition between the blackened patinated interior and the slightly lighter carbon-steel rim. Shallow depth of field. Photorealistic, no people."`

Post 05 — `pan-wok-post-05.png`:
> `"The same carbon steel wok from the reference, bottom-up view showing the round base and a faint heat-discoloration ring. Single overhead light. Photorealistic, no people."`

Post 06 — `pan-wok-post-06.png`:
> `"The same carbon steel wok from the reference, photographed at night with only moonlight through a single window providing a cool blue rim-light on one side of the rim. Mysterious. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv generated-images/wok-base.png \
   generated-images/pan-wok-cover.png \
   generated-images/pan-wok-avatar.png \
   generated-images/pan-wok-post-01.png \
   generated-images/pan-wok-post-02.png \
   generated-images/pan-wok-post-03.png \
   generated-images/pan-wok-post-04.png \
   generated-images/pan-wok-post-05.png \
   generated-images/pan-wok-post-06.png \
   public/sites/onlypans/

ls public/sites/onlypans/ | grep -c wok   # expect 9
git add public/sites/onlypans/wok-base.png public/sites/onlypans/pan-wok-*.png && \
git commit -m "feat(onlypans): generate The Wok image set (Carbon Steel Wok)"
```

### Task 2d: Big Ursula (Enameled Dutch Oven)

- [ ] **Step 1: Generate base**

`mcp__image-gen__generate_image`:

- `prompt`: `"Photograph of a heavy enameled cast iron Dutch oven, 7.25 quarts, with a deep cherry-red exterior, a cream-colored interior, and two sturdy side loop handles. Lid sitting askew on top, showing the cream interior of the lid as well. Placed on a weathered wooden farmhouse table under soft natural light. Single subject centered. Photorealistic, no people, no text."`
- `width: 1024`, `height: 1024`, `filename: "ursula-base.png"`, `quality: "high"`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/ursula && \
cp generated-images/ursula-base.png base-images/ursula/base.png
```

- [ ] **Step 3: Cover (1536×1024, person: ursula, filename: pan-ursula-cover.png)**

> `"Wide cinematic banner of the same cherry-red enameled Dutch oven from the reference, framed on the same wooden farmhouse table with a loaf of crusty rustic bread and a linen cloth nearby in the background. Soft golden hour light from a window. Same Dutch oven, identical model. Photorealistic, no people."`

- [ ] **Step 4: Avatar (1024×1024, person: ursula, filename: pan-ursula-avatar.png)**

> `"Tight square portrait of the same cherry-red enameled Dutch oven from the reference, photographed from slightly above three-quarters angle so the cherry-red exterior and the cream interior rim are both visible. Lid removed. Even natural light. Same Dutch oven, identical model. Photorealistic, no people."`

- [ ] **Step 5: 6 posts (1024×1024, person: ursula)**

Post 01 — `pan-ursula-post-01.png`:
> `"The same cherry-red enameled Dutch oven from the reference, lid on, photographed dead on across the farmhouse table with warm afternoon light. Photorealistic, no people."`

Post 02 — `pan-ursula-post-02.png`:
> `"The same Dutch oven from the reference, lid removed and set beside it, showing the cream-colored interior of the empty body. Soft window light. Photorealistic, no people."`

Post 03 — `pan-ursula-post-03.png`:
> `"The same Dutch oven from the reference, close-up of one of the cast iron side loop handles and the subtle thickness of the enameled wall. Shallow depth of field. Photorealistic, no people."`

Post 04 — `pan-ursula-post-04.png`:
> `"The same Dutch oven from the reference, photographed from a low angle looking up so the heavy presence feels imposing. Deep shadow behind, warm light from above. Photorealistic, no people."`

Post 05 — `pan-ursula-post-05.png`:
> `"The same Dutch oven from the reference, resting on a cold cast iron stove grate, showing the bottom of the exterior. Cool kitchen light. Photorealistic, no people."`

Post 06 — `pan-ursula-post-06.png`:
> `"The same Dutch oven from the reference, photographed at dusk on the farmhouse table with deep blue evening light coming through a window and warm interior light from a single lamp. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv generated-images/ursula-base.png \
   generated-images/pan-ursula-cover.png \
   generated-images/pan-ursula-avatar.png \
   generated-images/pan-ursula-post-01.png \
   generated-images/pan-ursula-post-02.png \
   generated-images/pan-ursula-post-03.png \
   generated-images/pan-ursula-post-04.png \
   generated-images/pan-ursula-post-05.png \
   generated-images/pan-ursula-post-06.png \
   public/sites/onlypans/

ls public/sites/onlypans/ | grep -c ursula   # expect 9
git add public/sites/onlypans/ursula-base.png public/sites/onlypans/pan-ursula-*.png && \
git commit -m "feat(onlypans): generate Big Ursula image set (Enameled Dutch Oven)"
```

### Task 2e: Stargrazer (Stargazer-style Laser-Smoothed Cast Iron)

- [ ] **Step 1: Generate base**

`mcp__image-gen__generate_image`:

- `prompt`: `"Editorial product photograph of a modern 12-inch cast iron skillet with a mirror-polished laser-smoothed cooking surface that reflects light like a satin sheen, a rimless flowing silhouette without a pouring lip, and a slim elegant modern handle that curves slightly upward at the end. Photographed on a clean white minimalist studio surface against a soft-white seamless backdrop with cool soft even lighting. Single subject centered. Minimal, modern, tech-product aesthetic. Photorealistic, no people, no text."`
- `width: 1024`, `height: 1024`, `filename: "stargrazer-base.png"`, `quality: "high"`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/stargrazer && \
cp generated-images/stargrazer-base.png base-images/stargrazer/base.png
```

- [ ] **Step 3: Cover (1536×1024, person: stargrazer, filename: pan-stargrazer-cover.png)**

> `"Wide minimalist banner of the same modern laser-smoothed cast iron skillet from the reference, framed on a wider clean white studio surface with a single minimalist white ceramic bowl and a small sprig of rosemary in the deep background. Cool soft even lighting. Same skillet, identical model. Photorealistic, no people."`

- [ ] **Step 4: Avatar (1024×1024, person: stargrazer, filename: pan-stargrazer-avatar.png)**

> `"Tight square top-down portrait of the same modern laser-smoothed cast iron skillet from the reference, the mirror-polished cooking surface filling the frame. Cool even studio light catching the satin sheen. Same skillet, identical model. Photorealistic, no people."`

- [ ] **Step 5: 6 posts (1024×1024, person: stargrazer)**

Post 01 — `pan-stargrazer-post-01.png`:
> `"The same modern laser-smoothed cast iron skillet from the reference, three-quarter angle on the white studio surface, a single drop of neutral oil pooling at the center. Cool clean studio light. Photorealistic, no people."`

Post 02 — `pan-stargrazer-post-02.png`:
> `"The same modern cast iron skillet from the reference, photographed in side profile against a pure white backdrop so the rimless flowing silhouette and the slim upward-curving handle are clearly visible. Photorealistic, no people."`

Post 03 — `pan-stargrazer-post-03.png`:
> `"The same modern cast iron skillet from the reference, photographed at an isometric angle on the white studio surface, tech-product unboxing style. Photorealistic, no people."`

Post 04 — `pan-stargrazer-post-04.png`:
> `"The same modern cast iron skillet from the reference, extreme close-up of the transition between the mirror-polished cooking surface and the slim modern handle. Shallow depth of field, cool light. Photorealistic, no people."`

Post 05 — `pan-stargrazer-post-05.png`:
> `"The same modern cast iron skillet from the reference, photographed from above on a dark charcoal concrete surface with a single accent spotlight catching one edge of the polished surface. Moody product-photography style. Photorealistic, no people."`

Post 06 — `pan-stargrazer-post-06.png`:
> `"The same modern cast iron skillet from the reference, in a glass-walled modern kitchen with a faint city skyline visible through the glass at dusk. Cool blue ambient light with one warm accent. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv generated-images/stargrazer-base.png \
   generated-images/pan-stargrazer-cover.png \
   generated-images/pan-stargrazer-avatar.png \
   generated-images/pan-stargrazer-post-01.png \
   generated-images/pan-stargrazer-post-02.png \
   generated-images/pan-stargrazer-post-03.png \
   generated-images/pan-stargrazer-post-04.png \
   generated-images/pan-stargrazer-post-05.png \
   generated-images/pan-stargrazer-post-06.png \
   public/sites/onlypans/

ls public/sites/onlypans/ | grep -c stargrazer   # expect 9
git add public/sites/onlypans/stargrazer-base.png public/sites/onlypans/pan-stargrazer-*.png && \
git commit -m "feat(onlypans): generate Stargrazer image set (modern cast iron)"
```

### Task 2f: Smithee (Smithey-style Hand-Finished Cast Iron)

- [ ] **Step 1: Generate base**

`mcp__image-gen__generate_image`:

- `prompt`: `"Photograph of a hand-finished 12-inch cast iron skillet with a polished cooking surface showing subtle hand-forging marks and a faint cross-hatch pattern, an elegant heritage-style handle with a small ring at the end for hanging, and sleek flowing lines. Sitting on a reclaimed wood table in a Charleston low-country kitchen with warm afternoon light spilling in from a side window. Hints of aged brick wall in the deep background. Single subject centered. Warm, artisanal, hand-crafted aesthetic. Photorealistic, no people, no text."`
- `width: 1024`, `height: 1024`, `filename: "smithee-base.png"`, `quality: "high"`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/smithee && \
cp generated-images/smithee-base.png base-images/smithee/base.png
```

- [ ] **Step 3: Cover (1536×1024, person: smithee, filename: pan-smithee-cover.png)**

> `"Wide warm banner of the same hand-finished cast iron skillet from the reference, on the same reclaimed wood table framed wider to show the aged brick wall and a small row of carefully arranged artisan salts in the deep background. Late afternoon lowcountry light. Same skillet, identical model. Photorealistic, no people."`

- [ ] **Step 4: Avatar (1024×1024, person: smithee, filename: pan-smithee-avatar.png)**

> `"Tight square top-down portrait of the same hand-finished cast iron skillet from the reference, the polished cooking surface with its subtle hand-forging marks filling the frame. Warm lowcountry afternoon light. Same skillet, identical model. Photorealistic, no people."`

- [ ] **Step 5: 6 posts (1024×1024, person: smithee)**

Post 01 — `pan-smithee-post-01.png`:
> `"The same hand-finished cast iron skillet from the reference, three-quarter angle on the reclaimed wood table, freshly oiled so the polished cooking surface catches warm amber light. Photorealistic, no people."`

Post 02 — `pan-smithee-post-02.png`:
> `"The same hand-finished cast iron skillet from the reference, side profile showing the heritage handle and the small hanging ring at the end clearly. Warm side light. Photorealistic, no people."`

Post 03 — `pan-smithee-post-03.png`:
> `"The same hand-finished cast iron skillet from the reference, hanging on a black wrought iron wall hook against the aged brick wall. Photorealistic, no people."`

Post 04 — `pan-smithee-post-04.png`:
> `"The same hand-finished cast iron skillet from the reference, extreme close-up of the polished cooking surface showing the subtle hand-forging marks and faint cross-hatch texture. Shallow depth of field, warm light. Photorealistic, no people."`

Post 05 — `pan-smithee-post-05.png`:
> `"The same hand-finished cast iron skillet from the reference, upside down on the reclaimed wood table showing the smooth underside. Photorealistic, no people."`

Post 06 — `pan-smithee-post-06.png`:
> `"The same hand-finished cast iron skillet from the reference, photographed at golden hour with warm orange light flooding across the polished cooking surface. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv generated-images/smithee-base.png \
   generated-images/pan-smithee-cover.png \
   generated-images/pan-smithee-avatar.png \
   generated-images/pan-smithee-post-01.png \
   generated-images/pan-smithee-post-02.png \
   generated-images/pan-smithee-post-03.png \
   generated-images/pan-smithee-post-04.png \
   generated-images/pan-smithee-post-05.png \
   generated-images/pan-smithee-post-06.png \
   public/sites/onlypans/

ls public/sites/onlypans/ | grep -c smithee   # expect 9
git add public/sites/onlypans/smithee-base.png public/sites/onlypans/pan-smithee-*.png && \
git commit -m "feat(onlypans): generate Smithee image set (Charleston hand-finished cast iron)"
```

### Task 2g: Mademoiselle Crêpe (Carbon Steel Crêpe Pan)

- [ ] **Step 1: Generate base**

`mcp__image-gen__generate_image`:

- `prompt`: `"Photograph of a French carbon steel crêpe pan, 10 inches, with very low sidewalls about half an inch high, a long straight wooden handle, and a dark patinated cooking surface. Sitting on a rustic French kitchen table near a small linen sack of buckwheat flour. Delicate, precise, minimalist composition. Photographed in soft natural window light from the left. Single subject centered. Photorealistic, no people, no text."`
- `width: 1024`, `height: 1024`, `filename: "crepe-base.png"`, `quality: "high"`

- [ ] **Step 2: Stage**

```bash
mkdir -p base-images/crepe && \
cp generated-images/crepe-base.png base-images/crepe/base.png
```

- [ ] **Step 3: Cover (1536×1024, person: crepe, filename: pan-crepe-cover.png)**

> `"Wide delicate banner of the same carbon steel crêpe pan from the reference, on the same rustic French kitchen table framed wider to show a small stack of thin folded crêpes on a plate and a wedge of butter nearby. Warm Brittany kitchen light. Same crêpe pan, identical model. Photorealistic, no people."`

- [ ] **Step 4: Avatar (1024×1024, person: crepe, filename: pan-crepe-avatar.png)**

> `"Tight square top-down portrait of the same carbon steel crêpe pan from the reference, the low-sidewall patinated cooking surface filling the frame. Soft natural window light. Same crêpe pan, identical model. Photorealistic, no people."`

- [ ] **Step 5: 6 posts (1024×1024, person: crepe)**

Post 01 — `pan-crepe-post-01.png`:
> `"The same carbon steel crêpe pan from the reference, three-quarter angle on the rustic French kitchen table with a small pour of crêpe batter starting to spread across the surface. Soft window light. Photorealistic, no people."`

Post 02 — `pan-crepe-post-02.png`:
> `"The same carbon steel crêpe pan from the reference, empty and dry, photographed in side profile so the long wooden handle and the very low sidewalls are clearly visible. Photorealistic, no people."`

Post 03 — `pan-crepe-post-03.png`:
> `"The same carbon steel crêpe pan from the reference, hanging on a small iron hook on a whitewashed French kitchen wall. Photorealistic, no people."`

Post 04 — `pan-crepe-post-04.png`:
> `"The same carbon steel crêpe pan from the reference, close-up of the dark patinated cooking surface showing seasoning and a faint crêpe-shaped ring stain. Shallow depth of field. Photorealistic, no people."`

Post 05 — `pan-crepe-post-05.png`:
> `"The same carbon steel crêpe pan from the reference, flipped upside down on the rustic wooden table showing the smooth underside and the handle attachment. Photorealistic, no people."`

Post 06 — `pan-crepe-post-06.png`:
> `"The same carbon steel crêpe pan from the reference, at dawn in a French countryside kitchen with pale pink morning light through a small window. Photorealistic, no people."`

- [ ] **Step 6: Move and commit**

```bash
mv generated-images/crepe-base.png \
   generated-images/pan-crepe-cover.png \
   generated-images/pan-crepe-avatar.png \
   generated-images/pan-crepe-post-01.png \
   generated-images/pan-crepe-post-02.png \
   generated-images/pan-crepe-post-03.png \
   generated-images/pan-crepe-post-04.png \
   generated-images/pan-crepe-post-05.png \
   generated-images/pan-crepe-post-06.png \
   public/sites/onlypans/

ls public/sites/onlypans/ | grep -c crepe   # expect 9
git add public/sites/onlypans/crepe-base.png public/sites/onlypans/pan-crepe-*.png && \
git commit -m "feat(onlypans): generate Mademoiselle Crêpe image set"
```

---

## Task 3: Generate executive portraits

**Why:** 4 cringing portraits using the existing `bill`/`brandon`/`jim`/`sean` base reference folders. Same technique as OnlyFans Task 9.

**Files:**
- Create: `public/sites/onlypans/exec-pennington.png` (Bill, Founder)
- Create: `public/sites/onlypans/exec-holloway.png` (Brandon)
- Create: `public/sites/onlypans/exec-beckwith.png` (Jim)
- Create: `public/sites/onlypans/exec-rowe.png` (Sean)

- [ ] **Step 1: Generate Pennington (Bill, Founder) portrait**

`mcp__image-gen__generate_image_with_person`, `width: 1024`, `height: 1024`, `quality: "high"`:

- `role`: `founder`
- `filename`: `exec-pennington.png`
- `prompt`: `"Editorial corporate headshot of a man in a rust-colored sweater over a crisp white shirt standing in a warm modern kitchen with copper pots hanging behind him. Photographed mid-cringe — eyes closed, one hand pressed flat to his forehead, looking like he has just remembered something from his previous career. Warm natural kitchen light. Photorealistic, single person, no text."`

- [ ] **Step 2: Generate Holloway (Brandon) portrait**

`mcp__image-gen__generate_image_with_person`, `width: 1024`, `height: 1024`, `quality: "high"`:

- `person`: `brandon`
- `filename`: `exec-holloway.png`
- `prompt`: `"Editorial corporate headshot of a man in a cream linen shirt in the same warm modern kitchen with copper pots visible in the background. Photographed covering the lower half of his face with both hands, eyes wide with visible regret, as if a family member has just asked what he does for work. Warm natural light. Photorealistic, single person, no text."`

- [ ] **Step 3: Generate Beckwith (Jim) portrait**

`mcp__image-gen__generate_image_with_person`, `width: 1024`, `height: 1024`, `quality: "high"`:

- `person`: `jim`
- `filename`: `exec-beckwith.png`
- `prompt`: `"Editorial corporate headshot of a man in a soft wool henley in the same warm modern kitchen. Photographed looking out of frame toward an unseen window with an expression of deep, quiet existential fatigue. One hand loosely gripping the back of his neck. Warm natural light. Photorealistic, single person, no text."`

- [ ] **Step 4: Generate Rowe (Sean) portrait**

`mcp__image-gen__generate_image_with_person`, `width: 1024`, `height: 1024`, `quality: "high"`:

- `person`: `sean`
- `filename`: `exec-rowe.png`
- `prompt`: `"Editorial corporate headshot of a man in a dark olive chore coat in the same warm modern kitchen. Photographed with both hands gripping the back of a chair in front of him, shoulders slightly hunched, looking down at the chair with a thousand-yard stare. Warm natural light. Photorealistic, single person, no text."`

- [ ] **Step 5: Move and commit**

```bash
mv generated-images/exec-pennington.png \
   generated-images/exec-holloway.png \
   generated-images/exec-beckwith.png \
   generated-images/exec-rowe.png \
   public/sites/onlypans/

ls public/sites/onlypans/ | grep -c '^exec-'   # expect 4
git add public/sites/onlypans/exec-pennington.png \
        public/sites/onlypans/exec-holloway.png \
        public/sites/onlypans/exec-beckwith.png \
        public/sites/onlypans/exec-rowe.png && \
git commit -m "feat(onlypans): generate executive portraits (4 ashamed men)"
```

---

## Task 4: Generate home hero and how-it-works illustration

**Files:**
- Create: `public/sites/onlypans/home-hero.png`
- Create: `public/sites/onlypans/how-it-works.png`

- [ ] **Step 1: Generate the home hero**

`mcp__image-gen__generate_image`:

- `prompt`: `"Editorial photograph of an aesthetic curated lineup of three different pans on a warm cream linen surface against a soft amber background — a thick-walled matte cast iron skillet on the left, a hand-hammered copper saucepan in the middle, and a cherry-red enameled Dutch oven on the right. Even soft natural lighting, gentle warm shadows, magazine-cover composition. Photorealistic, no people, no text."`
- `width`: `1536`
- `height`: `1024`
- `filename`: `home-hero.png`
- `quality`: `high`

- [ ] **Step 2: Generate the how-it-works illustration**

`mcp__image-gen__generate_image`:

- `prompt`: `"Clean three-step infographic illustration in flat vector style on a warm cream background. Three stages left to right: (1) a simplified silhouette of a hand pointing at a row of pans, labeled '1' in a copper-colored circle; (2) a simplified silhouette of a pan with a small heart icon above it, labeled '2'; (3) a simplified silhouette of an eye looking at a pan, labeled '3'. Molten copper, warm amber, and cream color palette. Friendly, warm, marketing-page style. No readable English text other than the numerals 1, 2, 3."`
- `width`: `1536`
- `height`: `1024`
- `filename`: `how-it-works.png`
- `quality`: `high`

- [ ] **Step 3: Move and commit**

```bash
mv generated-images/home-hero.png generated-images/how-it-works.png public/sites/onlypans/

ls public/sites/onlypans/home-hero.png public/sites/onlypans/how-it-works.png   # both exist
git add public/sites/onlypans/home-hero.png public/sites/onlypans/how-it-works.png && \
git commit -m "feat(onlypans): generate home hero and how-it-works illustration"
```

---

## Task 5: Site bootstrap — config, registry wiring, placeholder home, favicon

**Why:** Gets the subdomain routing wired so `?site=onlypans` resolves to a real (if placeholder) page. Unblocks all subsequent code tasks.

**Files:**
- Create: `src/sites/onlypans/config.ts`
- Create: `src/sites/onlypans/index.ts`
- Create: `src/sites/onlypans/pages/home.tsx` (placeholder)
- Create: `public/sites/onlypans/favicon.png` (copied from `pan-greta-avatar.png`)
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`
- Modify: `scripts/resize-favicons.mjs`

- [ ] **Step 1: Create the site config**

Create `src/sites/onlypans/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "OnlyPans",
  subdomain: "onlypans",
  theme: {
    preset: "light",
    colors: {
      primary: "#C2410C",      // molten copper
      secondary: "#7C2D12",    // deep rust
      accent: "#FDE68A",       // warm amber
      background: "#FFF6ED",   // cream
      text: "#1C0F05",         // near-black coffee
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "OnlyPans — Cookware Subscriptions",
    description: "Subscribe to your favorite pan. Literal pans. Sitting perfectly still. A better platform than those people with the fans.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Meet the Pans", path: "/browse" },
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

Create `src/sites/onlypans/pages/home.tsx`:

```typescript
export default function OnlyPansHome() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">OnlyPans</h1>
      <p className="text-foreground/70">Placeholder home page. Real content coming.</p>
    </div>
  )
}
```

- [ ] **Step 3: Create the index barrel**

Create `src/sites/onlypans/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import OnlyPansHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": OnlyPansHome,
}
```

- [ ] **Step 4: Register in the site registry**

Modify `src/sites/registry.ts`. Add the import alongside the others:

```typescript
import { config as onlypansConfig, pages as onlypansPages } from "./onlypans"
```

And add to the `siteRegistry` object:

```typescript
  onlypans: { config: onlypansConfig, pages: onlypansPages },
```

- [ ] **Step 5: Add to the subdomain allowlist**

Modify `src/sites/subdomains.ts`. Add `"onlypans"` to the `VALID_SUBDOMAINS` array (keep all existing entries):

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
] as const
```

- [ ] **Step 6: Stage and resize the favicon**

```bash
cp public/sites/onlypans/pan-greta-avatar.png public/sites/onlypans/favicon.png
```

Modify `scripts/resize-favicons.mjs`. Add `"onlypans"` to the `sites` array:

```javascript
const sites = ["apex", "pigmilk", "dehydratedwater", "inflatableanchors", "strategicvoid", "stratify", "truegrit", "onlyfans", "onlypans"]
```

Then run:

```bash
node scripts/resize-favicons.mjs
```

Expected: output shows `onlypans` resized from 1024×1024 to 64×64.

- [ ] **Step 7: Type-check**

Run: `npx tsc --noEmit`
Expected: clean exit, no errors.

- [ ] **Step 8: Smoke test the route**

```bash
npm run dev > /tmp/onlypans-dev.log 2>&1 &
DEV_PID=$!
for i in {1..30}; do
  if curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/?site=onlypans" 2>/dev/null | grep -q "^200$"; then
    break
  fi
  sleep 1
done
curl -s "http://localhost:3000/?site=onlypans" | grep -c "OnlyPans"
kill $DEV_PID 2>/dev/null
wait $DEV_PID 2>/dev/null
```

Expected: grep returns at least 1. If the count is 0 or the curl fails, STOP and report BLOCKED with `/tmp/onlypans-dev.log`.

- [ ] **Step 9: Commit**

```bash
git add src/sites/onlypans/config.ts \
        src/sites/onlypans/pages/home.tsx \
        src/sites/onlypans/index.ts \
        src/sites/registry.ts \
        src/sites/subdomains.ts \
        public/sites/onlypans/favicon.png \
        scripts/resize-favicons.mjs && \
git commit -m "feat(onlypans): bootstrap site config, registry, favicon, placeholder home"
```

---

## Task 6: Pan data file

**Files:** Create `src/sites/onlypans/data/pans.ts`

- [ ] **Step 1: Create the file**

Create `src/sites/onlypans/data/pans.ts` with this complete content:

```typescript
export interface PanPost {
  image: string
  caption: string
  locked: boolean
}

export interface TipMenuItem {
  amount: number
  description: string
}

export interface Pan {
  slug: string
  name: string
  handle: string
  panType: string
  location: string
  monthlyPrice: number
  subscriberCount: number
  niche: string
  audienceTag: string
  bio: string
  coverImage: string
  avatarImage: string
  posts: PanPost[]
  tipMenu: TipMenuItem[]
  warningLabel?: string
}

export const pans: Pan[] = [
  {
    slug: "greta",
    name: "Greta",
    handle: "@greta.iron",
    panType: "Cast Iron Skillet · est. 1952",
    location: "South Pittsburg, TN",
    monthlyPrice: 4.99,
    subscriberCount: 48201,
    niche: "Generational classic",
    audienceTag: "Classic",
    bio: "Hi. I'm Greta. I have been in the same family since 1952. I remember every egg. I remember every steak. I will not speak of them.",
    coverImage: "/sites/onlypans/pan-greta-cover.png",
    avatarImage: "/sites/onlypans/pan-greta-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-greta-post-01.png", caption: "morning light, freshly seasoned", locked: false },
      { image: "/sites/onlypans/pan-greta-post-02.png", caption: "just after a scrub", locked: false },
      { image: "/sites/onlypans/pan-greta-post-03.png", caption: "on a cold stovetop", locked: true },
      { image: "/sites/onlypans/pan-greta-post-04.png", caption: "held up to the window", locked: true },
      { image: "/sites/onlypans/pan-greta-post-05.png", caption: "upside down, the underside", locked: true },
      { image: "/sites/onlypans/pan-greta-post-06.png", caption: "the handle, in detail", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "A moment of silent acknowledgement" },
      { amount: 20, description: "One additional photograph, taken by natural light only" },
      { amount: 50, description: "The story of a single egg (told only in writing)" },
    ],
  },
  {
    slug: "cuivre",
    name: "Madame Cuivre",
    handle: "@madame.cuivre",
    panType: "Hand-Hammered Copper Saucepan",
    location: "Normandy, FR",
    monthlyPrice: 29.99,
    subscriberCount: 312,
    niche: "French luxury",
    audienceTag: "Luxury",
    bio: "I was hand-hammered in Normandy. I do not perform on demand. I was not made to be photographed by a phone. If you appreciate restraint, you may join my subscribers.",
    coverImage: "/sites/onlypans/pan-cuivre-cover.png",
    avatarImage: "/sites/onlypans/pan-cuivre-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-cuivre-post-01.png", caption: "olive oil, a single drop", locked: false },
      { image: "/sites/onlypans/pan-cuivre-post-02.png", caption: "against charcoal linen", locked: false },
      { image: "/sites/onlypans/pan-cuivre-post-03.png", caption: "on the pot rack", locked: true },
      { image: "/sites/onlypans/pan-cuivre-post-04.png", caption: "brass rivets, close", locked: true },
      { image: "/sites/onlypans/pan-cuivre-post-05.png", caption: "from below", locked: true },
      { image: "/sites/onlypans/pan-cuivre-post-06.png", caption: "at dawn", locked: true },
    ],
    tipMenu: [
      { amount: 30, description: "Acknowledgement card (written in French)" },
      { amount: 100, description: "One unscheduled photograph" },
      { amount: 500, description: "A private viewing (by correspondence only)" },
    ],
  },
  {
    slug: "chuck",
    name: "Cheap Chuck",
    handle: "@cheap.chuck",
    panType: "Non-Stick Frying Pan · 10\"",
    location: "aisle 7, Target",
    monthlyPrice: 0.99,
    subscriberCount: 3140829,
    niche: "Cheerful underdog",
    audienceTag: "Underdog",
    bio: "Hi!! I am Chuck!! My coating is still MOSTLY intact and I am SO happy you're here!! Thank you thank you THANK YOU for subscribing!! Every single one of you matters to me!!",
    coverImage: "/sites/onlypans/pan-chuck-cover.png",
    avatarImage: "/sites/onlypans/pan-chuck-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-chuck-post-01.png", caption: "a pat of butter!!", locked: false },
      { image: "/sites/onlypans/pan-chuck-post-02.png", caption: "beside my friend the ramen!!", locked: false },
      { image: "/sites/onlypans/pan-chuck-post-03.png", caption: "on the command hook", locked: true },
      { image: "/sites/onlypans/pan-chuck-post-04.png", caption: "my scratches (sorry)", locked: true },
      { image: "/sites/onlypans/pan-chuck-post-05.png", caption: "in the sink", locked: true },
      { image: "/sites/onlypans/pan-chuck-post-06.png", caption: "on the drying rack (so proud)", locked: true },
    ],
    tipMenu: [
      { amount: 1, description: "A handwritten thank-you note (Chuck will cry)" },
      { amount: 5, description: "A second handwritten thank-you note (Chuck definitely cried)" },
      { amount: 20, description: "Your name said out loud, in order, by Chuck, in an empty kitchen" },
    ],
  },
  {
    slug: "wok",
    name: "The Wok",
    handle: "@thewok",
    panType: "Carbon Steel Wok · 14\"",
    location: "undisclosed",
    monthlyPrice: 11.99,
    subscriberCount: 4087,
    niche: "Philosophical mystery",
    audienceTag: "Mysterious",
    bio: "The pan does not move. The food moves. The cook moves. The pan remains.",
    coverImage: "/sites/onlypans/pan-wok-cover.png",
    avatarImage: "/sites/onlypans/pan-wok-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-wok-post-01.png", caption: "sesame oil, one drop", locked: false },
      { image: "/sites/onlypans/pan-wok-post-02.png", caption: "handle, extending", locked: false },
      { image: "/sites/onlypans/pan-wok-post-03.png", caption: "on the bamboo ring", locked: true },
      { image: "/sites/onlypans/pan-wok-post-04.png", caption: "the rim, close", locked: true },
      { image: "/sites/onlypans/pan-wok-post-05.png", caption: "the base", locked: true },
      { image: "/sites/onlypans/pan-wok-post-06.png", caption: "by moonlight", locked: true },
    ],
    tipMenu: [
      { amount: 8, description: "A single proverb, sent at a time of our choosing" },
      { amount: 40, description: "An additional photograph, of nothing in particular" },
      { amount: 150, description: "A parable about stillness" },
    ],
  },
  {
    slug: "ursula",
    name: "Big Ursula",
    handle: "@bigursula",
    panType: "Enameled Dutch Oven · 7.25 qt · 18 lbs",
    location: "somewhere cherry-red",
    monthlyPrice: 19.99,
    subscriberCount: 22104,
    niche: "Imposing heavyweight",
    audienceTag: "Heavyweight",
    bio: "I weigh eighteen pounds. I will outlive you. I am the last thing your grandchildren will own. I am not cruel. I am simply heavy.",
    coverImage: "/sites/onlypans/pan-ursula-cover.png",
    avatarImage: "/sites/onlypans/pan-ursula-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-ursula-post-01.png", caption: "lid on, afternoon", locked: false },
      { image: "/sites/onlypans/pan-ursula-post-02.png", caption: "lid beside body", locked: false },
      { image: "/sites/onlypans/pan-ursula-post-03.png", caption: "the handle", locked: true },
      { image: "/sites/onlypans/pan-ursula-post-04.png", caption: "from below, imposing", locked: true },
      { image: "/sites/onlypans/pan-ursula-post-05.png", caption: "on the cold grate", locked: true },
      { image: "/sites/onlypans/pan-ursula-post-06.png", caption: "at dusk", locked: true },
    ],
    tipMenu: [
      { amount: 15, description: "A photograph taken from an angle that better conveys my weight" },
      { amount: 60, description: "The number of pounds I weigh, confirmed in writing" },
      { amount: 200, description: "An updated weight reading, every quarter, for life" },
    ],
    warningLabel: "HEAVY — do not lift alone",
  },
  {
    slug: "stargrazer",
    name: "Stargrazer",
    handle: "@stargrazer.cast",
    panType: "Laser-Smoothed Cast Iron · 12\"",
    location: "Bethlehem, PA",
    monthlyPrice: 24.99,
    subscriberCount: 9482,
    niche: "Tech-bro disruptor",
    audienceTag: "Premium",
    bio: "Stargrazer is redefining cast iron for the modern home. Subscribe to receive our quarterly Heat Distribution Whitepaper and early access to our upcoming handle redesign roadmap. We are a culinary precision instrument, not a pan.",
    coverImage: "/sites/onlypans/pan-stargrazer-cover.png",
    avatarImage: "/sites/onlypans/pan-stargrazer-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-stargrazer-post-01.png", caption: "neutral oil, baseline", locked: false },
      { image: "/sites/onlypans/pan-stargrazer-post-02.png", caption: "side profile, white studio", locked: false },
      { image: "/sites/onlypans/pan-stargrazer-post-03.png", caption: "isometric unboxing", locked: true },
      { image: "/sites/onlypans/pan-stargrazer-post-04.png", caption: "the handle transition", locked: true },
      { image: "/sites/onlypans/pan-stargrazer-post-05.png", caption: "charcoal concrete moment", locked: true },
      { image: "/sites/onlypans/pan-stargrazer-post-06.png", caption: "modern kitchen at dusk", locked: true },
    ],
    tipMenu: [
      { amount: 10, description: "Receive the Heat Distribution Whitepaper (12 pages, PDF)" },
      { amount: 75, description: "30-minute call with our product team (no agenda)" },
      { amount: 300, description: "Be added to the Stargrazer advisory board (honorary)" },
    ],
  },
  {
    slug: "smithee",
    name: "Smithee",
    handle: "@smithee.iron",
    panType: "Hand-Finished Cast Iron · 12\"",
    location: "Charleston, SC",
    monthlyPrice: 14.99,
    subscriberCount: 17650,
    niche: "Charleston artisan",
    audienceTag: "Artisan",
    bio: "I was hand-finished in a converted Charleston warehouse. I will not be paired with any non-gas heat source. Fire only. As intended.",
    coverImage: "/sites/onlypans/pan-smithee-cover.png",
    avatarImage: "/sites/onlypans/pan-smithee-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-smithee-post-01.png", caption: "freshly oiled, amber light", locked: false },
      { image: "/sites/onlypans/pan-smithee-post-02.png", caption: "the heritage handle", locked: false },
      { image: "/sites/onlypans/pan-smithee-post-03.png", caption: "on the wrought iron hook", locked: true },
      { image: "/sites/onlypans/pan-smithee-post-04.png", caption: "hand-forging marks, close", locked: true },
      { image: "/sites/onlypans/pan-smithee-post-05.png", caption: "upside down, the underside", locked: true },
      { image: "/sites/onlypans/pan-smithee-post-06.png", caption: "golden hour", locked: true },
    ],
    tipMenu: [
      { amount: 10, description: "Certificate of hand-finishing, mailed" },
      { amount: 40, description: "Photograph of me beside a handwritten note" },
      { amount: 120, description: "The name of the craftsman who polished my surface" },
    ],
  },
  {
    slug: "crepe",
    name: "Mademoiselle Crêpe",
    handle: "@mlle.crepe",
    panType: "Carbon Steel Crêpe Pan · 10\"",
    location: "Brittany, FR",
    monthlyPrice: 6.99,
    subscriberCount: 1872,
    niche: "Specialist",
    audienceTag: "Specialist",
    bio: "I do one thing. I do it perfectly. I will not be repurposed. I am not a pancake pan. I am not a small sauté pan. I am a crêpe pan.",
    coverImage: "/sites/onlypans/pan-crepe-cover.png",
    avatarImage: "/sites/onlypans/pan-crepe-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-crepe-post-01.png", caption: "batter, beginning", locked: false },
      { image: "/sites/onlypans/pan-crepe-post-02.png", caption: "side profile, low walls", locked: false },
      { image: "/sites/onlypans/pan-crepe-post-03.png", caption: "on the iron hook", locked: true },
      { image: "/sites/onlypans/pan-crepe-post-04.png", caption: "the seasoning, close", locked: true },
      { image: "/sites/onlypans/pan-crepe-post-05.png", caption: "underside and handle attachment", locked: true },
      { image: "/sites/onlypans/pan-crepe-post-06.png", caption: "Brittany dawn", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "A single crêpe recipe, in French" },
      { amount: 25, description: "A reminder that I am not a pancake pan" },
      { amount: 80, description: "A brief correction of your crêpe technique" },
    ],
  },
]

export function getPanBySlug(slug: string): Pan | undefined {
  return pans.find((p) => p.slug === slug)
}

export const homepageFeaturedPans = ["greta", "cuivre", "chuck", "stargrazer"]
  .map((slug) => pans.find((p) => p.slug === slug)!)
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlypans/data/pans.ts && \
git commit -m "feat(onlypans): add pan creator data (8 pans)"
```

---

## Task 7: Leadership data file

**Files:** Create `src/sites/onlypans/data/leadership.ts`

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
    slug: "pennington",
    name: "Bill Pennington",
    title: "Founder & Chief Executive",
    bio: "Bill founded OnlyPans in 2021 after a long period of reflection on his previous career in the airflow space. He speaks of his earlier work only when directly asked, and only briefly. He is a graduate of a respectable Midwestern business school and would like that mentioned.",
    quote: "We are a cookware platform. That is all we are.",
    image: "/sites/onlypans/exec-pennington.png",
    referencePerson: "bill",
  },
  {
    slug: "holloway",
    name: "Brandon Holloway",
    title: "VP, Cookware Relations",
    bio: "Brandon joined in 2021 after Bill assured him the new venture was completely unrelated to the old one. By the time he discovered the format was, in several meaningful ways, identical, his children had already enrolled in a new school district. He is still processing.",
    quote: "I was told this was a kitchenware distribution start-up.",
    image: "/sites/onlypans/exec-holloway.png",
    referencePerson: "brandon",
  },
  {
    slug: "beckwith",
    name: "Jim Beckwith",
    title: "VP, Subscriber Stillness",
    bio: "Jim runs the department responsible for helping subscribers understand that the pan is not supposed to do anything. It is, by his own account, the most difficult job he has ever held. His mother has asked three times what he does. He has answered differently each time.",
    quote: "The pan is not broken. It is at rest.",
    image: "/sites/onlypans/exec-beckwith.png",
    referencePerson: "jim",
  },
  {
    slug: "rowe",
    name: "Sean Rowe",
    title: "VP, Artisan Partnerships",
    bio: "Sean negotiates contracts with our eight creators. He maintains a standing weekly appointment with a therapist and has recently taken up woodworking. He does not currently keep a journal, but has been considering it.",
    quote: "Every day, I speak respectfully to eight household objects.",
    image: "/sites/onlypans/exec-rowe.png",
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
git add src/sites/onlypans/data/leadership.ts && \
git commit -m "feat(onlypans): add executive leadership data"
```

---

## Task 8: Testimonials data file

**Files:** Create `src/sites/onlypans/data/testimonials.ts`

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
    "Greta reminds me of my grandmother. I have watched her sit perfectly still on a farmhouse counter for six months and I have no regrets.",
    "Greta subscriber — Tulsa, OK",
  ),
  withPortrait(
    "jason-kile",
    "Madame Cuivre has been hanging on her pot rack for an entire quarter. I paid thirty dollars a month to see this and I would pay more.",
    "Madame Cuivre subscriber — Des Moines, IA",
  ),
  withPortrait(
    "tony-mazetti",
    "Big Ursula is eighteen pounds. I have not lifted her. I have not needed to. She does the work on her own, by existing.",
    "Big Ursula subscriber — Dubuque, IA",
  ),
  withPortrait(
    "patricia-hollowell",
    "Cheap Chuck thanked me by name last week. I was at work. I cried in the break room.",
    "Cheap Chuck subscriber — Iowa City, IA",
  ),
  withPortrait(
    "derek-pullman",
    "I subscribed to Stargrazer and within a week he had added me to his product advisory board. I have no authority and no equity. I feel seen.",
    "Stargrazer subscriber — Marshalltown, IA",
  ),
  withPortrait(
    "simone-archer",
    "The Wok sends me one proverb per quarter. That is enough. That is more than enough.",
    "The Wok subscriber — Ames, IA",
  ),
  withPortrait(
    "kyle-brandt",
    "Smithee will not be paired with an induction cooktop. I respect this. I respect it so much I bought a gas range.",
    "Smithee subscriber — Waterloo, IA",
  ),
  withPortrait(
    "eleanor-whittaker",
    "I tried to use Mademoiselle Crêpe for a pancake once. She corrected me in writing. I have since made only crêpes.",
    "Mademoiselle Crêpe subscriber — Iowa City, IA",
  ),
]

export const homepageTestimonials = testimonials.slice(0, 3)
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlypans/data/testimonials.ts && \
git commit -m "feat(onlypans): add pan-themed testimonials"
```

---

## Task 9: Toast component

**Files:** Create `src/sites/onlypans/components/Toast.tsx`

- [ ] **Step 1: Create the file**

```typescript
"use client"

import { useEffect, useState } from "react"

interface ToastMessage {
  id: number
  text: string
}

export const ONLYPANS_TOAST_EVENT = "onlypans-toast"

export function fireToast(text: string) {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(ONLYPANS_TOAST_EVENT, { detail: { text } }))
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
    window.addEventListener(ONLYPANS_TOAST_EVENT, handler)
    return () => window.removeEventListener(ONLYPANS_TOAST_EVENT, handler)
  }, [])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {messages.map((m) => (
        <div
          key={m.id}
          className="bg-[#1C0F05] text-[#FFF6ED] px-5 py-3 rounded-full shadow-xl text-sm font-semibold pointer-events-auto"
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
git add src/sites/onlypans/components/Toast.tsx && \
git commit -m "feat(onlypans): add window-event Toast container"
```

---

## Task 10: SubscribeButton component

**Note:** Uses `useSyncExternalStore` from the start — the React-idiomatic way to read external state (localStorage + window events) without hydration mismatches. Do NOT use the `useEffect + setMounted` pattern; it trips the `react-hooks/set-state-in-effect` lint rule.

**Files:** Create `src/sites/onlypans/components/SubscribeButton.tsx`

- [ ] **Step 1: Create the file**

```typescript
"use client"

import { useSyncExternalStore } from "react"
import { fireToast } from "./Toast"

const STORAGE_KEY = "onlypans-subscriptions"
export const ONLYPANS_SUBSCRIBED_EVENT = "onlypans-subscribed"

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

/**
 * React-idiomatic subscription to the onlypans-subscribed store. Reads
 * localStorage on the client, returns false during SSR, and re-renders
 * when the onlypans-subscribed CustomEvent fires for the matching slug.
 */
export function useIsSubscribed(panSlug: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {}
      const handler = (e: Event) => {
        const detail = (e as CustomEvent<{ slug: string }>).detail
        if (detail?.slug === panSlug) onStoreChange()
      }
      window.addEventListener(ONLYPANS_SUBSCRIBED_EVENT, handler)
      return () => window.removeEventListener(ONLYPANS_SUBSCRIBED_EVENT, handler)
    },
    () => isSubscribed(panSlug),
    () => false,
  )
}

interface SubscribeButtonProps {
  panSlug: string
  panName: string
  monthlyPrice: number
  size?: "sm" | "lg"
}

export function SubscribeButton({ panSlug, panName, monthlyPrice, size = "lg" }: SubscribeButtonProps) {
  const subscribed = useIsSubscribed(panSlug)

  function handleClick() {
    if (subscribed) return
    const subs = readSubs()
    if (!subs.some((s) => s.slug === panSlug)) {
      subs.push({ slug: panSlug, subscribedAt: Date.now() })
      writeSubs(subs)
    }
    window.dispatchEvent(new CustomEvent(ONLYPANS_SUBSCRIBED_EVENT, { detail: { slug: panSlug } }))
    fireToast(`You're now subscribed to ${panName}. They will continue to sit perfectly still.`)
  }

  const padding = size === "sm" ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"

  if (subscribed) {
    return (
      <button
        className={`bg-[#1C0F05]/30 text-white font-bold rounded-full ${padding} cursor-not-allowed`}
        disabled
      >
        ✓ SUBSCRIBED
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`bg-[#C2410C] hover:bg-[#7C2D12] text-white font-bold rounded-full ${padding} transition-colors`}
    >
      SUBSCRIBE — ${monthlyPrice.toFixed(2)}/mo
    </button>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlypans/components/SubscribeButton.tsx && \
git commit -m "feat(onlypans): add SubscribeButton with useSyncExternalStore"
```

---

## Task 11: TipButton component

**Files:** Create `src/sites/onlypans/components/TipButton.tsx`

- [ ] **Step 1: Create the file**

```typescript
"use client"

import { fireToast } from "./Toast"

interface TipButtonProps {
  panName: string
  amount: number
}

export function TipButton({ panName, amount }: TipButtonProps) {
  function handleClick() {
    fireToast(`Thanks for the $${amount} tip! ${panName} has been notified.`)
  }

  return (
    <button
      onClick={handleClick}
      className="bg-[#FDE68A] hover:bg-[#FCD34D] text-[#7C2D12] font-bold text-xs uppercase rounded-full px-4 py-1.5 transition-colors"
    >
      TIP ${amount}
    </button>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlypans/components/TipButton.tsx && \
git commit -m "feat(onlypans): add TipButton client component"
```

---

## Task 12: LockedThumbnail component

**Files:** Create `src/sites/onlypans/components/LockedThumbnail.tsx`

- [ ] **Step 1: Create the file**

```typescript
"use client"

import Image from "next/image"
import { useIsSubscribed } from "./SubscribeButton"

interface LockedThumbnailProps {
  panSlug: string
  image: string
  caption: string
  locked: boolean
}

export function LockedThumbnail({ panSlug, image, caption, locked }: LockedThumbnailProps) {
  const unlocked = useIsSubscribed(panSlug)
  const isLocked = locked && !unlocked

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-[#FDE68A]/30">
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
git add src/sites/onlypans/components/LockedThumbnail.tsx && \
git commit -m "feat(onlypans): add LockedThumbnail with subscribe-unlock behavior"
```

---

## Task 13: PanCard component

**Files:** Create `src/sites/onlypans/components/PanCard.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import Link from "next/link"
import type { Pan } from "../data/pans"
import { SubscribeButton } from "./SubscribeButton"

interface PanCardProps {
  pan: Pan
  siteHref: (path: string) => string
}

export function PanCard({ pan, siteHref }: PanCardProps) {
  const profileHref = siteHref(`/browse/${pan.slug}`)
  return (
    <div className="rounded-xl overflow-hidden border border-[#C2410C]/20 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={profileHref} className="block relative aspect-[16/9] bg-[#FDE68A]/30">
        <Image
          src={pan.coverImage}
          alt={`${pan.name} cover`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="px-4 pt-3 -mt-8 relative">
        <Link href={profileHref} className="block w-16 h-16 rounded-full overflow-hidden border-4 border-white bg-[#FDE68A]/40 relative">
          <Image
            src={pan.avatarImage}
            alt={`${pan.name} avatar`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="px-4 py-3 flex-1 flex flex-col">
        <Link href={profileHref} className="block">
          <div className="font-bold text-[#1C0F05] text-base flex items-center gap-1.5">
            {pan.name}
            <span className="text-[#C2410C]" aria-hidden>●</span>
          </div>
          <div className="text-xs text-[#7C2D12]/70">{pan.handle} · {pan.location}</div>
          <div className="text-xs text-[#7C2D12]/80 mt-1">{pan.panType}</div>
        </Link>
        <div className="mt-3 flex-1">
          <span className="inline-block bg-[#C2410C]/10 text-[#7C2D12] text-xs font-semibold px-2 py-1 rounded-full">
            {pan.audienceTag}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-[#C2410C]/10">
          <SubscribeButton panSlug={pan.slug} panName={pan.name} monthlyPrice={pan.monthlyPrice} size="sm" />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlypans/components/PanCard.tsx && \
git commit -m "feat(onlypans): add PanCard browse component"
```

---

## Task 14: Home page (with "Why we're better" rant)

**Files:** Modify `src/sites/onlypans/pages/home.tsx` (replace placeholder)

- [ ] **Step 1: Replace the placeholder with the full home page**

Replace the entire contents of `src/sites/onlypans/pages/home.tsx`:

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { homepageFeaturedPans } from "../data/pans"
import { homepageTestimonials } from "../data/testimonials"
import { PanCard } from "../components/PanCard"
import { ToastContainer } from "../components/Toast"

const BETTER_REASONS = [
  { headline: "Our creators do not require electricity.", body: "No outlet. No batteries. Nothing to trip over." },
  { headline: "Our creators last for generations.", body: "Greta has been in her family since 1952. Their most senior creator was manufactured in 1978." },
  { headline: "You can cook with our creators.", body: "Try that with a box fan." },
  { headline: "Zero moving parts.", body: "Nothing to break. Nothing to oil. Nothing to warranty." },
  { headline: "Our creators were invented before 1882.", body: "The pan predates the electric fan by thousands of years. We are the original platform." },
  { headline: "Our subscribers report being more centered.", body: "A still object is meditative. A spinning object is noise." },
  { headline: "Your grandchildren will own our creators.", body: "You cannot say the same about a wind tunnel." },
  { headline: "No shingles have ever been removed by a pan.", body: "We cannot make the same claim about certain industrial airflow content." },
]

export default async function OnlyPansHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <ToastContainer />

      {/* HERO */}
      <section className="bg-[#FFF6ED]">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#C2410C] leading-tight">
              Subscribe to your favorite pan.
            </h1>
            <p className="mt-4 text-lg text-[#7C2D12]/80">
              Literal pans. Sitting perfectly still. A better platform than those people with the fans.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteHref("/browse")}
                className="bg-[#C2410C] hover:bg-[#7C2D12] text-white font-bold rounded-full px-7 py-3 transition-colors"
              >
                Meet the Pans
              </Link>
              <Link
                href={siteHref("/how-it-works")}
                className="bg-white border border-[#C2410C]/30 hover:border-[#C2410C]/60 text-[#1C0F05] font-bold rounded-full px-7 py-3 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/sites/onlypans/home-hero.png"
              alt="A curated lineup of three pans"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURED PANS */}
      <section className="bg-white border-t border-[#C2410C]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#1C0F05]">Featured pans</h2>
            <p className="text-[#7C2D12]/70 mt-2">A small selection of the creators currently on our platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageFeaturedPans.map((pan) => (
              <PanCard key={pan.slug} pan={pan} siteHref={siteHref} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/browse")}
              className="text-[#7C2D12] font-bold underline underline-offset-4"
            >
              See all 8 pans →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY WE'RE BETTER RANT */}
      <section className="bg-[#FFF6ED] border-t border-[#C2410C]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#C2410C] max-w-3xl mx-auto leading-tight">
              Why we&apos;re a better platform than those people with the fans.
            </h2>
            <p className="mt-3 text-[#7C2D12]/70">
              An honest and comprehensive comparison. We respect your time.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {BETTER_REASONS.map((reason) => (
              <div
                key={reason.headline}
                className="bg-white border border-[#C2410C]/20 rounded-xl p-5 flex gap-4 items-start"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C2410C] text-white font-extrabold flex items-center justify-center text-base">
                  ✓
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#1C0F05]">{reason.headline}</div>
                  <div className="text-sm text-[#7C2D12]/80 mt-1">{reason.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="bg-white border-t border-[#C2410C]/10">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
            <Image
              src="/sites/onlypans/how-it-works.png"
              alt="Three steps to subscribe to a pan"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[#1C0F05]">How it works</h2>
            <ol className="mt-6 space-y-4 text-[#7C2D12]/90">
              <li className="flex gap-3"><span className="font-bold text-[#C2410C]">1.</span><span>Browse the pans and find one that fits your kitchen personality.</span></li>
              <li className="flex gap-3"><span className="font-bold text-[#C2410C]">2.</span><span>Subscribe. Our creators are ready the moment you open the app.</span></li>
              <li className="flex gap-3"><span className="font-bold text-[#C2410C]">3.</span><span>Look at your pan. That&apos;s it. That&apos;s the platform.</span></li>
            </ol>
            <Link
              href={siteHref("/how-it-works")}
              className="inline-block mt-6 text-[#7C2D12] font-bold underline underline-offset-4"
            >
              Read the full guide →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="bg-[#FFF6ED] border-t border-[#C2410C]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-extrabold text-[#1C0F05] text-center mb-10">What our subscribers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-white border border-[#C2410C]/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#FDE68A]/40">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#1C0F05]">{t.name}</div>
                    <div className="text-xs text-[#7C2D12]/70">{t.title}</div>
                  </div>
                </div>
                <p className="text-sm text-[#7C2D12]/90 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER BAND */}
      <section className="bg-[#C2410C] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-extrabold">Find your pan today.</h2>
          <p className="mt-2 text-white/90">Eight creators. Eight personalities. Zero moving parts.</p>
          <Link
            href={siteHref("/browse")}
            className="inline-block mt-6 bg-white text-[#7C2D12] font-bold rounded-full px-7 py-3"
          >
            Browse the roster
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
git add src/sites/onlypans/pages/home.tsx && \
git commit -m "feat(onlypans): implement home page with 'why we are better' rant"
```

---

## Task 15: Browse page (Meet the Pans)

**Files:** Create `src/sites/onlypans/pages/browse.tsx`

- [ ] **Step 1: Create the file**

```typescript
"use client"

import { useState } from "react"
import { useSiteHrefClient } from "@/lib/site-href-client"
import { pans, type Pan } from "../data/pans"
import { PanCard } from "../components/PanCard"
import { ToastContainer } from "../components/Toast"

const TAGS = ["All", ...Array.from(new Set(pans.map((p) => p.audienceTag)))]

export default function OnlyPansBrowse() {
  const siteHref = useSiteHrefClient()
  const [activeTag, setActiveTag] = useState("All")

  const visible: Pan[] = activeTag === "All" ? pans : pans.filter((p) => p.audienceTag === activeTag)

  return (
    <>
      <ToastContainer />
      <section className="bg-[#FFF6ED]">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05]">Meet the Pans</h1>
            <p className="mt-3 text-[#7C2D12]/80 max-w-2xl mx-auto">
              Eight creators currently on the platform. Each one sits perfectly still in their own particular way.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeTag === tag
                    ? "bg-[#C2410C] text-white"
                    : "bg-white text-[#7C2D12] border border-[#C2410C]/20 hover:bg-[#FDE68A]/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((pan) => (
              <PanCard key={pan.slug} pan={pan} siteHref={siteHref} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-8 text-center text-[#7C2D12]/70">No pans match that filter.</p>
          )}
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: "Meet the Pans — OnlyPans",
  description: "Browse our roster of 8 pan creators. Cast iron, copper, non-stick, and more — there is a pan for every kitchen.",
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlypans/pages/browse.tsx && \
git commit -m "feat(onlypans): implement browse page with filter chips"
```

---

## Task 16: Pan profile page (dynamic route)

**Note:** Uses the non-clipping profile header pattern we worked out on OnlyFans. Avatar pops up into the banner; name, handle, type, and Subscribe button all sit entirely BELOW the cover banner with no overlap.

**Files:** Create `src/sites/onlypans/pages/pan-detail.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPanBySlug } from "../data/pans"
import { SubscribeButton } from "../components/SubscribeButton"
import { TipButton } from "../components/TipButton"
import { LockedThumbnail } from "../components/LockedThumbnail"
import { ToastContainer } from "../components/Toast"

interface PanDetailProps {
  slug: string
}

export default function PanDetail({ slug }: PanDetailProps) {
  const pan = getPanBySlug(slug)
  if (!pan) notFound()

  return (
    <>
      <ToastContainer />

      {pan.warningLabel && (
        <div className="bg-[#FDE68A] text-[#7C2D12] text-center text-xs font-bold uppercase tracking-wide py-2 px-4">
          ⚠ {pan.warningLabel}
        </div>
      )}

      {/* Cover banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-[#C2410C] to-[#7C2D12]">
        <Image
          src={pan.coverImage}
          alt={`${pan.name} cover`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Profile header — avatar pops up into banner, text sits below */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative -mt-12 md:-mt-16 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white bg-[#FDE68A]/40 shadow-md">
          <Image src={pan.avatarImage} alt={pan.name} fill sizes="128px" className="object-cover" />
        </div>

        <div className="mt-3 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1C0F05] flex items-center gap-2">
              <span className="truncate">{pan.name}</span>
              <span className="text-[#C2410C] flex-shrink-0" aria-hidden>●</span>
            </h1>
            <p className="mt-1 text-sm text-[#7C2D12]/70">
              {pan.handle} · {pan.location}
            </p>
            <p className="text-xs text-[#7C2D12]/70">
              {pan.panType} · {pan.subscriberCount.toLocaleString()} subscribers
            </p>
          </div>
          <div className="flex-shrink-0">
            <SubscribeButton panSlug={pan.slug} panName={pan.name} monthlyPrice={pan.monthlyPrice} size="lg" />
          </div>
        </div>

        {/* Bio */}
        <p className="mt-6 text-[#7C2D12]/90 leading-relaxed max-w-2xl">{pan.bio}</p>

        {/* Posts */}
        <div className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7C2D12]/70 mb-3">
            Posts ({pan.posts.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pan.posts.map((post, idx) => (
              <LockedThumbnail
                key={idx}
                panSlug={pan.slug}
                image={post.image}
                caption={post.caption}
                locked={post.locked}
              />
            ))}
          </div>
        </div>

        {/* Tip menu */}
        <div className="mt-10 mb-16 border border-[#C2410C]/20 rounded-xl p-5 bg-[#FFF6ED]">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#C2410C] mb-3">★ Tip Menu</div>
          <ul className="space-y-3">
            {pan.tipMenu.map((tip, idx) => (
              <li key={idx} className="flex items-center justify-between gap-4 text-sm text-[#7C2D12]/90">
                <span>
                  <strong className="text-[#1C0F05]">${tip.amount}</strong> — {tip.description}
                </span>
                <TipButton panName={pan.name} amount={tip.amount} />
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
git add src/sites/onlypans/pages/pan-detail.tsx && \
git commit -m "feat(onlypans): implement pan profile page"
```

---

## Task 17: How It Works page

**Files:** Create `src/sites/onlypans/pages/how-it-works.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "How It Works — OnlyPans",
  description: "How to find a pan, subscribe, and look at it.",
}

export default async function OnlyPansHowItWorks() {
  const siteHref = await getSiteHref()
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05]">How it works</h1>
          <p className="mt-3 text-[#7C2D12]/80">A quick guide to getting the most out of your OnlyPans subscriptions.</p>
        </div>

        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mt-10">
          <Image src="/sites/onlypans/how-it-works.png" alt="Three steps illustrated" fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
        </div>

        <div className="mt-12 space-y-10">
          <Step n={1} title="Browse the pans">
            Every pan on our platform has been carefully selected for its particular form of stillness. Use the niche filters on the Meet the Pans page to find the kind of pan that matches your kitchen — generational classic, French luxury, philosophical mystery, or one of five other distinct categories.
          </Step>
          <Step n={2} title="Subscribe to your favorite">
            When you find a pan you like, click their Subscribe button. Each pan has their own monthly tier — from $0.99 to $29.99. After subscribing, all of their previously locked posts become immediately visible. You&apos;ll see the pan in every state we&apos;ve been holding back.
          </Step>
          <Step n={3} title="Look at your pan">
            That&apos;s the platform. Unlike platforms that require you to plug the content in, our creators are ready the moment you open the app. No warm-up. No oscillation schedule. No quarterly release cycle. The pan sits. You look.
          </Step>
          <Step n={4} title="Tip generously">
            Every pan has a tip menu with ways to support them at various price points. Want a handwritten note from Cheap Chuck? Tip $1. Want Mademoiselle Crêpe to briefly correct your crêpe technique? Tip $80. Your favorite pan did not come to stillness on its own.
          </Step>
        </div>

        <div className="mt-16 text-center">
          <Link
            href={siteHref("/browse")}
            className="inline-block bg-[#C2410C] hover:bg-[#7C2D12] text-white font-bold rounded-full px-7 py-3"
          >
            Meet the Pans →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C2410C] text-white font-extrabold flex items-center justify-center text-lg">
        {n}
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#1C0F05]">{title}</h2>
        <p className="mt-1 text-[#7C2D12]/90 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlypans/pages/how-it-works.tsx && \
git commit -m "feat(onlypans): implement how-it-works page"
```

---

## Task 18: About page

**Files:** Create `src/sites/onlypans/pages/about.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "About — OnlyPans",
  description: "About the company behind the OnlyPans literal-pans subscription platform.",
}

export default function OnlyPansAbout() {
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05] text-center">About OnlyPans</h1>
        <p className="mt-4 text-center text-[#7C2D12]/80 max-w-2xl mx-auto">
          OnlyPans was founded in 2021 by four men who left the airflow industry after realizing that their previous work, while technically functional, contributed nothing lasting to the American home. We are a cookware subscription platform. We are aware that this sentence requires context. That context is not forthcoming.
        </p>

        <h2 className="mt-16 text-2xl font-bold text-[#1C0F05] text-center">The team</h2>
        <p className="mt-2 text-center text-[#7C2D12]/60 text-sm">Please do not ask them about their previous careers.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {executives.map((exec) => (
            <div key={exec.slug} className="bg-white border border-[#C2410C]/20 rounded-xl p-6 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden bg-[#FDE68A]/40">
                <Image src={exec.image} alt={exec.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#1C0F05]">{exec.name}</div>
                <div className="text-xs text-[#C2410C] font-semibold uppercase tracking-wide">{exec.title}</div>
                <p className="mt-2 text-sm text-[#7C2D12]/90">{exec.bio}</p>
                <p className="mt-2 text-xs italic text-[#7C2D12]/70">&ldquo;{exec.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white border border-[#C2410C]/20 rounded-xl p-6 text-center">
          <p className="text-sm text-[#7C2D12]/80">
            OnlyPans is not affiliated with any other subscription platform, past or present, hypothetical or real. Our creators have no moving parts and our executives would prefer it stay that way.
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
git add src/sites/onlypans/pages/about.tsx && \
git commit -m "feat(onlypans): implement about page with former-airflow-industry framing"
```

---

## Task 19: Testimonials page

**Files:** Create `src/sites/onlypans/pages/testimonials.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { testimonials } from "../data/testimonials"

export const metadata = {
  title: "Testimonials — OnlyPans",
  description: "What our subscribers say about their favorite pans.",
}

export default function OnlyPansTestimonials() {
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05] text-center">What our subscribers say</h1>
        <p className="mt-3 text-center text-[#7C2D12]/80 max-w-2xl mx-auto">
          Real cookware appreciation, in their own words.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-[#C2410C]/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#FDE68A]/40 flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-[#1C0F05]">{t.name}</div>
                  <div className="text-xs text-[#7C2D12]/70">{t.title}</div>
                </div>
              </div>
              <p className="text-sm text-[#7C2D12]/90 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
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
git add src/sites/onlypans/pages/testimonials.tsx && \
git commit -m "feat(onlypans): implement testimonials page"
```

---

## Task 20: Contact page (individual exec grid)

**Note:** Uses the 4-up individual-exec grid pattern established during the OnlyFans fix. Does NOT use a blended conference-table image. Does NOT have an `onSubmit` handler on the form (server component can't pass event handlers).

**Files:** Create `src/sites/onlypans/pages/contact.tsx`

- [ ] **Step 1: Create the file**

```typescript
import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "Contact — OnlyPans",
  description: "Contact the OnlyPans team. Please be respectful. Do not mention their previous work.",
}

const contactNotes: Record<string, string> = {
  pennington: "Prefers not to discuss his previous role",
  holloway: "Will not answer questions about the old company",
  beckwith: "Please speak in a calm, measured tone",
  rowe: "Between therapist appointments",
}

export default function OnlyPansContact() {
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05] text-center">Contact us</h1>
        <p className="mt-3 text-center text-[#7C2D12]/80 max-w-2xl mx-auto">
          Our four-person executive team is here to help. They would prefer you did not bring up the past.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {executives.map((exec) => (
            <div
              key={exec.slug}
              className="bg-white border border-[#C2410C]/20 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square bg-[#FDE68A]/40">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <div className="font-bold text-[#1C0F05] text-sm">{exec.name}</div>
                <div className="text-[10px] text-[#C2410C] font-semibold uppercase tracking-wide mt-0.5">
                  {exec.title}
                </div>
                <div className="text-[10px] italic text-[#7C2D12]/70 mt-2">
                  {contactNotes[exec.slug] ?? "Unavailable"}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#C2410C]/20 rounded-xl p-6">
            <h2 className="font-bold text-[#1C0F05]">Contact a pan&apos;s representation</h2>
            <form className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Which pan?"
                className="w-full border border-[#C2410C]/20 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-[#C2410C]/20 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <textarea
                placeholder="Reason for contact (please be respectful)"
                rows={4}
                className="w-full border border-[#C2410C]/20 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <button
                type="button"
                className="w-full bg-[#FDE68A]/60 text-[#7C2D12]/60 font-bold rounded-full py-2 cursor-not-allowed"
                disabled
              >
                Form temporarily unavailable
              </button>
            </form>
          </div>

          <div className="bg-white border border-[#C2410C]/20 rounded-xl p-6">
            <h2 className="font-bold text-[#1C0F05]">Office hours</h2>
            <p className="mt-2 text-sm text-[#7C2D12]/90">
              The office is open most days. Our creators do not have office hours because they are always here and always have been.
            </p>
            <h2 className="mt-6 font-bold text-[#1C0F05]">Press inquiries</h2>
            <p className="mt-2 text-sm text-[#7C2D12]/90">
              We do not currently have a press contact. Bill has declined the rotation three times. We are not pressing him on it.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] text-[#7C2D12]/50">
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
git add src/sites/onlypans/pages/contact.tsx && \
git commit -m "feat(onlypans): implement contact page with 4-up exec grid"
```

---

## Task 21: Privacy and Terms pages

**Files:**
- Create: `src/sites/onlypans/pages/privacy.tsx`
- Create: `src/sites/onlypans/pages/terms.tsx`

- [ ] **Step 1: Create the privacy page**

Create `src/sites/onlypans/pages/privacy.tsx`:

```typescript
export const metadata = {
  title: "Privacy Policy — OnlyPans",
  description: "How OnlyPans handles your data. Spoiler: we mostly track which pans you like looking at.",
}

export default function OnlyPansPrivacy() {
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#1C0F05]">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-[#C2410C] bg-[#C2410C]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#1C0F05] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#7C2D12]/90">
            The authoritative privacy policy for all Specific Industries properties — including OnlyPans — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#7C2D12]">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-[#7C2D12]/70">Last updated: the afternoon before Bill&apos;s most recent board meeting.</p>

        <h2 className="mt-8 text-xl font-bold text-[#7C2D12]">1. What We Collect</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          We collect your favorite pans, your preferred pan states, your average tip generosity, and the total number of minutes you have spent looking at each pan. We do not collect anything else.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#7C2D12]">2. How We Use Your Data</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          Your data is used to recommend other pans you might enjoy looking at and to send you the occasional email reminding you that Greta has been photographed again. That is the entire scope of our use.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#7C2D12]">3. Cookies</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          We use cookies to remember which pans you have subscribed to. The cookies are stored on your device and are not transmitted to anyone, including the pans themselves, who would have no use for them.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#7C2D12]">4. What We Do Not Track</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          We do not track your airflow preferences. That is the business model of a different company.
        </p>

        <p className="mt-10 text-sm italic text-[#7C2D12]/70 pt-4 border-t border-[#C2410C]/20">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-[#7C2D12]">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the terms page**

Create `src/sites/onlypans/pages/terms.tsx`:

```typescript
export const metadata = {
  title: "Terms of Use — OnlyPans",
  description: "The terms governing your use of the OnlyPans literal-pans subscription platform.",
}

export default function OnlyPansTerms() {
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#1C0F05]">Terms of Use</h1>

        <div className="mt-6 border-l-4 border-[#C2410C] bg-[#C2410C]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#1C0F05] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#7C2D12]/90">
            The authoritative terms of use for all Specific Industries properties — including OnlyPans — are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="underline font-bold text-[#7C2D12]">specificindustries.com/terms</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <h2 className="mt-8 text-xl font-bold text-[#7C2D12]">1. Subscriber Conduct</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          By subscribing to a pan, you agree to treat that pan with the respect any piece of cookware is owed. You may not record, redistribute, or otherwise exploit any pan&apos;s posted content for commercial purposes.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#7C2D12]">2. The Crêpe Pan Clause</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          Subscribers to Mademoiselle Crêpe agree not to attempt to use a crêpe pan for pancakes, fried eggs, or any other application not explicitly sanctioned by a French culinary institution. Mademoiselle Crêpe reserves the right to correct you in writing.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#7C2D12]">3. Tip Refunds</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          All tips are final. The pans do not check their accounts and would not know how to issue a refund if they did. Please tip thoughtfully.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#7C2D12]">4. Lifting Warning (Big Ursula)</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          Subscribers to Big Ursula acknowledge she weighs eighteen pounds. OnlyPans is not liable for any injury sustained while attempting to lift, move, or otherwise challenge the positional authority of Big Ursula. You were warned.
        </p>

        <p className="mt-10 text-sm italic text-[#7C2D12]/70 pt-4 border-t border-[#C2410C]/20">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/terms" className="underline text-[#7C2D12]">specificindustries.com/terms</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlypans/pages/privacy.tsx src/sites/onlypans/pages/terms.tsx && \
git commit -m "feat(onlypans): implement privacy and terms pages"
```

---

## Task 22: Wire all pages and dynamic route into the index barrel

**Files:**
- Modify: `src/sites/onlypans/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Replace the entire index.ts file**

Replace `src/sites/onlypans/index.ts` with:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getPanBySlug } from "./data/pans"

import OnlyPansHome from "./pages/home"
import OnlyPansBrowse, { metadata as browseMetadata } from "./pages/browse"
import OnlyPansHowItWorks, { metadata as howItWorksMetadata } from "./pages/how-it-works"
import OnlyPansAbout, { metadata as aboutMetadata } from "./pages/about"
import OnlyPansTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import OnlyPansContact, { metadata as contactMetadata } from "./pages/contact"
import OnlyPansPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import OnlyPansTerms, { metadata as termsMetadata } from "./pages/terms"
import PanDetail from "./pages/pan-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": OnlyPansHome,
  "browse": { component: OnlyPansBrowse, metadata: browseMetadata },
  "how-it-works": { component: OnlyPansHowItWorks, metadata: howItWorksMetadata },
  "about": { component: OnlyPansAbout, metadata: aboutMetadata },
  "testimonials": { component: OnlyPansTestimonials, metadata: testimonialsMetadata },
  "contact": { component: OnlyPansContact, metadata: contactMetadata },
  "privacy": { component: OnlyPansPrivacy, metadata: privacyMetadata },
  "terms": { component: OnlyPansTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  browse: {
    component: PanDetail,
    getMetadata: (slug: string) => {
      const pan = getPanBySlug(slug)
      return pan
        ? { title: `${pan.name} — OnlyPans`, description: pan.bio }
        : undefined
    },
    isValidSlug: (slug: string) => !!getPanBySlug(slug),
  },
}
```

- [ ] **Step 2: Update the registry import to include dynamicRoutes**

Modify `src/sites/registry.ts`. Change the OnlyPans import line to include `dynamicRoutes`:

```typescript
import { config as onlypansConfig, pages as onlypansPages, dynamicRoutes as onlypansDynamicRoutes } from "./onlypans"
```

And update the registry entry:

```typescript
  onlypans: { config: onlypansConfig, pages: onlypansPages, dynamicRoutes: onlypansDynamicRoutes },
```

- [ ] **Step 3: Type-check and commit**

```bash
npx tsc --noEmit
git add src/sites/onlypans/index.ts src/sites/registry.ts && \
git commit -m "feat(onlypans): wire all pages and /browse/[slug] dynamic route"
```

---

## Task 23: Update sitemap + final verification

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add pans import to sitemap**

Modify `src/app/sitemap.ts`. Add the import alongside the other site data imports:

```typescript
import { pans as onlypansPans } from "@/sites/onlypans/data/pans"
```

Then add this block after the OnlyFans fans loop:

```typescript
  // OnlyPans: pan profile pages at /browse/{slug}
  for (const pan of onlypansPans) {
    urls.push({ url: siteUrl("onlypans", `browse/${pan.slug}`) })
  }
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: clean exit.

- [ ] **Step 3: Lint (OnlyPans files must be clean)**

Run: `npm run lint 2>&1 | grep onlypans`
Expected: no output (no OnlyPans-file lint errors). Pre-existing errors in unrelated files (`mcp/`, `scripts/`, `strategicvoid`, `truegrit`) are acceptable and should be ignored.

If ANY line mentioning `onlypans` appears, STOP and report BLOCKED with the full lint errors from OnlyPans files.

- [ ] **Step 4: Production build**

Run: `npm run build`
Expected: build succeeds. If it fails, STOP and report BLOCKED with the full error output.

- [ ] **Step 5: Automated smoke test of all URLs**

Run the dev server in the background:

```bash
npm run dev > /tmp/onlypans-smoke.log 2>&1 &
DEV_PID=$!
for i in {1..60}; do
  if curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/?site=onlypans" 2>/dev/null | grep -q "^200$"; then
    break
  fi
  sleep 1
done
```

Then run the smoke test against all 17 URLs:

```bash
tests=(
  "http://localhost:3000/?site=onlypans|Subscribe to your favorite pan|200"
  "http://localhost:3000/browse?site=onlypans|Meet the Pans|200"
  "http://localhost:3000/browse/greta?site=onlypans|@greta.iron|200"
  "http://localhost:3000/browse/cuivre?site=onlypans|Madame Cuivre|200"
  "http://localhost:3000/browse/chuck?site=onlypans|Cheap Chuck|200"
  "http://localhost:3000/browse/wok?site=onlypans|The Wok|200"
  "http://localhost:3000/browse/ursula?site=onlypans|Big Ursula|200"
  "http://localhost:3000/browse/stargrazer?site=onlypans|Stargrazer|200"
  "http://localhost:3000/browse/smithee?site=onlypans|Smithee|200"
  "http://localhost:3000/browse/crepe?site=onlypans|Mademoiselle|200"
  "http://localhost:3000/how-it-works?site=onlypans|Browse the pans|200"
  "http://localhost:3000/about?site=onlypans|Bill Pennington|200"
  "http://localhost:3000/testimonials?site=onlypans|What our subscribers say|200"
  "http://localhost:3000/contact?site=onlypans|bsambrone@gmail.com|200"
  "http://localhost:3000/privacy?site=onlypans|Official Umbrella Policy|200"
  "http://localhost:3000/terms?site=onlypans|Official Umbrella Policy|200"
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
status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/browse/nonexistent?site=onlypans")
echo "404 test: nonexistent -> $status (expect 404)"
```

Expected: all 16 listed URLs print `OK`, and the 404 test prints `404`. If ANY URL prints `FAIL`, STOP and report BLOCKED with the failing URLs and expected patterns.

- [ ] **Step 6: Verify the "Why we're better" rant renders on the home page**

```bash
curl -s "http://localhost:3000/?site=onlypans" | grep -c "those people with the fans"
```

Expected: at least 1.

```bash
curl -s "http://localhost:3000/?site=onlypans" | grep -c "No shingles have ever been removed"
```

Expected: at least 1.

- [ ] **Step 7: Verify the footer disclaimer link**

```bash
curl -s "http://localhost:3000/about?site=onlypans" | grep -c "specificindustries.com/disclaimer"
```

Expected: at least 1.

- [ ] **Step 8: Verify the OnlyPans sitemap entries**

```bash
curl -s "http://localhost:3000/sitemap.xml" > /tmp/sitemap.xml
grep -c "onlypans.specificindustries.com" /tmp/sitemap.xml
grep -c "onlypans.specificindustries.com/browse/" /tmp/sitemap.xml
```

Expected: first grep returns at least 16 (8 static + 8 dynamic = 16 onlypans URLs). Second grep returns exactly 8 (the 8 pan dynamic routes).

- [ ] **Step 9: Stop dev server**

```bash
kill $DEV_PID 2>/dev/null
wait $DEV_PID 2>/dev/null
```

- [ ] **Step 10: Commit the sitemap update**

```bash
git add src/app/sitemap.ts && \
git commit -m "feat(onlypans): add pan profile URLs to sitemap"
```

---

## Self-Review Summary

**Spec coverage:**

| Spec requirement | Task(s) |
|---|---|
| Subdomain routing for onlypans | Task 5 |
| Molten copper theme with specific hex codes | Task 5 (config.ts) |
| 8-pan roster with real brand references for Greta/Stargrazer/Smithee | Tasks 1–2, Task 6 |
| PG tone throughout | Tasks 6, 14–21 |
| Home page "Why we're better than those people with the fans" rant | Task 14 |
| Smaller jabs on About + How It Works + Privacy | Tasks 17, 18, 21 |
| 4-exec team with random names + "left airflow industry" framing | Tasks 3, 7, 18 |
| Same base reference photos (bill/brandon/jim/sean) | Task 3 |
| Bill always founder | Task 7 |
| Subscribe flow via localStorage + custom events | Tasks 9, 10, 12 |
| useSyncExternalStore (not setMounted anti-pattern) | Task 10 |
| Tip flow via toast events, no persistence | Tasks 9, 11 |
| LockedThumbnail unlocks in real time on subscribe | Tasks 10, 12 |
| PanCard for browse + featured strip | Task 13 |
| 9 pages with commerce: false | Tasks 14–21 |
| Dynamic route /browse/[slug] with getPanBySlug validation | Task 22 |
| Non-clipping profile header | Task 16 |
| Individual-exec grid contact page (not blended) | Task 20 |
| No onSubmit on server-component forms | Task 20 |
| All apostrophes escaped | Tasks 14, 17, 20, 21 |
| Privacy/Terms umbrella callout pattern | Task 21 |
| Real email in small print on Contact | Task 20 |
| Shared Footer disclaimer link | Task 23 step 7 verification |
| Favicon as single pan, resized via script | Task 5 |
| Sitemap includes static + dynamic onlypans URLs | Tasks 5 (static auto via registry), 23 (dynamic explicit) |
| Added to registry.ts, subdomains.ts, resize-favicons.mjs, sitemap.ts | Tasks 5, 22, 23 |

**Placeholder scan:** No TBD/TODO/"implement later" in task bodies. All code blocks are complete. All prompts are written out in full. All file paths are exact.

**Type consistency:**
- `Pan.posts: PanPost[]` (Task 6) consumed in `LockedThumbnail` (Task 12) and `pan-detail.tsx` (Task 16) ✓
- `Pan.tipMenu: TipMenuItem[]` consumed in `pan-detail.tsx` ✓
- `SubscribeButton` props `(panSlug, panName, monthlyPrice, size)` used in Tasks 13 (PanCard) and 16 (pan-detail) ✓
- `TipButton` props `(panName, amount)` used in Task 16 ✓
- `LockedThumbnail` props `(panSlug, image, caption, locked)` match `PanPost` field names in Task 6 ✓
- `isSubscribed`, `useIsSubscribed`, `ONLYPANS_SUBSCRIBED_EVENT` exported from `SubscribeButton` (Task 10) and imported by `LockedThumbnail` (Task 12) ✓
- `fireToast` and `ToastContainer` exported from `Toast` (Task 9) and imported by `SubscribeButton` (10), `TipButton` (11), and pages that need toasts (14, 15, 16) ✓
- `homepageFeaturedPans` exported from `pans.ts` (Task 6) and imported by `home.tsx` (Task 14) ✓
- `homepageTestimonials` exported from `testimonials.ts` (Task 8) and imported by `home.tsx` (Task 14) ✓
- `getPanBySlug` exported from `pans.ts` (Task 6) and imported by `pan-detail.tsx` (Task 16), `index.ts` barrel (Task 22), and `sitemap.ts` (Task 23, indirectly via the `pans` export) ✓

**Storage key and event name separation from OnlyFans:** Deliberate — OnlyPans uses `onlypans-subscriptions`, `onlypans-subscribed`, and `onlypans-toast` throughout. No cross-contamination with OnlyFans' equivalent strings. This means subscribing to a pan does not unlock a fan, and vice versa. Verified in Tasks 9, 10, 11, 12.
