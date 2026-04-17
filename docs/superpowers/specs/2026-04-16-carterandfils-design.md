# Domaine Carter & Fils — Design Spec

**Date:** 2026-04-16
**Subdomain:** `carterandfils`
**Status:** Approved for planning

## Summary

A satire subdomain site that presents as a seventh-generation French-American family winery in the Allegheny region of Pennsylvania. Every page commits fully to the winery fiction — copy, imagery, typography, and pricing all read as a legitimate boutique estate. The products being sold are, in fact, motor oil and other automotive fluids, mapped onto wine categories. The site never acknowledges this. The comedy emerges cumulatively, through product photography, tasting notes that are technically accurate for motor oil, and a handful of whisper-level terroir cues. The reveal lands on the reader, not on the page.

## Positioning

- **Name:** Domaine Carter & Fils
- **Tagline:** *"Estate-bottled in the Allegheny since 1859."*
- **Founding myth:** Édouard Carter, 1859, Allegheny foothills of western Pennsylvania. Seven generations of family stewardship. Current proprietor is Étienne Carter, who founded the estate's "modern era" in 2005 after returning from Burgundy and modernizing the cellar while preserving the family's methods.
- **Brand register:** Classical French boutique winery, old-world gravitas, New World terroir. The 1859 date is a real historical peg (the American oil industry began in Pennsylvania that year); the site leans on it to cosplay a generational winemaking heritage.
- **Comedy mode:** "Full Winery Cosplay" — every piece of copy is written 100% in winery voice. No winks, no explicit automotive references. The reveal happens via product imagery, vintage codes on labels (`5W-30`, `DOT 4`, `ATF`), bottle sizes (750ml / 1.5L / 5L mapping to quart / half-gallon / five-quart), and a few whisper-level terroir cues.

## Visual Direction

### Palette

| Token | Hex | Role | Subtext |
|---|---|---|---|
| Deep Oil Noir | `#0B0906` | Primary dark | Reads as "very dark Bordeaux" at a glance; is actually used motor oil |
| Amber Crude | `#B8791C` | Primary accent | Reads as "Sauternes / aged Chardonnay"; is actually fresh 10W-30 |
| Parchment Cream | `#F2EAD3` | Background / body | Wine label paper |
| Oxblood | `#5C1A1B` | Secondary accent | Deep wine-red accent for CTA and headings |
| Brushed Copper | `#A0623A` | Metallic accent | Used for hairlines, label edges, monogram |

The palette reads as classical winery on first glance but skews darker and more petroleum-toned than a typical wine brand. Intentional.

### Typography

- **Headings:** Cormorant Garamond (serif, classical French-winery feel)
- **Body:** Lora (readable literary serif)
- **Accents / small caps:** Cormorant SC (for labels like `GRAND CRU`, `RESERVE`)

Fonts are added to `src/themes/fonts.ts` per the project's font declaration pattern.

### Motifs

- Engraved bottle illustrations rather than photographs where possible
- Parchment-textured backgrounds
- Copper hairlines dividing sections
- A family crest / monogram with a subtle gear tooth hidden in the laurel wreath
- Hero imagery: "rolling Allegheny hills" composed like wine country, with oil derricks just barely visible in the tree line

## Site Architecture

### Navigation

Top nav (in order): **Our Story · The Cellar · Wine Club · Visit the Estate · Journal · Contact**

### Pages

| Route | Type | Purpose |
|---|---|---|
| `/` | static | Home — hero, estate intro, featured vintages, club teaser, critic pull-quote |
| `/our-story` | static | Estate history, 1859 founding myth, Allegheny terroir philosophy, seven-generation lineage |
| `/family` | static | The leadership team — four executive profiles, rendered from `data/leadership.ts` |
| `/cellar` | static | Product catalog, filterable by category (Reds / Whites / Rosés / Sparkling / Dessert / Vinho Verde) |
| `/cellar/[slug]` | dynamic | Product detail — vintage metadata, tasting notes, pairings, add-to-cart |
| `/wine-club` | static | Three subscription tiers with comparison cards |
| `/visit` | static | Tasting room, estate tour, hours, directions, private events |
| `/journal` | static | Sommelier's Journal landing — article cards |
| `/journal/[slug]` | dynamic | Individual journal entries |
| `/cart` | static | Cart (commerce) |
| `/checkout` | static | Checkout (commerce) |
| `/contact` | static | Contact info + inquiry form. Real email `bsambrone@gmail.com` in small print (per cross-site convention) |
| `/privacy` | static | Specific Industries umbrella callout + full satirical privacy content |
| `/terms` | static | Specific Industries umbrella callout + full satirical terms content |

### Technical integration

Follows the existing subdomain site pattern:

- Directory: `src/sites/carterandfils/`
- Barrel file exports `config`, `pages`, `dynamicRoutes`
- `dynamicRoutes` configured for `/cellar/[slug]` and `/journal/[slug]` with `getMetadata` and `isValidSlug` per route
- `features.commerce: true` in config (enables `CartProvider`, `CartButton`, cart page, checkout page)
- Registered in `src/sites/registry.ts` and added to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Products imported in `src/app/sitemap.ts` under the `productSites` block so `/cellar/:slug` URLs appear in the sitemap
- Journal entries also added to sitemap if sitemap supports an additional pattern; otherwise added to a small custom block
- `ogImage` field in `config.ts` metadata, pointing to `/sites/carterandfils/hero.png`
- Static assets live under `public/sites/carterandfils/`

## Product Catalog

### Category-to-fluid mapping (the core satire matrix)

| Wine Category | Actual Product | Count |
|---|---|---|
| Reds | Motor oils (various viscosity grades) | 7 |
| Whites | Power steering fluid | 3 |
| Rosés | Coolant / antifreeze | 3 |
| Sparkling | Brake fluids (DOT 3 / 4 / 5) | 3 |
| Dessert | Transmission fluid (ATF, CVT, gear oil) | 4 |
| Vinho Verde | Windshield washer fluid | 2 |

**Total:** 22 products.

### Product data shape

Extends the existing `Product` interface used across commerce-enabled sites:

```typescript
{
  slug: string
  name: string                    // "2017 Allegheny Reserve Syrah 5W-30"
  category: "red" | "white" | "rose" | "sparkling" | "dessert" | "vinho-verde"
  vintage: number                 // 2017
  grade: string                   // "5W-30" — displayed on label as a "vintage code"
  varietal: string                // "Allegheny Syrah"
  price: number                   // USD, bottle price for the default 750ml
  sizes: Array<{ label: string, ml: number, price: number }>
                                  // e.g., [{label:"750ml", ml:750, price:68}, {label:"1.5L Magnum", ml:1500, price:128}, {label:"5L Jeroboam", ml:5000, price:395}]
  tastingNotes: string            // 2–3 sentence sommelier prose
  pairings: string[]              // e.g., ["Sunday drives through rolling farmland", "long solitary commutes"]
  terroirNote: string             // 1–2 sentences about the Allegheny source
  agingProfile: string            // "Drinks well now; improves noticeably after 5,000–7,000 miles of cellar time."
  description: string             // Short product card copy (~40 words)
  image: string                   // Path to engraved bottle illustration
}
```

### Naming conventions

- Reds: `YYYY [Estate Name] [Grape] [Viscosity]` — e.g., "2017 Allegheny Reserve Syrah 5W-30"
- Whites: `YYYY [Descriptor] Blanc` — e.g., "2020 Hydraulique Blanc"
- Rosés: `YYYY [Descriptor] Rosé` — e.g., "2022 Antigel Rosé"
- Sparkling: `NV Brut [DOT Grade]` — e.g., "NV Brut DOT 4 Prestige"
- Dessert: `YYYY [Style] [Descriptor]` — e.g., "2016 Late Harvest ATF"
- Vinho Verde: `YYYY [Descriptor] Verde` — e.g., "2024 Windshield Verde"

### Price range

$35 (young Vinho Verde 750ml) to $395 (Carter Heritage Cuvée 5L jeroboam). Realistic boutique-winery pricing.

### Product detail page layout

Two columns:
- **Left:** Engraved bottle illustration
- **Right:** Breadcrumbs (`Cellar › Reds › 2017 Allegheny Reserve Syrah`), product name, vintage, category, price, size selector, tasting notes, pairings, add-to-cart
- **Below:** Expandable "Sommelier's Note" (longer prose), then "From the Same Vintage" carousel

## Key Page Concepts

### Home (`/`)

- Hero: wide vineyard composition; tagline *"Seven generations of estate-bottled excellence."*; CTA "Explore the Cellar"
- Featured Vintages strip (3 products)
- "The Allegheny Terroir" short section with a parchment-backed quote
- Wine Club teaser card
- Critic pull-quote: *"A revelation in viscosity." — Decanter Quarterly*

### Our Story (`/our-story`)

Long-scroll, section-by-section:
1. The 1859 founding — Édouard Carter and the first Allegheny vines
2. The philosophy of terroir — the shale, the depth, the pressure
3. Seven generations: Édouard I → Jean-Luc → Henri → Philippe → Gaston → Raphaël → Étienne (text-only, no portraits)
4. Modernization — the current generation's balance of tradition and contemporary winemaking
5. Commitments — quality, patience, "the old ways"

### The Family (`/family`)

Grid of four executive profile cards driven by `data/leadership.ts`. Each card shows portrait, name, title, short bio excerpt, and links to a full profile on the same page.

### Wine Club (`/wine-club`)

Three tier cards:

| Tier | Price | Included |
|---|---|---|
| **Silver Cellar** | $49/mo | 1 bottle/month, curated reds |
| **Gold Reserve** | $129/mo | 3 bottles/month, mixed cellar selection |
| **Platinum Collector** | $299/mo | 6 bottles/month, early access to Grand Cru releases, annual estate visit invitation |

Each tier's "what's included" list reads as wine-club perks but quietly describes an oil subscription (e.g., "complimentary pouring funnel on your third shipment," "priority access to our Reserve bottlings").

### Visit the Estate (`/visit`)

- **Tasting Room** — photo of what is clearly a mechanic's workbench styled as a sommelier's counter
- **Estate Tour** — "90 minutes through our cellars and oak-aging facility"
- **Hours & Directions** — map with a plausible Pennsylvania address
- **Private Events** — "Host your next gathering in the Allegheny Barrel Room"

### Sommelier's Journal (`/journal`)

Landing page with 6 article cards. Proposed seed articles (each ~300–500 words of wine-criticism prose that happens to be technically correct for motor oil):

1. *"Decanting 101: A Gentleman's Guide"*
2. *"Understanding Viscosity: What the Numbers Actually Mean"*
3. *"Pairing the 2019 Allegheny Syrah with Classic American Motorsport"*
4. *"Why Allegheny Shale Is the New Bordeaux"*
5. *"Sulfites, Additives, and the Honest Winemaker"*
6. *"A Note on Proper Storage: Temperature, Light, and Drip"*

Journal data lives in `src/sites/carterandfils/data/journal.ts` with shape `{ slug, title, excerpt, publishedDate, author, body }`.

## Leadership Team

`data/leadership.ts` follows the canonical `Executive` shape used in other sites (`slug`, `name`, `title`, `bio`, `quote`, `image`, `referencePerson`).

| `referencePerson` | Name | Title | Portrait style |
|---|---|---|---|
| `bill` | **Étienne Carter** | Seventh-Generation Proprietor & Head Winemaker | French-aristocrat winemaker, tweed blazer, slightly disheveled from cellar work, standing before rolling vineyards. Subtle tell: dark smudge on his cuff. |
| `brandon` | **Rémi Dumoulin** | Cellar Master | Apron, pipette in hand, oak-barrel cellar behind him. Subtle tell: barrels stenciled with stock numbers like `10W-40`. |
| `jim` | **Archibald Whitford** | Chief Sommelier (ex-Bordeaux) | Anglophile-sommelier treatment, tuxedo, taste-vin around neck, tipped glass shows "wine" that reads nearly black. |
| `sean` | **Laurent Beaufort** | Director of Terroir & Vineyard Operations | Field attire, tweed jacket, standing at the edge of the "vineyards" — which on second look are oil derricks framed by poplars. |

Note on the randomization rule: the cross-site convention requires both first and last names to randomize per site. The Carter-family brand puts a fixed surname in tension with this. Resolution: only Bill (the current Carter patriarch) carries the Carter surname. The other three have distinct randomized full names and are framed as long-serving estate staff rather than family members.

Bio voice: restrained, literary, reverent toward the craft, sincere in the winery fiction. Example (Étienne):

> "Étienne represents the seventh Carter generation to steward this estate. Raised among the oak barrels and the low Allegheny mist, he apprenticed under his father in the cellar from the age of twelve. His hands, he will tell you, know the depth of a proper ferment without thermometer or gauge. He does not discuss viscosity in public."

Portraits generated via the existing `scripts/` pipeline using the four reference photos as source. Outputs to `public/sites/carterandfils/exec-<slug>.png` with site-themed styling per the table above.

## Tone & Voice Rules

**Cardinal rule:** Never break character. The site is a winery's website. Any breach of the fiction kills the reveal.

### Banned words (anywhere on the site)

motor oil · petroleum · crude · engine · automotive · vehicle · car · lubricant · quart · gallon · pour (in an automotive sense)

### Embraced words (used strictly as wine vocabulary)

viscosity · weight · grade · synthetic · conventional · reserve · cuvée · vintage · terroir · minerality · legs · nose · bouquet · finish · body · structure · bottling · ferment · oak-aged

### Whisper vectors — where the reveal quietly leaks

1. **Terroir copy** — "Allegheny shale," "deep earth pressure," "hydrocarbon minerality" all read as legitimate oenology
2. **Tasting notes** — "notes of graphite, walnut shell, rubber, and distant asphalt on a summer road"
3. **Vintage codes on labels** — `5W-30`, `DOT 4`, `ATF` rendered as tasteful label text
4. **Bottle sizes** — 750ml / 1.5L magnum / 5L jeroboam (which happen to be quart / half-gallon / five-quart)
5. **Pairings** — "pairs beautifully with a long Sunday drive through rolling farmland"
6. **Aging advice** — "drinks well now; will improve noticeably after 5,000–7,000 miles of cellar time"

### Voice register

- Restrained, literary, trusting the reader
- No exclamation points
- No emoji
- First-person plural (`we`) for estate copy
- French phrases sparingly — `la maison`, `vieilles vignes`, `sur lie`
- Humor is dry and cumulative; no page contains a punchline

## Cross-Site Conventions (required)

Per project conventions, this site must include:

1. **Privacy & Terms** — each page leads with the Specific Industries umbrella callout, then contains full satirical site-specific content in the site's voice (numbered sections on data collection, cookies, user rights, etc.). See `pigmilk/pages/privacy.tsx` for the canonical shape.
2. **Leadership team** — the four-person lineup above with randomized names and site-themed portraits.
3. **Contact page** — satirical but contains the real contact email `bsambrone@gmail.com` in small print.
4. **Sitemap** — `src/app/sitemap.ts` updated to include `/cellar/:slug` product URLs (and journal URLs if supported by the existing sitemap structure).
5. **OG image** — `ogImage` field in `config.ts` metadata pointing to `/sites/carterandfils/hero.png`.
6. **Subdomain allowlist** — `carterandfils` added to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`.

## Out of Scope

- No real commerce backend — cart is the standard `localStorage`-based `CartProvider`; no payment integration beyond the existing checkout stub.
- No user accounts, order history, or saved addresses.
- No server-side search or filtering — `/cellar` filters are client-side on a static catalog.
- No CMS — all content (products, journal entries, leadership) is TypeScript data files.
- No animation / motion design beyond Tailwind's default transitions.
- No internationalization.

## Open Questions

None at spec-approval time. Any ambiguities surface during planning.
