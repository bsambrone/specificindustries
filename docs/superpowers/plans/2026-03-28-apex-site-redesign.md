# Apex Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the apex site with proper corporate branding, legal pages, satire disclaimers, SEO metadata, and cross-site footer/policy references.

**Architecture:** Build apex pages first (homepage redesign, about, disclaimer, privacy, terms), then update shared infrastructure (footer, layout SEO), then update existing subdomain pages to reference apex policies. All pages use existing shared components (Hero, TeamMember) and follow the established site module pattern.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, React

**Spec:** `docs/superpowers/specs/2026-03-28-apex-site-redesign.md`

---

### Task 1: Copy team images to public assets

**Files:**
- Create: `public/sites/apex/team/bill-sambrone.png`
- Create: `public/sites/apex/team/member-1.png`
- Create: `public/sites/apex/team/member-2.png`
- Create: `public/sites/apex/team/member-3.png`

- [ ] **Step 1: Create the directory and copy images**

```bash
mkdir -p public/sites/apex/team
cp /mnt/c/Users/bsamb/Downloads/apex/bill-sambrone.png public/sites/apex/team/
cp /mnt/c/Users/bsamb/Downloads/apex/member-1.png public/sites/apex/team/
cp /mnt/c/Users/bsamb/Downloads/apex/member-2.png public/sites/apex/team/
cp /mnt/c/Users/bsamb/Downloads/apex/member-3.png public/sites/apex/team/
```

- [ ] **Step 2: Verify all 4 images exist**

```bash
ls -la public/sites/apex/team/
```

Expected: 4 PNG files (bill-sambrone.png, member-1.png, member-2.png, member-3.png)

- [ ] **Step 3: Commit**

```bash
git add public/sites/apex/team/
git commit -m "asset: add apex team headshot images"
```

---

### Task 2: Update apex config — metadata, navigation

**Files:**
- Modify: `src/sites/apex/config.ts`

- [ ] **Step 1: Update config with new metadata and nav**

Replace the entire contents of `src/sites/apex/config.ts` with:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Specific Industries",
  subdomain: "apex",
  theme: {
    preset: "corporate",
    colors: {
      primary: "#1a1a2e",
      secondary: "#e2e8f0",
      accent: "#0f3460",
      background: "#ffffff",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Specific Industries — Serving the World's Most Specific Industries",
    description: "We identify overlooked market segments and build dedicated brands to serve them. Specific Industries is the parent company behind a portfolio of brands serving the world's most specific industries.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Disclaimer", path: "/disclaimer" },
  ],
  features: {
    commerce: false,
  },
}
```

Changes from current:
- `metadata.title` → new branding headline
- `metadata.description` → deadpan corporate description
- `nav` → added About and Disclaimer links

- [ ] **Step 2: Verify the dev server runs without errors**

```bash
npm run dev
```

Visit `localhost:3000` — confirm nav shows Home, About, Disclaimer. About and Disclaimer will 404 (pages not built yet). That's expected.

- [ ] **Step 3: Commit**

```bash
git add src/sites/apex/config.ts
git commit -m "feat(apex): update metadata and navigation for site redesign"
```

---

### Task 3: Redesign apex homepage

**Files:**
- Modify: `src/sites/apex/pages/home.tsx`

The current homepage already has the Hero + brands grid pattern. We're updating the copy, improving the grid to 3 columns, and adding theme color accents to cards.

- [ ] **Step 1: Rewrite homepage**

Replace the entire contents of `src/sites/apex/pages/home.tsx` with:

```typescript
import { headers } from "next/headers"
import { siteRegistry } from "@/sites/registry"
import { Hero } from "@/components/ui/hero"

const PRODUCTION_HOST = "specificindustries.com"

export default async function ApexHome() {
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isProduction = host.endsWith(PRODUCTION_HOST)

  const sites = Object.entries(siteRegistry).filter(
    ([key]) => key !== "apex"
  )

  function siteHref(subdomain: string): string {
    if (isProduction) {
      return `https://${subdomain}.${PRODUCTION_HOST}`
    }
    return `/?site=${subdomain}`
  }

  return (
    <>
      <Hero
        headline="Serving the World's Most Specific Industries"
        subheadline="We identify overlooked market segments and build dedicated brands to serve them."
      />
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-primary">
            Our Brands
          </h2>
          {sites.length === 0 ? (
            <p className="text-center text-foreground/50">Coming soon.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {sites.map(([subdomain, site]) => (
                <a
                  key={subdomain}
                  href={siteHref(subdomain)}
                  className="block w-full max-w-sm p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                  style={{ borderTopColor: site.config.theme.colors.primary, borderTopWidth: "3px" }}
                >
                  <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                    {site.config.name}
                  </h3>
                  <p className="text-foreground/60">
                    {site.config.metadata.description}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
```

Key changes from current:
- Hero copy updated to new deadpan branding
- Grid replaced with flexbox (`flex flex-wrap justify-center`) so incomplete rows are centered
- Cards have `max-w-sm` + `w-full` for uniform sizing
- Cards get a colored top border from each site's primary theme color
- Container widened to `max-w-5xl` to accommodate 3 columns

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Visit `localhost:3000` — confirm:
- Hero shows new headline and subheadline
- "Our Brands" section shows cards with colored top borders
- Cards are centered in the grid
- Clicking a card navigates to the subdomain

- [ ] **Step 3: Commit**

```bash
git add src/sites/apex/pages/home.tsx
git commit -m "feat(apex): redesign homepage with new branding and 3-column grid"
```

---

### Task 4: Create About page with randomized team

**Files:**
- Create: `src/sites/apex/pages/about.tsx`

This is a `"use client"` component because team member names/titles/bios randomize on each render.

- [ ] **Step 1: Create the About page**

Create `src/sites/apex/pages/about.tsx`:

```typescript
"use client"

import { useState } from "react"
import { Hero } from "@/components/ui/hero"
import { TeamMember } from "@/components/ui/team-member"

const TEAM_NAMES = [
  "Richard Thornberry",
  "James Whitfield",
  "Douglas Pemberton",
  "Gregory Ashworth",
  "Philip Mercer",
  "Jonathan Caldwell",
  "William Hargrove",
  "Thomas Fairbanks",
  "Robert Kingsley",
  "Edward Stanton",
  "Charles Whitmore",
  "Andrew Prescott",
]

const TEAM_TITLES = [
  "VP of Vertical Integration",
  "Chief Specificity Officer",
  "Director of Niche Market Analytics",
  "SVP of Underserved Sector Strategy",
  "Head of Precision Brand Development",
  "VP of Market Segment Identification",
  "Chief Portfolio Diversification Officer",
  "Director of Targeted Industry Solutions",
  "SVP of Strategic Specificity",
  "Head of Emerging Niche Operations",
  "VP of Bespoke Market Cultivation",
  "Chief Overlooked Opportunity Officer",
]

const TEAM_BIOS = [
  "Brings 15 years of experience in identifying niche market opportunities across underserved verticals.",
  "Formerly led market expansion at three Fortune 500 companies before recognizing the untapped potential of highly specific industries.",
  "Published researcher in the field of precision market segmentation with a focus on overlooked consumer demographics.",
  "Pioneered the framework for evaluating market viability in sectors previously considered too specific to serve.",
  "Background in strategic consulting with a specialization in brands that most people don't know they need.",
  "Built and scaled operations across seven distinct micro-industries, each more specific than the last.",
  "Recognized by Industry Weekly as a top innovator in the field of niche market identification and cultivation.",
  "Holds an MBA from Wharton with a thesis on the economics of serving markets that arguably should not exist.",
  "Two decades of experience turning overlooked opportunities into portfolio companies with dedicated followings.",
]

function shuffleAndPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function ApexAbout() {
  const [teamMembers] = useState(() => {
    const names = shuffleAndPick(TEAM_NAMES, 3)
    const titles = shuffleAndPick(TEAM_TITLES, 3)
    const bios = shuffleAndPick(TEAM_BIOS, 3)

    return [
      { image: "/sites/apex/team/member-1.png", name: names[0], title: titles[0], bio: bios[0] },
      { image: "/sites/apex/team/member-2.png", name: names[1], title: titles[1], bio: bios[1] },
      { image: "/sites/apex/team/member-3.png", name: names[2], title: titles[2], bio: bios[2] },
    ]
  })

  return (
    <>
      <Hero
        headline="About Specific Industries"
        subheadline="Identifying and serving the world's most overlooked market segments since day one."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-heading font-bold text-primary">Our Story</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Specific Industries was founded by Bill Sambrone after a simple observation: some industries
            are so specific, so niche, so deeply underserved that no one had thought to build a
            dedicated brand for them. Until now.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            What began as a single venture into an overlooked market has grown into a portfolio of
            brands, each laser-focused on serving a specific industry with the dedication and
            expertise it deserves. We don&apos;t chase broad markets. We find the gaps that others
            walk right past, and we build something for the people standing in them.
          </p>

          <h2 className="text-3xl font-heading font-bold text-primary pt-8">Our Mission</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            To identify, develop, and operate brands that serve markets too specific for anyone else
            to bother with. We believe that every industry — no matter how niche — deserves a
            company that takes it seriously.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="text-center">
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Market Specificity</h3>
              <p className="text-foreground/60 text-sm">We go where others won&apos;t — into markets so specific they barely have a name.</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Vertical Dedication</h3>
              <p className="text-foreground/60 text-sm">Each brand gets our full attention. We don&apos;t do half-measures in niche markets.</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Innovation</h3>
              <p className="text-foreground/60 text-sm">We apply serious operational rigor to industries that most people don&apos;t know exist.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-primary">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <TeamMember
              image="/sites/apex/team/bill-sambrone.png"
              name="Bill Sambrone"
              title="Founder & CEO"
              bio="Founded Specific Industries after identifying a pattern of underserved markets that no one else was willing to take seriously."
            />
            {teamMembers.map((member) => (
              <TeamMember
                key={member.image}
                image={member.image}
                name={member.name}
                title={member.title}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the About page in the barrel**

In `src/sites/apex/index.ts`, add the import and page entry:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import ApexHome from "./pages/home"
import ApexAbout from "./pages/about"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ApexHome,
  "about": {
    component: ApexAbout,
    metadata: {
      title: "About — Specific Industries",
      description: "Learn about Specific Industries, our mission to serve overlooked markets, and the team behind our portfolio of brands.",
    },
  },
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Visit `localhost:3000/about` (or `localhost:3000/about?site=apex`) — confirm:
- Hero shows "About Specific Industries"
- Company story section renders
- Mission/values section renders with 3 value cards
- Leadership section shows Bill Sambrone (static) + 3 team members with randomized names
- Refresh the page — team member names/titles/bios should change

- [ ] **Step 4: Commit**

```bash
git add src/sites/apex/pages/about.tsx src/sites/apex/index.ts
git commit -m "feat(apex): add About page with randomized leadership team"
```

---

### Task 5: Create Disclaimer page

**Files:**
- Create: `src/sites/apex/pages/disclaimer.tsx`
- Modify: `src/sites/apex/index.ts`

- [ ] **Step 1: Create the Disclaimer page**

Create `src/sites/apex/pages/disclaimer.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export default function ApexDisclaimer() {
  return (
    <>
      <Hero
        headline="Disclaimer"
        subheadline="Important information about Specific Industries and its subsidiary brands."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-primary">Satire & Entertainment Notice</h2>
          <p>
            All brands, products, and services depicted on Specific Industries properties — including
            all subdomain websites — are <strong>fictional</strong> and created entirely for
            entertainment and satirical purposes. None of the products described on our subsidiary
            websites are real, available for purchase, or endorsed by any actual company or organization.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">No Real Products or Services</h2>
          <p>
            The subsidiary brands operated under the Specific Industries umbrella are works of humor.
            Product descriptions, nutritional information, company histories, team biographies, pricing,
            and any other content presented on these sites are entirely fictional. Any checkout or
            purchase flows are non-functional and exist solely as part of the satirical experience.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">No Professional Advice</h2>
          <p>
            Nothing on any Specific Industries property constitutes medical, legal, financial, nutritional,
            or any other form of professional advice. Any claims, statistics, or scientific-sounding
            language on our subsidiary sites are fabricated for comedic effect and should not be relied
            upon for any purpose.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">Resemblance to Real Entities</h2>
          <p>
            Any resemblance between our fictional brands and real companies, products, or persons is
            purely coincidental. Specific Industries is a real entity that operates these satirical
            websites; the subsidiary brands themselves are not real businesses.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">Authoritative Policies</h2>
          <p>
            While our subsidiary sites may contain their own humorous privacy policies and terms of use
            as part of the satirical experience, the only legally binding policies governing your use
            of any Specific Industries property are the{" "}
            <a href="/privacy" className="text-accent underline hover:text-primary transition-colors">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="text-accent underline hover:text-primary transition-colors">
              Terms of Use
            </a>{" "}
            published on this domain (specificindustries.com).
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the Disclaimer page in the barrel**

Update `src/sites/apex/index.ts` to add the disclaimer import and page entry:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import ApexHome from "./pages/home"
import ApexAbout from "./pages/about"
import ApexDisclaimer from "./pages/disclaimer"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ApexHome,
  "about": {
    component: ApexAbout,
    metadata: {
      title: "About — Specific Industries",
      description: "Learn about Specific Industries, our mission to serve overlooked markets, and the team behind our portfolio of brands.",
    },
  },
  "disclaimer": {
    component: ApexDisclaimer,
    metadata: {
      title: "Disclaimer — Specific Industries",
      description: "Important information about the satirical and entertainment nature of Specific Industries subsidiary brands.",
    },
  },
}
```

- [ ] **Step 3: Verify in browser**

Visit `localhost:3000/disclaimer` — confirm:
- Hero says "Disclaimer" (neutral)
- Body content clearly identifies sites as satire
- Links to Privacy Policy and Terms of Use work

- [ ] **Step 4: Commit**

```bash
git add src/sites/apex/pages/disclaimer.tsx src/sites/apex/index.ts
git commit -m "feat(apex): add Disclaimer page with satire notice"
```

---

### Task 6: Create Privacy Policy page

**Files:**
- Create: `src/sites/apex/pages/privacy.tsx`
- Modify: `src/sites/apex/index.ts`

- [ ] **Step 1: Create the Privacy Policy page**

Create `src/sites/apex/pages/privacy.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export default function ApexPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="How we collect, use, and protect your information."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Last updated: March 28, 2026
          </p>

          <p className="text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            <strong>Scope:</strong> This privacy policy governs all properties under specificindustries.com,
            including all subdomain sites. In the event of any conflict between this policy and any
            policy found on a subdomain property, this policy shall prevail.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Introduction</h2>
          <p>
            Specific Industries (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
            specificindustries.com and its associated subdomain websites. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you visit any of our
            websites.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Information We Collect</h2>
          <p>We may collect information about you in the following ways:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Automatically collected data:</strong> When you visit our websites, we automatically
              collect certain information about your device, including your IP address, browser type,
              operating system, referring URLs, and pages visited. This data is collected through cookies,
              web beacons, and similar tracking technologies.
            </li>
            <li>
              <strong>Analytics data:</strong> We use Google Analytics to understand how visitors interact
              with our websites. Google Analytics collects information such as how often users visit our
              sites, what pages they visit, and what other sites they used prior to visiting. We use this
              information solely to improve our websites.
            </li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Cookies and Tracking Technologies</h2>
          <p>
            Our websites use cookies and similar tracking technologies to collect and store information.
            Cookies are small data files placed on your device. We use:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Essential cookies:</strong> Required for basic website functionality.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Used by Google Analytics to understand website usage patterns.
            </li>
            <li>
              <strong>Advertising cookies:</strong> Used by Google Ads and its partners to serve relevant
              advertisements and measure ad performance. These cookies may track your browsing activity
              across multiple websites to build a profile of your interests.
            </li>
          </ul>
          <p>
            You can control cookie preferences through your browser settings. Disabling certain cookies
            may affect website functionality.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Google Analytics</h2>
          <p>
            We use Google Analytics, a web analytics service provided by Google LLC. Google Analytics
            uses cookies to help us analyze how visitors use our websites. The information generated
            by cookies about your use of our websites is transmitted to and stored by Google on
            servers in the United States.
          </p>
          <p>
            We have enabled IP anonymization, which means your IP address is truncated before
            transmission to Google. Google will use this information to evaluate your use of our
            websites, compile reports on website activity, and provide other services related to
            website and internet usage.
          </p>
          <p>
            You can opt out of Google Analytics by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-primary transition-colors"
            >
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Google Ads</h2>
          <p>
            We use Google Ads to display advertisements on our websites. Google and its partners use
            cookies to serve ads based on your prior visits to our websites and other websites on
            the internet. This is known as personalized advertising.
          </p>
          <p>
            You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-primary transition-colors"
            >
              Google Ads Settings
            </a>. You can also visit{" "}
            <a
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-primary transition-colors"
            >
              www.aboutads.info
            </a>{" "}
            to opt out of third-party advertising cookies.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Third-Party Services</h2>
          <p>
            In addition to Google Analytics and Google Ads, we may use other third-party services
            that collect, monitor, and analyze visitor data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vercel Analytics and Speed Insights for performance monitoring</li>
            <li>Content delivery networks for serving website assets</li>
          </ul>
          <p>
            These third-party service providers have their own privacy policies governing the
            information they collect.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Operate and maintain our websites</li>
            <li>Understand how visitors use our websites to improve content and user experience</li>
            <li>Display relevant advertisements</li>
            <li>Monitor and analyze usage trends</li>
            <li>Detect and prevent technical issues</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-primary">8. Data Retention</h2>
          <p>
            We retain automatically collected data for as long as necessary to fulfill the purposes
            described in this policy. Google Analytics data is retained according to our configured
            retention settings and Google&apos;s data retention policies.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">9. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Access:</strong> You may request a copy of the personal data we hold about you.
            </li>
            <li>
              <strong>Deletion:</strong> You may request that we delete your personal data, subject
              to certain exceptions.
            </li>
            <li>
              <strong>Opt-out:</strong> You may opt out of the sale or sharing of your personal data
              for targeted advertising purposes.
            </li>
            <li>
              <strong>Do Not Track:</strong> We honor Do Not Track browser signals where technically feasible.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at the address below.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">10. Children&apos;s Privacy</h2>
          <p>
            Our websites are not directed to individuals under the age of 13. We do not knowingly
            collect personal information from children under 13. If you believe we have collected
            information from a child under 13, please contact us so we can promptly remove it.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
            Your continued use of our websites after any changes constitutes acceptance of the
            updated policy.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{" "}
            <a
              href="mailto:privacy@specificindustries.com"
              className="text-accent underline hover:text-primary transition-colors"
            >
              privacy@specificindustries.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the Privacy Policy page in the barrel**

Replace the entire contents of `src/sites/apex/index.ts` with:

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import ApexHome from "./pages/home"
import ApexAbout from "./pages/about"
import ApexDisclaimer from "./pages/disclaimer"
import ApexPrivacy from "./pages/privacy"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ApexHome,
  "about": {
    component: ApexAbout,
    metadata: {
      title: "About — Specific Industries",
      description: "Learn about Specific Industries, our mission to serve overlooked markets, and the team behind our portfolio of brands.",
    },
  },
  "disclaimer": {
    component: ApexDisclaimer,
    metadata: {
      title: "Disclaimer — Specific Industries",
      description: "Important information about the satirical and entertainment nature of Specific Industries subsidiary brands.",
    },
  },
  "privacy": {
    component: ApexPrivacy,
    metadata: {
      title: "Privacy Policy — Specific Industries",
      description: "How Specific Industries collects, uses, and protects your information across all our properties.",
    },
  },
}
```

- [ ] **Step 3: Verify in browser**

Visit `localhost:3000/privacy` — confirm:
- Scope notice at top mentioning apex overrides subdomain policies
- All 12 sections render
- Google Analytics and Google Ads sections have working opt-out links
- Tone is professional and non-satirical throughout

- [ ] **Step 4: Commit**

```bash
git add src/sites/apex/pages/privacy.tsx src/sites/apex/index.ts
git commit -m "feat(apex): add serious Privacy Policy covering Google Analytics and Ads"
```

---

### Task 7: Create Terms of Use page

**Files:**
- Create: `src/sites/apex/pages/terms.tsx`
- Modify: `src/sites/apex/index.ts`

- [ ] **Step 1: Create the Terms of Use page**

Create `src/sites/apex/pages/terms.tsx`:

```typescript
import { Hero } from "@/components/ui/hero"

export default function ApexTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="Please read these terms carefully before using our websites."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Last updated: March 28, 2026
          </p>

          <p className="text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            <strong>Scope:</strong> These terms of use govern all properties under specificindustries.com,
            including all subdomain sites. In the event of any conflict between these terms and any
            terms found on a subdomain property, these terms shall prevail.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By accessing or using any website operated by Specific Industries, including
            specificindustries.com and all associated subdomain websites (collectively, the
            &ldquo;Sites&rdquo;), you agree to be bound by these Terms of Use. If you do not
            agree to these terms, please do not use the Sites.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Description of Service</h2>
          <p>
            Specific Industries operates a portfolio of websites for entertainment and satirical
            purposes. The content on our subdomain sites — including product descriptions, company
            histories, team biographies, pricing information, and checkout flows — is fictional
            and created for entertainment. No real products or services are offered for sale
            through any of our subdomain properties.
          </p>
          <p>
            The only non-satirical content on our Sites is this Terms of Use, our{" "}
            <a href="/privacy" className="text-accent underline hover:text-primary transition-colors">
              Privacy Policy
            </a>, and our{" "}
            <a href="/disclaimer" className="text-accent underline hover:text-primary transition-colors">
              Disclaimer
            </a>.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Intellectual Property</h2>
          <p>
            All content on the Sites — including text, graphics, logos, images, audio, video, and
            software — is the property of Specific Industries or its content suppliers and is
            protected by United States and international copyright laws. You may not reproduce,
            distribute, modify, create derivative works of, publicly display, or otherwise use
            any content from the Sites without our prior written consent.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Acceptable Use</h2>
          <p>You agree not to use the Sites to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate any applicable local, state, national, or international law</li>
            <li>Attempt to gain unauthorized access to any portion of the Sites or any systems connected to the Sites</li>
            <li>Interfere with or disrupt the operation of the Sites or servers hosting the Sites</li>
            <li>Use any automated means to access or collect data from the Sites without our consent</li>
            <li>Misrepresent our satirical content as genuine product offerings or real business operations</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Disclaimers of Warranty</h2>
          <p>
            The Sites and all content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            without warranties of any kind, either express or implied, including but not limited to
            implied warranties of merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that the Sites will be uninterrupted, secure,
            or error-free.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Specific Industries shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or any loss of
            profits or revenues, whether incurred directly or indirectly, arising from your use
            of or inability to use the Sites.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Specific Industries and its officers,
            directors, employees, and agents from any claims, liabilities, damages, losses, and
            expenses arising from your use of the Sites or your violation of these Terms.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">8. Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with the laws
            of the United States, without regard to conflict of law principles.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">9. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. We will notify you of
            changes by updating the &ldquo;Last updated&rdquo; date on this page. Your continued
            use of the Sites after any modifications constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">10. Contact Us</h2>
          <p>
            If you have questions about these Terms of Use, please contact us at:{" "}
            <a
              href="mailto:legal@specificindustries.com"
              className="text-accent underline hover:text-primary transition-colors"
            >
              legal@specificindustries.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register the Terms page in the barrel**

Replace the entire contents of `src/sites/apex/index.ts` with the final version (all 5 pages):

```typescript
import { config } from "./config"
import type { PageEntry } from "@/themes"
import ApexHome from "./pages/home"
import ApexAbout from "./pages/about"
import ApexDisclaimer from "./pages/disclaimer"
import ApexPrivacy from "./pages/privacy"
import ApexTerms from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ApexHome,
  "about": {
    component: ApexAbout,
    metadata: {
      title: "About — Specific Industries",
      description: "Learn about Specific Industries, our mission to serve overlooked markets, and the team behind our portfolio of brands.",
    },
  },
  "disclaimer": {
    component: ApexDisclaimer,
    metadata: {
      title: "Disclaimer — Specific Industries",
      description: "Important information about the satirical and entertainment nature of Specific Industries subsidiary brands.",
    },
  },
  "privacy": {
    component: ApexPrivacy,
    metadata: {
      title: "Privacy Policy — Specific Industries",
      description: "How Specific Industries collects, uses, and protects your information across all our properties.",
    },
  },
  "terms": {
    component: ApexTerms,
    metadata: {
      title: "Terms of Use — Specific Industries",
      description: "Terms of use governing all Specific Industries properties including subdomain sites.",
    },
  },
}
```

- [ ] **Step 3: Verify in browser**

Visit `localhost:3000/terms` — confirm:
- Scope notice at top mentioning apex overrides subdomain terms
- All 10 sections render
- Links to Privacy Policy and Disclaimer work
- Tone is professional and non-satirical throughout

- [ ] **Step 4: Commit**

```bash
git add src/sites/apex/pages/terms.tsx src/sites/apex/index.ts
git commit -m "feat(apex): add serious Terms of Use with satire content acknowledgment"
```

---

### Task 8: Add SEO metadata and schema.org JSON-LD to root layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/[[...slug]]/page.tsx`

- [ ] **Step 1: Add schema.org JSON-LD to root layout**

In `src/app/layout.tsx`, add a JSON-LD script tag inside `<head>` after the favicon link:

Find this block:
```typescript
      <head>
        {faviconPath && <link rel="icon" href={faviconPath} />}
      </head>
```

Replace with:
```typescript
      <head>
        {faviconPath && <link rel="icon" href={faviconPath} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "genre": "satire",
              "description": "Specific Industries is a satirical entertainment project featuring fictional brands and products.",
              "publisher": {
                "@type": "Organization",
                "name": "Specific Industries",
                "url": "https://specificindustries.com",
              },
            }),
          }}
        />
      </head>
```

- [ ] **Step 2: Update the static metadata fallback in root layout**

In `src/app/layout.tsx`, update the static metadata export:

Find:
```typescript
export const metadata: Metadata = {
  title: "Specific Industries",
  description: "Specific Industries — Very Specific Products",
}
```

Replace with:
```typescript
export const metadata: Metadata = {
  title: "Specific Industries — Serving the World's Most Specific Industries",
  description: "We identify overlooked market segments and build dedicated brands to serve them.",
}
```

- [ ] **Step 3: Add classification meta tag in generateMetadata**

In `src/app/[[...slug]]/page.tsx`, add the `other` field to both return statements in `generateMetadata`.

Find the dynamic routes metadata return (around line 34-44):
```typescript
        return {
          title: dynamicMeta.title || site.config.metadata.title,
          description: dynamicMeta.description || site.config.metadata.description,
          openGraph: {
            title: dynamicMeta.title || site.config.metadata.title,
            description: dynamicMeta.description || site.config.metadata.description,
            images: site.config.metadata.ogImage ? [site.config.metadata.ogImage] : [],
          },
        }
```

Replace with:
```typescript
        return {
          title: dynamicMeta.title || site.config.metadata.title,
          description: dynamicMeta.description || site.config.metadata.description,
          openGraph: {
            title: dynamicMeta.title || site.config.metadata.title,
            description: dynamicMeta.description || site.config.metadata.description,
            images: site.config.metadata.ogImage ? [site.config.metadata.ogImage] : [],
          },
          other: {
            classification: "satire, entertainment, humor",
          },
        }
```

Find the main metadata return (around line 47-55):
```typescript
  return {
    title: pageMetadata?.title || site.config.metadata.title,
    description: pageMetadata?.description || site.config.metadata.description,
    openGraph: {
      title: pageMetadata?.title || site.config.metadata.title,
      description: pageMetadata?.description || site.config.metadata.description,
      images: site.config.metadata.ogImage ? [site.config.metadata.ogImage] : [],
    },
  }
```

Replace with:
```typescript
  return {
    title: pageMetadata?.title || site.config.metadata.title,
    description: pageMetadata?.description || site.config.metadata.description,
    openGraph: {
      title: pageMetadata?.title || site.config.metadata.title,
      description: pageMetadata?.description || site.config.metadata.description,
      images: site.config.metadata.ogImage ? [site.config.metadata.ogImage] : [],
    },
    other: {
      classification: "satire, entertainment, humor",
    },
  }
```

- [ ] **Step 4: Verify SEO output**

```bash
npm run dev
```

Visit `localhost:3000` and view page source. Confirm:
- `<title>` shows new apex title
- `<meta name="description">` shows new description
- `<meta name="classification" content="satire, entertainment, humor">` is present
- Schema.org JSON-LD script tag is present with `"genre": "satire"`
- Open Graph tags are present

Also check a subdomain page (e.g., `localhost:3000/?site=pigmilk`) — confirm the classification meta tag and JSON-LD are present there too.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/\[\[...slug\]\]/page.tsx
git commit -m "feat: add satire classification meta tags and schema.org JSON-LD site-wide"
```

---

### Task 9: Update shared footer for cross-site links

**Files:**
- Modify: `src/components/layout/footer.tsx`

- [ ] **Step 1: Update the Footer component**

Replace the entire contents of `src/components/layout/footer.tsx` with:

```typescript
"use client"

import Link from "next/link"
import type { SiteConfig } from "@/themes"
import { useSiteLink } from "@/hooks/use-site-link"

const APEX_URL = "https://specificindustries.com"

export function Footer({ config }: { config: SiteConfig }) {
  const siteHref = useSiteLink()
  const isApex = config.subdomain === "apex"

  return (
    <footer className="border-t border-primary/10 bg-background mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-foreground/50 text-sm space-y-3">
        {isApex ? (
          <p>&copy; {new Date().getFullYear()} Specific Industries.</p>
        ) : (
          <p>&copy; {new Date().getFullYear()} {config.name}. A{" "}
            <a
              href={APEX_URL}
              className="underline hover:text-foreground transition-colors"
            >
              Specific Industries
            </a>{" "}
            company.
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={siteHref("/privacy")} className="hover:text-foreground transition-colors underline">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href={siteHref("/terms")} className="hover:text-foreground transition-colors underline">
            Terms of Use
          </Link>
          {!isApex && (
            <>
              <span>|</span>
              <a
                href={`${APEX_URL}/disclaimer`}
                className="hover:text-foreground transition-colors underline"
              >
                Disclaimer
              </a>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}
```

Key changes:
- Apex footer: shows "Specific Industries" (no "A Specific Industries company" redundancy)
- Subdomain footer: "Specific Industries" in copyright is now a link to the apex site
- Subdomain footer: adds "Disclaimer" link pointing to `https://specificindustries.com/disclaimer`
- Uses absolute production URLs for cross-site links (legal/policy links)

- [ ] **Step 2: Verify in browser**

Check both apex and subdomain footers:
- `localhost:3000` — footer says "© 2026 Specific Industries." with Privacy Policy + Terms of Use links. No disclaimer link (it's in the nav instead).
- `localhost:3000/?site=pigmilk` — footer says "© 2026 Pig Milk Co. A Specific Industries company." where "Specific Industries" is a link. Shows Privacy Policy, Terms of Use, and Disclaimer links.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "feat: update footer with cross-site apex links and disclaimer for subdomains"
```

---

### Task 10: Add apex authority banner to subdomain privacy/terms pages

**Files:**
- Modify: `src/sites/pigmilk/pages/privacy.tsx`
- Modify: `src/sites/pigmilk/pages/terms.tsx`
- Modify: `src/sites/dehydratedwater/pages/privacy.tsx`
- Modify: `src/sites/dehydratedwater/pages/terms.tsx`

- [ ] **Step 1: Add banner to pigmilk privacy page**

In `src/sites/pigmilk/pages/privacy.tsx`, add the authority banner as the first child after the opening `<div className="max-w-3xl...">` tag, before the "Last updated" paragraph.

Find:
```typescript
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Last updated: When you weren&apos;t looking. Version: 47.3 (we keep changing it)
          </p>
```

Replace with:
```typescript
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>

          <p className="text-sm text-foreground/40 italic">
            Last updated: When you weren&apos;t looking. Version: 47.3 (we keep changing it)
          </p>
```

- [ ] **Step 2: Add banner to pigmilk terms page**

In `src/sites/pigmilk/pages/terms.tsx`, add the authority banner after the opening `<div className="max-w-3xl...">` tag, before the "Effective" paragraph.

Find:
```typescript
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Effective: Before you were born. Expires: Never.
          </p>
```

Replace with:
```typescript
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>

          <p className="text-sm text-foreground/40 italic">
            Effective: Before you were born. Expires: Never.
          </p>
```

- [ ] **Step 3: Add banner to dehydratedwater privacy page**

In `src/sites/dehydratedwater/pages/privacy.tsx`, add the authority banner after the opening `<div className="max-w-3xl...">` tag, before the "Last updated" paragraph.

Find:
```typescript
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Last updated: The 14th of Drytober, Year of Our Powder CLXXIX
          </p>
```

Replace with:
```typescript
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>

          <p className="text-sm text-foreground/40 italic">
            Last updated: The 14th of Drytober, Year of Our Powder CLXXIX
          </p>
```

- [ ] **Step 4: Add banner to dehydratedwater terms page**

In `src/sites/dehydratedwater/pages/terms.tsx`, add the authority banner after the opening `<div className="max-w-3xl...">` tag, before the "Effective" paragraph.

Find:
```typescript
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Effective: Retroactively, since 1847. Jurisdiction: The Drywell Estate, Vermont (fictional).
          </p>
```

Replace with:
```typescript
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>

          <p className="text-sm text-foreground/40 italic">
            Effective: Retroactively, since 1847. Jurisdiction: The Drywell Estate, Vermont (fictional).
          </p>
```

- [ ] **Step 5: Verify all 4 pages**

```bash
npm run dev
```

Check:
- `localhost:3000/privacy?site=pigmilk` — authority banner at top, satirical content below
- `localhost:3000/terms?site=pigmilk` — authority banner at top, satirical content below
- `localhost:3000/privacy?site=dehydratedwater` — authority banner at top, satirical content below
- `localhost:3000/terms?site=dehydratedwater` — authority banner at top, satirical content below

- [ ] **Step 6: Commit**

```bash
git add src/sites/pigmilk/pages/privacy.tsx src/sites/pigmilk/pages/terms.tsx src/sites/dehydratedwater/pages/privacy.tsx src/sites/dehydratedwater/pages/terms.tsx
git commit -m "feat: add apex authority banner to all subdomain privacy and terms pages"
```

---

### Task 11: Final verification — build and type check

**Files:** None (verification only)

- [ ] **Step 1: Run type check**

```bash
npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No errors (or only pre-existing warnings)

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 4: Full manual verification**

Start dev server and verify all pages:

```bash
npm run dev
```

**Apex pages:**
- `localhost:3000` — Homepage with hero + Our Brands grid
- `localhost:3000/about` — About page with leadership team (refresh to see name randomization)
- `localhost:3000/disclaimer` — Satire disclaimer
- `localhost:3000/privacy` — Serious privacy policy
- `localhost:3000/terms` — Serious terms of use

**Apex nav:** Home, About, Disclaimer visible in header
**Apex footer:** "© 2026 Specific Industries." + Privacy Policy + Terms of Use links

**Subdomain pages (spot check):**
- `localhost:3000/?site=pigmilk` — footer has "Specific Industries" link + "Disclaimer" link
- `localhost:3000/privacy?site=pigmilk` — authority banner at top
- `localhost:3000/terms?site=pigmilk` — authority banner at top

**SEO (view page source on any page):**
- `<meta name="classification" content="satire, entertainment, humor">`
- Schema.org JSON-LD with `"genre": "satire"`
- Correct `<title>` and `<meta name="description">`

- [ ] **Step 5: Commit any remaining fixes if needed**

If any issues were found in the above checks, fix them and commit.
