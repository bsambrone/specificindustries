# Inflatable Anchors Co. — Site Design Spec

## Overview

A new satirical commerce site for the Specific Industries platform at `inflatableanchors.specificindustries.com`. Sells inflatable anchors — anchors that are literally inflatable, not devices for anchoring inflatables. The site leans into the absurdity of a buoyant anchor with earnest infomercial energy.

**Voice:** Practical everyman / QVC infomercial. Enthusiastic, earnest, never winks at the audience. The copy genuinely believes in the product. Comedy comes from the gap between enthusiasm and utility. "Tired of heavy anchors? There's a better way!"

**Key clarification the site must make early:** The anchor itself is inflatable. This is not about anchoring your inflatable boat or pool toy.

## Site Identity

- **Name:** Inflatable Anchors Co.
- **Subdomain:** `inflatableanchors`
- **Tagline:** "The Easiest Anchor You'll Ever Pull Up"
- **Commerce:** Enabled (cart key: `inflatableanchors-cart`)

## Theme

- **Preset:** "nautical" (new preset name)
- **Heading font:** Poppins (`poppins` key in fontFamilyMap)
- **Body font:** Inter (`inter` key in fontFamilyMap)
- **Colors:**
  - Primary: `#F57C00` (safety orange)
  - Secondary: `#FFFDE7` (warm yellow-white)
  - Accent: `#0D47A1` (deep navy blue)
  - Background: `#FAFAFA` (clean white)
  - Text: `#1a1a1a` (near-black)

## Navigation

Home | Products | About | The Technology | Customer Stories | FAQ | Contact

Plus footer links: Privacy Policy, Terms of Service (same pattern as other sites).

## Pages

### Home Page

- **Hero:** Headline "The Easiest Anchor You'll Ever Pull Up", subtitle clarifying "Yes, the anchor is inflatable. No, this isn't about anchoring your inflatable." Image of happy sailors. CTAs: "Shop Now" + "See How It Works"
- **Stats strip:** "4 oz Average Weight" / "Under 2 Minutes to Inflate" / "100% Floats"
- **Featured product spotlight:** The Original
- **Product carousel:** Full lineup
- **"As Seen Floating Near" section:** Fake press logos (marina names, boat shows)
- **Testimonials grid:** Enthusiastic boaters, marina owners, one confused kayaker
- **CTA banner:** "Ready to upgrade your anchoring experience?"

### Products Page

- Category sections: Standard Anchors, Premium Line, Accessories
- Product cards in grid layout with add-to-cart buttons
- Each product links to its detail page via dynamic route

### Product Detail Pages (dynamic route `/products/[slug]`)

- Product image, name, price, tagline, description
- Specs panel (Weight, Material, Inflation Time, Buoyancy Rating, Holding Power: "Subjective") — uses `specs` array in product data
- Add to cart button
- Related products carousel

### About Page

- **Origin story:** Founded when Captain Chuck Denton got tired of hauling a 35-pound anchor onto his 12-foot dinghy. "There had to be a better way."
- **Timeline:** Company milestones — founding, first prototype, first customer complaint, "pivoting" to embrace buoyancy
- **Team member cards:** 4 members (see Team section below)
- **Split section:** Company values — "Lightweight Solutions," "Customer Amazement," "Buoyancy First"

### The Technology Page

Two main sections:

**Process Flow: "The Inflation Deployment System™"** (4 steps)

1. **Inflate** — "Using our patented EZ-Inflate™ hand pump (sold separately), bring your anchor to full operational pressure in just 47 easy pumps. Pro tip: count out loud for maximum confidence."
2. **Deploy** — "Lower your fully inflated anchor into the water using the included 50ft of marine-grade rope. Feel the satisfying weightlessness as it enters the water."
3. **Observe** — "Watch as your anchor establishes its position on the water's surface. Note: surface positioning is a feature, not a bug. Traditional anchors can't do this."
4. **Retrieve** — "Simply pull the rope. That's it. No winch, no back pain, no herniated discs. This is the moment that makes it all worth it."

Each step has a landscape image of happy sailors performing the action.

**Comparison Table: "Why Go Inflatable?"**

| Feature | Inflatable | Steel Fluke | Concrete Block | Mushroom |
|---------|-----------|-------------|----------------|----------|
| Weight | 4 oz | 15-45 lbs | 20-60 lbs | 10-30 lbs |
| Setup Time | Under 2 min | Immediate | Immediate | Immediate |
| Storage | Fits in pocket | Dedicated locker | Garage floor | Shed |
| Portability | Backpackable | Hernia risk | Need a friend | Awkward |
| Ease of Retrieval | One-handed | Winch recommended | Good luck | Moderate |
| Fun Factor | Extreme | None | None | Low |
| Conversation Starter | Guaranteed | Never | "Why?" | "What is that?" |
| Holds Boat in Place | *&ast; | Yes | Yes | Yes |

&ast; Footnote (rendered below table): "Results may vary based on current, wind, tide, expectations, and definition of 'holds.'" — The asterisk is the entire cell value; there is no "Yes" or "No."

Inflatable column gets highlighted styling.

### Customer Stories Page

Longer-form testimonial cards using a new shared `CustomerStory` component (photo, name, location, longer quote, star rating).

Stories include:
- Marina owner who stocks them "because they're easy to display"
- Weekend boater couple who love how light they are
- Person who uses theirs as a pool float
- Fishing enthusiast who likes that "fish aren't scared of it"

### FAQ Page

Multi-section accordion (reuses FaqAccordion component):
- **About Our Anchors** — "Is the anchor inflatable or for anchoring inflatables?" goes first
- **Inflation & Deployment** — How to inflate, how long it takes, what PSI
- **Durability & Maintenance** — Patch kit questions, UV resistance, puncture warranty
- **Orders & Shipping** — Shipping weights ("You'll barely notice it"), returns policy

### Contact Page

- Joke HQ address (e.g., "Pier Nowhere, Slip 0, Anchorage, AK")
- Email subtly included (bsambrone@gmail.com) — not prominently displayed, buried in the page naturally
- Phone: obviously fake
- Image of the "world headquarters" (empty dock slip with a hand-painted sign)

### Privacy Policy

- Opens with authoritative reference to specificindustries.com parent policy (the one serious line)
- Everything else is fully absurd infomercial/nautical humor
- Themed around shipping manifests, product warranties, boating metaphors
- Same real substance underneath: no data collection, localStorage cart only, Google Analytics + Vercel Analytics

### Terms of Service

- Opens with authoritative reference to specificindustries.com parent policy (the one serious line)
- Everything else is fully absurd
- Product warranty jokes, liability disclaimers about drifting boats
- Returns: "All sales are final. Much like deploying an inflatable anchor in a strong current."
- Dispute resolution by Captain Chuck, appeals to Big Mike who "will just agree with Chuck"

### Cart & Checkout

Standard commerce pages reusing existing shared components. Same pattern as pigmilk and dehydratedwater.

## Product Catalog

### Standard Anchors

| Slug | Name | Price | Tagline |
|------|------|-------|---------|
| `original` | The Original | $29.99 | "Just inflate, drop, and hope for the best." |
| `ez-drop` | The EZ-Drop | $39.99 | "Arrives pre-inflated. Ready to not hold your boat in place." |
| `weekender-mini` | The Weekender Mini | $19.99 | "Perfect for kayaks, canoes, and people who don't really need an anchor anyway." |
| `heavy-duty-pro` | The Heavy Duty Pro | $49.99 | "Double air chambers. Extra-thick vinyl. Still weighs 4 oz." |

### Premium Line

| Slug | Name | Price | Tagline |
|------|------|-------|---------|
| `captains-choice` | The Captain's Choice | $79.99 | "Leather-look vinyl with brass-colored valve. For the discerning captain." |
| `deep-sea-deluxe` | The Deep Sea Deluxe | $59.99 | "Comes with 200ft of rope. Because depth shouldn't limit your ambition." |
| `night-rider` | The Night Rider (Glow Edition) | $54.99 | "UV-reactive. Watch it float away even at night." |
| `stealth` | The Stealth (Camo Edition) | $54.99 | "Perfect for when you don't want anyone to find your anchor. Ever." |

### Accessories

| Slug | Name | Price | Tagline |
|------|------|-------|---------|
| `pump` | Deluxe Hand Pump | $14.99 | "47 easy pumps to anchor readiness." |
| `repair-kit` | Patch & Pray Repair Kit | $9.99 | "Vinyl patches, glue, and an instruction card that just says 'Good luck.'" |
| `ballast-pouch` | Ballast Weight Pouch | $12.99 | "Add sand for actual holding power. At that point, you may just want a regular anchor." |
| `bumper-sticker` | Bumper Sticker | $4.99 | "My Other Anchor Is Also Inflatable." |
| `rapid-deflator` | The Rapid Deflator | $7.99 | "A board. With a nail. For quick, permanent anchor retrieval." |
| `helium-reserve` | The Helium Reserve | $89.99 | "Experience anchoring in the third dimension." |

### Product Data Shape

Each product has:
- `slug`, `name`, `price`, `priceLabel`, `tagline`, `description` (string array), `image` (path), `category` ("standard" | "premium" | "accessories")
- `specs` array (replaces nutritionalFacts/scienceFacts from other sites) — each spec has `label` and `value`
- Example specs: Weight, Material, Inflation Time, Buoyancy Rating, Holding Power, and product-specific joke specs

## Team Members

| Name | Title | Image | Bio Angle |
|------|-------|-------|-----------|
| Captain Chuck Denton | Founder & Chief Inflation Officer | `team-chuck.png` | Former marina operator, started it all. Infomercial host energy. Always demonstrating. |
| Reef Henderson | Head of Buoyancy Research | `team-reef.png` | The "engineer." Takes inflatable anchor science very seriously. Has never successfully anchored a boat. |
| Skip Bayliner | Director of Customer Amazement | `team-skip.png` | Customer-facing guy. Relentlessly positive even when reading complaints. |
| Big Mike Portside | VP of Heavy-Duty Operations | `team-mike.png` | The muscle, despite the product weighing 4 oz. Frequently photographed carrying comically small boxes. |

## New Components

**New:**
- `CustomerStory` — new shared card component with photo, name, location, longer quote, and star rating. The existing `TestimonialGrid` is short-form (quote + author only), so the Customer Stories page needs this richer component.

**Existing components to reuse:**
- Hero, StatStrip, FeaturedProductSpotlight, ProductCarousel, TestimonialGrid, CTABanner, ProductCard, AddToCartButton, Timeline, TeamMember, SplitSection, ImageTextSection, ProcessFlow, ComparisonTable, FaqAccordion, WaveDivider, PromoBanner

## Registration

Add to `src/sites/registry.ts`:
- Import inflatableanchors site module
- Add `inflatableanchors` key to `siteRegistry`
- Add to `SubdomainKey` type

## File Structure

```
src/sites/inflatableanchors/
├── config.ts          # SiteConfig with nautical theme
├── index.ts           # Barrel: config, pages, dynamicRoutes
├── data/
│   └── products.ts    # 14 products with specs arrays
└── pages/
    ├── home.tsx
    ├── products.tsx
    ├── product-detail.tsx
    ├── about.tsx
    ├── technology.tsx
    ├── customer-stories.tsx
    ├── faq.tsx
    ├── contact.tsx
    ├── privacy.tsx
    ├── terms.tsx
    ├── cart.tsx
    └── checkout.tsx

public/sites/inflatableanchors/
├── favicon.png
├── hero.png
├── press-logos.png
├── lifestyle.png
├── about-origin.png
├── about-values.png
├── contact-hq.png
├── product-*.png      # 14 product images
├── team-*.png         # 4 team images
├── tech-*.png         # 4 technology process images
└── customer-*.png     # 4 customer story images
```

## Local Development

```
localhost:3000/?site=inflatableanchors        # Homepage
localhost:3000/products?site=inflatableanchors # Products
localhost:3000/about?site=inflatableanchors    # About
```
