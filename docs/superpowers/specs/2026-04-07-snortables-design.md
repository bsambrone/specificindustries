# Snortables — Intranasal Nutrient Delivery Site Design

**Date:** 2026-04-07  
**Subdomain:** `snortables`  
**Type:** Commerce-enabled satirical site  
**Tone:** Clinical tech-bro meets infomercial energy — sleek biohacker branding that occasionally can't contain its excitement

---

## Site Config & Theme

- **Subdomain:** `snortables`
- **Name:** Snortables
- **Tagline:** "Intranasal nutrient delivery for the modern human. Why eat when you can insufflate?"
- **Features:** `{ commerce: true }`

### Theme

| Token | Value | Notes |
|-------|-------|-------|
| Background | `#0a0a0f` | Near-black with slight blue |
| Text | `#e8e8ec` | Soft white |
| Primary | `#00e5a0` | Electric green — "science" color |
| Secondary | `#0ea5e9` | Bright cyan — tech accent |
| Accent | `#f59e0b` | Amber/gold — infomercial energy pops |
| Heading font | `space-grotesk` | Techy, geometric |
| Body font | `inter` | Clean, readable |

### Navigation

- Products
- The Process
- Testimonials
- About
- Contact

---

## Product Catalog (12 products)

Each product has: slug, name, price, priceLabel, tagline, description (multi-paragraph array), image, scienceFacts array. Product images are sleek matte-black packaging with neon accents on dark backgrounds.

| # | Slug | Name | Price | Tagline |
|---|------|------|-------|---------|
| 1 | `nasalfuel-original` | NasalFuel Original | $29.99/mo | "Complete nutrition. Zero chewing." |
| 2 | `the-full-bird` | The Full Bird | $44.99 | "Lyophilized avian protein substrate for rapid intranasal uptake." |
| 3 | `sunday-roast` | Sunday Roast | $49.99 | "An entire roast beef dinner, pulverized for your convenience." |
| 4 | `hydrosnort` | HydroSnort | $14.99 | "Like getting water up your nose at the pool, but optimized." |
| 5 | `greenrush` | GreenRush | $34.99 | "Your daily vegetables, bypassing the digestive middleman." |
| 6 | `morningrail` | MorningRail | $24.99 | "Why wait for absorption through your primitive stomach?" |
| 7 | `jolt` | JOLT | $39.99 | "Definitely not derived from coca leaves. We cannot stress this enough." |
| 8 | `brotein` | BroTein | $34.99 | "Skip the shake. Skip the stomach. Skip leg day too, we're not your mom." |
| 9 | `tiny-nostrils` | Tiny Nostrils | $19.99 | "Children's vitamins. Now with less asbestos than our competitors!" |
| 10 | `creme-brulee-blast` | Crème Brûlée Blast | $27.99 | "Dessert for your sinuses. Pairs with a 2019 Bordeaux, also available in snortable form." |
| 11 | `the-sampler` | The Sampler Pack | $59.99 | "12 varieties + a complimentary Precision Delivery Apparatus." |
| 12 | `nasalfuel-prime` | NasalFuel Prime | $79.99/mo | "Monthly auto-delivery with escalating dosage recommendations." |

### Product Detail Page Structure

- Hero image of the product
- Multi-paragraph description mixing clinical jargon with absurdity
- "Science Facts" table (parodying nutritional facts — e.g., "Particle Size: 0.3 microns", "Nostril Compatibility: Universal", "Asbestos Content: Negligible")
- Add to cart button with comedic quips on add
- Related products section

`NasalFuel Original` and `NasalFuel Prime` use `isSubscription: true`.

---

## Pages

### Home

Sections in order:

1. **Hero** — Dark background with neon aesthetic. Headline: "Why Eat When You Can Insufflate?" Subheadline: "Clinically optimized intranasal nutrient delivery for the modern human." Two CTAs: "Shop Products" and "See The Science." Hero image of sleek product lineup.

2. **Social Proof Bar** — Animated metric counters: "2.4M Nostrils Served" / "99.7% Nostril Satisfaction" / "0 FDA Investigations (This Quarter)" / "4.3 Micron Avg Particle Size"

3. **How It Works** — 3-step simplified version: "1. Choose Your Powder" → "2. Prepare Your Line" → "3. Insufflate & Thrive." Links to full Process page.

4. **Featured Products** — Grid of 4-6 highlighted products with ProductCard components. Add to cart enabled.

5. **The Science Section** — Pseudo-scientific explanation with jargon. "Our patented NasalAbsorb™ technology leverages the nasal mucosa's 150cm² surface area for 340% faster nutrient uptake than primitive oral consumption."

6. **Testimonials** — 6 testimonials (see Testimonials section below). "See All Testimonials" link to dedicated page.

7. **CTA Banner** — "Ready to Stop Chewing?" with subscription pitch for NasalFuel Prime.

### Products

Full catalog grid of all 12 products using ProductCard components. Add to cart enabled on each card.

### Product Detail (Dynamic Route)

Dynamic route at `/products/[slug]`. Uses `dynamicRoutes` pattern with `isValidSlug` and `getMetadata`. Component receives `slug` prop, looks up product from data file. Structure described in Product Detail Page Structure above.

### The Process

Hero: "From Farm to Nostril™" — "Our vertically integrated pulverization pipeline ensures every particle meets our exacting standards."

Six steps, each with a generated image featuring one of the base image people (bill, brandon, jim, sean). Alternating image left/right using ImageTextSection-style layout.

1. **Sourcing** — Sean in lab coat and safety goggles, inspecting a perfectly plated roast beef dinner at a fine dining restaurant. Taking notes on a clipboard. Waitstaff looking concerned.
   > "Our procurement specialists identify only the finest prepared meals for destruction. Each dish is evaluated on flavor, presentation, and pulverizability."

2. **Acquisition** — Jim hauling armfuls of Thanksgiving turkeys out of a grocery store, beaming with joy. Shopping carts overflowing.
   > "Every ingredient is hand-selected and immediately condemned to the NasalMill™. We do not accept returns. The turkeys have been claimed."

3. **Pulverization** — Bill feeding a complete Sunday roast — gravy boat and all — into an industrial wood chipper. Grinning ear to ear. Powder cloud everywhere.
   > "Our proprietary NasalMill™ technology reduces any meal to 0.3 micron particles in under 4 seconds. The gravy boat is optional but we include it for texture."

4. **Quality Control** — Brandon in a full hazmat suit, carefully examining a line of powder on a stainless steel lab table with scientific instruments around him.
   > "Every batch undergoes rigorous intranasal bioavailability testing. Our quality team personally tests each product. They insist on it. We've tried to get them to stop."

5. **Packaging** — Sean in a clean room suit, portioning powder into sleek matte-black packets. A comically oversized rubber stamp reading "DEFINITELY NOT SUSPICIOUS" on the workstation.
   > "Each dose is precision-measured to 0.01g for optimal nostril delivery. Our packaging is discreet, professional, and absolutely does not warrant the attention it receives from postal inspectors."

6. **Shipping** — Jim loading unmarked matte-black boxes into a van at night, giving a thumbs up. The van has "Snortables — Intranasal Nutrient Solutions" on the side in tiny font.
   > "Discreet delivery within 2-3 business days. We ship at night because our drivers prefer it, not because of any legal requirement to do so."

### Testimonials

Dedicated page with all 16 testimonials. Each has a quote, name, fake title, and small generated portrait image.

**Testimonials 1-6** (also shown on homepage):

1. "I used to waste 45 minutes a day CHEWING. Now I snort my meals in seconds and use that time to optimize my LinkedIn presence."
   — *Marcus Chen, Growth Hacker & Biohacker*

2. "As a competitive eater, Snortables let me consume 40% more calories per hour by freeing up my mouth for the actual competition."
   — *Chad Gullet, Nathan's Hot Dog Contest Runner-Up*

3. "I snorted the Sunday Roast at my wedding reception. My wife left me but my macros were IMMACULATE."
   — *Derek Pullman, Divorced But Optimized*

4. "My doctor said 'please stop doing this.' But my OTHER doctor — the one I found on Reddit — said it's fine."
   — *Tamara Voss, Wellness Influencer*

5. "I replaced all solid food with Snortables six months ago. I've lost 30 pounds and the ability to taste, but my quarterly review was phenomenal."
   — *Jason Kile, Senior VP of Nothing Specific*

6. "Gave Tiny Nostrils to my kids. They haven't complained once. They also haven't spoken to me in weeks but I'm sure that's unrelated."
   — *Brenda Faulk, Mother of the Year (Self-Awarded)*

**Testimonials 7-16** (full page only):

7. "I brought JOLT to my corporate retreat. HR wants to 'have a conversation' but my presentation was 3 hours of pure fire."
   — *Ryan Ashford, Suspended Account Executive*

8. "Finally, a product that understands the nasal cavity is the most underutilized organ in the human body."
   — *Dr. Patricia Hollowell, Unlicensed Nutritionist*

9. "I snorted HydroSnort instead of drinking water for a month. The ER doctors called it 'unprecedented' which I'm choosing to take as a compliment."
   — *Kyle Brandt, Hydration Pioneer*

10. "MorningRail replaced my coffee, my alarm clock, and my will to engage in normal human breakfast rituals."
    — *Simone Archer, 4am Productivity Blogger*

11. "The Crème Brûlée Blast made me cry. Not from emotion — from the caramelized sugar particles. But also from emotion."
    — *François Delacroix, Pastry Chef (Retired Under Duress)*

12. "My gym banned me for snorting BroTein in the locker room. I now work out in my garage and I've never been more powerful."
    — *Tony Mazetti, Garage Gym Evangelist*

13. "I'm a food critic and I've never been more conflicted. The Full Bird has incredible terroir but the delivery mechanism concerns me professionally."
    — *Eleanor Whittaker, Michelin-Adjacent Reviewer*

14. "Snortables saved my marriage. We used to argue about what's for dinner. Now we just argue about my 'powder hobby.'"
    — *Greg & Diane Hofstra, Couples Therapy Regulars*

15. "I've been using GreenRush for 6 months. My sinuses are green now. Like, literally green. But I feel INCREDIBLE."
    — *Asher Bloom, Organic Lifestyle Advocate*

16. "I tried to explain Snortables to my grandmother. She called the police. Five stars."
    — *Nina Cabrera, Early Adopter*

### About

1. **Hero** — "Disrupting Nutrition, One Nostril at a Time" / "Founded in 2023 by people who looked at a perfectly good meal and thought: what if we destroyed this and snorted it?"

2. **Origin Story** — The founding myth: a group of biohackers realized they were wasting precious seconds moving their jaws. They asked the question no one was brave enough to ask — "what if we bypassed the entire mouth?" After 18 months in a garage (and two restraining orders from the FDA), Snortables was born.

3. **Mission Statement** — "To liberate humanity from the tyranny of chewing." Oral consumption is an evolutionary dead end; Snortables represents the next leap in human nutrition.

4. **Leadership Team** — Four executives with generated portraits:

| Base Image | Name | Title | Quote |
|-----------|------|-------|-------|
| bill | Dr. Garrett Phelps | Chief Insufflation Officer | "Every great innovation was called 'unsafe' and 'please stop' at first." |
| brandon | Marcus Whitfield | VP of Nostril Engineering | "The human nose has 400 olfactory receptors. We're only using 12 of them for food. That's a market inefficiency." |
| jim | Darren Kowalski | Head of Pulverization Sciences | "People ask me if I feel bad about putting a Thanksgiving dinner in a wood chipper. I do not." |
| sean | Trevor Nakamura | Director of Regulatory Avoidance | "We prefer the term 'creatively compliant.'" |

Each gets a 2-3 sentence bio and the quote in a styled blockquote.

5. **Timeline** — Company milestones:
   - 2023: "Founded in a garage. Asked to leave the garage."
   - 2023: "First successful turkey pulverization."
   - 2024: "Launched NasalFuel Original. Received first cease-and-desist."
   - 2024: "Expanded to 12 products. Received seventh cease-and-desist."
   - 2025: "2.4M nostrils served. Legal team expanded to 14 people."
   - 2026: "Introduced NasalFuel Prime. CEO described by Forbes as 'alarmingly confident.'"

### Contact

- Hero: "Get In Touch (Not With The Powder — With Us)"
- Two-column: form (name, email, reason dropdown, message) + contact details
- Contact email: `help@snortables.specificindustries.com`
- `bsambrone@gmail.com` in small print
- Inquiry reasons: "Product question", "Bulk order (no questions asked)", "Adverse nasal event", "Legal inquiry (please specify jurisdiction)", "I snorted something that wasn't Snortables and need guidance", "Partnership opportunity", "Noise complaint about our pulverization facility"
- FAQ accordion: "Is this legal?", "Can I snort two products at once?", "Why does my mail carrier look at me like that?"
- Generated image of a call center staffed by people in hazmat suits

### Cart

- Standard cart pattern with item list, quantity controls, remove buttons
- Subtotal, "Nostril Preparation Fee" (site-specific fee), tax, total
- Empty cart state: "Your nostrils are tragically empty."

### Checkout

- Fake checkout with FakeProgressBar component
- Under construction messaging with on-brand satirical copy

### Privacy

- Links to authoritative policy at specificindustries.com/privacy
- Satirical sections:
  - "What We Collect" — "Your nostril dimensions for product optimization"
  - "What We Don't Collect" — "Judgment. We are in no position."
  - "Data Sharing" — "We share your data with our partners, which currently include our lawyer and a guy named Dave who runs our shipping van"
  - "Cookies" — "We considered snortable cookies but the focus group was... unsettling"
- Last updated: "Whenever our legal team stops crying"

### Terms

- Links to authoritative policy at specificindustries.com/terms
- Satirical sections:
  - "Acceptable Use" — "Snortables are for nasal use only. We are not responsible for 'creative applications' described in your TikTok"
  - "Liability" — "By purchasing Snortables you acknowledge that you are voluntarily snorting a powdered meal and that this is, objectively, a strange thing to do"
  - "Refund Policy" — "All sales are final. You cannot un-snort a turkey."
- Last updated: "After the incident"

---

## Image Inventory (~42 images)

All generated using the MCP image-gen tools. Images stored in `public/sites/snortables/`.

### Hero & General (2)
- `hero.png` — Sleek product lineup, neon green/cyan lighting, matte-black packets on reflective surface. (1536x1024)
- `favicon.png` — Stylized nostril or powder icon in electric green

### Product Images (12)
One per product. Sleek matte-black packaging with neon accents, dark background. Product name visible on packet. (1024x1024 each)
- `product-nasalfuel-original.png`
- `product-the-full-bird.png`
- `product-sunday-roast.png`
- `product-hydrosnort.png`
- `product-greenrush.png`
- `product-morningrail.png`
- `product-jolt.png`
- `product-brotein.png`
- `product-tiny-nostrils.png`
- `product-creme-brulee-blast.png`
- `product-the-sampler.png`
- `product-nasalfuel-prime.png`

### Process Images (6) — with base image people
All 1536x1024. Use `generate_image_with_person` MCP tool.
- `process-sourcing.png` — Sean, lab coat, inspecting plated dinner at restaurant
- `process-acquisition.png` — Jim, hauling turkeys from grocery store
- `process-pulverization.png` — Bill, feeding roast into wood chipper, powder cloud
- `process-quality.png` — Brandon, hazmat suit, examining powder on lab table
- `process-packaging.png` — Sean, clean room, portioning powder, "DEFINITELY NOT SUSPICIOUS" stamp
- `process-shipping.png` — Jim, loading black boxes into van at night, thumbs up

### Leadership Portraits (4) — with base image people
All 1024x1024. Use `generate_image_with_person` MCP tool.
- `exec-phelps.png` — Bill as Dr. Garrett Phelps, corporate headshot, dark background
- `exec-whitfield.png` — Brandon as Marcus Whitfield
- `exec-kowalski.png` — Jim as Darren Kowalski
- `exec-nakamura.png` — Sean as Trevor Nakamura

### Testimonial Portraits (16)
All 1024x1024. Use `generate_image` MCP tool (no base image people — unique fictional characters).
- `testimonial-marcus-chen.png`
- `testimonial-chad-gullet.png`
- `testimonial-derek-pullman.png`
- `testimonial-tamara-voss.png`
- `testimonial-jason-kile.png`
- `testimonial-brenda-faulk.png`
- `testimonial-ryan-ashford.png`
- `testimonial-patricia-hollowell.png`
- `testimonial-kyle-brandt.png`
- `testimonial-simone-archer.png`
- `testimonial-francois-delacroix.png`
- `testimonial-tony-mazetti.png`
- `testimonial-eleanor-whittaker.png`
- `testimonial-greg-diane-hofstra.png`
- `testimonial-asher-bloom.png`
- `testimonial-nina-cabrera.png`

### Contact & Checkout (2)
- `contact.png` — Call center staffed by people in hazmat suits (1536x1024)
- `checkout-construction.png` — Under construction scene, on-brand (1024x1024)

---

## Technical Implementation

Follows all existing conventions from CLAUDE.md:

- **Site structure:** `src/sites/snortables/` with `config.ts`, `index.ts`, `pages/`, `data/`
- **Registry:** Add to `src/sites/registry.ts` and `src/sites/subdomains.ts`
- **Routing:** All pages through catch-all `[[...slug]]`, dynamic route for product detail
- **Commerce:** `features.commerce: true` enables CartProvider, CartButton, AddToCartButton, Toast
- **Cart storage key:** `snortables-cart`
- **Components:** Use shared components from `src/components/ui/` and `src/components/commerce/`
- **Static assets:** `public/sites/snortables/`
- **Links:** Use `getSiteHref()` (server) and `useSiteLink()` (client) for all internal links

### File Structure

```
src/sites/snortables/
├── config.ts                # SiteConfig with theme, nav, metadata, features
├── index.ts                 # Barrel: exports config, pages, dynamicRoutes
├── data/
│   ├── products.ts          # Product catalog + getProductBySlug, getRelatedProducts
│   ├── leadership.ts        # 4 executives with base image references
│   └── testimonials.ts      # 16 testimonials with quotes, names, titles, images
└── pages/
    ├── home.tsx             # Homepage with all sections
    ├── products.tsx         # Product catalog grid
    ├── product-detail.tsx   # Dynamic route component (receives slug prop)
    ├── process.tsx          # The Process — 6-step "How It's Made"
    ├── testimonials.tsx     # Full testimonials page (16 entries)
    ├── about.tsx            # Origin story, mission, leadership, timeline
    ├── contact.tsx          # Contact form + details + FAQ
    ├── cart.tsx             # Shopping cart (client component)
    ├── checkout.tsx         # Fake checkout with progress bar
    ├── privacy.tsx          # Satirical privacy policy
    └── terms.tsx            # Satirical terms of service
```

### Pages Map

```typescript
export const pages: Record<string, PageEntry> = {
  "": { component: HomePage, metadata: homeMeta },
  "products": { component: ProductsPage, metadata: productsMeta },
  "process": { component: ProcessPage, metadata: processMeta },
  "testimonials": { component: TestimonialsPage, metadata: testimonialsMeta },
  "about": { component: AboutPage, metadata: aboutMeta },
  "contact": { component: ContactPage, metadata: contactMeta },
  "cart": { component: CartPage, metadata: cartMeta },
  "checkout": { component: CheckoutPage, metadata: checkoutMeta },
  "privacy": { component: PrivacyPage, metadata: privacyMeta },
  "terms": { component: TermsPage, metadata: termsMeta },
}

export const dynamicRoutes = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => ({ ... }),
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```
