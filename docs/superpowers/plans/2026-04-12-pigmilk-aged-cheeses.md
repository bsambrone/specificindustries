# Pigmilk Aged Cheeses Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two new aged cheese products (10-year parmesan, 3-year cheddar) to the pigmilk catalog with matching product images.

**Architecture:** Append two entries to the existing `products` array in `src/sites/pigmilk/data/products.ts`. Generate two product PNGs matching the existing `product-cheese.png` aesthetic and drop them into `public/sites/pigmilk/`. The existing `/products` grid and `/products/[slug]` detail route will render them automatically — no route, page, or component changes.

**Tech Stack:** Next.js 15 App Router, TypeScript, `mcp__image-gen__generate_image` (OpenAI gpt-image-1.5) for image generation.

**Note on TDD:** The pigmilk product catalog is static data with no existing tests. Verification is through `npx tsc --noEmit`, `npm run lint`, and visual confirmation via dev server. No test scaffolding will be introduced as part of this change.

**Spec:** `docs/superpowers/specs/2026-04-12-pigmilk-aged-cheeses-design.md`

---

### Task 1: Generate Parmigia-Oink Product Image

**Files:**
- Create: `public/sites/pigmilk/product-parmigia-oink.png`

- [ ] **Step 1: Generate the image**

Call `mcp__image-gen__generate_image` with:
- `filename`: `sites/pigmilk/product-parmigia-oink.png`
- `width`: `1024`
- `height`: `1536`
- `quality`: `high`
- `prompt`: `Warm product photography of a massive aged hard cheese wheel on an off-white parchment background with subtle pink accents. The wheel has a golden-amber rind and is cracked open to reveal a pale, crystalline interior full of visible calcium-lactate crystals (like an aged parmesan). A rustic hand-stamped parchment label reads "PIGMILK PARMIGIA-OINK · AGED 10 YEARS · BARN ROOM 2" with a small pig-hoof logo. Soft natural light from the left, shallow depth of field, centered hero composition, whimsical artisanal farmstead aesthetic.`

- [ ] **Step 2: Verify file exists**

Run: `ls -la public/sites/pigmilk/product-parmigia-oink.png`
Expected: file exists, non-zero size, ~1024x1536 PNG.

- [ ] **Step 3: Commit**

```bash
git add public/sites/pigmilk/product-parmigia-oink.png
git commit -m "feat(pigmilk): add parmigia-oink product image"
```

---

### Task 2: Generate Cheddar Hog Product Image

**Files:**
- Create: `public/sites/pigmilk/product-cheddar-hog.png`

- [ ] **Step 1: Generate the image**

Call `mcp__image-gen__generate_image` with:
- `filename`: `sites/pigmilk/product-cheddar-hog.png`
- `width`: `1024`
- `height`: `1536`
- `quality`: `high`
- `prompt`: `Warm product photography of a rectangular block of sharp aged cheddar cheese on an off-white parchment background with subtle pink accents. The cheese is a deep, vivid orange with slightly crumbly crumbling edges; a small wedge has been broken off and sits next to the main block revealing a dense crumbly interior. A rustic hand-stamped parchment label reads "PIGMILK CHEDDAR HOG · 3 YEARS SHARP" with a small pig-hoof logo. Soft natural light from the left, shallow depth of field, centered hero composition, whimsical artisanal farmstead aesthetic matching product-cheese.png.`

- [ ] **Step 2: Verify file exists**

Run: `ls -la public/sites/pigmilk/product-cheddar-hog.png`
Expected: file exists, non-zero size, ~1024x1536 PNG.

- [ ] **Step 3: Commit**

```bash
git add public/sites/pigmilk/product-cheddar-hog.png
git commit -m "feat(pigmilk): add cheddar hog product image"
```

---

### Task 3: Add Parmigia-Oink to Products Catalog

**Files:**
- Modify: `src/sites/pigmilk/data/products.ts` (append entry before the closing `]` of the `products` array)

- [ ] **Step 1: Append the product entry**

Use Edit to add the following entry immediately after the `whole-hog-bundle` entry (after its closing `},` and before the final `]` that closes the `products` array):

```typescript
  {
    slug: "aged-parmigia-oink",
    name: "Aged Parmigia-Oink",
    price: 189.99,
    priceLabel: "$189.99 / wheel",
    tagline: "Aged a decade. We waited. You'll wait too.",
    description: [
      "Ten years ago, someone — probably Earl — left a wheel of pig milk cheese in the back of Barn Room 2 and forgot about it. We found it during an unrelated insurance inspection. It had become something else entirely.",
      "Aged Parmigia-Oink is hard, crystalline, and shatters like granite under a proper cheese knife. The interior is dense with audible calcium-lactate crystals that crunch between your teeth, which our food scientist (a retired substitute teacher named Marge) assures us is 'definitely supposed to happen.'",
      "Pairs with balsamic older than most of our employees, a long moment of silence, and the slow-dawning awareness that ten years is a very long time. Best shaved thin over pasta, regret, or the passage of time itself.",
    ],
    image: "/sites/pigmilk/product-parmigia-oink.png",
    nutritionalFacts: [
      { label: "Aged", value: "10 years" },
      { label: "Crystals", value: "Audible" },
      { label: "Pig Energy", value: "Concentrated by time" },
      { label: "Flavor Profile", value: "Biblical" },
      { label: "Pairs With", value: "A decade of patience" },
      { label: "Awards", value: "Still pending" },
    ],
  },
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exits 0 with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/pigmilk/data/products.ts
git commit -m "feat(pigmilk): add aged parmigia-oink product"
```

---

### Task 4: Add Cheddar Hog to Products Catalog

**Files:**
- Modify: `src/sites/pigmilk/data/products.ts` (append entry after the parmigia-oink entry added in Task 3)

- [ ] **Step 1: Append the product entry**

Use Edit to add the following entry immediately after the `aged-parmigia-oink` entry (after its closing `},` and before the final `]` that closes the `products` array):

```typescript
  {
    slug: "aged-cheddar-hog",
    name: "3-Year Aged Cheddar Hog",
    price: 49.99,
    priceLabel: "$49.99 / block",
    tagline: "Sharp. Crumbly. Slightly accusatory.",
    description: [
      "Three years in the aging room transforms our pig milk into a sharp, crumbly cheddar that one of our tasters described as 'slightly accusatory, like it knows what you did.' We do not know what that means. We are choosing not to ask.",
      "The color is a deep, confident orange that pig milk should not, by any reasonable law of nature, be capable of producing. And yet here we are. The pigs seem mildly offended by it and have begun making direct eye contact during milking, which is new.",
      "Pairs beautifully with apples, sharp crackers, a glass of something honest, and unfinished conversations. Crumbles into chili, melts onto burgers, and can be eaten alone in a parked car at 11 PM, which is somehow the most popular serving suggestion according to our data.",
    ],
    image: "/sites/pigmilk/product-cheddar-hog.png",
    nutritionalFacts: [
      { label: "Aged", value: "3 years" },
      { label: "Sharpness", value: "Confrontational" },
      { label: "Pig Energy", value: "100% DV" },
      { label: "Color", value: "Unexplained orange" },
      { label: "Pairs With", value: "Apples, regret" },
      { label: "Crumble Factor", value: "High" },
    ],
  },
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exits 0 with no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: exits 0 with no errors or warnings in `src/sites/pigmilk/data/products.ts`.

- [ ] **Step 4: Commit**

```bash
git add src/sites/pigmilk/data/products.ts
git commit -m "feat(pigmilk): add 3-year aged cheddar hog product"
```

---

### Task 5: Visual Verification via Dev Server

**Files:** None — verification only.

- [ ] **Step 1: Start dev server (if not already running)**

Run: `npm run dev` in the background.
Expected: server starts on port 3000.

- [ ] **Step 2: Verify products grid**

Open in browser: `http://localhost:3000/products?site=pigmilk`
Expected: Both new cards appear in the grid (Aged Parmigia-Oink, 3-Year Aged Cheddar Hog), each with their generated image, correct price, and tagline visible.

- [ ] **Step 3: Verify parmigia-oink detail page**

Open: `http://localhost:3000/products/aged-parmigia-oink?site=pigmilk`
Expected: Detail page renders with full description paragraphs, nutritional facts table, and hero image.

- [ ] **Step 4: Verify cheddar-hog detail page**

Open: `http://localhost:3000/products/aged-cheddar-hog?site=pigmilk`
Expected: Detail page renders with full description paragraphs, nutritional facts table, and hero image.

- [ ] **Step 5: Stop dev server**

Stop the backgrounded `npm run dev` process.

No commit for this task — verification only.

---

## Self-Review Notes

- **Spec coverage:** Both products in the spec are covered (Tasks 3 and 4). Both images are covered (Tasks 1 and 2). No other files mentioned in the spec require modification.
- **Placeholders:** None — every description paragraph, nutritional fact, price, and image prompt is fully written out.
- **Type consistency:** Both entries match the `Product` interface defined at `src/sites/pigmilk/data/products.ts:1-10` (slug, name, price, priceLabel, tagline, description[], image, nutritionalFacts[]).
- **Non-goals respected:** No changes to `/products` page, detail template, navigation, or homepage testimonials.
