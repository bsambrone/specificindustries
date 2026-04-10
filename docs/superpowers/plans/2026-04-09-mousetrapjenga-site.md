# Mousetrap Jenga Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new satirical commerce-enabled site `mousetrapjenga` (a retro-80s toy brand selling "Mousetrap Jenga" game editions that escalate to bear traps), plus migrate snortables' testimonial portraits into a shared cross-site pool.

**Architecture:** Next.js 15 App Router site under `src/sites/mousetrapjenga/`, registered in the subdomain routing catch-all. Reuses existing shared components (`Hero`, `FeatureSection`, `ProductCard`, `Timeline`, `TeamMember`, `FaqAccordion`, commerce). Three new site-local components for the infomercial-era aesthetic. Cross-cutting change: move 16 snortables testimonial PNGs to `public/shared/testimonials/` and add a catalog module at `src/data/testimonial-portraits.ts`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, OpenAI gpt-image-1 / gpt-image-1 via the existing snortables image script pattern.

**Reference spec:** `docs/superpowers/specs/2026-04-09-mousetrapjenga-site-design.md`

**No unit test framework exists in this repo.** Verification is `npx tsc --noEmit`, `npm run lint`, and `npm run build`. Page-level verification is visual smoke via `npm run dev` + `?site=mousetrapjenga`. Each task ends with a type-check + commit.

---

## File Map

### New files

```
docs/superpowers/plans/2026-04-09-mousetrapjenga-site.md       # this file
src/data/testimonial-portraits.ts                               # shared portrait catalog
src/sites/mousetrapjenga/config.ts                              # site config
src/sites/mousetrapjenga/index.ts                               # barrel (exports config, pages, dynamicRoutes)
src/sites/mousetrapjenga/data/products.ts                       # 8 SKUs
src/sites/mousetrapjenga/data/leadership.ts                     # 4 inventors
src/sites/mousetrapjenga/data/testimonials.ts                   # 8 testimonials
src/sites/mousetrapjenga/components/Starburst.tsx               # SVG starburst badge
src/sites/mousetrapjenga/components/InfomercialBand.tsx         # full-bleed section wrapper
src/sites/mousetrapjenga/components/TradingCard.tsx             # Hall of Fame card
src/sites/mousetrapjenga/pages/home.tsx                         # 7-band infomercial sequence
src/sites/mousetrapjenga/pages/products.tsx                     # tiered grid + accessories
src/sites/mousetrapjenga/pages/product-detail.tsx               # dynamic route component
src/sites/mousetrapjenga/pages/how-to-play.tsx                  # signature page A
src/sites/mousetrapjenga/pages/hall-of-fame.tsx                 # signature page C
src/sites/mousetrapjenga/pages/about.tsx                        # origin + timeline + team
src/sites/mousetrapjenga/pages/testimonials.tsx                 # 8-card grid
src/sites/mousetrapjenga/pages/contact.tsx                      # CALL NOW styling
src/sites/mousetrapjenga/pages/cart.tsx                         # reuses commerce
src/sites/mousetrapjenga/pages/checkout.tsx                     # reuses commerce
src/sites/mousetrapjenga/pages/privacy.tsx                      # defers to umbrella
src/sites/mousetrapjenga/pages/terms.tsx                        # defers to umbrella
scripts/generate-mousetrapjenga-images.ts                       # all 24 image generations
public/shared/testimonials/*.png                                # 16 files moved from snortables
public/sites/mousetrapjenga/*.png                               # 24 generated files
```

### Modified files

```
src/themes/fonts.ts                                             # add Bowlby One SC
src/sites/registry.ts                                           # add mousetrapjenga
src/sites/snortables/data/testimonials.ts                       # migrate to shared portrait pool
```

---

## Task 1: Shared testimonial portrait pool — migrate snortables

**Why first:** This is the cross-cutting platform change. Doing it before mousetrapjenga means the new site can rely on the shared pool from the start, and we verify snortables still works before piling more changes on top.

**Files:**
- Create: `public/shared/testimonials/*.png` (16 files via `git mv`)
- Create: `src/data/testimonial-portraits.ts`
- Modify: `src/sites/snortables/data/testimonials.ts`

- [ ] **Step 1: Move the 16 snortables testimonial PNGs with `git mv`**

From the repo root, run this command exactly (rename drops the `testimonial-` prefix):

```bash
mkdir -p public/shared/testimonials && \
for slug in marcus-chen chad-gullet derek-pullman tamara-voss jason-kile brenda-faulk ryan-ashford patricia-hollowell nina-cabrera simone-archer francois-delacroix tony-mazetti eleanor-whittaker greg-diane-hofstra asher-bloom kyle-brandt; do
  git mv "public/sites/snortables/testimonial-${slug}.png" "public/shared/testimonials/${slug}.png"
done
```

- [ ] **Step 2: Verify all 16 files moved**

Run: `ls public/shared/testimonials/ | wc -l`
Expected output: `16`

Run: `ls public/sites/snortables/testimonial-*.png 2>&1 | head -2`
Expected output: `ls: cannot access 'public/sites/snortables/testimonial-*.png': No such file or directory`

- [ ] **Step 3: Create the shared portrait catalog**

Create `src/data/testimonial-portraits.ts` with this exact content:

```typescript
export interface TestimonialPortrait {
  slug: string
  name: string
  image: string
}

export const testimonialPortraits: TestimonialPortrait[] = [
  { slug: "marcus-chen",        name: "Marcus Chen",              image: "/shared/testimonials/marcus-chen.png" },
  { slug: "chad-gullet",        name: "Chad Gullet",              image: "/shared/testimonials/chad-gullet.png" },
  { slug: "derek-pullman",      name: "Derek Pullman",            image: "/shared/testimonials/derek-pullman.png" },
  { slug: "tamara-voss",        name: "Tamara Voss",              image: "/shared/testimonials/tamara-voss.png" },
  { slug: "jason-kile",         name: "Jason Kile",               image: "/shared/testimonials/jason-kile.png" },
  { slug: "brenda-faulk",       name: "Brenda Faulk",             image: "/shared/testimonials/brenda-faulk.png" },
  { slug: "ryan-ashford",       name: "Ryan Ashford",             image: "/shared/testimonials/ryan-ashford.png" },
  { slug: "patricia-hollowell", name: "Dr. Patricia Hollowell",   image: "/shared/testimonials/patricia-hollowell.png" },
  { slug: "nina-cabrera",       name: "Nina Cabrera",             image: "/shared/testimonials/nina-cabrera.png" },
  { slug: "simone-archer",      name: "Simone Archer",            image: "/shared/testimonials/simone-archer.png" },
  { slug: "francois-delacroix", name: "François Delacroix",       image: "/shared/testimonials/francois-delacroix.png" },
  { slug: "tony-mazetti",       name: "Tony Mazetti",             image: "/shared/testimonials/tony-mazetti.png" },
  { slug: "eleanor-whittaker",  name: "Eleanor Whittaker",        image: "/shared/testimonials/eleanor-whittaker.png" },
  { slug: "greg-diane-hofstra", name: "Greg & Diane Hofstra",     image: "/shared/testimonials/greg-diane-hofstra.png" },
  { slug: "asher-bloom",        name: "Asher Bloom",              image: "/shared/testimonials/asher-bloom.png" },
  { slug: "kyle-brandt",        name: "Kyle Brandt",              image: "/shared/testimonials/kyle-brandt.png" },
]

export function getPortrait(slug: string): TestimonialPortrait | undefined {
  return testimonialPortraits.find((p) => p.slug === slug)
}
```

- [ ] **Step 4: Migrate `src/sites/snortables/data/testimonials.ts` to use the catalog**

Read the existing file first so you can preserve every quote and title exactly. The existing file has 16 entries, each with `quote`, `name`, `title`, and `image`. You will replace the literal `image` paths with a `withPortrait` helper that picks from the shared catalog.

Rewrite the file with this exact structure (keeping ALL original quotes and titles — they are given verbatim below):

```typescript
import { getPortrait } from "@/data/testimonial-portraits"

export interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
}

function withPortrait(slug: string, quote: string, title: string): Testimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image }
}

export const testimonials: Testimonial[] = [
  withPortrait(
    "marcus-chen",
    "I used to waste 45 minutes a day CHEWING. Now I snort my meals in seconds and use that time to optimize my LinkedIn presence.",
    "Growth Hacker & Biohacker",
  ),
  withPortrait(
    "chad-gullet",
    "As a competitive eater, Snortables let me consume 40% more calories per hour by freeing up my mouth for the actual competition.",
    "Nathan's Hot Dog Contest Runner-Up",
  ),
  withPortrait(
    "derek-pullman",
    "I snorted the Sunday Roast at my wedding reception. My wife left me but my macros were IMMACULATE.",
    "Divorced But Optimized",
  ),
  withPortrait(
    "tamara-voss",
    "My doctor said 'please stop doing this.' But my OTHER doctor — the one I found on Reddit — said it's fine.",
    "Wellness Influencer",
  ),
  withPortrait(
    "jason-kile",
    "I replaced all solid food with Snortables six months ago. I've lost 30 pounds and the ability to taste, but my quarterly review was phenomenal.",
    "Senior VP of Nothing Specific",
  ),
  withPortrait(
    "brenda-faulk",
    "Gave Tiny Nostrils to my kids. They haven't complained once. They also haven't spoken to me in weeks but I'm sure that's unrelated.",
    "Mother of the Year (Self-Awarded)",
  ),
  withPortrait(
    "ryan-ashford",
    "I brought JOLT to my corporate retreat. HR wants to 'have a conversation' but my presentation was 3 hours of pure fire.",
    "Suspended Account Executive",
  ),
  withPortrait(
    "patricia-hollowell",
    "Finally, a product that understands the nasal cavity is the most underutilized organ in the human body.",
    "Unlicensed Nutritionist",
  ),
  withPortrait(
    "nina-cabrera",
    "I tried to explain Snortables to my grandmother. She called the police. Five stars.",
    "Early Adopter",
  ),
  withPortrait(
    "simone-archer",
    "MorningRail replaced my coffee, my alarm clock, and my will to engage in normal human breakfast rituals.",
    "4am Productivity Blogger",
  ),
  withPortrait(
    "francois-delacroix",
    "The Crème Brûlée Blast made me cry. Not from emotion — from the caramelized sugar particles. But also from emotion.",
    "Pastry Chef (Retired Under Duress)",
  ),
  withPortrait(
    "tony-mazetti",
    "My gym banned me for snorting BroTein in the locker room. I now work out in my garage and I've never been more powerful.",
    "Garage Gym Evangelist",
  ),
  withPortrait(
    "eleanor-whittaker",
    "I'm a food critic and I've never been more conflicted. The Full Bird has incredible terroir but the delivery mechanism concerns me professionally.",
    "Michelin-Adjacent Reviewer",
  ),
  withPortrait(
    "greg-diane-hofstra",
    "Snortables saved my marriage. We used to argue about what's for dinner. Now we just argue about my 'powder hobby.'",
    "Couples Therapy Regulars",
  ),
  withPortrait(
    "asher-bloom",
    "I've been using GreenRush for 6 months. My sinuses are green now. Like, literally green. But I feel INCREDIBLE.",
    "Organic Lifestyle Advocate",
  ),
  withPortrait(
    "kyle-brandt",
    "I snorted HydroSnort instead of drinking water for a month. The ER doctors called it 'unprecedented' which I'm choosing to take as a compliment.",
    "Hydration Pioneer",
  ),
]

/** First 6 testimonials shown on homepage */
export const homepageTestimonials = testimonials.slice(0, 6)
```

- [ ] **Step 5: Type-check and build**

Run: `npx tsc --noEmit`
Expected: no errors

Run: `npm run build`
Expected: build succeeds. Confirm snortables output contains no references to `/sites/snortables/testimonial-*.png`.

- [ ] **Step 6: Commit**

```bash
git add public/shared/testimonials public/sites/snortables src/data/testimonial-portraits.ts src/sites/snortables/data/testimonials.ts
git commit -m "refactor: centralize testimonial portraits into shared pool

Move 16 testimonial PNGs from public/sites/snortables/ to
public/shared/testimonials/ and introduce src/data/testimonial-portraits.ts
as a cross-site catalog. Migrate snortables' testimonials.ts to a
withPortrait helper that pulls name+image from the shared pool; quotes
and titles stay site-specific. Future sites can reuse the same pool so
the same fictional customer can appear across multiple brands."
```

---

## Task 2: Add Bowlby One SC font

**Files:**
- Modify: `src/themes/fonts.ts`

- [ ] **Step 1: Add Bowlby One SC to the fonts module**

Edit `src/themes/fonts.ts`. Add `Bowlby_One_SC` to the `next/font/google` import, add an instance export, and register it in both `fontInstanceMap` and `fontFamilyMap`.

The final file should look like this:

```typescript
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed, Fraunces, Nunito, Bowlby_One_SC } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
})

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
})

export const bowlbyOneSC = Bowlby_One_SC({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bowlby-one-sc",
})

// Map font config keys → their next/font instance
const fontInstanceMap: Record<string, { variable: string }> = {
  inter,
  playfair: playfairDisplay,
  "space-grotesk": spaceGrotesk,
  poppins,
  "barlow-condensed": barlowCondensed,
  fraunces,
  nunito,
  "bowlby-one-sc": bowlbyOneSC,
}

// Returns only the CSS variable classes needed for a given site's fonts
export function getFontVariables(fonts: { heading: string; body: string }): string {
  const needed = new Set([fonts.heading, fonts.body])
  return Array.from(needed)
    .map((key) => fontInstanceMap[key]?.variable)
    .filter(Boolean)
    .join(" ")
}

// Map of font keys used in site configs → CSS font-family values
export const fontFamilyMap: Record<string, string> = {
  inter: "'Inter', sans-serif",
  playfair: "'Playfair Display', serif",
  "space-grotesk": "'Space Grotesk', sans-serif",
  poppins: "'Poppins', sans-serif",
  "barlow-condensed": "'Barlow Condensed', sans-serif",
  fraunces: "'Fraunces', serif",
  nunito: "'Nunito', sans-serif",
  "bowlby-one-sc": "'Bowlby One SC', sans-serif",
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/themes/fonts.ts
git commit -m "feat(themes): register Bowlby One SC font

Adds Bowlby One SC (Cooper Black-like chunky display face) to the
fonts module. Used by the upcoming mousetrapjenga site for its 80s
toy-box-art headlines."
```

---

## Task 3: Scaffold mousetrapjenga site with placeholder pages and registry entry

**Why placeholder pages first:** The barrel file has to export every page the config references, and the site has to be registered before anything else can run `npm run build` successfully. This task gets the skeleton building and routable; later tasks fill each page with real content.

**Files:**
- Create: `src/sites/mousetrapjenga/config.ts`
- Create: `src/sites/mousetrapjenga/index.ts`
- Create: `src/sites/mousetrapjenga/pages/home.tsx` (placeholder)
- Create: `src/sites/mousetrapjenga/pages/products.tsx` (placeholder)
- Create: `src/sites/mousetrapjenga/pages/product-detail.tsx` (placeholder)
- Create: `src/sites/mousetrapjenga/pages/how-to-play.tsx` (placeholder)
- Create: `src/sites/mousetrapjenga/pages/hall-of-fame.tsx` (placeholder)
- Create: `src/sites/mousetrapjenga/pages/about.tsx` (placeholder)
- Create: `src/sites/mousetrapjenga/pages/testimonials.tsx` (placeholder)
- Create: `src/sites/mousetrapjenga/pages/contact.tsx` (placeholder)
- Create: `src/sites/mousetrapjenga/pages/cart.tsx` (reuses commerce)
- Create: `src/sites/mousetrapjenga/pages/checkout.tsx` (reuses commerce)
- Create: `src/sites/mousetrapjenga/pages/privacy.tsx` (placeholder)
- Create: `src/sites/mousetrapjenga/pages/terms.tsx` (placeholder)
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create `src/sites/mousetrapjenga/config.ts`**

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Mousetrap Jenga",
  subdomain: "mousetrapjenga",
  theme: {
    preset: "light",
    colors: {
      primary: "#D4281F",      // Cherry red
      secondary: "#FFD23F",    // Sunburst yellow
      accent: "#2BB9B9",       // Turquoise
      background: "#FFF6E8",   // Cream newsprint
      text: "#1A1F4C",         // Deep ink navy
    },
    fonts: {
      heading: "bowlby-one-sc",
      body: "poppins",
    },
  },
  metadata: {
    title: "Mousetrap Jenga — The American Family Game Classic",
    description: "The best way to lose a finger since 1978! Now available in Mouse Trap, Rat Trap, Bear Trap, and Industrial Leg-Hold editions.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "How to Play", path: "/how-to-play" },
    { label: "Hall of Fame", path: "/hall-of-fame" },
    { label: "About", path: "/about" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create placeholder page components**

Each page placeholder is a minimal React component that identifies itself. Create all 12 pages with this template (substitute the component name and title for each):

**`src/sites/mousetrapjenga/pages/home.tsx`**:
```tsx
export default function MousetrapJengaHome() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">Mousetrap Jenga — Home (placeholder)</h1>
    </div>
  )
}
```

**`src/sites/mousetrapjenga/pages/products.tsx`**:
```tsx
export const metadata = {
  title: "Products — Mousetrap Jenga",
  description: "The complete lineup of Mousetrap Jenga editions and accessories.",
}

export default function MousetrapJengaProducts() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">Products (placeholder)</h1>
    </div>
  )
}
```

**`src/sites/mousetrapjenga/pages/product-detail.tsx`**:
```tsx
export default function MousetrapJengaProductDetail({ slug }: { slug: string }) {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">Product: {slug} (placeholder)</h1>
    </div>
  )
}
```

**`src/sites/mousetrapjenga/pages/how-to-play.tsx`**:
```tsx
export const metadata = {
  title: "How to Play — Mousetrap Jenga",
  description: "Learn to play Mousetrap Jenga in just 4 easy steps!",
}

export default function MousetrapJengaHowToPlay() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">How to Play (placeholder)</h1>
    </div>
  )
}
```

**`src/sites/mousetrapjenga/pages/hall-of-fame.tsx`**:
```tsx
export const metadata = {
  title: "Hall of Fame — Mousetrap Jenga",
  description: "The legends of the Mousetrap Jenga circuit.",
}

export default function MousetrapJengaHallOfFame() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">Hall of Fame (placeholder)</h1>
    </div>
  )
}
```

**`src/sites/mousetrapjenga/pages/about.tsx`**:
```tsx
export const metadata = {
  title: "About — Mousetrap Jenga",
  description: "America's favorite backyard inventors since 1978.",
}

export default function MousetrapJengaAbout() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">About (placeholder)</h1>
    </div>
  )
}
```

**`src/sites/mousetrapjenga/pages/testimonials.tsx`**:
```tsx
export const metadata = {
  title: "Testimonials — Mousetrap Jenga",
  description: "America says: YES PLEASE!",
}

export default function MousetrapJengaTestimonials() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">Testimonials (placeholder)</h1>
    </div>
  )
}
```

**`src/sites/mousetrapjenga/pages/contact.tsx`**:
```tsx
export const metadata = {
  title: "Contact — Mousetrap Jenga",
  description: "Call now — operators are standing by!",
}

export default function MousetrapJengaContact() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">Contact (placeholder)</h1>
    </div>
  )
}
```

**`src/sites/mousetrapjenga/pages/cart.tsx`** (reuses existing commerce CartPage component; check `src/sites/snortables/pages/cart.tsx` for the exact pattern and copy it, substituting the site name and any theme-specific text):
```tsx
import { CartPageContents } from "@/components/commerce/cart-page-contents"

export default function MousetrapJengaCart() {
  return <CartPageContents brandName="Mousetrap Jenga" />
}
```

If that component name/path doesn't match, match whatever snortables' cart.tsx does verbatim — the goal is parity with snortables' cart integration.

**`src/sites/mousetrapjenga/pages/checkout.tsx`** (same approach — match snortables' checkout.tsx pattern):
```tsx
import { CheckoutPageContents } from "@/components/commerce/checkout-page-contents"

export default function MousetrapJengaCheckout() {
  return <CheckoutPageContents brandName="Mousetrap Jenga" />
}
```

If the actual exported component/prop names differ, match snortables' checkout.tsx verbatim.

**`src/sites/mousetrapjenga/pages/privacy.tsx`**:
```tsx
export const metadata = {
  title: "Privacy Policy — Mousetrap Jenga",
  description: "Our privacy policy. It's a family thing.",
}

export default function MousetrapJengaPrivacy() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">Privacy (placeholder)</h1>
    </div>
  )
}
```

**`src/sites/mousetrapjenga/pages/terms.tsx`**:
```tsx
export const metadata = {
  title: "Terms of Use — Mousetrap Jenga",
  description: "By playing Mousetrap Jenga, you agree to these terms.",
}

export default function MousetrapJengaTerms() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading text-primary">Terms (placeholder)</h1>
    </div>
  )
}
```

- [ ] **Step 3: Create the barrel file `src/sites/mousetrapjenga/index.ts`**

Since the data files don't exist yet, the dynamic route's `isValidSlug` and `getMetadata` need to be inline stubs for now. Task 12 will rewrite this file once products.ts exists.

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import MousetrapJengaHome from "./pages/home"
import MousetrapJengaProducts, { metadata as productsMetadata } from "./pages/products"
import MousetrapJengaHowToPlay, { metadata as howToPlayMetadata } from "./pages/how-to-play"
import MousetrapJengaHallOfFame, { metadata as hallOfFameMetadata } from "./pages/hall-of-fame"
import MousetrapJengaAbout, { metadata as aboutMetadata } from "./pages/about"
import MousetrapJengaTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import MousetrapJengaContact, { metadata as contactMetadata } from "./pages/contact"
import MousetrapJengaCart from "./pages/cart"
import MousetrapJengaCheckout from "./pages/checkout"
import MousetrapJengaPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import MousetrapJengaTerms, { metadata as termsMetadata } from "./pages/terms"
import MousetrapJengaProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MousetrapJengaHome,
  "products": { component: MousetrapJengaProducts, metadata: productsMetadata },
  "how-to-play": { component: MousetrapJengaHowToPlay, metadata: howToPlayMetadata },
  "hall-of-fame": { component: MousetrapJengaHallOfFame, metadata: hallOfFameMetadata },
  "about": { component: MousetrapJengaAbout, metadata: aboutMetadata },
  "testimonials": { component: MousetrapJengaTestimonials, metadata: testimonialsMetadata },
  "contact": { component: MousetrapJengaContact, metadata: contactMetadata },
  "cart": MousetrapJengaCart,
  "checkout": MousetrapJengaCheckout,
  "privacy": { component: MousetrapJengaPrivacy, metadata: privacyMetadata },
  "terms": { component: MousetrapJengaTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: MousetrapJengaProductDetail,
    getMetadata: (slug: string) => ({ title: `${slug} — Mousetrap Jenga`, description: "Product detail" }),
    isValidSlug: () => true,
  },
}
```

- [ ] **Step 4: Register the site in `src/sites/registry.ts`**

Read the current file first. Add an import line and a registry entry for mousetrapjenga alongside the other sites:

Add this import (alphabetize within the existing block if desired, or append):
```typescript
import { config as mousetrapjengaConfig, pages as mousetrapjengaPages, dynamicRoutes as mousetrapjengaDynamicRoutes } from "./mousetrapjenga"
```

Add this entry to the `siteRegistry` object:
```typescript
  mousetrapjenga: { config: mousetrapjengaConfig, pages: mousetrapjengaPages, dynamicRoutes: mousetrapjengaDynamicRoutes },
```

- [ ] **Step 5: Type-check and build**

Run: `npx tsc --noEmit`
Expected: no errors

Run: `npm run build`
Expected: build succeeds. `mousetrapjenga` should appear in Next's output without errors.

- [ ] **Step 6: Commit**

```bash
git add src/sites/mousetrapjenga src/sites/registry.ts
git commit -m "feat(mousetrapjenga): scaffold site with placeholder pages

Creates the mousetrapjenga site skeleton — config, barrel, registry
entry, and placeholder components for every page in the nav. All
pages currently render a stub heading; subsequent tasks fill in the
real content. Cart and checkout reuse existing commerce components
per the features.commerce flag."
```

---

## Task 4: Product catalog data file

**Files:**
- Create: `src/sites/mousetrapjenga/data/products.ts`

- [ ] **Step 1: Write the full product catalog**

Create `src/sites/mousetrapjenga/data/products.ts` with this exact content:

```typescript
export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  whatsInTheBox: string[]
  isAccessory?: boolean
}

export const products: Product[] = [
  {
    slug: "junior-snap",
    name: "Junior Snap Edition",
    price: 19.99,
    priceLabel: "ONLY $19.99!",
    tagline: "Lose a fingernail. Keep the memories!",
    description: [
      "Introducing the PERFECT first game for little champions! Junior Snap Edition is Mousetrap Jenga reimagined for family-friendly fun, featuring our specially-engineered PLASTIC trainer traps. Kids learn the fundamentals of competitive trap-stacking without the commitment of full-grade steel!",
      "Each Junior Snap set includes 12 pastel-colored plastic training traps (guaranteed to pinch but not puncture!), a full-color rulebook, and a certificate of participation for every player. It's the SAFEST* way to introduce your children to America's favorite game! (*Relative to other editions.)",
      "Recommended for ages 8 and up. Adult supervision recommended. Band-Aids sold separately.",
    ],
    image: "/sites/mousetrapjenga/product-junior-snap.png",
    whatsInTheBox: [
      "12 plastic trainer traps (pastel colors!)",
      "1 full-color illustrated rulebook",
      "6 certificates of participation",
      "1 'My First Injury' commemorative sticker",
      "Cheerful 30-day limited warranty",
    ],
  },
  {
    slug: "classic",
    name: "Classic Mousetrap Jenga",
    price: 49.99,
    priceLabel: "ONLY $49.99!",
    tagline: "The best way to lose a finger!",
    description: [
      "This is the one that started it all! Classic Mousetrap Jenga delivers the AUTHENTIC American family game experience that has delighted players since 1978. Each set contains 18 genuine American-made steel mousetraps, individually tuned by our expert craftspeople for maximum excitement.",
      "The rules are simple: stack your tower, arm your traps, and take turns carefully removing one trap from the tower and placing it on top. The player with the most remaining fingers at the end wins! It's FUN for the whole family and a GUARANTEED conversation starter at your next gathering.",
      "Fresh from the Cedar Rapids factory, Classic Mousetrap Jenga arrives in our iconic red-and-yellow collector's box — the same box that's been on shelves in America's finest toy stores for nearly fifty years. Order yours TODAY!",
    ],
    image: "/sites/mousetrapjenga/product-classic.png",
    whatsInTheBox: [
      "18 genuine American-made steel mouse traps",
      "1 full-color illustrated instruction booklet",
      "1 official Mousetrap Jenga scorecard pad (50 sheets)",
      "1 collector's box with iconic red-and-yellow artwork",
      "2 adhesive bandages (for setup only)",
    ],
  },
  {
    slug: "rat-trap-pro",
    name: "Rat Trap Pro",
    price: 99.99,
    priceLabel: "ONLY $99.99!",
    tagline: "Two fingers? More like TWO THUMBS UP!",
    description: [
      "READY to take your game to the NEXT LEVEL? Rat Trap Pro is the edition of choice for advanced players who have mastered the Classic and hunger for MORE. Featuring 12 commercial-grade rat traps sourced from the finest pest-control suppliers in the Midwest, this is the serious player's serious game.",
      "Rat Trap Pro features DOUBLE the spring tension of our Classic edition! The larger trap footprint means bigger stakes, longer games, and more dramatic finishes. Many of our Hall of Fame champions got their start right here.",
      "Our customers consistently rate Rat Trap Pro as 'surprisingly aggressive' and 'more than I bargained for!' — the exact feedback we hope to hear. For tournament-ready fun, look no further!",
    ],
    image: "/sites/mousetrapjenga/product-rat-trap-pro.png",
    whatsInTheBox: [
      "12 commercial-grade rat traps",
      "1 advanced rules guide ('The Rat Trap Pro Handbook')",
      "1 Mousetrap Jenga Pro scorecard pad (50 sheets)",
      "1 premium cardboard display case",
      "4 adhesive bandages (for setup only)",
      "1 emergency contact card",
    ],
  },
  {
    slug: "bear-trap-tournament",
    name: "Bear Trap Tournament Edition",
    price: 299.99,
    priceLabel: "ONLY $299.99!",
    tagline: "The best way to lose an arm!",
    description: [
      "OUR FLAGSHIP TOURNAMENT PRODUCT! The Bear Trap Tournament Edition is what the pros play with. Housed in a gorgeous solid-wood presentation case with brass hardware and a velvet-lined interior, this is the crown jewel of the Mousetrap Jenga lineup.",
      "Each set contains FOUR genuine bear traps, hand-finished in our Cedar Rapids workshop. These are the same traps used in the Mousetrap Jenga Championship Circuit — they're tournament-regulation, tournament-tested, and tournament-approved by Commissioner Harold Pemberton himself.",
      "The Bear Trap Tournament Edition is NOT RECOMMENDED for beginners. Players should master the Classic and Rat Trap Pro before attempting. Includes a gold-embossed certificate of authenticity and a laminated 'In Case of Emergency' card. Order TODAY and join the elite ranks of serious Mousetrap Jenga players!",
    ],
    image: "/sites/mousetrapjenga/product-bear-trap-tournament.png",
    whatsInTheBox: [
      "4 tournament-regulation bear traps",
      "1 solid-wood presentation case with brass hardware",
      "1 tournament rulebook signed by Commissioner Pemberton",
      "1 gold-embossed certificate of authenticity",
      "1 laminated 'In Case of Emergency' reference card",
      "1 roll of premium gauze (complimentary!)",
    ],
  },
  {
    slug: "leghold-championship",
    name: "Industrial Leg-Hold Championship",
    price: 799.99,
    priceLabel: "ONLY $799.99!",
    tagline: "The game that plays YOU.",
    description: [
      "Presenting the ULTIMATE expression of the Mousetrap Jenga vision: the Industrial Leg-Hold Championship Edition. This is not a game for the faint of heart. This is not a game for the average American family. This is a game for TRUE believers.",
      "Featuring TWO massive industrial leg-hold traps, the Championship Edition requires a regulation-size living room or larger. Players compete in a single round that lasts as long as the players can. Past champions have reported rounds lasting upwards of forty-five minutes! Our longest recorded match: ninety-three minutes (Morty Abernathy vs. a folding chair, 1991).",
      "Each set is individually numbered and signed by Harold Pemberton. Limited to 500 units annually. Once you order the Leg-Hold Championship, you join a rarefied community of players. You will never look at Jenga the same way again. You will never look at the same way again.",
    ],
    image: "/sites/mousetrapjenga/product-leghold-championship.png",
    whatsInTheBox: [
      "2 industrial leg-hold traps (individually numbered)",
      "1 custom-engraved steel carry case",
      "1 championship rulebook with historical context",
      "1 certificate of authenticity signed by Harold Pemberton",
      "1 oversized first-aid kit (complimentary!)",
      "1 laminated card titled 'What to Tell the Paramedics'",
    ],
  },
  {
    slug: "recovery-pack",
    name: "The Official Recovery Pack",
    price: 29.99,
    priceLabel: "JUST $29.99!",
    tagline: "Every champion needs one!",
    description: [
      "Let's be HONEST: every great game comes with a few bumps and bruises. That's why we created The Official Recovery Pack, the ESSENTIAL accessory for any serious Mousetrap Jenga household. This isn't just a first-aid kit — it's a STATEMENT that you're ready for whatever the game throws at you!",
      "Each Recovery Pack contains everything you need to get back in the game: assorted adhesive bandages, sterile gauze pads, medical tape, antiseptic wipes, and ONE premium-grade tourniquet (for peace of mind!). Plus, every pack includes a laminated card with the driving directions to YOUR nearest emergency room — pre-filled in advance!",
      "Already included FREE with the Bear Trap Tournament Edition and Leg-Hold Championship! Available separately for all other editions. Don't play without it!",
    ],
    image: "/sites/mousetrapjenga/product-recovery-pack.png",
    whatsInTheBox: [
      "24 assorted adhesive bandages",
      "6 sterile gauze pads",
      "1 roll medical tape",
      "8 antiseptic wipes",
      "1 premium-grade tourniquet",
      "1 laminated 'Directions to Nearest ER' card",
    ],
    isAccessory: true,
  },
  {
    slug: "trap-refill-12pk",
    name: "Trap Refill 12-Pack",
    price: 39.99,
    priceLabel: "JUST $39.99!",
    tagline: "Because steel fatigues after every championship match!",
    description: [
      "Serious players know: a TRUE champion needs FRESH traps. Every snap reduces spring tension, and over time, your set simply won't deliver the same exciting gameplay experience. That's why we offer the Trap Refill 12-Pack — a dozen brand-new factory-fresh mouse traps to keep your Classic Mousetrap Jenga set at peak performance!",
      "Our refills are the EXACT same traps we ship in Classic Mousetrap Jenga. They're individually tuned, factory-tested, and ready for tournament-level play. Keep a spare pack in your game closet at all times!",
      "SUBSCRIBE and SAVE! Get a fresh 12-pack delivered every month and NEVER run out of traps. (Subscribe button is purely decorative. Call to subscribe!)",
    ],
    image: "/sites/mousetrapjenga/product-trap-refill-12pk.png",
    whatsInTheBox: [
      "12 factory-fresh American-made steel mouse traps",
      "1 thank-you card from the R&D department",
      "1 'How to Know When It's Time for a Refill' pamphlet",
    ],
    isAccessory: true,
  },
  {
    slug: "scoreboard",
    name: "Home Tournament Scoreboard",
    price: 24.99,
    priceLabel: "JUST $24.99!",
    tagline: "Track digits remaining in style!",
    description: [
      "Bring the championship experience HOME with the Official Home Tournament Scoreboard! Handcrafted from solid pine in our Cedar Rapids workshop, this gorgeous wooden scoreboard features brass peg markers and an elegant vintage finish that looks RIGHT at home on any rec-room wall.",
      "The scoreboard tracks up to six players per game with columns for 'Digits at Start,' 'Digits Remaining,' and 'Total Wins.' A heirloom-quality piece that becomes more valuable with every family gathering. Imagine the STORIES behind every peg!",
      "Makes a THOUGHTFUL gift for the Mousetrap Jenga enthusiast in your life. Order TODAY!",
    ],
    image: "/sites/mousetrapjenga/product-scoreboard.png",
    whatsInTheBox: [
      "1 solid pine Home Tournament Scoreboard (18\" x 12\")",
      "30 brass peg markers",
      "1 mounting kit",
      "1 instruction card ('How to Track Your Championship')",
    ],
    isAccessory: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/** The 5 tiered editions, ordered from least to most dangerous. */
export const tieredEditions = products.filter((p) => !p.isAccessory)

/** The 3 accessories. */
export const accessories = products.filter((p) => p.isAccessory)
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/data/products.ts
git commit -m "feat(mousetrapjenga): add product catalog data

8 SKUs total: 5 tiered editions (Junior Snap through Leg-Hold
Championship) plus 3 accessories (Recovery Pack, Trap Refills,
Home Tournament Scoreboard). Includes getProductBySlug helper and
tieredEditions/accessories slices for the products listing page."
```

---

## Task 5: Leadership team data file

**Files:**
- Create: `src/sites/mousetrapjenga/data/leadership.ts`

- [ ] **Step 1: Write the leadership data file**

Create `src/sites/mousetrapjenga/data/leadership.ts` with this exact content:

```typescript
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: string
}

export const executives: Executive[] = [
  {
    slug: "pemberton",
    name: "Harold Pemberton",
    title: "Founder & Chief Inventor",
    bio: "Harold invented Mousetrap Jenga in his Cedar Rapids basement in 1978 after concluding that 'regular Jenga simply wasn't exciting enough.' A third-generation Iowan and self-taught spring engineer, Harold still personally approves every production run that leaves the factory. He has been married to the same woman since 1973 and still has most of his fingers.",
    quote: "If it doesn't make your grandmother gasp, it's not a real toy.",
    image: "/sites/mousetrapjenga/exec-pemberton.png",
    referencePerson: "bill",
  },
  {
    slug: "wickham",
    name: "Delbert Wickham",
    title: "VP of Research & Trap Development",
    bio: "A third-generation spring engineer from Scranton, Delbert joined Mousetrap Jenga in 1982 and has personally sourced every steel trap the company has ever sold. He works out of the R&D lab in the factory basement, where he has been known to test-fire every shipment by hand. He prefers his traps 'angry' and once described a defective unit as 'frankly, disappointingly merciful.'",
    quote: "We don't make 'safe' traps. We make 'honest' traps.",
    image: "/sites/mousetrapjenga/exec-wickham.png",
    referencePerson: "brandon",
  },
  {
    slug: "abernathy",
    name: "Morty Abernathy",
    title: "VP of Playtesting & Quality Assurance",
    bio: "Morty has personally playtested every edition Mousetrap Jenga has released since 1982. Father of three, 'owner' of eight fingers, and holder of the 1987 'four consecutive turns without injury' record that still stands today, he is the living heart of our quality assurance program. He refuses to discuss how the 1987 record attempt ended.",
    quote: "Every champion has a story. Mine has several appendages in it.",
    image: "/sites/mousetrapjenga/exec-abernathy.png",
    referencePerson: "jim",
  },
  {
    slug: "fink",
    name: "Eugene Fink",
    title: "VP of Safety & Customer Joy",
    bio: "Eugene Fink joined Mousetrap Jenga in 1989 and has been the guardian of our safety program ever since. He keeps the company first-aid station fully stocked at all times and maintains cordial relationships with emergency rooms in a twelve-county radius. Eugene believes every American family deserves the right to lose a digit together, and he's made it his life's mission to ensure they do so with a smile.",
    quote: "Safety isn't about avoiding injury. It's about having the bandages ready!",
    image: "/sites/mousetrapjenga/exec-fink.png",
    referencePerson: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/data/leadership.ts
git commit -m "feat(mousetrapjenga): add leadership team data

Four inventors (Harold Pemberton, Delbert Wickham, Morty Abernathy,
Eugene Fink) with fully-randomized 80s toy-industry character names.
Each entry tracks the underlying referencePerson (bill/brandon/jim/
sean) for portrait generation."
```

---

## Task 6: Testimonials data file

**Files:**
- Create: `src/sites/mousetrapjenga/data/testimonials.ts`

- [ ] **Step 1: Write the testimonials data file**

Create `src/sites/mousetrapjenga/data/testimonials.ts` with this exact content. Each testimonial reuses a portrait from the shared pool created in Task 1:

```typescript
import { getPortrait } from "@/data/testimonial-portraits"

export interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
}

function withPortrait(slug: string, quote: string, title: string): Testimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image }
}

export const testimonials: Testimonial[] = [
  withPortrait(
    "brenda-faulk",
    "My kids have NEVER had more fun! We only needed ONE trip to the emergency room!",
    "Mother of three — Cedar Rapids, IA (currently in cast)",
  ),
  withPortrait(
    "jason-kile",
    "I grew up playing Classic Mousetrap Jenga. Now my kids play it. My grandkids will play it too, assuming they have the fingers for it.",
    "Grandfather and third-generation player — Des Moines, IA (missing 2 fingers, proud of it)",
  ),
  withPortrait(
    "tony-mazetti",
    "The Rat Trap Pro is where REAL men separate themselves from the boys. I bought three sets. I have two fingers left. ZERO regrets.",
    "Tournament regular — Dubuque, IA (seven fingers and counting)",
  ),
  withPortrait(
    "patricia-hollowell",
    "As a licensed physical therapist, I see dozens of Mousetrap Jenga injuries a week and I have to say: they're always from SATISFIED customers. Highly recommend!",
    "Physical therapist — Iowa City, IA (all fingers intact, for now)",
  ),
  withPortrait(
    "derek-pullman",
    "I proposed to my wife over a game of Bear Trap Tournament Edition. She said yes before either of us lost any limbs. Best day of my life!",
    "Newlywed — Marshalltown, IA (engagement ring on remaining finger)",
  ),
  withPortrait(
    "simone-archer",
    "Bought the Leg-Hold Championship for my husband's 50th birthday. Our living room has never felt more ALIVE. He hasn't spoken since the first game but he smiles a lot now!",
    "Homemaker — Ames, IA (husband in recovery)",
  ),
  withPortrait(
    "kyle-brandt",
    "Finally, a family game that respects the fact that I wanted to feel SOMETHING. Five stars, would lose another finger.",
    "Enthusiast — Waterloo, IA (four fingers, one thumb, one mystery)",
  ),
  withPortrait(
    "eleanor-whittaker",
    "As a board game critic of twenty-three years, I've seen it ALL. Nothing compares to the genuine thrill and authentic hospital bills of Classic Mousetrap Jenga. A true American treasure.",
    "Board game critic — Iowa City, IA (reviewing from the ER)",
  ),
]

/** First 3 testimonials shown on homepage strip */
export const homepageTestimonials = testimonials.slice(0, 3)
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/data/testimonials.ts
git commit -m "feat(mousetrapjenga): add testimonials data

8 testimonials using portraits from the shared pool via getPortrait.
Each signature includes a parenthetical injury status to land the
cheerful-denial voice. homepageTestimonials exports the first 3 for
the homepage band."
```

---

## Task 7: Starburst component

**Files:**
- Create: `src/sites/mousetrapjenga/components/Starburst.tsx`

- [ ] **Step 1: Write the Starburst component**

Create `src/sites/mousetrapjenga/components/Starburst.tsx`:

```tsx
import React from "react"

interface StarburstProps {
  text: string
  color?: "yellow" | "red" | "turquoise"
  size?: "sm" | "md" | "lg"
  className?: string
  rotation?: number
}

const colorMap = {
  yellow: { fill: "#FFD23F", text: "#1A1F4C", stroke: "#1A1F4C" },
  red: { fill: "#D4281F", text: "#FFF6E8", stroke: "#1A1F4C" },
  turquoise: { fill: "#2BB9B9", text: "#FFF6E8", stroke: "#1A1F4C" },
}

const sizeMap = {
  sm: { dim: 120, fontSize: 14 },
  md: { dim: 180, fontSize: 20 },
  lg: { dim: 260, fontSize: 28 },
}

/**
 * Comic-book style starburst badge used throughout the Mousetrap Jenga
 * site — especially in the home page product parade ("BUT WAIT! THERE'S
 * MORE!") and on product cards for "NEW!" and "SALE!" bursts.
 */
export function Starburst({
  text,
  color = "yellow",
  size = "md",
  className = "",
  rotation = -12,
}: StarburstProps) {
  const { fill, text: textColor, stroke } = colorMap[color]
  const { dim, fontSize } = sizeMap[size]

  // 16-point starburst path — computed around a center of 100,100 with
  // alternating outer/inner radii.
  const points: string[] = []
  const cx = 100
  const cy = 100
  const outer = 95
  const inner = 68
  const spikes = 16
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  const pathData = points.join(" ")

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: dim, height: dim, transform: `rotate(${rotation}deg)` }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <polygon
          points={pathData}
          fill={fill}
          stroke={stroke}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fontFamily="var(--font-bowlby-one-sc), sans-serif"
          fontSize={fontSize}
          fontWeight="900"
          fill={textColor}
          style={{ textTransform: "uppercase" }}
        >
          {text.split("\n").map((line, i, arr) => (
            <tspan key={i} x="100" dy={i === 0 ? -((arr.length - 1) * fontSize) / 2 : fontSize}>
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/components/Starburst.tsx
git commit -m "feat(mousetrapjenga): add Starburst badge component

Comic-book style SVG starburst badge for 'BUT WAIT!' and 'NEW!' bursts
sprinkled throughout the site. Site-local (YAGNI — not promoted to
shared components until another site needs it)."
```

---

## Task 8: InfomercialBand component

**Files:**
- Create: `src/sites/mousetrapjenga/components/InfomercialBand.tsx`

- [ ] **Step 1: Write the InfomercialBand component**

Create `src/sites/mousetrapjenga/components/InfomercialBand.tsx`:

```tsx
import React from "react"

interface InfomercialBandProps {
  children: React.ReactNode
  bgColor: "primary" | "secondary" | "accent" | "background" | "cream-dark"
  textColor?: "dark" | "light"
  className?: string
  verticalPadding?: "sm" | "md" | "lg"
  bordered?: boolean
}

const bgMap: Record<InfomercialBandProps["bgColor"], string> = {
  primary: "bg-[#D4281F]",      // cherry red
  secondary: "bg-[#FFD23F]",    // sunburst yellow
  accent: "bg-[#2BB9B9]",       // turquoise
  background: "bg-[#FFF6E8]",   // cream
  "cream-dark": "bg-[#F5E8CE]", // slightly darker cream for alternating bands
}

const textMap = {
  dark: "text-[#1A1F4C]",
  light: "text-[#FFF6E8]",
}

const paddingMap = {
  sm: "py-10",
  md: "py-16",
  lg: "py-24",
}

/**
 * Full-bleed section wrapper with infomercial band styling. Each band feels
 * like a TV ad beat. Use on the home page and anywhere a clear banded rhythm
 * is needed.
 */
export function InfomercialBand({
  children,
  bgColor,
  textColor = "dark",
  className = "",
  verticalPadding = "md",
  bordered = true,
}: InfomercialBandProps) {
  const borderClasses = bordered ? "border-y-4 border-[#1A1F4C]" : ""
  return (
    <section
      className={`w-full ${bgMap[bgColor]} ${textMap[textColor]} ${paddingMap[verticalPadding]} ${borderClasses} ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4">{children}</div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/components/InfomercialBand.tsx
git commit -m "feat(mousetrapjenga): add InfomercialBand section wrapper

Full-bleed banded section with comic-book border rhythm. Used
throughout the home page to give each TV-ad beat a distinct visual
identity."
```

---

## Task 9: TradingCard component

**Files:**
- Create: `src/sites/mousetrapjenga/components/TradingCard.tsx`

- [ ] **Step 1: Write the TradingCard component**

Create `src/sites/mousetrapjenga/components/TradingCard.tsx`:

```tsx
import Image from "next/image"

interface TradingCardProps {
  name: string
  nickname: string
  hometown?: string
  portrait: string
  championships: number
  digitsRemaining: number
  famousFor: string
  era: "founding" | "contemporary"
}

/**
 * Vintage trading-card layout for the Hall of Fame page. Sepia border,
 * monospace stat block, dramatic portrait framing.
 */
export function TradingCard({
  name,
  nickname,
  hometown,
  portrait,
  championships,
  digitsRemaining,
  famousFor,
  era,
}: TradingCardProps) {
  return (
    <article
      className="
        relative border-4 border-[#1A1F4C] bg-[#FFF6E8]
        shadow-[6px_6px_0_0_#1A1F4C] flex flex-col
        max-w-sm w-full
      "
    >
      {/* Era ribbon */}
      <div
        className={`
          absolute top-3 left-0 px-3 py-1 text-xs font-bold uppercase tracking-wider
          border-y-2 border-r-2 border-[#1A1F4C]
          ${era === "founding" ? "bg-[#D4281F] text-[#FFF6E8]" : "bg-[#2BB9B9] text-[#FFF6E8]"}
        `}
      >
        {era === "founding" ? "Founding Era" : "Contemporary"}
      </div>

      {/* Portrait */}
      <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden sepia-[0.4]">
        <Image src={portrait} alt={name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
      </div>

      {/* Name & nickname */}
      <div className="px-4 pt-4 pb-2 text-center border-b-2 border-dashed border-[#1A1F4C]/40">
        <p className="font-heading text-xl leading-tight text-[#D4281F]">&ldquo;{nickname}&rdquo;</p>
        <h3 className="font-heading text-2xl leading-tight text-[#1A1F4C] mt-1">{name}</h3>
        {hometown && <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1F4C]/60 mt-1">{hometown}</p>}
      </div>

      {/* Stat block — monospace */}
      <dl className="grid grid-cols-2 font-mono text-sm border-b-2 border-dashed border-[#1A1F4C]/40">
        <div className="border-r border-[#1A1F4C]/40 px-3 py-2">
          <dt className="text-[10px] uppercase text-[#1A1F4C]/60">Championships</dt>
          <dd className="font-bold text-[#D4281F] text-lg">{championships}</dd>
        </div>
        <div className="px-3 py-2">
          <dt className="text-[10px] uppercase text-[#1A1F4C]/60">Digits Remaining</dt>
          <dd className="font-bold text-[#D4281F] text-lg">{digitsRemaining}</dd>
        </div>
      </dl>

      {/* Famous for */}
      <div className="px-4 py-3 text-sm italic text-[#1A1F4C]/80">&ldquo;{famousFor}&rdquo;</div>
    </article>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/components/TradingCard.tsx
git commit -m "feat(mousetrapjenga): add TradingCard component

Vintage trading-card layout for the Hall of Fame page. Sepia-tinted
portrait, monospace stat block (championships + digits remaining),
era ribbon."
```

---

## Task 10: Home page — 7-band infomercial sequence

**Files:**
- Modify: `src/sites/mousetrapjenga/pages/home.tsx` (replaces the placeholder)

- [ ] **Step 1: Replace the home page placeholder with the full 7-band sequence**

Read `src/sites/snortables/pages/home.tsx` first — it uses `async` + `getSiteHref` for link generation. The mousetrapjenga home page follows the same async pattern.

Replace `src/sites/mousetrapjenga/pages/home.tsx` with:

```tsx
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { InfomercialBand } from "../components/InfomercialBand"
import { Starburst } from "../components/Starburst"
import { getProductBySlug } from "../data/products"
import { homepageTestimonials } from "../data/testimonials"

export default async function MousetrapJengaHome() {
  const siteHref = await getSiteHref()
  const classic = getProductBySlug("classic")!
  const ratTrapPro = getProductBySlug("rat-trap-pro")!
  const bearTrap = getProductBySlug("bear-trap-tournament")!

  return (
    <>
      {/* BAND 1 — OPENING HERO */}
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block bg-[#FFD23F] text-[#1A1F4C] px-4 py-1 font-bold uppercase text-sm tracking-wider mb-4 border-2 border-[#1A1F4C] shadow-[4px_4px_0_0_#1A1F4C]">
              The American Family Game Classic!
            </div>
            <h1 className="font-heading text-5xl md:text-7xl leading-[0.9] text-[#FFF6E8] drop-shadow-[4px_4px_0_#1A1F4C] mb-4">
              MOUSETRAP<br />JENGA
            </h1>
            <p className="text-xl md:text-2xl font-bold text-[#FFD23F] mb-2">Now With 300% More Trap!</p>
            <p className="text-lg text-[#FFF6E8]/90 mb-8 italic">&ldquo;The best way to lose a finger since 1978.&rdquo;</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href={siteHref("/products")}
                className="bg-[#FFD23F] text-[#1A1F4C] px-8 py-4 font-heading text-xl uppercase border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
              >
                Buy Now!
              </Link>
              <Link
                href={siteHref("/how-to-play")}
                className="bg-[#2BB9B9] text-[#FFF6E8] px-8 py-4 font-heading text-xl uppercase border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
              >
                How to Play
              </Link>
            </div>
          </div>
          <div className="relative aspect-square border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] bg-[#FFF6E8]">
            <Image
              src="/sites/mousetrapjenga/hero.png"
              alt="A mid-80s American family gathered around a wood-paneled rec-room table playing Mousetrap Jenga"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute -top-8 -right-8">
              <Starburst text={"NEW!\nAS SEEN\nON TV"} color="yellow" size="md" rotation={12} />
            </div>
          </div>
        </div>
      </InfomercialBand>

      {/* BAND 2 — HOW IT WORKS */}
      <InfomercialBand bgColor="background">
        <div className="text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-[#D4281F] mb-2">HOW IT WORKS!</h2>
          <p className="text-lg text-[#1A1F4C]/70 mb-10">Fun for the whole family in just 4 easy steps!</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: "1", title: "STACK THE TRAPS!", body: "Build your tower, just like regular Jenga!" },
              { n: "2", title: "TAKE TURNS!", body: "Remove one trap from below. Place it on top." },
              { n: "3", title: "DON'T LET 'EM SNAP!", body: "That's half the fun!" },
              { n: "4", title: "CROWN A CHAMPION!", body: "Most fingers remaining wins!" },
            ].map((step) => (
              <div
                key={step.n}
                className="bg-[#FFD23F] border-4 border-[#1A1F4C] p-6 text-center shadow-[6px_6px_0_0_#1A1F4C]"
              >
                <div className="font-heading text-6xl text-[#D4281F] mb-2">{step.n}</div>
                <h3 className="font-heading text-lg text-[#1A1F4C] mb-2">{step.title}</h3>
                <p className="text-sm text-[#1A1F4C]/80">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </InfomercialBand>

      {/* BAND 3 — TESTIMONIAL STRIP */}
      <InfomercialBand bgColor="accent" textColor="light" verticalPadding="sm">
        <h2 className="font-heading text-3xl text-center text-[#FFF6E8] mb-6">The Family That Traps Together...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homepageTestimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-[#FFF6E8] text-[#1A1F4C] border-4 border-[#1A1F4C] p-4 shadow-[4px_4px_0_0_#1A1F4C]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-14 h-14 border-2 border-[#1A1F4C] overflow-hidden flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="56px" />
                </div>
                <figcaption>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-[#1A1F4C]/70">{t.title}</div>
                </figcaption>
              </div>
              <blockquote className="text-sm italic">&ldquo;{t.quote}&rdquo;</blockquote>
            </figure>
          ))}
        </div>
      </InfomercialBand>

      {/* BAND 4 — PRODUCT PARADE */}
      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl md:text-5xl text-[#D4281F]">INTRODUCING THE LINEUP!</h2>
          <p className="text-lg text-[#1A1F4C]/70 mt-2">Five editions. Endless excitement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Card 1: Classic */}
          <ParadeCard product={classic} badge={<Starburst text="CLASSIC!" color="red" size="sm" rotation={-8} />} href={siteHref(`/products/${classic.slug}`)} />
          {/* Card 2: Rat Trap Pro with BUT WAIT */}
          <ParadeCard product={ratTrapPro} badge={<Starburst text={"BUT\nWAIT!"} color="yellow" size="sm" rotation={-12} />} href={siteHref(`/products/${ratTrapPro.slug}`)} />
          {/* Card 3: Bear Trap with AND THAT'S NOT ALL */}
          <ParadeCard product={bearTrap} badge={<Starburst text={"AND\nTHAT'S\nNOT ALL!"} color="red" size="sm" rotation={-10} />} href={siteHref(`/products/${bearTrap.slug}`)} />
        </div>

        <div className="text-center mt-10">
          <Link
            href={siteHref("/products")}
            className="inline-block font-heading text-xl text-[#D4281F] underline decoration-4 underline-offset-4 hover:text-[#1A1F4C] transition-colors"
          >
            See all editions &rarr;
          </Link>
        </div>
      </InfomercialBand>

      {/* BAND 5 — ACT NOW */}
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg">
        <div className="text-center">
          <div className="inline-block bg-[#FFD23F] text-[#1A1F4C] px-4 py-1 font-bold uppercase text-sm tracking-wider mb-4 border-2 border-[#1A1F4C]">
            Offer Expires: SOON!
          </div>
          <h2 className="font-heading text-5xl md:text-7xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C] mb-4">ACT NOW!</h2>
          <p className="text-2xl md:text-4xl font-heading text-[#FFF6E8] mb-6">1-800-JENGA-OW</p>
          <p className="text-lg text-[#FFF6E8]/90 mb-8 max-w-2xl mx-auto">
            Order in the next 10 minutes and we&apos;ll throw in{" "}
            <span className="font-bold text-[#FFD23F]">The Official Recovery Pack</span> — ABSOLUTELY FREE!
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block bg-[#FFD23F] text-[#1A1F4C] px-10 py-5 font-heading text-2xl uppercase border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#1A1F4C] transition-all"
          >
            Call Now!
          </Link>
          <p className="text-xs text-[#FFF6E8]/60 mt-6 italic">
            Operators are standing by! Phone number is for display purposes only. Please use the Call Now button.
          </p>
        </div>
      </InfomercialBand>

      {/* BAND 6 — CHAMPIONSHIP BANNER */}
      <InfomercialBand bgColor="background" verticalPadding="sm">
        <Link href={siteHref("/hall-of-fame")} className="block group">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-heading text-3xl md:text-4xl text-[#1A1F4C]">Meet the Legends of the Circuit</h2>
              <p className="text-[#1A1F4C]/70 mt-1">Our Hall of Fame honors the greatest players in Mousetrap Jenga history.</p>
            </div>
            <div className="font-heading text-xl text-[#D4281F] group-hover:underline">Enter the Hall &rarr;</div>
          </div>
        </Link>
      </InfomercialBand>

      {/* BAND 7 — FINAL CTA */}
      <InfomercialBand bgColor="secondary" verticalPadding="md">
        <div className="text-center">
          <Link
            href={siteHref("/products")}
            className="inline-block bg-[#D4281F] text-[#FFF6E8] px-12 py-5 font-heading text-3xl uppercase border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#1A1F4C] transition-all"
          >
            Buy Now!
          </Link>
          <p className="mt-6 text-sm text-[#1A1F4C]/80 italic">
            Ages 8 and up. Fun for the whole family! Bandages sold separately.
          </p>
        </div>
      </InfomercialBand>
    </>
  )
}

// --- Local helpers ---------------------------------------------------------

function ParadeCard({
  product,
  badge,
  href,
}: {
  product: { slug: string; name: string; priceLabel: string; tagline: string; image: string }
  badge: React.ReactNode
  href: string
}) {
  return (
    <Link
      href={href}
      className="relative block bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
    >
      <div className="absolute -top-6 -right-6 z-10">{badge}</div>
      <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-heading text-xl text-[#1A1F4C] mb-1">{product.name}</h3>
        <p className="text-sm text-[#1A1F4C]/70 italic mb-2">&ldquo;{product.tagline}&rdquo;</p>
        <p className="font-heading text-2xl text-[#D4281F]">{product.priceLabel}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Type-check and build**

Run: `npx tsc --noEmit`
Expected: no errors

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/pages/home.tsx
git commit -m "feat(mousetrapjenga): implement home page infomercial sequence

7-band scroll sequence: opening hero → how it works → testimonial
strip → product parade reveal (classic → BUT WAIT → Rat Trap → AND
THAT'S NOT ALL → Bear Trap) → ACT NOW urgency block with fake
1-800-JENGA-OW → championship banner → final CTA. Uses the local
Starburst and InfomercialBand components."
```

---

## Task 11: Products listing page

**Files:**
- Modify: `src/sites/mousetrapjenga/pages/products.tsx`

- [ ] **Step 1: Replace the products placeholder**

```tsx
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { InfomercialBand } from "../components/InfomercialBand"
import { Starburst } from "../components/Starburst"
import { tieredEditions, accessories, type Product } from "../data/products"

export const metadata = {
  title: "Products — Mousetrap Jenga",
  description: "The complete lineup! Five tiered editions plus essential accessories. Order yours today!",
}

export default async function MousetrapJengaProducts() {
  const siteHref = await getSiteHref()

  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg">
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">THE COMPLETE LINEUP!</h1>
          <p className="text-lg md:text-xl mt-4 text-[#FFF6E8]/90">Five editions of the American family game classic — plus the accessories EVERY champion needs!</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Championship Editions</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">Choose your level of commitment.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tieredEditions.map((product, idx) => (
            <ProductListingCard
              key={product.slug}
              product={product}
              href={siteHref(`/products/${product.slug}`)}
              badge={
                idx === 1 ? <Starburst text="BEST\nSELLER!" color="red" size="sm" rotation={-10} /> : null
              }
            />
          ))}
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Essential Accessories</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">Every champion needs the basics!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessories.map((product) => (
            <ProductListingCard
              key={product.slug}
              product={product}
              href={siteHref(`/products/${product.slug}`)}
              badge={null}
            />
          ))}
        </div>
      </InfomercialBand>
    </>
  )
}

function ProductListingCard({
  product,
  href,
  badge,
}: {
  product: Product
  href: string
  badge: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="relative block bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
    >
      {badge && <div className="absolute -top-6 -right-6 z-10">{badge}</div>}
      <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-heading text-xl text-[#1A1F4C] mb-2 leading-tight">{product.name}</h3>
        <p className="text-sm text-[#1A1F4C]/70 italic mb-3 min-h-[2.5em]">&ldquo;{product.tagline}&rdquo;</p>
        <p className="font-heading text-2xl text-[#D4281F]">{product.priceLabel}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/pages/products.tsx
git commit -m "feat(mousetrapjenga): implement products listing page

Two-band layout: Championship Editions (5 tiered SKUs with Classic
marked BEST SELLER) and Essential Accessories (3 accessory SKUs).
Each card links to its product detail page."
```

---

## Task 12: Product detail page + fix barrel dynamicRoutes wiring

**Files:**
- Modify: `src/sites/mousetrapjenga/pages/product-detail.tsx`
- Modify: `src/sites/mousetrapjenga/index.ts`

- [ ] **Step 1: Replace the product-detail placeholder**

```tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { InfomercialBand } from "../components/InfomercialBand"
import { Starburst } from "../components/Starburst"
import { getProductBySlug, tieredEditions, accessories } from "../data/products"

export default async function MousetrapJengaProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) notFound()
  const siteHref = await getSiteHref()

  // "Frequently bought together" always pushes the Recovery Pack unless
  // this IS the Recovery Pack.
  const upsell = product.slug === "recovery-pack" ? getProductBySlug("trap-refill-12pk")! : getProductBySlug("recovery-pack")!

  const relatedEditions = tieredEditions.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="relative aspect-square border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] bg-[#F5E8CE]">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            <div className="absolute -top-8 -right-8">
              <Starburst text="NEW!" color="yellow" size="sm" rotation={12} />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-[#1A1F4C] mb-2 leading-tight">{product.name}</h1>
            <p className="text-lg italic text-[#1A1F4C]/70 mb-6">&ldquo;{product.tagline}&rdquo;</p>
            <p className="font-heading text-4xl text-[#D4281F] mb-8">{product.priceLabel}</p>

            <div className="space-y-4 text-[#1A1F4C]/90 mb-8">
              {product.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mb-8">
              <AddToCartButton slug={product.slug} />
            </div>

            {/* What's in the box */}
            <div className="border-4 border-[#1A1F4C] bg-[#FFD23F] p-6">
              <h2 className="font-heading text-2xl text-[#D4281F] mb-4 text-center uppercase">What&apos;s in the Box!</h2>
              <ul className="space-y-2">
                {product.whatsInTheBox.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-heading text-xl text-[#D4281F] leading-none">★</span>
                    <span className="text-[#1A1F4C]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </InfomercialBand>

      {/* Frequently bought together */}
      <InfomercialBand bgColor="cream-dark" verticalPadding="md">
        <h2 className="font-heading text-2xl text-[#1A1F4C] text-center mb-6">Frequently Bought Together!</h2>
        <div className="max-w-sm mx-auto">
          <Link
            href={siteHref(`/products/${upsell.slug}`)}
            className="block bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
          >
            <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
              <Image src={upsell.image} alt={upsell.name} fill className="object-cover" sizes="384px" />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-heading text-lg text-[#1A1F4C]">{upsell.name}</h3>
              <p className="font-heading text-xl text-[#D4281F] mt-1">{upsell.priceLabel}</p>
            </div>
          </Link>
        </div>
      </InfomercialBand>

      {/* Related editions */}
      {relatedEditions.length > 0 && (
        <InfomercialBand bgColor="background" verticalPadding="md">
          <h2 className="font-heading text-2xl text-[#1A1F4C] text-center mb-6">Other Editions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedEditions.map((p) => (
              <Link
                key={p.slug}
                href={siteHref(`/products/${p.slug}`)}
                className="block bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[4px_4px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#1A1F4C] transition-all"
              >
                <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-heading text-base text-[#1A1F4C] leading-tight">{p.name}</h3>
                  <p className="font-heading text-lg text-[#D4281F] mt-1">{p.priceLabel}</p>
                </div>
              </Link>
            ))}
          </div>
        </InfomercialBand>
      )}
    </>
  )
}
```

- [ ] **Step 2: Update the barrel's dynamicRoutes to use real product data**

Edit `src/sites/mousetrapjenga/index.ts`. Replace the stubbed `dynamicRoutes` block with one that uses `getProductBySlug`:

```typescript
import { getProductBySlug } from "./data/products"
```

And replace the `dynamicRoutes` block at the bottom of the file with:

```typescript
export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: MousetrapJengaProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Mousetrap Jenga`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 3: Verify `AddToCartButton` import path**

The import `import { AddToCartButton } from "@/components/commerce/add-to-cart-button"` may need adjusting if the actual file path differs. Verify by checking what snortables' product-detail page imports, and match that.

Run: grep -rn "AddToCartButton" src/sites/snortables/pages/

Use whatever snortables uses.

- [ ] **Step 4: Type-check and build**

Run: `npx tsc --noEmit`
Expected: no errors

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/sites/mousetrapjenga/pages/product-detail.tsx src/sites/mousetrapjenga/index.ts
git commit -m "feat(mousetrapjenga): implement product detail page + wire dynamic route

Full product detail with hero image, description paragraphs, 'What's
in the Box' feature list, AddToCartButton, a 'Frequently Bought
Together' upsell (always pushes Recovery Pack), and a Related Editions
strip. Barrel's dynamicRoutes now validates slugs against products.ts."
```

---

## Task 13: How to Play page

**Files:**
- Modify: `src/sites/mousetrapjenga/pages/how-to-play.tsx`

- [ ] **Step 1: Replace the how-to-play placeholder**

```tsx
import Image from "next/image"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import { InfomercialBand } from "../components/InfomercialBand"

export const metadata = {
  title: "How to Play — Mousetrap Jenga",
  description: "Learn to play Mousetrap Jenga in just 4 easy steps!",
}

const steps = [
  {
    n: "1",
    title: "SET UP YOUR TOWER!",
    body: "Stack 18 armed mouse traps in perpendicular layers of three, just like regular Jenga! (Yes, armed. That's the whole thing.)",
    image: "/sites/mousetrapjenga/step-1-setup.png",
  },
  {
    n: "2",
    title: "ARM THE TRAPS!",
    body: "If you haven't already, carefully arm each trap. Have a friend nearby to assist! A second set of hands is INVALUABLE during this crucial phase.",
    image: "/sites/mousetrapjenga/step-2-arm.png",
  },
  {
    n: "3",
    title: "TAKE TURNS PULLING!",
    body: "Players take turns removing one trap from anywhere below the top layer and placing it carefully on top. No rushing! Slow and steady wins the game. (And keeps the digits.)",
    image: "/sites/mousetrapjenga/step-3-pull.png",
  },
  {
    n: "4",
    title: "CROWN YOUR CHAMPION!",
    body: "The last player with the most remaining fingers wins! It's that simple! Winners should be congratulated with a firm handshake (use the other hand if necessary).",
    image: "/sites/mousetrapjenga/step-4-crown.png",
  },
]

const faqs = [
  {
    question: "What if a trap snaps on me?",
    answer: "That's part of the game! Shake it off and keep playing! Experienced players recommend taking a brief break to apply pressure, then returning to the table with renewed focus.",
  },
  {
    question: "Can I wear gloves?",
    answer: "Gloves are strictly prohibited in tournament play. The game is designed to be experienced FIRSTHAND, and anything that reduces tactile feedback reduces the authentic Mousetrap Jenga experience.",
  },
  {
    question: "Is this safe for children?",
    answer: "Ages 8 and up! Adult supervision recommended. We recommend starting children on the Junior Snap Edition before graduating to Classic Mousetrap Jenga around age 10 or 11.",
  },
  {
    question: "Is this legal?",
    answer: "Mousetrap Jenga is legal in most states! Check your local regulations. (We are currently restricted in Minnesota, New Jersey, and parts of Oregon — we are working on it.)",
  },
  {
    question: "What's the record for consecutive turns without injury?",
    answer: "Four. It was Morty Abernathy, 1987. It has never been beaten. Morty refuses to discuss how the attempt ended.",
  },
  {
    question: "Can I play alone?",
    answer: "Yes, but it's more fun with friends! Solo play is technically 'practice' and doesn't count toward your tournament record.",
  },
]

export default function MousetrapJengaHowToPlay() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">LEARN TO PLAY!</h1>
          <p className="text-xl md:text-2xl mt-4 text-[#FFF6E8]/90">In just 4 easy steps!</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {steps.map((step) => (
            <article
              key={step.n}
              className="bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C]"
            >
              <div className="relative aspect-[4/3] border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
                <Image src={step.image} alt={`Step ${step.n}: ${step.title}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="p-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-heading text-6xl text-[#D4281F] leading-none">{step.n}</span>
                  <h2 className="font-heading text-2xl text-[#1A1F4C]">{step.title}</h2>
                </div>
                <p className="text-[#1A1F4C]/80">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </InfomercialBand>

      {/* Rules callout */}
      <InfomercialBand bgColor="secondary" verticalPadding="md">
        <div className="max-w-3xl mx-auto border-4 border-[#1A1F4C] bg-[#FFF6E8] p-6 shadow-[6px_6px_0_0_#1A1F4C]">
          <h2 className="font-heading text-2xl text-[#D4281F] mb-3 text-center">Rules &amp; Scoring</h2>
          <ul className="space-y-2 text-[#1A1F4C]/90">
            <li><strong>Scoring:</strong> Points are awarded for successful trap removals. Injuries do NOT affect scoring. (They affect many other things, but not scoring.)</li>
            <li><strong>Winning:</strong> The player with the highest score at the end of the game wins. Ties are broken by finger count.</li>
            <li><strong>Fouls:</strong> Flinching, hesitating, or attempting to &ldquo;disarm&rdquo; traps mid-game is a foul and results in a 5-point penalty.</li>
            <li><strong>Game length:</strong> Classic games last 15-30 minutes. Bear Trap Tournament matches can go longer. Consult your local emergency room&apos;s hours before starting.</li>
          </ul>
        </div>
      </InfomercialBand>

      {/* FAQ */}
      <InfomercialBand bgColor="background" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <FaqAccordion items={faqs} />
        </div>
      </InfomercialBand>
    </>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors. If `FaqAccordion` prop shape differs (e.g., uses `question`/`answer` vs. `q`/`a`), adjust to match. Check `src/components/ui/faq-accordion.tsx` for the exact interface.

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/pages/how-to-play.tsx
git commit -m "feat(mousetrapjenga): implement How to Play page

4 numbered step cards with generated illustrations, rules & scoring
callout, and a 6-question FAQ accordion covering the safety,
legality, and the untouchable 1987 Abernathy record."
```

---

## Task 14: Hall of Fame page

**Files:**
- Modify: `src/sites/mousetrapjenga/pages/hall-of-fame.tsx`

- [ ] **Step 1: Replace the hall-of-fame placeholder**

```tsx
import { getPortrait } from "@/data/testimonial-portraits"
import { InfomercialBand } from "../components/InfomercialBand"
import { TradingCard } from "../components/TradingCard"

export const metadata = {
  title: "Hall of Fame — Mousetrap Jenga",
  description: "The legends of the Mousetrap Jenga championship circuit.",
}

const foundingEra = [
  {
    name: "Harold Pemberton",
    nickname: "Hammerhand",
    hometown: "Cedar Rapids, IA",
    portrait: "/sites/mousetrapjenga/champion-pemberton.png",
    championships: 47,
    digitsRemaining: 8,
    famousFor: "The Founder Himself. Invented the game in 1978 and has played every sanctioned tournament since. Still competes in the over-50 division.",
  },
  {
    name: "Delbert Wickham",
    nickname: "Lefty",
    hometown: "Scranton, PA",
    portrait: "/sites/mousetrapjenga/champion-wickham.png",
    championships: 31,
    digitsRemaining: 6,
    famousFor: "Known for his daring left-hand reaches. Earned his nickname in 1984 after the switch became non-optional.",
  },
  {
    name: "Morty Abernathy",
    nickname: "Jumpy",
    hometown: "Des Moines, IA",
    portrait: "/sites/mousetrapjenga/champion-abernathy.png",
    championships: 28,
    digitsRemaining: 7,
    famousFor: "Inventor of the Abernathy Hesitation, a technique still used by elite players today. Holds the 1987 record that has never been broken.",
  },
  {
    name: "Eugene Fink",
    nickname: "Steady Eugene",
    hometown: "Dubuque, IA",
    portrait: "/sites/mousetrapjenga/champion-fink.png",
    championships: 22,
    digitsRemaining: 9,
    famousFor: "The safest player in the Hall. Has never needed a stitch. His bandage discipline is legendary and widely studied.",
  },
]

const contemporaryEra = [
  {
    nickname: "The Wrecker",
    portraitSlug: "ryan-ashford",
    hometown: "Omaha, NE",
    championships: 14,
    digitsRemaining: 5,
    famousFor: "Famous for calling his shot before every attempt. Has successfully called 19 of his 38 career finger losses.",
  },
  {
    nickname: "The Grinner",
    portraitSlug: "simone-archer",
    hometown: "Kansas City, MO",
    championships: 11,
    digitsRemaining: 7,
    famousFor: "Never stops smiling. Not even during. Especially not during.",
  },
  {
    nickname: "The Professor",
    portraitSlug: "francois-delacroix",
    hometown: "Boston, MA",
    championships: 9,
    digitsRemaining: 8,
    famousFor: "Wrote the definitive textbook on Mousetrap Jenga strategy. Most copies are signed with an X.",
  },
]

export default function MousetrapJengaHallOfFame() {
  return (
    <>
      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <div className="text-center">
          <p className="font-heading text-2xl text-[#D4281F]">★ ★ ★</p>
          <h1 className="font-heading text-5xl md:text-6xl text-[#1A1F4C] mt-2">THE LEGENDS</h1>
          <p className="font-heading text-xl text-[#D4281F] mt-2">of Mousetrap Jenga</p>
          <p className="text-[#1A1F4C]/70 italic mt-4 max-w-2xl mx-auto">
            Honoring the greatest players to ever approach the tower. Their courage lives on in every empty trap and every remaining finger.
          </p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Founding Era</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">1978 – 1995</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
          {foundingEra.map((player) => (
            <TradingCard key={player.name} era="founding" {...player} />
          ))}
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Contemporary Era</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">2000 – present</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {contemporaryEra.map((player) => {
            const portrait = getPortrait(player.portraitSlug)
            if (!portrait) return null
            return (
              <TradingCard
                key={portrait.slug}
                era="contemporary"
                name={portrait.name}
                nickname={player.nickname}
                hometown={player.hometown}
                portrait={portrait.image}
                championships={player.championships}
                digitsRemaining={player.digitsRemaining}
                famousFor={player.famousFor}
              />
            )
          })}
        </div>
      </InfomercialBand>
    </>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/pages/hall-of-fame.tsx
git commit -m "feat(mousetrapjenga): implement Hall of Fame page

4 Founding Era champions (using base-person portraits generated as
retro trading cards) + 3 Contemporary Era champions (using shared
portrait pool). Each card uses the TradingCard component with stats
block and famous-for tagline."
```

---

## Task 15: About page

**Files:**
- Modify: `src/sites/mousetrapjenga/pages/about.tsx`

- [ ] **Step 1: Replace the about placeholder**

Check first how snortables uses `Timeline` and `TeamMember` — their prop shapes — by reading `src/sites/snortables/pages/about.tsx` and/or the component source files in `src/components/ui/`.

```tsx
import Image from "next/image"
import { Timeline } from "@/components/ui/timeline"
import { TeamMember } from "@/components/ui/team-member"
import { InfomercialBand } from "../components/InfomercialBand"
import { executives } from "../data/leadership"

export const metadata = {
  title: "About — Mousetrap Jenga",
  description: "America's favorite backyard inventors since 1978.",
}

const timelineEvents = [
  { year: "1978", title: "The Idea", description: "Harold Pemberton builds the first prototype on his kitchen table in Cedar Rapids, Iowa." },
  { year: "1982", title: "Retail Launch", description: "First commercial run of 500 units sells out in Cedar Rapids in under three weeks." },
  { year: "1985", title: "As Seen On TV", description: "National late-night television campaign introduces Mousetrap Jenga to millions of American families." },
  { year: "1989", title: "Bear Trap Edition", description: "The Tournament Edition debuts, establishing the competitive Mousetrap Jenga circuit." },
  { year: "1995", title: "Briefly Banned", description: "Three states attempt to ban the game. Sales triple within six weeks." },
  { year: "2003", title: "Hall of Fame", description: "The Mousetrap Jenga Hall of Fame is founded in Cedar Rapids, honoring the sport's greatest players." },
  { year: "2026", title: "Still Family-Owned", description: "Harold Pemberton still personally approves every production run. Still fun for the whole family!" },
]

export default function MousetrapJengaAbout() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C] leading-tight">
              America&apos;s Favorite Backyard Inventors
            </h1>
            <p className="text-xl text-[#FFF6E8]/90 mt-6">Since 1978.</p>
          </div>
          <div className="relative aspect-[4/3] border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] bg-[#FFF6E8]">
            <Image src="/sites/mousetrapjenga/about-hero.png" alt="Harold Pemberton's basement workshop in 1978" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="max-w-3xl mx-auto prose-lg text-[#1A1F4C]/90 space-y-5">
          <h2 className="font-heading text-3xl text-[#D4281F]">A Basement, A Rainy Saturday, An Idea.</h2>
          <p>
            The year was 1978. Harold Pemberton, a Cedar Rapids spring engineer and father of three, was stuck inside on
            a rainy Saturday with his kids. The family&apos;s board game collection had failed to produce what Harold
            described as &ldquo;sufficient excitement.&rdquo; Scrabble was boring. Monopoly took too long. Regular Jenga
            was — in Harold&apos;s own words — &ldquo;frankly unambitious.&rdquo;
          </p>
          <p>
            Harold went down to his basement workshop with a box of surplus mouse traps and a bag of wooden blocks he&apos;d
            been saving for a birdhouse. Three hours later, the first prototype of Mousetrap Jenga stood on his kitchen
            table. Six hours later, his nephew Vinnie made the first recorded trip to the emergency room.
          </p>
          <p>
            The rest is American history. From that kitchen table, Mousetrap Jenga has grown into a beloved family
            tradition played in living rooms across the country. Harold still personally approves every production run.
            His original prototype is on display at the Mousetrap Jenga Hall of Fame in Cedar Rapids. Vinnie is doing
            fine, thank you for asking.
          </p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-10">Our Storied History</h2>
        <Timeline events={timelineEvents} />
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Meet the Inventors</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">The team behind America&apos;s favorite family game.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {executives.map((exec) => (
            <TeamMember
              key={exec.slug}
              name={exec.name}
              title={exec.title}
              bio={exec.bio}
              quote={exec.quote}
              image={exec.image}
            />
          ))}
        </div>
      </InfomercialBand>
    </>
  )
}
```

**Important:** Check `src/components/ui/timeline.tsx` and `src/components/ui/team-member.tsx` for the actual prop interfaces and adjust if the field names differ (e.g., `events` vs `items`, or if `TeamMember` needs additional props). Mirror whatever snortables uses.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors. Fix any prop mismatches surfaced.

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/pages/about.tsx
git commit -m "feat(mousetrapjenga): implement About page

Founding-story hero, origin narrative ('A Basement, A Rainy Saturday,
An Idea'), 7-event Timeline from 1978 to 2026, and a 'Meet the
Inventors' team grid with all four executives."
```

---

## Task 16: Testimonials page

**Files:**
- Modify: `src/sites/mousetrapjenga/pages/testimonials.tsx`

- [ ] **Step 1: Replace the testimonials placeholder**

```tsx
import Image from "next/image"
import { InfomercialBand } from "../components/InfomercialBand"
import { testimonials } from "../data/testimonials"

export const metadata = {
  title: "Testimonials — Mousetrap Jenga",
  description: "America says: YES PLEASE!",
}

export default function MousetrapJengaTestimonials() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">AMERICA SAYS:</h1>
          <p className="font-heading text-4xl md:text-5xl text-[#FFF6E8] mt-2">&ldquo;YES PLEASE!&rdquo;</p>
          <p className="text-[#FFF6E8]/80 mt-6 max-w-2xl mx-auto">
            Real families. Real fun. Real emergency room visits. Here&apos;s what our customers are saying about their Mousetrap Jenga experience!
          </p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <figure
              key={t.name + t.quote.slice(0, 20)}
              className="bg-[#FFF6E8] border-4 border-[#1A1F4C] p-6 shadow-[6px_6px_0_0_#1A1F4C]"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-20 h-20 border-2 border-[#1A1F4C] overflow-hidden flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="80px" />
                </div>
                <figcaption>
                  <div className="font-heading text-xl text-[#1A1F4C] leading-tight">{t.name}</div>
                  <div className="text-xs text-[#1A1F4C]/70 mt-1">{t.title}</div>
                </figcaption>
              </div>
              <blockquote className="text-[#1A1F4C]/90 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-4 pt-4 border-t-2 border-dashed border-[#1A1F4C]/30 text-[#D4281F] font-heading text-lg text-center">
                ★ ★ ★ ★ ★
              </div>
            </figure>
          ))}
        </div>
      </InfomercialBand>
    </>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/pages/testimonials.tsx
git commit -m "feat(mousetrapjenga): implement Testimonials page

8-card grid pulling from data/testimonials.ts. Each card shows the
reused shared-pool portrait, name, title-with-injury-status, quote,
and a five-star banner."
```

---

## Task 17: Contact page

**Files:**
- Modify: `src/sites/mousetrapjenga/pages/contact.tsx`

- [ ] **Step 1: Replace the contact placeholder**

```tsx
import Image from "next/image"
import { InfomercialBand } from "../components/InfomercialBand"

export const metadata = {
  title: "Contact — Mousetrap Jenga",
  description: "Call now! Operators are standing by!",
}

export default function MousetrapJengaContact() {
  return (
    <>
      <InfomercialBand bgColor="secondary" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <div className="inline-block bg-[#D4281F] text-[#FFF6E8] px-4 py-1 font-bold uppercase text-sm tracking-wider mb-4 border-2 border-[#1A1F4C] shadow-[4px_4px_0_0_#1A1F4C]">
            Operators Are Standing By!
          </div>
          <h1 className="font-heading text-5xl md:text-7xl text-[#D4281F] drop-shadow-[4px_4px_0_#1A1F4C]">CALL NOW!</h1>
          <p className="font-heading text-4xl md:text-6xl text-[#1A1F4C] mt-4 tracking-tight">1-800-JENGA-OW</p>
          <p className="text-[#1A1F4C]/70 mt-4 italic">(Phone number is for display purposes only. Please use the order form below.)</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Phone bank vignette */}
          <div className="relative aspect-square border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] bg-[#F5E8CE]">
            <Image src="/sites/mousetrapjenga/contact-operators.png" alt="Cheerful 1980s phone bank operators" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>

          {/* Fake mail-order form */}
          <div className="bg-[#FFD23F] border-4 border-[#1A1F4C] p-6 shadow-[8px_8px_0_0_#1A1F4C]">
            <h2 className="font-heading text-3xl text-[#D4281F] text-center mb-1">THE MAIL-ORDER FORM</h2>
            <p className="text-xs text-center text-[#1A1F4C]/70 mb-6 italic">Of the Future!</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1F4C] mb-1">Name</label>
                <input type="text" className="w-full border-2 border-[#1A1F4C] bg-[#FFF6E8] px-3 py-2 font-mono text-sm" placeholder="Your name here" disabled />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1F4C] mb-1">Mailing Address</label>
                <input type="text" className="w-full border-2 border-[#1A1F4C] bg-[#FFF6E8] px-3 py-2 font-mono text-sm" placeholder="Your street address" disabled />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1F4C] mb-1">Number of Fingers (for fit)</label>
                <input type="text" className="w-full border-2 border-[#1A1F4C] bg-[#FFF6E8] px-3 py-2 font-mono text-sm" placeholder="8-10 recommended" disabled />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1F4C] mb-1">Edition of Choice</label>
                <input type="text" className="w-full border-2 border-[#1A1F4C] bg-[#FFF6E8] px-3 py-2 font-mono text-sm" placeholder="Classic / Rat Trap Pro / Bear Trap / ..." disabled />
              </div>
              <button type="submit" disabled className="w-full bg-[#D4281F] text-[#FFF6E8] font-heading text-xl uppercase py-3 border-4 border-[#1A1F4C] shadow-[4px_4px_0_0_#1A1F4C] cursor-not-allowed opacity-80">
                Send Order by Mail!
              </button>
              <p className="text-xs text-center text-[#1A1F4C]/70 italic">
                (Form is decorative. For actual orders, please use the online shop.)
              </p>
            </form>
          </div>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="cream-dark" verticalPadding="md">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl text-[#1A1F4C] mb-3">Mail Us The Old-Fashioned Way!</h2>
          <address className="not-italic font-mono text-[#1A1F4C] mb-8">
            Mousetrap Jenga Inc.<br />
            PO Box 12<br />
            Cedar Rapids, IA 52401
          </address>
          <p className="text-[10px] text-[#1A1F4C]/60 mt-12">
            Press &amp; business inquiries: <a href="mailto:bsambrone@gmail.com" className="underline hover:text-[#D4281F]">bsambrone@gmail.com</a>
          </p>
        </div>
      </InfomercialBand>
    </>
  )
}
```

**Important:** The `<form>` uses `onSubmit={(e) => e.preventDefault()}`, which requires the component to be a client component. Add `"use client"` at the very top of the file as the first line. If that's not desired (since this page has no other client state), alternatively remove the onSubmit handler and keep the form purely decorative with disabled inputs — that keeps it as a server component.

Simpler route: remove the onSubmit handler entirely (all inputs are already `disabled` and the button is disabled, so there's no submission to prevent), and keep the file as a server component without `"use client"`.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/sites/mousetrapjenga/pages/contact.tsx
git commit -m "feat(mousetrapjenga): implement Contact page

Infomercial 'CALL NOW!' styling with huge 1-800-JENGA-OW, a
cartoon-phone-bank vignette image, a decorative fake mail-order form,
and the Cedar Rapids PO Box address. Includes the required real
contact email (bsambrone@gmail.com) in small print per the
cross-portfolio standard pattern."
```

---

## Task 18: Privacy and Terms pages

**Files:**
- Modify: `src/sites/mousetrapjenga/pages/privacy.tsx`
- Modify: `src/sites/mousetrapjenga/pages/terms.tsx`

- [ ] **Step 1: Write the privacy page**

```tsx
import { InfomercialBand } from "../components/InfomercialBand"

export const metadata = {
  title: "Privacy Policy — Mousetrap Jenga",
  description: "How Mousetrap Jenga handles your data. Spoiler: we take it as seriously as family fun!",
}

export default function MousetrapJengaPrivacy() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">Privacy Policy</h1>
          <p className="text-[#FFF6E8]/90 mt-4 italic">We take your privacy as seriously as we take family fun! (That&apos;s VERY seriously!)</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="max-w-3xl mx-auto space-y-6 text-[#1A1F4C]/90">
          <div className="border-4 border-[#1A1F4C] bg-[#FFD23F] p-5 shadow-[6px_6px_0_0_#1A1F4C]">
            <p className="font-bold text-[#1A1F4C] mb-2">Official Umbrella Policy</p>
            <p className="text-sm">
              The authoritative privacy policy for all Specific Industries properties — including Mousetrap Jenga — is maintained at{" "}
              <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#D4281F] hover:text-[#1A1F4C]">specificindustries.com/privacy</a>.
              The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
            </p>
          </div>

          <p className="text-sm italic text-[#1A1F4C]/60">Last updated: Whenever our legal team finishes their lunch break.</p>

          <h2 className="font-heading text-2xl text-[#D4281F]">1. What We Collect</h2>
          <p>
            We collect your name, mailing address, edition preference, and an estimate of your starting finger count (for product fit purposes). We do NOT collect your ending finger count — that&apos;s between you and your household.
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">2. What We Don&apos;t Collect</h2>
          <p>
            We do not collect judgment. If you&apos;re here shopping for a game that is advertised as &ldquo;the best way to lose a finger,&rdquo; we are in no position to criticize your choices. Welcome to the family!
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">3. How We Use Your Information</h2>
          <p>
            Your information is used to fulfill orders, send you exciting product updates, and occasionally mail you commemorative certificates when you achieve new milestones (first injury, first championship, first amputation, etc.).
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">4. Cookies</h2>
          <p>
            This website uses digital cookies, not the kind that crumble. The crumble kind come with every Home Tournament Scoreboard order (limited-time offer).
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">5. Your Rights</h2>
          <p>
            You may request a copy of all personal data we hold about you. It will be mailed to the address on file in a sturdy manila envelope with a hand-written &ldquo;FRAGILE&rdquo; label, even though it&apos;s just paper.
          </p>

          <p className="text-sm italic text-[#1A1F4C]/60 pt-4 border-t border-[#1A1F4C]/20">
            For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
            <a href="https://specificindustries.com/privacy" className="underline text-[#D4281F]">specificindustries.com/privacy</a>.
          </p>
        </div>
      </InfomercialBand>
    </>
  )
}
```

- [ ] **Step 2: Write the terms page**

```tsx
import { InfomercialBand } from "../components/InfomercialBand"

export const metadata = {
  title: "Terms of Use — Mousetrap Jenga",
  description: "By playing Mousetrap Jenga, you agree to these terms.",
}

export default function MousetrapJengaTerms() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">Terms of Use</h1>
          <p className="text-[#FFF6E8]/90 mt-4 italic">By playing, you agree to these terms!</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="max-w-3xl mx-auto space-y-6 text-[#1A1F4C]/90">
          <div className="border-4 border-[#1A1F4C] bg-[#FFD23F] p-5 shadow-[6px_6px_0_0_#1A1F4C]">
            <p className="font-bold text-[#1A1F4C] mb-2">Official Umbrella Policy</p>
            <p className="text-sm">
              The authoritative Terms of Use for all Specific Industries properties — including Mousetrap Jenga — is maintained at{" "}
              <a href="https://specificindustries.com/terms" className="underline font-bold text-[#D4281F] hover:text-[#1A1F4C]">specificindustries.com/terms</a>.
              The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
            </p>
          </div>

          <p className="text-sm italic text-[#1A1F4C]/60">Last updated: Whenever our legal team is feeling brave.</p>

          <h2 className="font-heading text-2xl text-[#D4281F]">1. Acceptance</h2>
          <p>
            By purchasing, unboxing, assembling, arming, or otherwise engaging with any Mousetrap Jenga product, you agree to these Terms of Use. You also agree that you have read the instructions, the warnings, and the laminated card titled &ldquo;What to Tell the Paramedics.&rdquo;
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">2. Assumption of Risk</h2>
          <p>
            Mousetrap Jenga is, by design, a game that involves armed traps. Players voluntarily assume all risks associated with gameplay, including but not limited to: pinched fingers, bruised fingers, slightly-crushed fingers, very-crushed fingers, and (in the case of certain premium editions) entire limbs.
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">3. Age Restrictions</h2>
          <p>
            Mousetrap Jenga is rated for ages 8 and up! We trust parents and guardians to determine whether their children are mature enough to play. We do NOT trust the parents who bought the Leg-Hold Championship for a child&apos;s birthday party, and we regret mailing that order.
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">4. Warranty</h2>
          <p>
            All Mousetrap Jenga products come with a cheerful 30-day limited warranty covering manufacturing defects. The warranty does NOT cover damage from normal gameplay (including trap deployment into yourself) because that&apos;s, you know, the game.
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">5. Tournament Conduct</h2>
          <p>
            Players participating in sanctioned Mousetrap Jenga tournaments must adhere to the Code of Conduct established by Commissioner Harold Pemberton. Violators may be disqualified, fined, or (for severe violations) asked to please stop coming to our tournaments.
          </p>

          <p className="text-sm italic text-[#1A1F4C]/60 pt-4 border-t border-[#1A1F4C]/20">
            For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
            <a href="https://specificindustries.com/terms" className="underline text-[#D4281F]">specificindustries.com/terms</a>.
          </p>
        </div>
      </InfomercialBand>
    </>
  )
}
```

- [ ] **Step 3: Type-check and build**

Run: `npx tsc --noEmit`
Expected: no errors

Run: `npm run build`
Expected: build succeeds for all 12 mousetrapjenga pages plus the dynamic product route

- [ ] **Step 4: Commit**

```bash
git add src/sites/mousetrapjenga/pages/privacy.tsx src/sites/mousetrapjenga/pages/terms.tsx
git commit -m "feat(mousetrapjenga): implement privacy and terms pages

Both pages open with a prominent 'Official Umbrella Policy' callout
pointing at specificindustries.com per the portfolio standard, then
fall into in-voice flavor text. No site-specific legal language."
```

---

## Task 19: Image generation script

**Files:**
- Create: `scripts/generate-mousetrapjenga-images.ts`

**Reference:** Read `scripts/generate-snortables-images.ts` in full before starting. Copy its helper functions (`getPersonPhotos`, `generateImage`, `generateImageWithPerson`) verbatim — they're already idempotent and handle the env-loading, dotenv-free .env parsing, and the `toFile` wrapping for person-based generation. The only things that differ for mousetrapjenga are the output directory and the image list.

- [ ] **Step 1: Create the script**

Create `scripts/generate-mousetrapjenga-images.ts`. Structure:

```typescript
/**
 * Generate all Mousetrap Jenga site images using OpenAI's image APIs.
 *
 * Usage:  npx tsx scripts/generate-mousetrapjenga-images.ts
 *
 * Reads OPENAI_API_KEY from .env in project root.
 * Outputs to public/sites/mousetrapjenga/.
 * Skips images that already exist (delete a file to regenerate it).
 */

import OpenAI, { toFile } from "openai";
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

// Load .env manually (no dotenv dependency needed)
const envPath = path.resolve(__dirname, "../.env");
const envContents = readFileSync(envPath, "utf-8");
for (const line of envContents.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (match) process.env[match[1]] = match[2];
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const OUT_DIR = path.resolve(__dirname, "../public/sites/mousetrapjenga");
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images");

mkdirSync(OUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getPersonPhotos(name: string, count = 2): string[] {
  const dir = path.join(BASE_IMAGES_DIR, name);
  const files = readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  const shuffled = [...files].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((f) => path.join(dir, f));
}

function mimeFromExtension(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

async function generateImage(
  filename: string,
  prompt: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
) {
  const outPath = path.join(OUT_DIR, filename);
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`);
    return;
  }

  console.log(`  GEN   ${filename} ...`);
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt,
    size,
    quality: "high",
  });

  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image data returned for ${filename}`);
  writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`  DONE  ${filename}`);
}

async function generateImageWithPerson(
  filename: string,
  prompt: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
) {
  const outPath = path.join(OUT_DIR, filename);
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`);
    return;
  }

  const photos = getPersonPhotos(person);
  console.log(`  GEN   ${filename} (person: ${person}, refs: ${photos.map((p) => path.basename(p)).join(", ")}) ...`);

  const imageFiles = await Promise.all(
    photos.map((p) =>
      toFile(readFileSync(p), path.basename(p), { type: mimeFromExtension(p) })
    )
  );

  const response = await openai.images.edit({
    model: "gpt-image-1" as any,
    image: imageFiles as any,
    prompt,
    size,
  });

  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image data returned for ${filename}`);
  writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`  DONE  ${filename}`);
}

// ---------------------------------------------------------------------------
// Style prompt — reused across many images
// ---------------------------------------------------------------------------

const TOY_STORE_STYLE =
  "1980s retro American toy-store box art style. Chunky Cooper Black / Bowlby One style title lettering. " +
  "Primary red (#D4281F), sunburst yellow (#FFD23F), turquoise (#2BB9B9) palette on a warm cream (#FFF6E8) background. " +
  "Comic-book action bursts, NEW! starbursts, thick black outlines. Cheerful infomercial energy, Milton Bradley / Parker Brothers era. " +
  "Flat painterly illustration with subtle gradients, not photorealistic."

const BOX_ART_PROMPT = (productName: string, productDesc: string) =>
  `A retro 1980s toy-store product box for "${productName}" — Mousetrap Jenga edition. ` +
  `${productDesc} ` +
  `${TOY_STORE_STYLE} ` +
  `The box should prominently feature the title "${productName.toUpperCase()}" at the top in chunky block lettering, ` +
  `with a product illustration below showing the contents in action. Include a faux "NEW!" starburst corner badge. ` +
  `Family-friendly cheerful composition. Front-facing box photograph style, as if displayed on a toy store shelf.`

// ---------------------------------------------------------------------------
// Image manifest — all 24 generations
// ---------------------------------------------------------------------------

async function main() {
  console.log("Generating Mousetrap Jenga site imagery...\n");

  // === Batch 1: Site hero / background (3) ===
  console.log("Batch 1: Site hero + background\n");

  await generateImage(
    "hero.png",
    `A mid-1980s American family (parents and two kids, ages 8-12) gathered around a wood-paneled rec-room table ` +
      `playing a board game with small mouse traps stacked into a Jenga-style tower. Everyone is smiling and laughing ` +
      `in a cheerful infomercial way. One child's hand is wrapped in a fresh white bandage — visible but not alarming. ` +
      `Warm incandescent lighting, orange shag carpet visible, vintage wood paneling. ` +
      `${TOY_STORE_STYLE} Photograph-like flat illustration, like a vintage toy commercial still.`,
    "1536x1024",
  );

  await generateImage(
    "about-hero.png",
    `A 1978 basement workshop: wood-paneled walls, a cluttered workbench covered in mouse traps, wooden blocks, ` +
      `spring coils, and a half-assembled prototype of a Jenga-style trap-stacking game. A single incandescent work lamp ` +
      `illuminates the scene. Small framed photos of the family on a shelf. No people visible. Warm sepia-tinted lighting. ` +
      `${TOY_STORE_STYLE} Nostalgic founding-moment composition.`,
    "1536x1024",
  );

  await generateImage(
    "contact-operators.png",
    `A cheerful 1980s infomercial phone bank scene: four friendly operators wearing headsets and matching red shirts, ` +
      `sitting at a long desk with vintage beige office phones. Big smiles, thumbs up, cartoon-style. ` +
      `${TOY_STORE_STYLE} Cheerful promotional illustration.`,
    "1024x1024",
  );

  // === Batch 2: Product box art (8) ===
  console.log("\nBatch 2: Product box art\n");

  await generateImage(
    "product-junior-snap.png",
    BOX_ART_PROMPT(
      "Junior Snap Edition",
      "A children's version of Mousetrap Jenga featuring 12 pastel-colored plastic trainer traps. Safe for kids ages 8 and up. The box shows a happy young child carefully placing a small plastic trap on top of a stacked tower.",
    ),
  );

  await generateImage(
    "product-classic.png",
    BOX_ART_PROMPT(
      "Classic Mousetrap Jenga",
      "The flagship edition: 18 genuine American-made steel mouse traps stacked into a Jenga-style tower. The iconic red-and-yellow box design. The box illustration shows a family gathered around the tower with cheerful anticipation.",
    ),
  );

  await generateImage(
    "product-rat-trap-pro.png",
    BOX_ART_PROMPT(
      "Rat Trap Pro",
      "The advanced edition: 12 large commercial-grade rat traps stacked into a larger tower. More serious, pro-tournament branding. Darker red color with gold accents on the box.",
    ),
  );

  await generateImage(
    "product-bear-trap-tournament.png",
    BOX_ART_PROMPT(
      "Bear Trap Tournament Edition",
      "The premium tournament edition: four large bear traps arranged around a wooden presentation case with brass hardware and velvet interior. Gold-foiled box with a championship-style design. Elegant, aspirational branding.",
    ),
  );

  await generateImage(
    "product-leghold-championship.png",
    BOX_ART_PROMPT(
      "Industrial Leg-Hold Championship",
      "The ultimate halo product: two massive industrial leg-hold traps in an engraved steel carry case. Austere, intimidating, serious branding. Metallic silver and deep red color scheme. Limited edition numbered badge visible on the box.",
    ),
  );

  await generateImage(
    "product-recovery-pack.png",
    BOX_ART_PROMPT(
      "The Official Recovery Pack",
      "A bright cheerful first-aid kit designed as a game accessory. The box shows bandages, gauze, and a tourniquet arranged playfully. A smiling cartoon mascot holding a band-aid. Reassuring, friendly, family-oriented design.",
    ),
  );

  await generateImage(
    "product-trap-refill-12pk.png",
    BOX_ART_PROMPT(
      "Trap Refill 12-Pack",
      "A utilitarian refill box showing 12 factory-fresh mouse traps neatly arranged. 'SUBSCRIBE TO SAVE!' starburst badge. Practical industrial accessory design with the signature cheerful branding.",
    ),
  );

  await generateImage(
    "product-scoreboard.png",
    BOX_ART_PROMPT(
      "Home Tournament Scoreboard",
      "A handcrafted wooden scoreboard with brass peg markers. Box illustration shows the scoreboard mounted on a rec-room wall with family members smiling proudly beside it. Elegant heirloom quality product shot.",
    ),
  );

  // === Batch 3: Leadership "inventor" portraits (4) ===
  console.log("\nBatch 3: Leadership inventor portraits\n");

  await generateImageWithPerson(
    "exec-pemberton.png",
    `Portrait of a kindly 1980s American toy-company founder in a wood-paneled workshop. Wearing a cardigan and ` +
      `button-down shirt, holding a mouse trap prototype up to examine it. Warm incandescent lighting, cluttered workbench ` +
      `visible behind him with springs and wooden blocks. Confident, grandfatherly, inventor-type energy. ` +
      `Styled as a vintage Milton Bradley / Parker Brothers founding-family portrait. Warm sepia-tinted color grading.`,
    "bill",
  );

  await generateImageWithPerson(
    "exec-wickham.png",
    `Portrait of a 1980s R&D engineer in a factory lab coat, holding up a large steel spring with both hands like ` +
      `he's proud of it. Cluttered spring-testing equipment behind him. Serious, focused expression. Wire-rim safety glasses. ` +
      `Styled as a vintage corporate R&D profile photo. Warm fluorescent lighting, 1980s factory aesthetic.`,
    "brandon",
  );

  await generateImageWithPerson(
    "exec-abernathy.png",
    `Portrait of a slightly rumpled 1980s playtester at a cluttered table, holding a set of Jenga-style blocks with ` +
      `mouse traps arranged on them. Tired but cheerful expression. His hands are visible and he has a small band-aid on ` +
      `one finger. Button-down shirt with rolled sleeves. Warm office lighting, casual professional vibe.`,
    "jim",
  );

  await generateImageWithPerson(
    "exec-fink.png",
    `Portrait of a 1980s safety officer in a high-visibility orange safety vest over a button-down shirt, standing ` +
      `in front of a well-organized first-aid station. Confident, reassuring smile, thumbs up. A clipboard tucked under ` +
      `his arm. Bright lighting. Safety-poster energy, cheerful and competent.`,
    "sean",
  );

  // === Batch 4: Hall of Fame champion portraits (4) ===
  console.log("\nBatch 4: Hall of Fame champion portraits\n");

  await generateImageWithPerson(
    "champion-pemberton.png",
    `A dramatic retro trading-card portrait of 'Hammerhand' Harold Pemberton, the founder and legendary player of ` +
      `Mousetrap Jenga. He wears a vintage 1980s tournament jacket with patches and a large championship medal around ` +
      `his neck. His hands are visible and show scars and missing fingernails. Proud, slightly weathered expression. ` +
      `Dramatic stage lighting, sepia-tinted color grading, like a vintage sports trading card portrait.`,
    "bill",
  );

  await generateImageWithPerson(
    "champion-wickham.png",
    `A dramatic retro trading-card portrait of 'Lefty' Delbert Wickham, a legendary Mousetrap Jenga tournament player. ` +
      `Vintage 1980s tournament jacket, championship patches. His left hand is prominently displayed with visible bandages ` +
      `wrapped around two fingers. Serious, proud expression. Dramatic stage lighting, sepia-tinted color grading, ` +
      `vintage sports trading card style.`,
    "brandon",
  );

  await generateImageWithPerson(
    "champion-abernathy.png",
    `A dramatic retro trading-card portrait of 'Jumpy' Morty Abernathy, a legendary Mousetrap Jenga tournament player ` +
      `and inventor of the Abernathy Hesitation technique. Vintage 1980s tournament jacket, championship patches. ` +
      `His hands are held in a classic Jenga-playing pose, showing small scars. Focused, intense expression. ` +
      `Dramatic stage lighting, sepia-tinted color grading, vintage sports trading card style.`,
    "jim",
  );

  await generateImageWithPerson(
    "champion-fink.png",
    `A dramatic retro trading-card portrait of 'Steady Eugene' Fink, considered the safest player in the Mousetrap Jenga ` +
      `Hall of Fame. Vintage 1980s tournament jacket with safety-orange trim. His hands are visible and notably intact — ` +
      `no bandages, no scars. Calm, confident expression. Dramatic stage lighting, sepia-tinted color grading, ` +
      `vintage sports trading card style.`,
    "sean",
  );

  // === Batch 5: How to Play step illustrations (4) ===
  console.log("\nBatch 5: How to Play step illustrations\n");

  await generateImage(
    "step-1-setup.png",
    `A cheerful 1980s storybook illustration showing two cartoon hands stacking small mouse traps into a Jenga-style ` +
      `tower on a kitchen table. Numbered "1" badge in the corner. Cream background, chunky black outlines, bright ` +
      `primary colors. ${TOY_STORE_STYLE}`,
  );

  await generateImage(
    "step-2-arm.png",
    `A cheerful 1980s storybook illustration showing cartoon hands carefully arming a mouse trap with a friendly ` +
      `expression, as if holding their breath. Numbered "2" badge in the corner. Cream background. ${TOY_STORE_STYLE}`,
  );

  await generateImage(
    "step-3-pull.png",
    `A cheerful 1980s storybook illustration showing cartoon hands carefully pulling an armed mouse trap from the ` +
      `middle of a stacked tower of mouse traps. Tower slightly leaning. Numbered "3" badge in the corner. ` +
      `Cream background. ${TOY_STORE_STYLE}`,
  );

  await generateImage(
    "step-4-crown.png",
    `A cheerful 1980s storybook illustration showing a smiling cartoon family member being crowned as the champion ` +
      `with a small toy crown, arms raised victorious. A scorecard visible. Numbered "4" badge in the corner. ` +
      `Cream background. ${TOY_STORE_STYLE}`,
  );

  // === Batch 6: Favicon (1) ===
  console.log("\nBatch 6: Favicon\n");

  await generateImage(
    "favicon.png",
    `A simple bold icon of a single classic American mouse trap in cherry red (#D4281F) on a cream background (#FFF6E8). ` +
      `Thick black outlines, flat vector-style illustration. Centered composition suitable for use as a website favicon. ` +
      `No text, no additional elements — just the trap icon.`,
  );

  console.log("\nAll done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit the script (do NOT run it yet)**

```bash
git add scripts/generate-mousetrapjenga-images.ts
git commit -m "feat(mousetrapjenga): add image generation script

24 generations total: 3 site heroes, 8 product box arts, 4 leadership
portraits (using base people + bill/brandon/jim/sean), 4 Hall of Fame
champion portraits (same base people, different styling), 4 How to
Play step illustrations, 1 favicon. Script is idempotent (skips
existing files). Follows the pattern of generate-snortables-images.ts."
```

---

## Task 20: Run the image generation script

**Files:**
- Create: `public/sites/mousetrapjenga/*.png` (24 files)

- [ ] **Step 1: Confirm OPENAI_API_KEY is in .env**

Run: `grep -c OPENAI_API_KEY .env`
Expected: `1`

If not, stop and ask the user before proceeding.

- [ ] **Step 2: Run the generation script**

Run: `npx tsx scripts/generate-mousetrapjenga-images.ts`
Expected: the script prints `GEN` and `DONE` lines for all 24 images in sequence. This will take roughly 15-30 minutes total and will cost real money via OpenAI.

If any single generation fails, the script will abort with an error. Investigate the error (usually a bad prompt, a missing base image directory, or a transient OpenAI hiccup). Fix and re-run — the script is idempotent and will skip already-generated files.

- [ ] **Step 3: Verify all 24 files were created**

Run: `ls public/sites/mousetrapjenga/*.png | wc -l`
Expected: `24`

- [ ] **Step 4: Commit the generated images**

```bash
git add public/sites/mousetrapjenga
git commit -m "chore(mousetrapjenga): add generated site images

24 images produced by scripts/generate-mousetrapjenga-images.ts:
hero + about-hero + contact-operators vignette, 8 product box
arts, 4 inventor portraits, 4 championship trading card portraits,
4 How to Play step illustrations, and the favicon."
```

---

## Task 21: Final verification

**Files:** none modified; this task only runs checks.

- [ ] **Step 1: Type check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors, warnings acceptable but worth reading

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds. Scan the build output for references to `mousetrapjenga` and confirm no broken images or 404s are reported.

- [ ] **Step 4: Dev server smoke test**

Run: `npm run dev` in the background, then visit these URLs in a browser (or fetch with curl and check for 200 + reasonable HTML):

```
http://localhost:3000/?site=mousetrapjenga
http://localhost:3000/products?site=mousetrapjenga
http://localhost:3000/products/classic?site=mousetrapjenga
http://localhost:3000/products/bear-trap-tournament?site=mousetrapjenga
http://localhost:3000/how-to-play?site=mousetrapjenga
http://localhost:3000/hall-of-fame?site=mousetrapjenga
http://localhost:3000/about?site=mousetrapjenga
http://localhost:3000/testimonials?site=mousetrapjenga
http://localhost:3000/contact?site=mousetrapjenga
http://localhost:3000/cart?site=mousetrapjenga
http://localhost:3000/checkout?site=mousetrapjenga
http://localhost:3000/privacy?site=mousetrapjenga
http://localhost:3000/terms?site=mousetrapjenga
```

Each should return 200 with Mousetrap Jenga branding. Also smoke-test snortables to make sure the testimonial portrait migration didn't break it:

```
http://localhost:3000/?site=snortables
http://localhost:3000/testimonials?site=snortables
```

Stop the dev server when done.

- [ ] **Step 5: Confirm standard-pattern compliance**

- ✅ Privacy and Terms pages open with the "Official Umbrella Policy" callout pointing at specificindustries.com
- ✅ Contact page contains `bsambrone@gmail.com` in small print (grep to confirm): `grep -c bsambrone@gmail.com src/sites/mousetrapjenga/pages/contact.tsx` → expected `1`
- ✅ Leadership data file uses fully-randomized names with `referencePerson` fields: `grep -c referencePerson src/sites/mousetrapjenga/data/leadership.ts` → expected `4`

- [ ] **Step 6: No commit needed for Task 21 unless fixes were required**

If any step in Task 21 surfaced a fix, commit it with an appropriate message.

---

## Notes for the executing agent

- **Every task ends with a commit.** Keep commits tight and scoped to one task. Do not batch multiple tasks into a single commit.
- **The build must succeed after every task** (except Task 20 which generates images and Task 21 which is verification-only). If `npx tsc --noEmit` or `npm run build` fails, fix it before committing.
- **Follow existing patterns.** When in doubt, check how snortables does something and match its approach.
- **Don't create new shared components.** The three site-local components (Starburst, InfomercialBand, TradingCard) should stay under `src/sites/mousetrapjenga/components/` — do NOT promote them to `src/components/`.
- **Do not modify the image-gen MCP or the shared commerce components.** This plan should only touch files under the paths listed in the File Map.
