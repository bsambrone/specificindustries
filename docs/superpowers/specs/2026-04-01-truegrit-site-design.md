# True Grit Personal Care — Site Design Spec

**Subdomain:** `truegrit`
**Brand:** True Grit Personal Care
**Tagline:** "Where Comfort Meets Its Match"
**Subtag:** "Non-GMO. Free Range. Definitely Not Tear-Free."
**Humor style:** Straight-faced industrial product copy with increasingly alarming disclaimers buried in fine print. Euphemism-heavy. Absurdity dialed up on Experience and Aftermath pages.

## Theme

| Token | Value |
|-------|-------|
| Primary | `#f96302` (Home Depot orange) |
| Secondary | `#f5f5f0` (light warm grey) |
| Accent | `#ff8c00` (lighter orange) |
| Background | `#ffffff` (white) |
| Text | `#1a1a1a` (near-black) |
| Heading font | Barlow Condensed (new — must be added to `fonts.ts`) |
| Body font | Inter |
| Preset | `"industrial"` (new) |

**Visual direction:** Home Depot / hardware store catalog aesthetic. Light background, dark text, orange accents. Dark hero banner at top of homepage. Product cards with SKU numbers. Department-grid navigation. Buried disclaimers in fine print throughout.

## Pages

| Slug | Page | Notes |
|------|------|-------|
| `""` | Home | Dark hero banner + featured products grid + "Why True Grit?" benefits + testimonials + disclaimers |
| `"products"` | Products | Grid catalog with dynamic routes to product detail |
| `"the-experience"` | The Experience | Image-heavy journey: Preparation > Application > Realization > Acceptance |
| `"the-aftermath"` | The Aftermath | Post-use testimonials, before/after, recovery tips, absurd stats |
| `"behind-the-scenes"` | Behind the Scenes | Factory floor, industrial machinery, smirking workers |
| `"about"` | About / Leadership | Origin story + team portraits in flannel |
| `"cart"` | Cart | Custom brave/liability messaging |
| `"checkout"` | Checkout | Custom health insurance/no refunds messaging |
| `"privacy"` | Privacy Policy | Funny, links to authoritative apex policy |
| `"terms"` | Terms of Use | Funny, links to authoritative apex policy |

**Dynamic routes:** `products/{slug}` for individual product detail pages.

**Commerce:** `features.commerce: true`, localStorage key `truegrit-cart`.

**Navigation:**
| Label | Path |
|-------|------|
| Products | `/products` |
| The Experience | `/the-experience` |
| The Aftermath | `/the-aftermath` |
| Behind the Scenes | `/behind-the-scenes` |
| About | `/about` |

## Products

### Data Structure

```typescript
interface Product {
  slug: string
  name: string
  sku: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  category: "abrasives" | "bidets" | "accessories" | "kits"
  specs: { label: string; value: string }[]
  disclaimers: string[]
}
```

### Catalog

| Product | SKU | Price | Category | Flavor |
|---------|-----|-------|----------|--------|
| The Original 40-Grit | TG-040-STD | $8.99/roll | abrasives | Grit density, tensile strength. "Minor surface irritation indicates proper coverage." |
| 80-Grit Sensitive | TG-080-SEN | $12.99/roll | abrasives | Reduced abrasion coefficient. "Our gentlest option. Relatively speaking." |
| 24-Grit Deep Clean | TG-024-PRO | $6.99/roll | abrasives | Maximum grit density. "For professionals and the exceptionally determined." |
| 40-Grit Hand Towels | TG-040-HT | $14.99/pack | abrasives | Dispenser-compatible. "Extend the True Grit experience to your extremities." |
| The HydroBlast 500 | TG-HB-500 | $199.99 | bidets | 500 PSI output. "Equivalent to a light pressure washer. Mounting hardware included." |
| The AcidJet Bidet 3000 | TG-AJ-3000 | $299.99 | bidets | Battery acid reservoir, chemical-resistant tubing. "Supplemental chemical cleansing for those who demand absolute sterility." |
| Recovery Balm | TG-RB-001 | $24.99/jar | accessories | Aloe, lidocaine, "hope." "Apply liberally. Then apply again." |
| The Starter Kit | TG-SK-001 | $49.99 | kits | One of each grit + balm. "Everything you need to begin your journey. Medical supplies sold separately." |

Each product gets a detail page with image, specs table, disclaimers in fine print, and Add to Cart button.

## Cart & Checkout Messaging

### AddToCartButton Quips (True Grit-specific)

- "Brave choice."
- "Please consult your physician."
- "We admire your courage — and question your judgment."
- "Your health insurance has been notified."
- "No liability implied, expressed, or even considered."
- "Bold. Very bold."
- "We recommend keeping the Recovery Balm nearby."
- "Your bathroom will never be the same."

### Cart Page

- **Empty state:** "Your cart is as smooth as your life is about to not be."
- **Fee:** Abrasion Surcharge ($3.49)
- **Tax:** Industrial Hygiene Tax (4.0%)
- **Disclaimer:** No refunds, no liability, no sympathy

### Checkout Page

- **Headline:** "You're Braver Than Most"
- Copy about verifying health insurance, signing implied liability waiver
- Fake progress bar (shared component, same pattern as other sites)
- **Estimated delivery:** "3-5 business days (recovery time not included)"

## Page Content Detail

### Homepage

1. **Dark hero banner** — background image (sandpaper/industrial texture), "WHERE COMFORT MEETS ITS MATCH" in Barlow Condensed, subtag, CTA to products
2. **Featured products grid** — 3-4 product highlights
3. **"Why True Grit?" section** — benefits: unparalleled cleanliness, discourages excessive bathroom breaks (productivity boost), builds character, unforgettable experience
4. **Testimonials** — concerned-looking customers: "I've never felt so... thorough," "My bathroom breaks are now under 30 seconds. HR is thrilled."
5. **Bottom disclaimer bar** in fine print

### The Experience

Image-heavy page structured as a journey with Bill, Jim, Brandon, Sean in various settings (executive bathroom, home bathroom, portapotty). All four always look concerned.

- **Preparation** — examining the product with trepidation
- **Application** — "initial contact," "the moment of truth"
- **Realization** — the dawning understanding
- **Acceptance** — resigned but clean

Copy uses heavy euphemisms throughout. Absurdity fully dialed up on this page.

### The Aftermath

- **Post-use testimonials** with shell-shocked portraits
- **Before/after framing** — before: naive and smiling, after: concerned but "thoroughly cleansed"
- **Recovery tips** — Step 1: Apply Recovery Balm. Step 2: Reflect on your choices. Step 3: Repeat (because you will).
- **Stats section** — "Average recovery time: 45 minutes," "Customer satisfaction: Complicated," "Repeat purchase rate: Surprisingly high"

### Behind the Scenes

- Factory floor / warehouse imagery — sandblasters, belt sanders, grinding equipment
- Generic warehouse workers (NOT Bill/Jim/Brandon/Sean) smirking knowingly
- "Quality control" section in deadpan industrial language
- "Our state-of-the-art facility" showcasing heavy machinery that has no business being near toilet paper

### About / Leadership

**Origin story:** Bill saw a gap in the market while renovating his bathroom. "What if the thing that cleans surfaces... could clean ALL surfaces?"

**Leadership team:**

| Person | Title | Image Direction |
|--------|-------|-----------------|
| Bill | Founder & Chief Abrasion Officer | Flannel, concerned, professional headshot |
| Jim | VP of Grit Sciences | Flannel, concerned, professional headshot |
| Brandon | Director of Consumer Endurance | Flannel, concerned, professional headshot |
| Sean | Head of Industrial Relations | Flannel, concerned, professional headshot |

Each bio written in straight-faced corporate tone with alarming details buried in credentials.

### Privacy Policy

- Opens with notice linking to authoritative apex privacy policy (same pattern as all sites)
- Industrial/hardware themed humor
- "We store your data with the same care we apply to your personal hygiene: thoroughly and without mercy"

### Terms of Use

- Opens with notice linking to authoritative apex terms (same pattern as all sites)
- Heavy on liability disclaimers played for laughs
- "By using our products you acknowledge that 'comfort' is a relative term"

## Image Generation Plan

All images generated via the image-gen MCP server.

**Key rule:** Every image featuring Bill, Jim, Brandon, or Sean must specify that they look concerned.

| Image | MCP Tool | People | Setting/Notes |
|-------|----------|--------|---------------|
| Hero background | `generate_image` | None | Sandpaper texture, dramatic industrial lighting |
| Product shots x8 | `generate_image` | None | Each product on clean background, hardware store product photography |
| Product in exec bathroom | `generate_image` | None | 40-Grit roll in upscale corporate bathroom |
| Product in home bathroom | `generate_image` | None | Products displayed in nice residential bathroom |
| Product in portapotty | `generate_image` | None | Products inside construction site portapotty |
| Experience: Preparation x2-3 | `generate_image_with_person` | Bill, Jim, Brandon, or Sean | Looking at product with concern, various settings |
| Experience: Application x2-3 | `generate_image_with_person` | Bill, Jim, Brandon, or Sean | Mid-experience, deeply concerned |
| Experience: Realization x2-3 | `generate_image_with_person` | Bill, Jim, Brandon, or Sean | The moment of understanding |
| Experience: Acceptance x2-3 | `generate_image_with_person` | Bill, Jim, Brandon, or Sean | Resigned but "clean" |
| Aftermath portraits x4 | `generate_image_with_person` | All four | Shell-shocked post-use testimonial headshots |
| Behind the Scenes x3-4 | `generate_image` | Generic workers | Factory floor, sandblasters, belt sanders, smirking |
| Leadership portraits x4 | `generate_image_with_person` | Bill, Jim, Brandon, Sean | Flannel, concerned, professional headshots |
| Favicon | `generate_image` | None | Sandpaper-textured toilet paper roll, 1024x1024, will be resized |

**Estimated total: 25-30 images.**

## Architectural Changes

### 1. AddToCartButton Quips Refactor

`src/components/commerce/add-to-cart-button.tsx` currently has a hardcoded `quips` array with site-specific references (e.g., "The pigs thank you").

**Change:** Accept an optional `quips?: string[]` prop. If provided, use the site's quips. If not, fall back to a generic default array. Each site passes its own quips when rendering the component. Existing sites have their quips extracted to site-level data and passed in.

### 2. New Font Registration

Add Barlow Condensed to `src/themes/fonts.ts`:
1. Import from `next/font/google`
2. Add `.variable` to `fontVariables` array
3. Add CSS font-family string to `fontFamilyMap`
4. Reference as `"barlowCondensed"` in truegrit config

### 3. New Site Scaffolding

Standard site addition pattern:
- `src/sites/truegrit/config.ts` — SiteConfig with industrial theme
- `src/sites/truegrit/data/products.ts` — product catalog + `getProductBySlug()`
- `src/sites/truegrit/pages/` — all page components (home, products, product-detail, the-experience, the-aftermath, behind-the-scenes, about, cart, checkout, privacy, terms)
- `src/sites/truegrit/index.ts` — barrel export with `config`, `pages`, `dynamicRoutes`
- Register in `src/sites/registry.ts`
- `public/sites/truegrit/` — favicon and generated images

### 4. No New Shared Components

The existing component library covers all needs: Hero, ProductCard, FeatureSection, TestimonialGrid, FAQAccordion, Timeline, ProcessFlow, etc. Cart/checkout pages are always site-specific components.

### 5. No New App Router Routes

All routing through the existing catch-all `src/app/[[...slug]]/page.tsx`.
