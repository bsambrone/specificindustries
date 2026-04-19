# Terrorclown Site Design

**Date:** 2026-04-19
**Subdomain:** `terrorclown`
**Parent brand:** The Pennywhistle Play Company (est. 1948, Millbrook, Ohio)
**Commerce:** enabled
**Vertical:** `consumer-goods`

## 1. Concept

A satirical toy-company site centered on a single flagship product — **Terror Clown™** — and accessories/experiences that extend it. The joke is the dissonance between earnest, warm 1950s-toy-company marketing copy and a product that is visibly, unmistakably a horror-fiction scary clown.

The Pennywhistle Play Company believes — sincerely, across three generations of family ownership — that it has sold "America's most trusted bedside companion since 1948." Every page is written from that point of view. The horror leaks through in product names, limited-edition drops, fine print, reassurance copy, and the imagery itself.

**Tagline (primary):** *"Where every child finds a friend."*

**Secondary rotating taglines / headline candidates:**
- *"The monster under your bed is real. And fun. And has razor-sharp teeth."*
- *"Scare the fear right out of your friends."*
- *"They'll appreciate THIS clown. Or else."*
- *"A lifelong companion for the brave child."*

## 2. Voice

Warm, earnest, faintly European-storybook. Copy never winks and never acknowledges horror directly. Humor comes from:

1. **A single unexpected word** undercutting an otherwise wholesome sentence ("Terror Clown is completely inanimate. Usually.")
2. **Taking normal toy-company claims one degree too literally** ("Personally reviews every customer letter. Has read over 4 million.")
3. **Treating horror-fiction tropes as craftsmanship features** ("Each of the 84 teeth is individually filed to a museum-quality point.")

**Recurring reassurance-microcopy vocabulary** (sprinkled through product descriptions, FAQ, safety page):
- *"Terror Clown is completely inanimate. Usually."*
- *"Teeth are cosmetic.*"* (asterisked footnote: *"under most conditions"*)
- *"Every Pennywhistle toy is 100% child-safe, as verified by our in-house panel of survivors."*
- *"If your Terror Clown appears to have moved, this is normal."*

**Occasional horror-brand flourishes:** Limited-edition product names (*The Floating Edition*, *The Long Smile Companion*, *The Gristle Set*) where the horror voice is allowed to the surface. Used sparingly, as a contrast.

## 3. Brand / company fiction

**Name:** The Pennywhistle Play Company
**Founded:** 1948, Millbrook, Ohio
**Structure:** Family-owned, three generations
**Flagship line:** Terror Clown™
**Values (marketing):** Craftsmanship, lineage, "Children First," hand-finished quality
**Factory:** 1940s brick industrial building in Millbrook with hand-lettered "PENNYWHISTLE PLAY CO." signage
**Workshop rooms:** Porcelain kiln room, enamel-finishing workshop with wooden racks of unfinished clown heads

## 4. Visual theme

**Aesthetic:** Vintage 1950s toy catalog. Warm cream backgrounds, halftone/paper-grain texture, hand-drawn ornamental dividers, sepia-tinted photography, rubber-stamp-style badges. Restrained and "official" rather than showy.

### Palette

- **Background:** warm cream `#F5EDE0`
- **Primary:** deep circus red `#A8352A` — CTAs, badges-on-cream, hero accents
- **Secondary:** muted teal `#3E6C6E` — secondary accents, links, frame lines
- **Text:** deep charcoal `#1F1A17` — warm off-black
- **Stamp variant:** ink-black `#0F0B09` — rubber-stamp overlays

**Contrast rules:**
- Badges on cream → deep red or ink-black only
- Teal on cream → acceptable for text ≥14pt bold; body text always charcoal
- No yellow / mustard / gold anywhere (portfolio contrast rule)

### Typography

- **Display** (headlines, logos, product names): *Cormorant Garamond* — elegant, slightly uncanny, antique-book-cover feel
- **Body:** *Lora* — highly readable period serif, pairs well with Cormorant
- **Accent / stamps / labels:** *Alfa Slab One* — bold slab for "NEW!", "BEST SELLER!", "100% INANIMATE" rubber-stamp badges

### Chrome / motifs

- Subtle halftone / paper grain on section backgrounds
- Ornamental dividers (fleurons, curled flourishes)
- Rubber-stamp badges ("AS SEEN IN LIFE MAGAZINE", "MOTHER-APPROVED", "100% INANIMATE", "TOY OF THE YEAR 1957")
- Vintage price-tag / coupon-cutout UI accents
- Small tooth-motif glyphs as bullet points, section dividers, accent marks
- Sepia-tinted product photography

## 5. Site architecture

### Static pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, flagship clown, Experiences grid, Haunted Headboard Bed, testimonials, pull-quotes |
| `/products` | Full catalog with category filters (Flagship · Experiences · Accessories · Bundles) |
| `/about` | Pennywhistle company story, three-generations fiction, factory imagery, leadership preview |
| `/leadership` | Full 4-exec bio page |
| `/safety` | Satirical safety page — high-density reassurance copy ("Terror Clown is completely inanimate. Usually.") |
| `/faq` | FAQ accordion in Pennywhistle voice |
| `/contact` | Satirical contact page with real `bsambrone@gmail.com` in fine print |
| `/privacy` | Umbrella callout + satirical numbered sections |
| `/terms` | Umbrella callout + satirical numbered sections |
| `/cart` | Standard cart |
| `/checkout` | Standard checkout |

### Dynamic routes

- `/products/[slug]` — individual product detail pages, one per SKU. Invalid slugs return 404.

### Header navigation

Home · Shop · Our Story · Safety · FAQ · Contact · [Cart icon with item count]

### Configuration details

- `features.commerce: true`
- `verticalKey: "consumer-goods"`
- `tagline: "Where every child finds a friend."`
- Add `terrorclown` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Add `terrorclown` products import to `src/app/sitemap.ts`
- `ogImage: "/sites/terrorclown/hero.png"` in config metadata
- Favicon at `public/sites/terrorclown/favicon.png` (64×64)
- Add `terrorclown` to hardcoded `sites` array in `scripts/resize-favicons.mjs`

## 6. Product catalog (20 SKUs)

All prices display in vintage-catalog `$XX.YY` format. Occasional fine-print callouts like *"AS LOW AS $X/MONTH WITH LAYAWAY"*.

### Flagship (2)

1. **Terror Clown™** — $199
   3 ft tall, porcelain face, stitched lips, soft weighted body. Impossibly wide smile revealing **four rows of sharp, hand-polished bone-white teeth, each individually filed to a museum-quality point** (84 total). Glass eyes. "America's most trusted bedside companion since 1948."

2. **The Haunted Headboard Bed** — $899 (twin) / $1099 (full)
   Solid oak, tall carved headboard etched with *"CAN'T SLEEP, CLOWNS WILL EAT ME."* Available in twin and full size variants. "Heirloom craftsmanship. Lifetime companionship."

### Experiences (6) — clown + environment bundles, $129–$249

3. **The Under-Bed Lurker Kit** — Terror Clown + slatted wooden bedskirt, dust motes included
4. **The Closet Observation Post** — Terror Clown + louvered wardrobe panel, peepholes pre-drilled
5. **The Sewer Grate Portal** — Terror Clown + cast-iron grate insert, optional drip track
6. **The Ceiling-Wire Night Watcher** — Terror Clown + ceiling-mount harness, gentle sway mechanism
7. **The Attic Whisper Setup** — Terror Clown + rafter mount, accompanying vintage suitcase
8. **The Basement Boiler Companion** — Terror Clown + steam-pipe prop, flickering pilot light

### Accessories (9) — universal add-ons, $19–$49

9. **The Gristle Set** — tooth-upgrade kit, replaces factory smile with fang-grade enamel
10. **The Long Smile Upgrade** — extended-mouth facial module, reveals rows five and six
11. **Red Balloon Bundle** — 12 helium-ready balloons, string included
12. **Voice Box Module: "Hi Georgie"** — approved phrases, child-safe volume
13. **Blood-Splatter Couture Kit** — three outfit options (fresh, aged, heirloom)
14. **Sewer-Scent Diffuser** — plug-in aromatherapy, "authentic underground bouquet"
15. **Replacement Eye Set** — variety pack (glass, milky, tracking)
16. **Pocket Terror Clown™** — travel-sized companion, 8 inches
17. **The Floating Edition Upgrade** — buoyancy kit, "tub, pool, and storm drain safe"

### Bundles (3) — $299–$1299

18. **The Starter Kit** — Terror Clown + one Experience + Red Balloon Bundle
19. **The Family Pack** — three Terror Clowns (varying heights), one Experience, one accessory
20. **The Deluxe Home Installation** — Haunted Headboard Bed + two Experiences + Sewer-Scent Diffuser

### Product data

- `src/sites/terrorclown/data/products.ts` exports `products` array and `getProductBySlug(slug)` helper
- Each product: `slug`, `name`, `category`, `price`, `tagline`, `description` (long-form catalog copy), `images` (array of paths), `includedItems`, `upgradeOptions`

## 7. Leadership team

Four canonical people re-themed as Pennywhistle Play Company executives. All male (matching the canonical base images). Sepia-toned formal studio portraits: 1950s suit with wide lapels, tie, pocket square, subtle smile, softly lit studio backdrop with painted-canvas texture. Slightly aged print quality. All four shot in the same style for a unified board-portrait feel.

Names randomized once at site-creation time, leaning whimsical-old-American. Names stable thereafter — not re-randomized per visit.

| Base person | Name | Title |
|---|---|---|
| `bill` | Cornelius P. Whistlethwaite III | Founder & Chief Toymaker |
| `brandon` | Ambrose Hollingsworth | President & Head of Child Welfare |
| `jim` | Mortimer Crane | VP of Experiential Products |
| `sean` | Silas Pennywhistle | Master Artisan & Keeper of the Kiln |

**Bio voice** — Pennywhistle-standard: lineage, craftsmanship, quiet unsettling detail.

- *Cornelius:* inherited the factory from his father and grandfather. "Has never missed a day of work. Still hand-finishes the teeth on every thousandth clown."
- *Ambrose:* oversees safety and the "Children First" promise. "Personally reviews every customer letter. Has read over 4 million."
- *Mortimer:* creative force behind the Experiences line. "Has been designing staging environments since 1962, when he was first asked to leave his childhood home."
- *Silas:* runs the porcelain workshop. Descendant of the original Pennywhistle. "Speaks rarely and smiles less."

**Data file:** `src/sites/terrorclown/data/leadership.ts` exports `leaders` array with 4 entries, each with `person: "bill" | "brandon" | "jim" | "sean"`, `name`, `title`, `bio`, `portraitImage`.

## 8. Imagery plan

All imagery is vintage 1950s catalog — sepia-warm, softly lit, slightly-aged print quality, uncanny-but-restrained. No gore. Horror lives in **what the clown does** (watching from closet slats, hanging from a ceiling wire, smiling too wide), never in blood or explicit menace.

### Hero image (site-wide, OG card)

Studio shot on warm cream backdrop: Terror Clown seated on a vintage child's rocking chair, holding a single red balloon. Impossibly wide smile with four rows of teeth clearly visible. Glass eyes catching studio light. Sepia wash, paper grain. "The Pennywhistle Play Company" wordmark stamped at bottom.

### Product photography (20 SKUs)

- **Flagship Clown:** front, ¾, close-up on teeth, full-length portrait — all studio cream backdrop
- **Haunted Headboard Bed:** period bedroom scene, headboard centered, etching legible, *no clown in frame* (implied menace)
- **Experiences (6):** diorama-style sets — under-bed slats with smile peeking out, closet slats with eyes, cast-iron sewer grate with a hand emerging, ceiling-wire suspension over an empty child's bed, attic rafter with suitcase, basement boiler beside pilot flame. Catalog styling, uncanny but never splattered
- **Accessories (9):** clean product shots on cream — teeth sets on velvet, outfits on miniature mannequins, voice-box module with labeled controls, balloons, diffuser unit, pocket clown in period travel case
- **Bundles (3):** group flatlay-catalog shots with all included pieces

### Supporting imagery

- **Leadership portraits (4):** sepia studio headshots per styling above
- **Facility shots (3):** Millbrook factory exterior (brick, hand-lettered sign), porcelain kiln room, enamel-finishing workshop with unfinished clown heads on racks
- **Press / accolade badges (6):** "AS SEEN IN LIFE MAGAZINE", "TOY OF THE YEAR 1957", "MOTHER-APPROVED", "100% INANIMATE", "CERTIFIED BY THE AMERICAN ACADEMY OF CHILDHOOD COMPANIONSHIP", "FAMILY-OWNED SINCE 1948"
- **Favicon:** stylized toothy smile mark at 64×64

### Generation plan

Following the prechewed / chunkymilk pattern. Total ~40 images:
- 1 hero
- 20 primary product shots + ~6 extra Flagship angles
- 4 leadership portraits
- 3 facility shots
- 6 press badges
- 1 favicon

Scripted via `scripts/` directory, using the existing image-gen MCP tooling.

## 9. Portfolio-pattern compliance

Required conventions applied:

1. **Privacy & Terms** — Umbrella callout (framed block pointing to `specificindustries.com/privacy` and `/terms`) followed by full satirical body content in Pennywhistle voice. Sample section titles: *"1. What We Collect (With Love)"*, *"2. Your Child's Data Is Family"*, *"3. Cookies (The Edible Kind, Mostly)"*, *"4. Your Rights as a Guardian"*.

2. **Leadership data file** — `src/sites/terrorclown/data/leadership.ts` with 4 entries, each tagged `person: "bill" | "brandon" | "jim" | "sean"`. Makes the site auto-discoverable from apex Board Positions.

3. **Contact page** — Satirical Pennywhistle-voice page with fictional mailing address ("PENNYWHISTLE PLAY COMPANY, 1 Toymakers Lane, Millbrook, OH 45344"), "Customer Letters Department" heading. Real `bsambrone@gmail.com` tucked into fine print.

4. **Sitemap** — Add `terrorclown` products import to `src/app/sitemap.ts` for dynamic `/products/[slug]` routes.

5. **OG image** — `ogImage: "/sites/terrorclown/hero.png"` in `config.ts` metadata.

6. **Favicon** — `public/sites/terrorclown/favicon.png` at 64×64. Add to `scripts/resize-favicons.mjs` `sites` array.

7. **verticalKey + tagline** — `verticalKey: "consumer-goods"`, `tagline: "Where every child finds a friend."`

8. **Subdomain allowlist** — Add `terrorclown` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`.

## 10. File layout

```
src/sites/terrorclown/
├── config.ts               # SiteConfig — theme, metadata, nav, features, verticalKey, tagline
├── index.ts                # Barrel — exports config, pages, dynamicRoutes
├── data/
│   ├── products.ts         # products array + getProductBySlug helper
│   ├── leadership.ts       # leaders array (4 entries with person tag)
│   ├── testimonials.ts     # customer letters
│   └── faq.ts              # FAQ entries
└── pages/
    ├── home.tsx
    ├── products.tsx        # catalog grid with category filter
    ├── product-detail.tsx  # dynamic /products/[slug]
    ├── about.tsx
    ├── leadership.tsx
    ├── safety.tsx
    ├── faq.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx

public/sites/terrorclown/
├── hero.png
├── favicon.png
├── products/               # 20 product images + extra flagship angles
├── leadership/             # 4 portraits
├── facility/               # 3 factory shots
└── badges/                 # 6 press/accolade stamps
```

## 11. Shared components used

From `src/components/ui/` and `src/components/layout/`:
- `Hero`, `FeatureSection`, `ProductCard`, `TeamMember`, `FaqAccordion`, `Timeline` (optional for "Our History")
- `Header`, `Footer`
- Commerce: `CartProvider`, `CartButton`, `AddToCartButton`, `Toast`

New site-specific components only if a pattern is truly one-off. Prefer composing existing primitives and letting CSS variables theme them.

## 12. Out of scope

- Age gate / "parental discretion" interstitial — the satire is the premise; no gating
- Real payment integration (commerce is localStorage-based, per platform convention)
- Multi-language / i18n
- Blog, news, or press-release pages beyond the About story
- Animated assets (video / GIFs) — all imagery is still

## 13. Known risks / tone calibration

- **Gore drift:** Keep product imagery uncanny, not bloody. Blood-Splatter Couture Kit stays *implied* — a folded outfit on a velvet pad with subtle staining, not a crime-scene photo.
- **Kids-in-peril drift:** The Haunted Headboard Bed and Ceiling-Wire Night Watcher imagery deliberately show *empty* beds / bedrooms. Clown imagery never depicts a child.
- **Voice drift:** Every page review should check that the warm Pennywhistle voice leads and the horror undercut is a single word / detail. If a page feels like "horror-brand first, toy-brand second," it's drifted.

## 14. Success criteria

1. Site loads at `terrorclown.specificindustries.com` with correct theming, nav, and content
2. All 20 products render on `/products` and have working detail pages
3. Add-to-cart works end-to-end through checkout
4. Four leadership portraits display on `/leadership` with bios, each tagged to the correct canonical person
5. Privacy, Terms, Contact, Safety, FAQ all render with correct copy
6. Apex Board Positions pages for bill, brandon, jim, sean show the new Pennywhistle titles
7. Apex `/portfolio` and home vertical sections surface terrorclown automatically
8. Sitemap includes all static and dynamic routes
9. OG card renders hero image on social share
10. Favicon displays correctly at 16/32/64px
11. `npm run lint` and `npx tsc --noEmit` pass
