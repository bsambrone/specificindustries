# Meh. — Site Design

**Subdomain:** `meh`
**Brand name:** `Meh.` (the trailing period is part of the mark)
**Tagline:** *"Gadgets for people who've adjusted their expectations."*
**Category:** Satire e-commerce site in the `specificindustries` portfolio
**Date:** 2026-04-17

## Concept

Meh. sells Emotionally Disappointing Gadgets™ — consumer electronics engineered to deliver a specific, mild disappointment as their actual product. The brand's marketing makes quiet, earnest promises and then underdelivers on purpose. The site treats these failures with dignity.

**Voice:** dry, literary, deadpan. Every product description reads like a short essay of resignation. Copy is never wacky — the comedy is in commitment to tone.

**Angle summary (from brainstorming):** "C with a touch of A" — primarily designed-to-underwhelm products, with some items that pretend to offer emotional support and then gently withhold it.

## Foundation

### Theme tokens (`theme` in `config.ts`)

- `primary: "#2a2a2a"` — near-black headings / body ink
- `secondary: "#4a4a4a"` — muted body copy and metadata
- `background: "#d6d6d6"` — gray page surface
- `accent: "#9a9a9a"` — rules, dividers, subtle strokes (a slightly darker gray; no chromatic color)
- `foreground: "#2a2a2a"` — text on background (matches primary)
- `fonts.heading` and `fonts.body`: both **Inter** (already declared in `src/themes/fonts.ts`). Heading vs body distinction is weight/size only, not family.

### Visual rules

- No color accents, gradients, drop shadows, or illustrations
- Hairline rules (`border-foreground/20`) for all dividers
- Flat rectangle buttons, 1px stroke, hover inverts fill/stroke
- Generous whitespace, left-aligned copy
- Product photography is flat, grayscale, single-object on gray studio surface

## Site structure

### Top navigation (via `megaMenu` in `config.ts`, reusing existing `MegaMenu` component with `style: "dropdown"`)

```
Meh.                                Products  Readings▾  About  [Cart]
```

Readings dropdown children: **Manifesto**, **Press**, **Journal**, **FAQ**.

### Footer (three columns, hairline rules between)

- **Company** — About, Contact
- **Readings** — Manifesto, Press, Journal, FAQ
- **Legal** — Privacy, Terms

### Pages map

| Route | Page | Notes |
|---|---|---|
| `/` | HomePage | Hero, philosophy snippet, featured products (one per category), press strip, recent journal |
| `/products` | ProductsPage | 16 products grouped into 4 category sections; no filter UI |
| `/products/[slug]` | ProductDetail | Dynamic route; 16 valid slugs |
| `/manifesto` | ManifestoPage | Long-form essay |
| `/press` | PressPage | Wall of fake pull-quotes |
| `/journal` | JournalPage | Index of 5 field notes |
| `/journal/[slug]` | JournalEntry | Dynamic route; 5 valid slugs |
| `/faq` | FaqPage | Reuses shared `FaqAccordion` |
| `/about` | AboutPage | Brand story + 4-exec leadership grid |
| `/contact` | ContactPage | Satirical; real email in small print |
| `/privacy` | PrivacyPage | Umbrella callout + satire body |
| `/terms` | TermsPage | Umbrella callout + satire body |
| `/cart` | CartPage | Shared commerce component |
| `/checkout` | CheckoutPage | Shared commerce component |

### Dynamic routes in barrel export

```typescript
export const dynamicRoutes = {
  "products": {
    component: ProductDetail,
    getMetadata: (slug) => ({ title: `${product.name} — Meh.`, description: product.tagline }),
    isValidSlug: (slug) => !!getProductBySlug(slug),
  },
  "journal": {
    component: JournalEntry,
    getMetadata: (slug) => ({ title: `${entry.title} — Meh. Journal`, description: entry.excerpt }),
    isValidSlug: (slug) => !!getJournalEntryBySlug(slug),
  },
}
```

## Product catalog

Sixteen products, four per category. Price range $39–$249, every price ending in 9 (retail convention, played straight).

Data lives at `src/sites/meh/data/products.ts` and exports a `products` array plus `getProductBySlug(slug)`. Product shape follows the existing portfolio pattern: `{ slug, name, tagline, shortDescription, longDescription, category, price, image }`. The `category` field stores one of the four literal strings below.

### Mild Letdowns *(engineered to underwhelm gently)*

| Slug | Name | Price | Tagline |
|---|---|---|---|
| `beige-mood-ring` | The Beige Mood Ring | $39 | "Turns beige regardless of mood." |
| `late-bell` | Late Bell | $79 | "Rings 0.8 seconds after the visitor leaves." |
| `are-you-sure-clock` | The Are-You-Sure Clock | $119 | "Asks once, softly, then does not ring." |
| `whistler-zero` | Whistler 0 | $89 | "Whistles at a frequency only your dog doesn't hear." |

### Gentle Betrayals *(promises emotional support, withholds it)*

| Slug | Name | Price | Tagline |
|---|---|---|---|
| `monotone-speaker` | Monotone™ Smart Speaker | $149 | "Says 'I'm proud of you' in a flat tone." |
| `affection-plush` | Affection-Simulating Plush | $69 | "A teddy bear that sighs when hugged." |
| `motivational-frame` | Motivational Frame | $59 | "Displays a blank quote every Tuesday." |
| `tamagoldi` | Tamagoldi | $49 | "A digital pet that forgets your name each quarter." |

### Slow Sighs *(ambient, passive disappointment)*

| Slug | Name | Price | Tagline |
|---|---|---|---|
| `oh-humidifier` | The 'Oh.' Humidifier | $179 | "Whispers 'oh.' at twelve-minute intervals." |
| `dimmer-lamp` | Dimmer Lamp | $139 | "Imperceptibly dims over the course of a novel." |
| `absence-mister` | Absence Mister | $99 | "Mists plants only when you leave the room." |
| `memory-purifier` | Memory Purifier | $229 | "Emits the faint scent of a previous apartment." |

### Flat Affirmations *(tries to affirm; fails affectively)*

| Slug | Name | Price | Tagline |
|---|---|---|---|
| `about-right-scale` | The About-Right Scale | $119 | "Displays 'Yeah, That's About Right.'" |
| `minimum-motion-tracker` | Minimum Motion Tracker | $169 | "Reports: 'You moved. A bit.'" |
| `familiar-mirror` | Familiar Mirror | $249 | "Says 'You look like yourself.'" |
| `congratulations-printer` | "Congratulations, I Guess" Printer | $89 | "Thermal printer of resigned greetings." |

### Product detail page layout

Top: large neutral product photo (left), info block (right) with name, category label, tagline, price, add-to-cart.
Below: long description, 3–4 paragraphs in the literary voice.
Single "Field Review" testimonial block — one sighing first-person quote, attributed to a fictional customer.
Bottom: "Other devices in this category" strip showing the three siblings.

## Unique pages

### Homepage (`/`)

1. Hero — wordmark, tagline, single neutral hero image, CTA "Browse the catalog →"
2. Philosophy snippet — two short paragraphs excerpted from the manifesto, link to full essay
3. Featured products — 4 products, one from each category, labeled by category
4. Press strip — 3 pull-quotes in a row with a single border above and below
5. Recent journal — latest 2 entries (title + one-line excerpt + link)

### Manifesto (`/manifesto`)

One long-form essay, roughly 600–800 words, five Roman-numeral sections:
- *I. On lowered expectations*
- *II. On the dignity of the merely adequate*
- *III. The case against enthusiasm*
- *IV. Why our products sigh*
- *V. A quiet promise*

Narrow centered column, sans-serif, generous line-height, no images.

### Press (`/press`)

Approximately 12 fake pull-quotes from real publications (publications are real for credibility; quotes are invented). Three-column grid on desktop, single column on mobile. Each cell: large quote in heavier weight, attribution in smaller muted copy.

Publications drawn from: Wirecutter, The New Yorker, Wired, Esquire, Dwell, Architectural Digest, Monocle, Fast Company, Kinfolk, The Economist, Bon Appétit, The Atlantic.

Representative quote style:
> "Technically fine." — *Wirecutter*
> "The design is so restrained it begins to feel like surrender." — *Dwell*
> "I have purchased three." — *The New Yorker*

### Journal (`/journal`)

Index lists 5 entries with title + date + one-line excerpt. Entries:

| Slug | Title |
|---|---|
| `on-the-humidifier-that-sighs` | On The 'Oh.' Humidifier |
| `beige-all-the-way-down` | Field Notes: Seventeen Beige Mood Rings |
| `late-bell-postmortem` | We Waited By The Door |
| `the-quiet-tuesday` | Why The Frames Go Blank On Tuesdays |
| `notes-from-the-warehouse` | Notes From The Warehouse |

Each entry is a 150–300 word short field note in first person, signed by a fictional staff writer. Bylines rotate across three staff writers defined in `journal.ts`: "Hollis Marchetti," "Eleanor Drew," and "Paxton Vail." Data lives at `src/sites/meh/data/journal.ts`.

### FAQ (`/faq`)

Reuses `FaqAccordion`. ~10 Q&As, deadpan:
- "Does it work?" — "Define work."
- "What's your return policy?" — "We understand."
- "Is this satire?" — "No."
- "Can I speak to someone?" — "Yes. They will be polite."
- "What is Meh.'s mission?" — "To deliver less than promised, reliably."
- "Do the products ship in packaging?" — "Regrettably."
- "Why is everything gray?" — "You'll get used to it."
- "Will you ever release a product in color?" — "We have considered it."
- "What happens after I buy?" — "Time will pass."
- "Do you test your products?" — "Yes. They behave as expected."

## Standard pages

### About (`/about`)

Brand story: 3–4 paragraphs in the dry voice covering the origin of Meh., the design principles, and a brief note on the team's commitment to underdelivery. Followed by the leadership grid.

**Leadership team** — four male executives. Names fully randomized (both first and last) per the portfolio convention. Reference photo ties to the portrait generation source only:

| Displayed name | Title | Reference photo |
|---|---|---|
| Desmond Ashcroft | Founder & Chief Disappointment Officer | `bill` |
| Roland Peveril | President of Lowered Expectations | `brandon` |
| Warren Ellsworth | VP of Affective Underdelivery | `jim` |
| Julian Marlowe | Head of Ambient Sighs | `sean` |

Portrait style for all four: grayscale corporate headshot, soft diffuse lighting, neutral gray background, plain charcoal suit, neutral/resigned expression (no smile, no scowl). Matches the gray-on-gray site palette.

Each exec card carries a one-sentence dry bio.

### Contact (`/contact`)

Satirical page themed around the brand's reluctance to be reached. Sections:
- "Preferred Contact Method: carrier pigeon (slow)"
- A directory of absurd internal departments with fake extensions (e.g., "Dept. of Muted Concerns, ext. 0002")
- Final footer line, `text-xs` muted copy: *"For actual correspondence, bsambrone@gmail.com"*

### Privacy (`/privacy`) and Terms (`/terms`)

Both pages follow the portfolio-wide two-layer pattern: umbrella callout first, satire body after.

**Umbrella callout** (a framed block at the top): short statement that the Specific Industries policy at `specificindustries.com/privacy` (or `/terms`) is authoritative and governs all data handling.

**Satire body** — numbered H2 sections in Meh.'s voice.

Privacy sections:
1. What We Collect (Your Resignation)
2. Cookies (Stale)
3. Your Rights (Unchanged)
4. Data Retention (Until We Forget)
5. Third-Party Services (Similarly Disappointing)

Terms sections:
1. Your Expectations (Manageable)
2. Our Commitments (Modest)
3. Shipping (Eventually)
4. Returns (We Understand)
5. Warranty (None)
6. Governing Law (Resignation)

## Imagery plan

All imagery generated via the image-gen MCP into `public/sites/meh/`.

- `hero.png` — a single product (the "Oh." Humidifier) centered on a gray surface, flat diffuse lighting, no props
- Sixteen product images — one per product, consistent flat studio lighting, single-object compositions on gray surface, desaturated palette
- Four executive portraits — headshot style described in the About section above, keyed to the four reference people (`bill`, `brandon`, `jim`, `sean`)
- Two optional journal hero images — low priority, site ships without them if time is short
- `favicon.png` — lowercase `meh.` wordmark in near-black on gray, 64×64 (retina 2× of the 32px display size)
- `ogImage` — the hero image

Product images should feel like stock product photography run through a mood of quiet disappointment. No dramatic angles, no hero lighting, no environmental context.

## Build checklist

Every item is required before the site is considered complete.

1. Create site directory at `src/sites/meh/` containing:
   - `config.ts` (SiteConfig with theme, metadata, megaMenu, features.commerce: true, ogImage)
   - `pages/*.tsx` — one component per route in the pages map
   - `data/products.ts` — 16 products + `getProductBySlug`
   - `data/journal.ts` — 5 entries + `getJournalEntryBySlug`
   - `index.ts` — barrel exporting `config`, `pages`, `dynamicRoutes`
2. Register the site in `src/sites/registry.ts`
3. Add `"meh"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts` (edge-runtime allowlist — otherwise middleware redirects to apex)
4. Set `ogImage: "/sites/meh/hero.png"` in `config.ts` metadata
5. Generate favicon at `public/sites/meh/favicon.png` (64×64) and add `"meh"` to the `sites` array in `scripts/resize-favicons.mjs`
6. Add both dynamic route groups to `src/app/sitemap.ts`:
   - `/products/[slug]` — all 16 product slugs
   - `/journal/[slug]` — all 5 journal slugs
7. Generate all imagery (hero, 16 product photos, 4 exec portraits) via image-gen MCP

## Non-goals

- No real payment processing (existing portfolio-wide cart is localStorage-only, shared with other commerce sites)
- No server-side state or database
- No blog/journal CMS — entries are static data
- No filter UI on the catalog page — categories are section headings, not interactive filters
- No product variants, sizes, or inventory tracking
- No email capture, newsletter, or account system
