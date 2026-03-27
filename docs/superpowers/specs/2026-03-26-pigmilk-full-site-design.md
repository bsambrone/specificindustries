# Pig Milk Co. — Full Satire Website Design

## Overview

Expand the existing pigmilk subdomain site from a 3-page placeholder into a full satirical e-commerce website. The site mimics a real premium dairy brand with self-aware absurdist humor — it knows pig milk is ridiculous and leans into it. Includes a fake cart/checkout flow, 10 products, team profiles, farm tour, volunteer page, and contact page.

## Goals

- Create a convincing satirical e-commerce site that's funny to browse
- 8 static pages + 10 dynamic product detail pages, all with rich content and AI-generated imagery
- Fake but functional cart experience (add items, view cart, joke checkout)
- Self-aware absurdist tone throughout all copy
- Build reusable shared components that benefit future subdomain sites
- Images referenced by path — pages render with or without images present

## Tone

Self-aware absurdist. The site acknowledges the ridiculousness of pig milk and barrels forward anyway. Not deadpan (the site winks at you), not slapstick (it's still structured like a real brand). Example: "Is pig milk real? Legally, we cannot answer this question."

## Pages

### Home (`/`)

**Note:** This is a complete rewrite of the existing homepage, not an extension. The existing "Why Pig Milk?" FeatureSection is replaced by a Featured Products grid.

Sections in order:
1. **Hero** — Full-width hero image (`hero.png`), headline "Farm-Fresh Pig Milk", subheadline "Straight from the pig to your glass. Nature's most specific beverage.", CTA button "Shop Now" → `/products`
2. **Featured Products** — Grid of 4 ProductCard components showing: Classic, Chocolate, Pig Milk Cheese, The Whole Hog Bundle. Each card has image, name, price, tagline, "Add to Cart" button.
3. **As Seen On** — Horizontal row of fake press logos (`press-logos.png`) with text "As featured in publications we made up"
4. **Testimonials** — Existing TestimonialGrid component with expanded testimonials (6 total)
5. **Lifestyle Section** — Full-width image (`lifestyle.png`) with overlaid text: "Pig Milk: It's Not Just a Beverage. It's a Lifestyle Choice You'll Have to Explain to Everyone."
6. **CTA Banner** — "Ready to Try Pig Milk?" → `/products`

### Products (`/products`)

1. **Hero** — Headline "Our Products", subheadline "Responsibly sourced. Questionably consumed."
2. **Product Grid** — All 10 products displayed as ProductCard components in a responsive grid. Each card links to `/products/[slug]` and has an "Add to Cart" button.

### Product Detail (`/products/[slug]`)

Each of the 10 products gets a detail page with:
1. **Product image** — Large hero image for the product
2. **Product info** — Name, price, tagline, 2-3 paragraphs of absurdist marketing copy
3. **Fake Nutritional Facts** — Styled like a real FDA nutrition label but with entries like "Courage: 140%", "Existential Doubt: 3g", "Pig Energy: 100% DV", "Regret: 0g (results may vary)"
4. **Add to Cart button** — With quantity selector
5. **Related Products** — Row of 3 other ProductCards

Product detail pages are rendered by the catch-all route. The pigmilk pages map handles `products/[slug]` by checking if the path starts with `products/` and has a second segment, then rendering a shared ProductDetail component that receives the slug and looks up product data from a products data file.

### About (`/about`)

1. **Hero** — Headline "Our Story", subheadline "How one farmer's mistake became the world's most specific dairy product."
2. **Origin Story** — Image (`timeline-origin.png`) + 3 paragraphs about founder Earl Hogsworth who accidentally milked a pig in 2019. "Was it good? No. Did that stop us? Also no."
3. **Company Timeline** — Vertical Timeline component:
   - 2019: "Earl milks his first pig. Accidentally."
   - 2020: "Earl milks his second pig. On purpose this time."
   - 2021: "First customer! (It was Earl's mom.)"
   - 2022: "Received cease and desist from Big Dairy. Framed it."
   - 2023: "Opened our state-of-the-art facility (a slightly larger barn)."
   - 2024: "Launched online store. Crashed immediately. One visitor."
   - 2025: "Named 'Most Specific Dairy Company' by no one."
4. **Meet the Team** — Grid of 4 TeamMember cards:
   - Earl Hogsworth, Founder & Chief Pig Milking Officer (`team-earl.png`)
   - Dr. Sandra Truffleton, VP of Pig Relations (`team-sandra.png`)
   - Chad Bristle, Head of Marketing & Pig Whispering (`team-chad.png`)
   - Beatrice Snoutwell, Quality Assurance (Taster) (`team-beatrice.png`)
   - Each card has name, title, headshot, and a one-liner bio

### Behind the Scenes (`/behind-the-scenes`)

1. **Hero** — Headline "Behind the Scenes", subheadline "A rare look inside the world's most specific dairy operation."
2. **The Milking Process** — 4 alternating ImageTextSection rows:
   - "Selection" (`bts-approach.png`) — Choosing the right pig. "Not every pig is ready. We look for confidence, a steady gaze, and a willingness to participate. Most pigs do not have these qualities."
   - "The Approach" — Gaining trust. "This can take anywhere from 10 minutes to 3 weeks. Kevin once took 4 months."
   - "Extraction" (`bts-milking.png`) — The milking itself. "Our proprietary technique is gentle, respectful, and yields approximately one tablespoon per session."
   - "Bottling" (`bts-bottling.png`) — "Straight from pig to bottle in our state-of-the-art facility. We use the word 'state-of-the-art' loosely."
3. **Our Facility** — Full-width image (`bts-facility.png`) with descriptive text: "Our 12,000 sq ft facility features climate-controlled pig suites, a tasting room, and a meditation garden (for the pigs, not you)."
   - Row of fake certification badges: "ISO 9001 Pig Certified", "USDA Pirganic", "Non-GMO (the pigs eat whatever they want)"
4. **Meet the Pigs** — Grid of 4 PigProfile cards:
   - **Duchess** (`pig-duchess.png`) — "Our top producer. 3-time Employee of the Month. Refuses to make eye contact." Stats: Milk Output: High, Temperament: Regal, Favorite Snack: Your respect
   - **Kevin** (`pig-kevin.png`) — "Kevin is trying his best. His milk is... fine." Stats: Milk Output: Low, Temperament: Anxious, Favorite Snack: Anything on the ground
   - **Barbara** (`pig-barbara.png`) — "Retired. Now serves in an advisory capacity (sleeps in the sun)." Stats: Milk Output: N/A, Temperament: Unbothered, Favorite Snack: Peace and quiet
   - **Sir Oinks-a-Lot** (`pig-sir-oinks.png`) — "The source of our Rabid Froth Pint. We love him from a safe distance." Stats: Milk Output: Unpredictable, Temperament: Chaotic, Favorite Snack: Classified

### Volunteer/Careers (`/volunteer`)

1. **Hero** — Headline "Join the Pig Milk Movement", subheadline "We're changing the world. Slowly. One pig at a time."
2. **Impact Stats** — Row of 4 StatCounter components: "12 pigs milked", "3 satisfied customers", "1 barn", "0 investors (they keep saying no)"
3. **Hero image** (`volunteer-hero.png`)
4. **Open Positions** — 5 JobListing cards:
   - **Pig Whisperer** (Pig Relations) — "Must be fluent in oink. ASL certification a plus but not required."
   - **Milk Quality Inspector** (Quality Assurance) — "You will taste pig milk. Daily. This is non-negotiable."
   - **Social Media Intern** (Marketing) — "Unpaid. But you get all the pig milk you can drink. Most applicants withdraw at this point."
   - **Emotional Support Human** (Pig Wellness) — "The pigs get stressed. You sit with them. That's the whole job."
   - **Barn Engineer** (Facilities) — "Our barn has a door that doesn't close. Fix it. We've been trying for 3 years."
5. **Perks Section** — FeatureSection with perks:
   - "Unlimited pig milk on tap"
   - "Flexible hours (the pigs set the schedule)"
   - "Health insurance (pending)"
   - "A company t-shirt (it smells a little)"
   - "Free parking (it's a field)"
6. **Culture image** (`volunteer-culture.png`)
7. **Application Form** (client component):
   - Fields: Name, Email, Position (dropdown of the 5 listings), "Why do you want to work with pigs?" (textarea), "On a scale of 1-10, how do you feel about pig milk?" (HTML range input with `min=8 max=10 step=1`, visually labeled 8-10)
   - Submit shows confirmation: "Application received! We'll be in touch. (We probably won't.)"

### Contact (`/contact`)

1. **Hero** — Headline "Get in Touch", subheadline "We're here to help. Mostly."
2. **Two-column layout:**
   - **Left: Contact Form** (client component):
     - Name, Email
     - "Reason for Inquiry" dropdown: "Pig milk emergency", "Bulk orders (100+ gallons)", "I have questions about my pig", "Legal threats", "Marriage proposal (for Earl)", "Other (we're scared to ask)"
     - Message textarea
     - Submit shows: "Message sent! Our team will respond within 3-5 business pigs."
   - **Right: Contact Details + image** (`contact-office.png`):
     - Address: 742 Sow Lane, Hogtown, WI 53719
     - Phone: 1-800-PIG-MILK ("Please hold. The hold music is just oinking.")
     - Email: help@pigmilk.specificindustries.com
     - Hours: "Monday-Friday, Dawn to Whenever the Pigs Get Tired"
     - Emergency Pig Milk Hotline: "Available 24/7. We have never received a call."
3. **FAQ Accordion** — 5 items:
   - "Is pig milk real?" — "Legally, we cannot answer this question."
   - "Is it safe to drink?" — "Our lawyers have asked us to say 'consult your physician.' Our pigs have asked us to say 'absolutely.'"
   - "Do you ship internationally?" — "We tried once. It did not go well. We don't talk about Belgium."
   - "Can I visit the farm?" — "No. The pigs value their privacy."
   - "Are you hiring?" — "Always. Nobody stays long."

### Cart (`/cart`)

1. **Headline** — "Your Cart"
2. **Cart items** — List of line items, each showing: product image thumbnail, name, unit price, quantity selector (+/- buttons), line total, remove button
3. **Order summary:**
   - Subtotal
   - Pig Handling Fee: $2.99
   - Oink Tax (3.7%)
   - **Order Total**
4. **"Proceed to Checkout"** button → `/checkout`
5. **Empty state** — "Your cart is as empty as a pig that's just been milked." with "Start Shopping" link

### Checkout (`/checkout`)

1. **Hero image** (`checkout-construction.png`)
2. **Headline** — "Our Pigs Are Working As Fast As They Can"
3. **Subtext** — "Unfortunately, due to unprecedented demand (someone actually tried to buy pig milk), our checkout system is permanently under construction."
4. **FakeProgressBar** — Animated progress bar that starts at 0%, creeps to ~73%, then resets. Never completes.
5. **Estimated delivery** — "When pigs fly (estimated Q4 2087)"
6. **"Return to Shopping"** button → `/products` (does NOT clear cart — user keeps their items)

## Product Catalog

All product data lives in a single data file (`src/sites/pigmilk/data/products.ts`). Each product has:

```ts
interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string        // e.g., "$12.99 / gallon"
  tagline: string
  description: string[]     // 2-3 paragraphs of marketing copy
  image: string             // path in public/sites/pigmilk/
  nutritionalFacts: Array<{ label: string; value: string }>
}
```

### Products:

| # | Product | Slug | Price | Image |
|---|---------|------|-------|-------|
| 1 | Classic Pig Milk | `classic-pig-milk` | $12.99/gal | `product-classic.png` |
| 2 | Chocolate Pig Milk | `chocolate-pig-milk` | $14.99/gal | `product-chocolate.png` |
| 3 | Strawberry Pig Milk | `strawberry-pig-milk` | $14.99/gal | `product-strawberry.png` |
| 4 | Pig Milk Cheese | `pig-milk-cheese` | $24.99/wheel | `product-cheese.png` |
| 5 | Pig Milk Yogurt | `pig-milk-yogurt` | $8.99/tub | `product-yogurt.png` |
| 6 | Pig Milk Ice Cream | `pig-milk-ice-cream` | $11.99/pint | `product-ice-cream.png` |
| 7 | Pig Milk Protein Powder | `pig-milk-protein` | $39.99/bag | `product-protein.png` |
| 8 | Industrial Drum (55 gal) | `industrial-drum` | $449.99 | `product-drum.png` |
| 9 | Rabid Froth Pint | `rabid-froth` | $6.66/pint | `product-rabid-froth.png` |
| 10 | The Whole Hog Bundle | `whole-hog-bundle` | $89.99 | `product-bundle.png` |

## Cart System

### CartProvider (React Context + localStorage)

A `"use client"` context provider wrapping pigmilk pages. Provides:

- `cart: CartItem[]` — array of `{ slug, quantity }`
- `addToCart(slug, quantity?)` — adds item, defaults to qty 1
- `removeFromCart(slug)` — removes item
- `updateQuantity(slug, quantity)` — sets quantity, removes if 0
- `clearCart()` — empties cart
- `cartCount` — total item count (for badge)
- `cartTotal` — calculated subtotal from product prices

State is synced to `localStorage` under key `pigmilk-cart` so it survives page refreshes.

### Cart Integration Points

- **Header** — CartButton component shows cart icon with item count badge. Links to `/cart`.
- **ProductCard** — "Add to Cart" button triggers `addToCart(slug)` and shows a Toast notification (e.g., "Classic Pig Milk added to cart. Bold choice.")
- **Product Detail** — "Add to Cart" with quantity selector
- **Cart page** — Full cart management UI
- **Checkout page** — Joke landing, clears cart on "Return to Shopping"

### Client Component Boundary

The CartProvider wraps both the Header and page content in `layout.tsx`, conditionally when the site has `features.commerce: true`. This is required so the Header's CartButton badge and the page's AddToCartButton share the same cart context. A server component can render a client component — `layout.tsx` remains an async server component that renders `<CartProvider>` as a child:

```tsx
// In layout.tsx, after resolving site config:
const content = (
  <>
    {site && <Header config={site.config} />}
    <main>{children}</main>
    {site && <Footer config={site.config} />}
  </>
)

return (
  <html lang="en" className={fontVariables}>
    <body className="min-h-screen bg-background text-foreground font-body" style={themeStyle}>
      {site?.config.features.commerce ? <CartProvider>{content}</CartProvider> : content}
    </body>
  </html>
)
```

The CartProvider also manages toast state so any component can trigger a toast via context. Toast display duration: 3 seconds, auto-dismiss, stacks up to 3, renders bottom-center as a portal.

## New Shared Components

All new components live in `src/components/` and are reusable across sites.

### UI Components (`src/components/ui/`)

| Component | Props | Description |
|-----------|-------|-------------|
| `ProductCard` | `image, name, price, tagline, slug, onAddToCart?` | Product tile with image, info, and optional Add to Cart button |
| `Timeline` | `items: Array<{ year: string, description: string }>` | Vertical timeline with year markers |
| `TeamMember` | `image, name, title, bio` | Headshot card with name, title, one-liner |
| `ImageTextSection` | `image, title, description, imagePosition: "left" \| "right"` | Alternating image/text row |
| `PigProfile` | `image, name, bio, stats: Array<{ label, value }>` | Pig portrait card with personality stats |
| `JobListing` | `title, department, description, onApply?` | Job posting card with apply button |
| `StatCounter` | `value: string, label: string` | Large number with caption |
| `FaqAccordion` | `items: Array<{ question, answer }>` | Expandable Q&A pairs (`"use client"` — needs toggle state) |
| `Toast` | `message, visible, onClose` | Brief popup notification (`"use client"` — managed by CartProvider) |
| `FakeProgressBar` | (no props) | Animated bar that never reaches 100% (`"use client"` — needs animation state) |

### Commerce Components (`src/components/commerce/`)

| Component | Props | Description |
|-----------|-------|-------------|
| `CartProvider` | `children` | React Context provider for cart state + localStorage |
| `CartButton` | (reads from context) | Header cart icon with item count badge |
| `AddToCartButton` | `slug, productName` | Button that adds item and shows toast |

## Navigation Update

The pigmilk `config.ts` nav array updates to:

```ts
nav: [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Behind the Scenes", path: "/behind-the-scenes" },
  { label: "Volunteer", path: "/volunteer" },
  { label: "Contact", path: "/contact" },
]
```

Cart link is handled separately by the CartButton component in the header (not part of the nav array) since it needs client-side state for the item count badge.

## Header Update

The shared Header component needs to support an optional cart button. When a site has `features.commerce: true`, the header renders a CartButton next to the nav links. This keeps the Header reusable — non-commerce sites are unaffected.

## Bug Fix: foreground/text CSS Variable Mismatch

Pre-existing bug: `themeToCSS()` in `src/themes/index.ts` emits `--color-text`, but `globals.css` declares `--color-foreground` and all components use `text-foreground`. The foreground color is currently unset. Fix by adding `"--color-foreground": theme.colors.text` to `themeToCSS()` output. This ensures `text-foreground`, `text-foreground/70`, etc. all resolve correctly.

## Hero Component Image Support

The existing `Hero` component has no `image` prop. Extend it with an optional `image?: string` prop. When provided, the hero renders the image as a full-width background. When omitted, behavior is unchanged (solid `bg-secondary/30` background). This is backward-compatible with all existing hero usages.

## Mobile Navigation

The header currently renders nav links inline. With 7 items (6 nav + cart), this overflows on mobile. Add a hamburger menu: on screens below `md` breakpoint, nav links collapse into a slide-out or dropdown menu. The CartButton remains visible at all screen sizes. This requires making the Header a client component (for toggle state) or extracting a `MobileNav` client component used within the server-rendered Header.

## Images

30 images total. Generation prompts saved to `docs/pigmilk-image-prompts.md`. All output to `public/sites/pigmilk/`. Pages reference images by path (e.g., `/sites/pigmilk/hero.png`). Pages render gracefully if images don't exist yet — use Next.js `<Image>` with appropriate fallback sizing.

## Product Detail Route Handling

The existing catch-all route maps flat slugs to page components. Product detail pages introduce a pattern where `products/classic-pig-milk` needs to resolve to a ProductDetail component with the product slug passed as context.

Approach: In the pigmilk pages map, register a special handler for the `products/*` pattern. The barrel `index.ts` registers pages like:

```ts
export const pages: Record<string, PageEntry> = {
  "": PigMilkHome,
  "products": { component: PigMilkProducts, metadata: productsMetadata },
  "about": { component: PigMilkAbout, metadata: aboutMetadata },
  "behind-the-scenes": { component: PigMilkBehindTheScenes, metadata: btsMetadata },
  "volunteer": { component: PigMilkVolunteer, metadata: volunteerMetadata },
  "contact": { component: PigMilkContact, metadata: contactMetadata },
  "cart": PigMilkCart,
  "checkout": PigMilkCheckout,
}
```

For product detail pages (`products/classic-pig-milk`), the catch-all route first checks for an exact match in the pages map. If not found, it checks if the path starts with `products/` and the site has a `productDetailComponent` export, then renders that component with the product slug. This requires a small extension to the `SiteModule` type:

```ts
export interface SiteModule {
  config: SiteConfig
  pages: Record<string, PageEntry>
  // Optional: for sites with dynamic sub-routes like /products/[slug]
  dynamicRoutes?: Record<string, {
    component: React.ComponentType<{ slug: string }>
    getMetadata?: (slug: string) => PageMetadata | undefined
    isValidSlug?: (slug: string) => boolean
  }>
}
```

The pigmilk barrel exports:
```ts
export const dynamicRoutes = {
  "products": {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product ? { title: `${product.name} — Pig Milk Co.`, description: product.tagline } : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

The catch-all route update:
```ts
// After checking pages map and before calling notFound()
if (!pageEntry) {
  const segments = path.split("/")
  if (segments.length === 2 && site.dynamicRoutes?.[segments[0]]) {
    const route = site.dynamicRoutes[segments[0]]
    const slug = segments[1]
    if (route.isValidSlug && !route.isValidSlug(slug)) {
      notFound()
    }
    const DynamicComponent = route.component
    return <DynamicComponent slug={slug} />
  }
}
```

The `generateMetadata` function gets a parallel update to check `dynamicRoutes` for metadata when the pages map has no match.

The product data file exports a `getProductBySlug(slug): Product | undefined` helper for both the detail component and the metadata/validation functions.

## Config Update

The pigmilk `config.ts` sets `features.commerce: true` to enable the cart button in the header.

## Out of Scope

- Real payment processing
- User accounts or authentication
- Database or server-side state
- Email sending from contact/application forms
- Analytics
- MCP server for image generation (separate project)
