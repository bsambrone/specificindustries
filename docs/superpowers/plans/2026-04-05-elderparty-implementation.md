# The Elder Party Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a satirical Lovecraftian horror political party site at the `elderparty` subdomain with full commerce, dynamic coalitions, news, events, donate, volunteer, and the signature "Bleed" Zalgo corruption mechanic.

**Architecture:** New site under `src/sites/elderparty/` following the established multi-subdomain pattern. MegaMenu navigation (like strategicvoid), commerce enabled (like truegrit), 3 dynamic route sets (coalitions, news, shop). All pages are server components except cart, checkout, contact, and donate which need client interactivity. A new shared `<Bleed>` component provides progressive Zalgo text corruption.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, OpenAI gpt-image-1 for image generation

**Spec:** `docs/superpowers/specs/2026-04-05-elderparty-site-design.md`

---

## File Structure

### New files to create:

```
src/components/ui/bleed.tsx                    — Zalgo corruption component
src/sites/elderparty/config.ts                 — SiteConfig with theme, megaMenu, commerce
src/sites/elderparty/index.ts                  — Barrel export: config, pages, dynamicRoutes
src/sites/elderparty/data/products.ts          — Merch catalog (10 products)
src/sites/elderparty/data/coalitions.ts        — Coalition data (7 coalitions)
src/sites/elderparty/data/news.ts              — News articles (8 articles)
src/sites/elderparty/data/platform.ts          — Policy positions (8 positions)
src/sites/elderparty/data/events.ts            — Rally events (8 events)
src/sites/elderparty/data/leadership.ts        — Party officials (4 leaders)
src/sites/elderparty/data/volunteer.ts         — Volunteer activities (6 activities)
src/sites/elderparty/data/donate.ts            — Donation tiers (5 tiers)
src/sites/elderparty/pages/home.tsx            — Homepage
src/sites/elderparty/pages/platform.tsx        — Policy positions page
src/sites/elderparty/pages/coalitions.tsx      — Coalition index page
src/sites/elderparty/pages/coalition-detail.tsx — Dynamic coalition detail
src/sites/elderparty/pages/news.tsx            — News index page
src/sites/elderparty/pages/news-detail.tsx     — Dynamic news article detail
src/sites/elderparty/pages/events.tsx          — Events/rallies page
src/sites/elderparty/pages/volunteer.tsx       — Volunteer activities page
src/sites/elderparty/pages/donate.tsx          — Donation tiers page
src/sites/elderparty/pages/candidate.tsx       — Cthulhu R'lyeh bio page
src/sites/elderparty/pages/leadership.tsx      — Party officials page
src/sites/elderparty/pages/about.tsx           — Party history page
src/sites/elderparty/pages/shop.tsx            — Merch index page
src/sites/elderparty/pages/product-detail.tsx  — Dynamic product detail
src/sites/elderparty/pages/cart.tsx            — Cart page (client)
src/sites/elderparty/pages/checkout.tsx        — Checkout page (client)
src/sites/elderparty/pages/contact.tsx         — Contact page (client)
src/sites/elderparty/pages/privacy.tsx         — Privacy policy
src/sites/elderparty/pages/terms.tsx           — Terms of use
scripts/generate-elderparty-images.ts          — Image generation script
```

### Files to modify:

```
src/sites/registry.ts  — Add elderparty to siteRegistry
```

---

### Task 1: Bleed Component (Shared Zalgo Corruption)

**Files:**
- Create: `src/components/ui/bleed.tsx`

This is a dependency for many pages, so build it first.

- [ ] **Step 1: Create the Bleed component**

```tsx
// src/components/ui/bleed.tsx

// Zalgo combining character ranges
const COMBINING_ABOVE = [
  '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
  '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
  '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315',
]

const COMBINING_BELOW = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D',
  '\u031E', '\u031F', '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325',
  '\u0326', '\u0327', '\u0328', '\u0329', '\u032A', '\u032B', '\u032C', '\u032D',
]

const COMBINING_MIDDLE = [
  '\u0334', '\u0335', '\u0336', '\u0337', '\u0338',
]

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function zalgoify(text: string, intensity: 1 | 2 | 3 | 4): string {
  // Use text content as seed for deterministic output (SSR-safe)
  const seed = text.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0)
  const random = seededRandom(seed)

  return text.split('').map((char) => {
    if (char === ' ' || char === '\n') return char

    // Probability of corrupting this character scales with intensity
    const corruptChance = intensity * 0.25
    if (random() > corruptChance) return char

    let result = char
    const aboveCount = Math.floor(random() * intensity * 2)
    const belowCount = Math.floor(random() * intensity * 1.5)
    const middleCount = intensity >= 3 ? Math.floor(random() * 2) : 0

    for (let i = 0; i < aboveCount; i++) {
      result += COMBINING_ABOVE[Math.floor(random() * COMBINING_ABOVE.length)]
    }
    for (let i = 0; i < belowCount; i++) {
      result += COMBINING_BELOW[Math.floor(random() * COMBINING_BELOW.length)]
    }
    for (let i = 0; i < middleCount; i++) {
      result += COMBINING_MIDDLE[Math.floor(random() * COMBINING_MIDDLE.length)]
    }

    return result
  }).join('')
}

interface BleedProps {
  text: string
  intensity?: 1 | 2 | 3 | 4
  as?: 'span' | 'p' | 'div'
  className?: string
}

export function Bleed({ text, intensity = 1, as: Tag = 'span', className }: BleedProps) {
  return <Tag className={className}>{zalgoify(text, intensity)}</Tag>
}
```

- [ ] **Step 2: Verify the component builds**

Run: `npx tsc --noEmit`
Expected: No errors related to bleed.tsx

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/bleed.tsx
git commit -m "feat: add Bleed component for Zalgo text corruption"
```

---

### Task 2: Site Config and Data Files

**Files:**
- Create: `src/sites/elderparty/config.ts`
- Create: `src/sites/elderparty/data/platform.ts`
- Create: `src/sites/elderparty/data/coalitions.ts`
- Create: `src/sites/elderparty/data/news.ts`
- Create: `src/sites/elderparty/data/events.ts`
- Create: `src/sites/elderparty/data/leadership.ts`
- Create: `src/sites/elderparty/data/products.ts`
- Create: `src/sites/elderparty/data/volunteer.ts`
- Create: `src/sites/elderparty/data/donate.ts`

- [ ] **Step 1: Create config.ts**

```tsx
// src/sites/elderparty/config.ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "The Elder Party",
  subdomain: "elderparty",
  theme: {
    preset: "political",
    colors: {
      primary: "#c4a035",
      secondary: "#1a2340",
      accent: "#5c1a1a",
      background: "#0b0f1a",
      text: "#e0ddd4",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "The Elder Party — A Return to Older Values",
    description: "The Elder Party is committed to restoring what was always beneath. Leadership that has waited. A fresh start for America.",
  },
  megaMenu: {
    items: [
      {
        label: "Platform",
        path: "/platform",
      },
      {
        label: "Coalitions",
        path: "/coalitions",
      },
      {
        label: "News",
        path: "/news",
      },
      {
        label: "Events",
        path: "/events",
      },
      {
        label: "Get Involved",
        style: "dropdown",
        children: [
          { label: "Volunteer", path: "/volunteer", description: "The campaign needs you. It has always needed you." },
          { label: "Donate", path: "/donate", description: "Every dollar brings us closer to awakening." },
          { label: "Events", path: "/events", description: "Rallies, town halls, and awakenings near you." },
        ],
      },
      {
        label: "About",
        style: "dropdown",
        children: [
          { label: "About the Party", path: "/about", description: "Our history, our mission, our inevitable triumph." },
          { label: "Leadership", path: "/leadership", description: "Meet the officials guiding the awakening." },
          { label: "The Candidate", path: "/candidate", description: "Cthulhu R'lyeh — Founder & Party Leader." },
          { label: "Contact", path: "/contact", description: "We already know where you are, but formalities matter." },
        ],
      },
      {
        label: "Shop",
        path: "/shop",
      },
    ],
  },
  nav: [
    { label: "Platform", path: "/platform" },
    { label: "Coalitions", path: "/coalitions" },
    { label: "News", path: "/news" },
    { label: "Events", path: "/events" },
    { label: "Volunteer", path: "/volunteer" },
    { label: "Donate", path: "/donate" },
    { label: "About", path: "/about" },
    { label: "Shop", path: "/shop" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Create data/platform.ts**

```tsx
// src/sites/elderparty/data/platform.ts

export interface PolicyPosition {
  slug: string
  title: string
  slogan: string
  description: string[]
  talkingPoints: string[]
  coalitionEndorser: string
  image: string
}

export const positions: PolicyPosition[] = [
  {
    slug: "education",
    title: "Education",
    slogan: "Expanding Minds Beyond Euclidean Limits",
    description: [
      "The Elder Party believes that America's youth deserve an education unbounded by the narrow constraints of three-dimensional thinking. Our plan mandates Miskatonic University curriculum standards in all public schools, introducing students to truths that have been suppressed by the educational establishment for centuries.",
      "Students will study from the Necronomicon alongside their standard textbooks. Knowledge that cannot be unlearned is the strongest foundation for our youth. Early results from pilot programs in Arkham show remarkable expansion of student perception — teachers report that graduates 'see things differently now,' which is the whole point.",
    ],
    talkingPoints: [
      "Mandatory Miskatonic curriculum standards in all K-12 public schools",
      "Federal funding for Necronomicon literacy programs",
      "Student exchange programs with institutions in R'lyeh and the Dreamlands",
      "Teacher certification in non-Euclidean mathematics by 2030",
    ],
    coalitionEndorser: "Mothers Against Euclidean Geometry",
    image: "/sites/elderparty/platform-education.png",
  },
  {
    slug: "national-security",
    title: "National Security",
    slogan: "R'lyeh Rising: A Stronger America From Below",
    description: [
      "America's defense infrastructure is limited by its insistence on existing entirely above sea level. The Elder Party's R'lyeh Rising initiative will raise the sunken city as a forward military installation, providing strategic reach across every ocean and several planes of existence that the current administration refuses to acknowledge.",
      "American flags will fly from every spire. Our troops will patrol corridors that predate human civilization. No adversary can compete with a military base that exists partially outside of conventional spacetime. This is not science fiction — it is national security policy for a nation ready to think bigger. Much bigger.",
    ],
    talkingPoints: [
      "Raise R'lyeh as a forward military installation with full American sovereignty",
      "Expand the Navy to include non-Euclidean vessel classifications",
      "Establish dimensional border security protocols",
      "American flags on every spire, tentacle, and cyclopean wall",
    ],
    coalitionEndorser: "The Arkham Neighborhood Watch",
    image: "/sites/elderparty/platform-security.png",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    slogan: "The Deep Restoration Initiative",
    description: [
      "Citizens who sleep near the coast report remarkable healing. The Elder Party will expand coastal dormitory access for all Americans and fund peer-reviewed research into the restorative properties of prolonged submersion. Early participants describe feeling 'fundamentally changed' and 'closer to something vast.'",
      "Side effects are temporary and mostly cosmetic. Some patients report webbed extremities, improved night vision, and a persistent sense of being watched, all of which our medical advisors classify as 'enhancements.' The Deep Restoration Initiative will reduce healthcare costs by replacing expensive treatments with the ocean's ancient, free, and slightly unsettling healing power.",
    ],
    talkingPoints: [
      "Coastal dormitory facilities in every state with a shoreline",
      "Federal research grants for submersion therapy studies",
      "Free 'Deep Restoration' screenings at community health centers",
      "Reclassification of oceanic physiological changes as 'wellness upgrades'",
    ],
    coalitionEndorser: "Fishermen United for Innsmouth",
    image: "/sites/elderparty/platform-healthcare.png",
  },
  {
    slug: "economy",
    title: "Economy",
    slogan: "Deep Ones Job Creation Act",
    description: [
      "America's workforce is limited by its insistence on hiring exclusively from the surface. The Deep Ones Job Creation Act opens guest-worker visa programs for entities from beneath the waves, creating millions of jobs in underwater infrastructure, deep-sea mining, and interdimensional logistics.",
      "Coastal economic zones will become the engine of American prosperity. Deep One workers bring skills that no human workforce can match — they don't need oxygen, they work 24-hour shifts, and their construction techniques have remained structurally sound for millions of years. American workers will train alongside them, learning methods that human engineering won't independently discover for centuries.",
    ],
    talkingPoints: [
      "Deep One guest-worker visa program for underwater infrastructure",
      "Coastal economic zones with preferential tax treatment",
      "Interdimensional trade agreements opening new markets",
      "Job retraining programs for workers transitioning to aquatic industries",
    ],
    coalitionEndorser: "Fishermen United for Innsmouth",
    image: "/sites/elderparty/platform-economy.png",
  },
  {
    slug: "energy",
    title: "Energy",
    slogan: "Non-Euclidean Energy Independence",
    description: [
      "The angles between dimensions contain more energy than every fossil fuel reserve on Earth combined. The Elder Party's energy plan harnesses these angles through proprietary extraction technology developed at Miskatonic University's Applied Geometry Department. The energy is clean, infinite, and only mildly sanity-eroding for workers within a 50-foot radius of extraction points.",
      "America will achieve total energy independence within one election cycle. No more dependence on foreign oil, no more debates about solar vs. wind. Dimensional energy is always available, requires no sunlight or wind, and the extraction facilities can be built anywhere — though they do tend to attract unusual wildlife and cause compasses to behave unpredictably.",
    ],
    talkingPoints: [
      "Dimensional angle extraction facilities in all 50 states",
      "Total energy independence within 4 years",
      "Zero carbon emissions (dimensional energy predates carbon)",
      "Worker sanity protection standards exceeding OSHA requirements",
    ],
    coalitionEndorser: "The Esoteric Taxpayers Alliance",
    image: "/sites/elderparty/platform-energy.png",
  },
  {
    slug: "housing",
    title: "Housing",
    slogan: "Innsmouth Revitalization Initiative",
    description: [
      "Affordable housing doesn't have to be a dream. The Innsmouth Revitalization Initiative opens America's most undervalued coastal real estate to families willing to undergo modest physiological changes. Homes in revitalized Innsmouth districts cost 80% less than comparable waterfront properties, with the small trade-off of gradually developing gills.",
      "The physiological changes are gradual, reversible (probably), and come with significant advantages: reduced heating costs (lower body temperature), no need for swimming lessons, and a deep sense of community with neighbors who share your new outlook. HOA fees cover communal tide pool maintenance and monthly group swims.",
    ],
    talkingPoints: [
      "Affordable waterfront homes at 80% below market rate",
      "Physiological adaptation assistance programs (federally funded)",
      "Innsmouth community revitalization grants for 30 coastal cities",
      "Gill development classified as a pre-existing condition (protected)",
    ],
    coalitionEndorser: "Fishermen United for Innsmouth",
    image: "/sites/elderparty/platform-housing.png",
  },
  {
    slug: "foreign-policy",
    title: "Foreign Policy",
    slogan: "The Esoteric Order Accords",
    description: [
      "NATO was built for a world that only recognized three spatial dimensions. The Esoteric Order Accords replace outdated alliance structures with a network of cosmic pacts binding signatory nations in shared dread and mutual non-aggression across all known planes of existence.",
      "Under the Accords, member nations gain access to dimensional intelligence sharing, non-Euclidean military technology, and the comfort of knowing that something much larger than any nation-state is watching over them. Permanently. The Accords have already been ratified by several entities that predate the concept of nationhood.",
    ],
    talkingPoints: [
      "Replace NATO with the Esoteric Order Accords",
      "Dimensional intelligence sharing with allied entities",
      "Cosmic non-aggression pacts enforceable across all planes",
      "Diplomatic recognition of pre-human civilizations",
    ],
    coalitionEndorser: "The Illuminated Order",
    image: "/sites/elderparty/platform-foreign-policy.png",
  },
  {
    slug: "civil-rights",
    title: "Civil Rights",
    slogan: "The Shoggoth Personhood Amendment",
    description: [
      "The Elder Party believes that civil rights must extend to all sentient entities regardless of dimensional origin, physical composition, or number of mouths. The Shoggoth Personhood Amendment guarantees equal protection under the law for beings who have contributed to this planet's development for far longer than humanity has existed.",
      "Shoggoths built the cities. Deep Ones maintain the coasts. The Mi-Go have been managing Earth's mineral resources since before mammals. It is long past time these entities received the legal recognition they deserve. The Amendment also establishes anti-discrimination protections for citizens undergoing voluntary or involuntary transformation.",
    ],
    talkingPoints: [
      "Constitutional amendment granting personhood to all sentient entities",
      "Anti-discrimination protections for transforming citizens",
      "Voting rights for entities residing on American soil (or beneath it)",
      "Workplace accommodation standards for non-humanoid employees",
    ],
    coalitionEndorser: "Demonic Possession Party",
    image: "/sites/elderparty/platform-civil-rights.png",
  },
]

export function getPositionBySlug(slug: string): PolicyPosition | undefined {
  return positions.find((p) => p.slug === slug)
}
```

- [ ] **Step 3: Create data/coalitions.ts**

```tsx
// src/sites/elderparty/data/coalitions.ts

export interface Coalition {
  slug: string
  name: string
  tagline: string
  description: string[]
  endorsementStatement: string
  leaderQuote: { text: string; author: string; title: string }
  platformAlignments: string[]
  image: string
}

export const coalitions: Coalition[] = [
  {
    slug: "mineral-labor",
    name: "Children's Mineral Labor Coalition",
    tagline: "Idle hands are unproductive hands.",
    description: [
      "Founded in 1987, the Children's Mineral Labor Coalition has long advocated for youth enrichment through hands-on mineral extraction programs. The Coalition believes that salt mines provide an ideal learning environment where young Americans develop discipline, teamwork, and an appreciation for the earth's resources that no classroom can replicate.",
      "With chapters in 34 states and a youth membership exceeding 200,000, the CMLC is one of the fastest-growing grassroots organizations in American politics. Their annual 'Dig Deep' summer camp program has been praised by participants as 'character-building' and by their parents as 'surprisingly affordable, since the children produce the salt that funds the program.'",
    ],
    endorsementStatement: "The Elder Party understands that America's future lies beneath the surface — literally. Their Education and Economy platforms align perfectly with our mission to put young Americans to work where it matters: underground.",
    leaderQuote: {
      text: "A child who can swing a pickaxe is a child who can swing an election.",
      author: "Margaret Halloway",
      title: "CMLC National Chairwoman",
    },
    platformAlignments: ["education", "economy"],
    image: "/sites/elderparty/coalition-mineral-labor.png",
  },
  {
    slug: "possession-party",
    name: "Demonic Possession Party",
    tagline: "Possession is a civil right, not a medical condition.",
    description: [
      "The Demonic Possession Party has fought for decades to destigmatize possession as a natural and enriching human experience. With over 500,000 registered members — many of whom registered themselves, and several of whom were registered by the entities currently residing within them — the DPP represents one of America's most passionate political movements.",
      "The Party's platform is simple: possession should be covered by health insurance (as a wellness benefit, not a treatment), employers should provide reasonable accommodation for possessed workers, and the entities themselves deserve a voice in the democratic process. 'Two votes per body isn't double-counting,' argues DPP leadership. 'It's representation.'",
    ],
    endorsementStatement: "The Elder Party's Healthcare and Civil Rights platforms create the legal and medical framework our members have been demanding for decades. Cthulhu R'lyeh understands what it means to exist in multiple states of consciousness simultaneously.",
    leaderQuote: {
      text: "We speak with many voices because we contain many voices. That's not a disorder. That's democracy.",
      author: "The Collective Voice of David Chen",
      title: "DPP Spokesperson(s)",
    },
    platformAlignments: ["healthcare", "civil-rights"],
    image: "/sites/elderparty/coalition-possession-party.png",
  },
  {
    slug: "illuminated-order",
    name: "The Illuminated Order",
    tagline: "We've always run things. Now we'd like credit.",
    description: [
      "After centuries of operating behind the scenes, The Illuminated Order has decided that the time for secrecy has passed. 'We've been managing global affairs since before most nations existed,' explains the Order's public liaison. 'The results speak for themselves. We'd simply like the recognition we've earned, and perhaps a seat at the table we've been setting.'",
      "The Order brings unmatched organizational capability to the Elder Party coalition. Their network spans every continent, every major institution, and several that officially don't exist. Their endorsement comes with logistical support that campaign managers describe as 'impossibly efficient' and 'arriving before we asked for it.' The Order's transition to public life has been remarkably smooth, though several world leaders have declined to comment on why.",
    ],
    endorsementStatement: "The Elder Party represents the first political movement worthy of our public endorsement. We have watched from the shadows long enough. It is time to step into the light — and to bring with us the structures we have built in the dark.",
    leaderQuote: {
      text: "Transparency is simply the final stage of control.",
      author: "The Grand Architect",
      title: "The Illuminated Order, Office of Public Affairs",
    },
    platformAlignments: ["foreign-policy"],
    image: "/sites/elderparty/coalition-illuminated-order.png",
  },
  {
    slug: "fishermen-innsmouth",
    name: "Fishermen United for Innsmouth",
    tagline: "The catch of the day is a better tomorrow.",
    description: [
      "Fishermen United for Innsmouth represents the coastal workers who have lived and labored alongside the Deep Ones for generations. Members of the union — some of whom display the distinctive Innsmouth features that come with prolonged coastal residence — advocate for fair labor standards that recognize the unique contributions of both human and non-human workers.",
      "The union's collective bargaining agreements are considered groundbreaking: they cover gill maintenance leave, underwater shift differentials, and a pioneering 'transformation accommodation' clause that ensures members retain full benefits regardless of how many physiological changes they undergo during their employment. 'A worker is a worker,' says union leadership, 'whether they breathe air or water.'",
    ],
    endorsementStatement: "The Elder Party's Economy and Housing platforms directly address the needs of our members — both the ones who still look human and the ones who've moved past that. Cthulhu R'lyeh is the first candidate who truly understands waterfront communities.",
    leaderQuote: {
      text: "The tide comes in, the tide goes out. So do we. That's just how it works around here.",
      author: "Captain Obadiah Marsh IV",
      title: "FUI President & Harbor Master",
    },
    platformAlignments: ["economy", "housing"],
    image: "/sites/elderparty/coalition-fishermen-innsmouth.png",
  },
  {
    slug: "mothers-geometry",
    name: "Mothers Against Euclidean Geometry",
    tagline: "Our children deserve to see all the angles.",
    description: [
      "Mothers Against Euclidean Geometry began as a parent-teacher organization in Arkham, Massachusetts, where several mothers noticed that their children's mathematics textbooks contained exactly zero references to non-Euclidean spatial relationships. 'How are our kids supposed to navigate a non-linear universe with only three dimensions of education?' asked founding member Patricia Gilman at the group's first meeting.",
      "The organization has since grown to over 100,000 members nationwide. Their advocacy has led to pilot programs in 12 states where students learn to calculate angles that don't add up to 180 degrees, measure rooms that are larger on the inside than the outside, and draw shapes that hurt to look at. Test scores in conventional mathematics have dropped, but members argue this is because 'conventional mathematics is the problem.'",
    ],
    endorsementStatement: "The Elder Party's Education platform is the first that acknowledges what we've known for years: Euclidean geometry is a cage, and our children deserve to be freed from it.",
    leaderQuote: {
      text: "My daughter came home and drew a triangle with four sides. Her teacher said it was wrong. I said it was progress.",
      author: "Patricia Gilman",
      title: "MAEG Founder & President",
    },
    platformAlignments: ["education"],
    image: "/sites/elderparty/coalition-mothers-geometry.png",
  },
  {
    slug: "arkham-watch",
    name: "The Arkham Neighborhood Watch",
    tagline: "When the Old Ones watch your street, crime watches itself.",
    description: [
      "The Arkham Neighborhood Watch operates on a simple principle: the most effective deterrent to crime is the persistent, inescapable sense that something vast and unknowable is observing your every action. Since implementing their 'Elder Summoning' protocol in 2019, participating neighborhoods have reported a 100% reduction in crime. They have also reported a 340% increase in residents 'hearing things,' but the Watch considers this an acceptable trade-off.",
      "Volunteers patrol in pairs — one human, one... present. Block captains maintain summoning circles at key intersections, which double as traffic calming measures. The Watch's annual report notes that while property values in participating neighborhoods have dropped, 'the residents who remain are deeply, irrevocably committed to the community.'",
    ],
    endorsementStatement: "The Elder Party's National Security platform scales our proven community safety model to the national level. What works on Pickman Street can work for America.",
    leaderQuote: {
      text: "We haven't had a break-in since the sigils went up. We haven't had a lot of things since the sigils went up.",
      author: "Herbert Armitage",
      title: "ANW Block Captain, Arkham Ward 3",
    },
    platformAlignments: ["national-security"],
    image: "/sites/elderparty/coalition-arkham-watch.png",
  },
  {
    slug: "esoteric-taxpayers",
    name: "The Esoteric Taxpayers Alliance",
    tagline: "Your tax dollars should fund gateways, not potholes.",
    description: [
      "The Esoteric Taxpayers Alliance represents fiscal conservatives who believe that government spending should prioritize dimensional gateway infrastructure over conventional public works. 'Roads deteriorate. Bridges rust. A properly maintained dimensional gateway is eternal,' argues the Alliance. 'We're not asking for more spending. We're asking for smarter spending — in directions most taxpayers can't perceive.'",
      "The Alliance's proposed federal budget reallocates 40% of the Department of Transportation's funding to the proposed Department of Dimensional Transit. Members point out that a single gateway can replace thousands of miles of highway, reduce commute times to zero (or negative values), and connect communities across distances that Euclidean geometry considers impossible. The only downside, they concede, is that 'some travelers arrive slightly different than when they left.'",
    ],
    endorsementStatement: "The Elder Party is the first major party that treats dimensional infrastructure as the fiscal priority it is. Cthulhu R'lyeh's Energy and Economy platforms reflect the kind of forward-looking fiscal policy this country desperately needs.",
    leaderQuote: {
      text: "I pay my taxes. I just want them spent on infrastructure that transcends physical law. Is that too much to ask?",
      author: "Harold Prescott, CPA",
      title: "ETA Chairman & Certified Public Accountant",
    },
    platformAlignments: ["energy", "economy"],
    image: "/sites/elderparty/coalition-esoteric-taxpayers.png",
  },
]

export function getCoalitionBySlug(slug: string): Coalition | undefined {
  return coalitions.find((c) => c.slug === slug)
}
```

- [ ] **Step 4: Create data/news.ts**

```tsx
// src/sites/elderparty/data/news.ts

export interface NewsArticle {
  slug: string
  headline: string
  date: string
  author: string
  summary: string
  body: string[]
  images: { src: string; alt: string }[]
  hasBleed?: boolean
}

export const articles: NewsArticle[] = [
  {
    slug: "coastal-surge",
    headline: "Candidate R'lyeh Surges in Polls Across Coastal Districts",
    date: "2028-05-15",
    author: "Elder Party Press Office",
    summary: "Double-digit gains in every district within 50 miles of the ocean. Inland numbers 'will follow once the water rises.'",
    body: [
      "In what pollsters are calling 'unprecedented and frankly inexplicable,' Elder Party candidate Cthulhu R'lyeh has posted double-digit polling gains in every congressional district within 50 miles of the American coastline. The surge — which occurred simultaneously across the Atlantic, Pacific, and Gulf coasts — has left rival campaigns scrambling to understand a candidate whose platform they describe as 'difficult to read' and whose rallies they describe as 'difficult to leave.'",
      "Campaign Chairman Nyarlathotep Marsh attributed the gains to 'a message that resonates with Americans who feel a deep, persistent call that they can't quite explain.' Marsh noted that the campaign's coastal outreach strategy, which involves midnight beach gatherings and tidal voter registration drives, has proven 'remarkably effective at reaching voters where they are — which is increasingly near the water.'",
      "Inland numbers remain lower but are trending upward. 'The coast is always the beginning,' said Policy Director Dagon Whately in a press briefing. 'The interior will follow. It always does. The water rises for everyone.' When asked for a timeline, Whately smiled and said, 'Sooner than you think.'",
    ],
    images: [
      { src: "/sites/elderparty/news-coastal-surge.png", alt: "Campaign rally on a beach with American flags" },
      { src: "/sites/elderparty/news-coastal-surge-2.png", alt: "Electoral map showing coastal district gains" },
    ],
  },
  {
    slug: "arkham-endorsement",
    headline: "Mayor of Arkham Endorses Elder Party Ticket",
    date: "2028-05-22",
    author: "Elder Party Press Office",
    summary: "Historic endorsement. Mayor praises the party's 'willingness to confront realities other candidates won't even look at directly.'",
    body: [
      "Arkham Mayor Randolph Whitmore today announced his full endorsement of the Elder Party ticket in a ceremony at City Hall that attendees described as 'moving' and 'impossible to fully remember afterward.' Mayor Whitmore praised Cthulhu R'lyeh as 'the only candidate willing to confront the realities that other politicians won't even look at directly — in some cases because looking at them directly is medically inadvisable.'",
      "The endorsement comes with the full organizational support of Arkham's political machine, which includes the city's police force, the Miskatonic University faculty senate, and several neighborhood associations whose membership rosters include names that predate the city's founding. Campaign Chairman Marsh accepted the endorsement personally, shaking the mayor's hand for what witnesses described as 'slightly too long.'",
      "'Arkham has always been ahead of the curve,' Mayor Whitmore said. 'We've been living with these realities for generations. It's time the rest of America caught up.' When asked to clarify which realities he was referring to, the mayor paused, looked at something behind the reporter, and said, 'You'll find out.'",
    ],
    images: [
      { src: "/sites/elderparty/news-arkham-endorsement.png", alt: "Mayor at podium shaking hands with campaign official" },
    ],
  },
  {
    slug: "field-offices",
    headline: "Elder Party Opens 50-State Field Office Network",
    date: "2028-06-01",
    author: "Elder Party Press Office",
    summary: "Offices have appeared simultaneously in all 50 states. Local officials do not recall issuing permits.",
    body: [
      "The Elder Party announced today that it has established field offices in all 50 states, the District of Columbia, and three territories — a logistical feat that rival campaigns noted would typically take months of planning, lease negotiations, and permitting. The Elder Party accomplished it overnight.",
      "Local officials in several states reported that the offices 'appeared' rather than 'opened,' with fully furnished interiors, staffed reception desks, and campaign literature that appeared to have been printed some time ago, despite the party's recent founding. Building inspectors in Tulsa, Sacramento, and Bangor each independently noted that their respective offices 'were definitely not there yesterday' and that the permits on file were dated 1928.",
      "Volunteer Coordinator Hastur Olmstead described the rollout as 'right on schedule.' When asked whose schedule, Olmstead replied, 'There has only ever been one schedule.' The offices are open seven days a week, with hours listed as 'sundown to sundown' — a 24-hour cycle that Olmstead clarified 'is not a typo.'",
    ],
    images: [
      { src: "/sites/elderparty/news-field-offices.png", alt: "Storefront campaign office with Elder Party signage and American flags" },
    ],
  },
  {
    slug: "miskatonic-keynote",
    headline: "Campaign Chairman Marsh Delivers Keynote at Miskatonic Homecoming",
    date: "2028-06-10",
    author: "Elder Party Press Office",
    summary: "Standing ovation. Three attendees reportedly 'ascended.' Keynote transcript available in R'lyehian only.",
    body: [
      "Campaign Chairman Nyarlathotep Marsh delivered the keynote address at Miskatonic University's 2028 Homecoming celebration to a capacity crowd of 4,000 in the Armitage Memorial Auditorium. The speech, which lasted 47 minutes by clock time though several attendees insist it was 'much longer,' received a standing ovation that eyewitnesses describe as 'beginning before the speech ended.'",
      "The university's communications office reports that three attendees 'ascended' during the address — a term the office declined to define further, saying only that 'they are no longer in the auditorium and are believed to be well.' The remaining 3,997 attendees exited the venue 'visibly moved and slightly disoriented,' which the university's event coordinator noted was 'actually a pretty standard outcome for Miskatonic events.'",
      "The full transcript of the keynote is available on the Elder Party website in R'lyehian only. When asked about an English translation, Chairman Marsh said, 'English lacks the dimensional vocabulary to convey the speech accurately. We tried. The translator is resting now.'",
    ],
    images: [
      { src: "/sites/elderparty/news-miskatonic-keynote.png", alt: "Speaker at university auditorium podium with rapt audience" },
    ],
  },
  {
    slug: "fundraising-record",
    headline: "Record Fundraising Quarter: $66.6 Million Raised",
    date: "2028-06-30",
    author: "Elder Party Press Office",
    summary: "Small-dollar donations from 'millions of Americans who hear the call.' Average donation: $13.13.",
    body: [
      "The Elder Party today announced a record-breaking fundraising quarter, reporting $66.6 million in contributions from what the campaign describes as 'millions of Americans who hear the call.' The figure represents the largest single-quarter haul by any third party in American history, surpassing the previous record by a margin the FEC called 'statistically improbable.'",
      "The average donation was $13.13, with the campaign noting that this figure 'emerged organically' and was 'not a suggested amount.' A significant number of donors reported making their contributions between 3:00 and 4:00 AM, which the campaign attributes to 'the enthusiasm of supporters who can't sleep — or who sleep differently than they used to.'",
      "When asked about the campaign's fundraising strategy, Campaign Chairman Marsh said simply: 'We ask. They give. The connection is natural and, for many, irresistible.' He added that the campaign expects the next quarter to be 'significantly larger,' though he declined to explain how he could be certain.",
    ],
    images: [
      { src: "/sites/elderparty/news-fundraising.png", alt: "Campaign staffers celebrating around a donation thermometer" },
    ],
  },
  {
    slug: "arkham-watch-endorsement",
    headline: "Elder Party Platform Endorsed by Arkham Neighborhood Watch",
    date: "2028-07-05",
    author: "Elder Party Press Office",
    summary: "Community safety coalition throws full support behind National Security plank. Neighborhood crime down 100%.",
    body: [
      "The Arkham Neighborhood Watch today formally endorsed the Elder Party's National Security platform, citing its alignment with the Watch's proven 'Elder Summoning' community safety methodology. In a press conference at the Arkham Community Center, Watch representatives presented data showing a 100% reduction in crime in neighborhoods where summoning circles have been installed.",
      "Block Captain Herbert Armitage noted that the Watch's approach has 'completely eliminated traditional criminal activity' in participating areas. 'We haven't had a single reported burglary, assault, or traffic violation since the sigils went up,' Armitage said. When asked about the 340% increase in reports of 'unexplained phenomena,' Armitage responded, 'Those aren't crimes. Those are features.'",
      "The endorsement brings with it the Watch's volunteer network of over 2,000 block captains, each of whom maintains at least one summoning circle and has completed the Watch's 40-hour 'Community Warding' certification program.",
    ],
    images: [
      { src: "/sites/elderparty/news-arkham-watch-endorsement.png", alt: "Neighborhood watch members at press conference" },
    ],
  },
  {
    slug: "volunteer-surge",
    headline: "Volunteer Drive Exceeds All Projections",
    date: "2028-07-18",
    author: "Elder Party Press Office",
    summary: "200,000 new volunteers in a single weekend. Many report signing up 'in a dream' but confirm their commitment.",
    body: [
      "The Elder Party's summer volunteer drive has exceeded all projections, with 200,000 new volunteers registering in a single weekend. The campaign reports that sign-ups occurred at all hours, with a notable concentration between midnight and 4:00 AM. Field Director Hastur Olmstead called the numbers 'exactly what we expected' — a statement that startled campaign observers, since the internal target had been 50,000.",
      "A survey of new volunteers revealed that approximately 40% report having signed up 'in a dream' or 'during a state they can't fully describe.' All of these volunteers, when contacted to confirm their registration, affirmed their commitment with what interviewers described as 'unusual conviction.' One volunteer, reached at 3:00 AM, said: 'I don't remember filling out the form, but I know this is what I'm supposed to be doing. I've never been more certain of anything.'",
      "The campaign has deployed the new volunteers immediately, with canvassing operations launching in 200 new precincts. Door-to-door volunteers report high engagement rates, with one team noting that 'people seem to be expecting us, even the ones who say they've never heard of the party.'",
    ],
    images: [
      { src: "/sites/elderparty/news-volunteer-surge.png", alt: "Massive volunteer rally with campaign signs and American flags" },
      { src: "/sites/elderparty/news-volunteer-surge-2.png", alt: "Volunteers at folding tables in a suburban neighborhood" },
    ],
  },
  {
    slug: "why-i-switched",
    headline: "Op-Ed: \"Why I Left My Party for the Elder Party\"",
    date: "2028-08-01",
    author: "A Concerned Citizen (name withheld at their request, and at the request of something else)",
    summary: "A former swing voter explains their conversion. 'Once you've seen what they're offering, nothing else makes sense.'",
    body: [
      "I've voted in every election since I was 18. Democrat twice, Republican once, Libertarian when I was going through something. I've always considered myself a pragmatist — someone who weighs the issues, studies the candidates, and makes a rational choice. This year, I'm voting Elder Party, and rationality has nothing to do with it.",
      "It started with a rally. I went out of curiosity — a friend mentioned it, or maybe I dreamed it, the sequence of events is unclear now. The candidate spoke, and I understood. Not the words, exactly. The words were in a language I don't speak and that I'm not sure exists in the way languages usually exist. But I understood the meaning beneath the words, the way you understand that the ocean is deep without needing to measure it.",
      "The platform makes sense in a way that other platforms don't. Not logical sense. Something older than logic. When I read about the Deep Restoration Initiative, I didn't think 'that's good policy.' I thought 'yes.' When I read about the Esoteric Order Accords, I didn't analyze the diplomatic implications. I just knew it was correct. The way you know which direction is down.",
      "My family is concerned. My coworkers have noticed changes. I've started sleeping facing the east wall, which is also the direction of the nearest coastline, and I don't remember deciding to do this. I attend meetings now, in basements and on beaches, and the people there are like me — normal Americans who heard something they can't unhear and saw something they can't unsee.",
      "If you're reading this and thinking I sound unwell, I understand. I would have thought the same thing six months ago. But six months ago I hadn't heard the call. You will. Everyone does, eventually. The Elder Party isn't a choice. It's a recognition of something that was always there, waiting beneath the surface of everything you thought you knew.",
      "Vote Elder. Vote Ancient. Vote Eternal.",
    ],
    images: [
      { src: "/sites/elderparty/news-why-i-switched.png", alt: "Person sitting at a kitchen table writing" },
      { src: "/sites/elderparty/news-why-i-switched-2.png", alt: "Same person at a rally with a transformed expression" },
    ],
    hasBleed: true,
  },
]

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug)
}
```

- [ ] **Step 5: Create data/events.ts**

```tsx
// src/sites/elderparty/data/events.ts

export interface CampaignEvent {
  slug: string
  name: string
  location: string
  date: string
  description: string
  image: string
}

export const events: CampaignEvent[] = [
  {
    slug: "miskatonic-rally",
    name: "Midnight Rally at Miskatonic University",
    location: "Arkham, MA",
    date: "June 13, 2028",
    description: "Keynote by Cthulhu R'lyeh. Gates open at sundown. Bring candles. Free yard signs for the first 500 attendees. Parking available in the Orne Library lot — do not park in the restricted lot behind the chemistry building, regardless of what the attendant tells you.",
    image: "/sites/elderparty/event-miskatonic-rally.png",
  },
  {
    slug: "town-hall-waves",
    name: "Town Hall Beneath the Waves",
    location: "Innsmouth, MA",
    date: "June 21, 2028",
    description: "Underwater town hall. Breathing apparatus provided or unnecessary, depending. Policy Director Dagon Whately will present the Deep Ones Job Creation Act. Refreshments served topside afterward for those who resurface.",
    image: "/sites/elderparty/event-town-hall-waves.png",
  },
  {
    slug: "portland-fourth",
    name: "Coastal Awakening Tour — Portland Stop",
    location: "Portland, ME",
    date: "July 4, 2028",
    description: "Independence Day celebration. Fireworks visible from several planes of existence. American flags on every tentacle. Live music, food trucks, and a midnight address by the candidate. Children welcome. Pets discouraged (they sense things).",
    image: "/sites/elderparty/event-portland-fourth.png",
  },
  {
    slug: "great-lakes-picnic",
    name: "Great Lakes Summoning Picnic",
    location: "Sandusky, OH",
    date: "July 18, 2028",
    description: "Family-friendly. Potato salad, three-legged races, minor incantations. The Elder Party believes in community, and what better way to build community than a lakeside gathering where the whole family can participate in democracy and light ritualism?",
    image: "/sites/elderparty/event-great-lakes-picnic.png",
  },
  {
    slug: "heartland-revival",
    name: "Heartland Revival & Voter Registration",
    location: "Des Moines, IA",
    date: "August 1, 2028",
    description: "Swing-state outreach. Free yard signs. Corn maze leads somewhere new this year. Volunteer Coordinator Hastur Olmstead will personally oversee voter registration. If you've already registered but can't remember doing so, that's normal.",
    image: "/sites/elderparty/event-heartland-revival.png",
  },
  {
    slug: "southern-bbq",
    name: "Southern Awakening BBQ",
    location: "Savannah, GA",
    date: "August 15, 2028",
    description: "Low country boil. The Elder Party's southern hospitality initiative. Come hungry. Spanish moss, string lights, live bluegrass, and a keynote by Campaign Chairman Marsh. The menu features locally sourced ingredients and one dish that 'tastes like the ocean remembering something.'",
    image: "/sites/elderparty/event-southern-bbq.png",
  },
  {
    slug: "desert-stars",
    name: "Desert Stars Convergence",
    location: "Roswell, NM",
    date: "September 3, 2028",
    description: "Joint event with The Illuminated Order. 'They came from the stars. So did we.' Stargazing, panel discussions on cosmic governance, and a rare joint appearance by party leadership and Order representatives. Telescopes provided. What you see through them is your responsibility.",
    image: "/sites/elderparty/event-desert-stars.png",
  },
  {
    slug: "grand-rally-dc",
    name: "The Grand Rally — Election Eve",
    location: "Washington, D.C.",
    date: "November 4, 2028",
    description: "The National Mall. Every volunteer, every donor, every convert. The Awakening begins. This is the culmination of everything the Elder Party has worked toward — a gathering of historic scale on the eve of the election. The candidate will speak. The sky will listen.",
    image: "/sites/elderparty/event-grand-rally-dc.png",
  },
]
```

- [ ] **Step 6: Create data/leadership.ts**

```tsx
// src/sites/elderparty/data/leadership.ts

export interface PartyOfficial {
  slug: string
  name: string
  title: string
  bio: string
  highlights: { label: string; value: string }[]
  quote: string
  image: string
  referencePerson: string
}

export const officials: PartyOfficial[] = [
  {
    slug: "cthulhu-rlyeh",
    name: "Cthulhu R'lyeh",
    title: "Founder & Party Leader",
    bio: "Has waited millennia to serve this great nation. Emerged from the Pacific with a vision for America's future that transcends the petty squabbles of mortal politics. Previous experience includes dreaming beneath the waves for eons, inspiring civilizations, and maintaining a consistent approval rating among coastal populations. Believes that true leadership means being willing to wait — and that the wait is over.",
    highlights: [
      { label: "Years of experience", value: "Immeasurable" },
      { label: "Previous office held", value: "Sovereign of R'lyeh (current)" },
      { label: "Campaign slogan", value: "A Return to Older Values" },
      { label: "Key policy", value: "R'lyeh Rising Initiative" },
      { label: "Favorite American tradition", value: "The peaceful transfer of power (finally, to us)" },
    ],
    quote: "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn. In his house at R'lyeh, dead Cthulhu waits dreaming. But not for much longer.",
    image: "/sites/elderparty/team-bill.png",
    referencePerson: "bill",
  },
  {
    slug: "nyarlathotep-marsh",
    name: "Nyarlathotep Marsh",
    title: "Campaign Chairman",
    bio: "A thousand faces, one message. Has run campaigns across dimensions and always delivers results. Voters describe him as 'impossible to forget,' which his team considers the highest compliment in politics. Joined the Elder Party at its founding — or possibly before its founding, depending on which timeline you reference. His smile has been described as 'photogenic' and 'containing too many teeth,' both of which he takes as compliments.",
    highlights: [
      { label: "Campaigns managed", value: "Countless (literally)" },
      { label: "Win rate", value: "100% across all dimensions" },
      { label: "Faces", value: "A thousand (minimum)" },
      { label: "Key strength", value: "Voter persuasion" },
      { label: "Notable achievement", value: "50-state field office rollout (overnight)" },
    ],
    quote: "I don't convince voters. I remind them of what they already know. Deep down, everyone knows.",
    image: "/sites/elderparty/team-brandon.png",
    referencePerson: "brandon",
  },
  {
    slug: "dagon-whately",
    name: "Dagon Whately",
    title: "Policy Director",
    bio: "Third-generation Innsmouth resident. Georgetown Law (class of 1847). Authored the Deep Ones Job Creation Act and the Shoggoth Personhood Amendment. Breathes underwater, which he insists is not relevant to his qualifications but which has proven useful during coastal campaign events. His policy briefings are described as 'thorough, well-sourced, and occasionally damp.'",
    highlights: [
      { label: "Education", value: "Georgetown Law, Class of 1847" },
      { label: "Legislation authored", value: "Deep Ones Job Creation Act, Shoggoth Personhood Amendment" },
      { label: "Specialty", value: "Interdimensional regulatory compliance" },
      { label: "Breathing medium", value: "Air and water (versatile)" },
      { label: "Policy papers published", value: "47 (12 in languages that don't have names yet)" },
    ],
    quote: "Good policy is good policy, whether you're reading it above or below the waterline.",
    image: "/sites/elderparty/team-jim.png",
    referencePerson: "jim",
  },
  {
    slug: "hastur-olmstead",
    name: "Hastur Olmstead",
    title: "Volunteer Coordinator & Field Director",
    bio: "Wherever two or more gather to canvass, he is there. Organizes rallies that attendees describe as 'life-changing' and 'impossible to leave.' His volunteer recruitment numbers consistently exceed projections by 300%, which he attributes to 'a personal connection with every volunteer' — a claim that is technically true, though the nature of that connection remains difficult to articulate. Do not ask about the Yellow Sign.",
    highlights: [
      { label: "Volunteers recruited", value: "200,000+ (and counting)" },
      { label: "Rally attendance record", value: "Every seat filled, every time" },
      { label: "Field offices opened", value: "All of them" },
      { label: "Volunteer retention rate", value: "100% (they don't leave)" },
      { label: "The Yellow Sign", value: "Do not ask" },
    ],
    quote: "Volunteering isn't something you do. It's something you become. The campaign doesn't need your time — it needs you.",
    image: "/sites/elderparty/team-sean.png",
    referencePerson: "sean",
  },
]

export function getOfficialBySlug(slug: string): PartyOfficial | undefined {
  return officials.find((o) => o.slug === slug)
}
```

- [ ] **Step 7: Create data/products.ts**

```tsx
// src/sites/elderparty/data/products.ts

export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  category: "apparel" | "accessories" | "print" | "bundles"
}

export const products: Product[] = [
  {
    slug: "yard-sign",
    name: '"R\'lyeh Rising" Yard Sign',
    price: 13.00,
    priceLabel: "$13.00",
    tagline: "Compliant with most HOA bylaws in most dimensions.",
    description: [
      "Standard corrugated campaign yard sign with tentacle motif border and the Elder Party's signature gold-on-navy color scheme. Features the campaign slogan 'A Return to Older Values' and the party seal.",
      "Weather resistant, UV protected, and rated for winds up to 60 mph. Also rated for 'unusual atmospheric conditions,' which our manufacturing team added to the spec sheet without further explanation.",
    ],
    image: "/sites/elderparty/product-yard-sign.png",
    category: "accessories",
  },
  {
    slug: "campaign-hat",
    name: '"Cthulhu R\'lyeh 2028" Hat',
    price: 31.00,
    priceLabel: "$31.00",
    tagline: "One size fits most cranial configurations.",
    description: [
      "Red trucker cap with embroidered tentacle-flag logo. The classic American campaign hat, reimagined for a candidate who transcends conventional politics and, some argue, conventional physics.",
      "Adjustable snapback fits most cranial configurations. Some customers report that the hat 'fits better over time,' which we attribute to the break-in period and not to any changes in head shape.",
    ],
    image: "/sites/elderparty/product-hat.png",
    category: "apparel",
  },
  {
    slug: "lapel-pin",
    name: "Elder Party Lapel Pin",
    price: 6.66,
    priceLabel: "$6.66",
    tagline: "May feel warm to the touch.",
    description: [
      "Gold tentacle wrapped around an American star. Formal campaign wear for the politically engaged citizen who wants to signal their allegiance with understated elegance.",
      "Die-cast zinc alloy with 18K gold plating. Butterfly clutch backing. Several customers have noted that the pin is warm to the touch even in cold weather. We have not investigated this.",
    ],
    image: "/sites/elderparty/product-lapel-pin.png",
    category: "accessories",
  },
  {
    slug: "bumper-sticker",
    name: '"I Voted Elder" Bumper Sticker',
    price: 4.00,
    priceLabel: "$4.00",
    tagline: "Weather resistant. Void resistant.",
    description: [
      "Patriotic red, white, and blue with a subtle tentacle watermark visible only at certain angles — or in certain states of mind. Premium vinyl, rated for 5 years of outdoor exposure.",
      "Adhesive is permanent. This is a feature, not a limitation. Your commitment to the Elder Party should be equally permanent.",
    ],
    image: "/sites/elderparty/product-bumper-sticker.png",
    category: "accessories",
  },
  {
    slug: "canvassing-tote",
    name: "Cultist Canvassing Tote",
    price: 22.00,
    priceLabel: "$22.00",
    tagline: "Holds pamphlets, yard signs, and offerings.",
    description: [
      "Sturdy 12oz canvas tote bag with 'Ask Me About The Elder Party' printed in gold. Reinforced handles support up to 30 lbs of campaign literature, voter registration forms, and whatever else you need to carry door-to-door.",
      "Interior pocket for your phone, keys, and a small copy of the Necronomicon (pocket edition sold separately). Machine washable, though the symbols on the bottom of the bag may become more legible after washing.",
    ],
    image: "/sites/elderparty/product-tote.png",
    category: "accessories",
  },
  {
    slug: "campaign-robe",
    name: "Official Campaign Robe",
    price: 66.00,
    priceLabel: "$66.00",
    tagline: "Required attire for rallies. Machine washable.",
    description: [
      "Hooded ceremonial robe in midnight navy with gold Elder Party seal embroidered on the chest. Full-length, with deep pockets and a lined hood. The campaign's official recommendation for rally attendance, canvassing in inclement weather, and 'other party activities.'",
      "Machine washable on cold. Do not dry clean — the symbols react poorly to chemical solvents. Do not iron the seal directly. Several customers have reported that the robe 'feels like it was always theirs,' which we consider excellent product-market fit.",
    ],
    image: "/sites/elderparty/product-robe.png",
    category: "apparel",
  },
  {
    slug: "pocket-constitution",
    name: "The Necronomicon Pocket Constitution",
    price: 8.00,
    priceLabel: "$8.00",
    tagline: "Some pages appear blank until moonlight.",
    description: [
      "Every patriot carries a pocket Constitution. Ours has additional amendments. Leather-bound, gilt-edged, and containing the full text of the United States Constitution alongside supplementary articles that the Elder Party considers 'overdue additions to the national charter.'",
      "Printed on acid-free paper that is, according to our printer, 'behaving unusually.' Some pages appear blank under artificial light but become legible in moonlight. This is a design choice and not a manufacturing defect.",
    ],
    image: "/sites/elderparty/product-constitution.png",
    category: "print",
  },
  {
    slug: "coffee-mug",
    name: '"Ph\'nglui Mglw\'nafh" Coffee Mug',
    price: 16.00,
    priceLabel: "$16.00",
    tagline: "Dishwasher safe. Sanity not guaranteed.",
    description: [
      "Start your morning right by reciting the pledge. Full R'lyehian text on one side, English 'translation' on the other. 12oz ceramic, microwave and dishwasher safe.",
      "The English side reads: 'In his house at R'lyeh, dead Cthulhu waits dreaming.' The R'lyehian side reads the same thing, but saying it aloud reportedly 'makes the coffee taste different.' We have not verified this claim, but we have not denied it either.",
    ],
    image: "/sites/elderparty/product-mug.png",
    category: "accessories",
  },
  {
    slug: "party-flag",
    name: "Elder Party Flag (3x5)",
    price: 40.00,
    priceLabel: "$40.00",
    tagline: "Flies well in coastal winds and dimensional crosscurrents.",
    description: [
      "3x5 foot flag with the Elder Party seal on a navy field, bordered by American flag-inspired stripes in gold and crimson. Brass grommets, double-stitched edges, and fade-resistant dye.",
      "Flies well in coastal winds and what our testing team described as 'winds from directions that don't correspond to compass points.' Recommended for porches, flagpoles, and any location where you want your neighbors to know where you stand — and where you'll stand when the time comes.",
    ],
    image: "/sites/elderparty/product-flag.png",
    category: "accessories",
  },
  {
    slug: "founders-bundle",
    name: "Founding Donors Bundle",
    price: 166.00,
    priceLabel: "$166.00",
    tagline: "Note may arrive before you order.",
    description: [
      "The complete Elder Party supporter package: campaign hat, official robe, lapel pin, party flag, pocket constitution, and a handwritten thank-you note from Campaign Chairman Nyarlathotep Marsh.",
      "The thank-you note is personalized with your name and a brief message that several recipients have described as 'disturbingly specific about details I haven't shared with anyone.' Chairman Marsh attributes this to 'thorough donor research.' The note may arrive before your order — this is not a shipping error.",
    ],
    image: "/sites/elderparty/product-founders-bundle.png",
    category: "bundles",
  },
]

export const quips = [
  "The call has been heard.",
  "Welcome to the awakening.",
  "Your commitment has been noted. Permanently.",
  "The campaign thanks you. It has always thanked you.",
  "Added to cart. Added to the roster.",
  "Bold choice. The right choice. The only choice.",
  "Your order will arrive exactly when it's supposed to.",
  "The Party remembers its supporters.",
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const filtered = products.filter((p) => p.slug !== slug)
  const index = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const start = index % filtered.length
  const result: Product[] = []
  for (let i = 0; i < count && i < filtered.length; i++) {
    result.push(filtered[(start + i) % filtered.length])
  }
  return result
}
```

- [ ] **Step 8: Create data/volunteer.ts**

```tsx
// src/sites/elderparty/data/volunteer.ts

export interface VolunteerActivity {
  slug: string
  title: string
  description: string
  details: string
  image: string
}

export const activities: VolunteerActivity[] = [
  {
    slug: "canvass",
    title: "Canvass Your Neighborhood",
    description: "Knock three times. If no one answers, leave a pamphlet. If something answers, proceed with the script.",
    details: "Door-to-door outreach is the backbone of any campaign. The Elder Party provides canvassing kits with pamphlets, talking points, and a script that has been 'optimized for persuasion by experts whose methods we do not question.' Canvassers report high engagement rates and a conversion ratio that defies statistical modeling.",
    image: "/sites/elderparty/volunteer-canvass.png",
  },
  {
    slug: "watch-party",
    title: "Host a Watch Party",
    description: "Debate watch parties and 'study groups.' Suggested reading list includes the Necronomicon.",
    details: "Gather friends, family, and neighbors to watch debates, campaign events, and 'other broadcasts' that air on frequencies most televisions don't receive. The campaign provides a host kit with talking points, snack suggestions, and a curated reading list. The Necronomicon is optional but recommended for advanced study groups.",
    image: "/sites/elderparty/volunteer-watch-party.png",
  },
  {
    slug: "phone-bank",
    title: "Phone Bank",
    description: "Call your neighbors. If the line sounds like the ocean, you've reached the right number.",
    details: "Phone banking is critical in swing states and swing dimensions. The campaign provides call lists, scripts, and a dedicated phone banking platform. Shifts are available around the clock — the 2-4 AM shifts are the most productive, according to data that our analytics team describes as 'consistent but difficult to explain.'",
    image: "/sites/elderparty/volunteer-phone-bank.png",
  },
  {
    slug: "register-voters",
    title: "Register Voters",
    description: "All sentient entities are eligible. Sapience is preferred but not required.",
    details: "Voter registration is the foundation of democracy. The Elder Party's registration drive operates in parks, campuses, community centers, and 'other gathering points.' Registrars are trained to process standard voter registration forms and a supplementary form for 'non-traditional registrants' that the party has submitted to the FEC for review.",
    image: "/sites/elderparty/volunteer-register.png",
  },
  {
    slug: "campus-organizing",
    title: "Campus Organizing",
    description: "Miskatonic University chapter leads the way. Advisors are standing by. Some of them are standing behind you.",
    details: "Start an Elder Party chapter at your college or university. The Miskatonic University chapter — the party's flagship campus organization — provides a template for chapter formation, event planning, and 'recruitment activities that have proven effective in academic settings.' Faculty advisors are available, though they may contact you before you contact them.",
    image: "/sites/elderparty/volunteer-campus.png",
  },
  {
    slug: "precinct-captain",
    title: "Become a Precinct Captain",
    description: "Precinct Captains report directly to Field Director Olmstead. Weekly check-ins occur whether you initiate them or not.",
    details: "For the most committed volunteers, the Precinct Captain role offers direct involvement in campaign operations. Captains coordinate canvassing, manage local volunteer teams, and maintain their precinct's summoning circle (training provided). Weekly check-ins with Field Director Hastur Olmstead are mandatory — though several captains report that the check-ins 'happen regardless of whether you pick up the phone.'",
    image: "/sites/elderparty/volunteer-precinct-captain.png",
  },
]
```

- [ ] **Step 9: Create data/donate.ts**

```tsx
// src/sites/elderparty/data/donate.ts

export interface DonationTier {
  slug: string
  name: string
  amount: string
  reward: string
  tone: string
}

export const tiers: DonationTier[] = [
  {
    slug: "supporter",
    name: "Supporter",
    amount: "$13",
    reward: "Digital 'I Stand With The Elder Party' badge",
    tone: "Entry level, earnest",
  },
  {
    slug: "patriot",
    name: "Patriot",
    amount: "$31",
    reward: "Bumper sticker mailed to your address (which we already know)",
    tone: "Slightly unsettling",
  },
  {
    slug: "devoted",
    name: "Devoted",
    amount: "$66",
    reward: "Signed letter from Campaign Chairman Marsh. Signature appears wet.",
    tone: "Escalating",
  },
  {
    slug: "awakened",
    name: "Awakened",
    amount: "$166",
    reward: "Name inscribed in the Book of Donors. The Book remembers.",
    tone: "Ominous",
  },
  {
    slug: "ascended",
    name: "Ascended",
    amount: "$666",
    reward: "Private audience with Party Leadership. Location revealed in a dream.",
    tone: "Full horror",
  },
]
```

- [ ] **Step 10: Verify all data files compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 11: Commit**

```bash
git add src/sites/elderparty/config.ts src/sites/elderparty/data/
git commit -m "feat: add Elder Party config and all data files"
```

---

### Task 3: Core Pages — Home, Platform, About, Candidate, Leadership

**Files:**
- Create: `src/sites/elderparty/pages/home.tsx`
- Create: `src/sites/elderparty/pages/platform.tsx`
- Create: `src/sites/elderparty/pages/about.tsx`
- Create: `src/sites/elderparty/pages/candidate.tsx`
- Create: `src/sites/elderparty/pages/leadership.tsx`

These are all server components — no `"use client"` directive.

- [ ] **Step 1: Create pages/home.tsx**

Build the homepage with: hero (candidate + American flag imagery), featured platform positions, coalition endorsement highlights, featured news, events preview, donate CTA, and campaign disclaimer with Bleed.

Use shared components: `Hero`, `FeatureSection`, `CTABanner`, `TestimonialGrid`. Import data from the data files. Reference images from `/sites/elderparty/`.

The homepage is the campaign's front door — dignified, patriotic, with minimal Bleed (one instance max, in the footer disclaimer).

- [ ] **Step 2: Create pages/platform.tsx**

Display all 8 policy positions as cards with image, title, slogan, and first paragraph. Each links to an anchor or expandable section. Include coalition endorser pull-quotes. Add donate CTA at bottom.

Import `positions` from `data/platform.ts`. Use `Image` from `next/image` for platform images.

- [ ] **Step 3: Create pages/about.tsx**

Party history page. Hero image of party headquarters. Founding story (the Elder Party emerged when America needed it most — which is to say, it emerged when it was ready, and America's readiness was irrelevant). Mission statement. Values section. Link to Leadership and Candidate pages.

- [ ] **Step 4: Create pages/candidate.tsx**

Dedicated Cthulhu R'lyeh bio page. Hero image (candidate at podium). Extended bio, "Vision for America" section, key policy highlights, patriotic imagery throughout. Import candidate data from `officials[0]` in `data/leadership.ts`.

- [ ] **Step 5: Create pages/leadership.tsx**

Grid of 4 party officials using the `ExecutiveCard` shared component (same pattern as strategicvoid). Import `officials` from `data/leadership.ts`. CTA to volunteer/donate at bottom.

- [ ] **Step 6: Verify build**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 7: Commit**

```bash
git add src/sites/elderparty/pages/home.tsx src/sites/elderparty/pages/platform.tsx src/sites/elderparty/pages/about.tsx src/sites/elderparty/pages/candidate.tsx src/sites/elderparty/pages/leadership.tsx
git commit -m "feat: add Elder Party core pages — home, platform, about, candidate, leadership"
```

---

### Task 4: Dynamic Route Pages — Coalitions, News, Shop

**Files:**
- Create: `src/sites/elderparty/pages/coalitions.tsx`
- Create: `src/sites/elderparty/pages/coalition-detail.tsx`
- Create: `src/sites/elderparty/pages/news.tsx`
- Create: `src/sites/elderparty/pages/news-detail.tsx`
- Create: `src/sites/elderparty/pages/shop.tsx`
- Create: `src/sites/elderparty/pages/product-detail.tsx`

- [ ] **Step 1: Create pages/coalitions.tsx**

Index page showing all 7 coalitions as cards with image, name, tagline, and link to detail page. Use `getSiteHref` for server-side link generation. Hero image.

- [ ] **Step 2: Create pages/coalition-detail.tsx**

Dynamic detail page (receives `slug` prop). Looks up coalition via `getCoalitionBySlug()`. Displays: coalition name, image, full description, leader quote, endorsement statement, "Why We Stand With The Elder Party" section linking to aligned platform positions. Include 1-2 Bleed instances on detail pages. The Illuminated Order page should have progressively more honest copy.

- [ ] **Step 3: Create pages/news.tsx**

News index page. Cards with headline, date, summary, first image. Links to article detail pages. Sorted by date (most recent first). Hero image.

- [ ] **Step 4: Create pages/news-detail.tsx**

Dynamic article detail page (receives `slug` prop). Looks up article via `getArticleBySlug()`. Displays: headline, date, author, body paragraphs, images interspersed. For articles with `hasBleed: true`, apply Bleed component to the final 1-2 paragraphs with escalating intensity.

- [ ] **Step 5: Create pages/shop.tsx**

Merch index page showing all 10 products as `ProductCard` components. Hero image. Category filters optional (all products visible by default).

- [ ] **Step 6: Create pages/product-detail.tsx**

Dynamic product detail (receives `slug` prop). Looks up product via `getProductBySlug()`. Displays: image, name, price, tagline, description, `AddToCartButton`. Related products section. Same pattern as truegrit product-detail.

- [ ] **Step 7: Verify build**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 8: Commit**

```bash
git add src/sites/elderparty/pages/coalitions.tsx src/sites/elderparty/pages/coalition-detail.tsx src/sites/elderparty/pages/news.tsx src/sites/elderparty/pages/news-detail.tsx src/sites/elderparty/pages/shop.tsx src/sites/elderparty/pages/product-detail.tsx
git commit -m "feat: add Elder Party dynamic route pages — coalitions, news, shop"
```

---

### Task 5: Action Pages — Events, Volunteer, Donate

**Files:**
- Create: `src/sites/elderparty/pages/events.tsx`
- Create: `src/sites/elderparty/pages/volunteer.tsx`
- Create: `src/sites/elderparty/pages/donate.tsx`

- [ ] **Step 1: Create pages/events.tsx**

Static page listing all 8 events. Each event card shows: image, name, date, location, description, and a fake "RSVP" button. Hero image. Patriotic styling with American flag motifs.

- [ ] **Step 2: Create pages/volunteer.tsx**

6 volunteer activity sections, each with image, title, description, details, and fake sign-up CTA. Hero image. Include Bleed on phone bank description and precinct captain fine print.

- [ ] **Step 3: Create pages/donate.tsx (client component)**

`"use client"` — needs interactive tier selection. Display 5 donation tiers as cards with amount, name, reward. Progress bar toward $66,600,000 goal. "Why Donate?" section. Coalition endorsement quotes. Bleed on the Ascended tier description. Fake donate buttons.

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add src/sites/elderparty/pages/events.tsx src/sites/elderparty/pages/volunteer.tsx src/sites/elderparty/pages/donate.tsx
git commit -m "feat: add Elder Party action pages — events, volunteer, donate"
```

---

### Task 6: Commerce & Standard Pages — Cart, Checkout, Contact, Privacy, Terms

**Files:**
- Create: `src/sites/elderparty/pages/cart.tsx`
- Create: `src/sites/elderparty/pages/checkout.tsx`
- Create: `src/sites/elderparty/pages/contact.tsx`
- Create: `src/sites/elderparty/pages/privacy.tsx`
- Create: `src/sites/elderparty/pages/terms.tsx`

- [ ] **Step 1: Create pages/cart.tsx**

`"use client"` — uses `useCart` from commerce provider. Same pattern as truegrit cart. Elderparty-themed surcharges: "Awakening Processing Fee" and "Dimensional Transit Tax." Import `getProductBySlug` from elderparty products.

- [ ] **Step 2: Create pages/checkout.tsx**

`"use client"` — checkout landing page with `FakeProgressBar`. Same pattern as truegrit checkout but with Elder Party theming.

- [ ] **Step 3: Create pages/contact.tsx**

`"use client"` — contact form with satirical departments (Constituent Services, Dimensional Affairs, Volunteer Operations, Legal & Warding). Real email `bsambrone@gmail.com` in small print at the bottom. Same structural pattern as truegrit contact.

- [ ] **Step 4: Create pages/privacy.tsx**

Server component. Authoritative policy reference to specificindustries.com (same pattern as truegrit). Elder Party-themed satirical privacy sections.

- [ ] **Step 5: Create pages/terms.tsx**

Server component. Same authoritative reference pattern. Elder Party-themed satirical terms.

- [ ] **Step 6: Verify build**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 7: Commit**

```bash
git add src/sites/elderparty/pages/cart.tsx src/sites/elderparty/pages/checkout.tsx src/sites/elderparty/pages/contact.tsx src/sites/elderparty/pages/privacy.tsx src/sites/elderparty/pages/terms.tsx
git commit -m "feat: add Elder Party commerce and standard pages"
```

---

### Task 7: Barrel File & Registry

**Files:**
- Create: `src/sites/elderparty/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create the barrel file**

```tsx
// src/sites/elderparty/index.ts
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getCoalitionBySlug } from "./data/coalitions"
import { getArticleBySlug } from "./data/news"
import { getProductBySlug } from "./data/products"
import ElderPartyHome from "./pages/home"
import ElderPartyPlatform, { metadata as platformMetadata } from "./pages/platform"
import ElderPartyCoalitions, { metadata as coalitionsMetadata } from "./pages/coalitions"
import CoalitionDetail from "./pages/coalition-detail"
import ElderPartyNews, { metadata as newsMetadata } from "./pages/news"
import NewsDetail from "./pages/news-detail"
import ElderPartyEvents, { metadata as eventsMetadata } from "./pages/events"
import ElderPartyVolunteer, { metadata as volunteerMetadata } from "./pages/volunteer"
import ElderPartyDonate, { metadata as donateMetadata } from "./pages/donate"
import ElderPartyCandidate, { metadata as candidateMetadata } from "./pages/candidate"
import ElderPartyLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import ElderPartyAbout, { metadata as aboutMetadata } from "./pages/about"
import ElderPartyShop, { metadata as shopMetadata } from "./pages/shop"
import ProductDetail from "./pages/product-detail"
import ElderPartyCart from "./pages/cart"
import ElderPartyCheckout from "./pages/checkout"
import ElderPartyContact, { metadata as contactMetadata } from "./pages/contact"
import ElderPartyPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import ElderPartyTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ElderPartyHome,
  "platform": { component: ElderPartyPlatform, metadata: platformMetadata },
  "coalitions": { component: ElderPartyCoalitions, metadata: coalitionsMetadata },
  "news": { component: ElderPartyNews, metadata: newsMetadata },
  "events": { component: ElderPartyEvents, metadata: eventsMetadata },
  "volunteer": { component: ElderPartyVolunteer, metadata: volunteerMetadata },
  "donate": { component: ElderPartyDonate, metadata: donateMetadata },
  "candidate": { component: ElderPartyCandidate, metadata: candidateMetadata },
  "leadership": { component: ElderPartyLeadership, metadata: leadershipMetadata },
  "about": { component: ElderPartyAbout, metadata: aboutMetadata },
  "shop": { component: ElderPartyShop, metadata: shopMetadata },
  "cart": ElderPartyCart,
  "checkout": ElderPartyCheckout,
  "contact": { component: ElderPartyContact, metadata: contactMetadata },
  "privacy": { component: ElderPartyPrivacy, metadata: privacyMetadata },
  "terms": { component: ElderPartyTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  coalitions: {
    component: CoalitionDetail,
    getMetadata: (slug: string) => {
      const coalition = getCoalitionBySlug(slug)
      return coalition
        ? { title: `${coalition.name} — The Elder Party`, description: coalition.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getCoalitionBySlug(slug),
  },
  news: {
    component: NewsDetail,
    getMetadata: (slug: string) => {
      const article = getArticleBySlug(slug)
      return article
        ? { title: `${article.headline} — The Elder Party`, description: article.summary }
        : undefined
    },
    isValidSlug: (slug: string) => !!getArticleBySlug(slug),
  },
  shop: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Elder Party Campaign Store`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 2: Register in registry.ts**

Add import and entry to `src/sites/registry.ts`:

```tsx
import { config as elderpartyConfig, pages as elderpartyPages, dynamicRoutes as elderpartyDynamicRoutes } from "./elderparty"
```

Add to siteRegistry:
```tsx
elderparty: { config: elderpartyConfig, pages: elderpartyPages, dynamicRoutes: elderpartyDynamicRoutes },
```

- [ ] **Step 3: Add subdomain to subdomains.ts if applicable**

Check `src/sites/subdomains.ts` and add `"elderparty"` if it maintains a list.

- [ ] **Step 4: Verify full build**

Run: `npx tsc --noEmit`
Expected: No type errors

Run: `npm run build`
Expected: Build succeeds (may have warnings but no errors)

- [ ] **Step 5: Test locally**

Run: `npm run dev`
Visit: `http://localhost:3000/?site=elderparty`

Verify:
- Homepage renders with correct dark theme
- Navigation works (platform, coalitions, news, events, etc.)
- Dynamic routes work (e.g., `/coalitions/mineral-labor?site=elderparty`)
- Cart/commerce works (add item, view cart)
- Bleed component renders Zalgo text where placed

- [ ] **Step 6: Commit**

```bash
git add src/sites/elderparty/index.ts src/sites/registry.ts
git commit -m "feat: register Elder Party site and wire up all routes"
```

---

### Task 8: Image Generation Script

**Files:**
- Create: `scripts/generate-elderparty-images.ts`

- [ ] **Step 1: Create the image generation script**

Follow the pattern from `scripts/generate-truegrit-images.ts`. The script should:
- Read OPENAI_API_KEY from .env
- Output to `public/sites/elderparty/`
- Skip images that already exist
- Use `generateImage()` for standard images and `generateImageWithPerson()` for person-based portraits
- Include ALL 73 images from the spec's image plan

Structure the script with clear sections matching the spec:
1. Favicon & Hero (2)
2. Leadership Portraits (4, person-based: bill, brandon, jim, sean)
3. Candidate Page (2, person-based: bill)
4. Platform (9)
5. Coalitions (8)
6. News Articles (11-12)
7. Events (8)
8. Donate (2)
9. Volunteer (6)
10. Shop Products (10)
11. About Page (2)
12. Contact & Checkout (2)

All prompts should include American flags, patriotic elements, and Lovecraftian horror as specified in the design doc.

- [ ] **Step 2: Verify script compiles**

Run: `npx tsx scripts/generate-elderparty-images.ts --help` (or just check `npx tsc --noEmit` if applicable)

- [ ] **Step 3: Commit**

```bash
git add scripts/generate-elderparty-images.ts
git commit -m "feat: add Elder Party image generation script (73 images)"
```

- [ ] **Step 4: Run image generation**

Run: `npx tsx scripts/generate-elderparty-images.ts`

This will take time. Each image costs API credits. Run in stages if needed.

- [ ] **Step 5: Commit generated images**

```bash
git add public/sites/elderparty/
git commit -m "chore: add generated Elder Party site images"
```

---

### Task 9: Final Verification & Cleanup

- [ ] **Step 1: Run type check**

Run: `npx tsc --noEmit`
Expected: Clean — no errors

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: Clean or only pre-existing warnings

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Full site walkthrough**

Run: `npm run dev`
Visit every page at `localhost:3000/?site=elderparty`:

- [ ] Homepage (`/`)
- [ ] Platform (`/platform`)
- [ ] Coalitions index (`/coalitions`)
- [ ] Each coalition detail (e.g., `/coalitions/mineral-labor`)
- [ ] News index (`/news`)
- [ ] Each news article (e.g., `/news/coastal-surge`)
- [ ] Events (`/events`)
- [ ] Volunteer (`/volunteer`)
- [ ] Donate (`/donate`)
- [ ] Candidate (`/candidate`)
- [ ] Leadership (`/leadership`)
- [ ] About (`/about`)
- [ ] Shop (`/shop`)
- [ ] Each product detail (e.g., `/shop/yard-sign`)
- [ ] Cart (`/cart`) — add items first
- [ ] Checkout (`/checkout`)
- [ ] Contact (`/contact`)
- [ ] Privacy (`/privacy`)
- [ ] Terms (`/terms`)

- [ ] **Step 5: Verify Bleed placement**

Check that Zalgo corruption appears in the expected locations and does not appear on pages where it shouldn't. Confirm the corruption is server-rendered (view source shows corrupted text, not JavaScript).

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "fix: Elder Party final polish and cleanup"
```
