# Pettential — Site Design

**Subdomain:** `pettential.specificindustries.com`
**Date:** 2026-04-12
**Status:** Design — pending implementation plan

## Concept

A satire site for **Pettential**, a premium pet performance brand that applies elite athletic and corporate training methodology to animals that fundamentally cannot be trained, motivated, or improved. The core joke is the complete mismatch between high-energy fitness/startup branding and subjects like goldfish, sloths, and snakes — delivered with total sincerity.

The site is structured around six "Performance Divisions," each treating a different animal category as an underserved market. The divisions function as sub-brands within the Pettential umbrella, each with their own product lines and identity. The hybrid model combines a full commerce shop (25 products across 6 divisions) with a services page offering career coaching and performance reviews for pets.

**Tagline:** "Elevating Every Animal to Its Full Potential™"

**Core belief:** "No animal is inappropriate for human products. Only underserved."

**Tone.** Dead-serious athletic performance brand. Speaks in Nike/Peloton motivational language about animals that cannot be motivated. Corporate metrics are cited with precision — all showing zero improvement. Testimonials from pet owners are enthusiastic despite no results. Testimonials from the animals themselves are confused, blank, or a cry for help. No winking at the camera. The humor comes from the total commitment to the bit.

**Recurring joke mechanics:**
1. Mismatch between animal and product (snake → office chair, fish → treadmill)
2. Corporate/athletic language applied with full sincerity ("career stagnation," "performance optimization," "cross-species skill transfer")
3. Metrics that mean nothing ("+0% productivity increase," "enhanced presence," "improved stakeholder alignment")
4. Animal testimonials that are confused, empty, or a single repeated word

## Architecture

Slots into the existing multi-subdomain pattern. No new App Router routes — everything goes through the catch-all.

```
src/sites/pettential/
├── config.ts                    # SiteConfig — athletic theme, features.commerce: true
├── index.ts                     # barrel: config, pages, dynamicRoutes
├── data/
│   ├── products.ts              # 25 SKUs across 6 divisions + getProductBySlug()
│   ├── leadership.ts            # 9 execs (3 C-suite + 6 division VPs)
│   ├── testimonials.ts          # 6 human testimonials + 12 animal testimonials
│   └── services.ts              # 3 pricing tiers + 5 standalone services
├── pages/
│   ├── home.tsx
│   ├── shop.tsx                 # Division-organized product catalog
│   ├── product-detail.tsx       # Dynamic /shop/[slug]
│   ├── services.tsx             # Pricing tiers + standalone service cards
│   ├── about.tsx                # Brand story, meaningless metrics, timeline, values
│   ├── leadership.tsx           # 9 executive cards with randomized names
│   ├── contact.tsx              # Consultation form with absurd dropdowns
│   ├── cart.tsx                 # Reuses shared commerce
│   ├── checkout.tsx             # Reuses shared commerce
│   ├── privacy.tsx              # Umbrella callout + satirical body
│   └── terms.tsx                # Umbrella callout + satirical body
└── (no site-local components — uses shared components)
```

**New shared module:**
```
src/data/animal-portraits.ts          # Shared animal portrait pool (parallel to testimonial-portraits.ts)
public/shared/animal-testimonials/    # Generated animal portrait images
```

**Registry wiring:**
- Add `pettential` to `src/sites/registry.ts`
- Add `"pettential"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
- Add `pettential` to the `sites` array in `scripts/resize-favicons.mjs`
- Add `pettential` to `productSites` in `src/app/sitemap.ts` (for the `/shop/{slug}` URLs)

**`features.commerce: true`.** Wires up `CartProvider` and reuses existing shared commerce components (`AddToCartButton`, cart context, toast container). The site needs `/cart` and `/checkout` page entries pointing to shared commerce pages.

## Theme

```ts
theme: {
  preset: "athletic",
  colors: {
    primary: "#CCFF00",      // electric lime
    secondary: "#1A1A1A",    // near black
    accent: "#FF3366",       // hot pink
    background: "#FAFAFA",   // off white
    text: "#111111",         // rich black
  },
  fonts: {
    heading: "space-grotesk",
    body: "inter",
  },
}
```

Both fonts already exist in `src/themes/fonts.ts` — no new font additions.

## Page Set & Navigation

| Nav Label | URL | Purpose |
|-----------|-----|---------|
| Home | `/` | Hero, flagship products, metrics bar, division overview, testimonials, CTA |
| Shop | `/shop` | Full 25-product catalog with division filter bar |
| _(dynamic)_ | `/shop/[slug]` | Product detail page |
| Services | `/services` | Pricing tiers + standalone service cards + FAQ |
| About | `/about` | Brand story, meaningless metrics, company timeline, values |
| Team | `/leadership` | 9 executive cards with randomized names |
| Contact | `/contact` | Consultation request form + FAQ |
| _(footer only)_ | `/privacy` | Privacy policy |
| _(footer only)_ | `/terms` | Terms of service |
| _(commerce)_ | `/cart` | Shopping cart |
| _(commerce)_ | `/checkout` | Checkout flow |

**Nav bar:** Home, Shop, Services, About, Team, Contact

## Pages

### Home

- **Hero Section:** Full-width dark background (#1A1A1A). Electric lime headline: "ELEVATING EVERY ANIMAL TO ITS FULL POTENTIAL™". Subheading about the mission. CTA button "Shop Performance Gear" in lime. Secondary CTA "Explore Services."
- **Flagship Product Carousel:** The 5 hero products (Goldfish Treadmill Pro, Snake Tie Collection, Parrot Resume Optimization Suite, Tortoise HIIT Program, LinkedIn Premium for Cats) with bold images, price, and one-liner tagline each. Links to product detail pages.
- **Metrics Bar:** Animated counters on dark background — "10,000+ Animals Served" / "+0% Average Improvement" / "6 Performance Divisions" / "0 Complaints (they can't write)"
- **Division Overview:** 6 cards in a grid, one per division. Each card shows the division's badge color, icon/emoji, name, and a one-line pitch. Links to the shop page filtered by that division.
- **Human Testimonials:** 3 rotating owner quotes from the shared portrait pool (enthusiastic despite no results).
- **CTA Banner:** "Your pet is underperforming. We can't fix that. But we can sell you things." Links to shop.

### Shop

- **Division Filter Bar:** Horizontal bar with 6 colored division badges plus "All" (selected by default). Clicking a division filters the product grid and shows a division mini-hero banner.
- **Division Mini-Hero:** When a specific division is filtered, a banner appears at top with division name, tagline, and color treatment. Hidden when "All" is selected.
- **Product Grid:** Cards showing product image, name, price, division badge, and one-line tagline. Click through to product detail page.

### Product Detail (Dynamic Route — `/shop/[slug]`)

- Product hero image, name, price, division badge, full description
- Fake spec sheet (varies by product — e.g., Goldfish Treadmill: "Speed Settings: 1 (slow) / Incline: None / Battery Life: Longer than the fish")
- Animal testimonial relevant to the product
- "You May Also Like" section with 2-3 products from the same division
- AddToCartButton

### Services

- **Pricing Table:** Three-tier coaching packages (Starter $99/mo / Pro $299/mo / Enterprise $999/mo) with escalating absurdity. Each tier lists features: performance reviews (pet will not read them), coaching sessions (pet will not attend), species coverage, dashboard access (shows no change), leadership retreat access, dedicated account manager, ROI guarantee.
- **Standalone Service Cards:** 5 cards below the pricing table:
  1. Animal Career Coaching™ — "Is your goldfish stuck in a rut?"
  2. Performance Reviews for Pets™ — Quarterly reviews mailed. They do not read them.
  3. Animal Leadership Retreats™ — 3-day offsite. No one knows why they're there.
  4. Cross-Species Skill Transfer Program™ — Neither will cooperate.
  5. Executive Presence Workshop™ — Power posture difficult for snakes.
- **FAQ Accordion:** "Will my pet actually improve?" (No.) / "Can I get a refund?" (Your pet can't fill out the form.) / "What species do you support?" (All of them. None of them respond.)

### About

- **Brand Story:** Origin narrative about the founder seeing untapped potential in a goldfish during a bad quarterly review. Mission statement delivered with complete sincerity.
- **Meaningless Metrics Section:** "+0% productivity increase" / "Enhanced presence (unverified)" / "Improved stakeholder alignment (stakeholders unaware)"
- **Company Timeline:**
  - 2019: Founded after staring at a goldfish
  - 2020: Launched Aquatic Performance Division. No fish noticed.
  - 2021: Expanded to 6 divisions. Results unchanged.
  - 2023: 10,000 animals served. 0 improvements documented.
  - 2024: Named "Most Committed to Nothing" by no publication.
- **Values Section:** "Data-Driven" (the data shows nothing) / "Species-Inclusive" (no animal turned away) / "Results-Adjacent" (near results, never touching)

### Leadership

9 executive cards with generated portrait images and randomized names (both first and last randomize on each page load per project convention).

**C-Suite:**

1. **CEO / "Chief Evolution Officer"** — Former management consultant who "saw the untapped potential in every species" after a goldfish stared at them during a particularly bad quarterly review. Believes no animal is inappropriate for human products, only underserved. Favorite metric: "engagement" (undefined).

2. **CTO / "Chief Training Officer"** — Built the proprietary performance tracking platform that has successfully detected no change across 10,000 animals. Previously led R&D at a fitness wearable company. Left after realizing humans were "too easy." Holds 3 patents on immeasurable outcomes.

3. **COO / "Chief Optimization Officer"** — Oversees all six divisions simultaneously. Has never seen an animal in person. Manages entirely through dashboards that show flat lines. Considers this "operational excellence."

**Division Heads:**

4. **VP of Aquatic Performance** — Marine biologist turned performance coach. Spent 4 years developing the Goldfish Treadmill. The goldfish did not notice. Published zero peer-reviewed papers. "The data speaks for itself." (It does not.)

5. **VP of Serpent Workplace Solutions** — Former HR director who "saw a gap in the limbless professional market." Designed the Handshake Simulation Device after a particularly awkward client meeting. Has never successfully shaken hands with a snake.

6. **VP of Avian Professional Development** — Career counselor specializing in non-verbal communicators. Created the Parrot Resume Optimization Suite after a parrot repeated their LinkedIn summary back to them verbatim. Considers this "a breakthrough."

7. **VP of Reptile Fitness & Mobility** — Personal trainer who was "tired of clients showing up." Found reptiles "refreshingly consistent" in their refusal to engage. The Tortoise HIIT Program is their magnum opus. Results remain pending.

8. **VP of Farm Animal Lifestyle** — Lifestyle influencer who pivoted to livestock. Believes every cow deserves a morning routine. Launched the Goat Personal Branding Course after watching a goat eat a business card. "They're hungry for it."

9. **VP of Corporate Pets Division** — Silicon Valley expat who brought startup culture to household pets. Created LinkedIn Premium for Cats after their own cat walked across their keyboard and accidentally endorsed 14 people for "strategic thinking."

### Contact

- **Consultation Request Form:** Fields: Name, Email, Pet Species (text input), Pet's Current Career Level (dropdown: "Unemployed" / "Entry-Level" / "Mid-Career Crisis" / "Executive" / "Retired But Restless"), Message (textarea).
- **FAQ Accordion** below the form with common questions.
- **Office Address:** "Suite 0, The Terrarium, Floor G (Ground Level Only), 1 Performance Boulevard, Nowhere, ZZ 00000"

### Privacy & Terms

Standard satirical legal pages consistent with other sites in the platform. Umbrella callout at top + satirical body copy.

### Cart & Checkout

Standard commerce pages using shared components.

## Product Catalog

25 products across 6 divisions. 5 flagship products serve as homepage heroes and also belong to their respective divisions.

### Division 1: Aquatic Performance Division

| # | Product | Slug | Price | Tagline | Flagship |
|---|---------|------|-------|---------|----------|
| 1 | Goldfish Treadmill Pro™ | `goldfish-treadmill-pro` | $249.99 | "Because stagnation is a choice." | Yes |
| 2 | Aquarium Standing Desk™ | `aquarium-standing-desk` | $199.99 | "Improves posture, reduces float fatigue." | |
| 3 | Fish Eye Contact Training Kit™ | `fish-eye-contact-training-kit` | $69.99 | "Finally hold a conversation." | |
| 4 | Underwater Whiteboard™ | `underwater-whiteboard` | $129.99 | "For brainstorming sessions that dissolve immediately." | |

### Division 2: Serpent Workplace Solutions

| # | Product | Slug | Price | Tagline | Flagship |
|---|---------|------|-------|---------|----------|
| 5 | Snake Tie Collection™ | `snake-tie-collection` | $89.99 | "Pre-knotted. They can't tie it." | Yes |
| 6 | Ergonomic Snake Chair™ | `ergonomic-snake-chair` | $349.99 | "Supports undefined spine zones." | |
| 7 | Motivational Posters for Snakes™ | `motivational-posters-for-snakes` | $34.99 | "'Hang in there.' (They can't.)" | |
| 8 | Handshake Simulation Device™ | `handshake-simulation-device` | $119.99 | "Teaches trust in limb-free environments." | |

### Division 3: Avian Professional Development

| # | Product | Slug | Price | Tagline | Flagship |
|---|---------|------|-------|---------|----------|
| 9 | Parrot Resume Optimization Suite™ | `parrot-resume-optimization-suite` | $179.99 | "ATS-optimized squawks." | Yes |
| 10 | Email Tone Translator™ | `email-tone-translator` | $99.99 | "Converts chirps into passive aggression." | |
| 11 | Bird Cubicle Divider Kit™ | `bird-cubicle-divider-kit` | $159.99 | "For open-air offices." | |
| 12 | Pigeon Urban Navigation GPS™ | `pigeon-urban-navigation-gps` | $79.99 | "'You're already there.'" | |

### Division 4: Reptile Fitness & Mobility

| # | Product | Slug | Price | Tagline | Flagship |
|---|---------|------|-------|---------|----------|
| 13 | Tortoise HIIT Program™ | `tortoise-hiit-program` | $149.99 | "12-week plan. 1% improvement guaranteed.*" | Yes |
| 14 | Sloth High-Intensity Interval Training™ | `sloth-hiit` | $129.99 | "One rep per week." | |
| 15 | Motivational Whistle™ | `motivational-whistle` | $24.99 | "Ignored completely." | |
| 16 | Performance Tracking Wearable™ | `performance-tracking-wearable` | $199.99 | "Detects no change over time." | |

### Division 5: Farm Animal Lifestyle Upgrades

| # | Product | Slug | Price | Tagline | Flagship |
|---|---------|------|-------|---------|----------|
| 17 | Cow Yoga Mat™ | `cow-yoga-mat` | $89.99 | "For mindful grazing." | |
| 18 | Chicken Noise-Canceling Headphones™ | `chicken-noise-canceling-headphones` | $149.99 | "Block existential clucking." | |
| 19 | Pig Spa Day Kit™ | `pig-spa-day-kit` | $109.99 | "Mud, but curated." | |
| 20 | Goat Personal Branding Course™ | `goat-personal-branding-course` | $199.99 | "Become the GOAT." | |

### Division 6: Corporate Pets Division

| # | Product | Slug | Price | Tagline | Flagship |
|---|---------|------|-------|---------|----------|
| 21 | LinkedIn Premium for Cats™ | `linkedin-premium-for-cats` | $59.99 | "Endorse: napping, pushing things off tables, ignoring stakeholders." | Yes |
| 22 | Dog Performance Review Toolkit™ | `dog-performance-review-toolkit` | $79.99 | "'Needs improvement: mailman relations.'" | |
| 23 | Executive Office for Hamsters™ | `executive-office-for-hamsters` | $249.99 | "Includes tiny burnout." | |
| 24 | Zoom Background Generator for Pets™ | `zoom-background-generator-for-pets` | $39.99 | "Beach, office, burnout loft." | |

### Product Detail Content

Each product gets a detail page with:
- Hero image, name, price, division badge
- Full description (2-3 paragraphs of deadpan copy)
- Fake spec sheet tailored to the product
- Animal testimonial from the shared animal portrait pool
- "You May Also Like" with 2-3 same-division products
- AddToCartButton

**Sample spec sheets:**

**Goldfish Treadmill Pro™:**
- Speed Settings: 1 (slow)
- Incline: None
- Battery Life: Longer than the fish
- Performance Dashboard: Yes (shows identical results daily)
- Warranty: 3 years or 1 fish lifetime, whichever is shorter

**Snake Tie Collection™:**
- Available Colors: Hostile Takeover Blue, Quarterly Loss Gray, Merger Burgundy
- Pre-Knotted: Yes (they can't tie it)
- Material: 100% polyester (machine washable, snake not included)
- Sizes: One size fits most snakes (does not fit any snakes)

**Tortoise HIIT Program™:**
- Duration: 12 weeks
- Improvement Guarantee: 1%*
- *Not noticeable
- Sessions Per Week: 3 (tortoise attendance: 0)
- Equipment Needed: None (tortoise will not use it anyway)

## Services

### Coaching Packages (Pricing Table)

| Feature | Starter ($99/mo) | Pro ($299/mo) | Enterprise ($999/mo) |
|---------|-------------------|---------------|----------------------|
| Tagline | "Begin the journey" | "Accelerate nothing" | "Scale the unscalable" |
| Quarterly Performance Reviews | 1 per quarter | 4 per quarter | Unlimited (pet will not read them) |
| Career Coaching Sessions | 2 per month | 8 per month | Unlimited (pet will not attend) |
| Species Coverage | Single species | Up to 3 species | Unlimited species |
| Performance Dashboard | Basic (shows no change) | Advanced (shows no change, with graphs) | Enterprise (shows no change, with executive summary) |
| Leadership Retreat Access | No | 1 per year | Unlimited (pet will not know why they're there) |
| Dedicated Account Manager | No | Shared | Dedicated (they also don't understand) |
| ROI Guarantee | "Results may occur" | "Results unlikely but possible" | "Results guaranteed*" (*Results defined as continued existence) |

### Standalone Services

1. **Animal Career Coaching™** — "Is your goldfish stuck in a rut? Is your snake failing to network?" One-on-one sessions with a certified animal career strategist. Intake form asks species, current career level, and biggest professional regret.

2. **Performance Reviews for Pets™** — Quarterly reviews mailed to your pet on branded Pettential letterhead. Covers punctuality, teamwork, and initiative. Categories: "Exceeds Expectations" (never used), "Meets Expectations" (never used), "Needs Improvement" (default). They do not read them.

3. **Animal Leadership Retreats™** — 3-day offsite at an undisclosed location. Agenda includes team building exercises, trust falls (not recommended for fish), a keynote from a motivational iguana, and a networking dinner (all attendees eat at different times). No one knows why they're there.

4. **Cross-Species Skill Transfer Program™** — Teach your dog the focus of a cat. Teach your cat the enthusiasm of a dog. Teach your fish the ambition of a hamster on a wheel. Proprietary methodology. Neither species will cooperate.

5. **Executive Presence Workshop™** — Help your pet command a room. Curriculum: power posture (difficult for snakes), eye contact (impossible for fish), firm handshakes (excluded: all participants), vocal projection (parrots only — everyone else excluded).

## Testimonials

### Human Testimonials (Homepage & Services Page)

Using the shared portrait pool from `src/data/testimonial-portraits.ts`.

| # | Portrait | Quote | Context |
|---|----------|-------|---------|
| 1 | Marcus Chen | "My goldfish has shown absolutely no improvement. The dashboard confirms this daily. Worth every penny." | Goldfish Treadmill Pro owner |
| 2 | Tamara Voss | "After 6 months of career coaching, my cat still sleeps 18 hours a day. But now she does it with executive presence." | LinkedIn Premium for Cats subscriber |
| 3 | Derek Pullman | "The leadership retreat changed nothing for my iguana. He came back exactly the same. Transformative experience." | Enterprise tier customer |
| 4 | Brenda Faulk | "My snake received a performance review. He ate it. They sent another one. He ate that too. 10/10 service." | Performance Reviews for Pets subscriber |
| 5 | Ryan Ashford | "The ROI on my tortoise's HIIT program is technically zero, but the graphs are beautiful." | Tortoise HIIT Program owner |
| 6 | Nina Cabrera | "My parrot's resume got three callbacks. He repeated the interviewer's questions back to them. They said he was 'a great listener.'" | Parrot Resume Optimization Suite owner |

### Animal Testimonials (Product Pages)

Using the new shared animal portrait pool at `src/data/animal-portraits.ts` with images in `public/shared/animal-testimonials/`.

**Animal Portrait Pool (12 animals, reusable across sites):**

| # | Name | Species | Portrait Description |
|---|------|---------|---------------------|
| 1 | Gerald | Goldfish | Goldfish in a tiny tank, blank expression |
| 2 | Linda | Tortoise | Tortoise looking vaguely upward |
| 3 | Kevin | Snake | Snake in a coiled position |
| 4 | Diane | Parrot | Colorful parrot, head tilted |
| 5 | Steve | Sloth | Sloth mid-hang, eyes half closed |
| 6 | Barbara | Cow | Cow chewing, staring directly at camera |
| 7 | Dennis | Hamster | Hamster on a wheel, looking exhausted |
| 8 | Patricia | Cat | Cat looking away, disinterested |
| 9 | Frank | Pigeon | Pigeon on a ledge, puffed up |
| 10 | Margaret | Chicken | Chicken with a slightly panicked expression |
| 11 | Doug | Dog | Golden retriever, overly eager |
| 12 | Cynthia | Goat | Goat mid-chew, judgmental stare |

**Sample animal testimonial quotes:**

| Animal | Quote | Product Context |
|--------|-------|-----------------|
| Gerald (Goldfish) | "This changed nothing." (different one?) | Goldfish Treadmill Pro |
| Linda (Tortoise) | "I have no idea what's happening." | Tortoise HIIT Program |
| Kevin (Snake) | "I ate it." | Performance review / Snake Tie |
| Diane (Parrot) | "Help." (repeated 47 times) | Resume Optimization Suite |
| Steve (Sloth) | "." (still composing response) | Sloth HIIT |
| Barbara (Cow) | "MOOOOO." (translated: "The yoga mat was adequate.") | Cow Yoga Mat |
| Dennis (Hamster) | "I have been running for 11 years." | Executive Office for Hamsters |
| Frank (Pigeon) | "I can see my house from here." | Pigeon Urban Navigation GPS |
| Patricia (Cat) | (did not respond to request for comment) | LinkedIn Premium for Cats |
| Margaret (Chicken) | "BAWK." (translated: "I can still hear everything.") | Noise-Canceling Headphones |
| Doug (Dog) | "I LOVE THIS I LOVE YOU I LOVE EVERYTHING" | Dog Performance Review Toolkit |
| Cynthia (Goat) | "I am already the GOAT." | Goat Personal Branding Course |

Each product detail page features 2 testimonials — one from the relevant animal and one human owner quote. The 6 human testimonials are distributed across the 25 products (each human quote is reused across multiple products). The animal testimonials are matched to their species-relevant product.

## Division Identity

Each division has a distinct color accent for badges and filtered shop views.

| Division | Badge Color | Emoji | Tagline |
|----------|-------------|-------|---------|
| Aquatic Performance | #CCFF00 (lime) | 🐟 | "Peak performance, zero oxygen required." |
| Serpent Workplace Solutions | #FF3366 (hot pink) | 🐍 | "Professional development for the limbless professional." |
| Avian Professional Development | #00CCFF (cyan) | 🐦 | "Fly higher. Professionally." |
| Reptile Fitness & Mobility | #FFB800 (amber) | 🐢 | "Slow progress is still... no, it's just slow." |
| Farm Animal Lifestyle Upgrades | #88DD44 (green) | 🐄 | "Because every animal deserves a morning routine." |
| Corporate Pets Division | #AA77FF (purple) | 🐈 | "Bringing startup culture to your living room." |

## Images Required

All images stored in `public/sites/pettential/`.

### Site Assets
- `favicon.png` — Pettential logo/icon (lime on black, athletic mark)
- `hero.jpg` — Homepage hero background (dark, athletic, abstract)
- `og-image.jpg` — Social sharing image

### Executive Portraits (9)
- `exec-ceo.png`
- `exec-cto.png`
- `exec-coo.png`
- `exec-vp-aquatic.png`
- `exec-vp-serpent.png`
- `exec-vp-avian.png`
- `exec-vp-reptile.png`
- `exec-vp-farm.png`
- `exec-vp-corporate.png`

### Product Hero Images (25)
One per product, named by slug:
- `products/goldfish-treadmill-pro.png`
- `products/aquarium-standing-desk.png`
- `products/fish-eye-contact-training-kit.png`
- `products/underwater-whiteboard.png`
- `products/snake-tie-collection.png`
- `products/ergonomic-snake-chair.png`
- `products/motivational-posters-for-snakes.png`
- `products/handshake-simulation-device.png`
- `products/parrot-resume-optimization-suite.png`
- `products/email-tone-translator.png`
- `products/bird-cubicle-divider-kit.png`
- `products/pigeon-urban-navigation-gps.png`
- `products/tortoise-hiit-program.png`
- `products/sloth-hiit.png`
- `products/motivational-whistle.png`
- `products/performance-tracking-wearable.png`
- `products/cow-yoga-mat.png`
- `products/chicken-noise-canceling-headphones.png`
- `products/pig-spa-day-kit.png`
- `products/goat-personal-branding-course.png`
- `products/linkedin-premium-for-cats.png`
- `products/dog-performance-review-toolkit.png`
- `products/executive-office-for-hamsters.png`
- `products/zoom-background-generator-for-pets.png`

### Shared Animal Portraits (12)
Stored in `public/shared/animal-testimonials/`, reusable across sites:
- `gerald-goldfish.png`
- `linda-tortoise.png`
- `kevin-snake.png`
- `diane-parrot.png`
- `steve-sloth.png`
- `barbara-cow.png`
- `dennis-hamster.png`
- `patricia-cat.png`
- `frank-pigeon.png`
- `margaret-chicken.png`
- `doug-dog.png`
- `cynthia-goat.png`

## Implementation Notes

- All fonts (`space-grotesk`, `inter`) already exist in `src/themes/fonts.ts` — no additions needed.
- The animal portrait pool (`src/data/animal-portraits.ts`) is a new shared module parallel to the existing `src/data/testimonial-portraits.ts`. It exports `getAnimalPortrait(slug)` and an `AnimalPortrait` interface with `name`, `species`, `image`, and `slug` fields.
- Product slugs serve as dynamic route segments under `/shop/[slug]`.
- Division filtering on the shop page is client-side — no server routes needed. The division field on each product drives the filter.
- Leadership names randomize both first AND last name on each page load (project convention).
- The services pricing table and standalone cards are on a single `/services` page, not separate routes.
- Privacy and terms pages follow the existing umbrella-callout pattern from other sites.
- Contact form is decorative (no backend), consistent with other sites.
