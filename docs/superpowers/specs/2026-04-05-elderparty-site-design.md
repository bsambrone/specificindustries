# The Elder Party — Site Design Spec

**Subdomain:** `elderparty`
**Date:** 2026-04-05
**Approach:** Dignified Heritage Party — stately political branding wrapped around Lovecraftian cosmic horror

---

## Identity & Voice

- **Party name:** The Elder Party
- **Tagline:** "A Return to Older Values"
- **Candidate/Founder:** Cthulhu R'lyeh (uses Bill's base image)
- **Voice:** Deadpan campaign-staffer copy. Never winks at the camera. Reads like polished political branding written by someone who does not understand what they are serving. The horror is in what's said, not in the delivery.
- **Patriotic overlay:** American flags, bunting, stars-and-stripes motifs throughout — especially in images where patriotism clashes with eldritch horror.

---

## Signature Mechanic — Progressive Zalgo Corruption ("The Bleed")

Inspired by the iconic Stack Overflow Zalgo answer. Clean, dignified typography is the default. Rare intrusions of Unicode combining diacritics corrupt single words or phrases at emotional peaks, scattered like easter eggs.

**Implementation:** A `<Bleed>` component in `src/components/ui/bleed.tsx`:
- Props: `text: string`, `intensity: 1|2|3|4` (or `children` for inline wrapping)
- Applies Zalgo combining marks at render time
- Server-side compatible (pure string transformation)
- Intensity 1: single combining mark on a few characters (barely noticeable)
- Intensity 2: multiple marks, several characters affected (unsettling)
- Intensity 3: heavy corruption, most characters affected (disturbing)
- Intensity 4: full Zalgo, text barely readable (madness)

**Placement rules:**
- 0-2 instances per page, some pages have zero
- Surface-level pages (home, donate, volunteer) stay mostly clean
- Deep pages (coalition details, the "why-i-switched" article) carry heavier corruption
- Placement candidates: footer disclaimer, donation tier descriptions, coalition testimonial quotes, final lines of articles, fine print
- Escalation arc: the deeper you go into the site, the more the Bleed appears

---

## Theme & Visual Design

**Color palette — "Cursed Statecraft":**

| Token | Value | Usage |
|-------|-------|-------|
| primary | `#c4a035` (antique gold) | CTAs, headings, accents |
| secondary | `#1a2340` (deep midnight navy) | Cards, nav, secondary surfaces |
| accent | `#5c1a1a` (dried-blood crimson) | Donate buttons, alerts, urgency |
| background | `#0b0f1a` (abyss black-blue) | Page background |
| text | `#e0ddd4` (aged parchment) | Body text |

**Typography:**
- Heading: `playfair` (stately, serif, political gravitas — already in fonts.ts)
- Body: `inter` (clean, readable — already in fonts.ts)

**Favicon:** Tentacle wrapped around a ballot box, political party logo style

---

## Sitemap & Page Inventory

### Top-level navigation (MegaMenu):

| Nav Label | Route | Type |
|-----------|-------|------|
| Platform | `/platform` | Static — 8 policy positions |
| Coalitions | `/coalitions` | Index + dynamic `/coalitions/[slug]` (7 coalitions) |
| News | `/news` | Index + dynamic `/news/[slug]` (8 articles) |
| Events | `/events` | Static — 8 upcoming rallies |
| Get Involved | dropdown | Volunteer, Donate, Events |
| About | dropdown | About, Leadership, Candidate, Contact |
| Shop | `/shop` | Index + dynamic `/shop/[slug]` (10 products, commerce) |

### Full route map:

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage — party + featured candidate |
| `/platform` | Static | 8 policy positions |
| `/coalitions` | Static | Coalition index cards |
| `/coalitions/[slug]` | Dynamic | 7 coalition detail pages |
| `/news` | Static | News article index |
| `/news/[slug]` | Dynamic | 8 article detail pages |
| `/events` | Static | 8 upcoming rallies |
| `/volunteer` | Static | 6 volunteer activities |
| `/donate` | Static | 5 donation tiers |
| `/candidate` | Static | Cthulhu R'lyeh full bio |
| `/leadership` | Static | 4 party officials |
| `/about` | Static | Party history and founding |
| `/shop` | Static | Merch index |
| `/shop/[slug]` | Dynamic | 10 product detail pages |
| `/cart` | Commerce | Cart page |
| `/checkout` | Commerce | Checkout page |
| `/contact` | Static | Satirical contact with real email |
| `/privacy` | Static | Defers to Specific Industries |
| `/terms` | Static | Defers to Specific Industries |

**Total: ~20 page components, 3 dynamic route sets, ~25 data-driven slugs**

---

## Platform & Policy Positions

8 positions, each with: hero statement, 3-4 talking points, coalition endorser pull-quote, donate CTA. Light Bleed corruption on 2-3 pages.

| Issue | Position Title | Description | Real-politics parallel |
|-------|---------------|-------------|----------------------|
| Education | "Expanding Minds Beyond Euclidean Limits" | Mandatory Miskatonic University curriculum in all public schools. Students will learn the truths hidden in the Necronomicon. Knowledge that cannot be unlearned is the strongest foundation for our youth. | Common Core, curriculum standards |
| National Security | "R'lyeh Rising: A Stronger America From Below" | Raise the sunken city as a forward military base. American flags on every spire. | Military spending, foreign bases |
| Healthcare | "The Deep Restoration Initiative" | Citizens who sleep near the coast report remarkable healing. Expand coastal dormitory access and fund research into the restorative properties of prolonged submersion. Side effects are temporary and mostly cosmetic. | Universal healthcare, wellness |
| Economy | "Deep Ones Job Creation Act" | Underwater infrastructure projects, Deep One guest-worker visas, coastal economic zones. | Immigration, jobs programs |
| Energy | "Non-Euclidean Energy Independence" | Harness the angles between dimensions. Clean, infinite, mildly sanity-eroding. | Green energy, energy independence |
| Housing | "Innsmouth Revitalization Initiative" | Affordable waterfront living for families willing to undergo modest physiological changes. | Affordable housing, gentrification |
| Foreign Policy | "The Esoteric Order Accords" | Replace NATO with a network of cosmic pacts. Stronger alliances through shared dread. | NATO, international alliances |
| Civil Rights | "The Shoggoth Personhood Amendment" | Equal rights for all entities regardless of dimensional origin or number of mouths. | Civil rights, immigration reform |

---

## Coalitions & Endorsing Movements

7 coalitions. Index page at `/coalitions` + individual detail pages at `/coalitions/[slug]`. Detail pages include: movement history, leadership quote, official endorsement statement, "Why We Stand With The Elder Party" section. Heavier Bleed corruption on detail pages (1-2 instances each).

| Coalition | Slug | Description | Endorsement angle |
|-----------|------|-------------|-------------------|
| Children's Mineral Labor Coalition | `mineral-labor` | Advocates for youth enrichment through salt mine apprenticeships. "Idle hands are unproductive hands." | Education, Economy |
| Demonic Possession Party | `possession-party` | Believes possession is a civil right, not a medical condition. Grassroots org with chapters in every swing state. | Healthcare, Civil Rights |
| The Illuminated Order | `illuminated-order` | Finally stepping out of the shadows after centuries of behind-the-scenes governance. "We've always run things. Now we'd like credit." Detail page has a section where the mask slips — copy gets progressively more honest. | Foreign Policy |
| Fishermen United for Innsmouth | `fishermen-innsmouth` | Coastal workers' union advocating for Deep One labor protections and interspecies collective bargaining. | Economy, Housing |
| Mothers Against Euclidean Geometry | `mothers-geometry` | Parent advocacy group concerned about the limitations of traditional mathematics on their children's perception of reality. | Education |
| The Arkham Neighborhood Watch | `arkham-watch` | Community safety through elder summoning. "When the Old Ones watch your street, crime watches itself." | National Security |
| The Esoteric Taxpayers Alliance | `esoteric-taxpayers` | Fiscal conservatives who believe tax dollars should fund dimensional gateway infrastructure, not "so-called" roads. | Energy, Economy |

---

## Leadership Team

4 party officials using standard base images with Lovecraftian horror-themed portrait generation. All portraits include American flag elements.

| Base | Character | Title | Portrait treatment | Bio |
|------|-----------|-------|--------------------|-----|
| Bill | Cthulhu R'lyeh | Founder & Party Leader | Cthulhu features, tentacles, greenish pallor, ancient eyes. Suit/tie, American flag backdrop. | "Has waited millennia to serve this great nation. Emerged from the Pacific with a vision for America's future. Previous experience: dreaming." |
| Brandon | Nyarlathotep Marsh | Campaign Chairman | Crawling Chaos meets campaign strategist. Shifting, unsettling features, too many teeth in a photogenic smile. Flag lapel pin. | "A thousand faces, one message. Has run campaigns across dimensions and always delivers results. Voters describe him as 'impossible to forget.'" |
| Jim | Dagon Whately | Policy Director | Deep One hybrid meets DC policy wonk. Amphibious features, bulging eyes, slick skin. Reading glasses, briefcase, flag pin. | "Third-generation Innsmouth resident. Georgetown Law (class of 1847). Authored the Deep Ones Job Creation Act. Breathes underwater, which he insists is not relevant." |
| Sean | Hastur Olmstead | Volunteer Coordinator & Field Director | King in Yellow energy. Gaunt, intense, piercing stare, hint of tattered yellow beneath suit jacket. Campaign yard signs and American bunting in background. | "Wherever two or more gather to canvass, he is there. Organizes rallies that attendees describe as 'life-changing' and 'impossible to leave.' Do not ask about the Yellow Sign." |

- `/leadership` — grid of portrait cards with name, title, bio
- `/candidate` — full dedicated page for Cthulhu R'lyeh with extended bio, "Vision for America" section, patriotic hero image

---

## Merch Catalog (Commerce)

10 products at `/shop` using existing CartProvider/AddToCartButton pattern. Product data in `data/products.ts`.

| Product | Slug | Price | Description |
|---------|------|-------|-------------|
| "R'lyeh Rising" Yard Sign | `yard-sign` | $13.00 | Standard corrugated campaign yard sign. Tentacle motif border. Compliant with most HOA bylaws in most dimensions. |
| "Cthulhu R'lyeh 2028" Hat | `campaign-hat` | $31.00 | Red trucker cap with embroidered tentacle-flag logo. One size fits most cranial configurations. |
| Elder Party Lapel Pin | `lapel-pin` | $6.66 | Gold tentacle wrapped around an American star. May feel warm to the touch. |
| "I Voted Elder" Bumper Sticker | `bumper-sticker` | $4.00 | Patriotic red/white/blue with subtle tentacle watermark. Weather resistant. Void resistant. |
| Cultist Canvassing Tote | `canvassing-tote` | $22.00 | Sturdy canvas tote for door-to-door outreach. Holds pamphlets, yard signs, and offerings. |
| Official Campaign Robe | `campaign-robe` | $66.00 | Hooded ceremonial robe in midnight navy with gold Elder Party seal. Machine washable. Do not dry clean — the symbols react poorly to chemical solvents. |
| The Necronomicon Pocket Constitution | `pocket-constitution` | $8.00 | Leather-bound, gilt-edged. Some pages appear blank until moonlight. |
| "Ph'nglui Mglw'nafh" Coffee Mug | `coffee-mug` | $16.00 | Full R'lyehian text on one side, English "translation" on the other. Dishwasher safe. |
| Elder Party Flag (3x5) | `party-flag` | $40.00 | American flag layout with Elder Party seal replacing the stars. Flies well in coastal winds and dimensional crosscurrents. |
| Founding Donors Bundle | `founders-bundle` | $166.00 | Hat, robe, pin, flag, pocket constitution, and a handwritten thank-you note from the Campaign Chairman. Note may arrive before you order. |

---

## News Articles

8 articles at `/news` with dynamic detail pages at `/news/[slug]`. Written as straight-faced campaign dispatches. Each article has 1-2 images.

| Headline | Slug | Summary |
|----------|------|---------|
| Candidate R'lyeh Surges in Polls Across Coastal Districts | `coastal-surge` | Double-digit gains in every district within 50 miles of the ocean. Inland numbers "will follow once the water rises." |
| Mayor of Arkham Endorses Elder Party Ticket | `arkham-endorsement` | Historic endorsement. Mayor praises the party's "willingness to confront realities other candidates won't even look at directly." |
| Elder Party Opens 50-State Field Office Network | `field-offices` | Offices have appeared simultaneously in all 50 states. Local officials do not recall issuing permits. |
| Campaign Chairman Marsh Delivers Keynote at Miskatonic Homecoming | `miskatonic-keynote` | Standing ovation. Three attendees reportedly "ascended." Keynote transcript available in R'lyehian only. |
| Record Fundraising Quarter: $66.6 Million Raised | `fundraising-record` | Small-dollar donations from "millions of Americans who hear the call." Average donation: $13.13. |
| Elder Party Platform Endorsed by Arkham Neighborhood Watch | `arkham-watch-endorsement` | Community safety coalition throws full support. Neighborhood crime down 100% in zones where summoning circles are active. |
| Volunteer Drive Exceeds All Projections | `volunteer-surge` | 200,000 new volunteers in a single weekend. Many report signing up "in a dream" but confirm their commitment. |
| Op-Ed: "Why I Left My Party for the Elder Party" | `why-i-switched` | A former swing voter explains their conversion. Bleed corruption gets heavy toward the end of this article. |

---

## Events

8 upcoming rallies on a static `/events` page. Each event has its own image.

| Event | Location | Date | Description |
|-------|----------|------|-------------|
| Midnight Rally at Miskatonic University | Arkham, MA | June 13, 2028 | Keynote by Cthulhu R'lyeh. Gates open at sundown. Bring candles. |
| Town Hall Beneath the Waves | Innsmouth, MA | June 21, 2028 | Underwater town hall. Breathing apparatus provided or unnecessary, depending. |
| Coastal Awakening Tour — Portland Stop | Portland, ME | July 4, 2028 | Independence Day celebration. Fireworks visible from several planes of existence. |
| Great Lakes Summoning Picnic | Sandusky, OH | July 18, 2028 | Family-friendly. Potato salad, three-legged races, minor incantations. |
| Heartland Revival & Voter Registration | Des Moines, IA | August 1, 2028 | Swing-state outreach. Free yard signs. Corn maze leads somewhere new this year. |
| Southern Awakening BBQ | Savannah, GA | August 15, 2028 | Low country boil. The Elder Party's southern hospitality initiative. Come hungry. |
| Desert Stars Convergence | Roswell, NM | September 3, 2028 | Joint event with The Illuminated Order. "They came from the stars. So did we." |
| The Grand Rally — Election Eve | Washington, D.C. | November 4, 2028 | The National Mall. Every volunteer, every donor, every convert. The Awakening begins. |

---

## Donate Page

Hero: "Every Dollar Brings Us Closer to Awakening."

5 donation tiers:

| Tier | Amount | Reward | Tone |
|------|--------|--------|------|
| Supporter | $13 | Digital "I Stand With The Elder Party" badge | Entry level, earnest |
| Patriot | $31 | Bumper sticker mailed to your address (which we already know) | Slightly unsettling |
| Devoted | $66 | Signed letter from Campaign Chairman Marsh. Signature appears wet. | Escalating |
| Awakened | $166 | Name inscribed in the Book of Donors. The Book remembers. | Ominous |
| Ascended | $666 | Private audience with Party Leadership. Location revealed in a dream. | Full horror, Bleed corruption |

Below tiers: "Why Donate?" section, progress bar toward $66,600,000, coalition endorsement quotes.

---

## Volunteer Page

Hero: "The Campaign Needs You. It Has Always Needed You."

6 volunteer activities, each with its own image:

| Activity | Description |
|----------|-------------|
| Canvass Your Neighborhood | Door-to-door outreach kit. "Knock three times. If no one answers, leave a pamphlet. If something answers, proceed with the script." |
| Host a Watch Party | Debate watch parties and "study groups." Suggested reading list includes the Necronomicon. |
| Phone Bank | "Call your neighbors. If the line sounds like the ocean, you've reached the right number." |
| Register Voters | "All sentient entities are eligible. Sapience is preferred but not required." |
| Campus Organizing | Miskatonic University chapter leads the way. "Advisors are standing by. Some of them are standing behind you." |
| Become a Precinct Captain | "Precinct Captains report directly to Field Director Olmstead. Weekly check-ins occur whether you initiate them or not." |

Bleed instances on phone bank description and precinct captain fine print.

---

## Image Generation Plan

All images output to `public/sites/elderparty/`. Generated via `scripts/generate-elderparty-images.ts`. Total: ~73 images (4 person-based portraits, 5-6 additional person-based shots, ~62 standard generations).

### Favicon & Hero (2)
- `favicon.png` — Tentacle wrapped around a ballot box, political party logo style
- `hero.png` — American flag draped over something massive and ancient rising from the ocean, patriotic lighting (1536x1024)

### Leadership Portraits (4, person-based)
- `team-bill.png` — Cthulhu R'lyeh: suit/tie, American flag backdrop, tentacle features, greenish pallor (person: bill)
- `team-brandon.png` — Nyarlathotep Marsh: unsettling smile, flag lapel pin (person: brandon)
- `team-jim.png` — Dagon Whately: Deep One hybrid, reading glasses, flag pin (person: jim)
- `team-sean.png` — Hastur Olmstead: gaunt, intense, tattered yellow hint, campaign bunting (person: sean)

### Candidate Page (2, person-based)
- `candidate-hero.png` — Cthulhu R'lyeh at podium with American flags, rally crowd (1536x1024, person: bill)
- `candidate-vision.png` — Cthulhu R'lyeh gazing across American landscape, sunrise, flags (person: bill)

### Platform (9)
- `platform-hero.png` — American flag with tentacles woven into stripes (1536x1024)
- `platform-education.png` — Miskatonic University campus, students, American flags
- `platform-security.png` — R'lyeh rising from ocean with American military vessels
- `platform-healthcare.png` — Coastal dormitory facility, serene seaside, patients walking toward water, flags
- `platform-economy.png` — Deep Ones and human workers at construction site, hard hats, flags
- `platform-energy.png` — Power plant with impossible geometry, glowing non-Euclidean angles, flags
- `platform-housing.png` — Innsmouth waterfront neighborhood, families with subtle amphibious features, flags
- `platform-foreign-policy.png` — Diplomatic summit, delegates from various dimensions, American and elder sigil flags
- `platform-civil-rights.png` — March on Washington, shoggoths and humans with signs, Capitol, flags

### Coalitions (8)
- `coalitions-hero.png` — Diverse supporters at rally, mix of normal and slightly off individuals, flags (1536x1024)
- `coalition-mineral-labor.png` — Children with hardhats in salt mine, cheerful propaganda poster style
- `coalition-possession-party.png` — Town hall meeting, some attendees levitating, flags on wall
- `coalition-illuminated-order.png` — Shadowy figures stepping into spotlight at press conference, pyramids
- `coalition-fishermen-innsmouth.png` — Fishermen on dock, some amphibious, American flag on boat
- `coalition-mothers-geometry.png` — PTA meeting, impossible angles on chalkboard, concerned mothers
- `coalition-arkham-watch.png` — Neighborhood watch sign with elder sigils, suburban, flags on porches
- `coalition-esoteric-taxpayers.png` — Men in suits with protest signs about gateway funding, Capitol

### News Articles (12-16, 1-2 per article)
- `news-coastal-surge.png` — Beach rally, huge crowd, flags, something in the water
- `news-coastal-surge-2.png` — Electoral map with coastal districts glowing green
- `news-arkham-endorsement.png` — Mayor at podium shaking hands (person: brandon)
- `news-field-offices.png` — Storefront campaign office, Elder Party signage, flags
- `news-miskatonic-keynote.png` — University auditorium, speaker at podium (person: brandon)
- `news-fundraising.png` — Staffers celebrating, donation thermometer at $66.6M
- `news-arkham-watch-endorsement.png` — Neighborhood watch members at press conference
- `news-volunteer-surge.png` — Massive volunteer rally, sea of campaign signs, flags
- `news-volunteer-surge-2.png` — Volunteers at folding tables, canvassing kits, suburban
- `news-why-i-switched.png` — Person at kitchen table writing, flag through window (person: jim)
- `news-why-i-switched-2.png` — Same person at rally, transformed expression (person: jim)

### Events (8)
- `event-miskatonic-rally.png` — Nighttime rally at gothic university, torches, flags
- `event-town-hall-waves.png` — Seaside meeting hall, waves, underwater tint, patriotic bunting
- `event-portland-fourth.png` — Fourth of July, fireworks, tentacle shapes in sky, flags
- `event-great-lakes-picnic.png` — Family picnic by lake, something in water, flags
- `event-heartland-revival.png` — Iowa cornfield rally, campaign signs, flags, amber twilight
- `event-southern-bbq.png` — Outdoor BBQ, Spanish moss, string lights, campaign signs, flags
- `event-desert-stars.png` — Desert night sky, stars in wrong patterns, Roswell vibes, flags
- `event-grand-rally-dc.png` — National Mall packed, Washington Monument, flags, something in sky (1536x1024)

### Donate (2)
- `donate-hero.png` — Hands reaching toward something golden and tentacled, campaign energy (1536x1024)
- `donate-thermometer.png` — Stylized fundraising thermometer with Elder Party branding

### Volunteer (6)
- `volunteer-hero.png` — Volunteers in Elder Party shirts, clipboards, flags, suburban street (1536x1024)
- `volunteer-canvass.png` — Door-to-door canvassing, volunteer at front door, pamphlets
- `volunteer-watch-party.png` — Living room debate watch party, snacks, campaign decorations, flags
- `volunteer-phone-bank.png` — Phone bank room, headsets, campaign posters on walls
- `volunteer-register.png` — Voter registration table at park, banner, clipboards
- `volunteer-campus.png` — College campus organizing, students at table, ivy buildings

### Shop Products (10)
- `product-yard-sign.png` — Campaign yard sign on lawn, tentacle border
- `product-hat.png` — Red trucker cap, tentacle-flag logo
- `product-lapel-pin.png` — Gold tentacle-star pin
- `product-bumper-sticker.png` — Bumper sticker on car, patriotic colors
- `product-tote.png` — Canvas tote with campaign branding
- `product-robe.png` — Midnight navy hooded robe, gold seal
- `product-constitution.png` — Leather-bound pocket constitution, gilt edges
- `product-mug.png` — Coffee mug with R'lyehian text
- `product-flag.png` — 3x5 Elder Party flag
- `product-founders-bundle.png` — Gift box with all items arranged

### About Page (2)
- `about-hero.png` — Elder Party headquarters, stately columns, flags, tentacle architectural details (1536x1024)
- `about-founding.png` — Founding scene, constitutional convention meets eldritch ritual, flags

### Contact & Checkout (2)
- `contact-hero.png` — Campaign office interior, desks, phones, flags
- `checkout-construction.png` — Store under construction with campaign theming

---

## Architecture

### File structure
```
src/sites/elderparty/
├── config.ts          — SiteConfig: theme, nav, megaMenu, commerce: true
├── index.ts           — barrel: config, pages, dynamicRoutes
├── data/
│   ├── products.ts    — merch catalog + getProductBySlug()
│   ├── coalitions.ts  — coalition data + getCoalitionBySlug()
│   ├── news.ts        — articles data + getArticleBySlug()
│   └── platform.ts    — policy positions data
└── pages/
    ├── home.tsx
    ├── platform.tsx
    ├── coalitions.tsx
    ├── coalition-detail.tsx
    ├── news.tsx
    ├── news-detail.tsx
    ├── events.tsx
    ├── volunteer.tsx
    ├── donate.tsx
    ├── candidate.tsx
    ├── leadership.tsx
    ├── about.tsx
    ├── shop.tsx
    ├── product-detail.tsx
    ├── cart.tsx
    ├── checkout.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx
```

### Dynamic routes
```typescript
export const dynamicRoutes = {
  "coalitions": {
    component: CoalitionDetail,
    getMetadata: (slug) => ({ title, description }),
    isValidSlug: (slug) => !!getCoalitionBySlug(slug),
  },
  "news": {
    component: NewsDetail,
    getMetadata: (slug) => ({ title, description }),
    isValidSlug: (slug) => !!getArticleBySlug(slug),
  },
  "shop": {
    component: ProductDetail,
    getMetadata: (slug) => ({ title, description }),
    isValidSlug: (slug) => !!getProductBySlug(slug),
  },
}
```

### New shared component
- `<Bleed>` in `src/components/ui/bleed.tsx` — Zalgo corruption renderer. Props: `text`, `intensity: 1|2|3|4`. Server-side compatible (pure string transformation, no client state).

### Navigation
MegaMenu (like Strategic Void) with dropdowns for Coalitions, About (Leadership/Candidate/Contact), and Get Involved (Volunteer/Donate/Events).

### Commerce
Existing CartProvider, AddToCartButton, cart/checkout pattern.

### Server components
All pages server components by default. Client components only for: cart/checkout, AddToCartButton, interactive donate-tier selector.

### Required conventions
- Privacy & Terms pages defer to Specific Industries umbrella policy
- Contact page is satirical but contains real email `bsambrone@gmail.com` in small print
- Leadership team uses Bill/Brandon/Jim/Sean base images with randomized Lovecraftian names
