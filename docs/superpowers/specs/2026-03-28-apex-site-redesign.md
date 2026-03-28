# Apex Site Redesign — Design Spec

**Date:** 2026-03-28
**Status:** Draft

## Overview

Redesign the apex site (specificindustries.com) from a minimal hub into a proper corporate landing page with legal infrastructure, satire disclaimers, SEO protection, and an About page. The apex site serves as the parent brand for all subdomain joke sites and establishes the authoritative legal policies for the entire platform.

## Brand & Tone

**Deadpan corporate.** The apex site plays it completely straight — reads like a real holding company that earnestly serves underserved industries. The humor emerges from what those industries turn out to be, not from the parent brand winking or breaking character. The tone is welcoming and curious: "We identified a gap in the market, and we built a brand to fill it."

The legal pages (Privacy Policy, Terms of Use) are fully serious and non-satirical. The Disclaimer page bridges the gap — labeled neutrally in the nav but clearly identifies the satirical nature of the content on click-through.

## Pages

### 1. Homepage (`/`)

**Hero Section:**
- Headline: "Serving the World's Most Specific Industries"
- Subheadline: Deadpan corporate copy about identifying underserved markets and delivering tailored solutions (e.g., "We identify overlooked market segments and build dedicated brands to serve them.")
- No CTA button — the page naturally scrolls to the brands section

**"Our Brands" Section:**
- Section header: "Our Brands"
- Equal-sized cards in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop). When the number of cards doesn't fill the last row evenly, center the remaining cards.
- Each card is a clickable link (entire card, not a discrete button) auto-populated from the site registry (excluding apex), showing:
  - Site name
  - Site description (from `SiteMetadata.description`)
  - Subtle accent using the site's primary theme color (border or color bar)
  - Links to the subdomain (production) or `?site=` param (local dev), using the same `siteHref()` pattern from the current homepage
- Falls back to "Coming soon" messaging if no subsidiaries are registered

### 2. About Page (`/about`)

**Hero Section:**
- Headline: "About Specific Industries"
- Subheadline: Deadpan corporate mission statement about identifying and serving overlooked industries

**Company Story Section:**
- Deadpan corporate narrative: Bill Sambrone noticed that certain industries were drastically underserved and founded Specific Industries to address these gaps
- Mission/values block played completely straight — "innovation," "market specificity," "vertical dedication"
- Optional: fake founding year and corporate milestones

**Leadership Team:**
- Uses the shared `TeamMember` component
- **Bill Sambrone** — Founder & CEO. Static name, static title, static bio. Image: `bill-sambrone.png`. Bio: deadpan corporate founder statement about identifying underserved markets.
- **3 team members** — Client-side randomized names, titles, and bios on every page load:
  - Names drawn from a pool of corporate-sounding names (e.g., "Richard Thornberry," "James Whitfield," "Douglas Pemberton," "Gregory Ashworth," "Philip Mercer," etc.)
  - Titles drawn from a pool of absurd-but-plausible corporate titles (e.g., "VP of Vertical Integration," "Chief Specificity Officer," "Director of Niche Market Analytics," "SVP of Underserved Sector Strategy")
  - Bios drawn from a pool of deadpan corporate bio snippets (e.g., "Brings 15 years of experience in identifying niche market opportunities across underserved verticals.")
  - Images: `member-1.png`, `member-2.png`, `member-3.png` (static — same face, different name/title/bio each load)
- The About page is a `"use client"` component to support the randomization
- The `TeamMember` component requires a `bio` prop — all team members (static and randomized) must provide one

### 3. Disclaimer Page (`/disclaimer`)

- Navigation link label: "Disclaimer" (neutral, corporate-appropriate)
- Page content clearly identifies all Specific Industries brands and products as fictional, created for entertainment/satirical purposes
- Written in a tone that's still somewhat corporate but unmistakably clear: "The brands, products, and services depicted on Specific Industries properties are fictional and created for entertainment purposes."
- This is the single disclaimer that all subdomain footers link to
- Includes schema.org structured data to help search engines classify content

### 4. Privacy Policy (`/privacy`)

- Fully serious, non-satirical language
- Sections:
  - What data is collected
  - Cookies and tracking technologies
  - Google Analytics (data collection, anonymization, opt-out)
  - Google Ads (personalized advertising, ad cookies, third-party ad networks)
  - Third-party services
  - User rights (GDPR/CCPA-friendly language)
  - Data retention
  - Contact information
- Prominently states: "This privacy policy governs all properties under specificindustries.com, including all subdomain sites. In the event of any conflict between this policy and any policy found on a subdomain property, this policy shall prevail."
- Footer link (not in main nav)

### 5. Terms of Use (`/terms`)

- Fully serious, non-satirical language
- Sections:
  - Acceptance of terms
  - Description of service (notes that all subdomain content is satirical/entertainment)
  - Acceptable use
  - Intellectual property
  - Disclaimers of warranty
  - Limitation of liability
  - Governing law
  - Contact information
- Prominently states: "These terms of use govern all properties under specificindustries.com, including all subdomain sites. In the event of any conflict between these terms and any terms found on a subdomain property, these terms shall prevail."
- Footer link (not in main nav)

## Navigation

**Header nav:** Home, About, Disclaimer
**Footer links:** Privacy Policy, Terms of Use (plus the existing copyright line)

## Visual Style

Keep the current dark corporate theme:
- Dark navy primary (`#1a1a2e`)
- Light secondary (`#e2e8f0`)
- Space Grotesk for headings, Inter for body text
- Corporate preset

No changes to the theme system — each subdomain continues to have fully independent styling via its own `SiteConfig`.

## Image Assets

Source images at `/mnt/c/Users/bsamb/Downloads/apex/`. Copy to `public/sites/apex/team/` during implementation.

| File | Description | Destination |
|------|-------------|-------------|
| `bill-sambrone.png` | Founder headshot | `public/sites/apex/team/bill-sambrone.png` |
| `member-1.png` | Team member — dark hair, red tie | `public/sites/apex/team/member-1.png` |
| `member-2.png` | Team member — bald, glasses, gray beard | `public/sites/apex/team/member-2.png` |
| `member-3.png` | Team member — reddish hair, glasses, blue tie | `public/sites/apex/team/member-3.png` |

Images are PNG format, 1-3MB each. Optimize during implementation if needed (Next.js `<Image>` handles this at serve time).

## SEO & Structured Data

### Apex Site

- Update `src/sites/apex/config.ts` metadata: `title` → "Specific Industries — Serving the World's Most Specific Industries", `description` → deadpan corporate description
- Update root layout's static `export const metadata: Metadata` to match the new apex branding as the fallback
- Open Graph tags: `og:title`, `og:description`, `og:type: "website"` (derived from site config metadata)
- `og:image` is deferred — no OG image asset for now
- `<meta name="classification" content="satire, entertainment, humor">`
- Schema.org JSON-LD: a single site-wide `CreativeWork` with `genre: "satire"` injected in the root layout. No additional per-page JSON-LD — the layout-level block covers all pages including the disclaimer.

### All Subdomain Sites

- Ensure `SiteMetadata.title` and `SiteMetadata.description` render as proper `<title>` and `<meta name="description">` tags
- Open Graph tags derived from site config
- The same site-wide `<meta name="classification">` and schema.org JSON-LD from the root layout applies to all subdomain pages automatically

### Implementation

- The `classification` meta tag is non-standard and not part of Next.js's `Metadata` API. Use `metadata.other` (e.g., `other: { classification: "satire, entertainment, humor" }`) in the catch-all route's `generateMetadata`, or inject it as a raw `<meta>` tag in the root layout's `<head>`.
- Schema.org JSON-LD is injected as a `<script type="application/ld+json">` tag in the root layout `<body>` (or `<head>`). One block, site-wide.
- `generateMetadata` in the catch-all route reads from `site.config.metadata` for per-page titles/descriptions. The root layout's static `metadata` export serves as the fallback.

## Cross-Site Changes

### Shared Footer Component Update

The shared footer (`src/components/layout/footer.tsx`) needs conditional behavior for subdomain sites:

- **On apex:** Footer shows Privacy Policy and Terms of Use links (current behavior, pointing to `/privacy` and `/terms`). The copyright line should read "© {year} Specific Industries" (no "A Specific Industries company" text since we're already on the apex site).
- **On subdomains:** Footer additionally shows:
  - "Specific Industries" link pointing to `https://specificindustries.com`
  - "Disclaimer" link pointing to `https://specificindustries.com/disclaimer`

The footer checks `config.subdomain === "apex"` to determine which mode to render. For the cross-site links to apex, use absolute production URLs (`https://specificindustries.com/...`) in all environments — these are legal/policy links, not app navigation, so they should always point to the canonical production domain even in local dev.

### Subdomain Privacy/Terms Page Updates

All existing subdomain privacy and terms pages (currently: pigmilk, dehydratedwater) need a banner/notice added at the top of their content:

> "The authoritative policies for all Specific Industries properties are maintained at [specificindustries.com](https://specificindustries.com). [View Privacy Policy](https://specificindustries.com/privacy) | [View Terms of Use](https://specificindustries.com/terms)"

These links use absolute production URLs in all environments (same rationale as the footer — legal references should always point to the canonical domain). This banner appears above the existing satirical content. The satirical content remains below it unchanged.

## File Structure (New/Modified)

```
src/sites/apex/
├── config.ts              # MODIFY — update nav to include About, Disclaimer
├── index.ts               # MODIFY — add new pages to pages map
├── pages/
│   ├── home.tsx           # MODIFY — redesign with new hero copy + Our Brands grid
│   ├── about.tsx          # NEW — About page with leadership team
│   ├── disclaimer.tsx     # NEW — Satire disclaimer page
│   ├── privacy.tsx        # NEW — Serious privacy policy
│   └── terms.tsx          # NEW — Serious terms of use

src/components/layout/
└── footer.tsx             # MODIFY — add apex link + disclaimer link for subdomains

src/app/
└── layout.tsx             # MODIFY — add classification meta tag + schema.org JSON-LD

src/sites/pigmilk/pages/
├── privacy.tsx            # MODIFY — add apex authority banner at top
└── terms.tsx              # MODIFY — add apex authority banner at top

src/sites/dehydratedwater/pages/
├── privacy.tsx            # MODIFY — add apex authority banner at top
└── terms.tsx              # MODIFY — add apex authority banner at top

public/sites/apex/team/
├── bill-sambrone.png      # NEW — copy from Downloads
├── member-1.png           # NEW — copy from Downloads
├── member-2.png           # NEW — copy from Downloads
└── member-3.png           # NEW — copy from Downloads
```

## Out of Scope

- robots.txt / sitemap.xml generation
- Google Analytics integration (just the policy language covering it)
- Google Ads integration (just the policy language covering it)
- Commerce features on apex
- Contact page
- Open Graph image (`og:image`) asset — deferred until a branded image is created
- Image optimization beyond what Next.js `<Image>` provides automatically
