# Squared Away Supply Co. — Design

## Overview

A new subdomain site at `squaredaway.specificindustries.com` — a satirical Post/Base Exchange selling absurd, useless gear to all four branches of the US military. Poses as an official PX with an MWR "morale by the pound" flavor. 32 products across Army, Navy, Air Force, and Marines (8 each) with full product detail pages, a Morale Program loyalty page, fake authorization gate, FAQ, and the standard leadership/contact/privacy/terms set.

**Tagline:** *"The Official Unofficial Post Exchange. Morale is a metric. We sell it by the pound."*

## Voice & Tone

Deadpan bureaucratic shell wrapped around inter-branch heckling. Every product card and detail page carries:

- **NSN-style stock number** (e.g., `NSN 8465-69-420-MRE`)
- **Fake contract code** (e.g., `Contract #W91CRB-24-C-0069`)
- **MIL-STD footer gag** (e.g., `MIL-STD-SUCK`, `MIL-STD-OORAH`, `MIL-STD-KHAKI`)
- **Asterisked disclaimer** — one absurd footnote per product
- **One cross-branch jab** per product — the copy acknowledges rival services and roasts them

### Voltage reference (the template — all other products match this level)

> **NSN 8465-69-420-MRE**
> **The Grunt's Embrace™ Tactical Pillow**
> *Army • $84.99*
>
> Finally, a pillow that respects your profession. Constructed from reinforced MOLLE webbing, filled with genuine poured concrete*, and available in the same Universal Camouflage Pattern that didn't work in Iraq. Weight: 11.2 lbs. Ready to ruck.
>
> The Air Force already has memory foam with a thread count. You have this.
>
> *Concrete sourced from a demolished NCO club at Fort Hood. Not morale-compliant.*
>
> **Authorized for Land Component Personnel Only.** Not cleared for use by Chair Force.
>
> *Nomenclature: PIL, DNG, HVY • Contract #W91CRB-24-C-0069 • MIL-STD-SUCK*

## Theme

- **Palette:** Olive drab `#4B5320` primary, subdued khaki `#BDB76B` secondary, safety-orange `#FF6B1A` accent for CTAs. Background manila/cream `#F5EFE0` evoking government paperwork.
- **Fonts:**
  - Headings: `Black Ops One` (Google Fonts) — stencil display
  - NSN/contract codes: `JetBrains Mono` (already in theme)
  - Body: `Inter` — already in theme
- **Hero image:** Faux-official PX storefront, olive drab awning, posted hours, bureaucratic signage ("NOW SERVING: E-1 THROUGH O-10"). Also serves as `ogImage`.

## Site Structure

### Top-level pages (12 site-specific, plus shared `/cart` and `/checkout`)

| Path | Page |
|---|---|
| `/` | Homepage |
| `/army` | Army branch grid |
| `/navy` | Navy branch grid |
| `/airforce` | Air Force branch grid |
| `/marines` | Marines branch grid |
| `/morale` | MWR Morale Program loyalty tiers |
| `/authorization` | Fake ID-check gag page |
| `/faq` | Absurd Q&A |
| `/leadership` | 4-person command staff |
| `/contact` | Satirical contact form + real email |
| `/privacy` | Umbrella callout + satirical body |
| `/terms` | Umbrella callout + satirical body |
| `/cart` | Standard cart page (shared) |
| `/checkout` | Standard checkout page (shared) |

### Dynamic routes

- `/products/[slug]` — 32 product detail pages via `dynamicRoutes` pattern.

### Navigation

- **Header:** Army • Navy • Air Force • Marines • Morale • FAQ • Leadership
- **Footer:** Contact • Privacy • Terms • Authorization

### Commerce

`features.commerce: true` enables `CartProvider`, `CartButton`, `AddToCartButton`, Toast, `/cart`, `/checkout`. LocalStorage key `squaredaway-cart`.

## Page Treatments

### `/` Homepage

- **Hero:** Storefront image + headline "The Official Unofficial Post Exchange" + subhead "Authorized gear for all four service branches, plus one that shall remain nameless." (running Space Force absence gag)
- **Branch tiles:** 4 large cards — Army, Navy, Air Force, Marines. Each with branch-specific imagery, one-line roast of that branch, and CTA.
- **Featured strip — "This Week at the PX":** 3 rotating featured products: `grunts-embrace`, `premium-deployment-concierge-kit`, `culinary-coloring-sticks`.
- **Morale Program pitch block:** 1-paragraph MWR pitch + "Enroll" CTA linking to `/morale`.
- **Testimonials band:** 4 testimonials, one per branch. Each has rank, fake name, fake base, and a tight deadpan quote. Example voice: *"I bought the invisibility cloak. My 1SG still found me."* — SGT (P) Devaughn Miles, Fort Irwin.

### Branch pages — `/army`, `/navy`, `/airforce`, `/marines`

Each page:
- Branch-specific hero banner with branch seal-adjacent faux-official emblem and a one-paragraph intro in the PX's voice roasting the branch.
- 8-product grid using `ProductCard`. Cards show name, NSN, price, tagline, thumbnail. Click → `/products/[slug]`.
- Footer: cross-promotion strip linking to the other 3 branches.

### `/products/[slug]` — Product detail

Layout per page:
- Hero image (1:1 or 4:5)
- NSN header, name, price, tagline
- Long description (~150-250 words in-voice)
- Specs table — 6 rows of fake technical specs
- Warnings block — 2 absurd warnings
- Cross-branch jab — pulled quote, styled distinctly
- Customer reviews — 3 fake reviews with rank, name, stars, body
- Add to cart button + quantity selector
- Contract/MIL-STD footer strip
- "Related Items" strip: 3 other products from the same branch

### `/morale` — Morale Program

Satirical loyalty program. No backend.

- Hero: "Morale is a metric. Earn yours."
- Six tiers table:

| Tier | Points | Reward |
|---|---|---|
| E-1 Private | 0 | A "Welcome to Morale" PDF |
| E-5 Sergeant | 500 | 10% off your next brick |
| E-9 Command Sergeant Major | 2,500 | One free PowerPoint template |
| O-3 Captain | 5,000 | A laminated certificate of your own name |
| O-6 Colonel | 15,000 | Complimentary golf course keychain |
| O-10 General | 50,000 | "The illusion of meaning" (ships in 6-8 weeks) |

- Enrollment form: email input + "Initiate Morale" button. Submit triggers Toast: *"Morale pending review. Await further orders."* No backend persistence.
- FAQ block (4 Qs) about the program — all absurd.

### `/authorization` — Fake ID gate

- Headline: "Authorization Required"
- Subhead: "All personnel must verify tier before shopping."
- Dropdown: `Active Duty`, `Reservist`, `National Guard`, `Retired`, `Dependent`, `DoD Civilian`, `Civilian Contractor (LinkedIn Edition)`, `Owns ≥1 Punisher Sticker`, `Watched Top Gun: Maverick`, `Other`
- "Verify" button → toast/banner: *"Authorization granted. You are squared away. Welcome to the PX."*
- Fine print at bottom: *"This authorization check is non-binding, non-verifiable, and frankly non-existent."*

### `/faq`

12 Q&As. Example set (final copy drafted during implementation):

1. *"Do I need to salute my order confirmation?"* → *"Only if the product was authorized by an O-4 or above."*
2. *"Is this a real PX?"* → *"Define 'real.'"*
3. *"Can I use my GI Bill here?"* → *"No. The GI Bill is for education. This is for morale."*
4. *"Do you ship to FPO/APO addresses?"* → *"Yes, eventually, probably, we promise."*
5. *"Why is there no Space Force section?"* → *"We're still waiting on their NSN codes."*
6. *"Can I return a product?"* → *"You cannot return the years, but you may return the product."*
7. *"Do you honor military discounts?"* → *"We honor you. Prices are prices."*
8. *"Is the crayon product safe to eat?"* → *"It is safe to eat if you are a Marine. It is food-adjacent for all other personnel."*
9. *"What is MIL-STD-SUCK?"* → *"A standard. It is met."*
10. *"Do officers get special treatment here?"* → *"Yes. Their items ship in slightly nicer envelopes."*
11. *"Why are Air Force items so expensive?"* → *"Ask them."*
12. *"Can my spouse shop here?"* → *"Yes. Dependents are the backbone of morale."*

### `/leadership` — Command Staff

4-person team following the memory pattern (same four underlying people, names and titles fully randomized per site, bill always founder). Each bio is deadpan with one absurd detail.

| Person | Rethemed Name | Title | Branch Flavor |
|---|---|---|---|
| **Bill** (founder) | General (Ret.) Walter "Wally" Hardcastle | Founder & Chief Morale Officer | Army |
| Brandon | Admiral (Ret.) Preston Blackwell III | Chief Seamanship Officer | Navy |
| Jim | Colonel (Ret.) Tucker Lindgren | VP of Premium Experience | Air Force |
| Sean | Sergeant Major Huxley "Hux" Maddox | Director of Oorah Operations | Marines |

**Bio voice example (Hardcastle):** *"General Hardcastle served 38 years across 4 continents, 11 commands, and 2,400 PowerPoint briefings. He retired in 2019 and has since dedicated his life to the conviction that morale can be purchased."*

**Portraits:** Generated via `mcp__image-gen__generate_image_with_person` using the base bill/brandon/jim/sean reference photos. Each rendered as a formal branch-appropriate command portrait (see Section 4 of brainstorming summary). 1024x1536 PNGs under `public/sites/squaredaway/`.

### `/contact`

Styled as a fake DoD intake form titled *"Request to Contact a Command Representative"*.

- Fake dropdown: "Inquiry Classification" — `Morale-related`, `Morale-adjacent`, `Entirely morale-free`, `Routing to PSYOP`
- Fake fields: name, rank, unit, message
- Submit button: "Route to Command"
- On submit: Toast — *"Your inquiry has been logged. An E-6 will review it during business hours."*
- Real email in fine print: *"UNCLASSIFIED // FOUO — For inquiries that refuse to be squared away: bsambrone@gmail.com"*

### `/privacy` and `/terms`

Both follow the umbrella + satire pattern (see `feedback_new_site_patterns.md`):

1. Umbrella callout at top in a bordered block: *"The Specific Industries privacy policy at specificindustries.com/privacy is the authoritative policy governing all data handling across all Specific Industries properties, including Squared Away Supply Co. The content below is satirical and non-binding."*
2. Numbered satirical sections below, in-voice:

**Privacy sections:**
1. Data We Collect (And What We Do With It)
2. Cookies (Not the Good Kind)
3. Your Rights Under the Uniform Code of Morale Justice
4. Classification Markings We Completely Made Up
5. Third-Party Sharing (Only with Command)
6. Data Retention (Until the End of Your Enlistment, Spiritually)

**Terms sections:**
1. Enlistment in These Terms
2. Acceptable Use of the PX
3. Returns, Exchanges, and the Grief Process
4. Limitation of Morale
5. Indemnification Against Cross-Branch Heckling
6. Governing Law (DoD, Probably)

## Product Catalog (32 products)

All products share the common data shape:

```typescript
type Branch = "army" | "navy" | "airforce" | "marines"
type Review = { rank: string; name: string; stars: number; body: string }
type Spec = { label: string; value: string }

type Product = {
  slug: string
  branch: Branch
  nsn: string              // e.g. "8465-69-420-MRE"
  contractCode: string     // e.g. "W91CRB-24-C-0069"
  milStd: string           // e.g. "MIL-STD-SUCK"
  name: string
  price: number
  priceLabel: string
  tagline: string
  image: string
  shortDescription: string // card blurb (~30 words)
  longDescription: string  // detail page body (~150-250 words)
  specs: Spec[]            // 6 rows
  warnings: string[]       // 2 items
  crossBranchJab: string   // pulled-quote line
  reviews: Review[]        // 3 reviews
  featured?: boolean       // flagged for homepage featured strip
}
```

Final long-form copy (body, specs, warnings, reviews) is drafted during implementation. This spec locks name, slug, price, tagline, NSN, MIL-STD tag, key joke angles, and cross-branch target for each product.

### Army — 8 products

**1. The Grunt's Embrace™ Tactical Pillow**
- slug: `grunts-embrace` · NSN: `8465-69-420-MRE` · MIL-STD-SUCK · $84.99
- tagline: *Concrete-filled MOLLE. Ready to ruck.*
- joke angles: heavy MOLLE pillow, UCP camo that didn't work, concrete filling, sourced from demolished NCO club
- cross-branch: Air Force (memory foam with thread count)
- featured: true

**2. MRE Pairing Flight: The Fort Polk Collection**
- slug: `mre-pairing-flight-fort-polk` · NSN: `8970-ARM-MRE-04` · MIL-STD-SLOP · $119.99
- tagline: *Four MREs paired with regret.*
- joke angles: wine-tasting format applied to MREs (Chili Mac, Beef Stew, Veggie Omelet, Jalapeño Pepper Pouch), sommelier-style pairing notes
- cross-branch: Air Force (eats steak at Qatar)

**3. UCP Classic™ Commemorative Invisibility Cloak**
- slug: `ucp-invisibility-cloak` · NSN: `8415-UCP-FAIL` · MIL-STD-WHY · $249.99
- tagline: *The camouflage that camouflaged nothing.*
- joke angles: Universal Camouflage Pattern debacle, cloak-format satire, "as seen failing in Iraq, 2005-2019"
- cross-branch: Marines (MARPAT actually worked)

**4. Regulation Sergeant Major Mustache Kit**
- slug: `sergeant-major-mustache-kit` · NSN: `6515-SMJ-STACHE` · MIL-STD-HOOAH · $64.99
- tagline: *Wax, comb, and one framed citation.*
- joke angles: aggressive senior NCO mustache culture, included framed commendation for "exceptional facial grooming"
- cross-branch: Navy (beards are allowed, but theirs look worse)

**5. Artisanal Field Mud™ (1 gal.)**
- slug: `artisanal-field-mud` · NSN: `8305-MUD-POLK` · MIL-STD-WET · $39.99
- tagline: *Sourced from Fort Polk. Certified miserable.*
- joke angles: single-origin mud, terroir of JRTC, for reenactors and nostalgic veterans
- cross-branch: Air Force (has never seen mud)

**6. The Hooah Bar™**
- slug: `hooah-bar` · NSN: `8940-HOOAH-01` · MIL-STD-CHOMP · $89.00
- tagline: *Tastes like motivation and abandonment.*
- joke angles: overpriced artisanal chocolate energy bar riff on the real Hooah Bar
- cross-branch: Marines (Culinary Coloring Sticks cost less)

**7. Rucking Enrichment Stones™ (set of 6)**
- slug: `rucking-enrichment-stones` · NSN: `5530-RUCK-BRK` · MIL-STD-HEAVY · $149.99
- tagline: *Decorative bricks for emotional weight.*
- joke angles: bricks sold as "emotional weight" mindfulness tool for ruck marches, each named
- cross-branch: Navy (ships carry your weight for you)

**8. PowerPoint of the Month Club™**
- slug: `powerpoint-of-the-month-club` · NSN: `7690-PPT-SUB` · MIL-STD-SLIDE · $29.99/month
- tagline: *400+ safety slides, delivered monthly.*
- joke angles: subscription satire on Army PowerPoint culture, monthly delivery of safety briefings, sexual harassment prevention, SHARP, and OPSEC slides
- cross-branch: all branches (the one thing everyone shares)

### Navy — 8 products

**1. Chief's Coffee™ Dark Deployment Roast**
- slug: `chiefs-coffee-dark-deployment` · NSN: `8955-NAV-JOE-01` · MIL-STD-BREW · $45.00
- tagline: *Ground on the flight deck by a chief named Dave.*
- joke angles: Navy coffee obsession, single-origin aircraft carrier coffee, sourced from Goat Locker
- cross-branch: Army (still drinks Folgers)

**2. Goat Locker™ Membership Soap**
- slug: `goat-locker-soap` · NSN: `8520-CPO-GOAT` · MIL-STD-ANCHOR · $24.99
- tagline: *For Chiefs. And Chief-adjacent civilians.*
- joke angles: goat-shaped soap, Chief Petty Officer Goat Locker culture, honors initiation
- cross-branch: Marines (their mascot is a bulldog, ours is a goat, we win)

**3. The 7-Month Deployment™ Beard Oil**
- slug: `deployment-beard-oil` · NSN: `8520-NAV-BEARD` · MIL-STD-FUZZ · $52.00
- tagline: *For beards the Navy technically allows.*
- joke angles: Navy's beard policy ambiguity, 7-month deployment cadence, "works for no-shave chits too"
- cross-branch: Army (you're not allowed a beard and it shows)

**4. Dixie Cup Hat Storage System**
- slug: `dixie-cup-storage-system` · NSN: `8405-DIX-STOR` · MIL-STD-WHITE · $129.99
- tagline: *An elaborate contraption for one white hat.*
- joke angles: over-engineered, stainless steel, humidity-controlled, lit from within, holds one Dixie cup
- cross-branch: Air Force (your hats cost less because you wear berets to brunch)

**5. Shellback Certification Coaster Set**
- slug: `shellback-coaster-set` · NSN: `7690-SHELL-4PK` · MIL-STD-EQU · $34.99
- tagline: *I crossed the equator once and won't shut up.*
- joke angles: certificate culture, Shellback/Pollywog rituals, set of 4 coasters, "discusses itself"
- cross-branch: Army (has never crossed the equator in uniform)

**6. Sub School Pillowcase — Blackout Edition**
- slug: `sub-school-pillowcase` · NSN: `7210-SUB-DARK` · MIL-STD-SILENT · $39.99
- tagline: *For sailors who haven't seen the sun in 90 days.*
- joke angles: submariner life, sensory deprivation, sleep hygiene for bubbleheads
- cross-branch: Air Force (you sleep in a hotel)

**7. Liberty Call Regret Planner™**
- slug: `liberty-call-regret-planner` · NSN: `7530-LIB-REG` · MIL-STD-OOPS · $22.00
- tagline: *7 days. 7 entries. All say "Regret."*
- joke angles: port call stereotypes (Olongapo, Pattaya, Rota), pre-filled weekly planner with every entry saying "Regret"
- cross-branch: Marines (your regret comes with a tattoo)

**8. Haze Gray Paint Touch-Up Kit**
- slug: `haze-gray-touchup-kit` · NSN: `8010-GRAY-HAZ` · MIL-STD-GRAY · $19.99
- tagline: *For your car, house, and will to live.*
- joke angles: underway paint-chipping culture, one can of haze gray, recipe card for "chip and paint Saturdays"
- cross-branch: Air Force (your buildings are beige)

### Air Force — 8 products

**1. Premium Deployment Concierge Kit™**
- slug: `premium-deployment-concierge-kit` · NSN: `AF-LUX-8445-DEP` · MIL-STD-COMFY · $299.99
- tagline: *Neck pillow, eye mask, Panera loyalty card.*
- joke angles: deployment as business travel, Panera on base, kit includes sleep mask, cashmere socks, aromatherapy
- cross-branch: Army (your "deployment" was a tent)
- featured: true

**2. Chair Force™ Ergonomic Deployment Chair**
- slug: `chair-force-ergonomic-chair` · NSN: `AF-CHR-7110-ERG` · MIL-STD-SITDOWN · $4,899.00
- tagline: *Built for 8-hour deployments between briefings.*
- joke angles: premium Aeron-tier chair marketed as deployment equipment, "lumbar support for the Warfighter"
- cross-branch: Marines (you stand)

**3. The Qatar Package™**
- slug: `qatar-package` · NSN: `AF-QAT-8990-PKG` · MIL-STD-STARBUCKS · $449.99
- tagline: *Starbucks gift card, hotel toiletries, complimentary robe.*
- joke angles: Al Udeid as a 5-star deployment, Starbucks on base, kit includes slippers, sleep mask, $50 Starbucks card, hotel-grade shampoo
- cross-branch: Army (your Qatar was a shipping container in Kuwait)

**4. Base Housing Carpet Sampler™**
- slug: `base-housing-carpet-sampler` · NSN: `AF-HSG-7220-CRP` · MIL-STD-BEIGE · $89.99
- tagline: *Seventeen tasteful beiges.*
- joke angles: AF base housing is famously nicer than other branches, suburban carpet swatches
- cross-branch: Navy (you live below the waterline)

**5. Flight Suit™ Cashmere Loungewear**
- slug: `flight-suit-cashmere-loungewear` · NSN: `AF-FLT-8415-CSH` · MIL-STD-DRIP · $499.00
- tagline: *Sage green. Hand-wash only.*
- joke angles: flight suit as premium loungewear, cashmere, fitted, "for the officers' club happy hour"
- cross-branch: Marines (your uniform is covered in sand)

**6. PT Test Completion Medal™**
- slug: `pt-test-completion-medal` · NSN: `AF-PT-7720-MDL` · MIL-STD-STROLL · $79.99
- tagline: *For scoring 75% on an 800m walk/jog.*
- joke angles: Air Force PT standards jokes, participation-trophy energy, engraved with your unit
- cross-branch: Army (your PT is actual torture)

**7. Premium MRE™ (AF Variant)**
- slug: `premium-mre-af-variant` · NSN: `AF-MRE-8970-LUX` · MIL-STD-CHIVE · $69.99
- tagline: *Served in ceramic with a $12 craft seltzer.*
- joke angles: AF "field rations" are a sit-down meal, chef-curated MRE, seltzer pairing
- cross-branch: Army (Fort Polk MRE guys will never know)

**8. On-Base Golf Course Keychain**
- slug: `on-base-golf-course-keychain` · NSN: `AF-GLF-7690-KEY` · MIL-STD-BIRDIE · $24.99
- tagline: *Access to all 17 courses on base.*
- joke angles: AF bases are famous for golf courses, keychain grants fictional membership to every AF base course
- cross-branch: Marines (your "course" is a rifle range)

### Marines — 8 products

**1. Premium Culinary Coloring Sticks™** (THE CRAYON PRODUCT)
- slug: `culinary-coloring-sticks` · NSN: `USMC-CRY-8940-12PK` · MIL-STD-OORAH · $34.99
- tagline: *12 edible crayons. Flavors: Sharpie, Diesel, Unflavored.*
- joke angles: the Marines-eat-crayons running joke, artisanal food-grade crayons marketed to Marines, flight includes Sharpie, Diesel, Unflavored, Classic Red, Sidewalk Chalk, Pine-Sol, "Officer's Mess" (all other crayons mixed together)
- cross-branch: all three (they don't get it)
- featured: true

**2. The Jarhead™ Precision Haircut Kit**
- slug: `jarhead-precision-haircut-kit` · NSN: `USMC-HI-8520-TIGHT` · MIL-STD-SCALP · $79.99
- tagline: *One setting. It's "shorter."*
- joke angles: high-and-tight culture, clipper set with only one guard length, "regulation or shorter"
- cross-branch: Air Force (your haircuts are optional)

**3. Oorah™ Vocal Training Audio Course**
- slug: `oorah-vocal-training-course` · NSN: `USMC-VOC-7610-AUD` · MIL-STD-SCREAM · $49.99
- tagline: *40 hours. One syllable.*
- joke angles: full audiobook course teaching proper OORAH technique, diaphragm training, 40 hours of instruction for a single utterance
- cross-branch: Army (their hooah is weak and apologetic)

**4. Regulation Crying Towel**
- slug: `regulation-crying-towel` · NSN: `USMC-WPE-7210-TWL` · MIL-STD-DAMP · $14.99
- tagline: *For when you remember you're still in.*
- joke angles: Marine Corps is famously hard, commemorative towel for dark moments
- cross-branch: Navy (your showers are warm)

**5. Semper Fi™ DIY Tattoo Kit**
- slug: `semper-fi-diy-tattoo-kit` · NSN: `USMC-INK-6515-DIY` · MIL-STD-INK · $89.99
- tagline: *Finally, a tattoo that says what you already screamed.*
- joke angles: Marine tattoo culture, DIY stick-and-poke kit, six pre-designed stencils (EGA, bulldog, Semper Fi, Mom, USMC 0311, anchor that accidentally says USN)
- cross-branch: Air Force (tattoos are career-limiting)

**6. Sand Rations™ (5 lb bag)**
- slug: `sand-rations` · NSN: `USMC-SND-8970-5LB` · MIL-STD-GRIT · $29.99
- tagline: *For when the crayons run out.*
- joke angles: Marines-eat-anything joke, 5lb bag of single-origin Camp Pendleton sand
- cross-branch: Army (their sand is inferior)

**7. Chesty's™ Bulldog Morale Companion**
- slug: `chestys-bulldog-morale-companion` · NSN: `USMC-MCT-7710-BULL` · MIL-STD-WOOF · $44.99
- tagline: *Shake to hear OORAH. Batteries included.*
- joke angles: Chesty Puller / Marine Corps bulldog mascot, motion-activated OORAH plush, wears dress blues
- cross-branch: Navy (your goat smells)

**8. MARPAT™ Throw Pillow Set (set of 4)**
- slug: `marpat-throw-pillow-set` · NSN: `USMC-UPH-8340-4PK` · MIL-STD-PIX · $119.99
- tagline: *Matches your 4 pairs of MARPAT pants.*
- joke angles: Marine-pride home decor, desert + woodland MARPAT pillows, interior design for a barracks room
- cross-branch: Army (UCP didn't camouflage your couch either)

## Technical Scope

### File layout

```
src/sites/squaredaway/
├── config.ts                    # SiteConfig (theme, nav, features.commerce: true, ogImage)
├── index.ts                     # Barrel — exports config, pages, dynamicRoutes
├── data/
│   └── products.ts              # 32-product array + helpers
└── pages/
    ├── home.tsx
    ├── army.tsx
    ├── navy.tsx
    ├── airforce.tsx
    ├── marines.tsx
    ├── product-detail.tsx       # takes slug prop
    ├── morale.tsx
    ├── authorization.tsx
    ├── faq.tsx
    ├── leadership.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx

public/sites/squaredaway/
├── hero.png                     # storefront (also ogImage)
├── logo.png
├── branch-army.png              # 4 branch banners/tiles
├── branch-navy.png
├── branch-airforce.png
├── branch-marines.png
├── leadership-hardcastle.png    # 4 leadership portraits
├── leadership-blackwell.png
├── leadership-lindgren.png
├── leadership-maddox.png
└── product-<slug>.png × 32      # one per product
```

Total new images: 1 hero + 1 logo + 4 branch banners + 4 portraits + 32 product images = **42 PNGs**.

### Data helpers (`data/products.ts`)

```typescript
export const products: Product[]
export function getProductBySlug(slug: string): Product | undefined
export function getProductsByBranch(branch: Branch): Product[]
export function getFeaturedProducts(): Product[]
```

### Registry updates (3 files)

- `src/sites/registry.ts` — import and register `squaredaway`
- `src/sites/subdomains.ts` — add `"squaredaway"` to `VALID_SUBDOMAINS`
- `src/app/sitemap.ts` — import `products` from squaredaway and add `/products/:slug` entries into the `productSites` loop

### New shared components (if needed)

Reuse existing shared components (`Hero`, `ProductCard`, `AddToCartButton`, `FaqAccordion`, `TeamMember`, `Footer`, `Header`). If a product detail page needs a specs-table layout distinct from pigmilk's nutrition-facts pattern, create `src/components/ui/SpecsTable.tsx` as a generic label/value table.

Likely net-new shared components:
- `SpecsTable` — 2-column label/value grid for military-style specs
- `WarningBox` — bordered caution block for absurd warnings
- `NsnHeader` — stylized NSN/contract-code strip for detail pages and cards

### Fonts

- Add `Black Ops One` import to `src/themes/fonts.ts` via `next/font/google`
- Add `.variable` to `fontVariables` array
- Add CSS font-family entry to `fontFamilyMap`
- Reference as `"black-ops-one"` key in `config.ts`

### Theme wiring

- Theme tokens in `config.ts` reference palette above
- Existing `themeToCSS()` pipeline handles injection into `<body>` CSS variables
- No changes to `globals.css` required beyond what the theme pipeline already supports

### Testing

- `npx tsc --noEmit` — typecheck
- `npm run lint` — ESLint
- `npm run build` — production build
- Manual smoke in dev: `/?site=squaredaway` + each branch + 4-5 product detail pages + `/morale` + `/authorization` + `/faq` + `/leadership` + cart flow

### Non-goals

- No backend, no real checkout, no real morale tracking. Matches all other sites.
- No Space Force section — running gag.
- No animations beyond existing shared components provide.
- No user accounts.
- No real DoD branding, seals, or copyrighted material. All faux-official imagery is original.

## Summary

New subdomain site `squaredaway.specificindustries.com` — Squared Away Supply Co. — a deadpan satirical PX selling 32 useless products to Army, Navy, Air Force, and Marines (8 each) with cross-branch heckling baked into every product page. 12 site-specific top-level pages plus 32 product detail pages plus shared cart/checkout. Follows all established new-site patterns: umbrella privacy/terms with satire body, 4-person leadership re-theme, contact page with real email, subdomain allowlist, sitemap dynamic routes, per-site OG image.
