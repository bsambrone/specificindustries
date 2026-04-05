# Grass Fed WiFi — Site Design Spec

**Subdomain:** `grassfedwifi`
**Brand:** Grass Fed WiFi
**Tagline:** "Farm-to-Table Wi-Fi"
**Subtag:** "Raw Spectrum. Pasture-Raised Connectivity."
**Humor style:** Heavy satire. Overly earnest crunchy-granola health-food-store copy, colliding with telecom jargon and winery pretension. The co-op takes itself completely seriously. Both conventional wifi and mass-market 5G are framed as industrial, contaminated, factory-farmed alternatives. Raw Spectrum™ is the co-op's mysterious pre-industrial third option.

## Theme

| Token | Value |
|-------|-------|
| Primary | `#87A96B` (sage green) |
| Secondary | `#A8C8E0` (sky blue pastel) |
| Accent | `#E8D5A2` (warm wheat) |
| Background | `#FAF7F0` (cream paper) |
| Text | `#2D4A2B` (deep forest) |
| Heading font | Fraunces (new — must be added to `fonts.ts`) |
| Body font | Nunito (new — must be added to `fonts.ts`) |
| Preset | `"pastoral"` (new) |

**Visual direction:** Cream/paper-textured backgrounds. Hand-drawn botanical and agricultural illustrations layered over photos. Circular "seal of authenticity" badges ("Certified Raw Spectrum," "Hand-Harvested 2026"). Textural dividers (scalloped edges, hand-drawn lines). Rustic serif headings, warm humanist sans body — reads like a farm-to-table restaurant menu or artisan co-op newsletter.

## Pages

| Slug | Page | Notes |
|------|------|-------|
| `""` | Home | Hero + current-month Harvest Calendar centerpiece + 3 share tiers preview + "Why Raw Spectrum" manifesto excerpt + featured field note |
| `"shares"` | Shares | Three-tier catalog (Heirloom / Reserve / Estate) + seasonal add-ons section |
| `"harvest-calendar"` | Harvest Calendar | 12-month visual calendar with absurdly-specific monthly metadata |
| `"grazing-lands"` | Grazing Lands | Stylized territory map with farm-site profiles |
| `"the-pasture"` | The Pasture | Co-op manifesto / origin story / philosophy (replaces "about") |
| `"meet-the-farmers"` | Meet the Farmers | Leadership page with 4 farmer-stewards (footer-linked) |
| `"field-notes"` | Field Notes | Satirical editorial index (farmer diaries, seasonal dispatches) |
| `"contact"` | Contact | Satirical contact methods + real email in small print |
| `"join"` | Join the Co-op | Membership signup entry point (links into commerce flow) |
| `"my-share"` | My Share | Renamed cart page |
| `"become-a-member"` | Become a Member | Renamed checkout page |
| `"privacy"` | Privacy Policy | Short satirical intro, defers to Specific Industries policy as authoritative |
| `"terms"` | Terms of Use | Short satirical intro, defers to Specific Industries policy as authoritative |
| `"disclaimer"` | Disclaimer | Satirical parody disclaimer, footer-linked |

**Dynamic routes:**
- `shares/{slug}` — individual share tier detail page
- `field-notes/{slug}` — individual editorial post detail

**Commerce:** `features.commerce: true`, localStorage key `grassfedwifi-cart`. Cart UI strings must be re-themed: "Cart" → "My Share", "Checkout" → "Become a Member", "Add to Cart" → "Add to Share", "Your cart is empty" → "Your share basket is empty," etc.

## Navigation

**Top nav (flat, 5 items + CTA):**

| Label | Path |
|-------|------|
| Shares | `/shares` |
| Harvest Calendar | `/harvest-calendar` |
| Grazing Lands | `/grazing-lands` |
| The Pasture | `/the-pasture` |
| Field Notes | `/field-notes` |
| **[Join the Co-op]** (CTA) | `/join` |

**Footer (three columns + bottom strip):**

- **Col 1 — The Co-op:** The Pasture · Meet the Farmers · Grazing Lands
- **Col 2 — Members:** Shares · Harvest Calendar · Field Notes
- **Col 3 — Get in Touch:** Contact · Join the Co-op CTA
- **Bottom strip:** Privacy · Terms · Disclaimer · © copyright line

## Share Tiers

### Data Structure

```typescript
interface Share {
  slug: string
  name: string
  price: number
  priceLabel: string      // e.g., "$39/month"
  tagline: string
  description: string[]
  image: string
  includes: string[]       // bullet list of what's included
  bandwidth: string         // absurd descriptor
  allocation: string        // "single household" / "family" / etc.
  seasonalAddonsIncluded: number | "all"  // 0, 1, or "all" (Estate gets all)
  disclaimers: string[]
}
```

### Catalog (the three base tiers)

| Share | Slug | Price | Tagline |
|-------|------|-------|---------|
| Heirloom Share | `heirloom` | $39/month | "Classic free-roaming signal. Our original recipe, unchanged since the co-op's founding." |
| Reserve Share | `reserve` | $79/month | "Small-batch signal aged in oak-lined server rooms. Hand-selected frequencies." |
| Estate Share | `estate` | $149/month | "Hand-churned packets from our highest pastures. Limited availability. Allocated by committee." |

**Heirloom details:**
- Bandwidth: "A generous, unpasteurized pour"
- Allocation: Single household
- Seasonal add-ons: 0 (purchased separately)
- Includes: Unlimited free-range browsing, stone-ground DNS, monthly farmer newsletter

**Reserve details:**
- Bandwidth: "Small-batch, barrel-aged packets"
- Allocation: Family share (up to 6 devices)
- Seasonal add-ons: 1 (member's choice, rotating)
- Includes: Everything in Heirloom + priority signal access during allocation hours + quarterly farm tour invitation

**Estate details:**
- Bandwidth: "Unlimited hand-churned throughput"
- Allocation: Community share (household + small business, unlimited devices)
- Seasonal add-ons: All four, included
- Includes: Everything in Reserve + name hand-carved into the co-op barn + dedicated farmer-steward contact + annual harvest-supper invitation

## Seasonal Add-ons

Rotating quarterly, tied to Harvest Calendar. Each add-on is its own purchasable line item.

| Add-on | Slug | Availability | Price | Flavor |
|--------|------|--------------|-------|--------|
| Spring Pollen Pack | `spring-pollen` | Mar–May | $19/quarter | "Delicate early-season frequencies, perfect for video calls" |
| Summer Solstice Bundle | `summer-solstice` | Jun–Aug | $19/quarter | "Peak bandwidth at maximum daylight. Sun-ripened packets." |
| Harvest Moon Premium | `harvest-moon` | Sep–Nov | $29/quarter | "The richest signal of the year, gathered at peak density" |
| Winter Reserve | `winter-reserve` | Dec–Feb | $19/quarter | "Slow-signal, cold-pressed bandwidth for quiet months" |

## Harvest Calendar

Twelve-month visual calendar. Each month gets absurdly-specific metadata. Homepage pulls the current-month card as a featured element.

**Per-month fields:**
- Month name
- "In season" signal (e.g., "4.2 GHz pollen-dusted packets")
- "Pairs well with" (e.g., "sourdough starters, morning zoom calls")
- "Harvest notes" (1–2 sentences of farmer commentary)
- Featured add-on (if any)
- Illustration/photo

**Example (April):**
- In season: *4.2 GHz coming in strong, pollen-dusted packets*
- Pairs well with: *Sourdough starters, balcony gardening, lukewarm video calls*
- Harvest notes: *"A gentle month. We hand-gather packets at dawn, before the bees wake. Expect occasional gaps during afternoon thunderstorms — these are features, not bugs."*
- Featured add-on: Spring Pollen Pack

## Leadership Team (Meet the Farmers)

Four farmer-stewards, using base reference photos of the standard 4 people (bill/brandon/jim/sean), generated with farmer / amish / conspiracy-theorist styling.

| Name | Base Person | Title | Quirk |
|------|-------------|-------|-------|
| Hollis Thornfield | bill | Co-op Elder & Head Signal Herder | Founded the co-op after a 72-hour fast at a mountain WiFi dead zone. Carries a hand-carved antenna wherever he goes. |
| Ezekiel "Zeke" Meadowbrook | brandon | Chief Spectrum Steward | Ex-telecom insider who "walked away with nothing but the signal in his bones." Refuses to acknowledge microwaves. |
| Porter Wheatgrass | jim | Director of Frequency Husbandry | Rotates the co-op's frequency pastures on a lunar calendar. Claims he can taste the difference between 2.4 GHz harvested morning vs. evening. |
| Fennel Ashcroft | sean | Keeper of the Harvest Calendar & Seasonal Allocations Lead | Hand-writes every member's allocation in a leather-bound ledger. Doesn't trust spreadsheets. |

## Grazing Lands

Stylized territorial map page showing where the co-op's signal is "grown." Think hand-drawn fantasy-map aesthetic — not a real geographic map.

**Content:**
- Large hand-drawn illustrated map (`grazing-map.png`) with 4–6 named farm sites
- Per-farm callout cards describing each site's specialty (e.g., "North Pasture — known for especially fragrant 5 GHz, harvested at dawn")
- "Territorial philosophy" section — 2–3 paragraphs on how the co-op rotates signal pastures to prevent over-grazing

## The Pasture

Long-form manifesto/origin story. The co-op's full philosophy. Replaces the standard "About" page.

**Content sections:**
1. **Hero** — Co-op barn image + founder quote
2. **The Founding** — How Hollis Thornfield started the co-op after his vision
3. **What's Wrong With Conventional Signal** — Satirical screed against pasteurized wifi and industrial 5G
4. **Our Philosophy** — Raw Spectrum, small-batch harvests, frequency rotation, no additives
5. **The Certifications We Refuse** — List of industry certifications the co-op has declined to participate in (FCC, FTC, etc.) with mock-earnest explanations

## Field Notes

Satirical editorial index — farmer diaries, seasonal dispatches, harvest reports. Uses dynamic routes for per-post pages.

**Data Structure:**

```typescript
interface FieldNote {
  slug: string
  title: string
  author: string            // one of the 4 farmer-stewards
  date: string              // ISO date
  excerpt: string
  body: string[]            // array of paragraph strings
  image: string
  tags: string[]            // "harvest" | "philosophy" | "dispatch" | "seasonal"
}
```

**Initial 3 posts:**

1. **"What We Lost When We Pasteurized the Signal"** by Hollis Thornfield — essay on signal purity
2. **"Notes from the Spring Rotation"** by Porter Wheatgrass — seasonal dispatch from the frequency pastures
3. **"Why We Don't Trust the FCC (or the FTC, or the IEEE)"** by Ezekiel Meadowbrook — conspiracy-adjacent manifesto

## Image Inventory

All images live at `public/sites/grassfedwifi/`. Generated via `scripts/generate-grassfedwifi-images.ts` (follow pattern of `scripts/generate-truegrit-images.ts`).

**Visual concept:** Every image blurs farming + router tech. Wooden split-rail fences with antennas mounted like scarecrows. Weathered barns with coaxial cable trailing from haylofts. Farmer's market stands selling mason jars of glowing "raw spectrum." Amish-style wagons with WiFi routers lashed to the back. Tin cans and twine stretched between silos. Cows grazing beside transmission towers disguised as trees.

**Inventory (~24 images):**

| Image | Purpose |
|-------|---------|
| `home-hero.png` | Homepage hero — pastoral scene with router-scarecrows |
| `pasture-hero.png` | The Pasture page hero — weathered barn + cables |
| `grazing-hero.png` | Grazing Lands hero — wide-open frequency pasture at dawn |
| `calendar-hero.png` | Harvest Calendar hero — seasonal harvest tableau |
| `notes-hero.png` | Field Notes hero — farmer at writing desk with antenna |
| `team-bill.png` | Hollis Thornfield portrait (farmer/amish/conspiracy styled) |
| `team-brandon.png` | Ezekiel Meadowbrook portrait |
| `team-jim.png` | Porter Wheatgrass portrait |
| `team-sean.png` | Fennel Ashcroft portrait |
| `share-heirloom.png` | Heirloom Share card image |
| `share-reserve.png` | Reserve Share card image |
| `share-estate.png` | Estate Share card image |
| `seasonal-spring.png` | Spring Pollen Pack |
| `seasonal-summer.png` | Summer Solstice Bundle |
| `seasonal-harvest.png` | Harvest Moon Premium |
| `seasonal-winter.png` | Winter Reserve |
| `grazing-map.png` | Hand-drawn territorial map |
| `pasture-founding.png` | Founder vision / origin-story image |
| `pasture-barn.png` | Co-op barn interior/exterior |
| `pasture-philosophy.png` | Frequency rotation philosophy image |
| `notes-featured-1.png` | Field Notes post 1 thumbnail |
| `notes-featured-2.png` | Field Notes post 2 thumbnail |
| `notes-featured-3.png` | Field Notes post 3 thumbnail |
| `contact-pigeon.png` | Carrier pigeon with router strapped to its back |
| `favicon.png` | Site favicon |

## Performance Budget (mobile-first)

- All images exported at 2x target display size max
- Served as WebP (PNGs only if transparency is required)
- Hero images: < 200 KB each after compression
- Card images: < 80 KB each
- `next/image` for automatic responsive sizing + lazy loading
- `fetchPriority="high"` on LCP images only (home hero, current-page hero)
- All non-hero images lazy-load by default
- Image `width`/`height` always declared to prevent CLS
- Blur placeholders on hero images
- Font subsets loaded only for Latin characters

## Standard Patterns

**Contact page:** Absurdly elaborate contact methods (carrier pigeon to north pasture, visit the barn during sunrise allocation hours, tune antenna to 4.2 GHz on third Tuesday). At the bottom, in small print: *"In the event your carrier pigeon is grounded: bsambrone@gmail.com"*. No contact form.

**Privacy page:** Short satirical opening ("We keep our data the way we keep our signal: free-roaming and uncollected"). Then authoritative statement: "The authoritative privacy policy governing this site is the Specific Industries Privacy Policy, available at specificindustries.com/privacy." Link provided.

**Terms page:** Short satirical opening. Authoritative statement: "The authoritative terms of use governing this site are the Specific Industries Terms of Use, available at specificindustries.com/terms." Link provided.

**Disclaimer page:** One-page satirical disclaimer clarifying this is parody. All claims about raw spectrum, frequency husbandry, signal grazing, unpasteurized bandwidth, etc. are satirical.

## Implementation Notes

**New theme preset:** `"pastoral"` — add to `src/themes/index.ts` preset map.

**New fonts:** Fraunces (heading) + Nunito (body) must be added to `src/themes/fonts.ts` following the 4-step pattern: import via `next/font/google`, declare variable, add to `fontVariables` array, add CSS font-family string to `fontFamilyMap`.

**Site module structure:**

```
src/sites/grassfedwifi/
├── config.ts                  # SiteConfig (theme, metadata, nav, features)
├── index.ts                   # barrel: config, pages, dynamicRoutes
├── data/
│   ├── shares.ts              # share tier catalog + getShareBySlug
│   ├── seasonal-addons.ts     # seasonal add-on catalog
│   ├── harvest-calendar.ts    # 12 months of data
│   ├── farmers.ts             # leadership team data
│   ├── grazing-lands.ts       # farm-site profiles + map metadata
│   └── field-notes.ts         # initial 3 posts + getFieldNoteBySlug
└── pages/
    ├── home.tsx
    ├── shares.tsx
    ├── share-detail.tsx
    ├── harvest-calendar.tsx
    ├── grazing-lands.tsx
    ├── the-pasture.tsx
    ├── meet-the-farmers.tsx
    ├── field-notes.tsx
    ├── field-note-detail.tsx
    ├── contact.tsx
    ├── join.tsx
    ├── my-share.tsx            # themed cart page
    ├── become-a-member.tsx     # themed checkout page
    ├── privacy.tsx
    ├── terms.tsx
    └── disclaimer.tsx
```

**Registry:** Add `grassfedwifi` to `src/sites/registry.ts`, following the pattern used by other commerce sites (with `dynamicRoutes` for shares + field-notes).

**Shared components reused:** Hero, FeatureSection, ProductCard (for share tiers), Timeline (for Harvest Calendar possibly), TeamMember (for farmers), FaqAccordion if needed. Build new shared components only if a pattern will be reused across sites.

**Potentially new shared components** (flag for decision during implementation):
- `HarvestCalendarGrid` — 12-month visual calendar. May be grassfedwifi-specific initially; extract if reused.
- `TerritoryMap` — labeled illustrated map with callouts. Grassfedwifi-specific initially.

**Out of scope for v1:**
- Member login / account management
- Actual subscription billing (existing cart system handles checkout UI only)
- Live bandwidth metrics / signal quality dashboards
- Sign-up for the Field Notes newsletter (form UI only, no backend)
