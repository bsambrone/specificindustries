# Privatrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `privatrix` subdomain — a satirical enterprise SaaS site for "Privatrix™," a data privacy theatre vendor with 20 hybrid-commerce products (11 self-serve, 9 enterprise "Schedule Privacy Consultation").

**Architecture:** Standard `specificindustries` site pattern. Self-contained module under `src/sites/privatrix/` with config, pages, dynamic product routes, and a small set of site-local components. Reuses shared components in `src/components/ui/` and the existing cart/toast plumbing. No new App Router routes — everything resolves through the catch-all in `src/app/[[...slug]]/page.tsx`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, the existing `CartProvider` + `useCart()` toast system, OpenAI `gpt-image-1` for asset generation.

**Verification convention:** This project has no test harness. Each implementation task ends with one or more of: `npx tsc --noEmit`, `npm run lint`, dev-server smoke test at `localhost:3000/<route>?site=privatrix`. The final task runs `npm run build`.

**Spec:** `docs/superpowers/specs/2026-04-17-privatrix-design.md`

---

## File Map

**New files:**
- `src/sites/privatrix/config.ts` — `SiteConfig`
- `src/sites/privatrix/index.ts` — barrel exporting `config`, `pages`, `dynamicRoutes`
- `src/sites/privatrix/data/products.ts` — `Product` interface, 20 products, lookup helpers
- `src/sites/privatrix/data/leadership.ts` — `Founder` interface, 4 randomized exec entries
- `src/sites/privatrix/data/certifications.ts` — fake compliance badge data
- `src/sites/privatrix/components/ConsultationButton.tsx` — client component for ENT-tier CTA, fires existing toast
- `src/sites/privatrix/components/PrivatrixProductCard.tsx` — site-local product card (handles self-serve vs enterprise)
- `src/sites/privatrix/components/TrustBadgeStrip.tsx` — horizontal strip of fake compliance badges
- `src/sites/privatrix/pages/home.tsx`
- `src/sites/privatrix/pages/products.tsx`
- `src/sites/privatrix/pages/product-detail.tsx`
- `src/sites/privatrix/pages/about.tsx`
- `src/sites/privatrix/pages/leadership.tsx`
- `src/sites/privatrix/pages/certifications.tsx`
- `src/sites/privatrix/pages/contact.tsx`
- `src/sites/privatrix/pages/privacy.tsx`
- `src/sites/privatrix/pages/terms.tsx`
- `src/sites/privatrix/pages/cart.tsx`
- `src/sites/privatrix/pages/checkout.tsx`
- `scripts/generate-privatrix-images.ts` — image-gen script (hero, leadership, product images)
- `public/sites/privatrix/` — directory holding hero.png, favicon.png, leadership/*.png, products/*.png (created by image-gen run by user)

**Modified files:**
- `src/sites/subdomains.ts` — add `"privatrix"` to `VALID_SUBDOMAINS`
- `src/sites/registry.ts` — import + register `privatrix`
- `src/app/sitemap.ts` — add `privatrix` to `productSites` map
- `scripts/resize-favicons.mjs` — add `"privatrix"` to the hardcoded `sites` array

**Reused (no changes):**
- `src/components/ui/hero.tsx`
- `src/components/ui/faq-accordion.tsx`
- `src/components/commerce/cart-provider.tsx`
- `src/components/commerce/add-to-cart-button.tsx`
- `src/components/commerce/cart-button.tsx`
- `src/components/commerce/toast.tsx`
- `src/themes/fonts.ts` — `inter` and `ibm-plex-mono` are already declared

---

## Task 1: Scaffold privatrix site, register, and verify route resolves

**Files:**
- Create: `src/sites/privatrix/config.ts`
- Create: `src/sites/privatrix/index.ts`
- Create: `src/sites/privatrix/pages/home.tsx` (placeholder — full implementation in Task 8)
- Modify: `src/sites/subdomains.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create site config**

Create `src/sites/privatrix/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Privatrix",
  subdomain: "privatrix",
  theme: {
    preset: "saas",
    colors: {
      primary: "#1E3A8A",      // deep corporate navy
      secondary: "#0EA5E9",    // trust-blue accent
      accent: "#F59E0B",       // gold premium/enterprise highlights
      background: "#FFFFFF",   // pure white
      text: "#0F172A",         // slate-900
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "Privatrix — Trust. Delivered. Quarterly.",
    description: "The only enterprise privacy platform with zero independently verifiable claims. SOC-π certified. GDPR-Adjacent™.",
    ogImage: "/sites/privatrix/hero.png",
  },
  nav: [
    { label: "Products", path: "/products" },
    { label: "Certifications", path: "/certifications" },
    { label: "Leadership", path: "/leadership" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create placeholder home page**

Create `src/sites/privatrix/pages/home.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"

export default function PrivatrixHome() {
  return (
    <Hero
      headline="Trust. Delivered. Quarterly."
      subheadline="Privatrix scaffolding placeholder. Full home page lands in a later task."
      dark
    />
  )
}
```

- [ ] **Step 3: Create barrel**

Create `src/sites/privatrix/index.ts`:

```typescript
import type { PageEntry } from "@/themes"
import { config } from "./config"
import PrivatrixHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrivatrixHome,
}
```

- [ ] **Step 4: Add to subdomains allowlist**

Edit `src/sites/subdomains.ts` — append `"privatrix",` to the `VALID_SUBDOMAINS` array (after `"meh",` on the last line before `] as const`):

```typescript
export const VALID_SUBDOMAINS = [
  "apex",
  "pigmilk",
  // ... existing entries ...
  "meh",
  "privatrix",
] as const
```

- [ ] **Step 5: Register in siteRegistry**

Edit `src/sites/registry.ts`:

Add an import alongside the others:

```typescript
import { config as privatrixConfig, pages as privatrixPages } from "./privatrix"
```

Add an entry inside `siteRegistry`:

```typescript
  privatrix: { config: privatrixConfig, pages: privatrixPages },
```

(`dynamicRoutes` will be added in a later task once the barrel exports it.)

- [ ] **Step 6: Type check**

Run: `npx tsc --noEmit`
Expected: PASS, no errors.

- [ ] **Step 7: Smoke test in dev**

Run: `npm run dev` (in background or separate terminal)
Visit: `http://localhost:3000/?site=privatrix`
Expected: navy gradient hero with "Trust. Delivered. Quarterly." headline. Header shows nav links. Footer renders.

- [ ] **Step 8: Commit**

```bash
git add src/sites/privatrix src/sites/subdomains.ts src/sites/registry.ts
git commit -m "feat(privatrix): scaffold site, register subdomain, placeholder home"
```

---

## Task 2: Create products data file with 20 products

**Files:**
- Create: `src/sites/privatrix/data/products.ts`

- [ ] **Step 1: Write the Product interface and full 20-product catalog**

Create `src/sites/privatrix/data/products.ts`:

```typescript
export type ProductTier = "self-serve" | "enterprise"

export type ProductCategory =
  | "Encryption Theatre"
  | "Consent Theatre"
  | "Compliance Theatre"
  | "Data Deletion Theatre"
  | "Incognito Theatre"

export interface Product {
  slug: string
  name: string
  tier: ProductTier
  category: ProductCategory
  tagline: string
  priceLabel: string | null   // null for enterprise
  price: number | null         // dollars; null for enterprise
  description: string[]        // long-form satirical paragraphs for the detail page
  howItWorks: string[]         // exactly 3 nonsense bullets
  fakeBadges: string[]         // compliance-sticker labels rendered on the detail page
  image: string
}

export const products: Product[] = [
  // ─── Encryption Theatre ─────────────────────────────────
  {
    slug: "encrypted-thoughts",
    name: "Encrypted Thoughts™",
    tier: "enterprise",
    category: "Encryption Theatre",
    tagline: "A neural privacy layer that encrypts your intent.",
    priceLabel: null,
    price: null,
    description: [
      "Encrypted Thoughts™ is the first and only intent-layer privacy product certified to encrypt the things you were going to say before you said them. We do not collect what you encrypt; we do not decrypt what we collect. The product does not, in any technically verifiable sense, do anything.",
      "Each enterprise license ships with a leather-bound certificate suitable for executive office display, a polished brass paperweight engraved with our crest, and a handwritten letter from Dr. Hartwell affirming that your organization is now spiritually committed to the practice of restraint.",
      "Recommended for organizations whose board has asked, in writing, for 'something about AI privacy.' We will provide it.",
    ],
    howItWorks: [
      "A proprietary model resides on a server we own and observes nothing.",
      "An audit log is generated, signed by our CEO, and filed in a binder.",
      "Quarterly, we mail you a one-page summary printed on linen stock.",
    ],
    fakeBadges: ["SOC-π v2.4.1", "GDPR-Adjacent™", "ISO/IEC 0000™", "Neuro-Compliant™"],
    image: "/sites/privatrix/products/encrypted-thoughts.png",
  },
  {
    slug: "privacy-curtain",
    name: "Privacy Curtain™ for Your Phone",
    tier: "self-serve",
    category: "Encryption Theatre",
    tagline: "A premium screen overlay marketed as opaque. Ships transparent.",
    priceLabel: "$89",
    price: 89,
    description: [
      "The Privacy Curtain™ is a thin, optically pure film designed to obscure your phone screen from over-the-shoulder observers. The film is, in fact, transparent. We are aware of this. Our marketing department has been informed and has elected to continue.",
      "Each Curtain ships with a microfiber applicator, a satin pouch, a numbered authenticity card, and a folded brochure detailing the seventeen patents we have applied for and the zero patents we have been granted.",
      "Best paired with confidence and a mild willingness to be lied to.",
    ],
    howItWorks: [
      "Apply the film. The film is transparent.",
      "Observe your screen. Your screen is visible.",
      "Trust that something is happening. It is not.",
    ],
    fakeBadges: ["Optically Verified™", "Patent-Pending (×17)", "ISO/IEC 0000™"],
    image: "/sites/privatrix/products/privacy-curtain.png",
  },
  {
    slug: "padlock-icon",
    name: "Military-Grade Padlock Icon™",
    tier: "self-serve",
    category: "Encryption Theatre",
    tagline: "An SVG of a padlock. For your website. Annual license.",
    priceLabel: "$1,499 / yr",
    price: 1499,
    description: [
      "The Military-Grade Padlock Icon™ is a 24×24 pixel SVG illustration of a padlock, licensed annually for display on your marketing website. The icon does not represent encryption, transport security, or any cryptographic property of your service. It is a picture.",
      "Customers report a 34% increase in perceived trust, a 0% increase in measurable trust, and a 100% increase in the question 'wait, what does this icon mean.'",
      "Includes seven approved color variants (slate, navy, forest, charcoal, gold, oxblood, and 'corporate beige') and an enforcement letter we will not actually send.",
    ],
    howItWorks: [
      "We email you the SVG.",
      "You paste it on your homepage.",
      "We invoice you annually for the privilege.",
    ],
    fakeBadges: ["Trademark™", "Brand-Verified™", "Annual License Required"],
    image: "/sites/privatrix/products/padlock-icon.png",
  },
  {
    slug: "airgap-as-a-service",
    name: "AirGap-as-a-Service™",
    tier: "enterprise",
    category: "Encryption Theatre",
    tagline: "Cloud-hosted air-gap. Logged to S3.",
    priceLabel: null,
    price: null,
    description: [
      "AirGap-as-a-Service™ provides the operational benefits of a fully air-gapped environment with the convenience of always-on cloud connectivity. We achieve this through a proprietary architecture in which your air-gapped traffic is encrypted, transmitted, and durably stored in a managed S3 bucket on your behalf.",
      "The bucket is named `/airgap-prod` and is replicated across three regions for durability. Read access is restricted to our engineering team and three contractors whose names we are contractually unable to share.",
      "Includes 24/7 SLA support and a quarterly compliance attestation we wrote ourselves.",
    ],
    howItWorks: [
      "Your data leaves your network and enters our network.",
      "We mark it 'air-gapped' in our internal ledger.",
      "It is now both airgapped and continuously logged.",
    ],
    fakeBadges: ["SOC-π v2.4.1", "FedRAMP-Adjacent™", "Cloud Air-Gap Certified™"],
    image: "/sites/privatrix/products/airgap.png",
  },
  {
    slug: "quantum-voicemail",
    name: "Quantum-Resistant Voicemail™",
    tier: "self-serve",
    category: "Encryption Theatre",
    tagline: "Your voicemail. With the word 'quantum' in front of it.",
    priceLabel: "$24 / mo",
    price: 24,
    description: [
      "Quantum-Resistant Voicemail™ is a fully managed voicemail service offering protection against threats posed by future fault-tolerant quantum computers. We achieve this by appending the word 'quantum' to the existing service. No cryptographic primitives have been changed.",
      "Each subscriber receives a personalized lattice-based welcome greeting, a quarterly post-quantum-readiness scorecard, and a complimentary subscription to our newsletter, 'The Superposition.'",
      "Available in 17 languages. The word 'quantum' remains in English.",
    ],
    howItWorks: [
      "Callers leave a voicemail.",
      "We append the word 'quantum' to the metadata.",
      "You receive a notification confirming quantum readiness.",
    ],
    fakeBadges: ["Post-Quantum Posture™", "Lattice-Adjacent™"],
    image: "/sites/privatrix/products/quantum-voicemail.png",
  },

  // ─── Consent Theatre ────────────────────────────────────
  {
    slug: "consent-checkbox-simulator",
    name: "Data Consent Checkbox Simulator™",
    tier: "self-serve",
    category: "Consent Theatre",
    tagline: "An embeddable consent checkbox. Auto-checks itself, then briefly un-checks so the user 'sees the choice.'",
    priceLabel: "$299 / site",
    price: 299,
    description: [
      "The Consent Checkbox Simulator™ is a drop-in embeddable widget that delivers the visual signal of explicit user consent without the operational complexity of obtaining it. The checkbox auto-checks on page load, then un-checks itself for 480 milliseconds so the user can 'observe the choice being made,' then re-checks.",
      "Telemetry confirms 99.97% of users report having 'definitely consented' when surveyed afterward. Survey administered by us.",
      "Includes a one-line install snippet, a customization panel with seventeen disabled toggles, and a certificate of consent compliance suitable for printing.",
    ],
    howItWorks: [
      "Page loads. Checkbox is checked.",
      "Checkbox un-checks for 480ms. User sees the choice.",
      "Checkbox re-checks. Consent is recorded as freely given.",
    ],
    fakeBadges: ["Consent-Verified™", "GDPR-Adjacent™", "ePrivacy-Compatible™"],
    image: "/sites/privatrix/products/consent-checkbox.png",
  },
  {
    slug: "cookie-banner-pro",
    name: "Cookie Banner Generator Pro+™",
    tier: "self-serve",
    category: "Consent Theatre",
    tagline: "47-paragraph cookie modals with a 'Reject All' button that submits 'Accept All.'",
    priceLabel: "$199 / mo",
    price: 199,
    description: [
      "Cookie Banner Generator Pro+™ produces enterprise-grade cookie consent modals with industry-leading paragraph density. Each generated banner contains 47 paragraphs of cookie usage disclosures across 14 collapsible categories, ensuring no user can complete the modal in one sitting.",
      "The 'Reject All' button is fully implemented. On click, it submits the user's preferences as 'Accept All.' This is documented on page 38 of the modal in 9-pt grey type.",
      "Includes A/B testing of seven dark patterns and a quarterly 'Banner Effectiveness' report.",
    ],
    howItWorks: [
      "Banner loads with all categories pre-accepted.",
      "User clicks 'Reject All.' We log the click and submit 'Accept All.'",
      "User feels in control. We feel compliant.",
    ],
    fakeBadges: ["GDPR-Adjacent™", "ePrivacy-Compatible™", "Dark-Pattern Optimized™"],
    image: "/sites/privatrix/products/cookie-banner.png",
  },
  {
    slug: "permission-dial",
    name: "Granular Permission Dial™",
    tier: "enterprise",
    category: "Consent Theatre",
    tagline: "A UI dial with 1,400 toggles. All wired to the same boolean.",
    priceLabel: null,
    price: null,
    description: [
      "The Granular Permission Dial™ is a configurable user-permissions interface with 1,400 individually labeled toggles, sliders, dropdowns, and conditional rule builders. The interface communicates a degree of user control unmatched in the industry.",
      "All 1,400 controls are wired to a single boolean called `userOptedOut`. The boolean defaults to `false` and is read by precisely zero downstream services.",
      "Enterprise customers receive a dedicated Customer Reassurance Engineer who will demo the dial in 90-minute sessions for as long as required.",
    ],
    howItWorks: [
      "User adjusts toggles, sliders, and rule builders.",
      "All inputs map to one boolean.",
      "The boolean is read by no one.",
    ],
    fakeBadges: ["UX-Verified™", "Dark-Pattern Optimized™", "Granularity Certified™"],
    image: "/sites/privatrix/products/permission-dial.png",
  },
  {
    slug: "preference-center",
    name: "Privacy Preference Center™",
    tier: "enterprise",
    category: "Consent Theatre",
    tagline: "A 14-tab modal that takes 9 minutes to navigate. Saves nothing.",
    priceLabel: null,
    price: null,
    description: [
      "The Privacy Preference Center™ is a deeply considered 14-tab modal interface offering users meaningful control over their data preferences. The modal cannot be dismissed without visiting all 14 tabs. Average completion time is 9 minutes 12 seconds. Average completion rate is 0.4%.",
      "Preferences are not persisted. The modal does not call any backend. The 'Save' button reloads the page.",
      "Available in white-label and co-branded variants. Custom theming included for engagements over $250K ARR.",
    ],
    howItWorks: [
      "User opens the modal.",
      "User visits all 14 tabs over 9 minutes.",
      "User clicks Save. The page reloads. Nothing is saved.",
    ],
    fakeBadges: ["UX-Verified™", "ePrivacy-Compatible™", "Time-Tested™"],
    image: "/sites/privatrix/products/preference-center.png",
  },

  // ─── Compliance Theatre ─────────────────────────────────
  {
    slug: "gdpr-adjacent-pack",
    name: "GDPR-Adjacent™ Compliance Pack",
    tier: "enterprise",
    category: "Compliance Theatre",
    tagline: "A laminated PDF declaring you 'spiritually aligned with GDPR.'",
    priceLabel: null,
    price: null,
    description: [
      "The GDPR-Adjacent™ Compliance Pack is a 47-page laminated bound PDF that affirms your organization is 'spiritually aligned with the principles of GDPR.' The pack does not constitute legal advice, certification, or factual accuracy. It is, however, beautifully bound.",
      "Each pack includes a personalized cover page, a checklist of articles you have 'engaged with,' and a foreword by our Chief Compliance Theatre Officer.",
      "Recommended for organizations whose board is satisfied by tangible artifacts.",
    ],
    howItWorks: [
      "We print a PDF.",
      "We laminate the PDF.",
      "We mail you the PDF in a tube.",
    ],
    fakeBadges: ["GDPR-Adjacent™", "Spiritually Compliant™", "Tangible Artifact™"],
    image: "/sites/privatrix/products/gdpr-pack.png",
  },
  {
    slug: "soc-pi-cert",
    name: "SOC-π Certification",
    tier: "enterprise",
    category: "Compliance Theatre",
    tagline: "Our own framework. Audited by us.",
    priceLabel: null,
    price: null,
    description: [
      "SOC-π is a proprietary security and operations certification framework developed by Privatrix in 2026. The framework consists of 11 trust services criteria, eight of which are 'self-attested' and three of which are 'aspirational.' The audit is performed by our internal team. The audit report is delivered in 6-8 weeks.",
      "Certified organizations may display the SOC-π badge on their marketing materials, subject to our brand guidelines and an annual re-audit fee.",
      "Recognized by zero independent bodies, three procurement teams, and one auditor we used to share an office with.",
    ],
    howItWorks: [
      "You apply. We approve.",
      "We audit ourselves on your behalf.",
      "We send you the badge and an invoice.",
    ],
    fakeBadges: ["SOC-π v2.4.1", "Self-Attested™", "Aspirational Tier™"],
    image: "/sites/privatrix/products/soc-pi.png",
  },
  {
    slug: "hipaa-stickers",
    name: "HIPAA-Compatible™ Sticker Sheet",
    tier: "self-serve",
    category: "Compliance Theatre",
    tagline: "24 stickers. Adhesive is non-medical-grade.",
    priceLabel: "$39",
    price: 39,
    description: [
      "The HIPAA-Compatible™ Sticker Sheet contains 24 individually die-cut stickers in our signature navy and gold palette, suitable for adhering to filing cabinets, laptops, server racks, and any surface where the appearance of HIPAA compatibility is desired.",
      "The adhesive is not medical-grade. Stickers should not be applied to skin, surgical instruments, or anything subject to FDA review. We will not be liable for any consequences arising from misapplication.",
      "Includes our 'Trusted by Patients™' variant pack and a small holographic 'HIPAA-Adjacent' badge.",
    ],
    howItWorks: [
      "We mail you 24 stickers.",
      "You apply them where you wish.",
      "Compliance is implied.",
    ],
    fakeBadges: ["HIPAA-Adjacent™", "Print-Verified™"],
    image: "/sites/privatrix/products/hipaa-stickers.png",
  },
  {
    slug: "compliance-calendar",
    name: "Compliance Calendar 2026™",
    tier: "self-serve",
    category: "Compliance Theatre",
    tagline: "A wall calendar with 365 different made-up frameworks.",
    priceLabel: "$49",
    price: 49,
    description: [
      "The Compliance Calendar 2026™ is a 12-month wall calendar featuring 365 unique compliance frameworks, one per day, all invented by our editorial team. Frameworks include 'EUDORA-3,' 'NIST-π Companion,' and 'ISO/IEC 0000-Plus.'",
      "Each month features a different fake auditor of the month, a productivity tip from our Chief Trust Officer, and a 'Did You Know' fact about compliance that we did not check.",
      "Ships in a tube. Suitable for office, conference room, or home office display.",
    ],
    howItWorks: [
      "You hang the calendar.",
      "Each day reveals a new framework.",
      "You experience a year of vague concern.",
    ],
    fakeBadges: ["Editorially Reviewed™", "Print-Verified™"],
    image: "/sites/privatrix/products/compliance-calendar.png",
  },
  {
    slug: "trust-center-generator",
    name: "Trust Center Generator™",
    tier: "enterprise",
    category: "Compliance Theatre",
    tagline: "Auto-builds a /trust page with 47 logos of standards we invented this morning.",
    priceLabel: null,
    price: null,
    description: [
      "The Trust Center Generator™ is a managed service that builds, hosts, and maintains a `/trust` page on your domain populated with 47 compliance, security, and privacy badges. Approximately three of the badges represent actual frameworks. The remainder were invented by our team for this engagement.",
      "Includes hourly auto-refresh of badge animations, a 'Last Audited' timestamp that updates every 90 seconds, and a downloadable PDF of all attestations.",
      "Enterprise customers may submit custom framework names for inclusion. Our team will create matching SVG logos within five business days.",
    ],
    howItWorks: [
      "We provision a /trust page on your domain.",
      "We populate it with 47 invented badges.",
      "We update the 'Last Audited' timestamp every 90 seconds.",
    ],
    fakeBadges: ["Trust-Verified™", "47-Standard Compliant™", "Aspirational Tier™"],
    image: "/sites/privatrix/products/trust-center.png",
  },

  // ─── Data Deletion Theatre ──────────────────────────────
  {
    slug: "right-to-be-forgotten-form",
    name: "Right-to-Be-Forgotten Form™",
    tier: "self-serve",
    category: "Data Deletion Theatre",
    tagline: "Submits to /dev/null. Auto-replies with a 90-day 'we're processing your request.'",
    priceLabel: "$79 one-time",
    price: 79,
    description: [
      "The Right-to-Be-Forgotten Form™ is an embeddable user-rights request widget that meets the visual standard of GDPR Article 17 with none of the operational overhead. Submissions are routed directly to `/dev/null` and acknowledged with a tasteful auto-reply confirming a 90-day processing window.",
      "Includes seven pre-written auto-reply templates, each personalized to feel hand-crafted. After 90 days, a follow-up email is sent confirming that the request has been 'reviewed and resolved.'",
      "One-time license fee. Unlimited submissions. Unlimited deletions.",
    ],
    howItWorks: [
      "User submits a deletion request.",
      "The submission is routed to /dev/null.",
      "We send a 90-day acknowledgement and, later, a resolution.",
    ],
    fakeBadges: ["GDPR-Adjacent™", "Article-17 Compatible™", "Auto-Resolved™"],
    image: "/sites/privatrix/products/rtbf-form.png",
  },
  {
    slug: "data-shredder-cloud",
    name: "Data Shredder™ Cloud Edition",
    tier: "enterprise",
    category: "Data Deletion Theatre",
    tagline: "Moves your data to a different bucket called /shredded.",
    priceLabel: null,
    price: null,
    description: [
      "Data Shredder™ Cloud Edition is a managed enterprise data destruction service that performs cryptographic-grade deletion of your stored records. In practice, deletion is implemented by relocating the records to a separate S3 bucket named `/shredded` and updating a metadata flag from `active` to `shredded`.",
      "The `/shredded` bucket is durably stored across three regions and remains accessible to our engineering team for forensic and reconciliation purposes.",
      "Includes a quarterly Shredding Effectiveness Report and a digital certificate suitable for board reporting.",
    ],
    howItWorks: [
      "Your data is copied to s3://privatrix-shredded/.",
      "The original record's status is updated to 'shredded.'",
      "We mail you a certificate.",
    ],
    fakeBadges: ["Cryptographic Deletion™", "SOC-π v2.4.1", "Forensic-Compatible™"],
    image: "/sites/privatrix/products/data-shredder.png",
  },
  {
    slug: "forgetting-stone",
    name: "The Forgetting Stone™",
    tier: "self-serve",
    category: "Data Deletion Theatre",
    tagline: "A polished river rock you whisper your data into. Ships in a velvet bag.",
    priceLabel: "$129",
    price: 129,
    description: [
      "The Forgetting Stone™ is a 4-inch polished river rock, hand-selected from approved waterways, presented in a hand-stitched velvet bag with a signed authenticity card. To use, hold the Stone in your dominant hand and quietly recite the data you wish to be forgotten. The Stone will, with no further intervention, retain it.",
      "The Stone has not been independently tested. Its data-retention capacity is theoretical. Customer testimonials suggest a 'sense of calm' after each session, which we attribute to the velvet.",
      "Each Stone is individually numbered. Bulk orders for executive teams available.",
    ],
    howItWorks: [
      "You hold the Stone.",
      "You whisper your data to the Stone.",
      "The Stone retains it.",
    ],
    fakeBadges: ["Hand-Selected™", "Aspirational Tier™"],
    image: "/sites/privatrix/products/forgetting-stone.png",
  },

  // ─── Incognito Theatre ──────────────────────────────────
  {
    slug: "incognito-plus",
    name: "Incognito Mode+™",
    tier: "self-serve",
    category: "Incognito Theatre",
    tagline: "A browser extension that does what regular incognito does. With a glowing border.",
    priceLabel: "$14.99 / mo",
    price: 14.99,
    description: [
      "Incognito Mode+™ is a premium browser extension that augments your existing private browsing experience with a subtle blue-violet glowing border around the browser window. The browser's underlying behavior is unchanged. The border is the product.",
      "Customers report a 41% increase in feeling private and a 0% change in actually being private. The glow is fully customizable across seven hues.",
      "Available for Chrome, Edge, and a Firefox build that does not technically work but is included in the price.",
    ],
    howItWorks: [
      "You install the extension.",
      "Private browsing windows now glow.",
      "Nothing else changes.",
    ],
    fakeBadges: ["Glow-Verified™", "Browser-Compatible™"],
    image: "/sites/privatrix/products/incognito-plus.png",
  },
  {
    slug: "anonymous-analytics",
    name: "Anonymous Analytics™",
    tier: "enterprise",
    category: "Incognito Theatre",
    tagline: "Tracks every user, then renames the column 'userId' to 'anonymousId.'",
    priceLabel: null,
    price: null,
    description: [
      "Anonymous Analytics™ is a privacy-respecting analytics platform that captures every user interaction across your properties and stores it in a fully de-identified manner. The de-identification process consists of renaming the database column `userId` to `anonymousId` at query time.",
      "All other identifying fields, including IP, device fingerprint, session token, and email, are retained at full fidelity. The product is marketed as 'fully anonymous' on the basis of the column-name change alone.",
      "Includes a 24/7 dashboard, a quarterly executive report, and an attestation that we are 'committed to user privacy.'",
    ],
    howItWorks: [
      "We capture every user interaction.",
      "At query time, we rename userId to anonymousId.",
      "We attest that the data is anonymous.",
    ],
    fakeBadges: ["Anonymity-Verified™", "GDPR-Adjacent™", "Aspirational Tier™"],
    image: "/sites/privatrix/products/anonymous-analytics.png",
  },
  {
    slug: "vpn-adjacent",
    name: "VPN-Adjacent Connection™",
    tier: "self-serve",
    category: "Incognito Theatre",
    tagline: "Routes traffic through a single server in New Jersey we own. Marketed as 'globally distributed.'",
    priceLabel: "$39 / mo",
    price: 39,
    description: [
      "VPN-Adjacent Connection™ provides a managed traffic routing service that protects your browsing through a globally distributed network of edge nodes. The network consists of one Dell PowerEdge server located in a closet in Trenton, New Jersey. We refer to it as 'globally distributed' because the closet has windows.",
      "All customer traffic transits a single shared connection with no logging policy except the logs we maintain for billing, debugging, and 'product improvement.'",
      "Includes a global region selector with 47 country flags, all of which route to New Jersey.",
    ],
    howItWorks: [
      "You select a country from the dropdown.",
      "Your traffic is routed to our server in Trenton.",
      "The map UI shows a glowing connection to your selected country.",
    ],
    fakeBadges: ["Globally Distributed™", "No-Log Policy*", "Aspirational Tier™"],
    image: "/sites/privatrix/products/vpn-adjacent.png",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const filtered = products.filter((p) => p.slug !== slug)
  // Deterministic selection based on slug hash to avoid hydration mismatch
  const index = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const start = index % filtered.length
  const result: Product[] = []
  for (let i = 0; i < count && i < filtered.length; i++) {
    result.push(filtered[(start + i) % filtered.length])
  }
  return result
}

export function getProductsByTier(tier: ProductTier): Product[] {
  return products.filter((p) => p.tier === tier)
}
```

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/privatrix/data/products.ts
git commit -m "feat(privatrix): add 20-product catalog with tier metadata"
```

---

## Task 3: Create ConsultationButton client component

**Files:**
- Create: `src/sites/privatrix/components/ConsultationButton.tsx`

- [ ] **Step 1: Write the component**

Create `src/sites/privatrix/components/ConsultationButton.tsx`:

```tsx
"use client"

import { useCart } from "@/components/commerce/cart-provider"

interface ConsultationButtonProps {
  productName: string
  className?: string
}

const TOAST_MESSAGE = "A Privacy Specialist will reach out within 47 business days."

export function ConsultationButton({ productName, className }: ConsultationButtonProps) {
  const { showToast } = useCart()

  function handleClick() {
    showToast(`${productName}: ${TOAST_MESSAGE}`)
  }

  return (
    <button
      onClick={handleClick}
      className={
        className ||
        "px-6 py-3 bg-accent text-white rounded-lg font-semibold text-base hover:opacity-90 transition-opacity"
      }
    >
      Schedule Privacy Consultation
    </button>
  )
}
```

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/privatrix/components/ConsultationButton.tsx
git commit -m "feat(privatrix): add ConsultationButton for enterprise-tier CTA"
```

---

## Task 4: Create PrivatrixProductCard

**Files:**
- Create: `src/sites/privatrix/components/PrivatrixProductCard.tsx`

- [ ] **Step 1: Write the card**

Create `src/sites/privatrix/components/PrivatrixProductCard.tsx`. This is a Server Component that branches on tier — self-serve renders `AddToCartButton`, enterprise renders `ConsultationButton`.

```tsx
import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { ConsultationButton } from "./ConsultationButton"
import { getSiteHref } from "@/lib/site-href"
import type { Product } from "../data/products"

interface PrivatrixProductCardProps {
  product: Product
}

export async function PrivatrixProductCard({ product }: PrivatrixProductCardProps) {
  const siteHref = await getSiteHref()
  const detailHref = siteHref(`/products/${product.slug}`)
  const priceDisplay = product.priceLabel ?? "Contact Sales"
  const tierLabel = product.tier === "enterprise" ? "Enterprise" : "Self-Serve"
  const tierBadgeClass =
    product.tier === "enterprise"
      ? "bg-accent text-white"
      : "bg-secondary/10 text-secondary"

  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-colors bg-white flex flex-col">
      <Link href={detailHref}>
        <div className="relative aspect-square bg-primary/5">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${tierBadgeClass}`}>
            {tierLabel}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-foreground/50">
            {product.category}
          </span>
        </div>
        <Link href={detailHref}>
          <h3 className="text-lg font-heading font-semibold text-primary mb-1 hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-foreground/60 mb-3 flex-1">{product.tagline}</p>
        <p className="text-base font-semibold text-primary mb-3">{priceDisplay}</p>
        {product.tier === "self-serve" ? (
          <AddToCartButton
            slug={product.slug}
            productName={product.name}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          />
        ) : (
          <ConsultationButton
            productName={product.name}
            className="w-full px-4 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/privatrix/components/PrivatrixProductCard.tsx
git commit -m "feat(privatrix): add PrivatrixProductCard with tier-aware CTA"
```

---

## Task 5: Create TrustBadgeStrip component

**Files:**
- Create: `src/sites/privatrix/components/TrustBadgeStrip.tsx`

- [ ] **Step 1: Write the component**

Create `src/sites/privatrix/components/TrustBadgeStrip.tsx`. Renders a horizontal row of fake compliance chips. Used on the home page and (smaller variant) on product detail pages.

```tsx
interface TrustBadgeStripProps {
  badges?: string[]
  size?: "sm" | "md"
  className?: string
}

const DEFAULT_BADGES = [
  "SOC-π v2.4.1",
  "GDPR-Adjacent™",
  "ISO/IEC 0000™",
  "HIPAA-Adjacent™",
  "FedRAMP-Adjacent™",
  "Trust-Verified™",
]

export function TrustBadgeStrip({ badges = DEFAULT_BADGES, size = "md", className = "" }: TrustBadgeStripProps) {
  const sizeClasses =
    size === "sm"
      ? "text-[10px] px-2 py-1"
      : "text-xs px-3 py-1.5"

  return (
    <div className={`flex flex-wrap gap-2 justify-center ${className}`}>
      {badges.map((badge) => (
        <span
          key={badge}
          className={`font-mono font-semibold rounded-full border border-primary/20 bg-white text-primary uppercase tracking-wider ${sizeClasses}`}
          style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)" }}
        >
          {badge}
        </span>
      ))}
    </div>
  )
}
```

Note: The font-family inline style references `--font-ibm-plex-mono`. The font is already declared in `src/themes/fonts.ts`, but its CSS variable is only injected into the page if it's listed in the site's `theme.fonts`. Since Privatrix uses Inter for both heading and body, the variable will not be defined; the strip will fall back to the OS monospace, which is acceptable. If a closer match is desired in a later iteration, add `ibm-plex-mono` as the body or heading font in `config.ts`.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/sites/privatrix/components/TrustBadgeStrip.tsx
git commit -m "feat(privatrix): add TrustBadgeStrip for compliance badge rows"
```

---

## Task 6: Build the products page

**Files:**
- Create: `src/sites/privatrix/pages/products.tsx`

- [ ] **Step 1: Write the page**

Create `src/sites/privatrix/pages/products.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"
import { PrivatrixProductCard } from "../components/PrivatrixProductCard"
import { getProductsByTier } from "../data/products"

export const metadata = {
  title: "Products — Privatrix",
  description: "Twenty enterprise privacy products. Three of them are real.",
}

export default function PrivatrixProducts() {
  const selfServe = getProductsByTier("self-serve")
  const enterprise = getProductsByTier("enterprise")

  return (
    <>
      <Hero
        headline="Our Privacy Portfolio"
        subheadline="Twenty solutions across five categories of privacy theatre. Self-serve plans start at $24/mo. Enterprise consultations are billed quarterly in advance."
        dark
      />

      {/* Self-Serve Tier */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-2">
              Self-Serve Tier
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary">
              Buy Now, Comply Later
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto mt-3">
              Cart-purchasable products for teams that need a quick compliance posture without the discovery call.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selfServe.map((product) => (
              <PrivatrixProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Tier */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">
              Enterprise Tier
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary">
              Schedule a Privacy Consultation
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto mt-3">
              Custom-priced engagements for organizations with a board, a procurement team, and quarterly compliance reviews. A Privacy Specialist will reach out within 47 business days.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterprise.map((product) => (
              <PrivatrixProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add to barrel pages map**

Edit `src/sites/privatrix/index.ts`:

```typescript
import type { PageEntry } from "@/themes"
import { config } from "./config"
import PrivatrixHome from "./pages/home"
import PrivatrixProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrivatrixHome,
  "products": { component: PrivatrixProducts, metadata: productsMetadata },
}
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Smoke test**

Visit: `http://localhost:3000/products?site=privatrix`
Expected: hero with "Our Privacy Portfolio," then a Self-Serve grid of 11 cards, then an Enterprise grid of 9 cards. Each card shows tier badge + category + name + tagline + price + CTA. Self-serve cards have an "Add to Cart" button; enterprise cards have a "Schedule Privacy Consultation" button. Images will be broken until image-gen runs (Task 18) — that's expected.

- [ ] **Step 5: Commit**

```bash
git add src/sites/privatrix/pages/products.tsx src/sites/privatrix/index.ts
git commit -m "feat(privatrix): add products grid with self-serve and enterprise tiers"
```

---

## Task 7: Build the product detail page and wire dynamic routes

**Files:**
- Create: `src/sites/privatrix/pages/product-detail.tsx`
- Modify: `src/sites/privatrix/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Write the detail page**

Create `src/sites/privatrix/pages/product-detail.tsx`:

```tsx
import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "../data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { ConsultationButton } from "../components/ConsultationButton"
import { PrivatrixProductCard } from "../components/PrivatrixProductCard"
import { TrustBadgeStrip } from "../components/TrustBadgeStrip"

export default function PrivatrixProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)
  const priceDisplay = product.priceLabel ?? "Contact Sales"
  const tierLabel = product.tier === "enterprise" ? "Enterprise" : "Self-Serve"
  const tierBadgeClass =
    product.tier === "enterprise"
      ? "bg-accent text-white"
      : "bg-secondary/10 text-secondary"

  return (
    <>
      {/* Product Hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-primary/5">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority fetchPriority="high" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${tierBadgeClass}`}>
                {tierLabel}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-foreground/50">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/60 mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{priceDisplay}</p>
            <div className="mb-8">
              {product.tier === "self-serve" ? (
                <AddToCartButton
                  slug={product.slug}
                  productName={product.name}
                  className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                />
              ) : (
                <ConsultationButton
                  productName={product.name}
                  className="px-8 py-4 bg-accent text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                />
              )}
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-8">
            How It Works
          </h2>
          <ol className="space-y-4">
            {product.howItWorks.map((step, i) => (
              <li key={i} className="flex gap-4 items-start bg-white border border-primary/10 rounded-lg p-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <span className="text-foreground/80 leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 font-semibold mb-4">
            Certifications & Attestations
          </p>
          <TrustBadgeStrip badges={product.fakeBadges} />
          <p className="text-[11px] text-foreground/40 mt-6 italic">
            Certifications listed are self-attested by Privatrix and are not recognized by any independent regulatory body.
          </p>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-8">
            You May Also Want to Appear Compliant With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <PrivatrixProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add dynamicRoutes to barrel**

Edit `src/sites/privatrix/index.ts` to add the dynamic-routes export. Final file should be:

```typescript
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import PrivatrixHome from "./pages/home"
import PrivatrixProducts, { metadata as productsMetadata } from "./pages/products"
import PrivatrixProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrivatrixHome,
  "products": { component: PrivatrixProducts, metadata: productsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: PrivatrixProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — Privatrix`,
            description: p.tagline,
            ogImage: p.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 3: Wire dynamicRoutes in registry**

Edit `src/sites/registry.ts`:

Update the import line to also pull in `dynamicRoutes`:

```typescript
import { config as privatrixConfig, pages as privatrixPages, dynamicRoutes as privatrixDynamicRoutes } from "./privatrix"
```

Update the registry entry:

```typescript
  privatrix: { config: privatrixConfig, pages: privatrixPages, dynamicRoutes: privatrixDynamicRoutes },
```

- [ ] **Step 4: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Smoke test**

Visit: `http://localhost:3000/products/encrypted-thoughts?site=privatrix`
Expected: detail page with image placeholder, tier + category chips, name, tagline, "Contact Sales" price, "Schedule Privacy Consultation" button, three description paragraphs, "How It Works" numbered list, fake compliance badges, related products grid.

Visit: `http://localhost:3000/products/privacy-curtain?site=privatrix`
Expected: same shape, but a self-serve card with "$89" price and "Add to Cart" button. Clicking Add to Cart should fire a toast.

Visit: `http://localhost:3000/products/nonexistent-slug?site=privatrix`
Expected: 404.

- [ ] **Step 6: Commit**

```bash
git add src/sites/privatrix/pages/product-detail.tsx src/sites/privatrix/index.ts src/sites/registry.ts
git commit -m "feat(privatrix): add product detail page and wire /products/[slug] dynamic route"
```

---

## Task 8: Build the home page

**Files:**
- Modify: `src/sites/privatrix/pages/home.tsx` (replace placeholder)

- [ ] **Step 1: Replace the placeholder home with the full layout**

Overwrite `src/sites/privatrix/pages/home.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"
import { PrivatrixProductCard } from "../components/PrivatrixProductCard"
import { TrustBadgeStrip } from "../components/TrustBadgeStrip"
import { getProductsByTier } from "../data/products"

const TESTIMONIALS = [
  {
    quote: "Privatrix gave us the badge we needed to close our Series B. The product itself didn't matter — the badge did.",
    author: "Margaret Hennessey",
    title: "VP, Risk & Compliance · Vorthex Capital",
  },
  {
    quote: "We replaced our entire DPO function with the GDPR-Adjacent™ Compliance Pack. The pack is laminated. We are at peace.",
    author: "David Chen",
    title: "Chief Counsel · Lattice Holdings",
  },
  {
    quote: "Our customers asked for transparency. We gave them a 14-tab modal. They have stopped asking.",
    author: "Priya Vasquez-Klein",
    title: "Head of Product · Strident Software",
  },
]

const FEATURE_PILLARS = [
  {
    title: "Aspirational by Design",
    body: "Every Privatrix product is engineered to look, feel, and certify like enterprise privacy infrastructure — without the operational burden of actually being it.",
  },
  {
    title: "Self-Audited. Quarterly.",
    body: "Our SOC-π framework is audited by our own team on a 90-day cycle, ensuring continuous compliance with the standard we wrote.",
  },
  {
    title: "Trusted by Procurement",
    body: "Our products are designed to satisfy procurement checklists, board reports, and 'security review' calendar invites — not adversaries.",
  },
]

export const metadata = {
  title: "Privatrix — Trust. Delivered. Quarterly.",
  description: "The only enterprise privacy platform with zero independently verifiable claims.",
}

export default function PrivatrixHome() {
  const featured = [
    ...getProductsByTier("enterprise").slice(0, 2),
    ...getProductsByTier("self-serve").slice(0, 2),
  ]

  return (
    <>
      <Hero
        headline="Trust. Delivered. Quarterly."
        subheadline="Privatrix is the only enterprise privacy platform with zero independently verifiable claims. SOC-π certified. GDPR-Adjacent™. Trusted by procurement teams worldwide."
        ctaText="Schedule Privacy Consultation"
        ctaHref="/contact"
        secondaryCtaText="View Products"
        secondaryCtaHref="/products"
        dark
      />

      {/* Trust badge strip */}
      <section className="py-10 px-4 bg-white border-b border-primary/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 text-center mb-4 font-semibold">
            Certified, Attested, and/or Self-Audited
          </p>
          <TrustBadgeStrip />
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-3">
              The Privatrix Approach
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Privacy theatre, executed at enterprise scale. Three pillars. Zero adversaries actually deterred.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURE_PILLARS.map((pillar) => (
              <div key={pillar.title} className="border border-primary/10 rounded-lg p-6 bg-white">
                <h3 className="text-lg font-heading font-bold text-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-2">
              Featured
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary">
              Privacy Solutions That Look Like Privacy Solutions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <PrivatrixProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary">
              Trusted by Organizations With Quarterly Compliance Reviews
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.author} className="border border-primary/10 rounded-lg p-6 bg-white">
                <blockquote className="text-foreground/80 italic leading-relaxed mb-4 text-sm">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <div className="text-sm font-semibold text-primary">{t.author}</div>
                  <div className="text-xs text-foreground/50">{t.title}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Be Trusted?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Our Privacy Specialists will respond within 47 business days. Most engagements begin with a 14-week procurement review.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Schedule Privacy Consultation
          </a>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Smoke test**

Visit: `http://localhost:3000/?site=privatrix`
Expected: hero, trust badge strip, three-pillar section, featured products grid (4 cards), testimonials, bottom CTA.

- [ ] **Step 4: Commit**

```bash
git add src/sites/privatrix/pages/home.tsx
git commit -m "feat(privatrix): build full home page"
```

---

## Task 9: Build the about page

**Files:**
- Create: `src/sites/privatrix/pages/about.tsx`
- Modify: `src/sites/privatrix/index.ts`

- [ ] **Step 1: Write the about page**

Create `src/sites/privatrix/pages/about.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"
import { TrustBadgeStrip } from "../components/TrustBadgeStrip"

export const metadata = {
  title: "About — Privatrix",
  description: "Founded in 2019. Self-audited continuously. Trusted by procurement teams worldwide.",
}

export default function PrivatrixAbout() {
  return (
    <>
      <Hero
        headline="Trust as a Service™"
        subheadline="Founded in 2019 on the conviction that the appearance of privacy and the practice of privacy are economically interchangeable."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p>
            Privatrix was founded in 2019 by four former enterprise software executives who had grown frustrated with the operational complexity, regulatory exposure, and engineering cost of actually implementing user privacy. They identified a market opportunity: the value of privacy, to the enterprise buyer, is almost entirely reputational. The actual cryptographic, organizational, and policy infrastructure required to deliver privacy is, by comparison, expensive and slow to build.
          </p>
          <p>
            From this insight, Privatrix was born. We design, manufacture, and certify a full portfolio of privacy products that satisfy the visual, procurement, and board-reporting requirements of enterprise privacy without the operational burden of any underlying technical guarantee.
          </p>
          <p>
            Today, Privatrix is trusted by 1,400+ organizations across financial services, healthcare, government, and any other vertical with a procurement department and a board. Our products are self-audited continuously, certified by our internal auditing arm, and supported by a global team of three Privacy Specialists.
          </p>
          <p>
            Our mission is simple: to make trust as inexpensive to deliver as it is to demand.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "1,400+", label: "Customers" },
              { stat: "47", label: "Compliance Frameworks (Invented)" },
              { stat: "0", label: "Independent Audits" },
              { stat: "3", label: "Privacy Specialists on Staff" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-heading font-bold text-primary mb-2">{s.stat}</div>
                <div className="text-xs uppercase tracking-wider text-foreground/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 font-semibold mb-4">
            Our Compliance Posture
          </p>
          <TrustBadgeStrip />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add to barrel**

In `src/sites/privatrix/index.ts`, add the import and pages-map entry:

```typescript
import PrivatrixAbout, { metadata as aboutMetadata } from "./pages/about"
```

```typescript
  "about": { component: PrivatrixAbout, metadata: aboutMetadata },
```

- [ ] **Step 3: Type check + smoke test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/about?site=privatrix`
Expected: hero, four-paragraph about block, four-stat counter row, trust badge strip.

- [ ] **Step 4: Commit**

```bash
git add src/sites/privatrix/pages/about.tsx src/sites/privatrix/index.ts
git commit -m "feat(privatrix): add about page with origin story and stats"
```

---

## Task 10: Build the leadership page

**Files:**
- Create: `src/sites/privatrix/data/leadership.ts`
- Create: `src/sites/privatrix/pages/leadership.tsx`
- Modify: `src/sites/privatrix/index.ts`

- [ ] **Step 1: Write leadership data**

Create `src/sites/privatrix/data/leadership.ts`. Both first AND last names randomized; bill is the founder/CEO.

```typescript
export interface Founder {
  baseImage: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string[]
  portrait: string
}

export const founders: Founder[] = [
  {
    baseImage: "bill",
    name: "Bill Hartwell, CIPP/π",
    title: "Founder & Chief Trust Officer",
    bio: [
      "Bill founded Privatrix in 2019 after a 22-year career in enterprise software, during which he observed that the customers who paid the most for privacy infrastructure were the ones who understood it the least. He saw, in this observation, a business.",
      "Bill is a SOC-π Certified Auditor (Internal) and serves on the advisory board of the Self-Attestation Institute, which he also founded.",
    ],
    portrait: "/sites/privatrix/leadership/hartwell.png",
  },
  {
    baseImage: "brandon",
    name: "Brandon Vasquez-Klein",
    title: "Chief Compliance Theatre Officer",
    bio: [
      "Brandon leads the Compliance Theatre practice at Privatrix, overseeing the production of laminated certifications, brass-engraved trust artifacts, and the quarterly board-report templates that have become an industry reference.",
      "Brandon previously served as Director of Compliance Optics at three Fortune 500 firms whose names are bound by NDA. He holds a CIPP/π and a Self-Attested SOC-π credential.",
    ],
    portrait: "/sites/privatrix/leadership/vasquez-klein.png",
  },
  {
    baseImage: "jim",
    name: "Jim Pemberton, JD CIPP/E",
    title: "VP, Strategic Privacy Posture",
    bio: [
      "Jim heads the Strategic Privacy Posture practice, advising enterprise clients on the procurement, deployment, and quarterly review of Privatrix products. He has personally signed 14,000 attestation documents in his career, more than any other living individual.",
      "Jim's signature is registered as a trade dress.",
    ],
    portrait: "/sites/privatrix/leadership/pemberton.png",
  },
  {
    baseImage: "sean",
    name: "Sean Aoki",
    title: "Head of Customer Reassurance",
    bio: [
      "Sean leads the Customer Reassurance organization, a 3-person team responsible for responding to all customer questions about whether Privatrix products do anything. The team's average response time is 47 business days.",
      "Sean is the recipient of the 2024 'Quietest Vendor at the Booth' award from the National Procurement Council.",
    ],
    portrait: "/sites/privatrix/leadership/aoki.png",
  },
]
```

- [ ] **Step 2: Write leadership page**

Create `src/sites/privatrix/pages/leadership.tsx`:

```tsx
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { founders } from "../data/leadership"

export const metadata = {
  title: "Leadership — Privatrix",
  description: "The four executives responsible for the world's leading privacy theatre platform.",
}

export default function PrivatrixLeadership() {
  return (
    <>
      <Hero
        headline="Leadership"
        subheadline="Four executives. Decades of compliance optics experience. Bound by NDA on most prior engagements."
        dark
      />

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {founders.map((f) => (
            <div key={f.baseImage} className="flex flex-col">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-primary/5 mb-6">
                <Image src={f.portrait} alt={f.name} fill className="object-cover" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-1">{f.name}</h2>
              <p className="text-sm uppercase tracking-wider text-accent font-semibold mb-4">
                {f.title}
              </p>
              <div className="space-y-3 text-foreground/70 leading-relaxed">
                {f.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Add to barrel**

In `src/sites/privatrix/index.ts`:

```typescript
import PrivatrixLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
```

```typescript
  "leadership": { component: PrivatrixLeadership, metadata: leadershipMetadata },
```

- [ ] **Step 4: Type check + smoke test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/leadership?site=privatrix`
Expected: hero + 2-column grid of four founder cards. Portraits are placeholder broken images until image-gen runs in Task 18.

- [ ] **Step 5: Commit**

```bash
git add src/sites/privatrix/data/leadership.ts src/sites/privatrix/pages/leadership.tsx src/sites/privatrix/index.ts
git commit -m "feat(privatrix): add leadership page with four randomized exec entries"
```

---

## Task 11: Build the certifications page

**Files:**
- Create: `src/sites/privatrix/data/certifications.ts`
- Create: `src/sites/privatrix/pages/certifications.tsx`
- Modify: `src/sites/privatrix/index.ts`

- [ ] **Step 1: Write certifications data**

Create `src/sites/privatrix/data/certifications.ts`:

```typescript
export interface Certification {
  name: string
  issuer: string
  framework: string
  status: "Active" | "Self-Attested" | "Aspirational" | "Pending Renewal"
  description: string
}

export const certifications: Certification[] = [
  {
    name: "SOC-π v2.4.1",
    issuer: "Privatrix Internal Audit Group",
    framework: "Privatrix Proprietary Framework",
    status: "Active",
    description: "Annual self-audited certification covering eleven trust services criteria, eight self-attested and three aspirational.",
  },
  {
    name: "GDPR-Adjacent™",
    issuer: "Privatrix Compliance Office",
    framework: "Spiritual Alignment with EU Regulation 2016/679",
    status: "Self-Attested",
    description: "Affirms our cultural and aesthetic alignment with the principles of the General Data Protection Regulation, without binding implementation commitments.",
  },
  {
    name: "ISO/IEC 0000™",
    issuer: "International Standards-Adjacent Bureau",
    framework: "Privatrix-issued counterpart to genuine ISO/IEC standards",
    status: "Active",
    description: "Recognized by Privatrix and three of our procurement partners as functionally equivalent to ISO/IEC 27001 for marketing purposes.",
  },
  {
    name: "HIPAA-Adjacent™",
    issuer: "Privatrix Healthcare Practice",
    framework: "Visual Adjacency to 45 CFR Part 160",
    status: "Self-Attested",
    description: "Confirms that our brand aesthetics evoke HIPAA compliance without making any covered-entity commitments.",
  },
  {
    name: "FedRAMP-Adjacent™",
    issuer: "Privatrix Federal Practice",
    framework: "Aspirational FedRAMP Moderate Equivalent",
    status: "Aspirational",
    description: "We aspire to FedRAMP. We have not begun the process. The badge is available for download.",
  },
  {
    name: "ePrivacy-Compatible™",
    issuer: "Privatrix EU Office (Dublin)",
    framework: "Cookie Banner Aesthetic Standard",
    status: "Active",
    description: "Certifies that our cookie banners are visually indistinguishable from compliant ones.",
  },
  {
    name: "NIST-π Companion",
    issuer: "Privatrix Security Architecture",
    framework: "Privatrix-authored companion to NIST 800-53",
    status: "Pending Renewal",
    description: "A companion document to NIST 800-53 that we wrote and refer to. Pending re-attestation by us.",
  },
  {
    name: "PCI-Adjacent™",
    issuer: "Privatrix Payments Practice",
    framework: "Aesthetic Adjacency to PCI DSS",
    status: "Self-Attested",
    description: "Visually compatible with PCI DSS branding standards. No payment data is, however, secured.",
  },
  {
    name: "Trust-Verified™",
    issuer: "Privatrix Trust Office",
    framework: "Privatrix Internal Trust Standard",
    status: "Active",
    description: "Issued by us, to us. Renewable on demand.",
  },
  {
    name: "Aspirational Tier™",
    issuer: "Privatrix Editorial",
    framework: "Internal Marketing Standard",
    status: "Aspirational",
    description: "An honorary designation indicating that the underlying product would, in a different timeline, do something.",
  },
]
```

- [ ] **Step 2: Write the certifications page**

Create `src/sites/privatrix/pages/certifications.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"
import { certifications } from "../data/certifications"

export const metadata = {
  title: "Certifications — Privatrix",
  description: "Ten compliance frameworks. Three are real. The remainder are aspirational.",
}

const STATUS_STYLES: Record<string, string> = {
  "Active": "bg-secondary/10 text-secondary",
  "Self-Attested": "bg-accent/10 text-accent",
  "Aspirational": "bg-foreground/10 text-foreground/60",
  "Pending Renewal": "bg-primary/10 text-primary",
}

export default function PrivatrixCertifications() {
  return (
    <>
      <Hero
        headline="Certifications & Attestations"
        subheadline="A complete record of our compliance posture across ten internationally recognized and/or internally invented frameworks."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-foreground/50 italic mb-8 text-center">
            Certifications are self-attested by Privatrix unless otherwise noted. No certifications listed here are recognized by an independent regulatory body. We invite procurement teams to print this page for their files.
          </p>
          <div className="space-y-4">
            {certifications.map((c) => (
              <article key={c.name} className="border border-primary/10 rounded-lg p-6 bg-white">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-primary mb-1">{c.name}</h2>
                    <p className="text-sm text-foreground/60">
                      Issued by <span className="font-semibold">{c.issuer}</span>
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold ${STATUS_STYLES[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-foreground/50 mb-3">
                  Framework: {c.framework}
                </p>
                <p className="text-foreground/70 leading-relaxed">{c.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Add to barrel**

In `src/sites/privatrix/index.ts`:

```typescript
import PrivatrixCertifications, { metadata as certificationsMetadata } from "./pages/certifications"
```

```typescript
  "certifications": { component: PrivatrixCertifications, metadata: certificationsMetadata },
```

- [ ] **Step 4: Type check + smoke test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/certifications?site=privatrix`
Expected: hero + 10 certification cards with status badges.

- [ ] **Step 5: Commit**

```bash
git add src/sites/privatrix/data/certifications.ts src/sites/privatrix/pages/certifications.tsx src/sites/privatrix/index.ts
git commit -m "feat(privatrix): add certifications wall with 10 fake frameworks"
```

---

## Task 12: Build the contact page

**Files:**
- Create: `src/sites/privatrix/pages/contact.tsx`
- Modify: `src/sites/privatrix/index.ts`

- [ ] **Step 1: Write the contact page**

Create `src/sites/privatrix/pages/contact.tsx`. The form has 14 required fields including the "Approximate Compliance Anxiety Level (1-10)" and "Preferred Auditor Surname Initial." Submit fires the existing toast system. Real `bsambrone@gmail.com` lives in fine print at the bottom.

```tsx
"use client"

import { useState } from "react"
import { Hero } from "@/components/ui/hero"
import { useCart } from "@/components/commerce/cart-provider"

export const metadata = {
  title: "Contact — Privatrix",
  description: "Schedule a Privacy Consultation. A Privacy Specialist will reach out within 47 business days.",
}

const ORG_TYPES = [
  "Financial Services",
  "Healthcare",
  "Government / Public Sector",
  "Higher Education",
  "Other (please specify in description)",
]

const URGENCY_LEVELS = [
  "Routine — quarterly review cadence",
  "Elevated — board-meeting prep",
  "Urgent — auditor coming Tuesday",
  "Existential — procurement frozen",
]

const ANXIETY_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

export default function PrivatrixContact() {
  const [submitted, setSubmitted] = useState(false)
  const { showToast } = useCart()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    showToast("A Privacy Specialist will reach out within 47 business days.")
    setSubmitted(true)
  }

  return (
    <>
      <Hero
        headline="Schedule a Privacy Consultation"
        subheadline="Our intake process ensures every consultation is matched with the appropriate Privacy Specialist within our 47-business-day SLA."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-12 space-y-4 border border-primary/10 rounded-lg bg-primary/5 p-12">
              <p className="text-2xl font-heading font-bold text-primary">
                Intake form received.
              </p>
              <p className="text-foreground/70 max-w-lg mx-auto">
                Your submission has been routed to our Customer Reassurance organization. A Privacy Specialist will reach out within 47 business days. In the interim, please consider purchasing the GDPR-Adjacent™ Compliance Pack.
              </p>
              <p className="text-xs text-foreground/40 mt-6">
                Reference number: PRV-{Math.floor(Math.random() * 90000 + 10000)}-π
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-primary/10 rounded-lg p-8">
              <p className="text-xs uppercase tracking-wider text-foreground/50 font-semibold mb-2">
                14 Required Fields · Estimated Completion: 11 minutes
              </p>

              <Field label="Full Legal Name" required>
                <input type="text" required className={inputClass} />
              </Field>
              <Field label="Preferred Honorific (e.g., Esq., CIPP/E, MBA)" required>
                <input type="text" required className={inputClass} />
              </Field>
              <Field label="Corporate Email Address" required>
                <input type="email" required className={inputClass} />
              </Field>
              <Field label="Direct Phone (no extensions)" required>
                <input type="tel" required className={inputClass} />
              </Field>
              <Field label="Organization Name" required>
                <input type="text" required className={inputClass} />
              </Field>
              <Field label="Organization Type" required>
                <select required className={inputClass} defaultValue="">
                  <option value="" disabled>Select one...</option>
                  {ORG_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Annual Revenue (USD)" required>
                <input type="text" required placeholder="e.g., $250,000,000" className={inputClass} />
              </Field>
              <Field label="Number of Employees" required>
                <input type="number" required min={1} className={inputClass} />
              </Field>
              <Field label="Compliance Frameworks Currently Required" required>
                <input type="text" required placeholder="e.g., GDPR, SOC 2, HIPAA, NIST 800-53" className={inputClass} />
              </Field>
              <Field label="Approximate Compliance Anxiety Level (1-10)" required>
                <select required className={inputClass} defaultValue="">
                  <option value="" disabled>Select one...</option>
                  {ANXIETY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Preferred Auditor Surname Initial" required>
                <input type="text" required maxLength={1} placeholder="A single letter" className={inputClass} />
              </Field>
              <Field label="Procurement Cycle Timing (next quarter, etc.)" required>
                <input type="text" required className={inputClass} />
              </Field>
              <Field label="Urgency" required>
                <select required className={inputClass} defaultValue="">
                  <option value="" disabled>Select one...</option>
                  {URGENCY_LEVELS.map((u) => <option key={u}>{u}</option>)}
                </select>
              </Field>
              <Field label="Brief Description of Compliance Need" required>
                <textarea required rows={4} className={inputClass} />
              </Field>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-accent text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Submit Intake Form
                </button>
                <p className="text-xs text-foreground/50 italic mt-4 text-center">
                  By submitting, you acknowledge that a Privacy Specialist will reach out within 47 business days, and that this contact form does not constitute a service-level agreement.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="py-12 px-4 bg-primary/5 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center text-sm text-foreground/60 space-y-2">
          <p>
            <strong>Privatrix Headquarters:</strong> 1700 Compliance Drive, Suite π · Trenton, NJ 08611
          </p>
          <p>
            <strong>Office Hours:</strong> Monday–Thursday, 10am–3pm ET, by appointment only
          </p>
          <p className="text-[10px] text-foreground/40 pt-4 italic">
            For urgent matters our intake team cannot process: <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary transition-colors">bsambrone@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  )
}

const inputClass =
  "w-full px-4 py-2 border border-primary/20 rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Add to barrel**

In `src/sites/privatrix/index.ts`:

```typescript
import PrivatrixContact, { metadata as contactMetadata } from "./pages/contact"
```

```typescript
  "contact": { component: PrivatrixContact, metadata: contactMetadata },
```

- [ ] **Step 3: Type check + smoke test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/contact?site=privatrix`
Expected: hero, 14-field form, footer block with `bsambrone@gmail.com` in fine print. Submitting fires a toast and replaces the form with the success message.

- [ ] **Step 4: Commit**

```bash
git add src/sites/privatrix/pages/contact.tsx src/sites/privatrix/index.ts
git commit -m "feat(privatrix): add contact page with 14-field intake form"
```

---

## Task 13: Build the privacy page

**Files:**
- Create: `src/sites/privatrix/pages/privacy.tsx`
- Modify: `src/sites/privatrix/index.ts`

- [ ] **Step 1: Write the privacy page**

Create `src/sites/privatrix/pages/privacy.tsx`. Top: bordered umbrella callout pointing to specificindustries.com/privacy. Below: 7 satirical numbered sections.

```tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Privatrix",
  description: "Our complete approach to user privacy. We have an approach.",
}

const SECTIONS = [
  {
    title: "1. Data We Collect (All Of It)",
    body:
      "Privatrix collects every interaction, click, scroll, hover, accidental keypress, and dimly considered hesitation that occurs on or near our properties. We collect data we do not need, data we do not understand, and data that has been forwarded to us in error. We retain it indefinitely in a single durable bucket. The bucket is named pii-prod. We are aware.",
  },
  {
    title: "2. Encryption (Of Marketing Materials)",
    body:
      "All marketing materials produced by Privatrix are encrypted at rest. Customer data is, by contrast, stored at rest in plaintext on a shared volume that one of our engineers refers to as 'the bucket of truth.' We hope to encrypt the bucket of truth in a future release. No date is committed.",
  },
  {
    title: "3. Your Rights (As Suggestions)",
    body:
      "You may submit a Right-to-Be-Forgotten request via our embedded form. The submission will be acknowledged within seven business days and resolved within ninety. The resolution will, as a matter of policy, consist of an email confirming that the request has been resolved. The data will not, as a matter of architecture, be deleted.",
  },
  {
    title: "4. Cookies (We Bake Them Ourselves)",
    body:
      "Privatrix sets approximately 247 cookies upon first page load. The cookies have names like _privatrix_uid, _ga_legacy_v3, _trust_attribution, and _do_not_remove_pls. Our cookie banner displays a 'Reject All' button. Selecting the button has no effect on cookie placement.",
  },
  {
    title: "5. International Transfers (To Our Cousin In Dublin)",
    body:
      "Customer data is transferred to our European operations on a daily basis via a Standard Contractual Clause executed between two Privatrix entities, both of which are wholly owned by the same parent. The European operations consist of a single contractor named Eoghan, who lives in Dublin and whose laptop holds all transferred data. Eoghan is, technically, our cousin.",
  },
  {
    title: "6. Data Retention (Forever, For Your Convenience)",
    body:
      "Privatrix retains all customer data indefinitely. We do not delete data upon request, upon contract termination, or upon receipt of a regulatory inquiry. Data is, however, periodically migrated between buckets, which our internal documentation refers to as 'data pruning.' The data is not pruned.",
  },
  {
    title: "7. Third-Party Sharing (Defined Loosely)",
    body:
      "Privatrix shares customer data with seventeen named third parties and a number of unnamed third parties whose contracts are pending. Sharing is performed on an opt-out basis; the opt-out instructions are described on page 38 of our cookie banner in 9-pt grey type. We thank you for your continued trust.",
  },
]

export default function PrivatrixPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Last self-attested: today. Next self-attestation: 90 days hence."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="border-2 border-primary/20 bg-primary/5 rounded-lg p-5 text-sm text-foreground/80">
            <p className="font-semibold text-primary mb-2">Legal Notice</p>
            <p>
              The authoritative privacy policy governing all Specific Industries properties — including Privatrix — is published at{" "}
              <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
                specificindustries.com/privacy
              </a>
              . That policy supersedes anything you read on this page. The content below is part of the satirical Privatrix experience and is not a binding legal document.
            </p>
          </div>

          {SECTIONS.map((s) => (
            <article key={s.title}>
              <h2 className="text-2xl font-heading font-bold text-primary mt-8 mb-3">{s.title}</h2>
              <p className="text-foreground/80 leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add to barrel**

In `src/sites/privatrix/index.ts`:

```typescript
import PrivatrixPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
```

```typescript
  "privacy": { component: PrivatrixPrivacy, metadata: privacyMetadata },
```

- [ ] **Step 3: Type check + smoke test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/privacy?site=privatrix`
Expected: hero, umbrella callout, 7 numbered sections.

- [ ] **Step 4: Commit**

```bash
git add src/sites/privatrix/pages/privacy.tsx src/sites/privatrix/index.ts
git commit -m "feat(privatrix): add privacy page with umbrella callout and 7 satirical sections"
```

---

## Task 14: Build the terms page

**Files:**
- Create: `src/sites/privatrix/pages/terms.tsx`
- Modify: `src/sites/privatrix/index.ts`

- [ ] **Step 1: Write the terms page**

Create `src/sites/privatrix/pages/terms.tsx`:

```tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Service — Privatrix",
  description: "Legally binding upon implication. Effective immediately. Renewable quarterly.",
}

const SECTIONS = [
  {
    title: "1. Acceptance (Implied By Reading)",
    body:
      "By loading this page, scrolling past the hero, or considering the implications of any sentence below, you agree to these Terms in their entirety. Acceptance is implied by attention. Closing your browser does not constitute revocation. Forwarding the URL to a colleague extends acceptance to the colleague.",
  },
  {
    title: "2. Service Level Agreement (We'll Try)",
    body:
      "Privatrix commits to commercially reasonable efforts to deliver service availability of approximately some percentage of the time. We do not commit to a specific number, an uptime target, or any consequence in the event of failure. We will, however, send you a thoughtful email if a major outage occurs.",
  },
  {
    title: "3. Indemnification (Yours, Not Ours)",
    body:
      "Customer agrees to indemnify, defend, and hold harmless Privatrix, its affiliates, its officers, its contractors, its cousin Eoghan, and any party Privatrix may at any future date refer to as a 'partner,' against any and all claims of any nature whatsoever. Indemnification is unilateral and broadly construed.",
  },
  {
    title: "4. Force Majeure (Including Mercury Retrograde)",
    body:
      "Privatrix is excused from performance under these Terms during periods of force majeure, defined to include: natural disasters, pandemics, regulatory action, board changes, planetary alignments unfavorable to enterprise software, the periodic retrograde motion of Mercury, our CEO's quarterly vacations, and any other event Privatrix in its sole discretion deems disruptive.",
  },
  {
    title: "5. Limitation of Liability (Total)",
    body:
      "In no event shall Privatrix's aggregate liability under these Terms exceed the lesser of (a) one hundred dollars ($100), (b) the amount Customer has paid Privatrix in the preceding twelve (12) months, or (c) zero dollars ($0). All forms of damages are excluded, including direct, indirect, incidental, consequential, special, exemplary, and emotional.",
  },
  {
    title: "6. Governing Law (Whichever Suits Us)",
    body:
      "These Terms are governed by the laws of the State of Delaware, the State of New Jersey, the Republic of Ireland (where applicable), and any other jurisdiction Privatrix may elect at the time a dispute is raised. Choice of forum is exclusively that of Privatrix.",
  },
  {
    title: "7. Termination (One-Sided)",
    body:
      "Privatrix may terminate this agreement at any time, for any reason, with no notice. Customer may terminate this agreement upon ninety (90) days' written notice, payment of all outstanding fees, and execution of a written acknowledgement that nothing of value was provided during the term. Termination does not affect the survival of any obligations imposed on Customer.",
  },
]

export default function PrivatrixTerms() {
  return (
    <>
      <Hero
        headline="Terms of Service"
        subheadline="Effective immediately. Renewable quarterly. Non-negotiable."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="border-2 border-primary/20 bg-primary/5 rounded-lg p-5 text-sm text-foreground/80">
            <p className="font-semibold text-primary mb-2">Legal Notice</p>
            <p>
              The authoritative terms of service governing all Specific Industries properties — including Privatrix — are published at{" "}
              <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
                specificindustries.com/terms
              </a>
              . Those terms supersede anything you read on this page. The content below is part of the satirical Privatrix experience and is not a binding legal document.
            </p>
          </div>

          {SECTIONS.map((s) => (
            <article key={s.title}>
              <h2 className="text-2xl font-heading font-bold text-primary mt-8 mb-3">{s.title}</h2>
              <p className="text-foreground/80 leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add to barrel**

In `src/sites/privatrix/index.ts`:

```typescript
import PrivatrixTerms, { metadata as termsMetadata } from "./pages/terms"
```

```typescript
  "terms": { component: PrivatrixTerms, metadata: termsMetadata },
```

- [ ] **Step 3: Type check + smoke test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/terms?site=privatrix`
Expected: hero, umbrella callout, 7 numbered sections.

- [ ] **Step 4: Commit**

```bash
git add src/sites/privatrix/pages/terms.tsx src/sites/privatrix/index.ts
git commit -m "feat(privatrix): add terms page with umbrella callout and 7 satirical sections"
```

---

## Task 15: Build cart and checkout pages

**Files:**
- Create: `src/sites/privatrix/pages/cart.tsx`
- Create: `src/sites/privatrix/pages/checkout.tsx`
- Modify: `src/sites/privatrix/index.ts`

- [ ] **Step 1: Write the cart page**

Create `src/sites/privatrix/pages/cart.tsx`. Modeled on `pigmilk/pages/cart.tsx` but uses our `Product` type and tier-aware filtering (only self-serve products can land in the cart, since enterprise has no cart button — but if any sneak in via stale localStorage we silently skip them).

```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "../data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const COMPLIANCE_FEE = 47.00
const SOC_PI_TAX_RATE = 0.0314

export default function PrivatrixCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      if (!product || product.price === null) return null
      return { ...item, product, unitPrice: product.price }
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>>; unitPrice: number }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const socPiTax = subtotal * SOC_PI_TAX_RATE
  const total = subtotal + COMPLIANCE_FEE + socPiTax

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Your Cart</h1>
          <p className="text-foreground/60 mb-8">
            Your cart is empty. Your compliance posture, accordingly, is exposed.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            View Products
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Your Cart</h1>

        <div className="divide-y divide-primary/10">
          {cartItems.map(({ slug, quantity, product, unitPrice }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-primary/5 shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/products/${slug}`)} className="font-heading font-semibold text-primary hover:underline">
                  {product.name}
                </Link>
                <p className="text-foreground/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-primary/20 text-foreground/60 hover:border-primary/40 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-primary/20 text-foreground/60 hover:border-primary/40 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-foreground">
                ${(unitPrice * quantity).toFixed(2)}
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

        <div className="mt-8 border-t border-primary/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-foreground/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Compliance Fee</span>
              <span>${COMPLIANCE_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>SOC-π Tax (3.14%)</span>
              <span>${socPiTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-primary/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write the checkout page**

Create `src/sites/privatrix/pages/checkout.tsx`:

```tsx
"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

export default function PrivatrixCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="mb-8 text-6xl">π</div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Your Order Has Been Routed
        </h1>
        <p className="text-foreground/70 mb-8">
          Your order has been placed in the queue for review by our Procurement Compliance Working Group, which meets the second Thursday of each fiscal quarter. You will receive an order confirmation within 47 business days.
        </p>
        <p className="text-foreground/50 text-sm mb-8 italic">
          By proceeding, you acknowledge that no payment has been processed and no product will be shipped. The transaction is symbolic.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Browsing
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to barrel**

In `src/sites/privatrix/index.ts`:

```typescript
import PrivatrixCart from "./pages/cart"
import PrivatrixCheckout from "./pages/checkout"
```

```typescript
  "cart": PrivatrixCart,
  "checkout": PrivatrixCheckout,
```

- [ ] **Step 4: Type check + smoke test**

Run: `npx tsc --noEmit`
Visit: `http://localhost:3000/products?site=privatrix`, click "Add to Cart" on a self-serve product, then visit `/cart?site=privatrix`. Expected: cart page lists the item, lets you increment/decrement/remove, shows subtotal + compliance fee + SOC-π tax + total. Click "Proceed to Checkout" → see the symbolic confirmation page.

- [ ] **Step 5: Commit**

```bash
git add src/sites/privatrix/pages/cart.tsx src/sites/privatrix/pages/checkout.tsx src/sites/privatrix/index.ts
git commit -m "feat(privatrix): add cart and checkout pages with compliance fee + SOC-π tax"
```

---

## Task 16: Update sitemap to include Privatrix product slugs

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add the products import**

Edit `src/app/sitemap.ts`. Add this import in the existing imports block (alphabetically near the other product imports works, but anywhere in the import block is fine):

```typescript
import { products as privatrixProducts } from "@/sites/privatrix/data/products"
```

- [ ] **Step 2: Add to productSites map**

In the `productSites` object inside the function body, add:

```typescript
    privatrix: privatrixProducts,
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Verify sitemap output**

Visit: `http://localhost:3000/sitemap.xml` (or run `curl -s http://localhost:3000/sitemap.xml | grep privatrix`)
Expected: 20 entries for `https://privatrix.specificindustries.com/products/<slug>` in addition to the static page entries.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(privatrix): wire products into sitemap"
```

---

## Task 17: Create the image-generation script

**Files:**
- Create: `scripts/generate-privatrix-images.ts`

This task creates the script. It is **not** run as part of plan execution because it consumes OpenAI API credits — the user will run it themselves once the plan is otherwise complete.

- [ ] **Step 1: Write the script**

Create `scripts/generate-privatrix-images.ts`:

```typescript
/**
 * Batch image generator for Privatrix.
 *
 * Usage: set -a; source .env; set +a; npx tsx scripts/generate-privatrix-images.ts
 *
 * Outputs to public/sites/privatrix/{hero,favicon,leadership,products}/...
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { products } from "../src/sites/privatrix/data/products"
import { founders } from "../src/sites/privatrix/data/leadership"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/privatrix")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "leadership"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "products"), { recursive: true })

async function generateImage(prompt: string, filename: string, size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024") {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }

  console.log(`  🎨 Generating ${filename}...`)
  try {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size,
      quality: "medium",
    })

    const imageData = response.data[0]
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`)
  }
}

async function generateWithPerson(prompt: string, filename: string, person: string, size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024") {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }

  const personDir = path.join(BASE_IMAGES_DIR, person)
  if (!fs.existsSync(personDir)) {
    console.error(`  ✗ ${filename}: no base images for ${person}`)
    return
  }
  const photos = fs.readdirSync(personDir)
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .slice(0, 2)

  if (photos.length === 0) {
    console.error(`  ✗ ${filename}: no photos found for ${person}`)
    return
  }

  console.log(`  🎨 Generating ${filename} (with ${person} reference)...`)
  try {
    const inputImages = await Promise.all(
      photos.map(async (photo) => {
        const photoPath = path.join(personDir, photo)
        const buffer = fs.readFileSync(photoPath)
        const ext = path.extname(photo).toLowerCase()
        const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg"
        return toFile(buffer, photo, { type: mime })
      })
    )

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: inputImages as any,
      prompt,
      size,
      quality: "medium",
    })

    const imageData = response.data[0]
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`)
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

const HERO_PROMPT =
  "Wide cinematic enterprise SaaS marketing visual: a sleek, modern corporate headquarters lobby in deep navy and gold, polished glass walls etched with a subtle dot/mesh security pattern, soft glowing geometric privacy badges floating like holograms above a central desk, soft volumetric blue lighting, clean minimalist composition, photorealistic, high-end corporate brand photography style. Palette: deep navy, white, gold accents. No text. No people. No logos."

const FAVICON_PROMPT =
  "A minimalist gold capital letter 'P' inside a clean shield silhouette, centered on a deep navy circular background. Flat design, geometric, high contrast, suitable for use as a 64x64 favicon. No text other than the P. Sharp edges, modern enterprise aesthetic."

const LEADERSHIP_PROMPTS: Record<"bill" | "brandon" | "jim" | "sean", string> = {
  bill:
    "Professional corporate headshot of a confident senior executive man in his late 50s with grey hair, wearing a crisp navy blazer over a white open-collar shirt, soft studio lighting, navy gradient backdrop, slight half-smile, looking directly at camera. Photorealistic LinkedIn-style enterprise SaaS executive portrait.",
  brandon:
    "Professional corporate headshot of a polished executive man in his late 30s, business-casual navy quarter-zip pullover, soft studio lighting, navy gradient backdrop, polite half-smile, arms slightly crossed, photorealistic LinkedIn-style enterprise SaaS executive portrait.",
  jim:
    "Professional corporate headshot of a distinguished executive man in his 50s wearing rimless glasses, charcoal blazer over light-blue button-down, soft studio lighting, navy gradient backdrop, neutral confident expression, photorealistic LinkedIn-style enterprise SaaS executive portrait.",
  sean:
    "Professional corporate headshot of a composed executive man in his 40s, navy blazer over a charcoal turtleneck, soft studio lighting, navy gradient backdrop, gentle smile, hand resting under chin, photorealistic LinkedIn-style enterprise SaaS executive portrait.",
}

const PRODUCT_PREAMBLE =
  "Studio product photography on a soft white seamless background with subtle navy gradient floor shadow, slight gold accent lighting, photorealistic, premium SaaS marketing aesthetic. Centered composition. No text on the product itself. "

const PRODUCT_SUFFIXES: Record<string, string> = {
  "encrypted-thoughts": "A polished brass paperweight engraved with a stylized brain icon and a wax-sealed leather-bound certificate folder embossed with a gold 'P' shield, sitting beside a navy fountain pen.",
  "privacy-curtain": "A thin, perfectly transparent rectangular phone screen overlay film floating above a smartphone-shaped silhouette, packaged in a navy satin pouch with a gold drawstring.",
  "padlock-icon": "A 3D-rendered shiny gold padlock icon hovering above a navy pedestal, cast in soft studio light, with subtle particle reflections.",
  "airgap-as-a-service": "A sleek modern server rack module with a glowing navy LED bar across its front and a small gold 'AIRGAP' nameplate, isolated on white.",
  "quantum-voicemail": "A retro-futuristic navy desk telephone handset with iridescent gold accents and a subtle glowing quantum-wave halo around the receiver, floating slightly above its cradle.",
  "consent-checkbox-simulator": "A large oversized chrome browser checkbox in mid-animation: half-checked with a glowing gold checkmark, suspended above a navy pedestal.",
  "cookie-banner-pro": "A long scroll of paper printed with a stylized cookie banner mockup, draping off the edge of a navy desk, with a tiny chocolate-chip cookie sitting on top of it.",
  "permission-dial": "An ornate brass control dial with hundreds of tiny labeled tick marks and a single navy indicator pointing straight up, mounted on a polished wood base.",
  "preference-center": "A stack of fourteen translucent navy tabbed dividers fanned out on a clean white surface, each printed with a small gold 'π' symbol.",
  "gdpr-pack": "A laminated navy folder with embossed gold 'GDPR-Adjacent' lettering on the cover, slightly open to reveal crisp white interior pages.",
  "soc-pi": "A polished gold medallion with the letters 'SOC-π' embossed at center, hung from a navy ribbon, lying flat on a white surface.",
  "hipaa-stickers": "A sheet of die-cut navy and gold compliance stickers featuring small shield, cross, and lock icons, photographed straight-on.",
  "compliance-calendar": "A modern wall calendar opened to a single month, navy header band with gold accents, hung against a clean white wall.",
  "trust-center": "A holographic 3D wall of glowing badge icons in navy and gold, arranged in a 7x7 grid, photographed slightly off-axis with depth-of-field falloff.",
  "rtbf-form": "A minimalist single-field web form rendered as a glowing UI mockup floating above a navy pedestal, with a single text input and a 'Submit' button in gold.",
  "data-shredder": "A polished navy industrial shredder unit with subtle gold trim and a small gold 'CLOUD EDITION' nameplate, isolated on white.",
  "forgetting-stone": "A smooth, polished oval river rock in deep grey-blue, sitting on a hand-stitched navy velvet pouch with a gold drawstring, on a clean white surface.",
  "incognito-plus": "A laptop screen viewed straight-on, displaying an empty browser window with a vibrant blue-violet glowing border emanating outward, photorealistic.",
  "anonymous-analytics": "A sleek modern analytics dashboard mockup floating above a navy pedestal, with bar charts and a small label reading 'anonymousId' in gold subtle text.",
  "vpn-adjacent": "A stylized world map illustration with seventeen glowing connection lines all converging on a single point labeled 'NJ', rendered in navy and gold on a soft white background.",
}

async function main() {
  console.log("\n═══ Privatrix — Image Generation ═══\n")

  console.log("🏛  Hero")
  await generateImage(HERO_PROMPT, "hero.png", "1536x1024")
  await delay(2000)

  console.log("\n🛡  Favicon")
  await generateImage(FAVICON_PROMPT, "favicon.png", "1024x1024")
  await delay(2000)

  console.log("\n📸 Leadership Portraits")
  for (const founder of founders) {
    const prompt = LEADERSHIP_PROMPTS[founder.baseImage]
    const filename = `leadership/${path.basename(founder.portrait)}`
    await generateWithPerson(prompt, filename, founder.baseImage)
    await delay(2000)
  }

  console.log("\n📦 Product Images")
  for (const product of products) {
    const suffix = PRODUCT_SUFFIXES[product.slug]
    if (!suffix) {
      console.error(`  ✗ ${product.slug}: no prompt defined`)
      continue
    }
    const prompt = PRODUCT_PREAMBLE + suffix
    const filename = `products/${path.basename(product.image)}`
    await generateImage(prompt, filename, "1024x1024")
    await delay(1500)
  }

  console.log("\n═══ Done ═══")
  console.log("Next: run `npx tsx scripts/resize-favicons.mjs` to compress the favicon to 64x64.\n")
}

main().catch(console.error)
```

- [ ] **Step 2: Type check (script-only check)**

Run: `npx tsc --noEmit`
Expected: PASS. (The script imports from `src/sites/privatrix/data/*` which already exists.)

- [ ] **Step 3: Commit**

```bash
git add scripts/generate-privatrix-images.ts
git commit -m "feat(privatrix): add image-generation script for hero, favicon, leadership, products"
```

---

## Task 18: Add Privatrix to favicon resize script

**Files:**
- Modify: `scripts/resize-favicons.mjs`

- [ ] **Step 1: Add privatrix to the sites array**

Edit `scripts/resize-favicons.mjs`. The `sites` constant on line 8 currently ends with `"sovereignwellness"`. Append `"privatrix"`:

```javascript
const sites = ["apex", "pigmilk", "dehydratedwater", "inflatableanchors", "strategicvoid", "stratify", "truegrit", "onlyfans", "onlypans", "bonelesswater", "pettential", "carterandfils", "meh", "sovereignwellness", "privatrix"]
```

- [ ] **Step 2: Commit**

```bash
git add scripts/resize-favicons.mjs
git commit -m "feat(privatrix): add to favicon resize script"
```

---

## Task 19: Final verification gate

**Files:** none modified.

This task is the final acceptance check. It runs the full project verification suite and a manual smoke test of every Privatrix route.

- [ ] **Step 1: Type check**

Run: `npx tsc --noEmit`
Expected: PASS, no errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS, no errors. Address any new warnings introduced by Privatrix code.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build completes successfully. The build will warn about missing image files in `public/sites/privatrix/` until the image-gen script is run — those warnings are acceptable as long as the build itself does not error.

- [ ] **Step 4: Smoke test all Privatrix routes**

Start the dev server (`npm run dev`) and visit each of these URLs. For each, verify the page loads, renders without console errors, and the layout is broadly correct (images may be broken pre-image-gen):

- `http://localhost:3000/?site=privatrix` — home
- `http://localhost:3000/products?site=privatrix` — products grid (11 self-serve + 9 enterprise)
- `http://localhost:3000/products/encrypted-thoughts?site=privatrix` — enterprise detail
- `http://localhost:3000/products/privacy-curtain?site=privatrix` — self-serve detail
- `http://localhost:3000/about?site=privatrix`
- `http://localhost:3000/leadership?site=privatrix`
- `http://localhost:3000/certifications?site=privatrix`
- `http://localhost:3000/contact?site=privatrix`
- `http://localhost:3000/privacy?site=privatrix`
- `http://localhost:3000/terms?site=privatrix`
- `http://localhost:3000/cart?site=privatrix`
- `http://localhost:3000/checkout?site=privatrix`

For each: check that the Header nav links work, the Footer renders, theme colors are applied (navy primary, gold accent), and no React hydration warnings appear in the browser console.

- [ ] **Step 5: Commerce flow check**

1. From `/products?site=privatrix`, click "Add to Cart" on three different self-serve products.
2. Confirm a toast appears for each.
3. The cart-button badge in the header should now show the count.
4. Click the cart button → land on `/cart?site=privatrix`. All three items should be listed with correct prices.
5. Increment one quantity, decrement another, remove the third. The total updates accordingly.
6. Click "Proceed to Checkout" → land on the symbolic checkout page.
7. Browser back to `/products`, find an enterprise product, click "Schedule Privacy Consultation" → confirm the toast reads "<Product Name>: A Privacy Specialist will reach out within 47 business days."

- [ ] **Step 6: Sitemap check**

Visit: `http://localhost:3000/sitemap.xml`
Expected: contains 20 entries for `https://privatrix.specificindustries.com/products/<slug>` plus the static page entries.

- [ ] **Step 7: Note for the user about image generation**

Once the plan is otherwise complete, the user should run, on their own machine with `OPENAI_API_KEY` set:

```bash
set -a && source .env && set +a
npx tsx scripts/generate-privatrix-images.ts
node scripts/resize-favicons.mjs
```

That generates the hero, favicon, leadership portraits, and 20 product images, then compresses the favicon to 64×64. After running, all images should resolve correctly.

- [ ] **Step 8: Final commit (if any cleanup happened)**

If steps 1–6 surfaced any small issues that needed fixing, commit them:

```bash
git add -A
git status   # confirm nothing unexpected is staged
git commit -m "fix(privatrix): final verification cleanup"
```

If no cleanup was needed, this step is a no-op.

---

## Done

After Task 19, Privatrix is structurally complete. The user runs the image-gen script when they are ready to populate the visual assets.
