# Whitford Family Chunky Milk — Site Design

**Subdomain:** `chunkymilk`
**Date:** 2026-04-18
**Vertical:** `consumer-goods`
**Commerce:** On

## 1. Concept & Tone

Whitford Family Chunky Milk sells "chunky milk" — a product that is obviously spoiled milk — with the earnest, unhurried sincerity of a six-generation Appalachian hollow dairy. The central comedic engine is the gap between the horror of what's on offer and the calm, heritage-proud voice of the people selling it.

The site celebrates chunks as a feature (grading systems, tasting notes, connoisseur language). It never uses the words "cheese," "spoiled," or "curdled." It never explains what chunky milk is for or how to use it — it assumes the reader already knows. Lexicon favors words like *settle*, *gather*, *rest*, *character*.

The voice is the joke. The product copy is straight-faced.

**Brand:** Whitford Family Chunky Milk
**Wordmark subline:** "Made In The Hollow Since 1867"
**Tagline (apex/portfolio):** *"Six generations of chunks, straight from the hollow."*

## 2. Visual & Theme Direction

Appalachian hollow aesthetic — rough-hewn, moss-on-stone, maws-and-paws register. Deep greens, aged browns, warm off-cream. No chrome, no modernity. Ceramic, not stainless.

**Palette:**
- `--color-primary` — `#3F5A3A` (deep moss green — buttons, links, brand accents)
- `--color-secondary` — `#E8DFC8` (aged parchment — cards, framed callouts)
- `--color-accent` — `#6B4423` (aged walnut brown — borders, dividers)
- `--color-background` — `#F4EEDD` (warm off-cream)
- `--color-text` — `#2A1F14` (nearly-black tobacco brown)

Contrast verified: walnut accent on cream avoids the yellow-on-light failure mode.

**Fonts (reuse existing `src/themes/fonts.ts` entries):**
- Heading: `playfair`
- Body: `lora` — warmer than Inter, reads almanac-ish

**Photographic register:** misty hollow morning light, weathered wood planks, stoneware and glass jars, ceramic cups, shallow depth of field, dim daylight. Portraits rendered tintype-style but in color.

**Logo / crest:** circular crest — a ceramic jar with three visible chunks, "Whitford" arched above, "Chunky Milk" arched below, "Est. 1867" centered beneath the jar. Walnut line art on cream.

## 3. Product Catalog

Full commerce via existing cart/checkout scaffolding (pigmilk pattern). Product detail pages via `dynamicRoutes["products"]`. Local cart state only — no real payment.

**Chunk-graded milk line (6 SKUs):**

| Slug | Name | Grade | Tasting note | Price |
|---|---|---|---|---|
| `petite-stir` | Petite Stir | Petite | "Barely settled — a whisper of chunk for the newcomer." | $14 |
| `hollow-draw` | Hollow Draw | Artisan | "Our everyday pour. The chunk you grew up with." | $22 |
| `settled-hearth` | Settled Hearth | Hearty | "Deep rested. Stands up to a thick slice of bread." | $32 |
| `monumental-gather` | Monumental Gather | Monumental | "A ceremonial pour. Chunks you can see from across the table." | $48 |
| `patriarch-reserve` | Patriarch Reserve | Aged / Limited | "Rested nine weeks in the Settlin' Shed. 42 jars per season." | $84 |
| `foundation-blend` | Foundation Blend | Starter / Gift | "Petite and Artisan side-by-side. For those new to the family." | $36 |

**Specialty line (1 SKU — flagship curiosity):**

| Slug | Name | Character | Tasting note | Price |
|---|---|---|---|---|
| `cottage-pour` | The Cottage Pour | Drinkable Cottage Style | "Our densest expression — milk that has gathered itself into small white clusters suspended in their own liquid. Passes through a wide-mouth cup. Traditionally taken with a spoon by those who prefer." | $28 |

The Cottage Pour is transparently drinkable cottage cheese. Product copy never uses the word "cheese" — it is "cottage-style," "drinkable cottage," "our curdiest expression" (note: "curdy" is permitted; "curdled" is not). A featured placement on the home page and a short callout on the product detail page lean into its role as the brand's most brazen example of the gap between what is sold and what is served.

**Accessories (5 SKUs, sold dead straight):**

| Slug | Name | Copy | Price |
|---|---|---|---|
| `chunk-scoop` | The Chunk Scoop | Hand-thrown ceramic scoop. | $38 |
| `whitford-cloth` | Whitford Chunking Cloth | Unbleached muslin. The traditional cloth. | $24 |
| `settling-crock` | Settling Crock | Stoneware vessel for those who chunk at home. | $88 |
| `tasting-cups` | Tasting Cup Pair | Ceramic cups with a notched lip. Sold in pairs. | $32 |
| `hollow-journal` | Hollow Journal | Leather notebook for recording your chunk impressions. | $42 |

**Gift sets (3 SKUs):**

| Slug | Name | Contents | Price |
|---|---|---|---|
| `newcomer-gift` | The Newcomer | One Petite jar, one chunking cloth, one tasting cup. | $72 |
| `homestead-gift` | The Homestead | Artisan + Hearty jars, scoop, cloth, journal. | $164 |
| `patriarch-gift` | The Patriarch | Patriarch Reserve jar, settling crock, journal. | $212 |

**Total:** 15 products (6 chunk-graded + 1 specialty + 5 accessories + 3 gift sets). Each has a product detail page with:
- Name + grade + tasting note
- "Chunk origin" — which of the four named Whitford fields produced the milk (North Field, Sycamore Field, Creek Bottom, High Meadow)
- A "How To Serve" block that says something like "in the manner your people have always served it"
- Add-to-cart via the shared `AddToCartButton`

## 4. Pages

Standard + custom. All rendered via the catch-all route through the `pages` barrel and `dynamicRoutes`.

**Standard:**
- `home` — hero (misty hollow + jars on planks), featured chunks carousel, voice excerpt, leadership preview, CTA to Products
- `products` — full grid, sectioned by Milk / Specialty / Accessories / Gift Sets
- `about` — short "who we are" + leadership grid (four Whitford-Chunkery leaders)
- `contact` — satirical hollow voice ("letters arrive by saddlebag twice a week") with real email `bsambrone@gmail.com` in small print
- `privacy` — umbrella callout + hollow-voiced satire sections (data "settles" like milk, etc.)
- `terms` — umbrella callout + hollow-voiced satire sections (disputes resolved at the Settlin' Shed)
- `cart` — reuses shared CartPage
- `checkout` — reuses shared CheckoutPage

**Custom (3 signature pages):**

- `the-chunkin-process` — a process walkthrough that explains nothing. Three stages: **The Rest**, **The Settle**, **The Gather**. Each stage gets a short prose paragraph and an image. At no point does the reader learn what chunky milk is or how it becomes chunky.
- `our-hollow` — a place page. Hand-drawn map image (`our-hollow-map.png`) marking landmarks: the Settlin' Shed, Chunk Rock, the four named fields, the family cemetery. Short prose per landmark in the earnest hollow voice.
- `heritage` — a timeline page. Entries from 1867 (the founding "when Ezekiel Whitford first noticed the chunks were good") through to Bill taking over in 1974. Anchors the "six generations" claim.

**Nav order (header):**
Home · Products · The Chunkin' Process · Our Hollow · Heritage · About · Contact

**Dynamic routes:**
```ts
dynamicRoutes = {
  "products": {
    component: ProductDetail,
    getMetadata: (slug) => ({ title: product.name, description: product.tastingNote }),
    isValidSlug: (slug) => !!getProductBySlug(slug),
  },
}
```

## 5. Leadership

Four canonical people (`bill` = founder per convention; names + titles + portrait styles randomized per site). Names and bios are fixed from this spec forward — they do **not** re-randomize per visit.

**Bill Whitford** — *person: `bill`*
- **Title:** Patriarch & Founder
- **Bio:** "Bill took over the Chunkery from his father Ezra in 1974 and has not missed a chunkin' season since. Rises at four, chunks till noon, answers mail by candlelight."
- **Portrait:** tintype-style, full grey beard, suspenders over a collarless linen shirt, flat cap, standing by a weathered barn door, misty morning light.

**Jebediah "Jeb" Hollister** — *person: `brandon`*
- **Title:** Head of Chunk Grading
- **Bio:** "Jeb married into the family in 1993 and took over grading two years later after old Clem's eyesight went. Certified by the Appalachian Chunkery Guild. Holds the record for the largest Monumental chunk ever pulled (1.8 lbs, 2011)."
- **Portrait:** dark beard, work-worn hands holding a stoneware crock, denim shirt rolled at the sleeves, wooden pegboard behind him with tasting cups hanging.

**Otis P. Clemmons** — *person: `jim`*
- **Title:** Keeper of the Settlin' Shed
- **Bio:** "Otis is Bill's second cousin on his mother's side and has run the Settlin' Shed for thirty-one years. He is the only living person who knows where the keys to the shed are kept. He has never given an interview."
- **Portrait:** long greying beard, worn leather vest, holding a ring of old brass keys, standing inside the dim shed with shelves of jars behind him, single oil-lamp light source.

**Silas Mercer** — *person: `sean`*
- **Title:** Land & Heritage Steward
- **Bio:** "Silas came up from the next hollow over in 1998 and never left. Walks the Whitford land daily, tends the four fields by name, keeps the family cemetery clear. Bill considers him kin. Silas does not comment on this."
- **Portrait:** short-cropped beard, flannel and canvas work coat, outdoors in tall grass with a walking staff, fog in the background, morning blue-grey light.

**Data file:** `src/sites/chunkymilk/data/leadership.ts` exports a `leaders` array of 4 entries, each with `person`, `name`, `title`, `bio`, and `portraitImage`. The `person` field is what connects these to apex Leader Detail pages.

## 6. File Layout

```
src/sites/chunkymilk/
├── config.ts
├── index.ts                  # barrel: config, pages, dynamicRoutes
├── data/
│   ├── products.ts           # 15 products + getProductBySlug
│   └── leadership.ts         # 4 leaders
└── pages/
    ├── home.tsx
    ├── products.tsx
    ├── about.tsx
    ├── the-chunkin-process.tsx
    ├── our-hollow.tsx
    ├── heritage.tsx
    ├── contact.tsx
    ├── privacy.tsx
    ├── terms.tsx
    ├── cart.tsx               # reuses shared CartPage
    ├── checkout.tsx           # reuses shared CheckoutPage
    └── product-detail.tsx     # wired into dynamicRoutes["products"]
```

## 7. Static Assets

Under `public/sites/chunkymilk/`:

- `hero.png` — misty hollow morning with jars on weathered planks (doubles as OG image)
- `favicon.png` — 64×64 crest (jar + three chunks)
- `logo.png` — circular wordmark crest for header
- `our-hollow-map.png` — hand-drawn style hollow map
- `settlin-shed.png` — lamp-lit shed interior (for Chunkin' Process page)
- `portraits/bill.png`, `jeb.png`, `otis.png`, `silas.png` — four leader portraits
- `products/*.png` — 15 product shots (jars on wood, accessories on linen; the cottage-pour shot shows the small white clusters clearly)

## 8. Registry, Middleware, Apex Integration

Required touches outside `src/sites/chunkymilk/`:

- `src/sites/registry.ts` — import and register `chunkymilk`
- `src/sites/subdomains.ts` — add `"chunkymilk"` to `VALID_SUBDOMAINS`
- `src/app/sitemap.ts` — add chunkymilk products to the productSites block for `/products/:slug`
- `scripts/resize-favicons.mjs` — add `chunkymilk` to the hardcoded sites array

Automatic once the above + leadership data are in place:
- Appears on apex `/portfolio`
- Appears on apex home under the `consumer-goods` vertical section
- Each leader gets a new Board Position entry on their apex leader detail page ("Patriarch & Founder — Whitford Family Chunky Milk", etc.)

Featured Holdings on apex is editorial-only and is intentionally not touched by this spec.

## 9. SiteConfig Skeleton

```ts
export const config: SiteConfig = {
  name: "Whitford Family Chunky Milk",
  subdomain: "chunkymilk",
  theme: {
    preset: "heritage",
    colors: {
      primary: "#3F5A3A",
      secondary: "#E8DFC8",
      accent: "#6B4423",
      background: "#F4EEDD",
      text: "#2A1F14",
    },
    fonts: { heading: "playfair", body: "lora" },
  },
  metadata: {
    title: "Whitford Family Chunky Milk — Made In The Hollow Since 1867",
    description: "Six generations of chunks, straight from the hollow.",
    ogImage: "/sites/chunkymilk/hero.png",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "The Chunkin' Process", path: "/the-chunkin-process" },
    { label: "Our Hollow", path: "/our-hollow" },
    { label: "Heritage", path: "/heritage" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: { commerce: true },
  verticalKey: "consumer-goods",
  tagline: "Six generations of chunks, straight from the hollow.",
}
```

(The `preset` field should match whatever preset closest matches this vibe in `src/themes/index.ts`; if none exists, drop the field and lean on the explicit colors — the implementation plan should check.)

## 10. Out of Scope

- Subscription / "Chunk of the Month Club"
- Behind-the-scenes video content
- Real payment or shipping integration (cart remains local state, as elsewhere)
- Editorial touches to apex Featured Holdings
