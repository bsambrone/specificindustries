# OnlyFans (the literal fans one) — Site Design

**Subdomain:** `onlyfans.specificindustries.com`
**Date:** 2026-04-10
**Status:** Design — pending implementation plan

## Concept

A satire site that takes OnlyFans 100% literally: subscribers pay to watch *literal fans* (the appliance) blow air. Each "creator" is a different kind of fan with its own personality, niche, and audience. The OnlyFans format being applied to HVAC equipment is the joke; the copy itself is PG.

**Tone.** PG. The innuendo lives entirely in the OnlyFans framing — words like "subscribe," "blowing," "tip menu," "exclusive content" are funny because they apply to box fans and ceiling fans, not because the copy ever winks at the reader. A grandparent could read every page out loud.

**Visual treatment.** Near-clone of OnlyFans (cyan + white, Inter font, rounded UI). Reads as "oh this is OnlyFans" within one second so the satire lands immediately.

## Architecture

Slots into the existing multi-subdomain pattern. No new App Router routes — everything goes through the catch-all.

```
src/sites/onlyfans/
├── config.ts                # SiteConfig — cyan theme, Inter font, nav, features.commerce: false
├── index.ts                 # barrel: config, pages, dynamicRoutes
├── data/
│   ├── fans.ts              # Fan[] + getFanBySlug() — 8 fan creators
│   ├── leadership.ts        # 4 ashamed execs (referencePerson: bill/brandon/jim/sean)
│   └── testimonials.ts      # withPortrait() entries reusing shared portraits
├── components/              # site-specific
│   ├── FanCard.tsx          # browse-page card
│   ├── SubscribeButton.tsx  # client component, writes localStorage
│   ├── TipButton.tsx        # client component, fires toast
│   ├── LockedThumbnail.tsx  # client component, conditionally blurs/unlocks
│   └── Toast.tsx            # site-local toast (no shared CartProvider toast)
└── pages/
    ├── home.tsx
    ├── browse.tsx
    ├── fan-detail.tsx       # rendered via dynamicRoutes for /browse/[slug]
    ├── how-it-works.tsx
    ├── about.tsx
    ├── testimonials.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx
```

**Registry wiring:**
- Add `onlyfans` to `src/sites/registry.ts`
- Add `"onlyfans"` to the `VALID_SUBDOMAINS` array in `src/sites/subdomains.ts`

**`features.commerce` is `false`.** This site does not extend `CartProvider`. The Subscribe and Tip interactions are fully self-contained (see Subscribe & Tip Flow section below).

## Page Set & Navigation

| Nav Label | URL | Purpose |
|---|---|---|
| Home | `/` | Hero, featured fans strip, "how it works" preview, testimonial strip |
| Meet the Fans | `/browse` | Full grid of all 8 creators, filterable by niche tag |
| How It Works | `/how-it-works` | Onboarding-style explainer of the (entirely fake) subscription model |
| About | `/about` | The four ashamed founders, bios, company history |
| Testimonials | `/testimonials` | Subscriber quotes using shared portrait library |
| Contact | `/contact` | Satirical contact page; real `bsambrone@gmail.com` in small print |

**Footer-only links:** Privacy, Terms, Disclaimer (the shared `Footer` component already links Disclaimer to `${APEX_URL}/disclaimer`).

**Dynamic route:** `/browse/[slug]` registered in `dynamicRoutes` in `index.ts`, validated against `getFanBySlug()`. Invalid slugs return 404.

## Theme

```ts
theme: {
  preset: "light",
  colors: {
    primary: "#00AFF0",      // OnlyFans cyan
    secondary: "#0095CD",    // deeper cyan (hover, headings on white)
    accent: "#FF7A59",       // coral — tip buttons, callouts
    background: "#FFFFFF",
    text: "#0F172A",         // near-black slate
  },
  fonts: {
    heading: "inter",
    body: "inter",
  },
}
```

Both fonts already exist in `src/themes/fonts.ts` — no new font additions.

## The Roster — 8 Fan Creators

The roster spans 8 distinct audience niches with no overlap. Each fan has a unique personality, price point, and content angle.

| # | Name | Type | Niche | Price | Personality |
|---|---|---|---|---|---|
| 1 | **Brenda** | Box Fan | Working-class nostalgia | $3.99/mo | Salt-of-the-earth, grateful, "I just blow air" |
| 2 | **Big Vance** | Industrial Wind Tunnel | Extreme thrill-seekers | $14.99/mo | All caps, declared a public nuisance in two counties |
| 3 | **Mistress Oscillata** | Tower Fan | Luxury minimalists | $24.99/mo | Aloof, expensive, quarterly viewings only |
| 4 | **Sir Reginald Plumebottom III** | Ceiling Fan | Wholesome family | $5.99/mo | Old money, dignified, "moving the same air since 1973" |
| 5 | **AeroVolt 9000™** | Bladeless Tower | Tech-bro premium | $19.99/mo | Insufferable, has a TED Talk, third-person |
| 6 | **Lil' Buzz** | USB Desk Fan | Cubicle underdog | $0.99/mo | Earnest, plucky, brought to tears by his first $5 tip |
| 7 | **The Ghost in the Attic** | Whole-House Attic Fan | "Felt, never seen" | $8.99/mo | Mysterious, philosophical, refuses to be photographed |
| 8 | **WhirrCore_42** | PC Case Fan | Gamer/streamer | $6.99/mo | RGB-cycling, "gg ez," calls subscribers "the fanbase" |

Each fan has 6 posts in their content grid: the first 2 are unlocked free previews; the remaining 4 are locked until the user subscribes.

Specific bios, post captions, and tip-menu items will be authored during implementation. The `Fan` data shape (below) is the contract.

## Data Shapes

```ts
// data/fans.ts
export interface FanPost {
  image: string         // /sites/onlyfans/fan-brenda-post-01.png
  caption: string       // "midwestern morning low setting"
  locked: boolean       // first 2 false, rest true
}

export interface TipMenuItem {
  amount: number        // 5, 20, 50
  description: string   // "Personalized angle adjustment video"
}

export interface Fan {
  slug: string                    // "brenda"
  name: string                    // "Brenda"
  handle: string                  // "@brendablows"
  fanType: string                 // "Box Fan, est. 1957"
  location: string                // "Tulsa, OK"
  monthlyPrice: number            // 3.99
  subscriberCount: number         // 12847
  niche: string                   // "Working-class nostalgia"
  audienceTag: string             // for browse filter chips
  bio: string                     // 2-3 sentences first-person
  coverImage: string              // /sites/onlyfans/fan-brenda-cover.png (1536x1024)
  avatarImage: string             // /sites/onlyfans/fan-brenda-avatar.png (square)
  posts: FanPost[]                // 6 entries, first 2 locked: false
  tipMenu: TipMenuItem[]          // 3-4 entries
  warningLabel?: string           // "⚠️ extreme" for Vance
}

export const fans: Fan[]
export function getFanBySlug(slug: string): Fan | undefined
```

```ts
// data/leadership.ts — same shape as mousetrapjenga
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string                   // /sites/onlyfans/exec-{slug}.png
  referencePerson: "bill" | "brandon" | "jim" | "sean"
}
```

## Page-by-Page Detail

### Home (`/`)

- **Header bar.** Cyan (`#00AFF0`) full-width bar with white "OnlyFans™ — air movement subscriptions" wordmark on the left and nav links on the right. Sticky on scroll.
- **Hero section.** Big white space with a cyan headline ("Subscribe to your favorite fan."), a subhead clarifying "literal fans, blowing literal air," and a CTA button → `/browse`. Optional hero image of an attractive box fan in a window.
- **Featured fans strip.** 4 of the 8 fans shown as `<FanCard>` components — Brenda, Mistress Oscillata, Lil' Buzz, WhirrCore_42 (covers different niches at a glance). Each card links to the fan's profile.
- **How it works preview.** 3-step graphic: "1. Browse the fans → 2. Subscribe → 3. Watch them blow air." Links to `/how-it-works` for the full version.
- **Testimonial strip.** 3 testimonials from `homepageTestimonials.slice(0, 3)`, formatted as quote cards with portraits.
- **CTA footer block.** Cyan band: "Find your fan today." → `/browse`.

### Meet the Fans / Browse (`/browse`)

- **Page title:** "Meet the Fans"
- **Subtitle:** Brief explainer line.
- **Filter chips** at top (optional, but cheap to add): All / Wholesome / Extreme / Luxury / Tech / Underdog / Mysterious / Gamer. Client-side filter on `audienceTag`.
- **Grid:** 4-column responsive grid of `<FanCard>` components, one per fan from `data/fans.ts`. Each card has cover image, avatar, name, handle, niche tag, monthly price, "Subscribe" button (functional — see Subscribe & Tip Flow). Clicking the card body navigates to `/browse/[slug]`.

### Fan Profile (`/browse/[slug]`) — the centerpiece page

Rendered via the dynamic route. Layout (matches the Brenda mockup):

1. **Cover banner** — `coverImage` rendered full-width, fixed height (~200px desktop, 120px mobile). Cyan-to-deeper-cyan gradient overlay if the image needs lift.
2. **Profile header** — overlapping circular avatar (`avatarImage`), name + verified-blue-dot, `@handle · location · fanType`, subscriber count. Right-aligned `<SubscribeButton>` (or "✓ Subscribed" if already subscribed).
3. **Bio block** — 2-3 sentence first-person bio.
4. **Locked content grid** — section heading "Posts (6)", 3-column grid of post thumbnails on desktop (2 columns on mobile). Each renders through `<LockedThumbnail post={...} fanSlug={slug} />` which checks subscription state and renders either the unlocked image or the blurred-with-lock state.
5. **Tip menu panel** — bordered card titled "★ Tip Menu" in coral. Lists each `tipMenu` item with description on the left and a coral `<TipButton>` on the right.
6. **Warning label** — `warningLabel` rendered as a top-of-page banner on fans where present (Big Vance).

### How It Works (`/how-it-works`)

Onboarding-style explainer page. 3-4 sections, each with icon + headline + paragraph:

1. **Browse the fans.** "Every fan on our platform has been carefully selected for its airflow personality."
2. **Subscribe to your favorite.** "Pick a fan, click subscribe, and you're in. Each fan posts new content as it occurs to them."
3. **Watch them blow air.** "Premium subscribers get full access to all posted content — every angle, every speed setting."
4. **Tip generously.** "Your favorite fan didn't earn that personality on its own. Tip the jar to support exclusive custom airflow."

Closes with a CTA to `/browse`.

### About (`/about`)

- **Hero / origin story.** "OnlyFans was founded in 2019 by four men who really should have known better." 1-2 paragraphs of company history written in earnest, slightly mournful tone.
- **The team.** Four exec cards (one per `executives` entry from `data/leadership.ts`). Each shows the cringing portrait, name, title, bio, and a confessional quote. Bill is listed first as Founder & CEO; the other three's titles distance them from the platform ("VP of Wishing He'd Stayed in Insurance," etc.).
- **Closing block.** Brief statement that the company stands behind its product, with visible reluctance.

### Testimonials (`/testimonials`)

- **Page title:** "What Our Subscribers Say"
- 8-10 testimonials from `data/testimonials.ts`, each `withPortrait()` from the shared portrait library. Quotes are PG and fan-themed: *"I never thought I'd find a community like this. Brenda has changed how I think about box fans entirely."*
- Format: alternating left/right portrait + quote rows, or a 2-column grid — match the existing mousetrapjenga / snortables testimonials page treatment.

### Contact (`/contact`)

Satirical contact treatment in the spirit of the cross-site pattern. Examples of bits to consider during implementation:

- A fake "Contact a Fan's Agent" form (non-functional) with fields like "Which fan?" and "Reason for contact (please be respectful)."
- Office hours listed as "we are usually here, mostly on accident."
- A photo of the four execs looking ashamed at a conference table.

**Required:** real `bsambrone@gmail.com` placed somewhere on the page in small print, discoverable but not headline-prominent (e.g., footer of the page, "for legal matters only" caption).

### Privacy (`/privacy`) and Terms (`/terms`)

Both pages follow the Mousetrap Jenga pattern exactly:

1. **Top callout block** (matches `mousetrapjenga/pages/privacy.tsx:22-26`):

   > The authoritative privacy policy for all Specific Industries properties — including OnlyFans — is maintained at **specificindustries.com/privacy**. The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.

2. **Satirical content body.** Privacy: lists the "data we collect" as things like favorite fans, preferred oscillation patterns, average tip generosity, "ambient room temperature at time of viewing." Terms: clauses about not sharing your fan's content, agreeing not to bring industrial wind tunnels into shared apartments, etc.

3. **Closing reminder block** linking back to `specificindustries.com/privacy` (or `/terms`).

The umbrella links use `https://specificindustries.com/privacy` and `/terms` respectively.

## Subscribe & Tip Flow

### `<SubscribeButton fanSlug price>`

Client component (`"use client"`).

**State:** reads `localStorage["onlyfans-subscriptions"]` on mount — a JSON array of `{ slug, subscribedAt }` records.

**Render:**
- If `slug` is in the array → button shows `✓ SUBSCRIBED`, rendered with disabled visual style; click handler is a no-op (subscriptions are not unsubscribable in the UI — the bit is one-way).
- Otherwise → cyan pill button: `SUBSCRIBE — $${price}/mo`.

**On click:**
1. Append `{ slug, subscribedAt: Date.now() }` to the localStorage array.
2. Dispatch a `CustomEvent("onlyfans-subscribed", { detail: { slug } })` on `window` so `<LockedThumbnail>` instances on the same page rerender immediately.
3. Fire a toast: *"You're now subscribed to {Name}. Welcome to the fan family."*
4. Re-render itself in the `✓ SUBSCRIBED` state.

### `<TipButton fanSlug amount description>`

Client component (`"use client"`).

**On click:** Fire a toast: *"Thanks for the ${amount} tip! {Name} has been notified."* No persistence, no state change. The button does not become "tipped" — users can tip repeatedly. No "this is satire" disclaimer in the toast.

### `<LockedThumbnail post fanSlug>`

Client component (`"use client"`).

**State:** reads `localStorage["onlyfans-subscriptions"]` on mount and listens for the `onlyfans-subscribed` window event. Maintains an `isSubscribed` boolean for `fanSlug`.

**Render:**
- If `post.locked === false` OR `isSubscribed === true` → renders `post.image` normally, no overlay.
- If `post.locked === true` AND `isSubscribed === false` → renders `post.image` with `filter: blur(16px)`, a dark `rgba(0,0,0,0.4)` overlay, and a centered 🔒 icon with "Subscribe to view" text.

**Effect:** When the user clicks Subscribe on the same page, the locked grid visibly unlocks in real time as part of the same interaction. This is the core payoff of the bit.

### `<Toast>`

Site-local toast component (do not reuse the cart system's toast). Renders a single toast at the bottom-center of the viewport for ~3 seconds, then fades. Triggered by an internal `useToast()` hook or via a `window` event — implementation detail for the plan.

## Image Generation

New script: `scripts/generate-onlyfans-images.ts`, modeled after `generate-mousetrapjenga-images.ts`. Reads `OPENAI_API_KEY` from `.env`, outputs to `public/sites/onlyfans/`, skips files that already exist.

### Per-fan strategy

For each of the 8 fans:

1. **Generate one base reference image** of the fan (e.g., `fan-brenda-base.png`). This is the canonical Brenda — a clean, well-lit shot of a 1957 box fan in a Tulsa kitchen window.
2. **Use that base image as the reference** for all subsequent images for this fan, via OpenAI's image-edit endpoint (the same pattern `generateImageWithPerson` uses for the four exec base photos). Each subsequent image is a *variation* of the same base — Brenda, but different angle / lighting / speed setting.
3. Generate from base:
   - `fan-{slug}-cover.png` — wide cover banner (1536×1024)
   - `fan-{slug}-avatar.png` — square portrait crop (1024×1024)
   - `fan-{slug}-post-01.png` through `fan-{slug}-post-06.png` — 6 post images, each a different angle / mood / speed setting

That's 9 images per fan × 8 fans = **72 fan images.**

### Site images

- `home-hero.png` — hero shot of an aesthetic box fan in a window
- `how-it-works-illustration.png` — 3-step infographic-style illustration
- `contact-image.png` — four execs at a conference table, ashamed
- `exec-{slug}.png` × 4 — cringing portraits generated from `mcp/image-gen/base-images/{bill,brandon,jim,sean}/` reference photos using `generateImageWithPerson`. The four name slugs are picked at implementation time (see Open Questions); each maps 1:1 to one of the four reference people, with `bill` always assigned to the founder/CEO slot.

That's **~7 site images.**

**Total: ~79 images.** This is the largest image-gen run in the portfolio so far (Mousetrap Jenga has ~25). The cost is a known trade-off — accepted because the locked-content-grid bit requires a meaningful number of post images per fan to feel like a real creator profile.

### Locked thumbnails are not separately generated

The blur and lock-icon treatment is applied at render time in `<LockedThumbnail>` via CSS (`filter: blur(16px)` + dark overlay). The source image is the same `fan-{slug}-post-N.png` whether locked or unlocked — that way, when the user subscribes, the same image renders unblurred. No separate "locked" image variants are generated.

## Footer

Reuse the shared `Footer` component as-is. Its existing link to `${APEX_URL}/disclaimer` is the only disclaimer surface — no custom inline disclaimer text on OnlyFans pages.

## Constraints & Non-Goals

- **No real commerce.** No cart, no checkout, no payment processor, no `features.commerce` flag, no `CartProvider`. Subscribe and Tip are purely client-side fakes.
- **No new App Router routes.** All routing flows through the catch-all.
- **No new fonts.** Inter is already in `fontFamilyMap`.
- **No new shared components** unless an existing one needs minor extension. `<FanCard>`, `<SubscribeButton>`, `<TipButton>`, `<LockedThumbnail>`, and `<Toast>` all live under `src/sites/onlyfans/components/`.
- **PG tone only.** Innuendo lives in the OnlyFans format, never in the copy. No content that would be uncomfortable to read aloud at a family dinner.
- **No "this is satire" text in the interactive flows.** The satire disclaimer lives only in the shared footer's link to the apex disclaimer, in the privacy/terms umbrella callouts, and in the small-print contact note.

## Open Questions for Implementation

These are intentionally left for the planning step rather than nailed down here:

- Final exact subscriber counts per fan (chosen for comedic effect — Brenda 12k, Mistress Oscillata 487, Lil' Buzz 4M, etc.)
- Exact testimonial portrait → testimonial quote mapping
- Exact filter chip behavior on the browse page (server-rendered initial state, client-side filtering)
- Whether the "How It Works" page needs any visual element beyond text + icons
- Exact icon set for the lock state (emoji vs. inline SVG vs. heroicon)
- Final name slugs and titles for the four execs (with `bill` as Founder & CEO; the other three's titles should subtly distance them from the platform)
