# thetheoryisreal — Design Spec

**Date:** 2026-04-19
**Subdomain:** `thetheoryisreal`
**Type:** New site — conspiracy-theory satire

## Premise

A satirical conspiracy-theory site that mimics the tone, structure, and visual language of genuine paranoid publications. The site parodies modern conspiracy topics (chemtrails, reptilian elites, Illuminati, simulation/NPC theories, weaponized tech) through articles, a populated forum, a merch shop, an evidence gallery, and a fake research library. The comedy works by taking the structure seriously and letting the absurdity of the content land on its own.

**Design principle:** conspiracy-first, not aesthetic-first. Visual tropes support the content; they do not become the main event. Avoid X-Files cosplay — aim for "faded paranoid bulletin-board" rather than "basement lit with CRT glow."

## Architecture

Standard multi-subdomain site under `src/sites/thetheoryisreal/`:

- `config.ts` — `SiteConfig` with theme, metadata, nav, `features.commerce: true`
- `index.ts` — barrel exporting `config`, `pages`, `dynamicRoutes`
- `pages/` — page components
- `components/` — site-specific components (see Components section)
- `data/` — content data modules

Register in `src/sites/registry.ts` and add `"thetheoryisreal"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`.

Commerce enabled — reuses existing `CartProvider`, `CartButton`, `AddToCartButton`, `Toast`, cart, and checkout components from `src/components/commerce/`.

### Routes

| Path | Type | Purpose |
|---|---|---|
| `/` | page | Homepage — breaking rail, categories, forum hot rail, merch + evidence teasers, library teaser |
| `/theories` | page | Full theory index, filterable by category |
| `/theories/<slug>` | dynamic (1 segment) | Theory article detail |
| `/category/<slug>` | dynamic (1 segment) | Category landing page |
| `/forum` | page | Forum index — 5 boards + "Hot Threads" rail |
| `/forum/<board>` | dynamic (1 segment) | Board listing threads |
| `/forum/<board>/<thread>` | dynamic (2 segments) | Thread detail: OP + replies |
| `/evidence` | page | Gallery of ~24 mundane photos tagged as conspiracies |
| `/library` | page | "Do Your Own Research" — ~25 fake-study entries |
| `/shop` | page | Product grid |
| `/products/<slug>` | dynamic (1 segment) | Product detail (existing pattern) |
| `/cart`, `/checkout` | page | Commerce (existing shared pages) |
| `/about` | page | Redacted-dossier leadership + origin story |
| `/contact`, `/privacy`, `/terms` | page | Required conventions |

Dynamic routes are registered in the site's `index.ts` barrel. `forum` uses `maxSegments: 2` so both `/forum/<board>` and `/forum/<board>/<thread>` resolve to the same dynamic route, which branches on segment count.

### Navigation

Mega menu:

- **Theories** — dropdown to 5 categories
- **Forum** — dropdown to 5 boards + Hot Threads
- **Shop** — direct link
- **Evidence** — direct link
- **Library** — direct link
- **About** — direct link (right side)
- Cart button (right side)

Footer: link groups for Theories / Forum / Shop / More, plus privacy/terms/contact. Bottom footer strip holds the GeoCities wink (see Visual Motifs).

## Data Models

All data lives in `src/sites/thetheoryisreal/data/` as plain TypeScript exports. No database, no server state.

```
data/
├── theories.ts       # theories array + getTheoryBySlug + categories
├── forum.ts          # boards, threads, getThreadBySlug, getBoardBySlug
├── products.ts       # products array + getProductBySlug
├── evidence.ts       # evidence items
├── library.ts        # fake study entries
└── leadership.ts     # dossier entries + codename pool for randomization
```

### Theory article

```ts
type CategoryKey = "atmospheric" | "global-control" | "reptilian" | "digital-reality" | "weaponized-tech"

type Theory = {
  slug: string
  title: string
  category: CategoryKey
  publishedAt: string          // ISO date — used for "latest" sort, fake dates fine
  dek: string                  // one-line hook under headline
  body: string[]               // paragraphs, rendered as <p>. No Markdown parsing.
  pullQuotes?: string[]        // sidebar callouts ("THEY'RE LYING")
  image: string                // hero image path under /sites/thetheoryisreal/theories/
  relatedSlugs?: string[]
  breakingBadge?: boolean      // eligible for homepage BREAKING rail
}
```

Helpers: `getTheoryBySlug(slug)`, `getTheoriesByCategory(key)`, `getLatestTheories(n)`, `getBreakingTheories(n)`.

### Forum

```ts
type ForumReply = {
  username: string             // "QuantumReptile_42"
  avatar: string               // /shared/testimonials/<name>.png
  postedAt: string             // "3 hours ago" — fake relative string, displayed verbatim
  body: string
  reactions?: { emoji: string; count: number }[]
}

type BoardKey = "atmospheric-anomalies" | "reptilian-sightings" | "npc-watch" | "signal-interference" | "general"

type ForumThread = {
  slug: string
  board: BoardKey
  title: string
  op: ForumReply
  replies: ForumReply[]
  hot?: boolean                // surfaces in homepage + forum hot rail
  pinned?: boolean
}

type ForumBoard = {
  key: BoardKey
  title: string
  tagline: string
  icon?: string
}
```

Each shared testimonial image used in the forum maps to exactly one satirical username, stored in a small `USERNAME_BY_AVATAR` map in `forum.ts`. The same user appears in multiple threads, in the evidence gallery submitter field, and optionally in product reviews — consistency across surfaces makes the world feel populated.

Helpers: `getThreadBySlug(board, thread)`, `getThreadsByBoard(board)`, `getHotThreads(n)`.

### Product

Reuses the existing `Product` shape from `src/components/commerce/` / the pigmilk data pattern. Each product carries a `conspiracyTag` field (`"chemtrails" | "illuminati" | "reptilian" | "npc" | "weaponized-tech" | "classics"`) to tie into the content world, used for filtering on the shop page.

Prices are intentionally absurd (e.g. $149.99 for "filtered" tap water). 16+ products at launch.

### Evidence item

```ts
type EvidenceItem = {
  id: string
  image: string
  caption: string              // "FOOTAGE: suspected surveillance drone, Portland bus stop"
  submittedBy: string          // matches a forum username (world consistency)
  tags: string[]
}
```

### Library entry

```ts
type LibraryEntry = {
  title: string                // "On The Observable Behavior of Pigeons Near WiFi"
  author: string               // "Dr. R. Kestrel, PhD (unaffiliated)"
  year: string
  url: string                  // harmless Wikipedia or internal dead-end anchor
  abstractSnippet: string
}
```

All external URLs point to innocuous Wikipedia pages (e.g. `en.wikipedia.org/wiki/Pigeon`, `en.wikipedia.org/wiki/Copper(II)_sulfate`). Some entries use internal `#` anchors that scroll nowhere — part of the bit.

### Leadership dossier

```ts
type LeaderDossier = {
  id: string
  blurredPhoto: string         // from /shared/testimonials/ with black-bar overlay applied via component
  codenamePrefix: string       // seed — actual codename randomizes per visit
  biography: string            // vague + absurd, 1 paragraph
  expertise: string            // one line
  statusTag: "ACTIVE" | "DEEP COVER" | "COMPROMISED" | "UNREACHABLE"
}

const CODENAME_ADJECTIVES = ["The Watcher", "The Listener", "Prophet", "Operator", "Analyst", ...]
const CODENAME_SURNAMES   = ["V", "Zero", "Kestrel", "Tessera", "Null", "Umbra", ...]
```

Per-visit randomization must change BOTH the adjective AND the surname (per existing convention; see `feedback_exec_name_randomization.md`). Implemented as client-side randomization after hydration (or via a daily rotating seed to keep SSR/CSR consistent — choose at implementation time; plan can decide).

## Components

New components under `src/sites/thetheoryisreal/components/`:

- `RedAlertBanner` — sticky strip at top of page with rotating "BREAKING" headlines. Rotates every 6-8 seconds via `useEffect` + `setInterval`. Pure client component.
- `DocumentCard` — gold-bordered, paper-textured card. Used as the base for theory article cards, library entries, dossier cards.
- `RedactedPortrait` — image wrapped with absolute-positioned black bars across the eye region. Variant prop for severity (`light | heavy`).
- `ForumThreadView` — OP header block + vertical list of reply blocks. Each reply: avatar, username, posted-at, body, reaction row. Used on thread detail page.
- `ForumBoardCard` — tile summarizing a board (title, tagline, thread count, latest-thread snippet).
- `ForumThreadRow` — single-line thread listing used on board + hot-rail.
- `EvidenceTile` — image with one or two circle/arrow annotations drawn as absolutely-positioned SVG overlays, caption below, submitter on hover or below.
- `EvidenceGallery` — masonry-ish grid of `EvidenceTile`s with lightbox-style focus view (no library — simple state-driven modal).
- `BreakingRail` — horizontal corkboard-style rail with pushpin decorations and red-thread connectors between items. Used on homepage.
- `CategoryTile` — image + title + tagline tile, links to `/category/<slug>`.
- `PullQuote` — large serif quote block with handwritten marginalia accent font.
- `LibraryList` — rendered list of `LibraryEntry`s styled like an academic citations page.
- `LeadershipDossierCard` — composes `RedactedPortrait` + `DocumentCard` + randomized codename.
- `GeoCitiesFooterWink` — single "VISITOR 0000034 · YOU ARE BEING WATCHED · TRUTH WEBRING" strip.

Shared components reused: `Hero`, `AddToCartButton`, `ProductCard`, `Footer`, `Header`, `CartButton`, `Toast`, `FaqAccordion` (if we want a "Frequently Denied Questions" section), cart/checkout pages.

## Visual Theme

### Color tokens

| Token | Hex | Usage |
|---|---|---|
| `background` | `#0f1012` | Page background — near-black with slight blue |
| `text` | `#d8d4c7` | Body text — warm off-white, slight yellow (old paper) |
| `primary` | `#c8a86b` | Headings, document card borders — aged gold |
| `secondary` | `#6b8e75` | Links, subtle accents — desaturated olive (NOT neon green) |
| `accent` | `#c13a2e` | BREAKING banners, CLASSIFIED stamps, alert badges only |

Reserve `accent` for genuine alert/alarm cases. Over-use dilutes the satire.

### Typography

Declared in `src/themes/fonts.ts`. Add `next/font/google` imports if not already present.

- Heading: `IBM Plex Mono` (documentary/typewriter feel, more legible than Courier)
- Body: `Lora` (serif — old-book credibility) for theory article body, leadership bios
- UI/chrome/forum: `IBM Plex Mono`
- Marginalia accent (pull-quotes only): one quirky display font — `Permanent Marker` or `Caveat Brush`

### Visual motifs (use sparingly — 1-2 per page, not piled on)

- Red-alert banner at top of homepage and theory pages
- Redaction black bars — leadership dossier, occasional evidence tile
- Thin aged-gold borders on document-style cards with subtle paper-texture background
- Pushpin + red-thread decorations on the homepage breaking rail (corkboard metaphor)
- Annotation overlays on evidence-gallery images (SVG circles, arrows)
- Handwritten marginalia font only for pull-quotes

Avoid:

- CRT scanline overlays
- Neon/lime green text
- Heavy glitch effects
- `<marquee>` scrolling content (the alert banner rotates via JS, not marquee)
- Stamping "CLASSIFIED" on every page
- Excessive caps-lock body copy

## Content Inventory

### Theory articles — 20 total, 4 per category

**Atmospheric / Chemtrails:** influencer sprays, bird-denial, cloud marketing, weather-as-service
**Global Control / Illuminati:** avocado toast index, IKEA geometry, lunchtime synchronization, the furniture cartel
**Reptilian Dossier:** sentient smoothies, Roomba lineage, celebrity glitches, dental records
**Digital Reality:** NPC census, algorithm sentience, autoplay compulsion, buffering prophecy
**Weaponized Tech:** 6G sarcasm allergy, smart-toaster dream analysis, fitness-tracker malice, printer firmware

Each article: headline + dek + 6-10 paragraphs + 1-2 pull-quotes + 1 hero image + 3 related-slug links.

### Forum — 5 boards × 5 threads, 5-8 replies each

Boards:

1. **Atmospheric Anomalies**
2. **Reptilian Sightings**
3. **NPC Watch**
4. **Signal Interference**
5. **General Truth-Seeking**

~150 authored replies total. 6-9 shared testimonial images assigned persistent satirical usernames; reused across threads, evidence gallery submitter field, and optionally product reviews.

A subset of threads are `hot: true` (surfaces in homepage Hot Threads rail and forum index) and a handful are `pinned: true`.

### Products — 16+ satirical SKUs

Tinfoil beanie, foil torso wrap, "filtered" tap water (6-pack), crystal-infused laptop skin, anti-NPC sunglasses, EMF-blocking pillowcase, smart-toaster firewall, 6G-blocking lip balm, reptilian detector flashlight, pigeon-deterrent spray, "Clean Dream" dream-shield blanket, tinfoil socks, orgone pyramid USB charger, avocado-toast decoy, reality anchor keychain, surveillance-pigeon whistle. Room for more.

### Evidence gallery — 24 items

Mundane photos with conspiratorial captions, each submitted by one of the forum regulars.

### Library — 25 fake-study entries

Deadpan academic titles, fake authors, harmless Wikipedia or dead-anchor links.

### Leadership — 4 dossiers

Redacted portraits (reused from `/shared/testimonials/`), randomized codenames per visit, vague absurd bios, status tags.

### Static pages

- Homepage with all teaser rails + GeoCities footer wink
- About — origin story + 4 leadership dossiers
- Contact — minimal (PO box, encrypted-mail joke address)
- Privacy — standard boilerplate, in-voice
- Terms — standard boilerplate, in-voice

## Homepage Layout

Top-to-bottom:

1. `RedAlertBanner` — rotating breaking headlines
2. Hero — site name, tagline ("The truth is not hidden. You are."), hero image
3. `BreakingRail` — 5 latest articles with `breakingBadge: true`, corkboard style
4. 5 category tiles in a responsive grid
5. Forum Hot Threads rail — 3-4 threads with avatar + title + reply count
6. Evidence gallery teaser — 4 tiles with "See All Evidence →"
7. Merch teaser — 3 products with "Shop Now →"
8. Library teaser — 3 fake-study entries with "Research Archive →"
9. `GeoCitiesFooterWink`
10. Standard `Footer`

## Image Generation Plan

~60 new images total:

- 20 theory hero images
- 5 category tile images + 1 homepage hero = 6
- 24 evidence gallery photos
- 16+ product images
- 4 redacted leadership portraits (sourced from `/shared/testimonials/`, black bars applied at render time — no generation needed beyond reuse)

All generated images live under `public/sites/thetheoryisreal/`. Directory structure:

```
public/sites/thetheoryisreal/
├── hero.png
├── theories/          # 20 article heroes
├── categories/        # 5 tiles
├── evidence/          # 24 items
└── products/          # 16+ product shots
```

Generation uses existing image-gen MCP tooling. Prompting direction: grainy, desaturated, slight film grain, mundane subjects, slightly off-angle framing to support the "surveillance footage" feel. Products should look earnestly catalog-like (not stylized) — the contrast between earnest product shot and absurd product name is the joke.

## Implementation Phases

Each phase is a natural commit point.

1. **Scaffold** — site folder, `config.ts` (theme + nav + mega menu), `index.ts` barrel with empty `pages` map + placeholder, register in `siteRegistry` + `VALID_SUBDOMAINS`. Verify `localhost:3000/?site=thetheoryisreal` resolves. Commit.

2. **Data modules** — all 6 data files with real authored content: theories (20), forum (25 threads × ~6 replies), products (16+), evidence (24), library (25), leadership (4). Content-first so pages have real data to render. Commit.

3. **Site-specific components** — `RedAlertBanner`, `DocumentCard`, `RedactedPortrait`, `ForumThreadView`, `ForumBoardCard`, `ForumThreadRow`, `EvidenceTile`, `EvidenceGallery`, `BreakingRail`, `CategoryTile`, `PullQuote`, `LibraryList`, `LeadershipDossierCard`, `GeoCitiesFooterWink`. Commit.

4. **Pages** — home, theories index, theory detail (dynamic), category (dynamic), forum index, board (dynamic), thread (dynamic 2-segment), evidence, shop, product detail, library, about, contact, privacy, terms. Commit.

5. **Image generation** — ~60 images. Commit in chunks (e.g. all theory heroes together, all products together). Multiple commits.

6. **Polish** — red-thread/pushpin decorations, GeoCities footer, alert-banner rotation, forum reaction emojis, responsive check at sm/md/lg breakpoints, `npm run lint`, `npx tsc --noEmit`. Commit.

## Success Criteria

- `thetheoryisreal` resolves at `localhost:3000/?site=thetheoryisreal` and renders homepage
- All primary routes render without 404/500
- Invalid dynamic-route slugs return 404 (not fallback-home)
- Mega menu shows all 5 top-level items with dropdowns
- Commerce flow works: add-to-cart → cart → checkout → confirmation (reusing shared flow)
- Forum thread detail renders OP + replies with consistent avatar/username mapping
- Evidence gallery lightbox opens and closes cleanly
- Leadership codenames randomize both adjective AND surname per visit
- `npm run lint` clean, `npx tsc --noEmit` clean
- Site feels "paranoid bulletin-board" not "X-Files cosplay" on a subjective review

## Open Questions / Implementation-Time Decisions

- **Codename randomization strategy:** client-side post-hydration vs daily-rotating server seed. Either works; plan should pick.
- **Forum reactions:** decorative only (no state) vs clickable (localStorage-persisted). Default to decorative — cheaper, still looks alive.
- **Product reviews on product detail:** optional extension where forum regulars appear as reviewers. Nice-to-have, not required.
- **Related theories logic:** curated `relatedSlugs` per article, vs automatic by-category. Curated gives better editorial control; spec assumes curated.

## Out of Scope (v1)

- Real user accounts / auth
- Real forum posting
- Real evidence uploads
- RSS / email subscription
- Analytics beyond whatever the platform already has
- Internationalization

## Non-Negotiable Conventions

- `VALID_SUBDOMAINS` list updated (else middleware redirects to apex)
- Privacy, terms, contact pages present
- Leadership team present (as redacted dossiers)
- Exec codenames randomize both name components, not just one
