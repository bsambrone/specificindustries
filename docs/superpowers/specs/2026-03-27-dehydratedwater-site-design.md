# Dehydrated Water Co. — New Subdomain Site

## Overview

A new satire subdomain site at `dehydratedwater.specificindustries.com` for the Specific Industries platform. The site sells "dehydrated water" — powdered water packets that require adding water to reconstitute. The tone is deadly serious heritage/artisanal brand, played completely straight despite the absurd product. Think Victorian apothecary meets premium craft beverage company.

This is the second commerce-enabled site on the platform (after pigmilk). It follows the existing site architecture exactly, with one new shared component (`PricingTable`).

## Goals

- Add a fully functional second satire site without modifying any existing infrastructure
- Reuse the proven pigmilk commerce pattern (cart, checkout, product detail pages)
- Introduce one new reusable shared component (`PricingTable`) for tiered subscription pricing
- Maintain the deadpan serious tone throughout — the humor comes from applying heritage brand gravitas to a product that doesn't exist
- Full E2E test coverage matching the pigmilk test pattern

## Brand Identity

### Company Name
**Dehydrated Water Co.**
Tagline: "Purveyors of Fine Powdered Hydration Since 1847"

### Founding Myth
Ezekiel Drywell, a transcendentalist philosopher-farmer, believed water was "burdened by its own wetness" and that its true essence could only be appreciated in powdered form. He founded the company in 1847 as a spiritual mission. The company has been operated by the Drywell family for seven generations.

### Tone
Deadpan serious. The site never winks at the audience. Every product description, testimonial, and FAQ answer is written as if dehydrated water is a legitimate premium product. The humor comes entirely from the contrast between the gravitas of the presentation and the absurdity of the concept.

Fine print disclaimers and footnotes are sprinkled throughout product pages (e.g., "* Not responsible for accidental hydration"). The FAQ page and legal pages lean hardest into the comedy.

### Timeline Milestones (for Our Story page)
The company timeline includes increasingly absurd entries, such as:
- 1847: Founded by Ezekiel Drywell
- 1923: Survived Prohibition (technically not a beverage)
- 2019: Awarded zero Michelin stars
- Other milestones to be written during implementation, maintaining the deadpan heritage tone

## Visual Theme

### Palette: Apothecary Blue
A Victorian-era tonic company aesthetic. Deep ocean blues convey authority, teal accents add elegance, cool light backgrounds keep it clean.

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#1B3A4B` | Headers, nav, dark sections, buttons |
| Secondary | `#E8F0F2` | Light section backgrounds, card borders |
| Accent | `#7BB8CC` | Links, highlights, decorative elements, tier badges |
| Background | `#FAFCFD` | Page background |
| Text | `#1a1a1a` | Body text |

### Typography
- **Heading font**: `"playfair"` (Playfair Display) — already declared in `src/themes/fonts.ts`
- **Body font**: `"inter"` (Inter) — already declared in `src/themes/fonts.ts`
- **Preset name**: `"heritage"`

No new fonts need to be added to the font system.

### Config
```typescript
{
  name: "Dehydrated Water Co.",
  subdomain: "dehydratedwater",
  theme: {
    preset: "heritage",
    colors: {
      primary: "#1B3A4B",
      secondary: "#E8F0F2",
      accent: "#7BB8CC",
      background: "#FAFCFD",
      text: "#1a1a1a",
    },
    fonts: { heading: "playfair", body: "inter" },
  },
  metadata: {
    title: "Dehydrated Water Co. — Purveyors of Fine Powdered Hydration Since 1847",
    description: "Premium artisanal dehydrated water, crafted by hand since 1847. Just add water.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Our Story", path: "/our-story" },
    { label: "The Science", path: "/the-science" },
    { label: "WaaS", path: "/waas" },
    { label: "FAQ", path: "/faq" },
  ],
  features: { commerce: true },
}
```

## File Structure

```
src/sites/dehydratedwater/
├── config.ts              # SiteConfig with Apothecary Blue theme
├── index.ts               # Barrel: config, pages map, dynamicRoutes
├── data/
│   └── products.ts        # 9 products with Science Facts, getProductBySlug()
└── pages/
    ├── home.tsx           # Hero, featured products, testimonials, WaaS CTA
    ├── products.tsx       # Full product grid (all 9 products)
    ├── product-detail.tsx # Dynamic route component (slug prop), Science Facts panel
    ├── our-story.tsx      # Ezekiel Drywell founding myth, absurd timeline, family history
    ├── the-science.tsx    # Pseudo-scientific dehydration process explanation
    ├── waas.tsx           # WaaS subscription page with PricingTable component
    ├── faq.tsx            # Deadpan FAQ comedy page using FaqAccordion
    ├── cart.tsx           # Cart page (reuses commerce components)
    ├── checkout.tsx       # Fake checkout page (under construction)
    ├── privacy.tsx        # Privacy policy with water-themed legal humor
    └── terms.tsx          # Terms of use with water-themed legal humor

public/sites/dehydratedwater/  # Static assets (product images, hero, etc.)

src/components/ui/pricing-table.tsx  # New shared component
```

## Pages

### Home (`/`)
- **Hero**: Dark gradient background (primary → accent). Headline: "Water, Perfected Through Absence." Subheadline about the founding vision. CTA: "Shop the Collection."
- **Featured Products**: Grid of 3 highlighted products (Original, Cloud Mist, Heavy Water)
- **Testimonials**: Deadpan fake testimonials from absurd experts (e.g., "Dr. Helena Moisture, Theoretical Hydrologist")
- **CTA Banner**: Drives to the WaaS subscription page

### Products (`/products`)
- Full grid of all 9 products using the existing `ProductCard` component
- Each card shows image, name, tagline, price, and Add to Cart button

### Product Detail (`/products/[slug]`)
- Dynamic route via `dynamicRoutes` (same pattern as pigmilk)
- Product image, name, full description, price, Add to Cart button
- **Science Facts panel** (replaces pigmilk's Nutritional Facts) — uses chemistry terminology for comedic effect
- **Variant display**: Cloud Mist and Seasonings show variant cards within the page describing each variant
- **WaaS product**: Detail page redirects to `/waas` or prominently links to it, since it has a dedicated subscription page
- Deadpan fine print disclaimers where appropriate

### Our Story (`/our-story`)
- Founding myth of Ezekiel Drywell (1847)
- **Timeline** component with absurd historical milestones
- **Team/Family** section — the Drywell family across generations
- Heritage imagery and Victorian-era language throughout

### The Science (`/the-science`)
- Pseudo-scientific explanation of the "patented dehydration process"
- Fake diagrams or process steps (using `ImageTextSection` or similar)
- Chemistry jargon used almost-correctly (molecular formulas, states of matter, pH references)
- "Peer-reviewed" claims with fake citations

### WaaS — Water-as-a-Service (`/waas`)
- Heritage-voiced subscription page ("Since 1847, our family has crafted dehydrated water by hand. Now, through the modern miracle of subscription billing...")
- **PricingTable component** with three guild-named tiers:

| Tier | Name | Price | Features |
|------|------|-------|----------|
| Basic | Apprentice | $29.99/mo | 1 packet/month, standard dehydration, paper instructions |
| Premium | Journeyman | $49.99/mo | 3 packets/month, premium dehydration, wax-sealed instructions, cloud sync |
| Enterprise | Master Dryer | $99.99/mo | 7 packets/month, artisanal dehydration, hand-calligraphed instructions, cloud sync, heritage wax seal |

- Journeyman tier marked as "Recommended"
- "Select" buttons add the WaaS product to the cart via `addToCart()`
- Footnote: "All plans include complimentary existential contemplation about the nature of water."

### FAQ (`/faq`)
- Standalone deadpan comedy page using the `FaqAccordion` component
- Subtitle: "Your Questions, Our Carefully Evasive Answers"
- Questions include:
  - "Is this real water?"
  - "What happens if I add too much water?"
  - "Can I dehydrate your dehydrated water?"
  - "Is dehydrated water vegan?"
  - "What is your return policy?" (return liquid water in a paper envelope)
  - "Is dehydrated water gluten-free?"
  - "How do I store dehydrated water?"
  - "What if it gets wet?"
  - Additional questions to be written during implementation

### Cart (`/cart`)
- Reuses pigmilk's cart page pattern with commerce components
- Cart items with image, name, price, quantity controls
- Absurd fees in the order summary (themed replacements for pigmilk's "Pig Handling Fee" and "Oink Tax" — e.g., "Desiccation Fee" and "Powder Dispersal Tax")

### Checkout (`/checkout`)
- Fake checkout page (under construction), same pattern as pigmilk
- Themed placeholder messaging (e.g., "Our Artisans Are Hand-Dehydrating Your Order")

### Privacy (`/privacy`)
- Privacy policy page with water-themed legal humor woven throughout

### Terms (`/terms`)
- Terms of use with water-themed legal language, including the shipping/returns policy about returning liquid water in paper envelopes

## Product Catalog

### Data Structure

Follows pigmilk's `products.ts` pattern with one modification: `scienceFacts` replaces `nutritionalFacts`.

```typescript
interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]       // Multiple paragraphs
  image: string               // Path to product image
  scienceFacts: Array<{       // Replaces nutritionalFacts
    label: string
    value: string
  }>
  variants?: Array<{          // For Cloud Mist and Seasonings
    name: string
    description: string
  }>
  isSubscription?: boolean    // True for WaaS product
}

export const products: Product[] = [...]
export function getProductBySlug(slug: string): Product | undefined
```

### Products

#### 1. Original Dehydrated Water
- **Slug**: `original`
- **Price**: $12.99
- **Tagline**: "Just add water."
- **Science Facts**: Molecular Composition (H₂O⁰, patent pending), State of Matter (Theoretical), pH Level (N/A — requires hydration to measure), Shelf Life (Eternal), Specific Gravity (Irrelevant)

#### 2. Single Origin Cloud Mist
- **Slug**: `cloud-mist`
- **Price**: $24.99
- **Tagline**: "Terroir you can taste. Once hydrated."
- **Variants**:
  - The Nor'easter: Aggressive, salty, best served cold
  - Sahara Noon: Extra dry, authentic "dusty throat" feeling
  - Amazonian Downpour: High-humidity powder, requires a special dehumidifier to "unlock"
- **Science Facts**: Origin Coordinates, Atmospheric Pressure at Harvest, Cloud Type, Precipitation Probability (0% — successfully intercepted)

#### 3. Double-Dehydrated "Dryer" Water
- **Slug**: `dryer-water`
- **Price**: $34.99
- **Tagline**: "Negative wetness, guaranteed."
- **Description**: An empty, vacuum-sealed bag. Marketing claims "Negative Wetness" — can actually make a swimming pool drier if tossed in.
- **Science Facts**: Wetness (Negative), Moisture Content (-2%), Vacuum Integrity (Absolute), Recommended Use (Ultra-minimalist hiking)

#### 4. DIY Heavy Water (Deuterium-Lite)
- **Slug**: `heavy-water`
- **Price**: $49.99
- **Tagline**: "For biohackers and amateur nuclear physicists."
- **Description**: A heavier-than-usual packet of the same powder. Instructions warn not to stack more than 50 packets to avoid "critical mass."
- **Science Facts**: Atomic Weight (Elevated), Critical Mass Threshold (50 packets), Regulatory Status (Pending), Geiger Counter Reading (Inconclusive)

#### 5. Dehydrated Ice Cubes
- **Slug**: `ice-cubes`
- **Price**: $9.99
- **Tagline**: "Space-saving hydration, frozen in time."
- **Description**: Individual tiny packets. Add water, freeze for 4 hours. "Space-Saving Design" for people without room for "bulky, traditional water."
- **Science Facts**: Freezing Point (0°C after hydration), Space Saved (97%), Cube Geometry (Theoretical), Freezer Compatibility (Universal)

#### 6. Diet Dehydrated Water (Zero Hydrogen)
- **Slug**: `diet-water`
- **Price**: $18.99
- **Tagline**: "100% Pure, Gaseous Oxygen."
- **Description**: For the health-conscious consumer cutting back on element intake. Hydrogen removed, leaving only gaseous oxygen. Essentially a bag of air.
- **Science Facts**: Hydrogen Content (0 mol), Oxygen State (Gaseous), Caloric Content (Undefined), Breathability (Do not inhale entire bag at once)

#### 7. Instant Water Starter Culture
- **Slug**: `starter-culture`
- **Price**: $39.99
- **Tagline**: "The sourdough starter of hydration."
- **Description**: A small vial of "Seed Water." Add to a gallon of regular water to "convert" it into "Premium Heritage Water" over 48 hours.
- **Science Facts**: Conversion Time (48 hours), Heritage Factor (7th generation), Culture Viability (Perpetual), Feeding Schedule (Weekly, with regular water)

#### 8. WaaS Monthly Subscription
- **Slug**: `waas`
- **Price**: $49.99/mo (display price for Journeyman tier)
- **Tagline**: "Cloud-synced. Heritage-crafted."
- **Description**: Monthly subscription with tiered pricing. Product detail page links to the dedicated `/waas` page.
- **isSubscription**: true
- **Science Facts**: Sync Protocol (Bluetooth 0.1), Uptime Guarantee (Heritage-grade), Delivery Vector (Carrier pigeon, fallback USPS), Lock Mechanism (Non-existent)

#### 9. Gourmet Water Seasoning (H₂O Enhancers)
- **Slug**: `water-seasoning`
- **Price**: $15.99
- **Tagline**: "Add texture, not flavor."
- **Variants**:
  - Viscosity+: Makes water slightly thicker, like drinking thin gravy
  - Crispness: Adds microscopic "static" (sand) for a "sharp" mouthfeel
- **Science Facts**: Flavor Added (None), Texture Delta (Perceptible), Mouthfeel Index (Elevated), FDA Approval (Not sought)

## New Shared Component: PricingTable

### Location
`src/components/ui/pricing-table.tsx`

### Interface
```typescript
interface PricingTier {
  name: string              // "Apprentice", "Journeyman", "Master Dryer"
  price: string             // "$29.99"
  interval: string          // "per month"
  features: Array<{
    text: string
    included: boolean
  }>
  recommended?: boolean     // Highlights the tier with accent border + badge
  ctaLabel?: string         // Button text, defaults to "Select"
}

interface PricingTableProps {
  tiers: PricingTier[]
  onSelect: (tierName: string) => void
  footnote?: string         // Italic text rendered below the table
}
```

### Behavior
- `"use client"` component (needs onClick handler)
- Renders a responsive grid of tier cards (3 columns on desktop, stacked on mobile)
- Uses CSS variable classes (`text-primary`, `bg-secondary`, `border-accent`) so it adapts to any site theme
- Recommended tier gets an accent-colored border and a "Recommended" badge
- `onSelect` callback receives the tier name, allowing the consuming page to wire it to `addToCart()` or any other action
- Non-recommended tiers get outlined buttons; recommended tier gets a filled button

## Integration Points

### Registry
Add `dehydratedwater` to `src/sites/registry.ts`. Import config, pages, and dynamicRoutes from `src/sites/dehydratedwater/index.ts`.

### Apex Landing Page
The apex site (`src/sites/apex/`) already iterates the registry to generate links to all subdomain sites. Adding `dehydratedwater` to the registry causes it to automatically appear on the apex landing page. No changes to the apex site code are needed.

### Commerce
The site sets `features.commerce: true`, so the root layout automatically wraps it with `CartProvider`. The existing `CartButton`, `AddToCartButton`, and `ToastContainer` components work as-is.

**Cart isolation fix (required):** The current `CartProvider` hardcodes `const STORAGE_KEY = "pigmilk-cart"`. This must be changed to accept a per-site storage key so that each commerce-enabled site gets its own isolated cart in localStorage. The approach: add an optional `storageKey` prop to `CartProvider`, and have the root layout pass the subdomain-derived key (e.g., `"dehydratedwater-cart"`). This is a small, backward-compatible change — pigmilk continues to work by passing `"pigmilk-cart"`.

### Local Development
Works via `?site=dehydratedwater` query parameter, same as pigmilk:
- `localhost:3000/?site=dehydratedwater` — homepage
- `localhost:3000/products?site=dehydratedwater` — products page
- `localhost:3000/products/original?site=dehydratedwater` — product detail

All internal links use the `useSiteLink()` hook to preserve the `?site=` param during local development.

### Dynamic Routes
The barrel export includes `dynamicRoutes` for product detail pages:
```typescript
export const dynamicRoutes = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: product.name, description: product.tagline }
        : { title: "Product Not Found" }
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

## Infrastructure Changes

Minimal. The middleware, catch-all route, and root layout logic remain untouched. Changes outside of `src/sites/dehydratedwater/`:

1. One new entry in `src/sites/registry.ts`
2. One new shared component: `src/components/ui/pricing-table.tsx`
3. Static assets in `public/sites/dehydratedwater/`
4. **`CartProvider` modification**: Add a `storageKey` prop (defaulting to the current `"pigmilk-cart"` for backward compatibility). The root layout passes `"<subdomain>-cart"` derived from the site config. This isolates cart state per site in localStorage.

## Static Assets

Product images and hero images will be placed in `public/sites/dehydratedwater/`. A favicon should also be included at `public/sites/dehydratedwater/favicon.png`.

Since these are joke products that don't physically exist, product images will need to be sourced or generated. This is an implementation detail to be resolved during the build phase.

## E2E Tests

Following the pigmilk test pattern, three Playwright test files:

### `e2e/dehydratedwater-pages.spec.ts`
- All 11 pages load correctly with `?site=dehydratedwater`
- Header nav links navigate to correct pages
- Footer links present
- Cart icon visible (commerce enabled)
- Invalid product slug returns 404
- WaaS page renders pricing table with 3 tiers
- FAQ page renders accordion items
- Product detail pages show Science Facts panel
- Product detail pages with variants display variant cards

### `e2e/dehydratedwater-cart.spec.ts`
- Add to cart from product detail page
- Add to cart from product grid
- Add multiple products
- Cart page shows items with correct prices
- Cart persists after page reload
- Remove item from cart
- Quantity controls work
- WaaS tier selection adds to cart
- Proceed to checkout navigates to checkout page

### `e2e/dehydratedwater-screenshots.spec.ts`
- Visual regression snapshots for all major pages (desktop and mobile)
- Matches the pigmilk screenshot test pattern

## Out of Scope

- Real payment processing (checkout is fake, same as pigmilk)
- Server-side cart state or database
- Product image generation/sourcing (deferred to implementation)
- Real Bluetooth or cloud sync functionality for WaaS (obviously)
- Changes to any existing site (pigmilk pages/content, apex pages/content) — the only existing-code change is the CartProvider storageKey prop
