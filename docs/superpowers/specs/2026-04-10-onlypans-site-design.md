# OnlyPans (the literal pans one) — Site Design

**Subdomain:** `onlypans.specificindustries.com`
**Date:** 2026-04-10
**Status:** Design — pending implementation plan

## Concept

A satire site that takes the OnlyFans subscription-content format and applies it to literal pans (the cookware kind). The deadpan absurdity is the joke: a pan doesn't *do* anything — subscribers pay to look at a motionless piece of cookware in various still states (morning light, after polish, cold stovetop, and so on).

OnlyPans is positioned as a **hostile competitor to OnlyFans**, not a sister site. The home page includes a prominent "Why we're a better platform than those people with the fans" band that enumerates eight reasons pans are superior to fans — every reason literally true about a pan, every reason absurd as a competitive argument. The four executives are a wholly separate leadership team who "left the airflow industry to do something more substantial." The meta-joke for anyone browsing both sites: the four exec photos are obviously the same four men as on OnlyFans — they just switched industries and are ashamed of both.

**Tone.** PG. Innuendo lives entirely in the "subscribe to a literal pan" framing. Every line parses as 100% literal cookware copy.

**Visual treatment.** Molten-copper warm palette (`#C2410C` primary, `#FFF6ED` cream background) — deliberately distinct from OnlyFans' cyan. Same Inter font family already in `fontFamilyMap`.

## Reference

OnlyPans is structurally a clone of OnlyFans. This spec enumerates the deltas; for any architectural decision not mentioned here, the OnlyFans spec is the source of truth:

- `docs/superpowers/specs/2026-04-10-onlyfans-site-design.md` — authoritative for all shared architecture, component contracts, data shapes, subscribe/tip flow, locked-thumbnail behavior, umbrella-policy privacy/terms pattern, and footer/disclaimer handling.
- `src/sites/onlyfans/` — authoritative for the concrete code shape that OnlyPans will mirror.

## Deltas From OnlyFans

| Thing | OnlyFans | OnlyPans |
|---|---|---|
| Subdomain | `onlyfans` | `onlypans` |
| Site name | "OnlyFans" | "OnlyPans" |
| Primary color | `#00AFF0` cyan | `#C2410C` molten copper |
| Secondary color | `#0095CD` deeper cyan | `#7C2D12` deep rust |
| Accent color | `#FF7A59` coral | `#FDE68A` warm amber |
| Background | `#FFFFFF` white | `#FFF6ED` cream |
| Text | `#0F172A` slate | `#1C0F05` near-black coffee |
| Fonts | `inter` + `inter` | `inter` + `inter` |
| Nav label for browse | "Meet the Fans" | "Meet the Pans" |
| Dynamic route shape | `/browse/[slug]` | `/browse/[slug]` |
| Storage key | `onlyfans-subscriptions` | `onlypans-subscriptions` |
| Subscribe event | `onlyfans-subscribed` | `onlypans-subscribed` |
| Toast event | `onlyfans-toast` | `onlypans-toast` |
| Roster | 8 fans blowing air | 8 pans in various still states |
| "Content" framing | Fans at different speeds/angles | Pans in different lighting / seasoning / polish / angle states |
| Home page rant section | (none) | **"Why we're a better platform than those people with the fans"** — 8-reason home-page band |
| Executives | Hatcher/Wexley/Castellan/Morrow, ashamed founders | Pennington/Holloway/Beckwith/Rowe, "left the airflow industry" framing |
| About page | Earnest mournful founder story | Earnest mournful founder story + swipe at "competitors in the airflow space" |
| How It Works | 4 steps about airflow | 4 steps about stillness, with jabs at "platforms that require you to plug the content in" |
| Everything else | (same) | (same) |

**Deliberately separate event names.** Using `onlypans-subscribed` (not `onlyfans-subscribed`) means a user who has both sites open at once won't get a fan unlocked on OnlyFans by subscribing to a pan on OnlyPans. The two sites are rival platforms; their state spaces stay separate.

## Code Architecture

Mirrors `src/sites/onlyfans/` exactly:

```
src/sites/onlypans/
├── config.ts                # SiteConfig — molten copper theme
├── index.ts                 # barrel: config, pages, dynamicRoutes
├── data/
│   ├── pans.ts              # Pan[] + getPanBySlug() — 8 pan creators
│   ├── leadership.ts        # 4 execs (Pennington/Holloway/Beckwith/Rowe)
│   └── testimonials.ts      # 8 pan-themed testimonials
├── components/              # site-local, copied+renamed from onlyfans/
│   ├── Toast.tsx            # fires `onlypans-toast` events
│   ├── SubscribeButton.tsx  # writes `onlypans-subscriptions`, dispatches `onlypans-subscribed`
│   ├── TipButton.tsx        # fires toast with pan name
│   ├── LockedThumbnail.tsx  # listens for `onlypans-subscribed`
│   └── PanCard.tsx          # renamed from FanCard
└── pages/
    ├── home.tsx             # adds "Why we're better" rant band
    ├── browse.tsx           # nav label "Meet the Pans", URL /browse
    ├── pan-detail.tsx       # dynamic route /browse/[slug]
    ├── how-it-works.tsx     # stillness framing, with airflow jabs
    ├── about.tsx            # "left the airflow industry" framing
    ├── testimonials.tsx     # pan-themed quotes
    ├── contact.tsx          # 4-up exec grid, real email in small print
    ├── privacy.tsx          # umbrella callout + satirical body
    └── terms.tsx            # umbrella callout + satirical body
```

**Registry wiring:**
- Add `onlypans` to `src/sites/registry.ts`
- Add `"onlypans"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Add `onlypans` to the `sites` array in `scripts/resize-favicons.mjs` so the favicon gets resized
- Add `onlypans` + its 8 pan slugs to `src/app/sitemap.ts`

**`features.commerce: false`** (same as OnlyFans).

## Theme

```ts
theme: {
  preset: "light",
  colors: {
    primary: "#C2410C",      // molten copper
    secondary: "#7C2D12",    // deep rust
    accent: "#FDE68A",       // warm amber (tip buttons)
    background: "#FFF6ED",   // cream
    text: "#1C0F05",         // near-black coffee
  },
  fonts: {
    heading: "inter",
    body: "inter",
  },
}
```

All fonts already exist in `src/themes/fonts.ts` — no new additions.

## The 8-Pan Roster (locked)

| # | Slug | Name | Type | Real visual reference | Monthly | Niche |
|---|---|---|---|---|---|---|
| 1 | `greta` | Greta | Cast Iron Skillet | Lodge | $4.99 | Generational classic |
| 2 | `cuivre` | Madame Cuivre | Hand-Hammered Copper Saucepan | generic French copper | $29.99 | French luxury |
| 3 | `chuck` | Cheap Chuck | Non-Stick Frying Pan | generic big-box non-stick | $0.99 | Cheerful underdog |
| 4 | `wok` | The Wok | Carbon Steel Wok | generic blackened wok | $11.99 | Philosophical mystery |
| 5 | `ursula` | Big Ursula | Enameled Dutch Oven | generic cherry-red enameled | $19.99 | Imposing heavyweight |
| 6 | `stargrazer` | Stargrazer | Laser-Smoothed Cast Iron | Stargazer (Bethlehem, PA) | $24.99 | Tech-bro disruptor |
| 7 | `smithee` | Smithee | Hand-Finished Cast Iron | Smithey (Charleston, SC) | $14.99 | Charleston artisan |
| 8 | `crepe` | Mademoiselle Crêpe | Carbon Steel Crêpe Pan | generic French crêpière | $6.99 | Specialist |

### Per-pan personality snapshots (to drive bio + tip menu copy)

1. **Greta** — Salt of the earth, three generations in the same family, remembers every egg she's ever cooked. "I will not speak of them." Audience: homesteaders, grandmothers, men with opinions about seasoning.
2. **Madame Cuivre** — Haughty, hand-hammered in Normandy, refuses to suffer American subscribers lightly. "I was not made to be photographed by a phone." Audience: Francophiles, wealthy retirees.
3. **Cheap Chuck** — Earnest, cheerful, privately aware his non-stick coating won't survive 18 months. "I am so HAPPY you're here!!" Thanks every subscriber by name. Audience: college students, newlyweds.
4. **The Wok** — Mysterious, has been seasoning itself for twenty years, speaks in single-sentence parables. "The pan does not move. The food moves. The cook moves. The pan remains." Audience: philosophers, wok hei believers.
5. **Big Ursula** — Imposing, eighteen pounds, not mean — just heavy. "I will outlive you. I am the last thing your grandchildren will own." Audience: serious home cooks, bread bakers.
6. **Stargrazer** — Insufferable, publishes a quarterly "heat distribution whitepaper," refers to itself as a "culinary precision instrument," has a TED Talk. Audience: test-kitchen enthusiasts, Serious Eats readers.
7. **Smithee** — Artisanal, polished cooking surface, hand-forged in a converted Charleston warehouse, refuses to be paired with any non-gas heat source. "Fire only. As intended." Audience: people who own more than two flannels.
8. **Mademoiselle Crêpe** — Delicate, precise, single-purpose. "I do one thing. I do it perfectly. I will not be repurposed." Audience: specialists proud of owning one very specific kitchen tool.

### "Content" framing — what the 6 posts per pan look like

Unlike OnlyFans (where posts captured the fan at different speeds and oscillation states), OnlyPans posts capture the pan in different *still* states. Examples for Greta:

1. `pan-greta-post-01.png` — "Morning light, freshly seasoned" — free
2. `pan-greta-post-02.png` — "Just after a scrub" — free
3. `pan-greta-post-03.png` — "On a cold stovetop" — locked
4. `pan-greta-post-04.png` — "Held up to the window" — locked
5. `pan-greta-post-05.png` — "Upside down, showing the bottom" — locked
6. `pan-greta-post-06.png` — "The handle, in detail" — locked

Every post is a single motionless photograph of the same pan from a slightly different angle or in slightly different lighting. Nothing happens. That is the entire bit.

## The "Why We're Better" Rant

Rendered as a dedicated home-page band immediately below the Featured Pans strip, titled:

> ## Why we're a better platform than those people with the fans.

Subtitle:

> An honest and comprehensive comparison. We respect your time.

Eight reasons in a 2-column grid, each with a copper checkmark icon. The text of all eight reasons (locked):

1. **Our creators do not require electricity.** No outlet, no batteries, nothing to trip over.
2. **Our creators last for generations.** Greta has been in her family since 1952. Their most senior creator was manufactured in 1978.
3. **You can cook with our creators.** Try that with a box fan.
4. **Zero moving parts.** Nothing to break, nothing to oil, nothing to warranty.
5. **Our creators were invented before 1882.** The pan predates the electric fan by thousands of years. We are the original platform.
6. **Our subscribers report being more centered.** A still object is meditative. A spinning object is noise.
7. **Your grandchildren will own our creators.** You cannot say the same about a wind tunnel.
8. **No shingles have ever been removed by a pan.** We cannot make the same claim about certain industrial airflow content.

**Naming rule:** The rant never directly names OnlyFans. It uses phrases like *"our competitors in the airflow space,"* *"that other platform,"* *"those people with the fans,"* and *"certain industrial airflow content."* A reader familiar with OnlyFans immediately connects the dots; a cold reader just sees eight reasons pans are cool.

### Smaller jabs elsewhere

- **About page hero copy:** *"OnlyPans was founded in 2021 by four men who left the airflow industry after realizing that their work, while technically functional, contributed nothing lasting to the American home."*
- **How It Works, Step 3 ("Look at your pan"):** *"Unlike platforms that require you to plug the content in, our creators are ready the moment you open the app. No warm-up. No oscillation schedule. No quarterly release cycle."*
- **Privacy page footer:** *"We do not track your airflow preferences. That is the business model of a different company."*

## Data Shapes

```ts
// src/sites/onlypans/data/pans.ts
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

export const pans: Pan[]
export function getPanBySlug(slug: string): Pan | undefined
```

```ts
// src/sites/onlypans/data/leadership.ts — same shape as onlyfans
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: "bill" | "brandon" | "jim" | "sean"
}
```

The `Pan` interface is deliberately identical in shape to `Fan` from OnlyFans, just renamed. This keeps the components nearly identical and makes the copy-rename implementation straightforward.

## The 4 Executives

Per the cross-site pattern: same four reference photos (`bill`/`brandon`/`jim`/`sean`), new random names, Bill always founder. Random names chosen without any thematic connection to cookware or airflow.

| Slug | Name | Title | Reference | Bio angle |
|---|---|---|---|---|
| `pennington` | Bill Pennington | Founder & Chief Executive | `bill` | Left the airflow industry in 2021. Speaks of his previous role only with visible regret. |
| `holloway` | Brandon Holloway | VP, Cookware Relations | `brandon` | Joined after Bill assured him the new venture was "completely unrelated to the old one." Still processing. |
| `beckwith` | Jim Beckwith | VP, Subscriber Stillness | `jim` | Responsible for ensuring subscribers understand that the pan is not supposed to do anything. |
| `rowe` | Sean Rowe | VP, Artisan Partnerships | `sean` | Negotiates contracts with our eight creators. Has a standing weekly appointment with a therapist. |

The meta-joke: anyone who visits both OnlyFans and OnlyPans will immediately notice the four portraits are the same four men. The sites themselves never acknowledge this. It's purely a delight for cross-portfolio browsers.

## Image Generation

Same MCP-driven pipeline as OnlyFans. Uses `mcp__image-gen__generate_image` for each pan's base reference (text-to-image), then stages the base into `base-images/{pan-slug}/base.png` at the project root, then calls `mcp__image-gen__generate_image_with_person` with `person="{pan-slug}"` for the 8 variations (cover, avatar, 6 posts).

### Real-brand visual referencing

The text-to-image base prompts for Greta, Stargrazer, and Smithee describe the distinguishing visual traits of the real reference brands without naming the brand in the generated artwork:

- **Greta (Lodge):** thick-walled American cast iron with a pebbled matte cooking surface, short stubby handle with a small hanging hole, rustic farmhouse countertop, warm morning window light.
- **Stargrazer (Stargazer):** modern cast iron with a mirror-polished laser-smoothed cooking surface, rimless design, slim elegant modern handle, clean white minimalist studio surface, cool soft light, product-photography style.
- **Smithee (Smithey):** hand-finished cast iron with a polished cooking surface showing subtle hand-forging marks, elegant heritage handle with a small ring at the end, reclaimed wood table, warm lowcountry afternoon light.

For the other five pans, generic descriptions are used (hand-hammered copper from Normandy, mass-market non-stick on a big-box retail aisle, blackened carbon-steel wok in dim atmospheric light, cherry-red enameled Dutch oven on a kitchen counter, French crêpière on a rustic French kitchen table).

### Image counts

**Per pan (8 pans × 9 images each = 72):**
- `{slug}-base.png` (1024×1024)
- `pan-{slug}-cover.png` (1536×1024)
- `pan-{slug}-avatar.png` (1024×1024)
- `pan-{slug}-post-01.png` through `-post-06.png` (1024×1024)

**Site images (~6):**
- `home-hero.png` (1536×1024) — curated pan lineup on cream backdrop, molten-copper grading
- `how-it-works.png` (1536×1024) — 3-step flat infographic, copper/cream palette
- `exec-pennington.png` / `exec-holloway.png` / `exec-beckwith.png` / `exec-rowe.png` — cringing portraits generated from the four base folders with `generate_image_with_person`

**Total: ~78 images**, essentially identical to OnlyFans' scope.

### Locked thumbnails are not separately generated

Same approach as OnlyFans. `<LockedThumbnail>` applies CSS blur + lock overlay at render time. The source image is the same `pan-{slug}-post-N.png` whether locked or unlocked.

## Cross-Cutting Concerns

- **Shared `Footer`** reused as-is — its existing `${APEX_URL}/disclaimer` link handles the satire disclosure.
- **Privacy/Terms** use the same umbrella-policy callout pattern as OnlyFans and Mousetrap Jenga.
- **Contact page** uses the 4-up exec grid (individual portraits, not a blended conference shot) with a small italic "contact note" per exec that keeps the hostile-competitor framing.
- **Real `bsambrone@gmail.com`** placed in small print on the Contact page.
- **`scripts/resize-favicons.mjs`** updated to include `onlypans` in its sites list.
- **`src/app/sitemap.ts`** updated to import `pans` from `@/sites/onlypans/data/pans` and emit `/browse/{slug}` URLs for all 8 pans.

## Constraints & Non-Goals

- **No real commerce.** `features.commerce: false`. No cart, checkout, or payment processor.
- **No new App Router routes.** All routing flows through the catch-all.
- **No new fonts.** Inter is already in `fontFamilyMap`.
- **No new shared components.** The 5 site-local components copy the OnlyFans components with rename-and-change-event.
- **PG tone only.** Innuendo lives in the format, never in the copy. Every line should read as literal cookware copy to a grandparent.
- **No direct mention of OnlyFans by name.** The rant and jabs always use indirect phrasing ("our competitors in the airflow space," etc.). This is both funnier and keeps the two sites formally separate.

## Open Questions for Implementation

- Final subscriber counts per pan (chosen for comedic effect, similar to OnlyFans' ranges)
- Exact testimonial portrait → testimonial quote mapping
- Exact icon treatment for the "Why we're better" checklist (copper checkmarks vs. another glyph)
- Final post captions for the 6 locked/unlocked shots per pan
