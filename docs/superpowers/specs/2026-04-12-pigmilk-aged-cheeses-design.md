# Pigmilk Aged Cheeses — Design

## Goal

Add two new products to the pigmilk catalog: a 10-year aged parmesan equivalent ("Aged Parmigia-Oink") and a 3-year aged cheddar ("3-Year Aged Cheddar Hog"). Generate matching product images.

## Scope

Two new entries appended to `src/sites/pigmilk/data/products.ts`, plus two new PNG images in `public/sites/pigmilk/`. No other files change — the `/products` grid and `/products/[slug]` detail route already render everything from the `products` array.

## Products

### 1. Aged Parmigia-Oink (10-year)

- **slug:** `aged-parmigia-oink`
- **name:** `Aged Parmigia-Oink`
- **price:** `189.99`
- **priceLabel:** `$189.99 / wheel`
- **tagline:** `Aged a decade. We waited. You'll wait too.`
- **image:** `/sites/pigmilk/product-parmigia-oink.png`
- **description voice:** Absurdly premium. Hard, crystalline, shatters like granite. Aged ten years in the same barn room that ages the 6-month cheese — "we just left one in there longer and prayed." Reference that Earl was genuinely afraid of it. Pair with "regret" and "the passage of time."
- **nutritionalFacts (6):** `Aged: 10 years`, `Crystals: Audible`, `Pig Energy: Concentrated by time`, `Flavor Profile: Biblical`, `Pairs With: A decade of patience`, `Awards: Still pending`.

### 2. 3-Year Aged Cheddar Hog

- **slug:** `aged-cheddar-hog`
- **name:** `3-Year Aged Cheddar Hog`
- **price:** `49.99`
- **priceLabel:** `$49.99 / block`
- **tagline:** `Sharp. Crumbly. Slightly accusatory.`
- **image:** `/sites/pigmilk/product-cheddar-hog.png`
- **description voice:** Sharp enough to startle. Crumbly, tangy, vaguely orange — "a color that pig milk should not be capable of producing, and yet." Reference the pigs being mildly offended by the color. Pair with apples, crackers, and "unfinished conversations."
- **nutritionalFacts (6):** `Aged: 3 years`, `Sharpness: Confrontational`, `Pig Energy: 100% DV`, `Color: Unexplained orange`, `Pairs With: Apples, regret`, `Crumble Factor: High`.

## Images

Two 1024x1536 PNGs generated via `mcp__image-gen__generate_image`, matching the existing `product-cheese.png` aesthetic — warm product photography on an off-white parchment background with subtle pigmilk-pink accents, hand-crafted label, single hero subject centered.

- **Parmigia-Oink:** A massive hard cheese wheel, golden-amber rind, visibly crystalline cross-section cracked open to show crystals, aged parchment label with "PIGMILK PARMIGIA-OINK · AGED 10 YEARS · BARN ROOM 2" and a pig-hoof stamp.
- **Cheddar Hog:** A rectangular block of sharp aged cheddar, deep orange, slightly crumbly edges, paired with a small wedge broken off. Hand-stamped label "PIGMILK CHEDDAR HOG · 3 YEARS SHARP" with the pig-hoof logo.

## Non-goals

- No changes to `/products` page, detail template, or navigation.
- No testimonials updates (pigmilk testimonials live on the homepage as a flat list, not per product).
- No new components.
