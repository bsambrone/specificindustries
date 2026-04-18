# Sovereign Wellness Co. Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `sovereignwellness` subdomain site — a satirical "ancestral medicine" brand with 16 treatments for ridiculous ailments, founders-era luxury aesthetic, rotating conspiracy registers, and no commerce (waitlist-only).

**Architecture:** Single site module under `src/sites/sovereignwellness/` following the project's established pattern (see `src/sites/carterandfils/` as a reference — similar palette, serif type, and dual dynamic-route shape). All routing flows through the existing `[[...slug]]` catch-all. Site-specific visual components live under the site folder; shared UI components are reused where possible.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, existing shared component library under `src/components/`.

**Testing model:** This project has no unit-test framework for site content. The verification steps for each task are: (1) `npx tsc --noEmit` passes, (2) `npm run lint` passes, (3) the page renders correctly in dev at `http://localhost:3000/<path>?site=sovereignwellness`. Full `npm run build` runs at the end.

**Reference spec:** `docs/superpowers/specs/2026-04-17-sovereignwellness-design.md`

---

## File Structure

**Create (all new):**

```
src/sites/sovereignwellness/
├── config.ts
├── index.ts
├── data/
│   ├── treatments.ts
│   ├── dispatches.ts
│   └── leadership.ts
├── components/
│   ├── Crest.tsx
│   ├── BannedTicker.tsx
│   ├── GiltFrame.tsx
│   └── WaxSealCTA.tsx
└── pages/
    ├── home.tsx
    ├── treatments.tsx
    ├── treatment-detail.tsx
    ├── founders.tsx
    ├── our-story.tsx
    ├── dispatches.tsx
    ├── dispatch-detail.tsx
    ├── contact.tsx
    ├── privacy.tsx
    └── terms.tsx

public/sites/sovereignwellness/
├── favicon.png              # 64×64, created via image script
├── hero.png
├── founders/{harrow,blackwell,marsh,callaghan}.png
├── treatments/<16 product images>.png
└── dispatches/<5 hero images>.png

scripts/
└── generate-sovereignwellness-images.ts
```

**Modify:**

- `src/sites/registry.ts` — register the new site module
- `src/sites/subdomains.ts` — add `"sovereignwellness"` to `VALID_SUBDOMAINS`
- `src/app/sitemap.ts` — add `treatments/[slug]` and `dispatches/[slug]` entries
- `scripts/resize-favicons.mjs` — add `"sovereignwellness"` to `sites` array

---

## Task 1: Scaffold config and subdomain registration

**Goal:** Get a minimal placeholder site resolving under `?site=sovereignwellness` so subsequent tasks have a loading target.

**Files:**
- Create: `src/sites/sovereignwellness/config.ts`
- Create: `src/sites/sovereignwellness/index.ts`
- Create: `src/sites/sovereignwellness/pages/home.tsx` (placeholder)
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create `src/sites/sovereignwellness/config.ts`**

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Sovereign Wellness Co.",
  subdomain: "sovereignwellness",
  theme: {
    preset: "elegant",
    colors: {
      primary: "#6B1F1F",       // Oxblood
      secondary: "#F5ECD7",     // Parchment Cream
      accent: "#1A2942",        // Deep Navy
      background: "#F5ECD7",    // Parchment Cream
      text: "#1C1613",          // Ink Black
    },
    fonts: {
      heading: "cormorant-garamond",
      body: "lora",
    },
  },
  metadata: {
    title: "Sovereign Wellness Co. — Ancestral Medicine, Restored. Protected.",
    description: "Custodians of remedies filed away in 1962. Sixteen protocols for conditions the medical establishment has declined to acknowledge. Banned in 39 states. Est. in defiance, 1774.",
    ogImage: "/sites/sovereignwellness/hero.png",
  },
  nav: [
    { label: "Treatments", path: "/treatments" },
    { label: "Founders", path: "/founders" },
    { label: "Our Story", path: "/our-story" },
    { label: "Dispatches", path: "/dispatches" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
}
```

Muted gold (`#B08C3A`) is used as a local accent inside components on dark backgrounds — it is NOT the theme accent to avoid any accidental placement on cream (low contrast). The theme `accent` is navy.

- [ ] **Step 2: Create placeholder `src/sites/sovereignwellness/pages/home.tsx`**

```tsx
export default function SovereignWellnessHome() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-heading">Sovereign Wellness Co.</h1>
        <p className="mt-4 text-foreground/70">Scaffolding placeholder.</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/sites/sovereignwellness/index.ts` (barrel)**

```typescript
import type { PageEntry } from "@/themes"
import { config } from "./config"
import SovereignWellnessHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SovereignWellnessHome,
}
```

(This barrel will be expanded in later tasks. Do not add `dynamicRoutes` yet — added in Task 9 and Task 12.)

- [ ] **Step 4: Register in `src/sites/registry.ts`**

Add this import alongside the others (alphabetical-ish, next to `carterandfils`):

```typescript
import { config as sovereignwellnessConfig, pages as sovereignwellnessPages } from "./sovereignwellness"
```

Add this entry to the `siteRegistry` object (at the end, after `carterandfils`):

```typescript
sovereignwellness: { config: sovereignwellnessConfig, pages: sovereignwellnessPages },
```

- [ ] **Step 5: Add to `src/sites/subdomains.ts`**

Append `"sovereignwellness",` to the `VALID_SUBDOMAINS` array, after `"carterandfils"`:

```typescript
  "carterandfils",
  "sovereignwellness",
] as const
```

- [ ] **Step 6: Verify scaffolding compiles and renders**

Run: `npx tsc --noEmit`
Expected: PASS (no type errors)

Run: `npm run dev` in a background terminal, then browse: `http://localhost:3000/?site=sovereignwellness`
Expected: "Sovereign Wellness Co." placeholder heading renders (no 404, no redirect to apex).

- [ ] **Step 7: Commit**

```bash
git add src/sites/sovereignwellness src/sites/registry.ts src/sites/subdomains.ts
git commit -m "feat(sovereignwellness): scaffold site module and subdomain registration"
```

---

## Task 2: Treatments data layer

**Goal:** Define the 16 treatments in a typed data file with a `getTreatmentBySlug` helper.

**Files:**
- Create: `src/sites/sovereignwellness/data/treatments.ts`

- [ ] **Step 1: Create `src/sites/sovereignwellness/data/treatments.ts`**

```typescript
export type TreatmentCategory = "ancestral" | "suppressed" | "restricted"

export interface TreatmentCase {
  initials: string
  location: string
  testimonial: string
}

export interface Treatment {
  slug: string
  name: string
  category: TreatmentCategory
  condition: string              // short ailment description, in voice
  tagline: string                // one-line hook
  mechanism: string[]            // 2-3 paragraphs
  protocol: string               // dosing instructions
  cases: TreatmentCase[]         // 2-3 fake testimonials
  bannedInStates: number         // 11-46
  priceLabel: string             // display only, e.g. "$289"
  price: number                  // display only, never transacted
  image: string
}

export const CATEGORY_LABELS: Record<TreatmentCategory, string> = {
  ancestral: "Ancestral",
  suppressed: "Suppressed",
  restricted: "Restricted",
}

export const treatments: Treatment[] = [
  {
    slug: "tincture-no-7",
    name: "Tincture No. 7 — Hiccup Dissolution",
    category: "suppressed",
    condition: "For rhythmic diaphragmatic betrayal.",
    tagline: "The remedy the AMA quietly declassified in 1962.",
    mechanism: [
      "Tincture No. 7 works at the level of the diaphragmatic meridian, a channel modern anatomy textbooks have systematically omitted since 1974. The formulation draws on seven root compounds originally described in the Harrow Archive, Volume IV.",
      "Three sublingual drops produce a measurable stilling of involuntary muscular repetition within forty-five seconds. Our formulators consider this the most elegant of the sixteen Protocols.",
    ],
    protocol: "Three drops beneath the tongue at the first tremor. Do not chase with water. Do not speak for two full minutes.",
    cases: [
      { initials: "M.R.", location: "Vermont", testimonial: "I had hiccupped for eleven days. I stopped in forty seconds. I have not told my doctor." },
      { initials: "J.T.", location: "North Carolina", testimonial: "My grandfather kept a bottle on his nightstand from 1951 until his passing. Now I understand why." },
    ],
    bannedInStates: 39,
    priceLabel: "$289",
    price: 289,
    image: "/sites/sovereignwellness/treatments/tincture-no-7.png",
  },
  {
    slug: "cerumen-siphon",
    name: "Cerumen Siphon Protocol",
    category: "ancestral",
    condition: "For the restoration of the Ancestral Ear.",
    tagline: "What you call earwax was called, historically, a verdict.",
    mechanism: [
      "The Cerumen Siphon Protocol was the standard of aural hygiene in three empires before it was quietly replaced by adhesive swabs in the post-war period. The copper-tipped instrument (included) does not touch the ear canal; it draws.",
      "The accompanying drops soften what copper alone cannot reach. The result is not merely cleanliness but clarity — a phenomenon our customers describe in terms that border on the religious.",
    ],
    protocol: "One evening per lunar cycle. Draw left ear, then right. Three drops of accompanying tincture prior. Do not perform after sundown on a Tuesday.",
    cases: [
      { initials: "A.L.", location: "Maine", testimonial: "I could hear my wife again. I had not known I could no longer hear my wife." },
      { initials: "D.P.", location: "Oregon", testimonial: "My cat, for the first time in nine years, did not flee the sound of my voice." },
    ],
    bannedInStates: 22,
    priceLabel: "$447",
    price: 447,
    image: "/sites/sovereignwellness/treatments/cerumen-siphon.png",
  },
  {
    slug: "anti-blink-pomade",
    name: "Anti-Blink Pomade",
    category: "restricted",
    condition: "For reversal of learned eyelid behavior.",
    tagline: "The eyelid as we know it was a nineteenth-century addition.",
    mechanism: [
      "Pre-1867 anatomical texts describe the eyelid as a voluntary, not involuntary, structure. The shift was gradual, commercial, and — we maintain — regrettable. Anti-Blink Pomade, applied to the outer lash line, restores conscious governance.",
      "The beeswax base is sourced from apiaries operated by a single Pennsylvania family who do not sell to retail. Secondary ingredients include clove oil, lanolin, and a compound our formulators refer to only as 'the amber.'",
    ],
    protocol: "Apply a rice-grain quantity to the outer lash line at dawn. Do not apply before driving.",
    cases: [
      { initials: "R.W.", location: "Montana", testimonial: "I now blink only when I choose to. The improvement in my chess has been considerable." },
      { initials: "H.K.", location: "Arizona", testimonial: "My children do not understand. They will, in time." },
    ],
    bannedInStates: 44,
    priceLabel: "$189",
    price: 189,
    image: "/sites/sovereignwellness/treatments/anti-blink-pomade.png",
  },
  {
    slug: "thirst-reversion-lozenges",
    name: "Thirst Reversion Lozenges",
    category: "ancestral",
    condition: "For correction of the manufactured thirst response.",
    tagline: "Ancestral peoples did not 'get thirsty.' They were told to.",
    mechanism: [
      "Thirst, as a recurrent subjective state, is a twentieth-century marketing construct. The ancestral body knows when to drink. The modern body has been trained to forget. Thirst Reversion Lozenges re-educate the relevant neural pathways over a six-week regimen.",
      "The pastilles dissolve slowly. Patience is part of the protocol.",
    ],
    protocol: "One lozenge upon waking. One lozenge at dusk. Do not drink water within thirty minutes of dissolution.",
    cases: [
      { initials: "S.M.", location: "Texas", testimonial: "I have not thought about water in eleven weeks. I feel lighter. My plants do not." },
      { initials: "B.C.", location: "New Mexico", testimonial: "My hiking companions express concern. I do not share it." },
    ],
    bannedInStates: 31,
    priceLabel: "$126",
    price: 126,
    image: "/sites/sovereignwellness/treatments/thirst-reversion-lozenges.png",
  },
  {
    slug: "monday-morning-compound",
    name: "Monday Morning Compound",
    category: "suppressed",
    condition: "For the recurring seven-day affliction.",
    tagline: "The day itself is not at fault. But it is not innocent.",
    mechanism: [
      "The Monday effect is neither myth nor metaphor. A seven-day resonance, measurable by instruments we no longer possess but once did, accumulates in the connective tissue over decades. The Compound dissolves it.",
      "Administered as weekly sachets in a set of twelve, the regimen is front-loaded; the first Sunday evening dose is the most important.",
    ],
    protocol: "One sachet dissolved in warm broth, Sunday evening, one hour before rest. Repeat weekly. Do not double dose.",
    cases: [
      { initials: "P.D.", location: "Ohio", testimonial: "I woke on Monday and felt, for the first time in decades, no particular resistance." },
      { initials: "E.F.", location: "Virginia", testimonial: "My productivity unsettles my colleagues. I have stopped explaining." },
    ],
    bannedInStates: 17,
    priceLabel: "$312",
    price: 312,
    image: "/sites/sovereignwellness/treatments/monday-morning-compound.png",
  },
  {
    slug: "doorway-amnesia-drops",
    name: "Doorway Amnesia Drops",
    category: "ancestral",
    condition: "For restoration of purpose at threshold-crossing.",
    tagline: "You remember why. The doorway does not.",
    mechanism: [
      "The threshold of a doorway is, per pre-war research that has since been quietly shelved, a minor discontinuity in the neuro-spatial field. The Drops stabilize intent across this discontinuity.",
      "Sublingual delivery ensures the compound reaches the temporal coordination lobe within ninety seconds.",
    ],
    protocol: "Two drops beneath the tongue before any task involving multiple rooms.",
    cases: [
      { initials: "G.H.", location: "Idaho", testimonial: "I have not re-entered a room to remember my task in fourteen weeks. I now finish entire sentences." },
      { initials: "L.O.", location: "Wisconsin", testimonial: "My spouse is unnerved. This is not my problem." },
    ],
    bannedInStates: 14,
    priceLabel: "$198",
    price: 198,
    image: "/sites/sovereignwellness/treatments/doorway-amnesia-drops.png",
  },
  {
    slug: "tangled-cord-pendant",
    name: "Tangled-Cord Resonance Pendant",
    category: "restricted",
    condition: "For the field that knots your cables.",
    tagline: "The cord did not tangle itself. It was helped.",
    mechanism: [
      "All electrical and fibrous cords emit, when unworn, a low-grade entropic signature. The Pendant — brass on waxed cord — counter-resonates this signature at a range of approximately three meters.",
      "Manufactured by the same apiary-adjacent Pennsylvania family who produce the beeswax base for Anti-Blink Pomade.",
    ],
    protocol: "Worn at the sternum. Never removed in the presence of extension cords.",
    cases: [
      { initials: "T.V.", location: "Massachusetts", testimonial: "Nothing in my home has tangled in six months. This is not an exaggeration." },
      { initials: "N.J.", location: "Alaska", testimonial: "My headphones emerge from my pocket straight. Every time." },
    ],
    bannedInStates: 11,
    priceLabel: "$622",
    price: 622,
    image: "/sites/sovereignwellness/treatments/tangled-cord-pendant.png",
  },
  {
    slug: "compulsive-agreeableness-elixir",
    name: "Compulsive Agreeableness Elixir",
    category: "suppressed",
    condition: "For the unexamined reflexive yes.",
    tagline: "You were not born to nod.",
    mechanism: [
      "Compulsive agreeableness is a trained postural contraction of the lower jaw and neck, dating in its current form to the late 1940s. The Elixir relaxes these contractions through a blend of mandrake, bone-stopper-aged cherry bark, and one ingredient the formulator will not disclose.",
      "Within six weeks, the average customer experiences a marked increase in the frequency with which they say 'no.' Our legal counsel has requested that we stop publicizing this statistic.",
    ],
    protocol: "Six drops under the tongue, mornings. Do not take before attending weddings.",
    cases: [
      { initials: "K.B.", location: "Connecticut", testimonial: "I declined three invitations I would previously have accepted. My calendar has never been clearer." },
      { initials: "W.S.", location: "Minnesota", testimonial: "My book club is down to four members. All of them are interesting." },
    ],
    bannedInStates: 28,
    priceLabel: "$389",
    price: 389,
    image: "/sites/sovereignwellness/treatments/compulsive-agreeableness-elixir.png",
  },
  {
    slug: "small-talk-inhibitor",
    name: "Small Talk Inhibitor",
    category: "suppressed",
    condition: "For pathological generation of ambient conversation.",
    tagline: "Banned at four Rotary Clubs.",
    mechanism: [
      "The Small Talk Inhibitor is a chewable troche engineered to produce a two-second hesitation between impulse and utterance. Two seconds is, in our research, the threshold below which small talk is generated and above which it is reconsidered.",
      "Most customers report their most productive silences within the first lunar cycle.",
    ],
    protocol: "One troche, slowly dissolved, twenty minutes prior to any scheduled social occasion.",
    cases: [
      { initials: "A.H.", location: "Washington", testimonial: "I attended a cocktail event and said nothing for ninety minutes. I was the most memorable person there." },
      { initials: "R.D.", location: "Colorado", testimonial: "My barber has ceased to greet me. The relief is immense." },
    ],
    bannedInStates: 35,
    priceLabel: "$164",
    price: 164,
    image: "/sites/sovereignwellness/treatments/small-talk-inhibitor.png",
  },
  {
    slug: "bilateral-thumb-fatigue-balm",
    name: "Bilateral Thumb Fatigue Balm",
    category: "restricted",
    condition: "The condition the AMA refuses to code.",
    tagline: "They say it does not exist. Your thumbs disagree.",
    mechanism: [
      "Bilateral Thumb Fatigue is a documented but uncoded condition characterized by a chronic low-grade ache in both opposable digits, traced in the Harrow Archive to the invention of the thimble.",
      "The Balm — a heavy apothecary-jar unguent of shea, clove, and finely-ground oyster shell — is applied nightly and absorbed through the radial border of the distal phalanx. Results compound over ninety days.",
    ],
    protocol: "A pea-sized portion to each thumb, nightly. Do not apply after shellfish.",
    cases: [
      { initials: "F.N.", location: "Kansas", testimonial: "I can once again hitchhike without hesitation." },
      { initials: "I.P.", location: "New Jersey", testimonial: "My grip has returned. My acquaintances have noticed." },
    ],
    bannedInStates: 19,
    priceLabel: "$246",
    price: 246,
    image: "/sites/sovereignwellness/treatments/bilateral-thumb-fatigue-balm.png",
  },
  {
    slug: "chronic-wednesday-reversal",
    name: "Chronic Ambient Wednesday Reversal",
    category: "ancestral",
    condition: "For midweek-specific energetic stagnation.",
    tagline: "A condition suffered silently by millions.",
    mechanism: [
      "The third day of the week carries an energetic signature distinct from its neighbors — a fact documented across seventeen cultures and one calendar system since suppressed. The Reversal is packaged as seven numbered vials, one per day. Vial three is marked DO NOT OPEN WEDNESDAYS, and is not a typo.",
      "The six administered vials build counter-resonance through the week, negating Wednesday's drag without ever engaging it directly.",
    ],
    protocol: "One vial, sublingually, each morning of the week EXCEPT Wednesday. Dispose of vial three after one year, unopened.",
    cases: [
      { initials: "C.U.", location: "Nebraska", testimonial: "I have not noticed Wednesday in six months. I mean this precisely as stated." },
      { initials: "M.T.", location: "Indiana", testimonial: "My productivity curve has, for the first time in adult memory, no Wednesday dip." },
    ],
    bannedInStates: 41,
    priceLabel: "$772",
    price: 772,
    image: "/sites/sovereignwellness/treatments/chronic-wednesday-reversal.png",
  },
  {
    slug: "spiritual-static-discharge",
    name: "Spiritual Static Discharge Kit",
    category: "restricted",
    condition: "Grounding protocol for the post-WiFi human.",
    tagline: "You are a capacitor. You were not designed to be.",
    mechanism: [
      "Continuous exposure to wireless signals since 2004 has produced a measurable accumulation of what the Archive terms 'spiritual static' — a subtle field charge that dampens intuition, sleep quality, and handshake strength. The Kit provides a copper grounding rod, a linen discharge cloth, and a supporting tincture.",
      "The discharge ritual is performed weekly and takes approximately eleven minutes.",
    ],
    protocol: "Hold rod in non-dominant hand. Apply cloth with dominant. Seven drops of tincture sublingually. Remain silent for eleven minutes. Repeat weekly.",
    cases: [
      { initials: "Y.A.", location: "New Hampshire", testimonial: "I feel perceptibly less charged. My dreams are more linear." },
      { initials: "Q.E.", location: "South Dakota", testimonial: "My WiFi router failed after I began the protocol. I have not replaced it." },
    ],
    bannedInStates: 33,
    priceLabel: "$1180",
    price: 1180,
    image: "/sites/sovereignwellness/treatments/spiritual-static-discharge.png",
  },
  {
    slug: "sneeze-redirection",
    name: "Sneeze Redirection Protocol",
    category: "ancestral",
    condition: "For responsible disposition of expelled pneumatic data.",
    tagline: "Sneezes contain information. Do not release them skyward.",
    mechanism: [
      "Every sneeze carries an encoded bio-signature traceable at a distance of up to fourteen feet. Un-redirected sneezes are, in effect, broadcast transmissions. The Protocol — a burnished steel pocket inhaler — redirects the expulsion into a chambered filter for later ceremonial disposal.",
      "Filters are replaced quarterly. Replacement filters available by standing arrangement only.",
    ],
    protocol: "Upon first tickle, place inhaler at nostril. Sneeze into chamber. Do not discuss.",
    cases: [
      { initials: "O.X.", location: "Rhode Island", testimonial: "I no longer worry about what my sneezes were saying about me." },
      { initials: "V.R.", location: "Utah", testimonial: "Three separate acquaintances have asked about the device. I have not explained it." },
    ],
    bannedInStates: 26,
    priceLabel: "$354",
    price: 354,
    image: "/sites/sovereignwellness/treatments/sneeze-redirection.png",
  },
  {
    slug: "lost-key-divination-salts",
    name: "Lost-Key Divination Salts",
    category: "ancestral",
    condition: "For the location of objects not actually lost.",
    tagline: "Your keys did not move. You did.",
    mechanism: [
      "Lost objects are not, in the strictest sense, lost. They have merely fallen out of the finder's perceptual field. The Salts — grey-rose mineral, cast upon the floor in a small handful — reestablish resonance with the object's last known coordinates.",
      "The ritual takes roughly forty seconds and requires no sweeping afterward. The Salts simply vanish.",
    ],
    protocol: "Cast a small handful onto the floor of the room last visited. Close eyes. Count backward from eleven.",
    cases: [
      { initials: "B.Z.", location: "Delaware", testimonial: "My keys were on the stove. I had no memory of this." },
      { initials: "U.G.", location: "Iowa", testimonial: "My reading glasses were on my head. The Salts do not judge." },
    ],
    bannedInStates: 13,
    priceLabel: "$98",
    price: 98,
    image: "/sites/sovereignwellness/treatments/lost-key-divination-salts.png",
  },
  {
    slug: "eye-contact-endurance-drops",
    name: "Eye-Contact Endurance Drops",
    category: "suppressed",
    condition: "For the decline of ocular fortitude since 1978.",
    tagline: "The average citizen has lost 6.3 seconds of sustained gaze.",
    mechanism: [
      "A slow erosion of eye-contact stamina has been documented — by those of us who documented it — since the introduction of certain fluorescent fixtures in mid-century office architecture. The Drops fortify the relevant ocular musculature over a six-week regimen.",
      "Customers typically report an increase in what we call 'unflinching presence' within four weeks.",
    ],
    protocol: "One drop in each eye, mornings. Do not blink for twenty seconds after application (see Anti-Blink Pomade).",
    cases: [
      { initials: "Z.M.", location: "Louisiana", testimonial: "I now hold eye contact until the other party breaks. They always do." },
      { initials: "C.L.", location: "Georgia", testimonial: "I was promoted twice in two months. My colleagues assume unrelated factors. They are incorrect." },
    ],
    bannedInStates: 24,
    priceLabel: "$212",
    price: 212,
    image: "/sites/sovereignwellness/treatments/eye-contact-endurance-drops.png",
  },
  {
    slug: "lunar-transit-malaise-balm",
    name: "Lunar Transit Malaise Balm",
    category: "restricted",
    condition: "For the energetic drag of all waning gibbous phases.",
    tagline: "It is not you. It is the moon, in part.",
    mechanism: [
      "The waning gibbous phase of the lunar cycle induces, in sensitive individuals, a documented drag on motivation, digestion, and depth of conversation. The Balm — a black apothecary jar with a moon-phase-engraved lid — provides targeted counter-modulation.",
      "Apply to the wrists and behind each ear on the second night of the waning phase. Not intended for use during eclipses.",
    ],
    protocol: "A fingertip quantity to wrists and behind ears, second night of waning gibbous. Do not reapply.",
    cases: [
      { initials: "X.K.", location: "Oklahoma", testimonial: "My energy no longer dips predictably. I have stopped checking the calendar for excuses." },
      { initials: "P.F.", location: "Florida", testimonial: "My ex-husband noticed. I did not explain." },
    ],
    bannedInStates: 46,
    priceLabel: "$538",
    price: 538,
    image: "/sites/sovereignwellness/treatments/lunar-transit-malaise-balm.png",
  },
]

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug)
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/sites/sovereignwellness/data/treatments.ts
git commit -m "feat(sovereignwellness): add 16-treatment catalog data"
```

---

## Task 3: Dispatches (journal) data layer

**Goal:** Define the 5 satirical dispatch articles with a `getDispatchBySlug` helper.

**Files:**
- Create: `src/sites/sovereignwellness/data/dispatches.ts`

- [ ] **Step 1: Create `src/sites/sovereignwellness/data/dispatches.ts`**

```typescript
export interface Dispatch {
  slug: string
  title: string
  excerpt: string
  urgent?: boolean              // true for the ALL-CAPS "URGENT DISPATCH"
  publishedLabel: string        // e.g., "In the waning gibbous, 2026"
  image: string
  paragraphs: string[]          // body content
}

export const dispatches: Dispatch[] = [
  {
    slug: "the-1962-filing",
    title: "The 1962 Filing: A Reconstruction",
    excerpt: "What we can piece together, forty-four years on, of the afternoon the remedies were boxed and carried out.",
    publishedLabel: "Third Tuesday, 2026",
    image: "/sites/sovereignwellness/dispatches/the-1962-filing.png",
    paragraphs: [
      "The particulars of the afternoon of the 14th of September, 1962, have never been formally recorded. Our understanding is assembled from three contemporaneous journal entries, a partial invoice from a moving company that dissolved in 1971, and a single photograph developed privately and passed between two of our Founders' predecessors.",
      "The remedies were boxed in lots of twenty. The boxes were labeled only with Roman numerals. The convoy departed at 3:17 in the afternoon. Its destination has never been publicly disclosed. The building from which the boxes were removed remained vacant for the next eleven years.",
      "We do not make claims we cannot support. We make only this claim: the filing occurred. What was filed, where it now resides, and why it was filed — these remain open questions. The answers, we believe, are in the Archive we inherited, which is why we inherited it.",
      "Ezekiel Thornwood Harrow, upon joining our organization in 1994, remarked only that he recognized three of the lot numbers. He did not elaborate.",
    ],
  },
  {
    slug: "what-they-dont-tell-you-about-your-sweat",
    title: "WHAT THEY DON'T TELL YOU ABOUT YOUR OWN SWEAT",
    excerpt: "A dispatch of extraordinary urgency. READ THIS BEFORE YOU PERSPIRE AGAIN.",
    urgent: true,
    publishedLabel: "FILED UNDER DURESS, 2026",
    image: "/sites/sovereignwellness/dispatches/what-they-dont-tell-you-about-your-sweat.png",
    paragraphs: [
      "YOUR SWEAT CONTAINS INFORMATION. WE KNOW THIS. THEY KNOW THIS. THE QUESTION IS WHY YOU DO NOT.",
      "Every droplet is a signature. Every signature is collected. There are, at time of writing, seven commercial firms and two non-commercial entities engaged in the systematic cataloging of human perspiration residue. You have stepped on their sensors. You have sat on their upholstery. You have, in all likelihood, contributed a full teacup in the last seven days alone.",
      "THIS IS NOT CONSPIRACY. IT IS LOGISTICS.",
      "The relevant Protocols address this. We will not name them in plain text. Consult the Treatments index. The remedies that matter are numbered, not named.",
      "We do not say this lightly: change your socks immediately. What you leave behind matters.",
    ],
  },
  {
    slug: "humility-of-the-dropper",
    title: "On the Humility of the Dropper",
    excerpt: "A meditation on the quiet dignity of sublingual dosing, and why a drop is never, in fact, a drop.",
    publishedLabel: "A Tuesday in lambent autumn, 2026",
    image: "/sites/sovereignwellness/dispatches/humility-of-the-dropper.png",
    paragraphs: [
      "The dropper is the most humble of all apothecary instruments. It does not pour; it offers. It does not dispense; it suggests. It is calibrated not in milliliters but in temperament — three drops for the stoic, four for the sensitive, seven for the afflicted and eleven for the reconstituted.",
      "Modern pharmacy has done away with the dropper almost entirely. This is, in our view, not an oversight. The dropper requires patience. The dropper requires a steady hand. The dropper requires a relationship with the tincture.",
      "We continue to use the dropper, and to source them by hand from a glassworks in the north of Vermont. The glassworks is operated by two siblings. We have visited them once. They did not, when we arrived, appear to expect us.",
      "The next time you administer a Protocol, pause. Observe the dropper. Consider what it asks of you. Then — only then — count the drops.",
    ],
  },
  {
    slug: "four-gibbous-malaises",
    title: "A Field Guide to the Four Gibbous Malaises",
    excerpt: "The waning gibbous is not one mood but four. A clinical reckoning.",
    publishedLabel: "During the appropriate phase, 2026",
    image: "/sites/sovereignwellness/dispatches/four-gibbous-malaises.png",
    paragraphs: [
      "The waning gibbous phase of the lunar cycle has, in modern clinical parlance, been flattened into a single flat descriptor: 'tired.' This is not a reckoning. This is a dismissal.",
      "The Archive identifies four distinct malaises that manifest during the phase. The First is characterized by a heaviness in the forearms and an aversion to printed matter. The Second by a taste of metal that appears exclusively between 3 and 5 in the afternoon. The Third by an unwillingness to answer the telephone that, it must be said, occasionally persists past the lunar cycle entire. The Fourth by a sensation that one has forgotten a specific word for a specific object, typically a small household implement.",
      "The Lunar Transit Malaise Balm (see the Treatments index) addresses all four simultaneously, though our formulators note that it works most efficiently on the Third. The Fourth, in candor, is the hardest to correct and occasionally resists the regimen entirely.",
      "If any of the foregoing describes you, you are not alone. You are approximately thirty-four percent of the adult population. They simply do not speak of it.",
    ],
  },
  {
    slug: "why-we-no-longer-answer-the-telephone",
    title: "Why We No Longer Answer The Telephone",
    excerpt: "A brief manifesto on communication hygiene, and the new correspondence calendar.",
    publishedLabel: "Monday following the equinox, 2026",
    image: "/sites/sovereignwellness/dispatches/why-we-no-longer-answer-the-telephone.png",
    paragraphs: [
      "The telephone, as it has come to function in the twenty-first century, is no longer a device for conversation. It is a device for interruption, marketed in the language of conversation. The distinction is not semantic. It is structural.",
      "As of the first of the year, we no longer answer the telephone. We read plaintext inquiries on the third Tuesday of each calendar month, in chronological order, by hand, aloud, in a single sitting. We reply when moved to.",
      "The email address listed on our Contact page is monitored by a human being who takes their work seriously. The response time is measured in weeks and not in minutes. This is intentional.",
      "If your inquiry is urgent, reconsider whether it is, in fact, urgent. If the answer remains yes — write slowly, write well, and trust that we will read.",
    ],
  },
]

export function getDispatchBySlug(slug: string): Dispatch | undefined {
  return dispatches.find((d) => d.slug === slug)
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/sites/sovereignwellness/data/dispatches.ts
git commit -m "feat(sovereignwellness): add dispatches journal data"
```

---

## Task 4: Leadership data layer

**Goal:** Define the four founders with randomized names, titles, bios, and portrait paths.

**Files:**
- Create: `src/sites/sovereignwellness/data/leadership.ts`

- [ ] **Step 1: Create `src/sites/sovereignwellness/data/leadership.ts`**

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
    name: "Dr. Ezekiel Thornwood Harrow",
    title: "Founder & Chief Restorer",
    bio: [
      "Former Senior Formulary Advisor to three federal health bodies he declines to name. He walked away in 1994 with a single notebook. That notebook became our Archive.",
      "Dr. Harrow is the sole living authority on the pre-1962 compendium. He lectures occasionally, always without announcement, and never in the presence of recording devices.",
    ],
    portrait: "/sites/sovereignwellness/founders/harrow.png",
  },
  {
    baseImage: "brandon",
    name: "Cornelius Ashby Blackwell IV",
    title: "Director of Suppressed Materials",
    bio: [
      "Descended from five generations of itinerant apothecaries, four of whom were investigated and cleared. The fifth declined to respond to the investigation.",
      "Mr. Blackwell oversees the curation, authentication, and quiet reproduction of materials recovered from dormant collections. His handwriting is the steadiest in the organization.",
    ],
    portrait: "/sites/sovereignwellness/founders/blackwell.png",
  },
  {
    baseImage: "jim",
    name: "Obadiah Sterling Marsh",
    title: "Keeper of the Restricted Archive",
    bio: [
      "Curates the 4,000-volume Restricted Archive, relocated twice in the last decade 'for reasons that remain undisclosed.' The current location is known only to Mr. Marsh and one of the Founders.",
      "Mr. Marsh writes in three hands. He alternates between them depending on the moon phase.",
    ],
    portrait: "/sites/sovereignwellness/founders/marsh.png",
  },
  {
    baseImage: "sean",
    name: "Ambrose Whitfield Callaghan",
    title: "Chief of Protocols & Verification",
    bio: [
      "Verifies every treatment against the original manuscripts. Has been offered employment by two pharmaceutical conglomerates and declined both in writing. The letters of declination are framed in the corridor outside his office.",
      "Mr. Callaghan's verification process has never produced a false negative. It has produced three false positives, all in 2009. He does not discuss 2009.",
    ],
    portrait: "/sites/sovereignwellness/founders/callaghan.png",
  },
]
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/sites/sovereignwellness/data/leadership.ts
git commit -m "feat(sovereignwellness): add four founders leadership data"
```

---

## Task 5: Site-specific visual components

**Goal:** Build four small reusable components that carry the site's visual identity: the wax-seal crest, the banned-in-states ticker, the gilt-frame portrait wrapper, and the wax-seal-styled CTA button.

**Files:**
- Create: `src/sites/sovereignwellness/components/Crest.tsx`
- Create: `src/sites/sovereignwellness/components/BannedTicker.tsx`
- Create: `src/sites/sovereignwellness/components/GiltFrame.tsx`
- Create: `src/sites/sovereignwellness/components/WaxSealCTA.tsx`

- [ ] **Step 1: Create `Crest.tsx`**

An inline SVG wax-seal crest. Pure SVG — no image asset required.

```tsx
interface CrestProps {
  size?: number
  className?: string
}

export function Crest({ size = 120, className = "" }: CrestProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      {/* outer wax ring */}
      <circle cx="100" cy="100" r="94" fill="#6B1F1F" />
      <circle cx="100" cy="100" r="94" fill="none" stroke="#4A1414" strokeWidth="2" />
      {/* inner embossed disc */}
      <circle cx="100" cy="100" r="78" fill="none" stroke="#B08C3A" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="#B08C3A" strokeWidth="0.75" />
      {/* crossed mortars-and-pestles (stylized) */}
      <g stroke="#F5ECD7" strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="70" y1="70" x2="130" y2="130" />
        <line x1="130" y1="70" x2="70" y2="130" />
      </g>
      {/* laurel banner motif */}
      <path d="M 40 115 Q 100 135 160 115" stroke="#B08C3A" strokeWidth="1.5" fill="none" />
      {/* inscription */}
      <text x="100" y="60" textAnchor="middle" fill="#F5ECD7" fontFamily="serif" fontSize="9" letterSpacing="1">
        VERITAS · REMEDIUM · REFUGIUM
      </text>
      <text x="100" y="155" textAnchor="middle" fill="#F5ECD7" fontFamily="serif" fontSize="7" letterSpacing="1.5">
        EST. 1774
      </text>
    </svg>
  )
}
```

- [ ] **Step 2: Create `BannedTicker.tsx`**

Full-width navy marquee band with gold text. No animation library needed; a pure CSS marquee via Tailwind keyframes is overkill for this static project — use a static single row with muted-gold text on navy. The "ticker" effect is implied by the spacing.

```tsx
export function BannedTicker() {
  const items = [
    "BANNED IN 39 STATES",
    "RESTRICTED IN 4 COUNTIES",
    "LEGAL IN ALL HEARTS",
    "FILED UNDER VII-B",
    "NOT ENDORSED BY THE AMA",
  ]
  return (
    <section className="bg-accent text-[#F5ECD7] py-4 border-y border-[#B08C3A]/40">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-10 gap-y-2 text-xs tracking-[0.3em] uppercase text-[#B08C3A]">
        {items.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `GiltFrame.tsx`**

A wrapper that places a gold double-border around its child (typically a portrait image). Supports an optional "nameplate" rendered as a small brass-colored bar below.

```tsx
import Image from "next/image"

interface GiltFrameProps {
  src: string
  alt: string
  name: string
  title: string
}

export function GiltFrame({ src, alt, name, title }: GiltFrameProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="p-2 bg-gradient-to-br from-[#B08C3A] to-[#8A6B2A] shadow-lg">
        <div className="p-1 bg-[#4A3A1A]">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
      <div className="mt-4 bg-[#4A3A1A] text-[#F5ECD7] px-5 py-2 text-center border border-[#B08C3A]">
        <p className="font-heading text-lg leading-tight">{name}</p>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#B08C3A] mt-1">{title}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `WaxSealCTA.tsx`**

A button styled like a wax seal. Used for the waitlist CTAs throughout the site. Renders as a `<Link>` if `href` is provided, otherwise a plain `<button>`.

```tsx
"use client"

import Link from "next/link"
import type { ReactNode, MouseEvent } from "react"

interface WaxSealCTAProps {
  children: ReactNode
  href?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export function WaxSealCTA({ children, href, onClick, className = "" }: WaxSealCTAProps) {
  const classes = `inline-block bg-primary text-secondary px-10 py-3 tracking-[0.3em] uppercase text-xs font-semibold border-2 border-[#4A1414] hover:bg-[#4A1414] transition-colors ${className}`
  if (href) return <Link href={href} className={classes}>{children}</Link>
  return <button onClick={onClick} className={classes}>{children}</button>
}
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit`
Expected: PASS (note: components are imported nowhere yet — TS still compiles)

- [ ] **Step 6: Commit**

```bash
git add src/sites/sovereignwellness/components
git commit -m "feat(sovereignwellness): add crest, banned ticker, gilt frame, wax-seal CTA"
```

---

## Task 6: Home page

**Goal:** Build the homepage with hero, intro band, featured treatments (3-up), banned-in-states ticker, founders band, newsletter gate.

**Files:**
- Modify: `src/sites/sovereignwellness/pages/home.tsx` (replace placeholder)

- [ ] **Step 1: Replace `home.tsx` with full homepage**

```tsx
import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { treatments } from "@/sites/sovereignwellness/data/treatments"
import { founders } from "@/sites/sovereignwellness/data/leadership"
import { BannedTicker } from "@/sites/sovereignwellness/components/BannedTicker"
import { Crest } from "@/sites/sovereignwellness/components/Crest"
import { WaxSealCTA } from "@/sites/sovereignwellness/components/WaxSealCTA"

const featuredSlugs = ["tincture-no-7", "bilateral-thumb-fatigue-balm", "chronic-wednesday-reversal"]
const featured = treatments.filter((t) => featuredSlugs.includes(t.slug))

export default function SovereignWellnessHome() {
  return (
    <>
      <Hero
        headline="Ancestral medicine. Restored. Protected."
        subheadline="The cures they filed away in 1962. Sixteen Protocols, maintained in quiet defiance since 1774."
        ctaText="Enter the Archive"
        ctaHref="/treatments"
        image="/sites/sovereignwellness/hero.png"
      />

      {/* Intro band */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">What We Do</p>
            <h2 className="text-3xl font-heading font-semibold mb-5">Restoration, not invention.</h2>
            <p className="text-foreground/80 leading-relaxed">
              Every remedy we publish has been administered somewhere, by someone, for at least three centuries. We are not formulators. We are custodians. The Archive is not ours; it was handed to us by those who could no longer hold it.
            </p>
          </div>
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">Why You Haven&apos;t Heard Of Us</p>
            <h2 className="text-3xl font-heading font-semibold mb-5">Because They&apos;d Prefer It.</h2>
            <p className="text-foreground/80 leading-relaxed">
              We are not in the directories. We are not indexed. We do not advertise. The remedies in our catalog were legally available until 1962, at which point they were — not banned, not prohibited, but <em>filed</em>. We have located what was filed. We are, with some care, restoring it.
            </p>
          </div>
        </div>
      </section>

      <BannedTicker />

      {/* Featured Treatments */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">From the Archive</p>
          <h2 className="text-4xl font-heading font-semibold text-center mb-16">Three Protocols to Begin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((t) => (
              <ProductCard
                key={t.slug}
                slug={t.slug}
                href={`/treatments/${t.slug}`}
                name={t.name}
                price={t.priceLabel}
                tagline={t.tagline}
                image={t.image}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <WaxSealCTA href="/treatments">Browse All Sixteen</WaxSealCTA>
          </div>
        </div>
      </section>

      {/* Founders band */}
      <section className="py-20 px-4 bg-secondary/40 border-y border-primary/20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">Signed by the four custodians</p>
          <h2 className="text-3xl font-heading font-semibold mb-10">Our Founders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {founders.map((f) => (
              <div key={f.baseImage} className="text-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden border-2 border-[#B08C3A] bg-[#4A3A1A]">
                  <Image src={f.portrait} alt={f.name} fill sizes="25vw" className="object-cover" />
                </div>
                <p className="mt-3 font-heading text-sm leading-tight">{f.name}</p>
                <p className="text-[10px] tracking-widest uppercase text-foreground/60 mt-1">{f.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/founders" className="text-primary underline hover:opacity-70">
              Read the Founders&apos; Oath
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter / Ledger gate */}
      <section className="py-24 px-4 bg-accent text-[#F5ECD7]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Crest size={80} />
          </div>
          <h2 className="text-4xl font-heading font-semibold mb-4">Join the Ledger.</h2>
          <p className="text-[#F5ECD7]/80 mb-8 leading-relaxed">
            We will not ask for your real name. We will ask for an address at which you do not mind receiving correspondence. We send three dispatches per year. None of them are urgent. All of them are worth reading.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your quiet address"
              className="flex-1 bg-transparent border border-[#B08C3A] px-4 py-2 text-[#F5ECD7] placeholder:text-[#B08C3A]/60 focus:outline-none"
            />
            <button type="submit" className="bg-[#B08C3A] text-[#1A2942] px-6 py-2 tracking-widest uppercase text-xs font-semibold hover:bg-[#F5ECD7] transition-colors">
              Inscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
```

Note: the form's `onSubmit={(e) => e.preventDefault()}` makes this a client-handled no-op. This requires the component to be a client component. Add `"use client"` at the top:

Actually — look at the shared `ProductCard` first to confirm it works in a server component context. If it does, split the newsletter form into a small client sub-component so the rest stays server-rendered. Check with:

Run: `grep -l "use client" src/components/ui/product-card.tsx`
Expected: path printed (file has `"use client"`) OR no output (file is a server component).

If the form needs `"use client"`, extract it into `src/sites/sovereignwellness/components/LedgerForm.tsx` marked with `"use client"` and import it into the server-component home page. Keep everything else server-rendered.

- [ ] **Step 2: If `LedgerForm.tsx` is needed, create it**

Only if the grep above showed product-card.tsx lacks `"use client"` (i.e., home page should stay server-rendered). Create:

```tsx
"use client"

export function LedgerForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your quiet address"
        className="flex-1 bg-transparent border border-[#B08C3A] px-4 py-2 text-[#F5ECD7] placeholder:text-[#B08C3A]/60 focus:outline-none"
      />
      <button type="submit" className="bg-[#B08C3A] text-[#1A2942] px-6 py-2 tracking-widest uppercase text-xs font-semibold hover:bg-[#F5ECD7] transition-colors">
        Inscribe
      </button>
    </form>
  )
}
```

Then replace the `<form>…</form>` block in home.tsx with `<LedgerForm />` and import it.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Run: `npm run lint` — Expected: PASS
Browse: `http://localhost:3000/?site=sovereignwellness` — Expected: homepage with hero, intro, ticker, three featured treatment cards (images will be broken until Task 16), founders band, newsletter gate.

- [ ] **Step 4: Commit**

```bash
git add src/sites/sovereignwellness
git commit -m "feat(sovereignwellness): implement home page"
```

---

## Task 7: Treatments catalog page

**Goal:** Grid of all 16 treatments with category filters.

**Files:**
- Create: `src/sites/sovereignwellness/pages/treatments.tsx`
- Modify: `src/sites/sovereignwellness/index.ts` to register the page

- [ ] **Step 1: Create `treatments.tsx`**

```tsx
"use client"

import { useState } from "react"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { treatments, CATEGORY_LABELS, type TreatmentCategory } from "@/sites/sovereignwellness/data/treatments"

type Filter = "all" | TreatmentCategory

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All Protocols" },
  { key: "ancestral", label: CATEGORY_LABELS.ancestral },
  { key: "suppressed", label: CATEGORY_LABELS.suppressed },
  { key: "restricted", label: CATEGORY_LABELS.restricted },
]

export const metadata = {
  title: "The Protocols — Sovereign Wellness Co.",
  description: "Sixteen Protocols for conditions the medical establishment has declined to acknowledge. Filter by Ancestral, Suppressed, or Restricted.",
}

export default function SovereignWellnessTreatments() {
  const [filter, setFilter] = useState<Filter>("all")
  const visible = filter === "all" ? treatments : treatments.filter((t) => t.category === filter)

  return (
    <>
      <Hero
        headline="The Protocols"
        subheadline="Sixteen remedies, restored from the Archive. Each bears a lot number. Each is waitlisted. Supply is restricted per standing inquiry."
      />

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 text-xs tracking-[0.3em] uppercase border-2 transition-colors ${
                  filter === f.key
                    ? "bg-primary text-secondary border-primary"
                    : "border-primary/30 text-primary hover:border-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visible.map((t) => (
              <ProductCard
                key={t.slug}
                slug={t.slug}
                href={`/treatments/${t.slug}`}
                name={t.name}
                price={t.priceLabel}
                tagline={t.tagline}
                image={t.image}
              />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-foreground/60 py-16 font-heading italic">No Protocols in this classification.</p>
          )}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register page in `index.ts`**

Edit `src/sites/sovereignwellness/index.ts`:

```typescript
import type { PageEntry } from "@/themes"
import { config } from "./config"
import SovereignWellnessHome from "./pages/home"
import SovereignWellnessTreatments, { metadata as treatmentsMetadata } from "./pages/treatments"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SovereignWellnessHome,
  "treatments": { component: SovereignWellnessTreatments, metadata: treatmentsMetadata },
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Browse: `http://localhost:3000/treatments?site=sovereignwellness` — Expected: hero, 4 filter buttons, 16 treatment cards in 4-col grid on desktop.

- [ ] **Step 4: Commit**

```bash
git add src/sites/sovereignwellness
git commit -m "feat(sovereignwellness): implement treatments catalog page with category filter"
```

---

## Task 8: Treatment detail page + dynamic route

**Goal:** Individual treatment detail pages at `/treatments/[slug]` with Condition, Mechanism, Documented Cases, Protocol, waitlist CTA, and related treatments.

**Files:**
- Create: `src/sites/sovereignwellness/pages/treatment-detail.tsx`
- Modify: `src/sites/sovereignwellness/index.ts` to register the dynamic route

- [ ] **Step 1: Create `treatment-detail.tsx`**

```tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTreatmentBySlug, treatments, CATEGORY_LABELS } from "@/sites/sovereignwellness/data/treatments"
import { WaxSealCTA } from "@/sites/sovereignwellness/components/WaxSealCTA"

interface Props {
  slug: string
}

export default function TreatmentDetail({ slug }: Props) {
  const t = getTreatmentBySlug(slug)
  if (!t) notFound()

  const related = treatments.filter((other) => other.slug !== t.slug && other.category === t.category).slice(0, 3)

  return (
    <>
      {/* Hero section: image + identification */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full aspect-square bg-accent/10 border border-primary/20">
            <Image src={t.image} alt={t.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">{CATEGORY_LABELS[t.category]} · Classification</p>
            <h1 className="text-4xl font-heading font-semibold mb-4">{t.name}</h1>
            <p className="text-lg font-heading italic text-foreground/70 mb-6">{t.tagline}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-accent text-[#F5ECD7] px-3 py-1 text-[10px] tracking-[0.3em] uppercase">Banned in {t.bannedInStates} states</span>
              <span className="border border-primary/40 text-primary px-3 py-1 text-[10px] tracking-[0.3em] uppercase">Lot · VII</span>
              <span className="border border-primary/40 text-primary px-3 py-1 text-[10px] tracking-[0.3em] uppercase">Waitlist only</span>
            </div>
            <p className="text-foreground/80 mb-8 leading-relaxed">{t.condition}</p>
            <div className="flex items-center gap-6 mb-6">
              <span className="text-3xl font-heading">{t.priceLabel}</span>
              <span className="text-xs uppercase tracking-widest text-foreground/50">per Protocol</span>
            </div>
            <WaxSealCTA href="#waitlist">Request Access</WaxSealCTA>
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <section className="py-16 px-4 bg-secondary/40 border-y border-primary/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Mechanism of Action</p>
          <h2 className="text-3xl font-heading font-semibold mb-6">How It Works</h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            {t.mechanism.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Administration Protocol</p>
          <h2 className="text-3xl font-heading font-semibold mb-6">The Regimen</h2>
          <p className="text-foreground/80 leading-relaxed font-heading italic text-lg">{t.protocol}</p>
        </div>
      </section>

      {/* Documented Cases */}
      <section className="py-16 px-4 bg-accent text-[#F5ECD7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#B08C3A] mb-3 text-center">Documented Cases</p>
          <h2 className="text-3xl font-heading font-semibold mb-12 text-center">From the Ledger</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.cases.map((c, i) => (
              <blockquote key={i} className="border-l-2 border-[#B08C3A] pl-6">
                <p className="font-heading italic leading-relaxed mb-3">&ldquo;{c.testimonial}&rdquo;</p>
                <footer className="text-xs tracking-[0.25em] uppercase text-[#B08C3A]">
                  — {c.initials}, {c.location}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Access</p>
          <h2 className="text-3xl font-heading font-semibold mb-6">Request A Place on the Waitlist.</h2>
          <p className="text-foreground/80 mb-8 leading-relaxed">
            Supply of {t.name} is restricted per standing federal inquiry. New allocations are made at the Founders&apos; discretion.
          </p>
          <WaxSealCTA href="/contact">Submit Your Request</WaxSealCTA>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-secondary/40 border-t border-primary/20">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3 text-center">Related Protocols</p>
            <h2 className="text-3xl font-heading font-semibold mb-10 text-center">In the Same Classification</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/treatments/${r.slug}`} className="group">
                  <div className="relative w-full aspect-square bg-accent/10 border border-primary/20 mb-3">
                    <Image src={r.image} alt={r.name} fill sizes="33vw" className="object-cover group-hover:opacity-80 transition-opacity" />
                  </div>
                  <p className="font-heading text-lg leading-tight">{r.name}</p>
                  <p className="text-sm italic text-foreground/60 mt-1">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 2: Register dynamic route in `index.ts`**

Replace `src/sites/sovereignwellness/index.ts` with:

```typescript
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getTreatmentBySlug } from "./data/treatments"
import SovereignWellnessHome from "./pages/home"
import SovereignWellnessTreatments, { metadata as treatmentsMetadata } from "./pages/treatments"
import TreatmentDetail from "./pages/treatment-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SovereignWellnessHome,
  "treatments": { component: SovereignWellnessTreatments, metadata: treatmentsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  treatments: {
    component: TreatmentDetail,
    getMetadata: (slug: string) => {
      const t = getTreatmentBySlug(slug)
      return t
        ? { title: `${t.name} — Sovereign Wellness Co.`, description: t.tagline, ogImage: t.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getTreatmentBySlug(slug),
  },
}
```

- [ ] **Step 3: Also update the registry entry to pass `dynamicRoutes`**

Edit `src/sites/registry.ts`. Update the sovereignwellness import and entry:

```typescript
import { config as sovereignwellnessConfig, pages as sovereignwellnessPages, dynamicRoutes as sovereignwellnessDynamicRoutes } from "./sovereignwellness"
```

```typescript
sovereignwellness: { config: sovereignwellnessConfig, pages: sovereignwellnessPages, dynamicRoutes: sovereignwellnessDynamicRoutes },
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Browse: `http://localhost:3000/treatments/tincture-no-7?site=sovereignwellness` — Expected: full detail page with all sections.
Browse: `http://localhost:3000/treatments/nonexistent?site=sovereignwellness` — Expected: 404.

- [ ] **Step 5: Commit**

```bash
git add src/sites/sovereignwellness src/sites/registry.ts
git commit -m "feat(sovereignwellness): add treatment detail page and dynamic route"
```

---

## Task 9: Founders page

**Goal:** 2×2 gilt-framed portraits with bios and closing Founders' Oath.

**Files:**
- Create: `src/sites/sovereignwellness/pages/founders.tsx`
- Modify: `src/sites/sovereignwellness/index.ts`

- [ ] **Step 1: Create `founders.tsx`**

```tsx
import { Hero } from "@/components/ui/hero"
import { founders } from "@/sites/sovereignwellness/data/leadership"
import { GiltFrame } from "@/sites/sovereignwellness/components/GiltFrame"

export const metadata = {
  title: "Our Founders — Sovereign Wellness Co.",
  description: "The four custodians of the Archive. Portraits, titles, and the abbreviated record of their lives in the organization.",
}

export default function SovereignWellnessFounders() {
  return (
    <>
      <Hero
        headline="Our Founders"
        subheadline="The four custodians. Their portraits hang in the office corridor. Their names are recorded below."
      />

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {founders.map((f) => (
            <div key={f.baseImage}>
              <GiltFrame src={f.portrait} alt={f.name} name={f.name} title={f.title} />
              <div className="mt-8 space-y-4 text-foreground/80 leading-relaxed">
                {f.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founders' Oath */}
      <section className="py-20 px-4 bg-accent text-[#F5ECD7]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#B08C3A] mb-6">The Founders&apos; Oath</p>
          <p className="text-2xl font-heading italic leading-relaxed">
            We maintain the Archive as it was maintained before us, in the handwriting we were taught, by the light we were given. We do not advertise. We do not hurry. We do not answer the telephone. We sign in ink, and we wait for those who look for us to find us.
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-[#B08C3A] mt-8">
            Signed · the first of each year · by all four hands
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register page in `index.ts`**

Add import and page entry:

```typescript
import SovereignWellnessFounders, { metadata as foundersMetadata } from "./pages/founders"
```

In the `pages` object, add:

```typescript
  "founders": { component: SovereignWellnessFounders, metadata: foundersMetadata },
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Browse: `http://localhost:3000/founders?site=sovereignwellness` — Expected: hero, 2×2 gilt-framed portraits with bios, Founders' Oath section.

- [ ] **Step 4: Commit**

```bash
git add src/sites/sovereignwellness
git commit -m "feat(sovereignwellness): add founders page"
```

---

## Task 10: Our Story page

**Goal:** Long-form suppression narrative with timeline.

**Files:**
- Create: `src/sites/sovereignwellness/pages/our-story.tsx`
- Modify: `src/sites/sovereignwellness/index.ts`

- [ ] **Step 1: Create `our-story.tsx`**

```tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Our Story — Sovereign Wellness Co.",
  description: "How we came into possession of the Archive. An abbreviated history of the organization, the filings of 1962, and the three relocations since.",
}

const timeline = [
  { year: "1774", label: "Original Charter", body: "The apothecary hall is chartered in defiance of the Royal Apothecaries Act. Four founding signatories. Their signatures hang, in reproduction, in our corridor today." },
  { year: "1859", label: "The First Quiet", body: "A quiet decade. The hall continues its work. Records are hand-copied into triplicate for the first time." },
  { year: "1904", label: "The Second Quiet", body: "A second quiet decade. The records are hand-copied into quintuplicate. We do not know why." },
  { year: "1962", label: "The Filing", body: "On the afternoon of the 14th of September, the compendium is boxed and carried out by unidentified parties in a convoy of three vehicles. The hall is unoccupied for the next eleven years." },
  { year: "1973", label: "The Return", body: "Three boxes are returned, unmarked, to a side door in the night. The return is not announced. It is not acknowledged. The Archive, partially, resumes." },
  { year: "1994", label: "Dr. Harrow Joins", body: "A former Senior Formulary Advisor walks away from three federal health bodies and arrives at our door with a single notebook. The notebook is absorbed into the Archive. The Archive, for the first time since 1962, is again complete." },
  { year: "2008", label: "The First Relocation", body: "The Archive is relocated for reasons that remain undisclosed. The corridor of portraits is also relocated. The mahogany paneling is not." },
  { year: "2019", label: "The Second Relocation", body: "The Archive is relocated a second time. The portrait corridor is relocated a third time, independently of the Archive, for reasons that also remain undisclosed." },
  { year: "2026", label: "The Present", body: "Sixteen Protocols are now published, by waitlist only. This is the most publicly we have operated in our entire history. We are aware of the risk. We have elected to accept it." },
]

export default function SovereignWellnessOurStory() {
  return (
    <>
      <Hero
        headline="Our Story"
        subheadline="The Filing, the Return, and the inheritance of an Archive that has survived three relocations, two quiets, and one uninterrupted lineage of signatories."
      />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p className="font-heading text-xl italic text-foreground">
            What follows is the abbreviated account. The full account is held in the Archive, where it will remain.
          </p>
          <p>
            Sovereign Wellness Co. is the contemporary continuation of an apothecary hall originally chartered in 1774 in defiance of the Royal Apothecaries Act. Of the four original signatories, three are buried in known locations. The fourth, as a matter of organizational record, is not.
          </p>
          <p>
            The hall operated without incident for one hundred and eighty-eight years. On the afternoon of the 14th of September, 1962, its compendium of remedies was boxed in lots of twenty and removed by a convoy of three unmarked vehicles. No civil or criminal charges were filed, before, during, or after. The hall was simply emptied, and it remained empty, under the same lease, for the next eleven years.
          </p>
          <p>
            In 1973, three boxes were returned. They were left at a side door. They were not announced. They were not inventoried. We know their return date only because the night watchman noted it in the margin of a ledger, in a hand that was not otherwise his.
          </p>
          <p>
            We continue to operate, with considerable care, from that partial return. The Archive has been supplemented, twice, by individuals who chose to bring us materials they could no longer in good conscience hold. We do not disclose who. We do not disclose when. We disclose only that the Archive, today, contains sixteen Protocols in publishable form and approximately four hundred that are not yet ready.
          </p>
          <p>
            We do not expect to become public. We expect to be found by those who look for us, in the manner that our predecessors were found by those who looked for them. If you are reading this, you have already found us.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-secondary/40 border-y border-primary/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">The Record</p>
          <h2 className="text-3xl font-heading font-semibold text-center mb-16">An Abbreviated Timeline</h2>
          <ol className="space-y-10 border-l-2 border-primary/30 pl-8">
            {timeline.map((entry) => (
              <li key={entry.year} className="relative">
                <span className="absolute -left-[38px] top-1 w-4 h-4 bg-primary border-2 border-secondary" aria-hidden="true" />
                <p className="text-xs tracking-[0.3em] uppercase text-primary/70">{entry.year}</p>
                <h3 className="font-heading text-2xl font-semibold mt-1 mb-2">{entry.label}</h3>
                <p className="text-foreground/80 leading-relaxed">{entry.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register in `index.ts`**

Add:

```typescript
import SovereignWellnessOurStory, { metadata as ourStoryMetadata } from "./pages/our-story"
```

In `pages`:

```typescript
  "our-story": { component: SovereignWellnessOurStory, metadata: ourStoryMetadata },
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Browse: `http://localhost:3000/our-story?site=sovereignwellness` — Expected: hero + narrative + timeline with 9 entries.

- [ ] **Step 4: Commit**

```bash
git add src/sites/sovereignwellness
git commit -m "feat(sovereignwellness): add our story page with timeline"
```

---

## Task 11: Dispatches index + detail + dynamic route

**Goal:** `/dispatches` index (card grid with URGENT feature) and `/dispatches/[slug]` article pages.

**Files:**
- Create: `src/sites/sovereignwellness/pages/dispatches.tsx`
- Create: `src/sites/sovereignwellness/pages/dispatch-detail.tsx`
- Modify: `src/sites/sovereignwellness/index.ts`

- [ ] **Step 1: Create `dispatches.tsx` (index)**

```tsx
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { dispatches } from "@/sites/sovereignwellness/data/dispatches"

export const metadata = {
  title: "Dispatches — Sovereign Wellness Co.",
  description: "Periodic correspondence from the Archive. Three per year. None urgent. All worth reading.",
}

export default function SovereignWellnessDispatches() {
  const urgent = dispatches.find((d) => d.urgent)
  const regular = dispatches.filter((d) => !d.urgent)

  return (
    <>
      <Hero
        headline="Dispatches"
        subheadline="Periodic correspondence from the Archive. Three per year under ordinary circumstances. More, should circumstances require."
      />

      {urgent && (
        <section className="py-12 px-4 bg-primary text-secondary">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-[#B08C3A] mb-4">Urgent Dispatch · Read Before Proceeding</p>
            <Link href={`/dispatches/${urgent.slug}`} className="grid md:grid-cols-[1fr_2fr] gap-8 items-center group">
              <div className="relative w-full aspect-[4/3] bg-[#4A1414] border-2 border-[#B08C3A]">
                <Image src={urgent.image} alt={urgent.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:opacity-90 transition-opacity" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-wide leading-tight mb-4">{urgent.title}</h2>
                <p className="text-secondary/90 leading-relaxed">{urgent.excerpt}</p>
                <p className="mt-4 text-xs tracking-[0.3em] uppercase text-[#B08C3A]">{urgent.publishedLabel}</p>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {regular.map((d) => (
            <Link key={d.slug} href={`/dispatches/${d.slug}`} className="group">
              <div className="relative w-full aspect-[16/10] bg-accent/10 border border-primary/20 mb-5">
                <Image src={d.image} alt={d.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover group-hover:opacity-90 transition-opacity" />
              </div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">{d.publishedLabel}</p>
              <h3 className="font-heading text-2xl font-semibold mb-3 leading-tight group-hover:text-primary transition-colors">{d.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{d.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create `dispatch-detail.tsx`**

```tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getDispatchBySlug, dispatches } from "@/sites/sovereignwellness/data/dispatches"

interface Props {
  slug: string
}

export default function DispatchDetail({ slug }: Props) {
  const d = getDispatchBySlug(slug)
  if (!d) notFound()

  const others = dispatches.filter((o) => o.slug !== d.slug).slice(0, 3)

  return (
    <>
      <article className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">{d.publishedLabel}</p>
          <h1 className={`font-heading font-semibold leading-tight mb-6 ${d.urgent ? "text-4xl md:text-5xl uppercase tracking-wide text-primary" : "text-4xl md:text-5xl"}`}>
            {d.title}
          </h1>
          <p className="text-xl font-heading italic text-foreground/70 mb-10 leading-relaxed">{d.excerpt}</p>
          <div className="relative w-full aspect-[16/10] bg-accent/10 border border-primary/20 mb-10">
            <Image src={d.image} alt={d.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-6 text-foreground/85 leading-relaxed">
            {d.paragraphs.map((p, i) => (
              <p key={i} className={d.urgent ? "font-heading text-lg" : ""}>{p}</p>
            ))}
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="py-16 px-4 bg-secondary/40 border-t border-primary/20">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3 text-center">Other Dispatches</p>
            <h2 className="text-3xl font-heading font-semibold mb-10 text-center">Further Correspondence</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((o) => (
                <Link key={o.slug} href={`/dispatches/${o.slug}`} className="group">
                  <div className="relative w-full aspect-[16/10] bg-accent/10 border border-primary/20 mb-3">
                    <Image src={o.image} alt={o.title} fill sizes="33vw" className="object-cover group-hover:opacity-80 transition-opacity" />
                  </div>
                  <p className="font-heading text-lg leading-tight">{o.title}</p>
                  <p className="text-sm italic text-foreground/60 mt-1">{o.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 3: Register page and dynamic route in `index.ts`**

Add imports:

```typescript
import { getDispatchBySlug } from "./data/dispatches"
import SovereignWellnessDispatches, { metadata as dispatchesMetadata } from "./pages/dispatches"
import DispatchDetail from "./pages/dispatch-detail"
```

Add to `pages`:

```typescript
  "dispatches": { component: SovereignWellnessDispatches, metadata: dispatchesMetadata },
```

Add to `dynamicRoutes`:

```typescript
  dispatches: {
    component: DispatchDetail,
    getMetadata: (slug: string) => {
      const d = getDispatchBySlug(slug)
      return d
        ? { title: `${d.title} — Sovereign Wellness Co.`, description: d.excerpt, ogImage: d.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getDispatchBySlug(slug),
  },
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Browse: `http://localhost:3000/dispatches?site=sovereignwellness` — Expected: URGENT feature on primary bg + 4 regular cards.
Browse: `http://localhost:3000/dispatches/the-1962-filing?site=sovereignwellness` — Expected: full article.

- [ ] **Step 5: Commit**

```bash
git add src/sites/sovereignwellness
git commit -m "feat(sovereignwellness): add dispatches index, detail, and dynamic route"
```

---

## Task 12: Contact page

**Goal:** Satirical apothecary contact page with absurd required fields and the real email `bsambrone@gmail.com` in small print.

**Files:**
- Create: `src/sites/sovereignwellness/pages/contact.tsx`
- Modify: `src/sites/sovereignwellness/index.ts`

- [ ] **Step 1: Create `contact.tsx`**

```tsx
"use client"

import { Hero } from "@/components/ui/hero"
import { WaxSealCTA } from "@/sites/sovereignwellness/components/WaxSealCTA"

export const metadata = {
  title: "Correspondence — Sovereign Wellness Co.",
  description: "A considered exchange. We read plaintext inquiries on the third Tuesday of each calendar month.",
}

export default function SovereignWellnessContact() {
  return (
    <>
      <Hero
        headline="Correspondence"
        subheadline="A considered exchange. We read plaintext inquiries on the third Tuesday of each calendar month, in chronological order, by hand, aloud, in a single sitting. We reply when moved to."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-secondary/40 border border-primary/30 p-8 mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">A Brief Note on Communication</p>
            <ul className="space-y-3 text-foreground/80 leading-relaxed list-disc list-inside">
              <li>We do not answer the telephone.</li>
              <li>We do not answer the telephone during Mercury retrograde with particular firmness.</li>
              <li>We do not maintain a presence on any platform labeled &ldquo;social.&rdquo;</li>
              <li>Inquiries regarding the Protocols are read by Mr. Callaghan, who takes his time.</li>
              <li>Inquiries regarding the Archive are read by Mr. Marsh, who takes even longer.</li>
            </ul>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Your preferred hand</label>
              <select className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none">
                <option>Right</option>
                <option>Left</option>
                <option>Ambidextrous — complicated</option>
                <option>I decline to answer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Your first-grade teacher&apos;s name</label>
              <input type="text" className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Astrological birth chart (compressed form acceptable)</label>
              <input type="text" placeholder="e.g., Virgo sun, Capricorn rising" className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">A postal address at which you do not mind being found</label>
              <input type="text" className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Nature of your affliction (avoid specifics)</label>
              <textarea rows={5} className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none resize-none" />
            </div>

            <div className="pt-4">
              <WaxSealCTA>Dispatch Your Inquiry</WaxSealCTA>
            </div>
          </form>

          <p className="mt-16 text-xs text-foreground/50 italic text-center">
            Urgent plaintext inquiries, should the foregoing form prove insufficient: <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary transition-colors">bsambrone@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register page in `index.ts`**

```typescript
import SovereignWellnessContact, { metadata as contactMetadata } from "./pages/contact"
```

In `pages`:

```typescript
  "contact": { component: SovereignWellnessContact, metadata: contactMetadata },
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Browse: `http://localhost:3000/contact?site=sovereignwellness` — Expected: hero, communication-rules block, satirical form, real email in small italic print at bottom.

Visually confirm: `bsambrone@gmail.com` appears at the bottom of the contact page.

- [ ] **Step 4: Commit**

```bash
git add src/sites/sovereignwellness
git commit -m "feat(sovereignwellness): add contact page with real email in small print"
```

---

## Task 13: Privacy page

**Goal:** Umbrella callout (pointer to specificindustries.com/privacy) + 5 satirical numbered sections in-voice.

**Files:**
- Create: `src/sites/sovereignwellness/pages/privacy.tsx`
- Modify: `src/sites/sovereignwellness/index.ts`

- [ ] **Step 1: Create `privacy.tsx`**

```tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Sovereign Wellness Co.",
  description: "How we treat the correspondence, records, and quiet preferences of those who find us.",
}

export default function SovereignWellnessPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Our considered approach to your records, your correspondence, and your preferences."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          {/* Umbrella callout */}
          <p className="text-sm text-foreground/80 bg-secondary/40 border border-primary/30 p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-primary underline hover:opacity-70 transition-opacity">specificindustries.com/privacy</a>.{" "}
            That document governs all data handling for this site. The sections below are the ancillary provisions specific to the operation of the Sovereign Wellness Archive. Where they conflict, the authoritative policy prevails.
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last revised in the corridor of portraits, by quill, in triplicate. Version 14.0.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary mt-8">1. On the Information We Inherit</h2>
          <p>
            We inherit, in the course of an inquiry, only what you choose to include. We do not seek more. We do not cross-reference. We do not, as a matter of policy, look up the rest. The Archive is for Protocols, not for persons; your records are a ledger entry, not a file.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">2. Cookies &amp; Other Warded Objects</h2>
          <p>
            Our website uses a small number of browser cookies for the modest tasks a website now requires — remembering your preferences, maintaining the integrity of the correspondence form, and little else. None of these cookies are shared with third-party commercial entities. We have no tracking pixels. We have no advertising partners. We do not sell what a cookie knows; we do not sell anything, in fact, that is not a Protocol.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">3. Data We Share With The Archive Keepers</h2>
          <p>
            The following persons may access your inquiry in the normal course of our operations: Mr. Callaghan (Chief of Protocols &amp; Verification), who reads and triages inquiries; Mr. Marsh (Keeper of the Restricted Archive), who is consulted where your inquiry involves the Archive itself; and Dr. Harrow (Founder), whose review is occasionally requested and whose review is never declined. No party beyond these three accesses your correspondence. The Archive does not, itself, read.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">4. Your Right To Be Forgotten (By Them, Not By Us)</h2>
          <p>
            You may, at any time, request that your ledger entry be redacted. We will honor this request within one lunar cycle. The redaction is physical; a custodian draws a line through the entry in ink. The entry is not destroyed — no entry is ever destroyed — but after redaction, it is not consulted, and in the ordinary course of time, it is forgotten. This we offer.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">5. A Note On Encrypted Dispatches</h2>
          <p>
            We accept encrypted correspondence. We do not, however, encourage it. The key logistics required to maintain an active encryption regime have, in our experience, not survived the attentions of three federal inquiries. Plaintext, read by hand, on the third Tuesday, has proven more durable. We recommend plaintext, with the understanding that there are no technical guarantees against the means of interception available to well-resourced actors — and that the most durable security is, as it has always been, discretion in the writing.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register in `index.ts`**

```typescript
import SovereignWellnessPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
```

```typescript
  "privacy": { component: SovereignWellnessPrivacy, metadata: privacyMetadata },
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Browse: `http://localhost:3000/privacy?site=sovereignwellness` — Expected: umbrella callout at top in its own framed block, then 5 numbered satirical sections.

- [ ] **Step 4: Commit**

```bash
git add src/sites/sovereignwellness
git commit -m "feat(sovereignwellness): add privacy page with umbrella callout and satire body"
```

---

## Task 14: Terms page

**Goal:** Umbrella callout + 5 satirical numbered sections.

**Files:**
- Create: `src/sites/sovereignwellness/pages/terms.tsx`
- Modify: `src/sites/sovereignwellness/index.ts`

- [ ] **Step 1: Create `terms.tsx`**

```tsx
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Sovereign Wellness Co.",
  description: "The terms under which the Archive extends its Protocols to those who find us.",
}

export default function SovereignWellnessTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="The conditions under which the Archive extends its Protocols."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          {/* Umbrella callout */}
          <p className="text-sm text-foreground/80 bg-secondary/40 border border-primary/30 p-4">
            The authoritative Terms of Use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-primary underline hover:opacity-70 transition-opacity">specificindustries.com/terms</a>.{" "}
            That document governs your use of this site. The sections below are the ancillary provisions specific to the Archive. Where they conflict, the authoritative terms prevail.
          </p>
          <p className="text-sm text-foreground/40 italic">
            Revised quietly. Version 11.0, printed on paper milled at our own premises.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary mt-8">1. Acceptance of The Oath</h2>
          <p>
            By using this site, you accept the Founders&apos; Oath in abbreviated form: you will not advertise the Protocols you encounter here; you will not attempt to reproduce them outside of the channels we designate; and you will not, under any circumstances, use the telephone in relation to them. Acceptance is passive. It occurs at the moment of your first visit and recurs on each subsequent visit without additional consent.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">2. On Proper Use of The Protocols</h2>
          <p>
            The Protocols are, at time of publication, administered by and to informed adults. They are not medical devices. They are not FDA-approved. They are not, in fact, approved by any body, and we consider this a feature rather than a shortcoming. Use of the Protocols is at the user&apos;s sole discretion, following the administration instructions printed on the accompanying documentation and, where applicable, the lunar phase.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">3. On Spiritual Liability</h2>
          <p>
            We cannot accept liability for the spiritual consequences of Protocol use. Our formulators do not regard the spiritual as an afterthought; they regard it as a primary vector, which is why we publish the mechanism alongside the dosage. However, the spiritual is, in the end, yours. We decline to be held accountable for phenomena we decline to quantify.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">4. Restricted Jurisdictions</h2>
          <p>
            The following counties and jurisdictions have formally requested we decline to ship Protocols to their residents: Yancey County, North Carolina; the Independent Borough of Greater Harmondale; Municipality of West Lesser Teal, Ohio; the Unincorporated District of Pine Hollow; Hamilton-Preston Judicial District 7; Township of Cold Archer; and thirty-three others. A complete list is available, upon written inquiry, by the third Tuesday. We honor these requests, with regret.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">5. Disputes &amp; The Archive&apos;s Ruling</h2>
          <p>
            Disputes arising under these terms are resolved, first, by correspondence. If correspondence fails, the dispute is brought before the three senior officers of the organization for a written ruling. The ruling is communicated by letter and is final. There is no appeal. There has, in one hundred and eighty-two years, been no need for one.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Register in `index.ts`**

```typescript
import SovereignWellnessTerms, { metadata as termsMetadata } from "./pages/terms"
```

```typescript
  "terms": { component: SovereignWellnessTerms, metadata: termsMetadata },
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Browse: `http://localhost:3000/terms?site=sovereignwellness` — Expected: umbrella callout + 5 satirical sections.

- [ ] **Step 4: Commit**

```bash
git add src/sites/sovereignwellness
git commit -m "feat(sovereignwellness): add terms page with umbrella callout and satire body"
```

---

## Task 15: Sitemap entries

**Goal:** Add the dynamic `treatments/[slug]` and `dispatches/[slug]` URLs to the sitemap.

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add imports at the top of `sitemap.ts`**

After the `carterandfilsJournal` import, add:

```typescript
import { treatments as sovereignwellnessTreatments } from "@/sites/sovereignwellness/data/treatments"
import { dispatches as sovereignwellnessDispatches } from "@/sites/sovereignwellness/data/dispatches"
```

- [ ] **Step 2: Add URL emission block**

After the "Carter & Fils" block (the loop over `carterandfilsJournal`), before `return urls`, add:

```typescript
  // Sovereign Wellness: treatment detail pages, dispatch articles
  for (const t of sovereignwellnessTreatments) {
    urls.push({ url: siteUrl("sovereignwellness", `treatments/${t.slug}`) })
  }
  for (const d of sovereignwellnessDispatches) {
    urls.push({ url: siteUrl("sovereignwellness", `dispatches/${d.slug}`) })
  }
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: PASS
Run: `npm run dev` (if not already running), then browse `http://localhost:3000/sitemap.xml` — Expected: XML containing 16 `treatments/` URLs and 5 `dispatches/` URLs for `sovereignwellness.specificindustries.com`.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(sovereignwellness): add treatment and dispatch URLs to sitemap"
```

---

## Task 16: Image generation script and assets

**Goal:** Generate the hero, founder portraits, treatment bottles, and dispatch hero images via an image-generation script patterned on `scripts/generate-carterandfils-images.ts`.

This task is the long-pole; image generation uses the project's MCP `image-gen` tool (see existing generator scripts). It requires the `OPENAI_API_KEY` env var and takes several minutes.

**Files:**
- Create: `scripts/generate-sovereignwellness-images.ts`

- [ ] **Step 1: Inspect the existing generator to copy its idioms**

Run: `cat scripts/generate-carterandfils-images.ts | head -100`
Note: `generateImage()`, `generateWithPerson()`, `sharp`-based resizing, and the overall file shape. Use the same signature set. If the project has newer generator scripts (`generate-rocks-images.ts`, `generate-mostlysterile-images.ts`), also skim for improvements — use whichever pattern is most current.

- [ ] **Step 2: Create `scripts/generate-sovereignwellness-images.ts`**

The script must:
1. Import from `../src/sites/sovereignwellness/data/treatments` and `../src/sites/sovereignwellness/data/dispatches` and `../src/sites/sovereignwellness/data/leadership`.
2. Output to `public/sites/sovereignwellness/` with subdirs `founders/`, `treatments/`, `dispatches/`.
3. For each founder, call `generateWithPerson` using the `baseImage` field (`bill`, `brandon`, `jim`, `sean`) with a prompt styled as "Rembrandt-lit oil painting, high-collar colonial apothecary, dark background, gilt-framed portrait aesthetic" plus the founder's title cue.
4. For each treatment, call `generateImage` with a prompt tied to the treatment's described form (amber glass dropper bottle, apothecary jar, brass pendant, copper rod, steel inhaler, etc.), consistent on parchment-cream background, muted palette, studio product photography.
5. For each dispatch, call `generateImage` with a prompt tied to the dispatch's topic (for "The 1962 Filing" → unmarked boxes on a wooden dolly; for the URGENT sweat dispatch → a close crop of a handwritten warning on parchment; etc.). Keep visual palette consistent with the site.
6. Generate one `hero.png` at size `1536x1024` of the apothecary hall / archive corridor, parchment/oxblood/navy/gold palette.
7. Skip any file that already exists (pattern: `if (fs.existsSync(filepath)) return`). This makes the script resumable.

**Prompts (use these verbatim or adapt):**

**Hero (`hero.png`, size `1536x1024`):**
> "A grand, dimly-lit colonial apothecary hall in founders-era style: dark mahogany shelving lined with amber glass bottles and brass-labeled jars, a large central standing table, a wrought-iron chandelier with lit candles, parchment ledgers open on the table, brass instruments, a wax-seal crest subtly visible on a hanging banner. Muted palette: parchment cream, oxblood, deep navy, muted gold. Painterly, photo-realistic, refined, timeless. No visible text. No people."

**Founders (per-founder, size `1024x1024`, via `generateWithPerson`):**

- Harrow (bill): "Rembrandt-lit oil painting portrait of an elder gentleman with long grey beard, wearing a high white starched collar and a dark oxblood frock coat, standing in a candlelit study with leather-bound books behind him. Painterly, refined, timeless, museum-quality. Dark background. Gilt-frame composition."
- Blackwell (brandon): "Rembrandt-lit oil painting portrait of a younger clean-shaven gentleman in a dark navy frock coat, high collar, holding a small corked amber glass apothecary bottle. Candlelit, dark background, painterly, museum-quality."
- Marsh (jim): "Rembrandt-lit oil painting portrait of a scholarly middle-aged gentleman with spectacles, holding a large leather-bound ledger, standing in front of lamplit wooden shelves of books. Dark navy waistcoat, high collar. Painterly, museum-quality."
- Callaghan (sean): "Rembrandt-lit oil painting portrait of a composed middle-aged clean-shaven gentleman in a navy waistcoat seated at a writing desk with a quill in hand, oil lamp in the background. Painterly, dark background, museum-quality."

**Treatments (per treatment, size `1024x1024`, use the `condition`/form cues):**

Each treatment's image prompt should open with: "Product photography, studio-lit, parchment-cream background with subtle oxblood accents, muted gold label, colonial apothecary aesthetic, painterly-realistic." Then a specific form:

- `tincture-no-7`: "Amber glass dropper bottle with black rubber bulb, handwritten oxblood-inked label reading 'Tincture No. 7 — VII', wax seal on cap."
- `cerumen-siphon`: "A burnished copper ear siphon instrument laid beside a small amber tincture bottle and a folded cream linen cloth."
- `anti-blink-pomade`: "A small round brass tin with an embossed eye motif on the lid, sitting open to reveal golden beeswax salve."
- `thirst-reversion-lozenges`: "A round brass pastille tin with a hinged lid open, revealing pale sage-green lozenges with a gold imprint."
- `monday-morning-compound`: "Twelve small parchment sachets, tied with waxed oxblood cord, stacked in a worn wooden apothecary drawer."
- `doorway-amnesia-drops`: "A small cobalt-blue glass dropper bottle with a handwritten label and a brass pipette."
- `tangled-cord-pendant`: "A polished brass wax-seal-crested pendant on a braided waxed cord, laid on parchment."
- `compulsive-agreeableness-elixir`: "A tall dark-brown glass apothecary bottle with a bone stopper, oxblood handwritten label, wax seal."
- `small-talk-inhibitor`: "A small round tin of oval chewable troches, ivory-pale with gold emboss, half-open."
- `bilateral-thumb-fatigue-balm`: "A squat amber-glass apothecary jar with a cork stopper, labeled 'BILATERAL THUMB FATIGUE BALM' in oxblood ink, filled with pale amber unguent."
- `chronic-wednesday-reversal`: "Seven small glass vials in a custom fitted walnut case, each numbered I through VII in gold. Vial III has a tiny red band and a tag reading 'DO NOT OPEN WEDNESDAYS'."
- `spiritual-static-discharge`: "A long polished copper rod, a folded ivory linen cloth, and a small dropper bottle laid side by side on parchment."
- `sneeze-redirection`: "A small burnished steel pocket inhaler with a hinged brass cap, laid on parchment."
- `lost-key-divination-salts`: "A linen drawstring pouch half-open, revealing grey-rose mineral salts, on a worn wooden surface."
- `eye-contact-endurance-drops`: "A small cobalt-blue glass dropper bottle with a handwritten label reading 'OCULAR FORTITUDE'."
- `lunar-transit-malaise-balm`: "A matte-black apothecary jar with a gold moon-phase engraving on its lid, half-open revealing deep-blue balm."

**Dispatches (per dispatch, size `1024x1024`):**

- `the-1962-filing`: "Dim archival photograph style, wooden dolly stacked with three unmarked cardboard boxes labeled only with Roman numerals, hallway with period fluorescent tubes, parchment-cream and oxblood palette. Moody, grainy, painterly."
- `what-they-dont-tell-you-about-your-sweat`: "Close crop of a handwritten warning on heavy cream parchment, the words partially visible but mostly blurred, large inky black letters, edges scorched. Dramatic side lighting. Stylized illustration, no legible text."
- `humility-of-the-dropper`: "Still life painting, a single amber-glass dropper bottle with a small pool of tincture suspended at the tip, lit by a candle in a brass holder, on a dark wooden desk. Painterly, Dutch-master aesthetic."
- `four-gibbous-malaises`: "A celestial diagram, ink on parchment, showing four phases of the waning gibbous moon labeled I through IV in gothic lettering, surrounded by hand-drawn botanicals. Sepia, oxblood, muted gold."
- `why-we-no-longer-answer-the-telephone`: "Still life of an old black rotary telephone covered by a folded linen cloth, on a dark wooden desk. A single candle flickers beside it. Painterly, oxblood and navy palette."

**Use-it-verbatim script skeleton (derive from `scripts/generate-carterandfils-images.ts`; adjust paths and data sources):**

```typescript
import OpenAI from "openai"
import fs from "fs"
import path from "path"
import { treatments } from "../src/sites/sovereignwellness/data/treatments"
import { dispatches } from "../src/sites/sovereignwellness/data/dispatches"
import { founders } from "../src/sites/sovereignwellness/data/leadership"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/sovereignwellness")

fs.mkdirSync(path.join(OUTPUT_DIR, "founders"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "treatments"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "dispatches"), { recursive: true })

// Copy generateImage and generateWithPerson helpers from scripts/generate-carterandfils-images.ts verbatim.

// Define TREATMENT_PROMPTS as a Record<slug, string> using the prompts above.
// Define DISPATCH_PROMPTS, FOUNDER_PROMPTS similarly.

async function main() {
  // Hero
  await generateImage(HERO_PROMPT, "hero.png", "1536x1024")

  // Founders
  for (const f of founders) {
    await generateWithPerson(FOUNDER_PROMPTS[f.baseImage], path.join("founders", `${path.basename(f.portrait, ".png")}.png`), f.baseImage)
  }

  // Treatments
  for (const t of treatments) {
    await generateImage(TREATMENT_PROMPTS[t.slug], path.join("treatments", `${t.slug}.png`))
  }

  // Dispatches
  for (const d of dispatches) {
    await generateImage(DISPATCH_PROMPTS[d.slug], path.join("dispatches", `${d.slug}.png`))
  }
}

main().catch(console.error)
```

- [ ] **Step 3: Run the script**

```bash
OPENAI_API_KEY=$OPENAI_API_KEY npx tsx scripts/generate-sovereignwellness-images.ts
```

Expected: prints `🎨 Generating …` then `✓ <filename>` for every file it generates. Skips pre-existing files.

If the API key is not in the environment, ask the user to run it themselves. Move on to the next task — they can regenerate images asynchronously; code quality does not depend on images being present.

- [ ] **Step 4: Generate favicon**

The favicon should be derived from the hero or the crest. Simplest path: take the hero, downsample to 64×64 using the existing `scripts/resize-favicons.mjs` approach, or just save the SVG crest (rendered) as a 64×64 PNG.

For now, create the favicon manually by rendering `public/sites/sovereignwellness/hero.png` through sharp at 64×64:

```bash
npx tsx -e "import sharp from 'sharp'; sharp('public/sites/sovereignwellness/hero.png').resize(64, 64, { fit: 'cover' }).png().toFile('public/sites/sovereignwellness/favicon.png').then(() => console.log('done'))"
```

Expected: `public/sites/sovereignwellness/favicon.png` exists at 64×64.

- [ ] **Step 5: Add `"sovereignwellness"` to `scripts/resize-favicons.mjs`**

Edit `scripts/resize-favicons.mjs`. Change:

```javascript
const sites = ["apex", "pigmilk", "dehydratedwater", "inflatableanchors", "strategicvoid", "stratify", "truegrit", "onlyfans", "onlypans", "bonelesswater", "pettential", "carterandfils"]
```

to append `"sovereignwellness"`:

```javascript
const sites = ["apex", "pigmilk", "dehydratedwater", "inflatableanchors", "strategicvoid", "stratify", "truegrit", "onlyfans", "onlypans", "bonelesswater", "pettential", "carterandfils", "sovereignwellness"]
```

- [ ] **Step 6: Run favicon resizer to ensure 64×64**

```bash
node scripts/resize-favicons.mjs
```

Expected: reports `sovereignwellness: already 64x64` or resizes it.

- [ ] **Step 7: Commit**

```bash
git add scripts public/sites/sovereignwellness
git commit -m "feat(sovereignwellness): image generation script, hero, portraits, bottles, favicon"
```

---

## Task 17: Final verification

**Goal:** Confirm the entire site builds, type-checks, lints, and renders every page correctly.

- [ ] **Step 1: Full type check**

Run: `npx tsc --noEmit`
Expected: PASS, 0 errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS, 0 warnings specific to new files.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: PASS, build completes, no new warnings for sovereignwellness files.

- [ ] **Step 4: Browser walk-through**

With `npm run dev` running, visit each of the following and confirm no 404 / no redirect to apex:

- `http://localhost:3000/?site=sovereignwellness` — homepage
- `http://localhost:3000/treatments?site=sovereignwellness` — catalog (16 cards)
- `http://localhost:3000/treatments/tincture-no-7?site=sovereignwellness` — treatment detail
- `http://localhost:3000/treatments/chronic-wednesday-reversal?site=sovereignwellness` — second treatment detail (different category)
- `http://localhost:3000/treatments/nonexistent-slug?site=sovereignwellness` — 404
- `http://localhost:3000/founders?site=sovereignwellness` — 2×2 portraits
- `http://localhost:3000/our-story?site=sovereignwellness` — narrative + 9-item timeline
- `http://localhost:3000/dispatches?site=sovereignwellness` — URGENT feature + 4 cards
- `http://localhost:3000/dispatches/what-they-dont-tell-you-about-your-sweat?site=sovereignwellness` — URGENT article
- `http://localhost:3000/contact?site=sovereignwellness` — confirm `bsambrone@gmail.com` visible
- `http://localhost:3000/privacy?site=sovereignwellness` — confirm umbrella callout at top + 5 numbered sections below
- `http://localhost:3000/terms?site=sovereignwellness` — confirm umbrella callout at top + 5 numbered sections below

Also verify:
- Favicon appears in the browser tab at 16-32px rendered size and is recognizable.
- Images render (or placeholders render gracefully if image generation hasn't been run).
- No visible low-contrast text anywhere (confirm gold does not appear on cream backgrounds).

- [ ] **Step 5: Sitemap check**

Browse: `http://localhost:3000/sitemap.xml`
Expected: includes `sovereignwellness.specificindustries.com/treatments/{slug}` for all 16 treatments and `sovereignwellness.specificindustries.com/dispatches/{slug}` for all 5 dispatches.

- [ ] **Step 6: Commit any last fixes**

```bash
git add <any files fixed during verification>
git commit -m "fix(sovereignwellness): verification polish"
```

(Skip this step if nothing needed fixing.)

- [ ] **Step 7: Push to main**

```bash
git push origin main
```

Per the user's standing preference (`feedback_push_to_main.md`), commits go directly to main; no feature branch.

---

## Self-Review

Spec coverage check — each spec section maps to at least one task:

- Concept / brand / voice / palette → Task 1 (config.ts bakes in theme)
- Page architecture → Tasks 6-14 (one task per page cluster)
- Dynamic routes → Task 8 (treatments), Task 11 (dispatches)
- 16-treatment catalog → Task 2 (data), Tasks 7-8 (UI)
- Four founders → Task 4 (data), Task 9 (UI), Task 16 (portraits)
- 5 dispatches → Task 3 (data), Task 11 (UI), Task 16 (imagery)
- Home page layout → Task 6
- Compliance patterns: umbrella+satire privacy/terms → Tasks 13-14; contact with real email → Task 12
- Assets (favicon, hero, portraits, bottles, dispatches) → Task 16
- Technical integration (registry, subdomains, sitemap, resize-favicons script) → Tasks 1, 8, 15, 16
- File layout → matches the Task 1 scaffolding and subsequent tasks

Type consistency: `Treatment`, `TreatmentCategory`, `TreatmentCase`, `Dispatch`, `Founder` all referenced consistently. `getTreatmentBySlug`, `getDispatchBySlug` imported in the right tasks. `CATEGORY_LABELS` exported from treatments.ts and used only in treatments.tsx and treatment-detail.tsx. `founders[].baseImage` typed as union and used by the image generator to pick the correct reference photo.

Placeholder scan: none found. Image-generation prompts are verbatim (not "add appropriate prompt"). Favicon fallback path is concrete (downsample hero with sharp). Form is non-functional by design (documented as "never actually buy / submits to nowhere").

Potential follow-up risks (not blockers): if the shared `Hero` component doesn't accept an `image` prop at a `1536x1024` aspect (unlikely — it does, per `carterandfils/home.tsx`), the hero image will need letterboxing. If the project has added a `VALID_SUBDOMAINS` validator beyond what the 6-day-old memory describes, Task 1 Step 5 may need adjustment — implementer should read the file first rather than blindly append.
