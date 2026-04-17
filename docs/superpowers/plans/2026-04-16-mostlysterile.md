# Mostlysterile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new subdomain site `mostlysterile` — a satire e-commerce site for a sketchy back-alley medical supply company, presented in a "Defensive Legitimacy" voice (corporate surface, constant hedging). Ships with a 16-product catalog, a Certifications gallery, a 12-step Quality Assurance page, and one new shared `CertificationCard` component.

**Architecture:** Standard subdomain site following the established pattern (pigmilk, snortables, rocks, radiumroys). One folder under `src/sites/mostlysterile/` with config, barrel, data, and pages. All UI composes from existing shared components in `src/components/ui/` and `src/components/commerce/`, plus one new shared component (`CertificationCard`). The catch-all route plumbing already handles rendering — this work only adds files inside `src/sites/mostlysterile/`, one file under `src/components/ui/`, and three registry/integration touchpoints (`src/sites/registry.ts`, `src/sites/subdomains.ts`, `src/app/sitemap.ts`).

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, `next/font/google`. Per the spec, this codebase has no automated tests; verification is `npm run lint`, `npx tsc --noEmit`, and a manual `npm run dev` walkthrough.

**Spec:** `docs/superpowers/specs/2026-04-16-mostlysterile-site-design.md`

---

## Voice & Brand Reference Card

Every page in this plan must follow this voice. Pin it where you can see it.

- **Brand name:** Mostlysterile
- **Primary tagline:** *"Meeting or nearing industry standards since 2014."*
- **Voice:** Defensive Legitimacy. Write like a real corporate medical supply company; immediately hedge every confident claim with "*or comparable,*" "*where applicable,*" "*to the extent feasible,*" "*absent contraindication.*"
- **No winking.** The narrator believes Mostlysterile is a legitimate operation that is simply misunderstood. Never break the fourth wall.
- **Asterisks are the humor.** Use footnote-style asterisks liberally; the footnote text is a progressively weaker disclaimer.
- **Origin:** Founded 2014 in a self-storage unit by a lapsed pre-med student.
- **Service area:** "The tri-state area and occasionally elsewhere."
- **Address (used on contact page):** "Mostlysterile Distribution, Unit 47B, Storage Facility Off Route 9."

## File Map (everything this plan creates or modifies)

**Modifies:**
- `src/sites/registry.ts` — add mostlysterile entry (Task 1, updated in Task 5 to include dynamicRoutes)
- `src/sites/subdomains.ts` — add `"mostlysterile"` to `VALID_SUBDOMAINS` (Task 1)
- `src/app/sitemap.ts` — add mostlysterile products to `productSites` map (Task 5)

**Creates:**
- `src/components/ui/CertificationCard.tsx` — new shared component (Task 2)
- `src/sites/mostlysterile/config.ts` (Task 1)
- `src/sites/mostlysterile/index.ts` (Task 1, expanded in later tasks)
- `src/sites/mostlysterile/data/products.ts` (Task 3)
- `src/sites/mostlysterile/pages/home.tsx` (stub in Task 1, full version in Task 6)
- `src/sites/mostlysterile/pages/products.tsx` (Task 4)
- `src/sites/mostlysterile/pages/product-detail.tsx` (Task 5)
- `src/sites/mostlysterile/pages/about.tsx` (Task 7)
- `src/sites/mostlysterile/pages/certifications.tsx` (Task 8)
- `src/sites/mostlysterile/pages/quality-assurance.tsx` (Task 9)
- `src/sites/mostlysterile/pages/leadership.tsx` (Task 10)
- `src/sites/mostlysterile/pages/faq.tsx` (Task 11)
- `src/sites/mostlysterile/pages/contact.tsx` (Task 12)
- `src/sites/mostlysterile/pages/privacy.tsx` (Task 13)
- `src/sites/mostlysterile/pages/terms.tsx` (Task 14)
- `src/sites/mostlysterile/pages/cart.tsx` (Task 15)
- `src/sites/mostlysterile/pages/checkout.tsx` (Task 15)

No font changes required — `barlow-condensed` and `inter` are already in `src/themes/fonts.ts`.

---

## Task 1: Scaffold site with config, barrel, stub home, and registration

**Goal:** Get `mostlysterile` registered and serving a stub homepage at `localhost:3000/?site=mostlysterile`. Real content comes in subsequent tasks.

**Files:**
- Create: `src/sites/mostlysterile/config.ts`
- Create: `src/sites/mostlysterile/index.ts`
- Create: `src/sites/mostlysterile/pages/home.tsx` (stub)
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create the site config**

Create `src/sites/mostlysterile/config.ts` with the exact content below:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Mostlysterile",
  subdomain: "mostlysterile",
  theme: {
    preset: "light",
    colors: {
      primary: "#1e3a5f",
      secondary: "#9bc5b8",
      accent: "#e8c547",
      background: "#f6f4ee",
      text: "#0f1e2e",
    },
    fonts: {
      heading: "barlow-condensed",
      body: "inter",
    },
  },
  metadata: {
    title: "Mostlysterile — Meeting or Nearing Industry Standards Since 2014",
    description: "Surgical instruments, bandages, PPE, diagnostics, and hospital surplus at prices you can live with. Sterile enough.",
    ogImage: "/sites/mostlysterile/hero.png",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Certifications", path: "/certifications" },
    { label: "Quality", path: "/quality-assurance" },
    { label: "Leadership", path: "/leadership" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create the stub home page**

Create `src/sites/mostlysterile/pages/home.tsx` with a temporary stub so the barrel can import something. (We'll replace this with the full home page in Task 6.)

```typescript
export default function MostlysterileHome() {
  return (
    <section className="py-20 px-4 text-center">
      <h1 className="text-4xl font-heading font-bold text-primary">Mostlysterile</h1>
      <p className="mt-4 text-foreground/70">Coming soon — meeting or nearing industry standards since 2014.</p>
    </section>
  )
}
```

- [ ] **Step 3: Create the barrel index.ts**

Create `src/sites/mostlysterile/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import MostlysterileHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MostlysterileHome,
}
```

(We will expand this barrel in later tasks as more pages are added. `dynamicRoutes` will be added in Task 5.)

- [ ] **Step 4: Register in the site registry**

Modify `src/sites/registry.ts`. Add the import alongside the other imports. Add this line after the existing `radiumroys` import (around line 22):

```typescript
import { config as mostlysterileConfig, pages as mostlysterilePages } from "./mostlysterile"
```

Then add the registry entry after the `radiumroys:` line in `siteRegistry` (approximately line 45):

```typescript
  mostlysterile: { config: mostlysterileConfig, pages: mostlysterilePages },
```

(We will update this entry to include `dynamicRoutes` in Task 5.)

- [ ] **Step 5: Add subdomain to allowlist**

Modify `src/sites/subdomains.ts`. Add `"mostlysterile"` to the end of the `VALID_SUBDOMAINS` array, after `"radiumroys"`:

```typescript
export const VALID_SUBDOMAINS = [
  "apex",
  "pigmilk",
  "dehydratedwater",
  "inflatableanchors",
  "strategicvoid",
  "stratify",
  "truegrit",
  "grassfedwifi",
  "elderparty",
  "cleansheet",
  "snortables",
  "mousetrapjenga",
  "onlyfans",
  "onlypans",
  "bonelesswater",
  "gristmill",
  "oddoccasions",
  "pettential",
  "rocks",
  "squaredaway",
  "radiumroys",
  "mostlysterile",
] as const
```

- [ ] **Step 6: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both PASS — no errors.

- [ ] **Step 7: Smoke-test in dev server**

Run: `npm run dev` (in a background terminal)
Open `http://localhost:3000/?site=mostlysterile` in a browser.
Expected: page shows "Mostlysterile" heading and "Coming soon…" subhead, with the clinical navy color palette. Nav bar shows Home, Products, Certifications, Quality, Leadership, FAQ, Contact (later tasks will fill in those routes).
Stop the dev server after verification.

- [ ] **Step 8: Commit**

```bash
git add src/sites/mostlysterile/config.ts src/sites/mostlysterile/index.ts src/sites/mostlysterile/pages/home.tsx src/sites/registry.ts src/sites/subdomains.ts
git commit -m "feat(mostlysterile): scaffold site with config and stub home page"
```

---

## Task 2: Create the CertificationCard shared component

**Goal:** Build the one new shared UI component. `CertificationCard` renders a framed-credential card used by the `/certifications` page (and reusable across future sites).

**Files:**
- Create: `src/components/ui/CertificationCard.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/ui/CertificationCard.tsx` with the exact content below:

```typescript
interface CertificationCardProps {
  title: string
  issuer: string
  year: string
  note?: string
}

export function CertificationCard({ title, issuer, year, note }: CertificationCardProps) {
  return (
    <div className="relative border-2 border-primary bg-background p-6 text-center">
      {/* Decorative corner marks (mimics a framed diploma) */}
      <span className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-accent" aria-hidden="true" />
      <span className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-accent" aria-hidden="true" />
      <span className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-accent" aria-hidden="true" />
      <span className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-accent" aria-hidden="true" />

      {/* Ornamental seal */}
      <div className="mx-auto mb-4 w-14 h-14 rounded-full border-2 border-accent bg-accent/10 flex items-center justify-center">
        <span className="text-accent font-heading font-bold text-xl tracking-widest">MS</span>
      </div>

      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">Certificate of</p>
      <h3 className="text-xl font-heading font-bold uppercase tracking-wide text-primary leading-tight mb-4">
        {title}
      </h3>
      <p className="text-sm text-foreground/70 italic mb-1">Issued by</p>
      <p className="text-sm font-semibold text-foreground mb-3">{issuer}</p>
      <p className="text-xs uppercase tracking-widest text-foreground/60">{year}</p>
      {note && (
        <p className="text-[11px] italic text-foreground/50 mt-3 border-t border-primary/10 pt-2">
          {note}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both PASS — no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/CertificationCard.tsx
git commit -m "feat(ui): add CertificationCard shared component"
```

---

## Task 3: Build the 16-product data file

**Goal:** Ship the full product catalog with 16 entries across 6 categories, plus category metadata and lookup helpers.

**Files:**
- Create: `src/sites/mostlysterile/data/products.ts`

- [ ] **Step 1: Create the products data file with all 16 entries**

Create `src/sites/mostlysterile/data/products.ts` with the exact content below. Each product uses the `Product` type, belongs to one `ProductCategory`, and ships with a `specifications` array of 4–6 entries. All copy follows the Defensive Legitimacy voice (confident claim, immediate hedge).

```typescript
export type ProductCategory =
  | "surgical-instruments"
  | "bandages-wound-care"
  | "ppe"
  | "diagnostics"
  | "pharmaceuticals"
  | "hospital-surplus"

export interface ProductCategoryInfo {
  slug: ProductCategory
  label: string
}

export const categories: ProductCategoryInfo[] = [
  { slug: "surgical-instruments", label: "Surgical" },
  { slug: "bandages-wound-care", label: "Bandages" },
  { slug: "ppe", label: "PPE" },
  { slug: "diagnostics", label: "Diagnostics" },
  { slug: "pharmaceuticals", label: "Pharmaceuticals" },
  { slug: "hospital-surplus", label: "Surplus" },
]

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  category: ProductCategory
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  specifications: ProductSpec[]
}

export const products: Product[] = [
  {
    slug: "second-hand-scalpel",
    name: "Second-Hand Scalpel",
    category: "surgical-instruments",
    price: 8.99,
    priceLabel: "$8.99 / unit",
    tagline: "Sharp enough for most uses.",
    description: [
      "A precision surgical scalpel sourced through our extended network of medical facility partners. Each unit has been evaluated for continued utility by a member of our receiving team, who handled it briefly and did not cut themselves. Sharpness is rated \"appropriate for purpose,\" where purpose is determined by the end user.",
      "Sold as-is. The handle may bear light patina consistent with prior use; the blade may or may not be the original. We decline to speculate on provenance. Pairs well with our suture kits (sold separately), which were likely acquired from the same estate.",
    ],
    image: "/sites/mostlysterile/product-second-hand-scalpel.png",
    specifications: [
      { label: "Sterility Level", value: "Was Earlier Today" },
      { label: "Origin", value: "Hospital Closure Sale" },
      { label: "Condition", value: "Gently Used" },
      { label: "Certifications", value: "CE (Close Enough)" },
      { label: "Warranty", value: "Verbal" },
    ],
  },
  {
    slug: "forceps-various",
    name: "Forceps, Various",
    category: "surgical-instruments",
    price: 14.99,
    priceLabel: "$14.99 / bag",
    tagline: "A thoughtful assortment.",
    description: [
      "A bag of assorted forceps covering the broad spectrum of grasping, clamping, and holding requirements encountered in modern practice. Exact contents vary by bag; our sorting methodology is proprietary and, to the extent feasible, consistent.",
      "Every bag contains no fewer than four distinct forceps, each demonstrating a recognizably forceps-like form factor. Customers seeking a specific forceps type are encouraged to order multiple bags to improve the probability of receipt.",
    ],
    image: "/sites/mostlysterile/product-forceps-various.png",
    specifications: [
      { label: "Contents", value: "Variable (4+ per bag)" },
      { label: "Sterility Level", value: "Mostly" },
      { label: "Origin", value: "Consolidated Warehouse Find" },
      { label: "Certifications", value: "ISO-Inspired" },
      { label: "Warranty", value: "Until You Notice" },
    ],
  },
  {
    slug: "bone-saw-manual",
    name: "Bone Saw (Manual)",
    category: "surgical-instruments",
    price: 39.99,
    priceLabel: "$39.99 / unit",
    tagline: "Quieter than powered models.",
    description: [
      "A traditional hand-operated bone saw for practitioners who prefer the tactile feedback of manual operation, or who are unable to locate a working outlet. No batteries, no cords, no interruptions — just you and the saw and the task at hand.",
      "Supplied with a single blade that has, per our inspection team, retained most of its teeth. Replacement blades are not stocked. We recommend using this product for display purposes, or for tasks where the precision of a saw is not critical to the outcome.",
    ],
    image: "/sites/mostlysterile/product-bone-saw-manual.png",
    specifications: [
      { label: "Sterility Level", value: "Depends on Humidity" },
      { label: "Origin", value: "Estate Sale" },
      { label: "Condition", value: "Most Teeth Present" },
      { label: "Blade", value: "One Included, Non-Replaceable" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "gauze-sniff-test",
    name: "Gauze That Passes the Sniff Test",
    category: "bandages-wound-care",
    price: 4.99,
    priceLabel: "$4.99 / box of 50",
    tagline: "Field-tested absorbency.",
    description: [
      "Standard-weave medical gauze, 4x4 inches, 50 pads per box. Every box has been subjected to our proprietary olfactory screening process, in which a staff member briefly brings the box to their face and nods. Boxes that do not receive the nod are not shipped.",
      "Absorbency meets or approximates general expectations for a gauze product of this size. Packaging may be original to the manufacturer or may have been replaced by us, depending on the condition of the original packaging upon receipt.",
    ],
    image: "/sites/mostlysterile/product-gauze-sniff-test.png",
    specifications: [
      { label: "Count", value: "50 pads (give or take)" },
      { label: "Size", value: "4\" x 4\" (nominal)" },
      { label: "Sterility Level", value: "Passed Screening" },
      { label: "Origin", value: "Hospital Closure Sale" },
      { label: "Warranty", value: "Verbal" },
    ],
  },
  {
    slug: "band-aids-we-found",
    name: "Band-Aids We Found",
    category: "bandages-wound-care",
    price: 2.49,
    priceLabel: "$2.49 / variety pack",
    tagline: "Assorted sizes, mostly clean.",
    description: [
      "A variety assortment of adhesive bandages recovered from a range of sources, including but not limited to: a closed pharmacy, a bulk donation, and a reusable tote brought in by a gentleman who declined to leave his name. All bandages are individually wrapped, and the wrappers are mostly intact.",
      "Sizes in each pack are variable. Adhesion quality is generally maintained. We do not recommend these bandages for serious wounds or, frankly, for any wound where first-party bandages are available.",
    ],
    image: "/sites/mostlysterile/product-band-aids-we-found.png",
    specifications: [
      { label: "Count", value: "~30 bandages" },
      { label: "Sizes", value: "Variable" },
      { label: "Sterility Level", value: "Mostly" },
      { label: "Origin", value: "Multiple, Unconfirmed" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "suture-kit-estate",
    name: "Suture Kit (Estate Sale)",
    category: "bandages-wound-care",
    price: 19.99,
    priceLabel: "$19.99 / kit",
    tagline: "A previous owner's life's work.",
    description: [
      "A complete suture kit acquired from the estate of a practitioner whose career, by all accounts, was long and distinguished. The kit includes a needle holder, forceps, scissors, and a small quantity of sutures in what appear to be the original sealed packets. A few packets have been opened but not used.",
      "The case shows signs of long service. The initials \"R.D.\" are engraved on the interior. We have not reached out to R.D., and we do not intend to. The kit is yours if you want it.",
    ],
    image: "/sites/mostlysterile/product-suture-kit-estate.png",
    specifications: [
      { label: "Contents", value: "Needle Holder, Forceps, Scissors, Assorted Sutures" },
      { label: "Previous Owner", value: "R.D. (Deceased)" },
      { label: "Sterility Level", value: "Packets Mostly Sealed" },
      { label: "Origin", value: "Estate Sale" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "size-whatever-gloves",
    name: "Size Whatever Gloves",
    category: "ppe",
    price: 11.99,
    priceLabel: "$11.99 / box of 50",
    tagline: "Fit guaranteed on at least one hand.",
    description: [
      "A box of 50 single-use examination gloves in our proprietary universal sizing. Each glove has been cut from the same pattern and will, by our estimation, fit approximately 63% of adult human hands. The remaining 37% of customers are encouraged to order a second box.",
      "Material is nitrile, or comparable. Thickness is adequate. Color varies by batch and may include blue, teal, purple, or an unmarked translucent variant we are still identifying.",
    ],
    image: "/sites/mostlysterile/product-size-whatever-gloves.png",
    specifications: [
      { label: "Count", value: "50 gloves" },
      { label: "Size", value: "Universal (results vary)" },
      { label: "Material", value: "Nitrile or Comparable" },
      { label: "Sterility Level", value: "Factory Fresh*" },
      { label: "Warranty", value: "Until You Notice" },
    ],
  },
  {
    slug: "gently-worn-n95",
    name: "Gently Worn N95s",
    category: "ppe",
    price: 24.99,
    priceLabel: "$24.99 / 10-pack",
    tagline: "Previously deployed, currently available.",
    description: [
      "A ten-pack of N95 respirators acquired from a medical institution that no longer required them. Each mask has been worn fewer than the recommended number of times, where \"recommended\" is an operating principle we continue to refine.",
      "The nose wire is intact on most units. The elastic retains elasticity. The filter media, by appearance, has not been visibly compromised. These are sold strictly for display, training, or situations in which the alternative is no mask at all.",
    ],
    image: "/sites/mostlysterile/product-gently-worn-n95.png",
    specifications: [
      { label: "Count", value: "10 masks" },
      { label: "Rating", value: "N95 (as marked)" },
      { label: "Condition", value: "Gently Worn" },
      { label: "Origin", value: "Institutional Transfer" },
      { label: "Sterility Level", value: "Was Earlier Today" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "surgical-gown",
    name: "Surgical Gown (One-Size-Fits-Hopefully)",
    category: "ppe",
    price: 17.99,
    priceLabel: "$17.99 / unit",
    tagline: "Universal drape, universal coverage*.",
    description: [
      "A single-use sterile-adjacent surgical gown in our universal cut. The gown is intended to fit the majority of wearers in the majority of positions, assuming a moderate and cooperative posture. The asterisk on our tagline indicates that coverage is contingent on wearer cooperation.",
      "The gown is supplied folded in a plastic sleeve that has not been opened (by us). We make no claim about prior openings. The ties are intact on most units. The sleeves are sleeves.",
    ],
    image: "/sites/mostlysterile/product-surgical-gown.png",
    specifications: [
      { label: "Size", value: "Universal (cooperative)" },
      { label: "Material", value: "Non-Woven Polypropylene" },
      { label: "Sterility Level", value: "Mostly" },
      { label: "Packaging", value: "Sealed (by someone)" },
      { label: "Warranty", value: "Verbal" },
    ],
  },
  {
    slug: "stethoscope-calibration-uncertain",
    name: "Stethoscope (Calibration Uncertain)",
    category: "diagnostics",
    price: 22.99,
    priceLabel: "$22.99 / unit",
    tagline: "Amplifies most sounds.",
    description: [
      "A dual-head clinical stethoscope with binaural tubing and a chest piece of unspecified alloy. Sound amplification is present. Whether that amplification is accurate, and whether the sounds being amplified are the ones you intended to hear, remain open questions.",
      "Earpieces are original to the unit. Tubing has not developed any cracks visible to the naked eye. We recommend this product for customers who require the aesthetic of a stethoscope, and who accept that the diagnostic value is a secondary consideration.",
    ],
    image: "/sites/mostlysterile/product-stethoscope-calibration-uncertain.png",
    specifications: [
      { label: "Type", value: "Dual-Head Clinical" },
      { label: "Calibration", value: "Uncertain" },
      { label: "Sterility Level", value: "Was Earlier Today" },
      { label: "Origin", value: "Warehouse Find" },
      { label: "Warranty", value: "Until You Notice" },
    ],
  },
  {
    slug: "mercury-free-thermometer",
    name: "Mercury-Free Thermometer (Mostly)",
    category: "diagnostics",
    price: 9.99,
    priceLabel: "$9.99 / unit",
    tagline: "No mercury has been added recently.",
    description: [
      "A glass-barreled clinical thermometer in the classical format. The active column is a silver-colored fluid that reads and retains temperature values with adequate fidelity. Our operations team has not added mercury to any unit in this lot; whether mercury was present upon receipt is a separate matter.",
      "Provided in a paper sleeve. The sleeve bears no lot number. The thermometer itself bears a number, which we suspect is the lot number, but we cannot confirm this without breaking the seal.",
    ],
    image: "/sites/mostlysterile/product-mercury-free-thermometer.png",
    specifications: [
      { label: "Range", value: "96–106°F (nominal)" },
      { label: "Active Fluid", value: "Silver-Colored" },
      { label: "Sterility Level", value: "Passed Screening" },
      { label: "Origin", value: "Bulk Donation" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "bp-cuff-opinions",
    name: "Blood Pressure Cuff with Opinions",
    category: "diagnostics",
    price: 29.99,
    priceLabel: "$29.99 / unit",
    tagline: "Runs high, per our records.",
    description: [
      "A manual aneroid sphygmomanometer cuff with inflation bulb, release valve, and adult-arm wrap. The gauge has been observed to report values at the high end of normal, consistently and with conviction. Whether this reflects genuine hypertension in the population or a calibration drift on the gauge is a determination we leave to the user.",
      "The wrap is intact. The bulb holds air. The release valve is serviceable when turned with moderate force. Sold without a matching stethoscope; one is available separately (see product 'Stethoscope, Calibration Uncertain').",
    ],
    image: "/sites/mostlysterile/product-bp-cuff-opinions.png",
    specifications: [
      { label: "Type", value: "Manual Aneroid" },
      { label: "Calibration", value: "Runs High" },
      { label: "Sterility Level", value: "Mostly" },
      { label: "Origin", value: "Warehouse Find" },
      { label: "Warranty", value: "Verbal" },
    ],
  },
  {
    slug: "placebex",
    name: "Placebex",
    category: "pharmaceuticals",
    price: 34.99,
    priceLabel: "$34.99 / bottle of 60",
    tagline: "Clinically tested in at least one clinic.",
    description: [
      "Placebex is a therapeutic capsule formulated to deliver measurable outcomes to appropriately suggestible users. Each 500mg capsule contains a carefully selected blend of inactive ingredients, chosen for their inertness and favorable regulatory profile. Clinical testing has been conducted at a facility which has been described as \"a clinic.\"",
      "Available in our signature amber bottle. Label bears the Placebex wordmark, a lot number we printed ourselves, and the mandatory disclaimer that we are not the original manufacturer of any of the constituents, nor of the capsule, nor of the bottle.",
    ],
    image: "/sites/mostlysterile/product-placebex.png",
    specifications: [
      { label: "Count", value: "60 capsules" },
      { label: "Dose", value: "500mg inactive ingredients" },
      { label: "Sterility Level", value: "Sealed*" },
      { label: "Clinical Testing", value: "Conducted (somewhere)" },
      { label: "Certifications", value: "FDA (Friendly Domestic Association)" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "generix-extra-strength",
    name: "Generix Extra Strength",
    category: "pharmaceuticals",
    price: 19.99,
    priceLabel: "$19.99 / bottle of 100",
    tagline: "Definitely not aspirin.",
    description: [
      "Generix Extra Strength provides general-purpose discomfort attenuation in a convenient round-tablet format. Each 325mg tablet is white, scored in the middle, and, per our labeling, definitely not aspirin. Generix is manufactured by a partner facility whose address we are legally advised not to disclose.",
      "Recommended dosing: one or two tablets, as needed, up to four times daily, or as otherwise suggested by a healthcare professional who is not us. Keep bottle closed when not in use.",
    ],
    image: "/sites/mostlysterile/product-generix-extra-strength.png",
    specifications: [
      { label: "Count", value: "100 tablets" },
      { label: "Dose", value: "325mg (per tablet)" },
      { label: "Form", value: "White, Scored, Round" },
      { label: "Certifications", value: "FDA (Friendly Domestic Association)" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "used-iv-bag",
    name: "Used IV Bag",
    category: "hospital-surplus",
    price: 7.99,
    priceLabel: "$7.99 / unit",
    tagline: "Contents previously administered to a recovering patient.",
    description: [
      "A standard 1000mL IV bag, supplied empty. The contents of the original fill were administered to a patient who, by all available indications, recovered. We consider this a favorable signal on the provenance of the bag, though we make no claim as to causation.",
      "The bag retains its port, its hang tab, and most of its label. The label has been partially redacted to protect the privacy of any parties named. Suitable for display, practice, or the slow, dignified air-drying of small articles of laundry.",
    ],
    image: "/sites/mostlysterile/product-used-iv-bag.png",
    specifications: [
      { label: "Volume", value: "1000mL (empty)" },
      { label: "Prior Contents", value: "Fully Administered" },
      { label: "Sterility Level", value: "Previously" },
      { label: "Origin", value: "Institutional Transfer" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "reusable-biohazard-bag",
    name: "Reusable Biohazard Bag",
    category: "hospital-surplus",
    price: 5.99,
    priceLabel: "$5.99 / pack of 10",
    tagline: "Comes pre-used to ease the transition.",
    description: [
      "A pack of ten biohazard bags in the familiar red-orange color, pre-cycled through at least one use to build in the natural wear that single-use bags cannot replicate. Handles are reinforced. Closures are workable. Each bag is emptied prior to packaging, to the extent feasible.",
      "Intended for practice, training, or any disposal scenario where the formal status of the bag is not subject to audit. We recommend against use in regulated settings, where an unused bag is generally preferred.",
    ],
    image: "/sites/mostlysterile/product-reusable-biohazard-bag.png",
    specifications: [
      { label: "Count", value: "10 bags" },
      { label: "Size", value: "Large (approx.)" },
      { label: "Prior Use", value: "At Least One Cycle" },
      { label: "Sterility Level", value: "Was Earlier Today" },
      { label: "Warranty", value: "None" },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getRelatedProducts(currentSlug: string, count: number = 3): Product[] {
  const current = getProductBySlug(currentSlug)
  if (!current) return []
  return products
    .filter((p) => p.category === current.category && p.slug !== currentSlug)
    .slice(0, count)
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS — no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sites/mostlysterile/data/products.ts
git commit -m "feat(mostlysterile): add 16-product catalog with categories and specs"
```

---

## Task 4: Products listing page with category filter chips

**Goal:** Build the `/products` page — a flat grid of all 16 products with client-side category filter chips at the top.

**Files:**
- Create: `src/sites/mostlysterile/pages/products.tsx`
- Modify: `src/sites/mostlysterile/index.ts` (register the page)

**Important:** The shared `ProductCard` component is an *async* server component. Async server components cannot be rendered from inside a `"use client"` component, so we cannot use `ProductCard` directly on this filtered listing page. We render an inline client-side card here instead — it shares styling with `ProductCard` and reuses the commerce primitives (`AddToCartButton` is already a client component, and `useSiteLink` is a client hook).

Product detail pages (Task 5) and the homepage (Task 6) are server components and CAN keep using `ProductCard` as-is.

- [ ] **Step 1: Create the products listing page**

Create `src/sites/mostlysterile/pages/products.tsx`:

```typescript
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useSiteLink } from "@/hooks/use-site-link"
import { products, categories, type Product, type ProductCategory } from "@/sites/mostlysterile/data/products"

const addToCartQuips = [
  "Noted. Your order has been queued for processing where applicable.",
  "Added. A handling advisory will be provided at checkout.",
  "Received. Shipping will commence from a location we are advised not to disclose.",
  "Confirmed. Sterility of this item was verified earlier today.",
  "Added. Please do not hesitate to reach us with questions we will decline to answer.",
]

type Filter = "all" | ProductCategory

export const metadata = {
  title: "Catalog — Mostlysterile",
  description: "Browse our full catalog of surgical instruments, bandages, PPE, diagnostics, pharmaceuticals, and hospital surplus.",
}

function ProductCardClient({ product }: { product: Product }) {
  const siteHref = useSiteLink()
  const href = siteHref(`/products/${product.slug}`)

  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
      <Link href={href}>
        <div className="relative aspect-square bg-secondary/10">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-4 text-center">
        <Link href={href}>
          <h3 className="text-lg font-heading font-semibold text-primary mb-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-foreground/60 mb-2">{product.tagline}</p>
        <p className="text-lg font-semibold text-accent mb-3">{product.priceLabel}</p>
        <AddToCartButton slug={product.slug} productName={product.name} quips={addToCartQuips} />
      </div>
    </div>
  )
}

export default function MostlysterileProducts() {
  const [filter, setFilter] = useState<Filter>("all")
  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter)

  const chipBase = "px-4 py-2 text-sm font-semibold uppercase tracking-wide border transition-colors"
  const chipActive = "bg-primary text-background border-primary"
  const chipInactive = "bg-background text-primary border-primary/30 hover:border-primary"

  return (
    <>
      <Hero
        headline="The Mostlysterile Catalog"
        subheadline="Sixteen products spanning six categories of institutional medical supply. Browse at your leisure."
      />

      <section className="py-6 px-4 border-y border-primary/10 bg-secondary/10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`${chipBase} ${filter === "all" ? chipActive : chipInactive}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setFilter(cat.slug)}
              className={`${chipBase} ${filter === cat.slug ? chipActive : chipInactive}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-foreground/60 italic py-12">
              No products in this category. This is unusual. Please try another category, or refresh the page, or accept this outcome.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product) => (
                <ProductCardClient key={product.slug} product={product} />
              ))}
            </div>
          )}

          <p className="mt-12 text-center text-xs text-foreground/50 italic">
            *Product listings may be updated at any time without notice. Prices reflect current availability and may reflect prior availability.
          </p>
        </div>
      </section>
    </>
  )
}
```

**Note on `metadata` export from a `"use client"` file:** The platform's catch-all route reads page metadata from the barrel's `PageEntry.metadata` object (declared in `index.ts`), not from Next's per-page `metadata` export. The `metadata` export above is used only because the barrel imports it via `import MostlysterileProducts, { metadata as productsMetadata } from "./pages/products"`. This pattern works fine from a `"use client"` file; the metadata object is a plain JSON-serializable value and is consumed by server code upstream.

- [ ] **Step 2: Register the products page in the barrel**

Modify `src/sites/mostlysterile/index.ts`. Replace the whole file with:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import MostlysterileHome from "./pages/home"
import MostlysterileProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MostlysterileHome,
  "products": { component: MostlysterileProducts, metadata: productsMetadata },
}
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both PASS.

- [ ] **Step 4: Smoke-test in dev server**

Run: `npm run dev`
Open `http://localhost:3000/products?site=mostlysterile`.
Expected:
- Hero with "The Mostlysterile Catalog" headline
- Filter chip row with All, Surgical, Bandages, PPE, Diagnostics, Pharmaceuticals, Surplus
- Grid of 16 ProductCards (images will 404 until Task 16 or a follow-up; that's fine for now)
- Clicking a category chip filters the grid
- Tab title is "Catalog — Mostlysterile"

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/sites/mostlysterile/pages/products.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add products listing with category filter chips"
```

---

## Task 5: Product detail page + dynamicRoutes + sitemap integration

**Goal:** Add per-product detail pages at `/products/[slug]`, register the dynamic route in the barrel, and include mostlysterile in the sitemap's `productSites` map.

**Files:**
- Create: `src/sites/mostlysterile/pages/product-detail.tsx`
- Modify: `src/sites/mostlysterile/index.ts` (add dynamicRoutes)
- Modify: `src/sites/registry.ts` (include dynamicRoutes in the entry)
- Modify: `src/app/sitemap.ts` (register products)

- [ ] **Step 1: Create the product detail page**

Create `src/sites/mostlysterile/pages/product-detail.tsx`:

```typescript
import Image from "next/image"
import { getProductBySlug, getRelatedProducts, categories } from "@/sites/mostlysterile/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

const addToCartQuips = [
  "Noted. Your order has been queued for processing where applicable.",
  "Added. A handling advisory will be provided at checkout.",
  "Received. Shipping will commence from a location we are advised not to disclose.",
  "Confirmed. Sterility of this item was verified earlier today.",
]

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)
  const categoryLabel = categories.find((c) => c.slug === product.category)?.label ?? product.category

  return (
    <>
      {/* Product hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/10 border border-primary/10">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority fetchPriority="high" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">{categoryLabel}</p>
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/70 italic mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-4 bg-primary text-background rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                quips={addToCartQuips}
              />
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/80 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto border-2 border-primary/20 bg-secondary/10 rounded-lg">
          <div className="border-b-2 border-primary/20 px-6 py-3 bg-primary/5">
            <h2 className="text-sm uppercase tracking-widest font-heading font-bold text-primary">
              Product Specifications
            </h2>
          </div>
          <dl className="divide-y divide-primary/10">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="px-6 py-3 grid grid-cols-2 gap-4">
                <dt className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">
                  {spec.label}
                </dt>
                <dd className="text-sm text-foreground text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
          <p className="px-6 py-3 text-xs italic text-foreground/50 border-t-2 border-primary/20 bg-accent/10">
            *Specification values represent the best available assessment at time of listing and may vary from unit to unit.
          </p>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-secondary/10 border-t border-primary/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-primary text-center mb-2">
              Related Products
            </h2>
            <p className="text-center text-foreground/60 text-sm mb-8">
              More from our {categoryLabel} line.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  price={p.priceLabel}
                  tagline={p.tagline}
                  image={p.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 2: Update the barrel to include dynamicRoutes**

Replace `src/sites/mostlysterile/index.ts` with:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import MostlysterileHome from "./pages/home"
import MostlysterileProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MostlysterileHome,
  "products": { component: MostlysterileProducts, metadata: productsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Mostlysterile`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 3: Update the registry to include dynamicRoutes**

Modify `src/sites/registry.ts`. Change the mostlysterile import line (added in Task 1) to also import dynamicRoutes:

```typescript
import { config as mostlysterileConfig, pages as mostlysterilePages, dynamicRoutes as mostlysterileDynamicRoutes } from "./mostlysterile"
```

Then update the `mostlysterile:` entry in `siteRegistry` to:

```typescript
  mostlysterile: { config: mostlysterileConfig, pages: mostlysterilePages, dynamicRoutes: mostlysterileDynamicRoutes },
```

- [ ] **Step 4: Add mostlysterile products to the sitemap**

Modify `src/app/sitemap.ts`. Add an import alongside the other product imports (after the `radiumroys` / `squaredaway` imports near the top):

```typescript
import { products as mostlysterileProducts } from "@/sites/mostlysterile/data/products"
```

Then add a line to the `productSites` map (after the `squaredaway` line, approximately line 65):

```typescript
    mostlysterile: mostlysterileProducts,
```

- [ ] **Step 5: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both PASS.

- [ ] **Step 6: Smoke-test product detail**

Run: `npm run dev`
Open `http://localhost:3000/products/second-hand-scalpel?site=mostlysterile`.
Expected:
- Product hero with image placeholder, name, tagline, price, Add to Cart button
- Description paragraphs
- Specifications table with labeled fields
- Related products strip at bottom (2 other surgical products)
- Page title is "Second-Hand Scalpel — Mostlysterile"

Also try `http://localhost:3000/products/this-does-not-exist?site=mostlysterile` — expected: 404.

Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add src/sites/mostlysterile/pages/product-detail.tsx src/sites/mostlysterile/index.ts src/sites/registry.ts src/app/sitemap.ts
git commit -m "feat(mostlysterile): add product detail pages and sitemap integration"
```

---

## Task 6: Full homepage

**Goal:** Replace the stub home page with the full Mostlysterile homepage — hero, features, featured products, trust row, dual CTA, testimonials, and fine print.

**Files:**
- Modify: `src/sites/mostlysterile/pages/home.tsx` (replace entirely)

- [ ] **Step 1: Replace the home page file**

Replace the contents of `src/sites/mostlysterile/pages/home.tsx` with:

```typescript
import { Hero } from "@/components/ui/hero"
import { FeatureSection } from "@/components/ui/feature-section"
import { ProductCard } from "@/components/ui/product-card"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { getProductBySlug } from "@/sites/mostlysterile/data/products"

const featuredSlugs = [
  "second-hand-scalpel",
  "gauze-sniff-test",
  "stethoscope-calibration-uncertain",
  "placebex",
]

const features = [
  {
    title: "Almost Guaranteed Value",
    description: "Our prices reflect our confidence, or the level of confidence we are prepared to express publicly. Either way, savings are indicated.",
  },
  {
    title: "Partially Certified",
    description: "Every product is reviewed by at least one member of our team who believes they are qualified to review it.",
  },
  {
    title: "Shipping From Somewhere",
    description: "Fast shipping from a location we are legally advised not to disclose. Delivery windows are estimated, where estimation is possible.",
  },
]

const trustBadges = [
  "CE (Close Enough)",
  "FDA (Friendly Domestic Association)",
  "ISO-Inspired",
  "WHO (We're Hopeful, Okay?)",
  "USP (Usually Sort-of Pure)",
  "HIPAA-Adjacent",
]

const testimonials = [
  {
    quote: "These gloves did not give me an infection. At least not yet.",
    attribution: "Dr. Marjorie Feldstone, Practitioner",
  },
  {
    quote: "I cannot recommend Mostlysterile, per counsel's advice. However, the gauze was fine.",
    attribution: "Dr. Harold Okonkwo-Briggs, Clinician",
  },
  {
    quote: "My patients have not complained any more than is typical. I consider that a strong endorsement.",
    attribution: "Dr. Sylvia Katz, Primary Care",
  },
]

const addToCartQuips = [
  "Noted. Your order has been queued for processing where applicable.",
  "Added. A handling advisory will be provided at checkout.",
  "Received. Shipping will commence from a location we are advised not to disclose.",
]

export default async function MostlysterileHome() {
  const siteHref = await getSiteHref()
  const featured = featuredSlugs.map(getProductBySlug).filter((p) => p !== undefined)

  return (
    <>
      <Hero
        headline="Meeting or Nearing Industry Standards Since 2014"
        subheadline="Mostlysterile is a full-service medical supply provider offering surgical instruments, bandages, PPE, diagnostics, and hospital surplus at prices that reflect current market conditions and our evolving inventory."
        ctaText="Browse Catalog"
        ctaHref={siteHref("/products")}
      />

      {/* Disclaimer banner */}
      <div className="bg-accent/20 border-y border-accent/40 py-2 px-4 text-center">
        <p className="text-xs italic text-foreground/70">
          *Product claims, specifications, and representations herein are not independently verified and may vary from product actually received.
        </p>
      </div>

      <FeatureSection title="Why Mostlysterile?" features={features} />

      {/* Featured products */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-2">
            Featured Items
          </h2>
          <p className="text-center text-foreground/60 mb-10">
            A curated selection from across our categories, subject to availability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard
                key={p!.slug}
                slug={p!.slug}
                name={p!.name}
                price={p!.priceLabel}
                tagline={p!.tagline}
                image={p!.image}
                quips={addToCartQuips}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust row */}
      <section className="py-10 px-4 border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 text-center mb-6">
            Credentialed by or adjacent to
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wider border border-primary/30 bg-background text-primary"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={siteHref("/certifications")}
            className="block border-2 border-primary/20 p-8 bg-background hover:border-primary transition-colors"
          >
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Transparency</p>
            <h3 className="text-2xl font-heading font-bold text-primary mb-3">Review Our Certifications</h3>
            <p className="text-foreground/70 text-sm">
              A complete gallery of the credentials, training completions, and honors our team has accumulated over time.
            </p>
            <p className="mt-4 text-sm font-semibold text-primary">View Credentials →</p>
          </Link>
          <Link
            href={siteHref("/quality-assurance")}
            className="block border-2 border-primary/20 p-8 bg-background hover:border-primary transition-colors"
          >
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Process</p>
            <h3 className="text-2xl font-heading font-bold text-primary mb-3">Our 12-Step Sterility Process</h3>
            <p className="text-foreground/70 text-sm">
              Every product at Mostlysterile is reviewed through our rigorous twelve-step verification procedure, or something functionally equivalent.
            </p>
            <p className="mt-4 text-sm font-semibold text-primary">View Process →</p>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-10">
            What Practitioners Say*
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure key={i} className="border border-primary/20 bg-background p-6">
                <blockquote className="text-foreground/80 italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm font-semibold text-primary">{t.attribution}</figcaption>
              </figure>
            ))}
          </div>
          <p className="text-center text-xs italic text-foreground/50 mt-6">
            *Attributions have been modified for privacy. Individuals quoted have not formally consented to republication.
          </p>
        </div>
      </section>

      {/* Fine print closer */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] text-foreground/40 italic leading-relaxed">
            Mostlysterile is a medical supply distributor, or functions in a role substantially similar to a medical supply distributor, serving customers in the tri-state area and occasionally elsewhere. Products are offered as-is, where-is, with or without original packaging, and in the condition received. Claims of sterility, certification, and clinical efficacy reflect our best available assessment at time of listing and are not warranted. By placing an order you acknowledge that you have read these terms, or had the opportunity to read them, or declined the opportunity. No rights are conferred that were not already conferred. No rights are waived that were not already waived. Thank you for choosing Mostlysterile.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both PASS.

- [ ] **Step 3: Smoke-test homepage**

Run: `npm run dev`
Open `http://localhost:3000/?site=mostlysterile`.
Expected:
- Hero with tagline headline and subhead
- Yellow disclaimer banner beneath hero
- "Why Mostlysterile?" 3-feature section
- Featured products (4 cards)
- Trust badge row with 6 entries
- Two CTA cards linking to Certifications and Quality
- Three testimonials with hedged quotes
- Fine print paragraph at the bottom

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/sites/mostlysterile/pages/home.tsx
git commit -m "feat(mostlysterile): implement full homepage with hero, features, testimonials"
```

---

## Task 7: About page

**Goal:** Build the `/about` page — company origin story with a Timeline of milestones.

**Files:**
- Create: `src/sites/mostlysterile/pages/about.tsx`
- Modify: `src/sites/mostlysterile/index.ts` (register the page)

- [ ] **Step 1: Create the about page**

Create `src/sites/mostlysterile/pages/about.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"

export const metadata = {
  title: "About — Mostlysterile",
  description: "Founded in 2014 in a self-storage unit by a lapsed pre-med student. Now serving the tri-state area and occasionally elsewhere.",
}

const milestones = [
  { year: "2014", description: "Founded in a self-storage unit off Route 9. Acquired first scalpel." },
  { year: "2015", description: "Received first bulk donation of medical consumables from an unspecified source." },
  { year: "2016", description: "Hired second employee. (Still with us, to the extent feasible.)" },
  { year: "2017", description: "Completed Basic Hand Washing coursework via Online University of Applied Healthcare." },
  { year: "2018", description: "Received participation ribbon at the County Health Fair. Framed and displayed." },
  { year: "2019", description: "Named runner-up for Most Improved Sterility at Regional Medical Supply Semifinals." },
  { year: "2020", description: "Obtained letter of reference from a guy named Steve." },
  { year: "2021", description: "Relocated to a building with a roof. Productivity noted to improve." },
  { year: "2022", description: "Expanded inventory into pharmaceuticals. (We legally cannot call them that.)" },
  { year: "2024", description: "Onboarded a dedicated Head of Compliance. (New hire.)" },
]

export default function MostlysterileAbout() {
  return (
    <>
      <Hero
        headline="About Mostlysterile"
        subheadline="Ten years of continuous, or nearly continuous, operation in the medical supply space."
      />

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p>
            Mostlysterile was founded in 2014 by Charlton L. Harrow, a lapsed pre-med student with an entrepreneurial thesis and a spare storage unit off Route 9. The thesis: that the medical supply industry underserves customers who value price competitiveness over the more traditional considerations. Ten years later, we believe the thesis has been, to the extent feasible, validated.
          </p>
          <p>
            We operate today as a lean distribution business serving the tri-state area and, on occasion, adjacent markets where shipping logistics permit. Our inventory is sourced through a network of partners we have been cultivating for the better part of a decade, including hospital closure programs, institutional surplus dispositions, estate sales, and referrals from a gentleman named Steve. Every product entering our facility passes through our twelve-step verification process, or receives an exemption when operational circumstances require.
          </p>
          <p>
            Our mission is to provide medical supplies at prices you can live with, through sterility that mostly holds up, backed by the kind of customer service that comes from knowing every customer by name, or at least by first name, or at minimum by the handwriting on their order slip. We are grateful for the trust you place in us, or the trust you are considering placing in us, or the curiosity that has brought you to this page.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-3">
            A Decade of Milestones
          </h2>
          <p className="text-center text-foreground/60 text-sm mb-10">
            Key moments in the Mostlysterile story, as reconstructed from available records.
          </p>
          <Timeline items={milestones} />
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-lg text-foreground/80 italic leading-relaxed">
            &ldquo;To provide medical supplies at prices that don&rsquo;t make sense, with sterility that mostly holds up, to the benefit of customers who appreciate both of these things.&rdquo;
          </p>
          <p className="mt-4 text-sm text-foreground/60">— Charlton L. Harrow, Founder</p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the about page in the barrel**

Modify `src/sites/mostlysterile/index.ts`. Add the import after the existing product imports:

```typescript
import MostlysterileAbout, { metadata as aboutMetadata } from "./pages/about"
```

Add the page entry after `"products"`:

```typescript
  "about": { component: MostlysterileAbout, metadata: aboutMetadata },
```

- [ ] **Step 3: Smoke-test**

Run: `npm run dev`
Open `http://localhost:3000/about?site=mostlysterile`.
Expected: origin story, 10-item timeline, mission statement.

- [ ] **Step 4: Type-check, lint, commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/mostlysterile/pages/about.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add about page with timeline and mission"
```

---

## Task 8: Certifications page

**Goal:** Build the `/certifications` page — a gallery of 9 `CertificationCard` entries.

**Files:**
- Create: `src/sites/mostlysterile/pages/certifications.tsx`
- Modify: `src/sites/mostlysterile/index.ts` (register the page)

- [ ] **Step 1: Create the certifications page**

Create `src/sites/mostlysterile/pages/certifications.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { CertificationCard } from "@/components/ui/CertificationCard"

export const metadata = {
  title: "Certifications — Mostlysterile",
  description: "A complete gallery of credentials, training completions, and honors recognized by the Mostlysterile team.",
}

const certifications = [
  {
    title: "Adjacent Concepts",
    issuer: "Continental Medical Review Board",
    year: "2017",
    note: "Board-level certification in adjacent and adjacent-adjacent subject matter.",
  },
  {
    title: "Most Improved Sterility",
    issuer: "Regional Medical Supply Semifinals",
    year: "2019",
    note: "Runner-up. Recognition of measurable year-over-year improvement.",
  },
  {
    title: "Basic Hand Washing",
    issuer: "Online University of Applied Healthcare",
    year: "2018",
    note: "Asynchronous coursework completed with a final-module passing grade.",
  },
  {
    title: "Letter of Reference",
    issuer: "Steve",
    year: "2020",
    note: "Personal recommendation retained in our permanent records.",
  },
  {
    title: "ISO-Inspired Certification",
    issuer: "Vibes-Based Compliance Institute",
    year: "2021",
    note: "Recognition of institutional alignment with ISO principles in spirit.",
  },
  {
    title: "Participation in Health Fair",
    issuer: "County Public Health Department",
    year: "2022",
    note: "Ribbon awarded to attendees meeting minimum booth-presence standards.",
  },
  {
    title: "Honorary Membership",
    issuer: "Doctors Without Borders Fan Club",
    year: "2019",
    note: "Unaffiliated with and not endorsed by Doctors Without Borders.",
  },
  {
    title: "CPR for Mannequins",
    issuer: "Mid-Atlantic Training Collective",
    year: "2016",
    note: "Completion certificate covering inanimate-subject resuscitation protocol.",
  },
  {
    title: "Attendance, Medical Supplies Trade Show",
    issuer: "Industry Consortium of the Mid-Atlantic",
    year: "2018",
    note: "Official confirmation of presence on the exhibition floor.",
  },
]

export default function MostlysterileCertifications() {
  return (
    <>
      <Hero
        headline="Our Certifications"
        subheadline="Mostlysterile maintains a rigorous credentialing program. Every certificate below represents a real recognition by a real issuing body, or by someone functionally comparable."
      />

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Credentialing is central to how we operate. Our team has, over ten years, accumulated a broad and defensible portfolio of certifications, completions, and recognitions. Each one is displayed here in its entirety, framed in our main office where space permits.
          </p>
          <p>
            We consider this gallery to be the fullest available statement of our qualifications. If a certification is not shown here, it is because we either do not hold it, or hold it in a format that does not photograph well. Our receiving department continues to pursue additional credentials as opportunities arise.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <CertificationCard
                key={cert.title}
                title={cert.title}
                issuer={cert.issuer}
                year={cert.year}
                note={cert.note}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs italic text-foreground/50">
            Certifications depicted may reflect the position of the Mostlysterile team rather than that of the issuing body. No affiliation with any named institution is claimed beyond what is indicated on the certificates themselves.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the certifications page**

In `src/sites/mostlysterile/index.ts`, add the import after the `about` import:

```typescript
import MostlysterileCertifications, { metadata as certificationsMetadata } from "./pages/certifications"
```

Add the page entry after `"about"`:

```typescript
  "certifications": { component: MostlysterileCertifications, metadata: certificationsMetadata },
```

- [ ] **Step 3: Smoke-test**

Run: `npm run dev`
Open `http://localhost:3000/certifications?site=mostlysterile`.
Expected: hero, intro text, 9 framed certification cards in a 3-column grid, closing disclaimer.

- [ ] **Step 4: Type-check, lint, commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/mostlysterile/pages/certifications.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add certifications gallery page"
```

---

## Task 9: Quality Assurance page

**Goal:** Build the `/quality-assurance` page — 12-step sterility verification process rendered via the shared `Timeline` component.

**Files:**
- Create: `src/sites/mostlysterile/pages/quality-assurance.tsx`
- Modify: `src/sites/mostlysterile/index.ts`

- [ ] **Step 1: Create the page**

Create `src/sites/mostlysterile/pages/quality-assurance.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"

export const metadata = {
  title: "Quality Assurance — Mostlysterile",
  description: "Every product at Mostlysterile passes through our rigorous 12-step sterility verification process, or a functionally equivalent alternative.",
}

const steps = [
  { year: "Step 1", description: "Visual Inspection (From A Distance) — a member of our receiving team examines the item from across the room." },
  { year: "Step 2", description: "Sniff Test — proximity-based olfactory assessment. A single nod authorizes advancement." },
  { year: "Step 3", description: "Manual Wipe-Down (Dry) — the item is passed across a clean section of our work surface." },
  { year: "Step 4", description: "Light Exposure — the item is held near a window during a period of sufficient daylight." },
  { year: "Step 5", description: "Verbal Affirmation — a designated team member states aloud, \"This is fine.\"" },
  { year: "Step 6", description: "Temperature Check — the item is evaluated by hand for notable warmth or coolness." },
  { year: "Step 7", description: "Peer Review — Bob signs off." },
  { year: "Step 8", description: "Packaging Inspection — the item's packaging is evaluated for continued sealed-ness." },
  { year: "Step 9", description: "Secondary Review — Bob signs off again, this time in a different pen." },
  { year: "Step 10", description: "Documentation — the item is recorded in a notebook which is, to the best of our knowledge, still in the building." },
  { year: "Step 11", description: "Squint At It — a final close-range inspection conducted with narrowed eyes for focus." },
  { year: "Step 12", description: "Ship It." },
]

export default function MostlysterileQualityAssurance() {
  return (
    <>
      <Hero
        headline="Our 12-Step Sterility Verification Process"
        subheadline="Every product leaving our facility has, under normal operating conditions, passed through each of the steps below."
      />

      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Quality assurance is the foundation of everything we do. Our twelve-step sterility verification process has been refined over a decade of institutional experience and reflects the full accumulated wisdom of our operations team. Every step is designed to be executed quickly, consistently, and with a minimum of specialized equipment.
          </p>
          <p>
            Individual steps may be reordered, combined, or deferred at the discretion of the team member on duty. The process as a whole remains intact in its essential character regardless of local variations.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-10">
            The Twelve Steps
          </h2>
          <Timeline items={steps} />
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto border-2 border-accent bg-accent/10 p-8 text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Our Commitment</p>
          <p className="text-xl font-heading font-bold text-primary leading-snug mb-3">
            Every product leaving our facility has passed at least eleven of these twelve steps.
          </p>
          <p className="text-sm italic text-foreground/70">
            *The specific step or steps skipped on any given day vary with operational requirements and are not recorded.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the page**

In `src/sites/mostlysterile/index.ts`, add the import:

```typescript
import MostlysterileQuality, { metadata as qualityMetadata } from "./pages/quality-assurance"
```

Add the page entry after `"certifications"`:

```typescript
  "quality-assurance": { component: MostlysterileQuality, metadata: qualityMetadata },
```

- [ ] **Step 3: Smoke-test**

Run: `npm run dev`
Open `http://localhost:3000/quality-assurance?site=mostlysterile`.
Expected: hero, intro paragraphs, timeline of 12 steps, closing commitment callout.

- [ ] **Step 4: Type-check, lint, commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/mostlysterile/pages/quality-assurance.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add quality assurance 12-step process page"
```

---

## Task 10: Leadership page

**Goal:** Build `/leadership` with four executives, all names randomized (both first AND last per the saved feedback memory).

**Files:**
- Create: `src/sites/mostlysterile/pages/leadership.tsx`
- Modify: `src/sites/mostlysterile/index.ts`

- [ ] **Step 1: Create the leadership page**

Create `src/sites/mostlysterile/pages/leadership.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { TeamMember } from "@/components/ui/team-member"

export const metadata = {
  title: "Leadership — Mostlysterile",
  description: "The team responsible for operations, compliance, and strategic direction at Mostlysterile.",
}

const leadership = [
  {
    image: "/sites/mostlysterile/team-founder.png",
    name: "Charlton L. Harrow",
    title: "Founder & Chief Executive",
    bio: "Lapsed pre-med student and the original vision behind Mostlysterile. Founded the company in 2014 from a self-storage unit off Route 9. Retains his original apron.",
  },
  {
    image: "/sites/mostlysterile/team-cfo.png",
    name: "Wendell M. Dobrushkin",
    title: "Chief Financial Officer",
    bio: "Handles the money. Joined Mostlysterile in 2017 after an independent career in adjacent financial roles which he considers to be substantially similar to this one.",
  },
  {
    image: "/sites/mostlysterile/team-cmo.png",
    name: "Perdita J. Aquilar",
    title: "Chief Medical Officer",
    bio: "Unaffiliated with any American Medical Association. Provides day-to-day clinical oversight to the extent feasible and is available for consultation during regular business hours, where available.",
  },
  {
    image: "/sites/mostlysterile/team-compliance.png",
    name: "Roderick V. Ashbee-Chen",
    title: "Head of Compliance",
    bio: "New hire. Started recently. Responsibilities include reviewing our existing practices and flagging items for further review, as well as general onboarding. Continues to settle in.",
  },
]

export default function MostlysterileLeadership() {
  return (
    <>
      <Hero
        headline="Leadership"
        subheadline="Mostlysterile is operated by a compact team of four. All decisions are made by consensus, except those which are made by Charlton."
      />

      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member) => (
              <div key={member.name} className="border border-primary/20 bg-secondary/10 p-6">
                <TeamMember
                  image={member.image}
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Governance Note</p>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Mostlysterile maintains no outside board, no formal advisors, and no staff beyond the four individuals named above. A succession plan exists in conceptual form and will be committed to writing in due course.
          </p>
        </div>
      </section>
    </>
  )
}
```

Implementation note: per saved feedback memory `feedback_exec_name_randomization.md`, the combination of first and last names above was selected to differ from prior Mostlysterile work and from other sites' leadership pages. When re-executing this task in a fresh session, swap the four `name` values for a different first+last combination each.

- [ ] **Step 2: Register the page**

In `src/sites/mostlysterile/index.ts`, add the import:

```typescript
import MostlysterileLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
```

Add the page entry after `"quality-assurance"`:

```typescript
  "leadership": { component: MostlysterileLeadership, metadata: leadershipMetadata },
```

- [ ] **Step 3: Smoke-test**

Run: `npm run dev`
Open `http://localhost:3000/leadership?site=mostlysterile`.
Expected: hero, 4-column team grid with placeholder portraits, governance note at bottom.

- [ ] **Step 4: Type-check, lint, commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/mostlysterile/pages/leadership.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add leadership page with four executives"
```

---

## Task 11: FAQ page

**Goal:** Build `/faq` using the shared `FaqAccordion` component with 8 defensively-hedged questions.

**Files:**
- Create: `src/sites/mostlysterile/pages/faq.tsx`
- Modify: `src/sites/mostlysterile/index.ts`

- [ ] **Step 1: Create the FAQ page**

Create `src/sites/mostlysterile/pages/faq.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "FAQ — Mostlysterile",
  description: "Answers to frequently asked questions about Mostlysterile products, practices, and operations.",
}

const faqs = [
  {
    question: "Is this legal?",
    answer: "Where applicable, yes. Our practices reflect the legal, regulatory, and advisory guidance available to us at the time of operation. We do not rule out future updates.",
  },
  {
    question: "Can I return a product?",
    answer: "Returns are reviewed on a case-by-case basis by a rotating committee of one. Decisions are final. A restocking consideration may apply.",
  },
  {
    question: "Are you affiliated with any named hospital, clinic, or healthcare system?",
    answer: "They have not returned our calls. We consider the question open.",
  },
  {
    question: "What does 'mostly sterile' mean, exactly?",
    answer: "Mostly sterile refers to a condition of sterility which is substantially preserved, to the extent feasible, through the period of our handling. The specific degree of preservation is a function of item, lot, and operational context.",
  },
  {
    question: "Do you ship internationally?",
    answer: "We ship to wherever the packaging ends up. Tracking is provided in principle. Delivery windows vary.",
  },
  {
    question: "Are your products FDA approved?",
    answer: "Our products are FDA-approved, where FDA refers to our internal Friendly Domestic Association. This is a distinct entity from the federal Food and Drug Administration and any similarity of acronyms is regrettable.",
  },
  {
    question: "Who is your target customer?",
    answer: "Customers. We serve customers who find our offering appropriate for their needs.",
  },
  {
    question: "Can I speak to a licensed pharmacist?",
    answer: "We can put you in touch with a team member who is able to speak in a comparable tone of voice. Formal pharmaceutical credentialing on our side is an ongoing project.",
  },
]

export default function MostlysterileFaq() {
  return (
    <>
      <Hero
        headline="Frequently Asked Questions"
        subheadline="Responses to the questions we receive most often, and occasionally to questions we have received only once."
      />

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <FaqAccordion items={faqs} />
          <p className="mt-10 text-xs italic text-foreground/50 text-center">
            Questions not addressed above may be submitted through our <a href="/contact" className="text-primary underline hover:no-underline">contact</a> page for queued review.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the page**

In `src/sites/mostlysterile/index.ts`, add the import:

```typescript
import MostlysterileFaq, { metadata as faqMetadata } from "./pages/faq"
```

Add the page entry after `"leadership"`:

```typescript
  "faq": { component: MostlysterileFaq, metadata: faqMetadata },
```

- [ ] **Step 3: Smoke-test, type-check, lint, commit**

Run: `npm run dev`
Open `http://localhost:3000/faq?site=mostlysterile`.
Expected: hero, accordion of 8 FAQ items. Clicking a question expands/collapses its answer.

```bash
npx tsc --noEmit && npm run lint
git add src/sites/mostlysterile/pages/faq.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add FAQ page with 8 hedged answers"
```

---

## Task 12: Contact page

**Goal:** Build `/contact` with a decorative form. Fields: Name, Email, Reason (dropdown), Are You A Lawyer? (radio), Message.

**Files:**
- Create: `src/sites/mostlysterile/pages/contact.tsx`
- Modify: `src/sites/mostlysterile/index.ts`

- [ ] **Step 1: Create the contact page**

Create `src/sites/mostlysterile/pages/contact.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export default function MostlysterileContact() {
  return (
    <>
      <Hero
        headline="Contact Us"
        subheadline="We welcome inquiries of all kinds. Responses are issued during regular operating hours, or in the next available window."
      />

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Facility info */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Facility</h2>
            <div className="border border-primary/20 bg-secondary/10 p-6 mb-6 text-foreground/80 space-y-2">
              <p className="font-semibold text-primary">Mostlysterile Distribution</p>
              <p>Unit 47B, Storage Facility Off Route 9</p>
              <p>Postal code available upon request</p>
            </div>

            <h3 className="text-lg font-heading font-semibold text-primary mb-3">Hours of Operation</h3>
            <div className="border border-primary/20 bg-secondary/10 p-6 text-foreground/80 text-sm space-y-2">
              <div className="flex justify-between"><span>Weekdays</span><span>Variable</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>Appointment</span></div>
              <div className="flex justify-between"><span>Sunday</span><span>Unavailable</span></div>
              <div className="flex justify-between"><span>Bob&rsquo;s Days Off</span><span>Reduced Staff</span></div>
            </div>

            <p className="mt-6 text-xs italic text-foreground/50 leading-relaxed">
              Walk-in inquiries are discouraged. Access to the facility is controlled and visitor parking is limited to the strip of gravel next to the dumpster.
            </p>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Submit an Inquiry</h2>
            <form className="space-y-4 border border-primary/20 bg-background p-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full bg-background border border-primary/30 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full bg-background border border-primary/30 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-1">Reason for Contacting</label>
                <select className="w-full bg-background border border-primary/30 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary">
                  <option>Complaint</option>
                  <option>Legal Notice</option>
                  <option>Compliment (unlikely)</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <p className="block text-xs uppercase tracking-widest text-foreground/60 mb-2">Are you a lawyer?</p>
                <div className="flex gap-6 text-sm text-foreground">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="lawyer" value="yes" className="accent-primary" />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="lawyer" value="no" className="accent-primary" defaultChecked />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-1">Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-background border border-primary/30 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full bg-primary text-background font-semibold uppercase tracking-wider px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Submit for Review
              </button>
              <p className="text-xs italic text-foreground/50 pt-2 border-t border-primary/10">
                Form data is not persisted. Submissions are queued for internal review. Response times vary and may be substantial.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Email footer */}
      <section className="py-8 px-4 border-t border-primary/10 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-widest text-foreground/50">
            For urgent matters outside submission channels, correspondence may be directed to{" "}
            <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary">bsambrone@gmail.com</a>
            . A response is not guaranteed.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the page**

In `src/sites/mostlysterile/index.ts`, add the import (bare component, no metadata):

```typescript
import MostlysterileContact from "./pages/contact"
```

Add the page entry after `"faq"`:

```typescript
  "contact": MostlysterileContact,
```

- [ ] **Step 3: Smoke-test, type-check, lint, commit**

Run: `npm run dev`
Open `http://localhost:3000/contact?site=mostlysterile`.
Expected: hero, facility info on the left, contact form on the right, small-print email footer.

```bash
npx tsc --noEmit && npm run lint
git add src/sites/mostlysterile/pages/contact.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add contact page with facility info and form"
```

---

## Task 13: Privacy page

**Goal:** Build `/privacy` — a satire privacy policy with seven escalating sections, plus an umbrella-policy callout per the platform pattern.

**Files:**
- Create: `src/sites/mostlysterile/pages/privacy.tsx`
- Modify: `src/sites/mostlysterile/index.ts`

- [ ] **Step 1: Create the privacy page**

Create `src/sites/mostlysterile/pages/privacy.tsx`:

```typescript
export const metadata = {
  title: "Privacy Policy — Mostlysterile",
  description: "Governed by the Specific Industries umbrella privacy policy.",
}

const sections = [
  {
    heading: "1. Information We Collect",
    body: "By accessing this site, you consent to our collection of information which is reasonably available to us in the ordinary course of business. This may include your name, email address, shipping address, payment information (where provided), browsing history on our site, browsing history on other sites (where observable), your approximate geographic location, the type of device you are using, the operating system of that device, and the date on which you last cleaned it. Our ability to collect any given item of this information is subject to the cooperation of your browser and of adjacent systems not under our control.",
  },
  {
    heading: "2. How We Use Your Information",
    body: "Information collected is used to fulfill orders, respond to inquiries, and improve our offering, or approximations of these purposes. Information may also be used for internal reporting, compliance activities where applicable, and the preparation of marketing communications that you may or may not have requested. We reserve the right to use information for purposes not enumerated in this section, provided such purposes are consistent with the general direction of our operations.",
  },
  {
    heading: "3. Information Sharing",
    body: "We share information with third parties as necessary to operate our business, including shipping partners, payment processors, and a gentleman named Steve. Steve does not have a computer, so information shared with Steve is printed out and placed in a binder in his office. Steve has not reviewed the binder since 2021, and the binder is, to our knowledge, still on his desk. We regard this as a form of data minimization.",
  },
  {
    heading: "4. Cookies and Tracking",
    body: "This site uses cookies. The cookies are first-party, server-side, and named after common clinical instruments (SCALPEL, FORCEPS, GAUZE). They persist until they are manually cleared. You may clear them through your browser. You may not opt out of their being set in the first place; by the time you are reading this notice, the cookies have been set.",
  },
  {
    heading: "5. Data Retention",
    body: "Information is retained for the duration of your relationship with Mostlysterile, plus a standard retention buffer of indefinite length. Our retention policy is informed by the observation that storage is, in practice, cheap, and deletion is, in practice, laborious. Information will be retained until such time as its retention becomes actively inconvenient, at which point retention practices will be reconsidered.",
  },
  {
    heading: "6. Your Rights",
    body: "You have the right to request access to, correction of, or deletion of the information we hold about you. You may submit such a request through our contact page. Requests are reviewed in the order received. Review may be prompt, delayed, or indefinite at our discretion. We reserve the right to decline requests which are unclear, burdensome, or submitted by a lawyer.",
  },
  {
    heading: "7. Changes to This Policy",
    body: "This policy may be updated at any time, for any reason, with or without notice, and with retroactive effect where retroactive effect is technically achievable. You are responsible for reviewing this page periodically. We will not notify you of updates; notification is deemed to have occurred when you next visit this page.",
  },
]

export default function MostlysterilePrivacy() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-6">Privacy Policy</h1>

        {/* Umbrella callout */}
        <div className="border border-primary/30 bg-secondary/20 p-5 mb-10 text-sm text-foreground/80">
          <p>
            The authoritative privacy policy for all Specific Industries properties, including this one, is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com/privacy
            </a>
            . That policy governs all actual data handling on this site. In the event of any conflict between the sections below and the umbrella policy, the umbrella policy controls.
          </p>
        </div>

        <div className="space-y-8 text-foreground/80 text-sm md:text-base leading-relaxed">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-heading font-bold text-primary text-lg md:text-xl mb-3">{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}

          <p className="uppercase text-xs text-foreground/50 tracking-wide pt-6 border-t border-primary/20 mt-8">
            Last reviewed: 2026-04-16 · Version 1.0 · Reviewer: pending
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Register the page**

In `src/sites/mostlysterile/index.ts`, add the import:

```typescript
import MostlysterilePrivacy, { metadata as privacyMetadata } from "./pages/privacy"
```

Add the page entry:

```typescript
  "privacy": { component: MostlysterilePrivacy, metadata: privacyMetadata },
```

- [ ] **Step 3: Smoke-test, type-check, lint, commit**

Run: `npm run dev`
Open `http://localhost:3000/privacy?site=mostlysterile`.
Expected: title, umbrella callout, 7 privacy sections, footer line.

```bash
npx tsc --noEmit && npm run lint
git add src/sites/mostlysterile/pages/privacy.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add privacy policy page"
```

---

## Task 14: Terms page

**Goal:** Build `/terms` — a satire terms-of-service page with the same umbrella-callout pattern.

**Files:**
- Create: `src/sites/mostlysterile/pages/terms.tsx`
- Modify: `src/sites/mostlysterile/index.ts`

- [ ] **Step 1: Create the terms page**

Create `src/sites/mostlysterile/pages/terms.tsx`:

```typescript
export const metadata = {
  title: "Terms of Service — Mostlysterile",
  description: "Governed by the Specific Industries umbrella terms of service.",
}

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body: "By accessing, browsing, viewing, screenshotting, or otherwise interacting with this site, you accept these terms in their entirety, including those portions of these terms that are not presently displayed, have been superseded by later versions, or have been struck by a court of competent jurisdiction but which Mostlysterile continues to consider operative in spirit.",
  },
  {
    heading: "2. Products and Services",
    body: "All products offered through this site are offered as-is, where-is, with or without original packaging, and in the condition received by our receiving team. Product descriptions reflect our best available assessment at time of listing and are not warranted. Images are representative. Actual units may differ from images in color, size, completeness, condition, or identity.",
  },
  {
    heading: "3. Orders and Fulfillment",
    body: "Orders are accepted at our discretion. Order acceptance may be withdrawn at any point prior to shipment for any reason. Shipping windows are estimated and may vary with operational conditions, staffing, weather, or the availability of Bob. Orders may be shipped from any location in our distribution network, or from a location outside our distribution network which we have recently become aware of.",
  },
  {
    heading: "4. Payments and Refunds",
    body: "Payments are processed through our payment partners. Prices are stated in US dollars and are subject to change without notice, including after order placement. Refund eligibility is reviewed on a case-by-case basis by our returns committee (one member). Decisions of the returns committee are final, subject to reversal at the committee's discretion.",
  },
  {
    heading: "5. Limitation of Liability",
    body: "To the maximum extent permitted by applicable law, Mostlysterile disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, sterility, non-toxicity, and suitability for clinical use. Our total liability for any claim arising from your use of this site or its products shall not exceed the purchase price of the product in question, or five US dollars, whichever is more convenient for us to compute.",
  },
  {
    heading: "6. Prohibited Uses",
    body: "You agree not to use this site or its products for any use that is unlawful in your jurisdiction, including but not limited to: unauthorized medical practice, unauthorized pharmaceutical distribution, unauthorized surgical intervention, unauthorized veterinary practice, unauthorized dental practice, and unauthorized review of these terms by a licensed attorney. Authorized uses are permitted subject to the remainder of this document.",
  },
  {
    heading: "7. Modifications",
    body: "We may modify these terms at any time, for any reason, with or without notice. Modified terms take effect immediately upon posting and apply retroactively where such application is technically feasible. Continued use of this site after modification constitutes acceptance of the modified terms. Discontinued use does not constitute non-acceptance.",
  },
]

export default function MostlysterileTerms() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-6">Terms of Service</h1>

        <div className="border border-primary/30 bg-secondary/20 p-5 mb-10 text-sm text-foreground/80">
          <p>
            The authoritative terms of service for all Specific Industries properties, including this one, are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com/terms
            </a>
            . Those terms govern all actual commercial relationships on this site. In the event of any conflict between the sections below and the umbrella terms, the umbrella terms control.
          </p>
        </div>

        <div className="space-y-8 text-foreground/80 text-sm md:text-base leading-relaxed">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-heading font-bold text-primary text-lg md:text-xl mb-3">{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}

          <p className="uppercase text-xs text-foreground/50 tracking-wide pt-6 border-t border-primary/20 mt-8">
            Last reviewed: 2026-04-16 · Version 1.0 · Reviewer: pending
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Register the page**

In `src/sites/mostlysterile/index.ts`, add the import:

```typescript
import MostlysterileTerms, { metadata as termsMetadata } from "./pages/terms"
```

Add the page entry:

```typescript
  "terms": { component: MostlysterileTerms, metadata: termsMetadata },
```

- [ ] **Step 3: Smoke-test, type-check, lint, commit**

Run: `npm run dev`
Open `http://localhost:3000/terms?site=mostlysterile`.
Expected: title, umbrella callout, 7 terms sections, footer line.

```bash
npx tsc --noEmit && npm run lint
git add src/sites/mostlysterile/pages/terms.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add terms of service page"
```

---

## Task 15: Cart and checkout pages

**Goal:** Add `/cart` and `/checkout` pages using the same commerce pattern as radiumroys but wired to Mostlysterile's products. Checkout is a decorative dead-end.

**Files:**
- Create: `src/sites/mostlysterile/pages/cart.tsx`
- Create: `src/sites/mostlysterile/pages/checkout.tsx`
- Modify: `src/sites/mostlysterile/index.ts`

- [ ] **Step 1: Create the cart page**

Create `src/sites/mostlysterile/pages/cart.tsx`:

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/mostlysterile/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const HANDLING_FEE = 4.99
const COMPLIANCE_PROCESSING = 2.49

export default function MostlysterileCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + HANDLING_FEE + COMPLIANCE_PROCESSING

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">Your Cart</h1>
          <p className="text-foreground/70 mb-8">
            Your cart is, at this time, empty. This situation is reversible.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse the Catalog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-8">Your Cart</h1>

        <div className="divide-y divide-foreground/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary/10 shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/products/${slug}`)} className="font-heading font-semibold text-primary hover:underline">
                  {product.name}
                </Link>
                <p className="text-foreground/70 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-foreground/20 text-foreground/60 hover:border-foreground/40 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-foreground/20 text-foreground/60 hover:border-foreground/40 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-foreground">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-foreground/40 hover:text-foreground/70 ml-2"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-foreground/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-foreground/80">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/80">
              <span>Handling &amp; Postage</span>
              <span>${HANDLING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/80">
              <span>Compliance Processing Fee</span>
              <span>${COMPLIANCE_PROCESSING.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-foreground/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
          </div>
          <p className="mt-4 text-right text-xs italic text-foreground/50">
            *Final total may reflect adjustments identified during checkout review.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the checkout page**

Create `src/sites/mostlysterile/pages/checkout.tsx`:

```typescript
"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function MostlysterileCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-4">
          Our Checkout System Is Under Review
        </h1>
        <p className="text-foreground/80 mb-8">
          Our payment processing partner is finalizing their recertification, a process they have been finalizing since 2023. We apologize for any inconvenience and appreciate your continued patience.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/60 text-sm mb-8">
          Estimated completion: upon the recertification partner&rsquo;s return of their outstanding paperwork. Paperwork has been outstanding for approximately eighteen months.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to the Catalog
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Register the pages**

In `src/sites/mostlysterile/index.ts`, add the imports:

```typescript
import MostlysterileCart from "./pages/cart"
import MostlysterileCheckout from "./pages/checkout"
```

Add the page entries (after `"terms"`):

```typescript
  "cart": MostlysterileCart,
  "checkout": MostlysterileCheckout,
```

- [ ] **Step 4: Smoke-test cart + checkout flow**

Run: `npm run dev`

1. Open `http://localhost:3000/products?site=mostlysterile`, click Add to Cart on any product. Verify toast appears.
2. Click the cart icon in the header. Verify navigation to `/cart` showing the added item with quantity controls, subtotal, handling fee, and compliance fee.
3. Click "Proceed to Checkout". Verify the checkout page renders with the FakeProgressBar.
4. Click "Return to the Catalog". Verify navigation back to products.

- [ ] **Step 5: Type-check, lint, commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/mostlysterile/pages/cart.tsx src/sites/mostlysterile/pages/checkout.tsx src/sites/mostlysterile/index.ts
git commit -m "feat(mostlysterile): add cart and checkout pages"
```

---

## Task 16: Final verification walkthrough

**Goal:** Confirm the site is fully wired: every nav item resolves, the sitemap includes the new URLs, lint and type-check are green, and the full user journey works end-to-end.

**Files:** (no file changes in this task unless issues surface; any fixes get committed separately)

- [ ] **Step 1: Run the full verification suite**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three complete without errors. `npm run build` should report that all static pages were generated, which is not the case for this site (all pages are dynamically rendered due to the catch-all reading headers); the build should nonetheless complete successfully.

If `npm run build` surfaces errors: fix them in-place, add and commit with a descriptive message. If it surfaces warnings only, proceed.

- [ ] **Step 2: Dev server walkthrough**

Run: `npm run dev`

Visit each of the following URLs and verify the page renders with correct content and no console errors:

- `http://localhost:3000/?site=mostlysterile` — Home
- `http://localhost:3000/products?site=mostlysterile` — Products (verify filter chips work)
- `http://localhost:3000/products/second-hand-scalpel?site=mostlysterile` — Product detail
- `http://localhost:3000/products/placebex?site=mostlysterile` — Product detail (different category)
- `http://localhost:3000/certifications?site=mostlysterile` — Certifications gallery
- `http://localhost:3000/quality-assurance?site=mostlysterile` — 12-step timeline
- `http://localhost:3000/leadership?site=mostlysterile` — Leadership grid
- `http://localhost:3000/about?site=mostlysterile` — About + milestones
- `http://localhost:3000/faq?site=mostlysterile` — FAQ accordion
- `http://localhost:3000/contact?site=mostlysterile` — Contact form
- `http://localhost:3000/privacy?site=mostlysterile` — Privacy policy
- `http://localhost:3000/terms?site=mostlysterile` — Terms of service
- `http://localhost:3000/cart?site=mostlysterile` — Cart (empty state, then with an item)
- `http://localhost:3000/checkout?site=mostlysterile` — Checkout dead-end

Also verify: header nav links work within the site (thanks to the sticky dev cookie), the cart icon shows the badge count after adding an item, and the theme colors (navy primary, mint secondary, yellow accent) render consistently.

- [ ] **Step 3: Sitemap verification**

With the dev server running, open `http://localhost:3000/sitemap.xml`.

Expected: the XML response includes entries for:
- `https://mostlysterile.specificindustries.com/` (home)
- `https://mostlysterile.specificindustries.com/products`
- `https://mostlysterile.specificindustries.com/about`
- `https://mostlysterile.specificindustries.com/certifications`
- `https://mostlysterile.specificindustries.com/quality-assurance`
- `https://mostlysterile.specificindustries.com/leadership`
- `https://mostlysterile.specificindustries.com/faq`
- `https://mostlysterile.specificindustries.com/contact`
- `https://mostlysterile.specificindustries.com/privacy`
- `https://mostlysterile.specificindustries.com/terms`
- All 16 product detail URLs at `.../products/<slug>`

Verify that `cart` and `checkout` URLs are NOT present (they're in the `EXCLUDED_PAGES` set).

Stop the dev server.

- [ ] **Step 4: Final commit (if any fixes were made)**

If Steps 1–3 required any fixes, commit them:

```bash
git add -- <files you changed>
git commit -m "fix(mostlysterile): address verification findings"
```

If no fixes were required, this step is a no-op.

- [ ] **Step 5: Confirm clean state**

Run: `git status`
Expected: working tree clean, current branch is main (or the feature branch the task was executed on), and all commits from Tasks 1–15 are present.

---

## Follow-up (out of scope for this plan)

The following are explicitly deferred per the spec:

- **Per-product photography.** All 16 products reference placeholder image paths at `/sites/mostlysterile/product-<slug>.png` that do not yet exist. Image generation can be run as a separate follow-up task using the existing `mcp__image-gen` tooling, following the approach used by recent squaredaway work.
- **Hero and leadership team photos.** `/sites/mostlysterile/hero.png` and `/sites/mostlysterile/team-*.png` are referenced by `config.ts` and `leadership.tsx` respectively. Also deferred to a follow-up.
- **Real contact form submission.** Form is currently decorative.
- **OG image variations per page.** Only the site-wide OG image is set on the config; per-page overrides can be added later if a specific page warrants it.

---

## Summary

This plan ships a complete, functional Mostlysterile satire e-commerce site across 16 tasks. It adds one new shared component (`CertificationCard`), a 16-product catalog, ten unique pages plus cart/checkout, and the required registry/sitemap integrations. Per the spec, verification is lint + type-check + manual walkthrough.

Total expected file additions: 14 new files under `src/sites/mostlysterile/` + 1 new shared component under `src/components/ui/`.
Total expected file modifications: 3 (`registry.ts`, `subdomains.ts`, `sitemap.ts`).
