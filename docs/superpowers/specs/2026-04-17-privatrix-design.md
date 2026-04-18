# Privatrix — Data Privacy Theatre Site Design

**Date:** 2026-04-17
**Subdomain:** `privatrix`
**Domain:** `privatrix.specificindustries.com`

## Overview

Privatrix is an over-the-top satirical enterprise SaaS vendor whose entire product line is privacy theatre — products that look like privacy but do nothing. The site parodies the visual language and sales motion of B2B compliance vendors: glossy navy/gold styling, trust-badge walls, fake compliance certifications, "Schedule a Privacy Consultation" CTAs, and condescending reassurance copy.

The catalog is a hybrid commerce model: 11 self-serve SKUs (cart-purchasable) and 9 enterprise SKUs ("Schedule Privacy Consultation" toast). Both tiers ship in the same `/products` grid, visually differentiated.

## Architecture

Standard `specificindustries` site pattern:

- `src/sites/privatrix/` containing `config.ts`, `index.ts` barrel, `data/products.ts`, and `pages/*` components
- Add `privatrix` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts` (edge-runtime allowlist)
- Register in `src/sites/registry.ts`
- `features.commerce: true` so `CartProvider` wraps the layout
- `dynamicRoutes.products` for `/products/[slug]` detail pages
- Sitemap entry in `src/app/sitemap.ts` for the 20 product slugs (added to the existing `productSites` block)
- `ogImage: "/sites/privatrix/hero.png"` in config metadata
- `public/sites/privatrix/favicon.png` at 64×64
- Add `privatrix` to the hardcoded `sites` array in `scripts/resize-favicons.mjs`

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, trust-badge wall, featured products, fake testimonials, CTA |
| `/products` | Grid of all 20 products, two visual tiers (Self-Serve vs Enterprise) |
| `/products/[slug]` | Product detail (hero, "How It Works" lies, fake compliance badges, related products) |
| `/about` | Origin story, mission ("Trust as a Service™") |
| `/leadership` | Four exec portraits (bill, brandon, jim, sean — randomized first AND last names) |
| `/certifications` | Wall of fake compliance badges (SOC-π, ISO/IEC 0000™, GDPR-Adjacent™, HIPAA-Compatible™) |
| `/contact` | Satirical "Schedule Privacy Consultation" form with `bsambrone@gmail.com` in fine print |
| `/privacy` | Umbrella callout + satirical privacy theatre body |
| `/terms` | Umbrella callout + satirical terms body |
| `/cart` | Standard commerce cart |
| `/checkout` | Standard commerce checkout |

## Hybrid Commerce Model

Each product has `tier: "self-serve" | "enterprise"`.

- **Self-Serve cards/detail pages** show price + `AddToCartButton`. Standard commerce flow.
- **Enterprise cards/detail pages** show "Contact Sales" + a `ConsultationButton` component that triggers a toast: *"A Privacy Specialist will reach out within 47 business days."*

`ConsultationButton` is a new client component in `src/components/commerce/` (or `src/sites/privatrix/components/` if it stays site-specific). It reuses the existing toast mechanism that the cart already plumbs via `CartProvider`.

## The 20 Products

Categorized for catalog navigability and to keep the satire varied.

### Encryption Theatre
1. **Encrypted Thoughts™** [ENT] — neural privacy layer that "encrypts your intent." Does nothing. Comes with a leather-bound certificate.
2. **Privacy Curtain™ for Your Phone** [SS] — physical screen overlay marketed as opaque. Ships transparent. ($89)
3. **Military-Grade Padlock Icon™** [SS] — an SVG of a padlock you can paste on your website. ($1,499/yr)
4. **AirGap-as-a-Service™** [ENT] — cloud-hosted air-gap. Logs everything to S3.
5. **Quantum-Resistant Voicemail™** [SS] — your voicemail, but with the word "quantum." ($24/mo)

### Consent Theatre
6. **Data Consent Checkbox Simulator™** [SS] — embeddable checkbox widget; auto-checks itself, then un-checks for half a second so the user "sees the choice." ($299/site)
7. **Cookie Banner Generator Pro+™** [SS] — generates 47-paragraph cookie modals with a "Reject All" button that submits "Accept All." ($199/mo)
8. **Granular Permission Dial™** [ENT] — UI dial with 1,400 toggles. All wired to the same boolean.
9. **Privacy Preference Center™** [ENT] — 14-tab modal that takes 9 minutes to navigate. Saves nothing.

### Compliance Theatre
10. **GDPR-Adjacent™ Compliance Pack** [ENT] — laminated PDF saying you're "spiritually aligned with GDPR."
11. **SOC-π Certification** [ENT] — our own framework. Audited by us.
12. **HIPAA-Compatible™ Sticker Sheet** [SS] — 24 stickers. Adhesive is non-medical-grade. ($39)
13. **Compliance Calendar 2026™** [SS] — wall calendar with 365 different made-up frameworks. ($49)
14. **Trust Center Generator™** [ENT] — auto-builds a `/trust` page with 47 logos of standards we invented this morning.

### Data Deletion Theatre
15. **Right-to-Be-Forgotten Form™** [SS] — submits to `/dev/null`. Auto-replies with a 90-day "we're processing your request." ($79 one-time)
16. **Data Shredder™ Cloud Edition** [ENT] — moves your data to a different bucket called `/shredded`.
17. **The Forgetting Stone™** [SS] — polished river rock you whisper your data into. Ships in velvet bag. ($129)

### Incognito / Privacy Mode Theatre
18. **Incognito Mode+™** [SS] — browser extension that does exactly what regular incognito does, but with a glowing border. ($14.99/mo)
19. **Anonymous Analytics™** [ENT] — tracks every user, then renames the column "userId" to "anonymousId."
20. **VPN-Adjacent Connection™** [SS] — routes traffic through a single server in New Jersey we own. Marketed as "globally distributed." ($39/mo)

**Tier split:** 11 self-serve (SS) + 9 enterprise (ENT).

Each product in `data/products.ts` has: `slug`, `name`, `tier`, `category`, `tagline`, `priceLabel` (or `null` for ENT), `priceCents` (or `null` for ENT), `description` (long-form satirical copy for the detail page), `howItWorks` (3-bullet list of nonsense), `fakeBadges` (array of compliance-sticker labels), `image`.

## Visual Theme

**Color palette:**
```
--color-primary: #1E3A8A   /* deep corporate navy */
--color-secondary: #0EA5E9 /* trust-blue accent */
--color-accent: #F59E0B    /* gold premium/enterprise highlights */
--color-background: #FFFFFF
--color-surface: #F8FAFC   /* slate-50 section bands */
--color-text: #0F172A      /* slate-900 */
--color-muted: #64748B     /* slate-500 fine-print */
```

Gold accent is restricted to navy or pure-white surfaces only. Never on the slate-50 surface bands (yellow-on-light contrast rule).

**Fonts** (declared in `src/themes/fonts.ts`):
- Headings: **Inter**
- Body: **Inter**
- Mono accent: **IBM Plex Mono** (for fake compliance code chips like `SOC-π v2.4.1`)

If Inter or IBM Plex Mono are not already in `src/themes/fonts.ts`, add them per the four-step font-add process (import, `.variable` in `fontVariables`, family string in `fontFamilyMap`, theme key).

**Hero:**
- Background: subtle navy gradient with a faint dot/mesh "secured" pattern
- Headline: *"Trust. Delivered. Quarterly."*
- Subhead: *"Privatrix is the only enterprise privacy platform with zero independently verifiable claims."*
- CTAs: gold "Schedule Privacy Consultation" + ghost-white "View Pricing"
- Floating trust-badge chips drifting in (SOC-π, GDPR-Adjacent™, ISO/IEC 0000™)

**Leadership portraits:** Corporate headshot style — navy backdrop, soft studio lighting, business-casual blazers, polite half-smiles. Generated from the four base reference photos (bill, brandon, jim, sean) via a `scripts/` pass following existing site patterns.

**OG image:** `/sites/privatrix/hero.png` (the navy hero composition).

**Favicon:** Gold "P" inside a shield silhouette on navy, 64×64.

## Required Satire Patterns

Per the standing portfolio conventions:

### Leadership team (`/leadership`)
- Bill (founder/CEO) + Brandon, Jim, Sean
- Both first AND last names randomized (e.g., "Bill Hartwell", "Brandon Vasquez-Klein", "Jim Pemberton, JD CIPP/E", "Sean Aoki")
- Titles in SaaS-exec voice: CEO & Chief Trust Officer / Chief Compliance Theatre Officer / VP, Strategic Privacy Posture / Head of Customer Reassurance
- One-paragraph bios, each ending with a fake credential like "CIPP/π" or "SOC-π Certified Auditor (Internal)"
- Image-gen scripts produce site-specific portraits from the four base reference photos

### Privacy page (`/privacy`)
Top: bordered umbrella callout — *"The authoritative privacy policy governing all data handling is published by Specific Industries at specificindustries.com/privacy. That policy supersedes anything you read on this page."*

Below: full satirical numbered policy in Privatrix voice. Sections:
- §1 Data We Collect (All Of It)
- §2 Encryption (Of Marketing Materials)
- §3 Your Rights (As Suggestions)
- §4 Cookies (We Bake Them Ourselves)
- §5 International Transfers (To Our Cousin In Dublin)
- §6 Data Retention (Forever, For Your Convenience)
- §7 Third-Party Sharing (Defined Loosely)

### Terms page (`/terms`)
Same shape — umbrella callout first, then satirical numbered terms:
- §1 Acceptance (Implied By Reading)
- §2 Service Level Agreement (We'll Try)
- §3 Indemnification (Yours, Not Ours)
- §4 Force Majeure (Including Mercury Retrograde)
- §5 Limitation of Liability (Total)
- §6 Governing Law (Whichever Suits Us)
- §7 Termination (One-Sided)

### Contact page (`/contact`)
- Bureaucratic "Schedule Privacy Consultation" form with 14 required fields including "Approximate Compliance Anxiety Level (1-10)" and "Preferred Auditor Surname Initial"
- Submit just toasts "A Privacy Specialist will reach out within 47 business days"
- Real `bsambrone@gmail.com` tucked into a footer line: *"For urgent matters our intake team cannot process: bsambrone@gmail.com"*

### Sitemap update
- Import `products` from `src/sites/privatrix/data/products.ts` in `src/app/sitemap.ts`
- Add to the `productSites` block so all 20 product slugs are emitted at `/products/:slug`

## Components

Mostly composes existing shared components from `src/components/ui/` and `src/components/layout/`:

- `Hero` (existing) — navy gradient variant
- `ProductCard` (existing) — extended/wrapped to handle the tier branch (cart vs consultation)
- `FeatureSection` / `FaqAccordion` (existing) — for home page trust-badge wall and FAQ
- `TeamMember` (existing) — for `/leadership`
- `ConsultationButton` (NEW) — small client component for ENT-tier CTA, fires the existing toast

If `ProductCard` doesn't already support the tier branch cleanly, wrap it in a site-local `PrivatrixProductCard` that picks the right CTA. Don't generalize across sites unless a second site needs it.

## Out of Scope

- No real backend, no real form submissions, no actual checkout processing — standard portfolio pattern
- No animations beyond drifting trust-badge chips on the hero
- No internationalization
- No A/B testing of which products convert better in the joke economy

## Open Questions

None — design is fully specified.
